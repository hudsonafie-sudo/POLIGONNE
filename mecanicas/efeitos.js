// ========== SISTEMA DE EFEITOS DE COMBATE ==========
// Efeitos (buffs/debuffs) aplicados por feitiços durante o combate.
// Deps runtime: combatState, updateTurnOrderDisplay, simCombatState
// !! PERFORMANCE: tickEffects roda a cada turno e itera todos os efeitos.
// !! NUNCA adicionar console.log aqui (especialmente JSON.stringify).

// ===== BANCO DE DADOS DE EFEITOS =====
// Campos:
//   id           - identificador unico
//   name         - nome exibido
//   icon         - emoji do efeito
//   description  - descricao ({value} = placeholder do valor)
//   type         - 'buff' ou 'debuff'
//   stackable    - se pode escalar nivel ao reaplicar (level-up stacking)
//   maxStacks    - nivel maximo (se stackable; 1a aplicacao=Lv1, 2a=Lv2, etc.)
//   durationType - 'turns' (dura X turnos do caster) ou 'caster_turn' (apenas turno atual do caster)
//   duration     - numero de turnos (se durationType='turns')
//   levels       - array de valores por nivel: [{ value: N }, ...]
//   modifiers    - array de modificadores: [{ stat, operation }]
//     stat: 'dmg_dealt', 'dmg_received', 'heal_received', 'heal_received_reduce',
//           'armor_granted', 'armor_received', 'bonus_vs_armored', 'armor_steal_on_hit'
//     operation: 'percent' (multiplicativo) ou 'flat' (aditivo) ou 'percent_reduce' (reducao %)
//   dot          - (OPCIONAL) dano por turno no inicio do turno do alvo
//     dot.damage   - { min, max } — dano base do tick
//     dot.element  - elemento do dano ('fire', 'water', 'earth', 'air', 'none')

const DB_EFEITOS = [
    {
        id: 'poderoso',
        name: 'Poderoso',
        icon: '\uD83D\uDCAA',
        description: '+{value}% de dano causado',
        type: 'buff',
        stackable: false,
        maxStacks: 1,
        durationType: 'turns',
        duration: 2,
        levels: [
            { value: 10 },
            { value: 15 },
            { value: 20 }
        ],
        modifiers: [
            { stat: 'dmg_dealt', operation: 'percent' }
        ]
    },
    {
        id: 'cura_amplificada',
        name: 'Cura Amplificada',
        icon: '\u2764\uFE0F\u200D\uD83E\uDE79',
        description: '+{value}% de cura recebida',
        type: 'buff',
        stackable: true,
        maxStacks: 5,
        durationType: 'turns',
        duration: 3,
        levels: [
            { value: 10 },
            { value: 20 },
            { value: 30 },
            { value: 40 },
            { value: 50 }
        ],
        modifiers: [
            { stat: 'heal_received', operation: 'percent' }
        ]
    },
    {
        id: 'cura_reduzida',
        name: 'Cura Reduzida',
        icon: '\uD83D\uDC94',
        description: '-{value}% de cura recebida',
        type: 'debuff',
        stackable: true,
        maxStacks: 5,
        durationType: 'turns',
        duration: 1,
        levels: [
            { value: 8 },
            { value: 16 },
            { value: 24 },
            { value: 32 },
            { value: 40 }
        ],
        modifiers: [
            { stat: 'heal_received', operation: 'percent_reduce' }
        ]
    },
    {
        id: 'escudo_amplificado',
        name: 'Escudo Amplificado',
        icon: '\uD83D\uDEE1\uFE0F',
        description: '+{value}% de escudo concedido',
        type: 'buff',
        stackable: true,
        maxStacks: 3,
        durationType: 'turns',
        duration: 2,
        levels: [
            { value: 15 },
            { value: 30 },
            { value: 45 }
        ],
        modifiers: [
            { stat: 'armor_granted', operation: 'percent' }
        ]
    },
    {
        id: 'escudo_recebido',
        name: 'Escudo Recebido',
        icon: '\uD83D\uDD35',
        description: '+{value}% de escudo recebido',
        type: 'buff',
        stackable: true,
        maxStacks: 3,
        durationType: 'turns',
        duration: 2,
        levels: [
            { value: 10 },
            { value: 20 },
            { value: 30 }
        ],
        modifiers: [
            { stat: 'armor_received', operation: 'percent' }
        ]
    },
    {
        id: 'destruidor_escudo',
        name: 'Destruidor de Escudo',
        icon: '\uD83D\uDCA5',
        description: '+{value}% de dano contra alvos com escudo',
        type: 'buff',
        stackable: false,
        maxStacks: 1,
        durationType: 'turns',
        duration: 3,
        levels: [
            { value: 20 },
            { value: 35 },
            { value: 50 }
        ],
        modifiers: [
            { stat: 'bonus_vs_armored', operation: 'percent' }
        ]
    },
    {
        id: 'roubo_escudo',
        name: 'Roubo de Escudo',
        icon: '\uD83E\uDD1C',
        description: 'Rouba {value} de escudo ao causar dano',
        type: 'buff',
        stackable: false,
        maxStacks: 1,
        durationType: 'turns',
        duration: 2,
        levels: [
            { value: 5 },
            { value: 10 },
            { value: 15 }
        ],
        modifiers: [
            { stat: 'armor_steal_on_hit', operation: 'flat' }
        ]
    },
    {
        id: 'ardente',
        name: 'Ardente',
        icon: '🔥',
        description: 'Em chamas! Vulnerável ao consumo por feitiços de fogo.',
        type: 'debuff',
        stackable: false,
        maxStacks: 1,
        durationType: 'turns',
        duration: 2,
        levels: [
            { value: 1 }
        ],
        modifiers: []
    },
    {
        id: 'parada',
        name: 'Parada',
        icon: '🛡️',
        description: '+{value}% de chance de parada',
        type: 'buff',
        stackable: false,
        maxStacks: 1,
        durationType: 'turns',
        duration: 1,
        levels: [
            { value: 10 },
            { value: 15 },
            { value: 20 }
        ],
        modifiers: [
            { stat: 'parada', operation: 'flat' }
        ]
    },
    {
        id: 'parada_estandarte',
        name: 'Aura do Estandarte',
        icon: '🚩',
        description: '+{value}% de chance de parada (aura)',
        type: 'buff',
        stackable: true,
        maxStacks: 5,
        durationType: 'turns',
        duration: 1,
        levels: [
            { value: 5 },
            { value: 10 },
            { value: 15 },
            { value: 20 },
            { value: 25 }
        ],
        modifiers: [
            { stat: 'parada', operation: 'flat' }
        ]
    },
    {
        id: 'veneno_zefir',
        name: 'Veneno',
        icon: '☠️',
        description: 'Envenenado! {value} de dano por turno',
        type: 'debuff',
        stackable: true,
        maxStacks: 3,
        durationType: 'turns',
        duration: 3,
        levels: [
            { value: 3, dot: { damage: { min: 3, max: 3 } } },
            { value: 5, dot: { damage: { min: 5, max: 5 } } },
            { value: 8, dot: { damage: { min: 8, max: 8 } } }
        ],
        dot: {
            damage: { min: 3, max: 3 },
            element: 'fire'
        },
        modifiers: []
    },
    {
        id: 'rachadura',
        name: 'Rachadura',
        icon: '🌍',
        description: '+{value} Bloqueio e +10% do bloqueio atual',
        type: 'buff',
        stackable: false,
        maxStacks: 1,
        durationType: 'turns',
        duration: 1,
        levels: [
            { value: 5 }
        ],
        modifiers: [
            { stat: 'block', operation: 'flat', value: 5 },
            { stat: 'block', operation: 'percent', value: 10 }
        ]
    },
    {
        id: 'erosao_dano',
        name: 'Erosão',
        icon: '🪨',
        description: '-{value}% de dano final causado',
        type: 'debuff',
        stackable: true,
        maxStacks: 6,
        durationType: 'turns',
        duration: 3,
        levels: [
            { value: 3 },
            { value: 6 },
            { value: 9 },
            { value: 12 },
            { value: 15 },
            { value: 18 }
        ],
        modifiers: [
            { stat: 'dmg_dealt', operation: 'percent_reduce' }
        ]
    }
];

// ===== MOTOR DE EFEITOS =====

function getEffectDefinition(effectId) {
    return DB_EFEITOS.find(e => e.id === effectId) || null;
}

function createActiveEffect(effectId, level, casterId, targetId) {
    const def = getEffectDefinition(effectId);
    if (!def) {
        console.warn(`[EFEITOS] Efeito '${effectId}' nao encontrado`);
        return null;
    }
    const lvlIndex = Math.max(0, Math.min((level || 1) - 1, def.levels.length - 1));
    const levelData = def.levels[lvlIndex];

    return {
        effectId: def.id,
        name: def.name,
        icon: def.icon,
        type: def.type,
        level: level || 1,
        value: levelData.value,
        durationType: def.durationType,
        remainingTurns: def.durationType === 'turns' ? def.duration : -1,
        casterId: casterId,
        targetId: targetId,
        modifiers: def.modifiers,
        description: def.description.replace('{value}', levelData.value)
    };
}

function applyEffect(effectId, level, casterId, targetId) {
    if (!combatState.activeEffects) combatState.activeEffects = {};
    if (!combatState.activeEffects[targetId]) combatState.activeEffects[targetId] = [];

    const def = getEffectDefinition(effectId);
    if (!def) return null;

    const existing = combatState.activeEffects[targetId];

    // Stacking por nivel: reaplicar escala o nivel +1 (cap = maxStacks)
    if (def.stackable && def.maxStacks > 1) {
        const idx = existing.findIndex(e => e.effectId === effectId);
        if (idx !== -1) {
            const currentLevel = existing[idx].level;
            const newLevel = Math.min(currentLevel + 1, def.maxStacks);
            existing.splice(idx, 1);
            const upgraded = createActiveEffect(effectId, newLevel, casterId, targetId);
            if (upgraded) {
                existing.push(upgraded);
                if (typeof updateTurnOrderDisplay === 'function') updateTurnOrderDisplay();
            }
            return upgraded;
        }
        // Nao existe: cai no create abaixo com level 1
    } else if (!def.stackable) {
        // Nao stackable: substitui o existente
        const idx = existing.findIndex(e => e.effectId === effectId);
        if (idx !== -1) existing.splice(idx, 1);
    }

    // Cria efeito no nivel solicitado (1 na primeira aplicacao)
    const effect = createActiveEffect(effectId, level, casterId, targetId);
    if (effect) {
        existing.push(effect);
        if (typeof updateTurnOrderDisplay === 'function') updateTurnOrderDisplay();
    }
    return effect;
}

function removeEffect(targetId, effectIndex) {
    if (!combatState.activeEffects || !combatState.activeEffects[targetId]) return;
    const removed = combatState.activeEffects[targetId].splice(effectIndex, 1);
    if (removed.length > 0) {
        if (typeof updateTurnOrderDisplay === 'function') updateTurnOrderDisplay();
    }
}

// Processa tick de efeitos no INICIO do turno de um participante
function tickEffectsOnTurnStart(participantId) {
    if (!combatState.activeEffects) return;

    for (const targetId in combatState.activeEffects) {
        const effects = combatState.activeEffects[targetId];
        for (let i = effects.length - 1; i >= 0; i--) {
            const effect = effects[i];
            if (effect.durationType === 'turns' && effect.casterId === participantId) {
                effect.remainingTurns--;
                if (effect.remainingTurns <= 0) {
                    effects.splice(i, 1);
                }
            }
        }
    }
    if (typeof updateTurnOrderDisplay === 'function') updateTurnOrderDisplay();
}

// Processa dano de DoT no INÍCIO do turno do ALVO (participantId é quem vai jogar)
// DoT é dano indireto — escala com atributos do caster original via dealDamageToTarget
function processDotOnTurnStart(participantId) {
    if (!combatState.activeEffects || !combatState.activeEffects[participantId]) return;

    var effects = combatState.activeEffects[participantId];
    for (var i = 0; i < effects.length; i++) {
        var effect = effects[i];
        // Verificar se o efeito tem definição com dot
        var def = getEffectDefinition(effect.effectId);
        if (!def || !def.dot) continue;

        // Suporte a DoT por nível: usa dot do level se disponível, senão usa dot base
        var dotDamage = def.dot.damage;
        var dotElement = def.dot.element || 'none';
        var lvlIdx = (effect.level || 1) - 1;
        if (def.levels && def.levels[lvlIdx] && def.levels[lvlIdx].dot && def.levels[lvlIdx].dot.damage) {
            dotDamage = def.levels[lvlIdx].dot.damage;
            if (def.levels[lvlIdx].dot.element) dotElement = def.levels[lvlIdx].dot.element;
        }
        if (!dotDamage) continue;

        // Buscar entidade do alvo (quem vai tomar o dano)
        var targetEntity = null;
        if (typeof _findCasterEntity === 'function') {
            targetEntity = _findCasterEntity(participantId);
        }
        if (!targetEntity) continue;

        // Buscar entidade do caster (quem aplicou o efeito) para calcular distância
        var casterEntity = null;
        if (typeof _findCasterEntity === 'function') {
            casterEntity = _findCasterEntity(effect.casterId);
        }

        // Criar spell sintético para o DoT
        var dotSpell = {
            damage: dotDamage,
            element: dotElement,
            aoeType: 'single',
            name: def.name,
            range: 0
        };

        // Posição de origem para melee/range: posição do caster ou do alvo se caster morreu
        var originX = casterEntity ? Math.floor(casterEntity.x) : Math.floor(targetEntity.x);
        var originY = casterEntity ? Math.floor(casterEntity.y) : Math.floor(targetEntity.y);

        // Aplicar dano indireto
        var _dotDmgDealt = 0;
        if (typeof dealDamageToTarget === 'function') {
            _dotDmgDealt = dealDamageToTarget(targetEntity, dotSpell, false, {
                overrideCasterId: effect.casterId,
                isIndirect: true,
                trapOriginX: originX,
                trapOriginY: originY
            }) || 0;
        }

        // Floating text
        if (typeof addFloatingText === 'function') {
            addFloatingText(targetEntity.x, targetEntity.y, def.icon + ' ' + def.name, '#ff6633', 'status');
        }

        // Chat message com dano, nome e elemento
        if (typeof addChatMessage === 'function' && _dotDmgDealt > 0) {
            var _dotElemColors = { fire: '#ff4422', water: '#4a9eff', air: '#b8b8b8', earth: '#8B6914', none: '#aaaaaa' };
            var _dotElemNames = { fire: 'Fogo', water: 'Água', air: 'Ar', earth: 'Terra', none: 'Neutro' };
            var _dotColor = _dotElemColors[dotElement] || '#ff6633';
            var _dotElemName = _dotElemNames[dotElement] || dotElement;
            var _dotTargetName = targetEntity.name || targetEntity.type || '?';
            addChatMessage(def.icon + ' <span style="color:' + _dotColor + '">' + def.name + '</span> causa <span style="color:#ff4444">-' + _dotDmgDealt + '</span> de dano (' + _dotElemName + ') em <span style="color:#ff8888">' + _dotTargetName + '</span>', _dotColor, 'combat');
        }
    }

    // Verificar morte após todos os DoTs
    if (typeof checkAllMonstersDead === 'function') checkAllMonstersDead();
    if (typeof checkAllPlayersDead === 'function') checkAllPlayersDead();
}

// Remove efeitos do tipo 'caster_turn' quando o caster termina seu turno
function expireCasterTurnEffects(casterId) {
    if (!combatState.activeEffects) return;

    for (const targetId in combatState.activeEffects) {
        combatState.activeEffects[targetId] = combatState.activeEffects[targetId].filter(
            e => !(e.durationType === 'caster_turn' && e.casterId === casterId)
        );
    }
    if (typeof updateTurnOrderDisplay === 'function') updateTurnOrderDisplay();
}

function getActiveEffects(participantId) {
    if (!combatState.activeEffects || !combatState.activeEffects[participantId]) return [];
    return combatState.activeEffects[participantId];
}

// Calcula bonus total de um modificador para uma entidade
function getEffectModifier(participantId, stat, operation) {
    const effects = getActiveEffects(participantId);
    let total = 0;
    effects.forEach(effect => {
        effect.modifiers.forEach(mod => {
            if (mod.stat === stat && mod.operation === operation) {
                total += (mod.value !== undefined ? mod.value : effect.value);
            }
        });
    });
    return total;
}

function clearAllEffects() {
    combatState.activeEffects = {};
}

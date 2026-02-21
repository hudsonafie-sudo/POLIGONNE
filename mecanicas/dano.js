// ========== SISTEMA DE DANO E CURA ==========
// Calculo de dano, cura, life steal, empurrar/puxar
// Deps runtime: combatState, combatStats, playerEntity, playerStats, floatingTexts,
//               simCombatState, equipped, calculateTotalAttributes, updateHealthBar,
//               updateStatsDisplay, getTileCenter, worldToScreen, getElementStat,
//               isObstacle, endCombat, COMBAT_GRID_SIZE, GRID_SIZE
// !! PERFORMANCE: funcoes de dano sao chamadas em cadeia pela IA e pelo jogador.
// !! NUNCA adicionar console.log aqui. Usar apenas console.warn para erros reais.

// Flag global: último dealDamageToTarget foi crítico? (usado por applyDamage/ricochete para perTarget)
var _lastDealCrit = false;

// ===== SISTEMA DE STACKING DE FEITIÇOS =====
// Rastreia stacks consecutivos de feitiços (ex: Tiro Crescente, Rajada Contínua)
// spell.stackMechanic = { type: 'target'|'caster', maxStacks: N, damageBonus: [0, 30, 60], stackDuration?: N }
// 'target': stacks resetam se trocar de alvo. 'caster': stacks persistem independente do alvo.
// stacks vão de 1 (primeiro uso) até maxStacks. damageBonus indexa pelo stack ANTERIOR ao cast.
// stackDuration: se definido, stacks expiram se não forem reaplicados dentro de N turnos do lançador.
function getAndUpdateSpellStacks(spell, target) {
    if (!spell.stackMechanic) return 0;
    if (!combatState.spellStacks) combatState.spellStacks = {};

    var mech = spell.stackMechanic;
    var key = spell.id;
    var entry = combatState.spellStacks[key];
    var dur = mech.stackDuration || 0; // 0 = sem duração (infinito)

    if (mech.type === 'target') {
        var targetId = typeof getParticipantIdForEntity === 'function' ? getParticipantIdForEntity(target) : null;
        if (!targetId) return 0;

        if (entry && entry.lastTargetId === targetId) {
            // Mesmo alvo: incrementa stack, bônus baseado no stack ANTERIOR
            var prevStacks = entry.stacks || 0;
            var newStacks = Math.min(prevStacks + 1, mech.maxStacks);
            combatState.spellStacks[key] = { stacks: newStacks, lastTargetId: targetId, turnsLeft: dur || undefined, usedThisTurn: true };
            return mech.damageBonus[prevStacks] || 0;
        } else {
            // Novo alvo ou primeiro uso: stack 1, sem bônus
            combatState.spellStacks[key] = { stacks: 1, lastTargetId: targetId, turnsLeft: dur || undefined, usedThisTurn: true };
            return mech.damageBonus[0] || 0;
        }
    } else if (mech.type === 'caster') {
        // Stack no lançador: incrementa independente do alvo
        var prevStacks = entry ? (entry.stacks || 0) : 0;
        var newStacks = Math.min(prevStacks + 1, mech.maxStacks);
        combatState.spellStacks[key] = { stacks: newStacks, turnsLeft: dur || undefined, usedThisTurn: true };
        return mech.damageBonus[prevStacks] || 0;
    }

    return 0;
}

// Tick de expiração de stacks — chamado no FIM do turno do JOGADOR.
// Se o feitiço NÃO foi usado neste turno, decrementa turnsLeft.
// Se turnsLeft chegar a 0, remove o stack.
function tickSpellStacks() {
    if (!combatState.spellStacks) return;
    for (var key in combatState.spellStacks) {
        var entry = combatState.spellStacks[key];
        if (!entry || entry.turnsLeft === undefined) continue; // sem duração = infinito
        if (entry.usedThisTurn) {
            entry.usedThisTurn = false; // reset para o próximo turno
        } else {
            entry.turnsLeft--;
            if (entry.turnsLeft <= 0) {
                // Busca nome do feitiço para o log
                var spellName = key;
                if (typeof DB_HABILIDADES !== 'undefined') {
                    var _sp = DB_HABILIDADES.find(function(s) { return s.id === key; });
                    if (_sp) spellName = _sp.name;
                }
                delete combatState.spellStacks[key];
                if (typeof addChatMessage === 'function') {
                    addChatMessage('📈 Stack de <span style="color:#ffcc00">' + spellName + '</span> expirou.', '#999', 'combat');
                }
            }
        }
    }
}

// ===== SISTEMA DE BONUS DE AURA (passiveZone) =====
// Calcula bonus total de auras ativas para uma entidade
// bonusKey: nome do campo flat na aura (ex: 'bonusBlock', 'bonusDamage', 'bonusDodge')
// Retorna { flat, percent } (percent vem de bonusKey + 'Percent', ex: 'bonusBlockPercent')
function getAuraBonusForEntity(entity, bonusKey) {
    var result = { flat: 0, percent: 0 };
    if (typeof combatState === 'undefined' || !combatState.activeSummons || combatState.activeSummons.length === 0) return result;
    var targetTeam = (entity.type === 'monster') ? 'monster' : 'player';
    var pctKey = bonusKey + 'Percent';
    for (var i = 0; i < combatState.activeSummons.length; i++) {
        var sm = combatState.activeSummons[i];
        if (!sm.aura || sm.aura.type !== 'passiveZone') continue;
        // Verifica se invocacao esta viva
        var smStats = (typeof simCombatState !== 'undefined' && simCombatState.active)
            ? (simCombatState.entityStats[sm.participantId] || null)
            : (combatState.enemyStats ? combatState.enemyStats[sm.participantId] : null);
        if (!smStats || smStats.hp <= 0) continue;
        // Filtro de time
        if (sm.aura.target === 'allies' && targetTeam !== 'player') continue;
        if (sm.aura.target === 'enemies' && targetTeam !== 'monster') continue;
        // Distancia Manhattan
        var dist = Math.abs(Math.floor(sm.entity.x) - Math.floor(entity.x))
                 + Math.abs(Math.floor(sm.entity.y) - Math.floor(entity.y));
        if (dist > (sm.aura.range || 2)) continue;
        // Acumula bonus
        result.flat += (sm.aura[bonusKey] || 0);
        result.percent += (sm.aura[pctKey] || 0);
    }
    return result;
}

// Mapeamento elemento -> stat de dano
const ELEMENT_ORDER = ['water', 'air', 'earth', 'fire'];
// Ordem de desempate para elemento cromático
const CHROMATIC_TIEBREAK = ['water', 'air', 'earth', 'fire', 'neutral'];

const ELEMENT_STAT_MAP = {
    none: 'strength',
    neutral: 'strength',
    water: 'luck',
    air: 'agility',
    earth: 'strength',
    fire: 'intelligence'
};

function getElementStat(element) {
    return ELEMENT_STAT_MAP[element] || ELEMENT_STAT_MAP['none'];
}

// Cores dos elementos para exibição no chat/UI
const ELEMENT_COLORS = {
    none: '#ffffff',
    neutral: '#aaaaaa',
    fire: '#ff4422',
    water: '#4a9eff',
    air: '#b8b8b8',
    earth: '#8B6914',
    chromatic: '#e040fb'
};

function getElementColor(element) {
    return ELEMENT_COLORS[element] || ELEMENT_COLORS['none'];
}

// Obtem o participantId de uma entidade (para sistema de zumbi e efeitos)
function getParticipantIdForEntity(entity) {
    if (simCombatState.active) {
        var p = simCombatState.participants.find(function(p) { return p.entity === entity; });
        return p ? p.id : null;
    }
    if (entity === playerEntity) return 'player';
    if (combatState.enemies) {
        for (var i = 0; i < combatState.enemies.length; i++) {
            if (combatState.enemies[i] === entity) {
                return i === 0 ? 'enemy' : 'enemy_' + i;
            }
        }
    }
    if (combatState.targetEnemy === entity) return 'enemy';
    return null;
}

// ========== SISTEMA DE DESENCARNE ==========
// Entidades mortas bloqueiam célula até desencarnar (contador 3).
// Contador diminui: -1 no início de cada round, -1 por hit de dano recebido.
// Enquanto desencarneCounter > 0: entidade bloqueia movimento, pathfinding e push.

function isDesencarnePending(entity) {
    return entity && entity.desencarneCounter && entity.desencarneCounter > 0;
}

function initDesencarne(entity) {
    if (!entity) return;
    entity.desencarneCounter = 3;
    if (typeof addChatMessage === 'function')
        addChatMessage((entity.name || '?') + ' caiu! Desencarne em 3...', '#999', 'combat');
}

function degradeDesencarne(entity, reason) {
    if (!entity || !entity.desencarneCounter || entity.desencarneCounter <= 0) return;
    entity.desencarneCounter--;
    var rText = reason === 'round' ? ' (round)' : reason === 'damage' ? ' (dano)' : '';
    if (entity.desencarneCounter > 0) {
        if (typeof addChatMessage === 'function')
            addChatMessage((entity.name || '?') + ' desencarne ' + entity.desencarneCounter + rText, '#888', 'combat');
    } else {
        entity.desencarneCounter = 0;
        if (typeof addChatMessage === 'function')
            addChatMessage((entity.name || '?') + ' desencarnado!' + rText, '#aaa', 'combat');
        if (typeof addFloatingText === 'function')
            addFloatingText(entity.x, entity.y, 'Desencarnado', '#aaaaaa', 'death');
    }
}

function tickAllDesencarneCounters() {
    if (typeof simCombatState !== 'undefined' && simCombatState.active) {
        simCombatState.participants.forEach(function(p) {
            if (simCombatState.entityStats[p.id].hp <= 0 && isDesencarnePending(p.entity)) {
                degradeDesencarne(p.entity, 'round');
            }
        });
    } else if (typeof combatState !== 'undefined' && combatState.enemies) {
        combatState.enemies.forEach(function(e) {
            if (e.hp <= 0 && isDesencarnePending(e)) {
                degradeDesencarne(e, 'round');
            }
        });
    }
}

// ========== SISTEMA DE VONTADE (Willpower) ==========
// Vontade = resistencia ao roubo de PA/PM.
// Base derivada de Sabedoria: Math.floor(wisdom / 10)
// Dinamica: +1 por PA/PM roubado, rastreado per-attacker, reseta no turno do atacante.
// Estrutura: { 'entityId': { base: N, gained: { 'attackerEntityId': N } } }

var combatVontade = {};

// Retorna Vontade total de uma entidade (base + TODA Vontade acumulada de todos os atacantes)
// O rastreamento per-attacker serve APENAS para saber o que resetar na vez de cada atacante.
function getEntityVontade(entityId) {
    var v = combatVontade[entityId];
    if (!v) return 0;
    var total = v.base || 0;
    if (v.gained) {
        for (var atkId in v.gained) {
            total += v.gained[atkId];
        }
    }
    return total;
}

// Adiciona Vontade dinamica a vitima contra atacante especifico
function addVontadeGained(victimId, attackerId, amount) {
    if (!combatVontade[victimId]) combatVontade[victimId] = { base: 0, gained: {} };
    if (!combatVontade[victimId].gained[attackerId]) combatVontade[victimId].gained[attackerId] = 0;
    combatVontade[victimId].gained[attackerId] += amount;
}

// Reseta Vontade dinamica acumulada contra um atacante especifico (chamado no inicio do turno do atacante)
function resetVontadeGainedByAttacker(attackerId) {
    for (var entityId in combatVontade) {
        if (combatVontade[entityId].gained) {
            delete combatVontade[entityId].gained[attackerId];
        }
    }
}

// Roll contestado de Vontade: chance proporcional atk/(atk+def)
function rollVontadeContest(attackerVontade, defenderVontade) {
    if (attackerVontade <= 0 && defenderVontade <= 0) return true;
    if (defenderVontade <= 0) return true;
    if (attackerVontade <= 0) return false;
    var chance = attackerVontade / (attackerVontade + defenderVontade);
    return Math.random() < chance;
}

// Converte valor de resistencia para porcentagem de reducao (diminishing returns)
// Positivo = reducao de dano, Negativo = amplificacao de dano
// 0→0%, 80→28.6%, 100→33.3%, 200→50%, negativo→amplificacao
function resistToPercent(resist) {
    return resist / (Math.abs(resist) + 200) * 100;
}

// Retorna resistencia efetiva de um alvo para um elemento
// Para player: totalAttrs ja tem res_general distribuido por calculateTotalAttributes
// Para monstros: soma res_especifica + res_general de target.stats
function getTargetResistance(target, element, totalAttrs) {
    var resKey = 'res_' + (element === 'none' ? 'neutral' : element);
    if (target === playerEntity) return totalAttrs[resKey] || 0;
    var st = target.stats || {};
    return (st[resKey] || 0) + (st.res_general || 0);
}

// Resolve elemento cromático: retorna o elemento com maior bônus de dano do caster
function resolveChromaticElement(totalAttrs) {
    let bestElem = CHROMATIC_TIEBREAK[0];
    let bestVal = -Infinity;
    for (const elem of CHROMATIC_TIEBREAK) {
        const key = elem === 'neutral' ? 'dmg_neutral' : 'dmg_' + elem;
        const val = totalAttrs[key] || 0;
        if (val > bestVal) {
            bestVal = val;
            bestElem = elem === 'neutral' ? 'none' : elem;
        }
    }
    return bestElem;
}

// Helpers para acessar HP de qualquer entidade (player usa playerStats)
function getEntityHp(target) {
    if (simCombatState.active) {
        const p = simCombatState.participants.find(p => p.entity === target);
        if (p) return simCombatState.entityStats[p.id].hp;
    }
    return target === playerEntity ? playerStats.hp : target.hp;
}
function getEntityMaxHp(target) {
    if (simCombatState.active) {
        const p = simCombatState.participants.find(p => p.entity === target);
        if (p) return simCombatState.entityStats[p.id].maxHp;
    }
    return target === playerEntity ? playerStats.maxHp : (target.maxHp || target.hp);
}
function setEntityHp(target, val) {
    if (simCombatState.active) {
        const p = simCombatState.participants.find(p => p.entity === target);
        if (p) {
            simCombatState.entityStats[p.id].hp = val;
            // Limpa desencarne se curado (HP volta a > 0)
            if (val > 0 && target.desencarneCounter) target.desencarneCounter = 0;
            // Init desencarne ao morrer (transição vivo→morto, exceto player que tem zumbi)
            if (val <= 0 && !target.desencarneCounter && target !== playerEntity) {
                initDesencarne(target);
            }
            // Remove invocação morta do activeSummons e turnOrder
            if (val <= 0 && typeof combatState !== 'undefined') {
                if (combatState.activeSummons) {
                    combatState.activeSummons = combatState.activeSummons.filter(function(s) {
                        return s.entity !== target;
                    });
                }
                if (combatState.turnOrder) {
                    combatState.turnOrder = combatState.turnOrder.filter(function(t) {
                        return t.entity !== target;
                    });
                }
                // Invocação controlada morre durante seu turno: auto-end turno
                if (target.controlled && p.id === simCombatState.participants[simCombatState.currentIndex].id) {
                    // Restaura passiveBoosts se salvos
                    if (simCombatState._savedPassiveBoosts) {
                        combatState.passiveBoosts = simCombatState._savedPassiveBoosts;
                        delete simCombatState._savedPassiveBoosts;
                    }
                    if (typeof addChatMessage === 'function') {
                        addChatMessage('💀 ' + (target.name || 'Invocação') + ' foi destruída!', '#ff4444', 'combat');
                    }
                    setTimeout(function() {
                        if (simCombatState.active && typeof simCombatPassTurn === 'function') {
                            simCombatPassTurn();
                        }
                    }, 500);
                }
            }
            return;
        }
    }
    if (target === playerEntity) { playerStats.hp = val; updateHealthBar(); }
    else {
        target.hp = val;
        // Limpa desencarne se curado (HP volta a > 0)
        if (val > 0 && target.desencarneCounter) target.desencarneCounter = 0;
        // Init desencarne ao morrer (transição vivo→morto, exceto player que tem zumbi)
        if (val <= 0 && !target.desencarneCounter && target !== playerEntity) {
            initDesencarne(target);
        }
        // Remove invocação morta do activeSummons e turnOrder
        if (val <= 0 && typeof combatState !== 'undefined') {
            if (combatState.activeSummons) {
                combatState.activeSummons = combatState.activeSummons.filter(function(s) {
                    return s.entity !== target;
                });
            }
            if (combatState.turnOrder) {
                combatState.turnOrder = combatState.turnOrder.filter(function(t) {
                    return t.entity !== target;
                });
            }
        }
    }
}

// Helpers para acessar Escudo (armor) de qualquer entidade
function getEntityArmor(target) {
    if (simCombatState.active) {
        var p = simCombatState.participants.find(function(p) { return p.entity === target; });
        if (p) return simCombatState.entityStats[p.id].armor || 0;
    }
    if (target === playerEntity) return (combatStats.player && combatStats.player.armor) || 0;
    if (combatState.enemies) {
        for (var i = 0; i < combatState.enemies.length; i++) {
            if (combatState.enemies[i] === target) {
                var eid = i === 0 ? 'enemy' : 'enemy_' + i;
                return (combatState.enemyStats[eid] && combatState.enemyStats[eid].armor) || 0;
            }
        }
    }
    return 0;
}
function setEntityArmor(target, val) {
    var maxArmor = Math.floor(getEntityMaxHp(target) * 0.5);
    val = Math.max(0, Math.min(val, maxArmor));
    if (simCombatState.active) {
        var p = simCombatState.participants.find(function(p) { return p.entity === target; });
        if (p) { simCombatState.entityStats[p.id].armor = val; return; }
    }
    if (target === playerEntity) { if (combatStats.player) combatStats.player.armor = val; return; }
    if (combatState.enemies) {
        for (var i = 0; i < combatState.enemies.length; i++) {
            if (combatState.enemies[i] === target) {
                var eid = i === 0 ? 'enemy' : 'enemy_' + i;
                if (combatState.enemyStats[eid]) combatState.enemyStats[eid].armor = val;
                return;
            }
        }
    }
}
function getEntityMaxArmor(target) {
    return Math.floor(getEntityMaxHp(target) * 0.5);
}

// Helpers para acessar PA (Pontos de Ação) de qualquer entidade
function getEntityPA(target) {
    if (simCombatState.active) {
        var p = simCombatState.participants.find(function(p) { return p.entity === target; });
        if (p && simCombatState.entityStats[p.id]) return simCombatState.entityStats[p.id].pa || 0;
    }
    if (target === playerEntity) return (combatStats.player && combatStats.player.pa) || 0;
    if (combatState.enemies) {
        for (var i = 0; i < combatState.enemies.length; i++) {
            if (combatState.enemies[i] === target) {
                var eid = i === 0 ? 'enemy' : 'enemy_' + i;
                return (combatState.enemyStats[eid] && combatState.enemyStats[eid].pa) || 0;
            }
        }
    }
    return 0;
}
function getEntityMaxPA(target) {
    if (simCombatState.active) {
        var p = simCombatState.participants.find(function(p) { return p.entity === target; });
        if (p && simCombatState.entityStats[p.id]) return simCombatState.entityStats[p.id].maxPa || 6;
    }
    if (target === playerEntity) return (combatStats.player && combatStats.player.maxPa) || 6;
    if (combatState.enemies) {
        for (var i = 0; i < combatState.enemies.length; i++) {
            if (combatState.enemies[i] === target) {
                var eid = i === 0 ? 'enemy' : 'enemy_' + i;
                return (combatState.enemyStats[eid] && combatState.enemyStats[eid].maxPa) || 6;
            }
        }
    }
    return 6;
}
function setEntityPA(target, val) {
    val = Math.max(0, val);
    if (simCombatState.active) {
        var p = simCombatState.participants.find(function(p) { return p.entity === target; });
        if (p && simCombatState.entityStats[p.id]) { simCombatState.entityStats[p.id].pa = val; return; }
    }
    if (target === playerEntity) { if (combatStats.player) combatStats.player.pa = val; return; }
    if (combatState.enemies) {
        for (var i = 0; i < combatState.enemies.length; i++) {
            if (combatState.enemies[i] === target) {
                var eid = i === 0 ? 'enemy' : 'enemy_' + i;
                if (combatState.enemyStats[eid]) combatState.enemyStats[eid].pa = val;
                // Sync com combatStats.enemy se for o inimigo ativo
                if (combatStats.enemy && combatState.turnOrder && combatState.turnOrder[combatState.currentTurnIndex]) {
                    var activeEid = combatState.turnOrder[combatState.currentTurnIndex].id;
                    if (activeEid === eid) combatStats.enemy.pa = val;
                }
                return;
            }
        }
    }
}

// Helpers para acessar PM (Pontos de Movimento) de qualquer entidade
function getEntityPM(target) {
    if (simCombatState.active) {
        var p = simCombatState.participants.find(function(p) { return p.entity === target; });
        if (p && simCombatState.entityStats[p.id]) return simCombatState.entityStats[p.id].pm || 0;
    }
    if (target === playerEntity) return (combatStats.player && combatStats.player.pm) || 0;
    if (combatState.enemies) {
        for (var i = 0; i < combatState.enemies.length; i++) {
            if (combatState.enemies[i] === target) {
                var eid = i === 0 ? 'enemy' : 'enemy_' + i;
                return (combatState.enemyStats[eid] && combatState.enemyStats[eid].pm) || 0;
            }
        }
    }
    return 0;
}
function getEntityMaxPM(target) {
    if (simCombatState.active) {
        var p = simCombatState.participants.find(function(p) { return p.entity === target; });
        if (p && simCombatState.entityStats[p.id]) return simCombatState.entityStats[p.id].maxPm || 3;
    }
    if (target === playerEntity) return (combatStats.player && combatStats.player.maxPm) || 3;
    if (combatState.enemies) {
        for (var i = 0; i < combatState.enemies.length; i++) {
            if (combatState.enemies[i] === target) {
                var eid = i === 0 ? 'enemy' : 'enemy_' + i;
                return (combatState.enemyStats[eid] && combatState.enemyStats[eid].maxPm) || 3;
            }
        }
    }
    return 3;
}
function setEntityPM(target, val) {
    val = Math.max(0, val);
    if (simCombatState.active) {
        var p = simCombatState.participants.find(function(p) { return p.entity === target; });
        if (p && simCombatState.entityStats[p.id]) { simCombatState.entityStats[p.id].pm = val; return; }
    }
    if (target === playerEntity) { if (combatStats.player) combatStats.player.pm = val; return; }
    if (combatState.enemies) {
        for (var i = 0; i < combatState.enemies.length; i++) {
            if (combatState.enemies[i] === target) {
                var eid = i === 0 ? 'enemy' : 'enemy_' + i;
                if (combatState.enemyStats[eid]) combatState.enemyStats[eid].pm = val;
                // Sync com combatStats.enemy se for o inimigo ativo
                if (combatStats.enemy && combatState.turnOrder && combatState.turnOrder[combatState.currentTurnIndex]) {
                    var activeEid = combatState.turnOrder[combatState.currentTurnIndex].id;
                    if (activeEid === eid) combatStats.enemy.pm = val;
                }
                return;
            }
        }
    }
}

// Helpers para acessar PE (Pontos Especiais) de qualquer entidade
function getEntityPE(target) {
    if (simCombatState.active) {
        var p = simCombatState.participants.find(function(p) { return p.entity === target; });
        if (p && simCombatState.entityStats[p.id]) return simCombatState.entityStats[p.id].pe || 0;
    }
    if (target === playerEntity) return playerStats.pe || 0;
    if (combatState.enemies) {
        for (var i = 0; i < combatState.enemies.length; i++) {
            if (combatState.enemies[i] === target) {
                var eid = i === 0 ? 'enemy' : 'enemy_' + i;
                return (combatState.enemyStats[eid] && combatState.enemyStats[eid].pe) || 0;
            }
        }
    }
    return 0;
}
function getEntityMaxPE(target) {
    if (simCombatState.active) {
        var p = simCombatState.participants.find(function(p) { return p.entity === target; });
        if (p && simCombatState.entityStats[p.id]) return simCombatState.entityStats[p.id].maxPe || 0;
    }
    if (target === playerEntity) return playerStats.maxPe || 0;
    if (combatState.enemies) {
        for (var i = 0; i < combatState.enemies.length; i++) {
            if (combatState.enemies[i] === target) {
                var eid = i === 0 ? 'enemy' : 'enemy_' + i;
                return (combatState.enemyStats[eid] && combatState.enemyStats[eid].maxPe) || 0;
            }
        }
    }
    return 0;
}
function setEntityPE(target, val) {
    val = Math.max(0, val);
    if (simCombatState.active) {
        var p = simCombatState.participants.find(function(p) { return p.entity === target; });
        if (p && simCombatState.entityStats[p.id]) { simCombatState.entityStats[p.id].pe = val; return; }
    }
    if (target === playerEntity) { playerStats.pe = val; return; }
    if (combatState.enemies) {
        for (var i = 0; i < combatState.enemies.length; i++) {
            if (combatState.enemies[i] === target) {
                var eid = i === 0 ? 'enemy' : 'enemy_' + i;
                if (combatState.enemyStats[eid]) combatState.enemyStats[eid].pe = val;
                if (combatStats.enemy && combatState.turnOrder && combatState.turnOrder[combatState.currentTurnIndex]) {
                    var activeEid = combatState.turnOrder[combatState.currentTurnIndex].id;
                    if (activeEid === eid) combatStats.enemy.pe = val;
                }
                return;
            }
        }
    }
}

// Busca a entity de um participante pelo ID (para dano indireto, armadilhas, DoT)
function _findCasterEntity(casterId) {
    if (!casterId) return null;
    if (simCombatState.active) {
        var p = simCombatState.participants.find(function(pp) { return pp.id === casterId; });
        if (p && p.entity) return p.entity;
    }
    if (casterId === 'player') return typeof playerEntity !== 'undefined' ? playerEntity : null;
    if (combatState.turnOrder) {
        var t = combatState.turnOrder.find(function(tt) { return tt.id === casterId; });
        if (t && t.entity) return t.entity;
    }
    if (combatState.enemies) {
        for (var i = 0; i < combatState.enemies.length; i++) {
            var eid = i === 0 ? 'enemy' : 'enemy_' + i;
            if (eid === casterId) return combatState.enemies[i];
        }
    }
    return null;
}

// Aplica dano a UMA entidade (sem deduzir custos)
// options (opcional): { overrideCasterId, isIndirect, trapOriginX, trapOriginY }
//   overrideCasterId: ID do caster real (para armadilhas/DoT fora do turno do caster)
//   isIndirect: marca como dano indireto (nao revela invisibilidade)
//   trapOriginX/Y: posicao da origem do dano indireto (para calculo melee/range)
function dealDamageToTarget(target, spell, isLifeSteal, options) {
    // DESENCARNE: dano em entidade morta reduz contador ao invés de causar dano
    if (target && isDesencarnePending(target) && getEntityHp(target) <= 0) {
        degradeDesencarne(target, 'damage');
        if (typeof addFloatingText === 'function')
            addFloatingText(target.x, target.y, '-1 Desencarne', '#aaaaaa', 'desencarne');
        return 0;
    }
    if (!spell.damage || (spell.damage.min === 0 && spell.damage.max === 0)) {
        return 0;
    }
    const { total } = calculateTotalAttributes();
    // Resolve elemento cromático
    let resolvedElem = spell.element || 'none';
    if (resolvedElem === 'chromatic') resolvedElem = resolveChromaticElement(total);
    // Stat de scaling: determinado pelo ELEMENTO do feitiço (fire→INT, earth→STR, air→AGI, water→LCK)
    const scalingStat = getElementStat(resolvedElem);
    const statValue = total[scalingStat] || 10;
    const poderValue = total.poder || 0; // Poder: stat universal que boosta TODOS elementos
    let baseDmg = spell.damage.min + Math.random() * (spell.damage.max - spell.damage.min);
    // Flat bonus de passivos equipados (ex: passivo que dá +5 dano de fogo)
    const passiveBonus = (combatState.passiveBoosts && resolvedElem && resolvedElem !== 'none')
        ? (combatState.passiveBoosts['dmg_' + resolvedElem] || 0) : 0;
    // Scaling: stat + poder como % do dano base, flat somado depois
    // Cada ponto de stat = +1% dano base. 100 STR = dobra o dano. 300 STR = quadruplica.
    let rawDmg = baseDmg * (1 + (statValue + poderValue) / 100) + passiveBonus;

    // Resolve caster ID (usado por efeitos ativos)
    var _isMonsterTurn = !simCombatState.active && combatState.turnOrder && combatState.turnOrder.length > 0 &&
                          combatState.turnOrder[combatState.currentTurnIndex] &&
                          combatState.turnOrder[combatState.currentTurnIndex].type === 'monster';
    var _dmgCasterId;
    var _isIndirect = options && options.isIndirect;

    // Override de casterId para dano indireto (armadilhas, DoT, etc.)
    if (options && options.overrideCasterId) {
        _dmgCasterId = options.overrideCasterId;
        // Determinar se o caster override eh monstro ou player
        if (simCombatState.active) {
            var _overP = simCombatState.participants.find(function(pp) { return pp.id === _dmgCasterId; });
            if (_overP) _isMonsterTurn = (_overP.type === 'monster');
        } else {
            _isMonsterTurn = (_dmgCasterId !== 'player' && _dmgCasterId.indexOf('player') !== 0);
        }
    } else {
        _dmgCasterId = simCombatState.active
            ? simCombatState.participants[simCombatState.currentIndex].id
            : (_isMonsterTurn ? 'enemy' : 'player');
    }

    // Aplica modificadores de efeitos ativos do CASTER (ex: Poderoso +10% dano)
    if (typeof getEffectModifier === 'function') {
        var dmgPercentBonus = getEffectModifier(_dmgCasterId, 'dmg_dealt', 'percent');
        if (dmgPercentBonus > 0) {
            rawDmg *= (1 + dmgPercentBonus / 100);
        }
        // Redução de dano final por efeitos (ex: Erosão -3%/stack)
        var dmgPercentReduce = getEffectModifier(_dmgCasterId, 'dmg_dealt', 'percent_reduce');
        if (dmgPercentReduce > 0) {
            rawDmg *= (1 - dmgPercentReduce / 100);
        }
    }

    // % Dano Elemental (de itens/sets) + % Dano Geral (de itens raros)
    // dmg_fire, dmg_earth, etc = % bônus específico do elemento (vem de equipamento)
    // dmg_geral = % bônus que aplica a TODOS elementos incluindo neutro
    // Ambos são ADITIVOS entre si (somam no mesmo bucket pra evitar spikes)
    const elemKey = resolvedElem === 'none' ? 'neutral' : resolvedElem;
    const elemAttrBonus = total['dmg_' + elemKey] || 0;
    const dmgGeralBonus = total.dmg_geral || 0;
    if (elemAttrBonus > 0 || dmgGeralBonus > 0) {
        rawDmg *= (1 + (elemAttrBonus + dmgGeralBonus) / 100);
    }

    // Bônus de dano de aura (passiveZone) — caster dentro de aura com bonusDamage
    var _auraCasterEnt = (options && options.overrideCasterId)
        ? _findCasterEntity(options.overrideCasterId)
        : (simCombatState.active
            ? simCombatState.participants[simCombatState.currentIndex].entity
            : (_isMonsterTurn && combatState.turnOrder && combatState.turnOrder[combatState.currentTurnIndex]
                ? combatState.turnOrder[combatState.currentTurnIndex].entity : playerEntity));
    if (_auraCasterEnt) {
        var _auraDmg = getAuraBonusForEntity(_auraCasterEnt, 'bonusDamage');
        if (_auraDmg.flat > 0 || _auraDmg.percent > 0) {
            rawDmg += _auraDmg.flat;
            if (_auraDmg.percent > 0) rawDmg *= (1 + _auraDmg.percent / 100);
        }
    }

    // Aplica bônus de pontos de distribuição de dano (5x mais fraco que itens)
    // playerAllocatedDamage é acessível do escopo global
    if (typeof playerAllocatedDamage !== 'undefined' && !_isMonsterTurn) {
        let distributionBonus = 0;

        if (_isIndirect && options.trapOriginX !== undefined) {
            // === DANO INDIRETO: calcular melee/range por distância caster→alvo ===
            var _indCasterEnt = _findCasterEntity(_dmgCasterId);
            if (_indCasterEnt) {
                var _indCasterDist = Math.abs(Math.floor(_indCasterEnt.x) - Math.floor(target.x))
                                   + Math.abs(Math.floor(_indCasterEnt.y) - Math.floor(target.y));
                if (_indCasterDist <= 2 && playerAllocatedDamage.dmg_melee > 0) {
                    distributionBonus += playerAllocatedDamage.dmg_melee;
                } else if (_indCasterDist >= 3 && playerAllocatedDamage.dmg_range > 0) {
                    distributionBonus += playerAllocatedDamage.dmg_range;
                }
            }

            // Zone vs single baseado na config da armadilha/DoT
            var _indAoe = spell.aoeType || 'single';
            if (_indAoe === 'zone' && playerAllocatedDamage.dmg_zone > 0) {
                distributionBonus += playerAllocatedDamage.dmg_zone;
            } else if (_indAoe !== 'zone' && playerAllocatedDamage.dmg_single > 0) {
                distributionBonus += playerAllocatedDamage.dmg_single;
            }

            // Bonus de dano indireto (novo stat de items/passivas)
            if (playerAllocatedDamage.dmg_indirect > 0) {
                distributionBonus += playerAllocatedDamage.dmg_indirect;
            }
        } else {
            // === DANO DIRETO: logica original ===
            // Dano Alvo Único: aplica se aoeType é 'single' ou não existe
            const isSingleTarget = !spell.aoeType || spell.aoeType === 'single';
            if (isSingleTarget && playerAllocatedDamage.dmg_single > 0) {
                distributionBonus += playerAllocatedDamage.dmg_single;
            }

            // Dano em Zona: aplica se aoeType é 'zone'
            if (spell.aoeType === 'zone' && playerAllocatedDamage.dmg_zone > 0) {
                distributionBonus += playerAllocatedDamage.dmg_zone;
            }

            // Dano à Distância: aplica se range >= 3
            const spellRange = spell.range || 0;
            if (spellRange >= 3 && playerAllocatedDamage.dmg_range > 0) {
                distributionBonus += playerAllocatedDamage.dmg_range;
            }

            // Dano CaC (corpo a corpo): aplica se range <= 2 (inclui casa 0 = sobre o lançador)
            if (spellRange <= 2 && playerAllocatedDamage.dmg_melee > 0) {
                distributionBonus += playerAllocatedDamage.dmg_melee;
            }
        }

        // Conversão: 1 ponto = 1% de dano (mesmo impacto que equipamentos)
        if (distributionBonus > 0) {
            rawDmg *= (1 + distributionBonus / 100);
        }
    }

    // === CONSUMO DE ARDENTE (verifica se alvo tem efeito 'ardente') ===
    var _targetHasArdente = false;
    var _ardenteTargetId = null;
    if (spell.consumesArdente) {
        _ardenteTargetId = typeof getParticipantIdForEntity === 'function'
            ? getParticipantIdForEntity(target) : null;
        if (_ardenteTargetId && typeof getActiveEffects === 'function') {
            _targetHasArdente = getActiveEffects(_ardenteTargetId).some(function(e) {
                return e.effectId === 'ardente';
            });
        }
    }

    // Bonus de dano contra alvos com escudo (spell.bonusVsArmored)
    // Se ardente: usa ardenteBonusVsArmored no lugar do bonusVsArmored base
    var _bvArmored = spell.bonusVsArmored || 0;
    if (_targetHasArdente && spell.ardenteBonusVsArmored) {
        _bvArmored = spell.ardenteBonusVsArmored;
    }
    if (_bvArmored > 0 && getEntityArmor(target) > 0) {
        rawDmg *= (1 + _bvArmored / 100);
    }
    // Bonus de dano contra escudo via efeitos ativos do caster
    if (typeof getEffectModifier === 'function' && getEntityArmor(target) > 0) {
        var effectBonusArmor = getEffectModifier(_dmgCasterId, 'bonus_vs_armored', 'percent');
        if (effectBonusArmor > 0) rawDmg *= (1 + effectBonusArmor / 100);
    }

    // Bonus de dano por consumo de Ardente (ex: Golpe Incandescente +20%)
    if (_targetHasArdente && spell.ardenteBonus) {
        rawDmg *= (1 + spell.ardenteBonus / 100);
    }

    // Consome o efeito Ardente do alvo (remove)
    if (_targetHasArdente && _ardenteTargetId) {
        var _arEffects = typeof getActiveEffects === 'function' ? getActiveEffects(_ardenteTargetId) : [];
        var _arIdx = _arEffects.findIndex(function(e) { return e.effectId === 'ardente'; });
        if (_arIdx !== -1) {
            _arEffects.splice(_arIdx, 1);
            if (typeof addFloatingText === 'function') {
                addFloatingText(target.x, target.y, 'Ardente Consumido!', '#ff6633', 'status');
            }
        }
    }

    // Resistencia elemental do alvo
    var targetResist = getTargetResistance(target, resolvedElem, total);
    // Bônus de resistência de aura (passiveZone)
    var _auraRes = getAuraBonusForEntity(target, 'bonusResistance');
    if (_auraRes.flat > 0 || _auraRes.percent > 0) {
        targetResist += _auraRes.flat;
        if (_auraRes.percent > 0) targetResist += Math.round(targetResist * _auraRes.percent / 100);
    }
    if (targetResist !== 0) {
        var reductionPct = resistToPercent(targetResist) / 100;
        rawDmg *= (1 - reductionPct);
        if (rawDmg < 0) rawDmg = 0;
    }

    // Berserk (bonus maximo quando caster a 50% HP, SO ATIVA SE HP <= 50%)
    if (spell.berserk && spell.berserk > 0) {
        var _casterEntity = (options && options.overrideCasterId)
            ? _findCasterEntity(options.overrideCasterId)
            : (simCombatState.active
                ? simCombatState.participants[simCombatState.currentIndex].entity
                : (_isMonsterTurn && combatState.turnOrder[combatState.currentTurnIndex]
                    ? combatState.turnOrder[combatState.currentTurnIndex].entity : playerEntity));
        var _casterHpPct = (getEntityHp(_casterEntity) / getEntityMaxHp(_casterEntity)) * 100;

        // So ativa se HP <= 50%
        if (_casterHpPct <= 50) {
            // Distancia de 50%: quanto mais perto de 50%, maior o bonus
            var distDe50 = Math.abs(_casterHpPct - 50);
            var berserkBonus = 100 - (distDe50 * 2); // +100% em 50%, 0% em 0%
            berserkBonus = Math.max(0, berserkBonus);

            rawDmg *= (1 + berserkBonus / 100);
        }
    }

    // HP Scaling por Threshold (execute, intacto, berserk)
    if (spell.damageScaling && spell.damageScaling.type && spell.damageScaling.bonus) {
        var _scalingCasterEntity = (options && options.overrideCasterId)
            ? _findCasterEntity(options.overrideCasterId)
            : (simCombatState.active
                ? simCombatState.participants[simCombatState.currentIndex].entity
                : (_isMonsterTurn && combatState.turnOrder[combatState.currentTurnIndex]
                    ? combatState.turnOrder[combatState.currentTurnIndex].entity : playerEntity));
        var scalingType = spell.damageScaling.type;
        var scalingBonus = spell.damageScaling.bonus;
        var scalingThreshold = spell.damageScaling.threshold || 0;
        var scalingApplies = false;

        if (scalingType === 'execute') {
            // Execute: bonus fixo se alvo HP <= threshold%
            var targetHpPct = (getEntityHp(target) / getEntityMaxHp(target)) * 100;
            scalingApplies = targetHpPct <= scalingThreshold;
        } else if (scalingType === 'intacto') {
            // Intacto: bonus fixo se alvo HP = 100%
            scalingApplies = getEntityHp(target) >= getEntityMaxHp(target);
        } else if (scalingType === 'berserk') {
            // Berserk: bonus fixo se conjurador HP <= threshold%
            var casterHpPct = (getEntityHp(_scalingCasterEntity) / getEntityMaxHp(_scalingCasterEntity)) * 100;
            scalingApplies = casterHpPct <= scalingThreshold;
        }

        if (scalingApplies && scalingBonus > 0) {
            rawDmg *= (1 + scalingBonus / 100);
        }
    }

    // Intacto (+X% quando alvo a 100% HP)
    if (spell.intacto && spell.intacto > 0 && getEntityHp(target) >= getEntityMaxHp(target)) {
        rawDmg *= (1 + spell.intacto / 100);
    }
    // Firme e Forte (+X% quando alvo >= 80% HP)
    if (spell.firmeEForte && spell.firmeEForte > 0) {
        var _tgtHpPct = getEntityMaxHp(target) > 0 ? getEntityHp(target) / getEntityMaxHp(target) : 0;
        if (_tgtHpPct >= 0.80) rawDmg *= (1 + spell.firmeEForte / 100);
    }

    // Bônus de dano geral de passivos equipados (ex: Poder Bruto +5%)
    var _pb = (typeof combatState !== 'undefined' && combatState.passiveBoosts) ? combatState.passiveBoosts : {};
    if (!_isMonsterTurn && _pb._damageBonus) {
        rawDmg *= (1 + _pb._damageBonus / 100);
    }

    // Bônus vs escudo de passivos (ex: Perfurar Armadura +15%)
    if (!_isMonsterTurn && _pb._bonusVsArmored && _pb._bonusVsArmored > 0 && getEntityArmor(target) > 0) {
        rawDmg *= (1 + _pb._bonusVsArmored / 100);
    }

    // Bônus corpo-a-corpo de passivos (ex: Tiro à Queima-Roupa +20% se dist <= 3)
    if (!_isMonsterTurn && _pb._closeCombatBonus) {
        var _ccb = _pb._closeCombatBonus;
        var _casterEnt = (options && options.overrideCasterId)
            ? _findCasterEntity(options.overrideCasterId)
            : (simCombatState.active
                ? simCombatState.participants[simCombatState.currentIndex].entity
                : playerEntity);
        var _distToTarget = Math.abs(_casterEnt.x - target.x) + Math.abs(_casterEnt.y - target.y);
        if (_distToTarget <= (_ccb.maxRange || 3)) {
            rawDmg *= (1 + (_ccb.damagePercent || 0) / 100);
        }
    }

    // Bônus/penalidade de toggle spell ativo (ex: Frenesi +40%, Aura Sagrada -15%)
    if (!_isMonsterTurn && typeof getActiveToggleEffect === 'function') {
        var _toggleEff = getActiveToggleEffect();
        if (_toggleEff) {
            if (_toggleEff.damageBonus) rawDmg *= (1 + _toggleEff.damageBonus / 100);
            if (_toggleEff.dmgPenalty) rawDmg *= (1 - _toggleEff.dmgPenalty / 100);
        }
    }

    // Stack Mechanic: bônus de dano por stacks consecutivos (Zefir e similares)
    if (spell.stackMechanic && !_isIndirect) {
        var _stackBonus = getAndUpdateSpellStacks(spell, target);
        var _stk = combatState.spellStacks[spell.id];
        var _stkLvl = _stk ? _stk.stacks : 0;
        if (_stackBonus > 0) {
            rawDmg *= (1 + _stackBonus / 100);
        }
        if (typeof addFloatingText === 'function' && _stkLvl > 0) {
            var _stkText = 'Stack ' + _stkLvl + '/' + spell.stackMechanic.maxStacks + '!';
            if (_stackBonus > 0) _stkText += ' +' + _stackBonus + '%';
            addFloatingText(target.x, target.y, _stkText, '#ffcc00', 'status');
        }
        if (typeof addChatMessage === 'function') {
            var _stkTypeName = spell.stackMechanic.type === 'caster' ? 'lançador' : 'alvo';
            addChatMessage('📈 <span style="color:#ffcc00">' + spell.name + '</span> Stack ' + _stkLvl + '/' + spell.stackMechanic.maxStacks + ' (' + _stkTypeName + ')' + (_stackBonus > 0 ? ' — <span style="color:#44ff44">+' + _stackBonus + '% dano</span>' : ''), '#ffcc00', 'combat');
        }
    }

    // DOM Zefir: +30% dano no próximo golpe (consumível, só contra inimigos)
    var _domConsumedNextHit = false;
    if (!_isIndirect && !_isMonsterTurn && combatState.domZefir && combatState.domZefir[_dmgCasterId]) {
        var _domD = combatState.domZefir[_dmgCasterId];
        if (_domD.nextHitBonus) {
            // Verifica se alvo é inimigo (não aliado)
            var _domIsEnemy = false;
            if (simCombatState.active) {
                var _domCasterP = simCombatState.participants.find(function(p) { return p.id === _dmgCasterId; });
                var _domTargetP = simCombatState.participants.find(function(p) { return p.entity === target; });
                if (_domCasterP && _domTargetP) {
                    var _domCTeam = _domCasterP.type === 'monster' ? 'monster' : 'player';
                    var _domTTeam = _domTargetP.type === 'monster' ? 'monster' : 'player';
                    _domIsEnemy = (_domCTeam !== _domTTeam);
                }
            } else {
                _domIsEnemy = (target !== playerEntity);
            }
            if (_domIsEnemy) {
                rawDmg *= 1.30;
                _domD.nextHitBonus = false;
                _domConsumedNextHit = true;
            }
        }
    }

    // Golpe Crítico: +30% base, +dano_critico como coringa (peso /200), +passivos
    var critChance = (total.critico || 0) + (_isMonsterTurn ? 0 : (_pb.critico || 0));
    // DOM Zefir: +20% crítico por 1 turno
    if (!_isMonsterTurn && combatState.domZefir && combatState.domZefir[_dmgCasterId] && combatState.domZefir[_dmgCasterId].critBonus > 0) {
        critChance += combatState.domZefir[_dmgCasterId].critBonus;
    }
    const isCrit = Math.random() * 100 < critChance;
    _lastDealCrit = _lastDealCrit || isCrit; // Acumula crit para perTarget
    if (isCrit) {
        var _critMultiplier = 1.30;
        if (total.dano_critico > 0) _critMultiplier += total.dano_critico / 200;
        if (!_isMonsterTurn && _pb._critDmgBonus) _critMultiplier += _pb._critDmgBonus / 100;
        rawDmg *= _critMultiplier;
    }

    let finalDmg = Math.max(0, Math.round(rawDmg));

    // Redução de dano recebido de passivos do alvo (ex: Redução de Dano -5%)
    if (target === playerEntity && _pb._damageReduction) {
        finalDmg = Math.round(finalDmg * (1 - _pb._damageReduction / 100));
    }

    // Esquiva (Dodge) do alvo — chance de evitar COMPLETAMENTE o dano
    let isDodge = false;
    var _auraDodge = getAuraBonusForEntity(target, 'bonusDodge');
    if (target === playerEntity) {
        var targetDodge = (calculateTotalAttributes().total.dodge || 0) + (_pb.dodge || 0) + _auraDodge.flat;
        if (_auraDodge.percent > 0) targetDodge += Math.round(targetDodge * _auraDodge.percent / 100);
        if (targetDodge > 0 && Math.random() * 100 < targetDodge) {
            isDodge = true;
            finalDmg = 0;
        }
    } else {
        var targetDodge = (target.dodge || 0) + _auraDodge.flat;
        if (_auraDodge.percent > 0) targetDodge += Math.round(targetDodge * _auraDodge.percent / 100);
        if (targetDodge > 0 && Math.random() * 100 < targetDodge) {
            isDodge = true;
            finalDmg = 0;
        }
    }

    // Bloqueio (Block) do alvo — chance de reduzir dano em 50%
    let isBlock = false;
    if (!isDodge) {
        // Bônus de bloqueio de aura (passiveZone) — via helper reutilizável
        var _auraBlock = getAuraBonusForEntity(target, 'bonusBlock');
        var _auraBlockFlat = _auraBlock.flat;
        var _auraBlockPct = _auraBlock.percent;

        if (target === playerEntity) {
            var targetBlock = (calculateTotalAttributes().total.block || 0) + (_pb.block || 0) + _auraBlockFlat;
            if (_auraBlockPct > 0) targetBlock += Math.round(targetBlock * _auraBlockPct / 100);
            // Modificadores de efeitos (ex: closeRangeEffect block reduction)
            if (typeof getEffectModifier === 'function') {
                targetBlock += getEffectModifier('player', 'block', 'flat');
            }
            if (targetBlock > 0 && Math.random() * 100 < targetBlock) {
                finalDmg = Math.round(finalDmg * 0.5);
                isBlock = true;
            }
        } else {
            var targetBlock = (target.block || 0) + _auraBlockFlat;
            if (_auraBlockPct > 0) targetBlock += Math.round(targetBlock * _auraBlockPct / 100);
            // Modificadores de efeitos (ex: closeRangeEffect block reduction)
            var _blockTargetId = (typeof getParticipantIdForEntity === 'function') ? getParticipantIdForEntity(target) : null;
            if (_blockTargetId && typeof getEffectModifier === 'function') {
                targetBlock += getEffectModifier(_blockTargetId, 'block', 'flat');
            }
            if (targetBlock > 0 && Math.random() * 100 < targetBlock) {
                finalDmg = Math.round(finalDmg * 0.5);
                isBlock = true;
            }
        }
    }

    // Parada do alvo (chance de reduzir dano em 30%) — independente de dodge/block
    let isParada = false;
    let targetParada = 0;
    if (!isDodge && !isBlock) {
        if (target === playerEntity) {
            targetParada = calculateTotalAttributes().total.parada || 0;
            if (typeof getEffectModifier === 'function') targetParada += getEffectModifier('player', 'parada', 'flat');
        } else {
            targetParada = target.parada || 0;
            // Efeitos de parada para monstros
            if (typeof getEffectModifier === 'function' && combatState.turnOrder) {
                var _parP = combatState.turnOrder.find(function(t) { return t.entity === target; });
                if (_parP) targetParada += getEffectModifier(_parP.id, 'parada', 'flat');
            }
        }
        if (Math.random() * 100 < targetParada) {
            finalDmg = Math.round(finalDmg * 0.7);
            isParada = true;
        }
    }

    // === VERIFICAR SACRIFÍCIO (redireciona dano para outra entidade) ===
    var sacrificeRedirectTarget = null;
    if (typeof hasAdvancedStatus === 'function' && hasAdvancedStatus(target, 'sacrificio')) {
        var sacrificeStatus = target.advancedStatus['sacrificio'];
        if (sacrificeStatus && sacrificeStatus.redirectTo) {
            sacrificeRedirectTarget = sacrificeStatus.redirectTo;

            // Mostrar texto flutuante "SACRIFÍCIO!" no alvo original
            if (typeof addFloatingText === 'function')
                addFloatingText(target.x, target.y, 'SACRIFÍCIO!', '#ff00ff', 'status');
        }
    }

    // Se há redirecionamento, aplicar dano no redirectTarget
    var actualTarget = sacrificeRedirectTarget || target;

    // Absorção de escudo (armor absorve antes de HP)
    var armorAbsorbed = 0;
    var currentArmor = getEntityArmor(actualTarget);
    if (currentArmor > 0 && finalDmg > 0) {
        armorAbsorbed = Math.min(finalDmg, currentArmor);
        setEntityArmor(actualTarget, currentArmor - armorAbsorbed);
        finalDmg -= armorAbsorbed;
    }

    const currentHp = getEntityHp(actualTarget);
    const newHp = Math.max(0, currentHp - finalDmg);
    setEntityHp(actualTarget, newHp);

    // === ON HIT TAKEN TRIGGER ===
    // Trigger aplica no actualTarget (quem realmente levou o dano)
    if (finalDmg > 0 && typeof processOnHitTakenTrigger === 'function') {
        processOnHitTakenTrigger(actualTarget, finalDmg + armorAbsorbed, spell);
    }

    // (Aura de invocação passiveZone agora é processada diretamente no cálculo de bloqueio acima)

    // === ON BLOCK TRIGGER ===
    // Trigger aplica no actualTarget (parada -30% OU bloqueio -50%)
    if ((isParada || isBlock) && typeof processOnBlockTrigger === 'function') {
        var dmgBlocked = isBlock ? Math.round(rawDmg * 0.5) : Math.round(rawDmg * 0.3);
        processOnBlockTrigger(actualTarget, dmgBlocked);
    }

    // Roubo de escudo ao acertar (efeito ativo do caster)
    if (typeof getEffectModifier === 'function' && !isLifeSteal) {
        var stealOnHit = getEffectModifier(_dmgCasterId, 'armor_steal_on_hit', 'flat');
        if (stealOnHit > 0) {
            var targetArmorNow = getEntityArmor(actualTarget);
            var stolen = Math.min(stealOnHit, targetArmorNow);
            if (stolen > 0) {
                setEntityArmor(actualTarget, targetArmorNow - stolen);
                var casterEnt = simCombatState.active
                    ? simCombatState.participants[simCombatState.currentIndex].entity
                    : (_isMonsterTurn && combatState.turnOrder[combatState.currentTurnIndex]
                        ? combatState.turnOrder[combatState.currentTurnIndex].entity : playerEntity);
                setEntityArmor(casterEnt, getEntityArmor(casterEnt) + stolen);
            }
        }
    }

    // Missao intocavel: falha se jogador sofrer dano
    // NOTA: Se o dano foi redirecionado, o alvo original NÃO sofreu dano
    if (actualTarget === playerEntity && finalDmg > 0 && combatState.combatMission && !combatState.combatMission.failed && combatState.combatMission.type === 'intocavel') {
        combatState.combatMission.failed = true;
        if (typeof updateMissionIndicator === 'function') updateMissionIndicator();
    }

    // Floating texts aparecem no actualTarget (quem realmente levou o dano)
    // Escudo absorvido
    if (armorAbsorbed > 0 && typeof addFloatingText === 'function') {
        addFloatingText(actualTarget.x, actualTarget.y, `-${armorAbsorbed} Escudo`, '#6688ff', 'resource');
    }

    // Texto principal de dano (vermelho, crit dourado)
    var totalOrigDmg = finalDmg + armorAbsorbed;
    let dmgText = isLifeSteal ? `rouba ${totalOrigDmg}` : `-${totalOrigDmg}`;
    let dmgColor = '#ff4444';
    let dmgType = 'damage';
    if (spell._comboBonus) {
        dmgText += ` ⚡+${spell._comboBonus}%`;
        dmgColor = '#ffdd44';
    }
    if (isCrit) {
        dmgText += '!';
        dmgColor = '#ffd700';
        dmgType = 'crit';
    }
    if (typeof addFloatingText === 'function')
        addFloatingText(actualTarget.x, actualTarget.y, dmgText, dmgColor, dmgType);

    if (isDodge && typeof addFloatingText === 'function')
        addFloatingText(actualTarget.x, actualTarget.y, 'ESQUIVOU!', '#66ffaa', 'dodge');
    if (isBlock && typeof addFloatingText === 'function')
        addFloatingText(actualTarget.x, actualTarget.y, 'BLOQUEOU!', '#6688ff', 'block');
    if (isParada && typeof addFloatingText === 'function')
        addFloatingText(actualTarget.x, actualTarget.y, 'PARADA!', '#4a9eff', 'block');

    if (getEntityHp(target) <= 0) {
        if (typeof addFloatingText === 'function')
            addFloatingText(actualTarget.x, actualTarget.y, 'DERROTADO!', '#ffd700', 'death');
        if (typeof _diagLog === 'function') _diagLog('MORTE', (target.name||target.type||'?') + ' derrotado por ' + spell.name);

        // === ON KILL TRIGGER ===
        if (typeof processOnKillTrigger === 'function') {
            var killerEntity = simCombatState.active
                ? simCombatState.participants[simCombatState.currentIndex].entity
                : (_isMonsterTurn && combatState.turnOrder[combatState.currentTurnIndex]
                    ? combatState.turnOrder[combatState.currentTurnIndex].entity : playerEntity);
            // Passar o dano total do último golpe (incluindo armor absorvido)
            var lastHitDmg = totalOrigDmg;
            processOnKillTrigger(spell, killerEntity, target, lastHitDmg);
        }

        // === SISTEMA DE ZUMBI: Transformação ao chegar a HP 0 ===
        if (typeof checkZombieTransformation === 'function') {
            var participantId = getParticipantIdForEntity(target);
            checkZombieTransformation(target, participantId);
        }
    }

    // === SISTEMA DE ZUMBI: Degradação por dano (NÃO por cura) ===
    if (target.isZombie && !target.isDead && typeof degradeZombieLevel === 'function') {
        var participantId = getParticipantIdForEntity(target);
        degradeZombieLevel(target, participantId, 'damage');
    }

    // === INVISIBILIDADE: dano direto revela o caster invisivel ===
    if (!_isIndirect && (finalDmg + armorAbsorbed) > 0) {
        var _revealCaster = _findCasterEntity(_dmgCasterId);
        if (_revealCaster && typeof hasAdvancedStatus === 'function' && hasAdvancedStatus(_revealCaster, 'invisivel')) {
            if (typeof removeAdvancedStatus === 'function') removeAdvancedStatus(_revealCaster, 'invisivel');
            if (typeof addFloatingText === 'function')
                addFloatingText(_revealCaster.x, _revealCaster.y, 'Revelado!', '#ffffff', 'status');
        }
    }

    // === INVISIBILIDADE: alvo invisível que morre é revelado (corpo aparece no campo) ===
    if (getEntityHp(target) <= 0 && typeof hasAdvancedStatus === 'function' && hasAdvancedStatus(target, 'invisivel')) {
        if (typeof removeAdvancedStatus === 'function') removeAdvancedStatus(target, 'invisivel');
    }

    // DOM Zefir: floating text quando +30% é consumido
    if (_domConsumedNextHit && typeof addFloatingText === 'function') {
        var _domCEnt = _findCasterEntity(_dmgCasterId);
        if (_domCEnt) addFloatingText(_domCEnt.x, _domCEnt.y, '🎯 DOM +30%!', '#ffdd44', 'status');
    }

    // DOM Zefir: acumular pontos por dano à distância (4+ células)
    if (!_isIndirect && !_isMonsterTurn && (finalDmg + armorAbsorbed) > 0) {
        var _domCasterClassId = null;
        if (simCombatState.active) {
            var _domPart = simCombatState.participants.find(function(p) { return p.id === _dmgCasterId; });
            if (_domPart) _domCasterClassId = _domPart.classId;
        } else if (_dmgCasterId === 'player' && typeof playerStats !== 'undefined') {
            _domCasterClassId = playerStats.classId;
        }
        if (_domCasterClassId === 'zefir') {
            var _domCEnt2 = _findCasterEntity(_dmgCasterId);
            var _domDistCalc = _domCEnt2 ? Math.abs(Math.floor(_domCEnt2.x) - Math.floor(target.x)) + Math.abs(Math.floor(_domCEnt2.y) - Math.floor(target.y)) : 0;
            if (_domDistCalc >= 4) {
                if (!combatState.domZefir) combatState.domZefir = {};
                if (!combatState.domZefir[_dmgCasterId]) combatState.domZefir[_dmgCasterId] = { points: 0, critBonus: 0, nextHitBonus: false, lockedSpellId: null };
                var _domD2 = combatState.domZefir[_dmgCasterId];
                // Se travado no mesmo feitiço que atingiu 100, não acumula
                if (_domD2.lockedSpellId && _domD2.lockedSpellId === spell.id) {
                    // Skip — mesmo feitiço que disparou a ativação (AoE/ricochete restante)
                } else {
                    // Feitiço diferente do que travou? Destrava
                    if (_domD2.lockedSpellId) _domD2.lockedSpellId = null;
                    var _domPaCost = spell.paCost || spell.cost || 0;
                    var _domPts = 5 * _domPaCost;
                    if (_domPts > 0) {
                        _domD2.points += _domPts;
                        if (typeof addFloatingText === 'function' && _domCEnt2) {
                            addFloatingText(_domCEnt2.x, _domCEnt2.y, '🎯+' + _domPts + ' (' + _domD2.points + '/100)', '#aaddff', 'status');
                        }
                        // Verifica threshold de 100 pontos
                        if (_domD2.points >= 100) {
                            _domD2.points = 0; // Zera completamente (sem carry-over)
                            _domD2.lockedSpellId = spell.id; // Trava: precisa usar OUTRO feitiço para voltar a acumular
                            _domD2.critBonus = 20;
                            _domD2.nextHitBonus = true;
                            if (typeof addFloatingText === 'function' && _domCEnt2) {
                                addFloatingText(_domCEnt2.x, _domCEnt2.y, '🎯 Mira Predadora! +20% Crit +30% Dano!', '#ffdd44', 'status');
                            }
                            if (typeof addChatMessage === 'function') {
                                var _domName = _domCEnt2 ? (_domCEnt2.name || 'Zefir') : 'Zefir';
                                addChatMessage('🎯 <span style="color:#ffdd44">' + _domName + '</span>: DOM Mira Predadora ativada! +20% crítico por 1 turno + 30% dano no próximo golpe.', '#ffdd44', 'combat');
                            }
                        }
                    }
                }
            }
        }
    }

    if (typeof _diagLog === 'function') _diagLog('DANO', spell.name + ' -> ' + (target.name||target.type||'?') + ': -' + (finalDmg + armorAbsorbed) + (armorAbsorbed > 0 ? '(esc:' + armorAbsorbed + ')' : '') + 'hp' + (isCrit ? ' CRIT' : '') + (isParada ? ' PARADA' : '') + (_isIndirect ? ' INDIRETO' : '') + ' (restante:' + getEntityHp(target) + ')');
    return finalDmg + armorAbsorbed;
}

// Cura uma entidade (usa spell.heal, fallback para spell.damage)
function healTarget(target, spell) {
    const healData = spell.heal || spell.damage;
    if (!healData || (healData.min === 0 && healData.max === 0)) return 0;
    const { total } = calculateTotalAttributes();
    let healElem = healData.element || spell.element || 'none';
    if (healElem === 'chromatic') healElem = resolveChromaticElement(total);
    const scalingStat = getElementStat(healElem);
    const statValue = total[scalingStat] || 10;
    let baseHeal = healData.min + Math.random() * (healData.max - healData.min);
    let rawHeal = baseHeal * (1 + statValue / 100);

    // Aplica bônus de pontos de Cura (mesmo impacto que equipamentos)
    // playerAllocatedDamage.support aumenta a cura realizada
    if (typeof playerAllocatedDamage !== 'undefined' && playerAllocatedDamage.support > 0) {
        // 1 ponto de support = 1% de cura extra (mesmo impacto que equipamentos)
        rawHeal *= (1 + playerAllocatedDamage.support / 100);
    }

    // Bônus de cura de toggle spell ativo (ex: Aura Sagrada +25%)
    if (typeof getActiveToggleEffect === 'function') {
        var _healToggle = getActiveToggleEffect();
        if (_healToggle && _healToggle.healBonus) {
            rawHeal *= (1 + _healToggle.healBonus / 100);
        }
    }

    // Modifiers de cura recebida no ALVO (efeitos ativos)
    if (typeof getEffectModifier === 'function') {
        var _healTargetId;
        if (simCombatState.active) {
            var _hp = simCombatState.participants.find(function(p) { return p.entity === target; });
            _healTargetId = _hp ? _hp.id : null;
        } else {
            _healTargetId = (target === playerEntity) ? 'player' : 'enemy';
        }
        if (_healTargetId) {
            var healBonus = getEffectModifier(_healTargetId, 'heal_received', 'percent');
            if (healBonus > 0) rawHeal *= (1 + healBonus / 100);
            var healReduce = getEffectModifier(_healTargetId, 'heal_received', 'percent_reduce');
            if (healReduce > 0) rawHeal *= Math.max(0, 1 - healReduce / 100);
        }
    }

    // Bônus de cura de aura (passiveZone) — alvo dentro de aura com bonusHealing
    var _auraHeal = getAuraBonusForEntity(target, 'bonusHealing');
    if (_auraHeal.flat > 0 || _auraHeal.percent > 0) {
        rawHeal += _auraHeal.flat;
        if (_auraHeal.percent > 0) rawHeal *= (1 + _auraHeal.percent / 100);
    }

    // Berserk (bonus maximo quando caster a 50% HP, SO ATIVA SE HP <= 50%)
    if (spell.berserk && spell.berserk > 0) {
        var _healIsMonsterTurn = !simCombatState.active && combatState.turnOrder && combatState.turnOrder.length > 0 &&
                                  combatState.turnOrder[combatState.currentTurnIndex] &&
                                  combatState.turnOrder[combatState.currentTurnIndex].type === 'monster';
        var _healCasterEntity = simCombatState.active
            ? simCombatState.participants[simCombatState.currentIndex].entity
            : (_healIsMonsterTurn && combatState.turnOrder[combatState.currentTurnIndex]
                ? combatState.turnOrder[combatState.currentTurnIndex].entity : playerEntity);
        var _healCasterHpPct = (getEntityHp(_healCasterEntity) / getEntityMaxHp(_healCasterEntity)) * 100;

        // So ativa se HP <= 50%
        if (_healCasterHpPct <= 50) {
            var distDe50 = Math.abs(_healCasterHpPct - 50);
            var berserkBonus = 100 - (distDe50 * 2);
            berserkBonus = Math.max(0, berserkBonus);

            rawHeal *= (1 + berserkBonus / 100);
        }
    }

    // HP Scaling por Threshold para cura (socorro)
    if (spell.healScaling && spell.healScaling.type && spell.healScaling.bonus) {
        var hsType = spell.healScaling.type;
        var hsBonus = spell.healScaling.bonus;
        var hsThreshold = spell.healScaling.threshold || 0;
        var hsApplies = false;

        if (hsType === 'socorro') {
            // Socorro: bonus fixo de cura se alvo HP <= threshold%
            var targetHpPct = (getEntityHp(target) / getEntityMaxHp(target)) * 100;
            hsApplies = targetHpPct <= hsThreshold;
        }

        if (hsApplies && hsBonus > 0) {
            rawHeal *= (1 + hsBonus / 100);
        }
    }

    // Morte Eminente (bonus cura escalando com HP baixo do alvo)
    if (spell.morteEminente && spell.morteEminente > 0) {
        var _healTgtHpPct = getEntityMaxHp(target) > 0 ? getEntityHp(target) / getEntityMaxHp(target) : 1;
        var morteBonus = spell.morteEminente * (1 - _healTgtHpPct);
        if (morteBonus > 0) rawHeal *= (1 + morteBonus / 100);
    }
    // Intacto (+X% quando alvo a 100% HP)
    if (spell.intacto && spell.intacto > 0 && getEntityHp(target) >= getEntityMaxHp(target)) {
        rawHeal *= (1 + spell.intacto / 100);
    }

    // Golpe Crítico: +35% base, +dano_critico como coringa (peso /200)
    const critChance = total.critico || 0;
    const isCrit = Math.random() * 100 < critChance;
    if (isCrit) {
        var _healCritMult = 1.35;
        if (total.dano_critico > 0) _healCritMult += total.dano_critico / 200;
        rawHeal *= _healCritMult;
    }

    const finalHeal = Math.max(0, Math.round(rawHeal));
    const maxHp = getEntityMaxHp(target);
    const currentHp = getEntityHp(target);
    const healed = Math.min(finalHeal, maxHp - currentHp);
    setEntityHp(target, Math.min(maxHp, currentHp + healed));

    let healText = `+${healed}`;
    let healColor = '#4a9eff';
    var healType = 'heal';
    if (isCrit) {
        healText += '!';
        healColor = '#ffd700';
        healType = 'crit';
    }
    if (typeof addFloatingText === 'function')
        addFloatingText(target.x, target.y, healText, healColor, healType);
    if (typeof _diagLog === 'function') _diagLog('CURA', spell.name + ' -> ' + (target.name||target.type||'?') + ': +' + healed + 'hp' + (isCrit ? ' CRIT' : '') + ' (agora:' + getEntityHp(target) + ')');
    return healed;
}

// Aplica life steal: cura o caster com 50% do dano
function applyLifeSteal(totalDmg) {
    if (totalDmg <= 0) return;
    const steal = Math.round(totalDmg * 0.5);
    let casterEntity;
    if (simCombatState.active) {
        const currentP = simCombatState.participants[simCombatState.currentIndex];
        casterEntity = currentP.entity;
        const stats = simCombatState.entityStats[currentP.id];
        const healed = Math.min(steal, stats.maxHp - stats.hp);
        stats.hp = Math.min(stats.maxHp, stats.hp + healed);
        if (typeof addFloatingText === 'function')
            addFloatingText(casterEntity.x, casterEntity.y, `+${healed}`, '#4a9eff', 'heal');
    } else {
        casterEntity = playerEntity;
        const maxHp = playerStats.maxHp || playerStats.hp;
        const healed = Math.min(steal, maxHp - playerStats.hp);
        playerStats.hp = Math.min(maxHp, playerStats.hp + healed);
        updateHealthBar();
        if (typeof addFloatingText === 'function')
            addFloatingText(casterEntity.x, casterEntity.y, `+${healed}`, '#4a9eff', 'heal');
    }
}

// Aplica efeitos de zona (dano/cura conforme toggles de zoneEffects)
// casterX, casterY: posição do lançador (para recalcular AoE em push/pull)
function applySpellEffects(spell, targets, originX, originY, casterX, casterY) {
    const ze = spell.zoneEffects || { dmgCaster: false, dmgAlly: false, dmgEnemy: true, healCaster: false, healAlly: false, healEnemy: false, lifeSteal: false };
    let totalDmg = 0;
    let totalDmgOthers = 0; // dano em alvos que NAO sao o caster (para life steal)
    let totalHeal = 0;
    let anyKilled = false;
    let perTarget = []; // rastreia dano/cura por alvo individual

    // Detecta quem está atacando (caster)
    let isMonsterTurn = false;
    if (!simCombatState.active) {
        isMonsterTurn = combatState.turnOrder && combatState.turnOrder.length > 0 &&
                        combatState.turnOrder[combatState.currentTurnIndex] &&
                        combatState.turnOrder[combatState.currentTurnIndex].type === 'monster';
    }

    // Alvo unico: dano e cura se aplicam diretamente ao alvo selecionado
    const isSingleTarget = !spell.aoeType || spell.aoeType === 'single';

    targets.forEach((target) => {
        let shouldDmg = false, shouldHeal = false;

        const hasDmg = (spell.damage && (spell.damage.min > 0 || spell.damage.max > 0)) || (spell.damages && spell.damages.length > 0);
        const hasHeal = (spell.heal && (spell.heal.min > 0 || spell.heal.max > 0)) || (spell.heals && spell.heals.length > 0);

        if (isSingleTarget) {
            // Alvo unico: aplica dano e cura diretamente no alvo, sem zoneEffects
            shouldDmg = hasDmg;
            shouldHeal = hasHeal;
            // damageEnemyOnly: não causa dano em aliados (ex: Marca Etérea)
            if (spell.damageEnemyOnly && shouldDmg) {
                if (simCombatState.active) {
                    var _curP = simCombatState.participants[simCombatState.currentIndex];
                    var _tgtP = simCombatState.participants.find(function(p) { return p.entity === target; });
                    if (_tgtP && (_tgtP.entity === _curP.entity || _tgtP.type === _curP.type)) {
                        shouldDmg = false;
                    }
                } else if (!isMonsterTurn && (target === playerEntity)) {
                    shouldDmg = false;
                }
            }
        } else if (simCombatState.active) {
            const currentP = simCombatState.participants[simCombatState.currentIndex];
            const targetP = simCombatState.participants.find(p => p.entity === target);
            if (targetP) {
                if (targetP.entity === currentP.entity) {
                    shouldDmg = ze.dmgCaster && hasDmg;
                    shouldHeal = ze.dmgCaster && hasHeal;
                } else if (targetP.type === currentP.type) {
                    shouldDmg = ze.dmgAlly;
                    shouldHeal = ze.healAlly;
                } else {
                    shouldDmg = ze.dmgEnemy;
                    shouldHeal = ze.healEnemy;
                }
            }
        } else {
            const isPlayer = (target === playerEntity);
            // Multi-monstro: verifica se target é qualquer monstro do combate
            const allCombatEnemies = combatState.enemies && combatState.enemies.length > 0
                ? combatState.enemies : (combatState.targetEnemy ? [combatState.targetEnemy] : []);
            const isEnemy = allCombatEnemies.indexOf(target) !== -1;
            // Verifica se o target é o próprio caster (monstro atacando)
            const casterEntity = isMonsterTurn && combatState.turnOrder[combatState.currentTurnIndex]
                ? combatState.turnOrder[combatState.currentTurnIndex].entity : null;
            const isSelfCast = (target === casterEntity) || (!isMonsterTurn && isPlayer);

            if (isSelfCast) {
                shouldDmg = ze.dmgCaster && hasDmg;
                shouldHeal = ze.dmgCaster && hasHeal;
            } else if (isPlayer) {
                if (isMonsterTurn) {
                    shouldDmg = ze.dmgEnemy && hasDmg;
                    shouldHeal = ze.healEnemy && hasHeal;
                } else {
                    shouldDmg = ze.dmgAlly && hasDmg;
                    shouldHeal = ze.healAlly && hasHeal;
                }
            } else if (isEnemy) {
                if (isMonsterTurn) {
                    // Monstro atacando outro monstro = ally
                    if (target === casterEntity) {
                        shouldDmg = ze.dmgCaster && hasDmg;
                        shouldHeal = ze.dmgCaster && hasHeal;
                    } else {
                        shouldDmg = ze.dmgAlly && hasDmg;
                        shouldHeal = ze.healAlly && hasHeal;
                    }
                } else {
                    shouldDmg = ze.dmgEnemy && hasDmg;
                    shouldHeal = ze.healEnemy && hasHeal;
                }
            }
        }

        // Detecta se o alvo e o proprio caster (nao conta para life steal)
        const isCaster = simCombatState.active
            ? (target === simCombatState.participants[simCombatState.currentIndex].entity)
            : (isMonsterTurn
                ? (combatState.turnOrder[combatState.currentTurnIndex] && target === combatState.turnOrder[combatState.currentTurnIndex].entity)
                : (target === playerEntity));

        if (shouldDmg) {
            _lastDealCrit = false; // Reset crit flag antes de cada alvo
            let dmgThisTarget = 0;
            // Captura escudo ANTES do hit para doubleHitIfArmored
            var _armorBeforeHit = (spell.doubleHitIfArmored) ? getEntityArmor(target) : 0;
            if (spell.damages && spell.damages.length > 0) {
                spell.damages.forEach(dmgEntry => {
                    const tmpSpell = { ...spell, damage: { min: dmgEntry.min, max: dmgEntry.max }, element: dmgEntry.element };
                    dmgThisTarget += dealDamageToTarget(target, tmpSpell, ze.lifeSteal);
                });
            } else {
                dmgThisTarget = dealDamageToTarget(target, spell, ze.lifeSteal);
            }
            // === HIT DUPLO contra alvos com escudo (doubleHitIfArmored) ===
            if (spell.doubleHitIfArmored && _armorBeforeHit > 0 && getEntityHp(target) > 0) {
                var _secondHit = dealDamageToTarget(target, spell, ze.lifeSteal);
                dmgThisTarget += _secondHit;
                if (typeof addFloatingText === 'function') {
                    addFloatingText(target.x, target.y, 'Hit Duplo!', '#ffaa00', 'status');
                }
            }
            totalDmg += dmgThisTarget;
            if (!isCaster) totalDmgOthers += dmgThisTarget;

            // Rastreia dano per-target
            if (dmgThisTarget > 0) {
                perTarget.push({ entity: target, name: target.name || 'Alvo', dmg: dmgThisTarget, heal: 0, isCrit: _lastDealCrit });
            }

            if (getEntityHp(target) <= 0 && !isCaster) {
                anyKilled = true;
                if (typeof addChatMessage === 'function') {
                    addChatMessage('<span style="color:#ff8a8a">' + (target.name || 'Inimigo') + '</span> foi derrotado! 💀', '#f44', 'combat');
                }
                // Verifica missao de combate (distancia do kill)
                if (combatState.combatMission && !combatState.combatMission.failed && !simCombatState.active && !isMonsterTurn) {
                    var casterEnt = playerEntity;
                    var killDist = Math.abs(Math.floor(casterEnt.x) - Math.floor(target.x))
                                 + Math.abs(Math.floor(casterEnt.y) - Math.floor(target.y));
                    var mission = combatState.combatMission;
                    if ((mission.type === 'perto' && killDist > 2) || (mission.type === 'longe' && killDist < 3)) {
                        mission.failed = true;
                        if (typeof updateMissionIndicator === 'function') updateMissionIndicator();
                    }
                }
            }
        }
        if (shouldHeal) {
            let healThisTarget = 0;
            if (spell.heals && spell.heals.length > 0) {
                spell.heals.forEach(healEntry => {
                    const tmpSpell = { ...spell, heal: { min: healEntry.min, max: healEntry.max, element: healEntry.element || spell.element } };
                    healThisTarget += healTarget(target, tmpSpell);
                });
            } else {
                healThisTarget = healTarget(target, spell);
            }
            totalHeal += healThisTarget;
            // Rastreia cura per-target
            if (healThisTarget > 0) {
                var _ptEntry = perTarget.find(p => p.entity === target);
                if (_ptEntry) {
                    _ptEntry.heal = healThisTarget;
                } else {
                    perTarget.push({ entity: target, name: target.name || 'Alvo', dmg: 0, heal: healThisTarget });
                }
            }
        }
    });

    // === RICOCHETE: saltos entre alvos após o hit principal ===
    if (spell.ricochete && spell.ricochete.bounces > 0 && totalDmg > 0 && typeof processRicochete === 'function') {
        var _ricCaster = simCombatState.active
            ? simCombatState.participants[simCombatState.currentIndex].entity
            : (isMonsterTurn && combatState.turnOrder[combatState.currentTurnIndex]
                ? combatState.turnOrder[combatState.currentTurnIndex].entity : playerEntity);
        // Usar o primeiro alvo que recebeu dano como ponto de partida
        var _ricInitialTarget = targets.find(function(t) { return t !== _ricCaster && getEntityHp(t) > 0; }) || targets[0];
        if (_ricInitialTarget) {
            var _ricResult = processRicochete(spell, _ricInitialTarget, _ricCaster, totalDmg);
            if (typeof _ricResult === 'object' && _ricResult.hits) {
                totalDmg += _ricResult.totalDmg;
                totalDmgOthers += _ricResult.totalDmg;
                _ricResult.hits.forEach(function(h) { perTarget.push(h); });
            } else {
                var _ricDmg = (typeof _ricResult === 'number') ? _ricResult : 0;
                totalDmg += _ricDmg;
                totalDmgOthers += _ricDmg;
            }
        }
    }

    // Life steal: so conta dano causado em outros (nao em si mesmo)
    if (ze.lifeSteal && totalDmgOthers > 0) {
        applyLifeSteal(totalDmgOthers);
    }

    // Push/pull (alvo unico e zona)
    let pushed = false;
    if (spell.pushPull) {
        const casterEntity = simCombatState.active
            ? simCombatState.participants[simCombatState.currentIndex].entity
            : playerEntity;
        let pushOriginX, pushOriginY;
        if (spell.aoeType === 'zone' && spell.pushPull.origin === 'zone_center') {
            pushOriginX = originX;
            pushOriginY = originY;
        } else {
            pushOriginX = Math.floor(casterEntity.x);
            pushOriginY = Math.floor(casterEntity.y);
        }

        // Para feitiços de ZONA, push/pull afeta TODAS as entidades na AoE
        // (não apenas targets filtrados por aliado/inimigo)
        var _pushList = targets;
        if (spell.aoeType === 'zone' && typeof getAoECells === 'function') {
            var _ppCasterX = casterX !== undefined ? casterX : Math.floor(casterEntity.x);
            var _ppCasterY = casterY !== undefined ? casterY : Math.floor(casterEntity.y);
            var _ppAoeCells = getAoECells(spell, originX, originY, _ppCasterX, _ppCasterY);
            var _ppCellSet = {};
            _ppAoeCells.forEach(function(c) { _ppCellSet[c.x + ',' + c.y] = true; });
            _pushList = [];
            if (simCombatState.active) {
                simCombatState.participants.forEach(function(p) {
                    if (simCombatState.entityStats[p.id].hp <= 0) return;
                    var key = Math.floor(p.entity.x) + ',' + Math.floor(p.entity.y);
                    if (_ppCellSet[key] && _pushList.indexOf(p.entity) === -1) {
                        _pushList.push(p.entity);
                    }
                });
            } else {
                // Combate regular: verifica player e inimigos
                if (typeof playerEntity !== 'undefined' && playerEntity && getEntityHp(playerEntity) > 0) {
                    var _ppPKey = Math.floor(playerEntity.x) + ',' + Math.floor(playerEntity.y);
                    if (_ppCellSet[_ppPKey]) _pushList.push(playerEntity);
                }
                var _ppEnemies = (typeof combatState !== 'undefined' && combatState.enemies) ? combatState.enemies : [];
                _ppEnemies.forEach(function(e) {
                    if (!e || getEntityHp(e) <= 0) return;
                    var key = Math.floor(e.x) + ',' + Math.floor(e.y);
                    if (_ppCellSet[key] && _pushList.indexOf(e) === -1) _pushList.push(e);
                });
                // Invocações
                if (combatState.activeSummons) {
                    combatState.activeSummons.forEach(function(s) {
                        if (!s.entity || getEntityHp(s.entity) <= 0) return;
                        var key = Math.floor(s.entity.x) + ',' + Math.floor(s.entity.y);
                        if (_ppCellSet[key] && _pushList.indexOf(s.entity) === -1) _pushList.push(s.entity);
                    });
                }
            }
        }

        // ORDENAR alvos por distância (do MAIS LONGE para MAIS PERTO)
        // Isso evita colisão em cadeia quando empurra múltiplos alvos em linha
        var targetsWithDist = _pushList
            .filter(t => t !== casterEntity)
            .map(t => {
                var tx = Math.floor(t.x);
                var ty = Math.floor(t.y);
                var dist = Math.abs(tx - pushOriginX) + Math.abs(ty - pushOriginY);
                return { target: t, dist: dist };
            });

        // PUSH: ordenar do mais LONGE para mais PERTO (empurra os de trás primeiro)
        // PULL: ordenar do mais PERTO para mais LONGE (puxa os da frente primeiro)
        if (spell.pushPull.type === 'push') {
            targetsWithDist.sort((a, b) => b.dist - a.dist); // Decrescente
        } else {
            targetsWithDist.sort((a, b) => a.dist - b.dist); // Crescente
        }

        targetsWithDist.forEach(item => {
            var _result = applyPushPull(item.target, spell.pushPull, pushOriginX, pushOriginY);
            if (_result) pushed = true;
        });
    }

    // === CASTER APPROACH (aproximar conjurador do alvo) ===
    if (spell.casterApproach && spell.casterApproach.distance > 0) {
        var _appCaster = simCombatState.active
            ? simCombatState.participants[simCombatState.currentIndex].entity
            : playerEntity;
        // Aproximar do primeiro alvo vivo
        var _appTarget = targets.find(function(t) { return t !== _appCaster && getEntityHp(t) > 0; });
        if (_appCaster && _appTarget) {
            var _acx = Math.floor(_appCaster.x);
            var _acy = Math.floor(_appCaster.y);
            var _atx = Math.floor(_appTarget.x);
            var _aty = Math.floor(_appTarget.y);
            var _adx = _atx - _acx;
            var _ady = _aty - _acy;
            if (_adx !== 0 || _ady !== 0) {
                var _adirX = _adx === 0 ? 0 : (_adx > 0 ? 1 : -1);
                var _adirY = _ady === 0 ? 0 : (_ady > 0 ? 1 : -1);
                var _aGridSize = combatState.active ? COMBAT_GRID_SIZE : GRID_SIZE;
                var _afX = _acx;
                var _afY = _acy;
                for (var _ai = 0; _ai < spell.casterApproach.distance; _ai++) {
                    var _anX = _afX + _adirX;
                    var _anY = _afY + _adirY;
                    // Parar antes do alvo (não sobrepor)
                    if (_anX === _atx && _anY === _aty) break;
                    // Parar em bordas
                    if (_anX < 0 || _anX >= _aGridSize || _anY < 0 || _anY >= _aGridSize) break;
                    // Parar em obstáculos
                    if (typeof isObstacle === 'function' && isObstacle(_anX, _anY)) break;
                    // Parar se há outra entidade na célula
                    var _aBlocked = false;
                    if (simCombatState.active) {
                        _aBlocked = simCombatState.participants.some(function(p) {
                            if (p.entity === _appCaster) return false;
                            // Morto com desencarne bloqueia approach
                            if (simCombatState.entityStats[p.id].hp <= 0 && !isDesencarnePending(p.entity)) return false;
                            return Math.floor(p.entity.x) === _anX && Math.floor(p.entity.y) === _anY;
                        });
                    } else {
                        // Em combate não-sim, verificar inimigos (incluindo mortos com desencarne)
                        if (combatState.enemies) {
                            combatState.enemies.forEach(function(e) {
                                if (e === _appCaster) return;
                                if (e.hp <= 0 && !isDesencarnePending(e)) return;
                                if (Math.floor(e.x) === _anX && Math.floor(e.y) === _anY)
                                    _aBlocked = true;
                            });
                        }
                    }
                    if (_aBlocked) break;
                    _afX = _anX;
                    _afY = _anY;
                }
                if (_afX !== _acx || _afY !== _acy) {
                    _appCaster.x = _afX;
                    _appCaster.y = _afY;
                    _appCaster.targetX = _afX;
                    _appCaster.targetY = _afY;
                    _appCaster.path = [];
                }
            }
        }
    }

    // === CONCEDER ESCUDO (armorGrant) ===
    // Flat elemental (min/max): escala com stat do elemento (fire→INT, earth→STR, etc.)
    // Percentual (percentHp): NÃO escala com stat, apenas usa % do HP máximo
    // Ambos recebem armadura_concedida% e armor_granted/armor_received de efeitos
    if (spell.armorGrant && (spell.armorGrant.min > 0 || spell.armorGrant.max > 0 || spell.armorGrant.percentHp > 0)) {
        var _agCasterId = simCombatState.active
            ? simCombatState.participants[simCombatState.currentIndex].id
            : (isMonsterTurn ? 'enemy' : 'player');
        var _agTotal = null;
        if (!isMonsterTurn && typeof calculateTotalAttributes === 'function') {
            _agTotal = calculateTotalAttributes().total;
        }
        // Scaling elemental SÓ para armadura flat com elemento real (não 'none')
        var _agElem = spell.element || 'none';
        var _agIsFlat = (spell.armorGrant.min > 0 || spell.armorGrant.max > 0) && !spell.armorGrant.percentHp;
        var _agStatValue = 0;
        if (_agIsFlat && _agElem !== 'none' && _agTotal) {
            var _agScalingStat = typeof getElementStat === 'function' ? getElementStat(_agElem) : 'strength';
            _agStatValue = _agTotal[_agScalingStat] || 0;
        }
        targets.forEach(function(target) {
            if (getEntityHp(target) <= 0) return;
            var baseArmor;
            if (spell.armorGrant.percentHp > 0) {
                // Percentual: usa % do HP máximo do ALVO — não escala com stat
                baseArmor = getEntityMaxHp(target) * spell.armorGrant.percentHp / 100;
            } else {
                // Flat elemental: escala com stat do elemento
                baseArmor = spell.armorGrant.min + Math.random() * (spell.armorGrant.max - spell.armorGrant.min);
            }
            var armorAmount = _agStatValue > 0 ? baseArmor * (1 + _agStatValue / 100) : baseArmor;
            // Armadura Concedida% do caster (atributo de equipamentos) — aplica sempre
            if (_agTotal && _agTotal.armadura_concedida > 0) {
                armorAmount *= (1 + _agTotal.armadura_concedida / 100);
            }
            // Modifier: armor_granted do caster (de efeitos ativos)
            if (typeof getEffectModifier === 'function') {
                var grantBonus = getEffectModifier(_agCasterId, 'armor_granted', 'percent');
                if (grantBonus > 0) armorAmount *= (1 + grantBonus / 100);
            }
            // Modifier: armor_received do alvo (de efeitos ativos)
            if (typeof getEffectModifier === 'function') {
                var _tgtId;
                if (simCombatState.active) {
                    var _tp = simCombatState.participants.find(function(p) { return p.entity === target; });
                    _tgtId = _tp ? _tp.id : null;
                } else {
                    _tgtId = (target === playerEntity) ? 'player' : 'enemy';
                }
                if (_tgtId) {
                    var rcvBonus = getEffectModifier(_tgtId, 'armor_received', 'percent');
                    if (rcvBonus > 0) armorAmount *= (1 + rcvBonus / 100);
                }
            }
            var rounded = Math.round(armorAmount);
            setEntityArmor(target, getEntityArmor(target) + rounded);
            if (typeof addFloatingText === 'function')
                addFloatingText(target.x, target.y, '+' + rounded + ' Escudo', '#6688ff', 'resource');
        });
    }

    // === ROUBAR ESCUDO (armorSteal) ===
    // Suporta ambos: armorSteal: 3 (número) OU armorSteal: { flat: 3 } (objeto)
    var _armorStealFlat = 0;
    if (spell.armorSteal) {
        _armorStealFlat = (typeof spell.armorSteal === 'number') ? spell.armorSteal : (spell.armorSteal.flat || 0);
    }
    if (_armorStealFlat > 0) {
        var _asCasterEntity = simCombatState.active
            ? simCombatState.participants[simCombatState.currentIndex].entity
            : (isMonsterTurn && combatState.turnOrder[combatState.currentTurnIndex]
                ? combatState.turnOrder[combatState.currentTurnIndex].entity : playerEntity);
        targets.forEach(function(target) {
            if (target === _asCasterEntity) return;
            if (getEntityHp(target) <= 0) return;
            var targetArmor = getEntityArmor(target);
            var stolen = Math.min(_armorStealFlat, targetArmor);
            if (stolen > 0) {
                setEntityArmor(target, targetArmor - stolen);
                setEntityArmor(_asCasterEntity, getEntityArmor(_asCasterEntity) + stolen);
                if (typeof addFloatingText === 'function') {
                    addFloatingText(target.x, target.y, '-' + stolen + ' Escudo', '#ff6688', 'resource');
                    addFloatingText(_asCasterEntity.x, _asCasterEntity.y, '+' + stolen + ' Escudo', '#6688ff', 'resource');
                }
            }
        });
    }

    // === CONCEDER PE (peGrant) ===
    var _peGrantFlat = spell.peGrant || 0;
    if (_peGrantFlat > 0) {
        targets.forEach(function(target) {
            if (getEntityHp(target) <= 0) return;
            var targetPE = getEntityPE(target);
            var targetMaxPE = getEntityMaxPE(target);
            if (targetMaxPE <= 0) return; // Entidade sem PE (ex: monstros comuns)
            var granted = Math.min(_peGrantFlat, targetMaxPE - targetPE);
            if (granted > 0) {
                setEntityPE(target, targetPE + granted);
                if (typeof addFloatingText === 'function')
                    addFloatingText(target.x, target.y, '+' + granted + ' PE', '#ffd700', 'resource');
            }
        });
    }

    // === ROUBAR PA (paSteal) — contestado por Vontade ===
    var _paStealFlat = spell.paSteal || 0;
    if (_paStealFlat > 0) {
        var _psCasterEntity = simCombatState.active
            ? simCombatState.participants[simCombatState.currentIndex].entity
            : (isMonsterTurn && combatState.turnOrder[combatState.currentTurnIndex]
                ? combatState.turnOrder[combatState.currentTurnIndex].entity : playerEntity);
        var _psCasterId = getParticipantIdForEntity(_psCasterEntity);
        targets.forEach(function(target) {
            if (target === _psCasterEntity) return;
            if (getEntityHp(target) <= 0) return;
            var targetId = getParticipantIdForEntity(target);
            // Vontade contest (skip se stealFixed)
            var stealSuccess = true;
            if (!spell.stealFixed && _psCasterId && targetId) {
                var atkVon = getEntityVontade(_psCasterId);
                var defVon = getEntityVontade(targetId);
                stealSuccess = rollVontadeContest(atkVon, defVon);
            }
            if (stealSuccess) {
                var targetPA = getEntityPA(target);
                var stolen = Math.min(_paStealFlat, targetPA);
                if (stolen > 0) {
                    setEntityPA(target, targetPA - stolen);
                    setEntityPA(_psCasterEntity, Math.min(getEntityPA(_psCasterEntity) + stolen, getEntityMaxPA(_psCasterEntity)));
                    if (typeof addFloatingText === 'function') {
                        addFloatingText(target.x, target.y, '-' + stolen + ' PA', '#ff6644', 'resource');
                        addFloatingText(_psCasterEntity.x, _psCasterEntity.y, '+' + stolen + ' PA', '#ffd700', 'resource');
                    }
                    // Vontade dinamica: vitima ganha Vontade contra este atacante
                    if (targetId && _psCasterId) addVontadeGained(targetId, _psCasterId, stolen);
                }
            } else {
                if (typeof addFloatingText === 'function') {
                    addFloatingText(target.x, target.y, 'Resistiu!', '#aaaaff', 'resource');
                }
            }
        });
    }

    // === ROUBAR PM (pmSteal) — contestado por Vontade ===
    var _pmStealFlat = spell.pmSteal || 0;
    if (_pmStealFlat > 0) {
        var _pmsCasterEntity = simCombatState.active
            ? simCombatState.participants[simCombatState.currentIndex].entity
            : (isMonsterTurn && combatState.turnOrder[combatState.currentTurnIndex]
                ? combatState.turnOrder[combatState.currentTurnIndex].entity : playerEntity);
        var _pmsCasterId = getParticipantIdForEntity(_pmsCasterEntity);
        targets.forEach(function(target) {
            if (target === _pmsCasterEntity) return;
            if (getEntityHp(target) <= 0) return;
            var targetId = getParticipantIdForEntity(target);
            // Vontade contest (skip se stealFixed)
            var stealSuccess = true;
            if (!spell.stealFixed && _pmsCasterId && targetId) {
                var atkVon = getEntityVontade(_pmsCasterId);
                var defVon = getEntityVontade(targetId);
                stealSuccess = rollVontadeContest(atkVon, defVon);
            }
            if (stealSuccess) {
                var targetPM = getEntityPM(target);
                var stolen = Math.min(_pmStealFlat, targetPM);
                if (stolen > 0) {
                    setEntityPM(target, targetPM - stolen);
                    setEntityPM(_pmsCasterEntity, Math.min(getEntityPM(_pmsCasterEntity) + stolen, getEntityMaxPM(_pmsCasterEntity)));
                    if (typeof addFloatingText === 'function') {
                        addFloatingText(target.x, target.y, '-' + stolen + ' PM', '#ff4488', 'resource');
                        addFloatingText(_pmsCasterEntity.x, _pmsCasterEntity.y, '+' + stolen + ' PM', '#88ddff', 'resource');
                    }
                    // Vontade dinamica: vitima ganha Vontade contra este atacante
                    if (targetId && _pmsCasterId) addVontadeGained(targetId, _pmsCasterId, stolen);
                }
            } else {
                if (typeof addFloatingText === 'function') {
                    addFloatingText(target.x, target.y, 'Resistiu!', '#aaaaff', 'resource');
                }
            }
        });
    }

    // === APLICAR EFEITOS DO FEITICO ===
    if (spell.effects && spell.effects.length > 0 && typeof applyEffect === 'function') {
        var _efCasterId;
        if (simCombatState.active) {
            _efCasterId = simCombatState.participants[simCombatState.currentIndex].id;
        } else {
            _efCasterId = isMonsterTurn ? 'enemy' : 'player';
        }

        spell.effects.forEach(function(eff) {
            targets.forEach(function(target) {
                var targetId;
                if (simCombatState.active) {
                    var p = simCombatState.participants.find(function(p) { return p.entity === target; });
                    targetId = p ? p.id : null;
                } else {
                    targetId = (target === playerEntity) ? 'player' : 'enemy';
                }
                if (targetId) {
                    // target: 'self' = aplica no caster, default = aplica no alvo
                    var effectTarget = (eff.target === 'self') ? _efCasterId : targetId;
                    applyEffect(eff.effectId, eff.level, _efCasterId, effectTarget);
                }
            });
        });
    }

    // === PROCESSAMENTO DE REVIVE (REVIVER ZUMBIS) ===
    if (spell.effect === 'revive' && typeof reviveZombie === 'function') {
        targets.forEach(function(target) {
            // Verifica se o alvo é um zumbi válido para reviver
            if (typeof isValidReviveTarget === 'function' && isValidReviveTarget(target)) {
                var targetId = getParticipantIdForEntity(target);
                if (targetId) {
                    // Determina quantidade de cura (porcentagem ou fixo)
                    var healAmount = spell.healAmount || 0;
                    var healPercent = spell.healPercent || 0.5; // Default 50%
                    var isPercentage = healAmount === 0;
                    var finalHealValue = isPercentage ? healPercent : healAmount;

                    // Tenta reviver o zumbi
                    var revived = reviveZombie(target, targetId, finalHealValue, isPercentage);
                    if (!revived) {
                        if (typeof addFloatingText === 'function')
                            addFloatingText(target.x, target.y, 'Não pode reviver!', '#f66', 'info');
                    }
                }
            }
        });
    }

    // === TROCA DE POSIÇÃO (swapPosition) ===
    if (spell.effect === 'swapPosition' && typeof hasAdvancedStatus === 'function') {
        var _swapCasterEntity = simCombatState.active
            ? simCombatState.participants[simCombatState.currentIndex].entity
            : (isMonsterTurn && combatState.turnOrder[combatState.currentTurnIndex]
                ? combatState.turnOrder[combatState.currentTurnIndex].entity : playerEntity);

        targets.forEach(function(target) {
            // Não trocar com si mesmo
            if (target === _swapCasterEntity) return;

            // Verificar se alvo está morto
            if (getEntityHp(target) <= 0) return;

            // Verificar Estabilizado (bloqueado se checkEstabilizado = true)
            if (spell.checkEstabilizado && hasAdvancedStatus(target, 'estabilizado')) {
                if (typeof addFloatingText === 'function')
                    addFloatingText(target.x, target.y, 'Estabilizado!', '#ffaa00', 'status');
                return;
            }

            // Trocar posições
            var tempX = _swapCasterEntity.x;
            var tempY = _swapCasterEntity.y;

            _swapCasterEntity.x = target.x;
            _swapCasterEntity.y = target.y;
            _swapCasterEntity.targetX = target.x;
            _swapCasterEntity.targetY = target.y;

            target.x = tempX;
            target.y = tempY;
            target.targetX = tempX;
            target.targetY = tempY;

            // Texto flutuante
            if (typeof addFloatingText === 'function')
                addFloatingText(_swapCasterEntity.x, _swapCasterEntity.y, 'Trocou!', '#88ddff', 'status');

            if (typeof _diagLog === 'function') {
                _diagLog('SWAP', 'Trocou posição com ' + (target.name || target.type || '?'));
            }
        });
    }

    // === TROCA DE POSIÇÃO ENTRE DOIS ALVOS (swapTwoTargets) ===
    if (spell.effect === 'swapTwoTargets') {
        var _swapCasterEntity = simCombatState.active
            ? simCombatState.participants[simCombatState.currentIndex].entity
            : (isMonsterTurn && combatState.turnOrder[combatState.currentTurnIndex]
                ? combatState.turnOrder[combatState.currentTurnIndex].entity : playerEntity);

        // Filtrar apenas INIMIGOS (aliados não contam)
        var enemyTargets = targets.filter(function(target) {
            if (getEntityHp(target) <= 0) return false;
            if (target === _swapCasterEntity) return false;

            // Verificar se é inimigo
            if (simCombatState.active) {
                var casterP = simCombatState.participants.find(p => p.entity === _swapCasterEntity);
                var targetP = simCombatState.participants.find(p => p.entity === target);
                if (!casterP || !targetP) return false;
                return targetP.type !== casterP.type; // Apenas inimigos
            } else {
                // Combate normal
                if (_swapCasterEntity === playerEntity) {
                    return target !== playerEntity; // Inimigos do player
                } else {
                    return target === playerEntity; // Player é inimigo do monstro
                }
            }
        });

        // Verificar se há exatamente 2 inimigos
        var requiredCount = spell.requireExactTargets || 2;
        if (enemyTargets.length !== requiredCount) {
            // Falhou: não há exatamente 2 inimigos
            if (typeof addFloatingText === 'function')
                addFloatingText(originX, originY, 'Requer ' + requiredCount + ' inimigos!', '#ff4444', 'info');

            if (typeof _diagLog === 'function') {
                _diagLog('SWAP-TWO', 'Falhou: requer ' + requiredCount + ' inimigos, mas há ' + enemyTargets.length);
            }
        } else {
            // Sucesso: trocar posição dos 2 inimigos
            var enemy1 = enemyTargets[0];
            var enemy2 = enemyTargets[1];

            // Verificar Estabilizado
            var e1Stabilized = typeof hasAdvancedStatus === 'function' && hasAdvancedStatus(enemy1, 'estabilizado');
            var e2Stabilized = typeof hasAdvancedStatus === 'function' && hasAdvancedStatus(enemy2, 'estabilizado');

            if (e1Stabilized || e2Stabilized) {
                // Pelo menos um está estabilizado
                var stabilizedTarget = e1Stabilized ? enemy1 : enemy2;
                if (typeof addFloatingText === 'function')
                    addFloatingText(stabilizedTarget.x, stabilizedTarget.y, 'Estabilizado!', '#ffaa00', 'status');

                if (typeof _diagLog === 'function') {
                    _diagLog('SWAP-TWO', 'Falhou: um alvo está Estabilizado');
                }
            } else {
                // Trocar posições
                var tempX = enemy1.x;
                var tempY = enemy1.y;

                enemy1.x = enemy2.x;
                enemy1.y = enemy2.y;
                enemy1.targetX = enemy2.x;
                enemy1.targetY = enemy2.y;
                enemy1.path = [];

                enemy2.x = tempX;
                enemy2.y = tempY;
                enemy2.targetX = tempX;
                enemy2.targetY = tempY;
                enemy2.path = [];

                // Textos flutuantes
                if (typeof addFloatingText === 'function') {
                    addFloatingText(enemy1.x, enemy1.y, 'Trocado!', '#88ddff', 'status');
                    addFloatingText(enemy2.x, enemy2.y, 'Trocado!', '#88ddff', 'status');
                }

                if (typeof _diagLog === 'function') {
                    _diagLog('SWAP-TWO', 'Trocou ' + (enemy1.name || enemy1.type || 'E1') + ' com ' + (enemy2.name || enemy2.type || 'E2'));
                }
            }
        }
    }

    // === APLICAR STATUS AVANÇADOS ===
    if (spell.advancedStatus && typeof applyAdvancedStatusFromSpell === 'function') {
        var _statusCasterEntity = simCombatState.active
            ? simCombatState.participants[simCombatState.currentIndex].entity
            : (isMonsterTurn && combatState.turnOrder[combatState.currentTurnIndex]
                ? combatState.turnOrder[combatState.currentTurnIndex].entity : playerEntity);

        // Filtrar alvos por statusTarget (ex: 'alliesOnly', 'enemiesOnly')
        var statusTargets = targets.filter(function(target) {
            if (getEntityHp(target) <= 0) return false;

            if (spell.statusTarget === 'alliesOnly') {
                // Apenas aliados (mesma equipe)
                if (simCombatState.active) {
                    var casterP = simCombatState.participants.find(p => p.entity === _statusCasterEntity);
                    var targetP = simCombatState.participants.find(p => p.entity === target);
                    if (!casterP || !targetP) return false;
                    return targetP.type === casterP.type && target !== _statusCasterEntity;
                } else {
                    if (_statusCasterEntity === playerEntity) {
                        // Jogador: aliados são outros jogadores (não há, então sempre false)
                        return false;
                    } else {
                        // Monstro: aliados são outros monstros
                        return target !== playerEntity && target !== _statusCasterEntity;
                    }
                }
            } else if (spell.statusTarget === 'enemiesOnly') {
                // Apenas inimigos
                if (simCombatState.active) {
                    var casterP = simCombatState.participants.find(p => p.entity === _statusCasterEntity);
                    var targetP = simCombatState.participants.find(p => p.entity === target);
                    if (!casterP || !targetP) return false;
                    return targetP.type !== casterP.type;
                } else {
                    if (_statusCasterEntity === playerEntity) {
                        return target !== playerEntity;
                    } else {
                        return target === playerEntity;
                    }
                }
            }

            // Default: todos os alvos
            return true;
        });

        applyAdvancedStatusFromSpell(spell, statusTargets, _statusCasterEntity);
    }

    // === EFEITOS DE CURTA DISTÂNCIA (closeRangeEffect) ===
    if (spell.closeRangeEffect) {
        var _crCasterEntity = simCombatState.active
            ? simCombatState.participants[simCombatState.currentIndex].entity
            : (isMonsterTurn && combatState.turnOrder[combatState.currentTurnIndex]
                ? combatState.turnOrder[combatState.currentTurnIndex].entity : playerEntity);

        var _crCasterId;
        if (simCombatState.active) {
            _crCasterId = simCombatState.participants[simCombatState.currentIndex].id;
        } else {
            _crCasterId = isMonsterTurn ? 'enemy' : 'player';
        }

        targets.forEach(function(target) {
            if (getEntityHp(target) <= 0) return;
            if (target === _crCasterEntity) return;

            // Distância Manhattan entre caster e alvo
            var _crDist = Math.abs(Math.floor(_crCasterEntity.x) - Math.floor(target.x))
                        + Math.abs(Math.floor(_crCasterEntity.y) - Math.floor(target.y));

            if (_crDist <= (spell.closeRangeEffect.maxRange || 3)) {
                // Redução de bloqueio baseada no nível do alvo
                if (spell.closeRangeEffect.blockReduction) {
                    var _crBR = spell.closeRangeEffect.blockReduction;
                    var targetLevel = target.level || (target === playerEntity ? (typeof playerLevel !== 'undefined' ? playerLevel : 1) : 1);
                    var reductionValue = (_crBR.flat || 0) + Math.round((_crBR.percentOfLevel || 0) * targetLevel / 100);

                    if (reductionValue > 0) {
                        var targetId = (typeof getParticipantIdForEntity === 'function') ? getParticipantIdForEntity(target) : null;
                        if (targetId) {
                            if (!combatState.activeEffects) combatState.activeEffects = {};
                            if (!combatState.activeEffects[targetId]) combatState.activeEffects[targetId] = [];

                            // Remove efeito anterior do mesmo caster (atualiza em vez de empilhar)
                            combatState.activeEffects[targetId] = combatState.activeEffects[targetId].filter(function(e) {
                                return !(e.effectId === 'closerange_block_reduction' && e.casterId === _crCasterId);
                            });

                            combatState.activeEffects[targetId].push({
                                effectId: 'closerange_block_reduction',
                                name: 'Bloqueio Reduzido',
                                icon: '🔰',
                                type: 'debuff',
                                level: 1,
                                value: reductionValue,
                                durationType: 'turns',
                                remainingTurns: _crBR.duration || 2,
                                casterId: _crCasterId,
                                targetId: targetId,
                                modifiers: [{ stat: 'block', operation: 'flat', value: -reductionValue }],
                                description: '-' + reductionValue + ' Bloqueio'
                            });

                            if (typeof addFloatingText === 'function') {
                                addFloatingText(target.x, target.y, '-' + reductionValue + ' Bloqueio', '#ff8844', 'status');
                            }
                            if (typeof _diagLog === 'function') {
                                _diagLog('CLOSE-RANGE', spell.name + ': -' + reductionValue + ' Bloqueio em ' + (target.name || '?') + ' (nível ' + targetLevel + ')');
                            }
                        }
                    }
                }
            }
        });
    }

    // === AUTO-DANO (selfDamage) ===
    if (spell.selfDamage && (spell.selfDamage.type === 'percent' || spell.selfDamage.type === 'flat')) {
        var _sdCasterEntity = simCombatState.active
            ? simCombatState.participants[simCombatState.currentIndex].entity
            : (isMonsterTurn && combatState.turnOrder[combatState.currentTurnIndex]
                ? combatState.turnOrder[combatState.currentTurnIndex].entity : playerEntity);

        var selfDmgAmount = 0;
        if (spell.selfDamage.type === 'percent') {
            // Porcentagem do HP maximo
            selfDmgAmount = Math.round(getEntityMaxHp(_sdCasterEntity) * spell.selfDamage.amount / 100);
        } else {
            // Valor fixo
            selfDmgAmount = spell.selfDamage.amount;
        }

        if (selfDmgAmount > 0) {
            var currentCasterHp = getEntityHp(_sdCasterEntity);
            var newCasterHp = Math.max(1, currentCasterHp - selfDmgAmount); // Nunca mata (min 1 HP)
            setEntityHp(_sdCasterEntity, newCasterHp);

            if (typeof addFloatingText === 'function')
                addFloatingText(_sdCasterEntity.x, _sdCasterEntity.y, '-' + selfDmgAmount + ' HP (auto)', '#ff6666', 'damage');

            if (typeof _diagLog === 'function') {
                _diagLog('AUTO-DANO', spell.name + ' causou ' + selfDmgAmount + ' de auto-dano');
            }
        }
    }

    // === ZONA SECUNDÁRIA (secondaryZone) ===
    // Processa zona secundária centrada no alvo (ex: cura + push/pull inimigos ao redor)
    if (spell.secondaryZone && spell.secondaryZone.enabled && targets.length > 0) {
        var _szCasterEntity = simCombatState.active
            ? simCombatState.participants[simCombatState.currentIndex].entity
            : (isMonsterTurn && combatState.turnOrder[combatState.currentTurnIndex]
                ? combatState.turnOrder[combatState.currentTurnIndex].entity : playerEntity);

        // Para feitiços de alvo único, usar o primeiro alvo
        var primaryTarget = targets[0];
        if (typeof processSecondaryZone === 'function') {
            processSecondaryZone(spell, primaryTarget, _szCasterEntity, originX, originY);
        }
    }

    return { totalDmg, totalHeal, anyKilled, pushed, perTarget };
}

// Deduz custos PA/PM/PE (1x por cast)
function deductSpellCosts(spell, isPlayerCasting = true) {
    const paCost = spell.paCost || spell.cost || 0;
    const pmCost = spell.pmCost || 0;
    const peCost = spell.peCost || 0;

    if (isPlayerCasting) {
        if (paCost > 0 && combatStats.player) combatStats.player.pa -= paCost;
        if (pmCost > 0 && combatStats.player) combatStats.player.pm -= pmCost;
        if (peCost > 0) playerStats.pe -= peCost;
    } else {
        if (combatStats.enemy) {
            if (paCost > 0) combatStats.enemy.pa -= paCost;
            if (pmCost > 0) combatStats.enemy.pm -= pmCost;
            if (peCost > 0) combatStats.enemy.pe -= peCost;
        }
    }
    updateStatsDisplay();
}

// Wrapper legado para compatibilidade
function dealDamage(target, spell) {
    const dmg = dealDamageToTarget(target, spell);
    deductSpellCosts(spell, true);
    if (getEntityHp(target) <= 0) {
        var allDead = typeof checkAllMonstersDead === 'function' ? checkAllMonstersDead() : true;
        if (allDead) setTimeout(() => { if (typeof finishCombat === 'function') finishCombat('victory'); else endCombat(); }, 1500);
    }
    return dmg;
}

// Empurrar/Puxar um alvo
function applyPushPull(target, config, originX, originY) {
    if (!config) return false;

    // === VERIFICAR IMOVÍVEL (invocações fixas) ===
    if (target.imovivel) {
        if (typeof addFloatingText === 'function')
            addFloatingText(target.x, target.y, 'Imóvel!', '#ffaa00', 'status');
        return false;
    }

    // === VERIFICAR STATUS ESTABILIZADO ===
    if (typeof hasAdvancedStatus === 'function' && hasAdvancedStatus(target, 'estabilizado')) {
        if (typeof addFloatingText === 'function')
            addFloatingText(target.x, target.y, 'Estabilizado!', '#ffaa00', 'status');
        return false;
    }

    const tx = Math.floor(target.x);
    const ty = Math.floor(target.y);
    const dxFromOrigin = tx - originX;
    const dyFromOrigin = ty - originY;

    if (dxFromOrigin === 0 && dyFromOrigin === 0) return false;

    const dirX = dxFromOrigin === 0 ? 0 : (dxFromOrigin > 0 ? 1 : -1);
    const dirY = dyFromOrigin === 0 ? 0 : (dyFromOrigin > 0 ? 1 : -1);
    const currentGridSize = combatState.active ? COMBAT_GRID_SIZE : GRID_SIZE;

    const mult = config.type === 'push' ? 1 : -1;
    const moveX = dirX * mult;
    const moveY = dirY * mult;

    let finalX = tx;
    let finalY = ty;
    for (let i = 0; i < config.distance; i++) {
        const nextX = finalX + moveX;
        const nextY = finalY + moveY;
        if (nextX < 0 || nextX >= currentGridSize || nextY < 0 || nextY >= currentGridSize) break;
        // Terreno bloqueador impede push (NÃO usar isObstacle que bloqueia em entidades vivas)
        var _pushCell = typeof getWorldCell === 'function' ? getWorldCell(nextX, nextY) : null;
        if (_pushCell && _pushCell.obstacle === 'blocker') break;
        if (simCombatState.active) {
            const blocked = simCombatState.participants.some(p => {
                if (p.entity === target) return false;
                // Morto com desencarne BLOQUEIA push
                if (simCombatState.entityStats[p.id].hp <= 0 && !isDesencarnePending(p.entity)) return false;
                return Math.floor(p.entity.x) === nextX && Math.floor(p.entity.y) === nextY;
            });
            if (blocked) break;
        } else {
            const px = Math.floor(playerEntity.x);
            const py = Math.floor(playerEntity.y);
            if (nextX === px && nextY === py) break;
            const enemy = combatState.targetEnemy;
            if (enemy && enemy !== target && Math.floor(enemy.x) === nextX && Math.floor(enemy.y) === nextY) break;
            // Mortos com desencarne também bloqueiam push
            if (combatState.enemies) {
                const deadBlocked = combatState.enemies.some(function(e) {
                    if (e === target) return false;
                    if (!isDesencarnePending(e)) return false;
                    return Math.floor(e.x) === nextX && Math.floor(e.y) === nextY;
                });
                if (deadBlocked) break;
            }
        }
        finalX = nextX;
        finalY = nextY;
    }
    const moved = (finalX !== tx || finalY !== ty);
    target.x = finalX;
    target.y = finalY;
    target.targetX = finalX;
    target.targetY = finalY;
    target.path = [];
    return moved;
}

// ========== ZONA SECUNDÁRIA (secondaryZone) ==========
// Processa zona secundária centrada no ALVO (não no caster)
// Usado por feitiços que curam/buffam o alvo + afetam área ao redor dele
function processSecondaryZone(spell, targetEntity, casterEntity, originX, originY) {
    if (!spell.secondaryZone || !spell.secondaryZone.enabled) return;

    const secZone = spell.secondaryZone;
    const centerX = secZone.centerOnTarget ? Math.floor(targetEntity.x) : originX;
    const centerY = secZone.centerOnTarget ? Math.floor(targetEntity.y) : originY;

    // Obter células da zona secundária
    const cells = secZone.cells || [];
    const affectedPositions = cells.map(cell => ({
        x: centerX + cell.dx,
        y: centerY + cell.dy
    }));

    // Coletar entidades nas posições da zona (incluindo mortos com desencarne)
    let targets = [];
    if (simCombatState.active) {
        simCombatState.participants.forEach(p => {
            if (simCombatState.entityStats[p.id].hp <= 0 && !isDesencarnePending(p.entity)) return;
            const ex = Math.floor(p.entity.x);
            const ey = Math.floor(p.entity.y);
            if (affectedPositions.some(pos => pos.x === ex && pos.y === ey)) {
                targets.push(p.entity);
            }
        });
    } else {
        // Combate normal
        const px = Math.floor(playerEntity.x);
        const py = Math.floor(playerEntity.y);
        if (affectedPositions.some(pos => pos.x === px && pos.y === py)) {
            targets.push(playerEntity);
        }
        if (combatState.enemies) {
            combatState.enemies.forEach(enemy => {
                if (enemy.hp <= 0 && !isDesencarnePending(enemy)) return;
                const ex = Math.floor(enemy.x);
                const ey = Math.floor(enemy.y);
                if (affectedPositions.some(pos => pos.x === ex && pos.y === ey)) {
                    targets.push(enemy);
                }
            });
        }
    }

    // Filtrar apenas inimigos ou apenas aliados conforme efeito
    const effects = secZone.effects || {};
    const isPlayerTurn = !simCombatState.active ||
        (simCombatState.participants[simCombatState.currentIndex].entity === playerEntity);

    if (effects.pullEnemies || effects.pushEnemies) {
        // Filtrar apenas inimigos
        targets = targets.filter(t => {
            if (isPlayerTurn) {
                // Jogador: inimigos são monstros
                return t !== playerEntity && t !== casterEntity;
            } else {
                // Monstro: inimigo é o jogador
                return t === playerEntity;
            }
        });
    }

    if (targets.length === 0) return;

    // === PUSH ENEMIES ===
    if (effects.pushEnemies && effects.pushDistance > 0) {
        const pushConfig = {
            type: 'push',
            distance: effects.pushDistance
        };

        // Ordenar do mais LONGE para mais PERTO
        const targetsWithDist = targets.map(t => {
            const tx = Math.floor(t.x);
            const ty = Math.floor(t.y);
            const dist = Math.abs(tx - centerX) + Math.abs(ty - centerY);
            return { target: t, dist: dist };
        }).sort((a, b) => b.dist - a.dist);

        targetsWithDist.forEach(item => {
            applyPushPull(item.target, pushConfig, centerX, centerY);
        });
    }

    // === PULL ENEMIES ===
    if (effects.pullEnemies && effects.pullDistance > 0) {
        const pullConfig = {
            type: 'pull',
            distance: effects.pullDistance
        };

        // Ordenar do mais PERTO para mais LONGE
        const targetsWithDist = targets.map(t => {
            const tx = Math.floor(t.x);
            const ty = Math.floor(t.y);
            const dist = Math.abs(tx - centerX) + Math.abs(ty - centerY);
            return { target: t, dist: dist };
        }).sort((a, b) => a.dist - b.dist);

        targetsWithDist.forEach(item => {
            applyPushPull(item.target, pullConfig, centerX, centerY);
        });
    }

    if (typeof _diagLog === 'function') {
        _diagLog('SECONDARY-ZONE', 'Processed secondary zone: ' + targets.length + ' targets affected');
    }
}

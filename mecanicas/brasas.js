// ========== MECÂNICA DE BRASAS ==========
// Stacks de fogo que queimam inimigos adjacentes (4 cardinais) no início do turno.
// Qualquer feitiço com grantsBrasas: true pode gerar stacks.
// Deps runtime: combatState, playerEntity, playerStats, combatStats,
//   getEntityHp, getEntityMaxHp, setEntityHp, addFloatingText, updateStatsDisplay,
//   getEntitiesAtCell (dev.html), addChatMessage (dev.html)

var BRASAS_MAX_STACKS = 10;
var BRASAS_BURN_PERCENT = 2;   // % do maxHP do inimigo por stack
var BRASAS_BLOCK_PERCENT = 1;  // +1% block por stack

// Estado: combatState.brasas = { [participantId]: { stacks: 0, usedFireThisTurn: false } }

function initBrasasState(participantId) {
    if (!combatState.brasas) combatState.brasas = {};
    if (!combatState.brasas[participantId]) {
        combatState.brasas[participantId] = { stacks: 0, usedFireThisTurn: false };
    }
}

function getBrasasStacks(participantId) {
    if (!combatState.brasas || !combatState.brasas[participantId]) return 0;
    return combatState.brasas[participantId].stacks;
}

function addBrasasStack(participantId) {
    initBrasasState(participantId);
    var state = combatState.brasas[participantId];
    if (state.stacks < BRASAS_MAX_STACKS) {
        state.stacks++;
    }
    state.usedFireThisTurn = true;
}

function markBrasasFireUsed(participantId) {
    initBrasasState(participantId);
    combatState.brasas[participantId].usedFireThisTurn = true;
}

function removeBrasasStacks(participantId, amount) {
    if (!combatState.brasas || !combatState.brasas[participantId]) return 0;
    var state = combatState.brasas[participantId];
    var removed = Math.min(state.stacks, amount);
    state.stacks -= removed;
    return removed;
}

function consumeAllBrasas(participantId) {
    if (!combatState.brasas || !combatState.brasas[participantId]) return 0;
    var state = combatState.brasas[participantId];
    var total = state.stacks;
    state.stacks = 0;
    return total;
}

// Chamado ANTES de applySpellEffects para feitiços com consumesBrasas
// Retorna um objeto com { spell: modifiedSpell, consumed: N } ou null se não aplicável
// Se consumesBrasas=true, consome stacks e escala o dano
function preprocessBrasasSpell(spell, casterId) {
    if (!spell || !spell.consumesBrasas) return null;
    var stacks = consumeAllBrasas(casterId);
    if (stacks <= 0) return { spell: spell, consumed: 0 };

    // Cria cópia com dano escalado: dano base × (1 + stacks × 0.5)
    // Ex: 10 stacks = 6× o dano base
    var scaledSpell = Object.assign({}, spell);
    if (spell.damage) {
        var mult = 1 + stacks * 0.5;
        scaledSpell.damage = {
            min: Math.round(spell.damage.min * mult),
            max: Math.round(spell.damage.max * mult)
        };
    }
    return { spell: scaledSpell, consumed: stacks };
}

// Chamado DEPOIS de applySpellEffects para feitiços com consumesBrasas
// Aplica o escudo baseado nas stacks consumidas
function postprocessBrasasSpell(casterId, consumed) {
    if (consumed <= 0) return;
    var entity = _getBrasasEntity(casterId);
    if (!entity) return;

    // Shield = 3% do HP máximo do caster por stack consumida
    var maxHp = typeof getEntityMaxHp === 'function' ? getEntityMaxHp(entity) : (entity.maxHp || entity.hp || 100);
    var shieldAmount = Math.round(maxHp * consumed * 3 / 100);

    if (shieldAmount > 0) {
        // Aplica escudo
        if (casterId === 'player' && typeof combatStats !== 'undefined' && combatStats.player) {
            combatStats.player.armor = (combatStats.player.armor || 0) + shieldAmount;
        } else if (entity.armor !== undefined) {
            entity.armor = (entity.armor || 0) + shieldAmount;
        }

        if (typeof addFloatingText === 'function') {
            addFloatingText(Math.floor(entity.x), Math.floor(entity.y),
                '+' + shieldAmount + ' 🛡️', '#cc9955', 'armor');
        }
        if (typeof addChatMessage === 'function') {
            addChatMessage('🔥→🛡️ ' + (entity.name || casterId) + ' consome ' + consumed + ' Brasas: +' + shieldAmount + ' escudo.', '#cc9955', 'combat');
        }
    }

    if (typeof updateStatsDisplay === 'function') updateStatsDisplay();
}

// Chamado após um feitiço ser conjurado com sucesso
// spell = objeto do feitiço, casterId = participantId
function onSpellCastBrasas(spell, casterId) {
    if (!spell) return;
    // Feitiço com grantsBrasas = true gera +1 stack
    if (spell.grantsBrasas) {
        addBrasasStack(casterId);
        // Feedback visual
        var entity = _getBrasasEntity(casterId);
        if (entity) {
            if (typeof addFloatingText === 'function') {
                var newStacks = getBrasasStacks(casterId);
                addFloatingText(Math.floor(entity.x), Math.floor(entity.y),
                    '🔥 Brasas Cromático Nv.' + newStacks, '#e040fb', 'buff');
            }
        }
    }
    // Qualquer feitiço de fogo marca como usedFire (mesmo sem grantsBrasas)
    if (spell.element === 'fire') {
        initBrasasState(casterId);
        combatState.brasas[casterId].usedFireThisTurn = true;
    }
}

// Chamado no INÍCIO do turno de um participante
// Queima inimigos nas 4 casas cardinais adjacentes (dano cromático), aplica bônus de bloqueio
function tickBrasasTurnStart(participantId) {
    var stacks = getBrasasStacks(participantId);
    if (stacks <= 0) return;

    var entity = _getBrasasEntity(participantId);
    if (!entity) return;
    var ex = Math.floor(entity.x);
    var ey = Math.floor(entity.y);

    // Resolve elemento cromático (maior stat do caster)
    var resolvedElement = _resolveBrasasElement(participantId);
    var elemColor = typeof getElementColor === 'function' ? getElementColor(resolvedElement) : '#ff4400';
    var elemName = BRASAS_ELEMENT_NAMES[resolvedElement] || resolvedElement;

    // Pré-calcula attrs do caster para resistência
    var casterTotalAttrs = {};
    if (participantId === 'player' && typeof calculateTotalAttributes === 'function') {
        casterTotalAttrs = calculateTotalAttributes().total;
    }

    // 4 cardinais (não diagonal)
    var cardinals = [
        { x: ex, y: ey - 1 },  // cima
        { x: ex, y: ey + 1 },  // baixo
        { x: ex - 1, y: ey },  // esquerda
        { x: ex + 1, y: ey }   // direita
    ];

    var totalBurnDmg = 0;
    var burnedTargets = [];

    cardinals.forEach(function(cell) {
        var enemies = _getBrasasEnemiesAtCell(participantId, cell.x, cell.y);
        enemies.forEach(function(enemy) {
            if (burnedTargets.indexOf(enemy) !== -1) return; // evitar duplicata
            var enemyMaxHp = typeof getEntityMaxHp === 'function' ? getEntityMaxHp(enemy) : (enemy.maxHp || enemy.hp || 1);
            var burnDmg = Math.max(1, Math.round(enemyMaxHp * stacks * BRASAS_BURN_PERCENT / 100));

            // Aplica resistência elemental do alvo para o elemento cromático resolvido
            if (typeof getTargetResistance === 'function' && typeof resistToPercent === 'function') {
                var targetResist = getTargetResistance(enemy, resolvedElement, casterTotalAttrs);
                if (targetResist !== 0) {
                    var reductionPct = resistToPercent(targetResist) / 100;
                    burnDmg = Math.max(1, Math.round(burnDmg * (1 - reductionPct)));
                }
            }

            var curHp = typeof getEntityHp === 'function' ? getEntityHp(enemy) : enemy.hp;
            var newHp = Math.max(0, curHp - burnDmg);
            if (typeof setEntityHp === 'function') setEntityHp(enemy, newHp);
            else enemy.hp = newHp;

            totalBurnDmg += burnDmg;
            burnedTargets.push(enemy);

            // Floating text no inimigo (cor do elemento resolvido)
            if (typeof addFloatingText === 'function') {
                addFloatingText(Math.floor(enemy.x), Math.floor(enemy.y),
                    '-' + burnDmg + ' 🔥', elemColor, 'damage');
            }
        });
    });

    // Chat message com "Brasas Cromático" e elemento resolvido
    if (burnedTargets.length > 0 && typeof addChatMessage === 'function') {
        var entityName = entity.name || participantId;
        addChatMessage('🔥 <span style="color:#e040fb">Brasas Cromático</span> Nv.' + stacks +
            ' (' + elemName + '): ' + entityName + ' queima ' +
            burnedTargets.length + ' alvo' + (burnedTargets.length > 1 ? 's' : '') +
            ' por ' + totalBurnDmg + ' de dano.', elemColor, 'combat');
    }

    // Bônus de bloqueio: +BRASAS_BLOCK_PERCENT% por stack
    // Aplicado como buff temporário que dura até o próximo turno
    _applyBrasasBlockBonus(participantId, stacks);

    // Atualiza display
    if (typeof updateStatsDisplay === 'function') updateStatsDisplay();
}

// Chamado no FIM do turno (antes de regenerar PA/PM)
// Se não usou feitiço de fogo, perde TODAS as brasas
function tickBrasasTurnEnd(participantId) {
    if (!combatState.brasas || !combatState.brasas[participantId]) return;
    var state = combatState.brasas[participantId];

    if (!state.usedFireThisTurn && state.stacks > 0) {
        var lost = state.stacks;
        state.stacks = 0;
        // Feedback
        var entity = _getBrasasEntity(participantId);
        if (entity && typeof addFloatingText === 'function') {
            addFloatingText(Math.floor(entity.x), Math.floor(entity.y),
                '💨 Brasas extintas', '#888', 'debuff');
        }
        if (typeof addChatMessage === 'function') {
            addChatMessage('💨 Brasas (' + lost + ' stacks) extinguiram — nenhum feitiço de fogo usado.', '#888', 'combat');
        }
    }

    // Reset flag para o próximo turno
    state.usedFireThisTurn = false;
}

// Limpa tudo (início de combate novo)
function clearBrasas() {
    if (typeof combatState !== 'undefined') {
        combatState.brasas = {};
    }
}

// ===== HELPERS INTERNOS =====

// Resolve o elemento cromático das Brasas baseado no maior stat primário do caster
// earth=strength, fire=intelligence, air=agility, water=luck
function _resolveBrasasElement(participantId) {
    if (participantId === 'player' && typeof calculateTotalAttributes === 'function') {
        var total = calculateTotalAttributes().total;
        var elements = [
            { element: 'earth', stat: total.strength || 10 },
            { element: 'fire', stat: total.intelligence || 10 },
            { element: 'air', stat: total.agility || 10 },
            { element: 'water', stat: total.luck || 10 }
        ];
        elements.sort(function(a, b) { return b.stat - a.stat; });
        return elements[0].element;
    }
    // Monstros: usa fire como fallback
    return 'fire';
}

var BRASAS_ELEMENT_NAMES = {
    fire: 'Fogo', earth: 'Terra', air: 'Ar', water: 'Água', neutral: 'Neutro'
};

function _getBrasasEntity(participantId) {
    // Modo simulação
    if (typeof simCombatState !== 'undefined' && simCombatState.active) {
        var p = simCombatState.participants.find(function(p) { return p.id === participantId; });
        if (p) return p.entity;
    }
    // Combate normal
    if (participantId === 'player' && typeof playerEntity !== 'undefined') return playerEntity;
    // Busca no turnOrder
    if (typeof combatState !== 'undefined' && combatState.turnOrder) {
        var entry = combatState.turnOrder.find(function(t) { return t.id === participantId; });
        if (entry) return entry.entity;
    }
    return null;
}

function _getBrasasEnemiesAtCell(participantId, cellX, cellY) {
    var enemies = [];

    // Modo simulação
    if (typeof simCombatState !== 'undefined' && simCombatState.active) {
        var currentP = simCombatState.participants.find(function(p) { return p.id === participantId; });
        if (!currentP) return enemies;
        simCombatState.participants.forEach(function(p) {
            if (simCombatState.entityStats[p.id].hp <= 0) return;
            if (p.type === currentP.type) return; // mesmo time
            if (Math.floor(p.entity.x) === cellX && Math.floor(p.entity.y) === cellY) {
                enemies.push(p.entity);
            }
        });
        return enemies;
    }

    // Combate normal: player vs monsters
    if (participantId === 'player') {
        // Inimigos são entidades (monstros) naquela célula
        if (typeof getEntitiesAtCell === 'function') {
            var ents = getEntitiesAtCell(cellX, cellY);
            ents.forEach(function(e) {
                if (e.hp > 0) enemies.push(e);
            });
        }
    } else {
        // Monstro queimando: verifica se o player está naquela célula
        if (typeof playerEntity !== 'undefined') {
            var px = Math.floor(playerEntity.x);
            var py = Math.floor(playerEntity.y);
            if (px === cellX && py === cellY && playerStats.hp > 0) {
                enemies.push(playerEntity);
            }
        }
    }

    return enemies;
}

function _applyBrasasBlockBonus(participantId, stacks) {
    // Aplica bônus temporário de block % para este turno
    // Armazena em combatState.brasasBlockBonus para ser lido pelo cálculo de block
    if (!combatState.brasasBlockBonus) combatState.brasasBlockBonus = {};
    combatState.brasasBlockBonus[participantId] = stacks * BRASAS_BLOCK_PERCENT;
}

// Retorna o bônus de block% de brasas para um participante
function getBrasasBlockBonus(participantId) {
    if (!combatState.brasasBlockBonus || !combatState.brasasBlockBonus[participantId]) return 0;
    return combatState.brasasBlockBonus[participantId];
}

// ===== DOM PASSIVO: GOLPE DEVASTADOR =====
// Chamado após cada hit de dano individual no dano.js
// Se o hit causou >40% do maxHP do alvo, premia o caster com PE, PM e block
var GOLPE_DEVASTADOR_THRESHOLD = 40; // % do HP máximo do alvo

function checkGolpeDevastador(casterId, target, totalHitDmg) {
    // Verifica se o caster tem o DOM passivo ativo (spell orik_dom_ira_titan equipado)
    if (!_hasDomIraTitan(casterId)) return;

    var targetMaxHp = typeof getEntityMaxHp === 'function' ? getEntityMaxHp(target) : (target.maxHp || target.hp || 1);
    var percentDmg = (totalHitDmg / targetMaxHp) * 100;

    if (percentDmg < GOLPE_DEVASTADOR_THRESHOLD) return;

    // Cooldown: 1x por turno
    if (!combatState._golpeDevastadorUsed) combatState._golpeDevastadorUsed = {};
    if (combatState._golpeDevastadorUsed[casterId]) return;
    combatState._golpeDevastadorUsed[casterId] = true;

    var entity = _getBrasasEntity(casterId);
    if (!entity) return;

    // Prêmios: +1 PE, +1 PM, +10% block por 1 turno
    if (casterId === 'player' && typeof playerStats !== 'undefined' && typeof combatStats !== 'undefined') {
        playerStats.pe = Math.min((playerStats.pe || 0) + 1, playerStats.maxPe || 6);
        combatStats.player.pm = Math.min((combatStats.player.pm || 0) + 1, combatStats.player.maxPm + 1);
    }

    // Feedback
    if (typeof addFloatingText === 'function') {
        addFloatingText(Math.floor(entity.x), Math.floor(entity.y),
            '👑 Golpe Devastador!', '#ff8800', 'buff');
    }
    if (typeof addChatMessage === 'function') {
        addChatMessage('👑 <span style="color:#ff8800">Golpe Devastador!</span> Hit de ' +
            Math.round(percentDmg) + '% HP — +1 PE, +1 PM.', '#ff8800', 'combat');
    }
    if (typeof updateStatsDisplay === 'function') updateStatsDisplay();
}

// Verifica se o caster tem o DOM orik_dom_ira_titan (inerente à classe orik)
function _hasDomIraTitan(casterId) {
    if (casterId !== 'player') return false;
    return typeof playerStats !== 'undefined' && playerStats.classId === 'orik';
}

// Reset do cooldown do Golpe Devastador (chamado no início de cada turno)
function resetGolpeDevastador(participantId) {
    if (!combatState._golpeDevastadorUsed) return;
    delete combatState._golpeDevastadorUsed[participantId];
}

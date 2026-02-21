// ========== SISTEMA DE IA PARA MONSTROS ==========
// Sistema de utilidade (utility-based AI) para comportamentos táticos em combate
// Deps runtime: combatState, playerEntity, getReachableCells, getAbilityRangeCells,
//               findTargetsInCells, passTurn, findPath, setEntityDestination
// !! PERFORMANCE: evaluateActions() itera centenas de celulas x feiticos.
// !! NUNCA adicionar console.log dentro de loops. Usar apenas console.warn para erros.

// ===== ARQUÉTIPOS DE COMPORTAMENTO =====
const AI_BEHAVIORS = {
    aggressive_melee: {
        preferredRange: { min: 0, max: 1 },
        moveStrategy: 'approach',
        spellPreference: 'melee',
        dangerThreshold: 0.3  // HP% abaixo do qual prioriza segurança
    },
    defensive_ranged: {
        preferredRange: { min: 2, max: 5 },
        moveStrategy: 'kite',
        spellPreference: 'ranged',
        dangerThreshold: 0.5
    },
    dummy: {
        // IA passiva - só passa o turno (para testes de dano)
        passive: true
    }
};

// ===== SISTEMA DE RESERVA DE CÉLULAS =====
// Rastreia células já ocupadas/reservadas por monstros neste turno
var _aiReservedCells = new Set();

function _cellKey(x, y) { return x + ',' + y; }

// Coleta posições de todos os monstros aliados vivos (exceto o atual) + mortos com desencarne
function _getAllyPositions(currentMonster) {
    var positions = [];
    if (!combatState || !combatState.enemies) return positions;
    for (var i = 0; i < combatState.enemies.length; i++) {
        var e = combatState.enemies[i];
        if (!e || e === currentMonster) continue;
        if (e.hp <= 0 && !(typeof isDesencarnePending === 'function' && isDesencarnePending(e))) continue;
        positions.push({ x: Math.floor(e.x), y: Math.floor(e.y) });
    }
    return positions;
}

// Verifica se a célula está ocupada por outro monstro ou reservada (inclui mortos com desencarne)
function _isCellBlockedByAlly(x, y, currentMonster) {
    if (_aiReservedCells.has(_cellKey(x, y))) return true;
    if (!combatState || !combatState.enemies) return false;
    for (var i = 0; i < combatState.enemies.length; i++) {
        var e = combatState.enemies[i];
        if (!e || e === currentMonster) continue;
        if (e.hp <= 0 && !(typeof isDesencarnePending === 'function' && isDesencarnePending(e))) continue;
        if (Math.floor(e.x) === x && Math.floor(e.y) === y) return true;
    }
    return false;
}

// Limpa reservas no início de cada rodada de monstros
function resetAIReservedCells() {
    _aiReservedCells = new Set();
}

// ===== FUNÇÃO PRINCIPAL =====
// Executada durante o turno do monstro, orquestra todo o processo de decisão
function executeMonsterAI(monster) {
    if (typeof _diagLog === 'function') _diagLog('IA', 'turno monstro: ' + (monster ? monster.name||monster.id||'?' : '?') + ' ai:' + (monster ? monster.aiType||'?' : '?'));
    if (!monster || !monster.aiType) {
        console.warn('Monstro sem aiType definido, passando turno');
        passTurn();
        return;
    }

    const behavior = AI_BEHAVIORS[monster.aiType];
    if (!behavior) {
        console.warn(`Comportamento ${monster.aiType} não encontrado`);
        passTurn();
        return;
    }

    // Se for IA passiva (dummy), apenas passa o turno
    if (behavior.passive) {
        if (typeof addChatMessage === 'function') {
            addChatMessage(`<span style="color:#ff8a8a">${monster.name}</span> passa o turno`, null, 'combat');
        }
        setTimeout(() => {
            passTurn();
        }, 500);
        return;
    }

    // Se o alvo (player) é invisível, o monstro não o vê — passa o turno
    if (typeof hasAdvancedStatus === 'function' && hasAdvancedStatus(playerEntity, 'invisivel')) {
        if (typeof addChatMessage === 'function') {
            addChatMessage(`<span style="color:#ff8a8a">${monster.name}</span> não vê nenhum alvo...`, null, 'combat');
        }
        setTimeout(() => { passTurn(); }, 500);
        return;
    }

    // Avalia todas as ações possíveis e escolhe a melhor
    const allyPositions = _getAllyPositions(monster);
    const availableActions = evaluateActions(monster, behavior, allyPositions);
    const bestAction = selectBestAction(availableActions);

    if (bestAction) {
        // Reserva a célula de destino para que próximos monstros não escolham a mesma
        _aiReservedCells.add(_cellKey(bestAction.moveToX, bestAction.moveToY));
        executeAction(monster, bestAction);
    } else {
        moveTowardsTarget(monster, behavior, allyPositions);
    }
}

// ===== GERAÇÃO E AVALIAÇÃO DE AÇÕES =====
function evaluateActions(monster, behavior, allyPositions) {
    const actions = [];
    const enemy = playerEntity;

    if (!enemy) {
        console.warn('IA: Nenhum inimigo encontrado');
        return actions;
    }

    const spells = getMonsterSpells(monster);
    if (!spells || spells.length === 0) {
        console.warn('IA: Nenhum feitiço disponível para o monstro');
        return actions;
    }

    const pmAvailable = (typeof combatStats !== 'undefined' && combatStats.enemy) ? combatStats.enemy.pm : 0;
    const reachableCells = getReachableCells(
        Math.floor(monster.x),
        Math.floor(monster.y),
        pmAvailable
    );

    // Incluir posição atual do monstro (getReachableCells exclui cost=0)
    reachableCells.unshift({ x: Math.floor(monster.x), y: Math.floor(monster.y), cost: 0 });

    const enemyX = Math.floor(enemy.x);
    const enemyY = Math.floor(enemy.y);

    reachableCells.forEach((cell) => {
        // Não ir para célula ocupada por outro monstro (exceto posição atual)
        if (cell.cost > 0 && _isCellBlockedByAlly(cell.x, cell.y, monster)) return;

        spells.forEach(spell => {
            if (!canCastSpell(spell, monster)) return;

            const rangeCells = getAbilityRangeCells(spell, cell.x, cell.y);

            rangeCells.forEach(targetCell => {
                if (!hasValidTarget(targetCell, enemy)) return;

                // Verificar linha de visão da posição de lançamento
                if (typeof hasLineOfSight === 'function') {
                    if (!hasLineOfSight(cell.x, cell.y, targetCell.x, targetCell.y)) return;
                }

                const score = calculateUtilityScore(monster, spell, cell, targetCell, behavior, enemy, allyPositions);

                actions.push({
                    moveToX: cell.x,
                    moveToY: cell.y,
                    spell: spell,
                    targetX: targetCell.x,
                    targetY: targetCell.y,
                    score: score,
                    moveCost: cell.cost || 0
                });
            });
        });
    });

    return actions;
}

// ===== CÁLCULO DE UTILIDADE (SCORING) =====
function calculateUtilityScore(monster, spell, moveCell, targetCell, behavior, enemy, allyPositions) {
    let score = 0;

    // 1. DANO ESPERADO (peso alto)
    const avgDamage = spell.damage ? (spell.damage.min + spell.damage.max) / 2 : 0;
    score += avgDamage * 10;

    // 2. EFICIÊNCIA DE RECURSOS (dano por custo)
    const paCost = spell.paCost || spell.cost || 0;
    const pmCost = spell.pmCost || 0;
    const peCost = spell.peCost || 0;
    const totalCost = paCost + pmCost + peCost;
    if (totalCost > 0) {
        score += (avgDamage / totalCost) * 5;
    }

    // 3. POSICIONAMENTO TÁTICO
    const enemyX = Math.floor(enemy.x);
    const enemyY = Math.floor(enemy.y);
    const distToEnemy = Math.abs(moveCell.x - enemyX) + Math.abs(moveCell.y - enemyY);

    if (behavior.moveStrategy === 'approach') {
        score += (10 - distToEnemy) * 8;
    } else if (behavior.moveStrategy === 'kite') {
        const idealDist = (behavior.preferredRange.min + behavior.preferredRange.max) / 2;
        const distDiff = Math.abs(distToEnemy - idealDist);
        score += (5 - distDiff) * 8;

        if (distToEnemy <= 1) {
            score -= 50;
        }
    }

    // 4. SEGURANÇA (HP baixo = evitar perigo)
    const currentHP = combatState.enemyHP || monster.hp;
    const maxHP = combatState.enemyMaxHP || monster.hp;
    const hpPercent = currentHP / maxHP;

    if (hpPercent < behavior.dangerThreshold) {
        score += distToEnemy * 5;
    }

    // 5. PREFERÊNCIA DE FEITIÇO (melee vs ranged)
    const spellRange = spell.maxRange != null ? spell.maxRange : 1;
    if (behavior.spellPreference === 'melee' && spellRange <= 1) {
        score += 10;
    } else if (behavior.spellPreference === 'ranged' && spellRange > 2) {
        score += 10;
    }

    // 6. ANTI-AGRUPAMENTO — penalidade por ficar perto de aliados
    if (allyPositions && allyPositions.length > 0) {
        for (var i = 0; i < allyPositions.length; i++) {
            var allyDist = Math.abs(moveCell.x - allyPositions[i].x) + Math.abs(moveCell.y - allyPositions[i].y);
            if (allyDist === 0) {
                score -= 80; // Mesma célula: penalidade pesada
            } else if (allyDist === 1) {
                score -= 15; // Adjacente: penalidade moderada
            } else if (allyDist === 2) {
                score -= 5;  // Próximo: penalidade leve
            }
        }
    }

    // 7. FLANQUEAMENTO — bônus por abordar o alvo de um ângulo diferente dos aliados
    if (allyPositions && allyPositions.length > 0 && distToEnemy <= 3) {
        var myAngle = Math.atan2(moveCell.y - enemyY, moveCell.x - enemyX);
        var minAngleDiff = Math.PI; // máximo possível
        for (var i = 0; i < allyPositions.length; i++) {
            var allyAngle = Math.atan2(allyPositions[i].y - enemyY, allyPositions[i].x - enemyX);
            var diff = Math.abs(myAngle - allyAngle);
            if (diff > Math.PI) diff = 2 * Math.PI - diff;
            if (diff < minAngleDiff) minAngleDiff = diff;
        }
        // Quanto maior a diferença angular, melhor (flanqueando de outro lado)
        score += (minAngleDiff / Math.PI) * 20;
    }

    // 8. ALEATORIEDADE (evita comportamento mecânico)
    score += Math.random() * 5;

    return score;
}

// ===== SELEÇÃO DA MELHOR AÇÃO =====
function selectBestAction(actions) {
    if (!actions || actions.length === 0) return null;

    // Ordena por score (maior primeiro)
    actions.sort((a, b) => b.score - a.score);

    return actions[0];
}

// ===== EXECUÇÃO DA AÇÃO =====
function executeAction(monster, action) {
    const monsterX = Math.floor(monster.x);
    const monsterY = Math.floor(monster.y);

    // 1. MOVIMENTO (se necessário)
    if (action.moveToX !== monsterX || action.moveToY !== monsterY) {
        const path = findPath(monsterX, monsterY, action.moveToX, action.moveToY, true);

        if (path && path.length > 0) {
            setEntityDestination(monster, action.moveToX, action.moveToY, path);

            const pmCost = action.moveCost;
            if (typeof combatStats !== 'undefined' && combatStats.enemy) {
                combatStats.enemy.pm = Math.max(0, combatStats.enemy.pm - pmCost);
            }
        }
    }

    // 2. AGUARDA MOVIMENTO TERMINAR
    setTimeout(() => {
        // 3. LANÇA FEITIÇO
        const aoeCells = typeof getAoECells === 'function'
            ? getAoECells(action.spell, action.targetX, action.targetY, Math.floor(monster.x), Math.floor(monster.y))
            : [{ x: action.targetX, y: action.targetY }];

        const targets = typeof findTargetsInCells === 'function'
            ? findTargetsInCells(aoeCells, action.spell)
            : [];

        // Aplica efeitos do feitiço
        if (typeof _diagLog === 'function') _diagLog('IA', monster.name + ' usa ' + action.spell.name + ' em (' + action.targetX + ',' + action.targetY + ') alvos:' + targets.length);
        if (typeof applySpellEffects === 'function' && targets.length > 0) {
            const result = applySpellEffects(action.spell, targets, action.targetX, action.targetY, Math.floor(monster.x), Math.floor(monster.y));

            // Ground Ardente: células sem alvo ficam com fogo no chão
            if (action.spell.groundArdente && aoeCells && aoeCells.length > 0 && typeof addGroundEffect === 'function') {
                var _gaCells = aoeCells.filter(function(cell) {
                    return !targets.some(function(t) {
                        return Math.floor(t.x) === cell.x && Math.floor(t.y) === cell.y;
                    });
                });
                if (_gaCells.length > 0) {
                    var _gaMonId = combatState.turnOrder[combatState.currentTurnIndex].id;
                    addGroundEffect({
                        type: 'ardente',
                        cells: _gaCells,
                        casterId: _gaMonId,
                        spellId: action.spell.id,
                        turnsRemaining: 1,
                        consumeOnStep: true,
                        onStep: { effectId: 'ardente', level: 1, duration: 1 }
                    });
                }
            }

            // Mensagem de combate no chat
            if (typeof addChatMessage === 'function') {
                let combatMsg = `<span style="color:#ff8a8a">${monster.name}</span> usou ${action.spell.name}`;
                var displayTargets = targets.filter(t => t !== monster);
                if (displayTargets.length > 0) {
                    const targetNames = displayTargets.map(t => {
                        const isPlayer = t === playerEntity;
                        return `<span style="color:${isPlayer ? '#7cb3ff' : '#ff8a8a'}">${isPlayer ? 'Você' : (t.name || 'Alvo')}</span>`;
                    }).join(', ');
                    combatMsg += ` em ${targetNames}`;
                }
                const elemColor = typeof getElementColor === 'function' ? getElementColor(action.spell.element || 'none') : '#fff';
                let resultParts = [];
                if (result.totalDmg > 0) resultParts.push(`<span style="color:${elemColor};font-weight:bold">${result.totalDmg}</span>`);
                if (result.totalHeal > 0) resultParts.push(`<span style="color:#5f5;font-weight:bold">+${result.totalHeal}</span>`);
                if (result.pushed) resultParts.push('moveu');
                if (action.spell.effects && action.spell.effects.length > 0) {
                    action.spell.effects.forEach(eff => {
                        const def = typeof getEffectDefinition === 'function' ? getEffectDefinition(eff.effectId) : null;
                        if (def) resultParts.push(`${def.icon} ${def.name}`);
                    });
                }
                if (resultParts.length > 0) {
                    combatMsg += `, ${resultParts.join(' ')}`;
                }
                addChatMessage(combatMsg, null, 'combat');
            }

            // Verifica se TODA a equipe do player foi derrotada
            if (result.anyKilled) {
                const allPlayersDead = playerStats.hp <= 0;

                if (allPlayersDead) {
                    setTimeout(() => {
                        if (typeof finishCombat === 'function') finishCombat('defeat');
                        else if (typeof endCombat === 'function') endCombat();
                    }, 1500);
                    return;
                }
            }
        } else {
            console.warn(`IA: Não aplicou efeitos - applySpellEffects exists: ${typeof applySpellEffects === 'function'}, targets: ${targets.length}`);
        }

        // Deduz custos de PA/PM/PE
        if (typeof deductSpellCosts === 'function') {
            deductSpellCosts(action.spell, false);
        }

        // Atualiza cooldown counters
        if (typeof combatState !== 'undefined') {
            combatState.spellCastsThisTurn[action.spell.id] = (combatState.spellCastsThisTurn[action.spell.id] || 0) + 1;
            if (action.spell.cooldown > 0) {
                combatState.spellCooldowns[action.spell.id] = action.spell.cooldown;
            }
        }

        // 4. PASSA TURNO APÓS EXECUÇÃO
        setTimeout(() => {
            passTurn();
        }, 500);
    }, 800);
}

// ===== MOVIMENTO TÁTICO =====
function moveTowardsTarget(monster, behavior, allyPositions) {
    const enemy = playerEntity;
    if (!enemy || (typeof hasAdvancedStatus === 'function' && hasAdvancedStatus(enemy, 'invisivel'))) {
        passTurn();
        return;
    }

    const monsterX = Math.floor(monster.x);
    const monsterY = Math.floor(monster.y);
    const enemyX = Math.floor(enemy.x);
    const enemyY = Math.floor(enemy.y);

    var pmAvailable = (typeof combatStats !== 'undefined' && combatStats.enemy) ? combatStats.enemy.pm : 0;

    // Lock/Tackle check: verifica se monstro está preso pelo player
    if (typeof checkTackleLock === 'function') {
        var tackleResult = checkTackleLock(monster, 'monster');
        if (tackleResult.blocked) {
            if (typeof addChatMessage === 'function') {
                addChatMessage(`<span style="color:#ff8a8a">${monster.name}</span> está bloqueado e não pode se mover!`, '#ff6666', 'combat');
            }
            passTurn();
            return;
        }
        if (tackleResult.paCost > 0 || tackleResult.pmCost > 0) {
            if (combatStats.enemy) {
                var hasEnoughPA = combatStats.enemy.pa >= tackleResult.paCost;
                var hasEnoughPM = combatStats.enemy.pm >= tackleResult.pmCost + 1;
                if (!hasEnoughPA || !hasEnoughPM) {
                    // Sem recursos para escapar, nao se move
                    passTurn();
                    return;
                }
                combatStats.enemy.pa -= tackleResult.paCost;
                combatStats.enemy.pm -= tackleResult.pmCost;
                pmAvailable = combatStats.enemy.pm;
                if (typeof updateTurnOrderDisplay === 'function') updateTurnOrderDisplay();
                if (typeof updateStatsDisplay === 'function') updateStatsDisplay();
            }
            var penaltyText = '';
            if (tackleResult.paCost > 0) penaltyText += '-' + tackleResult.paCost + 'PA';
            if (tackleResult.pmCost > 0) penaltyText += (penaltyText ? ' ' : '') + '-' + tackleResult.pmCost + 'PM';
            if (typeof addChatMessage === 'function') {
                addChatMessage(`<span style="color:#ff8a8a">${monster.name}</span> escapou do lock: ${penaltyText}`, '#ff9944', 'combat');
            }
        }
    }

    const reachableCells = getReachableCells(monsterX, monsterY, pmAvailable);

    if (!reachableCells || reachableCells.length === 0) {
        passTurn();
        return;
    }

    // Busca melhor feitiço para saber o alcance ideal
    var bestSpellRange = 1;
    var monsterSpells = getMonsterSpells(monster);
    if (monsterSpells && monsterSpells.length > 0) {
        for (var si = 0; si < monsterSpells.length; si++) {
            var sr = monsterSpells[si].maxRange != null ? monsterSpells[si].maxRange : 1;
            if (sr > bestSpellRange) bestSpellRange = sr;
        }
    }

    let bestCell = null;
    let bestScore = -Infinity;

    reachableCells.forEach(cell => {
        // Não ir para célula ocupada por outro monstro
        if (_isCellBlockedByAlly(cell.x, cell.y, monster)) return;

        const dist = Math.abs(cell.x - enemyX) + Math.abs(cell.y - enemyY);

        let score = 0;

        // Prioridade 1: chegar perto do alvo
        if (behavior.moveStrategy === 'approach') {
            score += (20 - dist) * 10;
        } else if (behavior.moveStrategy === 'kite') {
            const idealDist = (behavior.preferredRange.min + behavior.preferredRange.max) / 2;
            score += (10 - Math.abs(dist - idealDist)) * 10;
        } else {
            score += (20 - dist) * 10;
        }

        // Prioridade 2: linha de visão ao alvo (grande bônus)
        if (typeof hasLineOfSight === 'function') {
            if (hasLineOfSight(cell.x, cell.y, enemyX, enemyY)) {
                score += 30;
                // Bônus extra se está no alcance do feitiço com LOS
                if (dist <= bestSpellRange) {
                    score += 25;
                }
            }
        }

        // Prioridade 3: anti-agrupamento — não andar na cola dos aliados
        if (allyPositions && allyPositions.length > 0) {
            for (var ai = 0; ai < allyPositions.length; ai++) {
                var allyDist = Math.abs(cell.x - allyPositions[ai].x) + Math.abs(cell.y - allyPositions[ai].y);
                if (allyDist === 0) {
                    score -= 100; // Mesma célula
                } else if (allyDist === 1) {
                    score -= 15;  // Adjacente
                }
            }
        }

        // Prioridade 4: flanqueamento — abordar de ângulo diferente
        if (allyPositions && allyPositions.length > 0) {
            var myAngle = Math.atan2(cell.y - enemyY, cell.x - enemyX);
            var minAngleDiff = Math.PI;
            for (var ai = 0; ai < allyPositions.length; ai++) {
                var allyAngle = Math.atan2(allyPositions[ai].y - enemyY, allyPositions[ai].x - enemyX);
                var diff = Math.abs(myAngle - allyAngle);
                if (diff > Math.PI) diff = 2 * Math.PI - diff;
                if (diff < minAngleDiff) minAngleDiff = diff;
            }
            score += (minAngleDiff / Math.PI) * 15;
        }

        // Prioridade 5: pequena aleatoriedade
        score += Math.random() * 3;

        if (score > bestScore) {
            bestScore = score;
            bestCell = cell;
        }
    });

    if (bestCell && (bestCell.x !== monsterX || bestCell.y !== monsterY)) {
        // Reserva a célula de destino
        _aiReservedCells.add(_cellKey(bestCell.x, bestCell.y));

        const path = findPath(monsterX, monsterY, bestCell.x, bestCell.y, true);

        if (path && path.length > 0) {
            setEntityDestination(monster, bestCell.x, bestCell.y, path);

            if (typeof combatStats !== 'undefined' && combatStats.enemy) {
                combatStats.enemy.pm = Math.max(0, combatStats.enemy.pm - bestCell.cost);
            }

            setTimeout(() => {
                passTurn();
            }, 800);
        } else {
            console.warn('IA: Não encontrou caminho válido');
            passTurn();
        }
    } else {
        passTurn();
    }
}

// ===== FUNÇÕES AUXILIARES =====

// Obtém lista de feitiços disponíveis para o monstro
function getMonsterSpells(monster) {
    if (monster.spells && monster.spells.length > 0) {
        return monster.spells.map(spellId => {
            if (typeof DB_HABILIDADES_ATIVAS !== 'undefined') {
                const spell = DB_HABILIDADES_ATIVAS.find(s => s.id === spellId);
                if (spell) return normalizeSpell(spell);
            }
            return null;
        }).filter(s => s !== null);
    }

    return [];
}

// Verifica se o monstro pode lançar o feitiço (recursos suficientes)
function canCastSpell(spell, monster) {
    const stats = (typeof combatStats !== 'undefined' && combatStats.enemy) ? combatStats.enemy : { pa: 0, pm: 0, pe: 0 };
    const paAvailable = stats.pa || 0;
    const pmAvailable = stats.pm || 0;
    const peAvailable = stats.pe || 0;

    const paCost = spell.paCost || spell.cost || 0;
    const pmCost = spell.pmCost || 0;
    const peCost = spell.peCost || 0;

    return paAvailable >= paCost && pmAvailable >= pmCost && peAvailable >= peCost;
}

// Verifica se há alvos válidos na célula
function hasValidTarget(targetCell, enemy) {
    // Invisível: monstro não vê o alvo
    if (typeof hasAdvancedStatus === 'function' && hasAdvancedStatus(enemy, 'invisivel')) return false;

    const enemyX = Math.floor(enemy.x);
    const enemyY = Math.floor(enemy.y);

    return targetCell.x === enemyX && targetCell.y === enemyY;
}

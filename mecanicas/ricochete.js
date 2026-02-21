// ========== SISTEMA DE RICOCHETE ==========
// Feitiços que saltam entre múltiplos alvos
// Deps runtime: combatState, dealDamageToTarget, getEntityHp, floatingTexts

// === PROCESSAR RICOCHETE ===
// Chamado APÓS o primeiro hit do feitiço
function processRicochete(spell, initialTarget, caster, initialDamageDealt) {
    if (!spell.ricochete) return 0;

    var bounces = spell.ricochete.bounces || 3;
    var decayPercent = spell.ricochete.decayPercent || 20;
    var maxRange = spell.ricochete.maxRange || 4;
    var sameTargetOnce = spell.ricochete.sameTargetOnce !== false; // Default true
    var requiresLoS = spell.ricochete.requiresLoS || false;

    var hitTargets = [initialTarget];
    var totalBounceDamage = 0;
    var bounceHits = []; // per-target hits do ricochete
    var currentTarget = initialTarget;
    var currentDamage = initialDamageDealt;

    for (var i = 0; i < bounces; i++) {
        // Reduzir dano por decay
        currentDamage *= (1 - decayPercent / 100);
        if (currentDamage < 1) break;

        // Encontrar próximo alvo
        var nextTarget = findNearestEnemyForRicochete(
            currentTarget,
            maxRange,
            hitTargets,
            sameTargetOnce,
            caster,
            requiresLoS
        );

        if (!nextTarget) break;

        // Aplicar dano com ricochete (criar spell temporário)
        var ricocheteSpell = {
            ...spell,
            damage: { min: currentDamage, max: currentDamage },
            ricochete: null // Evitar recursão infinita
        };

        _lastDealCrit = false; // Reset crit flag antes de cada ricochete
        var dmg = dealDamageToTarget(nextTarget, ricocheteSpell, false);
        totalBounceDamage += dmg;
        if (dmg > 0) {
            bounceHits.push({ entity: nextTarget, name: nextTarget.name || 'Alvo', dmg: dmg, heal: 0, isRicochete: true, isCrit: _lastDealCrit });
        }

        // Linha visual de ricochete (opcional)
        if (typeof drawRicocheteLine === 'function') {
            drawRicocheteLine(currentTarget, nextTarget);
        }

        // Atualizar para próximo salto
        hitTargets.push(nextTarget);
        currentTarget = nextTarget;

        if (typeof _diagLog === 'function') {
            _diagLog('RICOCHETE', 'Salto ' + (i + 1) + ' -> ' + (nextTarget.name || nextTarget.type || '?') + ': ' + Math.round(dmg) + ' dmg');
        }
    }

    return { totalDmg: totalBounceDamage, hits: bounceHits };
}

// === ENCONTRAR PRÓXIMO ALVO PARA RICOCHETE ===
function findNearestEnemyForRicochete(fromTarget, maxRange, hitTargets, sameTargetOnce, caster, requiresLoS) {
    var enemies = [];

    // Coletar todos os inimigos possíveis
    if (simCombatState.active) {
        var casterType = simCombatState.participants[simCombatState.currentIndex].type;
        simCombatState.participants.forEach(function(p) {
            if (p.type !== casterType && simCombatState.entityStats[p.id].hp > 0) {
                // Se sameTargetOnce, não pode acertar mesmo alvo duas vezes
                if (sameTargetOnce && hitTargets.indexOf(p.entity) !== -1) return;
                enemies.push(p.entity);
            }
        });
    } else {
        var casterIsPlayer = (caster === playerEntity);
        if (casterIsPlayer) {
            // Jogador: inimigos são monstros
            if (combatState.enemies) {
                combatState.enemies.forEach(function(enemy) {
                    if (enemy.hp > 0) {
                        if (sameTargetOnce && hitTargets.indexOf(enemy) !== -1) return;
                        enemies.push(enemy);
                    }
                });
            }
        } else {
            // Monstro: inimigo é o jogador
            if (playerStats.hp > 0) {
                if (!sameTargetOnce || hitTargets.indexOf(playerEntity) === -1) {
                    enemies.push(playerEntity);
                }
            }
        }
    }

    // Encontrar o mais próximo dentro do range
    var nearestEnemy = null;
    var nearestDist = Infinity;

    enemies.forEach(function(enemy) {
        var dist = Math.abs(Math.floor(enemy.x) - Math.floor(fromTarget.x))
                 + Math.abs(Math.floor(enemy.y) - Math.floor(fromTarget.y));

        if (dist <= maxRange && dist < nearestDist) {
            // Verifica LoS se requiresLoS está ativo no ricochete
            if (requiresLoS && typeof hasLineOfSight === 'function') {
                if (!hasLineOfSight(Math.floor(fromTarget.x), Math.floor(fromTarget.y),
                                    Math.floor(enemy.x), Math.floor(enemy.y))) {
                    return; // Pula este alvo — sem linha de visão
                }
            }
            nearestDist = dist;
            nearestEnemy = enemy;
        }
    });

    return nearestEnemy;
}

// === DESENHAR LINHA DE RICOCHETE (VISUAL) ===
// Opcional: adicionar efeito visual de linha entre alvos
function drawRicocheteLine(fromTarget, toTarget) {
    // Implementação visual (canvas line, particles, etc.)
    // Por enquanto, apenas log
    if (typeof _diagLog === 'function') {
        _diagLog('RICOCHETE-VIS', 'Linha: ' + (fromTarget.name || '?') + ' -> ' + (toTarget.name || '?'));
    }
}

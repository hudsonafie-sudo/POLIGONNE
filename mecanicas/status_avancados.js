// ========== SISTEMA DE STATUS AVANÇADOS ==========
// Estabilizado, Ensaboado, Preso
// Deps runtime: combatState

// ===== ADICIONAR STATUS A UMA ENTIDADE =====
function addAdvancedStatus(entity, statusType, duration, extraData) {
    if (!entity.advancedStatus) entity.advancedStatus = {};

    entity.advancedStatus[statusType] = {
        type: statusType,
        duration: duration,
        turnsRemaining: duration
    };

    // Adicionar dados extras (ex: redirectTo para Sacrifício)
    if (extraData) {
        for (var key in extraData) {
            entity.advancedStatus[statusType][key] = extraData[key];
        }
    }

    if (typeof _diagLog === 'function') {
        _diagLog('STATUS', (entity.name || entity.type || '?') + ' ganhou status: ' + statusType + ' (' + duration + ' turnos)');
    }
}

// ===== REMOVER STATUS DE UMA ENTIDADE =====
function removeAdvancedStatus(entity, statusType) {
    if (!entity.advancedStatus) return;
    delete entity.advancedStatus[statusType];
}

// ===== VERIFICAR SE ENTIDADE TEM STATUS =====
function hasAdvancedStatus(entity, statusType) {
    if (!entity || !entity.advancedStatus) return false;
    return entity.advancedStatus[statusType] !== undefined;
}

// ===== TICK DE STATUS (REDUZIR DURAÇÃO) =====
// Chamado no início do turno de cada entidade (tick do ALVO)
// Pula status com tickOnCasterTurn=true (esses são tickados por tickCasterAdvancedStatuses)
function tickAdvancedStatus(entity) {
    if (!entity.advancedStatus) return;

    var toRemove = [];

    for (var statusType in entity.advancedStatus) {
        var status = entity.advancedStatus[statusType];
        if (status.tickOnCasterTurn) continue; // tick no turno do caster, não do alvo
        status.turnsRemaining--;

        if (status.turnsRemaining <= 0) {
            toRemove.push(statusType);
        }
    }

    toRemove.forEach(function(statusType) {
        removeAdvancedStatus(entity, statusType);
        if (typeof _diagLog === 'function') {
            _diagLog('STATUS', (entity.name || entity.type || '?') + ' perdeu status: ' + statusType);
        }
    });
}

// ===== TICK DE STATUS BASEADO NO CASTER =====
// Chamado no início do turno do CASTER. Tick em TODAS as entidades que possuem
// status aplicados por este caster (tickOnCasterTurn=true).
function tickCasterAdvancedStatuses(casterId, allEntities) {
    if (!allEntities) return;
    allEntities.forEach(function(ent) {
        if (!ent || !ent.advancedStatus) return;
        var toRemove = [];
        for (var statusType in ent.advancedStatus) {
            var status = ent.advancedStatus[statusType];
            if (!status.tickOnCasterTurn || status.casterId !== casterId) continue;
            status.turnsRemaining--;
            if (status.turnsRemaining <= 0) {
                toRemove.push(statusType);
            }
        }
        toRemove.forEach(function(st) {
            removeAdvancedStatus(ent, st);
            if (typeof _diagLog === 'function') {
                _diagLog('STATUS', (ent.name || ent.type || '?') + ' perdeu status (caster turn): ' + st);
            }
            if (typeof addFloatingText === 'function') {
                addFloatingText(ent.x, ent.y, '-' + (st === 'transparente' ? 'Transparente' : st), '#aaddff', 'status');
            }
        });
    });
}

// ===== LIMPAR TODOS OS STATUS DE UMA ENTIDADE =====
function clearAllAdvancedStatus(entity) {
    entity.advancedStatus = {};
}

// ===== VERIFICAÇÕES DE STATUS EM AÇÕES =====

// Verifica se entidade pode ser movida forçadamente (push/pull/swap)
function canBeForcedToMove(entity) {
    // Estabilizado impede movimento forçado
    if (hasAdvancedStatus(entity, 'estabilizado')) {
        return false;
    }
    return true;
}

// Verifica se entidade pode mover-se voluntariamente
function canMoveVoluntarily(entity) {
    // Preso impede movimento voluntário
    if (hasAdvancedStatus(entity, 'preso')) {
        return false;
    }
    return true;
}

// Verifica se movimento é bloqueado por inimigos adjacentes
function isMovementBlocked(entity, fromX, fromY, toX, toY) {
    // Ensaboado ignora bloqueio
    if (hasAdvancedStatus(entity, 'ensaboado')) {
        return false;
    }

    // Verificar inimigos adjacentes à posição de origem
    var adjacentEnemies = getAdjacentEnemies(entity, fromX, fromY);
    return adjacentEnemies.length > 0;
}

// Retorna inimigos adjacentes a uma posição
function getAdjacentEnemies(entity, x, y) {
    var enemies = [];
    var directions = [
        {dx: -1, dy: 0}, {dx: 1, dy: 0},
        {dx: 0, dy: -1}, {dx: 0, dy: 1}
    ];

    var isPlayerEntity = (entity === playerEntity);

    directions.forEach(function(dir) {
        var checkX = x + dir.dx;
        var checkY = y + dir.dy;

        // Verificar se há inimigo nesta posição
        if (isPlayerEntity) {
            // Jogador: inimigos são monstros
            if (combatState.enemies) {
                combatState.enemies.forEach(function(enemy) {
                    if (Math.floor(enemy.x) === checkX && Math.floor(enemy.y) === checkY && enemy.hp > 0) {
                        enemies.push(enemy);
                    }
                });
            }
        } else {
            // Monstro: inimigo é o jogador
            if (Math.floor(playerEntity.x) === checkX && Math.floor(playerEntity.y) === checkY) {
                enemies.push(playerEntity);
            }
        }
    });

    return enemies;
}

// ===== APLICAR STATUS VIA FEITIÇO =====
function applyAdvancedStatusFromSpell(spell, targets, casterEntity) {
    if (!spell.advancedStatus) return;

    targets.forEach(function(target) {
        spell.advancedStatus.forEach(function(statusDef) {
            var statusType = statusDef.type; // 'estabilizado', 'ensaboado', 'preso', 'sacrificio', 'transparente'
            var duration = statusDef.duration || 1;

            // Dados extras (ex: redirectTo para Sacrifício)
            var extraData = {};
            if (statusDef.redirectTo === 'caster' && casterEntity) {
                extraData.redirectTo = casterEntity;
            }
            // tickOnCasterTurn: duração conta no turno do lançador, não do alvo
            if (statusDef.tickOnCasterTurn) {
                extraData.tickOnCasterTurn = true;
                extraData.casterId = typeof getParticipantIdForEntity === 'function'
                    ? getParticipantIdForEntity(casterEntity) : null;
            }

            addAdvancedStatus(target, statusType, duration, extraData);

            // Mostrar texto flutuante
            var statusNames = {
                'estabilizado': 'Estabilizado',
                'ensaboado': 'Ensaboado',
                'preso': 'Preso',
                'sacrificio': 'Sacrifício',
                'invisivel': 'Invisível',
                'transparente': 'Transparente'
            };
            var statusColors = {
                'estabilizado': '#ffaa00',
                'ensaboado': '#88ddff',
                'preso': '#ff4444',
                'sacrificio': '#ff00ff',
                'invisivel': '#aaaaee',
                'transparente': '#aaddff'
            };

            if (typeof addFloatingText === 'function')
                addFloatingText(target.x, target.y, statusNames[statusType] || statusType, statusColors[statusType] || '#ffffff', 'status');
        });
    });
}

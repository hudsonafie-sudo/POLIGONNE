// ========== SISTEMA DE TRIGGERS ==========
// On Kill, On Hit Taken, On Block
// Deps runtime: combatState, combatStats, playerEntity, playerStats, floatingTexts,
//               getTileCenter, worldToScreen, getEntityHp, setEntityHp, getEntityArmor, setEntityArmor

// ===== VARIÁVEL GLOBAL PARA RASTREAR KILLS POR TURNO =====
var _playerKillsThisTurn = 0;

// ===== RESETAR CONTADOR DE KILLS (CHAMAR NO INÍCIO DO TURNO DO JOGADOR) =====
function resetPlayerKillCounter() {
    _playerKillsThisTurn = 0;
}

// ===== PROCESSAR ON KILL TRIGGER =====
// Chamado quando um inimigo morre (HP <= 0)
// spell: o feitiço que matou
// killer: entidade que causou a morte
// victim: entidade que morreu
// lastHitDamage: dano do golpe final que matou (opcional)
function processOnKillTrigger(spell, killer, victim, lastHitDamage) {
    var killerIsPlayer = (killer === playerEntity);
    lastHitDamage = lastHitDamage || 0;

    // Incrementar contador de kills do jogador
    if (killerIsPlayer) {
        _playerKillsThisTurn++;
    }

    // Processar onKill do feitiço usado
    if (spell.onKill && spell.onKill.enabled && spell.onKill.effects) {
        processOnKillEffects(spell.onKill, killer, victim, killerIsPlayer, lastHitDamage, false);
    }

    // Processar onKill de passivos equipados (apenas para jogador)
    if (killerIsPlayer && typeof playerSpellCollection !== 'undefined') {
        playerSpellCollection.forEach(function(passive) {
            if (!passive || passive.spellType !== 'passive') return;
            if (!passive.passiveEffect || !passive.passiveEffect.onKill) return;
            if (!passive.passiveEffect.onKill.enabled) return;

            var onKillDef = passive.passiveEffect.onKill;

            // Verificar se é "primeiro kill apenas"
            if (onKillDef.firstKillPerTurn && _playerKillsThisTurn > 1) {
                return; // Pular se já matou alguém neste turno
            }

            processOnKillEffects(onKillDef, killer, victim, killerIsPlayer, lastHitDamage, true);
        });
    }
}

// ===== PROCESSAR EFEITOS DE ON KILL =====
function processOnKillEffects(onKillDef, killer, victim, killerIsPlayer, lastHitDamage, isFromPassive) {
    if (!onKillDef.effects) return;

    onKillDef.effects.forEach(function(effect) {
        var amount = effect.amount || 0;
        var percent = effect.percent || 0;
        var value = 0;

        switch (effect.type) {
            case 'stealPA':
                // Ganha PA ao matar (funciona para jogador e monstros)
                value = amount;
                if (typeof setEntityPA === 'function') {
                    setEntityPA(killer, Math.min(getEntityPA(killer) + value, getEntityMaxPA(killer)));
                } else if (killerIsPlayer && combatStats.player) {
                    combatStats.player.pa = Math.min(combatStats.player.pa + value, combatStats.player.maxPa || 6);
                }
                showTriggerFloatingText(killer, '+' + value + ' PA!', '#ffd700');
                break;

            case 'stealPM':
                // Ganha PM ao matar (funciona para jogador e monstros)
                value = amount;
                if (typeof setEntityPM === 'function') {
                    setEntityPM(killer, Math.min(getEntityPM(killer) + value, getEntityMaxPM(killer)));
                } else if (killerIsPlayer && combatStats.player) {
                    combatStats.player.pm = Math.min(combatStats.player.pm + value, combatStats.player.maxPm || 3);
                }
                showTriggerFloatingText(killer, '+' + value + ' PM!', '#88ddff');
                break;

            case 'stealHP':
                // Rouba HP
                // Se useLastHitDamage = true: calcula baseado no último golpe
                // Caso contrário: calcula baseado no HP máximo da vítima
                if (effect.useLastHitDamage && lastHitDamage > 0) {
                    // Usar porcentagem do ÚLTIMO GOLPE
                    value = Math.round(lastHitDamage * percent / 100);
                } else if (percent > 0) {
                    // Usar porcentagem do HP MÁXIMO da vítima (padrão)
                    value = Math.round((victim.maxHp || victim.hp) * percent / 100);
                } else {
                    // Valor fixo
                    value = amount;
                }
                var killerMaxHp = killerIsPlayer ? playerStats.maxHp : killer.maxHp;
                var killerCurrentHp = getEntityHp(killer);
                var healed = Math.min(value, killerMaxHp - killerCurrentHp);
                setEntityHp(killer, Math.min(killerMaxHp, killerCurrentHp + healed));
                showTriggerFloatingText(killer, '+' + healed + ' HP!', '#44ff44');
                break;

            case 'stealShield':
            case 'stealArmor':
                // Ganha escudo ao matar
                value = amount;
                setEntityArmor(killer, getEntityArmor(killer) + value);
                showTriggerFloatingText(killer, '+' + value + ' Escudo!', '#6688ff');
                break;

            case 'gainPA':
                // Ganha PA ao matar (funciona para jogador e monstros)
                value = amount;
                if (typeof setEntityPA === 'function') {
                    setEntityPA(killer, Math.min(getEntityPA(killer) + value, getEntityMaxPA(killer)));
                } else if (killerIsPlayer && combatStats.player) {
                    combatStats.player.pa = Math.min(combatStats.player.pa + value, combatStats.player.maxPa || 6);
                }
                showTriggerFloatingText(killer, '+' + value + ' PA!', '#ffd700');
                break;

            case 'gainPM':
                // Ganha PM ao matar (funciona para jogador e monstros)
                value = amount;
                if (typeof setEntityPM === 'function') {
                    setEntityPM(killer, Math.min(getEntityPM(killer) + value, getEntityMaxPM(killer)));
                } else if (killerIsPlayer && combatStats.player) {
                    combatStats.player.pm = Math.min(combatStats.player.pm + value, combatStats.player.maxPm || 3);
                }
                showTriggerFloatingText(killer, '+' + value + ' PM!', '#88ddff');
                break;
        }

        if (typeof _diagLog === 'function') {
            var source = isFromPassive ? 'PASSIVO' : 'FEITIÇO';
            _diagLog('ON-KILL', source + ' - Trigger ' + effect.type + ': +' + value);
        }
    });

    if (typeof updateStatsDisplay === 'function') updateStatsDisplay();
}

// ===== PROCESSAR ON HIT TAKEN TRIGGER =====
// Chamado quando uma entidade SOFRE dano
// entity: quem sofreu o dano
// damage: quantidade de dano recebido (antes de armor)
// spell: feitiço que causou o dano (opcional)
function processOnHitTakenTrigger(entity, damage, spell) {
    // Verificar se a entidade tem passivos com onHitTaken
    // (Implementação depende de como os passivos são armazenados)
    // Por enquanto, verificar se o feitiço do alvo tem onHitTaken

    // Para jogador, verificar equipped passives
    var entityIsPlayer = (entity === playerEntity);
    if (!entityIsPlayer) return;

    // Usar passiveBoosts._triggers do combatState (preenchido por applyPassiveEffect)
    var pb = (typeof combatState !== 'undefined' && combatState.passiveBoosts) ? combatState.passiveBoosts : {};
    if (!pb._triggers || !pb._triggers.onHitTaken) return;

    pb._triggers.onHitTaken.forEach(function(triggerDef) {
        if (!triggerDef || !triggerDef.enabled) return;
        if (triggerDef.minDamage && damage < triggerDef.minDamage) return;
        if (!triggerDef.effects) return;

        triggerDef.effects.forEach(function(effect) {
            var amount = effect.amount || 0;
            var duration = effect.duration || 1;

            switch (effect.type) {
                case 'armor':
                case 'shield':
                    // Ganha escudo ao sofrer dano
                    setEntityArmor(entity, getEntityArmor(entity) + amount);
                    showTriggerFloatingText(entity, '+' + amount + ' Escudo!', '#6688ff');
                    break;

                case 'resistance':
                    // Ganha resistência temporária (aplicar efeito)
                    if (typeof applyEffect === 'function') {
                        // Aplicar efeito de resistência (necessita criar efeito correspondente)
                        // applyEffect('resistencia_temporaria', 1, 'player', 'player');
                    }
                    break;

                case 'parada':
                    // Ganha parada temporária
                    // (Implementar sistema de bonus temporário de parada)
                    break;

                case 'heal':
                    // Cura ao sofrer dano
                    var maxHp = entityIsPlayer ? playerStats.maxHp : entity.maxHp;
                    var currentHp = getEntityHp(entity);
                    var healed = Math.min(amount, maxHp - currentHp);
                    setEntityHp(entity, Math.min(maxHp, currentHp + healed));
                    showTriggerFloatingText(entity, '+' + healed + ' HP!', '#44ff44');
                    break;
            }
        });
    });
}

// ===== PROCESSAR ON BLOCK TRIGGER =====
// Chamado quando Parada ativa e reduz dano
// entity: quem bloqueou
// damageBlocked: quantidade de dano reduzido pela parada
function processOnBlockTrigger(entity, damageBlocked) {
    var entityIsPlayer = (entity === playerEntity);
    if (!entityIsPlayer) return;

    // Usar passiveBoosts._triggers do combatState
    var pb = (typeof combatState !== 'undefined' && combatState.passiveBoosts) ? combatState.passiveBoosts : {};
    if (!pb._triggers || !pb._triggers.onBlock) return;

    pb._triggers.onBlock.forEach(function(triggerDef) {
        if (!triggerDef || !triggerDef.enabled) return;
        if (triggerDef.minDamageBlocked && damageBlocked < triggerDef.minDamageBlocked) return;
        if (!triggerDef.effects) return;

        triggerDef.effects.forEach(function(effect) {
            var amount = effect.amount || 0;
            var percent = effect.percent || 0;
            var duration = effect.duration || 1;

            switch (effect.type) {
                case 'armor':
                case 'shield':
                    // Ganha escudo ao bloquear
                    setEntityArmor(entity, getEntityArmor(entity) + amount);
                    showTriggerFloatingText(entity, '+' + amount + ' Escudo!', '#6688ff');
                    break;

                case 'damageBonus':
                    // Ganha bônus de dano temporário (aplicar efeito)
                    if (typeof applyEffect === 'function') {
                        applyEffect('poderoso', 1, 'player', 'player');
                    }
                    break;

                case 'critical':
                    // Ganha chance de crítico temporário
                    // (Implementar sistema de bonus temporário)
                    break;

                case 'concedeSheild':
                case 'concedeArmor':
                    // Concede escudo para aliados próximos
                    // (Implementar busca de aliados adjacentes)
                    break;

                case 'gainPA':
                    // Ganha PA ao bloquear
                    if (combatStats.player) {
                        combatStats.player.pa = Math.min(combatStats.player.pa + amount, combatStats.player.maxPa || 6);
                        showTriggerFloatingText(entity, '+' + amount + ' PA!', '#ffd700');
                    }
                    break;
            }
        });
    });

    if (typeof updateStatsDisplay === 'function') updateStatsDisplay();
}

// ===== HELPER: MOSTRAR TEXTO FLUTUANTE DE TRIGGER =====
function showTriggerFloatingText(entity, text, color) {
    if (typeof addFloatingText === 'function') {
        addFloatingText(entity.x, entity.y, text, color || '#ffaa00', 'status');
    }
}

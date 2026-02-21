// ========== SISTEMA DE TESTES E VALIDACAO AUTOMATICA ==========
// Valida feiticos, efeitos, classes, invocacoes, passivos, DOMs e mecanicas.
// Roda no console do navegador: chamar validarTudo() ou validarFeitico('id')
// Este sistema DEVE ser atualizado quando novas mecanicas forem adicionadas.
// Deps runtime: DB_CLASSES, DB_HABILIDADES, DB_EFEITOS, DB_FEITICOS_* (todos os spell arrays)

// ===== CONSTANTES DE VALIDACAO =====

var VALID_ELEMENTS = ['fire', 'earth', 'air', 'water', 'none', 'chromatic'];
var VALID_SPELL_TYPES = ['active', 'passive', 'dom'];
var VALID_CAST_TYPES = ['targeted', 'self'];
var VALID_RANGE_SHAPES = ['circle', 'cross', 'square', 'line', 'diagonal', 'star'];
var VALID_AOE_TYPES = ['single', 'zone', 'none'];
var VALID_EFFECT_TARGETS = ['enemy', 'self', 'hit', 'ally'];
var VALID_PUSHPULL_TYPES = ['push', 'pull'];
var VALID_ADVANCED_STATUS = ['estabilizado', 'preso', 'ensaboado', 'sacrificio', 'provocado', 'invisivel'];
var VALID_SPELL_EFFECTS = ['damage', 'heal', 'teleport', 'summon', 'selfToggle', 'toggle', 'taunt', 'push', 'pull', 'swap', 'swapPosition', 'swapTwoTargets', 'sacrifice', 'revive', 'charge', 'moveIgnoreBlock', 'moveAway'];
var VALID_PASSIVE_TRIGGERS = ['onBlock', 'onHitTaken', 'onTurnStart', 'onKill'];
var VALID_AURA_TYPES = ['passiveZone', 'groundEffect'];
var VALID_AURA_TARGETS = ['allies', 'enemies', 'all'];
// Bonus de aura que estao IMPLEMENTADOS no codigo (dano.js ~599-623)
var IMPLEMENTED_AURA_BONUSES = ['bonusBlock', 'bonusBlockPercent'];

// Mapeamento classe ID → spell class esperado
var CLASS_SPELL_MAP = {
    'orik': 'orik',
    'zefir': 'atirador',
    'garren': 'cacador',
    'aegis': 'guardiao',
    'klaris': 'clerigo',
    'kaos': 'berserker'
};

// ===== RESULTADO DO TESTE =====

var _testResults = [];
var _testErrors = 0;
var _testWarnings = 0;
var _testPassed = 0;

function _testError(context, msg) {
    _testResults.push({ type: 'ERRO', context: context, msg: msg });
    _testErrors++;
}

function _testWarn(context, msg) {
    _testResults.push({ type: 'AVISO', context: context, msg: msg });
    _testWarnings++;
}

function _testPass(context, msg) {
    _testResults.push({ type: 'OK', context: context, msg: msg });
    _testPassed++;
}

function _resetTests() {
    _testResults = [];
    _testErrors = 0;
    _testWarnings = 0;
    _testPassed = 0;
}

// ===== VALIDACAO DE FEITICO =====

function validarFeitico(spellId) {
    _resetTests();
    var spell = null;
    if (typeof DB_HABILIDADES !== 'undefined') {
        spell = DB_HABILIDADES.find(function(s) { return s.id === spellId; });
    }
    if (!spell) {
        _testError(spellId, 'Feitico nao encontrado em DB_HABILIDADES');
        _imprimirResultados('Feitico: ' + spellId);
        return _testResults;
    }
    _validarCamposFeitico(spell);
    _validarAlcanceFeitico(spell);
    _validarDanoCuraFeitico(spell);
    _validarEfeitosFeitico(spell);
    _validarAdvancedStatusFeitico(spell);
    _validarSummonFeitico(spell);
    _validarToggleFeitico(spell);
    _validarPassivoFeitico(spell);
    _validarDomFeitico(spell);
    _validarRicocheteFeitico(spell);
    _validarGroundEffectFeitico(spell);
    _validarCooldownsFeitico(spell);
    _validarDescricaoFeitico(spell);
    _validarClasseFeitico(spell);
    _imprimirResultados('Feitico: ' + spell.name + ' (' + spellId + ')');
    return _testResults;
}

function _validarCamposFeitico(spell) {
    var ctx = spell.id;

    // Campos obrigatorios
    if (!spell.id) _testError(ctx, 'Falta campo "id"');
    if (!spell.name) _testError(ctx, 'Falta campo "name"');
    if (!spell.icon) _testError(ctx, 'Falta campo "icon"');
    if (!spell.class) _testError(ctx, 'Falta campo "class"');
    if (!spell.description) _testError(ctx, 'Falta campo "description"');

    // Validar element
    if (!spell.element) {
        _testWarn(ctx, 'Falta campo "element" — sera "none" por default');
    } else if (VALID_ELEMENTS.indexOf(spell.element) === -1) {
        _testError(ctx, 'Element invalido: "' + spell.element + '". Validos: ' + VALID_ELEMENTS.join(', '));
    } else {
        _testPass(ctx, 'Element valido: ' + spell.element);
    }

    // Validar spellType
    if (!spell.spellType) {
        _testWarn(ctx, 'Falta campo "spellType" — sera "active" por default');
    } else if (VALID_SPELL_TYPES.indexOf(spell.spellType) === -1) {
        _testError(ctx, 'spellType invalido: "' + spell.spellType + '"');
    } else {
        _testPass(ctx, 'spellType valido: ' + spell.spellType);
    }

    // CatalogId
    if (!spell.catalogId) {
        _testWarn(ctx, 'Falta catalogId (10 digitos)');
    } else if (spell.catalogId.length !== 10) {
        _testError(ctx, 'catalogId deve ter 10 digitos, tem: ' + spell.catalogId.length);
    } else {
        _testPass(ctx, 'catalogId OK: ' + spell.catalogId);
    }

    // Verificar duplicatas de catalogId
    if (spell.catalogId && typeof DB_HABILIDADES !== 'undefined') {
        var dupes = DB_HABILIDADES.filter(function(s) { return s.catalogId === spell.catalogId; });
        if (dupes.length > 1) {
            _testError(ctx, 'catalogId duplicado! Encontrado em: ' + dupes.map(function(d) { return d.id; }).join(', '));
        }
    }
}

function _validarAlcanceFeitico(spell) {
    var ctx = spell.id + ' [alcance]';
    if (spell.spellType === 'passive' || spell.spellType === 'dom') return;

    // PA cost
    if (spell.paCost === undefined && spell.pmCost === undefined) {
        _testWarn(ctx, 'Sem custo de PA ou PM definido');
    }
    if (spell.paCost !== undefined && spell.paCost < 0) {
        _testError(ctx, 'paCost negativo: ' + spell.paCost);
    }
    if (spell.pmCost !== undefined && spell.pmCost < 0) {
        _testError(ctx, 'pmCost negativo: ' + spell.pmCost);
    }
    if (spell.peCost !== undefined && spell.peCost < 0) {
        _testError(ctx, 'peCost negativo: ' + spell.peCost);
    }

    // Range
    var minR = spell.minRange || 0;
    var maxR = spell.maxRange !== undefined ? spell.maxRange : -1;
    if (maxR === -1) {
        _testWarn(ctx, 'maxRange nao definido');
    } else if (minR > maxR) {
        _testError(ctx, 'minRange (' + minR + ') > maxRange (' + maxR + ')');
    } else {
        _testPass(ctx, 'Range OK: ' + minR + '-' + maxR);
    }

    // Range shape
    var shape = spell.rangeShape || spell.rangeType;
    if (shape && VALID_RANGE_SHAPES.indexOf(shape) === -1) {
        _testError(ctx, 'rangeShape invalido: "' + shape + '". Validos: ' + VALID_RANGE_SHAPES.join(', '));
    } else if (shape) {
        _testPass(ctx, 'rangeShape valido: ' + shape);
    }

    // AOE
    var aoe = spell.aoeType || 'single';
    if (VALID_AOE_TYPES.indexOf(aoe) === -1) {
        _testError(ctx, 'aoeType invalido: "' + aoe + '"');
    }
    if (aoe === 'zone' && (!spell.zoneCells || spell.zoneCells.length === 0) &&
        !spell.zonePattern && !spell.zoneDirectional) {
        _testWarn(ctx, 'aoeType="zone" mas sem zoneCells, zonePattern ou zoneDirectional');
    }

    // Zone effects para zona
    if (aoe === 'zone' && !spell.zoneEffects) {
        _testWarn(ctx, 'aoeType="zone" mas sem zoneEffects — normalizeSpell adicionara defaults');
    }
}

function _validarDanoCuraFeitico(spell) {
    var ctx = spell.id + ' [dano/cura]';
    if (spell.spellType === 'passive' || spell.spellType === 'dom') return;

    if (spell.damage) {
        if (spell.damage.min === undefined || spell.damage.max === undefined) {
            _testError(ctx, 'damage definido mas falta min ou max');
        } else if (spell.damage.min > spell.damage.max) {
            _testError(ctx, 'damage.min (' + spell.damage.min + ') > damage.max (' + spell.damage.max + ')');
        } else if (spell.damage.min < 0 || spell.damage.max < 0) {
            _testError(ctx, 'damage negativo: min=' + spell.damage.min + ', max=' + spell.damage.max);
        } else {
            _testPass(ctx, 'Dano OK: ' + spell.damage.min + '-' + spell.damage.max);
        }
    }

    if (spell.heal) {
        if (spell.heal.min === undefined || spell.heal.max === undefined) {
            _testError(ctx, 'heal definido mas falta min ou max');
        } else if (spell.heal.min > spell.heal.max) {
            _testError(ctx, 'heal.min (' + spell.heal.min + ') > heal.max (' + spell.heal.max + ')');
        } else {
            _testPass(ctx, 'Cura OK: ' + spell.heal.min + '-' + spell.heal.max);
        }
    }

    if (spell.armorGrant) {
        if (spell.armorGrant.min > spell.armorGrant.max) {
            _testError(ctx, 'armorGrant.min > armorGrant.max');
        } else {
            _testPass(ctx, 'ArmorGrant OK: ' + spell.armorGrant.min + '-' + spell.armorGrant.max);
        }
    }

    // Bonus condicionais
    if (spell.bonusVsArmored && (spell.bonusVsArmored < 0 || spell.bonusVsArmored > 200)) {
        _testWarn(ctx, 'bonusVsArmored fora do range esperado (0-200): ' + spell.bonusVsArmored);
    }
    if (spell.intacto && (spell.intacto < 0 || spell.intacto > 200)) {
        _testWarn(ctx, 'intacto fora do range esperado (0-200): ' + spell.intacto);
    }
    if (spell.berserk && (spell.berserk < 0 || spell.berserk > 200)) {
        _testWarn(ctx, 'berserk fora do range esperado (0-200): ' + spell.berserk);
    }

    // Self damage
    if (spell.selfDamage) {
        if (!spell.selfDamage.type || !spell.selfDamage.amount) {
            _testError(ctx, 'selfDamage incompleto — precisa de type e amount');
        }
    }

    // Roubo de PA/PM e Vontade
    if (spell.paSteal && spell.paSteal > 0) {
        _testPass(ctx, 'paSteal: ' + spell.paSteal + (spell.stealFixed ? ' (fixo)' : ' (contestado por Vontade)'));
    }
    if (spell.pmSteal && spell.pmSteal > 0) {
        _testPass(ctx, 'pmSteal: ' + spell.pmSteal + (spell.stealFixed ? ' (fixo)' : ' (contestado por Vontade)'));
    }
    if (spell.stealFixed && !spell.paSteal && !spell.pmSteal) {
        _testWarn(ctx, 'stealFixed=true mas nenhum paSteal/pmSteal definido — flag sem efeito');
    }
}

function _validarEfeitosFeitico(spell) {
    var ctx = spell.id + ' [efeitos]';
    if (!spell.effects || spell.effects.length === 0) return;

    spell.effects.forEach(function(eff, i) {
        if (!eff.effectId) {
            _testError(ctx, 'Efeito #' + i + ' sem effectId');
            return;
        }

        // Verificar se o efeito existe em DB_EFEITOS
        if (typeof DB_EFEITOS !== 'undefined') {
            var found = DB_EFEITOS.find(function(e) { return e.id === eff.effectId; });
            if (!found) {
                _testError(ctx, 'Efeito "' + eff.effectId + '" NAO EXISTE em DB_EFEITOS');
            } else {
                _testPass(ctx, 'Efeito "' + eff.effectId + '" encontrado em DB_EFEITOS');

                // Validar level
                if (eff.level && eff.level > found.levels.length) {
                    _testError(ctx, 'Efeito "' + eff.effectId + '" level ' + eff.level + ' mas DB_EFEITOS so tem ' + found.levels.length + ' niveis');
                }
            }
        }

        // Validar target
        if (eff.target && VALID_EFFECT_TARGETS.indexOf(eff.target) === -1) {
            _testError(ctx, 'Efeito "' + eff.effectId + '" target invalido: "' + eff.target + '"');
        }
    });
}

function _validarAdvancedStatusFeitico(spell) {
    var ctx = spell.id + ' [advancedStatus]';
    if (!spell.advancedStatus) return;

    if (!Array.isArray(spell.advancedStatus)) {
        _testError(ctx, 'advancedStatus deve ser um array');
        return;
    }

    spell.advancedStatus.forEach(function(st, i) {
        if (!st.type) {
            _testError(ctx, 'advancedStatus[' + i + '] sem type');
            return;
        }
        if (VALID_ADVANCED_STATUS.indexOf(st.type) === -1) {
            _testError(ctx, 'advancedStatus[' + i + '].type invalido: "' + st.type + '". Validos: ' + VALID_ADVANCED_STATUS.join(', '));
        }
        if (!st.duration || st.duration <= 0) {
            _testError(ctx, 'advancedStatus[' + i + '].duration deve ser > 0');
        }
        // Invisível + dano direto: warn que causar dano revela
        if (st.type === 'invisivel' && spell.damage && (spell.damage.min > 0 || spell.damage.max > 0)) {
            _testWarn(ctx, 'Feitico aplica invisivel MAS causa dano — dano direto revela invisibilidade');
        }
        _testPass(ctx, 'advancedStatus[' + i + ']: ' + st.type + ' (' + st.duration + ' turnos)');
    });
}

function _validarSummonFeitico(spell) {
    var ctx = spell.id + ' [summon]';
    if (spell.effect !== 'summon') return;

    if (!spell.summon) {
        _testError(ctx, 'effect="summon" mas campo "summon" nao definido');
        return;
    }
    if (!spell.summon.type) {
        _testError(ctx, 'summon.type nao definido');
    } else {
        _testPass(ctx, 'summon.type: ' + spell.summon.type);

        // Verificar duplicata de summon.type em outros feiticos
        if (typeof DB_HABILIDADES !== 'undefined') {
            var sameSummonType = DB_HABILIDADES.filter(function(s) {
                return s.effect === 'summon' && s.summon && s.summon.type === spell.summon.type && s.id !== spell.id;
            });
            if (sameSummonType.length > 0) {
                _testWarn(ctx, 'summon.type "' + spell.summon.type + '" tambem usado em: ' + sameSummonType.map(function(s) { return s.id; }).join(', ') + ' — pode causar conflito de limite');
            }
        }
    }
    if (!spell.summon.hpPercent || spell.summon.hpPercent <= 0) {
        _testError(ctx, 'summon.hpPercent invalido: ' + spell.summon.hpPercent);
    } else if (spell.summon.hpPercent > 100) {
        _testWarn(ctx, 'summon.hpPercent > 100%: ' + spell.summon.hpPercent + '% — invocacao tera mais HP que o caster');
    } else {
        _testPass(ctx, 'summon.hpPercent: ' + spell.summon.hpPercent + '%');
    }
    if (!spell.requiresEmptyCell) {
        _testError(ctx, 'Summon PRECISA de requiresEmptyCell: true');
    }

    // Verificar se PA/PM > 0 sem sistema de controle implementado
    if (spell.summon.pa && spell.summon.pa > 0) {
        _testWarn(ctx, 'summon.pa=' + spell.summon.pa + ' — invocacoes com PA > 0 ainda fazem auto-skip (type=summon). Sistema de controle NAO implementado');
    }
    if (spell.summon.pm && spell.summon.pm > 0) {
        _testWarn(ctx, 'summon.pm=' + spell.summon.pm + ' — invocacoes com PM > 0 ainda fazem auto-skip (type=summon). Sistema de controle NAO implementado');
    }

    // Verificar campos de controle/IA nao implementados
    if (spell.summon.controlled) {
        _testError(ctx, 'summon.controlled=true — sistema de invocacao controlavel NAO IMPLEMENTADO ainda. O turno vai auto-skip');
    }
    if (spell.summon.aiType) {
        _testError(ctx, 'summon.aiType="' + spell.summon.aiType + '" — sistema de invocacao com IA NAO IMPLEMENTADO ainda. O turno vai auto-skip');
    }
    if (spell.summon.spells) {
        _testWarn(ctx, 'summon.spells definido — sistema de feiticos de invocacao NAO IMPLEMENTADO ainda');
    }

    // Verificar aura se existir
    if (spell.summon.aura) {
        _validarAuraSummon(ctx, spell.summon.aura);
    }
}

function _validarAuraSummon(ctx, aura) {
    // Range
    if (!aura.range || aura.range <= 0) {
        _testError(ctx, 'Aura sem range valido');
    } else if (aura.range > 10) {
        _testWarn(ctx, 'Aura com range=' + aura.range + ' — muito grande, pode afetar mapa inteiro');
    } else {
        _testPass(ctx, 'Aura range: ' + aura.range);
    }

    // Type
    if (!aura.type) {
        _testError(ctx, 'Aura sem type (deve ser "passiveZone" ou "groundEffect")');
    } else if (VALID_AURA_TYPES.indexOf(aura.type) === -1) {
        _testError(ctx, 'Aura type invalido: "' + aura.type + '". Validos: ' + VALID_AURA_TYPES.join(', '));
    } else {
        _testPass(ctx, 'Aura type: ' + aura.type);
    }

    // Target
    if (!aura.target) {
        _testError(ctx, 'Aura sem target (deve ser "allies", "enemies" ou "all")');
    } else if (VALID_AURA_TARGETS.indexOf(aura.target) === -1) {
        _testError(ctx, 'Aura target invalido: "' + aura.target + '". Validos: ' + VALID_AURA_TARGETS.join(', '));
    } else {
        _testPass(ctx, 'Aura target: ' + aura.target);
    }

    // Verificar se bonus da aura esta IMPLEMENTADO no codigo
    if (aura.type === 'passiveZone') {
        var allBonusKeys = Object.keys(aura).filter(function(k) {
            return k.indexOf('bonus') === 0;
        });

        if (allBonusKeys.length === 0) {
            _testWarn(ctx, 'Aura passiveZone sem nenhum bonus definido (campos bonus*)');
        }

        allBonusKeys.forEach(function(key) {
            if (IMPLEMENTED_AURA_BONUSES.indexOf(key) === -1) {
                _testError(ctx, 'Aura bonus "' + key + '" NAO ESTA IMPLEMENTADO no codigo (dano.js). Apenas implementados: ' + IMPLEMENTED_AURA_BONUSES.join(', ') + '. Implementar leitura em dealDamageToTarget() ou remover');
            } else {
                _testPass(ctx, 'Aura bonus "' + key + '" implementado: ' + aura[key]);
            }
        });
    }

    // groundEffect aura — alertar que eh sistema diferente
    if (aura.type === 'groundEffect') {
        _testWarn(ctx, 'Aura tipo "groundEffect" em summon — groundEffects sao de celula fixa, nao de aura dinamica. Verificar se nao deveria ser "passiveZone"');
    }
}

function _validarToggleFeitico(spell) {
    var ctx = spell.id + ' [toggle]';
    if (spell.effect !== 'selfToggle' && spell.effect !== 'toggle') return;

    if (!spell.toggleEffect) {
        _testError(ctx, 'effect="' + spell.effect + '" mas toggleEffect nao definido');
        return;
    }

    // selfToggle precisa de minRange=0, maxRange=0
    if (spell.effect === 'selfToggle') {
        if (spell.minRange !== 0 || spell.maxRange !== 0) {
            _testWarn(ctx, 'selfToggle normalmente usa minRange=0, maxRange=0 (clicar em si)');
        }
    }

    _testPass(ctx, 'Toggle configurado');
}

function _validarPassivoFeitico(spell) {
    var ctx = spell.id + ' [passivo]';
    if (spell.spellType !== 'passive') return;

    if (!spell.passiveEffect) {
        _testError(ctx, 'spellType="passive" mas passiveEffect nao definido');
        return;
    }

    var pe = spell.passiveEffect;
    var hasTrigger = false;

    // Verificar triggers validos
    VALID_PASSIVE_TRIGGERS.forEach(function(trigger) {
        if (pe[trigger]) {
            hasTrigger = true;
            if (pe[trigger].enabled === false) {
                _testWarn(ctx, 'Trigger "' + trigger + '" existe mas enabled=false');
            } else {
                _testPass(ctx, 'Trigger "' + trigger + '" configurado');
                // Verificar effects dentro do trigger
                if (pe[trigger].effects) {
                    pe[trigger].effects.forEach(function(eff, i) {
                        if (!eff.type) {
                            _testError(ctx, 'Trigger "' + trigger + '" efeito #' + i + ' sem type');
                        }
                    });
                }
            }
        }
    });

    // Passivos podem ter maxHpPercent sem trigger
    if (pe.maxHpPercent) {
        hasTrigger = true;
        _testPass(ctx, 'maxHpPercent: +' + pe.maxHpPercent + '%');
    }

    if (!hasTrigger) {
        _testError(ctx, 'Passivo sem nenhum trigger ou bonus definido');
    }
}

function _validarDomFeitico(spell) {
    var ctx = spell.id + ' [dom]';
    if (spell.spellType !== 'dom') return;

    if (!spell.domPassive) {
        _testWarn(ctx, 'spellType="dom" mas domPassive nao definido');
    }
    if (!spell.triggerType) {
        _testError(ctx, 'DOM sem triggerType');
    } else {
        _testPass(ctx, 'DOM triggerType: ' + spell.triggerType);
    }
    if (!spell.triggerThreshold) {
        _testWarn(ctx, 'DOM sem triggerThreshold');
    }
    if (!spell.triggerReward) {
        _testError(ctx, 'DOM sem triggerReward');
    } else {
        _testPass(ctx, 'DOM reward: ' + JSON.stringify(spell.triggerReward));
    }
}

function _validarRicocheteFeitico(spell) {
    var ctx = spell.id + ' [ricochete]';
    if (!spell.ricochete) return;

    if (!spell.ricochete.bounces || spell.ricochete.bounces <= 0) {
        _testError(ctx, 'ricochete.bounces invalido: ' + spell.ricochete.bounces);
    }
    if (spell.ricochete.decayPercent === undefined || spell.ricochete.decayPercent < 0 || spell.ricochete.decayPercent > 100) {
        _testError(ctx, 'ricochete.decayPercent deve ser 0-100: ' + spell.ricochete.decayPercent);
    }
    if (!spell.ricochete.maxRange || spell.ricochete.maxRange <= 0) {
        _testError(ctx, 'ricochete.maxRange invalido: ' + spell.ricochete.maxRange);
    }
    if (!spell.damage || (spell.damage.min === 0 && spell.damage.max === 0)) {
        _testError(ctx, 'Ricochete precisa de damage para funcionar');
    }
    _testPass(ctx, 'Ricochete: ' + spell.ricochete.bounces + ' saltos, -' + spell.ricochete.decayPercent + '%/salto');
}

function _validarGroundEffectFeitico(spell) {
    var ctx = spell.id + ' [groundEffect]';
    if (spell.spellType === 'passive' || spell.spellType === 'dom') return;

    // groundArdente
    if (spell.groundArdente) {
        _testPass(ctx, 'groundArdente: true — celulas vazias recebem Ardente no chao');

        // groundArdente precisa de zona para funcionar
        var aoe = spell.aoeType || 'single';
        if (aoe === 'single') {
            _testWarn(ctx, 'groundArdente com aoeType="single" — so afeta 1 celula (se vazia). Normalmente usado com zone');
        }

        // groundArdente sem dano eh estranho
        if (!spell.damage && !spell.heal) {
            _testWarn(ctx, 'groundArdente sem dano/cura — feitico so cria chao sem efeito no alvo');
        }

        // Verificar se ardente existe em DB_EFEITOS
        if (typeof DB_EFEITOS !== 'undefined') {
            var ardenteEff = DB_EFEITOS.find(function(e) { return e.id === 'ardente'; });
            if (!ardenteEff) {
                _testError(ctx, 'groundArdente usa "ardente" mas efeito NAO EXISTE em DB_EFEITOS');
            }
        }
    }

    // groundTrap — armadilhas no chao
    if (spell.groundTrap) {
        var gt = spell.groundTrap;
        _testPass(ctx, 'groundTrap definido — tipo: ' + (gt.type || 'generico'));

        if (!gt.onStep) {
            _testError(ctx, 'groundTrap sem onStep — armadilha nao faz nada ao pisar');
        } else {
            var hasAction = gt.onStep.damage || gt.onStep.effectId || gt.onStep.pushPull;
            if (!hasAction) {
                _testError(ctx, 'groundTrap.onStep sem damage, effectId ou pushPull — sem acao ao pisar');
            }
            if (gt.onStep.damage) {
                if (typeof gt.onStep.damage.min !== 'number' || typeof gt.onStep.damage.max !== 'number') {
                    _testError(ctx, 'groundTrap.onStep.damage precisa de min e max numericos');
                } else if (gt.onStep.damage.min > gt.onStep.damage.max) {
                    _testError(ctx, 'groundTrap.onStep.damage.min > max');
                }
            }
            if (gt.onStep.element && VALID_ELEMENTS.indexOf(gt.onStep.element) === -1) {
                _testError(ctx, 'groundTrap.onStep.element invalido: "' + gt.onStep.element + '"');
            }
            if (gt.onStep.effectId && typeof DB_EFEITOS !== 'undefined') {
                var trapEff = DB_EFEITOS.find(function(e) { return e.id === gt.onStep.effectId; });
                if (!trapEff) {
                    _testError(ctx, 'groundTrap.onStep.effectId "' + gt.onStep.effectId + '" NAO EXISTE em DB_EFEITOS');
                }
            }
            if (gt.onStep.pushPull) {
                if (VALID_PUSHPULL_TYPES.indexOf(gt.onStep.pushPull.type) === -1) {
                    _testError(ctx, 'groundTrap.onStep.pushPull.type invalido: "' + gt.onStep.pushPull.type + '"');
                }
                if (!gt.onStep.pushPull.distance || gt.onStep.pushPull.distance <= 0) {
                    _testError(ctx, 'groundTrap.onStep.pushPull.distance deve ser > 0');
                }
            }
        }

        if (gt.turnsRemaining !== undefined && gt.turnsRemaining <= 0) {
            _testWarn(ctx, 'groundTrap.turnsRemaining <= 0 — armadilha desaparece imediatamente');
        }
    }

    // Verificar campos de ground effect futuros (nao implementados)
    var futureGroundFields = ['groundGelo', 'groundVeneno', 'groundLava', 'groundPoison'];
    futureGroundFields.forEach(function(field) {
        if (spell[field]) {
            _testError(ctx, 'Campo "' + field + '" definido mas NAO IMPLEMENTADO no codigo. Use groundTrap para armadilhas com efeitos');
        }
    });
}

function _validarCooldownsFeitico(spell) {
    var ctx = spell.id + ' [cooldowns]';
    if (spell.spellType === 'passive' || spell.spellType === 'dom') return;

    if (spell.cooldown !== undefined && spell.cooldown < 0) {
        _testError(ctx, 'cooldown negativo: ' + spell.cooldown);
    }
    if (spell.castsPerTurn !== undefined && spell.castsPerTurn <= 0) {
        _testError(ctx, 'castsPerTurn deve ser > 0: ' + spell.castsPerTurn);
    }
    if (spell.castsPerTarget !== undefined && spell.castsPerTarget <= 0) {
        _testError(ctx, 'castsPerTarget deve ser > 0: ' + spell.castsPerTarget);
    }
    if (spell.initialCooldown !== undefined && spell.initialCooldown < 0) {
        _testError(ctx, 'initialCooldown negativo: ' + spell.initialCooldown);
    }
    _testPass(ctx, 'Cooldowns OK');
}

function _validarDescricaoFeitico(spell) {
    var ctx = spell.id + ' [descricao]';
    if (!spell.description) {
        _testError(ctx, 'Sem descricao');
        return;
    }

    var desc = spell.description;

    if (spell.spellType === 'passive' || spell.spellType === 'dom') {
        _testPass(ctx, 'Descricao presente');
        return;
    }

    // Verificar se dano aparece na descricao
    if (spell.damage && spell.damage.min > 0) {
        var dmgStr1 = spell.damage.min + '-' + spell.damage.max;
        var dmgStr2 = spell.damage.min + ' a ' + spell.damage.max;
        if (desc.indexOf(dmgStr1) === -1 && desc.indexOf(dmgStr2) === -1 &&
            desc.indexOf('' + spell.damage.min) === -1) {
            _testWarn(ctx, 'Dano ' + dmgStr1 + ' pode nao estar na descricao');
        }
    }

    // Verificar se cura aparece na descricao
    if (spell.heal && spell.heal.min > 0) {
        var healStr = spell.heal.min + '-' + spell.heal.max;
        if (desc.indexOf(healStr) === -1 && desc.indexOf('' + spell.heal.min) === -1) {
            _testWarn(ctx, 'Cura ' + healStr + ' pode nao estar na descricao');
        }
    }

    // Verificar se cooldown aparece quando > 0
    if (spell.cooldown && spell.cooldown > 0) {
        if (desc.indexOf('' + spell.cooldown) === -1 && desc.toLowerCase().indexOf('recarga') === -1) {
            _testWarn(ctx, 'Cooldown=' + spell.cooldown + ' pode nao estar na descricao');
        }
    }

    // Verificar se alcance aparece
    if (spell.maxRange !== undefined && spell.maxRange > 0) {
        if (desc.indexOf('' + spell.maxRange) === -1) {
            _testWarn(ctx, 'maxRange=' + spell.maxRange + ' pode nao estar na descricao');
        }
    }

    // Verificar se custo PA aparece
    if (spell.paCost && spell.paCost > 0) {
        if (desc.indexOf('' + spell.paCost) === -1 && desc.indexOf('PA') === -1) {
            // Nao eh obrigatorio, apenas aviso
        }
    }

    _testPass(ctx, 'Descricao presente e verificada');
}

function _validarClasseFeitico(spell) {
    var ctx = spell.id + ' [classe]';
    if (!spell.class) return;

    // Verificar se o feitico esta no spellIds de alguma classe
    if (typeof DB_CLASSES !== 'undefined') {
        var found = false;
        DB_CLASSES.forEach(function(cls) {
            if (cls.spellIds && cls.spellIds.indexOf(spell.id) !== -1) {
                found = true;

                // Verificar se spell.class corresponde ao esperado
                var expectedSpellClass = CLASS_SPELL_MAP[cls.id];
                if (expectedSpellClass && spell.class !== expectedSpellClass) {
                    _testError(ctx, 'Classe "' + cls.id + '" espera spell.class="' + expectedSpellClass + '" mas feitico tem class="' + spell.class + '"');
                } else {
                    _testPass(ctx, 'Spell.class="' + spell.class + '" correto para classe "' + cls.id + '"');
                }
            }
        });

        if (!found) {
            _testWarn(ctx, 'Feitico nao esta no spellIds de nenhuma classe em DB_CLASSES');
        }
    }
}

// ===== VALIDACAO DE CLASSE =====

function validarClasse(classId) {
    _resetTests();
    if (typeof DB_CLASSES === 'undefined') {
        _testError(classId, 'DB_CLASSES nao carregado');
        _imprimirResultados('Classe: ' + classId);
        return _testResults;
    }

    var cls = DB_CLASSES.find(function(c) { return c.id === classId; });
    if (!cls) {
        _testError(classId, 'Classe nao encontrada em DB_CLASSES');
        _imprimirResultados('Classe: ' + classId);
        return _testResults;
    }

    var ctx = cls.id;

    // Campos obrigatorios
    if (!cls.name) _testError(ctx, 'Falta name');
    if (!cls.icon) _testError(ctx, 'Falta icon');
    if (!cls.description) _testError(ctx, 'Falta description');
    if (!cls.elements || cls.elements.length !== 3) {
        _testError(ctx, 'Deve ter exatamente 3 elementos, tem: ' + (cls.elements ? cls.elements.length : 0));
    } else {
        cls.elements.forEach(function(el) {
            if (VALID_ELEMENTS.indexOf(el) === -1 || el === 'none' || el === 'chromatic') {
                _testError(ctx, 'Elemento invalido para classe: "' + el + '"');
            }
        });
        _testPass(ctx, 'Elementos: ' + cls.elements.join(', '));
    }

    // Base stats
    if (!cls.baseStats) {
        _testError(ctx, 'Falta baseStats');
    } else {
        if (!cls.baseStats.hp || cls.baseStats.hp <= 0) _testError(ctx, 'baseStats.hp invalido');
        if (!cls.baseStats.pa || cls.baseStats.pa <= 0) _testError(ctx, 'baseStats.pa invalido');
        if (cls.baseStats.pm === undefined || cls.baseStats.pm < 0) _testError(ctx, 'baseStats.pm invalido');
        _testPass(ctx, 'BaseStats: HP=' + cls.baseStats.hp + ' PA=' + cls.baseStats.pa + ' PM=' + cls.baseStats.pm);
    }

    // Spell IDs
    if (!cls.spellIds || cls.spellIds.length === 0) {
        _testError(ctx, 'Falta spellIds');
    } else {
        _testPass(ctx, 'Total spellIds: ' + cls.spellIds.length);

        // Verificar se todos os spells existem
        if (typeof DB_HABILIDADES !== 'undefined') {
            var spellClassId = CLASS_SPELL_MAP[cls.id] || cls.id;
            var elementais = 0;
            var ativos = 0;
            var passivos = 0;
            var doms = 0;
            var missing = [];

            cls.spellIds.forEach(function(sid) {
                var spell = DB_HABILIDADES.find(function(s) { return s.id === sid; });
                if (!spell) {
                    missing.push(sid);
                    return;
                }
                // Verificar spell.class
                if (spell.class !== spellClassId) {
                    _testError(ctx, 'Spell "' + sid + '" tem class="' + spell.class + '" mas esperado "' + spellClassId + '"');
                }
                // Contar tipos
                if (spell.spellType === 'passive') passivos++;
                else if (spell.spellType === 'dom') doms++;
                else if (spell.element && spell.element !== 'none') elementais++;
                else ativos++;
            });

            if (missing.length > 0) {
                _testError(ctx, 'Spells NAO ENCONTRADOS em DB_HABILIDADES: ' + missing.join(', '));
            }

            _testPass(ctx, 'Distribuicao: ' + elementais + ' elementais, ' + ativos + ' ativos, ' + passivos + ' passivos, ' + doms + ' DOM');

            if (passivos < 2) _testWarn(ctx, 'Menos de 2 passivos (tem ' + passivos + ')');
            if (doms !== 1) _testWarn(ctx, 'Esperado 1 DOM, tem ' + doms);
        }
    }

    _imprimirResultados('Classe: ' + cls.name + ' (' + cls.id + ')');
    return _testResults;
}

// ===== VALIDACAO DE EFEITO =====

function validarEfeito(effectId) {
    _resetTests();
    if (typeof DB_EFEITOS === 'undefined') {
        _testError(effectId, 'DB_EFEITOS nao carregado');
        _imprimirResultados('Efeito: ' + effectId);
        return _testResults;
    }

    var eff = DB_EFEITOS.find(function(e) { return e.id === effectId; });
    if (!eff) {
        _testError(effectId, 'Efeito nao encontrado em DB_EFEITOS');
        _imprimirResultados('Efeito: ' + effectId);
        return _testResults;
    }

    var ctx = eff.id;

    if (!eff.name) _testError(ctx, 'Falta name');
    if (!eff.icon) _testError(ctx, 'Falta icon');
    if (!eff.description) _testError(ctx, 'Falta description');
    if (!eff.type || (eff.type !== 'buff' && eff.type !== 'debuff')) {
        _testError(ctx, 'type deve ser "buff" ou "debuff", eh: "' + eff.type + '"');
    }

    // Levels
    if (!eff.levels || eff.levels.length === 0) {
        _testError(ctx, 'Falta levels (pelo menos 1)');
    } else {
        _testPass(ctx, 'Levels: ' + eff.levels.length);
        if (eff.stackable && eff.maxStacks > eff.levels.length) {
            _testError(ctx, 'maxStacks (' + eff.maxStacks + ') > levels.length (' + eff.levels.length + ')');
        }
    }

    // Duracao
    if (!eff.durationType) {
        _testError(ctx, 'Falta durationType');
    } else if (eff.durationType === 'turns' && (!eff.duration || eff.duration <= 0)) {
        _testError(ctx, 'durationType="turns" mas duration invalida: ' + eff.duration);
    }

    // Modifiers
    if (eff.modifiers) {
        eff.modifiers.forEach(function(mod, i) {
            if (!mod.stat) _testError(ctx, 'Modifier #' + i + ' sem stat');
            if (!mod.operation) _testError(ctx, 'Modifier #' + i + ' sem operation');
        });
    }

    // DoT (dano por turno)
    if (eff.dot) {
        if (!eff.dot.damage || typeof eff.dot.damage.min !== 'number' || typeof eff.dot.damage.max !== 'number') {
            _testError(ctx, 'dot definido mas dot.damage.min/max ausente ou invalido');
        } else {
            if (eff.dot.damage.min > eff.dot.damage.max) {
                _testError(ctx, 'dot.damage.min > max');
            }
            if (eff.dot.damage.min < 0) {
                _testError(ctx, 'dot.damage.min < 0');
            }
            _testPass(ctx, 'DoT: ' + eff.dot.damage.min + '-' + eff.dot.damage.max + ' (' + (eff.dot.element || 'none') + ')');
        }
        if (eff.dot.element && VALID_ELEMENTS.indexOf(eff.dot.element) === -1) {
            _testError(ctx, 'dot.element invalido: "' + eff.dot.element + '"');
        }
        if (eff.type === 'buff') {
            _testWarn(ctx, 'DoT em buff — incomum. DoTs normalmente sao debuffs');
        }
    }

    // Verificar se algum feitico usa este efeito
    if (typeof DB_HABILIDADES !== 'undefined') {
        var usedBy = [];
        DB_HABILIDADES.forEach(function(spell) {
            if (spell.effects) {
                spell.effects.forEach(function(e) {
                    if (e.effectId === effectId) usedBy.push(spell.id);
                });
            }
        });
        if (usedBy.length === 0) {
            _testWarn(ctx, 'Efeito NAO USADO por nenhum feitico');
        } else {
            _testPass(ctx, 'Usado por ' + usedBy.length + ' feitico(s): ' + usedBy.slice(0, 5).join(', ') + (usedBy.length > 5 ? '...' : ''));
        }
    }

    _imprimirResultados('Efeito: ' + eff.name + ' (' + eff.id + ')');
    return _testResults;
}

// ===== VALIDACAO COMPLETA =====

function validarTudo() {
    _resetTests();
    var totalSpells = 0;
    var totalClasses = 0;
    var totalEffects = 0;

    console.log('%c============================================', 'color: #4a9eff; font-weight: bold');
    console.log('%c   VALIDACAO COMPLETA DO JOGO', 'color: #4a9eff; font-weight: bold; font-size: 14px');
    console.log('%c============================================', 'color: #4a9eff; font-weight: bold');

    // 1. Validar todas as classes
    if (typeof DB_CLASSES !== 'undefined') {
        console.log('\n%c--- CLASSES ---', 'color: #ffd700; font-weight: bold');
        DB_CLASSES.forEach(function(cls) {
            validarClasse(cls.id);
            totalClasses++;
        });
    }

    // 2. Validar todos os feiticos
    if (typeof DB_HABILIDADES !== 'undefined') {
        console.log('\n%c--- FEITICOS ---', 'color: #ffd700; font-weight: bold');
        DB_HABILIDADES.forEach(function(spell) {
            validarFeitico(spell.id);
            totalSpells++;
        });
    }

    // 3. Validar todos os efeitos
    if (typeof DB_EFEITOS !== 'undefined') {
        console.log('\n%c--- EFEITOS ---', 'color: #ffd700; font-weight: bold');
        DB_EFEITOS.forEach(function(eff) {
            validarEfeito(eff.id);
            totalEffects++;
        });
    }

    // 4. Verificacao cruzada: IDs duplicados
    console.log('\n%c--- VERIFICACAO CRUZADA ---', 'color: #ffd700; font-weight: bold');
    _verificarIdsDuplicados();
    _verificarSpellsOrfaos();
    _verificarConsistenciaGeral();
    _verificarSummonConsistencia();
    _verificarAuraConsistencia();

    // Resumo final
    console.log('\n%c============================================', 'color: #4a9eff; font-weight: bold');
    console.log('%c   RESUMO FINAL', 'color: #4a9eff; font-weight: bold; font-size: 14px');
    console.log('%c============================================', 'color: #4a9eff; font-weight: bold');
    console.log('Classes validadas: ' + totalClasses);
    console.log('Feiticos validados: ' + totalSpells);
    console.log('Efeitos validados: ' + totalEffects);
    console.log('%c✓ Passou: ' + _testPassed, 'color: #44dd44');
    console.log('%c⚠ Avisos: ' + _testWarnings, 'color: #ffaa00');
    console.log('%c✗ Erros: ' + _testErrors, 'color: #ff4444');

    if (_testErrors === 0) {
        console.log('\n%c🎉 TUDO OK! Nenhum erro encontrado.', 'color: #44dd44; font-weight: bold; font-size: 16px');
    } else {
        console.log('\n%c❌ ' + _testErrors + ' ERROS encontrados. Corrija antes de continuar.', 'color: #ff4444; font-weight: bold; font-size: 16px');
    }

    return { passed: _testPassed, warnings: _testWarnings, errors: _testErrors };
}

// ===== VERIFICACOES CRUZADAS =====

function _verificarIdsDuplicados() {
    if (typeof DB_HABILIDADES === 'undefined') return;

    var ids = {};
    var catalogIds = {};
    DB_HABILIDADES.forEach(function(spell) {
        // IDs duplicados
        if (ids[spell.id]) {
            _testError('CRUZADA', 'ID duplicado: "' + spell.id + '" — aparece em ' + ids[spell.id] + ' e outro');
        }
        ids[spell.id] = spell.class || '?';

        // CatalogIDs duplicados
        if (spell.catalogId) {
            if (catalogIds[spell.catalogId]) {
                _testError('CRUZADA', 'CatalogId duplicado: "' + spell.catalogId + '" em "' + spell.id + '" e "' + catalogIds[spell.catalogId] + '"');
            }
            catalogIds[spell.catalogId] = spell.id;
        }
    });

    _testPass('CRUZADA', 'Verificacao de IDs duplicados concluida');
}

function _verificarSpellsOrfaos() {
    if (typeof DB_HABILIDADES === 'undefined' || typeof DB_CLASSES === 'undefined') return;

    // Coletar todos os spellIds referenciados por classes
    var allClassSpellIds = {};
    DB_CLASSES.forEach(function(cls) {
        if (cls.spellIds) {
            cls.spellIds.forEach(function(sid) {
                allClassSpellIds[sid] = cls.id;
            });
        }
    });

    // Verificar se cada feitico ativo/passivo esta em alguma classe
    DB_HABILIDADES.forEach(function(spell) {
        if (!allClassSpellIds[spell.id]) {
            _testWarn('CRUZADA', 'Feitico "' + spell.id + '" nao esta no spellIds de nenhuma classe');
        }
    });

    _testPass('CRUZADA', 'Verificacao de spells orfaos concluida');
}

function _verificarConsistenciaGeral() {
    // Verificar se CLASS_SPELL_MAP esta atualizado
    if (typeof DB_CLASSES !== 'undefined' && typeof DB_HABILIDADES !== 'undefined') {
        DB_CLASSES.forEach(function(cls) {
            if (!CLASS_SPELL_MAP[cls.id]) {
                _testWarn('CRUZADA', 'Classe "' + cls.id + '" nao esta no CLASS_SPELL_MAP do validador — ATUALIZAR mecanicas/testes_validacao.js');
            }

            // Verificar se o mapeamento esta correto via primeiro spell
            if (cls.spellIds && cls.spellIds.length > 0) {
                var firstSpell = DB_HABILIDADES.find(function(s) { return s.id === cls.spellIds[0]; });
                if (firstSpell && firstSpell.class && CLASS_SPELL_MAP[cls.id] !== firstSpell.class) {
                    _testError('CRUZADA', 'CLASS_SPELL_MAP desatualizado! Classe "' + cls.id + '" mapeia para "' + CLASS_SPELL_MAP[cls.id] + '" mas primeiro spell tem class="' + firstSpell.class + '"');
                }
            }
        });
    }

    _testPass('CRUZADA', 'Verificacao de consistencia geral concluida');
}

function _verificarSummonConsistencia() {
    if (typeof DB_HABILIDADES === 'undefined') return;

    // Coletar todos os summon types
    var summonTypes = {};
    DB_HABILIDADES.forEach(function(spell) {
        if (spell.effect === 'summon' && spell.summon && spell.summon.type) {
            if (!summonTypes[spell.summon.type]) {
                summonTypes[spell.summon.type] = [];
            }
            summonTypes[spell.summon.type].push(spell.id);
        }
    });

    // Verificar conflitos de summon types
    Object.keys(summonTypes).forEach(function(sType) {
        if (summonTypes[sType].length > 1) {
            // Multiplos feiticos com mesmo summon.type — podem ser de classes diferentes (OK) ou mesma classe (conflito)
            var classes = {};
            summonTypes[sType].forEach(function(sid) {
                var sp = DB_HABILIDADES.find(function(s) { return s.id === sid; });
                if (sp) classes[sp.class] = (classes[sp.class] || []).concat(sid);
            });

            Object.keys(classes).forEach(function(cls) {
                if (classes[cls].length > 1) {
                    _testWarn('CRUZADA', 'summon.type "' + sType + '" duplicado na MESMA classe "' + cls + '": ' + classes[cls].join(', ') + ' — pode causar conflito de limite de invocacoes');
                }
            });
        }
    });

    // Verificar se feiticos summon tem custo PA razoavel
    DB_HABILIDADES.forEach(function(spell) {
        if (spell.effect === 'summon') {
            if (spell.paCost !== undefined && spell.paCost < 2) {
                _testWarn('CRUZADA', 'Summon "' + spell.id + '" com custo PA=' + spell.paCost + ' — custo muito baixo para invocacao');
            }
        }
    });

    _testPass('CRUZADA', 'Verificacao de summons concluida');
}

function _verificarAuraConsistencia() {
    if (typeof DB_HABILIDADES === 'undefined') return;

    var aurasFound = [];

    DB_HABILIDADES.forEach(function(spell) {
        if (spell.effect === 'summon' && spell.summon && spell.summon.aura) {
            var aura = spell.summon.aura;
            aurasFound.push({
                spellId: spell.id,
                summonType: spell.summon.type,
                auraType: aura.type,
                target: aura.target,
                bonuses: Object.keys(aura).filter(function(k) { return k.indexOf('bonus') === 0; })
            });
        }
    });

    if (aurasFound.length === 0) {
        _testPass('CRUZADA', 'Nenhuma aura encontrada para verificar');
        return;
    }

    // Verificar se multiplas auras do mesmo tipo stackam sem limite
    var byTarget = {};
    aurasFound.forEach(function(a) {
        var key = a.target + '_' + a.auraType;
        if (!byTarget[key]) byTarget[key] = [];
        byTarget[key].push(a);
    });

    Object.keys(byTarget).forEach(function(key) {
        if (byTarget[key].length > 1) {
            var types = byTarget[key].map(function(a) { return a.spellId; }).join(', ');
            _testWarn('CRUZADA', 'Multiplas auras com mesmo target e tipo (' + key + '): ' + types + ' — seus bonus stackam sem limite (regra E)');
        }
    });

    // Verificar bonus nao implementados
    aurasFound.forEach(function(a) {
        a.bonuses.forEach(function(bonus) {
            if (IMPLEMENTED_AURA_BONUSES.indexOf(bonus) === -1) {
                _testError('CRUZADA', 'Aura de "' + a.spellId + '" usa bonus "' + bonus + '" NAO IMPLEMENTADO — precisa de codigo em dano.js');
            }
        });
    });

    _testPass('CRUZADA', 'Verificacao de auras concluida (' + aurasFound.length + ' aura(s))');
}

// ===== IMPRESSAO DE RESULTADOS =====

function _imprimirResultados(titulo) {
    var erros = _testResults.filter(function(r) { return r.type === 'ERRO'; });
    var avisos = _testResults.filter(function(r) { return r.type === 'AVISO'; });

    if (erros.length > 0) {
        console.log('%c✗ ' + titulo, 'color: #ff4444; font-weight: bold');
        erros.forEach(function(r) {
            console.log('  %c✗ ' + r.msg, 'color: #ff4444');
        });
    } else if (avisos.length > 0) {
        console.log('%c⚠ ' + titulo, 'color: #ffaa00');
        avisos.forEach(function(r) {
            console.log('  %c⚠ ' + r.msg, 'color: #ffaa00');
        });
    } else {
        console.log('%c✓ ' + titulo, 'color: #44dd44');
    }
}

// ===== API PUBLICA =====

// Comandos disponiveis no console:
// validarTudo()           — Valida TUDO (classes, feiticos, efeitos, cruzada)
// validarFeitico('id')    — Valida um feitico especifico
// validarClasse('id')     — Valida uma classe especifica
// validarEfeito('id')     — Valida um efeito especifico

console.log('%c[VALIDADOR] Sistema de testes carregado. Comandos:', 'color: #4a9eff');
console.log('  validarTudo()           — Valida tudo');
console.log('  validarFeitico("id")    — Valida feitico');
console.log('  validarClasse("id")     — Valida classe');
console.log('  validarEfeito("id")     — Valida efeito');

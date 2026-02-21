// ========== SISTEMA DE RARIDADE ==========

const RARIDADES = {
    comum: {
        id: 'comum',
        nome: 'Comum',
        cor: '#666666',
        corBorda: '#666666',
        corSombra: 'rgba(102,102,102,0.4)',
        brilho: false,
        dropChance: 0.40, // Mult equip: ×0.40 | Mult recurso: ×0.80
        multiplicadorAtributos: 1.0
    },
    incomum: {
        id: 'incomum',
        nome: 'Incomum',
        cor: '#44dd44',
        corBorda: '#44dd44',
        corSombra: 'rgba(85,255,85,0.4)',
        brilho: false,
        dropChance: 0.15, // Mult equip: ×0.15 | Mult recurso: ×0.45
        multiplicadorAtributos: 1.15
    },
    raro: {
        id: 'raro',
        nome: 'Raro',
        cor: '#ffa500',
        corBorda: '#ffa500',
        corSombra: 'rgba(255,165,0,0.5)',
        brilho: false,
        dropChance: 0.06, // Mult equip: ×0.06 | Mult recurso: ×0.18
        multiplicadorAtributos: 1.35
    },
    epico: {
        id: 'epico',
        nome: 'Épico',
        cor: '#ee4499',
        corBorda: '#ee4499',
        corSombra: 'rgba(238,68,153,0.6)',
        brilho: false,
        dropChance: 0.015, // Mult equip: ×0.015 | Mult recurso: ×0.05
        multiplicadorAtributos: 1.60,
        limiteEquipado: 1 // Apenas 1 épico equipado por vez
    },
    lendario: {
        id: 'lendario',
        nome: 'Lendário',
        cor: '#9944ee',
        corBorda: '#9944ee',
        corSombra: 'rgba(153,68,238,0.7)',
        brilho: false,
        dropChance: 0.003, // Mult equip: ×0.003 | Mult recurso: ×0.01
        multiplicadorAtributos: 2.0,
        limiteEquipado: 1 // Apenas 1 lendário equipado por vez
    }
};

// Função para obter raridade
function getRaridade(raridadeId) {
    return RARIDADES[raridadeId] || RARIDADES.comum;
}

// Função para aplicar multiplicador de raridade aos atributos
function aplicarMultiplicadorRaridade(atributos, raridadeId) {
    const raridade = getRaridade(raridadeId);
    const mult = raridade.multiplicadorAtributos;

    const novosAtributos = {};
    for (let key in atributos) {
        novosAtributos[key] = Math.floor(atributos[key] * mult);
    }
    return novosAtributos;
}

// Função para sortear raridade baseado nas chances
function sortearRaridade() {
    const rand = Math.random();
    let acumulado = 0;

    // Ordem inversa: mais raro primeiro
    const ordemRaridade = ['lendario', 'epico', 'raro', 'incomum', 'comum'];

    for (let raridadeId of ordemRaridade) {
        const raridade = RARIDADES[raridadeId];
        acumulado += raridade.dropChance;
        if (rand <= acumulado) {
            return raridadeId;
        }
    }

    return 'comum'; // Fallback
}

// Função para verificar se pode equipar item épico/lendário
function podeEquiparRaridade(raridadeId, equipamentosAtuais) {
    const raridade = getRaridade(raridadeId);

    // Se não tem limite, pode equipar
    if (!raridade.limiteEquipado) return true;

    // Conta quantos itens dessa raridade já estão equipados
    let contador = 0;
    for (let slot in equipamentosAtuais) {
        const item = equipamentosAtuais[slot];
        if (item && item.rarity === raridadeId) {
            contador++;
        }
    }

    return contador < raridade.limiteEquipado;
}

// Função para obter CSS de raridade para um slot
function getSlotRaridadeCSS(raridadeId) {
    const raridade = getRaridade(raridadeId);

    let css = `
        border-color: ${raridade.corBorda} !important;
        box-shadow: 0 0 8px ${raridade.corSombra};
    `;

    return css;
}

// Classes CSS para raridades (sem animação de pulso)
const RARIDADE_ANIMATIONS_CSS = `
    .rarity-comum { border-color: #666666 !important; box-shadow: 0 0 8px rgba(102,102,102,0.4); }
    .rarity-incomum { border-color: #44dd44 !important; box-shadow: 0 0 8px rgba(85,255,85,0.4); }
    .rarity-raro { border-color: #ffa500 !important; box-shadow: 0 0 8px rgba(255,165,0,0.5); }
    .rarity-epico { border-color: #ee4499 !important; box-shadow: 0 0 8px rgba(238,68,153,0.6); }
    .rarity-lendario { border-color: #9944ee !important; box-shadow: 0 0 8px rgba(153,68,238,0.7); }
`;

// ========== SISTEMA DE BALANCEAMENTO DE ITENS ==========
// Sistema de pontos para criar itens balanceados (não visível para usuários)

// Multiplicador de orçamento por slot de equipamento
const MULTIPLICADOR_SLOT = {
    weapon:     1.30,  // Arma inclui dano
    chest:      1.20,  // Maior peça de armadura
    helmet:     1.00,  // Referência base
    weaponLeft: 0.95,  // Escudo/off-hand
    boots:      0.90,  // Peça menor
    cape:       0.85,  // Utilitário
    amulet:     0.80,  // Acessório
    belt:       0.75,  // Peça pequena
    ring:       0.30   // 10 slots disponíveis
};

// Peso de cada atributo em pontos de balanceamento
// Usado para calcular orçamento de itens e verificar balanceamento
const PESO_ATRIBUTOS = {
    // ═══ TIER A — Multiplicadores de dano ═══
    dmg_geral: 10,     // +1% TODOS os danos (universal, multiplicativo)
    dmg_elemental: 8,  // +1% aos 5 elementos (forte mas builds focam 1-2)
    critico: 8,        // +1% chance crítico (+30% dano no proc)
    parada: 8,         // +1% chance parada (-30% dano recebido no proc)

    // ═══ TIER B — Dano elemental específico ═══
    dmg_neutral: 5,    // +1% dano neutro
    dmg_water: 5,      // +1% dano água
    dmg_earth: 5,      // +1% dano terra
    dmg_fire: 5,       // +1% dano fogo
    dmg_air: 5,        // +1% dano ar

    // ═══ TIER C — Defesas secundárias ═══
    dodge: 4,           // Esquiva raw (distrib dá 3/pt dedicado, 2/pt híbrido)
    block: 4,           // Bloqueio raw (distrib dá 3/pt dedicado, 2/pt híbrido)

    // ═══ TIER D — Atributos primários ═══
    strength: 3,       // Força — escala dano terra/neutro (+0.7%/pt)
    intelligence: 3,   // Inteligência — escala dano fogo (+0.7%/pt)
    agility: 3,        // Agilidade — escala dano ar (+0.7%/pt)
    luck: 3,           // Sorte — escala dano água (+0.7%/pt)

    // ═══ TIER E — Resistências e utilidade ═══
    res_general: 8,    // Resistência geral — aplica aos 5 elementos (~4× single)
    wisdom: 2,         // Sabedoria — +1% XP/pt, sem impacto direto em combate
    res_neutral: 2,    // Resistência neutro (~0.5% redução/pt a baixos valores)
    res_water: 2,      // Resistência água
    res_earth: 2,      // Resistência terra
    res_fire: 2,       // Resistência fogo
    res_air: 2,        // Resistência ar
    initiative: 2,     // Iniciativa — ordem de turnos, menor impacto

    // ═══ TIER F — Base ═══
    pv: 1              // Vida — +1 HP de ~150+ é mínimo (base de comparação)
};

// ========== SISTEMA DE STATS PRIMÁRIOS (PA/PM/PE/Alcance/Invocação) ==========
// Estes stats NÃO contam no orçamento de pontos — são grátis mas CONTROLADOS.
//
// REGRAS OBRIGATÓRIAS:
// - Toda BOTA e PEITORAL deve ter pm:1
// - Todo AMULETO e CAPA deve ter pa:1
// - Todo item ÉPICO deve ter pelo menos 1 stat primário (PA ou PM)
// - Todo item LENDÁRIO deve ter pelo menos 1 stat primário (PA ou PM)
// - Se o slot já tem mandatório, épico/lendário adicionam OUTRO stat primário
//
// PA/PM são obrigatórios em qualquer nível. PE/range/invocation mantêm nível mínimo.

const STATS_PRIMARIOS = {
    pa: {
        nome: 'Pontos de Ação',
        slotsPermitidos: ['amulet', 'weapon', 'cape'],
        slotsMandatorios: ['amulet', 'cape'],       // Todo amuleto e capa DEVE ter pa:1
        nivelMinimo: 1,                               // Obrigatório em todos os níveis
        maxPorItem: 1
    },
    pm: {
        nome: 'Pontos de Movimento',
        slotsPermitidos: ['boots', 'cape', 'chest'],
        slotsMandatorios: ['boots', 'chest'],        // Toda bota e peitoral DEVE ter pm:1
        nivelMinimo: 1,                               // Obrigatório em todos os níveis
        maxPorItem: 1
    },
    pe:         { nome: 'Pontos de Energia',  slotsPermitidos: ['weapon', 'amulet'],  nivelMinimo: 8,  maxPorItem: 1 },
    range:      { nome: 'Alcance',            slotsPermitidos: ['amulet', 'weapon'],  nivelMinimo: 10, maxPorItem: 1 },
    invocation: { nome: 'Invocação',          slotsPermitidos: ['amulet', 'ring'],    nivelMinimo: 15, maxPorItem: 1 }
};

// Bônus de raridade: stats primários EXTRAS em qualquer slot
// Épico/Lendário DEVEM ter pelo menos 1 PA ou PM.
// Se o slot já tem mandatório, o bônus épico/lendário adiciona OUTRO.
const BONUS_RARIDADE_PRIMARIOS = {
    comum: 0, incomum: 0, raro: 0,
    epico: 1,     // DEVE ter 1 stat primário extra (PA ou PM em qualquer slot)
    lendario: 2   // DEVE ter 1-2 stats primários extras em qualquer slot
};

// Orçamento de pontos por nível do item
// Fórmula: (base + nível × porNível) × multRaridade × multSlot
// Raridade aplica um multiplicador suave sobre a mesma base
function calcularOrcamentoPontos(nivel, raridadeId, slot) {
    const PONTOS_BASE = 20;
    const PONTOS_POR_NIVEL = 5;

    // Multiplicador de raridade (diferença suave, não exponencial)
    const MULT_RARIDADE = {
        comum:    1.00,
        incomum:  1.15,   // +15%
        raro:     1.35,   // +35%
        epico:    1.60,   // +60%
        lendario: 2.00    // +100%
    };

    const multRar = MULT_RARIDADE[raridadeId] || MULT_RARIDADE.comum;
    let orcamento = (PONTOS_BASE + (nivel * PONTOS_POR_NIVEL)) * multRar;

    // Aplica multiplicador de slot se fornecido
    if (slot) {
        const slotKey = slot.startsWith('ring') ? 'ring' : slot;
        const multSlot = MULTIPLICADOR_SLOT[slotKey] || 1.0;
        orcamento *= multSlot;
    }

    return Math.floor(orcamento);
}

// Aliases para nomes alternativos de atributos
const ATTR_ALIASES = { critical: 'critico' };

// Calcula quantos pontos um item está usando
function calcularPontosItem(item) {
    let pontosUsados = 0;

    if (item.attributes) {
        for (let attr in item.attributes) {
            // Stats primários (PA/PM/PE/range/invocation) são grátis — não contam
            if (STATS_PRIMARIOS[attr]) continue;

            const valor = item.attributes[attr];
            const key = ATTR_ALIASES[attr] || attr;
            const peso = PESO_ATRIBUTOS[key] || 1;
            pontosUsados += valor * peso;
        }
    }

    // Dano de arma também conta pontos
    if (item.ability && item.ability.damage) {
        const danoMedio = (item.ability.damage.min + item.ability.damage.max) / 2;
        pontosUsados += danoMedio * 2; // Dano vale 2 pontos por unidade
    }

    return Math.floor(pontosUsados);
}

// Valida se stats primários (PA/PM/PE/range/invocation) seguem as regras
function validarStatsPrimarios(item) {
    const erros = [];
    const avisos = [];
    const nivel = item.nivelRequerido || 1;
    const raridade = item.rarity || 'comum';
    const slot = item.slot;
    const slotKey = slot && slot.startsWith('ring') ? 'ring' : slot;

    const bonusLivres = BONUS_RARIDADE_PRIMARIOS[raridade] || 0;
    let bonusUsados = 0;

    // 1. Verifica stats primários presentes
    if (item.attributes) {
        for (let attr in item.attributes) {
            const config = STATS_PRIMARIOS[attr];
            if (!config) continue;

            const valor = item.attributes[attr];

            // Verifica nível mínimo
            if (nivel < config.nivelMinimo) {
                erros.push(`${config.nome}: requer nível ${config.nivelMinimo}, item é nível ${nivel}`);
            }

            // Verifica se slot é permitido
            const slotPermitido = config.slotsPermitidos.includes(slotKey);

            if (slotPermitido) {
                if (valor > config.maxPorItem) {
                    const excedente = valor - config.maxPorItem;
                    bonusUsados += excedente;
                    if (bonusUsados > bonusLivres) {
                        erros.push(`${config.nome}: ${valor} excede máx ${config.maxPorItem} (${excedente} bônus necessários, ${bonusLivres} disponíveis)`);
                    } else {
                        avisos.push(`${config.nome}: ${valor} (${config.maxPorItem} base + ${excedente} bônus ${raridade})`);
                    }
                }
            } else {
                bonusUsados += valor;
                if (bonusUsados > bonusLivres) {
                    erros.push(`${config.nome} no slot '${slot}': não permitido (slots: ${config.slotsPermitidos.join(', ')}). ` +
                               `Requer raridade épico/lendário (bônus usados: ${bonusUsados}/${bonusLivres})`);
                } else {
                    avisos.push(`${config.nome} no slot '${slot}': bônus ${raridade} (${bonusUsados}/${bonusLivres})`);
                }
            }
        }
    }

    // 2. Verifica slots MANDATÓRIOS — item no slot obrigatório DEVE ter o stat
    //    Exceções raras são permitidas SE o item compensa com mais stats (aviso, não erro)
    for (let attr in STATS_PRIMARIOS) {
        const config = STATS_PRIMARIOS[attr];
        if (!config.slotsMandatorios) continue;
        if (!config.slotsMandatorios.includes(slotKey)) continue;

        const valor = (item.attributes && item.attributes[attr]) || 0;
        if (valor < 1) {
            avisos.push(`⚠️ ${config.nome}: obrigatório no slot '${slot}' mas ausente — item deve compensar com mais stats`);
        }
    }

    // 3. Verifica regra épico/lendário: DEVE ter pelo menos 1 PA ou PM
    if (raridade === 'epico' || raridade === 'lendario') {
        const temPA = (item.attributes && item.attributes.pa) || 0;
        const temPM = (item.attributes && item.attributes.pm) || 0;
        if (temPA < 1 && temPM < 1) {
            erros.push(`Item ${raridade} DEVE ter pelo menos pa:1 ou pm:1`);
        }
    }

    return {
        valido: erros.length === 0,
        erros: erros,
        avisos: avisos,
        bonusUsados: bonusUsados,
        bonusDisponiveis: bonusLivres
    };
}

// Valida se item está balanceado (retorna info de debug)
function validarBalanceamento(item) {
    const nivel = item.nivelRequerido || 1;
    const raridade = item.rarity || 'comum';

    const orcamento = calcularOrcamentoPontos(nivel, raridade, item.slot);
    const usado = calcularPontosItem(item);
    const sobra = orcamento - usado;
    const percentual = Math.floor((usado / orcamento) * 100);

    // Valida stats primários separadamente
    const primarios = validarStatsPrimarios(item);

    return {
        orcamento: orcamento,
        usado: usado,
        sobra: sobra,
        percentual: percentual,
        balanceado: usado <= orcamento && usado >= (orcamento * 0.7) && primarios.valido,
        status: !primarios.valido ? '⚠️ STATS PRIMÁRIOS INVÁLIDOS' :
                usado > orcamento ? '⚠️ ACIMA DO ORÇAMENTO' :
                usado < (orcamento * 0.7) ? '⚠️ MUITO FRACO' :
                '✅ BALANCEADO',
        primarios: primarios
    };
}

// Função auxiliar para mostrar balanceamento no console (para desenvolvedores)
function debugBalanceamento(item) {
    const info = validarBalanceamento(item);
    console.log(`📊 ${item.name} (Nv${item.nivelRequerido || 1} ${item.rarity || 'comum'})`);
    console.log(`   Orçamento: ${info.orcamento} pts | Usado: ${info.usado} pts | Sobra: ${info.sobra} pts`);
    console.log(`   Utilização: ${info.percentual}% ${info.status}`);
    if (info.primarios && info.primarios.erros.length > 0) {
        info.primarios.erros.forEach(e => console.log(`   ❌ ${e}`));
    }
    if (info.primarios && info.primarios.avisos.length > 0) {
        info.primarios.avisos.forEach(a => console.log(`   ⚡ ${a}`));
    }
    return info;
}

// Mostra pontos detalhados de cada atributo do item (para criação de itens)
function mostrarPontosItem(item) {
    const nivel = item.nivelRequerido || 1;
    const raridade = item.rarity || 'comum';
    const orcamento = calcularOrcamentoPontos(nivel, raridade, item.slot);

    console.log(`\n═══════════════════════════════════════════`);
    console.log(`📋 ${item.name || 'Item sem nome'}`);
    console.log(`   Nível: ${nivel} | Raridade: ${raridade.toUpperCase()}${item.slot ? ' | Slot: ' + item.slot : ''}`);
    console.log(`═══════════════════════════════════════════`);

    let total = 0;

    const NOMES_ATRIBUTOS = {
        pv: 'Vida (PV)', pa: 'Pontos de Ação', pm: 'Pontos de Movimento',
        pe: 'Pontos de Energia', strength: 'Força', intelligence: 'Inteligência',
        agility: 'Agilidade', wisdom: 'Sabedoria', luck: 'Sorte',
        dodge: 'Esquiva', block: 'Bloqueio', critico: 'Crítico', critical: 'Crítico',
        parada: 'Parada', initiative: 'Iniciativa', range: 'Alcance', invocation: 'Invocação',
        dmg_geral: 'Dano% Geral', dmg_elemental: 'Dano% Elemental',
        dmg_neutral: 'Dano% Neutro', dmg_water: 'Dano% Água', dmg_earth: 'Dano% Terra',
        dmg_fire: 'Dano% Fogo', dmg_air: 'Dano% Ar', res_general: 'Resist Geral',
        res_neutral: 'Resist Neutro', res_water: 'Resist Água', res_earth: 'Resist Terra',
        res_fire: 'Resist Fogo', res_air: 'Resist Ar'
    };

    const slotKey = item.slot && item.slot.startsWith('ring') ? 'ring' : item.slot;

    // Mostra stats primários (grátis)
    if (item.attributes) {
        const primKeys = Object.keys(item.attributes).filter(a => STATS_PRIMARIOS[a]);
        if (primKeys.length > 0) {
            console.log(`\n⭐ STATS PRIMÁRIOS (grátis — não contam no orçamento):`);
            for (let attr of primKeys) {
                const valor = item.attributes[attr];
                const config = STATS_PRIMARIOS[attr];
                const permitido = config.slotsPermitidos.includes(slotKey);
                const tag = permitido ? '✅ slot permitido' : `⚡ bônus ${raridade}`;
                console.log(`   ${config.nome}: +${valor} — ${tag}`);
            }
        }
    }

    // Mostra atributos secundários (contam no orçamento)
    if (item.attributes && Object.keys(item.attributes).length > 0) {
        console.log(`\n🎯 ATRIBUTOS (orçamento):`);
        for (let attr in item.attributes) {
            if (STATS_PRIMARIOS[attr]) continue; // já mostrado acima

            const valor = item.attributes[attr];
            const key = ATTR_ALIASES[attr] || attr;
            const peso = PESO_ATRIBUTOS[key] || 1;
            const pontos = valor * peso;
            total += pontos;

            const nomeAttr = NOMES_ATRIBUTOS[attr] || attr;
            console.log(`   ${nomeAttr}: ${valor} × ${peso} = ${pontos} pts`);
        }
    }

    // Mostra dano (se for arma)
    if (item.ability && item.ability.damage) {
        console.log(`\n⚔️ DANO DA ARMA:`);
        const danoMin = item.ability.damage.min;
        const danoMax = item.ability.damage.max;
        const danoMedio = (danoMin + danoMax) / 2;
        const pontosDano = Math.floor(danoMedio * 2);
        total += pontosDano;

        console.log(`   ${danoMin}-${danoMax} (média ${danoMedio}) × 2 = ${pontosDano} pts`);
        console.log(`   Elemento: ${item.ability.element || 'none'}`);
        console.log(`   Alcance: ${item.ability.minRange || 1}-${item.ability.maxRange || 1}`);
    }

    // Resumo final
    console.log(`\n═══════════════════════════════════════════`);
    console.log(`📊 RESUMO:`);
    console.log(`   Total usado: ${total} pts`);
    console.log(`   Orçamento: ${orcamento} pts`);
    console.log(`   Sobra: ${orcamento - total} pts`);

    const percentual = Math.floor((total / orcamento) * 100);
    const barraCheia = Math.floor(percentual / 5);
    const barraVazia = 20 - barraCheia;
    const barra = '█'.repeat(barraCheia) + '░'.repeat(barraVazia);

    let status;
    let cor;
    if (total > orcamento) {
        status = '⚠️ ACIMA DO ORÇAMENTO!';
        cor = '🔴';
    } else if (total < orcamento * 0.7) {
        status = '⚠️ MUITO FRACO';
        cor = '🟡';
    } else {
        status = '✅ BALANCEADO';
        cor = '🟢';
    }

    console.log(`   ${cor} ${barra} ${percentual}%`);
    console.log(`   ${status}`);
    console.log(`═══════════════════════════════════════════\n`);

    return {
        total: total,
        orcamento: orcamento,
        sobra: orcamento - total,
        percentual: percentual,
        status: status
    };
}

// ========== SISTEMA DE GERAÇÃO DE VARIANTES ==========

// Gera 3 variantes de raridade: comum, incomum, raro
// Épicos e lendários devem ser criados manualmente como itens únicos
function gerarVariantes3Niveis(itemBase, opcoes = {}) {
    const raridades = ['comum', 'incomum', 'raro'];
    const variantes = [];

    const nivelBase = opcoes.nivelBase || 1;
    const incrementoNivel = opcoes.incrementoNivel || 10;
    const sufixos = opcoes.sufixos || {
        comum: '',
        incomum: 'Aprimorado',
        raro: 'Superior'
    };

    raridades.forEach((raridadeId, index) => {
        const raridade = getRaridade(raridadeId);
        const mult = raridade.multiplicadorAtributos;

        // Cria cópia profunda do item base
        const variante = JSON.parse(JSON.stringify(itemBase));

        // ID e nome
        variante.id = `${itemBase.id}_${raridadeId}`;
        const sufixo = sufixos[raridadeId];
        variante.name = sufixo ? `${itemBase.name} ${sufixo}` : itemBase.name;

        // Raridade
        variante.rarity = raridadeId;

        // Atributos
        if (variante.attributes) {
            for (let attr in variante.attributes) {
                variante.attributes[attr] = Math.floor(itemBase.attributes[attr] * mult);
            }
        }

        // Dano (armas)
        if (variante.ability && variante.ability.damage) {
            variante.ability.damage.min = Math.floor(itemBase.ability.damage.min * mult);
            variante.ability.damage.max = Math.floor(itemBase.ability.damage.max * mult);
        }

        // Nível requerido
        variante.nivelRequerido = nivelBase + (index * incrementoNivel);

        // CatalogId
        if (variante.catalogId) {
            const baseCode = variante.catalogId.slice(0, -2);
            variante.catalogId = baseCode + String(index + 1).padStart(2, '0');
        }

        variantes.push(variante);
    });

    return variantes;
}

// Gera 3 variantes de anéis com multiplicador reduzido (30%)
// Anéis dão menos atributos porque são 10 slots
function gerarVariantesAnel(itemBase, opcoes = {}) {
    const MULTIPLICADOR_ANEL = 0.3;

    // Cria cópia do item base com atributos reduzidos
    const itemBaseAnel = JSON.parse(JSON.stringify(itemBase));
    if (itemBaseAnel.attributes) {
        for (let attr in itemBaseAnel.attributes) {
            itemBaseAnel.attributes[attr] = Math.max(1,
                Math.floor(itemBaseAnel.attributes[attr] * MULTIPLICADOR_ANEL));
        }
    }

    return gerarVariantes3Niveis(itemBaseAnel, opcoes);
}

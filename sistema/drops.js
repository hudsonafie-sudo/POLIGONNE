// ========== SISTEMA DE DROPS ==========
// Drops de monstro definidos em dados/monstros.js (campo drops[])
// A chance real = chance_base × multiplicador_raridade × (1 + bonus_sorte + bonus_prospecção + bonus_missão)
// Equipamentos são MUITO mais difíceis de dropar que recursos

// ─── Multiplicadores de Drop por Raridade ────────────────────
// Aplicados sobre a chance BASE definida no monstro
// Quanto maior a raridade, menor o multiplicador

const DROP_RARITY_MULT = {
    // Recursos (materiais, drops de monstro)
    resource: {
        comum:    0.50,   // 60% base → 30% real
        incomum:  0.25,   // 25% base → 6.25% real
        raro:     0.18,   // 5% base  → 0.9% real
        epico:    0.05,   // 3% base  → 0.15% real
        lendario: 0.01    // 2% base  → 0.02% real
    },
    // Equipamentos (armas, armaduras, acessórios)
    equipment: {
        comum:    0.40,   // 30% base → 12% real
        incomum:  0.15,   // 15% base → 2.25% real
        raro:     0.06,   // 8% base  → 0.48% real
        epico:    0.015,  // 5% base  → 0.075% real
        lendario: 0.003   // 3% base  → 0.009% real
    },
    // Consumíveis (poções, comida)
    consumable: {
        comum:    0.60,
        incomum:  0.35,
        raro:     0.12,
        epico:    0.03,
        lendario: 0.005
    }
};

// Retorna o multiplicador de drop baseado na categoria e raridade do item
function getDropRarityMult(category, rarity) {
    var cat = category || 'resource';
    var rar = rarity || 'comum';
    // Normaliza categoria
    if (cat === 'equipment' || cat === 'weapon' || cat === 'armor') cat = 'equipment';
    else if (cat === 'consumable') cat = 'consumable';
    else cat = 'resource';
    var table = DROP_RARITY_MULT[cat];
    return (table && table[rar] !== undefined) ? table[rar] : 1.0;
}

// ─── Ouro por Combate ─────────────────────────────────────────

function calcularOuroCombate(monstrosDerotados) {
    let ouroTotal = 0;
    for (const monstro of monstrosDerotados) {
        const nivel = monstro.level || 1;
        const ouroMin = nivel * 5;
        const ouroMax = nivel * 15;
        ouroTotal += Math.floor(Math.random() * (ouroMax - ouroMin + 1)) + ouroMin;
    }
    return ouroTotal;
}

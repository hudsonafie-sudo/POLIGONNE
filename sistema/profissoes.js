// ============================================================
//  SISTEMA DE PROFISSÕES — profissoes.js
//  10 profissões: 5 coleta + 5 trabalho
//  Níveis 1-20, tiers T1/T2, refinamentos
// ============================================================

// ─── Definições das Profissões ──────────────────────────────
const PROFESSION_DEFINITIONS = {
    // ========== COLETA (Gathering) ==========
    mineiro: {
        id: 'mineiro', name: 'Mineiro', icon: '⛏️',
        type: 'coleta',
        description: 'Extrai minérios e pedras de veios minerais.',
        slots: [],
        refinamentos: ['refinado_lingote_ferro', 'refinado_lingote_cobre']
    },
    lenhador: {
        id: 'lenhador', name: 'Lenhador', icon: '🪓',
        type: 'coleta',
        description: 'Corta árvores e coleta troncos de madeira.',
        slots: [],
        refinamentos: ['refinado_tabua_pinho', 'refinado_tabua_carvalho']
    },
    pescador: {
        id: 'pescador', name: 'Pescador', icon: '🎣',
        type: 'coleta',
        description: 'Pesca em rios, lagos e mar.',
        slots: [],
        refinamentos: ['refinado_file_peixe', 'refinado_file_prateado']
    },
    fazendeiro: {
        id: 'fazendeiro', name: 'Fazendeiro', icon: '🌾',
        type: 'coleta',
        description: 'Planta e colhe cereais e fibras.',
        slots: [],
        refinamentos: ['refinado_farinha_trigo', 'refinado_fio_linho']
    },
    coletor: {
        id: 'coletor', name: 'Coletor', icon: '🧤',
        type: 'coleta',
        description: 'Extrai materiais extras de criaturas derrotadas.',
        slots: [],
        refinamentos: ['refinado_couro_tratado', 'refinado_tendao_reforcado'],
        special: 'post_combat'
    },

    // ========== TRABALHO (Crafting) ==========
    alfaiate: {
        id: 'alfaiate', name: 'Alfaiate', icon: '🧵',
        type: 'trabalho',
        description: 'Costura chapéus e capas com tecidos e fibras.',
        slots: ['helmet', 'cape']
    },
    ferreiro: {
        id: 'ferreiro', name: 'Ferreiro', icon: '🔨',
        type: 'trabalho',
        description: 'Forja armas, escudos e peitorais — tudo que envolve metal e força.',
        slots: ['weapon', 'weaponLeft', 'chest']
    },
    coureiro: {
        id: 'coureiro', name: 'Coureiro', icon: '👢',
        type: 'trabalho',
        description: 'Trabalha couro para criar botas, cintos e bolsas.',
        slots: ['boots', 'belt', 'bag']
    },
    joalheiro: {
        id: 'joalheiro', name: 'Joalheiro', icon: '💍',
        type: 'trabalho',
        description: 'Lapida gemas e cria anéis e amuletos.',
        slots: ['ring', 'amulet']
    },
    padeiro: {
        id: 'padeiro', name: 'Padeiro', icon: '🍞',
        type: 'trabalho',
        description: 'Prepara pães, tortas, poções e refeições que curam e fortalecem.',
        slots: []  // produz consumíveis, não equipamentos
    }
};


// ─── Tabela de XP ───────────────────────────────────────────
// XP acumulado necessário para alcançar cada nível (índice = nível - 1)
const PROFESSION_XP_TABLE = [
    0,      // Lv 1
    50,     // Lv 2
    120,    // Lv 3
    210,    // Lv 4
    500,    // Lv 5  (desbloqueia T2)
    700,    // Lv 6
    950,    // Lv 7
    1250,   // Lv 8
    1600,   // Lv 9
    2000,   // Lv 10 (receitas avançadas de T2)
    2500,   // Lv 11
    3100,   // Lv 12
    3800,   // Lv 13
    4600,   // Lv 14
    5000,   // Lv 15 (receitas especiais)
    5800,   // Lv 16
    6700,   // Lv 17
    7700,   // Lv 18
    8800,   // Lv 19
    10000   // Lv 20 (maestria)
];

// XP concedido por tipo de ação
const PROFESSION_XP_REWARDS = {
    coleta_t1: 5,
    coleta_t2: 15,
    refinamento_t1: 8,
    refinamento_t2: 20,
    craft_t1: 10,
    craft_t2: 30,
    coletor_drop: 8
};


// ─── Funções de Nível e XP ──────────────────────────────────

/**
 * Inicializa todas as profissões do jogador no nível 1 com 0 XP.
 * @returns {Object} Mapa professionId → { level, xp }
 */
function initPlayerProfessions() {
    const professions = {};
    for (const key of Object.keys(PROFESSION_DEFINITIONS)) {
        professions[key] = { level: 1, xp: 0 };
    }
    return professions;
}

/**
 * Adiciona XP a uma profissão e verifica level-up.
 * @param {Object} playerProfessions - Mapa de profissões do jogador
 * @param {string} professionId      - ID da profissão
 * @param {number} xpAmount          - Quantidade de XP a adicionar
 * @returns {{ leveled: boolean, newLevel: number|undefined }}
 */
function addProfessionXP(playerProfessions, professionId, xpAmount) {
    const prof = playerProfessions[professionId];
    if (!prof) return { leveled: false };

    prof.xp += xpAmount;
    let leveled = false;
    let newLevel = prof.level;

    while (prof.level < 20 && prof.xp >= PROFESSION_XP_TABLE[prof.level]) {
        prof.level++;
        leveled = true;
        newLevel = prof.level;
    }

    return { leveled, newLevel };
}

/**
 * Retorna o nível atual de uma profissão.
 */
function getProfessionLevel(playerProfessions, professionId) {
    return playerProfessions[professionId]?.level || 1;
}

/**
 * Retorna o tier desbloqueado para determinado nível de profissão.
 *   Lv 1-4  → T1
 *   Lv 5+   → T2
 */
function getProfessionTier(level) {
    if (level >= 5) return 2;
    return 1;
}

/**
 * Verifica se o jogador tem a profissão (sempre pode tentar craftar).
 * Mantida para compatibilidade — agora qualquer nível pode tentar.
 * Use calcularChanceSucessoCraft() para saber a chance real.
 */
function canCraftWithProfession(playerProfessions, professionId, requiredLevel) {
    return !!playerProfessions[professionId];
}

/**
 * Progresso percentual (0-100) em direção ao próximo nível.
 */
function getProfessionProgress(playerProfessions, professionId) {
    const prof = playerProfessions[professionId];
    if (!prof || prof.level >= 20) return 100;

    const currentXP = prof.xp;
    const currentLevelXP = PROFESSION_XP_TABLE[prof.level - 1];
    const nextLevelXP = PROFESSION_XP_TABLE[prof.level];

    return Math.floor(((currentXP - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100);
}


// ─── Craft: Chance de Sucesso ─────────────────────────────
// Abaixo do nível da receita: -15% por nível de gap (mínimo 10%)
// No nível ou acima: 100% de sucesso
// Na falha: materiais são consumidos (perdidos)

/**
 * Calcula a chance de sucesso de um craft baseada no gap de nível.
 * @param {number} nivelJogador - Nível atual da profissão do jogador
 * @param {number} nivelReceita - Nível requerido pela receita
 * @returns {number} Chance de sucesso em % (10-100)
 */
function calcularChanceSucessoCraft(nivelJogador, nivelReceita) {
    if (nivelJogador >= nivelReceita) return 100;
    const gap = nivelReceita - nivelJogador;
    return Math.max(10, 100 - (gap * 15));
}

/**
 * Tenta o craft baseado na chance de sucesso.
 * @param {number} nivelJogador - Nível atual da profissão
 * @param {number} nivelReceita - Nível requerido pela receita
 * @returns {boolean} true = sucesso, false = falha
 */
function rolarSucessoCraft(nivelJogador, nivelReceita) {
    const chance = calcularChanceSucessoCraft(nivelJogador, nivelReceita);
    if (chance >= 100) return true;
    return (Math.random() * 100) < chance;
}


// ─── Craft: XP com Decay ─────────────────────────────────
// No nível da receita ou abaixo: XP integral (recompensa pelo risco)
// Acima do nível: -10% por nível acima (mínimo 10% do XP base)

/**
 * Calcula o XP ganho ao craftar, com decay quando acima do nível.
 * @param {number} nivelJogador - Nível atual da profissão
 * @param {number} nivelReceita - Nível requerido pela receita
 * @param {number} xpBase       - XP base da receita (PROFESSION_XP_REWARDS)
 * @returns {number} XP ajustado (mínimo 1)
 */
function calcularXPCraft(nivelJogador, nivelReceita, xpBase) {
    if (nivelJogador <= nivelReceita) return xpBase;
    const gap = nivelJogador - nivelReceita;
    const multiplicador = Math.max(0.10, 1 - (gap * 0.10));
    return Math.max(1, Math.floor(xpBase * multiplicador));
}


// ─── Coletor: Drops Pós-Combate ─────────────────────────────

/**
 * Chamado após o combate para determinar drops bônus do Coletor.
 * Com 2 tiers de recurso: T1 (pele_crua) e T2 (tendao_flexivel).
 * Monstros T3 também dropam T2 mas com chance maior de x2.
 *
 * @param {Object} monstro      - Dados do monstro derrotado (precisa de .level)
 * @param {number} nivelColetor  - Nível atual da profissão Coletor
 * @returns {{ itemId: string, quantity: number }|null}
 */
function calcularDropsColetor(monstro, nivelColetor) {
    // Faixa do monstro baseada no nível
    const faixaMonstro = monstro.level <= 5 ? 1 : monstro.level <= 11 ? 2 : 3;
    // Nível mínimo de Coletor para cada faixa
    const nivelMinimo = [0, 1, 5, 8][faixaMonstro];

    // Verifica se o nível do Coletor é suficiente
    if (nivelColetor < nivelMinimo) return null;

    // Recurso bruto: T1 para monstros T1, T2 para monstros T2 e T3
    const recursoId = faixaMonstro === 1 ? 'coleta_pele_crua' : 'coleta_tendao_flexivel';

    // Chance base + bônus por sobre-nível
    const chanceBase = [0, 80, 70, 65][faixaMonstro];
    const bonusNivel = Math.min((nivelColetor - nivelMinimo) * 2, 15);
    const chanceFinal = Math.min(chanceBase + bonusNivel, 95);

    if (Math.random() * 100 < chanceFinal) {
        // Monstros T3 têm 40% de chance de drop duplo (vs 30% para T1/T2)
        const chanceDouble = faixaMonstro === 3 ? 0.4 : 0.3;
        const qtd = (nivelColetor >= nivelMinimo * 2 && Math.random() < chanceDouble) ? 2 : 1;
        return { itemId: recursoId, quantity: qtd };
    }
    return null;
}


// ─── Receitas de Refinamento ────────────────────────────────
// Matéria-prima → Material refinado (por profissão de coleta)
// 2 tiers: T1 (nível 1) e T2 (nível 5)

const REFINAMENTO_RECIPES = [
    // ── Mineiro ──
    { id: 'refinar_lingote_ferro', profissao: 'mineiro', nivelRequerido: 1, tier: 1,
      input: { itemId: 'coleta_minerio_ferro', quantidade: 3 },
      output: { itemId: 'refinado_lingote_ferro', quantidade: 1 } },
    { id: 'refinar_lingote_cobre', profissao: 'mineiro', nivelRequerido: 5, tier: 2,
      input: { itemId: 'coleta_minerio_cobre', quantidade: 3 },
      output: { itemId: 'refinado_lingote_cobre', quantidade: 1 } },

    // ── Lenhador ──
    { id: 'refinar_tabua_pinho', profissao: 'lenhador', nivelRequerido: 1, tier: 1,
      input: { itemId: 'coleta_tronco_pinho', quantidade: 3 },
      output: { itemId: 'refinado_tabua_pinho', quantidade: 1 } },
    { id: 'refinar_tabua_carvalho', profissao: 'lenhador', nivelRequerido: 5, tier: 2,
      input: { itemId: 'coleta_tronco_carvalho', quantidade: 3 },
      output: { itemId: 'refinado_tabua_carvalho', quantidade: 1 } },

    // ── Pescador ──
    { id: 'refinar_file_peixe', profissao: 'pescador', nivelRequerido: 1, tier: 1,
      input: { itemId: 'coleta_peixe_rio', quantidade: 3 },
      output: { itemId: 'refinado_file_peixe', quantidade: 1 } },
    { id: 'refinar_file_prateado', profissao: 'pescador', nivelRequerido: 5, tier: 2,
      input: { itemId: 'coleta_peixe_prateado', quantidade: 3 },
      output: { itemId: 'refinado_file_prateado', quantidade: 1 } },

    // ── Fazendeiro ──
    { id: 'refinar_farinha_trigo', profissao: 'fazendeiro', nivelRequerido: 1, tier: 1,
      input: { itemId: 'coleta_trigo', quantidade: 3 },
      output: { itemId: 'refinado_farinha_trigo', quantidade: 1 } },
    { id: 'refinar_fio_linho', profissao: 'fazendeiro', nivelRequerido: 5, tier: 2,
      input: { itemId: 'coleta_linho', quantidade: 3 },
      output: { itemId: 'refinado_fio_linho', quantidade: 1 } },

    // ── Coletor ──
    { id: 'refinar_couro_tratado', profissao: 'coletor', nivelRequerido: 1, tier: 1,
      input: { itemId: 'coleta_pele_crua', quantidade: 3 },
      output: { itemId: 'refinado_couro_tratado', quantidade: 1 } },
    { id: 'refinar_tendao_reforcado', profissao: 'coletor', nivelRequerido: 5, tier: 2,
      input: { itemId: 'coleta_tendao_flexivel', quantidade: 3 },
      output: { itemId: 'refinado_tendao_reforcado', quantidade: 1 } }
];


/**
 * Executa um refinamento: consome matéria-prima, produz material refinado, dá XP.
 * Depende de funções de inventário externas: contarItemNoInventario(), removerItemDoInventario()
 *
 * @param {string} receitaId         - ID da receita de refinamento
 * @param {Object} inventario        - Inventário do jogador
 * @param {Object} playerProfessions - Mapa de profissões do jogador
 * @returns {{ sucesso: boolean, erro?: string, outputId?: string, outputQtd?: number, xpGained?: number, levelUp?: number|null }}
 */
function realizarRefinamento(receitaId, inventario, playerProfessions) {
    const receita = REFINAMENTO_RECIPES.find(r => r.id === receitaId);
    if (!receita) return { sucesso: false, erro: 'Receita de refinamento não encontrada' };

    // Verificar nível da profissão
    const nivel = getProfessionLevel(playerProfessions, receita.profissao);
    if (nivel < receita.nivelRequerido) {
        return { sucesso: false, erro: `Nível ${receita.nivelRequerido} de ${receita.profissao} necessário` };
    }

    // Verificar materiais disponíveis
    const qtdDisponivel = contarItemNoInventario(inventario, receita.input.itemId);
    if (qtdDisponivel < receita.input.quantidade) {
        return { sucesso: false, erro: `Falta ${receita.input.quantidade - qtdDisponivel}x ${receita.input.itemId}` };
    }

    // Consumir materiais
    removerItemDoInventario(inventario, receita.input.itemId, receita.input.quantidade);

    // Conceder XP
    const xpKey = `refinamento_t${receita.tier}`;
    const xpGained = PROFESSION_XP_REWARDS[xpKey] || 0;
    const levelResult = addProfessionXP(playerProfessions, receita.profissao, xpGained);

    return {
        sucesso: true,
        outputId: receita.output.itemId,
        outputQtd: receita.output.quantidade,
        xpGained,
        levelUp: levelResult.leveled ? levelResult.newLevel : null
    };
}

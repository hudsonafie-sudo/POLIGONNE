// ========== RECURSOS DE COLETA — Profissões de Coleta ==========
// 20 recursos: 10 brutos (coletados do mundo) + 10 refinados (processados)
// Fluxo: Coletar bruto → Refinar (mesma profissão) → Usar em receita de craft
// Profissões: mineiro, lenhador, pescador, fazendeiro, coletor
// 2 tiers: T1 (nível 1) e T2 (nível 5)

const DB_RECURSOS_COLETA = [

    // ═══════════════════════════════════════════════════════════════
    //  SEÇÃO 1: RECURSOS BRUTOS (10 total — 5 profissões × 2 tiers)
    //  subcategory: 'coleta_bruto'
    // ═══════════════════════════════════════════════════════════════

    // === MINEIRO (T1/T2) ===
    {
        id: 'coleta_minerio_ferro',
        catalogId: '0303000001',
        name: 'Minério de Ferro',
        icon: '⛏️',
        svgIcon: { shape: 'mining-iron-ore', palette: 'iron' },
        category: 'resource',
        subcategory: 'coleta_bruto',
        profissao: 'mineiro',
        tier: 1,
        stackable: true,
        maxStack: 99
    },
    {
        id: 'coleta_minerio_cobre',
        catalogId: '0303000002',
        name: 'Minério de Cobre',
        icon: '🪙',
        svgIcon: { shape: 'mining-copper-ore', palette: 'copper' },
        category: 'resource',
        subcategory: 'coleta_bruto',
        profissao: 'mineiro',
        tier: 2,
        stackable: true,
        maxStack: 50,
        rarity: 'incomum'
    },

    // === LENHADOR (T1/T2) ===
    {
        id: 'coleta_tronco_pinho',
        catalogId: '0303000004',
        name: 'Tronco de Pinho',
        icon: '🪵',
        svgIcon: { shape: 'wood-pine-log', palette: 'bone' },
        category: 'resource',
        subcategory: 'coleta_bruto',
        profissao: 'lenhador',
        tier: 1,
        stackable: true,
        maxStack: 99
    },
    {
        id: 'coleta_tronco_carvalho',
        catalogId: '0303000005',
        name: 'Tronco de Carvalho',
        icon: '🌳',
        svgIcon: { shape: 'wood-oak-log', palette: 'ember' },
        category: 'resource',
        subcategory: 'coleta_bruto',
        profissao: 'lenhador',
        tier: 2,
        stackable: true,
        maxStack: 50,
        rarity: 'incomum'
    },

    // === PESCADOR (T1/T2) ===
    {
        id: 'coleta_peixe_rio',
        catalogId: '0303000007',
        name: 'Peixe do Rio',
        icon: '🐟',
        svgIcon: { shape: 'fish-river', palette: 'ice' },
        category: 'resource',
        subcategory: 'coleta_bruto',
        profissao: 'pescador',
        tier: 1,
        stackable: true,
        maxStack: 99
    },
    {
        id: 'coleta_peixe_prateado',
        catalogId: '0303000008',
        name: 'Peixe Prateado',
        icon: '🐠',
        svgIcon: { shape: 'fish-silver', palette: 'silver' },
        category: 'resource',
        subcategory: 'coleta_bruto',
        profissao: 'pescador',
        tier: 2,
        stackable: true,
        maxStack: 50,
        rarity: 'incomum'
    },

    // === FAZENDEIRO (T1/T2) ===
    {
        id: 'coleta_trigo',
        catalogId: '0303000010',
        name: 'Trigo',
        icon: '🌾',
        svgIcon: { shape: 'wheat-grain', palette: 'gold' },
        category: 'resource',
        subcategory: 'coleta_bruto',
        profissao: 'fazendeiro',
        tier: 1,
        stackable: true,
        maxStack: 99
    },
    {
        id: 'coleta_linho',
        catalogId: '0303000011',
        name: 'Linho',
        icon: '🌿',
        svgIcon: { shape: 'linen-plant', palette: 'nature' },
        category: 'resource',
        subcategory: 'coleta_bruto',
        profissao: 'fazendeiro',
        tier: 2,
        stackable: true,
        maxStack: 50,
        rarity: 'incomum'
    },

    // === COLETOR (T1/T2) ===
    {
        id: 'coleta_pele_crua',
        catalogId: '0303000013',
        name: 'Pele Crua',
        icon: '🟫',
        svgIcon: { shape: 'raw-hide', palette: 'ember' },
        category: 'resource',
        subcategory: 'coleta_bruto',
        profissao: 'coletor',
        tier: 1,
        stackable: true,
        maxStack: 99
    },
    {
        id: 'coleta_tendao_flexivel',
        catalogId: '0303000014',
        name: 'Tendão Flexível',
        icon: '🦴',
        svgIcon: { shape: 'raw-tendon', palette: 'bone' },
        category: 'resource',
        subcategory: 'coleta_bruto',
        profissao: 'coletor',
        tier: 2,
        stackable: true,
        maxStack: 50,
        rarity: 'incomum'
    },

    // ═══════════════════════════════════════════════════════════════
    //  SEÇÃO 2: RECURSOS REFINADOS (10 total — 5 profissões × 2 tiers)
    //  subcategory: 'coleta_refinado'
    // ═══════════════════════════════════════════════════════════════

    // === MINEIRO — Refinados (T1/T2) ===
    {
        id: 'refinado_lingote_ferro',
        catalogId: '0303000016',
        name: 'Lingote de Ferro',
        icon: '🔩',
        svgIcon: { shape: 'iron-ingot', palette: 'iron' },
        category: 'resource',
        subcategory: 'coleta_refinado',
        profissao: 'mineiro',
        tier: 1,
        stackable: true,
        maxStack: 99
    },
    {
        id: 'refinado_lingote_cobre',
        catalogId: '0303000017',
        name: 'Lingote de Cobre',
        icon: '🥉',
        svgIcon: { shape: 'copper-ingot', palette: 'copper' },
        category: 'resource',
        subcategory: 'coleta_refinado',
        profissao: 'mineiro',
        tier: 2,
        stackable: true,
        maxStack: 50,
        rarity: 'incomum'
    },

    // === LENHADOR — Refinados (T1/T2) ===
    {
        id: 'refinado_tabua_pinho',
        catalogId: '0303000019',
        name: 'Tábua de Pinho',
        icon: '🪵',
        svgIcon: { shape: 'pine-plank', palette: 'bone' },
        category: 'resource',
        subcategory: 'coleta_refinado',
        profissao: 'lenhador',
        tier: 1,
        stackable: true,
        maxStack: 99
    },
    {
        id: 'refinado_tabua_carvalho',
        catalogId: '0303000020',
        name: 'Tábua de Carvalho',
        icon: '🪵',
        svgIcon: { shape: 'oak-plank', palette: 'ember' },
        category: 'resource',
        subcategory: 'coleta_refinado',
        profissao: 'lenhador',
        tier: 2,
        stackable: true,
        maxStack: 50,
        rarity: 'incomum'
    },

    // === PESCADOR — Refinados (T1/T2) ===
    {
        id: 'refinado_file_peixe',
        catalogId: '0303000022',
        name: 'Filé de Peixe',
        icon: '🍣',
        svgIcon: { shape: 'fish-fillet', palette: 'ice' },
        category: 'resource',
        subcategory: 'coleta_refinado',
        profissao: 'pescador',
        tier: 1,
        stackable: true,
        maxStack: 99
    },
    {
        id: 'refinado_file_prateado',
        catalogId: '0303000023',
        name: 'Filé Prateado',
        icon: '🍣',
        svgIcon: { shape: 'fish-fillet-silver', palette: 'silver' },
        category: 'resource',
        subcategory: 'coleta_refinado',
        profissao: 'pescador',
        tier: 2,
        stackable: true,
        maxStack: 50,
        rarity: 'incomum'
    },

    // === FAZENDEIRO — Refinados (T1/T2) ===
    {
        id: 'refinado_farinha_trigo',
        catalogId: '0303000025',
        name: 'Farinha de Trigo',
        icon: '🧁',
        svgIcon: { shape: 'wheat-flour', palette: 'bone' },
        category: 'resource',
        subcategory: 'coleta_refinado',
        profissao: 'fazendeiro',
        tier: 1,
        stackable: true,
        maxStack: 99
    },
    {
        id: 'refinado_fio_linho',
        catalogId: '0303000026',
        name: 'Fio de Linho',
        icon: '🧵',
        svgIcon: { shape: 'linen-thread', palette: 'nature' },
        category: 'resource',
        subcategory: 'coleta_refinado',
        profissao: 'fazendeiro',
        tier: 2,
        stackable: true,
        maxStack: 50,
        rarity: 'incomum'
    },

    // === COLETOR — Refinados (T1/T2) ===
    {
        id: 'refinado_couro_tratado',
        catalogId: '0303000028',
        name: 'Couro Tratado',
        icon: '🎒',
        svgIcon: { shape: 'treated-leather', palette: 'ember' },
        category: 'resource',
        subcategory: 'coleta_refinado',
        profissao: 'coletor',
        tier: 1,
        stackable: true,
        maxStack: 99
    },
    {
        id: 'refinado_tendao_reforcado',
        catalogId: '0303000029',
        name: 'Tendão Reforçado',
        icon: '🦴',
        svgIcon: { shape: 'reinforced-tendon', palette: 'iron' },
        category: 'resource',
        subcategory: 'coleta_refinado',
        profissao: 'coletor',
        tier: 2,
        stackable: true,
        maxStack: 50,
        rarity: 'incomum'
    }
];

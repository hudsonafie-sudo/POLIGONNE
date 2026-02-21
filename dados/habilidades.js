// ========== BANCO DE DADOS: HABILIDADES / FEITIÇOS ==========
// Feitiços que o personagem pode usar em combate.
// Diferente das armas, estes feitiços estão sempre disponíveis.
//
// Campos:
//   spellType  - 'active' (precisa usar) ou 'passive' (ativa ao iniciar combate)
//   castType   - 'targeted' (precisa de alvo) ou 'self' (auto-cast)
//   targetType - 'enemy', 'ally', 'both', 'none'
//   paCost / pmCost / peCost - custos
//   minRange / maxRange - alcance (0-30)
//   rangeShape - 'cross','circle','line','diagonal','star'
//   aoeType    - 'single' (alvo único) ou 'zone' (área)
//   zoneCells  - [{dx,dy},...] offsets da zona (se aoeType='zone')
//   damage     - { min, max, stat } ou null
//   element    - 'none','fire','water','air','earth'
//   pushPull   - null ou { type:'push'|'pull', distance: N }
//   passiveEffect - null ou { type, stat, element, value }
//   hotbarSlot - slot na barra (0-9), -1 para passivos

const DB_HABILIDADES = [
    // === ATIVOS - ALVO ÚNICO ===
    {
        id: 'rajada_arcana',
        catalogId: '0601000001',
        name: 'Rajada Arcana',
        icon: '🔮',
        spellType: 'active',
        castType: 'targeted',
        targetType: 'enemy',
        paCost: 3, pmCost: 0, peCost: 0,
        minRange: 1, maxRange: 2,
        rangeShape: 'circle',
        aoeType: 'single',
        zoneCells: [],
        damage: { min: 8, max: 12, stat: 'intelligence' },
        element: 'none',
        pushPull: null,
        passiveEffect: null,
        hotbarSlot: 1
    },
    {
        id: 'bola_de_fogo',
        catalogId: '0601000002',
        name: 'Bola de Fogo',
        icon: '🔥',
        spellType: 'active',
        castType: 'targeted',
        targetType: 'enemy',
        paCost: 4, pmCost: 0, peCost: 0,
        minRange: 1, maxRange: 3,
        rangeShape: 'circle',
        aoeType: 'single',
        zoneCells: [],
        damage: { min: 12, max: 18, stat: 'intelligence' },
        element: 'fire',
        pushPull: null,
        passiveEffect: null,
        hotbarSlot: 2
    },
    {
        id: 'sopro_gelado',
        catalogId: '0601000003',
        name: 'Sopro Gelado',
        icon: '❄️',
        spellType: 'active',
        castType: 'targeted',
        targetType: 'enemy',
        paCost: 3, pmCost: 0, peCost: 1,
        minRange: 1, maxRange: 2,
        rangeShape: 'cross',
        aoeType: 'single',
        zoneCells: [],
        damage: { min: 6, max: 14, stat: 'intelligence' },
        element: 'water',
        pushPull: null,
        passiveEffect: null,
        hotbarSlot: 3
    },
    {
        id: 'rajada_vento',
        catalogId: '0601000004',
        name: 'Rajada de Vento',
        icon: '🌪️',
        spellType: 'active',
        castType: 'targeted',
        targetType: 'enemy',
        paCost: 2, pmCost: 1, peCost: 0,
        minRange: 1, maxRange: 2,
        rangeShape: 'circle',
        aoeType: 'single',
        zoneCells: [],
        damage: { min: 5, max: 10, stat: 'agility' },
        element: 'air',
        pushPull: { type: 'push', distance: 1 },
        passiveEffect: null,
        hotbarSlot: 4
    },
    {
        id: 'tremor',
        catalogId: '0601000005',
        name: 'Tremor',
        icon: '🌍',
        spellType: 'active',
        castType: 'targeted',
        targetType: 'enemy',
        paCost: 4, pmCost: 0, peCost: 2,
        minRange: 1, maxRange: 1,
        rangeShape: 'circle',
        aoeType: 'single',
        zoneCells: [],
        damage: { min: 15, max: 22, stat: 'strength' },
        element: 'earth',
        pushPull: null,
        passiveEffect: null,
        hotbarSlot: 5
    },

    // === ATIVOS - ZONA (AoE) ===
    // {
    //     id: 'explosao_flamejante',
    //     name: 'Explosão Flamejante',
    //     icon: '💥',
    //     spellType: 'active',
    //     castType: 'targeted',
    //     targetType: 'both',
    //     paCost: 5, pmCost: 0, peCost: 2,
    //     minRange: 2, maxRange: 4,
    //     rangeShape: 'cross',
    //     aoeType: 'zone',
    //     zoneCells: [{dx:0,dy:0},{dx:1,dy:0},{dx:-1,dy:0},{dx:0,dy:1},{dx:0,dy:-1}],
    //     damage: { min: 8, max: 14, stat: 'intelligence' },
    //     element: 'fire',
    //     pushPull: null,
    //     passiveEffect: null,
    //     hotbarSlot: 6
    // },

    // === PASSIVOS ===
    // {
    //     id: 'afinidade_flamejante',
    //     name: 'Afinidade Flamejante',
    //     icon: '🔥',
    //     spellType: 'passive',
    //     castType: 'self',
    //     targetType: 'none',
    //     paCost: 0, pmCost: 0, peCost: 0,
    //     minRange: 0, maxRange: 0,
    //     rangeShape: 'cross',
    //     aoeType: 'single',
    //     zoneCells: [],
    //     damage: null,
    //     element: 'fire',
    //     pushPull: null,
    //     passiveEffect: { type: 'damage_bonus', element: 'fire', value: 5 },
    //     hotbarSlot: -1
    // },
    // Cole o proximo item aqui
];

// ========== PASSIVOS GERAIS ==========
// Disponíveis para TODAS as classes. O jogador pode equipar na build.
// 15 passivos gerais divididos em categorias temáticas.
// catalogId prefixo: 0700 (passivos gerais)

const DB_PASSIVOS_GERAIS = [
    // === OFENSIVOS (5) ===
    {
        id: 'geral_passivo_poder_bruto',
        catalogId: '0700000001',
        name: 'Poder Bruto',
        icon: '💪',
        class: 'geral',
        element: 'none',
        spellType: 'passive',
        castType: 'self',
        targetType: 'none',
        passiveEffect: { damageBonus: 5 },
        description: '+5% dano causado.'
    },
    {
        id: 'geral_passivo_golpe_critico',
        catalogId: '0700000002',
        name: 'Golpe Crítico',
        icon: '⚡',
        class: 'geral',
        element: 'none',
        spellType: 'passive',
        castType: 'self',
        targetType: 'none',
        passiveEffect: { critico: 8 },
        description: '+8% chance de crítico.'
    },
    {
        id: 'geral_passivo_dano_critico',
        catalogId: '0700000003',
        name: 'Dano Crítico',
        icon: '🔥',
        class: 'geral',
        element: 'none',
        spellType: 'passive',
        castType: 'self',
        targetType: 'none',
        passiveEffect: { criticalDamageBonus: 25 },
        description: '+25% dano em acertos críticos.'
    },
    {
        id: 'geral_passivo_oportunista',
        catalogId: '0700000004',
        name: 'Oportunista',
        icon: '🗡️',
        class: 'geral',
        element: 'none',
        spellType: 'passive',
        castType: 'self',
        targetType: 'none',
        passiveEffect: {
            onKill: {
                enabled: true,
                effects: [{ type: 'stealPA', amount: 1 }]
            }
        },
        description: 'Ao matar um inimigo, ganha +1 PA.'
    },
    {
        id: 'geral_passivo_perfurar_armadura',
        catalogId: '0700000005',
        name: 'Perfurar Armadura',
        icon: '🔨',
        class: 'geral',
        element: 'none',
        spellType: 'passive',
        castType: 'self',
        targetType: 'none',
        passiveEffect: { bonusVsArmored: 15 },
        description: '+15% dano contra alvos com escudo.'
    },

    // === DEFENSIVOS (5) ===
    {
        id: 'geral_passivo_constituicao',
        catalogId: '0700000006',
        name: 'Constituição',
        icon: '❤️',
        class: 'geral',
        element: 'none',
        spellType: 'passive',
        castType: 'self',
        targetType: 'none',
        passiveEffect: { maxHpPercent: 8 },
        description: '+8% HP máximo.'
    },
    {
        id: 'geral_passivo_armadura_natural',
        catalogId: '0700000007',
        name: 'Armadura Natural',
        icon: '🛡️',
        class: 'geral',
        element: 'none',
        spellType: 'passive',
        castType: 'self',
        targetType: 'none',
        passiveEffect: { combatStartArmor: 6 },
        description: 'Começa combate com 6 de escudo.'
    },
    {
        id: 'geral_passivo_regeneracao',
        catalogId: '0700000008',
        name: 'Regeneração',
        icon: '💚',
        class: 'geral',
        element: 'none',
        spellType: 'passive',
        castType: 'self',
        targetType: 'none',
        passiveEffect: {
            onTurnStart: {
                enabled: true,
                effects: [{ type: 'heal', percent: 2 }]
            }
        },
        description: 'Regenera 2% HP no início de cada turno.'
    },
    {
        id: 'geral_passivo_bloqueio',
        catalogId: '0700000009',
        name: 'Bloqueio',
        icon: '🧱',
        class: 'geral',
        element: 'none',
        spellType: 'passive',
        castType: 'self',
        targetType: 'none',
        passiveEffect: { block: 8 },
        description: '+8% bloqueio.'
    },
    {
        id: 'geral_passivo_reducao_dano',
        catalogId: '0700000010',
        name: 'Redução de Dano',
        icon: '🪖',
        class: 'geral',
        element: 'none',
        spellType: 'passive',
        castType: 'self',
        targetType: 'none',
        passiveEffect: { damageReduction: 5 },
        description: '-5% dano recebido.'
    },

    // === UTILIDADE (5) ===
    {
        id: 'geral_passivo_mobilidade',
        catalogId: '0700000011',
        name: 'Mobilidade',
        icon: '🏃',
        class: 'geral',
        element: 'none',
        spellType: 'passive',
        castType: 'self',
        targetType: 'none',
        passiveEffect: { maxPm: 1 },
        description: '+1 PM máximo.'
    },
    {
        id: 'geral_passivo_iniciativa',
        catalogId: '0700000012',
        name: 'Iniciativa',
        icon: '⚡',
        class: 'geral',
        element: 'none',
        spellType: 'passive',
        castType: 'self',
        targetType: 'none',
        passiveEffect: { initiative: 20 },
        description: '+20 iniciativa (age primeiro no turno).'
    },
    {
        id: 'geral_passivo_alcance',
        catalogId: '0700000013',
        name: 'Alcance',
        icon: '🎯',
        class: 'geral',
        element: 'none',
        spellType: 'passive',
        castType: 'self',
        targetType: 'none',
        passiveEffect: { rangeBonus: 1 },
        description: '+1 de alcance em todos os feitiços.'
    },
    {
        id: 'geral_passivo_esquiva',
        catalogId: '0700000014',
        name: 'Esquiva',
        icon: '💨',
        class: 'geral',
        element: 'none',
        spellType: 'passive',
        castType: 'self',
        targetType: 'none',
        passiveEffect: { dodge: 8 },
        description: '+8% esquiva.'
    },
    {
        id: 'geral_passivo_resistencia_elemental',
        catalogId: '0700000015',
        name: 'Resistência Elemental',
        icon: '🌈',
        class: 'geral',
        element: 'none',
        spellType: 'passive',
        castType: 'self',
        targetType: 'none',
        passiveEffect: { allResistance: 4 },
        description: '+4 resistência a todos os elementos.'
    }
];

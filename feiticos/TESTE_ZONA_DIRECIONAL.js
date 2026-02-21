// ========== FEITIÇO DE TESTE - ZONA DIRECIONAL ==========
// Feitiço para testar sistema de zona direcional com push
// Adicione este arquivo no HTML APÓS os feitiços de classe

const DB_FEITICOS_TESTE_DIRECIONAL = [
    // ONDA DE CHOQUE - Empurra todos em linha
    {
        id: 'teste_onda_choque',
        catalogId: '9999000001',
        name: 'Onda de Choque (TESTE)',
        icon: '💥',
        class: 'teste',
        element: 'none',
        spellType: 'active',
        castType: 'targeted',
        targetType: 'enemy',
        paCost: 4,
        minRange: 2,
        maxRange: 6,
        rangeShape: 'line',  // Só pode mirar em linha
        aoeType: 'zone',
        zoneDirectional: true,  // ← ATIVA ZONA DIRECIONAL!

        // Zona para direções CARDINAIS (→ ↓ ← ↑)
        zoneCellsCardinal: [
            {dx:0, dy:0},  // Célula do alvo
            {dx:1, dy:0},  // 1 célula na direção
            {dx:2, dy:0},  // 2 células
            {dx:3, dy:0}   // 3 células
        ],

        // Zona para direções DIAGONAIS (↗ ↘ ↙ ↖)
        zoneCellsDiagonal: [
            {dx:0, dy:0},
            {dx:1, dy:1},
            {dx:2, dy:2},
            {dx:3, dy:3}
        ],

        // Zona para direções INTERMEDIÁRIAS (entre cardinal e diagonal)
        zoneCellsInterCardinal: [
            {dx:0, dy:0},
            {dx:1, dy:0},  // Mix de horizontal e vertical
            {dx:2, dy:1},
            {dx:3, dy:1}
        ],

        zoneEffects: {
            dmgCaster: false,
            dmgAlly: false,
            dmgEnemy: true,
            healCaster: false,
            healAlly: false,
            healEnemy: false,
            lifeSteal: false
        },

        damage: {
            min: 20,
            max: 30,
            stat: 'strength'
        },

        // PUSH em TODOS os alvos atingidos!
        pushPull: {
            type: 'push',
            distance: 2,
            applyToAll: true  // Empurra TODOS na zona, não só o alvo principal
        },

        cooldown: 3,
        description: 'TESTE: Onda em linha que empurra TODOS os alvos 2 células na direção do lançamento. Zona muda conforme direção!'
    },

    // CONE DE FOGO - Cone direcional
    {
        id: 'teste_cone_fogo',
        catalogId: '9999000002',
        name: 'Cone de Fogo (TESTE)',
        icon: '🔥',
        class: 'teste',
        element: 'fire',
        spellType: 'active',
        castType: 'targeted',
        targetType: 'enemy',
        paCost: 5,
        peCost: 1,
        minRange: 1,
        maxRange: 5,
        rangeShape: 'line',
        aoeType: 'zone',
        zoneDirectional: true,

        // Cone abrindo para CARDINAIS
        zoneCellsCardinal: [
            {dx:0, dy:0},   // Centro
            {dx:1, dy:0},   // Linha 1
            {dx:2, dy:-1},  // Linha 2 (abre)
            {dx:2, dy:0},
            {dx:2, dy:1},
            {dx:3, dy:-1},  // Linha 3 (abre mais)
            {dx:3, dy:0},
            {dx:3, dy:1}
        ],

        // Cone abrindo para DIAGONAIS
        zoneCellsDiagonal: [
            {dx:0, dy:0},
            {dx:1, dy:1},
            {dx:2, dy:1},
            {dx:2, dy:2},
            {dx:2, dy:3},
            {dx:3, dy:2},
            {dx:3, dy:3},
            {dx:3, dy:4}
        ],

        // Cone para INTERMEDIÁRIAS
        zoneCellsInterCardinal: [
            {dx:0, dy:0},
            {dx:1, dy:0},
            {dx:2, dy:0},
            {dx:2, dy:1},
            {dx:3, dy:1},
            {dx:3, dy:2}
        ],

        zoneEffects: {
            dmgEnemy: true
        },

        damage: {
            min: 30,
            max: 50,
            stat: 'intelligence'
        },

        cooldown: 4,
        description: 'TESTE: Cone de fogo que aponta na direção do lançamento. Dano em área crescente!'
    },

    // VARREDURA - Semicírculo na direção
    {
        id: 'teste_varredura',
        catalogId: '9999000003',
        name: 'Varredura (TESTE)',
        icon: '⚔️🌀',
        class: 'teste',
        element: 'none',
        spellType: 'active',
        castType: 'targeted',
        targetType: 'enemy',
        paCost: 4,
        minRange: 1,
        maxRange: 1,
        rangeShape: 'cross',
        aoeType: 'zone',
        zoneDirectional: true,

        // Varredura para CARDINAIS (3 células em arco)
        zoneCellsCardinal: [
            {dx:0, dy:0},
            {dx:1, dy:0},
            {dx:1, dy:-1},
            {dx:1, dy:1}
        ],

        // Varredura para DIAGONAIS
        zoneCellsDiagonal: [
            {dx:0, dy:0},
            {dx:1, dy:1},
            {dx:0, dy:1},
            {dx:1, dy:0}
        ],

        // Varredura para INTERMEDIÁRIAS
        zoneCellsInterCardinal: [
            {dx:0, dy:0},
            {dx:1, dy:0},
            {dx:1, dy:1},
            {dx:0, dy:1}
        ],

        zoneEffects: {
            dmgEnemy: true
        },

        damage: {
            min: 40,
            max: 60,
            stat: 'strength'
        },

        cooldown: 2,
        description: 'TESTE: Varredura em semicírculo na direção do alvo. Atinge 3-4 células ao redor!'
    }
];


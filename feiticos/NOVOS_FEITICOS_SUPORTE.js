// ========== FEITIÇOS ESPECIAIS - CURA + MOVIMENTO ==========
// Feitiços de suporte com efeitos de zona secundários
// Criado: 2026-02-11

const DB_FEITICOS_SUPORTE_MOVIMENTO = [
    // ========== 1. CURA + PUXAR INIMIGOS ==========
    {
        id: 'cura_magnetica',
        catalogId: '9998000001',
        name: 'Cura Magnética',
        icon: '🧲',
        class: 'clerigo',  // Clérigo
        element: 'water',
        spellType: 'active',
        castType: 'targeted',
        targetType: 'ally',  // Alvo: Aliado
        paCost: 5,
        peCost: 1,
        minRange: 4,
        maxRange: 6,
        rangeShape: 'circle',  // SEM linha de visão
        losRequired: false,

        // Alvo principal: CURA
        aoeType: 'single',
        healing: {
            min: 80,
            max: 120,
            stat: 'intelligence'
        },

        // Efeito secundário: PUXAR inimigos ao redor do alvo
        secondaryZone: {
            enabled: true,
            centerOnTarget: true,  // Zona centrada no ALVO curado
            cells: [
                // Círculo de 2 casas ao redor do alvo
                {dx:-2, dy:-2}, {dx:-1, dy:-2}, {dx:0, dy:-2}, {dx:1, dy:-2}, {dx:2, dy:-2},
                {dx:-2, dy:-1}, {dx:-1, dy:-1}, {dx:0, dy:-1}, {dx:1, dy:-1}, {dx:2, dy:-1},
                {dx:-2, dy:0},  {dx:-1, dy:0},  {dx:0, dy:0},  {dx:1, dy:0},  {dx:2, dy:0},
                {dx:-2, dy:1},  {dx:-1, dy:1},  {dx:0, dy:1},  {dx:1, dy:1},  {dx:2, dy:1},
                {dx:-2, dy:2},  {dx:-1, dy:2},  {dx:0, dy:2},  {dx:1, dy:2},  {dx:2, dy:2}
            ],
            effects: {
                pullEnemies: true,  // Apenas inimigos
                pullDistance: 2,
                pullTowardTarget: true  // Puxa EM DIREÇÃO ao alvo curado
            }
        },

        cooldown: 4,
        description: 'Cura um aliado (80-120). PUXA todos os inimigos em 2 casas AO REDOR DO ALVO para perto dele. Sem linha de visão.'
    },

    // ========== 2. CURA + EMPURRAR INIMIGOS ==========
    {
        id: 'cura_repulsora',
        catalogId: '9998000002',
        name: 'Cura Repulsora',
        icon: '💚',
        class: 'guardiao',  // Guardião
        element: 'water',
        spellType: 'active',
        castType: 'targeted',
        targetType: 'ally',  // Alvo: Aliado
        paCost: 5,
        peCost: 1,
        minRange: 4,
        maxRange: 6,
        rangeShape: 'circle',  // COM linha de visão
        losRequired: true,

        // Alvo principal: CURA
        aoeType: 'single',
        healing: {
            min: 80,
            max: 120,
            stat: 'intelligence'
        },

        // Efeito secundário: EMPURRAR inimigos ao redor do alvo
        secondaryZone: {
            enabled: true,
            centerOnTarget: true,  // Zona centrada no ALVO curado
            cells: [
                // Círculo de 2 casas ao redor do alvo
                {dx:-2, dy:-2}, {dx:-1, dy:-2}, {dx:0, dy:-2}, {dx:1, dy:-2}, {dx:2, dy:-2},
                {dx:-2, dy:-1}, {dx:-1, dy:-1}, {dx:0, dy:-1}, {dx:1, dy:-1}, {dx:2, dy:-1},
                {dx:-2, dy:0},  {dx:-1, dy:0},  {dx:0, dy:0},  {dx:1, dy:0},  {dx:2, dy:0},
                {dx:-2, dy:1},  {dx:-1, dy:1},  {dx:0, dy:1},  {dx:1, dy:1},  {dx:2, dy:1},
                {dx:-2, dy:2},  {dx:-1, dy:2},  {dx:0, dy:2},  {dx:1, dy:2},  {dx:2, dy:2}
            ],
            effects: {
                pushEnemies: true,  // Apenas inimigos
                pushDistance: 2,
                pushAwayFromTarget: true  // Empurra PARA LONGE do alvo curado
            }
        },

        cooldown: 4,
        description: 'Cura um aliado (80-120). EMPURRA todos os inimigos em 2 casas AO REDOR DO ALVO para longe dele. Requer linha de visão.'
    },

    // ========== 3. FEITIÇO DE SACRIFÍCIO (BERSERKER) ==========
    {
        id: 'sacrificio_divino',
        catalogId: '9998000003',
        name: 'Sacrifício Divino',
        icon: '🩸',
        class: 'berserker',
        element: 'none',
        spellType: 'active',
        castType: 'targeted',
        targetType: 'ally',  // Pode ser lançado em aliado ou em célula vazia
        paCost: 4,
        minRange: 1,
        maxRange: 5,
        rangeShape: 'circle',
        losRequired: false,

        // Zona de efeito
        aoeType: 'zone',
        zoneCells: [
            // Pequena zona 3x3 centrada no alvo
            {dx:-1, dy:-1}, {dx:0, dy:-1}, {dx:1, dy:-1},
            {dx:-1, dy:0},  {dx:0, dy:0},  {dx:1, dy:0},
            {dx:-1, dy:1},  {dx:0, dy:1},  {dx:1, dy:1}
        ],

        zoneEffects: {
            dmgCaster: false,
            dmgAlly: false,
            dmgEnemy: false,
            healCaster: false,
            healAlly: false,
            healEnemy: false
        },

        // Aplica status "Sacrifício" em aliados na zona
        advancedStatus: [
            {
                type: 'sacrificio',
                duration: 2,
                redirectTo: 'caster'  // Redireciona dano para o LANÇADOR
            }
        ],

        // Só afeta aliados (não inimigos, não o próprio caster)
        statusTarget: 'alliesOnly',

        cooldown: 5,
        description: 'Zona 3x3. Aliados na zona recebem "Sacrifício" por 2 turnos: todo dano que eles sofreriam é REDIRECIONADO para você. Você sofre o dano no lugar deles!'
    },

    // ========== 4. TROCA DE INIMIGOS ==========
    {
        id: 'troca_forcada',
        catalogId: '9998000004',
        name: 'Troca Forçada',
        icon: '🔄',
        class: 'none',  // Feitiço especial sem classe específica
        element: 'none',
        spellType: 'active',
        castType: 'targeted',
        targetType: 'enemy',
        paCost: 0,
        pmCost: 2,
        peCost: 1,
        minRange: 2,
        maxRange: 5,
        rangeShape: 'circle',
        losRequired: true,

        // Zona circular de 2 casas
        aoeType: 'zone',
        zoneCells: [
            // Círculo de 2 casas
            {dx:-2, dy:-2}, {dx:-1, dy:-2}, {dx:0, dy:-2}, {dx:1, dy:-2}, {dx:2, dy:-2},
            {dx:-2, dy:-1}, {dx:-1, dy:-1}, {dx:0, dy:-1}, {dx:1, dy:-1}, {dx:2, dy:-1},
            {dx:-2, dy:0},  {dx:-1, dy:0},  {dx:0, dy:0},  {dx:1, dy:0},  {dx:2, dy:0},
            {dx:-2, dy:1},  {dx:-1, dy:1},  {dx:0, dy:1},  {dx:1, dy:1},  {dx:2, dy:1},
            {dx:-2, dy:2},  {dx:-1, dy:2},  {dx:0, dy:2},  {dx:1, dy:2},  {dx:2, dy:2}
        ],

        zoneEffects: {
            dmgCaster: false,
            dmgAlly: false,
            dmgEnemy: false,
            healCaster: false,
            healAlly: false,
            healEnemy: false
        },

        // Efeito especial: troca posição de exatamente 2 inimigos
        effect: 'swapTwoTargets',
        requireExactTargets: 2,  // Só funciona se houver exatamente 2 inimigos na zona

        cooldown: 3,
        description: 'Zona 5x5. TROCA a posição de exatamente 2 inimigos na zona. Requer exatamente 2 alvos válidos. Linha de visão necessária.'
    }
];


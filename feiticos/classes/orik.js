// ========== FEITIÇOS DO ORIK ==========
// 26 feitiços: 15 elementais (3 elementos × 5) + 5 ativos + 5 passivos + 1 DOM
// RECALIBRADO para HP base 50

const DB_FEITICOS_ORIK = [
    // ===== FOGO (5 feitiços) =====
    {
        id: 'orik_espada_flamejante',
        catalogId: '0701000001',
        name: 'Espada Flamejante',
        icon: '⚔️',
        class: 'orik',
        element: 'fire',
        spellType: 'active',
        castType: 'targeted',
        needsTarget: false,
        paCost: 2,
        minRange: 1,
        maxRange: 4,
        rangeShape: 'circle',
        requiresLoS: false,
        aoeType: 'single',
        damage: { min: 4, max: 7 },
        effects: [
            { effectId: 'ardente', level: 1, target: 'enemy' }
        ],
        castsPerTurn: 5,
        castsPerTarget: 3,
        cooldown: 0,
        description: 'Golpe flamejante. Aplica Ardente no alvo por 2 turnos.'
    },
    {
        id: 'orik_golpe_incandescente',
        catalogId: '0701000002',
        name: 'Golpe Incandescente',
        icon: '🔥',
        class: 'orik',
        element: 'fire',
        spellType: 'active',
        castType: 'targeted',
        needsTarget: false,
        paCost: 4,
        minRange: 1,
        maxRange: 2,
        rangeShape: 'circle',
        aoeType: 'single',
        damage: { min: 11, max: 16 },
        consumesArdente: true,
        ardenteBonus: 20,
        castsPerTurn: 5,
        castsPerTarget: 3,
        cooldown: 0,
        description: 'Golpe poderoso de Fogo (1-2 células). Causa 11-16 de dano. Se o alvo tiver Ardente: consome e ganha +20% de dano.'
    },
    {
        id: 'orik_pilar_fogo',
        catalogId: '0701000003',
        name: 'Pilar de Fogo',
        icon: '🔱',
        class: 'orik',
        element: 'fire',
        spellType: 'active',
        castType: 'targeted',
        needsTarget: false,
        paCost: 4,
        minRange: 1,
        maxRange: 3,
        rangeShape: 'line',
        requiresLoS: true,
        aoeType: 'zone',
        zonePattern: 'perpendicular',
        zoneWidth: 1,
        zoneEffects: {
            dmgCaster: false,
            dmgAlly: false,
            dmgEnemy: true,
            healCaster: false,
            healAlly: false,
            healEnemy: false,
            lifeSteal: false
        },
        damage: { min: 8, max: 14 },
        groundArdente: true,
        castsPerTurn: 5,
        castsPerTarget: 3,
        cooldown: 0,
        description: 'Pilar de Fogo em 3 células perpendiculares (1-3 em linha, LOS). Causa 8-14 de dano. Células sem alvo ficam com Ardente no chão.'
    },
    {
        id: 'orik_ira_vulcao',
        catalogId: '0701000004',
        name: 'Ira do Vulcão',
        icon: '🌋',
        class: 'orik',
        element: 'fire',
        spellType: 'active',
        castType: 'targeted',
        needsTarget: false,
        paCost: 5,
        peCost: 1,
        minRange: 1,
        maxRange: 2,
        rangeShape: 'circle',
        aoeType: 'single',
        damage: { min: 16, max: 22 },
        bonusVsArmored: 10,
        consumesArdente: true,
        ardenteBonusVsArmored: 30,
        castsPerTurn: 5,
        castsPerTarget: 3,
        cooldown: 0,
        description: 'Golpe vulcânico de Fogo (1-2 células). Causa 16-22 de dano. +10% dano vs alvos com escudo. Se o alvo tiver Ardente: consome e +30% dano vs escudo.'
    },
    {
        id: 'orik_explosao_poder',
        catalogId: '0701000005',
        name: 'Explosão de Poder',
        icon: '💥',
        class: 'orik',
        element: 'fire',
        spellType: 'active',
        castType: 'self',
        targetType: 'both',
        paCost: 6,
        peCost: 2,
        minRange: 0,
        maxRange: 0,
        rangeShape: 'circle',
        aoeType: 'zone',
        zoneCells: [
            {dx: -1, dy: -1}, {dx: 0, dy: -1}, {dx: 1, dy: -1},
            {dx: -1, dy: 0}, {dx: 0, dy: 0}, {dx: 1, dy: 0},
            {dx: -1, dy: 1}, {dx: 0, dy: 1}, {dx: 1, dy: 1}
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
        damage: { min: 12, max: 20 },
        intacto: 10,
        selfDamage: { type: 'percent', amount: 5 },
        castsPerTurn: 5,
        castsPerTarget: 3,
        cooldown: 0,
        description: 'Explosão de Fogo em área 3x3 ao redor. Causa 12-20 de dano a inimigos. +10% de dano em alvos com vida cheia (Intacto). Causa 5% do seu HP máximo como auto-dano.'
    },

    // ===== TERRA (5 feitiços) =====
    {
        id: 'orik_rachadura_terrestre',
        catalogId: '0701000006',
        name: 'Rachadura Terrestre',
        icon: '🌍',
        class: 'orik',
        element: 'earth',
        spellType: 'active',
        castType: 'targeted',
        needsTarget: false,
        paCost: 2,
        minRange: 1,
        maxRange: 1,
        rangeShape: 'cross',
        aoeType: 'single',
        damage: { min: 7, max: 11 },
        effects: [
            { effectId: 'rachadura', level: 1, target: 'self' }
        ],
        castsPerTurn: 5,
        castsPerTarget: 3,
        cooldown: 0,
        description: 'Golpe de Terra corpo a corpo. Causa 7-11 de dano. Concede +5 Bloqueio e +10% do bloqueio atual por 1 turno. Deve ser mantido a cada turno.'
    },
    {
        id: 'orik_muralha_pedra',
        catalogId: '0701000007',
        name: 'Muralha de Pedra',
        icon: '🧱',
        class: 'orik',
        element: 'earth',
        spellType: 'active',
        castType: 'targeted',
        needsTarget: false,
        paCost: 2,
        minRange: 1,
        maxRange: 3,
        rangeShape: 'cross',
        aoeType: 'single',
        armorGrant: { min: 10, max: 16 },
        castsPerTurn: 3,
        castsPerTarget: 2,
        cooldown: 0,
        description: 'Invoca uma muralha de pedra no alvo. Concede 10-16 de escudo. Alcance 1-3 em cruz. 3 usos/turno, 2/alvo.'
    },
    {
        id: 'orik_impacto_sismico',
        catalogId: '0701000008',
        name: 'Impacto Sísmico',
        icon: '☄️',
        class: 'orik',
        element: 'earth',
        spellType: 'active',
        castType: 'targeted',
        needsTarget: true,
        targetEnemy: true,
        targetAlly: false,
        paCost: 3,
        minRange: 1,
        maxRange: 2,
        rangeShape: 'line',
        requiresLoS: true,
        aoeType: 'single',
        damage: { min: 8, max: 14 },
        casterApproach: { distance: 2 },
        castsPerTurn: 2,
        castsPerTarget: 2,
        cooldown: 0,
        description: 'Golpe sísmico que causa 8-14 de dano de Terra e aproxima o conjurador 2 casas do alvo. Alcance 1-2 em linha. 2 usos/turno, 2/alvo.'
    },
    {
        id: 'orik_pele_rochosa',
        catalogId: '0701000009',
        name: 'Pele Rochosa',
        icon: '🪨',
        class: 'orik',
        element: 'earth',
        spellType: 'active',
        castType: 'targeted',
        needsTarget: false,
        targetEnemy: false,
        targetAlly: true,
        paCost: 3,
        minRange: 1,
        maxRange: 2,
        rangeShape: 'circle',
        aoeType: 'single',
        damage: null,
        effects: [
            { effectId: 'escudo_recebido', level: 1, target: 'hit' }
        ],
        castsPerTurn: 2,
        castsPerTarget: 2,
        cooldown: 0,
        description: 'Endurece a pele do alvo. +10% de armadura recebida por 2 turnos. Alcance 1-2 em círculo. 2 usos/turno, 2/alvo.'
    },
    {
        id: 'orik_cruz_sagrada',
        catalogId: '0701000010',
        name: 'Cruz Sagrada',
        icon: '✝️',
        class: 'orik',
        element: 'earth',
        spellType: 'active',
        castType: 'targeted',
        needsTarget: false,
        paCost: 5,
        peCost: 1,
        pmCost: 1,
        minRange: 1,
        maxRange: 4,
        rangeShape: 'line',
        requiresLoS: false,
        aoeType: 'zone',
        zoneDirectional: true,
        zoneCells: [
            {dx: -1, dy: 0}, {dx: -2, dy: 0},
            {dx: 1, dy: 0},
            {dx: 0, dy: -1}, {dx: 0, dy: 1}
        ],
        zoneCellsCardinal: [
            {dx: -1, dy: 0}, {dx: -2, dy: 0},
            {dx: 1, dy: 0},
            {dx: 0, dy: -1}, {dx: 0, dy: 1}
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
        damage: { min: 16, max: 24 },
        castsPerTurn: 2,
        castsPerTarget: 2,
        cooldown: 0,
        description: 'Cruz sagrada de Terra assimétrica (6 células). O braço maior da cruz aponta para o Orik. Causa 16-24 de dano. Só atinge inimigos. 1-4 em linha, sem LoS. 5 PA + 1 PE + 1 PM. 2 usos/turno, 2/alvo.'
    },

    // ===== AR (5 feitiços) =====
    {
        id: 'orik_corte_ventoso',
        catalogId: '0701000011',
        name: 'Corte',
        icon: '🌬️',
        class: 'orik',
        element: 'air',
        spellType: 'active',
        castType: 'targeted',
        needsTarget: false,
        paCost: 2,
        minRange: 1,
        maxRange: 2,
        rangeShape: 'circle',
        aoeType: 'single',
        damage: { min: 5, max: 8 },
        castsPerTurn: 4,
        castsPerTarget: 2,
        cooldown: 0,
        description: 'Corte de Ar (1-2 cel, círculo). 5-8 dano. 4/turno, 2/alvo.'
    },
    {
        id: 'orik_rajada_cortante',
        catalogId: '0701000012',
        name: 'Rajada',
        icon: '💨',
        class: 'orik',
        element: 'air',
        spellType: 'active',
        castType: 'targeted',
        needsTarget: false,
        pmCost: 1,
        minRange: 1,
        maxRange: 1,
        rangeShape: 'cross',
        aoeType: 'single',
        damage: { min: 2, max: 4 },
        castsPerTurn: 3,
        castsPerTarget: 2,
        cooldown: 0,
        description: 'Rajada de Ar (1 cel, cruz). 2-4 dano. 1 PM. 3/turno, 2/alvo.'
    },
    {
        id: 'orik_lamina_ciclone',
        catalogId: '0701000013',
        name: 'Lâmina',
        icon: '🌀',
        class: 'orik',
        element: 'air',
        spellType: 'active',
        castType: 'targeted',
        needsTarget: false,
        paCost: 3,
        minRange: 1,
        maxRange: 3,
        rangeShape: 'circle',
        modifiableRange: true,
        aoeType: 'single',
        damage: { min: 6, max: 9 },
        castsPerTurn: 5,
        castsPerTarget: 3,
        cooldown: 0,
        description: 'Lâmina de Ar (1-3 cel, círculo, alcance modificável). 6-9 dano. 3 PA. 5/turno, 3/alvo.'
    },
    {
        id: 'orik_vento_cortante',
        catalogId: '0701000014',
        name: 'Ventania',
        icon: '🌪️',
        class: 'orik',
        element: 'air',
        spellType: 'active',
        castType: 'targeted',
        needsTarget: false,
        paCost: 2,
        minRange: 1,
        maxRange: 3,
        rangeShape: 'line',
        aoeType: 'single',
        damage: { min: 4, max: 6 },
        castsPerTurn: 3,
        castsPerTarget: 3,
        cooldown: 0,
        description: 'Ventania de Ar em linha (1-3 cel). 4-6 dano. 3/turno, 3/alvo.'
    },
    {
        id: 'orik_vendaval_aco',
        catalogId: '0701000015',
        name: 'Vendaval',
        icon: '⚡',
        class: 'orik',
        element: 'air',
        spellType: 'active',
        castType: 'targeted',
        needsTarget: false,
        paCost: 4,
        minRange: 1,
        maxRange: 1,
        rangeShape: 'circle',
        aoeType: 'zone',
        zonePattern: 'v_cone',
        zoneEffects: {
            dmgCaster: false,
            dmgAlly: false,
            dmgEnemy: true,
            healCaster: false,
            healAlly: false,
            healEnemy: false,
            lifeSteal: false
        },
        damage: { min: 10, max: 16 },
        bonusVsHighHp: { threshold: 80, bonus: 10 },
        castsPerTurn: 5,
        castsPerTarget: 3,
        cooldown: 0,
        description: 'Golpe de Ar em V (1 cel). Acerta alvo + 2 diagonais. 10-16 dano. +10% vs >80% vida. 4 PA. 5/turno, 3/alvo.'
    },

    // ===== ATIVOS (3) =====
    {
        id: 'orik_salto_heroico',
        catalogId: '0701000016',
        name: 'Salto Heroico',
        icon: '🦅',
        class: 'orik',
        element: 'none',
        spellType: 'active',
        castType: 'targeted',
        needsTarget: false,
        paCost: 3,
        peCost: 1,
        minRange: 1,
        maxRange: 4,
        rangeShape: 'circle',
        aoeType: 'single',
        effect: 'teleport',
        requiresEmptyCell: true,
        cooldown: 3,
        description: 'Salta para uma célula vazia (1-4 células). Ignora obstáculos no caminho.'
    },
    {
        id: 'orik_estandarte',
        catalogId: '0701000017',
        name: 'Bandeira',
        icon: '🏴',
        class: 'orik',
        element: 'none',
        spellType: 'active',
        castType: 'targeted',
        needsTarget: false,
        requiresEmptyCell: true,
        paCost: 2,
        pmCost: 1,
        minRange: 1,
        maxRange: 2,
        rangeShape: 'circle',
        aoeType: 'single',
        effect: 'summon',
        summon: {
            type: 'estandarte',
            hpPercent: 30,           // 30% do HP máximo do Orik
            inheritResistances: true, // herda as resistências do caster
            aura: {
                range: 2,
                rangeShape: 'circle',
                type: 'passiveZone',    // aura passiva de zona — bônus enquanto estiver na área
                bonusBlock: 20,         // +20 bloqueio flat
                bonusBlockPercent: 30,  // +30% bloqueio
                target: 'allies'        // afeta aliados (players + summons do mesmo time)
            }
        },
        cooldown: 4,
        description: 'Invoca uma Bandeira em célula vazia (1-2 células, círculo). A Bandeira possui 30% do PV máximo do Orik e herda suas resistências. Aura de 2 células: aliados na área recebem +20 Bloqueio e +30% Bloqueio. Se a Bandeira for destruída, a aura desaparece. 2 PA + 1 PM. Recarga: 4 turnos.'
    },
    {
        id: 'orik_defesa',
        catalogId: '0701000018',
        name: 'Defesa',
        icon: '🛡️',
        class: 'orik',
        element: 'none',
        spellType: 'active',
        castType: 'self',
        paCost: 2,
        minRange: 0,
        maxRange: 0,
        rangeShape: 'circle',
        aoeType: 'none',
        effect: 'selfToggle',
        toggleEffect: {
            dmgPenalty: 15,          // -15% de dano em todos os ataques
            onSpellCast: {
                // Quando qualquer um desses feitiços é usado, concede armadura
                triggerSpellIds: [
                    'orik_espada_flamejante',
                    'orik_rachadura_terrestre',
                    'orik_corte_ventoso'
                ],
                grantArmorPercent: 3, // +3% do HP máximo como armadura por uso
                maxArmorPercent: 50  // limite de armadura: 50% do HP máximo
            }
        },
        cooldown: 2,
        description: 'Ativa/desativa o modo Defesa. Enquanto ativo: -15% dano. Ao usar Espada Flamejante, Rachadura ou Corte, ganha +3% PV máx como armadura (máx 50%). 2 PA. Recarga: 2 turnos.'
    },

    // ===== ATIVOS EXTRAS (2) =====
    {
        id: 'orik_provocar',
        catalogId: '0701000022',
        name: 'Provocar',
        icon: '😠',
        class: 'orik',
        element: 'none',
        spellType: 'active',
        castType: 'targeted',
        targetType: 'enemy',
        paCost: 3,
        peCost: 2,
        minRange: 1,
        maxRange: 2,
        rangeShape: 'line',
        requiresLoS: true,
        aoeType: 'single',
        effect: 'taunt',
        duration: 2,
        advancedStatus: [
            {
                type: 'estabilizado',
                duration: 1,          // dura 1 turno
                immunityDuration: 2   // após expirar: 2 turnos de imunidade ao efeito
            }
        ],
        cooldown: 3,
        description: 'Provoca um inimigo em linha (1-2 células, LOS). O alvo é forçado a atacar você por 2 turnos e fica Estabilizado (não pode ser teleportado, puxado ou empurrado) por 1 turno. Após o Estabilizado expirar, o alvo fica imune ao efeito por 2 turnos. 3 PA + 2 PE. Recarga: 3 turnos.'
    },
    {
        id: 'orik_grito_guerra',
        catalogId: '0701000023',
        name: 'Grito de Guerra',
        icon: '📣',
        class: 'orik',
        element: 'none',
        spellType: 'active',
        castType: 'self',
        targetType: 'ally',
        paCost: 3,
        minRange: 0,
        maxRange: 0,
        rangeShape: 'circle',
        aoeType: 'zone',
        zoneCells: [
                                    {dx: 0, dy: -2},
            {dx: -1, dy: -1}, {dx: 0, dy: -1}, {dx: 1, dy: -1},
            {dx: -2, dy: 0}, {dx: -1, dy: 0}, {dx: 0, dy: 0}, {dx: 1, dy: 0}, {dx: 2, dy: 0},
            {dx: -1, dy: 1}, {dx: 0, dy: 1}, {dx: 1, dy: 1},
                                    {dx: 0, dy: 2}
        ],
        zoneEffects: { healCaster: false, healAlly: false },
        effects: [{ effectId: 'poderoso', level: 1, target: 'ally' }],
        cooldown: 4,
        description: 'Grito de guerra em círculo de 2 casas. Aliados na zona (incluindo você) ganham +10% de dano causado por 2 turnos.'
    },

    // ===== PASSIVOS (5) =====
    {
        id: 'orik_passivo_defensor',
        catalogId: '0701000019',
        name: 'Defensor Nato',
        icon: '🛡️',
        class: 'orik',
        element: 'none',
        spellType: 'passive',
        castType: 'self',
        targetType: 'none',
        passiveEffect: {
            onBlock: {
                enabled: true,
                minDamageBlocked: 8,
                effects: [
                    { type: 'armor', amount: 5, duration: 1 }
                ]
            }
        },
        description: 'Ao bloquear ou aparar um golpe de 8+ de dano, ganha 5 de escudo (armadura temporária) por 1 turno.'
    },
    {
        id: 'orik_passivo_contraataque',
        catalogId: '0701000020',
        name: 'Contra-Ataque',
        icon: '⚔️',
        class: 'orik',
        element: 'none',
        spellType: 'passive',
        castType: 'self',
        targetType: 'none',
        passiveEffect: {
            onBlock: {
                enabled: true,
                minDamageBlocked: 10,
                effects: [
                    { type: 'damageBonus', percent: 15, duration: 2 }
                ]
            }
        },
        description: 'Ao bloquear ou aparar um golpe de 10+ de dano, ganha +15% de dano causado por 2 turnos.'
    },
    {
        id: 'orik_passivo_resiliencia',
        catalogId: '0701000024',
        name: 'Resiliência',
        icon: '💪',
        class: 'orik',
        element: 'none',
        spellType: 'passive',
        castType: 'self',
        targetType: 'none',
        passiveEffect: {
            onTurnStart: {
                enabled: true,
                effects: [{ type: 'heal', percent: 3 }]
            }
        },
        description: 'Regenera 3% HP máximo no início de cada turno.'
    },
    {
        id: 'orik_passivo_furia',
        catalogId: '0701000025',
        name: 'Fúria Guerreira',
        icon: '🔥',
        class: 'orik',
        element: 'none',
        spellType: 'passive',
        castType: 'self',
        targetType: 'none',
        passiveEffect: {
            onHitTaken: {
                enabled: true,
                minDamage: 8,
                effects: [
                    { type: 'gainPA', amount: 1, duration: 1, oncePerTurn: true }
                ]
            }
        },
        description: 'Ao sofrer 8+ dano, ganha +1 PA no próximo turno (1x por turno).'
    },
    {
        id: 'orik_passivo_fortitude',
        catalogId: '0701000026',
        name: 'Fortitude',
        icon: '❤️',
        class: 'orik',
        element: 'none',
        spellType: 'passive',
        castType: 'self',
        targetType: 'none',
        passiveEffect: {
            maxHpPercent: 10
        },
        description: '+10% HP máximo.'
    },

    // ===== DOM (1) =====
    {
        id: 'orik_dom_ira_titan',
        catalogId: '0701000021',
        name: 'DOM: Ira do Titã',
        icon: '👑',
        class: 'orik',
        element: 'fire',
        spellType: 'dom',
        domPassive: true,
        paCost: 0, peCost: 0, pmCost: 0,
        minRange: 0, maxRange: 0,
        aoeType: 'none',
        // Trigger: Golpe Devastador (ativa ao causar ≥40% HP de dano em 1 hit)
        triggerType: 'golpe_devastador',
        triggerThreshold: 40,
        triggerReward: { pe: 1, pm: 1 },
        description: 'Golpe Devastador: ao causar dano equivalente a 40% ou mais do HP máximo de um inimigo em um único golpe, recupera +1 PE e +1 PM. Ativa 1x por turno.'
    },

    // ===== [TESTE] FEITIÇO DE TESTE — NÃO DISPONÍVEL PARA JOGADORES =====
    // Para testar sistema de Vontade (roubo de PA contestado)
    {
        id: 'teste_roubo_pa',
        catalogId: '9900000001',
        name: '[TESTE] Dreno de Ação',
        icon: '⚡',
        class: 'orik',
        element: 'none',
        spellType: 'active',
        castType: 'targeted',
        needsTarget: true,
        paCost: 3,
        minRange: 1,
        maxRange: 5,
        rangeShape: 'circle',
        requiresLoS: false,
        aoeType: 'single',
        damage: { min: 1, max: 2 },
        paSteal: 5,
        stealFixed: false,
        castsPerTurn: 99,
        castsPerTarget: 99,
        cooldown: 0,
        description: '[TESTE] Causa 1-2 de dano e rouba 5 PA do alvo (contestado por Vontade). Para fins de balanceamento.'
    }
];

// ========== COMBOS DE AR DO ORIK ==========
// Combos são sequências de 3 feitiços usados no MESMO turno.
// Os 2 primeiros "carregam" o combo, o 3º dispara o efeito extra.
const DB_COMBOS_ORIK = [
    {
        id: 'combo_ar_puxar',
        name: 'Sucção Ciclônica',
        class: 'orik',
        // Sequência: Rajada → Rajada → Ventania
        sequence: ['orik_rajada_cortante', 'orik_rajada_cortante', 'orik_vento_cortante'],
        singleTurnOnly: true,
        triggerEffect: {
            type: 'pushPull',
            pushPull: {
                type: 'pull',
                distance: 2,
                minDistanceFromCaster: 1 // não sobrepõe o caster, encosta adjacente
            }
        },
        description: 'Rajada + Rajada + Ventania: puxa o alvo 2 casas na direção do Orik (fica adjacente).'
    },
    {
        id: 'combo_ar_empurrar',
        name: 'Rajada Explosiva',
        class: 'orik',
        // Sequência: Rajada → Ventania → Corte
        sequence: ['orik_rajada_cortante', 'orik_vento_cortante', 'orik_corte_ventoso'],
        singleTurnOnly: true,
        triggerEffect: {
            type: 'pushPull',
            pushPull: {
                type: 'push',
                distance: 2,
                diagonal: true // empurra na diagonal (se alvo está a 2 casas, resulta em 4 casas de distância)
            }
        },
        description: 'Rajada + Ventania + Corte: empurra o alvo 2 casas na diagonal.'
    },
    {
        id: 'combo_ar_dano',
        name: 'Ciclone Devastador',
        class: 'orik',
        // Sequência: Ventania → Corte → Lâmina
        sequence: ['orik_vento_cortante', 'orik_corte_ventoso', 'orik_lamina_ciclone'],
        singleTurnOnly: true,
        triggerEffect: {
            type: 'damageBonus',
            damageBonus: 30 // +30% de dano no golpe que completa o combo
        },
        description: 'Ventania + Corte + Lâmina: a Lâmina causa +30% de dano.'
    },
    {
        id: 'combo_ar_vento_ciclone',
        name: 'Olho do Furacão',
        class: 'orik',
        // Sequência: Corte → Lâmina → Corte
        sequence: ['orik_corte_ventoso', 'orik_lamina_ciclone', 'orik_corte_ventoso'],
        singleTurnOnly: true,
        triggerEffect: {
            type: 'nextSpellDamageBonus',
            damageBonus: 30, // +30% de dano no PRÓXIMO feitiço que causar dano
            target: 'caster' // buff aplicado no conjurador
        },
        description: 'Corte + Lâmina + Corte: o próximo feitiço do conjurador que causar dano terá +30% de dano.'
    },
    {
        id: 'combo_ar_impulso',
        name: 'Impulso Ventoso',
        class: 'orik',
        // Sequência: Rajada → Ventania → Vendaval
        sequence: ['orik_rajada_cortante', 'orik_vento_cortante', 'orik_vendaval_aco'],
        singleTurnOnly: true,
        triggerEffect: {
            type: 'grantPA',
            paAmount: 2,             // +2 PA
            aoeRange: 2,             // círculo de 2 casas ao redor do conjurador
            targetSelf: true,        // conjurador recebe
            targetAllies: true       // aliados na zona recebem
        },
        description: 'Rajada + Ventania + Vendaval: o conjurador e aliados num círculo de 2 casas ganham +2 PA.'
    }
];

// ========== BANCO DE DADOS: MONSTROS ==========
// Todos os monstros do jogo ficam aqui.
// 18 famílias: 6 por faixa de nível (1-5, 6-11, 12-20)
// 4 monstros por família = 72 monstros + 1 espantalho (dummy)

const DB_MONSTROS = [

    // ============================================================
    //  FAIXA 1 — NÍVEL 1-5
    // ============================================================

    // --------------------------------------------------
    //  F1: RATO 🐀
    // --------------------------------------------------
    // Rato de Esgoto — equilibrado, o rato clássico de esgoto
    {
        id: 'rato_esgoto',
        family: 'rato',
        catalogId: '0501000001',
        name: 'Rato de Esgoto',
        icon: '🐀',
        svgIcon: { shape: 'rat-head', palette: 'leather' },
        level: 3,
        xpReward: 25,
        hp: 30,
        pa: 6,
        pm: 4,
        stats: { strength: 6, intelligence: 2, agility: 7, wisdom: 2, luck: 4 },
        block: 0,
        dodge: 5,
        initiative: 11,
        resistances: { neutral: 0, fire: -2, water: 3, earth: 0, air: 0 },
        aiType: 'aggressive_melee',
        spells: ['monster_mordida_rapida', 'monster_arranhar'],
        drops: [
            { itemId: 'recurso_rabo_rato', quantity: 1, chance: 55 },
            { itemId: 'recurso_dente_rato', quantity: 1, chance: 25 },
            { itemId: 'recurso_bigode_rei_rato', quantity: 1, chance: 6 }
        ]
    },
    // Rato Pelado — sem pelo, lento mas resistente, mais vida e bloqueio
    {
        id: 'rato_pelado',
        family: 'rato',
        catalogId: '0501000002',
        name: 'Rato Pelado',
        icon: '🐀',
        svgIcon: { shape: 'rat-head', palette: 'iron' },
        level: 3,
        xpReward: 25,
        hp: 38,
        pa: 6,
        pm: 3,
        stats: { strength: 8, intelligence: 2, agility: 4, wisdom: 3, luck: 3 },
        block: 3,
        dodge: 2,
        initiative: 7,
        resistances: { neutral: 2, fire: -1, water: 2, earth: 2, air: -2 },
        aiType: 'aggressive_melee',
        spells: ['monster_soco_brutal', 'monster_mordida_rapida'],
        drops: [
            { itemId: 'recurso_rabo_rato', quantity: 1, chance: 55 },
            { itemId: 'recurso_dente_rato', quantity: 1, chance: 25 },
            { itemId: 'recurso_bigode_rei_rato', quantity: 1, chance: 6 }
        ]
    },
    // Rato Saltador — ágil e rápido, pouca vida mas esquiva alta
    {
        id: 'rato_saltador',
        family: 'rato',
        catalogId: '0501000003',
        name: 'Rato Saltador',
        icon: '🐀',
        svgIcon: { shape: 'rat-head', palette: 'nature' },
        level: 3,
        xpReward: 25,
        hp: 22,
        pa: 6,
        pm: 5,
        stats: { strength: 4, intelligence: 2, agility: 10, wisdom: 2, luck: 5 },
        block: 0,
        dodge: 8,
        initiative: 14,
        resistances: { neutral: 0, fire: -3, water: 2, earth: -1, air: 4 },
        aiType: 'aggressive_melee',
        spells: ['monster_investida', 'monster_arranhar', 'monster_mordida_rapida'],
        drops: [
            { itemId: 'recurso_rabo_rato', quantity: 1, chance: 55 },
            { itemId: 'recurso_dente_rato', quantity: 1, chance: 25 },
            { itemId: 'recurso_bigode_rei_rato', quantity: 1, chance: 6 }
        ]
    },
    // Rato Albino — raro, venenoso, mais inteligência e sabedoria
    {
        id: 'rato_albino',
        family: 'rato',
        catalogId: '0501000004',
        name: 'Rato Albino',
        icon: '🐀',
        svgIcon: { shape: 'rat-head', palette: 'gold' },
        level: 3,
        xpReward: 25,
        hp: 28,
        pa: 6,
        pm: 3,
        stats: { strength: 3, intelligence: 7, agility: 5, wisdom: 5, luck: 3 },
        block: 0,
        dodge: 4,
        initiative: 9,
        resistances: { neutral: 0, fire: -2, water: 4, earth: 0, air: 2 },
        aiType: 'defensive_ranged',
        spells: ['monster_mordida_venenosa_fraca', 'monster_arranhar'],
        drops: [
            { itemId: 'recurso_rabo_rato', quantity: 1, chance: 55 },
            { itemId: 'recurso_dente_rato', quantity: 1, chance: 25 },
            { itemId: 'recurso_bigode_rei_rato', quantity: 1, chance: 6 }
        ]
    },

    // --------------------------------------------------
    //  F2: BARATA 🪳
    // --------------------------------------------------
    // Barata Marrom — comum, equilibrada
    {
        id: 'barata',
        family: 'barata',
        catalogId: '0501000005',
        name: 'Barata Marrom',
        icon: '🪳',
        svgIcon: { shape: 'roach-head', palette: 'leather' },
        level: 3,
        xpReward: 25,
        hp: 32,
        pa: 6,
        pm: 3,
        stats: { strength: 6, intelligence: 2, agility: 5, wisdom: 2, luck: 3 },
        block: 4,
        dodge: 3,
        initiative: 7,
        resistances: { neutral: 2, fire: -3, water: 0, earth: 5, air: 0 },
        aiType: 'aggressive_melee',
        spells: ['monster_arranhar', 'monster_mordida'],
        drops: [
            { itemId: 'recurso_casca_barata', quantity: 1, chance: 55 },
            { itemId: 'recurso_antena_barata', quantity: 1, chance: 25 },
            { itemId: 'recurso_glandula_rainha_barata', quantity: 1, chance: 6 }
        ]
    },
    // Barata Voadora — rápida, mais PM e esquiva, menos vida
    {
        id: 'barata_gigante',
        family: 'barata',
        catalogId: '0501000006',
        name: 'Barata Voadora',
        icon: '🪳',
        svgIcon: { shape: 'roach-head', palette: 'iron' },
        level: 3,
        xpReward: 25,
        hp: 24,
        pa: 6,
        pm: 5,
        stats: { strength: 4, intelligence: 2, agility: 8, wisdom: 1, luck: 4 },
        block: 0,
        dodge: 7,
        initiative: 12,
        resistances: { neutral: 0, fire: -4, water: 0, earth: 2, air: 4 },
        aiType: 'aggressive_melee',
        spells: ['monster_mordida', 'monster_arranhar'],
        drops: [
            { itemId: 'recurso_casca_barata', quantity: 1, chance: 55 },
            { itemId: 'recurso_antena_barata', quantity: 1, chance: 25 },
            { itemId: 'recurso_glandula_rainha_barata', quantity: 1, chance: 6 }
        ]
    },
    // Cascudo — blindado, lento, muito bloqueio
    {
        id: 'cascudo',
        family: 'barata',
        catalogId: '0501000007',
        name: 'Cascudo',
        icon: '🪳',
        svgIcon: { shape: 'roach-head', palette: 'nature' },
        level: 4,
        xpReward: 30,
        hp: 42,
        pa: 6,
        pm: 2,
        stats: { strength: 8, intelligence: 1, agility: 3, wisdom: 3, luck: 2 },
        block: 8,
        dodge: 0,
        initiative: 4,
        resistances: { neutral: 3, fire: -5, water: 0, earth: 8, air: -2 },
        aiType: 'aggressive_melee',
        spells: ['monster_soco_brutal', 'monster_carapaca'],
        drops: [
            { itemId: 'recurso_casca_barata', quantity: 1, chance: 55 },
            { itemId: 'recurso_antena_barata', quantity: 1, chance: 25 },
            { itemId: 'recurso_glandula_rainha_barata', quantity: 1, chance: 6 }
        ]
    },
    // Barata D'Água — variante aquática, resistências diferentes
    {
        id: 'barata_rainha',
        family: 'barata',
        catalogId: '0501000008',
        name: "Barata D'Água",
        icon: '🪳',
        svgIcon: { shape: 'roach-head', palette: 'gold' },
        level: 3,
        xpReward: 25,
        hp: 30,
        pa: 6,
        pm: 3,
        stats: { strength: 5, intelligence: 4, agility: 6, wisdom: 3, luck: 3 },
        block: 2,
        dodge: 4,
        initiative: 8,
        resistances: { neutral: 1, fire: -3, water: 4, earth: 3, air: 0 },
        aiType: 'aggressive_melee',
        spells: ['monster_mordida_venenosa_fraca', 'monster_arranhar'],
        drops: [
            { itemId: 'recurso_casca_barata', quantity: 1, chance: 55 },
            { itemId: 'recurso_antena_barata', quantity: 1, chance: 25 },
            { itemId: 'recurso_glandula_rainha_barata', quantity: 1, chance: 6 }
        ]
    },

    // --------------------------------------------------
    //  F3: COGUMELO 🍄
    // --------------------------------------------------
    // Cogumelo Pintado — manchas coloridas, magia equilibrada
    {
        id: 'cogumelo_broto',
        family: 'cogumelo',
        catalogId: '0501000009',
        name: 'Cogumelo Pintado',
        icon: '🍄',
        svgIcon: { shape: 'mushroom-head', palette: 'leather' },
        level: 3,
        xpReward: 25,
        hp: 30,
        pa: 6,
        pm: 2,
        stats: { strength: 4, intelligence: 6, agility: 4, wisdom: 5, luck: 3 },
        block: 1,
        dodge: 2,
        initiative: 6,
        resistances: { neutral: 0, fire: -4, water: 5, earth: 3, air: 0 },
        aiType: 'aggressive_melee',
        spells: ['monster_espora_toxica', 'monster_mordida'],
        drops: [
            { itemId: 'recurso_esporo_cogumelo', quantity: 1, chance: 55 },
            { itemId: 'recurso_chapeu_cogumelo', quantity: 1, chance: 25 },
            { itemId: 'recurso_micelio_anciao', quantity: 1, chance: 6 }
        ]
    },
    // Cogumelo Venenoso — especialista em veneno, frágil
    {
        id: 'cogumelo_venenoso',
        family: 'cogumelo',
        catalogId: '0501000010',
        name: 'Cogumelo Venenoso',
        icon: '🍄',
        svgIcon: { shape: 'mushroom-head', palette: 'nature' },
        level: 3,
        xpReward: 25,
        hp: 28,
        pa: 6,
        pm: 2,
        stats: { strength: 3, intelligence: 8, agility: 3, wisdom: 5, luck: 4 },
        block: 0,
        dodge: 2,
        initiative: 5,
        resistances: { neutral: 0, fire: -5, water: 6, earth: 2, air: 0 },
        aiType: 'defensive_ranged',
        spells: ['monster_espora_toxica', 'monster_nuvem_esporos'],
        drops: [
            { itemId: 'recurso_esporo_cogumelo', quantity: 1, chance: 55 },
            { itemId: 'recurso_chapeu_cogumelo', quantity: 1, chance: 25 },
            { itemId: 'recurso_micelio_anciao', quantity: 1, chance: 6 }
        ]
    },
    // Fungo Ambulante — móvel, o único cogumelo que anda bem
    {
        id: 'fungo_ambulante',
        family: 'cogumelo',
        catalogId: '0501000011',
        name: 'Fungo Ambulante',
        icon: '🍄',
        svgIcon: { shape: 'mushroom-head', palette: 'shadow' },
        level: 3,
        xpReward: 25,
        hp: 25,
        pa: 6,
        pm: 3,
        stats: { strength: 5, intelligence: 5, agility: 5, wisdom: 4, luck: 3 },
        block: 2,
        dodge: 3,
        initiative: 7,
        resistances: { neutral: 1, fire: -4, water: 4, earth: 3, air: 1 },
        aiType: 'aggressive_melee',
        spells: ['monster_mordida', 'monster_soco_brutal', 'monster_espora_toxica'],
        drops: [
            { itemId: 'recurso_esporo_cogumelo', quantity: 1, chance: 55 },
            { itemId: 'recurso_chapeu_cogumelo', quantity: 1, chance: 25 },
            { itemId: 'recurso_micelio_anciao', quantity: 1, chance: 6 }
        ]
    },
    // Cogumelo Luminoso — brilha no escuro, tankão mágico lento
    {
        id: 'cogumelo_anciao',
        family: 'cogumelo',
        catalogId: '0501000012',
        name: 'Cogumelo Luminoso',
        icon: '🍄',
        svgIcon: { shape: 'mushroom-head', palette: 'gold' },
        level: 4,
        xpReward: 30,
        hp: 38,
        pa: 6,
        pm: 1,
        stats: { strength: 3, intelligence: 7, agility: 3, wisdom: 6, luck: 3 },
        block: 3,
        dodge: 1,
        initiative: 4,
        resistances: { neutral: 0, fire: -3, water: 4, earth: 2, air: 3 },
        aiType: 'defensive_ranged',
        spells: ['monster_rajada_magica', 'monster_nuvem_esporos'],
        drops: [
            { itemId: 'recurso_esporo_cogumelo', quantity: 1, chance: 55 },
            { itemId: 'recurso_chapeu_cogumelo', quantity: 1, chance: 25 },
            { itemId: 'recurso_micelio_anciao', quantity: 1, chance: 6 }
        ]
    },

    // --------------------------------------------------
    //  F4: SAPO 🐸
    // --------------------------------------------------
    // Sapo Pingo — pequeno e ágil, pula bastante
    {
        id: 'sapo_pingo',
        family: 'sapo',
        catalogId: '0501000013',
        name: 'Sapo Pingo',
        icon: '🐸',
        svgIcon: { shape: 'frog-head', palette: 'leather' },
        level: 3,
        xpReward: 25,
        hp: 22,
        pa: 6,
        pm: 5,
        stats: { strength: 4, intelligence: 4, agility: 8, wisdom: 3, luck: 4 },
        block: 0,
        dodge: 7,
        initiative: 12,
        resistances: { neutral: 0, fire: -3, water: 5, earth: -2, air: 2 },
        aiType: 'aggressive_melee',
        spells: ['monster_lingua_chicote', 'monster_mordida_rapida'],
        drops: [
            { itemId: 'recurso_gosma_sapo', quantity: 1, chance: 55 },
            { itemId: 'recurso_lingua_sapo', quantity: 1, chance: 25 },
            { itemId: 'recurso_olho_patriarca_sapo', quantity: 1, chance: 6 }
        ]
    },
    // Sapo Lamacento — coberto de lama, mais resistente, terroso
    {
        id: 'sapo_lamacento',
        family: 'sapo',
        catalogId: '0501000014',
        name: 'Sapo Lamacento',
        icon: '🐸',
        svgIcon: { shape: 'frog-head', palette: 'nature' },
        level: 3,
        xpReward: 25,
        hp: 35,
        pa: 6,
        pm: 3,
        stats: { strength: 6, intelligence: 3, agility: 5, wisdom: 4, luck: 3 },
        block: 3,
        dodge: 3,
        initiative: 8,
        resistances: { neutral: 0, fire: -4, water: 4, earth: 2, air: 0 },
        aiType: 'aggressive_melee',
        spells: ['monster_lingua_chicote', 'monster_mordida', 'monster_salto_esmagador'],
        drops: [
            { itemId: 'recurso_gosma_sapo', quantity: 1, chance: 55 },
            { itemId: 'recurso_lingua_sapo', quantity: 1, chance: 25 },
            { itemId: 'recurso_olho_patriarca_sapo', quantity: 1, chance: 6 }
        ]
    },
    // Sapo Venenoso — colorido, foco em veneno
    {
        id: 'sapo_venenoso',
        family: 'sapo',
        catalogId: '0501000015',
        name: 'Sapo Venenoso',
        icon: '🐸',
        svgIcon: { shape: 'frog-head', palette: 'shadow' },
        level: 3,
        xpReward: 25,
        hp: 28,
        pa: 6,
        pm: 4,
        stats: { strength: 4, intelligence: 6, agility: 7, wisdom: 4, luck: 4 },
        block: 0,
        dodge: 6,
        initiative: 10,
        resistances: { neutral: 0, fire: -3, water: 6, earth: -2, air: 2 },
        aiType: 'aggressive_melee',
        spells: ['monster_mordida_venenosa_fraca', 'monster_lingua_chicote'],
        drops: [
            { itemId: 'recurso_gosma_sapo', quantity: 1, chance: 55 },
            { itemId: 'recurso_lingua_sapo', quantity: 1, chance: 25 },
            { itemId: 'recurso_olho_patriarca_sapo', quantity: 1, chance: 6 }
        ]
    },
    // Sapo Inchado — gordão, muito HP, lento
    {
        id: 'sapo_patriarca',
        family: 'sapo',
        catalogId: '0501000016',
        name: 'Sapo Inchado',
        icon: '🐸',
        svgIcon: { shape: 'frog-head', palette: 'gold' },
        level: 4,
        xpReward: 30,
        hp: 42,
        pa: 6,
        pm: 2,
        stats: { strength: 7, intelligence: 3, agility: 4, wisdom: 4, luck: 2 },
        block: 4,
        dodge: 1,
        initiative: 5,
        resistances: { neutral: 2, fire: -4, water: 5, earth: 0, air: -1 },
        aiType: 'aggressive_melee',
        spells: ['monster_salto_esmagador', 'monster_mordida', 'monster_lingua_chicote'],
        drops: [
            { itemId: 'recurso_gosma_sapo', quantity: 1, chance: 55 },
            { itemId: 'recurso_lingua_sapo', quantity: 1, chance: 25 },
            { itemId: 'recurso_olho_patriarca_sapo', quantity: 1, chance: 6 }
        ]
    },

    // --------------------------------------------------
    //  F5: MORCEGO 🦇
    // --------------------------------------------------
    // Morcego Orelhudo — orelhas grandes, ataques sônicos
    {
        id: 'morcego_comum',
        family: 'morcego',
        catalogId: '0501000017',
        name: 'Morcego Orelhudo',
        icon: '🦇',
        svgIcon: { shape: 'bat-head', palette: 'leather' },
        level: 3,
        xpReward: 25,
        hp: 26,
        pa: 6,
        pm: 4,
        stats: { strength: 4, intelligence: 5, agility: 8, wisdom: 3, luck: 5 },
        block: 0,
        dodge: 7,
        initiative: 14,
        resistances: { neutral: 0, fire: 0, water: 2, earth: -3, air: 5 },
        aiType: 'defensive_ranged',
        spells: ['monster_grito_sonico', 'monster_mordida_rapida'],
        drops: [
            { itemId: 'recurso_asa_morcego', quantity: 1, chance: 55 },
            { itemId: 'recurso_presa_morcego', quantity: 1, chance: 25 },
            { itemId: 'recurso_sangue_anciao_morcego', quantity: 1, chance: 6 }
        ]
    },
    // Morcego Cinzento — furtivo, altíssima esquiva e iniciativa
    {
        id: 'morcego_noturno',
        family: 'morcego',
        catalogId: '0501000018',
        name: 'Morcego Cinzento',
        icon: '🦇',
        svgIcon: { shape: 'bat-head', palette: 'shadow' },
        level: 3,
        xpReward: 25,
        hp: 22,
        pa: 6,
        pm: 5,
        stats: { strength: 4, intelligence: 3, agility: 10, wisdom: 2, luck: 6 },
        block: 0,
        dodge: 9,
        initiative: 16,
        resistances: { neutral: 0, fire: 0, water: 0, earth: -4, air: 7 },
        aiType: 'aggressive_melee',
        spells: ['monster_mordida_rapida', 'monster_arranhar'],
        drops: [
            { itemId: 'recurso_asa_morcego', quantity: 1, chance: 55 },
            { itemId: 'recurso_presa_morcego', quantity: 1, chance: 25 },
            { itemId: 'recurso_sangue_anciao_morcego', quantity: 1, chance: 6 }
        ]
    },
    // Morcego Vampiro — rouba vida, equilibrado
    {
        id: 'morcego_vampiro',
        family: 'morcego',
        catalogId: '0501000019',
        name: 'Morcego Vampiro',
        icon: '🦇',
        svgIcon: { shape: 'bat-head', palette: 'blood' },
        level: 3,
        xpReward: 25,
        hp: 30,
        pa: 6,
        pm: 4,
        stats: { strength: 6, intelligence: 4, agility: 8, wisdom: 3, luck: 5 },
        block: 0,
        dodge: 6,
        initiative: 13,
        resistances: { neutral: 0, fire: -1, water: 3, earth: -3, air: 4 },
        aiType: 'aggressive_melee',
        spells: ['monster_mordida_vampirica', 'monster_arranhar'],
        drops: [
            { itemId: 'recurso_asa_morcego', quantity: 1, chance: 55 },
            { itemId: 'recurso_presa_morcego', quantity: 1, chance: 25 },
            { itemId: 'recurso_sangue_anciao_morcego', quantity: 1, chance: 6 }
        ]
    },
    // Morcego Rabudo — cauda longa, físico, mais HP
    {
        id: 'morcego_anciao',
        family: 'morcego',
        catalogId: '0501000020',
        name: 'Morcego Rabudo',
        icon: '🦇',
        svgIcon: { shape: 'bat-head', palette: 'gold' },
        level: 4,
        xpReward: 30,
        hp: 34,
        pa: 6,
        pm: 3,
        stats: { strength: 8, intelligence: 2, agility: 6, wisdom: 2, luck: 4 },
        block: 2,
        dodge: 4,
        initiative: 10,
        resistances: { neutral: 2, fire: 0, water: 0, earth: -2, air: 3 },
        aiType: 'aggressive_melee',
        spells: ['monster_arranhar', 'monster_mordida_rapida', 'monster_grito_sonico'],
        drops: [
            { itemId: 'recurso_asa_morcego', quantity: 1, chance: 55 },
            { itemId: 'recurso_presa_morcego', quantity: 1, chance: 25 },
            { itemId: 'recurso_sangue_anciao_morcego', quantity: 1, chance: 6 }
        ]
    },

    // --------------------------------------------------
    //  F6: PLANTA 🌿
    // --------------------------------------------------
    // Broto Espinhoso — espinhento, equilibrado
    {
        id: 'broto_espinhoso',
        family: 'planta',
        catalogId: '0501000021',
        name: 'Broto Espinhoso',
        icon: '🌿',
        svgIcon: { shape: 'plant-head', palette: 'leather' },
        level: 3,
        xpReward: 25,
        hp: 30,
        pa: 6,
        pm: 1,
        stats: { strength: 7, intelligence: 3, agility: 3, wisdom: 3, luck: 2 },
        block: 3,
        dodge: 0,
        initiative: 4,
        resistances: { neutral: 0, fire: -5, water: 4, earth: 5, air: -2 },
        aiType: 'aggressive_melee',
        spells: ['monster_chicote_espinho', 'monster_mordida'],
        drops: [
            { itemId: 'recurso_raiz_viva', quantity: 1, chance: 55 },
            { itemId: 'recurso_seiva_nutritiva', quantity: 1, chance: 25 },
            { itemId: 'recurso_semente_flora', quantity: 1, chance: 6 }
        ]
    },
    // Planta Carnívora — mandíbulas fortes, dano alto, frágil
    {
        id: 'planta_carnivora',
        family: 'planta',
        catalogId: '0501000022',
        name: 'Planta Carnívora',
        icon: '🌿',
        svgIcon: { shape: 'plant-head', palette: 'nature' },
        level: 3,
        xpReward: 25,
        hp: 28,
        pa: 6,
        pm: 1,
        stats: { strength: 9, intelligence: 2, agility: 4, wisdom: 3, luck: 2 },
        block: 2,
        dodge: 1,
        initiative: 5,
        resistances: { neutral: 0, fire: -6, water: 3, earth: 6, air: -2 },
        aiType: 'aggressive_melee',
        spells: ['monster_mordida', 'monster_soco_brutal'],
        drops: [
            { itemId: 'recurso_raiz_viva', quantity: 1, chance: 55 },
            { itemId: 'recurso_seiva_nutritiva', quantity: 1, chance: 25 },
            { itemId: 'recurso_semente_flora', quantity: 1, chance: 6 }
        ]
    },
    // Trepadeira Viva — cipó vivo, controle com raiz
    {
        id: 'trepadeira_viva',
        family: 'planta',
        catalogId: '0501000023',
        name: 'Trepadeira Viva',
        icon: '🌿',
        svgIcon: { shape: 'plant-head', palette: 'jade' },
        level: 3,
        xpReward: 25,
        hp: 35,
        pa: 6,
        pm: 2,
        stats: { strength: 6, intelligence: 4, agility: 4, wisdom: 5, luck: 3 },
        block: 4,
        dodge: 1,
        initiative: 4,
        resistances: { neutral: 1, fire: -5, water: 5, earth: 4, air: -1 },
        aiType: 'aggressive_melee',
        spells: ['monster_chicote_espinho', 'monster_raiz_prendedora'],
        drops: [
            { itemId: 'recurso_raiz_viva', quantity: 1, chance: 55 },
            { itemId: 'recurso_seiva_nutritiva', quantity: 1, chance: 25 },
            { itemId: 'recurso_semente_flora', quantity: 1, chance: 6 }
        ]
    },
    // Cacto Vivo — tankão espinhento, muita vida e bloqueio
    {
        id: 'flora_devoradora',
        family: 'planta',
        catalogId: '0501000024',
        name: 'Cacto Vivo',
        icon: '🌿',
        svgIcon: { shape: 'plant-head', palette: 'gold' },
        level: 4,
        xpReward: 30,
        hp: 40,
        pa: 5,
        pm: 1,
        stats: { strength: 5, intelligence: 4, agility: 2, wisdom: 4, luck: 2 },
        block: 6,
        dodge: 0,
        initiative: 3,
        resistances: { neutral: 2, fire: -4, water: 2, earth: 7, air: -3 },
        aiType: 'aggressive_melee',
        spells: ['monster_chicote_espinho', 'monster_soco_brutal'],
        drops: [
            { itemId: 'recurso_raiz_viva', quantity: 1, chance: 55 },
            { itemId: 'recurso_seiva_nutritiva', quantity: 1, chance: 25 },
            { itemId: 'recurso_semente_flora', quantity: 1, chance: 6 }
        ]
    },

    // ============================================================
    //  FAIXA 2 — NÍVEL 6-11
    // ============================================================

    // --------------------------------------------------
    //  F7: LOBO 🐺
    // --------------------------------------------------
    // Lobo Cinzento — equilibrado, melee padrao da matilha
    {
        id: 'lobo_jovem',
        family: 'lobo',
        catalogId: '0501000025',
        name: 'Lobo Cinzento',
        icon: '🐺',
        svgIcon: { shape: 'wolf-head', palette: 'leather' },
        level: 8,
        xpReward: 75,
        hp: 78,
        pa: 6,
        pm: 4,
        stats: { strength: 17, intelligence: 3, agility: 13, wisdom: 5, luck: 9 },
        block: 2,
        dodge: 11,
        initiative: 19,
        resistances: { neutral: 1, fire: -1, water: 3, earth: 0, air: 6 },
        aiType: 'aggressive_melee',
        spells: ['monster_mordida', 'monster_investida'],
        drops: [
            { itemId: 'recurso_pele_lobo', quantity: 1, chance: 55 },
            { itemId: 'recurso_presa_lobo', quantity: 1, chance: 25 },
            { itemId: 'recurso_essencia_lobo', quantity: 1, chance: 6 }
        ]
    },
    // Lobo Selvagem — brutamontes, mais HP e forca, menos agilidade
    {
        id: 'lobo_selvagem',
        family: 'lobo',
        catalogId: '0501000026',
        name: 'Lobo Selvagem',
        icon: '🐺',
        svgIcon: { shape: 'wolf-head', palette: 'iron' },
        level: 8,
        xpReward: 75,
        hp: 90,
        pa: 6,
        pm: 3,
        stats: { strength: 22, intelligence: 3, agility: 10, wisdom: 5, luck: 7 },
        block: 5,
        dodge: 7,
        initiative: 15,
        resistances: { neutral: 2, fire: -2, water: 2, earth: 2, air: 5 },
        aiType: 'aggressive_melee',
        spells: ['monster_mordida_feroz', 'monster_investida', 'monster_uivo'],
        drops: [
            { itemId: 'recurso_pele_lobo', quantity: 1, chance: 55 },
            { itemId: 'recurso_presa_lobo', quantity: 1, chance: 25 },
            { itemId: 'recurso_essencia_lobo', quantity: 1, chance: 6 }
        ]
    },
    // Lobo Malhado — pelagem manchada, agil e esquivo
    {
        id: 'lobo_alfa',
        family: 'lobo',
        catalogId: '0501000027',
        name: 'Lobo Malhado',
        icon: '🐺',
        svgIcon: { shape: 'wolf-head', palette: 'silver' },
        level: 8,
        xpReward: 75,
        hp: 65,
        pa: 6,
        pm: 5,
        stats: { strength: 14, intelligence: 3, agility: 17, wisdom: 4, luck: 12 },
        block: 0,
        dodge: 16,
        initiative: 24,
        resistances: { neutral: 0, fire: -2, water: 3, earth: -1, air: 8 },
        aiType: 'aggressive_melee',
        spells: ['monster_mordida', 'monster_investida', 'monster_uivo'],
        drops: [
            { itemId: 'recurso_pele_lobo', quantity: 1, chance: 55 },
            { itemId: 'recurso_presa_lobo', quantity: 1, chance: 25 },
            { itemId: 'recurso_essencia_lobo', quantity: 1, chance: 6 }
        ]
    },
    // Lobo Faminto — esfomeado, glass cannon com PA extra
    {
        id: 'lobo_primordial',
        family: 'lobo',
        catalogId: '0501000028',
        name: 'Lobo Faminto',
        icon: '🐺',
        svgIcon: { shape: 'wolf-head', palette: 'gold' },
        level: 8,
        xpReward: 75,
        hp: 60,
        pa: 7,
        pm: 4,
        stats: { strength: 20, intelligence: 3, agility: 15, wisdom: 4, luck: 8 },
        block: 0,
        dodge: 12,
        initiative: 20,
        resistances: { neutral: 0, fire: -3, water: 2, earth: 0, air: 7 },
        aiType: 'aggressive_melee',
        spells: ['monster_mordida_feroz', 'monster_investida'],
        drops: [
            { itemId: 'recurso_pele_lobo', quantity: 1, chance: 55 },
            { itemId: 'recurso_presa_lobo', quantity: 1, chance: 25 },
            { itemId: 'recurso_essencia_lobo', quantity: 1, chance: 6 }
        ]
    },

    // --------------------------------------------------
    //  F8: ARANHA 🕷️
    // --------------------------------------------------
    // Aranha Listrada — equilibrada, melee basica
    {
        id: 'aranha_floresta',
        family: 'aranha',
        catalogId: '0501000029',
        name: 'Aranha Listrada',
        icon: '🕷️',
        svgIcon: { shape: 'spider-head', palette: 'leather' },
        level: 8,
        xpReward: 75,
        hp: 68,
        pa: 6,
        pm: 4,
        stats: { strength: 12, intelligence: 6, agility: 16, wisdom: 5, luck: 9 },
        block: 0,
        dodge: 14,
        initiative: 18,
        resistances: { neutral: 0, fire: -5, water: 8, earth: 2, air: 0 },
        aiType: 'aggressive_melee',
        spells: ['monster_mordida_venenosa', 'monster_arranhar'],
        drops: [
            { itemId: 'recurso_teia_aranha', quantity: 1, chance: 55 },
            { itemId: 'recurso_glandula_venenosa', quantity: 1, chance: 25 },
            { itemId: 'recurso_presas_viuva', quantity: 1, chance: 6 }
        ]
    },
    // Aranha Venenosa — foco em veneno, mais PA e inteligencia
    {
        id: 'aranha_venenosa',
        family: 'aranha',
        catalogId: '0501000030',
        name: 'Aranha Venenosa',
        icon: '🕷️',
        svgIcon: { shape: 'spider-head', palette: 'nature' },
        level: 8,
        xpReward: 75,
        hp: 60,
        pa: 7,
        pm: 4,
        stats: { strength: 10, intelligence: 9, agility: 17, wisdom: 6, luck: 10 },
        block: 0,
        dodge: 15,
        initiative: 17,
        resistances: { neutral: 0, fire: -6, water: 10, earth: 2, air: 1 },
        aiType: 'aggressive_melee',
        spells: ['monster_mordida_venenosa', 'monster_teia_pegajosa'],
        drops: [
            { itemId: 'recurso_teia_aranha', quantity: 1, chance: 55 },
            { itemId: 'recurso_glandula_venenosa', quantity: 1, chance: 25 },
            { itemId: 'recurso_presas_viuva', quantity: 1, chance: 6 }
        ]
    },
    // Aranha Tecela — controladora a distancia, usa teia e veneno ranged
    {
        id: 'aranha_tecela',
        family: 'aranha',
        catalogId: '0501000031',
        name: 'Aranha Tecelã',
        icon: '🕷️',
        svgIcon: { shape: 'spider-head', palette: 'shadow' },
        level: 8,
        xpReward: 75,
        hp: 65,
        pa: 6,
        pm: 4,
        stats: { strength: 8, intelligence: 12, agility: 14, wisdom: 8, luck: 10 },
        block: 2,
        dodge: 12,
        initiative: 16,
        resistances: { neutral: 2, fire: -7, water: 9, earth: 3, air: 2 },
        aiType: 'defensive_ranged',
        spells: ['monster_flecha_venenosa', 'monster_teia_pegajosa', 'monster_mordida_venenosa'],
        drops: [
            { itemId: 'recurso_teia_aranha', quantity: 1, chance: 55 },
            { itemId: 'recurso_glandula_venenosa', quantity: 1, chance: 25 },
            { itemId: 'recurso_presas_viuva', quantity: 1, chance: 6 }
        ]
    },
    // Aranha Peluda — tarântula robusta, mais HP e bloqueio
    {
        id: 'viuva_negra',
        family: 'aranha',
        catalogId: '0501000032',
        name: 'Aranha Peluda',
        icon: '🕷️',
        svgIcon: { shape: 'spider-head', palette: 'void' },
        level: 8,
        xpReward: 75,
        hp: 85,
        pa: 6,
        pm: 3,
        stats: { strength: 14, intelligence: 5, agility: 12, wisdom: 5, luck: 8 },
        block: 5,
        dodge: 8,
        initiative: 14,
        resistances: { neutral: 3, fire: -5, water: 7, earth: 4, air: 0 },
        aiType: 'aggressive_melee',
        spells: ['monster_mordida_venenosa', 'monster_arranhar', 'monster_teia_pegajosa'],
        drops: [
            { itemId: 'recurso_teia_aranha', quantity: 1, chance: 55 },
            { itemId: 'recurso_glandula_venenosa', quantity: 1, chance: 25 },
            { itemId: 'recurso_presas_viuva', quantity: 1, chance: 6 }
        ]
    },

    // --------------------------------------------------
    //  F9: JAVALI 🐗
    // --------------------------------------------------
    // Javali Malhado — equilibrado, o javali padrao
    {
        id: 'javali',
        family: 'javali',
        catalogId: '0501000033',
        name: 'Javali Malhado',
        icon: '🐗',
        svgIcon: { shape: 'boar-head', palette: 'leather' },
        level: 8,
        xpReward: 75,
        hp: 82,
        pa: 6,
        pm: 3,
        stats: { strength: 18, intelligence: 2, agility: 10, wisdom: 5, luck: 6 },
        block: 9,
        dodge: 4,
        initiative: 13,
        resistances: { neutral: 3, fire: 3, water: -5, earth: 10, air: 0 },
        aiType: 'aggressive_melee',
        spells: ['monster_soco_brutal', 'monster_investida'],
        drops: [
            { itemId: 'recurso_presa_javali', quantity: 1, chance: 55 },
            { itemId: 'recurso_couro_javali', quantity: 1, chance: 25 },
            { itemId: 'recurso_coracao_patriarca_javali', quantity: 1, chance: 6 }
        ]
    },
    // Javali Furioso — glass cannon agressivo, mais forca e PM
    {
        id: 'javali_furioso',
        family: 'javali',
        catalogId: '0501000034',
        name: 'Javali Furioso',
        icon: '🐗',
        svgIcon: { shape: 'boar-head', palette: 'iron' },
        level: 8,
        xpReward: 75,
        hp: 75,
        pa: 6,
        pm: 4,
        stats: { strength: 22, intelligence: 2, agility: 12, wisdom: 4, luck: 5 },
        block: 5,
        dodge: 5,
        initiative: 15,
        resistances: { neutral: 2, fire: 4, water: -6, earth: 8, air: 0 },
        aiType: 'aggressive_melee',
        spells: ['monster_investida_brutal', 'monster_coice', 'monster_soco_brutal'],
        drops: [
            { itemId: 'recurso_presa_javali', quantity: 1, chance: 55 },
            { itemId: 'recurso_couro_javali', quantity: 1, chance: 25 },
            { itemId: 'recurso_coracao_patriarca_javali', quantity: 1, chance: 6 }
        ]
    },
    // Javali Encouracado — mega tanque, muito HP e bloqueio, lento
    {
        id: 'javali_encouracado',
        family: 'javali',
        catalogId: '0501000035',
        name: 'Javali Encouraçado',
        icon: '🐗',
        svgIcon: { shape: 'boar-head', palette: 'silver' },
        level: 8,
        xpReward: 75,
        hp: 100,
        pa: 6,
        pm: 2,
        stats: { strength: 16, intelligence: 2, agility: 7, wisdom: 5, luck: 5 },
        block: 16,
        dodge: 2,
        initiative: 10,
        resistances: { neutral: 5, fire: 3, water: -7, earth: 14, air: 0 },
        aiType: 'aggressive_melee',
        spells: ['monster_soco_brutal', 'monster_coice', 'monster_investida'],
        drops: [
            { itemId: 'recurso_presa_javali', quantity: 1, chance: 55 },
            { itemId: 'recurso_couro_javali', quantity: 1, chance: 25 },
            { itemId: 'recurso_coracao_patriarca_javali', quantity: 1, chance: 6 }
        ]
    },
    // Javali Listrado — variante agil, mais rapido que os outros
    {
        id: 'javali_patriarca',
        family: 'javali',
        catalogId: '0501000036',
        name: 'Javali Listrado',
        icon: '🐗',
        svgIcon: { shape: 'boar-head', palette: 'gold' },
        level: 8,
        xpReward: 75,
        hp: 70,
        pa: 6,
        pm: 4,
        stats: { strength: 15, intelligence: 3, agility: 14, wisdom: 4, luck: 8 },
        block: 4,
        dodge: 8,
        initiative: 18,
        resistances: { neutral: 2, fire: 2, water: -5, earth: 8, air: 2 },
        aiType: 'aggressive_melee',
        spells: ['monster_investida', 'monster_coice', 'monster_soco_brutal'],
        drops: [
            { itemId: 'recurso_presa_javali', quantity: 1, chance: 55 },
            { itemId: 'recurso_couro_javali', quantity: 1, chance: 25 },
            { itemId: 'recurso_coracao_patriarca_javali', quantity: 1, chance: 6 }
        ]
    },

    // --------------------------------------------------
    //  F10: ESQUELETO 💀
    // --------------------------------------------------
    // Esqueleto Rachado — basico, melee simples com ossos quebrados
    {
        id: 'esqueleto',
        family: 'esqueleto',
        catalogId: '0501000037',
        name: 'Esqueleto Rachado',
        icon: '💀',
        svgIcon: { shape: 'skeleton-head', palette: 'bone' },
        level: 8,
        xpReward: 75,
        hp: 72,
        pa: 6,
        pm: 3,
        stats: { strength: 15, intelligence: 5, agility: 10, wisdom: 4, luck: 6 },
        block: 6,
        dodge: 5,
        initiative: 11,
        resistances: { neutral: 1, fire: -8, water: 5, earth: 8, air: 0 },
        aiType: 'aggressive_melee',
        spells: ['monster_golpe_ossudo', 'monster_arranhar'],
        drops: [
            { itemId: 'recurso_osso_polido', quantity: 1, chance: 55 },
            { itemId: 'recurso_cranio_intacto', quantity: 1, chance: 25 },
            { itemId: 'recurso_essencia_morte', quantity: 1, chance: 6 }
        ]
    },
    // Esqueleto Guerreiro — tanque melee, mais HP, forca e bloqueio
    {
        id: 'esqueleto_guerreiro',
        family: 'esqueleto',
        catalogId: '0501000038',
        name: 'Esqueleto Guerreiro',
        icon: '💀',
        svgIcon: { shape: 'skeleton-head', palette: 'iron' },
        level: 8,
        xpReward: 75,
        hp: 85,
        pa: 6,
        pm: 3,
        stats: { strength: 20, intelligence: 4, agility: 9, wisdom: 4, luck: 5 },
        block: 10,
        dodge: 4,
        initiative: 10,
        resistances: { neutral: 3, fire: -9, water: 5, earth: 10, air: 0 },
        aiType: 'aggressive_melee',
        spells: ['monster_golpe_ossudo', 'monster_investida', 'monster_arremesso_osso'],
        drops: [
            { itemId: 'recurso_osso_polido', quantity: 1, chance: 55 },
            { itemId: 'recurso_cranio_intacto', quantity: 1, chance: 25 },
            { itemId: 'recurso_essencia_morte', quantity: 1, chance: 6 }
        ]
    },
    // Esqueleto Arcano — mago morto-vivo, foco em inteligencia e magia
    {
        id: 'esqueleto_arcano',
        family: 'esqueleto',
        catalogId: '0501000039',
        name: 'Esqueleto Arcano',
        icon: '💀',
        svgIcon: { shape: 'skeleton-head', palette: 'arcane' },
        level: 8,
        xpReward: 75,
        hp: 60,
        pa: 7,
        pm: 3,
        stats: { strength: 8, intelligence: 18, agility: 8, wisdom: 9, luck: 7 },
        block: 3,
        dodge: 5,
        initiative: 14,
        resistances: { neutral: 2, fire: -10, water: 7, earth: 8, air: 3 },
        aiType: 'defensive_ranged',
        spells: ['monster_rajada_magica', 'monster_arremesso_osso'],
        drops: [
            { itemId: 'recurso_osso_polido', quantity: 1, chance: 55 },
            { itemId: 'recurso_cranio_intacto', quantity: 1, chance: 25 },
            { itemId: 'recurso_essencia_morte', quantity: 1, chance: 6 }
        ]
    },
    // Esqueleto Encapuzado — furtivo, agil e esquivo como um rogue
    {
        id: 'esqueleto_comandante',
        family: 'esqueleto',
        catalogId: '0501000040',
        name: 'Esqueleto Encapuzado',
        icon: '💀',
        svgIcon: { shape: 'skeleton-head', palette: 'gold' },
        level: 8,
        xpReward: 75,
        hp: 65,
        pa: 6,
        pm: 4,
        stats: { strength: 12, intelligence: 6, agility: 16, wisdom: 5, luck: 10 },
        block: 2,
        dodge: 12,
        initiative: 18,
        resistances: { neutral: 1, fire: -8, water: 6, earth: 7, air: 2 },
        aiType: 'aggressive_melee',
        spells: ['monster_golpe_ossudo', 'monster_arranhar', 'monster_investida'],
        drops: [
            { itemId: 'recurso_osso_polido', quantity: 1, chance: 55 },
            { itemId: 'recurso_cranio_intacto', quantity: 1, chance: 25 },
            { itemId: 'recurso_essencia_morte', quantity: 1, chance: 6 }
        ]
    },

    // --------------------------------------------------
    //  F11: COBRA 🐍
    // --------------------------------------------------
    // Cobra Verde — equilibrada, rapida e venenosa
    {
        id: 'cobra_verde',
        family: 'cobra',
        catalogId: '0501000041',
        name: 'Cobra Verde',
        icon: '🐍',
        svgIcon: { shape: 'snake-head', palette: 'nature' },
        level: 8,
        xpReward: 75,
        hp: 60,
        pa: 7,
        pm: 5,
        stats: { strength: 11, intelligence: 6, agility: 16, wisdom: 5, luck: 10 },
        block: 0,
        dodge: 15,
        initiative: 20,
        resistances: { neutral: 0, fire: 0, water: 8, earth: -5, air: 3 },
        aiType: 'aggressive_melee',
        spells: ['monster_bote_rapido', 'monster_mordida_venenosa'],
        drops: [
            { itemId: 'recurso_escama_cobra', quantity: 1, chance: 55 },
            { itemId: 'recurso_veneno_cobra', quantity: 1, chance: 25 },
            { itemId: 'recurso_olho_serpente', quantity: 1, chance: 6 }
        ]
    },
    // Naja — cuspideira, ataca a distancia com veneno
    {
        id: 'naja',
        family: 'cobra',
        catalogId: '0501000042',
        name: 'Naja',
        icon: '🐍',
        svgIcon: { shape: 'snake-head', palette: 'shadow' },
        level: 8,
        xpReward: 75,
        hp: 55,
        pa: 7,
        pm: 4,
        stats: { strength: 10, intelligence: 9, agility: 14, wisdom: 7, luck: 11 },
        block: 0,
        dodge: 14,
        initiative: 22,
        resistances: { neutral: 1, fire: -1, water: 10, earth: -6, air: 4 },
        aiType: 'defensive_ranged',
        spells: ['monster_cuspe_venenoso', 'monster_bote_rapido', 'monster_mordida_venenosa'],
        drops: [
            { itemId: 'recurso_escama_cobra', quantity: 1, chance: 55 },
            { itemId: 'recurso_veneno_cobra', quantity: 1, chance: 25 },
            { itemId: 'recurso_olho_serpente', quantity: 1, chance: 6 }
        ]
    },
    // Cascavel — melee burst, a mais agressiva e rapida
    {
        id: 'cascavel',
        family: 'cobra',
        catalogId: '0501000043',
        name: 'Cascavel',
        icon: '🐍',
        svgIcon: { shape: 'snake-head', palette: 'ember' },
        level: 8,
        xpReward: 75,
        hp: 65,
        pa: 7,
        pm: 4,
        stats: { strength: 14, intelligence: 6, agility: 17, wisdom: 5, luck: 10 },
        block: 2,
        dodge: 16,
        initiative: 24,
        resistances: { neutral: 2, fire: -2, water: 9, earth: -7, air: 5 },
        aiType: 'aggressive_melee',
        spells: ['monster_bote_rapido', 'monster_mordida_venenosa', 'monster_constricao'],
        drops: [
            { itemId: 'recurso_escama_cobra', quantity: 1, chance: 55 },
            { itemId: 'recurso_veneno_cobra', quantity: 1, chance: 25 },
            { itemId: 'recurso_olho_serpente', quantity: 1, chance: 6 }
        ]
    },
    // Coral — pequena e letal, veneno duplo a distancia
    {
        id: 'serpente_real',
        family: 'cobra',
        catalogId: '0501000044',
        name: 'Coral',
        icon: '🐍',
        svgIcon: { shape: 'snake-head', palette: 'gold' },
        level: 8,
        xpReward: 75,
        hp: 50,
        pa: 7,
        pm: 4,
        stats: { strength: 8, intelligence: 12, agility: 15, wisdom: 8, luck: 12 },
        block: 0,
        dodge: 13,
        initiative: 19,
        resistances: { neutral: 0, fire: 0, water: 11, earth: -6, air: 3 },
        aiType: 'defensive_ranged',
        spells: ['monster_mordida_venenosa', 'monster_cuspe_venenoso'],
        drops: [
            { itemId: 'recurso_escama_cobra', quantity: 1, chance: 55 },
            { itemId: 'recurso_veneno_cobra', quantity: 1, chance: 25 },
            { itemId: 'recurso_olho_serpente', quantity: 1, chance: 6 }
        ]
    },

    // --------------------------------------------------
    //  F12: GOBLIN 👺
    // --------------------------------------------------
    // Goblin Ladrao — furtivo, agil e sortudo
    {
        id: 'goblin_ladrao',
        family: 'goblin',
        catalogId: '0501000045',
        name: 'Goblin Ladrão',
        icon: '👺',
        svgIcon: { shape: 'goblin-head', palette: 'leather' },
        level: 8,
        xpReward: 75,
        hp: 62,
        pa: 7,
        pm: 4,
        stats: { strength: 12, intelligence: 5, agility: 15, wisdom: 4, luck: 14 },
        block: 2,
        dodge: 12,
        initiative: 18,
        resistances: { neutral: 0, fire: 3, water: -3, earth: 0, air: 2 },
        aiType: 'aggressive_melee',
        spells: ['monster_golpe_furtivo', 'monster_arranhar', 'monster_arremesso_pedra'],
        drops: [
            { itemId: 'recurso_orelha_goblin', quantity: 1, chance: 55 },
            { itemId: 'recurso_amuleto_goblin', quantity: 1, chance: 25 },
            { itemId: 'recurso_coroa_chefe_goblin', quantity: 1, chance: 6 }
        ]
    },
    // Goblin Guerreiro — tanque melee, mais HP, forca e bloqueio
    {
        id: 'goblin_guerreiro',
        family: 'goblin',
        catalogId: '0501000046',
        name: 'Goblin Guerreiro',
        icon: '👺',
        svgIcon: { shape: 'goblin-head', palette: 'iron' },
        level: 8,
        xpReward: 75,
        hp: 80,
        pa: 6,
        pm: 3,
        stats: { strength: 18, intelligence: 4, agility: 10, wisdom: 5, luck: 8 },
        block: 10,
        dodge: 5,
        initiative: 12,
        resistances: { neutral: 3, fire: 4, water: -4, earth: 3, air: 0 },
        aiType: 'aggressive_melee',
        spells: ['monster_soco_brutal', 'monster_investida', 'monster_arremesso_pedra'],
        drops: [
            { itemId: 'recurso_orelha_goblin', quantity: 1, chance: 55 },
            { itemId: 'recurso_amuleto_goblin', quantity: 1, chance: 25 },
            { itemId: 'recurso_coroa_chefe_goblin', quantity: 1, chance: 6 }
        ]
    },
    // Goblin Xama — conjurador, foco em inteligencia e magia a distancia
    {
        id: 'goblin_xama',
        family: 'goblin',
        catalogId: '0501000047',
        name: 'Goblin Xamã',
        icon: '👺',
        svgIcon: { shape: 'goblin-head', palette: 'arcane' },
        level: 8,
        xpReward: 75,
        hp: 58,
        pa: 7,
        pm: 3,
        stats: { strength: 8, intelligence: 16, agility: 9, wisdom: 10, luck: 10 },
        block: 3,
        dodge: 8,
        initiative: 15,
        resistances: { neutral: 2, fire: 5, water: -4, earth: 2, air: 4 },
        aiType: 'defensive_ranged',
        spells: ['monster_rajada_magica', 'monster_arremesso_pedra', 'monster_golpe_furtivo'],
        drops: [
            { itemId: 'recurso_orelha_goblin', quantity: 1, chance: 55 },
            { itemId: 'recurso_amuleto_goblin', quantity: 1, chance: 25 },
            { itemId: 'recurso_coroa_chefe_goblin', quantity: 1, chance: 6 }
        ]
    },
    // Goblin Trambiqueiro — trapaceiro, muita sorte, imprevisivel
    {
        id: 'goblin_chefe',
        family: 'goblin',
        catalogId: '0501000048',
        name: 'Goblin Trambiqueiro',
        icon: '👺',
        svgIcon: { shape: 'goblin-head', palette: 'gold' },
        level: 8,
        xpReward: 75,
        hp: 65,
        pa: 7,
        pm: 4,
        stats: { strength: 10, intelligence: 8, agility: 13, wisdom: 6, luck: 15 },
        block: 4,
        dodge: 10,
        initiative: 16,
        resistances: { neutral: 1, fire: 4, water: -3, earth: 1, air: 3 },
        aiType: 'aggressive_melee',
        spells: ['monster_golpe_furtivo', 'monster_arremesso_pedra', 'monster_arranhar'],
        drops: [
            { itemId: 'recurso_orelha_goblin', quantity: 1, chance: 55 },
            { itemId: 'recurso_amuleto_goblin', quantity: 1, chance: 25 },
            { itemId: 'recurso_coroa_chefe_goblin', quantity: 1, chance: 6 }
        ]
    },

    // ============================================================
    //  FAIXA 3 — NÍVEL 12-20
    // ============================================================

    // --------------------------------------------------
    //  F13: URSO 🐻 — Variantes laterais (~nv16)
    // --------------------------------------------------
    // Urso Pardo: variante equilibrada, boa mistura de ataque e defesa
    {
        id: 'urso_pardo',
        family: 'urso',
        catalogId: '0501000049',
        name: 'Urso Pardo',
        icon: '🐻',
        svgIcon: { shape: 'bear-head', palette: 'leather' },
        level: 16,
        xpReward: 170,
        hp: 270,
        pa: 7,
        pm: 3,
        stats: { strength: 38, intelligence: 5, agility: 13, wisdom: 7, luck: 12 },
        block: 10,
        dodge: 6,
        initiative: 16,
        resistances: { neutral: 5, fire: -8, water: 5, earth: 14, air: 0 },
        aiType: 'aggressive_melee',
        spells: ['monster_patada', 'monster_investida_brutal', 'monster_rugido'],
        drops: [
            { itemId: 'recurso_pele_urso', quantity: 1, chance: 55 },
            { itemId: 'recurso_garra_urso', quantity: 1, chance: 25 },
            { itemId: 'recurso_essencia_forca', quantity: 1, chance: 6 }
        ]
    },
    // Urso Negro: variante agil, rapido e esquivo
    {
        id: 'urso_furioso',
        family: 'urso',
        catalogId: '0501000050',
        name: 'Urso Negro',
        icon: '🐻',
        svgIcon: { shape: 'bear-head', palette: 'ember' },
        level: 16,
        xpReward: 170,
        hp: 240,
        pa: 7,
        pm: 4,
        stats: { strength: 34, intelligence: 5, agility: 18, wisdom: 7, luck: 14 },
        block: 5,
        dodge: 10,
        initiative: 20,
        resistances: { neutral: 4, fire: -8, water: 6, earth: 12, air: 3 },
        aiType: 'aggressive_melee',
        spells: ['monster_patada', 'monster_investida_brutal'],
        drops: [
            { itemId: 'recurso_pele_urso', quantity: 1, chance: 55 },
            { itemId: 'recurso_garra_urso', quantity: 1, chance: 25 },
            { itemId: 'recurso_essencia_forca', quantity: 1, chance: 6 }
        ]
    },
    // Urso da Caverna: mega tanque, lento mas extremamente resistente
    {
        id: 'urso_caverna',
        family: 'urso',
        catalogId: '0501000051',
        name: 'Urso da Caverna',
        icon: '🐻',
        svgIcon: { shape: 'bear-head', palette: 'iron' },
        level: 16,
        xpReward: 170,
        hp: 320,
        pa: 6,
        pm: 2,
        stats: { strength: 42, intelligence: 4, agility: 10, wisdom: 8, luck: 10 },
        block: 15,
        dodge: 4,
        initiative: 12,
        resistances: { neutral: 8, fire: -10, water: 5, earth: 18, air: 0 },
        aiType: 'aggressive_melee',
        spells: ['monster_esmagar', 'monster_patada', 'monster_rugido'],
        drops: [
            { itemId: 'recurso_pele_urso', quantity: 1, chance: 55 },
            { itemId: 'recurso_garra_urso', quantity: 1, chance: 25 },
            { itemId: 'recurso_essencia_forca', quantity: 1, chance: 6 }
        ]
    },
    // Urso Polar: variante agua/gelo, mais sabio e magicamente resistente
    {
        id: 'urso_primordial',
        family: 'urso',
        catalogId: '0501000052',
        name: 'Urso Polar',
        icon: '🐻',
        svgIcon: { shape: 'bear-head', palette: 'gold' },
        level: 16,
        xpReward: 170,
        hp: 260,
        pa: 7,
        pm: 3,
        stats: { strength: 35, intelligence: 10, agility: 12, wisdom: 10, luck: 12 },
        block: 8,
        dodge: 5,
        initiative: 15,
        resistances: { neutral: 3, fire: -6, water: 14, earth: 8, air: 2 },
        aiType: 'aggressive_melee',
        spells: ['monster_patada', 'monster_rugido', 'monster_esmagar'],
        drops: [
            { itemId: 'recurso_pele_urso', quantity: 1, chance: 55 },
            { itemId: 'recurso_garra_urso', quantity: 1, chance: 25 },
            { itemId: 'recurso_essencia_forca', quantity: 1, chance: 6 }
        ]
    },

    // --------------------------------------------------
    //  F14: TROLL 👹 — Variantes laterais (~nv16)
    // --------------------------------------------------
    // Troll Musgoso: coberto de musgo, alinhado com agua, sabio
    {
        id: 'troll_jovem',
        family: 'troll',
        catalogId: '0501000053',
        name: 'Troll Musgoso',
        icon: '👹',
        svgIcon: { shape: 'troll-head', palette: 'nature' },
        level: 16,
        xpReward: 170,
        hp: 290,
        pa: 6,
        pm: 2,
        stats: { strength: 38, intelligence: 6, agility: 8, wisdom: 14, luck: 7 },
        block: 12,
        dodge: 3,
        initiative: 9,
        resistances: { neutral: 7, fire: -18, water: 12, earth: 12, air: 0 },
        aiType: 'aggressive_melee',
        spells: ['monster_porretada', 'monster_soco_brutal'],
        drops: [
            { itemId: 'recurso_pele_troll', quantity: 1, chance: 55 },
            { itemId: 'recurso_sangue_troll', quantity: 1, chance: 25 },
            { itemId: 'recurso_coracao_troll_rei', quantity: 1, chance: 6 }
        ]
    },
    // Troll Pantanoso: variante equilibrada, bom em tudo
    {
        id: 'troll_pantanoso',
        family: 'troll',
        catalogId: '0501000054',
        name: 'Troll Pantanoso',
        icon: '👹',
        svgIcon: { shape: 'troll-head', palette: 'jade' },
        level: 16,
        xpReward: 170,
        hp: 280,
        pa: 6,
        pm: 2,
        stats: { strength: 40, intelligence: 5, agility: 9, wisdom: 12, luck: 8 },
        block: 14,
        dodge: 4,
        initiative: 10,
        resistances: { neutral: 8, fire: -16, water: 10, earth: 14, air: 0 },
        aiType: 'aggressive_melee',
        spells: ['monster_porretada', 'monster_arremesso_rocha', 'monster_soco_brutal'],
        drops: [
            { itemId: 'recurso_pele_troll', quantity: 1, chance: 55 },
            { itemId: 'recurso_sangue_troll', quantity: 1, chance: 25 },
            { itemId: 'recurso_coracao_troll_rei', quantity: 1, chance: 6 }
        ]
    },
    // Troll Pedregoso: pele de rocha, bloqueio altissimo, lento
    {
        id: 'troll_guerreiro',
        family: 'troll',
        catalogId: '0501000055',
        name: 'Troll Pedregoso',
        icon: '👹',
        svgIcon: { shape: 'troll-head', palette: 'iron' },
        level: 16,
        xpReward: 170,
        hp: 340,
        pa: 6,
        pm: 2,
        stats: { strength: 35, intelligence: 4, agility: 6, wisdom: 12, luck: 5 },
        block: 20,
        dodge: 2,
        initiative: 6,
        resistances: { neutral: 10, fire: -16, water: 5, earth: 20, air: 0 },
        aiType: 'aggressive_melee',
        spells: ['monster_porretada', 'monster_esmagar', 'monster_arremesso_rocha'],
        drops: [
            { itemId: 'recurso_pele_troll', quantity: 1, chance: 55 },
            { itemId: 'recurso_sangue_troll', quantity: 1, chance: 25 },
            { itemId: 'recurso_coracao_troll_rei', quantity: 1, chance: 6 }
        ]
    },
    // Troll Flamejante: variante de fogo, perfil elemental diferente
    {
        id: 'troll_rei',
        family: 'troll',
        catalogId: '0501000056',
        name: 'Troll Flamejante',
        icon: '👹',
        svgIcon: { shape: 'troll-head', palette: 'gold' },
        level: 16,
        xpReward: 170,
        hp: 250,
        pa: 7,
        pm: 3,
        stats: { strength: 40, intelligence: 10, agility: 9, wisdom: 8, luck: 8 },
        block: 10,
        dodge: 4,
        initiative: 11,
        resistances: { neutral: 5, fire: 8, water: -12, earth: 10, air: 3 },
        aiType: 'aggressive_melee',
        spells: ['monster_porretada', 'monster_arremesso_rocha', 'monster_esmagar'],
        drops: [
            { itemId: 'recurso_pele_troll', quantity: 1, chance: 55 },
            { itemId: 'recurso_sangue_troll', quantity: 1, chance: 25 },
            { itemId: 'recurso_coracao_troll_rei', quantity: 1, chance: 6 }
        ]
    },

    // --------------------------------------------------
    //  F15: GOLEM 🗿 — Variantes laterais (~nv16)
    // --------------------------------------------------
    // Golem de Pedra: tanque equilibrado, boa defesa geral
    {
        id: 'golem_pedra',
        family: 'golem',
        catalogId: '0501000057',
        name: 'Golem de Pedra',
        icon: '🗿',
        svgIcon: { shape: 'golem-head', palette: 'iron' },
        level: 16,
        xpReward: 170,
        hp: 300,
        pa: 6,
        pm: 2,
        stats: { strength: 34, intelligence: 6, agility: 5, wisdom: 5, luck: 5 },
        block: 22,
        dodge: 0,
        initiative: 5,
        resistances: { neutral: 10, fire: -10, water: -8, earth: 25, air: -5 },
        aiType: 'aggressive_melee',
        spells: ['monster_soco_rochoso', 'monster_arremesso_rocha'],
        drops: [
            { itemId: 'recurso_fragmento_pedra', quantity: 1, chance: 55 },
            { itemId: 'recurso_nucleo_golem', quantity: 1, chance: 25 },
            { itemId: 'recurso_cristal_golem_anciao', quantity: 1, chance: 6 }
        ]
    },
    // Golem de Ferro: bloqueio maximo, o mais resistente fisicamente
    {
        id: 'golem_ferro',
        family: 'golem',
        catalogId: '0501000058',
        name: 'Golem de Ferro',
        icon: '🗿',
        svgIcon: { shape: 'golem-head', palette: 'silver' },
        level: 16,
        xpReward: 170,
        hp: 340,
        pa: 6,
        pm: 2,
        stats: { strength: 38, intelligence: 5, agility: 4, wisdom: 4, luck: 4 },
        block: 28,
        dodge: 0,
        initiative: 4,
        resistances: { neutral: 14, fire: -12, water: -10, earth: 30, air: -6 },
        aiType: 'aggressive_melee',
        spells: ['monster_soco_rochoso', 'monster_esmagar'],
        drops: [
            { itemId: 'recurso_fragmento_pedra', quantity: 1, chance: 55 },
            { itemId: 'recurso_nucleo_golem', quantity: 1, chance: 25 },
            { itemId: 'recurso_cristal_golem_anciao', quantity: 1, chance: 6 }
        ]
    },
    // Golem de Cristal: hibrido magico, usa rajada cristalina
    {
        id: 'golem_cristal',
        family: 'golem',
        catalogId: '0501000059',
        name: 'Golem de Cristal',
        icon: '🗿',
        svgIcon: { shape: 'golem-head', palette: 'arcane' },
        level: 16,
        xpReward: 170,
        hp: 260,
        pa: 7,
        pm: 2,
        stats: { strength: 30, intelligence: 14, agility: 5, wisdom: 8, luck: 6 },
        block: 18,
        dodge: 0,
        initiative: 6,
        resistances: { neutral: 12, fire: -6, water: -5, earth: 22, air: 0 },
        aiType: 'aggressive_melee',
        spells: ['monster_rajada_cristal', 'monster_soco_rochoso', 'monster_arremesso_rocha'],
        drops: [
            { itemId: 'recurso_fragmento_pedra', quantity: 1, chance: 55 },
            { itemId: 'recurso_nucleo_golem', quantity: 1, chance: 25 },
            { itemId: 'recurso_cristal_golem_anciao', quantity: 1, chance: 6 }
        ]
    },
    // Golem de Obsidiana: ofensivo, forca bruta elevada
    {
        id: 'golem_anciao',
        family: 'golem',
        catalogId: '0501000060',
        name: 'Golem de Obsidiana',
        icon: '🗿',
        svgIcon: { shape: 'golem-head', palette: 'gold' },
        level: 16,
        xpReward: 170,
        hp: 280,
        pa: 7,
        pm: 2,
        stats: { strength: 42, intelligence: 8, agility: 5, wisdom: 6, luck: 5 },
        block: 24,
        dodge: 0,
        initiative: 5,
        resistances: { neutral: 10, fire: -5, water: -8, earth: 28, air: -3 },
        aiType: 'aggressive_melee',
        spells: ['monster_soco_rochoso', 'monster_esmagar', 'monster_arremesso_rocha'],
        drops: [
            { itemId: 'recurso_fragmento_pedra', quantity: 1, chance: 55 },
            { itemId: 'recurso_nucleo_golem', quantity: 1, chance: 25 },
            { itemId: 'recurso_cristal_golem_anciao', quantity: 1, chance: 6 }
        ]
    },

    // --------------------------------------------------
    //  F16: HARPIA 🦅 — Variantes laterais (~nv16)
    // --------------------------------------------------
    // Harpia Cinzenta: variante equilibrada, misto de corpo-a-corpo e magia
    {
        id: 'harpia_jovem',
        family: 'harpia',
        catalogId: '0501000061',
        name: 'Harpia Cinzenta',
        icon: '🦅',
        svgIcon: { shape: 'harpy-head', palette: 'leather' },
        level: 16,
        xpReward: 170,
        hp: 200,
        pa: 7,
        pm: 5,
        stats: { strength: 22, intelligence: 14, agility: 26, wisdom: 10, luck: 14 },
        block: 2,
        dodge: 20,
        initiative: 30,
        resistances: { neutral: 2, fire: 4, water: 2, earth: -14, air: 22 },
        aiType: 'defensive_ranged',
        spells: ['monster_garras_vento', 'monster_grito_sonico_forte'],
        drops: [
            { itemId: 'recurso_pluma_harpia', quantity: 1, chance: 55 },
            { itemId: 'recurso_garra_harpia', quantity: 1, chance: 25 },
            { itemId: 'recurso_coroa_rainha_harpia', quantity: 1, chance: 6 }
        ]
    },
    // Harpia Cacadora: agil melee, a mais rapida e esquiva
    {
        id: 'harpia_cacadora',
        family: 'harpia',
        catalogId: '0501000062',
        name: 'Harpia Caçadora',
        icon: '🦅',
        svgIcon: { shape: 'harpy-head', palette: 'nature' },
        level: 16,
        xpReward: 170,
        hp: 180,
        pa: 7,
        pm: 6,
        stats: { strength: 26, intelligence: 12, agility: 30, wisdom: 8, luck: 12 },
        block: 0,
        dodge: 24,
        initiative: 34,
        resistances: { neutral: 0, fire: 5, water: 0, earth: -16, air: 25 },
        aiType: 'aggressive_melee',
        spells: ['monster_garras_vento', 'monster_rajada_ar'],
        drops: [
            { itemId: 'recurso_pluma_harpia', quantity: 1, chance: 55 },
            { itemId: 'recurso_garra_harpia', quantity: 1, chance: 25 },
            { itemId: 'recurso_coroa_rainha_harpia', quantity: 1, chance: 6 }
        ]
    },
    // Harpia das Nuvens: conjuradora pura, foco em inteligencia e magias a distancia
    {
        id: 'harpia_matriarca',
        family: 'harpia',
        catalogId: '0501000063',
        name: 'Harpia das Nuvens',
        icon: '🦅',
        svgIcon: { shape: 'harpy-head', palette: 'silver' },
        level: 16,
        xpReward: 170,
        hp: 190,
        pa: 7,
        pm: 5,
        stats: { strength: 18, intelligence: 20, agility: 24, wisdom: 14, luck: 12 },
        block: 0,
        dodge: 18,
        initiative: 28,
        resistances: { neutral: 3, fire: 2, water: 5, earth: -14, air: 28 },
        aiType: 'defensive_ranged',
        spells: ['monster_grito_sonico_forte', 'monster_rajada_ar'],
        drops: [
            { itemId: 'recurso_pluma_harpia', quantity: 1, chance: 55 },
            { itemId: 'recurso_garra_harpia', quantity: 1, chance: 25 },
            { itemId: 'recurso_coroa_rainha_harpia', quantity: 1, chance: 6 }
        ]
    },
    // Harpia Vermelha: variante de fogo, mais fisica e agressiva
    {
        id: 'harpia_rainha',
        family: 'harpia',
        catalogId: '0501000064',
        name: 'Harpia Vermelha',
        icon: '🦅',
        svgIcon: { shape: 'harpy-head', palette: 'gold' },
        level: 16,
        xpReward: 170,
        hp: 210,
        pa: 7,
        pm: 4,
        stats: { strength: 28, intelligence: 16, agility: 22, wisdom: 10, luck: 10 },
        block: 4,
        dodge: 16,
        initiative: 26,
        resistances: { neutral: 3, fire: 10, water: -3, earth: -12, air: 18 },
        aiType: 'aggressive_melee',
        spells: ['monster_garras_vento', 'monster_grito_sonico_forte', 'monster_rajada_ar'],
        drops: [
            { itemId: 'recurso_pluma_harpia', quantity: 1, chance: 55 },
            { itemId: 'recurso_garra_harpia', quantity: 1, chance: 25 },
            { itemId: 'recurso_coroa_rainha_harpia', quantity: 1, chance: 6 }
        ]
    },

    // --------------------------------------------------
    //  F17: LAGARTO 🦎 — Variantes laterais (~nv16)
    // --------------------------------------------------
    // Lagarto Rajado: variante equilibrada, bom em tudo
    {
        id: 'lagarto_batedor',
        family: 'lagarto',
        catalogId: '0501000065',
        name: 'Lagarto Rajado',
        icon: '🦎',
        svgIcon: { shape: 'lizard-head', palette: 'nature' },
        level: 16,
        xpReward: 170,
        hp: 240,
        pa: 7,
        pm: 4,
        stats: { strength: 28, intelligence: 10, agility: 18, wisdom: 8, luck: 12 },
        block: 8,
        dodge: 12,
        initiative: 18,
        resistances: { neutral: 4, fire: 14, water: -8, earth: 6, air: 0 },
        aiType: 'aggressive_melee',
        spells: ['monster_golpe_cauda', 'monster_mordida_feroz'],
        drops: [
            { itemId: 'recurso_escama_lagarto', quantity: 1, chance: 55 },
            { itemId: 'recurso_cauda_lagarto', quantity: 1, chance: 25 },
            { itemId: 'recurso_coroa_rei_lagarto', quantity: 1, chance: 6 }
        ]
    },
    // Lagarto de Fogo: focado em fogo, resistencia alta ao elemento
    {
        id: 'lagarto_guerreiro',
        family: 'lagarto',
        catalogId: '0501000066',
        name: 'Lagarto de Fogo',
        icon: '🦎',
        svgIcon: { shape: 'lizard-head', palette: 'iron' },
        level: 16,
        xpReward: 170,
        hp: 220,
        pa: 7,
        pm: 4,
        stats: { strength: 32, intelligence: 12, agility: 16, wisdom: 6, luck: 10 },
        block: 6,
        dodge: 10,
        initiative: 20,
        resistances: { neutral: 3, fire: 18, water: -12, earth: 4, air: 2 },
        aiType: 'aggressive_melee',
        spells: ['monster_mordida_feroz', 'monster_cuspe_acido'],
        drops: [
            { itemId: 'recurso_escama_lagarto', quantity: 1, chance: 55 },
            { itemId: 'recurso_cauda_lagarto', quantity: 1, chance: 25 },
            { itemId: 'recurso_coroa_rei_lagarto', quantity: 1, chance: 6 }
        ]
    },
    // Lagarto Xama: conjurador, alta inteligencia e sabedoria
    {
        id: 'lagarto_xama',
        family: 'lagarto',
        catalogId: '0501000067',
        name: 'Lagarto Xamã',
        icon: '🦎',
        svgIcon: { shape: 'lizard-head', palette: 'arcane' },
        level: 16,
        xpReward: 170,
        hp: 200,
        pa: 7,
        pm: 3,
        stats: { strength: 20, intelligence: 24, agility: 14, wisdom: 14, luck: 14 },
        block: 6,
        dodge: 10,
        initiative: 20,
        resistances: { neutral: 5, fire: 12, water: -8, earth: 6, air: 5 },
        aiType: 'defensive_ranged',
        spells: ['monster_rajada_magica_forte', 'monster_cuspe_acido', 'monster_golpe_cauda'],
        drops: [
            { itemId: 'recurso_escama_lagarto', quantity: 1, chance: 55 },
            { itemId: 'recurso_cauda_lagarto', quantity: 1, chance: 25 },
            { itemId: 'recurso_coroa_rei_lagarto', quantity: 1, chance: 6 }
        ]
    },
    // Lagarto Encouracado: tanque blindado, mais HP e bloqueio
    {
        id: 'lagarto_rei',
        family: 'lagarto',
        catalogId: '0501000068',
        name: 'Lagarto Encouraçado',
        icon: '🦎',
        svgIcon: { shape: 'lizard-head', palette: 'gold' },
        level: 16,
        xpReward: 170,
        hp: 280,
        pa: 6,
        pm: 3,
        stats: { strength: 26, intelligence: 8, agility: 14, wisdom: 10, luck: 10 },
        block: 14,
        dodge: 8,
        initiative: 14,
        resistances: { neutral: 8, fire: 10, water: -10, earth: 10, air: 0 },
        aiType: 'aggressive_melee',
        spells: ['monster_golpe_cauda', 'monster_mordida_feroz', 'monster_cuspe_acido'],
        drops: [
            { itemId: 'recurso_escama_lagarto', quantity: 1, chance: 55 },
            { itemId: 'recurso_cauda_lagarto', quantity: 1, chance: 25 },
            { itemId: 'recurso_coroa_rei_lagarto', quantity: 1, chance: 6 }
        ]
    },

    // --------------------------------------------------
    //  F18: OGRO 👹 — Variantes laterais (~nv16)
    // --------------------------------------------------
    // Ogro Barrigudo: gordo e lento, HP altissimo
    {
        id: 'ogro',
        family: 'ogro',
        catalogId: '0501000069',
        name: 'Ogro Barrigudo',
        icon: '👹',
        svgIcon: { shape: 'ogre-head', palette: 'leather' },
        level: 16,
        xpReward: 170,
        hp: 320,
        pa: 6,
        pm: 2,
        stats: { strength: 38, intelligence: 3, agility: 6, wisdom: 5, luck: 5 },
        block: 14,
        dodge: 2,
        initiative: 7,
        resistances: { neutral: 8, fire: 4, water: 2, earth: 14, air: -10 },
        aiType: 'aggressive_melee',
        spells: ['monster_porretada', 'monster_soco_brutal'],
        drops: [
            { itemId: 'recurso_dente_ogro', quantity: 1, chance: 55 },
            { itemId: 'recurso_cinto_ogro', quantity: 1, chance: 25 },
            { itemId: 'recurso_olho_chefe_ogro', quantity: 1, chance: 6 }
        ]
    },
    // Ogro Guerreiro: guerreiro equilibrado, versatil
    {
        id: 'ogro_guerreiro',
        family: 'ogro',
        catalogId: '0501000070',
        name: 'Ogro Guerreiro',
        icon: '👹',
        svgIcon: { shape: 'ogre-head', palette: 'iron' },
        level: 16,
        xpReward: 170,
        hp: 270,
        pa: 7,
        pm: 3,
        stats: { strength: 42, intelligence: 3, agility: 8, wisdom: 5, luck: 6 },
        block: 12,
        dodge: 3,
        initiative: 9,
        resistances: { neutral: 7, fire: 5, water: 2, earth: 12, air: -8 },
        aiType: 'aggressive_melee',
        spells: ['monster_porretada', 'monster_esmagar', 'monster_arremesso_rocha'],
        drops: [
            { itemId: 'recurso_dente_ogro', quantity: 1, chance: 55 },
            { itemId: 'recurso_cinto_ogro', quantity: 1, chance: 25 },
            { itemId: 'recurso_olho_chefe_ogro', quantity: 1, chance: 6 }
        ]
    },
    // Ogro Matador: canhao de vidro, forca absurda mas fragil
    {
        id: 'ogro_matador',
        family: 'ogro',
        catalogId: '0501000071',
        name: 'Ogro Matador',
        icon: '👹',
        svgIcon: { shape: 'ogre-head', palette: 'blood' },
        level: 16,
        xpReward: 170,
        hp: 240,
        pa: 7,
        pm: 3,
        stats: { strength: 50, intelligence: 3, agility: 10, wisdom: 4, luck: 6 },
        block: 8,
        dodge: 3,
        initiative: 10,
        resistances: { neutral: 5, fire: 6, water: 0, earth: 10, air: -10 },
        aiType: 'aggressive_melee',
        spells: ['monster_esmagar', 'monster_soco_brutal'],
        drops: [
            { itemId: 'recurso_dente_ogro', quantity: 1, chance: 55 },
            { itemId: 'recurso_cinto_ogro', quantity: 1, chance: 25 },
            { itemId: 'recurso_olho_chefe_ogro', quantity: 1, chance: 6 }
        ]
    },
    // Ogro Caolho: um olho so, tanque resistente
    {
        id: 'ogro_chefe',
        family: 'ogro',
        catalogId: '0501000072',
        name: 'Ogro Caolho',
        icon: '👹',
        svgIcon: { shape: 'ogre-head', palette: 'gold' },
        level: 16,
        xpReward: 170,
        hp: 280,
        pa: 6,
        pm: 2,
        stats: { strength: 44, intelligence: 4, agility: 7, wisdom: 6, luck: 7 },
        block: 16,
        dodge: 2,
        initiative: 8,
        resistances: { neutral: 10, fire: 3, water: 3, earth: 16, air: -12 },
        aiType: 'aggressive_melee',
        spells: ['monster_porretada', 'monster_arremesso_rocha', 'monster_soco_brutal'],
        drops: [
            { itemId: 'recurso_dente_ogro', quantity: 1, chance: 55 },
            { itemId: 'recurso_cinto_ogro', quantity: 1, chance: 25 },
            { itemId: 'recurso_olho_chefe_ogro', quantity: 1, chance: 6 }
        ]
    },

    // ============================================================
    //  ESPANTALHO (DUMMY)
    // ============================================================
    {
        id: 'espantalho',
        family: 'dummy',
        catalogId: '0599999999',
        name: 'Espantalho',
        icon: '🎯',
        svgIcon: { shape: 'scarecrow', palette: 'wood' },
        level: 1,
        xpReward: 0,
        hp: 100000,
        pa: 30,
        pm: 10,
        stats: { strength: 1, intelligence: 1, agility: 1, wisdom: 0, luck: 0 },
        block: 0,
        dodge: 0,
        initiative: 0,
        resistances: { neutral: 0, fire: 0, water: 0, earth: 0, air: 0 },
        aiType: 'dummy',
        spells: [],
        drops: []
    }
];

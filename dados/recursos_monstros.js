// ========== RECURSOS DROPADOS POR MONSTROS + PROFISSÕES + GENÉRICOS ==========

const DB_RECURSOS_MONSTROS = [

    // ═══════════════════════════════════════════════════════════════
    //  SEÇÃO 1: RECURSOS DE MONSTROS (54 total — 18 famílias × 3)
    // ═══════════════════════════════════════════════════════════════

    // === F1: RATO ===
    {
        id: 'recurso_rabo_rato',
        catalogId: '0301000200',
        name: 'Rabo de Rato',
        icon: '🐀',
        svgIcon: { shape: 'rat-tail', palette: 'leather' },
        category: 'resource',
        stackable: true,
        maxStack: 99
    },
    {
        id: 'recurso_dente_rato',
        catalogId: '0301000201',
        name: 'Dente de Rato',
        icon: '🦷',
        svgIcon: { shape: 'rat-tooth', palette: 'bone' },
        category: 'resource',
        stackable: true,
        maxStack: 50,
        rarity: 'incomum'
    },
    {
        id: 'recurso_bigode_rei_rato',
        catalogId: '0301000202',
        name: 'Bigode do Rei',
        icon: '👑',
        svgIcon: { shape: 'rat-king-whisker', palette: 'gold' },
        category: 'resource',
        stackable: true,
        maxStack: 10,
        rarity: 'raro'
    },

    // === F2: BARATA ===
    {
        id: 'recurso_casca_barata',
        catalogId: '0301000210',
        name: 'Casca de Barata',
        icon: '🪳',
        svgIcon: { shape: 'roach-shell', palette: 'leather' },
        category: 'resource',
        stackable: true,
        maxStack: 99
    },
    {
        id: 'recurso_antena_barata',
        catalogId: '0301000211',
        name: 'Antena de Barata',
        icon: '📡',
        svgIcon: { shape: 'roach-antenna', palette: 'nature' },
        category: 'resource',
        stackable: true,
        maxStack: 50,
        rarity: 'incomum'
    },
    {
        id: 'recurso_glandula_rainha_barata',
        catalogId: '0301000212',
        name: 'Glândula da Rainha',
        icon: '🧬',
        svgIcon: { shape: 'roach-queen-gland', palette: 'venom' },
        category: 'resource',
        stackable: true,
        maxStack: 10,
        rarity: 'raro'
    },

    // === F3: COGUMELO ===
    {
        id: 'recurso_esporo_cogumelo',
        catalogId: '0301000220',
        name: 'Esporo de Cogumelo',
        icon: '🍄',
        svgIcon: { shape: 'mushroom-spore', palette: 'nature' },
        category: 'resource',
        stackable: true,
        maxStack: 99
    },
    {
        id: 'recurso_chapeu_cogumelo',
        catalogId: '0301000221',
        name: 'Chapéu de Cogumelo',
        icon: '🎩',
        svgIcon: { shape: 'mushroom-cap', palette: 'ember' },
        category: 'resource',
        stackable: true,
        maxStack: 50,
        rarity: 'incomum'
    },
    {
        id: 'recurso_micelio_anciao',
        catalogId: '0301000222',
        name: 'Micélio do Ancião',
        icon: '🌀',
        svgIcon: { shape: 'mushroom-elder-mycelium', palette: 'arcane' },
        category: 'resource',
        stackable: true,
        maxStack: 10,
        rarity: 'raro'
    },

    // === F4: SAPO ===
    {
        id: 'recurso_gosma_sapo',
        catalogId: '0301000230',
        name: 'Gosma de Sapo',
        icon: '🐸',
        svgIcon: { shape: 'frog-slime', palette: 'nature' },
        category: 'resource',
        stackable: true,
        maxStack: 99
    },
    {
        id: 'recurso_lingua_sapo',
        catalogId: '0301000231',
        name: 'Língua de Sapo',
        icon: '👅',
        svgIcon: { shape: 'frog-tongue', palette: 'jade' },
        category: 'resource',
        stackable: true,
        maxStack: 50,
        rarity: 'incomum'
    },
    {
        id: 'recurso_olho_patriarca_sapo',
        catalogId: '0301000232',
        name: 'Olho do Patriarca',
        icon: '👁️',
        svgIcon: { shape: 'frog-patriarch-eye', palette: 'shadow' },
        category: 'resource',
        stackable: true,
        maxStack: 10,
        rarity: 'raro'
    },

    // === F5: MORCEGO ===
    {
        id: 'recurso_asa_morcego',
        catalogId: '0301000240',
        name: 'Asa de Morcego',
        icon: '🦇',
        svgIcon: { shape: 'bat-wing', palette: 'shadow' },
        category: 'resource',
        stackable: true,
        maxStack: 99
    },
    {
        id: 'recurso_presa_morcego',
        catalogId: '0301000241',
        name: 'Presa de Morcego',
        icon: '🦷',
        svgIcon: { shape: 'bat-fang', palette: 'bone' },
        category: 'resource',
        stackable: true,
        maxStack: 50,
        rarity: 'incomum'
    },
    {
        id: 'recurso_sangue_anciao_morcego',
        catalogId: '0301000242',
        name: 'Sangue do Ancião',
        icon: '🩸',
        svgIcon: { shape: 'bat-elder-blood', palette: 'blood' },
        category: 'resource',
        stackable: true,
        maxStack: 10,
        rarity: 'raro'
    },

    // === F6: PLANTA ===
    {
        id: 'recurso_raiz_viva',
        catalogId: '0301000250',
        name: 'Raiz Viva',
        icon: '🌿',
        svgIcon: { shape: 'plant-root', palette: 'nature' },
        category: 'resource',
        stackable: true,
        maxStack: 99
    },
    {
        id: 'recurso_seiva_nutritiva',
        catalogId: '0301000251',
        name: 'Seiva Nutritiva',
        icon: '🧪',
        svgIcon: { shape: 'plant-sap', palette: 'jade' },
        category: 'resource',
        stackable: true,
        maxStack: 50,
        rarity: 'incomum'
    },
    {
        id: 'recurso_semente_flora',
        catalogId: '0301000252',
        name: 'Semente da Flora',
        icon: '🌱',
        svgIcon: { shape: 'plant-flora-seed', palette: 'ember' },
        category: 'resource',
        stackable: true,
        maxStack: 10,
        rarity: 'raro'
    },

    // === F7: LOBO ===
    {
        id: 'recurso_pele_lobo',
        catalogId: '0301000260',
        name: 'Pele de Lobo',
        icon: '🐺',
        svgIcon: { shape: 'wolf-pelt', palette: 'wolf_grey' },
        category: 'resource',
        stackable: true,
        maxStack: 99
    },
    {
        id: 'recurso_presa_lobo',
        catalogId: '0301000261',
        name: 'Presa de Lobo',
        icon: '🦷',
        svgIcon: { shape: 'wolf-fang', palette: 'bone' },
        category: 'resource',
        stackable: true,
        maxStack: 50,
        rarity: 'incomum'
    },
    {
        id: 'recurso_essencia_lobo',
        catalogId: '0301000262',
        name: 'Essência de Lobo',
        icon: '💧',
        svgIcon: { shape: 'wolf-essence', palette: 'shadow' },
        category: 'resource',
        stackable: true,
        maxStack: 10,
        rarity: 'raro'
    },

    // === F8: ARANHA ===
    {
        id: 'recurso_teia_aranha',
        catalogId: '0301000270',
        name: 'Teia de Aranha',
        icon: '🕸️',
        svgIcon: { shape: 'spider-web', palette: 'shadow' },
        category: 'resource',
        stackable: true,
        maxStack: 99
    },
    {
        id: 'recurso_glandula_venenosa',
        catalogId: '0301000271',
        name: 'Glândula Venenosa',
        icon: '☠️',
        svgIcon: { shape: 'spider-venom-gland', palette: 'venom' },
        category: 'resource',
        stackable: true,
        maxStack: 50,
        rarity: 'incomum'
    },
    {
        id: 'recurso_presas_viuva',
        catalogId: '0301000272',
        name: 'Presas da Viúva',
        icon: '🕷️',
        svgIcon: { shape: 'spider-widow-fangs', palette: 'void' },
        category: 'resource',
        stackable: true,
        maxStack: 10,
        rarity: 'raro'
    },

    // === F9: JAVALI ===
    {
        id: 'recurso_presa_javali',
        catalogId: '0301000280',
        name: 'Presa de Javali',
        icon: '🐗',
        svgIcon: { shape: 'boar-tusk', palette: 'leather' },
        category: 'resource',
        stackable: true,
        maxStack: 99
    },
    {
        id: 'recurso_couro_javali',
        catalogId: '0301000281',
        name: 'Couro de Javali',
        icon: '🟤',
        svgIcon: { shape: 'boar-hide', palette: 'bear_brown' },
        category: 'resource',
        stackable: true,
        maxStack: 50,
        rarity: 'incomum'
    },
    {
        id: 'recurso_coracao_patriarca_javali',
        catalogId: '0301000282',
        name: 'Coração do Patriarca',
        icon: '❤️',
        svgIcon: { shape: 'boar-patriarch-heart', palette: 'blood' },
        category: 'resource',
        stackable: true,
        maxStack: 10,
        rarity: 'raro'
    },

    // === F10: ESQUELETO ===
    {
        id: 'recurso_osso_polido',
        catalogId: '0301000290',
        name: 'Osso Polido',
        icon: '🦴',
        svgIcon: { shape: 'skeleton-bone', palette: 'bone' },
        category: 'resource',
        stackable: true,
        maxStack: 99
    },
    {
        id: 'recurso_cranio_intacto',
        catalogId: '0301000291',
        name: 'Crânio Intacto',
        icon: '💀',
        svgIcon: { shape: 'skeleton-skull', palette: 'bone' },
        category: 'resource',
        stackable: true,
        maxStack: 50,
        rarity: 'incomum'
    },
    {
        id: 'recurso_essencia_morte',
        catalogId: '0301000292',
        name: 'Essência da Morte',
        icon: '☠️',
        svgIcon: { shape: 'skeleton-death-essence', palette: 'shadow' },
        category: 'resource',
        stackable: true,
        maxStack: 10,
        rarity: 'raro'
    },

    // === F11: COBRA ===
    {
        id: 'recurso_escama_cobra',
        catalogId: '0301000300',
        name: 'Escama de Cobra',
        icon: '🐍',
        svgIcon: { shape: 'snake-scale', palette: 'nature' },
        category: 'resource',
        stackable: true,
        maxStack: 99
    },
    {
        id: 'recurso_veneno_cobra',
        catalogId: '0301000301',
        name: 'Veneno de Cobra',
        icon: '🧪',
        svgIcon: { shape: 'snake-venom', palette: 'venom' },
        category: 'resource',
        stackable: true,
        maxStack: 50,
        rarity: 'incomum'
    },
    {
        id: 'recurso_olho_serpente',
        catalogId: '0301000302',
        name: 'Olho da Serpente',
        icon: '👁️',
        svgIcon: { shape: 'snake-serpent-eye', palette: 'ember' },
        category: 'resource',
        stackable: true,
        maxStack: 10,
        rarity: 'raro'
    },

    // === F12: GOBLIN ===
    {
        id: 'recurso_orelha_goblin',
        catalogId: '0301000310',
        name: 'Orelha de Goblin',
        icon: '👂',
        svgIcon: { shape: 'goblin-ear', palette: 'nature' },
        category: 'resource',
        stackable: true,
        maxStack: 99
    },
    {
        id: 'recurso_amuleto_goblin',
        catalogId: '0301000311',
        name: 'Amuleto Goblin',
        icon: '📿',
        svgIcon: { shape: 'goblin-amulet', palette: 'gold' },
        category: 'resource',
        stackable: true,
        maxStack: 50,
        rarity: 'incomum'
    },
    {
        id: 'recurso_coroa_chefe_goblin',
        catalogId: '0301000312',
        name: 'Coroa do Chefe',
        icon: '👑',
        svgIcon: { shape: 'goblin-chief-crown', palette: 'gold' },
        category: 'resource',
        stackable: true,
        maxStack: 10,
        rarity: 'raro'
    },

    // === F13: URSO ===
    {
        id: 'recurso_pele_urso',
        catalogId: '0301000320',
        name: 'Pele de Urso',
        icon: '🐻',
        svgIcon: { shape: 'bear-pelt', palette: 'bear_brown' },
        category: 'resource',
        stackable: true,
        maxStack: 99
    },
    {
        id: 'recurso_garra_urso',
        catalogId: '0301000321',
        name: 'Garra de Urso',
        icon: '🐾',
        svgIcon: { shape: 'bear-claw', palette: 'bear_brown' },
        category: 'resource',
        stackable: true,
        maxStack: 50,
        rarity: 'incomum'
    },
    {
        id: 'recurso_essencia_forca',
        catalogId: '0301000322',
        name: 'Essência da Força',
        icon: '💪',
        svgIcon: { shape: 'bear-strength-essence', palette: 'blood' },
        category: 'resource',
        stackable: true,
        maxStack: 10,
        rarity: 'raro'
    },

    // === F14: TROLL ===
    {
        id: 'recurso_pele_troll',
        catalogId: '0301000330',
        name: 'Pele de Troll',
        icon: '🧟',
        svgIcon: { shape: 'troll-hide', palette: 'nature' },
        category: 'resource',
        stackable: true,
        maxStack: 99
    },
    {
        id: 'recurso_sangue_troll',
        catalogId: '0301000331',
        name: 'Sangue de Troll',
        icon: '🩸',
        svgIcon: { shape: 'troll-blood', palette: 'blood' },
        category: 'resource',
        stackable: true,
        maxStack: 50,
        rarity: 'incomum'
    },
    {
        id: 'recurso_coracao_troll_rei',
        catalogId: '0301000332',
        name: 'Coração do Troll Rei',
        icon: '❤️',
        svgIcon: { shape: 'troll-king-heart', palette: 'blood' },
        category: 'resource',
        stackable: true,
        maxStack: 10,
        rarity: 'raro'
    },

    // === F15: GOLEM ===
    {
        id: 'recurso_fragmento_pedra',
        catalogId: '0301000340',
        name: 'Fragmento de Pedra',
        icon: '🪨',
        svgIcon: { shape: 'golem-stone-fragment', palette: 'iron' },
        category: 'resource',
        stackable: true,
        maxStack: 99
    },
    {
        id: 'recurso_nucleo_golem',
        catalogId: '0301000341',
        name: 'Núcleo de Golem',
        icon: '🔮',
        svgIcon: { shape: 'golem-core', palette: 'iron' },
        category: 'resource',
        stackable: true,
        maxStack: 50,
        rarity: 'incomum'
    },
    {
        id: 'recurso_cristal_golem_anciao',
        catalogId: '0301000342',
        name: 'Cristal do Golem Ancião',
        icon: '💎',
        svgIcon: { shape: 'golem-elder-crystal', palette: 'crystal' },
        category: 'resource',
        stackable: true,
        maxStack: 10,
        rarity: 'raro'
    },

    // === F16: HARPIA ===
    {
        id: 'recurso_pluma_harpia',
        catalogId: '0301000350',
        name: 'Pluma de Harpia',
        icon: '🪶',
        svgIcon: { shape: 'harpy-feather', palette: 'wind' },
        category: 'resource',
        stackable: true,
        maxStack: 99
    },
    {
        id: 'recurso_garra_harpia',
        catalogId: '0301000351',
        name: 'Garra de Harpia',
        icon: '🦅',
        svgIcon: { shape: 'harpy-claw', palette: 'eagle_gold' },
        category: 'resource',
        stackable: true,
        maxStack: 50,
        rarity: 'incomum'
    },
    {
        id: 'recurso_coroa_rainha_harpia',
        catalogId: '0301000352',
        name: 'Coroa da Rainha',
        icon: '👑',
        svgIcon: { shape: 'harpy-queen-crown', palette: 'gold' },
        category: 'resource',
        stackable: true,
        maxStack: 10,
        rarity: 'raro'
    },

    // === F17: LAGARTO ===
    {
        id: 'recurso_escama_lagarto',
        catalogId: '0301000360',
        name: 'Escama de Lagarto',
        icon: '🦎',
        svgIcon: { shape: 'lizard-scale', palette: 'nature' },
        category: 'resource',
        stackable: true,
        maxStack: 99
    },
    {
        id: 'recurso_cauda_lagarto',
        catalogId: '0301000361',
        name: 'Cauda de Lagarto',
        icon: '🔗',
        svgIcon: { shape: 'lizard-tail', palette: 'nature' },
        category: 'resource',
        stackable: true,
        maxStack: 50,
        rarity: 'incomum'
    },
    {
        id: 'recurso_coroa_rei_lagarto',
        catalogId: '0301000362',
        name: 'Coroa do Rei Lagarto',
        icon: '👑',
        svgIcon: { shape: 'lizard-king-crown', palette: 'gold' },
        category: 'resource',
        stackable: true,
        maxStack: 10,
        rarity: 'raro'
    },

    // === F18: OGRO ===
    {
        id: 'recurso_dente_ogro',
        catalogId: '0301000370',
        name: 'Dente de Ogro',
        icon: '🦷',
        svgIcon: { shape: 'ogre-tooth', palette: 'leather' },
        category: 'resource',
        stackable: true,
        maxStack: 99
    },
    {
        id: 'recurso_cinto_ogro',
        catalogId: '0301000371',
        name: 'Cinto de Ogro',
        icon: '🟤',
        svgIcon: { shape: 'ogre-belt', palette: 'leather' },
        category: 'resource',
        stackable: true,
        maxStack: 50,
        rarity: 'incomum'
    },
    {
        id: 'recurso_olho_chefe_ogro',
        catalogId: '0301000372',
        name: 'Olho do Chefe',
        icon: '👁️',
        svgIcon: { shape: 'ogre-chief-eye', palette: 'blood' },
        category: 'resource',
        stackable: true,
        maxStack: 10,
        rarity: 'raro'
    },

    // ═══════════════════════════════════════════════════════════════
    //  SEÇÃO 2: REMOVIDA — Recursos de profissão agora em dados/recursos_coleta.js
    // ═══════════════════════════════════════════════════════════════

    // ═══════════════════════════════════════════════════════════════
    //  SEÇÃO 3: RECURSOS GENÉRICOS PARA CRAFT
    // ═══════════════════════════════════════════════════════════════

    {
        id: 'recurso_ferro',
        catalogId: '0301000100',
        name: 'Minério de Ferro',
        icon: '⛏️',
        svgIcon: { shape: 'iron-ore', palette: 'iron' },
        category: 'resource',
        stackable: true,
        maxStack: 99
    },
    {
        id: 'recurso_madeira',
        catalogId: '0301000101',
        name: 'Madeira',
        icon: '🪵',
        svgIcon: { shape: 'wood-log', palette: 'wood' },
        category: 'resource',
        stackable: true,
        maxStack: 99
    },
    {
        id: 'recurso_couro',
        catalogId: '0301000102',
        name: 'Couro',
        icon: '🎒',
        svgIcon: { shape: 'leather-piece', palette: 'leather' },
        category: 'resource',
        stackable: true,
        maxStack: 99
    },
    {
        id: 'recurso_aco',
        catalogId: '0301000103',
        name: 'Lingote de Aço',
        icon: '⚙️',
        svgIcon: { shape: 'steel-ingot', palette: 'steel' },
        category: 'resource',
        stackable: true,
        maxStack: 99,
        rarity: 'incomum'
    },
    {
        id: 'recurso_mithril',
        catalogId: '0301000104',
        name: 'Mithril',
        icon: '💎',
        svgIcon: { shape: 'mithril-crystal', palette: 'mithril' },
        category: 'resource',
        stackable: true,
        maxStack: 50,
        rarity: 'raro'
    },
    {
        id: 'recurso_cristal_azul',
        catalogId: '0301000105',
        name: 'Cristal Azul',
        icon: '💠',
        svgIcon: { shape: 'blue-crystal', palette: 'crystal' },
        category: 'resource',
        stackable: true,
        maxStack: 50,
        rarity: 'raro'
    },
    {
        id: 'recurso_titanio',
        catalogId: '0301000106',
        name: 'Titânio',
        icon: '⚡',
        svgIcon: { shape: 'titanium-bar', palette: 'titanium' },
        category: 'resource',
        stackable: true,
        maxStack: 20,
        rarity: 'epico'
    },
    {
        id: 'recurso_essencia_epica',
        catalogId: '0301000107',
        name: 'Essência Épica',
        icon: '✨',
        svgIcon: { shape: 'epic-essence', palette: 'epic' },
        category: 'resource',
        stackable: true,
        maxStack: 10,
        rarity: 'epico'
    },
    {
        id: 'recurso_fragmento_destino',
        catalogId: '0301000108',
        name: 'Fragmento do Destino',
        icon: '🌟',
        svgIcon: { shape: 'destiny-fragment', palette: 'destiny' },
        category: 'resource',
        stackable: true,
        maxStack: 10,
        rarity: 'lendario'
    },
    {
        id: 'recurso_essencia_lendaria',
        catalogId: '0301000109',
        name: 'Essência Lendária',
        icon: '💫',
        svgIcon: { shape: 'legendary-essence', palette: 'legendary' },
        category: 'resource',
        stackable: true,
        maxStack: 5,
        rarity: 'lendario'
    },
    {
        id: 'recurso_oleo',
        catalogId: '0301000110',
        name: 'Óleo Refinado',
        icon: '🛢️',
        svgIcon: { shape: 'oil-flask', palette: 'oil_dark' },
        category: 'resource',
        stackable: true,
        maxStack: 99
    }
];

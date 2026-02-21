// ========== ITENS COM PROGRESSÃO DE RARIDADE ==========
// COMUM → INCOMUM → RARO (versões evoluídas)
// ÉPICO e LENDÁRIO (muito mais fortes, 1 por vez)
// Todos com nivelRequerido e balanceados pelo sistema de pontos

const DB_LENDARIOS = [
    // === ESPADA DO DESTINO (5 versões) ===
    {
        id: 'prog_espada_ferro',
        catalogId: '0201PRG001',
        name: 'Espada de Ferro',
        icon: '🗡️',
        svgIcon: { shape: 'iron-sword', palette: 'iron' },
        category: 'equipment',
        stackable: true,
        maxStack: 99,
        slot: 'weapon',
        rarity: 'comum',
        nivelRequerido: 1,
        weaponType: 'sword',
        attackName: 'Corte Básico',
        damage: { pa: 4 },
        attributes: { strength: 2 }
    },
    {
        id: 'prog_espada_aco',
        catalogId: '0201PRG002',
        name: 'Espada de Aço',
        icon: '🗡️',
        svgIcon: { shape: 'steel-sword', palette: 'steel' },
        category: 'equipment',
        stackable: true,
        maxStack: 99,
        slot: 'weapon',
        rarity: 'incomum',
        nivelRequerido: 5,
        weaponType: 'sword',
        attackName: 'Golpe de Aço',
        damage: { pa: 6, pm: 1 },
        attributes: { strength: 8, agility: 4, pv: 10 }
        // Budget: 46/64 (72%)
    },
    {
        id: 'espada_mithril',
        catalogId: '0201000003',
        name: 'Espada de Mithril',
        icon: '🗡️',
        svgIcon: { shape: 'mithril-sword', palette: 'mithril' },
        category: 'equipment',
        stackable: true,
        maxStack: 99,
        slot: 'weapon',
        rarity: 'raro',
        nivelRequerido: 10,
        weaponType: 'sword',
        attackName: 'Lâmina Reluzente',
        damage: { pa: 10, pm: 3, pe: 1 },
        range: 2,
        attributes: { strength: 12, agility: 6, pv: 20, critical: 4 }
        // Budget: 106/117 (91%)
    },
    {
        id: 'espada_titanio',
        catalogId: '0201000004',
        name: 'Espada de Titânio',
        icon: '⚔️',
        svgIcon: { shape: 'titanium-sword', palette: 'titanium' },
        category: 'equipment',
        stackable: true,
        maxStack: 99,
        slot: 'weapon',
        rarity: 'epico',
        nivelRequerido: 15,
        weaponType: 'sword',
        attackName: 'Corte Devastador',
        damage: { pa: 18, pm: 6, pe: 3 },
        range: 2,
        attributes: { strength: 14, agility: 8, pv: 35, critical: 10, dodge: 5, pa: 1 }
        // Budget: 201/208 (97%)
    },
    {
        id: 'espada_destino',
        catalogId: '0201000005',
        name: 'Espada do Destino',
        icon: '⚔️',
        svgIcon: { shape: 'destiny-sword', palette: 'destiny' },
        category: 'equipment',
        stackable: true,
        maxStack: 99,
        slot: 'weapon',
        rarity: 'lendario',
        nivelRequerido: 20,
        weaponType: 'sword',
        attackName: 'Golpe do Destino',
        damage: { pa: 30, pm: 12, pe: 8 },
        range: 3,
        attributes: { strength: 25, agility: 15, pv: 60, critical: 15, dodge: 8, res_neutral: 10, res_general: 3, pa: 1 },
        habilidadeEspecial: 'Cada ataque crítico cura 10% do dano causado e ganha +2 PA no próximo turno'
        // Budget: 380/390 (97%) — Lendário com habilidade especial
    },

    // === CAPACETE DO LOBO (3 versões: comum, incomum, raro) ===
    {
        id: 'capacete_lobo_comum',
        catalogId: '0101000010',
        name: 'Capacete de Lobo',
        icon: '🐺',
        svgIcon: { shape: 'wolf-helm', palette: 'wolf_grey' },
        category: 'equipment',
        stackable: true,
        maxStack: 99,
        slot: 'helmet',
        rarity: 'comum',
        nivelRequerido: 1,
        attributes: { pv: 12, strength: 3 }
        // Budget: 21/24 (88%)
    },
    {
        id: 'capacete_lobo_incomum',
        catalogId: '0101000011',
        name: 'Capacete de Lobo Alfa',
        icon: '🐺',
        svgIcon: { shape: 'wolf-helm-alfa', palette: 'wolf_dark' },
        category: 'equipment',
        stackable: true,
        maxStack: 99,
        slot: 'helmet',
        rarity: 'incomum',
        nivelRequerido: 5,
        attributes: { pv: 15, strength: 4, agility: 2, critical: 2 }
        // Budget: 49/49 (100%)
    },
    {
        id: 'capacete_lobo_raro',
        catalogId: '0101000012',
        name: 'Capacete do Lobo Primordial',
        icon: '🐺',
        svgIcon: { shape: 'wolf-helm-prime', palette: 'wolf_prime' },
        category: 'equipment',
        stackable: true,
        maxStack: 99,
        slot: 'helmet',
        rarity: 'raro',
        nivelRequerido: 10,
        attributes: { pv: 20, strength: 6, agility: 4, critical: 3, dodge: 3 }
        // Budget: 86/90 (96%)
    },

    // === PEITORAL (5 versões) ===
    {
        id: 'prog_peitoral_couro',
        catalogId: '0102PRG001',
        name: 'Peitoral de Couro',
        icon: '🦺',
        svgIcon: { shape: 'leather-vest', palette: 'leather' },
        category: 'equipment',
        stackable: true,
        maxStack: 99,
        slot: 'chest',
        rarity: 'comum',
        nivelRequerido: 1,
        attributes: { pv: 15, block: 2, pm: 1 }
        // Budget: 23/29 (79%)
    },
    {
        id: 'peitoral_reforçado',
        catalogId: '0102000002',
        name: 'Peitoral Reforçado',
        icon: '🦺',
        svgIcon: { shape: 'reinforced-chest', palette: 'iron' },
        category: 'equipment',
        stackable: true,
        maxStack: 99,
        slot: 'chest',
        rarity: 'incomum',
        nivelRequerido: 5,
        attributes: { pv: 25, block: 3, strength: 4, pm: 1 }
        // Budget: 49/59 (83%)
    },
    {
        id: 'peitoral_escamas',
        catalogId: '0102000003',
        name: 'Peitoral de Escamas',
        icon: '🛡️',
        svgIcon: { shape: 'scale-armor', palette: 'scale' },
        category: 'equipment',
        stackable: true,
        maxStack: 99,
        slot: 'chest',
        rarity: 'raro',
        nivelRequerido: 10,
        attributes: { pv: 40, block: 5, strength: 6, agility: 3, res_water: 6, res_earth: 3, pm: 1 }
        // Budget: 105/108 (97%)
    },
    {
        id: 'armadura_draconica',
        catalogId: '0102000004',
        name: 'Armadura Dracônica',
        icon: '🛡️',
        svgIcon: { shape: 'dragon-armor', palette: 'dragon' },
        category: 'equipment',
        stackable: true,
        maxStack: 99,
        slot: 'chest',
        rarity: 'epico',
        nivelRequerido: 15,
        attributes: { pv: 55, block: 5, strength: 8, agility: 5, res_fire: 12, res_water: -6, res_general: 2, pm: 1, pa: 1 }
        // Budget: 168/168 (100%)
    },
    {
        id: 'armadura_draconiana',
        catalogId: '0102000005',
        name: 'Armadura Draconiana Ancestral',
        icon: '🛡️',
        svgIcon: { shape: 'ancestral-dragon-armor', palette: 'dragon_a' },
        category: 'equipment',
        stackable: true,
        maxStack: 99,
        slot: 'chest',
        rarity: 'lendario',
        nivelRequerido: 20,
        attributes: { pv: 80, block: 7, strength: 12, agility: 8, res_fire: 18, res_earth: 6, res_water: -10, res_general: 5, pm: 2, dodge: 6, pa: 1 },
        habilidadeEspecial: 'Reduz dano recebido em 20% e reflete 10% do dano bloqueado'
        // Budget: 336/348 (97%) — Lendário com habilidade especial
    },

    // === BOTAS (5 versões) ===
    {
        id: 'prog_botas_couro',
        catalogId: '0104PRG001',
        name: 'Botas de Couro',
        icon: '👢',
        svgIcon: { shape: 'leather-boots', palette: 'leather' },
        category: 'equipment',
        stackable: true,
        maxStack: 99,
        slot: 'boots',
        rarity: 'comum',
        nivelRequerido: 1,
        attributes: { agility: 3, pv: 8, pm: 1 }
        // Budget: 17/22 (77%) — Nv1 comum
    },
    {
        id: 'botas_rapidas',
        catalogId: '0104000002',
        name: 'Botas Rápidas',
        icon: '👢',
        svgIcon: { shape: 'reinforced-boots', palette: 'iron' },
        category: 'equipment',
        stackable: true,
        maxStack: 99,
        slot: 'boots',
        rarity: 'incomum',
        nivelRequerido: 5,
        attributes: { agility: 6, dodge: 4, pv: 5, pm: 1 }
        // Budget: 39/42 (93%) — Nv5 incomum
    },
    {
        id: 'botas_vento',
        catalogId: '0104000003',
        name: 'Botas do Vento',
        icon: '👢',
        svgIcon: { shape: 'wind-boots', palette: 'wind' },
        category: 'equipment',
        stackable: true,
        maxStack: 99,
        slot: 'boots',
        rarity: 'raro',
        nivelRequerido: 10,
        attributes: { agility: 6, pm: 1, dodge: 4, pv: 10 }
        // Budget: 78/81 (96%)
    },
    {
        id: 'botas_mercurio',
        catalogId: '0104000004',
        name: 'Botas de Mercúrio',
        icon: '✨',
        svgIcon: { shape: 'mercury-boots', palette: 'mercury' },
        category: 'equipment',
        stackable: true,
        maxStack: 99,
        slot: 'boots',
        rarity: 'epico',
        nivelRequerido: 15,
        attributes: { agility: 8, pm: 2, dodge: 5, pv: 20, critical: 2, pa: 1 }
        // Budget: 148/144 (103%)
    },
    {
        id: 'botas_hermes',
        catalogId: '0104000005',
        name: 'Botas de Hermes',
        icon: '✨',
        svgIcon: { shape: 'hermes-boots', palette: 'hermes' },
        category: 'equipment',
        stackable: true,
        maxStack: 99,
        slot: 'boots',
        rarity: 'lendario',
        nivelRequerido: 20,
        attributes: { agility: 12, pm: 2, dodge: 8, pv: 25, critical: 4, pa: 1 },
        habilidadeEspecial: 'Pode mover 2x no mesmo turno (1x a cada 3 turnos)'
        // Budget: 233/243 (96%) — Lendário com habilidade especial
    },

    // === CAPA (3 versões) ===
    {
        id: 'capa_viajante',
        catalogId: '0105000001',
        name: 'Capa do Viajante',
        icon: '🧥',
        svgIcon: { shape: 'traveler-cape', palette: 'leather' },
        category: 'equipment',
        stackable: true,
        maxStack: 99,
        slot: 'cape',
        rarity: 'comum',
        nivelRequerido: 1,
        attributes: { pv: 5, res_general: 2, pa: 1 }
        // Budget: 21/23 (91%)
    },
    {
        id: 'capa_mago',
        catalogId: '0105000002',
        name: 'Capa do Mago',
        icon: '🧥',
        svgIcon: { shape: 'mage-cape', palette: 'arcane' },
        category: 'equipment',
        stackable: true,
        maxStack: 99,
        slot: 'cape',
        rarity: 'incomum',
        nivelRequerido: 5,
        attributes: { pv: 10, res_air: 6, res_neutral: 3, intelligence: 3, pa: 1 }
        // Budget: 37/45 (82%)
    },
    {
        id: 'capa_arquimago',
        catalogId: '0105000003',
        name: 'Capa do Arquimago',
        icon: '🧙',
        svgIcon: { shape: 'archmage-cape', palette: 'arcane' },
        category: 'equipment',
        stackable: true,
        maxStack: 99,
        slot: 'cape',
        rarity: 'raro',
        nivelRequerido: 10,
        attributes: { pv: 15, res_air: 8, res_neutral: 4, res_general: 2, intelligence: 6, pa: 1 }
        // Budget: 73/77 (95%)
    },

    // === CINTO (3 versões) ===
    {
        id: 'cinto_couro',
        catalogId: '0108000001',
        name: 'Cinto de Couro',
        icon: '🔗',
        svgIcon: { shape: 'leather-belt', palette: 'leather' },
        category: 'equipment',
        stackable: true,
        maxStack: 99,
        slot: 'belt',
        rarity: 'comum',
        nivelRequerido: 1,
        attributes: { pv: 8, strength: 2, dodge: 1 }
        // Budget: 18/18 (100%)
    },
    {
        id: 'cinto_campeao',
        catalogId: '0108000002',
        name: 'Cinto do Campeão',
        icon: '🔗',
        svgIcon: { shape: 'champion-belt', palette: 'champion' },
        category: 'equipment',
        stackable: true,
        maxStack: 99,
        slot: 'belt',
        rarity: 'incomum',
        nivelRequerido: 5,
        attributes: { pv: 15, strength: 4, block: 2 }
        // Budget: 35/37 (95%)
    },
    {
        id: 'cinto_titã',
        catalogId: '0108000003',
        name: 'Cinto do Titã',
        icon: '⛓️',
        svgIcon: { shape: 'titan-belt', palette: 'titan' },
        category: 'equipment',
        stackable: true,
        maxStack: 99,
        slot: 'belt',
        rarity: 'raro',
        nivelRequerido: 10,
        attributes: { pv: 22, strength: 7, block: 3, res_earth: 4, res_neutral: 2 }
        // Budget: 67/68 (99%)
    },

    // === AMULETO (5 versões) ===
    {
        id: 'amuleto_simples',
        catalogId: '0109000001',
        name: 'Amuleto Simples',
        icon: '🔘',
        svgIcon: { shape: 'pendant', palette: 'iron' },
        category: 'equipment',
        stackable: true,
        maxStack: 99,
        slot: 'amulet',
        rarity: 'comum',
        nivelRequerido: 1,
        attributes: { intelligence: 3, pv: 8, pa: 1 }
        // Budget: 17/20 (85%)
    },
    {
        id: 'amuleto_magico',
        catalogId: '0109000002',
        name: 'Amuleto Mágico',
        icon: '🌀',
        svgIcon: { shape: 'gem-pendant', palette: 'arcane' },
        category: 'equipment',
        stackable: true,
        maxStack: 99,
        slot: 'amulet',
        rarity: 'incomum',
        nivelRequerido: 5,
        attributes: { intelligence: 6, pv: 15, wisdom: 2, pa: 1 }
        // Budget: 37/44 (84%)
    },
    {
        id: 'amuleto_arcano',
        catalogId: '0109000003',
        name: 'Amuleto Arcano',
        icon: '🔮',
        svgIcon: { shape: 'eye-pendant', palette: 'arcane' },
        category: 'equipment',
        stackable: true,
        maxStack: 99,
        slot: 'amulet',
        rarity: 'raro',
        nivelRequerido: 10,
        attributes: { intelligence: 12, pv: 15, res_neutral: 4, res_air: 3, range: 1, pa: 1 }
        // Budget: 74/76 (97%) — range:1 adicionado, pv reduzido de 20→15
    },
    {
        id: 'amuleto_tempo',
        catalogId: '0109000004',
        name: 'Amuleto do Tempo',
        icon: '⏳',
        svgIcon: { shape: 'hourglass-pendant', palette: 'gold' },
        category: 'equipment',
        stackable: true,
        maxStack: 99,
        slot: 'amulet',
        rarity: 'epico',
        nivelRequerido: 15,
        attributes: { intelligence: 18, pv: 30, res_neutral: 6, res_air: 5, res_general: 1, agility: 5, pa: 1, pm: 1 }
        // Budget: 129/136 (95%)
    },
    {
        id: 'amuleto_eternidade',
        catalogId: '0109000005',
        name: 'Amuleto da Eternidade',
        icon: '💫',
        svgIcon: { shape: 'star-pendant', palette: 'holy' },
        category: 'equipment',
        stackable: true,
        maxStack: 99,
        slot: 'amulet',
        rarity: 'lendario',
        nivelRequerido: 20,
        attributes: { intelligence: 20, pm: 1, pv: 35, res_neutral: 5, res_air: 4, res_general: 2, agility: 5, pa: 1 },
        habilidadeEspecial: 'Regenera 3% PV e PM por turno. +1 ação extra a cada 5 turnos'
        // Budget: 218/227 (96%) — Lendário com habilidade especial
    },

    // === ANÉIS (5 versões) ===
    {
        id: 'anel_cobre',
        catalogId: '0111000001',
        name: 'Anel de Cobre',
        icon: '💍',
        svgIcon: { shape: 'copper-ring', palette: 'copper' },
        category: 'equipment',
        stackable: true,
        maxStack: 99,
        slot: 'ring',
        rarity: 'comum',
        nivelRequerido: 1,
        attributes: { agility: 2 }
        // Budget: 6/7 (86%)
    },
    {
        id: 'anel_prata',
        catalogId: '0111000002',
        name: 'Anel de Prata',
        icon: '💍',
        svgIcon: { shape: 'silver-ring', palette: 'silver' },
        category: 'equipment',
        stackable: true,
        maxStack: 99,
        slot: 'ring',
        rarity: 'incomum',
        nivelRequerido: 5,
        attributes: { agility: 2, critical: 1 }
        // Budget: 14/15 (93%)
    },
    {
        id: 'anel_ouro',
        catalogId: '0111000003',
        name: 'Anel de Ouro',
        icon: '💍',
        svgIcon: { shape: 'gold-ring', palette: 'gold' },
        category: 'equipment',
        stackable: true,
        maxStack: 99,
        slot: 'ring',
        rarity: 'raro',
        nivelRequerido: 10,
        attributes: { agility: 3, critical: 1, dodge: 1, pv: 6 }
        // Budget: 27/28 (96%)
    },
    {
        id: 'anel_platina',
        catalogId: '0111000004',
        name: 'Anel de Platina',
        icon: '💎',
        svgIcon: { shape: 'platinum-ring', palette: 'silver' },
        category: 'equipment',
        stackable: true,
        maxStack: 99,
        slot: 'ring',
        rarity: 'epico',
        nivelRequerido: 15,
        attributes: { agility: 3, critical: 2, dodge: 2, pv: 8, pa: 1 }
        // Budget: 41/46 (89%)
    },
    {
        id: 'anel_fenix',
        catalogId: '0111000005',
        name: 'Anel da Fênix',
        icon: '💎',
        svgIcon: { shape: 'phoenix-ring', palette: 'phoenix_fire' },
        category: 'equipment',
        stackable: true,
        maxStack: 99,
        slot: 'ring',
        rarity: 'lendario',
        nivelRequerido: 20,
        attributes: { agility: 5, critical: 3, dodge: 3, pv: 12, res_fire: 4, res_water: -2, pa: 1 },
        habilidadeEspecial: 'Ao morrer, revive com 50% PV (1x por combate). +20% dano em ataques críticos'
        // Budget: 67/78 (86%) — Lendário com habilidade especial
    }
];

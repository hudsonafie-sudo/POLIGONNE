// ========== BANCO DE DADOS: EQUIPAMENTOS DE CONJUNTO ==========
// 18 famílias de monstros × 4 peças = 72 equipamentos
// Cada item pertence a um setId para bônus de conjunto

const DB_CONJUNTOS_MONSTROS = [

    // ===== F1: RATO — Agility/dodge (T1 comum, Nv 3) =====

    {
        id: 'capacete_rato',
        catalogId: '0101100001',
        name: 'Gorro de Rato',
        icon: '⛑️',
        svgIcon: { shape: 'rat-helmet', palette: 'leather' },
        category: 'equipment',
        slot: 'helmet',
        rarity: 'comum',
        nivelRequerido: 3,
        setId: 'conjunto_rato',
        attributes: {
            pv: 10,
            agility: 3
        }
        // Budget: 19/32
    },
    {
        id: 'peitoral_rato',
        catalogId: '0102100001',
        name: 'Couro de Rato',
        icon: '🐀',
        svgIcon: { shape: 'rat-chest', palette: 'leather' },
        category: 'equipment',
        slot: 'chest',
        rarity: 'comum',
        nivelRequerido: 3,
        setId: 'conjunto_rato',
        attributes: {
            pv: 18,
            agility: 2,
            dodge: 1,
            pm: 1
        }
        // Budget: 28/38
    },
    {
        id: 'botas_rato',
        catalogId: '0104100001',
        name: 'Botas de Rato',
        icon: '👢',
        svgIcon: { shape: 'rat-boots', palette: 'leather' },
        category: 'equipment',
        slot: 'boots',
        rarity: 'comum',
        nivelRequerido: 3,
        setId: 'conjunto_rato',
        attributes: {
            agility: 6,
            dodge: 2,
            pv: 3,
            pm: 1
        }
        // Budget: 20/29
    },
    {
        id: 'cinto_rato',
        catalogId: '0106100001',
        name: 'Cinto de Rato',
        icon: '🐀',
        svgIcon: { shape: 'rat-belt', palette: 'leather' },
        category: 'equipment',
        slot: 'belt',
        rarity: 'comum',
        nivelRequerido: 3,
        setId: 'conjunto_rato',
        attributes: {
            agility: 3,
            luck: 3,
            pv: 6
        }
        // Budget: 13/24
    },

    // ===== F2: BARATA — HP/resistência (T1 comum, Nv 3) =====

    {
        id: 'capacete_barata',
        catalogId: '0101100002',
        name: 'Cascão de Barata',
        icon: '🪲',
        svgIcon: { shape: 'roach-helmet', palette: 'nature' },
        category: 'equipment',
        slot: 'helmet',
        rarity: 'comum',
        nivelRequerido: 3,
        setId: 'conjunto_barata',
        attributes: {
            pv: 18,
            strength: 2,
            res_neutral: 1
        }
        // Budget: 18/32
    },
    {
        id: 'peitoral_barata',
        catalogId: '0102100002',
        name: 'Couraça de Barata',
        icon: '🪲',
        svgIcon: { shape: 'roach-chest', palette: 'nature' },
        category: 'equipment',
        slot: 'chest',
        rarity: 'comum',
        nivelRequerido: 3,
        setId: 'conjunto_barata',
        attributes: {
            pv: 25,
            res_earth: 3,
            strength: 1,
            pm: 1
        }
        // Budget: 26/38
    },
    {
        id: 'cinto_barata',
        catalogId: '0106100002',
        name: 'Cinto de Barata',
        icon: '🪲',
        svgIcon: { shape: 'roach-belt', palette: 'nature' },
        category: 'equipment',
        slot: 'belt',
        rarity: 'comum',
        nivelRequerido: 3,
        setId: 'conjunto_barata',
        attributes: {
            pv: 12,
            strength: 2,
            res_neutral: 1
        }
        // Budget: 20/24
    },
    {
        id: 'amuleto_barata',
        catalogId: '0108100002',
        name: 'Amuleto de Barata',
        icon: '🪲',
        svgIcon: { shape: 'roach-amulet', palette: 'nature' },
        category: 'equipment',
        slot: 'amulet',
        rarity: 'comum',
        nivelRequerido: 3,
        setId: 'conjunto_barata',
        attributes: {
            pv: 10,
            strength: 2,
            res_neutral: 2,
            pa: 1
        }
        // Budget: 20/26
    },

    // ===== F3: COGUMELO — Intelligence/water (T1 comum, Nv 3) =====

    {
        id: 'capacete_cogumelo',
        catalogId: '0101100003',
        name: 'Chapéu de Cogumelo',
        icon: '🍄',
        svgIcon: { shape: 'mushroom-helmet', palette: 'jade' },
        category: 'equipment',
        slot: 'helmet',
        rarity: 'comum',
        nivelRequerido: 3,
        setId: 'conjunto_cogumelo',
        attributes: {
            pv: 12,
            intelligence: 4,
            luck: 2
        }
        // Budget: 17/32
    },
    {
        id: 'capa_cogumelo',
        catalogId: '0105100003',
        name: 'Manto de Esporos',
        icon: '🍄',
        svgIcon: { shape: 'mushroom-cape', palette: 'jade' },
        category: 'equipment',
        slot: 'cape',
        rarity: 'comum',
        nivelRequerido: 3,
        setId: 'conjunto_cogumelo',
        attributes: {
            intelligence: 4,
            luck: 3,
            pv: 5,
            pa: 1
        }
        // Budget: 13/27
    },
    {
        id: 'cinto_cogumelo',
        catalogId: '0106100003',
        name: 'Cinto de Raiz',
        icon: '🍄',
        svgIcon: { shape: 'mushroom-belt', palette: 'jade' },
        category: 'equipment',
        slot: 'belt',
        rarity: 'comum',
        nivelRequerido: 3,
        setId: 'conjunto_cogumelo',
        attributes: {
            intelligence: 3,
            pv: 10,
            luck: 2
        }
        // Budget: 19/24
    },
    {
        id: 'amuleto_cogumelo',
        catalogId: '0108100003',
        name: 'Amuleto de Fungo',
        icon: '🍄',
        svgIcon: { shape: 'mushroom-amulet', palette: 'jade' },
        category: 'equipment',
        slot: 'amulet',
        rarity: 'comum',
        nivelRequerido: 3,
        setId: 'conjunto_cogumelo',
        attributes: {
            intelligence: 4,
            wisdom: 2,
            pv: 5,
            range: 1,
            pa: 1
        }
        // Budget: 21/26 — range:1 para mago, pv ajustado
    },

    // ===== F4: SAPO — Dodge/water (T1 comum, Nv 3) =====

    {
        id: 'capacete_sapo',
        catalogId: '0101100004',
        name: 'Gorro de Sapo',
        icon: '🐸',
        svgIcon: { shape: 'frog-helmet', palette: 'nature' },
        category: 'equipment',
        slot: 'helmet',
        rarity: 'comum',
        nivelRequerido: 3,
        setId: 'conjunto_sapo',
        attributes: {
            agility: 3,
            dodge: 2,
            pv: 5
        }
        // Budget: 22/32
    },
    {
        id: 'capa_sapo',
        catalogId: '0105100004',
        name: 'Manto de Sapo',
        icon: '🐸',
        svgIcon: { shape: 'frog-cape', palette: 'nature' },
        category: 'equipment',
        slot: 'cape',
        rarity: 'comum',
        nivelRequerido: 3,
        setId: 'conjunto_sapo',
        attributes: {
            dodge: 3,
            agility: 2,
            res_water: 2,
            pa: 1
        }
        // Budget: 22/27
    },
    {
        id: 'botas_sapo',
        catalogId: '0104100004',
        name: 'Botas de Sapo',
        icon: '🐸',
        svgIcon: { shape: 'frog-boots', palette: 'nature' },
        category: 'equipment',
        slot: 'boots',
        rarity: 'comum',
        nivelRequerido: 3,
        setId: 'conjunto_sapo',
        attributes: {
            agility: 4,
            dodge: 3,
            pv: 5,
            pm: 1
        }
        // Budget: 21/29
    },
    {
        id: 'amuleto_sapo',
        catalogId: '0108100004',
        name: 'Amuleto de Sapo',
        icon: '🐸',
        svgIcon: { shape: 'frog-amulet', palette: 'nature' },
        category: 'equipment',
        slot: 'amulet',
        rarity: 'comum',
        nivelRequerido: 3,
        setId: 'conjunto_sapo',
        attributes: {
            dodge: 2,
            agility: 2,
            pv: 8,
            pa: 1
        }
        // Budget: 22/26
    },

    // ===== F5: MORCEGO — Critical/initiative (T1 comum, Nv 3) =====

    {
        id: 'capacete_morcego',
        catalogId: '0101100005',
        name: 'Máscara de Morcego',
        icon: '🦇',
        svgIcon: { shape: 'bat-helmet', palette: 'shadow' },
        category: 'equipment',
        slot: 'helmet',
        rarity: 'comum',
        nivelRequerido: 3,
        setId: 'conjunto_morcego',
        attributes: {
            agility: 4,
            critical: 1,
            initiative: 3,
            pv: 5
        }
        // Budget: 18/32
    },
    {
        id: 'peitoral_morcego',
        catalogId: '0102100005',
        name: 'Couro de Morcego',
        icon: '🦇',
        svgIcon: { shape: 'bat-chest', palette: 'shadow' },
        category: 'equipment',
        slot: 'chest',
        rarity: 'comum',
        nivelRequerido: 3,
        setId: 'conjunto_morcego',
        attributes: {
            pv: 15,
            agility: 3,
            dodge: 1,
            pm: 1
        }
        // Budget: 28/38
    },
    {
        id: 'capa_morcego',
        catalogId: '0105100005',
        name: 'Asas de Morcego',
        icon: '🦇',
        svgIcon: { shape: 'bat-cape', palette: 'shadow' },
        category: 'equipment',
        slot: 'cape',
        rarity: 'comum',
        nivelRequerido: 3,
        setId: 'conjunto_morcego',
        attributes: {
            agility: 3,
            dodge: 2,
            initiative: 2,
            pa: 1
        }
        // Budget: 21/27
    },
    {
        id: 'botas_morcego',
        catalogId: '0104100005',
        name: 'Garras de Morcego',
        icon: '🦇',
        svgIcon: { shape: 'bat-boots', palette: 'shadow' },
        category: 'equipment',
        slot: 'boots',
        rarity: 'comum',
        nivelRequerido: 3,
        setId: 'conjunto_morcego',
        attributes: {
            agility: 5,
            critical: 1,
            initiative: 3,
            pm: 1
        }
        // Budget: 25/29
    },

    // ===== F6: PLANTA — Strength/earth + ARMA (T1 comum, Nv 3) =====

    {
        id: 'capacete_planta',
        catalogId: '0101100006',
        name: 'Coroa de Espinhos',
        icon: '🌿',
        svgIcon: { shape: 'plant-helmet', palette: 'nature' },
        category: 'equipment',
        slot: 'helmet',
        rarity: 'comum',
        nivelRequerido: 3,
        setId: 'conjunto_planta',
        attributes: {
            pv: 15,
            strength: 4,
            res_earth: 1
        }
        // Budget: 21/32
    },
    {
        id: 'peitoral_planta',
        catalogId: '0102100006',
        name: 'Colete de Raiz',
        icon: '🌿',
        svgIcon: { shape: 'plant-chest', palette: 'nature' },
        category: 'equipment',
        slot: 'chest',
        rarity: 'comum',
        nivelRequerido: 3,
        setId: 'conjunto_planta',
        attributes: {
            pv: 20,
            strength: 3,
            res_earth: 1,
            pm: 1
        }
        // Budget: 31/38
    },
    {
        id: 'botas_planta',
        catalogId: '0104100006',
        name: 'Botas de Raiz',
        icon: '🌿',
        svgIcon: { shape: 'plant-boots', palette: 'nature' },
        category: 'equipment',
        slot: 'boots',
        rarity: 'comum',
        nivelRequerido: 3,
        setId: 'conjunto_planta',
        attributes: {
            strength: 5,
            pv: 14,
            pm: 1
        }
        // Budget: 17/29
    },
    {
        id: 'espinho_vivo',
        catalogId: '0201100001',
        name: 'Espinho Vivo',
        icon: '🌿',
        svgIcon: { shape: 'living-thorn', palette: 'nature' },
        category: 'equipment',
        slot: 'weapon',
        rarity: 'comum',
        nivelRequerido: 3,
        setId: 'conjunto_planta',
        attributes: {
            strength: 5
        },
        ability: {
            name: 'Golpe de Espinho',
            icon: '🌿',
            paCost: 4,
            pmCost: 0,
            peCost: 0,
            minRange: 1,
            maxRange: 1,
            rangeType: 'cross',
            damage: { min: 8, max: 14, stat: 'strength' },
            element: 'earth',
            targetType: 'enemy'
        }
        // Budget: 22/42
    },

    // ===== F7: LOBO — STR/AGI (T2 incomum, Nv 8) =====

    {
        id: 'capacete_lobo',
        catalogId: '0101200001',
        name: 'Capacete de Lobo',
        icon: '🐺',
        svgIcon: { shape: 'wolf-helmet', palette: 'wolf_grey' },
        category: 'equipment',
        slot: 'helmet',
        rarity: 'incomum',
        nivelRequerido: 8,
        setId: 'conjunto_lobo',
        attributes: {
            pv: 25,
            strength: 6,
            agility: 4
        }
        // Budget: 44/64
    },
    {
        id: 'peitoral_lobo',
        catalogId: '0102200001',
        name: 'Peitoral de Lobo',
        icon: '🐺',
        svgIcon: { shape: 'wolf-chest', palette: 'wolf_grey' },
        category: 'equipment',
        slot: 'chest',
        rarity: 'incomum',
        nivelRequerido: 8,
        setId: 'conjunto_lobo',
        attributes: {
            pv: 35,
            strength: 5,
            agility: 4,
            res_earth: 3,
            pm: 1
        }
        // Budget: 55/77
    },
    {
        id: 'capa_lobo',
        catalogId: '0105200001',
        name: 'Capa de Lobo',
        icon: '🐺',
        svgIcon: { shape: 'wolf-cape', palette: 'wolf_grey' },
        category: 'equipment',
        slot: 'cape',
        rarity: 'incomum',
        nivelRequerido: 8,
        setId: 'conjunto_lobo',
        attributes: {
            agility: 7,
            dodge: 4,
            strength: 4,
            pa: 1
        }
        // Budget: 36/54
    },
    {
        id: 'botas_lobo',
        catalogId: '0104200001',
        name: 'Botas de Lobo',
        icon: '🐺',
        svgIcon: { shape: 'wolf-boots', palette: 'wolf_grey' },
        category: 'equipment',
        slot: 'boots',
        rarity: 'incomum',
        nivelRequerido: 8,
        setId: 'conjunto_lobo',
        attributes: {
            agility: 6,
            pm: 1,
            strength: 3,
            pv: 12
        }
        // Budget: 45/58 — Lobo: híbrido melee (STR+AGI)
    },

    // ===== F8: ARANHA — AGI/critical (T2 incomum, Nv 8) =====

    {
        id: 'capacete_aranha',
        catalogId: '0101200002',
        name: 'Máscara de Aranha',
        icon: '🕷️',
        svgIcon: { shape: 'spider-helmet', palette: 'shadow' },
        category: 'equipment',
        slot: 'helmet',
        rarity: 'incomum',
        nivelRequerido: 8,
        setId: 'conjunto_aranha',
        attributes: {
            agility: 8,
            critical: 3,
            pv: 12
        }
        // Budget: 48/64
    },
    {
        id: 'capa_aranha',
        catalogId: '0105200002',
        name: 'Manto de Teia',
        icon: '🕸️',
        svgIcon: { shape: 'spider-cape', palette: 'shadow' },
        category: 'equipment',
        slot: 'cape',
        rarity: 'incomum',
        nivelRequerido: 8,
        setId: 'conjunto_aranha',
        attributes: {
            agility: 6,
            dodge: 6,
            res_water: 3,
            pv: 5,
            pa: 1
        }
        // Budget: 47/54
    },
    {
        id: 'cinto_aranha',
        catalogId: '0106200002',
        name: 'Cinto de Teia',
        icon: '🕸️',
        svgIcon: { shape: 'spider-belt', palette: 'shadow' },
        category: 'equipment',
        slot: 'belt',
        rarity: 'incomum',
        nivelRequerido: 8,
        setId: 'conjunto_aranha',
        attributes: {
            agility: 5,
            critical: 2,
            dodge: 2,
            pv: 6
        }
        // Budget: 33/48
    },
    {
        id: 'botas_aranha',
        catalogId: '0104200002',
        name: 'Patas de Aranha',
        icon: '🕷️',
        svgIcon: { shape: 'spider-boots', palette: 'shadow' },
        category: 'equipment',
        slot: 'boots',
        rarity: 'incomum',
        nivelRequerido: 8,
        setId: 'conjunto_aranha',
        attributes: {
            agility: 8,
            pm: 1,
            critical: 2
        }
        // Budget: 48/58 — Aranha: assassino (AGI+crit)
    },

    // ===== F9: JAVALI — STR/tank + ARMA (T2 incomum, Nv 8) =====

    {
        id: 'capacete_javali',
        catalogId: '0101200003',
        name: 'Elmo de Javali',
        icon: '🐗',
        svgIcon: { shape: 'boar-helmet', palette: 'bear_brown' },
        category: 'equipment',
        slot: 'helmet',
        rarity: 'incomum',
        nivelRequerido: 8,
        setId: 'conjunto_javali',
        attributes: {
            pv: 30,
            strength: 8,
            res_neutral: 3,
            block: 1
        }
        // Budget: 47/64
    },
    {
        id: 'peitoral_javali',
        catalogId: '0102200003',
        name: 'Couraça de Javali',
        icon: '🐗',
        svgIcon: { shape: 'boar-chest', palette: 'bear_brown' },
        category: 'equipment',
        slot: 'chest',
        rarity: 'incomum',
        nivelRequerido: 8,
        setId: 'conjunto_javali',
        attributes: {
            pv: 40,
            strength: 7,
            block: 3,
            res_neutral: 2,
            pm: 1
        }
        // Budget: 58/77
    },
    {
        id: 'cinto_javali',
        catalogId: '0106200003',
        name: 'Cinto de Javali',
        icon: '🐗',
        svgIcon: { shape: 'boar-belt', palette: 'bear_brown' },
        category: 'equipment',
        slot: 'belt',
        rarity: 'incomum',
        nivelRequerido: 8,
        setId: 'conjunto_javali',
        attributes: {
            strength: 6,
            pv: 18,
            block: 2
        }
        // Budget: 34/48
    },
    {
        id: 'presa_javali',
        catalogId: '0201200001',
        name: 'Presa de Javali',
        icon: '🐗',
        svgIcon: { shape: 'boar-tusk-weapon', palette: 'bear_brown' },
        category: 'equipment',
        slot: 'weapon',
        rarity: 'incomum',
        nivelRequerido: 8,
        setId: 'conjunto_javali',
        attributes: {
            strength: 8,
            critical: 1
        },
        ability: {
            name: 'Investida de Presa',
            icon: '🐗',
            paCost: 4,
            pmCost: 0,
            peCost: 0,
            minRange: 1,
            maxRange: 1,
            rangeType: 'cross',
            damage: { min: 14, max: 22, stat: 'strength' },
            element: 'earth',
            targetType: 'enemy'
        }
        // Budget: 38/83
    },

    // ===== F10: ESQUELETO — STR/INT equilibrado + ARMA (T2 incomum, Nv 8) =====

    {
        id: 'capacete_esqueleto',
        catalogId: '0101200004',
        name: 'Crânio de Esqueleto',
        icon: '💀',
        svgIcon: { shape: 'skeleton-helmet', palette: 'bone' },
        category: 'equipment',
        slot: 'helmet',
        rarity: 'incomum',
        nivelRequerido: 8,
        setId: 'conjunto_esqueleto',
        attributes: {
            pv: 22,
            strength: 7,
            intelligence: 5
        }
        // Budget: 42/64
    },
    {
        id: 'peitoral_esqueleto',
        catalogId: '0102200004',
        name: 'Costelas de Esqueleto',
        icon: '💀',
        svgIcon: { shape: 'skeleton-chest', palette: 'bone' },
        category: 'equipment',
        slot: 'chest',
        rarity: 'incomum',
        nivelRequerido: 8,
        setId: 'conjunto_esqueleto',
        attributes: {
            pv: 35,
            strength: 6,
            intelligence: 3,
            res_neutral: 4,
            pm: 1
        }
        // Budget: 46/77
    },
    {
        id: 'amuleto_esqueleto',
        catalogId: '0108200004',
        name: 'Amuleto Ossudo',
        icon: '💀',
        svgIcon: { shape: 'skeleton-amulet', palette: 'bone' },
        category: 'equipment',
        slot: 'amulet',
        rarity: 'incomum',
        nivelRequerido: 8,
        setId: 'conjunto_esqueleto',
        attributes: {
            strength: 7,
            intelligence: 5,
            pv: 12,
            pa: 1
        }
        // Budget: 37/51
    },
    {
        id: 'lamina_osso',
        catalogId: '0201200002',
        name: 'Lâmina de Osso',
        icon: '💀',
        svgIcon: { shape: 'bone-blade', palette: 'bone' },
        category: 'equipment',
        slot: 'weapon',
        rarity: 'incomum',
        nivelRequerido: 8,
        setId: 'conjunto_esqueleto',
        attributes: {
            strength: 6,
            intelligence: 4
        },
        ability: {
            name: 'Corte Ossudo',
            icon: '💀',
            paCost: 4,
            pmCost: 0,
            peCost: 0,
            minRange: 1,
            maxRange: 1,
            rangeType: 'cross',
            damage: { min: 14, max: 20, stat: 'strength' },
            element: 'earth',
            targetType: 'enemy'
        }
        // Budget: 33/83
    },

    // ===== F11: COBRA — AGI/dodge/water (T2 incomum, Nv 8) =====

    {
        id: 'capacete_cobra',
        catalogId: '0101200005',
        name: 'Capuz de Cobra',
        icon: '🐍',
        svgIcon: { shape: 'snake-helmet', palette: 'jade' },
        category: 'equipment',
        slot: 'helmet',
        rarity: 'incomum',
        nivelRequerido: 8,
        setId: 'conjunto_cobra',
        attributes: {
            agility: 9,
            dodge: 4,
            pv: 10
        }
        // Budget: 47/64
    },
    {
        id: 'capa_cobra',
        catalogId: '0105200005',
        name: 'Capa de Escamas',
        icon: '🐍',
        svgIcon: { shape: 'snake-cape', palette: 'jade' },
        category: 'equipment',
        slot: 'cape',
        rarity: 'incomum',
        nivelRequerido: 8,
        setId: 'conjunto_cobra',
        attributes: {
            agility: 7,
            dodge: 5,
            res_water: 4,
            pa: 1
        }
        // Budget: 46/54
    },
    {
        id: 'botas_cobra',
        catalogId: '0104200005',
        name: 'Botas de Escama',
        icon: '🐍',
        svgIcon: { shape: 'snake-boots', palette: 'jade' },
        category: 'equipment',
        slot: 'boots',
        rarity: 'incomum',
        nivelRequerido: 8,
        setId: 'conjunto_cobra',
        attributes: {
            agility: 6,
            pm: 1,
            dodge: 4,
            res_water: 3
        }
        // Budget: 46/58 — Cobra: evasão+água
    },
    {
        id: 'amuleto_cobra',
        catalogId: '0108200005',
        name: 'Amuleto da Serpente',
        icon: '🐍',
        svgIcon: { shape: 'snake-amulet', palette: 'jade' },
        category: 'equipment',
        slot: 'amulet',
        rarity: 'incomum',
        nivelRequerido: 8,
        setId: 'conjunto_cobra',
        attributes: {
            agility: 5,
            critical: 3,
            luck: 4,
            pa: 1
        }
        // Budget: 38/51
    },

    // ===== F12: GOBLIN — STR/AGI/LUCK misto (T2 incomum, Nv 8) =====

    {
        id: 'capacete_goblin',
        catalogId: '0101200006',
        name: 'Elmo Goblin',
        icon: '👺',
        svgIcon: { shape: 'goblin-helmet', palette: 'nature' },
        category: 'equipment',
        slot: 'helmet',
        rarity: 'incomum',
        nivelRequerido: 8,
        setId: 'conjunto_goblin',
        attributes: {
            pv: 18,
            strength: 5,
            agility: 5,
            luck: 3
        }
        // Budget: 42/64
    },
    {
        id: 'peitoral_goblin',
        catalogId: '0102200006',
        name: 'Couraça Goblin',
        icon: '👺',
        svgIcon: { shape: 'goblin-chest', palette: 'nature' },
        category: 'equipment',
        slot: 'chest',
        rarity: 'incomum',
        nivelRequerido: 8,
        setId: 'conjunto_goblin',
        attributes: {
            pv: 30,
            strength: 5,
            agility: 4,
            luck: 3,
            pm: 1
        }
        // Budget: 50/77
    },
    {
        id: 'cinto_goblin',
        catalogId: '0106200006',
        name: 'Cinto Goblin',
        icon: '👺',
        svgIcon: { shape: 'goblin-belt', palette: 'nature' },
        category: 'equipment',
        slot: 'belt',
        rarity: 'incomum',
        nivelRequerido: 8,
        setId: 'conjunto_goblin',
        attributes: {
            strength: 5,
            agility: 3,
            luck: 4,
            pv: 8
        }
        // Budget: 29/48
    },
    {
        id: 'botas_goblin',
        catalogId: '0104200006',
        name: 'Botas Goblin',
        icon: '👺',
        svgIcon: { shape: 'goblin-boots', palette: 'nature' },
        category: 'equipment',
        slot: 'boots',
        rarity: 'incomum',
        nivelRequerido: 8,
        setId: 'conjunto_goblin',
        attributes: {
            agility: 4,
            pm: 1,
            luck: 4
        }
        // Budget: 43/58
    },

    // ===== F13: URSO — STR/tank extremo (T3 raro, Nv 16) =====

    {
        id: 'capacete_urso',
        catalogId: '0101300001',
        name: 'Cabeça de Urso',
        icon: '🐻',
        svgIcon: { shape: 'bear-helmet', palette: 'bear_brown' },
        category: 'equipment',
        slot: 'helmet',
        rarity: 'raro',
        nivelRequerido: 16,
        setId: 'conjunto_urso',
        attributes: {
            pv: 50,
            strength: 12,
            res_earth: 4,
            block: 3,
            res_neutral: 2
        }
        // Budget: 89/126
    },
    {
        id: 'peitoral_urso',
        catalogId: '0102300001',
        name: 'Pele de Urso',
        icon: '🐻',
        svgIcon: { shape: 'bear-chest', palette: 'bear_brown' },
        category: 'equipment',
        slot: 'chest',
        rarity: 'raro',
        nivelRequerido: 16,
        setId: 'conjunto_urso',
        attributes: {
            pv: 65,
            strength: 10,
            res_earth: 6,
            res_neutral: 5,
            block: 3,
            pm: 1
        }
        // Budget: 102/151
    },
    {
        id: 'cinto_urso',
        catalogId: '0106300001',
        name: 'Cinto de Urso',
        icon: '🐻',
        svgIcon: { shape: 'bear-belt', palette: 'bear_brown' },
        category: 'equipment',
        slot: 'belt',
        rarity: 'raro',
        nivelRequerido: 16,
        setId: 'conjunto_urso',
        attributes: {
            pv: 30,
            strength: 10,
            block: 3,
            res_neutral: 4,
            res_general: 1
        }
        // Budget: 55/95
    },
    {
        id: 'botas_urso',
        catalogId: '0104300001',
        name: 'Botas de Urso',
        icon: '🐻',
        svgIcon: { shape: 'bear-boots', palette: 'bear_brown' },
        category: 'equipment',
        slot: 'boots',
        rarity: 'raro',
        nivelRequerido: 16,
        setId: 'conjunto_urso',
        attributes: {
            strength: 10,
            pv: 25,
            pm: 1,
            block: 3,
            res_earth: 2
        }
        // Budget: 52/113
    },

    // ===== F14: TROLL — Força bruta + ARMA (T3 raro, Nv 16) =====

    {
        id: 'capacete_troll',
        catalogId: '0101300002',
        name: 'Crânio de Troll',
        icon: '🧌',
        svgIcon: { shape: 'troll-helmet', palette: 'nature' },
        category: 'equipment',
        slot: 'helmet',
        rarity: 'raro',
        nivelRequerido: 16,
        setId: 'conjunto_troll',
        attributes: {
            pv: 55,
            strength: 14,
            res_neutral: 4,
            block: 2
        }
        // Budget: 92/126
    },
    {
        id: 'peitoral_troll',
        catalogId: '0102300002',
        name: 'Couro de Troll',
        icon: '🧌',
        svgIcon: { shape: 'troll-chest', palette: 'nature' },
        category: 'equipment',
        slot: 'chest',
        rarity: 'raro',
        nivelRequerido: 16,
        setId: 'conjunto_troll',
        attributes: {
            pv: 70,
            strength: 12,
            res_neutral: 6,
            res_earth: 4,
            block: 2,
            pm: 1
        }
        // Budget: 111/151
    },
    {
        id: 'cinto_troll',
        catalogId: '0106300002',
        name: 'Cinto de Troll',
        icon: '🧌',
        svgIcon: { shape: 'troll-belt', palette: 'nature' },
        category: 'equipment',
        slot: 'belt',
        rarity: 'raro',
        nivelRequerido: 16,
        setId: 'conjunto_troll',
        attributes: {
            pv: 25,
            strength: 14,
            res_neutral: 5,
            critical: 2
        }
        // Budget: 62/95 — Troll: força bruta + dano (diferente do Urso que é tank)
    },
    {
        id: 'porrete_troll',
        catalogId: '0201300001',
        name: 'Porrete de Troll',
        icon: '🧌',
        svgIcon: { shape: 'troll-club', palette: 'nature' },
        category: 'equipment',
        slot: 'weapon',
        rarity: 'raro',
        nivelRequerido: 16,
        setId: 'conjunto_troll',
        attributes: {
            strength: 14,
            critical: 2,
            pv: 15
        },
        ability: {
            name: 'Pancada de Troll',
            icon: '🧌',
            paCost: 4,
            pmCost: 0,
            peCost: 0,
            minRange: 1,
            maxRange: 1,
            rangeType: 'cross',
            damage: { min: 22, max: 32, stat: 'strength' },
            element: 'earth',
            targetType: 'enemy'
        }
        // Budget: 64/164
    },

    // ===== F15: GOLEM — Block/defesa + ESCUDO (T3 raro, Nv 16) =====

    {
        id: 'capacete_golem',
        catalogId: '0101300003',
        name: 'Máscara de Pedra',
        icon: '🗿',
        svgIcon: { shape: 'golem-helmet', palette: 'iron' },
        category: 'equipment',
        slot: 'helmet',
        rarity: 'raro',
        nivelRequerido: 16,
        setId: 'conjunto_golem',
        attributes: {
            pv: 55,
            block: 6,
            res_earth: 6,
            strength: 4
        }
        // Budget: 90/126
    },
    {
        id: 'peitoral_golem',
        catalogId: '0102300003',
        name: 'Couraça de Pedra',
        icon: '🗿',
        svgIcon: { shape: 'golem-chest', palette: 'iron' },
        category: 'equipment',
        slot: 'chest',
        rarity: 'raro',
        nivelRequerido: 16,
        setId: 'conjunto_golem',
        attributes: {
            pv: 75,
            block: 7,
            res_earth: 7,
            res_neutral: 5,
            pm: 1
        }
        // Budget: 122/151
    },
    {
        id: 'botas_golem',
        catalogId: '0104300003',
        name: 'Botas de Pedra',
        icon: '🗿',
        svgIcon: { shape: 'golem-boots', palette: 'iron' },
        category: 'equipment',
        slot: 'boots',
        rarity: 'raro',
        nivelRequerido: 16,
        setId: 'conjunto_golem',
        attributes: {
            pv: 40,
            block: 6,
            res_earth: 8,
            strength: 5,
            pm: 1
        }
        // Budget: 56/113
    },
    {
        id: 'escudo_cristal',
        catalogId: '0109300001',
        name: 'Escudo de Cristal',
        icon: '🛡️',
        svgIcon: { shape: 'crystal-shield', palette: 'crystal' },
        category: 'equipment',
        slot: 'weaponLeft',
        rarity: 'raro',
        nivelRequerido: 16,
        setId: 'conjunto_golem',
        attributes: {
            pv: 40,
            block: 8,
            res_earth: 6,
            res_neutral: 4,
            res_general: 1
        }
        // Budget: 68/120
    },

    // ===== F16: HARPIA — AGI/critical máximo (T3 raro, Nv 16) =====

    {
        id: 'capacete_harpia',
        catalogId: '0101300004',
        name: 'Coroa de Plumas',
        icon: '🪶',
        svgIcon: { shape: 'harpy-helmet', palette: 'wind' },
        category: 'equipment',
        slot: 'helmet',
        rarity: 'raro',
        nivelRequerido: 16,
        setId: 'conjunto_harpia',
        attributes: {
            agility: 12,
            critical: 5,
            dodge: 3,
            pv: 15
        }
        // Budget: 90/126
    },
    {
        id: 'capa_harpia',
        catalogId: '0105300004',
        name: 'Asas de Harpia',
        icon: '🪶',
        svgIcon: { shape: 'harpy-cape', palette: 'wind' },
        category: 'equipment',
        slot: 'cape',
        rarity: 'raro',
        nivelRequerido: 16,
        setId: 'conjunto_harpia',
        attributes: {
            agility: 10,
            dodge: 5,
            pm: 1,
            res_air: 5,
            pa: 1
        }
        // Budget: 84/107
    },
    {
        id: 'botas_harpia',
        catalogId: '0104300004',
        name: 'Garras de Harpia',
        icon: '🪶',
        svgIcon: { shape: 'harpy-boots', palette: 'wind' },
        category: 'equipment',
        slot: 'boots',
        rarity: 'raro',
        nivelRequerido: 16,
        setId: 'conjunto_harpia',
        attributes: {
            agility: 10,
            pm: 1,
            critical: 3,
            dodge: 3
        }
        // Budget: 92/113
    },
    {
        id: 'amuleto_harpia',
        catalogId: '0108300004',
        name: 'Amuleto de Vento',
        icon: '🪶',
        svgIcon: { shape: 'harpy-amulet', palette: 'wind' },
        category: 'equipment',
        slot: 'amulet',
        rarity: 'raro',
        nivelRequerido: 16,
        setId: 'conjunto_harpia',
        attributes: {
            agility: 10,
            critical: 4,
            dodge: 4,
            res_air: 4,
            pa: 1
        }
        // Budget: 82/101
    },

    // ===== F17: LAGARTO — STR/AGI híbrido + ARMA (T3 raro, Nv 16) =====

    {
        id: 'capacete_lagarto',
        catalogId: '0101300005',
        name: 'Elmo de Escamas',
        icon: '🦎',
        svgIcon: { shape: 'lizard-helmet', palette: 'jade' },
        category: 'equipment',
        slot: 'helmet',
        rarity: 'raro',
        nivelRequerido: 16,
        setId: 'conjunto_lagarto',
        attributes: {
            pv: 40,
            strength: 10,
            agility: 8,
            res_water: 5,
            dodge: 2
        }
        // Budget: 80/126
    },
    {
        id: 'peitoral_lagarto',
        catalogId: '0102300005',
        name: 'Couraça de Escamas',
        icon: '🦎',
        svgIcon: { shape: 'lizard-chest', palette: 'jade' },
        category: 'equipment',
        slot: 'chest',
        rarity: 'raro',
        nivelRequerido: 16,
        setId: 'conjunto_lagarto',
        attributes: {
            pv: 60,
            strength: 8,
            agility: 7,
            res_water: 6,
            res_earth: 4,
            dodge: 2,
            pm: 1
        }
        // Budget: 112/151
    },
    {
        id: 'capa_lagarto',
        catalogId: '0105300005',
        name: 'Capa de Escamas',
        icon: '🦎',
        svgIcon: { shape: 'lizard-cape', palette: 'jade' },
        category: 'equipment',
        slot: 'cape',
        rarity: 'raro',
        nivelRequerido: 16,
        setId: 'conjunto_lagarto',
        attributes: {
            agility: 12,
            strength: 7,
            dodge: 5,
            res_water: 4,
            critical: 1,
            pa: 1
        }
        // Budget: 67/107
    },
    {
        id: 'lamina_escama',
        catalogId: '0201300002',
        name: 'Lâmina de Escama',
        icon: '🦎',
        svgIcon: { shape: 'scale-blade', palette: 'jade' },
        category: 'equipment',
        slot: 'weapon',
        rarity: 'raro',
        nivelRequerido: 16,
        setId: 'conjunto_lagarto',
        attributes: {
            strength: 12,
            agility: 6,
            critical: 2
        },
        ability: {
            name: 'Corte Escamoso',
            icon: '🦎',
            paCost: 4,
            pmCost: 0,
            peCost: 0,
            minRange: 1,
            maxRange: 1,
            rangeType: 'cross',
            damage: { min: 20, max: 28, stat: 'strength' },
            element: 'water',
            targetType: 'enemy'
        }
        // Budget: 64/164
    },

    // ===== F18: OGRO — Força pura + ESCUDO (T3 raro, Nv 16) =====

    {
        id: 'capacete_ogro',
        catalogId: '0101300006',
        name: 'Crânio de Ogro',
        icon: '👹',
        svgIcon: { shape: 'ogre-helmet', palette: 'leather' },
        category: 'equipment',
        slot: 'helmet',
        rarity: 'raro',
        nivelRequerido: 16,
        setId: 'conjunto_ogro',
        attributes: {
            pv: 55,
            strength: 14,
            res_neutral: 5,
            block: 2
        }
        // Budget: 94/126
    },
    {
        id: 'peitoral_ogro',
        catalogId: '0102300006',
        name: 'Couro de Ogro',
        icon: '👹',
        svgIcon: { shape: 'ogre-chest', palette: 'leather' },
        category: 'equipment',
        slot: 'chest',
        rarity: 'raro',
        nivelRequerido: 16,
        setId: 'conjunto_ogro',
        attributes: {
            pv: 75,
            strength: 10,
            res_neutral: 5,
            block: 4,
            pm: 1
        }
        // Budget: 126/151
    },
    {
        id: 'cinto_ogro',
        catalogId: '0106300006',
        name: 'Cinto de Ogro',
        icon: '👹',
        svgIcon: { shape: 'ogre-belt', palette: 'leather' },
        category: 'equipment',
        slot: 'belt',
        rarity: 'raro',
        nivelRequerido: 16,
        setId: 'conjunto_ogro',
        attributes: {
            pv: 35,
            strength: 12,
            block: 3,
            res_neutral: 4
        }
        // Budget: 66/95
    },
    {
        id: 'tabua_ogro',
        catalogId: '0109300002',
        name: 'Tábua de Ogro',
        icon: '🛡️',
        svgIcon: { shape: 'ogre-plank', palette: 'leather' },
        category: 'equipment',
        slot: 'weaponLeft',
        rarity: 'raro',
        nivelRequerido: 16,
        setId: 'conjunto_ogro',
        attributes: {
            pv: 35,
            strength: 10,
            block: 7,
            res_neutral: 4,
            res_general: 1
        }
        // Budget: 75/120
    },

    // ===== CONJUNTO DO SÁBIO — Elemental geral (Nv 8, incomum) =====
    // Universal: dmg_elemental + res_general + wisdom + PV
    // Propositalmente mais fraco que sets focados (Lobo, Aranha, etc.)

    {
        id: 'anel_sabio',
        catalogId: '0107200101',
        name: 'Anel do Sábio',
        icon: '💍',
        svgIcon: { shape: 'sage-ring', palette: 'arcane' },
        category: 'equipment',
        slot: 'ring',
        rarity: 'incomum',
        nivelRequerido: 8,
        setId: 'conjunto_sabio',
        attributes: {
            pv: 4,
            dmg_elemental: 1,
            wisdom: 2
        }
    },
    {
        id: 'amuleto_sabio',
        catalogId: '0108200101',
        name: 'Amuleto do Sábio',
        icon: '📿',
        svgIcon: { shape: 'sage-amulet', palette: 'arcane' },
        category: 'equipment',
        slot: 'amulet',
        rarity: 'incomum',
        nivelRequerido: 8,
        setId: 'conjunto_sabio',
        attributes: {
            pv: 8,
            dmg_elemental: 2,
            res_general: 1,
            wisdom: 3,
            pa: 1
        }
    },
    {
        id: 'capa_sabio',
        catalogId: '0105200101',
        name: 'Manto do Sábio',
        icon: '🧥',
        svgIcon: { shape: 'sage-cape', palette: 'arcane' },
        category: 'equipment',
        slot: 'cape',
        rarity: 'incomum',
        nivelRequerido: 8,
        setId: 'conjunto_sabio',
        attributes: {
            pv: 10,
            dmg_elemental: 1,
            res_general: 2,
            wisdom: 2,
            pa: 1
        }
    },
    {
        id: 'cinto_sabio',
        catalogId: '0106200101',
        name: 'Cinto do Sábio',
        icon: '🪢',
        svgIcon: { shape: 'sage-belt', palette: 'arcane' },
        category: 'equipment',
        slot: 'belt',
        rarity: 'incomum',
        nivelRequerido: 8,
        setId: 'conjunto_sabio',
        attributes: {
            pv: 10,
            dmg_elemental: 2,
            res_general: 1,
            wisdom: 2,
            luck: 2
        }
    },

    // ===== CONJUNTO PRIMORDIAL — Elemental geral (Nv 15, raro) =====
    // Universal: dmg_elemental + res_general + wisdom + PV
    // Propositalmente mais fraco que sets focados (Urso, Harpia, etc.)

    {
        id: 'anel_primordial',
        catalogId: '0107300101',
        name: 'Anel Primordial',
        icon: '💍',
        svgIcon: { shape: 'primal-ring', palette: 'jade' },
        category: 'equipment',
        slot: 'ring',
        rarity: 'raro',
        nivelRequerido: 15,
        setId: 'conjunto_primordial',
        attributes: {
            pv: 6,
            dmg_elemental: 1,
            res_general: 1,
            wisdom: 2,
            luck: 1
        }
    },
    {
        id: 'amuleto_primordial',
        catalogId: '0108300101',
        name: 'Amuleto Primordial',
        icon: '📿',
        svgIcon: { shape: 'primal-amulet', palette: 'jade' },
        category: 'equipment',
        slot: 'amulet',
        rarity: 'raro',
        nivelRequerido: 15,
        setId: 'conjunto_primordial',
        attributes: {
            pv: 20,
            dmg_elemental: 3,
            res_general: 3,
            wisdom: 4,
            luck: 3,
            pa: 1
        }
    },
    {
        id: 'capacete_primordial',
        catalogId: '0101300101',
        name: 'Coroa Primordial',
        icon: '👑',
        svgIcon: { shape: 'primal-helmet', palette: 'jade' },
        category: 'equipment',
        slot: 'helmet',
        rarity: 'raro',
        nivelRequerido: 15,
        setId: 'conjunto_primordial',
        attributes: {
            pv: 30,
            dmg_elemental: 3,
            res_general: 3,
            wisdom: 4,
            intelligence: 5
        }
    },
    {
        id: 'capa_primordial',
        catalogId: '0105300101',
        name: 'Manto Primordial',
        icon: '🧥',
        svgIcon: { shape: 'primal-cape', palette: 'jade' },
        category: 'equipment',
        slot: 'cape',
        rarity: 'raro',
        nivelRequerido: 15,
        setId: 'conjunto_primordial',
        attributes: {
            pv: 25,
            dmg_elemental: 3,
            res_general: 3,
            wisdom: 4,
            luck: 3,
            pa: 1
        }
    },

    // ===== ANÉIS DE CONJUNTO (novos — adicionam 5ª peça a 6 sets) =====

    // Anel do Morcego — T1, Nv3, crítico/iniciativa (5ª peça do conjunto_morcego)
    {
        id: 'anel_morcego',
        catalogId: '0107100005',
        name: 'Anel de Morcego',
        icon: '💍',
        svgIcon: { shape: 'bat-ring', palette: 'shadow' },
        category: 'equipment',
        slot: 'ring',
        rarity: 'comum',
        nivelRequerido: 3,
        setId: 'conjunto_morcego',
        attributes: {
            critical: 1,
            initiative: 2,
            agility: 1
        }
        // Budget: 10/10 — anel T1
    },

    // Anel do Sapo — T1, Nv3, esquiva/pv (5ª peça do conjunto_sapo)
    {
        id: 'anel_sapo',
        catalogId: '0107100004',
        name: 'Anel de Sapo',
        icon: '💍',
        svgIcon: { shape: 'frog-ring', palette: 'nature' },
        category: 'equipment',
        slot: 'ring',
        rarity: 'comum',
        nivelRequerido: 3,
        setId: 'conjunto_sapo',
        attributes: {
            dodge: 2,
            pv: 4
        }
        // Budget: 12/10 — anel T1
    },

    // Anel da Cobra — T2, Nv8, evasão (5ª peça do conjunto_cobra)
    {
        id: 'anel_cobra',
        catalogId: '0107200005',
        name: 'Anel da Serpente',
        icon: '💍',
        svgIcon: { shape: 'snake-ring', palette: 'jade' },
        category: 'equipment',
        slot: 'ring',
        rarity: 'incomum',
        nivelRequerido: 8,
        setId: 'conjunto_cobra',
        attributes: {
            agility: 3,
            dodge: 2,
            critical: 1
        }
        // Budget: 20/21 — anel T2
    },

    // Anel do Esqueleto — T2, Nv8, híbrido str/int (5ª peça do conjunto_esqueleto)
    {
        id: 'anel_esqueleto',
        catalogId: '0107200004',
        name: 'Anel Ossudo',
        icon: '💍',
        svgIcon: { shape: 'bone-ring', palette: 'bone' },
        category: 'equipment',
        slot: 'ring',
        rarity: 'incomum',
        nivelRequerido: 8,
        setId: 'conjunto_esqueleto',
        attributes: {
            strength: 3,
            intelligence: 2,
            pv: 6
        }
        // Budget: 21/21 — anel T2
    },

    // Anel da Harpia — T3, Nv16, vento/crítico (5ª peça do conjunto_harpia)
    {
        id: 'anel_harpia',
        catalogId: '0107300004',
        name: 'Anel de Plumas',
        icon: '💍',
        svgIcon: { shape: 'feather-ring', palette: 'wind' },
        category: 'equipment',
        slot: 'ring',
        rarity: 'raro',
        nivelRequerido: 16,
        setId: 'conjunto_harpia',
        attributes: {
            agility: 5,
            critical: 3,
            dodge: 2,
            res_air: 2
        }
        // Budget: 38/40 — anel T3
    },

    // Anel do Urso — T3, Nv16, tank (5ª peça do conjunto_urso)
    {
        id: 'anel_urso',
        catalogId: '0107300001',
        name: 'Anel do Urso',
        icon: '💍',
        svgIcon: { shape: 'bear-ring', palette: 'bear_brown' },
        category: 'equipment',
        slot: 'ring',
        rarity: 'raro',
        nivelRequerido: 16,
        setId: 'conjunto_urso',
        attributes: {
            pv: 18,
            block: 3,
            strength: 4
        }
        // Budget: 42/40 — anel T3 (tank)
    },

    // Cole o próximo item aqui
];

// ========== BANCO DE DADOS: EQUIPAMENTOS HÍBRIDOS ==========
// Itens que NÃO pertencem a nenhum conjunto
// Usam recursos de 2-3 famílias de monstro + refinados de profissão
// Oferecem builds únicas e alternativas aos conjuntos
//
// T1 (4 itens) — Nível 5, comum, famílias T1
// T2 (4 itens) — Nível 8, incomum, famílias T2
// T3 (5 itens) — Nível 16, raro, famílias T3
//
// Receitas em sistema/receitas.js

const DB_HIBRIDOS = [

    // ==================== T1 — Nível 5, Comum (4 itens) ====================

    // Chapéu do Sorridente — Evasão/sorte (Rato + Sapo)
    {
        id: 'hibrido_chapeu_sorridente',
        catalogId: '0109000001',
        name: 'Chapéu do Sorridente',
        icon: '😄',
        svgIcon: { shape: 'smile-hat', palette: 'gold' },
        category: 'equipment',
        slot: 'helmet',
        rarity: 'comum',
        nivelRequerido: 5,
        attributes: {
            pv: 5,
            agility: 4,
            dodge: 3,
            luck: 3
        }
    },

    // Manto Sombrio — Velocidade/evasão (Morcego + Sapo)
    {
        id: 'hibrido_manto_sombrio',
        catalogId: '0109000002',
        name: 'Manto Sombrio',
        icon: '🦇',
        svgIcon: { shape: 'shadow-cloak', palette: 'shadow' },
        category: 'equipment',
        slot: 'cape',
        rarity: 'comum',
        nivelRequerido: 5,
        attributes: {
            dodge: 4,
            agility: 3,
            initiative: 3,
            pa: 1          // grátis — capa obrigatório
        }
    },

    // Anel do Esgoto — Tank/sorte (Rato + Barata)
    {
        id: 'hibrido_anel_esgoto',
        catalogId: '0109000003',
        name: 'Anel do Esgoto',
        icon: '💍',
        svgIcon: { shape: 'sewer-ring', palette: 'iron' },
        category: 'equipment',
        slot: 'ring',
        rarity: 'comum',
        nivelRequerido: 5,
        attributes: {
            pv: 8,
            res_neutral: 2,
            luck: 2
        }
    },

    // Cinturão Esporado — Mago (Cogumelo + Planta)
    {
        id: 'hibrido_cinturao_esporado',
        catalogId: '0109000004',
        name: 'Cinturão Esporado',
        icon: '🍄',
        svgIcon: { shape: 'spore-belt', palette: 'nature' },
        category: 'equipment',
        slot: 'belt',
        rarity: 'comum',
        nivelRequerido: 5,
        attributes: {
            pv: 8,
            intelligence: 3,
            wisdom: 2
        }
    },

    // ==================== T2 — Nível 8, Incomum (4 itens) ====================

    // Amuleto Predador — Melee agressivo (Lobo + Javali)
    {
        id: 'hibrido_amuleto_predador',
        catalogId: '0109000005',
        name: 'Amuleto Predador',
        icon: '🐺',
        svgIcon: { shape: 'predator-amulet', palette: 'blood' },
        category: 'equipment',
        slot: 'amulet',
        rarity: 'incomum',
        nivelRequerido: 8,
        attributes: {
            pv: 15,
            strength: 6,
            critical: 3,
            pa: 1          // grátis — amuleto obrigatório
        }
    },

    // Botas do Errante — Mobilidade extrema (Aranha + Cobra)
    {
        id: 'hibrido_botas_errante',
        catalogId: '0109000006',
        name: 'Botas do Errante',
        icon: '👢',
        svgIcon: { shape: 'wanderer-boots', palette: 'jade' },
        category: 'equipment',
        slot: 'boots',
        rarity: 'incomum',
        nivelRequerido: 8,
        attributes: {
            pv: 15,
            agility: 10,
            pm: 1,
            dodge: 4
        }
    },

    // Cinto Totêmico — Híbrido equilibrado (Esqueleto + Goblin)
    {
        id: 'hibrido_cinto_totemico',
        catalogId: '0109000007',
        name: 'Cinto Totêmico',
        icon: '🦴',
        svgIcon: { shape: 'totem-belt', palette: 'bone' },
        category: 'equipment',
        slot: 'belt',
        rarity: 'incomum',
        nivelRequerido: 8,
        attributes: {
            strength: 4,
            intelligence: 3,
            agility: 3,
            luck: 3
        }
    },

    // Escudo de Teia — Off-tank (Aranha + Javali)
    {
        id: 'hibrido_escudo_teia',
        catalogId: '0109000008',
        name: 'Escudo de Teia',
        icon: '🕸️',
        svgIcon: { shape: 'web-shield', palette: 'ice' },
        category: 'equipment',
        slot: 'weaponLeft',
        rarity: 'incomum',
        nivelRequerido: 8,
        attributes: {
            pv: 20,
            block: 3,
            dodge: 3,
            res_water: 2
        }
    },

    // ==================== T3 — Nível 16, Raro (5 itens) ====================

    // Coroa do Caos — DPS puro (Troll + Harpia + Ogro)
    {
        id: 'hibrido_coroa_caos',
        catalogId: '0109000009',
        name: 'Coroa do Caos',
        icon: '👑',
        svgIcon: { shape: 'chaos-crown', palette: 'fire' },
        category: 'equipment',
        slot: 'helmet',
        rarity: 'raro',
        nivelRequerido: 16,
        attributes: {
            pv: 30,
            strength: 10,
            agility: 8,
            critical: 5
        }
    },

    // Anel da Besta — Melee (Urso + Lagarto)
    {
        id: 'hibrido_anel_besta',
        catalogId: '0109000010',
        name: 'Anel da Besta',
        icon: '💍',
        svgIcon: { shape: 'beast-ring', palette: 'blood' },
        category: 'equipment',
        slot: 'ring',
        rarity: 'raro',
        nivelRequerido: 16,
        attributes: {
            pv: 15,
            strength: 8,
            agility: 5,
            critical: 4
        }
    },

    // Peitoral Composto — Tank absoluto (Golem + Urso)
    {
        id: 'hibrido_peitoral_composto',
        catalogId: '0109000011',
        name: 'Peitoral Composto',
        icon: '🛡️',
        svgIcon: { shape: 'composite-chest', palette: 'iron' },
        category: 'equipment',
        slot: 'chest',
        rarity: 'raro',
        nivelRequerido: 16,
        attributes: {
            pv: 70,
            block: 6,
            res_earth: 6,
            res_neutral: 5,
            pm: 1          // grátis — peitoral obrigatório
        }
    },

    // Machado do Caos — Weapon DPS (Troll + Ogro)
    {
        id: 'hibrido_machado_caos',
        catalogId: '0109000012',
        name: 'Machado do Caos',
        icon: '🪓',
        svgIcon: { shape: 'chaos-axe', palette: 'fire' },
        category: 'equipment',
        slot: 'weapon',
        rarity: 'raro',
        nivelRequerido: 16,
        attributes: {
            strength: 8
        },
        ability: {
            name: 'Golpe Caótico',
            icon: '🪓',
            paCost: 5,
            pmCost: 0,
            peCost: 0,
            minRange: 1, maxRange: 1,
            rangeType: 'cross',
            damage: { min: 18, max: 26, stat: 'strength' },
            element: 'earth',
            targetType: 'enemy'
        }
    },

    // Bolsa do Explorador — Bag com luck (Lobo + Goblin)
    {
        id: 'hibrido_bolsa_explorador',
        catalogId: '0109000013',
        name: 'Bolsa do Explorador',
        icon: '🎒',
        svgIcon: { shape: 'explorer-bag', palette: 'nature' },
        category: 'equipment',
        slot: 'bag',
        rarity: 'incomum',
        nivelRequerido: 8,
        attributes: {
            luck: 3
        },
        bagSlots: 10
    },

    // ==================== ITENS AVULSOS — Builds Especializados ====================
    // Anéis, cintos e amuletos soltos que NÃO pertencem a conjuntos
    // Foco em stats táticos: PV, esquiva, bloqueio, dano, cura

    // ────────── ANÉIS T1 — Nível 5, Comum (budget ~13 pts) ──────────

    // Anel do Vigor — Tank: PV + bloqueio
    {
        id: 'avulso_anel_vigor',
        catalogId: '0109000014',
        name: 'Anel do Vigor',
        icon: '💍',
        svgIcon: { shape: 'vigor-ring', palette: 'nature' },
        category: 'equipment',
        slot: 'ring',
        rarity: 'comum',
        nivelRequerido: 5,
        attributes: {
            pv: 8,             // 8 pts
            block: 1           // 4 pts
        }
        // Total: 12 pts / 13 pts (92%) ✅
    },

    // Anel do Evasivo — Esquiva + agilidade
    {
        id: 'avulso_anel_evasivo',
        catalogId: '0109000015',
        name: 'Anel do Evasivo',
        icon: '💍',
        svgIcon: { shape: 'evasive-ring', palette: 'jade' },
        category: 'equipment',
        slot: 'ring',
        rarity: 'comum',
        nivelRequerido: 5,
        attributes: {
            dodge: 2,          // 8 pts
            agility: 1         // 3 pts
        }
        // Total: 11 pts / 13 pts (84%) ✅
    },

    // ────────── ANÉIS T2 — Nível 10, Incomum (budget ~24 pts) ──────────

    // Anel Destruidor — Dano geral + força (melee DPS)
    {
        id: 'avulso_anel_destruidor',
        catalogId: '0109000016',
        name: 'Anel Destruidor',
        icon: '💍',
        svgIcon: { shape: 'destroyer-ring', palette: 'blood' },
        category: 'equipment',
        slot: 'ring',
        rarity: 'incomum',
        nivelRequerido: 10,
        attributes: {
            dmg_geral: 1,      // 10 pts
            strength: 4        // 12 pts
        }
        // Total: 22 pts / 24 pts (91%) ✅
    },

    // Anel Elemental — Dano elemental + inteligência (mago)
    {
        id: 'avulso_anel_elemental',
        catalogId: '0109000017',
        name: 'Anel Elemental',
        icon: '💍',
        svgIcon: { shape: 'elemental-ring', palette: 'arcane' },
        category: 'equipment',
        slot: 'ring',
        rarity: 'incomum',
        nivelRequerido: 10,
        attributes: {
            dmg_elemental: 2,  // 16 pts
            intelligence: 2    // 6 pts
        }
        // Total: 22 pts / 24 pts (91%) ✅
    },

    // Anel do Curandeiro — Sabedoria (escala cura) + PV
    {
        id: 'avulso_anel_curandeiro',
        catalogId: '0109000018',
        name: 'Anel do Curandeiro',
        icon: '💍',
        svgIcon: { shape: 'healer-ring', palette: 'holy' },
        category: 'equipment',
        slot: 'ring',
        rarity: 'incomum',
        nivelRequerido: 12,
        attributes: {
            wisdom: 8,         // 16 pts
            pv: 10             // 10 pts
        }
        // Total: 26 pts / 27 pts (96%) ✅
    },

    // ────────── ANÉIS T3 — Nível 16-18, Raro (budget ~40-44 pts) ──────────

    // Anel da Fortaleza — Bloqueio + PV + resistência
    {
        id: 'avulso_anel_fortaleza',
        catalogId: '0109000019',
        name: 'Anel da Fortaleza',
        icon: '💍',
        svgIcon: { shape: 'fortress-ring', palette: 'iron' },
        category: 'equipment',
        slot: 'ring',
        rarity: 'raro',
        nivelRequerido: 16,
        attributes: {
            block: 4,          // 16 pts
            pv: 15,            // 15 pts
            res_neutral: 3     // 6 pts
        }
        // Total: 37 pts / 40 pts (92%) ✅
    },

    // Anel das Sombras — Esquiva + crítico (assassino)
    {
        id: 'avulso_anel_sombras',
        catalogId: '0109000020',
        name: 'Anel das Sombras',
        icon: '💍',
        svgIcon: { shape: 'shadow-ring', palette: 'shadow' },
        category: 'equipment',
        slot: 'ring',
        rarity: 'raro',
        nivelRequerido: 16,
        attributes: {
            dodge: 5,          // 20 pts
            critical: 2,       // 16 pts
            agility: 1         // 3 pts
        }
        // Total: 39 pts / 40 pts (97%) ✅
    },

    // Anel Arcano — Dano elemental máximo (mago endgame)
    {
        id: 'avulso_anel_arcano',
        catalogId: '0109000021',
        name: 'Anel Arcano',
        icon: '💍',
        svgIcon: { shape: 'arcane-ring', palette: 'arcane' },
        category: 'equipment',
        slot: 'ring',
        rarity: 'raro',
        nivelRequerido: 18,
        attributes: {
            dmg_elemental: 3,  // 24 pts
            intelligence: 4,   // 12 pts
            wisdom: 3          // 6 pts
        }
        // Total: 42 pts / 44 pts (95%) ✅
    },

    // ────────── CINTOS UTILITÁRIOS ──────────

    // Cinto da Vitalidade — PV puro + resistência geral (Nv10, incomum)
    // Budget belt Nv10 incomum: floor((20+50) × 1.15 × 0.75) = 60 pts
    {
        id: 'avulso_cinto_vitalidade',
        catalogId: '0109000022',
        name: 'Cinto da Vitalidade',
        icon: '🩹',
        svgIcon: { shape: 'vitality-belt', palette: 'nature' },
        category: 'equipment',
        slot: 'belt',
        rarity: 'incomum',
        nivelRequerido: 10,
        attributes: {
            pv: 40,            // 40 pts
            res_general: 2     // 16 pts
        }
        // Total: 56 pts / 60 pts (93%) ✅
    },

    // Cinto do Combatente — Dano + força + PV + crítico (Nv15, raro)
    // Budget belt Nv15 raro: floor((20+75) × 1.35 × 0.75) = 96 pts
    {
        id: 'avulso_cinto_combatente',
        catalogId: '0109000023',
        name: 'Cinto do Combatente',
        icon: '⚔️',
        svgIcon: { shape: 'fighter-belt', palette: 'blood' },
        category: 'equipment',
        slot: 'belt',
        rarity: 'raro',
        nivelRequerido: 15,
        attributes: {
            dmg_geral: 2,      // 20 pts
            strength: 8,       // 24 pts
            pv: 30,            // 30 pts
            critical: 2        // 16 pts
        }
        // Total: 90 pts / 96 pts (93%) ✅
    },

    // ────────── AMULETOS UTILITÁRIOS (pa:1 obrigatório grátis) ──────────

    // Amuleto do Curandeiro — Sabedoria (escala cura) + PV (Nv10, incomum)
    // Budget amulet Nv10 incomum: floor((20+50) × 1.15 × 0.80) = 64 pts
    {
        id: 'avulso_amuleto_curandeiro',
        catalogId: '0109000024',
        name: 'Amuleto do Curandeiro',
        icon: '✨',
        svgIcon: { shape: 'healer-amulet', palette: 'holy' },
        category: 'equipment',
        slot: 'amulet',
        rarity: 'incomum',
        nivelRequerido: 10,
        attributes: {
            wisdom: 10,        // 20 pts
            pv: 30,            // 30 pts
            intelligence: 4,   // 12 pts
            pa: 1              // grátis — amuleto obrigatório
        }
        // Total: 62 pts / 64 pts (96%) ✅ + pa:1 grátis
    },

    // Amuleto do Protetor — Bloqueio + parada + PV (Nv16, raro)
    // Budget amulet Nv16 raro: floor((20+80) × 1.35 × 0.80) = 108 pts
    {
        id: 'avulso_amuleto_protetor',
        catalogId: '0109000025',
        name: 'Amuleto do Protetor',
        icon: '🛡️',
        svgIcon: { shape: 'protector-amulet', palette: 'iron' },
        category: 'equipment',
        slot: 'amulet',
        rarity: 'raro',
        nivelRequerido: 16,
        attributes: {
            pv: 50,            // 50 pts
            block: 5,          // 20 pts
            parada: 4,         // 32 pts
            res_neutral: 3,    // 6 pts
            pa: 1              // grátis — amuleto obrigatório
        }
        // Total: 108 pts / 108 pts (100%) ✅ + pa:1 grátis
    }
];

// ========================================
// DB_CONJUNTOS - Conjuntos de Equipamentos
// ========================================
// 18 conjuntos: 6 por faixa de nível (T1: 1-5, T2: 6-11, T3: 12-20)
// bonuses[0] = bonus com 2 peças, bonuses[1] = 3 peças, bonuses[2] = 4 peças
// Campos de bonus: attributes (mesmas keys de playerBaseAttributes), pa, pm, pe, pv

const DB_CONJUNTOS = [
    // =============================================
    // T1 — Nível 1-5 (Famílias 1 a 6)
    // =============================================

    // F1: RATO — Agility/dodge
    {
        id: 'conjunto_rato',
        name: 'Conjunto do Rato',
        icon: '🐀',
        items: ['capacete_rato', 'peitoral_rato', 'botas_rato', 'cinto_rato'],
        bonuses: [
            { label: '2 Peças', attributes: { agility: 3 }, pv: 10 },
            { label: '3 Peças', attributes: { agility: 6, dodge: 2 }, pv: 20 },
            { label: '4 Peças', attributes: { agility: 12, dodge: 5 }, pv: 30, pm: 1 }
        ]
    },

    // F2: BARATA — HP/resistance
    {
        id: 'conjunto_barata',
        name: 'Conjunto da Barata',
        icon: '🪳',
        items: ['capacete_barata', 'peitoral_barata', 'cinto_barata', 'amuleto_barata'],
        bonuses: [
            { label: '2 Peças', attributes: { res_neutral: 3 }, pv: 15 },
            { label: '3 Peças', attributes: { res_neutral: 5, strength: 3 }, pv: 30 },
            { label: '4 Peças', attributes: { res_neutral: 8, res_earth: 5, block: 3, parada: 3 }, pv: 50 }
        ]
    },

    // F3: COGUMELO — Intelligence/water
    {
        id: 'conjunto_cogumelo',
        name: 'Conjunto do Cogumelo',
        icon: '🍄',
        items: ['capacete_cogumelo', 'capa_cogumelo', 'cinto_cogumelo', 'amuleto_cogumelo'],
        bonuses: [
            { label: '2 Peças', attributes: { intelligence: 4 }, pv: 10 },
            { label: '3 Peças', attributes: { intelligence: 8, res_water: 3 }, pv: 20 },
            { label: '4 Peças', attributes: { intelligence: 15, res_water: 6 }, pv: 30, pe: 1 }
        ]
    },

    // F4: SAPO — Dodge/water
    {
        id: 'conjunto_sapo',
        name: 'Conjunto do Sapo',
        icon: '🐸',
        items: ['capacete_sapo', 'capa_sapo', 'botas_sapo', 'amuleto_sapo', 'anel_sapo'],
        bonuses: [
            { label: '2 Peças', attributes: { dodge: 4 }, pv: 10 },
            { label: '3 Peças', attributes: { dodge: 8, agility: 5 }, pv: 20 },
            { label: '4 Peças', attributes: { dodge: 14, agility: 10, res_water: 8 }, pm: 1 }
        ]
    },

    // F5: MORCEGO — AGI/critical
    {
        id: 'conjunto_morcego',
        name: 'Conjunto do Morcego',
        icon: '🦇',
        items: ['capacete_morcego', 'peitoral_morcego', 'capa_morcego', 'botas_morcego', 'anel_morcego'],
        bonuses: [
            { label: '2 Peças', attributes: { agility: 4, critical: 2 } },
            { label: '3 Peças', attributes: { agility: 8, critical: 5, initiative: 4 } },
            { label: '4 Peças', attributes: { agility: 14, critical: 10, initiative: 8, dodge: 5 }, pa: 1 }
        ]
    },

    // F6: PLANTA — Strength/earth
    {
        id: 'conjunto_planta',
        name: 'Conjunto da Planta',
        icon: '🌿',
        items: ['capacete_planta', 'peitoral_planta', 'botas_planta', 'espinho_vivo'],
        bonuses: [
            { label: '2 Peças', attributes: { strength: 4 }, pv: 15 },
            { label: '3 Peças', attributes: { strength: 8, res_earth: 3 }, pv: 30 },
            { label: '4 Peças', attributes: { strength: 15, res_earth: 6, block: 3 }, pv: 50, pa: 1 }
        ]
    },

    // =============================================
    // T2 — Nível 6-11 (Famílias 7 a 12)
    // =============================================

    // F7: LOBO — STR/AGI hybrid
    {
        id: 'conjunto_lobo',
        name: 'Conjunto do Lobo',
        icon: '🐺',
        items: ['capacete_lobo', 'peitoral_lobo', 'capa_lobo', 'botas_lobo'],
        bonuses: [
            { label: '2 Peças', attributes: { strength: 6, agility: 4 }, pv: 25 },
            { label: '3 Peças', attributes: { strength: 12, agility: 8, critical: 3 }, pv: 40 },
            { label: '4 Peças', attributes: { strength: 20, agility: 14, critical: 6 }, pv: 60, pm: 1 }
        ]
    },

    // F8: ARANHA — AGI/critical
    {
        id: 'conjunto_aranha',
        name: 'Conjunto da Aranha',
        icon: '🕷️',
        items: ['capacete_aranha', 'capa_aranha', 'cinto_aranha', 'botas_aranha'],
        bonuses: [
            { label: '2 Peças', attributes: { agility: 5, critical: 3 }, pv: 15 },
            { label: '3 Peças', attributes: { agility: 10, critical: 6, dodge: 5 }, pv: 25 },
            { label: '4 Peças', attributes: { agility: 18, critical: 10, dodge: 10 }, pv: 40, pa: 1 }
        ]
    },

    // F9: JAVALI — STR/tank
    {
        id: 'conjunto_javali',
        name: 'Conjunto do Javali',
        icon: '🐗',
        items: ['capacete_javali', 'peitoral_javali', 'cinto_javali', 'presa_javali'],
        bonuses: [
            { label: '2 Peças', attributes: { strength: 6 }, pv: 30 },
            { label: '3 Peças', attributes: { strength: 12, block: 3 }, pv: 50 },
            { label: '4 Peças', attributes: { strength: 22, block: 6 }, pv: 80, pa: 1 }
        ]
    },

    // F10: ESQUELETO — STR/INT balanced
    {
        id: 'conjunto_esqueleto',
        name: 'Conjunto do Esqueleto',
        icon: '💀',
        items: ['capacete_esqueleto', 'peitoral_esqueleto', 'amuleto_esqueleto', 'lamina_osso', 'anel_esqueleto'],
        bonuses: [
            { label: '2 Peças', attributes: { strength: 5, intelligence: 3 }, pv: 20 },
            { label: '3 Peças', attributes: { strength: 10, intelligence: 6, res_neutral: 4 }, pv: 35 },
            { label: '4 Peças', attributes: { strength: 18, intelligence: 10, res_neutral: 8, critical: 5, range: 1 }, pv: 55 }
        ]
    },

    // F11: COBRA — AGI/dodge/water
    {
        id: 'conjunto_cobra',
        name: 'Conjunto da Cobra',
        icon: '🐍',
        items: ['capacete_cobra', 'capa_cobra', 'botas_cobra', 'amuleto_cobra', 'anel_cobra'],
        bonuses: [
            { label: '2 Peças', attributes: { agility: 6, dodge: 4 }, pv: 15 },
            { label: '3 Peças', attributes: { agility: 12, dodge: 8, res_water: 5 }, pv: 30 },
            { label: '4 Peças', attributes: { agility: 20, dodge: 14, res_water: 10, critical: 6 }, pv: 45, pm: 1 }
        ]
    },

    // F12: GOBLIN — STR/AGI/LUCK mixed
    {
        id: 'conjunto_goblin',
        name: 'Conjunto do Goblin',
        icon: '👺',
        items: ['capacete_goblin', 'peitoral_goblin', 'cinto_goblin', 'botas_goblin'],
        bonuses: [
            { label: '2 Peças', attributes: { strength: 4, agility: 4, luck: 4 } },
            { label: '3 Peças', attributes: { strength: 8, agility: 8, luck: 8 }, pv: 25 },
            { label: '4 Peças', attributes: { strength: 14, agility: 14, luck: 14, critical: 8 }, pv: 40 }
        ]
    },

    // =============================================
    // T3 — Nível 12-20 (Famílias 13 a 18)
    // =============================================

    // F13: URSO — STR/tank extreme
    {
        id: 'conjunto_urso',
        name: 'Conjunto do Urso',
        icon: '🐻',
        items: ['capacete_urso', 'peitoral_urso', 'cinto_urso', 'botas_urso', 'anel_urso'],
        bonuses: [
            { label: '2 Peças', attributes: { strength: 10, res_earth: 5 }, pv: 50 },
            { label: '3 Peças', attributes: { strength: 20, res_earth: 10, block: 5 }, pv: 100 },
            { label: '4 Peças', attributes: { strength: 35, res_earth: 15, block: 10 }, pv: 160, pa: 1 }
        ]
    },

    // F14: TROLL — Raw strength
    {
        id: 'conjunto_troll',
        name: 'Conjunto do Troll',
        icon: '👹',
        items: ['capacete_troll', 'peitoral_troll', 'cinto_troll', 'porrete_troll'],
        bonuses: [
            { label: '2 Peças', attributes: { strength: 10 }, pv: 60 },
            { label: '3 Peças', attributes: { strength: 20, res_neutral: 8 }, pv: 120 },
            { label: '4 Peças', attributes: { strength: 35, res_neutral: 15, res_earth: 8 }, pv: 200, pa: 1 }
        ]
    },

    // F15: GOLEM — Block/defense
    {
        id: 'conjunto_golem',
        name: 'Conjunto do Golem',
        icon: '🗿',
        items: ['capacete_golem', 'peitoral_golem', 'botas_golem', 'escudo_cristal'],
        bonuses: [
            { label: '2 Peças', attributes: { block: 6, res_earth: 5 }, pv: 60 },
            { label: '3 Peças', attributes: { block: 12, res_earth: 10, res_neutral: 5 }, pv: 120 },
            { label: '4 Peças', attributes: { block: 20, res_earth: 18, res_neutral: 10, strength: 15, parada: 5 }, pv: 200 }
        ]
    },

    // F16: HARPIA — AGI/critical max
    {
        id: 'conjunto_harpia',
        name: 'Conjunto da Harpia',
        icon: '🦅',
        items: ['capacete_harpia', 'capa_harpia', 'botas_harpia', 'amuleto_harpia', 'anel_harpia'],
        bonuses: [
            { label: '2 Peças', attributes: { agility: 10, dodge: 6 }, pv: 30 },
            { label: '3 Peças', attributes: { agility: 18, dodge: 12, critical: 8 }, pv: 50 },
            { label: '4 Peças', attributes: { agility: 30, dodge: 20, critical: 14, res_air: 10 }, pv: 80, pm: 1 }
        ]
    },

    // F17: LAGARTO — STR/AGI hybrid
    {
        id: 'conjunto_lagarto',
        name: 'Conjunto do Lagarto',
        icon: '🦎',
        items: ['capacete_lagarto', 'peitoral_lagarto', 'capa_lagarto', 'lamina_escama'],
        bonuses: [
            { label: '2 Peças', attributes: { strength: 8, agility: 6 }, pv: 40 },
            { label: '3 Peças', attributes: { strength: 16, agility: 12, res_water: 6 }, pv: 80 },
            { label: '4 Peças', attributes: { strength: 28, agility: 20, res_water: 12, res_earth: 8 }, pv: 130, pa: 1 }
        ]
    },

    // F18: OGRO — Raw strength
    {
        id: 'conjunto_ogro',
        name: 'Conjunto do Ogro',
        icon: '💪',
        items: ['capacete_ogro', 'peitoral_ogro', 'cinto_ogro', 'tabua_ogro'],
        bonuses: [
            { label: '2 Peças', attributes: { strength: 12 }, pv: 60 },
            { label: '3 Peças', attributes: { strength: 24, res_neutral: 10 }, pv: 120 },
            { label: '4 Peças', attributes: { strength: 40, res_neutral: 18, block: 8 }, pv: 200, pa: 1 }
        ]
    },

    // =============================================
    // CONJUNTOS ELEMENTAIS UNIVERSAIS
    // Mais fracos que sets focados, mas versáteis
    // =============================================

    // SÁBIO — Elemental geral (Nv 8, incomum)
    {
        id: 'conjunto_sabio',
        name: 'Conjunto do Sábio',
        icon: '🔮',
        items: ['anel_sabio', 'amuleto_sabio', 'capa_sabio', 'cinto_sabio'],
        bonuses: [
            { label: '2 Peças', attributes: { dmg_elemental: 1, res_general: 1 }, pv: 8 },
            { label: '3 Peças', attributes: { dmg_elemental: 2, res_general: 2, wisdom: 3 }, pv: 15 },
            { label: '4 Peças', attributes: { dmg_elemental: 3, res_general: 3, wisdom: 5, range: 1 }, pv: 25 }
        ]
    },

    // PRIMORDIAL — Elemental geral (Nv 15, raro)
    {
        id: 'conjunto_primordial',
        name: 'Conjunto Primordial',
        icon: '🌀',
        items: ['anel_primordial', 'amuleto_primordial', 'capacete_primordial', 'capa_primordial'],
        bonuses: [
            { label: '2 Peças', attributes: { dmg_elemental: 2, res_general: 2 }, pv: 12 },
            { label: '3 Peças', attributes: { dmg_elemental: 3, res_general: 3, wisdom: 4 }, pv: 22 },
            { label: '4 Peças', attributes: { dmg_elemental: 5, res_general: 5, wisdom: 6, invocation: 1 }, pv: 40 }
        ]
    }
];

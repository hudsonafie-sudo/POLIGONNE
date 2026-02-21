// ========== BANCO DE DADOS: ARMAS ==========
// Armas são equipamentos especiais que, ao serem equipadas,
// concedem uma habilidade de combate usável durante a batalha.
//
// Dano conta pontos: dano médio × 2 pontos
// Exemplo: dano 10-15 = média 12.5 × 2 = 25 pontos

// ITENS INICIAIS - Apenas comum, níveis 1-10
// Sistema de balanceamento: cada item tem orçamento de pontos baseado em nível e raridade


// ─── Arquétipos de Arma ──────────────────────────────────
// Define alcance e padrão de ataque por tipo de arma.
// Todas as armas do mesmo tipo compartilham o mesmo padrão.
// Segunda mão (weaponLeft) não ataca — escudos são passivos.

const WEAPON_ARCHETYPES = {
    sword: {
        name: 'Espada',
        icon: '🗡️',
        minRange: 1, maxRange: 1,
        aoePattern: 'single',   // 1 célula
        aoeSize: 1,
        description: 'Golpe corpo-a-corpo em 1 alvo adjacente'
    },
    dagger: {
        name: 'Adaga',
        icon: '🔪',
        minRange: 1, maxRange: 1,
        aoePattern: 'single',
        aoeSize: 1,
        description: 'Golpe rápido corpo-a-corpo em 1 alvo adjacente'
    },
    hammer: {
        name: 'Martelo',
        icon: '🔨',
        minRange: 1, maxRange: 1,
        aoePattern: 'T',        // alvo + 2 laterais + 1 atrás = 4 células
        aoeSize: 4,
        description: 'Impacto em T: alvo + 2 laterais + 1 atrás do alvo'
    },
    bow: {
        name: 'Arco',
        icon: '🏹',
        minRange: 2, maxRange: 6,
        aoePattern: 'single',
        aoeSize: 1,
        description: 'Disparo à distância em 1 alvo (alcance 4-6)'
    },
    staff: {
        name: 'Cajado',
        icon: '🪄',
        minRange: 1, maxRange: 3,
        aoePattern: 'perpendicular3', // barra de 3 células perpendicular à direção
        aoeSize: 3,
        description: 'Linha perpendicular: alvo + 2 adjacentes laterais'
    }
};


const DB_ARMAS = [
    // === ESPADAS ===
    // Nível 1 - Orçamento: 24 pontos (comum)
    {
        id: 'espada_madeira',
        catalogId: '0201000001',
        name: 'Espada de Madeira',
        icon: '🗡️',
        svgIcon: { shape: 'wooden-sword', palette: 'wood' },
        category: 'equipment',
        slot: 'weapon',
        weaponType: 'sword',
        rarity: 'comum',
        nivelRequerido: 1,
        attributes: {
            strength: 2    // 6 pts
        },
        ability: {
            name: 'Golpe Básico',
            icon: '🗡️',
            paCost: 4,
            pmCost: 0,
            peCost: 0,
            minRange: 1, maxRange: 1,
            rangeType: 'cross',
            damage: { min: 6, max: 10, stat: 'strength' },  // média 8 × 2 = 16 pts
            element: 'none',
            targetType: 'enemy'
        }
        // Total: 22 pts / 24 pts (91% utilização) ✅
    },

    // Nível 5 - Orçamento: 44 pontos (comum)
    {
        id: 'espada_ferro',
        catalogId: '0201000002',
        name: 'Espada de Ferro',
        icon: '🗡️',
        svgIcon: { shape: 'iron-sword', palette: 'iron' },
        category: 'equipment',
        slot: 'weapon',
        weaponType: 'sword',
        rarity: 'comum',
        nivelRequerido: 5,
        attributes: {
            strength: 4,   // 12 pts
            agility: 1     // 3 pts
        },
        ability: {
            name: 'Golpe de Espada',
            icon: '🗡️',
            paCost: 4,
            pmCost: 0,
            peCost: 0,
            minRange: 1, maxRange: 1,
            rangeType: 'cross',
            damage: { min: 10, max: 16, stat: 'strength' },  // média 13 × 2 = 26 pts
            element: 'none',
            targetType: 'enemy'
        }
        // Total: 41 pts / 44 pts (93% utilização) ✅
    },

    // Nível 10 - Orçamento: 64 pontos (comum)
    {
        id: 'espada_aco',
        catalogId: '0201000003',
        name: 'Espada de Aço',
        icon: '🗡️',
        svgIcon: { shape: 'steel-sword', palette: 'steel' },
        category: 'equipment',
        slot: 'weapon',
        weaponType: 'sword',
        rarity: 'comum',
        nivelRequerido: 10,
        attributes: {
            strength: 6,   // 18 pts
            agility: 2,    // 6 pts
            critical: 1    // 5 pts
        },
        ability: {
            name: 'Corte Poderoso',
            icon: '🗡️',
            paCost: 4,
            pmCost: 0,
            peCost: 0,
            minRange: 1, maxRange: 1,
            rangeType: 'cross',
            damage: { min: 14, max: 20, stat: 'strength' },  // média 17 × 2 = 34 pts
            element: 'none',
            targetType: 'enemy'
        }
        // Total: 63 pts / 64 pts (98% utilização) ✅
    },

    // === ARCOS ===
    // Nível 3 - Orçamento: 32 pontos (comum)
    {
        id: 'arco_simples',
        catalogId: '0202000001',
        name: 'Arco Simples',
        icon: '🏹',
        svgIcon: { shape: 'simple-bow', palette: 'wood' },
        category: 'equipment',
        slot: 'weapon',
        weaponType: 'bow',
        rarity: 'comum',
        nivelRequerido: 3,
        attributes: {
            agility: 3,    // 9 pts
            luck: 2        // 4 pts
        },
        ability: {
            name: 'Flecha',
            icon: '🏹',
            paCost: 3,
            pmCost: 0,
            peCost: 0,
            minRange: 2, maxRange: 4,
            rangeType: 'cross',
            damage: { min: 5, max: 11, stat: 'agility' },  // média 8 × 2 = 16 pts
            element: 'none',
            targetType: 'enemy'
        }
        // Total: 29 pts / 32 pts (90% utilização) ✅
    },

    // Nível 7 - Orçamento: 48 pontos (comum)
    {
        id: 'arco_longo',
        catalogId: '0202000002',
        name: 'Arco Longo',
        icon: '🏹',
        svgIcon: { shape: 'long-bow', palette: 'nature' },
        category: 'equipment',
        slot: 'weapon',
        weaponType: 'bow',
        rarity: 'comum',
        nivelRequerido: 7,
        attributes: {
            agility: 6,    // 18 pts
            luck: 3        // 6 pts
        },
        ability: {
            name: 'Tiro Certeiro',
            icon: '🏹',
            paCost: 3,
            pmCost: 0,
            peCost: 0,
            minRange: 2, maxRange: 6,
            rangeType: 'cross',
            damage: { min: 8, max: 14, stat: 'agility' },  // média 11 × 2 = 22 pts
            element: 'none',
            targetType: 'enemy'
        }
        // Total: 46 pts / 48 pts (95% utilização) ✅
    },

    // === CAJADOS ===
    // Nível 4 - Orçamento: 36 pontos (comum)
    {
        id: 'cajado_aprendiz',
        catalogId: '0203000001',
        name: 'Cajado do Aprendiz',
        icon: '🪄',
        svgIcon: { shape: 'apprentice-staff', palette: 'wood' },
        category: 'equipment',
        slot: 'weapon',
        weaponType: 'staff',
        rarity: 'comum',
        nivelRequerido: 4,
        attributes: {
            intelligence: 4,  // 12 pts
            wisdom: 1         // 3 pts
        },
        ability: {
            name: 'Raio Mágico',
            icon: '⚡',
            paCost: 3,
            pmCost: 0,
            peCost: 1,
            minRange: 1, maxRange: 3,
            rangeType: 'circle',
            damage: { min: 7, max: 11, stat: 'intelligence' },  // média 9 × 2 = 18 pts
            element: 'none',
            targetType: 'enemy'
        }
        // Total: 33 pts / 36 pts (91% utilização) ✅
    },

    // Nível 8 - Orçamento: 52 pontos (comum)
    {
        id: 'cajado_fogo',
        catalogId: '0203000002',
        name: 'Cajado de Fogo',
        icon: '🔥',
        svgIcon: { shape: 'fire-staff', palette: 'fire' },
        category: 'equipment',
        slot: 'weapon',
        weaponType: 'staff',
        rarity: 'comum',
        nivelRequerido: 8,
        attributes: {
            intelligence: 7,  // 21 pts
            wisdom: 2         // 6 pts
        },
        ability: {
            name: 'Chama Ardente',
            icon: '🔥',
            paCost: 3,
            pmCost: 0,
            peCost: 1,
            minRange: 1, maxRange: 3,
            rangeType: 'circle',
            damage: { min: 9, max: 15, stat: 'intelligence' },  // média 12 × 2 = 24 pts
            element: 'fire',
            targetType: 'enemy'
        }
        // Total: 51 pts / 52 pts (98% utilização) ✅
    },

    // === ITEM ÉPICO (Nível 1-10) ===
    // Nível 8 - Orçamento: 84 pontos (épico)
    {
        id: 'espada_tempestade',
        catalogId: '0201EPIC01',
        name: 'Lâmina da Tempestade',
        icon: '⚔️',
        svgIcon: { shape: 'storm-blade', palette: 'storm' },
        category: 'equipment',
        slot: 'weapon',
        weaponType: 'sword',
        rarity: 'epico',
        nivelRequerido: 8,
        attributes: {
            strength: 8,      // 24 pts
            agility: 4,       // 12 pts
            critical: 2,      // 10 pts
            intelligence: 2,  // 6 pts
            pa: 1             // grátis — épico deve ter PA ou PM
        },
        ability: {
            name: 'Fúria da Tempestade',
            icon: '⚡',
            paCost: 4,
            pmCost: 0,
            peCost: 1,
            minRange: 1, maxRange: 1,
            rangeType: 'cross',
            damage: { min: 12, max: 20, stat: 'strength' },  // média 16 × 2 = 32 pts
            element: 'air',
            targetType: 'enemy'
        }
        // Total: 84 pts / 84 pts (100% utilização) ✅
    },

    // === ITEM LENDÁRIO (Nível 1-10) ===
    // Nível 10 - Orçamento: 180 pontos (lendário)
    {
        id: 'cajado_arcano',
        catalogId: '0203LEG001',
        name: 'Cajado Arcano Supremo',
        icon: '🌟',
        svgIcon: { shape: 'arcane-supreme-staff', palette: 'arcane' },
        category: 'equipment',
        slot: 'weapon',
        weaponType: 'staff',
        rarity: 'lendario',
        nivelRequerido: 10,
        twoHanded: true,  // Arma de duas mãos
        attributes: {
            intelligence: 15, // 45 pts
            wisdom: 10,       // 30 pts
            pa: 1,            // 10 pts
            pe: 1,            // 7 pts
            range: 1          // 9 pts
        },
        ability: {
            name: 'Meteoro Arcano',
            icon: '☄️',
            paCost: 5,
            pmCost: 0,
            peCost: 2,
            minRange: 2, maxRange: 6,
            rangeType: 'circle',
            damage: { min: 20, max: 36, stat: 'intelligence' },  // média 28 × 2 = 56 pts
            element: 'fire',
            targetType: 'enemy'
        }
        // Total: 157 pts / 180 pts (87% utilização) ✅
        // Lendário tem grande alcance e dano em área
    },

    // Cole o próximo item aqui
];

// ========== BANCO DE DADOS: ARMADURAS ==========
// Armaduras, capas, cintos e anéis ficam aqui (equipamentos que dão atributos).
// Armas ficam em equipamentos/armas.js (equipamentos que dão dano).

// ITENS INICIAIS - Apenas comum, níveis 1-10
// Sistema de balanceamento: cada item tem orçamento de pontos baseado em nível e raridade

const DB_ARMADURAS = [
    // === CAPACETES ===
    // Nível 1 - Orçamento: 24 pontos (comum)
    {
        id: 'capacete_couro',
        catalogId: '0101000001',
        name: 'Capacete de Couro',
        icon: '⛑️',
        svgIcon: { shape: 'visored-helm', palette: 'copper' },
        category: 'equipment',
        slot: 'helmet',
        rarity: 'comum',
        nivelRequerido: 1,
        attributes: {
            pv: 15,        // 15 pts (15 * 1)
            strength: 2    // 6 pts (2 * 3)
        }
        // Total: 21 pts / 24 pts (87% utilização) ✅
    },

    // Nível 5 - Orçamento: 44 pontos (comum)
    {
        id: 'capacete_ferro',
        catalogId: '0101000002',
        name: 'Capacete de Ferro',
        icon: '⛑️',
        svgIcon: { shape: 'visored-helm', palette: 'iron' },
        category: 'equipment',
        slot: 'helmet',
        rarity: 'comum',
        nivelRequerido: 5,
        attributes: {
            pv: 25,        // 25 pts
            strength: 4,   // 12 pts
            dodge: 1       // 4 pts
        }
        // Total: 41 pts / 44 pts (93% utilização) ✅
    },

    // Nível 10 - Orçamento: 64 pontos (comum)
    {
        id: 'capacete_aco',
        catalogId: '0101000003',
        name: 'Capacete de Aço',
        icon: '⛑️',
        svgIcon: { shape: 'visored-helm', palette: 'steel' },
        category: 'equipment',
        slot: 'helmet',
        rarity: 'comum',
        nivelRequerido: 10,
        attributes: {
            pv: 40,        // 40 pts
            strength: 6,   // 18 pts
            dodge: 1       // 4 pts
        }
        // Total: 62 pts / 64 pts (96% utilização) ✅
    },

    // === PEITORAIS ===
    // Nível 1 - Orçamento: 24 pontos (comum)
    {
        id: 'peitoral_tecido',
        catalogId: '0102000001',
        name: 'Peitoral de Tecido',
        icon: '🛡️',
        svgIcon: { shape: 'leather-vest', palette: 'copper' },
        category: 'equipment',
        slot: 'chest',
        rarity: 'comum',
        nivelRequerido: 1,
        attributes: {
            pv: 20,        // 20 pts
            agility: 1,    // 3 pts
            pm: 1          // grátis — peitoral obrigatório
        }
        // Total: 23 pts / 24 pts (95%) ✅ + pm:1 grátis
    },

    // Nível 5 - Orçamento: 44 pontos (comum)
    {
        id: 'peitoral_couro',
        catalogId: '0102000002',
        name: 'Peitoral de Couro',
        icon: '🛡️',
        svgIcon: { shape: 'leather-vest', palette: 'leather' },
        category: 'equipment',
        slot: 'chest',
        rarity: 'comum',
        nivelRequerido: 5,
        attributes: {
            pv: 35,        // 35 pts
            agility: 3,    // 9 pts
            pm: 1          // grátis — peitoral obrigatório
        }
        // Total: 44 pts / 44 pts (100%) ✅ + pm:1 grátis
    },

    // Nível 10 - Orçamento: 64 pontos (comum)
    {
        id: 'peitoral_cota',
        catalogId: '0102000003',
        name: 'Cota de Malha',
        icon: '🛡️',
        svgIcon: { shape: 'chainmail', palette: 'steel' },
        category: 'equipment',
        slot: 'chest',
        rarity: 'comum',
        nivelRequerido: 10,
        attributes: {
            pv: 50,        // 50 pts
            strength: 3,   // 9 pts
            dodge: 1,      // 4 pts
            pm: 1          // grátis — peitoral obrigatório
        }
        // Total: 63 pts / 64 pts (98%) ✅ + pm:1 grátis
    },

    // === BOTAS ===
    // Nível 3 - Orçamento: 32 pontos (comum)
    {
        id: 'botas_couro',
        catalogId: '0104000001',
        name: 'Botas de Couro',
        icon: '👢',
        svgIcon: { shape: 'leather-boots', palette: 'leather' },
        category: 'equipment',
        slot: 'boots',
        rarity: 'comum',
        nivelRequerido: 3,
        attributes: {
            pv: 10,        // 10 pts
            agility: 6,    // 18 pts
            dodge: 1,      // 4 pts
            pm: 1          // grátis — bota obrigatório
        }
        // Total: 32 pts / 32 pts (100%) ✅ + pm:1 grátis
    },

    // Nível 7 - Orçamento: 48 pontos (comum)
    {
        id: 'botas_reforcadas',
        catalogId: '0104000002',
        name: 'Botas Reforçadas',
        icon: '👢',
        svgIcon: { shape: 'reinforced-boots', palette: 'iron' },
        category: 'equipment',
        slot: 'boots',
        rarity: 'comum',
        nivelRequerido: 7,
        attributes: {
            pv: 15,        // 15 pts
            agility: 8,    // 24 pts
            dodge: 2,      // 8 pts
            pm: 1          // grátis — bota obrigatório
        }
        // Total: 47 pts / 48 pts (98%) ✅ + pm:1 grátis
    },

    // === CAPAS ===
    // Nível 2 - Orçamento: 28 pontos (comum)
    {
        id: 'capa_simples',
        catalogId: '0105000001',
        name: 'Capa Simples',
        icon: '🧣',
        svgIcon: { shape: 'simple-cape', palette: 'leather' },
        category: 'equipment',
        slot: 'cape',
        rarity: 'comum',
        nivelRequerido: 2,
        attributes: {
            agility: 4,    // 12 pts
            luck: 3,       // 6 pts
            dodge: 2,      // 8 pts
            pa: 1          // grátis — capa obrigatório
        }
        // Total: 26 pts / 28 pts (92%) ✅ + pa:1 grátis
    },

    // === ANÉIS ===
    // Anéis dão menos atributos (10 slots disponíveis)
    // Orçamento de anel ≈ 30% do orçamento normal

    // Nível 1 - Orçamento: ~7 pontos (30% de 24)
    {
        id: 'anel_forca',
        catalogId: '0107000001',
        name: 'Anel de Força',
        icon: '💍',
        svgIcon: { shape: 'strength-ring', palette: 'iron' },
        category: 'equipment',
        slot: 'ring',
        rarity: 'comum',
        nivelRequerido: 1,
        attributes: {
            strength: 2    // 6 pts
        }
        // Total: 6 pts / 7 pts (85% utilização) ✅
    },

    {
        id: 'anel_agilidade',
        catalogId: '0107000002',
        name: 'Anel de Agilidade',
        icon: '💍',
        svgIcon: { shape: 'agility-ring', palette: 'wind' },
        category: 'equipment',
        slot: 'ring',
        rarity: 'comum',
        nivelRequerido: 1,
        attributes: {
            agility: 2     // 6 pts
        }
        // Total: 6 pts / 7 pts (85% utilização) ✅
    },

    {
        id: 'anel_vida',
        catalogId: '0107000003',
        name: 'Anel de Vida',
        icon: '💍',
        svgIcon: { shape: 'life-ring', palette: 'nature' },
        category: 'equipment',
        slot: 'ring',
        rarity: 'comum',
        nivelRequerido: 1,
        attributes: {
            pv: 6          // 6 pts
        }
        // Total: 6 pts / 7 pts (85% utilização) ✅
    },

    // Nível 5 - Orçamento: ~13 pontos (30% de 44)
    {
        id: 'anel_sortudo',
        catalogId: '0107000010',
        name: 'Anel Sortudo',
        icon: '💍',
        svgIcon: { shape: 'lucky-ring', palette: 'gold' },
        category: 'equipment',
        slot: 'ring',
        rarity: 'comum',
        nivelRequerido: 5,
        attributes: {
            luck: 4,       // 8 pts
            agility: 1     // 3 pts
        }
        // Total: 11 pts / 13 pts (84% utilização) ✅
    },

    // === ITEM ÉPICO (Nível 1-10) ===
    // Nível 7 - Orçamento: 76 pontos (épico)
    {
        id: 'capacete_guardiao',
        catalogId: '0101EPIC01',
        name: 'Capacete do Guardião',
        icon: '👑',
        svgIcon: { shape: 'crowned-helmet', palette: 'epic' },
        category: 'equipment',
        slot: 'helmet',
        rarity: 'epico',
        nivelRequerido: 7,
        attributes: {
            pv: 50,        // 50 pts
            strength: 5,   // 15 pts
            dodge: 2,      // 8 pts
            block: 1,      // 4 pts
            pm: 1          // grátis — épico deve ter PA ou PM
        }
        // Total: 77 pts / 76 pts (101%) ✅ + pm:1 grátis (épico)
    },

    // === ITEM LENDÁRIO (Nível 1-10) ===
    // Nível 10 - Orçamento: 180 pontos (lendário)
    {
        id: 'amuleto_destino',
        catalogId: '0108LEG001',
        name: 'Amuleto do Destino',
        icon: '✨',
        svgIcon: { shape: 'ankh-pendant', palette: 'holy' },
        category: 'equipment',
        slot: 'amulet',
        rarity: 'lendario',
        nivelRequerido: 10,
        attributes: {
            pv: 60,           // 60 pts
            strength: 8,      // 24 pts
            intelligence: 8,  // 24 pts
            agility: 8,       // 24 pts
            luck: 10,         // 20 pts
            pa: 1,            // grátis — amuleto obrigatório
            pm: 1,            // grátis — bônus lendário
            range: 1          // grátis — stat primário
        }
        // Total: 152 pts / 180 pts (84%) ✅ + pa:1, pm:1, range:1 grátis
    },

    // === ESCUDOS (Mão Esquerda) ===
    // Escudos são itens defensivos que ocupam o slot weaponLeft
    // Não podem ser usados com armas de duas mãos

    // Nível 1 - Orçamento: ~24 pontos (comum)
    {
        id: 'escudo_madeira',
        catalogId: '0110000001',
        name: 'Escudo de Madeira',
        icon: '🛡️',
        svgIcon: { shape: 'wooden-shield', palette: 'wood' },
        category: 'equipment',
        slot: 'weaponLeft',
        rarity: 'comum',
        nivelRequerido: 1,
        attributes: {
            pv: 12,        // 12 pts
            block: 2       // 8 pts
        }
        // Total: 20 pts / 24 pts (83%) ✅
    },

    // Nível 5 - Orçamento: ~44 pontos (comum)
    {
        id: 'escudo_ferro',
        catalogId: '0110000002',
        name: 'Escudo de Ferro',
        icon: '🛡️',
        svgIcon: { shape: 'iron-shield', palette: 'iron' },
        category: 'equipment',
        slot: 'weaponLeft',
        rarity: 'comum',
        nivelRequerido: 5,
        attributes: {
            pv: 22,        // 22 pts
            block: 3,      // 12 pts
            res_neutral: 2 // 4 pts
        }
        // Total: 38 pts / 44 pts (86%) ✅
    },

    // Nível 10 - Orçamento: ~64 pontos (comum)
    {
        id: 'escudo_aco',
        catalogId: '0110000003',
        name: 'Escudo de Aço',
        icon: '🛡️',
        svgIcon: { shape: 'steel-shield', palette: 'steel' },
        category: 'equipment',
        slot: 'weaponLeft',
        rarity: 'comum',
        nivelRequerido: 10,
        attributes: {
            pv: 30,        // 30 pts
            block: 4,      // 16 pts
            res_neutral: 3,// 6 pts
            dodge: 1       // 4 pts
        }
        // Total: 56 pts / 64 pts (87%) ✅
    },

    // Nível 12 - Orçamento: ~90 pontos (raro) — ESCUDO BLOCK+VIDA FOCADO
    {
        id: 'muralha_viva',
        catalogId: '0110RAR001',
        name: 'Muralha Viva',
        icon: '🛡️',
        svgIcon: { shape: 'living-wall-shield', palette: 'nature' },
        category: 'equipment',
        slot: 'weaponLeft',
        rarity: 'raro',
        nivelRequerido: 12,
        attributes: {
            pv: 55,        // 55 pts — máximo de vida
            block: 6,      // 24 pts — bloqueio alto
            res_neutral: 3,// 6 pts
            res_general: 1 // 8 pts
        }
        // Total: 93 pts / 90 pts (103%) — focado em BLOCK + VIDA ✅
    },

    // === ITENS DE TESTE — Atributos Negativos ===
    // Estes itens existem para testar se atributos negativos funcionam corretamente

    // Teste 1: Anel — FOR negativa, Invocação negativa
    {
        id: 'teste_anel_amaldicoado',
        catalogId: '0107TEST01',
        name: 'Anel Amaldiçoado',
        icon: '💀',
        svgIcon: { shape: 'strength-ring', palette: 'void' },
        category: 'equipment',
        slot: 'ring',
        rarity: 'raro',
        nivelRequerido: 1,
        attributes: {
            strength: -5,
            invocation: -2,
            critical: 3,
            pv: 20
        }
    },

    // Teste 2: Capacete — Alcance negativo, FOR positiva
    {
        id: 'teste_capacete_caos',
        catalogId: '0101TEST01',
        name: 'Capacete do Caos',
        icon: '🌀',
        svgIcon: { shape: 'visored-helm', palette: 'shadow' },
        category: 'equipment',
        slot: 'helmet',
        rarity: 'raro',
        nivelRequerido: 1,
        attributes: {
            range: -2,
            strength: 10,
            pv: 30
        }
    },

    // Teste 3: Botas — AGI negativa, Esquiva negativa, PV/Bloqueio altos
    {
        id: 'teste_botas_pesadas',
        catalogId: '0104TEST01',
        name: 'Botas de Chumbo',
        icon: '⚓',
        svgIcon: { shape: 'reinforced-boots', palette: 'iron' },
        category: 'equipment',
        slot: 'boots',
        rarity: 'raro',
        nivelRequerido: 1,
        attributes: {
            agility: -8,
            dodge: -3,
            pv: 50,
            block: 5,
            pm: -1
        }
    },

    // Teste 4: Capa — INT negativa, SAB negativa, AGI positiva
    {
        id: 'teste_capa_vazio',
        catalogId: '0105TEST01',
        name: 'Capa do Vazio',
        icon: '🕳️',
        svgIcon: { shape: 'simple-cape', palette: 'void' },
        category: 'equipment',
        slot: 'cape',
        rarity: 'raro',
        nivelRequerido: 1,
        attributes: {
            intelligence: -6,
            wisdom: -4,
            agility: 8,
            dodge: 4,
            pa: 1
        }
    },

    // Teste 5: Peitoral — Crítico negativo, Sorte negativa, PV/FOR altos
    {
        id: 'teste_peitoral_corrompido',
        catalogId: '0102TEST01',
        name: 'Peitoral Corrompido',
        icon: '☠️',
        svgIcon: { shape: 'chainmail', palette: 'blood' },
        category: 'equipment',
        slot: 'chest',
        rarity: 'raro',
        nivelRequerido: 1,
        attributes: {
            critical: -5,
            luck: -4,
            strength: 12,
            pv: 60,
            pm: 1
        }
    },

    // === ANÉIS DE TESTE — Resistência e Dano ===
    // Anéis para testar visualização e funcionamento de resistências/dano

    // Teste: Anel +50 Resistência Geral (distribui para todos os 5 elementos)
    {
        id: 'teste_anel_res_geral_1',
        catalogId: '0107TEST10',
        name: 'Anel da Muralha',
        icon: '💍',
        svgIcon: { shape: 'shield-ring', palette: 'silver' },
        category: 'equipment',
        slot: 'ring',
        rarity: 'raro',
        nivelRequerido: 1,
        attributes: {
            res_general: 50
        }
    },

    // Teste: Anel +50 Resistência Geral (segundo, para testar stack)
    {
        id: 'teste_anel_res_geral_2',
        catalogId: '0107TEST11',
        name: 'Anel do Bastião',
        icon: '💍',
        svgIcon: { shape: 'shield-ring', palette: 'iron' },
        category: 'equipment',
        slot: 'ring',
        rarity: 'raro',
        nivelRequerido: 1,
        attributes: {
            res_general: 50
        }
    },

    // Teste: Anel +50 Dano Terra
    {
        id: 'teste_anel_dano_terra',
        catalogId: '0107TEST12',
        name: 'Anel Sísmico',
        icon: '💍',
        svgIcon: { shape: 'earth-ring', palette: 'jade' },
        category: 'equipment',
        slot: 'ring',
        rarity: 'raro',
        nivelRequerido: 1,
        attributes: {
            dmg_earth: 50
        }
    },

    // Teste: Anel +50 Resistência Neutra
    {
        id: 'teste_anel_res_neutro',
        catalogId: '0107TEST13',
        name: 'Anel do Éter',
        icon: '💍',
        svgIcon: { shape: 'neutral-ring', palette: 'bone' },
        category: 'equipment',
        slot: 'ring',
        rarity: 'raro',
        nivelRequerido: 1,
        attributes: {
            res_neutral: 50
        }
    },

    // ===== [TESTE] ITENS DE TESTE — NÃO DISPONÍVEIS PARA JOGADORES =====
    // Para testar sistema de Vontade e Prospecção
    {
        id: 'teste_anel_vontade',
        catalogId: '9900TEST01',
        name: '[TESTE] Anel da Vontade Absoluta',
        icon: '💎',
        svgIcon: { shape: 'diamond-ring', palette: 'arcane' },
        category: 'equipment',
        slot: 'ring',
        rarity: 'lendario',
        nivelRequerido: 1,
        attributes: {
            wisdom: 100
        }
    },
    {
        id: 'teste_amuleto_prospeccao',
        catalogId: '9900TEST02',
        name: '[TESTE] Amuleto do Garimpeiro',
        icon: '⛏️',
        svgIcon: { shape: 'gem-pendant', palette: 'gold' },
        category: 'equipment',
        slot: 'amulet',
        rarity: 'lendario',
        nivelRequerido: 1,
        attributes: {
            prospeccao: 50
        }
    },

    // Cole o próximo item aqui
];

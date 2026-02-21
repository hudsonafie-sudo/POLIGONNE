// ========== BANCO DE DADOS: CONSUMÍVEIS ==========
// Todos craftados pelo Padeiro (absorveu Alquimista)
// T1 (Nv 1): comidas e poções básicas
// T2 (Nv 5): poções e elixires intermediários
// T2 Avançado (Nv 10): elixires e poções avançadas

const DB_CONSUMIVEIS = [

    // ==================== T1 — Nível Padeiro 1 ====================

    {
        id: 'cons_pao_simples',
        catalogId: '0401000001',
        name: 'Pão Simples',
        icon: '🍞',
        svgIcon: { shape: 'bread-simple', palette: 'gold' },
        category: 'consumable',
        subcategory: 'comida',
        tier: 1,
        stackable: true,
        maxStack: 20,
        profissao: 'padeiro',
        nivelProfissao: 1,
        effect: {
            type: 'heal_over_time',
            value: 15,
            duration: 3
        },
        materiais: [
            { itemId: 'refinado_farinha_trigo', quantidade: 3 }
        ]
    },
    {
        id: 'cons_pocao_vida_p',
        catalogId: '0401000002',
        name: 'Poção de Vida Pequena',
        icon: '🧪',
        svgIcon: { shape: 'potion-small', palette: 'blood' },
        category: 'consumable',
        subcategory: 'pocao',
        tier: 1,
        stackable: true,
        maxStack: 20,
        profissao: 'padeiro',
        nivelProfissao: 1,
        effect: {
            type: 'instant_heal',
            value: 30
        },
        materiais: [
            { itemId: 'refinado_file_peixe', quantidade: 2 },
            { itemId: 'refinado_farinha_trigo', quantidade: 1 }
        ]
    },
    {
        id: 'cons_pocao_energia',
        catalogId: '0401000003',
        name: 'Poção de Energia',
        icon: '⚡',
        svgIcon: { shape: 'potion-energy', palette: 'gold' },
        category: 'consumable',
        subcategory: 'pocao',
        tier: 1,
        stackable: true,
        maxStack: 20,
        profissao: 'padeiro',
        nivelProfissao: 1,
        effect: {
            type: 'restore_pa',
            value: 1
        },
        materiais: [
            { itemId: 'refinado_file_peixe', quantidade: 2 },
            { itemId: 'refinado_couro_tratado', quantidade: 1 }
        ]
    },
    {
        id: 'cons_sopa_peixe',
        catalogId: '0401000013',
        name: 'Sopa de Peixe',
        icon: '🍲',
        svgIcon: { shape: 'fish-soup', palette: 'ice' },
        category: 'consumable',
        subcategory: 'comida',
        tier: 1,
        stackable: true,
        maxStack: 20,
        profissao: 'padeiro',
        nivelProfissao: 2,
        effect: {
            type: 'instant_heal',
            value: 20
        },
        materiais: [
            { itemId: 'refinado_farinha_trigo', quantidade: 1 },
            { itemId: 'refinado_file_peixe', quantidade: 2 }
        ]
    },
    {
        id: 'cons_torta_trigo',
        catalogId: '0401000014',
        name: 'Torta de Trigo',
        icon: '🥧',
        svgIcon: { shape: 'wheat-pie', palette: 'gold' },
        category: 'consumable',
        subcategory: 'comida',
        tier: 1,
        stackable: true,
        maxStack: 20,
        profissao: 'padeiro',
        nivelProfissao: 2,
        effect: {
            type: 'buff',
            stat: 'agility',
            value: 3,
            duration: 3
        },
        materiais: [
            { itemId: 'refinado_farinha_trigo', quantidade: 3 }
        ]
    },
    {
        id: 'cons_pocao_sorte',
        catalogId: '0401000019',
        name: 'Poção da Sorte',
        icon: '🍀',
        svgIcon: { shape: 'luck-potion', palette: 'jade' },
        category: 'consumable',
        subcategory: 'pocao',
        tier: 1,
        stackable: true,
        maxStack: 20,
        profissao: 'padeiro',
        nivelProfissao: 3,
        effect: {
            type: 'buff',
            stat: 'luck',
            value: 5,
            duration: 3
        },
        materiais: [
            { itemId: 'recurso_bigode_rei_rato', quantidade: 1 },
            { itemId: 'refinado_file_peixe', quantidade: 2 }
        ]
    },
    {
        id: 'cons_elixir_noturno',
        catalogId: '0401000020',
        name: 'Elixir Noturno',
        icon: '🌙',
        svgIcon: { shape: 'night-elixir', palette: 'shadow' },
        category: 'consumable',
        subcategory: 'elixir',
        tier: 1,
        stackable: true,
        maxStack: 20,
        profissao: 'padeiro',
        nivelProfissao: 4,
        effect: {
            type: 'buff',
            stat: 'initiative',
            value: 5,
            duration: 3
        },
        materiais: [
            { itemId: 'recurso_sangue_anciao_morcego', quantidade: 1 },
            { itemId: 'refinado_couro_tratado', quantidade: 2 }
        ]
    },

    // ==================== T2 — Nível Padeiro 5 ====================

    {
        id: 'cons_pao_nutritivo',
        catalogId: '0401000004',
        name: 'Pão Nutritivo',
        icon: '🥖',
        svgIcon: { shape: 'bread-nutritive', palette: 'ember' },
        category: 'consumable',
        subcategory: 'comida',
        tier: 2,
        stackable: true,
        maxStack: 20,
        profissao: 'padeiro',
        nivelProfissao: 5,
        effect: {
            type: 'heal_over_time',
            value: 25,
            duration: 3
        },
        materiais: [
            { itemId: 'refinado_farinha_trigo', quantidade: 2 },
            { itemId: 'refinado_file_prateado', quantidade: 1 }
        ]
    },
    {
        id: 'cons_pocao_vida_m',
        catalogId: '0401000005',
        name: 'Poção de Vida Média',
        icon: '🧪',
        svgIcon: { shape: 'potion-medium', palette: 'nature' },
        category: 'consumable',
        subcategory: 'pocao',
        tier: 2,
        stackable: true,
        maxStack: 20,
        profissao: 'padeiro',
        nivelProfissao: 5,
        effect: {
            type: 'instant_heal',
            value: 60
        },
        materiais: [
            { itemId: 'refinado_file_prateado', quantidade: 3 },
            { itemId: 'refinado_fio_linho', quantidade: 1 }
        ]
    },
    {
        id: 'cons_elixir_forca',
        catalogId: '0401000006',
        name: 'Elixir de Força',
        icon: '💪',
        svgIcon: { shape: 'elixir-strength', palette: 'fire' },
        category: 'consumable',
        subcategory: 'elixir',
        tier: 2,
        stackable: true,
        maxStack: 20,
        profissao: 'padeiro',
        nivelProfissao: 6,
        effect: {
            type: 'buff',
            stat: 'strength',
            value: 5,
            duration: 3
        },
        materiais: [
            { itemId: 'refinado_tendao_reforcado', quantidade: 2 },
            { itemId: 'refinado_fio_linho', quantidade: 2 }
        ]
    },
    {
        id: 'cons_elixir_agilidade',
        catalogId: '0401000007',
        name: 'Elixir de Agilidade',
        icon: '💨',
        svgIcon: { shape: 'elixir-agility', palette: 'ice' },
        category: 'consumable',
        subcategory: 'elixir',
        tier: 2,
        stackable: true,
        maxStack: 20,
        profissao: 'padeiro',
        nivelProfissao: 7,
        effect: {
            type: 'buff',
            stat: 'agility',
            value: 5,
            duration: 3
        },
        materiais: [
            { itemId: 'refinado_file_prateado', quantidade: 2 },
            { itemId: 'refinado_fio_linho', quantidade: 2 }
        ]
    },
    {
        id: 'cons_empanada_prata',
        catalogId: '0401000015',
        name: 'Empanada Prateada',
        icon: '🥟',
        svgIcon: { shape: 'silver-empanada', palette: 'silver' },
        category: 'consumable',
        subcategory: 'comida',
        tier: 2,
        stackable: true,
        maxStack: 20,
        profissao: 'padeiro',
        nivelProfissao: 8,
        effect: {
            type: 'heal_and_buff',
            healType: 'heal_over_time',
            healValue: 20,
            duration: 3,
            stat: 'strength',
            buffValue: 4
        },
        materiais: [
            { itemId: 'refinado_farinha_trigo', quantidade: 2 },
            { itemId: 'refinado_file_prateado', quantidade: 2 }
        ]
    },
    {
        id: 'cons_peixe_grelhado',
        catalogId: '0401000016',
        name: 'Peixe Grelhado Especial',
        icon: '🐟',
        svgIcon: { shape: 'grilled-fish', palette: 'ember' },
        category: 'consumable',
        subcategory: 'comida',
        tier: 2,
        stackable: true,
        maxStack: 20,
        profissao: 'padeiro',
        nivelProfissao: 8,
        effect: {
            type: 'instant_heal',
            value: 50
        },
        materiais: [
            { itemId: 'refinado_file_prateado', quantidade: 3 },
            { itemId: 'refinado_fio_linho', quantidade: 1 }
        ]
    },

    // ==================== T2 Avançado — Nível Padeiro 10 ====================

    {
        id: 'cons_banquete',
        catalogId: '0401000008',
        name: 'Banquete Real',
        icon: '🍖',
        svgIcon: { shape: 'banquet-royal', palette: 'gold' },
        category: 'consumable',
        subcategory: 'comida',
        tier: 2,
        stackable: true,
        maxStack: 20,
        profissao: 'padeiro',
        nivelProfissao: 10,
        effect: {
            type: 'heal_over_time',
            value: 40,
            duration: 3
        },
        materiais: [
            { itemId: 'refinado_fio_linho', quantidade: 3 },
            { itemId: 'refinado_file_prateado', quantidade: 3 }
        ]
    },
    {
        id: 'cons_pocao_vida_g',
        catalogId: '0401000009',
        name: 'Poção de Vida Grande',
        icon: '🧪',
        svgIcon: { shape: 'potion-large', palette: 'arcane' },
        category: 'consumable',
        subcategory: 'pocao',
        tier: 2,
        stackable: true,
        maxStack: 20,
        profissao: 'padeiro',
        nivelProfissao: 10,
        effect: {
            type: 'instant_heal',
            value: 120
        },
        materiais: [
            { itemId: 'refinado_file_prateado', quantidade: 5 },
            { itemId: 'refinado_fio_linho', quantidade: 3 }
        ]
    },
    {
        id: 'cons_elixir_supremo',
        catalogId: '0401000010',
        name: 'Elixir Supremo',
        icon: '✨',
        svgIcon: { shape: 'elixir-supreme', palette: 'holy' },
        category: 'consumable',
        subcategory: 'elixir',
        tier: 2,
        stackable: true,
        maxStack: 20,
        profissao: 'padeiro',
        nivelProfissao: 10,
        effect: {
            type: 'buff_all',
            stats: { strength: 8, agility: 8, intelligence: 8 },
            duration: 3
        },
        materiais: [
            { itemId: 'refinado_tendao_reforcado', quantidade: 3 },
            { itemId: 'refinado_file_prateado', quantidade: 3 },
            { itemId: 'refinado_fio_linho', quantidade: 2 }
        ]
    },
    {
        id: 'cons_pocao_ressurreicao',
        catalogId: '0401000011',
        name: 'Poção de Ressurreição',
        icon: '🌟',
        svgIcon: { shape: 'potion-revive', palette: 'holy' },
        category: 'consumable',
        subcategory: 'pocao',
        tier: 2,
        stackable: true,
        maxStack: 20,
        profissao: 'padeiro',
        nivelProfissao: 11,
        effect: {
            type: 'revive',
            hpPercent: 25
        },
        materiais: [
            { itemId: 'refinado_tendao_reforcado', quantidade: 5 },
            { itemId: 'refinado_file_prateado', quantidade: 5 }
        ]
    },
    {
        id: 'cons_pocao_pm',
        catalogId: '0401000012',
        name: 'Poção de Mobilidade',
        icon: '🏃',
        svgIcon: { shape: 'potion-mobility', palette: 'jade' },
        category: 'consumable',
        subcategory: 'pocao',
        tier: 2,
        stackable: true,
        maxStack: 20,
        profissao: 'padeiro',
        nivelProfissao: 12,
        effect: {
            type: 'restore_pm',
            value: 2
        },
        materiais: [
            { itemId: 'refinado_fio_linho', quantidade: 3 },
            { itemId: 'refinado_tendao_reforcado', quantidade: 2 }
        ]
    },
    {
        id: 'cons_festim_dourado',
        catalogId: '0401000017',
        name: 'Festim Dourado',
        icon: '🍽️',
        svgIcon: { shape: 'golden-feast', palette: 'gold' },
        category: 'consumable',
        subcategory: 'comida',
        tier: 2,
        stackable: true,
        maxStack: 20,
        profissao: 'padeiro',
        nivelProfissao: 13,
        effect: {
            type: 'heal_and_buff_all',
            healType: 'heal_over_time',
            healValue: 50,
            duration: 3,
            stats: { strength: 5, agility: 5, intelligence: 5 }
        },
        materiais: [
            { itemId: 'refinado_file_prateado', quantidade: 5 },
            { itemId: 'refinado_fio_linho', quantidade: 3 }
        ]
    },
    {
        id: 'cons_bolo_maestria',
        catalogId: '0401000018',
        name: 'Bolo de Maestria',
        icon: '🎂',
        svgIcon: { shape: 'mastery-cake', palette: 'holy' },
        category: 'consumable',
        subcategory: 'comida',
        tier: 2,
        stackable: true,
        maxStack: 20,
        profissao: 'padeiro',
        nivelProfissao: 14,
        effect: {
            type: 'restore_pa',
            value: 2
        },
        materiais: [
            { itemId: 'refinado_farinha_trigo', quantidade: 3 },
            { itemId: 'refinado_file_prateado', quantidade: 3 },
            { itemId: 'refinado_fio_linho', quantidade: 2 }
        ]
    },

    // ==================== Consumíveis com Drops de Monstro ====================

    {
        id: 'cons_pocao_reflexos',
        catalogId: '0401000021',
        name: 'Poção de Reflexos',
        icon: '🛡️',
        svgIcon: { shape: 'reflex-potion', palette: 'ice' },
        category: 'consumable',
        subcategory: 'pocao',
        tier: 2,
        stackable: true,
        maxStack: 20,
        profissao: 'padeiro',
        nivelProfissao: 9,
        effect: {
            type: 'buff_multi',
            stats: { block: 10, dodge: 8 },
            duration: 5
        },
        materiais: [
            { itemId: 'recurso_teia_aranha', quantidade: 8 },
            { itemId: 'recurso_veneno_cobra', quantidade: 3 },
            { itemId: 'refinado_file_prateado', quantidade: 2 }
        ]
    }
];

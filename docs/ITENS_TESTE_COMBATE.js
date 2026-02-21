// ========== ITENS DE TESTE PARA COMBATE ==========
// Anéis com atributos extremos para facilitar testes

const ITENS_TESTE_COMBATE = [
    // === TESTE: ATRIBUTOS BÁSICOS ===

    {
        id: 'teste_anel_forca',
        catalogId: '9999TEST001',
        name: '[TESTE] Anel da Força Suprema',
        icon: '💪',
        iconColor: '#ff4444',
        category: 'equipment',
        slot: 'ring',
        rarity: 'lendario',
        description: 'Anel de teste com +50 Força',
        attributes: {
            strength: 50
        }
    },

    {
        id: 'teste_anel_critico',
        catalogId: '9999TEST002',
        name: '[TESTE] Anel do Crítico Perfeito',
        icon: '⚡',
        iconColor: '#ffff00',
        category: 'equipment',
        slot: 'ring',
        rarity: 'lendario',
        description: 'Anel de teste com +50 Chance Crítica',
        attributes: {
            critical: 50
        }
    },

    {
        id: 'teste_anel_agilidade',
        catalogId: '9999TEST003',
        name: '[TESTE] Anel da Velocidade',
        icon: '💨',
        iconColor: '#00ffff',
        category: 'equipment',
        slot: 'ring',
        rarity: 'lendario',
        description: 'Anel de teste com +50 Agilidade',
        attributes: {
            agility: 50
        }
    },

    {
        id: 'teste_anel_inteligencia',
        catalogId: '9999TEST004',
        name: '[TESTE] Anel do Sábio',
        icon: '🧠',
        iconColor: '#9966ff',
        category: 'equipment',
        slot: 'ring',
        rarity: 'lendario',
        description: 'Anel de teste com +50 Inteligência',
        attributes: {
            intelligence: 50
        }
    },

    // === TESTE: RESISTÊNCIAS ELEMENTAIS ===

    {
        id: 'teste_anel_res_fogo',
        catalogId: '9999TEST005',
        name: '[TESTE] Anel Anti-Fogo',
        icon: '🔥',
        iconColor: '#ff6600',
        category: 'equipment',
        slot: 'ring',
        rarity: 'lendario',
        description: 'Anel de teste com +30 Resistência ao Fogo',
        attributes: {
            res_fire: 30
        }
    },

    {
        id: 'teste_anel_res_agua',
        catalogId: '9999TEST006',
        name: '[TESTE] Anel Anti-Água',
        icon: '💧',
        iconColor: '#4488ff',
        category: 'equipment',
        slot: 'ring',
        rarity: 'lendario',
        description: 'Anel de teste com +30 Resistência à Água',
        attributes: {
            res_water: 30
        }
    },

    {
        id: 'teste_anel_res_ar',
        catalogId: '9999TEST007',
        name: '[TESTE] Anel Anti-Ar',
        icon: '🌪️',
        iconColor: '#ccffff',
        category: 'equipment',
        slot: 'ring',
        rarity: 'lendario',
        description: 'Anel de teste com +30 Resistência ao Ar',
        attributes: {
            res_air: 30
        }
    },

    {
        id: 'teste_anel_res_terra',
        catalogId: '9999TEST008',
        name: '[TESTE] Anel Anti-Terra',
        icon: '🌍',
        iconColor: '#996633',
        category: 'equipment',
        slot: 'ring',
        rarity: 'lendario',
        description: 'Anel de teste com +30 Resistência à Terra',
        attributes: {
            res_earth: 30
        }
    },

    {
        id: 'teste_anel_res_neutro',
        catalogId: '9999TEST009',
        name: '[TESTE] Anel Anti-Neutro',
        icon: '⚪',
        iconColor: '#cccccc',
        category: 'equipment',
        slot: 'ring',
        rarity: 'lendario',
        description: 'Anel de teste com +30 Resistência ao Neutro',
        attributes: {
            res_neutral: 30
        }
    },

    {
        id: 'teste_anel_res_geral',
        catalogId: '9999TEST010',
        name: '[TESTE] Anel da Resiliência Total',
        icon: '🛡️',
        iconColor: '#silver',
        category: 'equipment',
        slot: 'ring',
        rarity: 'lendario',
        description: 'Anel de teste com +30 Resistência Geral (todos elementos)',
        attributes: {
            res_general: 30
        }
    },

    // === TESTE: DANO ELEMENTAL ===

    {
        id: 'teste_anel_dmg_fogo',
        catalogId: '9999TEST011',
        name: '[TESTE] Anel Ígneo',
        icon: '🔥',
        iconColor: '#ff0000',
        category: 'equipment',
        slot: 'ring',
        rarity: 'lendario',
        description: 'Anel de teste com +30% Dano de Fogo',
        attributes: {
            dmg_fire: 30
        }
    },

    {
        id: 'teste_anel_dmg_agua',
        catalogId: '9999TEST012',
        name: '[TESTE] Anel Aquático',
        icon: '💧',
        iconColor: '#0066ff',
        category: 'equipment',
        slot: 'ring',
        rarity: 'lendario',
        description: 'Anel de teste com +30% Dano de Água',
        attributes: {
            dmg_water: 30
        }
    },

    {
        id: 'teste_anel_dmg_ar',
        catalogId: '9999TEST013',
        name: '[TESTE] Anel Aéreo',
        icon: '🌪️',
        iconColor: '#66ffff',
        category: 'equipment',
        slot: 'ring',
        rarity: 'lendario',
        description: 'Anel de teste com +30% Dano de Ar',
        attributes: {
            dmg_air: 30
        }
    },

    {
        id: 'teste_anel_dmg_terra',
        catalogId: '9999TEST014',
        name: '[TESTE] Anel Terrestre',
        icon: '🌍',
        iconColor: '#663300',
        category: 'equipment',
        slot: 'ring',
        rarity: 'lendario',
        description: 'Anel de teste com +30% Dano de Terra',
        attributes: {
            dmg_earth: 30
        }
    },

    {
        id: 'teste_anel_dmg_neutro',
        catalogId: '9999TEST015',
        name: '[TESTE] Anel Neutro',
        icon: '⚪',
        iconColor: '#999999',
        category: 'equipment',
        slot: 'ring',
        rarity: 'lendario',
        description: 'Anel de teste com +30% Dano Neutro',
        attributes: {
            dmg_neutral: 30
        }
    },

    {
        id: 'teste_anel_dmg_elemental',
        catalogId: '9999TEST016',
        name: '[TESTE] Anel Elemental',
        icon: '✨',
        iconColor: '#ff00ff',
        category: 'equipment',
        slot: 'ring',
        rarity: 'lendario',
        description: 'Anel de teste com +30% Dano Elemental (fogo/água/ar/terra)',
        attributes: {
            dmg_elemental: 30
        }
    },

    {
        id: 'teste_anel_dmg_geral',
        catalogId: '9999TEST017',
        name: '[TESTE] Anel do Poder Absoluto',
        icon: '💫',
        iconColor: '#gold',
        category: 'equipment',
        slot: 'ring',
        rarity: 'lendario',
        description: 'Anel de teste com +10% Dano Final (TODOS tipos)',
        attributes: {
            dmg_geral: 10
        }
    },

    // === TESTE: RECURSOS DE COMBATE ===

    {
        id: 'teste_anel_pa',
        catalogId: '9999TEST018',
        name: '[TESTE] Anel da Ação Infinita',
        icon: '⚡',
        iconColor: '#ffcc00',
        category: 'equipment',
        slot: 'ring',
        rarity: 'lendario',
        description: 'Anel de teste com +10 PA',
        attributes: {
            pa: 10
        }
    },

    {
        id: 'teste_anel_pm',
        catalogId: '9999TEST019',
        name: '[TESTE] Anel da Mobilidade',
        icon: '👟',
        iconColor: '#00ff00',
        category: 'equipment',
        slot: 'ring',
        rarity: 'lendario',
        description: 'Anel de teste com +10 PM',
        attributes: {
            pm: 10
        }
    },

    {
        id: 'teste_anel_pe',
        catalogId: '9999TEST020',
        name: '[TESTE] Anel da Energia Infinita',
        icon: '🔋',
        iconColor: '#ff9900',
        category: 'equipment',
        slot: 'ring',
        rarity: 'lendario',
        description: 'Anel de teste com +10 PE',
        attributes: {
            pe: 10
        }
    },

    {
        id: 'teste_anel_hp',
        catalogId: '9999TEST021',
        name: '[TESTE] Anel da Vitalidade',
        icon: '❤️',
        iconColor: '#ff0000',
        category: 'equipment',
        slot: 'ring',
        rarity: 'lendario',
        description: 'Anel de teste com +500 HP',
        attributes: {
            pv: 500
        }
    }
];

// ===== FUNÇÃO PARA ADICIONAR ITENS AO JOGO =====

function adicionarItensDeTeste() {
    if (typeof customItems === 'undefined') {
        console.error('❌ customItems não definido. Execute no jogo!');
        return;
    }

    let adicionados = 0;
    ITENS_TESTE_COMBATE.forEach(item => {
        const existe = customItems.find(i => i.id === item.id);
        if (!existe) {
            customItems.push(item);
            adicionados++;
        }
    });

    console.log(`✅ ${adicionados} itens de teste adicionados ao jogo!`);
    saveCustomItems();
    return adicionados;
}

function darTodosItensDeTeste() {
    if (typeof giveItem !== 'function') {
        console.error('❌ giveItem() não disponível. Execute no jogo!');
        return;
    }

    let dados = 0;
    ITENS_TESTE_COMBATE.forEach(item => {
        const resultado = giveItem(item.id, 1);
        if (resultado) dados++;
    });

    console.log(`✅ ${dados} itens de teste adicionados ao inventário!`);
    return dados;
}

// ===== INSTRUÇÕES DE USO =====
/*

COMO USAR:

1. Abra o jogo (dev.html)
2. Abra o console (F12)
3. Cole TODO este arquivo no console
4. Execute:

   adicionarItensDeTeste();  // Adiciona ao banco de dados
   darTodosItensDeTeste();   // Coloca no inventário

5. Equipe os anéis e teste em combate!

LISTA DE ITENS:
- [TESTE] Anel da Força Suprema (+50 Força)
- [TESTE] Anel do Crítico Perfeito (+50 Crítico)
- [TESTE] Anel da Velocidade (+50 Agilidade)
- [TESTE] Anel do Sábio (+50 Inteligência)
- [TESTE] Anel Anti-Fogo (+30 res_fire)
- [TESTE] Anel Anti-Água (+30 res_water)
- [TESTE] Anel Anti-Ar (+30 res_air)
- [TESTE] Anel Anti-Terra (+30 res_earth)
- [TESTE] Anel Anti-Neutro (+30 res_neutral)
- [TESTE] Anel da Resiliência Total (+30 res_general)
- [TESTE] Anel Ígneo (+30% dmg_fire)
- [TESTE] Anel Aquático (+30% dmg_water)
- [TESTE] Anel Aéreo (+30% dmg_air)
- [TESTE] Anel Terrestre (+30% dmg_earth)
- [TESTE] Anel Neutro (+30% dmg_neutral)
- [TESTE] Anel Elemental (+30% dmg_elemental)
- [TESTE] Anel do Poder Absoluto (+10% dmg_geral)
- [TESTE] Anel da Ação Infinita (+10 PA)
- [TESTE] Anel da Mobilidade (+10 PM)
- [TESTE] Anel da Energia Infinita (+10 PE)
- [TESTE] Anel da Vitalidade (+500 HP)

TOTAL: 21 anéis de teste

*/

// ========== BANCO DE DADOS: BOLSAS ==========
// Bolsas aumentam a capacidade do inventário

const DB_BOLSAS = [
    {
        id: 'bolsa_pequena',
        catalogId: '0107000001',
        name: 'Bolsa Pequena',
        icon: '🎒',
        svgIcon: { shape: 'small-bag', palette: 'leather' },
        category: 'equipment',
        slot: 'bag',
        bagSlots: 10
    },
    {
        id: 'bolsa_media',
        catalogId: '0107000002',
        name: 'Bolsa Média',
        icon: '🎒',
        svgIcon: { shape: 'medium-bag', palette: 'leather' },
        category: 'equipment',
        slot: 'bag',
        bagSlots: 15
    },
    {
        id: 'bolsa_grande',
        catalogId: '0107000003',
        name: 'Bolsa Grande',
        icon: '💼',
        svgIcon: { shape: 'large-bag', palette: 'iron' },
        category: 'equipment',
        slot: 'bag',
        bagSlots: 20
    },
    {
        id: 'mochila_aventureiro',
        catalogId: '0107000004',
        name: 'Mochila do Aventureiro',
        icon: '🎒',
        svgIcon: { shape: 'adventurer-backpack', palette: 'nature' },
        category: 'equipment',
        slot: 'bag',
        bagSlots: 25
    },
    {
        id: 'sacola_magica',
        catalogId: '0107000005',
        name: 'Sacola Mágica',
        icon: '👜',
        svgIcon: { shape: 'magic-satchel', palette: 'arcane' },
        category: 'equipment',
        slot: 'bag',
        bagSlots: 30
    }
];

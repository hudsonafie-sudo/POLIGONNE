// ========== BANCO DE DADOS: RECURSOS ==========
// Todos os recursos do jogo ficam aqui (materiais, drops, itens de coleta).
// Para adicionar um novo, basta copiar um bloco e mudar os valores.

const DB_RECURSOS = [
    // === MADEIRAS ===
    {
        id: 'madeira',
        catalogId: '0301000001',
        name: 'Madeira',
        icon: '🌲',
        category: 'resource',
        resourceType: 'lenhador',
        resourceSource: 'profession',
        stackable: true,
        quantity: 1
    },

    // === MINÉRIOS ===
    {
        id: 'minerio_ferro',
        catalogId: '0302000001',
        name: 'Minério de Ferro',
        icon: '💎',
        category: 'resource',
        resourceType: 'mineiro',
        resourceSource: 'profession',
        stackable: true,
        quantity: 1
    },
    // Cole o proximo item aqui
];

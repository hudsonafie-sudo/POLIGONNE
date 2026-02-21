// ========== MAPA DE COMBATE: CAMPOS SUL ==========
// Campo aberto com lago, grama, terra, areas de pesca

const COMBAT_MAP_CIDADE_CAMPOS_SUL = {
    id: 'cidade_campos_sul',
    name: 'Campos Sul',
    gridSize: 20,
    cells: [
        // Manchas de terra espalhadas
        { x: 0, y: 0, terrainType: 'dirt' }, { x: 1, y: 0, terrainType: 'dirt' },
        { x: 0, y: 1, terrainType: 'dirt' },
        { x: 10, y: 0, terrainType: 'dirt' }, { x: 11, y: 0, terrainType: 'dirt' },
        { x: 18, y: 2, terrainType: 'dirt' }, { x: 19, y: 2, terrainType: 'dirt' },
        { x: 0, y: 10, terrainType: 'dirt' }, { x: 1, y: 10, terrainType: 'dirt' },
        { x: 14, y: 19, terrainType: 'dirt' }, { x: 15, y: 19, terrainType: 'dirt' },
        { x: 5, y: 3, terrainType: 'dirt' }, { x: 6, y: 3, terrainType: 'dirt' },
        { x: 5, y: 4, terrainType: 'dirt' },
        { x: 15, y: 15, terrainType: 'dirt' }, { x: 16, y: 15, terrainType: 'dirt' },
        // Lago (agua rasa - transitavel)
        { x: 8, y: 5, terrainType: 'water' }, { x: 9, y: 5, terrainType: 'water' },
        { x: 8, y: 6, terrainType: 'water' }, { x: 9, y: 6, terrainType: 'water' },
        { x: 10, y: 6, terrainType: 'water' },
        { x: 9, y: 7, terrainType: 'water' }, { x: 10, y: 7, terrainType: 'water' },
        // Lago centro (agua profunda - intransitavel)
        { x: 9, y: 11, obstacle: 'hole', terrainType: 'water' },
        { x: 10, y: 11, obstacle: 'hole', terrainType: 'water' },
        { x: 9, y: 12, obstacle: 'hole', terrainType: 'water' },
        { x: 10, y: 12, obstacle: 'hole', terrainType: 'water' },
        // Margem do lago (agua rasa)
        { x: 8, y: 11, terrainType: 'water' }, { x: 11, y: 11, terrainType: 'water' },
        { x: 8, y: 12, terrainType: 'water' }, { x: 11, y: 12, terrainType: 'water' },
        { x: 9, y: 10, terrainType: 'water' }, { x: 10, y: 10, terrainType: 'water' },
        { x: 9, y: 13, terrainType: 'water' }, { x: 10, y: 13, terrainType: 'water' },
        // Arvores esparsas
        { x: 3, y: 2, obstacle: 'blocker', elevation: 1 },
        { x: 14, y: 4, obstacle: 'blocker', elevation: 1 },
        { x: 17, y: 17, obstacle: 'blocker', elevation: 1 },
        { x: 2, y: 16, obstacle: 'blocker', elevation: 1 },
        // Pedras
        { x: 6, y: 15, obstacle: 'blocker' },
        { x: 11, y: 3, obstacle: 'blocker' },
    ],
    playerSpawns: [
        { x: 0, y: 9 }, { x: 0, y: 10 }, { x: 1, y: 9 }, { x: 1, y: 10 },
        { x: 0, y: 8 }, { x: 0, y: 11 }, { x: 1, y: 8 }, { x: 1, y: 11 },
        { x: 2, y: 9 }, { x: 2, y: 10 }
    ],
    enemySpawns: [
        { x: 18, y: 9 }, { x: 18, y: 10 }, { x: 19, y: 9 }, { x: 19, y: 10 },
        { x: 18, y: 8 }, { x: 18, y: 11 }, { x: 19, y: 8 }, { x: 19, y: 11 },
        { x: 17, y: 9 }, { x: 17, y: 10 }
    ]
};

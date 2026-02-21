// ========== MAPA DE COMBATE: CENTRO DA CIDADE ==========
// Ruas de calcamento, casas, barris, caixotes, praca

const COMBAT_MAP_CIDADE_CENTRO = {
    id: 'cidade_centro',
    name: 'Centro da Cidade',
    gridSize: 20,
    cells: [
        // Calcamento (stone) cobrindo a maior parte da area urbana
        // Rua principal horizontal (y=8,9)
        { x: 0, y: 8, terrainType: 'stone' }, { x: 1, y: 8, terrainType: 'stone' },
        { x: 2, y: 8, terrainType: 'stone' }, { x: 3, y: 8, terrainType: 'stone' },
        { x: 4, y: 8, terrainType: 'stone' }, { x: 5, y: 8, terrainType: 'stone' },
        { x: 6, y: 8, terrainType: 'stone' }, { x: 7, y: 8, terrainType: 'stone' },
        { x: 8, y: 8, terrainType: 'stone' }, { x: 9, y: 8, terrainType: 'stone' },
        { x: 10, y: 8, terrainType: 'stone' }, { x: 11, y: 8, terrainType: 'stone' },
        { x: 12, y: 8, terrainType: 'stone' }, { x: 13, y: 8, terrainType: 'stone' },
        { x: 14, y: 8, terrainType: 'stone' }, { x: 15, y: 8, terrainType: 'stone' },
        { x: 16, y: 8, terrainType: 'stone' }, { x: 17, y: 8, terrainType: 'stone' },
        { x: 18, y: 8, terrainType: 'stone' }, { x: 19, y: 8, terrainType: 'stone' },
        { x: 0, y: 9, terrainType: 'stone' }, { x: 1, y: 9, terrainType: 'stone' },
        { x: 2, y: 9, terrainType: 'stone' }, { x: 3, y: 9, terrainType: 'stone' },
        { x: 4, y: 9, terrainType: 'stone' }, { x: 5, y: 9, terrainType: 'stone' },
        { x: 6, y: 9, terrainType: 'stone' }, { x: 7, y: 9, terrainType: 'stone' },
        { x: 8, y: 9, terrainType: 'stone' }, { x: 9, y: 9, terrainType: 'stone' },
        { x: 10, y: 9, terrainType: 'stone' }, { x: 11, y: 9, terrainType: 'stone' },
        { x: 12, y: 9, terrainType: 'stone' }, { x: 13, y: 9, terrainType: 'stone' },
        { x: 14, y: 9, terrainType: 'stone' }, { x: 15, y: 9, terrainType: 'stone' },
        { x: 16, y: 9, terrainType: 'stone' }, { x: 17, y: 9, terrainType: 'stone' },
        { x: 18, y: 9, terrainType: 'stone' }, { x: 19, y: 9, terrainType: 'stone' },
        // Rua vertical (x=10,11)
        { x: 10, y: 0, terrainType: 'stone' }, { x: 10, y: 1, terrainType: 'stone' },
        { x: 10, y: 2, terrainType: 'stone' }, { x: 10, y: 3, terrainType: 'stone' },
        { x: 10, y: 4, terrainType: 'stone' }, { x: 10, y: 5, terrainType: 'stone' },
        { x: 10, y: 6, terrainType: 'stone' }, { x: 10, y: 7, terrainType: 'stone' },
        { x: 10, y: 10, terrainType: 'stone' }, { x: 10, y: 11, terrainType: 'stone' },
        { x: 10, y: 12, terrainType: 'stone' }, { x: 10, y: 13, terrainType: 'stone' },
        { x: 10, y: 14, terrainType: 'stone' }, { x: 10, y: 15, terrainType: 'stone' },
        { x: 10, y: 16, terrainType: 'stone' }, { x: 10, y: 17, terrainType: 'stone' },
        { x: 10, y: 18, terrainType: 'stone' }, { x: 10, y: 19, terrainType: 'stone' },
        { x: 11, y: 0, terrainType: 'stone' }, { x: 11, y: 1, terrainType: 'stone' },
        { x: 11, y: 2, terrainType: 'stone' }, { x: 11, y: 3, terrainType: 'stone' },
        { x: 11, y: 4, terrainType: 'stone' }, { x: 11, y: 5, terrainType: 'stone' },
        { x: 11, y: 6, terrainType: 'stone' }, { x: 11, y: 7, terrainType: 'stone' },
        { x: 11, y: 10, terrainType: 'stone' }, { x: 11, y: 11, terrainType: 'stone' },
        { x: 11, y: 12, terrainType: 'stone' }, { x: 11, y: 13, terrainType: 'stone' },
        { x: 11, y: 14, terrainType: 'stone' }, { x: 11, y: 15, terrainType: 'stone' },
        { x: 11, y: 16, terrainType: 'stone' }, { x: 11, y: 17, terrainType: 'stone' },
        { x: 11, y: 18, terrainType: 'stone' }, { x: 11, y: 19, terrainType: 'stone' },
        // Casa superior esquerda (blocker)
        { x: 2, y: 2, obstacle: 'blocker', elevation: 2 }, { x: 3, y: 2, obstacle: 'blocker', elevation: 2 },
        { x: 2, y: 3, obstacle: 'blocker', elevation: 2 }, { x: 3, y: 3, obstacle: 'blocker', elevation: 2 },
        { x: 2, y: 4, obstacle: 'blocker', elevation: 2 }, { x: 3, y: 4, obstacle: 'blocker', elevation: 2 },
        // Casa superior direita
        { x: 15, y: 2, obstacle: 'blocker', elevation: 2 }, { x: 16, y: 2, obstacle: 'blocker', elevation: 2 },
        { x: 15, y: 3, obstacle: 'blocker', elevation: 2 }, { x: 16, y: 3, obstacle: 'blocker', elevation: 2 },
        { x: 15, y: 4, obstacle: 'blocker', elevation: 2 }, { x: 16, y: 4, obstacle: 'blocker', elevation: 2 },
        // Casa inferior esquerda
        { x: 2, y: 13, obstacle: 'blocker', elevation: 2 }, { x: 3, y: 13, obstacle: 'blocker', elevation: 2 },
        { x: 2, y: 14, obstacle: 'blocker', elevation: 2 }, { x: 3, y: 14, obstacle: 'blocker', elevation: 2 },
        // Casa inferior direita
        { x: 15, y: 14, obstacle: 'blocker', elevation: 2 }, { x: 16, y: 14, obstacle: 'blocker', elevation: 2 },
        { x: 15, y: 15, obstacle: 'blocker', elevation: 2 }, { x: 16, y: 15, obstacle: 'blocker', elevation: 2 },
        // Barris e caixotes espalhados
        { x: 5, y: 5, obstacle: 'blocker' },
        { x: 6, y: 12, obstacle: 'blocker' },
        { x: 14, y: 6, obstacle: 'blocker' },
        { x: 13, y: 16, obstacle: 'blocker' },
    ],
    playerSpawns: [
        { x: 0, y: 8 }, { x: 0, y: 9 }, { x: 1, y: 8 }, { x: 1, y: 9 },
        { x: 0, y: 7 }, { x: 0, y: 10 }, { x: 1, y: 7 }, { x: 1, y: 10 },
        { x: 2, y: 8 }, { x: 2, y: 9 }
    ],
    enemySpawns: [
        { x: 18, y: 8 }, { x: 18, y: 9 }, { x: 19, y: 8 }, { x: 19, y: 9 },
        { x: 18, y: 7 }, { x: 18, y: 10 }, { x: 19, y: 7 }, { x: 19, y: 10 },
        { x: 17, y: 8 }, { x: 17, y: 9 }
    ]
};

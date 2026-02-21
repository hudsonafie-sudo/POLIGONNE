// ========== MAPA DE COMBATE: CAMPOS LESTE ==========
// Campo com casas rurais esparsas, cercas, caminhos de terra

const COMBAT_MAP_CIDADE_CAMPOS_LESTE = {
    id: 'cidade_campos_leste',
    name: 'Campos Leste',
    gridSize: 20,
    cells: [
        // Caminho de terra central (y=9,10)
        { x: 0, y: 9, terrainType: 'dirt' }, { x: 1, y: 9, terrainType: 'dirt' },
        { x: 2, y: 9, terrainType: 'dirt' }, { x: 3, y: 9, terrainType: 'dirt' },
        { x: 4, y: 9, terrainType: 'dirt' }, { x: 5, y: 9, terrainType: 'dirt' },
        { x: 6, y: 9, terrainType: 'dirt' }, { x: 7, y: 9, terrainType: 'dirt' },
        { x: 8, y: 9, terrainType: 'dirt' }, { x: 9, y: 9, terrainType: 'dirt' },
        { x: 10, y: 9, terrainType: 'dirt' }, { x: 11, y: 9, terrainType: 'dirt' },
        { x: 12, y: 9, terrainType: 'dirt' }, { x: 13, y: 9, terrainType: 'dirt' },
        { x: 14, y: 9, terrainType: 'dirt' }, { x: 15, y: 9, terrainType: 'dirt' },
        { x: 16, y: 9, terrainType: 'dirt' }, { x: 17, y: 9, terrainType: 'dirt' },
        { x: 18, y: 9, terrainType: 'dirt' }, { x: 19, y: 9, terrainType: 'dirt' },
        { x: 0, y: 10, terrainType: 'dirt' }, { x: 1, y: 10, terrainType: 'dirt' },
        { x: 2, y: 10, terrainType: 'dirt' }, { x: 3, y: 10, terrainType: 'dirt' },
        { x: 4, y: 10, terrainType: 'dirt' }, { x: 5, y: 10, terrainType: 'dirt' },
        { x: 6, y: 10, terrainType: 'dirt' }, { x: 7, y: 10, terrainType: 'dirt' },
        { x: 8, y: 10, terrainType: 'dirt' }, { x: 9, y: 10, terrainType: 'dirt' },
        { x: 10, y: 10, terrainType: 'dirt' }, { x: 11, y: 10, terrainType: 'dirt' },
        { x: 12, y: 10, terrainType: 'dirt' }, { x: 13, y: 10, terrainType: 'dirt' },
        { x: 14, y: 10, terrainType: 'dirt' }, { x: 15, y: 10, terrainType: 'dirt' },
        { x: 16, y: 10, terrainType: 'dirt' }, { x: 17, y: 10, terrainType: 'dirt' },
        { x: 18, y: 10, terrainType: 'dirt' }, { x: 19, y: 10, terrainType: 'dirt' },
        // Casa rural superior esquerda (blocker com elevacao)
        { x: 2, y: 2, obstacle: 'blocker', elevation: 2 }, { x: 3, y: 2, obstacle: 'blocker', elevation: 2 },
        { x: 4, y: 2, obstacle: 'blocker', elevation: 2 },
        { x: 2, y: 3, obstacle: 'blocker', elevation: 2 }, { x: 3, y: 3, obstacle: 'blocker', elevation: 2 },
        { x: 4, y: 3, obstacle: 'blocker', elevation: 2 },
        { x: 2, y: 4, obstacle: 'blocker', elevation: 2 }, { x: 3, y: 4, obstacle: 'blocker', elevation: 2 },
        { x: 4, y: 4, obstacle: 'blocker', elevation: 2 },
        // Casa rural superior direita
        { x: 14, y: 3, obstacle: 'blocker', elevation: 2 }, { x: 15, y: 3, obstacle: 'blocker', elevation: 2 },
        { x: 16, y: 3, obstacle: 'blocker', elevation: 2 },
        { x: 14, y: 4, obstacle: 'blocker', elevation: 2 }, { x: 15, y: 4, obstacle: 'blocker', elevation: 2 },
        { x: 16, y: 4, obstacle: 'blocker', elevation: 2 },
        // Casa inferior
        { x: 8, y: 14, obstacle: 'blocker', elevation: 2 }, { x: 9, y: 14, obstacle: 'blocker', elevation: 2 },
        { x: 8, y: 15, obstacle: 'blocker', elevation: 2 }, { x: 9, y: 15, obstacle: 'blocker', elevation: 2 },
        // Cercas (barreiras de borda)
        { x: 1, y: 5, barriers: ['south'] }, { x: 2, y: 5, barriers: ['south'] },
        { x: 3, y: 5, barriers: ['south'] }, { x: 4, y: 5, barriers: ['south'] },
        { x: 5, y: 5, barriers: ['south'] },
        // Arvores esparsas
        { x: 8, y: 1, obstacle: 'blocker', elevation: 1 },
        { x: 18, y: 6, obstacle: 'blocker', elevation: 1 },
        { x: 1, y: 16, obstacle: 'blocker', elevation: 1 },
        { x: 17, y: 15, obstacle: 'blocker', elevation: 1 },
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

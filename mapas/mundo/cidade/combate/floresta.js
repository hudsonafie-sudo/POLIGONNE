// ========== MAPA DE COMBATE: CAMPOS NORTE ==========
// Campo aberto com arvores esparsas, grama, manchas de terra

const COMBAT_MAP_CIDADE_CAMPOS_NORTE = {
    id: 'cidade_campos_norte',
    name: 'Campos Norte',
    gridSize: 20,
    cells: [
        // Manchas de terra (caminhos naturais)
        { x: 3, y: 5, terrainType: 'dirt' }, { x: 4, y: 5, terrainType: 'dirt' },
        { x: 3, y: 6, terrainType: 'dirt' }, { x: 4, y: 6, terrainType: 'dirt' },
        { x: 12, y: 14, terrainType: 'dirt' }, { x: 13, y: 14, terrainType: 'dirt' },
        { x: 12, y: 15, terrainType: 'dirt' },
        { x: 7, y: 10, terrainType: 'dirt' }, { x: 8, y: 10, terrainType: 'dirt' },
        { x: 8, y: 11, terrainType: 'dirt' },
        { x: 15, y: 9, terrainType: 'dirt' }, { x: 16, y: 9, terrainType: 'dirt' },
        // Arvores esparsas (blocker)
        { x: 1, y: 1, obstacle: 'blocker', elevation: 1 },
        { x: 4, y: 0, obstacle: 'blocker', elevation: 1 },
        { x: 0, y: 4, obstacle: 'blocker', elevation: 1 },
        { x: 6, y: 3, obstacle: 'blocker', elevation: 1 },
        { x: 8, y: 1, obstacle: 'blocker', elevation: 1 },
        { x: 13, y: 2, obstacle: 'blocker', elevation: 1 },
        { x: 17, y: 0, obstacle: 'blocker', elevation: 1 },
        { x: 18, y: 4, obstacle: 'blocker', elevation: 1 },
        { x: 15, y: 7, obstacle: 'blocker', elevation: 1 },
        { x: 0, y: 12, obstacle: 'blocker', elevation: 1 },
        { x: 5, y: 14, obstacle: 'blocker', elevation: 1 },
        { x: 14, y: 18, obstacle: 'blocker', elevation: 1 },
        { x: 19, y: 13, obstacle: 'blocker', elevation: 1 },
        { x: 3, y: 18, obstacle: 'blocker', elevation: 1 },
        { x: 11, y: 6, obstacle: 'blocker', elevation: 1 },
        // Pedras (blocker menor)
        { x: 7, y: 7, obstacle: 'blocker' },
        { x: 16, y: 11, obstacle: 'blocker' },
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

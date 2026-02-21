// ========== SISTEMA DE GRADE ISOMETRICA ==========
// Conversao de coordenadas e funcoes de forma
// Deps runtime: TILE_WIDTH, TILE_HEIGHT, camera, canvas
// !! PERFORMANCE: gridToIso/isoToGrid/worldToScreen rodam milhares de vezes por frame.
// !! NUNCA adicionar console.log aqui.

function gridToIso(gridX, gridY) {
    const isoX = (gridX - gridY) * (TILE_WIDTH / 2);
    const isoY = (gridX + gridY) * (TILE_HEIGHT / 2);
    return { x: isoX, y: isoY };
}

function isoToGrid(isoX, isoY) {
    const gridX = (isoX / (TILE_WIDTH / 2) + isoY / (TILE_HEIGHT / 2)) / 2;
    const gridY = (isoY / (TILE_HEIGHT / 2) - isoX / (TILE_WIDTH / 2)) / 2;
    return {
        x: Math.floor(gridX),
        y: Math.floor(gridY)
    };
}

function getTileCenter(gridX, gridY) {
    return gridToIso(gridX + 0.5, gridY + 0.5);
}

function worldToScreen(worldX, worldY) {
    return {
        x: worldX - camera.x + canvas.width / 2,
        y: worldY - camera.y + canvas.height / 2
    };
}

// worldToScreen com zoom aplicado (para uso fora do ctx de render)
function worldToScreenZoomed(worldX, worldY) {
    return {
        x: (worldX - camera.x) * camera.zoom + canvas.width / 2,
        y: (worldY - camera.y) * camera.zoom + canvas.height / 2
    };
}

function screenToWorld(screenX, screenY) {
    return {
        x: (screenX - canvas.width / 2) / camera.zoom + camera.x,
        y: (screenY - canvas.height / 2) / camera.zoom + camera.y
    };
}

function isInShapeRange(dx, dy, minR, maxR, shape) {
    if (dx === 0 && dy === 0) return false;
    let dist;
    switch (shape) {
        case 'circle': dist = Math.abs(dx) + Math.abs(dy); break;       // Diamante (Manhattan)
        case 'cross': dist = Math.abs(dx) + Math.abs(dy); break;        // Compat: igual a circle
        case 'square': dist = Math.max(Math.abs(dx), Math.abs(dy)); break; // Quadrado (Chebyshev)
        case 'line':
            if (dx !== 0 && dy !== 0) return false;
            dist = Math.abs(dx) + Math.abs(dy); break;
        case 'diagonal':
            if (Math.abs(dx) !== Math.abs(dy)) return false;
            dist = Math.abs(dx); break;
        case 'star':
            if (dx !== 0 && dy !== 0 && Math.abs(dx) !== Math.abs(dy)) return false;
            dist = Math.max(Math.abs(dx), Math.abs(dy)); break;
        default: dist = Math.abs(dx) + Math.abs(dy);
    }
    return dist >= minR && dist <= maxR;
}
// Compat: alias antigo
const isInZoneRange = isInShapeRange;

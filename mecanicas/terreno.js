// ========== SISTEMA DE TERRENO VISUAL ==========
// Cores solidas e helpers para tiles isometricos
// Deps runtime: TILE_WIDTH, TILE_HEIGHT, ELEVATION_PIXEL_OFFSET
// !! PERFORMANCE: getTerrainColors roda por tile visivel.
// !! NUNCA adicionar console.log aqui.

// ---- Constantes ----
const TERRAIN_TILE_DEPTH = 16;
const MAX_ELEV_CLIMB = 999;
const MAX_ELEV_DROP = 999;

// ---- Definicoes de terreno (4 variantes cada, cores escuras) ----
const TERRAIN_TYPES = {
    grass: {
        name: 'Grama',
        top:    ['#2e4a1e', '#293f1a', '#2b441c', '#314e20'],
        left:   ['#2a3818', '#263214', '#283416', '#2e3c1a'],
        right:  ['#324020', '#2e3a1c', '#303c1e', '#364422'],
        stroke: ['rgba(20,32,10,0.5)', 'rgba(17,28,8,0.5)', 'rgba(18,30,9,0.5)', 'rgba(22,35,12,0.5)']
    },
    stone: {
        name: 'Pedra',
        top:    ['#505058', '#484850', '#4c4c54', '#54545c'],
        left:   ['#38383e', '#323238', '#34343a', '#3c3c42'],
        right:  ['#424248', '#3c3c42', '#3e3e44', '#46464c'],
        stroke: ['rgba(25,25,32,0.5)', 'rgba(22,22,28,0.5)', 'rgba(23,23,30,0.5)', 'rgba(27,27,34,0.5)']
    },
    sand: {
        name: 'Areia',
        top:    ['#8a7a42', '#806f3a', '#85743e', '#907f46'],
        left:   ['#6a5c2e', '#625528', '#66582c', '#6e6032'],
        right:  ['#786836', '#706030', '#746434', '#7c6c3a'],
        stroke: ['rgba(60,50,20,0.45)', 'rgba(54,44,16,0.45)', 'rgba(56,46,18,0.45)', 'rgba(64,54,22,0.45)']
    },
    water: {
        name: 'Agua',
        top:    ['#1e4a78', '#184068', '#1a4470', '#224e80'],
        left:   ['#143456', '#10304e', '#123252', '#16385a'],
        right:  ['#1a3e66', '#163a5e', '#183c62', '#1e426a'],
        stroke: ['rgba(10,28,50,0.45)', 'rgba(8,24,44,0.45)', 'rgba(9,26,46,0.45)', 'rgba(12,30,52,0.45)']
    },
    dirt: {
        name: 'Terra',
        top:    ['#4a3420', '#422e1a', '#46301e', '#4e3824'],
        left:   ['#352410', '#30200c', '#32220e', '#382814'],
        right:  ['#3e2c18', '#382614', '#3a2816', '#423020'],
        stroke: ['rgba(30,18,6,0.5)', 'rgba(26,14,4,0.5)', 'rgba(28,16,5,0.5)', 'rgba(32,20,8,0.5)']
    },
    snow: {
        name: 'Neve',
        top:    ['#c8d0d8', '#bec6ce', '#c2cad2', '#ced6de'],
        left:   ['#8a9098', '#828890', '#868c94', '#8e949c'],
        right:  ['#9aa0a8', '#929aa0', '#969ca4', '#9ea4ac'],
        stroke: ['rgba(140,148,158,0.4)', 'rgba(132,140,150,0.4)', 'rgba(136,144,154,0.4)', 'rgba(144,152,162,0.4)']
    },
    swamp: {
        name: 'Pantano',
        top:    ['#2a3a1a', '#243212', '#263416', '#2e3e1e'],
        left:   ['#1a2410', '#16200c', '#18220e', '#1e2814'],
        right:  ['#222e16', '#1e2a12', '#202c14', '#263218'],
        stroke: ['rgba(18,28,8,0.5)', 'rgba(14,24,4,0.5)', 'rgba(16,26,6,0.5)', 'rgba(20,30,10,0.5)']
    },
    lava: {
        name: 'Lava',
        top:    ['#8a2800', '#7e2200', '#842500', '#902c00'],
        left:   ['#5a1800', '#521400', '#561600', '#5e1c00'],
        right:  ['#6a2000', '#621c00', '#661e00', '#702400'],
        stroke: ['rgba(100,30,0,0.5)', 'rgba(90,24,0,0.5)', 'rgba(94,26,0,0.5)', 'rgba(106,34,0,0.5)']
    },
    ice: {
        name: 'Gelo',
        top:    ['#7ab8d0', '#6eacc4', '#74b2ca', '#80bed6'],
        left:   ['#4a8898', '#42808e', '#468492', '#4e8c9c'],
        right:  ['#5a98a8', '#52909e', '#5694a4', '#5e9cac'],
        stroke: ['rgba(60,120,150,0.35)', 'rgba(54,114,142,0.35)', 'rgba(56,116,146,0.35)', 'rgba(64,124,154,0.35)']
    },
    wood: {
        name: 'Madeira',
        top:    ['#6a4a2a', '#624224', '#664628', '#6e4e2e'],
        left:   ['#4a3018', '#443014', '#462e16', '#4e341c'],
        right:  ['#563a20', '#50361c', '#54381e', '#5a3e24'],
        stroke: ['rgba(50,32,12,0.5)', 'rgba(44,28,8,0.5)', 'rgba(46,30,10,0.5)', 'rgba(52,34,14,0.5)']
    },
    brick: {
        name: 'Tijolo',
        top:    ['#6e3828', '#643222', '#683426', '#74402c'],
        left:   ['#4e2418', '#462014', '#4a2216', '#52281c'],
        right:  ['#5a2e20', '#542a1c', '#582c1e', '#5e3224'],
        stroke: ['rgba(60,24,14,0.45)', 'rgba(52,20,10,0.45)', 'rgba(56,22,12,0.45)', 'rgba(64,28,16,0.45)']
    },
    marble: {
        name: 'Marmore',
        top:    ['#d8d0c8', '#cec6be', '#d2cac2', '#ded6ce'],
        left:   ['#98908a', '#908882', '#948c86', '#9c948e'],
        right:  ['#a8a098', '#a09890', '#a49c94', '#aca49c'],
        stroke: ['rgba(130,122,114,0.35)', 'rgba(124,116,108,0.35)', 'rgba(126,118,110,0.35)', 'rgba(134,126,118,0.35)']
    },
    puddle: {
        name: 'Poca dagua',
        top:    ['#1e3a50', '#1a3648', '#1c3850', '#203e54'],
        left:   ['#163050', '#123048', '#14304c', '#183454'],
        right:  ['#1c3a5a', '#183852', '#1a3856', '#1e3c5e'],
        stroke: ['rgba(15,30,45,0.5)', 'rgba(12,28,42,0.5)', 'rgba(14,28,40,0.5)', 'rgba(16,32,48,0.5)']
    },
    farmland: {
        name: 'Plantacao',
        top:    ['#3a2a16', '#342410', '#362614', '#3e2e1a'],
        left:   ['#2a1a0c', '#261608', '#28180a', '#2e1e10'],
        right:  ['#322210', '#2e1e0c', '#30200e', '#362614'],
        stroke: ['rgba(30,18,6,0.5)', 'rgba(26,14,4,0.5)', 'rgba(28,16,5,0.5)', 'rgba(32,20,8,0.5)']
    }
};

// ---- API publica ----

function getTerrainColors(terrainType, variantIdx) {
    const def = TERRAIN_TYPES[terrainType] || TERRAIN_TYPES['grass'];
    const idx = variantIdx & 3;
    return {
        top: def.top[idx],
        left: def.left[idx],
        right: def.right[idx],
        stroke: def.stroke[idx]
    };
}

// ---- Funcao para desenhar faces laterais do terreno ----

function drawTerrainSideFaces(ctx, sx, sy, terrainType, variantIdx, depth) {
    const def = TERRAIN_TYPES[terrainType] || TERRAIN_TYPES['grass'];
    const ci = variantIdx & 3;
    const hw = TILE_WIDTH / 2;
    const hh = TILE_HEIGHT / 2;
    // Face esquerda
    ctx.beginPath();
    ctx.moveTo(sx - hw, sy + hh);
    ctx.lineTo(sx, sy + TILE_HEIGHT);
    ctx.lineTo(sx, sy + TILE_HEIGHT + depth);
    ctx.lineTo(sx - hw, sy + hh + depth);
    ctx.closePath();
    ctx.fillStyle = def.left[ci];
    ctx.fill();
    // Face direita
    ctx.beginPath();
    ctx.moveTo(sx + hw, sy + hh);
    ctx.lineTo(sx, sy + TILE_HEIGHT);
    ctx.lineTo(sx, sy + TILE_HEIGHT + depth);
    ctx.lineTo(sx + hw, sy + hh + depth);
    ctx.closePath();
    ctx.fillStyle = def.right[ci];
    ctx.fill();
}

// ---- Helpers para rampas ----

function getRampProgress(ex, ey, rampDir) {
    const fx = ex - Math.floor(ex);
    const fy = ey - Math.floor(ey);
    switch (rampDir) {
        case 'east':  return 1 - fy;
        case 'west':  return fy;
        case 'north': return 1 - fx;
        case 'south': return fx;
    }
    return 0;
}

function getEntityElevOffset(ex, ey) {
    const gx = Math.floor(ex);
    const gy = Math.floor(ey);
    const cell = getWorldCell(gx, gy);
    if (!cell) return 0;

    if (cell.obstacle === 'ramp' && cell.rampDir) {
        const frac = getRampProgress(ex, ey, cell.rampDir);
        const lowElev = cell.rampElevLow || 0;
        const highElev = cell.rampElevHigh || 0;
        return (lowElev + (highElev - lowElev) * frac) * ELEVATION_PIXEL_OFFSET;
    }

    return (cell.elevation || 0) * ELEVATION_PIXEL_OFFSET;
}

// ---- Cores especiais para tiles nao-terreno ----

const SPECIAL_TILE_COLORS = {
    blocker: {
        top:    ['#3a1818', '#321414', '#361616', '#3e1c1c'],
        left:   ['#281010', '#220c0c', '#240e0e', '#2c1414'],
        right:  ['#301414', '#2a1010', '#2c1212', '#341818'],
        stroke: ['rgba(60,16,16,0.4)', 'rgba(52,12,12,0.4)', 'rgba(56,14,14,0.4)', 'rgba(64,18,18,0.4)']
    },
    hole: {
        top:    ['#08080e', '#06060c', '#07070c', '#090910'],
        left:   ['#040406', '#030304', '#030305', '#050507'],
        right:  ['#06060c', '#05050a', '#05050b', '#07070d'],
        stroke: ['rgba(8,8,16,0.3)', 'rgba(6,6,12,0.3)', 'rgba(7,7,14,0.3)', 'rgba(9,9,18,0.3)']
    },
    transition: {
        top:    ['#2e1e2e', '#281828', '#2a1a2a', '#321e32'],
        left:   ['#1e101e', '#1a0c1a', '#1c0e1c', '#221222'],
        right:  ['#241424', '#201020', '#221222', '#281628'],
        stroke: ['rgba(44,22,44,0.3)', 'rgba(38,18,38,0.3)', 'rgba(40,20,40,0.3)', 'rgba(48,24,48,0.3)']
    }
};

function getSpecialTileColors(obstacle, variantIdx) {
    const def = SPECIAL_TILE_COLORS[obstacle];
    if (!def) return null;
    const idx = variantIdx & 3;
    return {
        top: def.top[idx],
        left: def.left[idx],
        right: def.right[idx],
        stroke: def.stroke[idx]
    };
}

// ========== MAPA: REGIÃO CIDADE BETTA + PLANÍCIES (Nv 1-15) ==========
// Grid 600x600 - cidade orgânica no centro + planícies ao redor
// Layout orgânico: muros irregulares (4-6 tiles), sub-zonas, rio, lagos, dungeons
//
// Sub-zonas:
//   Cidade Betta (centro, ~raio 105, orgânica) — Safe Zone
//   Campos Norte — Nv 1-3 (Rato, Barata)
//   Bosque Oeste — Nv 4-7 (Cogumelo, Sapo)
//   Colinas Leste — Nv 5-10 (Morcego, Planta)
//   Pradaria Sul — Nv 8-15 (Planta, Sapo)
//   Ruínas Antigas (SW) — Nv 10-15 (Esqueleto)

// ---- Perlin Noise minimal (para formas orgânicas) ----
var _PN = (function() {
    var p = new Uint8Array(512);
    var perm = new Uint8Array(256);
    for (var i = 0; i < 256; i++) perm[i] = i;
    var s = 42;
    for (var i = 255; i > 0; i--) {
        s = (s * 16807) % 2147483647;
        var j = s % (i + 1);
        var t = perm[i]; perm[i] = perm[j]; perm[j] = t;
    }
    for (var i = 0; i < 512; i++) p[i] = perm[i & 255];

    function fade(t) { return t * t * t * (t * (t * 6 - 15) + 10); }
    function lerp(a, b, t) { return a + t * (b - a); }
    function grad(h, x, y) {
        var v = h & 3;
        return (v < 2 ? (v === 0 ? x : -x) : 0) + (v === 0 || v === 3 ? y : -y);
    }

    function noise(x, y) {
        var X = Math.floor(x) & 255, Y = Math.floor(y) & 255;
        x -= Math.floor(x); y -= Math.floor(y);
        var u = fade(x), v = fade(y);
        var A = p[X] + Y, B = p[X + 1] + Y;
        return lerp(
            lerp(grad(p[A], x, y), grad(p[B], x - 1, y), u),
            lerp(grad(p[A + 1], x, y - 1), grad(p[B + 1], x - 1, y - 1), u), v
        );
    }

    function fbm(x, y, oct) {
        var sum = 0, amp = 1, freq = 1, max = 0;
        oct = oct || 4;
        for (var i = 0; i < oct; i++) {
            sum += noise(x * freq, y * freq) * amp;
            max += amp; amp *= 0.5; freq *= 2;
        }
        return sum / max;
    }

    return { noise: noise, fbm: fbm };
})();

// Segundo gerador noise (seed diferente)
var _PN2 = (function() {
    var p = new Uint8Array(512);
    var perm = new Uint8Array(256);
    for (var i = 0; i < 256; i++) perm[i] = i;
    var s = 137;
    for (var i = 255; i > 0; i--) {
        s = (s * 16807) % 2147483647;
        var j = s % (i + 1);
        var t = perm[i]; perm[i] = perm[j]; perm[j] = t;
    }
    for (var i = 0; i < 512; i++) p[i] = perm[i & 255];

    function fade(t) { return t * t * t * (t * (t * 6 - 15) + 10); }
    function lerp(a, b, t) { return a + t * (b - a); }
    function grad(h, x, y) {
        var v = h & 3;
        return (v < 2 ? (v === 0 ? x : -x) : 0) + (v === 0 || v === 3 ? y : -y);
    }
    function noise(x, y) {
        var X = Math.floor(x) & 255, Y = Math.floor(y) & 255;
        x -= Math.floor(x); y -= Math.floor(y);
        var u = fade(x), v = fade(y);
        var A = p[X] + Y, B = p[X + 1] + Y;
        return lerp(
            lerp(grad(p[A], x, y), grad(p[B], x - 1, y), u),
            lerp(grad(p[A + 1], x, y - 1), grad(p[B + 1], x - 1, y - 1), u), v
        );
    }
    function fbm(x, y, oct) {
        var sum = 0, amp = 1, freq = 1, max = 0;
        oct = oct || 4;
        for (var i = 0; i < oct; i++) {
            sum += noise(x * freq, y * freq) * amp;
            max += amp; amp *= 0.5; freq *= 2;
        }
        return sum / max;
    }
    return { noise: noise, fbm: fbm };
})();

// ---- Constantes ----
var _S = 600; // grid size
var _CX = 300, _CY = 300; // city center

// ---- Seeded RNG ----
var _cityRngSeed = 42;
function _cityRng() { _cityRngSeed = (_cityRngSeed * 1664525 + 1013904223) & 0x7fffffff; return _cityRngSeed / 0x7fffffff; }
function _cityChance(p) { return _cityRng() < p; }

// ========== CITY SHAPE (organic perimeter — EXPANDED) ==========

function _getCityRadius(angle) {
    // Base elliptical shape (wider E-W) — EXPANDED: 105×90
    var baseRx = 105, baseRy = 90;
    var base = 1.0 / Math.sqrt(
        Math.pow(Math.cos(angle) / baseRx, 2) + Math.pow(Math.sin(angle) / baseRy, 2)
    );
    // Noise orgânico mas com gradiente suave (sem buracos no muro de 5 tiles)
    var nx = Math.cos(angle) * 2.5 + 5;
    var ny = Math.sin(angle) * 2.5 + 5;
    var noise = _PN.fbm(nx, ny, 3) * 8;
    var bump1 = Math.cos(angle * 3 + 0.5) * 3;
    var bump2 = Math.sin(angle * 5 - 1.2) * 1.5;
    var bump3 = Math.cos(angle * 2 - 0.8) * 3; // deformação grande
    return base + noise + bump1 + bump2 + bump3;
}

function _isInsideCity(x, y) {
    var dx = x - _CX, dy = y - _CY;
    var dist = Math.sqrt(dx * dx + dy * dy);
    var angle = Math.atan2(dy, dx);
    return dist < _getCityRadius(angle);
}

function _isOnWall(x, y) {
    var dx = x - _CX, dy = y - _CY;
    var dist = Math.sqrt(dx * dx + dy * dy);
    var angle = Math.atan2(dy, dx);
    var radius = _getCityRadius(angle);
    return dist >= radius - 5 && dist < radius;
}

function _isOnGate(x, y) {
    var dx = x - _CX, dy = y - _CY;
    var dist = Math.sqrt(dx * dx + dy * dy);
    var angle = Math.atan2(dy, dx);
    var radius = _getCityRadius(angle);
    if (dist < radius - 6 || dist > radius + 1) return false;
    // 4 gates slightly asymmetric
    var gateAngles = [-Math.PI * 0.52, Math.PI * 0.47, -0.05, Math.PI + 0.30];
    var gateWidth = 0.09;
    for (var i = 0; i < gateAngles.length; i++) {
        var diff = angle - gateAngles[i];
        while (diff > Math.PI) diff -= Math.PI * 2;
        while (diff < -Math.PI) diff += Math.PI * 2;
        if (Math.abs(diff) < gateWidth) return true;
    }
    return false;
}

function _isOnTower(x, y) {
    var dx = x - _CX, dy = y - _CY;
    var dist = Math.sqrt(dx * dx + dy * dy);
    var angle = Math.atan2(dy, dx);
    var radius = _getCityRadius(angle);
    if (dist < radius - 7 || dist > radius + 2) return false;
    var towerAngles = [
        -Math.PI * 0.52 - 0.12, -Math.PI * 0.52 + 0.12,
        Math.PI * 0.47 - 0.12, Math.PI * 0.47 + 0.12,
        -0.05 - 0.12, -0.05 + 0.12,
        Math.PI + 0.30 - 0.12, Math.PI + 0.30 + 0.12,
        -Math.PI * 0.25, Math.PI * 0.25, Math.PI * 0.75, -Math.PI * 0.75
    ];
    for (var i = 0; i < towerAngles.length; i++) {
        var diff = angle - towerAngles[i];
        while (diff > Math.PI) diff -= Math.PI * 2;
        while (diff < -Math.PI) diff += Math.PI * 2;
        if (Math.abs(diff) < 0.04) return true;
    }
    return false;
}

// ========== MAP BOUNDARY (limite jogável do mapa — borda orgânica) ==========

function _getMapBoundaryRadius(angle) {
    // Base circular ~248 tiles (fica dentro da area de grama, antes da areia)
    var base = 248;
    // Noise orgânico via Perlin (mesmo _PN usado na geração)
    var nx = Math.cos(angle) * 3.5 + 10;
    var ny = Math.sin(angle) * 3.5 + 10;
    var noise = _PN.fbm(nx, ny, 3) * 12; // +/-12 tiles variação
    // Bumps para irregularidade natural
    var bump1 = Math.cos(angle * 5 + 1.2) * 3;
    var bump2 = Math.sin(angle * 3 - 0.7) * 2;
    return base + noise + bump1 + bump2;
}

function _isInsideMapBoundary(x, y) {
    var dx = x - _CX, dy = y - _CY;
    var dist = Math.sqrt(dx * dx + dy * dy);
    var angle = Math.atan2(dy, dx);
    return dist < _getMapBoundaryRadius(angle);
}

function _distToMapBoundary(x, y) {
    var dx = x - _CX, dy = y - _CY;
    var dist = Math.sqrt(dx * dx + dy * dy);
    var angle = Math.atan2(dy, dx);
    return _getMapBoundaryRadius(angle) - dist;
}

// ========== GATE POSITIONS (computed from city shape) ==========
// [0]=North, [1]=South, [2]=East, [3]=West
var _gateAnglesList = [-Math.PI * 0.52, Math.PI * 0.47, -0.05, Math.PI + 0.30];

var _gatePositions = (function() {
    var pos = [];
    for (var i = 0; i < _gateAnglesList.length; i++) {
        var a = _gateAnglesList[i];
        var r = _getCityRadius(a);
        var ca = Math.cos(a), sa = Math.sin(a);
        pos.push({
            ix: Math.round(_CX + (r - 6) * ca),  iy: Math.round(_CY + (r - 6) * sa),   // inner (city side)
            cx: Math.round(_CX + (r - 2.5) * ca), cy: Math.round(_CY + (r - 2.5) * sa), // wall center
            ox: Math.round(_CX + (r + 2) * ca),   oy: Math.round(_CY + (r + 2) * sa),   // outer (outside wall)
        });
    }
    return pos;
})();

// ========== RIVER ==========

function _getRiverDist(x, y) {
    var pts = [
        { x: 165, y: 60 }, { x: 175, y: 120 }, { x: 195, y: 180 },
        { x: 210, y: 230 }, { x: 222, y: 270 }, { x: 228, y: 310 },
        { x: 238, y: 350 }, { x: 248, y: 400 }, { x: 262, y: 440 },
        { x: 272, y: 480 }, { x: 278, y: 540 }, { x: 282, y: 580 }
    ];
    var minD = 999;
    for (var i = 0; i < pts.length - 1; i++) {
        var a = pts[i], b = pts[i + 1];
        var abx = b.x - a.x, aby = b.y - a.y;
        var apx = x - a.x, apy = y - a.y;
        var t = (apx * abx + apy * aby) / (abx * abx + aby * aby);
        t = Math.max(0, Math.min(1, t));
        var px = a.x + t * abx, py = a.y + t * aby;
        var d = Math.sqrt((x - px) * (x - px) + (y - py) * (y - py));
        if (d < minD) minD = d;
    }
    var noise = _PN2.fbm(x * 0.02, y * 0.02, 3) * 3;
    return minD + noise;
}

// ========== RAMAL DO RIO (NW → cidade, ajustado para cidade maior) ==========

function _getRiverBranchDist(x, y) {
    // Bifurca do rio principal ao NW, entra na cidade maior, desaparece sob a terra
    var pts = [
        { x: 204, y: 188 },  // bifurcação do rio principal
        { x: 215, y: 193 },
        { x: 228, y: 200 },
        { x: 242, y: 212 },
        { x: 254, y: 228 },  // se aproxima do muro (mais distante agora)
        { x: 262, y: 242 },  // atravessa o muro
        { x: 268, y: 256 },  // dentro da cidade
        { x: 274, y: 270 },
        { x: 279, y: 282 },  // chega na borda da praça
    ];
    var minD = 999;
    for (var i = 0; i < pts.length - 1; i++) {
        var a = pts[i], b = pts[i + 1];
        var abx = b.x - a.x, aby = b.y - a.y;
        var len2 = abx * abx + aby * aby;
        if (len2 === 0) continue;
        var apx = x - a.x, apy = y - a.y;
        var t = (apx * abx + apy * aby) / len2;
        t = Math.max(0, Math.min(1, t));
        var px = a.x + t * abx, py = a.y + t * aby;
        var d = Math.sqrt((x - px) * (x - px) + (y - py) * (y - py));
        if (d < minD) minD = d;
    }
    var noise = _PN2.fbm(x * 0.03, y * 0.03, 3) * 1.5;
    return minD + noise;
}

// ========== LAKES ==========

function _getLakeDist(x, y) {
    var lakes = [
        { cx: 200, cy: 380, rx: 18, ry: 14 },   // Bosque oeste
        { cx: 420, cy: 240, rx: 14, ry: 16 },   // Colinas leste
        { cx: 360, cy: 470, rx: 16, ry: 12 },   // Pradaria sul
    ];
    var minD = 999;
    for (var i = 0; i < lakes.length; i++) {
        var l = lakes[i];
        var dx = (x - l.cx) / l.rx, dy = (y - l.cy) / l.ry;
        var d = Math.sqrt(dx * dx + dy * dy);
        var noise = _PN.fbm(x * 0.04, y * 0.04, 2) * 0.15;
        if (d + noise < minD) minD = d + noise;
    }
    return minD;
}

// ========== BRIDGES (posições ajustadas para cidade maior) ==========

var _bridgeData = [
    { bx: 227, by: 300, w: 5, h: 5 },  // Ponte rio principal (rua SW cruza rio dentro da cidade)
    { bx: 208, by: 230, w: 7, h: 5 },  // Ponte NW (rio fora da cidade, Campos Norte / Bosque Oeste)
    { bx: 248, by: 400, w: 7, h: 5 },  // Ponte SW (rio fora da cidade, saída sul)
    { bx: 258, by: 430, w: 5, h: 5 },  // Ponte pradaria sul
];

// Ponte rio principal para portão oeste: gerada automaticamente pelo gateRoad (auto-bridge)

function _isBridge(x, y) {
    for (var i = 0; i < _bridgeData.length; i++) {
        var b = _bridgeData[i];
        if (x >= b.bx - b.w && x <= b.bx + b.w && y >= b.by - b.h && y <= b.by + b.h) return true;
    }
    return false;
}

// ========== ROADS (ajustadas para portões da cidade maior) ==========

function _isRoad(x, y) {
    var gN = _gatePositions[0], gS = _gatePositions[1], gE = _gatePositions[2], gW = _gatePositions[3];
    var roads = [
        // From north gate outward (curva organica com serpentinas)
        [{ x: gN.ox, y: gN.oy }, { x: gN.ox - 4, y: gN.oy - 25 },
         { x: gN.ox + 1, y: gN.oy - 50 }, { x: gN.ox - 7, y: gN.oy - 75 },
         { x: gN.ox, y: gN.oy - 100 }, { x: gN.ox - 9, y: gN.oy - 125 },
         { x: gN.ox - 3, y: gN.oy - 150 }, { x: gN.ox - 5, y: 45 }],
        // From south gate outward (curva organica)
        [{ x: gS.ox, y: gS.oy }, { x: gS.ox + 6, y: gS.oy + 26 },
         { x: gS.ox, y: gS.oy + 53 }, { x: gS.ox + 8, y: gS.oy + 78 },
         { x: gS.ox + 2, y: gS.oy + 103 }, { x: gS.ox + 10, y: gS.oy + 128 },
         { x: gS.ox + 4, y: gS.oy + 153 }, { x: gS.ox + 2, y: 555 }],
        // From east gate outward (leve curva)
        [{ x: gE.ox, y: gE.oy }, { x: gE.ox + 32, y: gE.oy - 3 },
         { x: gE.ox + 62, y: gE.oy - 7 }, { x: gE.ox + 92, y: gE.oy - 3 },
         { x: gE.ox + 122, y: gE.oy - 9 }, { x: gE.ox + 152, y: gE.oy - 5 },
         { x: 555, y: gE.oy - 7 }],
        // From west gate westward (começa no portão oeste calculado)
        [{ x: gW.ox, y: gW.oy }, { x: gW.ox - 30, y: gW.oy + 5 },
         { x: gW.ox - 70, y: gW.oy + 10 }, { x: gW.ox - 110, y: gW.oy + 12 },
         { x: 80, y: gW.oy + 15 }],
        // From south bridge onward
        [{ x: 258, y: 430 }, { x: 270, y: 465 }, { x: 280, y: 555 }],
        // Ponte NW — liga Campos Norte a Bosque Oeste (cruza rio fora da muralha)
        [{ x: 170, y: 235 }, { x: 190, y: 232 }, { x: 208, y: 230 }, { x: 230, y: 227 }, { x: 260, y: 222 }],
        // Ponte SW — liga Bosque Oeste à Pradaria Sul (rio fora da muralha sul)
        [{ x: 200, y: 405 }, { x: 225, y: 403 }, { x: 248, y: 400 }, { x: 275, y: 397 }, { x: 310, y: 393 }],
    ];
    for (var r = 0; r < roads.length; r++) {
        var pts = roads[r];
        for (var i = 0; i < pts.length - 1; i++) {
            var a = pts[i], b = pts[i + 1];
            var abx = b.x - a.x, aby = b.y - a.y;
            var len2 = abx * abx + aby * aby;
            if (len2 === 0) continue;
            var apx = x - a.x, apy = y - a.y;
            var t = Math.max(0, Math.min(1, (apx * abx + apy * aby) / len2));
            var px = a.x + t * abx, py = a.y + t * aby;
            var d = Math.sqrt((x - px) * (x - px) + (y - py) * (y - py));
            if (d < 2.5) return true;
        }
    }
    return false;
}

// ========== FARMLAND ==========

function _isFarm(x, y) {
    // Farm norte (NPC farm) — ajustada para fora da cidade maior
    var dx = (x - 390) / 22, dy = (y - 195) / 16;
    if (dx * dx + dy * dy < 1) return true;
    // Farm sul (grande)
    dx = (x - 400) / 32; dy = (y - 455) / 20;
    if (dx * dx + dy * dy < 1) return true;
    return false;
}

// ========== RUINS ==========

function _isRuins(x, y) {
    if (x > 100 && x < 200 && y > 415 && y < 525) {
        return _PN.noise(x * 0.15, y * 0.15) > 0.15;
    }
    return false;
}

// ========== TREE/ROCK DENSITY BY ZONE ==========

function _getOutsideZone(x, y) {
    var dx = x - _CX, dy = y - _CY;
    if (dy < -130 && x > 100 && x < 500) return 'campos_norte';
    if (dx < -130 && y > 130 && y < 500) return 'bosque_oeste';
    if (dx > 130 && y > 100 && y < 450) return 'colinas_leste';
    if (dy > 130 && x > 140 && x < 520) return 'pradaria_sul';
    if (x < 200 && y > 415) return 'ruinas';
    if (dy < 0) return 'campos_norte';
    if (dx < 0) return dy > 100 ? 'ruinas' : 'bosque_oeste';
    if (dx > 0 && dy < 100) return 'colinas_leste';
    return 'pradaria_sul';
}

// ========== SISTEMA DE REGIÕES ORGÂNICAS (Vale de Betta) ==========
// Fronteiras definidas por Perlin noise para aparência natural.
// Usa seeds diferentes do terreno para independência visual.

// ---- Noise para fronteiras de região (seed 7919) ----
var _RN = (function() {
    var p = new Uint8Array(512);
    var perm = new Uint8Array(256);
    for (var i = 0; i < 256; i++) perm[i] = i;
    var s = 7919;
    for (var i = 255; i > 0; i--) {
        s = (s * 16807) % 2147483647;
        var j = s % (i + 1);
        var t = perm[i]; perm[i] = perm[j]; perm[j] = t;
    }
    for (var i = 0; i < 512; i++) p[i] = perm[i & 255];
    function fade(t) { return t * t * t * (t * (t * 6 - 15) + 10); }
    function lerp(a, b, t) { return a + t * (b - a); }
    function grad(h, x, y) {
        var v = h & 3;
        return (v < 2 ? (v === 0 ? x : -x) : 0) + (v === 0 || v === 3 ? y : -y);
    }
    function noise(x, y) {
        var X = Math.floor(x) & 255, Y = Math.floor(y) & 255;
        x -= Math.floor(x); y -= Math.floor(y);
        var u = fade(x), v = fade(y);
        var A = p[X] + Y, B = p[X + 1] + Y;
        return lerp(
            lerp(grad(p[A], x, y), grad(p[B], x - 1, y), u),
            lerp(grad(p[A + 1], x, y - 1), grad(p[B + 1], x - 1, y - 1), u), v
        );
    }
    function fbm(x, y, oct) {
        var sum = 0, amp = 1, freq = 1, max = 0;
        oct = oct || 4;
        for (var i = 0; i < oct; i++) {
            sum += noise(x * freq, y * freq) * amp;
            max += amp; amp *= 0.5; freq *= 2;
        }
        return sum / max;
    }
    return { noise: noise, fbm: fbm };
})();

// ---- Noise para divisores angulares (seed 3571) ----
var _RN2 = (function() {
    var p = new Uint8Array(512);
    var perm = new Uint8Array(256);
    for (var i = 0; i < 256; i++) perm[i] = i;
    var s = 3571;
    for (var i = 255; i > 0; i--) {
        s = (s * 16807) % 2147483647;
        var j = s % (i + 1);
        var t = perm[i]; perm[i] = perm[j]; perm[j] = t;
    }
    for (var i = 0; i < 512; i++) p[i] = perm[i & 255];
    function fade(t) { return t * t * t * (t * (t * 6 - 15) + 10); }
    function lerp(a, b, t) { return a + t * (b - a); }
    function grad(h, x, y) {
        var v = h & 3;
        return (v < 2 ? (v === 0 ? x : -x) : 0) + (v === 0 || v === 3 ? y : -y);
    }
    function noise(x, y) {
        var X = Math.floor(x) & 255, Y = Math.floor(y) & 255;
        x -= Math.floor(x); y -= Math.floor(y);
        var u = fade(x), v = fade(y);
        var A = p[X] + Y, B = p[X + 1] + Y;
        return lerp(
            lerp(grad(p[A], x, y), grad(p[B], x - 1, y), u),
            lerp(grad(p[A + 1], x, y - 1), grad(p[B + 1], x - 1, y - 1), u), v
        );
    }
    function fbm(x, y, oct) {
        var sum = 0, amp = 1, freq = 1, max = 0;
        oct = oct || 4;
        for (var i = 0; i < oct; i++) {
            sum += noise(x * freq, y * freq) * amp;
            max += amp; amp *= 0.5; freq *= 2;
        }
        return sum / max;
    }
    return { noise: noise, fbm: fbm };
})();

// ---- Raios orgânicos das fronteiras ----

// Raio dos arredores (~125-145, base 135)
function _arredoresRadius(angle) {
    var base = 135;
    var nx = Math.cos(angle) * 3 + 10;
    var ny = Math.sin(angle) * 3 + 10;
    var n = _RN.fbm(nx, ny, 4) * 12;
    var bump1 = Math.cos(angle * 4 + 1.5) * 4;
    var bump2 = Math.sin(angle * 2 - 0.8) * 3;
    return base + n + bump1 + bump2;
}

// Raio da fronteira média→externa (~180-200, base 190)
function _midOuterRadius(angle) {
    var base = 190;
    var nx = Math.cos(angle) * 2.8 + 15;
    var ny = Math.sin(angle) * 2.8 + 15;
    var n = _RN.fbm(nx + 5, ny + 5, 4) * 14;
    var bump1 = Math.cos(angle * 3 - 0.5) * 5;
    var bump2 = Math.sin(angle * 5 + 2.0) * 3;
    return base + n + bump1 + bump2;
}

// ---- Divisores angulares orgânicos ----

// Divisor zona média: Floresta Uivante / Vale dos Ossos (base: -0.3 rad)
function _midDivAngle1(dist) {
    var n = _RN2.fbm(dist * 0.03, 1.0, 3) * 0.35;
    var wave = Math.sin(dist * 0.04) * 0.12;
    return -0.3 + n + wave;
}
function _midDivAngle2(dist) {
    var n = _RN2.fbm(dist * 0.03, 5.0, 3) * 0.3;
    var wave = Math.sin(dist * 0.035 + 1) * 0.1;
    return (-0.3 + Math.PI) + n + wave;
}

// Divisores T2 externo (6 setores)
var _T2_DIV_BASES = [-2.1, -1.05, 0.0, 1.05, 2.1, Math.PI];
function _t2DivAngle(idx, dist) {
    var base = _T2_DIV_BASES[idx];
    var seed = idx * 3.7 + 2.0;
    var n = _RN2.fbm(dist * 0.025 + seed, seed, 3) * 0.25;
    var wave = Math.sin(dist * 0.03 + idx * 1.5) * 0.08;
    return base + n + wave;
}

// Divisores internos da cidade (4 distritos)
var _DIST_ANGLE_BASES = [-2.3, -0.85, 0.9, 2.5];
function _districtDivAngle(idx, dist) {
    var base = _DIST_ANGLE_BASES[idx];
    var seed = idx * 2.3 + 8.0;
    var n = _RN2.fbm(dist * 0.05 + seed, seed + 3, 3) * 0.2;
    return base + n;
}

// ---- Helpers para ângulos ----
function _normalizeAngle(a) {
    while (a > Math.PI) a -= Math.PI * 2;
    while (a < -Math.PI) a += Math.PI * 2;
    return a;
}

function _angleBetween(angle, a1, a2) {
    var a = _normalizeAngle(angle);
    var s = _normalizeAngle(a1);
    var e = _normalizeAngle(a2);
    if (s <= e) return a >= s && a < e;
    return a >= s || a < e;
}

// ---- Lookup de região por tile (x, y) — função global ----
function getRegionId(x, y) {
    var dx = x - _CX, dy = y - _CY;
    var dist = Math.sqrt(dx * dx + dy * dy);
    var angle = Math.atan2(dy, dx);

    // Praça central (raio < 24)
    if (dist < 24) return 'praca';

    // Dentro da cidade (raio < muralha - margem)
    var cR = _getCityRadius(angle);
    if (dist < cR - 5) {
        var da0 = _districtDivAngle(0, dist);
        var da1 = _districtDivAngle(1, dist);
        var da2 = _districtDivAngle(2, dist);
        var da3 = _districtDivAngle(3, dist);
        if (_angleBetween(angle, da0, da1)) return 'dist_mercantil';
        if (_angleBetween(angle, da1, da2)) return 'dist_verdejante';
        if (_angleBetween(angle, da2, da3)) return 'dist_residencial';
        return 'dist_artesaos';
    }

    // Arredores da muralha (até ~135)
    var aR = _arredoresRadius(angle);
    if (dist < aR) return 'arredores';

    // Zona média: Floresta Uivante / Vale dos Ossos (até ~190)
    var mR = _midOuterRadius(angle);
    if (dist < mR) {
        var d1 = _normalizeAngle(_midDivAngle1(dist));
        var d2 = _normalizeAngle(_midDivAngle2(dist));
        if (_angleBetween(angle, d1, d2)) return 'vale_ossos';
        return 'floresta_uivante';
    }

    // Zona externa T2 (até ~275)
    if (dist < 275) {
        var divs = [];
        for (var i = 0; i < 6; i++) divs.push(_normalizeAngle(_t2DivAngle(i, dist)));
        divs.sort(function(a, b) { return a - b; });
        var t2ids = ['floresta_ogro', 'toca_urso', 'ninho_harpia', 'gruta_golem', 'pantano_lagarto', 'ruinas_troll'];
        for (var i = 0; i < 6; i++) {
            var next = (i + 1) % 6;
            if (_angleBetween(angle, divs[i], divs[next])) return t2ids[i];
        }
        return t2ids[5];
    }

    return null; // fora do mapa
}

// ---- Metadados das regiões (nome, cor, tier, mobs, descrição) ----
var REGION_META = {
    praca:             { name: 'Praça da Fonte',        tier: 0, lvl: null,     color: '#ffd700', mobs: [] },
    dist_mercantil:    { name: 'Distrito Mercantil',    tier: 1, lvl: '1-3',   color: '#e6c833', mobs: ['rato', 'barata'] },
    dist_artesaos:     { name: 'Distrito dos Artesãos', tier: 1, lvl: '1-3',   color: '#e67e22', mobs: ['rato', 'morcego'] },
    dist_verdejante:   { name: 'Distrito Verdejante',   tier: 1, lvl: '1-3',   color: '#2ecc71', mobs: ['barata', 'morcego'] },
    dist_residencial:  { name: 'Distrito Residencial',  tier: 1, lvl: '1-3',   color: '#3498db', mobs: ['rato', 'barata'] },
    arredores:         { name: 'Arredores da Muralha',  tier: 1, lvl: '2-5',   color: '#9b59b6', mobs: ['cogumelo', 'sapo', 'planta'] },
    floresta_uivante:  { name: 'Floresta Uivante',     tier: 1, lvl: '4-8',   color: '#5d8a3e', mobs: ['lobo', 'javali', 'cobra'] },
    vale_ossos:        { name: 'Vale dos Ossos',        tier: 1, lvl: '4-8',   color: '#6b4c30', mobs: ['goblin', 'esqueleto', 'aranha'] },
    toca_urso:         { name: 'Toca do Urso',          tier: 2, lvl: '8-14',  color: '#8B4500', mobs: ['urso'] },
    ninho_harpia:      { name: 'Ninho das Harpias',     tier: 2, lvl: '8-14',  color: '#7E57C2', mobs: ['harpia'] },
    gruta_golem:       { name: 'Gruta do Golem',        tier: 2, lvl: '10-16', color: '#78909C', mobs: ['golem'] },
    pantano_lagarto:   { name: 'Pântano dos Lagartos',  tier: 2, lvl: '10-16', color: '#4CAF50', mobs: ['lagarto'] },
    ruinas_troll:      { name: 'Ruínas do Troll',       tier: 2, lvl: '10-16', color: '#5D4E37', mobs: ['troll'] },
    floresta_ogro:     { name: 'Floresta do Ogro',      tier: 2, lvl: '12-18', color: '#BF360C', mobs: ['ogro'] }
};

// ---- Transportes rápidos (balsas, minas, carroças) ----
var TRANSPORT_POINTS = {
    balsas: [
        { id: 'balsa_ogro',   x: 175, y: 130, name: 'Balsa do Ogro',      destIds: ['balsa_cidade', 'balsa_vale'] },
        { id: 'balsa_cidade', x: 225, y: 280, name: 'Balsa da Cidade',     destIds: ['balsa_ogro', 'balsa_vale'] },
        { id: 'balsa_vale',   x: 258, y: 430, name: 'Balsa do Vale',       destIds: ['balsa_ogro', 'balsa_cidade'] }
    ],
    minas: [
        { id: 'mina_harpia',  x: 415, y: 155, name: 'Mina das Harpias',    destIds: ['mina_ruinas'] },
        { id: 'mina_ruinas',  x: 110, y: 400, name: 'Mina Abandonada',     destIds: ['mina_harpia'] }
    ],
    carrocas: [
        { id: 'carroca_cidade',  x: 310, y: 310, name: 'Estábulo Central',    destIds: ['carroca_urso', 'carroca_golem', 'carroca_lagarto', 'carroca_uivante'], isHub: true },
        { id: 'carroca_urso',    x: 320, y: 105, name: 'Acampamento Norte',   destIds: ['carroca_cidade'] },
        { id: 'carroca_golem',   x: 480, y: 290, name: 'Posto Leste',         destIds: ['carroca_cidade'] },
        { id: 'carroca_lagarto', x: 390, y: 470, name: 'Rancho Sul',          destIds: ['carroca_cidade'] },
        { id: 'carroca_uivante', x: 130, y: 210, name: 'Clareira Oeste',      destIds: ['carroca_cidade'] }
    ]
};

// ========== GERADOR PRINCIPAL ==========

function _generateCidadeCells() {
    var cells = [];
    function add(x, y, props) { props.x = x; props.y = y; cells.push(props); }

    var occupied = {};
    function occ(x, y) { return occupied[x + ',' + y]; }
    function markOcc(x, y) { occupied[x + ',' + y] = true; }

    function placeBuilding(bx, by, w, h, elev) {
        // Verifica TODAS as tiles antes de construir (evita casas em rios/pontes)
        for (var dx = 0; dx < w; dx++) {
            for (var dy = 0; dy < h; dy++) {
                if (occ(bx + dx, by + dy)) return false;
            }
        }
        var cx = Math.floor(w / 2), cy = Math.floor(h / 2);
        for (var dx = 0; dx < w; dx++) {
            for (var dy = 0; dy < h; dy++) {
                var props = { obstacle: 'blocker', elevation: elev || 2, terrainType: 'brick' };
                if (dx === cx && dy === cy) props.visualType = 'house';
                add(bx + dx, by + dy, props);
                markOcc(bx + dx, by + dy);
            }
        }
        return true;
    }

    // =========================================
    // PASSO 1: Grama em toda area da planicie (EXPANDIDA: raio 270)
    // =========================================
    for (var y = 40; y < 560; y++) {
        for (var x = 40; x < 560; x++) {
            var dx = x - _CX, dy = y - _CY;
            var dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 270) {
                var n = _PN.fbm(x * 0.02, y * 0.02, 3);
                if (dist > 255 && n > -0.1) {
                    add(x, y, { terrainType: 'sand' });
                } else {
                    add(x, y, { terrainType: 'grass' });
                }
            } else if (dist < 285) {
                var n2 = _PN2.noise(x * 0.05, y * 0.05);
                if (n2 > 0.1) {
                    add(x, y, { terrainType: 'grass' });
                }
            }
        }
    }

    // =========================================
    // PASSO 2: RIO (NW para S, 2-3 tiles largura)
    // =========================================
    for (var y = 50; y < 560; y++) {
        for (var x = 120; x < 320; x++) {
            if (occ(x, y)) continue;
            var rd = _getRiverDist(x, y);
            if (rd < 1.8 && !_isBridge(x, y)) {
                add(x, y, { terrainType: 'water', obstacle: 'hole', elevation: -1 });
                markOcc(x, y);
            } else if (rd < 3 && !_isBridge(x, y)) {
                add(x, y, { terrainType: 'water', obstacle: 'blocker', elevation: -1 });
                markOcc(x, y);
            } else if (rd < 6 && !_isBridge(x, y) && !_isOnWall(x, y)) {
                add(x, y, { terrainType: 'puddle', elevation: -0.5 });
            }
        }
    }

    // ---- Ramal do rio (NW → cidade, riacho fino, chega até a calçada da praça) ----
    for (var y = 175; y < 300; y++) {
        for (var x = 195; x < 300; x++) {
            if (occ(x, y)) continue;
            // Não desenhar água na área da praça (praça será colocada depois)
            if (Math.abs(x - _CX) <= 19 && Math.abs(y - _CY) <= 19) continue;
            var bd = _getRiverBranchDist(x, y);
            if (bd < 1.2 && !_isBridge(x, y)) {
                add(x, y, { terrainType: 'water', obstacle: 'hole', elevation: -1 });
                markOcc(x, y);
            } else if (bd < 2 && !_isBridge(x, y)) {
                add(x, y, { terrainType: 'water', obstacle: 'blocker', elevation: -1 });
                markOcc(x, y);
            } else if (bd < 4.5 && !_isBridge(x, y) && !_isOnWall(x, y)) {
                add(x, y, { terrainType: 'puddle', elevation: -0.5 });
            }
        }
    }

    // ---- Lago/poça da cidade (acima da praça, onde o ramal alarga) ----
    var _cityPond = { cx: 272, cy: 264, rx: 8, ry: 6 };
    for (var cpy = _cityPond.cy - _cityPond.ry - 3; cpy <= _cityPond.cy + _cityPond.ry + 3; cpy++) {
        for (var cpx = _cityPond.cx - _cityPond.rx - 3; cpx <= _cityPond.cx + _cityPond.rx + 3; cpx++) {
            if (occ(cpx, cpy)) continue;
            if (Math.abs(cpx - _CX) <= 19 && Math.abs(cpy - _CY) <= 19) continue; // preserva praça
            if (_isOnWall(cpx, cpy)) continue;
            var _pdx = (cpx - _cityPond.cx) / _cityPond.rx;
            var _pdy = (cpy - _cityPond.cy) / _cityPond.ry;
            var _pd = Math.sqrt(_pdx * _pdx + _pdy * _pdy);
            var _pn = _PN.fbm(cpx * 0.04, cpy * 0.04, 2) * 0.15;
            if (_pd + _pn < 0.6) {
                add(cpx, cpy, { terrainType: 'water', obstacle: 'hole', elevation: -1 });
                markOcc(cpx, cpy);
            } else if (_pd + _pn < 0.85) {
                add(cpx, cpy, { terrainType: 'water', obstacle: 'blocker', elevation: -1 });
                markOcc(cpx, cpy);
            } else if (_pd + _pn < 1.3) {
                add(cpx, cpy, { terrainType: 'puddle', elevation: -0.5 });
            }
        }
    }

    // Pontes — rio principal
    for (var bi = 0; bi < _bridgeData.length; bi++) {
        var b = _bridgeData[bi];
        for (var bxx = b.bx - b.w; bxx <= b.bx + b.w; bxx++) {
            for (var byy = b.by - b.h; byy <= b.by + b.h; byy++) {
                add(bxx, byy, { terrainType: 'wood', obstacle: null, elevation: 0 });
                markOcc(bxx, byy);
            }
        }
    }

    // NOTA: Buffer de pontes movido para DEPOIS das estradas internas (evita bloquear calçamento)

    // =========================================
    // PASSO 3: LAGOS
    // =========================================
    var lakes = [
        { cx: 200, cy: 380, rx: 18, ry: 14 },
        { cx: 420, cy: 240, rx: 14, ry: 16 },
        { cx: 360, cy: 470, rx: 16, ry: 12 },
    ];
    for (var li = 0; li < lakes.length; li++) {
        var lk = lakes[li];
        for (var ly = lk.cy - lk.ry - 10; ly <= lk.cy + lk.ry + 10; ly++) {
            for (var lx = lk.cx - lk.rx - 10; lx <= lk.cx + lk.rx + 10; lx++) {
                if (occ(lx, ly)) continue;
                var ldx = (lx - lk.cx) / lk.rx, ldy = (ly - lk.cy) / lk.ry;
                var ld = Math.sqrt(ldx * ldx + ldy * ldy);
                var ln = _PN.fbm(lx * 0.06, ly * 0.06, 2) * 0.15;
                if (ld + ln < 0.7) {
                    add(lx, ly, { terrainType: 'water', obstacle: 'hole', elevation: -1 });
                    markOcc(lx, ly);
                } else if (ld + ln < 0.95) {
                    add(lx, ly, { terrainType: 'water', obstacle: 'blocker', elevation: -1 });
                    markOcc(lx, ly);
                } else if (ld + ln < 1.5 && !_isOnWall(lx, ly)) {
                    add(lx, ly, { terrainType: 'puddle', elevation: -0.5 });
                }
            }
        }
    }

    // =========================================
    // PASSO 4: MUROS DA CIDADE (orgânicos, 4-6 tiles largura — EXPANDIDO)
    // Muros SEMPRE colocados (mesmo sobre rio) — barreira sólida impenetrável
    // =========================================
    for (var y = _CY - 130; y <= _CY + 130; y++) {
        for (var x = _CX - 130; x <= _CX + 130; x++) {
            var insideCity = _isInsideCity(x, y);
            if (!insideCity) continue;

            if (_isOnTower(x, y)) {
                // Torres SEMPRE colocadas (sobrescrevem rio se necessário)
                add(x, y, { obstacle: 'blocker', elevation: 4, terrainType: 'stone', visualType: 'wall' });
                markOcc(x, y);
            } else if (_isOnWall(x, y) && !_isOnGate(x, y)) {
                // Muros SEMPRE colocados (rio passa por baixo como culvert)
                add(x, y, { obstacle: 'blocker', elevation: 3, terrainType: 'stone', visualType: 'wall' });
                markOcc(x, y);
            } else if (_isOnGate(x, y)) {
                // Portões SEMPRE colocados (sobrescrevem rio como muros)
                add(x, y, { terrainType: 'stone' });
                // Gates are passable — NÃO markOcc para estradas passarem
            }
        }
    }

    // Faixa de barro (dirt) ao redor exterior da muralha (~5 tiles)
    for (var y = _CY - 130; y <= _CY + 130; y++) {
        for (var x = _CX - 130; x <= _CX + 130; x++) {
            if (occ(x, y) || _isInsideCity(x, y)) continue;
            var ddx = x - _CX, ddy = y - _CY;
            var ddist = Math.sqrt(ddx * ddx + ddy * ddy);
            var dangle = Math.atan2(ddy, ddx);
            var dradius = _getCityRadius(dangle);
            if (ddist >= dradius && ddist < dradius + 5) {
                add(x, y, { terrainType: 'dirt' });
                markOcc(x, y);
            }
        }
    }

    // =========================================
    // PASSO 5: INTERIOR DA CIDADE (EXPANDIDO)
    // =========================================
    var pcx = _CX, pcy = _CY; // plaza center

    // Praça central — calçamento quadrado todo em pedra (MAIOR: ±18)
    for (var y = pcy - 19; y <= pcy + 19; y++) {
        for (var x = pcx - 19; x <= pcx + 19; x++) {
            if (occ(x, y)) continue;
            if (Math.abs(x - pcx) <= 18 && Math.abs(y - pcy) <= 18) {
                add(x, y, { terrainType: 'stone' });
                markOcc(x, y);
            }
        }
    }

    // Fonte central (circular, no meio da praça quadrada)
    for (var y = pcy - 6; y <= pcy + 6; y++) {
        for (var x = pcx - 6; x <= pcx + 6; x++) {
            var fdx = x - pcx, fdy = y - pcy;
            var fdist = Math.sqrt(fdx * fdx + fdy * fdy);
            if (fdist <= 3) {
                add(x, y, { terrainType: 'water', obstacle: 'blocker', elevation: 2 });
                markOcc(x, y);
            } else if (fdist <= 4.5) {
                add(x, y, { terrainType: 'marble', obstacle: 'blocker', elevation: 2 });
                markOcc(x, y);
            }
        }
    }
    add(pcx, pcy, { terrainType: 'water', obstacle: 'blocker', elevation: 3, visualType: 'fountain' });

    // Bancos na praça (ao redor da fonte)
    var benchSpots = [
        { x: pcx - 8, y: pcy - 2 }, { x: pcx - 8, y: pcy + 2 },   // W da fonte
        { x: pcx + 8, y: pcy - 2 }, { x: pcx + 8, y: pcy + 2 },   // E da fonte
        { x: pcx - 2, y: pcy - 8 }, { x: pcx + 2, y: pcy - 8 },   // N da fonte
        { x: pcx - 2, y: pcy + 8 }, { x: pcx + 2, y: pcy + 8 },   // S da fonte
        // Bancos nos cantos da praça
        { x: pcx - 14, y: pcy - 14 }, { x: pcx + 14, y: pcy - 14 },
        { x: pcx - 14, y: pcy + 14 }, { x: pcx + 14, y: pcy + 14 },
    ];
    for (var bi = 0; bi < benchSpots.length; bi++) {
        var bs = benchSpots[bi];
        if (!occ(bs.x, bs.y)) {
            add(bs.x, bs.y, { visualType: 'bench', obstacle: 'blocker' });
            markOcc(bs.x, bs.y);
        }
    }

    // Estradas de pedra ligando praça central aos 4 portões da cidade
    // Posições dos portões calculadas dinamicamente da forma da muralha
    var gateRoads = [
        // North gate — praça até portão norte (calculado)
        [{x: pcx, y: pcy - 20}, {x: _gatePositions[0].ox, y: _gatePositions[0].oy}],
        // South gate — praça até portão sul (calculado)
        [{x: pcx, y: pcy + 20}, {x: _gatePositions[1].ox, y: _gatePositions[1].oy}],
        // East gate — praça até portão leste (calculado)
        [{x: pcx + 20, y: pcy}, {x: _gatePositions[2].ox, y: _gatePositions[2].oy}],
        // West gate — praça → ponte rio principal (bridge 1) → portão oeste (evita ramal)
        [{x: pcx - 20, y: pcy}, {x: 227, y: pcy}, {x: _gatePositions[3].ox, y: _gatePositions[3].oy}],
    ];
    for (var gi = 0; gi < gateRoads.length; gi++) {
        var pts = gateRoads[gi];
        for (var pi = 0; pi < pts.length - 1; pi++) {
            var a = pts[pi], b = pts[pi + 1];
            var segDx = b.x - a.x, segDy = b.y - a.y;
            var segLen = Math.ceil(Math.sqrt(segDx * segDx + segDy * segDy));
            var segIsVert = Math.abs(segDy) > Math.abs(segDx);
            for (var s = 0; s <= segLen; s++) {
                var t = segLen > 0 ? s / segLen : 0;
                var rx = Math.round(a.x + t * segDx);
                var ry = Math.round(a.y + t * segDy);
                var noiseV = Math.round(_PN.noise(rx * 0.05 + gi * 7, ry * 0.05) * 1.5);
                // Alarga perto dos portões (5 tiles), sobre água (7 tiles), normal no meio (3 tiles)
                var lastPt = pts[pts.length - 1];
                var distToGate = Math.sqrt(Math.pow(rx - lastPt.x, 2) + Math.pow(ry - lastPt.y, 2));
                var centerIsWater = occ(rx, ry);
                var halfW = centerIsWater ? 3 : (distToGate < 15 ? 2 : 1);
                for (var w = -halfW; w <= halfW; w++) {
                    var fx = segIsVert ? rx + noiseV + w : rx;
                    var fy = segIsVert ? ry : ry + noiseV + w;
                    var insideOk = _isInsideCity(fx, fy) && !_isOnWall(fx, fy);
                    var gateOk = _isOnGate(fx, fy);
                    if (insideOk || gateOk) {
                        if (occ(fx, fy)) {
                            // Água/obstáculo no caminho → auto-bridge (madeira, limpa obstacle/elevation)
                            add(fx, fy, { terrainType: 'wood', obstacle: null, elevation: 0 });
                        } else {
                            add(fx, fy, { terrainType: 'stone' });
                        }
                        markOcc(fx, fy);
                    }
                }
            }
        }
    }

    // Ruas secundárias (dirt, mais finas — EXPANDIDAS)
    var secRoads = [
        { axis: 'h', pos: pcy - 40, from: pcx - 85, to: pcx + 80 },
        { axis: 'h', pos: pcy + 37, from: pcx - 80, to: pcx + 85 },
        { axis: 'v', pos: pcx - 45, from: pcy - 75, to: pcy + 68 },
        { axis: 'v', pos: pcx + 50, from: pcy - 68, to: pcy + 75 },
    ];
    for (var ri = 0; ri < secRoads.length; ri++) {
        var sr = secRoads[ri];
        if (sr.axis === 'h') {
            for (var x = sr.from; x <= sr.to; x++) {
                var off = Math.round(_PN2.noise(x * 0.08, sr.pos * 0.08) * 1);
                for (var w = 0; w <= 1; w++) {
                    var ry = sr.pos + off + w;
                    if (!occ(x, ry) && _isInsideCity(x, ry)) add(x, ry, { terrainType: 'dirt' });
                }
            }
        } else {
            for (var y = sr.from; y <= sr.to; y++) {
                var off = Math.round(_PN2.noise(sr.pos * 0.08, y * 0.08) * 1);
                for (var w = 0; w <= 1; w++) {
                    var rx = sr.pos + off + w;
                    if (!occ(rx, y) && _isInsideCity(rx, y)) add(rx, y, { terrainType: 'dirt' });
                }
            }
        }
    }

    // BUFFER de 5 tiles ao redor de cada ponte (evita casas coladas em pontes)
    // Movido para DEPOIS das estradas para não bloquear calçamento
    for (var bi = 0; bi < _bridgeData.length; bi++) {
        var b = _bridgeData[bi];
        for (var bxx = b.bx - b.w - 5; bxx <= b.bx + b.w + 5; bxx++) {
            for (var byy = b.by - b.h - 5; byy <= b.by + b.h + 5; byy++) {
                markOcc(bxx, byy);
            }
        }
    }
    // Buffer ao redor do lago da cidade (evita casas na margem)
    for (var bpx = _cityPond.cx - _cityPond.rx - 4; bpx <= _cityPond.cx + _cityPond.rx + 4; bpx++) {
        for (var bpy = _cityPond.cy - _cityPond.ry - 4; bpy <= _cityPond.cy + _cityPond.ry + 4; bpy++) {
            markOcc(bpx, bpy);
        }
    }

    // --- Distrito Comercial (NE da praça — EXPANDIDO p/ cidade 105×90) ---
    // Mercado (logo acima da praça, leste da estrada norte)
    placeBuilding(pcx + 3, pcy - 25, 6, 4, 3);
    add(pcx + 6, pcy - 21, { visualType: 'market' });
    add(pcx + 4, pcy - 21, { visualType: 'market' });
    add(pcx + 2, pcy - 21, { visualType: 'sign' });
    add(pcx + 9, pcy - 23, { visualType: 'crate', obstacle: 'blocker' }); markOcc(pcx + 9, pcy - 23);
    add(pcx + 9, pcy - 25, { visualType: 'barrel', obstacle: 'blocker' }); markOcc(pcx + 9, pcy - 25);

    // Banco
    placeBuilding(pcx + 50, pcy - 22, 6, 5, 3);
    add(pcx + 53, pcy - 23, { visualType: 'sign' });

    // Loja de Poções
    placeBuilding(pcx + 42, pcy - 50, 4, 3, 2);
    add(pcx + 43, pcy - 51, { visualType: 'sign' });

    // Loja de Armas
    placeBuilding(pcx + 55, pcy - 36, 5, 4, 2);
    add(pcx + 56, pcy - 37, { visualType: 'sign' });

    // --- Distrito dos Artesãos (SW da praça — EXPANDIDO p/ cidade 105×90) ---
    // Forja
    placeBuilding(pcx - 42, pcy + 18, 4, 3, 2);
    add(pcx - 38, pcy + 18, { visualType: 'forge', obstacle: 'blocker' }); markOcc(pcx - 38, pcy + 18);
    add(pcx - 38, pcy + 20, { visualType: 'anvil', obstacle: 'blocker' }); markOcc(pcx - 38, pcy + 20);
    add(pcx - 43, pcy + 18, { visualType: 'sign' });

    // Costuraria
    placeBuilding(pcx - 32, pcy + 32, 4, 3, 2);
    add(pcx - 28, pcy + 32, { visualType: 'loom', obstacle: 'blocker' }); markOcc(pcx - 28, pcy + 32);
    add(pcx - 33, pcy + 32, { visualType: 'sign' });

    // Laboratório
    placeBuilding(pcx - 50, pcy + 35, 3, 3, 2);
    add(pcx - 47, pcy + 38, { visualType: 'cauldron', obstacle: 'blocker' }); markOcc(pcx - 47, pcy + 38);
    add(pcx - 51, pcy + 35, { visualType: 'sign' });

    // Joalheria
    placeBuilding(pcx - 25, pcy + 45, 3, 4, 2);
    add(pcx - 22, pcy + 47, { visualType: 'workbench', obstacle: 'blocker' }); markOcc(pcx - 22, pcy + 47);
    add(pcx - 26, pcy + 45, { visualType: 'sign' });

    // Padaria
    placeBuilding(pcx - 56, pcy + 25, 3, 3, 2);
    add(pcx - 53, pcy + 25, { visualType: 'oven', obstacle: 'blocker' }); markOcc(pcx - 53, pcy + 25);

    // Ferreiro (antiga Encouraçador)
    placeBuilding(pcx - 48, pcy + 48, 4, 3, 2);
    add(pcx - 49, pcy + 48, { visualType: 'sign' });

    // --- Bairro Residencial Norte (N da praça — EXPANDIDO p/ cidade 105×90) ---
    var casasN = [
        [pcx - 28, pcy - 48, 5, 4], [pcx - 16, pcy - 55, 4, 3], [pcx + 8, pcy - 52, 5, 3],
        [pcx - 34, pcy - 62, 4, 4], [pcx - 18, pcy - 68, 5, 3], [pcx + 4, pcy - 64, 4, 4],
        [pcx + 22, pcy - 58, 5, 3], [pcx - 48, pcy - 50, 4, 3],
        [pcx + 12, pcy - 46, 4, 3], [pcx - 8, pcy - 60, 5, 4],
        [pcx + 18, pcy - 66, 4, 3], [pcx - 42, pcy - 58, 5, 4],
        [pcx + 32, pcy - 50, 4, 4], [pcx - 56, pcy - 42, 4, 3],
        [pcx + 42, pcy - 44, 5, 3], [pcx - 24, pcy - 76, 4, 3],
        // Casas extras para a cidade expandida
        [pcx + 50, pcy - 38, 4, 3], [pcx - 62, pcy - 34, 4, 4],
        [pcx + 38, pcy - 62, 5, 3], [pcx - 50, pcy - 68, 4, 3],
        [pcx + 10, pcy - 76, 4, 4], [pcx - 36, pcy - 74, 5, 3],
        [pcx + 28, pcy - 72, 4, 3], [pcx - 10, pcy - 82, 5, 3],
    ];
    for (var ci = 0; ci < casasN.length; ci++) {
        var c = casasN[ci];
        placeBuilding(c[0], c[1], c[2], c[3], 2);
    }

    // Taverna (N)
    placeBuilding(pcx - 12, pcy - 42, 5, 4, 2);
    add(pcx - 13, pcy - 42, { visualType: 'sign' });

    // Templo (NW)
    placeBuilding(pcx - 62, pcy - 28, 5, 5, 3);
    add(pcx - 63, pcy - 28, { visualType: 'sign' });

    // --- Bairro Residencial Sul (S da praça — EXPANDIDO p/ cidade 105×90) ---
    var casasS = [
        [pcx + 16, pcy + 30, 5, 4], [pcx + 28, pcy + 38, 4, 3], [pcx + 8, pcy + 44, 5, 3],
        [pcx + 24, pcy + 50, 4, 4], [pcx + 40, pcy + 30, 4, 3], [pcx + 36, pcy + 46, 5, 3],
        [pcx + 12, pcy + 56, 4, 4], [pcx + 28, pcy + 60, 5, 3],
        [pcx + 46, pcy + 40, 5, 4], [pcx + 18, pcy + 68, 4, 3],
        [pcx + 4, pcy + 52, 4, 3], [pcx + 36, pcy + 62, 5, 4],
        [pcx + 52, pcy + 54, 4, 3], [pcx + 8, pcy + 72, 4, 4],
        [pcx + 44, pcy + 68, 5, 3], [pcx + 24, pcy + 76, 4, 3],
        // Casas extras para a cidade expandida
        [pcx + 56, pcy + 46, 4, 3], [pcx + 32, pcy + 72, 5, 4],
        [pcx + 14, pcy + 80, 4, 3], [pcx + 48, pcy + 60, 4, 4],
        [pcx + 60, pcy + 36, 5, 3], [pcx + 40, pcy + 76, 4, 3],
    ];
    for (var ci = 0; ci < casasS.length; ci++) {
        var c = casasS[ci];
        placeBuilding(c[0], c[1], c[2], c[3], 2);
    }

    // Quartel (perto portão leste — EXPANDIDO p/ cidade 105×90)
    placeBuilding(pcx + 65, pcy - 5, 5, 5, 2);
    add(pcx + 64, pcy - 5, { visualType: 'sign' });

    // Guarita norte (perto portão norte)
    placeBuilding(pcx - 6, pcy - 92, 4, 3, 2);
    add(pcx - 7, pcy - 92, { visualType: 'sign' });

    // Guarita sul (perto portão sul)
    placeBuilding(pcx + 2, pcy + 92, 4, 3, 2);
    add(pcx + 1, pcy + 92, { visualType: 'sign' });

    // --- Recursos coletáveis dentro da cidade ---
    // Horta do templo (SE interno — EXPANDIDA p/ cidade 105×90)
    for (var hy = pcy + 28; hy <= pcy + 42; hy++) {
        for (var hx = pcx + 18; hx <= pcx + 30; hx++) {
            if (!occ(hx, hy) && _isInsideCity(hx, hy)) {
                if ((hx + hy) % 2 === 0 && _cityChance(0.4)) {
                    add(hx, hy, { terrainType: 'farmland' });
                }
            }
        }
    }

    // Pomar (NW interno — EXPANDIDO p/ cidade 105×90)
    for (var py = pcy - 36; py <= pcy - 18; py++) {
        for (var px = pcx - 68; px <= pcx - 50; px++) {
            if (!occ(px, py) && _isInsideCity(px, py)) {
                if (_cityChance(0.08)) {
                    add(px, py, { visualType: 'tree', obstacle: 'blocker', elevation: 0 });
                    markOcc(px, py);
                }
            }
        }
    }

    // Pedreira interna (S — EXPANDIDA p/ cidade 105×90)
    for (var ry = pcy + 55; ry <= pcy + 70; ry++) {
        for (var rx = pcx + 6; rx <= pcx + 22; rx++) {
            if (!occ(rx, ry) && _isInsideCity(rx, ry)) {
                if (_cityChance(0.1)) {
                    add(rx, ry, { visualType: 'rock', obstacle: 'blocker', terrainType: 'dirt', elevation: _cityChance(0.5) ? -0.5 : 0.5 });
                    markOcc(rx, ry);
                }
            }
        }
    }

    // Poço d'água (perto da praça)
    add(pcx + 22, pcy + 7, { visualType: 'well', obstacle: 'blocker' }); markOcc(pcx + 22, pcy + 7);

    // Jardim de flores (W interno — EXPANDIDO p/ cidade 105×90)
    for (var jy = pcy - 10; jy <= pcy + 10; jy++) {
        for (var jx = pcx - 74; jx <= pcx - 58; jx++) {
            if (!occ(jx, jy) && _isInsideCity(jx, jy)) {
                if (_cityChance(0.12)) add(jx, jy, { visualType: 'flower' });
                else if (_cityChance(0.08)) add(jx, jy, { visualType: 'bush' });
            }
        }
    }

    // Decorações espalhadas dentro da cidade (EXPANDIDAS p/ cidade 105×90)
    for (var y = _CY - 110; y <= _CY + 110; y++) {
        for (var x = _CX - 115; x <= _CX + 115; x++) {
            if (occ(x, y) || !_isInsideCity(x, y) || _isOnWall(x, y)) continue;
            if (_cityChance(0.008)) { add(x, y, { visualType: 'tree', obstacle: 'blocker', elevation: 0 }); markOcc(x, y); continue; }
            if (_cityChance(0.01)) { add(x, y, { visualType: 'bush' }); continue; }
            if (_cityChance(0.008)) { add(x, y, { visualType: 'flower' }); continue; }
            if (_cityChance(0.005)) { add(x, y, { visualType: 'lamp' }); continue; }
        }
    }

    // Interior restante da cidade = grama (EXPANDIDO p/ cidade 105×90)
    for (var y = _CY - 118; y <= _CY + 118; y++) {
        for (var x = _CX - 122; x <= _CX + 122; x++) {
            if (occ(x, y)) continue;
            if (_isInsideCity(x, y) && !_isOnWall(x, y)) {
                add(x, y, { terrainType: 'grass' });
            }
        }
    }

    // =========================================
    // PASSO 5B: CALÇADAS DE PEDRA NAS MARGENS DO RAMAL (dentro da cidade)
    // =========================================
    // Stone sidewalks along both banks of the ramal river inside the city
    for (var y = 235; y < 288; y++) {
        for (var x = 252; x < 292; x++) {
            if (occ(x, y) || !_isInsideCity(x, y) || _isOnWall(x, y)) continue;
            var bd = _getRiverBranchDist(x, y);
            // Faixa de pedra nas margens do ramal (logo após a poça, ~3 tiles de largura)
            if (bd >= 4.5 && bd < 8) {
                add(x, y, { terrainType: 'stone' });
            }
        }
    }

    // Calçada conectando distrito artesão (SW) ao ramal e à praça
    // Faixa horizontal de pedra ligando a área artesã à margem do ramal
    for (var y = pcy - 2; y <= pcy + 6; y++) {
        for (var x = pcx - 50; x < pcx - 19; x++) {
            if (occ(x, y) || !_isInsideCity(x, y)) continue;
            var noiseOff = Math.round(_PN2.noise(x * 0.06, y * 0.06) * 1.5);
            if (y + noiseOff >= pcy - 1 && y + noiseOff <= pcy + 4) {
                add(x, y, { terrainType: 'stone' });
            }
        }
    }

    // Calçada conectando distrito comercial (NE) à praça
    for (var y = pcy - 30; y <= pcy - 20; y++) {
        for (var x = pcx + 19; x < pcx + 55; x++) {
            if (occ(x, y) || !_isInsideCity(x, y)) continue;
            var noiseOff2 = Math.round(_PN2.noise(x * 0.06, y * 0.06 + 5) * 1.5);
            if (y + noiseOff2 >= pcy - 28 && y + noiseOff2 <= pcy - 22) {
                add(x, y, { terrainType: 'stone' });
            }
        }
    }

    // =========================================
    // PASSO 6: PLANÍCIES — sub-zonas externas (EXPANDIDAS)
    // =========================================

    // Roads fora da cidade (com auto-bridge sobre água)
    for (var y = 40; y < 560; y++) {
        for (var x = 40; x < 560; x++) {
            if (_isInsideCity(x, y)) continue;
            if (_isRoad(x, y)) {
                if (occ(x, y)) {
                    // Estrada cruza célula ocupada (água/rio) → auto-bridge
                    add(x, y, { terrainType: 'wood', obstacle: null, elevation: 0 });
                } else {
                    add(x, y, { terrainType: 'dirt' });
                }
                markOcc(x, y);
                continue;
            }
            if (occ(x, y)) continue;
        }
    }

    // Farmland
    for (var y = 40; y < 560; y++) {
        for (var x = 40; x < 560; x++) {
            if (occ(x, y) || _isInsideCity(x, y)) continue;
            if (_isFarm(x, y)) {
                if ((x + y) % 2 === 0 && _cityChance(0.45)) {
                    add(x, y, { terrainType: 'farmland' });
                } else {
                    add(x, y, { terrainType: 'dirt' });
                }
            }
        }
    }

    // Ruinas (SW — EXPANDIDAS)
    for (var y = 415; y < 525; y++) {
        for (var x = 100; x < 200; x++) {
            if (occ(x, y)) continue;
            if (_isRuins(x, y)) {
                if (_cityChance(0.3)) {
                    add(x, y, { visualType: 'rock', obstacle: 'blocker', terrainType: 'stone', elevation: _cityChance(0.5) ? -0.5 : 0.5 });
                    markOcc(x, y);
                } else {
                    add(x, y, { terrainType: _cityChance(0.5) ? 'dirt' : 'stone' });
                }
            }
        }
    }

    // Árvores e rochas orgânicas nas planícies (EXPANDIDAS)
    for (var y = 50; y < 550; y++) {
        for (var x = 50; x < 550; x++) {
            if (occ(x, y) || _isInsideCity(x, y)) continue;
            var zone = _getOutsideZone(x, y);
            var tn = _PN.noise(x * 0.4 + 100, y * 0.4 + 100);
            var rn = _PN2.noise(x * 0.35 + 50, y * 0.35 + 50);

            // Trees
            var treeThreshold = 0.5;
            if (zone === 'bosque_oeste') treeThreshold = 0.25;
            else if (zone === 'campos_norte') treeThreshold = 0.42;
            else if (zone === 'pradaria_sul') treeThreshold = 0.48;
            else if (zone === 'colinas_leste') treeThreshold = 0.46;

            if (tn > treeThreshold) {
                add(x, y, { visualType: 'tree', obstacle: 'blocker', elevation: 0 });
                markOcc(x, y);
                continue;
            }

            // Rocks (mainly colinas leste)
            var rockThreshold = 0.5;
            if (zone === 'colinas_leste') rockThreshold = 0.3;
            else if (zone === 'campos_norte') rockThreshold = 0.48;

            if (rn > rockThreshold) {
                add(x, y, { visualType: 'rock', obstacle: 'blocker', elevation: _cityChance(0.5) ? -0.5 : 0.5 });
                markOcc(x, y);
                continue;
            }

            // Decorations
            if (_cityChance(0.02)) { add(x, y, { visualType: 'bush' }); continue; }
            if (_cityChance(0.015)) { add(x, y, { visualType: 'flower' }); continue; }
            if (_cityChance(0.01)) { add(x, y, { visualType: 'grass' }); continue; }
        }
    }

    // =========================================
    // PASSO 7: ELEVAÇÃO NAS COLINAS LESTE
    // =========================================
    for (var y = 180; y < 400; y++) {
        for (var x = 400; x < 520; x++) {
            if (occ(x, y)) continue;
            var en = _PN.fbm((x - 420) * 0.02, (y - 280) * 0.02, 4);
            if (en > 0.15) {
                var elev = en > 0.35 ? 2 : 1;
                add(x, y, { elevation: elev, terrainType: en > 0.3 ? 'stone' : 'dirt' });
                markOcc(x, y);
            }
        }
    }

    // Rampas de acesso nas colinas
    var rampSpots = [
        { x: 410, y: 260, dir: 'east' }, { x: 410, y: 261, dir: 'east' },
        { x: 410, y: 300, dir: 'east' }, { x: 410, y: 301, dir: 'east' },
        { x: 435, y: 385, dir: 'north' }, { x: 436, y: 385, dir: 'north' },
    ];
    for (var ri = 0; ri < rampSpots.length; ri++) {
        var rs = rampSpots[ri];
        add(rs.x, rs.y, { obstacle: 'ramp', rampDir: rs.dir, rampElevLow: 0, rampElevHigh: 1, terrainType: 'dirt' });
        markOcc(rs.x, rs.y);
    }

    // =========================================
    // PASSO 8: Entrada da dungeon dos esgotos (dentro da cidade)
    // =========================================
    add(_CX + 7, _CY + 57, { terrainType: 'stone', visualType: 'dungeon_entrance' });

    // Entradas de dungeon externas (visual markers)
    add(195, 355, { terrainType: 'stone', visualType: 'dungeon_entrance' }); // Gruta dos Esporos
    add(445, 330, { terrainType: 'stone', visualType: 'dungeon_entrance' }); // Caverna Sombria
    add(385, 450, { terrainType: 'stone', visualType: 'dungeon_entrance' }); // Raiz Ancestral
    add(155, 465, { terrainType: 'stone', visualType: 'dungeon_entrance' }); // Cripta

    // =========================================
    // PASSO 9: Transições nas bordas (futuras regiões — EXPANDIDAS)
    // =========================================
    for (var i = 260; i <= 340; i++) {
        add(i, 42, { obstacle: 'transition', terrainType: 'stone', transitionTo: 0 }); // Norte → Floresta
        add(i, 558, { obstacle: 'transition', terrainType: 'stone', transitionTo: 0 }); // Sul → Praia/Pântano
    }
    for (var i = 250; i <= 350; i++) {
        add(42, i, { obstacle: 'transition', terrainType: 'stone', transitionTo: 0 }); // Oeste → Sombria
        add(558, i, { obstacle: 'transition', terrainType: 'stone', transitionTo: 0 }); // Leste → Pradaria
    }

    // =========================================
    // PASSO 10: Limpa artefatos fora do boundary
    // =========================================
    // Remove qualquer coisa gerada fora do limite jogável
    var cleanCount = 0;
    for (var ci = cells.length - 1; ci >= 0; ci--) {
        var c = cells[ci];
        if (!_isInsideMapBoundary(c.x, c.y)) {
            cells.splice(ci, 1);
            cleanCount++;
        }
    }
    if (cleanCount > 0) console.log('[CIDADE] Limpou ' + cleanCount + ' celulas fora do boundary');

    // ---- Aplica delta de edições manuais (se existir) ----
    if (typeof _CIDADE_DELTA !== 'undefined' && Array.isArray(_CIDADE_DELTA)) {
        var _cellIdx = {};
        for (var ci = 0; ci < cells.length; ci++) _cellIdx[cells[ci].x + ',' + cells[ci].y] = ci;
        var deltaCount = 0;
        for (var di = 0; di < _CIDADE_DELTA.length; di++) {
            var d = _CIDADE_DELTA[di];
            var props = { x: d.x, y: d.y };
            if (d.t) props.terrainType = d.t;
            if ('o' in d) props.obstacle = d.o;   // Explicit obstacle (including null)
            // Se delta muda terreno para não-água e não especifica obstacle, limpa obstacles residuais
            else if (d.t && d.t !== 'water' && d.t !== 'lava') props.obstacle = null;
            if (d.v) props.visualType = d.v;
            if (d.e !== undefined) props.elevation = d.e;
            if (d.b) props.barriers = d.b;
            if (d.ow) props.oneWayDir = d.ow;
            if (d.rd) { props.rampDir = d.rd; props.rampElevLow = d.rl || 0; props.rampElevHigh = d.rh || 0; }
            var key = d.x + ',' + d.y;
            if (_cellIdx[key] !== undefined) {
                var existing = cells[_cellIdx[key]];
                for (var p in props) existing[p] = props[p];
            } else {
                _cellIdx[key] = cells.length;
                cells.push(props);
            }
            deltaCount++;
        }
        console.log('[CIDADE] Delta aplicado: ' + deltaCount + ' celulas');
    }

    // Sanitiza: pontes (wood) nunca devem ter obstacle — garante passagem
    // + células não-água nunca devem ter obstacle 'hole' (resíduo de água removida por delta)
    for (var si = 0; si < cells.length; si++) {
        var sc = cells[si];
        if (sc.terrainType === 'wood' && (sc.obstacle === 'blocker' || sc.obstacle === 'hole')) {
            sc.obstacle = null;
            if (sc.visualType) sc.visualType = null; // remove decoracao que bloqueava
        }
        if (sc.terrainType !== 'water' && sc.terrainType !== 'lava' && sc.obstacle === 'hole') {
            sc.obstacle = null;
        }
    }

    return cells;
}

// ========== MAPA EXPORTADO ==========

const MAPA_CIDADE = {
    id: 'cidade',
    name: 'Vale de Betta',
    gridSize: 600,
    defaultTerrain: 'sand',
    defaultSpawn: { x: _CX, y: _CY + 8 }, // Perto da praça central

    boundary: {
        enabled: true,
        centerX: _CX,
        centerY: _CY,
        radius: 248,
        edgeWidth: 10
    },

    cells: _generateCidadeCells(),

    // Função de lookup de região por tile (usado pelo spawn system)
    getRegionId: getRegionId,

    // Metadados das regiões (nome, cor, tier, mobs)
    regionMeta: REGION_META,

    // Pontos de transporte rápido
    transports: TRANSPORT_POINTS,

    regions: [
        // === ZONA SEGURA ===
        {
            id: 'praca',
            name: 'Praça da Fonte',
            bounds: { x1: _CX - 26, y1: _CY - 26, x2: _CX + 26, y2: _CY + 26 },
            tier: 0,
            combatMapId: 'cidade_centro'
        },
        // === 4 DISTRITOS INTERNOS — Tier 1 (Rato, Barata, Morcego) ===
        {
            id: 'dist_mercantil',
            name: 'Distrito Mercantil',
            bounds: { x1: 210, y1: 200, x2: 390, y2: 310 },
            tier: 1,
            combatMapId: 'cidade_centro',
            spawnConfig: {
                maxGroups: 4,
                spawnIntervalMs: 18000,
                respawnDelayMs: 30000,
                wanderIntervalMs: 8000,
                wanderRadius: 4,
                families: [
                    { familyId: 'rato',   weight: 55, groupSizeMin: 1, groupSizeMax: 2 },
                    { familyId: 'barata', weight: 45, groupSizeMin: 1, groupSizeMax: 2 }
                ]
            }
        },
        {
            id: 'dist_artesaos',
            name: 'Distrito dos Artesãos',
            bounds: { x1: 190, y1: 240, x2: 310, y2: 400 },
            tier: 1,
            combatMapId: 'cidade_centro',
            spawnConfig: {
                maxGroups: 4,
                spawnIntervalMs: 18000,
                respawnDelayMs: 30000,
                wanderIntervalMs: 8000,
                wanderRadius: 4,
                families: [
                    { familyId: 'rato',    weight: 50, groupSizeMin: 1, groupSizeMax: 2 },
                    { familyId: 'morcego', weight: 50, groupSizeMin: 1, groupSizeMax: 2 }
                ]
            }
        },
        {
            id: 'dist_verdejante',
            name: 'Distrito Verdejante',
            bounds: { x1: 290, y1: 205, x2: 410, y2: 370 },
            tier: 1,
            combatMapId: 'cidade_centro',
            spawnConfig: {
                maxGroups: 4,
                spawnIntervalMs: 18000,
                respawnDelayMs: 30000,
                wanderIntervalMs: 8000,
                wanderRadius: 4,
                families: [
                    { familyId: 'barata',  weight: 50, groupSizeMin: 1, groupSizeMax: 2 },
                    { familyId: 'morcego', weight: 50, groupSizeMin: 1, groupSizeMax: 2 }
                ]
            }
        },
        {
            id: 'dist_residencial',
            name: 'Distrito Residencial',
            bounds: { x1: 220, y1: 290, x2: 400, y2: 400 },
            tier: 1,
            combatMapId: 'cidade_centro',
            spawnConfig: {
                maxGroups: 4,
                spawnIntervalMs: 18000,
                respawnDelayMs: 30000,
                wanderIntervalMs: 8000,
                wanderRadius: 4,
                families: [
                    { familyId: 'rato',   weight: 55, groupSizeMin: 1, groupSizeMax: 2 },
                    { familyId: 'barata', weight: 45, groupSizeMin: 1, groupSizeMax: 2 }
                ]
            }
        },
        // === ARREDORES — Tier 1 (Cogumelo, Sapo, Planta) ===
        {
            id: 'arredores',
            name: 'Arredores da Muralha',
            bounds: { x1: 150, y1: 150, x2: 450, y2: 450 },
            tier: 1,
            combatMapId: 'cidade_arredores',
            spawnConfig: {
                maxGroups: 10,
                spawnIntervalMs: 12000,
                respawnDelayMs: 25000,
                wanderIntervalMs: 7000,
                wanderRadius: 5,
                families: [
                    { familyId: 'cogumelo', weight: 35, groupSizeMin: 1, groupSizeMax: 3 },
                    { familyId: 'sapo',     weight: 35, groupSizeMin: 1, groupSizeMax: 2 },
                    { familyId: 'planta',   weight: 30, groupSizeMin: 1, groupSizeMax: 3 }
                ]
            }
        },
        // === ZONAS MÉDIAS — Tier 1 (6 famílias ex-T2) ===
        {
            id: 'floresta_uivante',
            name: 'Floresta Uivante',
            bounds: { x1: 80, y1: 80, x2: 500, y2: 470 },
            tier: 1,
            combatMapId: 'cidade_floresta',
            spawnConfig: {
                maxGroups: 12,
                spawnIntervalMs: 10000,
                respawnDelayMs: 22000,
                wanderIntervalMs: 6000,
                wanderRadius: 5,
                families: [
                    { familyId: 'lobo',   weight: 40, groupSizeMin: 1, groupSizeMax: 3 },
                    { familyId: 'javali', weight: 35, groupSizeMin: 1, groupSizeMax: 2 },
                    { familyId: 'cobra',  weight: 25, groupSizeMin: 1, groupSizeMax: 2 }
                ]
            }
        },
        {
            id: 'vale_ossos',
            name: 'Vale dos Ossos',
            bounds: { x1: 100, y1: 130, x2: 520, y2: 520 },
            tier: 1,
            combatMapId: 'cidade_vale',
            spawnConfig: {
                maxGroups: 12,
                spawnIntervalMs: 10000,
                respawnDelayMs: 22000,
                wanderIntervalMs: 6000,
                wanderRadius: 5,
                families: [
                    { familyId: 'goblin',    weight: 35, groupSizeMin: 1, groupSizeMax: 3 },
                    { familyId: 'esqueleto', weight: 35, groupSizeMin: 1, groupSizeMax: 2 },
                    { familyId: 'aranha',    weight: 30, groupSizeMin: 1, groupSizeMax: 2 }
                ]
            }
        },
        // === ZONAS EXTERNAS — Tier 2 (6 famílias ex-T3, 1 por zona) ===
        {
            id: 'toca_urso',
            name: 'Toca do Urso',
            bounds: { x1: 140, y1: 30, x2: 460, y2: 150 },
            tier: 2,
            combatMapId: 'cidade_toca_urso',
            spawnConfig: {
                maxGroups: 8,
                spawnIntervalMs: 12000,
                respawnDelayMs: 25000,
                wanderIntervalMs: 7000,
                wanderRadius: 4,
                families: [
                    { familyId: 'urso', weight: 100, groupSizeMin: 1, groupSizeMax: 2 }
                ]
            }
        },
        {
            id: 'ninho_harpia',
            name: 'Ninho das Harpias',
            bounds: { x1: 360, y1: 40, x2: 570, y2: 320 },
            tier: 2,
            combatMapId: 'cidade_ninho_harpia',
            spawnConfig: {
                maxGroups: 8,
                spawnIntervalMs: 12000,
                respawnDelayMs: 25000,
                wanderIntervalMs: 7000,
                wanderRadius: 4,
                families: [
                    { familyId: 'harpia', weight: 100, groupSizeMin: 1, groupSizeMax: 2 }
                ]
            }
        },
        {
            id: 'gruta_golem',
            name: 'Gruta do Golem',
            bounds: { x1: 380, y1: 270, x2: 570, y2: 530 },
            tier: 2,
            combatMapId: 'cidade_gruta_golem',
            spawnConfig: {
                maxGroups: 7,
                spawnIntervalMs: 13000,
                respawnDelayMs: 28000,
                wanderIntervalMs: 8000,
                wanderRadius: 3,
                families: [
                    { familyId: 'golem', weight: 100, groupSizeMin: 1, groupSizeMax: 2 }
                ]
            }
        },
        {
            id: 'pantano_lagarto',
            name: 'Pântano dos Lagartos',
            bounds: { x1: 150, y1: 430, x2: 460, y2: 570 },
            tier: 2,
            combatMapId: 'cidade_pantano_lagarto',
            spawnConfig: {
                maxGroups: 8,
                spawnIntervalMs: 12000,
                respawnDelayMs: 25000,
                wanderIntervalMs: 7000,
                wanderRadius: 4,
                families: [
                    { familyId: 'lagarto', weight: 100, groupSizeMin: 1, groupSizeMax: 2 }
                ]
            }
        },
        {
            id: 'ruinas_troll',
            name: 'Ruínas do Troll',
            bounds: { x1: 30, y1: 340, x2: 210, y2: 570 },
            tier: 2,
            combatMapId: 'cidade_ruinas_troll',
            spawnConfig: {
                maxGroups: 7,
                spawnIntervalMs: 13000,
                respawnDelayMs: 28000,
                wanderIntervalMs: 8000,
                wanderRadius: 3,
                families: [
                    { familyId: 'troll', weight: 100, groupSizeMin: 1, groupSizeMax: 2 }
                ]
            }
        },
        {
            id: 'floresta_ogro',
            name: 'Floresta do Ogro',
            bounds: { x1: 30, y1: 30, x2: 200, y2: 270 },
            tier: 2,
            combatMapId: 'cidade_floresta_ogro',
            spawnConfig: {
                maxGroups: 7,
                spawnIntervalMs: 14000,
                respawnDelayMs: 30000,
                wanderIntervalMs: 8000,
                wanderRadius: 3,
                families: [
                    { familyId: 'ogro', weight: 100, groupSizeMin: 1, groupSizeMax: 2 }
                ]
            }
        }
    ]
};

// Registro global de mapas
const DB_MAPAS = [MAPA_CIDADE];

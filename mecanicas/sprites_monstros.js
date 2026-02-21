// ========== SPRITES PROGRAMÁTICOS DE MONSTROS ==========
// Desenha cada monstro com PIXI.Graphics (silhuetas únicas por família/variante).
// Deps runtime: PIXI, pixiApp (de dev.html)
// Canvas padrão: ~48x64, cx=24, baseY=55, anchor (0.5, 0.85)

// ===== CONFIG POR MONSTRO =====
var MONSTER_DRAW_CONFIG = {
    // --- Faixa 1 (Lv 1-5) ---
    // Ratos
    'rato_esgoto':       { family: 'rato',      scale: 0.85, colors: { body: 0x8B7355, ear: 0xA89070, belly: 0xBFA98A, eye: 0xFF0000, tail: 0x7A6B50 } },
    'rato_pelado':       { family: 'rato',      scale: 0.90, colors: { body: 0xFFB6C1, ear: 0xFF9AA2, belly: 0xFFD1D6, eye: 0x333333, tail: 0xFFAAAA } },
    'rato_saltador':     { family: 'rato',      scale: 0.80, colors: { body: 0x6B8E23, ear: 0x8FBC8F, belly: 0xAACC88, eye: 0xFFFF00, tail: 0x556B2F } },
    'rato_albino':       { family: 'rato',      scale: 0.85, colors: { body: 0xF5F5F5, ear: 0xFFDDDD, belly: 0xFFFFFF, eye: 0xFF3333, tail: 0xEEEEEE } },
    // Baratas
    'barata':            { family: 'barata',    scale: 0.80, colors: { body: 0x8B4513, shell: 0xA0522D, leg: 0x5C3317, antenna: 0x3E2210, eye: 0xFFFF00 } },
    'barata_gigante':    { family: 'barata',    scale: 0.90, colors: { body: 0x654321, shell: 0x8B6914, leg: 0x4A3728, antenna: 0x3E2210, eye: 0xFFAA00 } },
    'cascudo':           { family: 'barata',    scale: 0.85, colors: { body: 0x556B2F, shell: 0x6B8E23, leg: 0x3B4A1F, antenna: 0x2E3B15, eye: 0xCCFF00 } },
    'barata_rainha':     { family: 'barata',    scale: 0.85, colors: { body: 0x4682B4, shell: 0x5F9EA0, leg: 0x2F5F6F, antenna: 0x1E3D4F, eye: 0x00FFFF } },
    // Cogumelos
    'cogumelo_broto':    { family: 'cogumelo',  scale: 0.80, colors: { cap: 0xCD853F, stem: 0xFFF8DC, spots: 0xFFFFFF, eye: 0x333333 } },
    'cogumelo_venenoso': { family: 'cogumelo',  scale: 0.85, colors: { cap: 0x9932CC, stem: 0xD8BFD8, spots: 0xFFFF00, eye: 0xFF00FF } },
    'fungo_ambulante':   { family: 'cogumelo',  scale: 0.90, colors: { cap: 0x808000, stem: 0xBDB76B, spots: 0x556B2F, eye: 0xADFF2F } },
    'cogumelo_anciao':   { family: 'cogumelo',  scale: 0.85, colors: { cap: 0x00CED1, stem: 0xE0FFFF, spots: 0x7FFFD4, eye: 0x00FFFF } },
    // Sapos
    'sapo_pingo':        { family: 'sapo',      scale: 0.80, colors: { body: 0x32CD32, belly: 0x98FB98, eye: 0xFFD700, pupil: 0x000000, spot: 0x228B22 } },
    'sapo_lamacento':    { family: 'sapo',      scale: 0.90, colors: { body: 0x8B7D6B, belly: 0xC4B59B, eye: 0xCDAA7D, pupil: 0x000000, spot: 0x6B5B4B } },
    'sapo_venenoso':     { family: 'sapo',      scale: 0.82, colors: { body: 0xFF4500, belly: 0xFFD700, eye: 0xFF0000, pupil: 0x000000, spot: 0x0000FF } },
    'sapo_patriarca':    { family: 'sapo',      scale: 0.95, colors: { body: 0x006400, belly: 0x8FBC8F, eye: 0xFFFF00, pupil: 0x000000, spot: 0x004400 } },
    // Morcegos
    'morcego_comum':     { family: 'morcego',   scale: 0.80, colors: { body: 0x8B4513, wing: 0x654321, ear: 0x5C3317, eye: 0xFF6600, belly: 0xA0522D } },
    'morcego_noturno':   { family: 'morcego',   scale: 0.82, colors: { body: 0x2F2F2F, wing: 0x1A1A1A, ear: 0x333333, eye: 0xCCCCCC, belly: 0x444444 } },
    'morcego_vampiro':   { family: 'morcego',   scale: 0.85, colors: { body: 0x4B0082, wing: 0x2E0054, ear: 0x3B006E, eye: 0xFF0000, belly: 0x5C1A8C } },
    'morcego_anciao':    { family: 'morcego',   scale: 0.88, colors: { body: 0x696969, wing: 0x555555, ear: 0x777777, eye: 0xFFFF00, belly: 0x808080 } },
    // Plantas
    'broto_espinhoso':   { family: 'planta',    scale: 0.85, colors: { stem: 0x228B22, leaf: 0x32CD32, thorn: 0x8B0000, flower: 0xFF6347, eye: 0xFFFF00 } },
    'planta_carnivora':  { family: 'planta',    scale: 0.90, colors: { stem: 0x006400, leaf: 0x228B22, thorn: 0xFF0000, flower: 0xFF1493, eye: 0xFF4500 } },
    'trepadeira_viva':   { family: 'planta',    scale: 0.95, colors: { stem: 0x2E8B57, leaf: 0x3CB371, thorn: 0x6B4226, flower: 0x9ACD32, eye: 0xADFF2F } },
    'flora_devoradora':  { family: 'planta',    scale: 0.90, colors: { stem: 0x556B2F, leaf: 0x6B8E23, thorn: 0xBDB76B, flower: 0xFFD700, eye: 0xFF8C00 } },

    // --- Faixa 2 (Lv 6-10) ---
    // Lobos
    'lobo_jovem':        { family: 'lobo',      scale: 0.95, colors: { body: 0x808080, belly: 0xC0C0C0, ear: 0x696969, eye: 0xFFD700, nose: 0x1A1A1A, tail: 0x696969 } },
    'lobo_selvagem':     { family: 'lobo',      scale: 1.00, colors: { body: 0x8B6914, belly: 0xCDB38B, ear: 0x6B4226, eye: 0xFF8C00, nose: 0x1A1A1A, tail: 0x6B4226 } },
    'lobo_alfa':         { family: 'lobo',      scale: 1.00, colors: { body: 0x2F4F4F, belly: 0x708090, ear: 0x1A3030, eye: 0x00FF00, nose: 0x111111, tail: 0x1A3030 } },
    'lobo_primordial':   { family: 'lobo',      scale: 1.05, colors: { body: 0x4A3728, belly: 0x8B7355, ear: 0x3E2210, eye: 0xFF0000, nose: 0x111111, tail: 0x3E2210 } },
    // Aranhas
    'aranha_floresta':   { family: 'aranha',    scale: 0.90, colors: { body: 0x556B2F, head: 0x6B8E23, leg: 0x3B4A1F, eye: 0xFF0000, mark: 0xADFF2F } },
    'aranha_venenosa':   { family: 'aranha',    scale: 0.92, colors: { body: 0x800080, head: 0x9932CC, leg: 0x4B0082, eye: 0xFF00FF, mark: 0xFFFF00 } },
    'aranha_tecela':     { family: 'aranha',    scale: 0.95, colors: { body: 0xDAA520, head: 0xFFD700, leg: 0xB8860B, eye: 0x333333, mark: 0xFFFFFF } },
    'viuva_negra':       { family: 'aranha',    scale: 0.93, colors: { body: 0x1A1A1A, head: 0x2F2F2F, leg: 0x111111, eye: 0xFF0000, mark: 0xFF0000 } },
    // Javalis
    'javali':            { family: 'javali',    scale: 1.00, colors: { body: 0x8B6914, belly: 0xCDB38B, tusk: 0xFFFFF0, eye: 0x333333, snout: 0xCD853F, mane: 0x654321 } },
    'javali_furioso':    { family: 'javali',    scale: 1.02, colors: { body: 0x8B0000, belly: 0xCD5C5C, tusk: 0xFFF8DC, eye: 0xFF0000, snout: 0xB22222, mane: 0x5C1A1A } },
    'javali_encouracado':{ family: 'javali',    scale: 1.05, colors: { body: 0x696969, belly: 0xA9A9A9, tusk: 0xFFFFF0, eye: 0xFFD700, snout: 0x808080, mane: 0x4F4F4F } },
    'javali_patriarca':  { family: 'javali',    scale: 1.00, colors: { body: 0x8B4513, belly: 0xDEB887, tusk: 0xFFFFF0, eye: 0x333333, snout: 0xA0522D, mane: 0xD2691E } },
    // Esqueletos
    'esqueleto':         { family: 'esqueleto', scale: 0.95, colors: { bone: 0xFFF8DC, skull: 0xFFFACD, eye: 0x333333, joint: 0xCDB38B, accent: 0xDEB887 } },
    'esqueleto_guerreiro':{ family: 'esqueleto', scale: 1.00, colors: { bone: 0xFFEFD5, skull: 0xFFF8DC, eye: 0xFF4500, joint: 0xD2B48C, accent: 0x808080 } },
    'esqueleto_arcano':  { family: 'esqueleto', scale: 0.95, colors: { bone: 0xE6E6FA, skull: 0xF0F0FF, eye: 0x9370DB, joint: 0xB0A0D0, accent: 0x8A2BE2 } },
    'esqueleto_comandante':{ family: 'esqueleto', scale: 1.00, colors: { bone: 0xFDF5E6, skull: 0xFFF8DC, eye: 0x8B0000, joint: 0xCDB38B, accent: 0x4A4A4A } },
    // Cobras
    'cobra_verde':       { family: 'cobra',     scale: 0.90, colors: { body: 0x228B22, belly: 0x98FB98, head: 0x006400, eye: 0xFFD700, tongue: 0xFF0000, pattern: 0x2E8B57 } },
    'naja':              { family: 'cobra',     scale: 0.95, colors: { body: 0xDAA520, belly: 0xFFF8DC, head: 0xB8860B, eye: 0xFF0000, tongue: 0xFF0000, pattern: 0x8B6914 } },
    'cascavel':          { family: 'cobra',     scale: 0.93, colors: { body: 0xC4A882, belly: 0xFFF8DC, head: 0x8B7355, eye: 0xFFD700, tongue: 0xFF0000, pattern: 0x6B4226 } },
    'serpente_real':     { family: 'cobra',     scale: 0.95, colors: { body: 0xFF0000, belly: 0xFFD700, head: 0xFF4500, eye: 0x000000, tongue: 0xFF0000, pattern: 0x000000 } },
    // Goblins
    'goblin_ladrao':     { family: 'goblin',    scale: 0.90, colors: { skin: 0x6B8E23, cloth: 0x4A3728, ear: 0x556B2F, eye: 0xFFD700, nose: 0x7CA030, hair: 0x333333 } },
    'goblin_guerreiro':  { family: 'goblin',    scale: 0.95, colors: { skin: 0x6B8E23, cloth: 0x808080, ear: 0x556B2F, eye: 0xFF4500, nose: 0x7CA030, hair: 0x696969 } },
    'goblin_xama':       { family: 'goblin',    scale: 0.90, colors: { skin: 0x6B8E23, cloth: 0x800080, ear: 0x556B2F, eye: 0xFF00FF, nose: 0x7CA030, hair: 0xF5F5F5 } },
    'goblin_chefe':      { family: 'goblin',    scale: 0.98, colors: { skin: 0x6B8E23, cloth: 0x8B0000, ear: 0x556B2F, eye: 0xFF0000, nose: 0x7CA030, hair: 0xB22222 } },

    // --- Faixa 3 (Lv 11-15) ---
    // Ursos
    'urso_pardo':        { family: 'urso',      scale: 1.10, colors: { body: 0x8B6914, belly: 0xCDB38B, ear: 0x6B4226, eye: 0x333333, nose: 0x1A1A1A, claw: 0xFFF8DC } },
    'urso_furioso':      { family: 'urso',      scale: 1.12, colors: { body: 0x1A1A1A, belly: 0x3B3B3B, ear: 0x111111, eye: 0xFF0000, nose: 0x333333, claw: 0xCCCCCC } },
    'urso_caverna':      { family: 'urso',      scale: 1.20, colors: { body: 0x6B5B4B, belly: 0x8B7D6B, ear: 0x4A3B2B, eye: 0xFFD700, nose: 0x333333, claw: 0xFFF8DC } },
    'urso_primordial':   { family: 'urso',      scale: 1.15, colors: { body: 0xF0F0F0, belly: 0xFFFFFF, ear: 0xDDDDDD, eye: 0x4682B4, nose: 0x333333, claw: 0xEEEEEE } },
    // Trolls
    'troll_jovem':       { family: 'troll',     scale: 1.10, colors: { skin: 0x6B8E23, belly: 0x8FBC8F, hair: 0x556B2F, eye: 0xFFD700, nose: 0x7CA030, cloth: 0x4A3728 } },
    'troll_pantanoso':   { family: 'troll',     scale: 1.12, colors: { skin: 0x2E8B57, belly: 0x66CDAA, hair: 0x006400, eye: 0xADFF2F, nose: 0x3CB371, cloth: 0x2F4F2F } },
    'troll_guerreiro':   { family: 'troll',     scale: 1.15, colors: { skin: 0x808080, belly: 0xA9A9A9, hair: 0x555555, eye: 0xFF4500, nose: 0x696969, cloth: 0x4F4F4F } },
    'troll_rei':         { family: 'troll',     scale: 1.18, colors: { skin: 0xB22222, belly: 0xCD5C5C, hair: 0x8B0000, eye: 0xFF6600, nose: 0x9B1B1B, cloth: 0xFF4500 } },
    // Golems
    'golem_pedra':       { family: 'golem',     scale: 1.15, colors: { body: 0x808080, crack: 0x555555, eye: 0xFFD700, gem: 0x696969, accent: 0xA9A9A9 } },
    'golem_ferro':       { family: 'golem',     scale: 1.20, colors: { body: 0x708090, crack: 0x4A5568, eye: 0xFF4500, gem: 0xB0C4DE, accent: 0x778899 } },
    'golem_cristal':     { family: 'golem',     scale: 1.12, colors: { body: 0x87CEEB, crack: 0x4682B4, eye: 0x00FFFF, gem: 0xE0FFFF, accent: 0xADD8E6 } },
    'golem_anciao':      { family: 'golem',     scale: 1.18, colors: { body: 0x2F2F2F, crack: 0x4B0082, eye: 0xFF00FF, gem: 0x1A1A1A, accent: 0x9932CC } },
    // Harpias
    'harpia_jovem':      { family: 'harpia',    scale: 1.05, colors: { body: 0xA9A9A9, wing: 0x808080, hair: 0xDEB887, eye: 0xFFD700, claw: 0x333333, beak: 0xDAA520 } },
    'harpia_cacadora':   { family: 'harpia',    scale: 1.08, colors: { body: 0x8B6914, wing: 0x6B4226, hair: 0xCD853F, eye: 0xFF8C00, claw: 0x333333, beak: 0xB8860B } },
    'harpia_matriarca':  { family: 'harpia',    scale: 1.10, colors: { body: 0xB0C4DE, wing: 0x87CEEB, hair: 0xF5F5F5, eye: 0x4682B4, claw: 0x555555, beak: 0x708090 } },
    'harpia_rainha':     { family: 'harpia',    scale: 1.10, colors: { body: 0xCD5C5C, wing: 0xB22222, hair: 0xFF6347, eye: 0xFF0000, claw: 0x444444, beak: 0x8B0000 } },
    // Lagartos
    'lagarto_batedor':   { family: 'lagarto',   scale: 1.05, colors: { skin: 0x6B8E23, belly: 0xBDB76B, eye: 0xFFD700, crest: 0x556B2F, claw: 0x3B4A1F, tail: 0x6B8E23 } },
    'lagarto_guerreiro': { family: 'lagarto',   scale: 1.10, colors: { skin: 0x8B0000, belly: 0xCD5C5C, eye: 0xFF4500, crest: 0xFF0000, claw: 0x5C1A1A, tail: 0x8B0000 } },
    'lagarto_xama':      { family: 'lagarto',   scale: 1.05, colors: { skin: 0x2E8B57, belly: 0x66CDAA, eye: 0x00FF00, crest: 0x9932CC, claw: 0x1A5035, tail: 0x2E8B57 } },
    'lagarto_rei':       { family: 'lagarto',   scale: 1.15, colors: { skin: 0x4A4A4A, belly: 0x808080, eye: 0xFF0000, crest: 0xDAA520, claw: 0x333333, tail: 0x4A4A4A } },
    // Ogros
    'ogro':              { family: 'ogro',      scale: 1.15, colors: { skin: 0xCD853F, belly: 0xDEB887, cloth: 0x4A3728, eye: 0xFFD700, hair: 0x333333, tusk: 0xFFF8DC } },
    'ogro_guerreiro':    { family: 'ogro',      scale: 1.20, colors: { skin: 0xCD853F, belly: 0xDEB887, cloth: 0x808080, eye: 0xFF4500, hair: 0x555555, tusk: 0xFFF8DC } },
    'ogro_matador':      { family: 'ogro',      scale: 1.18, colors: { skin: 0xB8860B, belly: 0xDAA520, cloth: 0x8B0000, eye: 0xFF0000, hair: 0x1A1A1A, tusk: 0xFFFACD } },
    'ogro_chefe':        { family: 'ogro',      scale: 1.15, colors: { skin: 0xCD853F, belly: 0xDEB887, cloth: 0x556B2F, eye: 0x333333, hair: 0x8B4513, tusk: 0xFFF8DC } },
    // Espantalho
    'espantalho':        { family: 'espantalho', scale: 1.00, colors: { wood: 0x8B6914, cloth: 0xA0522D, hat: 0x4A3728, eye: 0xFF8C00, straw: 0xDAA520, patch: 0x556B2F } }
};

// ===== HELPERS =====
function _monsterShadow(g, cx, baseY, rx, ry) {
    g.ellipse(cx, baseY + 2, rx || 14, ry || 5);
    g.fill({ color: 0x000000, alpha: 0.35 });
}

function _outline(g, shape, params, lineW) {
    if (shape === 'ellipse') { g.ellipse(params[0], params[1], params[2], params[3]); }
    else if (shape === 'circle') { g.circle(params[0], params[1], params[2]); }
    else if (shape === 'poly') { g.poly(params); }
    else if (shape === 'roundRect') { g.roundRect(params[0], params[1], params[2], params[3], params[4]); }
    g.stroke({ width: lineW || 1.5, color: 0x000000 });
}

// ===== BATCH 1 - FAIXA 1 =====

// --- RATOS ---
function drawRato(g, c) {
    var cx = 24, baseY = 55;
    _monsterShadow(g, cx, baseY, 12, 4);
    // Cauda (curva atrás)
    g.moveTo(cx + 8, baseY - 10);
    g.quadraticCurveTo(cx + 20, baseY - 25, cx + 16, baseY - 5);
    g.stroke({ width: 2, color: c.tail });
    // Corpo oval
    g.ellipse(cx, baseY - 12, 11, 9);
    g.fill(c.body);
    _outline(g, 'ellipse', [cx, baseY - 12, 11, 9]);
    // Barriga
    g.ellipse(cx, baseY - 9, 7, 5);
    g.fill(c.belly);
    // Cabeça
    g.ellipse(cx - 8, baseY - 18, 7, 6);
    g.fill(c.body);
    _outline(g, 'ellipse', [cx - 8, baseY - 18, 7, 6]);
    // Focinho
    g.ellipse(cx - 14, baseY - 18, 3, 2);
    g.fill(c.belly);
    // Orelhas
    g.circle(cx - 5, baseY - 26, 4);
    g.fill(c.ear);
    _outline(g, 'circle', [cx - 5, baseY - 26, 4]);
    g.circle(cx - 11, baseY - 24, 3.5);
    g.fill(c.ear);
    _outline(g, 'circle', [cx - 11, baseY - 24, 3.5]);
    // Olho
    g.circle(cx - 10, baseY - 19, 1.5);
    g.fill(c.eye);
    // Patas (dianteiras)
    g.ellipse(cx - 5, baseY - 3, 3, 2);
    g.fill(c.body);
    g.ellipse(cx + 5, baseY - 3, 3, 2);
    g.fill(c.body);
}

// --- BARATAS ---
function drawBarata(g, c) {
    var cx = 24, baseY = 55;
    _monsterShadow(g, cx, baseY, 13, 4);
    // Antenas
    g.moveTo(cx - 4, baseY - 22);
    g.quadraticCurveTo(cx - 12, baseY - 35, cx - 16, baseY - 30);
    g.stroke({ width: 1.5, color: c.antenna });
    g.moveTo(cx + 4, baseY - 22);
    g.quadraticCurveTo(cx + 12, baseY - 35, cx + 16, baseY - 30);
    g.stroke({ width: 1.5, color: c.antenna });
    // Corpo/carapaça (oval achatado)
    g.ellipse(cx, baseY - 12, 13, 8);
    g.fill(c.shell);
    _outline(g, 'ellipse', [cx, baseY - 12, 13, 8]);
    // Linha central da carapaça
    g.moveTo(cx, baseY - 20);
    g.lineTo(cx, baseY - 4);
    g.stroke({ width: 1, color: 0x000000, alpha: 0.3 });
    // Cabeça
    g.ellipse(cx, baseY - 22, 6, 5);
    g.fill(c.body);
    _outline(g, 'ellipse', [cx, baseY - 22, 6, 5]);
    // Olhos
    g.circle(cx - 3, baseY - 23, 1.2);
    g.fill(c.eye);
    g.circle(cx + 3, baseY - 23, 1.2);
    g.fill(c.eye);
    // Patas (3 pares)
    var legY = [baseY - 16, baseY - 12, baseY - 8];
    for (var i = 0; i < 3; i++) {
        g.moveTo(cx - 13, legY[i]);
        g.lineTo(cx - 20, legY[i] + 4);
        g.stroke({ width: 1.5, color: c.leg });
        g.moveTo(cx + 13, legY[i]);
        g.lineTo(cx + 20, legY[i] + 4);
        g.stroke({ width: 1.5, color: c.leg });
    }
}

// --- COGUMELOS ---
function drawCogumelo(g, c) {
    var cx = 24, baseY = 55;
    _monsterShadow(g, cx, baseY, 10, 4);
    // Tronco/caule
    g.roundRect(cx - 5, baseY - 20, 10, 20, 3);
    g.fill(c.stem);
    _outline(g, 'roundRect', [cx - 5, baseY - 20, 10, 20, 3]);
    // Chapéu (semicírculo grande)
    g.ellipse(cx, baseY - 22, 16, 12);
    g.fill(c.cap);
    _outline(g, 'ellipse', [cx, baseY - 22, 16, 12]);
    // Borda inferior do chapéu (reta)
    g.rect(cx - 16, baseY - 22, 32, 6);
    g.fill(c.stem);
    g.moveTo(cx - 16, baseY - 22);
    g.lineTo(cx + 16, baseY - 22);
    g.stroke({ width: 1.5, color: 0x000000 });
    // Pintas no chapéu
    g.circle(cx - 6, baseY - 30, 2.5);
    g.fill(c.spots);
    g.circle(cx + 5, baseY - 28, 2);
    g.fill(c.spots);
    g.circle(cx - 1, baseY - 33, 1.8);
    g.fill(c.spots);
    // Olhos no tronco
    g.circle(cx - 3, baseY - 14, 1.5);
    g.fill(c.eye);
    g.circle(cx + 3, baseY - 14, 1.5);
    g.fill(c.eye);
    // Pés
    g.ellipse(cx - 4, baseY, 4, 2);
    g.fill(c.stem);
    g.ellipse(cx + 4, baseY, 4, 2);
    g.fill(c.stem);
}

// --- SAPOS ---
function drawSapo(g, c) {
    var cx = 24, baseY = 55;
    _monsterShadow(g, cx, baseY, 14, 5);
    // Patas traseiras
    g.ellipse(cx - 12, baseY - 2, 5, 3);
    g.fill(c.body);
    _outline(g, 'ellipse', [cx - 12, baseY - 2, 5, 3]);
    g.ellipse(cx + 12, baseY - 2, 5, 3);
    g.fill(c.body);
    _outline(g, 'ellipse', [cx + 12, baseY - 2, 5, 3]);
    // Corpo (largo e achatado)
    g.ellipse(cx, baseY - 10, 14, 10);
    g.fill(c.body);
    _outline(g, 'ellipse', [cx, baseY - 10, 14, 10]);
    // Barriga
    g.ellipse(cx, baseY - 7, 9, 6);
    g.fill(c.belly);
    // Manchas
    g.circle(cx - 6, baseY - 14, 2);
    g.fill(c.spot);
    g.circle(cx + 4, baseY - 12, 1.5);
    g.fill(c.spot);
    // Olhos (protuberantes, acima do corpo)
    g.circle(cx - 6, baseY - 21, 4);
    g.fill(c.body);
    _outline(g, 'circle', [cx - 6, baseY - 21, 4]);
    g.circle(cx + 6, baseY - 21, 4);
    g.fill(c.body);
    _outline(g, 'circle', [cx + 6, baseY - 21, 4]);
    // Pupilas
    g.circle(cx - 6, baseY - 21, 2.5);
    g.fill(c.eye);
    g.circle(cx - 6, baseY - 21, 1.2);
    g.fill(c.pupil);
    g.circle(cx + 6, baseY - 21, 2.5);
    g.fill(c.eye);
    g.circle(cx + 6, baseY - 21, 1.2);
    g.fill(c.pupil);
    // Boca
    g.moveTo(cx - 6, baseY - 5);
    g.quadraticCurveTo(cx, baseY - 3, cx + 6, baseY - 5);
    g.stroke({ width: 1, color: 0x000000, alpha: 0.5 });
    // Patas dianteiras
    g.ellipse(cx - 8, baseY - 1, 3, 2);
    g.fill(c.body);
    g.ellipse(cx + 8, baseY - 1, 3, 2);
    g.fill(c.body);
}

// --- MORCEGOS ---
function drawMorcego(g, c) {
    var cx = 24, baseY = 55;
    _monsterShadow(g, cx, baseY, 10, 3);
    // Asa esquerda (triângulo)
    g.poly([cx - 5, baseY - 18, cx - 22, baseY - 28, cx - 20, baseY - 10, cx - 12, baseY - 14, cx - 5, baseY - 10]);
    g.fill(c.wing);
    _outline(g, 'poly', [cx - 5, baseY - 18, cx - 22, baseY - 28, cx - 20, baseY - 10, cx - 12, baseY - 14, cx - 5, baseY - 10]);
    // Asa direita (triângulo)
    g.poly([cx + 5, baseY - 18, cx + 22, baseY - 28, cx + 20, baseY - 10, cx + 12, baseY - 14, cx + 5, baseY - 10]);
    g.fill(c.wing);
    _outline(g, 'poly', [cx + 5, baseY - 18, cx + 22, baseY - 28, cx + 20, baseY - 10, cx + 12, baseY - 14, cx + 5, baseY - 10]);
    // Corpo (oval central)
    g.ellipse(cx, baseY - 14, 6, 9);
    g.fill(c.body);
    _outline(g, 'ellipse', [cx, baseY - 14, 6, 9]);
    // Barriga
    g.ellipse(cx, baseY - 10, 4, 5);
    g.fill(c.belly);
    // Cabeça
    g.circle(cx, baseY - 24, 5);
    g.fill(c.body);
    _outline(g, 'circle', [cx, baseY - 24, 5]);
    // Orelhas pontudas
    g.poly([cx - 4, baseY - 28, cx - 6, baseY - 36, cx - 1, baseY - 28]);
    g.fill(c.ear);
    _outline(g, 'poly', [cx - 4, baseY - 28, cx - 6, baseY - 36, cx - 1, baseY - 28]);
    g.poly([cx + 4, baseY - 28, cx + 6, baseY - 36, cx + 1, baseY - 28]);
    g.fill(c.ear);
    _outline(g, 'poly', [cx + 4, baseY - 28, cx + 6, baseY - 36, cx + 1, baseY - 28]);
    // Olhos
    g.circle(cx - 2, baseY - 25, 1.5);
    g.fill(c.eye);
    g.circle(cx + 2, baseY - 25, 1.5);
    g.fill(c.eye);
    // Pés
    g.ellipse(cx - 3, baseY - 4, 2, 1.5);
    g.fill(c.body);
    g.ellipse(cx + 3, baseY - 4, 2, 1.5);
    g.fill(c.body);
}

// --- PLANTAS ---
function drawPlanta(g, c) {
    var cx = 24, baseY = 55;
    _monsterShadow(g, cx, baseY, 10, 4);
    // Caule principal
    g.roundRect(cx - 3, baseY - 30, 6, 30, 2);
    g.fill(c.stem);
    _outline(g, 'roundRect', [cx - 3, baseY - 30, 6, 30, 2]);
    // Folha esquerda
    g.ellipse(cx - 10, baseY - 18, 7, 4);
    g.fill(c.leaf);
    _outline(g, 'ellipse', [cx - 10, baseY - 18, 7, 4]);
    // Folha direita
    g.ellipse(cx + 10, baseY - 14, 7, 4);
    g.fill(c.leaf);
    _outline(g, 'ellipse', [cx + 10, baseY - 14, 7, 4]);
    // Flor/cabeça (no topo)
    g.circle(cx, baseY - 34, 8);
    g.fill(c.flower);
    _outline(g, 'circle', [cx, baseY - 34, 8]);
    // Centro da flor
    g.circle(cx, baseY - 34, 4);
    g.fill(c.stem);
    // Olhos
    g.circle(cx - 2, baseY - 35, 1.5);
    g.fill(c.eye);
    g.circle(cx + 2, baseY - 35, 1.5);
    g.fill(c.eye);
    // Espinhos no caule
    g.poly([cx - 3, baseY - 22, cx - 7, baseY - 24, cx - 3, baseY - 26]);
    g.fill(c.thorn);
    g.poly([cx + 3, baseY - 10, cx + 7, baseY - 12, cx + 3, baseY - 14]);
    g.fill(c.thorn);
    // Base (raízes)
    g.ellipse(cx, baseY, 8, 3);
    g.fill(c.stem);
}

// ===== BATCH 2 - FAIXA 2 =====

// --- LOBOS ---
function drawLobo(g, c) {
    var cx = 24, baseY = 55;
    _monsterShadow(g, cx, baseY, 15, 5);
    // Cauda
    g.moveTo(cx + 12, baseY - 16);
    g.quadraticCurveTo(cx + 22, baseY - 30, cx + 18, baseY - 24);
    g.stroke({ width: 3, color: c.tail });
    // Patas traseiras
    g.roundRect(cx + 6, baseY - 6, 4, 8, 1);
    g.fill(c.body);
    g.roundRect(cx + 11, baseY - 6, 4, 8, 1);
    g.fill(c.body);
    // Patas dianteiras
    g.roundRect(cx - 12, baseY - 6, 4, 8, 1);
    g.fill(c.body);
    g.roundRect(cx - 7, baseY - 6, 4, 8, 1);
    g.fill(c.body);
    // Corpo (oval alongado horizontal)
    g.ellipse(cx, baseY - 14, 15, 9);
    g.fill(c.body);
    _outline(g, 'ellipse', [cx, baseY - 14, 15, 9]);
    // Barriga
    g.ellipse(cx, baseY - 10, 10, 5);
    g.fill(c.belly);
    // Cabeça
    g.ellipse(cx - 14, baseY - 20, 7, 6);
    g.fill(c.body);
    _outline(g, 'ellipse', [cx - 14, baseY - 20, 7, 6]);
    // Focinho
    g.ellipse(cx - 20, baseY - 19, 4, 3);
    g.fill(c.belly);
    _outline(g, 'ellipse', [cx - 20, baseY - 19, 4, 3]);
    // Nariz
    g.circle(cx - 23, baseY - 19, 1.5);
    g.fill(c.nose);
    // Orelhas pontudas
    g.poly([cx - 16, baseY - 25, cx - 18, baseY - 34, cx - 12, baseY - 26]);
    g.fill(c.ear);
    _outline(g, 'poly', [cx - 16, baseY - 25, cx - 18, baseY - 34, cx - 12, baseY - 26]);
    g.poly([cx - 10, baseY - 24, cx - 12, baseY - 33, cx - 7, baseY - 25]);
    g.fill(c.ear);
    _outline(g, 'poly', [cx - 10, baseY - 24, cx - 12, baseY - 33, cx - 7, baseY - 25]);
    // Olho
    g.circle(cx - 14, baseY - 21, 1.8);
    g.fill(c.eye);
}

// --- ARANHAS ---
function drawAranha(g, c) {
    var cx = 24, baseY = 55;
    _monsterShadow(g, cx, baseY, 16, 5);
    // Patas (4 pares, radiando do corpo)
    var legAngles = [-0.8, -0.4, 0.2, 0.6];
    for (var i = 0; i < legAngles.length; i++) {
        var ax = Math.cos(legAngles[i]) * 8;
        var ay = Math.sin(legAngles[i]) * 4;
        // Pata esquerda
        g.moveTo(cx - 6, baseY - 14 + ay);
        g.quadraticCurveTo(cx - 16, baseY - 24 + ay * 2, cx - 20 - i * 2, baseY - 6 + i * 2);
        g.stroke({ width: 1.5, color: c.leg });
        // Pata direita
        g.moveTo(cx + 6, baseY - 14 + ay);
        g.quadraticCurveTo(cx + 16, baseY - 24 + ay * 2, cx + 20 + i * 2, baseY - 6 + i * 2);
        g.stroke({ width: 1.5, color: c.leg });
    }
    // Abdômen (grande, atrás)
    g.ellipse(cx, baseY - 10, 10, 7);
    g.fill(c.body);
    _outline(g, 'ellipse', [cx, baseY - 10, 10, 7]);
    // Marca no abdômen
    g.circle(cx, baseY - 10, 3);
    g.fill(c.mark);
    // Cefalotórax (cabeça, menor, na frente)
    g.circle(cx, baseY - 22, 6);
    g.fill(c.head);
    _outline(g, 'circle', [cx, baseY - 22, 6]);
    // Olhos (múltiplos - aranha tem 8, mostramos 4 frontais)
    g.circle(cx - 3, baseY - 24, 1.2);
    g.fill(c.eye);
    g.circle(cx + 3, baseY - 24, 1.2);
    g.fill(c.eye);
    g.circle(cx - 1.5, baseY - 22, 1);
    g.fill(c.eye);
    g.circle(cx + 1.5, baseY - 22, 1);
    g.fill(c.eye);
    // Quelíceras
    g.moveTo(cx - 2, baseY - 16);
    g.lineTo(cx - 3, baseY - 13);
    g.stroke({ width: 1.5, color: c.leg });
    g.moveTo(cx + 2, baseY - 16);
    g.lineTo(cx + 3, baseY - 13);
    g.stroke({ width: 1.5, color: c.leg });
}

// --- JAVALIS ---
function drawJavali(g, c) {
    var cx = 24, baseY = 55;
    _monsterShadow(g, cx, baseY, 16, 5);
    // Patas
    g.roundRect(cx - 10, baseY - 5, 4, 7, 1);
    g.fill(c.body);
    g.roundRect(cx - 5, baseY - 5, 4, 7, 1);
    g.fill(c.body);
    g.roundRect(cx + 5, baseY - 5, 4, 7, 1);
    g.fill(c.body);
    g.roundRect(cx + 10, baseY - 5, 4, 7, 1);
    g.fill(c.body);
    // Corpo (robusto)
    g.ellipse(cx, baseY - 14, 16, 10);
    g.fill(c.body);
    _outline(g, 'ellipse', [cx, baseY - 14, 16, 10]);
    // Barriga
    g.ellipse(cx + 2, baseY - 10, 10, 5);
    g.fill(c.belly);
    // Crina/pelo nas costas
    g.poly([cx - 8, baseY - 24, cx - 4, baseY - 27, cx, baseY - 24, cx + 4, baseY - 26, cx + 8, baseY - 23]);
    g.fill(c.mane);
    // Cabeça
    g.ellipse(cx - 14, baseY - 16, 8, 7);
    g.fill(c.body);
    _outline(g, 'ellipse', [cx - 14, baseY - 16, 8, 7]);
    // Focinho (largo)
    g.ellipse(cx - 21, baseY - 15, 4, 3);
    g.fill(c.snout);
    _outline(g, 'ellipse', [cx - 21, baseY - 15, 4, 3]);
    // Narinas
    g.circle(cx - 22, baseY - 15, 0.8);
    g.fill(0x000000);
    g.circle(cx - 20, baseY - 15, 0.8);
    g.fill(0x000000);
    // Presas
    g.poly([cx - 18, baseY - 18, cx - 17, baseY - 23, cx - 16, baseY - 18]);
    g.fill(c.tusk);
    _outline(g, 'poly', [cx - 18, baseY - 18, cx - 17, baseY - 23, cx - 16, baseY - 18]);
    // Olho
    g.circle(cx - 13, baseY - 18, 1.5);
    g.fill(c.eye);
}

// --- ESQUELETOS ---
function drawEsqueleto(g, c) {
    var cx = 24, baseY = 55;
    _monsterShadow(g, cx, baseY, 10, 4);
    // Pés
    g.ellipse(cx - 5, baseY, 4, 2);
    g.fill(c.bone);
    g.ellipse(cx + 5, baseY, 4, 2);
    g.fill(c.bone);
    // Tíbias (pernas)
    g.roundRect(cx - 6, baseY - 16, 3, 16, 1);
    g.fill(c.bone);
    _outline(g, 'roundRect', [cx - 6, baseY - 16, 3, 16, 1]);
    g.roundRect(cx + 3, baseY - 16, 3, 16, 1);
    g.fill(c.bone);
    _outline(g, 'roundRect', [cx + 3, baseY - 16, 3, 16, 1]);
    // Pelve
    g.ellipse(cx, baseY - 16, 7, 3);
    g.fill(c.joint);
    // Costelas (tronco)
    g.roundRect(cx - 6, baseY - 32, 12, 16, 2);
    g.fill(c.bone);
    _outline(g, 'roundRect', [cx - 6, baseY - 32, 12, 16, 2]);
    // Linhas das costelas
    for (var i = 0; i < 4; i++) {
        var ry = baseY - 30 + i * 4;
        g.moveTo(cx - 5, ry);
        g.lineTo(cx + 5, ry);
        g.stroke({ width: 1, color: c.joint });
    }
    // Braços (linhas)
    g.moveTo(cx - 6, baseY - 30);
    g.lineTo(cx - 14, baseY - 22);
    g.lineTo(cx - 12, baseY - 16);
    g.stroke({ width: 2, color: c.bone });
    g.moveTo(cx + 6, baseY - 30);
    g.lineTo(cx + 14, baseY - 22);
    g.lineTo(cx + 12, baseY - 16);
    g.stroke({ width: 2, color: c.bone });
    // Crânio
    g.circle(cx, baseY - 38, 7);
    g.fill(c.skull);
    _outline(g, 'circle', [cx, baseY - 38, 7]);
    // Olhos (cavidades)
    g.circle(cx - 3, baseY - 39, 2);
    g.fill(c.eye);
    g.circle(cx + 3, baseY - 39, 2);
    g.fill(c.eye);
    // Nariz (triângulo invertido)
    g.poly([cx - 1, baseY - 36, cx + 1, baseY - 36, cx, baseY - 34]);
    g.fill(c.joint);
    // Mandíbula
    g.moveTo(cx - 4, baseY - 32);
    g.lineTo(cx + 4, baseY - 32);
    g.stroke({ width: 1, color: c.joint });
    // Acento de cor (tipo armadura leve ou brilho mágico)
    g.circle(cx, baseY - 26, 2);
    g.fill({ color: c.accent, alpha: 0.6 });
}

// --- COBRAS ---
function drawCobra(g, c) {
    var cx = 24, baseY = 55;
    _monsterShadow(g, cx, baseY, 14, 4);
    // Corpo serpentino (curva S)
    // Segmento inferior
    g.moveTo(cx + 10, baseY - 3);
    g.quadraticCurveTo(cx + 16, baseY - 12, cx + 6, baseY - 16);
    g.quadraticCurveTo(cx - 6, baseY - 20, cx - 8, baseY - 28);
    g.quadraticCurveTo(cx - 6, baseY - 34, cx, baseY - 32);
    g.stroke({ width: 6, color: c.body });
    // Outline do corpo
    g.moveTo(cx + 10, baseY - 3);
    g.quadraticCurveTo(cx + 16, baseY - 12, cx + 6, baseY - 16);
    g.quadraticCurveTo(cx - 6, baseY - 20, cx - 8, baseY - 28);
    g.quadraticCurveTo(cx - 6, baseY - 34, cx, baseY - 32);
    g.stroke({ width: 8, color: 0x000000 });
    g.moveTo(cx + 10, baseY - 3);
    g.quadraticCurveTo(cx + 16, baseY - 12, cx + 6, baseY - 16);
    g.quadraticCurveTo(cx - 6, baseY - 20, cx - 8, baseY - 28);
    g.quadraticCurveTo(cx - 6, baseY - 34, cx, baseY - 32);
    g.stroke({ width: 6, color: c.body });
    // Barriga (linha central mais clara)
    g.moveTo(cx + 10, baseY - 3);
    g.quadraticCurveTo(cx + 16, baseY - 12, cx + 6, baseY - 16);
    g.quadraticCurveTo(cx - 6, baseY - 20, cx - 8, baseY - 28);
    g.stroke({ width: 2, color: c.belly });
    // Padrão no corpo
    g.circle(cx + 8, baseY - 8, 1.5);
    g.fill(c.pattern);
    g.circle(cx + 2, baseY - 16, 1.5);
    g.fill(c.pattern);
    g.circle(cx - 6, baseY - 24, 1.5);
    g.fill(c.pattern);
    // Cabeça (triangular)
    g.poly([cx - 5, baseY - 30, cx + 5, baseY - 30, cx, baseY - 38]);
    g.fill(c.head);
    _outline(g, 'poly', [cx - 5, baseY - 30, cx + 5, baseY - 30, cx, baseY - 38]);
    // Olhos
    g.circle(cx - 2, baseY - 34, 1.2);
    g.fill(c.eye);
    g.circle(cx + 2, baseY - 34, 1.2);
    g.fill(c.eye);
    // Língua bífida
    g.moveTo(cx, baseY - 30);
    g.lineTo(cx, baseY - 27);
    g.lineTo(cx - 2, baseY - 25);
    g.stroke({ width: 1, color: c.tongue });
    g.moveTo(cx, baseY - 27);
    g.lineTo(cx + 2, baseY - 25);
    g.stroke({ width: 1, color: c.tongue });
    // Ponta da cauda (enrolada)
    g.circle(cx + 12, baseY - 3, 2);
    g.fill(c.body);
}

// --- GOBLINS ---
function drawGoblin(g, c) {
    var cx = 24, baseY = 55;
    _monsterShadow(g, cx, baseY, 10, 4);
    // Pés
    g.ellipse(cx - 5, baseY, 4, 2);
    g.fill(c.skin);
    g.ellipse(cx + 5, baseY, 4, 2);
    g.fill(c.skin);
    // Pernas
    g.roundRect(cx - 6, baseY - 14, 3, 14, 1);
    g.fill(c.skin);
    g.roundRect(cx + 3, baseY - 14, 3, 14, 1);
    g.fill(c.skin);
    // Corpo (tronco com roupa)
    g.roundRect(cx - 8, baseY - 28, 16, 16, 3);
    g.fill(c.cloth);
    _outline(g, 'roundRect', [cx - 8, baseY - 28, 16, 16, 3]);
    // Barriga visível
    g.ellipse(cx, baseY - 18, 5, 4);
    g.fill(c.skin);
    // Braços
    g.moveTo(cx - 8, baseY - 26);
    g.lineTo(cx - 14, baseY - 18);
    g.stroke({ width: 3, color: c.skin });
    g.moveTo(cx + 8, baseY - 26);
    g.lineTo(cx + 14, baseY - 18);
    g.stroke({ width: 3, color: c.skin });
    // Mãos
    g.circle(cx - 14, baseY - 17, 2);
    g.fill(c.skin);
    g.circle(cx + 14, baseY - 17, 2);
    g.fill(c.skin);
    // Cabeça (grande para o corpo)
    g.circle(cx, baseY - 35, 8);
    g.fill(c.skin);
    _outline(g, 'circle', [cx, baseY - 35, 8]);
    // Orelhas pontudas (grandes)
    g.poly([cx - 7, baseY - 36, cx - 18, baseY - 38, cx - 8, baseY - 32]);
    g.fill(c.ear);
    _outline(g, 'poly', [cx - 7, baseY - 36, cx - 18, baseY - 38, cx - 8, baseY - 32]);
    g.poly([cx + 7, baseY - 36, cx + 18, baseY - 38, cx + 8, baseY - 32]);
    g.fill(c.ear);
    _outline(g, 'poly', [cx + 7, baseY - 36, cx + 18, baseY - 38, cx + 8, baseY - 32]);
    // Nariz grande
    g.ellipse(cx, baseY - 33, 3, 2);
    g.fill(c.nose);
    // Olhos
    g.circle(cx - 3, baseY - 37, 2);
    g.fill(0xFFFFFF);
    g.circle(cx - 3, baseY - 37, 1);
    g.fill(c.eye);
    g.circle(cx + 3, baseY - 37, 2);
    g.fill(0xFFFFFF);
    g.circle(cx + 3, baseY - 37, 1);
    g.fill(c.eye);
    // Boca (sorriso malicioso)
    g.moveTo(cx - 4, baseY - 30);
    g.quadraticCurveTo(cx, baseY - 28, cx + 4, baseY - 30);
    g.stroke({ width: 1, color: 0x000000 });
}

// ===== BATCH 3 - FAIXA 3 =====

// --- URSOS ---
function drawUrso(g, c) {
    var cx = 24, baseY = 55;
    _monsterShadow(g, cx, baseY, 18, 6);
    // Patas traseiras
    g.roundRect(cx + 4, baseY - 6, 5, 8, 2);
    g.fill(c.body);
    g.roundRect(cx + 10, baseY - 6, 5, 8, 2);
    g.fill(c.body);
    // Patas dianteiras
    g.roundRect(cx - 14, baseY - 6, 5, 8, 2);
    g.fill(c.body);
    g.roundRect(cx - 8, baseY - 6, 5, 8, 2);
    g.fill(c.body);
    // Garras
    g.circle(cx - 14, baseY + 2, 1);
    g.fill(c.claw);
    g.circle(cx + 14, baseY + 2, 1);
    g.fill(c.claw);
    // Corpo massivo
    g.ellipse(cx, baseY - 16, 18, 12);
    g.fill(c.body);
    _outline(g, 'ellipse', [cx, baseY - 16, 18, 12]);
    // Barriga
    g.ellipse(cx, baseY - 12, 11, 7);
    g.fill(c.belly);
    // Cabeça
    g.circle(cx - 14, baseY - 26, 8);
    g.fill(c.body);
    _outline(g, 'circle', [cx - 14, baseY - 26, 8]);
    // Focinho
    g.ellipse(cx - 20, baseY - 24, 4, 3);
    g.fill(c.belly);
    _outline(g, 'ellipse', [cx - 20, baseY - 24, 4, 3]);
    // Nariz
    g.ellipse(cx - 22, baseY - 25, 2, 1.5);
    g.fill(c.nose);
    // Orelhas redondas
    g.circle(cx - 18, baseY - 33, 3.5);
    g.fill(c.ear);
    _outline(g, 'circle', [cx - 18, baseY - 33, 3.5]);
    g.circle(cx - 10, baseY - 32, 3.5);
    g.fill(c.ear);
    _outline(g, 'circle', [cx - 10, baseY - 32, 3.5]);
    // Olhos
    g.circle(cx - 15, baseY - 27, 1.5);
    g.fill(c.eye);
}

// --- TROLLS ---
function drawTroll(g, c) {
    var cx = 24, baseY = 55;
    _monsterShadow(g, cx, baseY, 14, 5);
    // Pés grandes
    g.ellipse(cx - 6, baseY, 5, 3);
    g.fill(c.skin);
    g.ellipse(cx + 6, baseY, 5, 3);
    g.fill(c.skin);
    // Pernas grossas
    g.roundRect(cx - 8, baseY - 16, 5, 16, 2);
    g.fill(c.skin);
    g.roundRect(cx + 3, baseY - 16, 5, 16, 2);
    g.fill(c.skin);
    // Tanga/roupa
    g.poly([cx - 10, baseY - 16, cx + 10, baseY - 16, cx + 8, baseY - 10, cx - 8, baseY - 10]);
    g.fill(c.cloth);
    // Corpo largo
    g.roundRect(cx - 12, baseY - 34, 24, 20, 4);
    g.fill(c.skin);
    _outline(g, 'roundRect', [cx - 12, baseY - 34, 24, 20, 4]);
    // Barriga
    g.ellipse(cx, baseY - 22, 8, 6);
    g.fill(c.belly);
    // Braços longos
    g.moveTo(cx - 12, baseY - 30);
    g.lineTo(cx - 20, baseY - 18);
    g.lineTo(cx - 18, baseY - 8);
    g.stroke({ width: 4, color: c.skin });
    g.moveTo(cx + 12, baseY - 30);
    g.lineTo(cx + 20, baseY - 18);
    g.lineTo(cx + 18, baseY - 8);
    g.stroke({ width: 4, color: c.skin });
    // Mãos grandes
    g.circle(cx - 18, baseY - 7, 3);
    g.fill(c.skin);
    g.circle(cx + 18, baseY - 7, 3);
    g.fill(c.skin);
    // Cabeça pequena (relativa ao corpo)
    g.circle(cx, baseY - 40, 6);
    g.fill(c.skin);
    _outline(g, 'circle', [cx, baseY - 40, 6]);
    // Cabelo/musgo
    g.poly([cx - 5, baseY - 45, cx - 3, baseY - 50, cx, baseY - 46, cx + 3, baseY - 50, cx + 5, baseY - 45]);
    g.fill(c.hair);
    // Nariz grande
    g.ellipse(cx, baseY - 39, 3, 2);
    g.fill(c.nose);
    // Olhos
    g.circle(cx - 3, baseY - 41, 1.5);
    g.fill(c.eye);
    g.circle(cx + 3, baseY - 41, 1.5);
    g.fill(c.eye);
    // Boca com presas
    g.moveTo(cx - 3, baseY - 36);
    g.lineTo(cx + 3, baseY - 36);
    g.stroke({ width: 1.5, color: 0x000000 });
    g.poly([cx - 2, baseY - 36, cx - 1, baseY - 34, cx, baseY - 36]);
    g.fill(0xFFFFF0);
    g.poly([cx + 2, baseY - 36, cx + 1, baseY - 34, cx, baseY - 36]);
    g.fill(0xFFFFF0);
}

// --- GOLEMS ---
function drawGolem(g, c) {
    var cx = 24, baseY = 55;
    _monsterShadow(g, cx, baseY, 16, 6);
    // Pés (blocos)
    g.roundRect(cx - 10, baseY - 5, 8, 7, 1);
    g.fill(c.body);
    _outline(g, 'roundRect', [cx - 10, baseY - 5, 8, 7, 1]);
    g.roundRect(cx + 2, baseY - 5, 8, 7, 1);
    g.fill(c.body);
    _outline(g, 'roundRect', [cx + 2, baseY - 5, 8, 7, 1]);
    // Pernas (blocos)
    g.roundRect(cx - 8, baseY - 16, 6, 12, 1);
    g.fill(c.body);
    g.roundRect(cx + 2, baseY - 16, 6, 12, 1);
    g.fill(c.body);
    // Tronco (bloco grande)
    g.roundRect(cx - 12, baseY - 36, 24, 22, 3);
    g.fill(c.body);
    _outline(g, 'roundRect', [cx - 12, baseY - 36, 24, 22, 3]);
    // Rachaduras
    g.moveTo(cx - 5, baseY - 34);
    g.lineTo(cx - 8, baseY - 26);
    g.lineTo(cx - 4, baseY - 20);
    g.stroke({ width: 1.5, color: c.crack });
    g.moveTo(cx + 6, baseY - 30);
    g.lineTo(cx + 3, baseY - 22);
    g.stroke({ width: 1, color: c.crack });
    // Gema central
    g.poly([cx, baseY - 30, cx - 3, baseY - 26, cx, baseY - 22, cx + 3, baseY - 26]);
    g.fill(c.gem);
    _outline(g, 'poly', [cx, baseY - 30, cx - 3, baseY - 26, cx, baseY - 22, cx + 3, baseY - 26], 1);
    // Ombros (blocos)
    g.roundRect(cx - 18, baseY - 36, 8, 8, 2);
    g.fill(c.accent);
    _outline(g, 'roundRect', [cx - 18, baseY - 36, 8, 8, 2]);
    g.roundRect(cx + 10, baseY - 36, 8, 8, 2);
    g.fill(c.accent);
    _outline(g, 'roundRect', [cx + 10, baseY - 36, 8, 8, 2]);
    // Braços
    g.roundRect(cx - 17, baseY - 28, 5, 16, 2);
    g.fill(c.body);
    _outline(g, 'roundRect', [cx - 17, baseY - 28, 5, 16, 2]);
    g.roundRect(cx + 12, baseY - 28, 5, 16, 2);
    g.fill(c.body);
    _outline(g, 'roundRect', [cx + 12, baseY - 28, 5, 16, 2]);
    // Cabeça (bloco)
    g.roundRect(cx - 7, baseY - 46, 14, 12, 2);
    g.fill(c.body);
    _outline(g, 'roundRect', [cx - 7, baseY - 46, 14, 12, 2]);
    // Olhos (brilhantes)
    g.circle(cx - 3, baseY - 41, 2);
    g.fill(c.eye);
    g.circle(cx + 3, baseY - 41, 2);
    g.fill(c.eye);
}

// --- HARPIAS ---
function drawHarpia(g, c) {
    var cx = 24, baseY = 55;
    _monsterShadow(g, cx, baseY, 12, 4);
    // Garras/pés
    g.poly([cx - 6, baseY, cx - 8, baseY + 2, cx - 4, baseY, cx - 6, baseY + 2, cx - 2, baseY]);
    g.fill(c.claw);
    g.poly([cx + 6, baseY, cx + 8, baseY + 2, cx + 4, baseY, cx + 6, baseY + 2, cx + 2, baseY]);
    g.fill(c.claw);
    // Pernas finas
    g.roundRect(cx - 6, baseY - 14, 3, 14, 1);
    g.fill(c.body);
    g.roundRect(cx + 3, baseY - 14, 3, 14, 1);
    g.fill(c.body);
    // Corpo
    g.ellipse(cx, baseY - 24, 8, 12);
    g.fill(c.body);
    _outline(g, 'ellipse', [cx, baseY - 24, 8, 12]);
    // Asa esquerda
    g.poly([cx - 8, baseY - 28, cx - 22, baseY - 40, cx - 24, baseY - 30, cx - 20, baseY - 22, cx - 8, baseY - 16]);
    g.fill(c.wing);
    _outline(g, 'poly', [cx - 8, baseY - 28, cx - 22, baseY - 40, cx - 24, baseY - 30, cx - 20, baseY - 22, cx - 8, baseY - 16]);
    // Asa direita
    g.poly([cx + 8, baseY - 28, cx + 22, baseY - 40, cx + 24, baseY - 30, cx + 20, baseY - 22, cx + 8, baseY - 16]);
    g.fill(c.wing);
    _outline(g, 'poly', [cx + 8, baseY - 28, cx + 22, baseY - 40, cx + 24, baseY - 30, cx + 20, baseY - 22, cx + 8, baseY - 16]);
    // Cabeça
    g.circle(cx, baseY - 38, 6);
    g.fill(c.body);
    _outline(g, 'circle', [cx, baseY - 38, 6]);
    // Cabelo
    g.poly([cx - 5, baseY - 43, cx - 3, baseY - 50, cx, baseY - 44, cx + 3, baseY - 50, cx + 5, baseY - 43]);
    g.fill(c.hair);
    // Bico
    g.poly([cx - 2, baseY - 36, cx, baseY - 32, cx + 2, baseY - 36]);
    g.fill(c.beak);
    _outline(g, 'poly', [cx - 2, baseY - 36, cx, baseY - 32, cx + 2, baseY - 36]);
    // Olhos
    g.circle(cx - 2.5, baseY - 39, 1.5);
    g.fill(c.eye);
    g.circle(cx + 2.5, baseY - 39, 1.5);
    g.fill(c.eye);
}

// --- LAGARTOS ---
function drawLagarto(g, c) {
    var cx = 24, baseY = 55;
    _monsterShadow(g, cx, baseY, 12, 5);
    // Cauda
    g.moveTo(cx + 6, baseY - 10);
    g.quadraticCurveTo(cx + 18, baseY - 6, cx + 22, baseY - 14);
    g.stroke({ width: 4, color: c.tail });
    g.moveTo(cx + 6, baseY - 10);
    g.quadraticCurveTo(cx + 18, baseY - 6, cx + 22, baseY - 14);
    g.stroke({ width: 5, color: 0x000000 });
    g.moveTo(cx + 6, baseY - 10);
    g.quadraticCurveTo(cx + 18, baseY - 6, cx + 22, baseY - 14);
    g.stroke({ width: 3, color: c.tail });
    // Pés com garras
    g.ellipse(cx - 5, baseY, 4, 2);
    g.fill(c.skin);
    g.ellipse(cx + 5, baseY, 4, 2);
    g.fill(c.skin);
    // Pernas
    g.roundRect(cx - 7, baseY - 14, 4, 14, 1);
    g.fill(c.skin);
    g.roundRect(cx + 3, baseY - 14, 4, 14, 1);
    g.fill(c.skin);
    // Corpo
    g.roundRect(cx - 9, baseY - 32, 18, 20, 4);
    g.fill(c.skin);
    _outline(g, 'roundRect', [cx - 9, baseY - 32, 18, 20, 4]);
    // Barriga/escamas
    g.ellipse(cx, baseY - 20, 6, 8);
    g.fill(c.belly);
    // Braços
    g.moveTo(cx - 9, baseY - 28);
    g.lineTo(cx - 16, baseY - 20);
    g.stroke({ width: 3, color: c.skin });
    g.moveTo(cx + 9, baseY - 28);
    g.lineTo(cx + 16, baseY - 20);
    g.stroke({ width: 3, color: c.skin });
    // Garras das mãos
    g.circle(cx - 16, baseY - 19, 2);
    g.fill(c.claw);
    g.circle(cx + 16, baseY - 19, 2);
    g.fill(c.claw);
    // Cabeça (réptil - alongada)
    g.ellipse(cx, baseY - 38, 7, 6);
    g.fill(c.skin);
    _outline(g, 'ellipse', [cx, baseY - 38, 7, 6]);
    // Crista
    g.poly([cx - 2, baseY - 44, cx, baseY - 50, cx + 2, baseY - 44, cx + 5, baseY - 48, cx + 6, baseY - 43]);
    g.fill(c.crest);
    // Olhos (réptil, fendas)
    g.circle(cx - 3, baseY - 39, 2);
    g.fill(0xFFFF00);
    g.ellipse(cx - 3, baseY - 39, 0.8, 1.8);
    g.fill(0x000000);
    g.circle(cx + 3, baseY - 39, 2);
    g.fill(0xFFFF00);
    g.ellipse(cx + 3, baseY - 39, 0.8, 1.8);
    g.fill(0x000000);
    // Focinho
    g.ellipse(cx, baseY - 33, 3, 2);
    g.fill(c.belly);
}

// --- OGROS ---
function drawOgro(g, c) {
    var cx = 24, baseY = 55;
    _monsterShadow(g, cx, baseY, 16, 6);
    // Pés
    g.ellipse(cx - 6, baseY, 5, 3);
    g.fill(c.skin);
    g.ellipse(cx + 6, baseY, 5, 3);
    g.fill(c.skin);
    // Pernas
    g.roundRect(cx - 8, baseY - 14, 5, 14, 2);
    g.fill(c.skin);
    g.roundRect(cx + 3, baseY - 14, 5, 14, 2);
    g.fill(c.skin);
    // Tanga/roupa
    g.poly([cx - 10, baseY - 16, cx + 10, baseY - 16, cx + 8, baseY - 10, cx - 8, baseY - 10]);
    g.fill(c.cloth);
    // Corpo (barrigudo)
    g.ellipse(cx, baseY - 26, 14, 14);
    g.fill(c.skin);
    _outline(g, 'ellipse', [cx, baseY - 26, 14, 14]);
    // Barriga proeminente
    g.ellipse(cx, baseY - 20, 10, 8);
    g.fill(c.belly);
    // Braços
    g.moveTo(cx - 14, baseY - 34);
    g.lineTo(cx - 20, baseY - 22);
    g.lineTo(cx - 18, baseY - 12);
    g.stroke({ width: 5, color: c.skin });
    g.moveTo(cx + 14, baseY - 34);
    g.lineTo(cx + 20, baseY - 22);
    g.lineTo(cx + 18, baseY - 12);
    g.stroke({ width: 5, color: c.skin });
    // Mãos
    g.circle(cx - 18, baseY - 11, 3.5);
    g.fill(c.skin);
    g.circle(cx + 18, baseY - 11, 3.5);
    g.fill(c.skin);
    // Cabeça (grande)
    g.circle(cx, baseY - 42, 9);
    g.fill(c.skin);
    _outline(g, 'circle', [cx, baseY - 42, 9]);
    // Cabelo
    g.poly([cx - 7, baseY - 50, cx - 4, baseY - 54, cx, baseY - 51, cx + 4, baseY - 54, cx + 7, baseY - 50]);
    g.fill(c.hair);
    // Presas (de baixo para cima)
    g.poly([cx - 4, baseY - 38, cx - 3, baseY - 41, cx - 2, baseY - 38]);
    g.fill(c.tusk);
    g.poly([cx + 4, baseY - 38, cx + 3, baseY - 41, cx + 2, baseY - 38]);
    g.fill(c.tusk);
    // Olhos
    g.circle(cx - 3, baseY - 44, 2);
    g.fill(0xFFFFFF);
    g.circle(cx - 3, baseY - 44, 1);
    g.fill(c.eye);
    g.circle(cx + 3, baseY - 44, 2);
    g.fill(0xFFFFFF);
    g.circle(cx + 3, baseY - 44, 1);
    g.fill(c.eye);
    // Nariz
    g.ellipse(cx, baseY - 41, 2.5, 1.5);
    g.fill(c.belly);
    // Boca
    g.moveTo(cx - 5, baseY - 38);
    g.lineTo(cx + 5, baseY - 38);
    g.stroke({ width: 1.5, color: 0x000000 });
}

// --- ESPANTALHO ---
function drawEspantalho(g, c) {
    var cx = 24, baseY = 55;
    _monsterShadow(g, cx, baseY, 10, 4);
    // Poste vertical
    g.roundRect(cx - 2, baseY - 40, 4, 40, 1);
    g.fill(c.wood);
    _outline(g, 'roundRect', [cx - 2, baseY - 40, 4, 40, 1]);
    // Barra horizontal (braços)
    g.roundRect(cx - 18, baseY - 32, 36, 3, 1);
    g.fill(c.wood);
    _outline(g, 'roundRect', [cx - 18, baseY - 32, 36, 3, 1]);
    // Roupa/trapo no corpo
    g.poly([cx - 8, baseY - 30, cx + 8, baseY - 30, cx + 10, baseY - 10, cx - 10, baseY - 10]);
    g.fill(c.cloth);
    _outline(g, 'poly', [cx - 8, baseY - 30, cx + 8, baseY - 30, cx + 10, baseY - 10, cx - 10, baseY - 10]);
    // Remendo
    g.roundRect(cx - 3, baseY - 24, 6, 6, 1);
    g.fill(c.patch);
    _outline(g, 'roundRect', [cx - 3, baseY - 24, 6, 6, 1]);
    // Trapos nos braços
    g.poly([cx - 18, baseY - 32, cx - 16, baseY - 24, cx - 14, baseY - 32]);
    g.fill(c.cloth);
    g.poly([cx + 18, baseY - 32, cx + 16, baseY - 24, cx + 14, baseY - 32]);
    g.fill(c.cloth);
    // Palha saindo
    g.moveTo(cx - 10, baseY - 10);
    g.lineTo(cx - 14, baseY - 4);
    g.stroke({ width: 1.5, color: c.straw });
    g.moveTo(cx + 10, baseY - 10);
    g.lineTo(cx + 14, baseY - 4);
    g.stroke({ width: 1.5, color: c.straw });
    g.moveTo(cx - 18, baseY - 30);
    g.lineTo(cx - 22, baseY - 26);
    g.stroke({ width: 1.5, color: c.straw });
    g.moveTo(cx + 18, baseY - 30);
    g.lineTo(cx + 22, baseY - 26);
    g.stroke({ width: 1.5, color: c.straw });
    // Cabeça (abóbora/saco)
    g.circle(cx, baseY - 42, 8);
    g.fill(c.straw);
    _outline(g, 'circle', [cx, baseY - 42, 8]);
    // Chapéu
    g.poly([cx - 10, baseY - 48, cx, baseY - 58, cx + 10, baseY - 48]);
    g.fill(c.hat);
    _outline(g, 'poly', [cx - 10, baseY - 48, cx, baseY - 58, cx + 10, baseY - 48]);
    // Aba do chapéu
    g.ellipse(cx, baseY - 48, 12, 3);
    g.fill(c.hat);
    _outline(g, 'ellipse', [cx, baseY - 48, 12, 3]);
    // Olhos (costurados em X)
    g.moveTo(cx - 5, baseY - 44);
    g.lineTo(cx - 2, baseY - 41);
    g.stroke({ width: 1.5, color: c.eye });
    g.moveTo(cx - 2, baseY - 44);
    g.lineTo(cx - 5, baseY - 41);
    g.stroke({ width: 1.5, color: c.eye });
    g.moveTo(cx + 2, baseY - 44);
    g.lineTo(cx + 5, baseY - 41);
    g.stroke({ width: 1.5, color: c.eye });
    g.moveTo(cx + 5, baseY - 44);
    g.lineTo(cx + 2, baseY - 41);
    g.stroke({ width: 1.5, color: c.eye });
    // Boca (costurada)
    g.moveTo(cx - 3, baseY - 38);
    g.lineTo(cx + 3, baseY - 38);
    g.stroke({ width: 1, color: 0x000000 });
    g.moveTo(cx - 1, baseY - 39);
    g.lineTo(cx - 1, baseY - 37);
    g.stroke({ width: 1, color: 0x000000 });
    g.moveTo(cx + 1, baseY - 39);
    g.lineTo(cx + 1, baseY - 37);
    g.stroke({ width: 1, color: 0x000000 });
}

// ===== DISPATCHER =====
var _FAMILY_DRAW = {
    'rato': drawRato,
    'barata': drawBarata,
    'cogumelo': drawCogumelo,
    'sapo': drawSapo,
    'morcego': drawMorcego,
    'planta': drawPlanta,
    'lobo': drawLobo,
    'aranha': drawAranha,
    'javali': drawJavali,
    'esqueleto': drawEsqueleto,
    'cobra': drawCobra,
    'goblin': drawGoblin,
    'urso': drawUrso,
    'troll': drawTroll,
    'golem': drawGolem,
    'harpia': drawHarpia,
    'lagarto': drawLagarto,
    'ogro': drawOgro,
    'espantalho': drawEspantalho
};

function drawMonsterGraphics(g, monsterId) {
    var cfg = MONSTER_DRAW_CONFIG[monsterId];
    if (!cfg) return;
    var fn = _FAMILY_DRAW[cfg.family];
    if (fn) fn(g, cfg.colors);
}

// ===== TEXTURE GENERATOR =====
var _monsterTexCache = {};

function generateMonsterTexture(monsterId) {
    if (_monsterTexCache[monsterId]) return _monsterTexCache[monsterId];
    if (typeof PIXI === 'undefined' || typeof pixiApp === 'undefined' || !pixiApp) return null;

    var cfg = MONSTER_DRAW_CONFIG[monsterId];
    if (!cfg) return null;

    var g = new PIXI.Graphics();
    drawMonsterGraphics(g, monsterId);

    var tex = pixiApp.renderer.generateTexture({ target: g, resolution: 2 });
    g.destroy();
    _monsterTexCache[monsterId] = tex;
    return tex;
}

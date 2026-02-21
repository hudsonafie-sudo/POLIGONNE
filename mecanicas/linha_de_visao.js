// ========== SISTEMA DE LINHA DE VISAO ==========
// Algoritmos de LoS para combate e simulacao
// Deps runtime: simState, simCombatState, entities, combatState, GRID_SIZE, COMBAT_GRID_SIZE
// !! PERFORMANCE: hasLineOfSight() e chamada milhares de vezes por selecao de habilidade.
// !! NUNCA adicionar console.log aqui.

function isObstacle(x, y) {
    // Terreno bloqueador sempre bloqueia LoS (hole NAO bloqueia)
    const cell = getWorldCell(x, y);
    if (cell && cell.obstacle === 'blocker') return true;
    if (simState.active) {
        return simState.obstacles.has(`${x},${y}`);
    }
    if (simCombatState.active) {
        // Entidades vivas bloqueiam LoS (exceto caster e invisíveis)
        const currentP = simCombatState.participants[simCombatState.currentIndex];
        return simCombatState.participants.some(p => {
            if (p.entity === currentP.entity) return false;
            if (simCombatState.entityStats[p.id].hp <= 0) return false;
            // Invisível e Transparente não bloqueiam LoS
            if (typeof hasAdvancedStatus === 'function' && hasAdvancedStatus(p.entity, 'invisivel')) return false;
            if (typeof hasAdvancedStatus === 'function' && hasAdvancedStatus(p.entity, 'transparente')) return false;
            return Math.floor(p.entity.x) === x && Math.floor(p.entity.y) === y;
        });
    }
    // Combate normal: o outro participante bloqueia LoS
    if (typeof combatState !== 'undefined' && combatState.active) {
        const isMonsterTurn = combatState.turnOrder && combatState.turnOrder.length > 0 &&
            combatState.turnOrder[combatState.currentTurnIndex] &&
            combatState.turnOrder[combatState.currentTurnIndex].type === 'monster';
        if (isMonsterTurn) {
            // Turno do monstro: player bloqueia LoS (exceto se invisível)
            if (typeof playerEntity !== 'undefined' &&
                Math.floor(playerEntity.x) === x && Math.floor(playerEntity.y) === y) {
                if (typeof hasAdvancedStatus === 'function' && hasAdvancedStatus(playerEntity, 'invisivel')) return false;
                if (typeof hasAdvancedStatus === 'function' && hasAdvancedStatus(playerEntity, 'transparente')) return false;
                return true;
            }
        } else {
            // Turno do player: monstro bloqueia LoS (exceto se invisível)
            const enemy = combatState.targetEnemy;
            if (enemy && enemy.hp > 0 &&
                Math.floor(enemy.x) === x && Math.floor(enemy.y) === y) {
                if (typeof hasAdvancedStatus === 'function' && hasAdvancedStatus(enemy, 'invisivel')) return false;
                if (typeof hasAdvancedStatus === 'function' && hasAdvancedStatus(enemy, 'transparente')) return false;
                return true;
            }
        }
        return false;
    }
    return false;
}

// Bresenham Supercover: retorna todas as cells que a linha cruza
function getLineCells(x0, y0, x1, y1) {
    const cells = [];
    let dx = Math.abs(x1 - x0), dy = Math.abs(y1 - y0);
    let x = x0, y = y0;
    const sx = x0 < x1 ? 1 : -1;
    const sy = y0 < y1 ? 1 : -1;
    let err = dx - dy;
    while (true) {
        cells.push({ x, y });
        if (x === x1 && y === y1) break;
        const e2 = 2 * err;
        if (e2 > -dy && e2 < dx) {
            // Supercover: diagonal step crosses 2 adjacents
            cells.push({ x: x + sx, y });
            cells.push({ x, y: y + sy });
        }
        if (e2 > -dy) { err -= dy; x += sx; }
        if (e2 < dx) { err += dx; y += sy; }
    }
    return cells;
}

// Bresenham Simples (1 cell por step)
function getLineCellsBresenham(x0, y0, x1, y1) {
    const cells = [];
    let dx = Math.abs(x1 - x0), dy = Math.abs(y1 - y0);
    let x = x0, y = y0;
    const sx = x0 < x1 ? 1 : -1, sy = y0 < y1 ? 1 : -1;
    let err = dx - dy;
    while (true) {
        cells.push({ x, y });
        if (x === x1 && y === y1) break;
        const e2 = 2 * err;
        if (e2 > -dy) { err -= dy; x += sx; }
        if (e2 < dx) { err += dx; y += sy; }
    }
    return cells;
}

// Permissivo: checa 4 raios (cantos do tile) - se algum passa, tem LoS
function hasLoSPermissive(x0, y0, x1, y1) {
    const offsets = [[-0.3, -0.3], [0.3, -0.3], [-0.3, 0.3], [0.3, 0.3]];
    for (const [ox1, oy1] of offsets) {
        for (const [ox2, oy2] of offsets) {
            if (hasLoSRay(x0 + ox1, y0 + oy1, x1 + ox2, y1 + oy2)) return true;
        }
    }
    return false;
}

// Ray Cast angular: sub-stepping fino do centro ao centro
function getLineCellsRayCast(x0, y0, x1, y1) {
    const cells = [];
    const seen = new Set();
    const dx = x1 - x0, dy = y1 - y0;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const steps = Math.max(Math.ceil(dist * 3), 1);
    for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        const cx = Math.round(x0 + dx * t);
        const cy = Math.round(y0 + dy * t);
        const key = `${cx},${cy}`;
        if (!seen.has(key)) {
            seen.add(key);
            cells.push({ x: cx, y: cy });
        }
    }
    return cells;
}

// Helper para ray com coordenadas fracionarias
function hasLoSRay(fx0, fy0, fx1, fy1) {
    const dx = fx1 - fx0, dy = fy1 - fy0;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const steps = Math.max(Math.ceil(dist * 3), 1);
    for (let i = 1; i < steps; i++) {
        const t = i / steps;
        const cx = Math.round(fx0 + dx * t);
        const cy = Math.round(fy0 + dy * t);
        if (cx === Math.round(fx0) && cy === Math.round(fy0)) continue;
        if (cx === Math.round(fx1) && cy === Math.round(fy1)) continue;
        if (isObstacle(cx, cy)) return false;
    }
    return true;
}

// Restritivo: TODOS os 4 raios canto-a-canto devem passar (oposto do permissivo)
function hasLoSRestrictive(x0, y0, x1, y1) {
    const offsets = [[-0.3, -0.3], [0.3, -0.3], [-0.3, 0.3], [0.3, 0.3]];
    for (const [ox1, oy1] of offsets) {
        for (const [ox2, oy2] of offsets) {
            if (!hasLoSRay(x0 + ox1, y0 + oy1, x1 + ox2, y1 + oy2)) return false;
        }
    }
    return true;
}

// Simetrico: checa A->B e B->A com bresenham simples, ambos devem passar
function hasLoSSymmetric(x0, y0, x1, y1) {
    const cellsAB = getLineCellsBresenham(x0, y0, x1, y1);
    for (let i = 1; i < cellsAB.length - 1; i++) {
        if (isObstacle(cellsAB[i].x, cellsAB[i].y)) return false;
    }
    const cellsBA = getLineCellsBresenham(x1, y1, x0, y0);
    for (let i = 1; i < cellsBA.length - 1; i++) {
        if (isObstacle(cellsBA[i].x, cellsBA[i].y)) return false;
    }
    return true;
}

// Diagonal Prefer: bresenham que prefere steps diagonais sobre axiais
function getLineCellsDiagonal(x0, y0, x1, y1) {
    const cells = [];
    let dx = Math.abs(x1 - x0), dy = Math.abs(y1 - y0);
    let x = x0, y = y0;
    const sx = x0 < x1 ? 1 : -1, sy = y0 < y1 ? 1 : -1;
    let err = dx - dy;
    while (true) {
        cells.push({ x, y });
        if (x === x1 && y === y1) break;
        const e2 = 2 * err;
        // Prefere diagonal: move ambos eixos quando possivel
        if (e2 > -dy && e2 < dx) {
            err -= dy; err += dx; x += sx; y += sy;
        } else if (e2 > -dy) {
            err -= dy; x += sx;
        } else {
            err += dx; y += sy;
        }
    }
    return cells;
}

// Raio Largo: 3 raios paralelos (centro + 2 laterais)
function hasLoSWideRay(x0, y0, x1, y1) {
    const dx = x1 - x0, dy = y1 - y0;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 0.01) return true;
    // Vetor perpendicular normalizado
    const px = -dy / dist * 0.35, py = dx / dist * 0.35;
    // 3 raios: centro, esquerda, direita
    const rays = [
        [x0, y0, x1, y1],
        [x0 + px, y0 + py, x1 + px, y1 + py],
        [x0 - px, y0 - py, x1 - px, y1 - py]
    ];
    // Se QUALQUER raio passa, tem LoS
    for (const [rx0, ry0, rx1, ry1] of rays) {
        if (hasLoSRay(rx0, ry0, rx1, ry1)) return true;
    }
    return false;
}

// Half-width: supercover mas so bloqueia se obstaculo esta no centro da linha
function hasLoSHalfBlock(x0, y0, x1, y1) {
    const cells = getLineCells(x0, y0, x1, y1);
    let blocked = 0;
    for (let i = 1; i < cells.length - 1; i++) {
        if (isObstacle(cells[i].x, cells[i].y)) blocked++;
    }
    // Precisa de 2+ obstaculos consecutivos no caminho para bloquear
    // (1 obstaculo isolado nao bloqueia - "espreitar por fresta")
    if (blocked === 0) return true;
    for (let i = 1; i < cells.length - 2; i++) {
        if (isObstacle(cells[i].x, cells[i].y) && isObstacle(cells[i+1].x, cells[i+1].y)) return false;
    }
    return blocked < 2;
}

// Raio geometrico centro-a-centro via DDA (algoritmo padrao)
// Linha reta do centro da celula do caster ao centro do alvo.
// Toda celula cujo INTERIOR e cruzado pela linha bloqueia.
// Tocar apenas num canto/aresta NAO bloqueia.
function hasLoSDDA(x0, y0, x1, y1) {
    // Centros reais das celulas
    const startX = x0 + 0.5, startY = y0 + 0.5;
    const endX = x1 + 0.5, endY = y1 + 0.5;
    const dx = endX - startX, dy = endY - startY;

    // Caso trivial: mesma celula ou adjacente direto
    if (x0 === x1 && y0 === y1) return true;

    // DDA: avanca pela grade calculando intersecoes com linhas de grid
    const stepX = dx > 0 ? 1 : dx < 0 ? -1 : 0;
    const stepY = dy > 0 ? 1 : dy < 0 ? -1 : 0;

    // Distancia em t para cruzar 1 celula inteira em cada eixo
    const tDeltaX = (dx !== 0) ? Math.abs(1.0 / dx) : Infinity;
    const tDeltaY = (dy !== 0) ? Math.abs(1.0 / dy) : Infinity;

    // t ate a proxima linha de grade em cada eixo
    let tMaxX, tMaxY;
    if (dx > 0) tMaxX = (Math.floor(startX) + 1 - startX) * tDeltaX;
    else if (dx < 0) tMaxX = (startX - Math.floor(startX)) * tDeltaX;
    else tMaxX = Infinity;

    if (dy > 0) tMaxY = (Math.floor(startY) + 1 - startY) * tDeltaY;
    else if (dy < 0) tMaxY = (startY - Math.floor(startY)) * tDeltaY;
    else tMaxY = Infinity;

    let cx = x0, cy = y0;
    const EPS = 1e-9;

    // Avanca ate chegar no alvo
    for (let safety = 0; safety < 200; safety++) {
        if (cx === x1 && cy === y1) break;

        if (tMaxX < tMaxY - EPS) {
            // Cruza linha vertical
            cx += stepX;
            tMaxX += tDeltaX;
        } else if (tMaxY < tMaxX - EPS) {
            // Cruza linha horizontal
            cy += stepY;
            tMaxY += tDeltaY;
        } else {
            // Cruza exatamente num canto (diagonal perfeita)
            // Tocar num canto NAO entra na celula
            // Avanca nos dois eixos sem checar as celulas adjacentes ao canto
            cx += stepX;
            cy += stepY;
            tMaxX += tDeltaX;
            tMaxY += tDeltaY;
        }

        // Nao checa a celula do alvo
        if (cx === x1 && cy === y1) break;

        if (isObstacle(cx, cy)) return false;
    }
    return true;
}

function hasLoSFineStepping(x0, y0, x1, y1) {
    const dx = x1 - x0, dy = y1 - y0;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const steps = Math.max(Math.ceil(dist * 10), 1);
    for (let i = 1; i < steps; i++) {
        const t = i / steps;
        const fx = x0 + dx * t;
        const fy = y0 + dy * t;
        const cx = Math.floor(fx + 0.5);
        const cy = Math.floor(fy + 0.5);
        if (cx === x0 && cy === y0) continue;
        if (cx === x1 && cy === y1) continue;
        if (isObstacle(cx, cy)) return false;
    }
    return true;
}

function hasLineOfSight(x0, y0, x1, y1) {
    const algo = simState.active ? simState.algorithm : 'dda';
    let cells;
    switch (algo) {
        case 'bresenham':
            cells = getLineCellsBresenham(x0, y0, x1, y1);
            break;
        case 'permissive':
            return hasLoSPermissive(x0, y0, x1, y1);
        case 'rayCast':
            cells = getLineCellsRayCast(x0, y0, x1, y1);
            break;
        case 'restrictive':
            return hasLoSRestrictive(x0, y0, x1, y1);
        case 'symmetric':
            return hasLoSSymmetric(x0, y0, x1, y1);
        case 'diagonal':
            cells = getLineCellsDiagonal(x0, y0, x1, y1);
            break;
        case 'wideRay':
            return hasLoSWideRay(x0, y0, x1, y1);
        case 'halfBlock':
            return hasLoSHalfBlock(x0, y0, x1, y1);
        case 'fineStepping':
            return hasLoSFineStepping(x0, y0, x1, y1);
        case 'dda':
            return hasLoSDDA(x0, y0, x1, y1);
        default: // supercover
            cells = getLineCells(x0, y0, x1, y1);
    }
    for (let i = 1; i < cells.length - 1; i++) {
        if (isObstacle(cells[i].x, cells[i].y)) return false;
    }
    return true;
}

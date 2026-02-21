// ========== SISTEMA DE PATHFINDING ==========
// A* para encontrar caminhos celula a celula
// Deps runtime: GRID_SIZE, COMBAT_GRID_SIZE, combatState, inCombat, isCellOccupiedByEnemy, playerEntity
// !! PERFORMANCE: A* roda em loops internos com centenas de iteracoes.
// !! NUNCA adicionar console.log aqui. Causa lag severo.

const DIRECTIONS_4 = [
    { dx: 0, dy: -1 },  // cima
    { dx: 0, dy: 1 },   // baixo
    { dx: -1, dy: 0 },  // esquerda
    { dx: 1, dy: 0 }    // direita
];

const DIRECTIONS_8 = [
    { dx: 0, dy: -1 },  // cima
    { dx: 0, dy: 1 },   // baixo
    { dx: -1, dy: 0 },  // esquerda
    { dx: 1, dy: 0 },   // direita
    { dx: -1, dy: -1 }, // diagonal cima-esquerda
    { dx: 1, dy: -1 },  // diagonal cima-direita
    { dx: -1, dy: 1 },  // diagonal baixo-esquerda
    { dx: 1, dy: 1 }    // diagonal baixo-direita
];

// Pathfinding A* para encontrar caminho celula a celula
function findPath(startX, startY, endX, endY) {
    const start = { x: Math.floor(startX), y: Math.floor(startY) };
    const end = { x: Math.floor(endX), y: Math.floor(endY) };

    if (start.x === end.x && start.y === end.y) return [];

    const openSet = [{ ...start, g: 0, h: 0, f: 0, parent: null }];
    const closedSet = new Set();

    // Usa 4 direcoes em combate, 8 direcoes em exploracao
    const directions = inCombat ? DIRECTIONS_4 : DIRECTIONS_8;

    // Distancia Chebyshev para 8 direcoes, Manhattan para 4 direcoes
    const heuristic = inCombat
        ? (a, b) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y)
        : (a, b) => Math.max(Math.abs(a.x - b.x), Math.abs(a.y - b.y));

    const currentGridSize = combatState.active ? COMBAT_GRID_SIZE : GRID_SIZE;
    const maxIterations = currentGridSize * currentGridSize; // Limite de seguranca
    const inBattle = combatState.phase === 'battle';
    // Usa Map para lookup O(1) no openSet ao inves de findIndex O(n)
    const openMap = new Map();
    const startKey = start.x * currentGridSize + start.y;
    openSet[0].key = startKey;
    openMap.set(startKey, openSet[0]);
    let iterations = 0;

    while (openSet.length > 0) {
        if (++iterations > maxIterations) return []; // Previne travamento

        // Encontra no com menor f
        let currentIndex = 0;
        let minF = openSet[0].f;
        for (let i = 1; i < openSet.length; i++) {
            if (openSet[i].f < minF) {
                minF = openSet[i].f;
                currentIndex = i;
            }
        }

        const current = openSet[currentIndex];

        // Chegou ao destino
        if (current.x === end.x && current.y === end.y) {
            const path = [];
            let node = current;
            while (node.parent) {
                path.unshift({ x: node.x, y: node.y });
                node = node.parent;
            }
            return path;
        }

        // Move do openSet para closedSet (swap-remove: O(1) ao inves de splice O(n))
        const last = openSet[openSet.length - 1];
        openSet[currentIndex] = last;
        openSet.length--;
        openMap.delete(current.key);
        closedSet.add(current.key);

        // Explora vizinhos
        for (const dir of directions) {
            const neighborX = current.x + dir.dx;
            const neighborY = current.y + dir.dy;

            if (neighborX < 0 || neighborX >= currentGridSize ||
                neighborY < 0 || neighborY >= currentGridSize) {
                continue;
            }

            const neighborKey = neighborX * currentGridSize + neighborY;
            if (closedSet.has(neighborKey)) continue;

            // Verifica terreno do mapa (walkability e restricoes direcionais)
            if (!isCellWalkable(neighborX, neighborY)) continue;
            if (!canMoveFromTo(current.x, current.y, neighborX, neighborY)) continue;

            // Diagonal: impede cortar cantos de obstaculos (ambas adjacentes cardinais devem ser caminhaveis)
            if (dir.dx !== 0 && dir.dy !== 0) {
                if (!isCellWalkable(current.x + dir.dx, current.y) || !isCellWalkable(current.x, current.y + dir.dy)) continue;
            }

            // Em batalha, NUNCA pode passar por celula ocupada (nem mesmo destino)
            if (inBattle) {
                if (isCellOccupiedByEnemy(neighborX, neighborY) || isCellOccupiedByPlayer(neighborX, neighborY)) {
                    continue;
                }
            }

            // Custo: 1 para cardinal, 1.4 para diagonal
            const moveCost = (dir.dx !== 0 && dir.dy !== 0) ? 1.4 : 1;
            const g = current.g + moveCost;

            // Verifica se ja esta no openSet com custo menor
            const existing = openMap.get(neighborKey);
            if (existing) {
                if (g < existing.g) {
                    existing.g = g;
                    existing.f = g + existing.h;
                    existing.parent = current;
                }
            } else {
                const h = heuristic({ x: neighborX, y: neighborY }, end);
                const node = { x: neighborX, y: neighborY, g, h, f: g + h, parent: current, key: neighborKey };
                openSet.push(node);
                openMap.set(neighborKey, node);
            }
        }
    }

    // Sem caminho encontrado
    return [];
}

// Define destino e calcula caminho
function setEntityDestination(entity, destX, destY) {
    const path = findPath(entity.x, entity.y, destX, destY);
    entity.path = path;
    if (path.length > 0) {
        const first = entity.path.shift(); // Remove o primeiro do array
        entity.targetX = first.x;
        entity.targetY = first.y;
    }
}

// Define destino usando caminho pre-calculado (evita race conditions)
function setEntityPath(entity, path) {
    if (!path || path.length === 0) {
        return false;
    }
    // Cria copia do path para nao modificar o original
    entity.path = [...path];
    const first = entity.path.shift();
    entity.targetX = first.x;
    entity.targetY = first.y;
    return true;
}

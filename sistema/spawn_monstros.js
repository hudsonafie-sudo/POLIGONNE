// ========== SISTEMA DE SPAWN DE MONSTROS ==========
// Gerencia spawn, grupos, wandering e respawn de monstros no mapa de exploração.
// Deps runtime: DB_MONSTROS, entities, playerEntity, isCellWalkable, findPath,
//               setEntityDestination, combatState, inCombat, currentMapData, GRID_SIZE

// === REGISTRO DAS 18 FAMÍLIAS DE MONSTROS ===
const MONSTER_FAMILIES = {
    // Tier 1 — ex-T1 (cidade)
    rato:      { id: 'rato',      name: 'Ratos',       icon: '🐀', tier: 1 },
    barata:    { id: 'barata',    name: 'Baratas',      icon: '🪳', tier: 1 },
    cogumelo:  { id: 'cogumelo',  name: 'Cogumelos',    icon: '🍄', tier: 1 },
    sapo:      { id: 'sapo',      name: 'Sapos',        icon: '🐸', tier: 1 },
    morcego:   { id: 'morcego',   name: 'Morcegos',     icon: '🦇', tier: 1 },
    planta:    { id: 'planta',    name: 'Plantas',      icon: '🌿', tier: 1 },
    // Tier 1 — ex-T2 (arredores / zonas médias)
    lobo:      { id: 'lobo',      name: 'Lobos',        icon: '🐺', tier: 1 },
    aranha:    { id: 'aranha',    name: 'Aranhas',      icon: '🕷️', tier: 1 },
    javali:    { id: 'javali',    name: 'Javalis',      icon: '🐗', tier: 1 },
    esqueleto: { id: 'esqueleto', name: 'Esqueletos',   icon: '💀', tier: 1 },
    cobra:     { id: 'cobra',     name: 'Cobras',       icon: '🐍', tier: 1 },
    goblin:    { id: 'goblin',    name: 'Goblins',      icon: '👺', tier: 1 },
    // Tier 2 — ex-T3 (zonas externas)
    urso:      { id: 'urso',      name: 'Ursos',        icon: '🐻', tier: 2 },
    troll:     { id: 'troll',     name: 'Trolls',       icon: '🧌', tier: 2 },
    golem:     { id: 'golem',     name: 'Golems',       icon: '🗿', tier: 2 },
    harpia:    { id: 'harpia',    name: 'Harpias',      icon: '🦅', tier: 2 },
    lagarto:   { id: 'lagarto',   name: 'Lagartos',     icon: '🦎', tier: 2 },
    ogro:      { id: 'ogro',      name: 'Ogros',        icon: '💪', tier: 2 }
};

// === CONFIGURAÇÃO PADRÃO ===
const DEFAULT_SPAWN_CONFIG = {
    maxGroups: 8,
    spawnIntervalMs: 15000,
    respawnDelayMs: 30000,
    wanderIntervalMs: 8000,
    wanderRadius: 3,
    minPlayerDist: 6,
    minGroupDist: 5,
    families: []
};

// === ESTADO GLOBAL ===
var monsterGroups = [];
var respawnQueue = [];
var _spawnTimers = {};
var _lastSpawnCheck = 0;
var _lastWanderUpdate = 0;
var _spawnGroupCounter = 0;

// === CACHE DE FAMÍLIA ===
var _familyCache = {};       // familyId -> [monsterData, ...]
var _familyCacheBuilt = false;

function _buildFamilyCache() {
    _familyCache = {};
    if (typeof DB_MONSTROS === 'undefined') return;
    for (var i = 0; i < DB_MONSTROS.length; i++) {
        var m = DB_MONSTROS[i];
        var fam = m.family;
        if (!fam) continue;
        if (!_familyCache[fam]) _familyCache[fam] = [];
        _familyCache[fam].push(m);
    }
    _familyCacheBuilt = true;
}

function getMonstersOfFamily(familyId) {
    if (!_familyCacheBuilt) _buildFamilyCache();
    return _familyCache[familyId] || [];
}

// === INICIALIZAÇÃO ===
function initSpawnSystem() {
    monsterGroups = [];
    respawnQueue = [];
    _spawnTimers = {};
    _spawnGroupCounter = 0;
    _lastSpawnCheck = 0;
    _lastWanderUpdate = 0;
    _familyCacheBuilt = false;
    _buildFamilyCache();

    if (typeof currentMapData === 'undefined' || !currentMapData || !currentMapData.regions) return;

    for (var ri = 0; ri < currentMapData.regions.length; ri++) {
        var region = currentMapData.regions[ri];
        var config = region.spawnConfig;
        if (!config || !config.families || config.families.length === 0) continue;
        _spawnTimers[region.id] = { lastSpawnAttempt: 0 };

        // Spawn inicial: só 2 grupos. O resto aparece gradualmente com o tempo
        for (var i = 0; i < 2; i++) {
            trySpawnGroup(region);
        }
    }
}

// === SPAWN DE GRUPO ===
function trySpawnGroup(region) {
    var config = region.spawnConfig || DEFAULT_SPAWN_CONFIG;
    var maxGroups = config.maxGroups || DEFAULT_SPAWN_CONFIG.maxGroups;

    // Contar grupos ativos nesta região
    var activeCount = 0;
    for (var i = 0; i < monsterGroups.length; i++) {
        if (monsterGroups[i].regionId === region.id && monsterGroups[i].state !== 'dead') {
            activeCount++;
        }
    }
    if (activeCount >= maxGroups) return false;

    // Escolher família (weighted random)
    var familyConfig = _pickWeightedFamily(config.families);
    if (!familyConfig) return false;

    var familyMonsters = getMonstersOfFamily(familyConfig.familyId);
    if (familyMonsters.length === 0) return false;

    // Tamanho do grupo
    var minSize = familyConfig.groupSizeMin || 1;
    var maxSize = familyConfig.groupSizeMax || 3;
    var groupSize = minSize + Math.floor(Math.random() * (maxSize - minSize + 1));

    // Posição âncora
    var anchor = _findSpawnAnchor(region, config);
    if (!anchor) return false;

    // Posições dos membros
    var positions = _findGroupPositions(anchor.x, anchor.y, groupSize, region);
    if (positions.length < 1) return false;
    groupSize = positions.length;

    // Criar grupo
    _spawnGroupCounter++;
    var group = {
        id: 'group_' + _spawnGroupCounter + '_' + Date.now(),
        regionId: region.id,
        familyId: familyConfig.familyId,
        anchorX: anchor.x,
        anchorY: anchor.y,
        members: [],
        state: 'alive',
        lastWanderTime: Date.now(),
        spawnTime: Date.now()
    };

    for (var mi = 0; mi < groupSize; mi++) {
        var monsterData = familyMonsters[Math.floor(Math.random() * familyMonsters.length)];
        var entity = _createMonsterEntity(monsterData, positions[mi].x, positions[mi].y, group.id);
        group.members.push(entity);
        entities.push(entity);
    }

    monsterGroups.push(group);
    return true;
}

// Cria entidade de monstro para o mapa de exploração
function _createMonsterEntity(monsterData, x, y, groupId) {
    return {
        x: x,
        y: y,
        targetX: x,
        targetY: y,
        velocityX: 0,
        velocityY: 0,
        currentSpeed: 0,
        path: [],
        type: 'monster',
        id: monsterData.id,
        name: monsterData.name,
        icon: monsterData.icon || '',
        svgIcon: monsterData.svgIcon || null,
        level: monsterData.level || 1,
        hp: monsterData.hp,
        maxHp: monsterData.hp,
        pa: monsterData.pa,
        pm: monsterData.pm,
        stats: monsterData.stats ? Object.assign({}, monsterData.stats) : {},
        block: monsterData.block || 0,
        dodge: monsterData.dodge || 0,
        initiative: monsterData.initiative || 10,
        resistances: monsterData.resistances ? Object.assign({}, monsterData.resistances) : {},
        aiType: monsterData.aiType || 'aggressive_melee',
        spells: monsterData.spells ? monsterData.spells.slice() : [],
        drops: monsterData.drops ? JSON.parse(JSON.stringify(monsterData.drops)) : [],
        xpReward: monsterData.xpReward || 0,
        groupId: groupId
    };
}

// === POSICIONAMENTO ===

function _findSpawnAnchor(region, config) {
    var bounds = region.bounds;
    var padding = 3;
    var minPlayerDist = config.minPlayerDist || DEFAULT_SPAWN_CONFIG.minPlayerDist;
    var minGroupDist = config.minGroupDist || DEFAULT_SPAWN_CONFIG.minGroupDist;
    // Mais tentativas pois bounds são aproximados (bounding box > região real)
    var maxAttempts = 80;

    for (var attempt = 0; attempt < maxAttempts; attempt++) {
        var x = bounds.x1 + padding + Math.floor(Math.random() * Math.max(1, bounds.x2 - bounds.x1 - padding * 2 + 1));
        var y = bounds.y1 + padding + Math.floor(Math.random() * Math.max(1, bounds.y2 - bounds.y1 - padding * 2 + 1));

        // Validação orgânica: ponto deve estar DENTRO da região real
        if (typeof getRegionId === 'function' && getRegionId(x, y) !== region.id) continue;

        // Walkable?
        if (typeof isCellWalkable !== 'undefined' && !isCellWalkable(x, y)) continue;

        // Nao spawnar em celulas elevadas (evita bugs com pathfinding/elevacao)
        if (typeof getCell === 'function') {
            var cell = getCell(x, y);
            if (cell && cell.elevation > 0) continue;
        }

        // Distância do player
        if (typeof playerEntity !== 'undefined' && playerEntity) {
            var dx = x - Math.floor(playerEntity.x);
            var dy = y - Math.floor(playerEntity.y);
            if (Math.abs(dx) + Math.abs(dy) < minPlayerDist) continue;
        }

        // Entidade já presente?
        if (_isCellOccupied(x, y)) continue;

        // Distância de outros grupos
        var tooClose = false;
        for (var gi = 0; gi < monsterGroups.length; gi++) {
            var g = monsterGroups[gi];
            if (g.state === 'dead') continue;
            if (Math.abs(x - g.anchorX) + Math.abs(y - g.anchorY) < minGroupDist) {
                tooClose = true;
                break;
            }
        }
        if (tooClose) continue;

        return { x: x, y: y };
    }
    return null;
}

function _findGroupPositions(anchorX, anchorY, count, region) {
    var positions = [{ x: anchorX, y: anchorY }];
    if (count <= 1) return positions;

    var bounds = region.bounds;
    var candidates = [];

    // Espiral do centro pra fora (até 3 cells de distância)
    for (var r = 1; r <= 3; r++) {
        for (var dx = -r; dx <= r; dx++) {
            for (var dy = -r; dy <= r; dy++) {
                if (dx === 0 && dy === 0) continue;
                if (Math.abs(dx) + Math.abs(dy) > 4) continue;
                var nx = anchorX + dx;
                var ny = anchorY + dy;
                if (nx < bounds.x1 || nx > bounds.x2 || ny < bounds.y1 || ny > bounds.y2) continue;
                // Validação orgânica: deve estar dentro da mesma região
                if (typeof getRegionId === 'function' && getRegionId(nx, ny) !== region.id) continue;
                if (typeof isCellWalkable !== 'undefined' && !isCellWalkable(nx, ny)) continue;
                if (_isCellOccupied(nx, ny)) continue;
                // Nao posicionar em celulas elevadas
                if (typeof getCell === 'function') {
                    var cell = getCell(nx, ny);
                    if (cell && cell.elevation > 0) continue;
                }
                candidates.push({ x: nx, y: ny });
            }
        }
    }

    // Shuffle
    for (var i = candidates.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = candidates[i];
        candidates[i] = candidates[j];
        candidates[j] = tmp;
    }

    // Pegar até count-1 posições adicionais
    for (var ci = 0; ci < candidates.length && positions.length < count; ci++) {
        var dupe = false;
        for (var p = 0; p < positions.length; p++) {
            if (positions[p].x === candidates[ci].x && positions[p].y === candidates[ci].y) {
                dupe = true;
                break;
            }
        }
        if (!dupe) positions.push(candidates[ci]);
    }

    return positions;
}

function _isCellOccupied(x, y) {
    if (typeof entities === 'undefined') return false;
    for (var i = 0; i < entities.length; i++) {
        if (Math.floor(entities[i].x) === x && Math.floor(entities[i].y) === y) return true;
    }
    return false;
}

// === SELEÇÃO PONDERADA ===
function _pickWeightedFamily(families) {
    if (!families || families.length === 0) return null;
    var totalWeight = 0;
    for (var i = 0; i < families.length; i++) totalWeight += (families[i].weight || 1);
    var roll = Math.random() * totalWeight;
    var cumulative = 0;
    for (var i = 0; i < families.length; i++) {
        cumulative += (families[i].weight || 1);
        if (roll < cumulative) return families[i];
    }
    return families[families.length - 1];
}

// === WANDERING (PASSEIO NO MAPA) ===
function _updateGroupWandering(now) {
    if (typeof inCombat !== 'undefined' && inCombat) return;
    if (now - _lastWanderUpdate < 2000) return;
    _lastWanderUpdate = now;

    for (var gi = 0; gi < monsterGroups.length; gi++) {
        var group = monsterGroups[gi];
        if (group.state !== 'alive') continue;

        var config = _getRegionConfig(group.regionId);
        var wanderInterval = config.wanderIntervalMs || DEFAULT_SPAWN_CONFIG.wanderIntervalMs;
        if (now - group.lastWanderTime < wanderInterval) continue;
        group.lastWanderTime = now;

        // 40% chance de andar, 60% fica parado
        if (Math.random() > 0.40) continue;

        var wanderRadius = config.wanderRadius || DEFAULT_SPAWN_CONFIG.wanderRadius;
        var bounds = _getRegionBounds(group.regionId);
        if (!bounds) continue;

        // Drift do âncora (0-1 célula por ciclo)
        var newAnchorX = group.anchorX + Math.floor(Math.random() * 3) - 1;
        var newAnchorY = group.anchorY + Math.floor(Math.random() * 3) - 1;
        newAnchorX = Math.max(bounds.x1 + 2, Math.min(bounds.x2 - 2, newAnchorX));
        newAnchorY = Math.max(bounds.y1 + 2, Math.min(bounds.y2 - 2, newAnchorY));
        group.anchorX = newAnchorX;
        group.anchorY = newAnchorY;

        // Mover cada membro para perto do âncora
        for (var mi = 0; mi < group.members.length; mi++) {
            var member = group.members[mi];
            var ex = Math.floor(member.x);
            var ey = Math.floor(member.y);

            // Pular se ainda está se movendo
            if (ex !== Math.floor(member.targetX) || ey !== Math.floor(member.targetY)) continue;
            if (member.path && member.path.length > 0) continue;

            // Destino aleatório perto do âncora
            var destX = group.anchorX + Math.floor(Math.random() * (wanderRadius * 2 + 1)) - wanderRadius;
            var destY = group.anchorY + Math.floor(Math.random() * (wanderRadius * 2 + 1)) - wanderRadius;
            destX = Math.max(bounds.x1, Math.min(bounds.x2, destX));
            destY = Math.max(bounds.y1, Math.min(bounds.y2, destY));

            if (destX === ex && destY === ey) continue;
            // Validação orgânica: destino deve estar na mesma região
            if (typeof getRegionId === 'function' && getRegionId(destX, destY) !== group.regionId) continue;
            if (typeof isCellWalkable !== 'undefined' && !isCellWalkable(destX, destY)) continue;
            // Nao andar para celulas elevadas
            if (typeof getCell === 'function') {
                var wCell = getCell(destX, destY);
                if (wCell && wCell.elevation > 0) continue;
            }

            // Pathfinding curto (limitar distância)
            if (typeof findPath === 'function') {
                var path = findPath(ex, ey, destX, destY);
                if (path && path.length > 0 && path.length <= wanderRadius + 2) {
                    if (typeof setEntityPath === 'function') {
                        setEntityPath(member, path);
                    } else if (typeof setEntityDestination === 'function') {
                        setEntityDestination(member, destX, destY);
                    }
                }
            }
        }
    }
}

// === UPDATE PRINCIPAL (chamada do game loop) ===
function updateSpawnSystem() {
    var now = Date.now();

    // Não rodar durante combate
    if (typeof combatState !== 'undefined' && combatState.active) return;
    if (typeof simState !== 'undefined' && simState.active) return;
    if (typeof simCombatState !== 'undefined' && simCombatState.active) return;

    // 1. Processar respawn queue
    for (var i = respawnQueue.length - 1; i >= 0; i--) {
        if (now >= respawnQueue[i].respawnAt) {
            respawnQueue.splice(i, 1);
        }
    }

    // 2. Limpar grupos mortos
    for (var i = monsterGroups.length - 1; i >= 0; i--) {
        if (monsterGroups[i].state === 'dead') {
            monsterGroups.splice(i, 1);
        }
    }

    // 3. Tentar spawns (throttled a cada 5s)
    if (now - _lastSpawnCheck >= 5000) {
        _lastSpawnCheck = now;
        if (typeof currentMapData !== 'undefined' && currentMapData && currentMapData.regions) {
            for (var ri = 0; ri < currentMapData.regions.length; ri++) {
                var region = currentMapData.regions[ri];
                var config = region.spawnConfig;
                if (!config || !config.families || config.families.length === 0) continue;

                if (!_spawnTimers[region.id]) _spawnTimers[region.id] = { lastSpawnAttempt: 0 };
                var spawnInterval = config.spawnIntervalMs || DEFAULT_SPAWN_CONFIG.spawnIntervalMs;
                if (now - _spawnTimers[region.id].lastSpawnAttempt < spawnInterval) continue;

                _spawnTimers[region.id].lastSpawnAttempt = now;
                trySpawnGroup(region);
            }
        }
    }

    // 4. Atualizar wandering
    _updateGroupWandering(now);
}

// === INTEGRAÇÃO COM COMBATE ===

// Encontra o grupo de um monstro pelo groupId da entidade
function getGroupByMember(entity) {
    if (!entity || !entity.groupId) return null;
    for (var i = 0; i < monsterGroups.length; i++) {
        if (monsterGroups[i].id === entity.groupId) return monsterGroups[i];
    }
    return null;
}

// Retorna todos os membros do grupo para passar ao startCombat
function getGroupMembersForCombat(entity) {
    var group = getGroupByMember(entity);
    if (!group) return [entity];
    return group.members.slice();
}

// Marca grupo como em combate
function markGroupInCombat(entity) {
    var group = getGroupByMember(entity);
    if (group) group.state = 'in_combat';
}

// Chamada quando o jogador vence — remove grupo e agenda respawn
function onCombatVictory() {
    if (typeof combatState === 'undefined' || !combatState.enemies || combatState.enemies.length === 0) return;

    var firstEnemy = combatState.enemies[0];
    var group = getGroupByMember(firstEnemy);

    if (!group) {
        // Monstro legado sem grupo — só remove
        _removeEntityFromWorld(firstEnemy);
        return;
    }

    group.state = 'dead';

    // Remove todos os membros do entities[] global
    for (var mi = 0; mi < group.members.length; mi++) {
        _removeEntityFromWorld(group.members[mi]);
    }

    // Agendar respawn
    var config = _getRegionConfig(group.regionId);
    var delay = config.respawnDelayMs || DEFAULT_SPAWN_CONFIG.respawnDelayMs;
    respawnQueue.push({
        regionId: group.regionId,
        killedTime: Date.now(),
        respawnAt: Date.now() + delay
    });
}

// Chamada quando o jogador perde/desiste — grupo volta ao normal
function onCombatDefeatOrSurrender() {
    if (typeof combatState === 'undefined' || !combatState.enemies || combatState.enemies.length === 0) return;

    var firstEnemy = combatState.enemies[0];
    var group = getGroupByMember(firstEnemy);

    if (group) {
        group.state = 'alive';
        // Restaurar HP de todos os membros
        for (var mi = 0; mi < group.members.length; mi++) {
            group.members[mi].hp = group.members[mi].maxHp;
        }
    }
}

// Remove entidade do array global entities[]
function _removeEntityFromWorld(entity) {
    if (typeof entities === 'undefined') return;
    var idx = entities.indexOf(entity);
    if (idx !== -1) entities.splice(idx, 1);
}

// === HELPERS ===
function _getRegionConfig(regionId) {
    if (typeof currentMapData === 'undefined' || !currentMapData || !currentMapData.regions) return DEFAULT_SPAWN_CONFIG;
    for (var i = 0; i < currentMapData.regions.length; i++) {
        if (currentMapData.regions[i].id === regionId) {
            return currentMapData.regions[i].spawnConfig || DEFAULT_SPAWN_CONFIG;
        }
    }
    return DEFAULT_SPAWN_CONFIG;
}

function _getRegionBounds(regionId) {
    if (typeof currentMapData === 'undefined' || !currentMapData || !currentMapData.regions) return null;
    for (var i = 0; i < currentMapData.regions.length; i++) {
        if (currentMapData.regions[i].id === regionId) return currentMapData.regions[i].bounds;
    }
    return null;
}

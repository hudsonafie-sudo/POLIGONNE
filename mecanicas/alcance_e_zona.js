// ========== SISTEMA DE ALCANCE E ZONA ==========
// Calculo de alcance de habilidades, AoE e targeting
// Deps runtime: combatState, COMBAT_GRID_SIZE, GRID_SIZE, hasLineOfSight, isInShapeRange,
//               simState, simCombatState, playerEntity, entities
// !! PERFORMANCE: funcoes deste arquivo rodam TODO FRAME (hover, preview AoE).
// !! NUNCA adicionar console.log aqui. Causa lag severo mesmo com DevTools fechado.

// 16 setores de 22.5 graus cada, medidos de +X (direita) no sentido horario
// Template base: cardinal=direita, diagonal=baixo-direita, inter=entre dir e diag
// Transformacao: se swap, troca dx<->dy primeiro, depois multiplica por sx,sy
const ZONE_DIRECTION_MAP = [
    { template: 'cardinal', sx: 1, sy: 1, swap: false },   // 0: direita
    { template: 'inter',    sx: 1, sy: 1, swap: false },   // 1: entre dir e diag-dir
    { template: 'diagonal', sx: 1, sy: 1, swap: false },   // 2: baixo-direita
    { template: 'inter',    sx: 1, sy: 1, swap: true },    // 3: entre diag-dir e baixo
    { template: 'cardinal', sx: -1, sy: 1, swap: true },   // 4: baixo
    { template: 'inter',    sx: -1, sy: 1, swap: true },   // 5: entre baixo e diag-esq
    { template: 'diagonal', sx: -1, sy: 1, swap: false },  // 6: baixo-esquerda
    { template: 'inter',    sx: -1, sy: 1, swap: false },  // 7: entre diag-esq e esq
    { template: 'cardinal', sx: -1, sy: -1, swap: false }, // 8: esquerda
    { template: 'inter',    sx: -1, sy: -1, swap: false }, // 9: entre esq e diag-esq-cima
    { template: 'diagonal', sx: -1, sy: -1, swap: false }, // 10: cima-esquerda
    { template: 'inter',    sx: -1, sy: -1, swap: true },  // 11: entre diag-esq-cima e cima
    { template: 'cardinal', sx: 1, sy: -1, swap: true },   // 12: cima
    { template: 'inter',    sx: 1, sy: -1, swap: true },   // 13: entre cima e diag-dir-cima
    { template: 'diagonal', sx: 1, sy: -1, swap: false },  // 14: cima-direita
    { template: 'inter',    sx: 1, sy: -1, swap: false },  // 15: entre diag-dir-cima e dir
];

function transformZoneCell(dx, dy, t) {
    let ndx = dx, ndy = dy;
    if (t.swap) { ndx = dy; ndy = dx; }
    return { dx: ndx * t.sx, dy: ndy * t.sy };
}

function getDirectionSector(casterX, casterY, targetX, targetY) {
    const ddx = targetX - casterX;
    const ddy = targetY - casterY;
    if (ddx === 0 && ddy === 0) return 0;
    let angle = Math.atan2(ddy, ddx) * 180 / Math.PI;
    if (angle < 0) angle += 360;
    return Math.round(angle / 22.5) % 16;
}

// Calcula celulas no alcance de uma habilidade
function getAbilityRangeCells(spell, casterX, casterY) {
    const cx = Math.floor(casterX);
    const cy = Math.floor(casterY);
    const cells = [];
    const currentGridSize = combatState.active ? COMBAT_GRID_SIZE : GRID_SIZE;
    const shape = spell.rangeShape || spell.rangeType || 'cross';
    let minR = spell.minRange || 0;
    let maxR = spell.maxRange != null ? spell.maxRange : 1;

    // Aplica atributo "alcance" se feitico tem alcance modificavel
    if (spell.rangeModifiable) {
        let rangeBonus = 0;
        if (typeof simCombatState !== 'undefined' && simCombatState.active) {
            const cp = simCombatState.participants[simCombatState.currentIndex];
            rangeBonus = (cp.entity.stats && cp.entity.stats.range) || 0;
        } else if (combatState.active) {
            const isMonsterTurn = combatState.turnOrder && combatState.turnOrder.length > 0 &&
                combatState.turnOrder[combatState.currentTurnIndex] &&
                combatState.turnOrder[combatState.currentTurnIndex].type === 'monster';
            if (isMonsterTurn) {
                rangeBonus = (combatState.targetEnemy && combatState.targetEnemy.stats && combatState.targetEnemy.stats.range) || 0;
            } else if (typeof calculateTotalAttributes === 'function') {
                const { total } = calculateTotalAttributes();
                rangeBonus = total.range || 0;
            }
            // Adiciona rangeBonus de passivos equipados (ex: Olho de Águia +2 range)
            if (typeof combatState !== 'undefined' && combatState.passiveBoosts && combatState.passiveBoosts._rangeBonus) {
                rangeBonus += combatState.passiveBoosts._rangeBonus;
            }
        }
        if (rangeBonus > 0) {
            maxR += rangeBonus;
        } else if (rangeBonus < 0) {
            maxR = Math.max(maxR + rangeBonus, minR);
        }
    }

    const needsLoS = spell.requiresLoS !== false; // default true

    for (let dx = -maxR; dx <= maxR; dx++) {
        for (let dy = -maxR; dy <= maxR; dy++) {
            const nx = cx + dx;
            const ny = cy + dy;
            if (nx < 0 || nx >= currentGridSize || ny < 0 || ny >= currentGridSize) continue;

            // minRange=0: inclui celula do caster
            if (dx === 0 && dy === 0) {
                if (minR === 0) {
                    cells.push({ x: nx, y: ny, dist: 0, hasEnemy: false, blocked: false });
                }
                continue;
            }

            let dist;
            let valid = true;
            switch (shape) {
                case 'circle':
                    dist = Math.abs(dx) + Math.abs(dy); break;       // Diamante (Manhattan)
                case 'cross':
                    dist = Math.abs(dx) + Math.abs(dy); break;       // Compat: igual a circle
                case 'square':
                    dist = Math.max(Math.abs(dx), Math.abs(dy)); break; // Quadrado (Chebyshev)
                case 'line':
                    if (dx !== 0 && dy !== 0) { valid = false; break; }
                    dist = Math.abs(dx) + Math.abs(dy); break;
                case 'diagonal':
                    if (Math.abs(dx) !== Math.abs(dy)) { valid = false; break; }
                    dist = Math.abs(dx); break;
                case 'star':
                    if (dx !== 0 && dy !== 0 && Math.abs(dx) !== Math.abs(dy)) { valid = false; break; }
                    dist = Math.max(Math.abs(dx), Math.abs(dy)); break;
                default:
                    dist = Math.abs(dx) + Math.abs(dy);
            }

            if (!valid) continue;
            if (dist < minR || dist > maxR) continue;

            // Bloqueador/buraco de terreno: marca como obstaculo para visualizacao
            const mapCell = getWorldCell(nx, ny);
            if (mapCell && (mapCell.obstacle === 'blocker' || mapCell.obstacle === 'hole')) {
                cells.push({ x: nx, y: ny, dist, hasEnemy: false, blocked: true, isObstacle: true });
                continue;
            }

            // LoS check - inclui celulas bloqueadas para mostrar em vermelho
            const blocked = needsLoS ? !hasLineOfSight(cx, cy, nx, ny) : false;
            const canHitEnemySpell = spell.targetEnemy !== false;
            const canHitAllySpell = spell.targetAlly === true;
            const hasEnemy = canHitEnemySpell && combatState.targetEnemy &&
                Math.floor(combatState.targetEnemy.x) === nx &&
                Math.floor(combatState.targetEnemy.y) === ny;
            const hasAlly = canHitAllySpell &&
                Math.floor(playerEntity.x) === nx &&
                Math.floor(playerEntity.y) === ny;
            const isObst = simState.active && simState.obstacles.has(`${nx},${ny}`);
            cells.push({ x: nx, y: ny, dist, hasEnemy, hasAlly, blocked, isObstacle: isObst });
        }
    }
    return cells;
}

// Calcula celulas afetadas pela AoE no ponto alvo
function getAoECells(spell, targetX, targetY, casterX, casterY) {
    if (!spell || spell.aoeType !== 'zone') {
        return [{ x: targetX, y: targetY }];
    }

    let offsets;
    if (spell.zonePattern === 'perpendicular' && casterX !== undefined && casterY !== undefined) {
        // Zona perpendicular: target + N cells de cada lado perpendicular à direção do cast
        const dx = targetX - casterX;
        const dy = targetY - casterY;
        let perpDx, perpDy;
        if (Math.abs(dx) >= Math.abs(dy)) {
            // Cast ao longo do eixo X → perpendicular é Y
            perpDx = 0; perpDy = 1;
        } else {
            // Cast ao longo do eixo Y → perpendicular é X
            perpDx = 1; perpDy = 0;
        }
        const w = spell.zoneWidth || 1;
        offsets = [];
        for (let i = -w; i <= w; i++) {
            if (i === 0) continue; // Centro já incluído por padrão
            offsets.push({ dx: perpDx * i, dy: perpDy * i });
        }
    } else if (spell.zoneDirectional && casterX !== undefined && casterY !== undefined) {
        const sector = getDirectionSector(casterX, casterY, targetX, targetY);
        const dirInfo = ZONE_DIRECTION_MAP[sector];
        let baseCells;
        if (dirInfo.template === 'cardinal') baseCells = spell.zoneCellsCardinal;
        else if (dirInfo.template === 'diagonal') baseCells = spell.zoneCellsDiagonal;
        else baseCells = spell.zoneCellsInterCardinal;
        if (!baseCells || baseCells.length === 0) baseCells = spell.zoneCells || [];
        offsets = baseCells.map(c => transformZoneCell(c.dx, c.dy, dirInfo));
    } else {
        offsets = spell.zoneCells || [];
    }

    if (offsets.length === 0) return [{ x: targetX, y: targetY }];

    const currentGridSize = combatState.active ? COMBAT_GRID_SIZE : GRID_SIZE;
    const cells = [{ x: targetX, y: targetY }];
    offsets.forEach(offset => {
        const nx = targetX + offset.dx;
        const ny = targetY + offset.dy;
        if (nx >= 0 && nx < currentGridSize && ny >= 0 && ny < currentGridSize) {
            if (!cells.find(c => c.x === nx && c.y === ny)) {
                cells.push({ x: nx, y: ny });
            }
        }
    });
    return cells;
}

// Encontra alvos validos nas celulas
function findTargetsInCells(cells, spell) {
    const targets = [];
    // Modo simulacao de combate: multi-entidade
    if (simCombatState.active) {
        const currentP = simCombatState.participants[simCombatState.currentIndex];
        const activeEntity = currentP.entity;
        const canHitEnemy = spell.targetEnemy !== undefined ? spell.targetEnemy : true;
        // Auto-derive canHitAlly from zoneEffects (dmgAlly/healAlly) para zonas
        const ze = spell.zoneEffects;
        const zoneNeedsAlly = ze && (ze.dmgAlly || ze.healAlly);
        const canHitAlly = spell.targetAlly !== undefined ? spell.targetAlly : (zoneNeedsAlly || false);
        const onlyZombies = spell.targetZombie === true; // Feitiços de revive
        cells.forEach(cell => {
            simCombatState.participants.forEach(p => {
                // Morto com desencarne pendente pode ser alvo de zona (reduz contador)
                if (simCombatState.entityStats[p.id].hp <= 0 && !(typeof isDesencarnePending === 'function' && isDesencarnePending(p.entity))) return;
                if (Math.floor(p.entity.x) !== cell.x || Math.floor(p.entity.y) !== cell.y) return;

                // Validação especial para feitiços de revive (só zumbis aliados)
                if (onlyZombies) {
                    const isAlly = (currentP.type === p.type);
                    const isZombie = p.entity.isZombie && !p.entity.isDead;
                    if (isAlly && isZombie && !targets.includes(p.entity)) {
                        targets.push(p.entity);
                    }
                    return;
                }

                if (p.entity === activeEntity) {
                    if (!targets.includes(p.entity)) targets.push(p.entity);
                } else {
                    // Summons são aliados dos players
                    var _cTeam = currentP.type === 'monster' ? 'monster' : 'player';
                    var _pTeam = p.type === 'monster' ? 'monster' : 'player';
                    const isAlly = (_cTeam === _pTeam);
                    if (isAlly && canHitAlly && !targets.includes(p.entity)) targets.push(p.entity);
                    if (!isAlly && canHitEnemy && !targets.includes(p.entity)) targets.push(p.entity);
                }
            });
        });
        return targets;
    }

    // Combate normal: determina quem esta atacando
    const canHitEnemy = spell.targetEnemy !== undefined ? spell.targetEnemy : true;
    // Auto-derive canHitAlly from zoneEffects (dmgAlly/healAlly) para zonas
    const ze = spell.zoneEffects;
    const zoneNeedsAlly = ze && (ze.dmgAlly || ze.healAlly);
    const canHitAlly = spell.targetAlly !== undefined ? spell.targetAlly : (zoneNeedsAlly || false);
    const onlyZombies = spell.targetZombie === true; // Feitiços de revive

    // Detecta se eh turno do monstro
    const isMonsterTurn = combatState.turnOrder && combatState.turnOrder.length > 0 &&
                          combatState.turnOrder[combatState.currentTurnIndex] &&
                          combatState.turnOrder[combatState.currentTurnIndex].type === 'monster';

    // Lista de todos os inimigos vivos
    const allEnemies = combatState.enemies && combatState.enemies.length > 0
        ? combatState.enemies
        : (combatState.targetEnemy ? [combatState.targetEnemy] : []);

    cells.forEach(cell => {
        // Validação especial para feitiços de revive (só zumbis aliados)
        if (onlyZombies) {
            // Verifica player
            if (!isMonsterTurn && Math.floor(playerEntity.x) === cell.x && Math.floor(playerEntity.y) === cell.y) {
                if (playerEntity.isZombie && !playerEntity.isDead && !targets.includes(playerEntity)) {
                    targets.push(playerEntity);
                }
            }
            // Verifica monstros aliados (se for turno de monstro)
            if (isMonsterTurn) {
                for (var ei = 0; ei < allEnemies.length; ei++) {
                    var enemy = allEnemies[ei];
                    if (!enemy) continue;
                    if (Math.floor(enemy.x) === cell.x && Math.floor(enemy.y) === cell.y) {
                        if (enemy.isZombie && !enemy.isDead && !targets.includes(enemy)) {
                            targets.push(enemy);
                        }
                    }
                }
            }
            return; // Não verifica alvos normais se é spell de revive
        }

        // Verifica player na celula (lógica normal)
        if (Math.floor(playerEntity.x) === cell.x && Math.floor(playerEntity.y) === cell.y) {
            const shouldAddPlayer = isMonsterTurn ? canHitEnemy :
                (canHitAlly || (spell.zoneEffects && (spell.zoneEffects.dmgCaster || spell.zoneEffects.healCaster)));
            if (shouldAddPlayer && !targets.includes(playerEntity)) {
                targets.push(playerEntity);
            }
        }

        // Verifica TODOS os inimigos (monstros) na celula
        for (var ei = 0; ei < allEnemies.length; ei++) {
            var enemy = allEnemies[ei];
            if (!enemy) continue;
            // Morto com desencarne pendente pode ser alvo (reduz contador)
            if (enemy.hp <= 0 && !(typeof isDesencarnePending === 'function' && isDesencarnePending(enemy))) continue;
            if (Math.floor(enemy.x) === cell.x && Math.floor(enemy.y) === cell.y) {
                var shouldAddMonster = isMonsterTurn ?
                    (canHitAlly || (spell.zoneEffects && (spell.zoneEffects.dmgCaster || spell.zoneEffects.healCaster))) :
                    canHitEnemy;
                // Se o monstro atacante esta nesta celula, tratar como caster
                if (isMonsterTurn && combatState.turnOrder[combatState.currentTurnIndex] &&
                    combatState.turnOrder[combatState.currentTurnIndex].entity === enemy) {
                    shouldAddMonster = canHitAlly || (spell.zoneEffects && (spell.zoneEffects.dmgCaster || spell.zoneEffects.healCaster));
                }
                if (shouldAddMonster && !targets.includes(enemy)) {
                    targets.push(enemy);
                }
            }
        }
    });

    return targets;
}

// Normaliza campos de um feitico (defaults + conversao de formato legado)
function normalizeSpell(spell) {
    spell.spellType = spell.spellType || 'active';
    spell.castType = 'targeted'; // Todos ativos sao lancados
    spell.rangeShape = spell.rangeShape || spell.rangeType || 'cross';
    spell.aoeType = spell.aoeType || 'single';
    spell.zoneCells = spell.zoneCells || [];
    spell.pushPull = spell.pushPull || null;
    spell.passiveEffect = spell.passiveEffect || null;
    spell.pmCost = spell.pmCost || 0;
    spell.peCost = spell.peCost || 0;
    spell.element = spell.element || 'none';
    spell.classTag = spell.classTag || '';
    // Converter targetType legado para novo formato
    if (spell.targetType && spell.targetAlly === undefined) {
        spell.targetEnemy = spell.targetType === 'enemy' || spell.targetType === 'both' || spell.targetType === 'none';
        spell.targetAlly = spell.targetType === 'ally' || spell.targetType === 'both';
    }
    spell.targetEnemy = spell.targetEnemy !== undefined ? spell.targetEnemy : true;
    spell.targetAlly = spell.targetAlly !== undefined ? spell.targetAlly : false;
    // zoneEffects dmgAlly/healAlly implica que aliados DEVEM ser alvo
    var _ze = spell.zoneEffects;
    if (_ze && (_ze.dmgAlly || _ze.healAlly)) {
        spell.targetAlly = true;
    }
    spell.needsTarget = spell.needsTarget !== undefined ? spell.needsTarget : true;
    spell.requiresLoS = spell.requiresLoS !== undefined ? spell.requiresLoS : true;
    if (!spell.zoneEffects) {
        spell.zoneEffects = {
            dmgCaster: false, dmgAlly: false, dmgEnemy: true,
            healCaster: false, healAlly: false, healEnemy: false,
            lifeSteal: false
        };
    }
    // Cooldown defaults
    if (spell.cooldown === undefined) spell.cooldown = 0;
    if (spell.castsPerTurn === undefined) spell.castsPerTurn = 99;
    if (spell.castsPerTarget === undefined) spell.castsPerTarget = 99;
    if (spell.initialCooldown === undefined) spell.initialCooldown = 0;
    spell.effects = spell.effects || null;
    spell.armorGrant = spell.armorGrant || null;
    spell.armorSteal = spell.armorSteal || null;
    spell.paSteal = spell.paSteal || 0;
    spell.pmSteal = spell.pmSteal || 0;
    spell.stealFixed = spell.stealFixed || false;
    spell.peGrant = spell.peGrant || 0;
    spell.bonusVsArmored = spell.bonusVsArmored || 0;
    spell.berserk = spell.berserk || 0;
    spell.intacto = spell.intacto || 0;
    spell.morteEminente = spell.morteEminente || 0;
    spell.firmeEForte = spell.firmeEForte || 0;
    spell.rangeModifiable = spell.rangeModifiable || false;
    return spell;
}

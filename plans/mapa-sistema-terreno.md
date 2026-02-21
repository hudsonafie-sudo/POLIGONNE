# Plano: Sistema de Mapa com Terreno Rico

## Resumo do que o Usuário Quer

1. **Mapa de exploração 100x100** (atualmente 60x60)
2. **Elevação puramente visual** - tudo no mesmo plano lógico, sem afetar movimentação
3. **Bloqueios mecânicos** continuam: buracos, objetos, barreiras de borda
4. **Mapas de combate** são uma fração do mapa de exploração - cada região tem mapas de combate específicos
5. **Sistema de regiões** - cada região do mundo tem seus monstros e mapas de combate associados
6. **Editor visual** para pintar o mapa com as ferramentas

## O que Já Existe (e funciona)

- `cell.obstacle`: blocker, hole, barrier, oneway, ramp, transition
- `cell.elevation`: elevação numérica (afeta movimentação atualmente)
- `cell.barriers[]`: barreiras de borda (corredor)
- `cell.terrainType`: grass, stone, sand, water, dirt
- `cell.visualType`: tree, rock, grass, flower, sign
- `canMoveFromTo()` com lógica completa de elevação, barreiras e rampas
- Editor de mapa mundo + editor de mapa de combate
- Sistema de regiões com bounds, combatMapId, spawnConfig
- Renderização isométrica via PixiJS

## Mudanças Necessárias

### Passo 1: Aumentar Grid para 100x100
**Arquivo:** `mapas/mundo/cidade/cidade.js`
- Mudar `gridSize: 60` → `gridSize: 100`
- Mudar `defaultSpawn: { x: 30, y: 30 }` → `{ x: 50, y: 50 }`
- Atualizar bounds da região padrão: `x2: 59, y2: 59` → `x2: 99, y2: 99`

**Arquivo:** `jogo/dev.html`
- Mudar `const GRID_SIZE = 60` → `const GRID_SIZE = 100`

### Passo 2: Elevação Puramente Visual
**Arquivo:** `mecanicas/terreno.js`
- Mudar `MAX_ELEV_CLIMB = 0` → `MAX_ELEV_CLIMB = 999` (ou remover checagem)
- Mudar `MAX_ELEV_DROP = 1` → `MAX_ELEV_DROP = 999` (ou remover checagem)
- Manter a lógica de renderização visual (ELEVATION_PIXEL_OFFSET) como está

**Arquivo:** `jogo/dev.html` (em `canMoveFromTo`)
- Remover ou desativar o bloco de restrição de elevação (linhas ~11064-11086)
- Manter barreiras e blockers funcionando normalmente
- Rampas podem virar puramente decorativas (visual de transição suave)

**Resultado:** Elevação muda a aparência visual dos tiles (mais alto/baixo) mas não bloqueia movimento. Bloqueio real fica por conta de `obstacle: 'blocker'`, `'hole'`, e `barriers[]`.

### Passo 3: Criar Regiões da Cidade
**Arquivo:** `mapas/mundo/cidade/cidade.js`
- Dividir o mapa 100x100 em 4 regiões (exemplo):
  - `centro`: bounds 35-65, combate com monstros T1
  - `norte`: bounds 0-34 (topo), monstros T1-T2
  - `sul`: bounds 66-99 (baixo), monstros T2
  - `floresta`: bounds lateral, monstros T2-T3

Cada região terá:
```js
{
    id: 'centro',
    name: 'Centro da Cidade',
    bounds: { x1: 35, y1: 35, x2: 65, y2: 65 },
    combatMapId: 'cidade_centro',
    spawnConfig: { ... }
}
```

### Passo 4: Criar Mapas de Combate por Região
**Arquivos novos:** `mapas/mundo/cidade/combate/centro.js`, `norte.js`, `sul.js`, `floresta.js`

Cada arquivo define um `COMBAT_MAP_*` com:
- `gridSize: 20`
- `cells: []` (a serem desenhados no editor)
- `playerSpawns: []`
- `enemySpawns: []`

**Arquivo:** `mapas/_registry.js` - adicionar todos os novos mapas

### Passo 5: Novos Tipos de Terreno Visual
**Arquivo:** `mecanicas/terreno.js`
- Adicionar tipos: `snow` (neve), `swamp` (pântano), `lava` (lava), `ice` (gelo), `wood` (madeira/piso)
- Cada tipo com 4 variantes de cor (top, left, right, stroke)

### Passo 6: Novos Tipos de Visual Decorativo
**Arquivo:** `jogo/dev.html` (no select map-visual-type)
- Adicionar: `bush` (arbusto), `barrel` (barril), `crate` (caixote), `lamp` (lampião), `fountain` (fonte), `statue` (estátua)
- Esses são puramente visuais, não bloqueiam

### Passo 7: "Água Rasa" como Terreno Transitável
- `terrainType: 'water'` → puramente visual, NÃO bloqueia
- Se quiser água profunda (intransitável) → usa `obstacle: 'hole'` + `terrainType: 'water'`
- Permite criar rios rasos decorativos que o jogador pode atravessar

## Ordem de Implementação

1. **Passo 1** - Grid 100x100 (rápido, 3 linhas)
2. **Passo 2** - Elevação visual (remover restrição de movimento)
3. **Passo 5** - Novos terrenos visuais
4. **Passo 3** - Regiões da cidade
5. **Passo 4** - Mapas de combate por região
6. **Passo 6** - Decorações novas no editor

## Impacto em Performance

- Grid 100x100 = 10.000 células (vs 3.600 atual) → ~2.8x mais
- O sistema já usa frustum culling (só renderiza tiles visíveis)
- Só armazena células modificadas (sparse)
- Não deve ter impacto notável

## O que NÃO muda

- Sistema de pathfinding A* (funciona em qualquer tamanho)
- Sistema de barreiras (continua igual)
- Editor de mapa (funciona com qualquer gridSize)
- Sistema de combate (continua usando mapa 20x20 de região)
- Renderização isométrica PixiJS

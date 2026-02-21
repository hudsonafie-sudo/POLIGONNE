# Sistema de Sprites — Especificacao Completa

> Documento de referencia obrigatoria para criacao de sprites de personagens e monstros.
> Consulte SEMPRE este arquivo antes de criar ou modificar sprites.

---

## 1. Visao Geral

O jogo usa grid isometrico com tiles de **64x32px** (TILE_WIDTH x TILE_HEIGHT).
Atualmente entidades sao desenhadas com primitivas geometricas (`drawPawn()`).
O sistema de sprites substituira isso por sprite sheets animados, mantendo
compatibilidade com o renderizador PixiJS ja existente.

### Constantes de referencia (dev.html)
```
TILE_WIDTH = 64        // largura do tile isometrico
TILE_HEIGHT = 32       // altura do tile isometrico
HALF_TW = 32           // metade da largura
HALF_TH = 16           // metade da altura
ELEVATION_PIXEL_OFFSET = 12   // pixels por unidade de elevacao
```

---

## 2. Direcoes e Espelhamento

### 2.1 As 8 direcoes

```
         4 (N)
    5 (NW)   3 (NE)
       \      /
  6 (W) — o — 2 (E)
       /      \
    7 (SW)   1 (SE)
         0 (S)
```

IDs de direcao (sentido horario a partir de S):
| ID | Direcao | Desenhar? | Espelho de |
|----|---------|-----------|------------|
| 0  | S       | SIM       | —          |
| 1  | SE      | SIM       | —          |
| 2  | E       | SIM       | —          |
| 3  | NE      | SIM       | —          |
| 4  | N       | SIM       | —          |
| 5  | NW      | NAO       | flipX de NE (3) |
| 6  | W       | NAO       | flipX de E (2)  |
| 7  | SW      | NAO       | flipX de SE (1) |

### 2.2 Regra de espelhamento

**Desenhar apenas 5 direcoes** (S, SE, E, NE, N).
As outras 3 (SW, W, NW) sao espelhamento horizontal (flipX) das correspondentes.

```javascript
// Mapa de resolucao: direcao real → direcao do sprite + flip
const DIR_MIRROR = [
    { spriteDir: 0, flipX: false },  // 0: S
    { spriteDir: 1, flipX: false },  // 1: SE
    { spriteDir: 2, flipX: false },  // 2: E
    { spriteDir: 3, flipX: false },  // 3: NE
    { spriteDir: 4, flipX: false },  // 4: N
    { spriteDir: 3, flipX: true  },  // 5: NW = flip NE
    { spriteDir: 2, flipX: true  },  // 6: W  = flip E
    { spriteDir: 1, flipX: true  },  // 7: SW = flip SE
];
```

**Economia: 37.5%** — de 8 sprites por animacao, desenha so 5.

### 2.3 Itens assimetricos (armas, escudos)

Quando um personagem segura algo numa mao especifica (ex: escudo na esquerda),
o espelhamento pode criar inconsistencia visual (escudo troca de lado).

**Solucoes recomendadas (escolher 1):**
- **A) Ignorar** — em pixel art pequeno (48px) quase ninguem nota
- **B) Desenhar 8 direcoes completas** apenas para personagens do jogador (que tem equipamento visivel)
- **C) Layer separado** para itens de mao, espelhado independentemente

**Recomendacao**: Usar solucao A para monstros (sempre espelhar) e B apenas para
as classes do jogador se necessario. Monstros nao seguram itens assimetricos
de forma perceptivel a 48px.

---

## 3. Animacoes Necessarias

### 3.1 Lista de animacoes por entidade

| ID  | Animacao      | Direcoes | Frames | Uso |
|-----|---------------|----------|--------|-----|
| idle | Parado       | 1 (S)   | 2-3    | Respiracao/bobbing sutil |
| walk | Andar        | 5 (espelho) | 3-4 | Movimento entre tiles |
| cast | Lancar feitico | 5 (espelho) | 3-4 | Uso de habilidade/feitico |
| jump | Saltar/cair  | **ver 3.2** | **ver 3.2** | Mudanca de elevacao |
| hurt | Tomar dano   | 1-2     | 2-3    | Ao receber hit |
| die  | Morrer       | 1       | 3-4    | HP chega a zero |

### 3.2 Salto e queda (mudanca de elevacao)

**Recomendacao: NAO criar sprites separados para salto/queda.**

Em vez disso, usar o sprite de **walk** ou **idle** combinado com:
- **Deslocamento vertical** (translateY) no render — sobe e desce suavemente
- **Sombra no chao** encolhe quando sobe, cresce quando desce
- **Squash/stretch** sutil (scaleX/scaleY) no pouso

Isso elimina ~15 frames por personagem e fica visualmente bom.

```javascript
// Pseudo-codigo de salto via transformacao
function renderJump(sprite, jumpProgress) {
    // jumpProgress: 0.0 (inicio) → 0.5 (apice) → 1.0 (pouso)
    const arcHeight = 20; // pixels no apice
    const yOffset = -Math.sin(jumpProgress * Math.PI) * arcHeight;

    sprite.y += yOffset;
    sprite.shadow.scale = 1.0 - (Math.abs(yOffset) / arcHeight) * 0.4;

    // Squash no pouso
    if (jumpProgress > 0.9) {
        const t = (jumpProgress - 0.9) / 0.1;
        sprite.scaleX = 1.0 + t * 0.15;
        sprite.scaleY = 1.0 - t * 0.10;
    }
}
```

### 3.3 Tomar dano — por tipo de corpo

Em vez de animar hurt separadamente por monstro, usar **1 animacao por tipo de corpo**
combinada com efeitos visuais:

| Tipo de corpo | Monstros | Animacao hurt |
|---------------|----------|---------------|
| humanoide     | Esqueleto, Goblin, Troll, Ogro | Recuo para tras + inclinar |
| quadrupede    | Rato, Lobo, Javali, Urso, Lagarto | Encolher + recuo |
| voador        | Morcego, Harpia | Tombar no ar + flutter |
| rastejante    | Cobra, Barata, Aranha | Achatar + tremer |
| vegetal       | Cogumelo, Planta | Balançar + chacoalhar |
| amorfo        | Sapo, Golem | Comprimir + expandir (squash) |

**Efeitos visuais complementares (aplicados a TODOS):**
- Flash branco (2 frames, misturar cor branca)
- Shake horizontal (3px, 2 ciclos)
- Particulas de dano (opcionais, faiscas ou fragmentos)

### 3.4 Contagem total de frames

**Por entidade (com todas as economias):**
| Animacao | Dirs desenhadas | Frames | Subtotal |
|----------|-----------------|--------|----------|
| idle     | 1               | 3      | 3        |
| walk     | 5               | 4      | 20       |
| cast     | 5               | 4      | 20       |
| hurt     | 1               | 3      | 3        |
| die      | 1               | 4      | 4        |
| **Total** |                |        | **50 frames** |

---

## 4. Palette Swap (Troca de Paleta)

### 4.1 Conceito

Cada familia de monstro tem 3 variantes (normal, elite, boss).
Em vez de desenhar 3 sprites separados, **desenha-se 1 e troca a paleta de cores**.

**Economia: 66% por familia** — desenha 1 sprite base, gera 3 variantes.

### 4.2 Como funciona

O sprite base usa **cores-chave indexadas** que sao substituidas em runtime:

```javascript
// Sprite base do Rato usa estas cores-chave:
const PALETTE_KEYS = {
    body:    '#FF0000',  // vermelho puro = cor do corpo
    detail:  '#00FF00',  // verde puro = detalhes (olhos, garras)
    accent:  '#0000FF',  // azul puro = acentos (barriga, orelhas)
    outline: '#000000',  // preto = contorno (mantido em todas)
};

// Paletas por variante:
const RATO_PALETTES = {
    normal: { body: '#888888', detail: '#aa4444', accent: '#aaaaaa' },
    elite:  { body: '#665544', detail: '#ffcc00', accent: '#887766' },
    boss:   { body: '#cc2222', detail: '#ffffff', accent: '#ff6666' },
};
```

### 4.3 Implementacao

**Opcao A — Pre-gerado (recomendado para o jogo):**
- No build/carregamento, gerar as variantes como texturas PixiJS separadas
- Iterar pixel a pixel no canvas offscreen, trocar cores-chave
- Cachear como `PIXI.Texture`

**Opcao B — Shader (avancado):**
- Usar fragment shader que faz lookup de cor
- Mais flexivel mas mais complexo

**Recomendacao: Opcao A**, mais simples e suficiente para o volume de sprites.

---

## 5. Tamanho dos Sprites e Proporcao no Grid

### 5.1 Tamanho base do frame

**Frame padrao: 48 x 48 pixels** (sem escala)

Este tamanho permite:
- Detalhamento suficiente para pixel art
- Boa legibilidade a zoom normal
- Margem para criaturas maiores (overflow controlado)

### 5.2 Categorias de tamanho

Cada monstro/personagem tem uma **categoria de tamanho** que define a escala
e o overflow visual em relacao ao tile:

| Categoria | Escala | Altura visual | Largura base | Exemplos |
|-----------|--------|---------------|--------------|----------|
| **tiny** (minusculo) | 0.6x | ~29px | ~29px | Rato, Barata |
| **small** (pequeno)  | 0.8x | ~38px | ~38px | Cogumelo, Sapo, Cobra, Aranha |
| **medium** (medio)   | 1.0x | ~48px | ~48px | Lobo, Goblin, Esqueleto, Morcego, Planta |
| **large** (grande)   | 1.3x | ~62px | ~62px | Javali, Urso, Troll, Lagarto |
| **huge** (enorme)    | 1.6x | ~77px | ~77px | Golem, Ogro, Harpia (envergadura) |
| **player** (jogador) | 1.0x | ~48px | ~48px | Todas as classes |

### 5.3 Overflow visual — Criatura grande na celula

**REGRA CRITICA: Toda criatura ocupa exatamente 1 celula na LOGICA do jogo.**
O tamanho visual (sprite) e apenas estetico e pode ultrapassar os limites do tile.

```
  Tile isometrico (64x32):
       /\
      /  \
     /    \
    / tile \
    \      /
     \    /
      \  /
       \/

  Criatura "medium" (1.0x) — cabe bem no tile:
       /\
      /  \
     / ██ \
    / ████ \
    \ ████ /
     \ ██ /
      \  /
       \/

  Criatura "large" (1.3x) — overflow controlado:
      ████
     /████\
    /██████\
   /████████\       ← base ultrapassa ~15% de cada lado
    \██████/
     \████/
      \██/
       \/

  Criatura "huge" (1.6x) — overflow significativo:
    ████████
   /████████\
  /██████████\
 /████████████\     ← base ultrapassa ~30% de cada lado
  \██████████/
   \████████/
    \██████/
     \████/
      \██/
```

### 5.4 Ancoragem (anchor point)

O sprite e ancorado pelo **centro-inferior** (pes da criatura), que corresponde
ao centro do tile isometrico:

```javascript
sprite.anchor.set(0.5, 1.0);  // centro-X, base-Y
```

Isso garante que:
- A base da criatura fica no centro do tile
- Criaturas maiores "crescem para cima", nao para os lados
- O z-ordering funciona corretamente (base no tile, corpo sobe)

### 5.5 Sombra no chao

Toda criatura tem uma **sombra eliptica** no chao que ajuda a situa-la no tile:

```javascript
// Sombra proporcional ao tamanho
const SHADOW_CONFIG = {
    tiny:   { width: 20, height: 10, opacity: 0.25 },
    small:  { width: 26, height: 13, opacity: 0.28 },
    medium: { width: 32, height: 16, opacity: 0.30 },
    large:  { width: 42, height: 21, opacity: 0.33 },
    huge:   { width: 52, height: 26, opacity: 0.35 },
};
// Sombra sempre desenhada ANTES do sprite (abaixo visualmente)
// Cor: preto com alpha = opacity
```

A sombra ajuda o jogador a entender ONDE a criatura esta mesmo quando o sprite
e maior que o tile.

---

## 6. Z-Ordering e Sobreposicao (Depth Sorting)

### 6.1 Problema

No grid isometrico, entidades em linhas diferentes se sobrepoem visualmente.
Uma criatura na linha Y=5 deve aparecer ATRAS de uma na linha Y=6
(que esta "mais perto da camera").

```
  Vista isometrica:

  Y=3:     /\        ← mais longe (atras)
           ||
  Y=4:    /||\
          ||||
  Y=5:   /||||\      ← meio
         ||||||
  Y=6:  /||||||\     ← mais perto (frente)
```

### 6.2 Formula de profundidade (zIndex)

O jogo ja usa esta formula no entityLayer do PixiJS:

```javascript
// entityLayer tem sortableChildren = true
sprite.zIndex = entity.y * 1000 + entity.x;
```

**Regra:** Y maior = zIndex maior = desenhado por cima (mais na frente).
Em caso de empate no Y, X maior = mais na frente (porque no isometrico,
tiles com X maior estao "mais a frente" visualmente na diagonal).

### 6.3 Elevacao e profundidade

Criaturas em elevacoes diferentes no mesmo Y precisam de ajuste:

```javascript
// Entidade em tile elevado deve ficar visualmente "acima" mas no mesmo depth
// A elevacao NAO altera o zIndex — apenas desloca o sprite para cima
sprite.zIndex = entity.y * 1000 + entity.x;  // sem elevacao
sprite.y -= getCellElevation(entity.x, entity.y) * ELEVATION_PIXEL_OFFSET;
```

**Excecao**: Se duas criaturas estao no mesmo tile (Y,X) mas em elevacoes
diferentes (ex: rampas), a de elevacao maior deve ter zIndex ligeiramente maior:

```javascript
const elevation = getCellElevation(entity.x, entity.y);
sprite.zIndex = entity.y * 1000 + entity.x + elevation * 0.1;
```

### 6.4 Criaturas grandes e sobreposicao

Criaturas "large" e "huge" tem sprites que ultrapassam os limites do tile.
Isso pode causar sobreposicao visual estranha com tiles adjacentes.

**Solucao: O zIndex resolve naturalmente.**
Como o zIndex e baseado na posicao do TILE (nao do pixel), criaturas na mesma
linha se sobrepoem corretamente. O overflow visual e apenas estetico.

**Caso problematico: criatura grande atras de criatura pequena**
```
  Golem (huge) em Y=4    Rato (tiny) em Y=5
       ████
      ██████
     ████████             Se o Golem e alto, seu sprite
      ██████              pode "vazar" sobre o Rato.
       ████
                ▪▪        Mas como Y_golem < Y_rato,
                ▪▪        o Rato e desenhado POR CIMA.
                          → Visualmente correto!
```

Isso funciona porque o PixiJS respeita o zIndex: o Rato (Y=5, zIndex=5000)
e desenhado apos o Golem (Y=4, zIndex=4000), ficando na frente.

### 6.5 Linha de visao vs sobreposicao visual

**IMPORTANTE: Sobreposicao visual NAO e o mesmo que bloqueio de linha de visao.**

- **Sobreposicao visual** = qual sprite aparece na frente (resolvido por zIndex)
- **Linha de visao (LoS)** = mecanica de jogo, calculada no grid logico

O sprite de uma criatura grande pode "tampar" visualmente outra criatura
para o jogador humano, mas isso NAO afeta a mecanica de LoS do jogo.

**Para ajudar o jogador a ver criaturas "atras" de outras grandes:**
- Tooltip/highlight ao passar o mouse sobre qualquer tile com entidade
- Outline colorido (borda de 1-2px) em criaturas que estao parcialmente ocluidas
- Ao selecionar uma criatura, ela ganha destaque visual (brilho, contorno)
- Opcao de "transparencia de entidades atras": ao mirar um feitico,
  criaturas entre o lancador e o alvo ficam semi-transparentes (alpha 0.4)

---

## 7. Sprite Sheet — Formato Padrao

### 7.1 Layout do PNG

Todas as criaturas DEVEM seguir o mesmo layout de sprite sheet.
Isso permite que o codigo de animacao seja 100% generico.

```
Colunas: frames da animacao (F0, F1, F2, F3)
Linhas:  animacao + direcao

         F0      F1      F2      F3
Row 0:  idle_S  idle_S  idle_S  (vazio)     ← idle: 3 frames, 1 direcao
Row 1:  walk_S  walk_S  walk_S  walk_S      ← walk: 4 frames × 5 direcoes
Row 2:  walk_SE walk_SE walk_SE walk_SE
Row 3:  walk_E  walk_E  walk_E  walk_E
Row 4:  walk_NE walk_NE walk_NE walk_NE
Row 5:  walk_N  walk_N  walk_N  walk_N
Row 6:  cast_S  cast_S  cast_S  cast_S      ← cast: 4 frames × 5 direcoes
Row 7:  cast_SE cast_SE cast_SE cast_SE
Row 8:  cast_E  cast_E  cast_E  cast_E
Row 9:  cast_NE cast_NE cast_NE cast_NE
Row 10: cast_N  cast_N  cast_N  cast_N
Row 11: hurt    hurt    hurt    (vazio)     ← hurt: 3 frames, 1 direcao
Row 12: die     die     die     die         ← die: 4 frames, 1 direcao

Total: 13 linhas × 4 colunas = grid de 52 celulas
Celulas efetivas: 50 frames (2 vazias)
```

**Dimensao do sprite sheet:**
- Frame: 48 x 48 px
- Sheet: 192 x 624 px (4 colunas × 13 linhas)

### 7.2 Nomenclatura de arquivos

```
sprites/
  monstros/
    rato.png          ← sprite sheet base
    rato_palette.json ← definicao de paletas (normal/elite/boss)
    barata.png
    barata_palette.json
    ...
  jogador/
    guerreiro.png
    mago.png
    ...
  efeitos/
    hit_flash.png     ← overlay de dano
    cast_glow.png     ← overlay de cast
```

### 7.3 Definicao em codigo

```javascript
const SPRITE_DEFS = {
    rato: {
        src: 'sprites/monstros/rato.png',
        frameWidth: 48,
        frameHeight: 48,
        columns: 4,
        sizeCategory: 'tiny',   // ver secao 5.2
        bodyType: 'quadrupede', // ver secao 3.3

        // Paletas para variantes
        palettes: {
            normal: { body: '#888', detail: '#a44', accent: '#aaa' },
            elite:  { body: '#654', detail: '#fc0', accent: '#876' },
            boss:   { body: '#c22', detail: '#fff', accent: '#f66' },
        },

        // Animacoes: row = linha no sheet, frames = qtd de frames, speed = ms por frame
        animations: {
            idle: { row: 0,  frames: 3, speed: 400 },
            walk: { row: 1,  frames: 4, speed: 150, directional: true, dirs: 5 },
            cast: { row: 6,  frames: 4, speed: 200, directional: true, dirs: 5 },
            hurt: { row: 11, frames: 3, speed: 100 },
            die:  { row: 12, frames: 4, speed: 200, loop: false },
        }
    },
    // ... outras criaturas seguem EXATAMENTE o mesmo formato
};
```

---

## 8. Mapa de Tamanhos por Familia de Monstro

### 8.1 Tier 1 (12 familias)

| Familia    | sizeCategory | bodyType    | Notas visuais |
|------------|-------------|-------------|---------------|
| Rato       | tiny        | quadrupede  | Corpo baixo, rabo longo |
| Barata     | tiny        | rastejante  | Achatada, antenas |
| Cogumelo   | small       | vegetal     | Redondo, chapeu grande |
| Sapo       | small       | amorfo      | Agachado, pernas curtas |
| Morcego    | medium      | voador      | Asas abertas = largura extra |
| Planta     | small       | vegetal     | Tronco fino, folhas largas |
| Lobo       | medium      | quadrupede  | Corpo alongado, postura agressiva |
| Aranha     | small       | rastejante  | 8 patas, corpo baixo mas largo |
| Javali     | large       | quadrupede  | Corpo robusto, presas |
| Esqueleto  | medium      | humanoide   | Magro, alto |
| Cobra      | small       | rastejante  | Enrolada = compacta, atacando = esticada |
| Goblin     | small       | humanoide   | Baixo, orelhas pontudas |

### 8.2 Tier 2 (6 familias)

| Familia    | sizeCategory | bodyType    | Notas visuais |
|------------|-------------|-------------|---------------|
| Urso       | large       | quadrupede  | Massivo, ombros largos |
| Troll      | large       | humanoide   | Alto, bracos longos |
| Golem      | huge        | amorfo      | Blocudo, angular, pesado |
| Harpia     | medium      | voador      | Corpo medio, envergadura large |
| Lagarto    | large       | quadrupede  | Longo, cauda grossa |
| Ogro       | huge        | humanoide   | Muito alto e gordo |

### 8.3 Variantes (palette swap)

Cada familia tem 3 variantes, TODAS usam o MESMO sprite sheet base:

| Variante | Sufixo | Diferenciacao visual |
|----------|--------|---------------------|
| Normal   | —      | Cores base |
| Elite    | _elite | Cores mais saturadas/escuras, detalhes dourados |
| Boss     | _boss  | Cores vibrantes/invertidas, brilhos extras |

O boss pode opcionalmente ter **escala +10-15%** alem da palette swap
para parecer mais imponente, mas isso e opcional.

---

## 9. Integracao com o Renderizador Atual

### 9.1 PixiJS (modo principal)

O jogo ja usa PixiJS com `entityLayer` que tem `sortableChildren = true`.
A integracao com sprites:

```javascript
// Substituir drawPawn() por sprite animado:
function createEntitySprite(entity) {
    const def = SPRITE_DEFS[entity.spriteId];
    const texture = PIXI.BaseTexture.from(def.src);

    // Recortar primeiro frame
    const frame = new PIXI.Rectangle(0, 0, def.frameWidth, def.frameHeight);
    const sprite = new PIXI.Sprite(new PIXI.Texture(texture, frame));

    sprite.anchor.set(0.5, 1.0);  // centro-inferior

    // Escala pelo tamanho
    const scale = SIZE_SCALES[def.sizeCategory];
    sprite.scale.set(scale, scale);

    // zIndex isometrico
    sprite.zIndex = entity.y * 1000 + entity.x;

    worldContainer.entityLayer.addChild(sprite);
    return sprite;
}
```

### 9.2 Posicionamento no mundo isometrico

```javascript
// Converter grid → pixel isometrico (ja existe no jogo)
function entityToScreen(entity) {
    const ex = entity.x + 0.5;
    const ey = entity.y + 0.5;
    const px = (ex - ey) * HALF_TW;
    const py = (ex + ey) * HALF_TH - getElevOffset(entity.x, entity.y);
    return { x: px, y: py };
}
```

### 9.3 Flip horizontal (espelhamento)

```javascript
function updateSpriteDirection(sprite, directionId) {
    const mirror = DIR_MIRROR[directionId];
    sprite.scale.x = mirror.flipX ? -Math.abs(sprite.scale.x) : Math.abs(sprite.scale.x);
    // Usar mirror.spriteDir para selecionar a row correta no sheet
}
```

---

## 10. Volumetria Total do Projeto

### 10.1 Sem otimizacoes
- 18 familias × 3 variantes × 50 frames = **2.700 frames**
- 4 classes jogador × 50 frames = **200 frames**
- **Total: 2.900 frames**

### 10.2 Com todas as otimizacoes
| Otimizacao | Economia |
|------------|----------|
| Espelhamento (5 de 8 dirs) | -37.5% nas animacoes direcionais |
| Palette swap (1 base → 3 variantes) | -66% por familia |
| Salto via transformacao (sem sprite) | -15 frames por entidade |
| Hurt por bodyType (6 tipos vs 18 individuais) | -66% nos hurt |

**Frames unicos a desenhar:**
- 18 familias × 1 base × 50 frames = **900 frames de monstro**
- 4 classes × 50 frames = **200 frames de jogador**
- 6 bodyTypes × 3 frames hurt = **18 frames hurt genericos** (opcionais)
- **Total: ~1.100 frames unicos**

### 10.3 Sprite sheets
- 22 sprite sheets (18 monstros + 4 jogadores)
- Cada sheet: ~192 × 624 px = ~120 KB (PNG comprimido)
- **Total estimado: ~2.6 MB** de assets de sprite

---

## 11. Ordem de Implementacao Recomendada

1. **Sistema base de sprite rendering** — carregar sheet, recortar frames, animar
2. **DIR_MIRROR e flip** — espelhamento horizontal
3. **1 monstro piloto** (Rato) — validar pipeline completo
4. **Palette swap** — gerar variantes automaticamente
5. **Todas as 18 familias** — criar assets
6. **Classes do jogador** — com equipamento visivel (futuro)
7. **Efeitos de dano/cast** — overlays e particulas
8. **Transparencia de oclusao** — entidades atras de criaturas grandes

---

## 12. Checklist para Criar um Novo Sprite

- [ ] Definir `sizeCategory` (tiny/small/medium/large/huge)
- [ ] Definir `bodyType` (humanoide/quadrupede/voador/rastejante/vegetal/amorfo)
- [ ] Criar sprite sheet 48x48 no layout padrao (13 rows × 4 cols)
- [ ] Desenhar apenas 5 direcoes (S, SE, E, NE, N) para walk e cast
- [ ] Usar cores-chave para palette swap (body=#FF0000, detail=#00FF00, accent=#0000FF)
- [ ] Definir paletas para normal/elite/boss no `_palette.json`
- [ ] Registrar em `SPRITE_DEFS` com todas as propriedades
- [ ] Testar espelhamento (NW, W, SW devem parecer corretos)
- [ ] Testar z-ordering com criaturas adjacentes
- [ ] Testar overflow visual em criaturas large/huge
- [ ] Verificar que sombra aparece corretamente no tile

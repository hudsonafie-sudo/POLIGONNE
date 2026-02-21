# Plano de Substituicao: Tiles de Cor Solida → Sprites

## Status: EM ANDAMENTO — Aguardando assets do usuario

## Resumo
O jogo atualmente renderiza tiles isometricos com **cores solidas** (PIXI.Graphics, poligonos preenchidos).
O plano e substituir por **sprites PNG** gerados via Ludo.ai, mantendo toda a logica de grid existente.

---

## Especificacoes Tecnicas dos Tiles

| Propriedade | Valor |
|-------------|-------|
| Projecao | Isometrica 2:1 (diamante) |
| Tile no jogo | 64x32px (face superior) + 16px profundidade = 64x48px |
| Tile gerado | ~512x512px ou maior (sera reduzido) |
| Formato | PNG com fundo transparente |
| Variantes por terreno | 4 originais + 4 espelhados (flipX) = 8 total |
| Estilo visual | Cartoon/painterly, cores vibrantes |

---

## Terrenos Necessarios (14 tipos — 4 sprites cada = 56 sprites originais)

### Prioridade Alta (usados em todo o mapa)
1. **grass** — Grama verde vibrante (GERADO — aguardando 4 variantes)
2. **stone** — Pavimento cinza, blocos de pedra (ruas da cidade)
3. **dirt** — Terra marrom batida (caminhos)
4. **water** — Agua azul com reflexos (rios, lagos)
5. **wood** — Tabuas de madeira marrom (pontes)

### Prioridade Media (regioes especificas)
6. **sand** — Areia bege/dourada
7. **swamp** — Pantano verde escuro
8. **brick** — Tijolos vermelhos (construcoes)
9. **marble** — Marmore branco/cinza (praca central)
10. **farmland** — Terra arada marrom escuro (fazendas)
11. **puddle** — Agua rasa sobre grama

### Prioridade Baixa (biomas futuros/raros)
12. **snow** — Neve branca
13. **lava** — Lava laranja/vermelha
14. **ice** — Gelo azul claro

---

## Como Integrar (instrucoes para a IA)

### 1. Onde colocar os arquivos de sprite
```
img/tiles/
  grass_1.png
  grass_2.png
  grass_3.png
  grass_4.png
  stone_1.png
  stone_2.png
  ... etc
```

### 2. Sistema de variantes (8 por terreno)
- Variantes 0-3: sprites originais (grass_1 a grass_4)
- Variantes 4-7: mesmos sprites espelhados horizontalmente (flipX)
- Selecao pseudo-aleatoria por posicao: `(gridX * 7 + gridY * 13) & 7`
- Isso ja existe parcialmente em `mecanicas/terreno.js` (atualmente usa `& 3` para 4 variantes de cor)

### 3. Codigo de integracao (substituir em dev.html)
O render atual usa `PIXI.Graphics` para desenhar poligonos coloridos.
Deve ser substituido por `PIXI.Sprite` com textura do atlas.

```javascript
// ANTES (cor solida):
graphics.beginFill(terrainColor.top);
graphics.moveTo(sx, sy);
graphics.lineTo(sx + HALF_TW, sy + HALF_TH);
graphics.lineTo(sx, sy + TILE_HEIGHT);
graphics.lineTo(sx - HALF_TW, sy + HALF_TH);
graphics.closePath();
graphics.endFill();

// DEPOIS (sprite):
const variantIdx = (gridX * 7 + gridY * 13) & 7;
const isFlipped = variantIdx >= 4;
const spriteIdx = variantIdx % 4;
const texture = tileTextures[terrainType][spriteIdx];
const sprite = new PIXI.Sprite(texture);
sprite.position.set(sx - HALF_TW, sy);
if (isFlipped) sprite.scale.x = -1;

// Mascara diamante para recorte perfeito
const mask = new PIXI.Graphics();
mask.beginFill(0xFFFFFF);
mask.moveTo(HALF_TW, 0);
mask.lineTo(TILE_WIDTH, HALF_TH);
mask.lineTo(HALF_TW, TILE_HEIGHT);
mask.lineTo(0, HALF_TH);
mask.closePath();
mask.endFill();
sprite.mask = mask;
```

### 4. Atlas de texturas (otimizacao)
Para performance com 600x600 tiles, empacotar todos os tiles num unico atlas:
- Usar TexturePacker ou similar para gerar spritesheet
- Carregar como `PIXI.Spritesheet` com JSON de coordenadas
- Alternativa: usar `PIXI.BaseTexture` unica + `PIXI.Texture` com frames

### 5. Funcoes afetadas (arquivos a modificar)
- `jogo/dev.html` — funcao `updateTileLayer()` (~linha 19140+)
- `jogo/dev.html` — funcao `drawTile()` (overlay de combate)
- `mecanicas/terreno.js` — `TERRAIN_TYPES` (adicionar refs de sprite)
- Novo arquivo: `dados/tile_sprites.js` (mapeamento terreno → sprites)

### 6. Elevacao (faces laterais)
- Tiles com elevacao > 0 mostram faces laterais (esquerda/direita do cubo)
- Opcao A: sprite inclui faces laterais (tile de 64x48px+)
- Opcao B: faces laterais continuam como cor solida (mais simples)
- Recomendacao: Opcao B primeiro, trocar depois se necessario

---

## Decoracoes/Objetos (fase 2 — apos tiles base)

Apos os 14 terrenos, gerar sprites para decoracoes:
- Arvores (tree) — 3-4 variantes
- Rochas (rock) — 2-3 variantes
- Arbustos (bush) — 2 variantes
- Flores (flower) — 2-3 variantes
- Casas (house) — 2-3 variantes
- Muros (wall) — segmentos retos + cantos
- Estacoes de profissao (forge, loom, cauldron, workbench, oven)
- Barris, caixotes, lampiao, fonte, poco, banco

---

## Tiles com Falhas/Desgaste (variantes de realismo)
Alem das 4 variantes normais, gerar 2 variantes "gastas" por terreno principal:
- **grass_worn** — grama com falhas de terra aparecendo, pedrinhas, grama seca
- **stone_worn** — pedra rachada, com grama nascendo entre blocos, desgastada
- **dirt_worn** — terra com pocas de lama, pedras soltas
- **farmland** — terra arada com sulcos, onde recursos do Fazendeiro nascem

## Tiles de Transicao (FUTURO — fase 2)
Tiles que fazem a transicao entre dois terrenos:
- grass→stone (borda da cidade)
- grass→dirt (inicio de caminhos)
- grass→water (margem de rios)
- grass→sand (borda do mapa)
- grass→farmland (borda das fazendas)
Formato: metade de cada terreno no mesmo diamante, 4 rotacoes cada

---

## Progresso de Assets

| Terreno | Variantes geradas | Status |
|---------|-------------------|--------|
| grass | 1/4 | Em andamento |
| stone | 0/4 | Pendente |
| dirt | 0/4 | Pendente |
| water | 0/4 | Pendente |
| wood | 0/4 | Pendente |
| sand | 0/4 | Pendente |
| swamp | 0/4 | Pendente |
| brick | 0/4 | Pendente |
| marble | 0/4 | Pendente |
| farmland | 0/4 | Pendente |
| puddle | 0/4 | Pendente |
| snow | 0/4 | Pendente |
| lava | 0/4 | Pendente |
| ice | 0/4 | Pendente |

---

## Notas Importantes
- Tiles gerados no Ludo.ai (Gerador de Sprites), filtros: Web, Estrategia, Isometrico, Quadrado
- O primeiro tile de grama gerado tinha estilo excelente — usar como referencia de qualidade
- Bordas com folhas/detalhes saindo do diamante sao OK — mascara no PixiJS recorta
- NAO gerar tiles com bordas limpas/flat demais — fica feio, preferir detalhado
- Prompt base que funcionou bem: "Tile isometrico de [terreno] em formato de diamante para jogo tatico RPG..."

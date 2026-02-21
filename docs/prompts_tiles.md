# Prompts para Gerar Tiles — Ludo.ai

> **Config**: Low Poly, Estrategia, Isometrico, Praca (quadrado)
> **Prefixo obrigatorio**: `Diamond-shaped isometric tile, rhombus shaped flat ground tile seen from above at 45 degrees`
> **Sufixo para objetos pequenos**: `small subtle ground details, flat walkable surface, no large objects`

---

## REGRAS DE CONSISTENCIA (IMPORTANTE)

### Objetivo
Todas as variantes de um mesmo terreno devem parecer o **mesmo chao** visto de angulos ou posicoes diferentes — NAO choes completamente diferentes.

### Como gerar variantes consistentes no Ludo

1. **Use o MESMO prompt base** para todas as 4 variantes de um terreno
2. **NAO mude o tema** entre variantes (ex: nao faca uma com ossos e outra com teias)
3. A variacao deve vir apenas da **aleatoriedade do gerador**, nao de descricoes diferentes
4. Se o Ludo permitir seed/estilo fixo, use o mesmo para todas as variantes
5. Gere **5-6 imagens** com o mesmo prompt e selecione as **4 mais parecidas entre si**
6. Descarte variantes que destoem muito em: cor, nivel de detalhe, iluminacao ou estilo

### O que PODE variar (sutil)
- Posicao dos elementos (tufos, pedrinhas, rachaduras em lugares diferentes)
- Leve variacao de tom (~5-10% de diferenca de cor)
- Densidade de detalhes pequenos (um pouco mais ou menos de folhinhas)

### O que NAO pode variar
- Paleta de cores (todas as variantes devem ter a mesma paleta)
- Estilo de renderizacao (mesmo nivel de detalhe, mesma "mao")
- Tema/conteudo principal (grama e grama em todas as 4)
- Iluminacao e direcao da luz

### Fluxo de trabalho recomendado
```
1. Gerar 6 imagens com o prompt base do terreno
2. Comparar lado a lado — eliminar as que destoam
3. Selecionar as 4 mais coesas entre si
4. O sistema de flip horizontal gera +4 variantes automaticamente = 8 total
5. Testar no grid: colocar as 8 variantes em tiles adjacentes e ver se formam um "tapete" coeso
```

---

## TERRENOS BASICOS (Prioridade Alta)

### 1. GRAMA (`grass`)

**Prompt base (usar para TODAS as 4 variantes):**
```
Diamond-shaped isometric tile, rhombus shaped flat ground tile seen from above at 45 degrees, vibrant green grass covering the entire surface, short dense grass blades with slight height variation, a few tiny lighter green patches, warm sunlight, small subtle ground details, flat walkable surface, no large objects, no flowers, no dirt patches, cartoon painterly RPG style
```

| Cor | Hex | Uso |
|---|---|---|
| Verde Vibrante | `#4CAF50` | Cor dominante |
| Verde Claro | `#66BB6A` | Tufos mais altos |
| Verde Escuro | `#388E3C` | Base/sombras |
| Verde Lima | `#7CB342` | Reflexos de luz |

> **Variacao esperada**: Apenas posicao dos tufos e leve variacao de tonalidade. Todas devem parecer "o mesmo gramado".

---

### 2. PEDRA (`stone`)

**Prompt base:**
```
Diamond-shaped isometric tile, rhombus shaped flat ground tile seen from above at 45 degrees, flat gray cobblestone pavement with rectangular stone blocks fitted tightly together, thin mortar lines between stones, uniform gray tones, small subtle ground details, flat walkable surface, no large objects, no moss, no cracks, cartoon painterly RPG style
```

| Cor | Hex | Uso |
|---|---|---|
| Cinza Medio | `#78909C` | Cor dominante |
| Cinza Claro | `#B0BEC5` | Pedras mais claras |
| Cinza Escuro | `#546E7A` | Rejunte/sombras |
| Cinza Azulado | `#607D8B` | Variacao |

> **Variacao esperada**: Layout dos blocos de pedra ligeiramente diferente, mesma paleta cinza.

---

### 3. TERRA (`dirt`)

**Prompt base:**
```
Diamond-shaped isometric tile, rhombus shaped flat ground tile seen from above at 45 degrees, flat packed brown earth surface, compact dry dirt with very small pebbles scattered sparsely, subtle surface texture variations, warm brown tones, small subtle ground details, flat walkable surface, no large objects, no grass, no puddles, cartoon painterly RPG style
```

| Cor | Hex | Uso |
|---|---|---|
| Marrom Medio | `#795548` | Cor dominante |
| Marrom Claro | `#8D6E63` | Areas mais secas |
| Marrom Escuro | `#5D4037` | Sombras |
| Bege Terra | `#A1887F` | Pedrinhas |

> **Variacao esperada**: Posicao das pedrinhas e textura da terra ligeiramente diferentes.

---

### 4. AGUA (`water`)

**Prompt base:**
```
Diamond-shaped isometric tile, rhombus shaped flat ground tile seen from above at 45 degrees, clear blue water surface seen from above, gentle ripple patterns on surface, subtle light reflections, consistent blue color throughout, small subtle water details, flat water surface, no large objects, no rocks, no lily pads, cartoon painterly RPG style
```

| Cor | Hex | Uso |
|---|---|---|
| Azul Medio | `#2196F3` | Cor dominante |
| Azul Claro | `#64B5F6` | Reflexos |
| Azul Escuro | `#1565C0` | Profundidade |
| Branco Brilho | `#BBDEFB` | Pontos de luz |

> **Variacao esperada**: Padrao das ondulacoes em posicoes diferentes, mesma cor de agua.

---

### 5. MADEIRA (`wood`)

**Prompt base:**
```
Diamond-shaped isometric tile, rhombus shaped flat ground tile seen from above at 45 degrees, wooden plank floor with horizontal wood boards fitted together, visible wood grain lines, warm brown wood color, thin gaps between planks, small subtle ground details, flat walkable surface, no large objects, cartoon painterly RPG style
```

| Cor | Hex | Uso |
|---|---|---|
| Marrom Madeira | `#6D4C41` | Cor dominante |
| Marrom Claro | `#8D6E63` | Tabuas mais claras |
| Marrom Escuro | `#4E342E` | Frestas/sombras |
| Bege Madeira | `#A1887F` | Veios |

> **Variacao esperada**: Direcao e padrao dos veios da madeira, mesma tonalidade.

---

### 6. AREIA (`sand`)

**Prompt base:**
```
Diamond-shaped isometric tile, rhombus shaped flat ground tile seen from above at 45 degrees, smooth golden sand surface with subtle wave-like ripple patterns, warm golden beige color, tiny sparkle points from sun, small subtle ground details, flat walkable surface, no large objects, no shells, no footprints, cartoon painterly RPG style
```

| Cor | Hex | Uso |
|---|---|---|
| Bege Dourado | `#D4A574` | Cor dominante |
| Bege Claro | `#E8C99B` | Cristas |
| Bege Escuro | `#B8860B` | Sombras |
| Dourado | `#DAA520` | Reflexos |

> **Variacao esperada**: Padrao das ondulacoes de areia em posicoes diferentes.

---

## TERRENOS BASICOS (Prioridade Media)

### 7. PANTANO (`swamp`)

**Prompt base:**
```
Diamond-shaped isometric tile, rhombus shaped flat ground tile seen from above at 45 degrees, dark murky green-brown swamp water with thin algae film on surface, slight green tint, stagnant water appearance, small subtle ground details, flat walkable surface, no large objects, no lily pads, no reeds, cartoon painterly RPG style
```

| Cor | Hex | Uso |
|---|---|---|
| Verde Pantano | `#2E7D32` | Cor dominante |
| Verde Escuro | `#1B5E20` | Profundidade |
| Marrom Verde | `#4E6B45` | Algas |
| Verde Limo | `#558B2F` | Reflexos |

---

### 8. TIJOLO (`brick`)

**Prompt base:**
```
Diamond-shaped isometric tile, rhombus shaped flat ground tile seen from above at 45 degrees, red brick floor with rectangular bricks in herringbone pattern, warm red-orange tones, thin mortar lines between bricks, small subtle ground details, flat walkable surface, no large objects, cartoon painterly RPG style
```

| Cor | Hex | Uso |
|---|---|---|
| Vermelho Tijolo | `#C62828` | Cor dominante |
| Vermelho Claro | `#EF5350` | Tijolos claros |
| Vermelho Escuro | `#B71C1C` | Sombras |
| Bege Rejunte | `#D7CCC8` | Rejunte |

---

### 9. MARMORE (`marble`)

**Prompt base:**
```
Diamond-shaped isometric tile, rhombus shaped flat ground tile seen from above at 45 degrees, polished white marble floor with subtle gray vein patterns, smooth reflective surface, elegant clean appearance, small subtle ground details, flat walkable surface, no large objects, cartoon painterly RPG style
```

| Cor | Hex | Uso |
|---|---|---|
| Branco Marmore | `#ECEFF1` | Cor dominante |
| Cinza Veio | `#B0BEC5` | Veios |
| Branco Puro | `#FAFAFA` | Reflexos |
| Cinza Claro | `#CFD8DC` | Sombras suaves |

---

### 10. TERRA ARADA (`farmland`)

**Prompt base:**
```
Diamond-shaped isometric tile, rhombus shaped flat ground tile seen from above at 45 degrees, dark brown plowed farmland with parallel furrow lines in the soil, rich dark earth color, uniform plowing pattern, small subtle ground details, flat walkable surface, no large objects, no crops, no plants, cartoon painterly RPG style
```

| Cor | Hex | Uso |
|---|---|---|
| Marrom Rico | `#3E2723` | Cor dominante |
| Marrom Terra | `#4E342E` | Sulcos |
| Marrom Claro | `#5D4037` | Cristas |
| Marrom Umido | `#2C1A12` | Sombras |

---

### 11. POCA (`puddle`)

**Prompt base:**
```
Diamond-shaped isometric tile, rhombus shaped flat ground tile seen from above at 45 degrees, green grass surface with a shallow clear water puddle in the center, grass visible around edges, small water reflection, small subtle ground details, flat walkable surface, no large objects, cartoon painterly RPG style
```

| Cor | Hex | Uso |
|---|---|---|
| Verde Grama | `#4CAF50` | Grama ao redor |
| Azul Raso | `#90CAF9` | Agua da poca |
| Verde Escuro | `#388E3C` | Grama molhada |
| Azul Claro | `#BBDEFB` | Reflexo |

---

## TERRENOS BASICOS (Prioridade Baixa)

### 12. NEVE (`snow`)

**Prompt base:**
```
Diamond-shaped isometric tile, rhombus shaped flat ground tile seen from above at 45 degrees, clean white snow covering flat ground, subtle blue shadows in shallow areas, tiny ice crystal sparkles on surface, cold lighting, small subtle ground details, flat walkable surface, no large objects, cartoon painterly RPG style
```

| Cor | Hex | Uso |
|---|---|---|
| Branco Neve | `#ECEFF1` | Cor dominante |
| Azul Sombra | `#B0BEC5` | Sombras |
| Branco Brilho | `#FAFAFA` | Reflexos |
| Azul Gelo | `#E3F2FD` | Tons frios |

---

### 13. LAVA (`lava`)

**Prompt base:**
```
Diamond-shaped isometric tile, rhombus shaped flat ground tile seen from above at 45 degrees, molten orange-red lava surface with dark cooled crust patches, bright orange glow from cracks, intense heat appearance, small subtle ground details, flat surface, no large objects, cartoon painterly RPG style
```

| Cor | Hex | Uso |
|---|---|---|
| Laranja Lava | `#FF6F00` | Cor dominante |
| Vermelho Brasa | `#D84315` | Magma |
| Preto Crosta | `#3E2723` | Crosta resfriada |
| Amarelo Calor | `#FFA000` | Brilho intenso |

---

### 14. GELO (`ice`)

**Prompt base:**
```
Diamond-shaped isometric tile, rhombus shaped flat ground tile seen from above at 45 degrees, smooth blue-white ice surface with subtle crack patterns, translucent frozen appearance, cold blue reflections, small subtle ground details, flat walkable surface, no large objects, cartoon painterly RPG style
```

| Cor | Hex | Uso |
|---|---|---|
| Azul Gelo | `#B3E5FC` | Cor dominante |
| Azul Profundo | `#0277BD` | Rachaduras |
| Branco Gelo | `#E1F5FE` | Reflexos |
| Azul Cristal | `#4FC3F7` | Tons medios |

---

---

## TILES DE BIOMA (Locais Especificos)

> **NOTA**: Tiles de bioma seguem as mesmas regras de consistencia.
> Cada bioma tem UM prompt base. Gere 4-6 imagens com ele e selecione as 4 mais coesas.
> As variantes A/B/C abaixo sao opcoes tematicas — escolha UMA por bioma e use-a para todas as variantes.

---

### 1. VALE DOS OSSOS (`vale_ossos`)

**Opcao A — Chao com ossos** (recomendada)
```
Diamond-shaped isometric tile, rhombus shaped flat ground tile seen from above at 45 degrees, dry cracked brown earth with small scattered bones and tiny skull fragments half-buried in dirt, subtle spider web threads between rocks, small subtle ground details, flat walkable surface, no large objects, cartoon painterly RPG style
```

**Opcao B — Terra com teias de aranha**
```
Diamond-shaped isometric tile, rhombus shaped flat ground tile seen from above at 45 degrees, dark brown rocky ground with thin spider web threads stretching between small pebbles and tiny bone chips, faint green moss patches, small subtle ground details, flat walkable surface, no large objects, cartoon painterly RPG style
```

| Cor | Hex |
|---|---|
| Marrom | `#6B4C30` |
| Marrom Escuro | `#3D2B1A` |
| Bege | `#D4C5A0` |
| Caqui | `#8A7A5A` |

---

### 2. NINHO DAS HARPIAS (`ninho_harpia`)

**Opcao A — Rochedo com penas** (recomendada)
```
Diamond-shaped isometric tile, rhombus shaped flat ground tile seen from above at 45 degrees, rocky cliff surface with small twigs and tiny purple feathers scattered on the ground, tiny eggshell fragments, small subtle ground details, flat walkable surface, no large objects, cartoon painterly RPG style
```

**Opcao B — Rochedo com marcas de garra**
```
Diamond-shaped isometric tile, rhombus shaped flat ground tile seen from above at 45 degrees, gray-purple rocky surface with small claw scratch marks, a few tiny purple and white feathers on the ground, sparse mountain grass tufts, small subtle ground details, flat walkable surface, no large objects, cartoon painterly RPG style
```

| Cor | Hex |
|---|---|
| Roxo | `#7E57C2` |
| Roxo Escuro | `#5C4A8A` |
| Marrom Galho | `#8D6E3F` |
| Cinza Pedra | `#9E9E9E` |

---

### 3. GRUTA DO GOLEM (`gruta_golem`)

**Opcao A — Caverna com cristais** (recomendada)
```
Diamond-shaped isometric tile, rhombus shaped flat ground tile seen from above at 45 degrees, dark cave floor of rough gray slate stone with tiny glowing blue-green crystal shards in cracks, faint bioluminescent moss spots between stones, small subtle ground details, flat walkable surface, no large objects, cartoon painterly RPG style
```

**Opcao B — Piso umido com pocas**
```
Diamond-shaped isometric tile, rhombus shaped flat ground tile seen from above at 45 degrees, smooth worn cave floor with small shallow dark water puddles, tiny gray-green moss patches, wet stone reflections, small subtle ground details, flat walkable surface, no large objects, cartoon painterly RPG style
```

| Cor | Hex |
|---|---|
| Cinza Azulado | `#78909C` |
| Cinza Chumbo | `#37474F` |
| Ciano Cristal | `#00BCD4` |
| Verde Agua | `#4DB6AC` |

---

### 4. PANTANO DOS LAGARTOS (`pantano_lagarto`)

**Opcao A — Lodo com raizes** (recomendada)
```
Diamond-shaped isometric tile, rhombus shaped flat ground tile seen from above at 45 degrees, murky green-brown swamp water with thin floating algae strands, small vine roots poking from below, tiny lily pad patches, small subtle ground details, flat walkable surface, no large objects, cartoon painterly RPG style
```

**Opcao B — Lama com pegadas**
```
Diamond-shaped isometric tile, rhombus shaped flat ground tile seen from above at 45 degrees, soft wet muddy ground mixing brown and green, small reptile claw prints pressed into mud, tiny pools of stagnant green water, short thin reeds at edges, small subtle ground details, flat walkable surface, no large objects, cartoon painterly RPG style
```

| Cor | Hex |
|---|---|
| Verde | `#4CAF50` |
| Verde Escuro | `#2E7D32` |
| Marrom Raiz | `#5D4037` |
| Verde Profundo | `#1B5E20` |

---

### 5. RUINAS DO TROLL (`ruinas_troll`)

**Opcao A — Cobblestone rachado** (recomendada)
```
Diamond-shaped isometric tile, rhombus shaped flat ground tile seen from above at 45 degrees, ancient crumbled cobblestone floor with cracks, small moss and weed patches growing through gaps, tiny stone rubble pieces, small subtle ground details, flat walkable surface, no large objects, cartoon painterly RPG style
```

**Opcao B — Mosaico desbotado**
```
Diamond-shaped isometric tile, rhombus shaped flat ground tile seen from above at 45 degrees, cracked ancient temple floor with faded mosaic pattern partially visible under thin dirt and small moss patches, worn flat stones, small subtle ground details, flat walkable surface, no large objects, cartoon painterly RPG style
```

| Cor | Hex |
|---|---|
| Marrom Ruina | `#5D4E37` |
| Bege Pedra | `#8D7B5F` |
| Verde Musgo | `#4E7A4E` |
| Bege Claro | `#A69070` |

---

### 6. FLORESTA DO OGRO (`floresta_ogro`)

**Opcao A — Chao com folhas vermelhas** (recomendada)
```
Diamond-shaped isometric tile, rhombus shaped flat ground tile seen from above at 45 degrees, dark forest floor covered in small red and orange fallen leaves, thin tree root lines on surface, crushed undergrowth texture, small subtle ground details, flat walkable surface, no large objects, cartoon painterly RPG style
```

**Opcao B — Chao com cogumelos**
```
Diamond-shaped isometric tile, rhombus shaped flat ground tile seen from above at 45 degrees, dark forest clearing with tiny red-capped mushrooms growing in clusters, dark soil with small dead twigs, faint reddish dust on ground, small subtle ground details, flat walkable surface, no large objects, cartoon painterly RPG style
```

| Cor | Hex |
|---|---|
| Vermelho Alaranjado | `#BF360C` |
| Carmesim Escuro | `#8B2500` |
| Marrom Casca | `#4E342E` |
| Laranja Brilhante | `#FF6F00` |

---

### 7. TOCA DO URSO (`toca_urso`)

**Opcao A — Caverna com marcas** (recomendada)
```
Diamond-shaped isometric tile, rhombus shaped flat ground tile seen from above at 45 degrees, rocky cave floor with brown earth, small bear claw scratch marks on stone surface, scattered tiny pine needles and small bone chips, small subtle ground details, flat walkable surface, no large objects, cartoon painterly RPG style
```

**Opcao B — Floresta densa com pegadas**
```
Diamond-shaped isometric tile, rhombus shaped flat ground tile seen from above at 45 degrees, thick forest floor with dense brown earth, large paw prints pressed into ground, small fern leaves and short grass patches, small subtle ground details, flat walkable surface, no large objects, cartoon painterly RPG style
```

| Cor | Hex |
|---|---|
| Marrom Alaranjado | `#8B4500` |
| Marrom Rocha | `#5D4037` |
| Bege Agulha | `#8D6E3F` |
| Bege Osso | `#D4C5A0` |

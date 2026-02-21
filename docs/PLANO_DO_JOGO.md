# PLANO DO JOGO - Betta: RPG Tático Isométrico
**Última atualização**: 2026-02-09

---

## 1. VISÃO GERAL

**Betta** é um RPG tático isométrico no navegador. Combate por turnos em grid, com sistema de habilidades baseado em elementos, equipamentos com conjuntos, e exploração de mundo.

**Plataforma**: Browser (HTML5 Canvas, JavaScript puro, zero dependências externas)
**GPU do desenvolvedor**: AMD Radeon RX 9070 XT (hardware accelerated Canvas)

---

## 2. ESTADO ATUAL — O QUE JÁ EXISTE (Fev/2026)

### 2.1 Motor do Jogo (Engine)
- [x] Renderização isométrica com Canvas 2D
- [x] Sistema de câmera com zoom (0.4x-2.5x) e pan
- [x] Frustum culling (só renderiza tiles visíveis)
- [x] Frame rate cap (30fps) para economia de CPU
- [x] Coordenadas grid ↔ isométrico ↔ tela
- [x] Game loop otimizado (sem garbage collection pressure)
- [x] Persistência em localStorage com debounce

### 2.2 Sistema de Combate
- [x] Combate tático por turnos em grid 20x20
- [x] Pontos de Ação (PA), Movimento (PM), Energia (PE)
- [x] 5 formas de alcance: cross, circle, line, diagonal, star
- [x] AoE (Área de Efeito) com zone cells customizáveis
- [x] 6 elementos de dano: Neutro, Fogo, Água, Ar, Terra + Elemental
- [x] Crítico e Parada (chances %, efeitos no dano)
- [x] Push/Pull (empurrão/puxão) em habilidades
- [x] Sistema de cooldown (por turno, por alvo, cooldown geral)
- [x] Linha de Visão (LoS) com 11 algoritmos
- [x] Lock/Tackle (bloqueio de adjacência: BLQ vs ESQ)
- [x] Life steal, cura, efeitos de zona (dmgEnemy, healAlly, etc.)

### 2.3 IA dos Monstros
- [x] IA baseada em utilidade (utility-based)
- [x] 2 arquétipos: aggressive_melee, defensive_ranged
- [x] Avaliação de ações e seleção por score
- [x] Pathfinding A* integrado
- [x] Threshold de HP para mudança de comportamento

### 2.4 Habilidades e Spells
- [x] Database com 5+ spells base
- [x] Categorias: player, monster, consumable_scroll
- [x] Build dual: 10 ativos + 5 passivos
- [x] Coleção de feitiços (max 500, localStorage)
- [x] Mini preview de alcance nos slots
- [x] Normalização de spells legados (normalizeSpell)

### 2.5 Equipamentos e Itens
- [x] 18 slots: arma, off-hand, capacete, peito, pernas, botas, capa, cinto, 10 anéis
- [x] Armas geram habilidade de ataque automática
- [x] Two-handed bloqueia off-hand
- [x] Conjuntos de equipamentos com bônus por nº de peças
- [x] Consumíveis: poções e pergaminhos de feitiço
- [x] Recursos: 4 tipos (lenhador, mineiro, fazendeiro, recurso_monstro)
- [x] Inventário com drag & drop, organizar, destruir
- [x] **Sistema de Resistências Elementais** (2026-02-11)
  - 6 atributos: `res_fire`, `res_water`, `res_air`, `res_earth`, `res_neutral`, `res_general`
  - Fórmula com diminishing returns: `redução% = resist / (|resist| + 200) * 100`
  - Soma de múltiplos itens (18 slots equipáveis)
  - Vulnerabilidades estratégicas apenas em itens raros+
  - **📘 Ver:** [docs/DESIGN_DE_ITENS.md](DESIGN_DE_ITENS.md) para regras completas

### 2.6 Mapa e Terreno
- [x] Mapa mundo 60x60 com regiões nomeadas
- [x] 5 tipos de terreno procedural com variantes visuais
- [x] Sistema de elevação com rampas
- [x] Obstáculos: blocker, visual, barrier, oneway, transition
- [x] Mapas de combate separados por região
- [x] HUD de região (nome do mapa + região atual)

### 2.7 Ferramentas de Desenvolvimento (Admin/DEV)
- [x] Painel DEV com 10 abas completas
- [x] CRUD para todos os tipos de conteúdo
- [x] Editor visual de mapa mundo e mapa de combate
- [x] Spawn points (player/enemy) no editor de combate
- [x] Export JS/JSON para integração no código
- [x] Undo/Redo para todas as operações
- [x] Simulação de LoS e Simulação de Combate
- [x] Preview de ícones de equipamentos

### 2.8 Interface
- [x] Hotbar de combate com ícones de elemento
- [x] Tooltips para itens e habilidades
- [x] Stats window com atributos primários/secundários/terciários
- [x] Janela de equipamento com visualização de conjuntos
- [x] Chat de mensagens do jogo
- [x] Sistema de ícones unificado (GAME_ICONS)

### 2.9 Conteúdo Existente
| Tipo | Quantidade | Exemplos |
|------|-----------|----------|
| Spells | 5 base | Rajada Arcana, Bola de Fogo, Sopro Gelado, Rajada de Vento, Tremor |
| Monstros | 3 | Goblin Seboso, Lobo Selvagem, Sebozinho |
| Armas | 2 | Espada Básica, Espada do Lobo |
| Armaduras | ~2 | Armaduras base |
| Conjuntos | 1 | Conjunto do Lobo (4 peças) |
| Consumíveis | ~1 | Framework de poções |
| Recursos | 2 | Madeira, Minério de Ferro |
| Mapas mundo | 1 | Cidade |
| Mapas combate | 1 | Padrão |

---

## 3. O QUE FALTA — PRÓXIMOS PASSOS

### Fase 1: Conteúdo Mínimo Jogável (MVP de conteúdo)
**Objetivo**: Ter conteúdo suficiente para uma sessão de jogo de 30-60 minutos.

#### 1A. Mais Monstros e Variedade de Combate
- [ ] 10-15 monstros com stats e spells variados
- [ ] Monstros de cada elemento (fogo, água, ar, terra)
- [ ] Monstros com IA defensiva (healers, buffers)
- [ ] Monstros com AoE e mecânicas especiais
- [ ] Boss com múltiplas fases ou mecânicas únicas
- [ ] Grupos de monstros (encontros com 2-4 inimigos variados)

#### 1B. Mais Habilidades
- [ ] 20-30 spells de player (5-6 por elemento + neutros)
- [ ] Spells de suporte (cura, buff, debuff)
- [ ] Spells de controle (stun, slow, silence, root)
- [ ] Spells de invocação (criar entidade aliada temporária)
- [ ] Passivas significativas (regen, reflete dano, counter-attack)

#### 1C. Mais Equipamentos
- [ ] 3-5 armas por tipo (espada, arco, cajado, adaga, machado)
- [ ] Set completo de armaduras por tier (iniciante, intermediário, avançado)
- [ ] 3-5 conjuntos de equipamento com temáticas diferentes
- [ ] Equipamentos que modificam habilidades ou stats significativamente

#### 1D. Mapas
- [ ] 3-5 mapas de combate com layouts variados (obstáculos, elevações, rampas)
- [ ] 2-3 regiões no mapa mundo com monstros diferentes
- [ ] Transições entre áreas (portais, caminhos)

---

### Fase 2: Progressão do Jogador
**Objetivo**: Dar motivo para o jogador continuar jogando.

#### 2A. Sistema de Nível / Experiência
- [ ] XP ganho por combate
- [ ] Level up com aumento de stats base
- [ ] Pontos de atributo para distribuir ao subir de nível
- [ ] Monstros mais fortes dão mais XP
- [ ] Indicador visual de nível do jogador

#### 2B. Sistema de Classes ou Builds
- [ ] Classes com spells exclusivas (Guerreiro, Mago, Arqueiro, Curandeiro)
- [ ] OU: Sistema livre onde o jogador escolhe qualquer spell
- [ ] Árvore de habilidades ou progressão de spells (versões melhoradas)
- [ ] Spells desbloqueáveis por nível

#### 2C. Economia e Crafting
- [ ] Moeda do jogo (Kamas, Gold, etc.)
- [ ] Monstros dropam recursos e moeda
- [ ] NPC lojista para comprar/vender
- [ ] Sistema de craft: recursos → equipamentos
- [ ] Receitas desbloqueáveis

#### 2D. Drops e Loot
- [ ] Tabela de drop por monstro (já existe framework: monsterDropList)
- [ ] Raridades de item (comum, incomum, raro, épico, lendário)
- [ ] Drop rate por raridade
- [ ] Tela de recompensas pós-combate

---

### Fase 3: Mundo e Exploração
**Objetivo**: Criar uma experiência de jogo além do combate.

#### 3A. NPCs e Diálogos
- [ ] NPCs no mapa mundo com ícones de interação
- [ ] Sistema de diálogo com caixas de texto
- [ ] Quests/Missões dadas por NPCs
- [ ] NPC lojista (compra/venda de itens)

#### 3B. Sistema de Quests
- [ ] Quest log (lista de missões ativas)
- [ ] Tipos de quest: matar X monstros, coletar Y itens, falar com NPC
- [ ] Recompensas: XP, itens, moeda, spells
- [ ] Quests main (história) e side quests

#### 3C. Profissões / Coleta
- [ ] Pontos de coleta no mapa (árvores, minérios, plantas)
- [ ] Animação de coleta
- [ ] Nível de profissão (lenhador, mineiro, fazendeiro)
- [ ] Recursos usados em crafting

#### 3D. Mapa Mundo Expandido
- [ ] Múltiplas zonas/biomas (floresta, deserto, caverna, neve)
- [ ] Cada zona com monstros e recursos únicos
- [ ] Progressão geográfica (zonas fáceis → difíceis)
- [ ] Dungeons (mapas lineares com combates sequenciais)

---

### Fase 4: Polimento e QoL (Quality of Life)
**Objetivo**: Tornar o jogo agradável de jogar.

#### 4A. Visual e Animações
- [ ] Animações de ataque/cast (frames de sprite ou efeito de partículas)
- [ ] Efeitos visuais de spells (projectile, explosion, beam)
- [ ] Animação de morte dos monstros
- [ ] Tela de loading entre transições
- [ ] Animação de level up
- [ ] Efeitos sonoros básicos (hit, spell, UI click)
- [ ] Música de fundo (combate e exploração)

#### 4B. Interface
- [ ] Mini-mapa
- [ ] Timeline/previsão de turnos (quem joga depois)
- [ ] Indicador de dano previsto antes de confirmar ataque
- [ ] Bestiário (lista de monstros encontrados com stats)
- [ ] Tutorial/onboarding para novos jogadores
- [ ] Opções de configuração (volume, velocidade de animação)

#### 4C. Balanceamento
- [ ] Curva de dificuldade suave entre zonas
- [ ] Balancear stats de monstros vs player por nível
- [ ] Balancear dano/cura dos spells
- [ ] Teste de todas as habilidades em cenários variados
- [ ] Balancear economia (preços, drop rates, crafting costs)

---

### Fase 5: Features Avançadas (Futuro)
**Objetivo**: Expandir o jogo além do core.

#### 5A. Multiplayer / Social
- [ ] Combate PvP (1v1 ou 2v2)
- [ ] Co-op em combates (2 players vs monstros)
- [ ] Chat entre jogadores
- [ ] Rankings/Leaderboards

#### 5B. Endgame
- [ ] Dungeons com múltiplos andares e boss final
- [ ] Arena com ondas de monstros
- [ ] Equipamentos endgame com stats únicos
- [ ] Achievements/conquistas
- [ ] New Game+ (recomeçar com stats/spells mantidos)

#### 5C. Narrativa
- [ ] História principal com arco narrativo
- [ ] Personagens com personalidade e desenvolvimento
- [ ] Cutscenes em momentos chave
- [ ] Múltiplos finais baseados em escolhas

---

## 4. PRIORIDADES E ORDEM DE IMPLEMENTAÇÃO

```
AGORA (Fase 1)          DEPOIS (Fase 2)         FUTURO (Fase 3-5)
─────────────────       ─────────────────       ─────────────────
Mais monstros           Sistema de nível        NPCs e diálogos
Mais spells             Economia/moeda          Quests
Mais equipamentos       Drops/loot pós-luta     Profissões
Mais mapas combate      Classes/builds          Múltiplos biomas
Grupos de inimigos      Craft básico            Animações
Regiões com monstros    Loja NPC                Sons/música
Spells de controle      Tela de recompensas     Multiplayer
Boss                    Pontos de atributo      Endgame/Arena
```

---

## 5. PRINCÍPIOS DE DESENVOLVIMENTO

1. **Performance primeiro**: Consultar `erros_comuns.md` antes de qualquer mudança
2. **Conteúdo > Features**: Mais spells/monstros/mapas antes de sistemas novos
3. **Testável**: Cada mecânica deve ser testável na simulação DEV
4. **Sem dependências**: Manter JavaScript puro (sem frameworks/libs)
5. **Dados separados**: Monstros, spells, equipamentos em arquivos próprios
6. **Incremental**: Cada adição deve ser jogável e testável independentemente
7. **GAME_ICONS**: Toda iconografia via sistema unificado (nunca emojis hardcoded)

---

## 6. MÉTRICAS DE PROGRESSO

| Marco | Critério | Status |
|-------|---------|--------|
| Protótipo | Combate funcional com 1 monstro | ✅ Completo |
| Alpha | 5+ monstros, 10+ spells, 3+ mapas combate | 🔶 Parcial |
| Beta | Sistema de nível, drops, loja, 20+ spells | ❌ Pendente |
| Release | Mundo completo, quests, balanceamento, som | ❌ Pendente |

---

## 7. IDEIAS E BACKLOG

Ideias para considerar no futuro (sem prioridade definida):

- **Companheiros**: recrutar NPCs para lutar junto
- **Montarias**: velocidade de movimento aumentada no mapa
- **Clima/dia-noite**: efeitos visuais e gameplay (monstros noturnos)
- **Encantamentos**: melhorar equipamentos com recursos
- **Mercado**: sistema de auction entre jogadores (se multiplayer)
- **Terreno destrutível**: spells que modificam o terreno durante combate
- **Traps/Armadilhas**: colocar armadilhas no mapa de combate
- **Summons/Invocações**: criar entidades aliadas temporárias
- **Auras de campo**: zonas persistentes que aplicam efeitos por turno
- **Reação**: ações fora do turno (contra-ataque, esquiva)
- **Combo system**: usar spells em sequência para bônus

---

*Este documento deve ser consultado e atualizado conforme o projeto evolui.*
*Caminho: `docs/PLANO_DO_JOGO.md`*

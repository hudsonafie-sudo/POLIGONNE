# 📘 GUIA COMPLETO DO JOGO - Betta RPG

**Última atualização:** 2026-02-11
**Versão:** 2.0 - Guia Consolidado
**Para:** Jogadores e Desenvolvedores

---

## 📖 Índice

1. [Visão Geral](#visão-geral)
2. [Sistema de Classes](#sistema-de-classes) 🆕
3. [Sistemas de Combate](#sistemas-de-combate)
4. [Equipamentos e Itens](#equipamentos-e-itens)
5. [Resistências Elementais](#resistências-elementais)
6. [Dano e Elementos](#dano-e-elementos)
7. [Mecânicas Avançadas de Feitiços](#mecânicas-avançadas-de-feitiços) 🆕
8. [Passivos Universais](#passivos-universais) 🆕
9. [Monstros e IA](#monstros-e-ia)
10. [Sistema de Revive](#sistema-de-revive)
11. [Recursos e Crafting](#recursos-e-crafting)
12. [Progressão e Level](#progressão-e-level)
13. [Limites Táticos](#limites-táticos)
14. [Feitiços e Habilidades](#feitiços-e-habilidades)
15. [Controles e Interface](#controles-e-interface)

---

## 1. Visão Geral

### O que é Betta?

**Betta** é um RPG tático isométrico por turnos. O jogo roda no navegador usando HTML5 Canvas puro, sem dependências externas.

### Características Principais

- 🎮 **Combate tático por turnos** em grid 20×20
- 🗺️ **Exploração de mundo** isométrico 60×60
- ⚔️ **Sistema de elementos** (Fogo, Água, Ar, Terra, Neutro)
- 🛡️ **18 slots de equipamento** (8 principais + 10 anéis)
- 🎯 **IA inteligente** dos monstros
- 💾 **Salvamento automático** em localStorage
- 🔧 **Ferramentas de desenvolvimento** integradas

---

## 2. Sistema de Classes 🆕

### 2.1 Escolha de Classe

Ao criar um personagem, você escolhe **1 de 6 classes** disponíveis. Cada classe tem:
- **3 Elementos únicos** (fogo, água, ar, terra)
- **15 Feitiços elementais** (5 por elemento)
- **3 Feitiços ativos** (utilidades)
- **2 Passivos únicos** (habilidades de classe)
- **1 DOM** (habilidade passiva suprema)

**Total por classe:** 21 habilidades únicas

---

### 2.2 As 6 Classes

#### ⚔️ GUERREIRO - "Lâmina Inabalável"
- **Papel:** DPS Corpo a Corpo
- **Elementos:** 🔥 Fogo | 🌍 Terra | 🌪️ Ar
- **Range:** 1-4 células
- **Dificuldade:** ⭐⭐ (Fácil)

**Mecânicas Únicas:**
- **Roubo de Armadura:** Reduz defense dos inimigos e aumenta a sua
- **Salto Heroico:** Teleporta para células vazias
- **On Kill:** Ao matar, ganha +1 PA
- **On Block:** Ao bloquear, ganha armor e dano

**Estilo de Jogo:** Entra em combate, rouba armadura, tankar hits e causa alto dano CAC.

---

#### 🏹 ATIRADOR - "Sombra Silente"
- **Papel:** DPS à Distância
- **Elementos:** 🌪️ Ar | 🔥 Fogo | 💧 Água
- **Range:** 4-12 células
- **Dificuldade:** ⭐⭐ (Fácil)

**Mecânicas Únicas:**
- **Roubo de PM:** Drena PM dos inimigos
- **Rolamento Tático:** Move 2 células ignorando bloqueio
- **Empurrão:** Afasta inimigos
- **On Kill:** Ao matar, ganha +2 PM

**Estilo de Jogo:** Mantém distância, rouba PM dos inimigos, kiting constante.

---

#### 🎯 CAÇADOR - "Predador Sombrio"
- **Papel:** Bruiser (DPS com Sustain)
- **Elementos:** 💧 Água | 🌍 Terra | 🌪️ Ar
- **Range:** 2-7 células
- **Dificuldade:** ⭐⭐⭐ (Médio)

**Mecânicas Únicas:**
- **Roubo de Vida:** Cura ao causar dano
- **Push/Pull:** Empurra e puxa inimigos
- **On Kill:** Ao matar, cura HP, ganha PM e shield
- **On Hit:** Ao sofrer dano, ganha shield

**Estilo de Jogo:** Reposiciona inimigos, rouba vida, sustenta em combate prolongado.

---

#### 🛡️ GUARDIÃO - "Bastião Eterno"
- **Papel:** Tanque Defensivo
- **Elementos:** 🌍 Terra | 💧 Água | 🔥 Fogo
- **Range:** 1-3 células
- **Dificuldade:** ⭐⭐⭐ (Médio)

**Mecânicas Únicas:**
- **Estabilizado:** Imune a empurrão/puxão/teleporte
- **Conceder Armadura:** Dá armor para aliados
- **On Hit:** Ao sofrer dano, ganha armor e resistências
- **On Block:** Ao bloquear, ganha PA e armor para si e aliados

**Estilo de Jogo:** Tanque puro, protege aliados, especialista em bloquear.

---

#### ✨ CLÉRIGO - "Luz Divina"
- **Papel:** Suporte/Curandeiro
- **Elementos:** 💧 Água | 🌪️ Ar | 🔥 Fogo
- **Range:** 3-8 células
- **Dificuldade:** ⭐⭐⭐ (Médio)

**Mecânicas Únicas:**
- **Cura Massiva:** Feitiços de cura poderosos
- **Cólera Divina:** Toggle que troca cura por dano
- **Ressurreição:** Revive aliados mortos
- **On Hit:** Ao sofrer dano, cura todos aliados próximos

**Estilo de Jogo:** Suporte reativo, cura aliados, pode alternar para modo dano.

---

#### 💀 BERSERKER - "Fúria Sangrenta"
- **Papel:** DPS Extremo (Alto Risco/Recompensa)
- **Elementos:** 🔥 Fogo | 🌍 Terra | 💧 Água
- **Range:** 1-3 células
- **Dificuldade:** ⭐⭐⭐⭐ (Difícil)

**Mecânicas Únicas:**
- **BERSERK:** Dano máximo (+100%) em 50% HP
- **Auto-Dano:** Feitiços machucam você também
- **Scaling HP Baixo:** Mais dano quanto menor o HP
- **On Kill:** Ao matar, ganha PA, HP, PM e armor
- **On Hit:** Ao sofrer dano, ganha +12% dano

**Estilo de Jogo:** Mantém HP em ~50%, causa dano absurdo, recompensas por kills.

---

### 2.3 Tabela Comparativa

| Classe | Dano | Tanque | Suporte | Mobilidade | Sustain | Controle |
|--------|------|--------|---------|------------|---------|----------|
| Guerreiro | 8/10 | 6/10 | 2/10 | 6/10 | 4/10 | 5/10 |
| Atirador | 8/10 | 2/10 | 1/10 | 9/10 | 3/10 | 6/10 |
| Caçador | 7/10 | 4/10 | 3/10 | 7/10 | 8/10 | 7/10 |
| Guardião | 4/10 | 10/10 | 7/10 | 3/10 | 5/10 | 6/10 |
| Clérigo | 5/10 | 3/10 | 10/10 | 5/10 | 9/10 | 4/10 |
| Berserker | 10/10 | 3/10 | 0/10 | 4/10 | 6/10 | 3/10 |

---

### 2.4 Escolhendo Sua Classe

#### Para Iniciantes:
- **Guerreiro** - Simples, direto, alto dano CAC
- **Atirador** - Fácil de entender, mantém distância

#### Para Jogadores Experientes:
- **Caçador** - Versátil, requer posicionamento
- **Guardião** - Tanque com timing de bloqueio
- **Clérigo** - Suporte com decisões táticas

#### Para Veteranos:
- **Berserker** - Gerenciamento de HP crítico, alto risco

---

## 3. Sistemas de Combate

### 2.1 Recursos de Combate

#### Pontos de Ação (PA)
- **Padrão:** 6 PA por turno
- **Uso:** Lançar feitiços e ataques
- **Regeneração:** Completa no início do turno

#### Pontos de Movimento (PM)
- **Padrão:** 3 PM por turno
- **Uso:** Mover pelo grid
- **Custo:** 1 PM por célula (diagonal também)
- **Regeneração:** Completa no início do turno

#### Pontos de Energia (PE)
- **Padrão:** 6 PE máximo
- **Uso:** Feitiços especiais e poderosos
- **Regeneração:** Recupera 2 PE por turno

#### Pontos de Vida (PV)
- **Padrão inicial:** 1000 HP
- **Aumenta com:** Equipamentos, level, atributos
- **Morte:** Ao chegar a 0 HP

### 2.2 Mecânicas de Combate

#### Crítico
- **Fórmula:** Chance de crítico × 100%
- **Efeito:** +30% de dano
- **Visual:** ⚡ CRÍTICO! no log

#### Parada (Dodge)
- **Fórmula:** Chance de esquiva × 100%
- **Efeito:** -30% de dano recebido
- **Visual:** 🛡️ PARADA! no log

#### Lock e Tackle
- **Lock (BLQ):** Dificulta movimento de inimigos adjacentes
- **Tackle (ESQ):** Reduz efeito do lock
- **Fórmula:** `(BLQ - ESQ) / 100 = chance de bloquear`

#### Push e Pull
- **Push:** Empurra alvo para trás
- **Pull:** Puxa alvo para perto
- **Uso:** Posicionamento tático

---

## 3. Equipamentos e Itens

### 3.1 Slots de Equipamento (18 total)

#### Principais (8 slots)
1. **weapon** - Mão Direita (arma principal)
2. **weaponLeft** - Mão Esquerda (escudo/arma secundária)
3. **helmet** - Capacete
4. **chest** - Peitoral/Armadura
5. **legs** - Calças
6. **boots** - Botas
7. **cape** - Capa
8. **belt** - Cinto

#### Anéis (10 slots)
9-18. **ring0 a ring9** - 10 anéis equipáveis

### 3.2 Raridades

| Raridade | Cor | Poder Relativo |
|----------|-----|----------------|
| Comum | Branco | Base |
| Incomum | Verde | +50% |
| Raro | Azul | +100% |
| Épico | Roxo | +200% |
| Lendário | Dourado | +400% |

### 3.3 Atributos de Equipamentos

#### Atributos Primários
- **strength** - Força (aumenta dano físico)
- **intelligence** - Inteligência (aumenta dano mágico)
- **agility** - Agilidade (aumenta esquiva e crítico)

#### Atributos Secundários
- **pv** - Pontos de Vida
- **pa** - Pontos de Ação
- **pm** - Pontos de Movimento
- **pe** - Pontos de Energia

#### Atributos de Combate
- **critical** - Chance de crítico (%)
- **dodge** - Chance de esquiva (%)
- **defense** - Defesa geral
- **magic** - Poder mágico

---

## 4. Resistências Elementais

### 4.1 Sistema de Resistências

#### Atributos de Resistência
```
res_fire      - Resistência ao Fogo
res_water     - Resistência à Água
res_air       - Resistência ao Ar
res_earth     - Resistência à Terra
res_neutral   - Resistência ao Neutro
res_general   - Resistência Geral (soma em TODOS)
```

#### Fórmula de Conversão
```
Redução% = resist / (|resist| + 200) × 100
```

**Característica:** Diminishing Returns (retornos decrescentes)

### 4.2 Tabela de Valores

| Pontos | Redução % | Dano Recebido | Efeito |
|--------|-----------|---------------|--------|
| -100 | -33% | 133% | Muito vulnerável |
| -50 | -20% | 120% | Vulnerável |
| 0 | 0% | 100% | Normal |
| 25 | 11% | 89% | Resistência leve |
| 50 | 20% | 80% | Resistência moderada |
| 100 | 33% | 67% | Resistência alta |
| 200 | 50% | 50% | Metade do dano |
| 400 | 67% | 33% | Muito resistente |
| 800 | 80% | 20% | Quase imune |

### 4.3 Como Funciona

**Exemplo Prático:**
```
Você equipa:
- Armadura Dracônica: +14 res_fire, -6 res_water, +3 res_general
- Capa do Mago: +6 res_air, +3 res_neutral
- 10 Anéis Anti-Fogo: +2 res_fire cada = +20 total

Resistência ao Fogo: 14 + 3 + 20 = 37 pontos
Conversão: 37/(37+200) = 15.6% redução

Dano de fogo recebido: 100 → 84 (redução de 16 pontos)
```

### 4.4 Vulnerabilidades (Itens Raros+)

**Regra:** Apenas itens **Raros, Épicos e Lendários** podem ter vulnerabilidades (resistências negativas).

**Exemplo:**
- Armadura Draconiana: +22 fogo, **-12 água**, +8 terra
- **Forte contra:** Dragões de fogo
- **Fraco contra:** Monstros de água

---

## 5. Dano e Elementos

### 5.1 Elementos do Jogo

#### 🔥 Fogo
- **Forte contra:** Terra, Ar
- **Fraco contra:** Água
- **Temática:** Dragões, Fênix, Magma

#### 💧 Água
- **Forte contra:** Fogo
- **Fraco contra:** Terra
- **Temática:** Oceano, Gelo, Urso Polar

#### 🌪️ Ar
- **Forte contra:** Água
- **Fraco contra:** Terra
- **Temática:** Pássaros, Vento, Magos

#### 🌍 Terra
- **Forte contra:** Ar
- **Fraco contra:** Água
- **Temática:** Rochas, Urso, Lobo

#### ⚪ Neutro
- **Forte contra:** Nenhum
- **Fraco contra:** Nenhum
- **Temática:** Físico, Universal, Arcano

### 5.2 Atributos de Dano Elemental

```
dmg_fire       - Bônus % para dano de fogo
dmg_water      - Bônus % para dano de água
dmg_air        - Bônus % para dano de ar
dmg_earth      - Bônus % para dano de terra
dmg_neutral    - Bônus % para dano neutro
dmg_elemental  - Bônus % para todos elementos (EXCETO neutro)
dmg_geral      - Bônus % para TODOS (incluindo neutro)
```

### 5.3 Cálculo de Dano (Ordem de Aplicação)

1. ⚡ **Dano Base** - Aleatório entre min e max
2. 💪 **Scaling** - 70% do atributo (força/inteligência)
3. ➕ **Bônus Passivo** - Efeitos ativos
4. ✨ **Efeitos do Caster** - Buffs temporários
5. 🔥 **Bônus Elemental** - dmg_fire, dmg_elemental, dmg_geral
6. 🛡️ **Vs Blindado** - Bônus contra blindados
7. ⚔️ **Crítico** - +30% se crítico
8. 🔰 **Resistência** - Redução pela resistência do alvo
9. 🛡️ **Parada** - -30% se alvo parar
10. ❤️ **Aplicar** - Escudo → HP

**Exemplo:**
```
Dano base: 100
Inteligência: 50 → +35 (70% de 50)
dmg_fire: 30% → ×1.30
dmg_geral: 10% → ×1.10
Crítico: +30%

Cálculo: (100 + 35) × 1.30 × 1.10 × 1.30 = 251 de dano!
```

---

## 6. Monstros e IA

### 6.1 Tipos de Monstros

#### Aggressive Melee (Agressivo Corpo a Corpo)
- **Comportamento:** Se aproxima e ataca
- **Prioridade:** Alvos com baixo HP
- **Distância preferida:** 1-2 células

#### Defensive Ranged (Defensivo à Distância)
- **Comportamento:** Mantém distância e ataca de longe
- **Prioridade:** Posicionamento seguro
- **Distância preferida:** 4-8 células

### 6.2 Sistema de IA

**Avaliação de Ações:**
- ⚔️ **Atacar:** Score baseado em dano esperado
- 🏃 **Mover:** Score baseado em posicionamento
- 🛡️ **Defender:** Score baseado em HP restante
- ✨ **Buff:** Score baseado em utilidade

**Decisão Final:** Escolhe ação com maior score

### 6.3 Resistências de Monstros

| Tipo de Monstro | Resistências | Vulnerabilidades |
|-----------------|--------------|------------------|
| Normal | -20% a +50% | Pode ter 1 elemento |
| Poderoso | +50% a +60% | Geralmente 1 vulnerabilidade |
| Tanque | +70% a +80% | 1-2 vulnerabilidades fortes |
| Chefe | +60% a +90% | Mecânica especial |

---

## 7. Sistema de Revive

### 7.1 Morte e Revive

#### Quando Você Morre
1. **HP chega a 0**
2. **Combate termina** (derrota)
3. **Tela de Revive** aparece automaticamente

#### Opções de Revive
- **Reviver Aqui** - Volta com 50% HP no mesmo local
- **Reviver na Cidade** - Volta com 100% HP na cidade inicial

### 7.2 Penalidades

**Nenhuma penalidade atualmente!**
- Não perde XP
- Não perde itens
- Não perde equipamentos

**Futuro:** Sistema de penalidade será implementado.

---

## 8. Recursos e Crafting

### 8.1 Tipos de Recursos

#### 🪵 Lenhador
- **Madeira** - Recurso básico de madeira
- **Uso:** Crafting de itens de madeira

#### ⛏️ Mineiro
- **Minério de Ferro** - Recurso de mineração
- **Uso:** Crafting de armaduras e armas

#### 🌾 Fazendeiro
- **Grãos, Vegetais** - Recursos de fazenda
- **Uso:** Crafting de consumíveis

#### 💀 Recursos de Monstros
- **Pele, Garras, Dentes** - Drop de monstros
- **Uso:** Crafting de equipamentos temáticos

### 8.2 Sistema de Drop

**Chance de Drop:**
- Comum: 60%
- Incomum: 30%
- Raro: 8%
- Épico: 1.8%
- Lendário: 0.2%

---

## 9. Progressão e Level

### 9.1 Sistema de XP

**Ganho de XP:**
- Matar monstros
- Completar missões (futuro)
- Explorar áreas (futuro)

**Level Up:**
- XP necessário aumenta por level
- Ganha pontos de atributo
- Desbloqueia novos feitiços

### 9.2 Níveis de Equipamento

**Requisito de Nível (nivelRequerido):**
- Level 1-10: Itens iniciantes
- Level 11-25: Itens intermediários
- Level 26-50: Itens avançados
- Level 51-100: Itens de elite
- Level 101-200: Itens endgame

**Progressão de Poder:**
```
Level 10 Set: 50 pontos resistência = 20% redução
Level 50 Set: 370 pontos = 65% redução
Level 100 Set: 900 pontos = 82% redução
Level 200 Set: 2925 pontos = 94% redução
```

---

## 10. Limites Táticos

### 10.1 Limite de Invocações

**Máximo:** 5 invocações simultâneas por jogador

**Por quê?**
- Evita spam
- Mantém combate tático
- Performance do jogo

### 10.2 Limite de Efeitos

**Máximo:** 20 efeitos ativos por entidade

**Por quê?**
- Evita bugs de acúmulo infinito
- Clareza visual
- Performance

### 10.3 Limite de Combatentes

**Máximo:** 10 entidades por lado (jogador + invocações vs monstros)

**Por quê?**
- Combates gerenciáveis
- Clareza tática
- Performance

---

## 11. Feitiços e Habilidades

### 11.1 Categorias de Feitiços

#### Dano Direto
- **Exemplo:** Bola de Fogo, Jato d'Água
- **Efeito:** Causa dano imediato
- **Elemento:** Variável

#### Buffs
- **Exemplo:** Escudo de Fogo, Proteção Universal
- **Efeito:** Aumenta resistências ou atributos
- **Duração:** 2-5 turnos

#### Debuffs
- **Exemplo:** Fragilidade de Gelo, Vulnerabilidade Elemental
- **Efeito:** Reduz resistências ou atributos do alvo
- **Duração:** 2-5 turnos

#### Cura
- **Exemplo:** Cura de Fogo, Cura de Água
- **Efeito:** Restaura HP
- **Elemento:** Temático (não afeta eficácia)

#### Utilidade
- **Exemplo:** Teleporte, Push, Pull
- **Efeito:** Posicionamento tático

### 11.2 Sistema de Alcance

#### Cross (Cruz)
```
    □
  □ ■ □
    □
```

#### Circle (Círculo)
```
  □ □ □
  □ ■ □
  □ □ □
```

#### Line (Linha)
```
□ □ ■ □ □
```

#### Diagonal
```
□     □
  □ ■ □
□     □
```

#### Star (Estrela)
```
  □   □
□ □ ■ □ □
  □   □
```

### 11.3 Cooldowns

- **Por Turno:** Pode usar 1x por turno
- **Por Alvo:** Pode usar 1x por alvo
- **Global:** Precisa esperar X turnos entre usos

---

## 12. Controles e Interface

### 12.1 Atalhos de Teclado

#### Exploração
- **WASD** ou **Setas** - Mover pelo mapa
- **Espaço** - Interagir
- **Tab** - Trocar entre janelas
- **Esc** - Fechar janela atual

#### Combate
- **1-0** - Usar feitiço dos slots 1-10
- **Shift+1-5** - Usar feitiço dos slots passivos
- **Enter** - Finalizar turno
- **Esc** - Cancelar ação

#### Interface
- **I** - Abrir inventário
- **C** - Abrir características
- **E** - Abrir equipamentos
- **K** - Abrir feitiços
- **M** - Abrir mapa

### 12.2 Drag & Drop

**Inventário:**
- Arrastar itens entre slots
- Arrastar para equipar
- Arrastar para o chão (descartar)

**Feitiços:**
- Arrastar para hotbar
- Arrastar entre slots
- Shift+Clique para remover

**Equipamentos:**
- Arrastar para equipar
- Arrastar para inventário
- Arrastar entre slots de anel

### 12.3 Overflow de Inventário

**Quando inventário está cheio:**
1. Janela "📦 Itens não couberam" aparece automaticamente
2. Itens ficam temporariamente armazenados
3. Arraste para inventário quando houver espaço
4. Ou clique "Descartar" para jogar fora

---

## 📚 Arquivos de Referência

### Design de Itens
- [docs/DESIGN_DE_ITENS.md](docs/DESIGN_DE_ITENS.md) - Regras completas de criação de itens

### Plano do Jogo
- [docs/PLANO_DO_JOGO.md](docs/PLANO_DO_JOGO.md) - Visão geral e roadmap

### Arquivos de Teste
- [ITENS_TESTE_COMBATE.js](ITENS_TESTE_COMBATE.js) - 21 anéis de teste
- [FEITICOS_TESTE_RESISTENCIAS.js](FEITICOS_TESTE_RESISTENCIAS.js) - Feitiços de teste

---

## 🎮 Dicas de Gameplay

### Estratégias Básicas

1. **Escolha o Elemento Certo**
   - Veja resistências do monstro (clique na barra dele)
   - Use elemento que ele é vulnerável (vermelho)
   - Evite elemento que ele resiste (verde)

2. **Posicionamento é Tudo**
   - Mantenha distância de inimigos corpo a corpo
   - Use obstáculos como cobertura
   - Agrupe aliados para buffs em área

3. **Gerencie Recursos**
   - PA é precioso - não desperdice
   - PE regenera devagar - use com sabedoria
   - PM define seu posicionamento - planeje movimento

4. **Build Especializada vs Balanceada**
   - **Especializada:** Forte em 1 elemento, vulnerável em outro
   - **Balanceada:** Resistência moderada em todos elementos

5. **Aproveite Críticos**
   - Equipe itens com +crítico
   - Crítico = +30% dano
   - Melhor para builds de dano

---

## 🔧 Comandos de Desenvolvedor (Console)

### Adicionar Itens de Teste
```javascript
// No console (F12)
// Cole o conteúdo de ITENS_TESTE_COMBATE.js e execute:

adicionarItensDeTeste();  // Adiciona itens ao banco
darTodosItensDeTeste();   // Coloca no inventário
```

### Aprender Feitiços de Teste
```javascript
learnSpell('buff_escudo_fogo');
learnSpell('teste_bola_fogo');
learnSpell('teste_cura_fogo');
```

### Outros Comandos Úteis
```javascript
// Dar HP
playerStats.hp = 9999;

// Dar recursos
playerStats.pa = 99;
playerStats.pm = 99;
playerStats.pe = 99;

// Teleportar
playerPosition = {x: 30, y: 30};
```

---

**Versão:** 2.0 - Guia Consolidado
**Data:** 2026-02-11
**Status:** ✅ Completo e Atualizado

Este é o guia definitivo do jogo. Todas as mecânicas, sistemas e informações estão aqui!

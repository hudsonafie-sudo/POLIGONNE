# MECANICAS DO SISTEMA — DOCUMENTACAO OBRIGATORIA

**LEITURA OBRIGATORIA** — Todo agente de IA DEVE ler este arquivo ANTES de criar, modificar ou remover qualquer feitico, invocacao, efeito, classe, mecanica de combate ou comportamento de IA. Este documento eh o sistema vivo do jogo.

**REGRA DE OURO: Ao alterar QUALQUER mecanica, verifique TODOS os locais no codigo onde ela aparece. Use Grep para buscar o campo/funcao alterado em TODO o projeto antes de modificar.**

---

## INDICE

1. [Sistema de Classes](#1-sistema-de-classes)
2. [Sistema de Feiticos (Spells)](#2-sistema-de-feiticos)
3. [Sistema de Invocacoes (Summons)](#3-sistema-de-invocacoes)
4. [Sistema de Dano e Cura](#4-sistema-de-dano-e-cura)
5. [Sistema de Efeitos (Buffs/Debuffs)](#5-sistema-de-efeitos)
6. [Sistema de Auras e Zonas](#6-sistema-de-auras-e-zonas)
7. [Sistema de Combate (Turnos)](#7-sistema-de-combate)
8. [Sistema de Alcance e Targeting](#8-sistema-de-alcance-e-targeting)
9. [Sistema de IA de Monstros](#9-sistema-de-ia)
10. [Sistema de Brasas Cromatico](#10-sistema-de-brasas)
11. [Sistema de Combos](#11-sistema-de-combos)
12. [AdvancedStatus (Estados Avancados)](#12-advancedstatus)
13. [Mapeamento Classe → Spell Class](#13-mapeamento-classe-spell)
14. [Onde Cada Mecanica Aparece no Codigo](#14-onde-cada-mecanica-aparece)
15. [Checklist de Validacao ao Criar/Alterar](#15-checklist-validacao)
16. [Erros Comuns e Como Evitar](#16-erros-comuns)
17. [Regras de Consistencia (Sistema Vivo)](#17-regras-consistencia)
18. [Sistema de Drops e Prospeccao](#18-sistema-de-drops)
19. [Sistema de Vontade (Roubo de PA/PM)](#19-sistema-de-vontade)
20. [Sistema de DOM (Passivo de Classe)](#20-sistema-de-dom)

---

## 1. SISTEMA DE CLASSES

### Arquivo: `sistema/classes.js`

6 classes jogaveis definidas em `DB_CLASSES`:

| ID | Nome | Spell Class | Role | HP | PA | PM | Elementos |
|----|------|-------------|------|-----|----|----|-----------|
| orik | Orik | `orik` | DPS Corpo a Corpo | 120 | 6 | 3 | fire, earth, air |
| zefir | Zefir | `atirador` | DPS a Distancia | 90 | 6 | 4 | air, fire, earth |
| garren | Garren | `cacador` | Bruiser Versatil | 105 | 6 | 3 | water, air, earth |
| aegis | Aegis | `guardiao` | Tank Puro | 140 | 5 | 2 | earth, fire, water |
| klaris | Klaris | `clerigo` | Suporte/Healer | 100 | 6 | 3 | water, fire, air |
| kaos | Kaos | `berserker` | DPS Suicida | 110 | 6 | 3 | fire, earth, air |

### IMPORTANTE: Mapeamento classe ID → spell class

O `DB_CLASSES.id` NAO eh sempre igual ao campo `spell.class`. Exemplo critico:

- `zefir` → spells tem `class: 'atirador'`
- `garren` → spells tem `class: 'cacador'`
- `aegis` → spells tem `class: 'guardiao'`
- `klaris` → spells tem `class: 'clerigo'`
- `kaos` → spells tem `class: 'berserker'`
- `orik` → spells tem `class: 'orik'` (unico que coincide)

**Funcao de resolucao**: `getSpellClassId(classId)` em `jogo/dev.html` resolve o mapeamento buscando o primeiro spell da classe.

### Estrutura de uma classe

```javascript
{
    id: 'orik',                    // ID unico da classe
    name: 'Orik',                  // Nome exibido
    icon: '⚔️',                   // Emoji da classe
    subtitle: 'Lamina Inabalavel', // Subtitulo
    quote: 'O ferro nao recua.',   // Citacao do personagem
    description: '...',            // Descricao completa
    difficulty: 'Facil',           // Facil, Medio, Dificil
    role: 'DPS Corpo a Corpo',     // Role no time
    elements: ['fire', 'earth', 'air'],  // Ordem dos 3 elementos
    baseStats: {
        hp: 120, pa: 6, pm: 3,
        strength: 0, intelligence: 0, agility: 0, luck: 0, wisdom: 0
    },
    triggers: {                    // Triggers passivos da classe
        onKill: ['stealPA'],       // Ao matar: rouba PA
        onBlock: ['gainArmor']     // Ao bloquear: ganha armadura
    },
    spellIds: [...]                // Array com TODOS os IDs de feiticos da classe
}
```

### Distribuicao de feiticos por classe

Padrao obrigatorio: **26 feiticos por classe**
- 15 elementais: 3 elementos × 5 feiticos cada
- 5 ativos utilitarios (teleport, summon, toggle, etc.)
- 5 passivos
- 1 DOM (passivo unico de classe)

### Triggers de classe

Processados em `processOnKillTrigger()` e `processOnBlockTrigger()` em `jogo/dev.html`:
- `stealPA` — Roubar PA ao matar
- `stealPM` — Roubar PM ao matar
- `stealHP` — Roubar HP ao matar (life steal)
- `stealShield` — Ganhar escudo ao matar
- `stealArmor` — Roubar armadura ao matar
- `gainArmor` — Ganhar armadura ao bloquear
- `gainDamage` — Ganhar bonus de dano ao bloquear
- `gainPA` — Ganhar PA ao bloquear
- `gainShield` — Ganhar escudo ao bloquear
- `concedeArmor` — Conceder armadura a aliados
- `gainResistance` — Ganhar resistencia ao sofrer dano
- `gainDamageBonus` — Ganhar bonus de dano ao sofrer dano
- `healAllies` — Curar aliados ao sofrer dano

---

## 2. SISTEMA DE FEITICOS

### Arquivos: `feiticos/classes/<classe>.js`

Cada classe tem seu arquivo de feiticos (ex: `feiticos/classes/orik.js`).

### Campos obrigatorios de TODO feitico

```javascript
{
    // === IDENTIFICACAO ===
    id: 'orik_espada_flamejante',  // ID unico (prefixo = spell class)
    catalogId: '0701000001',        // 10 digitos unico
    name: 'Espada Flamejante',      // Nome exibido
    icon: '⚔️',                    // Emoji
    class: 'orik',                  // Spell class (ver mapeamento acima!)
    element: 'fire',                // fire, earth, air, water, none, chromatic

    // === TIPO ===
    spellType: 'active',            // active, passive, dom
    castType: 'targeted',           // targeted, self

    // === CUSTOS ===
    paCost: 2,                      // Custo de PA (Pontos de Acao)
    pmCost: 0,                      // Custo de PM (Pontos de Movimento)
    peCost: 0,                      // Custo de PE (Pontos Especiais)

    // === ALCANCE ===
    minRange: 1,                    // Alcance minimo (0 = celula do caster)
    maxRange: 4,                    // Alcance maximo
    rangeShape: 'circle',           // Forma do alcance (ver secao 8)
    requiresLoS: true,              // Requer linha de visao?
    rangeModifiable: false,         // Alcance pode ser modificado por atributos?

    // === AREA DE EFEITO ===
    aoeType: 'single',             // single, zone, none
    zoneCells: [],                  // Celulas adicionais se aoeType='zone'
    zoneEffects: {                  // Quem eh afetado na zona
        dmgCaster: false,           // Dano no proprio caster?
        dmgAlly: false,             // Dano em aliados?
        dmgEnemy: true,             // Dano em inimigos?
        healCaster: false,          // Cura no caster?
        healAlly: false,            // Cura em aliados?
        healEnemy: false,           // Cura em inimigos?
        lifeSteal: false            // Life steal?
    },

    // === DANO/CURA ===
    damage: { min: 4, max: 7 },    // Dano base (null se nao causa dano)
    heal: { min: 0, max: 0 },      // Cura base (opcional)

    // === TARGETING ===
    targetEnemy: true,              // Pode atingir inimigos?
    targetAlly: false,              // Pode atingir aliados?
    needsTarget: false,             // PRECISA de alvo para lancar?
    requiresEmptyCell: false,       // Precisa de celula vazia? (teleport, summon)

    // === COOLDOWNS ===
    cooldown: 0,                    // Turnos de recarga apos uso
    castsPerTurn: 5,                // Maximo de usos por turno
    castsPerTarget: 3,              // Maximo de usos no mesmo alvo por turno
    initialCooldown: 0,             // Cooldown no inicio do combate

    // === EFEITOS ===
    effects: [                      // Efeitos (buffs/debuffs) aplicados
        { effectId: 'ardente', level: 1, target: 'enemy' }
        // target: 'enemy', 'self', 'hit', 'ally'
    ],

    // === DESCRICAO ===
    description: '...'              // DEVE refletir TODOS os valores mecanicos
}
```

### Campo opcional: stackMechanic (stacking de feiticos)

Feiticos com `stackMechanic` ganham bonus de dano por usos consecutivos.

```javascript
stackMechanic: {
    type: 'target',       // 'target' = stack por alvo, 'caster' = stack no lancador
    maxStacks: 2,         // maximo de stacks (1 = primeiro uso, 2 = max)
    damageBonus: [0, 30, 60],  // % bonus por nivel de stack (indice 0 = primeiro uso sem bonus)
    stackDuration: 2      // (opcional) turnos do lancador ate expirar se nao reaplicar
}
```

**Stacks comecam em 1** no primeiro uso (sempre visiveis). O bonus de dano usa o stack ANTERIOR:
- 1o uso: stack=1, bonus=damageBonus[0]=0%
- 2o uso: stack=2, bonus=damageBonus[1]=30%
- 3o+ uso (se maxStacks=2): stack=2, bonus=damageBonus[2]=60%

| Tipo | Comportamento | Reset |
|------|--------------|-------|
| `target` | Stack incrementa se repetir no MESMO alvo | Trocar de alvo reseta para 1 |
| `caster` | Stack incrementa a cada uso, independente do alvo | Nao reseta por troca de alvo |

**stackDuration** (opcional): se definido, stacks expiram se nao forem reaplicados.
- No fim do turno do lancador, se o feitico NAO foi usado naquele turno, `turnsLeft` decrementa.
- Quando `turnsLeft` chega a 0, o stack e removido com mensagem no chat.
- Se o feitico FOI usado, `turnsLeft` reseta e nao decrementa.
- Tick via `tickSpellStacks()` chamado em `passTurn()` e `simCombatPassTurn()`.

- Tracking em `combatState.spellStacks` (inicializado nos 6 pontos de init)
- Bonus aplicado em `dano.js` apos toggle e antes de critico

### Tipos de feitico (spellType)

| Tipo | Comportamento | Hotbar |
|------|--------------|--------|
| `active` | Feitico lancavel com custo de PA/PM/PE | Sim, na grid elemental ou ativos |
| `passive` | Efeito passivo permanente enquanto equipado | Slots de passivo (max 2) |
| `dom` | Passivo unico da classe, trigger especial | Slot DOM (1 por classe) |

### Tipos de efeito (effect)

| Effect | O que faz | Requer |
|--------|-----------|--------|
| `'damage'` (default) | Causa dano ao alvo | `damage: { min, max }` |
| `'heal'` | Cura o alvo | `heal: { min, max }` ou `damage` como fallback |
| `'teleport'` | Move o caster para a celula alvo | `requiresEmptyCell: true` |
| `'summon'` | Invoca uma criatura na celula alvo | `summon: { ... }` (ver secao 3) |
| `'selfToggle'` | Ativa/desativa modo no caster | `toggleEffect: { ... }`, clique em si no mapa |
| `'toggle'` | Ativa/desativa direto da hotbar | `toggleEffect: { ... }`, nao precisa clicar no mapa |
| `'taunt'` | Forca inimigo a atacar o caster | `duration`, `advancedStatus` |
| `'push'/'pull'` | Empurra/puxa o alvo | `pushPull: { type, distance }` |
| `'swap'`/`'swapPosition'` | Troca posicao com o alvo | - |
| `'swapTwoTargets'` | Troca posicao de 2 inimigos | Seleciona 2 alvos |
| `'sacrifice'` | Redireciona dano de aliado para si | `advancedStatus: [{ type: 'sacrificio' }]` |
| `'revive'` | Revive aliado morto (zumbi) | `targetZombie: true` |
| `'charge'` | Avanca ate 1 celula antes do alvo | Depois aplica dano |
| `'moveIgnoreBlock'` | Move caster X casas ignorando tackle | - |
| `'moveAway'` | Recua X casas do inimigo mais proximo | - |

### REGRA: selfToggle vs toggle

- `effect: 'selfToggle'` → Requer clicar em SI MESMO no mapa para ativar/desativar. Ex: Defesa do Orik.
- `effect: 'toggle'` → Ativa direto ao clicar no icone da hotbar. Nao precisa clicar no mapa.
- **ERRO COMUM**: Confundir os dois. Se o feitico requer clicar em si no mapa, use `selfToggle`.

### Campos opcionais de feitico

```javascript
// === MECANICAS ESPECIAIS ===
consumesArdente: true,          // Consome Ardente do alvo para bonus
ardenteBonus: 20,               // % de dano bonus ao consumir Ardente
ardenteBonusVsArmored: 30,      // % bonus vs escudo ao consumir Ardente
groundArdente: true,            // Celulas vazias ficam com Ardente no chao
bonusVsArmored: 10,             // % bonus vs alvos com escudo
doubleHitIfArmored: true,       // Se alvo tem escudo, aplica dano 2x (hit duplo)
damageEnemyOnly: true,          // Dano SÓ em inimigos (aliados recebem efeito mas não dano)
closeRangeEffect: {             // Efeito condicional quando lançado a curta distância
    maxRange: 3,                // Distância máxima para ativar o efeito
    blockReduction: {           // Reduz Bloqueio do alvo = percentOfLevel × nível do alvo
        percentOfLevel: 20,     // Multiplicador por nível (20 × Nv.3 = -60 block)
        duration: 2             // Duração em turnos
    }
},
bonusVsHighHp: { threshold: 80, bonus: 10 }, // +10% vs alvos com >80% HP
intacto: 10,                    // +10% quando alvo a 100% HP
firmeEForte: 10,                // +10% quando alvo >= 80% HP
berserk: 50,                    // Bonus max quando caster a 50% HP (so ativa <=50%)
morteEminente: 30,              // Bonus cura escalando com HP baixo do alvo
selfDamage: { type: 'percent', amount: 5 }, // Auto-dano % do HP max
armorGrant: { min: 10, max: 16 }, // Concede escudo ao alvo
armorSteal: { min: 5, max: 10 },  // Rouba escudo do alvo
paSteal: 2,                     // Rouba PA do alvo
pmSteal: 1,                     // Rouba PM do alvo
peGrant: 1,                     // Concede PE ao caster
grantsBrasas: true,             // Gera stack de Brasas ao usar
consumesBrasas: true,           // Consome todas as Brasas para escalar dano

// === PUSH/PULL ===
pushPull: {
    type: 'push',               // 'push' ou 'pull'
    distance: 2,                // Celulas de deslocamento
    diagonal: false,            // Push na diagonal?
    minDistanceFromCaster: 1    // Distancia minima do caster (para pull)
},

// === RICOCHETE ===
ricochete: {
    bounces: 2,                 // Numero de saltos apos alvo principal
    decayPercent: 25,           // -X% dano por salto
    maxRange: 4,                // Alcance maximo de cada salto
    sameTargetOnce: true        // Nao pode acertar mesmo alvo 2x (false = pode)
},

// === ZONA SECUNDARIA (apos dano principal) ===
secondaryZone: {
    enabled: true,
    centerOnTarget: true,       // Centro no alvo, nao no caster
    cells: [{dx: 0, dy: 0}],   // Offsets da zona secundaria
    effects: {
        pullEnemies: true,      // Puxa inimigos na zona
        pushEnemies: true       // Empurra inimigos na zona
    }
},

// === ON KILL (bonus ao matar) ===
onKill: {
    enabled: true,
    effects: [
        { type: 'stealPM', amount: 1 }  // Rouba PM ao matar com esse feitico
    ]
},

// === ZONA PRIMARIA ===
zonePattern: 'perpendicular',   // Zona perpendicular ao cast
zoneWidth: 1,                   // Largura da zona perpendicular
zoneDirectional: true,          // Zona rotaciona com direcao do cast
zoneCellsCardinal: [...],       // Celulas para cast cardinal
zoneCellsDiagonal: [...],       // Celulas para cast diagonal
zoneCellsInterCardinal: [...],  // Celulas para cast inter-cardinal

// === HP SCALING ===
damageScaling: {
    type: 'execute',            // 'execute', 'intacto', 'berserk'
    threshold: 30,              // % HP para ativar
    bonus: 25                   // % bonus de dano
},
healScaling: {
    type: 'socorro',            // % bonus cura se alvo HP <= threshold
    threshold: 30,
    bonus: 30
},

// === TOGGLE ===
toggleEffect: {
    dmgPenalty: 15,             // -15% dano enquanto ativo
    damageBonus: 40,            // +40% dano enquanto ativo
    healBonus: 25,              // +25% cura enquanto ativo
    onSpellCast: {
        triggerSpellIds: [...], // Spells que ativam o bonus
        grantArmorPercent: 3,   // % HP max como armadura por cast
        maxArmorPercent: 50     // Limite de armadura
    }
},

// === ADVANCED STATUS ===
advancedStatus: [{
    type: 'estabilizado',       // Tipo do status (ver secao 12)
    duration: 1,                // Duracao em turnos
    immunityDuration: 2         // Turnos de imunidade apos expirar
}],

// === PASSIVO ===
passiveEffect: {
    onBlock: {
        enabled: true,
        minDamageBlocked: 8,    // Minimo de dano bloqueado para ativar
        effects: [
            { type: 'armor', amount: 5, duration: 1 }
        ]
    },
    onHitTaken: {
        enabled: true,
        minDamage: 8,
        effects: [
            { type: 'gainPA', amount: 1, duration: 1, oncePerTurn: true }
        ]
    },
    onTurnStart: {
        enabled: true,
        effects: [{ type: 'heal', percent: 3 }]
    },
    maxHpPercent: 10,           // +10% HP max permanente
    maxPm: 1,                   // +1 PM maximo
    maxPa: 1,                   // +1 PA maximo
    rangeBonus: 2,              // +2 alcance em todos feiticos
    dodge: 10,                  // +10% esquiva
    critico: 10,                // +10% critico
    closeCombatBonus: { maxRange: 3, damagePercent: 20 }  // +20% dano se dist <= 3
},

// === DOM ===
domPassive: {                   // Passivo unico da classe (dados do DOM)
    trigger: 'onRangedDamage',  // Tipo de trigger
    minRange: 4,                // Distancia minima para ativar
    pointsPerPA: 5,             // Pontos ganhos por PA gasto no feitiço
    threshold: 100,             // Pontos necessarios para ativar bonus
    critBonus: 20,              // +20% critico ao atingir threshold
    critDuration: 1,            // Duracao do bonus de critico em turnos
    nextHitDmgBonus: 30         // +30% dano no proximo golpe (nao expira)
}
```

---

## 3. SISTEMA DE INVOCACOES

### Como funciona

1. Feitico com `effect: 'summon'` + campo `summon: { ... }`
2. O caster clica em celula vazia dentro do alcance
3. Uma nova entidade eh criada como participante do combate
4. A invocacao tem HP baseado no % do HP max do conjurador

### Estrutura do summon no feitico

```javascript
summon: {
    type: 'estandarte',         // Tipo unico da invocacao
    hpPercent: 30,              // % do HP max do caster
    inheritResistances: true,   // Herda resistencias do caster?
    aura: {                     // Aura passiva (opcional)
        range: 2,
        rangeShape: 'circle',
        type: 'passiveZone',
        bonusBlock: 20,
        bonusBlockPercent: 30,
        target: 'allies'
    }
}
```

### Tipos de invocacao — 3 categorias

O jogo suporta (ou pode suportar) 3 tipos de invocacoes. A diferenca eh como o turno eh processado:

#### Tipo 1: PASSIVA (atual, unica implementada)
- **participant.type**: `'summon'`
- **PA/PM**: 0/0
- **Turno**: Auto-skip (300ms de delay, depois passa automaticamente)
- **Controle**: Nenhum — jogador NAO controla
- **IA**: Nenhuma — apenas existe no mapa como obstaculo/aura
- **Exemplo**: Bandeira do Orik
- **Como funciona**: Fica parada, pode ter aura passiveZone, recebe dano, morre

#### Tipo 2: CONTROLAVEL PELO JOGADOR (IMPLEMENTADO)
- **Definicao**: `summon: { controlled: true, stats: { pa:4, pm:3 }, spells: ['id1','id2'] }`
- **participant.type**: `'summon'` com `entity.controlled = true`
- **PA/PM**: > 0 (definido em `summon.stats.pa/pm`)
- **Turno**: Jogador controla — hotbar troca para feiticos da invocacao, jogador move, usa feiticos, passa turno
- **IA**: Nenhuma (jogador decide)
- **Exemplo**: Golem de pedra, Clone, Boneco tank

**Como funciona:**
1. `isPlayerControlled(participant)` — helper que retorna true para player OU summon controlada
2. Auto-skip: `simCombatPassTurn()` verifica `!newP.entity.controlled` antes de auto-pass
3. Hotbar: Feiticos registrados em `simCombatState.participantSpells[summonId]`, trocados no inicio do turno
4. Movimento: `getSimCombatActiveCaster()` retorna a entity da invocacao, PM sincronizado via `syncSimCombatToSystem`
5. Spacebar: `isPlayerControlled(_scCurP)` permite passar turno
6. Camera: Segue `getSimCombatActiveCaster()` automaticamente
7. Lock/Tackle: Team check usa player/summon vs monster (nao type direto)
8. Passivas: `combatState.passiveBoosts = {}` durante turno da invocacao (isolamento)
9. Morte: Se invocacao morre durante seu turno, auto-pass + restaura passiveBoosts
10. Visual: Highlight azul (#44aadd), health bar azul, instrucao "Controlando: Nome"

#### Tipo 3: IA AUTONOMA (NAO implementado ainda)
- **participant.type**: Seria `'summon_ai'` ou campo `summon.aiType: 'aggressive_melee'`
- **PA/PM**: > 0 (ex: PA=3, PM=3)
- **Turno**: IA automatica (mesmo sistema dos monstros)
- **Controle**: Nenhum — IA decide movimento e ataques
- **IA**: Usa `executeMonsterAI()` com aiType definido
- **Exemplo futuro**: Lobo invocado, Esqueleto guerreiro, Elementar

**O QUE PRECISARIA MUDAR PARA IMPLEMENTAR:**
1. `simCombatPassTurn()` (dev.html ~linha 19932): Detectar `summon.aiType` e chamar `executeMonsterAI()` em vez de auto-skip
2. A invocacao precisaria de `entity.aiType` definido
3. A invocacao precisaria de feiticos/ataques proprios
4. `executeMonsterAI()` precisaria entender que a invocacao eh ALIADA (nao atacar players)
5. **CUIDADO**: A IA de monstros trata todos como inimigos — precisaria de logica de time
6. **CUIDADO**: `_aiReservedCells` precisaria incluir invocacoes IA
7. **CUIDADO**: A invocacao IA deve poder ser alvo de ataques inimigos normalmente

### ATENCAO — Risco de bugs ao criar invocacoes controlaveis/IA

| Potencial Bug | Causa | Prevencao |
|---------------|-------|-----------|
| Turno fica travado | Auto-skip nao detecta tipo correto | Verificar check de type em `simCombatPassTurn` |
| Hotbar vazia no turno da invocacao | Feiticos nao atribuidos | Criar `participantSpells[summonId]` |
| Spacebar nao funciona | Guard de `type !== 'player'` | Incluir novo type no guard |
| Invocacao IA ataca aliados | IA nao sabe o time | Adicionar logica de team no IA |
| Movimento bugado | PM > 0 mas calculo de path usa player | Verificar entity source no pathfinding |
| Stats nao reseta ao morrer | entityStats orfao | Limpar em setEntityHp quando hp <= 0 |

### Propriedades da invocacao PASSIVA no combate (ATUAL)

| Propriedade | Valor | Nota |
|-------------|-------|------|
| `type` | `'summon'` | No participant.type |
| HP | `casterMaxHp * hpPercent / 100` | Arredondado |
| PA | `0` | Invocacoes passivas NAO tem PA |
| PM | `0` | Invocacoes passivas NAO tem PM |
| PE | `0` | Invocacoes passivas NAO tem PE |
| Turno | Auto-skip | `simCombatPassTurn` linha ~19933 faz skip por TYPE, nao por stats |
| Controle | Sem controle | Jogador NAO controla |
| IA | Nenhuma | Apenas existe no mapa |
| Time | Aliado do caster | `type: 'summon'` = time do caster |

### Atributos de Invocacao (`summon.stats`)

Invocacoes podem ter stats proprios definidos em `summon.stats`:

```javascript
summon: {
    type: 'golem',
    hpPercent: 40,
    stats: {
        block: 15,          // Bloqueio (para tackle)
        dodge: 5,           // Esquiva (para fugir de tackle)
        pa: 2,              // PA (entityStats — pode ser roubado)
        pm: 1,              // PM (entityStats — pode ser roubado)
        pe: 0,              // PE (entityStats)
        parada: 10,         // Chance de parada
        critico: 5,         // Chance de critico
        strength: 0,        // Forca
        intelligence: 0,    // Inteligencia
        agility: 0,         // Agilidade
        luck: 0             // Sorte
    }
}
```

**Regras**:
- PA/PM/PE vao para `entityStats[smId]` — podem ser roubados por inimigos
- Block/dodge afetam tackle (invocacao com block > 0 trava inimigos adjacentes)
- Auto-skip AINDA aplica para `type: 'summon'` independente de PA/PM
- Stats sao **fixos** (nao herdam do caster, nao escalam com level)
- Se `summon.stats` nao existir, todos os stats sao 0

### CRITICO: Auto-skip eh por TYPE, nao por PA/PM

O codigo em `simCombatPassTurn()` (dev.html ~linha 19932-19937):
```javascript
// Auto-pass para invocações (0 PA, 0 PM — não fazem nada)
if (newP.type === 'summon') {
    setTimeout(function() {
        if (simCombatState.active) simCombatPassTurn();
    }, 300);
    return;
}
```
Isso significa que MESMO se voce der PA=6, PM=3 para uma invocacao, ela ainda vai auto-skip porque o check eh `type === 'summon'`, NAO `pa === 0`. Para invocacoes controlaveis/IA, o TYPE precisa ser diferente ou o check precisa ser alterado.

### Limite de invocacoes

- Atributo `invocation` do conjurador determina o limite
- **Formula**: maximo de invocacoes = `invocation + 1`
  - 0 invocation = 1 invocacao ativa
  - 1 invocation = 2 invocacoes ativas
  - etc.
- Quando o limite eh atingido, a invocacao **mais antiga** desaparece ao criar nova
- Rastreamento: `combatState.activeSummons[]`

### Ciclo de vida da invocacao

1. **Criacao**: `effect: 'summon'` → cria participant + entity + entityStats + activeSummon
2. **Turno**: Auto-skip (check por type, nao por stats)
3. **Dano recebido**: Pode ser atacada normalmente
4. **Morte**: HP <= 0 → removida de `activeSummons[]` e `participants[]`
5. **Aura**: Se tiver aura, ela desaparece junto com a invocacao

### Onde no codigo

| O que | Arquivo | Local |
|-------|---------|-------|
| Criacao | `jogo/dev.html` | `applySpellEffect()` ou secao de summon (~23576) |
| Auto-skip | `jogo/dev.html` | `simCombatPassTurn()` linha ~19933 (`type === 'summon'`) |
| HP/Morte | `mecanicas/dano.js` | `setEntityHp()` → filtra `activeSummons` (~108-131) |
| Aura block | `mecanicas/dano.js` | `dealDamageToTarget()` (~599-623) |
| Limite invocacoes | `jogo/dev.html` | Secao pre-summon (~23493-23506) |
| Summon rendering | `jogo/dev.html` | HP bar cor `#ddaa44` (~14209) |

### REGRA: Ao criar nova invocacao PASSIVA (tipo atual)

1. Definir `effect: 'summon'` no feitico
2. Definir `summon: { type, hpPercent, ... }`
3. Adicionar `requiresEmptyCell: true` no feitico
4. Se tiver aura, definir `summon.aura` com tipo correto (ver secao 6)
5. A invocacao NAO controla feiticos — PA e PM devem ser 0
6. A invocacao passa o turno automaticamente
7. Verificar se o nome/type nao conflita com invocacoes existentes
8. Verificar o atributo `invocation` do caster para o limite

### REGRA: Ao criar invocacao CONTROLAVEL (Tipo 2)

1. Tudo da regra de invocacao passiva MAIS:
2. Definir `summon: { controlled: true }` na definicao do feitico
3. Definir PA > 0 e PM >= 0 em `summon.stats: { pa: X, pm: Y }`
4. Criar array de feiticos da invocacao em `summon.spells: ['spell_id_1', 'spell_id_2']`
5. Os spell IDs devem existir em `DB_HABILIDADES`
6. `passiveBoosts` do jogador NAO se aplicam durante turno da invocacao
7. `calculateTotalAttributes()` retorna stats do PLAYER — usar dano flat ou stats proprias da invocacao
8. Testar: turno entra? hotbar carrega? spacebar funciona? movimento funciona? morte auto-passa?

### REGRA: Ao criar invocacao com IA (Tipo 3 — NAO implementado)

1. Definir `summon.aiType: 'tipo'` e verificar que `executeMonsterAI()` entende aliados
2. **PERGUNTAR AO USUARIO** antes de implementar — requer alteracao em ia_monstros.js

---

## 4. SISTEMA DE DANO E CURA

### Arquivo: `mecanicas/dano.js`

### Pipeline de dano (ordem de aplicacao)

1. **Dano base**: `spell.damage.min` a `spell.damage.max` (aleatorio)
2. **Scaling de stat**: `baseDmg × (1 + (stat + poder) / 100)` onde stat = mapeado pelo elemento
3. **Bonus de passivos flat**: `+ passiveBonus` (flat, nao multiplicativo)
4. **Efeitos ativos do caster**: Poderoso (+X% dano), etc.
5. **% Dano elemental de itens**: `dmg_fire`, `dmg_earth`, etc.
6. **% Dano geral de itens**: `dmg_geral` (aplica a todos elementos)
7. **Pontos de distribuicao**: `dmg_single`, `dmg_zone`, `dmg_range`, `dmg_melee`, `dmg_indirect`
8. **Consumo de Ardente**: Se `consumesArdente` + alvo tem Ardente
9. **Bonus vs Escudo**: `bonusVsArmored` + efeitos ativos
9b. **Reducao de dano por Erosao**: `dmg_dealt` `percent_reduce` (ex: Erosao -3%/stack)
10. **Resistencia elemental do alvo**: Diminishing returns formula
11. **Berserk**: Bonus max a 50% HP do caster (so ativa <=50%)
12. **HP Scaling**: `damageScaling` (execute, intacto, berserk)
13. **Intacto/FirmeEForte**: Bonus se alvo HP alto
14. **Bonus de passivos**: `_damageBonus`, `_bonusVsArmored`, `_closeCombatBonus`
15. **Toggle bonus/penalty**: Dano de toggle ativo
16. **Critico**: Chance baseada em `critico`. Multiplicador: `1.30 + dano_critico/200`. Dano_critico funciona como bonus elemental coringa (peso metade, so ativa em crit)
18. **Reducao de dano de passivos**: Se alvo tem `_damageReduction`
19. **Esquiva (Dodge)**: Chance de evitar 100% do dano
20. **Bloqueio (Block)**: Chance de reduzir dano em 50%
21. **Parada**: Chance de reduzir dano em 30% (independente de dodge/block)
22. **Sacrificio**: Redireciona dano para outra entidade
23. **Absorcao de escudo**: Armadura absorve antes do HP
24. **Dano final aplicado**: HP reduzido

### Mapeamento elemento → stat de scaling

| Elemento | Stat | Nota |
|----------|------|------|
| fire | intelligence | Fogo escala com INT |
| earth | strength | Terra escala com STR |
| air | agility | Ar escala com AGI |
| water | luck | Agua escala com LCK |
| none/neutral | strength | Neutro escala com STR |
| chromatic | (resolve melhor) | Usa o maior stat do caster |

### Formula de resistencia

```
reducao% = resistencia / (|resistencia| + 200) × 100
```
- 0 resist = 0% reducao
- 100 resist = 33% reducao
- 200 resist = 50% reducao
- Resist negativa = AMPLIFICACAO de dano

### Pipeline de cura (ordem)

1. **Cura base**: `spell.heal.min` a `spell.heal.max`
2. **Scaling de stat**: Mesmo que dano, baseado no elemento
3. **Pontos de support**: `playerAllocatedDamage.support`
4. **Toggle bonus de cura**: `healBonus` de toggle ativo
5. **Efeitos no alvo**: `heal_received` (buff) e `heal_received_reduce` (debuff)
6. **Berserk**: Mesmo que dano
7. **HP Scaling de cura**: `healScaling` (socorro)
8. **Morte Eminente**: Bonus escalando com HP baixo do alvo
9. **Intacto**: Bonus se alvo a 100% HP
10. **Critico**: Chance baseada em `critico`. Multiplicador: `1.35 + dano_critico/200`
11. **Cap**: Nao pode curar acima de maxHp

### Escudo (Armor)

- Maximo: 50% do HP maximo da entidade
- Absorve dano ANTES do HP
- `getEntityArmor()`, `setEntityArmor()`, `getEntityMaxArmor()`

### Dano Indireto

Dano causado **fora do turno** do caster (armadilhas, DoT, brasas, etc.)

**Assinatura**: `dealDamageToTarget(target, spell, isLifeSteal, options)`

| Campo options | Tipo | Descricao |
|---|---|---|
| `overrideCasterId` | string | ID do caster real (para armadilhas/DoT fora do turno) |
| `isIndirect` | boolean | Marca como dano indireto |
| `trapOriginX/Y` | number | Posicao de origem do dano (para calculo melee/range) |

**Regras**:
- Escala com TODOS os atributos normais (stat scaling, elemental%, resistencias, critico, etc.)
- Bonus `dmg_indirect` aplica APENAS em dano indireto (nao afeta dano direto)
- Classificacao melee/range: distancia Manhattan entre caster e alvo no momento do tick
- Classificacao zone/single: baseada na configuracao da armadilha/DoT
- Dano indireto NAO revela caster invisivel
- Dano direto (sem options ou `isIndirect: false`) REVELA caster invisivel

**Helper**: `_findCasterEntity(casterId)` — busca entity pelo ID nos participants/enemies

---

## 5. SISTEMA DE EFEITOS

### Arquivo: `mecanicas/efeitos.js`

### DB_EFEITOS — Efeitos disponiveis

| ID | Nome | Tipo | Stackable | Duracao | Modificador |
|----|------|------|-----------|---------|-------------|
| poderoso | Poderoso | buff | Nao | 2 turnos | +10/15/20% dmg_dealt |
| cura_amplificada | Cura Amplificada | buff | Sim (5) | 3 turnos | +10-50% heal_received |
| cura_reduzida | Cura Reduzida | debuff | Sim (5) | 3 turnos | -10-50% heal_received |
| escudo_amplificado | Escudo Amplificado | buff | Sim (3) | 2 turnos | +15-45% armor_granted |
| escudo_recebido | Escudo Recebido | buff | Sim (3) | 2 turnos | +10-30% armor_received |
| destruidor_escudo | Destruidor de Escudo | buff | Nao | 3 turnos | +20-50% bonus_vs_armored |
| roubo_escudo | Roubo de Escudo | buff | Nao | 2 turnos | +5-15 armor_steal_on_hit |
| ardente | Ardente | debuff | Nao | 2 turnos | Consumido por feiticos de fogo |
| parada | Parada | buff | Nao | 1 turno | +10-20% parada |
| parada_estandarte | Aura do Estandarte | buff | Sim (5) | 1 turno | +5-25% parada (legado) |
| rachadura | Rachadura | buff | Nao | 1 turno | +5 block flat + 10% block |
| veneno_zefir | Veneno | debuff | Sim (3) | 3 turnos | DoT por nivel: 3→5→8 dano/turno (fogo) |
| erosao_dano | Erosao | debuff | Sim (6) | 3 turnos | -3% dano final por stack (max -18%) |

### Como aplicar efeitos num feitico

```javascript
effects: [
    { effectId: 'ardente', level: 1, target: 'enemy' },
    { effectId: 'poderoso', level: 1, target: 'self' },
    { effectId: 'escudo_recebido', level: 1, target: 'hit' }
]
// target: 'enemy' = aplica no alvo inimigo
// target: 'self' = aplica no caster
// target: 'hit' = aplica em quem for atingido
// target: 'ally' = aplica em aliados na zona
```

### Stacking

- `stackable: false` → Reaplicar SUBSTITUI o efeito (reseta duracao)
- `stackable: true` → Reaplicar ESCALA o nivel (Lv1 → Lv2 → Lv3, ate maxStacks)
- Nivel nunca diminui, apenas aumenta ou reseta

### Duracao

- `durationType: 'turns'` → Dura X turnos do CASTER (decrementa no inicio do turno de quem aplicou)
- `durationType: 'caster_turn'` → Dura apenas o turno atual do caster (expira ao passar turno)

### Tick de efeitos

Ordem no inicio de cada turno:
1. `processDotOnTurnStart(participantId)` — Aplica dano de DoT no ALVO (antes do tick de duracao)
2. `tickEffectsOnTurnStart(participantId)` — Decrementa duracao de efeitos do CASTER
3. `expireCasterTurnEffects(casterId)` — Chamado ao passar turno

### DoT (Dano por Turno)

Campo opcional `dot` em DB_EFEITOS para causar dano no inicio do turno do alvo:

```javascript
{
    id: 'queimadura',
    name: 'Queimadura',
    icon: '🔥',
    type: 'debuff',
    dot: {                      // Campo de DoT
        damage: { min: 5, max: 8 },
        element: 'fire'
    },
    durationType: 'turns',
    duration: 3,
    levels: [{ value: 1 }],
    modifiers: []
}
```

**Regras de DoT**:
- DoT eh **dano indireto** — escala com `dmg_indirect` e atributos do caster original
- Processado por `processDotOnTurnStart(participantId)` ANTES de `tickEffectsOnTurnStart`
- Usa `effect.casterId` para identificar quem aplicou (ja rastreado em `createActiveEffect`)
- Melee/range classifica pela distancia caster→alvo no momento do tick
- Se o caster morrer, DoT ainda causa dano (usa posicao do alvo como fallback)
- NAO revela caster invisivel (eh dano indireto)

### REGRA: Ao criar novo efeito

1. Adicionar ao `DB_EFEITOS` em `mecanicas/efeitos.js`
2. Definir todos os campos obrigatorios (id, name, icon, type, etc.)
3. Se usar modifier novo (`stat` + `operation`), implementar a leitura em `mecanicas/dano.js`
4. Se stackable, definir `maxStacks` e `levels[]` para cada stack level
5. Se nao stackable, mesmo assim definir `levels` com pelo menos 1 entrada
6. Se DoT, definir `dot: { damage: { min, max }, element }` e testar com `validarEfeito('id')`

---

## 6. SISTEMA DE AURAS E ZONAS

### Dois tipos independentes — SISTEMAS SEPARADOS

O jogo tem DOIS sistemas de efeitos espaciais que sao COMPLETAMENTE independentes e NUNCA interagem entre si:

#### 6.1 groundEffect — Efeito no chao (celulas fixas)

- **O que eh**: Efeito persistente em celulas especificas (ex: Ardente no chao)
- **Armazenamento**: `combatState.groundEffects[]`
- **Duracao**: Por turnos (expira automaticamente via `tickGroundEffects`)
- **Trigger**: Entidade que ENTRA na celula (`checkGroundEffectsOnStep`)
- **Consumo**: Se `consumeOnStep: true`, a celula eh removida ao ser pisada
- **Rendering**: Apenas `type: 'ardente'` eh visualmente renderizado (diamante pulsante laranja)

##### Estrutura de um groundEffect

```javascript
{
    type: 'ardente',          // Tipo visual (so 'ardente' eh renderizado atualmente)
    cells: [{x, y}, ...],    // Array de celulas afetadas
    casterId: 'player',       // Quem criou
    spellId: 'orik_pilar_fogo', // Qual feitico criou
    turnsRemaining: 1,        // Turnos ate expirar
    consumeOnStep: true,      // Celula eh removida ao ser pisada?
    onStep: {                 // Efeito aplicado ao pisar
        effectId: 'ardente',  // ID do efeito em DB_EFEITOS
        level: 1,
        duration: 1           // Override da duracao do efeito
    }
}
```

##### REGRAS DE SOBREPOSICAO DE GROUND EFFECTS (CRITICO)

**REGRA A — Mesmo caster + mesmo feitico**: Ao recastar o MESMO feitico, o groundEffect anterior desse caster+spell eh COMPLETAMENTE REMOVIDO antes de aplicar o novo:
```
Exemplo: Jogador usa Pilar de Fogo → cria ardente em 3 celulas
         Jogador usa Pilar de Fogo de novo → remove as 3 celulas antigas, cria novas
```

**REGRA B — Celulas compartilhadas (qualquer caster diferente OU spell diferente)**: Se o novo groundEffect tem celulas que JA existem em OUTRO groundEffect, as celulas ANTIGAS sao removidas celula a celula. O novo efeito SEMPRE VENCE:
```
Exemplo: Efeito A ocupa celulas [1,1], [1,2], [1,3]
         Efeito B eh criado em celulas [1,2], [1,3], [1,4]
         → Efeito A fica apenas com [1,1] (perdeu [1,2] e [1,3])
         → Efeito B fica com [1,2], [1,3], [1,4]
         Se Efeito A ficou com 0 celulas, eh removido inteiramente
```

**REGRA C — NUNCA dois groundEffects na mesma celula**: Uma celula so pode ter UM groundEffect por vez. O mais recente sempre substitui.

**REGRA D — Tipos diferentes de groundEffect**: Mesmo que no futuro existam tipos diferentes (ex: 'gelo', 'veneno', 'lava'), a regra C se mantém — cada celula so aceita UM groundEffect. Tipo nao importa para a sobreposicao.

##### Funcoes no codigo (dev.html linhas ~20045-20125)

| Funcao | O que faz |
|--------|-----------|
| `addGroundEffect(effect)` | Adiciona novo, remove overlaps (regras A/B/C) |
| `getGroundEffectsAtCell(x, y)` | Retorna todos os effects naquela celula |
| `checkGroundEffectsOnStep(entity, x, y)` | Aplica onStep quando entidade chega na celula |
| `tickGroundEffects(casterId)` | Decrementa turnsRemaining, remove expirados |

##### Como criar groundEffect num feitico

Atualmente so existe `groundArdente: true` no feitico. O processamento (dev.html linhas ~23725-23771):
1. Feitico tem `groundArdente: true` e zona AOE
2. Celulas com entidade: aplica `applyEffect('ardente')` DIRETAMENTE no alvo
3. Celulas VAZIAS: cria groundEffect com `addGroundEffect()`
4. Ou seja: alvos levam o efeito imediato, celulas vazias ficam com armadilha

#### 6.1B groundTrap — Armadilhas no chao

Armadilhas sao ground effects que causam dano/efeito/push ao pisar. Diferente de `groundArdente` (que so aplica efeito), armadilhas suportam combinacoes configuráveis.

**Schema no feitico**:
```javascript
groundTrap: {
    type: 'armadilha_fogo',     // Tipo visual (afeta rendering)
    turnsRemaining: 3,
    consumeOnStep: true,        // Se true, célula some ao pisar
    onStep: {
        damage: { min: 10, max: 15 },  // Dano ao pisar
        element: 'fire',
        aoeType: 'single',             // single ou zone (para bonus de dano)
        effectId: 'queimadura',         // Efeito a aplicar (opcional)
        level: 1,
        pushPull: { type: 'pull', distance: 1 },  // Push/pull (opcional)
        name: 'Armadilha de Fogo',
        icon: '⚠️'
    }
}
```

**Tipos visuais suportados no rendering**:
| Tipo | Cor base | Visual |
|------|----------|--------|
| ardente | Laranja-vermelho | Chamas animadas |
| armadilha_fogo | Vermelho escuro | Diamante + X central |
| armadilha_veneno | Verde | Diamante + X central |
| armadilha_gelo | Azul | Diamante + X central |
| armadilha_ar | Roxo claro | Diamante + X central |
| armadilha_terra | Marrom | Diamante + X central |
| (desconhecido) | Marrom generico | Diamante + X central |

**Processamento** (`checkGroundEffectsOnStep` em dev.html):
1. Dano: cria spell sintetico, chama `dealDamageToTarget` com `isIndirect: true`
2. Efeito: chama `applyEffect` com casterId correto
3. Push/Pull: chama `applyPushPull` diretamente
4. Consume: remove celula se `consumeOnStep: true`
5. Verifica morte apos dano

**IMPORTANTE**: `groundTrap` e `groundArdente` sao campos distintos. Nao usar campos futuros (`groundGelo`, etc.) — usar `groundTrap` com `type` e `onStep` configuráveis.

#### 6.2 passiveZone — Aura de invocacao (distancia dinamica)

- **O que eh**: Bonus passivo dinamico baseado em distancia da invocacao viva
- **Armazenamento**: `combatState.activeSummons[].aura`
- **Duracao**: Enquanto a invocacao estiver viva (morre junto com ela)
- **Calculo**: Em tempo real, sem celulas fixas — verifica distancia Manhattan `|dx| + |dy|`
- **NAO eh renderizado**: Nao existe overlay visual no mapa para auras
- **Quando aplica**: No momento do calculo de dano/bloqueio/cura, NAO por celula

##### Estrutura de uma aura passiveZone (no spell.summon)

```javascript
summon: {
    type: 'estandarte',
    hpPercent: 30,
    aura: {
        range: 2,               // Raio em Manhattan distance
        rangeShape: 'circle',   // Sempre 'circle' (Manhattan) por enquanto
        type: 'passiveZone',    // Identificador do tipo de aura
        bonusBlock: 20,         // Bonus flat de bloqueio
        bonusBlockPercent: 30,  // Bonus % de bloqueio
        target: 'allies'        // 'allies' | 'enemies' | 'all'
    }
}
```

##### REGRAS DE SOBREPOSICAO DE PASSIVE ZONES (CRITICO)

**REGRA E — Multiplas passiveZones STACKAM**: Se 2+ invocacoes com aura estao no alcance, TODOS os bonus se somam aditivamente:
```
Exemplo: Bandeira A com bonusBlock: 20 + Bandeira B com bonusBlock: 20
         → Entidade no alcance de ambas recebe +40 bonusBlock
```

**REGRA F — Sem deduplicacao por tipo**: O sistema NAO verifica se duas auras sao do mesmo summonType. Duas Bandeiras = bonus duplicado. Se quiser limitar no futuro, adicionar check de `summonType` no loop de `dano.js`.

**REGRA G — Aura desaparece com a invocacao**: Quando HP <= 0, `setEntityHp()` remove de `activeSummons[]` e a aura some automaticamente.

##### Onde a passiveZone eh processada

| Local | Arquivo | Linhas |
|-------|---------|--------|
| Loop de calculo de block bonus | `mecanicas/dano.js` | ~599-623 |
| Verificacao de distancia (Manhattan) | `mecanicas/dano.js` | `\|dx\| + \|dy\| <= aura.range` |
| Verificacao de time (allies/enemies) | `mecanicas/dano.js` | Filtra por `aura.target` |
| Verificacao se viva (hp > 0) | `mecanicas/dano.js` | `_bsStats.hp > 0` |

##### Bonus de aura atualmente suportados

Todos processados via helper `getAuraBonusForEntity(entity, bonusKey)` em `dano.js`.
Cada campo aceita versao flat e percent (ex: `bonusBlock` + `bonusBlockPercent`).

| Campo | Efeito | Processado em |
|-------|--------|---------------|
| `bonusBlock` / `bonusBlockPercent` | +block chance do alvo | `dano.js` dealDamageToTarget (seção block) |
| `bonusDodge` / `bonusDodgePercent` | +dodge chance do alvo | `dano.js` dealDamageToTarget (seção dodge) |
| `bonusDamage` / `bonusDamagePercent` | +dano bruto do caster | `dano.js` dealDamageToTarget (após scaling elemental) |
| `bonusResistance` / `bonusResistancePercent` | +resistência elemental do alvo | `dano.js` dealDamageToTarget (seção resistência) |
| `bonusHealing` / `bonusHealingPercent` | +cura recebida pelo alvo | `dano.js` healTarget() |

Para adicionar um NOVO tipo de bonus: usar `getAuraBonusForEntity(entity, 'novoBonus')` no local correto de `dano.js`.

### Coexistencia — Tabela de interacao

| Cenario | O que acontece | Regra |
|---------|---------------|-------|
| groundEffect + passiveZone na mesma celula | **Coexistem sem conflito** — sistemas independentes | — |
| groundEffect A + groundEffect B mesma celula | **B substitui A naquela celula** — A perde a celula | Regra C |
| Mesmo feitico recastado (ground) | **Antigo eh removido completamente** | Regra A |
| passiveZone A + passiveZone B mesma area | **Ambas stackam** — bonus soma aditivamente | Regra E |
| groundEffect em celula com entidade | **NÃO cria groundEffect** — aplica efeito direto na entidade | Processamento de groundArdente |
| Entidade pisa em groundEffect | **Aplica onStep** — se consumeOnStep, celula eh removida | checkGroundEffectsOnStep |
| Invocacao morre | **Aura some** — removida de activeSummons | Regra G |
| Ground effect expira (turnsRemaining=0) | **Removido** — tickGroundEffects limpa | tickGroundEffects |

### PERGUNTAS FREQUENTES (para evitar erros)

**P: Se eu criar um feitico que aplica 'veneno' no chao, ele vai limpar o 'ardente' que ja estava ali?**
R: SIM. Regra C — cada celula so aceita um groundEffect. O novo substitui o antigo naquela celula.

**P: Se eu criar uma invocacao com aura de +dano, ela funciona automaticamente?**
R: SIM. `bonusDamage`, `bonusDodge`, `bonusBlock`, `bonusResistance` e `bonusHealing` (e suas versoes Percent) sao todos processados via `getAuraBonusForEntity()`. Basta definir o campo na aura.

**P: Uma aura de invocacao afeta o groundEffect?**
R: NAO. Sao sistemas completamente separados. A aura nao limpa, nao bloqueia, nao interage com groundEffects.

**P: Posso ter multiplos tipos de groundEffect diferentes no mapa ao mesmo tempo?**
R: SIM, desde que em celulas DIFERENTES. Na mesma celula, o mais recente vence.

**P: Se duas invocacoes do mesmo tipo (ex: duas Bandeiras) tiverem aura, os bonus stackam?**
R: SIM. Nao ha deduplicacao por tipo. Isso pode ser intencional ou pode precisar de limitacao futura.

### Onde no codigo

| Sistema | Arquivo | Funcao/Secao |
|---------|---------|-------------|
| addGroundEffect | `jogo/dev.html` | Linha ~20047 |
| getGroundEffectsAtCell | `jogo/dev.html` | Linha ~20066 |
| checkGroundEffectsOnStep | `jogo/dev.html` | Linha ~20081 |
| tickGroundEffects | `jogo/dev.html` | Linha ~20114 |
| groundEffect rendering (PIXI) | `jogo/dev.html` | Linhas ~14011-14040 |
| groundArdente spell application | `jogo/dev.html` | Linhas ~23725-23771 |
| passiveZone block calc | `mecanicas/dano.js` | Linhas ~599-623 |
| Summon death → aura removal | `mecanicas/dano.js` | `setEntityHp()` linhas ~108-131 |
| Regras em docs | `docs/REGRAS_CRIACAO_CONTEUDO.md` | Secao 14 |

---

## 7. SISTEMA DE COMBATE

### Estados do combate

| Estado | Variavel | Descricao |
|--------|----------|-----------|
| Inativo | `simCombatState.active = false` | Fora de combate |
| Posicionamento | `simCombatState.positioningPhase = true` | Jogadores posicionam entidades |
| Batalha | `combatState.phase = 'battle'` | Turnos de combate |

### simCombatState — Estrutura

```javascript
simCombatState = {
    active: true,                    // Combate de simulacao ativo?
    positioningPhase: true,          // Fase de posicionamento?
    participants: [{                 // Array de participantes
        id: 'player_0',             // ID unico
        type: 'player',             // 'player', 'monster', 'summon'
        classId: 'orik',            // ID da classe (se player)
        entity: { x, y, ... },      // Entidade no mapa
        color: '#4a9eff'            // Cor no mapa
    }],
    entityStats: {                   // Stats por participante
        'player_0': {
            hp: 120, maxHp: 120,
            pa: 6, maxPa: 6,
            pm: 3, maxPm: 3,
            pe: 6, maxPe: 6,
            armor: 0
        }
    },
    participantSpells: {             // Feiticos por participante
        'player_0': [ spell1, spell2, ... ]
    },
    currentIndex: 0,                 // Indice do participante atual
    spellCooldowns: {},              // Cooldowns por spell
    turnCount: 0                     // Contador de turnos
}
```

### combatState — Estrutura complementar

```javascript
combatState = {
    active: true,
    phase: 'battle',
    activeEffects: {},               // Efeitos ativos por participante
    activeSummons: [],               // Invocacoes vivas
    groundEffects: [],               // Efeitos no chao
    brasas: {},                      // Stacks de brasas por participante
    passiveBoosts: {},               // Bonus de passivos equipados
    enemies: [],                     // Array de monstros
    enemyStats: {},                  // Stats de monstros
    turnOrder: [],                   // Ordem de turnos (combate normal)
    currentTurnIndex: 0              // Turno atual (combate normal)
}
```

### Turno — O que acontece

**Inicio do turno** (funcao em `simCombatPassTurn`):
1. Restaura PA e PM ao maximo
2. `processDotOnTurnStart(participantId)` — aplica dano de DoT (ANTES do tick de duracao)
3. `tickEffectsOnTurnStart(participantId)` — tick efeitos (decrementa duracao)
4. `tickBrasasTurnStart(participantId)` — tick brasas
5. `resetGolpeDevastador(participantId)` — reset DOM cooldown
6. Processar passivos `onTurnStart` (cura, etc.)
7. Atualizar hotbar com feiticos do jogador atual

**Fim do turno** (`simCombatPassTurn`):
1. `expireCasterTurnEffects(casterId)` — expira efeitos de turno
2. `tickBrasasTurnEnd(participantId)` — perda de brasas
3. Resetar `castsPerTurn` counters
4. Avanca para proximo participante

### REGRA: Resetar state em TODOS os pontos de init

Existem **6 pontos** onde o combate eh inicializado (onde `spellCooldowns = {}`). Ao adicionar novo state que precisa ser resetado, DEVE ser adicionado em TODOS os 6.

### Barra de espaco (Passar turno)

- So funciona se o participante atual for `type: 'player'`
- Debounce de 300ms para evitar duplo press
- Implementado em `jogo/dev.html` no handler de keydown

---

## 8. SISTEMA DE ALCANCE E TARGETING

### Arquivo: `mecanicas/alcance_e_zona.js`

### Formas de alcance (rangeShape/rangeType)

| Shape | Descricao | Distancia |
|-------|-----------|-----------|
| `circle` | Diamante (Manhattan) | `|dx| + |dy|` |
| `cross` | Igual a circle (compat) | `|dx| + |dy|` |
| `square` | Quadrado (Chebyshev) | `max(|dx|, |dy|)` |
| `line` | Linha reta (4 cardinais) | `|dx| + |dy|`, mas dx=0 ou dy=0 |
| `diagonal` | Diagonal pura | `|dx| = |dy|` obrigatorio |
| `star` | Cruz + diagonal | `max(|dx|, |dy|)`, so cardinais/diagonais |

### Linha de Visao (LoS)

- `requiresLoS: true` (padrao) → Precisa de visao direta entre caster e alvo
- `requiresLoS: false` → Ignora obstaculos
- Obstaculos bloqueiam LoS: `mapCell.obstacle === 'blocker'`
- Entidades vivas bloqueiam LoS (exceto caster, invisiveis e transparentes)
- Entidades com `invisivel` NAO bloqueiam LoS (`isObstacle` em `linha_de_visao.js`)
- Entidades com `transparente` NAO bloqueiam LoS (`isObstacle` em `linha_de_visao.js`)

### Alcance modificavel

- `rangeModifiable: true` → `maxRange` aumenta com atributo `range` do caster
- Fontes de range: equipamentos, passivos, efeitos
- `maxR = maxRange + rangeBonus` (minimo = minRange)

### REGRA CRITICA: Descricao deve refletir alcance

Quando ALTERAR o alcance de um feitico (`minRange`, `maxRange`, `rangeShape`):
1. Alterar os campos no objeto do feitico
2. **OBRIGATORIAMENTE** atualizar o campo `description` para refletir os novos valores
3. Usar Grep para buscar o ID do feitico em todo o projeto (pode haver referencias em combos, passivos, triggers)

---

## 9. SISTEMA DE IA

### Arquivo: `mecanicas/ia_monstros.js`

### Arquetipos de comportamento

| aiType | Comportamento | Range preferido |
|--------|---------------|-----------------|
| `aggressive_melee` | Corpo a corpo, se aproxima | 0-1 |
| `defensive_ranged` | A distancia, kita | 2-5 |
| `dummy` | Passivo, so passa turno | - |

### Pipeline de decisao

1. `evaluateActions()` — Avalia todas combinacoes de movimento + feitico
2. `selectBestAction()` — Escolhe a melhor acao por utility score
3. `executeAction()` — Executa: move → lanca feitico → passa turno

### Reserva de celulas

- `_aiReservedCells` rastreia celulas ja escolhidas por monstros neste turno
- Evita que 2 monstros andem para a mesma celula
- `resetAIReservedCells()` limpa no inicio de cada rodada

### Invisibilidade e IA

- Monstros NAO podem ver alvos com advancedStatus `invisivel`
- `hasValidTarget()` retorna false para alvos invisiveis
- `executeMonsterAI()` verifica invisibilidade e passa turno se nao ha alvos visiveis
- `moveTowardsTarget()` nao se move se alvo eh invisivel

---

## 10. SISTEMA DE BRASAS

### Arquivo: `mecanicas/brasas.js`

### Mecanica

- Feiticos com `grantsBrasas: true` geram +1 stack ao serem usados
- Maximo: 10 stacks
- **Inicio do turno**: Queima inimigos nas 4 casas cardinais adjacentes
  - Dano = `enemyMaxHp × stacks × 2%` (por stack)
  - Elemento = cromático (resolve o maior stat do caster)
- **Fim do turno**: Se nao usou feitico de fogo, PERDE TODAS as brasas
- `consumesBrasas: true` → Consome todas e escala dano: `dano × (1 + stacks × 0.5)`

### Bonus de bloqueio

- `+1% block por stack` ativo durante o turno

---

## 11. SISTEMA DE COMBOS

### Definidos em cada arquivo de feitico (ex: `DB_COMBOS_ORIK`)

### Estrutura

```javascript
{
    id: 'combo_ar_puxar',
    name: 'Succao Ciclonica',
    class: 'orik',
    sequence: ['spell_1', 'spell_2', 'spell_3'],  // 3 spells no MESMO turno
    singleTurnOnly: true,
    triggerEffect: {
        type: 'pushPull',          // Tipo do efeito bonus
        pushPull: { type: 'pull', distance: 2 }
    }
}
```

### Tipos de trigger de combo

- `pushPull` — Empurra/puxa o alvo
- `damageBonus` — Bonus % de dano no golpe que completa
- `nextSpellDamageBonus` — Bonus no PROXIMO feitico

---

## 11B. SISTEMA DE RICOCHETE

### Arquivo: `mecanicas/ricochete.js`

Feiticos com `ricochete: { ... }` saltam para alvos proximos apos o hit principal.

```javascript
ricochete: {
    bounces: 2,            // 2 saltos apos alvo principal = 3 alvos total
    decayPercent: 25,      // -25% dano por salto (75% no 1o salto, 56% no 2o)
                           // decayPercent NEGATIVO = AUMENTO de dano (ex: -25 = +25% por salto)
    maxRange: 4,           // Alcance maximo de cada salto (Manhattan)
    sameTargetOnce: true,  // Cada alvo so pode ser acertado 1x
    requiresLoS: false     // Se true, ricochete precisa de Linha de Visao entre alvos
}
```

- Processado em `processRicochete()` apos o dano principal em `applySpellEffects`
- Encontra o inimigo mais proximo do alvo atual dentro de `maxRange`
- `sameTargetOnce: false` permite acertar o mesmo alvo varias vezes
- `requiresLoS: true` faz cada salto verificar LoS (ex: Tiro Estilhacante)
- `decayPercent` negativo faz dano CRESCER por salto (ex: -25 = +25% por salto)

---

## 12. ADVANCEDSTATUS

### Diferenca de effects

| Sistema | Uso | Armazenamento |
|---------|-----|---------------|
| `effects` (DB_EFEITOS) | Buffs/debuffs regulares (+dano, +cura, etc.) | `combatState.activeEffects[id]` |
| `advancedStatus` | Estados especiais de controle | `entity.advancedStatus` |

### Tipos de advancedStatus

| Tipo | Efeito |
|------|--------|
| `estabilizado` | Nao pode ser empurrado, puxado ou teleportado |
| `preso` | Nao pode se mover (PM bloqueado) |
| `ensaboado` | Ignora tackle/lock de inimigos adjacentes (move-se livremente) |
| `sacrificio` | Redireciona dano de outro aliado para si |
| `provocado` | Forcado a atacar uma entidade especifica |
| `invisivel` | Invisivel para inimigos, semi-transparente para aliados |
| `transparente` | Nao bloqueia Linha de Visao (aliados e inimigos podem atirar atraves) |

### Transparencia (`transparente`)

| Aspecto | Comportamento |
|---------|---------------|
| Linha de Visao | Transparente NAO bloqueia LoS (em `isObstacle`, `linha_de_visao.js`) |
| Visibilidade | Entidade continua visivel (nao eh invisivel) |
| Movimento | Celula AINDA eh ocupada — nao da para atravessar |
| Diferenca de invisivel | Transparente apenas remove bloqueio de LoS, nao oculta a entidade |
| Targeting | Pode ser usado em aliados E inimigos (targetType: 'both') |

### Invisibilidade (`invisivel`)

| Aspecto | Comportamento |
|---------|---------------|
| Visual (PIXI) | Aliados: alpha=0.4 (semi-transparente). Inimigos: alpha=0, visible=false |
| HP Bar | Aliados: visivel. Inimigos: oculta |
| Tackle | Invisivel NAO trava ninguem. Invisivel NAO eh travado |
| Linha de Visao | Invisivel NAO bloqueia LoS (em `isObstacle`, `linha_de_visao.js`) |
| Movimento | Celula AINDA eh ocupada — nao da para andar sobre/atravessar |
| IA Monstros | Monstros IGNORAM alvos invisiveis (passam turno) |
| Dano Direto | Causar dano direto REVELA o caster invisivel |
| Dano Indireto | NAO revela (armadilhas, DoT, brasas manteem invisibilidade) |
| Morte | Alvo invisivel que morre eh revelado (corpo aparece no campo) |

**Aplicacao via feitico**:
```javascript
advancedStatus: [{
    type: 'invisivel',
    duration: 2
}]
```

### REGRA: Nao confundir com effects

- `advancedStatus` = controle de movimento/comportamento/visibilidade
- `effects` = modificadores de stats/dano/cura

---

## 12B. SISTEMA DE DESENCARNE

### Mecanica

Quando uma entidade morre (HP chega a 0), ela NAO desaparece imediatamente. Em vez disso, permanece no mapa como um "corpo" que **bloqueia a celula** ate ser desencarnada.

### Como funciona

1. Entidade morre → recebe `desencarneCounter = 3`
2. Enquanto `desencarneCounter > 0`:
   - Bloqueia **movimento** (pathfinding, PM)
   - Bloqueia **push/pull** (colisao como entidade viva)
   - Bloqueia **approach** do caster
   - Pode ser **alvo de feiticos de zona/AoE** (dano reduz contador)
   - E visivel no mapa com **opacidade 35%** e tint cinza
   - Health bar mostra contador (ex: "💀 Goblin (2)")
3. Contador diminui -1 em cada caso:
   - **Inicio de cada round** (antes do primeiro jogador)
   - **Cada hit de dano** recebido (AoE, zona, etc.)
4. Quando `desencarneCounter` chega a 0: entidade desaparece, celula liberada

### Excecoes

- **playerEntity**: NAO usa desencarne (tem sistema de Zumbi proprio)
- **Invocacoes**: recebem desencarne normalmente (corpo bloqueia)
- **Dano em corpo**: `dealDamageToTarget` intercepta — nao causa HP damage, apenas -1 no contador

### Onde no codigo

| O que | Arquivo | Funcao/Local |
|-------|---------|-------------|
| Helpers | `mecanicas/dano.js` | `isDesencarnePending()`, `initDesencarne()`, `degradeDesencarne()`, `tickAllDesencarneCounters()` |
| Init ao morrer | `mecanicas/dano.js` | `setEntityHp()` — quando val <= 0 |
| Dano reduz contador | `mecanicas/dano.js` | `dealDamageToTarget()` — intercepta no inicio |
| Push/pull colisao | `mecanicas/dano.js` | `applyPushPull()` |
| Approach colisao | `mecanicas/dano.js` | casterApproach block check |
| Zone targets | `mecanicas/dano.js` | `processSecondaryZone()` |
| AoE targets | `mecanicas/alcance_e_zona.js` | `findTargetsInCells()` |
| Movimento bloqueio | `jogo/dev.html` | `isCellOccupiedByEnemy()`, `getReachableCells()` |
| Round tick | `jogo/dev.html` | `passTurn()` e `simCombatPassTurn()` — ao incrementar round |
| IA monstros | `mecanicas/ia_monstros.js` | `_getAllyPositions()`, `_isCellBlockedByAlly()` |
| Renderizacao | `jogo/dev.html` | `_visEntBuf` inclui desencarnando; sprite com alpha 0.35 e tint cinza |

### REGRA: Ao criar novo tipo de movimento ou colisao

Sempre verificar `isDesencarnePending(entity)` — mortos com desencarne bloqueiam celulas como entidades vivas.

---

## 13. MAPEAMENTO CLASSE → SPELL CLASS

### Tabela completa

| DB_CLASSES.id | DB_CLASSES.elements | spell.class | Arquivo de feiticos |
|---------------|--------------------|--------------|--------------------|
| orik | fire, earth, air | `orik` | `feiticos/classes/orik.js` |
| zefir | air, fire, earth | `atirador` | `feiticos/classes/zefir.js` |
| garren | water, air, earth | `cacador` | `feiticos/classes/garren.js` |
| aegis | earth, fire, water | `guardiao` | `feiticos/classes/aegis.js` |
| klaris | water, fire, air | `clerigo` | `feiticos/classes/klaris.js` |
| kaos | fire, earth, air | `berserker` | `feiticos/classes/kaos.js` |

### Como o sistema resolve

`getSpellClassId(classId)` em `jogo/dev.html`:
1. Busca a classe em `DB_CLASSES`
2. Pega o primeiro `spellId` da classe
3. Busca o spell em `DB_HABILIDADES`
4. Retorna `spell.class`
5. Fallback: retorna o proprio `classId`

---

## 14. ONDE CADA MECANICA APARECE NO CODIGO

### CRITICO: Use esta tabela para saber onde buscar ao alterar algo

| Mecanica | Arquivos onde aparece |
|----------|---------------------|
| **Dano** | `mecanicas/dano.js` (dealDamageToTarget), `mecanicas/brasas.js` (tickBrasas) |
| **Cura** | `mecanicas/dano.js` (healTarget), `jogo/dev.html` (applySpellEffects) |
| **Escudo** | `mecanicas/dano.js` (getEntityArmor, setEntityArmor, maxArmor=50%HP) |
| **Efeitos** | `mecanicas/efeitos.js` (DB_EFEITOS, apply/tick/expire), `mecanicas/dano.js` (getEffectModifier) |
| **Invocacoes** | `jogo/dev.html` (criacao), `mecanicas/dano.js` (setEntityHp filtra mortas, aura block) |
| **Alcance** | `mecanicas/alcance_e_zona.js` (getAbilityRangeCells, getAoECells) |
| **Bloqueio** | `mecanicas/dano.js` (linha ~596-640), `mecanicas/brasas.js` (brasas block bonus) |
| **Esquiva** | `mecanicas/dano.js` (linha ~580-594) |
| **Parada** | `mecanicas/dano.js` (linha ~643-661), `mecanicas/efeitos.js` (parada effect) |
| **Push/Pull** | `mecanicas/dano.js` (applyPushPull), `mecanicas/alcance_e_zona.js` |
| **IA** | `mecanicas/ia_monstros.js` (evaluateActions, executeAction) |
| **Brasas** | `mecanicas/brasas.js` (todo o arquivo), `jogo/dev.html` (onSpellCast) |
| **Combos** | `feiticos/classes/*.js` (DB_COMBOS_*), `jogo/dev.html` (checkCombo) |
| **Turnos** | `jogo/dev.html` (simCombatPassTurn, tick functions) |
| **Ground effects** | `jogo/dev.html` (groundArdente section), `combatState.groundEffects` |
| **Passive zone** | `mecanicas/dano.js` (block calc), `combatState.activeSummons[].aura` |
| **Toggle** | `jogo/dev.html` (getActiveToggleEffect), `mecanicas/dano.js` (dmgPenalty/damageBonus) |
| **Passivos** | `jogo/dev.html` (combatState.passiveBoosts), `mecanicas/dano.js` |
| **DOM** | `mecanicas/brasas.js` (checkGolpeDevastador), `jogo/dev.html` |
| **Classes** | `sistema/classes.js` (DB_CLASSES), `jogo/dev.html` (startCombatSimulation) |
| **Feiticos** | `feiticos/classes/*.js`, `jogo/dev.html` (DB_HABILIDADES, normalizeSpell) |
| **Cooldowns** | `jogo/dev.html` (simCombatState.spellCooldowns), `mecanicas/alcance_e_zona.js` (normalizeSpell) |
| **Resistencias** | `mecanicas/dano.js` (getTargetResistance, resistToPercent) |
| **Vontade** | `mecanicas/dano.js` (combatVontade, helpers, contest em paSteal/pmSteal), `jogo/dev.html` (init, reset, display) |
| **Drops/Prospeccao** | `sistema/drops.js` (DROP_RARITY_MULT), `jogo/dev.html` (rollDropsWithLuck) |

---

## 15. CHECKLIST DE VALIDACAO

### Ao CRIAR um novo feitico

- [ ] `id` eh unico (buscar em TODOS os arquivos de feitico)
- [ ] `catalogId` eh unico (10 digitos, nao duplica)
- [ ] `class` corresponde ao spell class correto da classe (ver secao 13)
- [ ] `element` eh valido: fire, earth, air, water, none, chromatic
- [ ] `spellType` eh valido: active, passive, dom
- [ ] `paCost`, `pmCost`, `peCost` sao numeros >= 0
- [ ] `minRange` <= `maxRange`
- [ ] `rangeShape` eh valido: circle, cross, square, line, diagonal, star
- [ ] Se `aoeType: 'zone'`, `zoneCells` esta definido com offsets {dx, dy}
- [ ] Se `aoeType: 'zone'`, `zoneEffects` esta definido
- [ ] Se tem `damage`, `min` <= `max` e ambos > 0
- [ ] Se tem `heal`, `min` <= `max` e ambos > 0
- [ ] Se tem `effects`, cada um tem `effectId` que existe em `DB_EFEITOS`
- [ ] Se tem `pushPull`, `distance` > 0 e `type` eh 'push' ou 'pull'
- [ ] Se tem `advancedStatus`, `type` eh valido (ver secao 12)
- [ ] Se `effect: 'summon'`, campo `summon` esta completo + `requiresEmptyCell: true`
- [ ] Se `effect: 'teleport'`, `requiresEmptyCell: true`
- [ ] Se `effect: 'selfToggle'`, `toggleEffect` esta definido
- [ ] `description` reflete TODOS os valores numericos do feitico
- [ ] `description` inclui: custo, alcance, dano/cura, efeitos especiais, cooldown
- [ ] O ID foi adicionado ao `spellIds[]` da classe em `sistema/classes.js`
- [ ] Se a classe ja tem 26 feiticos, ajustar a contagem

### Ao ALTERAR um feitico existente

- [ ] Buscar o ID do feitico em TODOS os arquivos (`Grep id_do_feitico`)
- [ ] Se alterou `damage`, atualizar `description`
- [ ] Se alterou `minRange`/`maxRange`/`rangeShape`, atualizar `description`
- [ ] Se alterou `paCost`/`pmCost`/`peCost`, atualizar `description`
- [ ] Se alterou `cooldown`/`castsPerTurn`/`castsPerTarget`, atualizar `description`
- [ ] Se alterou `effects`, verificar se o efeito existe em `DB_EFEITOS`
- [ ] Se o feitico aparece em algum combo (DB_COMBOS_*), verificar se o combo ainda funciona
- [ ] Se o feitico eh trigger de toggle (`triggerSpellIds`), verificar toggles
- [ ] Se alterou nome, verificar se aparece em alguma description de outro feitico

### Ao CRIAR nova invocacao

- [ ] `effect: 'summon'` no feitico
- [ ] `summon.type` eh unico
- [ ] `summon.hpPercent` > 0
- [ ] `requiresEmptyCell: true` no feitico
- [ ] Se tem aura, `summon.aura` esta completo (range, type, target, bonus)
- [ ] Se aura `passiveZone`, verificar onde o bonus eh lido no codigo
- [ ] Invocacao nao tem PA/PM (auto-skip)
- [ ] Verificar se o limite de `invocation` do caster esta correto

### Ao CRIAR novo efeito

- [ ] `id` eh unico em `DB_EFEITOS`
- [ ] `levels[]` tem pelo menos 1 entrada
- [ ] Se `stackable: true`, `maxStacks` > 1 e `levels[]` tem entradas suficientes
- [ ] `modifiers[]` usa `stat` e `operation` validos
- [ ] Se modifier usa stat novo, implementar leitura em `mecanicas/dano.js`
- [ ] `icon` eh emoji valido
- [ ] `description` usa `{value}` para o placeholder de valor

### Ao ALTERAR alcance

- [ ] Alterar `minRange` e/ou `maxRange` no feitico
- [ ] Alterar `rangeShape` se necessario
- [ ] **OBRIGATORIAMENTE** atualizar `description` com novos valores
- [ ] Se `rangeModifiable: true`, verificar interacao com bonus de range
- [ ] Verificar se o feitico eh usado por IA de monstros (faixa de alcance da IA)

---

## 16. ERROS COMUNS E COMO EVITAR

### 1. Descricao desatualizada
**Erro**: Alterar dano/alcance/custo mas esquecer de atualizar `description`
**Solucao**: SEMPRE atualizar `description` ao alterar qualquer valor mecanico

### 2. Spell class errado
**Erro**: Usar `class: 'zefir'` no feitico quando deveria ser `class: 'atirador'`
**Solucao**: Consultar tabela da secao 13. Se a classe eh zefir, spell.class = 'atirador'

### 3. selfToggle vs toggle
**Erro**: Usar `effect: 'toggle'` quando o feitico precisa de clique no mapa
**Solucao**: Se precisa clicar em si no mapa = `selfToggle`. Se ativa direto da hotbar = `toggle`

### 4. Stats de sim combat
**Erro**: Acessar stats via `combatState.enemyStats` em sim combat
**Solucao**: Em sim combat, stats ficam em `simCombatState.entityStats[id]`

### 5. State nao resetado
**Erro**: Adicionar novo state mas esquecer de resetar nos 6 pontos de init
**Solucao**: Buscar `spellCooldowns = {}` em todo dev.html — sao os 6 pontos. Resetar la

### 6. Invocacao com PA/PM
**Erro**: Dar PA ou PM para invocacao, causando turno interativo indesejado
**Solucao**: Invocacoes SEMPRE tem PA=0, PM=0. Turno eh auto-skip

### 7. Efeito inexistente
**Erro**: Referenciar effectId que nao existe em DB_EFEITOS
**Solucao**: Verificar se o effectId existe ANTES de usar no feitico

### 8. Aura com bonus nao suportado
**Erro**: Criar aura passiveZone com campo de bonus que nao existe no helper
**Solucao**: Os bonus suportados sao: `bonusBlock`, `bonusDodge`, `bonusDamage`, `bonusResistance`, `bonusHealing` (e versoes Percent). Para adicionar novo tipo, usar `getAuraBonusForEntity(entity, 'novoBonus')` no local correto de `dano.js`

### 9. Alcance modificavel sem flag
**Erro**: Querer que alcance escale com stats mas nao colocar `rangeModifiable: true`
**Solucao**: Adicionar `rangeModifiable: true` no feitico

### 10. Push/Pull em estabilizado
**Erro**: Empurrar/puxar entidade estabilizada
**Solucao**: O sistema ja verifica `hasAdvancedStatus(target, 'estabilizado')`, mas ao criar novo push/pull, garantir que a verificacao exista

### 11. Spacebar passa turno fora da vez
**Erro**: Apertar espaco durante turno de inimigo/invocacao pula o turno do jogador
**Solucao**: Guard `participants[currentIndex].type !== 'player'` ja implementado

### 12. Parrudo nao aplicando
**Erro**: Modo parrudo modifica `playerStats` mas sim combat usa `DB_CLASSES.baseStats`
**Solucao**: Adicionar `_parrudoBonus` na criacao de stats de jogadores no sim combat

### 13. Ground effect nao substitui anterior
**Erro**: Criar feitico com groundEffect novo e achar que vai coexistir com outro na mesma celula
**Solucao**: Regra C — cada celula so aceita UM groundEffect. O novo substitui o antigo. Se precisa de coexistencia, isso requer mudanca na funcao `addGroundEffect()` em dev.html

### 14. Aura de invocacao — ordem de aplicacao
**Erro**: Achar que bonusDamage se aplica depois de critico/berserk
**Solucao**: `bonusDamage` aplica no rawDmg (antes de crit/berserk). `bonusResistance` aplica junto com a resistência base. `bonusDodge`/`bonusBlock` aplicam na chance final. `bonusHealing` aplica no rawHeal

### 15. Invocacao controlavel — cuidados
**Erro**: Usar `passiveBoosts` ou `calculateTotalAttributes()` para escalar dano da invocacao
**Solucao**: `passiveBoosts` eh isolado (vazio) durante turno da invocacao. `calculateTotalAttributes()` retorna stats do PLAYER. Usar dano flat no spell ou stats proprias em `summon.stats`. Para IA autonoma (tipo 3), o sistema NAO esta implementado

### 16. Ground effect renderizado sem visual
**Erro**: Criar ground effect com `type: 'veneno'` mas nao criar rendering
**Solucao**: Apenas `type: 'ardente'` tem visual no PIXI (dev.html ~14011-14040). Tipos novos precisam de rendering customizado ou ficam invisiveis

### 17. Aura sem visual no mapa
**Erro**: Esperar que a aura passiveZone mostre um overlay visual no mapa
**Solucao**: NAO existe rendering de aura no mapa atualmente. O bonus eh calculado internamente sem indicacao visual. Se quiser visual, precisa implementar overlay

### 18. GroundEffect apagado por recast
**Erro**: Jogador recasta feitico de ground effect e nao entende por que o anterior sumiu
**Solucao**: Regra A — mesmo caster + mesmo spell = remove anterior COMPLETAMENTE. Isso eh by design. Se quiser que o anterior fique, precisa mudar `addGroundEffect()`

---

## 17. REGRAS DE CONSISTENCIA (SISTEMA VIVO)

### REGRA 1: Verificacao cruzada obrigatoria
Ao alterar QUALQUER campo de um feitico, efeito, classe ou mecanica:
1. Usar `Grep` para buscar o campo alterado em TODO o projeto
2. Verificar se a alteracao causa conflito com outros sistemas
3. Se encontrar conflito, resolver ANTES de finalizar

### REGRA 2: Descricao eh contrato
O campo `description` de um feitico eh o contrato com o jogador. Se a mecanica muda, a descricao DEVE mudar junto. Nunca eh aceitavel ter descricao desatualizada.

**Sub-regra: Cooldown na descricao**
- Se o feitico tem cooldown > 0, mencionar na descricao (ex: "Recarga: 3 turnos")
- Se o feitico NAO tem cooldown (cooldown = 0 ou ausente), NAO mencionar "Sem cooldown" na descricao. A ausencia de cooldown eh o padrao e nao precisa ser explicitada.

### REGRA 3: Excecoes devem ser documentadas
Se uma nova criacao quebra uma regra existente por design (excecao intencional):
1. Documentar a excecao no campo `description` do feitico
2. Adicionar comentario no codigo explicando a excecao
3. Atualizar este documento se a excecao criar nova regra

### REGRA 4: Tudo que existe deve funcionar
Se um campo existe num feitico, ele DEVE ser lido e processado em algum lugar do codigo. Se nao eh processado, ou implementar a leitura, ou remover o campo.

### REGRA 5: Busca antes de criar
Antes de criar qualquer mecanica nova (campo, efeito, tipo de aura, etc.):
1. Verificar se ja existe algo similar
2. Se existe similar, avaliar se pode reutilizar
3. Se criar novo, documentar aqui

### REGRA 6: Um lugar para cada coisa
| O que | Onde definir | Onde processar |
|-------|-------------|----------------|
| Feitico | `feiticos/classes/*.js` | `jogo/dev.html` |
| Efeito (buff/debuff) | `mecanicas/efeitos.js` | `mecanicas/dano.js` |
| Dano/cura | `mecanicas/dano.js` | `mecanicas/dano.js` |
| IA | `mecanicas/ia_monstros.js` | `mecanicas/ia_monstros.js` |
| Alcance | `mecanicas/alcance_e_zona.js` | `mecanicas/alcance_e_zona.js` |
| Brasas | `mecanicas/brasas.js` | `mecanicas/brasas.js` |
| Classes | `sistema/classes.js` | `jogo/dev.html` |
| Invocacoes | `feiticos/classes/*.js` (summon) | `jogo/dev.html` + `mecanicas/dano.js` |
| Drops/Prospeccao | `sistema/drops.js` + equipamentos | `jogo/dev.html` (`rollDropsWithLuck`) |

### REGRA 7: Ao pedir alteracao, verificar cascata
Quando o usuario pedir para alterar algo, antes de alterar:
1. Identificar TODOS os locais onde esse "algo" aparece
2. Listar os impactos potenciais
3. Se houver conflito com regra existente, informar o usuario
4. Perguntar se eh uma excecao ou se a regra deve mudar

### REGRA 8: Teste mental de feitico
Ao criar/alterar um feitico, simular mentalmente:
1. O jogador seleciona o feitico na hotbar
2. O alcance eh exibido corretamente? (rangeShape + minRange + maxRange)
3. O jogador clica em uma celula/alvo valido
4. O efeito eh aplicado? (damage, heal, summon, teleport, etc.)
5. Os efeitos secundarios funcionam? (ardente, push, escudo, etc.)
6. A descricao bate com o que aconteceu?
7. O cooldown ativa corretamente?
8. No proximo turno, o feitico esta disponivel novamente (se cooldown=0)?

---

## 18. SISTEMA DE DROPS E PROSPECCAO

### Formula de chance de drop

```
chance_final = chance_base × mult_raridade × (1 + bonus_sorte + bonus_prospeccao + bonus_missao)
```

- `chance_base`: definida em `monstro.drops[].chance` (0-100)
- `mult_raridade`: `getDropRarityMult(categoria, raridade)` em `sistema/drops.js`
- `bonus_sorte`: `Math.max(0, (luck - 10)) * 0.01` — cada ponto de Sorte acima de 10 = +1%
- `bonus_prospeccao`: `Math.max(0, prospeccao) * 0.01` — cada ponto de Prospeccao = +1%
- `bonus_missao`: bonus % da missao de combate (se completada)
- **Cap**: 95% (nunca garantido)

### Atributo: Prospeccao

- **Chave**: `prospeccao`
- **Funcao**: Aumenta chance de drop em +1% por ponto (multiplicativo sobre chance base)
- **Obtencao**: SOMENTE via equipamentos e consumiveis (NAO alocavel com pontos de atributo)
- **Stacka com**: Sorte (ambos somam no calculo de drop)
- **Diferenca da Sorte**: Sorte tambem da dano de agua. Prospeccao SOMENTE afeta drops
- **Codigo**: `rollDropsWithLuck()` em `jogo/dev.html`
- **Display**: ficha do personagem (`attr-prospeccao`), tooltips de itens, tela de resultados de combate
- **Icone**: ⛏️ (picareta)

### Atributo: Sabedoria (wisdom)

- **Funcao implementada**: Bonus de XP (+1% por ponto acima de 10)
- **Codigo**: `calculateXpWithWisdom()` em `jogo/dev.html`
- **Derivado**: Gera Vontade (1 ponto a cada 10 de Sabedoria) — ver secao 19
- **"Resistencia magica"**: mencionada em tooltips mas NAO implementada no codigo

---

## 19. SISTEMA DE VONTADE (ROUBO DE PA/PM)

### O que e

Vontade eh um atributo derivado de Sabedoria que controla a resistencia e penetracao de roubo de PA/PM em combate. Feiticos com `paSteal` ou `pmSteal` fazem um contest de Vontade antes de roubar.

### Base

```
vontade_base = Math.floor(sabedoria / 10)
```

### Dinamica em combate

- Quando uma entidade **perde** PA ou PM por roubo, ela **ganha Vontade dinamica** igual a quantidade perdida
- A Vontade ganha eh rastreada **por atacante** (para saber o que resetar), mas o TOTAL soma TUDO
- A Vontade ganha por causa do atacante X **reseta quando o turno do atacante X comecar**
- A Vontade de defesa usada no contest = base + TODA Vontade acumulada (de todos os atacantes)
- Exemplo: Jogador A rouba 2 PM de Monstro. Monstro ganha +2 temporario. Jogador B rouba 4 PA do mesmo Monstro. Monstro agora tem base + 6 de Vontade total. Quando chega a vez de A, os 2 de A somem. Restam os 4 de B

### Formula de contest

```
chance_sucesso = vontade_atacante / (vontade_atacante + vontade_defensor)
```

- **Ambos 0**: roubo sempre sucede (sem willpower = sem resistencia)
- **Atacante 0, defensor > 0**: roubo sempre falha
- **Atacante > 0, defensor 0**: roubo sempre sucede

### Flag: stealFixed

- **Campo**: `spell.stealFixed` (boolean)
- **Efeito**: Se `true`, o roubo ignora Vontade — sempre funciona
- **Padrao**: `false` (roubo contestado)
- **Admin**: Checkbox "Roubo Fixo (ignora Vontade)" no painel de feiticos
- **Tooltips**: Mostra "(contestado por Vontade)" ou "(fixo — ignora Vontade)"

### Roubo parcial

O contest acontece 1 vez. Se passa, rouba o que puder (limitado pelo PA/PM disponivel do alvo). Vontade ganha = quantidade real roubada.

### Nao afetado por Vontade

- **On-kill**: Triggers de on-kill (triggers.js) NAO usam Vontade — a vitima esta morta
- **stealFixed = true**: Roubo fixo ignora completamente o sistema

### Codigo

- **Helpers**: `mecanicas/dano.js` — `combatVontade{}`, `getEntityVontade()`, `addVontadeGained()`, `resetVontadeGainedByAttacker()`, `rollVontadeContest()`
- **Contest**: `mecanicas/dano.js` — blocos de paSteal e pmSteal (apos calculo de dano)
- **Init**: `jogo/dev.html` — 6 pontos de init (onde `spellCooldowns = {}`), `startBattle()`, simCombat startup
- **Reset**: `jogo/dev.html` — `passTurn()` e `simCombatPassTurn()` chamam `resetVontadeGainedByAttacker(current.id)`
- **Display**: Ficha do personagem (`attr-vontade`), calculado em `updateAttributesDisplay()`

### Floating text

- **Sucesso**: Roubo normal, mostra "Roubou X PA/PM"
- **Falha**: Mostra "Resistiu!" em amarelo no alvo

---

## 20. SISTEMA DE DOM (PASSIVO DE CLASSE)

### O que e

DOM (Dominio) eh o passivo unico de cada classe. Fica no slot DOM (spellType: 'dom') e nao aparece na hotbar de combate. Seus efeitos sao processados automaticamente.

### DOM do Zefir: Mira Predadora

**Mecanica**: Acumula pontos ao causar dano a distancia. Ao atingir o threshold, ativa bonus temporarios.

#### Acumulacao de pontos

- **Trigger**: Cada vez que o Zefir causa dano direto (nao indireto/armadilha) a um alvo a **4+ celulas** de distancia
- **Pontos ganhos**: `5 x custo_PA_do_feitico`
- **Exemplo**: Flecha de Vento (3 PA) a 6 celulas = +15 pontos. Tempestade de Precisao (5 PA) a 8 celulas = +25 pontos

#### Ativacao (threshold = 100 pontos)

Quando os pontos atingem 100:
1. **Pontos resetam para 0** (sem carry-over — excesso eh perdido)
2. **+20% de critico** por 1 turno (reseta no inicio do proximo turno do Zefir)
3. **+30% de dano no proximo golpe** (NAO expira com tempo — persiste ate ser consumido)
4. **Lock**: o feitico que ativou o threshold fica travado — hits restantes do mesmo cast (AoE/ricochete) NAO acumulam mais pontos
5. **Precisa usar OUTRO feitico** para voltar a acumular pontos (mesmo feitico travado nao acumula ate que outro feitico contribua)

#### Consumo do +30% dano

- So consome quando o Zefir **causa dano direto a um inimigo**
- NAO consome em: dano a aliados, dano indireto (armadilhas), dano a si proprio
- Persiste indefinidamente ate ser usado

#### Implementacao

- **State**: `combatState.domZefir[casterId] = { points: 0, critBonus: 0, nextHitBonus: false, lockedSpellId: null }`
- **Hooks em dano.js**: Antes do crit (+30% dano consumivel), na critChance (+20%), e apos HP ser aplicado (acumulacao)
- **Init**: `combatState.domZefir = {}` em todos os 7 pontos de init de combate
- **Reset do crit**: `passTurn()` e `simCombatPassTurn()` — `critBonus = 0` no inicio do turno
- **Definicao**: `feiticos/classes/atirador.js` — `atirador_dom_mira_predadora`

#### Floating text

- **Pontos ganhos**: "🎯+N (total/100)" em azul claro no caster
- **Threshold atingido**: "🎯 Mira Predadora! +20% Crit +30% Dano!" em amarelo
- **+30% consumido**: "🎯 DOM +30%!" em amarelo no caster

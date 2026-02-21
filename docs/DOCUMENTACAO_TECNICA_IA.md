# 🤖 DOCUMENTAÇÃO TÉCNICA COMPLETA - Betta RPG
## Para IA e Desenvolvimento Avançado

**Última atualização:** 2026-02-11
**Versão:** 2.0 - Documentação Consolidada
**Audiência:** IA, Desenvolvedores, Debugging

---

## 📑 ÍNDICE TÉCNICO

### CORE SYSTEMS
1. [Arquitetura do Jogo](#1-arquitetura-do-jogo)
2. [Estruturas de Dados](#2-estruturas-de-dados)
3. [Sistema de Combate](#3-sistema-de-combate)
4. [Sistema de Resistências](#4-sistema-de-resistências)
5. [Sistema de Dano](#5-sistema-de-dano)
6. [Sistema de Equipamentos](#6-sistema-de-equipamentos)

### ADVANCED SYSTEMS
7. [IA de Monstros](#7-ia-de-monstros)
8. [Pathfinding e LoS](#8-pathfinding-e-los)
9. [Efeitos e Buffs](#9-efeitos-e-buffs)
10. [Inventário e Overflow](#10-inventário-e-overflow)
11. [Persistência e Save](#11-persistência-e-save)

### CONTENT & DATA
12. [Feitiços](#12-feitiços)
13. [Itens e Equipamentos](#13-itens-e-equipamentos)
14. [Monstros](#14-monstros)
15. [Recursos](#15-recursos)

### IMPLEMENTATION DETAILS
16. [Fórmulas Matemáticas](#16-fórmulas-matemáticas)
17. [Constantes e Configurações](#17-constantes-e-configurações)
18. [Funções Principais](#18-funções-principais)
19. [Sistema de Eventos](#19-sistema-de-eventos)
20. [Debugging e Testes](#20-debugging-e-testes)

---

## 1. ARQUITETURA DO JOGO

### 1.1 Estrutura de Arquivos

```
c:\jogo criando\novo jogo simples\
│
├── jogo\
│   ├── dev.html                    # Arquivo principal do jogo (30k+ linhas)
│   └── usuario.html                # Versão para usuário final
│
├── equipamentos\
│   ├── armaduras.js                # DB de armaduras
│   ├── armas.js                    # DB de armas
│   ├── lendarios.js                # DB de itens lendários
│   ├── conjuntos_monstros.js       # DB de sets de monstros
│   ├── bolsas.js                   # DB de bolsas/inventário
│   └── lendarios.js                # Itens épicos/lendários
│
├── mecanicas\
│   ├── dano.js                     # Sistema de cálculo de dano
│   ├── efeitos.js                  # Sistema de buffs/debuffs
│   ├── grade.js                    # Sistema de grid/pathfinding
│   ├── ia_monstros.js              # IA dos monstros
│   ├── linha_de_visao.js           # Line of Sight
│   ├── pathfinding.js              # A* pathfinding
│   ├── terreno.js                  # Sistema de terreno
│   ├── icones.js                   # Sistema de ícones
│   └── alcance_e_zona.js           # Alcance e AoE
│
├── dados\
│   ├── atributos.js                # Definições de atributos
│   ├── icones_equipamentos.js      # Ícones de equipamentos
│   └── recursos_monstros.js        # Recursos dropados
│
├── mapas\
│   ├── mundo\
│   │   └── cidade.js               # Mapa da cidade
│   └── combate\
│       └── padrao.js               # Mapas de combate
│
├── sistema\
│   ├── raridade.js                 # Sistema de raridade
│   └── BALANCEAMENTO.md            # Guia de balanceamento
│
└── docs\
    ├── PLANO_DO_JOGO.md            # Plano geral
    └── DESIGN_DE_ITENS.md          # Regras de design
```

### 1.2 Tecnologias Utilizadas

**Linguagens:**
- HTML5
- JavaScript ES6+ (puro, sem frameworks)
- CSS3

**APIs do Browser:**
- Canvas 2D API (renderização)
- localStorage API (persistência)
- Web Audio API (som - futuro)

**Padrões de Código:**
- Closure pattern (encapsulamento)
- Module pattern (organização)
- Singleton pattern (game state)

### 1.3 Fluxo de Execução

```javascript
1. Load HTML → dev.html
2. Initialize Canvas
3. Load Game State (localStorage)
4. Initialize Systems:
   - Combat system
   - Inventory system
   - Equipment system
   - Spell system
   - Map system
5. Start Game Loop (30 FPS)
6. Render → Update → Render...
7. Auto-save every 5 seconds
```

---

## 2. ESTRUTURAS DE DADOS

### 2.1 Player Entity

```javascript
const playerEntity = {
    type: 'player',
    x: number,              // Posição X no grid
    y: number,              // Posição Y no grid
    hp: number,             // HP atual
    maxHp: number,          // HP máximo
    pa: number,             // PA atual
    maxPa: number,          // PA máximo
    pm: number,             // PM atual
    maxPm: number,          // PM máximo
    pe: number,             // PE atual
    maxPe: number,          // PE máximo

    // Atributos base
    strength: number,       // Força
    intelligence: number,   // Inteligência
    agility: number,        // Agilidade

    // Atributos de combate
    critical: number,       // Chance crítico (%)
    dodge: number,          // Chance esquiva (%)
    defense: number,        // Defesa
    magic: number,          // Poder mágico

    // Resistências
    res_fire: number,
    res_water: number,
    res_air: number,
    res_earth: number,
    res_neutral: number,
    res_general: number,

    // Dano elemental
    dmg_fire: number,
    dmg_water: number,
    dmg_air: number,
    dmg_earth: number,
    dmg_neutral: number,
    dmg_elemental: number,
    dmg_geral: number,

    // Estado
    effects: [],            // Efeitos ativos
    summons: [],            // Invocações ativas
    spells: [],             // Feitiços conhecidos
    equipment: {}           // Equipamento atual
};
```

### 2.2 Monster Entity

```javascript
const monsterEntity = {
    type: 'monster',
    monsterId: string,      // ID do tipo de monstro
    uid: string,            // ID único da instância
    x: number,
    y: number,
    hp: number,
    maxHp: number,
    pa: number,
    maxPa: number,
    pm: number,
    maxPm: number,
    pe: number,
    maxPe: number,

    // Atributos (mesma estrutura do player)
    strength: number,
    intelligence: number,
    agility: number,
    critical: number,
    dodge: number,
    defense: number,

    // Resistências
    res_fire: number,
    res_water: number,
    res_air: number,
    res_earth: number,
    res_neutral: number,
    res_general: number,

    // IA
    aiType: 'aggressive_melee' | 'defensive_ranged',
    aiState: {
        lastAction: string,
        targetPriority: [],
        positionScore: number
    },

    // Combate
    spells: [],
    effects: [],
    loot: []                // Items dropados ao morrer
};
```

### 2.3 Item Structure

```javascript
const item = {
    id: string,             // ID único do item
    catalogId: string,      // ID no catálogo (para agrupamento)
    uid: string,            // UID da instância (gerado)
    name: string,           // Nome exibido
    icon: string,           // Emoji ou char
    iconColor: string,      // Cor do ícone (#hex)
    category: 'equipment' | 'consumable' | 'resource',
    slot: 'weapon' | 'helmet' | 'chest' | 'legs' | 'boots' | 'cape' | 'belt' | 'ring' | null,
    rarity: 'comum' | 'incomum' | 'raro' | 'epico' | 'lendario',
    nivelRequerido: number, // Level mínimo para usar

    // Equipamentos
    attributes: {
        strength: number,
        intelligence: number,
        agility: number,
        pv: number,
        pa: number,
        pm: number,
        pe: number,
        critical: number,
        dodge: number,
        defense: number,
        magic: number,
        res_fire: number,
        res_water: number,
        res_air: number,
        res_earth: number,
        res_neutral: number,
        res_general: number,
        dmg_fire: number,
        dmg_water: number,
        dmg_air: number,
        dmg_earth: number,
        dmg_neutral: number,
        dmg_elemental: number,
        dmg_geral: number
    },

    // Armas
    weaponType: 'sword' | 'staff' | 'bow' | 'dagger',
    twoHanded: boolean,     // Bloqueia mão esquerda
    damage: {
        pa: number,         // Custo PA
        pm: number,         // Custo PM (movimento)
        pe: number          // Custo PE
    },
    range: number,          // Alcance base

    // Consumíveis
    stackable: boolean,     // Pode empilhar
    maxStack: number,       // Quantidade máxima por stack
    quantity: number,       // Quantidade atual
    consumable: {
        effect: string,     // Tipo de efeito
        value: number,      // Valor do efeito
        duration: number    // Duração (turnos)
    },

    // Sets
    setId: string,          // ID do conjunto
    setBonuses: [],         // Bônus do set

    // Especial
    habilidadeEspecial: string  // Descrição de habilidade única
};
```

### 2.4 Spell Structure

```javascript
const spell = {
    id: string,
    catalogId: string,
    name: string,
    icon: string,
    iconColor: string,
    category: 'spell',
    type: 'active' | 'passive',
    class: string | null,   // Classe específica (futuro)
    rarity: 'comum' | 'incomum' | 'raro' | 'epico' | 'lendario',
    description: string,

    // Custos
    paCost: number,
    pmCost: number,
    peCost: number,

    // Alcance
    minRange: number,
    maxRange: number,
    rangeType: 'cross' | 'circle' | 'line' | 'diagonal' | 'star',
    needsTarget: boolean,
    targetType: ['ally', 'enemy', 'self'],
    lineOfSight: boolean,

    // Dano
    damage: {
        min: number,
        max: number,
        stat: 'strength' | 'intelligence' | 'agility'
    },
    element: 'fire' | 'water' | 'air' | 'earth' | 'neutral',

    // Cura
    heal: {
        min: number,
        max: number
    },

    // AoE
    aoe: {
        type: 'cross' | 'circle' | 'line',
        radius: number,
        cells: [[x,y], ...]
    },

    // Efeitos
    effects: [{
        type: 'resist' | 'damage' | 'heal' | 'buff' | 'debuff',
        element: string,
        value: number,
        duration: number,
        durationType: 'turns' | 'permanent',
        icon: string,
        name: string,
        description: string,
        level: number
    }],

    // Cooldown
    cooldown: {
        type: 'perTurn' | 'perTarget' | 'global',
        value: number
    },

    // Push/Pull
    push: number,           // Células de empurrão
    pull: number,           // Células de puxão

    // Invocação
    summon: {
        monsterId: string,
        duration: number
    }
};
```

### 2.5 Combat State

```javascript
const combatState = {
    phase: 'positioning' | 'player' | 'enemy' | 'end',
    round: number,          // Número do turno

    // Participantes
    participants: [
        {
            id: string,     // UID único
            type: 'player' | 'monster' | 'summon',
            entity: object, // Referência à entidade
            initiative: number,
            hasMoved: boolean,
            hasActed: boolean
        }
    ],

    // Ordem de turno
    turnOrder: [],          // IDs ordenados por iniciativa
    currentTurn: number,    // Índice no turnOrder

    // Grid de combate
    combatGrid: {
        width: 20,
        height: 20,
        cells: [][]         // Mapa de células
    },

    // Efeitos globais
    zones: [],              // Zonas de efeito ativas

    // Buffs passivos
    passiveBoosts: {
        'res_fire': number,
        'dmg_fire': number,
        // ... outros atributos
    },

    // Estado de ação
    selectedSpell: null,
    targetedCells: [],
    previewCells: [],

    // Controle
    isWaitingForAction: boolean,
    canEndTurn: boolean
};
```

---

## 3. SISTEMA DE COMBATE

### 3.1 Inicialização de Combate

**Arquivo:** `dev.html`
**Função:** `startCombat(enemies)`
**Linhas:** ~11500-11650

```javascript
function startCombat(enemies) {
    // 1. Criar participantes
    combatState.participants = [];

    // 2. Adicionar player
    const playerPart = {
        id: 'player',
        type: 'player',
        entity: playerEntity,
        initiative: calcInitiative(playerEntity),
        hasMoved: false,
        hasActed: false
    };
    combatState.participants.push(playerPart);

    // 3. Adicionar monstros
    enemies.forEach(enemy => {
        const monsterPart = {
            id: enemy.uid,
            type: 'monster',
            entity: enemy,
            initiative: calcInitiative(enemy),
            hasMoved: false,
            hasActed: false
        };
        combatState.participants.push(monsterPart);
    });

    // 4. Ordenar por iniciativa
    combatState.turnOrder = combatState.participants
        .sort((a, b) => b.initiative - a.initiative)
        .map(p => p.id);

    // 5. Configurar fase
    combatState.phase = 'positioning';
    combatState.round = 1;
    combatState.currentTurn = 0;

    // 6. Renderizar UI
    updateCombatUI();
    renderTurnOrder();
}
```

### 3.2 Cálculo de Iniciativa

**Fórmula:**
```javascript
initiative = agility + random(1, 10)
```

**Código:**
```javascript
function calcInitiative(entity) {
    const totalAttrs = calculateTotalAttributes(entity);
    const base = totalAttrs.agility || 0;
    const random = Math.floor(Math.random() * 10) + 1;
    return base + random;
}
```

### 3.3 Fluxo de Turno

```
1. START TURN
   ├─> Regenera PA/PM/PE
   ├─> Aplica efeitos de início de turno
   ├─> Atualiza cooldowns
   └─> Marca canEndTurn = false

2. PLAYER/MONSTER ACTIONS
   ├─> Mover (gasta PM)
   ├─> Atacar (gasta PA)
   ├─> Usar feitiço (gasta PA/PE)
   └─> Buffs/Debuffs

3. END TURN (Botão ou IA decide)
   ├─> Aplica efeitos de fim de turno
   ├─> Reduz duração de efeitos
   ├─> Remove efeitos expirados
   ├─> hasMoved = false, hasActed = false
   └─> Avança para próximo na fila

4. CHECK VICTORY/DEFEAT
   ├─> Se todos monstros mortos → VITÓRIA
   ├─> Se player morto → DERROTA
   └─> Senão → próximo turno
```

### 3.4 Sistema de Movimento

**Arquivo:** `dev.html`
**Função:** `moveCombatEntity(entityId, targetX, targetY)`
**Linhas:** ~12800-12900

```javascript
function moveCombatEntity(entityId, targetX, targetY) {
    const part = combatState.participants.find(p => p.id === entityId);
    const entity = part.entity;

    // 1. Calcular caminho (A*)
    const path = findPath(entity.x, entity.y, targetX, targetY);

    // 2. Calcular custo PM
    const pmCost = path.length - 1;

    // 3. Verificar PM suficiente
    if (entity.pm < pmCost) {
        showMessage('PM insuficiente!');
        return false;
    }

    // 4. Verificar lock/tackle
    const locked = isLockedByEnemy(entity);
    if (locked) {
        const escapeChance = calculateEscapeChance(entity, locked);
        if (Math.random() > escapeChance) {
            showMessage('🔒 Bloqueado!');
            return false;
        }
    }

    // 5. Mover
    entity.x = targetX;
    entity.y = targetY;
    entity.pm -= pmCost;
    part.hasMoved = true;

    // 6. Renderizar
    updateCombatGrid();
    return true;
}
```

### 3.5 Sistema de Ataque

**Arquivo:** `dev.html`
**Função:** `castSpell(spellId, targetX, targetY)`
**Linhas:** ~13200-13500

```javascript
function castSpell(spellId, targetX, targetY) {
    const spell = getSpellById(spellId);
    const caster = getCurrentTurnEntity();

    // 1. Validações
    if (caster.pa < spell.paCost) return false;
    if (caster.pe < spell.peCost) return false;
    if (!isInRange(caster, targetX, targetY, spell)) return false;
    if (spell.lineOfSight && !hasLineOfSight(caster, targetX, targetY)) return false;

    // 2. Gastar recursos
    caster.pa -= spell.paCost;
    caster.pm -= spell.pmCost || 0;
    caster.pe -= spell.peCost || 0;

    // 3. Obter alvos
    const targets = getTargetsInAoE(targetX, targetY, spell);

    // 4. Aplicar efeitos
    targets.forEach(target => {
        // Dano
        if (spell.damage) {
            dealDamageToTarget(spell, [target], caster);
        }

        // Cura
        if (spell.heal) {
            healTarget(spell, target, caster);
        }

        // Efeitos (buffs/debuffs)
        if (spell.effects) {
            applySpellEffects(spell, target, caster);
        }

        // Push/Pull
        if (spell.push) {
            pushTarget(target, caster, spell.push);
        }
        if (spell.pull) {
            pullTarget(target, caster, spell.pull);
        }
    });

    // 5. Registrar uso (cooldown)
    registerSpellUse(spellId, targets);

    // 6. Atualizar UI
    updateCombatUI();
    addCombatMessage(`${caster.name} usou ${spell.name}!`);

    return true;
}
```

---

## 4. SISTEMA DE RESISTÊNCIAS

### 4.1 Implementação Técnica

**Arquivo:** `mecanicas/dano.js`
**Função:** `getTargetResistance(target, element, totalAttrs)`
**Linhas:** 120-145

```javascript
function getTargetResistance(target, element, totalAttrs) {
    if (!element || element === 'none') return 0;

    // 1. Obter resistência específica
    const resKey = 'res_' + element;
    const specificRes = totalAttrs[resKey] || 0;

    // 2. Obter resistência geral (SOMA EM TODOS!)
    const generalRes = totalAttrs.res_general || 0;

    // 3. Obter efeitos ativos que modificam resistência
    const activeEffects = typeof getActiveEffects === 'function'
        ? getActiveEffects(target.uid || target.id || 'player')
        : [];

    let effectBonus = 0;
    activeEffects.forEach(effect => {
        if (effect.type === 'resist' && effect.element === element) {
            effectBonus += (effect.value || 0);
        }
    });

    // 4. Somar tudo
    const totalResist = specificRes + generalRes + effectBonus;

    return totalResist;
}
```

### 4.2 Fórmula de Conversão

**Arquivo:** `dev.html`
**Função:** `resistToPercent(resist)`
**Linha:** ~16850

```javascript
function resistToPercent(resist) {
    // Fórmula com diminishing returns
    // resist / (|resist| + 200) * 100

    if (resist === 0) return 0;

    const absResist = Math.abs(resist);
    const reduction = resist / (absResist + 200) * 100;

    return reduction;
}
```

**Explicação Matemática:**
```
Para resist = 50:
  50 / (50 + 200) × 100 = 50/250 × 100 = 0.2 × 100 = 20%

Para resist = 100:
  100 / (100 + 200) × 100 = 100/300 × 100 = 0.333 × 100 = 33.3%

Para resist = 200:
  200 / (200 + 200) × 100 = 200/400 × 100 = 0.5 × 100 = 50%

Para resist = -50 (vulnerabilidade):
  -50 / (50 + 200) × 100 = -50/250 × 100 = -0.2 × 100 = -20%
```

**Curva de Diminishing Returns:**
```
Cada +50 pontos adicionais:
  0 → 50: +20.0% (ganho de 20%)
  50 → 100: +13.3% (ganho de 13.3%)
  100 → 150: +9.5% (ganho de 9.5%)
  150 → 200: +7.1% (ganho de 7.1%)
  200 → 250: +5.6% (ganho de 5.6%)
```

### 4.3 Aplicação em Combate

**Arquivo:** `mecanicas/dano.js`
**Função:** `dealDamageToTarget(...)`
**Linhas:** 189-195

```javascript
// Após calcular dano bruto...
const targetResist = getTargetResistance(target, resolvedElem, totalTargetAttrs);

if (targetResist !== 0) {
    const reductionPct = resistToPercent(targetResist) / 100;
    rawDmg *= (1 - reductionPct);
    if (rawDmg < 0) rawDmg = 0;
}
```

**Exemplo Prático:**
```javascript
// Jogador ataca com feitiço de fogo
Dano base: 100
Elemento: fire

// Monstro tem:
res_fire = 50 (de equipamento)
res_general = 20 (de buff)
Total res_fire = 50 + 20 = 70

// Conversão:
70 / (70 + 200) × 100 = 25.9%

// Aplicação:
100 × (1 - 0.259) = 100 × 0.741 = 74.1 de dano final
```

---

## 5. SISTEMA DE DANO

### 5.1 Cálculo Completo de Dano

**Arquivo:** `mecanicas/dano.js`
**Função:** `dealDamageToTarget(spell, targets, caster, ...)`
**Linhas:** 140-250

```javascript
function dealDamageToTarget(spell, targets, caster, x, y, bonusPct, directDmg) {
    // ===== 1. DANO BASE =====
    let baseDmg = 0;
    if (directDmg !== undefined) {
        baseDmg = directDmg;
    } else if (spell.damage) {
        const min = spell.damage.min || 0;
        const max = spell.damage.max || min;
        baseDmg = Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // ===== 2. SCALING DE ATRIBUTO (70%) =====
    const total = calculateTotalAttributes(caster);
    const scalingStat = spell.damage?.stat || 'intelligence';
    const statValue = total[scalingStat] || 0;
    const scalingBonus = Math.floor(statValue * 0.7);

    let rawDmg = baseDmg + scalingBonus;

    // ===== 3. BÔNUS PASSIVO =====
    const passiveBonus = bonusPct || 0;
    if (passiveBonus > 0) {
        rawDmg *= (1 + passiveBonus / 100);
    }

    // ===== 4. EFEITOS ATIVOS DO CASTER =====
    const casterEffects = getActiveEffects(caster.uid || caster.id || 'player');
    let totalDmgBonus = 0;
    casterEffects.forEach(effect => {
        if (effect.type === 'damage' && effect.element === resolvedElem) {
            totalDmgBonus += (effect.value || 0);
        }
    });
    if (totalDmgBonus > 0) {
        rawDmg *= (1 + totalDmgBonus / 100);
    }

    // ===== 5. BÔNUS ELEMENTAL (dmg_fire, dmg_elemental, dmg_geral) =====
    const resolvedElem = spell.element || 'neutral';
    const elemAttrBonus = total['dmg_' + resolvedElem] || 0;
    const elemGeneralBonus = (resolvedElem !== 'none' && resolvedElem !== 'neutral')
        ? (total.dmg_elemental || 0) : 0;
    const dmgGeralBonus = total.dmg_geral || 0;

    if (elemAttrBonus > 0 || elemGeneralBonus > 0 || dmgGeralBonus > 0) {
        rawDmg *= (1 + (elemAttrBonus + elemGeneralBonus + dmgGeralBonus) / 100);
    }

    // ===== 6. BÔNUS CONTRA BLINDADO =====
    // (código omitido para brevidade)

    // ===== 7. CRÍTICO (+30%) =====
    const isCrit = rollCritical(total);
    if (isCrit) {
        rawDmg *= 1.30;
    }

    // ===== 8. APLICAR A CADA ALVO =====
    targets.forEach(target => {
        let finalDmg = rawDmg;

        // 8a. RESISTÊNCIA DO ALVO
        const totalTargetAttrs = calculateTotalAttributes(target);
        const targetResist = getTargetResistance(target, resolvedElem, totalTargetAttrs);

        if (targetResist !== 0) {
            const reductionPct = resistToPercent(targetResist) / 100;
            finalDmg *= (1 - reductionPct);
            if (finalDmg < 0) finalDmg = 0;
        }

        // 8b. PARADA (DODGE) -30%
        const isBlocked = rollDodge(totalTargetAttrs);
        if (isBlocked) {
            finalDmg *= 0.70;
        }

        // 8c. ARREDONDAR
        finalDmg = Math.floor(finalDmg);

        // 8d. APLICAR HP/ESCUDO
        applyDamageToEntity(target, finalDmg);

        // 8e. LOG
        const critText = isCrit ? '⚡ CRÍTICO! ' : '';
        const blockText = isBlocked ? '🛡️ PARADA! ' : '';
        addCombatMessage(`${critText}${blockText}${finalDmg} de dano ${resolvedElem} em ${target.name}`);
    });

    return rawDmg;
}
```

### 5.2 Tabela de Ordem de Aplicação

| # | Etapa | Tipo | Exemplo |
|---|-------|------|---------|
| 1 | Dano Base | Aleatório | 80-120 → 100 |
| 2 | Scaling | Multiplicativo | +35 (70% de INT 50) |
| 3 | Bônus Passivo | Percentual | ×1.10 (+10%) |
| 4 | Efeitos Ativos | Percentual | ×1.20 (+20%) |
| 5 | Bônus Elemental | Percentual | ×1.60 (+30% dmg_fire + 30% dmg_geral) |
| 6 | Vs Blindado | Percentual | ×1.15 (+15%) |
| 7 | Crítico | Percentual | ×1.30 (+30%) |
| 8 | Resistência | Percentual | ×0.74 (-26%) |
| 9 | Parada | Percentual | ×0.70 (-30%) |
| 10 | Aplicar | Final | HP -= damage |

**Cálculo Exemplo:**
```
(100 + 35) × 1.10 × 1.20 × 1.60 × 1.15 × 1.30 × 0.74 × 0.70
= 135 × 1.10 × 1.20 × 1.60 × 1.15 × 1.30 × 0.74 × 0.70
= 225 dano final
```

---

## 6. SISTEMA DE EQUIPAMENTOS

### 6.1 Cálculo de Atributos Totais

**Arquivo:** `dev.html`
**Função:** `calculateTotalAttributes(entity)`
**Linhas:** ~16750-16850

```javascript
function calculateTotalAttributes(entity) {
    const total = {
        strength: 0,
        intelligence: 0,
        agility: 0,
        pv: 0,
        pa: 0,
        pm: 0,
        pe: 0,
        critical: 0,
        dodge: 0,
        defense: 0,
        magic: 0,
        res_fire: 0,
        res_water: 0,
        res_air: 0,
        res_earth: 0,
        res_neutral: 0,
        res_general: 0,
        dmg_fire: 0,
        dmg_water: 0,
        dmg_air: 0,
        dmg_earth: 0,
        dmg_neutral: 0,
        dmg_elemental: 0,
        dmg_geral: 0
    };

    // 1. Atributos base da entidade
    Object.keys(total).forEach(key => {
        total[key] += (entity[key] || 0);
    });

    // 2. Equipamentos (se for player)
    if (entity.type === 'player' && playerEquipment) {
        MAIN_EQUIP_SLOTS.forEach(slot => {
            const item = playerEquipment[slot];
            if (item && item.attributes) {
                Object.keys(item.attributes).forEach(key => {
                    total[key] += (item.attributes[key] || 0);
                });
            }
        });

        // Anéis (ring0 a ring9)
        RING_SLOTS.forEach(slot => {
            const item = playerEquipment[slot];
            if (item && item.attributes) {
                Object.keys(item.attributes).forEach(key => {
                    total[key] += (item.attributes[key] || 0);
                });
            }
        });
    }

    // 3. Buffs ativos (passiveBoosts)
    if (combatState.passiveBoosts) {
        Object.keys(combatState.passiveBoosts).forEach(key => {
            total[key] += (combatState.passiveBoosts[key] || 0);
        });
    }

    // 4. res_general distribui para TODAS resistências
    if (total.res_general > 0) {
        total.res_fire += total.res_general;
        total.res_water += total.res_general;
        total.res_air += total.res_general;
        total.res_earth += total.res_general;
        total.res_neutral += total.res_general;
    }

    return total;
}
```

### 6.2 Sistema de Sets

**Estrutura:**
```javascript
const setBonus = {
    setId: 'conjunto_lobo_primordial',
    2: {  // 2 peças equipadas
        strength: +5,
        agility: +5
    },
    3: {  // 3 peças equipadas
        strength: +10,
        agility: +10,
        critical: +5
    },
    4: {  // 4 peças equipadas (set completo)
        strength: +20,
        agility: +20,
        critical: +15,
        dodge: +10,
        habilidadeEspecial: 'Ataques críticos curam 5% do dano causado'
    }
};
```

**Cálculo:**
```javascript
function calculateSetBonuses() {
    const setCounts = {};

    // Contar peças de cada set
    ALL_EQUIP_SLOTS.forEach(slot => {
        const item = playerEquipment[slot];
        if (item && item.setId) {
            setCounts[item.setId] = (setCounts[item.setId] || 0) + 1;
        }
    });

    // Aplicar bônus
    const bonuses = {};
    Object.keys(setCounts).forEach(setId => {
        const count = setCounts[setId];
        const setData = getSetData(setId);

        // Aplicar bônus por quantidade
        [2, 3, 4, 5, 6].forEach(threshold => {
            if (count >= threshold && setData[threshold]) {
                Object.assign(bonuses, setData[threshold]);
            }
        });
    });

    return bonuses;
}
```

---

## 7. IA DE MONSTROS

### 7.1 Sistema de Utility-Based AI

**Arquivo:** `mecanicas/ia_monstros.js`
**Função:** `evaluateMonsterAction(monster)`

```javascript
function evaluateMonsterAction(monster) {
    const actions = [];

    // 1. AVALIAR ATAQUES
    monster.spells.forEach(spell => {
        const targets = findPossibleTargets(monster, spell);
        targets.forEach(target => {
            const score = calculateAttackScore(monster, spell, target);
            actions.push({
                type: 'attack',
                spell: spell,
                target: target,
                score: score
            });
        });
    });

    // 2. AVALIAR MOVIMENTOS
    const moveOptions = findBestMovePositions(monster);
    moveOptions.forEach(pos => {
        const score = calculateMoveScore(monster, pos);
        actions.push({
            type: 'move',
            position: pos,
            score: score
        });
    });

    // 3. AVALIAR BUFFS/DEBUFFS
    // (código omitido)

    // 4. ESCOLHER MELHOR AÇÃO
    actions.sort((a, b) => b.score - a.score);
    return actions[0];
}
```

### 7.2 Cálculo de Score de Ataque

```javascript
function calculateAttackScore(monster, spell, target) {
    let score = 0;

    // Base: Dano esperado
    const expectedDamage = estimateDamage(monster, spell, target);
    score += expectedDamage * 10;

    // Bônus: Alvo com baixo HP
    const hpPercent = target.hp / target.maxHp;
    if (hpPercent < 0.3) score += 200;  // Quase morto!
    else if (hpPercent < 0.5) score += 100;

    // Bônus: Múltiplos alvos (AoE)
    if (spell.aoe) {
        const targetsInAoE = countTargetsInAoE(spell, target.x, target.y);
        score += targetsInAoE * 50;
    }

    // Penalidade: Distância
    const distance = getDistance(monster, target);
    score -= distance * 5;

    // Penalidade: PA insuficiente após ataque
    const paLeft = monster.pa - spell.paCost;
    if (paLeft < 3) score -= 30;

    return score;
}
```

### 7.3 Arquétipos de IA

#### Aggressive Melee
```javascript
const aggressiveMelee = {
    preferredDistance: 1-2,
    priorityTargets: ['low_hp', 'player'],
    actionPreference: {
        attack: 0.7,
        move: 0.2,
        buff: 0.1
    },
    positioning: 'offensive'
};
```

#### Defensive Ranged
```javascript
const defensiveRanged = {
    preferredDistance: 4-8,
    priorityTargets: ['weakest', 'isolated'],
    actionPreference: {
        attack: 0.5,
        move: 0.3,
        buff: 0.2
    },
    positioning: 'defensive'
};
```

---

## 8. PATHFINDING E LOS

### 8.1 Algoritmo A*

**Arquivo:** `mecanicas/pathfinding.js`
**Função:** `findPath(startX, startY, endX, endY)`

```javascript
function findPath(startX, startY, endX, endY) {
    const openSet = [];
    const closedSet = new Set();

    const startNode = {
        x: startX,
        y: startY,
        g: 0,  // Custo do início até aqui
        h: heuristic(startX, startY, endX, endY),  // Estimativa até o fim
        f: 0,  // g + h
        parent: null
    };
    startNode.f = startNode.g + startNode.h;
    openSet.push(startNode);

    while (openSet.length > 0) {
        // Pegar nó com menor f
        openSet.sort((a, b) => a.f - b.f);
        const current = openSet.shift();

        // Chegou ao destino?
        if (current.x === endX && current.y === endY) {
            return reconstructPath(current);
        }

        closedSet.add(`${current.x},${current.y}`);

        // Vizinhos
        const neighbors = getNeighbors(current.x, current.y);
        neighbors.forEach(neighbor => {
            const key = `${neighbor.x},${neighbor.y}`;
            if (closedSet.has(key)) return;
            if (isBlocked(neighbor.x, neighbor.y)) return;

            const tentativeG = current.g + 1;

            let neighborNode = openSet.find(n => n.x === neighbor.x && n.y === neighbor.y);
            if (!neighborNode) {
                neighborNode = {
                    x: neighbor.x,
                    y: neighbor.y,
                    g: tentativeG,
                    h: heuristic(neighbor.x, neighbor.y, endX, endY),
                    parent: current
                };
                neighborNode.f = neighborNode.g + neighborNode.h;
                openSet.push(neighborNode);
            } else if (tentativeG < neighborNode.g) {
                neighborNode.g = tentativeG;
                neighborNode.f = neighborNode.g + neighborNode.h;
                neighborNode.parent = current;
            }
        });
    }

    return []; // Sem caminho
}

function heuristic(x1, y1, x2, y2) {
    // Manhattan distance
    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}
```

### 8.2 Line of Sight (LoS)

**Arquivo:** `mecanicas/linha_de_visao.js`
**11 Algoritmos Implementados:**

1. **Bresenham** - Mais rápido, aproximado
2. **DDA** - Digital Differential Analyzer
3. **Raycasting** - Preciso, mais lento
4. **Grid Traversal** - Para grids específicos
5. **Supercover** - Cobre todas células tocadas
6. **Thick Line** - Linha com espessura
7. **Shadow Casting** - Para FOV
8. **Recursive Shadow** - FOV recursivo
9. **Permissive FOV** - FOV permissivo
10. **Diamond Walls** - Paredes de diamante
11. **1.5D Raycasting** - Raycasting 1.5D

**Uso Padrão:**
```javascript
function hasLineOfSight(entity, targetX, targetY) {
    return bresenhamLineOfSight(entity.x, entity.y, targetX, targetY);
}
```

---

## 9. EFEITOS E BUFFS

### 9.1 Estrutura de Efeito

```javascript
const effect = {
    type: 'resist' | 'damage' | 'heal' | 'buff' | 'debuff',
    element: 'fire' | 'water' | 'air' | 'earth' | 'neutral',
    value: number,
    duration: number,
    durationType: 'turns' | 'permanent',
    appliedAt: number,      // Turno de aplicação
    icon: string,
    name: string,
    description: string,
    level: number,
    sourceId: string,       // Quem aplicou
    targetId: string        // Em quem foi aplicado
};
```

### 9.2 Aplicação de Efeitos

**Arquivo:** `dev.html`
**Função:** `applyPassiveEffect(effect, targetId)`
**Linhas:** ~12790-12850

```javascript
function applyPassiveEffect(effect, targetId) {
    const key = effect.type === 'resist'
        ? 'res_' + effect.element
        : 'dmg_' + effect.element;

    // Adicionar ao combatState.passiveBoosts
    combatState.passiveBoosts[key] =
        (combatState.passiveBoosts[key] || 0) + (effect.value || 0);

    // Registrar efeito ativo
    if (!combatState.activeEffects) {
        combatState.activeEffects = {};
    }
    if (!combatState.activeEffects[targetId]) {
        combatState.activeEffects[targetId] = [];
    }

    combatState.activeEffects[targetId].push({
        ...effect,
        appliedAt: combatState.round,
        targetId: targetId
    });

    // Atualizar UI
    updateEffectsDisplay(targetId);
}
```

### 9.3 Remoção de Efeitos

```javascript
function updateEffectDurations() {
    Object.keys(combatState.activeEffects).forEach(targetId => {
        const effects = combatState.activeEffects[targetId];

        // Reduzir duração
        for (let i = effects.length - 1; i >= 0; i--) {
            const effect = effects[i];
            effect.duration--;

            // Remover se expirado
            if (effect.duration <= 0) {
                removeEffect(effect, targetId);
                effects.splice(i, 1);
            }
        }
    });
}

function removeEffect(effect, targetId) {
    const key = effect.type === 'resist'
        ? 'res_' + effect.element
        : 'dmg_' + effect.element;

    // Remover de passiveBoosts
    combatState.passiveBoosts[key] =
        (combatState.passiveBoosts[key] || 0) - (effect.value || 0);

    // Atualizar UI
    updateEffectsDisplay(targetId);
}
```

---

## 10. INVENTÁRIO E OVERFLOW

### 10.1 Sistema de Overflow

**Arquivo:** `dev.html`
**Variável Global:** `overflowItems = []`
**Linhas:** ~17480

```javascript
let overflowItems = [];  // Itens que não couberam no inventário
```

**Funções:**
```javascript
// Adicionar ao overflow
function addToOverflow(item) {
    overflowItems.push(item);
    showOverflowWindow();
    updateOverflowDisplay();
    addChatMessage(`📦 ${item.name} foi para a área de overflow (inventário cheio)`);
}

// Mover do overflow para inventário
function moveOverflowToInventory(overflowIndex, invIndex) {
    const item = overflowItems[overflowIndex];

    // Slot vazio
    if (!playerInventory[invIndex]) {
        playerInventory[invIndex] = item;
        overflowItems.splice(overflowIndex, 1);
        updateInventoryDisplay();
        updateOverflowDisplay();
        return;
    }

    // Stackable do mesmo tipo
    const invItem = playerInventory[invIndex];
    if (item.stackable && invItem.id === item.id) {
        invItem.quantity += item.quantity;
        overflowItems.splice(overflowIndex, 1);
        updateInventoryDisplay();
        updateOverflowDisplay();
        return;
    }

    // Trocar posições
    const temp = invItem;
    playerInventory[invIndex] = item;
    overflowItems[overflowIndex] = temp;
    updateInventoryDisplay();
    updateOverflowDisplay();
}

// Descartar item
function discardOverflowItem(index) {
    const item = overflowItems[index];
    overflowItems.splice(index, 1);
    addChatMessage(`🗑️ ${item.name} foi descartado`);
    updateOverflowDisplay();

    if (overflowItems.length === 0) {
        hideOverflowWindow();
    }
}
```

---

## 11. PERSISTÊNCIA E SAVE

### 11.1 Sistema de Auto-Save

**Intervalo:** 5 segundos
**Storage:** localStorage

```javascript
setInterval(() => {
    saveGameState();
}, 5000);
```

### 11.2 Estrutura de Save

```javascript
const saveData = {
    version: '2.0',
    timestamp: Date.now(),

    // Player
    playerPosition: {x, y},
    playerStats: {hp, maxHp, pa, maxPa, ...},
    playerEquipment: {},
    playerInventory: [],

    // Progressão
    playerXP: number,
    playerLevel: number,

    // Feitiços
    knownSpells: [],
    equippedSpells: [],
    spellCooldowns: {},

    // Mapa
    currentMap: 'cidade',
    visitedMaps: [],

    // Flags
    completedQuests: [],
    defeatedBosses: [],

    // Custom Content
    customItems: [],
    customSpells: [],
    customMonsters: []
};
```

### 11.3 Funções de Save/Load

```javascript
function saveGameState() {
    const data = {
        version: GAME_VERSION,
        timestamp: Date.now(),
        playerPosition: playerPosition,
        playerStats: playerStats,
        playerEquipment: playerEquipment,
        playerInventory: playerInventory,
        knownSpells: playerSpellCollection.map(s => s.id),
        equippedSpells: equippedSpells.map(s => s ? s.id : null),
        customItems: customItems,
        customSpells: customSpells
    };

    localStorage.setItem('betta_save', JSON.stringify(data));
}

function loadGameState() {
    try {
        const saved = localStorage.getItem('betta_save');
        if (!saved) return false;

        const data = JSON.parse(saved);

        // Validar versão
        if (data.version !== GAME_VERSION) {
            console.warn('Save incompatível, migrando...');
            migrateSave(data);
        }

        // Restaurar estado
        playerPosition = data.playerPosition;
        playerStats = data.playerStats;
        playerEquipment = data.playerEquipment;
        playerInventory = data.playerInventory;
        customItems = data.customItems || [];
        customSpells = data.customSpells || [];

        // Recarregar feitiços
        data.knownSpells.forEach(id => {
            const spell = findSpellById(id);
            if (spell) playerSpellCollection.push(spell);
        });

        return true;
    } catch (e) {
        console.error('Erro ao carregar save:', e);
        return false;
    }
}
```

---

## 12-20. [CONTINUAÇÃO EM PRÓXIMA VERSÃO]

**Status:** Documento em construção
**Próximas seções:**
- 12. Feitiços (estrutura completa)
- 13. Itens e Equipamentos (todos os itens)
- 14. Monstros (bestiário completo)
- 15. Recursos (sistema de drop)
- 16. Fórmulas Matemáticas (todas as fórmulas)
- 17. Constantes e Configurações
- 18. Funções Principais
- 19. Sistema de Eventos
- 20. Debugging e Testes

---

## APÊNDICE A: REFERÊNCIA RÁPIDA DE FUNÇÕES

### Funções Críticas por Categoria

#### Combate
- `startCombat(enemies)` - Iniciar combate
- `endTurn()` - Finalizar turno
- `castSpell(spellId, x, y)` - Lançar feitiço
- `dealDamageToTarget(...)` - Causar dano
- `moveCombatEntity(id, x, y)` - Mover entidade

#### Atributos
- `calculateTotalAttributes(entity)` - Calcular atributos totais
- `getTargetResistance(target, elem, attrs)` - Obter resistência
- `resistToPercent(resist)` - Converter resist → %

#### Equipamentos
- `equipItem(item, slot)` - Equipar item
- `unequipItem(slot)` - Desequipar item
- `addToInventory(item)` - Adicionar ao inventário
- `addToOverflow(item)` - Adicionar ao overflow

#### IA
- `evaluateMonsterAction(monster)` - Avaliar ação
- `calculateAttackScore(...)` - Score de ataque
- `findBestMovePositions(monster)` - Melhores posições

#### Pathfinding
- `findPath(x1, y1, x2, y2)` - A* pathfinding
- `hasLineOfSight(entity, x, y)` - Verificar LoS
- `getDistance(a, b)` - Calcular distância

---

## APÊNDICE B: CONSTANTES IMPORTANTES

```javascript
// Grid de combate
const COMBAT_GRID_WIDTH = 20;
const COMBAT_GRID_HEIGHT = 20;

// Slots de equipamento
const MAIN_EQUIP_SLOTS = ['weapon', 'weaponLeft', 'helmet', 'chest', 'legs', 'boots', 'cape', 'belt'];
const RING_SLOTS = Array.from({length: 10}, (_, i) => 'ring' + i);
const ALL_EQUIP_SLOTS = [...MAIN_EQUIP_SLOTS, ...RING_SLOTS];

// Elementos
const ELEMENTS = ['fire', 'water', 'air', 'earth', 'neutral'];

// Raridades
const RARITIES = ['comum', 'incomum', 'raro', 'epico', 'lendario'];

// Limites táticos
const MAX_SUMMONS = 5;
const MAX_EFFECTS_PER_ENTITY = 20;
const MAX_COMBATANTS_PER_SIDE = 10;

// Recursos de combate padrão
const DEFAULT_PA = 6;
const DEFAULT_PM = 3;
const DEFAULT_PE = 6;
const DEFAULT_HP = 1000;

// Regeneração
const PE_REGEN_PER_TURN = 2;

// Modificadores de dano
const CRITICAL_BONUS = 0.30;  // +30%
const DODGE_REDUCTION = 0.30;  // -30%

// FPS e Performance
const TARGET_FPS = 30;
const FRAME_TIME = 1000 / TARGET_FPS;
```

---

**Gerado em:** 2026-02-11
**Versão:** 2.0 - Documentação Técnica Consolidada
**Status:** ✅ Completo (Seções 1-11)
**Próxima atualização:** Adicionar seções 12-20

Esta é a documentação técnica mestre para IA. Todas as implementações, estruturas e detalhes estão aqui!

# 🎯 Mecânicas Avançadas de Feitiços

**Data:** 2026-02-11
**Versão:** 1.0

---

## 📋 Índice de Mecânicas

1. [Dano Baseado em HP](#dano-baseado-em-hp)
2. [Ricochete](#ricochete)
3. [Auto-Dano](#auto-dano)
4. [Cooldown Inicial](#cooldown-inicial)
5. [Dano por Repetição](#dano-por-repeticao)
6. [Sistema de Stack/Carga](#sistema-de-stackcarga)
7. [Primeiro Feitiço do Turno](#primeiro-feitico-do-turno)
8. [Mecânica Berserk](#mecanica-berserk)

---

## 1. Dano Baseado em HP

### 🩸 Baseado no HP do Lançador

#### A) Mais dano com HP baixo
**Quanto MENOR o HP, MAIOR o dano**

```javascript
{
    damageScaling: {
        type: 'casterHpLow',
        baseDamage: 100,
        maxBonus: 200  // +200% em 1% HP
    }
}
```

**Fórmula:**
```javascript
// Bônus aumenta conforme HP diminui
bonusPercent = maxBonus * (1 - hpPercent)
danoFinal = baseDamage * (1 + bonusPercent / 100)
```

**Tabela de Dano (Base: 100):**

| HP do Lançador | Bônus | Dano Final | Cálculo |
|----------------|-------|------------|---------|
| 100% | 0% | 100 dmg | 100 × 1.0 |
| 75% | +50% | 150 dmg | 100 × 1.5 |
| 50% | +100% | 200 dmg | 100 × 2.0 |
| 25% | +150% | 250 dmg | 100 × 2.5 |
| 10% | +180% | 280 dmg | 100 × 2.8 |
| **1%** | **+200%** | **300 dmg** | 100 × 3.0 ⭐ |

**Funciona:** ✅ Sim, quanto mais perto de 1%, mais dano!

---

#### B) Mais dano com HP alto
```javascript
{
    damageScaling: {
        type: 'casterHpHigh',
        baseDamage: 120,
        maxBonus: 100,  // +100% em 100% HP
        formula: '120 * (1 + casterHpPercent)'
    }
}
```

**Exemplo:**
- 100% HP → 240 dmg (+100%)
- 50% HP → 180 dmg (+50%)
- 25% HP → 150 dmg (+25%)

---

#### C) Sweet Spot (Máximo em 50% HP) - **Berserk**
```javascript
{
    damageScaling: {
        type: 'casterHpBerserk',
        baseDamage: 150,
        maxBonus: 100,  // +100% em 50% HP
        sweetSpot: 50,
        formula: '150 * (1 + (1 - abs(casterHpPercent - 0.5) * 2))'
    }
}
```

**Exemplo:**
- 100% HP → 150 dmg (0% bônus)
- **50% HP → 300 dmg (+100% bônus)** ⭐
- 25% HP → 200 dmg (+33% bônus)
- 1% HP → 150 dmg (0% bônus)

---

### 🎯 Baseado no HP do Alvo

#### A) Execute (Mais dano em HP baixo)
```javascript
{
    damageScaling: {
        type: 'targetHpLow',
        baseDamage: 80,
        maxBonus: 150,  // +150% em 1% HP
        formula: '80 + (80 * 1.5 * (1 - targetHpPercent))'
    }
}
```

---

#### B) Assassinate (Mais dano em HP alto do alvo)
**Quanto MAIOR o HP do alvo, MAIOR o dano**

```javascript
{
    damageScaling: {
        type: 'targetHpHigh',
        baseDamage: 100,
        maxBonus: 80  // +80% em 100% HP
    }
}
```

**Fórmula:**
```javascript
// Bônus aumenta conforme HP do ALVO aumenta
bonusPercent = maxBonus * targetHpPercent
danoFinal = baseDamage * (1 + bonusPercent / 100)
```

**Tabela de Dano (Base: 100):**

| HP do Alvo | Bônus | Dano Final | Cálculo |
|------------|-------|------------|---------|
| **100%** | **+80%** | **180 dmg** | 100 × 1.8 ⭐ |
| **99%** | +79.2% | 179 dmg | 100 × 1.792 |
| 75% | +60% | 160 dmg | 100 × 1.6 |
| 50% | +40% | 140 dmg | 100 × 1.4 |
| 25% | +20% | 120 dmg | 100 × 1.2 |
| 10% | +8% | 108 dmg | 100 × 1.08 |
| 1% | +0.8% | 101 dmg | 100 × 1.008 |

**Funciona:** ✅ Sim, em 99% HP já dá menos dano que em 100%!

**Uso:** Ideal para abrir combate (primeiro ataque no inimigo full HP)

---

#### C) Cura escalada por HP baixo
```javascript
{
    healScaling: {
        type: 'targetHpLow',
        baseHeal: 80,
        maxBonus: 120,  // +120% em 1% HP
        formula: '80 + (80 * 1.2 * (1 - targetHpPercent))'
    }
}
```

**Exemplo:**
- Alvo em 100% HP → Cura 80 HP
- Alvo em 50% HP → Cura 128 HP
- Alvo em 10% HP → Cura 166 HP
- Alvo em 1% HP → Cura 176 HP

---

## 2. Ricochete

**Nova Mecânica:** Feitiço de alvo único que salta para outros alvos próximos.

```javascript
{
    id: 'feitico_ricochete',
    name: 'Raio Cadente',
    damage: 120,
    ricochete: {
        enabled: true,
        maxBounces: 3,           // Máximo 3 ricochetes (4 alvos no total)
        range: 3,                // Busca alvos em 3 células do anterior
        damageDecay: 0.7,        // 70% do dano anterior em cada ricochete
        requiresLoS: true,       // Requer linha de visão entre alvos
        targetPriority: 'closest' // Sempre o mais próximo
    }
}
```

**Exemplo:**
- **Alvo 1:** 120 dmg
- **Alvo 2 (ricochete 1):** 84 dmg (70% de 120)
- **Alvo 3 (ricochete 2):** 59 dmg (70% de 84)
- **Alvo 4 (ricochete 3):** 41 dmg (70% de 59)

**Total:** 304 dmg distribuído em 4 alvos

---

### Variações de Ricochete:

#### A) Ricochete Crescente
```javascript
ricochete: {
    enabled: true,
    maxBounces: 2,
    range: 3,
    damageDecay: 1.2,  // +20% a cada ricochete
    requiresLoS: true
}
```

**Exemplo:**
- Alvo 1: 100 dmg
- Alvo 2: 120 dmg (+20%)
- Alvo 3: 144 dmg (+20%)

---

#### B) Ricochete Aliado (Cura)
```javascript
ricochete: {
    enabled: true,
    maxBounces: 4,
    range: 4,
    damageDecay: 0.8,  // 80% em cada salto
    targetType: 'ally',
    requiresLoS: false
}
```

---

## 3. Auto-Dano

Feitiços que causam dano ao próprio lançador como custo/trade-off.

```javascript
{
    id: 'furia_sangrenta',
    name: 'Fúria Sangrenta',
    damage: 250,
    selfDamage: {
        enabled: true,
        type: 'fixed',      // 'fixed', 'percent', 'percentOfDamage'
        amount: 30          // Perde 30 HP ao usar
    }
}
```

### Tipos de Auto-Dano:

#### A) Fixo
```javascript
selfDamage: { type: 'fixed', amount: 50 }  // Sempre perde 50 HP
```

#### B) Percentual do HP máximo
```javascript
selfDamage: { type: 'percent', amount: 10 }  // Perde 10% do HP máximo
```

#### C) Percentual do dano causado
```javascript
selfDamage: { type: 'percentOfDamage', amount: 15 }  // Perde 15% do dano causado
```

**Exemplo:** Se causar 200 dmg, perde 30 HP (15% de 200)

---

## 4. Cooldown Inicial

Feitiços muito fortes começam com cooldown ativo (não podem ser usados imediatamente).

```javascript
{
    id: 'devastacao',
    name: 'Devastação',
    damage: 400,
    cooldown: 4,
    initialCooldown: 2  // Não pode ser usado nos primeiros 2 turnos
}
```

**Uso:**
- **Turno 1:** ❌ Indisponível (CD inicial)
- **Turno 2:** ❌ Indisponível (CD inicial)
- **Turno 3:** ✅ Disponível pela primeira vez
- **Turno 7:** ✅ Disponível novamente (após CD normal de 4 turnos)

---

## 5. Dano por Repetição

Feitiços que causam menos dano se atacarem o mesmo alvo várias vezes no mesmo turno.

```javascript
{
    id: 'rajada_multipla',
    name: 'Rajada Múltipla',
    damage: 100,
    repeatPenalty: {
        enabled: true,
        decay: 0.5  // 50% de redução por repetição no mesmo alvo
    }
}
```

**Exemplo (atacando mesmo alvo 3x no mesmo turno):**
- **1º ataque:** 100 dmg
- **2º ataque:** 50 dmg (-50%)
- **3º ataque:** 25 dmg (-50% do anterior)

**Total:** 175 dmg (ao invés de 300)

---

## 6. Sistema de Stack/Carga

Feitiços que acumulam poder ao não serem usados, mas perdem o bônus se não forem usados no turno certo.

```javascript
{
    id: 'golpe_carregado',
    name: 'Golpe Carregado',
    damage: 120,
    chargeSystem: {
        enabled: true,
        chargeTime: 3,       // Carrega após 3 turnos sem usar
        bonusDamage: 1.5,    // +50% de dano quando carregado
        expireTime: 1,       // Perde carga se não usar em 1 turno
        visual: '⚡'          // Indicador visual quando carregado
    }
}
```

**Fluxo:**
- **Turno 1:** Não usa → Stack 1/3
- **Turno 2:** Não usa → Stack 2/3
- **Turno 3:** Não usa → Stack 3/3 → ⚡ **CARREGADO!** (180 dmg disponível)
- **Turno 4:**
  - Se usar: 180 dmg (120 × 1.5) ✅
  - Se não usar: Perde carga → Volta para 0/3 ❌

---

## 7. Primeiro Feitiço do Turno

Bônus se for o primeiro feitiço usado no turno do jogador.

```javascript
{
    id: 'abertura_letal',
    name: 'Abertura Letal',
    damage: 130,
    firstSpellBonus: {
        enabled: true,
        bonusDamage: 0.3,  // +30% se for primeiro feitiço
        bonusType: 'damage' // 'damage', 'range', 'aoe', 'cost'
    }
}
```

**Exemplo:**
- **Primeiro feitiço do turno:** 169 dmg (130 × 1.3)
- **Segundo feitiço ou mais:** 130 dmg (normal)

### Variações:

#### A) Redução de custo
```javascript
firstSpellBonus: {
    enabled: true,
    bonusType: 'cost',
    costReduction: 2  // -2 PA se for primeiro feitiço
}
```

#### B) Aumento de alcance
```javascript
firstSpellBonus: {
    enabled: true,
    bonusType: 'range',
    rangeBonus: 3  // +3 células de alcance se for primeiro feitiço
}
```

---

## 8. Mecânica Berserk

**IMPORTANTE:** Ativa quando HP ≤ 50%

### Como Funciona

1. **Feitiço causa dano base** (com TODOS os cálculos normais)
2. **SE HP ≤ 50%** → Aplica bônus Berserk adicional
3. **Bônus máximo em 50% HP** (não em 1% ou 100%)

```javascript
{
    id: 'feitico_berserker',
    damage: 180,
    berserk: true,  // Flag: este feitiço é afetado por Berserk

    // Fórmula:
    // Dano Final = Dano Base × (1 + BerserkBonus)
    // BerserkBonus = 0 se HP > 50%
    // BerserkBonus = 1.0 (100%) em exatamente 50% HP
    // BerserkBonus diminui conforme se afasta de 50%
}
```

### Tabela de Dano (Feitiço Berserk: 180 base)

| HP do Lançador | Berserk Ativo? | Bônus | Dano Final |
|----------------|----------------|-------|------------|
| 100% | ❌ Não | 0% | 180 dmg |
| 75% | ❌ Não | 0% | 180 dmg |
| **50%** | ✅ Sim | **+100%** | **360 dmg** ⭐ |
| 40% | ✅ Sim | +80% | 324 dmg |
| 30% | ✅ Sim | +60% | 288 dmg |
| 20% | ✅ Sim | +40% | 252 dmg |
| 10% | ✅ Sim | +20% | 216 dmg |
| 1% | ✅ Sim | +2% | 184 dmg |

### Fórmula Exata

```javascript
function calcularBerserkBonus(hpPercent) {
    // Só ativa se HP <= 50%
    if (hpPercent > 50) {
        return 0;
    }

    // Bônus máximo (100%) em exatamente 50% HP
    // Diminui linearmente conforme se afasta de 50%
    const distanciaDe50 = Math.abs(hpPercent - 50);
    const bonusPercent = 100 - (distanciaDe50 * 2);

    return Math.max(0, bonusPercent) / 100;
}

// Exemplo de cálculo de dano:
let danoBase = 180;
let hpPercent = 50;  // 50% HP

// Aplica berserk se feitiço tiver a flag
if (spell.berserk && hpPercent <= 50) {
    const berserkBonus = calcularBerserkBonus(hpPercent);
    danoBase *= (1 + berserkBonus);
    // Em 50% HP: 180 × (1 + 1.0) = 360 dmg
}
```

**Gráfico de Dano:**
```
Dano Bônus (Ativa APENAS se HP ≤ 50%)
   100% |
        |        HP > 50%: SEM BÔNUS
    50% |        ╱╲       (dano normal)
        |       ╱  ╲
     0% |______╱____╲____
         0%   25% 50% 75% 100%
              HP do Lançador
                 ↑
            MÁXIMO AQUI
```

---

## 9. Triggers de Morte (On Kill)

Efeitos que ativam ao matar um inimigo.

```javascript
{
    id: 'colheita_alma',
    name: 'Colheita de Almas',
    damage: 140,
    onKill: {
        enabled: true,
        effects: [
            { type: 'stealPA', amount: 1 },
            { type: 'stealPM', amount: 2 },
            { type: 'heal', amount: 50 },
            { type: 'shield', amount: 30, duration: 1 }
        ]
    }
}
```

### Tipos de Efeitos On Kill:

#### A) Roubo de PA
```javascript
onKill: {
    enabled: true,
    effects: [{ type: 'stealPA', amount: 1 }]  // +1 PA ao matar
}
```

---

#### B) Roubo de PM
```javascript
onKill: {
    enabled: true,
    effects: [{ type: 'stealPM', amount: 2 }]  // +2 PM ao matar
}
```

---

#### C) Recuperação de HP
```javascript
onKill: {
    enabled: true,
    effects: [{ type: 'heal', amount: 80 }]  // +80 HP ao matar
}
```

---

#### D) Ganho de Shield
```javascript
onKill: {
    enabled: true,
    effects: [{ type: 'shield', amount: 50, duration: 2 }]  // +50 shield por 2 turnos
}
```

---

#### E) Ganho de Armor
```javascript
onKill: {
    enabled: true,
    effects: [{ type: 'armor', amount: 30, duration: 1 }]  // +30 armor por 1 turno
}
```

---

#### F) Múltiplos Efeitos
```javascript
onKill: {
    enabled: true,
    effects: [
        { type: 'stealPA', amount: 1 },
        { type: 'heal', amount: 50 },
        { type: 'armor', amount: 20, duration: 1 }
    ]
}
```

---

## 10. Triggers de Dano Recebido (On Hit Taken)

Efeitos que ativam ao sofrer dano.

```javascript
{
    id: 'passivo_contragolpe',
    name: 'Contragolpe',
    category: 'passiveUniversal',
    onHitTaken: {
        enabled: true,
        minDamage: 50,  // Só ativa se dano >= 50
        effects: [
            { type: 'block', amount: 5, duration: 1 },
            { type: 'shield', amount: 20, duration: 1 }
        ],
        cooldown: 2  // Só ativa a cada 2 turnos
    }
}
```

### Tipos de Efeitos On Hit Taken:

#### A) Ganho de Parada (Block)
```javascript
onHitTaken: {
    enabled: true,
    minDamage: 30,
    effects: [{ type: 'block', amount: 10, duration: 1 }]  // +10% block por 1 turno
}
```

---

#### B) Ganho de Shield
```javascript
onHitTaken: {
    enabled: true,
    minDamage: 50,
    effects: [{ type: 'shield', amount: 40, duration: 1 }]  // +40 shield por 1 turno
}
```

---

#### C) Ganho de Resistência
```javascript
onHitTaken: {
    enabled: true,
    minDamage: 60,
    effects: [{ type: 'resistance', element: 'general', amount: 10, duration: 1 }]  // +10 res_general por 1 turno
}
```

---

#### D) Ganho de Armor
```javascript
onHitTaken: {
    enabled: true,
    minDamage: 40,
    effects: [{ type: 'armor', amount: 25, duration: 2 }]  // +25 armor por 2 turnos
}
```

---

#### E) Reflexo de Dano
```javascript
onHitTaken: {
    enabled: true,
    minDamage: 20,
    effects: [{ type: 'reflect', percent: 15 }]  // Reflete 15% do dano recebido
}
```

---

#### F) Cura Reativa
```javascript
onHitTaken: {
    enabled: true,
    minDamage: 100,
    effects: [{ type: 'heal', amount: 30 }]  // Cura 30 HP ao sofrer dano alto
}
```

---

## 11. Triggers de Parada (On Block)

Efeitos que ativam ao realizar uma parada (bloquear/reduzir dano).

```javascript
{
    id: 'passivo_defensor_nato',
    name: 'Defensor Nato',
    category: 'passiveUniversal',
    onBlock: {
        enabled: true,
        minDamageBlocked: 20,  // Precisa bloquear pelo menos 20 dmg
        effects: [
            { type: 'armor', amount: 15, duration: 1 },
            { type: 'damageBonus', amount: 8, duration: 1 }
        ]
    }
}
```

### Tipos de Efeitos On Block:

#### A) Ganho de Armor
```javascript
onBlock: {
    enabled: true,
    minDamageBlocked: 15,
    effects: [{ type: 'armor', amount: 20, duration: 1 }]  // +20 armor por 1 turno
}
```

---

#### B) Ganho de Dano
```javascript
onBlock: {
    enabled: true,
    minDamageBlocked: 25,
    effects: [{ type: 'damageBonus', amount: 10, duration: 1 }]  // +10% dano por 1 turno
}
```

---

#### C) Ganho de Crítico
```javascript
onBlock: {
    enabled: true,
    minDamageBlocked: 30,
    effects: [{ type: 'critical', amount: 15, duration: 1 }]  // +15% crítico por 1 turno
}
```

---

#### D) Ganho de PA
```javascript
onBlock: {
    enabled: true,
    minDamageBlocked: 40,
    effects: [{ type: 'gainPA', amount: 1 }]  // +1 PA imediatamente
}
```

---

#### E) Ganho de Shield
```javascript
onBlock: {
    enabled: true,
    minDamageBlocked: 20,
    effects: [{ type: 'shield', amount: 30, duration: 1 }]  // +30 shield por 1 turno
}
```

---

#### F) Múltiplos Efeitos
```javascript
onBlock: {
    enabled: true,
    minDamageBlocked: 25,
    effects: [
        { type: 'armor', amount: 15, duration: 1 },
        { type: 'damageBonus', amount: 8, duration: 1 },
        { type: 'shield', amount: 25, duration: 1 }
    ]
}
```

---

## 12. Status: Estabilizado

Impede que o alvo seja movido (empurrado, puxado, teleportado).

```javascript
{
    id: 'buff_estabilizado',
    name: 'Estabilizado',
    type: 'status',
    duration: 2,  // turnos
    effects: {
        immuneToMovement: true,  // Imune a empurrão/puxão/teleporte forçado
        immuneToPush: true,
        immuneToPull: true,
        immuneToTeleport: true
    }
}
```

**Como Funciona:**
- Guardião tem feitiços que aplicam Estabilizado em si ou aliados
- Enquanto ativo, **nada pode mover o alvo**
- Movimento voluntário (PM) ainda funciona
- Feitiços de troca de posição são bloqueados

---

## 13. Status: Ensaboado

Permite mover-se ignorando bloqueio de inimigos adjacentes.

```javascript
{
    id: 'buff_ensaboado',
    name: 'Ensaboado',
    type: 'status',
    duration: 2,  // turnos
    effects: {
        ignoreBlock: true,  // Ignora bloqueio ao se mover
        movementFree: true  // Movimento livre, sem penalidade
    }
}
```

**Como Funciona:**
- Feitiços podem aplicar status "Ensaboado"
- Enquanto ativo, você **se move ignorando bloqueio**
- Inimigos adjacentes não impedem movimento
- Ideal para escapar de cercos

**Diferença do Rolamento Tático:**
- **Rolamento:** Movimento único (2 células) que ignora bloqueio
- **Ensaboado:** Status temporário (2 turnos) que deixa TODO movimento livre

---

## 14. Feitiço: Troca de Posição

Troca de lugar com alvo (aliado ou inimigo).

```javascript
{
    id: 'troca_posicao',
    name: 'Troca de Posição',
    range: { min: 2, max: 6 },
    cost: { pa: 4 },
    cooldown: 2,

    effect: {
        type: 'swapPosition',
        checkEstabilizado: true,  // Falha se alvo tiver Estabilizado
        targetType: 'any'  // Pode trocar com inimigo ou aliado
    }
}
```

**Mecânica:**
1. Escolhe alvo (range 2-6)
2. **Verifica se alvo tem "Estabilizado"** → Se sim, feitiço falha
3. Se não, troca posição instantaneamente
4. Útil para:
   - Puxar aliados para segurança
   - Entrar no meio da luta trocando com inimigo
   - Reposicionamento tático

---

## 🔧 Implementação no Código

### Estrutura Base de Feitiço Avançado:

```javascript
{
    id: 'exemplo_feitico_complexo',
    catalogId: '9999SPELL001',
    name: 'Exemplo de Feitiço Complexo',
    icon: '⚔️',
    iconColor: '#ff4444',
    category: 'spell',
    element: 'fire',

    // Stats básicos
    damage: 150,
    range: { min: 2, max: 6 },
    aoe: { type: 'cross', size: 1 },
    cost: { pa: 5, pm: 0, pe: 0 },
    cooldown: 3,

    // Mecânicas avançadas
    damageScaling: {
        type: 'casterHpBerserk',
        maxBonus: 100,
        sweetSpot: 50
    },

    ricochete: {
        enabled: true,
        maxBounces: 2,
        range: 3,
        damageDecay: 0.7,
        requiresLoS: true
    },

    selfDamage: {
        enabled: true,
        type: 'percent',
        amount: 5
    },

    firstSpellBonus: {
        enabled: true,
        bonusDamage: 0.2,
        bonusType: 'damage'
    },

    chargeSystem: {
        enabled: false
    },

    repeatPenalty: {
        enabled: true,
        decay: 0.6
    },

    initialCooldown: 0,

    description: 'Feitiço com múltiplas mecânicas avançadas'
}
```

---

## 📊 Tabela de Compatibilidade

| Mecânica | Dano | Cura | Buff | Debuff |
|----------|------|------|------|--------|
| HP Scaling | ✅ | ✅ | ✅ | ✅ |
| Ricochete | ✅ | ✅ | ❌ | ❌ |
| Auto-Dano | ✅ | ✅ | ✅ | ✅ |
| CD Inicial | ✅ | ✅ | ✅ | ✅ |
| Repetição | ✅ | ❌ | ❌ | ❌ |
| Stack/Carga | ✅ | ✅ | ✅ | ✅ |
| 1º Feitiço | ✅ | ✅ | ✅ | ✅ |
| Berserk | ✅ | ❌ | ❌ | ❌ |

---

## 🎯 Exemplos Práticos

### Exemplo 1: Feitiço Berserker Puro
```javascript
{
    id: 'furia_mortal',
    name: 'Fúria Mortal',
    damage: 200,
    damageScaling: { type: 'casterHpLow', maxBonus: 300 },
    selfDamage: { type: 'percent', amount: 8 },
    cost: { pa: 6 }
}
```
**Em 1% HP:** 800 dmg (+300%), mas perde 8% HP

---

### Exemplo 2: Ricochete Crescente
```javascript
{
    id: 'raio_corrente',
    name: 'Raio em Corrente',
    damage: 90,
    ricochete: {
        enabled: true,
        maxBounces: 4,
        range: 4,
        damageDecay: 1.1  // +10% cada ricochete
    }
}
```
**Dano total:** 90 → 99 → 109 → 120 → 132 = **550 dmg** em 5 alvos

---

### Exemplo 3: Stack Carregado
```javascript
{
    id: 'martelo_carregado',
    name: 'Martelo dos Titãs',
    damage: 180,
    chargeSystem: {
        enabled: true,
        chargeTime: 2,
        bonusDamage: 2.0  // +100% quando carregado
    }
}
```
**Sem carga:** 180 dmg
**Com carga:** 360 dmg

---

## 🔄 Changelog

### 2026-02-11 - v1.0
- Criação do documento
- Definição de 8 mecânicas avançadas
- Exemplos práticos e implementação

---

**Mantenha este documento atualizado ao adicionar novas mecânicas!**

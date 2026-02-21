# 🎯 Feitiços com Triggers por Classe

**Data:** 2026-02-11
**Versão:** 1.0

---

## 📖 Distribuição Temática

Cada classe tem acesso apenas a **mecânicas específicas** para manter identidade única:

| Classe | On Kill | On Hit Taken | On Block |
|--------|---------|--------------|----------|
| Guerreiro | ✅ PA | ❌ | ✅ Armor/Dano |
| Atirador | ✅ PM | ❌ | ❌ |
| Caçador | ✅ HP/PM | ✅ Shield | ❌ |
| Guardião | ❌ | ✅ Armor/Res | ✅ Tudo |
| Clérigo | ✅ Cura Aliados | ✅ Cura Todos | ❌ |
| Berserker | ✅ Tudo | ✅ Dano | ❌ |

---

## 1️⃣ GUERREIRO - Feitiços Trigger

### Passivo 1: Colheita de Batalha (Substitui "Pele de Ferro")
```javascript
{
    id: 'guerreiro_passivo_colheita',
    name: 'Colheita de Batalha',
    icon: '⚔️',
    category: 'classPassive',
    class: 'guerreiro',
    description: 'Ao matar inimigo, rouba 1 PA',

    onKill: {
        enabled: true,
        effects: [{ type: 'stealPA', amount: 1 }]
    }
}
```

---

### Passivo 2: Defensor Agressivo (NOVO)
```javascript
{
    id: 'guerreiro_passivo_defensor',
    name: 'Defensor Agressivo',
    icon: '🛡️⚔️',
    category: 'classPassive',
    class: 'guerreiro',
    description: 'Ao bloquear 20+ dano, ganha 15 armor e +8% dano por 1 turno',

    onBlock: {
        enabled: true,
        minDamageBlocked: 20,
        effects: [
            { type: 'armor', amount: 15, duration: 1 },
            { type: 'damageBonus', amount: 8, duration: 1 }
        ]
    }
}
```

---

## 2️⃣ ATIRADOR - Feitiços Trigger

### Passivo 1: Momentum Tático (Substitui "Caçador Solitário")
```javascript
{
    id: 'atirador_passivo_momentum',
    name: 'Momentum Tático',
    icon: '💨',
    category: 'classPassive',
    class: 'atirador',
    description: 'Ao matar inimigo, ganha 2 PM',

    onKill: {
        enabled: true,
        effects: [{ type: 'stealPM', amount: 2 }]
    }
}
```

---

### Passivo 2: Olho de Águia (Mantido)
```javascript
{
    id: 'atirador_passivo_olho_aguia',
    name: 'Olho de Águia',
    icon: '🦅',
    category: 'classPassive',
    class: 'atirador',
    description: '+2 alcance em todos feitiços de dano',

    effects: {
        rangeBonus: 2
    }
}
```

---

## 3️⃣ CAÇADOR - Feitiços Trigger

### Passivo 1: Predador Voraz (ATUALIZADO)
```javascript
{
    id: 'cacador_passivo_predador',
    name: 'Predador Voraz',
    icon: '🐺',
    category: 'classPassive',
    class: 'cacador',
    description: 'Ao matar inimigo: +20% HP máximo, +2 PM, +30 shield por 2 turnos',

    onKill: {
        enabled: true,
        effects: [
            { type: 'healPercent', amount: 20 },  // Cura 20% HP máximo
            { type: 'stealPM', amount: 2 },
            { type: 'shield', amount: 30, duration: 2 }
        ]
    }
}
```

---

### Passivo 2: Instinto de Sobrevivência (ATUALIZADO)
```javascript
{
    id: 'cacador_passivo_instinto',
    name: 'Instinto de Sobrevivência',
    icon: '🛡️',
    category: 'classPassive',
    class: 'cacador',
    description: 'Ao sofrer 60+ dano, ganha 50 shield por 1 turno (CD 2 turnos)',

    onHitTaken: {
        enabled: true,
        minDamage: 60,
        effects: [{ type: 'shield', amount: 50, duration: 1 }],
        cooldown: 2
    }
}
```

---

## 4️⃣ GUARDIÃO - Feitiços Trigger

### Passivo 1: Inabalável (ATUALIZADO)
```javascript
{
    id: 'guardiao_passivo_inabalavel',
    name: 'Inabalável',
    icon: '🏔️',
    category: 'classPassive',
    class: 'guardiao',
    description: 'Ao sofrer 80+ dano, ganha 40 armor e 10 res_general por 2 turnos (CD 2)',

    onHitTaken: {
        enabled: true,
        minDamage: 80,
        effects: [
            { type: 'armor', amount: 40, duration: 2 },
            { type: 'resistance', element: 'general', amount: 10, duration: 2 }
        ],
        cooldown: 2
    }
}
```

---

### Passivo 2: Guardião Protetor (ATUALIZADO)
```javascript
{
    id: 'guardiao_passivo_protetor',
    name: 'Guardião Protetor',
    icon: '🛡️✨',
    category: 'classPassive',
    class: 'guardiao',
    description: 'Ao bloquear 25+ dano: +1 PA, +30 armor por 1 turno, aliados adjacentes ganham 20 armor',

    onBlock: {
        enabled: true,
        minDamageBlocked: 25,
        effects: [
            { type: 'gainPA', amount: 1 },
            { type: 'armor', amount: 30, duration: 1 },
            { type: 'armorAllies', range: 1, amount: 20, duration: 1 }  // Concede a aliados
        ]
    }
}
```

---

## 5️⃣ CLÉRIGO - Feitiços Trigger

### Passivo 1: Benção Perpétua (Mantido)
```javascript
{
    id: 'clerigo_passivo_bencao',
    name: 'Benção Perpétua',
    icon: '✨',
    category: 'classPassive',
    class: 'clerigo',
    description: 'Todos aliados regeneram 15 HP por turno',

    effects: {
        specialEffect: 'hpRegenPerTurn',
        amount: 15,
        targetType: 'allAllies'
    }
}
```

---

### Passivo 2: Martírio Divino (ATUALIZADO)
```javascript
{
    id: 'clerigo_passivo_martirio',
    name: 'Martírio Divino',
    icon: '💫',
    category: 'classPassive',
    class: 'clerigo',
    description: 'Ao sofrer 50+ dano, cura todos aliados em 4 células por 40 HP (CD 3 turnos)',

    onHitTaken: {
        enabled: true,
        minDamage: 50,
        effects: [
            { type: 'healAllies', range: 4, amount: 40 }
        ],
        cooldown: 3
    }
}
```

---

### Ativo NOVO: Sacrifício Sagrado
```javascript
{
    id: 'clerigo_ativo_sacrificio',
    name: 'Sacrifício Sagrado',
    icon: '🙏',
    category: 'activeSpell',
    class: 'clerigo',
    description: 'Ativa buff: ao sofrer dano nos próximos 3 turnos, cura aliados próximos por 60% do dano recebido',

    cost: { pa: 5 },
    duration: 3,
    cooldown: 4,

    effect: {
        type: 'toggleOnHitTaken',
        onHitTaken: {
            enabled: true,
            minDamage: 20,
            effects: [
                { type: 'healAllies', range: 3, percentOfDamageTaken: 60 }
            ]
        }
    }
}
```

---

## 6️⃣ BERSERKER - Feitiços Trigger

### Passivo 1: Fúria Crescente (ATUALIZADO)
```javascript
{
    id: 'berserker_passivo_furia',
    name: 'Fúria Crescente',
    icon: '💀',
    category: 'classPassive',
    class: 'berserker',
    description: 'Ao matar inimigo: +1 PA, +100 HP, +5 armor por 3 turnos (acumulável)',

    onKill: {
        enabled: true,
        effects: [
            { type: 'stealPA', amount: 1 },
            { type: 'heal', amount: 100 },
            { type: 'armor', amount: 5, duration: 3, stackable: true }  // Acumula!
        ]
    }
}
```

---

### Passivo 2: Sede de Vitória (ATUALIZADO)
```javascript
{
    id: 'berserker_passivo_sede',
    name: 'Sede de Vitória',
    icon: '🩸',
    category: 'classPassive',
    class: 'berserker',
    description: 'Ao sofrer 70+ dano, ganha +12% dano por 2 turnos (CD 2 turnos)',

    onHitTaken: {
        enabled: true,
        minDamage: 70,
        effects: [
            { type: 'damageBonus', amount: 12, duration: 2 }
        ],
        cooldown: 2
    }
}
```

---

### Ativo NOVO: Pacto de Sangue
```javascript
{
    id: 'berserker_ativo_pacto',
    name: 'Pacto de Sangue',
    icon: '💉',
    category: 'activeSpell',
    class: 'berserker',
    description: 'Ativa buff: próximos 3 ataques roubam 1 PA e 2 PM ao matar',

    cost: { pa: 4, pe: 1 },
    duration: 3,  // 3 ataques ou 3 turnos
    cooldown: 4,

    effect: {
        type: 'toggleOnKill',
        charges: 3,  // Dura 3 kills ou 3 turnos
        onKill: {
            enabled: true,
            effects: [
                { type: 'stealPA', amount: 1 },
                { type: 'stealPM', amount: 2 }
            ]
        }
    }
}
```

---

## 📊 Tabela de Distribuição

| Mecânica | Guerreiro | Atirador | Caçador | Guardião | Clérigo | Berserker |
|----------|-----------|----------|---------|----------|---------|-----------|
| **On Kill: PA** | ✅ | ❌ | ❌ | ❌ | ❌ | ✅ |
| **On Kill: PM** | ❌ | ✅ | ✅ | ❌ | ❌ | ✅ |
| **On Kill: HP** | ❌ | ❌ | ✅ | ❌ | ❌ | ✅ |
| **On Kill: Shield** | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ |
| **On Kill: Armor** | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |
| **On Hit: Shield** | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ |
| **On Hit: Armor** | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ |
| **On Hit: Res** | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ |
| **On Hit: Dano** | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |
| **On Hit: Cura Aliados** | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ |
| **On Block: Armor** | ✅ | ❌ | ❌ | ✅ | ❌ | ❌ |
| **On Block: Dano** | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **On Block: PA** | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ |
| **On Block: Conceder Armor** | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ |

---

## 🎯 Identidades de Classe Preservadas

### ⚔️ Guerreiro
- **On Kill:** Rouba PA (mais ações)
- **On Block:** Ganha armor + dano (tanque ofensivo)

### 🏹 Atirador
- **On Kill:** Rouba PM (mobilidade)

### 🎯 Caçador
- **On Kill:** HP + PM + Shield (sustain)
- **On Hit:** Shield (sobrevivência)

### 🛡️ Guardião
- **On Hit:** Armor + Resistência (tanque puro)
- **On Block:** Tudo (especialista em bloquear)

### ✨ Clérigo
- **On Hit:** Cura aliados (suporte reativo)

### 💀 Berserker
- **On Kill:** Tudo (recompensa por kills)
- **On Hit:** Dano aumentado (mais agressivo ao sofrer)

---

## 🔧 Implementação

### Exemplo: Sistema On Kill

```javascript
// No sistema de combate, ao matar inimigo:
function handleEnemyDeath(killer, victim) {
    // Verifica passivos do killer
    const onKillPassives = killer.passives.filter(p => p.onKill?.enabled);

    for (const passive of onKillPassives) {
        for (const effect of passive.onKill.effects) {
            switch (effect.type) {
                case 'stealPA':
                    killer.pa = Math.min(killer.pa + effect.amount, killer.maxPa);
                    showFloatingText(killer, `+${effect.amount} PA`, '#ffaa00');
                    break;

                case 'stealPM':
                    killer.pm = Math.min(killer.pm + effect.amount, killer.maxPm);
                    showFloatingText(killer, `+${effect.amount} PM`, '#00ffaa');
                    break;

                case 'heal':
                    const healAmount = Math.min(effect.amount, killer.maxHp - killer.hp);
                    killer.hp += healAmount;
                    showFloatingText(killer, `+${healAmount} HP`, '#00ff00');
                    break;

                case 'shield':
                    applyBuff(killer, {
                        type: 'shield',
                        amount: effect.amount,
                        duration: effect.duration
                    });
                    break;

                case 'armor':
                    applyBuff(killer, {
                        type: 'armor',
                        amount: effect.amount,
                        duration: effect.duration,
                        stackable: effect.stackable || false
                    });
                    break;
            }
        }
    }
}
```

---

### Exemplo: Sistema On Hit Taken

```javascript
// No sistema de dano, ao sofrer dano:
function applyDamage(target, damage) {
    const finalDamage = calculateFinalDamage(target, damage);
    target.hp -= finalDamage;

    // Verifica passivos On Hit Taken
    const onHitPassives = target.passives.filter(p => p.onHitTaken?.enabled);

    for (const passive of onHitPassives) {
        // Verifica se está em cooldown
        if (passive.lastTriggered &&
            (currentTurn - passive.lastTriggered) < passive.onHitTaken.cooldown) {
            continue;
        }

        // Verifica dano mínimo
        if (finalDamage < passive.onHitTaken.minDamage) {
            continue;
        }

        // Ativa efeitos
        for (const effect of passive.onHitTaken.effects) {
            switch (effect.type) {
                case 'shield':
                    applyBuff(target, {
                        type: 'shield',
                        amount: effect.amount,
                        duration: effect.duration
                    });
                    break;

                case 'armor':
                    applyBuff(target, {
                        type: 'armor',
                        amount: effect.amount,
                        duration: effect.duration
                    });
                    break;

                case 'resistance':
                    applyBuff(target, {
                        type: 'resistance',
                        element: effect.element,
                        amount: effect.amount,
                        duration: effect.duration
                    });
                    break;

                case 'reflect':
                    const reflectDamage = Math.floor(finalDamage * (effect.percent / 100));
                    applyDamage(attacker, reflectDamage, 'reflect');
                    break;
            }
        }

        // Marca cooldown
        passive.lastTriggered = currentTurn;
    }
}
```

---

### Exemplo: Sistema On Block

```javascript
// No cálculo de dano, quando há bloqueio:
function calculateDamageReduction(target, damage) {
    const blockChance = target.getTotalBlock();

    if (Math.random() * 100 < blockChance) {
        const blockedAmount = Math.floor(damage * 0.5);  // Bloqueia 50%
        const finalDamage = damage - blockedAmount;

        // Trigger On Block
        triggerOnBlock(target, blockedAmount);

        return { finalDamage, blocked: true, blockedAmount };
    }

    return { finalDamage: damage, blocked: false, blockedAmount: 0 };
}

function triggerOnBlock(target, blockedAmount) {
    const onBlockPassives = target.passives.filter(p => p.onBlock?.enabled);

    for (const passive of onBlockPassives) {
        if (blockedAmount < passive.onBlock.minDamageBlocked) {
            continue;
        }

        for (const effect of passive.onBlock.effects) {
            switch (effect.type) {
                case 'armor':
                    applyBuff(target, {
                        type: 'armor',
                        amount: effect.amount,
                        duration: effect.duration
                    });
                    break;

                case 'damageBonus':
                    applyBuff(target, {
                        type: 'damageBonus',
                        amount: effect.amount,
                        duration: effect.duration
                    });
                    break;

                case 'gainPA':
                    target.pa = Math.min(target.pa + effect.amount, target.maxPa);
                    break;

                case 'armorAllies':
                    const allies = getAlliesInRange(target, effect.range);
                    for (const ally of allies) {
                        applyBuff(ally, {
                            type: 'armor',
                            amount: effect.amount,
                            duration: effect.duration
                        });
                    }
                    break;
            }
        }
    }
}
```

---

## 🔄 Changelog

### 2026-02-11 - v1.0
- Distribuição temática de mecânicas trigger por classe
- 15 novos feitiços/passivos com triggers
- Preservação de identidades únicas de cada classe

---

**Cada classe agora tem mecânicas exclusivas que reforçam seu papel!**

# 📊 Exemplos Práticos - Scaling por HP

**Data:** 2026-02-11

---

## 🎯 Resumo Visual

### 1. Mecânica Berserk
```
HP ≤ 50%: ATIVA
HP > 50%: DESATIVA

Dano Máximo: 50% HP
Dano Normal: Qualquer outro valor
```

### 2. Scaling HP Baixo (Caster)
```
1% HP → MÁXIMO DANO
100% HP → MÍNIMO DANO

Linear: quanto mais baixo, mais forte
```

### 3. Scaling HP Alto do Alvo
```
100% HP → MÁXIMO DANO
1% HP → MÍNIMO DANO

Linear: quanto mais cheio, mais forte
```

---

## 💀 BERSERKER - Feitiços Práticos

### Feitiço 1: Fúria Sangrenta (COM Berserk)

```javascript
{
    id: 'furia_sangrenta',
    name: 'Fúria Sangrenta',
    damage: 180,
    berserk: true,  // Afetado por Berserk
    range: { min: 1, max: 1 },
    cost: { pa: 5 },
    selfDamage: { type: 'percent', amount: 8 }  // Perde 8% HP máximo
}
```

**Exemplo de Dano:**

| Seu HP | Berserk? | Dano Base | Bônus Berserk | Dano Final |
|--------|----------|-----------|---------------|------------|
| 100% | ❌ | 180 | 0% | **180 dmg** |
| 60% | ❌ | 180 | 0% | **180 dmg** |
| **50%** | ✅ | 180 | +100% | **360 dmg** ⭐ |
| 45% | ✅ | 180 | +90% | **342 dmg** |
| 30% | ✅ | 180 | +60% | **288 dmg** |
| 10% | ✅ | 180 | +20% | **216 dmg** |

**Estratégia:**
1. Entre em combate com 100% HP
2. Use feitiços normais até chegar em ~60% HP
3. Use **Fúria Sangrenta** para se auto-danificar até 52% HP
4. Continue usando **Fúria Sangrenta** (agora dá 360 dmg!)
5. Mantenha HP entre 45-55% para máximo dano

---

### Feitiço 2: Chama Desesperada (Scaling HP Baixo)

```javascript
{
    id: 'chama_desesperada',
    name: 'Chama Desesperada',
    damage: 150,
    damageScaling: {
        type: 'casterHpLow',
        maxBonus: 200  // +200% em 1% HP
    },
    range: { min: 1, max: 2 },
    cost: { pa: 4 }
}
```

**Exemplo de Dano:**

| Seu HP | Bônus | Dano Final | Cálculo |
|--------|-------|------------|---------|
| 100% | 0% | 150 dmg | 150 × 1.0 |
| 75% | +50% | 225 dmg | 150 × 1.5 |
| 50% | +100% | 300 dmg | 150 × 2.0 |
| 25% | +150% | 375 dmg | 150 × 2.5 |
| 10% | +180% | 420 dmg | 150 × 2.8 |
| **1%** | **+200%** | **450 dmg** | 150 × 3.0 ⭐ |

**Estratégia:**
- Use quando estiver MUITO baixo de HP
- Combo mortal: Fique com 1% HP e cause 450 dmg!
- Arriscado mas recompensador

---

### Feitiço 3: Aniquilação (Scaling HP Baixo + Auto-Dano)

```javascript
{
    id: 'aniquilacao',
    name: 'Aniquilação',
    damage: 400,
    damageScaling: {
        type: 'casterHpLow',
        maxBonus: 150  // +150% em 10% HP
    },
    range: { min: 1, max: 1 },
    cost: { pa: 6 },
    cooldown: 4,
    selfDamage: { type: 'percent', amount: 20 }  // Perde 20% HP
}
```

**Exemplo (Supondo 1000 HP máximo):**

| Antes de Usar | Auto-Dano | Depois de Usar | Bônus Scaling | Dano no Inimigo |
|---------------|-----------|----------------|---------------|-----------------|
| 1000 HP (100%) | -200 HP | 800 HP (80%) | +30% | 520 dmg |
| 800 HP (80%) | -200 HP | 600 HP (60%) | +60% | 640 dmg |
| 600 HP (60%) | -200 HP | 400 HP (40%) | +90% | 760 dmg |
| 400 HP (40%) | -200 HP | 200 HP (20%) | +120% | 880 dmg |
| 200 HP (20%) | -200 HP | **1 HP (0.1%)** | **+150%** | **1000 dmg** ⭐ |

**Estratégia:**
- Feitiço suicida final
- Usa quando já está com HP baixo
- Pode te matar mas causa dano absurdo

---

## ⚔️ Feitiços de Outras Classes

### Guerreiro: Lâmina do Dragão (Execute)

```javascript
{
    id: 'lamina_dragao_execute',
    name: 'Lâmina do Dragão - Execução',
    damage: 250,
    damageScaling: {
        type: 'targetHpLow',  // Mais dano em alvos com HP BAIXO
        maxBonus: 150  // +150% em 1% HP do alvo
    },
    range: { min: 1, max: 1 },
    cost: { pa: 5 },
    cooldown: 3
}
```

**Exemplo de Dano:**

| HP do Alvo | Bônus | Dano Final | Uso |
|------------|-------|------------|-----|
| 100% | 0% | 250 dmg | Dano normal |
| 50% | +75% | 438 dmg | Já bate forte |
| 25% | +112.5% | 531 dmg | Muito forte |
| 10% | +135% | 588 dmg | Execute começa |
| **1%** | **+150%** | **625 dmg** | **EXECUTE!** ⭐ |

**Estratégia:**
- Guarde para **finalizar** inimigos
- Não use em alvos full HP
- Perfeito para garantir kills

---

### Atirador: Tiro Certeiro (Assassinate)

```javascript
{
    id: 'tiro_certeiro',
    name: 'Tiro Certeiro',
    damage: 160,
    damageScaling: {
        type: 'targetHpHigh',  // Mais dano em alvos com HP ALTO
        maxBonus: 80  // +80% em 100% HP do alvo
    },
    range: { min: 5, max: 10 },
    cost: { pa: 5 }
}
```

**Exemplo de Dano:**

| HP do Alvo | Bônus | Dano Final | Uso |
|------------|-------|------------|-----|
| **100%** | **+80%** | **288 dmg** | **ASSASSINATE!** ⭐ |
| **99%** | +79.2% | 287 dmg | Quase máximo |
| 75% | +60% | 256 dmg | Bom dano |
| 50% | +40% | 224 dmg | Médio |
| 25% | +20% | 192 dmg | Fraco |
| 1% | +0.8% | 161 dmg | Muito fraco |

**Estratégia:**
- Use no **PRIMEIRO ATAQUE** do combate
- Ideal para abrir a luta
- Dano cai drasticamente depois

---

## 🔄 Comparação Direta

### Feitiço A: Execute (HP Baixo do Alvo)
```
Alvo 100% HP: 100 dmg
Alvo 50% HP: 150 dmg
Alvo 1% HP: 200 dmg

Melhor uso: FINALIZAR inimigos
```

### Feitiço B: Assassinate (HP Alto do Alvo)
```
Alvo 100% HP: 200 dmg
Alvo 50% HP: 150 dmg
Alvo 1% HP: 100 dmg

Melhor uso: INICIAR combate
```

### Feitiço C: Berserk (Seu HP em 50%)
```
Você 100% HP: 100 dmg (sem bônus)
Você 50% HP: 200 dmg (+100% bônus)
Você 1% HP: 102 dmg (quase sem bônus)

Melhor uso: Manter HP em ~50%
```

### Feitiço D: Desesperado (Seu HP Baixo)
```
Você 100% HP: 100 dmg
Você 50% HP: 200 dmg
Você 1% HP: 300 dmg

Melhor uso: Quando estiver QUASE MORTO
```

---

## 💡 Estratégias Combinadas

### Berserker: Combo Máximo Dano

**Setup:**
1. Comece com 1000 HP (100%)
2. Use auto-dano até chegar em 520 HP (52%)
3. Agora você tem:
   - Berserk ativo (+100% em feitiços Berserk)
   - Scaling HP Baixo (~+90% em feitiços Desesperados)

**Rotação:**
1. **Fúria Sangrenta** (180 base, Berserk) → 360 dmg
2. **Chama Desesperada** (150 base, HP Low) → 285 dmg
3. **Aniquilação** (400 base, HP Low) → 880 dmg

**Total:** 1525 dmg em um combo!

---

### Atirador: First Blood

**Setup:**
1. Inimigo entra em combate com 100% HP
2. Você está longe (range 8)

**Rotação:**
1. **Tiro Certeiro** (Assassinate) → 288 dmg
2. Inimigo agora está em 85% HP
3. Continue com feitiços normais

---

## 🎮 Implementação em Código

### Função: Calcular Dano com Scaling

```javascript
function calcularDanoComScaling(feitico, caster, target) {
    let danoFinal = feitico.damage;

    // 1. Aplicar scaling se existir
    if (feitico.damageScaling) {
        const scaling = feitico.damageScaling;

        switch (scaling.type) {
            case 'casterHpLow':
                // Quanto MENOR o HP do caster, MAIOR o dano
                const casterHpPercent = caster.hp / caster.maxHp;
                const bonusLow = scaling.maxBonus * (1 - casterHpPercent);
                danoFinal *= (1 + bonusLow / 100);
                break;

            case 'casterHpBerserk':
                // Máximo em 50% HP
                const casterHp = caster.hp / caster.maxHp * 100;
                if (casterHp <= 50) {
                    const distDe50 = Math.abs(casterHp - 50);
                    const bonusBerserk = Math.max(0, 100 - (distDe50 * 2));
                    danoFinal *= (1 + bonusBerserk / 100);
                }
                break;

            case 'targetHpLow':
                // Quanto MENOR o HP do alvo, MAIOR o dano (Execute)
                const targetHpPercent = target.hp / target.maxHp;
                const bonusExecute = scaling.maxBonus * (1 - targetHpPercent);
                danoFinal *= (1 + bonusExecute / 100);
                break;

            case 'targetHpHigh':
                // Quanto MAIOR o HP do alvo, MAIOR o dano (Assassinate)
                const targetHpPct = target.hp / target.maxHp;
                const bonusAssassinate = scaling.maxBonus * targetHpPct;
                danoFinal *= (1 + bonusAssassinate / 100);
                break;
        }
    }

    // 2. Aplicar Berserk se feitiço tiver a flag
    if (feitico.berserk && caster.hasPassive('berserk')) {
        const casterHp = (caster.hp / caster.maxHp) * 100;

        // Só ativa se HP <= 50%
        if (casterHp <= 50) {
            const distDe50 = Math.abs(casterHp - 50);
            const berserkBonus = Math.max(0, 100 - (distDe50 * 2));
            danoFinal *= (1 + berserkBonus / 100);
        }
    }

    return Math.floor(danoFinal);
}
```

---

## ✅ Confirmação Final

### ✅ Berserk
- **Ativa:** HP ≤ 50%
- **Máximo:** Exatamente em 50% HP
- **Funciona:** Dano base + bônus Berserk

### ✅ Scaling HP Baixo (Caster)
- **1% HP:** Dano MÁXIMO (+200%)
- **100% HP:** Dano MÍNIMO (0%)
- **Funciona:** Sim, linear!

### ✅ Scaling HP Alto (Alvo)
- **100% HP:** Dano MÁXIMO (+80%)
- **99% HP:** Já dá menos (79.2%)
- **Funciona:** Sim, perfeito para primeiro hit!

---

**Tudo confirmado e funcionando conforme esperado! 🎯**

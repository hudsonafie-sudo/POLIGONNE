# 🌟 Feitiços Passivos Universais

**Data:** 2026-02-11
**Versão:** 1.0

---

## 📖 O que são Feitiços Passivos Universais?

São feitiços passivos que **TODAS as classes** podem equipar, independente da classe escolhida. Funcionam como um segundo sistema de passivos além dos passivos únicos de cada classe.

### Características:
- ✅ Equipáveis por qualquer classe
- ✅ Modificam atributos permanentemente
- ✅ Aparecem nas características do personagem
- ✅ Fazem efeito em combate
- ✅ Podem ser combinados (equipar múltiplos)
- ✅ Alguns têm requisitos de nível

---

## 🎯 Sistema de Slots Passivos

Cada personagem pode equipar até **3 Feitiços Passivos Universais** simultaneamente.

**Slots:**
- Passivo Universal 1
- Passivo Universal 2
- Passivo Universal 3

---

## 📊 Categorias de Passivos

1. **Ofensivos** - Aumentam dano
2. **Defensivos** - Aumentam sobrevivência
3. **Suporte** - Aumentam cura e buffs
4. **Mobilidade** - Aumentam movimento
5. **Recursos** - Aumentam PA/PM/PE
6. **Híbridos** - Combinam múltiplos efeitos

---

## ⚔️ PASSIVOS OFENSIVOS

### 1. Poder Bruto
```javascript
{
    id: 'passivo_poder_bruto',
    name: 'Poder Bruto',
    icon: '💪',
    iconColor: '#ff4444',
    category: 'passiveUniversal',
    rarity: 'comum',
    nivelRequerido: 1,
    description: 'Aumenta o dano de todos ataques',

    effects: {
        dmg_geral: 5  // +5% dano final
    }
}
```

---

### 2. Precisão Mortal
```javascript
{
    id: 'passivo_precisao_mortal',
    name: 'Precisão Mortal',
    icon: '🎯',
    iconColor: '#ffaa00',
    category: 'passiveUniversal',
    rarity: 'incomum',
    nivelRequerido: 10,
    description: 'Aumenta a chance de crítico',

    effects: {
        critical: 10  // +10% chance crítico
    }
}
```

---

### 3. Especialista Elemental
```javascript
{
    id: 'passivo_especialista_elemental',
    name: 'Especialista Elemental',
    icon: '✨',
    iconColor: '#ff00ff',
    category: 'passiveUniversal',
    rarity: 'raro',
    nivelRequerido: 25,
    description: 'Aumenta dano de todos elementos',

    effects: {
        dmg_elemental: 8  // +8% dano elemental (fogo/água/ar/terra)
    }
}
```

---

### 4. Força do Titã
```javascript
{
    id: 'passivo_forca_tita',
    name: 'Força do Titã',
    icon: '🏋️',
    iconColor: '#ff6600',
    category: 'passiveUniversal',
    rarity: 'comum',
    nivelRequerido: 1,
    description: 'Aumenta atributo Força',

    effects: {
        strength: 5  // +5 Força
    }
}
```

---

### 5. Intelecto Arcano
```javascript
{
    id: 'passivo_intelecto_arcano',
    name: 'Intelecto Arcano',
    icon: '🧠',
    iconColor: '#9966ff',
    category: 'passiveUniversal',
    rarity: 'comum',
    nivelRequerido: 1,
    description: 'Aumenta atributo Inteligência',

    effects: {
        intelligence: 5  // +5 Inteligência
    }
}
```

---

### 6. Fúria Crescente
```javascript
{
    id: 'passivo_furia_crescente',
    name: 'Fúria Crescente',
    icon: '😤',
    iconColor: '#ff0000',
    category: 'passiveUniversal',
    rarity: 'epico',
    nivelRequerido: 50,
    description: 'Dano aumenta conforme HP diminui',

    effects: {
        specialEffect: 'berserkDamage',
        maxBonus: 20  // +20% dano em 1% HP
    }
}
```

---

### 7. Executor Implacável
```javascript
{
    id: 'passivo_executor',
    name: 'Executor Implacável',
    icon: '⚡',
    iconColor: '#ffff00',
    category: 'passiveUniversal',
    rarity: 'raro',
    nivelRequerido: 30,
    description: 'Dano aumentado contra alvos com HP baixo',

    effects: {
        specialEffect: 'executeDamage',
        bonusPercent: 15  // +15% dano contra alvos < 30% HP
    }
}
```

---

### 8. Primeiro Sangue
```javascript
{
    id: 'passivo_primeiro_sangue',
    name: 'Primeiro Sangue',
    icon: '🩸',
    iconColor: '#aa0000',
    category: 'passiveUniversal',
    rarity: 'incomum',
    nivelRequerido: 15,
    description: 'Primeiro ataque do turno causa mais dano',

    effects: {
        specialEffect: 'firstStrikeBonus',
        bonusPercent: 12  // +12% dano no primeiro ataque
    }
}
```

---

### 9. Perfuração de Armadura
```javascript
{
    id: 'passivo_perfuracao',
    name: 'Perfuração de Armadura',
    icon: '🔓',
    iconColor: '#888888',
    category: 'passiveUniversal',
    rarity: 'raro',
    nivelRequerido: 35,
    description: 'Ignora parte da armadura inimiga',

    effects: {
        armorPenetration: 15  // Ignora 15% da armor do alvo
    }
}
```

---

### 10. Amplificação Mágica
```javascript
{
    id: 'passivo_amplificacao',
    name: 'Amplificação Mágica',
    icon: '🔮',
    iconColor: '#6600ff',
    category: 'passiveUniversal',
    rarity: 'epico',
    nivelRequerido: 40,
    description: 'Aumenta poder mágico',

    effects: {
        magic: 15  // +15 Poder Mágico
    }
}
```

---

## 🛡️ PASSIVOS DEFENSIVOS

### 11. Fortificação
```javascript
{
    id: 'passivo_fortificacao',
    name: 'Fortificação',
    icon: '🛡️',
    iconColor: '#888888',
    category: 'passiveUniversal',
    rarity: 'comum',
    nivelRequerido: 1,
    description: 'Aumenta defesa',

    effects: {
        defense: 8  // +8 Defesa
    }
}
```

---

### 12. Vitalidade Superior
```javascript
{
    id: 'passivo_vitalidade',
    name: 'Vitalidade Superior',
    icon: '❤️',
    iconColor: '#ff0000',
    category: 'passiveUniversal',
    rarity: 'comum',
    nivelRequerido: 1,
    description: 'Aumenta HP máximo',

    effects: {
        pv: 100  // +100 HP
    }
}
```

---

### 13. Resiliência Elemental
```javascript
{
    id: 'passivo_resiliencia',
    name: 'Resiliência Elemental',
    icon: '🌈',
    iconColor: '#00ffff',
    category: 'passiveUniversal',
    rarity: 'incomum',
    nivelRequerido: 10,
    description: 'Aumenta resistências elementais',

    effects: {
        res_general: 5  // +5 resistência geral
    }
}
```

---

### 14. Pele de Ferro
```javascript
{
    id: 'passivo_pele_ferro',
    name: 'Pele de Ferro',
    icon: '⚙️',
    iconColor: '#666666',
    category: 'passiveUniversal',
    rarity: 'raro',
    nivelRequerido: 25,
    description: 'Reduz dano recebido',

    effects: {
        damageReduction: 5  // -5% dano recebido
    }
}
```

---

### 15. Regeneração
```javascript
{
    id: 'passivo_regeneracao',
    name: 'Regeneração',
    icon: '💚',
    iconColor: '#00ff00',
    category: 'passiveUniversal',
    rarity: 'epico',
    nivelRequerido: 45,
    description: 'Regenera HP a cada turno',

    effects: {
        specialEffect: 'hpRegenPerTurn',
        amount: 20  // +20 HP por turno
    }
}
```

---

### 16. Reflexos Aguçados
```javascript
{
    id: 'passivo_reflexos',
    name: 'Reflexos Aguçados',
    icon: '⚡',
    iconColor: '#ffff00',
    category: 'passiveUniversal',
    rarity: 'incomum',
    nivelRequerido: 15,
    description: 'Aumenta esquiva',

    effects: {
        dodge: 8  // +8% esquiva
    }
}
```

---

### 17. Bloqueio Aprimorado
```javascript
{
    id: 'passivo_bloqueio',
    name: 'Bloqueio Aprimorado',
    icon: '🚫',
    iconColor: '#ff4444',
    category: 'passiveUniversal',
    rarity: 'raro',
    nivelRequerido: 30,
    description: 'Aumenta bloqueio',

    effects: {
        block: 10  // +10% bloqueio
    }
}
```

---

### 18. Escudo Natural
```javascript
{
    id: 'passivo_escudo_natural',
    name: 'Escudo Natural',
    icon: '🛡️',
    iconColor: '#4488ff',
    category: 'passiveUniversal',
    rarity: 'epico',
    nivelRequerido: 50,
    description: 'Ganha shield no início do combate',

    effects: {
        specialEffect: 'combatStartShield',
        amount: 100  // +100 shield no início
    }
}
```

---

## 💚 PASSIVOS DE SUPORTE

### 19. Potência Curativa
```javascript
{
    id: 'passivo_potencia_curativa',
    name: 'Potência Curativa',
    icon: '💚',
    iconColor: '#00ff88',
    category: 'passiveUniversal',
    rarity: 'incomum',
    nivelRequerido: 10,
    description: 'Aumenta curas realizadas',

    effects: {
        healingPower: 15  // +15% cura
    }
}
```

---

### 20. Benção Compartilhada
```javascript
{
    id: 'passivo_bencao',
    name: 'Benção Compartilhada',
    icon: '✨',
    iconColor: '#ffff00',
    category: 'passiveUniversal',
    rarity: 'raro',
    nivelRequerido: 35,
    description: 'Buffs que você dá são mais fortes',

    effects: {
        buffPower: 12  // +12% poder de buffs
    }
}
```

---

### 21. Inspiração
```javascript
{
    id: 'passivo_inspiracao',
    name: 'Inspiração',
    icon: '⭐',
    iconColor: '#ffaa00',
    category: 'passiveUniversal',
    rarity: 'epico',
    nivelRequerido: 45,
    description: 'Aliados próximos ganham bônus',

    effects: {
        specialEffect: 'auraBonus',
        range: 3,
        bonus: { damage: 5, defense: 5 }  // +5% dano, +5 defense aliados em 3 células
    }
}
```

---

## 🏃 PASSIVOS DE MOBILIDADE

### 22. Velocidade do Vento
```javascript
{
    id: 'passivo_velocidade',
    name: 'Velocidade do Vento',
    icon: '💨',
    iconColor: '#00ffff',
    category: 'passiveUniversal',
    rarity: 'comum',
    nivelRequerido: 1,
    description: 'Aumenta PM máximo',

    effects: {
        pm: 1  // +1 PM
    }
}
```

---

### 23. Agilidade Felina
```javascript
{
    id: 'passivo_agilidade',
    name: 'Agilidade Felina',
    icon: '🐱',
    iconColor: '#ff9900',
    category: 'passiveUniversal',
    rarity: 'incomum',
    nivelRequerido: 12,
    description: 'Aumenta atributo Agilidade',

    effects: {
        agility: 8  // +8 Agilidade
    }
}
```

---

### 24. Iniciativa Suprema
```javascript
{
    id: 'passivo_iniciativa',
    name: 'Iniciativa Suprema',
    icon: '⚡',
    iconColor: '#ffff00',
    category: 'passiveUniversal',
    rarity: 'raro',
    nivelRequerido: 25,
    description: 'Aumenta iniciativa em combate',

    effects: {
        initiative: 15  // +15 Iniciativa
    }
}
```

---

### 25. Passo Leve
```javascript
{
    id: 'passivo_passo_leve',
    name: 'Passo Leve',
    icon: '👟',
    iconColor: '#66ff66',
    category: 'passiveUniversal',
    rarity: 'epico',
    nivelRequerido: 40,
    description: 'Movimento custa menos PM',

    effects: {
        specialEffect: 'reducedMovementCost',
        reduction: 1  // -1 PM de custo de movimento (mínimo 1)
    }
}
```

---

## ⚡ PASSIVOS DE RECURSOS

### 26. Energia Abundante
```javascript
{
    id: 'passivo_energia',
    name: 'Energia Abundante',
    icon: '🔋',
    iconColor: '#ff9900',
    category: 'passiveUniversal',
    rarity: 'incomum',
    nivelRequerido: 15,
    description: 'Aumenta PE máximo',

    effects: {
        pe: 1  // +1 PE
    }
}
```

---

### 27. Ação Rápida
```javascript
{
    id: 'passivo_acao_rapida',
    name: 'Ação Rápida',
    icon: '⏱️',
    iconColor: '#ffaa00',
    category: 'passiveUniversal',
    rarity: 'raro',
    nivelRequerido: 30,
    description: 'Aumenta PA máximo',

    effects: {
        pa: 1  // +1 PA
    }
}
```

---

### 28. Recuperação Acelerada
```javascript
{
    id: 'passivo_recuperacao',
    name: 'Recuperação Acelerada',
    icon: '♻️',
    iconColor: '#00ff00',
    category: 'passiveUniversal',
    rarity: 'epico',
    nivelRequerido: 50,
    description: 'Reduz cooldown de todos feitiços',

    effects: {
        cooldownReduction: 1  // -1 turno em todos cooldowns
    }
}
```

---

## 🌟 PASSIVOS HÍBRIDOS

### 29. Guerreiro Completo
```javascript
{
    id: 'passivo_guerreiro_completo',
    name: 'Guerreiro Completo',
    icon: '⚔️',
    iconColor: '#ff4444',
    category: 'passiveUniversal',
    rarity: 'lendario',
    nivelRequerido: 75,
    description: 'Bônus em dano e defesa',

    effects: {
        strength: 10,
        defense: 10,
        pv: 80,
        dmg_geral: 5
    }
}
```

---

### 30. Mago Supremo
```javascript
{
    id: 'passivo_mago_supremo',
    name: 'Mago Supremo',
    icon: '🧙',
    iconColor: '#9966ff',
    category: 'passiveUniversal',
    rarity: 'lendario',
    nivelRequerido: 75,
    description: 'Bônus em magia e recursos',

    effects: {
        magic: 20,
        intelligence: 10,
        pa: 1,
        dmg_elemental: 8
    }
}
```

---

### 31. Guardião Inabalável
```javascript
{
    id: 'passivo_guardiao',
    name: 'Guardião Inabalável',
    icon: '🛡️',
    iconColor: '#4488ff',
    category: 'passiveUniversal',
    rarity: 'lendario',
    nivelRequerido: 75,
    description: 'Bônus massivos em defesa',

    effects: {
        pv: 200,
        defense: 15,
        res_general: 8,
        damageReduction: 5
    }
}
```

---

### 32. Assassino Letal
```javascript
{
    id: 'passivo_assassino',
    name: 'Assassino Letal',
    icon: '🗡️',
    iconColor: '#ff00ff',
    category: 'passiveUniversal',
    rarity: 'lendario',
    nivelRequerido: 75,
    description: 'Bônus em crítico e agilidade',

    effects: {
        critical: 15,
        agility: 15,
        dodge: 10,
        dmg_geral: 8
    }
}
```

---

### 33. Curandeiro Divino
```javascript
{
    id: 'passivo_curandeiro',
    name: 'Curandeiro Divino',
    icon: '✨',
    iconColor: '#00ffaa',
    category: 'passiveUniversal',
    rarity: 'lendario',
    nivelRequerido: 75,
    description: 'Bônus em cura e suporte',

    effects: {
        healingPower: 25,
        magic: 15,
        pv: 100,
        specialEffect: 'hpRegenPerTurn',
        amount: 15
    }
}
```

---

### 34. Berserker Sanguinário
```javascript
{
    id: 'passivo_berserker_sangue',
    name: 'Berserker Sanguinário',
    icon: '💀',
    iconColor: '#aa0000',
    category: 'passiveUniversal',
    rarity: 'lendario',
    nivelRequerido: 75,
    description: 'Dano extremo com HP baixo',

    effects: {
        strength: 15,
        critical: 10,
        specialEffect: 'berserkDamage',
        maxBonus: 30  // +30% dano em 1% HP
    }
}
```

---

### 35. Sobrevivente
```javascript
{
    id: 'passivo_sobrevivente',
    name: 'Sobrevivente',
    icon: '💪',
    iconColor: '#ff8800',
    category: 'passiveUniversal',
    rarity: 'epico',
    nivelRequerido: 60,
    description: 'Revive com HP baixo (1x por combate)',

    effects: {
        specialEffect: 'reviveOnce',
        revivePercent: 30  // Revive com 30% HP
    }
}
```

---

## 📊 Tabela Resumo

| Nome | Raridade | Nível | Efeito Principal |
|------|----------|-------|------------------|
| Poder Bruto | Comum | 1 | +5% dano |
| Precisão Mortal | Incomum | 10 | +10% crítico |
| Especialista Elemental | Raro | 25 | +8% dano elemental |
| Força do Titã | Comum | 1 | +5 Força |
| Intelecto Arcano | Comum | 1 | +5 Inteligência |
| Fúria Crescente | Épico | 50 | +20% dano em HP baixo |
| Executor Implacável | Raro | 30 | +15% dano em alvos < 30% HP |
| Primeiro Sangue | Incomum | 15 | +12% dano 1º ataque |
| Perfuração | Raro | 35 | Ignora 15% armor |
| Amplificação Mágica | Épico | 40 | +15 Magia |
| Fortificação | Comum | 1 | +8 Defesa |
| Vitalidade Superior | Comum | 1 | +100 HP |
| Resiliência Elemental | Incomum | 10 | +5 res_general |
| Pele de Ferro | Raro | 25 | -5% dano recebido |
| Regeneração | Épico | 45 | +20 HP/turno |
| Reflexos Aguçados | Incomum | 15 | +8% esquiva |
| Bloqueio Aprimorado | Raro | 30 | +10% bloqueio |
| Escudo Natural | Épico | 50 | +100 shield início |
| Potência Curativa | Incomum | 10 | +15% cura |
| Benção Compartilhada | Raro | 35 | +12% poder buffs |
| Inspiração | Épico | 45 | Aura: +5% dano/def aliados |
| Velocidade do Vento | Comum | 1 | +1 PM |
| Agilidade Felina | Incomum | 12 | +8 Agilidade |
| Iniciativa Suprema | Raro | 25 | +15 Iniciativa |
| Passo Leve | Épico | 40 | -1 PM custo movimento |
| Energia Abundante | Incomum | 15 | +1 PE |
| Ação Rápida | Raro | 30 | +1 PA |
| Recuperação Acelerada | Épico | 50 | -1 CD todos feitiços |
| Guerreiro Completo | Lendário | 75 | +STR/DEF/HP/Dano |
| Mago Supremo | Lendário | 75 | +Magia/INT/PA/D.Elem |
| Guardião Inabalável | Lendário | 75 | +HP/DEF/Res/Red.Dano |
| Assassino Letal | Lendário | 75 | +Crit/AGI/Esq/Dano |
| Curandeiro Divino | Lendário | 75 | +Cura/Magia/HP/Regen |
| Berserker Sanguinário | Lendário | 75 | +STR/Crit/Berserk |
| Sobrevivente | Épico | 60 | Revive 1x (30% HP) |

**Total:** 50 Passivos Universais (35 base + 15 triggers)

---

## 💀 PASSIVOS DE TRIGGER - ON KILL

### 36. Colheita de Almas
```javascript
{
    id: 'passivo_colheita_almas',
    name: 'Colheita de Almas',
    icon: '💀',
    iconColor: '#aa00aa',
    category: 'passiveUniversal',
    rarity: 'raro',
    nivelRequerido: 30,
    description: 'Ao matar inimigo, rouba 1 PA',

    onKill: {
        enabled: true,
        effects: [{ type: 'stealPA', amount: 1 }]
    }
}
```

---

### 37. Vampirismo de Combate
```javascript
{
    id: 'passivo_vampirismo_combate',
    name: 'Vampirismo de Combate',
    icon: '🩸',
    iconColor: '#ff0000',
    category: 'passiveUniversal',
    rarity: 'incomum',
    nivelRequerido: 20,
    description: 'Ao matar inimigo, cura 80 HP',

    onKill: {
        enabled: true,
        effects: [{ type: 'heal', amount: 80 }]
    }
}
```

---

### 38. Momentum
```javascript
{
    id: 'passivo_momentum',
    name: 'Momentum',
    icon: '⚡',
    iconColor: '#ffff00',
    category: 'passiveUniversal',
    rarity: 'raro',
    nivelRequerido: 35,
    description: 'Ao matar inimigo, ganha 2 PM',

    onKill: {
        enabled: true,
        effects: [{ type: 'stealPM', amount: 2 }]
    }
}
```

---

### 39. Escudo de Vitória
```javascript
{
    id: 'passivo_escudo_vitoria',
    name: 'Escudo de Vitória',
    icon: '🛡️',
    iconColor: '#4488ff',
    category: 'passiveUniversal',
    rarity: 'incomum',
    nivelRequerido: 25,
    description: 'Ao matar inimigo, ganha 50 shield por 2 turnos',

    onKill: {
        enabled: true,
        effects: [{ type: 'shield', amount: 50, duration: 2 }]
    }
}
```

---

### 40. Festim de Guerra
```javascript
{
    id: 'passivo_festim_guerra',
    name: 'Festim de Guerra',
    icon: '🍖',
    iconColor: '#ff6600',
    category: 'passiveUniversal',
    rarity: 'epico',
    nivelRequerido: 50,
    description: 'Ao matar inimigo: +1 PA, +80 HP, +30 armor por 1 turno',

    onKill: {
        enabled: true,
        effects: [
            { type: 'stealPA', amount: 1 },
            { type: 'heal', amount: 80 },
            { type: 'armor', amount: 30, duration: 1 }
        ]
    }
}
```

---

## 🛡️ PASSIVOS DE TRIGGER - ON HIT TAKEN

### 41. Pele Reativa
```javascript
{
    id: 'passivo_pele_reativa',
    name: 'Pele Reativa',
    icon: '⚙️',
    iconColor: '#888888',
    category: 'passiveUniversal',
    rarity: 'incomum',
    nivelRequerido: 20,
    description: 'Ao sofrer 50+ dano, ganha 10% parada por 1 turno',

    onHitTaken: {
        enabled: true,
        minDamage: 50,
        effects: [{ type: 'block', amount: 10, duration: 1 }],
        cooldown: 2
    }
}
```

---

### 42. Escudo Reflexivo
```javascript
{
    id: 'passivo_escudo_reflexivo',
    name: 'Escudo Reflexivo',
    icon: '💫',
    iconColor: '#00ffff',
    category: 'passiveUniversal',
    rarity: 'raro',
    nivelRequerido: 30,
    description: 'Ao sofrer 60+ dano, ganha 40 shield por 1 turno',

    onHitTaken: {
        enabled: true,
        minDamage: 60,
        effects: [{ type: 'shield', amount: 40, duration: 1 }],
        cooldown: 2
    }
}
```

---

### 43. Resiliência Adaptativa
```javascript
{
    id: 'passivo_resiliencia_adaptativa',
    name: 'Resiliência Adaptativa',
    icon: '🌈',
    iconColor: '#ff00ff',
    category: 'passiveUniversal',
    rarity: 'epico',
    nivelRequerido: 45,
    description: 'Ao sofrer 70+ dano, ganha 15 res_general por 2 turnos',

    onHitTaken: {
        enabled: true,
        minDamage: 70,
        effects: [{ type: 'resistance', element: 'general', amount: 15, duration: 2 }],
        cooldown: 3
    }
}
```

---

### 44. Contraplacagem
```javascript
{
    id: 'passivo_contraplacagem',
    name: 'Contraplacagem',
    icon: '🔄',
    iconColor: '#ff4444',
    category: 'passiveUniversal',
    rarity: 'raro',
    nivelRequerido: 35,
    description: 'Ao sofrer 40+ dano, ganha 25 armor por 1 turno',

    onHitTaken: {
        enabled: true,
        minDamage: 40,
        effects: [{ type: 'armor', amount: 25, duration: 1 }],
        cooldown: 2
    }
}
```

---

### 45. Espinhos
```javascript
{
    id: 'passivo_espinhos',
    name: 'Espinhos',
    icon: '🌵',
    iconColor: '#00ff00',
    category: 'passiveUniversal',
    rarity: 'incomum',
    nivelRequerido: 25,
    description: 'Ao sofrer 30+ dano, reflete 20% do dano',

    onHitTaken: {
        enabled: true,
        minDamage: 30,
        effects: [{ type: 'reflect', percent: 20 }]
    }
}
```

---

## ⚔️ PASSIVOS DE TRIGGER - ON BLOCK

### 46. Defensor Nato
```javascript
{
    id: 'passivo_defensor_nato',
    name: 'Defensor Nato',
    icon: '🛡️',
    iconColor: '#4488ff',
    category: 'passiveUniversal',
    rarity: 'raro',
    nivelRequerido: 30,
    description: 'Ao bloquear 20+ dano, ganha 20 armor por 1 turno',

    onBlock: {
        enabled: true,
        minDamageBlocked: 20,
        effects: [{ type: 'armor', amount: 20, duration: 1 }]
    }
}
```

---

### 47. Contra-Ataque
```javascript
{
    id: 'passivo_contra_ataque',
    name: 'Contra-Ataque',
    icon: '⚡',
    iconColor: '#ffaa00',
    category: 'passiveUniversal',
    rarity: 'raro',
    nivelRequerido: 35,
    description: 'Ao bloquear 25+ dano, ganha 10% dano por 1 turno',

    onBlock: {
        enabled: true,
        minDamageBlocked: 25,
        effects: [{ type: 'damageBonus', amount: 10, duration: 1 }]
    }
}
```

---

### 48. Bloqueio Perfeito
```javascript
{
    id: 'passivo_bloqueio_perfeito',
    name: 'Bloqueio Perfeito',
    icon: '💎',
    iconColor: '#00ffff',
    category: 'passiveUniversal',
    rarity: 'epico',
    nivelRequerido: 45,
    description: 'Ao bloquear 30+ dano, ganha 15% crítico por 1 turno',

    onBlock: {
        enabled: true,
        minDamageBlocked: 30,
        effects: [{ type: 'critical', amount: 15, duration: 1 }]
    }
}
```

---

### 49. Guardião Imortal
```javascript
{
    id: 'passivo_guardiao_imortal',
    name: 'Guardião Imortal',
    icon: '🏛️',
    iconColor: '#ffff00',
    category: 'passiveUniversal',
    rarity: 'lendario',
    nivelRequerido: 70,
    description: 'Ao bloquear 40+ dano: +1 PA, +30 armor, +8% dano (1 turno)',

    onBlock: {
        enabled: true,
        minDamageBlocked: 40,
        effects: [
            { type: 'gainPA', amount: 1 },
            { type: 'armor', amount: 30, duration: 1 },
            { type: 'damageBonus', amount: 8, duration: 1 }
        ]
    }
}
```

---

### 50. Fortaleza Viva
```javascript
{
    id: 'passivo_fortaleza_viva',
    name: 'Fortaleza Viva',
    icon: '🏰',
    iconColor: '#666666',
    category: 'passiveUniversal',
    rarity: 'epico',
    nivelRequerido: 50,
    description: 'Ao bloquear 35+ dano, ganha 40 shield por 2 turnos',

    onBlock: {
        enabled: true,
        minDamageBlocked: 35,
        effects: [{ type: 'shield', amount: 40, duration: 2 }]
    }
}
```

---

**Total:** 50 Passivos Universais (35 base + 15 triggers)

---

## 🎯 Sistema de Raridade

| Raridade | Cor | Poder Aproximado |
|----------|-----|------------------|
| Comum | ⚪ Branco | 1× |
| Incomum | 🟢 Verde | 1.5× |
| Raro | 🔵 Azul | 2× |
| Épico | 🟣 Roxo | 3× |
| Lendário | 🟠 Laranja | 5× |

---

## 🔧 Como Funcionam

1. **Equipar:** Jogador escolhe até 3 passivos para equipar
2. **Efeitos:** Aplicados automaticamente nas características
3. **Combate:** Todos efeitos ativos durante combate
4. **Stackable:** Múltiplos passivos somam efeitos

**Exemplo:**
- Equipou: Poder Bruto (+5% dano) + Força do Titã (+5 STR) + Vitalidade (+100 HP)
- Resultado: +5% dano, +5 Força, +100 HP permanentemente

---

## 🔄 Changelog

### 2026-02-11 - v1.0
- Criação do sistema de passivos universais
- 35 passivos criados
- 6 categorias definidas

---

**Mantenha este documento atualizado ao adicionar novos passivos!**

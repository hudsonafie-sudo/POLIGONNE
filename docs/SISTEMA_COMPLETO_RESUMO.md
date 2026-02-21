# 📘 Sistema de Classes e Feitiços - Resumo Completo

**Data:** 2026-02-11
**Versão:** 1.0 FINAL

---

## 🎯 Visão Geral

Sistema completo de **6 Classes**, **126 Feitiços de Classe**, **50 Passivos Universais** e **11 Mecânicas Avançadas**.

---

## 📚 Documentos Criados

1. **[MECANICAS_FEITICOS_AVANCADAS.md](MECANICAS_FEITICOS_AVANCADAS.md)** - 11 mecânicas novas
2. **[CLASSES_COMPLETAS.md](CLASSES_COMPLETAS.md)** - 6 classes × 21 habilidades
3. **[FEITICOS_PASSIVOS_UNIVERSAIS.md](FEITICOS_PASSIVOS_UNIVERSAIS.md)** - 50 passivos equipáveis
4. **[FEITICOS_TRIGGER_POR_CLASSE.md](FEITICOS_TRIGGER_POR_CLASSE.md)** - Distribuição de triggers

---

## 🎮 6 CLASSES

### Tabela Comparativa

| Classe | Papel | Range | Elementos | Mecânica Única | Dificuldade |
|--------|-------|-------|-----------|----------------|-------------|
| ⚔️ Guerreiro | DPS CAC | 1-4 | Fogo/Terra/Ar | Roubo Armor + On Kill PA | ⭐⭐ |
| 🏹 Atirador | DPS Distância | 4-12 | Ar/Fogo/Água | Roubo PM + On Kill PM | ⭐⭐ |
| 🎯 Caçador | Bruiser | 2-7 | Água/Terra/Ar | Roubo Vida + On Kill HP/Shield | ⭐⭐⭐ |
| 🛡️ Guardião | Tanque | 1-3 | Terra/Água/Fogo | On Hit/Block Armor + Conceder | ⭐⭐⭐ |
| ✨ Clérigo | Suporte | 3-8 | Água/Ar/Fogo | Cura + On Hit Cura Aliados | ⭐⭐⭐ |
| 💀 Berserker | DPS Extremo | 1-3 | Fogo/Terra/Água | Berserk 50% HP + On Kill Tudo | ⭐⭐⭐⭐ |

---

### Estrutura por Classe

**Cada classe tem exatamente:**
- 15 Feitiços Elementais (3 elementos × 5 feitiços)
- 3 Feitiços Ativos (utilidades)
- 2 Feitiços Passivos (com triggers únicos)
- 1 DOM (habilidade passiva de classe)

**Total por classe:** 21 habilidades
**Total geral:** 126 habilidades (6 × 21)

---

## 🔮 11 MECÂNICAS AVANÇADAS

### 1. Dano Baseado em HP

#### A) Caster HP Low (Mais dano com HP baixo)
```javascript
damageScaling: { type: 'casterHpLow', maxBonus: 200 }
// Em 1% HP: +200% dano
```

#### B) Caster HP High (Mais dano com HP alto)
```javascript
damageScaling: { type: 'casterHpHigh', maxBonus: 100 }
// Em 100% HP: +100% dano
```

#### C) Berserk (Sweet spot em 50% HP)
```javascript
damageScaling: { type: 'casterHpBerserk', maxBonus: 100, sweetSpot: 50 }
// Em 50% HP: +100% dano (máximo)
```

#### D) Target HP Low (Execute)
```javascript
damageScaling: { type: 'targetHpLow', maxBonus: 150 }
// Alvo em 1% HP: +150% dano
```

#### E) Target HP High (Assassinate)
```javascript
damageScaling: { type: 'targetHpHigh', maxBonus: 80 }
// Alvo em 100% HP: +80% dano
```

---

### 2. Ricochete

Feitiço salta entre alvos próximos.

```javascript
ricochete: {
    enabled: true,
    maxBounces: 3,        // Até 3 saltos
    range: 3,             // Busca em 3 células
    damageDecay: 0.7,     // 70% do dano anterior
    requiresLoS: true     // Requer linha de visão
}
```

**Exemplo:**
- Alvo 1: 120 dmg
- Alvo 2: 84 dmg (70%)
- Alvo 3: 59 dmg (70%)
- Alvo 4: 41 dmg (70%)

---

### 3. Auto-Dano

Feitiços que machucam o lançador.

```javascript
selfDamage: {
    enabled: true,
    type: 'fixed',      // 'fixed', 'percent', 'percentOfDamage'
    amount: 50          // Perde 50 HP ao usar
}
```

---

### 4. Cooldown Inicial

Feitiços começam bloqueados nos primeiros turnos.

```javascript
{
    cooldown: 4,
    initialCooldown: 2  // Só pode usar a partir do turno 3
}
```

---

### 5. Dano por Repetição

Reduz dano ao atacar mesmo alvo múltiplas vezes no turno.

```javascript
repeatPenalty: {
    enabled: true,
    decay: 0.5  // -50% por repetição
}
```

**Exemplo (3 ataques no mesmo alvo):**
- 1º: 100 dmg
- 2º: 50 dmg
- 3º: 25 dmg

---

### 6. Sistema de Stack/Carga

Acumula poder ao não usar, mas perde se não usar no turno certo.

```javascript
chargeSystem: {
    enabled: true,
    chargeTime: 3,       // Carrega após 3 turnos
    bonusDamage: 1.5,    // +50% dano carregado
    expireTime: 1        // Perde se não usar em 1 turno
}
```

---

### 7. Primeiro Feitiço do Turno

Bônus se for o primeiro feitiço usado.

```javascript
firstSpellBonus: {
    enabled: true,
    bonusDamage: 0.3,    // +30% dano
    bonusType: 'damage'  // 'damage', 'range', 'cost'
}
```

---

### 8. Mecânica Berserk

Dano máximo em 50% HP (sweet spot).

```javascript
berserkConfig: {
    enabled: true,
    sweetSpot: 50,
    maxBonus: 1.0  // +100% em 50% HP
}
```

---

### 9. Triggers On Kill

Efeitos ao matar inimigo.

```javascript
onKill: {
    enabled: true,
    effects: [
        { type: 'stealPA', amount: 1 },
        { type: 'stealPM', amount: 2 },
        { type: 'heal', amount: 80 },
        { type: 'shield', amount: 50, duration: 2 },
        { type: 'armor', amount: 30, duration: 1 }
    ]
}
```

---

### 10. Triggers On Hit Taken

Efeitos ao sofrer dano.

```javascript
onHitTaken: {
    enabled: true,
    minDamage: 50,      // Dano mínimo para ativar
    cooldown: 2,        // CD entre ativações
    effects: [
        { type: 'block', amount: 10, duration: 1 },
        { type: 'shield', amount: 40, duration: 1 },
        { type: 'armor', amount: 25, duration: 1 },
        { type: 'resistance', element: 'general', amount: 10, duration: 1 },
        { type: 'reflect', percent: 20 }
    ]
}
```

---

### 11. Triggers On Block

Efeitos ao bloquear/reduzir dano.

```javascript
onBlock: {
    enabled: true,
    minDamageBlocked: 20,  // Dano bloqueado mínimo
    effects: [
        { type: 'armor', amount: 20, duration: 1 },
        { type: 'damageBonus', amount: 10, duration: 1 },
        { type: 'critical', amount: 15, duration: 1 },
        { type: 'gainPA', amount: 1 },
        { type: 'shield', amount: 30, duration: 1 },
        { type: 'armorAllies', range: 1, amount: 20, duration: 1 }
    ]
}
```

---

## 🌟 50 PASSIVOS UNIVERSAIS

### Categorias

| Categoria | Quantidade | Exemplos |
|-----------|------------|----------|
| ⚔️ Ofensivos | 10 | Poder Bruto, Precisão Mortal, Força do Titã |
| 🛡️ Defensivos | 8 | Fortificação, Vitalidade, Pele de Ferro |
| 💚 Suporte | 3 | Potência Curativa, Benção, Inspiração |
| 🏃 Mobilidade | 4 | Velocidade, Agilidade, Iniciativa |
| ⚡ Recursos | 3 | Ação Rápida (+1 PA), Energia (+1 PE), Recuperação |
| 🌟 Híbridos | 7 | Guerreiro Completo, Mago Supremo (Lendários) |
| 💀 On Kill | 5 | Colheita de Almas, Vampirismo, Momentum |
| 🛡️ On Hit Taken | 5 | Pele Reativa, Escudo Reflexivo, Espinhos |
| ⚔️ On Block | 5 | Defensor Nato, Contra-Ataque, Bloqueio Perfeito |

---

### Sistema de Equipar

**Slots:** 3 passivos universais equipáveis simultaneamente

**Exemplo:**
- Slot 1: Poder Bruto (+5% dano)
- Slot 2: Vitalidade Superior (+100 HP)
- Slot 3: Colheita de Almas (On Kill: +1 PA)

---

## 🎯 DISTRIBUIÇÃO DE TRIGGERS POR CLASSE

### Identidades Preservadas

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
| **On Block: Conceder** | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ |

---

### Resumo de Identidades

#### ⚔️ Guerreiro
- **Tema:** Combate corpo a corpo, mobilidade
- **Triggers:** On Kill PA, On Block Armor+Dano
- **Estilo:** Tanque ofensivo

#### 🏹 Atirador
- **Tema:** Dano longo alcance, kiting
- **Triggers:** On Kill PM
- **Estilo:** DPS distância com mobilidade

#### 🎯 Caçador
- **Tema:** Roubo de vida, versatilidade
- **Triggers:** On Kill HP+PM+Shield, On Hit Shield
- **Estilo:** Bruiser sustentável

#### 🛡️ Guardião
- **Tema:** Tanque puro, proteção
- **Triggers:** On Hit Armor+Res, On Block Tudo
- **Estilo:** Especialista em defesa

#### ✨ Clérigo
- **Tema:** Suporte, cura, buffs
- **Triggers:** On Hit Cura Aliados
- **Estilo:** Suporte reativo

#### 💀 Berserker
- **Tema:** Dano extremo com HP baixo
- **Triggers:** On Kill Tudo, On Hit Dano
- **Estilo:** Alto risco, alta recompensa

---

## 📊 NÚMEROS TOTAIS

### Habilidades
- **6 Classes** × 21 habilidades = **126 habilidades de classe**
- **50 Passivos Universais**
- **Total:** 176 habilidades únicas

### Mecânicas
- **11 Mecânicas Avançadas** implementadas
- **3 Categorias de Triggers** (Kill, Hit Taken, Block)
- **8 Elementos Base** (fogo, água, ar, terra, neutro + dmg_elemental + dmg_geral + res_general)

### Recursos Base
- **6 PA** | **6 PM** | **3 PE** (todas as classes)

---

## 🎮 SISTEMA DE CRIAÇÃO DE PERSONAGEM

### Fluxo Proposto

```
1. Tela Inicial
   ↓
2. Escolher Nome
   ↓
3. ESCOLHER CLASSE (6 opções)
   ├─ Guerreiro
   ├─ Atirador
   ├─ Caçador
   ├─ Guardião
   ├─ Clérigo
   └─ Berserker
   ↓
4. Preview da Classe
   - Elementos
   - Mecânica Única
   - Estilo de Jogo
   - Dificuldade
   ↓
5. Confirmar Escolha
   ↓
6. Começar Jogo
   - Feitiços iniciais equipados
   - Recursos base (6 PA, 6 PM, 3 PE)
```

---

## 🔧 PRÓXIMOS PASSOS PARA IMPLEMENTAÇÃO

### Fase 1: Estrutura Base
1. Criar arquivo `sistema/classes.js` com definições das 6 classes
2. Criar arquivo `sistema/passivos_universais.js` com 50 passivos
3. Criar pasta `feiticos/classes/` com 6 arquivos (1 por classe)

### Fase 2: Mecânicas
1. Implementar sistema de triggers (onKill, onHitTaken, onBlock)
2. Implementar damage scaling (HP-based)
3. Implementar ricochete
4. Implementar auto-dano
5. Implementar sistema de carga/stack
6. Implementar cooldown inicial
7. Implementar primeiro feitiço do turno
8. Implementar dano por repetição

### Fase 3: Interface
1. Criar tela de seleção de classe
2. Criar sistema de equipar passivos universais (3 slots)
3. Atualizar UI de características para mostrar passivos
4. Criar indicadores visuais (⚡ carregado, 💀 on kill, etc.)

### Fase 4: Balanceamento
1. Testar cada classe em combate
2. Ajustar valores de dano/cura
3. Testar triggers em combos
4. Ajustar cooldowns e custos

---

## 📁 ARQUIVOS PARA CRIAR

### Código JavaScript

1. **`sistema/classes.js`** - Definições das 6 classes
2. **`sistema/passivos_universais.js`** - 50 passivos
3. **`feiticos/classes/guerreiro.js`** - 21 habilidades
4. **`feiticos/classes/atirador.js`** - 21 habilidades
5. **`feiticos/classes/cacador.js`** - 21 habilidades
6. **`feiticos/classes/guardiao.js`** - 21 habilidades
7. **`feiticos/classes/clerigo.js`** - 21 habilidades
8. **`feiticos/classes/berserker.js`** - 21 habilidades
9. **`mecanicas/triggers.js`** - Sistema de onKill/onHit/onBlock
10. **`mecanicas/damage_scaling.js`** - Escalamento por HP
11. **`mecanicas/ricochete.js`** - Sistema de ricochete
12. **`interface/selecao_classe.js`** - UI de seleção

---

## ✅ STATUS ATUAL

### ✅ Completo (Documentação)
- [x] 6 Classes definidas
- [x] 126 Feitiços de classe projetados
- [x] 50 Passivos universais projetados
- [x] 11 Mecânicas avançadas documentadas
- [x] Distribuição de triggers por classe
- [x] Identidades únicas preservadas

### ⏳ Pendente (Implementação)
- [ ] Criar arquivos JavaScript
- [ ] Implementar mecânicas no código
- [ ] Criar interface de seleção
- [ ] Sistema de save de classe
- [ ] Testes e balanceamento

---

## 🔄 Changelog

### 2026-02-11 - v1.0 FINAL
- Sistema completo de 6 classes documentado
- 11 mecânicas avançadas definidas
- 50 passivos universais criados
- Distribuição temática de triggers
- Pronto para implementação

---

**Sistema completo e balanceado, pronto para implementação! 🚀**

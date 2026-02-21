# 📘 Guia de Design de Itens - Sistema de Resistências

**Data:** 2026-02-11
**Versão:** 1.0

---

## 🎯 Filosofia de Design

### Princípios Fundamentais

1. **Progressão gradual:** Itens mais fortes vêm com mais complexidade
2. **Simplicidade para iniciantes:** Itens iniciais só têm bônus positivos
3. **Trade-offs avançados:** Itens raros+ podem ter vulnerabilidades estratégicas
4. **Soma de múltiplos itens:** 18 slots equipáveis, resistências somam
5. **Especialização temática:** Cada item tem identidade elemental

---

## 🛡️ Sistema de Resistências

### Atributos Disponíveis

```javascript
res_fire      // Resistência ao fogo
res_water     // Resistência à água
res_air       // Resistência ao ar
res_earth     // Resistência à terra
res_neutral   // Resistência ao neutro
res_general   // Bônus em TODAS resistências (multiplica!)
```

### Fórmula de Conversão

```javascript
redução% = resist / (|resist| + 200) * 100
```

**Característica:** Diminishing Returns (retornos decrescentes)

### Tabela de Referência Rápida

| Pontos | % Redução | Efeito |
|--------|-----------|--------|
| 25 | 11% | 3 itens médios Lv10 |
| 50 | 20% | Set completo Lv10 |
| 100 | 33% | Set completo Lv25 |
| 200 | 50% | Set especializado Lv25 |
| 400 | 67% | Set especializado Lv75 |
| 800 | 80% | Set especializado Lv150 |

---

## 📊 Slots de Equipamento (18 total)

### Principais (8 slots)
1. weapon - Mão Direita
2. weaponLeft - Mão Esquerda (escudo)
3. helmet - Capacete
4. chest - Peitoral/Armadura
5. legs - Calças
6. boots - Botas
7. cape - Capa
8. belt - Cinto

### Anéis (10 slots)
9-18. ring0 até ring9

**Impacto:** Com 18 slots, mesmo valores pequenos (2-5 por item) somam para 30-90 pontos totais!

---

## 📏 Valores Recomendados POR ITEM

### Por Raridade

| Raridade | Resistência/Item | Exemplo |
|----------|------------------|---------|
| **Comum** | 2-4 pontos | Capa do Viajante: 2 res_general |
| **Incomum** | 3-6 pontos | Capa do Mago: 6 res_air + 3 res_neutral |
| **Raro** | 5-12 pontos | Peitoral de Escamas: 5 res_water + 2 res_earth |
| **Épico** | 10-20 pontos | Armadura Dracônica: 14 res_fire + 3 res_general |
| **Lendário** | 15-35 pontos | Armadura Draconiana: 22 res_fire + 8 res_earth + 6 res_general |

### Por Tipo de Slot

#### Armaduras/Peitorais (Alta Resistência)
- **Comum:** 2-4 pontos
- **Raro:** 8-15 pontos
- **Lendário:** 20-35 pontos

#### Anéis (Baixa Resistência, Especialização)
- **Comum:** 1-2 pontos EM UM elemento apenas
- **Raro:** 3-6 pontos em 1-2 elementos
- **Lendário:** 10-15 pontos em 2-3 elementos

#### Acessórios (Médio, Versátil)
- **Comum:** 2-3 pontos
- **Raro:** 5-10 pontos
- **Lendário:** 12-20 pontos

---

## ⚖️ Sistema de Vulnerabilidades

### ❌ NÃO USE em Itens Iniciais

**Regra de Ouro:** Itens **COMUNS** e **INCOMUNS** NÃO têm vulnerabilidades!

**Motivo:** Não confundir jogadores iniciantes. Sistema de trade-off vem depois.

### ✅ USE em Itens Avançados

**A partir de RARO:** Itens especializados podem ter vulnerabilidades estratégicas.

#### Tabela de Vulnerabilidades Recomendadas

| Raridade | Vulnerabilidade Máxima | Exemplo |
|----------|------------------------|---------|
| **Raro** | -6 a -8 pontos | Urso Polar: +10 water, -6 fire |
| **Épico** | -8 a -12 pontos | Armadura Dracônica: +14 fire, -6 water |
| **Lendário** | -10 a -15 pontos | Armadura Draconiana: +22 fire, -12 water |

### Pares de Oposição Temática

| Elemento Forte | Elemento Fraco (Vulnerabilidade) |
|----------------|-----------------------------------|
| 🔥 Fogo | 💧 Água |
| 💧 Água | 🔥 Fogo |
| 🌍 Terra | 🌪️ Ar |
| 🌪️ Ar | 🌍 Terra |
| ⚪ Neutro | Nenhum (versátil) |

---

## 🎨 Identidade Temática

### Por Criatura/Tema

#### 🐲 Dragão
```javascript
{
  res_fire: 14-22,        // Forte contra fogo
  res_earth: 5-8,         // Resistente à terra
  res_water: -6 a -12,    // VULNERÁVEL à água
  res_general: 3-6        // Bônus geral
}
```

#### 🐻‍❄️ Urso Polar
```javascript
{
  res_water: 10-15,       // Forte contra água/gelo
  res_earth: 3-4,         // Resistente à terra
  res_fire: -6 a -8       // VULNERÁVEL ao fogo
}
```

#### 🔥 Fênix
```javascript
{
  res_fire: 12-14,        // Forte contra fogo
  res_air: 4,             // Resistente ao ar (voa)
  res_water: -6 a -8      // VULNERÁVEL à água
}
```

#### 🐺 Lobo
```javascript
{
  res_earth: 5,           // Resistente à terra (animal terrestre)
  res_neutral: 3          // Resistência física geral
}
```

#### 🦅 Águia
```javascript
{
  res_air: 5-12,          // Forte contra ar (voa)
  res_neutral: 2-3        // Resistência geral
}
```

#### 🧙 Mago/Arcano
```javascript
{
  res_air: 6-12,          // Mágica elemental = ar
  res_neutral: 3-10,      // Proteção mágica geral
  res_general: 2-8        // Conhecimento arcano protege tudo
}
```

#### 🏛️ Titã/Terra
```javascript
{
  res_earth: 6-10,        // Forte contra terra
  res_neutral: 2-4        // Resistência física
}
```

#### 💧 Escamas/Aquático
```javascript
{
  res_water: 5-10,        // Forte contra água
  res_earth: 2-4          // Resistente à terra (pele dura)
}
```

#### ⚪ Genérico/Universal
```javascript
{
  res_general: 2-15       // APENAS res_general, sem especializações
}
```

---

## 📈 Progressão por Nível

### Level 1-25 (Iniciante)

| Raridade | Total por Item | Set Completo (18 itens) | Redução % |
|----------|----------------|-------------------------|-----------|
| Comum | 2-3 | 36-54 | 15-21% |
| Incomum | 3-6 | 54-108 | 21-35% |
| Raro | 5-10 | 90-180 | 31-47% |

**Sem vulnerabilidades!**

### Level 26-75 (Intermediário)

| Raridade | Total por Item | Set Completo | Redução % |
|----------|----------------|--------------|-----------|
| Incomum | 5-10 | 90-180 | 31-47% |
| Raro | 8-18 | 144-324 | 42-62% |
| Épico | 15-25 | 270-450 | 57-69% |

**Vulnerabilidades permitidas a partir de RARO**

### Level 76-150 (Avançado)

| Raridade | Total por Item | Set Completo | Redução % |
|----------|----------------|--------------|-----------|
| Raro | 12-25 | 216-450 | 52-69% |
| Épico | 20-40 | 360-720 | 64-78% |
| Lendário | 30-60 | 540-1080 | 73-84% |

**Vulnerabilidades maiores permitidas**

### Level 151-200 (Endgame)

| Raridade | Total por Item | Set Completo | Redução % |
|----------|----------------|--------------|-----------|
| Épico | 35-70 | 630-1260 | 76-86% |
| Lendário | 50-120 | 900-2160 | 82-92% |

**Especialização extrema permitida**

---

## ✅ Checklist de Criação de Item

### Antes de Criar um Item

- [ ] Definiu o nível requerido? (`nivelRequerido: X`)
- [ ] Definiu a raridade? (comum/incomum/raro/epico/lendario)
- [ ] Item tem identidade temática clara?
- [ ] Valores de resistência condizem com raridade?

### Para Itens Comuns/Incomuns

- [ ] Apenas bônus POSITIVOS?
- [ ] Valores baixos (2-6 pontos)?
- [ ] Temática simples e clara?

### Para Itens Raros+

- [ ] Especialização clara em 1-2 elementos?
- [ ] Vulnerabilidade faz sentido tematicamente?
- [ ] Vulnerabilidade não é excessiva?
- [ ] Trade-off está balanceado?

### Para Itens Lendários

- [ ] Valores altos mas não quebrados?
- [ ] Tem `habilidadeEspecial` descrita?
- [ ] Trade-off significativo (se houver)?
- [ ] Jogável em endgame?

---

## 🔧 Exemplos Práticos

### ✅ BOM: Anel de Rubi (Comum, Level 5)

```javascript
{
  id: 'anel_rubi_pequeno',
  name: 'Anel de Rubi Pequeno',
  rarity: 'comum',
  nivelRequerido: 5,
  slot: 'ring',
  attributes: {
    res_fire: 2,    // ✅ Apenas bônus positivo
    pv: 5,
    strength: 1
  }
}
```

**Por quê funciona:**
- Comum = sem vulnerabilidades ✅
- Valor baixo (2 pontos) ✅
- Temática clara (rubi = fogo) ✅

---

### ✅ BOM: Armadura Dracônica (Épico, Level 50)

```javascript
{
  id: 'armadura_draconica',
  name: 'Armadura Dracônica',
  rarity: 'epico',
  nivelRequerido: 50,
  slot: 'chest',
  attributes: {
    pv: 60,
    defense: 18,
    strength: 8,
    res_fire: 14,       // ✅ Forte no fogo (dragão)
    res_water: -6,      // ✅ Vulnerável à água (trade-off)
    res_general: 3      // ✅ Bônus geral moderado
  }
}
```

**Por quê funciona:**
- Épico = vulnerabilidades permitidas ✅
- Temática forte (dragão = fogo, fraco água) ✅
- Trade-off balanceado (+14/-6 = +8 líquido) ✅
- Valores condizem com raridade ✅

---

### ❌ RUIM: Anel de Gelo (Comum, Level 3)

```javascript
{
  id: 'anel_gelo_iniciante',
  name: 'Anel de Gelo Iniciante',
  rarity: 'comum',
  nivelRequerido: 3,
  slot: 'ring',
  attributes: {
    res_water: 5,
    res_fire: -3      // ❌ ERRO: Comum não pode ter vulnerabilidade!
  }
}
```

**Por quê NÃO funciona:**
- Comum com vulnerabilidade = confunde iniciante ❌
- Corrigir: remover `res_fire: -3` ou aumentar raridade para raro+

---

### ❌ RUIM: Escudo Supremo (Lendário, Level 100)

```javascript
{
  id: 'escudo_supremo',
  name: 'Escudo Supremo da Invencibilidade',
  rarity: 'lendario',
  nivelRequerido: 100,
  slot: 'weaponLeft',
  attributes: {
    res_general: 200    // ❌ MUITO OP!
  }
}
```

**Por quê NÃO funciona:**
- 200 pontos em UM item = 50% redução sozinho ❌
- Set completo chegaria a 3600 pontos = 95% redução ❌
- Valores quebrados para o balanceamento ❌
- Corrigir: reduzir para res_general: 30-50

---

## 📝 Template para Novos Itens

### Template Básico

```javascript
{
    id: 'nome_item',
    catalogId: '0XXXXXXXXXXX',
    name: 'Nome do Item',
    icon: '🔥',
    iconColor: '#ff4400',
    category: 'equipment',
    stackable: true,
    maxStack: 99,
    slot: 'chest',  // weapon, helmet, chest, legs, boots, cape, belt, ring, amulet, gloves
    rarity: 'raro', // comum, incomum, raro, epico, lendario
    nivelRequerido: 25,
    description: 'Descrição do item.',

    // Resistências
    attributes: {
        // Stats básicos
        pv: 20,
        strength: 5,
        defense: 8,

        // Resistências (ESCOLHA baseado na raridade)
        res_fire: 8,       // Se item é temático de fogo
        res_water: -4,     // SE raro+ e faz sentido tematicamente
        res_general: 2     // Bônus geral pequeno
    },

    // Apenas para lendários
    habilidadeEspecial: 'Descrição da habilidade especial'
}
```

---

## 🎯 Resumo de Regras

### ✅ SEMPRE

1. Use `res_fire`, `res_water`, `res_air`, `res_earth`, `res_neutral`, `res_general`
2. NUNCA use `resistance` (atributo antigo, não funciona)
3. Mantenha valores pequenos por item (2-35 pontos)
4. Defina `nivelRequerido` sempre
5. Crie identidade temática clara

### ❌ NUNCA

1. Vulnerabilidades em itens COMUNS ou INCOMUNS
2. Valores acima de 50 pontos em UM item (quebra balanceamento)
3. Itens sem temática clara (por quê tem res_fire?)
4. Usar `resistance` genérico

### ⚠️ CUIDADO

1. Vulnerabilidades muito altas (-20+) podem tornar item inútil
2. Itens muito especializados (só 1 elemento) podem ser situacionais demais
3. Sets completos podem somar MUITO (18 itens × 20 pontos = 360 total!)

---

## 🔄 Changelog

### 2026-02-11 - v1.0
- Criação do documento
- Conversão de 19 itens de `resistance` para resistências específicas
- Definição de regras de vulnerabilidades (apenas raro+)
- Estabelecimento de valores por raridade

---

**Mantenha este documento atualizado ao criar novos itens!**

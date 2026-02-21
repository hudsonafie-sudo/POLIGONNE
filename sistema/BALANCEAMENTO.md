# 📊 SISTEMA DE BALANCEAMENTO DO JOGO

**Versão:** 1.1
**Última Atualização:** 2026-02-11
**Status:** 🟢 Implementado

**Nível Máximo Atual:** 20

---

## 🎯 FILOSOFIA DE DESIGN

O jogo é focado em **decisões táticas** e **build diversity**. O poder do personagem vem de:

1. **📦 Equipamentos** (60% do poder total)
2. **⭐ Pontos de Atributo** (40% do poder total)
3. **🎖️ Nível** (apenas desbloqueia conteúdo, não dá poder direto)

**Regra de Ouro:** Um personagem nível 10 bem equipado e com boa distribuição de pontos deve ser **competitivo** com um personagem nível 20 mal equipado.

---

## 🧮 SISTEMA DE DANO

### Fórmula de Dano

```
1. Roll Base:     baseDmg = min + random(0, max-min)
2. Scaling Stat:  baseDmg × (1 + stat × 0.7 / 100)
3. Bônus Elem:    × (1 + elemBonus / 100)
4. Crítico:       × 1.30 (se acertar chance)
5. Resistência:   × (1 - resistRedução)
6. Modificadores: Berserk, Intacto, Firme e Forte, etc.
7. Parada:        × 0.7 (se alvo bloquear)
8. Escudo:        Absorve até 50% HP máximo
9. Dano Final:    max(0, HP_atual - finalDmg)
```

**Arquivo:** `mecanicas/dano.js`, função `dealDamageToTarget()` (linhas 139-328)

### Scaling de Stats

Cada ponto de atributo adiciona **0.7% de dano**:

| Stat Total | Bônus de Dano | Exemplo (Dano Base 10) |
|------------|---------------|------------------------|
| 10         | +7%           | 10.7 dano              |
| 50         | +35%          | 13.5 dano              |
| 100        | +70%          | 17.0 dano              |
| 200        | +140%         | 24.0 dano              |

**⚠️ IMPORTANTE:** O nível do personagem **NÃO** afeta o dano diretamente! Apenas os stats.

### Mapeamento Elemento → Stat

| Elemento    | Stat Usado     |
|-------------|----------------|
| 🔥 Fire     | Intelligence   |
| 💧 Water    | Luck           |
| 🌪️ Air      | Agility        |
| 🪨 Earth    | Strength       |
| ⚪ None     | Strength       |

**Arquivo:** `mecanicas/dano.js`, função `getElementStat()` (linhas 15-22)

---

## ⚖️ SISTEMA DE PONTOS (Equipamentos)

### Peso dos Atributos

Os atributos têm valores diferentes para balanceamento:

```javascript
// Arquivo: sistema/raridade.js (linhas 166-194)

const PESO_ATRIBUTOS = {
    // Atributos de combate críticos (mais valiosos)
    pa: 10,           // Pontos de Ação - MAIS IMPORTANTE
    pm: 8,            // Pontos de Movimento
    pe: 7,            // Pontos de Energia
    range: 9,         // Alcance

    // Atributos primários (valiosos)
    pv: 1,            // Vida (1 ponto por PV)
    strength: 3,      // Força
    intelligence: 3,  // Inteligência
    agility: 3,       // Agilidade
    wisdom: 3,        // Sabedoria

    // Atributos secundários
    luck: 2,          // Sorte
    dodge: 4,         // Esquiva
    block: 4,         // Bloqueio
    initiative: 2,    // Iniciativa
    critical: 5,      // Crítico

    // Resistências
    res_neutral: 2,
    res_water: 2,
    res_earth: 2,
    res_fire: 2,
    res_air: 2,
    res_general: 3
};
```

### Orçamento de Pontos por Nível e Raridade

**Fórmula:** `base + (nível × multiplicador)`

**Arquivo:** `sistema/raridade.js`, função `calcularOrcamentoPontos()` (linhas 198-223)

| Raridade   | Base | Por Nível | Exemplo Nv 10 | Limite Equipado |
|------------|------|-----------|---------------|-----------------|
| Comum      | 20   | 4         | 60 pts        | Ilimitado       |
| Incomum    | 24   | 5         | 74 pts        | Ilimitado       |
| Raro       | 30   | 6         | 90 pts        | Ilimitado       |
| Épico      | 40   | 8         | 120 pts       | **1 item**      |
| Lendário   | 60   | 12        | 180 pts       | **1 item**      |

### Balanceamento de Anéis

Anéis dão **30% dos atributos** de equipamentos normais porque são **10 slots**.

**Arquivo:** `sistema/raridade.js`, função `gerarVariantesAnel()` (linhas 433-446)

```javascript
const MULTIPLICADOR_ANEL = 0.3;
```

**Exemplo:**
- Capacete Nv 10 comum: 40 PV + 6 FOR = 58 pts
- Anel Nv 10 comum: 12 PV + 2 FOR = 18 pts (≈30%)

**Matemática:** 10 anéis raros (~180 pts total) ≈ 3 equipamentos raros (~60 pts cada)

### Validação de Itens

**Arquivo:** `sistema/raridade.js`, função `validarBalanceamento()` (linhas 247-266)

Um item está balanceado se usar **70-100%** do orçamento:
- ✅ 70-100%: BALANCEADO
- ⚠️ >100%: ACIMA DO ORÇAMENTO (muito forte)
- ⚠️ <70%: MUITO FRACO (desperdiça orçamento)

**Comando de Debug:**
```javascript
// No console do navegador:
mostrarPontosItem(DB_ARMADURAS[0]); // Mostra análise detalhada
debugBalanceamento(DB_ARMAS[2]);    // Mostra resumo rápido
```

---

## 📈 PROGRESSÃO DE NÍVEL

### Sistema de Experiência

**Arquivo:** `jogo/dev.html`, função `getXpForLevel()` (linha 15948)

```javascript
XP_para_level = Math.floor(100 × level^1.5)
```

| Nível | XP Necessário | XP Total Acumulado |
|-------|---------------|-------------------|
| 1     | 0             | 0                 |
| 2     | 141           | 141               |
| 3     | 244           | 385               |
| 5     | 559           | 1,382             |
| 10    | 1,623         | 8,633             |
| 20    | 4,472         | 45,821            |

### Distribuição de Pontos por Nível

**✅ IMPLEMENTADO**

Quando sobe de nível, o jogador ganha **5 pontos** para distribuir livremente:

```
Pontos por Level Up: 5 pontos
Custo por atributo:  1 ponto = 1 stat point
```

**Cálculo de Stats por Nível:**

| Nível | Pontos Totais | Stats Base* | Exemplo Build Balanceado |
|-------|---------------|-------------|--------------------------|
| 1     | 0             | 50          | FOR:10, INT:10, AGI:10, WIS:10, LUCK:10 |
| 5     | 20            | 70          | FOR:20, INT:15, AGI:15, WIS:10, LUCK:10 |
| 10    | 45            | 95          | FOR:30, INT:25, AGI:20, WIS:10, LUCK:10 |
| 20    | 95            | 145         | FOR:50, INT:40, AGI:30, WIS:15, LUCK:10 |

*Stats base = 50 (10 em cada atributo inicial)

### Reset de Pontos

**✅ IMPLEMENTADO**

**Arquivo:** `jogo/dev.html`, função `resetAttributePoints()` (linha ~16528)

- **Grátis até nível 20** - Para experimentação e aprendizado de builds
- **1000🪙 após nível 20** - Custo permanente para evitar mudanças excessivas

**Razão:** Jogadores novos (até Nv 20) podem testar diferentes builds livremente sem penalidade.

---

## 🎭 COMPARAÇÃO DE PODER

### Personagem Nível 10 (Bem Equipado)

**Equipamentos:** 8 slots comuns Nv 10 = ~480 pts de orçamento
- Estimativa de stats: **60-80 de cada atributo primário**

**Pontos de Atributo:** 45 pontos distribuídos
- Foco em 2-3 atributos: **+30-45 em stats focados**

**Stats Totais:** ~90-125 nos atributos principais

**Dano Típico:**
- Feitiço base 10-15 → Com INT 100 → **17-25 dano final**

---

### Personagem Nível 20 (Mal Equipado)

**Equipamentos:** 8 slots comuns Nv 5 = ~320 pts de orçamento
- Estimativa de stats: **30-40 de cada atributo primário**

**Pontos de Atributo:** 95 pontos distribuídos
- Foco em 2-3 atributos: **+60-95 em stats focados**

**Stats Totais:** ~90-135 nos atributos principais

**Dano Típico:**
- Feitiço base 10-15 → Com INT 100 → **17-25 dano final**

---

### 📊 Conclusão do Balanceamento

✅ **Sistema está balanceado!**

- Nível 10 bem equipado: **~90-125 stats** = 17-25 dano
- Nível 20 mal equipado: **~90-135 stats** = 17-25 dano

**Diferença:** ~10-15% de poder (aceitável e não "roubado")

**Fatores de Vantagem:**
- Nv 20 tem mais **versatilidade** (pontos distribuídos em vários atributos)
- Nv 10 tem mais **especialização** (foco em equipamentos de um tipo)

---

## 👹 FAMÍLIAS DE MONSTROS E DROPS

### Estrutura de Famílias

Cada família de monstros tem:
- **4 monstros diferentes** com nomes e táticas únicas
- **1 conjunto de equipamentos** (set completo com bônus)
- **Itens normais** (sem bônus de conjunto, apenas atributos)
- **3 recursos exclusivos** (comum, incomum, raro)

### Exemplo: Família dos Ratos

**Monstros:**
1. **Rato Guerreiro** (Nv 3-5) - Ataque corpo a corpo
2. **Rato Arqueiro** (Nv 4-6) - Ataque à distância
3. **Rato Escudo** (Nv 5-7) - Remove esquiva do jogador
4. **Rato Alfa** (Nv 7-10) - Líder, combate mais complexo

**Conjunto dos Ratos:** (4-6 peças)
- **Atributos temáticos:** Força, Agilidade, PV
- **Bônus 2 peças:** +10 AGI
- **Bônus 4 peças:** +15 FOR, +5% velocidade de movimento
- **Bônus 6 peças:** +20 PV, habilidade especial "Frenesi Rato"

**Itens Normais:**
- Garra de Rato (arma comum)
- Pelo de Rato (armadura comum)
- Dente de Rato (acessório comum)

**Recursos Exclusivos:**
1. **Pelo Sujo** (comum) - Drop 40%
2. **Garra Afiada** (incomum) - Drop 15%
3. **Coração de Rato Alfa** (raro) - Drop 5%

---

### Exemplo: Família dos Pássaros

**Monstros:**
1. **Pardal Veloz** (Nv 3-5) - Alta esquiva, ataque rápido
2. **Coruja Sábia** (Nv 5-7) - Ataques mágicos, remove bloqueio
3. **Águia Caçadora** (Nv 7-10) - Ataque crítico alto
4. **Fênix Menor** (Nv 9-12) - Boss, regeneração

**Conjunto dos Pássaros:** (4-6 peças)
- **Atributos temáticos:** Agilidade, Sorte, Esquiva
- **Bônus 2 peças:** +10 SOR
- **Bônus 4 peças:** +15 AGI, +10% esquiva
- **Bônus 6 peças:** +3 PM, habilidade especial "Voo Rápido"

**Itens Normais:**
- Pena Leve (capacete comum)
- Asa Resistente (botas comum)
- Bico Curvo (anel comum)

**Recursos Exclusivos:**
1. **Pena Comum** (comum) - Drop 40%
2. **Pena Dourada** (incomum) - Drop 15%
3. **Essência de Fênix** (raro) - Drop 5%

---

## 📦 SISTEMA DE DROPS

### Taxa de Drop de Itens

| Raridade | Chance de Drop | Notas |
|----------|----------------|-------|
| Comum    | 3-5%           | Itens normais ou de conjunto |
| Incomum  | 1-2%           | Versão melhorada |
| Raro     | 0.5-1%         | Versão superior |
| Épico    | 0.1-0.3%       | Boss especiais ou eventos |
| Lendário | 0.01-0.05%     | Boss finais ou conquistas |

### Taxa de Drop de Recursos

**Recursos são mais comuns que itens:**

| Recurso    | Chance de Drop | Quantidade |
|------------|----------------|------------|
| Comum      | 30-50%         | 1-3 unidades |
| Incomum    | 10-20%         | 1-2 unidades |
| Raro       | 3-8%           | 1 unidade |

**Regra:** Cada família dropa **máximo 3 recursos diferentes** (1 de cada raridade)

---

## 🔨 SISTEMA DE CRAFTING

### Receitas de Itens

Para craftar um item, o jogador precisa:

1. **Recursos do Monstro** (1-3 tipos, da família correspondente)
2. **Recursos de Profissão** (madeira, ferro, couro, etc.)
3. **Moedas** (custo de fabricação)

### Exemplo de Receita: Garra de Rato (Comum)

```
Materiais:
- 5x Pelo Sujo (recurso comum dos ratos)
- 2x Garra Afiada (recurso incomum dos ratos)
- 10x Ferro (recurso de profissão mineração)
- 50🪙

Resultado:
- 1x Garra de Rato (arma comum Nv 3-5)
- FOR +3, AGI +2, dano 5-8
```

### Exemplo de Receita: Conjunto dos Ratos (Incomum)

```
Materiais:
- 10x Pelo Sujo
- 5x Garra Afiada
- 2x Coração de Rato Alfa (recurso raro)
- 20x Couro Curado (recurso de profissão)
- 200🪙

Resultado:
- 1x Armadura de Rato Aprimorada (parte do conjunto, incomum)
- FOR +5, AGI +4, PV +30
```

### Regras de Crafting

1. **Progressão clara:** Receitas de nível baixo usam menos recursos
2. **Recursos temáticos:** Itens de rato usam recursos de rato
3. **Profissões necessárias:** Ferreiro, Costureiro, Joalheiro, etc.
4. **Raridade dos recursos:** Itens raros exigem recursos raros
5. **Quantidade escala com raridade:**
   - Comum: 5-10 recursos comuns
   - Incomum: 10-15 recursos comuns + 5 incomuns
   - Raro: 15-20 recursos comuns + 10 incomuns + 3 raros

---

## 🔧 CRIANDO NOVOS ITENS

### Passo a Passo

1. **Defina Nível e Raridade**
   - Consulte tabela de orçamento de pontos

2. **Escolha Atributos**
   - Consulte peso dos atributos
   - Distribua pontos respeitando o tema do item

3. **Valide o Item**
   ```javascript
   mostrarPontosItem(novoItem);
   ```

4. **Ajuste se Necessário**
   - Alvo: 85-100% do orçamento
   - Mínimo aceitável: 70%

### Exemplo Prático

**Meta:** Capacete de Aço (Nível 10, Comum)

1. **Orçamento:** 20 + (10 × 4) = **64 pontos**

2. **Distribuição:**
   - 40 PV × 1 = 40 pts
   - 6 FOR × 3 = 18 pts
   - 1 DODGE × 4 = 4 pts
   - **Total: 62 pts / 64 pts (96% ✅)**

3. **Código:**
```javascript
{
    id: 'capacete_aco',
    catalogId: '0101000003',
    name: 'Capacete de Aço',
    icon: '⛑️',
    category: 'equipment',
    slot: 'helmet',
    rarity: 'comum',
    nivelRequerido: 10,
    attributes: {
        pv: 40,        // 40 pts
        strength: 6,   // 18 pts
        dodge: 1       // 4 pts
    }
    // Total: 62 pts / 64 pts (96% utilização) ✅
}
```

---

## 🔮 CRIANDO NOVOS FEITIÇOS

### Regras de Balanceamento

**Dano Base:** Deve ser consistente com o custo de PA

| Custo PA | Dano Base Sugerido | Notas |
|----------|-------------------|-------|
| 1-2      | 1-5               | Spam skill, baixo dano |
| 3-4      | 8-15              | Skill padrão |
| 5-6      | 15-25             | Skill pesada, alto dano |
| 7+       | 25-40             | Ultimate, cooldown recomendado |

**Fórmula de Verificação:**
```
DPS Estimado = (dano_médio × stat_bonus) / custo_PA
```

**Meta:** 3-5 DPS para skills equilibradas

### Exemplo de Feitiço Balanceado

```javascript
{
    id: 'bola_fogo',
    name: 'Bola de Fogo',
    icon: '🔥',
    spellType: 'active',
    castType: 'targeted',
    paCost: 4,            // Custo médio
    pmCost: 0,
    peCost: 1,            // Custo de energia moderado
    minRange: 2,
    maxRange: 6,
    rangeShape: 'circle',
    damage: {
        min: 12,          // Dano base médio
        max: 18,          // Média: 15
        stat: 'intelligence'
    },
    element: 'fire',
    targetType: 'enemy'
}
// DPS: (15 × 1.7) / 4 = 6.4 (com INT 100) ✅
```

---

## 📁 ARQUIVOS IMPORTANTES

### Sistema de Dano
- **`mecanicas/dano.js`** (781 linhas)
  - `dealDamageToTarget()` - Cálculo principal (linhas 139-328)
  - `applySpellEffects()` - Processa uso de habilidade (linhas 455-697)
  - `getElementStat()` - Mapeamento elemento→stat (linhas 15-22)

### Sistema de Balanceamento
- **`sistema/raridade.js`** (446 linhas)
  - `PESO_ATRIBUTOS` - Valores de atributos (linhas 166-194)
  - `calcularOrcamentoPontos()` - Orçamento por nível (linhas 198-223)
  - `calcularPontosItem()` - Pontos usados (linhas 226-244)
  - `validarBalanceamento()` - Validação (linhas 247-266)
  - `mostrarPontosItem()` - Debug visual (linhas 278-370)
  - `gerarVariantes3Niveis()` - Gera comum/incomum/raro (linhas 376-429)
  - `gerarVariantesAnel()` - Gera anéis (30% stats) (linhas 433-446)

### Banco de Dados de Itens
- **`equipamentos/armaduras.js`** - Capacetes, peitorais, botas, capas, anéis
- **`equipamentos/armas.js`** - Espadas, arcos, cajados (com habilidades)
- **`equipamentos/lendarios.js`** - Itens épicos e lendários únicos

### Interface e Validação
- **`jogo/dev.html`** (25000+ linhas)
  - Sistema de XP (linhas 15948-15962)
  - Validação de nível em equip (linhas 18147-18186)
  - Tooltip de equipamento (linhas 17151-17305)
  - Janela de equipamentos (linha 17583)

---

## ⚠️ REGRAS DE MODIFICAÇÃO

### ❌ NUNCA Faça:
1. Adicionar scaling de nível direto no dano dos feitiços
2. Criar itens com >110% do orçamento (exceto lendários únicos)
3. Criar itens com <70% do orçamento
4. Dar mais de 2 PA/PM/PE em um único item comum
5. Criar feitiços com DPS >8 sem cooldown ou limitações

### ✅ SEMPRE Faça:
1. Validar novos itens com `mostrarPontosItem()`
2. Testar DPS de novos feitiços em combate
3. Manter proporção 60% equipamentos / 40% pontos de atributo
4. Documentar mudanças neste arquivo
5. Atualizar versão e data no topo do documento

---

## 🔄 CHANGELOG

### v1.1 - 2026-02-11 (ATUAL)
- ✅ **Sistema de distribuição de pontos implementado** (5 pontos por nível)
- ✅ **Reset grátis até nível 20** (1000🪙 após nível 20)
- ✅ **UI de distribuição na janela de Características**
- ✅ **Nível máximo atual: 20**
- ✅ **Sistema de famílias de monstros documentado**
  - Cada família tem 4 monstros diferentes
  - 1 conjunto de equipamentos por família
  - Itens normais (sem bônus de conjunto)
  - 3 recursos exclusivos (comum, incomum, raro)
- ✅ **Sistema de drops documentado**
  - Taxa de drop de itens por raridade
  - Taxa de drop de recursos (mais comuns)
  - Máximo 3 recursos por família
- ✅ **Sistema de crafting documentado**
  - Recursos do monstro + recursos de profissão
  - Receitas com quantidade escalando por raridade
  - Custo em moedas

### v1.0 - 2026-02-11
- ✅ Sistema de dano baseado em stats (0.7% por ponto)
- ✅ Sistema de pontos para equipamentos
- ✅ Validação de balanceamento com debug visual
- ✅ Gerador de variantes (comum/incomum/raro)
- ✅ Sistema de anéis (30% de stats)
- ✅ Itens épicos e lendários únicos (1 de cada)

### Próximas Atualizações
- [ ] Implementar sistema de drops no código
- [ ] Implementar sistema de crafting no código
- [ ] Criar famílias de monstros (Ratos, Pássaros, etc.)
- [ ] Sistema de profissões (Ferreiro, Costureiro, etc.)
- [ ] Sistema de builds salvos
- [ ] Expansão para nível 30-40

---

## 📞 COMO USAR ESTE DOCUMENTO

**Para Desenvolvedores (Humanos e IAs):**
1. Consulte este documento ANTES de criar/modificar itens ou feitiços
2. Use as funções de debug (`mostrarPontosItem`, `validarBalanceamento`)
3. Atualize o CHANGELOG quando fizer mudanças significativas
4. Mantenha as tabelas atualizadas com os valores reais do código

**Para Balanceamento:**
1. Se um item/feitiço parecer forte/fraco demais, consulte as tabelas
2. Compare com itens do mesmo nível e raridade
3. Ajuste respeitando o orçamento de pontos
4. Teste em combate real antes de finalizar

---

**🎮 Fim do Documento de Balanceamento**

*Este documento é a fonte única de verdade para o sistema de balanceamento do jogo.*

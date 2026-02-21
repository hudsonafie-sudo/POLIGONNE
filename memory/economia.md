# Sistema de Economia - Projeto Betta

## Sistema de Moedas

### Moeda do Jogo
- **Nome**: Moedas (ícone: 💰)
- **Variável global**: `playerMoedas` (integer)
- **LocalStorage**: `betta_player_moedas`
- **Inicial**: 0 moedas

### Obtenção de Moedas
- Drops de monstros: campo `moedasReward` em cada monstro
- Venda de itens no mercado
- Recompensas de missões (futuro)

### Display
- Localização: Janela de inventário, canto superior direito
- Formato: `💰 1,234` (número formatado)

---

## Sistema de Raridade

### 5 Níveis de Raridade

| Tier | Nome | Cor CSS | Classe CSS | Uso |
|------|------|---------|------------|-----|
| 0 | Comum | `#999` (cinza) | `.rarity-0` | Todos os tipos |
| 1 | Incomum | `#4ade80` (verde) | `.rarity-1` | Todos os tipos |
| 2 | Raro | `#3b82f6` (azul) | `.rarity-2` | Todos os tipos |
| 3 | Épico | `#a855f7` (roxo) | `.rarity-3` | Equipamentos e consumíveis |
| 4 | Lendário | `#eab308` (dourado) | `.rarity-4` | Equipamentos e consumíveis |

### Restrições
- **Recursos**: Máximo rarity 2 (Raro)
- **Consumíveis**: Todos os 5 tiers
- **Equipamentos**: Todos os 5 tiers
- **Limite de equipados**: Máximo 1 Épico + 1 Lendário equipado simultaneamente

### Campo nos Itens
```javascript
{
    id: "espada_lendaria",
    name: "Espada Lendária",
    rarity: 4, // 0-4
    // ... outros campos
}
```

---

## Sistema de Mercado

### NPC Mercador
- **Nome**: `Mercador`
- **Localização**: Mapa da cidade (coordenadas definidas em `mapas/mundo/cidade/cidade.js`)
- **Interação**: Clique abre `#market-window`

### Janela de Mercado (`#market-window`)

**3 Abas:**

1. **Comprar**
   - Estoque aleatório gerado automaticamente
   - Renovação: A cada 5 combates vencidos
   - Preços baseados em raridade
   - Filtros por categoria

2. **Vender**
   - Player coloca itens à venda
   - Venda processada após combate
   - Moedas vão para `uncollectedMoedas`

3. **Retirar**
   - Player retira moedas de vendas concluídas
   - Transfere de `uncollectedMoedas` → `playerMoedas`

### Variáveis de Estado
```javascript
playerMoedas = 0;              // Moedas no inventário do player
uncollectedMoedas = 0;         // Moedas de vendas pendentes
marketStock = [];              // Estoque atual do mercador
pendingSales = [];             // Itens à venda pelo player
combatsUntilRestock = 5;       // Contador para renovar estoque
```

### Funções Principais
- `openMarketWindow()` - Abre janela do mercado
- `generateMarketStock()` - Gera estoque aleatório
- `buyItemFromMarket(itemId)` - Player compra item
- `sellItemToMarket(slotIndex)` - Player vende item
- `processMarketSales()` - Processa vendas (chamado em `finishCombat()`)
- `collectMarketMoedas()` - Player retira moedas

### Preços (Fórmula Base)
```javascript
basePrice = {
    0: 10,    // Comum
    1: 50,    // Incomum
    2: 200,   // Raro
    3: 1000,  // Épico
    4: 5000   // Lendário
};

// Preço final considera stats, bônus, etc.
```

---

## Sistema de Crafting

### NPC Artesão
- **Nome**: `Artesão`
- **Localização**: Mapa da cidade (x:37, y:28)
- **Interação**: Abre `#craft-window`

### Receitas
```javascript
{
    id: "espada_rara",
    name: "Espada Rara",
    rarity: 2,
    requiredLevel: 5,
    baseItemId: "espada_basica",
    recipe: {
        ingredients: [
            { itemId: "ferro", quantity: 10 },
            { itemId: "madeira", quantity: 5 }
        ]
    },
    // ... stats do item criado
}
```

### Variantes de Raridade
Mesmo item em diferentes raridades usando sufixo:
- `espada_comum_0` (Comum)
- `espada_comum_1` (Incomum)
- `espada_comum_2` (Raro)

Variantes com mesmo `setId` contam para bônus de conjunto.

### Funções Core
- `countInventoryItemById(itemId)` - Conta quantidade de um item
- `removeInventoryItemById(itemId, quantity)` - Remove itens do inventário
- `craftItem(recipeId)` - Cria item usando receita

---

## Implementação no Código

### LocalStorage Keys
```javascript
STORAGE_KEY_MOEDAS = 'betta_player_moedas'
STORAGE_KEY_MARKET_STOCK = 'betta_market_stock'
STORAGE_KEY_UNCOLLECTED = 'betta_uncollected_moedas'
```

### Inicialização
```javascript
// Carregar moedas ao iniciar jogo
playerMoedas = parseInt(localStorage.getItem(STORAGE_KEY_MOEDAS)) || 0;

// Atualizar display
updateMoedasDisplay();
```

### CSS de Raridade
```css
.rarity-0 { border-color: #999; color: #999; }
.rarity-1 { border-color: #4ade80; color: #4ade80; }
.rarity-2 { border-color: #3b82f6; color: #3b82f6; }
.rarity-3 { border-color: #a855f7; color: #a855f7; }
.rarity-4 { border-color: #eab308; color: #eab308; }
```

---

## Integração com Combate

### Após Vencer Combate
```javascript
function finishCombat() {
    // 1. Somar moedas dos monstros derrotados
    let moedasGanhas = 0;
    defeatedMonsters.forEach(m => {
        moedasGanhas += m.moedasReward || 0;
    });
    playerMoedas += moedasGanhas;

    // 2. Processar vendas do mercado
    processMarketSales();

    // 3. Decrementar contador de restock
    combatsUntilRestock--;
    if (combatsUntilRestock <= 0) {
        generateMarketStock();
        combatsUntilRestock = 5;
    }

    // 4. Salvar e exibir
    localStorage.setItem(STORAGE_KEY_MOEDAS, playerMoedas);
    updateMoedasDisplay();
    showCombatResults(moedasGanhas);
}
```

---

## Status Atual
- ✅ Documentação criada
- ⏳ Implementação pendente no código
- ⏳ UI do mercado pendente
- ⏳ NPC Mercador/Artesão pendente

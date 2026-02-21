# Sistemas Especiais - Projeto Betta

## Sistema de Bolsas (Expansão de Inventário)

### Slots de Equipamento
- **Localização**: Janela de Equipamentos, abaixo dos Anéis
- **Quantidade**: 5 slots de bolsa (`equip-bag0` até `equip-bag4`)
- **Ícone padrão**: 👜

### Expansão do Inventário
- **Base**: 30 slots (6 linhas × 5 colunas)
- **Por bolsa equipada**: +5 slots (1 linha extra)
- **Máximo**: 30 + (5 × 5) = 55 slots (11 linhas)

### Mecânica
1. Player equipa bolsa no slot
2. Inventário expande em **múltiplos de 5** (sempre mantendo 5 colunas)
3. Novos slots aparecem automaticamente abaixo dos existentes
4. Ao desequipar: se houver itens nos slots extras, avisar player

### Implementação
```javascript
// Calcular slots totais
function getTotalInventorySlots() {
    let baseSlots = 30;
    let equippedBags = 0;

    for (let i = 0; i < 5; i++) {
        if (playerEquipment[`bag${i}`]) {
            equippedBags++;
        }
    }

    return baseSlots + (equippedBags * 5);
}

// Criar slots dinamicamente
function initInventorySlots() {
    const totalSlots = getTotalInventorySlots();
    const bag = document.getElementById('inventory-bag');
    bag.innerHTML = '';

    for (let i = 0; i < totalSlots; i++) {
        const slot = document.createElement('div');
        slot.className = 'inv-slot';
        slot.dataset.slot = i;
        // ... setup drag&drop, eventos
        bag.appendChild(slot);
    }
}

// Atualizar ao equipar/desequipar bolsa
function onBagEquipChange() {
    const oldSlots = document.querySelectorAll('.inv-slot').length;
    const newSlots = getTotalInventorySlots();

    if (newSlots < oldSlots) {
        // Verificar se há itens nos slots que serão removidos
        const hasItemsInExtraSlots = playerInventory.slice(newSlots).some(item => item !== null);
        if (hasItemsInExtraSlots) {
            addChatMessage('⚠️ Remova os itens dos slots extras antes de desequipar a bolsa!', '#ff6b6b');
            return false; // Bloqueia desequipar
        }
    }

    initInventorySlots();
    updateInventoryDisplay();
    return true;
}
```

### Tipos de Bolsa (Exemplos)
```javascript
{
    id: "bolsa_pequena",
    name: "Bolsa Pequena",
    slot: "bag",
    rarity: 0,
    icon: "👜",
    stats: {
        // Bolsas podem dar stats adicionais
        alcance: 1
    }
}
```

---

## Espantalho de Treino (Dummy Controlável)

### Conceito
Monstro especial que permite ao player **controlar ambos os lados** da batalha para testar builds, combos e mecânicas.

### Características
- **Nome**: `Espantalho de Treino`
- **ID**: `espantalho_treino`
- **HP**: Configurável (padrão: 1000)
- **Stats**: Editáveis pelo player
- **Localização**: Área de treino no mapa

### Modos de Treino

#### 1. Modo Dummy (Padrão)
- Espantalho não ataca
- Player testa dano, alcance, combos
- HP reseta após cada turno (opcional)

#### 2. Modo Controlável
- Player controla **ambos os lados**
- Função `isPlayerTurn()` retorna `true` sempre que em simulação
- Permite testar:
  - IA de monstros
  - Interações entre habilidades
  - Mecânicas de combate
  - Balanceamento

#### 3. Modo Reflexo
- Espantalho copia as habilidades do player
- Testa build contra ela mesma
- Útil para balanceamento

### Implementação

```javascript
// Flag de treino
let trainingMode = false;
let trainingDummyControlled = false;

// Ao iniciar combate contra espantalho
function startTrainingCombat(mode = 'dummy') {
    trainingMode = true;

    if (mode === 'controlavel') {
        trainingDummyControlled = true;
        addChatMessage('🎯 Modo de Treino: Você controla ambos os lados!', '#4ade80');
    }

    // Iniciar combate normal
    startCombat([{
        id: 'espantalho_treino',
        name: 'Espantalho de Treino',
        icon: '🎯',
        hp: 1000,
        maxHp: 1000,
        stats: {
            /* stats configuráveis */
        },
        spells: [] // Nenhuma habilidade no modo dummy
    }]);
}

// Override isPlayerTurn para modo controlável
function isPlayerTurn() {
    if (trainingDummyControlled) return true;
    return combatState.currentTurn === 'player';
}

// Interface de configuração
function openTrainingConfig() {
    // Janela para configurar:
    // - HP do espantalho
    // - Stats (FOR, AGI, INT, etc)
    // - Resistências
    // - Modo (Dummy, Controlável, Reflexo)
}

// Ao finalizar treino
function endTrainingCombat() {
    trainingMode = false;
    trainingDummyControlled = false;
    endCombat();
    // Não dar XP/drops/moedas
}
```

### UI de Treino

**Janela de Configuração** (`#training-config-window`):
```
┌─────────────────────────────┐
│ 🎯 Configurar Treino        │
├─────────────────────────────┤
│ HP: [____1000____] [Reset]  │
│                             │
│ Modo:                       │
│ ○ Dummy (Não ataca)        │
│ ● Controlável (Player vs)  │
│ ○ Reflexo (Cópia build)    │
│                             │
│ Stats do Espantalho:        │
│ FOR: [__10__]  AGI: [__10__]│
│ INT: [__10__]  SOR: [__10__]│
│ ESQ: [__10__]  BLQ: [__10__]│
│                             │
│ [Iniciar Treino] [Fechar]   │
└─────────────────────────────┘
```

**Durante o Treino**:
- HUD especial mostrando "🎯 MODO TREINO"
- Botão "Resetar HP" sempre visível
- Botão "Alterar Configuração"
- Botão "Sair do Treino"

### NPC Mestre de Treino
- **Nome**: `Mestre de Treino`
- **Localização**: Arena de treino no mapa
- **Interação**: Abre configuração de treino
- **Diálogo**: "Pronto para treinar suas habilidades?"

### Benefícios para Desenvolvimento
1. **Testes rápidos** de balanceamento
2. **Debug** de mecânicas de combate
3. **Tutorial** para novos players
4. **Demonstração** de combos avançados

---

## Sistema de Simulação de Combate

### Simulação Existente
Já existe `simCombatState` para simular combates multi-entidade.

### Bridge Pattern
```javascript
syncSimCombatToSystem()    // Copia dados do sistema real → simulação
saveSimCombatFromSystem()  // Salva dados da simulação → sistema real
```

### Integração com Espantalho
O espantalho de treino usa a **mesma base** que a simulação, mas:
- Ocorre no mapa real (não no painel DEV)
- Não bloqueia `endCombat()`
- Player pode sair a qualquer momento
- Não gera recompensas

---

## Status Atual
- ✅ Documentação criada
- ✅ Seção "Bolsas" adicionada na UI (HTML)
- ⏳ Sistema de expansão de inventário pendente
- ⏳ Espantalho de treino pendente
- ⏳ NPC Mestre de Treino pendente

# Sistema de Economia - POLIGONNE (Classless)

> Originalmente do Projeto Betta, adaptado para o novo sistema classless.
> Status: Pendente de implementacao

## Sistema de Moedas

- **Nome**: Moedas (icone: coin)
- **Variavel**: `playerMoedas` / `playerGold` (verificar qual existe no dev.html)
- **localStorage**: `betta_player_moedas`
- **Obtencao**: Drops de monstros (`moedasReward`), venda de itens, quests futuras

## Sistema de Raridade (5 tiers)

| Tier | Nome | Cor |
|------|------|-----|
| 0 | Comum | #999 cinza |
| 1 | Incomum | #4ade80 verde |
| 2 | Raro | #3b82f6 azul |
| 3 | Epico | #a855f7 roxo |
| 4 | Lendario | #eab308 dourado |

- Recursos: max rarity 2
- Equipamentos/consumiveis: todos os 5 tiers
- Limite: max 1 Epico + 1 Lendario equipado

## Mercado NPC

- 3 abas: Comprar, Vender, Retirar
- Estoque renova a cada 5 combates
- Precos base: Comum 10, Incomum 50, Raro 200, Epico 1000, Lendario 5000

## Crafting

- NPC Artesao na cidade
- Receitas com ingredientes + item base
- Variantes de raridade do mesmo item

## Nota para Novo Sistema
- Economia e independente do sistema de classes
- Funciona igual no sistema classless
- Equipamentos dao stats que amplificam dano mas NAO desbloqueiam feiticos
- Considerar: feiticos podem ser obtidos por drops/craft? (a definir com usuario)

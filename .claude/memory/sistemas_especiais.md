# Sistemas Especiais - POLIGONNE (Classless)

> Originalmente do Projeto Betta, adaptado para o novo sistema classless.
> Status: Pendente de implementacao

## Bolsas (Expansao de Inventario)

- 5 slots de bolsa no equipamento
- Base: 30 slots (6x5), +5 por bolsa equipada, max 55 slots
- Verificar itens antes de desequipar bolsa
- Independente do sistema de classes (funciona igual)

## Espantalho de Treino

- Monstro especial para testar builds
- 3 modos: Dummy, Controlavel (ambos os lados), Reflexo (copia build)
- Stats configuraveis pelo jogador
- Sem recompensas (nao da XP/drops/moedas)

### Adaptacao para Sistema Classless
- **Muito mais importante** no novo sistema: jogador precisa testar combinacoes de ramos
- Permitir configurar stats do espantalho para simular diferentes resistencias elementais
- Mostrar DPS por elemento para ajudar jogador a avaliar sua build
- Considerar adicionar "target dummy" com stats pre-definidos por nivel

## Simulacao de Combate

- `simCombatState` ja existe para simulacao multi-entidade
- Bridge: `syncSimCombatToSystem()` / `saveSimCombatFromSystem()`
- No novo sistema: substituir dropdown de classe por presets de stats

## Nota
- Todos esses sistemas sao independentes do sistema de classes
- Funcionam no sistema classless com minimas adaptacoes
- Espantalho de treino ganha importancia extra com builds livres

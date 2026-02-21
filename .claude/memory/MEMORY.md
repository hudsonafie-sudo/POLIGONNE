# POLIGONNE - Memoria do Projeto

## Estado Atual
- Jogo tatico por turnos, 2.5D isometrico, grid quadrado
- Arquivo principal: `jogo/dev.html` (~45k linhas)
- Adaptado de um projeto antigo ("Betta"), em transformacao radical para sistema classless

## Transformacao Principal: Sistema Classless
- Remover 6 classes fixas, substituir por 4 ramos elementais
- Ver detalhes completos em `memory/plano_classless.md`
- Plano detalhado de implementacao em `plans/hidden-gliding-journal.md`

## Sistemas Aprovados (manter do jogo antigo)
- **Mercado**: Sistema de compra/venda/craft. Aprovado pelo usuario. Ver `memory/economia.md`
- **Bolsas**: Expansao de inventario. Ver `memory/sistemas_especiais.md`
- **Espantalho de treino**: Dummy para testar builds. Mais importante no sistema classless
- **Raridade**: 5 tiers (Comum a Lendario)

## Arquivos-Chave
- `jogo/dev.html` — Arquivo principal (HTML+CSS+JS, ~45k linhas)
- `sistema/classes.js` — DB_CLASSES (sera deprecado com CLASSLESS_MODE)
- `mecanicas/dano.js` — Pipeline de dano (ja stat-based, nao muda)
- `mecanicas/efeitos.js` — Buffs/debuffs (class-agnostic, nao muda)
- `docs/MECANICAS_SISTEMA.md` — Doc principal de mecanicas

## Links para Detalhes
- [Plano Classless](plano_classless.md) — Sistema de progressao por atributos
- [Economia](economia.md) — Moedas, mercado, craft, raridade
- [Sistemas Especiais](sistemas_especiais.md) — Bolsas, espantalho, simulacao

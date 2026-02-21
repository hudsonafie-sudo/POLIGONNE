# Plano: Sistema Classless por Atributos Elementais

## Resumo
Substituir 6 classes fixas por sistema classless com 4 ramos elementais baseados em stats.

## Decisoes Confirmadas
| Decisao | Escolha |
|---------|---------|
| Grid | Quadrado (manter) |
| Visual | 2.5D isometrico (manter/melhorar) |
| Classes | REMOVER - sistema classless |
| Ramos | 4 elementais: Forca/Terra, Inteligencia/Fogo, Agilidade/Ar, Sorte/Agua |
| Sabedoria | NAO e ramo (pode ser stat auxiliar ou removida) |
| Desbloqueio | So pontos de NIVEL contam (equip nao conta) |
| Starters | 4 feiticos por ramo = 16 iniciais |
| Hibridos | Feiticos que exigem 2+ stats |
| Passivas cross-element | Passivas de um ramo podem afetar TODOS os elementos |

## Mecanica Core
- Jogador distribui pontos ao subir de nivel em 4 stats (strength, intelligence, agility, luck)
- Cada stat mapeia para um elemento (terra, fogo, ar, agua)
- Limiares de pontos desbloqueiam feiticos e passivos daquele ramo
- Pode focar em 1, 2, 3 ou 4 elementos
- Base damage dos feiticos e fixo - amplificado por stats, equip, passivas
- Cada ramo e auto-suficiente: dano alvo/zona, melee/distancia, berserk-scaling, HP-scaling, cura, lifesteal, efeitos duplos aliado/inimigo, passivos

## Variaveis Existentes Reutilizaveis
- `playerAllocatedAttributes` (dev.html:25991) — JA EXISTE, 5 stats distribuiveis
- `ATTRIBUTE_POINTS_PER_LEVEL = 3` (dev.html:25999) — JA EXISTE
- `ELEMENT_STAT_MAP` (dano.js:118) — fire->int, earth->str, air->agi, water->lck
- `applyPassiveEffect()` (dev.html:19415) — class-agnostic
- `dealDamageToTarget()` (dano.js:606) — ja stat-based
- `equippedActiveBuild[10] / equippedPassiveBuild[5]` (dev.html:15396)

## 12 Areas de Mudanca em dev.html
1. Script includes (~10720)
2. playerStats - remover classId (~23822)
3. Spell collection sync (~16340) - rebuild por stats
4. Spell panel tabs/filtros (~15489) - trocar classe por ramo
5. Spell collection render (~15650) - locked/unlocked por stats
6. isSpellUnlocked / getSpellRequiredLevel (~26120) - substituir
7. getSpellClassId (~20141) - deletar
8. Sprite / getEntityClassId (~13845) - ramo dominante
9. Simulacao combate (~20160, 20506) - presets de stats
10. Class switcher UI (~32050) - remover
11. DOM spell rendering (~16195) - vira maestria (100+ pts)
12. Callback de distribuicao de pontos - recalcular desbloqueios

## 5 Fases de Implementacao
1. **Fundacao**: Criar sistema/progressao.js + feiticos/ramo_*.js (nao quebra nada)
2. **Bridge**: Flag CLASSLESS_MODE, script includes, DB_HABILIDADES condicional
3. **Core switchover**: Substituir isSpellUnlocked, _tabBelongs, sync de classe
4. **UI**: Redesenhar tabs, visual locked, callback desbloqueio, remover class switcher
5. **Polish**: Sprites, docs, testes, limpar localStorage

## Arquivos a Criar
- `sistema/progressao.js` — DB_RAMOS, DB_HIBRIDOS, funcoes de query
- `feiticos/ramo_terra.js` — Feiticos Terra/Forca
- `feiticos/ramo_fogo.js` — Feiticos Fogo/Inteligencia
- `feiticos/ramo_ar.js` — Feiticos Ar/Agilidade
- `feiticos/ramo_agua.js` — Feiticos Agua/Sorte
- `feiticos/ramo_hibridos.js` — Feiticos multi-stat

## Plano Completo
Arquivo de plano detalhado em: `C:\Users\Afy\.claude\plans\hidden-gliding-journal.md`

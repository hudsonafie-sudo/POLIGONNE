# Plano: Sistema de Progressao por Atributos Elementais (Classless)

## Contexto

O projeto POLIGONNE foi adaptado de um jogo antigo com sistema de 6 classes fixas (Orik, Zefir, Garren, Aegis, Klaris, Kaos). O usuario quer transformar radicalmente o jogo em um sistema **classless** onde:

- Nao existem classes fixas
- O jogador distribui pontos de nivel em 4 stats elementais
- Stats desbloqueiam feiticos progressivamente
- Cada ramo elemental e auto-suficiente (dano, cura, suporte, efeitos)
- Feiticos hibridos exigem pontos em multiplos stats
- Equipamento amplifica dano mas NAO conta para desbloqueio
- Grid quadrado e visual 2.5D isometrico permanecem iguais

---

## Decisoes de Design Confirmadas

| Decisao | Escolha |
|---------|---------|
| Grid | Quadrado (manter atual) |
| Visual | 2.5D isometrico (manter/melhorar) |
| Classes | Removidas - sistema classless |
| Ramos | 4 elementais: Forca/Terra, Inteligencia/Fogo, Agilidade/Ar, Sorte/Agua |
| Desbloqueio | Apenas pontos de NIVEL contam (nao equipamento) |
| Feiticos iniciais | 4 por elemento = 16 feiticos iniciais |
| Cada ramo contem | Dano alvo/zona, melee/distancia, berserk-scaling, HP-scaling, cura, lifesteal, efeitos duplos (aliado/inimigo), passivos |
| Hibridos | Feiticos que exigem pontos em 2+ stats |

---

## 4 Ramos Elementais

| Stat | Elemento | Cor | Tipo de feiticos |
|------|----------|-----|------------------|
| Forca (strength) | Terra | #cc9955 | Melee/zona, tanque, escudo, dano fisico |
| Inteligencia (intelligence) | Fogo | #ff6633 | Dano magico, AoE, DoT, queimadura |
| Agilidade (agility) | Ar | #7ecf7e | Mobilidade, distancia, kiting, esquiva |
| Sorte (luck) | Agua | #33aaff | Cura, controle, lifesteal, suporte |

**Cada ramo tera variedade completa**: dano single/zone, melee/ranged, berserk-scaling, HP-scaling do alvo ou lancador, cura, roubo de vida, efeitos em aliados vs inimigos, passivos.

**Passivas cross-element**: Passivas de um ramo podem afetar TODOS os elementos. Ex: passiva do ramo Ar (Agilidade 50) que quando ativa permite roubar 2% de vida de TODO dano causado, independente do elemento. Isso incentiva investir pontos em ramos mesmo sem usar os feiticos ativos deles.

---

## Arquivos Criticos a Modificar

### Arquivos NOVOS
| Arquivo | Proposito |
|---------|-----------|
| `sistema/progressao.js` | DB_RAMOS, limiares de desbloqueio, funcoes de query (isSpellUnlocked, getUnlockedSpells) |
| `feiticos/ramo_terra.js` | Todos feiticos do ramo Terra/Forca |
| `feiticos/ramo_fogo.js` | Todos feiticos do ramo Fogo/Inteligencia |
| `feiticos/ramo_ar.js` | Todos feiticos do ramo Ar/Agilidade |
| `feiticos/ramo_agua.js` | Todos feiticos do ramo Agua/Sorte |
| `feiticos/ramo_hibridos.js` | Feiticos que exigem 2+ stats |

### Arquivos MODIFICADOS
| Arquivo | O que muda |
|---------|-----------|
| `jogo/dev.html` | ~12 areas (detalhadas abaixo) |
| `sistema/classes.js` | Deprecar DB_CLASSES, adicionar flag CLASSLESS_MODE |
| `mecanicas/testes_validacao.js` | Novos testes para ramos e requisitos |
| `docs/MECANICAS_SISTEMA.md` | Documentar novo sistema |

### Arquivos SEM mudanca
| Arquivo | Motivo |
|---------|--------|
| `mecanicas/dano.js` | Ja usa ELEMENT_STAT_MAP (fire->int, earth->str, air->agi, water->lck) |
| `mecanicas/efeitos.js` | Sistema de efeitos e class-agnostic |
| `mecanicas/triggers.js` | Triggers vem de passivos equipados, nao de classes |
| `mecanicas/grade.js` | Grid nao muda |
| `mecanicas/pathfinding.js` | Grid nao muda |
| `mecanicas/alcance_e_zona.js` | Grid nao muda |
| `dados/monstros.js` | Monstros independem de classes |

---

## Estrutura de Dados Nova

### sistema/progressao.js

```javascript
const CLASSLESS_MODE = true;

// 4 ramos elementais
const DB_RAMOS = {
    strength: {
        name: 'Forca', element: 'earth',
        icon: '🪨', color: '#cc9955',
        // Limiares: pontos necessarios -> feiticos desbloqueados
        thresholds: [
            { pts: 0,  spells: ['terra_starter_1','terra_starter_2','terra_starter_3','terra_starter_4'] },
            { pts: 10, spells: ['terra_tier1_1','terra_tier1_2'] },
            { pts: 20, spells: ['terra_tier2_1','terra_tier2_passive1'] },
            { pts: 30, spells: ['terra_tier3_1','terra_tier3_2'] },
            { pts: 50, spells: ['terra_tier4_1','terra_tier4_passive1'] },
            { pts: 75, spells: ['terra_mastery'] },
            { pts: 100, spells: ['terra_ultimate'] }
        ]
    },
    intelligence: { /* Fogo - mesma estrutura */ },
    agility:      { /* Ar - mesma estrutura */ },
    luck:         { /* Agua - mesma estrutura */ }
};

// Feiticos hibridos com requisitos multiplos
const DB_HIBRIDOS = [
    { spellId: 'hibrido_lava', requirements: { strength: 20, intelligence: 20 } },
    { spellId: 'hibrido_gelo', requirements: { agility: 20, luck: 20 } },
    // ...mais hibridos
];

// Usa APENAS playerAllocatedAttributes (pontos de nivel)
// NAO conta equipamento para desbloqueio
function getLevelStats() {
    return { ...playerAllocatedAttributes };
}

function isSpellUnlockedByStats(spellId) { /* ... */ }
function getUnlockedSpellIds() { /* ... */ }
function getSpellRequirements(spellId) { /* ... */ }
```

### Estrutura de feitico (novo campo `requirements`)

```javascript
// ANTES (sistema de classes):
{ id: 'orik_espada_flamejante', class: 'orik', element: 'fire', ... }

// DEPOIS (sistema classless):
{ id: 'terra_starter_1', branch: 'strength', element: 'earth',
  requirements: { strength: 0 }, ... }

// Hibrido:
{ id: 'hibrido_lava', branch: 'hybrid', element: 'fire',
  requirements: { strength: 20, intelligence: 20 }, ... }
```

---

## Areas de Modificacao em dev.html

### Area 1: Script includes (~linha 10720)
- Adicionar `<script src="../sistema/progressao.js">`
- Adicionar `<script src="../feiticos/ramo_*.js">` (4 + hibridos)
- Modificar composicao de `DB_HABILIDADES` para incluir feiticos dos ramos

### Area 2: playerStats (~linha 23822)
- Remover `classId` de playerStats quando CLASSLESS_MODE = true
- HP/PA/PM base permanecem iguais para todos

### Area 3: Spell collection sync (~linha 16340)
- ANTES: filtra feiticos por classe quando classe muda
- DEPOIS: reconstroi colecao baseado em `getUnlockedSpellIds()` quando stats mudam
- Chamar reconstrucao ao confirmar distribuicao de pontos

### Area 4: Spell panel tabs e filtros (~linha 15489-15493)
- ANTES: `_tabBelongs(s)` verifica `s.class === classId`
- DEPOIS: verifica `isSpellUnlockedByStats(s.id)` ou mostra todos com estado locked/unlocked
- Tabs mudam de elementos-da-classe para os 4 ramos (Terra, Fogo, Ar, Agua, Hibridos)

### Area 5: Spell collection rendering (~linha 15650)
- Mostrar feiticos trancados em cinza com tooltip "Requer Forca 20"
- Agrupar por ramo em vez de por classe

### Area 6: isSpellUnlocked / getSpellRequiredLevel (~linha 26120-26189)
- Substituir completamente por `isSpellUnlockedByStats()` do sistema/progressao.js
- Remover logica baseada em nivel/classe

### Area 7: getSpellClassId (~linha 20141)
- Deletar ou stub esta funcao
- Substituir 6 call sites por logica baseada em ramo

### Area 8: Sprite / identidade visual (~linha 13845)
- `getEntityClassId()` retorna ramo dominante para sprite
- Short term: mapear strength->orik sprite, agility->zefir sprite

### Area 9: Simulacao de combate (~linha 20160, 20506)
- Substituir dropdown de classe por presets de distribuicao de stats
- `_buildClassSpells()` vira `_buildUnlockedSpells(statPreset)`

### Area 10: Class switcher UI (~linha 32050)
- Remover popup de selecao de classe
- Substituir por botao de respec ou quick-view dos stats

### Area 11: DOM spell rendering (~linha 16195)
- DOM vira "feitico de maestria" - desbloqueado com 100+ em um stat
- Manter slot especial de DOM na build

### Area 12: Ponto distribution callback
- Ja existe `playerAllocatedAttributes` (~linha 25991)
- Ao confirmar pontos, chamar funcao que recalcula feiticos desbloqueados
- Notificar jogador de novos desbloqueios

---

## Ordem de Implementacao

### Fase 1: Fundacao (nao quebra nada)
1. Criar `sistema/progressao.js` com DB_RAMOS, DB_HIBRIDOS e funcoes de query
2. Criar `feiticos/ramo_terra.js` com feiticos iniciais do ramo Terra
3. Criar `feiticos/ramo_fogo.js` com feiticos iniciais do ramo Fogo
4. Criar `feiticos/ramo_ar.js` com feiticos iniciais do ramo Ar
5. Criar `feiticos/ramo_agua.js` com feiticos iniciais do ramo Agua
6. Criar `feiticos/ramo_hibridos.js` com feiticos hibridos iniciais
7. Projetar os 16 feiticos starter (4 por ramo, req: 0)

### Fase 2: Bridge (flag CLASSLESS_MODE)
8. Adicionar CLASSLESS_MODE flag em sistema/classes.js
9. Adicionar script includes em dev.html
10. Criar DB_HABILIDADES_RAMOS que agrega todos os feiticos dos ramos
11. Modificar composicao de DB_HABILIDADES condicionalmente

### Fase 3: Core switchover
12. Modificar playerStats (remover classId)
13. Substituir isSpellUnlocked() e getSpellRequiredLevel() por versoes stat-based
14. Substituir _tabBelongs() e filtro de colecao para usar isSpellUnlockedByStats()
15. Substituir sync de classe (linha 16340) por rebuild baseado em stats
16. Deletar/stub getSpellClassId()

### Fase 4: UI
17. Redesenhar tabs do spell panel (Terra, Fogo, Ar, Agua, Hibridos)
18. Adicionar visual de feiticos trancados com requisitos
19. Adicionar callback de "novos feiticos desbloqueados" na distribuicao de pontos
20. Substituir class switcher por stat overview/respec
21. Atualizar simulacao de combate

### Fase 5: Polish
22. Modificar getEntityClassId() para sprite baseado em ramo dominante
23. Atualizar docs/MECANICAS_SISTEMA.md
24. Atualizar mecanicas/testes_validacao.js
25. Limpar referencias a localStorage de classe

---

## Funcoes Existentes Reutilizaveis

| Funcao | Arquivo | Reutilizacao |
|--------|---------|-------------|
| `playerAllocatedAttributes` | dev.html:25991 | JA EXISTE - sistema de pontos de nivel (5 stats). Usar diretamente para desbloqueio |
| `ATTRIBUTE_POINTS_PER_LEVEL` | dev.html:25999 | JA EXISTE - 3 pts/nivel |
| `calculateTotalAttributes()` | dev.html:26700 | JA EXISTE - soma base + equip + allocated. Usar `playerAllocatedAttributes` para desbloqueio, total para dano |
| `ELEMENT_STAT_MAP` | dano.js:118 | JA EXISTE - fire->int, earth->str, air->agi, water->lck |
| `applyPassiveEffect()` | dev.html:19415 | REUTILIZAR - carrega passivos em combatState.passiveBoosts. Funciona com qualquer fonte |
| `processOnKillTrigger()` | triggers.js:20 | REUTILIZAR - processa triggers de passivos equipados, class-agnostic |
| `dealDamageToTarget()` | dano.js:606 | REUTILIZAR - pipeline de dano ja e stat-based |
| `SP_EL` | dev.html:15425 | REUTILIZAR - cores/icones dos elementos para UI |
| `equippedActiveBuild / equippedPassiveBuild` | dev.html:15396 | REUTILIZAR - 10 slots ativos + 5 passivos |

---

## Migracao de Save Data

1. Ler `betta_player_class` (classe anterior)
2. Mapear para distribuicao padrao de stats (orik→forca-heavy, zefir→agil-heavy)
3. Se `playerAllocatedAttributes` ja tem pontos, manter como esta
4. Recalcular feiticos desbloqueados
5. Manter feiticos equipados se ainda desbloqueados, limpar os que nao sao
6. Marcar `betta_classless_migrated = true`

---

## Nota sobre Sabedoria (Wisdom)

Sabedoria NAO e um ramo elemental. Permanece como stat que pode ser distribuida mas nao desbloqueia feiticos diretamente. Pode ser usada para:
- Requisito de feiticos hibridos especificos
- Bonus passivos gerais (ex: +cura recebida)
- Ou ser removida/simplificada no futuro

---

## Verificacao

1. **Testar desbloqueio**: Distribuir pontos em Forca e verificar que feiticos de Terra desbloqueiam progressivamente
2. **Testar hibridos**: Distribuir pontos em 2 stats e verificar desbloqueio de hibrido
3. **Testar isolamento**: Verificar que pontos de equipamento NAO desbloqueiam feiticos
4. **Testar combate**: Entrar em combate com feiticos de multiplos ramos equipados
5. **Testar dano**: Confirmar que dano escala com stats totais (nivel + equip), nao apenas nivel
6. **Testar passivos**: Confirmar que passivos desbloqueados por limiares funcionam no combate
7. **Testar respec**: Redistributir pontos e verificar que feiticos mudam corretamente
8. **Rodar validarTudo()**: Confirmar que testes automatizados passam

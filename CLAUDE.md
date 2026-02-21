# Instrucoes do Projeto - Jogo Tatico por Turnos

## LEITURA OBRIGATORIA — TRES DOCUMENTOS

**ANTES de fazer qualquer trabalho neste projeto, LEIA os documentos abaixo na ordem indicada:**

### 1. Mecanicas do Sistema (COMBATE, FEITICOS, CLASSES)
**`docs/MECANICAS_SISTEMA.md`**

Documento PRINCIPAL. Contem TODAS as mecanicas de combate, feiticos, invocacoes, efeitos, dano, cura, IA, classes, auras, e regras de consistencia. **LEIA ANTES de criar ou alterar qualquer feitico, classe, efeito, invocacao ou mecanica de combate.**

Cobre:
- Sistema de classes (6 classes, mapeamento classe→spell class)
- Sistema de feiticos (todos os campos, tipos, efeitos)
- Sistema de invocacoes (criacao, limite, aura, ciclo de vida)
- Sistema de dano/cura (pipeline completo de calculo)
- Sistema de efeitos (buffs/debuffs, stacking, duracao)
- Sistema de auras e zonas (groundEffect vs passiveZone)
- Sistema de combate (turnos, state, init)
- Sistema de alcance (shapes, LoS, targeting)
- Sistema de IA de monstros
- Checklist de validacao ao criar/alterar
- Erros comuns e como evitar
- **Regras de consistencia (sistema vivo)**

### 2. Regras de Criacao de Conteudo (ITENS, RECURSOS, RECEITAS)
**`docs/REGRAS_CRIACAO_CONTEUDO.md`**

Contem regras para criar itens, recursos, receitas, profissoes e monstros. **LEIA ANTES de criar conteudo de jogo.**

### 3. Sistema de Testes Automatizados
**`mecanicas/testes_validacao.js`**

Sistema de validacao automatica que roda no console do navegador. **RODE APOS criar ou alterar qualquer feitico, classe ou efeito.**

Comandos:
- `validarTudo()` — Valida TUDO (classes, feiticos, efeitos, verificacao cruzada)
- `validarFeitico('id')` — Valida um feitico especifico
- `validarClasse('id')` — Valida uma classe especifica
- `validarEfeito('id')` — Valida um efeito especifico

**Se uma regra nao existir ainda nesses documentos, adicione-a ao criar a regra.**

---

## PROTOCOLO OBRIGATORIO AO ALTERAR MECANICAS

Ao receber um pedido para criar ou alterar qualquer mecanica de combate:

1. **LER** `docs/MECANICAS_SISTEMA.md` — entender como a mecanica funciona
2. **BUSCAR** com Grep o campo/funcao alterado em TODO o projeto
3. **LISTAR** todos os locais afetados e potenciais conflitos
4. **VERIFICAR** se a alteracao conflita com alguma regra existente
5. **INFORMAR** o usuario se houver conflito ou excecao
6. **ALTERAR** todos os locais necessarios (incluindo `description` dos feiticos)
7. **ATUALIZAR** `docs/MECANICAS_SISTEMA.md` se a mecanica mudou
8. **ATUALIZAR** `mecanicas/testes_validacao.js` se novas mecanicas foram adicionadas
9. **RODAR** `validarTudo()` mentalmente para garantir consistencia

### Regra de ouro: DESCRIPTION = CONTRATO

O campo `description` de um feitico eh o contrato com o jogador. Se a mecanica muda (dano, alcance, custo, efeito), a descricao DEVE ser atualizada junto. **Nunca** alterar valores sem atualizar a descricao.

---

## Regra Obrigatoria: Criar Icone SVG para Todo Item Novo

Sempre que for solicitado criar um novo item (equipamento, recurso, consumivel, drop de monstro, etc.), **OBRIGATORIAMENTE** crie tambem um icone SVG personalizado para esse item.

### Como criar o icone:

1. **Analise o nome do item** e identifique os elementos visuais tematicos
2. **Crie um SVG com zonas multi-cor** (body, detail, accent, gem) no formato do `EQUIP_ICON_LIBRARY`
3. **Adicione o icone** ao arquivo `dados/icones_equipamentos.js` na categoria correta, ou ao `dados/gerador_icones.js`
4. **Referencie no item** usando a propriedade `svgIcon: { shape: 'id-do-icone', palette: 'paleta' }`

### Regras do SVG:
- ViewBox: `0 0 512 512`
- Usar zonas: `body` (cor principal), `detail` (cor secundaria), `accent` (destaque), `gem` (joia/brilho)
- O icone deve ser reconhecivel em 36px (tamanho de exibicao no jogo)
- Preferir silhuetas bold e simples em vez de detalhes finos

### Paleta sugerida por tema:
- Fogo/lava: `fire` ou `ember`
- Gelo/agua: `ice`
- Natureza/floresta: `nature` ou `jade`
- Arcano/magico: `arcane` ou `shadow`
- Sagrado/luz: `holy` ou `gold`
- Sombrio/morte: `void` ou `blood`
- Neutro/comum: `iron`, `copper` ou `bone`
- Raro/precioso: `gold`, `silver`

---

## Estrutura do Projeto

- `jogo/dev.html` — Arquivo principal do jogo (HTML + CSS + JS integrados)
- `dados/` — Dados do jogo (icones, monstros, habilidades, recursos)
- `equipamentos/` — Definicoes de equipamentos (armas, armaduras, hibridos, ferramentas)
- `mecanicas/` — Mecanicas do jogo (dano, IA, pathfinding, **testes**)
- `habilidades/` — Habilidades ativas, passivas e DOM
- `feiticos/` — Sistema de feiticos (1 arquivo por classe)
- `sistema/` — Sistemas do jogo (profissoes, craft, receitas, drops, raridade, **classes**)
- `docs/` — Documentacao (**MECANICAS_SISTEMA.md**, REGRAS_CRIACAO_CONTEUDO.md)
- `previews/` — Paginas de preview/teste (NAO ficam em jogo/)
- `img/` — Imagens SVG de elementos (fogo, agua, ar, terra, etc.)
- `mapas/` — Mapas do mundo

### Arquivos-chave de mecanicas

| Arquivo | O que contem |
|---------|-------------|
| `mecanicas/dano.js` | Calculo de dano, cura, escudo, dodge, block, push/pull |
| `mecanicas/efeitos.js` | DB_EFEITOS (buffs/debuffs), apply/tick/expire |
| `mecanicas/alcance_e_zona.js` | Alcance de feiticos, AoE, targeting |
| `mecanicas/brasas.js` | Sistema de brasas cromatico |
| `mecanicas/ia_monstros.js` | IA de monstros (utility-based) |
| `mecanicas/triggers.js` | Triggers de classe (onKill, onBlock, etc.) |
| `mecanicas/status_avancados.js` | AdvancedStatus (estabilizado, preso, etc.) |
| `mecanicas/testes_validacao.js` | Sistema de testes automatizados |
| `sistema/classes.js` | DB_CLASSES (6 classes com baseStats e spellIds) |
| `feiticos/classes/*.js` | Feiticos por classe (orik, zefir, etc.) |

## Sistema de Icones SVG

Os icones usam o sistema multi-zona definido em `dados/icones_equipamentos.js`:
- `EQUIP_ICON_LIBRARY` — Biblioteca de icones por slot (helmet, chest, weapon, tool, hybrid, consumable, resource)
- `EQUIP_COLOR_PALETTES` — 16 paletas de cor
- `EQUIP_SLOT_DEFAULTS` — Icones padrao para slots vazios
- `dados/gerador_icones.js` — Gerador procedural que estende a biblioteca

Itens referenciam icones via: `svgIcon: { shape: 'icon-id', palette: 'palette-id' }`
Fallback emoji: propriedade `icon: '...'` (usado quando SVG nao esta disponivel)

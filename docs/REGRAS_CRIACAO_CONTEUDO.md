# REGRAS E RECOMENDACOES PARA CRIACAO DE CONTEUDO

**LEITURA OBRIGATORIA** — Toda IA deve ler este arquivo ANTES de criar qualquer item, recurso, receita, profissao ou monstro. Regras futuras serao adicionadas aqui.

---

## 1. TIPOS DE RECURSOS

O jogo tem 4 categorias de recursos. Cada um tem proposito diferente:

### 1.1 Recursos de Monstro (54 total)
- **Arquivo:** `dados/recursos_monstros.js` (DB_RECURSOS_MONSTROS)
- **Origem:** Drop de monstros ao derrotar em combate
- **Estrutura:** 18 familias x 3 raridades (comum, incomum, raro/boss)
- **Uso:** Receitas de equipamento em `sistema/receitas.js`
- **Regra de proporcionalidade:** SIM (ver secao 5)

### 1.2 Recursos de Coleta — Brutos (15 total)
- **Arquivo:** `dados/recursos_coleta.js` (DB_RECURSOS_COLETA, subcategory: 'coleta_bruto')
- **Origem:** Coletados no mundo por profissoes de coleta
- **Estrutura:** 5 profissoes x 3 tiers (T1/T2/T3)
- **Uso:** Refinamento (bruto → refinado)
- **Regra de proporcionalidade:** NAO

### 1.3 Recursos de Coleta — Refinados (15 total)
- **Arquivo:** `dados/recursos_coleta.js` (DB_RECURSOS_COLETA, subcategory: 'coleta_refinado')
- **Origem:** Refinamento de brutos na estacao da profissao
- **Estrutura:** 5 profissoes x 3 tiers (T1/T2/T3)
- **Uso:** Ingrediente em receitas de craft (equipamentos e consumiveis)
- **Regra de proporcionalidade:** NAO — quantidades livres (1-5)
- **Refinamento:** T1/T2 = 3 brutos → 1 refinado | T3 = 2 brutos → 1 refinado

### 1.4 Recursos Genericos (11 total)
- **Arquivo:** `dados/recursos_monstros.js` (final do arquivo)
- **Origem:** Drops de combate (sistema legado)
- **Uso:** Sistema de evolucao de armas legado em `sistema/craft.js`
- **IDs:** recurso_ferro, recurso_madeira, recurso_couro, recurso_aco, recurso_mithril, recurso_cristal_azul, recurso_titanio, recurso_essencia_epica, recurso_fragmento_destino, recurso_essencia_lendaria, recurso_oleo
- **Regra:** NAO criar novos genericos. Usar recursos de profissao ou monstro para itens novos

---

## 2. SISTEMA DE PROFISSOES (12 total)

### 2.1 Profissoes de Coleta (5)
Coletam recursos brutos do mundo e refinam em estacoes dedicadas.

| ID | Nome | Recurso Bruto | Recurso Refinado |
|----|------|---------------|------------------|
| mineiro | Mineiro | Minerio Ferro/Cobre/Prata | Lingote Ferro/Cobre/Prata |
| lenhador | Lenhador | Tronco Pinho/Carvalho/Mogno | Tabua Pinho/Carvalho/Mogno |
| pescador | Pescador | Peixe Rio/Prateado/Dourado | File Peixe/Prateado/Dourado |
| fazendeiro | Fazendeiro | Trigo/Linho/Algodao | Farinha/Fio Linho/Tecido Algodao |
| coletor | Coletor | Pele Crua/Tendao/Orgao Vital | Couro Tratado/Tendao Reforcado/Essencia Vital |

### 2.2 Profissoes de Trabalho (7)
Craftam equipamentos e consumiveis usando recursos refinados + drops de monstro.

| ID | Nome | Slots que crafta | Refinados que usa |
|----|------|------------------|-------------------|
| alfaiate | Alfaiate | helmet, cape | Fazendeiro + Lenhador |
| encouracador | Encouracador | chest, bag | Mineiro + Coletor |
| coureiro | Coureiro | boots, belt | Coletor + Fazendeiro |
| joalheiro | Joalheiro | ring, amulet | Mineiro + Pescador |
| armeiro | Armeiro | weapon, weaponLeft | Mineiro + Lenhador |
| alquimista | Alquimista | pocoes, elixires | Diversos refinados + boss drops |
| padeiro | Padeiro | comidas, paes | Fazendeiro + Pescador |

### 2.3 Fluxo de Craft
```
Jogador coleta recurso bruto (5 seg, dropa 1-2, com ferramenta 1-3)
    ↓
Refina na estacao da profissao (T1/T2: 3→1, T3: 2→1)
    ↓
Crafta item final usando refinados + drops de monstro
```

### 2.4 Mapa de Conexoes Coleta → Trabalho
```
Mineiro ──────→ Armeiro (lingotes)
      └───────→ Joalheiro (lingotes)
      └───────→ Encouracador (lingotes)

Lenhador ─────→ Armeiro (tabuas)
      └───────→ Alfaiate (tabuas)

Pescador ─────→ Joalheiro (files)
      └───────→ Padeiro (files)

Fazendeiro ───→ Alfaiate (farinha/fio/tecido)
      └───────→ Coureiro (farinha/fio/tecido)
      └───────→ Padeiro (farinha)

Coletor ──────→ Coureiro (couro/tendao/essencia)
      └───────→ Encouracador (couro/tendao/essencia)
```

### 2.5 Niveis de Profissao e Tiers
- **Nivel 1:** Receitas T1 (recursos T1)
- **Nivel 5:** Receitas T2 (recursos T2)
- **Nivel 10:** Receitas T3 (recursos T3)

---

## 3. FAMILIAS DE MONSTROS (18 total)

### T1 — Nivel 1-5 (6 familias, raridade comum)
| ID | Nome | Comum | Incomum | Raro (Boss) |
|----|------|-------|---------|-------------|
| F1 | Rato | rabo_rato | dente_rato | bigode_rei_rato |
| F2 | Barata | casca_barata | antena_barata | glandula_rainha_barata |
| F3 | Cogumelo | esporo_cogumelo | chapeu_cogumelo | micelio_anciao |
| F4 | Sapo | gosma_sapo | lingua_sapo | olho_patriarca_sapo |
| F5 | Morcego | asa_morcego | presa_morcego | sangue_anciao_morcego |
| F6 | Planta | raiz_viva | seiva_nutritiva | semente_flora |

### T2 — Nivel 6-11 (6 familias, raridade incomum)
| ID | Nome | Comum | Incomum | Raro (Boss) |
|----|------|-------|---------|-------------|
| F7 | Lobo | pele_lobo | presa_lobo | essencia_lobo |
| F8 | Aranha | teia_aranha | glandula_venenosa | presas_viuva |
| F9 | Javali | presa_javali | couro_javali | coracao_patriarca_javali |
| F10 | Esqueleto | osso_polido | cranio_intacto | essencia_morte |
| F11 | Cobra | escama_cobra | veneno_cobra | olho_serpente |
| F12 | Goblin | orelha_goblin | amuleto_goblin | coroa_chefe_goblin |

### T3 — Nivel 12-20 (6 familias, raridade raro)
| ID | Nome | Comum | Incomum | Raro (Boss) |
|----|------|-------|---------|-------------|
| F13 | Urso | pele_urso | garra_urso | essencia_forca |
| F14 | Troll | pele_troll | sangue_troll | coracao_troll_rei |
| F15 | Golem | fragmento_pedra | nucleo_golem | cristal_golem_anciao |
| F16 | Harpia | pluma_harpia | garra_harpia | coroa_rainha_harpia |
| F17 | Lagarto | escama_lagarto | cauda_lagarto | coroa_rei_lagarto |
| F18 | Ogro | dente_ogro | cinto_ogro | olho_chefe_ogro |

**REGRA:** Todo ID de recurso de monstro usa prefixo `recurso_`. Exemplo: `recurso_pele_lobo`

---

## 4. SLOTS DE EQUIPAMENTO

### Slots de Combate (8)
weapon, weaponLeft, helmet, chest, boots, cape, belt, amulet

### Slots de Anel (10)
ring0 a ring9

### Slots de Bolsa (5)
bag0 a bag4

### Slots de Ferramenta (12, 1 por profissao)
tool_mineiro, tool_lenhador, tool_pescador, tool_fazendeiro, tool_coletor, tool_alfaiate, tool_armeiro, tool_coureiro, tool_joalheiro, tool_encouracador, tool_alquimista, tool_padeiro

---

## 5. REGRA DE PROPORCIONALIDADE — RECEITAS

### Recursos de Monstro (OBRIGATORIO seguir)
Comum dropa ~5x mais que Incomum, ~33x mais que Raro. Receitas devem consumir na mesma proporcao:

| Tier | Comum | Incomum | Raro (Boss) |
|------|-------|---------|-------------|
| T1 | 6-10 | 2 | 1 boss drop |
| T2 | 10-12 | 3-4 | 1 raro + 1 boss drop |
| T3 | 12-18 | 4-6 | 1-2 raro + 1 boss drop |

### Recursos Refinados de Profissao (NAO seguir proporcionalidade)
Quantidades livres de 1 a 5. Servem tambem para refinamentos e futuros sistemas.

### Exemplo pratico
```javascript
// T2 — Correto (segue proporcionalidade para monstro, livre para refinado)
materiais: [
    { itemId: 'recurso_teia_aranha', quantidade: 10 },      // comum: 10
    { itemId: 'recurso_glandula_venenosa', quantidade: 3 },  // incomum: 3
    { itemId: 'recurso_presas_viuva', quantidade: 1 },       // raro/boss: 1
    { itemId: 'refinado_fio_linho', quantidade: 3 }           // refinado: livre
]
```

---

## 6. SISTEMA DE RARIDADE

| Raridade | Cor | Multiplicador | Restricao |
|----------|-----|---------------|-----------|
| comum | #666666 (cinza) | 1.0x | nenhuma |
| incomum | #44dd44 (verde) | 1.2x | nenhuma |
| raro | #ffa500 (laranja) | 1.5x | nenhuma |
| epico | #ee4499 (rosa) | 2.0x | max 1 equipado |
| lendario | #9944ee (roxo) | 3.0x | max 1 equipado |

### Taxas de Drop por Categoria
**Recursos:** comum 50%, incomum 25%, raro 18%, epico 5%, lendario 1%
**Equipamentos:** comum 40%, incomum 15%, raro 6%, epico 1.5%, lendario 0.3%
**Consumiveis:** comum 60%, incomum 35%, raro 12%, epico 3%, lendario 0.5%

---

## 7. TIPOS DE ITEM E COMO CRIAR

### 7.1 Equipamento de Conjunto (setId)
- Pertence a uma familia de monstro
- Tem `setId: 'conjunto_<familia>'`
- 4 pecas por familia: helmet, chest, boots, belt
- Receita usa recursos da MESMA familia + refinados
- Arquivo: `equipamentos/conjuntos_monstros.js`

### 7.2 Equipamento Hibrido (sem setId)
- NAO pertence a nenhum conjunto
- Usa recursos de 2-3 familias DIFERENTES
- Pode usar qualquer slot (ring, bag, weapon, etc.)
- Oferece builds unicas (ex: evasao/sorte, tank/mobilidade)
- Arquivo: `equipamentos/hibridos.js`

### 7.3 Consumivel (comida/pocao/elixir)
- Efeito temporario (cura, buff, restaura PA/PM)
- Tem `materiais` embutido no proprio item (NAO vai em receitas.js)
- Padeiro faz comidas, Alquimista faz pocoes/elixires
- Arquivo: `dados/consumiveis.js`

### 7.4 Ferramenta de Profissao
- Slot: `tool`, com `profissao` especificando qual
- Bonus: +50% chance de yield extra
- Receita vai em `sistema/receitas.js`
- Arquivo: `equipamentos/ferramentas.js`

### 7.5 Arma (weapon)
- Deve ter `ability` com habilidade de combate
- Campos obrigatorios da ability: name, icon, paCost, pmCost, peCost, minRange, maxRange, rangeType, damage, element, targetType
- Arquivo: `equipamentos/armas.js` (base) ou `equipamentos/hibridos.js` (hibrido)

---

## 8. ESTRUTURA OBRIGATORIA DE TODO ITEM

```javascript
{
    id: 'prefixo_nome_unico',        // OBRIGATORIO — ID unico
    catalogId: '0000000000',          // OBRIGATORIO — 10 digitos
    name: 'Nome Legivel',             // OBRIGATORIO
    icon: '🔮',                       // OBRIGATORIO — emoji fallback
    svgIcon: { shape: 'id', palette: 'paleta' },  // OBRIGATORIO — ver secao 9
    category: 'equipment|consumable|resource|tool', // OBRIGATORIO
    // ... campos especificos do tipo
}
```

### Prefixos de ID por tipo
- Equipamento conjunto: `capacete_`, `peitoral_`, `botas_`, `cinto_`, `capa_`, `amuleto_`
- Equipamento hibrido: `hibrido_`
- Consumivel: `cons_`
- Recurso coleta bruto: `coleta_`
- Recurso coleta refinado: `refinado_`
- Recurso monstro: `recurso_`
- Ferramenta: `ferramenta_`
- Arma: nome direto (ex: `espada_ferro`)

### Padrao de CatalogId (10 digitos)
```
SSTTRRFFFF
SS = Slot (01=helmet, 02=chest, 03=resource, 04=boots, 05=cape, 06=belt, 07=bag, 08=tool, 09=hybrid)
TT = Tier/Tipo
RR = Subtipo
FFFF = Familia/Sequencia
```

- Equipamentos conjunto: `01SS + 10/20/30 + 00 + FFFF`
- Armas: `0201 + TT + 00 + FFFF`
- Recursos coleta: `0303 + 00 + 00 + sequencia`
- Consumiveis: `0401 + 00 + 00 + sequencia`
- Recursos monstro: `0301 + 00 + 0 + familia + raridade`
- Hibridos: `0109 + 00 + 00 + sequencia`
- Ferramentas: `0108 + 00 + 00 + sequencia`

---

## 9. ICONE SVG — OBRIGATORIO PARA TODO ITEM

### Regra Absoluta
**Todo item novo DEVE ter um icone SVG personalizado.** Sem excecao.

### Formato
- ViewBox: `0 0 512 512`
- Zonas: `body` (cor principal), `detail` (cor secundaria), `accent` (destaque), `gem` (brilho/joia)
- Arquivo: `dados/icones_equipamentos.js` no array da categoria correta
- Referencia no item: `svgIcon: { shape: 'id-do-icone', palette: 'id-da-paleta' }`

### 16 Paletas Disponiveis
| ID | Tema | Quando usar |
|----|------|-------------|
| iron | Ferro/metal | itens metalicos comuns |
| gold | Ouro | itens dourados, sagrados |
| fire | Fogo | fogo, lava, chamas |
| ice | Gelo/agua | gelo, agua, frio |
| nature | Natureza | plantas, floresta |
| arcane | Arcano | magia, mistico |
| shadow | Sombrio | escuridao, noite |
| ember | Brasa | quente, alaranjado |
| coral | Coral | rosa, feminino |
| jade | Jade | verde-azulado, veneno |
| bone | Osso | neutro claro, ossos |
| blood | Sangue | vermelho escuro, morte |
| silver | Prata | metal prateado, raro |
| copper | Cobre | metal acobreado |
| void | Vazio | escuro total, vazio |
| holy | Sagrado | dourado brilhante, divino |

### Como traduzir nomes em icones
O icone deve ser reconhecivel em 36px. Preferir silhuetas bold e simples.

| Nome do Item | O que desenhar |
|-------------|----------------|
| Pata de Lobo | Silhueta de pata |
| Capacete de Lobo | Elmo com orelhas de lobo |
| Anel da Serpente | Anel com cobra enrolada |
| Sopa de Peixe | Tigela com peixe |
| Machado do Caos | Machado de duas laminas |

---

## 10. RECEITAS — ONDE COLOCAR

| Tipo de item | Onde vai a receita |
|-------------|-------------------|
| Equipamento (conjunto ou hibrido) | `sistema/receitas.js` no array DB_RECEITAS_CRAFT |
| Ferramenta | `sistema/receitas.js` no array DB_RECEITAS_CRAFT |
| Consumivel (comida/pocao) | Embutido no proprio item em `dados/consumiveis.js` campo `materiais` |
| Refinamento (bruto→refinado) | `sistema/profissoes.js` no array REFINAMENTO_RECIPES |

### Estrutura de receita em receitas.js
```javascript
{
    id: 'craft_nome',
    resultado: 'id_do_item_resultado',
    profissao: 'nome_da_profissao',
    nivelProfissao: 1,  // 1, 5 ou 10
    tier: 1,            // 1, 2 ou 3
    materiais: [
        { itemId: 'recurso_xxx', quantidade: 8 },
        { itemId: 'refinado_xxx', quantidade: 2 }
    ]
}
```

---

## 11. REGRAS GERAIS

### Ao criar um NOVO ITEM
1. Verificar se o slot ja tem cobertura suficiente
2. Criar icone SVG personalizado (OBRIGATORIO)
3. Seguir proporcionalidade de recursos de monstro nas receitas
4. Usar prefixo de ID correto
5. Atribuir catalogId seguindo o padrao existente
6. Adicionar receita no local correto
7. Se for novo arquivo .js, adicionar tag `<script>` em `jogo/dev.html`

### Ao criar uma NOVA PROFISSAO
1. Adicionar ao PROFESSION_DEFINITIONS em `sistema/profissoes.js`
2. Definir tipo (coleta ou trabalho) e slots que crafta
3. Se coleta: criar 3 recursos brutos + 3 refinados + receitas de refinamento
4. Criar ferramenta em `equipamentos/ferramentas.js`
5. Adicionar tool slot em dev.html (TOOL_SLOTS, playerEquipment, HTML)
6. Atualizar este documento

### Ao criar um NOVO MONSTRO/FAMILIA
1. Criar 3 drops (comum, incomum, raro/boss) em `dados/recursos_monstros.js`
2. Criar 4 equipamentos de conjunto em `equipamentos/conjuntos_monstros.js`
3. Criar 4 receitas correspondentes em `sistema/receitas.js`
4. Criar icones SVG para os 3 drops + 4 equipamentos (7 icones)
5. Seguir proporcionalidade de recursos nas receitas

### Principio fundamental
**Todo recurso deve ter uso.** Se um recurso existe, ele deve ser consumido em pelo menos uma receita. Se nao tem uso, ou criar receita para ele ou remover o recurso.

---

## 12. ARQUIVOS-CHAVE (referencia rapida)

| Arquivo | Conteudo |
|---------|----------|
| `jogo/dev.html` | Arquivo principal do jogo (HTML+CSS+JS) |
| `dados/recursos_coleta.js` | 30 recursos (15 brutos + 15 refinados) |
| `dados/recursos_monstros.js` | 54 drops de monstro + 11 genericos |
| `dados/consumiveis.js` | Consumiveis (Padeiro + Alquimista) |
| `dados/icones_equipamentos.js` | Biblioteca SVG + paletas + funcoes render |
| `dados/gerador_icones.js` | Gerador procedural de icones |
| `equipamentos/conjuntos_monstros.js` | 72 equipamentos (18 familias x 4) |
| `equipamentos/hibridos.js` | 13 itens cross-familia |
| `equipamentos/armas.js` | Armas base com habilidades |
| `equipamentos/ferramentas.js` | Ferramentas de profissao |
| `equipamentos/bolsas.js` | Bolsas (aumentam inventario) |
| `equipamentos/lendarios.js` | Itens lendarios |
| `sistema/profissoes.js` | Definicoes de profissao + refinamento |
| `sistema/receitas.js` | Receitas de craft (equipamentos + hibridos) |
| `sistema/drops.js` | Sistema de drops + multiplicadores |
| `sistema/raridade.js` | Raridades + cores + restricoes |
| `sistema/craft.js` | Sistema legado de evolucao de armas |

---

## 13. CHECKLIST ANTES DE FINALIZAR

Ao terminar de criar conteudo novo, verificar:

- [ ] Todo item tem `svgIcon` com icone SVG criado
- [ ] Todo item tem `catalogId` unico de 10 digitos
- [ ] Toda receita segue proporcionalidade (recursos monstro)
- [ ] Todo recurso novo tem pelo menos 1 uso em receita
- [ ] Todo boss drop tem uso em pelo menos 1 receita
- [ ] Arquivos .js novos tem `<script>` em dev.html
- [ ] Profissoes novas tem tool slot em dev.html
- [ ] IDs nao duplicam com existentes

---

## 14. REGRAS DE AURAS E ZONAS

### 14.1 Tipos de Aura/Zona

- **groundEffect**: efeito fixo em celulas especificas (ex: Ardente no chao). Usa `combatState.groundEffects[]`. Tem duracao por turnos. Se uma nova zona e criada na mesma celula, a celula antiga e substituida.
- **passiveZone (aura de invocacao)**: bonus passivo calculado em tempo real baseado na distancia entre a invocacao e o alvo. Usa `combatState.activeSummons[].aura`. Nao tem duracao — dura enquanto a invocacao estiver viva.

### 14.2 Sobreposicao de Auras

- Auras de tipos diferentes (groundEffect + passiveZone) **coexistem sem conflito** — sao sistemas independentes.
- Multiplas auras passiveZone de invocacoes diferentes **stackam** (ex: 2 Bandeiras = dobro do bonus).
- Ground effects de fontes diferentes na MESMA celula **NAO stackam** — a nova substitui a antiga naquela celula.
- Uma entidade pode estar simultaneamente em uma zona de groundEffect E na area de uma aura passiveZone sem problemas.

### 14.3 Regras ao Criar Nova Aura

Ao criar qualquer feitico ou invocacao com aura:

1. Definir o **tipo**: `groundEffect` (celulas fixas) ou `passiveZone` (raio dinamico)
2. Se passiveZone, definir: `range`, `target` ('allies'/'enemies'/'all'), e os bonus especificos
3. O bonus deve ser aplicado no ponto correto do calculo de dano/cura em `mecanicas/dano.js`
4. Verificar se o bonus pode stackar com auras existentes e se o resultado e equilibrado
5. Se nao deve stackar, adicionar checagem de `summonType` no loop para pegar apenas 1 aura desse tipo

# Design das Classes - Betta RPG

> **Versao:** 3.0
> **Data:** 2026-02-15

---

## NOMENCLATURA DAS CLASSES

No Betta RPG, o nome da classe E a identidade do personagem — nao e "um guerreiro chamado Orik", e simplesmente "um Orik". Pode ser homem ou mulher. O nome define a raca/classe como um todo.

| Classe | Nome | Origem | Por que funciona |
|--------|------|--------|-----------------|
| Guerreiro | **Orik** | Som de "iron/ferro" em linguas nordicas | Solido, forte, memoravel. Soa como alguem que voce nao quer irritar. |
| Atirador | **Zefir** | De "Zefiro", o vento oeste | Elegante, aereo, rapido. O vento que voce nao ve chegando. |
| Cacador | **Garren** | De "Garra" | Predatorio, gutural, animalesco. O som do G+R remete a rosnar. |
| Guardiao | **Aegis** | Escudo mitologico grego de Zeus/Atena | Protecao mitica, iquebravel. Nome que ja carrega o significado. |
| Clerigo | **Klaris** | De "Claridade/Clareza" | Puro, luminoso, transparente. Soa gentil mas com autoridade. |
| Berserker | **Kaos** | De "Caos" | Direto, agressivo, instavel. Voce sabe exatamente o que esperar. |

### Uso no Jogo
- "Escolha sua classe: Orik, Zefir, Garren, Aegis, Klaris ou Kaos"
- "O Orik avancou 3 celulas" (nao "O Guerreiro avancou")
- "Um Kaos com 50% HP e a coisa mais perigosa do campo"
- "A Klaris curou o time inteiro"

---

## REGRAS GERAIS DE DESIGN VISUAL

### Estilo Visual Global
- Proporcoes levemente chibi (cabeca grande, corpo compacto)
- 3D low-poly estilizado, texturas pintadas (painterly)
- Sem armas ou escudos (equipamentos sao adicionados separadamente)
- Pose neutra/idle (de pe, relaxado)
- Expressao facial neutra ou ligeiramente confiante
- Fundo transparente/limpo
- Referencia visual: RPG tatico, chibi/stylized proportions

### O que DEVE estar presente
- Roupa/armadura caracteristica da classe
- Cores do elemento principal visivel na roupa
- Detalhes que identifiquem a funcao (mas sem armas)
- Silhueta distinta de cada classe (reconhecivel mesmo pequeno)

### O que NAO deve ter
- Armas (espadas, arcos, cajados, escudos)
- Efeitos magicos ou particulas
- Cenario/background
- Outros personagens

---

## 1. ORIK — "Lamina Inabalavel"

> *"O ferro nao recua."*

### Nome
| Campo | Valor |
|-------|-------|
| **Nome** | Orik |
| **Origem** | Som de "iron/ferro" em linguas nordicas |
| **Por que funciona** | Solido, forte, memoravel. Soa como alguem que voce nao quer irritar. |

### Identidade
| Campo | Valor |
|-------|-------|
| **Papel** | DPS Corpo a Corpo |
| **Dificuldade** | Facil |
| **Alcance** | 1-4 celulas |
| **Fantasia** | Soldado de elite, cavaleiro sem escudo |

### Elementos
| Elemento | Peso | Papel no Kit |
|----------|------|-------------|
| Fogo | Principal | Alto dano CAC, queimaduras, roubo de armor |
| Terra | Secundario | Tanque, shields, stuns, reducao de PM |
| Ar | Terciario | Mobilidade, dashes, troca de posicao |

### Pontos Fortes
- Dano corpo a corpo alto e consistente
- Roubo de armadura enfraquece o inimigo enquanto fortalece a si mesmo
- Mobilidade boa para um melee (Salto Heroico, Investida)
- Facil de aprender, recompensador de dominar
- Ganha PA ao matar (trigger onKill) = snowball de turnos explosivos
- Ganha armor ao bloquear (trigger onBlock) = recompensa posicionamento

### Pontos Fracos
- Precisa estar perto para causar dano (vulneravel a kiting)
- Sem cura propria significativa
- Alcance limitado contra Zefirs e Klaris
- Depende de fechar distancia para ser util

### DOM — "Sede de Batalha"
**Mecanica**: Quando causa mais de 150 de dano em um unico golpe, ganha +1 PE (1x/turno)
**Fantasia**: O Orik se alimenta do combate — quanto mais devastador o golpe, mais energia ele acumula. Recompensa jogadas agressivas e bem calculadas.

### Personalidade
- Confiante e direto — fala pouco, age muito
- Disciplinado mas nao rigido — sabe improvisar no campo de batalha
- Leal e protetor com aliados, implacavel com inimigos
- Nao e burrao — e um soldado experiente que sabe o que faz
- Gosta de desafios 1v1, respeita adversarios fortes

### Cultura / Origem
- Vem de uma cultura de forja e combate — valoriza o aco, o fogo, o suor
- Treinado desde jovem em arenas ou campos de batalha
- Nao e nobre/cavaleiro — e mais soldado/mercenario de elite
- Marcas de batalha (cicatrizes) sao motivo de orgulho
- Elemento fogo reflete a paixao e intensidade no combate

### Tipo de Corpo
- Atletico e musculoso, proporcional — nao e um tanque gigante (isso e o Aegis)
- Ombros largos, cintura definida, bracos fortes
- Postura firme e equilibrada, pronto para reagir
- Altura media — nao e o maior, mas e o mais solido

### Opcoes de Penteado
| Opcao | Descricao | Vibe |
|-------|-----------|------|
| A | Curto e espetado para cima, estilo militar | Pratico, soldado |
| B | Raspado dos lados, topo medio para tras | Moderno, agressivo |
| C | Curto e bagunçado, pos-batalha | Descontraido, veterano |
| D | Rabo de cavalo curto, preso atras | Funcional, disciplinado |

### Opcoes de Roupa
| Opcao | Descricao | Vibe |
|-------|-----------|------|
| A | Armadura media de placas — peitoral metalico, ombreiras, botas pesadas, cinto largo | Soldado classico, funcional |
| B | Couro reforçado com placas parciais — mais leve, partes metalicas nos pontos vitais | Mercenario agil, pratico |
| C | Tunica de combate com peitoral — tecido grosso com placas sobrepostas, braceletes | Espadachim, estilo oriental |
| D | Armadura de forja — detalhes de engrenagens, rebites, estetica industrial | Ferreiro guerreiro, unico |

### Acessorios Possiveis
- Cicatriz no rosto ou braco (marca de veterano)
- Luvas de combate pesadas (com ou sem dedos)
- Capa curta em um ombro so (estilo capa de legionario)
- Cinto largo com fivela de metal trabalhada
- Braceletes de metal nos antebracos
- Corrente ou medalha no pescoco (insígnia militar)

### Paleta de Cores
| Cor | Hex | Uso |
|-----|-----|-----|
| Vermelho Fogo | `#C62828` | Detalhes da armadura, capa curta |
| Cinza Aco | `#546E7A` | Placas metalicas, ombreiras |
| Marrom Couro | `#5D4037` | Cinto, luvas, partes de couro |
| Dourado Fivela | `#FFA000` | Fivelas, bordas da armadura |

### Geração LudoAI — Orik
| Filtro | Valor |
|--------|-------|
| Plataforma | Area de trabalho |
| Generos | Estrategia |
| Estilo artistico | Low Poly ou Cartoon |
| Perspectiva | Frontal ou 3/4 |
| Proporcao da tela | 1:1 |
| Cores (seletor) | **Vermelho**, **Laranja** |
| Cores (no prompt) | steel gray, dark brown leather tones |

**Prompt:**
```
3D stylized RPG warrior character, chibi proportions, idle standing pose, medium plate armor with leather details, large shoulder pads, heavy combat boots, wide belt with buckle, short spiky hair, confident expression, athletic muscular build, red and steel gray color scheme with gold trim, no weapons, no shield, clean background, low poly painterly cartoon RPG style
```

---

## 2. ZEFIR — "Sombra Silente"

> *"O vento nao deixa rastro."*

### Nome
| Campo | Valor |
|-------|-------|
| **Nome** | Zefir |
| **Origem** | De "Zefiro", o vento oeste na mitologia grega |
| **Por que funciona** | Elegante, aereo, rapido. O vento que voce nao ve chegando. |

### Identidade
| Campo | Valor |
|-------|-------|
| **Papel** | DPS a Distancia |
| **Dificuldade** | Facil |
| **Alcance** | 4-12 celulas |
| **Fantasia** | Arqueiro/franco-atirador agil e evasivo |

### Elementos
| Elemento | Peso | Papel no Kit |
|----------|------|-------------|
| Ar | Principal | Maximo alcance, empurrao, roubo de PM |
| Fogo | Secundario | Dano medio, AoEs, queimaduras |
| Agua | Terciario | Utilidade, slow de PM, veneno, controle |

### Pontos Fortes
- Maior alcance do jogo (ate 12 celulas)
- Roubo de PM imobiliza inimigos (impede que cheguem perto)
- Excelente kiting — ataca de longe e se reposiciona
- Rolamento Tatico e Sombra Fugaz garantem fuga
- Ganha PM ao matar (trigger onKill) = mobilidade infinita em snowball
- Dificil de alcancar quando bem posicionado

### Pontos Fracos
- HP mais baixo do jogo (90 base)
- Dano individual por golpe menor que outras classes
- Fragil em combate corpo a corpo
- Range minimo alto (4+) = ponto cego perto de si
- Sem sustain (nenhuma cura ou lifesteal)

### DOM — "Concentracao Fatal"
**Mecanica**: Se nao se mover no turno, ganha +30% dano e +1 PE
**Fantasia**: O Zefir que fica parado, mirando com cuidado, desfere golpes devastadores. Recompensa planejamento de posicao antecipado — voce precisa JA estar no lugar certo.

### Personalidade
- Calmo, observador, paciente — fala so quando necessario
- Lobo solitario por natureza, mas leal quando confia em alguem
- Calculista e frio em combate — nunca age por impulso
- Prefere evitar o confronto direto — "se voce me viu, ja era tarde"
- Sutil e discreto, se mistura no ambiente

### Cultura / Origem
- Nomade — vive entre florestas, montanhas, telhados de cidades
- Nao pertence a nenhuma organizacao — valoriza liberdade acima de tudo
- Treinado por necessidade, nao por tradicao — aprendeu sozinho ou com um mentor recluso
- Elemento ar reflete sua natureza: invisivel, onipresente, impossivel de prender
- Valoriza silencio, precisao e eficiencia

### Tipo de Corpo
- Magro e agil — corpo de corredor/escalador
- Nao musculoso, mas definido — cada musculo tem funcao
- Postura levemente inclinada para frente, pronto para correr ou se abaixar
- Mais baixo que o Orik — silhueta fina e estreita

### Opcoes de Penteado
| Opcao | Descricao | Vibe |
|-------|-----------|------|
| A | Coberto pelo capuz, mechas saindo na frente | Misterioso, classico ranger |
| B | Medio liso, caindo nos olhos, parcialmente tampando um olho | Enigmatico, frio |
| C | Curto e desfiado, estilo pratico de viajante | Nomade, funcional |
| D | Preso em coque baixo com mechas soltas | Elegante mas pratico |

### Opcoes de Roupa
| Opcao | Descricao | Vibe |
|-------|-----------|------|
| A | Capa longa com capuz + colete de couro ajustado + calca fina + botas de escalada | Ranger classico, furtivo |
| B | Poncho curto + camisa de manga longa + calca com amarracoes nas pernas | Nomade viajante, leve |
| C | Jaqueta de couro curta + lenco no pescoco + calca com bolsos laterais | Cacador urbano, moderno |
| D | Tunica leve com capuz integrado + faixas nos bracos + botas altas | Assassino elegante, estilo oriental |

### Acessorios Possiveis
- Capuz (identidade visual forte — quase obrigatorio)
- Cinto com bolsas/frascos pequenos
- Pulseiras de corda ou couro fino
- Lenco/bandana cobrindo parte do rosto (opcional)
- Aljava vazia nas costas (referencia ao arco, sem flechas)
- Goggle/oculos no capuz ou testa (estilo steampunk sutil, opcional)

### Paleta de Cores
| Cor | Hex | Uso |
|-----|-----|-----|
| Verde Floresta | `#2E7D32` | Capa, capuz |
| Marrom Escuro | `#3E2723` | Colete de couro, botas |
| Bege Areia | `#D7CCC8` | Camisa interna, detalhes |
| Verde Oliva | `#558B2F` | Cinto, acessorios |

### Geração LudoAI — Zefir
| Filtro | Valor |
|--------|-------|
| Plataforma | Area de trabalho |
| Generos | Estrategia |
| Estilo artistico | Low Poly ou Cartoon |
| Perspectiva | Frontal ou 3/4 |
| Proporcao da tela | 1:1 |
| Cores (seletor) | **Verde** |
| Cores (no prompt) | dark brown, sand beige, olive green |

**Prompt:**
```
3D stylized RPG ranger character, chibi proportions, idle standing pose, light leather armor, long hooded cloak, fitted pants, thin climbing boots, lean agile build, slightly crouched ready stance, small belt pouches, forest green and dark brown color scheme, no bow, no arrows, no weapons, clean background, low poly painterly cartoon RPG style
```

---

## 3. GARREN — "Predador Sombrio"

> *"Mata para viver, vive para matar."*

### Nome
| Campo | Valor |
|-------|-------|
| **Nome** | Garren |
| **Origem** | De "Garra" |
| **Por que funciona** | Predatorio, gutural, animalesco. O som do G+R remete a rosnar. |

### Identidade
| Campo | Valor |
|-------|-------|
| **Papel** | Bruiser Versatil |
| **Dificuldade** | Medio |
| **Alcance** | 2-7 celulas |
| **Fantasia** | Predador selvagem, instinto animal, cacador tribal |

### Elementos
| Elemento | Peso | Papel no Kit |
|----------|------|-------------|
| Agua | Principal | Roubo de vida, cura agressiva, sustain |
| Terra | Secundario | Controle, reducao de PM, push, prisao |
| Ar | Terciario | Mobilidade, push/pull, troca de posicao |

### Pontos Fortes
- Melhor sustain do jogo (lifesteal em quase tudo)
- Alcance versatil (2-7) — nem melee puro nem ranged puro
- Push/pull forte reposiciona inimigos
- Troca de posicao (Troca Tatica) = utilidade tatica enorme
- Triggers robustos: onKill rouba HP/PM/Shield, onHitTaken ganha Shield
- Dificil de matar gracas ao lifesteal constante

### Pontos Fracos
- Dano individual menor que Orik ou Kaos
- "Faz de tudo, mas nao e o melhor em nada"
- Depende de acertar ataques para se curar (se errar, nao tem sustain)
- Nao tem armor forte como Aegis
- Mecanicas de push/pull podem acidentalmente ajudar o inimigo se mal usadas

### DOM — "Instinto de Sobrevivencia"
**Mecanica**: Quando cai abaixo de 30% HP, o proximo ataque cura 100% do dano causado e ganha +2 PE (1x/combate)
**Fantasia**: O Garren acuado e o mais perigoso. Quando quase morrendo, o instinto animal desperta e ele reverte a situacao com um golpe desesperado mas devastador.

### Personalidade
- Instintivo — age pelo faro, nao pela logica
- Leal a "matilha" (o grupo), feroz com estranhos ate ganhar confianca
- Silencioso mas atento — percebe coisas que os outros nao veem
- Nao e selvagem burro — e inteligente de um jeito primitivo e pratico
- Competitivo, marca territorio, nao aceita ser dominado
- Quando fala, e direto e sem rodeios

### Cultura / Origem
- Tribal/cla — vive em comunidades pequenas ligadas a natureza
- Rituais de caca, pintura de guerra, respeito a presa
- Elemento agua (lifesteal) reflete o ciclo de vida — matar para viver, devolver a natureza
- Conexao espiritual com animais predadores (lobos, felinos, aves de rapina)
- Cicatrizes rituais e pinturas corporais contam a historia do individuo
- DOM "Forma Draconica" sugere linhagem ancestral ligada a dragoes

### Tipo de Corpo
- Atletico e flexivel — corpo de predador, nao de lutador
- Musculatura definida mas nao exagerada — feito para velocidade E forca
- Postura mais baixa, agachada — centro de gravidade baixo
- Movimentos fluidos, quase animalescos

### Opcoes de Penteado
| Opcao | Descricao | Vibe |
|-------|-----------|------|
| A | Longo, selvagem e solto — cai nos ombros, desalinhado | Predador livre, animal |
| B | Dreads/tranças tribais com contas de osso/madeira | Ritual, ancestral |
| C | Moicano largo com laterais mais curtas | Agressivo, tribal guerreiro |
| D | Medio bagunçado, preso com tiras de couro em pontos aleatorios | Pratico, selvagem |

### Opcoes de Roupa
| Opcao | Descricao | Vibe |
|-------|-----------|------|
| A | Peles de animal + kilt de couro + pernas com amarracoes + peito parcialmente exposto | Tribal classico, primitivo |
| B | Colete de couro curtido + calca de pele + capa curta de pele no ombro | Cacador pratico, funcional |
| C | Armadura de couro com escamas/placas de osso costuradas + saia de tiras | Guerreiro tribal, mais protegido |
| D | Tunica curta de pele + faixas no torso + perneiras de couro com pelo | Nomade da floresta, leve |

### Acessorios Possiveis
- Colar de dentes/garras de animais cacados (quase obrigatorio — identidade do Garren)
- Pintura de guerra no rosto e bracos (azul/branco — ligacao com agua)
- Braceletes de osso esculpido
- Tiras de couro amarrando partes do corpo (funcional, primitivo)
- Capa curta de pele de animal em um ombro
- Marcas/cicatrizes rituais nos bracos ou peito
- Penas ou dentes trancados no cabelo

### Paleta de Cores
| Cor | Hex | Uso |
|-----|-----|-----|
| Azul Profundo | `#1565C0` | Pintura de guerra, detalhes de agua |
| Marrom Pele | `#6D4C41` | Couro, peles |
| Bege Osso | `#D7CCC8` | Ossos decorativos, dentes |
| Verde Musgo | `#33691E` | Capa de pele, detalhes naturais |

### Geração LudoAI — Garren
| Filtro | Valor |
|--------|-------|
| Plataforma | Area de trabalho |
| Generos | Estrategia |
| Estilo artistico | Low Poly ou Cartoon |
| Perspectiva | Frontal ou 3/4 |
| Proporcao da tela | 1:1 |
| Cores (seletor) | **Azul**, **Verde** |
| Cores (no prompt) | dark brown, bone white, moss green |

**Prompt:**
```
3D stylized RPG tribal hunter character, chibi proportions, idle crouched stance, primitive leather and fur armor, bone ornaments necklace, war paint markings on face and arms, wild untamed long hair, animal skin short cape, leather kilt, wrapped leg bindings, athletic feral build, blue and brown color scheme, no weapons, no claws, clean background, low poly painterly cartoon RPG style
```

---

## 4. AEGIS — "Bastiao Eterno"

> *"Atras de mim, ninguem passa."*

### Nome
| Campo | Valor |
|-------|-------|
| **Nome** | Aegis |
| **Origem** | Escudo mitologico grego de Zeus e Atena |
| **Por que funciona** | Protecao mitica, inquebravel. O nome ja carrega o significado — todo mundo sabe o que um Aegis faz so pelo nome. |

### Identidade
| Campo | Valor |
|-------|-------|
| **Papel** | Tank Puro |
| **Dificuldade** | Medio |
| **Alcance** | 1-3 celulas |
| **Fantasia** | Protetor inabalavel, fortaleza humana |

### Elementos
| Elemento | Peso | Papel no Kit |
|----------|------|-------------|
| Terra | Principal | Defesa, armor massivo, Estabilizado |
| Fogo | Secundario | Dano moderado, reflexo de dano |
| Agua | Terciario | Cura, shield para aliados, suporte |

### Pontos Fortes
- Maior HP base do jogo (140)
- Armor massivo — quase impossivel de derrubar com dano fisico
- Estabilizado impede push/pull (anti-controle)
- Compartilha armor com aliados (suporte defensivo)
- Provocar forca inimigos a atacar voce (protege aliados)
- Triggers defensivos empilham: onHitTaken ganha armor+res, onBlock ganha PA+armor+shield
- Resgate Heroico troca posicao com aliado e da shield

### Pontos Fracos
- Menor PM do jogo (2 base) — extremamente lento
- Menor PA (5 base) — menos acoes por turno
- Dano mais baixo de todas as classes
- Alcance curtissimo (1-3) — inimigos a distancia o ignoram
- Se o inimigo simplesmente fugir, o Aegis nao consegue acompanhar
- Sem mobilidade nenhuma (sem dash, sem teleporte ofensivo)

### DOM — "Determinacao Ferrea"
**Mecanica**: Enquanto tiver armor ativo, ganha +1 PE no turno (1x/turno)
**Fantasia**: A inabalavel determinacao do Aegis se manifesta como energia pura. Enquanto sua armadura aguenta, ele se torna cada vez mais forte. Recompensa manter armor ativo o tempo todo.

### Personalidade
- Estoico — poucas palavras, acoes pesadas
- Protetor por natureza — se posiciona entre o perigo e os aliados instintivamente
- Teimoso e imovel (literal e figurativamente) — nao muda de opiniao facil
- Calmo sob pressao — quanto mais caótico ao redor, mais tranquilo ele fica
- Nao busca gloria — se o time sobreviveu, o trabalho foi feito
- Paciencia infinita — pode esperar horas sem reclamar

### Cultura / Origem
- Ordem de sentinelas/guardioes — treinados para proteger, nao para atacar
- Dever acima de tudo — juramentos e promessas sao sagrados
- Elemento terra reflete sua natureza: imovel, eterno, fundacao
- Armadura e parte da identidade — um Aegis sem armadura se sente nu
- Cultura de servico — proteger os fracos e o proposito, nao a recompensa
- Rituais de vigilia — meditacao em pe, imóvel por horas

### Tipo de Corpo
- LARGO e robusto — o mais largo de todas as classes
- Nao necessariamente alto, mas grosso — parece um bloco
- Ombros enormes, torso como barril, pernas grossas como troncos
- Postura plantada no chao — parece impossivel de derrubar
- Pescoço grosso, mandibula forte

### Opcoes de Penteado
| Opcao | Descricao | Vibe |
|-------|-----------|------|
| A | Careca/raspado com barba curta e densa | Militar, imponente |
| B | Curto e rente, estilo buzz cut, sem barba | Funcional, limpo |
| C | Curto com barba longa trancada | Anao guerreiro, ancestral |
| D | Medio para tras, preso, com costeletas grossas | Disciplinado, veterano |

### Opcoes de Roupa
| Opcao | Descricao | Vibe |
|-------|-----------|------|
| A | Armadura de placas completa pesadissima — peitoral grosso, ombreiras enormes, protecao total | Fortaleza ambulante, tanque classico |
| B | Armadura cerimonial — placas ornamentadas com simbolos de protecao gravados, capa curta | Sentinela sagrado, ritualista |
| C | Armadura de pedra/terra — placas que parecem rocha esculpida, textura mineral | Golem vivo, ligacao com terra |
| D | Armadura de camadas — multiplas placas sobrepostas como escamas grossas, visual de muralha | Escamas de dragao, medieval pesado |

### Acessorios Possiveis
- Emblema/simbolo de protecao no peito (identidade visual forte)
- Capa curta e grossa nas costas (nao longa — nao quer algo que atrapalhe)
- Cinto largo com fivela grande ornamentada
- Ombreiras desproporcionalmente grandes (exagera a largura)
- Marcas/gravuras na armadura (historico de servico)
- Barba (opcional mas combina muito)

### Paleta de Cores
| Cor | Hex | Uso |
|-----|-----|-----|
| Marrom Terra | `#5D4037` | Armadura principal |
| Dourado | `#FFB300` | Emblema, bordas, fivelas |
| Cinza Pedra | `#78909C` | Placas metalicas |
| Bege Areia | `#A1887F` | Capa, detalhes de tecido |

### Geração LudoAI — Aegis
| Filtro | Valor |
|--------|-------|
| Plataforma | Area de trabalho |
| Generos | Estrategia |
| Estilo artistico | Low Poly ou Cartoon |
| Perspectiva | Frontal ou 3/4 |
| Proporcao da tela | 1:1 |
| Cores (seletor) | **Amarelo**, **Laranja**, **Cinza** |
| Cores (no prompt) | brown earth, stone gray, sand beige |

**Prompt:**
```
3D stylized RPG tank guardian character, chibi proportions, idle standing pose, very heavy full plate armor, massive shoulder pads, thick chest plate with protection emblem, heavy leg guards, huge boots, short cape on back, large belt buckle, wide robust stocky build, serious determined face, brown earth and gold color scheme, no shield, no weapons, clean background, low poly painterly cartoon RPG style
```

---

## 5. KLARIS — "Luz Divina"

> *"Enquanto eu respirar, ninguem cai."*

### Nome
| Campo | Valor |
|-------|-------|
| **Nome** | Klaris |
| **Origem** | De "Claridade/Clareza" |
| **Por que funciona** | Puro, luminoso, transparente. Soa gentil mas com autoridade — exatamente como um curandeiro deveria soar. |

### Identidade
| Campo | Valor |
|-------|-------|
| **Papel** | Suporte / Healer |
| **Dificuldade** | Medio |
| **Alcance** | 3-8 celulas |
| **Fantasia** | Sacerdote divino, curandeiro sagrado |

### Elementos
| Elemento | Peso | Papel no Kit |
|----------|------|-------------|
| Agua | Principal | Cura poderosa, AoE heal, purificacao |
| Ar | Secundario | Buffs para aliados, remocao de debuffs |
| Fogo | Terciario | Dano sagrado, quando alterna para modo ofensivo |

### Pontos Fortes
- Unica classe com cura forte (ate 200 HP em AoE)
- Toggle "Colera Divina" permite alternar entre cura e dano
- Ressurreicao revive aliados caidos (unica no jogo)
- Escudo Sagrado da 80 shield a distancia
- Passivo "Bencao Perpetua" cura 15 HP/turno para TODOS aliados
- Trigger onHitTaken cura aliados = ser atacado beneficia o time
- Alcance confortavel (3-8) para ficar seguro atras do time

### Pontos Fracos
- Dano proprio muito baixo (focado em cura)
- Dependente de aliados — sozinho e fraco
- Toggle mode e uma escolha dificil: curar OU dar dano, nunca os dois
- HP medio (100) e nenhuma armor natural
- Se focado pelo inimigo, morre rapido
- Recurso de PE gasto em Ressurreicao (3 PE!) limita muito o resto

### DOM — "Fe Inabalavel"
**Mecanica**: Quando cura mais de 150 HP em um unico feitico, ganha +1 PE
**Fantasia**: A fe do Klaris e tao forte que curas poderosas o energizam. Quanto mais ele salva seus aliados, mais forte ele se torna. Recompensa curas grandes e bem-cronometradas.

### Personalidade
- Sereno mas firme — gentil nao significa fraco
- Compassivo e empático — sente a dor dos outros (literalmente, via Martírio)
- Resoluto — quando toma uma decisao, nao volta atras
- Tem um lado sombrio escondido — o toggle "Colera Divina" mostra que a gentileza tem limite
- Sabio alem da idade — fala como alguem que ja viu muito
- Nao e passivo — e um pacifista que ESCOLHE nao atacar, nao que nao consiga

### Cultura / Origem
- Templo/monastério — vida de estudo, meditacao e cura
- Treinado em rituais de purificacao e bencao desde crianca
- Elemento agua reflete compaixao: fluida, adaptavel, essencial a vida
- Acredita que toda vida tem valor — mas sabe que as vezes e preciso lutar
- Hierarquia religiosa mas nao fanatica — fe pessoal, nao dogma cego
- O toggle de dano sugere que todo Klaris tem furia contida — os mais fortes sao os que controlam

### Tipo de Corpo
- Esguio e gracioso — corpo de estudioso, nao de guerreiro
- Postura ereta e nobre — queixo levantado, ombros relaxados
- Maos elegantes (sao as ferramentas de cura)
- Mais baixo ou na media — nao imponente por tamanho, mas por presenca

### Opcoes de Penteado
| Opcao | Descricao | Vibe |
|-------|-----------|------|
| A | Medio/longo, liso e arrumado, com circlet dourado | Sacerdote classico, nobre |
| B | Curto e limpo, bem penteado, com tiara fina | Monge elegante, puro |
| C | Longo e solto, ondulado, quase etereo | Divino, angelical |
| D | Preso em coque alto com mechas soltas + acessorio dourado | Ritualista, organizado |

### Opcoes de Roupa
| Opcao | Descricao | Vibe |
|-------|-----------|------|
| A | Tunica longa branca com bordas douradas + estola sobre ombros + mangas largas | Sacerdote classico, divino |
| B | Robe medio com camadas — camisa interna + colete longo + capa leve | Estudioso elegante, pratico |
| C | Kimono/tunica oriental branca com faixa dourada na cintura + mangas fluidas | Monge oriental, sereno |
| D | Vestes curtas + calca + botas leves — mais moderno, menos tradicional | Curandeiro de campo, agil |

### Acessorios Possiveis
- Circlet/tiara dourada na testa (identidade visual forte)
- Medalha/amuleto no peito (simbolo de fe)
- Estola sobre os ombros (tecido azul celeste)
- Mangas largas e fluidas (visual de ritual)
- Cinturao de corda ou tecido (nao metal — nao e guerreiro)
- Brincos pequenos ou piercing de orelha delicado
- Luvas finas brancas (opcional)

### Paleta de Cores
| Cor | Hex | Uso |
|-----|-----|-----|
| Branco Puro | `#FAFAFA` | Tunica principal |
| Dourado Divino | `#FFD600` | Bordas, circlet, detalhes |
| Azul Celeste | `#42A5F5` | Estola, detalhes de agua |
| Bege Luz | `#FFF8E1` | Interior da roupa |

### Geração LudoAI — Klaris
| Filtro | Valor |
|--------|-------|
| Plataforma | Area de trabalho |
| Generos | Estrategia |
| Estilo artistico | Low Poly ou Cartoon |
| Perspectiva | Frontal ou 3/4 |
| Proporcao da tela | 1:1 |
| Cores (seletor) | **Amarelo**, **Branco**, **Ciano** |
| Cores (no prompt) | cream, celestial blue, soft gold |

**Prompt:**
```
3D stylized RPG cleric healer character, chibi proportions, idle standing pose, long white priestly robes with golden trim, shoulder stole, golden circlet tiara on forehead, chest medallion, wide sleeves, light sandals, slim graceful build, serene noble posture, white gold and celestial blue color scheme, no staff, no weapons, clean background, low poly painterly cartoon RPG style
```

---

## 6. KAOS — "Furia Sangrenta"

> *"Dor e combustivel."*

### Nome
| Campo | Valor |
|-------|-------|
| **Nome** | Kaos |
| **Origem** | De "Caos" |
| **Por que funciona** | Direto, agressivo, instavel. Voce sabe exatamente o que esperar — destruicao pura, incluindo a propria. |

### Identidade
| Campo | Valor |
|-------|-------|
| **Papel** | DPS Suicida Extremo |
| **Dificuldade** | Dificil |
| **Alcance** | 1-3 celulas |
| **Fantasia** | Guerreiro descontrolado, brutalidade pura |

### Elementos
| Elemento | Peso | Papel no Kit |
|----------|------|-------------|
| Fogo | Principal | Dano extremo + auto-dano, HP scaling |
| Terra | Secundario | Sobrevivencia, armor roubado |
| Agua | Terciario | Lifesteal agressivo (cura via violencia) |

### Pontos Fortes
- MAIOR dano potencial do jogo (ate 1000 dmg com Aniquilacao em 10% HP)
- Mecanica Berserk: em 50% HP TODOS feiticos ganham +100% dano
- HP Scaling: quanto mais perto da morte, mais forte fica
- Lifesteal agressivo permite se curar SEM parar de atacar
- Toggle "Frenesi" = +40% dano permanente + Ensaboado
- Triggers massivos: onKill rouba PA+PM+HP+Armor (TUDO)
- Snowball brutal: cada kill o torna exponencialmente mais forte

### Pontos Fracos
- Auto-dano constante (8-20% HP maximo por feitico)
- Linha tenue entre "forte com HP baixo" e "morto"
- Sem defesa natural — depende de armor roubado
- Se nao matar, morre pelo proprio dano
- Frenesi tira 30% defense = mais fragil ainda
- Extremamente dificil de jogar bem (alto skill ceiling)
- Um erro de calculo = morte instantanea

### DOM — "Berserk"
**Mecanica**: Em 50% HP, todos feiticos ganham +100% dano
**Fantasia**: A furia primordial consome o Kaos. Quando ferido o suficiente, algo se quebra dentro dele e todo limite e removido. O preco? Ele se destroi no processo. Classe de alto risco, alta recompensa na sua essencia.

### Personalidade
- Intenso — tudo e 100%, nunca pela metade
- Impaciente e explosivo — nao espera, nao planeja, ATACA
- Nao e burro — e impulsivo por escolha. Sabe que vai doer, faz assim mesmo
- Vive no presente — o passado nao importa, o futuro talvez nao exista
- Ri no meio do combate — dor e combustivel, nao obstáculo
- Respeita forca bruta — se voce aguenta um soco dele, ja e amigo
- Solitario nao por escolha, mas porque as pessoas tem medo dele

### Cultura / Origem
- Sem cultura organizada — Kaos sao outcasts, exilados, rejeitados
- Cada Kaos tem uma historia diferente de como "quebrou" — trauma, raiva reprimida, maldição
- Nao seguem regras nem hierarquias — cada um e uma bomba relogio individual
- Elemento fogo reflete a autodestruicao: queima tudo, inclusive a si mesmo
- As cicatrizes nao sao de inimigos — muitas sao auto-infligidas (auto-dano dos feiticos)
- Outros os temem e evitam — um Kaos descontrolado e perigo pra todo mundo
- Os que aprendem a controlar a furia se tornam os combatentes mais perigosos do mundo

### Tipo de Corpo
- Extremamente musculoso — o mais forte visualmente
- Corpo marcado por cicatrizes, queimaduras, veias saltadas
- Postura inclinada para frente, agressiva — como se estivesse prestes a pular
- Mais alto que o Orik, mas menos "organizado" — musculos brutos, nao esculpidos
- Expressao sempre tensa — mandibula cerrada, olhar intenso

### Opcoes de Penteado
| Opcao | Descricao | Vibe |
|-------|-----------|------|
| A | Longo, selvagem e desgrenhado, vermelho escuro | Descontrolado, caótico |
| B | Moicano agressivo, laterais raspadas, topo espetado | Punk, rebelde, violento |
| C | Raspado/careca com cicatrizes no cranio | Brutalidade pura, sem vaidade |
| D | Medio bagunçado, parcialmente queimado/chamuscado nas pontas | Autodestrutivo, marcado pelo fogo |

### Opcoes de Roupa
| Opcao | Descricao | Vibe |
|-------|-----------|------|
| A | Armadura destruida/incompleta — peito exposto, calca rasgada, bandagens no torso e bracos | Berserker classico, autodestrutivo |
| B | Apenas calca e cinto de correntes — torso completamente nu com cicatrizes e tatuagens | Brutalidade pura, sem protecao |
| C | Colete de couro aberto + calca com joelheiras de metal + ataduras nos bracos | Lutador de arena, gladiador |
| D | Restos de armadura pesada — como se fosse um Aegis que enlouqueceu e destruiu a propria armadura | Origem tragica, visual narrativo |

### Acessorios Possiveis
- Bandagens/ataduras no torso e bracos (identidade visual principal)
- Correntes nos bracos ou cintura (simbolo de aprisionamento/libertação)
- Cicatrizes visiveis por todo o corpo (muitas auto-infligidas)
- Tatuagens tribais/runas vermelhas/pretas
- Expressao raivosa/enlouquecida (quase obrigatorio)
- Olhos com brilho vermelho ou pupilas diferentes (opcional, marca do Berserk)
- Veias negras/vermelhas visiveis na pele (quando ativa Berserk, opcional)

### Paleta de Cores
| Cor | Hex | Uso |
|-----|-----|-----|
| Vermelho Sangue | `#B71C1C` | Cabelo, tatuagens, detalhes |
| Preto Carvao | `#212121` | Calca, cinto, correntes |
| Bege Pele | `#8D6E63` | Pele exposta |
| Cinza Ferro | `#424242` | Correntes, restos de armadura |

### Geração LudoAI — Kaos
| Filtro | Valor |
|--------|-------|
| Plataforma | Area de trabalho |
| Generos | Estrategia |
| Estilo artistico | Low Poly ou Cartoon |
| Perspectiva | Frontal ou 3/4 |
| Proporcao da tela | 1:1 |
| Cores (seletor) | **Vermelho** |
| Cores (no prompt) | black, dark gray, charcoal tones |

**Prompt:**
```
3D stylized RPG berserker character, chibi proportions, idle aggressive forward-leaning stance, minimal destroyed armor, partially exposed muscular chest, torn pants, bandage wraps on torso and arms, chain belt, wild long disheveled dark red hair, visible scars, tribal tattoos, fierce enraged expression, very muscular build, red black and dark gray color scheme, no weapons, no axe, clean background, low poly painterly cartoon RPG style
```

---

## TABELA COMPARATIVA

| Nome | Papel | Silhueta | Cor Dominante | Dificuldade |
|------|-------|----------|---------------|-------------|
| **Orik** | DPS Melee | Largo, firme | Vermelho + Aco | Facil |
| **Zefir** | DPS Ranged | Esguio, agil | Verde Floresta | Facil |
| **Garren** | Bruiser | Agachado, animal | Azul + Marrom | Medio |
| **Aegis** | Tank | Muralha, quadrado | Marrom + Dourado | Medio |
| **Klaris** | Healer | Elegante, sereno | Branco + Dourado | Medio |
| **Kaos** | DPS Suicida | Agressivo, inclinado | Vermelho + Preto | Dificil |

---

## NOTAS PARA GERACAO NO LUDOAI

### Filtros Padrão (para TODAS as classes)
| Filtro | Valor |
|--------|-------|
| **Plataforma** | Area de trabalho |
| **Generos** | Estrategia |
| **Estilo artistico** | Low Poly ou Cartoon (o mais proximo) |
| **Perspectiva** | Frontal ou 3/4 |
| **Proporcao da tela** | 1:1 (quadrado, melhor pra sprite) |
| **Cores** | Selecionar no seletor + complementar no prompt |

### Cores Disponíveis no Seletor LudoAI
Vermelho, Laranja, Amarelo, Verde, Ciano, Azul, Roxo, Rosa, Cinza, Branco

### Cores por Classe (seletor + prompt)
| Classe | Selecionar no Seletor | Complementar no Prompt |
|--------|----------------------|----------------------|
| **Orik** | Vermelho, Laranja | steel gray, dark brown leather tones |
| **Zefir** | Verde | dark brown, sand beige, olive green |
| **Garren** | Azul, Verde | dark brown, bone white, moss green |
| **Aegis** | Amarelo, Laranja, Cinza | brown earth, stone gray, sand beige |
| **Klaris** | Amarelo, Branco, Ciano | cream, celestial blue, soft gold |
| **Kaos** | Vermelho | black, dark gray, charcoal tones |

### Dicas
1. Gerar 4-6 variacoes e escolher a melhor
2. Se o LudoAI adicionar armas, re-gerar com enfase em "no weapons, empty hands"
3. Manter proporcoes consistentes entre classes (mesmo tamanho de cabeca/corpo)
4. Testar o personagem em tamanho pequeno (como ficara no grid isometrico)
5. Se necessario, gerar versoes masculinas E femininas de cada classe

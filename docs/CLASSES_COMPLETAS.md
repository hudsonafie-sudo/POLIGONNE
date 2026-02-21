# 🎮 Sistema de 6 Classes - Design Completo

**Data:** 2026-02-11
**Versão:** 2.0

---

## ⚔️ Recursos Base (Todas as Classes)
- **6 PA** | **6 PM** | **3 PE**

---

## 1️⃣ GUERREIRO - "Lâmina Inabalável"

**Tema:** Combate corpo a corpo, mobilidade explosiva, roubo de armadura

**Elementos:** 🔥 Fogo | 🌍 Terra | 🌪️ Ar

### 🔥 Fogo (5) - Alto dano CAC

1. **Golpe Flamejante**
   - 150 dmg | Range 1 | 4 PA
   - Rouba 5 armor por 2 turnos
   - Primeiro feitiço: +30% dano

2. **Espada Ardente**
   - 120 dmg | Range 1-2 | 4 PA
   - Queimadura: 20/turno × 3 turnos

3. **Explosão Ígnea**
   - 180 dmg | Range 1 | 5 PA
   - AoE cruz (1 célula)

4. **Fúria Incandescente**
   - 200 dmg | Range 1 | 4 PA + 2 PE
   - Penalidade repetição: -50% por alvo

5. **Lâmina do Dragão**
   - 250 dmg | Range 1 | 5 PA | CD 3
   - Rouba 10 armor por 3 turnos

### 🌍 Terra (5) - Tanque e controle

6. **Esmagamento**
   - 130 dmg | Range 1 | 4 PA
   - Reduz PM do alvo em 2

7. **Muralha Viva**
   - 100 dmg | Range 1 | 4 PA
   - Ganha 30 shield

8. **Terremoto**
   - 90 dmg | Range 1 | 5 PA
   - AoE 2×2, empurra 1 célula

9. **Pancada Brutal**
   - 160 dmg | Range 1 | 4 PA + 2 PE
   - Stun 1 turno

10. **Fortaleza**
    - 80 dmg | Range 1 | 3 PA
    - Ganha 50 armor por 2 turnos

### 🌪️ Ar (5) - Mobilidade

11. **Vento Cortante**
    - 110 dmg | Range 1-3 | 4 PA
    - Puxa alvo 1 célula

12. **Investida**
    - 100 dmg | Dash 4 células | 5 PA
    - Atravessa inimigos
    - **Ganha "Ensaboado" por 1 turno após usar**

13. **Ciclone**
    - 70 dmg | Range 1 | 5 PA
    - AoE 2×2, empurra 2 células

14. **Rajada**
    - 90 dmg | Range 1-4 | 3 PA
    - Ignora LoS

15. **Turbilhão**
    - 140 dmg | Range 1-2 | 5 PA
    - **Troca de posição com o alvo** (respeitando Estabilizado)

### ⚡ Ativos (3)

16. **Salto Heroico** - Teleporta célula vazia (6 células) | 3 PA | CD 2
17. **Postura Defensiva** - +40 armor, -20% dano × 2 turnos | 4 PA
18. **Grito de Guerra** - Inimigos em 3 células: -10 armor × 2 turnos | 5 PA | CD 3

### 🎯 Passivos (2)

19. **Mestre de Armas** - Cada ataque: -1 CD em todos feitiços
20. **Pele de Ferro** - HP < 40%: +25 armor permanente

### 🌟 DOM

21. **Sede de Batalha** - Dano > 150: +1 PE (1×/turno)

---

## 2️⃣ ATIRADOR - "Sombra Silente"

**Tema:** Dano longo alcance, kiting, roubo de PM

**Elementos:** 🌪️ Ar | 🔥 Fogo | 💧 Água

### 🌪️ Ar (5) - Máximo alcance

1. **Flecha Ventosa**
   - 80 dmg | Range 4-8 | 3 PA
   - Rouba 2 PM

2. **Disparo Uivante**
   - 70 dmg | Range 5-10 | 4 PA
   - Empurra 1 célula

3. **Tiro Tornado**
   - 60 dmg | Range 6-12 | 4 PA
   - Atravessa, rouba 1 PM de cada

4. **Rajada Perfurante**
   - 100 dmg | Range 4-7 | 4 PA
   - Ignora 30% armor

5. **Tempestade de Flechas**
   - 50 dmg | Range 5-9 | 5 PA
   - AoE 3×3, rouba 1 PM de todos

### 🔥 Fogo (5) - Dano médio

6. **Seta Flamejante**
   - 120 dmg | Range 3-6 | 4 PA
   - Queimadura: 15/turno × 3

7. **Explosão Incendiária**
   - 140 dmg | Range 4-6 | 5 PA
   - AoE 2×2

8. **Flechas em Chamas**
   - 90 dmg | Range 3-7 | 5 PA
   - 2 projéteis (2 alvos)

9. **Tiro Ígneo**
   - 160 dmg | Range 4-5 | 4 PA + 2 PE

10. **Meteoro Certeiro**
    - 200 dmg | Range 5-7 | 5 PA | CD 3

### 💧 Água (5) - Utilidade

11. **Flecha Gélida**
    - 100 dmg | Range 3-6 | 4 PA
    - Reduz PM em 3

12. **Chuva Venenosa**
    - 60 dmg | Range 4-8 | 5 PA
    - AoE cruz, veneno 20/turno × 3

13. **Disparo Aquático**
    - 110 dmg | Range 3-5 | 4 PA
    - Rouba 3 PM

14. **Neblina**
    - 50 dmg | Range 4-7 | 5 PA
    - AoE 3×3, -2 PM todos

15. **Tsunami**
    - 130 dmg | Range 4-6 | 5 PA
    - Linha 5 células, empurra 3

### ⚡ Ativos (3)

16. **Rolamento Tático** - Move 2 células (ignora bloqueio) | 3 PA | CD 1
17. **Sombra Fugaz** - Ganha "Ensaboado" por 2 turnos | 3 PA | CD 3
18. **Armadilha de Raiz** - Armadilha (range 4), prende 2 turnos | 5 PA

### 🎯 Passivos (2)

19. **Olho de Águia** - +2 alcance em todos feitiços de dano
20. **Caçador Solitário** - Sem aliados em 3 células: +15% dano, +1 PM

### 🌟 DOM

21. **Concentração Fatal** - Sem mover: +30% dano, +1 PE

---

## 3️⃣ CAÇADOR - "Predador Sombrio"

**Tema:** Alcance médio, roubo de vida, push/pull

**Elementos:** 💧 Água | 🌍 Terra | 🌪️ Ar

### 💧 Água (5) - Roubo de vida

1. **Drenar Essência**
   - 100 dmg | Range 2-5 | 4 PA
   - Cura 50% do dano
   - Cura maior se alvo < 30% HP: +50%

2. **Sanguessuga**
   - 80 dmg | Range 3-6 | 4 PA
   - Cura 40 HP + rouba 2 PM

3. **Vampirismo**
   - 120 dmg | Range 2-4 | 4 PA + 2 PE
   - Cura 80% do dano

4. **Chicote d'Água**
   - 90 dmg | Range 2-5 | 4 PA
   - Puxa 2 células + cura 30 HP

5. **Maré Vital**
   - 70 dmg | Range 3-6 | 5 PA
   - AoE 2×2, cura 20 HP por inimigo

### 🌍 Terra (5) - Controle

6. **Garras Terrestres**
   - 110 dmg | Range 2-4 | 4 PA
   - Reduz PM em 2

7. **Lança de Pedra**
   - 130 dmg | Range 2-5 | 4 PA
   - Linha, empurra 1 célula

8. **Prisão Rochosa**
   - 90 dmg | Range 3-5 | 4 PA
   - Prende 1 turno

9. **Impacto Sísmico**
   - 100 dmg | Range 2-4 | 5 PA
   - AoE cruz, -20% agility

10. **Avalanche**
    - 150 dmg | Range 3-6 | 5 PA
    - Linha 4 células, empurra 2

### 🌪️ Ar (5) - Mobilidade

11. **Vórtice**
    - 80 dmg | Range 3-7 | 4 PA
    - Puxa 3 células

12. **Repulsão**
    - 70 dmg | Range 2-5 | 4 PA
    - Empurra 3 células

13. **Tornado**
    - 90 dmg | Range 3-6 | 5 PA
    - AoE circular, empurra todos 2

14. **Corrente Ascendente**
    - 100 dmg | Range 2-4 | 5 PA
    - **Troca de posição com alvo** (respeitando Estabilizado)

15. **Ciclone Draconiano**
    - 140 dmg | Range 3-7 | 5 PA | CD 2
    - Puxa TODOS 2 células
    - **Ganha "Ensaboado" por 2 turnos após usar**

### ⚡ Ativos (3)

16. **Gancho** - Puxa inimigo (4-8 células) até adjacente | 4 PA
17. **Evasão** - Teleporta 3 células, +30% dodge × 1 turno, **ganha "Ensaboado" por 1 turno** | 4 PA | CD 2
18. **Troca Tática** - Troca posição com alvo (range 2-6), cura 50 HP se trocar com aliado | 4 PA | CD 3

### 🎯 Passivos (2)

19. **Predador Natural** - Ao matar: +20% HP máx, +2 PM
20. **Adaptação Selvagem** - A cada 2 turnos: alterna +15% dano OU +15% cura recebida

### 🌟 DOM

21. **Instinto de Sobrevivência** - HP < 30%: próximo ataque cura 100%, +2 PE (1×/combate)

---

## 4️⃣ GUARDIÃO - "Bastião Eterno"

**Tema:** Tanque CAC, concede armadura, Estabilizado

**Elementos:** 🌍 Terra | 💧 Água | 🔥 Fogo

### 🌍 Terra (5) - Defesa

1. **Escudo de Pedra**
   - 80 dmg | Range 1 | 3 PA
   - Ganha 40 armor

2. **Muralha**
   - 60 dmg | Range 1 | 4 PA + 2 PE
   - Ganha 60 armor

3. **Golpe Fortificado**
   - 100 dmg | Range 1 | 4 PA
   - Ganha 25 armor + reduz dano alvo 15% × 2

4. **Barreira Terrestre**
   - 70 dmg | Range 1-2 | 4 PA
   - Aliado (3 células): +35 armor

5. **Fortaleza Inabalável**
   - 90 dmg | Range 1 | 5 PA
   - Ganha 50 armor + Estabilizado × 2

### 💧 Água (5) - Suporte

6. **Toque Curativo**
   - 70 dmg | Range 1 | 4 PA
   - Cura aliado adjacente 80 HP

7. **Escudo Aquático**
   - 60 dmg | Range 1 | 4 PA
   - Aliado (3 células): +50 shield

8. **Maré Protetora**
   - 50 dmg | Range 1 | 5 PA
   - AoE 2×2 aliados, +20 armor × 2

9. **Golpe Enfraquecedor**
   - 90 dmg | Range 1 | 4 PA
   - Reduz dano alvo 25% × 2

10. **Onda Restauradora**
    - 40 dmg | Range 1-2 | 5 PA
    - Aliados em 3 células: cura 60 HP

### 🔥 Fogo (5) - Dano moderado

11. **Punho Flamejante**
    - 110 dmg | Range 1 | 4 PA

12. **Escudo Ardente**
    - 80 dmg | Range 1 | 4 PA
    - +30 armor + reflete 20 dmg

13. **Chama Protetora**
    - 70 dmg | Range 1 | 4 PA
    - Você e adjacentes: +25 armor

14. **Impacto Ígneo**
    - 120 dmg | Range 1 | 5 PA
    - Empurra 2 células

15. **Fúria Defensiva**
    - 140 dmg | Range 1 | 5 PA | CD 2

### ⚡ Ativos (3)

16. **Bastião** - **Estabilizado** + 60 armor × 2 turnos | 5 PA | CD 3
17. **Provocar** - Inimigos em 3 células: forçados a atacar você | 4 PA
18. **Resgate Heroico** - **Troca posição com aliado** (range 2-6), concede 40 shield ao aliado | 5 PA | CD 3

### 🎯 Passivos (2)

19. **Inabalável** - Receber > 100 dmg: +30 armor × 1 turno
20. **Guardião Protetor** - Aliados adjacentes: -10% dano recebido

### 🌟 DOM

21. **Determinação Férrea** - Com armor ativo: +1 PE no turno (1×/turno)

---

## 5️⃣ CLÉRIGO - "Luz Divina"

**Tema:** Suporte, cura, toggle modo dano

**Elementos:** 💧 Água | 🌪️ Ar | 🔥 Fogo

### 💧 Água (5) - Cura

1. **Cura Aquática**
   - Cura 120 HP | Range 3-6 | 4 PA
   - Alvo < 30% HP: +60% cura

2. **Chuva Curativa**
   - Cura 80 HP | Range 4-6 | 5 PA
   - AoE 2×2

3. **Onda Vital**
   - Cura 100 HP | Range 3-5 | 4 PA
   - Linha 4 células

4. **Benção das Águas**
   - Cura 150 HP + 20 armor × 2 | Range 4-6 | 5 PA

5. **Dilúvio Restaurador**
   - Cura 200 HP | Range 3-6 | 5 PA + 2 PE
   - AoE 3×3

### 🌪️ Ar (5) - Buffs

6. **Rajada Sagrada**
   - 90 dmg | Range 3-6 | 4 PA
   - Cura aliado próximo 40 HP

7. **Vento Purificador**
   - 70 dmg | Range 4-7 | 4 PA
   - Remove 1 debuff de aliado

8. **Tornado Abençoado**
   - 80 dmg | Range 3-6 | 5 PA
   - AoE, aliados: +2 PM

9. **Brisa Vivificante**
   - 60 dmg | Range 4-8 | 5 PA
   - Cura 3 aliados 50 HP cada

10. **Tempestade Divina**
    - 110 dmg (inimigos) | Range 4-6 | 6 PA
    - 60 HP cura (aliados) | AoE 3×3

### 🔥 Fogo (5) - Dano suporte

11. **Chama Sagrada**
    - 100 dmg | Range 3-5 | 4 PA
    - Queimadura: 15/turno × 3

12. **Julgamento**
    - 120 dmg | Range 4-6 | 4 PA
    - Ignora 20% res_fire

13. **Purificação Flamejante**
    - 90 dmg | Range 3-6 | 5 PA
    - AoE 2×2

14. **Lança Solar**
    - 130 dmg | Range 4-7 | 5 PA

15. **Inferno Celestial**
    - 150 dmg | Range 3-5 | 6 PA | CD 3
    - AoE cruz

### ⚡ Ativos (3)

16. **Cólera Divina** - Toggle: -60% cura, +40% seu dano, +20% dano aliados | 0 PA
17. **Escudo Sagrado** - Aliado (5 células): +80 shield | 4 PA
18. **Ressurreição** - Revive aliado (4 células) 50% HP | 6 PA + 3 PE | CD 6

### 🎯 Passivos (2)

19. **Benção Perpétua** - Todos aliados: +15 HP/turno
20. **Martírio Sagrado** - Curar aliado < 30% HP: você perde 10% HP, cura +50%

### 🌟 DOM

21. **Fé Inabalável** - Curar > 150 HP: +1 PE

---

## 6️⃣ BERSERKER - "Fúria Sangrenta" 🆕

**Tema:** Dano extremo com HP baixo/50%, auto-dano, roubo de armor

**Elementos:** 🔥 Fogo | 🌍 Terra | 💧 Água

**Mecânica Única:** **BERSERK** - Máximo dano em 50% HP

### 🔥 Fogo (5) - Dano extremo + auto-dano

1. **Fúria Sangrenta**
   - 180 dmg | Range 1 | 5 PA
   - Auto-dano: 8% HP máximo
   - Berserk: +100% dano em 50% HP
   - **Em 50% HP:** 360 dmg

2. **Chama Desesperada**
   - 150 dmg | Range 1-2 | 4 PA
   - Scaling HP baixo: +200% em 1% HP
   - **Em 1% HP:** 450 dmg

3. **Explosão Vital**
   - 200 dmg | Range 1 | 6 PA
   - Auto-dano: 10% HP máximo
   - AoE 2×2
   - Primeiro feitiço: +30% dano

4. **Lâmina Sacrificial**
   - 250 dmg | Range 1 | 5 PA + 2 PE
   - Auto-dano: 15% do dano causado
   - Rouba 8 armor × 3 turnos

5. **Aniquilação**
   - 400 dmg | Range 1 | 6 PA | CD 4
   - Auto-dano: 20% HP máximo
   - Scaling HP baixo: +150% em 10% HP
   - **Em 10% HP:** 1000 dmg

### 🌍 Terra (5) - Sobrevivência + armor

6. **Golpe Endurecido**
   - 120 dmg | Range 1 | 4 PA
   - Rouba 6 armor × 2 turnos

7. **Cólera da Terra**
   - 140 dmg | Range 1 | 5 PA
   - Ganha 40 armor
   - Empurra 1 célula

8. **Pancada Titânica**
   - 160 dmg | Range 1 | 5 PA
   - Auto-dano: 5% HP máximo
   - Rouba 10 armor × 3 turnos

9. **Resiliência Brutal**
   - 100 dmg | Range 1 | 4 PA
   - Ganha 60 armor × 2 turnos
   - HP < 50%: armor dobrado (120)

10. **Terremoto Feroz**
    - 130 dmg | Range 1 | 6 PA
    - AoE 3×3, empurra 2 células
    - Rouba 5 armor de todos × 2 turnos

### 💧 Água (5) - Roubo de vida agressivo

11. **Sede de Sangue**
    - 110 dmg | Range 1-2 | 4 PA
    - Cura 60% do dano
    - HP < 30%: cura 100%

12. **Vampirismo Feroz**
    - 140 dmg | Range 1 | 5 PA
    - Cura 80% do dano
    - Auto-dano: 5% HP máximo

13. **Chicote Vital**
    - 100 dmg | Range 1-3 | 4 PA
    - Puxa 2 células + cura 50 HP

14. **Drenagem Mortal**
    - 180 dmg | Range 1 | 5 PA + 2 PE
    - Cura 100% do dano
    - Rouba 5 armor × 2 turnos

15. **Maré Sanguinária**
    - 90 dmg | Range 1-2 | 5 PA
    - AoE 2×2
    - Cura 40% do dano de cada alvo
    - Sistema de carga: 3 turnos sem usar = +50% dano

### ⚡ Ativos (3)

16. **Frenesi** - Toggle: +40% dano, -30% defense, **ganha "Ensaboado"** enquanto ativo | 0 PA
17. **Salto Devastador** - Teleporta célula (6 células), AoE 2×2 80 dmg | 5 PA | CD 3
18. **Investida Sangrenta** - **Troca posição com inimigo** (range 2-4) + 120 dmg, auto-dano 10% HP | 5 PA | CD 2

### 🎯 Passivos (2)

19. **Fúria Crescente** - HP < 50%: +2% dano por 1% HP perdido (máx +100% em 1% HP)
20. **Sede de Vitória** - Cada morte inimiga: +5 armor × 3 turnos (acumulável)

### 🌟 DOM

21. **Berserk** - Dano máximo em 50% HP: todos feitiços +100% dano

---

# 📊 Tabela Comparativa

| Classe | Papel | Range | Mecânica Única | Dificuldade |
|--------|-------|-------|----------------|-------------|
| Guerreiro | DPS CAC | 1-4 | Roubo Armor + Salto | ⭐⭐ |
| Atirador | DPS Distância | 4-12 | Roubo PM + Rolamento | ⭐⭐ |
| Caçador | Bruiser | 2-7 | Roubo Vida + Push/Pull | ⭐⭐⭐ |
| Guardião | Tanque | 1-3 | Estabilizado + Armor Aliados | ⭐⭐⭐ |
| Clérigo | Suporte | 3-8 | Cura + Toggle Dano | ⭐⭐⭐ |
| **Berserker** | DPS CAC Extremo | 1-3 | **Berserk 50% HP** | ⭐⭐⭐⭐ |

---

## 🎯 Resumo

**Total por Classe:** 21 habilidades
- 15 Feitiços Elementais (3 × 5)
- 3 Feitiços Ativos
- 2 Feitiços Passivos
- 1 DOM

**Total Geral:** 126 habilidades (21 × 6 classes)

---

## 🔄 Changelog

### 2026-02-11 - v2.0
- Adicionada 6ª classe: Berserker
- Implementadas mecânicas avançadas em todos feitiços
- Total: 126 habilidades

---

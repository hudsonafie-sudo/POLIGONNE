# 🎮 Sistema de Classes - Início Rápido

**Data:** 2026-02-11

---

## 📚 Documentação Completa

Este sistema está **100% documentado** nos seguintes arquivos:

### 📖 Guias Principais

1. **[SISTEMA_COMPLETO_RESUMO.md](SISTEMA_COMPLETO_RESUMO.md)** ⭐ **LEIA PRIMEIRO**
   - Visão geral completa
   - Todas as 6 classes
   - 11 mecânicas avançadas
   - 50 passivos universais
   - Números e estatísticas

2. **[CLASSES_COMPLETAS.md](CLASSES_COMPLETAS.md)**
   - Detalhes de cada classe
   - 126 feitiços (21 por classe)
   - Elementos e habilidades
   - Passivos e DOMs

3. **[MECANICAS_FEITICOS_AVANCADAS.md](MECANICAS_FEITICOS_AVANCADAS.md)**
   - Ricochete
   - Auto-dano
   - Scaling por HP
   - Triggers (On Kill, On Hit, On Block)
   - Sistema de carga
   - E mais 6 mecânicas

4. **[FEITICOS_PASSIVOS_UNIVERSAIS.md](FEITICOS_PASSIVOS_UNIVERSAIS.md)**
   - 50 passivos equipáveis
   - 6 categorias
   - Sistema de 3 slots
   - Combos sugeridos

5. **[FEITICOS_TRIGGER_POR_CLASSE.md](FEITICOS_TRIGGER_POR_CLASSE.md)**
   - Distribuição temática
   - Identidades preservadas
   - Exemplos de código

---

## 🚀 Início Rápido

### Para Jogadores

1. **Escolha sua classe** na criação de personagem
2. **Equipe 3 Passivos Universais** (disponíveis para todas classes)
3. **Use os 15 feitiços elementais** da sua classe
4. **Ative os triggers** (On Kill, On Hit, On Block) durante combate

### Para Desenvolvedores

#### Estrutura Recomendada

```
sistema/
├── classes.js                    # Definições das 6 classes
├── passivos_universais.js        # 50 passivos
└── triggers.js                   # Sistema de on-kill/hit/block

feiticos/classes/
├── guerreiro.js                  # 21 habilidades
├── atirador.js                   # 21 habilidades
├── cacador.js                    # 21 habilidades
├── guardiao.js                   # 21 habilidades
├── clerigo.js                    # 21 habilidades
└── berserker.js                  # 21 habilidades

mecanicas/
├── damage_scaling.js             # Scaling por HP
├── ricochete.js                  # Sistema de ricochete
├── auto_dano.js                  # Auto-dano
└── charge_system.js              # Sistema de carga

interface/
├── selecao_classe.js             # UI de seleção
└── passivos_ui.js                # UI de passivos
```

---

## 📊 Números Importantes

- **6 Classes** únicas
- **126 Feitiços de Classe** (21 × 6)
- **50 Passivos Universais**
- **11 Mecânicas Avançadas**
- **176 Habilidades Totais**
- **3 Elementos por Classe**
- **5 Feitiços por Elemento**

---

## ✅ Status

### ✅ Completo
- [x] Todas as 6 classes definidas
- [x] 126 feitiços documentados
- [x] 50 passivos documentados
- [x] 11 mecânicas documentadas
- [x] Distribuição de triggers
- [x] Identidades únicas

### ⏳ Pendente
- [ ] Implementação em código
- [ ] Testes e balanceamento
- [ ] Interface de seleção
- [ ] Sistema de save

---

## 🎯 Implementação Sugerida

### Fase 1: Base (1-2 dias)
1. Criar estrutura de classes
2. Sistema básico de feitiços
3. Passivos universais

### Fase 2: Mecânicas (2-3 dias)
1. Triggers (On Kill, On Hit, On Block)
2. Damage scaling
3. Ricochete
4. Auto-dano

### Fase 3: Interface (1 dia)
1. Tela de seleção de classe
2. UI de passivos
3. Indicadores visuais

### Fase 4: Balanceamento (2-3 dias)
1. Testes de cada classe
2. Ajustes de valores
3. Combos e sinergias

---

## 💡 Dicas de Design

### Balanceamento

- **Guerreiro:** Tanque ofensivo, bom iniciante
- **Atirador:** Kiting puro, fácil mas frágil
- **Caçador:** Versátil, sustain alto, complexo
- **Guardião:** Tanque puro, melhor bloqueador
- **Clérigo:** Suporte essencial, toggle interessante
- **Berserker:** Alto risco/recompensa, expert only

### Triggers

- **On Kill:** Recompensas por eliminar inimigos
- **On Hit Taken:** Reações defensivas
- **On Block:** Especialistas em defesa

### Passivos Universais

- **Comuns (Nv1):** Sempre úteis
- **Lendários (Nv75):** Build-defining

---

## 🔗 Links Rápidos

- [Sistema Completo](SISTEMA_COMPLETO_RESUMO.md) - Visão geral
- [6 Classes](CLASSES_COMPLETAS.md) - Detalhes de cada uma
- [11 Mecânicas](MECANICAS_FEITICOS_AVANCADAS.md) - Todas as mecânicas
- [50 Passivos](FEITICOS_PASSIVOS_UNIVERSAIS.md) - Passivos universais
- [Triggers](FEITICOS_TRIGGER_POR_CLASSE.md) - Distribuição por classe

---

**Tudo pronto para implementação! 🚀**

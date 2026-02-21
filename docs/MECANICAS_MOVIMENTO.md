# 🏃 Mecânicas de Movimento - Sistema Completo

**Data:** 2026-02-11
**Versão:** 1.0

---

## 📖 Tipos de Movimento

### 1. Movimento Normal
- Usa **PM (Pontos de Movimento)**
- Custo: 1 PM por célula
- **Bloqueio:** Inimigos adjacentes impedem movimento

### 2. Movimento Livre (Status: Ensaboado)
- Usa **PM** normalmente
- **Ignora bloqueio** de inimigos adjacentes
- Temporário (1-2 turnos)

### 3. Dash/Investida
- Usa **PA (Pontos de Ação)**
- Movimento em linha reta
- Pode atravessar inimigos
- Geralmente causa dano

### 4. Teleporte
- Usa **PA**
- Movimento instantâneo para célula vazia
- Não afetado por bloqueio
- Requer linha de visão (geralmente)

### 5. Troca de Posição
- Usa **PA**
- Troca lugar com alvo (aliado ou inimigo)
- **Bloqueado por Status: Estabilizado**
- Não requer linha de visão entre posições

---

## 🛡️ Status que Afetam Movimento

### Status: Estabilizado

**Efeito:** Imune a movimento forçado

**Imunidades:**
- ✅ Empurrão (Push)
- ✅ Puxão (Pull)
- ✅ Teleporte forçado
- ✅ Troca de posição forçada

**NÃO Impede:**
- ❌ Movimento voluntário (usar PM)
- ❌ Dash/Investida próprios
- ❌ Teleporte próprio

**Quem Tem:**
- Guardião (feitiço "Bastião")
- Guardião (feitiço "Fortaleza Inabalável")
- Alguns passivos universais

```javascript
{
    status: 'estabilizado',
    duration: 2,  // turnos
    effects: {
        immuneToMovement: true,
        immuneToPush: true,
        immuneToPull: true,
        immuneToTeleport: true
    }
}
```

---

### Status: Ensaboado

**Efeito:** Ignora bloqueio ao se mover

**Permite:**
- ✅ Mover-se livremente (não bloqueado por inimigos adjacentes)
- ✅ Escapar de cercos
- ✅ Reposicionamento tático

**Não Afeta:**
- ❌ Custo de PM (continua 1 PM/célula)
- ❌ Máximo de PM
- ❌ Outros tipos de movimento

**Quem Tem:**
- Guerreiro (feitiço "Investida")
- Atirador (feitiço "Sombra Fugaz")
- Caçador (feitiço "Evasão", "Ciclone Draconiano")
- Berserker (toggle "Frenesi")

```javascript
{
    status: 'ensaboado',
    duration: 2,  // turnos
    effects: {
        ignoreBlock: true,
        movementFree: true
    }
}
```

---

### Status: Preso

**Efeito:** Não pode se mover

**Impede:**
- ✅ Movimento normal (PM)
- ✅ Dash/Investida
- ✅ Teleporte
- ✅ Qualquer tipo de movimento

**NÃO Impede:**
- ❌ Lançar feitiços
- ❌ Atacar
- ❌ Usar habilidades

**Quem Aplica:**
- Atirador (feitiço "Armadilha de Raiz")
- Caçador (feitiço "Prisão Rochosa")

```javascript
{
    status: 'preso',
    duration: 2,  // turnos
    effects: {
        cannotMove: true,
        movementLocked: true
    }
}
```

---

## ⚔️ Feitiços de Movimento por Classe

### GUERREIRO

| Feitiço | Tipo | Efeito |
|---------|------|--------|
| **Salto Heroico** | Teleporte | Range 6, célula vazia |
| **Investida** | Dash + Ensaboado | 4 células, +Ensaboado 1 turno |
| **Turbilhão** | Troca Posição | Range 1-2, teleporta atrás do alvo |

---

### ATIRADOR

| Feitiço | Tipo | Efeito |
|---------|------|--------|
| **Rolamento Tático** | Movimento Livre | 2 células, ignora bloqueio |
| **Sombra Fugaz** | Status | Ensaboado por 2 turnos |
| **Empurrão** | Push | Empurra adjacente 3 células |

---

### CAÇADOR

| Feitiço | Tipo | Efeito |
|---------|------|--------|
| **Evasão** | Teleporte + Status | 3 células + Ensaboado 1 turno |
| **Troca Tática** | Troca Posição | Range 2-6, cura 50 se aliado |
| **Corrente Ascendente** | Troca Posição | Range 2-4 + 100 dmg |
| **Ciclone Draconiano** | Pull + Status | Puxa todos + Ensaboado 2 turnos |

---

### GUARDIÃO

| Feitiço | Tipo | Efeito |
|---------|------|--------|
| **Bastião** | Status | Estabilizado + 60 armor |
| **Resgate Heroico** | Troca Posição | Troca com aliado + 40 shield |
| **Fortaleza Inabalável** | Status | 50 armor + Estabilizado |

---

### CLÉRIGO

*Sem feitiços de movimento especiais*

---

### BERSERKER

| Feitiço | Tipo | Efeito |
|---------|------|--------|
| **Frenesi** | Toggle + Status | +40% dano + Ensaboado |
| **Salto Devastador** | Teleporte + AoE | Range 6 + 80 dmg AoE |
| **Investida Sangrenta** | Troca Posição + Dano | Range 2-4 + 120 dmg + auto-dano |

---

## 🎯 Comparação de Mecânicas

### Push vs Pull vs Troca

| Mecânica | Alcance | Afetado por Estabilizado | Move Conjurador | Move Alvo |
|----------|---------|--------------------------|-----------------|-----------|
| **Push** | Qualquer | ✅ Sim | ❌ Não | ✅ Sim (afasta) |
| **Pull** | Qualquer | ✅ Sim | ❌ Não | ✅ Sim (aproxima) |
| **Troca** | Qualquer | ✅ Sim | ✅ Sim | ✅ Sim (trocam) |

---

### Dash vs Teleporte vs Troca

| Mecânica | Requer Caminho | Requer LoS | Afeta Inimigos | Custo |
|----------|----------------|------------|----------------|-------|
| **Dash** | ✅ Linha | ❌ Não | ✅ Atravessa/Dano | PA |
| **Teleporte** | ❌ Não | ✅ Sim | ❌ Não | PA |
| **Troca** | ❌ Não | ❌ Não | ✅ Reposiciona | PA |

---

### Ensaboado vs Rolamento vs Teleporte

| Mecânica | Duração | Usa PM | Ignora Bloqueio | Custo |
|----------|---------|--------|-----------------|-------|
| **Ensaboado** | 1-2 turnos | ✅ Sim | ✅ Sim | PA (buff) |
| **Rolamento** | Instantâneo | ❌ Não | ✅ Sim | PA |
| **Teleporte** | Instantâneo | ❌ Não | ✅ Sim | PA |

---

## 🧠 Estratégias de Uso

### Escapar de Cerco
1. **Ensaboado** - Melhor opção para escapar (dura 2 turnos)
2. **Teleporte** - Segunda opção (instantâneo mas gasta PA)
3. **Rolamento** - Escape rápido mas curto (2 células)

### Reposicionar Aliado
1. **Troca Tática (Caçador)** - Troca com aliado + cura 50
2. **Resgate Heroico (Guardião)** - Troca com aliado + shield 40
3. **Pull** - Puxa aliado para perto

### Engajar Inimigo
1. **Investida Sangrenta (Berserker)** - Troca + 120 dmg
2. **Salto Devastador (Berserker)** - Teleporta + AoE
3. **Investida (Guerreiro)** - Dash + dano

### Contra Estabilizado
- ❌ Push/Pull/Troca **NÃO FUNCIONAM**
- ✅ Use dano direto ou AoE
- ✅ Ignore o alvo e foque outros
- ✅ Espere Estabilizado acabar (2 turnos)

---

## 📊 Tabela de Interação

| Situação | Estabilizado | Ensaboado | Preso |
|----------|--------------|--------------|-------|
| **Mover-se (PM)** | ✅ Permitido | ✅ Permitido | ❌ Bloqueado |
| **Ser Empurrado** | ❌ Bloqueado | N/A | N/A |
| **Ser Puxado** | ❌ Bloqueado | N/A | N/A |
| **Ser Trocado** | ❌ Bloqueado | N/A | N/A |
| **Dash Próprio** | ✅ Permitido | ✅ Livre | ❌ Bloqueado |
| **Teleporte Próprio** | ✅ Permitido | ✅ Livre | ❌ Bloqueado |
| **Bloqueio Inimigo** | N/A | ❌ Ignorado | N/A |

---

## 🔧 Implementação

### Exemplo: Verificar Estabilizado antes de Mover

```javascript
function canMoveTarget(target, moveType) {
    // Verifica se alvo tem status Estabilizado
    if (target.hasStatus('estabilizado')) {
        // Move forçado é bloqueado
        if (moveType === 'push' || moveType === 'pull' || moveType === 'swap') {
            console.log(`${target.name} está Estabilizado! Movimento bloqueado.`);
            return false;
        }
    }

    // Verifica se alvo está Preso
    if (target.hasStatus('preso')) {
        if (moveType === 'voluntary') {
            console.log(`${target.name} está Preso! Não pode se mover.`);
            return false;
        }
    }

    return true;
}
```

---

### Exemplo: Verificar Bloqueio

```javascript
function canMoveToCell(from, to, entity) {
    // Verifica se tem Ensaboado
    if (entity.hasStatus('ensaboado')) {
        return true;  // Ignora bloqueio
    }

    // Verifica inimigos adjacentes à célula de origem
    const adjacentEnemies = getAdjacentEnemies(from, entity);

    if (adjacentEnemies.length > 0) {
        console.log(`Movimento bloqueado por ${adjacentEnemies.length} inimigo(s) adjacente(s)!`);
        return false;
    }

    return true;
}
```

---

### Exemplo: Troca de Posição

```javascript
function swapPosition(caster, target) {
    // Verifica se alvo tem Estabilizado
    if (target.hasStatus('estabilizado')) {
        showFloatingText(target, 'Estabilizado!', '#ffaa00');
        return false;
    }

    // Verifica se conjurador está Preso
    if (caster.hasStatus('preso')) {
        showFloatingText(caster, 'Preso!', '#ff4444');
        return false;
    }

    // Salva posições
    const casterPos = { x: caster.x, y: caster.y };
    const targetPos = { x: target.x, y: target.y };

    // Troca
    caster.x = targetPos.x;
    caster.y = targetPos.y;
    target.x = casterPos.x;
    target.y = casterPos.y;

    // Animação
    playSwapAnimation(caster, target);

    return true;
}
```

---

## 🔄 Changelog

### 2026-02-11 - v1.0
- Sistema completo de movimento documentado
- Status: Estabilizado, Ensaboado, Preso
- Feitiços de troca de posição adicionados
- Interações e contraposições definidas

---

**Sistema de movimento tático completo! 🏃💨**

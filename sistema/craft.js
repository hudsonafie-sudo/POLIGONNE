// ========== SISTEMA DE CRAFT ==========
// Integrado com o sistema de profissões (sistema/profissoes.js)
// Receitas de equipamento em sistema/receitas.js (DB_RECEITAS_CRAFT)
// Receitas legadas (evolução, upgrade) abaixo

// ─── Receitas Legadas (evolução de armas, upgrades) ───────────
const RECEITAS_CRAFT_LEGADO = [
    // === EVOLUÇÃO: ESPADA DO DESTINO ===
    {
        id: 'craft_espada_ferro',
        resultado: { itemId: 'espada_ferro', quantidade: 1 },
        materiais: [
            { itemId: 'recurso_ferro', quantidade: 5 },
            { itemId: 'recurso_madeira', quantidade: 2 }
        ],
        nivelRequerido: 1,
        categoria: 'arma'
    },
    {
        id: 'evolve_espada_aco',
        resultado: { itemId: 'espada_aco', quantidade: 1 },
        materiais: [
            { itemId: 'espada_ferro', quantidade: 1 },
            { itemId: 'recurso_aco', quantidade: 3 },
            { itemId: 'recurso_oleo', quantidade: 1 }
        ],
        nivelRequerido: 5,
        categoria: 'evolucao'
    },
    {
        id: 'evolve_espada_mithril',
        resultado: { itemId: 'espada_mithril', quantidade: 1 },
        materiais: [
            { itemId: 'espada_aco', quantidade: 1 },
            { itemId: 'recurso_mithril', quantidade: 5 },
            { itemId: 'recurso_cristal_azul', quantidade: 2 }
        ],
        nivelRequerido: 10,
        categoria: 'evolucao'
    },
    {
        id: 'evolve_espada_titanio',
        resultado: { itemId: 'espada_titanio', quantidade: 1 },
        materiais: [
            { itemId: 'espada_mithril', quantidade: 1 },
            { itemId: 'recurso_titanio', quantidade: 8 },
            { itemId: 'recurso_essencia_epica', quantidade: 3 }
        ],
        nivelRequerido: 20,
        categoria: 'evolucao'
    },
    {
        id: 'evolve_espada_destino',
        resultado: { itemId: 'espada_destino', quantidade: 1 },
        materiais: [
            { itemId: 'espada_titanio', quantidade: 1 },
            { itemId: 'recurso_fragmento_destino', quantidade: 10 },
            { itemId: 'recurso_essencia_lendaria', quantidade: 5 }
        ],
        nivelRequerido: 30,
        categoria: 'evolucao'
    },

    // === UPGRADE DE RARIDADE ===
    {
        id: 'upgrade_comum_incomum',
        resultado: { upgradeRarity: 'incomum' },
        materiais: [
            { itemId: 'recurso_essencia_magica', quantidade: 3 },
            { itemId: 'recurso_cristal_verde', quantidade: 1 }
        ],
        nivelRequerido: 5,
        categoria: 'upgrade',
        tipo: 'upgrade_raridade'
    },
    {
        id: 'upgrade_incomum_raro',
        resultado: { upgradeRarity: 'raro' },
        materiais: [
            { itemId: 'recurso_essencia_magica', quantidade: 5 },
            { itemId: 'recurso_cristal_azul', quantidade: 1 },
            { itemId: 'recurso_po_estelar', quantidade: 2 }
        ],
        nivelRequerido: 10,
        categoria: 'upgrade',
        tipo: 'upgrade_raridade'
    }
];

// ─── Funções de Inventário ────────────────────────────────────

function contarItemNoInventario(inventario, itemId) {
    let count = 0;
    inventario.forEach(slot => {
        if (slot && slot.id === itemId) {
            count += slot.stack || 1;
        }
    });
    return count;
}

function removerItemDoInventario(inventario, itemId, quantidade) {
    let restante = quantidade;
    for (let i = 0; i < inventario.length && restante > 0; i++) {
        const slot = inventario[i];
        if (slot && slot.id === itemId) {
            const stackAtual = slot.stack || 1;
            if (stackAtual <= restante) {
                restante -= stackAtual;
                inventario[i] = null;
            } else {
                slot.stack = stackAtual - restante;
                restante = 0;
            }
        }
    }
}

// ─── Verificação de Materiais ─────────────────────────────────

function verificarMateriaisCraft(receita, inventario) {
    for (let material of receita.materiais) {
        const quantidade = contarItemNoInventario(inventario, material.itemId);
        if (quantidade < material.quantidade) {
            return {
                temTodos: false,
                faltando: material.itemId,
                quantidadeFaltando: material.quantidade - quantidade
            };
        }
    }
    return { temTodos: true };
}

// ─── Craft com Profissão (novo sistema) ───────────────────────

// Realiza craft de equipamento usando o sistema de profissões
function realizarCraftProfissao(receitaId, inventario, playerProfessions) {
    const receita = DB_RECEITAS_CRAFT.find(r => r.id === receitaId);
    if (!receita) {
        return { sucesso: false, erro: 'Receita não encontrada' };
    }

    // Verifica nível de profissão
    if (!canCraftWithProfession(playerProfessions, receita.profissao, receita.nivelProfissao)) {
        const nomeProfissao = PROFESSION_DEFINITIONS[receita.profissao]?.name || receita.profissao;
        return {
            sucesso: false,
            erro: `${nomeProfissao} nível ${receita.nivelProfissao} necessário`
        };
    }

    // Verifica materiais
    const verificacao = verificarMateriaisCraft(receita, inventario);
    if (!verificacao.temTodos) {
        return {
            sucesso: false,
            erro: `Falta ${verificacao.quantidadeFaltando}x ${verificacao.faltando}`
        };
    }

    // Consome materiais
    for (let material of receita.materiais) {
        removerItemDoInventario(inventario, material.itemId, material.quantidade);
    }

    // Adiciona XP à profissão de trabalho
    const xpKey = `craft_t${receita.tier}`;
    const xpGained = PROFESSION_XP_REWARDS[xpKey] || 0;
    const levelResult = addProfessionXP(playerProfessions, receita.profissao, xpGained);

    return {
        sucesso: true,
        tipo: 'craft_profissao',
        itemId: receita.resultado,
        xpGained,
        profissao: receita.profissao,
        levelUp: levelResult.leveled ? levelResult.newLevel : null
    };
}

// ─── Craft Legado (evolução, upgrade) ─────────────────────────

function realizarCraftLegado(receitaId, inventario, nivelJogador) {
    const receita = RECEITAS_CRAFT_LEGADO.find(r => r.id === receitaId);
    if (!receita) {
        return { sucesso: false, erro: 'Receita não encontrada' };
    }

    if (nivelJogador < receita.nivelRequerido) {
        return { sucesso: false, erro: `Nível ${receita.nivelRequerido} necessário` };
    }

    const verificacao = verificarMateriaisCraft(receita, inventario);
    if (!verificacao.temTodos) {
        return {
            sucesso: false,
            erro: `Falta ${verificacao.quantidadeFaltando}x ${verificacao.faltando}`
        };
    }

    for (let material of receita.materiais) {
        removerItemDoInventario(inventario, material.itemId, material.quantidade);
    }

    if (receita.tipo === 'upgrade_raridade') {
        return { sucesso: true, tipo: 'upgrade', novaRaridade: receita.resultado.upgradeRarity };
    }

    return {
        sucesso: true,
        tipo: 'craft_legado',
        itemId: receita.resultado.itemId,
        quantidade: receita.resultado.quantidade
    };
}

// ─── Funções de Busca de Receitas ─────────────────────────────

// Obtém receitas de profissão disponíveis para o jogador
function obterReceitasProfissao(playerProfessions, profissaoId) {
    if (!DB_RECEITAS_CRAFT) return [];
    const nivel = getProfessionLevel(playerProfessions, profissaoId);
    return DB_RECEITAS_CRAFT.filter(r =>
        r.profissao === profissaoId && r.nivelProfissao <= nivel
    );
}

// Obtém receitas de refinamento disponíveis para o jogador
function obterReceitasRefinamento(playerProfessions, profissaoId) {
    if (!REFINAMENTO_RECIPES) return [];
    const nivel = getProfessionLevel(playerProfessions, profissaoId);
    return REFINAMENTO_RECIPES.filter(r =>
        r.profissao === profissaoId && r.nivelRequerido <= nivel
    );
}

// Obtém receitas legadas disponíveis por nível do jogador
function obterReceitasLegado(nivelJogador, categoria = null) {
    let receitas = RECEITAS_CRAFT_LEGADO.filter(r => r.nivelRequerido <= nivelJogador);
    if (categoria) {
        receitas = receitas.filter(r => r.categoria === categoria);
    }
    return receitas;
}

// ========== SISTEMA DE EMPILHAMENTO ==========

/**
 * Verifica se dois itens podem ser empilhados juntos
 * Equipamentos só podem ser empilhados se tiverem:
 * - Mesmo ID
 * - Mesma raridade (pois raridades diferentes têm bônus diferentes)
 * - Propriedade stackable = true
 */
function podeEmpilhar(item1, item2) {
    // Se qualquer um for null, não pode empilhar
    if (!item1 || !item2) return false;

    // Se IDs diferentes, não pode empilhar
    if (item1.id !== item2.id) return false;

    // Se não for empilhável, não pode empilhar
    if (!item1.stackable || !item2.stackable) return false;

    // REGRA CRÍTICA: Raridades diferentes não podem ser empilhadas
    // pois possuem bônus diferentes
    if (item1.rarity !== item2.rarity) return false;

    return true;
}

/**
 * Tenta adicionar um item ao inventário, empilhando quando possível
 * @param {Array} inventario - Array de slots do inventário
 * @param {Object} novoItem - Item a ser adicionado
 * @param {Number} quantidade - Quantidade a adicionar (padrão: 1)
 * @returns {Object} { sucesso: boolean, restante: number }
 */
function adicionarAoInventario(inventario, novoItem, quantidade = 1) {
    let restante = quantidade;

    // Se o item é empilhável, tenta empilhar em slots existentes primeiro
    if (novoItem.stackable) {
        const maxStack = novoItem.maxStack || 99;

        // Procura slots com o mesmo item e mesma raridade
        for (let i = 0; i < inventario.length && restante > 0; i++) {
            const slot = inventario[i];

            if (podeEmpilhar(slot, novoItem)) {
                const stackAtual = slot.stack || 1;
                const espacoDisponivel = maxStack - stackAtual;
                const adicionarAgora = Math.min(espacoDisponivel, restante);

                if (adicionarAgora > 0) {
                    slot.stack = stackAtual + adicionarAgora;
                    restante -= adicionarAgora;
                }
            }
        }
    }

    // Se ainda resta itens, procura slots vazios
    while (restante > 0) {
        const slotVazio = inventario.findIndex(slot => slot === null);

        if (slotVazio === -1) {
            // Inventário cheio
            return { sucesso: false, restante, mensagem: 'Inventário cheio' };
        }

        // Adiciona em um slot vazio
        const maxStack = novoItem.stackable ? (novoItem.maxStack || 99) : 1;
        const adicionarAgora = Math.min(maxStack, restante);

        inventario[slotVazio] = {
            ...novoItem,
            stack: adicionarAgora
        };
        restante -= adicionarAgora;
    }

    return { sucesso: true, restante: 0 };
}

/**
 * Adiciona propriedade stackable a todos os equipamentos
 * Equipamentos são empilháveis, mas raridades diferentes não empilham juntas
 */
function marcarEquipamentosComoEmpilhaveis(listaItens) {
    return listaItens.map(item => {
        if (item.category === 'equipment') {
            return {
                ...item,
                stackable: true,
                maxStack: 99
            };
        }
        return item;
    });
}

/**
 * Verifica se um slot de inventário pode receber um item (drag & drop)
 * @param {Object} slotDestino - Slot onde se quer colocar o item
 * @param {Object} itemOrigem - Item sendo movido
 * @returns {boolean} true se pode colocar
 */
function podeColocarNoSlot(slotDestino, itemOrigem) {
    // Slot vazio sempre aceita
    if (!slotDestino) return true;

    // Se pode empilhar, aceita
    if (podeEmpilhar(slotDestino, itemOrigem)) return true;

    // Caso contrário, terá que fazer swap
    return true; // Retorna true pois fará swap
}

/**
 * Mescla dois itens empilháveis
 * @param {Object} slotDestino - Slot que receberá os itens
 * @param {Object} itemOrigem - Item sendo movido
 * @returns {Object} { mesclado: boolean, sobra: number }
 */
function mesclarItens(slotDestino, itemOrigem) {
    if (!podeEmpilhar(slotDestino, itemOrigem)) {
        return { mesclado: false, sobra: 0 };
    }

    const maxStack = slotDestino.maxStack || 99;
    const stackDestino = slotDestino.stack || 1;
    const stackOrigem = itemOrigem.stack || 1;
    const total = stackDestino + stackOrigem;

    if (total <= maxStack) {
        // Cabe tudo no destino
        slotDestino.stack = total;
        return { mesclado: true, sobra: 0 };
    } else {
        // Destino fica cheio, sobra na origem
        slotDestino.stack = maxStack;
        return { mesclado: true, sobra: total - maxStack };
    }
}

/**
 * Retorna uma descrição do item incluindo raridade
 */
function getItemDescricao(item) {
    if (!item) return '';

    const raridadeInfo = RARIDADES[item.rarity] || RARIDADES.comum;
    const raridadeNome = raridadeInfo.nome;
    const stack = item.stack > 1 ? ` (x${item.stack})` : '';

    return `${item.name}${stack} [${raridadeNome}]`;
}

/**
 * Retorna a cor da borda baseada na raridade do item
 */
function getCorRaridade(item) {
    if (!item || !item.rarity) return '#666';

    const raridadeInfo = RARIDADES[item.rarity] || RARIDADES.comum;
    return raridadeInfo.corBorda;
}

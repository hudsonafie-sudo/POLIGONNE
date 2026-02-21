// ========== SISTEMA DE MERCADO (Leilão entre Jogadores) ==========

/**
 * Estrutura de um anúncio no mercado:
 * {
 *   id: 'anuncio_123',
 *   vendedorId: 'player_001',
 *   vendedorNome: 'João',
 *   item: { ...itemCompleto },
 *   quantidade: 5,
 *   precoUnitario: 100,
 *   precoTotal: 500,
 *   dataPublicacao: timestamp,
 *   status: 'ativo' | 'vendido' | 'cancelado'
 * }
 */

// Banco de dados do mercado (simulado - em produção seria servidor)
let MERCADO_DATABASE = [];

/**
 * Publica um item no mercado
 */
function publicarNoMercado(vendedorId, vendedorNome, item, quantidade, precoUnitario) {
    // Validações
    if (!item || quantidade <= 0 || precoUnitario <= 0) {
        return { sucesso: false, erro: 'Dados inválidos' };
    }

    // Cria o anúncio
    const anuncio = {
        id: `anuncio_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        vendedorId: vendedorId,
        vendedorNome: vendedorNome,
        item: { ...item }, // Copia do item completo (com raridade, atributos, etc)
        quantidade: quantidade,
        precoUnitario: precoUnitario,
        precoTotal: precoUnitario * quantidade,
        dataPublicacao: Date.now(),
        status: 'ativo'
    };

    MERCADO_DATABASE.push(anuncio);

    return {
        sucesso: true,
        anuncioId: anuncio.id,
        mensagem: `${quantidade}x ${item.name} publicado por ${precoUnitario} moedas cada`
    };
}

/**
 * Remove um anúncio do mercado (cancelamento)
 */
function cancelarAnuncio(anuncioId, jogadorId) {
    const anuncio = MERCADO_DATABASE.find(a => a.id === anuncioId);

    if (!anuncio) {
        return { sucesso: false, erro: 'Anúncio não encontrado' };
    }

    if (anuncio.vendedorId !== jogadorId) {
        return { sucesso: false, erro: 'Você não é o vendedor deste item' };
    }

    if (anuncio.status !== 'ativo') {
        return { sucesso: false, erro: 'Anúncio já foi finalizado' };
    }

    anuncio.status = 'cancelado';

    return {
        sucesso: true,
        item: anuncio.item,
        quantidade: anuncio.quantidade,
        mensagem: 'Anúncio cancelado. Itens devolvidos ao inventário.'
    };
}

/**
 * Compra um item do mercado
 */
function comprarDoMercado(anuncioId, compradorId, quantidadeDesejada) {
    const anuncio = MERCADO_DATABASE.find(a => a.id === anuncioId);

    if (!anuncio) {
        return { sucesso: false, erro: 'Anúncio não encontrado' };
    }

    if (anuncio.status !== 'ativo') {
        return { sucesso: false, erro: 'Este anúncio não está mais disponível' };
    }

    if (anuncio.vendedorId === compradorId) {
        return { sucesso: false, erro: 'Você não pode comprar seus próprios itens' };
    }

    if (quantidadeDesejada > anuncio.quantidade) {
        return { sucesso: false, erro: 'Quantidade insuficiente disponível' };
    }

    const custoTotal = anuncio.precoUnitario * quantidadeDesejada;

    // Se comprou tudo
    if (quantidadeDesejada === anuncio.quantidade) {
        anuncio.status = 'vendido';
        anuncio.compradorId = compradorId;
    } else {
        // Compra parcial - reduz quantidade disponível
        anuncio.quantidade -= quantidadeDesejada;
    }

    return {
        sucesso: true,
        item: anuncio.item,
        quantidade: quantidadeDesejada,
        custoTotal: custoTotal,
        vendedorId: anuncio.vendedorId,
        mensagem: `Comprou ${quantidadeDesejada}x ${anuncio.item.name} por ${custoTotal} moedas`
    };
}

/**
 * Filtros e ordenação do mercado
 */
const FILTROS_MERCADO = {
    // Por categoria
    categoria: {
        todos: (anuncio) => true,
        armas: (anuncio) => anuncio.item.slot === 'weapon',
        armaduras: (anuncio) => ['helmet', 'chest', 'boots', 'weaponLeft', 'ring', 'amulet', 'belt', 'cape'].includes(anuncio.item.slot),
        acessorios: (anuncio) => anuncio.item.slot === 'bag' || anuncio.item.category === 'tool',
        consumiveis: (anuncio) => anuncio.item.category === 'consumable',
        recursos: (anuncio) => anuncio.item.category === 'resource'
    },

    // Por raridade
    raridade: {
        todos: (anuncio) => true,
        comum: (anuncio) => anuncio.item.rarity === 'comum',
        incomum: (anuncio) => anuncio.item.rarity === 'incomum',
        raro: (anuncio) => anuncio.item.rarity === 'raro',
        epico: (anuncio) => anuncio.item.rarity === 'epico',
        lendario: (anuncio) => anuncio.item.rarity === 'lendario'
    }
};

const ORDENACOES_MERCADO = {
    // Por preço
    precoMenor: (a, b) => a.precoUnitario - b.precoUnitario,
    precoMaior: (a, b) => b.precoUnitario - a.precoUnitario,

    // Por data
    maisRecente: (a, b) => b.dataPublicacao - a.dataPublicacao,
    maisAntigo: (a, b) => a.dataPublicacao - b.dataPublicacao,

    // Por quantidade
    quantidadeMaior: (a, b) => b.quantidade - a.quantidade,
    quantidadeMenor: (a, b) => a.quantidade - b.quantidade,

    // Por raridade (ordem de valor)
    raridadeMaior: (a, b) => {
        const ordem = { comum: 1, incomum: 2, raro: 3, epico: 4, lendario: 5 };
        return (ordem[b.item.rarity] || 0) - (ordem[a.item.rarity] || 0);
    },
    raridadeMenor: (a, b) => {
        const ordem = { comum: 1, incomum: 2, raro: 3, epico: 4, lendario: 5 };
        return (ordem[a.item.rarity] || 0) - (ordem[b.item.rarity] || 0);
    }
};

/**
 * Busca anúncios no mercado com filtros e ordenação
 */
function buscarNoMercado(opcoes = {}) {
    const {
        categoria = 'todos',
        raridade = 'todos',
        ordenarPor = 'maisRecente',
        buscarTexto = '',
        apenasAtivos = true
    } = opcoes;

    // Filtra anúncios
    let anuncios = MERCADO_DATABASE;

    // Apenas ativos?
    if (apenasAtivos) {
        anuncios = anuncios.filter(a => a.status === 'ativo');
    }

    // Filtro de categoria
    if (FILTROS_MERCADO.categoria[categoria]) {
        anuncios = anuncios.filter(FILTROS_MERCADO.categoria[categoria]);
    }

    // Filtro de raridade
    if (FILTROS_MERCADO.raridade[raridade]) {
        anuncios = anuncios.filter(FILTROS_MERCADO.raridade[raridade]);
    }

    // Busca por texto (nome do item)
    if (buscarTexto) {
        const textoBusca = buscarTexto.toLowerCase();
        anuncios = anuncios.filter(a =>
            a.item.name.toLowerCase().includes(textoBusca)
        );
    }

    // Ordenação
    if (ORDENACOES_MERCADO[ordenarPor]) {
        anuncios = [...anuncios].sort(ORDENACOES_MERCADO[ordenarPor]);
    }

    return anuncios;
}

/**
 * Obtém estatísticas do mercado (preços médios, etc)
 */
function obterEstatisticasMercado(itemId, raridadeId) {
    const anunciosAtivos = MERCADO_DATABASE.filter(a =>
        a.status === 'ativo' &&
        a.item.id === itemId &&
        a.item.rarity === raridadeId
    );

    if (anunciosAtivos.length === 0) {
        return {
            existe: false,
            mensagem: 'Nenhum anúncio ativo para este item'
        };
    }

    const precos = anunciosAtivos.map(a => a.precoUnitario);
    const precoMinimo = Math.min(...precos);
    const precoMaximo = Math.max(...precos);
    const precoMedio = precos.reduce((a, b) => a + b, 0) / precos.length;
    const quantidadeTotal = anunciosAtivos.reduce((sum, a) => sum + a.quantidade, 0);

    return {
        existe: true,
        itemId: itemId,
        raridade: raridadeId,
        totalAnuncios: anunciosAtivos.length,
        quantidadeDisponivel: quantidadeTotal,
        precoMinimo: Math.floor(precoMinimo),
        precoMaximo: Math.floor(precoMaximo),
        precoMedio: Math.floor(precoMedio),
        precoSugerido: Math.floor(precoMedio * 0.95) // 5% abaixo da média
    };
}

/**
 * Limpa anúncios antigos (vendidos há mais de X dias)
 */
function limparAnunciosAntigos(diasMaximo = 7) {
    const agora = Date.now();
    const limiteMs = diasMaximo * 24 * 60 * 60 * 1000;

    const antes = MERCADO_DATABASE.length;
    MERCADO_DATABASE = MERCADO_DATABASE.filter(a => {
        if (a.status === 'ativo') return true; // Mantém ativos
        const idade = agora - a.dataPublicacao;
        return idade < limiteMs; // Remove vendidos/cancelados muito antigos
    });

    const removidos = antes - MERCADO_DATABASE.length;
    return { removidos };
}

/**
 * Obtém histórico de vendas de um jogador
 */
function obterHistoricoVendas(jogadorId) {
    return MERCADO_DATABASE
        .filter(a => a.vendedorId === jogadorId)
        .sort((a, b) => b.dataPublicacao - a.dataPublicacao);
}

/**
 * Obtém histórico de compras de um jogador
 */
function obterHistoricoCompras(jogadorId) {
    return MERCADO_DATABASE
        .filter(a => a.compradorId === jogadorId)
        .sort((a, b) => b.dataPublicacao - a.dataPublicacao);
}

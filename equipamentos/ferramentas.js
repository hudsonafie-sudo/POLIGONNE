// ========== BANCO DE DADOS: FERRAMENTAS DE PROFISSÃO ==========
// Ferramentas equipáveis no slot de profissão (tool_<profissao>)
// Bônus: 50% chance de +1 yield ao coletar/craftar
// Cada profissão de trabalho/coleta pode ter sua própria ferramenta
// CatalogId prefixo: 0108

const DB_FERRAMENTAS = [

    // ==================== FERRAMENTAS DE TRABALHO ====================

    {
        id: 'ferramenta_padeiro',
        catalogId: '0108000001',
        name: 'Rolo de Massa',
        icon: '🪵',
        svgIcon: { shape: 'rolling-pin', palette: 'bone' },
        category: 'tool',
        slot: 'tool',
        profissao: 'padeiro',
        tier: 1,
        description: 'Ferramenta essencial do padeiro. +50% chance de produção extra ao preparar receitas.',
        bonus: {
            type: 'extra_yield',
            chance: 0.5,
            extraAmount: 1
        }
    }
];

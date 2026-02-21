// ========== PASSIVOS UNIVERSAIS ==========
// Passivos que QUALQUER classe pode equipar
// Jogador pode equipar até 5 passivos (mix de passivos de classe + universais)

const DB_PASSIVOS_UNIVERSAIS = [
    {
        id: 'passivo_uni_iniciativa',
        catalogId: '0801000001',
        name: 'Iniciativa Aprimorada',
        icon: '⚡',
        rarity: 'comum',
        nivelRequerido: 1,
        category: 'universal',
        effects: { iniciativa: 15 }, // +15 iniciativa (afeta ordem de turno)
        description: '+15 de iniciativa (age mais cedo no combate)'
    },
    {
        id: 'passivo_uni_defesa',
        catalogId: '0801000002',
        name: 'Defesa Aprimorada',
        icon: '🛡️',
        rarity: 'comum',
        nivelRequerido: 1,
        category: 'universal',
        effects: { parada: 8 }, // +8% parada (bloqueio/esquiva)
        description: '+8% de chance de parada (reduz dano em 30%)'
    },
    {
        id: 'passivo_uni_vitalidade',
        catalogId: '0801000003',
        name: 'Vitalidade Aprimorada',
        icon: '💚',
        rarity: 'comum',
        nivelRequerido: 1,
        category: 'universal',
        effects: { maxHpPercent: 20 }, // +20% HP máximo
        description: '+20% de HP máximo'
    },
    {
        id: 'passivo_uni_foco_ofensivo',
        catalogId: '0801000004',
        name: 'Foco Ofensivo',
        icon: '⚔️💢',
        rarity: 'raro',
        nivelRequerido: 10,
        category: 'universal',
        effects: {
            dmg_geral: 25,        // +25% dano
            support: -50          // -50% cura realizada
        },
        description: '+25% de dano causado, mas -50% de cura realizada'
    },
    {
        id: 'passivo_uni_foco_suporte',
        catalogId: '0801000005',
        name: 'Foco de Suporte',
        icon: '✨',
        rarity: 'raro',
        nivelRequerido: 10,
        category: 'universal',
        effects: {
            support: 35,          // +35% cura realizada
            dmg_geral: -30        // -30% dano causado
        },
        description: '+35% de cura realizada, mas -30% de dano causado'
    }
];

// Retorna definição de um passivo por ID
function getPassivoUniversal(passivoId) {
    return DB_PASSIVOS_UNIVERSAIS.find(function(p) { return p.id === passivoId; }) || null;
}

// Retorna todos os passivos universais
function getAllPassivosUniversais() {
    return DB_PASSIVOS_UNIVERSAIS;
}

// Retorna passivos disponíveis para o nível do jogador
function getAvailablePassivos(nivelJogador) {
    return DB_PASSIVOS_UNIVERSAIS.filter(function(p) { return p.nivelRequerido <= nivelJogador; });
}

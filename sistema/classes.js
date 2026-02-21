// ========== SISTEMA DE CLASSES ==========
// 6 Classes jogáveis com feitiços e identidades únicas
// Deps: nenhuma (apenas definições)

const DB_CLASSES = [
    {
        id: 'orik',
        name: 'Orik',
        icon: '⚔️',
        subtitle: 'Lâmina Inabalável',
        quote: 'O ferro não recua.',
        nameOrigin: 'Som de "iron/ferro" em línguas nórdicas',
        description: 'DPS corpo a corpo com roubo de armadura. Ganha PA ao matar e armor ao bloquear. Bom para iniciantes.',
        difficulty: 'Fácil',
        role: 'DPS Corpo a Corpo',
        elements: ['fire', 'earth', 'air'],
        baseStats: {
            hp: 100,
            pa: 6,
            pm: 3,
            strength: 0,
            intelligence: 0,
            agility: 0,
            luck: 0,
            wisdom: 0
        },
        triggers: {
            onKill: ['stealPA'],
            onBlock: ['gainArmor', 'gainDamage']
        },
        spellIds: [
            // Fogo (5)
            'orik_espada_flamejante',
            'orik_golpe_incandescente',
            'orik_pilar_fogo',
            'orik_ira_vulcao',
            'orik_explosao_poder',
            // Terra (5)
            'orik_rachadura_terrestre',
            'orik_muralha_pedra',
            'orik_impacto_sismico',
            'orik_pele_rochosa',
            'orik_cruz_sagrada',
            // Ar (5)
            'orik_corte_ventoso',
            'orik_rajada_cortante',
            'orik_lamina_ciclone',
            'orik_vento_cortante',
            'orik_vendaval_aco',
            // Ativos (5)
            'orik_salto_heroico',
            'orik_estandarte',
            'orik_defesa',
            'orik_provocar',
            'orik_grito_guerra',
            // Passivos (5)
            'orik_passivo_defensor',
            'orik_passivo_contraataque',
            'orik_passivo_resiliencia',
            'orik_passivo_furia',
            'orik_passivo_fortitude',
            // DOM (1)
            'orik_dom_ira_titan',
            // [TESTE] — não disponível para jogadores
            'teste_roubo_pa'
        ]
    },
    {
        id: 'zefir',
        name: 'Zefir',
        icon: '🏹',
        subtitle: 'Sombra Silente',
        quote: 'O vento não deixa rastro.',
        nameOrigin: 'De "Zéfiro", o vento oeste na mitologia grega',
        description: 'DPS a distância com kiting puro. Ganha PM ao matar. Ricochete e longo alcance.',
        difficulty: 'Fácil',
        role: 'DPS a Distância',
        elements: ['air', 'fire', 'earth'],
        baseStats: {
            hp: 100,
            pa: 6,
            pm: 3,
            strength: 0,
            intelligence: 0,
            agility: 0,
            luck: 0,
            wisdom: 0
        },
        triggers: {
            onKill: ['stealPM']
        },
        spellIds: [
            // Ar (5)
            'atirador_flecha_vento',
            'atirador_rajada_ar',
            'atirador_laminas_vento',
            'atirador_tempestade_precisao',
            'atirador_rajada_continua',
            // Fogo (5)
            'atirador_tiro_incendiario',
            'atirador_marca_chamas',
            'atirador_disparo_flamejante',
            'atirador_flecha_explosiva',
            'atirador_flecha_venenosa',
            // Terra (5)
            'atirador_flecha_perfurante',
            'atirador_marca_eterea',
            'atirador_tiro_estilhaçante',
            'atirador_tiro_erosivo',
            'atirador_tiro_crescente',
            // Ativos (5)
            'atirador_rolamento_tatico',
            'atirador_sombra_fugaz',
            'atirador_empurrao',
            'atirador_mira_certeira',
            'atirador_recuar',
            // Passivos (5)
            'atirador_passivo_olho_aguia',
            'atirador_passivo_mobilidade',
            'atirador_passivo_precisao_mortal',
            'atirador_passivo_queima_roupa',
            'atirador_passivo_agilidade_felina',
            // DOM (1)
            'atirador_dom_mira_predadora'
        ]
    },
    {
        id: 'garren',
        name: 'Garren',
        icon: '🐺',
        subtitle: 'Predador Sombrio',
        quote: 'Mata para viver, vive para matar.',
        nameOrigin: 'De "Garra" — predatório e animalesco',
        description: 'Bruiser versátil com alto sustain. Life steal, troca de posição e múltiplos triggers.',
        difficulty: 'Médio',
        role: 'Bruiser Versátil',
        elements: ['water', 'air', 'earth'],
        baseStats: {
            hp: 100,
            pa: 6,
            pm: 3,
            strength: 0,
            intelligence: 0,
            agility: 0,
            luck: 0,
            wisdom: 0
        },
        triggers: {
            onKill: ['stealHP', 'stealPM', 'stealShield'],
            onHitTaken: ['gainShield']
        },
        spellIds: [
            // Água (5)
            'cacador_garra_aquatica',
            'cacador_cura_torrencial',
            'cacador_prisao_agua',
            'cacador_vortice_draconiano',
            'cacador_maremoto_furia',
            // Ar (5)
            'cacador_garras_vento',
            'cacador_corrente_ascendente',
            'cacador_ciclone_draconiano',
            'cacador_danca_ventos',
            'cacador_furacão_selvagem',
            // Terra (5)
            'cacador_impacto_draconiano',
            'cacador_prisao_rochosa',
            'cacador_pele_escamas',
            'cacador_terremoto_ancestral',
            'cacador_furia_terrestre',
            // Ativos (3)
            'cacador_evasao',
            'cacador_troca_tatica',
            'cacador_corrente_ascendente_pos',
            // Passivos (2)
            'cacador_passivo_instinto_predador',
            'cacador_passivo_regeneracao',
            // DOM (1)
            'cacador_dom_forma_draconica'
        ]
    },
    {
        id: 'aegis',
        name: 'Aegis',
        icon: '🛡️',
        subtitle: 'Bastião Eterno',
        quote: 'Atrás de mim, ninguém passa.',
        nameOrigin: 'Escudo mitológico grego de Zeus e Atena',
        description: 'Tank puro, melhor bloqueador. Estabilizado e múltiplos triggers defensivos.',
        difficulty: 'Médio',
        role: 'Tank Puro',
        elements: ['earth', 'fire', 'water'],
        baseStats: {
            hp: 100,
            pa: 6,
            pm: 3,
            strength: 0,
            intelligence: 0,
            agility: 0,
            luck: 0,
            wisdom: 0
        },
        triggers: {
            onHitTaken: ['gainArmor', 'gainResistance'],
            onBlock: ['gainPA', 'gainArmor', 'gainShield', 'concedeArmor']
        },
        spellIds: [
            // Terra (5)
            'guardiao_muralha_guardian',
            'guardiao_bastiao',
            'guardiao_fortificacao',
            'guardiao_aegis_rochosa',
            'guardiao_fortaleza_inabalavel',
            // Fogo (5)
            'guardiao_escudo_chamas',
            'guardiao_retaliacao_ardente',
            'guardiao_barreira_fogo',
            'guardiao_ira_justa',
            'guardiao_imolacao_protetora',
            // Água (5)
            'guardiao_escudo_luz',
            'guardiao_cura_protetora',
            'guardiao_resgate_heroico',
            'guardiao_refluxo_protetor',
            'guardiao_santuario_aquatico',
            // Ativos (3)
            'guardiao_provocar',
            'guardiao_bastiao_ativo',
            'guardiao_aegis',
            // Passivos (2)
            'guardiao_passivo_guardiao_eterno',
            'guardiao_passivo_escudo_vivo',
            // DOM (1)
            'guardiao_dom_fortaleza_absoluta'
        ]
    },
    {
        id: 'klaris',
        name: 'Klaris',
        icon: '✨',
        subtitle: 'Luz Divina',
        quote: 'Enquanto eu respirar, ninguém cai.',
        nameOrigin: 'De "Claridade/Clareza" — puro e luminoso',
        description: 'Suporte essencial com toggle mode. Cura aliados ao sofrer dano.',
        difficulty: 'Médio',
        role: 'Suporte/Healer',
        elements: ['water', 'fire', 'air'],
        baseStats: {
            hp: 100,
            pa: 6,
            pm: 3,
            strength: 0,
            intelligence: 0,
            agility: 0,
            luck: 0,
            wisdom: 0
        },
        triggers: {
            onHitTaken: ['healAllies']
        },
        spellIds: [
            // Água (5)
            'clerigo_cura_divina',
            'clerigo_onda_curativa',
            'clerigo_benção_aquas',
            'clerigo_purificação',
            'clerigo_diluvio_sagrado',
            // Fogo (5)
            'clerigo_chama_purificadora',
            'clerigo_ira_divina',
            'clerigo_pilar_luz',
            'clerigo_julgamento_final',
            'clerigo_fogo_purificador',
            // Ar (5)
            'clerigo_brisa_curativa',
            'clerigo_vento_protetor',
            'clerigo_asas_anjo',
            'clerigo_tornado_sagrado',
            'clerigo_tempestade_divina',
            // Ativos (3)
            'clerigo_aura_sagrada',
            'clerigo_escudo_fe',
            'clerigo_inspiracao_divina',
            'clerigo_ressurreicao',
            // Passivos (2)
            'clerigo_passivo_vinculo_sagrado',
            'clerigo_passivo_martir',
            // DOM (1)
            'clerigo_dom_avatar_luz'
        ]
    },
    {
        id: 'kaos',
        name: 'Kaos',
        icon: '💢',
        subtitle: 'Fúria Sangrenta',
        quote: 'Dor é combustível.',
        nameOrigin: 'De "Caos" — direto e instável',
        description: 'Alto risco/recompensa. Berserk em 50% HP, auto-dano, HP scaling. Expert only.',
        difficulty: 'Difícil',
        role: 'DPS Suicida',
        elements: ['fire', 'earth', 'air'],
        baseStats: {
            hp: 100,
            pa: 6,
            pm: 3,
            strength: 0,
            intelligence: 0,
            agility: 0,
            luck: 0,
            wisdom: 0
        },
        triggers: {
            onKill: ['stealPA', 'stealPM', 'stealHP', 'stealArmor'],
            onHitTaken: ['gainDamageBonus']
        },
        spellIds: [
            // Fogo (5)
            'berserker_furia_sangrenta',
            'berserker_chama_desesperada',
            'berserker_aniquilacao',
            'berserker_imolacao',
            'berserker_inferno_raiva',
            // Terra (5)
            'berserker_golpe_brutal',
            'berserker_terremoto_raiva',
            'berserker_esmagamento',
            'berserker_pele_ferro',
            'berserker_abalo_sismico',
            // Ar (5)
            'berserker_tornado_furia',
            'berserker_velocidade_mortal',
            'berserker_ciclone_dor',
            'berserker_tempestade_sangue',
            'berserker_vendaval_caos',
            // Ativos (3)
            'berserker_frenesi',
            'berserker_salto_devastador',
            'berserker_investida_sangrenta',
            // Passivos (2)
            'berserker_passivo_sede_sangue',
            'berserker_passivo_ultimo_suspiro',
            // DOM (1)
            'berserker_dom_forma_berserk'
        ]
    }
];

// Retorna definição de uma classe por ID
function getClassDefinition(classId) {
    return DB_CLASSES.find(function(c) { return c.id === classId; }) || null;
}

// Retorna todas as classes
function getAllClasses() {
    return DB_CLASSES;
}

// Retorna nomes de feitiços de uma classe
function getClassSpellIds(classId) {
    var classDef = getClassDefinition(classId);
    return classDef ? classDef.spellIds : [];
}

// ========== RECEITAS DE CRAFT — Profissões de Trabalho ==========
//
// RECURSOS DE MONSTRO — proporção alinhada com taxas de drop:
//   Comum dropa ~5× mais que Incomum, ~33× mais que Raro
//   Receitas consomem na mesma proporção para equilibrar o mercado
//   T1: 6-10 comum + 2 incomum + boss drop
//   T2: 10-12 comum + 3-4 incomum + 1 raro + boss drop
//   T2 Avançado: 12-18 comum + 4-6 incomum + 1-2 raro + boss drop
//
// RECURSOS REFINADOS (profissão de coleta) — NÃO seguem proporção de drop
//   Quantidades livres (1-5), usados também em refinamentos e futuros sistemas

const DB_RECEITAS_CRAFT = [

    // =========================================================================
    // === ALFAIATE (helmet + cape) ============================================
    // === Usa: Fazendeiro (refinado_farinha_trigo / fio_linho)
    // ===     + Lenhador (refinado_tabua_pinho / tabua_carvalho)
    // =========================================================================

    // --- T1 Helmets (nivelProfissao: 1) ---

    {
        id: 'craft_capacete_rato',
        resultado: 'capacete_rato',
        profissao: 'alfaiate',
        nivelProfissao: 1,
        tier: 1,
        materiais: [
            { itemId: 'recurso_rabo_rato', quantidade: 8 },
            { itemId: 'recurso_dente_rato', quantidade: 2 },
            { itemId: 'refinado_farinha_trigo', quantidade: 2 },
            { itemId: 'refinado_tabua_pinho', quantidade: 1 }
        ]
    },
    {
        id: 'craft_capacete_barata',
        resultado: 'capacete_barata',
        profissao: 'alfaiate',
        nivelProfissao: 1,
        tier: 1,
        materiais: [
            { itemId: 'recurso_casca_barata', quantidade: 8 },
            { itemId: 'recurso_antena_barata', quantidade: 2 },
            { itemId: 'refinado_farinha_trigo', quantidade: 2 },
            { itemId: 'refinado_tabua_pinho', quantidade: 1 }
        ]
    },
    {
        id: 'craft_capacete_cogumelo',
        resultado: 'capacete_cogumelo',
        profissao: 'alfaiate',
        nivelProfissao: 1,
        tier: 1,
        materiais: [
            { itemId: 'recurso_esporo_cogumelo', quantidade: 8 },
            { itemId: 'recurso_chapeu_cogumelo', quantidade: 2 },
            { itemId: 'refinado_farinha_trigo', quantidade: 3 }
        ]
    },
    {
        id: 'craft_capacete_sapo',
        resultado: 'capacete_sapo',
        profissao: 'alfaiate',
        nivelProfissao: 1,
        tier: 1,
        materiais: [
            { itemId: 'recurso_gosma_sapo', quantidade: 8 },
            { itemId: 'recurso_lingua_sapo', quantidade: 2 },
            { itemId: 'refinado_farinha_trigo', quantidade: 2 },
            { itemId: 'refinado_tabua_pinho', quantidade: 1 }
        ]
    },
    {
        id: 'craft_capacete_morcego',
        resultado: 'capacete_morcego',
        profissao: 'alfaiate',
        nivelProfissao: 1,
        tier: 1,
        materiais: [
            { itemId: 'recurso_asa_morcego', quantidade: 8 },
            { itemId: 'recurso_presa_morcego', quantidade: 2 },
            { itemId: 'refinado_farinha_trigo', quantidade: 2 },
            { itemId: 'refinado_tabua_pinho', quantidade: 1 }
        ]
    },
    {
        id: 'craft_capacete_planta',
        resultado: 'capacete_planta',
        profissao: 'alfaiate',
        nivelProfissao: 1,
        tier: 1,
        materiais: [
            { itemId: 'recurso_raiz_viva', quantidade: 8 },
            { itemId: 'recurso_seiva_nutritiva', quantidade: 2 },
            { itemId: 'refinado_farinha_trigo', quantidade: 2 }
        ]
    },

    // --- T1 Capes (nivelProfissao: 1) ---

    {
        id: 'craft_capa_cogumelo',
        resultado: 'capa_cogumelo',
        profissao: 'alfaiate',
        nivelProfissao: 1,
        tier: 1,
        materiais: [
            { itemId: 'recurso_esporo_cogumelo', quantidade: 8 },
            { itemId: 'recurso_chapeu_cogumelo', quantidade: 2 },
            { itemId: 'refinado_farinha_trigo', quantidade: 3 }
        ]
    },
    {
        id: 'craft_capa_sapo',
        resultado: 'capa_sapo',
        profissao: 'alfaiate',
        nivelProfissao: 1,
        tier: 1,
        materiais: [
            { itemId: 'recurso_gosma_sapo', quantidade: 8 },
            { itemId: 'recurso_lingua_sapo', quantidade: 2 },
            { itemId: 'refinado_farinha_trigo', quantidade: 3 }
        ]
    },
    {
        id: 'craft_capa_morcego',
        resultado: 'capa_morcego',
        profissao: 'alfaiate',
        nivelProfissao: 1,
        tier: 1,
        materiais: [
            { itemId: 'recurso_asa_morcego', quantidade: 8 },
            { itemId: 'recurso_presa_morcego', quantidade: 2 },
            { itemId: 'refinado_farinha_trigo', quantidade: 3 }
        ]
    },

    // --- T2 Helmets (nivelProfissao: 5) ---

    {
        id: 'craft_capacete_lobo',
        resultado: 'capacete_lobo',
        profissao: 'alfaiate',
        nivelProfissao: 5,
        tier: 2,
        materiais: [
            { itemId: 'recurso_pele_lobo', quantidade: 10 },
            { itemId: 'recurso_presa_lobo', quantidade: 3 },
            { itemId: 'recurso_essencia_lobo', quantidade: 1 },
            { itemId: 'refinado_fio_linho', quantidade: 3 },
            { itemId: 'refinado_tabua_carvalho', quantidade: 1 }
        ]
    },
    {
        id: 'craft_capacete_aranha',
        resultado: 'capacete_aranha',
        profissao: 'alfaiate',
        nivelProfissao: 5,
        tier: 2,
        materiais: [
            { itemId: 'recurso_teia_aranha', quantidade: 10 },
            { itemId: 'recurso_glandula_venenosa', quantidade: 3 },
            { itemId: 'recurso_presas_viuva', quantidade: 1 },
            { itemId: 'refinado_fio_linho', quantidade: 3 }
        ]
    },
    {
        id: 'craft_capacete_javali',
        resultado: 'capacete_javali',
        profissao: 'alfaiate',
        nivelProfissao: 5,
        tier: 2,
        materiais: [
            { itemId: 'recurso_presa_javali', quantidade: 10 },
            { itemId: 'recurso_couro_javali', quantidade: 3 },
            { itemId: 'recurso_coracao_patriarca_javali', quantidade: 1 },
            { itemId: 'refinado_fio_linho', quantidade: 3 },
            { itemId: 'refinado_tabua_carvalho', quantidade: 1 }
        ]
    },
    {
        id: 'craft_capacete_esqueleto',
        resultado: 'capacete_esqueleto',
        profissao: 'alfaiate',
        nivelProfissao: 5,
        tier: 2,
        materiais: [
            { itemId: 'recurso_osso_polido', quantidade: 10 },
            { itemId: 'recurso_cranio_intacto', quantidade: 3 },
            { itemId: 'recurso_essencia_morte', quantidade: 1 },
            { itemId: 'refinado_fio_linho', quantidade: 2 },
            { itemId: 'refinado_tabua_carvalho', quantidade: 1 }
        ]
    },
    {
        id: 'craft_capacete_cobra',
        resultado: 'capacete_cobra',
        profissao: 'alfaiate',
        nivelProfissao: 5,
        tier: 2,
        materiais: [
            { itemId: 'recurso_escama_cobra', quantidade: 10 },
            { itemId: 'recurso_veneno_cobra', quantidade: 3 },
            { itemId: 'recurso_olho_serpente', quantidade: 1 },
            { itemId: 'refinado_fio_linho', quantidade: 3 }
        ]
    },
    {
        id: 'craft_capacete_goblin',
        resultado: 'capacete_goblin',
        profissao: 'alfaiate',
        nivelProfissao: 5,
        tier: 2,
        materiais: [
            { itemId: 'recurso_orelha_goblin', quantidade: 10 },
            { itemId: 'recurso_amuleto_goblin', quantidade: 3 },
            { itemId: 'recurso_coroa_chefe_goblin', quantidade: 1 },
            { itemId: 'refinado_fio_linho', quantidade: 3 },
            { itemId: 'refinado_tabua_carvalho', quantidade: 1 }
        ]
    },

    // --- T2 Capes (nivelProfissao: 5) ---

    {
        id: 'craft_capa_lobo',
        resultado: 'capa_lobo',
        profissao: 'alfaiate',
        nivelProfissao: 5,
        tier: 2,
        materiais: [
            { itemId: 'recurso_pele_lobo', quantidade: 10 },
            { itemId: 'recurso_essencia_lobo', quantidade: 1 },
            { itemId: 'refinado_fio_linho', quantidade: 4 }
        ]
    },
    {
        id: 'craft_capa_aranha',
        resultado: 'capa_aranha',
        profissao: 'alfaiate',
        nivelProfissao: 5,
        tier: 2,
        materiais: [
            { itemId: 'recurso_teia_aranha', quantidade: 10 },
            { itemId: 'recurso_presas_viuva', quantidade: 1 },
            { itemId: 'refinado_fio_linho', quantidade: 4 }
        ]
    },
    {
        id: 'craft_capa_cobra',
        resultado: 'capa_cobra',
        profissao: 'alfaiate',
        nivelProfissao: 5,
        tier: 2,
        materiais: [
            { itemId: 'recurso_escama_cobra', quantidade: 10 },
            { itemId: 'recurso_olho_serpente', quantidade: 1 },
            { itemId: 'refinado_fio_linho', quantidade: 4 }
        ]
    },

    // --- T2 Avançado Helmets (nivelProfissao: 10) ---

    {
        id: 'craft_capacete_urso',
        resultado: 'capacete_urso',
        profissao: 'alfaiate',
        nivelProfissao: 10,
        tier: 2,
        materiais: [
            { itemId: 'recurso_pele_urso', quantidade: 15 },
            { itemId: 'recurso_garra_urso', quantidade: 5 },
            { itemId: 'recurso_essencia_forca', quantidade: 1 },
            { itemId: 'refinado_fio_linho', quantidade: 5 },
            { itemId: 'refinado_tabua_carvalho', quantidade: 3 }
        ]
    },
    {
        id: 'craft_capacete_troll',
        resultado: 'capacete_troll',
        profissao: 'alfaiate',
        nivelProfissao: 10,
        tier: 2,
        materiais: [
            { itemId: 'recurso_pele_troll', quantidade: 15 },
            { itemId: 'recurso_sangue_troll', quantidade: 5 },
            { itemId: 'recurso_coracao_troll_rei', quantidade: 1 },
            { itemId: 'refinado_fio_linho', quantidade: 5 },
            { itemId: 'refinado_tabua_carvalho', quantidade: 2 }
        ]
    },
    {
        id: 'craft_capacete_golem',
        resultado: 'capacete_golem',
        profissao: 'alfaiate',
        nivelProfissao: 10,
        tier: 2,
        materiais: [
            { itemId: 'recurso_fragmento_pedra', quantidade: 15 },
            { itemId: 'recurso_nucleo_golem', quantidade: 5 },
            { itemId: 'recurso_cristal_golem_anciao', quantidade: 1 },
            { itemId: 'refinado_fio_linho', quantidade: 5 }
        ]
    },
    {
        id: 'craft_capacete_harpia',
        resultado: 'capacete_harpia',
        profissao: 'alfaiate',
        nivelProfissao: 10,
        tier: 2,
        materiais: [
            { itemId: 'recurso_pluma_harpia', quantidade: 15 },
            { itemId: 'recurso_garra_harpia', quantidade: 5 },
            { itemId: 'recurso_coroa_rainha_harpia', quantidade: 1 },
            { itemId: 'refinado_fio_linho', quantidade: 6 }
        ]
    },
    {
        id: 'craft_capacete_lagarto',
        resultado: 'capacete_lagarto',
        profissao: 'alfaiate',
        nivelProfissao: 10,
        tier: 2,
        materiais: [
            { itemId: 'recurso_escama_lagarto', quantidade: 15 },
            { itemId: 'recurso_cauda_lagarto', quantidade: 5 },
            { itemId: 'recurso_coroa_rei_lagarto', quantidade: 1 },
            { itemId: 'refinado_fio_linho', quantidade: 5 },
            { itemId: 'refinado_tabua_carvalho', quantidade: 2 }
        ]
    },
    {
        id: 'craft_capacete_ogro',
        resultado: 'capacete_ogro',
        profissao: 'alfaiate',
        nivelProfissao: 10,
        tier: 2,
        materiais: [
            { itemId: 'recurso_dente_ogro', quantidade: 15 },
            { itemId: 'recurso_cinto_ogro', quantidade: 5 },
            { itemId: 'recurso_olho_chefe_ogro', quantidade: 1 },
            { itemId: 'refinado_fio_linho', quantidade: 5 },
            { itemId: 'refinado_tabua_carvalho', quantidade: 3 }
        ]
    },

    // --- T2 Avançado Capes (nivelProfissao: 10) ---

    {
        id: 'craft_capa_harpia',
        resultado: 'capa_harpia',
        profissao: 'alfaiate',
        nivelProfissao: 10,
        tier: 2,
        materiais: [
            { itemId: 'recurso_pluma_harpia', quantidade: 15 },
            { itemId: 'recurso_garra_harpia', quantidade: 5 },
            { itemId: 'recurso_coroa_rainha_harpia', quantidade: 1 },
            { itemId: 'refinado_fio_linho', quantidade: 8 }
        ]
    },
    {
        id: 'craft_capa_lagarto',
        resultado: 'capa_lagarto',
        profissao: 'alfaiate',
        nivelProfissao: 10,
        tier: 2,
        materiais: [
            { itemId: 'recurso_escama_lagarto', quantidade: 12 },
            { itemId: 'recurso_cauda_lagarto', quantidade: 4 },
            { itemId: 'recurso_coroa_rei_lagarto', quantidade: 1 },
            { itemId: 'refinado_fio_linho', quantidade: 8 }
        ]
    },

    // =========================================================================
    // === FERREIRO (weapon + weaponLeft + chest) ==============================
    // === Usa: Mineiro (refinado_lingote_ferro / lingote_cobre)
    // ===     + Lenhador (refinado_tabua_pinho / tabua_carvalho)
    // ===     + Coletor (refinado_couro_tratado / tendao_reforcado)
    // =========================================================================

    // --- T1 Chests (nivelProfissao: 1) ---

    {
        id: 'craft_peitoral_rato',
        resultado: 'peitoral_rato',
        profissao: 'ferreiro',
        nivelProfissao: 1,
        tier: 1,
        materiais: [
            { itemId: 'recurso_rabo_rato', quantidade: 10 },
            { itemId: 'recurso_dente_rato', quantidade: 2 },
            { itemId: 'refinado_lingote_ferro', quantidade: 2 },
            { itemId: 'refinado_couro_tratado', quantidade: 2 }
        ]
    },
    {
        id: 'craft_peitoral_barata',
        resultado: 'peitoral_barata',
        profissao: 'ferreiro',
        nivelProfissao: 1,
        tier: 1,
        materiais: [
            { itemId: 'recurso_casca_barata', quantidade: 10 },
            { itemId: 'recurso_antena_barata', quantidade: 2 },
            { itemId: 'refinado_lingote_ferro', quantidade: 2 },
            { itemId: 'refinado_couro_tratado', quantidade: 1 }
        ]
    },
    {
        id: 'craft_peitoral_morcego',
        resultado: 'peitoral_morcego',
        profissao: 'ferreiro',
        nivelProfissao: 1,
        tier: 1,
        materiais: [
            { itemId: 'recurso_asa_morcego', quantidade: 10 },
            { itemId: 'recurso_presa_morcego', quantidade: 2 },
            { itemId: 'refinado_lingote_ferro', quantidade: 2 },
            { itemId: 'refinado_couro_tratado', quantidade: 1 }
        ]
    },
    {
        id: 'craft_peitoral_planta',
        resultado: 'peitoral_planta',
        profissao: 'ferreiro',
        nivelProfissao: 1,
        tier: 1,
        materiais: [
            { itemId: 'recurso_raiz_viva', quantidade: 10 },
            { itemId: 'recurso_seiva_nutritiva', quantidade: 2 },
            { itemId: 'refinado_lingote_ferro', quantidade: 2 },
            { itemId: 'refinado_couro_tratado', quantidade: 1 }
        ]
    },

    // --- T2 Chests (nivelProfissao: 5) ---

    {
        id: 'craft_peitoral_lobo',
        resultado: 'peitoral_lobo',
        profissao: 'ferreiro',
        nivelProfissao: 5,
        tier: 2,
        materiais: [
            { itemId: 'recurso_pele_lobo', quantidade: 12 },
            { itemId: 'recurso_presa_lobo', quantidade: 4 },
            { itemId: 'recurso_essencia_lobo', quantidade: 1 },
            { itemId: 'refinado_lingote_cobre', quantidade: 3 },
            { itemId: 'refinado_tendao_reforcado', quantidade: 2 }
        ]
    },
    {
        id: 'craft_peitoral_javali',
        resultado: 'peitoral_javali',
        profissao: 'ferreiro',
        nivelProfissao: 5,
        tier: 2,
        materiais: [
            { itemId: 'recurso_presa_javali', quantidade: 12 },
            { itemId: 'recurso_couro_javali', quantidade: 4 },
            { itemId: 'recurso_coracao_patriarca_javali', quantidade: 1 },
            { itemId: 'refinado_lingote_cobre', quantidade: 3 },
            { itemId: 'refinado_tendao_reforcado', quantidade: 2 }
        ]
    },
    {
        id: 'craft_peitoral_esqueleto',
        resultado: 'peitoral_esqueleto',
        profissao: 'ferreiro',
        nivelProfissao: 5,
        tier: 2,
        materiais: [
            { itemId: 'recurso_osso_polido', quantidade: 12 },
            { itemId: 'recurso_cranio_intacto', quantidade: 4 },
            { itemId: 'recurso_essencia_morte', quantidade: 1 },
            { itemId: 'refinado_lingote_cobre', quantidade: 3 },
            { itemId: 'refinado_tendao_reforcado', quantidade: 1 }
        ]
    },
    {
        id: 'craft_peitoral_goblin',
        resultado: 'peitoral_goblin',
        profissao: 'ferreiro',
        nivelProfissao: 5,
        tier: 2,
        materiais: [
            { itemId: 'recurso_orelha_goblin', quantidade: 12 },
            { itemId: 'recurso_amuleto_goblin', quantidade: 4 },
            { itemId: 'recurso_coroa_chefe_goblin', quantidade: 1 },
            { itemId: 'refinado_lingote_cobre', quantidade: 3 },
            { itemId: 'refinado_tendao_reforcado', quantidade: 2 }
        ]
    },

    // --- T2 Avançado Chests (nivelProfissao: 10) ---

    {
        id: 'craft_peitoral_urso',
        resultado: 'peitoral_urso',
        profissao: 'ferreiro',
        nivelProfissao: 10,
        tier: 2,
        materiais: [
            { itemId: 'recurso_pele_urso', quantidade: 18 },
            { itemId: 'recurso_garra_urso', quantidade: 6 },
            { itemId: 'recurso_essencia_forca', quantidade: 2 },
            { itemId: 'refinado_lingote_cobre', quantidade: 6 },
            { itemId: 'refinado_tendao_reforcado', quantidade: 3 }
        ]
    },
    {
        id: 'craft_peitoral_troll',
        resultado: 'peitoral_troll',
        profissao: 'ferreiro',
        nivelProfissao: 10,
        tier: 2,
        materiais: [
            { itemId: 'recurso_pele_troll', quantidade: 18 },
            { itemId: 'recurso_sangue_troll', quantidade: 6 },
            { itemId: 'recurso_coracao_troll_rei', quantidade: 1 },
            { itemId: 'refinado_lingote_cobre', quantidade: 6 },
            { itemId: 'refinado_tendao_reforcado', quantidade: 3 }
        ]
    },
    {
        id: 'craft_peitoral_golem',
        resultado: 'peitoral_golem',
        profissao: 'ferreiro',
        nivelProfissao: 10,
        tier: 2,
        materiais: [
            { itemId: 'recurso_fragmento_pedra', quantidade: 18 },
            { itemId: 'recurso_nucleo_golem', quantidade: 6 },
            { itemId: 'recurso_cristal_golem_anciao', quantidade: 2 },
            { itemId: 'refinado_lingote_cobre', quantidade: 6 },
            { itemId: 'refinado_tendao_reforcado', quantidade: 2 }
        ]
    },
    {
        id: 'craft_peitoral_lagarto',
        resultado: 'peitoral_lagarto',
        profissao: 'ferreiro',
        nivelProfissao: 10,
        tier: 2,
        materiais: [
            { itemId: 'recurso_escama_lagarto', quantidade: 18 },
            { itemId: 'recurso_cauda_lagarto', quantidade: 6 },
            { itemId: 'recurso_coroa_rei_lagarto', quantidade: 1 },
            { itemId: 'refinado_lingote_cobre', quantidade: 6 },
            { itemId: 'refinado_tendao_reforcado', quantidade: 3 }
        ]
    },
    {
        id: 'craft_peitoral_ogro',
        resultado: 'peitoral_ogro',
        profissao: 'ferreiro',
        nivelProfissao: 10,
        tier: 2,
        materiais: [
            { itemId: 'recurso_dente_ogro', quantidade: 18 },
            { itemId: 'recurso_cinto_ogro', quantidade: 6 },
            { itemId: 'recurso_olho_chefe_ogro', quantidade: 2 },
            { itemId: 'refinado_lingote_cobre', quantidade: 6 },
            { itemId: 'refinado_tendao_reforcado', quantidade: 3 }
        ]
    },

    // --- T1 Weapons (nivelProfissao: 1) ---

    {
        id: 'craft_espinho_vivo',
        resultado: 'espinho_vivo',
        profissao: 'ferreiro',
        nivelProfissao: 1,
        tier: 1,
        materiais: [
            { itemId: 'recurso_raiz_viva', quantidade: 10 },
            { itemId: 'recurso_seiva_nutritiva', quantidade: 2 },
            { itemId: 'recurso_semente_flora', quantidade: 1 },
            { itemId: 'refinado_lingote_ferro', quantidade: 3 },
            { itemId: 'refinado_tabua_pinho', quantidade: 2 }
        ]
    },

    // --- T2 Weapons (nivelProfissao: 5) ---

    {
        id: 'craft_presa_javali',
        resultado: 'presa_javali',
        profissao: 'ferreiro',
        nivelProfissao: 5,
        tier: 2,
        materiais: [
            { itemId: 'recurso_presa_javali', quantidade: 12 },
            { itemId: 'recurso_couro_javali', quantidade: 4 },
            { itemId: 'recurso_coracao_patriarca_javali', quantidade: 1 },
            { itemId: 'refinado_lingote_cobre', quantidade: 4 },
            { itemId: 'refinado_tabua_carvalho', quantidade: 2 }
        ]
    },
    {
        id: 'craft_lamina_osso',
        resultado: 'lamina_osso',
        profissao: 'ferreiro',
        nivelProfissao: 5,
        tier: 2,
        materiais: [
            { itemId: 'recurso_osso_polido', quantidade: 12 },
            { itemId: 'recurso_cranio_intacto', quantidade: 4 },
            { itemId: 'recurso_essencia_morte', quantidade: 1 },
            { itemId: 'refinado_lingote_cobre', quantidade: 4 },
            { itemId: 'refinado_tabua_carvalho', quantidade: 2 }
        ]
    },

    // --- T2 Avançado Weapons (nivelProfissao: 10) ---

    {
        id: 'craft_porrete_troll',
        resultado: 'porrete_troll',
        profissao: 'ferreiro',
        nivelProfissao: 10,
        tier: 2,
        materiais: [
            { itemId: 'recurso_pele_troll', quantidade: 15 },
            { itemId: 'recurso_sangue_troll', quantidade: 5 },
            { itemId: 'recurso_coracao_troll_rei', quantidade: 2 },
            { itemId: 'refinado_lingote_cobre', quantidade: 8 },
            { itemId: 'refinado_tabua_carvalho', quantidade: 5 }
        ]
    },
    {
        id: 'craft_lamina_escama',
        resultado: 'lamina_escama',
        profissao: 'ferreiro',
        nivelProfissao: 10,
        tier: 2,
        materiais: [
            { itemId: 'recurso_escama_lagarto', quantidade: 15 },
            { itemId: 'recurso_cauda_lagarto', quantidade: 5 },
            { itemId: 'recurso_coroa_rei_lagarto', quantidade: 2 },
            { itemId: 'refinado_lingote_cobre', quantidade: 8 },
            { itemId: 'refinado_tabua_carvalho', quantidade: 5 }
        ]
    },

    // --- T2 Avançado WeaponLeft (nivelProfissao: 10) ---

    {
        id: 'craft_escudo_cristal',
        resultado: 'escudo_cristal',
        profissao: 'ferreiro',
        nivelProfissao: 10,
        tier: 2,
        materiais: [
            { itemId: 'recurso_fragmento_pedra', quantidade: 18 },
            { itemId: 'recurso_nucleo_golem', quantidade: 5 },
            { itemId: 'recurso_cristal_golem_anciao', quantidade: 2 },
            { itemId: 'refinado_lingote_cobre', quantidade: 8 },
            { itemId: 'refinado_tabua_carvalho', quantidade: 3 }
        ]
    },
    {
        id: 'craft_tabua_ogro',
        resultado: 'tabua_ogro',
        profissao: 'ferreiro',
        nivelProfissao: 10,
        tier: 2,
        materiais: [
            { itemId: 'recurso_dente_ogro', quantidade: 18 },
            { itemId: 'recurso_cinto_ogro', quantidade: 5 },
            { itemId: 'recurso_olho_chefe_ogro', quantidade: 2 },
            { itemId: 'refinado_lingote_cobre', quantidade: 8 },
            { itemId: 'refinado_tabua_carvalho', quantidade: 3 }
        ]
    },

    // =========================================================================
    // === COUREIRO (boots + belt + bag) =======================================
    // === Usa: Coletor (refinado_couro_tratado / tendao_reforcado)
    // ===     + Fazendeiro (refinado_farinha_trigo / fio_linho)
    // =========================================================================

    // --- T1 Boots (nivelProfissao: 1) ---

    {
        id: 'craft_botas_rato',
        resultado: 'botas_rato',
        profissao: 'coureiro',
        nivelProfissao: 1,
        tier: 1,
        materiais: [
            { itemId: 'recurso_rabo_rato', quantidade: 8 },
            { itemId: 'recurso_dente_rato', quantidade: 2 },
            { itemId: 'refinado_couro_tratado', quantidade: 3 },
            { itemId: 'refinado_farinha_trigo', quantidade: 1 }
        ]
    },
    {
        id: 'craft_botas_sapo',
        resultado: 'botas_sapo',
        profissao: 'coureiro',
        nivelProfissao: 1,
        tier: 1,
        materiais: [
            { itemId: 'recurso_gosma_sapo', quantidade: 8 },
            { itemId: 'recurso_lingua_sapo', quantidade: 2 },
            { itemId: 'refinado_couro_tratado', quantidade: 3 }
        ]
    },
    {
        id: 'craft_botas_morcego',
        resultado: 'botas_morcego',
        profissao: 'coureiro',
        nivelProfissao: 1,
        tier: 1,
        materiais: [
            { itemId: 'recurso_asa_morcego', quantidade: 8 },
            { itemId: 'recurso_presa_morcego', quantidade: 2 },
            { itemId: 'refinado_couro_tratado', quantidade: 3 }
        ]
    },
    {
        id: 'craft_botas_planta',
        resultado: 'botas_planta',
        profissao: 'coureiro',
        nivelProfissao: 1,
        tier: 1,
        materiais: [
            { itemId: 'recurso_raiz_viva', quantidade: 8 },
            { itemId: 'recurso_seiva_nutritiva', quantidade: 2 },
            { itemId: 'refinado_couro_tratado', quantidade: 2 },
            { itemId: 'refinado_farinha_trigo', quantidade: 1 }
        ]
    },

    // --- T1 Belts (nivelProfissao: 1) ---

    {
        id: 'craft_cinto_rato',
        resultado: 'cinto_rato',
        profissao: 'coureiro',
        nivelProfissao: 1,
        tier: 1,
        materiais: [
            { itemId: 'recurso_rabo_rato', quantidade: 6 },
            { itemId: 'recurso_dente_rato', quantidade: 2 },
            { itemId: 'refinado_couro_tratado', quantidade: 2 }
        ]
    },
    {
        id: 'craft_cinto_barata',
        resultado: 'cinto_barata',
        profissao: 'coureiro',
        nivelProfissao: 1,
        tier: 1,
        materiais: [
            { itemId: 'recurso_casca_barata', quantidade: 6 },
            { itemId: 'recurso_antena_barata', quantidade: 2 },
            { itemId: 'refinado_couro_tratado', quantidade: 2 }
        ]
    },
    {
        id: 'craft_cinto_cogumelo',
        resultado: 'cinto_cogumelo',
        profissao: 'coureiro',
        nivelProfissao: 1,
        tier: 1,
        materiais: [
            { itemId: 'recurso_esporo_cogumelo', quantidade: 6 },
            { itemId: 'recurso_chapeu_cogumelo', quantidade: 2 },
            { itemId: 'refinado_couro_tratado', quantidade: 2 }
        ]
    },

    // --- T2 Boots (nivelProfissao: 5) ---

    {
        id: 'craft_botas_lobo',
        resultado: 'botas_lobo',
        profissao: 'coureiro',
        nivelProfissao: 5,
        tier: 2,
        materiais: [
            { itemId: 'recurso_pele_lobo', quantidade: 10 },
            { itemId: 'recurso_presa_lobo', quantidade: 3 },
            { itemId: 'recurso_essencia_lobo', quantidade: 1 },
            { itemId: 'refinado_tendao_reforcado', quantidade: 3 },
            { itemId: 'refinado_fio_linho', quantidade: 1 }
        ]
    },
    {
        id: 'craft_botas_aranha',
        resultado: 'botas_aranha',
        profissao: 'coureiro',
        nivelProfissao: 5,
        tier: 2,
        materiais: [
            { itemId: 'recurso_teia_aranha', quantidade: 10 },
            { itemId: 'recurso_glandula_venenosa', quantidade: 3 },
            { itemId: 'recurso_presas_viuva', quantidade: 1 },
            { itemId: 'refinado_tendao_reforcado', quantidade: 3 }
        ]
    },
    {
        id: 'craft_botas_cobra',
        resultado: 'botas_cobra',
        profissao: 'coureiro',
        nivelProfissao: 5,
        tier: 2,
        materiais: [
            { itemId: 'recurso_escama_cobra', quantidade: 10 },
            { itemId: 'recurso_veneno_cobra', quantidade: 3 },
            { itemId: 'recurso_olho_serpente', quantidade: 1 },
            { itemId: 'refinado_tendao_reforcado', quantidade: 3 }
        ]
    },
    {
        id: 'craft_botas_goblin',
        resultado: 'botas_goblin',
        profissao: 'coureiro',
        nivelProfissao: 5,
        tier: 2,
        materiais: [
            { itemId: 'recurso_orelha_goblin', quantidade: 10 },
            { itemId: 'recurso_amuleto_goblin', quantidade: 3 },
            { itemId: 'recurso_coroa_chefe_goblin', quantidade: 1 },
            { itemId: 'refinado_tendao_reforcado', quantidade: 3 },
            { itemId: 'refinado_fio_linho', quantidade: 1 }
        ]
    },

    // --- T2 Belts (nivelProfissao: 5) ---

    {
        id: 'craft_cinto_aranha',
        resultado: 'cinto_aranha',
        profissao: 'coureiro',
        nivelProfissao: 5,
        tier: 2,
        materiais: [
            { itemId: 'recurso_teia_aranha', quantidade: 8 },
            { itemId: 'recurso_glandula_venenosa', quantidade: 3 },
            { itemId: 'recurso_presas_viuva', quantidade: 1 },
            { itemId: 'refinado_tendao_reforcado', quantidade: 2 },
            { itemId: 'refinado_fio_linho', quantidade: 1 }
        ]
    },
    {
        id: 'craft_cinto_javali',
        resultado: 'cinto_javali',
        profissao: 'coureiro',
        nivelProfissao: 5,
        tier: 2,
        materiais: [
            { itemId: 'recurso_presa_javali', quantidade: 8 },
            { itemId: 'recurso_couro_javali', quantidade: 3 },
            { itemId: 'recurso_coracao_patriarca_javali', quantidade: 1 },
            { itemId: 'refinado_tendao_reforcado', quantidade: 3 }
        ]
    },
    {
        id: 'craft_cinto_goblin',
        resultado: 'cinto_goblin',
        profissao: 'coureiro',
        nivelProfissao: 5,
        tier: 2,
        materiais: [
            { itemId: 'recurso_orelha_goblin', quantidade: 8 },
            { itemId: 'recurso_amuleto_goblin', quantidade: 3 },
            { itemId: 'recurso_coroa_chefe_goblin', quantidade: 1 },
            { itemId: 'refinado_tendao_reforcado', quantidade: 2 }
        ]
    },

    // --- T2 Avançado Boots (nivelProfissao: 10) ---

    {
        id: 'craft_botas_urso',
        resultado: 'botas_urso',
        profissao: 'coureiro',
        nivelProfissao: 10,
        tier: 2,
        materiais: [
            { itemId: 'recurso_pele_urso', quantidade: 15 },
            { itemId: 'recurso_garra_urso', quantidade: 5 },
            { itemId: 'recurso_essencia_forca', quantidade: 1 },
            { itemId: 'refinado_tendao_reforcado', quantidade: 5 },
            { itemId: 'refinado_fio_linho', quantidade: 3 }
        ]
    },
    {
        id: 'craft_botas_golem',
        resultado: 'botas_golem',
        profissao: 'coureiro',
        nivelProfissao: 10,
        tier: 2,
        materiais: [
            { itemId: 'recurso_fragmento_pedra', quantidade: 15 },
            { itemId: 'recurso_nucleo_golem', quantidade: 5 },
            { itemId: 'recurso_cristal_golem_anciao', quantidade: 1 },
            { itemId: 'refinado_tendao_reforcado', quantidade: 5 }
        ]
    },
    {
        id: 'craft_botas_harpia',
        resultado: 'botas_harpia',
        profissao: 'coureiro',
        nivelProfissao: 10,
        tier: 2,
        materiais: [
            { itemId: 'recurso_pluma_harpia', quantidade: 15 },
            { itemId: 'recurso_garra_harpia', quantidade: 5 },
            { itemId: 'recurso_coroa_rainha_harpia', quantidade: 1 },
            { itemId: 'refinado_tendao_reforcado', quantidade: 6 }
        ]
    },

    // --- T2 Avançado Belts (nivelProfissao: 10) ---

    {
        id: 'craft_cinto_urso',
        resultado: 'cinto_urso',
        profissao: 'coureiro',
        nivelProfissao: 10,
        tier: 2,
        materiais: [
            { itemId: 'recurso_pele_urso', quantidade: 12 },
            { itemId: 'recurso_garra_urso', quantidade: 4 },
            { itemId: 'recurso_essencia_forca', quantidade: 1 },
            { itemId: 'refinado_tendao_reforcado', quantidade: 5 }
        ]
    },
    {
        id: 'craft_cinto_troll',
        resultado: 'cinto_troll',
        profissao: 'coureiro',
        nivelProfissao: 10,
        tier: 2,
        materiais: [
            { itemId: 'recurso_pele_troll', quantidade: 12 },
            { itemId: 'recurso_sangue_troll', quantidade: 4 },
            { itemId: 'recurso_coracao_troll_rei', quantidade: 1 },
            { itemId: 'refinado_tendao_reforcado', quantidade: 5 }
        ]
    },
    {
        id: 'craft_cinto_ogro',
        resultado: 'cinto_ogro',
        profissao: 'coureiro',
        nivelProfissao: 10,
        tier: 2,
        materiais: [
            { itemId: 'recurso_dente_ogro', quantidade: 12 },
            { itemId: 'recurso_cinto_ogro', quantidade: 4 },
            { itemId: 'recurso_olho_chefe_ogro', quantidade: 1 },
            { itemId: 'refinado_tendao_reforcado', quantidade: 5 }
        ]
    },

    // --- Bag (nivelProfissao: 5) ---

    // Bolsa do Explorador — Lobo + Goblin (coureiro)
    {
        id: 'craft_bolsa_explorador',
        resultado: 'hibrido_bolsa_explorador',
        profissao: 'coureiro',
        nivelProfissao: 5,
        tier: 2,
        materiais: [
            { itemId: 'recurso_pele_lobo', quantidade: 10 },
            { itemId: 'recurso_orelha_goblin', quantidade: 8 },
            { itemId: 'recurso_coroa_chefe_goblin', quantidade: 1 },
            { itemId: 'refinado_lingote_cobre', quantidade: 2 },
            { itemId: 'refinado_tendao_reforcado', quantidade: 2 }
        ]
    },

    // =========================================================================
    // === JOALHEIRO (amulet) ==================================================
    // === Usa: Mineiro (refinado_lingote_ferro / lingote_cobre)
    // ===     + Pescador (refinado_file_peixe / file_prateado)
    // =========================================================================

    // --- T1 Amulets (nivelProfissao: 1) ---

    {
        id: 'craft_amuleto_barata',
        resultado: 'amuleto_barata',
        profissao: 'joalheiro',
        nivelProfissao: 1,
        tier: 1,
        materiais: [
            { itemId: 'recurso_casca_barata', quantidade: 6 },
            { itemId: 'recurso_antena_barata', quantidade: 2 },
            { itemId: 'recurso_glandula_rainha_barata', quantidade: 1 },
            { itemId: 'refinado_lingote_ferro', quantidade: 2 },
            { itemId: 'refinado_file_peixe', quantidade: 1 }
        ]
    },
    {
        id: 'craft_amuleto_cogumelo',
        resultado: 'amuleto_cogumelo',
        profissao: 'joalheiro',
        nivelProfissao: 1,
        tier: 1,
        materiais: [
            { itemId: 'recurso_esporo_cogumelo', quantidade: 6 },
            { itemId: 'recurso_chapeu_cogumelo', quantidade: 2 },
            { itemId: 'recurso_micelio_anciao', quantidade: 1 },
            { itemId: 'refinado_lingote_ferro', quantidade: 2 },
            { itemId: 'refinado_file_peixe', quantidade: 1 }
        ]
    },
    {
        id: 'craft_amuleto_sapo',
        resultado: 'amuleto_sapo',
        profissao: 'joalheiro',
        nivelProfissao: 1,
        tier: 1,
        materiais: [
            { itemId: 'recurso_gosma_sapo', quantidade: 6 },
            { itemId: 'recurso_lingua_sapo', quantidade: 2 },
            { itemId: 'recurso_olho_patriarca_sapo', quantidade: 1 },
            { itemId: 'refinado_lingote_ferro', quantidade: 2 },
            { itemId: 'refinado_file_peixe', quantidade: 1 }
        ]
    },

    // --- T2 Amulets (nivelProfissao: 5) ---

    {
        id: 'craft_amuleto_esqueleto',
        resultado: 'amuleto_esqueleto',
        profissao: 'joalheiro',
        nivelProfissao: 5,
        tier: 2,
        materiais: [
            { itemId: 'recurso_osso_polido', quantidade: 8 },
            { itemId: 'recurso_cranio_intacto', quantidade: 3 },
            { itemId: 'recurso_essencia_morte', quantidade: 1 },
            { itemId: 'refinado_lingote_cobre', quantidade: 3 },
            { itemId: 'refinado_file_prateado', quantidade: 1 }
        ]
    },
    {
        id: 'craft_amuleto_cobra',
        resultado: 'amuleto_cobra',
        profissao: 'joalheiro',
        nivelProfissao: 5,
        tier: 2,
        materiais: [
            { itemId: 'recurso_escama_cobra', quantidade: 8 },
            { itemId: 'recurso_veneno_cobra', quantidade: 3 },
            { itemId: 'recurso_olho_serpente', quantidade: 1 },
            { itemId: 'refinado_lingote_cobre', quantidade: 3 },
            { itemId: 'refinado_file_prateado', quantidade: 1 }
        ]
    },

    // --- T2 Avançado Amulets (nivelProfissao: 10) ---

    {
        id: 'craft_amuleto_harpia',
        resultado: 'amuleto_harpia',
        profissao: 'joalheiro',
        nivelProfissao: 10,
        tier: 2,
        materiais: [
            { itemId: 'recurso_pluma_harpia', quantidade: 12 },
            { itemId: 'recurso_garra_harpia', quantidade: 4 },
            { itemId: 'recurso_coroa_rainha_harpia', quantidade: 2 },
            { itemId: 'refinado_lingote_cobre', quantidade: 6 },
            { itemId: 'refinado_file_prateado', quantidade: 3 }
        ]
    },

    // =========================================================================
    // === FERRAMENTA DO PADEIRO ===============================================
    // =========================================================================

    {
        id: 'craft_ferramenta_padeiro',
        resultado: 'ferramenta_padeiro',
        profissao: 'padeiro',
        nivelProfissao: 1,
        tier: 1,
        materiais: [
            { itemId: 'refinado_tabua_pinho', quantidade: 2 },
            { itemId: 'refinado_farinha_trigo', quantidade: 1 }
        ]
    },

    // =========================================================================
    // === ITENS HÍBRIDOS — Cross-família =====================================
    // === Itens sem conjunto, usam recursos de 2-3 famílias diferentes
    // =========================================================================

    // --- T1 Híbridos (nivelProfissao: 1) ---

    // Chapéu do Sorridente — Rato + Sapo (alfaiate)
    {
        id: 'craft_chapeu_sorridente',
        resultado: 'hibrido_chapeu_sorridente',
        profissao: 'alfaiate',
        nivelProfissao: 1,
        tier: 1,
        materiais: [
            { itemId: 'recurso_rabo_rato', quantidade: 6 },
            { itemId: 'recurso_gosma_sapo', quantidade: 6 },
            { itemId: 'recurso_bigode_rei_rato', quantidade: 1 },
            { itemId: 'refinado_farinha_trigo', quantidade: 2 }
        ]
    },
    // Manto Sombrio — Morcego + Sapo (alfaiate)
    {
        id: 'craft_manto_sombrio',
        resultado: 'hibrido_manto_sombrio',
        profissao: 'alfaiate',
        nivelProfissao: 1,
        tier: 1,
        materiais: [
            { itemId: 'recurso_asa_morcego', quantidade: 6 },
            { itemId: 'recurso_lingua_sapo', quantidade: 2 },
            { itemId: 'recurso_sangue_anciao_morcego', quantidade: 1 },
            { itemId: 'refinado_farinha_trigo', quantidade: 2 }
        ]
    },
    // Anel do Esgoto — Rato + Barata (joalheiro)
    {
        id: 'craft_anel_esgoto',
        resultado: 'hibrido_anel_esgoto',
        profissao: 'joalheiro',
        nivelProfissao: 1,
        tier: 1,
        materiais: [
            { itemId: 'recurso_dente_rato', quantidade: 2 },
            { itemId: 'recurso_antena_barata', quantidade: 2 },
            { itemId: 'recurso_glandula_rainha_barata', quantidade: 1 },
            { itemId: 'refinado_lingote_ferro', quantidade: 2 }
        ]
    },
    // Cinturão Esporado — Cogumelo + Planta (coureiro)
    {
        id: 'craft_cinturao_esporado',
        resultado: 'hibrido_cinturao_esporado',
        profissao: 'coureiro',
        nivelProfissao: 1,
        tier: 1,
        materiais: [
            { itemId: 'recurso_esporo_cogumelo', quantidade: 6 },
            { itemId: 'recurso_raiz_viva', quantidade: 6 },
            { itemId: 'recurso_semente_flora', quantidade: 1 },
            { itemId: 'recurso_couro', quantidade: 2 },
            { itemId: 'refinado_couro_tratado', quantidade: 2 }
        ]
    },

    // --- T2 Híbridos (nivelProfissao: 5) ---

    // Amuleto Predador — Lobo + Javali (joalheiro)
    {
        id: 'craft_amuleto_predador',
        resultado: 'hibrido_amuleto_predador',
        profissao: 'joalheiro',
        nivelProfissao: 5,
        tier: 2,
        materiais: [
            { itemId: 'recurso_presa_lobo', quantidade: 3 },
            { itemId: 'recurso_couro_javali', quantidade: 3 },
            { itemId: 'recurso_essencia_lobo', quantidade: 1 },
            { itemId: 'refinado_lingote_cobre', quantidade: 3 },
            { itemId: 'refinado_file_prateado', quantidade: 1 }
        ]
    },
    // Botas do Errante — Aranha + Cobra (coureiro)
    {
        id: 'craft_botas_errante',
        resultado: 'hibrido_botas_errante',
        profissao: 'coureiro',
        nivelProfissao: 5,
        tier: 2,
        materiais: [
            { itemId: 'recurso_teia_aranha', quantidade: 8 },
            { itemId: 'recurso_escama_cobra', quantidade: 8 },
            { itemId: 'recurso_olho_serpente', quantidade: 1 },
            { itemId: 'refinado_tendao_reforcado', quantidade: 3 }
        ]
    },
    // Cinto Totêmico — Esqueleto + Goblin (coureiro)
    {
        id: 'craft_cinto_totemico',
        resultado: 'hibrido_cinto_totemico',
        profissao: 'coureiro',
        nivelProfissao: 5,
        tier: 2,
        materiais: [
            { itemId: 'recurso_osso_polido', quantidade: 8 },
            { itemId: 'recurso_orelha_goblin', quantidade: 8 },
            { itemId: 'recurso_essencia_morte', quantidade: 1 },
            { itemId: 'refinado_tendao_reforcado', quantidade: 2 },
            { itemId: 'refinado_fio_linho', quantidade: 1 }
        ]
    },
    // Escudo de Teia — Aranha + Javali (ferreiro)
    {
        id: 'craft_escudo_teia',
        resultado: 'hibrido_escudo_teia',
        profissao: 'ferreiro',
        nivelProfissao: 5,
        tier: 2,
        materiais: [
            { itemId: 'recurso_teia_aranha', quantidade: 10 },
            { itemId: 'recurso_presa_javali', quantidade: 10 },
            { itemId: 'recurso_presas_viuva', quantidade: 1 },
            { itemId: 'recurso_coracao_patriarca_javali', quantidade: 1 },
            { itemId: 'refinado_lingote_cobre', quantidade: 3 },
            { itemId: 'refinado_tabua_carvalho', quantidade: 2 }
        ]
    },

    // --- T2 Avançado Híbridos (nivelProfissao: 10) ---

    // Coroa do Caos — Troll + Harpia + Ogro (alfaiate)
    {
        id: 'craft_coroa_caos',
        resultado: 'hibrido_coroa_caos',
        profissao: 'alfaiate',
        nivelProfissao: 10,
        tier: 2,
        materiais: [
            { itemId: 'recurso_sangue_troll', quantidade: 4 },
            { itemId: 'recurso_pluma_harpia', quantidade: 12 },
            { itemId: 'recurso_dente_ogro', quantidade: 12 },
            { itemId: 'recurso_coroa_rainha_harpia', quantidade: 1 },
            { itemId: 'refinado_fio_linho', quantidade: 5 },
            { itemId: 'refinado_tabua_carvalho', quantidade: 3 }
        ]
    },
    // Anel da Besta — Urso + Lagarto (joalheiro)
    {
        id: 'craft_anel_besta',
        resultado: 'hibrido_anel_besta',
        profissao: 'joalheiro',
        nivelProfissao: 10,
        tier: 2,
        materiais: [
            { itemId: 'recurso_garra_urso', quantidade: 4 },
            { itemId: 'recurso_escama_lagarto', quantidade: 12 },
            { itemId: 'recurso_essencia_forca', quantidade: 1 },
            { itemId: 'refinado_lingote_cobre', quantidade: 5 },
            { itemId: 'refinado_file_prateado', quantidade: 3 }
        ]
    },
    // Peitoral Composto — Golem + Urso (ferreiro)
    {
        id: 'craft_peitoral_composto',
        resultado: 'hibrido_peitoral_composto',
        profissao: 'ferreiro',
        nivelProfissao: 10,
        tier: 2,
        materiais: [
            { itemId: 'recurso_fragmento_pedra', quantidade: 15 },
            { itemId: 'recurso_pele_urso', quantidade: 12 },
            { itemId: 'recurso_cristal_golem_anciao', quantidade: 1 },
            { itemId: 'recurso_essencia_forca', quantidade: 1 },
            { itemId: 'refinado_lingote_cobre', quantidade: 6 },
            { itemId: 'refinado_tendao_reforcado', quantidade: 5 }
        ]
    },
    // Machado do Caos — Troll + Ogro (ferreiro)
    {
        id: 'craft_machado_caos',
        resultado: 'hibrido_machado_caos',
        profissao: 'ferreiro',
        nivelProfissao: 10,
        tier: 2,
        materiais: [
            { itemId: 'recurso_pele_troll', quantidade: 12 },
            { itemId: 'recurso_dente_ogro', quantidade: 12 },
            { itemId: 'recurso_coracao_troll_rei', quantidade: 1 },
            { itemId: 'recurso_olho_chefe_ogro', quantidade: 1 },
            { itemId: 'refinado_lingote_cobre', quantidade: 8 },
            { itemId: 'refinado_tabua_carvalho', quantidade: 5 }
        ]
    },

    // =========================================================================
    // === RECEITAS STANDALONE — Itens genéricos (sem drops de monstro) =======
    // === Usam apenas refinados de coleta. Preenchem níveis 2-4, 6-9, 11+
    // =========================================================================

    // ─── ALFAIATE: Standalone (helmet, cape) ─────────────────────

    // Nv 2: Capa Simples (equip nv2)
    {
        id: 'craft_capa_simples',
        resultado: 'capa_simples',
        profissao: 'alfaiate',
        nivelProfissao: 2,
        tier: 1,
        materiais: [
            { itemId: 'refinado_farinha_trigo', quantidade: 2 },
            { itemId: 'refinado_tabua_pinho', quantidade: 1 }
        ]
    },
    // Nv 3: Capacete de Couro (equip nv1)
    {
        id: 'craft_capacete_couro',
        resultado: 'capacete_couro',
        profissao: 'alfaiate',
        nivelProfissao: 3,
        tier: 1,
        materiais: [
            { itemId: 'refinado_farinha_trigo', quantidade: 3 },
            { itemId: 'refinado_tabua_pinho', quantidade: 1 }
        ]
    },
    // Nv 6: Capacete de Ferro (equip nv5)
    {
        id: 'craft_capacete_ferro',
        resultado: 'capacete_ferro',
        profissao: 'alfaiate',
        nivelProfissao: 6,
        tier: 2,
        materiais: [
            { itemId: 'refinado_fio_linho', quantidade: 3 },
            { itemId: 'refinado_tabua_carvalho', quantidade: 2 }
        ]
    },
    // Nv 11: Capacete de Aço (equip nv10)
    {
        id: 'craft_capacete_aco',
        resultado: 'capacete_aco',
        profissao: 'alfaiate',
        nivelProfissao: 11,
        tier: 2,
        materiais: [
            { itemId: 'refinado_fio_linho', quantidade: 5 },
            { itemId: 'refinado_tabua_carvalho', quantidade: 3 }
        ]
    },

    // ─── FERREIRO: Standalone (weapon, weaponLeft, chest) ────────

    // Nv 2: Espada de Madeira (equip nv1)
    {
        id: 'craft_espada_madeira',
        resultado: 'espada_madeira',
        profissao: 'ferreiro',
        nivelProfissao: 2,
        tier: 1,
        materiais: [
            { itemId: 'refinado_lingote_ferro', quantidade: 2 },
            { itemId: 'refinado_tabua_pinho', quantidade: 2 }
        ]
    },
    // Nv 2: Escudo de Madeira (equip nv1)
    {
        id: 'craft_escudo_madeira',
        resultado: 'escudo_madeira',
        profissao: 'ferreiro',
        nivelProfissao: 2,
        tier: 1,
        materiais: [
            { itemId: 'refinado_lingote_ferro', quantidade: 2 },
            { itemId: 'refinado_tabua_pinho', quantidade: 1 },
            { itemId: 'refinado_couro_tratado', quantidade: 1 }
        ]
    },
    // Nv 3: Peitoral de Tecido (equip nv1)
    {
        id: 'craft_peitoral_tecido',
        resultado: 'peitoral_tecido',
        profissao: 'ferreiro',
        nivelProfissao: 3,
        tier: 1,
        materiais: [
            { itemId: 'refinado_lingote_ferro', quantidade: 2 },
            { itemId: 'refinado_couro_tratado', quantidade: 2 },
            { itemId: 'refinado_tabua_pinho', quantidade: 1 }
        ]
    },
    // Nv 3: Arco Simples (equip nv3)
    {
        id: 'craft_arco_simples',
        resultado: 'arco_simples',
        profissao: 'ferreiro',
        nivelProfissao: 3,
        tier: 1,
        materiais: [
            { itemId: 'refinado_tabua_pinho', quantidade: 3 },
            { itemId: 'refinado_couro_tratado', quantidade: 1 },
            { itemId: 'refinado_lingote_ferro', quantidade: 1 }
        ]
    },
    // Nv 4: Cajado do Aprendiz (equip nv4)
    {
        id: 'craft_cajado_aprendiz',
        resultado: 'cajado_aprendiz',
        profissao: 'ferreiro',
        nivelProfissao: 4,
        tier: 1,
        materiais: [
            { itemId: 'refinado_tabua_pinho', quantidade: 2 },
            { itemId: 'refinado_lingote_ferro', quantidade: 2 }
        ]
    },
    // Nv 6: Espada de Ferro (equip nv5)
    {
        id: 'craft_espada_ferro',
        resultado: 'espada_ferro',
        profissao: 'ferreiro',
        nivelProfissao: 6,
        tier: 2,
        materiais: [
            { itemId: 'refinado_lingote_cobre', quantidade: 3 },
            { itemId: 'refinado_tabua_carvalho', quantidade: 2 }
        ]
    },
    // Nv 7: Escudo de Ferro (equip nv5)
    {
        id: 'craft_escudo_ferro',
        resultado: 'escudo_ferro',
        profissao: 'ferreiro',
        nivelProfissao: 7,
        tier: 2,
        materiais: [
            { itemId: 'refinado_lingote_cobre', quantidade: 3 },
            { itemId: 'refinado_tabua_carvalho', quantidade: 1 },
            { itemId: 'refinado_tendao_reforcado', quantidade: 1 }
        ]
    },
    // Nv 7: Arco Longo (equip nv7)
    {
        id: 'craft_arco_longo',
        resultado: 'arco_longo',
        profissao: 'ferreiro',
        nivelProfissao: 7,
        tier: 2,
        materiais: [
            { itemId: 'refinado_tabua_carvalho', quantidade: 3 },
            { itemId: 'refinado_tendao_reforcado', quantidade: 2 }
        ]
    },
    // Nv 8: Cajado de Fogo (equip nv8)
    {
        id: 'craft_cajado_fogo',
        resultado: 'cajado_fogo',
        profissao: 'ferreiro',
        nivelProfissao: 8,
        tier: 2,
        materiais: [
            { itemId: 'refinado_tabua_carvalho', quantidade: 3 },
            { itemId: 'refinado_lingote_cobre', quantidade: 2 }
        ]
    },
    // Nv 8: Peitoral de Couro (equip nv5)
    {
        id: 'craft_peitoral_couro',
        resultado: 'peitoral_couro',
        profissao: 'ferreiro',
        nivelProfissao: 8,
        tier: 2,
        materiais: [
            { itemId: 'refinado_lingote_cobre', quantidade: 3 },
            { itemId: 'refinado_tendao_reforcado', quantidade: 3 },
            { itemId: 'refinado_tabua_carvalho', quantidade: 1 }
        ]
    },
    // Nv 11: Espada de Aço (equip nv10)
    {
        id: 'craft_espada_aco',
        resultado: 'espada_aco',
        profissao: 'ferreiro',
        nivelProfissao: 11,
        tier: 2,
        materiais: [
            { itemId: 'refinado_lingote_cobre', quantidade: 5 },
            { itemId: 'refinado_tabua_carvalho', quantidade: 3 }
        ]
    },
    // Nv 12: Escudo de Aço (equip nv10)
    {
        id: 'craft_escudo_aco',
        resultado: 'escudo_aco',
        profissao: 'ferreiro',
        nivelProfissao: 12,
        tier: 2,
        materiais: [
            { itemId: 'refinado_lingote_cobre', quantidade: 4 },
            { itemId: 'refinado_tabua_carvalho', quantidade: 2 },
            { itemId: 'refinado_tendao_reforcado', quantidade: 2 }
        ]
    },
    // Nv 12: Cota de Malha (equip nv10)
    {
        id: 'craft_peitoral_cota',
        resultado: 'peitoral_cota',
        profissao: 'ferreiro',
        nivelProfissao: 12,
        tier: 2,
        materiais: [
            { itemId: 'refinado_lingote_cobre', quantidade: 5 },
            { itemId: 'refinado_tendao_reforcado', quantidade: 3 },
            { itemId: 'refinado_tabua_carvalho', quantidade: 2 }
        ]
    },
    // Nv 13: Muralha Viva (equip nv12, raro)
    {
        id: 'craft_muralha_viva',
        resultado: 'muralha_viva',
        profissao: 'ferreiro',
        nivelProfissao: 13,
        tier: 2,
        materiais: [
            { itemId: 'refinado_lingote_cobre', quantidade: 6 },
            { itemId: 'refinado_tabua_carvalho', quantidade: 3 },
            { itemId: 'refinado_tendao_reforcado', quantidade: 3 }
        ]
    },

    // ─── COUREIRO: Standalone (boots, belt) ──────────────────────

    // Nv 3: Botas de Couro (equip nv3)
    {
        id: 'craft_botas_couro',
        resultado: 'botas_couro',
        profissao: 'coureiro',
        nivelProfissao: 3,
        tier: 1,
        materiais: [
            { itemId: 'refinado_couro_tratado', quantidade: 3 },
            { itemId: 'refinado_farinha_trigo', quantidade: 1 }
        ]
    },
    // Nv 7: Botas Reforçadas (equip nv7)
    {
        id: 'craft_botas_reforcadas',
        resultado: 'botas_reforcadas',
        profissao: 'coureiro',
        nivelProfissao: 7,
        tier: 2,
        materiais: [
            { itemId: 'refinado_tendao_reforcado', quantidade: 3 },
            { itemId: 'refinado_fio_linho', quantidade: 2 }
        ]
    },

    // ─── JOALHEIRO: Standalone rings (ring) ──────────────────────

    // Nv 2: Anel de Força (equip nv1)
    {
        id: 'craft_anel_forca',
        resultado: 'anel_forca',
        profissao: 'joalheiro',
        nivelProfissao: 2,
        tier: 1,
        materiais: [
            { itemId: 'refinado_lingote_ferro', quantidade: 2 },
            { itemId: 'refinado_file_peixe', quantidade: 1 }
        ]
    },
    // Nv 2: Anel de Agilidade (equip nv1)
    {
        id: 'craft_anel_agilidade',
        resultado: 'anel_agilidade',
        profissao: 'joalheiro',
        nivelProfissao: 2,
        tier: 1,
        materiais: [
            { itemId: 'refinado_lingote_ferro', quantidade: 2 },
            { itemId: 'refinado_file_peixe', quantidade: 1 }
        ]
    },
    // Nv 3: Anel de Vida (equip nv1)
    {
        id: 'craft_anel_vida',
        resultado: 'anel_vida',
        profissao: 'joalheiro',
        nivelProfissao: 3,
        tier: 1,
        materiais: [
            { itemId: 'refinado_lingote_ferro', quantidade: 2 },
            { itemId: 'refinado_file_peixe', quantidade: 1 }
        ]
    },
    // Nv 6: Anel Sortudo (equip nv5)
    {
        id: 'craft_anel_sortudo',
        resultado: 'anel_sortudo',
        profissao: 'joalheiro',
        nivelProfissao: 6,
        tier: 2,
        materiais: [
            { itemId: 'refinado_lingote_cobre', quantidade: 2 },
            { itemId: 'refinado_file_prateado', quantidade: 1 }
        ]
    },

    // ─── JOALHEIRO: Anéis de Conjunto (ring) — drops de monstro ─

    // Nv 3: Anel de Morcego (set morcego, equip nv3)
    {
        id: 'craft_anel_morcego',
        resultado: 'anel_morcego',
        profissao: 'joalheiro',
        nivelProfissao: 3,
        tier: 1,
        materiais: [
            { itemId: 'recurso_asa_morcego', quantidade: 6 },
            { itemId: 'recurso_presa_morcego', quantidade: 2 },
            { itemId: 'refinado_lingote_ferro', quantidade: 2 },
            { itemId: 'refinado_file_peixe', quantidade: 1 }
        ]
    },
    // Nv 3: Anel de Sapo (set sapo, equip nv3)
    {
        id: 'craft_anel_sapo',
        resultado: 'anel_sapo',
        profissao: 'joalheiro',
        nivelProfissao: 3,
        tier: 1,
        materiais: [
            { itemId: 'recurso_gosma_sapo', quantidade: 6 },
            { itemId: 'recurso_lingua_sapo', quantidade: 2 },
            { itemId: 'refinado_lingote_ferro', quantidade: 2 },
            { itemId: 'refinado_file_peixe', quantidade: 1 }
        ]
    },
    // Nv 7: Anel da Serpente (set cobra, equip nv8)
    {
        id: 'craft_anel_cobra',
        resultado: 'anel_cobra',
        profissao: 'joalheiro',
        nivelProfissao: 7,
        tier: 2,
        materiais: [
            { itemId: 'recurso_escama_cobra', quantidade: 8 },
            { itemId: 'recurso_veneno_cobra', quantidade: 3 },
            { itemId: 'refinado_lingote_cobre', quantidade: 3 },
            { itemId: 'refinado_file_prateado', quantidade: 1 }
        ]
    },
    // Nv 8: Anel Ossudo (set esqueleto, equip nv8)
    {
        id: 'craft_anel_esqueleto',
        resultado: 'anel_esqueleto',
        profissao: 'joalheiro',
        nivelProfissao: 8,
        tier: 2,
        materiais: [
            { itemId: 'recurso_osso_polido', quantidade: 8 },
            { itemId: 'recurso_cranio_intacto', quantidade: 3 },
            { itemId: 'refinado_lingote_cobre', quantidade: 3 },
            { itemId: 'refinado_file_prateado', quantidade: 1 }
        ]
    },
    // Nv 12: Anel de Plumas (set harpia, equip nv16)
    {
        id: 'craft_anel_harpia',
        resultado: 'anel_harpia',
        profissao: 'joalheiro',
        nivelProfissao: 12,
        tier: 2,
        materiais: [
            { itemId: 'recurso_pluma_harpia', quantidade: 12 },
            { itemId: 'recurso_garra_harpia', quantidade: 4 },
            { itemId: 'recurso_coroa_rainha_harpia', quantidade: 1 },
            { itemId: 'refinado_lingote_cobre', quantidade: 5 },
            { itemId: 'refinado_file_prateado', quantidade: 3 }
        ]
    },
    // Nv 13: Anel do Urso (set urso, equip nv16)
    {
        id: 'craft_anel_urso',
        resultado: 'anel_urso',
        profissao: 'joalheiro',
        nivelProfissao: 13,
        tier: 2,
        materiais: [
            { itemId: 'recurso_pele_urso', quantidade: 12 },
            { itemId: 'recurso_garra_urso', quantidade: 4 },
            { itemId: 'recurso_essencia_forca', quantidade: 1 },
            { itemId: 'refinado_lingote_cobre', quantidade: 5 },
            { itemId: 'refinado_file_prateado', quantidade: 3 }
        ]
    },

    // =========================================================================
    // === CONJUNTOS ELEMENTAIS — Sábio (nv8) + Primordial (nv13-14) =========
    // === Cross-família: usam drops de 2 famílias diferentes
    // =========================================================================

    // ─── Conjunto do Sábio (incomum, equip nv8) ─────────────────

    // Capa do Sábio — Morcego + Cogumelo (alfaiate nv8)
    {
        id: 'craft_capa_sabio',
        resultado: 'capa_sabio',
        profissao: 'alfaiate',
        nivelProfissao: 8,
        tier: 2,
        materiais: [
            { itemId: 'recurso_asa_morcego', quantidade: 8 },
            { itemId: 'recurso_esporo_cogumelo', quantidade: 8 },
            { itemId: 'refinado_fio_linho', quantidade: 3 },
            { itemId: 'refinado_tabua_carvalho', quantidade: 1 }
        ]
    },
    // Cinto do Sábio — Aranha + Cobra (coureiro nv8)
    {
        id: 'craft_cinto_sabio',
        resultado: 'cinto_sabio',
        profissao: 'coureiro',
        nivelProfissao: 8,
        tier: 2,
        materiais: [
            { itemId: 'recurso_teia_aranha', quantidade: 8 },
            { itemId: 'recurso_escama_cobra', quantidade: 8 },
            { itemId: 'refinado_tendao_reforcado', quantidade: 3 },
            { itemId: 'refinado_fio_linho', quantidade: 1 }
        ]
    },
    // Anel do Sábio — Esqueleto + Sapo (joalheiro nv8)
    {
        id: 'craft_anel_sabio',
        resultado: 'anel_sabio',
        profissao: 'joalheiro',
        nivelProfissao: 8,
        tier: 2,
        materiais: [
            { itemId: 'recurso_osso_polido', quantidade: 8 },
            { itemId: 'recurso_gosma_sapo', quantidade: 6 },
            { itemId: 'refinado_lingote_cobre', quantidade: 3 },
            { itemId: 'refinado_file_prateado', quantidade: 1 }
        ]
    },
    // Amuleto do Sábio — Goblin + Javali (joalheiro nv9)
    {
        id: 'craft_amuleto_sabio',
        resultado: 'amuleto_sabio',
        profissao: 'joalheiro',
        nivelProfissao: 9,
        tier: 2,
        materiais: [
            { itemId: 'recurso_orelha_goblin', quantidade: 8 },
            { itemId: 'recurso_presa_javali', quantidade: 6 },
            { itemId: 'refinado_lingote_cobre', quantidade: 3 },
            { itemId: 'refinado_file_prateado', quantidade: 2 }
        ]
    },

    // ─── Conjunto Primordial (raro, equip nv15) ─────────────────

    // Coroa Primordial — Troll + Harpia (alfaiate nv13)
    {
        id: 'craft_capacete_primordial',
        resultado: 'capacete_primordial',
        profissao: 'alfaiate',
        nivelProfissao: 13,
        tier: 2,
        materiais: [
            { itemId: 'recurso_pele_troll', quantidade: 12 },
            { itemId: 'recurso_pluma_harpia', quantidade: 12 },
            { itemId: 'recurso_coroa_rainha_harpia', quantidade: 1 },
            { itemId: 'refinado_fio_linho', quantidade: 5 },
            { itemId: 'refinado_tabua_carvalho', quantidade: 3 }
        ]
    },
    // Manto Primordial — Golem + Lagarto (alfaiate nv14)
    {
        id: 'craft_capa_primordial',
        resultado: 'capa_primordial',
        profissao: 'alfaiate',
        nivelProfissao: 14,
        tier: 2,
        materiais: [
            { itemId: 'recurso_fragmento_pedra', quantidade: 12 },
            { itemId: 'recurso_escama_lagarto', quantidade: 12 },
            { itemId: 'recurso_coroa_rei_lagarto', quantidade: 1 },
            { itemId: 'refinado_fio_linho', quantidade: 6 },
            { itemId: 'refinado_tabua_carvalho', quantidade: 3 }
        ]
    },
    // Anel Primordial — Urso + Ogro (joalheiro nv14)
    {
        id: 'craft_anel_primordial',
        resultado: 'anel_primordial',
        profissao: 'joalheiro',
        nivelProfissao: 14,
        tier: 2,
        materiais: [
            { itemId: 'recurso_pele_urso', quantidade: 10 },
            { itemId: 'recurso_dente_ogro', quantidade: 10 },
            { itemId: 'recurso_essencia_forca', quantidade: 1 },
            { itemId: 'refinado_lingote_cobre', quantidade: 5 },
            { itemId: 'refinado_file_prateado', quantidade: 3 }
        ]
    },
    // Amuleto Primordial — Harpia + Golem (joalheiro nv14)
    {
        id: 'craft_amuleto_primordial',
        resultado: 'amuleto_primordial',
        profissao: 'joalheiro',
        nivelProfissao: 14,
        tier: 2,
        materiais: [
            { itemId: 'recurso_pluma_harpia', quantidade: 10 },
            { itemId: 'recurso_fragmento_pedra', quantidade: 10 },
            { itemId: 'recurso_cristal_golem_anciao', quantidade: 1 },
            { itemId: 'refinado_lingote_cobre', quantidade: 6 },
            { itemId: 'refinado_file_prateado', quantidade: 3 }
        ]
    }
];

// ========== Funções auxiliares ==========

/** Busca receita pelo ID do resultado */
function buscarReceitaPorResultado(resultadoId) {
    return DB_RECEITAS_CRAFT.find(r => r.resultado === resultadoId);
}

/** Busca todas as receitas de uma profissão */
function buscarReceitasPorProfissao(profissao) {
    return DB_RECEITAS_CRAFT.filter(r => r.profissao === profissao);
}

/** Busca receitas por tier */
function buscarReceitasPorTier(tier) {
    return DB_RECEITAS_CRAFT.filter(r => r.tier === tier);
}

/** Busca todas as receitas de uma profissão com chance de sucesso e XP ajustado.
 *  Qualquer nível pode tentar craftar qualquer receita (com risco de falha).
 *  @param {string} profissao  - ID da profissão
 *  @param {number} nivelAtual - Nível atual da profissão do jogador
 *  @returns {Array} Receitas com campos extras: chanceSucesso (%), xpAjustado
 */
function buscarReceitasDisponiveis(profissao, nivelAtual) {
    return DB_RECEITAS_CRAFT
        .filter(r => r.profissao === profissao)
        .map(r => {
            const xpBase = PROFESSION_XP_REWARDS[`craft_t${r.tier}`] || 10;
            return {
                ...r,
                chanceSucesso: calcularChanceSucessoCraft(nivelAtual, r.nivelProfissao),
                xpAjustado: calcularXPCraft(nivelAtual, r.nivelProfissao, xpBase)
            };
        });
}

/** Verifica se o jogador tem materiais suficientes para uma receita */
function verificarMateriais(receitaId, inventario) {
    const receita = DB_RECEITAS_CRAFT.find(r => r.id === receitaId);
    if (!receita) return { pode: false, faltando: [] };

    const faltando = [];
    for (const mat of receita.materiais) {
        const temNoInventario = inventario.filter(item => item.id === mat.itemId).length;
        if (temNoInventario < mat.quantidade) {
            faltando.push({
                itemId: mat.itemId,
                necessario: mat.quantidade,
                tem: temNoInventario,
                falta: mat.quantidade - temNoInventario
            });
        }
    }

    return { pode: faltando.length === 0, faltando };
}

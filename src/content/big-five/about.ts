// ============================================================
// Big Five Liderança Corporativa, Descritivo institucional
// O que é, objetivos, origem científica e aplicação corporativa.
// Pronto para ser exibido na intro do teste e na primeira página
// da devolutiva. Linguagem clara, sem hífens.
// ============================================================

export const BIG_FIVE_ABOUT = {

  // ── Cartão curto (intro do teste) ──────────────────────────
  cartao: {
    tagline: 'A ciência por trás do seu estilo de liderança',
    descricaoCurta:
      'O Big Five é o modelo de personalidade mais cientificamente validado do mundo. Esta versão foi adaptada para identificar o seu arquétipo de liderança corporativa, cruzando cinco fatores em quatro estilos comerciais: Inovador, Executor, Humano e Especialista.',
    duracao:   '12 a 18 min',
    questoes:  44,
    escala:    'Likert 1 a 5',
  },

  // ── Descritivo completo (devolutiva e página explicativa) ──

  o_que_e:
    'O Big Five (Cinco Grandes Fatores da Personalidade) é o modelo de avaliação psicológica mais utilizado em pesquisas acadêmicas, processos seletivos de grandes corporações e estudos de psicometria no mundo. Ele mede a personalidade em cinco dimensões amplas e estáveis ao longo da vida adulta. Nesta versão Liderança, as cinco dimensões foram traduzidas para nomes comerciais (Influência, Empatia, Execução, Estabilidade e Inovação) e cruzadas em quatro arquétipos de liderança aplicáveis ao dia a dia da gestão.',

  objetivos: [
    'Mapear o estilo de liderança predominante do candidato com base científica.',
    'Identificar superpoderes e pontos cegos de gestão antes da promoção ou contratação.',
    'Sustentar planos de sucessão (Succession Planning) com dados objetivos.',
    'Apoiar PDIs (Plano de Desenvolvimento Individual) com ações práticas por arquétipo.',
    'Reduzir o risco de promover técnicos brilhantes para cargos de gestão sem o desenho de personalidade adequado.',
  ],

  origem: {
    contextoHistorico:
      'O modelo nasceu de décadas de pesquisa em psicometria. Os psicólogos Lewis Goldberg (Universidade de Oregon), Paul Costa e Robert McCrae (National Institutes of Health, EUA) consolidaram nos anos 1980 e 1990 o que ficou conhecido como o modelo OCEAN (Openness, Conscientiousness, Extraversion, Agreeableness, Neuroticism). O inventário BFI (Big Five Inventory) desenvolvido por Oliver John em Berkeley reduziu o modelo para 44 itens validados, padrão atual mais usado em estudos de larga escala e em ferramentas comerciais de RH.',
    base: 'Modelo OCEAN (Cinco Grandes Fatores), Big Five Inventory (BFI) de Oliver John, escala Likert de 5 pontos com itens invertidos para neutralizar viés de resposta.',
    nota:
      'Nesta versão foi feita uma tradução comercial dos fatores acadêmicos (Conscienciosidade vira Execução, Neuroticismo vira Estabilidade Emocional invertida, e assim por diante), preservando a integridade científica do cálculo, inclusive a inversão dos itens marcados.',
  },

  empresas_que_usam: {
    contexto:
      'O Big Five é o inventário de personalidade mais adotado em processos científicos de gestão de talentos no mundo. É a base por trás de ferramentas como Hogan, SHL, Pymetrics e Workday Talent. Companhias que usam Big Five ou seus derivados em assessment, succession planning e analytics de pessoas:',
    exemplos: [
      'Google, no Project Oxygen e em estudos internos de eficácia de líderes.',
      'Microsoft, em modelagem de performance de gestores e em programas Manager Excellence.',
      'McKinsey & Company, no recrutamento de associates e em assessments de liderança.',
      'Deloitte e PwC, em diagnósticos de cultura e em mapas de sucessão.',
      'Procter & Gamble e Unilever, em programas globais de trainees e high potentials.',
      'IBM, no Watson Talent (analytics preditivo de carreira).',
      'Hogan Assessments, fornecedora líder de testes para Fortune 500, baseia toda sua suíte no Big Five.',
      'Empresas brasileiras de grande porte (Itaú, Bradesco, Vale, Magazine Luiza, Ambev) utilizam ferramentas derivadas do Big Five em programas de trainees, sucessão e movimentação interna.',
    ],
    nota:
      'O diferencial do Psique é traduzir esse padrão de mercado internacional em uma devolutiva consultiva em português, com plano de ação aplicável já na próxima semana.',
  },

  aplicacao_corporativa: [
    'RH: substitui ferramentas caras de mercado por uma devolutiva pronta para uso na sessão de feedback.',
    'Diretoria: ganha indicador objetivo de prontidão para liderança em planos de sucessão.',
    'Gestores: enxergam, em 10 minutos de leitura, o estilo de liderança do candidato a promoção.',
    'PDI: cada arquétipo já vem com Superpoderes, Pontos Cegos e Plano de Ação prontos para virarem metas trimestrais.',
    'Processos seletivos: cruza o arquétipo do candidato com o desenho da vaga (Inovador para startup, Executor para operações, Humano para CS, Especialista para áreas técnicas).',
  ],

  fatores_resumo: {
    titulo: 'Os 5 fatores avaliados (tradução comercial)',
    itens: [
      { sigla: 'EXT', nomeComercial: 'Influência & Comunicação',  origemAcademica: 'Extroversão',         mede: 'Capacidade de engajar equipes, negociar e fazer networking.' },
      { sigla: 'AMB', nomeComercial: 'Gestão de Pessoas & Empatia', origemAcademica: 'Amabilidade',       mede: 'Capacidade de ouvir, mediar conflitos e apoiar o time.' },
      { sigla: 'CON', nomeComercial: 'Foco em Resultados & Execução', origemAcademica: 'Conscienciosidade', mede: 'Disciplina, organização e foco em metas. Maior preditor científico de performance.' },
      { sigla: 'EST', nomeComercial: 'Estabilidade Emocional',     origemAcademica: 'Neuroticismo (invertido)', mede: 'Como o líder reage sob pressão e frustrações. Notas altas indicam líderes equilibrados.' },
      { sigla: 'ABE', nomeComercial: 'Inovação & Visão Estratégica', origemAcademica: 'Abertura ao Novo', mede: 'Flexibilidade cognitiva, apetite por mudanças e estratégias fora da caixa.' },
    ],
  },
}

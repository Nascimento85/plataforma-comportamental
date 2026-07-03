// ============================================================
// src/content/test-catalog.ts
// Catálogo unificado dos testes — fonte única para a página
// /dashboard/testes. Copy extraída das antigas páginas de
// categoria (que seguem no ar como aprofundamento).
// Rótulos/emoji/contagem canônicos ficam em src/lib/test-labels.
// ============================================================

import { TEST_PRICE } from '@/lib/test-pricing'

export type CatalogCategory =
  | 'BEHAVIORAL'
  | 'LEADERSHIP'
  | 'CAREER'
  | 'RELATIONSHIPS'
  | 'ARCHETYPES'

export interface CatalogTest {
  testType:    string
  name:        string
  short:       string
  tagline:     string
  pillar:      string
  description: string
  application: string
  bullets:     string[]
  credits:     number
  color:       string
  emoji:       string
  category:    CatalogCategory
  featured?:   boolean
}

export const CATEGORY_META: Record<CatalogCategory, { label: string; href: string; emoji: string }> = {
  BEHAVIORAL:    { label: 'Comportamentais', href: '/dashboard/behavioral',     emoji: '🧭' },
  LEADERSHIP:    { label: 'Liderança',       href: '/dashboard/leadership',     emoji: '🎯' },
  CAREER:        { label: 'Carreira',        href: '/dashboard/career',         emoji: '⚓' },
  RELATIONSHIPS: { label: 'Relacionamentos', href: '/dashboard/love-languages', emoji: '💞' },
  ARCHETYPES:    { label: 'Arquétipos',      href: '/dashboard/archetypes',     emoji: '♟' },
}

export const TEST_CATALOG: CatalogTest[] = [
  // ── Comportamentais ────────────────────────────────────────
  {
    testType: 'DISC',
    name: 'DISC — Perfil Comportamental',
    short: 'DISC',
    tagline: 'A ferramenta mais usada no mundo corporativo',
    pillar: 'Dominância · Influência · Estabilidade · Conformidade',
    description:
      'O mapa comportamental mais amplamente adotado pelas maiores organizações do mundo. Revela as quatro forças que regem como uma pessoa age no trabalho — como decide sob pressão, comunica, lidera, executa e o que a trava em função.',
    application:
      'Processos seletivos, composição de times, planos de desenvolvimento, coaching executivo e alinhamento cultural. Base obrigatória para RH estratégico.',
    bullets: [
      'Perfil dominante + secundário com cruzamento dos 4 fatores',
      'Indica cargos, funções e ambientes de alta compatibilidade',
      'Aponta pontos cegos e vetores de desenvolvimento',
      'Relatório PDF pronto para devolutiva executiva',
    ],
    credits: TEST_PRICE.DISC,
    color: '#e09070',
    emoji: '◉',
    category: 'BEHAVIORAL',
    featured: true,
  },
  {
    testType: 'MBTI',
    name: 'MBTI — 16 Tipos de Personalidade',
    short: 'MBTI',
    tagline: 'Baseado em Carl Jung. Usado por Fortune 500.',
    pillar: 'Extroversão · Sensação · Pensamento · Julgamento',
    description:
      'Decodifica as preferências cognitivas em 4 dimensões para identificar entre 16 tipos de personalidade. Revela como cada pessoa pensa, decide, se energiza e absorve informação — o sistema operacional cognitivo do colaborador.',
    application:
      'Fundamental para montagem de times complementares, planos de sucessão e coaching executivo de alta profundidade.',
    bullets: [
      '70 questões validadas cientificamente',
      'Tipo dominante, auxiliar, terciário e inferior',
      'Compatibilidades entre os 16 tipos',
      'Aplicação em liderança situacional',
    ],
    credits: TEST_PRICE.MBTI,
    color: '#8fa6da',
    emoji: '◆',
    category: 'BEHAVIORAL',
  },
  {
    testType: 'ENNEAGRAM',
    name: 'Eneagrama — 9 Tipos',
    short: 'Eneagrama',
    tagline: 'Usado pela NASA e pelo Vale do Silício.',
    pillar: '9 tipos · asas · instintos · níveis de saúde',
    description:
      'Vai além do comportamento visível: revela a motivação raiz e o medo nuclear que travam maturidade profissional. Adotado por lideranças de alta complexidade para acelerar desenvolvimento e identificar pontos cegos.',
    application:
      'Executivos, fundadores, líderes em transição. Ferramenta preferida de coaches de alta performance.',
    bullets: [
      '135 afirmações para precisão diagnóstica',
      'Motivação raiz, medo básico e fixação',
      'Asas, instintos e níveis de saúde emocional',
      'Vetores de crescimento e desintegração',
    ],
    credits: TEST_PRICE.ENNEAGRAM,
    color: '#c9a84c',
    emoji: '✧',
    category: 'BEHAVIORAL',
  },
  {
    testType: 'TEMPERAMENT',
    name: '4 Personalidades — Temperamentos',
    short: 'Temperamentos',
    tagline: 'A matéria-prima comportamental inata.',
    pillar: 'Colérico · Sanguíneo · Melancólico · Fleumático',
    description:
      'Identifica as quatro inclinações naturais baseadas em Hipócrates — como alguém reage ao mundo de forma inata, antes de qualquer verniz profissional.',
    application:
      'Leitura rápida e precisa para gestores que precisam calibrar pessoas no dia a dia operacional. Ideal como diagnóstico inicial.',
    bullets: [
      'Teste ágil de 25 questões',
      'Perfil primário + secundário',
      'Estilo de trabalho e comunicação',
      'Funções e dinâmicas ideais por temperamento',
    ],
    credits: TEST_PRICE.TEMPERAMENT,
    color: '#7a9e7e',
    emoji: '⬢',
    category: 'BEHAVIORAL',
  },
  {
    testType: 'VAC',
    name: 'VAC — Mapa Sensorial',
    short: 'VAC',
    tagline: 'Como o cérebro recebe o mundo.',
    pillar: 'Visual · Auditivo · Sinestésico',
    description:
      'Identifica o canal sensorial predominante de cada pessoa. Saber se o candidato é mais Visual, Auditivo ou Sinestésico muda totalmente a forma de se comunicar, vender, treinar e liderar.',
    application:
      'Treinamento de vendedores, adaptação de comunicação de líderes, montagem de squads de atendimento e onboarding.',
    bullets: [
      'Inventário sensorial baseado em PNL',
      'Perfil predominante + canais combinados (VA, AS, VS)',
      'Recomendações específicas de comunicação para o gestor',
      'Devolutiva consultiva aprofundada',
    ],
    credits: TEST_PRICE.VAC,
    color: '#d4943a',
    emoji: '👁',
    category: 'BEHAVIORAL',
  },
  {
    testType: 'QMT',
    name: 'QMT — Quociente Mental Triádico',
    short: 'QMT',
    tagline: 'Como a mente pensa: estratégia, pessoas ou execução.',
    pillar: 'Conceitual · Intuitivo · Processual',
    description:
      'Mapeia o modo mental dominante a partir de três formas de processar o mundo. Revela se o candidato pensa primeiro em estratégia, em pessoas ou em execução, e o perfil combinado que define o seu jeito de agir.',
    application:
      'Alocação de talentos por tipo de mente, montagem de duplas complementares e leitura rápida do jeito de pensar de um time.',
    bullets: [
      'Modo mental dominante + modo de apoio',
      '6 perfis combinados com superpoderes e pontos cegos',
      'Leitura de hemisfério e de equilíbrio mental',
      'Devolutiva consultiva aprofundada',
    ],
    credits: TEST_PRICE.QMT,
    color: '#6f86c9',
    emoji: '🧠',
    category: 'BEHAVIORAL',
  },
  {
    testType: 'COMUNICACAO',
    name: 'Mapa da Comunicação',
    short: 'Comunicação',
    tagline: 'Como você fala, escuta e se posiciona sob pressão.',
    pillar: 'Estilo · Energia social · Assertividade',
    description:
      'Cruza três camadas da comunicação: o estilo (Analítico, Intuitivo, Funcional ou Emocional), a energia social e o termômetro de assertividade — o quanto a comunicação é não violenta ou escorrega para passividade, agressividade ou sarcasmo sob pressão.',
    application:
      'Desenvolvimento de líderes e times, mediação de conflitos, comunicação não violenta, vendas e atendimento.',
    bullets: [
      'Estilo de comunicação dominante + perfil social',
      'Termômetro de assertividade (violenta × não violenta)',
      'Como adaptar a fala a cada perfil',
      'Devolutiva consultiva aprofundada',
    ],
    credits: TEST_PRICE.COMUNICACAO,
    color: '#86b58a',
    emoji: '🗣',
    category: 'BEHAVIORAL',
  },
  {
    testType: 'QI',
    name: 'Teste de QI — Raciocínio Lógico',
    short: 'QI',
    tagline: 'Aptidão cognitiva nos moldes de GMAT, Gupy e Kenoby.',
    pillar: 'Lógico-matemático · Analítico · Verbal · Sequências',
    description:
      'Diferente dos mapas de personalidade, este teste é pontuado: tem resposta certa. Mede o raciocínio lógico em quatro pilares — a ferramenta clássica de triagem cognitiva em processos seletivos de tecnologia e posições analíticas.',
    application:
      'Triagem de candidatos, avaliação de raciocínio para funções analíticas e desenvolvimento — raciocínio lógico é treinável.',
    bullets: [
      '20 questões inéditas (5 por pilar), sorteadas por candidato',
      'Score geral, pontuação por pilar e faixa de classificação',
      'Revisão completa com gabarito comentado',
      'Distratoras que emulam vieses cognitivos',
    ],
    credits: TEST_PRICE.QI,
    color: '#c9a84c',
    emoji: '🧮',
    category: 'BEHAVIORAL',
  },

  // ── Liderança ──────────────────────────────────────────────
  {
    testType: 'BIG_FIVE',
    name: 'Big Five — Estilo de Liderança',
    short: 'Big Five',
    tagline: 'O modelo de personalidade mais validado do mundo.',
    pillar: 'Influência · Empatia · Execução · Estabilidade · Inovação',
    description:
      'Traduz os 5 fatores do Big Five em 4 arquétipos corporativos (Inovador, Executor, Humano, Especialista) e entrega um plano de ação concreto para o próximo trimestre.',
    application:
      'Planos de sucessão, assessments de promoção, mapeamento de high potentials e PDIs com superpoderes, pontos cegos e ações trimestrais.',
    bullets: [
      'Teste com 44 questões validadas',
      'Cálculo científico com inversão de itens',
      '4 arquétipos comerciais de liderança',
      'Devolutiva consultiva com cruzamento de dados',
    ],
    credits: TEST_PRICE.BIG_FIVE,
    color: '#8fa6da',
    emoji: '🎯',
    category: 'LEADERSHIP',
  },
  {
    testType: 'LIDERANCA_SITUACIONAL',
    name: 'Liderança Situacional — Hersey e Blanchard',
    short: 'Lid. Situacional',
    tagline: 'Você lidera no automático ou lê o contexto?',
    pillar: 'Direcionar · Orientar · Apoiar · Delegar',
    description:
      'Coloca o líder em situações reais e observa como ele agiria. Revela o estilo dominante, a flexibilidade entre os 4 estilos e a adaptabilidade ao contexto e à maturidade de cada liderado.',
    application:
      'Diagnóstico de gestores, desenvolvimento de líderes e PDIs de liderança com plano concreto para ampliar repertório.',
    bullets: [
      'Cenários reais de liderança, não autoavaliação',
      'Estilo dominante + flexibilidade entre os 4 estilos',
      'Índice de adaptabilidade ao contexto',
      'Devolutiva consultiva com plano de desenvolvimento',
    ],
    credits: TEST_PRICE.LIDERANCA_SITUACIONAL,
    color: '#86b58a',
    emoji: '🧭',
    category: 'LEADERSHIP',
  },

  // ── Carreira ───────────────────────────────────────────────
  {
    testType: 'CAREER_ANCHOR',
    name: 'Âncoras de Carreira',
    short: 'Âncoras',
    tagline: 'Edgar Schein · MIT',
    pillar: '8 âncoras · valores profissionais inegociáveis',
    description:
      'Identifica os valores profissionais que sustentam decisões de longo prazo. As 8 âncoras de Schein revelam o que motiva, energiza e sustenta um profissional — e o que faz alguém abandonar a carreira mesmo bem remunerado.',
    application:
      'PDI, retenção de talentos, planos de sucessão, recrutamento estratégico e processos de transição profissional.',
    bullets: [
      '40 afirmações cobrindo as 8 âncoras clássicas',
      'Âncora primária + secundária com leitura integrada',
      'Estratégias práticas de gestão por âncora',
    ],
    credits: TEST_PRICE.CAREER_ANCHOR,
    color: '#8fa6da',
    emoji: '⚓',
    category: 'CAREER',
  },
  {
    testType: 'EMOTIONAL_INTELLIGENCE',
    name: 'Inteligência Emocional',
    short: 'IE',
    tagline: 'Daniel Goleman · 5 domínios',
    pillar: 'Autoconsciência · Autorregulação · Motivação · Empatia · Social',
    description:
      'Avalia os 5 domínios da Inteligência Emocional de Goleman. Resultado em radar de competências revelando a força emocional dominante e o vetor prioritário de desenvolvimento.',
    application:
      'Formação de lideranças, coaching executivo, fit cultural em recrutamento, gestão de conflitos e soft skills.',
    bullets: [
      '25 questões cobrindo os 5 domínios de Goleman',
      'Radar de competências com pontuação por dimensão',
      'Força dominante + vetor de desenvolvimento prioritário',
    ],
    credits: TEST_PRICE.EMOTIONAL_INTELLIGENCE,
    color: '#e09070',
    emoji: '◈',
    category: 'CAREER',
  },

  // ── Relacionamentos ────────────────────────────────────────
  {
    testType: 'LOVE_LANGUAGES',
    name: '5 Linguagens do Amor',
    short: 'Linguagens',
    tagline: 'Baseado no best-seller de Gary Chapman.',
    pillar: 'Palavras · Tempo · Presentes · Serviço · Toque',
    description:
      'Revela como cada pessoa recebe amor — e por que, às vezes, você faz tudo pela sua parceria e ela ainda não se sente amada. A resposta muda relacionamentos reais: você está falando amor em uma língua que o outro não entende.',
    application:
      'Casais, família e relacionamentos próximos. Também usado em devolutivas de clima para entender como cada pessoa se sente reconhecida.',
    bullets: [
      'Linguagem primária + secundária com percentuais',
      'Exemplos práticos para o dia a dia da relação',
      'Guia de como demonstrar amor na língua do outro',
      'Devolutiva pronta para compartilhar com o par',
    ],
    credits: TEST_PRICE.LOVE_LANGUAGES,
    color: '#c47a72',
    emoji: '💞',
    category: 'RELATIONSHIPS',
  },

  // ── Arquétipos ─────────────────────────────────────────────
  {
    testType: 'ARCHETYPE',
    name: 'Arquétipos — Os 12 Padrões Universais',
    short: 'Arquétipos',
    tagline: 'Baseado na teoria de Carl Jung.',
    pillar: '12 arquétipos · sombra · dons',
    description:
      'Identifica o arquétipo dominante entre 12 padrões universais — revelando como a pessoa lidera, decide e se relaciona, o dom que a impulsiona e a sombra que a sabota.',
    application:
      'Autoconhecimento profundo, coaching, posicionamento de marca pessoal e leitura de dinâmicas de poder em times.',
    bullets: [
      'Arquétipo dominante + secundário',
      'Dons, sombras e caminho de integração',
      'Leitura junguiana aplicada ao trabalho',
      'O mais completo da categoria',
    ],
    credits: TEST_PRICE.ARCHETYPE,
    color: '#c9a84c',
    emoji: '♛',
    category: 'ARCHETYPES',
  },
  {
    testType: 'ARCHETYPE_FEMININE',
    name: 'Arquétipos Femininos — As 7 Energias',
    short: 'Arq. Femininos',
    tagline: 'Qual energia governa o seu momento atual?',
    pillar: 'Mãe · Virgem · Amazona · Sábia · Mística · Sacerdotisa · Feiticeira',
    description:
      'Identifica qual das 7 energias arquetípicas femininas governa o momento atual — e qual precisa ser ativada para o equilíbrio pleno.',
    application:
      'Autoconhecimento, desenvolvimento pessoal e leitura de fases de vida. Muito usado em mentorias e círculos femininos.',
    bullets: [
      'Energia dominante + energia a ativar',
      'Dons e sombras de cada arquétipo',
      'Leitura do momento de vida atual',
      'Devolutiva acolhedora e profunda',
    ],
    credits: TEST_PRICE.ARCHETYPE_FEMININE,
    color: '#d99a91',
    emoji: '🌸',
    category: 'ARCHETYPES',
  },
]

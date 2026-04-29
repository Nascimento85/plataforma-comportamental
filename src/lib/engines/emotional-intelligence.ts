// ============================================================
// ENGINE, Inteligência Emocional (Daniel Goleman, 5 Domínios)
// ============================================================
// 25 questões Likert 5 níveis (1=Discordo Totalmente, 5=Concordo Totalmente)
// 5 domínios × 5 questões cada
// Inspirado no GLF (Global Leadership Foundation) e adaptado ao mercado brasileiro
//
// Domínios (Goleman):
//   AUC, Autoconsciência (Self-Awareness)
//   AUR, Autorregulação (Self-Regulation)   [contém Resiliência]
//   MOT, Motivação (Motivation)
//   EMP, Empatia (Empathy)
//   HAS, Habilidades Sociais (Social Skills) [contém Negociação]
// ============================================================

export type EIDomain = 'AUC' | 'AUR' | 'MOT' | 'EMP' | 'HAS'

export const EI_DOMAIN_LABELS: Record<EIDomain, string> = {
  AUC: 'Autoconsciência',
  AUR: 'Autorregulação',
  MOT: 'Motivação',
  EMP: 'Empatia',
  HAS: 'Habilidades Sociais',
}

export const EI_DOMAIN_SUBTITLES: Record<EIDomain, string> = {
  AUC: 'Reconhecer suas próprias emoções',
  AUR: 'Gerenciar suas emoções e impulsos',
  MOT: 'Mover-se em direção a objetivos',
  EMP: 'Compreender emoções alheias',
  HAS: 'Construir e gerenciar relacionamentos',
}

export const EI_DOMAIN_EMOJIS: Record<EIDomain, string> = {
  AUC: '◉',
  AUR: '◈',
  MOT: '✦',
  EMP: '❀',
  HAS: '⬢',
}

export const EI_DOMAIN_COLORS: Record<EIDomain, string> = {
  AUC: '#c4633a',
  AUR: '#3d4f7c',
  MOT: '#c9a84c',
  EMP: '#c47a72',
  HAS: '#7a9e7e',
}

// Sub-temas que aparecem no relatório (clusters dentro de cada domínio)
export const EI_DOMAIN_SUBTHEMES: Record<EIDomain, string[]> = {
  AUC: ['Autoconhecimento emocional', 'Autoavaliação realista', 'Autoconfiança'],
  AUR: ['Autocontrole', 'Confiabilidade', 'Adaptabilidade', 'Resiliência'],
  MOT: ['Drive de realização', 'Comprometimento', 'Iniciativa', 'Otimismo'],
  EMP: ['Compreensão dos outros', 'Desenvolvimento de pessoas', 'Orientação a serviço'],
  HAS: ['Liderança', 'Comunicação', 'Gestão de conflitos', 'Negociação', 'Colaboração'],
}

// ============================================================
// PERFIS DOS 5 DOMÍNIOS (relatórios)
// ============================================================

export interface EIDomainReport {
  name: string
  tagline: string
  description: string
  highScore: string       // >=70%
  midScore: string        // 40-69%
  lowScore: string        // <40%
  developmentTips: string[]
  applicationCorporate: string
  subthemes: string[]
}

export const EI_DOMAIN_REPORTS: Record<EIDomain, EIDomainReport> = {
  AUC: {
    name: 'Autoconsciência',
    tagline: 'A base de toda inteligência emocional.',
    description:
      'Autoconsciência é a habilidade de reconhecer suas próprias emoções no momento em que acontecem, entender suas forças e limitações reais, e perceber como você impacta as pessoas ao seu redor. Sem essa base, nenhum dos outros 4 domínios consegue evoluir, você fica refém de reações automáticas.',
    highScore:
      'Você apresenta autoconsciência elevada. Reconhece suas emoções com precisão, conhece suas forças e limitações reais, e tem clareza sobre como impacta os outros. Esse é o terreno fértil onde toda liderança madura é construída.',
    midScore:
      'Você tem boa autoconsciência em situações cotidianas, mas pode perder nitidez em momentos de pressão emocional alta. Vale aprofundar a prática de pausar e nomear o que está sentindo, especialmente em conflitos.',
    lowScore:
      'Sua autoconsciência atual precisa de desenvolvimento prioritário. Você pode estar reagindo no automático sem perceber, o que limita sua eficácia em qualquer área da vida profissional. A boa notícia: é a habilidade mais transformadora, qualquer ganho aqui multiplica todas as outras.',
    developmentTips: [
      'Reserve 10 minutos por dia para registrar emoções: o que sentiu, quando, por quê',
      'Peça feedback 360° estruturado a cada semestre, você precisa ver como o outro te vê',
      'Pratique mindfulness ou meditação básica (5–10 min/dia), treina a observação interna',
      'Após reuniões importantes, pergunte-se: "Que emoção dominou em mim ali? Por quê?"',
    ],
    applicationCorporate:
      'Para o RH: profissionais com alta autoconsciência são candidatos prioritários a programas de liderança e sucessão. Para o líder: modele essa habilidade publicamente, admita quando sentiu raiva, ansiedade ou insegurança. Equipes espelham vulnerabilidade emocional madura.',
    subthemes: ['Autoconhecimento emocional', 'Autoavaliação realista', 'Autoconfiança'],
  },
  AUR: {
    name: 'Autorregulação',
    tagline: 'O controle dos seus impulsos sob pressão.',
    description:
      'Autorregulação é a capacidade de gerenciar emoções disruptivas, raiva, frustração, ansiedade, medo, sem reprimi-las nem ser dominado por elas. Inclui resiliência, adaptabilidade a mudanças, integridade sob pressão e a capacidade de pausar antes de reagir.',
    highScore:
      'Você apresenta autorregulação elevada. Mantém a calma em situações de alta pressão, adapta-se a mudanças sem perder produtividade e recupera-se rápido de adversidades. Esse perfil é raro e altamente valorizado em ambientes de mudança constante.',
    midScore:
      'Você gerencia bem suas emoções no cotidiano, mas pode oscilar em situações extremas, feedbacks duros, mudanças bruscas, conflitos acumulados. Há espaço para fortalecer o repertório de respostas em alta intensidade.',
    lowScore:
      'Sua autorregulação atual está abaixo do ideal. Reações impulsivas ou tempo prolongado em estados emocionais negativos podem comprometer entregas e relacionamentos profissionais. Felizmente, autorregulação é a habilidade mais treinável de todas, mudanças aparecem em poucas semanas de prática.',
    developmentTips: [
      'Pratique a "pausa de 6 segundos" antes de responder a estímulos emocionalmente carregados',
      'Identifique seus 2–3 gatilhos principais e crie um plano de resposta para cada',
      'Cuide da base biológica: sono, exercício e alimentação afetam diretamente a regulação',
      'Aprenda técnicas de respiração 4-7-8 ou box breathing para crises agudas',
    ],
    applicationCorporate:
      'Para o RH: autorregulação é o primeiro filtro para cargos de gestão de crise, lideranças sob pressão e front-line com clientes. Para o líder: ofereça segurança psicológica para que o colaborador possa errar e recuperar-se sem medo de retaliação.',
    subthemes: ['Autocontrole', 'Confiabilidade', 'Adaptabilidade', 'Resiliência'],
  },
  MOT: {
    name: 'Motivação',
    tagline: 'A paixão que vai além de dinheiro e status.',
    description:
      'Motivação no modelo de Goleman não é "estar animado", é a paixão profunda por trabalhar por razões que vão além da recompensa externa. É o drive interno por excelência, o comprometimento com objetivos maiores, a iniciativa de buscar oportunidades e o otimismo persistente diante de obstáculos.',
    highScore:
      'Você apresenta motivação interna elevada. Move-se por propósito, busca excelência continuamente e mantém otimismo mesmo diante de adversidades. Esse perfil é o motor de transformações organizacionais e iniciativas de alto impacto.',
    midScore:
      'Você é motivado em projetos que te interessam, mas pode esfriar em rotinas longas ou contextos com pouco propósito visível. Vale buscar maior conexão entre seu trabalho e algo maior do que metas operacionais.',
    lowScore:
      'Sua motivação interna atual está abaixo do que poderia ser. Você pode estar trabalhando "no automático", apenas pelo salário, sem energia para puxar o próximo nível. Esse padrão consome longevidade de carreira, vale investigar o que te conectaria a propósito real.',
    developmentTips: [
      'Identifique e escreva o "porquê" do seu trabalho, a motivação maior por trás da função',
      'Estabeleça metas ambiciosas (BHAG) que te empurrem para fora da zona de conforto',
      'Cerque-se de pessoas com alta motivação intrínseca, energia é contagiosa',
      'Comemore pequenas vitórias diárias, mantém o otimismo prático no longo prazo',
    ],
    applicationCorporate:
      'Para o RH: profissionais altamente motivados intrinsecamente são candidatos a projetos de longa maturação, transformação cultural e empreendedorismo interno. Para o líder: conecte explicitamente cada meta operacional a um propósito maior, narrativa importa tanto quanto bônus.',
    subthemes: ['Drive de realização', 'Comprometimento', 'Iniciativa', 'Otimismo'],
  },
  EMP: {
    name: 'Empatia',
    tagline: 'A capacidade de ler o outro com precisão.',
    description:
      'Empatia é a habilidade de perceber, compreender e considerar a experiência emocional de outras pessoas, sem necessariamente concordar com elas. Inclui ler sinais sutis de linguagem corporal, entender o contexto pessoal por trás do comportamento profissional, e desenvolver pessoas no ritmo certo de cada uma.',
    highScore:
      'Você apresenta empatia elevada. Lê emoções alheias com precisão, considera o outro nas suas decisões e cria vínculos profundos. Esse perfil é vital para liderança humana, cultura organizacional e funções com alto contato humano (vendas, atendimento, RH).',
    midScore:
      'Você consegue ser empático em situações claras, mas pode perder nuances sutis em interações complexas ou sob pressão de prazos. Vale aprofundar a leitura emocional não-verbal e a escuta ativa.',
    lowScore:
      'Sua empatia atual precisa de desenvolvimento. Você pode estar tão focado em resultados que perde sinais emocionais importantes, o que limita liderança e colaboração. Empatia se desenvolve com prática consciente: comece ouvindo mais e julgando depois.',
    developmentTips: [
      'Pratique escuta ativa: ouça sem planejar a resposta enquanto a outra pessoa fala',
      'Observe linguagem corporal e tom de voz, não só o conteúdo das palavras',
      'Faça check-ins emocionais com seus pares: "como você está, de verdade?"',
      'Antes de decisões que afetam pessoas, pergunte-se: "como cada um vai se sentir?"',
    ],
    applicationCorporate:
      'Para o RH: empatia é diferencial em líderes de pessoas, áreas de cultura, customer success e gestão de conflitos. Para o líder: modele empatia ativamente, equipes espelham o que veem em quem comanda.',
    subthemes: ['Compreensão dos outros', 'Desenvolvimento de pessoas', 'Orientação a serviço'],
  },
  HAS: {
    name: 'Habilidades Sociais',
    tagline: 'A maestria em construir e gerenciar relações.',
    description:
      'Habilidades Sociais é a capacidade de mover-se com fluidez em redes humanas, liderar, comunicar, gerenciar conflitos, construir consenso, colaborar e negociar. Inclui o talento de criar pontes onde havia muros, e de transformar conflito em conversa produtiva.',
    highScore:
      'Você apresenta habilidades sociais elevadas. Constrói redes naturalmente, lidera por influência (não só por cargo), gerencia conflitos com maestria e cria consenso em situações polarizadas. Esse perfil é o multiplicador silencioso de qualquer organização.',
    midScore:
      'Você se relaciona bem em contextos previsíveis, mas pode hesitar em situações de alta tensão política, conflito agudo ou negociação complexa. Vale desenvolver técnicas avançadas de comunicação executiva e gestão de stakeholders.',
    lowScore:
      'Suas habilidades sociais atuais precisam de desenvolvimento. Você pode estar evitando conflitos (cedendo demais) ou polarizando demais (impondo posições). Comunicação efetiva e gestão de relações são habilidades 100% treináveis, investimento aqui rende multiplicadores em qualquer carreira.',
    developmentTips: [
      'Pratique comunicação direta e respeitosa, diga "não" sem destruir a relação',
      'Identifique seu BATNA (melhor alternativa) antes de qualquer negociação importante',
      'Construa rede ativa, invista 30 min/semana em relações profissionais sem agenda imediata',
      'Em conflitos: separe pessoa do problema, ataque a questão, não o interlocutor',
    ],
    applicationCorporate:
      'Para o RH: habilidades sociais elevadas são essenciais em vendas, parcerias estratégicas, RH, gestão de stakeholders e qualquer cargo de liderança. Para o líder: ensine sua equipe a transformar conflito em conversa, esse é o multiplicador silencioso de produtividade.',
    subthemes: ['Liderança', 'Comunicação', 'Gestão de conflitos', 'Negociação', 'Colaboração'],
  },
}

// ============================================================
// 25 QUESTÕES, 5 por domínio
// Inspirado em GLF (Global Leadership Foundation) e adaptado ao Brasil
// ============================================================

export interface EIQuestion {
  id: number
  text: string
  domain: EIDomain
}

export const EI_QUESTIONS: EIQuestion[] = [
  // ── AUTOCONSCIÊNCIA (5 questões) ──
  { id: 1,  domain: 'AUC', text: 'Reconheço com facilidade as emoções que estou sentindo no momento em que elas acontecem.' },
  { id: 2,  domain: 'AUC', text: 'Tenho clareza sobre minhas forças e limitações profissionais reais, não idealizo nem subestimo.' },
  { id: 3,  domain: 'AUC', text: 'Percebo como meu humor afeta o ambiente e as pessoas ao meu redor.' },
  { id: 4,  domain: 'AUC', text: 'Quando estou estressado, identifico o que especificamente me causou esse estado.' },
  { id: 5,  domain: 'AUC', text: 'Conheço meus valores fundamentais e tomo decisões alinhadas a eles, mesmo sob pressão.' },

  // ── AUTORREGULAÇÃO (5 questões) ──
  { id: 6,  domain: 'AUR', text: 'Mantenho a calma e a clareza mental mesmo em situações de alta pressão profissional.' },
  { id: 7,  domain: 'AUR', text: 'Quando recebo um feedback negativo crítico, foco em corrigir o erro em vez de me abater.' },
  { id: 8,  domain: 'AUR', text: 'Adapto-me bem a mudanças inesperadas no plano original, sem perder produtividade.' },
  { id: 9,  domain: 'AUR', text: 'Antes de reagir a algo que me irritou, faço uma pausa para escolher a melhor resposta.' },
  { id: 10, domain: 'AUR', text: 'Recupero-me rapidamente de derrotas profissionais, extraindo aprendizados objetivos delas.' },

  // ── MOTIVAÇÃO (5 questões) ──
  { id: 11, domain: 'MOT', text: 'Trabalho movido por propósito e excelência, não apenas por salário ou status.' },
  { id: 12, domain: 'MOT', text: 'Estabeleço metas ambiciosas para mim e busco superá-las consistentemente.' },
  { id: 13, domain: 'MOT', text: 'Mantenho otimismo realista mesmo diante de obstáculos prolongados.' },
  { id: 14, domain: 'MOT', text: 'Tomo iniciativa em projetos importantes, sem esperar ser instruído a fazê-lo.' },
  { id: 15, domain: 'MOT', text: 'Quando enfrento uma frustração no trabalho, ela não consome minha energia para os próximos projetos.' },

  // ── EMPATIA (5 questões) ──
  { id: 16, domain: 'EMP', text: 'Consigo perceber quando um colega não está bem, mesmo que ele não diga nada explicitamente.' },
  { id: 17, domain: 'EMP', text: 'Antes de tomar uma decisão que afete a equipe, busco entender como cada membro se sentirá.' },
  { id: 18, domain: 'EMP', text: 'Ouço atentamente o ponto de vista de outra pessoa, mesmo quando discordo totalmente dela.' },
  { id: 19, domain: 'EMP', text: 'Em conversas difíceis, consigo me colocar no lugar do outro antes de defender minha posição.' },
  { id: 20, domain: 'EMP', text: 'Observo linguagem corporal e tom de voz das pessoas, não apenas o que elas dizem.' },

  // ── HABILIDADES SOCIAIS (5 questões) ──
  { id: 21, domain: 'HAS', text: 'Em conflitos, busco soluções onde ambas as partes saiam ganhando (ganha-ganha).' },
  { id: 22, domain: 'HAS', text: 'Tenho facilidade em construir e manter uma rede ativa de relacionamentos profissionais.' },
  { id: 23, domain: 'HAS', text: 'Consigo influenciar e mobilizar pessoas em direção a um objetivo comum, mesmo sem autoridade hierárquica.' },
  { id: 24, domain: 'HAS', text: 'Sei dizer "não" com firmeza e respeito, sem prejudicar a relação com o interlocutor.' },
  { id: 25, domain: 'HAS', text: 'Em discussões tensas, mantenho o foco no problema em vez de personalizar o conflito.' },
]

// ============================================================
// CÁLCULO
// ============================================================

export interface EIAnswer {
  questionId: number
  value: number  // 1-5
}

export interface EIScores {
  AUC: number
  AUR: number
  MOT: number
  EMP: number
  HAS: number
}

export type EILevel = 'high' | 'mid' | 'low'

export interface EIDomainBreakdown {
  domain: EIDomain
  score: number          // soma das respostas (max 25)
  percentage: number     // % do máximo
  level: EILevel
  report: EIDomainReport
  feedback: string       // Texto baseado no level
}

export interface EIResult {
  scores: EIScores
  percentages: EIScores
  averagePercentage: number
  globalLevel: EILevel
  domains: EIDomainBreakdown[]
  primaryStrength: EIDomain          // Domínio mais alto
  primaryDevelopment: EIDomain       // Domínio mais baixo
  /** Para o radar/teia, array já no formato esperado por gráficos */
  radarData: Array<{ domain: EIDomain; label: string; value: number; max: number }>
}

function levelOf(percentage: number): EILevel {
  if (percentage >= 70) return 'high'
  if (percentage >= 40) return 'mid'
  return 'low'
}

function feedbackFor(report: EIDomainReport, level: EILevel): string {
  if (level === 'high') return report.highScore
  if (level === 'mid') return report.midScore
  return report.lowScore
}

export function calculateEmotionalIntelligence(answers: EIAnswer[]): EIResult {
  const scores: EIScores = { AUC: 0, AUR: 0, MOT: 0, EMP: 0, HAS: 0 }

  for (const answer of answers) {
    const question = EI_QUESTIONS.find((q) => q.id === answer.questionId)
    if (!question) continue
    scores[question.domain] += answer.value
  }

  // Máximo por domínio: 5 questões × 5 pts = 25
  const MAX = 25
  const percentages: EIScores = {
    AUC: Math.round((scores.AUC / MAX) * 100),
    AUR: Math.round((scores.AUR / MAX) * 100),
    MOT: Math.round((scores.MOT / MAX) * 100),
    EMP: Math.round((scores.EMP / MAX) * 100),
    HAS: Math.round((scores.HAS / MAX) * 100),
  }

  const averagePercentage = Math.round(
    (percentages.AUC + percentages.AUR + percentages.MOT + percentages.EMP + percentages.HAS) / 5,
  )
  const globalLevel = levelOf(averagePercentage)

  const domainKeys: EIDomain[] = ['AUC', 'AUR', 'MOT', 'EMP', 'HAS']
  const domains: EIDomainBreakdown[] = domainKeys.map((domain) => {
    const level = levelOf(percentages[domain])
    return {
      domain,
      score: scores[domain],
      percentage: percentages[domain],
      level,
      report: EI_DOMAIN_REPORTS[domain],
      feedback: feedbackFor(EI_DOMAIN_REPORTS[domain], level),
    }
  })

  // Domínio mais alto (força) e mais baixo (desenvolvimento)
  const sortedDesc = [...domains].sort((a, b) => b.percentage - a.percentage)
  const sortedAsc = [...domains].sort((a, b) => a.percentage - b.percentage)
  const primaryStrength = sortedDesc[0].domain
  const primaryDevelopment = sortedAsc[0].domain

  // Radar data
  const radarData = domains.map((d) => ({
    domain: d.domain,
    label: EI_DOMAIN_LABELS[d.domain],
    value: d.percentage,
    max: 100,
  }))

  return {
    scores,
    percentages,
    averagePercentage,
    globalLevel,
    domains,
    primaryStrength,
    primaryDevelopment,
    radarData,
  }
}

// ============================================================
// SHUFFLE DETERMINÍSTICO, mesma ordem se reabrir, ordem nova em testes novos
// ============================================================

export function shuffleEIQuestions(questions: EIQuestion[], seed: string): EIQuestion[] {
  let hash = 2166136261
  for (let i = 0; i < seed.length; i++) {
    hash ^= seed.charCodeAt(i)
    hash = Math.imul(hash, 16777619)
  }
  const result = [...questions]
  for (let i = result.length - 1; i > 0; i--) {
    hash = (hash * 1103515245 + 12345) & 0x7fffffff
    const j = hash % (i + 1)
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

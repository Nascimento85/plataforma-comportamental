// ============================================================
// ENGINE — Âncoras de Carreira (Edgar Schein, MIT)
// ============================================================
// 40 questões Likert 5 níveis (1=Discordo Totalmente, 5=Concordo Totalmente)
// 8 âncoras × 5 questões cada (Q1+8k → âncora k+1)
// Pontuação máxima por âncora: 25
// ============================================================

export type CareerAnchor =
  | 'TF'  // Competência Técnico-Funcional
  | 'GG'  // Gerência Geral
  | 'AU'  // Autonomia / Independência
  | 'SE'  // Segurança / Estabilidade
  | 'CE'  // Criatividade Empreendedora
  | 'SD'  // Serviço / Dedicação a uma Causa
  | 'DP'  // Desafio Puro
  | 'EV'  // Estilo de Vida

export const CAREER_ANCHOR_LABELS: Record<CareerAnchor, string> = {
  TF: 'Competência Técnico-Funcional',
  GG: 'Gerência Geral',
  AU: 'Autonomia & Independência',
  SE: 'Segurança & Estabilidade',
  CE: 'Criatividade Empreendedora',
  SD: 'Serviço & Dedicação',
  DP: 'Desafio Puro',
  EV: 'Estilo de Vida',
}

export const CAREER_ANCHOR_EMOJIS: Record<CareerAnchor, string> = {
  TF: '◆',
  GG: '♛',
  AU: '✦',
  SE: '⬢',
  CE: '◉',
  SD: '❀',
  DP: '⚔',
  EV: '☯',
}

export const CAREER_ANCHOR_COLORS: Record<CareerAnchor, string> = {
  TF: '#3d4f7c',
  GG: '#c9a84c',
  AU: '#c4633a',
  SE: '#7a9e7e',
  CE: '#d4943a',
  SD: '#c47a72',
  DP: '#a8522e',
  EV: '#6b8a7e',
}

// ============================================================
// PERFIS DETALHADOS DAS 8 ÂNCORAS
// ============================================================

export interface CareerAnchorReport {
  name: string
  tagline: string
  summary: string
  motivation: string
  aversion: string
  idealRoles: string[]
  developmentTips: string[]
  managementApproach: string  // Como gerir alguém com essa âncora
}

export const CAREER_ANCHOR_REPORTS: Record<CareerAnchor, CareerAnchorReport> = {
  TF: {
    name: 'Competência Técnico-Funcional',
    tagline: 'A maestria como propósito.',
    summary:
      'Você é movido pelo prazer da especialização. O que te realiza é tornar-se referência indiscutível na sua área de domínio técnico — não pela hierarquia, mas pela profundidade do conhecimento. Sua identidade profissional está atrelada ao "fazer com excelência".',
    motivation:
      'Aprofundar conhecimento, dominar técnicas, ser consultado como autoridade no assunto. O reconhecimento que mais te toca é o respeito de pares qualificados.',
    aversion:
      'Cargos de gestão geral que te afastem da prática técnica. Burocracia, política organizacional e responsabilidades administrativas que diluam o tempo dedicado ao seu ofício.',
    idealRoles: [
      'Especialista sênior, principal engineer, líder técnico',
      'Consultor de alta especialização',
      'Pesquisador, professor, mentor técnico',
      'Cargos de carreira em "Y" (especialista-equivalente a gestor)',
    ],
    developmentTips: [
      'Invista em certificações e cursos avançados na sua área',
      'Participe de conferências e congressos do seu campo',
      'Construa visibilidade técnica (palestras, artigos, código aberto)',
      'Negocie carreira em Y na empresa — ganhar como gestor sem deixar a técnica',
    ],
    managementApproach:
      'Não promova essa pessoa para gestão pura — ofereça trilhas de especialista com reconhecimento financeiro equivalente. Invista em educação contínua e dê visibilidade técnica.',
  },
  GG: {
    name: 'Gerência Geral',
    tagline: 'A liderança sistêmica como vocação.',
    summary:
      'Você foi feito para conduzir. Sua satisfação vem de integrar pessoas, áreas e processos para gerar resultados de impacto amplo. Quanto maior a complexidade e mais altos os stakes, mais você se realiza. Visão sistêmica é seu diferencial.',
    motivation:
      'Liderar pessoas, tomar decisões estratégicas, integrar funções, ser responsável por resultados globais. Subir na hierarquia não é vaidade — é onde sua energia rende mais.',
    aversion:
      'Ficar restrito a uma única área técnica ou funcional. Trabalhos que não te exponham a decisão estratégica, gestão de pessoas e responsabilidade ampla.',
    idealRoles: [
      'Diretor, VP, C-Level (CEO, COO)',
      'General Manager de unidade ou divisão',
      'Country Manager, Head de operação',
      'Consultor estratégico de alto nível',
    ],
    developmentTips: [
      'Faça MBA ou programas executivos de gestão geral',
      'Busque mentoria com líderes seniores',
      'Pratique rotação por diferentes áreas (vendas, operações, finanças)',
      'Desenvolva habilidades de comunicação executiva e gestão de stakeholders',
    ],
    managementApproach:
      'Acelere o desenvolvimento via mentoria com diretoria, exposição a decisões orçamentárias e delegação progressiva de responsabilidade. Esse é o seu sucessor natural.',
  },
  AU: {
    name: 'Autonomia & Independência',
    tagline: 'A liberdade como condição inegociável.',
    summary:
      'Você só rende quando tem espaço para definir como, quando e onde trabalhar. Microgerenciamento te asfixia. Confiança no resultado, não no controle do processo, é o que destrava sua produtividade. Você prefere abrir mão de status para ganhar autonomia.',
    motivation:
      'Definir os próprios fluxos, horários e métodos. Ser cobrado por resultado, não por presença. Liberdade para escolher projetos e abordagens.',
    aversion:
      'Regras rígidas, burocracia excessiva, supervisão constante, microgerenciamento. Estruturas hierárquicas pesadas e processos que limitam decisão individual.',
    idealRoles: [
      'Profissional autônomo, freelancer, consultor independente',
      'Trabalho remoto com alta flexibilidade',
      'Pesquisador, escritor, criativo independente',
      'Especialista contratado por projeto/escopo',
    ],
    developmentTips: [
      'Negocie modelos de trabalho com flexibilidade total de horário',
      'Construa portfólio próprio para ter opções de migração',
      'Desenvolva disciplina de auto-gestão (você é responsável pelos seus prazos)',
      'Aprenda a comunicar resultados claramente — substituindo a "presença" por entregas visíveis',
    ],
    managementApproach:
      'Defina o "quê" (resultado esperado) com clareza absoluta — e libere totalmente o "como". Trabalho remoto, horários flexíveis e autonomia sobre projeto inteiro. Reuniões só por exceção.',
  },
  SE: {
    name: 'Segurança & Estabilidade',
    tagline: 'A previsibilidade como base de tudo.',
    summary:
      'Você valoriza ambientes estáveis, previsíveis e duradouros. Segurança financeira, estabilidade de emprego e identificação de longo prazo com a empresa são o que te tranquilizam para entregar o melhor. Mudanças bruscas e ambientes voláteis drenam sua energia.',
    motivation:
      'Estabilidade financeira, plano de carreira claro, benefícios sólidos, baixa rotatividade. Pertencer a uma organização forte e duradoura.',
    aversion:
      'Ambientes de alto risco, startups instáveis, reorganizações frequentes. Mudanças bruscas de função, terceirização ou modelos de remuneração 100% variável.',
    idealRoles: [
      'Empresas grandes, consolidadas, com baixa rotatividade',
      'Setor público, instituições financeiras tradicionais, multinacionais',
      'Cargos com plano de carreira estruturado e previsível',
      'Funções essenciais e estáveis (compliance, controladoria, infraestrutura)',
    ],
    developmentTips: [
      'Construa progressivamente sua tolerância a mudanças menores antes das grandes',
      'Invista em previdência, reserva financeira, certificações que aumentam segurança',
      'Negocie estabilidade com cláusulas claras de carreira e benefícios',
      'Reconheça que zona de conforto excessiva pode também ser risco no longo prazo',
    ],
    managementApproach:
      'Comunique mudanças com antecedência e contexto. Ofereça planos de carreira claros, benefícios sólidos e reconhecimento por permanência. Evite expô-lo a alta volatilidade.',
  },
  CE: {
    name: 'Criatividade Empreendedora',
    tagline: 'A obra própria como assinatura.',
    summary:
      'Você precisa criar. Não basta executar bem — você precisa que o resultado leve sua marca, sua autoria, sua visão. Empreender, lançar produtos novos, deixar legado autoral é o que te energiza. Trabalhar para realizar a visão de outro é um caminho temporário.',
    motivation:
      'Criar do zero, ver uma ideia virar realidade, ser dono da obra. Empreendedorismo, inovação radical, projetos com identidade própria.',
    aversion:
      'Ser apenas executor da visão alheia. Trabalhar em projetos sem espaço para autoria. Empresas onde sua contribuição se dilui no anonimato corporativo.',
    idealRoles: [
      'Empreendedor, founder, intra-empreendedor',
      'Inovador em corporate venture, líder de novos produtos',
      'Diretor criativo, head de inovação',
      'Investidor-operador, executive in residence',
    ],
    developmentTips: [
      'Comece projetos paralelos para validar o veio empreendedor',
      'Estude finanças de negócios — entender unit economics é vital',
      'Construa rede de mentores empreendedores e investidores',
      'Aprenda a vender sua visão — pitch é habilidade essencial',
    ],
    managementApproach:
      'Dê espaço para iniciativas próprias, intra-empreendedorismo e autoria visível. Reconheça pelo nome em projetos. Considere modelos de equity ou bônus por novos produtos.',
  },
  SD: {
    name: 'Serviço & Dedicação',
    tagline: 'O propósito como combustível.',
    summary:
      'Você só se realiza quando o trabalho serve a algo maior do que lucro. Causas, impacto social, valores éticos profundos — esses são seus motores. Você prefere ganhar menos em algo que tenha sentido a ganhar muito em algo vazio.',
    motivation:
      'Contribuir para o bem-estar coletivo, defender causas, ajudar pessoas, alinhar trabalho com valores pessoais profundos.',
    aversion:
      'Funções puramente focadas em lucro sem propósito maior. Empresas que ferem sua ética. Ambientes onde "fazer dinheiro" é o único critério.',
    idealRoles: [
      'ONGs, fundações, terceiro setor',
      'Educação, saúde, sustentabilidade, serviço público',
      'Cargos de propósito em empresas B-Corp ou ESG',
      'Liderança em iniciativas sociais corporativas',
    ],
    developmentTips: [
      'Identifique a causa ou conjunto de valores que mais te move',
      'Vincule sua escolha de empregadores à coerência com seus valores',
      'Desenvolva habilidades de impacto mensurável (sua causa precisa render resultados)',
      'Construa rede no campo do impacto — comunidades de propósito',
    ],
    managementApproach:
      'Conecte os objetivos de negócio com o propósito maior da função. Reconheça contribuições para a causa. Permita tempo para projetos voluntários ou de impacto.',
  },
  DP: {
    name: 'Desafio Puro',
    tagline: 'A adversidade como combustível.',
    summary:
      'Você precisa de obstáculos à altura. O que te energiza é vencer o "impossível", competir em níveis altos, resolver problemas que outros consideram insolúveis. Rotina te entedia rapidamente — você precisa de fronteiras para escalar.',
    motivation:
      'Resolver problemas extremamente difíceis, competir em níveis máximos, vencer obstáculos. A vitória contra a adversidade é o que te realiza.',
    aversion:
      'Rotina previsível, tarefas fáceis, ambientes sem competitividade ou risco. Funções onde o desafio se esgota rápido e o trabalho vira manutenção.',
    idealRoles: [
      'Cirurgião, atleta de alta performance, piloto de testes',
      'M&A, banking de investimento, turnaround de empresas',
      'Consultoria estratégica de alto nível',
      'Liderança em crises ou transformações radicais',
    ],
    developmentTips: [
      'Busque desafios progressivamente maiores — evite estagnar',
      'Desenvolva resiliência emocional para lidar com derrotas',
      'Aprenda a colaborar — sua competitividade pode afastar parceiros',
      'Cuidado com burnout: saiba reconhecer quando o desafio virou auto-sabotagem',
    ],
    managementApproach:
      'Ofereça projetos com complexidade crescente e fronteiras claras. Use rankings, metas ambiciosas e reconhecimento competitivo. Evite tarefas repetitivas após domínio.',
  },
  EV: {
    name: 'Estilo de Vida',
    tagline: 'A integração como inegociável.',
    summary:
      'Para você, trabalho e vida pessoal não são compartimentos separados — são uma única equação que precisa estar em equilíbrio. Você não aceita sacrificar família, saúde ou tempo livre por nenhuma promoção. O trabalho deve servir à vida, não o contrário.',
    motivation:
      'Equilíbrio entre trabalho, família e tempo pessoal. Flexibilidade, autonomia geográfica e temporal, integração entre os papéis da vida.',
    aversion:
      'Excesso de viagens, horas extras crônicas, promoções que exijam sacrifício familiar, ambientes que glorificam "hustle" e burnout.',
    idealRoles: [
      'Empresas com cultura genuína de equilíbrio',
      'Trabalho remoto ou híbrido com flexibilidade real',
      'Funções com horário previsível e baixa cobrança fora de horário',
      'Carreiras com possibilidade de pausas e sabáticos',
    ],
    developmentTips: [
      'Defina seus limites claramente desde a entrevista — não negocie depois',
      'Avalie cultura de equilíbrio antes de aceitar propostas (não confie no marketing)',
      'Invista em produtividade dentro do horário — entregue mais em menos tempo',
      'Construa identidades fortes fora do trabalho — protegem nos momentos difíceis',
    ],
    managementApproach:
      'Respeite limites de horário e disponibilidade. Ofereça flexibilidade real (não só no papel). Reconheça produtividade, não horas trabalhadas. Promova sem exigir sacrifício pessoal.',
  },
}

// ============================================================
// 40 QUESTÕES — Schein adaptado, escala Likert 1-5
// Mapeamento: Q1+8k → âncora ordem [TF, GG, AU, SE, CE, SD, DP, EV]
// ============================================================

export interface CareerAnchorQuestion {
  id: number
  text: string
  anchor: CareerAnchor
}

const ANCHOR_ORDER: CareerAnchor[] = ['TF', 'GG', 'AU', 'SE', 'CE', 'SD', 'DP', 'EV']

const RAW_QUESTIONS: string[] = [
  // 1-8
  'Sonho em ser tão bom no que faço que minha opinião de especialista seja sempre solicitada.',
  'Me sinto mais realizado em meu trabalho quando sou capaz de integrar e gerenciar o trabalho dos outros.',
  'Sonho em ter uma carreira que me dê a liberdade de fazer o trabalho do meu jeito e no tempo por mim programado.',
  'Segurança e estabilidade são mais importantes para mim do que liberdade e autonomia.',
  'Estou sempre procurando ideias que me permitam iniciar meu próprio negócio.',
  'Sentirei sucesso na minha carreira se sentir que contribuí verdadeiramente para o bem-estar da sociedade.',
  'Sonho com uma carreira na qual eu possa solucionar problemas ou vencer em situações extremamente desafiadoras.',
  'Prefiro deixar meu emprego a ser colocado em um trabalho que comprometa minha capacidade de satisfazer meus interesses pessoais e familiares.',

  // 9-16
  'Só me sentirei bem-sucedido em minha carreira se puder desenvolver minhas habilidades técnicas e funcionais até o mais alto nível de competência.',
  'Sonho em dirigir uma organização complexa e tomar decisões que afetem muitas pessoas.',
  'Me sinto mais realizado em meu trabalho quando tenho total liberdade de definir minhas próprias tarefas, horários e procedimentos.',
  'Prefiro manter minha atividade atual a aceitar outra tarefa que possa colocar em risco minha segurança na empresa.',
  'Montar meu próprio negócio é mais importante para mim do que atingir uma alta posição gerencial como funcionário.',
  'Me sinto mais realizado em minha carreira quando posso utilizar meus talentos a serviço dos outros.',
  'Me sinto realizado em minha carreira apenas quando enfrento e supero desafios extremamente difíceis.',
  'Sonho com uma carreira que me permita integrar minhas necessidades pessoais, familiares e de trabalho.',

  // 17-24
  'Me tornar um gerente técnico em minha área de especialização é mais atraente para mim do que me tornar um gerente geral em alguma organização.',
  'Me sentirei bem-sucedido em minha carreira apenas quando me tornar um gerente geral em alguma organização.',
  'Me sentirei bem-sucedido em minha carreira apenas quando alcançar total autonomia e liberdade.',
  'Procuro trabalhos em organizações que me deem senso de segurança e estabilidade.',
  'Me sinto realizado em minha carreira quando sou capaz de construir alguma coisa que seja inteiramente resultado de minhas ideias e esforços.',
  'Utilizar minhas habilidades para tornar o mundo um lugar melhor para se viver e trabalhar é mais importante para mim do que alcançar uma posição gerencial de alto nível.',
  'Me sinto mais realizado em minha carreira quando soluciono problemas aparentemente insolúveis ou venço o que aparentemente era impossível de ser vencido.',
  'Me sinto bem-sucedido na vida apenas quando sou capaz de equilibrar minhas necessidades pessoais, familiares e de carreira.',

  // 25-32
  'Prefiro sair da empresa onde estou a aceitar uma tarefa em esquema rotativo que me afaste da minha área de experiência.',
  'Me tornar um diretor geral é mais atraente para mim do que me tornar um diretor técnico em minha área de especialização.',
  'Para mim, poder fazer um trabalho do meu jeito, livre de regras e restrições, é mais importante do que segurança.',
  'Me sinto mais realizado em meu trabalho quando percebo que tenho total segurança financeira e estabilidade no trabalho.',
  'Me sinto bem-sucedido em meu trabalho apenas quando posso criar ou construir alguma coisa que seja inteiramente de minha autoria.',
  'Sonho em ter uma carreira que faça uma real contribuição à humanidade e à sociedade.',
  'Procuro oportunidades de trabalho que desafiem fortemente minhas habilidades para solucionar problemas.',
  'Equilibrar as exigências da minha vida pessoal e profissional é mais importante do que alcançar alta posição gerencial.',

  // 33-40
  'Me sinto plenamente realizado em meu trabalho quando sou capaz de empregar minhas habilidades e talentos especiais.',
  'Prefiro sair da empresa onde estou a aceitar um cargo que me afaste do caminho da diretoria geral.',
  'Prefiro sair da empresa onde estou a aceitar um cargo que reduza minha autonomia e liberdade.',
  'Sonho em ter uma carreira que me dê senso de segurança e estabilidade.',
  'Sonho em iniciar e montar meu próprio negócio.',
  'Prefiro sair da empresa onde estou a aceitar um cargo que prejudique minha capacidade de ser útil aos outros.',
  'Trabalhar em problemas praticamente insolúveis para mim é mais importante do que alcançar uma posição gerencial de alto nível.',
  'Sempre procurei oportunidades de trabalho que minimizassem interferências com assuntos pessoais e familiares.',
]

export const CAREER_ANCHOR_QUESTIONS: CareerAnchorQuestion[] = RAW_QUESTIONS.map((text, i) => ({
  id: i + 1,
  text,
  anchor: ANCHOR_ORDER[i % 8],
}))

// ============================================================
// CÁLCULO
// ============================================================

export interface CareerAnchorAnswer {
  questionId: number
  value: number  // 1-5
}

export interface CareerAnchorScores {
  TF: number
  GG: number
  AU: number
  SE: number
  CE: number
  SD: number
  DP: number
  EV: number
}

export interface CareerAnchorResult {
  scores: CareerAnchorScores
  percentages: CareerAnchorScores         // % do máximo (25 pts)
  primaryAnchor: CareerAnchor
  secondaryAnchor: CareerAnchor
  primaryReport: CareerAnchorReport
  secondaryReport: CareerAnchorReport
  ranking: Array<{ anchor: CareerAnchor; score: number; percentage: number }>
}

export function calculateCareerAnchor(answers: CareerAnchorAnswer[]): CareerAnchorResult {
  const scores: CareerAnchorScores = {
    TF: 0, GG: 0, AU: 0, SE: 0, CE: 0, SD: 0, DP: 0, EV: 0,
  }

  for (const answer of answers) {
    const question = CAREER_ANCHOR_QUESTIONS.find((q) => q.id === answer.questionId)
    if (!question) continue
    scores[question.anchor] += answer.value
  }

  // Máximo por âncora: 5 questões × 5 pts = 25
  const MAX = 25
  const percentages: CareerAnchorScores = {
    TF: Math.round((scores.TF / MAX) * 100),
    GG: Math.round((scores.GG / MAX) * 100),
    AU: Math.round((scores.AU / MAX) * 100),
    SE: Math.round((scores.SE / MAX) * 100),
    CE: Math.round((scores.CE / MAX) * 100),
    SD: Math.round((scores.SD / MAX) * 100),
    DP: Math.round((scores.DP / MAX) * 100),
    EV: Math.round((scores.EV / MAX) * 100),
  }

  const ranking = (Object.keys(scores) as CareerAnchor[])
    .map((anchor) => ({
      anchor,
      score: scores[anchor],
      percentage: percentages[anchor],
    }))
    .sort((a, b) => b.score - a.score)

  const primaryAnchor = ranking[0].anchor
  const secondaryAnchor = ranking[1].anchor

  return {
    scores,
    percentages,
    primaryAnchor,
    secondaryAnchor,
    primaryReport: CAREER_ANCHOR_REPORTS[primaryAnchor],
    secondaryReport: CAREER_ANCHOR_REPORTS[secondaryAnchor],
    ranking,
  }
}

// ============================================================
// SHUFFLE DETERMINÍSTICO — para versões variáveis
// Mesmo seed = mesma ordem (consistência se reabrir)
// Seed diferente (assessment.id) = ordem diferente em testes novos
// ============================================================

export function shuffleQuestions(
  questions: CareerAnchorQuestion[],
  seed: string,
): CareerAnchorQuestion[] {
  // Hash simples do seed (FNV-like)
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

// ============================================================
// ENGINE — 4 Temperamentos
// ============================================================
// 25 questões, 4 opções por questão (A/C/I/O)
// Cada opção corresponde a um temperamento:
//   A = Colérico   | C = Sanguíneo
//   I = Melancólico | O = Fleumático
// Pontuação: soma simples — max 25 por temperamento
// Perfil predominante = maior pontuação
// ============================================================

export type TemperamentType = 'COLERICO' | 'SANGUINEO' | 'MELANCOLICO' | 'FLEUMATICO'
export type TemperamentOption = 'A' | 'C' | 'I' | 'O'

export interface TemperamentQuestion {
  id: number
  question: string
  options: Record<TemperamentOption, string>
}

export interface TemperamentAnswer {
  questionId: number
  selected: TemperamentOption
}

export interface TemperamentScores {
  COLERICO: number    // opção A
  SANGUINEO: number   // opção C
  MELANCOLICO: number // opção I
  FLEUMATICO: number  // opção O
}

export interface TemperamentProfile {
  type: TemperamentType
  name: string
  title: string
  description: string
  strengths: string[]
  challenges: string[]
  workStyle: string
  communication: string
  idealRoles: string[]
  color: string
}

export interface TemperamentResult {
  scores: TemperamentScores
  percentages: TemperamentScores
  primaryType: TemperamentType
  secondaryType: TemperamentType
  profile: TemperamentProfile
  secondaryProfile: TemperamentProfile
  interpretation: string
}

// ============================================================
// 25 QUESTÕES (extraídas da planilha oficial)
// ============================================================
export const TEMPERAMENT_QUESTIONS: TemperamentQuestion[] = [
  {
    id: 1,
    question: 'Eu sou...',
    options: {
      I: 'Idealista, criativo e visionário',
      C: 'Divertido, espiritual e benéfico',
      O: 'Confiável, meticuloso e previsível',
      A: 'Focado, determinado e persistente',
    },
  },
  {
    id: 2,
    question: 'Eu gosto de...',
    options: {
      A: 'Ser piloto',
      C: 'Conversar com os passageiros',
      O: 'Planejar a viagem',
      I: 'Explorar novas rotas',
    },
  },
  {
    id: 3,
    question: 'Se você quiser se dar bem comigo...',
    options: {
      I: 'Me dê liberdade',
      O: 'Me deixe saber sua expectativa',
      A: 'Lidere, siga ou saia do caminho',
      C: 'Seja amigável, carinhoso e compreensivo',
    },
  },
  {
    id: 4,
    question: 'Para conseguir obter bons resultados é preciso...',
    options: {
      I: 'Ter incertezas',
      O: 'Controlar o essencial',
      C: 'Diversão e celebração',
      A: 'Planejar e obter recursos',
    },
  },
  {
    id: 5,
    question: 'Eu me divirto quando...',
    options: {
      A: 'Estou me exercitando',
      I: 'Tenho novidades',
      C: 'Estou com outros',
      O: 'Determino as regras',
    },
  },
  {
    id: 6,
    question: 'Eu penso que...',
    options: {
      C: 'Unidos venceremos, divididos perderemos',
      A: 'O ataque é melhor que a defesa',
      I: 'É bom ser manso, mas andar com um porrete',
      O: 'Um homem prevenido vale por dois',
    },
  },
  {
    id: 7,
    question: 'Minha preocupação é...',
    options: {
      I: 'Gerar a ideia global',
      C: 'Fazer com que as pessoas gostem',
      O: 'Fazer com que funcione',
      A: 'Fazer com que aconteça',
    },
  },
  {
    id: 8,
    question: 'Eu prefiro...',
    options: {
      I: 'Perguntas a respostas',
      O: 'Ter todos os detalhes',
      A: 'Vantagens a meu favor',
      C: 'Que todos tenham a chance de ser ouvidos',
    },
  },
  {
    id: 9,
    question: 'Eu gosto de...',
    options: {
      A: 'Fazer progresso',
      C: 'Construir memórias',
      O: 'Fazer sentido',
      I: 'Tornar as pessoas confortáveis',
    },
  },
  {
    id: 10,
    question: 'Eu gosto de chegar...',
    options: {
      A: 'Na frente',
      C: 'Junto',
      O: 'Na hora',
      I: 'Em outro lugar',
    },
  },
  {
    id: 11,
    question: 'Um ótimo dia para mim é quando...',
    options: {
      A: 'Consigo fazer muitas coisas',
      C: 'Me divirto com meus amigos',
      O: 'Tudo segue conforme planejado',
      I: 'Desfruto de coisas novas e estimulantes',
    },
  },
  {
    id: 12,
    question: 'Eu vejo a morte como...',
    options: {
      I: 'Uma grande aventura misteriosa',
      C: 'Oportunidade para rever os falecidos',
      O: 'Um modo de receber recompensas',
      A: 'Algo que sempre chega muito cedo',
    },
  },
  {
    id: 13,
    question: 'Minha filosofia de vida é...',
    options: {
      A: 'Há ganhadores e perdedores, e eu acredito ser um ganhador',
      C: 'Para eu ganhar, ninguém precisa perder',
      O: 'Para ganhar é preciso seguir as regras',
      I: 'Para ganhar, é necessário inventar novas regras',
    },
  },
  {
    id: 14,
    question: 'Eu sempre gostei de...',
    options: {
      I: 'Explorar',
      O: 'Evitar surpresas',
      A: 'Focalizar a meta',
      C: 'Realizar uma abordagem natural',
    },
  },
  {
    id: 15,
    question: 'Eu gosto de mudanças se...',
    options: {
      A: 'Me der uma vantagem competitiva',
      C: 'For divertido e puder ser compartilhado',
      I: 'Me der mais liberdade e variedade',
      O: 'Melhorar ou me der mais controle',
    },
  },
  {
    id: 16,
    question: 'Não existe nada de errado em...',
    options: {
      A: 'Se colocar na frente',
      C: 'Colocar os outros na frente',
      I: 'Mudar de ideia',
      O: 'Ser consistente',
    },
  },
  {
    id: 17,
    question: 'Eu gosto de buscar conselhos de...',
    options: {
      A: 'Pessoas bem sucedidas',
      C: 'Anciões e conselheiros',
      O: 'Autoridades no assunto',
      I: 'Lugares, os mais estranhos',
    },
  },
  {
    id: 18,
    question: 'Meu lema é...',
    options: {
      I: 'Fazer o que precisa ser feito',
      O: 'Fazer bem feito',
      C: 'Fazer junto com o grupo',
      A: 'Simplesmente fazer',
    },
  },
  {
    id: 19,
    question: 'Eu gosto de...',
    options: {
      I: 'Complexidade, mesmo se confuso',
      O: 'Ordem e sistematização',
      C: 'Calor humano e animação',
      A: 'Coisas claras e simples',
    },
  },
  {
    id: 20,
    question: 'Tempo para mim é...',
    options: {
      A: 'Algo que detesto desperdiçar',
      C: 'Um grande ciclo',
      O: 'Uma flecha que leva ao inevitável',
      I: 'Irrelevante',
    },
  },
  {
    id: 21,
    question: 'Se eu fosse bilionário...',
    options: {
      C: 'Faria doações para muitas entidades',
      O: 'Criaria uma poupança avantajada',
      I: 'Faria o que desse na cabeça',
      A: 'Exibiria bastante com algumas pessoas',
    },
  },
  {
    id: 22,
    question: 'Eu acredito que...',
    options: {
      A: 'O destino é mais importante que a jornada',
      C: 'A jornada é mais importante que o destino',
      O: 'Um centavo economizado é um centavo ganho',
      I: 'Bastam um navio e uma estrela para navegar',
    },
  },
  {
    id: 23,
    question: 'Eu acredito também que...',
    options: {
      A: 'Aquele que hesita está perdido',
      O: 'De grão em grão a galinha enche o papo',
      C: 'O que vai, volta',
      I: 'Um sorriso ou uma careta é o mesmo para quem é cego',
    },
  },
  {
    id: 24,
    question: 'Eu acredito ainda que...',
    options: {
      O: 'É melhor prudência do que arrependimento',
      I: 'A autoridade deve ser desafiada',
      A: 'Ganhar é fundamental',
      C: 'O coletivo é mais importante do que o individual',
    },
  },
  {
    id: 25,
    question: 'Eu penso que...',
    options: {
      I: 'Não é fácil ficar encurralado',
      O: 'É preferível olhar, antes de pular',
      C: 'Duas cabeças pensam melhor do que uma',
      A: 'Se você não tem condições de competir, não compita',
    },
  },
]

// ============================================================
// PERFIS DOS 4 TEMPERAMENTOS
// ============================================================
export const TEMPERAMENT_PROFILES: Record<TemperamentType, TemperamentProfile> = {
  COLERICO: {
    type: 'COLERICO',
    name: 'Colérico',
    title: 'O Líder Nato',
    description:
      'O Colérico é assertivo, decidido e orientado para resultados. Natural líder, enfrenta desafios de frente e toma decisões rápidas. É movido pela conquista e pelo poder de influenciar os resultados ao redor.',
    strengths: [
      'Liderança natural e capacidade de tomar decisões',
      'Determinação e perseverança diante de obstáculos',
      'Orientação para metas e resultados tangíveis',
      'Energia e proatividade constantes',
      'Habilidade de motivar equipes em situações de pressão',
    ],
    challenges: [
      'Impaciência com processos lentos ou pessoas indecisos',
      'Tendência ao autoritarismo e controle excessivo',
      'Dificuldade em delegar e confiar nos outros',
      'Baixa tolerância ao erro (próprio e alheio)',
      'Conflitos interpessoais pela postura dominante',
    ],
    workStyle: 'Prefere ambientes dinâmicos com autonomia e metas claras. Trabalha melhor liderando projetos e equipes.',
    communication: 'Comunicação direta, objetiva e assertiva. Aprecia feedback claro e sem rodeios.',
    idealRoles: ['Diretor', 'Gestor de Projetos', 'Empreendedor', 'Executivo de Vendas', 'Líder de Equipe'],
    color: '#ef4444',
  },

  SANGUINEO: {
    type: 'SANGUINEO',
    name: 'Sanguíneo',
    title: 'O Comunicador Inspirador',
    description:
      'O Sanguíneo é extrovertido, entusiástico e sociável. Conecta-se com facilidade com as pessoas e irradia otimismo. É movido pelas relações humanas e pela alegria de estar em grupo.',
    strengths: [
      'Habilidades sociais e capacidade de fazer conexões',
      'Entusiasmo contagiante e energia positiva',
      'Criatividade e espontaneidade em ideias',
      'Adaptabilidade rápida a novos ambientes',
      'Excelente comunicador e motivador de pessoas',
    ],
    challenges: [
      'Impulsividade e tomada de decisões precipitadas',
      'Dificuldade em manter foco e concluir tarefas',
      'Tendência à superficialidade em alguns relacionamentos',
      'Aversão a tarefas repetitivas e rotineiras',
      'Busca excessiva de aprovação dos outros',
    ],
    workStyle: 'Trabalha melhor em ambientes colaborativos, com variedade de atividades e interação constante.',
    communication: 'Comunicação calorosa, expressiva e animada. Prefere conversas pessoais e interação face a face.',
    idealRoles: ['Vendedor', 'Relações Públicas', 'Apresentador', 'Educador', 'Consultor de Pessoas'],
    color: '#f59e0b',
  },

  MELANCOLICO: {
    type: 'MELANCOLICO',
    name: 'Melancólico',
    title: 'O Analítico Perfeccionista',
    description:
      'O Melancólico é introspectivo, analítico e detalhista. Busca a excelência em tudo que faz e possui profundidade emocional e intelectual. É movido pela busca da perfeição e pelo desejo de fazer tudo com qualidade.',
    strengths: [
      'Atenção excepcional aos detalhes e precisão',
      'Capacidade analítica e pensamento crítico apurado',
      'Comprometimento com a qualidade e excelência',
      'Empatia profunda e sensibilidade aos sentimentos alheios',
      'Lealdade e confiabilidade em relacionamentos',
    ],
    challenges: [
      'Perfeccionismo excessivo que pode levar à procrastinação',
      'Autocrítica intensa e tendência ao pessimismo',
      'Sensibilidade exacerbada a críticas externas',
      'Tendência ao isolamento social',
      'Dificuldade em tomar decisões rápidas',
    ],
    workStyle: 'Prefere trabalhar de forma independente, com tempo para planejar e executar com cuidado e precisão.',
    communication: 'Comunicação cuidadosa, precisa e reflexiva. Prefere análise antes de falar e comunicação escrita.',
    idealRoles: ['Analista', 'Pesquisador', 'Contador', 'Engenheiro', 'Escritor', 'Designer'],
    color: '#8b5cf6',
  },

  FLEUMATICO: {
    type: 'FLEUMATICO',
    name: 'Fleumático',
    title: 'O Diplomata Estável',
    description:
      'O Fleumático é calmo, equilibrado e confiável. É o mediador natural dos grupos e possui estabilidade emocional inigualável. É movido pela paz, harmonia e pelo desejo de ser consistente.',
    strengths: [
      'Estabilidade emocional e calma em situações de pressão',
      'Habilidade natural de mediar conflitos',
      'Confiabilidade e constância no cumprimento de compromissos',
      'Paciência e capacidade de ouvir ativamente',
      'Lealdade e fidelidade em relacionamentos',
    ],
    challenges: [
      'Tendência à passividade e procrastinação',
      'Dificuldade em expressar emoções e necessidades',
      'Resistência a mudanças abruptas',
      'Falta de assertividade em situações que exigem posicionamento',
      'Dificuldade em tomar decisões rápidas sob pressão',
    ],
    workStyle: 'Trabalha bem em ambientes estáveis e previsíveis. Excelente em funções de suporte e mediação.',
    communication: 'Comunicação calma, diplomática e cuidadosa. Ouve mais do que fala e evita conflitos.',
    idealRoles: ['RH', 'Assistente Social', 'Mediador', 'Administrador', 'Psicólogo', 'Educador'],
    color: '#22c55e',
  },
}

// ============================================================
// FUNÇÃO DE CÁLCULO
// ============================================================
export function calculateTemperament(answers: TemperamentAnswer[]): TemperamentResult {
  const scores: TemperamentScores = {
    COLERICO: 0,
    SANGUINEO: 0,
    MELANCOLICO: 0,
    FLEUMATICO: 0,
  }

  const optionToType: Record<TemperamentOption, TemperamentType> = {
    A: 'COLERICO',
    C: 'SANGUINEO',
    I: 'MELANCOLICO',
    O: 'FLEUMATICO',
  }

  for (const answer of answers) {
    const type = optionToType[answer.selected]
    if (type) scores[type]++
  }

  const total = answers.length || 25
  const percentages: TemperamentScores = {
    COLERICO: Math.round((scores.COLERICO / total) * 100),
    SANGUINEO: Math.round((scores.SANGUINEO / total) * 100),
    MELANCOLICO: Math.round((scores.MELANCOLICO / total) * 100),
    FLEUMATICO: Math.round((scores.FLEUMATICO / total) * 100),
  }

  // Ordena do maior para o menor
  const ranked = (Object.keys(scores) as TemperamentType[]).sort(
    (a, b) => scores[b] - scores[a]
  )

  const primaryType = ranked[0]
  const secondaryType = ranked[1]

  const profile = TEMPERAMENT_PROFILES[primaryType]
  const secondaryProfile = TEMPERAMENT_PROFILES[secondaryType]

  // Interpretação
  const primaryPct = percentages[primaryType]
  const secondaryPct = percentages[secondaryType]

  let interpretation = ''
  if (primaryPct >= 48) {
    interpretation = `Perfil predominantemente ${profile.name} (${primaryPct}%). Suas respostas indicam forte inclinação para as características deste temperamento.`
  } else if (primaryPct >= 36) {
    interpretation = `Perfil ${profile.name} (${primaryPct}%) com influência significativa do temperamento ${secondaryProfile.name} (${secondaryPct}%). Você combina características de ambos.`
  } else {
    interpretation = `Perfil misto com leve predominância ${profile.name} (${primaryPct}%). Você expressa características distribuídas entre múltiplos temperamentos, o que indica grande flexibilidade comportamental.`
  }

  return {
    scores,
    percentages,
    primaryType,
    secondaryType,
    profile,
    secondaryProfile,
    interpretation,
  }
}

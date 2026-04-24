// ============================================================
// ENGINE — As 5 Linguagens do Amor (Gary Chapman)
// 30 questões | Escolha forçada A/B | 12 pontos por linguagem
// ============================================================

export type LoveLanguage = 'PA' | 'TQ' | 'PR' | 'AS' | 'TF'

export const LOVE_LANGUAGE_LABELS: Record<LoveLanguage, string> = {
  PA: 'Palavras de Afirmação',
  TQ: 'Tempo de Qualidade',
  PR: 'Presentes',
  AS: 'Atos de Serviço',
  TF: 'Toque Físico',
}

export const LOVE_LANGUAGE_EMOJIS: Record<LoveLanguage, string> = {
  PA: '💬',
  TQ: '⏳',
  PR: '🎁',
  AS: '🤝',
  TF: '🫂',
}

export const LOVE_LANGUAGE_COLORS: Record<LoveLanguage, string> = {
  PA: 'bg-violet-500',
  TQ: 'bg-amber-500',
  PR: 'bg-pink-500',
  AS: 'bg-teal-500',
  TF: 'bg-rose-500',
}

export interface LoveLangReport {
  name: string
  tagline: string
  summary: string
  professional: string
  personal: string
  tips: string[]
}

export const LOVE_LANGUAGE_REPORTS: Record<LoveLanguage, LoveLangReport> = {
  PA: {
    name: 'Palavras de Afirmação',
    tagline: 'O poder das palavras que constroem e inspiram',
    summary: 'Você se sente amado(a) e valorizado(a) através de palavras sinceras — elogios, encorajamentos, reconhecimento verbal e expressões genuínas de carinho. Para você, palavras têm peso emocional profundo e constroem (ou destroem) conexões.',
    professional: 'No ambiente de trabalho, feedbacks positivos, reconhecimento verbal de conquistas e mensagens de incentivo são fundamentais para seu engajamento. Um líder que diz "ótimo trabalho" ou "confio em você" faz uma diferença enorme na sua motivação.',
    personal: 'Em relacionamentos, "eu te amo", elogios genuínos, bilhetes de carinho e palavras de apoio nos momentos difíceis preenchem seu tanque emocional. Críticas duras, mesmo construtivas, têm impacto muito maior em você do que nas outras pessoas.',
    tips: [
      'Comunique às pessoas próximas que palavras de afirmação são importantes para você',
      'Valorize bilhetes, mensagens e cartas — guarde aquelas que te tocam',
      'Pratique expressar elogios genuínos — isso fortalece sua conexão com os outros',
      'Aprenda a pedir feedbacks positivos quando precisar de encorajamento',
    ],
  },
  TQ: {
    name: 'Tempo de Qualidade',
    tagline: 'A presença plena como forma máxima de amor',
    summary: 'Você se sente amado(a) quando as pessoas dedicam atenção plena e presença genuína a você — sem celular, sem distrações, olhos nos olhos. O que importa não é a quantidade de tempo, mas a qualidade da presença.',
    professional: 'No trabalho, reuniões one-on-one, conversas significativas e a presença atenta do seu líder ou equipe aumentam seu senso de pertencimento. Ser ouvido com atenção genuína em reuniões é o que mais te faz sentir valorizado(a).',
    personal: 'Em relacionamentos, o que toca seu coração é a pessoa estar completamente presente com você — uma conversa profunda, um jantar sem celular, uma atividade compartilhada com engajamento total. Distração e ausência emocional são o que mais te magoa.',
    tips: [
      'Proponha momentos de qualidade sem telas — isso diz muito mais do que presentes',
      'Mostre presença total em conversas: olhe nos olhos, ouça ativamente, não interrompa',
      'Atividades compartilhadas significativas valem mais do que muito tempo junto sem conexão',
      'Comunique que estar presente e engajado é a forma mais alta de amor para você',
    ],
  },
  PR: {
    name: 'Presentes',
    tagline: 'O símbolo tangível de que você é lembrado(a)',
    summary: 'Você se sente amado(a) quando recebe presentes — não pelo valor material, mas pelo pensamento, cuidado e esforço que eles representam. Um presente é a prova tangível de que a pessoa pensou em você.',
    professional: 'No contexto profissional, reconhecimentos tangíveis — bônus, troféus, lembranças de conquistas ou datas especiais — têm grande impacto na sua satisfação e lealdade. O gesto de ser lembrado pela empresa comunica pertencimento.',
    personal: 'Em relacionamentos, um presente inesperado — mesmo uma simples flor ou um chocolate favorito — diz "eu pensei em você". O que importa é o gesto de lembrar e presentear, não o preço. Datas importantes esquecidas ou chegadas de mãos vazias te magoam mais do que a maioria percebe.',
    tips: [
      'Explique às pessoas próximas que presentes são símbolos de amor — não materialismo',
      'Mantenha mentalmente o que as pessoas que você ama gostam — e surprise-as',
      'Valorize o pensamento por trás do presente, não o valor monetário',
      'Compartilhe datas importantes com pessoas próximas para que elas possam te surpreender',
    ],
  },
  AS: {
    name: 'Atos de Serviço',
    tagline: 'O amor que se mostra em ações concretas',
    summary: 'Você se sente amado(a) quando as pessoas realizam ações concretas para facilitar sua vida, apoiar seus objetivos ou simplesmente fazer algo por você. Para você, o amor verdadeiro é proativo — não precisa esperar ser pedido.',
    professional: 'No trabalho, colegas e líderes que colaboram ativamente, removem obstáculos e apoiam com ações concretas fazem você se sentir profundamente valorizado(a). Palavras bonitas sem ações correspondentes soam vazias para você.',
    personal: 'Em relacionamentos, quando alguém faz algo por você sem precisar pedir — lava a louça, resolve uma tarefa difícil, cuida de você quando está doente — você sente amor genuíno. A negligência com suas necessidades práticas é o que mais te desmotiva.',
    tips: [
      'Expresse claramente o que seria útil — nem todos têm Atos de Serviço como linguagem primária',
      'Valorize e reconheça em voz alta quando alguém faz algo por você, mesmo que pequeno',
      'Pratique atos de serviço pelas pessoas que você ama — é assim que você se expressa melhor',
      'Lembre que "ajudar" não é obrigação — é amor em ação quando vem do coração',
    ],
  },
  TF: {
    name: 'Toque Físico',
    tagline: 'A conexão que se sente na pele',
    summary: 'Você se sente amado(a) e seguro(a) através do contato físico — abraços longos, beijos, carícias, mãos dadas, proximidade corporal. O toque não é apenas prazer; é uma necessidade emocional real e profunda.',
    professional: 'No ambiente profissional, apertos de mão firmes, tapinhas nas costas em momentos de conquista e a proximidade física dos colegas criam seu senso de confiança e conexão. Ambientes muito formais e frios podem te deixar desconectado(a).',
    personal: 'Em relacionamentos íntimos, o contato físico frequente é o principal combustível do seu tanque emocional. Um abraço longo, carícias espontâneas ou simplesmente sentar bem próximo diz mais do que mil palavras para você. Ausência de toque físico te faz sentir distante e não amado(a).',
    tips: [
      'Comunique sua necessidade de contato físico — é uma necessidade legítima, não frescura',
      'O toque não precisa ser íntimo — abraços em amigos e família também te recarregam',
      'Em contextos profissionais, seja intencional: handshakes, high-fives e proximidade física constroem sua confiança',
      'Lembre que pessoas com outras linguagens podem não perceber sua necessidade — comunique',
    ],
  },
}

// ============================================================
// AS 30 QUESTÕES — Escolha forçada A ou B
// Distribuição: 12 ocorrências por linguagem (5×12 = 60 = 30×2)
// ============================================================

export interface LoveLangOption {
  text: string
  language: LoveLanguage
}

export interface LoveLangQuestion {
  id: number
  optionA: LoveLangOption
  optionB: LoveLangOption
}

export const LOVE_LANGUAGES_QUESTIONS: LoveLangQuestion[] = [
  // Q1: PA × TF
  {
    id: 1,
    optionA: { text: 'Gosto de receber mensagens de amor, carinho e afeto.', language: 'PA' },
    optionB: { text: 'Gosto de receber abraços e carícias.', language: 'TF' },
  },
  // Q2: TQ × AS
  {
    id: 2,
    optionA: { text: 'Gosto de passar tempo a sós com alguém especial para mim.', language: 'TQ' },
    optionB: { text: 'Sinto-me amado(a) quando alguém me oferece ajuda prática sem que eu precise pedir.', language: 'AS' },
  },
  // Q3: PR × TQ
  {
    id: 3,
    optionA: { text: 'Gosto quando ganho presentes, mesmo que simples.', language: 'PR' },
    optionB: { text: 'Gosto de fazer viagens ou passeios com as pessoas que amo.', language: 'TQ' },
  },
  // Q4: AS × TF
  {
    id: 4,
    optionA: { text: 'Sinto-me amado(a) quando as pessoas fazem coisas concretas para me ajudar.', language: 'AS' },
    optionB: { text: 'Sinto-me amado(a) quando as pessoas me tocam com carinho.', language: 'TF' },
  },
  // Q5: TF × PR
  {
    id: 5,
    optionA: { text: 'Sinto-me amado(a) quando alguém que amo me envolve com um abraço apertado.', language: 'TF' },
    optionB: { text: 'Sinto-me amado(a) quando recebo um presente de alguém que admiro.', language: 'PR' },
  },
  // Q6: TQ × TF
  {
    id: 6,
    optionA: { text: 'Gosto de sair e fazer coisas juntos com alguém que amo ou admiro.', language: 'TQ' },
    optionB: { text: 'Gosto de ficar de mãos dadas com pessoas especiais para mim.', language: 'TF' },
  },
  // Q7: PR × PA
  {
    id: 7,
    optionA: { text: 'Símbolos visíveis de amor, como presentes, são muito importantes para mim.', language: 'PR' },
    optionB: { text: 'Sinto-me amado(a) quando as pessoas me elogiam e expressam que me amam.', language: 'PA' },
  },
  // Q8: TF × PA
  {
    id: 8,
    optionA: { text: 'Gosto de me sentar perto e de ter proximidade física com as pessoas que aprecio.', language: 'TF' },
    optionB: { text: 'Gosto que me digam que sou atraente, talentoso(a) ou que me admiram.', language: 'PA' },
  },
  // Q9: TQ × PR
  {
    id: 9,
    optionA: { text: 'Gosto de passar tempo de qualidade com quem eu amo — conversando ou fazendo algo juntos.', language: 'TQ' },
    optionB: { text: 'Gosto de receber presentinhos de amigos e pessoas queridas.', language: 'PR' },
  },
  // Q10: PA × AS
  {
    id: 10,
    optionA: { text: 'Gosto de ouvir frases como "tenho orgulho de você" ou "eu te admiro muito".', language: 'PA' },
    optionB: { text: 'Sei que alguém me ama quando me ajuda de maneira proativa, antes mesmo de eu pedir.', language: 'AS' },
  },
  // Q11: TQ × PA
  {
    id: 11,
    optionA: { text: 'Gosto de estar junto e fazer coisas significativas com quem eu amo.', language: 'TQ' },
    optionB: { text: 'Gosto quando me dizem palavras de apoio, incentivo e carinho.', language: 'PA' },
  },
  // Q12: AS × TF
  {
    id: 12,
    optionA: { text: 'O que a pessoa faz por mim me afeta mais profundamente do que o que ela diz.', language: 'AS' },
    optionB: { text: 'Abraços e carícias me fazem sentir participante e verdadeiramente amado(a).', language: 'TF' },
  },
  // Q13: PA × PR
  {
    id: 13,
    optionA: { text: 'Aprecio muito ouvir elogios genuínos com frequência.', language: 'PA' },
    optionB: { text: 'Vários presentes pequenos significam mais para mim do que um único grande presente.', language: 'PR' },
  },
  // Q14: TQ × TF
  {
    id: 14,
    optionA: { text: 'Sinto-me amado(a) quando estamos conversando ou fazendo atividades juntos com total atenção.', language: 'TQ' },
    optionB: { text: 'Sinto-me amado(a) quando recebo massagem, carícias ou toque físico com frequência.', language: 'TF' },
  },
  // Q15: PA × AS
  {
    id: 15,
    optionA: { text: 'Gosto que as pessoas reconheçam e validem verbalmente minhas conquistas e esforços.', language: 'PA' },
    optionB: { text: 'Sei que as pessoas me amam quando fazem algo concreto e útil por mim.', language: 'AS' },
  },
  // Q16: TF × TQ
  {
    id: 16,
    optionA: { text: 'Nunca me canso de beijos e carícias das pessoas que amo.', language: 'TF' },
    optionB: { text: 'Amo quando alguém me ouve com atenção genuína e se interessa de verdade pelo que eu falo e sinto.', language: 'TQ' },
  },
  // Q17: AS × PR
  {
    id: 17,
    optionA: { text: 'Sinto-me amado(a) quando pessoas que gosto me ajudam em trabalhos e projetos.', language: 'AS' },
    optionB: { text: 'Gosto de dar e receber presentes como forma de expressar e sentir amor.', language: 'PR' },
  },
  // Q18: PA × TQ
  {
    id: 18,
    optionA: { text: 'Gosto que as pessoas elogiem minha aparência, minhas ideias ou meus resultados.', language: 'PA' },
    optionB: { text: 'Sinto-me amado(a) quando as pessoas tiram tempo para me entender e respeitam minha forma de ser.', language: 'TQ' },
  },
  // Q19: TF × AS
  {
    id: 19,
    optionA: { text: 'Tenho uma necessidade natural de tocar e ser tocado(a) pelas pessoas que amo.', language: 'TF' },
    optionB: { text: 'Atos de serviço — ajuda prática no dia a dia — fazem com que eu me sinta genuinamente amado(a).', language: 'AS' },
  },
  // Q20: AS × PR
  {
    id: 20,
    optionA: { text: 'Aprecio muito quando as pessoas que amo fazem gestos de serviço e apoio por mim.', language: 'AS' },
    optionB: { text: 'Gosto de presentear e ser presenteado(a) — é uma das minhas formas favoritas de conexão.', language: 'PR' },
  },
  // Q21: TQ × AS
  {
    id: 21,
    optionA: { text: 'Adoro o sentimento de ter a atenção total de alguém que importa para mim.', language: 'TQ' },
    optionB: { text: 'Adoro o sentimento que tenho quando alguém realiza um ato de serviço por mim com cuidado.', language: 'AS' },
  },
  // Q22: PR × PA
  {
    id: 22,
    optionA: { text: 'Sinto-me amado(a) quando alguém comemora meu aniversário com um presente especial.', language: 'PR' },
    optionB: { text: 'Sinto-me amado(a) quando alguém comemora meu aniversário com palavras e mensagens significativas.', language: 'PA' },
  },
  // Q23: PR × AS
  {
    id: 23,
    optionA: { text: 'Quando alguém me dá um presente, sinto que essa pessoa realmente pensa e se importa comigo.', language: 'PR' },
    optionB: { text: 'Sinto-me amado(a) quando alguém me ajuda nas tarefas e responsabilidades do dia a dia.', language: 'AS' },
  },
  // Q24: TQ × PR
  {
    id: 24,
    optionA: { text: 'Aprecio muito quando alguém me ouve com paciência sem me interromper ou olhar o celular.', language: 'TQ' },
    optionB: { text: 'Aprecio quando alguém se lembra de datas especiais para mim com um presente ou gesto.', language: 'PR' },
  },
  // Q25: AS × TQ
  {
    id: 25,
    optionA: { text: 'Gosto de saber que as pessoas que amo estão dispostas a me ajudar quando preciso.', language: 'AS' },
    optionB: { text: 'Gosto de passar tempo significativo com alguém especial — seja viajando, conversando ou simplesmente estando juntos.', language: 'TQ' },
  },
  // Q26: TF × PR
  {
    id: 26,
    optionA: { text: 'Gosto de beijar e ser beijado(a) pelas pessoas da minha intimidade.', language: 'TF' },
    optionB: { text: 'Receber um presente inesperado, sem razão especial, me deixa muito feliz.', language: 'PR' },
  },
  // Q27: PA × TQ
  {
    id: 27,
    optionA: { text: 'Gosto muito que me digam que sou querido(a), amado(a) e importante na vida do outro.', language: 'PA' },
    optionB: { text: 'Gosto quando a pessoa me olha nos olhos com atenção genuína enquanto conversamos.', language: 'TQ' },
  },
  // Q28: PR × TF
  {
    id: 28,
    optionA: { text: 'Presentes de amigos e pessoas queridas são sempre muito especiais e significativos para mim.', language: 'PR' },
    optionB: { text: 'Sinto-me bem e amado(a) quando sou abraçado(a) ou beijado(a) por pessoas queridas.', language: 'TF' },
  },
  // Q29: AS × PA
  {
    id: 29,
    optionA: { text: 'Sinto-me amado(a) quando alguém faz com entusiasmo algo que pedi ou que precisava.', language: 'AS' },
    optionB: { text: 'Sinto-me amado(a) quando as pessoas me dizem o quanto me apreciam e valorizam.', language: 'PA' },
  },
  // Q30: TF × PA
  {
    id: 30,
    optionA: { text: 'Desejo ser tocado(a) com carinho e frequência pelas pessoas que amo.', language: 'TF' },
    optionB: { text: 'Desejo receber elogios, validações e palavras positivas todos os dias.', language: 'PA' },
  },
]

// ============================================================
// CÁLCULO DE RESULTADO
// ============================================================

export interface LoveLangScores {
  PA: number
  TQ: number
  PR: number
  AS: number
  TF: number
}

export interface LoveLangAnswer {
  questionId: number
  selected: 'A' | 'B'
}

export interface LoveLangResult {
  scores: LoveLangScores
  percentages: LoveLangScores
  primaryLanguage: LoveLanguage
  secondaryLanguage: LoveLanguage
  ranking: LoveLanguage[]
  report: LoveLangReport
}

export function calculateLoveLanguages(answers: LoveLangAnswer[]): LoveLangResult {
  const scores: LoveLangScores = { PA: 0, TQ: 0, PR: 0, AS: 0, TF: 0 }

  for (const answer of answers) {
    const question = LOVE_LANGUAGES_QUESTIONS.find((q) => q.id === answer.questionId)
    if (!question) continue
    const lang = answer.selected === 'A' ? question.optionA.language : question.optionB.language
    scores[lang]++
  }

  const total = Object.values(scores).reduce((sum, v) => sum + v, 0) || 1

  const percentages: LoveLangScores = {
    PA: scores.PA / total,
    TQ: scores.TQ / total,
    PR: scores.PR / total,
    AS: scores.AS / total,
    TF: scores.TF / total,
  }

  const ranking = (Object.entries(scores) as [LoveLanguage, number][])
    .sort((a, b) => b[1] - a[1])
    .map(([lang]) => lang)

  const primaryLanguage = ranking[0]
  const secondaryLanguage = ranking[1]

  return {
    scores,
    percentages,
    primaryLanguage,
    secondaryLanguage,
    ranking,
    report: LOVE_LANGUAGE_REPORTS[primaryLanguage],
  }
}

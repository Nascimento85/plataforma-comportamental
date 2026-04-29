// ============================================================
// Engine: Arquétipos Femininos (7 tipos)
// 49 afirmações, 7 por arquétipo, escala 1 a 5
// ============================================================

export type ArchetypeFeminineType =
  | 'MAIDEN' | 'MOTHER' | 'HUNTRESS' | 'SOVEREIGN'
  | 'LOVER' | 'WISE' | 'CRONE'

export interface ArchetypeFeminineQuestion {
  id: number
  text: string
  archetype: ArchetypeFeminineType
}

export const ARCHETYPE_FEMININE_QUESTIONS: ArchetypeFeminineQuestion[] = [
  // ── Donzela (MAIDEN) ────────────────────────────────────
  { id: 1,  text: 'Costumo confiar nas pessoas com facilidade e ver o melhor nelas.', archetype: 'MAIDEN' },
  { id: 2,  text: 'Tenho um lado sonhador que imagina como as coisas poderiam ser ideais.', archetype: 'MAIDEN' },
  { id: 3,  text: 'Fico entusiasmada com novas possibilidades e começos, mesmo sem ter certeza do caminho.', archetype: 'MAIDEN' },
  { id: 4,  text: 'Há uma parte de mim que ainda se encanta com pequenas coisas simples da vida.', archetype: 'MAIDEN' },
  { id: 5,  text: 'Sinto-me mais segura quando tenho apoio e orientação de pessoas em quem confio.', archetype: 'MAIDEN' },
  { id: 6,  text: 'Prefiro evitar conflitos e busco harmonia nos ambientes onde estou.', archetype: 'MAIDEN' },
  { id: 7,  text: 'Às vezes aceito situações que não me fazem bem por não querer decepcionar os outros.', archetype: 'MAIDEN' },

  // ── Mãe (MOTHER) ─────────────────────────────────────────
  { id: 8,  text: 'Sinto-me realizada quando cuido e nutro o crescimento das pessoas ao meu redor.', archetype: 'MOTHER' },
  { id: 9,  text: 'Tenho um instinto natural de proteger e dar suporte a quem está vulnerável.', archetype: 'MOTHER' },
  { id: 10, text: 'Colocar as necessidades dos outros antes das minhas é algo que faço com naturalidade.', archetype: 'MOTHER' },
  { id: 11, text: 'Criar ambientes acolhedores onde as pessoas se sintam seguras é uma prioridade para mim.', archetype: 'MOTHER' },
  { id: 12, text: 'Sinto angústia genuína quando alguém próximo está sofrendo e não consigo ajudar.', archetype: 'MOTHER' },
  { id: 13, text: 'Tenho uma habilidade natural para perceber o que cada pessoa precisa emocionalmente.', archetype: 'MOTHER' },
  { id: 14, text: 'Às vezes me esqueço de cuidar de mim mesma porque estou muito ocupada cuidando dos outros.', archetype: 'MOTHER' },

  // ── Caçadora (HUNTRESS) ─────────────────────────────────
  { id: 15, text: 'Sinto-me mais realizada quando conquisto minhas metas por conta própria.', archetype: 'HUNTRESS' },
  { id: 16, text: 'Independência é uma necessidade fundamental para mim, não um luxo.', archetype: 'HUNTRESS' },
  { id: 17, text: 'Quando defino um objetivo, tenho foco e determinação até alcançá-lo.', archetype: 'HUNTRESS' },
  { id: 18, text: 'Me sinto poderosa quando estou no controle da minha trajetória e das minhas decisões.', archetype: 'HUNTRESS' },
  { id: 19, text: 'Prefiro resolver problemas sozinha antes de pedir ajuda.', archetype: 'HUNTRESS' },
  { id: 20, text: 'Não me esquivo de ambientes competitivos, eles me motivam a dar o meu melhor.', archetype: 'HUNTRESS' },
  { id: 21, text: 'Às vezes minha intensidade e foco podem parecer frios para as pessoas mais emotivas.', archetype: 'HUNTRESS' },

  // ── Soberana (SOVEREIGN) ────────────────────────────────
  { id: 22, text: 'Tenho uma presença natural que faz as pessoas me respeitarem e seguirem.', archetype: 'SOVEREIGN' },
  { id: 23, text: 'Assumir a responsabilidade pelo coletivo é algo que faço com orgulho.', archetype: 'SOVEREIGN' },
  { id: 24, text: 'Tomo decisões difíceis com clareza, mesmo quando isso é desconfortável para todos.', archetype: 'SOVEREIGN' },
  { id: 25, text: 'Construir algo que dure além de mim, um legado, é uma das minhas maiores motivações.', archetype: 'SOVEREIGN' },
  { id: 26, text: 'Confio no meu julgamento mesmo quando os outros discordam.', archetype: 'SOVEREIGN' },
  { id: 27, text: 'Me sinto responsável pelo bem-estar e pelo desenvolvimento das pessoas que lidero.', archetype: 'SOVEREIGN' },
  { id: 28, text: 'Tenho clareza sobre meus valores e raramente os abro mão por pressão social.', archetype: 'SOVEREIGN' },

  // ── Amante (LOVER) ──────────────────────────────────────
  { id: 29, text: 'Busco conexões profundas e intensas, relacionamentos superficiais não me satisfazem.', archetype: 'LOVER' },
  { id: 30, text: 'A beleza, a estética e o prazer são dimensões importantes da minha vida.', archetype: 'LOVER' },
  { id: 31, text: 'Me entrego de forma intensa em tudo que faço, trabalho, relacionamentos e paixões.', archetype: 'LOVER' },
  { id: 32, text: 'Sinto as emoções de forma muito intensa, tanto a alegria quanto a dor.', archetype: 'LOVER' },
  { id: 33, text: 'Ser desejada, valorizada e amada é importante para o meu bem-estar.', archetype: 'LOVER' },
  { id: 34, text: 'Prefiro uma vida intensa e apaixonada do que uma vida segura e sem emoção.', archetype: 'LOVER' },
  { id: 35, text: 'Às vezes me perco em relacionamentos ou projetos por me envolver demais.', archetype: 'LOVER' },

  // ── Sábia (WISE) ─────────────────────────────────────────
  { id: 36, text: 'Analiso situações com profundidade antes de tomar qualquer decisão importante.', archetype: 'WISE' },
  { id: 37, text: 'Pessoas buscam minha perspectiva quando precisam de clareza ou orientação.', archetype: 'WISE' },
  { id: 38, text: 'Valorizo o conhecimento e o aprendizado contínuo acima de muitas outras coisas.', archetype: 'WISE' },
  { id: 39, text: 'Tenho uma capacidade natural de enxergar o que está por trás das situações aparentes.', archetype: 'WISE' },
  { id: 40, text: 'Prefiro a lógica e a análise ao invés de tomar decisões apenas pelo feeling.', archetype: 'WISE' },
  { id: 41, text: 'Sinto-me realizada quando ajudo alguém a ganhar clareza sobre um problema complexo.', archetype: 'WISE' },
  { id: 42, text: 'Às vezes me distancio emocionalmente para manter a objetividade.', archetype: 'WISE' },

  // ── Anciã / Mística (CRONE) ─────────────────────────────
  { id: 43, text: 'Tenho uma conexão profunda com minha intuição e confio nela mesmo sem explicação racional.', archetype: 'CRONE' },
  { id: 44, text: 'Experiências de perda e transformação me tornaram mais forte e profunda.', archetype: 'CRONE' },
  { id: 45, text: 'Tenho um lado espiritual ou filosófico que me conecta a algo maior do que eu mesma.', archetype: 'CRONE' },
  { id: 46, text: 'Sinto-me confortável com os ciclos de fim e começo, com o que precisa ser soltado.', archetype: 'CRONE' },
  { id: 47, text: 'Prefiro a profundidade e a solidão de vez em quando à superficialidade constante.', archetype: 'CRONE' },
  { id: 48, text: 'Tenho uma perspectiva de vida que vai além do imediato, penso em legado e impacto.', archetype: 'CRONE' },
  { id: 49, text: 'Às vezes me sinto incompreendida porque opero em uma frequência que poucos alcançam.', archetype: 'CRONE' },
]

// ── Metadados dos arquétipos femininos ───────────────────────

export interface ArchetypeFeminineProfile {
  name: string
  title: string
  goddess: string
  tagline: string
  essence: string
  keyword: string
  shadow: string
  strengths: string[]
  challenges: string[]
  description: string
  activationTip: string
}

export const ARCHETYPE_FEMININE_PROFILES: Record<ArchetypeFeminineType, ArchetypeFeminineProfile> = {
  MAIDEN: {
    name: 'A Donzela',
    title: 'A Força da Abertura',
    goddess: 'Perséfone',
    tagline: 'Há poder na receptividade e na leveza do início.',
    essence: 'Receptividade e abertura ao novo',
    keyword: 'Receptividade',
    shadow: 'Dependência e passividade excessiva.',
    strengths: [
      'Abertura genuína para novas experiências e possibilidades',
      'Cria conexões com facilidade por sua leveza e entusiasmo',
      'Traz frescor e criatividade para ambientes estagnados',
      'Tem capacidade de recomeçar sem o peso do passado',
    ],
    challenges: [
      'Pode depender excessivamente de aprovação externa',
      'Dificuldade em estabelecer limites e dizer não',
      'Pode aceitar situações ruins por evitar conflito',
      'A ingenuidade pode ser explorada por outros',
    ],
    description: 'A Donzela é a energia do começo, receptiva, aberta e cheia de possibilidades. Não é fraqueza; é a coragem de se permitir ser tocada pelo mundo sem se fechar. Quando integrada, combina essa abertura com limites saudáveis e torna-se irresistivelmente autêntica.',
    activationTip: 'Pratique dizer sim ao que a entusiasma genuinamente, e aprenda a dizer não sem culpa ao que a diminui.',
  },

  MOTHER: {
    name: 'A Mãe',
    title: 'A Força do Cuidado',
    goddess: 'Deméter',
    tagline: 'Nutrir o crescimento alheio é uma forma de poder, não de sacrifício.',
    essence: 'Nutrição e proteção',
    keyword: 'Cuidado',
    shadow: 'Superproteção e anulação de si mesma.',
    strengths: [
      'Cria ambientes de segurança psicológica profunda',
      'Nutre o potencial latente em pessoas e projetos',
      'Liderança servidora que inspira lealdade genuína',
      'Intuição emocional para perceber o que cada um precisa',
    ],
    challenges: [
      'Pode se anular completamente em prol dos outros',
      'Superproteção que impede o crescimento autônomo',
      'Dificuldade em estabelecer limites com quem cuida',
      'Pode criar dependência onde deveria fomentar autonomia',
    ],
    description: 'A Mãe é o arquétipo do cuidado em sua forma mais poderosa. Sua força não está em se sacrificar, está em criar as condições para que outros floresçam. Quando equilibrada, cuida com limites, nutre sem criar dependência e encontra tempo para se renovar.',
    activationTip: 'O cuidado começa em si mesma. Pratique nutrir sua própria essência com a mesma dedicação que oferece ao mundo.',
  },

  HUNTRESS: {
    name: 'A Caçadora',
    title: 'A Força do Foco',
    goddess: 'Ártemis',
    tagline: 'Independência não é solidão, é soberania sobre a própria vida.',
    essence: 'Foco e autonomia',
    keyword: 'Independência',
    shadow: 'Distanciamento emocional e frieza relacional.',
    strengths: [
      'Foco e determinação para alcançar objetivos complexos',
      'Independência que inspira autonomia nas equipes',
      'Não se deixa abalar por pressão social ou aprovação externa',
      'Alta capacidade de execução e orientação a resultados',
    ],
    challenges: [
      'Pode parecer fria ou inacessível emocionalmente',
      'Dificuldade em pedir ajuda ou demonstrar vulnerabilidade',
      'Relacionamentos podem sofrer pela prioridade ao foco',
      'Pode suprimir necessidades emocionais por eficiência',
    ],
    description: 'A Caçadora é a arquétipo da mulher que traça seu próprio caminho sem pedir permissão. Sua força está na clareza de propósito e na recusa de deixar que o olhar alheio defina seus limites. Quando integrada, combina foco com conexão, e torna-se uma líder que inspira sem intimidar.',
    activationTip: 'Permita-se ser vulnerável com pessoas de confiança. A força real inclui a coragem de mostrar o que está por baixo da armadura.',
  },

  SOVEREIGN: {
    name: 'A Soberana',
    title: 'A Força da Liderança',
    goddess: 'Hera',
    tagline: 'Liderar não é controlar, é criar condições para que o melhor emerja.',
    essence: 'Poder e estrutura',
    keyword: 'Liderança',
    shadow: 'Autoritarismo e arrogância de poder.',
    strengths: [
      'Presença natural que inspira respeito e confiança',
      'Visão estratégica e capacidade de tomar decisões difíceis',
      'Pensa em legado e impacto de longo prazo',
      'Assume responsabilidade sem fugir das consequências',
    ],
    challenges: [
      'Pode se tornar autoritária ao sentir seu poder ameaçado',
      'Dificuldade em reconhecer erros publicamente',
      'Tendência ao perfeccionismo que pode paralisar a equipe',
      'Pode confundir controle com liderança',
    ],
    description: 'A Soberana é a arquétipo da mulher que lidera com autoridade legítima, não pelo medo que inspira, mas pela clareza que oferece. Sua força está em saber quem é, o que defende e para onde vai. Quando integrada, lidera com poder e humildade, criando impérios que perduram.',
    activationTip: 'Verdadeira soberania é interna. Pratique liderar a partir dos seus valores, não do seu ego.',
  },

  LOVER: {
    name: 'A Amante',
    title: 'A Força da Paixão',
    goddess: 'Afrodite',
    tagline: 'Tudo que vale a pena merece ser vivido com intensidade e presença.',
    essence: 'Paixão e conexão',
    keyword: 'Conexão',
    shadow: 'Ciúme e busca por validação externa.',
    strengths: [
      'Cria conexões profundas e relações de alta confiança',
      'Traz beleza, significado e paixão a tudo que toca',
      'Emociona e inspira por meio da autenticidade emocional',
      'Alta capacidade de leitura emocional e empatia',
    ],
    challenges: [
      'Pode se perder em relacionamentos por se envolver demais',
      'Dependência emocional e ciúme em relações intensas',
      'Dificuldade em manter equilíbrio e estabelecer limites',
      'Busca de validação pode criar vulnerabilidade',
    ],
    description: 'A Amante vive com o coração aberto ao mundo. Não busca apenas prazer, busca significado através da conexão e da intensidade. Quando integrada, ama com plenitude sem se perder, e cria ao seu redor um campo de magnetismo e presença que transforma tudo que toca.',
    activationTip: 'Cultive amor próprio antes de tudo. A conexão mais transformadora começa com a relação que você tem consigo mesma.',
  },

  WISE: {
    name: 'A Sábia',
    title: 'A Força do Conhecimento',
    goddess: 'Atena',
    tagline: 'O conhecimento sem sabedoria é informação. Com sabedoria, é poder.',
    essence: 'Estratégia e discernimento',
    keyword: 'Conhecimento',
    shadow: 'Isolamento e intelectualismo como defesa.',
    strengths: [
      'Análise profunda que cria vantagem estratégica',
      'Mentoria que transforma vidas com clareza e método',
      'Tomada de decisão baseada em evidência e discernimento',
      'Capacidade de simplificar o complexo para outros compreenderem',
    ],
    challenges: [
      'Pode usar o intelecto como barreira emocional',
      'Tendência ao isolamento para processar em profundidade',
      'Pode parecer fria ou arrogante ao discordar',
      'Paralisia analítica diante de decisões com muitas variáveis',
    ],
    description: 'A Sábia não busca apenas saber, busca compreender para poder transformar. É a conselheira, a estrategista, a mentora. Quando integrada, equilibra razão e intuição, e usa seu conhecimento não para se destacar, mas para elevar os que estão ao seu redor.',
    activationTip: 'Permita que sua sabedoria inclua a sabedoria emocional. O coração sabe o que a mente ainda está processando.',
  },

  CRONE: {
    name: 'A Anciã',
    title: 'A Força da Profundidade',
    goddess: 'Héstia',
    tagline: 'A profundidade vem de quem ousou atravessar o escuro e saiu inteira.',
    essence: 'Sabedoria dos ciclos e desapego',
    keyword: 'Sabedoria',
    shadow: 'Amargura ou isolamento social.',
    strengths: [
      'Profundidade espiritual e filosófica que poucos alcançam',
      'Intuição aguçada por anos de experiência e reflexão',
      'Capacidade de suportar e transformar a dor em sabedoria',
      'Perspectiva de longo prazo que vai além do imediato',
    ],
    challenges: [
      'Pode se isolar por sentir que poucos a compreendem',
      'Experiências difíceis podem criar amargura se não processadas',
      'Dificuldade em se conectar com quem está em fases mais leves',
      'Pode ser percebida como intensa ou soturna',
    ],
    description: 'A Anciã é a arquétipo da mulher que foi transformada pelo fogo da vida, e que emergiu não apenas sobrevivente, mas sábia. Sua força está na profundidade que só quem atravessou seus próprios abismos possui. Quando integrada, é um farol para outras mulheres em jornada.',
    activationTip: 'Compartilhe sua profundidade com quem está pronto para recebê-la. Sua sabedoria não é para ser guardada, é para iluminar o caminho de outras.',
  },
}

// ── Função de cálculo ─────────────────────────────────────────

export interface ArchetypeFeminineAnswer {
  questionId: number
  value: number // 1-5
}

export interface ArchetypeFeminineResult {
  dominant: ArchetypeFeminineType
  secondary: ArchetypeFeminineType
  toActivate: ArchetypeFeminineType // menor pontuação = precisa ativar
  scores: Record<ArchetypeFeminineType, number>
  percentages: Record<ArchetypeFeminineType, number>
  report: ArchetypeFeminineProfile
  secondaryReport: ArchetypeFeminineProfile
  activationReport: ArchetypeFeminineProfile
}

export function calculateArchetypeFeminine(answers: ArchetypeFeminineAnswer[]): ArchetypeFeminineResult {
  const archetypes: ArchetypeFeminineType[] = [
    'MAIDEN', 'MOTHER', 'HUNTRESS', 'SOVEREIGN', 'LOVER', 'WISE', 'CRONE',
  ]
  const scores = {} as Record<ArchetypeFeminineType, number>
  archetypes.forEach((a) => { scores[a] = 0 })

  answers.forEach(({ questionId, value }) => {
    const q = ARCHETYPE_FEMININE_QUESTIONS.find((q) => q.id === questionId)
    if (q) scores[q.archetype] += value
  })

  // Máximo possível: 7 questões × 5 pontos = 35
  const max = 35
  const percentages = {} as Record<ArchetypeFeminineType, number>
  archetypes.forEach((a) => {
    percentages[a] = Math.round((scores[a] / max) * 100)
  })

  const sorted = [...archetypes].sort((a, b) => scores[b] - scores[a])
  const dominant = sorted[0]
  const secondary = sorted[1]
  const toActivate = sorted[sorted.length - 1]

  return {
    dominant,
    secondary,
    toActivate,
    scores,
    percentages,
    report: ARCHETYPE_FEMININE_PROFILES[dominant],
    secondaryReport: ARCHETYPE_FEMININE_PROFILES[secondary],
    activationReport: ARCHETYPE_FEMININE_PROFILES[toActivate],
  }
}

// ============================================================
// VARIAÇÃO V2, Reformulações alternativas (mesmos id/archetype)
// ============================================================
export const ARCHETYPE_FEMININE_QUESTIONS_V2: ArchetypeFeminineQuestion[] = [
  // ── Donzela (MAIDEN) ────────────────────────────────────
  { id: 1,  text: 'Minha postura padrão com pessoas novas é de abertura e confiança, antes de ter razões para ser diferente.', archetype: 'MAIDEN' },
  { id: 2,  text: 'Tenho uma capacidade natural de imaginar como as coisas poderiam ser se fossem da forma mais ideal.', archetype: 'MAIDEN' },
  { id: 3,  text: 'Novas possibilidades e começos me enchem de uma energia que não preciso de nenhum esforço para sentir.', archetype: 'MAIDEN' },
  { id: 4,  text: 'Há em mim uma parte que ainda encontra encanto genuíno nas coisas simples e cotidianas.', archetype: 'MAIDEN' },
  { id: 5,  text: 'Me sinto mais estável e confiante quando tenho pessoas de confiança me apoiando nas decisões importantes.', archetype: 'MAIDEN' },
  { id: 6,  text: 'Quando há tensão ou conflito, meu primeiro instinto é buscar a reconciliação e o caminho da paz.', archetype: 'MAIDEN' },
  { id: 7,  text: 'Às vezes aceito situações que não me fazem bem porque temo o impacto que uma recusa teria nos outros.', archetype: 'MAIDEN' },

  // ── Mãe (MOTHER) ─────────────────────────────────────────
  { id: 8,  text: 'Contribuir para o crescimento e o florescimento de outras pessoas é o que me dá mais sentido.', archetype: 'MOTHER' },
  { id: 9,  text: 'Quando vejo alguém vulnerável ou em dificuldades, algo em mim se ativa automaticamente para ajudar.', archetype: 'MOTHER' },
  { id: 10, text: 'Cuidar dos outros antes de mim não é um sacrifício, é simplesmente como funciono.', archetype: 'MOTHER' },
  { id: 11, text: 'Criar espaços onde as pessoas se sentem seguras para ser quem são é algo que faço com prazer.', archetype: 'MOTHER' },
  { id: 12, text: 'Quando alguém próximo sofre e eu não consigo ajudar, sinto uma angústia genuína e persistente.', archetype: 'MOTHER' },
  { id: 13, text: 'Percebo com facilidade o estado emocional das pessoas ao meu redor, mesmo quando não dizem nada.', archetype: 'MOTHER' },
  { id: 14, text: 'Já me vi negligenciando minhas próprias necessidades porque estava completamente voltada para as dos outros.', archetype: 'MOTHER' },

  // ── Caçadora (HUNTRESS) ─────────────────────────────────
  { id: 15, text: 'Prefiro muito mais conquistar algo por conta própria do que receber de presente ou depender de alguém.', archetype: 'HUNTRESS' },
  { id: 16, text: 'Minha independência não é um luxo, é uma condição essencial para o meu bem-estar.', archetype: 'HUNTRESS' },
  { id: 17, text: 'Quando tenho um objetivo claro, meu foco e minha determinação são quase inabaláveis.', archetype: 'HUNTRESS' },
  { id: 18, text: 'Me sinto mais poderosa quando estou no controle das minhas escolhas e do meu caminho.', archetype: 'HUNTRESS' },
  { id: 19, text: 'Minha tendência é tentar resolver o problema sozinha antes de buscar ajuda nos outros.', archetype: 'HUNTRESS' },
  { id: 20, text: 'Ambientes competitivos não me amedruntam, eles me estimulam a extrair o meu melhor.', archetype: 'HUNTRESS' },
  { id: 21, text: 'Minha intensidade e objetividade às vezes parecem frias para pessoas mais emotivas, e eu entendo isso.', archetype: 'HUNTRESS' },

  // ── Soberana (SOVEREIGN) ────────────────────────────────
  { id: 22, text: 'As pessoas naturalmente me respeitam e me seguem, não preciso exigir essa postura.', archetype: 'SOVEREIGN' },
  { id: 23, text: 'Assumir responsabilidade pelo coletivo e pelo bem comum é algo que faço com orgulho genuíno.', archetype: 'SOVEREIGN' },
  { id: 24, text: 'Quando preciso tomar uma decisão difícil que afeta outros, sou capaz de fazê-lo com clareza.', archetype: 'SOVEREIGN' },
  { id: 25, text: 'Construir um legado que dure além de mim é uma das motivações mais profundas da minha vida.', archetype: 'SOVEREIGN' },
  { id: 26, text: 'Confio no meu julgamento mesmo quando a maioria das pessoas ao redor discorda.', archetype: 'SOVEREIGN' },
  { id: 27, text: 'Sinto responsabilidade real pelo desenvolvimento e pelo bem-estar das pessoas que lidero.', archetype: 'SOVEREIGN' },
  { id: 28, text: 'Quando valores essenciais estão em jogo, não os abro mão por pressão social ou conveniência.', archetype: 'SOVEREIGN' },

  // ── Amante (LOVER) ──────────────────────────────────────
  { id: 29, text: 'Relacionamentos superficiais ou conexões vazias não me satisfazem, preciso de profundidade real.', archetype: 'LOVER' },
  { id: 30, text: 'A beleza, em qualquer forma, tem um poder genuíno sobre mim: me afeta e me inspira.', archetype: 'LOVER' },
  { id: 31, text: 'Me entrego completamente naquilo que amo, sem reservas e sem meias-medidas.', archetype: 'LOVER' },
  { id: 32, text: 'Minhas emoções são intensas, tanto a alegria quanto a tristeza me atravessam de forma profunda.', archetype: 'LOVER' },
  { id: 33, text: 'Ser valorizada, desejada e amada é uma necessidade real para o meu bem-estar emocional.', archetype: 'LOVER' },
  { id: 34, text: 'Uma vida intensa e apaixonada é muito mais atraente para mim do que uma vida segura e sem emoção.', archetype: 'LOVER' },
  { id: 35, text: 'Já me perdi em relacionamentos ou projetos porque me envolvi além do que era saudável.', archetype: 'LOVER' },

  // ── Sábia (WISE) ─────────────────────────────────────────
  { id: 36, text: 'Antes de agir, preciso entender, não me sinto confortável tomando decisões sem análise sólida.', archetype: 'WISE' },
  { id: 37, text: 'As pessoas costumam me procurar quando precisam de clareza, percebem que penso com cuidado.', archetype: 'WISE' },
  { id: 38, text: 'Aprender e crescer intelectualmente é uma necessidade, não apenas uma preferência.', archetype: 'WISE' },
  { id: 39, text: 'Tenho facilidade de perceber o que está por trás de situações que outros processam de forma superficial.', archetype: 'WISE' },
  { id: 40, text: 'Prefiro análise e raciocínio lógico a tomar decisões puramente pelo feeling.', archetype: 'WISE' },
  { id: 41, text: 'Ajudar alguém a ganhar clareza sobre algo complexo é uma das formas mais profundas de realização que conheço.', archetype: 'WISE' },
  { id: 42, text: 'Para manter objetividade, às vezes preciso me distanciar emocionalmente de situações que me afetam.', archetype: 'WISE' },

  // ── Anciã / Mística (CRONE) ─────────────────────────────
  { id: 43, text: 'Confio na minha intuição com segurança, mesmo quando não consigo explicar racionalmente o que sinto.', archetype: 'CRONE' },
  { id: 44, text: 'Perdas e transformações difíceis me aprofundaram de formas que experiências fáceis nunca poderiam.', archetype: 'CRONE' },
  { id: 45, text: 'Há em mim uma dimensão espiritual ou filosófica que me conecta a algo maior do que minha vida cotidiana.', archetype: 'CRONE' },
  { id: 46, text: 'Os finais e os começos me parecem naturais, sei soltar o que precisa ser liberado.', archetype: 'CRONE' },
  { id: 47, text: 'De vez em quando, a solitude e a profundidade valem muito mais para mim do que qualquer companhia superficial.', archetype: 'CRONE' },
  { id: 48, text: 'Penso em impacto de longo prazo, o legado que quero deixar é mais importante do que o reconhecimento imediato.', archetype: 'CRONE' },
  { id: 49, text: 'Às vezes me sinto operando em uma frequência de percepção que poucas pessoas ao meu redor conseguem acompanhar.', archetype: 'CRONE' },
]

// ============================================================
// VARIAÇÃO V3, Cenários situacionais (mesmos id/archetype)
// ============================================================
export const ARCHETYPE_FEMININE_QUESTIONS_V3: ArchetypeFeminineQuestion[] = [
  // ── Donzela (MAIDEN) ────────────────────────────────────
  { id: 1,  text: 'Ao conhecer alguém novo, você naturalmente parte do pressuposto de que a pessoa tem boas intenções.', archetype: 'MAIDEN' },
  { id: 2,  text: 'Em situações cotidianas, você frequentemente imagina versões mais belas ou perfeitas das coisas.', archetype: 'MAIDEN' },
  { id: 3,  text: 'Quando surge uma nova oportunidade ou começo, você sente uma animação imediata, mesmo sem ter clareza total.', archetype: 'MAIDEN' },
  { id: 4,  text: 'Pequenos detalhes do dia a dia, uma flor, um pôr do sol, um gesto gentil, ainda te encantam genuinamente.', archetype: 'MAIDEN' },
  { id: 5,  text: 'Quando enfrenta decisões difíceis, você se sente mais segura ao ter o apoio de pessoas em quem confia.', archetype: 'MAIDEN' },
  { id: 6,  text: 'Em situações de conflito, você instintivamente busca o caminho que preserve a harmonia e o relacionamento.', archetype: 'MAIDEN' },
  { id: 7,  text: 'Você já ficou em situações desconfortáveis mais tempo do que devia porque não queria decepcionar alguém.', archetype: 'MAIDEN' },

  // ── Mãe (MOTHER) ─────────────────────────────────────────
  { id: 8,  text: 'Quando vê alguém crescendo e florescendo graças ao seu suporte, você sente uma realização profunda.', archetype: 'MOTHER' },
  { id: 9,  text: 'Em qualquer grupo, você tende a ser a primeira a perceber quem está precisando de atenção ou apoio.', archetype: 'MOTHER' },
  { id: 10, text: 'Colocar o bem-estar dos outros à frente do seu é algo que você faz naturalmente, quase sem perceber.', archetype: 'MOTHER' },
  { id: 11, text: 'Você tende a criar, em qualquer ambiente que frequenta, uma atmosfera de acolhimento e segurança.', archetype: 'MOTHER' },
  { id: 12, text: 'Quando alguém que você se importa sofre e você não consegue ajudar, sente uma dor genuína.', archetype: 'MOTHER' },
  { id: 13, text: 'Você consegue perceber o estado emocional das pessoas ao redor mesmo quando elas não dizem nada.', archetype: 'MOTHER' },
  { id: 14, text: 'Você já chegou ao limite do esgotamento porque estava tão ocupada cuidando dos outros que esqueceu de você.', archetype: 'MOTHER' },

  // ── Caçadora (HUNTRESS) ─────────────────────────────────
  { id: 15, text: 'Quando conquista algo por conta própria, sem ajuda, a satisfação é muito maior do que quando recebe.', archetype: 'HUNTRESS' },
  { id: 16, text: 'Quando sua independência está sendo limitada de alguma forma, você sente uma necessidade urgente de recuperá-la.', archetype: 'HUNTRESS' },
  { id: 17, text: 'Quando define uma meta, dificilmente para antes de alcançá-la, sua determinação é uma das suas marcas.', archetype: 'HUNTRESS' },
  { id: 18, text: 'Você se sente mais em si mesma quando está tomando suas próprias decisões e traçando seu próprio caminho.', archetype: 'HUNTRESS' },
  { id: 19, text: 'Quando enfrenta um problema, sua tendência é tentar resolvê-lo sozinha antes de buscar ajuda.', archetype: 'HUNTRESS' },
  { id: 20, text: 'Ambientes competitivos não te intimidam, você tende a se motivar ainda mais quando há uma disputa real.', archetype: 'HUNTRESS' },
  { id: 21, text: 'Você já recebeu o feedback de que é intensa ou difícil de se aproximar, e entende de onde isso vem.', archetype: 'HUNTRESS' },

  // ── Soberana (SOVEREIGN) ────────────────────────────────
  { id: 22, text: 'Quando entra num novo ambiente, as pessoas tendem a te enxergar como alguém de autoridade naturalmente.', archetype: 'SOVEREIGN' },
  { id: 23, text: 'Você sente responsabilidade genuína pelo bem do coletivo, não apenas pelo seu próprio sucesso.', archetype: 'SOVEREIGN' },
  { id: 24, text: 'Em momentos de crise que exigem decisões difíceis, você consegue agir com clareza mesmo sob pressão.', archetype: 'SOVEREIGN' },
  { id: 25, text: 'O que te motiva a longo prazo é construir algo que dure e que impacte além da sua própria vida.', archetype: 'SOVEREIGN' },
  { id: 26, text: 'Quando a maioria discorda de você mas você sabe que está certa, mantém sua posição com serenidade.', archetype: 'SOVEREIGN' },
  { id: 27, text: 'Você assume responsabilidade pelo desenvolvimento das pessoas que estão sob sua liderança.', archetype: 'SOVEREIGN' },
  { id: 28, text: 'Quando seus valores estão em jogo, você não os negocia, mesmo que isso traga conflito.', archetype: 'SOVEREIGN' },

  // ── Amante (LOVER) ──────────────────────────────────────
  { id: 29, text: 'Quando percebe que um relacionamento ou conexão é superficial, você perde o interesse rapidamente.', archetype: 'LOVER' },
  { id: 30, text: 'Ambientes com beleza estética, seja arte, música, natureza ou design, te afetam de forma real e física.', archetype: 'LOVER' },
  { id: 31, text: 'Quando você decide se envolver em algo, faz isso com toda a sua energia, sem meias-medidas.', archetype: 'LOVER' },
  { id: 32, text: 'Você sente emoções com uma intensidade que nem sempre as pessoas ao seu redor conseguem acompanhar.', archetype: 'LOVER' },
  { id: 33, text: 'Sentir-se desejada e valorizada pelas pessoas que importam para você é algo essencial ao seu bem-estar.', archetype: 'LOVER' },
  { id: 34, text: 'Uma vida com paixão, beleza e profundidade é muito mais atraente para você do que estabilidade sem emoção.', archetype: 'LOVER' },
  { id: 35, text: 'Você já se envolveu em algo com tal intensidade que perdeu a perspectiva, e só percebeu depois.', archetype: 'LOVER' },

  // ── Sábia (WISE) ─────────────────────────────────────────
  { id: 36, text: 'Antes de tomar uma decisão importante, você naturalmente analisa todos os ângulos e implicações.', archetype: 'WISE' },
  { id: 37, text: 'Quando alguém precisa de clareza numa situação complexa, tende a procurar você.', archetype: 'WISE' },
  { id: 38, text: 'Aprender algo novo e complexo é uma das experiências que mais te energiza.', archetype: 'WISE' },
  { id: 39, text: 'Você frequentemente percebe o que está por trás de situações que outros processam de forma superficial.', archetype: 'WISE' },
  { id: 40, text: 'Em decisões importantes, você confia mais na análise do que no instinto ou sentimento.', archetype: 'WISE' },
  { id: 41, text: 'Quando ajuda alguém a enxergar algo com clareza que estava confuso antes, sente uma realização profunda.', archetype: 'WISE' },
  { id: 42, text: 'Para pensar com clareza em situações que te afetam emocionalmente, você precisa de algum distanciamento.', archetype: 'WISE' },

  // ── Anciã / Mística (CRONE) ─────────────────────────────
  { id: 43, text: 'Quando sua intuição aponta algo fortemente, você a segue, mesmo sem conseguir explicar o motivo.', archetype: 'CRONE' },
  { id: 44, text: 'Olhando para as fases mais difíceis da sua vida, você percebe que elas te transformaram de forma profunda.', archetype: 'CRONE' },
  { id: 45, text: 'Você tem uma vida interior rica e uma dimensão espiritual ou filosófica que te ancora nos momentos difíceis.', archetype: 'CRONE' },
  { id: 46, text: 'Você consegue encerrar ciclos com mais naturalidade do que a maioria, sabe quando é hora de soltar.', archetype: 'CRONE' },
  { id: 47, text: 'Há momentos em que prefere a profundidade da solidão criativa à companhia de conversas superficiais.', archetype: 'CRONE' },
  { id: 48, text: 'Você pensa sobre legado com frequência, o impacto que suas ações terão além do seu tempo.', archetype: 'CRONE' },
  { id: 49, text: 'Você já teve a experiência de perceber algo com clareza que o ambiente ao seu redor ainda não conseguia ver.', archetype: 'CRONE' },
]

// ============================================================
// LOOKUP: versão → conjunto de questões
// ============================================================
export const ARCHETYPE_FEMININE_QUESTION_SETS: Record<1 | 2 | 3, ArchetypeFeminineQuestion[]> = {
  1: ARCHETYPE_FEMININE_QUESTIONS,
  2: ARCHETYPE_FEMININE_QUESTIONS_V2,
  3: ARCHETYPE_FEMININE_QUESTIONS_V3,
}

/** Deriva a versão a partir do token UUID */
export function getArchetypeFeminineVersion(token: string): 1 | 2 | 3 {
  const sum = token.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)
  return ((sum % 3) + 1) as 1 | 2 | 3
}

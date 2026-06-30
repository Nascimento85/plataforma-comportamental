// ============================================================
// AVALIAÇÃO 360° — conteúdo + motor de agregação
// Multiavaliador: a pessoa é avaliada por si (AUTO), pelo GESTOR,
// por PARES e por SUBORDINADOS. Escala Likert 1-5 de frequência,
// em comportamentos observáveis. 6 competências × 4 itens = 24
// perguntas + 2 perguntas abertas (continuar / melhorar).
//
// Anonimato: o convite (Avaliacao360Convite) guarda identidade e
// papel; a resposta (Avaliacao360Resposta) guarda só o papel e os
// dados — sem vínculo de volta. Pares e subordinados só aparecem
// agregados (nunca individualmente) para preservar o anonimato.
// ============================================================

export type Rater360 = 'AUTO' | 'GESTOR' | 'PAR' | 'SUBORDINADO'

export type Pilar360 =
  | 'COMUNICACAO'
  | 'LIDERANCA'
  | 'RESOLUCAO'
  | 'EXECUCAO'
  | 'COLABORACAO'
  | 'ADAPTABILIDADE'

export interface Pergunta360 {
  id:    number
  pilar: Pilar360
  // Afirmativa comportamental. {pessoa} é substituído por "Você" (AUTO)
  // ou pelo primeiro nome do avaliado (demais papéis).
  texto: string
}

export const PILAR_360_LABELS: Record<Pilar360, string> = {
  COMUNICACAO:    'Comunicação e Empatia',
  LIDERANCA:      'Liderança e Influência',
  RESOLUCAO:      'Resolução de Problemas e Decisão',
  EXECUCAO:       'Execução e Foco em Resultados',
  COLABORACAO:    'Colaboração e Trabalho em Equipe',
  ADAPTABILIDADE: 'Adaptabilidade e Autodesenvolvimento',
}

export const PILAR_360_SHORT: Record<Pilar360, string> = {
  COMUNICACAO:    'Comunicação',
  LIDERANCA:      'Liderança',
  RESOLUCAO:      'Decisão',
  EXECUCAO:       'Execução',
  COLABORACAO:    'Colaboração',
  ADAPTABILIDADE: 'Adaptabilidade',
}

export const PILAR_360_DESC: Record<Pilar360, string> = {
  COMUNICACAO:    'Clareza, escuta ativa, empatia e qualidade do feedback.',
  LIDERANCA:      'Capacidade de guiar, motivar, delegar e reconhecer.',
  RESOLUCAO:      'Foco em soluções e equilíbrio emocional para decidir.',
  EXECUCAO:       'Cumprimento de acordos, prioridade e senso de urgência.',
  COLABORACAO:    'Trabalho em equipe, abertura e construção de confiança.',
  ADAPTABILIDADE: 'Flexibilidade, aprendizado contínuo e abertura a feedback.',
}

export const PILAR_360_ORDER: Pilar360[] = [
  'COMUNICACAO', 'LIDERANCA', 'RESOLUCAO', 'EXECUCAO', 'COLABORACAO', 'ADAPTABILIDADE',
]

// ── Escala (1-5, frequência) ──────────────────────────────
export const ESCALA_360 = [
  { value: 1, label: 'Nunca ou raras vezes demonstra' },
  { value: 2, label: 'Demonstra menos do que o necessário' },
  { value: 3, label: 'Demonstra com a frequência esperada (atende)' },
  { value: 4, label: 'Supera as expectativas' },
  { value: 5, label: 'É uma referência constante neste comportamento' },
]

// ── Banco de perguntas (24 = 4 por competência) ───────────
// {pessoa} -> "Você" (auto) | primeiro nome (demais).
export const PERGUNTAS_360: Pergunta360[] = [
  // 1) Comunicação e Empatia
  { id: 1, pilar: 'COMUNICACAO', texto: '{pessoa} comunica ideias e expectativas com clareza, de forma que as pessoas entendem sem ambiguidade.' },
  { id: 2, pilar: 'COMUNICACAO', texto: '{pessoa} escuta com atenção e deixa a pessoa terminar antes de responder.' },
  { id: 3, pilar: 'COMUNICACAO', texto: '{pessoa} dá feedback de maneira específica, respeitosa e que ajuda a pessoa a evoluir.' },
  { id: 4, pilar: 'COMUNICACAO', texto: '{pessoa} demonstra empatia e considera o ponto de vista e o momento do outro.' },

  // 2) Liderança e Influência
  { id: 5, pilar: 'LIDERANCA', texto: '{pessoa} inspira e motiva as pessoas ao redor, gerando engajamento genuíno.' },
  { id: 6, pilar: 'LIDERANCA', texto: '{pessoa} delega e confia responsabilidades, descentralizando em vez de centralizar tudo.' },
  { id: 7, pilar: 'LIDERANCA', texto: '{pessoa} dá o exemplo, agindo de forma coerente com aquilo que cobra dos outros.' },
  { id: 8, pilar: 'LIDERANCA', texto: '{pessoa} reconhece e valoriza publicamente as contribuições das pessoas.' },

  // 3) Resolução de Problemas e Decisão
  { id: 9,  pilar: 'RESOLUCAO', texto: '{pessoa} mantém o foco em soluções diante de problemas, em vez de se prender à culpa.' },
  { id: 10, pilar: 'RESOLUCAO', texto: '{pessoa} analisa as situações com clareza e busca dados antes de decidir.' },
  { id: 11, pilar: 'RESOLUCAO', texto: '{pessoa} mantém o equilíbrio emocional e a serenidade mesmo sob pressão.' },
  { id: 12, pilar: 'RESOLUCAO', texto: '{pessoa} assume decisões difíceis no tempo certo, sem adiar desnecessariamente.' },

  // 4) Execução e Foco em Resultados
  { id: 13, pilar: 'EXECUCAO', texto: '{pessoa} cumpre os acordos e prazos que assume, com confiabilidade.' },
  { id: 14, pilar: 'EXECUCAO', texto: '{pessoa} demonstra senso de urgência e foco em entregar resultados que importam.' },
  { id: 15, pilar: 'EXECUCAO', texto: '{pessoa} organiza o trabalho e prioriza bem o que é mais importante.' },
  { id: 16, pilar: 'EXECUCAO', texto: '{pessoa} mantém um padrão alto de qualidade e capricho nas entregas.' },

  // 5) Colaboração e Trabalho em Equipe
  { id: 17, pilar: 'COLABORACAO', texto: '{pessoa} colabora com outras pessoas e áreas, em vez de agir de forma isolada.' },
  { id: 18, pilar: 'COLABORACAO', texto: '{pessoa} compartilha informação e conhecimento de forma aberta e generosa.' },
  { id: 19, pilar: 'COLABORACAO', texto: '{pessoa} lida com divergências de forma construtiva, sem levar para o lado pessoal.' },
  { id: 20, pilar: 'COLABORACAO', texto: '{pessoa} contribui para um clima de confiança e respeito no time.' },

  // 6) Adaptabilidade e Autodesenvolvimento
  { id: 21, pilar: 'ADAPTABILIDADE', texto: '{pessoa} adapta-se bem a mudanças, imprevistos e novas prioridades.' },
  { id: 22, pilar: 'ADAPTABILIDADE', texto: '{pessoa} busca aprender e se desenvolver continuamente.' },
  { id: 23, pilar: 'ADAPTABILIDADE', texto: '{pessoa} recebe feedback e críticas com abertura, sem se defender na hora.' },
  { id: 24, pilar: 'ADAPTABILIDADE', texto: '{pessoa} reconhece os próprios erros e age para corrigi-los.' },
]

// ── Perguntas abertas ─────────────────────────────────────
export const PERGUNTAS_ABERTAS_360 = {
  continuar: 'O que esta pessoa deve CONTINUAR fazendo? (pontos fortes que fazem diferença)',
  melhorar:  'O que esta pessoa deve COMEÇAR ou MELHORAR a fazer? (oportunidades de desenvolvimento)',
}
export const PERGUNTAS_ABERTAS_360_AUTO = {
  continuar: 'O que você deve CONTINUAR fazendo? (seus pontos fortes)',
  melhorar:  'O que você deve COMEÇAR ou MELHORAR a fazer? (suas oportunidades de desenvolvimento)',
}

// ── Papéis (rótulos + microtexto de instrução por perspectiva) ──
export const RATER_360_LABELS: Record<Rater360, string> = {
  AUTO:        'Autoavaliação',
  GESTOR:      'Gestor(a)',
  PAR:         'Par (colega)',
  SUBORDINADO: 'Liderado(a)',
}

export const RATER_360_LABELS_PLURAL: Record<Rater360, string> = {
  AUTO:        'Autoavaliação',
  GESTOR:      'Gestor',
  PAR:         'Pares',
  SUBORDINADO: 'Liderados',
}

export const RATER_360_INSTRUCOES: Record<Rater360, string> = {
  AUTO:        'Avalie a si mesmo(a) com honestidade. Pense em como você realmente age no dia a dia, não em como gostaria de agir.',
  GESTOR:      'Você está avaliando alguém que lidera diretamente. Pense em comportamentos concretos que observou ao longo do tempo.',
  PAR:         'Você está avaliando um colega de mesmo nível. Sua percepção é confidencial e aparece apenas de forma agregada.',
  SUBORDINADO: 'Você está avaliando quem lidera você. Sua resposta é anônima e se soma à dos demais liderados.',
}

export const RATER_360_CORES: Record<Rater360, string> = {
  AUTO:        '#c9a84c', // ouro
  GESTOR:      '#6f86c9', // azul
  PAR:         '#86b58a', // verde
  SUBORDINADO: '#cf8b83', // terracota
}

// ============================================================
// MOTOR DE CÁLCULO
// ============================================================

export interface Resposta360Individual {
  scoreFinal: number                      // média geral 1-5 (1 casa)
  pilares:    Record<Pilar360, number>    // média por pilar 1-5 (1 casa)
}

function r1(n: number): number {
  return Math.round(n * 10) / 10
}

function emptyPilarAcc(): Record<Pilar360, number[]> {
  const acc = {} as Record<Pilar360, number[]>
  for (const p of PILAR_360_ORDER) acc[p] = []
  return acc
}

/**
 * Calcula o score de UMA resposta (de um avaliador).
 * Valida que as 24 perguntas vieram com valor 1..5.
 */
export function calcResposta360(respostas: Record<string, number>): Resposta360Individual | null {
  const acc = emptyPilarAcc()
  let total = 0
  let count = 0

  for (const q of PERGUNTAS_360) {
    const v = respostas[String(q.id)]
    if (typeof v !== 'number' || v < 1 || v > 5) return null
    acc[q.pilar].push(v)
    total += v
    count += 1
  }
  if (count !== PERGUNTAS_360.length) return null

  const pilares = {} as Record<Pilar360, number>
  for (const p of PILAR_360_ORDER) {
    const arr = acc[p]
    pilares[p] = arr.length ? r1(arr.reduce((a, b) => a + b, 0) / arr.length) : 0
  }

  return { scoreFinal: r1(total / count), pilares }
}

// ── Agregação multiavaliador ──────────────────────────────

export interface RespostaArmazenada360 {
  role:           Rater360
  pilares:        Record<Pilar360, number>
  scoreFinal:     number
  continuarTexto?: string | null
  melhorarTexto?:  string | null
}

export interface RadarPonto360 {
  pilar:  Pilar360
  label:  string
  short:  string
  auto:   number | null   // 1-5 (null se não houve autoavaliação)
  outros: number | null   // média de gestor+par+subordinado (null se ninguém)
  gap:    number | null   // auto - outros (positivo = você se vê melhor que os outros)
}

export interface PorPapel360 {
  role:    Rater360
  label:   string
  n:       number
  score:   number | null
  pilares: Record<Pilar360, number> | null
}

export interface Resultado360 {
  totalRespostas: number
  countPorPapel:  Record<Rater360, number>
  porPapel:       PorPapel360[]
  radar:          RadarPonto360[]
  scoreAuto:      number | null
  scoreOutros:    number | null
  pontosCegos:    Pilar360[]   // auto - outros >= 1.0 (você se vê bem melhor)
  forcasOcultas:  Pilar360[]   // outros - auto >= 1.0 (os outros te veem melhor)
  feedbackContinuar: string[]
  feedbackMelhorar:  string[]
}

function mediaPilares(lista: Array<Record<Pilar360, number>>): Record<Pilar360, number> | null {
  if (!lista.length) return null
  const out = {} as Record<Pilar360, number>
  for (const p of PILAR_360_ORDER) {
    out[p] = r1(lista.reduce((a, r) => a + (r[p] ?? 0), 0) / lista.length)
  }
  return out
}

/**
 * Agrega todas as respostas de um ciclo 360 de uma pessoa.
 * "outros" = média combinada de GESTOR + PAR + SUBORDINADO.
 */
export function agregar360(respostas: RespostaArmazenada360[]): Resultado360 {
  const countPorPapel: Record<Rater360, number> = { AUTO: 0, GESTOR: 0, PAR: 0, SUBORDINADO: 0 }
  for (const r of respostas) countPorPapel[r.role] += 1

  const papeis: Rater360[] = ['AUTO', 'GESTOR', 'PAR', 'SUBORDINADO']
  const porPapel: PorPapel360[] = papeis.map((role) => {
    const doPapel = respostas.filter((r) => r.role === role)
    const pilares = mediaPilares(doPapel.map((r) => r.pilares))
    const score = doPapel.length
      ? r1(doPapel.reduce((a, r) => a + r.scoreFinal, 0) / doPapel.length)
      : null
    return { role, label: RATER_360_LABELS_PLURAL[role], n: doPapel.length, score, pilares }
  })

  const autoResp = respostas.filter((r) => r.role === 'AUTO')
  const outrasResp = respostas.filter((r) => r.role !== 'AUTO')

  const pilaresAuto = mediaPilares(autoResp.map((r) => r.pilares))
  const pilaresOutros = mediaPilares(outrasResp.map((r) => r.pilares))

  const radar: RadarPonto360[] = PILAR_360_ORDER.map((p) => {
    const auto = pilaresAuto ? pilaresAuto[p] : null
    const outros = pilaresOutros ? pilaresOutros[p] : null
    const gap = auto != null && outros != null ? r1(auto - outros) : null
    return { pilar: p, label: PILAR_360_LABELS[p], short: PILAR_360_SHORT[p], auto, outros, gap }
  })

  const pontosCegos = radar.filter((r) => r.gap != null && r.gap >= 1.0).map((r) => r.pilar)
  const forcasOcultas = radar.filter((r) => r.gap != null && r.gap <= -1.0).map((r) => r.pilar)

  const scoreAuto = autoResp.length ? r1(autoResp.reduce((a, r) => a + r.scoreFinal, 0) / autoResp.length) : null
  const scoreOutros = outrasResp.length ? r1(outrasResp.reduce((a, r) => a + r.scoreFinal, 0) / outrasResp.length) : null

  const feedbackContinuar = respostas.map((r) => (r.continuarTexto ?? '').trim()).filter((t) => t.length > 0)
  const feedbackMelhorar = respostas.map((r) => (r.melhorarTexto ?? '').trim()).filter((t) => t.length > 0)

  return {
    totalRespostas: respostas.length,
    countPorPapel,
    porPapel,
    radar,
    scoreAuto,
    scoreOutros,
    pontosCegos,
    forcasOcultas,
    feedbackContinuar,
    feedbackMelhorar,
  }
}

// Substitui {pessoa} no enunciado conforme o papel.
export function textoPergunta360(texto: string, role: Rater360, primeiroNome: string): string {
  const sujeito = role === 'AUTO' ? 'Você' : (primeiroNome || 'Esta pessoa')
  return texto.replace('{pessoa}', sujeito)
}

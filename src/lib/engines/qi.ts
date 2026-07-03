// ============================================================
// ENGINE QI / RACIOCÍNIO LÓGICO — teste PONTUADO (certo/errado)
// Sessão: 20 questões (5 por pilar), sorteadas do banco de 28
// com seed determinístico por token.
// Resposta do usuário: { questionId, value } onde value = índice
// da alternativa escolhida (1..4). Compara com `correta`.
// ============================================================

import {
  QI_QUESTIONS,
  getQiQuestionsByPilar,
  QI_PILARES,
  QI_PILAR_LABELS,
  type QiPilar,
  type QiQuestion,
} from '@/content/qi/questions'
import {
  QI_FAIXAS,
  QI_PILAR_DESC,
  type QiFaixa,
} from '@/content/qi/reports'

export type { QiPilar, QiQuestion }
export { QI_QUESTIONS, QI_PILAR_LABELS }

const POR_PILAR = 5 // questões por pilar na sessão (banco tem 7)

// ── Tipos de resposta e resultado ─────────────────────────
export interface QiAnswer {
  questionId: number
  value:      number // 1..4 — índice da alternativa escolhida
}

export interface QiPilarResult {
  pilar:    QiPilar
  label:    string
  corretas: number
  total:    number
  score:    number // 0..100
}

export interface QiRevisaoItem {
  id:           number
  pilar:        QiPilar
  pilarLabel:   string
  enunciado:    string
  alternativas: string[]
  escolhida:    number  // 1..4 (0 se não respondeu)
  correta:      number  // 1..4
  acertou:      boolean
  explicacao:   string
}

export interface QiResult {
  totalCorretas: number
  totalQuestoes: number
  scoreGeral:    number   // 0..100
  faixa:         QiFaixa
  faixaLabel:    string
  predominant:   string   // = faixaLabel (consumido pela rota de results)
  vistaGeral:    string
  recomendacoes: string[]
  pilarForte:    QiPilar
  pilarFraco:    QiPilar
  pilarForteTexto: string
  pilarFracoTexto: string
  porPilar:      QiPilarResult[]
  revisao:       QiRevisaoItem[]
  limites:       string[]
}

// ── Sorteio determinístico (FNV + LCG), igual ao padrão VAC ──
function fnvHash(seed: string): number {
  let hash = 2166136261
  for (let i = 0; i < seed.length; i++) {
    hash ^= seed.charCodeAt(i)
    hash = Math.imul(hash, 16777619)
  }
  return hash >>> 0
}

function lcg(state: number): { next: () => number } {
  let s = state
  return {
    next() {
      s = (s * 1103515245 + 12345) & 0x7fffffff
      return s
    },
  }
}

function pickFromPilar(pilar: QiPilar, seed: string, n: number): QiQuestion[] {
  const pool = getQiQuestionsByPilar(pilar)
  const rng = lcg(fnvHash(`${seed}:${pilar}`))
  const shuffled = [...pool]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = rng.next() % (i + 1)
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled.slice(0, n)
}

/**
 * 20 questões (5 por pilar) intercaladas, com seed = token.
 */
export function getQiSessionQuestions(seed: string): QiQuestion[] {
  const blocks = QI_PILARES.map((p) => pickFromPilar(p, seed, POR_PILAR))

  // Intercala os pilares para distribuir ao longo do quiz
  const interleaved: QiQuestion[] = []
  for (let i = 0; i < POR_PILAR; i++) {
    for (const block of blocks) {
      if (block[i]) interleaved.push(block[i])
    }
  }

  // Segundo passe de embaralhamento global (mantém determinismo)
  const rng = lcg(fnvHash(`${seed}:final`))
  for (let i = interleaved.length - 1; i > 0; i--) {
    const j = rng.next() % (i + 1)
    ;[interleaved[i], interleaved[j]] = [interleaved[j], interleaved[i]]
  }

  return interleaved
}

function faixaFromScore(score: number): QiFaixa {
  if (score < 40) return 'abaixo'
  if (score < 60) return 'mediano'
  if (score < 80) return 'acima'
  return 'excepcional'
}

// ── Cálculo do resultado ──────────────────────────────────
export function calculateQi(answers: QiAnswer[]): QiResult {
  const byId = new Map<number, QiQuestion>(QI_QUESTIONS.map((q) => [q.id, q]))
  const answerById = new Map<number, number>(answers.map((a) => [a.questionId, Math.round(a.value)]))

  // Acumuladores por pilar (só conta o que foi respondido nesta sessão)
  const acc: Record<QiPilar, { corretas: number; total: number }> = {
    LOGICO:     { corretas: 0, total: 0 },
    ANALITICO:  { corretas: 0, total: 0 },
    VERBAL:     { corretas: 0, total: 0 },
    SEQUENCIAS: { corretas: 0, total: 0 },
  }

  const revisao: QiRevisaoItem[] = []
  let totalCorretas = 0
  let totalQuestoes = 0

  for (const ans of answers) {
    const q = byId.get(ans.questionId)
    if (!q) continue
    const escolhida = Math.round(ans.value)
    const acertou = escolhida === q.correta
    acc[q.pilar].total += 1
    if (acertou) acc[q.pilar].corretas += 1
    totalQuestoes += 1
    if (acertou) totalCorretas += 1

    revisao.push({
      id:           q.id,
      pilar:        q.pilar,
      pilarLabel:   QI_PILAR_LABELS[q.pilar],
      enunciado:    q.enunciado,
      alternativas: q.alternativas,
      escolhida,
      correta:      q.correta,
      acertou,
      explicacao:   q.explicacao,
    })
  }

  const porPilar: QiPilarResult[] = QI_PILARES.map((p) => ({
    pilar:    p,
    label:    QI_PILAR_LABELS[p],
    corretas: acc[p].corretas,
    total:    acc[p].total,
    score:    acc[p].total > 0 ? Math.round((acc[p].corretas / acc[p].total) * 100) : 0,
  }))

  const scoreGeral = totalQuestoes > 0 ? Math.round((totalCorretas / totalQuestoes) * 100) : 0
  const faixa = faixaFromScore(scoreGeral)
  const faixaInfo = QI_FAIXAS[faixa]

  // Pilar mais forte e mais fraco (desempate: ordem dos pilares)
  const ordenado = [...porPilar].sort((a, b) => b.score - a.score)
  const pilarForte = ordenado[0].pilar
  const pilarFraco = ordenado[ordenado.length - 1].pilar

  return {
    totalCorretas,
    totalQuestoes,
    scoreGeral,
    faixa,
    faixaLabel: faixaInfo.label,
    predominant: faixaInfo.label,
    vistaGeral: faixaInfo.vistaGeral,
    recomendacoes: faixaInfo.recomendacoes,
    pilarForte,
    pilarFraco,
    pilarForteTexto: QI_PILAR_DESC[pilarForte].forte,
    pilarFracoTexto: QI_PILAR_DESC[pilarFraco].fraco,
    porPilar,
    revisao,
    limites: [
      'Este é um indicador de aptidão para triagem e desenvolvimento, não um teste de QI clínico nem um diagnóstico.',
      'O resultado reflete o desempenho neste conjunto de questões e neste momento: raciocínio lógico melhora com prática.',
      'Use como um dado entre outros (entrevista, experiência, outros mapas comportamentais), nunca como critério único de decisão.',
    ],
  }
}

export const QI_FAIXA_LABELS: Record<QiFaixa, string> = {
  abaixo:      'Em desenvolvimento',
  mediano:     'Mediano',
  acima:       'Acima da média',
  excepcional: 'Excepcional',
}

// ============================================================
// ENGINE QMT — Quociente Mental Triádico
// Escolha forçada (1 de 3). Cada resposta vale por uma dimensão:
//   value 1 = C (Conceitual), 2 = I (Intuitivo), 3 = P (Processual)
// Resultado: contagem por dimensão, percentuais, perfil combinado
// (dominante + apoio), leitura de hemisfério e de equilíbrio.
// ============================================================

import {
  QMT_QUESTIONS,
  getQmtSessionQuestions,
  QMT_VALUE_TO_DIM,
  type QmtDim,
} from '@/content/qmt/questions'
import {
  QMT_COMBO_REPORTS,
  QMT_DIM_LABELS,
  QMT_DIM_DESC,
  QMT_HEMISFERIO,
  lerEquilibrio,
  type QmtComboKey,
  type QmtComboReport,
  type QmtEquilibrio,
} from '@/content/qmt/reports'

export type { QmtDim }
export {
  QMT_QUESTIONS,
  getQmtSessionQuestions,
  QMT_COMBO_REPORTS,
  QMT_DIM_LABELS,
  QMT_DIM_DESC,
}

export interface QmtAnswer {
  questionId: number
  value: number // 1=C, 2=I, 3=P
}

export interface QmtResult {
  counts: Record<QmtDim, number>
  total: number
  percentages: Record<QmtDim, number>
  ranking: { dim: QmtDim; label: string; count: number; percentage: number }[]
  dominant: QmtDim
  support: QmtDim
  comboKey: QmtComboKey
  comboReport: QmtComboReport
  hemisferio: { titulo: string; texto: string }
  equilibrio: QmtEquilibrio
}

const ORDER: QmtDim[] = ['C', 'I', 'P']

export function calculateQmt(answers: QmtAnswer[]): QmtResult {
  const counts: Record<QmtDim, number> = { C: 0, I: 0, P: 0 }

  for (const ans of answers) {
    const dim = QMT_VALUE_TO_DIM[Math.round(ans.value)]
    if (dim) counts[dim] += 1
  }

  const total = counts.C + counts.I + counts.P || 1

  const percentages: Record<QmtDim, number> = {
    C: Math.round((counts.C / total) * 100),
    I: Math.round((counts.I / total) * 100),
    P: Math.round((counts.P / total) * 100),
  }

  // Ranking com desempate determinístico pela ordem fixa C, I, P
  const ranking = ORDER
    .map((dim) => ({ dim, label: QMT_DIM_LABELS[dim], count: counts[dim], percentage: percentages[dim] }))
    .sort((a, b) => (b.count - a.count) || (ORDER.indexOf(a.dim) - ORDER.indexOf(b.dim)))

  const dominant = ranking[0].dim
  const support = ranking[1].dim
  const comboKey = `${dominant}${support}` as QmtComboKey

  const spreadPct = ranking[0].percentage - ranking[2].percentage

  return {
    counts,
    total: counts.C + counts.I + counts.P,
    percentages,
    ranking,
    dominant,
    support,
    comboKey,
    comboReport: QMT_COMBO_REPORTS[comboKey],
    hemisferio: QMT_HEMISFERIO[dominant],
    equilibrio: lerEquilibrio(spreadPct),
  }
}

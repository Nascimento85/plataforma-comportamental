// ============================================================
// ENGINE Liderança Situacional (Hersey e Blanchard)
// Escolha forçada (1 de 4). value 1=S1, 2=S2, 3=S3, 4=S4.
// Calcula: estilo dominante + secundário, distribuição, flexibilidade
// (quantos estilos a pessoa acessa) e adaptabilidade (o quanto escolheu
// o estilo apropriado à maturidade de cada situação).
// ============================================================

import {
  LS_QUESTIONS,
  getLsSessionQuestions,
  LS_QUESTION_LEVEL,
  LS_IDEAL,
  LS_VALUE_TO_STYLE,
  type LsStyle,
} from '@/content/lideranca-situacional/questions'
import {
  LS_STYLE_REPORTS,
  LS_STYLE_LABELS,
  LS_STYLE_SHORT,
  LS_STYLE_DESC,
  lerFlexibilidade,
  lerAdaptabilidade,
  type LsStyleReport,
  type LsLeitura,
} from '@/content/lideranca-situacional/reports'

export type { LsStyle }
export {
  LS_QUESTIONS,
  getLsSessionQuestions,
  LS_STYLE_REPORTS,
  LS_STYLE_LABELS,
  LS_STYLE_SHORT,
  LS_STYLE_DESC,
}

export interface LsAnswer {
  questionId: number
  value: number // 1=S1, 2=S2, 3=S3, 4=S4
}

export interface LsResult {
  counts: Record<LsStyle, number>
  total: number
  percentages: Record<LsStyle, number>
  ranking: { estilo: LsStyle; label: string; count: number; percentage: number }[]
  dominant: LsStyle
  secondary: LsStyle
  estilosUsados: number
  flexibilidade: LsLeitura
  adaptabilidadePct: number
  adaptabilidade: LsLeitura
  dominantReport: LsStyleReport
}

const ORDER: LsStyle[] = ['S1', 'S2', 'S3', 'S4']

export function calculateLiderancaSituacional(answers: LsAnswer[]): LsResult {
  const counts: Record<LsStyle, number> = { S1: 0, S2: 0, S3: 0, S4: 0 }
  let acertosAdapt = 0
  let comNivel = 0

  for (const ans of answers) {
    const estilo = LS_VALUE_TO_STYLE[Math.round(ans.value)]
    if (!estilo) continue
    counts[estilo] += 1
    // adaptabilidade: estilo escolhido bate com o ideal para a maturidade do cenário?
    const nivel = LS_QUESTION_LEVEL[ans.questionId]
    if (nivel) {
      comNivel += 1
      if (LS_IDEAL[nivel] === estilo) acertosAdapt += 1
    }
  }

  const total = counts.S1 + counts.S2 + counts.S3 + counts.S4
  const denom = total || 1

  const percentages: Record<LsStyle, number> = {
    S1: Math.round((counts.S1 / denom) * 100),
    S2: Math.round((counts.S2 / denom) * 100),
    S3: Math.round((counts.S3 / denom) * 100),
    S4: Math.round((counts.S4 / denom) * 100),
  }

  const ranking = ORDER
    .map((estilo) => ({ estilo, label: LS_STYLE_LABELS[estilo], count: counts[estilo], percentage: percentages[estilo] }))
    .sort((a, b) => (b.count - a.count) || (ORDER.indexOf(a.estilo) - ORDER.indexOf(b.estilo)))

  const dominant = ranking[0].estilo
  const secondary = ranking[1].estilo
  const estilosUsados = ORDER.filter((s) => counts[s] > 0).length
  const adaptabilidadePct = comNivel > 0 ? Math.round((acertosAdapt / comNivel) * 100) : 0

  return {
    counts,
    total,
    percentages,
    ranking,
    dominant,
    secondary,
    estilosUsados,
    flexibilidade: lerFlexibilidade(estilosUsados),
    adaptabilidadePct,
    adaptabilidade: lerAdaptabilidade(adaptabilidadePct),
    dominantReport: LS_STYLE_REPORTS[dominant],
  }
}

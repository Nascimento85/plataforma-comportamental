// ============================================================
// ENGINE Mapa da Comunicação (teste autoral)
// Três escalas independentes, lidas pelo bloco de cada questão:
//   PERFIL (Murphy)  -> dominante + apoio entre Analítico/Intuitivo/Funcional/Emocional
//   SOCIAL           -> estilo social dominante
//   ASSERT           -> termômetro de assertividade (% comunicação não violenta)
// As respostas chegam como { questionId, value 1..4 } (índice canônico do bloco).
// ============================================================

import {
  COMM_QUESTIONS,
  getCommSessionQuestions,
  COMM_QUESTION_BLOCO,
  CAT_PERFIL,
  CAT_SOCIAL,
  CAT_ASSERT,
} from '@/content/comunicacao/questions'
import {
  COMM_PERFIL_REPORTS,
  COMM_PERFIL_LABELS,
  COMM_PERFIL_DESC,
  COMM_SOCIAL_LABELS,
  COMM_SOCIAL_DESC,
  COMM_ASSERT_LABELS,
  COMM_ASSERT_DESC,
  lerTermometro,
  type CommPerfil,
  type CommSocial,
  type CommAssert,
  type CommPerfilReport,
  type CommTermometro,
} from '@/content/comunicacao/reports'

export type { CommPerfil, CommSocial, CommAssert }
export {
  COMM_QUESTIONS,
  getCommSessionQuestions,
  COMM_PERFIL_REPORTS,
  COMM_PERFIL_LABELS,
  COMM_PERFIL_DESC,
  COMM_SOCIAL_LABELS,
  COMM_SOCIAL_DESC,
  COMM_ASSERT_LABELS,
  COMM_ASSERT_DESC,
}

export interface CommAnswer {
  questionId: number
  value: number // 1..4 = índice canônico da categoria do bloco
}

export interface CommBar { chave: string; label: string; count: number; percentage: number }

export interface CommResult {
  // PERFIL (Murphy)
  perfilRanking: CommBar[]
  perfilDominante: CommPerfil
  perfilApoio: CommPerfil
  perfilReport: CommPerfilReport
  perfilDesc: string
  // SOCIAL
  socialRanking: CommBar[]
  socialDominante: CommSocial
  socialDesc: string
  // ASSERT (termômetro)
  assertRanking: CommBar[]
  pctAssertiva: number
  deslizeDominante: CommAssert
  termometro: CommTermometro
}

const PERFIL_ORDER = CAT_PERFIL as readonly CommPerfil[]
const SOCIAL_ORDER = CAT_SOCIAL as readonly CommSocial[]
const ASSERT_ORDER = CAT_ASSERT as readonly CommAssert[]

function tally<T extends string>(
  answers: CommAnswer[],
  bloco: 'PERFIL' | 'SOCIAL' | 'ASSERT',
  cats: readonly T[],
  labels: Record<T, string>,
): { counts: Record<T, number>; total: number; ranking: CommBar[] } {
  const counts = {} as Record<T, number>
  for (const c of cats) counts[c] = 0
  for (const ans of answers) {
    if (COMM_QUESTION_BLOCO[ans.questionId] !== bloco) continue
    const cat = cats[Math.round(ans.value) - 1]
    if (cat) counts[cat] += 1
  }
  const total = cats.reduce((s, c) => s + counts[c], 0) || 1
  const ranking: CommBar[] = cats
    .map((c) => ({ chave: c, label: labels[c], count: counts[c], percentage: Math.round((counts[c] / total) * 100) }))
    .sort((a, b) => (b.count - a.count) || (cats.indexOf(a.chave as T) - cats.indexOf(b.chave as T)))
  return { counts, total, ranking }
}

export function calculateComunicacao(answers: CommAnswer[]): CommResult {
  // PERFIL (Murphy)
  const perfil = tally(answers, 'PERFIL', PERFIL_ORDER, COMM_PERFIL_LABELS)
  const perfilDominante = perfil.ranking[0].chave as CommPerfil
  const perfilApoio = perfil.ranking[1].chave as CommPerfil

  // SOCIAL
  const social = tally(answers, 'SOCIAL', SOCIAL_ORDER, COMM_SOCIAL_LABELS)
  const socialDominante = social.ranking[0].chave as CommSocial

  // ASSERT (termômetro)
  const assert = tally(answers, 'ASSERT', ASSERT_ORDER, COMM_ASSERT_LABELS)
  const assertivaBar = assert.ranking.find((r) => r.chave === 'ASSERTIVA')
  const pctAssertiva = assertivaBar ? assertivaBar.percentage : 0
  // deslize = categoria não assertiva mais frequente (desempate pela ordem canônica)
  const slips = assert.ranking.filter((r) => r.chave !== 'ASSERTIVA')
  const deslizeDominante = (slips[0]?.chave ?? 'PASSIVA') as CommAssert

  return {
    perfilRanking: perfil.ranking,
    perfilDominante,
    perfilApoio,
    perfilReport: COMM_PERFIL_REPORTS[perfilDominante],
    perfilDesc: COMM_PERFIL_DESC[perfilDominante],
    socialRanking: social.ranking,
    socialDominante,
    socialDesc: COMM_SOCIAL_DESC[socialDominante],
    assertRanking: assert.ranking,
    pctAssertiva,
    deslizeDominante,
    termometro: lerTermometro(pctAssertiva, deslizeDominante),
  }
}

// ============================================================
// ENGINE — O Teste do Silêncio
// ============================================================
// Escala única: o termômetro de assertividade em contexto de
// relacionamento. As respostas chegam como { questionId, value 1..4 },
// onde o valor é o índice canônico da categoria:
//   1 Passiva · 2 Agressiva · 3 Passivo-Agressiva · 4 Assertiva
// ============================================================

import { CAT_SILENCIO, SILENCIO_QUESTIONS, getSilencioSessionQuestions, type SilencioCat } from '@/content/silencio/questions'
import {
  SILENCIO_LABELS,
  SILENCIO_PERFIS,
  lerTermometroSilencio,
  type SilencioPerfil,
  type SilencioTermometro,
} from '@/content/silencio/reports'

export type { SilencioCat, SilencioPerfil, SilencioTermometro }
export { SILENCIO_QUESTIONS, getSilencioSessionQuestions, SILENCIO_LABELS, SILENCIO_PERFIS }

export interface SilencioAnswer {
  questionId: number
  value: number // 1..4
}

export interface SilencioBar { chave: SilencioCat; label: string; count: number; percentage: number }

export interface SilencioResult {
  ranking: SilencioBar[]
  pctAssertiva: number
  /** categoria não assertiva mais frequente — o "deslize" */
  deslize: SilencioCat
  /** perfil do deslize (ou do assertivo, quando ele domina) */
  perfil: SilencioPerfil
  perfilChave: SilencioCat
  termometro: SilencioTermometro
  respondidas: number
}

export function calculateSilencio(answers: SilencioAnswer[]): SilencioResult {
  const counts = {} as Record<SilencioCat, number>
  for (const c of CAT_SILENCIO) counts[c] = 0

  let respondidas = 0
  for (const ans of answers) {
    const cat = CAT_SILENCIO[Math.round(ans.value) - 1]
    if (!cat) continue
    counts[cat] += 1
    respondidas += 1
  }

  const total = respondidas || 1
  const ranking: SilencioBar[] = CAT_SILENCIO.map((c) => ({
    chave: c,
    label: SILENCIO_LABELS[c],
    count: counts[c],
    percentage: Math.round((counts[c] / total) * 100),
  })).sort(
    (a, b) => (b.count - a.count) || (CAT_SILENCIO.indexOf(a.chave) - CAT_SILENCIO.indexOf(b.chave)),
  )

  const pctAssertiva = ranking.find((r) => r.chave === 'ASSERTIVA')?.percentage ?? 0

  // O deslize é a categoria NÃO assertiva mais frequente. Empate resolve
  // pela ordem canônica, para o resultado ser estável entre execuções.
  const naoAssertivas = ranking.filter((r) => r.chave !== 'ASSERTIVA')
  const deslize = (naoAssertivas[0]?.chave ?? 'PASSIVA') as SilencioCat

  // Quem é majoritariamente assertiva recebe o perfil assertivo; o deslize
  // continua calculado, porque é justamente o ponto cego dela.
  const perfilChave: SilencioCat = ranking[0].chave === 'ASSERTIVA' ? 'ASSERTIVA' : deslize

  return {
    ranking,
    pctAssertiva,
    deslize,
    perfil: SILENCIO_PERFIS[perfilChave],
    perfilChave,
    termometro: lerTermometroSilencio(pctAssertiva, deslize),
    respondidas,
  }
}

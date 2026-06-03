// ============================================================
// ENGINE VAC, Visual / Auditivo / Sinestésico
// 30 questões por sessão (sorteio determinístico do banco de 60).
// Likert 1 a 5, convertido em 0 a 4 pontos por questão.
// Cada canal tem 10 questões na sessão, pontuação máx 40 pontos.
// Conversão para %: (pontos / 40) × 100.
// ============================================================

import {
  VAC_QUESTIONS,
  getVacQuestionsByChannel,
  type VacChannel,
  type VacQuestion,
} from '@/content/vac/questions'
import {
  VAC_CHANNEL_REPORTS,
  VAC_COMBINED_REPORTS,
  type VacChannelReport,
  type VacCombinedReport,
} from '@/content/vac/reports'

export type { VacChannel, VacQuestion }
export { VAC_QUESTIONS, VAC_CHANNEL_REPORTS, VAC_COMBINED_REPORTS }

// ============================================================
// Tipos das respostas e do resultado
// ============================================================

export interface VacAnswer {
  questionId: number
  value:      number // 1 a 5 na escala Likert do usuário
}

export interface VacResult {
  scores: Record<VacChannel, number>            // 0 a 40 (pontos brutos)
  percentages: Record<VacChannel, number>       // 0 a 100 (intensidade isolada)
  primaryChannel: VacChannel
  secondaryChannel: VacChannel
  primaryReport: VacChannelReport
  secondaryReport: VacChannelReport
  combinedReport: VacCombinedReport | null      // se 2 canais ficam próximos (gap <= 15%)
  ranking: { channel: VacChannel; score: number; percentage: number }[]
}

// ============================================================
// Sorteio determinístico, 10 por canal (V/A/S)
// Mesma seed = mesma seleção e ordem. Seed diferente = banco novo.
// ============================================================

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

function pickFromChannel(channel: VacChannel, seed: string, n: number): VacQuestion[] {
  const pool = getVacQuestionsByChannel(channel)
  // Mistura por Fisher Yates com seed específica do canal
  const rng = lcg(fnvHash(`${seed}:${channel}`))
  const shuffled = [...pool]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = rng.next() % (i + 1)
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled.slice(0, n)
}

/**
 * Retorna 30 perguntas (10 V + 10 A + 10 S) intercaladas para que
 * o respondente não perceba o padrão por canal.
 * Seed recomendada: o `token` ou `assessmentId` da avaliação.
 */
export function getVacSessionQuestions(seed: string): VacQuestion[] {
  const v = pickFromChannel('V', seed, 10)
  const a = pickFromChannel('A', seed, 10)
  const s = pickFromChannel('S', seed, 10)

  // Intercala os três canais para distribuir bem ao longo do quiz
  const interleaved: VacQuestion[] = []
  for (let i = 0; i < 10; i++) {
    interleaved.push(v[i], a[i], s[i])
  }

  // Segundo passe de embaralhamento global (mantém determinismo)
  const rng = lcg(fnvHash(`${seed}:final`))
  for (let i = interleaved.length - 1; i > 0; i--) {
    const j = rng.next() % (i + 1)
    ;[interleaved[i], interleaved[j]] = [interleaved[j], interleaved[i]]
  }

  return interleaved
}

// ============================================================
// Cálculo do resultado
// ============================================================

export function calculateVac(answers: VacAnswer[]): VacResult {
  // Mapa rápido para descobrir o canal de cada questão respondida
  const channelById = new Map<number, VacChannel>(
    VAC_QUESTIONS.map(q => [q.id, q.channel] as const),
  )

  const scores: Record<VacChannel, number> = { V: 0, A: 0, S: 0 }

  for (const ans of answers) {
    const channel = channelById.get(ans.questionId)
    if (!channel) continue
    // Likert 1..5 vira 0..4 pontos
    const raw = Math.max(1, Math.min(5, Math.round(ans.value)))
    scores[channel] += raw - 1
  }

  // Cada canal tem 10 perguntas × 4 pts máx = 40 pts máx
  const MAX_PER_CHANNEL = 40

  const percentages: Record<VacChannel, number> = {
    V: Math.round((scores.V / MAX_PER_CHANNEL) * 100),
    A: Math.round((scores.A / MAX_PER_CHANNEL) * 100),
    S: Math.round((scores.S / MAX_PER_CHANNEL) * 100),
  }

  const ranking = (['V', 'A', 'S'] as VacChannel[])
    .map(channel => ({
      channel,
      score: scores[channel],
      percentage: percentages[channel],
    }))
    .sort((a, b) => b.score - a.score)

  const primaryChannel = ranking[0].channel
  const secondaryChannel = ranking[1].channel

  // Canal combinado: se primário e secundário estão próximos (gap <= 15%)
  const gap = ranking[0].percentage - ranking[1].percentage
  let combinedReport: VacCombinedReport | null = null
  if (gap <= 15) {
    const pair = [primaryChannel, secondaryChannel].sort().join('') as 'AS' | 'AV' | 'SV'
    // Mapeia para as chaves do dicionário (VA, AS, VS)
    const normalized = (pair === 'AV' ? 'VA' : pair === 'SV' ? 'VS' : 'AS') as 'VA' | 'AS' | 'VS'
    combinedReport = VAC_COMBINED_REPORTS[normalized]
  }

  return {
    scores,
    percentages,
    primaryChannel,
    secondaryChannel,
    primaryReport: VAC_CHANNEL_REPORTS[primaryChannel],
    secondaryReport: VAC_CHANNEL_REPORTS[secondaryChannel],
    combinedReport,
    ranking,
  }
}

// ============================================================
// Helper de label legível
// ============================================================

export const VAC_CHANNEL_LABELS: Record<VacChannel, string> = {
  V: 'Visual',
  A: 'Auditivo',
  S: 'Sinestésico',
}

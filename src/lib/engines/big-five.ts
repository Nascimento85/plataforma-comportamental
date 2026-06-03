// ============================================================
// ENGINE Big Five Liderança Corporativa
// 44 itens por sessão (sorteio determinístico de banco de 90).
// 5 fatores comerciais. Itens invertidos são espelhados pelo
// próprio engine (Valor = 6 - Resposta). Cada fator gera nota
// 1.0 a 5.0 e percentual 0 a 100 (nota × 20).
// O arquétipo de liderança é definido pelo cruzamento dos fatores.
// ============================================================

import {
  BIG_FIVE_QUESTIONS,
  getBigFiveByFactor,
  BIG_FIVE_FACTOR_LABELS,
  BIG_FIVE_FACTOR_DESCRIPTIONS,
  BIG_FIVE_FACTOR_COLORS,
  type BigFiveFactor,
  type BigFiveQuestion,
} from '@/content/big-five/questions'
import {
  BIG_FIVE_ARCHETYPES,
  detectArchetype,
  type BigFiveArchetype,
  type BigFiveArchetypeReport,
} from '@/content/big-five/reports'

export type { BigFiveFactor, BigFiveQuestion, BigFiveArchetype }
export {
  BIG_FIVE_QUESTIONS,
  BIG_FIVE_FACTOR_LABELS,
  BIG_FIVE_FACTOR_DESCRIPTIONS,
  BIG_FIVE_FACTOR_COLORS,
  BIG_FIVE_ARCHETYPES,
}

// ============================================================
// Tipos das respostas e do resultado
// ============================================================

export interface BigFiveAnswer {
  questionId: number
  value:      number // 1 a 5 Likert (resposta crua do usuário)
}

export interface BigFiveResult {
  scoresRaw:    Record<BigFiveFactor, number>   // soma de valores ajustados (inversão aplicada)
  scoresAvg:    Record<BigFiveFactor, number>   // média 1.0 a 5.0 por fator
  percentages:  Record<BigFiveFactor, number>   // 0 a 100 (gráfico radar)
  ranking:      { factor: BigFiveFactor; percentage: number }[]
  archetype:    BigFiveArchetype
  archetypeReport: BigFiveArchetypeReport
  highestFactor:  BigFiveFactor
  lowestFactor:   BigFiveFactor
}

// ============================================================
// Sorteio determinístico, 8 a 9 itens por fator
// Tota 44 itens (8+9+9+9+9, distribuídos pelos 5 fatores)
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

function pickFromFactor(factor: BigFiveFactor, seed: string, n: number): BigFiveQuestion[] {
  const pool = getBigFiveByFactor(factor)
  const rng = lcg(fnvHash(`${seed}:${factor}`))
  const shuffled = [...pool]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = rng.next() % (i + 1)
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled.slice(0, n)
}

// Distribuição fixa: 8 EXT + 9 AMB + 9 CON + 9 EST + 9 ABE = 44
const SESSION_DISTRIBUTION: Record<BigFiveFactor, number> = {
  EXT: 8,
  AMB: 9,
  CON: 9,
  EST: 9,
  ABE: 9,
}

/**
 * Retorna 44 perguntas (8-9 por fator) embaralhadas para que o
 * candidato não perceba o padrão por fator. Use `assessment.id`
 * ou `token` como seed para garantir determinismo.
 */
export function getBigFiveSessionQuestions(seed: string): BigFiveQuestion[] {
  const blocks: BigFiveQuestion[][] = []
  for (const factor of Object.keys(SESSION_DISTRIBUTION) as BigFiveFactor[]) {
    blocks.push(pickFromFactor(factor, seed, SESSION_DISTRIBUTION[factor]))
  }

  // Achata e embaralha globalmente
  const flat = blocks.flat()
  const rng = lcg(fnvHash(`${seed}:final`))
  for (let i = flat.length - 1; i > 0; i--) {
    const j = rng.next() % (i + 1)
    ;[flat[i], flat[j]] = [flat[j], flat[i]]
  }
  return flat
}

// ============================================================
// Cálculo do resultado, com inversão automática
// ============================================================

export function calculateBigFive(answers: BigFiveAnswer[]): BigFiveResult {
  // Indexa o banco para acesso O(1)
  const byId = new Map<number, BigFiveQuestion>(
    BIG_FIVE_QUESTIONS.map(q => [q.id, q] as const),
  )

  const sums: Record<BigFiveFactor, number> = { EXT: 0, AMB: 0, CON: 0, EST: 0, ABE: 0 }
  const counts: Record<BigFiveFactor, number> = { EXT: 0, AMB: 0, CON: 0, EST: 0, ABE: 0 }

  for (const ans of answers) {
    const q = byId.get(ans.questionId)
    if (!q) continue
    let v = Math.max(1, Math.min(5, Math.round(ans.value)))
    // Inversão científica: valor = 6 - resposta
    if (q.inverted) v = 6 - v
    sums[q.factor] += v
    counts[q.factor] += 1
  }

  const scoresAvg: Record<BigFiveFactor, number> = {
    EXT: counts.EXT ? +(sums.EXT / counts.EXT).toFixed(2) : 0,
    AMB: counts.AMB ? +(sums.AMB / counts.AMB).toFixed(2) : 0,
    CON: counts.CON ? +(sums.CON / counts.CON).toFixed(2) : 0,
    EST: counts.EST ? +(sums.EST / counts.EST).toFixed(2) : 0,
    ABE: counts.ABE ? +(sums.ABE / counts.ABE).toFixed(2) : 0,
  }

  // % no gráfico: média × 20 (escala 1.0 a 5.0 vira 20 a 100)
  const percentages: Record<BigFiveFactor, number> = {
    EXT: Math.round(scoresAvg.EXT * 20),
    AMB: Math.round(scoresAvg.AMB * 20),
    CON: Math.round(scoresAvg.CON * 20),
    EST: Math.round(scoresAvg.EST * 20),
    ABE: Math.round(scoresAvg.ABE * 20),
  }

  const ranking = (Object.keys(percentages) as BigFiveFactor[])
    .map(factor => ({ factor, percentage: percentages[factor] }))
    .sort((a, b) => b.percentage - a.percentage)

  const archetype = detectArchetype(percentages)

  return {
    scoresRaw: sums,
    scoresAvg,
    percentages,
    ranking,
    archetype,
    archetypeReport: BIG_FIVE_ARCHETYPES[archetype],
    highestFactor: ranking[0].factor,
    lowestFactor:  ranking[ranking.length - 1].factor,
  }
}

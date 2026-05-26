// ============================================================
// Gerador de respostas mockadas para o modulo NR-1.
// Uso: QA do produto + demos comerciais sem precisar mobilizar
// 5 pessoas reais. Endpoint protegido (admin-only).
// ============================================================

import type {
  KarasekResposta, ERIResposta, CopsoqResposta, NR1RespostaSubmissao,
} from './types'
import { KARASEK_QUESTOES, ERI_QUESTOES, COPSOQ_QUESTOES } from './questions'

export type SeedProfile = 'BAIXO' | 'MODERADO' | 'ALTO' | 'RANDOM'

/**
 * Para cada perfil, define a janela de valores possiveis (Likert)
 * e uma probabilidade aproximada da resposta cair no extremo desfavoravel.
 * KARASEK eh Likert 1-4; ERI e COPSOQ sao 1-5.
 */
const PROFILE_BIAS: Record<Exclude<SeedProfile, 'RANDOM'>, {
  karasek: { min: number; max: number }
  eri:     { min: number; max: number }
  copsoq:  { min: number; max: number }
}> = {
  BAIXO:    { karasek: { min: 1, max: 3 }, eri: { min: 1, max: 3 }, copsoq: { min: 1, max: 3 } },
  MODERADO: { karasek: { min: 2, max: 4 }, eri: { min: 2, max: 4 }, copsoq: { min: 2, max: 4 } },
  ALTO:     { karasek: { min: 3, max: 4 }, eri: { min: 3, max: 5 }, copsoq: { min: 3, max: 5 } },
}

function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function pickProfile(profile: SeedProfile): Exclude<SeedProfile, 'RANDOM'> {
  if (profile !== 'RANDOM') return profile
  const opts: Array<Exclude<SeedProfile, 'RANDOM'>> = ['BAIXO', 'MODERADO', 'ALTO']
  return opts[Math.floor(Math.random() * opts.length)]
}

/**
 * Gera uma submissao completa (Karasek + ERI + COPSOQ) para 1 respondente
 * fake, respeitando os IDs reais de cada instrumento.
 */
export function gerarSubmissaoMockada(profile: SeedProfile = 'MODERADO'): NR1RespostaSubmissao {
  const p = pickProfile(profile)
  const bias = PROFILE_BIAS[p]

  const karasek: KarasekResposta[] = KARASEK_QUESTOES.map(q => ({
    questaoId: q.id,
    valor:     randInt(bias.karasek.min, bias.karasek.max),
  }))

  const eri: ERIResposta[] = ERI_QUESTOES.map(q => ({
    questaoId: q.id,
    valor:     randInt(bias.eri.min, bias.eri.max),
  }))

  const copsoq: CopsoqResposta[] = COPSOQ_QUESTOES.map(q => ({
    questaoId: q.id,
    valor:     randInt(bias.copsoq.min, bias.copsoq.max),
  }))

  return { karasek, eri, copsoq }
}

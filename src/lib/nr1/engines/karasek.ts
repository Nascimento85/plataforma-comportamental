// ============================================================
// Engine de calculo Karasek (JCQ - Job Content Questionnaire)
// 10 questoes Likert 1-4. Inversoes: 4, 8, 9, 10.
// Matriz Demanda x Controle -> 4 quadrantes (Alta Tensao = risco max).
// ============================================================

import type { KarasekResposta, KarasekResultado, KarasekQuadrante, RiscoNivel } from '../types'
import { KARASEK_QUESTOES } from '../questions'

// Linha de corte: media teorica do range (5..20). Mediana = 12.5
const CONTROLE_CORTE = 12.5
const DEMANDA_CORTE = 12.5

export function calcKarasek(respostas: KarasekResposta[]): KarasekResultado {
  let controle = 0
  let demanda = 0

  for (const r of respostas) {
    const q = KARASEK_QUESTOES.find((x) => x.id === r.questaoId)
    if (!q) continue
    // Inversao: se invertida, valor = 5 - valor_respondido (escala 1-4)
    const valor = q.invertida ? 5 - r.valor : r.valor
    if (q.bloco === 'CONTROLE') controle += valor
    else demanda += valor
  }

  const altaDemanda  = demanda  >  DEMANDA_CORTE
  const altoControle = controle >  CONTROLE_CORTE

  let quadrante: KarasekQuadrante
  let risco: RiscoNivel
  if (altaDemanda && !altoControle) {
    quadrante = 'ALTA_TENSAO'
    risco = 'ALTO'
  } else if (altaDemanda && altoControle) {
    quadrante = 'ATIVO'
    risco = 'MODERADO'
  } else if (!altaDemanda && !altoControle) {
    quadrante = 'PASSIVO'
    risco = 'MODERADO'
  } else {
    quadrante = 'BAIXA_TENSAO'
    risco = 'BAIXO'
  }

  return { controle, demanda, quadrante, risco }
}

export const KARASEK_QUADRANTE_LABEL: Record<KarasekQuadrante, string> = {
  ALTA_TENSAO:  'Alta Tensao (alta demanda + baixo controle)',
  ATIVO:        'Ativo (alta demanda + alto controle)',
  PASSIVO:      'Passivo (baixa demanda + baixo controle)',
  BAIXA_TENSAO: 'Baixa Tensao (baixa demanda + alto controle)',
}

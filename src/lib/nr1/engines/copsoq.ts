// ============================================================
// Engine de calculo COPSOQ II
// 40 questoes. Likert 1-5 convertida em 0-100. Algumas SIM/NAO (0/100).
// 6 dimensoes (algumas demanda, algumas recurso).
// Demanda: alta nota = alto risco.
// Recurso: baixa nota = alto risco (escala invertida no risco).
// ============================================================

import type {
  CopsoqResposta, CopsoqResultado, CopsoqDimensaoResultado,
  CopsoqDimensao, RiscoNivel,
} from '../types'
import { COPSOQ_QUESTOES, COPSOQ_CONVERSAO, COPSOQ_TIPO_DIMENSAO } from '../questions'

function classificaRisco(
  pontuacao: number,
  tipo: 'DEMANDA' | 'RECURSO' | 'AUTOAVALIACAO',
): RiscoNivel {
  if (tipo === 'DEMANDA' || tipo === 'AUTOAVALIACAO') {
    // alta nota = mais demanda/desconforto = mais risco
    if (pontuacao >= 67) return 'ALTO'
    if (pontuacao >= 34) return 'MODERADO'
    return 'BAIXO'
  }
  // RECURSO: baixa nota = pouco recurso = mais risco
  if (pontuacao < 34)  return 'ALTO'
  if (pontuacao < 67)  return 'MODERADO'
  return 'BAIXO'
}

export function calcCOPSOQ(respostas: CopsoqResposta[]): CopsoqResultado {
  // Agrupa por dimensao
  const porDimensao = new Map<CopsoqDimensao, { soma: number; n: number }>()

  for (const r of respostas) {
    const q = COPSOQ_QUESTOES.find((x) => x.id === r.questaoId)
    if (!q) continue

    let valorConvertido: number
    if (q.tipo === 'SIM_NAO') {
      // Sim = 100 (presenca de risco), Nao = 0
      valorConvertido = r.valor > 0 ? 100 : 0
    } else {
      // Likert 1-5 -> 0-100
      valorConvertido = COPSOQ_CONVERSAO[r.valor] ?? 50
      // Se questao invertida, inverte a conversao (100 - valor)
      if (q.invertida) valorConvertido = 100 - valorConvertido
    }

    const atual = porDimensao.get(q.dimensao) ?? { soma: 0, n: 0 }
    atual.soma += valorConvertido
    atual.n += 1
    porDimensao.set(q.dimensao, atual)
  }

  const dimensoes: CopsoqDimensaoResultado[] = []
  for (const [dimensao, { soma, n }] of porDimensao) {
    const pontuacao = n > 0 ? Math.round(soma / n) : 0
    const tipo = COPSOQ_TIPO_DIMENSAO[dimensao]
    const risco = classificaRisco(pontuacao, tipo)
    dimensoes.push({ dimensao, pontuacao, risco, tipo })
  }

  // Risco global: pior caso das dimensoes
  const altos = dimensoes.filter(d => d.risco === 'ALTO').length
  const moderados = dimensoes.filter(d => d.risco === 'MODERADO').length
  let riscoGlobal: RiscoNivel
  if (altos >= 2) riscoGlobal = 'ALTO'
  else if (altos === 1 || moderados >= 3) riscoGlobal = 'MODERADO'
  else riscoGlobal = 'BAIXO'

  return { dimensoes, riscoGlobal }
}

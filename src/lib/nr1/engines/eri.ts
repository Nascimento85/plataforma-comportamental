// ============================================================
// Engine de calculo ERI (Effort-Reward Imbalance)
// 17 questoes Likert 1-5. Esforco (6) / Recompensa (11).
// Formula: ERI = Soma_Esforco / (Soma_Recompensa * Fator_Correcao)
// FC = nQuestoesEsforco / nQuestoesRecompensa
// > 1.0 = risco (vermelho), 0.8-1.0 = atencao (amarelo), < 0.8 = saudavel (verde)
// ============================================================

import type { ERIResposta, ERIResultado, RiscoNivel } from '../types'
import { ERI_QUESTOES } from '../questions'

export function calcERI(respostas: ERIResposta[]): ERIResultado {
  let somaEsforco = 0
  let somaRecompensa = 0
  let nEsforco = 0
  let nRecompensa = 0

  for (const r of respostas) {
    const q = ERI_QUESTOES.find((x) => x.id === r.questaoId)
    if (!q) continue
    if (q.bloco === 'ESFORCO') {
      somaEsforco += r.valor
      nEsforco++
    } else {
      somaRecompensa += r.valor
      nRecompensa++
    }
  }

  const fatorCorrecao = nRecompensa > 0 ? nEsforco / nRecompensa : 1
  const razao = somaRecompensa > 0
    ? somaEsforco / (somaRecompensa * fatorCorrecao)
    : 0

  let risco: RiscoNivel
  if (razao > 1.0)      risco = 'ALTO'
  else if (razao >= 0.8) risco = 'MODERADO'
  else                  risco = 'BAIXO'

  return { somaEsforco, somaRecompensa, fatorCorrecao, razao, risco }
}

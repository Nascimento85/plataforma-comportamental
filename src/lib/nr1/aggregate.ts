// ============================================================
// Agregacao por setor (GHE) - cruza multiplos respondentes
// ============================================================

import type {
  NR1AgregadoSetor, NR1ScoresPorInstrumento, KarasekQuadrante,
  CopsoqDimensao, RiscoNivel, DiscPerfil,
} from './types'

export const MIN_RESPONDENTES_PARA_RELATORIO = 5

export interface ScoresIndividuais {
  scores: NR1ScoresPorInstrumento
  setorId: string
}

export interface SetorInfo {
  id: string
  nome: string
  perfilDiscDominante?: string | null
}

/**
 * Agrega scores individuais por setor.
 * Retorna apenas setores que atingiram MIN_RESPONDENTES_PARA_RELATORIO.
 */
export function agregarPorSetor(
  setores: SetorInfo[],
  todosScores: ScoresIndividuais[],
): NR1AgregadoSetor[] {
  const resultado: NR1AgregadoSetor[] = []

  for (const setor of setores) {
    const doSetor = todosScores.filter(s => s.setorId === setor.id)
    if (doSetor.length < MIN_RESPONDENTES_PARA_RELATORIO) continue

    // ---- Karasek ----
    const ctrl = doSetor.map(s => s.scores.karasek.controle)
    const dem  = doSetor.map(s => s.scores.karasek.demanda)
    const mediaControle = media(ctrl)
    const mediaDemanda  = media(dem)

    const dist: Record<KarasekQuadrante, number> = {
      ALTA_TENSAO: 0, ATIVO: 0, PASSIVO: 0, BAIXA_TENSAO: 0,
    }
    for (const s of doSetor) dist[s.scores.karasek.quadrante]++
    Object.keys(dist).forEach(k => {
      dist[k as KarasekQuadrante] = Math.round((dist[k as KarasekQuadrante] / doSetor.length) * 100)
    })
    const quadranteDominante = (Object.entries(dist).sort((a, b) => b[1] - a[1])[0][0]) as KarasekQuadrante
    const karasekRisco: RiscoNivel = dist.ALTA_TENSAO >= 40
      ? 'ALTO'
      : (dist.ALTA_TENSAO >= 20 || dist.ATIVO >= 50 || dist.PASSIVO >= 50)
        ? 'MODERADO' : 'BAIXO'

    // ---- ERI ----
    const razoes = doSetor.map(s => s.scores.eri.razao)
    const razaoMedia = media(razoes)
    const pctAcimaUm = Math.round((razoes.filter(r => r > 1.0).length / razoes.length) * 100)
    const eriRisco: RiscoNivel = razaoMedia > 1.0 ? 'ALTO' : razaoMedia >= 0.8 ? 'MODERADO' : 'BAIXO'

    // ---- COPSOQ ----
    const dimMap = new Map<CopsoqDimensao, number[]>()
    for (const s of doSetor) {
      for (const d of s.scores.copsoq.dimensoes) {
        const arr = dimMap.get(d.dimensao) ?? []
        arr.push(d.pontuacao)
        dimMap.set(d.dimensao, arr)
      }
    }
    const dimensoesAgregadas = Array.from(dimMap.entries()).map(([dimensao, pontuacoes]) => {
      const mediaPontuacao = media(pontuacoes)
      const risco: RiscoNivel = mediaPontuacao >= 67 ? 'ALTO' : mediaPontuacao >= 34 ? 'MODERADO' : 'BAIXO'
      return { dimensao, mediaPontuacao, risco }
    })

    const altos = dimensoesAgregadas.filter(d => d.risco === 'ALTO').length
    const copsoqRiscoGlobal: RiscoNivel = altos >= 2 ? 'ALTO' : altos === 1 ? 'MODERADO' : 'BAIXO'

    resultado.push({
      setorId: setor.id,
      setorNome: setor.nome,
      totalRespondentes: doSetor.length,
      karasek: {
        mediaControle, mediaDemanda, quadranteDominante,
        distribuicao: dist, risco: karasekRisco,
      },
      eri: { razaoMedia, pctAcimaUm, risco: eriRisco },
      copsoq: { dimensoes: dimensoesAgregadas, riscoGlobal: copsoqRiscoGlobal },
      perfilDiscDominante: setor.perfilDiscDominante as DiscPerfil | undefined,
    })
  }

  return resultado
}

function media(arr: number[]): number {
  if (arr.length === 0) return 0
  const soma = arr.reduce((a, b) => a + b, 0)
  return Math.round((soma / arr.length) * 10) / 10
}

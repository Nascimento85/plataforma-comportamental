// ============================================================
// Tipos compartilhados do modulo Compliance NR-1
// ============================================================

export type NR1Instrumento = 'KARASEK' | 'ERI' | 'COPSOQ'

export type RiscoNivel = 'BAIXO' | 'MODERADO' | 'ALTO'

export type DiscPerfil = 'D' | 'I' | 'S' | 'C'

// ---- Karasek ----
export type KarasekQuadrante = 'ALTA_TENSAO' | 'ATIVO' | 'PASSIVO' | 'BAIXA_TENSAO'

export interface KarasekResposta {
  questaoId: number  // 1-10
  valor: number      // 1-4 (Likert)
}

export interface KarasekResultado {
  controle: number   // soma do bloco A (5-20)
  demanda: number    // soma do bloco B (5-20)
  quadrante: KarasekQuadrante
  risco: RiscoNivel
}

// ---- ERI ----
export interface ERIResposta {
  questaoId: number  // 1-17
  valor: number      // 1-5 (Likert)
}

export interface ERIResultado {
  somaEsforco: number
  somaRecompensa: number
  fatorCorrecao: number
  razao: number  // ERI = Esforco / (Recompensa * FC)
  risco: RiscoNivel
}

// ---- COPSOQ ----
export type CopsoqDimensao =
  | 'DEMANDAS_PSICOLOGICAS'
  | 'ORGANIZACAO_TRABALHO'
  | 'RELACOES_LIDERANCA'
  | 'INTERFACE_TRABALHO_FAMILIA'
  | 'SAUDE_BEM_ESTAR'
  | 'COMPORTAMENTOS_OFENSIVOS'

export interface CopsoqResposta {
  questaoId: number  // 1-40
  valor: number      // 1-5 (Likert) ou 0/1 para Sim/Nao
}

export interface CopsoqDimensaoResultado {
  dimensao: CopsoqDimensao
  pontuacao: number   // media 0-100
  risco: RiscoNivel
  // Se eh dimensao de "demanda" (alta = risco) ou "recurso" (baixa = risco)
  tipo: 'DEMANDA' | 'RECURSO' | 'AUTOAVALIACAO'
}

export interface CopsoqResultado {
  dimensoes: CopsoqDimensaoResultado[]
  riscoGlobal: RiscoNivel
}

// ---- Submissao completa (1 respondente, 3 instrumentos) ----
export interface NR1RespostaSubmissao {
  karasek: KarasekResposta[]
  eri: ERIResposta[]
  copsoq: CopsoqResposta[]
}

export interface NR1ScoresPorInstrumento {
  karasek: KarasekResultado
  eri: ERIResultado
  copsoq: CopsoqResultado
}

// ---- Agregacao por setor (multiplos respondentes) ----
export interface NR1AgregadoSetor {
  setorId: string
  setorNome: string
  totalRespondentes: number
  // Medias dos resultados
  karasek: {
    mediaControle: number
    mediaDemanda: number
    quadranteDominante: KarasekQuadrante
    distribuicao: Record<KarasekQuadrante, number>  // % em cada quadrante
    risco: RiscoNivel
  }
  eri: {
    razaoMedia: number
    pctAcimaUm: number  // % com razao > 1.0
    risco: RiscoNivel
  }
  copsoq: {
    dimensoes: Array<{
      dimensao: CopsoqDimensao
      mediaPontuacao: number
      risco: RiscoNivel
    }>
    riscoGlobal: RiscoNivel
  }
  perfilDiscDominante?: DiscPerfil
}

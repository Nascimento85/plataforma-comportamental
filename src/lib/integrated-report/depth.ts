// Profundidade do relatorio integrado

import type { IntegratedDepth } from './types'

export function computeDepth(testCount: number): IntegratedDepth {
  if (testCount <= 2) return 'BASIC'
  if (testCount === 3) return 'SYNTHETIC'
  if (testCount <= 5)  return 'EXECUTIVE'
  return 'PREMIUM'
}

export interface DepthConfig {
  depth: IntegratedDepth
  label: string
  targetWords: number
  maxTokens: number
  promptHeadline: string
}

export const DEPTH_CONFIGS: Record<IntegratedDepth, DepthConfig> = {
  BASIC: {
    depth: 'BASIC',
    label: 'Sintese Inicial',
    targetWords: 500,
    maxTokens: 1500,
    promptHeadline: 'Sintese inicial cruzando os 2 testes. Foque em convergencias e 1 ponto de atencao.',
  },
  SYNTHETIC: {
    depth: 'SYNTHETIC',
    label: 'Perfil Sintetico',
    targetWords: 1000,
    maxTokens: 2500,
    promptHeadline: 'Perfil sintetico com 3 dimensoes cruzadas: nucleo motivacional, estilo executor, vetor de desenvolvimento.',
  },
  EXECUTIVE: {
    depth: 'EXECUTIVE',
    label: 'Devolutiva Executiva',
    targetWords: 2000,
    maxTokens: 4096,
    promptHeadline: 'Devolutiva executiva: convergencias, tensoes, aplicacao profissional, plano de desenvolvimento.',
  },
  PREMIUM: {
    depth: 'PREMIUM',
    label: 'Mapa Premium',
    targetWords: 3500,
    maxTokens: 8000,
    promptHeadline: 'Mapa premium: convergencias profundas, tensoes criativas, leitura estrategica, padroes de sombra, plano de 7 acoes.',
  },
}

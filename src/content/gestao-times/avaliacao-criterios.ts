// ============================================================
// Questionário de Avaliação 9-box (Gestão de Equipes, 20-70-10)
// O gestor pontua cada liderado em 3 dimensões:
//   Performance (eixo X) · Fit comportamental (eixo Y) · Potencial
// Escala 1 a 5. A plataforma converte em notas 0 a 10 e classifica.
// ============================================================

export type DimensaoKey = 'PERFORMANCE' | 'FIT' | 'POTENCIAL'

export interface CriterioAvaliacao {
  id:        number
  dimensao:  DimensaoKey
  texto:     string
}

export const DIMENSAO_INFO: Record<DimensaoKey, { rotulo: string; subtitulo: string; cor: string }> = {
  PERFORMANCE: { rotulo: 'Performance e Entrega',       subtitulo: 'O que a pessoa entrega (eixo horizontal da matriz)', cor: '#c4633a' },
  FIT:         { rotulo: 'Fit Comportamental e Cultural', subtitulo: 'Como a pessoa entrega (eixo vertical da matriz)',   cor: '#3d4f7c' },
  POTENCIAL:   { rotulo: 'Potencial de Crescimento',     subtitulo: 'O quanto pode ir além do cargo atual',              cor: '#c9a84c' },
}

export const ESCALA_AVALIACAO: Array<{ valor: number; label: string }> = [
  { valor: 1, label: 'Muito abaixo do esperado' },
  { valor: 2, label: 'Abaixo do esperado' },
  { valor: 3, label: 'Dentro do esperado' },
  { valor: 4, label: 'Acima do esperado' },
  { valor: 5, label: 'Referência, excede sempre' },
]

export const CRITERIOS: CriterioAvaliacao[] = [
  // ── Performance (eixo X) ──
  { id: 1,  dimensao: 'PERFORMANCE', texto: 'Atinge ou supera as metas e os resultados acordados.' },
  { id: 2,  dimensao: 'PERFORMANCE', texto: 'Entrega com qualidade e padrão técnico consistente.' },
  { id: 3,  dimensao: 'PERFORMANCE', texto: 'Cumpre prazos e é confiável nos compromissos que assume.' },
  { id: 4,  dimensao: 'PERFORMANCE', texto: 'Trabalha com autonomia, sem precisar de cobrança constante.' },
  { id: 5,  dimensao: 'PERFORMANCE', texto: 'Resolve problemas com iniciativa, em vez de terceirizar.' },
  { id: 6,  dimensao: 'PERFORMANCE', texto: 'Mantém a produtividade mesmo sob pressão ou alta demanda.' },

  // ── Fit comportamental e cultural (eixo Y) ──
  { id: 7,  dimensao: 'FIT', texto: 'Demonstra alinhamento com os valores e a cultura da empresa.' },
  { id: 8,  dimensao: 'FIT', texto: 'Colabora e contribui para o resultado da equipe, não só o próprio.' },
  { id: 9,  dimensao: 'FIT', texto: 'Comunica-se com clareza e mantém relacionamentos saudáveis.' },
  { id: 10, dimensao: 'FIT', texto: 'Recebe feedback com maturidade e se adapta a mudanças.' },
  { id: 11, dimensao: 'FIT', texto: 'Mantém equilíbrio emocional e postura profissional sob estresse.' },
  { id: 12, dimensao: 'FIT', texto: 'Inspira confiança e é um exemplo positivo para os colegas.' },
  { id: 17, dimensao: 'FIT', texto: 'É pontual e cumpre os horários combinados de forma consistente.' },
  { id: 18, dimensao: 'FIT', texto: 'Mantém apresentação pessoal adequada ao ambiente de trabalho.' },
  { id: 19, dimensao: 'FIT', texto: 'É organizado e cuida do seu espaço e do ambiente de trabalho.' },

  // ── Potencial ──
  { id: 13, dimensao: 'POTENCIAL', texto: 'Demonstra capacidade de assumir desafios maiores que o cargo atual.' },
  { id: 14, dimensao: 'POTENCIAL', texto: 'Aprende rápido e busca desenvolvimento de forma constante.' },
  { id: 15, dimensao: 'POTENCIAL', texto: 'Tem visão além da própria função e pensa no todo.' },
  { id: 16, dimensao: 'POTENCIAL', texto: 'Demonstra ambição saudável e vontade genuína de crescer.' },
]

export function criteriosPorDimensao(d: DimensaoKey): CriterioAvaliacao[] {
  return CRITERIOS.filter((c) => c.dimensao === d)
}

// ============================================================
// Cálculo: respostas (1-5) → notas 0-10 por dimensão
// ============================================================

export interface ResultadoAvaliacao {
  notaPerformance: number   // 0-10
  fitComportamental: number // 0-10
  potencial: number         // 0-10
  completo: boolean
}

export function calcularAvaliacao(respostas: Record<number, number>): ResultadoAvaliacao {
  function mediaDim(d: DimensaoKey): number | null {
    const itens = criteriosPorDimensao(d)
    const vals = itens.map((c) => respostas[c.id]).filter((v) => typeof v === 'number' && v >= 1 && v <= 5)
    if (vals.length === 0) return null
    return vals.reduce((a, b) => a + b, 0) / vals.length
  }
  const mp = mediaDim('PERFORMANCE')
  const mf = mediaDim('FIT')
  const mpot = mediaDim('POTENCIAL')

  const respondidas = CRITERIOS.filter((c) => typeof respostas[c.id] === 'number').length

  return {
    notaPerformance:   mp != null ? +(mp * 2).toFixed(1) : 0,
    fitComportamental: mf != null ? +(mf * 2).toFixed(1) : 0,
    potencial:         mpot != null ? +(mpot * 2).toFixed(1) : 0,
    completo:          respondidas === CRITERIOS.length,
  }
}

// ============================================================
// Leitura de resultado: validação (topo) ou feedback (desenvolver)
// Cruza a zona da curva com o potencial.
// ============================================================

import type { ZonaKey } from './disc-lideranca'

export interface LeituraResultado {
  titulo:      string
  veredito:    string   // validação ou feedback, em uma frase forte
  diagnostico: string
  proximosPassos: string[]
  tom:         'VALIDACAO' | 'DESENVOLVIMENTO' | 'DIAGNOSTICO'
}

export function lerResultado(zona: ZonaKey | null, potencial: number): LeituraResultado | null {
  if (!zona) return null
  const altoPotencial = potencial >= 7

  if (zona === 'TOP20') {
    return {
      tom: 'VALIDACAO',
      titulo: altoPotencial ? 'Referência e sucessão' : 'Referência de alta performance',
      veredito: 'Esta pessoa é uma referência da equipe. O foco aqui é validar, reconhecer e blindar contra o mercado.',
      diagnostico: altoPotencial
        ? 'Alta performance somada a alto potencial. É um forte candidato a sucessão e a posições de maior responsabilidade. O maior risco é deixar essa pessoa estagnar ou ser assediada pelo mercado.'
        : 'Alta performance consolidada. É um especialista de referência que sustenta a operação. Pode não querer virar gestor, e isso é legítimo. Valorize a profundidade técnica.',
      proximosPassos: [
        'Reconheça publicamente a contribuição e deixe claro que a empresa enxerga o valor dela.',
        altoPotencial
          ? 'Desenhe um plano de sucessão: dê um projeto desafiador que prepare a pessoa para o próximo nível.'
          : 'Ofereça uma trilha em Y (especialista) com reconhecimento e autonomia, não só o caminho de gestão.',
        'Transforme essa pessoa em mentor dos colaboradores da Zona de Tração.',
        'Revise pacote de retenção e dê desafios à altura para evitar a fuga para a concorrência.',
      ],
    }
  }

  if (zona === 'MID70') {
    return {
      tom: 'DESENVOLVIMENTO',
      titulo: altoPotencial ? 'Diamante a lapidar' : 'Zona de tração, desenvolver',
      veredito: 'O coração da operação, com potencial a destravar. O foco aqui é desenvolvimento direcionado por perfil.',
      diagnostico: altoPotencial
        ? 'Performance na média, mas potencial alto. Esta pessoa pode virar um dos 20% rapidamente se receber o desenvolvimento certo e o encaixe de função adequado. Priorize.'
        : 'Performance e potencial dentro do esperado. É a base confiável da equipe. Pequenos ajustes comportamentais e de encaixe de função podem gerar saltos de entrega.',
      proximosPassos: [
        'Use o copiloto de devolutiva abaixo para preparar a conversa com a metodologia SCI.',
        'Construa um PDI com ações sob medida para o perfil comportamental da pessoa.',
        altoPotencial
          ? 'Avalie um job matching ou um projeto desafiador: às vezes a pessoa vira A-Player só mudando de área ou de líder.'
          : 'Defina 1 ou 2 competências comportamentais a desenvolver e acompanhe quinzenalmente.',
        'Marque check-ins frequentes. O segredo da tração é a frequência, não o PDI anual.',
      ],
    }
  }

  // BOTTOM10
  return {
    tom: 'DIAGNOSTICO',
    titulo: 'Zona de diagnóstico',
    veredito: 'Sinal de alerta no sistema. Investigar a causa antes de qualquer decisão, nunca uma cota fria de demissão.',
    diagnostico: 'Performance abaixo do esperado. Antes de decidir, é preciso entender a raiz: falta de competência técnica, falta de atitude, ou desalinhamento de perfil com a função? Muitas vezes o problema é encaixe de perfil ou liderança direta, não a pessoa.',
    proximosPassos: [
      'Faça o teste do perfil versus função: o problema é técnico, de atitude ou de encaixe comportamental?',
      'Se for desalinhamento de perfil, a primeira tentativa deve ser o remanejamento para uma área que valorize as forças naturais da pessoa.',
      'Avalie se há choque de perfis entre a pessoa e a liderança direta, ou falha no onboarding.',
      'Construa um PDI focado e dê um prazo claro. Se após o mapeamento e a tentativa de readequação o resultado não vier, o desligamento será uma decisão baseada em dados, não em cota.',
    ],
  }
}

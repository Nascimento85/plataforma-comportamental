// ============================================================
// Banco de conteúdo de Liderança (Gestão de Times)
// Mapeia os 4 perfis DISC para a nomenclatura de liderança do Kênio
// e cadastra o conteúdo do motor híbrido: dicas de tom, gargalos
// típicos no grupo dos 70% e ações práticas de PDI por perfil.
// Linguagem direta, sem hífens.
// ============================================================

export type DiscKey = 'D' | 'I' | 'S' | 'C'

export interface PerfilLideranca {
  key:        DiscKey
  nomeDisc:   string   // Dominância, Influência...
  apelido:    string   // Executor, Comunicador...
  cor:        string
  emoji:      string
  // Onde costuma travar quando está na Zona de Tração (os 70%)
  gargalos:   string[]
  // Ações práticas de PDI sob medida para o perfil
  acoesPdi:   string[]
  // Guia de tom para a conversa de devolutiva
  tom: {
    priorizar: string
    evitar:    string
  }
}

export const PERFIS_LIDERANCA: Record<DiscKey, PerfilLideranca> = {
  D: {
    key: 'D',
    nomeDisc: 'Dominância',
    apelido: 'Executor',
    cor: '#c4633a',
    emoji: '⚡',
    gargalos: [
      'Falta de empatia ou comunicação agressiva sob pressão',
      'Centralização de tarefas, dificuldade de delegar',
      'Atropelo de processos e de perfis mais lentos',
    ],
    acoesPdi: [
      'Liderar um projeto interdepartamental onde precise influenciar por persuasão, não por autoridade',
      'Delegar obrigatoriamente 2 tarefas por semana a um par ou liderado, acompanhando só os marcos de entrega',
      'Treinamento de Comunicação Não Violenta (CNV) ou gestão de conflitos',
    ],
    tom: {
      priorizar: 'Seja direto, foque em desafios e no crescimento de carreira que a mudança trará.',
      evitar:    'Rodeios, tom paternalista ou excesso de sentimentalismo.',
    },
  },
  I: {
    key: 'I',
    nomeDisc: 'Influência',
    apelido: 'Comunicador',
    cor: '#d4943a',
    emoji: '🔆',
    gargalos: [
      'Falta de foco e prazos perdidos',
      'Desorganização com dados e relatórios',
      'Dificuldade em receber feedbacks negativos',
    ],
    acoesPdi: [
      'Implementar técnica Pomodoro ou blocos de tempo na agenda para tarefas administrativas cruciais',
      'Criar um checklist visual de entrega diária: só inicia uma demanda nova após dar check na anterior',
      'Enviar um resumo por escrito logo após alinhamentos verbais, para fixar os compromissos',
    ],
    tom: {
      priorizar: 'Seja caloroso, valide as relações dele e documente os acordos por escrito ao final.',
      evitar:    'Tom excessivamente frio, ou focar apenas em erros sem celebrar os acertos.',
    },
  },
  S: {
    key: 'S',
    nomeDisc: 'Estabilidade',
    apelido: 'Planejador',
    cor: '#7a9e7e',
    emoji: '🛡',
    gargalos: [
      'Resistência extrema a mudanças rápidas',
      'Lentidão para tomar decisões',
      'Dificuldade em dizer não, acumulando tarefas e se sobrecarregando',
    ],
    acoesPdi: [
      'Exercício de tomada de decisão com dados limitados: prazos menores para resoluções simples, forçando o desapego da certeza absoluta',
      'Treinar posicionamento assertivo: mapear a carga de trabalho e argumentar com dados quando um prazo comprometer outro',
      'Participar de comitês de inovação ou novos projetos para acelerar a adaptabilidade',
    ],
    tom: {
      priorizar: 'Fale com calma, demonstre apoio e dê tempo para ele processar e responder.',
      evitar:    'Cobranças abruptas, tom de voz agressivo ou pressão por respostas imediatas.',
    },
  },
  C: {
    key: 'C',
    nomeDisc: 'Conformidade',
    apelido: 'Analítico',
    cor: '#3d4f7c',
    emoji: '🔍',
    gargalos: [
      'Paralisia por análise e perfeccionismo que atrasa entregas',
      'Isolamento do time',
      'Dificuldade em lidar com ambiguidade',
    ],
    acoesPdi: [
      'Aplicar o conceito de Produto Mínimo Viável (MVP): teto de tempo por tarefa e entrega quando estiver boa o suficiente, validando o nível de exigência real com o gestor',
      'Apresentar indicadores ou resultados da área em reuniões gerais, forçando a exposição e a comunicação verbal',
      'Mentoria reversa: 1 hora por quinzena com um perfil Comunicador para aprender a simplificar a tomada de decisão',
    ],
    tom: {
      priorizar: 'Traga dados, fatos claros e regras bem definidas para apoiar o feedback.',
      evitar:    'Opiniões subjetivas ("eu acho que...") ou falta de embasamento técnico.',
    },
  },
}

// ============================================================
// ZONAS DA CURVA DE VITALIDADE (versão moderna, foco em desenvolvimento)
// ============================================================

export type ZonaKey = 'TOP20' | 'MID70' | 'BOTTOM10'

export interface ZonaInfo {
  key:       ZonaKey
  rotulo:    string
  faixa:     string   // "20%" etc
  cor:       string
  corBg:     string
  descricao: string
  acaoEstrategica: string
}

export const ZONAS: Record<ZonaKey, ZonaInfo> = {
  TOP20: {
    key: 'TOP20',
    rotulo: 'Alta Performance',
    faixa: '20%',
    cor: '#c9a84c',
    corBg: 'rgba(201,168,76,0.12)',
    descricao: 'As referências de alta performance do time. Superam metas e inspiram os demais.',
    acaoEstrategica: 'Mapear o perfil de sucesso, blindar contra o mercado e transformar em mentores dos 70%.',
  },
  MID70: {
    key: 'MID70',
    rotulo: 'Zona de Tração',
    faixa: '70%',
    cor: '#3d4f7c',
    corBg: 'rgba(61,79,124,0.10)',
    descricao: 'O coração da operação. Produtivos e confiáveis, com potencial oculto a destravar.',
    acaoEstrategica: 'Ajustar o encaixe de perfil (job matching) e acelerar PDIs comportamentais sob medida.',
  },
  BOTTOM10: {
    key: 'BOTTOM10',
    rotulo: 'Zona de Diagnóstico',
    faixa: '10%',
    cor: '#c47a72',
    corBg: 'rgba(196,122,114,0.12)',
    descricao: 'Sinal de alerta no sistema. Investigar antes de decidir, nunca uma cota fria de demissão.',
    acaoEstrategica: 'Diagnosticar desalinhamento de perfil, função ou liderança antes de qualquer decisão.',
  },
}

// ============================================================
// CLASSIFICAÇÃO POR FAIXA (versão moderna, sem cota forçada)
// Score combinado: performance pesa 60%, fit comportamental 40%.
// Faixas absolutas respeitam a filosofia de NÃO forçar 10% no fundo.
// ============================================================

export function scoreCombinado(notaPerformance: number | null | undefined, fit: number | null | undefined): number | null {
  if (notaPerformance == null && fit == null) return null
  const p = notaPerformance ?? 0
  const f = fit ?? notaPerformance ?? 0
  return +(p * 0.6 + f * 0.4).toFixed(2)
}

export function classificarZona(score: number | null): ZonaKey | null {
  if (score == null) return null
  if (score >= 7.0) return 'TOP20'
  if (score >= 4.0) return 'MID70'
  return 'BOTTOM10'
}

export const DISC_LABELS: Record<DiscKey, string> = {
  D: 'Executor',
  I: 'Comunicador',
  S: 'Planejador',
  C: 'Analítico',
}

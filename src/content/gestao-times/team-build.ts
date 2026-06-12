// ============================================================
// Team Build, banco de conteúdo
//   1. Manual "Como Trabalhar Comigo" por perfil DISC
//   2. Análise coletiva: mapa de calor das 4 energias + alertas
//      de disfunção (inspirado em Lencioni)
//   3. Central de dinâmicas por fase de Tuckman
// Linguagem direta, sem hífens.
// ============================================================

import type { DiscKey } from './disc-lideranca'

// ============================================================
// 1. MANUAL "COMO TRABALHAR COMIGO"
// ============================================================

export interface ManualPerfil {
  funcionoMelhorQuando: string
  desmotivadoSe:        string
  resolverConflito:     string
}

export const MANUAL_POR_PERFIL: Record<DiscKey, ManualPerfil> = {
  D: {
    funcionoMelhorQuando: 'Tenho autonomia, metas claras e desafios para superar. Prefiro comunicação direta, objetiva e foco em resultado.',
    desmotivadoSe:        'Há microgestão, reuniões longas sem decisão, lentidão e burocracia que travam o andamento.',
    resolverConflito:     'Seja direto e foque na solução, sem rodeios. Traga o problema e o caminho prático para resolver.',
  },
  I: {
    funcionoMelhorQuando: 'Há interação, reconhecimento, liberdade para criar e um ambiente leve e colaborativo.',
    desmotivadoSe:        'Fico isolado, sou ignorado, ou o ambiente é frio, rígido e excessivamente burocrático.',
    resolverConflito:     'Traga a conversa de forma calorosa e valide o meu lado antes de apontar o problema. Documente os combinados ao final.',
  },
  S: {
    funcionoMelhorQuando: 'Tenho previsibilidade, processos claros, tempo para me adaptar e um clima harmônico na equipe.',
    desmotivadoSe:        'Há mudanças bruscas, conflito aberto e pressão por decisão imediata, sem espaço para processar.',
    resolverConflito:     'Traga com calma e em privacidade, me dê tempo para pensar e evite tom agressivo ou cobranças abruptas.',
  },
  C: {
    funcionoMelhorQuando: 'Recebo dados e contexto por escrito, tenho regras claras e tempo para entregar com qualidade.',
    desmotivadoSe:        'Sou cobrado sem critério claro, preciso improvisar sem dados, ou meu trabalho é feito às pressas.',
    resolverConflito:     'Traga fatos e dados concretos, seja específico e evite achismos ou opiniões subjetivas.',
  },
}

// ============================================================
// 2. MAPA DE CALOR + ALERTAS DE DISFUNÇÃO
// ============================================================

export type EnergiaKey = 'EXECUCAO' | 'COMUNICACAO' | 'ESTABILIDADE' | 'ORGANIZACAO'

export const ENERGIA_INFO: Record<EnergiaKey, { rotulo: string; disc: DiscKey; cor: string; descricao: string }> = {
  EXECUCAO:     { rotulo: 'Execução',     disc: 'D', cor: '#c4633a', descricao: 'Tração, decisão e foco em resultado.' },
  COMUNICACAO:  { rotulo: 'Comunicação',  disc: 'I', cor: '#d4943a', descricao: 'Engajamento, relacionamento e energia social.' },
  ESTABILIDADE: { rotulo: 'Estabilidade', disc: 'S', cor: '#7a9e7e', descricao: 'Constância, harmonia e suporte aa equipe.' },
  ORGANIZACAO:  { rotulo: 'Organização',  disc: 'C', cor: '#3d4f7c', descricao: 'Processo, precisão e qualidade técnica.' },
}

const DISC_TO_ENERGIA: Record<DiscKey, EnergiaKey> = {
  D: 'EXECUCAO', I: 'COMUNICACAO', S: 'ESTABILIDADE', C: 'ORGANIZACAO',
}

export interface AlertaTime {
  tipo:        'EXCESSO' | 'GAP'
  energia:     EnergiaKey
  titulo:      string
  diagnostico: string
  recomendacao: string
}

export interface AnaliseTime {
  total:        number
  comPerfil:    number
  distribuicao: Record<EnergiaKey, { count: number; pct: number }>
  alertas:      AlertaTime[]
  energiaDominante: EnergiaKey | null
}

/**
 * Analisa a composição comportamental de um time e gera mapa de calor +
 * alertas de disfunção. Recebe a lista de perfis DISC dos membros.
 */
export function analisarTime(perfis: Array<string | null | undefined>): AnaliseTime {
  const validos = perfis.filter((p): p is DiscKey => !!p && ['D', 'I', 'S', 'C'].includes(p))
  const comPerfil = validos.length

  const counts: Record<EnergiaKey, number> = { EXECUCAO: 0, COMUNICACAO: 0, ESTABILIDADE: 0, ORGANIZACAO: 0 }
  validos.forEach((p) => { counts[DISC_TO_ENERGIA[p]]++ })

  const distribuicao = {} as Record<EnergiaKey, { count: number; pct: number }>
  ;(Object.keys(counts) as EnergiaKey[]).forEach((e) => {
    distribuicao[e] = { count: counts[e], pct: comPerfil ? Math.round((counts[e] / comPerfil) * 100) : 0 }
  })

  const alertas: AlertaTime[] = []

  if (comPerfil >= 2) {
    // Excessos (>= 50% de uma energia)
    if (distribuicao.EXECUCAO.pct >= 50) {
      alertas.push({
        tipo: 'EXCESSO', energia: 'EXECUCAO',
        titulo: 'Risco de atrito por disputa de espaço',
        diagnostico: 'Seu time tem forte concentração de perfis Executores. A tendência é o atrito agressivo e a competição por protagonismo.',
        recomendacao: 'Alinhe papéis com clareza e estabeleça regras de comunicação assertiva. Defina quem decide o quê para evitar atropelos.',
      })
    }
    if (distribuicao.ORGANIZACAO.pct >= 50) {
      alertas.push({
        tipo: 'EXCESSO', energia: 'ORGANIZACAO',
        titulo: 'Risco de paralisia por análise',
        diagnostico: 'Time fortemente Analítico tende a buscar perfeição e a travar a tomada de decisão, ficando lento para inovar.',
        recomendacao: 'Aplique dinâmicas de decisão ágil e o conceito de MVP. Estabeleça tetos de tempo para análises e valide o nível de exigência real.',
      })
    }
    if (distribuicao.COMUNICACAO.pct >= 50) {
      alertas.push({
        tipo: 'EXCESSO', energia: 'COMUNICACAO',
        titulo: 'Risco de falta de foco e organização',
        diagnostico: 'Time muito Comunicador gera energia e ideias, mas pode pecar em prazos, documentação e disciplina de execução.',
        recomendacao: 'Implemente blocos de tempo, checklists de entrega e o hábito de registrar combinados por escrito após reuniões.',
      })
    }
    if (distribuicao.ESTABILIDADE.pct >= 50) {
      alertas.push({
        tipo: 'EXCESSO', energia: 'ESTABILIDADE',
        titulo: 'Risco de resistência a mudanças',
        diagnostico: 'Time muito Estável é harmônico e confiável, mas pode resistir a mudanças rápidas e demorar para inovar.',
        recomendacao: 'Crie comitês de inovação e exercícios de decisão com prazos curtos para acelerar a adaptabilidade do grupo.',
      })
    }

    // Gaps (energia ausente ou quase ausente)
    ;(Object.keys(distribuicao) as EnergiaKey[]).forEach((e) => {
      if (distribuicao[e].pct === 0) {
        const info = ENERGIA_INFO[e]
        const diag: Record<EnergiaKey, string> = {
          EXECUCAO:     'Ninguém com energia de Execução dominante. A equipe pode ter dificuldade em tomar decisões rápidas e gerar tração.',
          COMUNICACAO:  'Ninguém com energia de Comunicação dominante. A equipe pode ser pouco engajado externamente e com baixo brilho social.',
          ESTABILIDADE: 'Ninguém com energia de Estabilidade dominante. Falta quem segure o clima e dê constância nos momentos de pressão.',
          ORGANIZACAO:  'Ninguém com energia de Organização dominante. A equipe corre risco de desorganização, falhas de processo e baixa atenção a detalhes.',
        }
        alertas.push({
          tipo: 'GAP', energia: e,
          titulo: `Gap de ${info.rotulo}`,
          diagnostico: diag[e],
          recomendacao: `Considere desenvolver essa competência na equipe atual ou priorizar perfis com energia de ${info.rotulo} em futuras contratações.`,
        })
      }
    })
  }

  // Energia dominante
  let energiaDominante: EnergiaKey | null = null
  let maxCount = 0
  ;(Object.keys(counts) as EnergiaKey[]).forEach((e) => {
    if (counts[e] > maxCount) { maxCount = counts[e]; energiaDominante = e }
  })

  return { total: perfis.length, comPerfil, distribuicao, alertas, energiaDominante: comPerfil ? energiaDominante : null }
}

// ============================================================
// 3. CENTRAL DE DINÂMICAS (Tuckman)
// ============================================================

export type FaseTuckman = 'FORMING' | 'STORMING' | 'NORMING' | 'PERFORMING'

export interface FaseInfo {
  key:       FaseTuckman
  rotulo:    string
  subtitulo: string
  cor:       string
  sinais:    string[]   // como saber que a equipe está nesta fase
}

export const FASES_TUCKMAN: Record<FaseTuckman, FaseInfo> = {
  FORMING: {
    key: 'FORMING', rotulo: 'Formação', subtitulo: 'A equipe está se conhecendo',
    cor: '#7a9e7e',
    sinais: ['Time novo ou com membros recém chegados', 'As pessoas ainda são educadas e evitam conflito', 'Falta clareza sobre papéis e formas de trabalhar'],
  },
  STORMING: {
    key: 'STORMING', rotulo: 'Conflito', subtitulo: 'Atritos e disputa de espaço',
    cor: '#c4633a',
    sinais: ['Discussões frequentes e ruídos de comunicação', 'Disputa por protagonismo ou resistência a regras', 'Clima tenso e queda de produtividade'],
  },
  NORMING: {
    key: 'NORMING', rotulo: 'Normalização', subtitulo: 'A equipe está achando o ritmo',
    cor: '#3d4f7c',
    sinais: ['As regras de convivência já estão se firmando', 'A colaboração começa a fluir melhor', 'Os papéis ficam mais claros, mas ainda precisam de ajuste fino'],
  },
  PERFORMING: {
    key: 'PERFORMING', rotulo: 'Alta Performance', subtitulo: 'A equipe anda sozinho',
    cor: '#c9a84c',
    sinais: ['Confiança alta e autonomia entre os membros', 'Conflitos viram debates produtivos', 'Foco total em resultado, com clima saudável'],
  },
}

export interface Dinamica {
  fase:     FaseTuckman
  titulo:   string
  objetivo: string
  duracao:  string
  passos:   string[]
  dicaOuro: string
}

export const DINAMICAS: Record<FaseTuckman, Dinamica> = {
  FORMING: {
    fase: 'FORMING',
    titulo: 'Rodada do Manual de Mim',
    objetivo: 'Acelerar a conexão e a empatia gerando clareza imediata sobre como cada pessoa da equipe funciona.',
    duracao: '40 a 60 min',
    passos: [
      'Antes da reunião, gere o Manual "Como Trabalhar Comigo" de cada membro na plataforma e compartilhe.',
      'Na reunião, cada pessoa tem 5 minutos para apresentar seu manual: como funciona melhor, o que a desmotiva e como resolver conflito com ela.',
      'Após cada apresentação, abra 2 minutos para a equipe fazer perguntas curtas de curiosidade, sem julgamento.',
      'No fim, peça que cada um anote uma descoberta que teve sobre um colega e como vai usar isso no dia a dia.',
    ],
    dicaOuro: 'Comece você, líder, apresentando o seu próprio manual primeiro. Isso dá segurança para a equipe se abrir.',
  },
  STORMING: {
    fase: 'STORMING',
    titulo: 'Acordo de Convivência',
    objetivo: 'Transformar o atrito em regras claras, fazendo a equipe co criar os combinados inegociáveis de entrega, comunicação e respeito.',
    duracao: '60 a 90 min',
    passos: [
      'Abra a conversa nomeando o momento com honestidade: a equipe está em uma fase de atritos, e isso é natural e tem solução.',
      'Peça que cada um escreva, em silêncio, 3 comportamentos que atrapalham a equipe hoje (sem citar nomes).',
      'Agrupe os temas no quadro e conduza a equipe a transformar cada dor em uma regra positiva de convivência.',
      'Feche com no máximo 5 regras inegociáveis de entrega, comunicação e respeito, validadas por todos.',
      'Combine como a equipe vai cobrar essas regras entre si daqui pra frente.',
    ],
    dicaOuro: 'Não deixe a conversa virar tribunal. Foque sempre no comportamento e no impacto, nunca na pessoa.',
  },
  NORMING: {
    fase: 'NORMING',
    titulo: 'Matriz RACI Comportamental',
    objetivo: 'Eliminar o atropelo de papéis definindo com clareza quem Executa, quem é Responsável, quem é Consultado e quem é Informado em cada projeto.',
    duracao: '45 a 60 min',
    passos: [
      'Liste os 3 a 5 processos ou projetos mais importantes da equipe.',
      'Para cada um, preencha junto com a equipe: quem Executa (R), quem responde pelo resultado (A), quem é Consultado (C) e quem é Informado (I).',
      'Use o perfil de cada um a favor: dê o protagonismo de execução aos Executores e o controle de qualidade aos Analíticos, por exemplo.',
      'Valide se ninguém ficou sobrecarregado e se não há zonas cinzentas de responsabilidade.',
    ],
    dicaOuro: 'Atenção especial ao atropelo de perfis Executores sobre perfis Planejadores. A matriz protege o ritmo de quem é mais metódico.',
  },
  PERFORMING: {
    fase: 'PERFORMING',
    titulo: 'Retrospectiva de Forças',
    objetivo: 'Manter a equipe no auge, reconhecendo o que está funcionando e elevando ainda mais a régua de confiança e autonomia.',
    duracao: '30 a 45 min',
    passos: [
      'Peça que cada um compartilhe uma conquista recente da equipe e o comportamento coletivo que a tornou possível.',
      'Faça uma rodada de reconhecimento: cada pessoa elogia uma força específica de um colega.',
      'Identifiquem juntos 1 desafio novo e ambicioso que a equipe quer abraçar no próximo ciclo.',
      'Combinem um ritual leve de celebração para marcar as próximas vitórias.',
    ],
    dicaOuro: 'Times de alta performance se desmancham por falta de propósito novo. Sempre dê um próximo monte para escalar.',
  },
}

// Diagnóstico simples por 3 perguntas (cada resposta soma para uma fase)
export interface PerguntaDiagnostico {
  pergunta: string
  opcoes:   Array<{ texto: string; fase: FaseTuckman }>
}

export const DIAGNOSTICO_TUCKMAN: PerguntaDiagnostico[] = [
  {
    pergunta: 'Como está o clima de conflito na equipe hoje?',
    opcoes: [
      { texto: 'Todos ainda muito educados, quase sem atrito', fase: 'FORMING' },
      { texto: 'Há atritos e discussões frequentes', fase: 'STORMING' },
      { texto: 'Os conflitos diminuíram e viram acordos', fase: 'NORMING' },
      { texto: 'Conflitos viram debates produtivos sem desgaste', fase: 'PERFORMING' },
    ],
  },
  {
    pergunta: 'Quão claros estão os papéis e as regras de trabalho?',
    opcoes: [
      { texto: 'Ainda bem indefinidos, estamos começando', fase: 'FORMING' },
      { texto: 'Há disputa e resistência sobre como trabalhar', fase: 'STORMING' },
      { texto: 'As regras estão se firmando e fluindo', fase: 'NORMING' },
      { texto: 'Todos sabem seu papel e operam com autonomia', fase: 'PERFORMING' },
    ],
  },
  {
    pergunta: 'Como está a confiança e a entrega de resultados?',
    opcoes: [
      { texto: 'Ainda nos conhecendo, sem ritmo definido', fase: 'FORMING' },
      { texto: 'A produtividade caiu por causa das tensões', fase: 'STORMING' },
      { texto: 'A colaboração melhorou e o ritmo está voltando', fase: 'NORMING' },
      { texto: 'Confiança alta e entregas consistentes', fase: 'PERFORMING' },
    ],
  },
]

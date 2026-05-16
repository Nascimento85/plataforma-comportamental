// ============================================================
// Catalogo das questoes dos 3 instrumentos NR-1
// Versao adaptada para PT-BR a partir dos frameworks oficiais:
//   - Karasek JCQ (Robert Karasek, 1979)
//   - ERI (Johannes Siegrist, 1996)
//   - COPSOQ II Versao Media (Kristensen et al., 2005)
// AVISO: estes textos sao adaptacoes; recomenda-se revisao da
// psicologa parceira antes de uso comercial para garantir
// equivalencia psicometrica com versoes validadas em PT-BR.
// ============================================================

import type { CopsoqDimensao } from './types'

// ============================================================
// KARASEK (JCQ - 10 questoes, Likert 1-4)
// Bloco A (Controle): 1-5 | Bloco B (Demanda): 6-10
// Invertidas: 4, 8, 9, 10
// ============================================================
export interface KarasekQuestao {
  id: number
  bloco: 'CONTROLE' | 'DEMANDA'
  invertida: boolean
  texto: string
}

export const KARASEK_QUESTOES: KarasekQuestao[] = [
  // Bloco A — Controle (uso de habilidades + autoridade de decisao)
  { id: 1,  bloco: 'CONTROLE', invertida: false, texto: 'Meu trabalho exige que eu aprenda coisas novas.' },
  { id: 2,  bloco: 'CONTROLE', invertida: false, texto: 'Meu trabalho exige um alto nível de habilidade ou de conhecimento especializado.' },
  { id: 3,  bloco: 'CONTROLE', invertida: false, texto: 'Meu trabalho permite que eu tome decisões por conta própria sobre como executar minhas tarefas.' },
  { id: 4,  bloco: 'CONTROLE', invertida: true,  texto: 'Tenho muito pouco a dizer sobre o que acontece comigo no meu trabalho.' },
  { id: 5,  bloco: 'CONTROLE', invertida: false, texto: 'No meu trabalho, tenho a oportunidade de desenvolver minhas habilidades especiais.' },

  // Bloco B — Demanda Psicologica (carga de trabalho)
  { id: 6,  bloco: 'DEMANDA',  invertida: false, texto: 'Meu trabalho exige que eu trabalhe muito rápido.' },
  { id: 7,  bloco: 'DEMANDA',  invertida: false, texto: 'Meu trabalho exige que eu trabalhe com muito esforço, tanto físico quanto mental.' },
  { id: 8,  bloco: 'DEMANDA',  invertida: true,  texto: 'Não me é pedido que eu realize uma quantidade excessiva de trabalho.' },
  { id: 9,  bloco: 'DEMANDA',  invertida: true,  texto: 'Tenho tempo suficiente para realizar minhas tarefas dentro do prazo.' },
  { id: 10, bloco: 'DEMANDA',  invertida: true,  texto: 'Meu trabalho é livre de exigências conflitantes vindas de pessoas diferentes.' },
]

export const KARASEK_ESCALA = {
  1: 'Discordo Fortemente',
  2: 'Discordo',
  3: 'Concordo',
  4: 'Concordo Fortemente',
} as const

// ============================================================
// ERI (Effort-Reward Imbalance - 17 questoes, Likert 1-5)
// Esforco: 6 questoes | Recompensa: 11 questoes
// ============================================================
export interface ERIQuestao {
  id: number
  bloco: 'ESFORCO' | 'RECOMPENSA'
  texto: string
}

export const ERI_QUESTOES: ERIQuestao[] = [
  // Bloco Esforco (6 questoes)
  { id: 1, bloco: 'ESFORCO',    texto: 'Sou constantemente pressionado pelo tempo devido a uma carga pesada de trabalho.' },
  { id: 2, bloco: 'ESFORCO',    texto: 'Tenho muitas interrupções e perturbações enquanto realizo meu trabalho.' },
  { id: 3, bloco: 'ESFORCO',    texto: 'Tenho muita responsabilidade no meu trabalho.' },
  { id: 4, bloco: 'ESFORCO',    texto: 'Sou frequentemente pressionado a fazer horas extras.' },
  { id: 5, bloco: 'ESFORCO',    texto: 'Meu trabalho é fisicamente exigente.' },
  { id: 6, bloco: 'ESFORCO',    texto: 'Nos últimos anos, meu trabalho tem se tornado cada vez mais exigente.' },

  // Bloco Recompensa (11 questoes)
  { id: 7,  bloco: 'RECOMPENSA', texto: 'Recebo o respeito que mereço dos meus superiores.' },
  { id: 8,  bloco: 'RECOMPENSA', texto: 'Recebo o respeito que mereço dos meus colegas.' },
  { id: 9,  bloco: 'RECOMPENSA', texto: 'Recebo apoio adequado em situações difíceis no trabalho.' },
  { id: 10, bloco: 'RECOMPENSA', texto: 'Sou tratado de forma justa no meu trabalho.' },
  { id: 11, bloco: 'RECOMPENSA', texto: 'Minhas perspectivas de promoção são adequadas.' },
  { id: 12, bloco: 'RECOMPENSA', texto: 'Estou passando por uma piora indesejada na minha situação de trabalho.' },
  { id: 13, bloco: 'RECOMPENSA', texto: 'Minha estabilidade no emprego é boa.' },
  { id: 14, bloco: 'RECOMPENSA', texto: 'Minha posição atual no trabalho reflete adequadamente minha formação e treinamento.' },
  { id: 15, bloco: 'RECOMPENSA', texto: 'Considerando todos os meus esforços e realizações, recebo o respeito e prestígio que mereço.' },
  { id: 16, bloco: 'RECOMPENSA', texto: 'Considerando todos os meus esforços e realizações, minhas perspectivas profissionais são adequadas.' },
  { id: 17, bloco: 'RECOMPENSA', texto: 'Considerando todos os meus esforços e realizações, meu salário é adequado.' },
]

export const ERI_ESCALA = {
  1: 'Discordo Totalmente',
  2: 'Discordo',
  3: 'Neutro',
  4: 'Concordo',
  5: 'Concordo Totalmente',
} as const

// ============================================================
// COPSOQ II (40 questoes, Likert 1-5 -> 0-100)
// 6 dimensoes. Likert temporal (Sempre/Nunca) na maioria;
// algumas Sim/Nao em Comportamentos Ofensivos.
// ============================================================
export interface CopsoqQuestao {
  id: number
  dimensao: CopsoqDimensao
  invertida: boolean
  tipo: 'LIKERT_5' | 'SIM_NAO'
  texto: string
}

export const COPSOQ_QUESTOES: CopsoqQuestao[] = [
  // 1. Demandas Psicologicas (5 questoes) — alta nota = alto risco
  { id: 1, dimensao: 'DEMANDAS_PSICOLOGICAS', invertida: false, tipo: 'LIKERT_5', texto: 'Com que frequência você precisa trabalhar muito rapidamente?' },
  { id: 2, dimensao: 'DEMANDAS_PSICOLOGICAS', invertida: false, tipo: 'LIKERT_5', texto: 'Com que frequência o seu trabalho se acumula a ponto de você não conseguir dar conta de todas as tarefas?' },
  { id: 3, dimensao: 'DEMANDAS_PSICOLOGICAS', invertida: false, tipo: 'LIKERT_5', texto: 'Com que frequência você não tem tempo suficiente para completar todas as suas tarefas?' },
  { id: 4, dimensao: 'DEMANDAS_PSICOLOGICAS', invertida: false, tipo: 'LIKERT_5', texto: 'Seu trabalho exige um grande esforço emocional?' },
  { id: 5, dimensao: 'DEMANDAS_PSICOLOGICAS', invertida: false, tipo: 'LIKERT_5', texto: 'Você precisa lidar com sentimentos difíceis de outras pessoas (clientes, colegas, pacientes) no seu trabalho?' },

  // 2. Organizacao do Trabalho e Conteudo (6) — RECURSO (baixa = risco)
  { id: 6,  dimensao: 'ORGANIZACAO_TRABALHO', invertida: false, tipo: 'LIKERT_5', texto: 'Você tem influência sobre as decisões importantes que afetam o seu trabalho?' },
  { id: 7,  dimensao: 'ORGANIZACAO_TRABALHO', invertida: false, tipo: 'LIKERT_5', texto: 'Você tem voz na escolha das pessoas com quem trabalha?' },
  { id: 8,  dimensao: 'ORGANIZACAO_TRABALHO', invertida: false, tipo: 'LIKERT_5', texto: 'Você tem influência sobre a quantidade de trabalho que lhe é atribuída?' },
  { id: 9,  dimensao: 'ORGANIZACAO_TRABALHO', invertida: false, tipo: 'LIKERT_5', texto: 'Você sente que o seu trabalho tem significado e propósito?' },
  { id: 10, dimensao: 'ORGANIZACAO_TRABALHO', invertida: false, tipo: 'LIKERT_5', texto: 'Você sente que a empresa valoriza o trabalho que você faz?' },
  { id: 11, dimensao: 'ORGANIZACAO_TRABALHO', invertida: false, tipo: 'LIKERT_5', texto: 'Você tem oportunidade de aprender coisas novas por meio do seu trabalho?' },

  // 3. Relacoes Interpessoais e Lideranca (8) — RECURSO (baixa = risco) exceto Q14 invertida
  { id: 12, dimensao: 'RELACOES_LIDERANCA', invertida: false, tipo: 'LIKERT_5', texto: 'Você sabe exatamente quais são as suas responsabilidades no trabalho?' },
  { id: 13, dimensao: 'RELACOES_LIDERANCA', invertida: false, tipo: 'LIKERT_5', texto: 'Você sabe exatamente o que é esperado de você no trabalho?' },
  { id: 14, dimensao: 'RELACOES_LIDERANCA', invertida: true,  tipo: 'LIKERT_5', texto: 'Você recebe informações contraditórias de pessoas diferentes sobre o que precisa fazer?' },
  { id: 15, dimensao: 'RELACOES_LIDERANCA', invertida: false, tipo: 'LIKERT_5', texto: 'Os seus superiores planejam bem o trabalho da equipe?' },
  { id: 16, dimensao: 'RELACOES_LIDERANCA', invertida: false, tipo: 'LIKERT_5', texto: 'Os seus superiores são bons em resolver conflitos?' },
  { id: 17, dimensao: 'RELACOES_LIDERANCA', invertida: false, tipo: 'LIKERT_5', texto: 'O seu superior imediato ouve as suas opiniões e ideias?' },
  { id: 18, dimensao: 'RELACOES_LIDERANCA', invertida: false, tipo: 'LIKERT_5', texto: 'Existe um bom espírito de cooperação entre os colegas de trabalho?' },
  { id: 19, dimensao: 'RELACOES_LIDERANCA', invertida: false, tipo: 'LIKERT_5', texto: 'Seus colegas estão dispostos a ouvir seus problemas de trabalho?' },

  // 4. Interface Trabalho-Familia e Valores (6) — DEMANDA quando ruim
  { id: 20, dimensao: 'INTERFACE_TRABALHO_FAMILIA', invertida: false, tipo: 'LIKERT_5', texto: 'Você sente que o seu trabalho ocupa tanto do seu tempo que prejudica sua vida pessoal e familiar?' },
  { id: 21, dimensao: 'INTERFACE_TRABALHO_FAMILIA', invertida: false, tipo: 'LIKERT_5', texto: 'Seus supervisores e colegas respeitam você como pessoa?' },
  { id: 22, dimensao: 'INTERFACE_TRABALHO_FAMILIA', invertida: false, tipo: 'LIKERT_5', texto: 'Você sente que as pessoas são tratadas de forma justa na sua empresa?' },
  { id: 23, dimensao: 'INTERFACE_TRABALHO_FAMILIA', invertida: false, tipo: 'LIKERT_5', texto: 'Existe confiança entre a direção da empresa e os funcionários?' },
  { id: 24, dimensao: 'INTERFACE_TRABALHO_FAMILIA', invertida: false, tipo: 'LIKERT_5', texto: 'Você sente medo de ser transferido contra a sua vontade?' },
  { id: 25, dimensao: 'INTERFACE_TRABALHO_FAMILIA', invertida: false, tipo: 'LIKERT_5', texto: 'Você sente medo de ser demitido?' },

  // 5. Saude e Bem-Estar (5) — AUTOAVALIACAO
  { id: 26, dimensao: 'SAUDE_BEM_ESTAR', invertida: false, tipo: 'LIKERT_5', texto: 'De modo geral, como você avalia a sua saúde atual?' },
  { id: 27, dimensao: 'SAUDE_BEM_ESTAR', invertida: false, tipo: 'LIKERT_5', texto: 'Com que frequência você se sente cansado, mesmo quando dorme o suficiente?' },
  { id: 28, dimensao: 'SAUDE_BEM_ESTAR', invertida: false, tipo: 'LIKERT_5', texto: 'Com que frequência você tem tido dificuldade para dormir?' },
  { id: 29, dimensao: 'SAUDE_BEM_ESTAR', invertida: false, tipo: 'LIKERT_5', texto: 'Com que frequência você se sente tenso ou estressado?' },
  { id: 30, dimensao: 'SAUDE_BEM_ESTAR', invertida: false, tipo: 'LIKERT_5', texto: 'Com que frequência você se sente irritável?' },

  // 6. Comportamentos Ofensivos + Satisfacao (10) — mistura Sim/Nao + Likert
  { id: 31, dimensao: 'COMPORTAMENTOS_OFENSIVOS', invertida: false, tipo: 'SIM_NAO', texto: 'Nos últimos 12 meses, você foi exposto a bullying ou assédio moral no local de trabalho?' },
  { id: 32, dimensao: 'COMPORTAMENTOS_OFENSIVOS', invertida: false, tipo: 'SIM_NAO', texto: 'Nos últimos 12 meses, você foi exposto a ameaças de violência no trabalho?' },
  { id: 33, dimensao: 'COMPORTAMENTOS_OFENSIVOS', invertida: false, tipo: 'SIM_NAO', texto: 'Nos últimos 12 meses, você foi exposto a assédio sexual no trabalho?' },
  { id: 34, dimensao: 'COMPORTAMENTOS_OFENSIVOS', invertida: false, tipo: 'SIM_NAO', texto: 'Nos últimos 12 meses, você foi exposto a algum tipo de discriminação no trabalho?' },
  { id: 35, dimensao: 'COMPORTAMENTOS_OFENSIVOS', invertida: false, tipo: 'LIKERT_5', texto: 'Você considera seriamente deixar a empresa nos próximos meses?' },
  { id: 36, dimensao: 'COMPORTAMENTOS_OFENSIVOS', invertida: true,  tipo: 'LIKERT_5', texto: 'De modo geral, você está satisfeito com o seu trabalho atual?' },
  { id: 37, dimensao: 'COMPORTAMENTOS_OFENSIVOS', invertida: true,  tipo: 'LIKERT_5', texto: 'Você sente que recebe feedback adequado sobre seu desempenho?' },
  { id: 38, dimensao: 'COMPORTAMENTOS_OFENSIVOS', invertida: true,  tipo: 'LIKERT_5', texto: 'Você sente que tem oportunidades reais de desenvolvimento dentro da empresa?' },
  { id: 39, dimensao: 'COMPORTAMENTOS_OFENSIVOS', invertida: true,  tipo: 'LIKERT_5', texto: 'Existe previsibilidade sobre mudanças importantes que afetam o seu trabalho?' },
  { id: 40, dimensao: 'COMPORTAMENTOS_OFENSIVOS', invertida: true,  tipo: 'LIKERT_5', texto: 'Você sente que consegue equilibrar bem sua vida pessoal e profissional?' },
]

export const COPSOQ_ESCALA = {
  1: 'Nunca / Quase Nunca',
  2: 'Raramente',
  3: 'Às vezes',
  4: 'Frequentemente',
  5: 'Sempre',
} as const

// Conversao Likert 1-5 -> 0-100 (padrao COPSOQ)
export const COPSOQ_CONVERSAO: Record<number, number> = {
  1: 0,
  2: 25,
  3: 50,
  4: 75,
  5: 100,
}

// Tipo da dimensao: demanda (alta = risco) ou recurso (baixa = risco)
export const COPSOQ_TIPO_DIMENSAO: Record<CopsoqDimensao, 'DEMANDA' | 'RECURSO' | 'AUTOAVALIACAO'> = {
  DEMANDAS_PSICOLOGICAS:       'DEMANDA',
  ORGANIZACAO_TRABALHO:        'RECURSO',
  RELACOES_LIDERANCA:          'RECURSO',
  INTERFACE_TRABALHO_FAMILIA:  'DEMANDA',
  SAUDE_BEM_ESTAR:             'AUTOAVALIACAO',
  COMPORTAMENTOS_OFENSIVOS:    'DEMANDA',
}

export const COPSOQ_DIMENSAO_LABEL: Record<CopsoqDimensao, string> = {
  DEMANDAS_PSICOLOGICAS:       'Demandas Psicológicas',
  ORGANIZACAO_TRABALHO:        'Organização do Trabalho e Conteúdo',
  RELACOES_LIDERANCA:          'Relações Interpessoais e Liderança',
  INTERFACE_TRABALHO_FAMILIA:  'Interface Trabalho-Família e Valores',
  SAUDE_BEM_ESTAR:             'Saúde e Bem-Estar',
  COMPORTAMENTOS_OFENSIVOS:    'Satisfação e Comportamentos Ofensivos',
}

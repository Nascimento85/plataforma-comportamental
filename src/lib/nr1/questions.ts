// ============================================================
// Catalogo das questoes dos 3 instrumentos NR-1
// IMPORTANTE: os campos `texto` estao como PLACEHOLDER ate o Kenio
// enviar os textos verbatim (oficiais Karasek/ERI/COPSOQ II PT-BR).
// Substituir apenas o campo `texto` mantendo IDs e regras (invertida/escala).
// ============================================================

import type { CopsoqDimensao } from './types'

// ============================================================
// KARASEK (JCQ - 10 questoes, Likert 1-4)
// ============================================================
export interface KarasekQuestao {
  id: number            // 1-10
  bloco: 'CONTROLE' | 'DEMANDA'
  invertida: boolean
  texto: string
}

export const KARASEK_QUESTOES: KarasekQuestao[] = [
  // Bloco A - Controle
  { id: 1,  bloco: 'CONTROLE', invertida: false, texto: '[PLACEHOLDER Karasek Q1 - Controle: "Meu trabalho exige que eu aprenda coisas novas."] '},
  { id: 2,  bloco: 'CONTROLE', invertida: false, texto: '[PLACEHOLDER Karasek Q2 - Controle: "Meu trabalho exige muita habilidade ou conhecimento especializado."]' },
  { id: 3,  bloco: 'CONTROLE', invertida: false, texto: '[PLACEHOLDER Karasek Q3 - Controle: "Meu trabalho permite que eu tome decisoes por conta propria."]' },
  { id: 4,  bloco: 'CONTROLE', invertida: true,  texto: '[PLACEHOLDER Karasek Q4 - INVERTIDA - Controle: "Tenho muito pouco a dizer sobre o que acontece comigo no trabalho."]' },
  { id: 5,  bloco: 'CONTROLE', invertida: false, texto: '[PLACEHOLDER Karasek Q5 - Controle: "Tenho oportunidade de desenvolver minhas habilidades especiais."]' },
  // Bloco B - Demanda
  { id: 6,  bloco: 'DEMANDA',  invertida: false, texto: '[PLACEHOLDER Karasek Q6 - Demanda: "Meu trabalho exige que eu trabalhe muito rapido."]' },
  { id: 7,  bloco: 'DEMANDA',  invertida: false, texto: '[PLACEHOLDER Karasek Q7 - Demanda: "Meu trabalho exige que eu trabalhe com muito esforco."]' },
  { id: 8,  bloco: 'DEMANDA',  invertida: true,  texto: '[PLACEHOLDER Karasek Q8 - INVERTIDA - Demanda: "Nao me e pedido que eu faca quantidade excessiva de trabalho."]' },
  { id: 9,  bloco: 'DEMANDA',  invertida: true,  texto: '[PLACEHOLDER Karasek Q9 - INVERTIDA - Demanda: "Tenho tempo suficiente para realizar o meu trabalho."]' },
  { id: 10, bloco: 'DEMANDA',  invertida: true,  texto: '[PLACEHOLDER Karasek Q10 - INVERTIDA - Demanda: "Meu trabalho e livre de demandas conflitantes."]' },
]

export const KARASEK_ESCALA = {
  1: 'Discordo Fortemente',
  2: 'Discordo',
  3: 'Concordo',
  4: 'Concordo Fortemente',
} as const

// ============================================================
// ERI (Effort-Reward Imbalance - 17 questoes, Likert 1-5)
// ============================================================
export interface ERIQuestao {
  id: number              // 1-17
  bloco: 'ESFORCO' | 'RECOMPENSA'
  texto: string
}

export const ERI_QUESTOES: ERIQuestao[] = [
  // Bloco Esforco (6 questoes)
  { id: 1, bloco: 'ESFORCO',    texto: '[PLACEHOLDER ERI Q1 - Esforco: "Tenho constantes interrupcoes e perturbacoes no meu trabalho."]' },
  { id: 2, bloco: 'ESFORCO',    texto: '[PLACEHOLDER ERI Q2 - Esforco: "Tenho muita responsabilidade no meu trabalho."]' },
  { id: 3, bloco: 'ESFORCO',    texto: '[PLACEHOLDER ERI Q3 - Esforco: "Sou pressionado a trabalhar horas extras."]' },
  { id: 4, bloco: 'ESFORCO',    texto: '[PLACEHOLDER ERI Q4 - Esforco: "Meu trabalho exige muito fisicamente."]' },
  { id: 5, bloco: 'ESFORCO',    texto: '[PLACEHOLDER ERI Q5 - Esforco: "Nos ultimos anos, meu trabalho tem se tornado cada vez mais exigente."]' },
  { id: 6, bloco: 'ESFORCO',    texto: '[PLACEHOLDER ERI Q6 - Esforco: "Sou frequentemente pressionado pelo tempo."]' },
  // Bloco Recompensa (11 questoes)
  { id: 7,  bloco: 'RECOMPENSA', texto: '[PLACEHOLDER ERI Q7 - Recompensa: "Recebo o respeito que mereco dos meus superiores."]' },
  { id: 8,  bloco: 'RECOMPENSA', texto: '[PLACEHOLDER ERI Q8 - Recompensa: "Recebo o respeito que mereco dos meus colegas."]' },
  { id: 9,  bloco: 'RECOMPENSA', texto: '[PLACEHOLDER ERI Q9 - Recompensa: "Recebo apoio adequado em situacoes dificeis."]' },
  { id: 10, bloco: 'RECOMPENSA', texto: '[PLACEHOLDER ERI Q10 - Recompensa: "Sou tratado de forma justa no trabalho."]' },
  { id: 11, bloco: 'RECOMPENSA', texto: '[PLACEHOLDER ERI Q11 - Recompensa: "Minhas perspectivas de promocao sao adequadas."]' },
  { id: 12, bloco: 'RECOMPENSA', texto: '[PLACEHOLDER ERI Q12 - Recompensa: "Estou enfrentando uma piora na situacao do meu trabalho."]' },
  { id: 13, bloco: 'RECOMPENSA', texto: '[PLACEHOLDER ERI Q13 - Recompensa: "Minha estabilidade no emprego e boa."]' },
  { id: 14, bloco: 'RECOMPENSA', texto: '[PLACEHOLDER ERI Q14 - Recompensa: "Minha posicao atual reflete adequadamente minha educacao e treinamento."]' },
  { id: 15, bloco: 'RECOMPENSA', texto: '[PLACEHOLDER ERI Q15 - Recompensa: "Considerando todos os meus esforcos, recebo o respeito merecido."]' },
  { id: 16, bloco: 'RECOMPENSA', texto: '[PLACEHOLDER ERI Q16 - Recompensa: "Considerando todos os meus esforcos, minhas perspectivas profissionais sao adequadas."]' },
  { id: 17, bloco: 'RECOMPENSA', texto: '[PLACEHOLDER ERI Q17 - Recompensa: "Considerando todos os meus esforcos, meu salario e adequado."]' },
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
// ============================================================
export interface CopsoqQuestao {
  id: number          // 1-40
  dimensao: CopsoqDimensao
  invertida: boolean
  // Tipo de questao: maioria 1-5 (Likert escala temporal); 38-40 sao SIM_NAO
  tipo: 'LIKERT_5' | 'SIM_NAO'
  texto: string
}

export const COPSOQ_QUESTOES: CopsoqQuestao[] = [
  // 1. Demandas Psicologicas (5)
  { id: 1, dimensao: 'DEMANDAS_PSICOLOGICAS', invertida: false, tipo: 'LIKERT_5', texto: '[PLACEHOLDER COPSOQ Q1 - "Voce tem que trabalhar muito rapido?"]' },
  { id: 2, dimensao: 'DEMANDAS_PSICOLOGICAS', invertida: false, tipo: 'LIKERT_5', texto: '[PLACEHOLDER COPSOQ Q2 - "O seu trabalho e distribuido de forma desigual, acumulando tarefas?"]' },
  { id: 3, dimensao: 'DEMANDAS_PSICOLOGICAS', invertida: false, tipo: 'LIKERT_5', texto: '[PLACEHOLDER COPSOQ Q3 - "Com que frequencia voce nao tem tempo para completar todas as suas tarefas?"]' },
  { id: 4, dimensao: 'DEMANDAS_PSICOLOGICAS', invertida: false, tipo: 'LIKERT_5', texto: '[PLACEHOLDER COPSOQ Q4 - "O seu trabalho exige um grande esforco emocional?"]' },
  { id: 5, dimensao: 'DEMANDAS_PSICOLOGICAS', invertida: false, tipo: 'LIKERT_5', texto: '[PLACEHOLDER COPSOQ Q5 - "Voce precisa lidar com sentimentos dificeis de outras pessoas no trabalho?"]' },

  // 2. Organizacao do Trabalho e Conteudo (6) — eh DIMENSAO DE RECURSO (baixa = risco)
  { id: 6,  dimensao: 'ORGANIZACAO_TRABALHO', invertida: false, tipo: 'LIKERT_5', texto: '[PLACEHOLDER COPSOQ Q6 - "Voce tem influencia sobre as decisoes importantes que afetam o seu trabalho?"]' },
  { id: 7,  dimensao: 'ORGANIZACAO_TRABALHO', invertida: false, tipo: 'LIKERT_5', texto: '[PLACEHOLDER COPSOQ Q7 - "Voce tem voz na escolha de com quem trabalha?"]' },
  { id: 8,  dimensao: 'ORGANIZACAO_TRABALHO', invertida: false, tipo: 'LIKERT_5', texto: '[PLACEHOLDER COPSOQ Q8 - "Voce tem influencia sobre a quantidade de trabalho que lhe e atribuida?"]' },
  { id: 9,  dimensao: 'ORGANIZACAO_TRABALHO', invertida: false, tipo: 'LIKERT_5', texto: '[PLACEHOLDER COPSOQ Q9 - "O seu trabalho tem significado?"]' },
  { id: 10, dimensao: 'ORGANIZACAO_TRABALHO', invertida: false, tipo: 'LIKERT_5', texto: '[PLACEHOLDER COPSOQ Q10 - "Voce sente que a empresa valoriza o seu trabalho?"]' },
  { id: 11, dimensao: 'ORGANIZACAO_TRABALHO', invertida: false, tipo: 'LIKERT_5', texto: '[PLACEHOLDER COPSOQ Q11 - "Voce tem oportunidade de aprender coisas novas no trabalho?"]' },

  // 3. Relacoes Interpessoais e Lideranca (8) — RECURSO (baixa = risco) exceto Q14
  { id: 12, dimensao: 'RELACOES_LIDERANCA', invertida: false, tipo: 'LIKERT_5', texto: '[PLACEHOLDER COPSOQ Q12 - "Voce sabe exatamente quais sao as suas responsabilidades?"]' },
  { id: 13, dimensao: 'RELACOES_LIDERANCA', invertida: false, tipo: 'LIKERT_5', texto: '[PLACEHOLDER COPSOQ Q13 - "Voce sabe exatamente o que e esperado de voce no trabalho?"]' },
  { id: 14, dimensao: 'RELACOES_LIDERANCA', invertida: true,  tipo: 'LIKERT_5', texto: '[PLACEHOLDER COPSOQ Q14 - INVERTIDA - "Recebe informacoes contraditorias de pessoas diferentes?"]' },
  { id: 15, dimensao: 'RELACOES_LIDERANCA', invertida: false, tipo: 'LIKERT_5', texto: '[PLACEHOLDER COPSOQ Q15 - "Os seus superiores planejam bem o trabalho?"]' },
  { id: 16, dimensao: 'RELACOES_LIDERANCA', invertida: false, tipo: 'LIKERT_5', texto: '[PLACEHOLDER COPSOQ Q16 - "Os seus superiores sao bons em resolver conflitos?"]' },
  { id: 17, dimensao: 'RELACOES_LIDERANCA', invertida: false, tipo: 'LIKERT_5', texto: '[PLACEHOLDER COPSOQ Q17 - "O seu superior imediato ouve as suas opinioes?"]' },
  { id: 18, dimensao: 'RELACOES_LIDERANCA', invertida: false, tipo: 'LIKERT_5', texto: '[PLACEHOLDER COPSOQ Q18 - "Existe um bom espirito de cooperacao entre os colegas?"]' },
  { id: 19, dimensao: 'RELACOES_LIDERANCA', invertida: false, tipo: 'LIKERT_5', texto: '[PLACEHOLDER COPSOQ Q19 - "Seus colegas estao dispostos a ouvir seus problemas de trabalho?"]' },

  // 4. Interface Trabalho-Familia e Valores (6)
  { id: 20, dimensao: 'INTERFACE_TRABALHO_FAMILIA', invertida: false, tipo: 'LIKERT_5', texto: '[PLACEHOLDER COPSOQ Q20 - "Voce sente que o seu trabalho toma tanto do seu tempo que afeta sua vida familiar?"]' },
  { id: 21, dimensao: 'INTERFACE_TRABALHO_FAMILIA', invertida: false, tipo: 'LIKERT_5', texto: '[PLACEHOLDER COPSOQ Q21 - "Seus supervisores e colegas respeitam voce como pessoa?"]' },
  { id: 22, dimensao: 'INTERFACE_TRABALHO_FAMILIA', invertida: false, tipo: 'LIKERT_5', texto: '[PLACEHOLDER COPSOQ Q22 - "Voce sente que as pessoas sao tratadas de forma justa na empresa?"]' },
  { id: 23, dimensao: 'INTERFACE_TRABALHO_FAMILIA', invertida: false, tipo: 'LIKERT_5', texto: '[PLACEHOLDER COPSOQ Q23 - "Existe confianca entre a direcao e os funcionarios?"]' },
  { id: 24, dimensao: 'INTERFACE_TRABALHO_FAMILIA', invertida: false, tipo: 'LIKERT_5', texto: '[PLACEHOLDER COPSOQ Q24 - "Voce tem medo de ser transferido contra a sua vontade?"]' },
  { id: 25, dimensao: 'INTERFACE_TRABALHO_FAMILIA', invertida: false, tipo: 'LIKERT_5', texto: '[PLACEHOLDER COPSOQ Q25 - "Voce tem medo de ser despedido?"]' },

  // 5. Saude e Bem-Estar (5) — AUTOAVALIACAO (alta = bom estado, mas usado como demanda quando ruim)
  { id: 26, dimensao: 'SAUDE_BEM_ESTAR', invertida: false, tipo: 'LIKERT_5', texto: '[PLACEHOLDER COPSOQ Q26 - "De modo geral, como voce avalia sua saude atual?"]' },
  { id: 27, dimensao: 'SAUDE_BEM_ESTAR', invertida: false, tipo: 'LIKERT_5', texto: '[PLACEHOLDER COPSOQ Q27 - "Com que frequencia voce se sente cansado?"]' },
  { id: 28, dimensao: 'SAUDE_BEM_ESTAR', invertida: false, tipo: 'LIKERT_5', texto: '[PLACEHOLDER COPSOQ Q28 - "Com que frequencia voce tem tido dificuldade em dormir?"]' },
  { id: 29, dimensao: 'SAUDE_BEM_ESTAR', invertida: false, tipo: 'LIKERT_5', texto: '[PLACEHOLDER COPSOQ Q29 - "Com que frequencia voce se sente tenso ou estressado?"]' },
  { id: 30, dimensao: 'SAUDE_BEM_ESTAR', invertida: false, tipo: 'LIKERT_5', texto: '[PLACEHOLDER COPSOQ Q30 - "Com que frequencia voce se sente irritavel?"]' },

  // 6. Comportamentos Ofensivos (3+ questoes — mantemos 10 nesta versao com mistura LIKERT/SIM_NAO)
  { id: 31, dimensao: 'COMPORTAMENTOS_OFENSIVOS', invertida: false, tipo: 'SIM_NAO', texto: '[PLACEHOLDER COPSOQ Q31 - "Voce foi exposto a bullying no local de trabalho nos ultimos 12 meses? (Sim/Nao)"]' },
  { id: 32, dimensao: 'COMPORTAMENTOS_OFENSIVOS', invertida: false, tipo: 'SIM_NAO', texto: '[PLACEHOLDER COPSOQ Q32 - "Voce foi exposto a ameacas de violencia? (Sim/Nao)"]' },
  { id: 33, dimensao: 'COMPORTAMENTOS_OFENSIVOS', invertida: false, tipo: 'SIM_NAO', texto: '[PLACEHOLDER COPSOQ Q33 - "Voce foi exposto a assedio sexual? (Sim/Nao)"]' },
  { id: 34, dimensao: 'COMPORTAMENTOS_OFENSIVOS', invertida: false, tipo: 'SIM_NAO', texto: '[PLACEHOLDER COPSOQ Q34 - "Voce foi exposto a discriminacao? (Sim/Nao)"]' },
  { id: 35, dimensao: 'COMPORTAMENTOS_OFENSIVOS', invertida: false, tipo: 'LIKERT_5', texto: '[PLACEHOLDER COPSOQ Q35 - "Voce considera deixar a empresa em breve?"]' },
  { id: 36, dimensao: 'COMPORTAMENTOS_OFENSIVOS', invertida: false, tipo: 'LIKERT_5', texto: '[PLACEHOLDER COPSOQ Q36 - "De modo geral, voce esta satisfeito com seu trabalho?"]' },
  { id: 37, dimensao: 'COMPORTAMENTOS_OFENSIVOS', invertida: false, tipo: 'LIKERT_5', texto: '[PLACEHOLDER COPSOQ Q37 - "Voce sente que o feedback que recebe e adequado?"]' },
  { id: 38, dimensao: 'COMPORTAMENTOS_OFENSIVOS', invertida: false, tipo: 'LIKERT_5', texto: '[PLACEHOLDER COPSOQ Q38 - "Voce sente que tem oportunidades de desenvolvimento na empresa?"]' },
  { id: 39, dimensao: 'COMPORTAMENTOS_OFENSIVOS', invertida: false, tipo: 'LIKERT_5', texto: '[PLACEHOLDER COPSOQ Q39 - "Voce sente que ha previsibilidade no seu trabalho?"]' },
  { id: 40, dimensao: 'COMPORTAMENTOS_OFENSIVOS', invertida: false, tipo: 'LIKERT_5', texto: '[PLACEHOLDER COPSOQ Q40 - "Voce sente que ha equilibrio entre vida pessoal e profissional?"]' },
]

export const COPSOQ_ESCALA = {
  1: 'Nunca / Quase Nunca',
  2: 'Raramente',
  3: 'As vezes',
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
  INTERFACE_TRABALHO_FAMILIA:  'RECURSO',
  SAUDE_BEM_ESTAR:             'AUTOAVALIACAO',  // tratado caso a caso
  COMPORTAMENTOS_OFENSIVOS:    'DEMANDA',
}

export const COPSOQ_DIMENSAO_LABEL: Record<CopsoqDimensao, string> = {
  DEMANDAS_PSICOLOGICAS:       'Demandas Psicologicas',
  ORGANIZACAO_TRABALHO:        'Organizacao do Trabalho e Conteudo',
  RELACOES_LIDERANCA:          'Relacoes Interpessoais e Lideranca',
  INTERFACE_TRABALHO_FAMILIA:  'Interface Trabalho-Familia e Valores',
  SAUDE_BEM_ESTAR:             'Saude e Bem-Estar',
  COMPORTAMENTOS_OFENSIVOS:    'Satisfacao e Comportamentos Ofensivos',
}

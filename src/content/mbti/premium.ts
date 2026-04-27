// ============================================================
// Relatório Premium — MBTI (16 tipos)
// Foco: Processamento de Informação e Decisão (cognição).
// Estrutura específica:
//   - Funções Cognitivas (Ni/Ne/Si/Se/Ti/Te/Fi/Fe)
//   - Carreiras Ideais com bandas salariais
//   - Compatibilidade comunicacional com outros tipos
// ============================================================

export type MbtiType =
  | 'INTJ'|'INTP'|'ENTJ'|'ENTP'
  | 'INFJ'|'INFP'|'ENFJ'|'ENFP'
  | 'ISTJ'|'ISFJ'|'ESTJ'|'ESFJ'
  | 'ISTP'|'ISFP'|'ESTP'|'ESFP'

export type CognitiveFunction =
  | 'Ni'|'Ne'|'Si'|'Se'|'Ti'|'Te'|'Fi'|'Fe'

export interface MbtiPremium {
  type: MbtiType
  archetype: string                          // "Estrategista" etc
  pitch: string
  paletteHex: string

  cognition: {
    stack: [CognitiveFunction, CognitiveFunction, CognitiveFunction, CognitiveFunction]
    explanation: string                      // como o cérebro processa
    decisionRule: string                     // como decide na prática
  }

  careers: {
    summary: string
    matches: Array<{
      role:        string
      whyFits:     string
      bandBrlMonthly: string                 // ex: "R$ 12k–28k"
      caveat:      string                    // o ponto cego no cargo
    }>
    avoid: string[]
  }

  relationships: {
    bestMatchFor: 'communication' | 'romance' | 'team'  // contexto
    pairings: Array<{
      withType: MbtiType
      dynamic:  string
      script:   string                       // como o usuário deve falar com aquele tipo
    }>
  }

  pdi21Days: Array<{ day: number; focus: string; task: string }>
}

// ──────────────────────────────────────────────────────────
// EXEMPLO DENSO: INTJ — O ESTRATEGISTA
// ──────────────────────────────────────────────────────────
export const intjPremium: MbtiPremium = {
  type: 'INTJ',
  archetype: 'O Estrategista',
  pitch: 'Você joga xadrez 4 movimentos à frente. O preço é viver no futuro enquanto a vida acontece no presente. Aqui você reaprende presença sem perder visão.',
  paletteHex: '#3a4f8c',

  cognition: {
    stack: ['Ni','Te','Fi','Se'],
    explanation:
      'Sua função dominante é Ni (Intuição Introvertida): você sintetiza padrões em visões de longo prazo. Te (Pensamento Extrovertido) executa essas visões em sistemas. Fi (Sentimento Introvertido) é seu termômetro de valor pessoal. Se (Sensação Extrovertida) é sua função inferior — onde você desliga: presente sensorial, prazer físico, espontaneidade.',
    decisionRule:
      'Você decide pela visão (Ni) e racionaliza pela eficiência (Te). Ignora o impacto emocional imediato (Fi virada para dentro) e sub-experiencia o presente (Se inferior). Resultado: decisões brilhantes a longo prazo, frias no curto.',
  },

  careers: {
    summary:
      'INTJ ganha onde estratégia abstrata vira sistema executável. Perde em ambiente operacional puro ou em vendas relacionais.',
    matches: [
      { role: 'CTO / Diretor de Engenharia', whyFits: 'Visão técnica + execução sistemática.', bandBrlMonthly: 'R$ 25k–60k+', caveat: 'Cuidado com isolamento: o cargo exige liderar humanos, não só código.' },
      { role: 'Estrategista de Negócio',    whyFits: 'Antecipa cenários e desenha rota.',     bandBrlMonthly: 'R$ 15k–40k',   caveat: 'Equipe pode te achar distante. Faça 1:1 ritualizado.' },
      { role: 'Cientista de Dados Sênior',  whyFits: 'Extrair padrão de complexidade é seu jogo.', bandBrlMonthly: 'R$ 14k–32k', caveat: 'Não fique só no notebook. Suba no púlpito a cada trimestre.' },
      { role: 'Empreendedor SaaS B2B',      whyFits: 'Visão + sistema + paciência longa.',    bandBrlMonthly: 'Variável (R$ 0 a infinito)', caveat: 'Vendas iniciais matam INTJ — terceirize ou contrate INFJ/ENTP.' },
    ],
    avoid: [
      'Vendas porta-a-porta (alta exigência social/emocional)',
      'Atendimento ao cliente em linha de frente',
      'Funções operacionais 100% repetitivas sem horizonte de melhoria',
    ],
  },

  relationships: {
    bestMatchFor: 'communication',
    pairings: [
      {
        withType: 'ENFP',
        dynamic: 'Visão se encontra com possibilidade. ENFP energiza o INTJ; INTJ aterra o ENFP. Risco: INTJ acha ENFP "disperso", ENFP acha INTJ "frio".',
        script: 'Para falar com ENFP: comece com a visão (não o plano). "Imagina se a gente conseguisse X". Depois aterra com 2 passos.',
      },
      {
        withType: 'ESFJ',
        dynamic: 'Polos opostos. ESFJ vive no presente social, INTJ no futuro abstrato. Conflito comum: você "esquece" aniversário; ele(a) sente desamor.',
        script: 'Para ESFJ: agende lembretes de gestos pequenos. "Lembrei de você porque…" funciona mais que jantar caro 1x ao ano.',
      },
      {
        withType: 'ISTP',
        dynamic: 'Ambos pragmáticos, ambos calados. Ótimo trabalho em projetos técnicos. Risco: relação fica fria sem conversa intencional.',
        script: 'Para ISTP: vá direto ao problema, sem teoria. "Aqui o problema. Aqui 2 caminhos. Qual escolhe?". Ele responde rápido.',
      },
      {
        withType: 'ENTJ',
        dynamic: 'Dois generais na mesma sala. Excelente em executar visão. Risco: briga por controle.',
        script: 'Para ENTJ: cheguem em acordo antes da reunião externa. Em público, mostrem alinhados. Privado, briguem à vontade.',
      },
    ],
  },

  pdi21Days: [
    { day: 1, focus: 'Se inferior', task: 'Coma uma refeição em 30 min sem celular. Note 5 sabores.' },
    { day: 2, focus: 'Fe ausente',   task: 'Pergunte a 1 pessoa: "como você está?" e fique 5 min ouvindo. Sem dar conselho.' },
    { day: 3, focus: 'Presença',     task: 'Caminhada de 25 min no bairro. Conte quantas árvores diferentes vê.' },
    { day: 4, focus: 'Te disciplina', task: 'Bloqueie 90 min de trabalho profundo no projeto mais importante.' },
    { day: 5, focus: 'Fi',            task: 'Escreva: "quais valores eu negocio sem perceber para entregar resultado?"' },
    { day: 6, focus: 'Reflexão',      task: 'Diário 5 linhas: como o presente foi diferente esta semana?' },
    { day: 7, focus: 'Off',           task: 'Domingo SEM planejar nada.' },
    // … expanda até 21
  ],
}

// Esqueleto para os 15 demais
const sk = (type: MbtiType, archetype: string, pitch: string, paletteHex: string) => ({
  type, archetype, pitch, paletteHex,
})

export const MBTI_PREMIUM: Record<MbtiType, Partial<MbtiPremium>> = {
  INTJ: intjPremium,
  INTP: sk('INTP', 'O Lógico',         'Sua mente é uma biblioteca infinita. Você só precisa abrir uma porta e usar.', '#3a4f8c'),
  ENTJ: sk('ENTJ', 'O Comandante',     'Liderar é instintivo. Servir é a próxima fronteira.',                            '#8c2f17'),
  ENTP: sk('ENTP', 'O Inovador',       'Você gera 10 ideias por minuto. Termine 1 por mês e o mundo muda.',              '#d4943a'),
  INFJ: sk('INFJ', 'O Conselheiro',    'Você sente o que outros mal entendem. Aprenda a se proteger sem se isolar.',     '#8c4b8c'),
  INFP: sk('INFP', 'O Idealista',      'Sua sensibilidade é dom. Hora de torná-la útil ao mundo.',                       '#a8522e'),
  ENFJ: sk('ENFJ', 'O Protagonista',   'Liderar pessoas é vocação. Cuidado com a auto-negligência.',                     '#c4633a'),
  ENFP: sk('ENFP', 'O Inspirador',     'Sua energia incendeia. Disciplina é o cano que leva o fogo até a vela.',         '#d4943a'),
  ISTJ: sk('ISTJ', 'O Logístico',      'Você é a coluna que sustenta. Aprenda a também voar.',                           '#3a6db4'),
  ISFJ: sk('ISFJ', 'O Defensor',       'Cuidado é seu dom. Não se esqueça de cuidar de si.',                              '#7a9e7e'),
  ESTJ: sk('ESTJ', 'O Executivo',      'Ordem é seu superpoder. Flexibilidade é a próxima escola.',                      '#8c2f17'),
  ESFJ: sk('ESFJ', 'O Cônsul',         'Você lê o ambiente como ninguém. Olhe para dentro também.',                      '#c4633a'),
  ISTP: sk('ISTP', 'O Virtuoso',       'Mãos que resolvem qualquer coisa. Ainda falta resolver o "eu".',                  '#3a4f8c'),
  ISFP: sk('ISFP', 'O Aventureiro',    'Você é poesia em movimento. Compromisso é a forma de ela durar.',                 '#a8522e'),
  ESTP: sk('ESTP', 'O Empreendedor',   'Ação é seu instinto. Reflexão é seu próximo nível.',                              '#d4943a'),
  ESFP: sk('ESFP', 'O Animador',       'Você é vida em festa. Constância é o palco que sustenta o show.',                  '#c4633a'),
}

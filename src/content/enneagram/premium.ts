// ============================================================
// Relatório Premium — ENEAGRAMA (Tipos 1–9)
// Foco: Motivações Profundas e Traumas de Infância.
// Estrutura específica:
//   - Caminhos de Crescimento (Integração) e Estresse (Desintegração)
//   - Criança Interior — ferida original
//   - Subtipos por Instinto (Social, Sexual, Preservação)
//   - Níveis de Consciência (1–9 de Riso/Hudson)
// ============================================================

export type EnneagramKey = '1'|'2'|'3'|'4'|'5'|'6'|'7'|'8'|'9'
export type Instinct = 'SOCIAL' | 'SEXUAL' | 'PRESERVATION'

export interface EnneagramPremium {
  key: EnneagramKey
  name:  string                              // "O Reformador"
  pitch: string
  paletteHex: string

  motivations: {
    coreFear:    string
    coreDesire:  string
    coreBelief:  string
  }

  childWound: {
    storyline:   string                      // narrativa da ferida original
    soundtrack:  string[]                    // mensagens internas que o tipo escuta
    reparenting: string[]                    // 5 passos para reparentar
  }

  movement: {
    integration:   { goesTo: EnneagramKey; behaviorShift: string; signal: string }   // saúde
    disintegration: { goesTo: EnneagramKey; behaviorShift: string; signal: string }   // estresse
  }

  subtypes: Record<Instinct, { name: string; flavor: string; redFlag: string }>

  levels: Array<{ level: number; tone: string; behavior: string }>  // 9 níveis (1=topo)

  pdi21Days: Array<{ day: number; focus: string; task: string }>
}

// ──────────────────────────────────────────────────────────
// EXEMPLO DENSO: TIPO 8 — O DESAFIADOR
// ──────────────────────────────────────────────────────────
export const type8Premium: EnneagramPremium = {
  key: '8',
  name: 'Tipo 8 — O Desafiador',
  pitch: 'Você protege todo mundo — exceto a parte sua que é tenra. Aqui você aprende que vulnerabilidade é a forma mais alta de força.',
  paletteHex: '#8c2f17',

  motivations: {
    coreFear:   'Ser controlado, traído ou prejudicado por outros.',
    coreDesire: 'Proteger a si mesmo e aos seus, manter a soberania sobre o próprio destino.',
    coreBelief: 'O mundo é um lugar onde os fortes sobrevivem. Mostrar fraqueza é convidar ataque.',
  },

  childWound: {
    storyline:
      'Em algum momento da infância, ser tenro foi punido com quebra de confiança ou abandono. Você aprendeu cedo que, para sobreviver emocionalmente, era preciso "armar-se primeiro".',
    soundtrack: [
      '"Se eu não controlar, alguém vai me controlar."',
      '"Mostrar tristeza = ser usado."',
      '"O justo aqui sou eu."',
    ],
    reparenting: [
      '1. Permitir 5 minutos diários de tenrura sem performar nada.',
      '2. Falar com alguém em quem confia sobre 1 medo real (não estratégia).',
      '3. Receber ajuda sem retribuir imediatamente.',
      '4. Dizer "eu não sei" em alta voz — sem qualificação.',
      '5. Permitir-se chorar sem editar a cena depois.',
    ],
  },

  movement: {
    integration: {
      goesTo: '2',
      behaviorShift: 'Passa de "proteger pelo controle" para "proteger pelo cuidado". Lidera servindo.',
      signal: 'Você aceita ajuda sem desconforto. Pergunta às pessoas como elas estão antes de dar ordem.',
    },
    disintegration: {
      goesTo: '5',
      behaviorShift: 'Em estresse forte, você ISOLA — desaparece, desliga, "queima ponte" mentalmente.',
      signal: 'Você corta contato com pessoas que te decepcionaram, sem aviso, e acha que está sendo "honesto".',
    },
  },

  subtypes: {
    SOCIAL: {
      name: 'Solidariedade — "O Camarada"',
      flavor: 'Lidera grupo, defende causas, conhece todo mundo. O 8 que vira ativista, sindicalista, mentora.',
      redFlag: 'Negligencia o íntimo. Conhece 500 pessoas e nenhuma sabe o que ele sente.',
    },
    SEXUAL: {
      name: 'Posse — "O Desafiador Intenso"',
      flavor: 'Cria vínculo de "tudo ou nada". Espera lealdade absoluta — e dá igual em troca.',
      redFlag: 'Ciúme. Confunde possessividade com amor. Testa lealdade do parceiro com pequenas provocações.',
    },
    PRESERVATION: {
      name: 'Sobrevivência — "Construtor de Império"',
      flavor: 'Foca em controle de recursos: dinheiro, território, segurança. Trabalha para nunca depender.',
      redFlag: 'Materialismo defensivo. Acumula sem desfrutar. Confunde patrimônio com paz.',
    },
  },

  levels: [
    { level: 1, tone: 'SAÚDE',       behavior: 'Magnânima. Usa força para proteger os menores. Vulnerabilidade visível.' },
    { level: 2, tone: 'SAÚDE',       behavior: 'Líder confiável. Decide com clareza. Defende justiça.' },
    { level: 3, tone: 'SAÚDE',       behavior: 'Empreendedor. Cria estrutura. Inspira lealdade.' },
    { level: 4, tone: 'NORMAL',      behavior: 'Combativo. Assume comando antes de ser convidado.' },
    { level: 5, tone: 'NORMAL',      behavior: 'Domina espaço. Insiste em ser ouvido. Tom alto.' },
    { level: 6, tone: 'NORMAL',      behavior: 'Confronto torna-se rotina. Vira "aquele que briga com tudo".' },
    { level: 7, tone: 'DOENTE',      behavior: 'Manipulação aberta. Usa medo para conseguir o que quer.' },
    { level: 8, tone: 'DOENTE',      behavior: 'Vingativo. Quer punir quem o "traiu". Queima pontes.' },
    { level: 9, tone: 'PATOLÓGICO',  behavior: 'Destrutivo. Pode chegar à violência ou autodestruição.' },
  ],

  pdi21Days: [
    { day: 1, focus: 'Tenrura',        task: 'Pergunte ao parceiro/filho: "como você se sente comigo essa semana?" e SÓ ESCUTE.' },
    { day: 2, focus: 'Vulnerabilidade', task: 'Conte para 1 pessoa próxima 1 medo seu, sem plano de solução.' },
    { day: 3, focus: 'Receber',        task: 'Aceite ajuda em algo. Não retribua hoje.' },
    { day: 4, focus: 'Pausa',          task: 'Em conflito hoje, espere 1h antes de responder.' },
    { day: 5, focus: 'Não saber',      task: 'Diga "eu não sei" em pelo menos 3 conversas.' },
    { day: 6, focus: 'Reflexão',       task: 'Escreva: "qual parte minha eu protejo escondendo?".' },
    { day: 7, focus: 'Off',            task: 'Repouso. Sem comandar nada.' },
    // … expanda até 21
  ],
}

// Esqueletos para os outros 8 tipos — preencher iterando o prompt
const skeleton = (key: EnneagramKey, name: string, pitch: string, paletteHex: string) => ({
  key, name, pitch, paletteHex,
})

export const ENNEAGRAM_PREMIUM: Record<EnneagramKey, Partial<EnneagramPremium>> = {
  '1': skeleton('1', 'Tipo 1 — O Reformador',     'Perfeição é uma armadilha de quem teve que ser bom para sobreviver.', '#3a6db4'),
  '2': skeleton('2', 'Tipo 2 — O Prestativo',     'Cuidar dos outros foi a forma como você aprendeu a ser amada.',        '#a8522e'),
  '3': skeleton('3', 'Tipo 3 — O Realizador',     'Você confunde valor com performance. Aqui descobre quem você É.',      '#d4943a'),
  '4': skeleton('4', 'Tipo 4 — O Individualista', 'Sua diferença é dom — mas virou trincheira. Hora de sair.',             '#8c4b8c'),
  '5': skeleton('5', 'Tipo 5 — O Investigador',   'Saber tudo é jeito de não viver nada. Coragem é entrar.',               '#3a4f8c'),
  '6': skeleton('6', 'Tipo 6 — O Leal',           'Sua mente prepara para o pior. A vida acontece no enquanto.',           '#7a8298'),
  '7': skeleton('7', 'Tipo 7 — O Entusiasta',     'A próxima coisa nunca é a coisa. Termine 1 antes de procurar a próxima.','#d4a93a'),
  '8': type8Premium,
  '9': skeleton('9', 'Tipo 9 — O Pacificador',    'Sua paz pode ser sumiço. Aparecer dói; sumir custa mais.',              '#7a9e7e'),
}

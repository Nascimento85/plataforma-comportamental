// ============================================================
// O Teste do Silêncio: banco de cenários
// ============================================================
// Recorte curto do termômetro de assertividade do Mapa da Comunicação,
// reescrito para o contexto de relacionamento (o banco original só tinha
// cenários de trabalho: reunião, líder, cliente).
//
// Escolha forçada de 4 opções, sempre na mesma ordem canônica:
//   1 = Passiva · 2 = Agressiva · 3 = Passivo-Agressiva · 4 = Assertiva
//
// A sessão sorteia 8 dos 12 cenários e embaralha a ordem das opções, de
// forma determinística: mesma seed = mesma prova.
// ============================================================

export const CAT_SILENCIO = ['PASSIVA', 'AGRESSIVA', 'PASSIVO_AGRESSIVA', 'ASSERTIVA'] as const
export type SilencioCat = (typeof CAT_SILENCIO)[number]

export interface SilencioOption { valor: number; texto: string }
export interface SilencioQuestion {
  id: number
  enunciado: string
  opcoes: SilencioOption[] // sempre em ordem canônica (valor 1,2,3,4)
}

export const SILENCIO_QUESTIONS: SilencioQuestion[] = [
  {
    id: 1,
    enunciado: 'Você está contando uma coisa importante e ele olha para o celular. Você:',
    opcoes: [
      { valor: 1, texto: 'Termina de contar rápido e muda de assunto.' },
      { valor: 2, texto: 'Diz "esquece, já vi que você não liga mesmo".' },
      { valor: 3, texto: 'Para de falar e espera, em silêncio, ele perceber.' },
      { valor: 4, texto: 'Diz que quer a atenção dele e pergunta se é uma boa hora.' },
    ],
  },
  {
    id: 2,
    enunciado: 'Ele esqueceu de novo de um combinado que era importante para você. Você:',
    opcoes: [
      { valor: 1, texto: 'Fala que não tem problema, mesmo doendo.' },
      { valor: 2, texto: 'Diz que ele nunca lembra de nada que envolve você.' },
      { valor: 3, texto: 'Responde "tranquilo" com uma voz que deixa claro que não está.' },
      { valor: 4, texto: 'Conta o que sentiu e pede um jeito de isso não se repetir.' },
    ],
  },
  {
    id: 3,
    enunciado: 'Você mandou mensagem de manhã e ele só respondeu à noite. Quando ele chega, você:',
    opcoes: [
      { valor: 1, texto: 'Não comenta. Cada um tem sua rotina.' },
      { valor: 2, texto: 'Pergunta de cara se era tão difícil assim responder.' },
      { valor: 3, texto: 'Responde as falas dele com monossílabos pelo resto da noite.' },
      { valor: 4, texto: 'Diz que ficou incomodada e pergunta o que aconteceu no dia dele.' },
    ],
  },
  {
    id: 4,
    enunciado: 'Ele faz uma piada com você na frente de outras pessoas e todo mundo ri. Você:',
    opcoes: [
      { valor: 1, texto: 'Ri junto e engole o constrangimento.' },
      { valor: 2, texto: 'Devolve na mesma moeda, na frente de todos.' },
      { valor: 3, texto: 'Ri na hora e fica fria com ele pelo resto do encontro.' },
      { valor: 4, texto: 'Deixa passar ali e, a sós, diz que aquela piada te machucou.' },
    ],
  },
  {
    id: 5,
    enunciado: 'A casa está sempre por sua conta, mesmo os dois trabalhando fora. Você:',
    opcoes: [
      { valor: 1, texto: 'Faz calada. Discutir cansa mais do que fazer.' },
      { valor: 2, texto: 'Explode num dia ruim e lista tudo que você faz sozinha.' },
      { valor: 3, texto: 'Deixa a louça acumular de propósito para ele ver.' },
      { valor: 4, texto: 'Chama para sentar e dividir as tarefas de forma clara.' },
    ],
  },
  {
    id: 6,
    enunciado: 'Ele chegou muito mais tarde do que disse e não avisou. Você:',
    opcoes: [
      { valor: 1, texto: 'Finge que estava dormindo e não toca no assunto.' },
      { valor: 2, texto: 'Recebe já perguntando onde ele estava e por quê.' },
      { valor: 3, texto: 'Diz "boa noite" seco e vira para o outro lado.' },
      { valor: 4, texto: 'Diz que ficou preocupada e pede um aviso da próxima vez.' },
    ],
  },
  {
    id: 7,
    enunciado: 'Tem um assunto que sempre termina em briga. Ele aparece de novo. Você:',
    opcoes: [
      { valor: 1, texto: 'Desvia. Não vale a pena estragar a noite.' },
      { valor: 2, texto: 'Entra firme, porque dessa vez ele vai ter que ouvir.' },
      { valor: 3, texto: 'Diz que não quer falar sobre isso, e fica remoendo.' },
      { valor: 4, texto: 'Propõe conversar em outro momento, com os dois mais calmos.' },
    ],
  },
  {
    id: 8,
    enunciado: 'Alguém da família dele passou do limite com você e ele não disse nada. Você:',
    opcoes: [
      { valor: 1, texto: 'Deixa quieto para não criar problema com a família.' },
      { valor: 2, texto: 'Cobra na hora por que ele não te defendeu.' },
      { valor: 3, texto: 'Passa a evitar os encontros, sem explicar o motivo.' },
      { valor: 4, texto: 'Conta como se sentiu e diz o que precisa dele nessas horas.' },
    ],
  },
  {
    id: 9,
    enunciado: 'No meio da discussão ele diz que você está exagerando. Você:',
    opcoes: [
      { valor: 1, texto: 'Recua e começa a achar que talvez seja você mesma.' },
      { valor: 2, texto: 'Aumenta o tom para provar que não está exagerando.' },
      { valor: 3, texto: 'Encerra com um "tá bom" e guarda aquilo por semanas.' },
      { valor: 4, texto: 'Diz que pode estar sentindo demais, mas que o sentimento é real.' },
    ],
  },
  {
    id: 10,
    enunciado: 'A briga passou, mas a casa ficou em silêncio. Você:',
    opcoes: [
      { valor: 1, texto: 'Age normalmente, como se nada tivesse acontecido.' },
      { valor: 2, texto: 'Volta ao assunto para deixar claro quem estava certo.' },
      { valor: 3, texto: 'Mantém o silêncio até ele vir atrás.' },
      { valor: 4, texto: 'Procura ele e diz que quer resolver, não vencer.' },
    ],
  },
  {
    id: 11,
    enunciado: 'Ele pede desculpa rápido, mas dá para ver que não entendeu o que fez. Você:',
    opcoes: [
      { valor: 1, texto: 'Aceita e encerra. Pelo menos ele pediu.' },
      { valor: 2, texto: 'Diz que desculpa sem mudança não vale nada.' },
      { valor: 3, texto: 'Aceita na frente dele e continua magoada por dentro.' },
      { valor: 4, texto: 'Agradece e explica exatamente o que te machucou.' },
    ],
  },
  {
    id: 12,
    enunciado: 'Faz tempo que falta carinho, e você sente falta. Você:',
    opcoes: [
      { valor: 1, texto: 'Espera que ele perceba sozinho.' },
      { valor: 2, texto: 'Reclama que ele não te toca mais como antes.' },
      { valor: 3, texto: 'Se afasta também, para ver se ele sente a diferença.' },
      { valor: 4, texto: 'Diz que está com saudade dele e pede o que quer.' },
    ],
  },
]

// ── sorteio determinístico ───────────────────────────────────

function fnvHash(str: string): number {
  let hash = 0x811c9dc5
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i)
    hash = Math.imul(hash, 0x01000193)
  }
  return hash >>> 0
}
function lcg(state: number) {
  let s = state
  return { next() { s = (s * 1103515245 + 12345) & 0x7fffffff; return s } }
}
function shuffle<T>(arr: T[], seed: string): T[] {
  const rng = lcg(fnvHash(seed))
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = rng.next() % (i + 1)
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export const SILENCIO_POR_SESSAO = 8

export interface SilencioSessionQuestion {
  id: number
  enunciado: string
  opcoes: SilencioOption[] // ordem embaralhada
}

/** Sorteia 8 dos 12 cenários e embaralha as opções. Mesma seed = mesma prova. */
export function getSilencioSessionQuestions(seed: string): SilencioSessionQuestion[] {
  const escolhidas = shuffle(SILENCIO_QUESTIONS, `${seed}:q`).slice(0, SILENCIO_POR_SESSAO)
  return shuffle(escolhidas, `${seed}:ordem`).map((q) => ({
    id: q.id,
    enunciado: q.enunciado,
    opcoes: shuffle(q.opcoes.map((o) => ({ valor: o.valor, texto: o.texto })), `${seed}:opt:${q.id}`),
  }))
}

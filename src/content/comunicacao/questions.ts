// ============================================================
// Mapa da Comunicação (teste autoral)
// Três blocos de cenários, cada um com 4 opções de escolha forçada:
//   PERFIL  -> estilo de comunicação (Murphy): Analítico, Intuitivo, Funcional, Emocional
//   SOCIAL  -> estilo social / energia: Expressivo, Apoiador, Diretivo, Analítico
//   ASSERT  -> termômetro de assertividade: Passiva, Agressiva, Passivo-Agressiva, Assertiva
// A opção carrega `valor` 1..4 = índice canônico da categoria no bloco.
// A sessão sorteia de forma determinística e embaralha a ordem das opções.
// ============================================================

export type CommBloco = 'PERFIL' | 'SOCIAL' | 'ASSERT'

// categorias por bloco, índice = valor - 1
export const CAT_PERFIL = ['ANALITICO', 'INTUITIVO', 'FUNCIONAL', 'EMOCIONAL'] as const
export const CAT_SOCIAL = ['EXPRESSIVO', 'APOIADOR', 'DIRETIVO', 'ANALITICO_S'] as const
export const CAT_ASSERT = ['PASSIVA', 'AGRESSIVA', 'PASSIVO_AGRESSIVA', 'ASSERTIVA'] as const

export const CAT_BY_BLOCO: Record<CommBloco, readonly string[]> = {
  PERFIL: CAT_PERFIL,
  SOCIAL: CAT_SOCIAL,
  ASSERT: CAT_ASSERT,
}

export interface CommOption { valor: number; texto: string }
export interface CommQuestion {
  id: number
  bloco: CommBloco
  enunciado: string
  opcoes: CommOption[] // sempre em ordem canônica (valor 1,2,3,4)
}

export const COMM_QUESTIONS: CommQuestion[] = [
  // ───────────────────────────────────────────────
  // BLOCO PERFIL (Murphy): 1=Analítico 2=Intuitivo 3=Funcional 4=Emocional
  // ───────────────────────────────────────────────
  { id: 1, bloco: 'PERFIL', enunciado: 'Quando apresento uma ideia para a equipe, eu começo por:',
    opcoes: [
      { valor: 1, texto: 'Os dados e números que sustentam a proposta.' },
      { valor: 2, texto: 'A visão geral e onde isso pode nos levar.' },
      { valor: 3, texto: 'O passo a passo de como vamos executar.' },
      { valor: 4, texto: 'Como isso afeta as pessoas e o que elas vão sentir.' },
    ] },
  { id: 2, bloco: 'PERFIL', enunciado: 'O que mais me irrita em uma reunião é:',
    opcoes: [
      { valor: 1, texto: 'Afirmações sem dado nenhum para comprovar.' },
      { valor: 2, texto: 'Ficar preso em detalhes e perder o panorama.' },
      { valor: 3, texto: 'Falar muito e não definir quem faz o quê.' },
      { valor: 4, texto: 'Ignorar como as pessoas estão se sentindo.' },
    ] },
  { id: 3, bloco: 'PERFIL', enunciado: 'Ao mandar um e-mail importante, eu me preocupo em:',
    opcoes: [
      { valor: 1, texto: 'Ser preciso, com fatos e fontes corretas.' },
      { valor: 2, texto: 'Transmitir a ideia central de forma rápida e direta.' },
      { valor: 3, texto: 'Deixar claros os próximos passos e prazos.' },
      { valor: 4, texto: 'Cuidar do tom para a pessoa se sentir bem.' },
    ] },
  { id: 4, bloco: 'PERFIL', enunciado: 'Quando alguém me explica algo, eu prefiro que a pessoa:',
    opcoes: [
      { valor: 1, texto: 'Mostre os números e a lógica por trás.' },
      { valor: 2, texto: 'Vá direto ao ponto, sem rodeios nem detalhes.' },
      { valor: 3, texto: 'Detalhe o processo, etapa por etapa.' },
      { valor: 4, texto: 'Conte com exemplos e histórias de pessoas.' },
    ] },
  { id: 5, bloco: 'PERFIL', enunciado: 'No fundo, o que mais valorizo em uma comunicação é:',
    opcoes: [
      { valor: 1, texto: 'Exatidão. Que esteja certo e comprovado.' },
      { valor: 2, texto: 'Visão. Que mostre o todo e as possibilidades.' },
      { valor: 3, texto: 'Clareza prática. Que eu saiba o que fazer.' },
      { valor: 4, texto: 'Conexão. Que toque e respeite as pessoas.' },
    ] },
  { id: 6, bloco: 'PERFIL', enunciado: 'Os outros costumam me ver como alguém:',
    opcoes: [
      { valor: 1, texto: 'Lógico e detalhista.' },
      { valor: 2, texto: 'Visionário e rápido.' },
      { valor: 3, texto: 'Organizado e prático.' },
      { valor: 4, texto: 'Caloroso e empático.' },
    ] },
  { id: 7, bloco: 'PERFIL', enunciado: 'Diante de uma decisão difícil, meu instinto é:',
    opcoes: [
      { valor: 1, texto: 'Levantar dados e analisar friamente.' },
      { valor: 2, texto: 'Confiar na intuição e no panorama maior.' },
      { valor: 3, texto: 'Montar um plano concreto de execução.' },
      { valor: 4, texto: 'Pensar em quem é impactado e como se sente.' },
    ] },
  { id: 8, bloco: 'PERFIL', enunciado: 'Quando algo não está claro, eu pergunto primeiro:',
    opcoes: [
      { valor: 1, texto: '"Quais são os números e as evidências?"' },
      { valor: 2, texto: '"Aonde isso quer chegar no fim?"' },
      { valor: 3, texto: '"Qual o próximo passo concreto?"' },
      { valor: 4, texto: '"Como as pessoas estão lidando com isso?"' },
    ] },
  { id: 9, bloco: 'PERFIL', enunciado: 'Explicando algo presencialmente, meu corpo e meu tom de voz:',
    opcoes: [
      { valor: 1, texto: 'Ficam contidos e neutros; eu foco nas palavras e nos fatos, não na expressão.' },
      { valor: 2, texto: 'Acompanham a ideia geral; gesticulo para mostrar o panorama, sem me prender a detalhes.' },
      { valor: 3, texto: 'Marcam cada passo; uso as mãos para enumerar etapas e organizar o que digo.' },
      { valor: 4, texto: 'Expressam o que sinto; meu rosto e tom mostram emoção e leem a reação do outro.' },
    ] },
  { id: 10, bloco: 'PERFIL', enunciado: 'Numa reunião online (vídeo), eu me destaco por:',
    opcoes: [
      { valor: 1, texto: 'Trazer dados na tela, compartilhar números e ser preciso no que falo.' },
      { valor: 2, texto: 'Puxar a visão do todo e a direção, sem me perder nos detalhes da pauta.' },
      { valor: 3, texto: 'Organizar a pauta, controlar o tempo e fechar com os próximos passos claros.' },
      { valor: 4, texto: 'Ler o clima pela câmera, dar espaço a cada um e manter o tom acolhedor.' },
    ] },
  { id: 11, bloco: 'PERFIL', enunciado: 'Quando escrevo no WhatsApp do trabalho, eu costumo:',
    opcoes: [
      { valor: 1, texto: 'Ser exato: texto correto, sem erro, com a informação precisa.' },
      { valor: 2, texto: 'Ir direto à ideia central, em mensagens curtas e rápidas.' },
      { valor: 3, texto: 'Detalhar o passo a passo, com listas, prazos e o que cada um faz.' },
      { valor: 4, texto: 'Cuidar do tom, usar saudação e emoji para a mensagem não soar fria.' },
    ] },
  { id: 12, bloco: 'PERFIL', enunciado: 'Quando o outro está falando, eu presto mais atenção:',
    opcoes: [
      { valor: 1, texto: 'Se os argumentos fazem sentido e batem com os fatos.' },
      { valor: 2, texto: 'Aonde a conversa quer chegar, a ideia por trás do que é dito.' },
      { valor: 3, texto: 'No que precisa ser feito e quais os próximos passos.' },
      { valor: 4, texto: 'No tom de voz e na expressão, no que a pessoa sente além das palavras.' },
    ] },
  // ───────────────────────────────────────────────
  // BLOCO SOCIAL: 1=Expressivo 2=Apoiador 3=Diretivo 4=Analítico
  // ───────────────────────────────────────────────
  { id: 20, bloco: 'SOCIAL', enunciado: 'Num grupo, a energia que eu naturalmente trago é:',
    opcoes: [
      { valor: 1, texto: 'Entusiasmo e histórias, eu animo o ambiente.' },
      { valor: 2, texto: 'Escuta e acolhimento, eu cuido do clima.' },
      { valor: 3, texto: 'Objetividade, eu puxo para a ação e o resultado.' },
      { valor: 4, texto: 'Calma e razão, eu trago dados e ordem.' },
    ] },
  { id: 21, bloco: 'SOCIAL', enunciado: 'Em conversas informais no trabalho, eu costumo:',
    opcoes: [
      { valor: 1, texto: 'Falar bastante, gesticular e engajar todo mundo.' },
      { valor: 2, texto: 'Ouvir mais do que falar e dar atenção a cada um.' },
      { valor: 3, texto: 'Ser breve, prefiro ir direto ao que importa.' },
      { valor: 4, texto: 'Ser reservado e pausado, falo o necessário.' },
    ] },
  { id: 22, bloco: 'SOCIAL', enunciado: 'Meu ponto de atenção na comunicação é:',
    opcoes: [
      { valor: 1, texto: 'Falar demais, interromper ou perder o foco.' },
      { valor: 2, texto: 'Dificuldade de dizer não e de dar feedback duro.' },
      { valor: 3, texto: 'Parecer frio, ríspido ou impaciente.' },
      { valor: 4, texto: 'Ser monótono ou lento para decidir.' },
    ] },
  { id: 23, bloco: 'SOCIAL', enunciado: 'O elogio que mais combina comigo é:',
    opcoes: [
      { valor: 1, texto: '"Você contagia e inspira a sala."' },
      { valor: 2, texto: '"Você faz todo mundo se sentir acolhido."' },
      { valor: 3, texto: '"Você é direto e faz acontecer."' },
      { valor: 4, texto: '"Você é preciso e confiável."' },
    ] },
  { id: 24, bloco: 'SOCIAL', enunciado: 'Detesto, numa conversa de trabalho:',
    opcoes: [
      { valor: 1, texto: 'Ambiente sem graça, frio e sem interação.' },
      { valor: 2, texto: 'Conflito aberto e clima de tensão.' },
      { valor: 3, texto: 'Rodeios e enrolação sem ir ao ponto.' },
      { valor: 4, texto: 'Achismo, conversa sem dado nem critério.' },
    ] },
  { id: 25, bloco: 'SOCIAL', enunciado: 'Para fechar uma conversa importante, eu valorizo:',
    opcoes: [
      { valor: 1, texto: 'Que tenha sido envolvente e motivadora.' },
      { valor: 2, texto: 'Que todos tenham saído bem e em harmonia.' },
      { valor: 3, texto: 'Que tenha gerado decisão e ação.' },
      { valor: 4, texto: 'Que tenha ficado tudo claro e correto.' },
    ] },
  { id: 26, bloco: 'SOCIAL', enunciado: 'Quando apresento para uma plateia, meu forte é:',
    opcoes: [
      { valor: 1, texto: 'Carisma e storytelling, eu prendo a atenção.' },
      { valor: 2, texto: 'Empatia, eu leio e acolho a plateia.' },
      { valor: 3, texto: 'Objetividade, eu entrego a mensagem rápido.' },
      { valor: 4, texto: 'Embasamento, eu sustento tudo com dados.' },
    ] },
  { id: 27, bloco: 'SOCIAL', enunciado: 'Numa call com a câmera ligada, a minha presença é:',
    opcoes: [
      { valor: 1, texto: 'Animada e calorosa; eu sorrio, falo bastante e aqueço a reunião.' },
      { valor: 2, texto: 'Atenta e acolhedora; eu escuto, dou espaço e cuido para todos participarem.' },
      { valor: 3, texto: 'Objetiva e enxuta; eu vou ao ponto e foco em decidir e encerrar.' },
      { valor: 4, texto: 'Discreta e pausada; eu falo o necessário e prefiro ouvir e analisar.' },
    ] },
  { id: 28, bloco: 'SOCIAL', enunciado: 'No grupo de WhatsApp da equipe, eu sou aquele que:',
    opcoes: [
      { valor: 1, texto: 'Manda áudio, figurinha e anima a conversa.' },
      { valor: 2, texto: 'Puxa o "bom dia", acolhe e responde todo mundo com atenção.' },
      { valor: 3, texto: 'Vai direto ao assunto e evita conversa que não leva a nada.' },
      { valor: 4, texto: 'Fala pouco, mas quando fala traz dado e precisão.' },
    ] },
  // ───────────────────────────────────────────────
  // BLOCO ASSERT (termômetro): 1=Passiva 2=Agressiva 3=Passivo-Agressiva 4=Assertiva
  // ───────────────────────────────────────────────
  { id: 40, bloco: 'ASSERT', enunciado: 'Um colega te interrompe pela terceira vez na reunião. Você:',
    opcoes: [
      { valor: 1, texto: 'Engole, espera ele terminar e desiste de falar.' },
      { valor: 2, texto: 'Levanta a voz e fala por cima dele.' },
      { valor: 3, texto: 'Fica calado, mas solta uma ironia depois.' },
      { valor: 4, texto: 'Diz com calma: "Deixa eu concluir meu ponto, por favor."' },
    ] },
  { id: 41, bloco: 'ASSERT', enunciado: 'Você discorda da decisão do seu líder em público. Você:',
    opcoes: [
      { valor: 1, texto: 'Concorda para evitar conflito, mesmo discordando.' },
      { valor: 2, texto: 'Rebate na hora dizendo que a decisão está errada.' },
      { valor: 3, texto: 'Concorda na frente dele, mas reclama com os colegas depois.' },
      { valor: 4, texto: 'Pede um momento e expõe sua visão com respeito e argumentos.' },
    ] },
  { id: 42, bloco: 'ASSERT', enunciado: 'Alguém entregou um trabalho abaixo do combinado. Você:',
    opcoes: [
      { valor: 1, texto: 'Refaz você mesmo para não criar atrito.' },
      { valor: 2, texto: 'Critica na frente de todos: "Isso está péssimo."' },
      { valor: 3, texto: 'Faz um comentário sarcástico sobre a qualidade.' },
      { valor: 4, texto: 'Aponta o que faltou de forma específica e combina o ajuste.' },
    ] },
  { id: 43, bloco: 'ASSERT', enunciado: 'Você está sobrecarregado e te pedem mais uma tarefa urgente. Você:',
    opcoes: [
      { valor: 1, texto: 'Aceita calado, mesmo sabendo que não dá conta.' },
      { valor: 2, texto: 'Responde irritado que não é só você que trabalha ali.' },
      { valor: 3, texto: 'Aceita, mas faz por último e de propósito mais devagar.' },
      { valor: 4, texto: 'Explica sua carga atual e negocia prazo ou prioridade.' },
    ] },
  { id: 44, bloco: 'ASSERT', enunciado: 'Um cliente fala com você de forma grosseira. Você:',
    opcoes: [
      { valor: 1, texto: 'Aceita tudo calado para não piorar a situação.' },
      { valor: 2, texto: 'Responde no mesmo tom grosseiro.' },
      { valor: 3, texto: 'Atende com má vontade e demora de propósito.' },
      { valor: 4, texto: 'Mantém a calma, marca o limite e foca em resolver.' },
    ] },
  { id: 45, bloco: 'ASSERT', enunciado: 'Você precisa dar um feedback difícil para alguém da sua equipe. Você:',
    opcoes: [
      { valor: 1, texto: 'Adia ou suaviza tanto que a mensagem se perde.' },
      { valor: 2, texto: 'Fala duro, com julgamentos do tipo "você sempre erra".' },
      { valor: 3, texto: 'Deixa indiretas em reunião esperando a pessoa entender.' },
      { valor: 4, texto: 'Descreve o fato, o impacto e o que espera, com respeito.' },
    ] },
  { id: 46, bloco: 'ASSERT', enunciado: 'Algo te incomodou no comportamento de um colega. Você:',
    opcoes: [
      { valor: 1, texto: 'Guarda para si e segue como se nada fosse.' },
      { valor: 2, texto: 'Solta tudo de uma vez quando a raiva acumula.' },
      { valor: 3, texto: 'Para de cooperar com ele e dá o tratamento de silêncio.' },
      { valor: 4, texto: 'Chama para uma conversa e fala como se sente, sem acusar.' },
    ] },
  { id: 47, bloco: 'ASSERT', enunciado: 'Sob pressão e cobrança forte, a sua comunicação tende a:',
    opcoes: [
      { valor: 1, texto: 'Encolher: você fala menos e cede mais.' },
      { valor: 2, texto: 'Explodir: você fica ríspido e impositivo.' },
      { valor: 3, texto: 'Azedar: você fica irônico e arredio.' },
      { valor: 4, texto: 'Firmar: você fica direto, claro e ainda respeitoso.' },
    ] },
  { id: 48, bloco: 'ASSERT', enunciado: 'Você recebe uma mensagem ríspida no WhatsApp do trabalho. Você:',
    opcoes: [
      { valor: 1, texto: 'Deixa pra lá e responde "ok", engolindo o incômodo.' },
      { valor: 2, texto: 'Responde na hora, no mesmo tom seco e ríspido.' },
      { valor: 3, texto: 'Demora de propósito para responder e manda um "tá" seco.' },
      { valor: 4, texto: 'Respira e responde com calma, marcando o ponto sem hostilidade, ou chama para falar por voz.' },
    ] },
  { id: 49, bloco: 'ASSERT', enunciado: 'Numa reunião online, falaram por cima e cortaram a sua fala. Você:',
    opcoes: [
      { valor: 1, texto: 'Desiste de falar e deixa passar.' },
      { valor: 2, texto: 'Sobe o tom e fala por cima de volta.' },
      { valor: 3, texto: 'Fecha a câmera e se desliga do assunto, em silêncio.' },
      { valor: 4, texto: 'Espera um instante e diz: "só para concluir meu ponto, por favor".' },
    ] },
]

// ============================================================
// Sorteio determinístico e balanceado por bloco
// ============================================================

function fnvHash(seed: string): number {
  let hash = 2166136261
  for (let i = 0; i < seed.length; i++) {
    hash ^= seed.charCodeAt(i)
    hash = Math.imul(hash, 16777619)
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

export interface CommSessionOption { valor: number; texto: string }
export interface CommSessionQuestion {
  id: number
  bloco: CommBloco
  enunciado: string
  opcoes: CommSessionOption[] // ordem embaralhada
}

const POR_BLOCO: Record<CommBloco, number> = { PERFIL: 8, SOCIAL: 6, ASSERT: 6 }

/**
 * Sorteia cenários por bloco (PERFIL, SOCIAL, ASSERT), embaralha a ordem
 * geral e a ordem das opções. Mesma seed = mesma sessão.
 */
export function getCommSessionQuestions(seed: string): CommSessionQuestion[] {
  const blocos: CommBloco[] = ['PERFIL', 'SOCIAL', 'ASSERT']
  let picked: CommQuestion[] = []
  for (const b of blocos) {
    const pool = COMM_QUESTIONS.filter((q) => q.bloco === b)
    picked = picked.concat(shuffle(pool, `${seed}:${b}`).slice(0, POR_BLOCO[b]))
  }
  const ordered = shuffle(picked, `${seed}:order`)
  return ordered.map((q) => ({
    id: q.id,
    bloco: q.bloco,
    enunciado: q.enunciado,
    opcoes: shuffle(q.opcoes.map((o) => ({ valor: o.valor, texto: o.texto })), `${seed}:opt:${q.id}`),
  }))
}

// mapa id -> bloco (a engine usa para saber qual escala pontuar)
export const COMM_QUESTION_BLOCO: Record<number, CommBloco> = Object.fromEntries(
  COMM_QUESTIONS.map((q) => [q.id, q.bloco]),
) as Record<number, CommBloco>

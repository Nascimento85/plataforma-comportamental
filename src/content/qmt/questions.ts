// ============================================================
// QMT — Quociente Mental Triádico
// Banco de questões de escolha forçada (1 de 3).
// Cada questão tem 3 opções, uma por dimensão mental:
//   C = Conceitual (cérebro central, o "porquê", estratégia, visão)
//   I = Intuitivo  (hemisfério direito, o "quem", pessoas, emoção)
//   P = Processual (hemisfério esquerdo, o "como", prática, ordem)
// A sessão sorteia um subconjunto do banco de forma determinística
// e embaralha a ordem das opções (a dimensão correta nunca fica fixa
// na mesma posição). Mesma seed = mesma sessão.
// ============================================================

export type QmtDim = 'C' | 'I' | 'P'

export interface QmtQuestion {
  id: number
  enunciado: string
  opcoes: Record<QmtDim, string>
}

// Dimensão -> valor salvo na resposta (mantém o padrão { questionId, value })
export const QMT_DIM_TO_VALUE: Record<QmtDim, number> = { C: 1, I: 2, P: 3 }
export const QMT_VALUE_TO_DIM: Record<number, QmtDim> = { 1: 'C', 2: 'I', 3: 'P' }

export const QMT_QUESTIONS: QmtQuestion[] = [
  { id: 1,  enunciado: 'Ao iniciar uma tarefa difícil, minha tendência é:',
    opcoes: { C: 'Planejar cada etapa e definir o objetivo final.', I: 'Sentir o clima da situação e buscar inspiração ou apoio.', P: 'Começar a agir imediatamente e resolver conforme o processo anda.' } },
  { id: 2,  enunciado: 'Meu ambiente de trabalho costuma estar:',
    opcoes: { C: 'Organizado de forma a facilitar a visão do todo e das prioridades.', I: 'Com toques pessoais, fotos ou objetos que despertam criatividade.', P: 'Funcional, com as ferramentas necessárias à mão para uso imediato.' } },
  { id: 3,  enunciado: 'Tomo decisões baseando me principalmente em:',
    opcoes: { C: 'Lógica, visão de longo prazo e princípios.', I: 'Intuição, sentimentos e impacto nas pessoas envolvidas.', P: 'Dados práticos, fatos concretos e resultados imediatos.' } },
  { id: 4,  enunciado: 'Em uma reunião de equipe, eu me destaco por:',
    opcoes: { C: 'Apresentar a visão estratégica e os planos futuros.', I: 'Mediar conflitos e garantir que todos se sintam integrados.', P: 'Cobrar prazos, detalhes técnicos e a execução das tarefas.' } },
  { id: 5,  enunciado: 'Quando aprendo algo novo, prefiro:',
    opcoes: { C: 'Entender a teoria e os conceitos fundamentais primeiro.', I: 'Aprender pela interação, troca de ideias e exemplos humanos.', P: 'Colocar a mão na massa e aprender fazendo.' } },
  { id: 6,  enunciado: 'Meu maior incômodo em um projeto é:',
    opcoes: { C: 'A falta de propósito ou clareza sobre onde queremos chegar.', I: 'Um ambiente frio, competitivo ou sem harmonia entre as pessoas.', P: 'A falta de organização, a desordem ou processos mal definidos.' } },
  { id: 7,  enunciado: 'Minha relação com o tempo é:',
    opcoes: { C: 'Enxergo o tempo como um recurso a ser gerido para o futuro.', I: 'Vivo o momento presente conforme minhas emoções e conexões.', P: 'Foco na agenda do dia e nas tarefas que precisam ser concluídas já.' } },
  { id: 8,  enunciado: 'Diante de um conflito, minha reação é:',
    opcoes: { C: 'Analisar as causas raízes e buscar uma solução justa para o sistema.', I: 'Entender o lado emocional e restaurar o relacionamento.', P: 'Resolver o problema concreto de forma direta e pragmática.' } },
  { id: 9,  enunciado: 'Minha principal motivação é:',
    opcoes: { C: 'Ter autonomia, criar ideias e realizar uma visão.', I: 'Ser reconhecido, pertencer e fazer diferença na vida das pessoas.', P: 'Ter segurança, estabilidade e ver o trabalho bem feito.' } },
  { id: 10, enunciado: 'Ao ler, prefiro temas sobre:',
    opcoes: { C: 'Filosofia, estratégia, ciência ou grandes ideias.', I: 'Biografias, psicologia, artes ou histórias humanas.', P: 'Guias práticos, manuais técnicos ou fatos concretos.' } },
  { id: 11, enunciado: 'Minha habilidade mais natural é:',
    opcoes: { C: 'Sintetizar informação complexa em planos simples.', I: 'Comunicar com empatia e perceber o que não foi dito.', P: 'Executar com precisão, detalhe e persistência.' } },
  { id: 12, enunciado: 'Quando estou sob pressão, eu:',
    opcoes: { C: 'Me recolho para pensar em uma saída estratégica.', I: 'Busco alguém para dividir o peso e me reequilibrar.', P: 'Foco obsessivamente na tarefa para terminar logo.' } },
  { id: 13, enunciado: 'Eu me sinto realizado quando:',
    opcoes: { C: 'Descubro uma nova maneira de enxergar as coisas.', I: 'Ajudo alguém a superar um desafio pessoal.', P: 'Entrego um resultado impecável e dentro do prazo.' } },
  { id: 14, enunciado: 'Minha comunicação costuma ser:',
    opcoes: { C: 'Abstrata, focada em ideias e possibilidades.', I: 'Calorosa, focada em sentimentos e histórias.', P: 'Direta, focada em instruções e fatos.' } },
  { id: 15, enunciado: 'Ao planejar uma viagem, eu:',
    opcoes: { C: 'Defino o conceito da viagem e os marcos principais.', I: 'Penso nas experiências e nas pessoas que vou encontrar.', P: 'Faço um roteiro detalhado com horários, custos e reservas.' } },
  { id: 16, enunciado: 'O que mais me cansa mentalmente é:',
    opcoes: { C: 'Lidar com detalhes repetitivos e burocracia em excesso.', I: 'Ambientes hostis onde as pessoas não se respeitam.', P: 'Ficar só na teoria sem nunca ir para a prática.' } },
  { id: 17, enunciado: 'Em um grupo de amigos, eu sou aquele que:',
    opcoes: { C: 'Propõe as ideias mais fora da caixa.', I: 'Mantém o grupo unido e organiza os encontros.', P: 'Resolve as questões práticas de quem leva o quê.' } },
  { id: 18, enunciado: 'Minha relação com regras é:',
    opcoes: { C: 'Questiono se elas não fizerem sentido para o objetivo maior.', I: 'Sigo se não prejudicarem o bem estar das pessoas.', P: 'Respeito, pois elas garantem a ordem e o funcionamento.' } },
  { id: 19, enunciado: 'Para me convencer de algo, você precisa de:',
    opcoes: { C: 'Argumentos lógicos e visão de futuro.', I: 'Empatia e mostrar como aquilo afeta as pessoas.', P: 'Provas concretas e exemplos de que já funcionou.' } },
  { id: 20, enunciado: 'Meu estilo de liderança tende a ser:',
    opcoes: { C: 'Visionário e inspirador.', I: 'Democrático e acolhedor.', P: 'Focado em resultado e mentor técnico.' } },
  { id: 21, enunciado: 'No tempo livre, prefiro:',
    opcoes: { C: 'Estudar, refletir ou criar algo novo.', I: 'Estar com pessoas queridas ou fazer arte.', P: 'Consertar, cuidar do espaço ou atividades práticas.' } },
  { id: 22, enunciado: 'Ao resolver um problema técnico, eu:',
    opcoes: { C: 'Entendo o sistema como um todo antes de tocar em algo.', I: 'Peço opinião para ver o que os outros acham.', P: 'Sigo o manual ou vou testando por tentativa e erro.' } },
  { id: 23, enunciado: 'O dinheiro para mim representa:',
    opcoes: { C: 'Liberdade e poder para realizar grandes projetos.', I: 'Um meio de proporcionar conforto a quem amo.', P: 'Segurança para o futuro e fruto do meu esforço.' } },
  { id: 24, enunciado: 'Minha memória funciona melhor para:',
    opcoes: { C: 'Conceitos, teorias e insights.', I: 'Rostos, nomes e conversas marcantes.', P: 'Datas, números e procedimentos.' } },
  { id: 25, enunciado: 'Prefiro trabalhar em ambientes:',
    opcoes: { C: 'Flexíveis, onde eu possa criar e inovar.', I: 'Colaborativos, onde haja troca e amizade.', P: 'Estruturados, com papéis e regras claras.' } },
  { id: 26, enunciado: 'Diante de uma mudança inesperada, eu:',
    opcoes: { C: 'Visualizo logo as oportunidades que vão surgir.', I: 'Me preocupo com como as pessoas vão se adaptar.', P: 'Procuro logo o que preciso fazer para me reorganizar.' } },
  { id: 27, enunciado: 'Meu maior medo é:',
    opcoes: { C: 'A mediocridade ou a falta de sentido na vida.', I: 'A solidão, o abandono ou a rejeição.', P: 'O caos, a escassez ou perder o controle.' } },
  // ── Variações adicionais (mesmo espírito triádico) ──
  { id: 28, enunciado: 'Quando recebo um problema novo, a primeira coisa que faço é:',
    opcoes: { C: 'Perguntar qual é o objetivo final por trás dele.', I: 'Perguntar quem é afetado e como as pessoas se sentem.', P: 'Perguntar quais passos práticos preciso dar agora.' } },
  { id: 29, enunciado: 'Um bom dia de trabalho para mim é quando:',
    opcoes: { C: 'Tive um insight ou avancei numa ideia importante.', I: 'Tive boas conversas e me senti conectado com a equipe.', P: 'Risquei tudo da lista e entreguei o que precisava.' } },
  { id: 30, enunciado: 'Quando explico algo, costumo usar:',
    opcoes: { C: 'Modelos, analogias e o panorama geral.', I: 'Histórias, exemplos de pessoas e emoção.', P: 'Passo a passo, números e instruções claras.' } },
  { id: 31, enunciado: 'O elogio que mais me marca é:',
    opcoes: { C: '"Você tem uma visão impressionante."', I: '"Você faz as pessoas se sentirem bem."', P: '"Você é extremamente confiável e eficiente."' } },
  { id: 32, enunciado: 'Numa negociação, meu foco é:',
    opcoes: { C: 'O acordo de longo prazo e o cenário maior.', I: 'A relação e a confiança entre as partes.', P: 'Os números, prazos e o que fica combinado na prática.' } },
  { id: 33, enunciado: 'Quando algo dá errado, eu penso primeiro:',
    opcoes: { C: '"Onde está a falha na lógica do plano?"', I: '"Como as pessoas estão lidando com isso?"', P: '"O que faço agora para consertar?"' } },
  { id: 34, enunciado: 'A parte que mais gosto em um projeto é:',
    opcoes: { C: 'Conceber a estratégia e desenhar o caminho.', I: 'Engajar as pessoas e construir o time.', P: 'Botar para rodar e ver a execução acontecer.' } },
  { id: 35, enunciado: 'Me descrevem com mais frequência como:',
    opcoes: { C: 'Estrategista, pensador, idealizador.', I: 'Empático, agregador, sensível.', P: 'Prático, organizado, pé no chão.' } },
  { id: 36, enunciado: 'Para descansar a mente, eu prefiro:',
    opcoes: { C: 'Refletir, filosofar ou imaginar possibilidades.', I: 'Conversar, ouvir música ou estar em boa companhia.', P: 'Fazer algo manual, arrumar ou me exercitar.' } },
  { id: 37, enunciado: 'O tipo de tarefa que evito é:',
    opcoes: { C: 'Rotina mecânica e repetitiva.', I: 'Trabalho isolado, sem contato humano.', P: 'Discussão abstrata sem aplicação concreta.' } },
  { id: 38, enunciado: 'Ao montar uma apresentação, priorizo:',
    opcoes: { C: 'A grande ideia e a mensagem central.', I: 'A conexão com a plateia e o impacto emocional.', P: 'Os dados, a clareza e a estrutura lógica dos slides.' } },
  { id: 39, enunciado: 'Confio mais em alguém quando a pessoa:',
    opcoes: { C: 'Tem visão clara e coerência de princípios.', I: 'É sincera, cuidadosa e presente.', P: 'Cumpre o que promete e entrega no prazo.' } },
  { id: 40, enunciado: 'Quando entro num lugar novo, reparo primeiro:',
    opcoes: { C: 'Na lógica do espaço e em como tudo se conecta.', I: 'No clima e nas pessoas que estão ali.', P: 'Nos detalhes práticos: saídas, objetos, organização.' } },
  { id: 41, enunciado: 'Meu maior talento para um time é:',
    opcoes: { C: 'Dar direção e enxergar à frente.', I: 'Cuidar do clima e unir as pessoas.', P: 'Garantir que as coisas saiam do papel.' } },
  { id: 42, enunciado: 'O que me dá mais energia é:',
    opcoes: { C: 'Uma ideia nova e ousada para explorar.', I: 'Um momento de conexão verdadeira com alguém.', P: 'A sensação de uma tarefa concluída com excelência.' } },
]

// ============================================================
// Sorteio determinístico (mesma seed = mesma sessão)
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

export interface QmtSessionOption { dim: QmtDim; texto: string }
export interface QmtSessionQuestion {
  id: number
  enunciado: string
  opcoes: QmtSessionOption[] // ordem embaralhada por sessão
}

/**
 * Retorna `count` questões sorteadas do banco, com a ordem das 3 opções
 * embaralhada por questão (a dimensão correta nunca fica fixa em A/B/C).
 * Seed recomendada: o token ou assessmentId da avaliação.
 */
export function getQmtSessionQuestions(seed: string, count = 27): QmtSessionQuestion[] {
  const picked = shuffle(QMT_QUESTIONS, `${seed}:pick`).slice(0, Math.min(count, QMT_QUESTIONS.length))
  // mantém a ordem das questões também determinística
  const ordered = shuffle(picked, `${seed}:order`)
  return ordered.map((q) => {
    const base: QmtSessionOption[] = [
      { dim: 'C', texto: q.opcoes.C },
      { dim: 'I', texto: q.opcoes.I },
      { dim: 'P', texto: q.opcoes.P },
    ]
    return { id: q.id, enunciado: q.enunciado, opcoes: shuffle(base, `${seed}:opt:${q.id}`) }
  })
}

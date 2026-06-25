// ============================================================
// Liderança Situacional (Hersey e Blanchard)
// Banco de cenários. Cada cenário descreve uma situação com uma
// maturidade implícita do liderado (M1 a M4) e 4 reações possíveis,
// uma por estilo de liderança:
//   S1 = Direcionador (alta direção, baixo apoio)   -> ideal para M1
//   S2 = Orientador   (alta direção, alto apoio)    -> ideal para M2
//   S3 = Apoiador     (baixa direção, alto apoio)   -> ideal para M3
//   S4 = Delegador    (baixa direção, baixo apoio)  -> ideal para M4
// A sessão sorteia cenários de forma determinística e balanceada
// (mesma quantidade por nível de maturidade) e embaralha as opções.
// ============================================================

export type LsStyle = 'S1' | 'S2' | 'S3' | 'S4'
export type LsMaturity = 'M1' | 'M2' | 'M3' | 'M4'

// estilo apropriado para cada nível de maturidade (base da adaptabilidade)
export const LS_IDEAL: Record<LsMaturity, LsStyle> = { M1: 'S1', M2: 'S2', M3: 'S3', M4: 'S4' }

// estilo -> valor salvo na resposta
export const LS_STYLE_TO_VALUE: Record<LsStyle, number> = { S1: 1, S2: 2, S3: 3, S4: 4 }
export const LS_VALUE_TO_STYLE: Record<number, LsStyle> = { 1: 'S1', 2: 'S2', 3: 'S3', 4: 'S4' }

export interface LsQuestion {
  id: number
  nivel: LsMaturity
  contexto: string
  opcoes: Record<LsStyle, string>
}

export const LS_QUESTIONS: LsQuestion[] = [
  // ── M1: iniciante, baixa competência e alta dependência (ideal S1) ──
  { id: 1, nivel: 'M1',
    contexto: 'Um novo integrante entrou no time esta semana e ainda não conhece os processos nem as ferramentas.',
    opcoes: {
      S1: 'Mostro o passo a passo, defino exatamente o que fazer e acompanho de perto as primeiras entregas.',
      S2: 'Explico o porquê de cada etapa, oriento e já vou incentivando a pessoa a opinar.',
      S3: 'Pergunto como ela prefere começar e fico à disposição para apoiar quando precisar.',
      S4: 'Passo o objetivo e deixo a pessoa explorar sozinha, vejo o resultado depois.',
    } },
  { id: 2, nivel: 'M1',
    contexto: 'Você delegou uma tarefa simples a alguém sem experiência e a entrega veio cheia de erros básicos.',
    opcoes: {
      S1: 'Sento junto, corrijo ponto a ponto e estabeleço um checklist claro para a próxima.',
      S2: 'Reviso os erros explicando o motivo e reforço que ela vai aprender com a prática.',
      S3: 'Pergunto o que ela achou difícil e ajudo a pessoa a encontrar onde melhorar.',
      S4: 'Devolvo para refazer e confio que ela vai descobrir o que faltou.',
    } },
  { id: 3, nivel: 'M1',
    contexto: 'Um estagiário vai usar pela primeira vez um sistema crítico da empresa.',
    opcoes: {
      S1: 'Dou instruções detalhadas, demonstro e reviso cada passo antes de liberar.',
      S2: 'Ensino a lógica do sistema, dou exemplos e acompanho de perto, motivando.',
      S3: 'Deixo ele tentar e fico por perto para tirar dúvidas conforme surgem.',
      S4: 'Mando o manual e digo para me chamar se travar.',
    } },
  { id: 4, nivel: 'M1',
    contexto: 'Alguém recém promovido assume uma função totalmente nova e está visivelmente perdido.',
    opcoes: {
      S1: 'Estruturo as prioridades, defino metas claras e faço acompanhamento diário no início.',
      S2: 'Aponto o caminho, explico o contexto e dou suporte emocional para ganhar confiança.',
      S3: 'Pergunto como posso ajudar e deixo a pessoa conduzir no seu ritmo.',
      S4: 'Confio na bagagem dela e dou autonomia total desde o primeiro dia.',
    } },
  // ── M2: já sabe o básico mas oscila na confiança (ideal S2) ──
  { id: 5, nivel: 'M2',
    contexto: 'Um colaborador já domina o básico, mas precisa executar uma tarefa mais complexa que nunca fez.',
    opcoes: {
      S1: 'Defino exatamente como fazer e cobro o resultado no prazo.',
      S2: 'Explico a lógica do novo desafio, dou exemplos e acompanho para ele se sentir seguro.',
      S3: 'Pergunto como ele pretende fazer e apoio a decisão dele.',
      S4: 'Delego e deixo que ele resolva do jeito que achar melhor.',
    } },
  { id: 6, nivel: 'M2',
    contexto: 'Uma pessoa do time está animada, mas perde a confiança toda vez que erra em algo novo.',
    opcoes: {
      S1: 'Reduzo a margem de erro dando instruções bem específicas.',
      S2: 'Combino orientação com incentivo, mostro o progresso e reforço que errar faz parte de aprender.',
      S3: 'Escuto como ela está se sentindo e devolvo a confiança sem direcionar muito.',
      S4: 'Deixo ela lidar com a frustração sozinha para amadurecer.',
    } },
  { id: 7, nivel: 'M2',
    contexto: 'Um colaborador entrega bem o operacional, mas terá que liderar uma pequena iniciativa pela primeira vez.',
    opcoes: {
      S1: 'Digo exatamente os passos para conduzir a iniciativa.',
      S2: 'Oriento sobre como liderar, participo das primeiras decisões e incentivo a autonomia gradual.',
      S3: 'Deixo ele assumir e entro só quando ele pedir.',
      S4: 'Passo a responsabilidade inteira e saio de cena.',
    } },
  { id: 8, nivel: 'M2',
    contexto: 'Em um período de mudança, a equipe conhece a tarefa mas está insegura sobre o novo cenário.',
    opcoes: {
      S1: 'Determino o que cada um deve fazer e mantenho controle rígido até estabilizar.',
      S2: 'Explico o porquê da mudança, dou direção e fico próximo para dar segurança ao time.',
      S3: 'Abro espaço para o time decidir como se adaptar e só apoio.',
      S4: 'Deixo a equipe se organizar sozinha diante do novo.',
    } },
  // ── M3: competente mas com motivação ou confiança variável (ideal S3) ──
  { id: 9, nivel: 'M3',
    contexto: 'Um profissional experiente domina a técnica, mas está inseguro sobre uma decisão importante de como conduzir o projeto.',
    opcoes: {
      S1: 'Decido por ele e digo qual caminho seguir.',
      S2: 'Explico os prós e contras de cada opção e recomendo um caminho.',
      S3: 'Faço perguntas, ajudo a avaliar os riscos e deixo a decisão com ele.',
      S4: 'Digo que confio nele e que a escolha é dele, sem me envolver.',
    } },
  { id: 10, nivel: 'M3',
    contexto: 'Um colaborador competente anda desmotivado e entregando abaixo do que costuma render.',
    opcoes: {
      S1: 'Cobro o desempenho e estabeleço metas mais rígidas.',
      S2: 'Aponto onde melhorar e reforço a importância do trabalho dele.',
      S3: 'Converso, escuto o que está acontecendo e ofereço apoio para ele se reconectar.',
      S4: 'Deixo ele resolver a própria motivação sozinho.',
    } },
  { id: 11, nivel: 'M3',
    contexto: 'Uma pessoa sênior tem total capacidade técnica, mas evita assumir o protagonismo de uma entrega.',
    opcoes: {
      S1: 'Determino que ela assuma e defino exatamente o que entregar.',
      S2: 'Explico por que ela é a pessoa certa e oriento os primeiros passos.',
      S3: 'Encorajo, mostro que confio nela e apoio para que tome a frente.',
      S4: 'Simplesmente passo a entrega e me afasto.',
    } },
  { id: 12, nivel: 'M3',
    contexto: 'Um especialista do time discorda da abordagem combinada e está resistente a seguir adiante.',
    opcoes: {
      S1: 'Reafirmo a decisão e digo que precisa ser seguida.',
      S2: 'Explico os motivos da abordagem e tento convencê-lo com argumentos.',
      S3: 'Escuto a objeção, valorizo o ponto de vista e construímos juntos uma saída.',
      S4: 'Deixo que ele faça do jeito dele e vejo no que dá.',
    } },
  // ── M4: alta competência e alta autonomia (ideal S4) ──
  { id: 13, nivel: 'M4',
    contexto: 'Um profissional maduro e autônomo conduz suas entregas com excelência e consistência.',
    opcoes: {
      S1: 'Continuo definindo o que fazer e acompanhando de perto.',
      S2: 'Oriento e fico próximo mesmo ele já dominando tudo.',
      S3: 'Apoio emocionalmente, mesmo sem ele demandar.',
      S4: 'Alinho os objetivos e dou total autonomia, acompanhando indicadores de longe.',
    } },
  { id: 14, nivel: 'M4',
    contexto: 'Uma líder experiente da sua equipe pede mais espaço para tomar decisões estratégicas.',
    opcoes: {
      S1: 'Mantenho as decisões comigo e digo o que ela deve fazer.',
      S2: 'Decido com ela, explicando cada escolha.',
      S3: 'Participo das conversas dando apoio, mas ainda opino bastante.',
      S4: 'Delego as decisões, defino apenas os limites e atuo como facilitador.',
    } },
  { id: 15, nivel: 'M4',
    contexto: 'Um time maduro já roda seus processos com eficiência e raramente precisa de você no operacional.',
    opcoes: {
      S1: 'Volto a acompanhar de perto cada tarefa para garantir o padrão.',
      S2: 'Retomo reuniões frequentes de orientação detalhada.',
      S3: 'Aumento minha presença emocional mesmo sem demanda.',
      S4: 'Defino metas estratégicas, acompanho resultados e entro só para destravar.',
    } },
  { id: 16, nivel: 'M4',
    contexto: 'Um especialista sênior tem domínio total de uma área que você conhece menos que ele.',
    opcoes: {
      S1: 'Mesmo assim, determino como ele deve conduzir o trabalho.',
      S2: 'Oriento de perto, apesar da experiência dele ser maior na área.',
      S3: 'Ofereço apoio constante, mesmo sem ele pedir.',
      S4: 'Confio no domínio dele, alinho expectativas e dou liberdade total de execução.',
    } },
]

// ============================================================
// Sorteio determinístico e balanceado por nível de maturidade
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

export interface LsSessionOption { estilo: LsStyle; texto: string }
export interface LsSessionQuestion {
  id: number
  nivel: LsMaturity
  contexto: string
  opcoes: LsSessionOption[] // ordem embaralhada por sessão
}

/**
 * Sorteia `perLevel` cenários de cada nível de maturidade (M1 a M4),
 * embaralha a ordem geral e a ordem das opções. Mesma seed = mesma sessão.
 * Default: 3 por nível = 12 cenários.
 */
export function getLsSessionQuestions(seed: string, perLevel = 3): LsSessionQuestion[] {
  const levels: LsMaturity[] = ['M1', 'M2', 'M3', 'M4']
  let picked: LsQuestion[] = []
  for (const lvl of levels) {
    const pool = LS_QUESTIONS.filter((q) => q.nivel === lvl)
    picked = picked.concat(shuffle(pool, `${seed}:${lvl}`).slice(0, perLevel))
  }
  const ordered = shuffle(picked, `${seed}:order`)
  return ordered.map((q) => {
    const base: LsSessionOption[] = (['S1', 'S2', 'S3', 'S4'] as LsStyle[]).map((s) => ({ estilo: s, texto: q.opcoes[s] }))
    return { id: q.id, nivel: q.nivel, contexto: q.contexto, opcoes: shuffle(base, `${seed}:opt:${q.id}`) }
  })
}

// mapa id -> nivel (a engine usa para calcular adaptabilidade)
export const LS_QUESTION_LEVEL: Record<number, LsMaturity> = Object.fromEntries(
  LS_QUESTIONS.map((q) => [q.id, q.nivel]),
) as Record<number, LsMaturity>

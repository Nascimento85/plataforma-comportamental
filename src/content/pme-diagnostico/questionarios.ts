// ============================================================
// Diagnóstico de Liderança PME, questionários e lógica
//   Questionário do Dono (percepção e resultados)
//   Questionário do Líder (rotina e clima)
//   Cruzamento → gaps (atrito), score de maturidade e cenário
// Escala 1 a 5. Linguagem direta, sem hífens.
// ============================================================

export type EscalaPme = 1 | 2 | 3 | 4 | 5

export const ESCALA_PME: Array<{ valor: EscalaPme; label: string }> = [
  { valor: 1, label: 'Discordo totalmente' },
  { valor: 2, label: 'Discordo' },
  { valor: 3, label: 'Mais ou menos' },
  { valor: 4, label: 'Concordo' },
  { valor: 5, label: 'Concordo totalmente' },
]

export interface PerguntaPme {
  id:     string
  bloco:  string
  texto:  string
}

// ── Questionário do DONO (PNL + gatilhos emocionais) ──────────
export const PERGUNTAS_DONO: PerguntaPme[] = [
  // Resultados e metas (a dor da instabilidade e da dúvida)
  { id: 'd_fin1', bloco: 'Resultados e Metas', texto: 'Consigo deitar a cabeça no travesseiro no início do mês sabendo exatamente como vou cobrir os custos e a folha de pagamento.' },
  { id: 'd_fin2', bloco: 'Resultados e Metas', texto: 'Sinto que o crescimento da empresa é consistente, e não um ciclo exaustivo de altos e baixos emocionais.' },
  { id: 'd_fin3', bloco: 'Resultados e Metas', texto: 'Tomo decisões estratégicas com base em dados seguros, sem aquela sensação incômoda de estar jogando no escuro.' },
  // Autonomia da operação (a dor da prisão e da sobrecarga)
  { id: 'd_dep1', bloco: 'Autonomia da Operação', texto: 'Consigo tirar férias ou me ausentar por motivos de saúde com a certeza de que o negócio não vai desmoronar sem mim.' },
  { id: 'd_dep2', bloco: 'Autonomia da Operação', texto: 'Minha equipe resolve os problemas do dia a dia de forma madura, sem me interromper a todo momento para pedir validação.' },
  { id: 'd_dep3', bloco: 'Autonomia da Operação', texto: 'O conhecimento para a operação rodar está seguro e institucionalizado, e não refém da minha cabeça ou da boa vontade de funcionários.' },
  // Engajamento da equipe (a dor da solidão empresarial)
  { id: 'd_eq1', bloco: 'Engajamento da Equipe', texto: 'Sinto que divido o peso do crescimento do negócio com o time, sem aquela sensação de estar jogando sozinho.' },
  { id: 'd_eq2', bloco: 'Engajamento da Equipe', texto: 'A equipe demonstra iniciativa e proatividade para entregar além do básico, sem que eu precise agir como um fiscal de tarefas.' },
  { id: 'd_eq3', bloco: 'Engajamento da Equipe', texto: 'O time executa as tarefas com clareza e autonomia, sem que eu precise refazer o trabalho mal feito por falta de entendimento.' },
  // Sua liderança (a dor do isolamento e do desgaste do papel)
  { id: 'd_lid1', bloco: 'Sua Liderança', texto: 'Confio plenamente que meus líderes defendem os interesses e a cultura da empresa na minha ausência.' },
  { id: 'd_lid2', bloco: 'Sua Liderança', texto: 'Meus líderes agem com postura estratégica, poupando o meu tempo para que eu foque no futuro do negócio.' },
  { id: 'd_lid3', bloco: 'Sua Liderança', texto: 'Existe um ambiente onde os líderes multiplicam o conhecimento e formam novas pessoas, sem depender da minha energia para treinar o time.' },
]

// ── Questionário do LÍDER (PNL + gatilhos emocionais) ─────────
export const PERGUNTAS_LIDER: PerguntaPme[] = [
  // Clareza de metas (a dor da cobrança às cegas)
  { id: 'l_met1', bloco: 'Clareza de Metas', texto: 'Consigo planejar as ações do meu setor com antecedência, sem aquela sensação de que as prioridades e cobranças mudam a cada semana.' },
  { id: 'l_met2', bloco: 'Clareza de Metas', texto: 'O time executa as metas com clareza operacional, sem que eu precise gastar energia corrigindo rotas por falta de entendimento deles.' },
  { id: 'l_met3', bloco: 'Clareza de Metas', texto: 'Sinto-me seguro e respaldado com as ferramentas e o orçamento necessários para entregar os resultados que a diretoria me cobra.' },
  // Rotina de desenvolvimento (a dor de carregar o time nas costas)
  { id: 'l_tre1', bloco: 'Rotina de Desenvolvimento', texto: 'Consigo alinhar o desempenho da equipe por meio de conversas estruturadas, e não apenas no momento do erro ou quando o clima está tenso.' },
  { id: 'l_tre2', bloco: 'Rotina de Desenvolvimento', texto: 'Existe um processo contínuo de capacitação no meu setor para que o desempenho do time não dependa exclusivamente do meu esforço individual.' },
  { id: 'l_tre3', bloco: 'Rotina de Desenvolvimento', texto: 'Tenho clareza de como manter os melhores talentos engajados, sem o medo constante de perder pessoas chave para o mercado.' },
  // Engajamento da equipe (a dor do microgerenciamento exaustivo)
  { id: 'l_mot1', bloco: 'Engajamento da Equipe', texto: 'Sinto que possuo a autonomia necessária para liderar e engajar as pessoas, sem precisar validar cada pequena atitude com o dono.' },
  { id: 'l_mot2', bloco: 'Engajamento da Equipe', texto: 'A equipe demonstra maturidade para resolver imprevistos por conta própria, permitindo que eu foque na estratégia do setor.' },
  { id: 'l_mot3', bloco: 'Engajamento da Equipe', texto: 'Consigo cobrar resultados e prazos mantendo o clima leve, sem parecer que estou constantemente a policiar adultos.' },
  // Cultura de liderança (a dor do isolamento e abandono profissional)
  { id: 'l_cul1', bloco: 'Cultura de Liderança', texto: 'A empresa me oferece ferramentas práticas de gestão de pessoas para que eu saiba lidar com os conflitos do dia a dia do time.' },
  { id: 'l_cul2', bloco: 'Cultura de Liderança', texto: 'Sinto-me ouvido e direcionado estrategicamente pelo dono da empresa sobre o meu papel como gestor.' },
  { id: 'l_cul3', bloco: 'Cultura de Liderança', texto: 'Percebo que a diretoria enxerga a liderança como um pilar estratégico e investe ativamente na minha evolução profissional.' },
]

// ── Pares de cruzamento (Dono x Líder) ────────────────────────
export interface ParCruzamento {
  indicador:    string
  idDono:       string
  idLider:      string
  visaoDono:    string
  realidadeLider: string
}

export const PARES_CRUZAMENTO: ParCruzamento[] = [
  {
    indicador: 'Clareza de Metas e Alinhamento',
    idDono: 'd_eq3', idLider: 'l_met1',
    visaoDono: 'O time executa com clareza, sem retrabalho.',
    realidadeLider: 'As prioridades e cobranças são estáveis.',
  },
  {
    indicador: 'Rotina de Treinamentos',
    idDono: 'd_lid3', idLider: 'l_tre2',
    visaoDono: 'Os líderes formam e multiplicam o time.',
    realidadeLider: 'Existe capacitação contínua de fato.',
  },
  {
    indicador: 'Autonomia e Confiança',
    idDono: 'd_dep2', idLider: 'l_mot1',
    visaoDono: 'A equipe resolve sem me interromper.',
    realidadeLider: 'Tenho autonomia real para liderar.',
  },
  {
    indicador: 'Direcionamento e Cultura',
    idDono: 'd_lid2', idLider: 'l_cul2',
    visaoDono: 'Meus líderes agem estrategicamente sozinhos.',
    realidadeLider: 'Recebo direção e sou ouvido pelo dono.',
  },
]

// ============================================================
// LÓGICA: score de maturidade, cenário e gaps
// ============================================================

export type NivelAtrito = 'ALINHADO' | 'MEDIO' | 'CRITICO'

export interface GapCruzamento {
  indicador:      string
  visaoDono:      string
  realidadeLider: string
  notaDono:       number
  notaLider:      number
  atrito:         NivelAtrito
}

export type CenarioPme = 'DONO_SOLITARIO' | 'LIDERANCA_DESALINHADA' | 'LIDERANCA_ALINHADA'

export interface ResultadoPme {
  scoreMaturidade: number          // 0 a 100
  cenario:         CenarioPme
  gaps:            GapCruzamento[]  // vazio se o líder não respondeu
  mediaDono:       number           // 1 a 5
  mediaLider:      number | null
}

function media(respostas: Record<string, number>, ids: string[]): number {
  const vals = ids.map((id) => respostas[id]).filter((v) => typeof v === 'number' && v >= 1 && v <= 5)
  if (vals.length === 0) return 0
  return vals.reduce((a, b) => a + b, 0) / vals.length
}

export function calcularDiagnostico(
  respostasDono: Record<string, number>,
  temLideres: boolean,
  respostasLider?: Record<string, number> | null,
): ResultadoPme {
  // Perguntas do dono que entram no score (exclui bloco "Sua Liderança" se não tem líderes)
  const idsDono = PERGUNTAS_DONO
    .filter((p) => temLideres || p.bloco !== 'Sua Liderança')
    .map((p) => p.id)
  const mediaDono = media(respostasDono, idsDono)

  let mediaLider: number | null = null
  const gaps: GapCruzamento[] = []

  if (respostasLider && Object.keys(respostasLider).length > 0) {
    mediaLider = media(respostasLider, PERGUNTAS_LIDER.map((p) => p.id))

    for (const par of PARES_CRUZAMENTO) {
      const nd = respostasDono[par.idDono]
      const nl = respostasLider[par.idLider]
      if (typeof nd !== 'number' || typeof nl !== 'number') continue
      const diff = nd - nl // dono otimista, líder realista
      let atrito: NivelAtrito = 'ALINHADO'
      if (diff >= 2) atrito = 'CRITICO'
      else if (diff === 1) atrito = 'MEDIO'
      gaps.push({
        indicador: par.indicador,
        visaoDono: par.visaoDono,
        realidadeLider: par.realidadeLider,
        notaDono: nd,
        notaLider: nl,
        atrito,
      })
    }
  }

  // Score de maturidade 0 a 100: combina dono (e líder se houver)
  const base = mediaLider != null ? (mediaDono + mediaLider) / 2 : mediaDono
  const scoreMaturidade = Math.round(((base - 1) / 4) * 100) // 1->0, 5->100

  // Cenário
  let cenario: CenarioPme
  if (!temLideres) {
    cenario = 'DONO_SOLITARIO'
  } else {
    const temCritico = gaps.some((g) => g.atrito === 'CRITICO')
    const temMedio = gaps.some((g) => g.atrito === 'MEDIO')
    cenario = (temCritico || temMedio) ? 'LIDERANCA_DESALINHADA' : 'LIDERANCA_ALINHADA'
  }

  return { scoreMaturidade, cenario, gaps, mediaDono: +mediaDono.toFixed(2), mediaLider: mediaLider != null ? +mediaLider.toFixed(2) : null }
}

// ── Faixas de maturidade (perfil emocional do dono) ───────────
export function faixaMaturidade(score: number): { rotulo: string; cor: string; resumo: string } {
  if (score >= 70) return { rotulo: 'Diretor Estratégico', cor: '#7a9e7e', resumo: 'Liderança alinhada e pronta para o próximo nível. A empresa cresce com você focado no futuro, e não preso na operação.' }
  if (score >= 45) return { rotulo: 'Perfil Bombeiro', cor: '#d4af37', resumo: 'Você apaga incêndios o dia inteiro para crescer, mas patina na hora de escalar. A operação ainda depende demais da sua energia.' }
  return { rotulo: 'Perfil Centralizador', cor: '#c0392b', resumo: 'Hoje a empresa é um reflexo direto do seu cansaço. Quase tudo depende de você, e isso trava o crescimento e a sua liberdade.' }
}

// ── Cenário: texto de direcionamento ──────────────────────────
export const CENARIO_INFO: Record<CenarioPme, { titulo: string; direcionamento: string }> = {
  DONO_SOLITARIO: {
    titulo: 'O Dono Solitário',
    direcionamento: 'O seu resultado atual depende quase 100% do seu suor. Para crescer, o foco imediato deve ser desenvolver processos de auto liderança e se preparar para delegar as primeiras funções, deixando de ser o único motor da empresa.',
  },
  LIDERANCA_DESALINHADA: {
    titulo: 'A Liderança Desalinhada',
    direcionamento: 'Existe um abismo de comunicação entre as suas expectativas estratégicas e a rotina dos seus líderes. Eles estão operando como bombeiros apagando incêndios, e não como gestores focados em metas. Alinhar e treinar a liderança média vai liberar você para focar no crescimento.',
  },
  LIDERANCA_ALINHADA: {
    titulo: 'A Liderança Alinhada',
    direcionamento: 'Dono e liderança estão na mesma página, o que é raro e valioso. O foco agora é elevar o nível: transformar bons líderes em formadores de outros líderes e instalar uma cultura de desenvolvimento contínuo para sustentar o crescimento.',
  },
}

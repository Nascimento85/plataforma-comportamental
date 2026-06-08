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

// ── Questionário do DONO ──────────────────────────────────────
export const PERGUNTAS_DONO: PerguntaPme[] = [
  // Resultados financeiros e metas
  { id: 'd_fin1', bloco: 'Resultados e Metas', texto: 'O negócio atinge o faturamento e o lucro esperados de forma previsível.' },
  { id: 'd_fin2', bloco: 'Resultados e Metas', texto: 'As metas financeiras são batidas com consistência mês a mês.' },
  { id: 'd_fin3', bloco: 'Resultados e Metas', texto: 'Tenho clareza dos números da empresa quase em tempo real.' },
  // Dependência da operação
  { id: 'd_dep1', bloco: 'Autonomia da Operação', texto: 'Se eu me afastar por 15 dias, a empresa continua funcionando normalmente.' },
  { id: 'd_dep2', bloco: 'Autonomia da Operação', texto: 'As decisões do dia a dia acontecem sem precisar passar por mim.' },
  { id: 'd_dep3', bloco: 'Autonomia da Operação', texto: 'Os processos estão documentados e não dependem só da minha cabeça.' },
  // Percepção da equipe
  { id: 'd_eq1', bloco: 'Engajamento da Equipe', texto: 'Sinto que a equipe veste a camisa e é comprometida com o resultado.' },
  { id: 'd_eq2', bloco: 'Engajamento da Equipe', texto: 'O time entrega resultado sem que eu precise cobrar o tempo todo.' },
  { id: 'd_eq3', bloco: 'Engajamento da Equipe', texto: 'A equipe sabe exatamente quais são as metas e o que precisa fazer.' },
  // Avaliação do líder (só relevante se temLideres)
  { id: 'd_lid1', bloco: 'Sua Liderança', texto: 'Meu líder de confiança entrega resultados de forma autônoma.' },
  { id: 'd_lid2', bloco: 'Sua Liderança', texto: 'Não preciso microgerenciar meu líder no dia a dia.' },
  { id: 'd_lid3', bloco: 'Sua Liderança', texto: 'Meu líder desenvolve e treina a equipe dele com frequência.' },
]

// ── Questionário do LÍDER ─────────────────────────────────────
export const PERGUNTAS_LIDER: PerguntaPme[] = [
  // Clareza de metas
  { id: 'l_met1', bloco: 'Clareza de Metas', texto: 'As metas do meu setor são claras e estáveis, não mudam o tempo todo.' },
  { id: 'l_met2', bloco: 'Clareza de Metas', texto: 'Eu e meu time sabemos exatamente o que precisa ser entregue.' },
  { id: 'l_met3', bloco: 'Clareza de Metas', texto: 'Tenho os recursos necessários para bater as metas que me cobram.' },
  // Rotina de treinamentos
  { id: 'l_tre1', bloco: 'Rotina de Desenvolvimento', texto: 'Temos uma rotina frequente de feedbacks formais com o time.' },
  { id: 'l_tre2', bloco: 'Rotina de Desenvolvimento', texto: 'Realizamos treinamentos estruturados com a equipe regularmente.' },
  { id: 'l_tre3', bloco: 'Rotina de Desenvolvimento', texto: 'Tenho reuniões de alinhamento periódicas com o time.' },
  // Motivação e engajamento
  { id: 'l_mot1', bloco: 'Motivação do Time', texto: 'Minha equipe está motivada e engajada com o trabalho.' },
  { id: 'l_mot2', bloco: 'Motivação do Time', texto: 'Consigo reter os bons profissionais do meu time.' },
  { id: 'l_mot3', bloco: 'Motivação do Time', texto: 'Tenho autonomia e ferramentas para motivar a equipe.' },
  // Cultura de desenvolvimento
  { id: 'l_cul1', bloco: 'Cultura de Liderança', texto: 'Recebi treinamentos de liderança da empresa nos últimos 12 meses.' },
  { id: 'l_cul2', bloco: 'Cultura de Liderança', texto: 'Recebo feedback constante do dono ou da diretoria.' },
  { id: 'l_cul3', bloco: 'Cultura de Liderança', texto: 'A empresa investe de forma clara no meu desenvolvimento como líder.' },
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
    visaoDono: 'A equipe sabe exatamente as metas.',
    realidadeLider: 'As metas são claras e estáveis para o time.',
  },
  {
    indicador: 'Rotina de Treinamentos',
    idDono: 'd_lid3', idLider: 'l_tre2',
    visaoDono: 'O líder treina a equipe com frequência.',
    realidadeLider: 'Existem treinamentos estruturados de fato.',
  },
  {
    indicador: 'Autonomia da Operação',
    idDono: 'd_dep2', idLider: 'l_met3',
    visaoDono: 'As decisões acontecem sem o dono.',
    realidadeLider: 'O líder tem recursos e autonomia para entregar.',
  },
  {
    indicador: 'Cultura de Feedback',
    idDono: 'd_lid2', idLider: 'l_cul2',
    visaoDono: 'O dono não precisa microgerenciar o líder.',
    realidadeLider: 'O líder recebe feedback constante do dono.',
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

// ── Faixas de maturidade (rótulo do raio-x) ───────────────────
export function faixaMaturidade(score: number): { rotulo: string; cor: string; resumo: string } {
  if (score >= 75) return { rotulo: 'Gestão Madura', cor: '#7a9e7e', resumo: 'A liderança e os processos estão bem estruturados. O foco agora é escalar com consistência.' }
  if (score >= 50) return { rotulo: 'Em Estruturação', cor: '#d4af37', resumo: 'A empresa tem boas bases, mas ainda depende demais de pessoas e improviso em pontos críticos.' }
  if (score >= 30) return { rotulo: 'Zona de Atenção', cor: '#d4943a', resumo: 'A operação trava com frequência por falta de processos e alinhamento de liderança. O crescimento está sendo freado.' }
  return { rotulo: 'Alerta Crítico', cor: '#c47a72', resumo: 'A empresa opera apagando incêndios. O resultado depende quase 100% do esforço do dono. É urgente estruturar a liderança.' }
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

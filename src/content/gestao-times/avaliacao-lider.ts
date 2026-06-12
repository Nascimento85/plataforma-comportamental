// ============================================================
// Avaliacao de Lideranca (ascendente, anonima)
// Os liderados avaliam o lider do time em 15 perguntas (Likert
// 1 a 5, escala de frequencia) distribuidas em 5 pilares.
// Classificacao: REGULAR | BOM | MUITO BOM | OTIMO.
// ============================================================

export type PilarLiderKey =
  | 'CLAREZA'
  | 'RESPEITO'
  | 'RECONHECIMENTO'
  | 'SUPORTE'
  | 'DESENVOLVIMENTO'

export interface PerguntaLider {
  id:    string
  pilar: PilarLiderKey
  texto: string
}

export const PILAR_LIDER_INFO: Record<PilarLiderKey, { rotulo: string; subtitulo: string; cor: string }> = {
  CLAREZA:         { rotulo: 'Clareza e Direcionamento',          subtitulo: 'Metas, prazos e expectativas compreensíveis',     cor: '#3d4f7c' },
  RESPEITO:        { rotulo: 'Respeito e Segurança Psicológica',  subtitulo: 'Tom de voz, postura e abertura para discordar',   cor: '#c4633a' },
  RECONHECIMENTO:  { rotulo: 'Reconhecimento e Validação',        subtitulo: 'Valorização do esforço e da pessoa',              cor: '#c9a84c' },
  SUPORTE:         { rotulo: 'Suporte e Disponibilidade',         subtitulo: 'Presença do líder como facilitador do trabalho',  cor: '#5a7d5a' },
  DESENVOLVIMENTO: { rotulo: 'Desenvolvimento e Feedback',        subtitulo: 'Feedback construtivo e crescimento do liderado',  cor: '#7c5a8a' },
}

// Escala de frequencia comportamental, mais honesta que concordo/discordo
export const ESCALA_LIDER: Array<{ valor: number; label: string }> = [
  { valor: 1, label: 'Nunca' },
  { valor: 2, label: 'Raramente' },
  { valor: 3, label: 'Às vezes' },
  { valor: 4, label: 'Quase sempre' },
  { valor: 5, label: 'Sempre' },
]

export const PERGUNTAS_LIDER: PerguntaLider[] = [
  // ── Pilar 1: Clareza e Direcionamento ──
  { id: 'P01', pilar: 'CLAREZA', texto: 'Quando recebo uma meta ou tarefa, entendo claramente o que é esperado, até quando e por quê.' },
  { id: 'P02', pilar: 'CLAREZA', texto: 'Quando as prioridades mudam, o líder comunica a mudança em tempo hábil, antes que eu descubra sozinho.' },
  { id: 'P03', pilar: 'CLAREZA', texto: 'Tenho total clareza sobre quais critérios são utilizados para avaliar se o meu trabalho foi bem feito.' },
  { id: 'P15', pilar: 'CLAREZA', texto: 'As metas e cobranças estabelecidas pelo líder são realistas e alcançáveis dentro da nossa jornada de trabalho.' },
  // ── Pilar 2: Respeito e Seguranca Psicologica ──
  { id: 'P04', pilar: 'RESPEITO', texto: 'O líder mantém tom de voz e postura respeitosos mesmo sob pressão ou diante de erros do time.' },
  { id: 'P05', pilar: 'RESPEITO', texto: 'Quando cometo um erro, a conversa foca em resolver e aprender, não em humilhar ou expor.' },
  { id: 'P06', pilar: 'RESPEITO', texto: 'Sinto segurança para discordar do líder ou trazer más notícias sem medo de retaliação.' },
  { id: 'P14', pilar: 'RESPEITO', texto: 'O líder se comunica com o time de forma respeitosa e equilibrada, sem episódios de arrogância, rispidez ou grosseria.' },
  // ── Pilar 3: Reconhecimento e Validacao ──
  { id: 'P07', pilar: 'RECONHECIMENTO', texto: 'Quando faço uma boa entrega, o líder reconhece, em particular ou diante do time.' },
  { id: 'P08', pilar: 'RECONHECIMENTO', texto: 'Sinto que o líder enxerga meu esforço e progresso, e não apenas os resultados finais ou os erros.' },
  { id: 'P09', pilar: 'RECONHECIMENTO', texto: 'O líder demonstra interesse genuíno por mim como pessoa, não apenas como recurso produtivo.' },
  // ── Pilar 4: Suporte e Disponibilidade ──
  { id: 'P10', pilar: 'SUPORTE', texto: 'Quando travo em um obstáculo técnico ou de processo, consigo acesso ao líder e ele age para destravar.' },
  { id: 'P11', pilar: 'SUPORTE', texto: 'O líder remove barreiras como recursos, alinhamentos e conflitos entre áreas, em vez de só cobrar o resultado.' },
  // ── Pilar 5: Desenvolvimento e Feedback ──
  { id: 'P12', pilar: 'DESENVOLVIMENTO', texto: 'Recebo feedbacks corretivos de forma construtiva, com orientação concreta de como melhorar.' },
  { id: 'P13', pilar: 'DESENVOLVIMENTO', texto: 'O líder conversa comigo sobre meu crescimento e me dá oportunidades de desenvolvimento.' },
]

export const PERGUNTA_SCI = {
  id: 'SCI',
  texto: 'Pense em um episódio recente em que a comunicação ou a atitude do líder poderia ter sido diferente. Descreva a Situação, o Comportamento dele e o Impacto na sua motivação. Não cite nomes nem detalhes que identifiquem você.',
  textoPositivo: 'Descreva um episódio recente em que a atitude do líder impactou positivamente sua motivação. Não cite nomes nem detalhes que identifiquem você.',
}

// n minimo de respostas para liberar o resultado agregado (anonimato)
export const MIN_RESPOSTAS_LIDER = 3

export type ClassificacaoLider = 'REGULAR' | 'BOM' | 'MUITO BOM' | 'OTIMO'

export interface FaixaClassificacao {
  min: number
  max: number
  label: ClassificacaoLider
  cor: string
  diagnostico: string
}

export const CLASSIFICACOES_LIDER: FaixaClassificacao[] = [
  { min: 1.0, max: 2.5, label: 'REGULAR',   cor: '#c0392b', diagnostico: 'Liderança de risco: alto potencial de turnover e desmotivação crônica. Requer intervenção comportamental imediata, com PDI de liderança obrigatório.' },
  { min: 2.6, max: 3.5, label: 'BOM',       cor: '#c9a84c', diagnostico: 'Liderança transacional: entrega o básico, mas falha em validação emocional e clima. O time opera na média.' },
  { min: 3.6, max: 4.5, label: 'MUITO BOM', cor: '#5a7d5a', diagnostico: 'Liderança assertiva: comunicação e suporte sólidos. O time confia no líder. Ajustar pontos cegos específicos por pilar.' },
  { min: 4.6, max: 5.0, label: 'OTIMO',     cor: '#d4af37', diagnostico: 'Liderança inspiradora: equilibra cobrança de alta performance com reconhecimento. Candidato a mentor interno de novos líderes.' },
]

export interface FlagLider {
  tipo: 'PILAR_CRITICO' | 'PERCEPCAO_DIVIDIDA' | 'INTEGRIDADE'
  pilar?: PilarLiderKey
  perguntaId?: string
  valor: number
  mensagem: string
}

export interface ScoreIndividualLider {
  scoreFinal: number
  pilares: Record<PilarLiderKey, number>
}

export interface ResultadoAgregadoLider {
  n: number
  scoreFinal: number
  classificacao: ClassificacaoLider
  cor: string
  diagnostico: string
  pilares: Record<PilarLiderKey, number>
  flags: FlagLider[]
}

/** Trunca na primeira casa decimal (3.55 vira 3.5) antes de classificar. */
function trunc1(x: number): number {
  return Math.floor(x * 10) / 10
}

export function classificarLider(score: number): FaixaClassificacao {
  const s = trunc1(score)
  for (const f of CLASSIFICACOES_LIDER) {
    if (s >= f.min && s <= f.max) return f
  }
  return CLASSIFICACOES_LIDER[0]
}

/** Valida e calcula o score de UMA resposta individual. */
export function calcRespostaLider(respostas: Record<string, number>): ScoreIndividualLider | null {
  const valores: number[] = []
  const porPilar: Record<PilarLiderKey, number[]> = {
    CLAREZA: [], RESPEITO: [], RECONHECIMENTO: [], SUPORTE: [], DESENVOLVIMENTO: [],
  }
  for (const p of PERGUNTAS_LIDER) {
    const v = Number(respostas[p.id])
    if (!Number.isFinite(v) || v < 1 || v > 5) return null  // exige as 13 completas
    valores.push(v)
    porPilar[p.pilar].push(v)
  }
  const media = (arr: number[]) => arr.reduce((a, b) => a + b, 0) / arr.length
  const pilares = Object.fromEntries(
    (Object.keys(porPilar) as PilarLiderKey[]).map((k) => [k, trunc1(media(porPilar[k]))])
  ) as Record<PilarLiderKey, number>
  return { scoreFinal: trunc1(media(valores)), pilares }
}

/** Agrega varias respostas anonimas no resultado do lider. */
export function agregarRespostasLider(
  lista: Array<Record<string, number>>
): ResultadoAgregadoLider | null {
  const validas = lista
    .map((r) => ({ raw: r, calc: calcRespostaLider(r) }))
    .filter((x) => x.calc !== null)
  if (validas.length === 0) return null

  const n = validas.length
  const media = (arr: number[]) => arr.reduce((a, b) => a + b, 0) / arr.length

  // Media por pergunta entre respondentes + desvio padrao (percepcao dividida)
  const flags: FlagLider[] = []
  const mediasPerguntas: Record<string, number> = {}
  for (const p of PERGUNTAS_LIDER) {
    const vals = validas.map((x) => Number(x.raw[p.id]))
    const m = media(vals)
    mediasPerguntas[p.id] = m
    if (n >= MIN_RESPOSTAS_LIDER) {
      const variancia = media(vals.map((v) => (v - m) ** 2))
      const dp = Math.sqrt(variancia)
      if (dp >= 1.5) {
        flags.push({
          tipo: 'PERCEPCAO_DIVIDIDA',
          perguntaId: p.id,
          pilar: p.pilar,
          valor: trunc1(dp),
          mensagem: `Percepção dividida no time sobre "${p.texto}". Parte avalia muito bem e parte muito mal, possível tratamento desigual.`,
        })
      }
    }
  }

  // Pilares e score final a partir das medias por pergunta
  const porPilar: Record<PilarLiderKey, number[]> = {
    CLAREZA: [], RESPEITO: [], RECONHECIMENTO: [], SUPORTE: [], DESENVOLVIMENTO: [],
  }
  for (const p of PERGUNTAS_LIDER) porPilar[p.pilar].push(mediasPerguntas[p.id])
  const pilares = Object.fromEntries(
    (Object.keys(porPilar) as PilarLiderKey[]).map((k) => [k, trunc1(media(porPilar[k]))])
  ) as Record<PilarLiderKey, number>

  const scoreFinal = trunc1(media(Object.values(mediasPerguntas)))
  const faixa = classificarLider(scoreFinal)

  // Pilar critico: media <= 2.0 gera flag mesmo com score geral bom
  for (const k of Object.keys(pilares) as PilarLiderKey[]) {
    if (pilares[k] <= 2.0) {
      flags.unshift({
        tipo: 'PILAR_CRITICO',
        pilar: k,
        valor: pilares[k],
        mensagem: `Pilar crítico: ${PILAR_LIDER_INFO[k].rotulo} com média ${pilares[k].toFixed(1)}. A média geral esconde este ponto, trate como prioridade do PDI de liderança.`,
      })
    }
  }

  return {
    n,
    scoreFinal,
    classificacao: faixa.label,
    cor: faixa.cor,
    diagnostico: faixa.diagnostico,
    pilares,
    flags,
  }
}

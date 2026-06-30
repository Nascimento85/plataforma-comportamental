// ============================================================
// eNPS — Employee Net Promoter Score
// Pesquisa de clima/lealdade anônima. Pergunta-chave 0-10 +
// pergunta aberta (motivo) + tempo de casa (para cruzamento).
// Coleta anônima por token (padrão NR-1).
// ============================================================

export type EnpsCategoria = 'PROMOTOR' | 'NEUTRO' | 'DETRATOR'

export type TempoCasa = 'ATE_3M' | 'DE_3M_1A' | 'DE_1A_2A' | 'MAIS_2A'

export const TEMPO_CASA_OPTIONS: { value: TempoCasa; label: string }[] = [
  { value: 'ATE_3M',   label: 'Menos de 3 meses' },
  { value: 'DE_3M_1A', label: 'De 3 meses a 1 ano' },
  { value: 'DE_1A_2A', label: 'De 1 a 2 anos' },
  { value: 'MAIS_2A',  label: 'Mais de 2 anos' },
]
export const TEMPO_CASA_LABELS: Record<TempoCasa, string> = {
  ATE_3M:   'Menos de 3 meses',
  DE_3M_1A: 'De 3 meses a 1 ano',
  DE_1A_2A: 'De 1 a 2 anos',
  MAIS_2A:  'Mais de 2 anos',
}
const TEMPO_CASA_ORDER: TempoCasa[] = ['ATE_3M', 'DE_3M_1A', 'DE_1A_2A', 'MAIS_2A']

// ── Pergunta-chave ────────────────────────────────────────
export const ENPS_PERGUNTA =
  'Em uma escala de 0 a 10, o quanto você recomendaria nossa empresa como um bom lugar para se trabalhar?'
export const ENPS_ESCALA_MIN = 'Jamais recomendaria'
export const ENPS_ESCALA_MAX = 'Recomendaria com total certeza'
export const ENPS_PERGUNTA_ABERTA = 'Qual é o principal motivo para a sua nota?'

export const CATEGORIA_LABELS: Record<EnpsCategoria, string> = {
  PROMOTOR: 'Promotores',
  NEUTRO:   'Neutros',
  DETRATOR: 'Detratores',
}
export const CATEGORIA_FAIXA: Record<EnpsCategoria, string> = {
  PROMOTOR: 'notas 9 e 10',
  NEUTRO:   'notas 7 e 8',
  DETRATOR: 'notas 0 a 6',
}
export const CATEGORIA_CORES: Record<EnpsCategoria, string> = {
  PROMOTOR: '#7a9e7e',
  NEUTRO:   '#d4b35e',
  DETRATOR: '#cf6f5e',
}

export function categoriaFromNota(nota: number): EnpsCategoria {
  if (nota >= 9) return 'PROMOTOR'
  if (nota >= 7) return 'NEUTRO'
  return 'DETRATOR'
}

// ── Zonas de classificação de mercado ─────────────────────
export type EnpsZona = 'CRITICA' | 'APERFEICOAMENTO' | 'QUALIDADE' | 'EXCELENCIA'

export interface ZonaInfo {
  zona:  EnpsZona
  label: string
  cor:   string
  faixa: string
  texto: string
}

export const ENPS_ZONAS: ZonaInfo[] = [
  { zona: 'CRITICA',         label: 'Zona Crítica',          cor: '#cf6f5e', faixa: 'abaixo de 0',
    texto: 'Há mais detratores do que promotores. O clima precisa de atenção urgente: ouça os detratores e atue nas causas antes que vire turnover.' },
  { zona: 'APERFEICOAMENTO', label: 'Zona de Aperfeiçoamento', cor: '#d4b35e', faixa: '0 a 49',
    texto: 'A base é positiva, mas há espaço claro de melhoria. Identifique os temas recorrentes dos neutros e detratores e priorize ações.' },
  { zona: 'QUALIDADE',       label: 'Zona de Qualidade',     cor: '#6f86c9', faixa: '50 a 74',
    texto: 'Bom clima organizacional. A maioria recomenda a empresa. Mantenha o que funciona e refine os pontos de atrito.' },
  { zona: 'EXCELENCIA',      label: 'Zona de Excelência',    cor: '#7a9e7e', faixa: '75 a 100',
    texto: 'Clima de referência. Os colaboradores são embaixadores da empresa. Documente as boas práticas e proteja essa cultura.' },
]

export function zonaFromScore(score: number): ZonaInfo {
  if (score < 0)  return ENPS_ZONAS[0]
  if (score < 50) return ENPS_ZONAS[1]
  if (score < 75) return ENPS_ZONAS[2]
  return ENPS_ZONAS[3]
}

// ── Convite humanizado (template para o admin copiar) ─────
export function conviteEnpsTemplate(empresa: string, link: string): string {
  const nome = empresa || 'nossa empresa'
  return [
    `Oi! 🙏 Estamos ouvindo o time de ${nome} e a sua opinião é muito importante para a gente.`,
    '',
    'É uma pesquisa de 1 minuto, totalmente ANÔNIMA — ninguém consegue saber quem respondeu o quê. Seja sincero(a), é assim que a gente melhora de verdade.',
    '',
    `Responder leva menos de 1 minuto: ${link}`,
    '',
    'Obrigado por fazer parte disso. 💚',
  ].join('\n')
}

// ============================================================
// MOTOR DE APURAÇÃO
// ============================================================

export interface RespostaEnps {
  nota:      number
  tempoCasa?: TempoCasa | null
  motivo?:   string | null
}

export interface ResultadoEnps {
  n:             number
  score:         number   // -100 a 100
  zona:          ZonaInfo
  promotores:    number
  neutros:       number
  detratores:    number
  pctPromotores: number
  pctNeutros:    number
  pctDetratores: number
  porTempoCasa:  Array<{ faixa: TempoCasa; label: string; n: number; score: number | null }>
  motivos:       { PROMOTOR: string[]; NEUTRO: string[]; DETRATOR: string[] }
}

function scoreDe(respostas: RespostaEnps[]): number | null {
  if (!respostas.length) return null
  let prom = 0, det = 0
  for (const r of respostas) {
    const cat = categoriaFromNota(r.nota)
    if (cat === 'PROMOTOR') prom += 1
    else if (cat === 'DETRATOR') det += 1
  }
  const n = respostas.length
  return Math.round((prom / n) * 100 - (det / n) * 100)
}

export function agregarEnps(respostas: RespostaEnps[]): ResultadoEnps {
  const n = respostas.length
  let promotores = 0, neutros = 0, detratores = 0
  const motivos = { PROMOTOR: [] as string[], NEUTRO: [] as string[], DETRATOR: [] as string[] }

  for (const r of respostas) {
    const cat = categoriaFromNota(r.nota)
    if (cat === 'PROMOTOR') promotores += 1
    else if (cat === 'NEUTRO') neutros += 1
    else detratores += 1
    const m = (r.motivo ?? '').trim()
    if (m) motivos[cat].push(m)
  }

  const score = n ? Math.round((promotores / n) * 100 - (detratores / n) * 100) : 0

  const porTempoCasa = TEMPO_CASA_ORDER.map((faixa) => {
    const doGrupo = respostas.filter((r) => r.tempoCasa === faixa)
    return {
      faixa,
      label: TEMPO_CASA_LABELS[faixa],
      n: doGrupo.length,
      score: doGrupo.length ? scoreDe(doGrupo) : null,
    }
  })

  return {
    n,
    score,
    zona: zonaFromScore(score),
    promotores, neutros, detratores,
    pctPromotores: n ? Math.round((promotores / n) * 100) : 0,
    pctNeutros:    n ? Math.round((neutros / n) * 100) : 0,
    pctDetratores: n ? Math.round((detratores / n) * 100) : 0,
    porTempoCasa,
    motivos,
  }
}

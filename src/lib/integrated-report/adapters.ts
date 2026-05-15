// ============================================================
// Adapters: cada tipo de teste vira um TestSummary normalizado
// ============================================================

import type { SupportedTestType, TestSummary, SummaryEntry } from './types'

export const TEST_LABELS: Record<SupportedTestType, string> = {
  DISC:                   'DISC - Perfil Comportamental',
  MBTI:                   'MBTI - 16 Tipos',
  ENNEAGRAM:              'Eneagrama - 9 Tipos',
  TEMPERAMENT:            '4 Temperamentos',
  ARCHETYPE:              'Arquetipos Junguianos',
  ARCHETYPE_FEMININE:     'Arquetipos Femininos',
  LOVE_LANGUAGES:         'Linguagens do Amor',
  CAREER_ANCHOR:          'Ancoras de Carreira (Schein)',
  EMOTIONAL_INTELLIGENCE: 'Inteligencia Emocional (Goleman)',
}

const DISC_LABELS: Record<string, string> = {
  D: 'Dominante (Executor)', I: 'Influenciador (Comunicador)',
  S: 'Estavel (Planejador)', C: 'Conforme (Analista)',
}

const ENNEAGRAM_NAMES: Record<string, string> = {
  '1': 'Reformador', '2': 'Ajudante', '3': 'Realizador',
  '4': 'Individualista', '5': 'Investigador', '6': 'Leal',
  '7': 'Entusiasta', '8': 'Desafiador', '9': 'Pacificador',
}

const TEMPERAMENT_LABELS: Record<string, string> = {
  COLERICO: 'Colerico', SANGUINEO: 'Sanguineo',
  MELANCOLICO: 'Melancolico', FLEUMATICO: 'Fleumatico',
}

const ARCHETYPE_LABELS: Record<string, string> = {
  INNOCENT: 'Inocente', ORPHAN: 'Orfao', HERO: 'Heroi', CAREGIVER: 'Cuidador',
  EXPLORER: 'Explorador', REBEL: 'Rebelde', LOVER: 'Amante', CREATOR: 'Criador',
  MAGICIAN: 'Mago', SAGE: 'Sabio', RULER: 'Soberano', JESTER: 'Bobo da Corte',
}

const ARCHETYPE_FEMININE_LABELS: Record<string, string> = {
  MAIDEN: 'Donzela', MOTHER: 'Mae', HUNTRESS: 'Cacadora',
  SOVEREIGN: 'Rainha', LOVER: 'Amante', WISE: 'Sabia', CRONE: 'Ancia',
}

const LOVE_LANG_LABELS: Record<string, string> = {
  PA: 'Palavras de Afirmacao', TQ: 'Tempo de Qualidade',
  PR: 'Presentes', AS: 'Atos de Servico', TF: 'Toque Fisico',
}

const CAREER_ANCHOR_LABELS: Record<string, string> = {
  TF: 'Tecnica/Funcional', GG: 'Gerencial Geral',
  AU: 'Autonomia/Independencia', SE: 'Seguranca/Estabilidade',
  CE: 'Criatividade Empreendedora', SD: 'Servico/Dedicacao',
  DP: 'Desafio Puro', EV: 'Estilo de Vida',
}

const EI_DOMAIN_LABELS: Record<string, string> = {
  AUC: 'Autoconsciencia', AUR: 'Autorregulacao', MOT: 'Motivacao',
  EMP: 'Empatia', HAS: 'Habilidades Sociais',
}

export function parseResultData(raw: unknown): Record<string, unknown> | null {
  if (!raw) return null
  if (typeof raw === 'object') return raw as Record<string, unknown>
  if (typeof raw === 'string') {
    try { return JSON.parse(raw) } catch { return null }
  }
  return null
}

function entry(code: string, label: string, score?: number, percentage?: number): SummaryEntry {
  return { code, label, score, percentage }
}

function asNum(v: unknown, fallback = 0): number {
  const n = Number(v)
  return Number.isFinite(n) ? n : fallback
}

function asRecordNum(v: unknown): Record<string, number> | undefined {
  if (!v || typeof v !== 'object') return undefined
  const out: Record<string, number> = {}
  for (const [k, val] of Object.entries(v as Record<string, unknown>)) out[k] = asNum(val)
  return out
}

function adaptDisc(raw: Record<string, unknown>): TestSummary {
  const predominant = String(raw.predominant ?? 'D')
  const secondary   = String(raw.secondary ?? 'I')
  const scores      = asRecordNum(raw.scores)
  const percentages = asRecordNum(raw.percentages)
  return {
    testType: 'DISC', testLabel: TEST_LABELS.DISC,
    primary:   entry(predominant, DISC_LABELS[predominant] ?? predominant, scores?.[predominant], percentages?.[predominant]),
    secondary: entry(secondary,   DISC_LABELS[secondary]   ?? secondary,   scores?.[secondary],   percentages?.[secondary]),
    scores, percentages,
    meta: { combination: raw.combination },
    paragraphHint: `DISC: dominante ${DISC_LABELS[predominant] ?? predominant} com secundario ${DISC_LABELS[secondary] ?? secondary}.`,
  }
}

function adaptMbti(raw: Record<string, unknown>): TestSummary {
  const type = String(raw.type ?? 'INTJ')
  return {
    testType: 'MBTI', testLabel: TEST_LABELS.MBTI,
    primary: entry(type, `Tipo ${type}`),
    scores:      asRecordNum(raw.scores),
    percentages: asRecordNum(raw.percentages),
    meta: { functions: raw.functions },
    paragraphHint: `MBTI: tipo ${type}.`,
  }
}

function adaptEnneagram(raw: Record<string, unknown>): TestSummary {
  const predominant = String(raw.predominant ?? '1')
  const secondary   = String(raw.secondary ?? '2')
  const scores      = asRecordNum(raw.scores)
  const percentages = asRecordNum(raw.percentages)
  return {
    testType: 'ENNEAGRAM', testLabel: TEST_LABELS.ENNEAGRAM,
    primary:   entry(predominant, `Tipo ${predominant} - ${ENNEAGRAM_NAMES[predominant] ?? ''}`.trim(), scores?.[predominant], percentages?.[predominant]),
    secondary: entry(secondary,   `Tipo ${secondary} - ${ENNEAGRAM_NAMES[secondary]   ?? ''}`.trim(), scores?.[secondary],   percentages?.[secondary]),
    scores, percentages,
    paragraphHint: `Eneagrama: predominante ${ENNEAGRAM_NAMES[predominant] ?? 'Tipo ' + predominant}.`,
  }
}

function adaptTemperament(raw: Record<string, unknown>): TestSummary {
  const primary   = String(raw.primaryType ?? 'SANGUINEO')
  const secondary = String(raw.secondaryType ?? 'FLEUMATICO')
  const scores      = asRecordNum(raw.scores)
  const percentages = asRecordNum(raw.percentages)
  return {
    testType: 'TEMPERAMENT', testLabel: TEST_LABELS.TEMPERAMENT,
    primary:   entry(primary,   TEMPERAMENT_LABELS[primary]   ?? primary,   scores?.[primary],   percentages?.[primary]),
    secondary: entry(secondary, TEMPERAMENT_LABELS[secondary] ?? secondary, scores?.[secondary], percentages?.[secondary]),
    scores, percentages,
    paragraphHint: `Temperamentos: ${TEMPERAMENT_LABELS[primary] ?? primary} com base secundaria ${TEMPERAMENT_LABELS[secondary] ?? secondary}.`,
  }
}

function adaptArchetypeJung(raw: Record<string, unknown>): TestSummary {
  const dominant  = String(raw.dominant ?? 'CREATOR')
  const secondary = String(raw.secondary ?? 'SAGE')
  const shadow    = String(raw.shadow ?? 'ORPHAN')
  const scores      = asRecordNum(raw.scores)
  const percentages = asRecordNum(raw.percentages)
  return {
    testType: 'ARCHETYPE', testLabel: TEST_LABELS.ARCHETYPE,
    primary:   entry(dominant,  ARCHETYPE_LABELS[dominant]  ?? dominant,  scores?.[dominant],  percentages?.[dominant]),
    secondary: entry(secondary, ARCHETYPE_LABELS[secondary] ?? secondary, scores?.[secondary], percentages?.[secondary]),
    shadow:    entry(shadow,    ARCHETYPE_LABELS[shadow]    ?? shadow,    scores?.[shadow],    percentages?.[shadow]),
    scores, percentages,
    paragraphHint: `Arquetipo dominante ${ARCHETYPE_LABELS[dominant] ?? dominant} (sombra: ${ARCHETYPE_LABELS[shadow] ?? shadow}).`,
  }
}

function adaptArchetypeFeminine(raw: Record<string, unknown>): TestSummary {
  const dominant   = String(raw.dominant ?? 'SOVEREIGN')
  const secondary  = String(raw.secondary ?? 'WISE')
  const toActivate = String(raw.toActivate ?? 'LOVER')
  const scores      = asRecordNum(raw.scores)
  const percentages = asRecordNum(raw.percentages)
  return {
    testType: 'ARCHETYPE_FEMININE', testLabel: TEST_LABELS.ARCHETYPE_FEMININE,
    primary:    entry(dominant,   ARCHETYPE_FEMININE_LABELS[dominant]   ?? dominant,   scores?.[dominant],   percentages?.[dominant]),
    secondary:  entry(secondary,  ARCHETYPE_FEMININE_LABELS[secondary]  ?? secondary,  scores?.[secondary],  percentages?.[secondary]),
    toActivate: entry(toActivate, ARCHETYPE_FEMININE_LABELS[toActivate] ?? toActivate, scores?.[toActivate], percentages?.[toActivate]),
    scores, percentages,
    paragraphHint: `Arq. feminina dominante ${ARCHETYPE_FEMININE_LABELS[dominant] ?? dominant}.`,
  }
}

function adaptLoveLanguages(raw: Record<string, unknown>): TestSummary {
  const primary   = String(raw.primaryLanguage ?? 'PA')
  const secondary = String(raw.secondaryLanguage ?? 'TQ')
  const scores      = asRecordNum(raw.scores)
  const percentages = asRecordNum(raw.percentages)
  return {
    testType: 'LOVE_LANGUAGES', testLabel: TEST_LABELS.LOVE_LANGUAGES,
    primary:   entry(primary,   LOVE_LANG_LABELS[primary]   ?? primary,   scores?.[primary],   percentages?.[primary]),
    secondary: entry(secondary, LOVE_LANG_LABELS[secondary] ?? secondary, scores?.[secondary], percentages?.[secondary]),
    scores, percentages,
    paragraphHint: `Linguagem do amor primaria: ${LOVE_LANG_LABELS[primary] ?? primary}.`,
  }
}

function adaptCareerAnchor(raw: Record<string, unknown>): TestSummary {
  const primary   = String(raw.primaryAnchor ?? 'TF')
  const secondary = String(raw.secondaryAnchor ?? 'GG')
  const scores      = asRecordNum(raw.scores)
  const percentages = asRecordNum(raw.percentages)
  return {
    testType: 'CAREER_ANCHOR', testLabel: TEST_LABELS.CAREER_ANCHOR,
    primary:   entry(primary,   CAREER_ANCHOR_LABELS[primary]   ?? primary,   scores?.[primary],   percentages?.[primary]),
    secondary: entry(secondary, CAREER_ANCHOR_LABELS[secondary] ?? secondary, scores?.[secondary], percentages?.[secondary]),
    scores, percentages,
    paragraphHint: `Ancora de carreira: ${CAREER_ANCHOR_LABELS[primary] ?? primary}.`,
  }
}

function adaptEmotionalIntelligence(raw: Record<string, unknown>): TestSummary {
  const primaryStrength    = String(raw.primaryStrength ?? 'AUC')
  const primaryDevelopment = String(raw.primaryDevelopment ?? 'HAS')
  const globalLevel        = String(raw.globalLevel ?? 'mid')
  const avg                = asNum(raw.averagePercentage)
  const scores      = asRecordNum(raw.scores)
  const percentages = asRecordNum(raw.percentages)
  return {
    testType: 'EMOTIONAL_INTELLIGENCE', testLabel: TEST_LABELS.EMOTIONAL_INTELLIGENCE,
    primary:   entry(primaryStrength,    `Forca: ${EI_DOMAIN_LABELS[primaryStrength]    ?? primaryStrength}`,    scores?.[primaryStrength],    percentages?.[primaryStrength]),
    secondary: entry(primaryDevelopment, `Vetor: ${EI_DOMAIN_LABELS[primaryDevelopment] ?? primaryDevelopment}`, scores?.[primaryDevelopment], percentages?.[primaryDevelopment]),
    scores, percentages,
    meta: { globalLevel, averagePercentage: avg },
    paragraphHint: `IE Goleman: nivel global ${globalLevel} (${avg}%).`,
  }
}

const ADAPTERS: Record<SupportedTestType, (raw: Record<string, unknown>) => TestSummary> = {
  DISC: adaptDisc,
  MBTI: adaptMbti,
  ENNEAGRAM: adaptEnneagram,
  TEMPERAMENT: adaptTemperament,
  ARCHETYPE: adaptArchetypeJung,
  ARCHETYPE_FEMININE: adaptArchetypeFeminine,
  LOVE_LANGUAGES: adaptLoveLanguages,
  CAREER_ANCHOR: adaptCareerAnchor,
  EMOTIONAL_INTELLIGENCE: adaptEmotionalIntelligence,
}

export function extractSummary(testType: string, rawData: unknown): TestSummary | null {
  const adapter = ADAPTERS[testType as SupportedTestType]
  if (!adapter) return null
  const parsed = parseResultData(rawData)
  if (!parsed) return null
  try {
    return adapter(parsed)
  } catch (err) {
    console.error(`[integrated-report] Falha no adapter ${testType}:`, err)
    return null
  }
}

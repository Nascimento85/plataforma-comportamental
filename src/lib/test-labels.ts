// ============================================================
// src/lib/test-labels.ts
// Fonte única de rótulos, emojis e contagem dos testes.
// Nunca renderizar assessment.testType direto na UI — usar
// testLabel() / testLabelShort() / testEmoji().
// Mantido em arquivo neutro (sem dependência de prisma) para que
// componentes client e server possam importar livremente.
// ============================================================

interface TestMeta {
  label: string
  short: string
  emoji: string
}

// Catálogo real — cada entrada aqui é um teste vendável na plataforma.
// TEST_COUNT deriva deste objeto: ao lançar um teste novo, basta
// adicioná-lo aqui e todo o copy de contagem se atualiza sozinho.
const TEST_CATALOG = {
  DISC:                   { label: 'DISC — Perfil Comportamental',          short: 'DISC',                emoji: '🎭' },
  MBTI:                   { label: 'MBTI — 16 Tipos de Personalidade',      short: 'MBTI',                emoji: '🧩' },
  ENNEAGRAM:              { label: 'Eneagrama — 9 Tipos',                   short: 'Eneagrama',           emoji: '⬡'  },
  TEMPERAMENT:            { label: '4 Temperamentos',                       short: 'Temperamentos',       emoji: '🌡' },
  VAC:                    { label: 'VAC — Perfil Sensorial',                short: 'VAC Sensorial',       emoji: '👁' },
  QMT:                    { label: 'QMT — Quociente Mental Triádico',       short: 'QMT Triádico',        emoji: '🧠' },
  COMUNICACAO:            { label: 'Mapa da Comunicação',                   short: 'Comunicação',         emoji: '🗣' },
  QI:                     { label: 'Raciocínio Lógico (QI)',                short: 'QI',                  emoji: '🧮' },
  BIG_FIVE:               { label: 'Big Five — Liderança',                  short: 'Big Five',            emoji: '🎯' },
  LIDERANCA_SITUACIONAL:  { label: 'Liderança Situacional',                 short: 'Lid. Situacional',    emoji: '👑' },
  EMOTIONAL_INTELLIGENCE: { label: 'Inteligência Emocional (Goleman)',      short: 'IE Goleman',          emoji: '◈'  },
  CAREER_ANCHOR:          { label: 'Âncoras de Carreira',                   short: 'Âncoras de Carreira', emoji: '⚓' },
  LOVE_LANGUAGES:         { label: '5 Linguagens do Amor',                  short: 'Ling. do Amor',       emoji: '💞' },
  ARCHETYPE:              { label: 'Arquétipos — Os 12 Padrões Universais', short: 'Arquétipos',          emoji: '🧭' },
  ARCHETYPE_FEMININE:     { label: 'Arquétipos Femininos — As 7 Energias',  short: 'Arq. Femininos',      emoji: '🌸' },
} as const satisfies Record<string, TestMeta>

// Tipos que aparecem em assessments mas não são testes do catálogo.
const EXTRA_TYPES = {
  BUNDLE:       { label: 'Devolutiva Integrada', short: 'Integrada', emoji: '✨' },
  COMBO_BUNDLE: { label: 'Combo de Testes',      short: 'Combo',     emoji: '✨' },
} as const satisfies Record<string, TestMeta>

export type CatalogTestType = keyof typeof TEST_CATALOG

/** Quantidade real de testes do catálogo — usar em todo copy com número. */
export const TEST_COUNT: number = Object.keys(TEST_CATALOG).length

const ALL: Record<string, TestMeta> = { ...TEST_CATALOG, ...EXTRA_TYPES }

export const TEST_LABELS: Record<string, string> = Object.fromEntries(
  Object.entries(ALL).map(([k, v]) => [k, v.label]),
)

export const TEST_LABELS_SHORT: Record<string, string> = Object.fromEntries(
  Object.entries(ALL).map(([k, v]) => [k, v.short]),
)

export const TEST_TYPE_EMOJI: Record<string, string> = Object.fromEntries(
  Object.entries(ALL).map(([k, v]) => [k, v.emoji]),
)

// Último recurso para um tipo desconhecido: humaniza o enum em vez de
// vazá-lo cru na tela ("ARCHETYPE_FEMININE" → "Archetype Feminine").
function humanize(type: string): string {
  return type
    .toLowerCase()
    .replace(/_/g, ' ')
    .replace(/(^|\s)\S/g, (c) => c.toUpperCase())
}

/** Nome completo do teste (ex.: "DISC — Perfil Comportamental"). */
export function testLabel(type: string): string {
  return ALL[type]?.label ?? humanize(type)
}

/** Nome curto para tabelas e feeds (ex.: "Arq. Femininos"). */
export function testLabelShort(type: string): string {
  return ALL[type]?.short ?? humanize(type)
}

/** Emoji do teste, com fallback neutro. */
export function testEmoji(type: string): string {
  return ALL[type]?.emoji ?? '📋'
}

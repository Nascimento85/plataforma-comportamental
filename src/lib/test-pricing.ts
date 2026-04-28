// ============================================================
// src/lib/test-pricing.ts
// Tabela de preços (créditos por teste) — single source of truth.
// Mantida em arquivo neutro (sem dependência de prisma) para que
// componentes client e server possam importar livremente.
// ============================================================

export const TEST_PRICE = {
  COMBO_BUNDLE:           10,
  DISC:                    3,
  TEMPERAMENT:             2,
  ENNEAGRAM:               2,
  MBTI:                    2,
  CAREER_ANCHOR:           1,
  LOVE_LANGUAGES:          5,
  ARCHETYPE:               3,
  ARCHETYPE_FEMININE:      3,
  EMOTIONAL_INTELLIGENCE:  2,
  PREMIUM_REPORT:         10, // só com créditos PAGOS
} as const satisfies Record<string, number>

export type TestPriceKey = keyof typeof TEST_PRICE

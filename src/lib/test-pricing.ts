// ============================================================
// src/lib/test-pricing.ts
// Tabela de preços (créditos por teste) — single source of truth.
// Mantida em arquivo neutro (sem dependência de prisma) para que
// componentes client e server possam importar livremente.
// ============================================================

export const TEST_PRICE = {
  COMBO_BUNDLE:           10, // combo de 4 testes (promoção)
  DISC:                    4,
  TEMPERAMENT:             3,
  ENNEAGRAM:               5,
  MBTI:                    3,
  CAREER_ANCHOR:           3,
  LOVE_LANGUAGES:          6,
  ARCHETYPE:               4,
  ARCHETYPE_FEMININE:      4,
  EMOTIONAL_INTELLIGENCE:  4,
  VAC:                     3,
  BIG_FIVE:                5,
  QMT:                     3,
  LIDERANCA_SITUACIONAL:   5,
  COMUNICACAO:             5,
  QI:                      4, // Raciocínio Lógico / aptidão cognitiva (pontuado)
  PREMIUM_REPORT:         10, // só com créditos PAGOS
} as const satisfies Record<string, number>

export type TestPriceKey = keyof typeof TEST_PRICE

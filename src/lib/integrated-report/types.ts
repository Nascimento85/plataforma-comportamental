// ============================================================
// Tipos compartilhados da Devolutiva Integrada (Frente B)
// ============================================================

export type IntegratedDepth = 'BASIC' | 'SYNTHETIC' | 'EXECUTIVE' | 'PREMIUM'

export type SupportedTestType =
  | 'DISC'
  | 'MBTI'
  | 'ENNEAGRAM'
  | 'TEMPERAMENT'
  | 'ARCHETYPE'
  | 'ARCHETYPE_FEMININE'
  | 'LOVE_LANGUAGES'
  | 'CAREER_ANCHOR'
  | 'EMOTIONAL_INTELLIGENCE'

export const SUPPORTED_TEST_TYPES: SupportedTestType[] = [
  'DISC', 'MBTI', 'ENNEAGRAM', 'TEMPERAMENT', 'ARCHETYPE',
  'ARCHETYPE_FEMININE', 'LOVE_LANGUAGES', 'CAREER_ANCHOR', 'EMOTIONAL_INTELLIGENCE',
]

export interface SummaryEntry {
  code: string
  label: string
  score?: number
  percentage?: number
}

export interface TestSummary {
  testType: SupportedTestType
  testLabel: string
  primary: SummaryEntry
  secondary?: SummaryEntry
  shadow?: SummaryEntry
  toActivate?: SummaryEntry
  scores?: Record<string, number>
  percentages?: Record<string, number>
  meta?: Record<string, unknown>
  paragraphHint: string
}

export interface IntegratedReportContent {
  generatedAt: string
  depth: IntegratedDepth
  includedTests: SupportedTestType[]
  employeeName: string
  sections: Record<string, unknown>
}

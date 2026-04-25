// ============================================================
// Exporta todas as engines de cálculo
// ============================================================

export { calculateDisc, DISC_GROUPS, DISC_PROFILES, discNeedsIndicators } from './disc'
export { calculateMBTI, MBTI_QUESTIONS, MBTI_TYPES } from './mbti'
export { calculateEnneagram, ENNEAGRAM_QUESTIONS, ENNEAGRAM_TYPES } from './enneagram'
export { calculateTemperament, TEMPERAMENT_QUESTIONS, TEMPERAMENT_PROFILES } from './temperament'
export { calculateLoveLanguages, LOVE_LANGUAGES_QUESTIONS, LOVE_LANGUAGE_LABELS, LOVE_LANGUAGE_REPORTS } from './love-languages'
export {
  calculateCareerAnchor,
  CAREER_ANCHOR_QUESTIONS,
  CAREER_ANCHOR_LABELS,
  CAREER_ANCHOR_REPORTS,
  CAREER_ANCHOR_EMOJIS,
  CAREER_ANCHOR_COLORS,
  shuffleQuestions as shuffleCareerAnchorQuestions,
} from './career-anchor'
export {
  calculateEmotionalIntelligence,
  EI_QUESTIONS,
  EI_DOMAIN_LABELS,
  EI_DOMAIN_SUBTITLES,
  EI_DOMAIN_REPORTS,
  EI_DOMAIN_EMOJIS,
  EI_DOMAIN_COLORS,
  EI_DOMAIN_SUBTHEMES,
  shuffleEIQuestions,
} from './emotional-intelligence'

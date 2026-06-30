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
export {
  calculateVac,
  getVacSessionQuestions,
  VAC_QUESTIONS,
  VAC_CHANNEL_REPORTS,
  VAC_COMBINED_REPORTS,
  VAC_CHANNEL_LABELS,
} from './vac'
export {
  calculateBigFive,
  getBigFiveSessionQuestions,
  BIG_FIVE_QUESTIONS,
  BIG_FIVE_FACTOR_LABELS,
  BIG_FIVE_FACTOR_DESCRIPTIONS,
  BIG_FIVE_FACTOR_COLORS,
  BIG_FIVE_ARCHETYPES,
} from './big-five'
export {
  calculateQmt,
  getQmtSessionQuestions,
  QMT_QUESTIONS,
  QMT_COMBO_REPORTS,
  QMT_DIM_LABELS,
  QMT_DIM_DESC,
} from './qmt'
export {
  calculateLiderancaSituacional,
  getLsSessionQuestions,
  LS_QUESTIONS,
  LS_STYLE_REPORTS,
  LS_STYLE_LABELS,
  LS_STYLE_SHORT,
  LS_STYLE_DESC,
} from './lideranca-situacional'
export {
  calculateComunicacao,
  getCommSessionQuestions,
  COMM_QUESTIONS,
  COMM_PERFIL_REPORTS,
  COMM_PERFIL_LABELS,
  COMM_PERFIL_DESC,
  COMM_SOCIAL_LABELS,
  COMM_SOCIAL_DESC,
  COMM_ASSERT_LABELS,
  COMM_ASSERT_DESC,
} from './comunicacao'
export {
  calculateQi,
  getQiSessionQuestions,
  QI_QUESTIONS,
  QI_PILAR_LABELS,
  QI_FAIXA_LABELS,
} from './qi'

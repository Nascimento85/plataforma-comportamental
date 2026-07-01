// ============================================================
// Degustação via QR Code — configuração compartilhada.
// Cardápio grátis curado (rápidos + alto impacto ao vivo).
// ============================================================

export const VITRINE_EMAIL = 'vitrine@sistema.mapacomportamental.com'
export const VITRINE_NAME  = 'Vitrine · Degustação'

export interface FreeTest {
  testType: string
  label:    string
  emoji:    string
  tagline:  string
  duration: string
}

// Shortlist: testes curtos e de alto impacto para palestras/rodadas.
// (Eneagrama 135q e MBTI 60q ficam de fora de propósito — geram abandono ao vivo.)
export const FREE_TRIAL_TESTS: FreeTest[] = [
  {
    testType: 'DISC',
    label:    'DISC — Perfil Comportamental',
    emoji:    '🎯',
    tagline:  'Como você age, lidera e se comunica sob pressão.',
    duration: '10–15 min',
  },
  {
    testType: 'QI',
    label:    'Teste de QI — Raciocínio Lógico',
    emoji:    '🧠',
    tagline:  'Sua aptidão cognitiva em 4 pilares. Tem resposta certa.',
    duration: '12–18 min',
  },
  {
    testType: 'LIDERANCA_SITUACIONAL',
    label:    'Liderança Situacional',
    emoji:    '🧭',
    tagline:  'Você lidera no automático ou lê o contexto?',
    duration: '6–10 min',
  },
  {
    testType: 'EMOTIONAL_INTELLIGENCE',
    label:    'Inteligência Emocional',
    emoji:    '◈',
    tagline:  'Como você percebe e gerencia emoções sob tensão.',
    duration: '6–10 min',
  },
  {
    testType: 'LOVE_LANGUAGES',
    label:    '5 Linguagens do Amor',
    emoji:    '💞',
    tagline:  'Como você dá e recebe amor — pra vida e pra liderança.',
    duration: '8–12 min',
  },
]

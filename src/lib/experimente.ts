// ============================================================
// Degustação via QR Code — catálogo e configuração compartilhada.
// Cada QR pode curar seu próprio cardápio via ?tests=DISC,QI…
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

// Catálogo dos testes oferecíveis na degustação (rápidos, alto impacto,
// funcionam de forma anônima). Um QR pode escolher um subconjunto.
export const EXPERIMENTE_CATALOG: Record<string, FreeTest> = {
  DISC: {
    testType: 'DISC',
    label:    'DISC — Perfil Comportamental',
    emoji:    '🎯',
    tagline:  'Como você age, lidera e se comunica sob pressão.',
    duration: '10–15 min',
  },
  QI: {
    testType: 'QI',
    label:    'Teste de QI — Raciocínio Lógico',
    emoji:    '🧠',
    tagline:  'Sua aptidão cognitiva em 4 pilares. Tem resposta certa.',
    duration: '12–18 min',
  },
  LIDERANCA_SITUACIONAL: {
    testType: 'LIDERANCA_SITUACIONAL',
    label:    'Liderança Situacional',
    emoji:    '🧭',
    tagline:  'Você lidera no automático ou lê o contexto?',
    duration: '6–10 min',
  },
  EMOTIONAL_INTELLIGENCE: {
    testType: 'EMOTIONAL_INTELLIGENCE',
    label:    'Inteligência Emocional',
    emoji:    '◈',
    tagline:  'Como você percebe e gerencia emoções sob tensão.',
    duration: '6–10 min',
  },
  COMUNICACAO: {
    testType: 'COMUNICACAO',
    label:    'O Teste do Silêncio',
    emoji:    '💬',
    tagline:  'O que você faz quando a conversa esquenta — e o que isso custa.',
    duration: '8–12 min',
  },
  QMT: {
    testType: 'QMT',
    label:    'QMT — Quociente Mental Triádico',
    emoji:    '🔺',
    tagline:  'Sua mente pensa por estratégia, pessoas ou execução?',
    duration: '8–12 min',
  },
  VAC: {
    testType: 'VAC',
    label:    'VAC — Mapa Sensorial',
    emoji:    '👁',
    tagline:  'Seu canal: visual, auditivo ou sinestésico?',
    duration: '8–12 min',
  },
}

// Cardápio padrão (quando o QR não especifica ?tests=)
export const DEFAULT_FREE_TESTS = ['COMUNICACAO', 'EMOTIONAL_INTELLIGENCE', 'VAC']

// Todos os testes permitidos na degustação (validação na API)
export const EXPERIMENTE_ALLOWED = Object.keys(EXPERIMENTE_CATALOG)

// Resolve o cardápio de um QR a partir do parâmetro ?tests=
export function resolveExperimenteTests(param?: string | null): FreeTest[] {
  const keys = (param ?? '')
    .split(',')
    .map((s) => s.trim().toUpperCase())
    .filter((k) => EXPERIMENTE_CATALOG[k])
  const chosen = keys.length ? keys : DEFAULT_FREE_TESTS
  // remove duplicatas preservando ordem
  return Array.from(new Set(chosen)).map((k) => EXPERIMENTE_CATALOG[k]).filter(Boolean)
}

// Compat: cardápio padrão como lista
export const FREE_TRIAL_TESTS: FreeTest[] = DEFAULT_FREE_TESTS.map((k) => EXPERIMENTE_CATALOG[k])

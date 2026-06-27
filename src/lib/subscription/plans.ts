// ============================================================
// Planos de assinatura (grade mensal por nº de colaboradores).
// Stripe Price IDs vêm de env vars (criar no Stripe Dashboard).
// Os planos antigos (ESSENCIAL/PROFISSIONAL/ENTERPRISE) seguem aqui
// como LEGADO para não quebrar assinaturas e grants já existentes,
// mas não aparecem na landing (PLANOS_LIST mostra só a grade nova).
// ============================================================

export type PlanoKey =
  | 'INDIVIDUAL' | 'EQUIPE_5' | 'EQUIPE_10' | 'EQUIPE_20' | 'EQUIPE_50' | 'EQUIPE_PLUS'
  | 'ESSENCIAL' | 'PROFISSIONAL' | 'ENTERPRISE'  // legado

export type StatusAssinatura = 'TRIALING' | 'ACTIVE' | 'PAST_DUE' | 'CANCELED' | 'EXPIRED'

export interface PlanoInfo {
  key:               PlanoKey
  nome:              string
  precoMensalCents:  number | null  // null = "consultar"
  precoLabel:        string
  employeeCap:       number | null  // nº máx. de colaboradores/candidatos. null = ilimitado
  stripePriceId:     string | undefined
  destaque:          boolean        // marca como recomendado na landing
  ctaLabel:          string         // texto do botão na landing
  publico:           boolean        // aparece na landing?
  subtitulo:         string
  features:          string[]       // bullets exibidos no card
}

export const PLANOS: Record<PlanoKey, PlanoInfo> = {
  INDIVIDUAL: {
    key: 'INDIVIDUAL', nome: 'Individual', precoMensalCents: 9700, precoLabel: 'R$ 97',
    employeeCap: 1, stripePriceId: process.env.STRIPE_PRICE_INDIVIDUAL, destaque: false, publico: true,
    ctaLabel: 'Assinar individual', subtitulo: 'Para o seu autoconhecimento',
    features: [
      'Acesso premium para você',
      'Todos os testes, sem limite de uso',
      'Devolutivas aprofundadas e devolutiva integrada',
      'Sugestões de evolução personalizadas',
    ],
  },
  EQUIPE_5: {
    key: 'EQUIPE_5', nome: 'Equipe 5', precoMensalCents: 44700, precoLabel: 'R$ 447',
    employeeCap: 5, stripePriceId: process.env.STRIPE_PRICE_EQUIPE_5, destaque: false, publico: true,
    ctaLabel: 'Começar trial de 7 dias', subtitulo: 'Pequenas equipes, até 5 colaboradores',
    features: [
      'Até 5 colaboradores cadastrados',
      'Testes comportamentais ilimitados',
      'Gestão de Equipes e Avaliação de Líderes',
      'Módulo NR-1 Psicossocial completo',
      'Guia de Entrevista personalizado',
    ],
  },
  EQUIPE_10: {
    key: 'EQUIPE_10', nome: 'Equipe 10', precoMensalCents: 79700, precoLabel: 'R$ 797',
    employeeCap: 10, stripePriceId: process.env.STRIPE_PRICE_EQUIPE_10, destaque: true, publico: true,
    ctaLabel: 'Começar trial de 7 dias', subtitulo: 'Até 10 colaboradores',
    features: [
      'Até 10 colaboradores cadastrados',
      'Tudo do plano Equipe 5',
      'Matriz de Talentos e organograma',
      'PDF executivo com narrativa consultiva',
      'Suporte prioritário por WhatsApp',
    ],
  },
  EQUIPE_20: {
    key: 'EQUIPE_20', nome: 'Equipe 20', precoMensalCents: 139700, precoLabel: 'R$ 1.397',
    employeeCap: 20, stripePriceId: process.env.STRIPE_PRICE_EQUIPE_20, destaque: false, publico: true,
    ctaLabel: 'Começar trial de 7 dias', subtitulo: 'Até 20 colaboradores',
    features: [
      'Até 20 colaboradores cadastrados',
      'Tudo do plano Equipe 10',
      'Hierarquia de equipes (multinível)',
      'Avaliação de liderança em cascata',
    ],
  },
  EQUIPE_50: {
    key: 'EQUIPE_50', nome: 'Equipe 50', precoMensalCents: 234700, precoLabel: 'R$ 2.347',
    employeeCap: 50, stripePriceId: process.env.STRIPE_PRICE_EQUIPE_50, destaque: false, publico: true,
    ctaLabel: 'Começar trial de 7 dias', subtitulo: 'Até 50 colaboradores',
    features: [
      'Até 50 colaboradores cadastrados',
      'Tudo do plano Equipe 20',
      'Onboarding assistido',
      'Relatórios consolidados da empresa',
    ],
  },
  EQUIPE_PLUS: {
    key: 'EQUIPE_PLUS', nome: 'Acima de 50', precoMensalCents: null, precoLabel: 'Consultar',
    employeeCap: null, stripePriceId: undefined, destaque: false, publico: true,
    ctaLabel: 'Falar com vendas', subtitulo: 'Mais de 50 colaboradores',
    features: [
      'Colaboradores ilimitados',
      'Tudo do plano Equipe 50',
      'SLA contratual e faturamento corporativo',
      'Customizações sob demanda',
    ],
  },

  // ── LEGADO (não aparece na landing) ──
  ESSENCIAL: {
    key: 'ESSENCIAL', nome: 'Essencial', precoMensalCents: 49700, precoLabel: 'R$ 497',
    employeeCap: 10, stripePriceId: process.env.STRIPE_PRICE_ESSENCIAL, destaque: false, publico: false,
    ctaLabel: 'Assinar', subtitulo: 'Legado', features: ['Até 10 funcionários', 'Testes ilimitados'],
  },
  PROFISSIONAL: {
    key: 'PROFISSIONAL', nome: 'Profissional', precoMensalCents: 99000, precoLabel: 'R$ 990',
    employeeCap: 50, stripePriceId: process.env.STRIPE_PRICE_PROFISSIONAL, destaque: false, publico: false,
    ctaLabel: 'Assinar', subtitulo: 'Legado', features: ['Até 50 funcionários', 'Testes ilimitados'],
  },
  ENTERPRISE: {
    key: 'ENTERPRISE', nome: 'Enterprise', precoMensalCents: null, precoLabel: 'Consultar',
    employeeCap: null, stripePriceId: undefined, destaque: false, publico: false,
    ctaLabel: 'Falar com vendas', subtitulo: 'Legado', features: ['Funcionários ilimitados'],
  },
}

// Lista pública (landing) — só a grade nova, na ordem de exibição
export const PLANOS_LIST: PlanoInfo[] = (
  ['INDIVIDUAL', 'EQUIPE_5', 'EQUIPE_10', 'EQUIPE_20', 'EQUIPE_50', 'EQUIPE_PLUS'] as PlanoKey[]
).map(k => PLANOS[k])

export const TRIAL_DIAS = 7

// Pacote de créditos avulsos (compra única)
export const CREDIT_PACK = { creditos: 5, precoCents: 4700, precoLabel: 'R$ 47' }

// Status que liberam acesso a recursos premium
export function isStatusAtivo(status: string | null | undefined): boolean {
  return status === 'TRIALING' || status === 'ACTIVE'
}

// Limite de colaboradores de um plano (null = ilimitado)
export function employeeCapDoPlano(plan: string | null | undefined): number | null {
  if (!plan) return null
  const info = (PLANOS as Record<string, PlanoInfo>)[plan]
  return info ? info.employeeCap : null
}

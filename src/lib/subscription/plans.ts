// ============================================================
// Definicao dos 3 planos PJ.
// Stripe Price IDs vem de env vars (criar no Stripe Dashboard).
// ============================================================

export type PlanoKey = 'ESSENCIAL' | 'PROFISSIONAL' | 'ENTERPRISE'

export type StatusAssinatura = 'TRIALING' | 'ACTIVE' | 'PAST_DUE' | 'CANCELED' | 'EXPIRED'

export interface PlanoInfo {
  key:               PlanoKey
  nome:              string
  precoMensalCents:  number | null  // null = "consultar"
  precoLabel:        string
  employeeCap:       number | null  // null = ilimitado
  stripePriceId:     string | undefined
  destaque:          boolean        // marca como recomendado na landing
  ctaLabel:          string         // texto do botao na landing
  features:          string[]       // bullets exibidos no card
}

export const PLANOS: Record<PlanoKey, PlanoInfo> = {
  ESSENCIAL: {
    key:               'ESSENCIAL',
    nome:              'Essencial',
    precoMensalCents:  49700,
    precoLabel:        'R$ 497',
    employeeCap:       10,
    stripePriceId:     process.env.STRIPE_PRICE_ESSENCIAL,
    destaque:          false,
    ctaLabel:          'Começar trial de 7 dias',
    features: [
      'Até 10 funcionários cadastrados',
      'Testes comportamentais ilimitados',
      'Devolutiva integrada por funcionário',
      'Módulo NR-1 Psicossocial completo',
      'Guia de Entrevista personalizado',
      'PDF executivo com narrativa consultiva',
      'Suporte por email',
    ],
  },
  PROFISSIONAL: {
    key:               'PROFISSIONAL',
    nome:              'Profissional',
    precoMensalCents:  99000,
    precoLabel:        'R$ 990',
    employeeCap:       50,
    stripePriceId:     process.env.STRIPE_PRICE_PROFISSIONAL,
    destaque:          true,
    ctaLabel:          'Começar trial de 7 dias',
    features: [
      'Até 50 funcionários cadastrados',
      'Testes comportamentais ilimitados',
      'Devolutiva integrada por funcionário',
      'Módulo NR-1 Psicossocial completo',
      'Guia de Entrevista personalizado',
      'PDF executivo com narrativa consultiva',
      'Suporte prioritário por WhatsApp',
    ],
  },
  ENTERPRISE: {
    key:               'ENTERPRISE',
    nome:              'Enterprise',
    precoMensalCents:  null,
    precoLabel:        'Consultar',
    employeeCap:       null,
    stripePriceId:     undefined,
    destaque:          false,
    ctaLabel:          'Falar com vendas',
    features: [
      'Funcionários ilimitados',
      'Tudo do plano Profissional',
      'Onboarding dedicado',
      'SLA contratual',
      'Customizações sob demanda',
      'Faturamento corporativo',
    ],
  },
}

export const PLANOS_LIST: PlanoInfo[] = ['ESSENCIAL', 'PROFISSIONAL', 'ENTERPRISE'].map(k => PLANOS[k as PlanoKey])

export const TRIAL_DIAS = 7

// Status que liberam acesso a recursos premium
export function isStatusAtivo(status: string | null | undefined): boolean {
  return status === 'TRIALING' || status === 'ACTIVE'
}

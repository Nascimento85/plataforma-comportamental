'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

interface InitialState {
  hasActiveAccess:   boolean
  isTrialing:        boolean
  isActive:          boolean
  status:            string | null
  planKey:           string | null
  planoNome:         string | null
  planoPreco:        string | null
  employeeCap:       number | null
  trialEnd:          string | null
  currentPeriodEnd:  string | null
  daysUntilTrialEnd: number | null
  trialDias:         number
}

const PLAN_LABEL: Record<string, { nome: string; preco: string; cap: string }> = {
  ESSENCIAL:    { nome: 'Essencial',    preco: 'R$ 497/mês', cap: 'até 10 funcionários'    },
  PROFISSIONAL: { nome: 'Profissional', preco: 'R$ 990/mês', cap: 'até 50 funcionários'    },
  ENTERPRISE:   { nome: 'Enterprise',   preco: 'Sob consulta', cap: 'funcionários ilimitados' },
}

export default function AssinaturaClient({ initial }: { initial: InitialState }) {
  const router = useRouter()
  const params = useSearchParams()
  const [loading, setLoading] = useState<string | null>(null)
  const [erro, setErro]       = useState<string | null>(null)
  const [okMsg, setOkMsg]     = useState<string | null>(
    params.get('success') === '1' ? 'Pagamento confirmado. Sua assinatura está ativa.' :
    params.get('canceled') === '1' ? 'Checkout cancelado. Quando quiser, é só clicar de novo.' :
    null
  )

  async function ativarTrial() {
    setLoading('trial'); setErro(null); setOkMsg(null)
    try {
      const res = await fetch('/api/subscription/trial', { method: 'POST' })
      const data = await res.json()
      if (!res.ok) { setErro(data.error ?? 'Falha ao ativar trial.'); return }
      setOkMsg('Trial ativado. Você tem 7 dias de acesso completo.')
      router.refresh()
    } catch { setErro('Erro de conexão.') }
    finally { setLoading(null) }
  }

  async function irParaCheckout(plan: 'ESSENCIAL' | 'PROFISSIONAL') {
    setLoading(`checkout-${plan}`); setErro(null); setOkMsg(null)
    try {
      const res = await fetch('/api/subscription/checkout', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ plan }),
      })
      const data = await res.json()
      if (!res.ok || !data.url) { setErro(data.error ?? 'Falha ao iniciar checkout.'); return }
      window.location.href = data.url
    } catch { setErro('Erro de conexão.'); setLoading(null) }
  }

  async function abrirPortal() {
    setLoading('portal'); setErro(null); setOkMsg(null)
    try {
      const res = await fetch('/api/subscription/portal', { method: 'POST' })
      const data = await res.json()
      if (!res.ok || !data.url) { setErro(data.error ?? 'Falha ao abrir portal.'); return }
      window.location.href = data.url
    } catch { setErro('Erro de conexão.'); setLoading(null) }
  }

  // ── Renderiza conforme status ───────────────────────────────

  // SEM assinatura nunca ativada
  if (!initial.status) {
    return (
      <div className="space-y-4">
        {erro && <Alerta tipo="erro">{erro}</Alerta>}
        {okMsg && <Alerta tipo="ok">{okMsg}</Alerta>}

        <section className="soul-panel">
          <h2 className="font-serif text-xl font-semibold text-soul-ink mb-2">Comece com {initial.trialDias} dias grátis</h2>
          <p className="text-[14px] text-soul-ink/80 font-medium mb-4">
            Acesso completo a testes ilimitados, NR-1 Psicossocial, Guia de Entrevista e relatório
            executivo. Sem cartão de crédito.
          </p>
          <button
            type="button"
            onClick={ativarTrial}
            disabled={loading === 'trial'}
            className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[14px] font-bold text-white shadow-terra disabled:opacity-60"
            style={{ background: 'linear-gradient(135deg, #c4633a, #d4943a)' }}
          >
            {loading === 'trial' ? 'Ativando…' : `✦ Ativar trial de ${initial.trialDias} dias`}
          </button>
        </section>

        <PlanosPagos loading={loading} onCheckout={irParaCheckout} />
      </div>
    )
  }

  // Trial ativo
  if (initial.isTrialing && initial.hasActiveAccess) {
    return (
      <div className="space-y-4">
        {erro && <Alerta tipo="erro">{erro}</Alerta>}
        {okMsg && <Alerta tipo="ok">{okMsg}</Alerta>}

        <StatusCard
          titulo="Trial ativo"
          subtitulo={`${initial.daysUntilTrialEnd ?? 0} dia${(initial.daysUntilTrialEnd ?? 0) === 1 ? '' : 's'} restantes`}
          extra={initial.trialEnd ? `Acesso completo até ${new Date(initial.trialEnd).toLocaleDateString('pt-BR')}` : null}
          cor="trial"
        />

        <section className="soul-panel">
          <h2 className="font-serif text-lg font-semibold text-soul-ink mb-2">Garanta a continuidade do acesso</h2>
          <p className="text-[14px] text-soul-ink/80 font-medium mb-4">
            Quando o trial acabar, a conta volta ao modelo de créditos pessoais. Para manter testes ilimitados,
            NR-1 e Guia de Entrevista, escolha um plano abaixo:
          </p>
          <PlanosPagos loading={loading} onCheckout={irParaCheckout} compacto />
        </section>
      </div>
    )
  }

  // Trial expirou OU assinatura cancelada/sem acesso
  if (!initial.hasActiveAccess) {
    return (
      <div className="space-y-4">
        {erro && <Alerta tipo="erro">{erro}</Alerta>}
        {okMsg && <Alerta tipo="ok">{okMsg}</Alerta>}

        <StatusCard
          titulo={initial.status === 'CANCELED' ? 'Assinatura cancelada' : 'Acesso expirado'}
          subtitulo="Para usar NR-1, Guia de Entrevista e testes ilimitados, assine um plano."
          cor="expirado"
        />

        <PlanosPagos loading={loading} onCheckout={irParaCheckout} />
      </div>
    )
  }

  // Assinatura paga ativa
  return (
    <div className="space-y-4">
      {erro && <Alerta tipo="erro">{erro}</Alerta>}
      {okMsg && <Alerta tipo="ok">{okMsg}</Alerta>}

      <StatusCard
        titulo={`Plano ${initial.planoNome ?? ''} ativo`}
        subtitulo={initial.planoPreco ? `${initial.planoPreco} · ${initial.employeeCap === null ? 'funcionários ilimitados' : `até ${initial.employeeCap} funcionários`}` : ''}
        extra={initial.currentPeriodEnd ? `Próxima cobrança em ${new Date(initial.currentPeriodEnd).toLocaleDateString('pt-BR')}` : null}
        cor="ativo"
      />

      <section className="soul-panel">
        <h2 className="font-serif text-lg font-semibold text-soul-ink mb-2">Gerenciar assinatura</h2>
        <p className="text-[14px] text-soul-ink/80 font-medium mb-4">
          Acesse o portal seguro para trocar cartão, baixar notas fiscais, mudar de plano ou cancelar.
        </p>
        <button
          type="button"
          onClick={abrirPortal}
          disabled={loading === 'portal'}
          className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[14px] font-bold transition-colors disabled:opacity-60"
          style={{ background: 'rgba(196,99,58,0.10)', color: '#8a4a26', border: '1px solid rgba(196,99,58,0.30)' }}
        >
          {loading === 'portal' ? 'Abrindo…' : 'Abrir portal do Stripe'}
        </button>
      </section>
    </div>
  )
}

// ── Sub-componentes ─────────────────────────────────────────

function Alerta({ tipo, children }: { tipo: 'ok' | 'erro'; children: React.ReactNode }) {
  const styles = tipo === 'ok'
    ? { background: 'rgba(122,158,126,0.15)', border: '1px solid rgba(122,158,126,0.40)', color: '#3d6b40' }
    : { background: 'rgba(196,122,114,0.15)', border: '1px solid rgba(196,122,114,0.45)', color: '#7a3d35' }
  return (
    <div className="rounded-xl px-4 py-3 text-[13.5px] font-semibold" style={styles}>{children}</div>
  )
}

function StatusCard({
  titulo, subtitulo, extra, cor,
}: {
  titulo: string
  subtitulo: string
  extra?: string | null
  cor: 'trial' | 'ativo' | 'expirado'
}) {
  const palette = {
    trial:    { bg: 'rgba(212,184,92,0.10)', border: 'rgba(201,168,76,0.45)', label: 'TRIAL ATIVO',     labelColor: '#a87f1c' },
    ativo:    { bg: 'rgba(122,158,126,0.10)', border: 'rgba(122,158,126,0.40)', label: 'ASSINATURA ATIVA', labelColor: '#3d6b40' },
    expirado: { bg: 'rgba(196,99,58,0.08)',   border: 'rgba(196,99,58,0.35)',   label: 'SEM ACESSO',      labelColor: '#8a3a1f' },
  }[cor]
  return (
    <section className="rounded-2xl p-5" style={{ background: palette.bg, border: `1px solid ${palette.border}` }}>
      <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: palette.labelColor }}>{palette.label}</p>
      <h2 className="font-serif text-2xl font-semibold text-soul-ink leading-tight">{titulo}</h2>
      <p className="text-[14px] text-soul-ink/85 font-medium mt-1">{subtitulo}</p>
      {extra && <p className="text-[12.5px] text-soul-ink/65 font-medium italic mt-1">{extra}</p>}
    </section>
  )
}

function PlanosPagos({
  loading, onCheckout, compacto,
}: {
  loading: string | null
  onCheckout: (plan: 'ESSENCIAL' | 'PROFISSIONAL') => void
  compacto?: boolean
}) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-3 ${compacto ? '' : 'mt-2'}`}>
      {(['ESSENCIAL', 'PROFISSIONAL'] as const).map(planKey => {
        const p = PLAN_LABEL[planKey]
        const isLoading = loading === `checkout-${planKey}`
        const destaque = planKey === 'PROFISSIONAL'
        return (
          <div key={planKey} className="rounded-2xl p-5"
               style={{
                 background: destaque ? 'rgba(212,148,58,0.06)' : 'rgba(196,99,58,0.03)',
                 border: destaque ? '1.5px solid rgba(212,148,58,0.40)' : '1px solid rgba(196,99,58,0.18)',
               }}>
            <div className="flex items-baseline justify-between mb-1">
              <h3 className="font-serif text-lg font-semibold text-soul-ink">{p.nome}</h3>
              {destaque && <span className="text-[9.5px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded" style={{ background: 'rgba(212,184,92,0.30)', color: '#8a5c1e' }}>RECOMENDADO</span>}
            </div>
            <p className="font-serif text-2xl font-semibold text-soul-ink mb-1">{p.preco}</p>
            <p className="text-[12.5px] text-soul-ink/65 font-medium mb-4">{p.cap}</p>
            <button
              type="button"
              onClick={() => onCheckout(planKey)}
              disabled={isLoading}
              className="w-full rounded-full px-4 py-2.5 text-[13.5px] font-bold text-white shadow-terra disabled:opacity-60"
              style={{ background: 'linear-gradient(135deg, #c4633a, #d4943a)' }}
            >
              {isLoading ? 'Abrindo Stripe…' : 'Assinar este plano'}
            </button>
          </div>
        )
      })}
    </div>
  )
}

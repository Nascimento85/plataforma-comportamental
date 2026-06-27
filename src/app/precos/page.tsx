// ============================================================
// /precos — landing publica com a grade de planos (individual + equipes)
// ============================================================

import type { Metadata } from 'next'
import Link from 'next/link'
import { PLANOS_LIST, TRIAL_DIAS } from '@/lib/subscription/plans'

export const metadata: Metadata = {
  title:       'Planos e preços · Psique',
  description: 'Assinatura mensal da plataforma Psique. Plano individual e planos por equipe (5, 10, 20, 50+ colaboradores). Trial gratuito de 7 dias sem cartão de crédito.',
}

export default function PrecosPage() {
  return (
    <main className="min-h-screen" style={{ background: '#0f0d0a' }}>
      {/* Header simples */}
      <header className="px-6 py-5 border-b" style={{ borderColor: 'rgba(201,168,76,0.15)' }}>
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 no-underline">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center font-serif text-lg font-bold text-soul-ink"
              style={{ background: 'linear-gradient(135deg, #c9a84c, #d4943a)' }}
            >Ψ</div>
            <span className="font-serif text-lg font-semibold text-white">Psique</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-[15px] text-white/80 hover:text-white font-medium no-underline">Entrar</Link>
            <Link href="/register"
                  className="text-[14px] font-bold text-soul-ink px-4 py-2 rounded-full no-underline transition-transform hover:-translate-y-px"
                  style={{ background: 'linear-gradient(135deg, #c9a84c, #d4943a)' }}>
              Criar conta
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="px-6 pt-14 pb-10 text-center">
        <p className="text-[13.5px] uppercase tracking-[0.18em] font-bold mb-4" style={{ color: '#d4b85c' }}>
          Planos para empresas
        </p>
        <h1 className="font-serif font-semibold text-white text-4xl md:text-5xl leading-[1.1] mb-5 max-w-3xl mx-auto">
          A plataforma completa de inteligência comportamental para PMEs.
        </h1>
        <p className="text-[16px] text-white/85 font-medium max-w-2xl mx-auto leading-relaxed">
          Teste comportamental ilimitado, módulo NR-1 Psicossocial, Guia de Entrevista
          personalizado e relatório executivo gerado por IA. Trial de {TRIAL_DIAS} dias gratuitos, sem cartão.
        </p>
      </section>

      {/* Cards de planos */}
      <section className="px-6 pb-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5">
          {PLANOS_LIST.map(plano => (
            <article
              key={plano.key}
              className="rounded-2xl p-7 flex flex-col"
              style={{
                background: plano.destaque
                  ? 'linear-gradient(180deg, rgba(212,184,92,0.08), rgba(212,148,58,0.04))'
                  : 'rgba(255,255,255,0.03)',
                border: plano.destaque
                  ? '1.5px solid rgba(201,168,76,0.45)'
                  : '1px solid rgba(255,255,255,0.10)',
                boxShadow: plano.destaque ? '0 14px 40px rgba(0,0,0,0.35)' : 'none',
                transform: plano.destaque ? 'translateY(-4px)' : 'none',
              }}
            >
              {plano.destaque && (
                <div className="self-start mb-3 text-[12px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
                     style={{ background: 'rgba(212,184,92,0.20)', color: '#e6c869' }}>
                  Recomendado
                </div>
              )}

              <h2 className="font-serif text-2xl font-semibold text-white mb-1">{plano.nome}</h2>

              <div className="mt-3 mb-2">
                <span className="font-serif text-4xl font-semibold text-white">{plano.precoLabel}</span>
                {plano.precoMensalCents !== null && (
                  <span className="text-[15px] text-white/72 font-medium ml-1">/mês</span>
                )}
              </div>

              <p className="text-[14px] text-white/78 font-medium mb-5">
                {plano.employeeCap !== null
                  ? `Até ${plano.employeeCap} funcionários cadastrados`
                  : 'Funcionários ilimitados'}
              </p>

              <ul className="space-y-2.5 mb-7 flex-1">
                {plano.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-[15px] text-white/90 font-medium leading-snug">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#d4b85c"
                         strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
                         className="mt-1 flex-shrink-0">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>

              {plano.precoMensalCents !== null ? (
                <Link
                  href="/register?intent=trial"
                  className="block text-center text-[15px] font-bold px-5 py-3 rounded-full no-underline transition-transform hover:-translate-y-px"
                  style={{
                    background: plano.destaque
                      ? 'linear-gradient(135deg, #c9a84c, #d4943a)'
                      : 'rgba(255,255,255,0.08)',
                    color:  plano.destaque ? '#1c1a17' : '#ffffff',
                    border: plano.destaque ? 'none' : '1px solid rgba(255,255,255,0.20)',
                  }}
                >
                  {plano.ctaLabel}
                </Link>
              ) : (
                <a
                  href={`https://wa.me/?text=${encodeURIComponent('Olá, gostaria de uma proposta Enterprise da plataforma Psique.')}`}
                  target="_blank" rel="noreferrer"
                  className="block text-center text-[15px] font-bold px-5 py-3 rounded-full no-underline transition-transform hover:-translate-y-px"
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    color: '#ffffff',
                    border: '1px solid rgba(255,255,255,0.20)',
                  }}
                >
                  {plano.ctaLabel}
                </a>
              )}
            </article>
          ))}
        </div>

        {/* Linha de tranquilidade */}
        <div className="max-w-3xl mx-auto mt-10 text-center">
          <p className="text-[14px] text-white/72 font-medium">
            Trial de {TRIAL_DIAS} dias sem cartão · Cancele quando quiser · Suporte humano via WhatsApp
          </p>
        </div>
      </section>

      {/* Bloco PF (pessoa fisica) */}
      <section className="px-6 py-12 border-t" style={{ borderColor: 'rgba(201,168,76,0.15)', background: 'rgba(255,255,255,0.02)' }}>
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[13.5px] uppercase tracking-[0.18em] font-bold mb-3" style={{ color: '#d4b85c' }}>
            Pessoa física
          </p>
          <h2 className="font-serif font-semibold text-white text-2xl mb-3">
            Quer fazer um teste por conta própria?
          </h2>
          <p className="text-[15px] text-white/80 font-medium mb-5 leading-relaxed">
            Sem assinatura. Compre créditos avulsos e faça quando quiser. Você ganha 10 créditos cortesia no cadastro.
          </p>
          <Link
            href="/register"
            className="inline-block text-[14px] font-bold text-white px-5 py-2.5 rounded-full no-underline"
            style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.20)' }}
          >
            Criar conta pessoal e ganhar 10 créditos
          </Link>
        </div>
      </section>

      <footer className="px-6 py-8 text-center" style={{ background: '#0a0907' }}>
        <p className="text-[13.5px] text-white/68 font-medium">
          © Psique · Mapa Comportamental ·
          <Link href="/termos-de-uso" className="text-white/72 hover:text-white/85 no-underline ml-1">Termos</Link> ·
          <Link href="/politica-de-privacidade" className="text-white/72 hover:text-white/85 no-underline ml-1">Privacidade</Link>
        </p>
      </footer>
    </main>
  )
}

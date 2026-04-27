'use client'

// ============================================================
// WelcomeModal — Boas-vindas no primeiro login
// ============================================================
// Lógica de exibição:
//   - Server passa `shouldShow` (true se !rewardedYet AND nunca viu)
//   - Cliente checa localStorage para honrar "já fechou antes"
//   - localStorage key: psique_welcome_seen_<companyId>
// ============================================================

import { useEffect, useState } from 'react'
import Link from 'next/link'

const STORAGE_PREFIX = 'psique_welcome_seen_'

interface Props {
  companyId: string
  firstName: string
  /** Quanto crédito o usuário ganhou no cadastro (default: 4) */
  initialCredits?: number
  /** Quanto crédito ele PODE ganhar completando o perfil (default: 6) */
  bonusCredits?: number
}

export default function WelcomeModal({
  companyId,
  firstName,
  initialCredits = 4,
  bonusCredits = 6,
}: Props) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    // Se já foi visto antes, não mostra
    const key = STORAGE_PREFIX + companyId
    if (typeof window === 'undefined') return
    if (localStorage.getItem(key) === '1') return
    // Pequeno delay para a página renderizar antes do modal aparecer
    const t = setTimeout(() => setOpen(true), 350)
    return () => clearTimeout(t)
  }, [companyId])

  function close() {
    setOpen(false)
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_PREFIX + companyId, '1')
    }
  }

  if (!open) return null

  const total = initialCredits + bonusCredits

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: 'rgba(28,26,23,0.55)', backdropFilter: 'blur(8px)' }}
      onClick={close}
      role="dialog"
      aria-modal="true"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md rounded-3xl overflow-hidden animate-fade-up"
        style={{ background: '#faf7f2', boxShadow: '0 20px 60px rgba(28,26,23,0.4)' }}
      >
        {/* Header dourado */}
        <div
          className="relative px-7 pt-8 pb-6 text-center"
          style={{ background: 'linear-gradient(135deg, #c9a84c, #d4943a)' }}
        >
          {/* Botão fechar */}
          <button
            onClick={close}
            aria-label="Fechar"
            className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center
                       text-soul-ink/60 hover:text-soul-ink hover:bg-white/30 transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 2L12 12M12 2L2 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>

          <div className="text-5xl mb-2">🎟️</div>
          <h2 className="font-serif font-bold text-2xl text-soul-ink leading-tight">
            Bem-vindo(a), {firstName}!
          </h2>
          <p className="text-[14px] font-semibold text-soul-ink/80 mt-1">
            Seu Passaporte de Autoconhecimento foi ativado
          </p>
        </div>

        {/* Body */}
        <div className="px-7 py-7">

          {/* Passaporte ativado */}
          <div
            className="rounded-2xl p-5 mb-5 text-center"
            style={{
              background: 'linear-gradient(135deg, #f5ede1, #faf0e6)',
              border: '1.5px solid rgba(196,99,58,0.2)',
            }}
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-soul-ink/65 mb-1">
              🎟️ Passaporte Ativo
            </p>
            <p className="font-serif font-bold leading-none"
               style={{ fontSize: '54px', color: '#a8522e' }}>
              +{initialCredits}
            </p>
            <p className="text-[14px] font-bold text-soul-ink/80 mt-1">
              créditos válidos por 7 dias
            </p>
            <p className="text-[12px] font-medium mt-1.5" style={{ color: '#a8522e' }}>
              ⏳ Use antes que expirem — depois disso, zeram automaticamente
            </p>
          </div>

          {/* Próximo passo */}
          <div className="text-center mb-5">
            <p className="text-[15px] font-semibold text-soul-ink leading-snug">
              <span className="font-serif italic">Quer dobrar seu Passaporte?</span>
            </p>
            <p className="text-[14px] text-soul-ink/70 font-medium leading-relaxed mt-1.5">
              Complete seu perfil e ganhe <strong className="text-soul-terracota">+{bonusCredits} créditos extras</strong> (também válidos por 7 dias).
              Total de <strong>{total} créditos</strong> para iniciar sua jornada.
            </p>
          </div>

          {/* Lista do que dá pra fazer */}
          <div className="space-y-2 mb-6">
            <BenefitRow icon="🧠" text="Faça testes comportamentais (DISC, MBTI, Eneagrama…)" />
            <BenefitRow icon="🎴" text="Descubra seu arquétipo dominante" />
            <BenefitRow icon="📊" text="Receba relatórios completos em PDF" />
          </div>

          {/* CTAs */}
          <div className="flex flex-col gap-2">
            <Link
              href="/dashboard/profile"
              onClick={close}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-[14px] font-bold text-white
                         shadow-terra hover:-translate-y-px transition-all"
              style={{ background: 'linear-gradient(135deg, #c4633a, #d4943a)' }}
            >
              Completar perfil e ganhar +{bonusCredits} →
            </Link>
            <button
              type="button"
              onClick={close}
              className="text-[13px] font-semibold text-soul-ink/55 hover:text-soul-ink py-2 transition-colors"
            >
              Mais tarde
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function BenefitRow({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="flex items-start gap-2.5">
      <span className="text-base mt-0.5">{icon}</span>
      <p className="text-[13px] text-soul-ink/75 font-medium leading-snug flex-1">{text}</p>
    </div>
  )
}

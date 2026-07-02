// ============================================================
// /dashboard/guia-entrevista, gerador admin only (futuro premium)
// ============================================================

import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getSession } from '@/lib/session'
import { hasActiveSubscription } from '@/lib/subscription/check'
import GuiaEntrevistaClient from './GuiaEntrevistaClient'
import { PERFIS_DISFUNCIONAIS } from '@/content/entrevista/perfis-disfuncionais'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Guia de Entrevista' }

export default async function GuiaEntrevistaPage() {
  const session = await getSession()
  if (!session?.id) redirect('/login')

  // Gate: assinatura PJ ativa OU admin (Kênio)
  const subscriptionOk = await hasActiveSubscription(session.id)
  if (!session.isAdmin && !subscriptionOk) {
    return (
      <div className="max-w-2xl mx-auto py-10">
        <p className="text-[13px] font-bold uppercase tracking-widest text-soul-terracota mb-3">
          Recurso premium
        </p>
        <h1 className="font-serif font-semibold text-3xl text-soul-ink leading-tight mb-4">
          Guia de Entrevista personalizado
        </h1>
        <p className="text-[15.5px] text-soul-ink/90 font-medium leading-relaxed mb-4">
          Gerador inteligente que monta o roteiro de entrevista perfeito para o seu cargo,
          baseado no framework de Perfis Disfuncionais e Triangulação de Evidências.
        </p>
        <p className="text-[15.5px] text-soul-ink/88 font-medium leading-relaxed mb-6">
          Disponível para empresas com assinatura ativa. Comece um trial de 7 dias gratuitos,
          sem cartão de crédito.
        </p>
        <Link
          href="/dashboard/assinatura"
          className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[15px] font-bold text-white shadow-terra no-underline"
          style={{ background: 'linear-gradient(135deg, #c4633a, #d4943a)' }}
        >
          ✦ Começar trial de 7 dias
        </Link>
      </div>
    )
  }

  // Lista de perfis pro form
  const perfisOpts = PERFIS_DISFUNCIONAIS.map(p => ({
    key:       p.key,
    nome:      p.nome,
    descricao: p.descricao,
  }))

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <p className="text-[13px] font-bold uppercase tracking-widest text-soul-terracota mb-2">
          Recurso premium · Admin beta
        </p>
        <h1 className="font-serif font-semibold text-3xl text-soul-ink leading-tight mb-2">
          Guia de Entrevista personalizado
        </h1>
        <p className="text-[15px] text-soul-ink/85 font-medium max-w-2xl">
          Gere um roteiro de entrevista sob medida para o seu cargo, com perguntas âncora
          do framework de Perfis Disfuncionais e instruções de Triangulação de Evidências.
        </p>
      </div>

      <GuiaEntrevistaClient perfisOpts={perfisOpts} />
    </div>
  )
}

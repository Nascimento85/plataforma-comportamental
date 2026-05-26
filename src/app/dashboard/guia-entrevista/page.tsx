// ============================================================
// /dashboard/guia-entrevista, gerador admin only (futuro premium)
// ============================================================

import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getSession } from '@/lib/session'
import GuiaEntrevistaClient from './GuiaEntrevistaClient'
import { PERFIS_DISFUNCIONAIS } from '@/content/entrevista/perfis-disfuncionais'

export const metadata: Metadata = { title: 'Guia de Entrevista · Psique' }

export default async function GuiaEntrevistaPage() {
  const session = await getSession()
  if (!session?.id) redirect('/login')

  // Gate temporário: só admins. Trocar para hasActiveSubscription quando #43 sair.
  if (!session.isAdmin) {
    return (
      <div className="max-w-2xl mx-auto py-10">
        <p className="text-[11px] font-bold uppercase tracking-widest text-soul-terracota mb-3">
          Recurso premium
        </p>
        <h1 className="font-serif font-semibold text-3xl text-soul-ink leading-tight mb-4">
          Guia de Entrevista personalizado
        </h1>
        <p className="text-[15px] text-soul-ink/85 font-medium leading-relaxed mb-2">
          Disponível em breve para assinantes do plano <strong>Pro</strong>. Gerador inteligente que monta
          o roteiro de entrevista perfeito para o seu cargo, baseado no framework
          de Perfis Disfuncionais e Triangulação de Evidências do Kênio.
        </p>
        <p className="text-[14px] text-soul-ink/65 font-medium italic">
          Em breve disponibilizaremos planos de assinatura para liberar este e outros recursos exclusivos.
        </p>
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
        <p className="text-[11px] font-bold uppercase tracking-widest text-soul-terracota mb-2">
          Recurso premium · Admin beta
        </p>
        <h1 className="font-serif font-semibold text-3xl text-soul-ink leading-tight mb-2">
          Guia de Entrevista personalizado
        </h1>
        <p className="text-[14px] text-soul-ink/75 font-medium max-w-2xl">
          Gere um roteiro de entrevista sob medida para o seu cargo, com perguntas âncora
          do framework de Perfis Disfuncionais e instruções de Triangulação de Evidências.
        </p>
      </div>

      <GuiaEntrevistaClient perfisOpts={perfisOpts} />
    </div>
  )
}

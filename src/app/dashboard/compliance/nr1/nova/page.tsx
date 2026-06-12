// ============================================================
// /dashboard/compliance/nr1/nova — formulario de nova coleta
// ============================================================

import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { getSession } from '@/lib/session'
import { prisma } from '@/lib/prisma'
import { hasActiveSubscription } from '@/lib/subscription/check'
import PaywallPremium from '@/components/ui/PaywallPremium'
import NovaColetaForm from './NovaColetaForm'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const prismaAny = prisma as any

export const metadata: Metadata = { title: 'Nova coleta NR-1' }

export default async function NovaColetaPage() {
  const session = await getSession()
  if (!session?.id) redirect('/login')

  // Gate premium
  const subscriptionOk = await hasActiveSubscription(session.id)
  if (!session.isAdmin && !subscriptionOk) {
    return (
      <PaywallPremium
        titulo="Criar nova coleta NR-1"
        descricao="A criação de coletas anônimas faz parte do módulo Premium. Ative o trial gratuito de 7 dias para começar."
      />
    )
  }

  const setores = await prismaAny.nR1Setor.findMany({
    where: { companyId: session.id },
    orderBy: { nome: 'asc' },
  })

  return (
    <div className="space-y-6">
      <div>
        <Link href="/dashboard/compliance/nr1" className="text-[14px] font-semibold text-soul-terracota hover:underline">
          ← Coletas
        </Link>
        <h1 className="font-serif font-semibold text-3xl text-soul-ink mt-2 leading-tight">Nova coleta</h1>
        <p className="text-[15px] text-soul-ink/88 font-medium mt-1">
          Cadastre os setores, adicione os convidados e a gente gera os links anônimos.
        </p>
      </div>

      <NovaColetaForm setoresIniciais={setores} />
    </div>
  )
}

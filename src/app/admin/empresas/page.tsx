// ============================================================
// /admin/empresas — lista todas as empresas cadastradas com
// busca, status de assinatura e acao "Liberar premium / Revogar"
// ============================================================

import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getSession } from '@/lib/session'
import { prisma } from '@/lib/prisma'
import EmpresasClient from './EmpresasClient'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const prismaAny = prisma as any

export const metadata: Metadata = { title: 'Empresas · Admin' }

interface EmpresaRow {
  id:           string
  name:         string
  email:        string
  type:         string
  isAdmin:      boolean
  createdAt:    string
  subStatus:    string | null
  subPlan:      string | null
  subSource:    string | null
  subValidoAte: string | null
  totalAssessments: number
}

export default async function AdminEmpresasPage() {
  const session = await getSession()
  if (!session) redirect('/login')
  if (!session.isAdmin) redirect('/dashboard')

  // Busca todas as empresas com subscription + contagem de testes
  const companies = await prismaAny.company.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true, name: true, email: true, type: true, isAdmin: true, createdAt: true,
      subscription: {
        select: {
          status: true, plan: true, source: true, currentPeriodEnd: true,
        },
      },
      _count: { select: { assessments: true } },
    },
  })

  const rows: EmpresaRow[] = companies.map((c: {
    id: string; name: string; email: string; type: string; isAdmin: boolean; createdAt: Date
    subscription: { status: string; plan: string; source: string; currentPeriodEnd: Date | null } | null
    _count: { assessments: number }
  }) => ({
    id:        c.id,
    name:      c.name,
    email:     c.email,
    type:      c.type,
    isAdmin:   c.isAdmin,
    createdAt: c.createdAt.toISOString(),
    subStatus: c.subscription?.status ?? null,
    subPlan:   c.subscription?.plan ?? null,
    subSource: c.subscription?.source ?? null,
    subValidoAte: c.subscription?.currentPeriodEnd
      ? c.subscription.currentPeriodEnd.toISOString()
      : null,
    totalAssessments: c._count.assessments,
  }))

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif font-semibold text-3xl text-soul-ink leading-tight mb-2">
          Empresas cadastradas
        </h1>
        <p className="text-[14px] text-soul-ink/75 font-medium">
          {rows.length} empresa{rows.length !== 1 ? 's' : ''} no total. Use o botão
          ao lado de cada linha para conceder ou revogar premium manual.
        </p>
      </div>

      <EmpresasClient empresas={rows} />
    </div>
  )
}

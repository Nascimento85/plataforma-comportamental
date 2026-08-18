// ============================================================
// /enps/[token] — Coleta eNPS anônima (pública, sem login)
// ============================================================

import type { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import EnpsClient from './EnpsClient'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const prismaAny = prisma as any

export const metadata: Metadata = {
  title: 'Pesquisa de Clima · Psique',
  robots: { index: false, follow: false },
}
export const dynamic = 'force-dynamic'

export default async function EnpsPage({ params }: { params: { token: string } }) {
  const convite = await prismaAny.enpsConvite.findUnique({
    where: { token: params.token },
    include: { coleta: { select: { titulo: true, status: true, expiresAt: true, companyId: true } } },
  })

  const erro =
    !convite ? 'Link inválido ou expirado.'
    : convite.status === 'COMPLETED' ? 'Você já respondeu esta pesquisa. Obrigado!'
    : !convite.coleta || convite.coleta.status !== 'ACTIVE' ? 'Esta pesquisa não está mais ativa.'
    : new Date() > new Date(convite.coleta.expiresAt) ? 'O prazo desta pesquisa já encerrou.'
    : null

  if (erro) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6"
           style={{ background: 'linear-gradient(180deg, #101c30 0%, #17181c 38%)' }}>
        <div className="max-w-md text-center">
          <div className="text-5xl mb-4">💚</div>
          <h1 className="font-serif font-semibold text-3xl text-white mb-3">{erro}</h1>
          <p className="text-[16px] font-medium" style={{ color: 'rgba(243,239,231,0.8)' }}>
            Se acredita que isto é um erro, contate o RH da sua empresa.
          </p>
        </div>
      </div>
    )
  }

  let empresa = ''
  try {
    const company = await prismaAny.company.findUnique({
      where: { id: convite.coleta.companyId },
      select: { companyName: true, name: true },
    })
    empresa = company?.companyName || company?.name || ''
  } catch { /* opcional */ }

  return <EnpsClient token={params.token} titulo={convite.coleta.titulo ?? null} empresa={empresa} />
}

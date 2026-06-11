// ============================================================
// /avaliar-lider/[token] — Avaliação de Liderança anônima
// (pública, sem login). Mesmo padrão da coleta NR-1.
// ============================================================

import type { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import AvaliarLiderClient from './AvaliarLiderClient'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const prismaAny = prisma as any

export const metadata: Metadata = { title: 'Avaliação de Liderança · Psique' }
export const dynamic = 'force-dynamic'

export default async function AvaliarLiderPage({ params }: { params: { token: string } }) {
  const convite = await prismaAny.liderConvite.findUnique({
    where: { token: params.token },
    include: {
      team:    { select: { nome: true, liderNome: true } },
      company: { select: { companyName: true, name: true } },
    },
  })

  const erro =
    !convite ? 'Link inválido ou expirado.'
    : convite.status === 'COMPLETED' ? 'Você já respondeu esta avaliação. Obrigado!'
    : !convite.team.liderNome ? 'Esta avaliação não está mais ativa.'
    : null

  if (erro) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6"
           style={{ background: 'linear-gradient(180deg, #101c30 0%, #17181c 38%)' }}>
        <div className="max-w-md text-center">
          <div className="text-5xl mb-4">🌿</div>
          <h1 className="font-serif font-semibold text-3xl text-white mb-3">{erro}</h1>
          <p className="text-[16px] font-medium" style={{ color: 'rgba(243,239,231,0.8)' }}>
            Se acredita que isto é um erro, contate o RH da sua empresa.
          </p>
        </div>
      </div>
    )
  }

  return (
    <AvaliarLiderClient
      token={params.token}
      liderNome={convite.team.liderNome}
      teamNome={convite.team.nome}
      empresa={convite.company.companyName || convite.company.name}
    />
  )
}

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
           style={{ background: 'linear-gradient(180deg, #faf7f2 0%, #f0ebdf 100%)' }}>
        <div className="max-w-md text-center">
          <div className="text-5xl mb-4">🌿</div>
          <h1 className="font-serif font-semibold text-2xl text-soul-ink mb-2">{erro}</h1>
          <p className="text-[14px] text-soul-ink/75 font-medium">
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

// ============================================================
// /avaliacao-360/[token] — Coleta da Avaliação 360° (pública, sem login)
// O respondente abre o link conforme seu papel (auto/gestor/par/subordinado).
// ============================================================

import type { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import Avaliacao360Client from './Avaliacao360Client'
import type { Rater360 } from '@/content/gestao-times/avaliacao-360'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const prismaAny = prisma as any

export const metadata: Metadata = { title: 'Avaliação 360° · Psique' }
export const dynamic = 'force-dynamic'

export default async function Avaliacao360Page({ params }: { params: { token: string } }) {
  const convite = await prismaAny.avaliacao360Convite.findUnique({
    where: { token: params.token },
    include: {
      avaliacao: { select: { avaliadoNome: true, titulo: true, status: true, expiresAt: true, companyId: true } },
    },
  })

  const erro =
    !convite ? 'Link inválido ou expirado.'
    : convite.status === 'COMPLETED' ? 'Você já respondeu esta avaliação. Obrigado!'
    : !convite.avaliacao || convite.avaliacao.status !== 'ACTIVE' ? 'Esta avaliação não está mais ativa.'
    : new Date() > new Date(convite.avaliacao.expiresAt) ? 'O prazo desta avaliação já encerrou.'
    : null

  if (erro) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6"
           style={{ background: 'linear-gradient(180deg, #101c30 0%, #17181c 38%)' }}>
        <div className="max-w-md text-center">
          <div className="text-5xl mb-4">🧭</div>
          <h1 className="font-serif font-semibold text-3xl text-white mb-3">{erro}</h1>
          <p className="text-[16px] font-medium" style={{ color: 'rgba(243,239,231,0.8)' }}>
            Se acredita que isto é um erro, contate o RH da sua empresa.
          </p>
        </div>
      </div>
    )
  }

  // Nome da empresa (lookup leve por companyId — sem relação no modelo)
  let empresa = ''
  try {
    const company = await prismaAny.company.findUnique({
      where: { id: convite.avaliacao.companyId },
      select: { companyName: true, name: true },
    })
    empresa = company?.companyName || company?.name || ''
  } catch { /* opcional */ }

  return (
    <Avaliacao360Client
      token={params.token}
      role={convite.role as Rater360}
      avaliadoNome={convite.avaliacao.avaliadoNome}
      titulo={convite.avaliacao.titulo ?? null}
      empresa={empresa}
    />
  )
}

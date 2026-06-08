// ============================================================
// /diagnostico-pme/[token] — questionário do Líder (público)
// ============================================================

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { PERGUNTAS_LIDER } from '@/content/pme-diagnostico/questionarios'
import LiderClient from './LiderClient'

export const metadata: Metadata = { title: 'Diagnóstico do seu time · Psique' }
export const dynamic = 'force-dynamic'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const prismaAny = prisma as any

export default async function LiderPage({ params }: { params: { token: string } }) {
  const diag = await prismaAny.pmeDiagnostico.findUnique({ where: { tokenLider: params.token } })
  if (!diag) return notFound()

  const jaRespondido = diag.status === 'COMPLETO'
  const perguntas = PERGUNTAS_LIDER.map((p) => ({ id: p.id, bloco: p.bloco, texto: p.texto }))

  return (
    <div className="min-h-screen" style={{ background: '#fafbfc' }}>
      <LiderClient
        token={params.token}
        empresa={diag.empresa}
        donoNome={diag.donoNome}
        perguntas={perguntas}
        jaRespondido={jaRespondido}
        relatorioId={diag.id}
      />
    </div>
  )
}

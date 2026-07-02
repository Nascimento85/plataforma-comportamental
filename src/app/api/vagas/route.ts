// ============================================================
// POST /api/vagas — gera o perfil ideal de uma vaga (IA) e salva
// GET  /api/vagas — lista as vagas da empresa
// ============================================================

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { getSession } from '@/lib/session'
import { prisma } from '@/lib/prisma'
import { hasActiveSubscription } from '@/lib/subscription/check'
import { gerarPerfilVaga } from '@/lib/vaga/generate'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const prismaAny = prisma as any

const schema = z.object({
  titulo:    z.string().trim().min(2, 'Informe o título da vaga.'),
  descricao: z.string().trim().min(20, 'Descreva a vaga com um pouco mais de detalhe (rotina, responsabilidades).'),
})

export async function POST(req: NextRequest) {
  const session = await getSession()
  if (!session?.id) return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 })
  const companyId = session.id

  // Recurso premium (admin isento)
  if (!session.isAdmin && !(await hasActiveSubscription(companyId))) {
    return NextResponse.json({ error: 'Recurso premium. Ative uma assinatura para usar o Perfil Ideal da Vaga.' }, { status: 403 })
  }

  const body = await req.json().catch(() => null)
  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 })
  }

  const gen = await gerarPerfilVaga(parsed.data)
  if (!gen.ok || !gen.perfil) {
    return NextResponse.json({ error: gen.error ?? 'Falha ao gerar o perfil.' }, { status: 502 })
  }

  const vaga = await prismaAny.jobProfile.create({
    data: {
      companyId,
      titulo:     parsed.data.titulo,
      descricao:  parsed.data.descricao,
      resultData: JSON.stringify(gen.perfil),
    },
    select: { id: true },
  })

  return NextResponse.json({ ok: true, id: vaga.id, perfil: gen.perfil }, { status: 201 })
}

export async function GET() {
  const session = await getSession()
  if (!session?.id) return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 })

  const vagas = await prismaAny.jobProfile.findMany({
    where: { companyId: session.id },
    orderBy: { createdAt: 'desc' },
    select: { id: true, titulo: true, createdAt: true },
  })
  return NextResponse.json(vagas)
}

// ============================================================
// GET  /api/nr1/setores — lista setores da empresa
// POST /api/nr1/setores — cria novo setor (GHE)
// ============================================================

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/session'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const prismaAny = prisma as any

export async function GET() {
  const session = await getSession()
  if (!session?.id) return NextResponse.json({ error: 'Nao autorizado.' }, { status: 401 })

  const setores = await prismaAny.nR1Setor.findMany({
    where: { companyId: session.id },
    orderBy: { nome: 'asc' },
  })
  return NextResponse.json({ setores })
}

export async function POST(req: NextRequest) {
  const session = await getSession()
  if (!session?.id) return NextResponse.json({ error: 'Nao autorizado.' }, { status: 401 })

  const body = await req.json().catch(() => ({})) as { nome?: string; perfilDiscDominante?: string }
  if (!body.nome) return NextResponse.json({ error: 'Campo obrigatorio: nome.' }, { status: 400 })

  try {
    const setor = await prismaAny.nR1Setor.create({
      data: {
        companyId: session.id,
        nome: body.nome,
        perfilDiscDominante: body.perfilDiscDominante ?? null,
      },
    })
    return NextResponse.json({ setor }, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: 'Setor com este nome ja existe.' }, { status: 409 })
  }
}

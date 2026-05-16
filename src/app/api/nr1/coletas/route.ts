// ============================================================
// GET  /api/nr1/coletas         — lista coletas da empresa
// POST /api/nr1/coletas         — cria nova coleta + gera convites (tokens)
// ============================================================

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/session'
import { randomBytes } from 'crypto'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const prismaAny = prisma as any

interface CreateBody {
  nome: string
  expiresAt: string  // ISO
  convidados: Array<{
    setorId: string
    nome: string
    email: string
  }>
}

export async function GET() {
  const session = await getSession()
  if (!session?.id) return NextResponse.json({ error: 'Nao autorizado.' }, { status: 401 })

  const coletas = await prismaAny.nR1Coleta.findMany({
    where: { companyId: session.id },
    orderBy: { createdAt: 'desc' },
    include: {
      _count: { select: { convites: true, respostas: true } },
    },
  })

  return NextResponse.json({ coletas })
}

export async function POST(req: NextRequest) {
  const session = await getSession()
  if (!session?.id) return NextResponse.json({ error: 'Nao autorizado.' }, { status: 401 })

  let body: CreateBody
  try { body = await req.json() } catch { return NextResponse.json({ error: 'JSON invalido.' }, { status: 400 }) }
  if (!body.nome || !body.expiresAt || !Array.isArray(body.convidados) || body.convidados.length === 0) {
    return NextResponse.json({ error: 'Campos obrigatorios: nome, expiresAt, convidados[].' }, { status: 400 })
  }

  // Cria coleta + convites em transacao
  const result = await prisma.$transaction(async (tx) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const txAny = tx as any
    const coleta = await txAny.nR1Coleta.create({
      data: {
        companyId: session.id,
        nome: body.nome,
        expiresAt: new Date(body.expiresAt),
      },
    })

    const conviteCreates = body.convidados.map(c => ({
      coletaId: coleta.id,
      setorId: c.setorId,
      companyId: session.id,
      nome: c.nome,
      email: c.email,
      token: randomBytes(20).toString('hex'),
    }))
    await txAny.nR1Convite.createMany({ data: conviteCreates })

    return { coleta, totalConvites: conviteCreates.length }
  })

  return NextResponse.json(result, { status: 201 })
}

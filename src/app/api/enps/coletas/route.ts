// ============================================================
// POST /api/enps/coletas — cria uma coleta eNPS + convites
// GET  /api/enps/coletas — lista coletas da empresa
// ============================================================

import { NextRequest, NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'
import { getSession } from '@/lib/session'
import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const prismaAny = prisma as any
const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://mapacomportamental.com'

interface ConvidadoInput { nome: string; email: string }
interface Body {
  titulo?:        string
  expiresInDays?: number
  convidados:     ConvidadoInput[]
}

export async function POST(req: NextRequest) {
  const session = await getSession()
  if (!session?.id) return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 })
  const companyId = session.id

  let body: Body
  try { body = await req.json() } catch { return NextResponse.json({ error: 'JSON inválido.' }, { status: 400 }) }

  const convidados = (body.convidados ?? []).filter((c) => (c.nome ?? '').trim() && (c.email ?? '').includes('@'))
  if (convidados.length === 0) return NextResponse.json({ error: 'Adicione ao menos um colaborador (nome + e-mail).' }, { status: 400 })

  const dias = Math.min(120, Math.max(1, Math.round(body.expiresInDays ?? 21)))
  const expiresAt = new Date(Date.now() + dias * 24 * 60 * 60 * 1000)

  const coleta = await prismaAny.enpsColeta.create({
    data: { companyId, titulo: (body.titulo ?? '').trim() || null, status: 'ACTIVE', expiresAt },
  })

  const convites = []
  for (const c of convidados) {
    const created = await prismaAny.enpsConvite.create({
      data: {
        coletaId: coleta.id, companyId,
        nome: c.nome.trim(), email: c.email.trim().toLowerCase(),
        token: uuidv4(), status: 'PENDING',
      },
    })
    convites.push({ nome: created.nome, email: created.email, link: `${APP_URL}/enps/${created.token}` })
  }

  return NextResponse.json({ id: coleta.id, convites }, { status: 201 })
}

export async function GET() {
  const session = await getSession()
  if (!session?.id) return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 })

  const coletas = await prismaAny.enpsColeta.findMany({
    where: { companyId: session.id },
    orderBy: { createdAt: 'desc' },
    include: { _count: { select: { convites: true, respostas: true } } },
  })
  return NextResponse.json(coletas)
}

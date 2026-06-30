// ============================================================
// POST /api/enps/coletas/[id]/convites — adiciona convidados a
// uma coleta eNPS existente (gera novos tokens/links).
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

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getSession()
  if (!session?.id) return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 })
  const companyId = session.id

  const coleta = await prismaAny.enpsColeta.findUnique({ where: { id: params.id } })
  if (!coleta || coleta.companyId !== companyId) {
    return NextResponse.json({ error: 'Coleta não encontrada.' }, { status: 404 })
  }

  let body: { convidados: ConvidadoInput[] }
  try { body = await req.json() } catch { return NextResponse.json({ error: 'JSON inválido.' }, { status: 400 }) }

  const convidados = (body.convidados ?? []).filter((c) => (c.nome ?? '').trim() && (c.email ?? '').includes('@'))
  if (convidados.length === 0) return NextResponse.json({ error: 'Nenhum colaborador válido informado.' }, { status: 400 })

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

  return NextResponse.json({ convites }, { status: 201 })
}

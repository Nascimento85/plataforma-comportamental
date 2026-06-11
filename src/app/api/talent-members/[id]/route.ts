// ============================================================
// PATCH  /api/talent-members/[id]  — atualiza nota/fit/zona do membro
// DELETE /api/talent-members/[id]  — remove o membro do time
// ============================================================

import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/session'
import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const prismaAny = prisma as any

const ZONAS_VALIDAS = ['TOP20', 'MID70', 'BOTTOM10']

function clamp10(v: unknown): number | null {
  if (v == null || v === '') return null
  const n = Number(v)
  if (Number.isNaN(n)) return null
  return Math.max(0, Math.min(10, n))
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getSession()
  if (!session?.id) {
    return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 })
  }

  const member = await prismaAny.talentMember.findUnique({ where: { id: params.id } })
  if (!member || member.companyId !== session.id) {
    return NextResponse.json({ error: 'Membro não encontrado.' }, { status: 404 })
  }

  let body: {
    notaPerformance?: number | string
    fitComportamental?: number | string
    perfilDisc?: string
    zona?: string
    zonaManual?: boolean
    email?: string
  }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'JSON inválido.' }, { status: 400 })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data: any = {}

  if ('notaPerformance' in body)   data.notaPerformance   = clamp10(body.notaPerformance)
  if ('fitComportamental' in body) data.fitComportamental = clamp10(body.fitComportamental)
  if ('email' in body) data.email = (body.email ?? '').trim().toLowerCase().slice(0, 120) || null
  if ('perfilDisc' in body) {
    const p = (body.perfilDisc ?? '').toUpperCase().charAt(0)
    data.perfilDisc = ['D', 'I', 'S', 'C'].includes(p) ? p : null
  }
  if ('zona' in body && body.zona && ZONAS_VALIDAS.includes(body.zona)) {
    data.zona = body.zona
    data.zonaManual = true   // posicionamento manual do gestor
  }
  if ('zonaManual' in body && body.zonaManual === false) {
    data.zonaManual = false  // volta a aceitar a sugestão automática
  }

  const updated = await prismaAny.talentMember.update({ where: { id: member.id }, data })
  return NextResponse.json({ id: updated.id }, { status: 200 })
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getSession()
  if (!session?.id) {
    return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 })
  }

  const member = await prismaAny.talentMember.findUnique({ where: { id: params.id } })
  if (!member || member.companyId !== session.id) {
    return NextResponse.json({ error: 'Membro não encontrado.' }, { status: 404 })
  }

  await prismaAny.talentMember.delete({ where: { id: member.id } })
  return NextResponse.json({ ok: true }, { status: 200 })
}

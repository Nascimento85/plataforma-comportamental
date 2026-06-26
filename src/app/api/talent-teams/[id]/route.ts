// ============================================================
// PATCH  /api/talent-teams/[id]  — atualiza dados do time (ex: fase Tuckman)
// DELETE /api/talent-teams/[id]  — remove o time inteiro
// ============================================================

import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/session'
import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const prismaAny = prisma as any

const FASES_VALIDAS = ['FORMING', 'STORMING', 'NORMING', 'PERFORMING']

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getSession()
  if (!session?.id) return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 })

  const team = await prismaAny.talentTeam.findUnique({ where: { id: params.id } })
  if (!team || team.companyId !== session.id) {
    return NextResponse.json({ error: 'Time não encontrado.' }, { status: 404 })
  }

  let body: { nome?: string; descricao?: string; faseTuckman?: string; liderNome?: string; liderEmail?: string; parentTeamId?: string | null }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'JSON inválido.' }, { status: 400 })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data: any = {}
  if ('nome' in body && (body.nome ?? '').trim().length >= 2) data.nome = body.nome!.trim().slice(0, 80)
  if ('descricao' in body) data.descricao = (body.descricao ?? '').trim().slice(0, 500) || null
  if ('faseTuckman' in body) {
    data.faseTuckman = body.faseTuckman && FASES_VALIDAS.includes(body.faseTuckman) ? body.faseTuckman : null
  }
  if ('liderNome' in body)  data.liderNome  = (body.liderNome ?? '').trim().slice(0, 80) || null
  if ('liderEmail' in body) data.liderEmail = (body.liderEmail ?? '').trim().toLowerCase().slice(0, 120) || null

  // Hierarquia (organograma): define a equipe superior, com proteção contra ciclos
  if ('parentTeamId' in body) {
    const pid = (body.parentTeamId ?? '').toString().trim()
    if (!pid) {
      data.parentTeamId = null
    } else if (pid === team.id) {
      return NextResponse.json({ error: 'Uma equipe não pode responder a si mesma.' }, { status: 400 })
    } else {
      const alvo = await prismaAny.talentTeam.findUnique({ where: { id: pid }, select: { id: true, companyId: true } })
      if (!alvo || alvo.companyId !== session.id) {
        return NextResponse.json({ error: 'Equipe superior inválida.' }, { status: 400 })
      }
      // Anti-ciclo: a equipe superior não pode ser descendente desta equipe
      const todas = await prismaAny.talentTeam.findMany({
        where: { companyId: session.id },
        select: { id: true, parentTeamId: true },
      }) as Array<{ id: string; parentTeamId: string | null }>
      const paiDe = new Map(todas.map((t) => [t.id, t.parentTeamId]))
      let cursor: string | null = pid
      let guard = 0
      while (cursor && guard++ < 200) {
        if (cursor === team.id) {
          return NextResponse.json({ error: 'Isso criaria um ciclo na hierarquia (a equipe superior já responde a esta).' }, { status: 400 })
        }
        cursor = paiDe.get(cursor) ?? null
      }
      data.parentTeamId = pid
    }
  }

  const updated = await prismaAny.talentTeam.update({ where: { id: team.id }, data })
  return NextResponse.json({ id: updated.id, faseTuckman: updated.faseTuckman }, { status: 200 })
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getSession()
  if (!session?.id) return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 })

  const team = await prismaAny.talentTeam.findUnique({ where: { id: params.id } })
  if (!team || team.companyId !== session.id) {
    return NextResponse.json({ error: 'Time não encontrado.' }, { status: 404 })
  }

  await prismaAny.talentTeam.delete({ where: { id: team.id } })
  return NextResponse.json({ ok: true }, { status: 200 })
}

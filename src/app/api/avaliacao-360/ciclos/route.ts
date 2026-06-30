// ============================================================
// POST /api/avaliacao-360/ciclos — cria um ciclo 360 + convites
// GET  /api/avaliacao-360/ciclos — lista ciclos da empresa
// ============================================================

import { NextRequest, NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'
import { getSession } from '@/lib/session'
import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const prismaAny = prisma as any

const ROLES = ['AUTO', 'GESTOR', 'PAR', 'SUBORDINADO']

interface RaterInput { role: string; nome: string; email: string }
interface Body {
  avaliadoNome:  string
  avaliadoEmail?: string
  teamId?:       string | null
  titulo?:       string
  expiresInDays?: number
  raters:        RaterInput[]
}

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://mapacomportamental.com'

export async function POST(req: NextRequest) {
  const session = await getSession()
  if (!session?.id) return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 })
  const companyId = session.id

  let body: Body
  try { body = await req.json() } catch { return NextResponse.json({ error: 'JSON inválido.' }, { status: 400 }) }

  const avaliadoNome = (body.avaliadoNome ?? '').trim()
  if (avaliadoNome.length < 2) return NextResponse.json({ error: 'Informe o nome da pessoa avaliada.' }, { status: 400 })

  const raters = (body.raters ?? []).filter((r) => ROLES.includes(r.role) && (r.nome ?? '').trim() && (r.email ?? '').includes('@'))
  if (raters.length === 0) return NextResponse.json({ error: 'Adicione ao menos um avaliador (você mesmo, gestor, par ou liderado).' }, { status: 400 })

  const dias = Math.min(90, Math.max(1, Math.round(body.expiresInDays ?? 21)))
  const expiresAt = new Date(Date.now() + dias * 24 * 60 * 60 * 1000)

  const ciclo = await prismaAny.avaliacao360.create({
    data: {
      companyId,
      teamId:        body.teamId ?? null,
      avaliadoNome,
      avaliadoEmail: (body.avaliadoEmail ?? '').trim().toLowerCase() || null,
      titulo:        (body.titulo ?? '').trim() || null,
      status:        'ACTIVE',
      expiresAt,
    },
  })

  const convitesData = raters.map((r) => ({
    avaliacaoId: ciclo.id,
    companyId,
    role:  r.role,
    nome:  r.nome.trim(),
    email: r.email.trim().toLowerCase(),
    token: uuidv4(),
    status: 'PENDING',
  }))
  // createMany não retorna os registros — então criamos um a um para devolver os links
  const convites = []
  for (const c of convitesData) {
    const created = await prismaAny.avaliacao360Convite.create({ data: c })
    convites.push({ role: created.role, nome: created.nome, email: created.email, link: `${APP_URL}/avaliacao-360/${created.token}` })
  }

  return NextResponse.json({ id: ciclo.id, convites }, { status: 201 })
}

export async function GET() {
  const session = await getSession()
  if (!session?.id) return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 })

  const ciclos = await prismaAny.avaliacao360.findMany({
    where: { companyId: session.id },
    orderBy: { createdAt: 'desc' },
    include: { _count: { select: { convites: true, respostas: true } } },
  })
  return NextResponse.json(ciclos)
}

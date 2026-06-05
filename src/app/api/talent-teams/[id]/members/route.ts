// ============================================================
// POST /api/talent-teams/[id]/members
// Adiciona um membro ao time. Pode vincular a um Employee existente
// (puxa o perfil DISC do último resultado DISC) ou ser avulso.
// ============================================================

import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/session'
import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const prismaAny = prisma as any

const DISC_VALIDOS = ['D', 'I', 'S', 'C']

/** Busca o perfil DISC dominante de um Employee a partir do último Result DISC. */
async function discDoEmployee(companyId: string, employeeId: string): Promise<string | null> {
  const assessment = await prisma.assessment.findFirst({
    where: { companyId, employeeId, testType: 'DISC', status: 'COMPLETED' },
    orderBy: { completedAt: 'desc' },
    include: { result: { select: { primaryProfile: true } } },
  })
  const p = assessment?.result?.primaryProfile?.toUpperCase().charAt(0)
  return p && DISC_VALIDOS.includes(p) ? p : null
}

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getSession()
  if (!session?.id) {
    return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 })
  }

  // Garante que o time pertence à empresa logada
  const team = await prismaAny.talentTeam.findUnique({ where: { id: params.id } })
  if (!team || team.companyId !== session.id) {
    return NextResponse.json({ error: 'Time não encontrado.' }, { status: 404 })
  }

  let body: { nome?: string; cargo?: string; employeeId?: string; perfilDisc?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'JSON inválido.' }, { status: 400 })
  }

  const nome = (body.nome ?? '').trim()
  if (nome.length < 2) {
    return NextResponse.json({ error: 'Informe o nome do colaborador.' }, { status: 400 })
  }

  // Resolve perfil DISC: vínculo com Employee tem prioridade; senão usa o informado
  let perfilDisc: string | null = null
  let employeeId: string | null = null
  if (body.employeeId) {
    const emp = await prisma.employee.findFirst({ where: { id: body.employeeId, companyId: session.id } })
    if (emp) {
      employeeId = emp.id
      perfilDisc = await discDoEmployee(session.id, emp.id)
    }
  }
  if (!perfilDisc && body.perfilDisc) {
    const p = body.perfilDisc.toUpperCase().charAt(0)
    if (DISC_VALIDOS.includes(p)) perfilDisc = p
  }

  const member = await prismaAny.talentMember.create({
    data: {
      teamId:     team.id,
      companyId:  session.id,
      employeeId,
      nome,
      cargo:      (body.cargo ?? '').trim() || null,
      perfilDisc,
    },
  })

  return NextResponse.json({ id: member.id, perfilDisc: member.perfilDisc }, { status: 201 })
}

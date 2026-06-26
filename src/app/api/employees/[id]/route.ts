// ============================================================
// PATCH /api/employees/[id] — renomeia o candidato (Employee.name)
// Usado quando um teste sai com o nome errado (ex.: nome da empresa
// num autoteste). Escopo: só a própria empresa pode editar.
// ============================================================

import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/session'
import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getSession()
  if (!session?.id) {
    return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 })
  }

  const employee = await prisma.employee.findUnique({ where: { id: params.id } })
  if (!employee || employee.companyId !== session.id) {
    return NextResponse.json({ error: 'Candidato não encontrado.' }, { status: 404 })
  }

  let body: { name?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'JSON inválido.' }, { status: 400 })
  }

  const name = (body.name ?? '').trim().slice(0, 120)
  if (name.length < 2) {
    return NextResponse.json({ error: 'Informe um nome com pelo menos 2 caracteres.' }, { status: 400 })
  }

  const updated = await prisma.employee.update({
    where: { id: employee.id },
    data: { name },
  })

  return NextResponse.json({ id: updated.id, name: updated.name }, { status: 200 })
}

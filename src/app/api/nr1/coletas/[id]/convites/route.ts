// ============================================================
// POST /api/nr1/coletas/[id]/convites
// Adiciona um novo convite (link anonimo unico) em uma coleta ja existente.
// Util quando o admin precisa ampliar o pool de convidados depois
// de criada a coleta, sem precisar refazer o cadastro.
// ============================================================

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/session'
import { randomBytes } from 'crypto'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const prismaAny = prisma as any

interface AddConviteBody {
  setorId: string
  nome:    string
  email:   string
}

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getSession()
  if (!session?.id) {
    return NextResponse.json({ error: 'Nao autorizado.' }, { status: 401 })
  }

  let body: AddConviteBody
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'JSON invalido.' }, { status: 400 })
  }

  const nome    = (body.nome    ?? '').trim()
  const email   = (body.email   ?? '').trim().toLowerCase()
  const setorId = (body.setorId ?? '').trim()

  if (!nome || !email || !setorId) {
    return NextResponse.json(
      { error: 'Informe nome, e-mail e setor.' },
      { status: 400 },
    )
  }

  // Confirma que a coleta pertence a empresa logada
  const coleta = await prismaAny.nR1Coleta.findFirst({
    where: { id: params.id, companyId: session.id },
    select: { id: true, expiresAt: true },
  })
  if (!coleta) {
    return NextResponse.json({ error: 'Coleta nao encontrada.' }, { status: 404 })
  }
  if (new Date(coleta.expiresAt).getTime() < Date.now()) {
    return NextResponse.json({ error: 'Coleta expirada.' }, { status: 410 })
  }

  // Confirma que o setor pertence a empresa logada
  const setor = await prismaAny.nR1Setor.findFirst({
    where: { id: setorId, companyId: session.id },
    select: { id: true },
  })
  if (!setor) {
    return NextResponse.json({ error: 'Setor invalido.' }, { status: 400 })
  }

  // Evita duplicar o mesmo email na mesma coleta
  const jaExiste = await prismaAny.nR1Convite.findFirst({
    where: { coletaId: params.id, email },
    select: { id: true },
  })
  if (jaExiste) {
    return NextResponse.json(
      { error: 'Ja existe um convite com este e-mail nesta coleta.' },
      { status: 409 },
    )
  }

  const convite = await prismaAny.nR1Convite.create({
    data: {
      coletaId:  params.id,
      setorId,
      companyId: session.id,
      nome,
      email,
      token: randomBytes(20).toString('hex'),
    },
    select: { id: true, nome: true, email: true, token: true, status: true, setorId: true },
  })

  return NextResponse.json({ convite }, { status: 201 })
}

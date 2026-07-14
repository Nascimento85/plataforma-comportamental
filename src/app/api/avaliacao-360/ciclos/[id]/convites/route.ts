// ============================================================
// POST /api/avaliacao-360/ciclos/[id]/convites — adiciona avaliadores
// a um ciclo 360 existente (gera novos tokens/links).
// ============================================================

import { NextRequest, NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'
import { getSession } from '@/lib/session'
import { prisma } from '@/lib/prisma'
import { sendAvaliacao360ConviteEmail } from '@/lib/email'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const prismaAny = prisma as any
const ROLES = ['AUTO', 'GESTOR', 'PAR', 'SUBORDINADO']
const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://mapacomportamental.com'

interface RaterInput { role: string; nome: string; email: string }

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getSession()
  if (!session?.id) return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 })
  const companyId = session.id

  const ciclo = await prismaAny.avaliacao360.findUnique({ where: { id: params.id } })
  if (!ciclo || ciclo.companyId !== companyId) {
    return NextResponse.json({ error: 'Ciclo não encontrado.' }, { status: 404 })
  }

  let body: { raters: RaterInput[] }
  try { body = await req.json() } catch { return NextResponse.json({ error: 'JSON inválido.' }, { status: 400 }) }

  const raters = (body.raters ?? []).filter((r) => ROLES.includes(r.role) && (r.nome ?? '').trim() && (r.email ?? '').includes('@'))
  if (raters.length === 0) return NextResponse.json({ error: 'Nenhum avaliador válido informado.' }, { status: 400 })

  const company = await prismaAny.company.findUnique({
    where: { id: companyId },
    select: { name: true },
  })
  let emailsEnviados = 0
  let emailsFalha = 0
  const convites = []
  for (const r of raters) {
    const created = await prismaAny.avaliacao360Convite.create({
      data: {
        avaliacaoId: ciclo.id,
        companyId,
        role:  r.role,
        nome:  r.nome.trim(),
        email: r.email.trim().toLowerCase(),
        token: uuidv4(),
        status: 'PENDING',
      },
    })
    convites.push({ role: created.role, nome: created.nome, email: created.email, link: `${APP_URL}/avaliacao-360/${created.token}` })
    // Envia o convite por e-mail (falha não impede a criação; o link fica no painel)
    const envio = await sendAvaliacao360ConviteEmail({
      toEmail:      created.email,
      nome:         created.nome,
      avaliadoNome: ciclo.avaliadoNome,
      companyNome:  company?.name ?? 'Sua empresa',
      token:        created.token,
    })
    if (envio.sent) emailsEnviados++
    else emailsFalha++
    await new Promise(res => setTimeout(res, 600))
  }

  return NextResponse.json({ convites, emailsEnviados, emailsFalha }, { status: 201 })
}

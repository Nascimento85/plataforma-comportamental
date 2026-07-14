// ============================================================
// POST /api/nr1/convites/[id]/email
// (Re)envia o e-mail de convite NR-1 para um convite existente.
// Usado no painel para convites criados antes do envio automatico
// ou quando o funcionario nao recebeu/perdeu o e-mail.
// ============================================================

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/session'
import { sendNR1ConviteEmail } from '@/lib/email'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const prismaAny = prisma as any

export async function POST(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getSession()
    if (!session?.id) {
      return NextResponse.json({ error: 'Nao autorizado.' }, { status: 401 })
    }

    // Admin pode disparar por qualquer empresa (suporte); demais contas,
    // apenas convites da propria empresa.
    const convite = await prismaAny.nR1Convite.findFirst({
      where: session.isAdmin
        ? { id: params.id }
        : { id: params.id, companyId: session.id },
      include: { coleta: { select: { nome: true, status: true, expiresAt: true } } },
    })
    if (!convite) return NextResponse.json({ error: 'Convite nao encontrado.' }, { status: 404 })
    if (convite.status === 'COMPLETED') {
      return NextResponse.json({ error: 'Este funcionario ja respondeu.' }, { status: 410 })
    }
    if (new Date(convite.coleta.expiresAt).getTime() < Date.now()) {
      return NextResponse.json({ error: 'Coleta expirada.' }, { status: 410 })
    }

    // Nome da empresa DONA do convite (relevante no bypass de admin)
    const company = await prismaAny.company.findUnique({
      where: { id: convite.companyId },
      select: { name: true },
    })

    const envio = await sendNR1ConviteEmail({
      toEmail:     convite.email,
      nome:        convite.nome,
      companyNome: company?.name ?? 'Sua empresa',
      coletaNome:  convite.coleta.nome,
      token:       convite.token,
    })

    if (!envio.sent) {
      return NextResponse.json(
        { error: 'Falha no envio do e-mail. Verifique o endereço ou copie o link manualmente.' },
        { status: 502 },
      )
    }
    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('[nr1/convites/email] Erro:', e)
    return NextResponse.json({ error: 'Erro interno ao enviar e-mail.' }, { status: 500 })
  }
}

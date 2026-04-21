import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { v4 as uuidv4 } from 'uuid'
import { prisma } from '@/lib/prisma'
import { sendPasswordResetEmail } from '@/lib/email'

const schema = z.object({
  email: z.string().email(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const parsed = schema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'E-mail inválido.' }, { status: 400 })
    }

    const { email } = parsed.data

    // Sempre retorna sucesso para não revelar se o e-mail existe
    const company = await prisma.company.findUnique({ where: { email } })
    if (!company) {
      return NextResponse.json({ ok: true })
    }

    // Invalida tokens anteriores
    await prisma.passwordResetToken.updateMany({
      where: { companyId: company.id, used: false },
      data: { used: true },
    })

    // Cria novo token (expira em 1 hora)
    const token = uuidv4()
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000)

    await prisma.passwordResetToken.create({
      data: { companyId: company.id, token, expiresAt },
    })

    const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password/${token}`

    await sendPasswordResetEmail(email, company.name, resetLink)

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[forgot-password]', err)
    return NextResponse.json({ error: 'Erro interno.' }, { status: 500 })
  }
}

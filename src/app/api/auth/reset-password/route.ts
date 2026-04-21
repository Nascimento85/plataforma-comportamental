import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'

const schema = z.object({
  token: z.string(),
  password: z.string().min(8, 'Senha deve ter ao menos 8 caracteres'),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const parsed = schema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 })
    }

    const { token, password } = parsed.data

    // Busca token válido
    const resetToken = await prisma.passwordResetToken.findUnique({ where: { token } })

    if (!resetToken || resetToken.used || resetToken.expiresAt < new Date()) {
      return NextResponse.json(
        { error: 'Link inválido ou expirado. Solicite um novo.' },
        { status: 400 }
      )
    }

    // Atualiza senha + invalida token (transação atômica)
    const passwordHash = await bcrypt.hash(password, 12)

    await prisma.$transaction([
      prisma.company.update({
        where: { id: resetToken.companyId },
        data: { passwordHash },
      }),
      prisma.passwordResetToken.update({
        where: { token },
        data: { used: true },
      }),
    ])

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[reset-password]', err)
    return NextResponse.json({ error: 'Erro interno.' }, { status: 500 })
  }
}

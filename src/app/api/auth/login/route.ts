import { NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { createSession } from '@/lib/session'
import bcrypt from 'bcryptjs'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const parsed = schema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Dados inválidos.' }, { status: 400 })
    }

    const { email, password } = parsed.data

    const company = await prisma.company.findUnique({
      where: { email },
      select: { id: true, name: true, email: true, passwordHash: true, active: true },
    })

    if (!company || !company.active) {
      return NextResponse.json({ error: 'E-mail ou senha incorretos.' }, { status: 401 })
    }

    const match = await bcrypt.compare(password, company.passwordHash)
    if (!match) {
      return NextResponse.json({ error: 'E-mail ou senha incorretos.' }, { status: 401 })
    }

    await createSession({ id: company.id, name: company.name, email: company.email })
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('[Login API]', error)
    return NextResponse.json({ error: 'Erro interno. Tente novamente.' }, { status: 500 })
  }
}

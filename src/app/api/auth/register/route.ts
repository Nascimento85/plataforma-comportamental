import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'

const schema = z.object({
  name: z.string().min(2, 'Nome muito curto'),
  email: z.string().email('E-mail inválido'),
  password: z.string().min(8, 'Senha deve ter ao menos 8 caracteres'),
  type: z.enum(['PF', 'PJ']).default('PJ'),
  phone: z.string().min(8, 'Telefone inválido'),
  instagram: z.string().optional(),
  birthDate: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const parsed = schema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0].message },
        { status: 400 }
      )
    }

    const { name, email, password, type, phone, instagram, birthDate } = parsed.data

    // Verifica se e-mail já existe
    const existing = await prisma.company.findUnique({ where: { email } })
    if (existing) {
      return NextResponse.json({ error: 'E-mail já cadastrado.' }, { status: 409 })
    }

    // Hash da senha
    const passwordHash = await bcrypt.hash(password, 12)

    // Cria empresa + saldo de créditos inicial (0)
    const company = await prisma.$transaction(async (tx) => {
      const c = await tx.company.create({
        data: {
          name,
          email,
          passwordHash,
          type,
          phone: phone,
          instagram: instagram ?? null,
          birthDate: birthDate ? new Date(birthDate) : null,
        },
      })
      await tx.creditBalance.create({
        data: { companyId: c.id, balance: 0 },
      })
      return c
    })

    return NextResponse.json({ id: company.id, name: company.name }, { status: 201 })
  } catch (err) {
    console.error('[register]', err)
    return NextResponse.json({ error: 'Erro interno.' }, { status: 500 })
  }
}

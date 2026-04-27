// ============================================================
// SUBSTITUI: src/app/api/auth/register/route.ts
// Mudança principal: bônus de boas-vindas vira o "Passaporte de
// Autoconhecimento" — 10 créditos válidos por 7 dias (helper).
// ============================================================

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { grantWelcomePassport } from '@/lib/passport'

const schema = z.object({
  name:      z.string().min(2, 'Nome muito curto'),
  email:     z.string().email('E-mail inválido'),
  password:  z.string().min(8, 'Senha deve ter ao menos 8 caracteres'),
  type:      z.enum(['PF', 'PJ']).default('PJ'),
  phone:     z.string().min(8, 'Telefone inválido'),
  instagram: z.string().optional(),
  birthDate: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body   = await request.json()
    const parsed = schema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0].message },
        { status: 400 },
      )
    }

    const { name, email, password, type, phone, instagram, birthDate } = parsed.data

    const existing = await prisma.company.findUnique({ where: { email } })
    if (existing) {
      return NextResponse.json({ error: 'E-mail já cadastrado.' }, { status: 409 })
    }

    const passwordHash = await bcrypt.hash(password, 12)

    const result = await prisma.$transaction(async (tx) => {
      const company = await tx.company.create({
        data: {
          name,
          email,
          passwordHash,
          type,
          phone,
          instagram: instagram ?? null,
          birthDate: birthDate ? new Date(birthDate) : null,
          isOnboardingCredited: true,
        },
      })

      // 🎟️ Passaporte de Autoconhecimento: 10 créditos / 7 dias
      const passport = await grantWelcomePassport(tx, company.id)

      return { company, passport }
    })

    return NextResponse.json(
      {
        id: result.company.id,
        name: result.company.name,
        passport: {
          credits:   result.passport.granted,
          expiresAt: result.passport.expiresAt.toISOString(),
        },
      },
      { status: 201 },
    )
  } catch (err) {
    console.error('[register]', err)
    return NextResponse.json({ error: 'Erro interno.' }, { status: 500 })
  }
}

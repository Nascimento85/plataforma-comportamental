// ============================================================
// POST /api/profile/validate-code
// ============================================================
// Valida o código de 6 dígitos enviado por e-mail.
// Se válido (existe, não usado, não expirou, pertence ao usuário):
//   1. Marca o código como usado
//   2. Adiciona +6 créditos ao saldo
//   3. Cria CreditTransaction (auditoria: tipo BONUS)
//   4. Marca isProfileCompletedRewarded = true (idempotência)
// Tudo em uma transação atômica.
// ============================================================

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/session'
import { grantProfileCompleteBonus, PROFILE_COMPLETE_AMOUNT } from '@/lib/passport'

const BONUS_CREDITS = PROFILE_COMPLETE_AMOUNT // 6 — bônus por completar perfil (expira em 7 dias)

const schema = z.object({
  code: z
    .string()
    .trim()
    .regex(/^\d{6}$/, 'O código deve ter 6 dígitos numéricos.'),
})

export async function POST(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 })
    }

    const body = await request.json()
    const parsed = schema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0].message },
        { status: 400 }
      )
    }

    const { code } = parsed.data

    const company = await prisma.company.findUnique({
      where: { id: session.id },
      select: { id: true, isProfileCompletedRewarded: true },
    })
    if (!company) {
      return NextResponse.json({ error: 'Empresa não encontrada.' }, { status: 404 })
    }

    if (company.isProfileCompletedRewarded) {
      return NextResponse.json(
        { error: 'Você já recebeu os 6 créditos deste benefício.' },
        { status: 400 }
      )
    }

    // Busca código válido (não usado, não expirado, pertence à empresa)
    const validCode = await prisma.profileValidationCode.findFirst({
      where: {
        companyId: company.id,
        code,
        used: false,
        expiresAt: { gt: new Date() },
      },
      orderBy: { createdAt: 'desc' },
    })

    if (!validCode) {
      return NextResponse.json(
        { error: 'Código inválido ou expirado. Solicite um novo.' },
        { status: 400 }
      )
    }

    // Transação atômica: marca código + concede bônus (expira em 7 dias) + marca flag
    await prisma.$transaction(async (tx) => {
      await tx.profileValidationCode.update({
        where: { id: validCode.id },
        data: { used: true },
      })

      // Passaporte: bônus de 6 créditos com expiração em 7 dias
      await grantProfileCompleteBonus(tx, company.id)

      await tx.company.update({
        where: { id: company.id },
        data: { isProfileCompletedRewarded: true },
      })
    })

    return NextResponse.json({
      ok: true,
      creditsAwarded: BONUS_CREDITS,
      message: `Parabéns! +${BONUS_CREDITS} créditos foram adicionados à sua conta.`,
    })
  } catch (err) {
    console.error('[api/profile/validate-code]', err)
    return NextResponse.json({ error: 'Erro interno.' }, { status: 500 })
  }
}

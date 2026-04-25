// ============================================================
// POST /api/profile/request-code
// ============================================================
// Gera um código de 6 dígitos, salva no banco com expiração de 30min,
// e envia para o e-mail da empresa via Resend.
//
// Pré-requisitos:
//   1. Usuário autenticado
//   2. Perfil 100% preenchido (calculateProfileCompletion === 100)
//   3. Bônus ainda não recebido (isProfileCompletedRewarded = false)
//
// Invalida códigos anteriores (não usados) ao gerar um novo.
// ============================================================

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/session'
import { isProfileComplete, generateValidationCode } from '@/lib/profile'
import { sendProfileValidationCode } from '@/lib/email'

export async function POST(_request: NextRequest) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 })
    }

    const company = await prisma.company.findUnique({
      where: { id: session.id },
    })
    if (!company) {
      return NextResponse.json({ error: 'Empresa não encontrada.' }, { status: 404 })
    }

    if (company.isProfileCompletedRewarded) {
      return NextResponse.json(
        { error: 'Você já recebeu os 6 créditos de bônus deste benefício.' },
        { status: 400 }
      )
    }

    if (!isProfileComplete(company)) {
      return NextResponse.json(
        { error: 'Complete todos os campos obrigatórios do perfil antes de solicitar o código.' },
        { status: 400 }
      )
    }

    // Invalida códigos anteriores não-usados
    await prisma.profileValidationCode.updateMany({
      where: { companyId: company.id, used: false },
      data: { used: true },
    })

    // Gera código novo (expira em 30min)
    const code = generateValidationCode()
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000)

    await prisma.profileValidationCode.create({
      data: { companyId: company.id, code, expiresAt },
    })

    // Envia e-mail via Resend
    const result = await sendProfileValidationCode(company.email, company.name, code)

    if (!result.sent) {
      console.error('[request-code] Falha no envio:', result.error)
      // Em ambiente sem Resend configurado, retornamos o código no JSON pra dev
      const isDev = process.env.NODE_ENV !== 'production'
      return NextResponse.json(
        {
          ok: true,
          warning: 'Código gerado, mas envio de e-mail falhou.',
          ...(isDev && { devCode: code }),
        },
        { status: 200 }
      )
    }

    return NextResponse.json({ ok: true, sentTo: company.email })
  } catch (err) {
    console.error('[api/profile/request-code]', err)
    return NextResponse.json({ error: 'Erro interno.' }, { status: 500 })
  }
}

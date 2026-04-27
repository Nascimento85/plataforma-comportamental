import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { v4 as uuidv4 } from 'uuid'
import { getSession } from '@/lib/session'
import { prisma } from '@/lib/prisma'
import { sendAssessmentEmail } from '@/lib/email'
import { TEST_PRICE, consumeCredits, getPassportState, InsufficientCreditsError } from '@/lib/passport'
import { onPassportConsumed } from '@/lib/passport-triggers'

// Bundle Combo (DISC + MBTI + Eneagrama + Temperamento) custa 10 créditos
const BUNDLE_TESTS = ['DISC', 'MBTI', 'ENNEAGRAM', 'TEMPERAMENT'] as const
const BUNDLE_CREDIT_COST = TEST_PRICE.COMBO_BUNDLE  // 10 créditos

const schema = z.object({
  employeeName:  z.string().min(2),
  employeeEmail: z.string().email(),
})

export async function POST(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session) return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 })

    const companyId = session.id
    const body = await request.json()
    const parsed = schema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 })
    }

    const { employeeName, employeeEmail } = parsed.data

    const company = await prisma.company.findUnique({
      where: { id: companyId },
      select: { isAdmin: true, name: true },
    })
    const isAdmin = company?.isAdmin ?? false

    // Verifica Passaporte (saldo total = bônus + pago)
    if (!isAdmin) {
      const passport = await getPassportState(companyId)
      if (passport.total < BUNDLE_CREDIT_COST) {
        return NextResponse.json(
          { error: `Passaporte insuficiente. O Combo Bundler custa ${BUNDLE_CREDIT_COST} créditos. Você tem ${passport.total}.` },
          { status: 402 }
        )
      }
    }

    // Cria ou reutiliza employee
    let employee = await prisma.employee.findFirst({ where: { companyId, email: employeeEmail } })
    if (!employee) {
      employee = await prisma.employee.create({
        data: { companyId, name: employeeName, email: employeeEmail },
      })
    }

    const bundleId = uuidv4()
    const expiresAt = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000) // 14 dias para completar o bundle

    // Gera tokens para cada teste
    const tokens = BUNDLE_TESTS.map(() => uuidv4())

    // Cria os 4 assessments
    const assessments = await prisma.$transaction(async (tx) =>
      Promise.all(
        BUNDLE_TESTS.map((testType, i) =>
          tx.assessment.create({
            data: {
              companyId,
              employeeId: employee!.id,
              testType,
              token: tokens[i],
              status: 'SENT',
              bundleId,
              bundleOrder: i + 1,
              expiresAt,
            },
          })
        )
      )
    )

    // Cobra do Passaporte (FIFO: bônus mais antigo primeiro)
    if (!isAdmin) {
      try {
        const r = await consumeCredits(
          companyId,
          BUNDLE_CREDIT_COST,
          `Combo Bundler (DISC+MBTI+Eneagrama+Temperamento) — ${employeeName}`,
        )
        if (r.passportNowConsumed) {
          await onPassportConsumed(companyId).catch(err => console.error('[trigger]', err))
        }
      } catch (err) {
        if (err instanceof InsufficientCreditsError) {
          // Race: rollback dos 4 assessments criados
          await prisma.assessment.deleteMany({ where: { id: { in: assessments.map(a => a.id) } } }).catch(() => {})
          return NextResponse.json(
            { error: `Passaporte insuficiente. O Combo Bundler custa ${BUNDLE_CREDIT_COST} créditos.` },
            { status: 402 }
          )
        }
        throw err
      }
    }

    // Link de entrada = token do primeiro teste (DISC)
    const firstToken = assessments[0].token
    const testLink = `${process.env.NEXT_PUBLIC_APP_URL}/test/${firstToken}`

    // Envia e-mail ao colaborador informando sobre o bundle
    const { sent: emailSent, error: emailError } = await sendAssessmentEmail({
      employeeName,
      employeeEmail,
      companyName: company?.name ?? 'sua empresa',
      testType: 'BUNDLE_4' as string,
      testLink,
      expiresAt,
    })

    if (emailError) {
      console.warn('[bundles] E-mail não enviado:', emailError)
    }

    return NextResponse.json(
      {
        bundleId,
        firstAssessmentId: assessments[0].id,
        testLink,
        emailSent,
        testsCount: BUNDLE_TESTS.length,
      },
      { status: 201 }
    )
  } catch (err) {
    console.error('[bundles POST]', err)
    return NextResponse.json({ error: 'Erro interno.' }, { status: 500 })
  }
}

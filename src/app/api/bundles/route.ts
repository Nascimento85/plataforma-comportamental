import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { v4 as uuidv4 } from 'uuid'
import { getSession } from '@/lib/session'
import { prisma } from '@/lib/prisma'
import { sendAssessmentEmail } from '@/lib/email'

// Bundle fixo: 4 testes comportamentais em sequência
const BUNDLE_TESTS = ['DISC', 'MBTI', 'ENNEAGRAM', 'TEMPERAMENT'] as const
const BUNDLE_CREDIT_COST = 4 // 1 crédito por teste

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

    // Verifica saldo (4 créditos para o bundle)
    if (!isAdmin) {
      const creditBalance = await prisma.creditBalance.findUnique({ where: { companyId } })
      if (!creditBalance || creditBalance.balance < BUNDLE_CREDIT_COST) {
        return NextResponse.json(
          { error: `Saldo insuficiente. O bundle de 4 testes custa ${BUNDLE_CREDIT_COST} créditos.` },
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

    // Cria os 4 assessments + debita créditos em transação atômica
    const assessments = await prisma.$transaction(async (tx) => {
      const created = await Promise.all(
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

      if (!isAdmin) {
        await tx.creditBalance.update({
          where: { companyId },
          data: { balance: { decrement: BUNDLE_CREDIT_COST } },
        })
        await tx.creditTransaction.create({
          data: {
            companyId,
            type: 'DEBIT',
            amount: -BUNDLE_CREDIT_COST,
            description: `Bundle 4 Testes Comportamentais — ${employeeName}`,
          },
        })
      }

      return created
    })

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

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { v4 as uuidv4 } from 'uuid'
import { getSession } from '@/lib/session'
import { prisma } from '@/lib/prisma'
import { sendAssessmentEmail } from '@/lib/email'
import { TEST_PRICE, consumeCredits, getPassportState, InsufficientCreditsError } from '@/lib/passport'
import { onPassportConsumed } from '@/lib/passport-triggers'

// Custo em créditos por tipo de teste — fonte única em lib/passport.ts (TEST_PRICE)
const CREDIT_COST: Record<string, number> = {
  DISC:                  TEST_PRICE.DISC,                    // 3
  MBTI:                  TEST_PRICE.MBTI,                    // 2
  ENNEAGRAM:             TEST_PRICE.ENNEAGRAM,               // 2
  TEMPERAMENT:           TEST_PRICE.TEMPERAMENT,             // 2
  ARCHETYPE:             TEST_PRICE.ARCHETYPE,               // 3
  ARCHETYPE_FEMININE:    TEST_PRICE.ARCHETYPE,               // 3
  LOVE_LANGUAGES:        TEST_PRICE.LOVE_LANGUAGES,          // 5
  CAREER_ANCHOR:         TEST_PRICE.CAREER_ANCHOR,           // 1
  EMOTIONAL_INTELLIGENCE: TEST_PRICE.EMOTIONAL_INTELLIGENCE, // 2
}

const schema = z.object({
  employeeName: z.string().min(2),
  employeeEmail: z.string().email(),
  testType: z.enum(['DISC', 'MBTI', 'ENNEAGRAM', 'TEMPERAMENT', 'ARCHETYPE', 'ARCHETYPE_FEMININE', 'LOVE_LANGUAGES', 'CAREER_ANCHOR', 'EMOTIONAL_INTELLIGENCE']),
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

    const { employeeName, employeeEmail, testType } = parsed.data

    // Verifica se é admin (admin não consome créditos)
    const company = await prisma.company.findUnique({ where: { id: companyId }, select: { isAdmin: true, name: true } })
    const isAdmin = company?.isAdmin ?? false

    // Custo do teste
    const creditCost = CREDIT_COST[testType] ?? 1

    // Verifica Passaporte (saldo total = bônus + pago) — só não-admins
    if (!isAdmin) {
      const passport = await getPassportState(companyId)
      if (passport.total < creditCost) {
        return NextResponse.json(
          { error: `Passaporte insuficiente. Este teste custa ${creditCost} crédito${creditCost > 1 ? 's' : ''}. Você tem ${passport.total}. Recarregue para continuar.` },
          { status: 402 }
        )
      }
    }

    // Cria ou reutiliza employee
    let employee = await prisma.employee.findFirst({
      where: { companyId, email: employeeEmail },
    })
    if (!employee) {
      employee = await prisma.employee.create({
        data: { companyId, name: employeeName, email: employeeEmail },
      })
    }

    // Gera token único + expira em 7 dias
    const token = uuidv4()
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

    // Cria assessment
    const assessment = await prisma.assessment.create({
      data: {
        companyId,
        employeeId: employee!.id,
        testType,
        token,
        expiresAt,
        status: 'SENT',
      },
    })

    // Cobra do Passaporte (FIFO: bônus mais antigo primeiro, depois pago)
    if (!isAdmin) {
      try {
        const r = await consumeCredits(companyId, creditCost, `Avaliação ${testType} — ${employeeName}`)
        if (r.passportNowConsumed) {
          // Saldo bônus zerou → agenda outreach 7d
          await onPassportConsumed(companyId).catch(err => console.error('[trigger]', err))
        }
      } catch (err) {
        if (err instanceof InsufficientCreditsError) {
          // Race condition raro — rollback do assessment criado
          await prisma.assessment.delete({ where: { id: assessment.id } }).catch(() => {})
          return NextResponse.json(
            { error: `Passaporte insuficiente. Este teste custa ${creditCost} créditos.` },
            { status: 402 }
          )
        }
        throw err
      }
    }

    const testLink = `${process.env.NEXT_PUBLIC_APP_URL}/test/${token}`

    // Envia e-mail ao colaborador (não bloqueia nem cancela em caso de falha)

    const { sent: emailSent, error: emailError } = await sendAssessmentEmail({
      employeeName:  employeeName,
      employeeEmail: employeeEmail,
      companyName:   company?.name ?? 'sua empresa',
      testType,
      testLink,
      expiresAt,
    })

    if (emailError) {
      console.warn('[assessments] E-mail não enviado:', emailError)
    }

    return NextResponse.json({ id: assessment.id, testLink, emailSent }, { status: 201 })
  } catch (err) {
    console.error('[assessments POST]', err)
    return NextResponse.json({ error: 'Erro interno.' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session) return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 })

    const assessments = await prisma.assessment.findMany({
      where: { companyId: session.id },
      orderBy: { createdAt: 'desc' },
      include: { employee: { select: { name: true, email: true } } },
    })

    return NextResponse.json(assessments)
  } catch (err) {
    console.error('[assessments GET]', err)
    return NextResponse.json({ error: 'Erro interno.' }, { status: 500 })
  }
}

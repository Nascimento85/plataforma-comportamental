import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { v4 as uuidv4 } from 'uuid'
import { getSession } from '@/lib/session'
import { prisma } from '@/lib/prisma'
import { sendAssessmentEmail } from '@/lib/email'

// Custo em créditos por tipo de teste
const CREDIT_COST: Record<string, number> = {
  DISC: 1,
  MBTI: 1,
  ENNEAGRAM: 1,
  TEMPERAMENT: 1,
  ARCHETYPE: 2,
  ARCHETYPE_FEMININE: 2,
  LOVE_LANGUAGES: 4,
}

const schema = z.object({
  employeeName: z.string().min(2),
  employeeEmail: z.string().email(),
  testType: z.enum(['DISC', 'MBTI', 'ENNEAGRAM', 'TEMPERAMENT', 'ARCHETYPE', 'ARCHETYPE_FEMININE', 'LOVE_LANGUAGES']),
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

    // Verifica saldo de créditos (apenas para não-admins)
    if (!isAdmin) {
      const creditBalance = await prisma.creditBalance.findUnique({ where: { companyId } })
      if (!creditBalance || creditBalance.balance < creditCost) {
        return NextResponse.json(
          { error: `Saldo insuficiente. Este teste custa ${creditCost} crédito${creditCost > 1 ? 's' : ''}. Compre mais créditos para continuar.` },
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

    // Cria assessment + debita 1 crédito se não for admin (transação atômica)
    const assessment = await prisma.$transaction(async (tx) => {
      const a = await tx.assessment.create({
        data: {
          companyId,
          employeeId: employee!.id,
          testType,
          token,
          expiresAt,
          status: 'SENT',
        },
      })

      if (!isAdmin) {
        // Debita créditos
        await tx.creditBalance.update({
          where: { companyId },
          data: { balance: { decrement: creditCost } },
        })

        await tx.creditTransaction.create({
          data: {
            companyId,
            type: 'DEBIT',
            amount: -creditCost,
            description: `Avaliação ${testType} — ${employeeName}`,
          },
        })
      }

      return a
    })

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

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { v4 as uuidv4 } from 'uuid'
import { getSession } from '@/lib/session'
import { prisma } from '@/lib/prisma'
import { sendAssessmentEmail } from '@/lib/email'

const schema = z.object({
  employeeName: z.string().min(2),
  employeeEmail: z.string().email(),
  testType: z.enum(['DISC', 'MBTI', 'ENNEAGRAM', 'TEMPERAMENT']),
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

    // Verifica saldo de créditos
    const creditBalance = await prisma.creditBalance.findUnique({ where: { companyId } })
    if (!creditBalance || creditBalance.balance < 1) {
      return NextResponse.json(
        { error: 'Saldo insuficiente. Compre mais créditos para criar avaliações.' },
        { status: 402 }
      )
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

    // Cria assessment + debita 1 crédito (transação atômica)
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

      // Debita crédito
      await tx.creditBalance.update({
        where: { companyId },
        data: { balance: { decrement: 1 } },
      })

      await tx.creditTransaction.create({
        data: {
          companyId,
          type: 'DEBIT',
          amount: -1,
          description: `Avaliação ${testType} — ${employeeName}`,
        },
      })

      return a
    })

    const testLink = `${process.env.NEXT_PUBLIC_APP_URL}/test/${token}`

    // Envia e-mail ao colaborador (não bloqueia nem cancela em caso de falha)
    const company = await prisma.company.findUnique({
      where: { id: companyId },
      select: { name: true },
    })

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

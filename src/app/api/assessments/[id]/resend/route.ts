import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/session'
import { prisma } from '@/lib/prisma'
import { sendAssessmentEmail } from '@/lib/email'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'

export async function POST(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 })
    }

    const assessment = await prisma.assessment.findUnique({
      where: { id: params.id },
      include: {
        employee: { select: { name: true, email: true } },
        company:  { select: { name: true } },
      },
    })

    if (!assessment) {
      return NextResponse.json({ error: 'Avaliação não encontrada.' }, { status: 404 })
    }

    if (assessment.companyId !== session.id) {
      return NextResponse.json({ error: 'Acesso negado.' }, { status: 403 })
    }

    const testLink = `${APP_URL}/test/${assessment.token}`

    const result = await sendAssessmentEmail({
      employeeName:  assessment.employee.name,
      employeeEmail: assessment.employee.email,
      companyName:   assessment.company.name,
      testType:      assessment.testType,
      testLink,
      expiresAt:     assessment.expiresAt,
    })

    if (!result.sent) {
      return NextResponse.json({ error: result.error ?? 'Falha no envio.' }, { status: 500 })
    }

    // Atualiza status para SENT se ainda estiver PENDING
    if (assessment.status === 'PENDING') {
      await prisma.assessment.update({
        where: { id: assessment.id },
        data:  { status: 'SENT' },
      })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[assessments/resend]', err)
    return NextResponse.json({ error: 'Erro interno.' }, { status: 500 })
  }
}

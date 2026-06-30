// Avaliações: criação (POST) e listagem (GET). Inclui COMUNICACAO.
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { v4 as uuidv4 } from 'uuid'
import { getSession } from '@/lib/session'
import { prisma } from '@/lib/prisma'
import { sendAssessmentEmail } from '@/lib/email'
import { TEST_PRICE, consumeCredits, getPassportState, InsufficientCreditsError } from '@/lib/passport'
import { onPassportConsumed } from '@/lib/passport-triggers'
import { getSubscriptionStatus } from '@/lib/subscription/check'

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
  VAC:                   TEST_PRICE.VAC,                     // 2
  BIG_FIVE:              TEST_PRICE.BIG_FIVE,                // 3
  QMT:                   TEST_PRICE.QMT,                     // 3
  LIDERANCA_SITUACIONAL: TEST_PRICE.LIDERANCA_SITUACIONAL,    // 3
  COMUNICACAO:           TEST_PRICE.COMUNICACAO,             // 5
  QI:                    TEST_PRICE.QI,                      // 4
}

const schema = z.object({
  // Quando selfAssessment=true, name/email são opcionais (usa dados do user logado)
  employeeName:   z.string().min(2).optional(),
  employeeEmail:  z.string().email().optional(),
  testType:       z.enum(['DISC', 'MBTI', 'ENNEAGRAM', 'TEMPERAMENT', 'ARCHETYPE', 'ARCHETYPE_FEMININE', 'LOVE_LANGUAGES', 'CAREER_ANCHOR', 'EMOTIONAL_INTELLIGENCE', 'VAC', 'BIG_FIVE', 'QMT', 'LIDERANCA_SITUACIONAL', 'COMUNICACAO', 'QI']),
  selfAssessment: z.boolean().optional(),
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

    const { testType, selfAssessment } = parsed.data

    // Verifica se é admin (admin não consome créditos)
    const company = await prisma.company.findUnique({
      where: { id: companyId },
      select: { isAdmin: true, name: true, email: true },
    })
    const isAdmin = company?.isAdmin ?? false

    // Assinante premium (plano ativo ou trial) tem acesso livre a todos os testes,
    // sem consumir creditos do Passaporte. Admin tambem e isento.
    const sub = await getSubscriptionStatus(companyId)
    const isPremium = sub.hasActiveAccess
    const exemptFromCredits = isAdmin || isPremium

    // Resolve nome/email finais:
    // - Self assessment: usa dados do user logado (sem precisar digitar nada no form)
    // - Envio externo: exige employeeName + employeeEmail do form
    let employeeName:  string
    let employeeEmail: string
    if (selfAssessment) {
      employeeName  = (company?.name  ?? session.name  ?? '').trim()
      employeeEmail = (company?.email ?? session.email ?? '').trim().toLowerCase()
      if (!employeeName || !employeeEmail) {
        return NextResponse.json({ error: 'Não foi possível identificar seu perfil. Tente sair e entrar de novo.' }, { status: 400 })
      }
    } else {
      employeeName  = (parsed.data.employeeName  ?? '').trim()
      employeeEmail = (parsed.data.employeeEmail ?? '').trim().toLowerCase()
      if (employeeName.length < 2 || !employeeEmail.includes('@')) {
        return NextResponse.json({ error: 'Informe nome e e-mail do candidato.' }, { status: 400 })
      }
    }

    // Custo do teste
    const creditCost = CREDIT_COST[testType] ?? 1

    // Verifica Passaporte (saldo total = bônus + pago) — só não-admins
    if (!exemptFromCredits) {
      const passport = await getPassportState(companyId)
      if (passport.total < creditCost) {
        return NextResponse.json(
          { error: `Passaporte insuficiente. Este teste custa ${creditCost} crédito${creditCost > 1 ? 's' : ''}. Você tem ${passport.total}. Recarregue para continuar.` },
          { status: 402 }
        )
      }
    }

    // Cria ou reutiliza employee — respeitando o limite de colaboradores do plano
    let employee = await prisma.employee.findFirst({
      where: { companyId, email: employeeEmail },
    })
    if (!employee) {
      // Limite de cadastro: planos com cap não permitem registrar novos
      // colaboradores além da faixa contratada (admin é isento).
      if (!isAdmin && sub.employeeCap != null) {
        const totalColaboradores = await prisma.employee.count({ where: { companyId } })
        if (totalColaboradores >= sub.employeeCap) {
          return NextResponse.json(
            {
              error: `Seu plano permite até ${sub.employeeCap} colaborador${sub.employeeCap > 1 ? 'es' : ''} cadastrado${sub.employeeCap > 1 ? 's' : ''}, e você já atingiu o limite. Faça upgrade do plano para cadastrar novos colaboradores.`,
              code: 'EMPLOYEE_CAP',
            },
            { status: 403 },
          )
        }
      }
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
    if (!exemptFromCredits) {
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

    // Envia e-mail ao colaborador (não bloqueia nem cancela em caso de falha).
    // No modo selfAssessment NÃO enviamos e-mail: o usuário vai ser redirecionado direto pro teste.
    let emailSent = false
    if (!selfAssessment) {
      const result = await sendAssessmentEmail({
        employeeName:  employeeName,
        employeeEmail: employeeEmail,
        companyName:   company?.name ?? 'sua empresa',
        testType,
        testLink,
        expiresAt,
      })
      emailSent = result.sent
      if (result.error) {
        console.warn('[assessments] E-mail não enviado:', result.error)
      }
    }

    return NextResponse.json({ id: assessment.id, testLink, emailSent, selfAssessment: !!selfAssessment }, { status: 201 })
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

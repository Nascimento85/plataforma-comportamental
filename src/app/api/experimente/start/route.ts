// ============================================================
// POST /api/experimente/start
// Funil de degustação via QR Code (palestras / rodadas de negócio).
// Cria um TrialLead + assessments anônimos numa empresa-vitrine e
// devolve o link do 1º teste. Sem cadastro, sem login.
// ============================================================

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import bcrypt from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid'
import { prisma } from '@/lib/prisma'
import { EXPERIMENTE_ALLOWED, VITRINE_EMAIL, VITRINE_NAME } from '@/lib/experimente'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const prismaAny = prisma as any

const ALLOWED = EXPERIMENTE_ALLOWED

const schema = z.object({
  firstName: z.string().trim().min(2, 'Informe seu nome.'),
  whatsapp:  z.string().trim().min(8, 'Informe um WhatsApp válido.'),
  src:       z.string().trim().max(80).nullish(),
  testTypes: z.array(z.string()).min(1, 'Escolha ao menos um teste.'),
})

// Empresa-vitrine: dona de todos os testes de degustação. Criada sob demanda.
async function ensureVitrineCompany(): Promise<string> {
  const existing = await prisma.company.findUnique({ where: { email: VITRINE_EMAIL }, select: { id: true } })
  if (existing) return existing.id
  const passwordHash = await bcrypt.hash(uuidv4(), 10)
  const created = await prisma.company.create({
    data: {
      name: VITRINE_NAME,
      email: VITRINE_EMAIL,
      passwordHash,
      type: 'PJ',
      active: false,       // conta de sistema — não faz login
      isAdmin: false,
      isOnboardingCredited: true,
    },
    select: { id: true },
  })
  return created.id
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null)
    const parsed = schema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 })
    }

    // Filtra apenas testes permitidos na degustação e limita a 2.
    const tests = Array.from(new Set(parsed.data.testTypes.filter((t) => ALLOWED.includes(t)))).slice(0, 2)
    if (tests.length === 0) {
      return NextResponse.json({ error: 'Escolha 1 ou 2 testes disponíveis.' }, { status: 400 })
    }

    const companyId = await ensureVitrineCompany()

    // Employee anônimo (e-mail sintético único para não colidir).
    const employee = await prisma.employee.create({
      data: {
        companyId,
        name: parsed.data.firstName,
        email: `lead-${uuidv4()}@vitrine.local`,
      },
      select: { id: true },
    })

    const isBundle = tests.length >= 2
    const bundleId = isBundle ? uuidv4() : null
    const expiresAt = new Date(Date.now() + 48 * 60 * 60 * 1000) // degustação expira em 48h

    const created = []
    for (let i = 0; i < tests.length; i++) {
      const a = await prisma.assessment.create({
        data: {
          companyId,
          employeeId: employee.id,
          testType: tests[i],
          token: uuidv4(),
          status: 'SENT',
          bundleId,
          bundleOrder: isBundle ? i + 1 : null,
          expiresAt,
        },
        select: { token: true },
      })
      created.push(a.token)
    }

    const firstToken = created[0]

    // Registra o lead (nome + WhatsApp + origem + testes).
    await prismaAny.trialLead.create({
      data: {
        firstName: parsed.data.firstName,
        whatsapp:  parsed.data.whatsapp,
        src:       parsed.data.src ?? null,
        testTypes: tests.join(','),
        bundleId,
        firstToken,
        status: 'STARTED',
      },
    })

    return NextResponse.json({ ok: true, firstToken, redirect: `/test/${firstToken}` }, { status: 201 })
  } catch (err) {
    console.error('[experimente/start]', err)
    return NextResponse.json({ error: 'Erro ao iniciar. Tente novamente.' }, { status: 500 })
  }
}

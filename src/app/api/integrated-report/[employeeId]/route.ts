// ============================================================
// GET  /api/integrated-report/[employeeId]
//   Busca a devolutiva integrada do funcionário.
//
// POST /api/integrated-report/[employeeId]
//   Força regeração (com { force: true }).
// ============================================================

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/session'
import { generateIntegratedReport } from '@/lib/integrated-report/generate'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const prismaAny = prisma as any

interface RouteContext {
  params: { employeeId: string }
}

// ── GET ─────────────────────────────────────────────────────────────────────

export async function GET(_req: NextRequest, { params }: RouteContext) {
  try {
    const session = await getSession()
    if (!session?.id) {
      return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 })
    }

    // Confirma que o employee pertence à empresa autenticada
    const employee = await prisma.employee.findUnique({
      where:  { id: params.employeeId },
      select: { id: true, companyId: true, name: true },
    })

    if (!employee || employee.companyId !== session.id) {
      return NextResponse.json({ error: 'Funcionário não encontrado.' }, { status: 404 })
    }

    const report = await prismaAny.employeeIntegratedReport.findUnique({
      where: {
        companyId_employeeId: { companyId: session.id, employeeId: params.employeeId },
      },
    })

    if (!report) {
      return NextResponse.json({
        status: 'NOT_GENERATED',
        employee: { id: employee.id, name: employee.name },
      })
    }

    return NextResponse.json({
      id:            report.id,
      status:        report.status,
      depth:         report.depth,
      testCount:     report.testCount,
      includedTests: report.includedTests ? JSON.parse(report.includedTests) : [],
      content:       report.content       ? JSON.parse(report.content)       : null,
      pdfUrl:        report.pdfUrl,
      generatedAt:   report.generatedAt,
      updatedAt:     report.updatedAt,
      employee:      { id: employee.id, name: employee.name },
    })
  } catch (err) {
    console.error('[integrated-report GET]', err)
    return NextResponse.json({ error: 'Erro interno.' }, { status: 500 })
  }
}

// ── POST (regenerar) ────────────────────────────────────────────────────────

export async function POST(req: NextRequest, { params }: RouteContext) {
  try {
    const session = await getSession()
    if (!session?.id) {
      return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 })
    }

    const employee = await prisma.employee.findUnique({
      where:  { id: params.employeeId },
      select: { id: true, companyId: true },
    })

    if (!employee || employee.companyId !== session.id) {
      return NextResponse.json({ error: 'Funcionário não encontrado.' }, { status: 404 })
    }

    const body = await req.json().catch(() => ({})) as { force?: boolean }
    const result = await generateIntegratedReport(session.id, params.employeeId, {
      force: body.force ?? true,  // POST manual sempre força por padrão
    })

    return NextResponse.json(result, {
      status: result.status === 'FAILED' ? 500
            : result.status === 'SKIPPED_NOT_ENOUGH_TESTS' ? 409
            : 200,
    })
  } catch (err) {
    console.error('[integrated-report POST]', err)
    return NextResponse.json({ error: 'Erro interno.' }, { status: 500 })
  }
}

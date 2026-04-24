// ============================================================
// GET  /api/bundle-reports/[bundleId]  — busca relatório cruzado
// POST /api/bundle-reports/[bundleId]  — regenera relatório
// ============================================================

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/session'
import { generateBundleReport } from '@/lib/bundle-report/generate'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const prismaAny = prisma as any

export async function GET(
  _req: NextRequest,
  { params }: { params: { bundleId: string } }
) {
  try {
    const session = await getSession()
    if (!session?.id) {
      return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 })
    }

    const report = await prismaAny.bundleReport.findUnique({
      where: { bundleId: params.bundleId },
      include: {
        employee: { select: { name: true, email: true } },
      },
    })

    if (!report) {
      return NextResponse.json({ error: 'Relatório não encontrado.' }, { status: 404 })
    }

    // Verifica que pertence à empresa autenticada
    if (report.companyId !== session.id) {
      return NextResponse.json({ error: 'Acesso negado.' }, { status: 403 })
    }

    return NextResponse.json({
      ...report,
      content: report.content ? JSON.parse(report.content) : null,
    })
  } catch (err) {
    console.error('[bundle-reports GET]', err)
    return NextResponse.json({ error: 'Erro interno.' }, { status: 500 })
  }
}

export async function POST(
  _req: NextRequest,
  { params }: { params: { bundleId: string } }
) {
  try {
    const session = await getSession()
    if (!session?.id) {
      return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 })
    }

    // Verifica que o bundle pertence à empresa
    const assessment = await prisma.assessment.findFirst({
      where: { bundleId: params.bundleId },
      select: { companyId: true },
    })

    if (!assessment || assessment.companyId !== session.id) {
      return NextResponse.json({ error: 'Bundle não encontrado ou acesso negado.' }, { status: 404 })
    }

    // Dispara regeneração em background
    generateBundleReport(params.bundleId).catch(console.error)

    return NextResponse.json({ message: 'Geração iniciada.', status: 'GENERATING' })
  } catch (err) {
    console.error('[bundle-reports POST]', err)
    return NextResponse.json({ error: 'Erro interno.' }, { status: 500 })
  }
}

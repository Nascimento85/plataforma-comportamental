import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/session'
import { prisma } from '@/lib/prisma'
import { generateReport } from '@/lib/pdf/generator'
import { parseResultData } from '@/lib/parseResult'

interface RouteParams {
  params: { id: string }
}

// GET /api/results/[id]/pdf — [id] é o assessmentId
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 })
    }

    // Busca pelo assessmentId (que é o que o dashboard passa no link)
    const assessment = await prisma.assessment.findUnique({
      where: { id: params.id },
      include: {
        employee: { select: { name: true } },
        company: { select: { name: true, id: true } },
        result: true,
      },
    })

    if (!assessment || !assessment.result) {
      return NextResponse.json({ error: 'Resultado não encontrado.' }, { status: 404 })
    }

    // Garante que apenas a empresa dona pode baixar
    if (assessment.company.id !== session.id) {
      return NextResponse.json({ error: 'Acesso negado.' }, { status: 403 })
    }

    // Parse do JSON armazenado como string no SQLite
    const resultData = parseResultData(assessment.result.resultData)

    // Gera o PDF sob demanda
    const pdfBuffer = await generateReport({
      testType: assessment.testType,
      employeeName: assessment.employee.name,
      companyName: assessment.company.name,
      resultData,
    })

    const filename = `relatorio-${assessment.testType.toLowerCase()}-${assessment.employee.name.replace(/\s+/g, '-')}.pdf`

    return new NextResponse(pdfBuffer as unknown as BodyInit, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': String(pdfBuffer.length),
      },
    })
  } catch (err) {
    console.error('[results/pdf GET]', err)
    return NextResponse.json({ error: 'Erro ao gerar PDF.' }, { status: 500 })
  }
}

// ============================================================
// GET /api/nr1/coletas/[id]/relatorio/pdf
// Gera (on demand) o PDF executivo do relatório NR-1 server-side
// via Puppeteer e devolve como download. Requer relatório já
// gerado (use POST /relatorio antes para criar a narrativa).
// ============================================================

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/session'
import { gerarRelatorioPdfBuffer } from '@/lib/nr1/pdf'
import type { RelatorioPdfContent } from '@/lib/nr1/pdf-template'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const prismaAny = prisma as any

// Rota dinâmica que executa em Node runtime (puppeteer não funciona em edge)
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 60  // até 60s para Puppeteer subir o headless e renderizar

function slugify(s: string): string {
  return s
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60)
}

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getSession()
  if (!session?.id) {
    return NextResponse.json({ error: 'Nao autorizado.' }, { status: 401 })
  }

  // Coleta da empresa logada
  const coleta = await prismaAny.nR1Coleta.findFirst({
    where:  { id: params.id, companyId: session.id },
    select: { id: true, nome: true },
  })
  if (!coleta) {
    return NextResponse.json({ error: 'Coleta nao encontrada.' }, { status: 404 })
  }

  // Relatório já deve existir
  const relatorio = await prismaAny.nR1Relatorio.findFirst({
    where: { coletaId: params.id, companyId: session.id },
    select: { content: true, status: true },
  })
  if (!relatorio?.content) {
    return NextResponse.json(
      { error: 'Relatório ainda não gerado. Clique em "Atualizar relatório" antes.' },
      { status: 409 },
    )
  }

  let content: RelatorioPdfContent
  try {
    content = JSON.parse(relatorio.content)
  } catch {
    return NextResponse.json({ error: 'Conteúdo do relatório corrompido.' }, { status: 500 })
  }

  let pdf: Buffer
  try {
    pdf = await gerarRelatorioPdfBuffer(content)
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error('[nr1/pdf] Falha ao gerar PDF:', msg)
    return NextResponse.json(
      { error: 'Falha ao gerar PDF. Tente novamente.', detail: msg },
      { status: 500 },
    )
  }

  const filename = `relatorio-nr1-${slugify(coleta.nome)}-${new Date().toISOString().slice(0, 10)}.pdf`

  return new NextResponse(pdf, {
    status: 200,
    headers: {
      'Content-Type':        'application/pdf',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Content-Length':      pdf.length.toString(),
      'Cache-Control':       'no-store',
    },
  })
}

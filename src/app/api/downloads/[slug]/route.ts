// ============================================================
// /api/downloads/[slug]?reportId=...
// ------------------------------------------------------------
// Entrega o PDF Premium personalizado:
//   1) Valida que existe ReportUnlock para o reportId
//   2) Busca asset pelo slug em DISC_PREMIUM
//   3) Gera capa dinâmica (nome + perfil) via @react-pdf
//   4) Mescla com PDF base do Supabase Storage
//   5) Retorna como attachment com filename amigável
// ============================================================

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { findDownloadBySlug } from '@/lib/downloads-registry'
import { buildPersonalizedPdf } from '@/lib/pdf-merge'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } },
) {
  try {
    const slug     = params.slug
    const reportId = request.nextUrl.searchParams.get('reportId')
    if (!reportId) {
      return NextResponse.json({ error: 'reportId é obrigatório' }, { status: 400 })
    }

    // 1) Valida unlock
    const unlock = await prisma.reportUnlock.findUnique({
      where: { reportId },
      include: {
        report: {
          include: {
            assessment: { include: { employee: { select: { name: true } } } },
            company:    { select: { name: true } },
          },
        },
      },
    })
    if (!unlock) {
      return NextResponse.json({ error: 'Relatório não desbloqueado' }, { status: 402 })
    }

    // 2) Resolve asset
    const resolved = findDownloadBySlug(slug)
    if (!resolved) {
      return NextResponse.json({ error: 'Material não encontrado' }, { status: 404 })
    }

    // 3+4) Gera capa + mescla
    const userName =
      unlock.report.assessment.employee.name ??
      unlock.report.company.name ??
      'Usuário Mapa Comportamental'

    const buffer = await buildPersonalizedPdf({
      storagePath: resolved.asset.storagePath,
      cover: {
        userName,
        profileLabel:  resolved.profileLabel,
        materialTitle: resolved.asset.title,
        materialKind:  resolved.asset.kind,
        paletteHex:    resolved.paletteHex,
      },
    })

    // 5) Entrega
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type':        'application/pdf',
        'Content-Disposition': `attachment; filename="${resolved.asset.fileName}"`,
        'Cache-Control':       'private, max-age=0, no-store',
      },
    })
  } catch (err) {
    console.error('[api/downloads]', err)
    const msg = err instanceof Error ? err.message : 'Erro inesperado'
    // Distingue erro do storage (asset não disponível) de erro do server
    if (msg.includes('Storage:')) {
      return NextResponse.json(
        { error: 'PDF base ainda não foi enviado para o servidor.', detail: msg },
        { status: 503 },
      )
    }
    return NextResponse.json({ error: 'Erro ao gerar PDF', detail: msg }, { status: 500 })
  }
}

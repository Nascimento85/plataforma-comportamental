// ============================================================
// /api/downloads/[slug]?reportId=...
// Entrega o PDF Premium personalizado.
//
// Estratégia:
//   1) Valida ReportUnlock para o reportId
//   2) Resolve o asset por slug em DISC_PREMIUM
//   3) Se asset.body existir → gera PDF programático completo
//      (capa + sumário + capítulos) via @react-pdf/renderer
//   4) Senão (fallback): mescla capa dinâmica + PDF estático do
//      Supabase Storage (pdf-lib)
//   5) Retorna como attachment com filename amigável
// ============================================================

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { findDownloadBySlug } from '@/lib/downloads-registry'
import { renderFullPdf } from '@/lib/pdf-document'
import { buildPersonalizedPdf } from '@/lib/pdf-merge'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// URL pública da logo (mesmo bucket público do Supabase). Pode ser sobrescrita por env.
const LOGO_URL =
  process.env.NEXT_PUBLIC_LOGO_URL ??
  'https://idywcxeuhaulwipekani.supabase.co/storage/v1/object/public/logo%20mapa%20comportamental/logo%20o%20mapa%20comportamental.png'

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

    const userName =
      unlock.report.assessment.employee.name ??
      unlock.report.company.name ??
      'Usuário Mapa Comportamental'

    let buffer: Buffer

    // 3) Estratégia A — PDF programático (preferida quando há body)
    if (resolved.asset.body) {
      buffer = await renderFullPdf({
        body: resolved.asset.body,
        materialTitle: resolved.asset.title,
        materialKind:  resolved.asset.kind,
        profileLabel:  resolved.profileLabel,
        paletteHex:    resolved.paletteHex,
        userName,
        logoSrc:       LOGO_URL,
      })
    }
    // 4) Estratégia B — fallback Storage (PDF do Canva)
    else if (resolved.asset.storagePath) {
      buffer = await buildPersonalizedPdf({
        storagePath: resolved.asset.storagePath,
        cover: {
          userName,
          profileLabel:  resolved.profileLabel,
          materialTitle: resolved.asset.title,
          materialKind:  resolved.asset.kind,
          paletteHex:    resolved.paletteHex,
        },
      })
    }
    else {
      return NextResponse.json(
        { error: 'Material sem conteúdo configurado (body nem storagePath)' },
        { status: 503 },
      )
    }

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
    if (msg.includes('Storage:')) {
      return NextResponse.json(
        { error: 'PDF base ainda não foi enviado para o servidor.', detail: msg },
        { status: 503 },
      )
    }
    return NextResponse.json({ error: 'Erro ao gerar PDF', detail: msg }, { status: 500 })
  }
}

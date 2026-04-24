import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'
export const maxDuration = 60  // 60s timeout para Puppeteer

interface RouteParams {
  params: { id: string }
}

// Resolve o caminho do Chromium no ambiente atual
function getChromiumPath(): string {
  // Em Railway (nixpacks), o chromium fica em:
  const candidates = [
    process.env.PUPPETEER_EXECUTABLE_PATH,
    '/run/current-system/sw/bin/chromium',
    '/nix/var/nix/profiles/default/bin/chromium',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
    '/usr/bin/google-chrome-stable',
    '/usr/bin/google-chrome',
  ].filter(Boolean) as string[]

  // Retorna o primeiro da lista (verifica em runtime)
  return candidates[0]
}

// GET /api/results/[id]/pdf — gera PDF via Puppeteer (público, sem login)
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    // Verifica se o assessment existe e está concluído
    const assessment = await prisma.assessment.findUnique({
      where: { id: params.id },
      include: { employee: { select: { name: true } } },
    })

    if (!assessment || assessment.status !== 'COMPLETED') {
      return NextResponse.json({ error: 'Resultado não encontrado.' }, { status: 404 })
    }

    // URL da página pública no modo print
    const APP_URL   = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'
    const targetUrl = `${APP_URL}/result/${params.id}?print=1`

    const puppeteer = await import('puppeteer-core')

    const browser = await puppeteer.default.launch({
      headless: true,
      executablePath: getChromiumPath(),
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--disable-gpu',
        '--no-first-run',
        '--no-zygote',
        '--single-process',
        '--disable-extensions',
        '--disable-background-networking',
        '--disable-default-apps',
      ],
    })

    const page = await browser.newPage()

    // Tamanho A4 em px a 96dpi = 794 × 1123
    await page.setViewport({ width: 794, height: 1123 })

    // Navega até a página de devolutiva
    await page.goto(targetUrl, { waitUntil: 'networkidle0', timeout: 30000 })

    // Gera o PDF
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '0', right: '0', bottom: '0', left: '0' },
    })

    await browser.close()

    const employeeName = assessment.employee.name.replace(/\s+/g, '-').toLowerCase()
    const filename = `devolutiva-${assessment.testType.toLowerCase()}-${employeeName}.pdf`

    return new NextResponse(pdfBuffer as unknown as BodyInit, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': String(pdfBuffer.length),
      },
    })
  } catch (err) {
    console.error('[pdf GET]', err)
    return NextResponse.json({ error: 'Erro ao gerar PDF.' }, { status: 500 })
  }
}

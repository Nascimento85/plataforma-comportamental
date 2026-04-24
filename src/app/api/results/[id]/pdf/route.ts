import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import fs from 'node:fs'

export const runtime = 'nodejs'
export const maxDuration = 60  // 60s timeout para Puppeteer

interface RouteParams {
  params: { id: string }
}

/**
 * Em PRODUÇÃO (Railway/Vercel/Lambda) usa @sparticuz/chromium — a lib oficial
 * para rodar Chromium em ambientes serverless com binário pré-compilado.
 *
 * Em DESENVOLVIMENTO usa um chromium local (instalado pelo sistema ou
 * apontado por PUPPETEER_EXECUTABLE_PATH).
 */
async function launchBrowser() {
  const isProd = process.env.NODE_ENV === 'production'

  const puppeteer = await import('puppeteer-core')

  if (isProd) {
    const chromium = (await import('@sparticuz/chromium')).default
    return puppeteer.default.launch({
      args: [...chromium.args, '--hide-scrollbars', '--disable-web-security'],
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: true,
    })
  }

  // --- DEV: tenta achar um chromium instalado localmente -----------------
  const candidates = [
    process.env.PUPPETEER_EXECUTABLE_PATH,
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
    '/usr/bin/google-chrome-stable',
    '/usr/bin/google-chrome',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  ].filter(Boolean) as string[]

  const executablePath = candidates.find((p) => {
    try { return fs.existsSync(p) } catch { return false }
  })

  if (!executablePath) {
    throw new Error(
      'Chromium não encontrado em dev. Instale o Chrome ou defina PUPPETEER_EXECUTABLE_PATH no .env.local',
    )
  }

  return puppeteer.default.launch({
    headless: true,
    executablePath,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })
}

// GET /api/results/[id]/pdf — gera PDF da devolutiva individual
export async function GET(_request: NextRequest, { params }: RouteParams) {
  let browser: Awaited<ReturnType<typeof launchBrowser>> | null = null

  try {
    // Verifica se o assessment existe e está concluído
    const assessment = await prisma.assessment.findUnique({
      where: { id: params.id },
      include: { employee: { select: { name: true } } },
    })

    if (!assessment || assessment.status !== 'COMPLETED') {
      return NextResponse.json({ error: 'Resultado não encontrado ou ainda não concluído.' }, { status: 404 })
    }

    // URL da página pública de resultado em modo "print"
    const APP_URL   = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'
    const targetUrl = `${APP_URL}/result/${params.id}?print=1`

    browser = await launchBrowser()
    const page = await browser.newPage()

    // A4 em px a 96dpi = 794 × 1123
    await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 2 })

    await page.goto(targetUrl, { waitUntil: 'networkidle0', timeout: 30000 })

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '0', right: '0', bottom: '0', left: '0' },
    })

    await browser.close()
    browser = null

    const employeeSlug = assessment.employee.name
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '-')
      .toLowerCase()
    const filename = `devolutiva-${assessment.testType.toLowerCase()}-${employeeSlug}.pdf`

    return new NextResponse(pdfBuffer as unknown as BodyInit, {
      status: 200,
      headers: {
        'Content-Type':        'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length':      String(pdfBuffer.length),
        'Cache-Control':       'no-store',
      },
    })
  } catch (err) {
    console.error('[pdf GET] Falha ao gerar PDF:', err)
    const message = err instanceof Error ? err.message : 'Erro ao gerar PDF.'
    return NextResponse.json({ error: message }, { status: 500 })
  } finally {
    if (browser) {
      try { await browser.close() } catch { /* noop */ }
    }
  }
}

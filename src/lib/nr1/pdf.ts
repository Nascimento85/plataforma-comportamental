// ============================================================
// Geração server-side do PDF executivo NR-1
// Usa puppeteer-core + @sparticuz/chromium (já instalados).
//
// Funciona em Railway/Linux com chromium serverless.
// Em dev local (mac/win), use o Chrome instalado via env CHROME_EXECUTABLE_PATH.
// ============================================================

import puppeteer, { type Browser } from 'puppeteer-core'
import chromium from '@sparticuz/chromium'
import { buildRelatorioPdfHtml, type RelatorioPdfContent } from './pdf-template'

/**
 * Resolve o executable path do Chromium conforme o ambiente.
 * Em prod (Railway/Linux), usa o binário do @sparticuz/chromium.
 * Em dev local, permite override via env CHROME_EXECUTABLE_PATH.
 */
async function resolveExecutablePath(): Promise<string> {
  if (process.env.CHROME_EXECUTABLE_PATH) return process.env.CHROME_EXECUTABLE_PATH
  return await chromium.executablePath()
}

/**
 * Renderiza o relatório completo em PDF (Buffer).
 * Header/footer com numeração de página. A4 com margens.
 */
export async function gerarRelatorioPdfBuffer(
  content: RelatorioPdfContent,
): Promise<Buffer> {
  const html = buildRelatorioPdfHtml(content)

  let browser: Browser | null = null
  try {
    browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: { width: 1240, height: 1754 }, // A4 @ 150dpi aprox
      executablePath: await resolveExecutablePath(),
      headless: true,
    })

    const page = await browser.newPage()
    await page.setContent(html, { waitUntil: 'networkidle0', timeout: 30_000 })

    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      preferCSSPageSize: true,
      displayHeaderFooter: true,
      // O headerTemplate precisa de algum conteúdo (mesmo vazio) p/ não exibir o padrão
      headerTemplate: `<div style="width:100%;"></div>`,
      footerTemplate: `
        <div style="
          width: 100%;
          padding: 0 14mm 6mm 14mm;
          font-size: 8pt;
          color: #8a7a68;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
        ">
          <span style="font-style: italic;">Psique · Mapa Comportamental — Diagnóstico Psicossocial NR-1</span>
          <span><span class="pageNumber"></span> / <span class="totalPages"></span></span>
        </div>`,
      margin: { top: '18mm', bottom: '22mm', left: '14mm', right: '14mm' },
    })

    return Buffer.from(pdf)
  } finally {
    if (browser) {
      await browser.close().catch(() => {})
    }
  }
}

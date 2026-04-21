// ============================================================
// supabase.dev.ts — Mock do Supabase para desenvolvimento local
// ============================================================
// Quando NEXT_PUBLIC_SUPABASE_URL não está configurado,
// usa este mock que salva PDFs em disco local (/tmp/reports/)
//
// Para usar: renomeie este arquivo para supabase.ts
// ============================================================

import { writeFileSync, mkdirSync, existsSync } from 'fs'
import { join } from 'path'

export const STORAGE_BUCKET = 'reports'

export function createServiceClient() {
  // Retorna um objeto que simula o Supabase client
  return {
    storage: {
      from: (_bucket: string) => ({
        upload: async (_path: string, _data: Buffer, _opts: unknown) => ({ error: null }),
        getPublicUrl: (path: string) => ({
          data: { publicUrl: `http://localhost:3000/dev-reports/${path}` },
        }),
      }),
    },
  }
}

// Exporta o client público (mock básico para auth)
export const supabase = null

export function getReportStoragePath(companyId: string, reportId: string) {
  return `${companyId}/${reportId}.pdf`
}

export async function uploadReport(
  companyId: string,
  reportId: string,
  pdfBuffer: Buffer
): Promise<string> {
  // Salva localmente em /tmp/reports/
  const dir = join('/tmp', 'reports', companyId)
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true })

  const filePath = join(dir, `${reportId}.pdf`)
  writeFileSync(filePath, pdfBuffer)

  const publicPath = `dev-local://${filePath}`
  console.log(`[DEV] PDF salvo em: ${filePath}`)
  return publicPath
}

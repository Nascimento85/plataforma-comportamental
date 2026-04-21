// ============================================================
// Supabase Client
// Client-side: anon key | Server-side: service_role
// ============================================================

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Cliente público (browser) — usa anon key
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Cliente admin (server only) — usa service_role key
// NUNCA expor no browser
export function createServiceClient() {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!serviceRoleKey) throw new Error('SUPABASE_SERVICE_ROLE_KEY não configurada')

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}

// ============================================================
// Helpers de Storage — PDFs dos relatórios
// ============================================================

export const STORAGE_BUCKET = 'reports'

export function getReportStoragePath(companyId: string, reportId: string) {
  return `${companyId}/${reportId}.pdf`
}

export async function uploadReport(
  companyId: string,
  reportId: string,
  pdfBuffer: Buffer
): Promise<string> {
  const serviceClient = createServiceClient()
  const path = getReportStoragePath(companyId, reportId)

  const { error } = await serviceClient.storage
    .from(STORAGE_BUCKET)
    .upload(path, pdfBuffer, {
      contentType: 'application/pdf',
      upsert: true,
    })

  if (error) throw new Error(`Erro ao fazer upload do relatório: ${error.message}`)

  const { data } = serviceClient.storage
    .from(STORAGE_BUCKET)
    .getPublicUrl(path)

  return data.publicUrl
}

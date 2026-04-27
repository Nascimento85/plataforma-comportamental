// ============================================================
// src/lib/storage.ts
// Helper para baixar arquivos privados do Supabase Storage.
//
// Bucket privado: 'downloads' (criar manualmente no Supabase ao
// servir o primeiro PDF — Storage → New Bucket → name=downloads,
// Public=OFF).
// ============================================================

import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL          = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE_KEY!

const adminClient = () => createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE, {
  auth: { persistSession: false, autoRefreshToken: false },
})

const BUCKET = 'downloads'

/**
 * Baixa o PDF base do Supabase Storage como Buffer.
 * @param path Ex.: 'disc/dominant/playbook-comando-vs-situacional.pdf'
 */
export async function fetchDownloadBuffer(path: string): Promise<Buffer> {
  const supabase = adminClient()
  const { data, error } = await supabase.storage.from(BUCKET).download(path)
  if (error || !data) {
    throw new Error(`Storage: falha ao baixar ${path} — ${error?.message ?? 'data null'}`)
  }
  const arrayBuffer = await data.arrayBuffer()
  return Buffer.from(arrayBuffer)
}

/**
 * Cria URL assinada para download direto (alternativa: redirect ao invés de stream).
 * @param path Caminho relativo ao bucket.
 * @param expiresInSec Default: 5 min.
 */
export async function createSignedDownloadUrl(
  path: string,
  expiresInSec = 300,
): Promise<string> {
  const supabase = adminClient()
  const { data, error } = await supabase.storage
    .from(BUCKET)
    .createSignedUrl(path, expiresInSec)
  if (error || !data?.signedUrl) {
    throw new Error(`Storage: falha ao assinar ${path} — ${error?.message ?? 'no url'}`)
  }
  return data.signedUrl
}

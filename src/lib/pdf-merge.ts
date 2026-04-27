// ============================================================
// src/lib/pdf-merge.ts
// Mescla a capa dinâmica (gerada via @react-pdf/renderer) com o
// PDF base (diagramado no Canva, hospedado no Supabase Storage).
// ============================================================

import { PDFDocument } from 'pdf-lib'
import { fetchDownloadBuffer } from '@/lib/storage'
import { renderCoverPdf, type CoverInput } from '@/lib/pdf-cover'

/**
 * Baixa o PDF base do storage, gera a capa, mescla e retorna o
 * PDF completo como Buffer.
 *
 * Fluxo:
 *   1) capa (1 pág A4)  ← @react-pdf/renderer com nome + perfil
 *   2) páginas do Canva ← Supabase Storage
 */
export async function buildPersonalizedPdf(args: {
  storagePath: string
  cover:       CoverInput
}): Promise<Buffer> {
  const [coverBytes, baseBytes] = await Promise.all([
    renderCoverPdf(args.cover),
    fetchDownloadBuffer(args.storagePath),
  ])

  const cover = await PDFDocument.load(coverBytes)
  const base  = await PDFDocument.load(baseBytes)

  const merged = await PDFDocument.create()
  merged.setTitle(args.cover.materialTitle)
  merged.setAuthor('Mapa Comportamental')
  merged.setSubject(args.cover.profileLabel)
  merged.setProducer('Mapa Comportamental Platform')
  merged.setCreator('@react-pdf/renderer + pdf-lib')

  // 1) Capa
  const coverPages = await merged.copyPages(cover, cover.getPageIndices())
  for (const p of coverPages) merged.addPage(p)

  // 2) Páginas do Canva
  const basePages = await merged.copyPages(base, base.getPageIndices())
  for (const p of basePages) merged.addPage(p)

  const out = await merged.save()
  return Buffer.from(out)
}

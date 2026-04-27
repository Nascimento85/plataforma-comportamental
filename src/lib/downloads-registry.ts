// ============================================================
// src/lib/downloads-registry.ts
// Resolve um slug de download para o asset + perfil.
// Pode ser estendido para outros testes (Eneagrama, MBTI, etc.).
// ============================================================

import { DISC_PREMIUM, type DiscProfileKey } from '@/content/disc'
import type { DownloadAsset } from '@/content/disc/types'

export interface ResolvedAsset {
  asset:        DownloadAsset
  profileKey:   string
  profileLabel: string
  paletteHex:   string
  testType:     'DISC'   // | 'ENNEAGRAM' | 'MBTI' | 'TEMPERAMENT' | 'LOVE_LANGUAGES' | 'ARCHETYPE'
}

/**
 * Procura um download por slug em todos os perfis DISC.
 * Retorna null se não existir.
 */
export function findDownloadBySlug(slug: string): ResolvedAsset | null {
  for (const key of Object.keys(DISC_PREMIUM) as DiscProfileKey[]) {
    const c = DISC_PREMIUM[key]
    const asset = c.downloads.find(d => d.slug === slug)
    if (asset) {
      return {
        asset,
        profileKey:   c.key,
        profileLabel: c.label,
        paletteHex:   c.paletteHex,
        testType:     'DISC',
      }
    }
  }
  return null
}

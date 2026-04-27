// ============================================================
// src/content/disc/index.ts — entrypoint dos 4 conteúdos Premium
// ============================================================

import type { DiscProfileKey, PremiumProfileContent } from './types'
import { dominantContent }   from './dominant'
import { influencerContent } from './influencer'
import { stableContent }     from './stable'
import { analystContent }    from './analyst'

export const DISC_PREMIUM: Record<DiscProfileKey, PremiumProfileContent> = {
  D: dominantContent,
  I: influencerContent,
  S: stableContent,
  C: analystContent,
}

export type { DiscProfileKey, PremiumProfileContent } from './types'

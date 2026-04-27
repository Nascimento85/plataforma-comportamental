// ============================================================
// src/content/disc/types.ts
// Tipos compartilhados pelos 4 conteúdos Premium DISC.
// O componente PremiumSections.tsx consome este shape.
// ============================================================

export type DiscProfileKey = 'D' | 'I' | 'S' | 'C'

export interface DeepAnalysis {
  motor: {
    title:    string
    summary:  string
    insights: string[]      // bullets profundos, não genéricos
  }
  shadow: {
    title:    string
    summary:  string
    blindspots: Array<{
      name:        string
      whatItLooksLike: string
      careerCost:  string
      reframe:     string
    }>
  }
  fears: {
    title:    string
    summary:  string
    items: Array<{
      fear:        string
      manifestation: string
      decisionImpact: string
    }>
  }
}

export interface CareerPlay {
  context: 'leadership' | 'sales' | 'operational' | 'negotiation'
  headline: string
  diagnosis: string
  plays: Array<{
    title: string
    do:    string[]
    dont:  string[]
    script?: string
  }>
}

export interface CommunicationGuide {
  selfTalk: {
    title:    string
    summary:  string
    techniques: Array<{ name: string; how: string }>
  }
  manualForOthers: {
    title:    string
    summary:  string
    rules: string[]
    scripts: Array<{ situation: string; sayThis: string; notThis: string }>
  }
}

export interface PdiTask {
  day:    number     // 1..21
  focus:  string     // 'Escuta Ativa' | 'IE' | 'Estratégia' etc.
  task:   string     // ação concreta
  metric: string     // como medir cumprimento
}

export interface PdiPlan {
  weeks: Array<{
    week:    number
    theme:   string
    summary: string
    days:    PdiTask[]
  }>
}

export interface DownloadAsset {
  slug:       string
  kind:       'PLAYBOOK' | 'CHECKLIST' | 'EBOOK' | 'WORKSHEET'
  title:      string
  pitch:      string
  pages:      number
  toc:        string[]            // sumário
  fileName:   string              // arquivo final entregue ao usuário
  /**
   * Caminho do PDF base (diagramado no Canva) no Supabase Storage.
   * Bucket privado: 'downloads'.
   * Ex.: 'disc/dominant/playbook-comando-vs-situacional.pdf'
   */
  storagePath: string
  signedUrl?: string              // preenchido em runtime
}

export interface PremiumProfileContent {
  key:        DiscProfileKey
  label:      string             // "Dominante (D)"
  pitchLine:  string             // headline do hero
  paletteHex: string             // cor do perfil
  analysis:   DeepAnalysis
  career:     CareerPlay[]
  communication: CommunicationGuide
  pdi:        PdiPlan
  downloads:  DownloadAsset[]
}

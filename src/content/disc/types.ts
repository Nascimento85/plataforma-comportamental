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

// ────────────────────────────────────────────────────────────
// Conteúdo do PDF (gerado programaticamente via @react-pdf/renderer)
// ────────────────────────────────────────────────────────────
export type PdfBlock =
  | { type: 'h1';        text: string }
  | { type: 'h2';        text: string }
  | { type: 'h3';        text: string }
  | { type: 'p';         text: string }
  | { type: 'lead';      text: string }     // parágrafo destaque (italic + cor)
  | { type: 'quote';     text: string; author?: string }
  | { type: 'callout';   tone: 'do' | 'dont' | 'tip' | 'warning'; text: string }
  | { type: 'list';      items: string[]; ordered?: boolean }
  | { type: 'check';     items: string[] }    // checklist com ☐
  | { type: 'kv';        items: Array<{ k: string; v: string }> } // "Key: Value"
  | { type: 'table';     headers: string[]; rows: string[][] }
  | { type: 'script';    role?: string; sayThis: string; notThis?: string } // bloco de script de fala
  | { type: 'spacer';    size?: 'sm' | 'md' | 'lg' }
  | { type: 'pageBreak' } // força nova página

export interface PdfChapter {
  number?:  number    // 1, 2, 3…
  title:    string
  subtitle?: string
  blocks:   PdfBlock[]
}

export interface PdfBody {
  /**
   * Subtítulo da capa (ex.: "PLAYBOOK · PERFIL DOMINANTE (D)").
   * Também aparece no header de cada página.
   */
  runningTitle: string
  /** Frase de impacto que aparece logo após a capa. */
  epigraph?:    { text: string; attribution?: string }
  /** Capítulos / seções principais. */
  chapters:     PdfChapter[]
  /** Anexos opcionais (vão depois dos capítulos, ainda numerados como capítulos). */
  appendices?:  PdfChapter[]
  /** Frase final (página de fechamento). */
  closing?:     { headline: string; subtext?: string }
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
   * Conteúdo programático do PDF. Quando presente, o endpoint gera o PDF
   * inteiro via @react-pdf/renderer (paleta + logo + capa dinâmica).
   * Fallback: storagePath (PDF estático no Supabase Storage).
   */
  body?:       PdfBody
  /**
   * Caminho de PDF estático (ex.: diagramado no Canva e subido no Supabase).
   * Usado como fallback quando `body` não está definido.
   */
  storagePath?: string
  signedUrl?:   string              // preenchido em runtime
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

// ============================================================
// Tipos compartilhados para playbooks publicos / gratuitos
// ============================================================

export type BlocoTipo =
  | 'paragrafo'
  | 'subtitulo'
  | 'callout'        // destaque (regra de ouro, atencao, etc)
  | 'lista'
  | 'separador'

export interface Bloco {
  tipo: BlocoTipo
  conteudo?: string
  titulo?: string       // opcional para callout/subtitulo
  variante?: 'info' | 'alerta' | 'sucesso'  // callout
  itens?: string[]      // lista
}

export interface Secao {
  numero?: string  // "1.", "🎯 1."
  titulo: string
  emoji?: string
  blocos: Bloco[]
}

export interface Playbook {
  slug: string
  titulo: string
  subtitulo: string
  badge: string    // ex: "Gratuito · Contratacao"
  abertura: string // paragrafo introdutorio
  secoes: Secao[]
  fechamento?: Bloco[]
}

// ============================================================
// Integração Hotmart · mapa de ofertas → entrega na plataforma
//
// Cada produto/oferta criado no painel do Hotmart precisa de uma
// entrada aqui. A chave é resolvida nesta ordem:
//   1. data.purchase.offer.code  (código da oferta, ex.: "k9x2m1")
//   2. String(data.product.id)   (id numérico do produto)
//
// Tipos de entrega:
//   CREDITS      → soma créditos pagos no saldo (sem expiração)
//   SUBSCRIPTION → ativa assinatura (plan = valor usado nos gates)
//
// Depois de criar o produto no Hotmart, copie o código da oferta
// e preencha abaixo. Vendas de ofertas não mapeadas NÃO creditam
// nada: geram alerta por e-mail para o admin resolver manualmente.
// ============================================================

export type HotmartGrant =
  | { kind: 'CREDITS'; credits: number; label: string }
  | { kind: 'SUBSCRIPTION'; plan: 'ESSENCIAL' | 'PROFISSIONAL' | 'ENTERPRISE'; label: string }

export const HOTMART_OFFERS: Record<string, HotmartGrant> = {
  // ── PREENCHER com os códigos reais das ofertas do Hotmart ──
  // Exemplos (troque as chaves pelos códigos verdadeiros):
  //
  // 'traducao-intima':  { kind: 'CREDITS', credits: 4,  label: 'Tradução Íntima (Linguagens do Amor + Arquétipo)' },
  // 'mapa-completo':    { kind: 'CREDITS', credits: 15, label: 'Mapa Comportamental Completo' },
  // 'assinatura-ind':   { kind: 'SUBSCRIPTION', plan: 'PROFISSIONAL', label: 'Assinatura Individual' },
}

/** Resolve a entrega a partir do código da oferta ou do id do produto. */
export function resolveHotmartGrant(
  offerCode: string | undefined,
  productId: string | number | undefined,
): HotmartGrant | null {
  if (offerCode && HOTMART_OFFERS[offerCode]) return HOTMART_OFFERS[offerCode]
  if (productId !== undefined && HOTMART_OFFERS[String(productId)]) {
    return HOTMART_OFFERS[String(productId)]
  }
  return null
}

/** Prefixo usado para registrar transações Hotmart nos modelos de crédito. */
export function hotmartTxId(transaction: string): string {
  return `hotmart_${transaction}`
}

// ============================================================
// Geracao da narrativa consultiva do relatorio NR-1 via Claude API
// ============================================================

import { buildNarrativePrompt } from './narrative-prompt'
import type { NR1AgregadoSetor } from './types'

const ANTHROPIC_URL = 'https://api.anthropic.com/v1/messages'
const MODEL         = 'claude-3-5-sonnet-20241022'
const MAX_TOKENS    = 4096

/**
 * Gera a narrativa em markdown para um setor especifico.
 * Em caso de erro (API key ausente, falha de rede, rate limit, etc),
 * retorna null para que o relatorio principal continue funcionando
 * com os dados quantitativos.
 */
export async function generateSectorNarrative(
  setor: NR1AgregadoSetor,
): Promise<string | null> {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    console.warn('[nr1/narrative] ANTHROPIC_API_KEY nao configurada — relatorio sera gerado sem narrativa.')
    return null
  }

  const prompt = buildNarrativePrompt(setor)

  try {
    const response = await fetch(ANTHROPIC_URL, {
      method: 'POST',
      headers: {
        'Content-Type':      'application/json',
        'x-api-key':         apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model:      MODEL,
        max_tokens: MAX_TOKENS,
        messages:   [{ role: 'user', content: prompt }],
      }),
    })

    if (!response.ok) {
      const errText = await response.text().catch(() => '')
      console.error(`[nr1/narrative] Anthropic API ${response.status}:`, errText)
      return null
    }

    const data = await response.json() as {
      content: Array<{ type: string; text: string }>
    }

    const text = data.content?.[0]?.text ?? ''
    if (!text.trim()) {
      console.error('[nr1/narrative] Resposta vazia da Anthropic API.')
      return null
    }

    return text.trim()
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error('[nr1/narrative] Falha ao chamar Anthropic API:', msg)
    return null
  }
}

/**
 * Gera narrativas em paralelo para varios setores.
 * Cada setor falha individualmente sem derrubar os outros.
 */
export async function generateNarrativesParallel(
  setores: NR1AgregadoSetor[],
): Promise<Map<string, string | null>> {
  const results = await Promise.all(
    setores.map(s => generateSectorNarrative(s).then(narrativa => [s.setorId, narrativa] as const))
  )
  return new Map(results)
}

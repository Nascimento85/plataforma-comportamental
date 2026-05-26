// ============================================================
// Geração do Guia de Entrevista via Claude API
// ============================================================

import { buildGuiaEntrevistaPrompt, type BuildGuiaInput } from './prompt-builder'

const ANTHROPIC_URL = 'https://api.anthropic.com/v1/messages'
const MODEL         = 'claude-sonnet-4-6'
const MAX_TOKENS    = 4096

export interface GenerateGuiaResult {
  ok:       boolean
  markdown?: string
  error?:    string
}

export async function gerarGuiaEntrevista(input: BuildGuiaInput): Promise<GenerateGuiaResult> {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return { ok: false, error: 'ANTHROPIC_API_KEY não configurada no servidor.' }
  }

  const prompt = buildGuiaEntrevistaPrompt(input)

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
      console.error(`[entrevista/generate] Anthropic API ${response.status}:`, errText)
      return { ok: false, error: `Erro Anthropic (${response.status}). Tente novamente.` }
    }

    const data = await response.json() as {
      content: Array<{ type: string; text: string }>
    }

    const text = data.content?.[0]?.text ?? ''
    if (!text.trim()) {
      return { ok: false, error: 'Resposta vazia da Claude API.' }
    }

    return { ok: true, markdown: text.trim() }
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error('[entrevista/generate] Falha:', msg)
    return { ok: false, error: 'Erro de conexão com a Claude API.' }
  }
}

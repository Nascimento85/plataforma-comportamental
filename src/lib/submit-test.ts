// ============================================================
// submitTestWithFallback — helper resiliente para submissão de
// respostas de teste, especialmente em redes móveis instáveis.
//
// Fluxo:
//   1) Tenta POST /api/results normalmente.
//   2) Se sucesso (2xx) → retorna result.
//   3) Se 409 (já concluído) OU erro de rede → faz GET /api/results/check
//      para confirmar se o servidor recebeu e processou.
//      a) Se completed=true → retorna o resultado.
//      b) Senão → propaga o erro original.
// ============================================================

interface SubmitOptions {
  token: string
  answers: unknown
  /** Tempo máximo de espera do POST inicial (ms). Default 30s. */
  timeoutMs?: number
}

interface SubmitResult {
  ok: true
  result: Record<string, unknown>
  resultId?: string
  recovered?: boolean // true se foi recuperado via /check (não pelo POST direto)
}

interface SubmitError {
  ok: false
  error: string
}

export async function submitTestWithFallback(
  opts: SubmitOptions,
): Promise<SubmitResult | SubmitError> {
  const { token, answers, timeoutMs = 30_000 } = opts

  // ─── 1ª tentativa: POST /api/results ──────────────────────
  try {
    const ctrl = new AbortController()
    const timer = setTimeout(() => ctrl.abort(), timeoutMs)

    const res = await fetch('/api/results', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ token, answers }),
      signal:  ctrl.signal,
    })
    clearTimeout(timer)

    if (res.ok) {
      const data = await res.json()
      return { ok: true, result: data.result, resultId: data.resultId }
    }

    // 409 = já concluído. O servidor já tem o Result salvo.
    if (res.status === 409) {
      return await recoverViaCheck(token)
    }

    // Outros erros: tenta ler a mensagem do servidor
    let message = 'Erro ao enviar respostas.'
    try {
      const data = await res.json()
      if (data?.error) message = String(data.error)
    } catch {
      // ignore JSON parse error
    }
    return { ok: false, error: message }
  } catch (err) {
    // Network error / timeout / abort. Pode ser que o servidor
    // tenha processado antes da rede cair. Tenta recuperar via check.
    const recovered = await recoverViaCheck(token)
    if (recovered.ok) return recovered

    const isAbort = err instanceof Error && err.name === 'AbortError'
    return {
      ok: false,
      error: isAbort
        ? 'A submissão demorou demais. Suas respostas talvez já tenham sido salvas. Recarregue a página em 30s para verificar.'
        : 'Erro de conexão. Verifique sua internet e tente novamente.',
    }
  }
}

// ─── Helper: GET /api/results/check ─────────────────────────
async function recoverViaCheck(token: string): Promise<SubmitResult | SubmitError> {
  try {
    const res = await fetch(`/api/results/check?token=${encodeURIComponent(token)}`, {
      method: 'GET',
    })
    if (!res.ok) {
      return { ok: false, error: 'Não foi possível verificar status do teste.' }
    }
    const data = await res.json()
    if (data?.completed && data?.result) {
      return {
        ok: true,
        result: data.result,
        resultId: data.resultId,
        recovered: true,
      }
    }
    return {
      ok: false,
      error: 'Erro ao enviar respostas. Tente novamente.',
    }
  } catch {
    return {
      ok: false,
      error: 'Erro de conexão. Verifique sua internet e tente novamente.',
    }
  }
}

// ============================================================
// Perfil Ideal da Vaga — geração via Claude API.
// O recrutador descreve a vaga em texto livre; a IA recomenda o
// perfil comportamental ideal (DISC + cruzamento com outros testes).
// ============================================================

const ANTHROPIC_URL = 'https://api.anthropic.com/v1/messages'
const MODEL         = 'claude-sonnet-4-6'
const MAX_TOKENS    = 3000

export type Nivel = 'Alto' | 'Médio' | 'Baixo'

export interface PerfilVaga {
  resumo: string
  disc: {
    dominante: 'D' | 'I' | 'S' | 'C'
    niveis: { D: Nivel; I: Nivel; S: Nivel; C: Nivel }
    justificativa: string
  }
  procurar: string[]
  alertas: string[]
  outrosTestes: { teste: string; indicacao: string; porque: string }[]
  perguntasChave: string[]
}

export interface GerarPerfilResult {
  ok: boolean
  perfil?: PerfilVaga
  error?: string
}

const SYSTEM = `Você é um consultor sênior de recrutamento e psicologia organizacional, especialista em traduzir a descrição de uma vaga no perfil comportamental ideal do candidato. Você conhece profundamente o DISC (Dominância, Influência, Estabilidade, Conformidade) e também Âncoras de Carreira (Edgar Schein), os 4 Temperamentos, Inteligência Emocional (Goleman) e Big Five.

Responda SOMENTE com um objeto JSON válido (sem markdown, sem comentários, sem texto antes ou depois), no formato exato:
{
  "resumo": "1 a 2 frases em linguagem simples descrevendo o perfil ideal para esta vaga",
  "disc": {
    "dominante": "D|I|S|C",
    "niveis": { "D": "Alto|Médio|Baixo", "I": "Alto|Médio|Baixo", "S": "Alto|Médio|Baixo", "C": "Alto|Médio|Baixo" },
    "justificativa": "por que esse balanço DISC é o ideal para a rotina descrita"
  },
  "procurar": ["4 a 6 características/comportamentos a procurar no candidato"],
  "alertas": ["3 a 5 sinais de alerta: perfis ou traços que tendem a NÃO funcionar nessa vaga, e por quê"],
  "outrosTestes": [
    { "teste": "Âncoras de Carreira", "indicacao": "ex.: Segurança/Estabilidade", "porque": "explicação curta" },
    { "teste": "4 Temperamentos", "indicacao": "ex.: Fleumático/Melancólico", "porque": "explicação curta" }
  ],
  "perguntasChave": ["3 a 5 perguntas de entrevista direcionadas para validar o encaixe nesta vaga"]
}

Regras: escreva em português do Brasil, tom consultivo e prático para um recrutador leigo em DISC. Seja específico à vaga descrita, não genérico. Não invente informação factual sobre a empresa. Não use travessões.`

function extrairJson(text: string): PerfilVaga | null {
  let t = text.trim()
  // Remove cercas de código se vierem
  t = t.replace(/^```(?:json)?/i, '').replace(/```$/,'').trim()
  const start = t.indexOf('{')
  const end   = t.lastIndexOf('}')
  if (start === -1 || end === -1) return null
  try {
    return JSON.parse(t.slice(start, end + 1)) as PerfilVaga
  } catch {
    return null
  }
}

export async function gerarPerfilVaga(input: { titulo: string; descricao: string }): Promise<GerarPerfilResult> {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) return { ok: false, error: 'ANTHROPIC_API_KEY não configurada no servidor.' }

  const userPrompt = `Vaga: ${input.titulo}\n\nDescrição da vaga (rotina, responsabilidades, contexto, desafios):\n${input.descricao}\n\nGere o perfil comportamental ideal para esta vaga no formato JSON especificado.`

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
        system:     SYSTEM,
        messages:   [{ role: 'user', content: userPrompt }],
      }),
    })

    if (!response.ok) {
      const errText = await response.text().catch(() => '')
      console.error(`[vaga/generate] Anthropic API ${response.status}:`, errText)
      return { ok: false, error: `Erro Anthropic (${response.status}). Tente novamente.` }
    }

    const data = await response.json() as { content: Array<{ type: string; text: string }> }
    const text = data.content?.[0]?.text ?? ''
    const perfil = extrairJson(text)
    if (!perfil || !perfil.disc) {
      return { ok: false, error: 'Não foi possível interpretar a resposta da IA. Tente reformular a descrição.' }
    }
    return { ok: true, perfil }
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error('[vaga/generate] Falha:', msg)
    return { ok: false, error: 'Erro de conexão com a Claude API.' }
  }
}

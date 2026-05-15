// ============================================================
// Prompt builders por profundidade
// ============================================================

import type { IntegratedDepth, TestSummary } from './types'
import { DEPTH_CONFIGS } from './depth'

interface PromptInput {
  employeeName: string
  summaries: TestSummary[]
}

function buildTestsContext(summaries: TestSummary[]): string {
  return summaries.map((s, i) => {
    const lines: string[] = []
    lines.push(`### ${i + 1}. ${s.testLabel}`)
    lines.push(`- Resultado primario: ${s.primary.label} (${s.primary.code})`)
    if (s.primary.percentage !== undefined) lines.push(`- Percentual: ${s.primary.percentage}%`)
    if (s.secondary)  lines.push(`- Secundario: ${s.secondary.label} (${s.secondary.code})`)
    if (s.shadow)     lines.push(`- Sombra: ${s.shadow.label}`)
    if (s.toActivate) lines.push(`- Precisa ativar: ${s.toActivate.label}`)
    if (s.percentages) {
      const pct = Object.entries(s.percentages).map(([k, v]) => `${k}=${v}%`).join(' ')
      lines.push(`- Distribuicao: ${pct}`)
    }
    return lines.join('\n')
  }).join('\n\n')
}

function headerBlock(input: PromptInput, depth: IntegratedDepth): string {
  const cfg = DEPTH_CONFIGS[depth]
  return `Voce e um especialista senior em psicologia comportamental, desenvolvimento humano e leitura integrada de perfis. Recebi os resultados de ${input.summaries.length} avaliacoes do(a) avaliado(a) ${input.employeeName}.

Profundidade do relatorio: ${cfg.label} (${cfg.targetWords}+ palavras)
Instrucao geral: ${cfg.promptHeadline}

## RESULTADOS

${buildTestsContext(input.summaries)}

---

Gere APENAS JSON puro (sem markdown, sem prefixo crase-json), em portugues brasileiro, seguindo EXATAMENTE o schema abaixo. Use linguagem acolhedora e empoderada. Cada insight deve referenciar a combinacao dos perfis listados, citando-os pelo nome.
`
}

function buildBasicPrompt(input: PromptInput): string {
  return `${headerBlock(input, 'BASIC')}

Schema:
{
  "titulo": "string - titulo curto (max 8 palavras)",
  "sintese": "string - 2 paragrafos descrevendo a pessoa pelos 2 testes. 250+ palavras. Cite os dois perfis.",
  "convergencia_principal": {
    "tema": "string - ponto em que os 2 testes concordam",
    "descricao": "string - 80+ palavras explicando"
  },
  "ponto_de_atencao": {
    "tema": "string - padrao a observar",
    "descricao": "string - 80+ palavras com leitura empoderada"
  },
  "proximo_passo": "string - 1 sugestao concreta de proximo passo"
}`
}

function buildSyntheticPrompt(input: PromptInput): string {
  return `${headerBlock(input, 'SYNTHETIC')}

Schema:
{
  "titulo": "string (max 10 palavras)",
  "perfil_sintese": "string - 2 paragrafos integradores. 300+ palavras.",
  "tres_dimensoes": {
    "nucleo_motivacional": {"titulo": "string", "descricao": "string - 120+ palavras conectando os 3 testes"},
    "estilo_executor":     {"titulo": "string", "descricao": "string - 120+ palavras conectando os 3 testes"},
    "vetor_de_desenvolvimento": {"titulo": "string", "descricao": "string - 120+ palavras conectando os 3 testes"}
  },
  "aplicacao_pratica": "string - 100+ palavras",
  "proximo_passo": "string"
}`
}

function buildExecutivePrompt(input: PromptInput): string {
  return `${headerBlock(input, 'EXECUTIVE')}

Schema:
{
  "titulo": "string (max 10 palavras)",
  "perfil_sintese": {
    "titulo": "string",
    "descricao": "string - 3 paragrafos. 350+ palavras. Cite explicitamente as combinacoes."
  },
  "convergencias": {
    "titulo": "O que os testes dizem em unissono",
    "itens": [{"tema": "string", "descricao": "string - 80+ palavras"}]
  },
  "tensoes_internas": {
    "titulo": "Onde ha tensao criativa",
    "itens": [{"tema": "string", "descricao": "string - 80+ palavras"}]
  },
  "aplicacao_profissional": {
    "titulo": "Como se manifesta no trabalho",
    "lideranca":         "string - 80+ palavras",
    "comunicacao":       "string - 80+ palavras",
    "ambiente_ideal":    "string - 80+ palavras",
    "pontos_de_atencao": "string - 80+ palavras"
  },
  "plano_de_desenvolvimento": {
    "titulo": "Proximos passos",
    "acoes": [
      {"prioridade": 1, "area": "string", "acao": "string"},
      {"prioridade": 2, "area": "string", "acao": "string"},
      {"prioridade": 3, "area": "string", "acao": "string"},
      {"prioridade": 4, "area": "string", "acao": "string"},
      {"prioridade": 5, "area": "string", "acao": "string"}
    ]
  }
}

REGRAS:
- Minimo 3 itens em convergencias e 2 em tensoes_internas
- Cada acao deve ser unica para esta combinacao
`
}

function buildPremiumPrompt(input: PromptInput): string {
  return `${headerBlock(input, 'PREMIUM')}

Schema:
{
  "titulo": "string (max 10 palavras)",
  "perfil_sintese": {
    "titulo": "string",
    "descricao": "string - 4 paragrafos. 500+ palavras."
  },
  "convergencias": {
    "titulo": "O que os testes dizem em unissono",
    "itens": [{"tema": "string", "descricao": "string - 100+ palavras"}]
  },
  "tensoes_criativas": {
    "titulo": "Onde mora a complexidade",
    "itens": [{"tema": "string", "descricao": "string - 100+ palavras"}]
  },
  "leitura_estrategica_corporativa": {
    "titulo": "Aplicacao corporativa estrategica",
    "lideranca":                       "string - 100+ palavras",
    "tomada_de_decisao":               "string - 100+ palavras",
    "comunicacao_e_influencia":        "string - 100+ palavras",
    "ambiente_organizacional_ideal":   "string - 100+ palavras",
    "riscos_e_pontos_cegos_no_trabalho": "string - 100+ palavras"
  },
  "leitura_humana": {
    "titulo": "Dimensao humana e relacional",
    "relacionamentos":                  "string - 100+ palavras",
    "como_recebe_amor_e_reconhecimento": "string - 100+ palavras",
    "como_lida_com_conflito":           "string - 100+ palavras",
    "padroes_de_sombra":                "string - 100+ palavras"
  },
  "plano_de_desenvolvimento": {
    "titulo": "Plano de 7 acoes",
    "acoes": [
      {"prioridade": 1, "area": "string", "acao": "string", "porque": "string"},
      {"prioridade": 2, "area": "string", "acao": "string", "porque": "string"},
      {"prioridade": 3, "area": "string", "acao": "string", "porque": "string"},
      {"prioridade": 4, "area": "string", "acao": "string", "porque": "string"},
      {"prioridade": 5, "area": "string", "acao": "string", "porque": "string"},
      {"prioridade": 6, "area": "string", "acao": "string", "porque": "string"},
      {"prioridade": 7, "area": "string", "acao": "string", "porque": "string"}
    ]
  },
  "manifesto_final": "string - 1 paragrafo de fechamento empoderado, 80-120 palavras."
}

REGRAS:
- Minimo 4 em convergencias e 3 em tensoes_criativas
- Cada acao conecta 2+ perfis dos testes apresentados
`
}

const BUILDERS: Record<IntegratedDepth, (input: PromptInput) => string> = {
  BASIC:     buildBasicPrompt,
  SYNTHETIC: buildSyntheticPrompt,
  EXECUTIVE: buildExecutivePrompt,
  PREMIUM:   buildPremiumPrompt,
}

export function buildPrompt(depth: IntegratedDepth, input: PromptInput): string {
  return BUILDERS[depth](input)
}

// ============================================================
// Template do prompt para geração da devolutiva cruzada
// ============================================================

export interface BundleResultsInput {
  employeeName: string
  disc: {
    predominant: string       // D | I | S | C
    secondary: string
    scores: Record<string, number>
  }
  mbti: {
    type: string              // ex: "ENTJ"
    functions: string[]       // funções cognitivas
  }
  enneagram: {
    predominant: number       // 1-9
    wing?: number
    scores: Record<string, number>
  }
  archetype: {
    primary: string           // ex: "SOVEREIGN"
    secondary: string
    scores: Record<string, number>
  }
}

const DISC_LABELS: Record<string, string> = {
  D: 'Dominante (Executor)',
  I: 'Influenciador (Comunicador)',
  S: 'Estável (Planejador)',
  C: 'Conforme (Analista)',
}

const ENNEAGRAM_NAMES: Record<number, string> = {
  1: 'Reformador (Tipo 1)',
  2: 'Ajudante (Tipo 2)',
  3: 'Realizador (Tipo 3)',
  4: 'Individualista (Tipo 4)',
  5: 'Investigador (Tipo 5)',
  6: 'Leal (Tipo 6)',
  7: 'Entusiasta (Tipo 7)',
  8: 'Desafiador (Tipo 8)',
  9: 'Pacificador (Tipo 9)',
}

export function buildBundlePrompt(data: BundleResultsInput): string {
  const discLabel = DISC_LABELS[data.disc.predominant] ?? data.disc.predominant
  const discSecLabel = DISC_LABELS[data.disc.secondary] ?? data.disc.secondary
  const ennLabel = ENNEAGRAM_NAMES[data.enneagram.predominant] ?? `Tipo ${data.enneagram.predominant}`

  return `Você é um especialista em psicologia comportamental e desenvolvimento humano. Recebi os resultados completos de 4 avaliações de **${data.employeeName}**. Gere uma devolutiva integrada, profunda e personalizada em português brasileiro.

## RESULTADOS DAS 4 AVALIAÇÕES

### 1. DISC — Perfil Comportamental
- **Perfil predominante:** ${discLabel}
- **Perfil secundário:** ${discSecLabel}
- Scores: D=${data.disc.scores.D ?? 0} | I=${data.disc.scores.I ?? 0} | S=${data.disc.scores.S ?? 0} | C=${data.disc.scores.C ?? 0}

### 2. MBTI — Tipo Psicológico
- **Tipo:** ${data.mbti.type}
- **Funções cognitivas:** ${data.mbti.functions?.join(', ') || 'N/A'}

### 3. Eneagrama — Motivações Profundas
- **Tipo predominante:** ${ennLabel}
${data.enneagram.wing ? `- **Asa:** ${data.enneagram.wing}` : ''}

### 4. Arquétipos — Narrativa de Identidade
- **Arquétipo primário:** ${data.archetype.primary}
- **Arquétipo secundário:** ${data.archetype.secondary}

---

## INSTRUÇÕES PARA A DEVOLUTIVA

Gere um JSON com EXATAMENTE esta estrutura (sem markdown, apenas JSON puro):

{
  "perfil_sintese": {
    "titulo": "string — título criativo e personalizado (máx 10 palavras)",
    "descricao": "string — 3 parágrafos ricos descrevendo quem é essa pessoa no núcleo. Cite especificamente a combinação dos 4 frameworks. Mínimo 300 palavras."
  },
  "convergencias": {
    "titulo": "O que os 4 testes dizem em uníssono",
    "itens": [
      {"tema": "string", "descricao": "string — como DISC, MBTI, Eneagrama e Arquétipo convergem neste ponto. Mínimo 80 palavras cada."}
    ]
  },
  "tensoes_internas": {
    "titulo": "Onde há tensão criativa",
    "itens": [
      {"tema": "string", "descricao": "string — onde os frameworks divergem e o que isso revela sobre a complexidade da pessoa. Mínimo 80 palavras cada."}
    ]
  },
  "aplicacao_profissional": {
    "titulo": "Como isso se manifesta no trabalho",
    "lideranca": "string — estilo natural de liderança baseado na combinação dos 4 perfis. 80+ palavras.",
    "comunicacao": "string — como se comunica e como prefere receber comunicação. 80+ palavras.",
    "ambiente_ideal": "string — tipo de cultura, equipe e contexto onde floresce. 80+ palavras.",
    "pontos_de_atencao": "string — padrões que podem limitar ou criar atritos no trabalho. 80+ palavras."
  },
  "aplicacao_pessoal": {
    "titulo": "Como isso se manifesta na vida",
    "relacionamentos": "string — padrões relacionais, como ama e como precisa ser amada. 80+ palavras.",
    "tomada_de_decisao": "string — como processa escolhas importantes, o que a move e o que a paralisa. 80+ palavras.",
    "padroes_a_observar": "string — sombras, pontos cegos e padrões inconscientes a desenvolver. 80+ palavras."
  },
  "plano_de_desenvolvimento": {
    "titulo": "Próximos passos concretos",
    "acoes": [
      {"prioridade": 1, "area": "string", "acao": "string — ação específica, prática e derivada da combinação dos 4 frameworks. Não genérica."},
      {"prioridade": 2, "area": "string", "acao": "string"},
      {"prioridade": 3, "area": "string", "acao": "string"},
      {"prioridade": 4, "area": "string", "acao": "string"},
      {"prioridade": 5, "area": "string", "acao": "string"}
    ]
  }
}

REGRAS IMPORTANTES:
- Responda APENAS com o JSON, sem texto antes ou depois
- Cada insight deve referenciar ESPECIFICAMENTE a combinação de frameworks (ex: "Seu DISC-D combinado com MBTI-Te indica...")
- Use linguagem acolhedora, respeitosa e empoderada — não clínica
- Evite generalidades — cada ponto deve ser único para esta combinação específica
- Inclua pelo menos 3 itens em "convergencias" e 2 em "tensoes_internas"
`
}

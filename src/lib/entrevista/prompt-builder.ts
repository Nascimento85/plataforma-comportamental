// ============================================================
// Construtor do prompt para o Guia de Entrevista personalizado.
// O framework do Kênio (perfis disfuncionais + triangulação) é
// injetado como BASE inegociável. A Claude API contextualiza
// para o cargo / senioridade / tom escolhidos pelo usuário.
// ============================================================

import {
  PERFIS_DISFUNCIONAIS_MAP,
  FATOR_TRIANGULACAO_DESCRICAO,
  type PerfilDisfuncionalKey,
} from '@/content/entrevista/perfis-disfuncionais'

export type Senioridade = 'JUNIOR' | 'PLENO' | 'SENIOR' | 'GERENTE' | 'DIRETOR'
export type TomEntrevista = 'FORMAL' | 'CONSULTIVO' | 'INFORMAL_HONESTO'

const SENIORIDADE_LABEL: Record<Senioridade, string> = {
  JUNIOR:   'Júnior (até 2 anos de experiência)',
  PLENO:    'Pleno (2 a 5 anos de experiência)',
  SENIOR:   'Sênior (5 anos ou mais, especialista técnico ou de gestão)',
  GERENTE:  'Gerência (lidera time, reporta a diretoria)',
  DIRETOR:  'Diretoria ou C level (responsabilidade estratégica e de board)',
}

const TOM_LABEL: Record<TomEntrevista, string> = {
  FORMAL:           'Formal e corporativo (ambientes tradicionais, grandes empresas)',
  CONSULTIVO:       'Consultivo e exploratório (consultoria, tech, scale ups)',
  INFORMAL_HONESTO: 'Informal e honesto direto (PMEs, startups, ambiente família)',
}

export interface BuildGuiaInput {
  cargo:              string
  senioridade:        Senioridade
  perfisInvestigar:   PerfilDisfuncionalKey[]
  tom:                TomEntrevista
  contextoAdicional?: string
}

/**
 * Monta o prompt completo. Injeta as 3 perguntas de CADA perfil escolhido
 * com observação literal. A Claude vai contextualizar essas perguntas
 * para o cargo, sem inventar perguntas novas (o framework é a base).
 */
export function buildGuiaEntrevistaPrompt(input: BuildGuiaInput): string {
  const perfisBloco = input.perfisInvestigar.map((key) => {
    const p = PERFIS_DISFUNCIONAIS_MAP[key]
    if (!p) return ''
    const perguntas = p.perguntas.map(q => {
      const obs = q.observar ? `\n   Observar: ${q.observar}` : ''
      return `${q.numero}. ${q.texto}${obs}`
    }).join('\n\n')
    return `### ${p.rotulo}
${p.descricao}

Perguntas âncora (use estas como BASE, contextualize ao cargo se fizer sentido, não invente perguntas novas para perfis disfuncionais):
${perguntas}`
  }).join('\n\n---\n\n')

  return `Você é um recrutador experiente que escreve um guia de entrevista para qualquer pessoa conduzir, do dono de PME que nunca entrevistou na vida ao gerente de RH veterano. Escreva como se estivesse conversando com um amigo no balcão do café: linguagem simples, frases curtas, zero jargão técnico. Quando precisar usar um termo técnico (ex: passivo agressivo, microgestão), explique em parênteses logo na primeira aparição.

Você está produzindo um Guia de Entrevista personalizado para a plataforma Psique, Mapa Comportamental.

CONTEXTO DA VAGA

- Cargo a ser entrevistado: **${input.cargo}**
- Senioridade: ${SENIORIDADE_LABEL[input.senioridade]}
- Tom da entrevista: ${TOM_LABEL[input.tom]}
${input.contextoAdicional ? `- Contexto adicional fornecido pelo gestor: ${input.contextoAdicional}` : ''}

FRAMEWORK BASE, Perfis Disfuncionais a investigar

${perfisBloco}

CONCEITO INEGOCIÁVEL, Fator de Triangulação

${FATOR_TRIANGULACAO_DESCRICAO}

INSTRUÇÕES DE GERAÇÃO

Produza o guia em MARKDOWN, em PORTUGUÊS DO BRASIL, com tom alinhado ao escolhido (${TOM_LABEL[input.tom]}). Estrutura RIGOROSA:

## 1. Abertura da entrevista (5 min)

Sugira 2 a 3 perguntas leves de aquecimento adequadas ao cargo e tom (NÃO use perguntas dos perfis disfuncionais aqui, essas são para o aprofundamento). Inclua uma dica curta sobre criar ambiente psicológico para o candidato baixar a guarda.

## 2. Bloco técnico ou experiencial (15 a 20 min)

Sugira 4 a 6 perguntas comportamentais sobre EXPERIÊNCIA TÉCNICA específica do cargo "${input.cargo}" no nível ${input.senioridade}. Use o método STAR (Situação, Tarefa, Ação, Resultado) sutilmente embutido na pergunta. Não use perguntas dos perfis disfuncionais aqui.

## 3. Investigação comportamental, Pergunta âncora por perfil (20 a 30 min)

Para cada perfil disfuncional listado no framework acima, apresente APENAS a Pergunta 1 (a âncora). Inclua:
- A pergunta (contextualizada ao cargo "${input.cargo}" se fizer sentido, sem alterar o núcleo)
- Bloco "🎯 O que observar" (resuma o sinal de alerta e o comportamento saudável esperado)

## 4. Triangulação, Confirmação dos diagnósticos (20 a 30 min)

> Aplique apenas as Perguntas 2 e 3 dos perfis onde a Pergunta 1 (etapa anterior) deixou alguma dúvida ou suspeita. Não aplique todas, use seu julgamento. O Fator de Triangulação confirma diagnóstico quando o padrão se repete em 2 ou mais narrativas históricas diferentes.

Liste, perfil por perfil, as Perguntas 2 e 3 (com seus "O que observar") como referência rápida. NÃO invente perguntas novas, use as do framework.

## 5. Fechamento e perguntas do candidato (10 min)

Sugira a estrutura de fechamento ideal: dar espaço para perguntas, alinhar próximos passos, fornecer feedback realista de timing.

## 6. Checklist pós entrevista, Sinais de Alerta vs Sinais de Talento

Tabela markdown de duas colunas, contextualizada ao cargo:
- **Coluna esquerda:** sinais de alerta agregados (padrões disfuncionais que apareceram)
- **Coluna direita:** sinais de talento (comportamentos saudáveis evidenciados)

Mínimo de 6 linhas. Tom direto e prático.

## 7. Score sugerido (opcional, mas recomendado)

Sugira uma matriz simples de 0 a 10 para o entrevistador pontuar logo após a entrevista, em 4 dimensões:
1. Aderência técnica ao cargo
2. Ausência de padrões disfuncionais (quanto menos sinais de alerta, maior a nota)
3. Sinais de talento e maturidade
4. Fit cultural com o tom escolhido (${TOM_LABEL[input.tom]})

REGRAS DE LINGUAGEM (IMPORTANTES)

- **Linguagem simples e conversacional.** Escreva como se estivesse explicando o roteiro pro dono do negócio na sala dele, com café na mão. Frases curtas. Verbos diretos. Zero pomposidade.
- **Use você o tempo todo.** Trate o entrevistador como "você", nunca como "o entrevistador deve". Ex: "Quando ele responder, fica de olho em..." em vez de "O entrevistador deve observar...".
- **Atenda do CEO ao gerente que nunca contratou.** Evite palavras como "axiomático", "supracitado", "pertinente". Prefira "óbvio", "que falamos antes", "que faz sentido". Se usar termo técnico de RH (microgestão, fit cultural, soft skill, passivo agressivo), explique em parênteses na primeira vez.
- **Crie ambiente de conversa, não de tribunal.** Sugira começar a entrevista com algo leve para o candidato baixar a guarda. Lembre o entrevistador de sorrir, anotar respostas em vez de só ouvir, dar pausas.
- **Dicas práticas curtinhas** ao longo do guia: "Se ele travar nesta pergunta, segue a próxima", "Anota uma palavra-chave da resposta, vai precisar depois", etc.

REGRAS FINAIS DE FORMATO

- Não inclua título principal "Guia de Entrevista" (o front end já adiciona)
- Comece direto na seção "## 1. Abertura da entrevista"
- Não use emojis fora dos blocos "🎯 O que observar"
- Use negritos com moderação, só pra destacar palavra-chave
- Português do Brasil
- **NÃO use hífens nem travessões em nenhum lugar do texto.** Use vírgula, parênteses, ou una as palavras. Substitua "passivo-agressivo" por "passivo agressivo", "C-level" por "C level", "soft-skill" por "soft skill", etc. Esta regra é absoluta.
- Tamanho alvo: 1200 a 2000 palavras
- NÃO invente novas perguntas para os perfis disfuncionais, use SEMPRE as do framework. Você pode trocar uma ou outra palavra para encaixar no cargo, mas NÃO PODE ALONGAR as perguntas. Elas foram redigidas curtas de propósito, para o entrevistador conseguir ler, memorizar e perguntar com naturalidade de conversa. Se você reescrever uma pergunta de 1 linha em 3 linhas, está errando o propósito da ferramenta. Mantenha curtas.`
}

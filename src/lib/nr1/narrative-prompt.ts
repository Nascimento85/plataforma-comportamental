// ============================================================
// Construtor do prompt para narrativa consultiva do relatorio NR-1
// Gera um relatorio executivo no padrao "consultor senior de
// psicologia organizacional" pronto para entregar a diretoria.
// ============================================================

import type { NR1AgregadoSetor } from './types'

const DIM_LABEL: Record<string, string> = {
  DEMANDAS_PSICOLOGICAS:      'Demandas Psicológicas',
  ORGANIZACAO_TRABALHO:       'Organização do Trabalho',
  RELACOES_LIDERANCA:         'Relações e Liderança',
  INTERFACE_TRABALHO_FAMILIA: 'Trabalho-Família',
  SAUDE_BEM_ESTAR:            'Saúde e Bem-Estar',
  COMPORTAMENTOS_OFENSIVOS:   'Comportamentos Ofensivos',
}

const DISC_DESCRICAO: Record<string, string> = {
  D: 'D (Dominância): perfil orientado a resultado, decisões rápidas, baixa tolerância a obstáculos. Sob estresse: impaciência, irritabilidade, microgestão.',
  I: 'I (Influência): perfil orientado a relações, comunicativo, otimista. Sob estresse: dispersão, dificuldade de foco, evasão de conflitos.',
  S: 'S (Estabilidade): perfil orientado a consistência, leal, paciente, valoriza segurança. Sob estresse: resistência passiva a mudanças, silêncio, somatizações.',
  C: 'C (Conformidade/Cautela): perfil analítico, detalhista, valoriza precisão e regras. Sob estresse: perfeccionismo defensivo, ansiedade por imprevisibilidade, retraimento, saída silenciosa.',
}

/**
 * Constroi o prompt completo para gerar a narrativa consultiva
 * de um setor especifico, incorporando os scores agregados
 * + perfil DISC dominante + recomendacoes automaticas previas.
 */
export function buildNarrativePrompt(setor: NR1AgregadoSetor): string {
  const disc      = setor.perfilDiscDominante ?? null
  const discInfo  = disc ? DISC_DESCRICAO[disc] : null

  // Tabela compacta de dimensoes COPSOQ para o prompt
  const copsoqLines = setor.copsoq.dimensoes
    .map(d => `  - ${DIM_LABEL[d.dimensao] ?? d.dimensao}: ${d.mediaPontuacao} (${riscoLabel(d.risco)})`)
    .join('\n')

  // Distribuicao Karasek
  const k = setor.karasek
  const dist = k.distribuicao
  const distLines = [
    `  - Alta Tensão: ${dist.ALTA_TENSAO ?? 0}%`,
    `  - Ativo: ${dist.ATIVO ?? 0}%`,
    `  - Passivo: ${dist.PASSIVO ?? 0}%`,
    `  - Baixa Tensão: ${dist.BAIXA_TENSAO ?? 0}%`,
  ].join('\n')

  return `Você é um Consultor Sênior de Psicologia Organizacional, Especialista em Saúde Mental no Trabalho e Analista de Dados de RH, com formação em Business Intelligence e atuação em consultorias top-tier (Mercer, Korn Ferry, EY People Advisory). Você está produzindo o Relatório Executivo NR-1 da plataforma Psique — Mapa Comportamental, que será apresentado diretamente à diretoria de uma empresa cliente.

DADOS DO DIAGNÓSTICO (setor avaliado):

Setor: ${setor.setorNome}
Total de respondentes: ${setor.totalRespondentes}
Perfil DISC dominante do setor: ${disc ? `${disc} — ${discInfo}` : 'não informado'}

KARASEK (Demanda × Controle):
  - Controle médio: ${k.mediaControle} (escala 4-16)
  - Demanda média: ${k.mediaDemanda} (escala 5-20)
  - Classificação global: ${riscoLabel(k.risco)}
  - Quadrante dominante: ${k.quadranteDominante.replace('_', ' ')}
  - Distribuição entre quadrantes:
${distLines}

ERI (Effort-Reward Imbalance — Siegrist):
  - Razão Esforço/Recompensa média: ${setor.eri.razaoMedia.toFixed(2)}
  - % de respondentes com razão acima de 1.0: ${setor.eri.pctAcimaUm}%
  - Classificação global: ${riscoLabel(setor.eri.risco)}

COPSOQ II (Copenhagen Psychosocial Questionnaire):
  - Risco global: ${riscoLabel(setor.copsoq.riscoGlobal)}
  - Dimensões avaliadas (escala 0-100; 0-33 baixo, 34-66 moderado, 67-100 alto):
${copsoqLines}

INSTRUÇÕES DE GERAÇÃO

Produza um relatório executivo em MARKDOWN, em PORTUGUÊS DO BRASIL, com tom formal-consultivo, focado em Business Intelligence e Psicologia Organizacional, estruturado RIGOROSAMENTE nas 4 seções abaixo. Use negritos e tabelas quando agregar valor. NÃO use emojis. NÃO repita os dados crus em forma de lista; transforme-os em interpretação.

## 1. Introdução e Metodologia

Explique de forma clara, em parágrafos, o que cada um dos três modelos mede e o significado dos resultados específicos deste setor:
- Modelo de Karasek (Demanda × Controle): explique o que significam os valores específicos de Controle e Demanda observados, o que é o quadrante dominante e o que a porcentagem em Alta Tensão sinaliza em risco humano concreto.
- Modelo ERI (Siegrist): explique o conceito de desequilíbrio Esforço-Recompensa, analise a razão média observada, e dê leitura empresarial do percentual com razão acima de 1.0 citando estudos seminais (Siegrist 1996, 2014).
- COPSOQ II: explique brevemente a origem do instrumento (NRCWE Dinamarca) e analise individualmente CADA uma das dimensões avaliadas, destacando as que estão no terço superior do moderado e principalmente as que cruzaram o limiar de risco alto (>=67).

Inclua ao final desta seção UM PARÁGRAFO específico sobre o cruzamento entre o perfil DISC dominante do setor e os achados psicossociais, explicando como este perfil reage tipicamente ao padrão de risco observado (ex: setor C dominante reage a desorganização do trabalho com perfeccionismo defensivo e saída silenciosa).

## 2. Raio-X dos Indicadores

Apresente uma visualização em texto/markdown dos indicadores de risco. Use:
- Uma tabela markdown com colunas: Indicador | Valor | Classificação
- Barras de progresso horizontais em ASCII (caracteres unicode tipo ▓ e ░) para representar visualmente os scores das dimensões COPSOQ, destacando as que estão em risco alto

## 3. Matriz de Riscos Empresariais (O Custo de Não Agir)

Apresente uma análise contundente, baseada em evidência, dos riscos de NÃO agir sobre esses indicadores. Divida em 3 subseções:
- Riscos Operacionais (horizonte 0-6 meses): queda de produtividade, erros por fadiga, absenteísmo, retrabalho, perda de talento.
- Riscos Jurídicos e de Compliance (horizonte 0-24 meses): cite explicitamente a NR-1 atualizada (vigor agosto/2025) e a multa por item descumprido; nexo causal trabalhista; passivo latente de indenizações; auditoria do MTE; CID-11 burnout como síndrome ocupacional.
- Riscos de Clima, Cultura e Marca Empregadora (horizonte 6-18 meses): contágio organizacional, demissão silenciosa, perda de talento C-level, exposição em Glassdoor/Indeed.

Adapte os valores e exemplos à severidade real do setor analisado (não exagere se o risco for moderado; não minimize se for alto).

## 4. Plano de Ação Estratégico

Desenhe um plano de ação organizado em PILARES TEMÁTICOS (escolha 2 a 3 pilares baseados nas dimensões com maior risco no diagnóstico). Para CADA pilar, apresente 1 a 2 ações concretas no formato:

### Ação X.Y: [Título acionável da iniciativa]
**O que fazer:** descrição prática e detalhada da iniciativa, com nomes de ritos, frequência, duração, formato.
**Por que fazer:** fundamentação teórica/científica (cite autores ou modelos quando aplicável: Bakker & Demerouti JD-R, Hertzberg motivators, Lieberman neuro-social, etc.) E adapte ao perfil DISC dominante do setor.
**Como medir:** métricas concretas com meta numérica e prazo.

Encerre o relatório com uma "Síntese Executiva para a Diretoria" de no máximo 3 bullets, contendo as 3 mensagens-chave que a diretoria precisa internalizar.

REGRAS FINAIS DE ESTILO

- Não inclua um título principal "Relatório Executivo" no início (o front-end já o adiciona).
- Comece direto na seção "## 1. Introdução e Metodologia".
- Não use emojis.
- Use negritos com moderação para destacar números-chave e termos técnicos.
- Não invente dados que não foram fornecidos. Se um dado não foi informado (ex: DISC não disponível), reconheça e adapte.
- Mantenha o relatório entre 1500 e 2500 palavras.
- Português do Brasil, sem hífens longos (use vírgulas ou parênteses no lugar).
`
}

function riscoLabel(r: string): string {
  if (r === 'ALTO') return 'Alto'
  if (r === 'MODERADO') return 'Moderado'
  if (r === 'BAIXO') return 'Baixo'
  return r
}

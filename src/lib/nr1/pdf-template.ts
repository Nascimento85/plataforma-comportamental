// ============================================================
// Template HTML do PDF executivo NR-1
// Gera um documento standalone com CSS inline otimizado para A4.
// Usado pelo Puppeteer + @sparticuz/chromium no endpoint
// /api/nr1/coletas/[id]/relatorio/pdf
// ============================================================

import { marked } from 'marked'

// ── Tipos do conteudo salvo em NR1Relatorio.content ─────────

interface SetorAgregado {
  setorId:             string
  setorNome:           string
  totalRespondentes:   number
  karasek: {
    mediaControle:      number
    mediaDemanda:       number
    quadranteDominante: string
    distribuicao:       Record<string, number>
    risco:              string
  }
  eri: { razaoMedia: number; pctAcimaUm: number; risco: string }
  copsoq: {
    dimensoes:    Array<{ dimensao: string; mediaPontuacao: number; risco: string }>
    riscoGlobal:  string
  }
  perfilDiscDominante?: string | null
  recomendacoes:        Array<{ prioridade: string; area: string; acao: string; porque: string }>
  narrativa?:           string | null
}

export interface RelatorioPdfContent {
  geradoEm:                string
  coletaNome:              string
  totalRespondentes:       number
  setoresAvaliados:        number
  minRespondentesPorSetor: number
  setores:                 SetorAgregado[]
}

// ── Labels e helpers ────────────────────────────────────────

const DIM_LABEL: Record<string, string> = {
  DEMANDAS_PSICOLOGICAS:      'Demandas Psicológicas',
  ORGANIZACAO_TRABALHO:       'Organização do Trabalho',
  RELACOES_LIDERANCA:         'Relações e Liderança',
  INTERFACE_TRABALHO_FAMILIA: 'Trabalho-Família',
  SAUDE_BEM_ESTAR:            'Saúde e Bem-Estar',
  COMPORTAMENTOS_OFENSIVOS:   'Comportamentos Ofensivos',
}

const RISCO_COR: Record<string, { bg: string; color: string; label: string }> = {
  BAIXO:    { bg: '#e6efe7', color: '#3d6b40', label: 'Baixo'    },
  MODERADO: { bg: '#fbeed8', color: '#7e4f1a', label: 'Moderado' },
  ALTO:     { bg: '#f3d8cf', color: '#8a3a1f', label: 'Alto'     },
}

function riscoBadge(risco: string): string {
  const c = RISCO_COR[risco] ?? RISCO_COR.BAIXO
  return `<span style="display:inline-block;padding:2px 10px;border-radius:99px;background:${c.bg};color:${c.color};font-size:10pt;font-weight:700;">${c.label}</span>`
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] ?? c))
}

function markdownToHtml(md: string): string {
  // Configura marked sem syntax highlight para não inflar o bundle
  marked.setOptions({ gfm: true, breaks: false })
  return marked.parse(md) as string
}

// ── CSS embutido (otimizado para Puppeteer + A4) ────────────

const CSS = `
* { box-sizing: border-box; margin: 0; padding: 0; }
@page { size: A4; margin: 18mm 14mm 22mm 14mm; }
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
  color: #1f1c18;
  font-size: 10.5pt;
  line-height: 1.5;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}

/* ── Capa ── */
.cover { page-break-after: always; padding-top: 30mm; }
.cover-eyebrow { font-size: 9.5pt; letter-spacing: 0.18em; text-transform: uppercase; font-weight: 700; color: #8a5c1e; margin-bottom: 12px; }
.cover-title { font-family: Georgia, 'Times New Roman', serif; font-size: 36pt; font-weight: 600; line-height: 1.1; color: #1c1a17; margin-bottom: 8px; }
.cover-subtitle { font-family: Georgia, 'Times New Roman', serif; font-size: 18pt; font-style: italic; color: #c4633a; margin-bottom: 36px; }
.cover-collection { font-size: 13pt; font-weight: 600; color: #1f1c18; margin-bottom: 24px; }
.cover-meta {
  margin-top: 36px;
  padding: 20px 22px;
  border-radius: 12px;
  background: #faf5ec;
  border: 1px solid #e8d9b2;
}
.cover-meta-row { display: flex; padding: 6px 0; font-size: 10.5pt; }
.cover-meta-row + .cover-meta-row { border-top: 1px dashed #e8d9b2; }
.cover-meta-label { width: 42%; font-weight: 600; color: #5b4928; }
.cover-meta-value { flex: 1; color: #1f1c18; }
.cover-footer {
  position: fixed; bottom: 20mm; left: 14mm; right: 14mm;
  font-size: 8.5pt; color: #6e645a; font-style: italic; line-height: 1.4;
  border-top: 1px solid #e8d9b2; padding-top: 10px;
}

/* ── Conteudo ── */
.section { page-break-inside: avoid; margin-bottom: 22px; }
h1.h-section {
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 22pt; font-weight: 600; color: #1c1a17;
  border-bottom: 2px solid rgba(196,99,58,0.35);
  padding-bottom: 8px; margin-bottom: 16px;
  page-break-after: avoid;
}
h2.h-setor {
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 16pt; font-weight: 600; color: #1c1a17;
  margin-top: 18px; margin-bottom: 10px;
  page-break-after: avoid;
}
.setor-meta { font-size: 10pt; color: #6e645a; font-weight: 500; margin-bottom: 14px; }
.setor-meta strong { color: #1f1c18; }

/* Grid 3 cards de risco */
.risco-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-bottom: 14px; page-break-inside: avoid; }
.risco-card { padding: 10px 12px; border-radius: 10px; }
.risco-card .label { font-size: 8.5pt; letter-spacing: 0.12em; text-transform: uppercase; font-weight: 700; opacity: 0.85; }
.risco-card .nivel { font-size: 14pt; font-weight: 700; margin-top: 2px; }
.risco-card .detail { font-size: 9.5pt; margin-top: 4px; opacity: 0.85; line-height: 1.35; }

/* COPSOQ heatmap */
.copsoq-heatmap { margin-top: 4px; page-break-inside: avoid; }
.copsoq-heatmap-title { font-size: 8.5pt; letter-spacing: 0.12em; text-transform: uppercase; font-weight: 700; color: #6e645a; margin-bottom: 6px; }
.copsoq-row { display: flex; align-items: center; gap: 8px; padding: 4px 0; font-size: 9.5pt; }
.copsoq-row + .copsoq-row { border-top: 1px solid #f0e8d9; }
.copsoq-row .dim { flex: 1; font-weight: 600; color: #1f1c18; }
.copsoq-row .val { width: 40px; text-align: right; font-weight: 700; color: #1f1c18; }
.copsoq-row .badge { width: 80px; text-align: center; }

/* Recomendacoes rapidas */
.recs { margin-top: 14px; }
.recs-title { font-size: 8.5pt; letter-spacing: 0.12em; text-transform: uppercase; font-weight: 700; color: #8a3a1f; margin-bottom: 6px; }
.rec { display: flex; gap: 10px; padding: 8px 10px; border-radius: 8px; background: #f0eedf; margin-bottom: 6px; page-break-inside: avoid; }
.rec-prio { font-size: 8.5pt; font-weight: 700; padding: 2px 8px; border-radius: 99px; height: fit-content; flex-shrink: 0; }
.rec-prio.alta { background: #f3d8cf; color: #8a3a1f; }
.rec-prio.media { background: #fbeed8; color: #7e4f1a; }
.rec-area { font-size: 10pt; font-weight: 700; color: #1f1c18; }
.rec-acao { font-size: 9.5pt; color: #2c2620; margin-top: 1px; line-height: 1.4; }
.rec-porque { font-size: 9pt; color: #6e645a; font-style: italic; margin-top: 3px; }

/* Narrativa consultiva (markdown convertido) */
.narrative { margin-top: 22px; padding-top: 16px; border-top: 1px solid rgba(196,99,58,0.20); page-break-before: auto; }
.narrative-eyebrow { font-size: 9pt; letter-spacing: 0.16em; text-transform: uppercase; font-weight: 700; color: #8a3a1f; margin-bottom: 10px; }
.narrative h2 { font-family: Georgia, 'Times New Roman', serif; font-size: 14pt; color: #1c1a17; margin-top: 16px; margin-bottom: 8px; page-break-after: avoid; border-bottom: 1px solid rgba(196,99,58,0.20); padding-bottom: 4px; }
.narrative h3 { font-family: Georgia, 'Times New Roman', serif; font-size: 12pt; color: #1c1a17; margin-top: 12px; margin-bottom: 6px; page-break-after: avoid; }
.narrative p { font-size: 10.5pt; line-height: 1.55; margin-bottom: 8px; color: #1f1c18; orphans: 3; widows: 3; }
.narrative strong { font-weight: 700; color: #1c1a17; }
.narrative ul, .narrative ol { padding-left: 20px; margin-bottom: 8px; font-size: 10.5pt; }
.narrative ul li, .narrative ol li { margin-bottom: 3px; line-height: 1.5; }
.narrative table { width: 100%; border-collapse: collapse; font-size: 9.5pt; margin: 8px 0; page-break-inside: avoid; }
.narrative th { background: rgba(196,99,58,0.10); color: #1c1a17; font-weight: 700; text-align: left; padding: 6px 8px; border-bottom: 1px solid rgba(196,99,58,0.30); }
.narrative td { padding: 5px 8px; border-bottom: 1px solid rgba(196,99,58,0.10); color: #2c2620; }
.narrative blockquote { padding: 6px 12px; margin: 8px 0; background: rgba(196,99,58,0.05); border-left: 3px solid rgba(196,99,58,0.40); font-style: italic; color: #2c2620; border-radius: 0 6px 6px 0; }
.narrative code { font-family: ui-monospace, 'SF Mono', Menlo, monospace; font-size: 9pt; background: rgba(196,99,58,0.08); color: #8a3a1f; padding: 1px 5px; border-radius: 4px; }
.narrative pre { font-family: ui-monospace, 'SF Mono', Menlo, monospace; font-size: 8.5pt; line-height: 1.45; background: rgba(196,99,58,0.04); border: 1px solid rgba(196,99,58,0.15); padding: 10px 12px; border-radius: 8px; margin: 8px 0; overflow-x: auto; page-break-inside: avoid; }
.narrative pre code { background: transparent; padding: 0; color: inherit; }
`

// ── Render ───────────────────────────────────────────────────

function renderCapa(content: RelatorioPdfContent): string {
  const dataGeracao = new Date(content.geradoEm).toLocaleString('pt-BR', {
    day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit',
  })

  return `
  <section class="cover">
    <div class="cover-eyebrow">Diagnóstico Psicossocial · NR-1 + NR-17</div>
    <h1 class="cover-title">Relatório Executivo</h1>
    <p class="cover-subtitle">Saúde mental, organização do trabalho e compliance</p>
    <p class="cover-collection">${escapeHtml(content.coletaNome)}</p>

    <div class="cover-meta">
      <div class="cover-meta-row">
        <div class="cover-meta-label">Data de geração</div>
        <div class="cover-meta-value">${dataGeracao}</div>
      </div>
      <div class="cover-meta-row">
        <div class="cover-meta-label">Respondentes totais</div>
        <div class="cover-meta-value">${content.totalRespondentes}</div>
      </div>
      <div class="cover-meta-row">
        <div class="cover-meta-label">Setores avaliados</div>
        <div class="cover-meta-value">${content.setoresAvaliados} (mínimo de ${content.minRespondentesPorSetor} respondentes por setor)</div>
      </div>
      <div class="cover-meta-row">
        <div class="cover-meta-label">Instrumentos aplicados</div>
        <div class="cover-meta-value">Karasek (JCQ) · ERI Siegrist · COPSOQ II</div>
      </div>
    </div>

    <div class="cover-footer">
      Documento gerado pela plataforma Psique — Mapa Comportamental. Coleta anônima com mínimo de 5 respondentes por setor (compliance LGPD / CFP / NR-1). As respostas individuais não são acessíveis a nenhum administrador — apenas indicadores agregados.
    </div>
  </section>`
}

function renderSetor(s: SetorAgregado): string {
  const kPct = s.karasek.distribuicao.ALTA_TENSAO ?? 0
  const cardsRisco = `
    <div class="risco-grid">
      <div class="risco-card" style="background:${RISCO_COR[s.karasek.risco]?.bg ?? '#eee'}; color:${RISCO_COR[s.karasek.risco]?.color ?? '#333'};">
        <div class="label">Karasek (Tensão)</div>
        <div class="nivel">${RISCO_COR[s.karasek.risco]?.label ?? s.karasek.risco}</div>
        <div class="detail">Controle ${s.karasek.mediaControle} · Demanda ${s.karasek.mediaDemanda}<br/>${kPct}% em Alta Tensão</div>
      </div>
      <div class="risco-card" style="background:${RISCO_COR[s.eri.risco]?.bg ?? '#eee'}; color:${RISCO_COR[s.eri.risco]?.color ?? '#333'};">
        <div class="label">ERI (Esforço–Recompensa)</div>
        <div class="nivel">${RISCO_COR[s.eri.risco]?.label ?? s.eri.risco}</div>
        <div class="detail">Razão média ${s.eri.razaoMedia.toFixed(2)}<br/>${s.eri.pctAcimaUm}% acima de 1.0</div>
      </div>
      <div class="risco-card" style="background:${RISCO_COR[s.copsoq.riscoGlobal]?.bg ?? '#eee'}; color:${RISCO_COR[s.copsoq.riscoGlobal]?.color ?? '#333'};">
        <div class="label">COPSOQ Global</div>
        <div class="nivel">${RISCO_COR[s.copsoq.riscoGlobal]?.label ?? s.copsoq.riscoGlobal}</div>
        <div class="detail">${s.copsoq.dimensoes.length} dimensões avaliadas</div>
      </div>
    </div>`

  const heatmap = `
    <div class="copsoq-heatmap">
      <div class="copsoq-heatmap-title">COPSOQ por dimensão</div>
      ${s.copsoq.dimensoes.map(d => `
        <div class="copsoq-row">
          <span class="dim">${DIM_LABEL[d.dimensao] ?? d.dimensao}</span>
          <span class="val">${d.mediaPontuacao}</span>
          <span class="badge">${riscoBadge(d.risco)}</span>
        </div>
      `).join('')}
    </div>`

  const recs = s.recomendacoes.length > 0 ? `
    <div class="recs">
      <div class="recs-title">Recomendações rápidas</div>
      ${s.recomendacoes.map(r => `
        <div class="rec">
          <span class="rec-prio ${r.prioridade.toLowerCase() === 'alta' ? 'alta' : 'media'}">${escapeHtml(r.prioridade)}</span>
          <div>
            <div class="rec-area">${escapeHtml(r.area)}</div>
            <div class="rec-acao">${escapeHtml(r.acao)}</div>
            <div class="rec-porque">${escapeHtml(r.porque)}</div>
          </div>
        </div>
      `).join('')}
    </div>` : ''

  const narrative = s.narrativa
    ? `<div class="narrative">
         <div class="narrative-eyebrow">Análise consultiva completa</div>
         ${markdownToHtml(s.narrativa)}
       </div>`
    : ''

  const discLine = s.perfilDiscDominante
    ? `<span class="setor-meta">·</span> <strong>DISC ${s.perfilDiscDominante}</strong>`
    : ''

  return `
  <section class="section">
    <h2 class="h-setor">${escapeHtml(s.setorNome)}</h2>
    <div class="setor-meta"><strong>${s.totalRespondentes} respondentes</strong> ${discLine}</div>
    ${cardsRisco}
    ${heatmap}
    ${recs}
    ${narrative}
  </section>`
}

export function buildRelatorioPdfHtml(content: RelatorioPdfContent): string {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Relatório Executivo NR-1 — ${escapeHtml(content.coletaNome)}</title>
  <style>${CSS}</style>
</head>
<body>
  ${renderCapa(content)}

  <h1 class="h-section">Diagnóstico por setor</h1>
  ${content.setores.map(renderSetor).join('')}
</body>
</html>`
}

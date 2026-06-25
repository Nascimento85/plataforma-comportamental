// ============================================================
// Templates de impressao dedicados (tema dark sofisticado).
// Usados apenas no modo ?print=1 para gerar o PDF via Puppeteer.
// Tudo em estilo inline com cores explicitas: renderiza de forma
// deterministica, sem sofrer com o CSS global de impressao nem com
// a inconsistencia de tema dos componentes de tela.
// ============================================================
import React from 'react'

// ── Tokens do documento dark ────────────────────────────────
const INK      = '#f3ede0'   // titulos
const BODY     = '#b9c0cd'   // corpo
const MUTED    = '#8b93a3'   // secundario
const GOLD      = '#c9a84c'
const GOLD_LT   = '#e6c662'
const CARD_BG   = '#1b2030'
const CARD_BR   = '1px solid rgba(255,255,255,0.07)'

const card: React.CSSProperties = {
  background: CARD_BG,
  border: CARD_BR,
  borderRadius: 14,
  padding: '20px 24px',
  marginBottom: 16,
  pageBreakInside: 'avoid',
  breakInside: 'avoid',
}
const kicker: React.CSSProperties = {
  fontSize: 11, fontWeight: 700, letterSpacing: '2px',
  textTransform: 'uppercase', color: GOLD, margin: '0 0 12px',
}
const itemTitle: React.CSSProperties = { fontSize: 13.5, fontWeight: 700, color: INK, margin: '0 0 3px' }
const itemBody:  React.CSSProperties = { fontSize: 12, lineHeight: 1.65, color: BODY, margin: 0 }

// ============================================================
// BIG FIVE
// ============================================================
export function BigFivePrintReport({ result }: { result: Record<string, unknown> }) {
  const r = result as {
    percentages: Record<'EXT' | 'AMB' | 'CON' | 'EST' | 'ABE', number>
    scoresAvg:   Record<'EXT' | 'AMB' | 'CON' | 'EST' | 'ABE', number>
    archetypeReport: {
      emoji: string; nome: string; combinacao: string; visaoGeral: string
      superpoderes: { titulo: string; descricao: string }[]
      pontosCegos:  { titulo: string; descricao: string }[]
      planoDeAcao:  { titulo: string; descricao: string }[]
      brilhaEm: string
    }
  }

  const LABELS: Record<string, string> = {
    EXT: 'Influência & Comunicação',
    AMB: 'Gestão de Pessoas & Empatia',
    CON: 'Foco em Resultados & Execução',
    EST: 'Estabilidade Emocional',
    ABE: 'Inovação & Visão Estratégica',
  }
  const COLORS: Record<string, string> = {
    EXT: '#d97a4f', AMB: '#86b58a', CON: '#6f86c9', EST: '#d8b95c', ABE: '#cf8b83',
  }
  const factors: Array<'EXT' | 'AMB' | 'CON' | 'EST' | 'ABE'> = ['EXT', 'AMB', 'CON', 'EST', 'ABE']
  const ordered = factors.slice().sort((x, y) => r.percentages[y] - r.percentages[x])
  const a = r.archetypeReport

  return (
    <div style={{ padding: '26px 40px 44px' }}>
      {/* Arquetipo */}
      <div style={{ textAlign: 'center', marginBottom: 22 }}>
        <div style={{ fontSize: 38, marginBottom: 4 }}>{a.emoji}</div>
        <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 25, fontWeight: 600, color: INK, margin: '0 0 4px' }}>{a.nome}</h2>
        <p style={{ fontSize: 13, color: '#9db4e8', margin: 0 }}>{a.combinacao}</p>
      </div>

      {/* Radar */}
      <div style={card}>
        <p style={kicker}>Radar dos 5 fatores de liderança</p>
        {ordered.map((f) => (
          <div key={f} style={{ marginBottom: 11 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 5 }}>
              <span style={{ fontWeight: 600, color: '#cfd5e0' }}>{LABELS[f]}</span>
              <span style={{ color: MUTED }}>{r.percentages[f]}% · média {r.scoresAvg[f]?.toFixed(2)}</span>
            </div>
            <div style={{ height: 8, background: 'rgba(255,255,255,0.08)', borderRadius: 5, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${r.percentages[f]}%`, background: COLORS[f], borderRadius: 5 }} />
            </div>
          </div>
        ))}
      </div>

      {/* Visao geral */}
      <div style={card}>
        <p style={kicker}>Visão geral do seu perfil</p>
        <p style={{ ...itemBody, fontSize: 12.5 }}>{a.visaoGeral}</p>
      </div>

      {/* Superpoderes */}
      <div style={card}>
        <p style={{ ...kicker, color: '#74d6a0' }}>Seus maiores superpoderes</p>
        {a.superpoderes.map((sp, i) => (
          <div key={i} style={{ marginBottom: i === a.superpoderes.length - 1 ? 0 : 12 }}>
            <p style={itemTitle}>{sp.titulo}</p>
            <p style={itemBody}>{sp.descricao}</p>
          </div>
        ))}
      </div>

      {/* Pontos cegos */}
      <div style={card}>
        <p style={{ ...kicker, color: '#f0a59e' }}>Seus pontos cegos</p>
        {a.pontosCegos.map((pc, i) => (
          <div key={i} style={{ marginBottom: i === a.pontosCegos.length - 1 ? 0 : 12 }}>
            <p style={itemTitle}>{pc.titulo}</p>
            <p style={itemBody}>{pc.descricao}</p>
          </div>
        ))}
      </div>

      {/* Plano de acao */}
      <div style={{ ...card, background: '#1e2740', borderLeft: `3px solid ${GOLD}` }}>
        <p style={{ ...kicker, color: GOLD_LT }}>Plano de ação para o próximo trimestre</p>
        {a.planoDeAcao.map((pa, i) => (
          <div key={i} style={{ marginBottom: i === a.planoDeAcao.length - 1 ? 0 : 12 }}>
            <p style={itemTitle}>{i + 1}. {pa.titulo}</p>
            <p style={itemBody}>{pa.descricao}</p>
          </div>
        ))}
      </div>

      {/* Brilha em */}
      <div style={{ ...card, background: 'rgba(201,168,76,0.10)', border: '1px solid rgba(201,168,76,0.25)', marginBottom: 0 }}>
        <p style={{ ...itemBody, color: '#e7dcc4' }}>
          <strong style={{ color: INK }}>Onde este arquétipo brilha:</strong> {a.brilhaEm}
        </p>
      </div>
    </div>
  )
}

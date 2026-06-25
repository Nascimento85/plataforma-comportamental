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
        <div style={{ width: 44, height: 3, background: GOLD, borderRadius: 2, margin: '0 auto 14px' }} />
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

// ============================================================
// Helpers compartilhados (tema dark)
// ============================================================
const TRACK = 'rgba(255,255,255,0.08)'

function PrintBar({ label, pct, color, bold }: { label: string; pct: number; color: string; bold?: boolean }) {
  const w = Math.max(1, Math.min(100, Math.round(pct)))
  return (
    <div style={{ marginBottom: 11 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 5 }}>
        <span style={{ fontWeight: bold ? 700 : 600, color: bold ? INK : '#cfd5e0' }}>{label}</span>
        <span style={{ color: MUTED }}>{w}%</span>
      </div>
      <div style={{ height: 8, background: TRACK, borderRadius: 5, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${w}%`, background: color, borderRadius: 5 }} />
      </div>
    </div>
  )
}

function PrintHero({ badge, badgeColor, kickerText, title, taglineColor, tagline, desc, round }: {
  badge: string; badgeColor: string; kickerText: string; title: string
  taglineColor?: string; tagline?: string; desc?: string; round?: boolean
}) {
  return (
    <div style={{ ...card, display: 'flex', alignItems: 'flex-start', gap: 18 }}>
      <div style={{
        minWidth: 64, minHeight: 64, width: 64, height: 64, borderRadius: round ? '50%' : 16,
        background: badgeColor, color: '#fff', display: 'flex', alignItems: 'center',
        justifyContent: 'center', fontSize: 22, fontWeight: 700, flexShrink: 0,
      }}>
        {badge}
      </div>
      <div>
        <p style={{ ...kicker, margin: '0 0 6px' }}>{kickerText}</p>
        <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 22, fontWeight: 600, color: INK, margin: '0 0 3px' }}>{title}</h2>
        {tagline && <p style={{ fontSize: 13, fontWeight: 600, fontStyle: 'italic', color: taglineColor ?? GOLD_LT, margin: '2px 0 0' }}>{tagline}</p>}
        {desc && <p style={{ ...itemBody, marginTop: 8 }}>{desc}</p>}
      </div>
    </div>
  )
}

function PrintBullets({ items, color }: { items: string[]; color: string }) {
  return (
    <div>
      {items.map((it, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 9, marginBottom: i === items.length - 1 ? 0 : 9 }}>
          <span style={{ color, fontWeight: 700, fontSize: 12, lineHeight: 1.6, flexShrink: 0 }}>•</span>
          <span style={{ ...itemBody }}>{it}</span>
        </div>
      ))}
    </div>
  )
}

function PrintTags({ items, color }: { items: string[]; color: string }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      {items.map((it, i) => (
        <span key={i} style={{
          fontSize: 11, fontWeight: 500, padding: '4px 11px', borderRadius: 999,
          background: 'rgba(255,255,255,0.05)', color, border: `1px solid ${color}40`,
        }}>
          {it}
        </span>
      ))}
    </div>
  )
}

function PrintInfoBox({ label, text, color }: { label: string; text: string; color: string }) {
  return (
    <div style={{ ...card, marginBottom: 0, background: 'rgba(255,255,255,0.03)', borderLeft: `3px solid ${color}` }}>
      <p style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color, margin: '0 0 6px' }}>{label}</p>
      <p style={{ ...itemBody }}>{text}</p>
    </div>
  )
}

function PrintGrid2({ children }: { children: React.ReactNode }) {
  return <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>{children}</div>
}

const PT_ARCHETYPE: Record<string, string> = {
  MAGICIAN: 'MÁGICO', LOVER: 'AMANTE', HERO: 'HERÓI', REBEL: 'REBELDE', EXPLORER: 'EXPLORADOR',
  RULER: 'GOVERNANTE', CREATOR: 'CRIADOR', CAREGIVER: 'CUIDADOR', SAGE: 'SÁBIO', INNOCENT: 'INOCENTE',
  JESTER: 'BOBO DA CORTE', ORPHAN: 'ORFÃO',
}
const PT_FEM_ARCHETYPE: Record<string, string> = {
  MAIDEN: 'DONZELA', MOTHER: 'MÃE', HUNTRESS: 'CAÇADORA', SOVEREIGN: 'SOBERANA',
  LOVER: 'AMANTE', WISE: 'SÁBIA', CRONE: 'ANCIÃ',
}

// ============================================================
// DISC
// ============================================================
export function DiscPrintReport({ result }: { result: Record<string, unknown> }) {
  const r = result as {
    predominant: string; secondary: string; combination: string
    percentages: { D: number; I: number; S: number; C: number }
    report: {
      name: string; tagline: string; description?: string; characteristics: string[]
      strengths: string[]; improvements: string[]; values: string; fear: string
      decisionStyle: string; idealEnvironment: string[]; teamValue: string[]
      underPressure: string[]; motivations: string[]
    }
  }
  const C: Record<string, string> = { D: '#ef6a6a', I: '#f0b24b', S: '#5fc77f', C: '#6f9ee8' }
  const N: Record<string, string> = { D: 'Dominante', I: 'Influente', S: 'Estável', C: 'Cauteloso' }
  const pred = r.predominant

  return (
    <div style={{ padding: '26px 40px 44px' }}>
      <PrintHero badge={pred} badgeColor={C[pred]} kickerText={`Perfil ${r.combination}`}
        title={r.report.name} tagline={`"${r.report.tagline}"`} taglineColor={C[pred]} desc={r.report.description} />

      <div style={card}>
        <p style={kicker}>Distribuição do perfil DISC</p>
        {(['D', 'I', 'S', 'C'] as const).map((p) => (
          <PrintBar key={p} label={`${p} — ${N[p]}`} pct={Math.round((r.percentages[p] ?? 0) * 100)} color={C[p]} bold={p === pred} />
        ))}
      </div>

      <PrintGrid2>
        <PrintInfoBox label="Valor central" text={r.report.values} color="#5fc77f" />
        <PrintInfoBox label="Maior receio" text={r.report.fear} color="#ef6a6a" />
      </PrintGrid2>
      <div style={{ marginBottom: 16 }}><PrintInfoBox label="Estilo de decisão" text={r.report.decisionStyle} color="#6f9ee8" /></div>

      <div style={card}>
        <p style={kicker}>Características principais</p>
        <PrintTags items={r.report.characteristics} color="#9db4e8" />
      </div>

      <div style={card}>
        <p style={{ ...kicker, color: '#74d6a0' }}>Pontos fortes</p>
        <PrintBullets items={r.report.strengths} color="#74d6a0" />
      </div>
      <div style={card}>
        <p style={{ ...kicker, color: '#f0a59e' }}>Pontos de desenvolvimento</p>
        <PrintBullets items={r.report.improvements} color="#f0a59e" />
      </div>

      <div style={card}>
        <p style={kicker}>Ambiente que favorece este perfil</p>
        <PrintTags items={r.report.idealEnvironment} color="#74d6a0" />
      </div>

      <div style={card}>
        <p style={kicker}>Contribuição para a equipe</p>
        <PrintTags items={r.report.teamValue} color="#9db4e8" />
      </div>

      <div style={{ ...card, background: 'rgba(239,106,106,0.10)', border: '1px solid rgba(239,106,106,0.25)' }}>
        <p style={{ ...kicker, color: '#f0a59e' }}>Comportamento sob pressão</p>
        <PrintTags items={r.report.underPressure} color="#f0a59e" />
      </div>

      <div style={{ ...card, marginBottom: 0 }}>
        <p style={kicker}>O que motiva este perfil</p>
        <PrintBullets items={r.report.motivations} color="#9db4e8" />
      </div>
    </div>
  )
}

// ============================================================
// MBTI
// ============================================================
export function MbtiPrintReport({ result }: { result: Record<string, unknown> }) {
  const r = result as {
    type: string
    scores: Record<string, number>
    report: { name: string; tagline: string; description: string; strengths: string[]; weaknesses: string[]; careers: string[] }
  }
  const BRAND = '#7d93e0'
  const dims = [
    { label: 'Extraversão (E) vs Introversão (I)', poleA: 'E', poleB: 'I', maxA: 30, maxB: 30 },
    { label: 'Sensação (S) vs Intuição (N)', poleA: 'S', poleB: 'N', maxA: 54, maxB: 54 },
    { label: 'Pensamento (T) vs Sentimento (F)', poleA: 'T', poleB: 'F', maxA: 54, maxB: 54 },
    { label: 'Julgamento (J) vs Percepção (P)', poleA: 'J', poleB: 'P', maxA: 48, maxB: 48 },
  ]

  return (
    <div style={{ padding: '26px 40px 44px' }}>
      <PrintHero badge={r.type} badgeColor={BRAND} kickerText="Tipo MBTI"
        title={r.report.name} tagline={`"${r.report.tagline}"`} taglineColor={BRAND} />

      <div style={card}>
        <p style={kicker}>Sobre este perfil</p>
        <p style={{ ...itemBody, fontSize: 12.5 }}>{r.report.description}</p>
      </div>

      <div style={card}>
        <p style={kicker}>Análise por dimensão</p>
        {dims.map((dim) => {
          const pctA = Math.round(((r.scores[dim.poleA] ?? 0) / dim.maxA) * 100)
          const pctB = Math.round(((r.scores[dim.poleB] ?? 0) / dim.maxB) * 100)
          const winA = pctA >= pctB
          return (
            <div key={dim.label} style={{ marginBottom: 16 }}>
              <p style={{ fontSize: 11, fontWeight: 600, color: MUTED, margin: '0 0 8px' }}>{dim.label}</p>
              <PrintBar label={`${dim.poleA} — ${winA ? 'predominante' : 'secundário'}`} pct={pctA} color={BRAND} bold={winA} />
              <PrintBar label={`${dim.poleB} — ${!winA ? 'predominante' : 'secundário'}`} pct={pctB} color="#aab8ec" bold={!winA} />
            </div>
          )
        })}
      </div>

      <div style={card}>
        <p style={{ ...kicker, color: '#74d6a0' }}>Pontos fortes</p>
        <PrintBullets items={r.report.strengths} color="#74d6a0" />
      </div>
      <div style={card}>
        <p style={{ ...kicker, color: '#f0a59e' }}>Pontos de desenvolvimento</p>
        <PrintBullets items={r.report.weaknesses} color="#f0a59e" />
      </div>

      <div style={{ ...card, marginBottom: 0 }}>
        <p style={kicker}>Carreiras e funções ideais</p>
        <PrintTags items={r.report.careers} color={BRAND} />
      </div>
    </div>
  )
}

// ============================================================
// ENEAGRAMA
// ============================================================
export function EnneagramPrintReport({ result }: { result: Record<string, unknown> }) {
  const r = result as {
    predominant: number; secondary: number
    scores: Record<string, number>
    report: {
      name: string; altName: string; tagline: string; motivation: string; basicFear: string
      focusOfAttention: string; strengths: string[]; challenges: string[]
      wings: { wing: string; description: string }[]; development: string[]
    }
    interpretation: Record<string, string>
  }
  const TYPE_COLORS: Record<number, string> = {
    1: '#ef6a6a', 2: '#f0b24b', 3: '#e6c662', 4: '#a78bfa', 5: '#4dd0e1',
    6: '#6f9ee8', 7: '#f9a05c', 8: '#ef6a6a', 9: '#5fc77f',
  }
  const col = TYPE_COLORS[r.predominant] ?? GOLD

  return (
    <div style={{ padding: '26px 40px 44px' }}>
      <PrintHero badge={String(r.predominant)} badgeColor={col} round kickerText={`Tipo ${r.predominant} · ${r.report.altName}`}
        title={r.report.name} tagline={r.report.tagline} taglineColor={col} />

      <div style={card}>
        <p style={kicker}>Interpretação</p>
        <p style={{ ...itemBody, fontSize: 12.5 }}>{r.interpretation[String(r.predominant)]}</p>
      </div>

      <PrintGrid2>
        <PrintInfoBox label="Motivação central" text={r.report.motivation} color="#5fc77f" />
        <PrintInfoBox label="Medo básico" text={r.report.basicFear} color="#ef6a6a" />
      </PrintGrid2>

      <div style={card}>
        <p style={kicker}>Foco de atenção</p>
        <p style={{ ...itemBody }}>{r.report.focusOfAttention}</p>
      </div>

      <div style={card}>
        <p style={kicker}>Pontuação por tipo (máx. 75 pts)</p>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((t) => (
          <PrintBar key={t}
            label={`Tipo ${t}${t === r.predominant ? ` — ${r.report.name}` : ''}`}
            pct={((r.scores[String(t)] ?? 0) / 75) * 100}
            color={t === r.predominant ? col : 'rgba(255,255,255,0.25)'}
            bold={t === r.predominant} />
        ))}
      </div>

      <div style={card}>
        <p style={{ ...kicker, color: '#74d6a0' }}>Pontos fortes</p>
        <PrintBullets items={r.report.strengths} color="#74d6a0" />
      </div>
      <div style={card}>
        <p style={{ ...kicker, color: '#f0a59e' }}>Desafios e desenvolvimento</p>
        <PrintBullets items={r.report.challenges} color="#f0a59e" />
      </div>

      <div style={card}>
        <p style={kicker}>Asas — influências secundárias</p>
        {r.report.wings.map((w, i) => (
          <div key={i} style={{ marginBottom: i === r.report.wings.length - 1 ? 0 : 10, background: 'rgba(167,139,250,0.10)', border: '1px solid rgba(167,139,250,0.25)', borderRadius: 10, padding: '10px 14px' }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: '#c4b5fd', margin: '0 0 4px' }}>Tipo {w.wing}</p>
            <p style={{ ...itemBody }}>{w.description}</p>
          </div>
        ))}
      </div>

      <div style={{ ...card, marginBottom: 0 }}>
        <p style={kicker}>Caminhos de desenvolvimento</p>
        <PrintBullets items={r.report.development} color={col} />
      </div>
    </div>
  )
}

// ============================================================
// TEMPERAMENTOS
// ============================================================
export function TemperamentPrintReport({ result }: { result: Record<string, unknown> }) {
  const r = result as {
    primaryType: string; secondaryType: string
    profile: { name: string; title: string; description: string; strengths: string[]; challenges: string[]; workStyle: string; communication: string; idealRoles: string[] }
    secondaryProfile: { name: string; title: string; description: string }
    interpretation: string
    percentages: Record<string, number>
  }
  const TC: Record<string, string> = {
    COLERICO: '#ef6a6a', SANGUINEO: '#f0b24b', MELANCOLICO: '#a78bfa', FLEUMATICO: '#5fc77f',
  }
  const TL: Record<string, string> = {
    COLERICO: 'Colérico', SANGUINEO: 'Sanguíneo', MELANCOLICO: 'Melancólico', FLEUMATICO: 'Fleumático',
  }
  const pc = TC[r.primaryType] ?? GOLD
  const sc = TC[r.secondaryType] ?? '#9aa3b2'

  return (
    <div style={{ padding: '26px 40px 44px' }}>
      <PrintHero badge={r.profile.name.charAt(0)} badgeColor={pc} round
        kickerText={`${r.profile.name} · Secundário: ${r.secondaryProfile.name}`}
        title={r.profile.title} desc={r.interpretation} />

      <div style={card}>
        <p style={kicker}>Distribuição dos temperamentos</p>
        {Object.entries(r.percentages).sort(([, a], [, b]) => b - a).map(([type, pct]) => (
          <PrintBar key={type} label={TL[type] ?? type} pct={pct} color={TC[type] ?? '#9aa3b2'} bold={type === r.primaryType} />
        ))}
      </div>

      <div style={card}>
        <p style={kicker}>Descrição do perfil</p>
        <p style={{ ...itemBody, fontSize: 12.5 }}>{r.profile.description}</p>
      </div>

      <div style={card}>
        <p style={{ ...kicker, color: '#74d6a0' }}>Pontos fortes</p>
        <PrintBullets items={r.profile.strengths} color="#74d6a0" />
      </div>
      <div style={card}>
        <p style={{ ...kicker, color: '#f0a59e' }}>Desafios e desenvolvimento</p>
        <PrintBullets items={r.profile.challenges} color="#f0a59e" />
      </div>

      <PrintGrid2>
        <PrintInfoBox label="Estilo de trabalho" text={r.profile.workStyle} color="#6f9ee8" />
        <PrintInfoBox label="Comunicação" text={r.profile.communication} color="#a78bfa" />
      </PrintGrid2>

      <div style={card}>
        <p style={kicker}>Influência secundária: {r.secondaryProfile.name}</p>
        <p style={{ ...itemBody, borderLeft: `3px solid ${sc}`, paddingLeft: 12 }}>{r.secondaryProfile.description}</p>
      </div>

      <div style={{ ...card, marginBottom: 0 }}>
        <p style={kicker}>Funções e cargos recomendados</p>
        <PrintTags items={r.profile.idealRoles} color="#9db4e8" />
      </div>
    </div>
  )
}

// ============================================================
// ARQUÉTIPOS
// ============================================================
export function ArchetypePrintReport({ result }: { result: Record<string, unknown> }) {
  const r = result as {
    dominant: string; secondary: string; shadow: string
    percentages: Record<string, number>
    report: {
      name: string; title: string; tagline: string; motivation: string; fear: string
      gift: string; shadow: string; keywords: string[]; strengths: string[]
      challenges: string[]; careers: string[]; leadershipStyle: string; description: string
    }
    secondaryReport: { name: string; title: string; tagline: string; description: string }
  }
  const BRAND = '#7d93e0'
  const sorted = Object.entries(r.percentages).sort(([, a], [, b]) => b - a)

  return (
    <div style={{ padding: '26px 40px 44px' }}>
      <div style={{ ...card, display: 'flex', alignItems: 'flex-start', gap: 18 }}>
        <div style={{ minWidth: 64, minHeight: 64, width: 64, height: 64, borderRadius: 16, background: BRAND, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, fontWeight: 700, flexShrink: 0 }}>
          {r.report.name.charAt(0)}
        </div>
        <div>
          <p style={{ ...kicker, margin: '0 0 6px' }}>Arquétipo dominante · Secundário: {r.secondaryReport.name}</p>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 22, fontWeight: 600, color: INK, margin: '0 0 3px' }}>{r.report.name}</h2>
          <p style={{ fontSize: 13, fontWeight: 600, color: BRAND, margin: '2px 0 0' }}>{r.report.title}</p>
          <p style={{ fontSize: 12.5, fontStyle: 'italic', color: MUTED, margin: '2px 0 0' }}>"{r.report.tagline}"</p>
        </div>
      </div>

      <div style={card}>
        <p style={kicker}>Descrição do arquétipo</p>
        <p style={{ ...itemBody, fontSize: 12.5 }}>{r.report.description}</p>
      </div>

      <PrintGrid2>
        <PrintInfoBox label="Dom principal" text={r.report.gift} color="#5fc77f" />
        <PrintInfoBox label="Motivação central" text={r.report.motivation} color={BRAND} />
      </PrintGrid2>
      <PrintGrid2>
        <PrintInfoBox label="Maior medo" text={r.report.fear} color="#ef6a6a" />
        <PrintInfoBox label="Sombra (ponto cego)" text={r.report.shadow} color="#e0a64b" />
      </PrintGrid2>

      <div style={card}>
        <p style={kicker}>Palavras-chave do arquétipo</p>
        <PrintTags items={r.report.keywords} color={BRAND} />
      </div>

      <div style={card}>
        <p style={kicker}>Distribuição dos arquétipos</p>
        {sorted.map(([name, pct]) => (
          <PrintBar key={name} label={PT_ARCHETYPE[name] ?? name} pct={pct} color={BRAND} bold={name === r.dominant} />
        ))}
      </div>

      <div style={card}>
        <p style={{ ...kicker, color: '#74d6a0' }}>Pontos fortes</p>
        <PrintBullets items={r.report.strengths} color="#74d6a0" />
      </div>
      <div style={card}>
        <p style={{ ...kicker, color: '#f0a59e' }}>Desafios e desenvolvimento</p>
        <PrintBullets items={r.report.challenges} color="#f0a59e" />
      </div>

      <div style={card}>
        <p style={kicker}>Estilo de liderança</p>
        <p style={{ ...itemBody }}>{r.report.leadershipStyle}</p>
      </div>

      <div style={card}>
        <p style={kicker}>Carreiras e funções alinhadas</p>
        <PrintTags items={r.report.careers} color={BRAND} />
      </div>

      <div style={{ ...card, marginBottom: 0, background: 'rgba(125,147,224,0.10)', border: '1px solid rgba(125,147,224,0.25)' }}>
        <p style={kicker}>Arquétipo secundário — {r.secondaryReport.name}</p>
        <p style={{ fontSize: 11, fontWeight: 700, color: BRAND, margin: '0 0 8px' }}>
          {r.secondaryReport.title} · &ldquo;{r.secondaryReport.tagline}&rdquo;
        </p>
        <p style={{ ...itemBody }}>{r.secondaryReport.description}</p>
      </div>
    </div>
  )
}

// ============================================================
// ARQUÉTIPOS FEMININOS
// ============================================================
export function ArchetypeFemininePrintReport({ result }: { result: Record<string, unknown> }) {
  const r = result as {
    dominant: string; secondary: string; toActivate: string
    percentages: Record<string, number>
    report: {
      name: string; title: string; goddess: string; tagline: string; essence: string
      keyword: string; shadow: string; strengths: string[]; challenges: string[]
      description: string; activationTip: string
    }
    secondaryReport: { name: string; title: string; tagline: string; description: string }
    activationReport?: { name: string; title: string; tagline: string; activationTip: string }
  }
  const VIOLET = '#a78bfa'

  const sorted = Object.entries(r.percentages).sort(([, a], [, b]) => b - a)

  return (
    <div style={{ padding: '26px 40px 44px' }}>
      <div style={{ ...card, display: 'flex', alignItems: 'flex-start', gap: 18 }}>
        <div style={{ minWidth: 64, minHeight: 64, width: 64, height: 64, borderRadius: '50%', background: VIOLET, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, fontWeight: 700, flexShrink: 0 }}>
          {r.report.name.charAt(0)}
        </div>
        <div>
          <p style={{ ...kicker, margin: '0 0 6px' }}>Arquétipo dominante · Deusa: {r.report.goddess}</p>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 22, fontWeight: 600, color: INK, margin: '0 0 3px' }}>{r.report.name}</h2>
          <p style={{ fontSize: 13, fontWeight: 600, color: VIOLET, margin: '2px 0 0' }}>{r.report.title}</p>
          <p style={{ fontSize: 12.5, fontStyle: 'italic', color: MUTED, margin: '2px 0 0' }}>"{r.report.tagline}"</p>
        </div>
      </div>

      <div style={card}>
        <p style={kicker}>Descrição da energia arquetípica</p>
        <p style={{ ...itemBody, fontSize: 12.5 }}>{r.report.description}</p>
      </div>

      <PrintGrid2>
        <PrintInfoBox label="Essência" text={r.report.essence} color={VIOLET} />
        <PrintInfoBox label="Palavra-chave" text={r.report.keyword} color="#7d93e0" />
      </PrintGrid2>
      <div style={{ marginBottom: 16 }}><PrintInfoBox label="Sombra (ponto cego)" text={r.report.shadow} color="#e0a64b" /></div>

      <div style={card}>
        <p style={kicker}>Distribuição das energias</p>
        {sorted.map(([name, pct]) => (
          <PrintBar key={name} label={PT_FEM_ARCHETYPE[name] ?? name} pct={pct} color={VIOLET} bold={name === r.dominant} />
        ))}
      </div>

      <div style={card}>
        <p style={{ ...kicker, color: '#74d6a0' }}>Pontos fortes</p>
        <PrintBullets items={r.report.strengths} color="#74d6a0" />
      </div>
      <div style={card}>
        <p style={{ ...kicker, color: '#f0a59e' }}>Desafios e desenvolvimento</p>
        <PrintBullets items={r.report.challenges} color="#f0a59e" />
      </div>

      <div style={{ ...card, marginBottom: r.activationReport ? 16 : 0, background: 'rgba(167,139,250,0.10)', border: '1px solid rgba(167,139,250,0.25)' }}>
        <p style={kicker}>Arquétipo secundário — {r.secondaryReport.name}</p>
        <p style={{ fontSize: 11, fontWeight: 700, color: VIOLET, margin: '0 0 8px' }}>
          {r.secondaryReport.title} · &ldquo;{r.secondaryReport.tagline}&rdquo;
        </p>
        <p style={{ ...itemBody }}>{r.secondaryReport.description}</p>
      </div>

      {r.activationReport && (
        <div style={{ ...card, marginBottom: 0, background: 'rgba(201,168,76,0.10)', border: '1px solid rgba(201,168,76,0.25)' }}>
          <p style={{ ...kicker, color: GOLD_LT }}>Energia a ativar: {r.activationReport.name}</p>
          <p style={{ fontSize: 11.5, fontStyle: 'italic', color: GOLD_LT, margin: '0 0 8px' }}>"{r.activationReport.tagline}"</p>
          <p style={{ ...itemBody }}>{r.activationReport.activationTip}</p>
        </div>
      )}
    </div>
  )
}

// ============================================================
// 5 LINGUAGENS DO AMOR
// ============================================================
export function LoveLanguagesPrintReport({ result }: { result: Record<string, unknown> }) {
  const r = result as {
    primaryLanguage: 'PA' | 'TQ' | 'PR' | 'AS' | 'TF'
    secondaryLanguage: 'PA' | 'TQ' | 'PR' | 'AS' | 'TF'
    percentages: Record<string, number>
    scores: Record<string, number>
    ranking: ('PA' | 'TQ' | 'PR' | 'AS' | 'TF')[]
    report: { name: string; tagline: string; summary: string; professional: string; personal: string; tips: string[] }
  }
  const LABELS: Record<string, string> = {
    PA: 'Palavras de Afirmacao', TQ: 'Tempo de Qualidade', PR: 'Presentes', AS: 'Atos de Servico', TF: 'Toque Fisico',
  }
  const COLORS: Record<string, string> = {
    PA: '#a78bfa', TQ: '#f0b24b', PR: '#ec6aa8', AS: '#4dd0c1', TF: '#f47083',
  }
  const pc = COLORS[r.primaryLanguage] ?? GOLD
  const sc = COLORS[r.secondaryLanguage] ?? '#9aa3b2'

  return (
    <div style={{ padding: '26px 40px 44px' }}>
      <PrintHero badge={r.primaryLanguage} badgeColor={pc}
        kickerText={`Linguagem primaria - Secundaria: ${LABELS[r.secondaryLanguage]}`}
        title={r.report.name} tagline={`"${r.report.tagline}"`} taglineColor={pc} desc={r.report.summary} />

      <div style={card}>
        <p style={kicker}>Distribuicao das 5 linguagens</p>
        {r.ranking.map((lang) => (
          <PrintBar key={lang} label={LABELS[lang]} pct={Math.round((r.percentages[lang] ?? 0) * 100)} color={COLORS[lang]} bold={lang === r.primaryLanguage} />
        ))}
      </div>

      <PrintGrid2>
        <PrintInfoBox label="No ambiente profissional" text={r.report.professional} color="#6f9ee8" />
        <PrintInfoBox label="Em relacionamentos pessoais" text={r.report.personal} color="#c89af0" />
      </PrintGrid2>

      <div style={card}>
        <p style={kicker}>Como cultivar sua linguagem do amor</p>
        <PrintBullets items={r.report.tips} color={pc} />
      </div>

      <div style={{ ...card, marginBottom: 0 }}>
        <p style={kicker}>Influencia secundaria: {LABELS[r.secondaryLanguage]}</p>
        <p style={{ ...itemBody, borderLeft: `3px solid ${sc}`, paddingLeft: 12 }}>
          Sua segunda linguagem mais expressiva e <strong style={{ color: INK }}>{LABELS[r.secondaryLanguage]}</strong>.
          Quando combinada a linguagem primaria, ela amplia as formas pelas quais voce
          da e recebe afeto - vale comunicar isso as pessoas proximas.
        </p>
      </div>
    </div>
  )
}

// ============================================================
// ÂNCORAS DE CARREIRA
// ============================================================
export function CareerAnchorPrintReport({ result }: { result: Record<string, unknown> }) {
  const r = result as {
    primaryAnchor: string
    secondaryAnchor: string
    percentages: Record<string, number>
    scores: Record<string, number>
    ranking: Array<{ anchor: string; score: number; percentage: number }>
    primaryReport: {
      name: string; tagline: string; summary: string; motivation: string; aversion: string
      idealRoles: string[]; developmentTips: string[]; managementApproach: string
    }
    secondaryReport: { name: string; tagline: string; summary: string }
  }
  const LABELS: Record<string, string> = {
    TF: 'Competencia Tecnico-Funcional', GG: 'Gerencia Geral', AU: 'Autonomia e Independencia',
    SE: 'Seguranca e Estabilidade', CE: 'Criatividade Empreendedora', SD: 'Servico e Dedicacao',
    DP: 'Desafio Puro', EV: 'Estilo de Vida',
  }
  const COLORS: Record<string, string> = {
    TF: '#7d93e0', GG: '#e6c662', AU: '#e0824b', SE: '#74d6a0',
    CE: '#f0b24b', SD: '#e090a0', DP: '#ef6a6a', EV: '#5fc7b8',
  }
  const pc = COLORS[r.primaryAnchor] ?? GOLD
  const sc = COLORS[r.secondaryAnchor] ?? '#9aa3b2'

  return (
    <div style={{ padding: '26px 40px 44px' }}>
      <PrintHero badge={r.primaryAnchor} badgeColor={pc}
        kickerText={`Ancora primaria - Secundaria: ${LABELS[r.secondaryAnchor]}`}
        title={r.primaryReport.name} tagline={`"${r.primaryReport.tagline}"`} taglineColor={pc} desc={r.primaryReport.summary} />

      <div style={card}>
        <p style={kicker}>Distribuicao das 8 ancoras</p>
        {r.ranking.map((item) => (
          <PrintBar key={item.anchor} label={LABELS[item.anchor]} pct={item.percentage} color={COLORS[item.anchor]} bold={item.anchor === r.primaryAnchor} />
        ))}
      </div>

      <PrintGrid2>
        <PrintInfoBox label="O que te motiva" text={r.primaryReport.motivation} color="#74d6a0" />
        <PrintInfoBox label="O que te desmotiva" text={r.primaryReport.aversion} color="#ef6a6a" />
      </PrintGrid2>

      <div style={card}>
        <p style={kicker}>Funcoes e cargos ideais</p>
        <PrintBullets items={r.primaryReport.idealRoles} color={pc} />
      </div>

      <div style={card}>
        <p style={kicker}>Caminhos de desenvolvimento</p>
        <PrintBullets items={r.primaryReport.developmentTips} color="#9db4e8" />
      </div>

      <div style={card}>
        <p style={kicker}>Como gerir alguem com essa ancora</p>
        <p style={{ ...itemBody, borderLeft: `3px solid ${pc}`, paddingLeft: 12 }}>{r.primaryReport.managementApproach}</p>
      </div>

      <div style={{ ...card, marginBottom: 0 }}>
        <p style={kicker}>Influencia secundaria: {r.secondaryReport.name}</p>
        <p style={{ ...itemBody, borderLeft: `3px solid ${sc}`, paddingLeft: 12 }}>
          <em style={{ color: '#cfd5e0' }}>{r.secondaryReport.tagline}</em>
        </p>
        <p style={{ ...itemBody, marginTop: 8 }}>{r.secondaryReport.summary}</p>
      </div>
    </div>
  )
}

// ============================================================
// INTELIGÊNCIA EMOCIONAL
// ============================================================
export function EmotionalIntelligencePrintReport({ result }: { result: Record<string, unknown> }) {
  const r = result as {
    primaryStrength: string
    primaryDevelopment: string
    averagePercentage: number
    globalLevel: 'high' | 'mid' | 'low'
    percentages: Record<string, number>
    domains: Array<{
      domain: string
      score: number
      percentage: number
      level: 'high' | 'mid' | 'low'
      report: { name: string; tagline: string; description: string; subthemes: string[]; developmentTips: string[]; applicationCorporate: string }
      feedback: string
    }>
  }
  const LABELS: Record<string, string> = {
    AUC: 'Autoconsciencia', AUR: 'Autorregulacao', MOT: 'Motivacao', EMP: 'Empatia', HAS: 'Habilidades Sociais',
  }
  const COLORS: Record<string, string> = {
    AUC: '#e0824b', AUR: '#7d93e0', MOT: '#e6c662', EMP: '#e090a0', HAS: '#74d6a0',
  }
  const LEVEL_LABEL: Record<string, string> = { high: 'Alto', mid: 'Medio', low: 'Em desenvolvimento' }
  const LEVEL_COLOR: Record<string, string> = { high: '#74d6a0', mid: '#e0a64b', low: '#ef6a6a' }

  const pc = COLORS[r.primaryStrength] ?? GOLD
  const dev = COLORS[r.primaryDevelopment] ?? '#9aa3b2'
  const primaryDom = r.domains.find((x) => x.domain === r.primaryStrength)
  const devDom = r.domains.find((x) => x.domain === r.primaryDevelopment)

  return (
    <div style={{ padding: '26px 40px 44px' }}>
      <div style={{ ...card, display: 'flex', alignItems: 'flex-start', gap: 18 }}>
        <div style={{ minWidth: 64, minHeight: 64, width: 64, height: 64, borderRadius: 16, background: pc, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 700, flexShrink: 0 }}>
          {r.averagePercentage}%
        </div>
        <div>
          <p style={{ ...kicker, margin: '0 0 6px' }}>
            Inteligencia Emocional Global - Nivel: <span style={{ color: LEVEL_COLOR[r.globalLevel] }}>{LEVEL_LABEL[r.globalLevel]}</span>
          </p>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 22, fontWeight: 600, color: INK, margin: '0 0 3px' }}>Forca: {LABELS[r.primaryStrength]}</h2>
          {primaryDom && <p style={{ fontSize: 13, fontWeight: 600, fontStyle: 'italic', color: pc, margin: '2px 0 0' }}>"{primaryDom.report.tagline}"</p>}
          <p style={{ ...itemBody, marginTop: 8 }}>
            Sua media nos 5 dominios da Inteligencia Emocional e <strong style={{ color: INK }}>{r.averagePercentage}%</strong>.
            Sua maior forca e <strong style={{ color: INK }}>{LABELS[r.primaryStrength]}</strong> e o dominio com maior potencial
            de desenvolvimento e <strong style={{ color: INK }}>{LABELS[r.primaryDevelopment]}</strong>.
          </p>
        </div>
      </div>

      <div style={card}>
        <p style={kicker}>Pontuacao nos 5 dominios</p>
        {r.domains.map((dm) => (
          <PrintBar key={dm.domain} label={LABELS[dm.domain] + ' - ' + LEVEL_LABEL[dm.level]} pct={dm.percentage} color={COLORS[dm.domain]} bold={dm.domain === r.primaryStrength} />
        ))}
      </div>

      {primaryDom && (
        <div style={card}>
          <p style={kicker}>Sua maior forca: {LABELS[primaryDom.domain]}</p>
          <p style={{ ...itemBody, marginBottom: 12 }}>{primaryDom.report.description}</p>
          <div style={{ background: 'rgba(255,255,255,0.04)', borderLeft: `3px solid ${pc}`, borderRadius: 8, padding: '10px 14px', marginBottom: 12 }}>
            <p style={{ ...itemBody, color: '#cfd5e0' }}>{primaryDom.feedback}</p>
          </div>
          <p style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: MUTED, margin: '0 0 8px' }}>Sub-temas avaliados</p>
          <PrintTags items={primaryDom.report.subthemes} color={pc} />
        </div>
      )}

      {devDom && (
        <div style={card}>
          <p style={kicker}>Foco de desenvolvimento: {LABELS[devDom.domain]}</p>
          <div style={{ background: 'rgba(224,166,75,0.10)', borderLeft: '3px solid #e0a64b', borderRadius: 8, padding: '10px 14px', marginBottom: 12 }}>
            <p style={{ ...itemBody, color: '#e6c79a' }}>{devDom.feedback}</p>
          </div>
          <p style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: MUTED, margin: '0 0 8px' }}>Praticas recomendadas</p>
          <PrintBullets items={devDom.report.developmentTips} color={dev} />
        </div>
      )}

      <div style={{ ...card, marginBottom: 0 }}>
        <p style={kicker}>Detalhamento por dominio</p>
        {r.domains.map((dm, i) => (
          <div key={dm.domain} style={{ background: 'rgba(255,255,255,0.03)', borderLeft: `3px solid ${COLORS[dm.domain]}`, borderRadius: 8, padding: '10px 14px', marginBottom: i === r.domains.length - 1 ? 0 : 10 }}>
            <p style={{ fontSize: 12.5, fontWeight: 700, color: COLORS[dm.domain], margin: '0 0 4px' }}>{LABELS[dm.domain]} ({dm.percentage}%)</p>
            <p style={{ ...itemBody }}>{dm.feedback}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// ============================================================
// VAC — Canais Sensoriais
// ============================================================
export function VacPrintReport({ result }: { result: Record<string, unknown> }) {
  const r = result as {
    percentages: { V: number; A: number; S: number }
    scores: { V: number; A: number; S: number }
    primaryChannel: 'V' | 'A' | 'S'
    secondaryChannel: 'V' | 'A' | 'S'
    primaryReport: { nome: string; fraseImpacto: string; caracteristicas: string[]; comunicacao: string; pontoDeMelhoria: string; emoji: string; cor: string }
    secondaryReport: { nome: string; emoji: string; cor: string }
    combinedReport: { nome: string; descricao: string; brilhaEm: string; cuidadoCom: string } | null
  }
  const VAC_LABELS = { V: 'Visual', A: 'Auditivo', S: 'Sinestésico' } as const
  const VAC_COLORS = { V: '#6f9ee8', A: '#e0824b', S: '#74d6a0' } as const
  const channels: Array<'V' | 'A' | 'S'> = ['V', 'A', 'S']
  const pc = VAC_COLORS[r.primaryChannel]

  return (
    <div style={{ padding: '26px 40px 44px' }}>
      <PrintHero badge={r.primaryChannel} badgeColor={pc} round
        kickerText={`Canal secundário: ${r.secondaryReport.nome}`}
        title={`Perfil ${r.primaryReport.nome}`} tagline={r.primaryReport.fraseImpacto} taglineColor={pc} />

      <div style={card}>
        <p style={kicker}>Intensidade dos canais sensoriais</p>
        {channels.slice().sort((a, b) => r.percentages[b] - r.percentages[a]).map((c) => (
          <div key={c} style={{ marginBottom: 11 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 5 }}>
              <span style={{ fontWeight: c === r.primaryChannel ? 700 : 600, color: c === r.primaryChannel ? INK : '#cfd5e0' }}>{VAC_LABELS[c]}</span>
              <span style={{ color: MUTED }}>{r.percentages[c]}% · {r.scores[c]}/40</span>
            </div>
            <div style={{ height: 8, background: TRACK, borderRadius: 5, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${r.percentages[c]}%`, background: VAC_COLORS[c], borderRadius: 5 }} />
            </div>
          </div>
        ))}
      </div>

      <div style={card}>
        <p style={kicker}>Características principais</p>
        <PrintBullets items={r.primaryReport.caracteristicas} color={pc} />
      </div>

      <div style={card}>
        <p style={{ ...kicker, color: '#9db4e8' }}>Como você se comunica melhor</p>
        <p style={{ ...itemBody, marginBottom: 14 }}>{r.primaryReport.comunicacao}</p>
        <p style={{ ...kicker, color: '#f0a59e' }}>Ponto de atenção</p>
        <p style={{ ...itemBody }}>{r.primaryReport.pontoDeMelhoria}</p>
      </div>

      {r.combinedReport && (
        <div style={{ ...card, marginBottom: 0, background: 'rgba(212,148,58,0.10)', borderLeft: `3px solid ${GOLD}` }}>
          <p style={{ ...kicker, color: GOLD_LT }}>Canal combinado identificado</p>
          <p style={{ ...itemTitle, fontSize: 15, margin: '0 0 8px' }}>{r.combinedReport.nome}</p>
          <p style={{ ...itemBody, marginBottom: 8 }}>{r.combinedReport.descricao}</p>
          <p style={{ ...itemBody, marginBottom: 4 }}><strong style={{ color: INK }}>Brilha em:</strong> {r.combinedReport.brilhaEm}</p>
          <p style={{ ...itemBody }}><strong style={{ color: INK }}>Cuidado com:</strong> {r.combinedReport.cuidadoCom}</p>
        </div>
      )}
    </div>
  )
}

// ============================================================
// QMT — Quociente Mental Triádico
// ============================================================
export function QmtPrintReport({ result }: { result: Record<string, unknown> }) {
  const r = result as {
    percentages: { C: number; I: number; P: number }
    counts: { C: number; I: number; P: number }
    ranking: { dim: 'C' | 'I' | 'P'; label: string; count: number; percentage: number }[]
    dominant: 'C' | 'I' | 'P'
    comboReport: {
      nome: string; combinacao: string; visaoGeral: string
      superpoderes: { titulo: string; descricao: string }[]
      pontosCegos:  { titulo: string; descricao: string }[]
      planoDeAcao:  { titulo: string; descricao: string }[]
      brilhaEm: string
    }
    hemisferio: { titulo: string; texto: string }
    equilibrio: { titulo: string; texto: string }
  }
  const COLORS: Record<'C' | 'I' | 'P', string> = { C: '#d8b95c', I: '#cf8b83', P: '#6f86c9' }
  const a = r.comboReport

  return (
    <div style={{ padding: '26px 40px 44px' }}>
      <div style={{ textAlign: 'center', marginBottom: 22 }}>
        <div style={{ width: 44, height: 3, background: GOLD, borderRadius: 2, margin: '0 auto 14px' }} />
        <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 25, fontWeight: 600, color: INK, margin: '0 0 4px' }}>{a.nome}</h2>
        <p style={{ fontSize: 13, color: '#9db4e8', margin: 0 }}>{a.combinacao}</p>
      </div>

      {/* Radar das 3 dimensões */}
      <div style={card}>
        <p style={kicker}>Seu mapa mental triádico</p>
        {r.ranking.map((d) => (
          <div key={d.dim} style={{ marginBottom: 11 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 5 }}>
              <span style={{ fontWeight: d.dim === r.dominant ? 700 : 600, color: d.dim === r.dominant ? INK : '#cfd5e0' }}>{d.label}</span>
              <span style={{ color: MUTED }}>{d.percentage}% · {d.count} respostas</span>
            </div>
            <div style={{ height: 8, background: TRACK, borderRadius: 5, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${d.percentage}%`, background: COLORS[d.dim], borderRadius: 5 }} />
            </div>
          </div>
        ))}
      </div>

      {/* Visão geral */}
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

      {/* Plano de ação */}
      <div style={{ ...card, background: '#1e2740', borderLeft: `3px solid ${GOLD}` }}>
        <p style={{ ...kicker, color: GOLD_LT }}>Plano de desenvolvimento</p>
        {a.planoDeAcao.map((pa, i) => (
          <div key={i} style={{ marginBottom: i === a.planoDeAcao.length - 1 ? 0 : 12 }}>
            <p style={itemTitle}>{i + 1}. {pa.titulo}</p>
            <p style={itemBody}>{pa.descricao}</p>
          </div>
        ))}
      </div>

      {/* Hemisfério + Equilíbrio */}
      <div style={card}>
        <p style={{ ...kicker, color: '#9db4e8' }}>{r.hemisferio.titulo}</p>
        <p style={{ ...itemBody, marginBottom: 14 }}>{r.hemisferio.texto}</p>
        <p style={{ ...kicker, color: '#9db4e8' }}>{r.equilibrio.titulo}</p>
        <p style={{ ...itemBody }}>{r.equilibrio.texto}</p>
      </div>

      {/* Onde brilha */}
      <div style={{ ...card, background: 'rgba(201,168,76,0.10)', border: '1px solid rgba(201,168,76,0.25)', marginBottom: 0 }}>
        <p style={{ ...itemBody, color: '#e7dcc4' }}>
          <strong style={{ color: INK }}>Onde este perfil brilha:</strong> {a.brilhaEm}
        </p>
      </div>
    </div>
  )
}

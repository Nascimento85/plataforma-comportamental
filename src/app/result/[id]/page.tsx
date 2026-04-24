// ============================================================
// /result/[id] — Devolutiva pública (sem login)
// Suporta ?print=1 → layout limpo para Puppeteer gerar PDF.
// ============================================================

import { prisma }          from '@/lib/prisma'
import { notFound }        from 'next/navigation'
import type { Metadata }   from 'next'
import CopyLinkButton      from './CopyLinkButton'
import PrintButton         from './PrintButton'
import { parseResultData } from '@/lib/parseResult'

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const a = await prisma.assessment.findUnique({
    where: { id: params.id },
    include: { employee: { select: { name: true } } },
  })
  if (!a) return { title: 'Resultado não encontrado' }
  return {
    title: `Devolutiva de ${a.employee.name}`,
    description: 'Relatório de avaliação comportamental.',
  }
}

// ── Mapeamentos ──────────────────────────────────────────────

const ARCHETYPE_PT: Record<string, string> = {
  MAGICIAN:  'MÁGICO',
  LOVER:     'AMANTE',
  HERO:      'HERÓI',
  REBEL:     'REBELDE',
  EXPLORER:  'EXPLORADOR',
  RULER:     'GOVERNANTE',
  CREATOR:   'CRIADOR',
  CAREGIVER: 'CUIDADOR',
  SAGE:      'SÁBIO',
  INNOCENT:  'INOCENTE',
  JESTER:    'BOBO DA CORTE',
  ORPHAN:    'ORFÃO',
}

const TEST_LABELS: Record<string, string> = {
  DISC:               'DISC — Perfil Comportamental',
  MBTI:               'MBTI — 16 Tipos de Personalidade',
  ENNEAGRAM:          'Eneagrama — 9 Tipos',
  TEMPERAMENT:        '4 Temperamentos',
  ARCHETYPE:          'Arquétipos — Os 12 Padrões',
  ARCHETYPE_FEMININE: 'Arquétipos Femininos — As 7 Energias',
}

// ── Componentes de UI ────────────────────────────────────────

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-3xl bg-white overflow-hidden ${className}`}
         style={{ border: '1px solid rgba(232,226,214,0.6)' }}>
      {children}
    </div>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-[10px] font-sans font-bold text-soul-ink/35 uppercase tracking-[0.15em] mb-4">
      {children}
    </h3>
  )
}

function Bar({ label, pct, color, bold }: { label: string; pct: number; color: string; bold?: boolean }) {
  const w = Math.max(1, Math.round(pct))
  return (
    <div className="mb-3">
      <div className="flex justify-between text-sm mb-1.5 font-sans">
        <span className={bold ? 'font-semibold text-soul-ink' : 'text-soul-ink/60'}>{label}</span>
        <span className="text-soul-ink/35">{w}%</span>
      </div>
      <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(232,226,214,0.6)' }}>
        <div className="h-full rounded-full transition-all duration-700" style={{ width: `${w}%`, backgroundColor: color }} />
      </div>
    </div>
  )
}

function BulletList({ items, color = '#7a9e7e' }: { items: string[]; color?: string }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2.5 text-sm text-soul-ink/65 leading-relaxed font-sans">
          <span className="font-bold flex-shrink-0 mt-0.5" style={{ color }}>✓</span>
          {item}
        </li>
      ))}
    </ul>
  )
}

function TagRow({ items, bg, textColor }: { items: string[]; bg: string; textColor: string }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item, i) => (
        <span key={i} className="text-xs font-medium px-3 py-1 rounded-full font-sans"
              style={{ backgroundColor: bg, color: textColor, border: `1px solid ${textColor}30` }}>
          {item}
        </span>
      ))}
    </div>
  )
}

function InfoBox({ label, text, bg, labelColor, textColor }: {
  label: string; text: string; bg: string; labelColor: string; textColor: string
}) {
  return (
    <div className="rounded-2xl p-4" style={{ backgroundColor: bg, border: `1px solid ${labelColor}30` }}>
      <p className="text-[10px] font-bold uppercase tracking-[0.12em] mb-1.5 font-sans" style={{ color: labelColor }}>
        {label}
      </p>
      <p className="text-sm leading-relaxed font-sans" style={{ color: textColor }}>{text}</p>
    </div>
  )
}

function Grid2({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{children}</div>
}

// ── Devolutiva DISC ──────────────────────────────────────────

function DiscDevolutiva({ d }: { d: Record<string, unknown> }) {
  const r = d as {
    predominant: string; secondary: string; combination: string
    percentages: { D: number; I: number; S: number; C: number }
    report: {
      name: string; tagline: string; description?: string; characteristics: string[]
      strengths: string[]; improvements: string[]; values: string; fear: string
      decisionStyle: string; idealEnvironment: string[]; teamValue: string[]
      underPressure: string[]; motivations: string[]
    }
  }
  const C: Record<string, string> = { D: '#ef4444', I: '#f59e0b', S: '#22c55e', C: '#3b82f6' }
  const N: Record<string, string> = { D: 'Dominante', I: 'Influente', S: 'Estável', C: 'Cauteloso' }
  const pred = r.predominant

  return (
    <div className="space-y-5">
      {/* Hero */}
      <Card>
        <div className="p-6 flex items-start gap-5">
          <div className="w-18 h-18 min-w-[72px] min-h-[72px] rounded-2xl flex items-center justify-center text-white text-3xl font-bold"
            style={{ backgroundColor: C[pred] }}>
            {pred}
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Perfil {r.combination}</p>
            <h2 className="text-2xl font-bold text-gray-900">{r.report.name}</h2>
            <p className="font-semibold mt-1" style={{ color: C[pred] }}>"{r.report.tagline}"</p>
            {r.report.description && (
              <p className="text-sm text-gray-600 mt-2 leading-relaxed">{r.report.description}</p>
            )}
          </div>
        </div>
      </Card>

      {/* Distribuição */}
      <Card><div className="p-6">
        <SectionTitle>Distribuição do perfil DISC</SectionTitle>
        {(['D','I','S','C'] as const).map((p) => (
          <Bar key={p} label={`${p} — ${N[p]}`}
            pct={Math.round((r.percentages[p] ?? 0) * 100)}
            color={C[p]} bold={p === pred} />
        ))}
      </div></Card>

      {/* Valores / Medo / Decisão */}
      <Grid2>
        <InfoBox label="Valor central"     text={r.report.values}        bg="#f0fdf4" labelColor="#16a34a" textColor="#166534" />
        <InfoBox label="Maior receio"      text={r.report.fear}          bg="#fef2f2" labelColor="#dc2626" textColor="#991b1b" />
      </Grid2>
      <InfoBox label="Estilo de decisão" text={r.report.decisionStyle} bg="#eff6ff" labelColor="#2563eb" textColor="#1e40af" />

      {/* Características */}
      <Card><div className="p-6">
        <SectionTitle>Características principais</SectionTitle>
        <TagRow items={r.report.characteristics} bg="#eff6ff" textColor="#2a47f5" />
      </div></Card>

      {/* Forças / Desenvolvimento */}
      <Grid2>
        <Card><div className="p-6">
          <SectionTitle>Pontos fortes</SectionTitle>
          <BulletList items={r.report.strengths} color="#16a34a" />
        </div></Card>
        <Card><div className="p-6">
          <SectionTitle>Pontos de desenvolvimento</SectionTitle>
          <BulletList items={r.report.improvements} color="#dc2626" />
        </div></Card>
      </Grid2>

      {/* Ambiente ideal */}
      <Card><div className="p-6">
        <SectionTitle>Ambiente que favorece este perfil</SectionTitle>
        <TagRow items={r.report.idealEnvironment} bg="#f0fdf4" textColor="#16a34a" />
      </div></Card>

      {/* Contribuição para equipe */}
      <Card><div className="p-6">
        <SectionTitle>Contribuição para a equipe</SectionTitle>
        <TagRow items={r.report.teamValue} bg="#eff6ff" textColor="#2a47f5" />
      </div></Card>

      {/* Sob pressão */}
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
        <SectionTitle>Comportamento sob pressão</SectionTitle>
        <TagRow items={r.report.underPressure} bg="#fee2e2" textColor="#b91c1c" />
      </div>

      {/* Motivações */}
      <Card><div className="p-6">
        <SectionTitle>O que motiva este perfil</SectionTitle>
        <BulletList items={r.report.motivations} color="#2a47f5" />
      </div></Card>
    </div>
  )
}

// ── Devolutiva MBTI ──────────────────────────────────────────

function MbtiDevolutiva({ d }: { d: Record<string, unknown> }) {
  const r = d as {
    type: string
    scores: Record<string, number>
    report: { name: string; tagline: string; description: string; strengths: string[]; weaknesses: string[]; careers: string[] }
  }
  const BRAND = '#2a47f5'
  const dims = [
    { label: 'Extraversão (E) vs Introversão (I)', poleA: 'E', poleB: 'I', maxA: 30, maxB: 30 },
    { label: 'Sensação (S) vs Intuição (N)',        poleA: 'S', poleB: 'N', maxA: 54, maxB: 54 },
    { label: 'Pensamento (T) vs Sentimento (F)',    poleA: 'T', poleB: 'F', maxA: 54, maxB: 54 },
    { label: 'Julgamento (J) vs Percepção (P)',     poleA: 'J', poleB: 'P', maxA: 48, maxB: 48 },
  ]

  return (
    <div className="space-y-5">
      <Card><div className="p-6 flex items-start gap-5">
        <div className="min-w-[72px] min-h-[72px] rounded-2xl flex items-center justify-center text-white text-xl font-bold"
          style={{ backgroundColor: BRAND }}>
          {r.type}
        </div>
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Tipo MBTI</p>
          <h2 className="text-2xl font-bold text-gray-900">{r.report.name}</h2>
          <p className="font-semibold mt-1" style={{ color: BRAND }}>"{r.report.tagline}"</p>
        </div>
      </div></Card>

      <Card><div className="p-6">
        <SectionTitle>Sobre este perfil</SectionTitle>
        <p className="text-sm text-gray-700 leading-relaxed">{r.report.description}</p>
      </div></Card>

      <Card><div className="p-6">
        <SectionTitle>Análise por dimensão</SectionTitle>
        {dims.map((dim) => {
          const pctA = Math.round(((r.scores[dim.poleA] ?? 0) / dim.maxA) * 100)
          const pctB = Math.round(((r.scores[dim.poleB] ?? 0) / dim.maxB) * 100)
          const winA = pctA >= pctB
          return (
            <div key={dim.label} className="mb-5">
              <p className="text-xs font-semibold text-gray-500 mb-2">{dim.label}</p>
              <Bar label={`${dim.poleA} — ${winA ? 'predominante' : 'secundário'}`} pct={pctA} color={BRAND} bold={winA} />
              <Bar label={`${dim.poleB} — ${!winA ? 'predominante' : 'secundário'}`} pct={pctB} color="#818cf8" bold={!winA} />
            </div>
          )
        })}
      </div></Card>

      <Grid2>
        <Card><div className="p-6">
          <SectionTitle>Pontos fortes</SectionTitle>
          <BulletList items={r.report.strengths} color="#16a34a" />
        </div></Card>
        <Card><div className="p-6">
          <SectionTitle>Pontos de desenvolvimento</SectionTitle>
          <BulletList items={r.report.weaknesses} color="#dc2626" />
        </div></Card>
      </Grid2>

      <Card><div className="p-6">
        <SectionTitle>Carreiras e funções ideais</SectionTitle>
        <TagRow items={r.report.careers} bg="#eff6ff" textColor={BRAND} />
      </div></Card>
    </div>
  )
}

// ── Devolutiva Eneagrama ─────────────────────────────────────

function EnneagramDevolutiva({ d }: { d: Record<string, unknown> }) {
  const r = d as {
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
    1:'#ef4444',2:'#f59e0b',3:'#eab308',4:'#8b5cf6',5:'#06b6d4',
    6:'#3b82f6',7:'#f97316',8:'#dc2626',9:'#22c55e',
  }
  const col = TYPE_COLORS[r.predominant] ?? '#2a47f5'

  return (
    <div className="space-y-5">
      <Card><div className="p-6 flex items-start gap-5">
        <div className="min-w-[72px] min-h-[72px] rounded-full flex items-center justify-center text-white text-3xl font-bold"
          style={{ backgroundColor: col }}>
          {r.predominant}
        </div>
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Tipo {r.predominant} · {r.report.altName}</p>
          <h2 className="text-2xl font-bold text-gray-900">{r.report.name}</h2>
          <p className="font-semibold mt-1" style={{ color: col }}>{r.report.tagline}</p>
        </div>
      </div></Card>

      <Card><div className="p-6">
        <SectionTitle>Interpretação</SectionTitle>
        <p className="text-sm text-gray-700 leading-relaxed">{r.interpretation[String(r.predominant)]}</p>
      </div></Card>

      <Grid2>
        <InfoBox label="Motivação central" text={r.report.motivation}  bg="#f0fdf4" labelColor="#16a34a" textColor="#166534" />
        <InfoBox label="Medo básico"       text={r.report.basicFear}   bg="#fef2f2" labelColor="#dc2626" textColor="#991b1b" />
      </Grid2>

      <Card><div className="p-6">
        <SectionTitle>Foco de atenção</SectionTitle>
        <p className="text-sm text-gray-700 bg-gray-50 rounded-xl px-4 py-3 leading-relaxed">{r.report.focusOfAttention}</p>
      </div></Card>

      <Card><div className="p-6">
        <SectionTitle>Pontuação por tipo (máx. 75 pts)</SectionTitle>
        {[1,2,3,4,5,6,7,8,9].map((t) => (
          <Bar key={t}
            label={`Tipo ${t}${t === r.predominant ? ` — ${r.report.name}` : ''}`}
            pct={((r.scores[String(t)] ?? 0) / 75) * 100}
            color={t === r.predominant ? col : '#e2e8f0'}
            bold={t === r.predominant} />
        ))}
      </div></Card>

      <Grid2>
        <Card><div className="p-6">
          <SectionTitle>Pontos fortes</SectionTitle>
          <BulletList items={r.report.strengths} color="#16a34a" />
        </div></Card>
        <Card><div className="p-6">
          <SectionTitle>Desafios e desenvolvimento</SectionTitle>
          <BulletList items={r.report.challenges} color="#dc2626" />
        </div></Card>
      </Grid2>

      <Card><div className="p-6">
        <SectionTitle>Asas — influências secundárias</SectionTitle>
        <div className="space-y-3">
          {r.report.wings.map((w, i) => (
            <div key={i} className="bg-violet-50 border border-violet-200 rounded-xl px-4 py-3">
              <p className="text-xs font-bold text-violet-700 mb-1">Tipo {w.wing}</p>
              <p className="text-sm text-violet-900 leading-relaxed">{w.description}</p>
            </div>
          ))}
        </div>
      </div></Card>

      <Card><div className="p-6">
        <SectionTitle>Caminhos de desenvolvimento</SectionTitle>
        <BulletList items={r.report.development} color={col} />
      </div></Card>
    </div>
  )
}

// ── Devolutiva Temperamentos ─────────────────────────────────

function TemperamentDevolutiva({ d }: { d: Record<string, unknown> }) {
  const r = d as {
    primaryType: string; secondaryType: string
    profile: { name: string; title: string; description: string; strengths: string[]; challenges: string[]; workStyle: string; communication: string; idealRoles: string[] }
    secondaryProfile: { name: string; title: string; description: string }
    interpretation: string
    percentages: Record<string, number>
  }
  const TC: Record<string, string> = {
    COLERICO:'#ef4444', SANGUINEO:'#f59e0b', MELANCOLICO:'#8b5cf6', FLEUMATICO:'#22c55e',
  }
  const TL: Record<string, string> = {
    COLERICO:'Colérico', SANGUINEO:'Sanguíneo', MELANCOLICO:'Melancólico', FLEUMATICO:'Fleumático',
  }
  const pc = TC[r.primaryType] ?? '#2a47f5'
  const sc = TC[r.secondaryType] ?? '#94a3b8'

  return (
    <div className="space-y-5">
      <Card><div className="p-6 flex items-start gap-5">
        <div className="min-w-[72px] min-h-[72px] rounded-full flex items-center justify-center text-white text-2xl font-bold"
          style={{ backgroundColor: pc }}>
          {r.profile.name.charAt(0)}
        </div>
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">
            {r.profile.name} · Secundário: {r.secondaryProfile.name}
          </p>
          <h2 className="text-2xl font-bold text-gray-900">{r.profile.title}</h2>
          <p className="text-sm text-gray-600 mt-2 leading-relaxed">{r.interpretation}</p>
        </div>
      </div></Card>

      <Card><div className="p-6">
        <SectionTitle>Distribuição dos temperamentos</SectionTitle>
        {Object.entries(r.percentages).sort(([,a],[,b]) => b-a).map(([type, pct]) => (
          <Bar key={type} label={TL[type] ?? type} pct={pct}
            color={TC[type] ?? '#94a3b8'} bold={type === r.primaryType} />
        ))}
      </div></Card>

      <Card><div className="p-6">
        <SectionTitle>Descrição do perfil</SectionTitle>
        <p className="text-sm text-gray-700 leading-relaxed">{r.profile.description}</p>
      </div></Card>

      <Grid2>
        <Card><div className="p-6">
          <SectionTitle>Pontos fortes</SectionTitle>
          <BulletList items={r.profile.strengths} color="#16a34a" />
        </div></Card>
        <Card><div className="p-6">
          <SectionTitle>Desafios e desenvolvimento</SectionTitle>
          <BulletList items={r.profile.challenges} color="#dc2626" />
        </div></Card>
      </Grid2>

      <Grid2>
        <InfoBox label="Estilo de trabalho" text={r.profile.workStyle}     bg="#eff6ff" labelColor="#2563eb" textColor="#1e40af" />
        <InfoBox label="Comunicação"        text={r.profile.communication} bg="#faf5ff" labelColor="#7c3aed" textColor="#581c87" />
      </Grid2>

      <Card><div className="p-6">
        <SectionTitle>Influência secundária: {r.secondaryProfile.name}</SectionTitle>
        <p className="text-sm text-gray-700 leading-relaxed" style={{ borderLeft: `4px solid ${sc}`, paddingLeft: '12px' }}>
          {r.secondaryProfile.description}
        </p>
      </div></Card>

      <Card><div className="p-6">
        <SectionTitle>Funções e cargos recomendados</SectionTitle>
        <TagRow items={r.profile.idealRoles} bg="#eff6ff" textColor="#2a47f5" />
      </div></Card>
    </div>
  )
}

// ── Devolutiva Arquétipos ────────────────────────────────────

function ArchetypeDevolutiva({ d }: { d: Record<string, unknown> }) {
  const r = d as {
    dominant: string; secondary: string; shadow: string
    percentages: Record<string, number>
    report: {
      name: string; title: string; tagline: string; motivation: string; fear: string
      gift: string; shadow: string; keywords: string[]; strengths: string[]
      challenges: string[]; careers: string[]; leadershipStyle: string; description: string
    }
    secondaryReport: { name: string; title: string; tagline: string; description: string }
  }
  const BRAND = '#2a47f5'
  const sorted = Object.entries(r.percentages).sort(([,a],[,b]) => b-a)

  return (
    <div className="space-y-5">
      <Card><div className="p-6 flex items-start gap-5">
        <div className="min-w-[72px] min-h-[72px] rounded-2xl flex items-center justify-center text-white text-3xl font-bold"
          style={{ backgroundColor: BRAND }}>
          {r.report.name.charAt(0)}
        </div>
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">
            Arquétipo dominante · Secundário: {r.secondaryReport.name}
          </p>
          <h2 className="text-2xl font-bold text-gray-900">{r.report.name}</h2>
          <p className="font-semibold mt-1" style={{ color: BRAND }}>{r.report.title}</p>
          <p className="text-gray-400 text-sm mt-0.5 italic">"{r.report.tagline}"</p>
        </div>
      </div></Card>

      <Card><div className="p-6">
        <SectionTitle>Descrição do arquétipo</SectionTitle>
        <p className="text-sm text-gray-700 leading-relaxed">{r.report.description}</p>
      </div></Card>

      <Grid2>
        <InfoBox label="Dom principal"     text={r.report.gift}       bg="#f0fdf4" labelColor="#16a34a" textColor="#166534" />
        <InfoBox label="Motivação central" text={r.report.motivation} bg="#eff6ff" labelColor={BRAND}   textColor="#1e40af" />
      </Grid2>
      <Grid2>
        <InfoBox label="Maior medo"         text={r.report.fear}    bg="#fef2f2" labelColor="#dc2626" textColor="#991b1b" />
        <InfoBox label="Sombra (ponto cego)" text={r.report.shadow} bg="#fffbeb" labelColor="#d97706" textColor="#92400e" />
      </Grid2>

      <Card><div className="p-6">
        <SectionTitle>Palavras-chave do arquétipo</SectionTitle>
        <TagRow items={r.report.keywords} bg="#eff6ff" textColor={BRAND} />
      </div></Card>

      <Card><div className="p-6">
        <SectionTitle>Distribuição dos arquétipos</SectionTitle>
        {sorted.map(([name, pct]) => (
          <Bar key={name} label={ARCHETYPE_PT[name] ?? name} pct={pct} color={BRAND} bold={name === r.dominant} />
        ))}
      </div></Card>

      <Grid2>
        <Card><div className="p-6">
          <SectionTitle>Pontos fortes</SectionTitle>
          <BulletList items={r.report.strengths} color="#16a34a" />
        </div></Card>
        <Card><div className="p-6">
          <SectionTitle>Desafios e desenvolvimento</SectionTitle>
          <BulletList items={r.report.challenges} color="#dc2626" />
        </div></Card>
      </Grid2>

      <Card><div className="p-6">
        <SectionTitle>Estilo de liderança</SectionTitle>
        <p className="text-sm text-gray-700 bg-gray-50 rounded-xl px-4 py-3 leading-relaxed">{r.report.leadershipStyle}</p>
      </div></Card>

      <Card><div className="p-6">
        <SectionTitle>Carreiras e funções alinhadas</SectionTitle>
        <TagRow items={r.report.careers} bg="#eff6ff" textColor={BRAND} />
      </div></Card>

      <Card><div className="p-6" style={{ backgroundColor: '#f0f4ff', borderColor: '#c7d2fe' }}>
        <SectionTitle>Arquétipo secundário — {r.secondaryReport.name}</SectionTitle>
        <p className="text-xs font-bold mb-2" style={{ color: BRAND }}>
          {r.secondaryReport.title} · &ldquo;{r.secondaryReport.tagline}&rdquo;
        </p>
        <p className="text-sm leading-relaxed" style={{ color: '#1e3a8a' }}>{r.secondaryReport.description}</p>
      </div></Card>
    </div>
  )
}

// ── Devolutiva Arquétipos Femininos ──────────────────────────

function ArchetypeFeminineDevolutiva({ d }: { d: Record<string, unknown> }) {
  const r = d as {
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
  const VIOLET = '#7c3aed'
  const sorted = Object.entries(r.percentages).sort(([,a],[,b]) => b-a)

  return (
    <div className="space-y-5">
      <Card><div className="p-6 flex items-start gap-5">
        <div className="min-w-[72px] min-h-[72px] rounded-full flex items-center justify-center text-white text-3xl font-bold"
          style={{ backgroundColor: VIOLET }}>
          {r.report.name.charAt(0)}
        </div>
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">
            Arquétipo dominante · Deusa: {r.report.goddess}
          </p>
          <h2 className="text-2xl font-bold text-gray-900">{r.report.name}</h2>
          <p className="font-semibold mt-1" style={{ color: VIOLET }}>{r.report.title}</p>
          <p className="text-gray-400 text-sm mt-0.5 italic">"{r.report.tagline}"</p>
        </div>
      </div></Card>

      <Card><div className="p-6">
        <SectionTitle>Descrição da energia arquetípica</SectionTitle>
        <p className="text-sm text-gray-700 leading-relaxed">{r.report.description}</p>
      </div></Card>

      <Grid2>
        <InfoBox label="Essência"      text={r.report.essence}  bg="#faf5ff" labelColor={VIOLET}  textColor="#581c87" />
        <InfoBox label="Palavra-chave" text={r.report.keyword}  bg="#eff6ff" labelColor="#2a47f5" textColor="#1e40af" />
      </Grid2>
      <InfoBox label="Sombra (ponto cego)" text={r.report.shadow} bg="#fffbeb" labelColor="#d97706" textColor="#92400e" />

      <Card><div className="p-6">
        <SectionTitle>Distribuição das energias</SectionTitle>
        {sorted.map(([name, pct]) => (
          <Bar key={name} label={name} pct={pct} color={VIOLET} bold={name === r.dominant} />
        ))}
      </div></Card>

      <Grid2>
        <Card><div className="p-6">
          <SectionTitle>Pontos fortes</SectionTitle>
          <BulletList items={r.report.strengths} color="#16a34a" />
        </div></Card>
        <Card><div className="p-6">
          <SectionTitle>Desafios e desenvolvimento</SectionTitle>
          <BulletList items={r.report.challenges} color="#dc2626" />
        </div></Card>
      </Grid2>

      <Card><div className="p-6" style={{ backgroundColor: '#faf5ff', borderColor: '#ddd6fe' }}>
        <SectionTitle>Arquétipo secundário — {r.secondaryReport.name}</SectionTitle>
        <p className="text-xs font-bold mb-2" style={{ color: VIOLET }}>
          {r.secondaryReport.title} · &ldquo;{r.secondaryReport.tagline}&rdquo;
        </p>
        <p className="text-sm leading-relaxed" style={{ color: '#4c1d95' }}>{r.secondaryReport.description}</p>
      </div></Card>

      {r.activationReport && (
        <Card><div className="p-6" style={{ backgroundColor: '#fffbeb', borderColor: '#fde68a' }}>
          <SectionTitle>💫 Energia a ativar: {r.activationReport.name}</SectionTitle>
          <p className="text-xs italic mb-2" style={{ color: '#d97706' }}>"{r.activationReport.tagline}"</p>
          <p className="text-sm leading-relaxed" style={{ color: '#92400e' }}>{r.activationReport.activationTip}</p>
        </div></Card>
      )}
    </div>
  )
}

// ── Página principal ─────────────────────────────────────────

interface PageProps {
  params:      { id: string }
  searchParams: { print?: string }
}

export default async function PublicResultPage({ params, searchParams }: PageProps) {
  const isPrint = searchParams.print === '1'

  const assessment = await prisma.assessment.findUnique({
    where: { id: params.id },
    include: {
      employee: { select: { name: true, email: true } },
      company:  { select: { name: true } },
      result:   true,
    },
  })

  if (!assessment) return notFound()

  if (!assessment.result) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 max-w-md w-full p-8 text-center">
          <div className="text-4xl mb-4">⏳</div>
          <h1 className="text-xl font-bold text-gray-900 mb-2">Avaliação ainda não concluída</h1>
          <p className="text-gray-500 text-sm">{assessment.employee.name} ainda não completou este teste.</p>
        </div>
      </div>
    )
  }

  const resultData   = parseResultData(assessment.result.resultData)
  const testLabel    = TEST_LABELS[assessment.testType] ?? assessment.testType
  const APP_NAME     = process.env.NEXT_PUBLIC_APP_NAME ?? 'Psique — Mapa Comportamental'
  const finishedAt   = assessment.completedAt
    ? new Date(assessment.completedAt).toLocaleDateString('pt-BR', { day:'2-digit', month:'long', year:'numeric' })
    : null

  return (
    <div className="min-h-screen" style={{ background: '#faf7f2' }}>

      {/* ── Header (oculto no modo print) ── */}
      {!isPrint && (
        <header className="sticky top-0 z-10" style={{ background: 'rgba(250,247,242,0.85)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(232,226,214,0.7)' }}>
          <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                   style={{ background: 'linear-gradient(135deg, #c9a84c, #d4943a)' }}>
                <svg viewBox="0 0 90 90" fill="none" className="w-4 h-4">
                  <path d="M45 13L48.5 39.5L72 26L55.5 45L72 64L48.5 50.5L45 77L41.5 50.5L18 64L34.5 45L18 26L41.5 39.5Z"
                    fill="rgba(255,255,255,0.3)" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
                  <circle cx="45" cy="45" r="5" fill="white" opacity="0.9"/>
                </svg>
              </div>
              <span className="font-serif font-semibold text-base text-soul-ink">{APP_NAME}</span>
            </div>
            <div className="flex items-center gap-2">
              <CopyLinkButton />
              <PrintButton assessmentId={params.id} />
            </div>
          </div>
        </header>
      )}

      {/* ── Capa do relatório (modo print) ── */}
      {isPrint && (
        <div style={{ background: 'linear-gradient(135deg, #1c1a17 0%, #2d2417 55%, #3d2a1c 100%)', color: '#fff', padding: '48px 48px 40px' }}>
          <div className="flex items-center gap-3 mb-6">
            <div style={{ width: 40, height: 40, borderRadius: 10, background: 'linear-gradient(135deg, #c9a84c, #d4943a)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg viewBox="0 0 90 90" fill="none" style={{ width: 20, height: 20 }}>
                <path d="M45 13L48.5 39.5L72 26L55.5 45L72 64L48.5 50.5L45 77L41.5 50.5L18 64L34.5 45L18 26L41.5 39.5Z"
                  fill="rgba(255,255,255,0.3)" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
                <circle cx="45" cy="45" r="5" fill="white" opacity="0.9"/>
              </svg>
            </div>
            <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(201,168,76,0.8)' }}>
              {APP_NAME}
            </p>
          </div>
          <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: '8px' }}>
            Avaliação Comportamental
          </p>
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '32px', fontWeight: 300, margin: '0 0 10px', color: '#fff' }}>{testLabel}</h1>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.85)', margin: '0 0 4px' }}>Devolutiva: {assessment.employee.name}</p>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)' }}>{assessment.company.name}{finishedAt ? ` · ${finishedAt}` : ''}</p>
        </div>
      )}

      {/* ── Conteúdo ── */}
      <main className="max-w-2xl mx-auto px-4 py-8 space-y-6">

        {/* Card de identidade (oculto no modo print - já está na capa) */}
        {!isPrint && (
          <div className="bg-white rounded-3xl overflow-hidden" style={{ border: '1px solid rgba(232,226,214,0.6)' }}>
            <div className="p-5 flex items-start justify-between flex-wrap gap-3">
              <div>
                <p className="text-[10px] font-sans font-semibold uppercase tracking-[0.15em] mb-1" style={{ color: 'rgba(28,26,23,0.35)' }}>Avaliação de</p>
                <h1 className="font-serif font-semibold text-2xl text-soul-ink">{assessment.employee.name}</h1>
                <p className="text-sm font-sans mt-0.5" style={{ color: 'rgba(28,26,23,0.45)' }}>{assessment.employee.email}</p>
              </div>
              <div className="text-right">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-sans font-medium"
                      style={{ background: 'rgba(196,99,58,0.1)', color: '#c4633a', border: '1px solid rgba(196,99,58,0.2)' }}>
                  {testLabel}
                </span>
                {finishedAt && <p className="text-[11px] font-sans mt-1" style={{ color: 'rgba(28,26,23,0.35)' }}>Concluído em {finishedAt}</p>}
              </div>
            </div>
          </div>
        )}

        {/* Devolutiva por tipo */}
        {assessment.testType === 'DISC'               && <DiscDevolutiva             d={resultData} />}
        {assessment.testType === 'MBTI'               && <MbtiDevolutiva             d={resultData} />}
        {assessment.testType === 'ENNEAGRAM'          && <EnneagramDevolutiva        d={resultData} />}
        {assessment.testType === 'TEMPERAMENT'        && <TemperamentDevolutiva      d={resultData} />}
        {assessment.testType === 'ARCHETYPE'          && <ArchetypeDevolutiva        d={resultData} />}
        {assessment.testType === 'ARCHETYPE_FEMININE' && <ArchetypeFeminineDevolutiva d={resultData} />}

        {/* Footer */}
        {!isPrint && (
          <div className="text-center pb-6 space-y-1">
            <p className="text-xs font-sans" style={{ color: 'rgba(28,26,23,0.35)' }}>Este relatório é confidencial e destinado exclusivamente ao avaliado e à empresa solicitante.</p>
            <p className="text-xs font-sans" style={{ color: 'rgba(28,26,23,0.35)' }}>Gerado pela <strong style={{ color: '#c4633a' }}>{APP_NAME}</strong></p>
          </div>
        )}
      </main>
    </div>
  )
}

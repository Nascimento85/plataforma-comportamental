// ============================================================
// Seções Premium — MBTI, Temperamentos e Linguagens do Amor
// Renderizadas no relatório (/result/[id]) somente quando o
// ReportUnlock foi pago. Mesmos tokens dark/print dos
// PrintReports (--rep-*), então aparecem na tela e no PDF.
// Conteúdo: src/content/{mbti,temperaments,love-languages}/premium.ts
// ============================================================
import React from 'react'
import { MBTI_PREMIUM, type MbtiType, type CognitiveFunction } from '@/content/mbti/premium'
import { TEMPERAMENT_PREMIUM, type TemperamentKey } from '@/content/temperaments/premium'
import { LOVE_PREMIUM, type LoveLanguageKey } from '@/content/love-languages/premium'

const INK     = 'var(--rep-ink)'
const BODY    = 'var(--rep-body)'
const MUTED   = 'var(--rep-muted)'
const GOLD    = 'var(--rep-gold)'
const CARD_BG = 'var(--rep-card-bg)'
const CARD_BR = '1px solid var(--rep-card-br)'

const GREEN = '#86b58a'
const RED   = '#cf8b83'

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
const itemTitle: React.CSSProperties = { fontSize: 14.5, fontWeight: 700, color: INK, margin: '0 0 3px' }
const itemBody:  React.CSSProperties = { fontSize: 13.5, lineHeight: 1.62, color: BODY, margin: 0 }

// Cabeçalho comum da camada premium
function PremiumHero({ badge, title, pitch }: { badge: string; title: string; pitch: string }) {
  return (
    <div style={{ textAlign: 'center', margin: '10px 0 22px', pageBreakInside: 'avoid' }}>
      <div style={{
        display: 'inline-block', fontSize: 10.5, fontWeight: 800, letterSpacing: '2.5px',
        textTransform: 'uppercase', color: GOLD, border: `1px solid var(--rep-card-br)`,
        borderRadius: 999, padding: '6px 16px', marginBottom: 14,
      }}>
        ✦ {badge}
      </div>
      <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 24, fontWeight: 600, color: INK, margin: '0 0 6px' }}>
        {title}
      </h2>
      <p style={{ fontSize: 13.5, color: MUTED, margin: '0 auto', maxWidth: 520, lineHeight: 1.6 }}>
        {pitch}
      </p>
    </div>
  )
}

// PDI da primeira semana (mesmo formato do Eneagrama)
function PdiCard({ items }: { items: Array<{ day: number; focus: string; task: string }> }) {
  return (
    <div style={card}>
      <p style={kicker}>Plano de desenvolvimento · primeira semana</p>
      {items.map((d) => (
        <div key={d.day} style={{ display: 'flex', gap: 12, marginBottom: 9 }}>
          <span style={{
            flexShrink: 0, fontSize: 10.5, fontWeight: 800, letterSpacing: '1px',
            textTransform: 'uppercase', color: GOLD, width: 52, paddingTop: 2,
          }}>
            Dia {d.day}
          </span>
          <p style={{ ...itemBody, margin: 0 }}>
            <strong style={{ color: INK }}>{d.focus}:</strong> {d.task}
          </p>
        </div>
      ))}
      <p style={{ ...itemBody, color: MUTED, marginTop: 10, fontSize: 12.5 }}>
        Repita o ciclo por 3 semanas. A mudança de padrão vem da repetição pequena, não do insight grande.
      </p>
    </div>
  )
}

// ────────────────────────────────────────────────────────────
// MBTI — Cognição, Carreiras e Comunicação
// ────────────────────────────────────────────────────────────

const FUNC_LABEL: Record<CognitiveFunction, string> = {
  Ni: 'Intuição Introvertida',  Ne: 'Intuição Extrovertida',
  Si: 'Sensação Introvertida',  Se: 'Sensação Extrovertida',
  Ti: 'Pensamento Introvertido', Te: 'Pensamento Extrovertido',
  Fi: 'Sentimento Introvertido', Fe: 'Sentimento Extrovertido',
}
const STACK_ROLE = ['Dominante', 'Auxiliar', 'Terciária', 'Inferior']

export function MbtiPremiumSection({ result }: { result: Record<string, unknown> }) {
  const r = result as { type?: string }
  const key = String(r.type ?? '') as MbtiType
  const c = MBTI_PREMIUM[key]
  if (!c) return null

  return (
    <div style={{ padding: '10px 40px 44px' }}>
      <PremiumHero badge="Análise Premium · Cognição e Carreira" title={c.archetype} pitch={c.pitch} />

      {/* Funções cognitivas */}
      <div style={card}>
        <p style={kicker}>Como o seu cérebro processa o mundo</p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 14 }}>
          {c.cognition.stack.map((f, i) => (
            <div key={f} style={{
              border: `1px solid var(--rep-card-br)`, borderRadius: 10, padding: '8px 14px',
              textAlign: 'center', flex: '1 1 110px',
            }}>
              <p style={{ fontSize: 15, fontWeight: 800, color: i === 0 ? GOLD : INK, margin: 0 }}>{f}</p>
              <p style={{ fontSize: 10.5, color: MUTED, margin: '2px 0 0' }}>{STACK_ROLE[i]}</p>
              <p style={{ fontSize: 10.5, color: MUTED, margin: 0 }}>{FUNC_LABEL[f]}</p>
            </div>
          ))}
        </div>
        <p style={{ ...itemBody, marginBottom: 12 }}>{c.cognition.explanation}</p>
        <p style={itemTitle}>Como você decide na prática</p>
        <p style={itemBody}>{c.cognition.decisionRule}</p>
      </div>

      {/* Carreiras */}
      <div style={card}>
        <p style={kicker}>Carreiras onde o seu tipo prospera</p>
        <p style={{ ...itemBody, marginBottom: 14 }}>{c.careers.summary}</p>
        {c.careers.matches.map((m) => (
          <div key={m.role} style={{ marginBottom: 14, paddingBottom: 12, borderBottom: `1px solid var(--rep-card-br)` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
              <p style={itemTitle}>{m.role}</p>
              <span style={{ fontSize: 12, fontWeight: 700, color: GOLD, whiteSpace: 'nowrap' }}>{m.bandBrlMonthly}</span>
            </div>
            <p style={{ ...itemBody, marginBottom: 4 }}>{m.whyFits}</p>
            <p style={{ ...itemBody, color: MUTED }}>
              <strong style={{ color: RED }}>Ponto cego:</strong> {m.caveat}
            </p>
          </div>
        ))}
        <p style={{ ...itemTitle, marginBottom: 6 }}>Evite (drenam o seu tipo)</p>
        {c.careers.avoid.map((a, i) => (
          <p key={i} style={{ ...itemBody, color: MUTED, margin: '0 0 4px' }}>· {a}</p>
        ))}
      </div>

      {/* Comunicação com outros tipos */}
      <div style={card}>
        <p style={kicker}>Como se comunicar com outros tipos</p>
        {c.relationships.pairings.map((p) => (
          <div key={p.withType} style={{ marginBottom: 16 }}>
            <p style={itemTitle}>
              Com <span style={{ color: GOLD }}>{p.withType}</span>
            </p>
            <p style={{ ...itemBody, marginBottom: 6 }}>{p.dynamic}</p>
            <p style={{
              ...itemBody, fontStyle: 'italic', color: MUTED,
              borderLeft: `2px solid var(--rep-card-br)`, paddingLeft: 12,
            }}>
              {p.script}
            </p>
          </div>
        ))}
      </div>

      <PdiCard items={c.pdi21Days} />
    </div>
  )
}

// ────────────────────────────────────────────────────────────
// TEMPERAMENTOS — Biologia, Alimentação, Estresse e Virtudes
// ────────────────────────────────────────────────────────────

export function TemperamentPremiumSection({ result }: { result: Record<string, unknown> }) {
  const r = result as { primaryType?: string }
  const key = String(r.primaryType ?? '') as TemperamentKey
  const c = TEMPERAMENT_PREMIUM[key]
  if (!c) return null

  return (
    <div style={{ padding: '10px 40px 44px' }}>
      <PremiumHero badge="Análise Premium · Biologia e Equilíbrio" title={c.label} pitch={c.pitch} />

      {/* Corpo e energia */}
      <div style={card}>
        <p style={kicker}>Como o seu corpo funciona</p>
        <div style={{ marginBottom: 12 }}>
          <p style={itemTitle}>Biologia do temperamento</p>
          <p style={itemBody}>{c.body.biology}</p>
        </div>
        <div style={{ marginBottom: 12 }}>
          <p style={itemTitle}>Curva de energia do dia</p>
          <p style={itemBody}>{c.body.energyCurve}</p>
        </div>
        <div>
          <p style={itemTitle}>Sono ideal</p>
          <p style={itemBody}>{c.body.sleep}</p>
        </div>
      </div>

      {/* Alimentação */}
      <div style={card}>
        <p style={kicker}>Alimentação e energia</p>
        <p style={{ ...itemBody, marginBottom: 14 }}>{c.food.summary}</p>
        <p style={{ ...itemTitle, color: RED, marginBottom: 6 }}>Reduza ou evite</p>
        {c.food.stimulants.map((s, i) => (
          <p key={i} style={{ ...itemBody, margin: '0 0 4px' }}>✗ {s}</p>
        ))}
        <p style={{ ...itemTitle, color: GREEN, margin: '14px 0 6px' }}>Inclua na rotina</p>
        {c.food.grounding.map((g, i) => (
          <p key={i} style={{ ...itemBody, margin: '0 0 4px' }}>✓ {g}</p>
        ))}
        <p style={{ ...itemTitle, margin: '14px 0 8px' }}>Um dia de exemplo</p>
        {c.food.sample_day.map((m) => (
          <div key={m.meal} style={{ display: 'flex', gap: 12, marginBottom: 7 }}>
            <span style={{ flexShrink: 0, fontSize: 11, fontWeight: 700, color: GOLD, width: 110, paddingTop: 2 }}>
              {m.meal}
            </span>
            <p style={{ ...itemBody, margin: 0 }}>{m.suggestion}</p>
          </div>
        ))}
      </div>

      {/* Estresse */}
      <div style={card}>
        <p style={kicker}>Gestão de estresse</p>
        <div style={{ marginBottom: 12 }}>
          <p style={itemTitle}>Sua reação imediata</p>
          <p style={itemBody}>{c.stress.acuteResponse}</p>
        </div>
        <div style={{ marginBottom: 14 }}>
          <p style={itemTitle}>Raiva ou ansiedade?</p>
          <p style={itemBody}>{c.stress.rageOrAnxiety}</p>
        </div>
        <p style={{ ...itemTitle, marginBottom: 8 }}>Técnicas de regulação (use na ordem que precisar)</p>
        {c.stress.techniques.map((t) => (
          <div key={t.name} style={{ marginBottom: 10 }}>
            <p style={{ ...itemBody, margin: 0 }}>
              <strong style={{ color: INK }}>{t.name}</strong>
              <span style={{ color: GOLD, fontSize: 12 }}> · {t.duration}</span>
            </p>
            <p style={{ ...itemBody, color: MUTED, margin: 0 }}>{t.how}</p>
          </div>
        ))}
      </div>

      {/* Virtudes e vícios */}
      <div style={card}>
        <p style={kicker}>Virtude e vício cardeais</p>
        <p style={{ ...itemBody, marginBottom: 6 }}>
          <strong style={{ color: GREEN }}>Virtude:</strong> {c.virtuesVices.cardinalVirtue}
        </p>
        <p style={{ ...itemBody, marginBottom: 14 }}>
          <strong style={{ color: RED }}>Vício:</strong> {c.virtuesVices.cardinalVice}
        </p>
        <p style={{ ...itemTitle, marginBottom: 8 }}>Práticas de equilíbrio</p>
        {c.virtuesVices.practices.map((p, i) => (
          <p key={i} style={{ ...itemBody, margin: '0 0 6px' }}>{p}</p>
        ))}
      </div>

      <PdiCard items={c.pdi21Days} />
    </div>
  )
}

// ────────────────────────────────────────────────────────────
// LINGUAGENS DO AMOR — Parceiro, Trabalho e Linguagem Ferida
// ────────────────────────────────────────────────────────────

// O resultado usa códigos PA/TQ/PR/AS/TF; o conteúdo premium usa chaves semânticas
const LOVE_CODE_TO_KEY: Record<string, LoveLanguageKey> = {
  PA: 'WORDS', TQ: 'TIME', PR: 'GIFTS', AS: 'SERVICE', TF: 'TOUCH',
}

export function LoveLanguagesPremiumSection({ result }: { result: Record<string, unknown> }) {
  const r = result as { primaryLanguage?: string }
  const key = LOVE_CODE_TO_KEY[String(r.primaryLanguage ?? '')]
  const c = key ? LOVE_PREMIUM[key] : undefined
  if (!c) return null

  return (
    <div style={{ padding: '10px 40px 44px' }}>
      <PremiumHero badge="Análise Premium · Conexão Afetiva" title={c.label} pitch={c.pitch} />

      {/* Guia para o parceiro */}
      <div style={card}>
        <p style={kicker}>{c.partnerGuide.title}</p>
        <p style={{ ...itemBody, marginBottom: 14 }}>{c.partnerGuide.summary}</p>
        <p style={{ ...itemTitle, color: GREEN, marginBottom: 6 }}>O que fazer</p>
        {c.partnerGuide.do.map((d, i) => (
          <p key={i} style={{ ...itemBody, margin: '0 0 4px' }}>✓ {d}</p>
        ))}
        <p style={{ ...itemTitle, color: RED, margin: '14px 0 6px' }}>O que evitar</p>
        {c.partnerGuide.dont.map((d, i) => (
          <p key={i} style={{ ...itemBody, margin: '0 0 4px' }}>✗ {d}</p>
        ))}
        <p style={{ ...itemTitle, margin: '14px 0 8px' }}>Uma semana de exemplo</p>
        {c.partnerGuide.sample_week.map((w) => (
          <div key={w.day} style={{ display: 'flex', gap: 12, marginBottom: 7 }}>
            <span style={{ flexShrink: 0, fontSize: 11, fontWeight: 700, color: GOLD, width: 70, paddingTop: 2 }}>
              {w.day}
            </span>
            <p style={{ ...itemBody, margin: 0 }}>{w.action}</p>
          </div>
        ))}
      </div>

      {/* No trabalho */}
      <div style={card}>
        <p style={kicker}>Sua linguagem no trabalho</p>
        <p style={{ ...itemBody, marginBottom: 14 }}>{c.workplace.summary}</p>
        <p style={{ ...itemTitle, marginBottom: 6 }}>Se você lidera</p>
        {c.workplace.asLeader.do.map((d, i) => (
          <p key={i} style={{ ...itemBody, margin: '0 0 4px' }}>✓ {d}</p>
        ))}
        {c.workplace.asLeader.dont.map((d, i) => (
          <p key={i} style={{ ...itemBody, color: MUTED, margin: '0 0 4px' }}>✗ {d}</p>
        ))}
        <p style={{ ...itemTitle, margin: '14px 0 6px' }}>Se você é liderado</p>
        {c.workplace.asEmployee.ask.map((a, i) => (
          <p key={i} style={{ ...itemBody, margin: '0 0 4px' }}>· {a}</p>
        ))}
        <div style={{ marginTop: 10 }}>
          {c.workplace.asEmployee.reframe.map((f, i) => (
            <p key={i} style={{
              ...itemBody, fontStyle: 'italic', color: MUTED,
              borderLeft: `2px solid var(--rep-card-br)`, paddingLeft: 12, margin: '0 0 6px',
            }}>
              {f}
            </p>
          ))}
        </div>
      </div>

      {/* Linguagem ferida */}
      <div style={card}>
        <p style={kicker}>Quando a sua linguagem é negligenciada</p>
        <p style={{ ...itemBody, marginBottom: 12 }}>{c.woundedLanguage.summary}</p>
        <div style={{ marginBottom: 12 }}>
          <p style={itemTitle}>Como você reage</p>
          <p style={itemBody}>{c.woundedLanguage.reaction}</p>
        </div>
        <p style={{ ...itemTitle, marginBottom: 6 }}>Script de reparação (adapte com suas palavras)</p>
        <p style={{
          ...itemBody, fontStyle: 'italic', color: MUTED,
          borderLeft: `2px solid ${GOLD}`, paddingLeft: 12, marginBottom: 14,
        }}>
          {c.woundedLanguage.repairScript}
        </p>
        <p style={{ ...itemTitle, marginBottom: 6 }}>Autocuidado da linguagem</p>
        {c.woundedLanguage.selfCare.map((s, i) => (
          <p key={i} style={{ ...itemBody, margin: '0 0 6px' }}>· {s}</p>
        ))}
      </div>

      <PdiCard items={c.pdi21Days} />
    </div>
  )
}

// ============================================================
// <EnneagramPremiumSection /> — Análise Premium do Eneagrama
// Renderizada no relatório (/result/[id]) somente quando o
// ReportUnlock foi pago. Usa os mesmos tokens dark/print dos
// PrintReports, então aparece na tela e no PDF gerado.
// Conteúdo: src/content/enneagram/premium.ts (9 tipos densos).
// ============================================================
import React from 'react'
import { ENNEAGRAM_PREMIUM, type EnneagramKey } from '@/content/enneagram/premium'

const INK     = 'var(--rep-ink)'
const BODY    = 'var(--rep-body)'
const MUTED   = 'var(--rep-muted)'
const GOLD    = 'var(--rep-gold)'
const CARD_BG = 'var(--rep-card-bg)'
const CARD_BR = '1px solid var(--rep-card-br)'

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

const TONE_COLORS: Record<string, string> = {
  'SAÚDE': '#86b58a',
  'NORMAL': '#d8b95c',
  'DOENTE': '#cf8b83',
  'PATOLÓGICO': '#c96b5f',
}

const INSTINCT_LABEL: Record<string, string> = {
  SOCIAL: 'Instinto Social',
  SEXUAL: 'Instinto Sexual (um a um)',
  PRESERVATION: 'Instinto de Autopreservação',
}

export default function EnneagramPremiumSection({ result }: { result: Record<string, unknown> }) {
  const r = result as { predominant?: number | string }
  const key = String(r.predominant ?? '') as EnneagramKey
  const c = ENNEAGRAM_PREMIUM[key]
  if (!c) return null

  return (
    <div style={{ padding: '10px 40px 44px' }}>
      {/* Cabeçalho da camada premium */}
      <div style={{ textAlign: 'center', margin: '10px 0 22px', pageBreakInside: 'avoid' }}>
        <div style={{
          display: 'inline-block', fontSize: 10.5, fontWeight: 800, letterSpacing: '2.5px',
          textTransform: 'uppercase', color: GOLD, border: `1px solid var(--rep-card-br)`,
          borderRadius: 999, padding: '6px 16px', marginBottom: 14,
        }}>
          ✦ Análise Premium · Motivações Profundas
        </div>
        <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 24, fontWeight: 600, color: INK, margin: '0 0 6px' }}>
          {c.name}
        </h2>
        <p style={{ fontSize: 13.5, color: MUTED, margin: '0 auto', maxWidth: 520, lineHeight: 1.6 }}>
          {c.pitch}
        </p>
      </div>

      {/* Motivações nucleares */}
      <div style={card}>
        <p style={kicker}>O motor invisível do seu tipo</p>
        <div style={{ marginBottom: 12 }}>
          <p style={itemTitle}>Medo básico</p>
          <p style={itemBody}>{c.motivations.coreFear}</p>
        </div>
        <div style={{ marginBottom: 12 }}>
          <p style={itemTitle}>Desejo básico</p>
          <p style={itemBody}>{c.motivations.coreDesire}</p>
        </div>
        <div>
          <p style={itemTitle}>Crença que governa</p>
          <p style={itemBody}>{c.motivations.coreBelief}</p>
        </div>
      </div>

      {/* Ferida original */}
      <div style={card}>
        <p style={kicker}>A criança interior · ferida original</p>
        <p style={{ ...itemBody, marginBottom: 14 }}>{c.childWound.storyline}</p>

        <p style={{ ...itemTitle, marginBottom: 8 }}>As frases que tocam na sua cabeça</p>
        <div style={{ marginBottom: 16 }}>
          {c.childWound.soundtrack.map((s, i) => (
            <p key={i} style={{
              ...itemBody, fontStyle: 'italic', color: MUTED,
              borderLeft: `2px solid var(--rep-card-br)`, paddingLeft: 12, margin: '0 0 6px',
            }}>
              {s}
            </p>
          ))}
        </div>

        <p style={{ ...itemTitle, marginBottom: 8 }}>Trilha de reparentalização (pratique nesta ordem)</p>
        {c.childWound.reparenting.map((step, i) => (
          <p key={i} style={{ ...itemBody, margin: '0 0 6px' }}>{step}</p>
        ))}
      </div>

      {/* Setas de movimento */}
      <div style={card}>
        <p style={kicker}>Para onde você se move</p>
        <div style={{ marginBottom: 14 }}>
          <p style={{ ...itemTitle, color: '#86b58a' }}>
            Em crescimento → integra ao Tipo {c.movement.integration.goesTo}
          </p>
          <p style={{ ...itemBody, marginBottom: 4 }}>{c.movement.integration.behaviorShift}</p>
          <p style={{ ...itemBody, color: MUTED }}>
            <strong style={{ color: BODY }}>Sinal de que está acontecendo:</strong> {c.movement.integration.signal}
          </p>
        </div>
        <div>
          <p style={{ ...itemTitle, color: '#cf8b83' }}>
            Em estresse → desintegra ao Tipo {c.movement.disintegration.goesTo}
          </p>
          <p style={{ ...itemBody, marginBottom: 4 }}>{c.movement.disintegration.behaviorShift}</p>
          <p style={{ ...itemBody, color: MUTED }}>
            <strong style={{ color: BODY }}>Sinal de alerta:</strong> {c.movement.disintegration.signal}
          </p>
        </div>
      </div>

      {/* Subtipos por instinto */}
      <div style={card}>
        <p style={kicker}>Os 3 subtipos do seu tipo (qual é o seu?)</p>
        {(['PRESERVATION', 'SOCIAL', 'SEXUAL'] as const).map((inst) => {
          const s = c.subtypes[inst]
          return (
            <div key={inst} style={{ marginBottom: 14 }}>
              <p style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: MUTED, margin: '0 0 2px' }}>
                {INSTINCT_LABEL[inst]}
              </p>
              <p style={itemTitle}>{s.name}</p>
              <p style={{ ...itemBody, marginBottom: 3 }}>{s.flavor}</p>
              <p style={{ ...itemBody, color: '#cf8b83' }}>
                <strong>Red flag:</strong> {s.redFlag}
              </p>
            </div>
          )
        })}
      </div>

      {/* Níveis de consciência */}
      <div style={card}>
        <p style={kicker}>Os 9 níveis de consciência (onde você está hoje?)</p>
        {c.levels.map((l) => (
          <div key={l.level} style={{ display: 'flex', gap: 12, alignItems: 'baseline', marginBottom: 7 }}>
            <span style={{
              flexShrink: 0, width: 22, height: 22, borderRadius: 999, textAlign: 'center',
              fontSize: 11.5, fontWeight: 800, lineHeight: '22px',
              color: '#0f1420', background: TONE_COLORS[l.tone] ?? MUTED,
            }}>
              {l.level}
            </span>
            <p style={{ ...itemBody, margin: 0 }}>
              <strong style={{ color: TONE_COLORS[l.tone] ?? BODY, fontSize: 11, letterSpacing: '1px' }}>{l.tone}</strong>
              {' · '}{l.behavior}
            </p>
          </div>
        ))}
      </div>

      {/* PDI 7 dias */}
      <div style={card}>
        <p style={kicker}>Plano de desenvolvimento · primeira semana</p>
        {c.pdi21Days.map((d) => (
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
    </div>
  )
}

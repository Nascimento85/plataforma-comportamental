// ============================================================
// Gerador de Relatórios PDF — @react-pdf/renderer
// ============================================================

import React from 'react'
import fs from 'fs'
import path from 'path'
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
  renderToBuffer,
} from '@react-pdf/renderer'

// Logo: prioridade → URL externa (Locaweb/CDN) → arquivo local public/logo.png → fallback texto
const LOGO_URL_ENV  = process.env.NEXT_PUBLIC_LOGO_URL   // ex: https://seudominio.com.br/logo.png
const LOGO_PATH_LOCAL = path.join(process.cwd(), 'public', 'logo.png')

// Se há URL de ambiente usamos ela; senão checamos arquivo local
const LOGO_SRC: string | null =
  LOGO_URL_ENV
    ? LOGO_URL_ENV
    : fs.existsSync(LOGO_PATH_LOCAL)
      ? LOGO_PATH_LOCAL
      : null

const HAS_LOGO = LOGO_SRC !== null

// ============================================================
// PALETA E ESTILOS
// ============================================================
const BRAND   = '#2a47f5'
const GRAY_900 = '#111827'
const GRAY_700 = '#374151'
const GRAY_500 = '#6b7280'
const GRAY_200 = '#e5e7eb'
const GRAY_50  = '#f9fafb'

const styles = StyleSheet.create({
  page:  { fontFamily: 'Helvetica', padding: '40 44', backgroundColor: '#ffffff', color: GRAY_900 },
  // ── Header ──────────────────────────────────────────────────
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start',
    marginBottom: 24, paddingBottom: 14,
    borderBottomWidth: 3, borderBottomColor: BRAND,
  },
  headerTitle:    { fontSize: 26, fontFamily: 'Helvetica-Bold', color: BRAND },
  headerSubtitle: { fontSize: 10, color: GRAY_500, marginTop: 3 },
  headerMeta:     { fontSize: 8, color: GRAY_500, textAlign: 'right', lineHeight: 1.6 },
  // ── Capa de perfil ──────────────────────────────────────────
  profileCard: {
    flexDirection: 'row', alignItems: 'center', gap: 16,
    padding: 18, borderRadius: 10, marginBottom: 14,
  },
  profileBadge: {
    width: 64, height: 64, borderRadius: 32,
    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  profileBadgeText: { fontFamily: 'Helvetica-Bold', color: '#ffffff', fontSize: 22 },
  profileName:    { fontSize: 20, fontFamily: 'Helvetica-Bold', color: GRAY_900 },
  profileTagline: { fontSize: 11, color: BRAND, marginTop: 3 },
  profileSub:     { fontSize: 9, color: GRAY_500, marginTop: 2 },
  // ── Texto descritivo ────────────────────────────────────────
  descriptionBox: {
    backgroundColor: '#f0f4ff', borderRadius: 8,
    padding: 14, marginBottom: 16,
    borderLeftWidth: 4, borderLeftColor: BRAND,
  },
  descriptionTitle: { fontSize: 9, fontFamily: 'Helvetica-Bold', color: BRAND, marginBottom: 5, textTransform: 'uppercase', letterSpacing: 0.8 },
  descriptionText:  { fontSize: 10, color: GRAY_700, lineHeight: 1.7 },
  // ── Seções ──────────────────────────────────────────────────
  section:      { marginBottom: 16 },
  sectionTitle: {
    fontSize: 12, fontFamily: 'Helvetica-Bold', color: BRAND,
    marginBottom: 8, paddingBottom: 4,
    borderBottomWidth: 1, borderBottomColor: GRAY_200,
  },
  // ── 2 Colunas ───────────────────────────────────────────────
  row2: { flexDirection: 'row', gap: 12, marginBottom: 16 },
  col:  { flex: 1 },
  colTitle: { fontSize: 11, fontFamily: 'Helvetica-Bold', color: GRAY_900, marginBottom: 6 },
  // ── Barra de progresso ──────────────────────────────────────
  barWrap:    { marginBottom: 8 },
  barRow:     { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 3 },
  barLabel:   { fontSize: 9, color: GRAY_700 },
  barPct:     { fontSize: 9, color: GRAY_500 },
  barTrack:   { height: 10, backgroundColor: GRAY_200, borderRadius: 5, overflow: 'hidden' },
  barFill:    { height: 10, borderRadius: 5 },
  // ── Listas ──────────────────────────────────────────────────
  listItem:   { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 5 },
  listBullet: { fontSize: 11, color: BRAND, marginRight: 7, marginTop: -1 },
  listText:   { flex: 1, fontSize: 10, color: GRAY_700, lineHeight: 1.55 },
  // ── Tags ────────────────────────────────────────────────────
  tagWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 5, marginTop: 2 },
  tag:     { borderRadius: 99, paddingHorizontal: 9, paddingVertical: 3 },
  tagText: { fontSize: 8, fontFamily: 'Helvetica-Bold' },
  // ── Info card ───────────────────────────────────────────────
  infoCard: { flex: 1, borderRadius: 8, padding: 12, borderWidth: 1 },
  infoLabel: { fontSize: 8, fontFamily: 'Helvetica-Bold', marginBottom: 4, textTransform: 'uppercase', letterSpacing: 0.6 },
  infoText:  { fontSize: 10, lineHeight: 1.55 },
  // ── Highlight box ───────────────────────────────────────────
  highlight: {
    borderRadius: 8, padding: 12, marginBottom: 12,
    borderLeftWidth: 4,
  },
  highlightTitle: { fontSize: 11, fontFamily: 'Helvetica-Bold', marginBottom: 5 },
  highlightText:  { fontSize: 10, lineHeight: 1.6 },
  // ── Footer ──────────────────────────────────────────────────
  footer: {
    position: 'absolute', bottom: 22, left: 44, right: 44,
    flexDirection: 'row', justifyContent: 'space-between',
    borderTopWidth: 1, borderTopColor: GRAY_200, paddingTop: 6,
  },
  footerText: { fontSize: 7.5, color: '#9ca3af' },
})

// ============================================================
// TIPO DE ENTRADA
// ============================================================
export interface GenerateReportInput {
  testType: string
  employeeName: string
  companyName: string
  resultData: Record<string, unknown>
}

// ============================================================
// HELPERS
// ============================================================
function Footer() {
  return React.createElement(
    View, { style: styles.footer, fixed: true },
    React.createElement(Text, { style: styles.footerText }, 'Psique — Mapa Comportamental — Relatório Confidencial'),
    React.createElement(Text, {
      style: styles.footerText,
      render: ({ pageNumber, totalPages }: { pageNumber: number; totalPages: number }) => `${pageNumber} / ${totalPages}`,
    })
  )
}

function ReportHeader({ title, name, company }: { title: string; name: string; company: string }) {
  const today = new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })
  return React.createElement(
    View, { style: styles.header },
    // Lado esquerdo: logo (se existir) + título + avaliado
    React.createElement(
      View, { style: { flex: 1 } },
      HAS_LOGO
        ? React.createElement(Image, { src: LOGO_SRC!, style: { height: 32, marginBottom: 6, objectFit: 'contain', alignSelf: 'flex-start' } })
        : React.createElement(Text, { style: { fontSize: 9, color: GRAY_500, marginBottom: 4 } }, 'Psique — Mapa Comportamental'),
      React.createElement(Text, { style: styles.headerTitle }, title),
      React.createElement(Text, { style: styles.headerSubtitle }, `Avaliado: ${name}`)
    ),
    // Lado direito: empresa + data
    React.createElement(
      View, { style: { alignItems: 'flex-end' } },
      React.createElement(Text, { style: styles.headerMeta }, `${company}\n${today}`)
    )
  )
}

/** Barra de progresso colorida */
function Bar({ label, pct, color, bold = false }: { label: string; pct: number; color: string; bold?: boolean }) {
  const w = Math.max(0, Math.min(100, Math.round(pct)))
  return React.createElement(
    View, { style: styles.barWrap },
    React.createElement(
      View, { style: styles.barRow },
      React.createElement(Text, { style: { ...styles.barLabel, fontFamily: bold ? 'Helvetica-Bold' : 'Helvetica' } }, label),
      React.createElement(Text, { style: styles.barPct }, `${w}%`)
    ),
    React.createElement(
      View, { style: styles.barTrack },
      React.createElement(View, { style: { ...styles.barFill, width: `${w}%`, backgroundColor: color } })
    )
  )
}

/** Lista com bullets coloridos */
function BulletList({ items, color = BRAND }: { items: string[]; color?: string }) {
  return React.createElement(
    React.Fragment, null,
    ...items.map((item, i) =>
      React.createElement(
        View, { key: i, style: styles.listItem },
        React.createElement(Text, { style: { ...styles.listBullet, color } }, '•'),
        React.createElement(Text, { style: styles.listText }, item)
      )
    )
  )
}

/** Tags coloridas */
function Tags({ items, bg, textColor }: { items: string[]; bg: string; textColor: string }) {
  return React.createElement(
    View, { style: styles.tagWrap },
    ...items.map((item, i) =>
      React.createElement(
        View, { key: i, style: { ...styles.tag, backgroundColor: bg } },
        React.createElement(Text, { style: { ...styles.tagText, color: textColor } }, item)
      )
    )
  )
}

// ============================================================
// DISC
// ============================================================
function DISCReport({ d, name, company }: { d: Record<string, unknown>; name: string; company: string }) {
  const pct  = d.percentages as Record<string, number>
  const rep  = d.report as Record<string, unknown>
  const pred = d.predominant as string
  const sec  = d.secondary as string

  const COLORS: Record<string, string> = { D: '#ef4444', I: '#f59e0b', S: '#22c55e', C: '#3b82f6' }
  const NAMES: Record<string, string>  = { D: 'Dominante', I: 'Influente', S: 'Estável', C: 'Cauteloso' }
  const BGLITE: Record<string, string> = { D: '#fef2f2', I: '#fffbeb', S: '#f0fdf4', C: '#eff6ff' }

  return React.createElement(
    Document, null,

    // ── PÁGINA 1: Resumo e Distribuição ──────────────────────
    React.createElement(
      Page, { size: 'A4', style: styles.page },
      React.createElement(ReportHeader, { title: 'Relatório DISC', name, company }),

      // Capa do perfil
      React.createElement(
        View, { style: { ...styles.profileCard, backgroundColor: BGLITE[pred] } },
        React.createElement(
          View, { style: { ...styles.profileBadge, backgroundColor: COLORS[pred] } },
          React.createElement(Text, { style: styles.profileBadgeText }, pred)
        ),
        React.createElement(
          View, { style: { flex: 1 } },
          React.createElement(Text, { style: styles.profileName }, rep.name as string),
          React.createElement(Text, { style: styles.profileTagline }, rep.tagline as string),
          React.createElement(Text, { style: styles.profileSub }, `Combinação: ${pred + sec}  ·  Valor central: ${rep.values as string}  ·  Receio: ${rep.fear as string}`)
        )
      ),

      // Resumo narrativo
      React.createElement(
        View, { style: styles.descriptionBox },
        React.createElement(Text, { style: styles.descriptionTitle }, 'Resumo do perfil'),
        React.createElement(Text, { style: styles.descriptionText }, rep.description as string)
      ),

      // Distribuição
      React.createElement(
        View, { style: styles.section },
        React.createElement(Text, { style: styles.sectionTitle }, 'Distribuição do Perfil DISC'),
        ...(['D', 'I', 'S', 'C'] as const).map((p) =>
          React.createElement(Bar, {
            key: p,
            label: `${p} — ${NAMES[p]}`,
            pct: Math.round((pct[p] ?? 0) * 100),
            color: COLORS[p],
            bold: p === pred,
          })
        )
      ),

      // Valor / Medo
      React.createElement(
        View, { style: { flexDirection: 'row', gap: 12, marginBottom: 0 } },
        React.createElement(
          View, { style: { ...styles.infoCard, backgroundColor: '#f0fdf4', borderColor: '#bbf7d0' } },
          React.createElement(Text, { style: { ...styles.infoLabel, color: '#166534' } }, 'Valor Central'),
          React.createElement(Text, { style: { ...styles.infoText, color: '#166534' } }, rep.values as string)
        ),
        React.createElement(
          View, { style: { ...styles.infoCard, backgroundColor: '#fef2f2', borderColor: '#fecaca' } },
          React.createElement(Text, { style: { ...styles.infoLabel, color: '#991b1b' } }, 'Maior Receio'),
          React.createElement(Text, { style: { ...styles.infoText, color: '#991b1b' } }, rep.fear as string)
        ),
        React.createElement(
          View, { style: { ...styles.infoCard, backgroundColor: '#f0f4ff', borderColor: '#c7d2fe' } },
          React.createElement(Text, { style: { ...styles.infoLabel, color: '#3730a3' } }, 'Estilo de Decisão'),
          React.createElement(Text, { style: { ...styles.infoText, color: '#3730a3' } }, rep.decisionStyle as string)
        )
      ),

      React.createElement(Footer)
    ),

    // ── PÁGINA 2: Forças, Desenvolvimento, Características ──
    React.createElement(
      Page, { size: 'A4', style: styles.page },
      React.createElement(ReportHeader, { title: 'Relatório DISC', name, company }),

      // Forças e Desenvolvimento
      React.createElement(
        View, { style: styles.row2 },
        React.createElement(
          View, { style: styles.col },
          React.createElement(Text, { style: { ...styles.colTitle, color: '#166534' } }, '+ Pontos Fortes'),
          React.createElement(BulletList, { items: rep.strengths as string[], color: '#22c55e' })
        ),
        React.createElement(
          View, { style: styles.col },
          React.createElement(Text, { style: { ...styles.colTitle, color: '#991b1b' } }, '> Pontos de Desenvolvimento'),
          React.createElement(BulletList, { items: rep.improvements as string[], color: '#ef4444' })
        )
      ),

      // Características
      React.createElement(
        View, { style: styles.section },
        React.createElement(Text, { style: styles.sectionTitle }, 'Características do Perfil'),
        React.createElement(Tags, { items: rep.characteristics as string[], bg: BGLITE[pred], textColor: COLORS[pred] })
      ),

      // Ambiente ideal
      React.createElement(
        View, { style: styles.section },
        React.createElement(Text, { style: styles.sectionTitle }, 'Ambiente que Favorece este Perfil'),
        React.createElement(Tags, { items: rep.idealEnvironment as string[], bg: '#f0f4ff', textColor: '#3730a3' })
      ),

      // Contribuição para equipe
      React.createElement(
        View, { style: styles.section },
        React.createElement(Text, { style: styles.sectionTitle }, 'Contribuição para a Equipe'),
        React.createElement(Tags, { items: rep.teamValue as string[], bg: BGLITE[pred], textColor: COLORS[pred] })
      ),

      React.createElement(Footer)
    ),

    // ── PÁGINA 3: Sob Pressão e Motivações ──────────────────
    React.createElement(
      Page, { size: 'A4', style: styles.page },
      React.createElement(ReportHeader, { title: 'Relatório DISC', name, company }),

      // Sob pressão
      React.createElement(
        View, { style: { ...styles.highlight, backgroundColor: '#fef2f2', borderLeftColor: '#ef4444', marginBottom: 16 } },
        React.createElement(Text, { style: { ...styles.highlightTitle, color: '#991b1b' } }, '! Comportamento Sob Pressão'),
        React.createElement(Text, { style: { ...styles.highlightText, color: '#7f1d1d' } },
          'Em situações de estresse ou sobrecarga, pessoas com este perfil tendem a apresentar os seguintes comportamentos:'
        ),
        React.createElement(
          View, { style: { marginTop: 8 } },
          React.createElement(Tags, { items: rep.underPressure as string[], bg: '#fee2e2', textColor: '#b91c1c' })
        )
      ),

      // Motivações
      React.createElement(
        View, { style: styles.section },
        React.createElement(Text, { style: styles.sectionTitle }, 'O que Motiva este Perfil'),
        React.createElement(BulletList, { items: rep.motivations as string[], color: COLORS[pred] })
      ),

      // Box de dica final
      React.createElement(
        View, { style: { ...styles.highlight, backgroundColor: '#f0f4ff', borderLeftColor: BRAND, marginTop: 8 } },
        React.createElement(Text, { style: { ...styles.highlightTitle, color: BRAND } }, 'Dica de Desenvolvimento'),
        React.createElement(Text, { style: { ...styles.highlightText, color: '#1e3a8a' } },
          `Para maximizar o potencial do perfil ${rep.name as string}, o caminho de desenvolvimento passa por reconhecer os pontos de tensão e cultivar conscientemente as habilidades complementares ao seu estilo natural. Pequenos ajustes no dia a dia criam resultados significativos a longo prazo.`
        )
      ),

      React.createElement(Footer)
    )
  )
}

// ============================================================
// MBTI
// ============================================================
function MBTIReport({ d, name, company }: { d: Record<string, unknown>; name: string; company: string }) {
  const type   = d.type as string
  const scores = d.scores as Record<string, number>
  const rep    = d.report as Record<string, unknown>

  const dims = [
    { label: 'Extraversão / Introversão', poleA: 'E', poleB: 'I', maxA: 30,  maxB: 30  },
    { label: 'Sensação / Intuição',       poleA: 'S', poleB: 'N', maxA: 54,  maxB: 54  },
    { label: 'Pensamento / Sentimento',   poleA: 'T', poleB: 'F', maxA: 54,  maxB: 54  },
    { label: 'Julgamento / Percepção',    poleA: 'J', poleB: 'P', maxA: 48,  maxB: 48  },
  ]

  return React.createElement(
    Document, null,

    // ── PÁGINA 1 ──────────────────────────────────────────────
    React.createElement(
      Page, { size: 'A4', style: styles.page },
      React.createElement(ReportHeader, { title: `Relatório MBTI`, name, company }),

      // Capa do perfil
      React.createElement(
        View, { style: { ...styles.profileCard, backgroundColor: '#eef2ff' } },
        React.createElement(
          View, { style: { ...styles.profileBadge, backgroundColor: BRAND } },
          React.createElement(Text, { style: { ...styles.profileBadgeText, fontSize: type.length > 3 ? 14 : 20 } }, type)
        ),
        React.createElement(
          View, { style: { flex: 1 } },
          React.createElement(Text, { style: styles.profileName }, rep.name as string),
          React.createElement(Text, { style: styles.profileTagline }, `"${rep.tagline as string}"`),
          React.createElement(Text, { style: styles.profileSub }, `Tipo: ${type}`)
        )
      ),

      // Descrição
      React.createElement(
        View, { style: styles.descriptionBox },
        React.createElement(Text, { style: styles.descriptionTitle }, 'Sobre este perfil'),
        React.createElement(Text, { style: styles.descriptionText }, rep.description as string)
      ),

      // Dimensões
      React.createElement(
        View, { style: styles.section },
        React.createElement(Text, { style: styles.sectionTitle }, 'Análise por Dimensão'),
        ...dims.flatMap((dim) => {
          const pctA = Math.round(((scores[dim.poleA] ?? 0) / dim.maxA) * 100)
          const pctB = Math.round(((scores[dim.poleB] ?? 0) / dim.maxB) * 100)
          const winA = pctA >= pctB
          return [
            React.createElement(
              View, { key: dim.label, style: { marginBottom: 12 } },
              React.createElement(Text, { style: { fontSize: 9, fontFamily: 'Helvetica-Bold', color: GRAY_700, marginBottom: 5 } }, dim.label),
              React.createElement(Bar, { label: `${dim.poleA} — ${poleLabel(dim.poleA)}`, pct: pctA, color: BRAND, bold: winA }),
              React.createElement(Bar, { label: `${dim.poleB} — ${poleLabel(dim.poleB)}`, pct: pctB, color: '#6366f1', bold: !winA })
            )
          ]
        })
      ),

      React.createElement(Footer)
    ),

    // ── PÁGINA 2 ──────────────────────────────────────────────
    React.createElement(
      Page, { size: 'A4', style: styles.page },
      React.createElement(ReportHeader, { title: `Relatório MBTI`, name, company }),

      // Forças / Fraquezas
      React.createElement(
        View, { style: styles.row2 },
        React.createElement(
          View, { style: styles.col },
          React.createElement(Text, { style: { ...styles.colTitle, color: '#166534' } }, '+ Pontos Fortes'),
          React.createElement(BulletList, { items: rep.strengths as string[], color: '#22c55e' })
        ),
        React.createElement(
          View, { style: styles.col },
          React.createElement(Text, { style: { ...styles.colTitle, color: '#991b1b' } }, '> Pontos de Desenvolvimento'),
          React.createElement(BulletList, { items: rep.weaknesses as string[], color: '#ef4444' })
        )
      ),

      // Carreiras
      React.createElement(
        View, { style: styles.section },
        React.createElement(Text, { style: styles.sectionTitle }, 'Carreiras e Funções Recomendadas'),
        React.createElement(Tags, { items: rep.careers as string[], bg: '#eef2ff', textColor: BRAND })
      ),

      // Dica
      React.createElement(
        View, { style: { ...styles.highlight, backgroundColor: '#f0f4ff', borderLeftColor: BRAND, marginTop: 8 } },
        React.createElement(Text, { style: { ...styles.highlightTitle, color: BRAND } }, 'Insight sobre o perfil'),
        React.createElement(Text, { style: { ...styles.highlightText, color: '#1e3a8a' } },
          `O tipo ${type} possui uma combinação única de características que, quando bem aproveitadas, geram impacto genuíno. O autoconhecimento é o primeiro passo: reconhecer suas preferências naturais permite que você as amplifique intencionalmente e saiba quando flexibilizá-las conforme o contexto exige.`
        )
      ),

      React.createElement(Footer)
    )
  )
}

function poleLabel(p: string) {
  const map: Record<string, string> = {
    E: 'Extraversão', I: 'Introversão',
    S: 'Sensação', N: 'Intuição',
    T: 'Pensamento', F: 'Sentimento',
    J: 'Julgamento', P: 'Percepção',
  }
  return map[p] ?? p
}

// ============================================================
// ENEAGRAMA
// ⚠ JSON.parse converte chaves numéricas para string → usar String(t)
// ============================================================
function EnneagramReport({ d, name, company }: { d: Record<string, unknown>; name: string; company: string }) {
  const predominant  = d.predominant as number
  const scores       = d.scores as Record<string, number>   // chaves são strings após JSON.parse
  const percentages  = d.percentages as Record<string, number>
  const interpretation = d.interpretation as Record<string, string>
  const rep          = d.report as Record<string, unknown>

  const TYPE_COLORS: Record<number, string> = {
    1: '#ef4444', 2: '#f59e0b', 3: '#eab308',
    4: '#8b5cf6', 5: '#06b6d4', 6: '#3b82f6',
    7: '#f97316', 8: '#dc2626', 9: '#22c55e',
  }
  const color = TYPE_COLORS[predominant] ?? BRAND
  const BGLITE = color + '1a' // ~10% opacity hex trick

  const wings = rep.wings as Array<{ wing: string; description: string }>

  return React.createElement(
    Document, null,

    // ── PÁGINA 1 ──────────────────────────────────────────────
    React.createElement(
      Page, { size: 'A4', style: styles.page },
      React.createElement(ReportHeader, { title: `Relatório Eneagrama`, name, company }),

      // Perfil
      React.createElement(
        View, { style: { ...styles.profileCard, backgroundColor: '#f9fafb', borderWidth: 1, borderColor: GRAY_200 } },
        React.createElement(
          View, { style: { ...styles.profileBadge, backgroundColor: color } },
          React.createElement(Text, { style: styles.profileBadgeText }, String(predominant))
        ),
        React.createElement(
          View, { style: { flex: 1 } },
          React.createElement(Text, { style: styles.profileName }, rep.name as string),
          React.createElement(Text, { style: { ...styles.profileTagline, color } }, rep.altName as string),
          React.createElement(Text, { style: styles.profileSub }, rep.tagline as string)
        )
      ),

      // Interpretação
      React.createElement(
        View, { style: { ...styles.descriptionBox, borderLeftColor: color } },
        React.createElement(Text, { style: { ...styles.descriptionTitle, color } }, 'Interpretação'),
        React.createElement(Text, { style: styles.descriptionText }, interpretation[predominant] ?? '')
      ),

      // Motivação / Medo
      React.createElement(
        View, { style: { flexDirection: 'row', gap: 12, marginBottom: 16 } },
        React.createElement(
          View, { style: { ...styles.infoCard, backgroundColor: '#f0fdf4', borderColor: '#bbf7d0' } },
          React.createElement(Text, { style: { ...styles.infoLabel, color: '#166534' } }, 'Motivação Central'),
          React.createElement(Text, { style: { ...styles.infoText, color: '#166534' } }, rep.motivation as string)
        ),
        React.createElement(
          View, { style: { ...styles.infoCard, backgroundColor: '#fef2f2', borderColor: '#fecaca' } },
          React.createElement(Text, { style: { ...styles.infoLabel, color: '#991b1b' } }, 'Medo Central'),
          React.createElement(Text, { style: { ...styles.infoText, color: '#991b1b' } }, rep.basicFear as string)
        )
      ),

      // Pontuação por tipo
      React.createElement(
        View, { style: styles.section },
        React.createElement(Text, { style: styles.sectionTitle }, 'Pontuação por Tipo (máx. 75 pts)'),
        ...[1, 2, 3, 4, 5, 6, 7, 8, 9].map((t) => {
          const score = scores[String(t)] ?? 0   // ← FIX: chave string
          const pct   = (score / 75) * 100
          return React.createElement(Bar, {
            key: t,
            label: `Tipo ${t}${t === predominant ? ` — ${rep.name as string}` : ''}`,
            pct,
            color: t === predominant ? color : '#94a3b8',
            bold: t === predominant,
          })
        })
      ),

      React.createElement(Footer)
    ),

    // ── PÁGINA 2 ──────────────────────────────────────────────
    React.createElement(
      Page, { size: 'A4', style: styles.page },
      React.createElement(ReportHeader, { title: `Relatório Eneagrama`, name, company }),

      // Foco de atenção
      React.createElement(
        View, { style: { ...styles.highlight, backgroundColor: '#f9fafb', borderLeftColor: color, marginBottom: 16 } },
        React.createElement(Text, { style: { ...styles.highlightTitle, color } }, 'Foco de Atenção'),
        React.createElement(Text, { style: styles.highlightText }, rep.focusOfAttention as string)
      ),

      // Forças / Desafios
      React.createElement(
        View, { style: styles.row2 },
        React.createElement(
          View, { style: styles.col },
          React.createElement(Text, { style: { ...styles.colTitle, color: '#166534' } }, '+ Pontos Fortes'),
          React.createElement(BulletList, { items: rep.strengths as string[], color: '#22c55e' })
        ),
        React.createElement(
          View, { style: styles.col },
          React.createElement(Text, { style: { ...styles.colTitle, color: '#991b1b' } }, '> Pontos de Desenvolvimento'),
          React.createElement(BulletList, { items: rep.challenges as string[], color: '#ef4444' })
        )
      ),

      // Asas
      React.createElement(
        View, { style: styles.section },
        React.createElement(Text, { style: styles.sectionTitle }, 'Asas — Influências Secundárias'),
        ...wings.map((w, i) =>
          React.createElement(
            View, { key: i, style: { ...styles.highlight, backgroundColor: '#f5f3ff', borderLeftColor: '#7c3aed', marginBottom: 8 } },
            React.createElement(Text, { style: { ...styles.highlightTitle, color: '#5b21b6' } }, `Asa ${w.wing}`),
            React.createElement(Text, { style: { ...styles.highlightText, color: '#4c1d95' } }, w.description)
          )
        )
      ),

      // Caminhos de desenvolvimento
      React.createElement(
        View, { style: styles.section },
        React.createElement(Text, { style: styles.sectionTitle }, 'Caminhos de Desenvolvimento'),
        React.createElement(BulletList, { items: rep.development as string[], color })
      ),

      React.createElement(Footer)
    )
  )
}

// ============================================================
// TEMPERAMENTOS
// ============================================================
function TemperamentReport({ d, name, company }: { d: Record<string, unknown>; name: string; company: string }) {
  const primaryType     = d.primaryType as string
  const secondaryType   = d.secondaryType as string
  const profile         = d.profile as Record<string, unknown>
  const secondaryProfile = d.secondaryProfile as Record<string, unknown>
  const interpretation  = d.interpretation as string
  const scores          = d.scores as Record<string, number>
  const percentages     = d.percentages as Record<string, number>

  const COLORS: Record<string, string> = {
    COLERICO: '#ef4444', SANGUINEO: '#f59e0b', MELANCOLICO: '#8b5cf6', FLEUMATICO: '#22c55e',
  }
  const LABELS: Record<string, string> = {
    COLERICO: 'Colérico', SANGUINEO: 'Sanguíneo', MELANCOLICO: 'Melancólico', FLEUMATICO: 'Fleumático',
  }
  const types = ['COLERICO', 'SANGUINEO', 'MELANCOLICO', 'FLEUMATICO']
  const pc = COLORS[primaryType] ?? BRAND
  const sc = COLORS[secondaryType] ?? '#94a3b8'

  return React.createElement(
    Document, null,

    // ── PÁGINA 1 ──────────────────────────────────────────────
    React.createElement(
      Page, { size: 'A4', style: styles.page },
      React.createElement(ReportHeader, { title: '4 Temperamentos', name, company }),

      // Perfil
      React.createElement(
        View, { style: { ...styles.profileCard, backgroundColor: '#f9fafb', borderWidth: 1, borderColor: GRAY_200 } },
        React.createElement(
          View, { style: { ...styles.profileBadge, backgroundColor: pc } },
          React.createElement(Text, { style: { ...styles.profileBadgeText, fontSize: 16 } }, (profile.name as string).charAt(0))
        ),
        React.createElement(
          View, { style: { flex: 1 } },
          React.createElement(Text, { style: styles.profileName }, profile.title as string),
          React.createElement(Text, { style: { ...styles.profileTagline, color: pc } }, profile.name as string),
          React.createElement(Text, { style: styles.profileSub }, `Secundário: ${secondaryProfile.name as string}`)
        )
      ),

      // Interpretação
      React.createElement(
        View, { style: { ...styles.descriptionBox, borderLeftColor: pc } },
        React.createElement(Text, { style: { ...styles.descriptionTitle, color: pc } }, 'Resumo do perfil'),
        React.createElement(Text, { style: styles.descriptionText }, interpretation)
      ),

      // Distribuição
      React.createElement(
        View, { style: styles.section },
        React.createElement(Text, { style: styles.sectionTitle }, 'Distribuição dos Temperamentos'),
        ...types
          .slice()
          .sort((a, b) => (percentages[b] ?? 0) - (percentages[a] ?? 0))
          .map((t) =>
            React.createElement(Bar, {
              key: t,
              label: `${LABELS[t]} (${scores[t] ?? 0} pts)`,
              pct: percentages[t] ?? 0,
              color: COLORS[t],
              bold: t === primaryType,
            })
          )
      ),

      // Descrição do perfil
      React.createElement(
        View, { style: { ...styles.highlight, backgroundColor: '#f9fafb', borderLeftColor: pc } },
        React.createElement(Text, { style: { ...styles.highlightTitle, color: pc } }, `Sobre o perfil ${profile.name as string}`),
        React.createElement(Text, { style: styles.highlightText }, profile.description as string)
      ),

      React.createElement(Footer)
    ),

    // ── PÁGINA 2 ──────────────────────────────────────────────
    React.createElement(
      Page, { size: 'A4', style: styles.page },
      React.createElement(ReportHeader, { title: '4 Temperamentos', name, company }),

      // Forças / Desafios
      React.createElement(
        View, { style: styles.row2 },
        React.createElement(
          View, { style: styles.col },
          React.createElement(Text, { style: { ...styles.colTitle, color: '#166534' } }, '+ Pontos Fortes'),
          React.createElement(BulletList, { items: profile.strengths as string[], color: '#22c55e' })
        ),
        React.createElement(
          View, { style: styles.col },
          React.createElement(Text, { style: { ...styles.colTitle, color: '#991b1b' } }, '> Pontos de Desenvolvimento'),
          React.createElement(BulletList, { items: profile.challenges as string[], color: '#ef4444' })
        )
      ),

      // Estilo de trabalho / Comunicação
      React.createElement(
        View, { style: { flexDirection: 'row', gap: 12, marginBottom: 16 } },
        React.createElement(
          View, { style: { ...styles.infoCard, backgroundColor: '#f0f9ff', borderColor: '#bae6fd' } },
          React.createElement(Text, { style: { ...styles.infoLabel, color: '#0369a1' } }, 'Estilo de Trabalho'),
          React.createElement(Text, { style: { ...styles.infoText, color: '#0c4a6e' } }, profile.workStyle as string)
        ),
        React.createElement(
          View, { style: { ...styles.infoCard, backgroundColor: '#fdf4ff', borderColor: '#e9d5ff' } },
          React.createElement(Text, { style: { ...styles.infoLabel, color: '#7e22ce' } }, 'Comunicação'),
          React.createElement(Text, { style: { ...styles.infoText, color: '#581c87' } }, profile.communication as string)
        )
      ),

      // Influência secundária
      React.createElement(
        View, { style: { ...styles.highlight, backgroundColor: '#f9fafb', borderLeftColor: sc, marginBottom: 16 } },
        React.createElement(Text, { style: { ...styles.highlightTitle, color: sc } },
          `Influência Secundária: ${secondaryProfile.name as string}`
        ),
        React.createElement(Text, { style: styles.highlightText }, secondaryProfile.description as string)
      ),

      // Funções ideais
      React.createElement(
        View, { style: styles.section },
        React.createElement(Text, { style: styles.sectionTitle }, 'Funções e Cargos Recomendados'),
        React.createElement(Tags, { items: profile.idealRoles as string[], bg: '#eff6ff', textColor: BRAND })
      ),

      React.createElement(Footer)
    )
  )
}

// ============================================================
// FUNÇÃO PRINCIPAL
// ============================================================
export async function generateReport(input: GenerateReportInput): Promise<Buffer> {
  const { testType, employeeName, companyName, resultData } = input

  let doc: React.ReactElement

  switch (testType) {
    case 'DISC':
      doc = React.createElement(DISCReport, { d: resultData, name: employeeName, company: companyName })
      break
    case 'MBTI':
      doc = React.createElement(MBTIReport, { d: resultData, name: employeeName, company: companyName })
      break
    case 'ENNEAGRAM':
      doc = React.createElement(EnneagramReport, { d: resultData, name: employeeName, company: companyName })
      break
    case 'TEMPERAMENT':
      doc = React.createElement(TemperamentReport, { d: resultData, name: employeeName, company: companyName })
      break
    default:
      doc = React.createElement(
        Document, null,
        React.createElement(
          Page, { size: 'A4', style: styles.page },
          React.createElement(ReportHeader, { title: `Relatório ${testType}`, name: employeeName, company: companyName }),
          React.createElement(
            View, { style: styles.descriptionBox },
            React.createElement(Text, { style: styles.descriptionTitle }, 'Resultado'),
            React.createElement(Text, { style: styles.descriptionText }, JSON.stringify(resultData, null, 2))
          )
        )
      )
  }

  const buffer = await renderToBuffer(doc)
  return Buffer.from(buffer)
}

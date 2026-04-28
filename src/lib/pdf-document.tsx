// ============================================================
// src/lib/pdf-document.tsx
// Renderiza um PdfBody completo como PDF multi-página via
// @react-pdf/renderer. Inclui: capa personalizada, sumário,
// capítulos, anexos, fechamento — tudo na paleta do Mapa
// Comportamental (teal + dourado).
// ============================================================

import {
  Document, Page, Text, View, Image, StyleSheet, renderToBuffer,
  Font,
} from '@react-pdf/renderer'
import React from 'react'
import type { PdfBlock, PdfBody, PdfChapter } from '@/content/disc/types'

// ─── Paleta + tipografia ────────────────────────────────────
export const PALETTE = {
  teal:        '#1F5159',
  tealDark:    '#143A40',
  gold:        '#C9A24B',
  goldDark:    '#A47F2C',
  cream:       '#F5EFE3',
  sand:        '#E9DEC8',
  ink:         '#1C1A17',
  inkSoft:     '#3A4254',
  white:       '#FFFFFF',
  border:      '#E0D4BD',
}

// ─── Estilos ────────────────────────────────────────────────
const styles = StyleSheet.create({
  page: {
    paddingTop:    72,
    paddingBottom: 64,
    paddingHorizontal: 60,
    fontFamily: 'Helvetica',
    color:      PALETTE.ink,
    backgroundColor: PALETTE.cream,
    fontSize:   11,
    lineHeight: 1.55,
  },

  // ─── Header (em todas as páginas internas) ────────────────
  header: {
    position: 'absolute',
    top: 24, left: 60, right: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: 8,
    color: PALETTE.tealDark,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  headerLogo: { width: 90, height: 26, objectFit: 'contain' },

  // ─── Footer ───────────────────────────────────────────────
  footer: {
    position: 'absolute',
    bottom: 28, left: 60, right: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 7,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    color: '#9b9484',
  },

  // ─── CAPA ─────────────────────────────────────────────────
  coverBrand: {
    fontSize: 9, letterSpacing: 3, textTransform: 'uppercase',
    color: PALETTE.gold, fontWeight: 700, marginBottom: 22,
  },
  coverKindTag: {
    fontSize: 9, letterSpacing: 4, textTransform: 'uppercase',
    fontWeight: 700, marginBottom: 14, color: PALETTE.teal,
  },
  coverTitle: {
    fontSize: 38, fontWeight: 700, lineHeight: 1.12,
    color: PALETTE.teal, marginBottom: 18,
  },
  coverProfile: {
    fontSize: 13, color: PALETTE.inkSoft, fontStyle: 'italic', marginBottom: 56,
  },
  coverDivider: { height: 1, backgroundColor: PALETTE.border, marginVertical: 22 },
  coverGreeting: {
    fontSize: 10, textTransform: 'uppercase', letterSpacing: 2,
    color: PALETTE.inkSoft, marginBottom: 6,
  },
  coverUserName: {
    fontSize: 22, fontWeight: 700, marginBottom: 4, color: PALETTE.gold,
  },
  coverDate: { fontSize: 10, color: '#7a8298', marginBottom: 36 },
  coverIntro: {
    fontSize: 11, lineHeight: 1.6, color: PALETTE.inkSoft, marginBottom: 14,
  },
  coverHighlight: { color: PALETTE.gold, fontWeight: 700 },
  coverFooter: {
    position: 'absolute', bottom: 36, left: 60, right: 60,
    textAlign: 'center', fontSize: 7,
    letterSpacing: 1.5, textTransform: 'uppercase', color: '#9b9484',
  },
  coverLogo: { position: 'absolute', top: 60, right: 60, width: 110, height: 32, objectFit: 'contain' },

  // ─── Epígrafe (após a capa) ──────────────────────────────
  epigraphPage: {
    paddingTop: 200, paddingHorizontal: 80,
  },
  epigraphText: {
    fontSize: 18, fontStyle: 'italic', lineHeight: 1.5,
    color: PALETTE.teal, textAlign: 'center', marginBottom: 12,
  },
  epigraphAttr: {
    fontSize: 10, color: PALETTE.inkSoft, textAlign: 'center',
    letterSpacing: 1.4, textTransform: 'uppercase',
  },

  // ─── Sumário ──────────────────────────────────────────────
  tocTitle: {
    fontSize: 14, fontWeight: 700, color: PALETTE.teal,
    letterSpacing: 2, textTransform: 'uppercase', marginBottom: 24,
  },
  tocItem: {
    flexDirection: 'row',
    fontSize: 11, color: PALETTE.ink,
    marginBottom: 9,
  },
  tocItemNum: { width: 30, color: PALETTE.gold, fontWeight: 700 },
  tocItemTitle: { flex: 1 },

  // ─── Capítulo ─────────────────────────────────────────────
  chapterNumber: {
    fontSize: 9, letterSpacing: 3, textTransform: 'uppercase',
    color: PALETTE.gold, fontWeight: 700, marginBottom: 8,
  },
  chapterTitle: {
    fontSize: 24, fontWeight: 700, lineHeight: 1.2,
    color: PALETTE.teal, marginBottom: 4,
  },
  chapterSubtitle: {
    fontSize: 12, color: PALETTE.inkSoft, fontStyle: 'italic',
    marginBottom: 24,
  },
  chapterDivider: {
    width: 36, height: 2, backgroundColor: PALETTE.gold,
    marginBottom: 22,
  },

  // ─── Tipografia interna ──────────────────────────────────
  h1: { fontSize: 18, fontWeight: 700, color: PALETTE.teal, marginTop: 14, marginBottom: 8 },
  h2: { fontSize: 14, fontWeight: 700, color: PALETTE.teal, marginTop: 12, marginBottom: 6 },
  h3: {
    fontSize: 10, fontWeight: 700, color: PALETTE.gold,
    letterSpacing: 1.6, textTransform: 'uppercase', marginTop: 10, marginBottom: 4,
  },
  p: { marginBottom: 9 },
  lead: {
    fontSize: 13, fontStyle: 'italic', color: PALETTE.teal,
    lineHeight: 1.55, marginBottom: 12,
  },
  quote: {
    borderLeftWidth: 3, borderLeftColor: PALETTE.gold,
    paddingLeft: 12, paddingVertical: 6,
    marginVertical: 12, fontStyle: 'italic', color: PALETTE.inkSoft,
  },
  quoteAuthor: { marginTop: 4, fontSize: 9, color: '#9b9484' },

  // ─── Listas ──────────────────────────────────────────────
  listItem: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  listBullet: { width: 14, color: PALETTE.gold, fontWeight: 700 },
  listText: { flex: 1 },

  // ─── Callouts ────────────────────────────────────────────
  callout: {
    padding: 10, marginVertical: 10, borderRadius: 4,
    borderLeftWidth: 3,
  },
  calloutDo:      { backgroundColor: '#EFF6EF', borderLeftColor: '#2F7A3A' },
  calloutDont:    { backgroundColor: '#FBEAE5', borderLeftColor: '#C0392B' },
  calloutTip:     { backgroundColor: '#F2EFE3', borderLeftColor: PALETTE.gold },
  calloutWarning: { backgroundColor: '#FFF3E0', borderLeftColor: '#A04A1F' },
  calloutTone: {
    fontSize: 8, fontWeight: 700, letterSpacing: 1.5,
    textTransform: 'uppercase', marginBottom: 4,
  },

  // ─── Table ───────────────────────────────────────────────
  table: { marginVertical: 10, borderTopWidth: 1, borderTopColor: PALETTE.border },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1, borderBottomColor: PALETTE.border,
  },
  tableHeader: {
    backgroundColor: PALETTE.teal,
  },
  tableCell: {
    flex: 1, padding: 6, fontSize: 9,
  },
  tableHeaderCell: {
    color: PALETTE.gold, fontWeight: 700,
    textTransform: 'uppercase', letterSpacing: 1,
  },

  // ─── Script ──────────────────────────────────────────────
  script: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1, borderColor: PALETTE.border,
    padding: 12, borderRadius: 6, marginVertical: 10,
  },
  scriptRole: {
    fontSize: 8, fontWeight: 700, letterSpacing: 1.4,
    color: PALETTE.gold, textTransform: 'uppercase', marginBottom: 6,
  },
  scriptSay:   { fontStyle: 'italic', color: PALETTE.teal, marginBottom: 6 },
  scriptDont:  { fontStyle: 'italic', color: '#C0392B', textDecoration: 'line-through' },

  // ─── KV ──────────────────────────────────────────────────
  kvRow: { flexDirection: 'row', marginBottom: 5 },
  kvKey: { width: 110, fontSize: 9, fontWeight: 700, color: PALETTE.teal, textTransform: 'uppercase', letterSpacing: 1 },
  kvVal: { flex: 1 },

  // ─── Closing ─────────────────────────────────────────────
  closingPage: { paddingTop: 240, paddingHorizontal: 80, alignItems: 'center' },
  closingHeadline: {
    fontSize: 24, fontWeight: 700, color: PALETTE.teal,
    textAlign: 'center', lineHeight: 1.25, marginBottom: 14,
  },
  closingSub: {
    fontSize: 12, color: PALETTE.inkSoft, textAlign: 'center',
    fontStyle: 'italic', maxWidth: 400,
  },
})

// ─── Renderização de blocks ─────────────────────────────────
function renderBlock(b: PdfBlock, i: number): React.ReactNode {
  switch (b.type) {
    case 'h1':   return <Text key={i} style={styles.h1}>{b.text}</Text>
    case 'h2':   return <Text key={i} style={styles.h2}>{b.text}</Text>
    case 'h3':   return <Text key={i} style={styles.h3}>{b.text}</Text>
    case 'p':    return <Text key={i} style={styles.p}>{b.text}</Text>
    case 'lead': return <Text key={i} style={styles.lead}>{b.text}</Text>

    case 'quote':
      return (
        <View key={i} style={styles.quote}>
          <Text>{b.text}</Text>
          {b.author && <Text style={styles.quoteAuthor}>— {b.author}</Text>}
        </View>
      )

    case 'callout': {
      const toneStyle = {
        do:      styles.calloutDo,
        dont:    styles.calloutDont,
        tip:     styles.calloutTip,
        warning: styles.calloutWarning,
      }[b.tone]
      const toneLabel = { do: '✓ Faça', dont: '✗ Não faça', tip: '💡 Dica', warning: '⚠ Atenção' }[b.tone]
      return (
        <View key={i} style={[styles.callout, toneStyle]}>
          <Text style={styles.calloutTone}>{toneLabel}</Text>
          <Text>{b.text}</Text>
        </View>
      )
    }

    case 'list':
      return (
        <View key={i}>
          {b.items.map((it, j) => (
            <View key={j} style={styles.listItem}>
              <Text style={styles.listBullet}>{b.ordered ? `${j + 1}.` : '·'}</Text>
              <Text style={styles.listText}>{it}</Text>
            </View>
          ))}
        </View>
      )

    case 'check':
      return (
        <View key={i}>
          {b.items.map((it, j) => (
            <View key={j} style={styles.listItem}>
              <Text style={styles.listBullet}>☐</Text>
              <Text style={styles.listText}>{it}</Text>
            </View>
          ))}
        </View>
      )

    case 'kv':
      return (
        <View key={i} style={{ marginVertical: 8 }}>
          {b.items.map((it, j) => (
            <View key={j} style={styles.kvRow}>
              <Text style={styles.kvKey}>{it.k}</Text>
              <Text style={styles.kvVal}>{it.v}</Text>
            </View>
          ))}
        </View>
      )

    case 'table':
      return (
        <View key={i} style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            {b.headers.map((h, j) => (
              <Text key={j} style={[styles.tableCell, styles.tableHeaderCell]}>{h}</Text>
            ))}
          </View>
          {b.rows.map((row, j) => (
            <View key={j} style={[styles.tableRow, j % 2 === 1 ? { backgroundColor: '#FAF6EE' } : {}]}>
              {row.map((cell, k) => (
                <Text key={k} style={styles.tableCell}>{cell}</Text>
              ))}
            </View>
          ))}
        </View>
      )

    case 'script':
      return (
        <View key={i} style={styles.script}>
          {b.role && <Text style={styles.scriptRole}>{b.role}</Text>}
          <Text style={styles.scriptSay}>“{b.sayThis}”</Text>
          {b.notThis && <Text style={styles.scriptDont}>“{b.notThis}”</Text>}
        </View>
      )

    case 'spacer':
      return <View key={i} style={{ height: { sm: 6, md: 12, lg: 24 }[b.size ?? 'md'] }} />

    case 'pageBreak':
      // tratado no nível superior — divide em pages
      return null
  }
}

// ─── Quebra blocks por pageBreak ───────────────────────────
function chunksByPageBreak(blocks: PdfBlock[]): PdfBlock[][] {
  const chunks: PdfBlock[][] = []
  let cur: PdfBlock[] = []
  for (const b of blocks) {
    if (b.type === 'pageBreak') {
      if (cur.length) chunks.push(cur)
      cur = []
    } else cur.push(b)
  }
  if (cur.length) chunks.push(cur)
  return chunks
}

// ─── Componente: Capítulo ─────────────────────────────────
function ChapterPages({ chapter, logoSrc, runningTitle }: {
  chapter: PdfChapter
  logoSrc?: string
  runningTitle: string
}) {
  const blockChunks = chunksByPageBreak(chapter.blocks)
  return (
    <>
      {blockChunks.map((chunk, idx) => (
        <Page size="A4" style={styles.page} key={idx}>
          <Header logoSrc={logoSrc} runningTitle={runningTitle} />
          {idx === 0 && (
            <>
              {chapter.number !== undefined && (
                <Text style={styles.chapterNumber}>Capítulo {chapter.number}</Text>
              )}
              <Text style={styles.chapterTitle}>{chapter.title}</Text>
              {chapter.subtitle && <Text style={styles.chapterSubtitle}>{chapter.subtitle}</Text>}
              <View style={styles.chapterDivider} />
            </>
          )}
          {chunk.map(renderBlock)}
          <Footer />
        </Page>
      ))}
    </>
  )
}

function Header({ logoSrc, runningTitle }: { logoSrc?: string; runningTitle: string }) {
  return (
    <View style={styles.header} fixed>
      <Text>{runningTitle}</Text>
      {logoSrc && <Image src={logoSrc} style={styles.headerLogo} />}
    </View>
  )
}

function Footer() {
  return (
    <View style={styles.footer} fixed>
      <Text>Mapa Comportamental</Text>
      <Text render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} />
    </View>
  )
}

// ─── Cover Page ─────────────────────────────────────────────
function CoverPage({
  body, materialTitle, materialKind, profileLabel, paletteHex,
  userName, issuedAt, logoSrc,
}: {
  body: PdfBody
  materialTitle: string
  materialKind: string
  profileLabel: string
  paletteHex: string
  userName: string
  issuedAt: Date
  logoSrc?: string
}) {
  const dateLabel = issuedAt.toLocaleDateString('pt-BR', {
    day: '2-digit', month: 'long', year: 'numeric',
  })
  return (
    <Page size="A4" style={styles.page}>
      {logoSrc && <Image src={logoSrc} style={styles.coverLogo} />}
      <Text style={styles.coverBrand}>Mapa Comportamental · Passaporte de Autoconhecimento</Text>
      <Text style={[styles.coverKindTag, { color: paletteHex }]}>{materialKind} · {body.runningTitle}</Text>
      <Text style={styles.coverTitle}>{materialTitle}</Text>
      <Text style={styles.coverProfile}>Material exclusivo do perfil {profileLabel}</Text>
      <View style={styles.coverDivider} />
      <Text style={styles.coverGreeting}>Personalizado para</Text>
      <Text style={[styles.coverUserName, { color: paletteHex }]}>{userName}</Text>
      <Text style={styles.coverDate}>Emitido em {dateLabel}</Text>
      <Text style={styles.coverIntro}>
        Este material faz parte do seu Relatório Premium. Use-o como
        <Text style={styles.coverHighlight}> guia prático</Text> — leia, anote, aplique.
      </Text>
      <Text style={styles.coverIntro}>
        Cada página foi pensada para o seu perfil específico. Os exercícios ganham
        potência quando repetidos em ciclos curtos.
      </Text>
      <Text style={styles.coverFooter}>
        © Mapa Comportamental · Distribuição autorizada apenas para {userName}
      </Text>
    </Page>
  )
}

// ─── Sumário ─────────────────────────────────────────────────
function TocPage({ body, logoSrc, runningTitle }: { body: PdfBody; logoSrc?: string; runningTitle: string }) {
  const all = [...body.chapters, ...(body.appendices ?? [])]
  return (
    <Page size="A4" style={styles.page}>
      <Header logoSrc={logoSrc} runningTitle={runningTitle} />
      <Text style={styles.tocTitle}>Sumário</Text>
      {all.map((c, i) => (
        <View key={i} style={styles.tocItem}>
          <Text style={styles.tocItemNum}>{c.number !== undefined ? `${c.number}.` : '·'}</Text>
          <Text style={styles.tocItemTitle}>{c.title}{c.subtitle ? ` — ${c.subtitle}` : ''}</Text>
        </View>
      ))}
      <Footer />
    </Page>
  )
}

// ─── Documento principal ────────────────────────────────────
export interface RenderInput {
  body: PdfBody
  materialTitle: string
  materialKind: string
  profileLabel: string
  paletteHex: string
  userName: string
  issuedAt?: Date
  logoSrc?: string
}

function FullDoc(input: RenderInput) {
  const issuedAt = input.issuedAt ?? new Date()
  return (
    <Document
      title={`${input.materialTitle} — ${input.userName}`}
      author="Mapa Comportamental"
      subject={input.profileLabel}
      keywords="mapa comportamental, passaporte de autoconhecimento, premium"
    >
      <CoverPage {...input} body={input.body} issuedAt={issuedAt} />

      {input.body.epigraph && (
        <Page size="A4" style={[styles.page, styles.epigraphPage]}>
          <Header logoSrc={input.logoSrc} runningTitle={input.body.runningTitle} />
          <Text style={styles.epigraphText}>“{input.body.epigraph.text}”</Text>
          {input.body.epigraph.attribution && (
            <Text style={styles.epigraphAttr}>{input.body.epigraph.attribution}</Text>
          )}
          <Footer />
        </Page>
      )}

      <TocPage body={input.body} logoSrc={input.logoSrc} runningTitle={input.body.runningTitle} />

      {input.body.chapters.map((c, i) => (
        <ChapterPages key={i} chapter={c} logoSrc={input.logoSrc} runningTitle={input.body.runningTitle} />
      ))}
      {input.body.appendices?.map((c, i) => (
        <ChapterPages key={`a-${i}`} chapter={c} logoSrc={input.logoSrc} runningTitle={input.body.runningTitle} />
      ))}

      {input.body.closing && (
        <Page size="A4" style={[styles.page, styles.closingPage]}>
          <Header logoSrc={input.logoSrc} runningTitle={input.body.runningTitle} />
          <Text style={styles.closingHeadline}>{input.body.closing.headline}</Text>
          {input.body.closing.subtext && <Text style={styles.closingSub}>{input.body.closing.subtext}</Text>}
          <Footer />
        </Page>
      )}
    </Document>
  )
}

export async function renderFullPdf(input: RenderInput): Promise<Buffer> {
  return renderToBuffer(<FullDoc {...input} />)
}

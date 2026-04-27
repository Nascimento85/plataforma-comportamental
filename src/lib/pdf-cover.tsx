// ============================================================
// src/lib/pdf-cover.tsx
// Gera a capa personalizada do PDF Premium via @react-pdf/renderer.
// Capa: nome do usuário + título do material + perfil + data.
// ============================================================

import { Document, Page, Text, View, StyleSheet, Font, renderToBuffer } from '@react-pdf/renderer'
import React from 'react'

export interface CoverInput {
  /** Nome para exibir na capa (ex.: 'Kênio Araujo') */
  userName:    string
  /** Label do perfil (ex.: 'Dominante (D) — O Executor') */
  profileLabel: string
  /** Título do material (ex.: 'Liderança de Comando vs. Situacional') */
  materialTitle: string
  /** Subtipo (ex.: 'PLAYBOOK', 'EBOOK') */
  materialKind:  string
  /** Cor primária do perfil (HEX, ex.: '#c4633a') */
  paletteHex:    string
  /** Data de emissão ISO. Default: now. */
  issuedAt?:     Date
}

const styles = StyleSheet.create({
  page: {
    paddingTop:    72,
    paddingBottom: 72,
    paddingHorizontal: 60,
    fontFamily: 'Helvetica',
    color:      '#1c1a17',
    backgroundColor: '#faf6ee',
  },
  brand: {
    fontSize: 9,
    letterSpacing: 3,
    textTransform: 'uppercase',
    color: '#a8522e',
    fontWeight: 700,
    marginBottom: 24,
  },
  divider: {
    height: 1,
    backgroundColor: '#e8e2d6',
    marginVertical: 22,
  },
  kindTag: {
    fontSize: 9,
    letterSpacing: 4,
    textTransform: 'uppercase',
    fontWeight: 700,
    marginBottom: 14,
  },
  materialTitle: {
    fontSize: 32,
    fontWeight: 700,
    lineHeight: 1.15,
    marginBottom: 18,
  },
  profile: {
    fontSize: 14,
    color: '#5a544a',
    fontStyle: 'italic',
    marginBottom: 56,
  },
  greeting: {
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 2,
    color: '#5a544a',
    marginBottom: 6,
  },
  userName: {
    fontSize: 24,
    fontWeight: 700,
    marginBottom: 4,
  },
  date: {
    fontSize: 10,
    color: '#7a8298',
    marginBottom: 56,
  },
  intro: {
    fontSize: 11,
    lineHeight: 1.55,
    color: '#3a4254',
    marginBottom: 16,
  },
  introHighlight: {
    color: '#a8522e',
    fontWeight: 700,
  },
  footer: {
    position: 'absolute',
    bottom: 36,
    left: 60,
    right: 60,
    textAlign: 'center',
    fontSize: 8,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    color: '#9b9484',
  },
})

function CoverDoc(c: CoverInput) {
  const issuedAt = c.issuedAt ?? new Date()
  const dateLabel = issuedAt.toLocaleDateString('pt-BR', {
    day: '2-digit', month: 'long', year: 'numeric',
  })

  return (
    <Document
      title={`${c.materialTitle} — ${c.userName}`}
      author="Mapa Comportamental"
      subject={c.profileLabel}
      keywords="mapa comportamental, passaporte de autoconhecimento, premium"
    >
      <Page size="A4" style={styles.page}>
        <Text style={styles.brand}>Mapa Comportamental · Passaporte de Autoconhecimento</Text>

        <Text style={[styles.kindTag, { color: c.paletteHex }]}>{c.materialKind}</Text>
        <Text style={styles.materialTitle}>{c.materialTitle}</Text>
        <Text style={styles.profile}>Material exclusivo do perfil {c.profileLabel}</Text>

        <View style={styles.divider} />

        <Text style={styles.greeting}>Personalizado para</Text>
        <Text style={[styles.userName, { color: c.paletteHex }]}>{c.userName}</Text>
        <Text style={styles.date}>Emitido em {dateLabel}</Text>

        <Text style={styles.intro}>
          Este material é parte do seu Relatório Premium e foi liberado quando você
          desbloqueou seu acesso completo.
        </Text>
        <Text style={styles.intro}>
          Use-o como um <Text style={styles.introHighlight}>guia prático</Text> — leia, anote,
          aplique. Cada página foi pensada para o seu perfil específico, e os exercícios
          ganham potência quando você os repete em ciclos curtos.
        </Text>

        <Text style={styles.footer}>
          © Mapa Comportamental — Todos os direitos reservados — Distribuição autorizada apenas para {c.userName}
        </Text>
      </Page>
    </Document>
  )
}

/** Gera o PDF da capa (1 página A4) como Buffer. */
export async function renderCoverPdf(input: CoverInput): Promise<Buffer> {
  return renderToBuffer(<CoverDoc {...input} />)
}

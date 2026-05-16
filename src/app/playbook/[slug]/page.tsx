// ============================================================
// /playbook/[slug] — Pagina publica dos playbooks gratuitos
// Renderiza o conteudo + botao "Imprimir / Salvar como PDF"
// ============================================================

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { PLAYBOOKS } from '@/content/playbooks'
import type { Bloco } from '@/content/playbooks'
import ImprimirButton from './ImprimirButton'

interface Props { params: { slug: string } }

export function generateMetadata({ params }: Props): Metadata {
  const p = PLAYBOOKS[params.slug]
  if (!p) return { title: 'Playbook não encontrado' }
  return { title: `${p.titulo} — Psique`, description: p.subtitulo }
}

export default function PlaybookPage({ params }: Props) {
  const p = PLAYBOOKS[params.slug]
  if (!p) notFound()

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #faf7f2 0%, #f0ebdf 100%)' }}>
      {/* ── Top bar (oculta na impressão) ── */}
      <div className="print:hidden border-b border-soul-mist/60 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link href="/" className="text-[13px] font-bold text-soul-terracota hover:underline">
            ← Psique
          </Link>
          <ImprimirButton titulo={p.titulo} />
        </div>
      </div>

      {/* ── Conteúdo ── */}
      <article className="max-w-3xl mx-auto px-6 py-12 print:py-6">
        {/* Header */}
        <header className="mb-10">
          <span className="inline-block text-[11px] font-bold uppercase tracking-[0.18em] px-3 py-1 rounded-full mb-4"
                style={{ background: 'rgba(196,99,58,0.15)', color: '#a8522e' }}>
            {p.badge}
          </span>
          <h1 className="font-serif font-semibold text-3xl md:text-4xl text-soul-ink leading-tight">
            {p.titulo}
          </h1>
          <p className="font-display italic text-lg md:text-xl font-semibold text-soul-terracota mt-2">
            {p.subtitulo}
          </p>
        </header>

        {/* Abertura */}
        <p className="text-[16px] text-soul-ink/90 font-medium leading-relaxed mb-10 first-letter:text-3xl first-letter:font-serif first-letter:font-semibold first-letter:text-soul-terracota first-letter:mr-1 first-letter:float-left first-letter:leading-none">
          {p.abertura}
        </p>

        {/* Seções */}
        {p.secoes.map((s, i) => (
          <section key={i} className="mb-10">
            <h2 className="font-serif font-semibold text-2xl text-soul-ink leading-tight mb-4 flex items-baseline gap-2">
              {s.numero && <span className="text-soul-terracota">{s.numero}</span>}
              <span>{s.titulo}</span>
            </h2>
            {s.blocos.map((b, bi) => <BlocoRenderer key={bi} bloco={b} />)}
          </section>
        ))}

        {/* Fechamento */}
        {p.fechamento && p.fechamento.length > 0 && (
          <section className="mt-12 pt-10 border-t border-soul-mist/60">
            {p.fechamento.map((b, i) => <BlocoRenderer key={i} bloco={b} />)}
          </section>
        )}

        {/* Footer CTA */}
        <footer className="print:hidden mt-16 pt-8 border-t border-soul-mist/60 text-center">
          <p className="text-[14px] text-soul-ink/70 font-medium mb-3">
            Este material é gratuito e pode ser livremente compartilhado.
          </p>
          <Link href="/empresas"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-[14px] font-bold text-white shadow-terra"
                style={{ background: 'linear-gradient(135deg, #c4633a, #d4943a)' }}>
            Conhecer a plataforma Psique →
          </Link>
        </footer>
      </article>
    </div>
  )
}

function BlocoRenderer({ bloco }: { bloco: Bloco }) {
  if (bloco.tipo === 'paragrafo') {
    return (
      <p className="text-[15px] text-soul-ink/90 font-medium leading-relaxed mb-3">
        {bloco.conteudo}
      </p>
    )
  }
  if (bloco.tipo === 'subtitulo') {
    return (
      <h3 className="font-serif font-semibold text-lg text-soul-ink mt-5 mb-2">
        {bloco.titulo}
      </h3>
    )
  }
  if (bloco.tipo === 'lista') {
    return (
      <ul className="space-y-1.5 mb-4 ml-1">
        {(bloco.itens ?? []).map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-[15px] text-soul-ink/90 font-medium">
            <span className="text-soul-terracota mt-0.5 flex-shrink-0">·</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    )
  }
  if (bloco.tipo === 'callout') {
    const variante = bloco.variante ?? 'info'
    const styles = variante === 'alerta'
      ? { bg: 'rgba(196,122,114,0.10)', border: 'rgba(196,122,114,0.40)', color: '#8a4a42', icon: '⚠️' }
      : variante === 'sucesso'
        ? { bg: 'rgba(122,158,126,0.12)', border: 'rgba(122,158,126,0.40)', color: '#4a7a4e', icon: '✓' }
        : { bg: 'rgba(212,148,58,0.10)', border: 'rgba(212,148,58,0.40)', color: '#8a5c1e', icon: '💡' }
    return (
      <div className="rounded-2xl p-4 my-4"
           style={{ background: styles.bg, border: `1px solid ${styles.border}` }}>
        {bloco.titulo && (
          <p className="text-[12px] font-bold uppercase tracking-widest mb-1.5 flex items-center gap-2"
             style={{ color: styles.color }}>
            <span>{styles.icon}</span> {bloco.titulo}
          </p>
        )}
        <p className="text-[14px] font-semibold leading-relaxed" style={{ color: styles.color }}>
          {bloco.conteudo}
        </p>
      </div>
    )
  }
  if (bloco.tipo === 'separador') {
    return <hr className="my-6 border-soul-mist" />
  }
  return null
}

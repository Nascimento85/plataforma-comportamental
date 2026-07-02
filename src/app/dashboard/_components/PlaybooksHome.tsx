// ============================================================
// Playbooks gratuitos — faixa única e discreta no fim do
// dashboard. A vitrine completa fica em /dashboard/downloads.
// ============================================================

import Link from 'next/link'
import { PLAYBOOK_LIST } from '@/content/playbooks'

const EMOJIS: Record<string, string> = {
  'contratacao-inteligente': '🎯',
  'nr1-blindagem-psicossocial': '🛡',
  'lideranca-cirurgica': '🔪',
  'tabuleiro-de-jung': '♟',
  'traducao-intima': '💞',
  'anatomia-do-diagnostico': '🔬',
}

const CHIPS_VISIVEIS = 3

export default function PlaybooksHome() {
  const visiveis = PLAYBOOK_LIST.slice(0, CHIPS_VISIVEIS)
  const restantes = PLAYBOOK_LIST.length - visiveis.length

  return (
    <div className="soul-panel flex flex-col md:flex-row md:items-center gap-5">
      <div className="md:flex-1 min-w-0">
        <p className="text-[12px] font-bold uppercase tracking-[0.18em]" style={{ color: '#d4b35e' }}>
          Playbooks gratuitos
        </p>
        <h2 className="font-serif font-semibold text-xl text-soul-ink leading-tight mt-1">
          Manuais que valem uma consultoria
        </h2>
        <p className="text-[13.5px] text-soul-ink/78 font-medium mt-1">
          Contratação, NR-1, liderança cirúrgica e mais. Leia em 15 minutos, aplique amanhã cedo.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {visiveis.map((pb) => (
          <Link key={pb.slug} href={`/playbook/${pb.slug}`}
                className="text-[13px] font-semibold text-soul-ink/90 no-underline px-3 py-1.5 rounded-full transition-colors hover:text-soul-gold"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)' }}>
            {EMOJIS[pb.slug] ?? '📘'} {pb.titulo}
          </Link>
        ))}
        {restantes > 0 && (
          <Link href="/dashboard/downloads"
                className="text-[13px] font-semibold text-soul-ink/78 no-underline px-3 py-1.5 rounded-full transition-colors hover:text-soul-gold"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)' }}>
            +{restantes}
          </Link>
        )}
      </div>

      <Link href="/dashboard/downloads"
            className="flex-shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-[13.5px] font-bold no-underline transition-colors"
            style={{ color: '#e0c878', border: '1px solid rgba(201,168,76,0.30)' }}>
        Ver todos →
      </Link>
    </div>
  )
}

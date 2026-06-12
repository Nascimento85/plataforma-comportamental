// ============================================================
// Vitrine de playbooks gratuitos na página inicial.
// Copy comercial: conhecimento gratuito que gera desejo.
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

export default function PlaybooksHome() {
  return (
    <div className="soul-panel flex flex-col">
      <div className="flex items-start justify-between gap-3 mb-4 flex-wrap">
        <div>
          <p className="text-[13px] font-bold uppercase tracking-widest" style={{ color: '#d4b35e' }}>
            Playbooks gratuitos
          </p>
          <h2 className="font-serif font-semibold text-2xl text-soul-ink leading-tight mt-0.5">
            Manuais que valem uma consultoria. <span className="text-soul-terracota italic font-normal">De graça.</span>
          </h2>
          <p className="text-[14px] text-soul-ink/78 font-medium mt-1 max-w-xl">
            Métodos práticos de contratação, liderança e gestão escritos pra dono de empresa. Leia em 15 minutos, aplique amanhã cedo.
          </p>
        </div>
        <Link href="/dashboard/downloads"
              className="text-[13.5px] font-bold whitespace-nowrap no-underline"
              style={{ color: '#d4b35e' }}>
          Ver todos →
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {PLAYBOOK_LIST.map((pb) => (
          <Link key={pb.slug} href={`/playbook/${pb.slug}`}
                className="rounded-2xl p-4 no-underline transition-all hover:-translate-y-0.5 flex items-start gap-3"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)' }}>
            <span className="text-xl flex-shrink-0 mt-0.5">{EMOJIS[pb.slug] ?? '📘'}</span>
            <div className="min-w-0">
              <p className="text-[14px] font-bold text-soul-ink leading-snug">{pb.titulo}</p>
              <p className="text-[12.5px] text-soul-ink/72 font-medium leading-snug mt-1 line-clamp-2">{pb.subtitulo}</p>
              <p className="text-[12.5px] font-bold mt-1.5" style={{ color: '#d4b35e' }}>Ler agora →</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

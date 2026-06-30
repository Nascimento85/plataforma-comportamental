'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { conviteEnpsTemplate } from '@/content/enps'

interface Convite { id: string; nome: string; email: string; status: string; link: string }
interface Convidado { nome: string; email: string }

export default function DetalheEnpsClient({ coletaId, convites, empresa }: { coletaId: string; convites: Convite[]; empresa: string }) {
  const router = useRouter()
  const [copiado, setCopiado] = useState<string | null>(null)
  const [msgCopiada, setMsgCopiada] = useState(false)
  const [addOpen, setAddOpen] = useState(false)
  const [novos, setNovos] = useState<Convidado[]>([{ nome: '', email: '' }])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const template = conviteEnpsTemplate(empresa, '[cole aqui o link individual da pessoa]')

  async function add() {
    setError('')
    const validos = novos.filter((r) => r.nome.trim() && r.email.includes('@'))
    if (validos.length === 0) { setError('Informe nome e e-mail.'); return }
    setLoading(true)
    try {
      const res = await fetch(`/api/enps/coletas/${coletaId}/convites`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ convidados: validos }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error ?? 'Erro.'); setLoading(false); return }
      setNovos([{ nome: '', email: '' }]); setAddOpen(false); router.refresh()
    } catch { setError('Erro ao conectar.') } finally { setLoading(false) }
  }

  return (
    <div className="space-y-4">
      {/* Texto de convite */}
      <div className="bg-soul-parchment rounded-3xl p-6 border border-soul-mist/60">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-serif font-semibold text-lg text-soul-ink">Mensagem de convite (WhatsApp / e-mail)</h3>
          <button onClick={() => { navigator.clipboard.writeText(template); setMsgCopiada(true); setTimeout(() => setMsgCopiada(false), 1500) }}
            className="text-[12px] font-bold px-2.5 py-1 rounded-full" style={{ background: 'rgba(196,99,58,0.15)', color: '#e09070' }}>
            {msgCopiada ? '✓ Copiada' : '📋 Copiar texto'}
          </button>
        </div>
        <pre className="text-[13px] text-soul-ink/80 font-sans whitespace-pre-wrap leading-relaxed">{template}</pre>
        <p className="text-[12px] text-soul-ink/55 mt-2">Troque <strong>[cole aqui o link individual da pessoa]</strong> pelo link de cada colaborador abaixo.</p>
      </div>

      {/* Links */}
      <div className="bg-soul-parchment rounded-3xl p-6 border border-soul-mist/60 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-serif font-semibold text-lg text-soul-ink">Convidados e links</h3>
          <button onClick={() => setAddOpen((v) => !v)} className="text-[13px] font-bold px-3 py-1.5 rounded-full border" style={{ borderColor: 'rgba(196,99,58,0.4)', color: '#e09070' }}>
            {addOpen ? 'Fechar' : '+ Adicionar'}
          </button>
        </div>

        <div className="space-y-2 max-h-96 overflow-y-auto">
          {convites.map((c) => (
            <div key={c.id} className="rounded-xl p-3 border border-soul-mist/60" style={{ background: 'rgba(58,61,69,0.35)' }}>
              <div className="flex items-center justify-between gap-2 mb-1 flex-wrap">
                <span className="text-[13.5px] font-bold text-soul-ink">
                  {c.nome}
                  <span className="ml-2 text-[11px] font-bold uppercase px-2 py-0.5 rounded-full"
                    style={c.status === 'COMPLETED' ? { background: 'rgba(122,158,126,0.18)', color: '#7a9e7e' } : { background: 'rgba(212,148,58,0.15)', color: '#d4b35e' }}>
                    {c.status === 'COMPLETED' ? 'respondeu' : 'pendente'}
                  </span>
                </span>
                {c.status !== 'COMPLETED' && (
                  <button onClick={() => { navigator.clipboard.writeText(c.link); setCopiado(c.id); setTimeout(() => setCopiado(null), 1500) }}
                    className="text-[12px] font-bold px-2.5 py-1 rounded-full" style={{ background: 'rgba(196,99,58,0.15)', color: '#e09070' }}>
                    {copiado === c.id ? '✓ Copiado' : '📋 Copiar link'}
                  </button>
                )}
              </div>
              {c.status !== 'COMPLETED' && <p className="text-[12px] font-mono break-all text-soul-ink/60">{c.link}</p>}
            </div>
          ))}
        </div>

        {addOpen && (
          <div className="pt-2 border-t border-soul-mist/40 space-y-2">
            {novos.map((r, i) => (
              <div key={i} className="flex flex-wrap items-center gap-2">
                <input value={r.nome} onChange={(e) => setNovos((arr) => arr.map((x, idx) => idx === i ? { ...x, nome: e.target.value } : x))} placeholder="Nome" className="soul-input text-[14px] py-2.5 flex-1" style={{ minWidth: 120 }} />
                <input value={r.email} onChange={(e) => setNovos((arr) => arr.map((x, idx) => idx === i ? { ...x, email: e.target.value } : x))} placeholder="email@empresa.com" type="email" className="soul-input text-[14px] py-2.5 flex-1" style={{ minWidth: 140 }} />
                {novos.length > 1 && <button onClick={() => setNovos((arr) => arr.filter((_, idx) => idx !== i))} className="text-soul-ink/50 text-xl px-1">×</button>}
              </div>
            ))}
            <div className="flex gap-2">
              <button onClick={() => setNovos((a) => [...a, { nome: '', email: '' }])} className="text-[13px] font-bold px-3 py-1.5 rounded-full border" style={{ borderColor: 'rgba(196,99,58,0.4)', color: '#e09070' }}>+ Mais um</button>
              <button onClick={add} disabled={loading} className="text-[14px] font-bold px-4 py-1.5 rounded-full text-white disabled:opacity-60" style={{ background: 'linear-gradient(135deg, #c4633a, #d4943a)' }}>
                {loading ? 'Gerando…' : 'Gerar links'}
              </button>
            </div>
            {error && <p className="text-[13px] font-semibold" style={{ color: '#f0a892' }}>{error}</p>}
          </div>
        )}
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface Convidado { nome: string; email: string }

export default function CriarColetaEnps() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [titulo, setTitulo] = useState('')
  const [convidados, setConvidados] = useState<Convidado[]>([{ nome: '', email: '' }])
  const [bulk, setBulk] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [links, setLinks] = useState<{ nome: string; link: string }[] | null>(null)
  const [copiado, setCopiado] = useState<number | null>(null)

  function update(i: number, field: keyof Convidado, value: string) {
    setConvidados((arr) => arr.map((x, idx) => idx === i ? { ...x, [field]: value } : x))
  }

  function parseBulk() {
    // Aceita linhas "Nome, email" ou "Nome <email>" ou "email"
    const linhas = bulk.split('\n').map((l) => l.trim()).filter(Boolean)
    const novos: Convidado[] = linhas.map((l) => {
      const emailMatch = l.match(/[\w.+-]+@[\w-]+\.[\w.-]+/)
      const email = emailMatch ? emailMatch[0] : ''
      const nome = l.replace(email, '').replace(/[,<>]/g, '').trim() || email.split('@')[0]
      return { nome, email }
    }).filter((c) => c.email)
    if (novos.length) { setConvidados(novos); setBulk('') }
  }

  async function handleSubmit() {
    setError('')
    const validos = convidados.filter((c) => c.nome.trim() && c.email.includes('@'))
    if (validos.length === 0) { setError('Adicione ao menos um colaborador com nome e e-mail.'); return }
    setLoading(true)
    try {
      const res = await fetch('/api/enps/coletas', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ titulo, convidados: validos }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error ?? 'Erro ao criar.'); setLoading(false); return }
      setLinks(data.convites)
      router.refresh()
    } catch { setError('Erro ao conectar.') } finally { setLoading(false) }
  }

  function reset() {
    setOpen(false); setLinks(null); setTitulo(''); setConvidados([{ nome: '', email: '' }]); setBulk(''); setError('')
  }

  if (!open) {
    return (
      <button onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-[15px] font-bold text-white shadow-terra transition-transform hover:-translate-y-px"
        style={{ background: 'linear-gradient(135deg, #c4633a, #d4943a)' }}>
        + Nova pesquisa eNPS
      </button>
    )
  }

  if (links) {
    return (
      <div className="bg-soul-parchment rounded-3xl p-6 border border-soul-mist/60 space-y-4">
        <div className="text-center">
          <div className="text-4xl mb-2">✨</div>
          <h3 className="font-serif font-semibold text-2xl text-soul-ink">Pesquisa criada!</h3>
          <p className="text-sm text-soul-ink/68 font-sans mt-1">Envie cada link ao colaborador. Cada link é único e anônimo. Você verá quem já respondeu, mas nunca o que cada um respondeu.</p>
        </div>
        <div className="space-y-2 max-h-80 overflow-y-auto">
          {links.map((l, i) => (
            <div key={i} className="rounded-xl p-3 border border-soul-mist/60" style={{ background: 'rgba(58,61,69,0.4)' }}>
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-[13px] font-bold text-soul-ink">{l.nome}</span>
                <button onClick={() => { navigator.clipboard.writeText(l.link); setCopiado(i); setTimeout(() => setCopiado(null), 1500) }}
                  className="text-[12px] font-bold px-2.5 py-1 rounded-full" style={{ background: 'rgba(196,99,58,0.15)', color: '#e09070' }}>
                  {copiado === i ? '✓ Copiado' : '📋 Copiar'}
                </button>
              </div>
              <p className="text-[12px] font-mono break-all text-soul-ink/70">{l.link}</p>
            </div>
          ))}
        </div>
        <button onClick={reset} className="w-full py-3 rounded-full font-bold text-[15px] text-white" style={{ background: 'linear-gradient(135deg, #c4633a, #d4943a)' }}>
          Concluir
        </button>
      </div>
    )
  }

  return (
    <div className="bg-soul-parchment rounded-3xl p-6 border border-soul-mist/60 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-serif font-semibold text-xl text-soul-ink">Nova pesquisa eNPS</h3>
        <button onClick={reset} className="text-soul-ink/60 hover:text-soul-ink text-2xl leading-none">×</button>
      </div>

      <div>
        <label className="block text-[12px] font-bold text-soul-ink/80 uppercase tracking-widest mb-1.5">Título <span className="normal-case text-soul-ink/50">(opcional)</span></label>
        <input value={titulo} onChange={(e) => setTitulo(e.target.value)} placeholder="Ex: Clima — Julho/2026" className="soul-input text-[15px] py-3" />
      </div>

      <div>
        <label className="block text-[12px] font-bold text-soul-ink/80 uppercase tracking-widest mb-1.5">Colar lista rápida <span className="normal-case text-soul-ink/50">(um por linha: Nome, email)</span></label>
        <textarea value={bulk} onChange={(e) => setBulk(e.target.value)} rows={3} placeholder={'Ana Souza, ana@empresa.com\nBruno Lima, bruno@empresa.com'}
          className="soul-input text-[14px] py-2.5 w-full" />
        <button onClick={parseBulk} className="text-[13px] font-bold px-3 py-1.5 mt-1.5 rounded-full border" style={{ borderColor: 'rgba(196,99,58,0.4)', color: '#e09070' }}>
          Preencher da lista
        </button>
      </div>

      <div>
        <label className="block text-[12px] font-bold text-soul-ink/80 uppercase tracking-widest mb-2">Colaboradores</label>
        <div className="space-y-2 max-h-72 overflow-y-auto">
          {convidados.map((c, i) => (
            <div key={i} className="flex flex-wrap items-center gap-2">
              <input value={c.nome} onChange={(e) => update(i, 'nome', e.target.value)} placeholder="Nome" className="soul-input text-[14px] py-2.5 flex-1" style={{ minWidth: 120 }} />
              <input value={c.email} onChange={(e) => update(i, 'email', e.target.value)} placeholder="email@empresa.com" type="email" className="soul-input text-[14px] py-2.5 flex-1" style={{ minWidth: 140 }} />
              {convidados.length > 1 && <button onClick={() => setConvidados((a) => a.filter((_, idx) => idx !== i))} className="text-soul-ink/50 text-xl px-1">×</button>}
            </div>
          ))}
        </div>
        <button onClick={() => setConvidados((a) => [...a, { nome: '', email: '' }])} className="text-[13px] font-bold px-3 py-1.5 mt-2 rounded-full border" style={{ borderColor: 'rgba(196,99,58,0.4)', color: '#e09070' }}>
          + Adicionar colaborador
        </button>
      </div>

      {error && <div className="rounded-xl px-4 py-3 text-[14px] font-semibold" style={{ background: 'rgba(196,122,114,0.15)', border: '1px solid rgba(196,122,114,0.45)', color: '#f0a892' }}>{error}</div>}

      <button onClick={handleSubmit} disabled={loading} className="w-full py-3.5 rounded-full font-bold text-[15px] text-white disabled:opacity-60" style={{ background: 'linear-gradient(135deg, #c4633a, #d4943a)' }}>
        {loading ? 'Gerando links…' : 'Criar pesquisa e gerar links'}
      </button>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

type Role = 'AUTO' | 'GESTOR' | 'PAR' | 'SUBORDINADO'
const ROLE_LABEL: Record<Role, string> = {
  AUTO: 'Autoavaliação', GESTOR: 'Gestor(a)', PAR: 'Par (colega)', SUBORDINADO: 'Liderado(a)',
}
interface Rater { role: Role; nome: string; email: string }

export default function CriarCiclo360() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [avaliadoNome, setAvaliadoNome] = useState('')
  const [titulo, setTitulo] = useState('')
  const [raters, setRaters] = useState<Rater[]>([{ role: 'AUTO', nome: '', email: '' }])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [links, setLinks] = useState<{ role: string; nome: string; link: string }[] | null>(null)
  const [copiado, setCopiado] = useState<number | null>(null)

  function addRater(role: Role) {
    setRaters((r) => [...r, { role, nome: '', email: '' }])
  }
  function updateRater(i: number, field: keyof Rater, value: string) {
    setRaters((r) => r.map((x, idx) => (idx === i ? { ...x, [field]: value } : x)))
  }
  function removeRater(i: number) {
    setRaters((r) => r.filter((_, idx) => idx !== i))
  }

  async function handleSubmit() {
    setError('')
    if (avaliadoNome.trim().length < 2) { setError('Informe o nome da pessoa avaliada.'); return }
    const validos = raters.filter((r) => r.nome.trim() && r.email.includes('@'))
    if (validos.length === 0) { setError('Adicione ao menos um avaliador com nome e e-mail.'); return }
    setLoading(true)
    try {
      const res = await fetch('/api/avaliacao-360/ciclos', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ avaliadoNome, titulo, raters: validos }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error ?? 'Erro ao criar.'); setLoading(false); return }
      setLinks(data.convites)
      router.refresh()
    } catch {
      setError('Erro ao conectar.'); setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  function reset() {
    setOpen(false); setLinks(null); setAvaliadoNome(''); setTitulo('')
    setRaters([{ role: 'AUTO', nome: '', email: '' }]); setError('')
  }

  if (!open) {
    return (
      <button onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-[15px] font-bold text-white shadow-terra transition-transform hover:-translate-y-px"
        style={{ background: 'linear-gradient(135deg, #c4633a, #d4943a)' }}>
        + Nova avaliação 360°
      </button>
    )
  }

  // Tela de links gerados
  if (links) {
    return (
      <div className="bg-soul-parchment rounded-3xl p-6 border border-soul-mist/60 space-y-4">
        <div className="text-center">
          <div className="text-4xl mb-2">✨</div>
          <h3 className="font-serif font-semibold text-2xl text-soul-ink">Ciclo criado!</h3>
          <p className="text-sm text-soul-ink/68 font-sans mt-1">Envie cada link à pessoa certa. Cada um é único e anônimo.</p>
        </div>
        <div className="space-y-2">
          {links.map((l, i) => (
            <div key={i} className="rounded-xl p-3 border border-soul-mist/60" style={{ background: 'rgba(58,61,69,0.4)' }}>
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-[13px] font-bold text-soul-ink">{ROLE_LABEL[l.role as Role]} · {l.nome}</span>
                <button onClick={() => { navigator.clipboard.writeText(l.link); setCopiado(i); setTimeout(() => setCopiado(null), 1500) }}
                  className="text-[12px] font-bold px-2.5 py-1 rounded-full" style={{ background: 'rgba(196,99,58,0.15)', color: '#e09070' }}>
                  {copiado === i ? '✓ Copiado' : '📋 Copiar'}
                </button>
              </div>
              <p className="text-[12px] font-mono break-all text-soul-ink/70">{l.link}</p>
            </div>
          ))}
        </div>
        <button onClick={reset} className="w-full py-3 rounded-full font-bold text-[15px] text-white"
          style={{ background: 'linear-gradient(135deg, #c4633a, #d4943a)' }}>
          Concluir
        </button>
      </div>
    )
  }

  // Formulário
  return (
    <div className="bg-soul-parchment rounded-3xl p-6 border border-soul-mist/60 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-serif font-semibold text-xl text-soul-ink">Nova avaliação 360°</h3>
        <button onClick={reset} className="text-soul-ink/60 hover:text-soul-ink text-2xl leading-none">×</button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-[12px] font-bold text-soul-ink/80 uppercase tracking-widest mb-1.5">Pessoa avaliada</label>
          <input value={avaliadoNome} onChange={(e) => setAvaliadoNome(e.target.value)} placeholder="Ex: Ana Souza"
            className="soul-input text-[15px] py-3" />
        </div>
        <div>
          <label className="block text-[12px] font-bold text-soul-ink/80 uppercase tracking-widest mb-1.5">Título <span className="normal-case text-soul-ink/50">(opcional)</span></label>
          <input value={titulo} onChange={(e) => setTitulo(e.target.value)} placeholder="Ex: 360° Q3 2026"
            className="soul-input text-[15px] py-3" />
        </div>
      </div>

      <div>
        <label className="block text-[12px] font-bold text-soul-ink/80 uppercase tracking-widest mb-2">Avaliadores</label>
        <div className="space-y-2">
          {raters.map((r, i) => (
            <div key={i} className="flex flex-wrap items-center gap-2">
              <select value={r.role} onChange={(e) => updateRater(i, 'role', e.target.value)}
                className="soul-input text-[14px] py-2.5" style={{ maxWidth: 150 }}>
                <option value="AUTO">Autoavaliação</option>
                <option value="GESTOR">Gestor(a)</option>
                <option value="PAR">Par (colega)</option>
                <option value="SUBORDINADO">Liderado(a)</option>
              </select>
              <input value={r.nome} onChange={(e) => updateRater(i, 'nome', e.target.value)} placeholder="Nome"
                className="soul-input text-[14px] py-2.5 flex-1" style={{ minWidth: 120 }} />
              <input value={r.email} onChange={(e) => updateRater(i, 'email', e.target.value)} placeholder="email@empresa.com" type="email"
                className="soul-input text-[14px] py-2.5 flex-1" style={{ minWidth: 140 }} />
              {raters.length > 1 && (
                <button onClick={() => removeRater(i)} className="text-soul-ink/50 hover:text-soul-terracota text-xl leading-none px-1">×</button>
              )}
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          <AddBtn onClick={() => addRater('GESTOR')}>+ Gestor</AddBtn>
          <AddBtn onClick={() => addRater('PAR')}>+ Par</AddBtn>
          <AddBtn onClick={() => addRater('SUBORDINADO')}>+ Liderado</AddBtn>
          <AddBtn onClick={() => addRater('AUTO')}>+ Autoavaliação</AddBtn>
        </div>
        <p className="text-[12px] text-soul-ink/55 mt-2">
          Dica: para anonimato real de pares e liderados, convide ao menos 3 de cada. A autoavaliação é o link de papel "Autoavaliação" enviado à própria pessoa.
        </p>
      </div>

      {error && <div className="rounded-xl px-4 py-3 text-[14px] font-semibold" style={{ background: 'rgba(196,122,114,0.15)', border: '1px solid rgba(196,122,114,0.45)', color: '#f0a892' }}>{error}</div>}

      <button onClick={handleSubmit} disabled={loading} className="w-full py-3.5 rounded-full font-bold text-[15px] text-white disabled:opacity-60"
        style={{ background: 'linear-gradient(135deg, #c4633a, #d4943a)' }}>
        {loading ? 'Gerando links…' : 'Criar ciclo e gerar links'}
      </button>
    </div>
  )
}

function AddBtn({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button onClick={onClick} className="text-[13px] font-bold px-3 py-1.5 rounded-full border transition-colors"
      style={{ borderColor: 'rgba(196,99,58,0.4)', color: '#e09070' }}>
      {children}
    </button>
  )
}

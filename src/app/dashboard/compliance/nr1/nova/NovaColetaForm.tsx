'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface Setor { id: string; nome: string; perfilDiscDominante: string | null }
interface Convidado { nome: string; email: string; setorId: string }

export default function NovaColetaForm({ setoresIniciais }: { setoresIniciais: Setor[] }) {
  const router = useRouter()
  const [setores, setSetores] = useState<Setor[]>(setoresIniciais)
  const [novoSetor, setNovoSetor] = useState({ nome: '', perfilDisc: '' })

  const [nome, setNome] = useState('')
  const expiresDefault = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10)
  const [expiresAt, setExpiresAt] = useState(expiresDefault)
  const [convidados, setConvidados] = useState<Convidado[]>([{ nome: '', email: '', setorId: '' }])

  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState('')

  async function criarSetor() {
    if (!novoSetor.nome.trim()) return
    const res = await fetch('/api/nr1/setores', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome: novoSetor.nome, perfilDiscDominante: novoSetor.perfilDisc || undefined }),
    })
    const data = await res.json()
    if (res.ok) {
      setSetores([...setores, data.setor])
      setNovoSetor({ nome: '', perfilDisc: '' })
    } else {
      alert(data.error)
    }
  }

  function addConvidado() {
    setConvidados([...convidados, { nome: '', email: '', setorId: setores[0]?.id ?? '' }])
  }
  function removeConvidado(i: number) {
    setConvidados(convidados.filter((_, idx) => idx !== i))
  }
  function updateConvidado(i: number, key: keyof Convidado, value: string) {
    setConvidados(convidados.map((c, idx) => idx === i ? { ...c, [key]: value } : c))
  }

  async function submitColeta(e: React.FormEvent) {
    e.preventDefault()
    setErro('')
    setLoading(true)
    try {
      const validos = convidados.filter(c => c.nome.trim() && c.email.trim() && c.setorId)
      if (validos.length === 0) {
        setErro('Adicione pelo menos um convidado válido (nome, e-mail e setor).')
        setLoading(false); return
      }
      const res = await fetch('/api/nr1/coletas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, expiresAt: new Date(expiresAt).toISOString(), convidados: validos }),
      })
      const data = await res.json()
      if (!res.ok) { setErro(data.error ?? 'Falha ao criar coleta.'); setLoading(false); return }
      router.push(`/dashboard/compliance/nr1/${data.coleta.id}`)
    } catch {
      setErro('Erro de conexão.'); setLoading(false)
    }
  }

  return (
    <form onSubmit={submitColeta} className="space-y-6">
      {/* Setores */}
      <section className="soul-panel">
        <h2 className="font-serif font-semibold text-xl text-soul-ink mb-3">Setores (GHE)</h2>
        {setores.length === 0 ? (
          <p className="text-[15px] text-soul-ink/85 font-medium mb-3">Nenhum setor cadastrado. Cadastre o primeiro:</p>
        ) : (
          <div className="flex flex-wrap gap-2 mb-3">
            {setores.map(s => (
              <span key={s.id} className="inline-flex items-center rounded-full px-3 py-1 text-[13.5px] font-semibold"
                    style={{ background: 'rgba(196,99,58,0.10)', color: '#e09070' }}>
                {s.nome}{s.perfilDiscDominante ? ` (DISC: ${s.perfilDiscDominante})` : ''}
              </span>
            ))}
          </div>
        )}
        <div className="flex flex-wrap gap-2 items-end">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-[13px] font-bold uppercase tracking-widest text-soul-ink/80 mb-1">Nome do setor</label>
            <input type="text" className="soul-input" placeholder="Ex: Financeiro"
                   value={novoSetor.nome} onChange={(e) => setNovoSetor({ ...novoSetor, nome: e.target.value })} />
          </div>
          <div className="w-[180px]">
            <label className="block text-[13px] font-bold uppercase tracking-widest text-soul-ink/80 mb-1">Perfil DISC dominante</label>
            <select className="soul-input" value={novoSetor.perfilDisc} onChange={(e) => setNovoSetor({ ...novoSetor, perfilDisc: e.target.value })}>
              <option value="">— (opcional) —</option>
              <option value="D">D · Dominante</option>
              <option value="I">I · Influenciador</option>
              <option value="S">S · Estável</option>
              <option value="C">C · Conforme</option>
            </select>
          </div>
          <button type="button" onClick={criarSetor}
                  className="px-4 py-2 rounded-full text-[14px] font-bold border-2"
                  style={{ borderColor: 'rgba(196,99,58,0.45)', color: '#e09070' }}>
            + Adicionar setor
          </button>
        </div>
      </section>

      {/* Coleta */}
      <section className="soul-panel">
        <h2 className="font-serif font-semibold text-xl text-soul-ink mb-3">Coleta</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[13px] font-bold uppercase tracking-widest text-soul-ink/80 mb-1">Nome da coleta</label>
            <input type="text" required className="soul-input" placeholder="Ex: Diagnóstico Psicossocial Q2 2026"
                   value={nome} onChange={(e) => setNome(e.target.value)} />
          </div>
          <div>
            <label className="block text-[13px] font-bold uppercase tracking-widest text-soul-ink/80 mb-1">Validade (último dia)</label>
            <input type="date" required className="soul-input"
                   value={expiresAt} onChange={(e) => setExpiresAt(e.target.value)} />
          </div>
        </div>
      </section>

      {/* Convidados */}
      <section className="soul-panel">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-serif font-semibold text-xl text-soul-ink">Convidados</h2>
          <button type="button" onClick={addConvidado}
                  className="px-3 py-1.5 rounded-full text-[13.5px] font-bold border-2"
                  style={{ borderColor: 'rgba(196,99,58,0.45)', color: '#e09070' }}>
            + Adicionar
          </button>
        </div>
        <p className="text-[14px] text-soul-ink/85 font-medium mb-4">
          Lembrete: mínimo de <strong>5 respondentes por setor</strong> para gerar relatório. Adicione todos os funcionários do setor.
        </p>
        <div className="space-y-2">
          {convidados.map((c, i) => (
            <div key={i} className="flex flex-wrap gap-2 items-center">
              <input type="text" placeholder="Nome" className="soul-input flex-1 min-w-[150px]"
                     value={c.nome} onChange={(e) => updateConvidado(i, 'nome', e.target.value)} />
              <input type="email" placeholder="E-mail" className="soul-input flex-1 min-w-[200px]"
                     value={c.email} onChange={(e) => updateConvidado(i, 'email', e.target.value)} />
              <select className="soul-input w-[180px]"
                      value={c.setorId} onChange={(e) => updateConvidado(i, 'setorId', e.target.value)}>
                <option value="">Selecione o setor</option>
                {setores.map(s => <option key={s.id} value={s.id}>{s.nome}</option>)}
              </select>
              <button type="button" onClick={() => removeConvidado(i)}
                      className="px-3 py-2 text-[13.5px] font-bold text-soul-ink/75 hover:text-soul-ink">
                ×
              </button>
            </div>
          ))}
        </div>
      </section>

      {erro && (
        <div className="rounded-2xl px-4 py-3 text-[15px] font-semibold"
             style={{ background: 'rgba(196,122,114,0.15)', border: '1px solid rgba(196,122,114,0.45)', color: '#f0a892' }}>
          {erro}
        </div>
      )}

      <button type="submit" disabled={loading}
              className="w-full py-3 rounded-full text-[15px] font-bold text-white shadow-terra disabled:opacity-60"
              style={{ background: 'linear-gradient(135deg, #c4633a, #d4943a)' }}>
        {loading ? 'Criando coleta…' : '✦ Criar coleta e gerar links anônimos'}
      </button>
    </form>
  )
}

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function NovaVagaForm() {
  const router = useRouter()
  const [titulo, setTitulo] = useState('')
  const [descricao, setDescricao] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function gerar() {
    setError('')
    if (titulo.trim().length < 2) { setError('Dê um título à vaga (ex.: Secretária Executiva).'); return }
    if (descricao.trim().length < 20) { setError('Descreva um pouco mais a rotina e as responsabilidades da vaga.'); return }
    setLoading(true)
    try {
      const res = await fetch('/api/vagas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ titulo: titulo.trim(), descricao: descricao.trim() }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error ?? 'Erro ao gerar o perfil.'); setLoading(false); return }
      router.push(`/dashboard/vagas/${data.id}`)
    } catch {
      setError('Erro de conexão. Tente novamente.')
      setLoading(false)
    }
  }

  return (
    <div className="bg-soul-parchment rounded-3xl p-5 sm:p-6" style={{ border: '1px solid rgba(58,61,69,0.6)' }}>
      <div className="space-y-4">
        <div>
          <label className="block text-[13px] font-sans font-semibold uppercase tracking-wider mb-2" style={{ color: 'rgba(240,236,227,0.6)' }}>
            Título da vaga
          </label>
          <input
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Ex.: Secretária Executiva, Vendedor externo, Analista financeiro…"
            className="w-full px-4 py-3 rounded-xl text-sm font-sans outline-none"
            style={{ background: '#17181c', border: '1px solid rgba(58,61,69,0.8)', color: '#f0ece3' }}
          />
        </div>
        <div>
          <label className="block text-[13px] font-sans font-semibold uppercase tracking-wider mb-2" style={{ color: 'rgba(240,236,227,0.6)' }}>
            Descreva a vaga
          </label>
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            rows={6}
            placeholder="Conte com suas palavras: qual a rotina do dia a dia, as principais responsabilidades, com quem a pessoa se relaciona, o ritmo (urgente ou estável), se lida com público, se segue processos ou tem autonomia, e os maiores desafios da função."
            className="w-full px-4 py-3 rounded-xl text-sm font-sans outline-none leading-relaxed resize-y"
            style={{ background: '#17181c', border: '1px solid rgba(58,61,69,0.8)', color: '#f0ece3' }}
          />
          <p className="text-[12px] font-sans mt-1.5" style={{ color: 'rgba(240,236,227,0.45)' }}>
            Não precisa saber nada de DISC. Escreva como se estivesse explicando a vaga para um colega.
          </p>
        </div>

        {error && (
          <div className="rounded-xl px-4 py-3 text-[14px] font-sans font-semibold text-center"
               style={{ background: 'rgba(196,122,114,0.15)', border: '1px solid rgba(196,122,114,0.45)', color: '#f0a892' }}>
            {error}
          </div>
        )}

        <button
          onClick={gerar}
          disabled={loading}
          className="w-full sm:w-auto font-sans font-semibold py-3 px-7 rounded-full transition-all hover:-translate-y-px disabled:opacity-60"
          style={{ background: 'linear-gradient(135deg, #c9a84c, #d4943a)', color: '#1c1a17', boxShadow: '0 4px 16px rgba(201,168,76,0.22)' }}
        >
          {loading ? 'Analisando a vaga…' : '✦ Descobrir o perfil ideal'}
        </button>
        {loading && (
          <p className="text-[13px] font-sans" style={{ color: 'rgba(240,236,227,0.55)' }}>
            A IA está montando o perfil comportamental ideal. Isso leva alguns segundos.
          </p>
        )}
      </div>
    </div>
  )
}

'use client'

// ============================================================
// Cliente da tela Avaliação do Líder (dashboard do gestor/RH)
// Config do líder · convites · resultado agregado anônimo
// ============================================================

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import {
  PILAR_LIDER_INFO, type PilarLiderKey, type FlagLider, type ResultadoAgregadoLider,
} from '@/content/gestao-times/avaliacao-lider'

const NAVY = '#1f2a3d'
const GRAPHITE = '#2b2b30'
const GOLD = '#c9a84c'

interface Convite {
  id: string
  nome: string
  email: string
  status: string
  token: string
}

interface Membro {
  id: string
  nome: string
  email: string | null
  conviteStatus: string | null
}

interface ApiData {
  membros: Membro[]
  liderNome: string | null
  liderEmail: string | null
  minRespostas: number
  nRespostas: number
  liberado: boolean
  convites: Convite[]
  resultado: ResultadoAgregadoLider | null
  sciEntries: string[]
}

interface Props {
  teamId: string
  teamNome: string
  liderNomeInicial: string | null
  liderEmailInicial: string | null
}

const PILARES_ORDEM: PilarLiderKey[] = ['CLAREZA', 'RESPEITO', 'RECONHECIMENTO', 'SUPORTE', 'DESENVOLVIMENTO']

export default function AvaliacaoLiderClient({ teamId, teamNome, liderNomeInicial, liderEmailInicial }: Props) {
  const [data, setData]           = useState<ApiData | null>(null)
  const [liderNome, setLiderNome]   = useState(liderNomeInicial ?? '')
  const [liderEmail, setLiderEmail] = useState(liderEmailInicial ?? '')
  const [salvando, setSalvando]   = useState(false)
  const [enviando, setEnviando]   = useState(false)
  const [aviso, setAviso]         = useState('')
  const [copiado, setCopiado]     = useState('')
  const [emailEdits, setEmailEdits] = useState<Record<string, string>>({})
  const [salvandoMembro, setSalvandoMembro] = useState('')

  const carregar = useCallback(async () => {
    const res = await fetch(`/api/talent-teams/${teamId}/avaliacao-lider`)
    if (res.ok) setData(await res.json())
  }, [teamId])

  useEffect(() => { carregar() }, [carregar])

  async function salvarLider() {
    setSalvando(true); setAviso('')
    try {
      const res = await fetch(`/api/talent-teams/${teamId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ liderNome, liderEmail }),
      })
      if (res.ok) { setAviso('Líder salvo. Os próximos convites já saem com este nome.'); carregar() }
      else setAviso('Não foi possível salvar. Tente novamente.')
    } finally { setSalvando(false) }
  }

  async function enviarConvites() {
    setEnviando(true); setAviso('')
    try {
      const res = await fetch(`/api/talent-teams/${teamId}/avaliacao-lider/convites`, { method: 'POST' })
      const r = await res.json()
      if (!res.ok) { setAviso(r.error ?? 'Falha ao enviar convites.'); return }
      const msgs: string[] = []
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const ok = (r.criados ?? []).filter((c: any) => c.enviado)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const falhas = (r.criados ?? []).filter((c: any) => !c.enviado)
      if (ok.length) msgs.push(`${ok.length} convite(s) enviado(s) por email.`)
      if (falhas.length) msgs.push(`ATENÇÃO: ${falhas.length} convite(s) criados mas o EMAIL FALHOU` +
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ` (${falhas.map((c: any) => `${c.nome}: ${c.erro ?? 'erro desconhecido'}`).join(' · ')}). Use o botão Copiar link enquanto isso.`)
      if (r.semEmail?.length) msgs.push(`Sem email cadastrado: ${r.semEmail.join(', ')}.`)
      if (!r.criados?.length && !r.semEmail?.length) msgs.push('Todos os membros já foram convidados.')
      setAviso(msgs.join(' '))
      carregar()
    } finally { setEnviando(false) }
  }

  async function salvarEmailEConvidar(m: Membro) {
    const email = (emailEdits[m.id] ?? '').trim()
    if (!email.includes('@')) { setAviso('Informe um email válido para ' + m.nome + '.'); return }
    setSalvandoMembro(m.id); setAviso('')
    try {
      const r1 = await fetch(`/api/talent-members/${m.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (!r1.ok) { setAviso('Não foi possível salvar o email.'); return }
      await convidarMembro(m.id, m.nome)
    } finally { setSalvandoMembro('') }
  }

  async function convidarMembro(memberId: string, nome: string) {
    setSalvandoMembro(memberId); setAviso('')
    try {
      const res = await fetch(`/api/talent-teams/${teamId}/avaliacao-lider/convites`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ memberIds: [memberId] }),
      })
      const r = await res.json()
      if (!res.ok) { setAviso(r.error ?? 'Falha ao enviar o convite.'); return }
      if (r.criados?.length) setAviso(`Convite enviado para ${nome}.`)
      else if (r.semEmail?.length) setAviso(`${nome} continua sem email cadastrado.`)
      else setAviso(`${nome} já tinha convite ativo.`)
      carregar()
    } finally { setSalvandoMembro('') }
  }

  async function reenviar(c: Convite) {
    setSalvandoMembro(c.id); setAviso('')
    try {
      const res = await fetch(`/api/talent-teams/${teamId}/avaliacao-lider/convites`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reenviarConviteId: c.id }),
      })
      const r = await res.json()
      if (!res.ok) { setAviso(r.error ?? 'Falha ao reenviar.'); return }
      setAviso(`Email reenviado para ${r.email}.`)
    } finally { setSalvandoMembro('') }
  }

  function copiarLink(c: Convite) {
    const url = `${window.location.origin}/avaliar-lider/${c.token}`
    navigator.clipboard.writeText(url)
    setCopiado(c.id)
    setTimeout(() => setCopiado(''), 1800)
  }

  const respondidos = data?.convites.filter((c) => c.status === 'COMPLETED').length ?? 0

  return (
    <div className="space-y-6">
      {/* Header navy/dourado */}
      <div className="rounded-3xl p-6 md:p-7 relative overflow-hidden"
           style={{ background: `linear-gradient(135deg, ${NAVY} 0%, ${GRAPHITE} 100%)` }}>
        <div className="absolute top-0 right-0 w-56 h-56 rounded-full opacity-[0.10]"
             style={{ background: `radial-gradient(circle, ${GOLD}, transparent)`, transform: 'translate(30%,-30%)' }}/>
        <div className="relative z-10">
          <Link href={`/dashboard/gestao-times/${teamId}`} className="text-[13.5px] font-semibold text-white/75 hover:text-white/90 no-underline">
            ← Voltar para a Matriz
          </Link>
          <h1 className="font-serif text-3xl md:text-4xl font-semibold text-white leading-tight mt-2">
            Avaliação do Líder
          </h1>
          <p className="text-[15px] text-white/80 font-medium mt-1">
            Equipe {teamNome} · avaliação ascendente 100% anônima
          </p>
        </div>
      </div>

      {/* Config do líder */}
      <div className="soul-panel space-y-4">
        <div>
          <p className="text-[13px] font-bold uppercase tracking-widest text-soul-ink/75">Líder do setor</p>
          <p className="text-[14px] text-soul-ink/80 font-medium mt-0.5">
            É este nome que aparece para a equipe no questionário e nos convites por email.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input value={liderNome} onChange={(e) => setLiderNome(e.target.value)} maxLength={80}
                 placeholder="Nome do líder (ex: Ana Souza)"
                 className="rounded-2xl px-4 py-3 text-[15px] font-medium text-soul-ink"
                 style={{ background: 'rgba(255,255,255,0.052)', border: '1.5px solid rgba(240,236,227,0.42)' }} />
          <input value={liderEmail} onChange={(e) => setLiderEmail(e.target.value)} maxLength={120}
                 placeholder="Email do líder (opcional, evita autoavaliação)"
                 className="rounded-2xl px-4 py-3 text-[15px] font-medium text-soul-ink"
                 style={{ background: 'rgba(255,255,255,0.052)', border: '1.5px solid rgba(240,236,227,0.42)' }} />
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <button onClick={salvarLider} disabled={salvando || liderNome.trim().length < 2}
                  className="flex-1 py-3 rounded-full text-[15px] font-bold text-white disabled:opacity-40"
                  style={{ background: `linear-gradient(135deg, ${NAVY}, #3d4f7c)` }}>
            {salvando ? 'Salvando...' : 'Salvar líder'}
          </button>
          <button onClick={enviarConvites} disabled={enviando || !data?.liderNome}
                  className="flex-1 py-3 rounded-full text-[15px] font-bold disabled:opacity-40"
                  style={{ background: 'rgba(201,168,76,0.18)', color: '#e0c878', border: `1.5px solid rgba(201,168,76,0.5)` }}>
            {enviando ? 'Enviando...' : 'Enviar convites para a equipe ✉'}
          </button>
        </div>
        <p className="text-[13.5px] text-soul-ink/72 font-medium">
          Automação ativa: sempre que você concluir a avaliação 9-box de um membro com email cadastrado,
          ele recebe o convite automaticamente.
        </p>
        {aviso && (
          <div className="rounded-2xl px-4 py-3 text-[14px] font-semibold"
               style={{ background: 'rgba(201,168,76,0.12)', border: '1px solid rgba(201,168,76,0.4)', color: '#e3cf8e' }}>
            {aviso}
          </div>
        )}
      </div>

      {/* Membros da equipe: situacao de email e convite */}
      {data && data.membros.length > 0 && (
        <div className="soul-panel space-y-3">
          <div>
            <p className="text-[13px] font-bold uppercase tracking-widest text-soul-ink/75">Membros da equipe</p>
            <p className="text-[13.5px] text-soul-ink/72 font-medium mt-0.5">
              Cadastre o email de quem ainda não tem e dispare o convite individual por aqui.
            </p>
          </div>
          <div className="space-y-2">
            {data.membros.map((m) => (
              <div key={m.id} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl px-4 py-2.5"
                   style={{ background: 'rgba(255,255,255,0.046)' }}>
                <div className="min-w-0">
                  <p className="text-[14px] font-semibold text-soul-ink truncate">{m.nome}</p>
                  <p className="text-[13px] text-soul-ink/72 font-medium truncate">{m.email ?? 'sem email cadastrado'}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  {m.conviteStatus === 'COMPLETED' ? (
                    <span className="text-[13px] font-bold px-2.5 py-1 rounded-full"
                          style={{ background: 'rgba(90,125,90,0.15)', color: '#a9d3a9' }}>✓ Respondeu</span>
                  ) : m.conviteStatus === 'PENDING' ? (
                    <span className="text-[13px] font-bold px-2.5 py-1 rounded-full"
                          style={{ background: 'rgba(201,168,76,0.15)', color: '#e0c878' }}>Convite enviado</span>
                  ) : m.email ? (
                    <button onClick={() => convidarMembro(m.id, m.nome)} disabled={salvandoMembro === m.id || !data.liderNome}
                            className="text-[13px] font-bold px-3 py-1.5 rounded-full disabled:opacity-40"
                            style={{ background: 'rgba(61,79,124,0.12)', color: '#8fa6da' }}>
                      {salvandoMembro === m.id ? 'Enviando...' : 'Enviar convite ✉'}
                    </button>
                  ) : (
                    <div className="flex items-center gap-2">
                      <input value={emailEdits[m.id] ?? ''} onChange={(e) => setEmailEdits((p) => ({ ...p, [m.id]: e.target.value }))}
                             placeholder="email@empresa.com" type="email"
                             className="rounded-full px-3 py-1.5 text-[13.5px] font-medium text-soul-ink w-48"
                             style={{ background: 'white', border: '1.5px solid rgba(240,236,227,0.42)' }} />
                      <button onClick={() => salvarEmailEConvidar(m)} disabled={salvandoMembro === m.id || !data.liderNome}
                              className="text-[13px] font-bold px-3 py-1.5 rounded-full disabled:opacity-40"
                              style={{ background: 'rgba(61,79,124,0.12)', color: '#8fa6da' }}>
                        {salvandoMembro === m.id ? 'Salvando...' : 'Salvar e convidar'}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          {!data.liderNome && (
            <p className="text-[13.5px] font-semibold" style={{ color: '#e09070' }}>
              Defina e salve o líder do setor acima para liberar o envio dos convites.
            </p>
          )}
        </div>
      )}

      {/* Convites */}
      {data && data.convites.length > 0 && (
        <div className="soul-panel space-y-3">
          <div className="flex items-baseline justify-between">
            <p className="text-[13px] font-bold uppercase tracking-widest text-soul-ink/75">Convites</p>
            <span className="text-[13.5px] font-bold text-soul-ink/72">{respondidos} de {data.convites.length} responderam</span>
          </div>
          <div className="space-y-2">
            {data.convites.map((c) => (
              <div key={c.id} className="flex items-center justify-between gap-3 rounded-2xl px-4 py-2.5"
                   style={{ background: 'rgba(255,255,255,0.046)' }}>
                <div className="min-w-0">
                  <p className="text-[14px] font-semibold text-soul-ink truncate">{c.nome}</p>
                  <p className="text-[13px] text-soul-ink/72 font-medium truncate">{c.email}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  {c.status === 'COMPLETED' ? (
                    <span className="text-[13px] font-bold px-2.5 py-1 rounded-full"
                          style={{ background: 'rgba(90,125,90,0.15)', color: '#a9d3a9' }}>✓ Respondeu</span>
                  ) : (
                    <>
                      <span className="text-[13px] font-bold px-2.5 py-1 rounded-full"
                            style={{ background: 'rgba(201,168,76,0.15)', color: '#e0c878' }}>Pendente</span>
                      <button onClick={() => copiarLink(c)}
                              className="text-[13px] font-bold px-2.5 py-1 rounded-full"
                              style={{ background: 'rgba(61,79,124,0.12)', color: '#8fa6da' }}>
                        {copiado === c.id ? 'Copiado ✓' : 'Copiar link'}
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
          <p className="text-[13px] text-soul-ink/70 font-medium">
            O status acima é apenas controle de participação. As respostas são gravadas sem vínculo com a pessoa.
          </p>
        </div>
      )}

      {/* Resultado */}
      {data && !data.liberado && (
        <div className="soul-panel text-center space-y-3 py-10">
          <div className="text-4xl">🔒</div>
          <h2 className="font-serif font-semibold text-xl text-soul-ink">Aguardando respostas</h2>
          <p className="text-[15px] text-soul-ink/85 font-medium max-w-md mx-auto">
            O resultado só é liberado com no mínimo <strong>{data.minRespostas} respostas</strong>, para
            proteger o anonimato da equipe. Até agora: <strong>{data.nRespostas}</strong>.
          </p>
        </div>
      )}

      {data?.liberado && data.resultado && (
        <>
          {/* Score geral */}
          <div className="soul-panel space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-[13px] font-bold uppercase tracking-widest text-soul-ink/75">Resultado geral</p>
                <p className="text-[13.5px] text-soul-ink/72 font-medium mt-0.5">{data.nRespostas} respostas anônimas</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-serif text-5xl font-semibold text-soul-ink">{data.resultado.scoreFinal.toFixed(1)}</span>
                <span className="text-[14px] font-bold px-4 py-2 rounded-full text-white"
                      style={{ background: data.resultado.cor }}>
                  {data.resultado.classificacao}
                </span>
              </div>
            </div>
            <p className="text-[15px] text-soul-ink/90 font-medium leading-relaxed rounded-2xl px-4 py-3"
               style={{ background: 'rgba(255,255,255,0.046)' }}>
              {data.resultado.diagnostico}
            </p>
          </div>

          {/* Pilares */}
          <div className="soul-panel space-y-4">
            <p className="text-[13px] font-bold uppercase tracking-widest text-soul-ink/75">Score por pilar</p>
            {PILARES_ORDEM.map((k) => {
              const info = PILAR_LIDER_INFO[k]
              const v = data.resultado!.pilares[k]
              return (
                <div key={k}>
                  <div className="flex items-baseline justify-between mb-1">
                    <span className="text-[14px] font-semibold text-soul-ink">{info.rotulo}</span>
                    <span className="text-[14px] font-bold" style={{ color: v <= 2 ? '#c0392b' : info.cor }}>
                      {v.toFixed(1)}
                    </span>
                  </div>
                  <div className="h-2.5 rounded-full bg-soul-mist overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-500"
                         style={{ width: `${(v / 5) * 100}%`, background: v <= 2 ? '#c0392b' : info.cor }} />
                  </div>
                </div>
              )
            })}
          </div>

          {/* Flags */}
          {data.resultado.flags.length > 0 && (
            <div className="soul-panel space-y-3">
              <p className="text-[13px] font-bold uppercase tracking-widest text-soul-ink/75">Pontos de atenção</p>
              {data.resultado.flags.map((f: FlagLider, i: number) => (
                <div key={i} className="rounded-2xl px-4 py-3 text-[14px] font-medium leading-relaxed"
                     style={{
                       background: f.tipo === 'PILAR_CRITICO' ? 'rgba(192,57,43,0.08)' : 'rgba(201,168,76,0.10)',
                       border: `1px solid ${f.tipo === 'PILAR_CRITICO' ? 'rgba(192,57,43,0.35)' : 'rgba(201,168,76,0.4)'}`,
                       color: f.tipo === 'PILAR_CRITICO' ? '#7a2d24' : '#6d5615',
                     }}>
                  {f.tipo === 'PILAR_CRITICO' ? '🔴 ' : '🟡 '}{f.mensagem}
                </div>
              ))}
            </div>
          )}

          {/* Relatos SCI */}
          {data.sciEntries.length > 0 && (
            <div className="soul-panel space-y-3">
              <div>
                <p className="text-[13px] font-bold uppercase tracking-widest text-soul-ink/75">
                  O que a equipe relatou (anônimo)
                </p>
                <p className="text-[13.5px] text-soul-ink/72 font-medium mt-0.5">
                  Episódios reais descritos pela equipe, em ordem embaralhada. Espelho comportamental: nota e evidência, juntas.
                </p>
              </div>
              {data.sciEntries.map((t, i) => (
                <div key={i} className="rounded-2xl px-4 py-3 text-[14px] text-soul-ink/90 font-medium leading-relaxed italic"
                     style={{ background: 'rgba(255,255,255,0.046)', borderLeft: `3px solid ${GOLD}` }}>
                  “{t}”
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {!data && (
        <div className="soul-panel text-center py-10">
          <p className="text-[15px] text-soul-ink/75 font-medium">Carregando...</p>
        </div>
      )}
    </div>
  )
}

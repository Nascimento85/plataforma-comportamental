'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ZONAS, DISC_LABELS, PERFIS_LIDERANCA, type ZonaKey, type DiscKey } from '@/content/gestao-times/disc-lideranca'
import AvaliacaoModal from './AvaliacaoModal'

interface Member {
  id: string
  nome: string
  cargo: string | null
  perfilDisc: string | null
  notaPerformance: number | null
  fitComportamental: number | null
  potencial: number | null
  score: number | null
  zona: string | null
  zonaManual: boolean
  avaliacaoRespostas: Record<number, number>
  temAvaliacao: boolean
}

interface EmployeeOpt { employeeId: string; nome: string; perfilDisc: string }

interface Props {
  teamId: string
  teamNome: string
  teamDescricao: string | null
  members: Member[]
  employeesDisponiveis: EmployeeOpt[]
}

const NAVY = '#1f2a3d'
const GRAPHITE = '#2b2b30'
const GOLD = '#c9a84c'

export default function MatrizClient({ teamId, teamNome, teamDescricao, members, employeesDisponiveis }: Props) {
  const router = useRouter()
  const [addOpen, setAddOpen] = useState(false)

  // KPIs por zona
  const counts = useMemo(() => {
    const c: Record<ZonaKey, number> = { TOP20: 0, MID70: 0, BOTTOM10: 0 }
    members.forEach((m) => { if (m.zona) c[m.zona as ZonaKey]++ })
    return c
  }, [members])

  const classificados = members.filter((m) => m.zona).length
  const pendentes = members.length - classificados

  async function removeMember(id: string) {
    await fetch(`/api/talent-members/${id}`, { method: 'DELETE' })
    router.refresh()
  }

  return (
    <div className="space-y-6">
      {/* ── Header navy ── */}
      <div className="rounded-3xl p-6 md:p-7 relative overflow-hidden"
           style={{ background: `linear-gradient(135deg, ${NAVY} 0%, ${GRAPHITE} 100%)` }}>
        <div className="absolute top-0 right-0 w-56 h-56 rounded-full opacity-[0.10]"
             style={{ background: `radial-gradient(circle, ${GOLD}, transparent)`, transform: 'translate(30%,-30%)' }}/>
        <div className="relative z-10">
          <Link href="/dashboard/gestao-times" className="text-[13.5px] font-semibold text-white/75 hover:text-white/90 no-underline">
            ← Voltar para times
          </Link>
          <div className="flex items-start justify-between gap-4 flex-wrap mt-2">
            <div>
              <h1 className="font-serif text-3xl md:text-4xl font-semibold text-white leading-tight">{teamNome}</h1>
              {teamDescricao && <p className="text-[15px] text-white/80 font-medium mt-1 max-w-2xl">{teamDescricao}</p>}
            </div>
            <div className="flex items-center gap-2 flex-wrap flex-shrink-0">
              <Link href={`/dashboard/gestao-times/${teamId}/avaliacao-lider`}
                    className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-[14px] font-bold no-underline"
                    style={{ background: 'rgba(255,255,255,0.10)', color: '#e9eef6', border: '1px solid rgba(255,255,255,0.25)' }}>
                ◆ Avaliação do Líder →
              </Link>
              <Link href={`/dashboard/gestao-times/${teamId}/team-build`}
                    className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-[14px] font-bold no-underline"
                    style={{ background: 'rgba(201,168,76,0.18)', color: GOLD, border: '1px solid rgba(201,168,76,0.4)' }}>
                ◇ Team Build deste time →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── KPIs de distribuição ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {(['TOP20', 'MID70', 'BOTTOM10'] as ZonaKey[]).map((z) => {
          const info = ZONAS[z]
          return (
            <div key={z} className="soul-panel" style={{ borderLeft: `4px solid ${info.cor}` }}>
              <div className="flex items-baseline justify-between">
                <p className="text-[13px] font-bold uppercase tracking-widest" style={{ color: info.cor }}>{info.rotulo}</p>
                <span className="text-[13px] font-bold text-soul-ink/68">{info.faixa}</span>
              </div>
              <p className="font-serif text-3xl font-bold text-soul-ink mt-1">
                {counts[z]} <span className="text-base font-medium text-soul-ink/72">{counts[z] === 1 ? 'pessoa' : 'pessoas'}</span>
              </p>
              <p className="text-[13.5px] text-soul-ink/78 font-medium mt-1 leading-snug">{info.descricao}</p>
            </div>
          )
        })}
      </div>

      {/* ── Gráfico de dispersão + pizza ── */}
      <div className="soul-panel">
        <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
          <h2 className="font-serif text-xl font-semibold text-soul-ink">Matriz de Talentos</h2>
          <p className="text-[13.5px] text-soul-ink/72 font-medium">Eixo horizontal: Performance · Eixo vertical: Fit comportamental</p>
        </div>
        <div className="grid lg:grid-cols-[1fr_auto] gap-6 items-center">
          <ScatterMatrix members={members} />
          {classificados > 0 && <PieDistribuicao counts={counts} total={classificados} />}
        </div>
        {pendentes > 0 && (
          <p className="text-[13.5px] text-soul-ink/75 font-medium mt-3">
            {pendentes} {pendentes === 1 ? 'colaborador ainda não foi pontuado' : 'colaboradores ainda não foram pontuados'}.
            Preencha a nota de performance abaixo (ou use o botão Avaliar) para plotar na curva.
          </p>
        )}
      </div>

      {/* ── Lista editável ── */}
      <div className="soul-panel">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <h2 className="font-serif text-xl font-semibold text-soul-ink">Colaboradores ({members.length})</h2>
          <button onClick={() => setAddOpen(true)}
                  className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[14px] font-bold text-white shadow-terra"
                  style={{ background: 'linear-gradient(135deg, #c4633a, #d4943a)' }}>
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/></svg>
            Adicionar colaborador
          </button>
        </div>

        {members.length === 0 ? (
          <p className="text-[15px] text-soul-ink/75 font-medium py-6 text-center">
            Nenhum colaborador no time ainda. Clique em “Adicionar colaborador” para começar.
          </p>
        ) : (
          <div className="space-y-2">
            {members.map((m) => (
              <MemberRow key={m.id} m={m} onRemove={removeMember} teamId={teamId} />
            ))}
          </div>
        )}
      </div>

      {addOpen && (
        <AddMemberModal
          teamId={teamId}
          employeesDisponiveis={employeesDisponiveis}
          jaAdicionados={members}
          onClose={() => setAddOpen(false)}
          onAdded={() => { setAddOpen(false); router.refresh() }}
        />
      )}
    </div>
  )
}

// ── Gráfico de dispersão SVG ───────────────────────────────────
function ScatterMatrix({ members }: { members: Member[] }) {
  const W = 560, H = 360, pad = 40
  const plotW = W - pad * 2, plotH = H - pad * 2

  function px(nota: number) { return pad + (nota / 10) * plotW }
  function py(fit: number)  { return pad + plotH - (fit / 10) * plotH }

  const plotted = members.filter((m) => m.notaPerformance != null)

  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ maxWidth: 620 }}>
        {/* Quadrantes de fundo */}
        <rect x={pad} y={pad} width={plotW} height={plotH} fill="#17181c" stroke="#e8e2d6"/>
        {/* Linhas guia em 4.0 e 7.0 (limiares das zonas) */}
        {[4, 7].map((v) => (
          <g key={v}>
            <line x1={px(v)} y1={pad} x2={px(v)} y2={pad + plotH} stroke="#e0d8c8" strokeDasharray="3 3"/>
            <line x1={pad} y1={py(v)} x2={pad + plotW} y2={py(v)} stroke="#e0d8c8" strokeDasharray="3 3"/>
          </g>
        ))}
        {/* Eixos labels */}
        <text x={pad + plotW / 2} y={H - 8} textAnchor="middle" fontSize="11" fill="#6e645a" fontWeight="700">Performance →</text>
        <text x={14} y={pad + plotH / 2} textAnchor="middle" fontSize="11" fill="#6e645a" fontWeight="700"
              transform={`rotate(-90 14 ${pad + plotH / 2})`}>Fit comportamental →</text>

        {/* Pontos */}
        {plotted.map((m) => {
          const nota = m.notaPerformance ?? 0
          const fit = m.fitComportamental ?? nota
          const cor = m.zona ? ZONAS[m.zona as ZonaKey].cor : '#94a3b8'
          const iniciais = m.nome.split(' ').slice(0, 2).map((s) => s[0]).join('').toUpperCase()
          return (
            <g key={m.id}>
              <circle cx={px(nota)} cy={py(fit)} r="14" fill={cor} fillOpacity="0.9" stroke="#fff" strokeWidth="2"/>
              <text x={px(nota)} y={py(fit) + 3.5} textAnchor="middle" fontSize="9" fontWeight="700" fill="#fff">{iniciais}</text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}

// ── Donut de distribuição 20/70/10 ─────────────────────────────
function PieDistribuicao({ counts, total }: { counts: Record<ZonaKey, number>; total: number }) {
  if (total === 0) return null
  const ordem: ZonaKey[] = ['TOP20', 'MID70', 'BOTTOM10']
  const R = 54
  const C = 2 * Math.PI * R
  let offset = 0

  return (
    <div className="flex items-center gap-5 justify-center lg:justify-start">
      <svg viewBox="0 0 140 140" width="132" height="132" className="flex-shrink-0">
        <g transform="translate(70 70) rotate(-90)">
          <circle r={R} fill="none" stroke="rgba(58,61,69,0.7)" strokeWidth="20" />
          {ordem.map((z) => {
            const pct = counts[z] / total
            if (pct === 0) return null
            const len = pct * C
            const el = (
              <circle key={z} r={R} fill="none" stroke={ZONAS[z].cor} strokeWidth="20"
                      strokeDasharray={`${len} ${C - len}`} strokeDashoffset={-offset} />
            )
            offset += len
            return el
          })}
        </g>
        <text x="70" y="66" textAnchor="middle" fontSize="24" fontWeight="700" fill="#1c1a17">{total}</text>
        <text x="70" y="83" textAnchor="middle" fontSize="9" fill="#6e645a" fontWeight="600" letterSpacing="0.5">AVALIADOS</text>
      </svg>
      <div className="space-y-2">
        {ordem.map((z) => {
          const info = ZONAS[z]
          const pct = Math.round((counts[z] / total) * 100)
          return (
            <div key={z} className="flex items-center gap-2 text-[13.5px] min-w-[150px]">
              <span className="w-3 h-3 rounded-sm flex-shrink-0" style={{ background: info.cor }} />
              <span className="font-bold text-soul-ink w-9">{pct}%</span>
              <span className="text-soul-ink/80 font-medium">{info.rotulo}</span>
              <span className="text-soul-ink/68 font-bold ml-auto">{counts[z]}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── Linha de membro (notas calculadas pelo questionário, read-only) ──
function MemberRow({
  m, onRemove, teamId,
}: {
  m: Member
  onRemove: (id: string) => void
  teamId: string
}) {
  const [avalOpen, setAvalOpen] = useState(false)

  const zonaInfo = m.zona ? ZONAS[m.zona as ZonaKey] : null
  const perfil = m.perfilDisc ? PERFIS_LIDERANCA[m.perfilDisc as DiscKey] : null

  return (
    <div className="rounded-2xl p-3 flex flex-wrap items-center gap-3"
         style={{ background: 'rgba(38,40,46,0.5)', border: '1px solid rgba(58,61,69,0.8)' }}>
      {/* Identidade */}
      <div className="flex items-center gap-2.5 min-w-[180px] flex-1">
        <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-[13.5px] font-bold flex-shrink-0"
             style={{ background: perfil?.cor ?? '#94a3b8' }}>
          {m.nome.split(' ').slice(0, 2).map((s) => s[0]).join('').toUpperCase()}
        </div>
        <div className="min-w-0">
          <p className="text-[15px] font-bold text-soul-ink leading-tight truncate">{m.nome}</p>
          <p className="text-[13px] text-soul-ink/75 font-medium truncate">
            {m.cargo ? `${m.cargo} · ` : ''}
            {perfil ? `${perfil.apelido} (${m.perfilDisc})` : 'Perfil pendente'}
          </p>
        </div>
      </div>

      {/* Notas calculadas (read-only) */}
      {m.temAvaliacao ? (
        <div className="flex items-center gap-3 text-[13.5px] font-bold">
          <span style={{ color: '#c4633a' }} title="Performance">P {m.notaPerformance?.toFixed(1)}</span>
          <span style={{ color: '#8fa6da' }} title="Fit comportamental">F {m.fitComportamental?.toFixed(1)}</span>
          {m.potencial != null && m.potencial > 0 && <span style={{ color: '#c9a84c' }} title="Potencial">Pot {m.potencial.toFixed(1)}</span>}
        </div>
      ) : (
        <span className="text-[13px] font-medium text-soul-ink/68">Aguardando avaliação</span>
      )}

      {/* Zona */}
      <div className="flex items-center gap-2">
        {zonaInfo && (
          <span className="inline-flex items-center rounded-full px-2.5 py-1 text-[13px] font-bold"
                style={{ background: zonaInfo.corBg, color: zonaInfo.cor }}>
            {zonaInfo.rotulo}
          </span>
        )}
      </div>

      {/* Ações */}
      <div className="flex items-center gap-1.5 ml-auto">
        <button onClick={() => setAvalOpen(true)}
                className="text-[13.5px] font-bold px-3 py-1.5 rounded-full"
                style={{ background: m.temAvaliacao ? 'rgba(122,158,126,0.15)' : 'rgba(196,99,58,0.10)', color: m.temAvaliacao ? '#3d5a40' : '#a8522e' }}>
          {m.temAvaliacao ? '✓ Avaliação' : 'Avaliar'}
        </button>
        {m.zona && (
          <Link href={`/dashboard/gestao-times/${teamId}/devolutiva/${m.id}`}
                className="text-[13.5px] font-bold px-3 py-1.5 rounded-full no-underline"
                style={{ background: 'rgba(61,79,124,0.10)', color: '#8fa6da' }}>
            Devolutiva
          </Link>
        )}
        <button onClick={() => { if (confirm(`Remover ${m.nome} do time?`)) onRemove(m.id) }}
                aria-label="Remover" title="Remover do time"
                className="w-7 h-7 rounded-full flex items-center justify-center text-soul-ink/65 hover:text-rose-600 hover:bg-rose-50 text-lg leading-none">×</button>
      </div>

      {avalOpen && (
        <AvaliacaoModal
          memberId={m.id}
          memberNome={m.nome}
          respostasIniciais={m.avaliacaoRespostas}
          onClose={() => setAvalOpen(false)}
        />
      )}
    </div>
  )
}

// ── Modal adicionar colaborador ────────────────────────────────
function AddMemberModal({
  teamId, employeesDisponiveis, jaAdicionados, onClose, onAdded,
}: {
  teamId: string
  employeesDisponiveis: EmployeeOpt[]
  jaAdicionados: Member[]
  onClose: () => void
  onAdded: () => void
}) {
  const [modo, setModo] = useState<'vincular' | 'avulso'>('vincular')
  const [employeeId, setEmployeeId] = useState('')
  const [nome, setNome] = useState('')
  const [cargo, setCargo] = useState('')
  const [email, setEmail] = useState('')
  const [perfilDisc, setPerfilDisc] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      let body: Record<string, unknown>
      if (modo === 'vincular') {
        const emp = employeesDisponiveis.find((x) => x.employeeId === employeeId)
        if (!emp) { setError('Selecione um colaborador.'); setLoading(false); return }
        body = { nome: emp.nome, employeeId: emp.employeeId, cargo: cargo.trim(), email: email.trim() || undefined }
      } else {
        if (nome.trim().length < 2) { setError('Informe o nome.'); setLoading(false); return }
        body = { nome: nome.trim(), cargo: cargo.trim(), email: email.trim() || undefined, perfilDisc: perfilDisc || undefined }
      }
      const res = await fetch(`/api/talent-teams/${teamId}/members`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error ?? 'Erro ao adicionar.'); return }
      onAdded()
    } catch {
      setError('Erro de conexão.')
    } finally {
      setLoading(false)
    }
  }

  const disponiveis = employeesDisponiveis.filter(
    (e) => !jaAdicionados.some((m) => m.nome === e.nome),
  )

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 overflow-y-auto py-6"
         style={{ background: 'rgba(28,26,23,0.62)', backdropFilter: 'blur(4px)' }}>
      <div className="bg-soul-parchment rounded-3xl shadow-soul-xl w-full max-w-md p-6 md:p-7"
           style={{ border: '1px solid rgba(58,61,69,0.6)' }}>
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-serif font-semibold text-2xl text-soul-ink">Adicionar colaborador</h3>
          <button onClick={onClose} aria-label="Fechar"
                  className="w-9 h-9 rounded-full flex items-center justify-center text-soul-ink/80 hover:bg-soul-mist/60 text-2xl leading-none">×</button>
        </div>

        {/* Toggle modo */}
        <div className="flex gap-2 mb-4 p-1 rounded-full" style={{ background: 'rgba(58,61,69,0.5)' }}>
          <button onClick={() => setModo('vincular')}
                  className={`flex-1 py-2 rounded-full text-[13.5px] font-bold transition-all ${modo === 'vincular' ? 'bg-soul-parchment shadow-sm text-soul-ink' : 'text-soul-ink/75'}`}>
            Quem já fez teste
          </button>
          <button onClick={() => setModo('avulso')}
                  className={`flex-1 py-2 rounded-full text-[13.5px] font-bold transition-all ${modo === 'avulso' ? 'bg-soul-parchment shadow-sm text-soul-ink' : 'text-soul-ink/75'}`}>
            Avulso
          </button>
        </div>

        <form onSubmit={handleAdd} className="space-y-4">
          {error && (
            <div className="rounded-xl px-4 py-3 text-[14px] font-semibold"
                 style={{ background: 'rgba(196,122,114,0.15)', border: '1px solid rgba(196,122,114,0.45)', color: '#f0a892' }}>
              {error}
            </div>
          )}

          {modo === 'vincular' ? (
            <div>
              <label className="block text-[13.5px] font-bold text-soul-ink/88 uppercase tracking-widest mb-2">Colaborador (com perfil DISC)</label>
              {disponiveis.length === 0 ? (
                <p className="text-[14px] text-soul-ink/75 font-medium">
                  Nenhum colaborador com DISC disponível. Use a aba “Avulso” ou aplique o teste DISC primeiro.
                </p>
              ) : (
                <select value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} className="soul-input w-full" disabled={loading}>
                  <option value="">Selecione…</option>
                  {disponiveis.map((e) => (
                    <option key={e.employeeId} value={e.employeeId}>{e.nome} · {DISC_LABELS[e.perfilDisc as DiscKey]} ({e.perfilDisc})</option>
                  ))}
                </select>
              )}
            </div>
          ) : (
            <>
              <div>
                <label className="block text-[13.5px] font-bold text-soul-ink/88 uppercase tracking-widest mb-2">Nome</label>
                <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} className="soul-input w-full" disabled={loading} autoFocus />
              </div>
              <div>
                <label className="block text-[13.5px] font-bold text-soul-ink/88 uppercase tracking-widest mb-2">Perfil DISC (se souber)</label>
                <select value={perfilDisc} onChange={(e) => setPerfilDisc(e.target.value)} className="soul-input w-full" disabled={loading}>
                  <option value="">Pendente / não sei</option>
                  <option value="D">Executor (D)</option>
                  <option value="I">Comunicador (I)</option>
                  <option value="S">Planejador (S)</option>
                  <option value="C">Analítico (C)</option>
                </select>
              </div>
            </>
          )}

          <div>
            <label className="block text-[13.5px] font-bold text-soul-ink/88 uppercase tracking-widest mb-2">Cargo (opcional)</label>
            <input type="text" value={cargo} onChange={(e) => setCargo(e.target.value)} className="soul-input w-full"
                   placeholder="Ex: Analista de Vendas" disabled={loading} />
          </div>

          <div>
            <label className="block text-[13.5px] font-bold text-soul-ink/88 uppercase tracking-widest mb-2">Email (para a Avaliação do Líder)</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="soul-input w-full"
                   placeholder="email@empresa.com" disabled={loading} />
            <p className="text-[13px] text-soul-ink/72 font-medium mt-1.5">
              Com o email cadastrado, o colaborador recebe automaticamente o convite anônimo para avaliar o líder assim que você concluir a avaliação dele.
            </p>
          </div>

          <button type="submit" disabled={loading}
                  className="w-full py-3 rounded-full text-[15px] font-bold text-white shadow-terra disabled:opacity-60"
                  style={{ background: 'linear-gradient(135deg, #c4633a, #d4943a)' }}>
            {loading ? 'Adicionando…' : 'Adicionar ao time'}
          </button>
        </form>
      </div>
    </div>
  )
}

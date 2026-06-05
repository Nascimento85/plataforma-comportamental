'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { PERFIS_LIDERANCA, type DiscKey } from '@/content/gestao-times/disc-lideranca'
import {
  MANUAL_POR_PERFIL, ENERGIA_INFO, FASES_TUCKMAN, DINAMICAS, DIAGNOSTICO_TUCKMAN,
  type AnaliseTime, type EnergiaKey, type FaseTuckman,
} from '@/content/gestao-times/team-build'

interface Member { id: string; nome: string; cargo: string | null; perfilDisc: string | null }

interface Props {
  teamId: string
  teamNome: string
  faseTuckman: string | null
  members: Member[]
  analise: AnaliseTime
}

const NAVY = '#1f2a3d'
const GRAPHITE = '#2b2b30'
const GOLD = '#c9a84c'

export default function TeamBuildClient({ teamId, teamNome, faseTuckman, members, analise }: Props) {
  const router = useRouter()
  const [faseSel, setFaseSel] = useState<FaseTuckman | null>((faseTuckman as FaseTuckman) ?? null)
  const [diagOpen, setDiagOpen] = useState(false)

  async function salvarFase(fase: FaseTuckman) {
    setFaseSel(fase)
    await fetch(`/api/talent-teams/${teamId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ faseTuckman: fase }),
    })
    router.refresh()
  }

  const energias: EnergiaKey[] = ['EXECUCAO', 'COMUNICACAO', 'ESTABILIDADE', 'ORGANIZACAO']

  return (
    <div className="space-y-6">
      {/* Header navy */}
      <div className="rounded-3xl p-6 md:p-7 relative overflow-hidden"
           style={{ background: `linear-gradient(135deg, ${NAVY} 0%, ${GRAPHITE} 100%)` }}>
        <div className="absolute top-0 right-0 w-56 h-56 rounded-full opacity-[0.10]"
             style={{ background: `radial-gradient(circle, ${GOLD}, transparent)`, transform: 'translate(30%,-30%)' }}/>
        <div className="relative z-10">
          <Link href={`/dashboard/gestao-times/${teamId}`} className="text-[12px] font-semibold text-white/60 hover:text-white/90 no-underline">
            ← Voltar para a matriz
          </Link>
          <p className="text-[11px] font-bold uppercase tracking-widest mt-2" style={{ color: GOLD }}>Team Build</p>
          <h1 className="font-serif text-3xl md:text-4xl font-semibold text-white leading-tight">{teamNome}</h1>
          <p className="text-[14px] text-white/70 font-medium mt-1 max-w-2xl">
            A personalidade coletiva do seu time, os pontos cegos a vigiar e as dinâmicas certas para o momento atual.
          </p>
        </div>
      </div>

      {analise.comPerfil < 2 ? (
        <div className="soul-panel text-center py-8">
          <p className="text-[15px] text-soul-ink/70 font-medium max-w-lg mx-auto">
            O Team Build precisa de pelo menos 2 colaboradores com perfil DISC definido para mapear a personalidade
            coletiva. Adicione mais membros na matriz ou aplique o teste DISC.
          </p>
          <Link href={`/dashboard/gestao-times/${teamId}`}
                className="inline-block mt-4 text-[13px] font-bold no-underline" style={{ color: '#c4633a' }}>
            ← Voltar para a matriz
          </Link>
        </div>
      ) : (
        <>
          {/* ── 1. Mapa de calor ── */}
          <div className="soul-panel">
            <h2 className="font-serif text-xl font-semibold text-soul-ink mb-1">Mapa de calor do time</h2>
            <p className="text-[13px] text-soul-ink/60 font-medium mb-4">
              As 4 energias comportamentais do grupo ({analise.comPerfil} de {analise.total} com perfil mapeado).
            </p>
            <div className="space-y-3">
              {energias.map((e) => {
                const info = ENERGIA_INFO[e]
                const d = analise.distribuicao[e]
                const dominante = analise.energiaDominante === e
                return (
                  <div key={e}>
                    <div className="flex justify-between items-baseline text-[13px] mb-1">
                      <span className={dominante ? 'font-bold text-soul-ink' : 'font-medium text-soul-ink/80'}>
                        {info.rotulo} <span className="text-soul-ink/50 font-normal">· {info.descricao}</span>
                      </span>
                      <span className="font-bold" style={{ color: info.cor }}>{d.pct}% · {d.count}</span>
                    </div>
                    <div className="h-3 rounded-full overflow-hidden" style={{ background: 'rgba(232,226,214,0.6)' }}>
                      <div className="h-full rounded-full transition-all" style={{ width: `${d.pct}%`, background: info.cor }}/>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* ── 2. Pontos cegos / alertas ── */}
          <div className="soul-panel">
            <h2 className="font-serif text-xl font-semibold text-soul-ink mb-3">Pontos cegos do time</h2>
            {analise.alertas.length === 0 ? (
              <div className="rounded-2xl p-4 text-[14px] font-medium"
                   style={{ background: 'rgba(122,158,126,0.10)', border: '1px solid rgba(122,158,126,0.30)', color: '#3d5a40' }}>
                Time comportamentalmente equilibrado. Nenhum excesso ou gap crítico detectado. Mantenha a diversidade de perfis ao crescer.
              </div>
            ) : (
              <div className="space-y-3">
                {analise.alertas.map((a, i) => {
                  const cor = ENERGIA_INFO[a.energia].cor
                  const isGap = a.tipo === 'GAP'
                  return (
                    <div key={i} className="rounded-2xl p-4" style={{ background: 'rgba(245,240,232,0.5)', borderLeft: `4px solid ${cor}` }}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full"
                              style={{ background: isGap ? 'rgba(61,79,124,0.12)' : 'rgba(196,99,58,0.12)', color: isGap ? '#3d4f7c' : '#a8522e' }}>
                          {isGap ? 'Gap' : 'Excesso'}
                        </span>
                        <p className="text-[14.5px] font-bold text-soul-ink">{a.titulo}</p>
                      </div>
                      <p className="text-[13.5px] text-soul-ink/80 font-medium leading-relaxed">{a.diagnostico}</p>
                      <p className="text-[13px] text-soul-ink/70 font-medium mt-2">
                        <strong style={{ color: cor }}>Recomendação:</strong> {a.recomendacao}
                      </p>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* ── 3. Central de dinâmicas (Tuckman) ── */}
          <div className="soul-panel">
            <div className="flex items-center justify-between flex-wrap gap-2 mb-1">
              <h2 className="font-serif text-xl font-semibold text-soul-ink">Central de dinâmicas</h2>
              <button onClick={() => setDiagOpen(true)} className="text-[12.5px] font-bold no-underline" style={{ color: '#c4633a' }}>
                Não sei minha fase? Responder 3 perguntas →
              </button>
            </div>
            <p className="text-[13px] text-soul-ink/60 font-medium mb-4">
              Escolha a fase atual do time (modelo Tuckman) para liberar a dinâmica sob medida.
            </p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-5">
              {(Object.keys(FASES_TUCKMAN) as FaseTuckman[]).map((f) => {
                const info = FASES_TUCKMAN[f]
                const active = faseSel === f
                return (
                  <button key={f} onClick={() => salvarFase(f)}
                          className="text-left rounded-2xl p-3 transition-all"
                          style={{ border: active ? `2px solid ${info.cor}` : '1.5px solid rgba(232,226,214,1)', background: active ? `${info.cor}14` : 'white' }}>
                    <p className="text-[13.5px] font-bold" style={{ color: active ? info.cor : '#1c1a17' }}>{info.rotulo}</p>
                    <p className="text-[11.5px] text-soul-ink/60 font-medium leading-snug mt-0.5">{info.subtitulo}</p>
                  </button>
                )
              })}
            </div>

            {faseSel && <DinamicaCard fase={faseSel} />}
          </div>

          {/* ── 4. Manual "Como Trabalhar Comigo" ── */}
          <div className="soul-panel">
            <h2 className="font-serif text-xl font-semibold text-soul-ink mb-1">Manual de cada um</h2>
            <p className="text-[13px] text-soul-ink/60 font-medium mb-4">
              Como cada pessoa do time funciona melhor. Compartilhe na Rodada do Manual de Mim.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {members.map((m) => (
                <ManualCard key={m.id} member={m} />
              ))}
            </div>
          </div>
        </>
      )}

      {diagOpen && (
        <DiagnosticoModal onClose={() => setDiagOpen(false)} onResult={(f) => { setDiagOpen(false); salvarFase(f) }} />
      )}
    </div>
  )
}

// ── Card de dinâmica ───────────────────────────────────────────
function DinamicaCard({ fase }: { fase: FaseTuckman }) {
  const info = FASES_TUCKMAN[fase]
  const d = DINAMICAS[fase]
  return (
    <div className="rounded-2xl p-5" style={{ background: `${info.cor}0d`, border: `1px solid ${info.cor}40` }}>
      <p className="text-[11px] font-bold uppercase tracking-widest" style={{ color: info.cor }}>
        Fase {info.rotulo} · Dinâmica recomendada
      </p>
      <h3 className="font-serif text-2xl font-semibold text-soul-ink leading-tight mt-1">{d.titulo}</h3>
      <p className="text-[13.5px] text-soul-ink/80 font-medium mt-2 leading-relaxed">{d.objetivo}</p>
      <p className="text-[12px] font-bold uppercase tracking-wide text-soul-ink/55 mt-3">Duração: {d.duracao}</p>

      <p className="text-[12px] font-bold uppercase tracking-wide text-soul-ink/70 mt-4 mb-2">Passo a passo</p>
      <ol className="space-y-2">
        {d.passos.map((p, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-white text-[11px] font-bold mt-0.5" style={{ background: info.cor }}>{i + 1}</span>
            <span className="text-[13.5px] text-soul-ink/85 font-medium leading-relaxed">{p}</span>
          </li>
        ))}
      </ol>

      <div className="rounded-xl px-4 py-3 mt-4 text-[13px] font-medium"
           style={{ background: 'rgba(201,168,76,0.12)', border: '1px solid rgba(201,168,76,0.30)', color: '#7a5f17' }}>
        💡 <strong>Dica de ouro:</strong> {d.dicaOuro}
      </div>
    </div>
  )
}

// ── Card do manual de um membro ────────────────────────────────
function ManualCard({ member }: { member: Member }) {
  const perfil = member.perfilDisc ? PERFIS_LIDERANCA[member.perfilDisc as DiscKey] : null
  const manual = member.perfilDisc ? MANUAL_POR_PERFIL[member.perfilDisc as DiscKey] : null

  return (
    <div className="rounded-2xl p-4" style={{ background: 'rgba(245,240,232,0.5)', border: '1px solid rgba(232,226,214,0.8)' }}>
      <div className="flex items-center gap-2.5 mb-3">
        <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-[12px] font-bold flex-shrink-0"
             style={{ background: perfil?.cor ?? '#94a3b8' }}>
          {member.nome.split(' ').slice(0, 2).map((s) => s[0]).join('').toUpperCase()}
        </div>
        <div className="min-w-0">
          <p className="text-[14px] font-bold text-soul-ink leading-tight truncate">{member.nome}</p>
          <p className="text-[11.5px] text-soul-ink/60 font-medium truncate">
            {perfil ? `${perfil.apelido} (${member.perfilDisc})` : 'Perfil pendente'}
          </p>
        </div>
      </div>

      {manual ? (
        <div className="space-y-2.5">
          <div>
            <p className="text-[10.5px] font-bold uppercase tracking-wide" style={{ color: perfil?.cor }}>Funciono melhor quando</p>
            <p className="text-[12.5px] text-soul-ink/80 font-medium leading-snug">{manual.funcionoMelhorQuando}</p>
          </div>
          <div>
            <p className="text-[10.5px] font-bold uppercase tracking-wide text-rose-700">Me desmotivo se</p>
            <p className="text-[12.5px] text-soul-ink/80 font-medium leading-snug">{manual.desmotivadoSe}</p>
          </div>
          <div>
            <p className="text-[10.5px] font-bold uppercase tracking-wide text-soul-ink/65">Para resolver um conflito comigo</p>
            <p className="text-[12.5px] text-soul-ink/80 font-medium leading-snug">{manual.resolverConflito}</p>
          </div>
        </div>
      ) : (
        <p className="text-[12.5px] text-soul-ink/55 font-medium">Defina o perfil DISC na matriz para gerar o manual.</p>
      )}
    </div>
  )
}

// ── Modal de diagnóstico Tuckman ───────────────────────────────
function DiagnosticoModal({ onClose, onResult }: { onClose: () => void; onResult: (f: FaseTuckman) => void }) {
  const [respostas, setRespostas] = useState<Record<number, FaseTuckman>>({})

  function calcular() {
    const votos: Record<FaseTuckman, number> = { FORMING: 0, STORMING: 0, NORMING: 0, PERFORMING: 0 }
    Object.values(respostas).forEach((f) => votos[f]++)
    let best: FaseTuckman = 'FORMING'
    let max = -1
    ;(Object.keys(votos) as FaseTuckman[]).forEach((f) => { if (votos[f] > max) { max = votos[f]; best = f } })
    onResult(best)
  }

  const completo = Object.keys(respostas).length === DIAGNOSTICO_TUCKMAN.length

  return (
    <div className="fixed inset-0 z-50 flex items-start md:items-center justify-center px-4 py-6 overflow-y-auto"
         style={{ background: 'rgba(28,26,23,0.62)', backdropFilter: 'blur(4px)' }}>
      <div className="bg-white rounded-3xl shadow-soul-xl w-full max-w-lg p-6 md:p-7" style={{ border: '1px solid rgba(232,226,214,0.6)' }}>
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-serif font-semibold text-2xl text-soul-ink">Em que fase está o time?</h3>
          <button onClick={onClose} aria-label="Fechar" className="w-9 h-9 rounded-full flex items-center justify-center text-soul-ink/70 hover:bg-soul-mist/60 text-2xl leading-none">×</button>
        </div>

        <div className="space-y-5">
          {DIAGNOSTICO_TUCKMAN.map((q, qi) => (
            <div key={qi}>
              <p className="text-[14px] font-bold text-soul-ink mb-2">{qi + 1}. {q.pergunta}</p>
              <div className="space-y-1.5">
                {q.opcoes.map((opt, oi) => {
                  const sel = respostas[qi] === opt.fase
                  return (
                    <button key={oi} onClick={() => setRespostas((p) => ({ ...p, [qi]: opt.fase }))}
                            className="w-full text-left rounded-xl px-3 py-2.5 text-[13px] font-medium transition-all"
                            style={{ border: sel ? '2px solid #c4633a' : '1.5px solid rgba(232,226,214,1)', background: sel ? 'rgba(196,99,58,0.07)' : 'white', color: sel ? '#a8522e' : '#1c1a17' }}>
                      {opt.texto}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        <button onClick={calcular} disabled={!completo}
                className="w-full mt-6 py-3 rounded-full text-[14px] font-bold text-white shadow-terra disabled:opacity-60"
                style={{ background: 'linear-gradient(135deg, #c4633a, #d4943a)' }}>
          {completo ? 'Ver minha fase e dinâmica →' : `Responda as ${DIAGNOSTICO_TUCKMAN.length} perguntas`}
        </button>
      </div>
    </div>
  )
}

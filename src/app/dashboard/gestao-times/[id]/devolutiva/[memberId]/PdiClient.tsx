'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface CheckIn {
  id: string
  nota: string
  statusMeta: string
  tendencia: string | null
  createdAt: string
}

interface PDI {
  id: string
  sciSituacao: string
  sciComportamento: string
  sciImpacto: string
  acoes: string[]
  prazo: string
  frequencia: string
  status: string
  checkIns: CheckIn[]
}

interface Props {
  memberId: string
  perfilCor: string
  perfilApelido: string
  acoesSugeridas: string[]
  pdi: PDI | null
  aiInicial?: string
  aiInicialEm?: string
}

const STATUS_META_LABELS: Record<string, string> = { EM_ANDAMENTO: 'Em andamento', CONCLUIDO: 'Concluído', EM_ATRASO: 'Em atraso' }
const TENDENCIA_LABELS: Record<string, string> = { SUBINDO: '↑ Subindo', ESTAVEL: '→ Estável', DESCENDO: '↓ Descendo' }

export default function PdiClient({ memberId, perfilCor, perfilApelido, acoesSugeridas, pdi, aiInicial, aiInicialEm }: Props) {
  const router = useRouter()

  // SCI
  const [sit, setSit] = useState(pdi?.sciSituacao ?? '')
  const [comp, setComp] = useState(pdi?.sciComportamento ?? '')
  const [imp, setImp] = useState(pdi?.sciImpacto ?? '')

  // Ações (sugeridas marcadas + livres)
  const [acoesSel, setAcoesSel] = useState<string[]>(pdi?.acoes ?? [])
  const [acaoLivre, setAcaoLivre] = useState('')

  // Prazo / frequência
  const [prazo, setPrazo] = useState(pdi?.prazo ?? '')
  const [frequencia, setFrequencia] = useState(pdi?.frequencia ?? '')

  const [saving, setSaving] = useState(false)
  const [savedMsg, setSavedMsg] = useState('')
  const [error, setError] = useState('')

  // IA (carrega a última devolutiva salva, se houver)
  const [aiLoading, setAiLoading] = useState(false)
  const [aiResult, setAiResult] = useState(aiInicial ?? '')
  const [aiEm, setAiEm] = useState(aiInicialEm ?? '')

  function toggleAcao(a: string) {
    setAcoesSel((prev) => prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a])
  }
  function addAcaoLivre() {
    const a = acaoLivre.trim()
    if (a && !acoesSel.includes(a)) { setAcoesSel((p) => [...p, a]); setAcaoLivre('') }
  }

  async function salvarPdi() {
    setError(''); setSavedMsg(''); setSaving(true)
    try {
      const res = await fetch(`/api/talent-members/${memberId}/pdi`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pdiId: pdi?.id,
          sciSituacao: sit, sciComportamento: comp, sciImpacto: imp,
          acoes: acoesSel, prazo: prazo || undefined, frequencia: frequencia || undefined,
        }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error ?? 'Erro ao salvar.'); return }
      setSavedMsg('PDI salvo com sucesso.')
      router.refresh()
    } catch {
      setError('Erro de conexão.')
    } finally {
      setSaving(false)
    }
  }

  async function aprofundarIA() {
    setError(''); setAiLoading(true); setAiResult('')
    try {
      const res = await fetch(`/api/talent-members/${memberId}/pdi/ai`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sciSituacao: sit, sciComportamento: comp, sciImpacto: imp }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error ?? 'Erro da IA.'); return }
      setAiResult(data.markdown)
      setAiEm(new Date().toISOString())
    } catch {
      setError('Erro de conexão com a IA.')
    } finally {
      setAiLoading(false)
    }
  }

  return (
    <>
      {/* ── Construtor SCI ── */}
      <div className="soul-panel">
        <h2 className="font-serif text-xl font-semibold text-soul-ink mb-1">Feedback estruturado (SCI)</h2>
        <p className="text-[13px] text-soul-ink/60 font-medium mb-4">
          Registre os fatos no método Situação, Comportamento e Impacto. Remove o julgamento e traz a conversa para o campo dos fatos.
        </p>
        <div className="space-y-3">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wide text-soul-ink/65 mb-1">Situação</label>
            <textarea value={sit} onChange={(e) => setSit(e.target.value)} rows={2} maxLength={1000}
                      placeholder="Ex: No projeto de fechamento do cliente X na última semana…"
                      className="soul-input w-full resize-y text-[14px]" />
          </div>
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wide text-soul-ink/65 mb-1">Comportamento observado</label>
            <textarea value={comp} onChange={(e) => setComp(e.target.value)} rows={2} maxLength={1000}
                      placeholder="Ex: Focou na relação mas não documentou os combinados e atrasou o relatório…"
                      className="soul-input w-full resize-y text-[14px]" />
          </div>
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wide text-soul-ink/65 mb-1">Impacto gerado</label>
            <textarea value={imp} onChange={(e) => setImp(e.target.value)} rows={2} maxLength={1000}
                      placeholder="Ex: A equipe de operações correu no fim de semana e o cliente reclamou do prazo…"
                      className="soul-input w-full resize-y text-[14px]" />
          </div>
        </div>

        {/* Botão IA */}
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button onClick={aprofundarIA} disabled={aiLoading}
                  className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-[13px] font-bold text-white disabled:opacity-60"
                  style={{ background: 'linear-gradient(135deg, #3d4f7c, #6b7fb8)' }}>
            {aiLoading ? 'Gerando roteiro…' : aiResult ? '✦ Gerar novamente com IA' : '✦ Aprofundar devolutiva com IA'}
          </button>
          <span className="text-[12px] text-soul-ink/55 font-medium">Cruza perfil, zona e os fatos SCI para gerar um roteiro completo.</span>
        </div>

        {aiResult && (
          <div className="mt-4 rounded-2xl p-5" style={{ background: 'rgba(61,79,124,0.05)', border: '1px solid rgba(61,79,124,0.20)' }}>
            <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
              <p className="text-[11px] font-bold uppercase tracking-widest" style={{ color: '#3d4f7c' }}>Devolutiva aprofundada</p>
              {aiEm && <span className="text-[11px] text-soul-ink/50 font-medium">Gerada em {new Date(aiEm).toLocaleString('pt-BR')}</span>}
            </div>
            <div className="nr1-narrative">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{aiResult}</ReactMarkdown>
            </div>
          </div>
        )}
      </div>

      {/* ── Plano de Ação (PDI) ── */}
      <div className="soul-panel">
        <h2 className="font-serif text-xl font-semibold text-soul-ink mb-1">Plano de Desenvolvimento (PDI)</h2>
        <p className="text-[13px] text-soul-ink/60 font-medium mb-3">
          Selecione as ações sob medida para o perfil {perfilApelido} ou adicione as suas. Defina prazo e frequência de acompanhamento.
        </p>

        <div className="space-y-2 mb-4">
          {acoesSugeridas.map((a, i) => {
            const checked = acoesSel.includes(a)
            return (
              <label key={i} className="flex items-start gap-2.5 p-3 rounded-2xl cursor-pointer transition-colors"
                     style={{ background: checked ? `${perfilCor}12` : 'rgba(245,240,232,0.5)', border: `1px solid ${checked ? perfilCor + '50' : 'rgba(232,226,214,0.8)'}` }}>
                <input type="checkbox" checked={checked} onChange={() => toggleAcao(a)} className="mt-1 flex-shrink-0" />
                <span className="text-[13.5px] text-soul-ink/85 font-medium leading-relaxed">{a}</span>
              </label>
            )
          })}
          {/* Ações livres já selecionadas que não estão nas sugeridas */}
          {acoesSel.filter((a) => !acoesSugeridas.includes(a)).map((a, i) => (
            <label key={`livre-${i}`} className="flex items-start gap-2.5 p-3 rounded-2xl cursor-pointer"
                   style={{ background: `${perfilCor}12`, border: `1px solid ${perfilCor}50` }}>
              <input type="checkbox" checked onChange={() => toggleAcao(a)} className="mt-1 flex-shrink-0" />
              <span className="text-[13.5px] text-soul-ink/85 font-medium leading-relaxed">{a}</span>
            </label>
          ))}
        </div>

        {/* Adicionar ação livre */}
        <div className="flex gap-2 mb-4">
          <input type="text" value={acaoLivre} onChange={(e) => setAcaoLivre(e.target.value)}
                 onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addAcaoLivre() } }}
                 placeholder="Adicionar uma ação personalizada…" className="soul-input flex-1 text-[14px]" />
          <button onClick={addAcaoLivre} type="button"
                  className="px-4 rounded-full text-[13px] font-bold border-2"
                  style={{ borderColor: 'rgba(196,99,58,0.45)', color: '#a8522e' }}>Adicionar</button>
        </div>

        {/* Prazo + frequência */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wide text-soul-ink/65 mb-1">Prazo</label>
            <input type="date" value={prazo} onChange={(e) => setPrazo(e.target.value)} className="soul-input w-full text-[14px]" />
          </div>
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wide text-soul-ink/65 mb-1">Frequência de check-in</label>
            <select value={frequencia} onChange={(e) => setFrequencia(e.target.value)} className="soul-input w-full text-[14px]">
              <option value="">Selecione…</option>
              <option value="SEMANAL">Semanal</option>
              <option value="QUINZENAL">Quinzenal</option>
              <option value="MENSAL">Mensal</option>
            </select>
          </div>
        </div>

        {error && <div className="mt-3 rounded-xl px-4 py-3 text-[13px] font-semibold" style={{ background: 'rgba(196,122,114,0.15)', border: '1px solid rgba(196,122,114,0.45)', color: '#7a3d35' }}>{error}</div>}
        {savedMsg && <div className="mt-3 rounded-xl px-4 py-3 text-[13px] font-semibold" style={{ background: 'rgba(122,158,126,0.15)', border: '1px solid rgba(122,158,126,0.4)', color: '#2f5c33' }}>{savedMsg}</div>}

        <button onClick={salvarPdi} disabled={saving}
                className="mt-4 inline-flex items-center gap-2 rounded-full px-5 py-3 text-[14px] font-bold text-white shadow-terra disabled:opacity-60"
                style={{ background: 'linear-gradient(135deg, #c4633a, #d4943a)' }}>
          {saving ? 'Salvando…' : pdi ? 'Atualizar PDI' : 'Salvar PDI'}
        </button>
      </div>

      {/* ── Timeline de acompanhamento ── */}
      {pdi && (
        <TimelineCheckins pdiId={pdi.id} checkIns={pdi.checkIns} />
      )}
    </>
  )
}

// ── Timeline de check-ins ──────────────────────────────────────
function TimelineCheckins({ pdiId, checkIns }: { pdiId: string; checkIns: CheckIn[] }) {
  const router = useRouter()
  const [nota, setNota] = useState('')
  const [statusMeta, setStatusMeta] = useState('EM_ANDAMENTO')
  const [tendencia, setTendencia] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  async function addCheckin() {
    setError('')
    if (nota.trim().length < 2) { setError('Escreva uma nota de acompanhamento.'); return }
    setSaving(true)
    try {
      const res = await fetch(`/api/talent-pdi/${pdiId}/checkins`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nota: nota.trim(), statusMeta, tendencia: tendencia || undefined }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error ?? 'Erro ao registrar.'); return }
      setNota(''); setTendencia('')
      router.refresh()
    } catch {
      setError('Erro de conexão.')
    } finally {
      setSaving(false)
    }
  }

  const statusCor: Record<string, string> = { EM_ANDAMENTO: '#d4943a', CONCLUIDO: '#7a9e7e', EM_ATRASO: '#c47a72' }

  return (
    <div className="soul-panel">
      <h2 className="font-serif text-xl font-semibold text-soul-ink mb-1">Acompanhamento</h2>
      <p className="text-[13px] text-soul-ink/60 font-medium mb-4">
        Registre cada check-in com o colaborador. O segredo da tração é a frequência.
      </p>

      {/* Novo check-in */}
      <div className="rounded-2xl p-4 mb-5" style={{ background: 'rgba(245,240,232,0.5)', border: '1px solid rgba(232,226,214,0.8)' }}>
        <textarea value={nota} onChange={(e) => setNota(e.target.value)} rows={2} maxLength={1000}
                  placeholder="Como foi a evolução nas últimas semanas? O comportamento mudou? Refletiu nas entregas?"
                  className="soul-input w-full resize-y text-[14px] mb-3" />
        <div className="flex flex-wrap items-center gap-3">
          <select value={statusMeta} onChange={(e) => setStatusMeta(e.target.value)} className="soul-input text-[13px] py-2 w-auto">
            <option value="EM_ANDAMENTO">Em andamento</option>
            <option value="CONCLUIDO">Concluído</option>
            <option value="EM_ATRASO">Em atraso</option>
          </select>
          <select value={tendencia} onChange={(e) => setTendencia(e.target.value)} className="soul-input text-[13px] py-2 w-auto">
            <option value="">Tendência…</option>
            <option value="SUBINDO">↑ Subindo rumo aos 20%</option>
            <option value="ESTAVEL">→ Estável</option>
            <option value="DESCENDO">↓ Descendo</option>
          </select>
          <button onClick={addCheckin} disabled={saving}
                  className="ml-auto inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-bold text-white shadow-terra disabled:opacity-60"
                  style={{ background: 'linear-gradient(135deg, #c4633a, #d4943a)' }}>
            {saving ? 'Registrando…' : '+ Registrar check-in'}
          </button>
        </div>
        {error && <p className="text-[12px] font-semibold mt-2" style={{ color: '#a8522e' }}>{error}</p>}
      </div>

      {/* Timeline */}
      {checkIns.length === 0 ? (
        <p className="text-[13.5px] text-soul-ink/55 font-medium text-center py-3">Nenhum check-in registrado ainda.</p>
      ) : (
        <div className="space-y-0">
          {checkIns.map((c, i) => (
            <div key={c.id} className="flex gap-3">
              {/* Linha vertical + nó */}
              <div className="flex flex-col items-center flex-shrink-0">
                <div className="w-3 h-3 rounded-full mt-1.5" style={{ background: statusCor[c.statusMeta] ?? '#94a3b8' }} />
                {i < checkIns.length - 1 && <div className="w-0.5 flex-1" style={{ background: 'rgba(232,226,214,1)' }} />}
              </div>
              <div className="pb-4 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[12px] font-bold text-soul-ink/80">{new Date(c.createdAt).toLocaleDateString('pt-BR')}</span>
                  <span className="text-[10.5px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full"
                        style={{ background: `${statusCor[c.statusMeta]}22`, color: statusCor[c.statusMeta] }}>
                    {STATUS_META_LABELS[c.statusMeta] ?? c.statusMeta}
                  </span>
                  {c.tendencia && <span className="text-[11.5px] font-bold text-soul-ink/60">{TENDENCIA_LABELS[c.tendencia] ?? c.tendencia}</span>}
                </div>
                <p className="text-[13.5px] text-soul-ink/85 font-medium leading-relaxed mt-1">{c.nota}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

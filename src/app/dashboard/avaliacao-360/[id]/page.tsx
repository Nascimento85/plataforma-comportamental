import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getSession } from '@/lib/session'
import { prisma } from '@/lib/prisma'
import {
  agregar360,
  PILAR_360_LABELS,
  RATER_360_LABELS_PLURAL,
  RATER_360_CORES,
  type RespostaArmazenada360,
  type Rater360,
} from '@/content/gestao-times/avaliacao-360'
import Detalhe360Client from './Detalhe360Client'
import PrintPageButton from '@/components/ui/PrintPageButton'

export const metadata: Metadata = { title: 'Avaliação 360°' }
export const dynamic = 'force-dynamic'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const prismaAny = prisma as any
const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://mapacomportamental.com'

export default async function Avaliacao360DetailPage({ params }: { params: { id: string } }) {
  const session = await getSession()
  const companyId = session!.id

  const ciclo = await prismaAny.avaliacao360.findUnique({
    where: { id: params.id },
    include: {
      convites:  { orderBy: { createdAt: 'asc' } },
      respostas: true,
    },
  })
  if (!ciclo || ciclo.companyId !== companyId) return notFound()

  // Agrega respostas
  const respostas: RespostaArmazenada360[] = ciclo.respostas.map((r: { role: string; scores: string; continuarTexto: string | null; melhorarTexto: string | null }) => {
    let parsed: { scoreFinal: number; pilares: Record<string, number> }
    try { parsed = JSON.parse(r.scores) } catch { parsed = { scoreFinal: 0, pilares: {} } }
    return {
      role: r.role as Rater360,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      pilares: parsed.pilares as any,
      scoreFinal: parsed.scoreFinal,
      continuarTexto: r.continuarTexto,
      melhorarTexto: r.melhorarTexto,
    }
  })
  const result = agregar360(respostas)
  const temResultado = result.totalRespostas > 0

  // Convites para o client (com links)
  const convites = ciclo.convites.map((c: { id: string; role: string; nome: string; email: string; status: string; token: string }) => ({
    id: c.id, role: c.role, nome: c.nome, email: c.email, status: c.status,
    link: `${APP_URL}/avaliacao-360/${c.token}`,
  }))

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <Link href="/dashboard/avaliacao-360" className="no-print text-[13px] text-soul-ink/60 hover:text-soul-ink font-sans">← Avaliações 360°</Link>
          <h1 className="font-serif font-semibold text-3xl text-soul-ink mt-1">{ciclo.avaliadoNome}</h1>
          <p className="text-sm text-soul-ink/68 font-sans">
            {ciclo.titulo ? `${ciclo.titulo} · ` : ''}{result.totalRespostas} de {convites.length} responderam
          </p>
        </div>
        {temResultado && <PrintPageButton />}
      </div>

      {/* Resultado (área do PDF) */}
      <div className="pdf-area space-y-6">
        {temResultado ? (
          <Resultado360View result={result} />
        ) : (
          <div className="bg-soul-parchment rounded-3xl p-8 text-center border border-soul-mist/60">
            <div className="text-3xl mb-2">⏳</div>
            <p className="text-sm text-soul-ink/68 font-sans">Ainda sem respostas. Assim que os avaliadores responderem, o radar comparativo aparece aqui.</p>
          </div>
        )}
      </div>

      {/* Gestão de avaliadores (copiar links / adicionar) — fora do PDF */}
      <div className="no-print">
        <Detalhe360Client cicloId={ciclo.id} convites={convites} />
      </div>
    </div>
  )
}

// ── Visualização do resultado (server) ───────────────────
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Resultado360View({ result }: { result: ReturnType<typeof agregar360> }) {
  const radar = result.radar
  // Geometria do hexágono
  const cx = 170, cy = 160, R = 116
  const n = radar.length
  const ang = (i: number) => -Math.PI / 2 + (2 * Math.PI * i) / n
  const pto = (i: number, val: number) => {
    const rr = (val / 5) * R
    return `${(cx + Math.cos(ang(i)) * rr).toFixed(1)},${(cy + Math.sin(ang(i)) * rr).toFixed(1)}`
  }
  const autoPoly = radar.every((d) => d.auto != null) ? radar.map((d, i) => pto(i, d.auto as number)).join(' ') : null
  const outrosPoly = radar.every((d) => d.outros != null) ? radar.map((d, i) => pto(i, d.outros as number)).join(' ') : null

  return (
    <div className="space-y-5">
      {/* Scores topo */}
      <div className="grid grid-cols-2 gap-4">
        <ScoreBox label="Autoimagem" value={result.scoreAuto} cor={RATER_360_CORES.AUTO} />
        <ScoreBox label="Percepção dos outros" value={result.scoreOutros} cor="#6f86c9" />
      </div>

      {/* Radar */}
      <div className="bg-soul-parchment rounded-3xl p-6 border border-soul-mist/60">
        <h3 className="font-serif font-semibold text-lg text-soul-ink mb-1">Radar comparativo</h3>
        <p className="text-[13px] text-soul-ink/62 font-sans mb-4">Onde os anéis se afastam, há diferença entre como a pessoa se vê e como o time a vê.</p>
        <div className="flex justify-center">
          <svg viewBox="0 0 340 340" className="w-full" style={{ maxWidth: 360 }}>
            {[1, 2, 3, 4, 5].map((s) => (
              <polygon key={s}
                points={radar.map((_, i) => { const rr = (s / 5) * R; return `${(cx + Math.cos(ang(i)) * rr).toFixed(1)},${(cy + Math.sin(ang(i)) * rr).toFixed(1)}` }).join(' ')}
                fill="none" stroke="rgba(58,61,69,0.5)" strokeWidth="1" />
            ))}
            {radar.map((_, i) => (
              <line key={i} x1={cx} y1={cy} x2={cx + Math.cos(ang(i)) * R} y2={cy + Math.sin(ang(i)) * R} stroke="rgba(58,61,69,0.5)" strokeWidth="1" />
            ))}
            {outrosPoly && <polygon points={outrosPoly} fill="rgba(111,134,201,0.18)" stroke="#6f86c9" strokeWidth="2" />}
            {autoPoly && <polygon points={autoPoly} fill="rgba(201,168,76,0.16)" stroke="#c9a84c" strokeWidth="2" strokeDasharray="5,4" />}
            {radar.map((d, i) => {
              const lr = R + 24
              const x = cx + Math.cos(ang(i)) * lr
              const y = cy + Math.sin(ang(i)) * lr
              return (
                <text key={i} x={x} y={y} textAnchor="middle" fontSize="11" fontWeight="700" fill="#cfd5e0">
                  {d.short}
                </text>
              )
            })}
          </svg>
        </div>
        <div className="flex items-center justify-center gap-5 mt-2 text-[13px]">
          <span className="flex items-center gap-1.5"><span style={{ width: 14, height: 3, background: '#c9a84c', display: 'inline-block', borderRadius: 2 }} /> Autoimagem</span>
          <span className="flex items-center gap-1.5"><span style={{ width: 14, height: 3, background: '#6f86c9', display: 'inline-block', borderRadius: 2 }} /> Outros</span>
        </div>
      </div>

      {/* Tabela por competência */}
      <div className="bg-soul-parchment rounded-3xl p-6 border border-soul-mist/60">
        <h3 className="font-serif font-semibold text-lg text-soul-ink mb-3">Por competência</h3>
        <div className="space-y-2.5">
          {radar.map((d) => (
            <div key={d.pilar} className="flex items-center justify-between text-[14px]">
              <span className="text-soul-ink/85 font-sans">{d.label}</span>
              <span className="font-sans tabular-nums">
                <span style={{ color: '#c9a84c' }}>Auto {d.auto ?? '—'}</span>
                <span className="text-soul-ink/40 mx-1.5">·</span>
                <span style={{ color: '#8fa6da' }}>Outros {d.outros ?? '—'}</span>
                {d.gap != null && Math.abs(d.gap) >= 1 && (
                  <span className="ml-2 text-[12px] font-bold" style={{ color: d.gap > 0 ? '#f0a59e' : '#7a9e7e' }}>
                    {d.gap > 0 ? `▲ ${d.gap}` : `▼ ${Math.abs(d.gap)}`}
                  </span>
                )}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Pontos cegos / forças ocultas */}
      {(result.pontosCegos.length > 0 || result.forcasOcultas.length > 0) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {result.pontosCegos.length > 0 && (
            <div className="rounded-2xl p-5" style={{ background: 'rgba(240,165,158,0.08)', border: '1px solid rgba(240,165,158,0.25)' }}>
              <p className="text-[12px] font-bold uppercase tracking-widest mb-2" style={{ color: '#f0a59e' }}>Pontos cegos</p>
              <p className="text-[13px] text-soul-ink/75 font-sans mb-2">Você se vê melhor do que os outros te veem em:</p>
              <ul className="space-y-1">
                {result.pontosCegos.map((p) => <li key={p} className="text-[14px] text-soul-ink font-sans">• {PILAR_360_LABELS[p]}</li>)}
              </ul>
            </div>
          )}
          {result.forcasOcultas.length > 0 && (
            <div className="rounded-2xl p-5" style={{ background: 'rgba(122,158,126,0.08)', border: '1px solid rgba(122,158,126,0.25)' }}>
              <p className="text-[12px] font-bold uppercase tracking-widest mb-2" style={{ color: '#7a9e7e' }}>Forças ocultas</p>
              <p className="text-[13px] text-soul-ink/75 font-sans mb-2">Os outros te veem melhor do que você se vê em:</p>
              <ul className="space-y-1">
                {result.forcasOcultas.map((p) => <li key={p} className="text-[14px] text-soul-ink font-sans">• {PILAR_360_LABELS[p]}</li>)}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Participação por papel */}
      <div className="bg-soul-parchment rounded-3xl p-5 border border-soul-mist/60">
        <p className="text-[12px] font-bold uppercase tracking-widest text-soul-ink/60 mb-2">Participação</p>
        <div className="flex flex-wrap gap-2">
          {(['AUTO', 'GESTOR', 'PAR', 'SUBORDINADO'] as Rater360[]).map((role) => (
            <span key={role} className="text-[13px] font-sans px-3 py-1 rounded-full"
              style={{ background: `${RATER_360_CORES[role]}22`, color: RATER_360_CORES[role] }}>
              {RATER_360_LABELS_PLURAL[role]}: {result.countPorPapel[role]}
            </span>
          ))}
        </div>
      </div>

      {/* Feedbacks abertos */}
      {(result.feedbackContinuar.length > 0 || result.feedbackMelhorar.length > 0) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FeedbackCol titulo="Deve CONTINUAR" itens={result.feedbackContinuar} cor="#7a9e7e" />
          <FeedbackCol titulo="Deve MELHORAR" itens={result.feedbackMelhorar} cor="#e09070" />
        </div>
      )}
    </div>
  )
}

function ScoreBox({ label, value, cor }: { label: string; value: number | null; cor: string }) {
  return (
    <div className="bg-soul-parchment rounded-2xl p-5 border border-soul-mist/60 text-center">
      <p className="text-[12px] font-bold uppercase tracking-widest text-soul-ink/60 mb-1">{label}</p>
      <p className="font-serif font-semibold text-4xl" style={{ color: cor }}>{value != null ? value.toFixed(1) : '—'}</p>
      <p className="text-[12px] text-soul-ink/50">de 5,0</p>
    </div>
  )
}

function FeedbackCol({ titulo, itens, cor }: { titulo: string; itens: string[]; cor: string }) {
  return (
    <div className="bg-soul-parchment rounded-2xl p-5 border border-soul-mist/60">
      <p className="text-[12px] font-bold uppercase tracking-widest mb-3" style={{ color: cor }}>{titulo}</p>
      {itens.length === 0 ? (
        <p className="text-[13px] text-soul-ink/50 font-sans">Sem comentários.</p>
      ) : (
        <ul className="space-y-2.5">
          {itens.map((t, i) => (
            <li key={i} className="text-[13.5px] text-soul-ink/82 font-sans leading-relaxed pl-3" style={{ borderLeft: `2px solid ${cor}55` }}>{t}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

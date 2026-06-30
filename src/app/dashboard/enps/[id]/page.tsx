import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getSession } from '@/lib/session'
import { prisma } from '@/lib/prisma'
import {
  agregarEnps, CATEGORIA_CORES, type TempoCasa,
} from '@/content/enps'
import DetalheEnpsClient from './DetalheEnpsClient'
import PrintPageButton from '@/components/ui/PrintPageButton'

export const metadata: Metadata = { title: 'eNPS' }
export const dynamic = 'force-dynamic'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const prismaAny = prisma as any
const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://mapacomportamental.com'

export default async function EnpsDetailPage({ params }: { params: { id: string } }) {
  const session = await getSession()
  const companyId = session!.id

  const coleta = await prismaAny.enpsColeta.findUnique({
    where: { id: params.id },
    include: { convites: { orderBy: { createdAt: 'asc' } }, respostas: true },
  })
  if (!coleta || coleta.companyId !== companyId) return notFound()

  const respostas = coleta.respostas.map((r: { nota: number; tempoCasa: string | null; motivo: string | null }) => ({
    nota: r.nota, tempoCasa: (r.tempoCasa as TempoCasa | null), motivo: r.motivo,
  }))
  const result = agregarEnps(respostas)
  const temResultado = result.n > 0

  let empresa = ''
  try {
    const company = await prismaAny.company.findUnique({ where: { id: companyId }, select: { companyName: true, name: true } })
    empresa = company?.companyName || company?.name || ''
  } catch { /* ok */ }

  const convites = coleta.convites.map((c: { id: string; nome: string; email: string; status: string; token: string }) => ({
    id: c.id, nome: c.nome, email: c.email, status: c.status, link: `${APP_URL}/enps/${c.token}`,
  }))

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <Link href="/dashboard/enps" className="no-print text-[13px] text-soul-ink/60 hover:text-soul-ink font-sans">← Pesquisas eNPS</Link>
          <h1 className="font-serif font-semibold text-3xl text-soul-ink mt-1">{coleta.titulo || 'Pesquisa de clima'}</h1>
          <p className="text-sm text-soul-ink/68 font-sans">{result.n} de {convites.length} responderam</p>
        </div>
        {temResultado && <PrintPageButton />}
      </div>

      {/* Resultado (área do PDF) */}
      <div className="pdf-area space-y-6">
        {temResultado ? (
          <ResultadoEnpsView result={result} />
        ) : (
          <div className="bg-soul-parchment rounded-3xl p-8 text-center border border-soul-mist/60">
            <div className="text-3xl mb-2">⏳</div>
            <p className="text-sm text-soul-ink/68 font-sans">Ainda sem respostas. O índice e a leitura aparecem aqui assim que o time responder.</p>
          </div>
        )}
      </div>

      {/* Gestão de convidados — fora do PDF */}
      <div className="no-print">
        <DetalheEnpsClient coletaId={coleta.id} convites={convites} empresa={empresa} />
      </div>
    </div>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ResultadoEnpsView({ result }: { result: ReturnType<typeof agregarEnps> }) {
  const z = result.zona
  return (
    <div className="space-y-5">
      {/* Índice + zona */}
      <div className="bg-soul-parchment rounded-3xl p-6 border border-soul-mist/60 text-center">
        <p className="text-[12px] font-bold uppercase tracking-widest text-soul-ink/60 mb-1">Índice eNPS</p>
        <p className="font-serif font-semibold leading-none" style={{ fontSize: 64, color: z.cor }}>{result.score > 0 ? `+${result.score}` : result.score}</p>
        <p className="text-[13px] text-soul-ink/55 mt-1">escala de −100 a +100</p>
        <div className="inline-block mt-3 px-4 py-1.5 rounded-full text-[14px] font-bold" style={{ background: `${z.cor}22`, color: z.cor }}>
          {z.label} ({z.faixa})
        </div>
        <p className="text-[14px] text-soul-ink/78 font-sans mt-3 max-w-lg mx-auto leading-relaxed">{z.texto}</p>
      </div>

      {/* Distribuição */}
      <div className="bg-soul-parchment rounded-3xl p-6 border border-soul-mist/60">
        <h3 className="font-serif font-semibold text-lg text-soul-ink mb-4">Distribuição das respostas</h3>
        <div className="flex h-7 rounded-full overflow-hidden mb-3" style={{ background: 'rgba(58,61,69,0.5)' }}>
          {result.pctPromotores > 0 && <div style={{ width: `${result.pctPromotores}%`, background: CATEGORIA_CORES.PROMOTOR }} />}
          {result.pctNeutros > 0 && <div style={{ width: `${result.pctNeutros}%`, background: CATEGORIA_CORES.NEUTRO }} />}
          {result.pctDetratores > 0 && <div style={{ width: `${result.pctDetratores}%`, background: CATEGORIA_CORES.DETRATOR }} />}
        </div>
        <div className="grid grid-cols-3 gap-3 text-center">
          <Cat cor={CATEGORIA_CORES.PROMOTOR} n={result.promotores} pct={result.pctPromotores} label="Promotores" faixa="notas 9–10" />
          <Cat cor={CATEGORIA_CORES.NEUTRO} n={result.neutros} pct={result.pctNeutros} label="Neutros" faixa="notas 7–8" />
          <Cat cor={CATEGORIA_CORES.DETRATOR} n={result.detratores} pct={result.pctDetratores} label="Detratores" faixa="notas 0–6" />
        </div>
      </div>

      {/* Cruzamento por tempo de casa */}
      {result.porTempoCasa.some((t) => t.n > 0) && (
        <div className="bg-soul-parchment rounded-3xl p-6 border border-soul-mist/60">
          <h3 className="font-serif font-semibold text-lg text-soul-ink mb-1">eNPS por tempo de casa</h3>
          <p className="text-[13px] text-soul-ink/62 font-sans mb-4">Onde o clima esfria primeiro: compare quem chegou há pouco com quem está há mais tempo.</p>
          <div className="space-y-2.5">
            {result.porTempoCasa.filter((t) => t.n > 0).map((t) => (
              <div key={t.faixa} className="flex items-center justify-between text-[14px]">
                <span className="text-soul-ink/85 font-sans">{t.label} <span className="text-soul-ink/45">({t.n})</span></span>
                <span className="font-bold tabular-nums" style={{ color: t.score == null ? '#888' : t.score < 0 ? '#cf6f5e' : t.score < 50 ? '#d4b35e' : '#7a9e7e' }}>
                  {t.score == null ? '—' : t.score > 0 ? `+${t.score}` : t.score}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Motivos */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <MotivosCol titulo="Promotores" itens={result.motivos.PROMOTOR} cor={CATEGORIA_CORES.PROMOTOR} />
        <MotivosCol titulo="Neutros" itens={result.motivos.NEUTRO} cor={CATEGORIA_CORES.NEUTRO} />
        <MotivosCol titulo="Detratores" itens={result.motivos.DETRATOR} cor={CATEGORIA_CORES.DETRATOR} />
      </div>
    </div>
  )
}

function Cat({ cor, n, pct, label, faixa }: { cor: string; n: number; pct: number; label: string; faixa: string }) {
  return (
    <div>
      <p className="font-serif font-semibold text-2xl" style={{ color: cor }}>{pct}%</p>
      <p className="text-[13px] font-bold text-soul-ink">{label}</p>
      <p className="text-[12px] text-soul-ink/55">{n} · {faixa}</p>
    </div>
  )
}

function MotivosCol({ titulo, itens, cor }: { titulo: string; itens: string[]; cor: string }) {
  return (
    <div className="bg-soul-parchment rounded-2xl p-5 border border-soul-mist/60">
      <p className="text-[12px] font-bold uppercase tracking-widest mb-3" style={{ color: cor }}>{titulo} · {itens.length}</p>
      {itens.length === 0 ? (
        <p className="text-[13px] text-soul-ink/50 font-sans">Sem comentários.</p>
      ) : (
        <ul className="space-y-2.5 max-h-72 overflow-y-auto">
          {itens.map((t, i) => (
            <li key={i} className="text-[13.5px] text-soul-ink/82 font-sans leading-relaxed pl-3" style={{ borderLeft: `2px solid ${cor}55` }}>{t}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

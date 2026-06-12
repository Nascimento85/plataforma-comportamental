// ============================================================
// /admin/avaliacao-lider — visão consolidada (todas as empresas)
// Avaliação de Liderança: líderes, participação e classificação.
// Acesso restrito a admin (gate no layout do /admin).
// ============================================================

import type { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import { agregarRespostasLider, MIN_RESPOSTAS_LIDER } from '@/content/gestao-times/avaliacao-lider'

export const metadata: Metadata = { title: 'Avaliação de Líderes · Admin' }
export const dynamic = 'force-dynamic'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const prismaAny = prisma as any

export default async function AdminAvaliacaoLiderPage() {
  // Times com líder definido ou com alguma atividade de avaliação
  const teams = await prismaAny.talentTeam.findMany({
    where: {
      OR: [
        { liderNome: { not: null } },
        { liderConvites: { some: {} } },
        { liderRespostas: { some: {} } },
      ],
    },
    include: {
      company: { select: { name: true, companyName: true, email: true } },
      _count: { select: { liderConvites: true, liderRespostas: true } },
      liderConvites: { where: { status: 'COMPLETED' }, select: { id: true } },
      liderRespostas: { select: { respostas: true } },
    },
    orderBy: { updatedAt: 'desc' },
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const linhas = (teams as any[]).map((t) => {
    const lista = t.liderRespostas
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((r: any) => { try { return JSON.parse(r.respostas) } catch { return null } })
      .filter(Boolean)
    const agg = lista.length >= MIN_RESPOSTAS_LIDER ? agregarRespostasLider(lista) : null
    return {
      id: t.id,
      empresa: t.company.companyName || t.company.name,
      email: t.company.email,
      time: t.nome,
      lider: t.liderNome as string | null,
      convites: t._count.liderConvites as number,
      respostas: t._count.liderRespostas as number,
      agg,
    }
  })

  const totalRespostas = linhas.reduce((acc, l) => acc + l.respostas, 0)
  const liberados = linhas.filter((l) => l.agg).length
  const criticos = linhas.filter((l) => l.agg && l.agg.classificacao === 'REGULAR').length

  return (
    <div className="space-y-7">
      <div>
        <p className="text-[13px] font-bold uppercase tracking-widest mb-2" style={{ color: '#c9a84c' }}>
          Administração
        </p>
        <h1 className="font-serif font-semibold text-4xl text-soul-ink leading-tight">Avaliação de Líderes</h1>
        <p className="text-[15px] text-soul-ink/85 mt-2 font-medium">
          Visão consolidada de todas as empresas: participação, score e classificação de cada líder avaliado.
        </p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Times com avaliação', valor: linhas.length },
          { label: 'Respostas recebidas', valor: totalRespostas },
          { label: 'Resultados liberados', valor: liberados },
          { label: 'Líderes em zona crítica', valor: criticos, destaque: criticos > 0 },
        ].map((k) => (
          <div key={k.label} className="soul-panel"
               style={k.destaque ? { borderLeft: '4px solid #c0392b' } : undefined}>
            <p className="text-[13px] font-bold uppercase tracking-widest text-soul-ink/65">{k.label}</p>
            <p className="font-serif text-3xl font-semibold mt-2 leading-none"
               style={{ color: k.destaque ? '#f0a892' : undefined }}>{k.valor}</p>
          </div>
        ))}
      </div>

      {/* Tabela */}
      {linhas.length === 0 ? (
        <div className="soul-panel text-center py-12">
          <p className="text-[15px] text-soul-ink/72 font-medium">
            Nenhuma avaliação de liderança iniciada ainda em nenhuma empresa.
          </p>
        </div>
      ) : (
        <div className="soul-panel overflow-x-auto p-0">
          <table className="w-full text-left" style={{ minWidth: '760px' }}>
            <thead>
              <tr className="border-b border-soul-mist/60">
                {['Empresa', 'Time', 'Líder', 'Participação', 'Score', 'Classificação'].map((h) => (
                  <th key={h} className="px-5 py-4 text-[12.5px] font-bold uppercase tracking-widest text-soul-ink/65">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {linhas.map((l) => (
                <tr key={l.id} className="border-b border-soul-mist/40 last:border-b-0">
                  <td className="px-5 py-4">
                    <p className="text-[14px] font-bold text-soul-ink leading-tight">{l.empresa}</p>
                    <p className="text-[12.5px] text-soul-ink/65 font-medium">{l.email}</p>
                  </td>
                  <td className="px-5 py-4 text-[14px] font-semibold text-soul-ink/88">{l.time}</td>
                  <td className="px-5 py-4 text-[14px] font-semibold text-soul-ink/88">{l.lider ?? '—'}</td>
                  <td className="px-5 py-4">
                    <p className="text-[14px] font-bold text-soul-ink/88">{l.respostas} de {l.convites || '—'}</p>
                    <p className="text-[12px] text-soul-ink/65 font-semibold">respostas / convites</p>
                  </td>
                  <td className="px-5 py-4 font-serif text-2xl font-semibold text-soul-ink">
                    {l.agg ? l.agg.scoreFinal.toFixed(1) : '—'}
                  </td>
                  <td className="px-5 py-4">
                    {l.agg ? (
                      <span className="text-[12.5px] font-bold px-3 py-1.5 rounded-full text-white whitespace-nowrap"
                            style={{ background: l.agg.cor }}>
                        {l.agg.classificacao}
                      </span>
                    ) : (
                      <span className="text-[12.5px] font-semibold text-soul-ink/65 whitespace-nowrap">
                        aguardando ({l.respostas}/{MIN_RESPOSTAS_LIDER})
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p className="text-[13px] text-soul-ink/65 font-medium">
        🔒 O score só é liberado com {MIN_RESPOSTAS_LIDER} ou mais respostas por time, para preservar o anonimato dos
        respondentes. Os relatos SCI individuais não aparecem nesta visão, apenas na tela da empresa.
      </p>
    </div>
  )
}

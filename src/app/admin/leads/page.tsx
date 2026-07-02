import { prisma } from '@/lib/prisma'
import type { Metadata } from 'next'
import { TEST_LABELS_SHORT as TEST_LABELS } from '@/lib/test-labels'

export const metadata: Metadata = { title: 'Admin — Leads da Degustação' }
export const dynamic = 'force-dynamic'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const prismaAny = prisma as any

function waLink(whatsapp: string): string {
  const digits = whatsapp.replace(/\D/g, '')
  const withCountry = digits.startsWith('55') ? digits : `55${digits}`
  return `https://wa.me/${withCountry}`
}

interface PageProps {
  searchParams: { src?: string }
}

export default async function AdminLeadsPage({ searchParams }: PageProps) {
  const src = (searchParams.src ?? '').trim()

  const leads = await prismaAny.trialLead.findMany({
    where: src ? { src } : {},
    orderBy: { createdAt: 'desc' },
    take: 500,
  }) as Array<{
    id: string; firstName: string; whatsapp: string; src: string | null
    testTypes: string; bundleId: string | null; firstToken: string | null
    status: string; convertedCompanyId: string | null; createdAt: Date
  }>

  // Deriva "fez o teste" cruzando com os assessments (por token ou bundle).
  const tokens = leads.map((l) => l.firstToken).filter(Boolean) as string[]
  const bundles = leads.map((l) => l.bundleId).filter(Boolean) as string[]
  const assessments = (tokens.length || bundles.length)
    ? await prisma.assessment.findMany({
        where: { OR: [{ token: { in: tokens } }, { bundleId: { in: bundles } }] },
        select: { token: true, bundleId: true, status: true },
      })
    : []
  function didTaste(l: typeof leads[0]): boolean {
    return assessments.some((a) =>
      (a.status === 'COMPLETED') && (
        (l.bundleId && a.bundleId === l.bundleId) || (l.firstToken && a.token === l.firstToken)
      )
    )
  }

  const total     = leads.length
  const converted = leads.filter((l) => l.status === 'CONVERTED').length
  const tasted    = leads.filter(didTaste).length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif font-semibold text-3xl text-soul-ink">Leads · Degustação QR</h1>
        <p className="text-sm text-soul-ink/68 mt-1 font-sans">
          {total} lead{total !== 1 ? 's' : ''} · {tasted} fizeram ao menos 1 teste · {converted} viraram conta
          {src && ` · filtro origem: ${src}`}
        </p>
      </div>

      <div className="bg-soul-parchment rounded-3xl overflow-hidden" style={{ border: '1px solid rgba(58,61,69,0.6)' }}>
        {leads.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-4xl mb-4">🎯</p>
            <p className="font-serif font-semibold text-lg text-soul-ink">Nenhum lead ainda</p>
            <p className="text-sm font-sans mt-1" style={{ color: 'rgba(240,236,227,0.68)' }}>
              Os leads aparecem aqui assim que alguém usa o QR de degustação.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead style={{ borderBottom: '1px solid rgba(58,61,69,0.6)' }}>
                <tr style={{ background: 'rgba(255,255,255,0.04)' }}>
                  {['Nome', 'WhatsApp', 'Origem', 'Testes', 'Fez?', 'Status', 'Data'].map((h) => (
                    <th key={h} className="text-left px-5 py-3 text-[12px] font-sans font-semibold uppercase tracking-[0.12em]"
                        style={{ color: 'rgba(240,236,227,0.92)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {leads.map((l) => {
                  const tests = l.testTypes.split(',').filter(Boolean).map((t) => TEST_LABELS[t] ?? t).join(' + ')
                  const tasted = didTaste(l)
                  const conv = l.status === 'CONVERTED'
                  return (
                    <tr key={l.id} style={{ borderBottom: '1px solid rgba(58,61,69,0.4)' }}>
                      <td className="px-5 py-4 font-medium font-sans text-soul-ink">{l.firstName}</td>
                      <td className="px-5 py-4 font-sans">
                        <a href={waLink(l.whatsapp)} target="_blank" rel="noreferrer"
                           className="hover:underline" style={{ color: '#7a9e7e' }}>
                          {l.whatsapp}
                        </a>
                      </td>
                      <td className="px-5 py-4 font-sans text-sm" style={{ color: 'rgba(240,236,227,0.68)' }}>{l.src ?? '—'}</td>
                      <td className="px-5 py-4 font-sans text-sm text-soul-ink">{tests}</td>
                      <td className="px-5 py-4 font-sans text-sm">{tasted ? '✅' : '—'}</td>
                      <td className="px-5 py-4">
                        <span className="text-xs font-medium font-sans px-2.5 py-1 rounded-full"
                              style={conv
                                ? { background: 'rgba(122,158,126,0.15)', color: '#7a9e7e', border: '1px solid rgba(122,158,126,0.3)' }
                                : { background: 'rgba(61,79,124,0.12)', color: '#8fa6da', border: '1px solid rgba(61,79,124,0.28)' }}>
                          {conv ? '★ Virou conta' : 'Lead'}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-sm font-sans" style={{ color: 'rgba(240,236,227,0.68)' }}>
                        {new Date(l.createdAt).toLocaleDateString('pt-BR')}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

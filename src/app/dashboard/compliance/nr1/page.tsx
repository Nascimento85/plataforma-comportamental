// ============================================================
// /dashboard/compliance/nr1 — Listagem de coletas NR-1
// ============================================================

import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getSession } from '@/lib/session'
import { prisma } from '@/lib/prisma'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const prismaAny = prisma as any

export const metadata: Metadata = { title: 'NR-1 Psicossocial' }

export default async function NR1IndexPage() {
  const session = await getSession()
  if (!session?.id) redirect('/login')

  const [coletas, setores] = await Promise.all([
    prismaAny.nR1Coleta.findMany({
      where: { companyId: session.id },
      orderBy: { createdAt: 'desc' },
      include: { _count: { select: { convites: true, respostas: true } } },
    }),
    prismaAny.nR1Setor.findMany({ where: { companyId: session.id } }),
  ])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <span className="inline-block text-[11px] font-bold uppercase tracking-[0.18em] px-3 py-1 rounded-full mb-3"
                style={{ background: 'rgba(196,99,58,0.15)', color: '#a8522e' }}>
            Compliance · NR-1
          </span>
          <h1 className="font-serif font-semibold text-4xl text-soul-ink leading-tight">
            Diagnóstico Psicossocial
          </h1>
          <p className="text-base text-soul-ink/80 mt-2 font-medium max-w-2xl leading-relaxed">
            Avaliação de riscos psicossociais conforme NR-1 + NR-17. Combina os instrumentos científicos <strong>Karasek (JCQ)</strong>, <strong>ERI (Esforço-Recompensa)</strong> e <strong>COPSOQ II</strong> com cruzamento DISC do setor.
          </p>
        </div>
        <Link
          href="/dashboard/compliance/nr1/nova"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-[14px] font-sans font-bold text-white transition-all hover:-translate-y-px shadow-terra"
          style={{ background: 'linear-gradient(135deg, #c4633a, #d4943a)' }}
        >
          ✦ Nova coleta
        </Link>
      </div>

      {/* Bloco de princípios */}
      <section className="rounded-3xl p-6 md:p-8"
               style={{ background: 'linear-gradient(135deg, rgba(196,99,58,0.06), rgba(212,148,58,0.08))', border: '1px solid rgba(196,99,58,0.18)' }}>
        <h2 className="font-serif font-semibold text-xl text-soul-ink leading-tight mb-3">
          Anonimato blindado por design
        </h2>
        <ul className="space-y-2 text-[14px] text-soul-ink font-medium">
          <li>· Funcionário recebe link único com token aleatório (sem necessidade de senha).</li>
          <li>· Respostas são gravadas <strong>sem vínculo de identidade</strong> — apenas o setor (GHE).</li>
          <li>· Mínimo de <strong>5 respondentes</strong> por setor para gerar relatório (proteção contra dedução por exclusão).</li>
          <li>· Administrador vê apenas <strong>taxa de adesão</strong>, nunca respostas individuais.</li>
        </ul>
      </section>

      {/* Coletas */}
      <section>
        <h2 className="font-serif font-semibold text-2xl text-soul-ink mb-4">Coletas</h2>

        {coletas.length === 0 ? (
          <div className="soul-panel text-center py-16">
            <div className="text-5xl mb-4">📋</div>
            <h3 className="font-serif font-semibold text-2xl text-soul-ink mb-2">Nenhuma coleta ainda</h3>
            <p className="text-[15px] text-soul-ink/80 mb-6 max-w-md mx-auto font-medium">
              {setores.length === 0
                ? 'Crie sua primeira coleta — vamos te guiar pelo cadastro de setores e funcionários no caminho.'
                : 'Crie sua primeira coleta e envie os links anônimos aos funcionários.'}
            </p>
            <Link
              href="/dashboard/compliance/nr1/nova"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-[14px] font-bold text-white"
              style={{ background: 'linear-gradient(135deg, #c4633a, #d4943a)' }}
            >
              ✦ Criar primeira coleta
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {coletas.map((c: { id: string; nome: string; status: string; expiresAt: Date; createdAt: Date; _count: { convites: number; respostas: number } }) => {
              const totalResp = c._count.respostas
              const totalConv = c._count.convites * 3 // 3 instrumentos por respondente
              const respondentesEstimados = Math.floor(totalResp / 3) // 3 respostas por respondente
              return (
                <Link key={c.id} href={`/dashboard/compliance/nr1/${c.id}`} className="soul-panel block hover:shadow-soul-lg transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-serif font-semibold text-lg text-soul-ink leading-tight">{c.nome}</h3>
                      <p className="text-[12px] text-soul-ink/65 font-medium mt-0.5">
                        Criado em {new Date(c.createdAt).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                    <span className="inline-flex items-center rounded-full px-3 py-1 text-[11px] font-bold"
                          style={{
                            background: c.status === 'ACTIVE' ? 'rgba(122,158,126,0.22)' : 'rgba(212,148,58,0.18)',
                            color: c.status === 'ACTIVE' ? '#4a7a4e' : '#8a5c1e',
                          }}>
                      {c.status === 'ACTIVE' ? 'Ativa' : 'Encerrada'}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-3 mt-4">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-soul-ink/55">Convidados</p>
                      <p className="font-serif text-xl font-semibold text-soul-ink mt-0.5">{c._count.convites}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-soul-ink/55">Responderam</p>
                      <p className="font-serif text-xl font-semibold text-soul-terracota mt-0.5">{respondentesEstimados}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-soul-ink/55">Validade</p>
                      <p className="text-[13px] font-semibold text-soul-ink/80 mt-1">
                        {new Date(c.expiresAt).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </section>
    </div>
  )
}

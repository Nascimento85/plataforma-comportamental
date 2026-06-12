// ============================================================
// /nr1/[token] — Coleta publica anonima NR-1 (sem login)
// ============================================================

import type { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import ColetaClient from './ColetaClient'
import { KARASEK_QUESTOES, ERI_QUESTOES, COPSOQ_QUESTOES } from '@/lib/nr1/questions'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const prismaAny = prisma as any

export const metadata: Metadata = { title: 'Diagnóstico Psicossocial — NR-1' }

export default async function ColetaPublicaPage({ params }: { params: { token: string } }) {
  const convite = await prismaAny.nR1Convite.findUnique({
    where: { token: params.token },
    include: {
      coleta: { select: { id: true, nome: true, status: true, expiresAt: true } },
      setor:  { select: { nome: true } },
    },
  })

  const erro =
    !convite ? 'Link inválido ou expirado.'
    : convite.status === 'COMPLETED' ? 'Você já respondeu esta avaliação. Obrigado!'
    : convite.coleta.status !== 'ACTIVE' ? 'Esta coleta foi encerrada.'
    : new Date() > new Date(convite.coleta.expiresAt) ? 'Esta coleta expirou.'
    : null

  if (erro) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6"
           style={{ background: 'linear-gradient(180deg, #17181c 0%, #101c30 100%)' }}>
        <div className="max-w-md text-center">
          <div className="text-5xl mb-4">🌿</div>
          <h1 className="font-serif font-semibold text-2xl text-soul-ink mb-2">{erro}</h1>
          <p className="text-[15px] text-soul-ink/85 font-medium">
            Se acredita que isto é um erro, contate o RH da sua empresa.
          </p>
        </div>
      </div>
    )
  }

  return (
    <ColetaClient
      token={params.token}
      nomeFuncionario={convite.nome}
      setorNome={convite.setor.nome}
      coletaNome={convite.coleta.nome}
      karasekQuestoes={KARASEK_QUESTOES}
      eriQuestoes={ERI_QUESTOES}
      copsoqQuestoes={COPSOQ_QUESTOES}
    />
  )
}

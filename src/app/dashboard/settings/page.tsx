import { getSession } from '@/lib/session'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Configurações' }

async function getCompany(companyId: string) {
  const company = await prisma.company.findUnique({
    where: { id: companyId },
    include: { creditBalance: true },
  })
  return company
}

export default async function SettingsPage() {
  const session = await getSession()
  const company = await getCompany(session!.id)

  if (!company) return <p>Empresa não encontrada.</p>

  return (
    <div className="space-y-7 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="font-serif font-semibold text-4xl text-soul-ink leading-tight">
          Configurações
        </h1>
        <p className="text-base text-soul-ink/75 mt-2 font-medium">
          Gerencie os dados da sua empresa, cobrança e preferências de notificação.
        </p>
      </div>

      {/* Perfil da empresa */}
      <section className="soul-panel">
        <div className="flex items-start justify-between gap-4 mb-5 pb-5 border-b border-soul-mist/60">
          <div>
            <h2 className="font-serif text-2xl font-semibold text-soul-ink leading-tight">
              Perfil da empresa
            </h2>
            <p className="text-[14px] text-soul-ink/70 font-medium mt-1">
              Informações cadastrais da conta.
            </p>
          </div>
          <span className="inline-flex items-center rounded-full px-3 py-1 text-[12px] font-bold"
                style={{ background: 'rgba(122,158,126,0.22)', color: '#4a7a4e' }}>
            {company.active ? 'Ativa' : 'Inativa'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field label="Nome / Razão social" value={company.name} />
          <Field label="E-mail de acesso" value={company.email} />
          <Field label="Tipo" value={company.type === 'PJ' ? 'Pessoa Jurídica' : 'Pessoa Física'} />
          <Field label="Telefone" value={company.phone ?? 'Não informado'} />
          <Field label="Instagram" value={company.instagram ?? 'Não informado'} />
          <Field
            label="Membro desde"
            value={company.createdAt.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
          />
        </div>
      </section>

      {/* Cobrança */}
      <section className="soul-panel">
        <div className="mb-5 pb-5 border-b border-soul-mist/60">
          <h2 className="font-serif text-2xl font-semibold text-soul-ink leading-tight">
            Cobrança e créditos
          </h2>
          <p className="text-[14px] text-soul-ink/70 font-medium mt-1">
            Seu saldo atual e histórico de compras.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-[13px] font-bold uppercase tracking-widest text-soul-ink/60">Saldo disponível</p>
            <p className="font-serif text-4xl font-semibold text-soul-ink mt-1">
              {company.creditBalance?.balance ?? 0}{' '}
              <span className="text-lg text-soul-ink/60 font-medium">créditos</span>
            </p>
          </div>
          <Link
            href="/dashboard/credits"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-[14px] font-bold text-white
                       shadow-terra hover:-translate-y-px transition-all"
            style={{ background: 'linear-gradient(135deg, #c4633a, #d4943a)' }}
          >
            Comprar créditos →
          </Link>
        </div>
      </section>

      {/* Preferências */}
      <section className="soul-panel">
        <div className="mb-5 pb-5 border-b border-soul-mist/60">
          <h2 className="font-serif text-2xl font-semibold text-soul-ink leading-tight">
            Preferências de notificação
          </h2>
          <p className="text-[14px] text-soul-ink/70 font-medium mt-1">
            Controle quais e-mails você recebe sobre a conta.
          </p>
        </div>

        <div className="space-y-3">
          <PreferenceRow
            title="Candidato concluiu teste"
            description="Receba e-mail assim que uma devolutiva estiver pronta para download."
          />
          <PreferenceRow
            title="Passaporte com saldo baixo"
            description="Seja avisado quando seu Passaporte cair abaixo de 3 créditos ou estiver perto de expirar."
          />
          <PreferenceRow
            title="Relatório mensal"
            description="Resumo com todas as avaliações do mês e insights agregados."
          />
        </div>

        <p className="text-[12px] text-soul-ink/55 font-medium italic mt-5">
          Em breve: ativação individual de cada notificação.
        </p>
      </section>

      {/* Segurança */}
      <section className="soul-panel">
        <div className="mb-5 pb-5 border-b border-soul-mist/60">
          <h2 className="font-serif text-2xl font-semibold text-soul-ink leading-tight">
            Segurança
          </h2>
          <p className="text-[14px] text-soul-ink/70 font-medium mt-1">
            Gerencie o acesso da sua conta.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="font-semibold text-[15px] text-soul-ink">Senha de acesso</p>
            <p className="text-[13px] text-soul-ink/70 font-medium mt-0.5">
              Última alteração: {company.updatedAt.toLocaleDateString('pt-BR')}
            </p>
          </div>
          <Link
            href="/forgot-password"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-bold
                       border-2 transition-colors"
            style={{ borderColor: 'rgba(28,26,23,0.15)', color: '#1c1a17' }}
          >
            Redefinir senha
          </Link>
        </div>
      </section>
    </div>
  )
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[12px] font-bold uppercase tracking-widest text-soul-ink/60 mb-1.5">{label}</p>
      <p className="text-[15px] text-soul-ink font-semibold">{value}</p>
    </div>
  )
}

function PreferenceRow({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex items-start justify-between gap-4 p-4 rounded-2xl border border-soul-mist/60">
      <div className="flex-1">
        <p className="font-semibold text-[15px] text-soul-ink">{title}</p>
        <p className="text-[13px] text-soul-ink/70 font-medium mt-0.5 leading-snug">{description}</p>
      </div>
      <div
        className="flex-shrink-0 w-11 h-6 rounded-full relative"
        style={{ background: 'linear-gradient(135deg, #c4633a, #d4943a)' }}
      >
        <div className="absolute top-0.5 right-0.5 w-5 h-5 rounded-full bg-white shadow-sm"/>
      </div>
    </div>
  )
}

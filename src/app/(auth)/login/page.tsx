import type { Metadata } from 'next'
import AuthShell from '../AuthShell'
import LoginForm from './LoginForm'

export const metadata: Metadata = { title: 'Entrar | Psique' }

interface PageProps {
  searchParams: { registered?: string }
}

export default function LoginPage({ searchParams }: PageProps) {
  const justRegistered = searchParams.registered === '1'

  return (
    <AuthShell
      headline={<>Decifre pessoas.<br />Lidere com <em className="not-italic" style={{ color: '#e8c97a' }}>precisão</em>.</>}
      sub="A plataforma de ciência comportamental para quem decide com dados: contratação, liderança, compliance e desenvolvimento de times."
      bullets={[
        { icon: '🧬', text: <><strong className="text-white">15 testes científicos</strong> validados, do DISC ao Big Five</> },
        { icon: '🛡️', text: <><strong className="text-white">Compliance NR-1</strong> com coleta anônima e relatório executivo</> },
        { icon: '📄', text: <>Relatórios profissionais <strong className="text-white">com a sua marca</strong></> },
      ]}
      proof="DISC, MBTI, Eneagrama e Big Five — instrumentos usados há décadas"
      formTitle="Bem-vindo de volta"
      formSub="Entre para continuar suas análises"
      banner={justRegistered ? (
        <div
          className="flex items-start gap-3 rounded-2xl px-4 py-4 mb-5 font-sans"
          style={{ background: 'rgba(122,158,126,0.15)', border: '1px solid rgba(122,158,126,0.25)' }}
        >
          <span className="text-2xl flex-shrink-0">🎉</span>
          <div>
            <p className="text-sm font-semibold" style={{ color: '#96bf9a' }}>🎟️ Passaporte de Autoconhecimento ativado!</p>
            <p className="text-xs mt-0.5 leading-relaxed" style={{ color: 'rgba(150,191,154,0.8)' }}>
              Você ganhou <strong>5 créditos válidos por 7 dias</strong>. Escolha seu primeiro teste e comece agora.
            </p>
          </div>
        </div>
      ) : undefined}
      belowCard={
        <p className="text-sm font-sans" style={{ color: 'rgba(255,255,255,0.4)' }}>
          Não tem conta?{' '}
          <a href="/register" className="font-semibold transition-colors hover:opacity-80" style={{ color: '#e8c97a' }}>
            Criar conta grátis
          </a>
          <span className="block text-xs mt-1" style={{ color: 'rgba(255,255,255,0.28)' }}>
            Ganhe créditos de cortesia ao se cadastrar · sem cartão
          </span>
        </p>
      }
    >
      <LoginForm />
    </AuthShell>
  )
}

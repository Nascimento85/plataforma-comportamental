import type { Metadata } from 'next'
import AuthShell from '../AuthShell'
import LoginForm from './LoginForm'
import { AMBAR, OK, TINTA, TINTA_FRACA, TERRACOTA_TXT } from '../tokens'

export const metadata: Metadata = { title: 'Entrar | Psique' }

interface PageProps {
  searchParams: { registered?: string }
}

export default function LoginPage({ searchParams }: PageProps) {
  const justRegistered = searchParams.registered === '1'

  return (
    <AuthShell
      headline={<>Você já sabe o que sente.<br />Falta saber o que isso <em style={{ color: AMBAR, fontStyle: 'italic' }}>faz com os outros</em>.</>}
      sub="Quinze avaliações que traduzem comportamento em linguagem prática: como você decide, como você lidera, como você se relaciona e o que a sua presença provoca."
      bullets={[
        { icon: '', text: <>Por que a mesma frase sua funciona com uma pessoa e explode com outra.</> },
        { icon: '', text: <>O que o seu jeito de decidir sob pressão entrega antes de você abrir a boca.</> },
        { icon: '', text: <>Qual padrão assume o volante quando a conversa aperta, e o que ele custa.</> },
      ]}
      proof="Devolutiva completa em PDF. Sem mensalidade, sem contrato."
      formTitle="Entrar na plataforma"
      formSub="Continue de onde você parou"
      banner={justRegistered ? (
        <div
          className="flex items-start gap-3 rounded-2xl px-4 py-4 mb-5"
          style={{ background: 'rgba(63,107,69,0.10)', border: '1px solid rgba(63,107,69,0.28)' }}
        >
          <span className="text-2xl flex-shrink-0">🎉</span>
          <div>
            <p className="text-[15px] font-semibold" style={{ color: OK }}>
              🎟️ Passaporte de Autoconhecimento ativado!
            </p>
            <p className="text-sm mt-1 leading-relaxed" style={{ color: TINTA }}>
              Você ganhou <strong>5 créditos válidos por 7 dias</strong>. Escolha seu primeiro teste e comece agora.
            </p>
          </div>
        </div>
      ) : undefined}
      belowCard={
        <p>
          Não tem conta?{' '}
          <a href="/register" className="font-semibold transition-colors hover:opacity-80" style={{ color: TERRACOTA_TXT }}>
            Criar conta grátis
          </a>
          <span className="block text-sm mt-1" style={{ color: TINTA_FRACA }}>
            Ganhe créditos de cortesia ao se cadastrar · sem cartão
          </span>
        </p>
      }
    >
      <LoginForm />
    </AuthShell>
  )
}

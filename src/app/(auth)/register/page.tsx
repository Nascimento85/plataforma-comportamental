import type { Metadata } from 'next'
import AuthShell from '../AuthShell'
import RegisterForm from './RegisterForm'

export const metadata: Metadata = { title: 'Criar conta | Psique' }

export default function RegisterPage() {
  return (
    <AuthShell
      headline={<>Sua primeira leitura está a <em style={{ color: '#E0B368', fontStyle: 'italic' }}>minutos</em> daqui.</>}
      sub="Crie a conta, escolha uma avaliação e receba a devolutiva completa: o que você faz, por que faz, e como aquilo chega do outro lado."
      bullets={[
        { icon: '', text: <><strong>5 créditos de cortesia</strong> só por criar a conta, sem cartão.</> },
        { icon: '', text: <>Devolutiva <strong>completa em PDF</strong>, não um rótulo de quatro letras.</> },
        { icon: '', text: <>Primeira avaliação concluída em poucos minutos, do celular.</> },
      ]}
      proof="Você faz o teste e leva a devolutiva. Nada fica preso na plataforma."
      formTitle="Crie sua conta grátis"
      formSub="Leva menos de um minuto"
      belowCard={
        <p className="text-sm font-sans" style={{ color: 'rgba(255,255,255,0.4)' }}>
          Já tem conta?{' '}
          <a href="/login" className="font-semibold transition-colors hover:opacity-80" style={{ color: '#e8c97a' }}>
            Entrar na plataforma
          </a>
        </p>
      }
    >
      <RegisterForm />
    </AuthShell>
  )
}

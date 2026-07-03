import type { Metadata } from 'next'
import AuthShell from '../AuthShell'
import RegisterForm from './RegisterForm'

export const metadata: Metadata = { title: 'Criar conta | Psique' }

export default function RegisterPage() {
  return (
    <AuthShell
      headline={<>Sua primeira análise a <em className="not-italic" style={{ color: '#e8c97a' }}>minutos</em> de distância.</>}
      sub="Crie a conta, escolha um teste e receba um relatório profissional com diagnóstico e direcionamento prático. Sem cartão de crédito."
      bullets={[
        { icon: '🎟️', text: <><strong className="text-white">4 créditos de cortesia</strong> só por criar a conta</> },
        { icon: '⭐', text: <><strong className="text-white">+6 créditos extras</strong> ao completar o seu perfil</> },
        { icon: '⚡', text: <>Primeiro teste concluído <strong className="text-white">em 5 minutos</strong>, de qualquer aparelho</> },
      ]}
      proof="Junte-se a líderes, RHs e casais em mais de 70 países"
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

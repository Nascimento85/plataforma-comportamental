// ============================================================
// Landing Page — /
// Se já estiver logado, redireciona para o dashboard.
// ============================================================

import { redirect } from 'next/navigation'
import { getSession } from '@/lib/session'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Psique — Mapa Comportamental | Avaliações DISC, MBTI, Eneagrama e Temperamentos',
  description:
    'Crie avaliações comportamentais para seus colaboradores em minutos. Relatórios completos em DISC, MBTI, Eneagrama e 4 Temperamentos.',
}

// ── Dados dos testes ─────────────────────────────────────────
const TEST_TYPES = [
  {
    key: 'DISC',
    label: 'DISC',
    name: 'Perfil Comportamental',
    color: '#ef4444',
    light: '#fef2f2',
    badge: 'D',
    description:
      'Identifica o estilo de comportamento dominante nas 4 dimensões: Dominância, Influência, Estabilidade e Cautela.',
    uses: ['Liderança', 'Vendas', 'Comunicação', 'Conflitos'],
  },
  {
    key: 'MBTI',
    label: 'MBTI',
    name: '16 Tipos de Personalidade',
    color: '#2a47f5',
    light: '#eff6ff',
    badge: 'IN',
    description:
      'Mapeia preferências cognitivas em 4 dimensões para identificar o tipo de personalidade entre 16 perfis possíveis.',
    uses: ['Carreira', 'Equipes', 'Comunicação', 'Liderança'],
  },
  {
    key: 'ENNEAGRAM',
    label: 'Eneagrama',
    name: '9 Tipos de Motivação',
    color: '#7c3aed',
    light: '#f5f3ff',
    badge: '4',
    description:
      'Revela o padrão motivacional profundo e como ele influencia pensamentos, emoções e comportamentos.',
    uses: ['Autoconhecimento', 'Liderança', 'Relacionamentos', 'Bem-estar'],
  },
  {
    key: 'TEMPERAMENT',
    label: '4 Temperamentos',
    name: 'Perfil Clássico',
    color: '#f59e0b',
    light: '#fffbeb',
    badge: 'C',
    description:
      'Descobre o temperamento predominante entre os 4 tipos clássicos: Colérico, Sanguíneo, Melancólico e Fleumático.',
    uses: ['Gestão', 'Equipes', 'Recrutamento', 'Coaching'],
  },
]

// ── Planos ───────────────────────────────────────────────────
const PLANS = [
  {
    credits: 5,
    price: 'R$ 49,90',
    perUnit: 'R$ 9,98/relatório',
    highlight: false,
    label: null,
  },
  {
    credits: 10,
    price: 'R$ 89,90',
    perUnit: 'R$ 8,99/relatório',
    highlight: true,
    label: 'Mais popular',
  },
  {
    credits: 25,
    price: 'R$ 199,90',
    perUnit: 'R$ 7,99/relatório',
    highlight: false,
    label: null,
  },
  {
    credits: 50,
    price: 'R$ 349,90',
    perUnit: 'R$ 6,99/relatório',
    highlight: false,
    label: 'Melhor valor',
  },
]

// ── Passos "Como funciona" ────────────────────────────────────
const STEPS = [
  {
    number: '1',
    title: 'Crie a avaliação',
    description:
      'Escolha o tipo de teste, informe o nome e e-mail do colaborador. O sistema gera um link único automaticamente.',
  },
  {
    number: '2',
    title: 'Colaborador responde',
    description:
      'O colaborador acessa o link no celular ou computador e responde ao questionário em poucos minutos.',
  },
  {
    number: '3',
    title: 'Veja o resultado',
    description:
      'O relatório completo fica disponível no dashboard assim que o teste for concluído. Baixe em PDF ou compartilhe o link.',
  },
]

// ── Página ───────────────────────────────────────────────────
export default async function LandingPage() {
  // Se já logado, vai direto para o dashboard
  const session = await getSession()
  if (session) redirect('/dashboard')

  return (
    <div className="min-h-screen bg-white text-gray-900">

      {/* ── Navbar ── */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold"
              style={{ backgroundColor: '#2a47f5' }}>
              PC
            </div>
            <span className="font-semibold text-gray-900 text-sm">Psique — Mapa Comportamental</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              Entrar
            </Link>
            <Link href="/register"
              className="text-sm font-semibold px-4 py-2 rounded-lg text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: '#2a47f5' }}>
              Criar conta grátis
            </Link>
          </div>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-24 text-center">
        <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-6 border"
          style={{ backgroundColor: '#eff6ff', color: '#2a47f5', borderColor: '#bfdbfe' }}>
          DISC · MBTI · Eneagrama · 4 Temperamentos
        </div>
        <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 leading-tight max-w-3xl mx-auto">
          Conheça o perfil de cada{' '}
          <span style={{ color: '#2a47f5' }}>colaborador</span>
        </h1>
        <p className="mt-6 text-xl text-gray-500 max-w-xl mx-auto leading-relaxed">
          Crie avaliações comportamentais em minutos. O colaborador responde pelo celular e você recebe um relatório completo.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/register"
            className="w-full sm:w-auto px-8 py-4 rounded-xl text-white font-semibold text-lg transition-opacity hover:opacity-90 shadow-lg"
            style={{ backgroundColor: '#2a47f5' }}>
            Começar gratuitamente →
          </Link>
          <Link href="/login"
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-semibold text-lg text-gray-700 bg-gray-50 hover:bg-gray-100 transition-colors border border-gray-200">
            Já tenho conta
          </Link>
        </div>
        <p className="mt-4 text-sm text-gray-400">Sem cartão de crédito para criar a conta. Pague apenas pelos relatórios.</p>
      </section>

      {/* ── Números ── */}
      <section style={{ backgroundColor: '#2a47f5' }} className="py-12">
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-2 sm:grid-cols-4 gap-8 text-center text-white">
          {[
            { value: '4', label: 'tipos de avaliação' },
            { value: '< 15min', label: 'para responder' },
            { value: 'PDF', label: 'relatório completo' },
            { value: '100%', label: 'online e no celular' },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl font-bold">{stat.value}</p>
              <p className="text-sm mt-1 opacity-80">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Como funciona ── */}
      <section className="max-w-5xl mx-auto px-6 py-24">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-gray-900">Como funciona</h2>
          <p className="text-gray-500 mt-3">Três passos simples do início ao relatório</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {STEPS.map((step) => (
            <div key={step.number} className="relative text-center">
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-bold mx-auto mb-4"
                style={{ backgroundColor: '#2a47f5' }}>
                {step.number}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Tipos de teste ── */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900">4 metodologias validadas</h2>
            <p className="text-gray-500 mt-3">Escolha o tipo de avaliação que melhor se encaixa na sua necessidade</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEST_TYPES.map((test) => (
              <div key={test.key}
                className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow">
                {/* Badge */}
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg mb-4"
                  style={{ backgroundColor: test.color }}>
                  {test.badge}
                </div>
                {/* Tipo */}
                <p className="text-xs font-bold uppercase tracking-wide mb-1"
                  style={{ color: test.color }}>
                  {test.label}
                </p>
                <h3 className="font-bold text-gray-900 text-base mb-2">{test.name}</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">{test.description}</p>
                {/* Tags de uso */}
                <div className="flex flex-wrap gap-1.5">
                  {test.uses.map((use) => (
                    <span key={use}
                      className="text-xs font-medium px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: test.light, color: test.color }}>
                      {use}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Planos e preços ── */}
      <section className="max-w-5xl mx-auto px-6 py-24">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-gray-900">Simples e sem mensalidade</h2>
          <p className="text-gray-500 mt-3">Compre créditos conforme precisar. Cada crédito gera um relatório completo.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PLANS.map((plan) => (
            <div key={plan.credits}
              className={`rounded-2xl border p-6 flex flex-col relative ${
                plan.highlight
                  ? 'border-blue-400 shadow-lg shadow-blue-100'
                  : 'border-gray-200'
              }`}>
              {plan.label && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold text-white whitespace-nowrap"
                  style={{ backgroundColor: '#2a47f5' }}>
                  {plan.label}
                </span>
              )}
              <p className="text-4xl font-bold text-gray-900">{plan.credits}</p>
              <p className="text-sm text-gray-500 mb-1">créditos</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{plan.price}</p>
              <p className="text-xs text-gray-400 mb-6">{plan.perUnit}</p>
              <Link href="/register"
                className={`mt-auto w-full text-center py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                  plan.highlight
                    ? 'text-white hover:opacity-90'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
                style={plan.highlight ? { backgroundColor: '#2a47f5' } : {}}>
                Começar agora
              </Link>
            </div>
          ))}
        </div>
        <p className="text-center text-sm text-gray-400 mt-6">
          Os créditos não expiram. Use no seu ritmo.
        </p>
      </section>

      {/* ── CTA final ── */}
      <section style={{ backgroundColor: '#2a47f5' }} className="py-20">
        <div className="max-w-2xl mx-auto px-6 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Pronto para conhecer seu time?</h2>
          <p className="text-lg opacity-80 mb-8">
            Crie sua conta gratuitamente e faça sua primeira avaliação hoje mesmo.
          </p>
          <Link href="/register"
            className="inline-block px-10 py-4 rounded-xl font-bold text-lg bg-white transition-opacity hover:opacity-90"
            style={{ color: '#2a47f5' }}>
            Criar conta grátis →
          </Link>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-gray-100 py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded flex items-center justify-center text-white text-xs font-bold"
              style={{ backgroundColor: '#2a47f5' }}>
              PC
            </div>
            <span className="text-sm text-gray-500">Psique — Mapa Comportamental</span>
          </div>
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} Psique — Mapa Comportamental. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm text-gray-400 hover:text-gray-600 transition-colors">Entrar</Link>
            <Link href="/register" className="text-sm text-gray-400 hover:text-gray-600 transition-colors">Cadastrar</Link>
          </div>
        </div>
      </footer>

    </div>
  )
}

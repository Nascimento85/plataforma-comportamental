// ============================================================
// Ferramentas da plataforma (dashboard inicial) — grade compacta.
// Nome + uma linha de descrição; a venda acontece nas páginas
// internas, não no dashboard de quem já é cliente.
// ============================================================

import Link from 'next/link'
import { TEST_COUNT } from '@/lib/test-labels'

const FERRAMENTAS = [
  {
    icone: '🧬',
    nome: 'Testes científicos',
    texto: `${TEST_COUNT} instrumentos: DISC, MBTI, Eneagrama, Big Five e mais.`,
    href: '/dashboard/behavioral',
  },
  {
    icone: '🗂',
    nome: 'Devolutiva integrada',
    texto: 'Todos os testes de uma pessoa em um único dossiê.',
    href: '/dashboard/candidates',
  },
  {
    icone: '◫',
    nome: 'Gestão de equipes',
    texto: 'Matriz 20-70-10, curva de vitalidade e dinâmicas de time.',
    href: '/dashboard/gestao-times',
  },
  {
    icone: '🧭',
    nome: 'Avaliação do líder',
    texto: 'Avaliação ascendente 100% anônima do seu time.',
    href: '/dashboard/gestao-times',
  },
  {
    icone: '🛡',
    nome: 'NR-1 Psicossocial',
    texto: 'Riscos psicossociais mapeados com relatório executivo.',
    href: '/dashboard/compliance',
  },
  {
    icone: '🎙',
    nome: 'Guia de entrevista',
    texto: 'Roteiros sob medida pelo perfil do candidato.',
    href: '/dashboard/guia-entrevista',
  },
  {
    icone: '📄',
    nome: 'Relatórios executivos',
    texto: 'PDF com capa, linguagem executiva e a sua marca.',
    href: '/dashboard/reports',
  },
  {
    icone: '📚',
    nome: 'Playbooks gratuitos',
    texto: '6 manuais práticos de gestão para aplicar hoje.',
    href: '/dashboard/downloads',
  },
]

export default function FerramentasShowcase() {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3 mb-4">
        <h2 className="font-serif font-semibold text-2xl text-soul-ink leading-tight">
          Ferramentas
        </h2>
        <Link href="/dashboard/behavioral"
              className="text-[13.5px] font-bold whitespace-nowrap no-underline"
              style={{ color: '#d4b35e' }}>
          Ver catálogo completo →
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {FERRAMENTAS.map((f) => (
          <Link key={f.nome} href={f.href}
                className="soul-panel !p-5 group no-underline transition-all hover:-translate-y-0.5 hover:border-soul-gold/40">
            <p className="text-[15px] font-bold text-soul-ink leading-tight transition-colors group-hover:text-soul-gold">
              {f.icone} {f.nome}
            </p>
            <p className="text-[13.5px] text-soul-ink/78 font-medium leading-relaxed mt-1.5">
              {f.texto}
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}

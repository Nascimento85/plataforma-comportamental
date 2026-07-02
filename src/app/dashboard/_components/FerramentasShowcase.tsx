// ============================================================
// Vitrine das ferramentas da plataforma (dashboard inicial)
// Copy persuasiva: gancho na dor, benefício concreto, CTA.
// ============================================================

import Link from 'next/link'
import { TEST_COUNT } from '@/lib/test-labels'

const GOLD = '#d4b35e'

const FERRAMENTAS = [
  {
    icone: '🧬',
    nome: `${TEST_COUNT} Testes Científicos`,
    gancho: 'Decifre qualquer pessoa em minutos.',
    texto: `DISC, MBTI, Eneagrama, Big Five e mais ${TEST_COUNT - 4} instrumentos validados que revelam como cada pessoa decide, age sob pressão e se relaciona. Chega de contratar e promover no escuro.`,
    cta: 'Explorar os testes',
    href: '/dashboard/behavioral',
    cor: '#e09070',
  },
  {
    icone: '🗂',
    nome: 'Devolutiva Integrada',
    gancho: 'Todos os testes de uma pessoa, um único dossiê.',
    texto: 'A plataforma cruza os resultados e entrega um raio X profundo: forças, pontos cegos e o jeito certo de liderar cada um. É como ter um especialista em comportamento de plantão.',
    cta: 'Ver candidatos',
    href: '/dashboard/candidates',
    cor: '#8fa6da',
  },
  {
    icone: '◫',
    nome: 'Gestão de Equipes',
    gancho: 'Sua equipe inteira em um mapa.',
    texto: 'A matriz 20 70 10 mostra quem é referência, quem rende mais com o apoio certo e quem precisa de diagnóstico. O método das maiores empresas do mundo, com foco em desenvolvimento.',
    cta: 'Mapear minha equipe',
    href: '/dashboard/gestao-times',
    cor: '#d4b35e',
  },
  {
    icone: '🧭',
    nome: 'Avaliação do Líder',
    gancho: 'O que sua equipe não tem coragem de falar.',
    texto: 'Avaliação 100% anônima em que os liderados avaliam a liderança: clareza, respeito, reconhecimento e suporte. O líder recebe o espelho e o caminho de evolução. Coragem que transforma cultura.',
    cta: 'Avaliar liderança',
    href: '/dashboard/gestao-times',
    cor: '#a9d3a9',
  },
  {
    icone: '🛡',
    nome: 'NR-1 Psicossocial',
    gancho: 'A lei exige. A plataforma resolve.',
    texto: 'Mapeie os riscos psicossociais da empresa com instrumentos reconhecidos mundialmente, colete de forma anônima e gere o relatório executivo que blinda você de passivo trabalhista.',
    cta: 'Mapear riscos',
    href: '/dashboard/compliance',
    cor: '#d99a91',
  },
  {
    icone: '🎙',
    nome: 'Guia de Entrevista',
    gancho: 'Pergunte o que o currículo esconde.',
    texto: 'Roteiros de entrevista gerados sob medida pelo perfil comportamental de cada candidato. Em uma conversa, você descobre o que seis meses de experiência revelariam.',
    cta: 'Gerar roteiro',
    href: '/dashboard/guia-entrevista',
    cor: '#e0c878',
  },
  {
    icone: '📄',
    nome: 'Relatórios Executivos',
    gancho: 'Autoridade pronta pra imprimir.',
    texto: 'Devolutivas em PDF com capa, linguagem executiva e a sua marca. Você entrega o relatório na reunião e fica com o crédito. A plataforma faz o trabalho pesado.',
    cta: 'Ver relatórios',
    href: '/dashboard/reports',
    cor: '#8fa6da',
  },
  {
    icone: '📚',
    nome: 'Playbooks Gratuitos',
    gancho: 'Manuais práticos pra aplicar hoje.',
    texto: 'Contratação inteligente, liderança cirúrgica, NR-1 e mais. Guias escritos pra dono de empresa, sem academicismo. Baixe, aplique e compartilhe com o seu time de gestão.',
    cta: 'Baixar playbooks',
    href: '/dashboard/downloads',
    cor: '#e09070',
  },
]

export default function FerramentasShowcase() {
  return (
    <div>
      <div className="mb-5">
        <p className="text-[13px] font-bold uppercase tracking-widest mb-1" style={{ color: GOLD }}>
          Suas ferramentas
        </p>
        <h2 className="font-serif font-semibold text-3xl text-soul-ink leading-tight">
          Tudo o que esta plataforma faz <span className="text-soul-terracota italic font-normal">por você</span>
        </h2>
        <p className="text-[15px] text-soul-ink/80 font-medium mt-1 max-w-3xl">
          Cada ferramenta responde uma pergunta que custa caro deixar sem resposta. Escolha por onde começar.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {FERRAMENTAS.map((f) => (
          <Link key={f.nome} href={f.href}
                className="soul-panel flex flex-col no-underline transition-all hover:-translate-y-1"
                style={{ borderTop: `3px solid ${f.cor}` }}>
            <span className="w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-3"
                  style={{ background: 'rgba(255,255,255,0.06)' }}>{f.icone}</span>
            <p className="text-[15.5px] font-bold text-soul-ink leading-tight">{f.nome}</p>
            <p className="text-[13.5px] font-bold mt-1.5 leading-snug" style={{ color: f.cor }}>{f.gancho}</p>
            <p className="text-[13.5px] text-soul-ink/80 font-medium leading-relaxed mt-1.5 flex-1">{f.texto}</p>
            <p className="text-[13.5px] font-bold mt-3" style={{ color: GOLD }}>{f.cta} →</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

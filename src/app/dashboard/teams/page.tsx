import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Equipes e Setores' }

// Templates de setores comuns (usados como placeholder até a migração)
const TEMPLATE_DEPARTMENTS = [
  { name: 'Liderança & Diretoria',     icon: '♛', color: '#c9a84c', desc: 'C-level, VPs e heads' },
  { name: 'Vendas & Comercial',        icon: '◉', color: '#c4633a', desc: 'Prospecção, closers, CS' },
  { name: 'Marketing',                 icon: '✦', color: '#d4943a', desc: 'Growth, conteúdo, branding' },
  { name: 'Operações',                 icon: '⬢', color: '#3d4f7c', desc: 'Logística, supply, produção' },
  { name: 'Tecnologia & Produto',      icon: '◆', color: '#6b7fb8', desc: 'Engenharia, design, PM' },
  { name: 'Recursos Humanos',          icon: '❀', color: '#c47a72', desc: 'People, RH, cultura' },
  { name: 'Financeiro',                icon: '◈', color: '#7a9e7e', desc: 'Controladoria, contábil' },
  { name: 'Atendimento & Suporte',     icon: '◎', color: '#c4a05a', desc: 'SAC, suporte técnico' },
]

export default function TeamsPage() {
  return (
    <div className="space-y-7">
      {/* Header */}
      <div>
        <h1 className="font-serif font-semibold text-4xl text-soul-ink leading-tight">
          Equipes <span className="text-soul-terracota italic font-normal">&amp;</span> Setores
        </h1>
        <p className="text-base text-soul-ink/75 mt-2 font-medium max-w-3xl">
          Organize seus candidatos por departamento e visualize o mapa comportamental de cada time.
          Descubra perfis complementares, identifique pontos cegos na composição e calibre a liderança.
        </p>
      </div>

      {/* Banner de roadmap */}
      <div className="rounded-3xl p-6 md:p-8 relative overflow-hidden"
           style={{ background: 'linear-gradient(135deg, #1c1a17 0%, #2d2417 60%, #3d2a1c 100%)' }}>
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-[0.08]"
             style={{ background: 'radial-gradient(circle, #c9a84c, transparent)', transform: 'translate(30%,-30%)' }}/>
        <div className="relative z-10 max-w-2xl">
          <span className="inline-block text-[12px] font-bold uppercase tracking-widest text-soul-gold mb-3">
            Recurso em liberação
          </span>
          <h2 className="font-serif text-2xl md:text-3xl font-semibold text-white leading-tight mb-3">
            Cadastre colaboradores por setor e monitore em um único painel.
          </h2>
          <p className="text-[15px] text-white/80 font-medium leading-relaxed mb-5">
            Em breve você poderá vincular cada candidato a uma equipe, importar colaboradores via CSV
            segmentado por departamento e gerar relatórios agregados por time — revelando a cultura
            comportamental real de cada setor da sua operação.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/dashboard/candidates"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-[14px] font-semibold text-soul-ink
                         bg-soul-gold hover:bg-soul-gold-light transition-all"
            >
              Ver candidatos cadastrados →
            </Link>
          </div>
        </div>
      </div>

      {/* Preview de setores */}
      <div>
        <h2 className="font-serif text-2xl font-semibold text-soul-ink mb-1">
          Templates de departamento
        </h2>
        <p className="text-[15px] text-soul-ink/70 font-medium mb-5">
          Estrutura sugerida para organizações de médio porte — você poderá criar setores personalizados.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TEMPLATE_DEPARTMENTS.map((dept) => (
            <div
              key={dept.name}
              className="soul-panel flex flex-col gap-3 hover:-translate-y-0.5 transition-transform"
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl font-bold"
                style={{ background: `${dept.color}22`, color: dept.color }}
              >
                {dept.icon}
              </div>
              <div>
                <p className="font-semibold text-[16px] text-soul-ink leading-tight">{dept.name}</p>
                <p className="text-[13px] text-soul-ink/70 font-medium mt-1 leading-snug">{dept.desc}</p>
              </div>
              <div className="mt-auto pt-2 border-t border-soul-mist/60">
                <span className="text-[12px] font-semibold text-soul-ink/55 uppercase tracking-wider">
                  0 candidatos
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Valor do recurso */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="soul-panel">
          <div className="text-3xl mb-2">🎯</div>
          <p className="font-serif text-lg font-semibold text-soul-ink">Diagnóstico por time</p>
          <p className="text-[14px] text-soul-ink/75 font-medium mt-1.5 leading-relaxed">
            Descubra o perfil dominante de cada setor e pontos de atenção na cultura operacional.
          </p>
        </div>
        <div className="soul-panel">
          <div className="text-3xl mb-2">⚖️</div>
          <p className="font-serif text-lg font-semibold text-soul-ink">Composição equilibrada</p>
          <p className="text-[14px] text-soul-ink/75 font-medium mt-1.5 leading-relaxed">
            Identifique times enviesados para um único estilo comportamental e calibre novas contratações.
          </p>
        </div>
        <div className="soul-panel">
          <div className="text-3xl mb-2">📈</div>
          <p className="font-serif text-lg font-semibold text-soul-ink">Evolução da cultura</p>
          <p className="text-[14px] text-soul-ink/75 font-medium mt-1.5 leading-relaxed">
            Acompanhe como o DNA de cada equipe muda ao longo dos ciclos de avaliação.
          </p>
        </div>
      </div>
    </div>
  )
}

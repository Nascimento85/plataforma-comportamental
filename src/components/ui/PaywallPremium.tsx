// ============================================================
// PaywallPremium — bloco padrao mostrado quando o usuario tenta
// acessar uma feature premium sem assinatura ativa.
// ============================================================

import Link from 'next/link'

interface Props {
  titulo:    string
  descricao: string
}

export default function PaywallPremium({ titulo, descricao }: Props) {
  return (
    <div className="max-w-2xl mx-auto py-10">
      <p className="text-[11px] font-bold uppercase tracking-widest text-soul-terracota mb-3">
        Recurso premium
      </p>
      <h1 className="font-serif font-semibold text-3xl text-soul-ink leading-tight mb-4">
        {titulo}
      </h1>
      <p className="text-[15.5px] text-soul-ink/85 font-medium leading-relaxed mb-6">
        {descricao}
      </p>

      <div className="rounded-2xl p-5 mb-6"
           style={{ background: 'rgba(212,184,92,0.08)', border: '1px solid rgba(201,168,76,0.30)' }}>
        <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: '#a87f1c' }}>
          O que vem incluso
        </p>
        <ul className="space-y-1.5 text-[14px] text-soul-ink/90 font-medium">
          <li>Testes comportamentais ilimitados (sem consumir créditos)</li>
          <li>Módulo NR-1 Psicossocial completo</li>
          <li>Guia de Entrevista personalizado por cargo</li>
          <li>Devolutiva integrada por funcionário</li>
          <li>Relatório executivo com narrativa consultiva</li>
        </ul>
      </div>

      <Link
        href="/dashboard/assinatura"
        className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[14px] font-bold text-white shadow-terra no-underline transition-transform hover:-translate-y-px"
        style={{ background: 'linear-gradient(135deg, #c4633a, #d4943a)' }}
      >
        ✦ Começar trial de 7 dias
      </Link>
      <p className="text-[12.5px] text-soul-ink/60 font-medium mt-2">
        Sem cartão de crédito. Cancele quando quiser.
      </p>
    </div>
  )
}

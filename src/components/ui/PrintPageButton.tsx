'use client'

// Botão "Salvar PDF" para páginas do dashboard (360°, eNPS).
// Usa window.print(); o @media print (globals.css) esconde a navegação
// e clareia os cards dentro de .pdf-area para sair como documento branco.
export default function PrintPageButton({ label = '↓ Salvar PDF' }: { label?: string }) {
  return (
    <button
      onClick={() => window.print()}
      className="no-print inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-[14px] font-bold text-white shadow-terra transition-transform hover:-translate-y-px flex-shrink-0"
      style={{ background: 'linear-gradient(135deg, #c4633a, #d4943a)' }}
    >
      {label}
    </button>
  )
}

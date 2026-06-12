'use client'

export default function ImprimirButton({ titulo }: { titulo: string }) {
  function imprimir() {
    // ajusta o title do documento para o PDF salvar com nome adequado
    const original = document.title
    document.title = titulo
    window.print()
    setTimeout(() => { document.title = original }, 1000)
  }
  return (
    <button onClick={imprimir}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[14px] font-bold text-white shadow-terra"
            style={{ background: 'linear-gradient(135deg, #c4633a, #d4943a)' }}>
      📄 Salvar como PDF
    </button>
  )
}

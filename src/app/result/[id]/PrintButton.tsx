'use client'

export default function PrintButton({ assessmentId }: { assessmentId: string }) {
  return (
    <a
      href={`/api/results/${assessmentId}/pdf`}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white bg-brand-600 hover:bg-brand-700 transition-colors"
    >
      ↓ Baixar PDF
    </a>
  )
}

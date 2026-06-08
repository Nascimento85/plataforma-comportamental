// ============================================================
// /diagnostico-pme — Diagnóstico de Liderança PME (público)
// Landing + questionário do Dono (captura de lead).
// ============================================================

import type { Metadata } from 'next'
import { PERGUNTAS_DONO } from '@/content/pme-diagnostico/questionarios'
import DonoClient from './DonoClient'

export const metadata: Metadata = {
  title: 'Diagnóstico de Liderança para sua Empresa · Psique',
  description: 'Descubra em 3 minutos o nível de maturidade da liderança do seu negócio e o que está travando o seu crescimento.',
}

export default function DiagnosticoPmePage() {
  const perguntas = PERGUNTAS_DONO.map((p) => ({ id: p.id, bloco: p.bloco, texto: p.texto }))
  return (
    <div className="min-h-screen" style={{ background: '#fafbfc' }}>
      <DonoClient perguntas={perguntas} />
    </div>
  )
}

// ============================================================
// /dashboard/teams — unificado na Gestão de Equipes (12/jun/2026)
// Mantido como redirect para não quebrar links antigos.
// ============================================================

import { redirect } from 'next/navigation'

export default function TeamsRedirect() {
  redirect('/dashboard/gestao-times')
}

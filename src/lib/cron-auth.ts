// ============================================================
// Autorizacao das rotas /api/cron/*
// ============================================================
// O padrao antigo era `auth !== \`Bearer ${process.env.CRON_SECRET}\``.
// Com a variavel ausente isso vira a string literal "Bearer undefined", que
// qualquer pessoa consegue mandar no header — a rota abria sozinha. Aqui a
// falta do segredo nega, em vez de liberar.

import crypto from 'crypto'

export type ResultadoCron = { ok: true } | { ok: false; motivo: string }

export function autorizaCron(authorization: string | null): ResultadoCron {
  const esperado = process.env.CRON_SECRET
  if (!esperado) return { ok: false, motivo: 'CRON_SECRET nao configurado no ambiente' }
  if (!authorization) return { ok: false, motivo: 'header Authorization ausente' }

  const recebido = Buffer.from(authorization)
  const alvo = Buffer.from(`Bearer ${esperado}`)
  if (recebido.length !== alvo.length) return { ok: false, motivo: 'token invalido' }
  if (!crypto.timingSafeEqual(recebido, alvo)) return { ok: false, motivo: 'token invalido' }

  return { ok: true }
}

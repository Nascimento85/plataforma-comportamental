/**
 * parseResultData — compatível com SQLite (dev) e PostgreSQL (produção)
 *
 * - SQLite: resultData é armazenado como String → precisa de JSON.parse
 * - PostgreSQL: resultData é Json nativo → já vem como objeto
 */
export function parseResultData(data: unknown): Record<string, unknown> {
  if (typeof data === 'string') {
    return JSON.parse(data) as Record<string, unknown>
  }
  return data as Record<string, unknown>
}

// Trigger fire-and-forget para regenerar o relatorio integrado

import { generateIntegratedReport } from './generate'

export function triggerIntegratedReportRegeneration(
  companyId: string,
  employeeId: string,
): void {
  setImmediate(() => {
    generateIntegratedReport(companyId, employeeId, { force: false })
      .then(result => {
        console.log(`[integrated-report:trigger] ${employeeId} -> ${result.status}`)
      })
      .catch(err => {
        console.error(`[integrated-report:trigger] ERRO em ${employeeId}:`, err)
      })
  })
}

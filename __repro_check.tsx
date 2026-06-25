import React from 'react'
declare const isPrint: boolean
declare const resultData: unknown
declare const assessment: { testType: string }
declare function VacPrintReport(p: { result: Record<string, unknown> }): JSX.Element
declare function TestResultCard(p: { testType: string; result: Record<string, unknown> }): JSX.Element
declare function DiscPrintReport(p: { result: Record<string, unknown> }): JSX.Element
declare function DiscDevolutiva(p: { d: unknown }): JSX.Element
export function X() {
  return (
    <main>
      {assessment.testType === 'DISC'               && (isPrint
        ? <DiscPrintReport result={resultData as Record<string, unknown>} />
        : <DiscDevolutiva d={resultData} />)}
      {assessment.testType === 'VAC'      && (isPrint
        ? <VacPrintReport result={resultData as Record<string, unknown>} />
        : <TestResultCard testType="VAC"      result={resultData as Record<string, unknown>} />)}
    </main>
  )
}

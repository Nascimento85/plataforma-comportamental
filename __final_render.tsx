import React from 'react'
declare const isPrint: boolean
declare const resultData: unknown
declare const assessment: { testType: string }
declare const reportId: string | null
declare const isPremiumUnlocked: boolean
declare const priceBrl: string
declare function DiscPrintReport(p:{result:Record<string,unknown>}): JSX.Element
declare function DiscDevolutiva(p:{d:unknown}): JSX.Element
declare function MbtiPrintReport(p:{result:Record<string,unknown>}): JSX.Element
declare function MbtiDevolutiva(p:{d:unknown}): JSX.Element
declare function EnneagramPrintReport(p:{result:Record<string,unknown>}): JSX.Element
declare function EnneagramDevolutiva(p:{d:unknown}): JSX.Element
declare function TemperamentPrintReport(p:{result:Record<string,unknown>}): JSX.Element
declare function TemperamentDevolutiva(p:{d:unknown}): JSX.Element
declare function ArchetypePrintReport(p:{result:Record<string,unknown>}): JSX.Element
declare function ArchetypeDevolutiva(p:{d:unknown}): JSX.Element
declare function ArchetypeFemininePrintReport(p:{result:Record<string,unknown>}): JSX.Element
declare function ArchetypeFeminineDevolutiva(p:{d:unknown}): JSX.Element
declare function LoveLanguagesPrintReport(p:{result:Record<string,unknown>}): JSX.Element
declare function LoveLanguagesDevolutiva(p:{d:unknown}): JSX.Element
declare function CareerAnchorPrintReport(p:{result:Record<string,unknown>}): JSX.Element
declare function CareerAnchorDevolutiva(p:{d:unknown}): JSX.Element
declare function EmotionalIntelligencePrintReport(p:{result:Record<string,unknown>}): JSX.Element
declare function EmotionalIntelligenceDevolutiva(p:{d:unknown}): JSX.Element
declare function VacPrintReport(p:{result:Record<string,unknown>}): JSX.Element
declare function BigFivePrintReport(p:{result:Record<string,unknown>}): JSX.Element
declare function TestResultCard(p:{testType:string;result:Record<string,unknown>}): JSX.Element
declare function UnlockPremiumButton(p:{reportId:string;priceBrl:string}): JSX.Element
export default function P() {
  const rd: Record<string, unknown> = resultData as Record<string, unknown>
  return (
    <div>
      <main>
        {assessment.testType === 'DISC' ? (isPrint ? (<DiscPrintReport result={rd} />) : (<DiscDevolutiva d={resultData} />)) : null}
        {assessment.testType === 'MBTI' ? (isPrint ? (<MbtiPrintReport result={rd} />) : (<MbtiDevolutiva d={resultData} />)) : null}
        {assessment.testType === 'ENNEAGRAM' ? (isPrint ? (<EnneagramPrintReport result={rd} />) : (<EnneagramDevolutiva d={resultData} />)) : null}
        {assessment.testType === 'TEMPERAMENT' ? (isPrint ? (<TemperamentPrintReport result={rd} />) : (<TemperamentDevolutiva d={resultData} />)) : null}
        {assessment.testType === 'ARCHETYPE' ? (isPrint ? (<ArchetypePrintReport result={rd} />) : (<ArchetypeDevolutiva d={resultData} />)) : null}
        {assessment.testType === 'ARCHETYPE_FEMININE' ? (isPrint ? (<ArchetypeFemininePrintReport result={rd} />) : (<ArchetypeFeminineDevolutiva d={resultData} />)) : null}
        {assessment.testType === 'LOVE_LANGUAGES' ? (isPrint ? (<LoveLanguagesPrintReport result={rd} />) : (<LoveLanguagesDevolutiva d={resultData} />)) : null}
        {assessment.testType === 'CAREER_ANCHOR' ? (isPrint ? (<CareerAnchorPrintReport result={rd} />) : (<CareerAnchorDevolutiva d={resultData} />)) : null}
        {assessment.testType === 'EMOTIONAL_INTELLIGENCE' ? (isPrint ? (<EmotionalIntelligencePrintReport result={rd} />) : (<EmotionalIntelligenceDevolutiva d={resultData} />)) : null}
        {assessment.testType === 'VAC' ? (isPrint ? (<VacPrintReport result={rd} />) : (<TestResultCard testType="VAC" result={rd} />)) : null}
        {assessment.testType === 'BIG_FIVE' ? (isPrint ? (<BigFivePrintReport result={rd} />) : (<TestResultCard testType="BIG_FIVE" result={rd} />)) : null}
        {!isPrint && reportId && !isPremiumUnlocked && (
          <UnlockPremiumButton reportId={reportId} priceBrl={priceBrl} />
        )}
      </main>
    </div>
  )
}

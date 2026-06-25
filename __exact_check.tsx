import React from "react"
declare const isPrint: boolean; declare const resultData: unknown; declare const assessment: { testType: string }; declare const reportId: string|null; declare const isPremiumUnlocked: boolean; declare const priceBrl: string; declare const APP_NAME: string;
const C: any = {}; const D: any=C,M=C,E=C,T=C,A=C,AF=C,L=C,CA=C,EI=C,V=C,BF=C,TR=C,UP=C,DiscPrintReport=C,DiscDevolutiva=C,MbtiPrintReport=C,MbtiDevolutiva=C,EnneagramPrintReport=C,EnneagramDevolutiva=C,TemperamentPrintReport=C,TemperamentDevolutiva=C,ArchetypePrintReport=C,ArchetypeDevolutiva=C,ArchetypeFemininePrintReport=C,ArchetypeFeminineDevolutiva=C,LoveLanguagesPrintReport=C,LoveLanguagesDevolutiva=C,CareerAnchorPrintReport=C,CareerAnchorDevolutiva=C,EmotionalIntelligencePrintReport=C,EmotionalIntelligenceDevolutiva=C,VacPrintReport=C,BigFivePrintReport=C,TestResultCard=C,UnlockPremiumButton=C;
export function P(){ return (<main>
        {/* Devolutiva por tipo */}
        {assessment.testType === 'DISC'               && (isPrint
          ? <DiscPrintReport result={resultData as Record<string, unknown>} />
          : <DiscDevolutiva d={resultData} />)}
        {assessment.testType === 'MBTI'               && (isPrint
          ? <MbtiPrintReport result={resultData as Record<string, unknown>} />
          : <MbtiDevolutiva d={resultData} />)}
        {assessment.testType === 'ENNEAGRAM'          && (isPrint
          ? <EnneagramPrintReport result={resultData as Record<string, unknown>} />
          : <EnneagramDevolutiva d={resultData} />)}
        {assessment.testType === 'TEMPERAMENT'        && (isPrint
          ? <TemperamentPrintReport result={resultData as Record<string, unknown>} />
          : <TemperamentDevolutiva d={resultData} />)}
        {assessment.testType === 'ARCHETYPE'          && (isPrint
          ? <ArchetypePrintReport result={resultData as Record<string, unknown>} />
          : <ArchetypeDevolutiva d={resultData} />)}
        {assessment.testType === 'ARCHETYPE_FEMININE' && (isPrint
          ? <ArchetypeFemininePrintReport result={resultData as Record<string, unknown>} />
          : <ArchetypeFeminineDevolutiva d={resultData} />)}
        {assessment.testType === 'LOVE_LANGUAGES'     && (isPrint
          ? <LoveLanguagesPrintReport result={resultData as Record<string, unknown>} />
          : <LoveLanguagesDevolutiva d={resultData} />)}
        {assessment.testType === 'CAREER_ANCHOR'      && (isPrint
          ? <CareerAnchorPrintReport result={resultData as Record<string, unknown>} />
          : <CareerAnchorDevolutiva d={resultData} />)}
        {assessment.testType === 'EMOTIONAL_INTELLIGENCE' && (isPrint
          ? <EmotionalIntelligencePrintReport result={resultData as Record<string, unknown>} />
          : <EmotionalIntelligenceDevolutiva d={resultData} />)}
        {assessment.testType === 'VAC'      && (isPrint
          ? <VacPr</main>) }

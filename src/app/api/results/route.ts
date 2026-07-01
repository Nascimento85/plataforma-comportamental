import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { calculateDisc } from '@/lib/engines/disc'
import { calculateMBTI } from '@/lib/engines/mbti'
import { calculateEnneagram } from '@/lib/engines/enneagram'
import { calculateTemperament } from '@/lib/engines/temperament'
import { calculateArchetypeMixed } from '@/lib/engines/archetype-mixed'
import { calculateArchetypeFeminine } from '@/lib/engines/archetype-feminine'
import { calculateLoveLanguages } from '@/lib/engines/love-languages'
import { calculateCareerAnchor } from '@/lib/engines/career-anchor'
import { calculateEmotionalIntelligence } from '@/lib/engines/emotional-intelligence'
import { calculateVac } from '@/lib/engines/vac'
import { calculateBigFive } from '@/lib/engines/big-five'
import { calculateQmt } from '@/lib/engines/qmt'
import { calculateLiderancaSituacional } from '@/lib/engines/lideranca-situacional'
import { calculateComunicacao } from '@/lib/engines/comunicacao'
import { calculateQi } from '@/lib/engines/qi'
import { uploadReport } from '@/lib/supabase'
import { generateReport } from '@/lib/pdf/generator'
import { sendTestCompletionNotifications } from '@/lib/email'
import { generateBundleReport } from '@/lib/bundle-report/generate'
import { triggerIntegratedReportRegeneration } from '@/lib/integrated-report/trigger'
import { sendProfileTagToManyChat } from '@/lib/manychat-tags'

const schema = z.object({
  token: z.string().min(1),
  answers: z.array(z.any()),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const parsed = schema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Dados inválidos.' }, { status: 400 })
    }

    const { token, answers } = parsed.data

    // Busca assessment pelo token
    const assessment = await prisma.assessment.findUnique({
      where: { token },
      include: {
        employee: { select: { name: true, email: true } },
        company: { select: { name: true, email: true } },
      },
    })

    if (!assessment) {
      return NextResponse.json({ error: 'Avaliação não encontrada.' }, { status: 404 })
    }

    if (assessment.status === 'COMPLETED') {
      return NextResponse.json({ error: 'Avaliação já concluída.' }, { status: 409 })
    }

    if (assessment.status === 'EXPIRED' || new Date() > new Date(assessment.expiresAt)) {
      return NextResponse.json({ error: 'Link expirado.' }, { status: 410 })
    }

    // Calcula resultado conforme tipo do teste
    let resultData: Record<string, unknown>

    switch (assessment.testType) {
      case 'DISC': {
        // Converte formato do cliente → formato do engine
        const discAnswers = (answers as { groupId: number; profileD: number; profileI: number; profileS: number; profileC: number }[]).map((a) => ({
          groupNumber: a.groupId,
          scores: { D: a.profileD, I: a.profileI, S: a.profileS, C: a.profileC },
        }))
        resultData = calculateDisc(discAnswers) as unknown as Record<string, unknown>
        break
      }
      case 'MBTI':
        resultData = calculateMBTI(answers) as unknown as Record<string, unknown>
        break
      case 'ENNEAGRAM':
        resultData = calculateEnneagram(answers) as unknown as Record<string, unknown>
        break
      case 'TEMPERAMENT':
        resultData = calculateTemperament(
          answers as { questionId: number; selected: 'A' | 'C' | 'I' | 'O' }[]
        ) as unknown as Record<string, unknown>
        break
      case 'ARCHETYPE':
        resultData = calculateArchetypeMixed(
          answers as { questionId: number; value: number }[]
        ) as unknown as Record<string, unknown>
        break
      case 'ARCHETYPE_FEMININE':
        resultData = calculateArchetypeFeminine(
          answers as { questionId: number; value: number }[]
        ) as unknown as Record<string, unknown>
        break
      case 'LOVE_LANGUAGES':
        resultData = calculateLoveLanguages(
          answers as { questionId: number; selected: 'A' | 'B' }[]
        ) as unknown as Record<string, unknown>
        break
      case 'CAREER_ANCHOR':
        resultData = calculateCareerAnchor(
          answers as { questionId: number; value: number }[]
        ) as unknown as Record<string, unknown>
        break
      case 'EMOTIONAL_INTELLIGENCE':
        resultData = calculateEmotionalIntelligence(
          answers as { questionId: number; value: number }[]
        ) as unknown as Record<string, unknown>
        break
      case 'VAC':
        resultData = calculateVac(
          answers as { questionId: number; value: number }[]
        ) as unknown as Record<string, unknown>
        break
      case 'BIG_FIVE':
        resultData = calculateBigFive(
          answers as { questionId: number; value: number }[]
        ) as unknown as Record<string, unknown>
        break
      case 'QMT':
        resultData = calculateQmt(
          answers as { questionId: number; value: number }[]
        ) as unknown as Record<string, unknown>
        break
      case 'LIDERANCA_SITUACIONAL':
        resultData = calculateLiderancaSituacional(
          answers as { questionId: number; value: number }[]
        ) as unknown as Record<string, unknown>
        break
      case 'COMUNICACAO':
        resultData = calculateComunicacao(
          answers as { questionId: number; value: number }[]
        ) as unknown as Record<string, unknown>
        break
      case 'QI':
        resultData = calculateQi(
          answers as { questionId: number; value: number }[]
        ) as unknown as Record<string, unknown>
        break
      default:
        return NextResponse.json({ error: 'Tipo de teste não suportado ainda.' }, { status: 400 })
    }

    // Salva respostas + resultado + gera PDF (tudo em transação)
    const result = await prisma.$transaction(async (tx) => {
      // Salva respostas brutas conforme tipo
      if (assessment.testType === 'DISC') {
        await tx.discAnswer.createMany({
          data: (answers as { groupId: number; profileD: number; profileI: number; profileS: number; profileC: number }[]).map((a) => ({
            assessmentId: assessment.id,
            groupId: a.groupId,
            profileD: a.profileD,
            profileI: a.profileI,
            profileS: a.profileS,
            profileC: a.profileC,
          })),
        })
      } else if (assessment.testType === 'MBTI') {
        await tx.mbtiAnswer.createMany({
          data: (answers as { questionId: number; scoreA: number; scoreB: number }[]).map((a) => ({
            assessmentId: assessment.id,
            questionId: a.questionId,
            scoreA: a.scoreA,
            scoreB: a.scoreB,
          })),
        })
      } else if (assessment.testType === 'ENNEAGRAM') {
        await tx.enneagramAnswer.createMany({
          data: (answers as { questionId: number; value: number }[]).map((a) => ({
            assessmentId: assessment.id,
            questionId: a.questionId,
            value: a.value,
          })),
        })
      } else if (assessment.testType === 'TEMPERAMENT') {
        await tx.temperamentAnswer.createMany({
          data: (answers as { questionId: number; selected: string }[]).map((a) => ({
            assessmentId: assessment.id,
            questionId: a.questionId,
            selected: a.selected,
          })),
        })
      }

      // Arquétipos, Career Anchor, IE, VAC e Big Five usam o mesmo formato do Eneagrama (questionId + value 1-5)
      if (
        assessment.testType === 'ARCHETYPE' ||
        assessment.testType === 'ARCHETYPE_FEMININE' ||
        assessment.testType === 'CAREER_ANCHOR' ||
        assessment.testType === 'EMOTIONAL_INTELLIGENCE' ||
        assessment.testType === 'VAC' ||
        assessment.testType === 'BIG_FIVE' ||
        assessment.testType === 'QMT' ||
        assessment.testType === 'LIDERANCA_SITUACIONAL' ||
        assessment.testType === 'COMUNICACAO' ||
        assessment.testType === 'QI'
      ) {
        await tx.enneagramAnswer.createMany({
          data: (answers as { questionId: number; value: number }[]).map((a) => ({
            assessmentId: assessment.id,
            questionId: a.questionId,
            value: a.value,
          })),
        })
      }

      // Cria resultado
      const r = await tx.result.create({
        data: {
          assessmentId: assessment.id,
          testType: assessment.testType,
          // Prisma serializa o objeto direto para JSONB nativo.
          // Stringificar aqui transforma em JSONB-string e quebra queries SQL
          // como resultData->'percentages'.
          resultData: resultData as object,
          primaryProfile: String(
            // DISC → predominant | MBTI → type | ENNEAGRAM → predominant (number) | TEMPERAMENT → primaryType
            // CAREER_ANCHOR → primaryAnchor | EMOTIONAL_INTELLIGENCE → primaryStrength
            (resultData as { predominant?: string | number }).predominant ??
            (resultData as { type?: string }).type ??
            (resultData as { primaryType?: string }).primaryType ??
            (resultData as { primaryLanguage?: string }).primaryLanguage ??
            (resultData as { primaryAnchor?: string }).primaryAnchor ??
            (resultData as { primaryStrength?: string }).primaryStrength ??
            (resultData as { primaryChannel?: string }).primaryChannel ??
            (resultData as { archetype?: string }).archetype ??
            ''
          ),
        },
      })

      // Marca assessment como concluído
      await tx.assessment.update({
        where: { id: assessment.id },
        data: { status: 'COMPLETED', completedAt: new Date() },
      })

      return r
    })

    // Gera PDF e envia notificações em background (não bloqueia resposta)
    generateAndUploadReport(assessment, resultData, result.id).catch(console.error)

    // Se faz parte de um bundle, verifica se todos concluíram → gera devolutiva cruzada
    if (assessment.bundleId) {
      checkAndGenerateBundleReport(assessment.bundleId).catch(console.error)
    }

    // Frente B: trigger fire-and-forget para regenerar a devolutiva integrada
    // do funcionário (cruza TODOS os testes que ele já fez). Engine internamente
    // decide se há testes suficientes (mín 2) e calcula profundidade.
    triggerIntegratedReportRegeneration(assessment.companyId, assessment.employeeId)

    sendTestCompletionNotifications({
      employeeName:  assessment.employee.name,
      employeeEmail: assessment.employee.email,
      companyName:   assessment.company.name,
      companyEmail:  assessment.company.email,
      testType:      assessment.testType,
      assessmentId:  assessment.id,
      resultId:      result.id,
    }).catch(console.error)

    // ManyChat: dispara a tag do perfil para o flow de re-engajamento.
    // Falha silenciosamente se MANYCHAT_API_TOKEN não estiver setado, ou
    // se o subscriber/tag ainda não existir — não bloqueia a resposta.
    if (result.primaryProfile) {
      sendProfileTagToManyChat({
        companyId:      assessment.companyId,
        testType:       assessment.testType,
        primaryProfile: result.primaryProfile,
        assessmentId:   assessment.id,
      }).catch((err) => console.error('[manychat-tags]', err))
    }

    return NextResponse.json(
      { resultId: result.id, assessmentId: assessment.id, result: resultData },
      { status: 201 },
    )
  } catch (err) {
    console.error('[results POST]', err)
    return NextResponse.json({ error: 'Erro interno.' }, { status: 500 })
  }
}

// Gera e faz upload do PDF de forma assíncrona
async function generateAndUploadReport(
  assessment: {
    id: string
    companyId: string
    testType: string
    employee: { name: string; email: string }
    company: { name: string; email: string }
  },
  resultData: Record<string, unknown>,
  resultId: string
) {
  try {
    const pdfBuffer = await generateReport({
      testType: assessment.testType,
      employeeName: assessment.employee.name,
      companyName: assessment.company.name,
      resultData,
    })

    const pdfUrl = await uploadReport(assessment.companyId, resultId, pdfBuffer)

    await prisma.report.create({
      data: {
        assessmentId: assessment.id,
        resultId,
        companyId: assessment.companyId,
        pdfUrl,
      },
    })
  } catch (err) {
    console.error('[generateAndUploadReport]', err)
  }
}

// Verifica se todos os testes do bundle foram concluídos e dispara geração da devolutiva cruzada
async function checkAndGenerateBundleReport(bundleId: string): Promise<void> {
  const bundleAssessments = await prisma.assessment.findMany({
    where: { bundleId },
    select: { status: true },
  })

  const allDone = bundleAssessments.length >= 2 &&
    bundleAssessments.every(a => a.status === 'COMPLETED')

  if (allDone) {
    console.log(`[bundleReport] Bundle ${bundleId} completo — gerando devolutiva cruzada...`)
    await generateBundleReport(bundleId)
  }
}

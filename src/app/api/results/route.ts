import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { calculateDisc } from '@/lib/engines/disc'
import { calculateMBTI } from '@/lib/engines/mbti'
import { calculateEnneagram } from '@/lib/engines/enneagram'
import { calculateTemperament } from '@/lib/engines/temperament'
import { calculateArchetypeMixed } from '@/lib/engines/archetype-mixed'
import { calculateArchetypeFeminine } from '@/lib/engines/archetype-feminine'
import { uploadReport } from '@/lib/supabase'
import { generateReport } from '@/lib/pdf/generator'

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
        company: { select: { name: true } },
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

      // Arquétipos usam o mesmo formato do Eneagrama (questionId + value 1-5)
      if (assessment.testType === 'ARCHETYPE' || assessment.testType === 'ARCHETYPE_FEMININE') {
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
          resultData: JSON.stringify(resultData),
          primaryProfile: String(
            // DISC → predominant | MBTI → type | ENNEAGRAM → predominant (number) | TEMPERAMENT → primaryType (string)
            (resultData as { predominant?: string | number }).predominant ??
            (resultData as { type?: string }).type ??
            (resultData as { primaryType?: string }).primaryType ??
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

    // Gera PDF em background (não bloqueia resposta)
    generateAndUploadReport(assessment, resultData, result.id).catch(console.error)

    return NextResponse.json({ resultId: result.id, result: resultData }, { status: 201 })
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
    company: { name: string }
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

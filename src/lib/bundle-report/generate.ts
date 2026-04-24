// ============================================================
// Gerador da devolutiva cruzada (Bundle Report)
// Chamado automaticamente quando todos os 4 testes do bundle
// são concluídos.
// ============================================================

import { prisma } from '@/lib/prisma'
import { buildBundlePrompt, type BundleResultsInput } from './prompt'

// ── Tipos dos resultados armazenados em result.resultData ──────

interface DiscResult {
  predominant: string
  secondary: string
  scores: Record<string, number>
}

interface MbtiResult {
  type: string
  functions?: string[]
  scores?: Record<string, number>
}

interface EnneagramResult {
  predominant: number
  wing?: number
  scores: Record<string, number>
}

interface ArchetypeResult {
  primary: string
  secondary: string
  scores: Record<string, number>
}

// ── Função principal ──────────────────────────────────────────

export async function generateBundleReport(bundleId: string): Promise<void> {
  // Busca todos os assessments do bundle com seus resultados
  const assessments = await prisma.assessment.findMany({
    where: { bundleId },
    include: {
      result: true,
      employee: { select: { name: true } },
      company: { select: { id: true } },
    },
  })

  if (assessments.length < 4) {
    console.log(`[bundleReport] Bundle ${bundleId} tem apenas ${assessments.length} assessments concluídos — aguardando.`)
    return
  }

  const allCompleted = assessments.every(a => a.status === 'COMPLETED' && a.result)
  if (!allCompleted) {
    console.log(`[bundleReport] Bundle ${bundleId} ainda tem assessments incompletos.`)
    return
  }

  const employeeName = assessments[0].employee.name
  const companyId    = assessments[0].company.id
  const employeeId   = assessments[0].employeeId

  // Upsert: cria ou atualiza o BundleReport com status GENERATING
  await prisma.bundleReport.upsert({
    where:  { bundleId },
    create: { bundleId, companyId, employeeId, status: 'GENERATING' },
    update: { status: 'GENERATING', updatedAt: new Date() },
  })

  try {
    // Extrai resultados por tipo de teste
    const byType = Object.fromEntries(
      assessments.map(a => [a.testType, JSON.parse(a.result!.resultData as string)])
    )

    const input: BundleResultsInput = {
      employeeName,
      disc: {
        predominant: byType['DISC']?.predominant ?? 'D',
        secondary:   byType['DISC']?.secondary   ?? 'I',
        scores:      byType['DISC']?.scores       ?? {},
      },
      mbti: {
        type:      byType['MBTI']?.type       ?? 'INTJ',
        functions: byType['MBTI']?.functions  ?? [],
      },
      enneagram: {
        predominant: Number(byType['ENNEAGRAM']?.predominant ?? 1),
        wing:        byType['ENNEAGRAM']?.wing,
        scores:      byType['ENNEAGRAM']?.scores ?? {},
      },
      archetype: {
        primary:   byType['ARCHETYPE']?.primary   ?? byType['TEMPERAMENT']?.primaryType ?? 'CREATOR',
        secondary: byType['ARCHETYPE']?.secondary ?? byType['TEMPERAMENT']?.secondaryType ?? 'EXPLORER',
        scores:    byType['ARCHETYPE']?.scores    ?? byType['TEMPERAMENT']?.scores ?? {},
      },
    }

    const prompt = buildBundlePrompt(input)
    const content = await callAnthropicAPI(prompt)

    // Valida que é JSON válido
    JSON.parse(content)

    await prisma.bundleReport.update({
      where:  { bundleId },
      data:   { status: 'COMPLETED', content },
    })

    console.log(`[bundleReport] ✅ Bundle ${bundleId} — relatório gerado com sucesso.`)
  } catch (err) {
    console.error(`[bundleReport] ❌ Erro ao gerar relatório para bundle ${bundleId}:`, err)
    await prisma.bundleReport.update({
      where:  { bundleId },
      data:   { status: 'FAILED' },
    })
  }
}

// ── Chamada à API Anthropic (sem SDK — fetch nativo) ──────────

async function callAnthropicAPI(prompt: string): Promise<string> {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) throw new Error('ANTHROPIC_API_KEY não configurada')

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type':      'application/json',
      'x-api-key':         apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model:      'claude-3-5-sonnet-20241022',
      max_tokens: 4096,
      messages: [
        { role: 'user', content: prompt }
      ],
    }),
  })

  if (!response.ok) {
    const errText = await response.text()
    throw new Error(`Anthropic API error ${response.status}: ${errText}`)
  }

  const data = await response.json() as {
    content: Array<{ type: string; text: string }>
  }

  const text = data.content?.[0]?.text ?? ''
  if (!text) throw new Error('Resposta vazia da API Anthropic')

  // Remove possível markdown wrapping caso o modelo retorne ```json ... ```
  return text.replace(/^```json\s*/i, '').replace(/\s*```$/i, '').trim()
}

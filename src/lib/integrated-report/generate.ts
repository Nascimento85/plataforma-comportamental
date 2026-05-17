// ============================================================
// Engine principal da Devolutiva Integrada por Funcionario
// ============================================================

import { prisma } from '@/lib/prisma'
import { extractSummary } from './adapters'
import { computeDepth, DEPTH_CONFIGS } from './depth'
import { buildPrompt } from './prompts'
import type { SupportedTestType, IntegratedReportContent, TestSummary } from './types'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const prismaAny = prisma as any

const MIN_TESTS_FOR_REPORT = 2

export interface GenerateOptions {
  force?: boolean
}

export interface GenerateResult {
  status: 'GENERATED' | 'SKIPPED_NOT_ENOUGH_TESTS' | 'SKIPPED_NO_CHANGE' | 'FAILED'
  depth?: string
  testCount?: number
  reason?: string
}

export async function generateIntegratedReport(
  companyId: string,
  employeeId: string,
  opts: GenerateOptions = {}
): Promise<GenerateResult> {
  const assessments = await prisma.assessment.findMany({
    where:   { companyId, employeeId, status: 'COMPLETED' },
    include: { result: true, employee: { select: { name: true } } },
    orderBy: { completedAt: 'asc' },
  })

  const completedWithResult = assessments.filter(a => a.result?.resultData)

  const byTestType = new Map<string, typeof completedWithResult[0]>()
  for (const a of completedWithResult) {
    byTestType.set(a.testType, a)
  }

  const testCount = byTestType.size

  if (testCount < MIN_TESTS_FOR_REPORT) {
    return {
      status: 'SKIPPED_NOT_ENOUGH_TESTS',
      testCount,
      reason: `Funcionario tem apenas ${testCount} teste(s) concluido(s). Minimo: ${MIN_TESTS_FOR_REPORT}.`,
    }
  }

  const existing = await prismaAny.employeeIntegratedReport.findUnique({
    where: { companyId_employeeId: { companyId, employeeId } },
  })

  if (existing && existing.status === 'COMPLETED' && existing.testCount === testCount && !opts.force) {
    return {
      status: 'SKIPPED_NO_CHANGE',
      depth: existing.depth,
      testCount,
      reason: 'Relatorio ja gerado com a mesma quantidade de testes.',
    }
  }

  const summaries: TestSummary[] = []
  const includedTests: SupportedTestType[] = []
  for (const [testType, assessment] of byTestType) {
    const summary = extractSummary(testType, assessment.result?.resultData)
    if (summary) {
      summaries.push(summary)
      includedTests.push(summary.testType)
    }
  }

  if (summaries.length < MIN_TESTS_FOR_REPORT) {
    return {
      status: 'SKIPPED_NOT_ENOUGH_TESTS',
      testCount: summaries.length,
      reason: `Apos filtro de adapters, restaram ${summaries.length} testes validos.`,
    }
  }

  const depth        = computeDepth(summaries.length)
  const cfg          = DEPTH_CONFIGS[depth]
  const employeeName = completedWithResult[0]?.employee.name ?? 'Avaliado(a)'

  await prismaAny.employeeIntegratedReport.upsert({
    where: { companyId_employeeId: { companyId, employeeId } },
    create: {
      employeeId, companyId,
      status: 'GENERATING', depth,
      testCount: summaries.length,
      includedTests: JSON.stringify(includedTests),
    },
    update: {
      status: 'GENERATING', depth,
      testCount: summaries.length,
      includedTests: JSON.stringify(includedTests),
      updatedAt: new Date(),
    },
  })

  try {
    const prompt = buildPrompt(depth, { employeeName, summaries })
    const llmText = await callAnthropicAPI(prompt, cfg.maxTokens)

    let sections: Record<string, unknown>
    try {
      sections = JSON.parse(llmText)
    } catch {
      throw new Error('Resposta da Claude API nao e JSON valido.')
    }

    const content: IntegratedReportContent = {
      generatedAt: new Date().toISOString(),
      depth, includedTests, employeeName, sections,
    }

    await prismaAny.employeeIntegratedReport.update({
      where: { companyId_employeeId: { companyId, employeeId } },
      data:  { status: 'COMPLETED', content: JSON.stringify(content) },
    })

    console.log(`[integrated-report] OK ${employeeName} (${employeeId}) ${depth} ${summaries.length} testes`)
    return { status: 'GENERATED', depth, testCount: summaries.length }
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error(`[integrated-report] FAIL ${employeeId}:`, msg)
    await prismaAny.employeeIntegratedReport.update({
      where: { companyId_employeeId: { companyId, employeeId } },
      data:  { status: 'FAILED' },
    }).catch(() => {})
    return { status: 'FAILED', testCount: summaries.length, reason: msg }
  }
}

async function callAnthropicAPI(prompt: string, maxTokens: number): Promise<string> {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) throw new Error('ANTHROPIC_API_KEY nao configurada')

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type':      'application/json',
      'x-api-key':         apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model:      'claude-sonnet-4-6',
      max_tokens: maxTokens,
      messages:   [{ role: 'user', content: prompt }],
    }),
  })

  if (!response.ok) {
    const errText = await response.text().catch(() => '')
    throw new Error(`Anthropic API error ${response.status}: ${errText}`)
  }

  const data = await response.json() as {
    content: Array<{ type: string; text: string }>
  }

  const text = data.content?.[0]?.text ?? ''
  if (!text) throw new Error('Resposta vazia da Anthropic API')

  return text.replace(/^```json\s*/i, '').replace(/\s*```$/i, '').trim()
}

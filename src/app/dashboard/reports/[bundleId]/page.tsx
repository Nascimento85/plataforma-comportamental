// ============================================================
// /dashboard/reports/[bundleId]
// Devolutiva integrada cruzando os 4 testes do bundle
// ============================================================

import { redirect, notFound } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import BundleReportClient from './BundleReportClient'

interface PageProps {
  params: { bundleId: string }
}

export default async function BundleReportPage({ params }: PageProps) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) redirect('/login')

  const report = await prisma.bundleReport.findUnique({
    where:   { bundleId: params.bundleId },
    include: { employee: { select: { name: true, email: true } } },
  })

  if (!report) notFound()
  if (report.companyId !== session.user.id) notFound()

  const content = report.content ? JSON.parse(report.content) : null

  return (
    <BundleReportClient
      bundleId={params.bundleId}
      status={report.status}
      employeeName={report.employee.name}
      content={content}
      pdfUrl={report.pdfUrl}
      createdAt={report.createdAt.toISOString()}
    />
  )
}

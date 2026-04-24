-- ============================================================
-- Migration: Adicionar tabela BundleReport
-- Execute no Supabase SQL Editor ou via Railway deploy
-- ============================================================

CREATE TABLE IF NOT EXISTS "BundleReport" (
  "id"          TEXT NOT NULL DEFAULT gen_random_uuid()::text,
  "bundleId"    TEXT NOT NULL,
  "companyId"   TEXT NOT NULL,
  "employeeId"  TEXT NOT NULL,
  "status"      TEXT NOT NULL DEFAULT 'PENDING',
  "content"     TEXT,
  "pdfUrl"      TEXT,
  "createdAt"   TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt"   TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "BundleReport_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "BundleReport_bundleId_key" UNIQUE ("bundleId"),
  CONSTRAINT "BundleReport_companyId_fkey"
    FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT "BundleReport_employeeId_fkey"
    FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- Index para busca rápida por empresa
CREATE INDEX IF NOT EXISTS "BundleReport_companyId_idx" ON "BundleReport"("companyId");

-- Atualiza updatedAt automaticamente via trigger (opcional, o Prisma gerencia)

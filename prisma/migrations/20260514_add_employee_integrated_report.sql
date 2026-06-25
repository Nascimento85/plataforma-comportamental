-- ============================================================
-- Migration: Frente B — Devolutiva Integrada por Funcionário
-- Data: 2026-05-14
-- Adiciona:
--   - Tabela EmployeeIntegratedReport (1 por employee+company)
--   - Cruza TODOS os testes que o employee completou, escalando em profundidade
--
-- Como aplicar:
--   1) Local: já aplicado via prisma db push em schema.dev.prisma
--   2) Produção: rodar este SQL no Supabase SQL Editor OU localmente:
--        npx prisma db execute \
--          --file prisma/migrations/20260514_add_employee_integrated_report.sql \
--          --schema prisma/schema.prisma
-- ============================================================

-- Tabela EmployeeIntegratedReport
CREATE TABLE IF NOT EXISTS "EmployeeIntegratedReport" (
  "id"            TEXT NOT NULL,
  "employeeId"    TEXT NOT NULL,
  "companyId"     TEXT NOT NULL,
  "status"        TEXT NOT NULL DEFAULT 'PENDING',  -- PENDING|GENERATING|COMPLETED|FAILED
  "depth"         TEXT NOT NULL DEFAULT 'BASIC',    -- BASIC|SYNTHETIC|EXECUTIVE|PREMIUM
  "testCount"     INTEGER NOT NULL DEFAULT 0,
  "includedTests" TEXT,                              -- JSON array dos testTypes
  "content"       TEXT,                              -- JSON com seções do relatório
  "pdfUrl"        TEXT,
  "generatedAt"   TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt"     TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "EmployeeIntegratedReport_pkey" PRIMARY KEY ("id"),

  CONSTRAINT "EmployeeIntegratedReport_employeeId_fkey"
    FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE,

  CONSTRAINT "EmployeeIntegratedReport_companyId_fkey"
    FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- Unique: 1 relatório por (company, employee). Permite upsert no engine.
CREATE UNIQUE INDEX IF NOT EXISTS "EmployeeIntegratedReport_companyId_employeeId_key"
  ON "EmployeeIntegratedReport"("companyId", "employeeId");

-- Índices auxiliares para listagens
CREATE INDEX IF NOT EXISTS "EmployeeIntegratedReport_companyId_idx"
  ON "EmployeeIntegratedReport"("companyId");

CREATE INDEX IF NOT EXISTS "EmployeeIntegratedReport_status_idx"
  ON "EmployeeIntegratedReport"("status");

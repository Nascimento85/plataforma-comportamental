-- ============================================================
-- Migration: Passaporte de Autoconhecimento
-- Data: 2026-04-27
-- Como aplicar: copie e cole no Supabase SQL Editor → Run
-- (mesmo padrão das migrations anteriores)
-- ============================================================
-- Adiciona:
--   1) Campos novos em CreditBalance (bonus + status)
--   2) Campos novos em CreditTransaction (source/expiresAt/grantId)
--   3) Tabela BonusGrant (lotes de bônus c/ expiração FIFO)
--   4) Tabela ReportUnlock (desbloqueio individual de Premium)
--   5) Tabela ScheduledOutreach (fila de outreach ManyChat)
-- ============================================================

-- ---------------------------------------------------------------
-- 1) CreditBalance — campos novos
-- ---------------------------------------------------------------
ALTER TABLE "CreditBalance"
  ADD COLUMN IF NOT EXISTS "bonusBalance"       INTEGER       NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS "bonusNextExpiresAt" TIMESTAMP(3),
  ADD COLUMN IF NOT EXISTS "passportStatus"     TEXT          NOT NULL DEFAULT 'INACTIVE';

CREATE INDEX IF NOT EXISTS "CreditBalance_bonusNextExpiresAt_idx" ON "CreditBalance"("bonusNextExpiresAt");
CREATE INDEX IF NOT EXISTS "CreditBalance_passportStatus_idx"     ON "CreditBalance"("passportStatus");

-- ---------------------------------------------------------------
-- 2) CreditTransaction — campos novos
-- ---------------------------------------------------------------
ALTER TABLE "CreditTransaction"
  ADD COLUMN IF NOT EXISTS "source"    TEXT NOT NULL DEFAULT 'PAID',
  ADD COLUMN IF NOT EXISTS "expiresAt" TIMESTAMP(3),
  ADD COLUMN IF NOT EXISTS "grantId"   TEXT;

CREATE INDEX IF NOT EXISTS "CreditTransaction_companyId_type_idx" ON "CreditTransaction"("companyId","type");
CREATE INDEX IF NOT EXISTS "CreditTransaction_expiresAt_idx"      ON "CreditTransaction"("expiresAt");

-- ---------------------------------------------------------------
-- 3) BonusGrant (lotes do Passaporte com expiração FIFO)
-- ---------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "BonusGrant" (
  "id"              TEXT PRIMARY KEY,
  "companyId"       TEXT NOT NULL,
  "creditBalanceId" TEXT NOT NULL,
  "source"          TEXT NOT NULL,
  "amount"          INTEGER NOT NULL,
  "remaining"       INTEGER NOT NULL,
  "grantedAt"       TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "expiresAt"       TIMESTAMP(3) NOT NULL,
  "expiredAt"       TIMESTAMP(3),
  "description"     TEXT NOT NULL DEFAULT '',
  CONSTRAINT "BonusGrant_companyId_fkey"
    FOREIGN KEY ("companyId")
    REFERENCES "Company"("id")
    ON DELETE CASCADE,
  CONSTRAINT "BonusGrant_creditBalanceId_fkey"
    FOREIGN KEY ("creditBalanceId")
    REFERENCES "CreditBalance"("id")
    ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS "BonusGrant_companyId_expiresAt_idx"
  ON "BonusGrant"("companyId","expiresAt");

CREATE INDEX IF NOT EXISTS "BonusGrant_companyId_remaining_expiresAt_idx"
  ON "BonusGrant"("companyId","remaining","expiresAt");

-- ---------------------------------------------------------------
-- 4) ReportUnlock (desbloqueio individual do Relatório Premium)
-- ---------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "ReportUnlock" (
  "id"              TEXT PRIMARY KEY,
  "reportId"        TEXT NOT NULL UNIQUE,
  "companyId"       TEXT NOT NULL,
  "stripeSessionId" TEXT UNIQUE,
  "amountBrl"       INTEGER NOT NULL,
  "unlockedAt"      TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "ReportUnlock_reportId_fkey"
    FOREIGN KEY ("reportId")  REFERENCES "Report"("id") ON DELETE CASCADE,
  CONSTRAINT "ReportUnlock_companyId_fkey"
    FOREIGN KEY ("companyId") REFERENCES "Company"("id")
);

CREATE INDEX IF NOT EXISTS "ReportUnlock_companyId_idx" ON "ReportUnlock"("companyId");

-- ---------------------------------------------------------------
-- 5) ScheduledOutreach (fila de outreach ManyChat)
-- ---------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "ScheduledOutreach" (
  "id"           TEXT PRIMARY KEY,
  "companyId"    TEXT NOT NULL,
  "type"         TEXT NOT NULL,
  "scheduledFor" TIMESTAMP(3) NOT NULL,
  "sentAt"       TIMESTAMP(3),
  "status"       TEXT NOT NULL DEFAULT 'PENDING',
  "attempts"     INTEGER NOT NULL DEFAULT 0,
  "payload"      JSONB NOT NULL,
  "errorMsg"     TEXT,
  "createdAt"    TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "ScheduledOutreach_companyId_fkey"
    FOREIGN KEY ("companyId")
    REFERENCES "Company"("id")
    ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS "ScheduledOutreach_status_scheduledFor_idx"
  ON "ScheduledOutreach"("status","scheduledFor");

CREATE INDEX IF NOT EXISTS "ScheduledOutreach_companyId_type_idx"
  ON "ScheduledOutreach"("companyId","type");

-- ============================================================
-- ✅ Migration concluída.
-- Próximo passo: rodar `npx prisma generate` localmente (atualiza o
-- client TypeScript com os novos models).
-- ============================================================

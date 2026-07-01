-- ============================================================
-- TrialLead — degustação via QR Code (palestras / rodadas de negócio)
-- Idempotente: pode rodar mais de uma vez sem erro.
-- Aplicar:  npx prisma db execute --file prisma/migrations/20260701_add_trial_lead.sql --schema prisma/schema.prisma
-- ============================================================

CREATE TABLE IF NOT EXISTS "TrialLead" (
  "id"                 TEXT NOT NULL,
  "firstName"          TEXT NOT NULL,
  "whatsapp"           TEXT NOT NULL,
  "src"                TEXT,
  "testTypes"          TEXT NOT NULL,
  "bundleId"           TEXT,
  "firstToken"         TEXT,
  "status"             TEXT NOT NULL DEFAULT 'STARTED',
  "convertedCompanyId" TEXT,
  "createdAt"          TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "convertedAt"        TIMESTAMP(3),
  CONSTRAINT "TrialLead_pkey" PRIMARY KEY ("id")
);

CREATE INDEX IF NOT EXISTS "TrialLead_src_idx"      ON "TrialLead" ("src");
CREATE INDEX IF NOT EXISTS "TrialLead_status_idx"   ON "TrialLead" ("status");
CREATE INDEX IF NOT EXISTS "TrialLead_bundleId_idx" ON "TrialLead" ("bundleId");

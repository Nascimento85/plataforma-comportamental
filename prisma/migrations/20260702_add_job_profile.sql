-- ============================================================
-- JobProfile — Perfil Ideal da Vaga (recomendação por IA)
-- Idempotente.
-- Aplicar: npx prisma db execute --file prisma/migrations/20260702_add_job_profile.sql --schema prisma/schema.prisma
-- ============================================================

CREATE TABLE IF NOT EXISTS "JobProfile" (
  "id"         TEXT NOT NULL,
  "companyId"  TEXT NOT NULL,
  "titulo"     TEXT NOT NULL,
  "descricao"  TEXT NOT NULL,
  "resultData" TEXT NOT NULL,
  "createdAt"  TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "JobProfile_pkey" PRIMARY KEY ("id")
);

CREATE INDEX IF NOT EXISTS "JobProfile_companyId_idx" ON "JobProfile" ("companyId");

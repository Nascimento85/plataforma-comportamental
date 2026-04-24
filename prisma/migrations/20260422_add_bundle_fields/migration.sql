-- ============================================================
-- Migração: adiciona bundleId e bundleOrder ao modelo Assessment
-- Executar via Supabase SQL Editor ou com: prisma migrate deploy
-- ============================================================

ALTER TABLE "Assessment"
  ADD COLUMN IF NOT EXISTS "bundleId"    TEXT,
  ADD COLUMN IF NOT EXISTS "bundleOrder" INTEGER;

-- Índice para buscar todos os assessments de um bundle rapidamente
CREATE INDEX IF NOT EXISTS "Assessment_bundleId_idx"
  ON "Assessment"("bundleId");

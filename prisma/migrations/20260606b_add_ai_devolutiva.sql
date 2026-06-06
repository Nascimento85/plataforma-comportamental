-- ============================================================
-- 20260606b_add_ai_devolutiva.sql
-- ============================================================
-- Persiste a devolutiva aprofundada gerada por IA no TalentMember,
-- para que o gestor possa reabrir e consultar a qualquer momento.
--
-- Idempotente. Aplicar via:
--   npx prisma db execute --file <este> --schema prisma/schema.prisma
-- ============================================================

ALTER TABLE "TalentMember" ADD COLUMN IF NOT EXISTS "aiDevolutiva"   TEXT;
ALTER TABLE "TalentMember" ADD COLUMN IF NOT EXISTS "aiDevolutivaEm" TIMESTAMP(3);

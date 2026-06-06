-- ============================================================
-- 20260606_add_talent_avaliacao.sql
-- ============================================================
-- Adiciona o questionário de avaliação 9-box ao TalentMember.
-- Guarda as respostas e as médias calculadas (Performance, Fit,
-- Potencial) em JSON, permitindo reabrir e editar a avaliação.
--
-- Idempotente: pode ser rodado várias vezes.
-- Aplicar via: npx prisma db execute --file <este> --schema prisma/schema.prisma
-- ============================================================

ALTER TABLE "TalentMember" ADD COLUMN IF NOT EXISTS "avaliacaoJson" TEXT;
ALTER TABLE "TalentMember" ADD COLUMN IF NOT EXISTS "potencial" DOUBLE PRECISION;

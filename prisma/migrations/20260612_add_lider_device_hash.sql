-- ============================================================
-- 20260612_add_lider_device_hash.sql
-- Antifraude da Avaliacao de Lideranca: hash irreversivel de
-- dispositivo (HMAC de IP+UserAgent) por resposta. Nao identifica
-- a pessoa, apenas permite detectar varias respostas do mesmo
-- dispositivo no mesmo time (manipulacao do lider).
-- Idempotente. Aplicar via:
--   npx prisma db execute --file prisma/migrations/20260612_add_lider_device_hash.sql --schema prisma/schema.prisma
-- ============================================================
ALTER TABLE "LiderResposta" ADD COLUMN IF NOT EXISTS "deviceHash" TEXT;

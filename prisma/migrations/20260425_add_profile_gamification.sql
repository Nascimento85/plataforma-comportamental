-- ============================================================
-- Migration: Frente A — Perfil + Gamificação de Onboarding
-- Data: 2026-04-25
-- Adiciona:
--   - Campos de perfil em Company (whatsapp, linkedin, endereço, profissionais)
--   - Flags de gamificação (isOnboardingCredited, isProfileCompletedRewarded)
--   - Tabela ProfileValidationCode (código 6 dígitos para liberar +6 créditos)
--
-- Como aplicar:
--   1) Local (já feito via prisma db push no schema.dev.prisma)
--   2) Produção: rodar este SQL no Supabase SQL Editor OU via Railway shell
-- ============================================================

-- ── 1. Novos campos em Company ─────────────────────────────────────────────
ALTER TABLE "Company"
  ADD COLUMN IF NOT EXISTS "whatsapp"      TEXT,
  ADD COLUMN IF NOT EXISTS "linkedin"      TEXT,
  ADD COLUMN IF NOT EXISTS "addressStreet" TEXT,
  ADD COLUMN IF NOT EXISTS "addressCity"   TEXT,
  ADD COLUMN IF NOT EXISTS "addressState"  TEXT,
  ADD COLUMN IF NOT EXISTS "addressZip"    TEXT,
  ADD COLUMN IF NOT EXISTS "jobTitle"      TEXT,
  ADD COLUMN IF NOT EXISTS "companyName"   TEXT;

-- ── 2. Flags de gamificação ────────────────────────────────────────────────
ALTER TABLE "Company"
  ADD COLUMN IF NOT EXISTS "isOnboardingCredited"       BOOLEAN NOT NULL DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS "isProfileCompletedRewarded" BOOLEAN NOT NULL DEFAULT FALSE;

-- Marca todos os usuários antigos como já creditados (evita re-bonus retroativo)
UPDATE "Company"
   SET "isOnboardingCredited" = TRUE
 WHERE "createdAt" < NOW();

-- ── 3. Tabela de códigos de validação de perfil ────────────────────────────
CREATE TABLE IF NOT EXISTS "ProfileValidationCode" (
  "id"         TEXT NOT NULL,
  "companyId"  TEXT NOT NULL,
  "code"       TEXT NOT NULL,
  "expiresAt"  TIMESTAMP(3) NOT NULL,
  "used"       BOOLEAN NOT NULL DEFAULT FALSE,
  "createdAt"  TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "ProfileValidationCode_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "ProfileValidationCode_companyId_fkey"
    FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX IF NOT EXISTS "ProfileValidationCode_companyId_idx"
  ON "ProfileValidationCode"("companyId");

CREATE INDEX IF NOT EXISTS "ProfileValidationCode_code_idx"
  ON "ProfileValidationCode"("code");

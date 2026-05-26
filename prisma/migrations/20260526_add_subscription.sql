-- ============================================================
-- 20260526_add_subscription.sql
-- ============================================================
-- Adiciona tabela Subscription para monetizacao B2B (PJ).
-- 3 planos: ESSENCIAL, PROFISSIONAL, ENTERPRISE.
-- Trial 7 dias sem cartao. Stripe Subscription quando pagar.
--
-- Idempotente: pode ser rodado varias vezes.
-- Aplicar via: npx prisma db execute --file <este> --schema prisma/schema.prisma
-- Apos: rodar 20260526_enable_rls_all_tables.sql para proteger a nova tabela.
-- ============================================================

CREATE TABLE IF NOT EXISTS "Subscription" (
  "id"                   TEXT NOT NULL PRIMARY KEY,
  "companyId"            TEXT NOT NULL UNIQUE,
  "plan"                 TEXT NOT NULL,
  "status"               TEXT NOT NULL,
  "source"               TEXT NOT NULL DEFAULT 'STRIPE',
  "stripeCustomerId"     TEXT,
  "stripeSubscriptionId" TEXT UNIQUE,
  "trialStart"           TIMESTAMP(3),
  "trialEnd"             TIMESTAMP(3),
  "currentPeriodStart"   TIMESTAMP(3),
  "currentPeriodEnd"     TIMESTAMP(3),
  "canceledAt"           TIMESTAMP(3),
  "createdAt"            TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt"            TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "Subscription_companyId_fkey"
    FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS "Subscription_companyId_idx"            ON "Subscription"("companyId");
CREATE INDEX IF NOT EXISTS "Subscription_status_idx"               ON "Subscription"("status");
CREATE INDEX IF NOT EXISTS "Subscription_stripeCustomerId_idx"     ON "Subscription"("stripeCustomerId");
CREATE INDEX IF NOT EXISTS "Subscription_stripeSubscriptionId_idx" ON "Subscription"("stripeSubscriptionId");

-- Habilita RLS na nova tabela (Supabase Advisor)
ALTER TABLE "Subscription" ENABLE ROW LEVEL SECURITY;

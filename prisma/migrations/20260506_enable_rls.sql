-- ============================================================
-- Habilita Row-Level Security (RLS) em todas as tabelas do
-- schema public. Sem policies, RLS bloqueia 100% do acesso via
-- API REST/anon key do Supabase.
--
-- O app Next.js usa Prisma com DATABASE_URL (role postgres,
-- superuser), que tem BYPASSRLS — não é afetado.
--
-- Como rodar:
--   Supabase Dashboard → SQL Editor → cola tudo → Run
--
-- Idempotente: usar várias vezes não quebra nada.
-- ============================================================

ALTER TABLE "Company"                 ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ProfileValidationCode"   ENABLE ROW LEVEL SECURITY;
ALTER TABLE "PasswordResetToken"      ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Employee"                ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Assessment"              ENABLE ROW LEVEL SECURITY;
ALTER TABLE "DiscAnswer"              ENABLE ROW LEVEL SECURITY;
ALTER TABLE "MbtiAnswer"              ENABLE ROW LEVEL SECURITY;
ALTER TABLE "EnneagramAnswer"         ENABLE ROW LEVEL SECURITY;
ALTER TABLE "TemperamentAnswer"       ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Result"                  ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Report"                  ENABLE ROW LEVEL SECURITY;
ALTER TABLE "CreditBalance"           ENABLE ROW LEVEL SECURITY;
ALTER TABLE "CreditPurchase"          ENABLE ROW LEVEL SECURITY;
ALTER TABLE "CreditTransaction"       ENABLE ROW LEVEL SECURITY;
ALTER TABLE "BundleReport"            ENABLE ROW LEVEL SECURITY;
ALTER TABLE "BonusGrant"              ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ReportUnlock"            ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ScheduledOutreach"       ENABLE ROW LEVEL SECURITY;

-- Verificação: lista todas as tabelas e o status do RLS
SELECT
  schemaname,
  tablename,
  rowsecurity AS rls_enabled
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY tablename;

-- ============================================================
-- Segurança Supabase (aplicado em prod em 06/07/2026 via Supabase MCP).
-- Este arquivo mantém o repositório como fonte da verdade: se o banco
-- for reconstruído, reaplica o RLS das tabelas novas e a view sem
-- SECURITY DEFINER. Idempotente.
--
-- Aplicar (se necessário):
--   npx prisma db execute --file prisma/migrations/20260706_security_rls_and_view.sql --schema prisma/schema.prisma
-- ============================================================

-- RLS nas tabelas criadas depois do hardening inicial (#48).
-- ENABLE ROW LEVEL SECURITY é idempotente (sem policy = só service role acessa).
ALTER TABLE public."TrialLead"  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."JobProfile" ENABLE ROW LEVEL SECURITY;

-- View de saldo: roda com as permissões de quem consulta (não do criador),
-- respeitando o RLS das tabelas base. Remove o alerta security_definer_view.
ALTER VIEW public."CreditBalanceWithCompany" SET (security_invoker = on);

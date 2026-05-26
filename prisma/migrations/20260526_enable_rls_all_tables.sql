-- ============================================================
-- 20260526_enable_rls_all_tables.sql
-- ============================================================
-- Habilita Row-Level Security (RLS) em TODAS as tabelas do schema
-- public. Necessário para mitigar os alertas críticos do Supabase
-- Security Advisor (rls_disabled_in_public + sensitive_columns_exposed).
--
-- Estratégia:
--   1. ENABLE RLS em cada tabela (auto-detectada via pg_tables).
--   2. NÃO criamos nenhuma policy. Isso é proposital:
--      - Prisma usa conexão direta como owner das tabelas e
--        bypassa RLS automaticamente (não afetado).
--      - PostgREST (API REST do Supabase) usa os roles `anon`
--        e `authenticated`, que NÃO são owners. Sem policy, eles
--        ficam SEM acesso a nenhuma linha (que é o desejado, pois
--        o app não usa PostgREST para queries de tabela).
--      - Storage continua funcionando (usa service_role com bypass).
--
-- Idempotente: pode ser rodado várias vezes sem erro.
-- Aplicar via:  npx prisma db execute --file <este arquivo> --schema prisma/schema.prisma
-- ============================================================

DO $$
DECLARE
  r record;
  count_total int := 0;
BEGIN
  FOR r IN
    SELECT schemaname, tablename
    FROM pg_tables
    WHERE schemaname = 'public'
      AND tablename NOT LIKE '_prisma%'        -- ignora tabelas internas do Prisma
      AND tablename <> 'schema_migrations'     -- (se houver)
  LOOP
    EXECUTE format('ALTER TABLE %I.%I ENABLE ROW LEVEL SECURITY', r.schemaname, r.tablename);
    count_total := count_total + 1;
    RAISE NOTICE 'RLS habilitada: %.%', r.schemaname, r.tablename;
  END LOOP;
  RAISE NOTICE 'Total de tabelas protegidas: %', count_total;
END $$;

-- Verificação final: lista todas as tabelas e o status de RLS.
-- Após rodar, espere ver rowsecurity = true em TODAS as linhas.
SELECT
  schemaname,
  tablename,
  rowsecurity AS rls_enabled
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY tablename;

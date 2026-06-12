-- ============================================================
-- 20260612_limpeza_dados_teste.sql  (v2 — inclui empresas)
-- LIMPEZA TOTAL (pedido do Kênio em 12/jun/2026):
-- apaga testes, avaliações, candidatos, equipes, NR-1,
-- diagnósticos PME e TODAS as empresas cadastradas,
-- EXCETO a conta admin do Kênio (kenio.araujo@live.com),
-- que mantém login, assinatura e créditos.
-- ⚠ IRREVERSÍVEL. Pode rodar mais de uma vez sem erro:
--   npx prisma db execute --file prisma/migrations/20260612_limpeza_dados_teste.sql --schema prisma/schema.prisma
-- ============================================================

BEGIN;

-- ── 1. Dados de uso (todas as empresas, inclusive a admin) ──

-- Avaliação de Liderança
DELETE FROM "LiderResposta";
DELETE FROM "LiderConvite";

-- Gestão de Equipes
DELETE FROM "TalentCheckIn";
DELETE FROM "TalentPDI";
DELETE FROM "TalentMember";
DELETE FROM "TalentTeam";

-- NR-1 Psicossocial
DELETE FROM "NR1Relatorio";
DELETE FROM "NR1Resposta";
DELETE FROM "NR1Convite";
DELETE FROM "NR1Coleta";
DELETE FROM "NR1Setor";

-- Diagnóstico PME (lead gen)
DELETE FROM "PmeDiagnostico";

-- Devolutivas e relatórios
DELETE FROM "EmployeeIntegratedReport";
DELETE FROM "BundleReport";
DELETE FROM "ReportUnlock";
DELETE FROM "ScheduledOutreach";

-- Testes e respostas
DELETE FROM "Report";
DELETE FROM "Result";
DELETE FROM "DiscAnswer";
DELETE FROM "MbtiAnswer";
DELETE FROM "EnneagramAnswer";
DELETE FROM "TemperamentAnswer";
DELETE FROM "Assessment";

-- Candidatos
DELETE FROM "Employee";

-- ── 2. Empresas (todas, exceto a conta admin do Kênio) ──

-- Financeiro/assinatura das empresas que serão removidas
DELETE FROM "BonusGrant"
 WHERE "creditBalanceId" IN (
   SELECT cb."id" FROM "CreditBalance" cb
   JOIN "Company" c ON c."id" = cb."companyId"
   WHERE c."email" <> 'kenio.araujo@live.com');
DELETE FROM "CreditTransaction"
 WHERE "companyId" IN (SELECT "id" FROM "Company" WHERE "email" <> 'kenio.araujo@live.com');
DELETE FROM "CreditPurchase"
 WHERE "companyId" IN (SELECT "id" FROM "Company" WHERE "email" <> 'kenio.araujo@live.com');
DELETE FROM "CreditBalance"
 WHERE "companyId" IN (SELECT "id" FROM "Company" WHERE "email" <> 'kenio.araujo@live.com');
DELETE FROM "Subscription"
 WHERE "companyId" IN (SELECT "id" FROM "Company" WHERE "email" <> 'kenio.araujo@live.com');
DELETE FROM "ProfileValidationCode"
 WHERE "companyId" IN (SELECT "id" FROM "Company" WHERE "email" <> 'kenio.araujo@live.com');
DELETE FROM "PasswordResetToken"
 WHERE "companyId" IN (SELECT "id" FROM "Company" WHERE "email" <> 'kenio.araujo@live.com');

-- As empresas em si
DELETE FROM "Company" WHERE "email" <> 'kenio.araujo@live.com';

COMMIT;

-- Conferência: deve sobrar apenas 1 empresa (a sua) e zero em todo o resto
SELECT 'Company' AS tabela, COUNT(*) FROM "Company"
UNION ALL SELECT 'Assessment', COUNT(*) FROM "Assessment"
UNION ALL SELECT 'Employee', COUNT(*) FROM "Employee"
UNION ALL SELECT 'TalentTeam', COUNT(*) FROM "TalentTeam"
UNION ALL SELECT 'LiderResposta', COUNT(*) FROM "LiderResposta"
UNION ALL SELECT 'NR1Coleta', COUNT(*) FROM "NR1Coleta"
UNION ALL SELECT 'PmeDiagnostico', COUNT(*) FROM "PmeDiagnostico";

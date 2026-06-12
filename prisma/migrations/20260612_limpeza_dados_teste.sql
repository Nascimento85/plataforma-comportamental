-- ============================================================
-- 20260612_limpeza_dados_teste.sql
-- LIMPEZA GERAL (pedido do Kênio em 12/jun/2026):
-- apaga testes, avaliações, candidatos, equipes, NR-1 e
-- diagnósticos PME de TODAS as empresas.
-- PRESERVA: contas (Company), assinaturas, créditos, senhas.
-- ⚠ IRREVERSÍVEL. Rodar uma única vez:
--   npx prisma db execute --file prisma/migrations/20260612_limpeza_dados_teste.sql --schema prisma/schema.prisma
-- ============================================================

BEGIN;

-- Avaliação de Liderança
DELETE FROM "LiderResposta";
DELETE FROM "LiderConvite";

-- Gestão de Equipes (cascateia membros, PDIs e check-ins)
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

-- Testes e respostas (filhos de Assessment sem cascade primeiro)
DELETE FROM "Report";
DELETE FROM "Result";
DELETE FROM "DiscAnswer";
DELETE FROM "MbtiAnswer";
DELETE FROM "EnneagramAnswer";
DELETE FROM "TemperamentAnswer";
DELETE FROM "Assessment";

-- Candidatos
DELETE FROM "Employee";

COMMIT;

-- Conferência (deve retornar tudo zerado)
SELECT 'Assessment' AS tabela, COUNT(*) FROM "Assessment"
UNION ALL SELECT 'Employee', COUNT(*) FROM "Employee"
UNION ALL SELECT 'TalentTeam', COUNT(*) FROM "TalentTeam"
UNION ALL SELECT 'LiderResposta', COUNT(*) FROM "LiderResposta"
UNION ALL SELECT 'NR1Coleta', COUNT(*) FROM "NR1Coleta"
UNION ALL SELECT 'PmeDiagnostico', COUNT(*) FROM "PmeDiagnostico";

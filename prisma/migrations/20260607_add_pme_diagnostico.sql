-- ============================================================
-- 20260607_add_pme_diagnostico.sql
-- ============================================================
-- Diagnostico de Lideranca PME (lead gen publico).
-- Fluxo em cascata Dono -> Lider com cruzamento de respostas.
--
-- Idempotente. Aplicar via:
--   npx prisma db execute --file <este> --schema prisma/schema.prisma
-- ============================================================

CREATE TABLE IF NOT EXISTS "PmeDiagnostico" (
  "id"               TEXT NOT NULL PRIMARY KEY,
  "donoNome"         TEXT NOT NULL,
  "donoEmail"        TEXT NOT NULL,
  "donoTelefone"     TEXT,
  "empresa"          TEXT NOT NULL,
  "funcionarios"     TEXT,
  "temLideres"       BOOLEAN NOT NULL DEFAULT false,
  "respostasDono"    TEXT NOT NULL,
  "respostasLider"   TEXT,
  "tokenLider"       TEXT NOT NULL UNIQUE,
  "liderNome"        TEXT,
  "liderEmail"       TEXT,
  "scoreMaturidade"  INTEGER,
  "cenario"          TEXT,
  "relatorioAi"      TEXT,
  "status"           TEXT NOT NULL DEFAULT 'DONO_RESPONDEU',
  "liderRespondeuEm" TIMESTAMP(3),
  "createdAt"        TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt"        TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS "PmeDiagnostico_status_idx"    ON "PmeDiagnostico"("status");
CREATE INDEX IF NOT EXISTS "PmeDiagnostico_donoEmail_idx" ON "PmeDiagnostico"("donoEmail");

ALTER TABLE "PmeDiagnostico" ENABLE ROW LEVEL SECURITY;

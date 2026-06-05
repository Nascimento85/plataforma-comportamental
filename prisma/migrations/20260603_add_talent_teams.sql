-- ============================================================
-- 20260603_add_talent_teams.sql
-- ============================================================
-- Fundacao do modulo Gestao de Times (20-70-10 + Team Build).
--   TalentTeam   : agrupamento de membros criado pelo gestor
--   TalentMember : pessoa do time (vinculada a Employee ou avulsa)
--   TalentPDI    : plano de desenvolvimento individual (esteira)
--   TalentCheckIn: acompanhamento na timeline
--
-- Idempotente: pode ser rodado varias vezes.
-- Aplicar via: npx prisma db execute --file <este> --schema prisma/schema.prisma
-- ============================================================

CREATE TABLE IF NOT EXISTS "TalentTeam" (
  "id"          TEXT NOT NULL PRIMARY KEY,
  "companyId"   TEXT NOT NULL,
  "nome"        TEXT NOT NULL,
  "descricao"   TEXT,
  "faseTuckman" TEXT,
  "createdAt"   TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt"   TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "TalentTeam_companyId_fkey"
    FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS "TalentTeam_companyId_idx" ON "TalentTeam"("companyId");

CREATE TABLE IF NOT EXISTS "TalentMember" (
  "id"                TEXT NOT NULL PRIMARY KEY,
  "teamId"            TEXT NOT NULL,
  "companyId"         TEXT NOT NULL,
  "employeeId"        TEXT,
  "nome"              TEXT NOT NULL,
  "cargo"             TEXT,
  "perfilDisc"        TEXT,
  "notaPerformance"   DOUBLE PRECISION,
  "fitComportamental" DOUBLE PRECISION,
  "zona"              TEXT,
  "zonaManual"        BOOLEAN NOT NULL DEFAULT false,
  "createdAt"         TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt"         TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "TalentMember_teamId_fkey"
    FOREIGN KEY ("teamId") REFERENCES "TalentTeam"("id") ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS "TalentMember_teamId_idx"     ON "TalentMember"("teamId");
CREATE INDEX IF NOT EXISTS "TalentMember_companyId_idx"  ON "TalentMember"("companyId");
CREATE INDEX IF NOT EXISTS "TalentMember_employeeId_idx" ON "TalentMember"("employeeId");

CREATE TABLE IF NOT EXISTS "TalentPDI" (
  "id"               TEXT NOT NULL PRIMARY KEY,
  "memberId"         TEXT NOT NULL,
  "companyId"        TEXT NOT NULL,
  "sciSituacao"      TEXT,
  "sciComportamento" TEXT,
  "sciImpacto"       TEXT,
  "acoes"            TEXT,
  "prazo"            TIMESTAMP(3),
  "frequencia"       TEXT,
  "status"           TEXT NOT NULL DEFAULT 'ATIVO',
  "createdAt"        TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt"        TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "TalentPDI_memberId_fkey"
    FOREIGN KEY ("memberId") REFERENCES "TalentMember"("id") ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS "TalentPDI_memberId_idx"  ON "TalentPDI"("memberId");
CREATE INDEX IF NOT EXISTS "TalentPDI_companyId_idx" ON "TalentPDI"("companyId");
CREATE INDEX IF NOT EXISTS "TalentPDI_status_idx"    ON "TalentPDI"("status");

CREATE TABLE IF NOT EXISTS "TalentCheckIn" (
  "id"         TEXT NOT NULL PRIMARY KEY,
  "pdiId"      TEXT NOT NULL,
  "companyId"  TEXT NOT NULL,
  "nota"       TEXT NOT NULL,
  "statusMeta" TEXT NOT NULL DEFAULT 'EM_ANDAMENTO',
  "tendencia"  TEXT,
  "createdAt"  TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "TalentCheckIn_pdiId_fkey"
    FOREIGN KEY ("pdiId") REFERENCES "TalentPDI"("id") ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS "TalentCheckIn_pdiId_idx"     ON "TalentCheckIn"("pdiId");
CREATE INDEX IF NOT EXISTS "TalentCheckIn_companyId_idx" ON "TalentCheckIn"("companyId");

-- Habilita RLS nas novas tabelas (Supabase Advisor)
ALTER TABLE "TalentTeam"    ENABLE ROW LEVEL SECURITY;
ALTER TABLE "TalentMember"  ENABLE ROW LEVEL SECURITY;
ALTER TABLE "TalentPDI"     ENABLE ROW LEVEL SECURITY;
ALTER TABLE "TalentCheckIn" ENABLE ROW LEVEL SECURITY;

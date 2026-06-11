-- ============================================================
-- 20260611_add_avaliacao_lider.sql
-- ============================================================
-- Avaliacao de Lideranca (ascendente, anonima) integrada a
-- Gestao de Times. Padrao de anonimato do NR-1: Tabela A
-- (LiderConvite, identidade para controle) e Tabela B
-- (LiderResposta, sem FK de identidade).
--
-- Idempotente: pode ser rodado varias vezes.
-- Aplicar via: npx prisma db execute --file prisma/migrations/20260611_add_avaliacao_lider.sql --schema prisma/schema.prisma
-- Depois rodar o script de RLS:
--   npx prisma db execute --file prisma/migrations/20260526_enable_rls_all_tables.sql --schema prisma/schema.prisma
-- ============================================================

ALTER TABLE "TalentTeam"   ADD COLUMN IF NOT EXISTS "liderNome"  TEXT;
ALTER TABLE "TalentTeam"   ADD COLUMN IF NOT EXISTS "liderEmail" TEXT;
ALTER TABLE "TalentMember" ADD COLUMN IF NOT EXISTS "email"      TEXT;

CREATE TABLE IF NOT EXISTS "LiderConvite" (
  "id"          TEXT NOT NULL,
  "teamId"      TEXT NOT NULL,
  "companyId"   TEXT NOT NULL,
  "nome"        TEXT NOT NULL,
  "email"       TEXT NOT NULL,
  "token"       TEXT NOT NULL,
  "status"      TEXT NOT NULL DEFAULT 'PENDING',
  "completedAt" TIMESTAMP(3),
  "createdAt"   TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "LiderConvite_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "LiderConvite_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "TalentTeam"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "LiderConvite_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE UNIQUE INDEX IF NOT EXISTS "LiderConvite_token_key" ON "LiderConvite"("token");
CREATE UNIQUE INDEX IF NOT EXISTS "LiderConvite_teamId_email_key" ON "LiderConvite"("teamId", "email");
CREATE INDEX IF NOT EXISTS "LiderConvite_teamId_idx" ON "LiderConvite"("teamId");
CREATE INDEX IF NOT EXISTS "LiderConvite_companyId_idx" ON "LiderConvite"("companyId");
CREATE INDEX IF NOT EXISTS "LiderConvite_status_idx" ON "LiderConvite"("status");

CREATE TABLE IF NOT EXISTS "LiderResposta" (
  "id"        TEXT NOT NULL,
  "teamId"    TEXT NOT NULL,
  "companyId" TEXT NOT NULL,
  "respostas" TEXT NOT NULL,
  "scores"    TEXT NOT NULL,
  "sciTexto"  TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "LiderResposta_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "LiderResposta_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "TalentTeam"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "LiderResposta_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX IF NOT EXISTS "LiderResposta_teamId_idx" ON "LiderResposta"("teamId");
CREATE INDEX IF NOT EXISTS "LiderResposta_companyId_idx" ON "LiderResposta"("companyId");

-- RLS imediato (mesmo padrao do script geral: RLS sem policy, app usa service role via Prisma)
ALTER TABLE "LiderConvite"  ENABLE ROW LEVEL SECURITY;
ALTER TABLE "LiderResposta" ENABLE ROW LEVEL SECURITY;

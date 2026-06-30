-- ============================================================
-- 20260630_add_avaliacao_360.sql
-- ============================================================
-- Avaliacao 360 graus (multiavaliador) integrada a Gestao de Times.
-- Uma pessoa (avaliado) e avaliada por si (AUTO), GESTOR, PARES e
-- SUBORDINADOS. Mesmo anonimato do NR-1/Lider: convite com identidade
-- (controle) e resposta ligada apenas ao ciclo + papel (sem FK de
-- identidade). Pares/subordinados aparecem so agregados.
--
-- Idempotente: pode ser rodado varias vezes.
-- Aplicar via:
--   npx prisma db execute --file prisma/migrations/20260630_add_avaliacao_360.sql --schema prisma/schema.prisma
-- ============================================================

-- ---- Ciclo (uma pessoa avaliada) ----
CREATE TABLE IF NOT EXISTS "Avaliacao360" (
  "id"            TEXT NOT NULL,
  "companyId"     TEXT NOT NULL,
  "teamId"        TEXT,
  "avaliadoNome"  TEXT NOT NULL,
  "avaliadoEmail" TEXT,
  "titulo"        TEXT,
  "status"        TEXT NOT NULL DEFAULT 'ACTIVE',
  "expiresAt"     TIMESTAMP(3) NOT NULL,
  "createdAt"     TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Avaliacao360_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "Avaliacao360_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "Avaliacao360_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "TalentTeam"("id") ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE INDEX IF NOT EXISTS "Avaliacao360_companyId_idx" ON "Avaliacao360"("companyId");
CREATE INDEX IF NOT EXISTS "Avaliacao360_teamId_idx" ON "Avaliacao360"("teamId");

-- ---- Convite com identidade + papel ----
CREATE TABLE IF NOT EXISTS "Avaliacao360Convite" (
  "id"          TEXT NOT NULL,
  "avaliacaoId" TEXT NOT NULL,
  "companyId"   TEXT NOT NULL,
  "role"        TEXT NOT NULL,
  "nome"        TEXT NOT NULL,
  "email"       TEXT NOT NULL,
  "token"       TEXT NOT NULL,
  "status"      TEXT NOT NULL DEFAULT 'PENDING',
  "completedAt" TIMESTAMP(3),
  "createdAt"   TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Avaliacao360Convite_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "Avaliacao360Convite_avaliacaoId_fkey" FOREIGN KEY ("avaliacaoId") REFERENCES "Avaliacao360"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE UNIQUE INDEX IF NOT EXISTS "Avaliacao360Convite_token_key" ON "Avaliacao360Convite"("token");
CREATE INDEX IF NOT EXISTS "Avaliacao360Convite_avaliacaoId_idx" ON "Avaliacao360Convite"("avaliacaoId");
CREATE INDEX IF NOT EXISTS "Avaliacao360Convite_companyId_idx" ON "Avaliacao360Convite"("companyId");
CREATE INDEX IF NOT EXISTS "Avaliacao360Convite_status_idx" ON "Avaliacao360Convite"("status");

-- ---- Resposta ANONIMA (sem FK de convite) ----
CREATE TABLE IF NOT EXISTS "Avaliacao360Resposta" (
  "id"             TEXT NOT NULL,
  "avaliacaoId"    TEXT NOT NULL,
  "companyId"      TEXT NOT NULL,
  "role"           TEXT NOT NULL,
  "respostas"      TEXT NOT NULL,
  "scores"         TEXT NOT NULL,
  "continuarTexto" TEXT,
  "melhorarTexto"  TEXT,
  "deviceHash"     TEXT,
  "createdAt"      TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Avaliacao360Resposta_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "Avaliacao360Resposta_avaliacaoId_fkey" FOREIGN KEY ("avaliacaoId") REFERENCES "Avaliacao360"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX IF NOT EXISTS "Avaliacao360Resposta_avaliacaoId_idx" ON "Avaliacao360Resposta"("avaliacaoId");
CREATE INDEX IF NOT EXISTS "Avaliacao360Resposta_companyId_idx" ON "Avaliacao360Resposta"("companyId");
CREATE INDEX IF NOT EXISTS "Avaliacao360Resposta_role_idx" ON "Avaliacao360Resposta"("role");

-- RLS imediato (mesmo padrao: RLS sem policy, app usa service role via Prisma)
ALTER TABLE "Avaliacao360"         ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Avaliacao360Convite"  ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Avaliacao360Resposta" ENABLE ROW LEVEL SECURITY;

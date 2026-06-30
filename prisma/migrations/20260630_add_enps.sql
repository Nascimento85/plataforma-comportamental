-- ============================================================
-- 20260630_add_enps.sql
-- ============================================================
-- eNPS (Employee Net Promoter Score): pesquisa de clima anônima.
-- Coleta + convite (controle de identidade) + resposta anônima
-- (nota 0-10, categoria, tempo de casa, motivo). Sem FK de
-- identidade na resposta — mesmo padrão NR-1/Lider/360.
--
-- Idempotente. Aplicar via:
--   npx prisma db execute --file prisma/migrations/20260630_add_enps.sql --schema prisma/schema.prisma
-- ============================================================

CREATE TABLE IF NOT EXISTS "EnpsColeta" (
  "id"        TEXT NOT NULL,
  "companyId" TEXT NOT NULL,
  "titulo"    TEXT,
  "status"    TEXT NOT NULL DEFAULT 'ACTIVE',
  "expiresAt" TIMESTAMP(3) NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "EnpsColeta_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "EnpsColeta_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE INDEX IF NOT EXISTS "EnpsColeta_companyId_idx" ON "EnpsColeta"("companyId");

CREATE TABLE IF NOT EXISTS "EnpsConvite" (
  "id"          TEXT NOT NULL,
  "coletaId"    TEXT NOT NULL,
  "companyId"   TEXT NOT NULL,
  "nome"        TEXT NOT NULL,
  "email"       TEXT NOT NULL,
  "token"       TEXT NOT NULL,
  "status"      TEXT NOT NULL DEFAULT 'PENDING',
  "completedAt" TIMESTAMP(3),
  "createdAt"   TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "EnpsConvite_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "EnpsConvite_coletaId_fkey" FOREIGN KEY ("coletaId") REFERENCES "EnpsColeta"("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE UNIQUE INDEX IF NOT EXISTS "EnpsConvite_token_key" ON "EnpsConvite"("token");
CREATE INDEX IF NOT EXISTS "EnpsConvite_coletaId_idx" ON "EnpsConvite"("coletaId");
CREATE INDEX IF NOT EXISTS "EnpsConvite_companyId_idx" ON "EnpsConvite"("companyId");
CREATE INDEX IF NOT EXISTS "EnpsConvite_status_idx" ON "EnpsConvite"("status");

CREATE TABLE IF NOT EXISTS "EnpsResposta" (
  "id"         TEXT NOT NULL,
  "coletaId"   TEXT NOT NULL,
  "companyId"  TEXT NOT NULL,
  "nota"       INTEGER NOT NULL,
  "categoria"  TEXT NOT NULL,
  "tempoCasa"  TEXT,
  "motivo"     TEXT,
  "deviceHash" TEXT,
  "createdAt"  TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "EnpsResposta_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "EnpsResposta_coletaId_fkey" FOREIGN KEY ("coletaId") REFERENCES "EnpsColeta"("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE INDEX IF NOT EXISTS "EnpsResposta_coletaId_idx" ON "EnpsResposta"("coletaId");
CREATE INDEX IF NOT EXISTS "EnpsResposta_companyId_idx" ON "EnpsResposta"("companyId");

-- RLS imediato (RLS sem policy, app usa service role via Prisma)
ALTER TABLE "EnpsColeta"   ENABLE ROW LEVEL SECURITY;
ALTER TABLE "EnpsConvite"  ENABLE ROW LEVEL SECURITY;
ALTER TABLE "EnpsResposta" ENABLE ROW LEVEL SECURITY;

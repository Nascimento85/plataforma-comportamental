-- ============================================================
-- Migration: Frente C - Compliance NR-1 (Diagnostico Psicossocial)
-- Data: 2026-05-16
-- Adiciona 5 tabelas para o modulo de avaliacao de riscos psicossociais
-- conforme NR-1 + NR-17, com anonimato blindado (LGPD/CFP).
--
-- Como aplicar:
--   1) Local: prisma db push em schema.dev.prisma
--   2) Producao: npx prisma db execute --file prisma/migrations/20260516_add_nr1_compliance.sql --schema prisma/schema.prisma
-- ============================================================

-- ---- NR1Setor (GHE - Grupo Homogeneo de Exposicao) ----
CREATE TABLE IF NOT EXISTS "NR1Setor" (
  "id"                  TEXT NOT NULL,
  "companyId"           TEXT NOT NULL,
  "nome"                TEXT NOT NULL,
  "perfilDiscDominante" TEXT,
  "createdAt"           TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt"           TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "NR1Setor_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "NR1Setor_companyId_fkey"
    FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE UNIQUE INDEX IF NOT EXISTS "NR1Setor_companyId_nome_key" ON "NR1Setor"("companyId", "nome");
CREATE INDEX IF NOT EXISTS "NR1Setor_companyId_idx" ON "NR1Setor"("companyId");

-- ---- NR1Coleta (Campanha de avaliacao) ----
CREATE TABLE IF NOT EXISTS "NR1Coleta" (
  "id"        TEXT NOT NULL,
  "companyId" TEXT NOT NULL,
  "nome"      TEXT NOT NULL,
  "status"    TEXT NOT NULL DEFAULT 'ACTIVE',
  "expiresAt" TIMESTAMP(3) NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "NR1Coleta_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "NR1Coleta_companyId_fkey"
    FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE INDEX IF NOT EXISTS "NR1Coleta_companyId_idx" ON "NR1Coleta"("companyId");
CREATE INDEX IF NOT EXISTS "NR1Coleta_status_idx" ON "NR1Coleta"("status");

-- ---- NR1Convite (Tabela A - identidade) ----
CREATE TABLE IF NOT EXISTS "NR1Convite" (
  "id"          TEXT NOT NULL,
  "coletaId"    TEXT NOT NULL,
  "setorId"     TEXT NOT NULL,
  "companyId"   TEXT NOT NULL,
  "nome"        TEXT NOT NULL,
  "email"       TEXT NOT NULL,
  "token"       TEXT NOT NULL,
  "status"      TEXT NOT NULL DEFAULT 'PENDING',
  "completedAt" TIMESTAMP(3),
  "createdAt"   TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "NR1Convite_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "NR1Convite_coletaId_fkey"
    FOREIGN KEY ("coletaId") REFERENCES "NR1Coleta"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "NR1Convite_setorId_fkey"
    FOREIGN KEY ("setorId") REFERENCES "NR1Setor"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "NR1Convite_companyId_fkey"
    FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE UNIQUE INDEX IF NOT EXISTS "NR1Convite_token_key" ON "NR1Convite"("token");
CREATE INDEX IF NOT EXISTS "NR1Convite_coletaId_idx" ON "NR1Convite"("coletaId");
CREATE INDEX IF NOT EXISTS "NR1Convite_setorId_idx" ON "NR1Convite"("setorId");
CREATE INDEX IF NOT EXISTS "NR1Convite_companyId_idx" ON "NR1Convite"("companyId");
CREATE INDEX IF NOT EXISTS "NR1Convite_status_idx" ON "NR1Convite"("status");

-- ---- NR1Resposta (Tabela B - dados ANONIMOS) ----
-- IMPORTANTE: SEM FK para Employee/User/NR1Convite. Vinculo apenas via setorId.
CREATE TABLE IF NOT EXISTS "NR1Resposta" (
  "id"          TEXT NOT NULL,
  "coletaId"    TEXT NOT NULL,
  "setorId"     TEXT NOT NULL,
  "companyId"   TEXT NOT NULL,
  "instrumento" TEXT NOT NULL,  -- KARASEK | ERI | COPSOQ
  "respostas"   TEXT NOT NULL,  -- JSON
  "scores"      TEXT NOT NULL,  -- JSON
  "createdAt"   TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "NR1Resposta_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "NR1Resposta_coletaId_fkey"
    FOREIGN KEY ("coletaId") REFERENCES "NR1Coleta"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "NR1Resposta_setorId_fkey"
    FOREIGN KEY ("setorId") REFERENCES "NR1Setor"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "NR1Resposta_companyId_fkey"
    FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE INDEX IF NOT EXISTS "NR1Resposta_coletaId_idx" ON "NR1Resposta"("coletaId");
CREATE INDEX IF NOT EXISTS "NR1Resposta_setorId_idx" ON "NR1Resposta"("setorId");
CREATE INDEX IF NOT EXISTS "NR1Resposta_companyId_idx" ON "NR1Resposta"("companyId");
CREATE INDEX IF NOT EXISTS "NR1Resposta_instrumento_idx" ON "NR1Resposta"("instrumento");

-- ---- NR1Relatorio ----
CREATE TABLE IF NOT EXISTS "NR1Relatorio" (
  "id"          TEXT NOT NULL,
  "coletaId"    TEXT NOT NULL,
  "companyId"   TEXT NOT NULL,
  "status"      TEXT NOT NULL DEFAULT 'PENDING',
  "content"     TEXT,
  "pdfUrl"      TEXT,
  "generatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt"   TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "NR1Relatorio_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "NR1Relatorio_coletaId_fkey"
    FOREIGN KEY ("coletaId") REFERENCES "NR1Coleta"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "NR1Relatorio_companyId_fkey"
    FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE UNIQUE INDEX IF NOT EXISTS "NR1Relatorio_coletaId_key" ON "NR1Relatorio"("coletaId");
CREATE INDEX IF NOT EXISTS "NR1Relatorio_companyId_idx" ON "NR1Relatorio"("companyId");
CREATE INDEX IF NOT EXISTS "NR1Relatorio_status_idx" ON "NR1Relatorio"("status");

-- ============================================================
-- Migration: Hierarquia de equipes (organograma)
-- Adiciona TalentTeam.parentTeamId (auto-relação) para montar a
-- árvore Diretoria → Gerências → Setores.
-- Idempotente: pode rodar mais de uma vez sem erro.
-- Execute no Supabase SQL Editor ou via Railway deploy.
-- ============================================================

-- 1. Coluna parentTeamId (nullable: null = topo da árvore)
ALTER TABLE "TalentTeam"
  ADD COLUMN IF NOT EXISTS "parentTeamId" TEXT;

-- 2. Foreign key auto-referencial. ON DELETE SET NULL para que,
--    ao excluir uma equipe-pai, os filhos virem topo em vez de sumir.
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE constraint_name = 'TalentTeam_parentTeamId_fkey'
      AND table_name = 'TalentTeam'
  ) THEN
    ALTER TABLE "TalentTeam"
      ADD CONSTRAINT "TalentTeam_parentTeamId_fkey"
      FOREIGN KEY ("parentTeamId") REFERENCES "TalentTeam"("id")
      ON DELETE SET NULL ON UPDATE CASCADE;
  END IF;
END $$;

-- 3. Índice para buscar filhos rapidamente
CREATE INDEX IF NOT EXISTS "TalentTeam_parentTeamId_idx"
  ON "TalentTeam"("parentTeamId");

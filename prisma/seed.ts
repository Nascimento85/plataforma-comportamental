/**
 * ============================================================
 * Seed — Dados de Teste para Desenvolvimento Local
 * ============================================================
 * Executar: npm run seed
 * ou:       npx ts-node prisma/seed.ts
 *
 * Cria:
 *   - 2 empresas (admin@teste.com / senha: teste123)
 *   - 5 funcionários por empresa
 *   - Avaliações de cada tipo (DISC, MBTI, ENNEAGRAM, TEMPERAMENT)
 *   - Saldo de créditos
 *   - Tokens de teste prontos para acessar
 * ============================================================
 */

import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

// Tokens fixos para facilitar testes manuais
const TEST_TOKENS = {
  DISC:        'test-token-disc-0000-000000000001',
  MBTI:        'test-token-mbti-0000-000000000002',
  ENNEAGRAM:   'test-token-enng-0000-000000000003',
  TEMPERAMENT: 'test-token-temp-0000-000000000004',
}

async function main() {
  console.log('🌱 Iniciando seed...\n')

  // ── Limpa dados anteriores ─────────────────────────────
  // Ordem importa por causa de FKs:
  //  1) ScheduledOutreach -> Company
  //  2) ReportUnlock      -> Report + Company
  //  3) BonusGrant        -> CreditBalance + Company
  //  4) CreditTransaction -> Company
  //  5) CreditPurchase    -> Company
  //  6) CreditBalance     -> Company
  await prisma.scheduledOutreach.deleteMany().catch(() => {})
  await prisma.reportUnlock.deleteMany().catch(() => {})
  await prisma.bonusGrant.deleteMany().catch(() => {})
  await prisma.creditTransaction.deleteMany()
  await prisma.creditPurchase.deleteMany()
  await prisma.creditBalance.deleteMany()
  await prisma.report.deleteMany()
  await prisma.result.deleteMany()
  await prisma.discAnswer.deleteMany()
  await prisma.mbtiAnswer.deleteMany()
  await prisma.enneagramAnswer.deleteMany()
  await prisma.temperamentAnswer.deleteMany()
  await prisma.assessment.deleteMany()
  await prisma.employee.deleteMany()
  await prisma.company.deleteMany()
  console.log('  🗑️  Dados anteriores removidos')

  // ── Empresa 1 — Empresa principal de teste ─────────────
  const passwordHash = await bcrypt.hash('teste123', 10)

  const company1 = await prisma.company.create({
    data: {
      name: 'Acme Tecnologia Ltda',
      email: 'admin@teste.com',
      passwordHash,
    },
  })
  console.log(`  🏢 Empresa criada: ${company1.name} (${company1.email})`)

  // 🎟️ Passaporte de Autoconhecimento: 10 créditos / 7 dias (importado em runtime
  // para compatibilidade com schema dev/prod — usa transação tx)
  const { grantWelcomePassport } = await import('../src/lib/passport')
  await prisma.$transaction(async (tx) => {
    await grantWelcomePassport(tx, company1.id)
  })
  console.log(`  🎟️ Passaporte ativado: 10 créditos (válidos por 7 dias)`)

  // ── Funcionários ───────────────────────────────────────
  const employees = await Promise.all([
    prisma.employee.create({ data: { companyId: company1.id, name: 'Ana Silva',    email: 'ana@acme.com'    } }),
    prisma.employee.create({ data: { companyId: company1.id, name: 'Bruno Costa',  email: 'bruno@acme.com'  } }),
    prisma.employee.create({ data: { companyId: company1.id, name: 'Carla Mendes', email: 'carla@acme.com'  } }),
    prisma.employee.create({ data: { companyId: company1.id, name: 'Diego Ramos',  email: 'diego@acme.com'  } }),
    prisma.employee.create({ data: { companyId: company1.id, name: 'Eva Santos',   email: 'eva@acme.com'    } }),
  ])
  console.log(`  👥 ${employees.length} funcionários criados`)

  // ── Avaliações com tokens fixos ────────────────────────
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 dias

  const assessments = await Promise.all([
    prisma.assessment.create({
      data: {
        companyId: company1.id,
        employeeId: employees[0].id,
        testType: 'DISC',
        token: TEST_TOKENS.DISC,
        status: 'SENT',
        expiresAt,
      },
    }),
    prisma.assessment.create({
      data: {
        companyId: company1.id,
        employeeId: employees[1].id,
        testType: 'MBTI',
        token: TEST_TOKENS.MBTI,
        status: 'SENT',
        expiresAt,
      },
    }),
    prisma.assessment.create({
      data: {
        companyId: company1.id,
        employeeId: employees[2].id,
        testType: 'ENNEAGRAM',
        token: TEST_TOKENS.ENNEAGRAM,
        status: 'SENT',
        expiresAt,
      },
    }),
    prisma.assessment.create({
      data: {
        companyId: company1.id,
        employeeId: employees[3].id,
        testType: 'TEMPERAMENT',
        token: TEST_TOKENS.TEMPERAMENT,
        status: 'SENT',
        expiresAt,
      },
    }),
  ])
  console.log(`  📋 ${assessments.length} avaliações criadas`)

  // ── Empresa 2 — Empresa secundária ─────────────────────
  const company2 = await prisma.company.create({
    data: {
      name: 'Beta Consultoria',
      email: 'contato@beta.com',
      passwordHash: await bcrypt.hash('beta123', 10),
    },
  })
  // Empresa 2 também ganha Passaporte
  await prisma.$transaction(async (tx) => {
    await grantWelcomePassport(tx, company2.id)
  })
  console.log(`  🏢 Empresa 2: ${company2.name} (${company2.email}) — Passaporte ativado`)

  // ── Resumo final ───────────────────────────────────────
  console.log('\n' + '═'.repeat(52))
  console.log('✅ Seed concluído com sucesso!\n')
  console.log('📋 CREDENCIAIS DE ACESSO:')
  console.log('  Login:  admin@teste.com')
  console.log('  Senha:  teste123\n')
  console.log('🔗 LINKS DE TESTE (acesse no browser):')
  for (const [type, token] of Object.entries(TEST_TOKENS)) {
    console.log(`  ${type.padEnd(12)} → http://localhost:3000/test/${token}`)
  }
  console.log('\n💳 Saldo da empresa 1: 10 créditos')
  console.log('═'.repeat(52) + '\n')
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())

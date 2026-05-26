// ============================================================
// Seed da conta demo (idempotente).
// Cria/atualiza tudo necessario para um prospect explorar:
//   - Company "Demo · Empresa Teste" (login: demo@mapacomportamental.com)
//   - Subscription ACTIVE no plano PROFISSIONAL (manual, sem Stripe)
//   - 50 creditos no CreditBalance
//   - 6 funcionarios (4 com DISC concluido nos 4 perfis)
//   - 1 NR1Setor "Operacional"
//   - 1 NR1Coleta com 5 convites alinhados aos funcionarios
//   - 15 NR1Resposta (5 respondentes x 3 instrumentos) mockadas
//   - 1 NR1Relatorio com conteudo agregado + narrativa exemplo
// ============================================================

import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { gerarSubmissaoMockada } from '@/lib/nr1/seed'
import { calcKarasek } from '@/lib/nr1/engines/karasek'
import { calcERI } from '@/lib/nr1/engines/eri'
import { calcCOPSOQ } from '@/lib/nr1/engines/copsoq'
import { agregarPorSetor } from '@/lib/nr1/aggregate'
import { gerarRecomendacoes } from '@/lib/nr1/recommendations'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const prismaAny = prisma as any

export const DEMO_CREDENTIALS = {
  email:    'demo@mapacomportamental.com',
  password: 'Demo2026!',
  name:     'Demo · Empresa Teste',
}

const FUNCIONARIOS = [
  { name: 'Maria Silva',     email: 'maria.silva@empresa-demo.com',     disc: 'D' as const },
  { name: 'João Santos',     email: 'joao.santos@empresa-demo.com',     disc: 'I' as const },
  { name: 'Ana Costa',       email: 'ana.costa@empresa-demo.com',       disc: 'S' as const },
  { name: 'Pedro Oliveira',  email: 'pedro.oliveira@empresa-demo.com',  disc: 'C' as const },
  { name: 'Carla Lima',      email: 'carla.lima@empresa-demo.com',      disc: null  },
  { name: 'Bruno Alves',     email: 'bruno.alves@empresa-demo.com',     disc: null  },
] as const

const NARRATIVA_EXEMPLO = `## 1. Visão consultiva geral

O setor **Operacional** apresenta um perfil de risco psicossocial **moderado**, com sinais claros de tensão que merecem atenção da liderança. Os indicadores cruzados (Karasek, ERI, COPSOQ) revelam um time que está conseguindo entregar resultados, mas com **margem de queima** que pode escalar rapidamente caso nenhuma medida seja tomada.

## 2. O que os números estão dizendo

A equipe demonstra **demandas psicológicas elevadas** combinadas com **controle decisório limitado**. Isso, no modelo de Karasek, classifica parte do time no quadrante de **Alta Tensão**, posição associada a maior incidência de burnout e adoecimento ocupacional ao longo do tempo.

O modelo ERI (Esforço × Recompensa) sinaliza um **leve desequilíbrio**: parte do time percebe que entrega mais do que recebe em troca, seja em reconhecimento, plano de carreira ou autonomia. Esse padrão, quando não corrigido, é o gatilho mais frequente de pedidos de demissão silenciosos.

Já o COPSOQ traz uma boa notícia: as relações com a liderança direta e o sentimento de propósito estão **acima da média**, formando uma camada de proteção que segura o time.

## 3. Recomendações estratégicas

**Curto prazo (próximos 30 dias):**

- Implementar **rituais de reconhecimento estruturado** (semanal ou quinzenal) onde a liderança nomeia entregas específicas. Custo zero, impacto alto no ERI.
- Mapear quais decisões operacionais podem ser **delegadas** ao time sem perda de controle estratégico. Aumenta o eixo Controle no Karasek.

**Médio prazo (60 a 90 dias):**

- Revisar o **escopo de função** de cada cargo do setor. Verificar se a carga distribuída condiz com o nível de senioridade e a recompensa praticada.
- Estabelecer **canais formais de escuta** (1:1 mensal, pulse survey trimestral) para captar sinais de insatisfação antes que virem demissão.

## 4. O custo de não agir

Sem intervenção, a literatura indica que ambientes com este perfil de risco geram em média **15% a 25% de turnover** no setor em 12 meses, além de **aumento de 30% no absenteísmo** por questões de saúde mental. O custo direto, considerando rescisão, treinamento e perda de conhecimento tácito, fica entre **R$ 40 mil e R$ 80 mil por colaborador desligado**.

Mais do que custo: cada saída sinaliza para o restante do time que o ambiente não sustenta, acelerando o ciclo de erosão.

## 5. Próximos passos sugeridos

1. Apresentar este relatório à diretoria e ao RH na **próxima reunião de gestão**.
2. Eleger 1 ou 2 ações de curto prazo desta lista para implementar em 30 dias.
3. Reaplicar a coleta NR-1 daqui a **90 dias** para medir o impacto das ações.

> Este é um diagnóstico preliminar. Recomendamos triangular os dados com observações qualitativas (1:1, entrevistas de desligamento dos últimos 12 meses, feedback 360) para uma leitura ainda mais precisa.`

interface SeedResult {
  ok:           boolean
  companyId:    string
  credentials:  typeof DEMO_CREDENTIALS
  loginUrl:     string
  recreated:    boolean
}

/**
 * Roda o seed da conta demo. Idempotente: se a conta ja existe,
 * apaga TODOS os dados dela e recria do zero (fica sempre limpa).
 */
export async function seedDemoAccount(): Promise<SeedResult> {
  const passwordHash = await bcrypt.hash(DEMO_CREDENTIALS.password, 10)
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://mapacomportamental.com'

  // 1) Apaga dados anteriores (cascade resolve quase tudo)
  const existing = await prismaAny.company.findUnique({
    where: { email: DEMO_CREDENTIALS.email },
    select: { id: true },
  })
  const recreated = !!existing
  if (existing) {
    await prismaAny.company.delete({ where: { id: existing.id } })
  }

  // 2) Cria Company
  const company = await prismaAny.company.create({
    data: {
      email:        DEMO_CREDENTIALS.email,
      name:         DEMO_CREDENTIALS.name,
      passwordHash,
      type:         'PJ',
      companyName:  'Empresa Demonstração Ltda',
      jobTitle:     'Diretora de Pessoas',
      isAdmin:      false,
      active:       true,
      isOnboardingCredited:       true,
      isProfileCompletedRewarded: true,
    },
  })

  // 3) Subscription ACTIVE manual (sem Stripe)
  const now = new Date()
  const periodEnd = new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000)
  await prismaAny.subscription.create({
    data: {
      companyId:          company.id,
      plan:               'PROFISSIONAL',
      status:             'ACTIVE',
      source:             'MANUAL',
      currentPeriodStart: now,
      currentPeriodEnd:   periodEnd,
    },
  })

  // 4) CreditBalance (50 creditos para o prospect testar)
  await prismaAny.creditBalance.create({
    data: {
      companyId: company.id,
      amount:    50,
    },
  })

  // 5) Funcionarios + DISC concluido para 4 deles
  const employees: Array<{ id: string; email: string; disc: 'D' | 'I' | 'S' | 'C' | null }> = []
  for (const f of FUNCIONARIOS) {
    const emp = await prismaAny.employee.create({
      data: {
        companyId: company.id,
        name:      f.name,
        email:     f.email,
      },
    })
    employees.push({ id: emp.id, email: f.email, disc: f.disc })

    if (f.disc) {
      // Cria Assessment DISC COMPLETED + Result com primaryProfile
      const assessment = await prismaAny.assessment.create({
        data: {
          companyId:   company.id,
          employeeId:  emp.id,
          testType:    'DISC',
          token:       `demo-disc-${emp.id.slice(-10)}-${Math.random().toString(36).slice(2, 8)}`,
          status:      'COMPLETED',
          expiresAt:   periodEnd,
          completedAt: now,
        },
      })
      await prismaAny.result.create({
        data: {
          assessmentId:   assessment.id,
          testType:       'DISC',
          // resultData minimo (o auto-DISC do setor le primaryProfile direto)
          resultData:     { predominant: f.disc, demo: true },
          primaryProfile: f.disc,
        },
      })
    }
  }

  // 6) NR1Setor Operacional
  const setor = await prismaAny.nR1Setor.create({
    data: {
      companyId: company.id,
      nome:      'Operacional',
    },
  })

  // 7) NR1Coleta com 5 convites alinhados aos funcionarios
  const trintaDias = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000)
  const coleta = await prismaAny.nR1Coleta.create({
    data: {
      companyId: company.id,
      nome:      'Diagnóstico Q2 2026',
      expiresAt: trintaDias,
    },
  })

  // Pega os primeiros 5 funcionarios (todos os 4 com DISC + Carla)
  const convidados = employees.slice(0, 5)
  for (const c of convidados) {
    await prismaAny.nR1Convite.create({
      data: {
        coletaId:  coleta.id,
        setorId:   setor.id,
        companyId: company.id,
        nome:      FUNCIONARIOS.find(f => f.email === c.email)!.name,
        email:     c.email,
        token:     `demo-nr1-${c.email.split('@')[0]}-${Math.random().toString(36).slice(2, 8)}`,
        status:    'COMPLETED',
      },
    })
  }

  // 8) Respostas mockadas (5 respondentes x 3 instrumentos = 15 rows)
  const baseTs = now.getTime() - 7 * 24 * 60 * 60 * 1000  // 7 dias atras
  for (let i = 0; i < 5; i++) {
    const submissao = gerarSubmissaoMockada('MODERADO')
    const karasek = calcKarasek(submissao.karasek)
    const eri     = calcERI(submissao.eri)
    const copsoq  = calcCOPSOQ(submissao.copsoq)
    const ts = new Date(baseTs + i * 70_000)

    await prismaAny.nR1Resposta.createMany({
      data: [
        {
          coletaId: coleta.id, setorId: setor.id, companyId: company.id,
          instrumento: 'KARASEK',
          respostas:   JSON.stringify(submissao.karasek),
          scores:      JSON.stringify(karasek),
          createdAt:   ts,
        },
        {
          coletaId: coleta.id, setorId: setor.id, companyId: company.id,
          instrumento: 'ERI',
          respostas:   JSON.stringify(submissao.eri),
          scores:      JSON.stringify(eri),
          createdAt:   new Date(ts.getTime() + 100),
        },
        {
          coletaId: coleta.id, setorId: setor.id, companyId: company.id,
          instrumento: 'COPSOQ',
          respostas:   JSON.stringify(submissao.copsoq),
          scores:      JSON.stringify(copsoq),
          createdAt:   new Date(ts.getTime() + 200),
        },
      ],
    })
  }

  // 9) NR1Relatorio com agregado + narrativa exemplo
  // Reconstroi scores individuais para agregar
  const respostasAll = await prismaAny.nR1Resposta.findMany({
    where: { coletaId: coleta.id },
    orderBy: { createdAt: 'asc' },
  })
  const buckets = new Map<string, { setorId: string; k?: ReturnType<typeof calcKarasek>; e?: ReturnType<typeof calcERI>; c?: ReturnType<typeof calcCOPSOQ> }>()
  for (const r of respostasAll) {
    const slot = Math.floor(new Date(r.createdAt).getTime() / 60000)
    const key = `${r.setorId}:${slot}`
    const bucket = buckets.get(key) ?? { setorId: r.setorId }
    const parsed = JSON.parse(r.scores)
    if (r.instrumento === 'KARASEK') bucket.k = parsed
    else if (r.instrumento === 'ERI') bucket.e = parsed
    else if (r.instrumento === 'COPSOQ') bucket.c = parsed
    buckets.set(key, bucket)
  }
  const individuais = []
  for (const b of buckets.values()) {
    if (b.k && b.e && b.c) {
      individuais.push({ setorId: b.setorId, scores: { karasek: b.k, eri: b.e, copsoq: b.c } })
    }
  }

  const agregado = agregarPorSetor(
    [{ id: setor.id, nome: setor.nome, perfilDiscDominante: null }],
    individuais,
  )

  const setoresComExtras = agregado.map(s => ({
    ...s,
    recomendacoes: gerarRecomendacoes(s),
    narrativa:     NARRATIVA_EXEMPLO,
  }))

  const content = {
    geradoEm:                now.toISOString(),
    coletaId:                coleta.id,
    coletaNome:              coleta.nome,
    totalRespondentes:       individuais.length,
    setoresAvaliados:        agregado.length,
    minRespondentesPorSetor: 5,
    setores:                 setoresComExtras,
  }

  await prismaAny.nR1Relatorio.create({
    data: {
      coletaId:  coleta.id,
      companyId: company.id,
      status:    'COMPLETED',
      content:   JSON.stringify(content),
    },
  })

  return {
    ok:          true,
    companyId:   company.id,
    credentials: DEMO_CREDENTIALS,
    loginUrl:    `${appUrl}/login`,
    recreated,
  }
}

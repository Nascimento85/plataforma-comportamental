# 🔧 Patches — arquivos existentes que precisam mudar

> Estes são pequenos diffs para arquivos que **já existem** no projeto.
> Para arquivos novos, basta copiar a pasta `passaporte-pack/src/...` para `src/...`.

---

## 1) `src/components/ui/AppShell.tsx` (Sidebar)

**Linha ~238** — renomeia o link do menu lateral:

```diff
- <SidebarNavLink href="/dashboard/credits"      label="Créditos"            iconKey="credits"     onClick={onNavClick} />
+ <SidebarNavLink href="/dashboard/credits"      label="Passaporte"          iconKey="credits"     onClick={onNavClick} />
```

E em `src/components/ui/DashboardShell.tsx` (linha ~46):

```diff
- <NavLink href="/dashboard/credits" label="Créditos" icon="💳" onClick={onNavClick} />
+ <NavLink href="/dashboard/credits" label="Passaporte" icon="🎟️" onClick={onNavClick} />
```

---

## 2) `src/app/dashboard/credits/page.tsx`

```diff
- export const metadata: Metadata = { title: 'Créditos' }
+ export const metadata: Metadata = { title: 'Passaporte de Autoconhecimento' }

- <h1 className="font-serif font-semibold text-3xl text-soul-ink">Créditos</h1>
- <p className="text-sm text-soul-ink/45 mt-1 font-sans">
-   Cada crédito gera um relatório comportamental completo
- </p>
+ <h1 className="font-serif font-semibold text-3xl text-soul-ink">
+   Passaporte de Autoconhecimento
+ </h1>
+ <p className="text-sm text-soul-ink/45 mt-1 font-sans">
+   Seu passe de acesso aos testes. Bônus expiram em 7 dias — créditos pagos não.
+ </p>
```

E para mostrar o estado do passaporte no topo (substituindo o cálculo manual de `creditBalance.balance`):

```diff
- import { prisma } from '@/lib/prisma'
+ import { getPassportState } from '@/lib/passport'
+ import PassportWidget from '@/components/passport/PassportWidget'

- const [creditBalance, transactions] = await Promise.all([
-   prisma.creditBalance.findUnique({ where: { companyId } }),
+ const [passport, transactions] = await Promise.all([
+   getPassportState(companyId),
    prisma.creditTransaction.findMany({
      where: { companyId },
      orderBy: { createdAt: 'desc' },
      take: 10,
    }),
  ])
- const credits = creditBalance?.balance ?? 0
+ const credits = passport.total
```

E no JSX, substitua o "Balance hero" antigo por:

```tsx
<PassportWidget state={passport} />
```

---

## 3) `src/app/dashboard/_components/CreditsWidget.tsx`

Renomeie/substitua pelo novo `PassportWidget` (em `src/components/passport/PassportWidget.tsx`).

Em `src/app/dashboard/page.tsx` (~linha 161):

```diff
- import CreditsWidget from './_components/CreditsWidget'
+ import PassportWidget from '@/components/passport/PassportWidget'
+ import { getPassportState } from '@/lib/passport'

- // ...
- <CreditsWidget credits={credits} />
+ const passport = await getPassportState(companyId)
+ <PassportWidget state={passport} />
```

---

## 4) `src/app/dashboard/_components/WelcomeModal.tsx`

Linha ~97 (texto "Créditos ganhos"):

```diff
- <h3>10 Créditos Gratuitos</h3>
- <p>Você ganhou 10 créditos para testar a plataforma!</p>
+ <h3>🎟️ Passaporte de Autoconhecimento ativado</h3>
+ <p>
+   Você ganhou <strong>10 créditos</strong> válidos por <strong>7 dias</strong> para
+   começar sua jornada. Use-os antes que expirem!
+ </p>
```

---

## 5) `src/app/api/auth/register/route.ts`

**Substituir inteiro** pelo arquivo de `passaporte-pack/src/app/api/auth/register/route.ts`.

A diferença essencial:

```diff
- await tx.creditBalance.create({ data: { companyId: c.id, balance: 4 } })
- await tx.creditTransaction.create({
-   data: { companyId: c.id, type: 'BONUS', amount: 4,
-           description: 'Bônus de boas-vindas (cadastro)' },
- })
+ await grantWelcomePassport(tx, c.id)  // 10 créditos / 7 dias
```

---

## 6) Onde quer que você dê crédito por gamificação

Ex.: `src/app/api/profile/validate-code/route.ts` (já dá +6 por completar perfil).
**Antes:**

```ts
await prisma.creditBalance.update({
  where: { companyId },
  data: { balance: { increment: 6 } },
})
await prisma.creditTransaction.create({
  data: { companyId, type: 'BONUS', amount: 6,
          description: 'Perfil validado' },
})
```

**Depois (também expira em 7 dias):**

```ts
import { grantProfileCompleteBonus } from '@/lib/passport'

await prisma.$transaction(async tx => {
  await grantProfileCompleteBonus(tx, companyId)
})
```

---

## 7) Onde se debita crédito (assessment / bundle)

**Antes:**

```ts
await prisma.creditBalance.update({
  where: { companyId },
  data: { balance: { decrement: 3 } },
})
```

**Depois:**

```ts
import { consumeCredits, TEST_PRICE } from '@/lib/passport'
import { onPassportConsumed } from '@/lib/passport-triggers'

const r = await consumeCredits(companyId, TEST_PRICE.DISC, 'Teste DISC')

if (r.passportNowConsumed) {
  // Camada 5 — agenda outreach (cupom 50% em 7 dias)
  await onPassportConsumed(companyId)
}
```

Se o teste é o **Premium** (ex.: PDI completo), a regra de bloquear bônus
fica explícita:

```ts
import { canUseBonusFor } from '@/lib/passport'
if (productKey === 'PREMIUM_REPORT' && passport.paid < TEST_PRICE.PREMIUM_REPORT) {
  return NextResponse.json(
    { error: 'O Relatório Premium não pode ser pago com créditos do Passaporte. Adquira créditos pagos.' },
    { status: 402 },
  )
}
```

---

## 8) `src/app/result/[id]/page.tsx` — Camada 3 + 4

No fim do componente `ResultPage`, antes do `</main>`:

```tsx
import PremiumGate from '@/components/passport/PremiumGate'
import UpsellPopup from '@/components/passport/UpsellPopup'

// dentro do componente:
const report = await prisma.report.findUnique({
  where:   { assessmentId: params.id },
  include: { unlock: true },
})
const unlocked = !!report?.unlock
const profileName = result?.primaryProfile ?? '—'
const PRICE_BRL  = process.env.NEXT_PUBLIC_PREMIUM_PRICE_BRL ?? '47,00'

// === Relatório Básico (já existe, NADA muda aqui) ===
// <DiscDevolutiva ... />

// === Relatório Premium (NOVO bloco) ===
{report && (
  <PremiumGate
    reportId={report.id}
    profileName={profileName}
    priceBrl={PRICE_BRL}
    unlocked={unlocked}
  >
    {/* Conteúdo só aparece quando unlocked === true */}
    <PremiumSections data={result.resultData} />
  </PremiumGate>
)}

{/* Pop-up de upsell — Camada 4 */}
{report && !unlocked && (
  <UpsellPopup
    reportId={report.id}
    assessmentId={params.id}
    profileName={profileName}
    priceBrl={PRICE_BRL}
  />
)}
```

> O componente `PremiumSections` deve renderizar:
> - Como se comunicar com este perfil
> - Como liderar este perfil
> - Medos inconscientes
> - PDI (Plano de Desenvolvimento Individual)
>
> Esse conteúdo já existe parcialmente no relatório atual. **Mova-o para um novo componente `PremiumSections.tsx`** e deixe o `<DiscDevolutiva>` apenas com o gráfico principal + resumo curto.

---

## 9) `prisma/seed.ts` — atualizar bônus inicial nos seeds

```diff
- balance: 200,
+ balance: 0,
+ // 10 bônus iniciais via grantWelcomePassport (no seed)
```

E após criar a empresa:

```ts
import { grantWelcomePassport } from '../src/lib/passport'

await prisma.$transaction(async tx => {
  await grantWelcomePassport(tx, company.id)
})
```

---

## 10) `vercel.json` — adicionar crons

```json
{
  "crons": [
    { "path": "/api/cron/expire-passport",  "schedule": "0 3 * * *"  },
    { "path": "/api/cron/process-outreach", "schedule": "*/15 * * * *" }
  ]
}
```

---

## 11) `.env` — variáveis novas

```env
# Cron (header Authorization: Bearer ${CRON_SECRET})
CRON_SECRET=troque-por-uma-string-longa-aleatória

# Stripe Premium
STRIPE_PRICE_PREMIUM_REPORT=price_XXXXXXXXXXXX
PREMIUM_REPORT_PRICE_CENTS=4700
NEXT_PUBLIC_PREMIUM_PRICE_BRL=47,00

# Cupom para o pacote de 20 créditos (50% off)
STRIPE_COUPON_50_OFF=PASSAPORTE50
STRIPE_PRICE_PACK_20=price_XXXXXXXXXXXX

# ManyChat (https://api.manychat.com)
MANYCHAT_API_TOKEN=eyJ...
MANYCHAT_FIELD_EXTERNAL_ID=10000001
MANYCHAT_FIELD_COUPON=10000002
MANYCHAT_FIELD_COUPON_URL=10000003
MANYCHAT_FIELD_TRIGGER=10000004
MANYCHAT_FLOW_REENGAGE=content20260427154212_123456
```

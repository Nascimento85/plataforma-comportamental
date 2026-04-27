# 🎟️ Passaporte de Autoconhecimento — Pack de Implementação

Conjunto completo das 5 camadas estratégicas para transformar
"Créditos Gratuitos" em **Passaporte de Autoconhecimento** com
escassez, upsell e automação de re-engajamento.

> Stack alvo: **Next.js 14 (App Router) + Prisma + Postgres (Supabase) + Stripe**.

---

## 📦 Estrutura entregue

```
passaporte-pack/
├── README.md                                          ← este arquivo
├── PATCHES.md                                         ← diffs guiados p/ arquivos existentes
├── prisma/
│   └── schema-additions.prisma                        ← adições ao schema (camada 2 + 3 + 5)
├── src/
│   ├── lib/
│   │   ├── passport.ts                                ← regra de negócio do Passaporte
│   │   ├── passport-triggers.ts                       ← gatilhos de outreach
│   │   └── manychat.ts                                ← webhook ManyChat
│   ├── components/passport/
│   │   ├── PassportBadge.tsx                          ← Camada 1 — selo "Passaporte Ativo"
│   │   ├── PassportWidget.tsx                         ← Camada 1 — widget no dashboard
│   │   ├── PremiumGate.tsx                            ← Camada 3 — bloqueio com blur
│   │   └── UpsellPopup.tsx                            ← Camada 4 — pop-up dinâmico
│   └── app/api/
│       ├── auth/register/route.ts                     ← Camada 2 — registra com 10 créditos / 7d
│       ├── premium/checkout/route.ts                  ← Camada 3 — Stripe Premium
│       ├── webhooks/stripe/route.ts                   ← Camada 3 — webhook (substitui o atual)
│       └── cron/
│           ├── expire-passport/route.ts               ← Camada 2 — expira bônus diariamente
│           └── process-outreach/route.ts              ← Camada 5 — envia ao ManyChat
```

---

## 🚀 Roteiro de aplicação

### 1) Banco — adicionar models e rodar migration

```bash
# Edite prisma/schema.prisma e cole os blocos de schema-additions.prisma
# nos lugares indicados (CreditBalance, CreditTransaction, novos models).
# Adicione as relações em Company {} e Report {}.

npx prisma migrate dev --name passaporte_autoconhecimento
npx prisma generate
```

> Alternativa: usar a SQL no fim de `schema-additions.prisma` como
> migration manual.

### 2) Backend — copiar arquivos novos

```bash
# Copie a pasta src/ deste pack para o seu src/ (não sobrescreve nada
# exceto os 2 arquivos abaixo, que são reescritos por design):
#   - src/app/api/auth/register/route.ts
#   - src/app/api/webhooks/stripe/route.ts
```

### 3) UI — aplicar `PATCHES.md`

Aplique os 11 patches descritos em `PATCHES.md` (sidebar, página de
créditos, widget do dashboard, página de resultado etc).

### 4) `.env` — adicionar variáveis

Veja seção 11 do `PATCHES.md`.

### 5) Crons — `vercel.json`

```json
{
  "crons": [
    { "path": "/api/cron/expire-passport",  "schedule": "0 3 * * *"  },
    { "path": "/api/cron/process-outreach", "schedule": "*/15 * * * *" }
  ]
}
```

### 6) Stripe — produtos a criar

| Produto                          | Recorrência | Preço         | Variável `.env`                |
| -------------------------------- | ----------- | ------------- | ------------------------------ |
| Relatório Premium + PDI          | one-shot    | R$ 47,00      | `STRIPE_PRICE_PREMIUM_REPORT`  |
| Pacote 20 créditos               | one-shot    | R$ 159,90     | `STRIPE_PRICE_PACK_20`         |
| Cupom 50% off (`PASSAPORTE50`)   | aplica em → | Pacote 20     | `STRIPE_COUPON_50_OFF`         |

### 7) ManyChat — checklist de configuração

1. Crie um **Custom Field**: `external_id` (texto) — armazene
   o `companyId` quando o usuário entrar no fluxo.
2. Crie 3 outros campos: `coupon`, `coupon_url`, `trigger`.
3. Crie um **Flow** chamado *"Passaporte 50% off"* que use os
   campos acima na mensagem (ex.: *"Olá {{first_name}}! Pacote de
   20 créditos com 50% off: {{coupon_url}}"*).
4. Anote o `flow_ns` do flow e o `field_id` de cada campo.
5. Preencha as 5 variáveis `MANYCHAT_*` no `.env`.

> Atalho: se preferir, troque o `lib/manychat.ts` para postar num
> webhook do **n8n/Make** que repassa ao ManyChat — só substitua a
> função `deliverOutreach` por um `fetch(URL_DO_N8N, …)`.

---

## 🧪 Como testar localmente

```bash
# 1) Aplica schema dev
cp prisma/schema.prisma prisma/schema.bak
# ... cola adições do schema-additions.prisma ...
npx prisma db push

# 2) Cria conta nova → deve ganhar 10 créditos com expiresAt = +7d
# 3) Inspecionar:
npx prisma studio
#  → CreditBalance.bonusBalance = 10, passportStatus = ACTIVE
#  → BonusGrant tem 1 linha com source=WELCOME_PASSPORT, remaining=10

# 4) "Avançar 8 dias" no banco para testar expiração:
psql "$DATABASE_URL" -c "UPDATE \"BonusGrant\" SET \"expiresAt\" = NOW() - INTERVAL '1 day';"

# 5) Disparar o cron manualmente
curl -H "Authorization: Bearer $CRON_SECRET" \
     http://localhost:3000/api/cron/expire-passport

#  → BonusGrant.remaining=0, expiredAt preenchido
#  → CreditBalance.bonusBalance=0, passportStatus=EXPIRED
#  → ScheduledOutreach criado (PASSPORT_EXPIRED, scheduledFor=agora)

# 6) Disparar o outreach
curl -H "Authorization: Bearer $CRON_SECRET" \
     http://localhost:3000/api/cron/process-outreach
```

---

## 🔐 Pontos de segurança implementados

- **`CRON_SECRET`** protege as rotas de cron (Bearer token).
- **Idempotência** no webhook do Stripe (`stripeSessionId` único em
  `ReportUnlock` e `CreditPurchase`).
- **Premium não aceita bônus** — barra dupla:
  - na regra `canUseBonusFor()` no backend;
  - no checkout: o desbloqueio só acontece via `ReportUnlock` com
    `stripeSessionId`.
- **Expiração lazy**: mesmo se o cron falhar, `getPassportState()`
  já trata bônus vencido como `EXPIRED` na leitura (UI não engana).
- **Sem duplicação de outreach**: `scheduleOutreach()` retorna o
  agendamento existente em vez de criar outro.
- **Backoff de tentativas**: `deliverOutreach()` marca `FAILED`
  após 5 tentativas para evitar loop.

---

## 🧭 Cobertura das 5 camadas estratégicas

| Camada | Arquivos                                                                |
| ------ | ----------------------------------------------------------------------- |
| **1 — Branding**       | `PassportBadge.tsx`, `PassportWidget.tsx`, `PATCHES.md` (1–4) |
| **2 — Expiração**      | `schema-additions.prisma`, `lib/passport.ts`, `cron/expire-passport`, `auth/register` |
| **3 — Premium gate**   | `components/passport/PremiumGate.tsx`, `api/premium/checkout`, `api/webhooks/stripe` |
| **4 — Pop-up upsell**  | `components/passport/UpsellPopup.tsx`, `PATCHES.md` (8)       |
| **5 — Outreach**       | `lib/manychat.ts`, `lib/passport-triggers.ts`, `cron/process-outreach` |

---

## 📜 Tabela de preços implementada (em `lib/passport.ts`)

```ts
COMBO_BUNDLE:           10
DISC:                    3
TEMPERAMENT:             2
ENNEAGRAM:               2
MBTI:                    2
CAREER_ANCHOR:           1
LOVE_LANGUAGES:          5
ARCHETYPE:               3
EMOTIONAL_INTELLIGENCE:  2
PREMIUM_REPORT:         10  // só com créditos PAGOS
```

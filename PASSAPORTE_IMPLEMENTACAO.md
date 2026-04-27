# 🎟️ Passaporte de Autoconhecimento — Guia de Implementação

> Roteiro do que **você precisa fazer manualmente** para colocar o pack no ar.
> Estimativa total: **3h–4h** (2h se Stripe e ManyChat já estiverem prontos).

---

## 📋 Índice

- [Fase 1 — Validar localmente (15 min)](#fase-1)
- [Fase 2 — Stripe: produtos + cupom (20 min)](#fase-2)
- [Fase 3 — Banco de produção (Railway/Supabase) (15 min)](#fase-3)
- [Fase 4 — Variáveis de ambiente no Railway (10 min)](#fase-4)
- [Fase 5 — Deploy do app (10 min)](#fase-5)
- [Fase 6 — Cron services no Railway (15 min)](#fase-6)
- [Fase 7 — ManyChat: tags + flows (45 min)](#fase-7)
- [Fase 8 — Teste ponta a ponta (20 min)](#fase-8)
- [Fase 9 — Monitoramento (contínuo)](#fase-9)

---

## <a id="fase-1"></a>FASE 1 — Validar localmente

### 1.1 — Abrir terminal na pasta do projeto

```cmd
cd "C:\Users\kenio\KAN.CLAUDE\📁 Projetos\plataforma-comportamental\estrutura-nextjs"
```

### 1.2 — Re-gerar o cliente Prisma

```cmd
npx prisma generate
```

**Esperado:** `✔ Generated Prisma Client (...) to .\node_modules\@prisma\client`.

> Se der erro `Schema parsing error` — me cole a mensagem que eu corrijo.

### 1.3 — Aplicar a migration no banco DEV (SQLite)

```cmd
copy prisma\schema.dev.prisma prisma\schema.prisma
npx prisma db push
```

**Esperado:** `✔ Your database is now in sync with your Prisma schema.`

### 1.4 — Rodar o seed

```cmd
npm run db:seed
```

**Esperado:**
```
🌱 Iniciando seed...
  🗑️  Dados anteriores removidos
  🏢 Empresa criada: Acme Tecnologia Ltda
  🎟️ Passaporte ativado: 10 créditos (válidos por 7 dias)
  ...
✅ Seed concluído!
```

### 1.5 — Subir o app local

```cmd
npm run dev
```

Abra http://localhost:3000/login → e-mail `admin@teste.com` / senha `teste123`.

**Você deve ver:**
- Sidebar com **"🎟️ Passaporte"** (não mais "Créditos").
- Dashboard mostra widget **"Passaporte de Autoconhecimento"** com **10 créditos** e badge verde **"Passaporte Ativo"**.

> ✅ Marque essa fase concluída antes de avançar.

---

## <a id="fase-2"></a>FASE 2 — Stripe: produtos + cupom

> **Acesse** https://dashboard.stripe.com (em modo **Live** quando for produção; teste primeiro em **Test**).

### 2.1 — Produto: Relatório Premium + PDI

1. **Products → + Add product**
2. **Name:** `Relatório Premium + PDI`
3. **Description:** `Acesso completo ao perfil + Plano de Desenvolvimento Individual + materiais de download`
4. **Pricing model:** `Standard pricing`
5. **Price:** `47.00 BRL` · **One time**
6. **Save product** → copie o `price_xxxxxxxx`

**Anote em algum lugar:**
```
STRIPE_PRICE_PREMIUM_REPORT=price_XXXXXXXXXXX
```

### 2.2 — Produto: Pacote 20 Créditos (alvo do cupom)

1. **+ Add product** → **Name:** `Pacote 20 Créditos`
2. **Price:** `159.90 BRL` · One time
3. **Save** → anote o `price_xxxxxxxx` em `STRIPE_PRICE_PACK_20`

### 2.3 — Cupom 50% off

1. **Products → Coupons → + New**
2. **ID:** `PASSAPORTE50`
3. **Type:** `Percentage discount` · **Percent off:** `50`
4. **Duration:** `Once` (aplica em 1 compra)
5. **Redemption limits:** `Limit dates` → 90 dias (ou indeterminado)
6. **Eligible products:** marque apenas **Pacote 20 Créditos** (o cupom NÃO pode aplicar nos outros)
7. **Save**

### 2.4 — Webhook do Stripe

1. **Developers → Webhooks → + Add endpoint**
2. **Endpoint URL:** `https://SEU-APP.up.railway.app/api/webhooks/stripe`
3. **Events to send:** marque **`checkout.session.completed`**
4. **Add endpoint** → na próxima tela copie o **Signing secret** `whsec_...`

**Anote:**
```
STRIPE_WEBHOOK_SECRET=whsec_XXXXXXXXXXX
```

> ⚠️ Crie esse webhook **uma vez para teste** e **outra para produção** com URLs diferentes. O `whsec_` é diferente em cada ambiente.

### 2.5 — Resumo das vars Stripe

```env
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_PRICE_PACK_5=price_...
STRIPE_PRICE_PACK_10=price_...
STRIPE_PRICE_PACK_20=price_...        # NOVO
STRIPE_PRICE_PACK_25=price_...
STRIPE_PRICE_PACK_50=price_...
STRIPE_PRICE_PREMIUM_REPORT=price_... # NOVO
STRIPE_COUPON_50_OFF=PASSAPORTE50     # NOVO
PREMIUM_REPORT_PRICE_CENTS=4700       # NOVO (fallback)
NEXT_PUBLIC_PREMIUM_PRICE_BRL=47,00   # NOVO (mostrado no pop-up)
```

---

## <a id="fase-3"></a>FASE 3 — Banco de produção (Railway/Supabase)

### 3.1 — Confirme que está usando o schema de produção

Antes de rodar a migration, troque o schema de volta para Postgres:

```cmd
cd "C:\Users\kenio\KAN.CLAUDE\📁 Projetos\plataforma-comportamental\estrutura-nextjs"
copy prisma\schema.prisma.bak.20260427-154935 prisma\schema.prisma.tmp
```

**OU** simplesmente reverta no editor para a versão Postgres (provider = `"postgresql"`). O arquivo `schema.prisma` que entreguei já está em Postgres com os models novos — é só voltar a usar essa versão.

### 3.2 — Apontar `.env` para o banco de produção

No `.env.local` (ou `.env`), tenha:

```env
DATABASE_URL="postgresql://postgres:[SENHA]@db.[PROJETO].supabase.co:5432/postgres?pgbouncer=true&connection_limit=1"
DIRECT_URL="postgresql://postgres:[SENHA]@db.[PROJETO].supabase.co:5432/postgres"
```

### 3.3 — Aplicar a migration

```cmd
npx prisma migrate dev --name passaporte_autoconhecimento
```

**O que acontece:**
- Prisma detecta as mudanças (3 models novos + campos novos).
- Cria pasta `prisma/migrations/202604xxxxxx_passaporte_autoconhecimento/`.
- Roda a SQL no banco de produção.
- Atualiza `node_modules/.prisma/client/`.

**Esperado:**
```
✔ Generated Prisma Client (...)
✔ Applied migration `202604xxxxxx_passaporte_autoconhecimento`
```

> ⚠️ Se o Supabase está com **dados em produção**, é melhor antes:
> - **Backup** do banco (Settings → Database → Backups → Download)
> - Rodar a migration em horário de baixo tráfego

### 3.4 — Migrar usuários existentes para o novo modelo (opcional)

Se já existem `Company` cadastradas com `creditBalance`, elas **NÃO** terão `bonusBalance` automaticamente. Você tem 2 opções:

**Opção A — Não fazer nada**
Usuários antigos continuam com `bonusBalance=0` e `passportStatus='INACTIVE'`. Não é problema; o sistema funciona normalmente.

**Opção B — Conceder Passaporte retroativo (recomendado para boa vontade)**

Crie um script único `scripts/grant-retroactive-passport.ts`:

```ts
import { PrismaClient } from '@prisma/client'
import { grantWelcomePassport } from '../src/lib/passport'

const prisma = new PrismaClient()

async function main() {
  const companies = await prisma.company.findMany({
    where: { creditBalance: { is: { bonusBalance: 0 } } },
    select: { id: true, email: true, name: true },
  })
  console.log(`Concedendo Passaporte retroativo para ${companies.length} empresas...`)

  for (const c of companies) {
    await prisma.$transaction(async (tx) => {
      await grantWelcomePassport(tx, c.id)
    })
    console.log(`  ✓ ${c.email}`)
  }
}

main().finally(() => prisma.$disconnect())
```

Rode com: `npx tsx scripts/grant-retroactive-passport.ts`.

---

## <a id="fase-4"></a>FASE 4 — Variáveis de ambiente no Railway

### 4.1 — Abrir o serviço Next.js no Railway

1. Vá no dashboard Railway → projeto da plataforma → serviço Next.js.
2. **Variables** → você verá as vars atuais.

### 4.2 — Adicionar as novas

Cole estas **uma por uma** (clique em **+ New Variable**):

| Variável                       | Valor exemplo                                   |
| ------------------------------ | ----------------------------------------------- |
| `CRON_SECRET`                  | gere com `openssl rand -base64 32`              |
| `STRIPE_PRICE_PREMIUM_REPORT`  | `price_XXXX` (Fase 2.1)                         |
| `STRIPE_PRICE_PACK_20`         | `price_XXXX` (Fase 2.2)                         |
| `STRIPE_COUPON_50_OFF`         | `PASSAPORTE50`                                  |
| `PREMIUM_REPORT_PRICE_CENTS`   | `4700`                                          |
| `NEXT_PUBLIC_PREMIUM_PRICE_BRL`| `47,00`                                         |
| `MANYCHAT_API_TOKEN`           | preenche depois (Fase 7)                        |
| `MANYCHAT_FIELD_EXTERNAL_ID`   | preenche depois (Fase 7)                        |
| `MANYCHAT_FIELD_COUPON`        | preenche depois (Fase 7)                        |
| `MANYCHAT_FIELD_COUPON_URL`    | preenche depois (Fase 7)                        |
| `MANYCHAT_FIELD_TRIGGER`       | preenche depois (Fase 7)                        |
| `MANYCHAT_FIELD_TEST_TYPE`     | preenche depois (Fase 7)                        |
| `MANYCHAT_FIELD_PROFILE_KEY`   | preenche depois (Fase 7)                        |
| `MANYCHAT_FIELD_RESULT_URL`    | preenche depois (Fase 7)                        |
| `MANYCHAT_FLOW_REENGAGE`       | preenche depois (Fase 7)                        |

### 4.3 — Anote o `APP_URL` do Railway

No serviço, **Settings → Domains** → você verá `https://xxxx.up.railway.app`.

Confirme que `NEXT_PUBLIC_APP_URL` aponta para essa URL (ou para o domínio customizado se já configurou).

---

## <a id="fase-5"></a>FASE 5 — Deploy do app

### 5.1 — Commit e push

```cmd
cd "C:\Users\kenio\KAN.CLAUDE\📁 Projetos\plataforma-comportamental\estrutura-nextjs"
git add .
git commit -m "feat: Passaporte de Autoconhecimento (5 camadas + premium DISC + manychat)"
git push
```

### 5.2 — Acompanhar build no Railway

- O Railway deve disparar deploy automático.
- Logs → procure por `npm run build` → `✔ Compiled successfully`.

**Se falhar com erro de TypeScript** (`Type 'X' is not assignable to 'Y'`), me cole o stack que eu corrijo.

### 5.3 — Validar URL pública

Abra `https://SEU-APP.up.railway.app/dashboard/credits` (logado) → deve mostrar o widget Passaporte.

---

## <a id="fase-6"></a>FASE 6 — Cron services no Railway

> Você fez upgrade do Railway, então pode usar **Cron Jobs nativos**. Crie 2 serviços novos no mesmo projeto.

### 6.1 — Service: `cron-expire-passport` (diário)

1. No projeto Railway → **+ New** → **Empty service**.
2. **Service name:** `cron-expire-passport`
3. **Settings → Source → Connect Repo** → escolha o **mesmo repo** do app Next.js.
4. **Settings → Cron Schedule:** `0 3 * * *` (todo dia às 3h UTC = 0h Brasília)
5. **Settings → Custom Start Command:**
   ```
   curl -fsS -H "Authorization: Bearer $CRON_SECRET" "$APP_URL/api/cron/expire-passport"
   ```
6. **Variables (deste serviço):**
   - `CRON_SECRET` → mesmo valor da Fase 4
   - `APP_URL` → URL pública do app (Fase 4.3)

### 6.2 — Service: `cron-process-outreach` (a cada 15 min)

Repita os passos com:
- **Service name:** `cron-process-outreach`
- **Cron Schedule:** `*/15 * * * *`
- **Custom Start Command:**
  ```
  curl -fsS -H "Authorization: Bearer $CRON_SECRET" "$APP_URL/api/cron/process-outreach"
  ```

### 6.3 — Validar

Aguarde o próximo schedule (ou clique em **Deploy → Redeploy** para forçar). Em **Logs** procure:

```
{"ok":true,"expiredGrants":0,"affectedCompanies":0}
```

ou

```
{"ok":true,"processed":0,"sent":0,"failed":0}
```

**Teste manual** (sem esperar):

```cmd
curl -H "Authorization: Bearer SEU_CRON_SECRET" https://SEU-APP.up.railway.app/api/cron/expire-passport
```

---

## <a id="fase-7"></a>FASE 7 — ManyChat: tags + flows

> Esta fase é a mais demorada (45 min) mas é onde a mágica acontece. Não pule.

### 7.1 — Token da API

1. Vá em https://manychat.com → seu bot.
2. **Settings → API → Generate Token**.
3. Copie o token. Cole em `MANYCHAT_API_TOKEN` no Railway.

### 7.2 — Custom Fields (8 campos)

**Settings → Custom User Fields → + New Field** — crie:

| Field Name             | Type   | Anota o ID em                       |
| ---------------------- | ------ | ----------------------------------- |
| `external_id`          | Text   | `MANYCHAT_FIELD_EXTERNAL_ID`        |
| `coupon`               | Text   | `MANYCHAT_FIELD_COUPON`             |
| `coupon_url`           | Text   | `MANYCHAT_FIELD_COUPON_URL`         |
| `trigger`              | Text   | `MANYCHAT_FIELD_TRIGGER`            |
| `test_type`            | Text   | `MANYCHAT_FIELD_TEST_TYPE`          |
| `profile_key`          | Text   | `MANYCHAT_FIELD_PROFILE_KEY`        |
| `result_url`           | Text   | `MANYCHAT_FIELD_RESULT_URL`         |

> Para descobrir o ID do field, depois de criar use:
> ```
> curl -H "Authorization: Bearer SEU_TOKEN" https://api.manychat.com/fb/page/getCustomFields
> ```
> O JSON retorna `{ "data": [ { "id": 1234567890, "name": "external_id" }, ... ] }`.
> Anote cada `id`.

### 7.3 — Tags por perfil (5 famílias = 31 tags)

**Settings → Tags → + New** (ManyChat cria automaticamente quando o backend chama `addTagByName`, mas é bom criar manualmente para organizar):

- DISC: `perfil_D`, `perfil_I`, `perfil_S`, `perfil_C`
- Temperamentos: `temp_colerico`, `temp_sanguineo`, `temp_melancolico`, `temp_fleumatico`
- Eneagrama: `enea_1` … `enea_9`
- Linguagens: `amor_palavras`, `amor_tempo`, `amor_presente`, `amor_servico`, `amor_toque`
- Arquétipos: `arq_heroi`, `arq_amante`, `arq_governante`, `arq_criador`, `arq_cuidador`, `arq_sabio`, `arq_mago`, `arq_explorador`, `arq_rebelde`, `arq_bobo`, `arq_inocente`, `arq_pessoacomum`
- Sistema: `tag_comprador` (adicione manualmente quando o webhook do Stripe confirmar pagamento — exclui do upsell)

### 7.4 — Flow: Re-engajamento Passaporte (50% off)

1. **Automation → Flows → + New Flow** → **Name:** `Passaporte 50% off`.
2. Adicione um **Send Message** com o texto:
   ```
   Seu Passaporte de Autoconhecimento expirou hoje. 🕒

   Mas notei que você ainda não mapeou sua equipe ou família. Como sei que você busca evolução, liberei um lote especial:

   🎁 50% OFF no Pacote de 20 Créditos
   Cupom: {{coupon}}
   Vale por 48h.
   ```
3. Adicione **Buttons:**
   - `🔓 Quero o cupom` → **Open URL:** `{{coupon_url}}`
   - `Outra hora` → **Reply** (encerra fluxo)
4. **Save** → no canto superior copie o **Flow Namespace** (ex.: `content20260427154212_123456`).
5. Cole em `MANYCHAT_FLOW_REENGAGE` no Railway.

### 7.5 — Flow por perfil DISC (4 flows)

Para cada perfil (D, I, S, C), repita:

1. **+ New Flow** → **Name:** `DISC - Perfil [X]`
2. **Trigger:** `When tag is added` → escolha `perfil_D` (ou I, S, C)
3. **Cole o texto da mensagem 1** do briefing:

   **Perfil D:**
   ```
   Resultado liberado! Você é um Dominante. Isso explica sua busca por resultados, mas cuidado: sua velocidade pode estar atropelando oportunidades. Liberei um resumo no seu e-mail, mas se você quer o Plano de Guerra para liderar e dobrar sua eficiência, o Relatório Premium é o seu próximo passo. Quer o link para dominar seu mercado?
   ```

4. **Buttons:**
   - `Quero meu Plano de Guerra` → Open URL: `{{result_url}}`
   - `Ver resumo no e-mail` → Reply

5. **+ Add Step → Delay** → 24h.
6. **+ Add Step → Condition:** `IF user has tag "tag_comprador"` → END (não envia 2ª).
7. **+ Add Step → Send Message** com o texto da mensagem 2:
   ```
   Executores não perdem tempo. O seu 'ponto cego' está custando caro agora mesmo. O Relatório Premium + PDI está disponível. Vai deixar o controle da sua carreira na mão da sorte ou da ciência?
   ```
8. **Buttons:** `Tomar o controle agora` → `{{result_url}}`
9. **Save & Activate**.

> Os textos exatos dos 4 perfis estão em `passaporte-pack/manychat/sequences-disc.json`.

### 7.6 — Sincronizar `external_id` no momento certo

Para o sistema saber qual subscriber do ManyChat é qual `Company` no banco, é preciso popular o `external_id` quando o usuário entra no ManyChat. Existem 3 formas:

**Forma A — usuário entra via Comente "ARQUÉTIPO" no Reels:**

No flow inicial do ManyChat (que dispara no comentário), adicione um **Set Custom User Field** logo no começo: `external_id = {{user_id}}` (ou peça e-mail e use isso para casar com `Company.email`).

**Forma B — usuário envia link da bio com ?manychat=1:**

Adapte a landing para perguntar e-mail antes de redirecionar. Quando o usuário fizer o teste e preencher e-mail, faça o backend chamar a API ManyChat `subscriber/findByCustomField` por e-mail e setar `external_id = companyId`.

**Forma C (mais simples) — popula no momento do cadastro:**

No `/api/auth/register`, depois de criar a `Company`, dispare uma chamada à API ManyChat criando o subscriber com `external_id = company.id`. É a abordagem mais limpa, mas exige o usuário ter passado pelo bot antes (caso contrário não existe `subscriber` para criar).

> **Recomendado:** combinar A + C. O usuário entra primeiro no ManyChat (comentário do Reels) → preenche e-mail no flow → backend cria a Company com `external_id = subscriber_psid`.

---

## <a id="fase-8"></a>FASE 8 — Teste ponta a ponta

### 8.1 — Cadastro novo

1. Abra `https://SEU-APP.up.railway.app/register` em janela anônima.
2. Crie uma conta com e-mail seu.
3. Vá no dashboard → deve aparecer **"Passaporte Ativo"** com 10 créditos.
4. Confira no banco: `select * from "BonusGrant" where "companyId" = '...'` → deve ter 1 lote com `remaining=10`, `expiresAt = NOW + 7d`.

### 8.2 — Teste DISC com upsell

1. Faça um teste DISC.
2. Ao ver o resultado → o **Pop-up de Upsell** deve aparecer após 6 segundos.
3. Clique em **"Desbloquear Agora"** → vai para o Stripe Checkout.
4. Pague com cartão de teste `4242 4242 4242 4242` (modo Test) ou cartão real (modo Live).
5. Volte para `/result/...` → seções premium (comunicação, lideança, medos, PDI) devem ESTAR DESBLOQUEADAS.

### 8.3 — Expiração forçada

Para testar a expiração sem esperar 7 dias, rode no banco:

```sql
UPDATE "BonusGrant"
SET "expiresAt" = NOW() - INTERVAL '1 day'
WHERE "companyId" = 'SEU_COMPANY_ID';
```

Depois dispare o cron manual:

```cmd
curl -H "Authorization: Bearer SEU_CRON_SECRET" https://SEU-APP.up.railway.app/api/cron/expire-passport
```

Resposta esperada: `{"ok":true,"expiredGrants":1,"affectedCompanies":1}`.

Confira:
- `BonusGrant.remaining = 0`, `expiredAt` preenchido.
- `CreditBalance.bonusBalance = 0`, `passportStatus = 'EXPIRED'`.
- `ScheduledOutreach` criado para essa empresa com `type = 'PASSPORT_EXPIRED'`.

### 8.4 — Outreach disparado

```cmd
curl -H "Authorization: Bearer SEU_CRON_SECRET" https://SEU-APP.up.railway.app/api/cron/process-outreach
```

Espera: `{"ok":true,"processed":1,"sent":1,"failed":0}`.

Confira no ManyChat → o subscriber recebeu a mensagem do flow `Passaporte 50% off`.

### 8.5 — Dispatch da tag DISC

Quando completar um teste DISC, o backend deve chamar `sendProfileTagToManyChat()`.

**Você precisa adicionar a chamada manualmente** no código que cria o `Result`. Encontre o arquivo (provavelmente `src/lib/engines/disc.ts` ou similar) e logo depois do `prisma.result.create({...})`, adicione:

```ts
import { sendProfileTagToManyChat } from '@/lib/manychat-tags'
import { onAssessmentCompleted } from '@/lib/passport-triggers'

// Após criar o Result:
await sendProfileTagToManyChat({
  companyId:      assessment.companyId,
  testType:       result.testType,        // 'DISC'
  primaryProfile: result.primaryProfile,  // 'D' | 'I' | 'S' | 'C'
  resultId:       result.id,
}).catch(err => console.error('[manychat-tag]', err))

// Agenda outreach se for o 1º teste completado
await onAssessmentCompleted(assessment.id).catch(err => console.error('[trigger]', err))
```

> Se quiser, eu localizo o ponto exato do código e faço a edição na próxima rodada.

---

## <a id="fase-9"></a>FASE 9 — Monitoramento

### 9.1 — Dashboard de métricas (sugerido)

Crie uma página `/admin/passaporte` que mostre:

- Total de Passaportes ativos hoje.
- Total expirados nas últimas 24h.
- Conversão Passaporte → Premium (último 7d).
- ScheduledOutreach pendentes / falhados.

Eu posso gerar essa página para você na próxima rodada.

### 9.2 — Alertas

Configure no Railway → Service → Notifications:
- **Cron failed** → e-mail para você.
- **Build failed** → e-mail.

### 9.3 — Logs no Railway

Acesse **Logs** dos 2 cron services e filtre por:
- `expired:` → empresas que tiveram passaporte expirado.
- `manychat-tags] falhou` → problemas com ManyChat.
- `[webhook] Erro` → problemas de webhook Stripe.

### 9.4 — Métricas no Stripe

**Stripe Dashboard → Insights** → filtre por produto `Relatório Premium + PDI`:
- Conversion rate (% que paga após ver checkout).
- AOV (ticket médio).
- Refunds (manter < 5%).

---

## ⚠️ Troubleshooting

| Sintoma                                          | Causa provável                                                        | Ação                                                                  |
| ------------------------------------------------ | ---------------------------------------------------------------------- | --------------------------------------------------------------------- |
| Erro `Cannot find module '@/lib/passport'`       | Import path errado / alias `@/` não configurado                        | Confira `tsconfig.json` → `paths: { "@/*": ["./src/*"] }`             |
| `prisma generate` falha com `engine 403`         | Sem internet / firewall bloqueando `binaries.prisma.sh`                | Rode em rede aberta OU `set PRISMA_ENGINES_CHECKSUM_IGNORE_MISSING=1` |
| Pop-up upsell não aparece                        | sessionStorage com a chave `soul:upsell-shown:[id]`                    | Abrir em janela anônima OU limpar sessionStorage                      |
| Webhook Stripe retorna 400 "Assinatura inválida" | `STRIPE_WEBHOOK_SECRET` errado ou ambiente trocado                     | Confirme se está usando o secret do webhook DAQUELE ambiente          |
| Cron retorna 401                                 | `CRON_SECRET` diferente entre o cron service e o app                   | Use a MESMA string nos 3 serviços (app + 2 crons)                     |
| ManyChat retorna `subscriber não encontrado`     | Usuário não tem `external_id` setado                                   | Veja Fase 7.6                                                         |
| Passaporte não expira no horário                 | Cron não está rodando OU schedule mal configurado                      | Ver logs do `cron-expire-passport`                                    |

---

## ✅ Checklist resumido (imprima e marque)

- [ ] **F1** — `prisma generate` + `db push` + `seed` + `dev` rodando local
- [ ] **F2** — Stripe: 2 produtos + cupom + webhook (test E live)
- [ ] **F3** — Migration aplicada no Postgres de produção
- [ ] **F4** — 15 vars novas no Railway (CRON, Stripe Premium, ManyChat)
- [ ] **F5** — Deploy passou (build verde, app responde)
- [ ] **F6** — 2 cron services rodando (logs verdes)
- [ ] **F7** — ManyChat: token + 8 fields + 31 tags + 5 flows ativos
- [ ] **F8** — Teste ponta a ponta: cadastro → teste → upsell → pago → premium aparece
- [ ] **F9** — Monitoramento de logs configurado

---

> **Quando bater algum erro:** copie a mensagem completa (incluindo stack trace) e me cole. Eu corrijo no código direto.

> **Próximas frentes naturais depois disso:**
> 1. Página `/admin/passaporte` com métricas.
> 2. Webhook que dispara `sendProfileTagToManyChat` automaticamente após cada Result criado.
> 3. Diagramar PDFs reais (Playbook, Checklist, Apostila) com `@react-pdf/renderer`.
> 4. Preencher conteúdo Premium dos 11 arquétipos / 8 eneatipos / etc.

# 🚀 COLA PRONTA — Passaporte ao Vivo

> Tudo pronto para copy/paste. Estimativa: **45 min** se você for rápido.

---

## ✅ Já criado no Stripe (Live mode)

| Item | ID | Valor |
| --- | --- | --- |
| Produto: 20 Créditos | `prod_UPh5YJUqJp2gVd` | R$ 159,90 |
| Price 20 Créditos | `price_1TQribGiCq52QhyXD5MqFAYI` | — |
| Produto: Relatório Premium + PDI | `prod_UPh60zqOUbmw7X` | R$ 47,00 |
| Price Premium | `price_1TQrivGiCq52QhyXIKwLIozh` | — |
| Cupom interno | `HrATIItN` | 50% off, once |
| Promotion Code (digitável) | `PASSAPORTE50` | aplica `HrATIItN` |

---

## 1️⃣ STRIPE — WEBHOOK (2 min)

Acesse: https://dashboard.stripe.com/webhooks (Live mode)

1. **+ Add endpoint**
2. **Endpoint URL:** `https://mapacomportamental.com/api/webhooks/stripe`
3. **Events to send:** `checkout.session.completed`
4. **Add endpoint**
5. Clique **Reveal** no `Signing secret` → copie `whsec_...`

➡️ **Anote esse `whsec_...` para colar no Railway logo abaixo.**

---

## 2️⃣ RAILWAY — VARIÁVEIS (10 min)

Acesse: https://railway.com → projeto → serviço Next.js → **Variables**

Cole UMA POR UMA (botão **+ New Variable**):

```env
# Stripe
STRIPE_PRICE_PREMIUM_REPORT=price_1TQrivGiCq52QhyXIKwLIozh
STRIPE_PRICE_PACK_20=price_1TQribGiCq52QhyXD5MqFAYI
STRIPE_COUPON_50_OFF=PASSAPORTE50
PREMIUM_REPORT_PRICE_CENTS=4700
NEXT_PUBLIC_PREMIUM_PRICE_BRL=47,00

# Webhook do Stripe (já criado)
STRIPE_WEBHOOK_SECRET=whsec_3bvXnAiUdoNQREpErwrGnyTqCFkdzVJG

# Cron (gerado com openssl rand -base64 32)
CRON_SECRET=e+xIJMwrY2C+swU+9NxoeeHAE/H0Mp1DJ7WazekpzDM=

# ManyChat — preencha depois do passo 4
MANYCHAT_API_TOKEN=
MANYCHAT_FIELD_EXTERNAL_ID=
MANYCHAT_FIELD_COUPON=
MANYCHAT_FIELD_COUPON_URL=
MANYCHAT_FIELD_TRIGGER=
MANYCHAT_FIELD_TEST_TYPE=
MANYCHAT_FIELD_PROFILE_KEY=
MANYCHAT_FIELD_RESULT_URL=
MANYCHAT_FLOW_REENGAGE=
```

**Depois clique em "Deploy"** para o app rebuildar com as novas vars.

---

## 3️⃣ RAILWAY — 2 CRON SERVICES (15 min)

Você fez o upgrade, então pode usar Cron nativo. Crie **2 services** novos no MESMO projeto.

### Service A: `cron-expire-passport`

1. **+ New** → **Empty service**
2. **Settings → Source** → conecte ao mesmo repo do Next.js
3. **Settings → Cron Schedule:** `0 3 * * *`
4. **Settings → Custom Start Command:**
   ```
   curl -fsS -H "Authorization: Bearer $CRON_SECRET" "$APP_URL/api/cron/expire-passport"
   ```
5. **Variables (deste service):**
   ```env
   CRON_SECRET=mesmo_valor_do_app
   APP_URL=https://mapacomportamental.com
   ```

### Service B: `cron-process-outreach`

Mesma coisa, mudando:
- **Cron Schedule:** `*/15 * * * *`
- **Start Command:**
  ```
  curl -fsS -H "Authorization: Bearer $CRON_SECRET" "$APP_URL/api/cron/process-outreach"
  ```

---

## 4️⃣ MANYCHAT — FIELDS + TAGS + FLOWS (40 min)

### 4.1 — API Token

ManyChat → **Settings → API → Generate Token** → copie.
Cole em `MANYCHAT_API_TOKEN` no Railway.

### 4.2 — Custom Fields (8)

ManyChat → **Settings → Custom User Fields → + New Field**.
Tipo de todos: **Text**.

| Nome no ManyChat | Variável no Railway          |
| ---------------- | ---------------------------- |
| `external_id`    | `MANYCHAT_FIELD_EXTERNAL_ID` |
| `coupon`         | `MANYCHAT_FIELD_COUPON`      |
| `coupon_url`     | `MANYCHAT_FIELD_COUPON_URL`  |
| `trigger`        | `MANYCHAT_FIELD_TRIGGER`     |
| `test_type`      | `MANYCHAT_FIELD_TEST_TYPE`   |
| `profile_key`    | `MANYCHAT_FIELD_PROFILE_KEY` |
| `result_url`     | `MANYCHAT_FIELD_RESULT_URL`  |

➡️ Para pegar o **ID numérico** de cada field, rode no terminal do PC:

```cmd
curl -H "Authorization: Bearer SEU_MANYCHAT_API_TOKEN" https://api.manychat.com/fb/page/getCustomFields
```

O JSON retorna `[ { "id": 1234567890, "name": "external_id" }, … ]`. Copie cada `id` para a variável correspondente no Railway.

### 4.3 — Tags (cria as principais agora; o resto vira automático via API)

Crie manualmente:
- `tag_comprador` (excludente — adicione via webhook do Stripe quando tiver tempo)
- `perfil_D`, `perfil_I`, `perfil_S`, `perfil_C`

(As outras 26 tags — Temperamentos/Eneagrama/Linguagens/Arquétipos — o backend cria sob demanda via `addTagByName`.)

### 4.4 — Flow: Re-engajamento Passaporte

1. **Automation → Flows → + New Flow**
2. **Name:** `Passaporte 50% off`
3. Adicione **Send Message** com texto:

   ```
   Seu Passaporte de Autoconhecimento expirou hoje. 🕒

   Mas notei que você ainda não mapeou sua equipe ou família. Como sei que você busca evolução, liberei um lote especial:

   🎁 50% OFF no Pacote de 20 Créditos
   Cupom: {{coupon}}
   Vale por 48h.
   ```

4. **Buttons:**
   - `🔓 Quero o cupom` → **Open URL** → `{{coupon_url}}`
   - `Outra hora` → Reply

5. **Save** → copie o **Flow Namespace** (ex.: `content20260427154212_123456`).
6. Cole em `MANYCHAT_FLOW_REENGAGE` no Railway.

### 4.5 — 4 Flows DISC (texto pronto)

Para cada perfil, **+ New Flow** com **Trigger: When tag is added → perfil_X**:

#### Perfil D — Mensagem 1
```
Resultado liberado! Você é um Dominante. Isso explica sua busca por resultados, mas cuidado: sua velocidade pode estar atropelando oportunidades. Liberei um resumo no seu e-mail, mas se você quer o Plano de Guerra para liderar e dobrar sua eficiência, o Relatório Premium é o seu próximo passo. Quer o link para dominar seu mercado?
```
**Botão:** `Quero meu Plano de Guerra` → Open URL `{{result_url}}`

#### Perfil D — Mensagem 2 (delay 24h, condition: NOT has_tag tag_comprador)
```
Executores não perdem tempo. O seu 'ponto cego' está custando caro agora mesmo. O Relatório Premium + PDI está disponível. Vai deixar o controle da sua carreira na mão da sorte ou da ciência?
```
**Botão:** `Tomar o controle agora` → `{{result_url}}`

#### Perfil I — Mensagem 1
```
Uau! Seu perfil é Influente. 🌟 Você tem um brilho natural, mas já sentiu que às vezes começa mil coisas e não termina nenhuma? O seu Passaporte Premium mostra como transformar seu carisma em autoridade real e foco absoluto. Vamos levar seu magnetismo para o próximo nível?
```

#### Perfil I — Mensagem 2 (24h)
```
Todo mundo ama um Influente, mas poucos Influentes são realmente produtivos. Preparei um Playbook exclusivo no Relatório Premium para você organizar suas ideias e ser reconhecido como uma fera na sua área. Olha o que te espera lá: {{result_url}}
```

#### Perfil S — Mensagem 1
```
Teste concluído! Você é um Estável. O mundo precisa da sua calma e lealdade. Mas eu sei que às vezes é difícil dizer 'não' e você acaba sobrecarregado, certo? No Relatório Premium, eu te ensino técnicas de assertividade para você se proteger e crescer com segurança. Posso te mostrar como funciona?
```

#### Perfil S — Mensagem 2 (24h)
```
Mudar gera medo, mas estagnar dói mais. O Relatório Premium foi feito para que você evolua no seu ritmo, sem pressões desnecessárias, mas com passos firmes. Garanta seu guia de segurança e crescimento aqui: {{result_url}}
```

#### Perfil C — Mensagem 1
```
Análise finalizada com precisão. Seu perfil é Analista. Sua atenção aos detalhes é cirúrgica, mas você já sentiu a 'paralisia por análise'? O Relatório Premium entrega os dados que faltavam para você tomar decisões rápidas e seguras, eliminando o medo de errar. Acesse a documentação completa do seu perfil aqui.
```

#### Perfil C — Mensagem 2 (24h)
```
Fatos são melhores que opiniões. O Relatório Premium contém o Plano de Desenvolvimento Individual baseado em ciência comportamental para otimizar sua performance técnica. Verifique os módulos inclusos e os manuais de download: {{result_url}}
```

---

## 5️⃣ DEPLOY DO APP (5 min)

No PC, terminal:

```cmd
cd "C:\Users\kenio\KAN.CLAUDE\📁 Projetos\plataforma-comportamental\estrutura-nextjs"
git add .
git commit -m "feat: Passaporte de Autoconhecimento (5 camadas + premium DISC + manychat)"
git push
```

Railway dispara deploy automático. Acompanhe nos logs.

---

## 6️⃣ MIGRATION DO BANCO (5 min)

```cmd
cd "C:\Users\kenio\KAN.CLAUDE\📁 Projetos\plataforma-comportamental\estrutura-nextjs"
npx prisma migrate dev --name passaporte_autoconhecimento
```

> Confirma se `DATABASE_URL` no `.env.local` aponta para o Postgres de produção (Supabase ou Railway Postgres).

---

## ✅ Checklist final

- [ ] Stripe webhook criado → `whsec_...` colado no Railway
- [ ] 8 vars Stripe + Webhook + Cron no Railway
- [ ] 8 vars ManyChat preenchidas (após criar fields/flows)
- [ ] 2 cron services criados e rodando
- [ ] 5 flows ManyChat ativos (4 DISC + recuperação)
- [ ] Migration aplicada no Postgres de produção
- [ ] `git push` feito → app deployado
- [ ] Cadastro de teste mostra "Passaporte Ativo" com 10 créditos

---

> Quando bater algum erro, me cole a mensagem que eu corrijo direto.

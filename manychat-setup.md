# 🤖 ManyChat — Setup de Fields, Tags e Flows

Guia operacional para configurar o ManyChat de forma compatível com o que o
backend já envia (`src/lib/manychat.ts` + `src/lib/manychat-tags.ts`).

> **Conta usada:** ManyChat Pro ligado a Instagram + WhatsApp do Mapa Comportamental.
> **Pré-requisito:** já ter o `MANYCHAT_API_TOKEN` (Settings → API).

---

## 1) Variáveis de ambiente (Railway)

Adicione no projeto Next.js no Railway:

| Variável                       | Como obter                                              | Exemplo                                |
| ------------------------------ | ------------------------------------------------------- | -------------------------------------- |
| `MANYCHAT_API_TOKEN`           | Settings → API → API Key                                | `1234567890:abc...`                    |
| `MANYCHAT_FIELD_EXTERNAL_ID`   | depois de criar o custom field "external_id"           | `12345678`                             |
| `MANYCHAT_FIELD_COUPON`        | depois de criar o custom field "coupon"                | `12345679`                             |
| `MANYCHAT_FIELD_COUPON_URL`    | depois de criar o custom field "coupon_url"            | `12345680`                             |
| `MANYCHAT_FIELD_TRIGGER`       | depois de criar o custom field "trigger"               | `12345681`                             |
| `MANYCHAT_FIELD_TEST_TYPE`     | depois de criar o custom field "test_type"             | `12345682`                             |
| `MANYCHAT_FIELD_PROFILE_KEY`   | depois de criar o custom field "profile_key"           | `12345683`                             |
| `MANYCHAT_FIELD_RESULT_URL`    | depois de criar o custom field "result_url"            | `12345684`                             |
| `MANYCHAT_FLOW_REENGAGE`       | flow_ns do flow de reengajamento                        | `content20260427154212_123456`         |

> Para descobrir o ID numérico de um Custom Field, abra a página do field no
> ManyChat — está na URL: `.../customFields/12345678`. Para o flow_ns, abra
> o flow → ⚙️ → "Get flow_ns".

---

## 2) Custom Fields (criar 8)

ManyChat → **Audience → Custom User Fields → +New Custom Field**.
Tipo `Text` em todos.

| Nome interno    | Para que serve                                                                |
| --------------- | ----------------------------------------------------------------------------- |
| `external_id`   | Casa o subscriber com o `companyId` do nosso DB. Preenchido na primeira vez. |
| `coupon`        | Código do cupom enviado (ex: `PASSAPORTE50`).                                |
| `coupon_url`    | URL pronta de checkout com cupom + UTM.                                      |
| `trigger`       | Motivo do outreach (`ZERO_BALANCE_DAY7`, `FIRST_TEST_DAY7`, `PASSPORT_EXPIRED`). |
| `test_type`     | Último teste realizado (`DISC`, `MBTI`, `ENNEAGRAM`, etc).                   |
| `profile_key`   | Perfil dominante (`D`, `I`, `S`, `C`, `7`, `COLERICO`, `HERO`, etc).         |
| `result_url`    | Link público da devolutiva (`/result/<assessmentId>`).                       |
| `passport_status` (opcional) | Status atual do passaporte. Útil para condições no flow.        |

---

## 3) Tags (31 perfis)

ManyChat → **Audience → Tags → +New Tag**.
Crie cada uma manualmente ou deixe que a primeira chamada da API crie
(`addTagByName` cria se não existir).

### DISC (4)

`perfil_D`, `perfil_I`, `perfil_S`, `perfil_C`

### Temperamentos (4)

`temp_colerico`, `temp_sanguineo`, `temp_melancolico`, `temp_fleumatico`

### Eneagrama (9)

`enea_1`, `enea_2`, `enea_3`, `enea_4`, `enea_5`, `enea_6`, `enea_7`, `enea_8`, `enea_9`

### Linguagens do Amor (5)

`amor_palavras`, `amor_tempo`, `amor_presente`, `amor_servico`, `amor_toque`

### Arquétipos Junguianos (12)

`arq_heroi`, `arq_amante`, `arq_governante`, `arq_criador`, `arq_cuidador`,
`arq_sabio`, `arq_mago`, `arq_explorador`, `arq_rebelde`, `arq_bobo`,
`arq_inocente`, `arq_pessoacomum`

> **Total: 34 tags.** O mapeamento exato está em
> `src/lib/manychat-tags.ts` no objeto `PROFILE_TAGS`.

---

## 4) Flows (5 essenciais)

### Flow A — "Onboarding · Resultado entregue" (gatilho: tag `perfil_*` ou `enea_*` ou `arq_*` etc)

- Trigger: **Tag aplicada** (qualquer uma dos 34 perfis)
- Mensagem 1 (delay 0): "Seu mapa está pronto! 🧭 Veja agora: {result_url}"
- Mensagem 2 (delay 1 dia): pergunta "qual ponto te tocou mais?"
- Útil pra esquentar a conversa antes do flow comercial.

### Flow B — "Reengajamento 50% off" (`MANYCHAT_FLOW_REENGAGE`)

- **Esse é o flow que o backend dispara via `sendFlow`** quando uma
  `ScheduledOutreach` é processada pelo cron.
- Mensagem usa o `{coupon}` e `{coupon_url}` que o backend setou nos
  custom fields antes do `sendFlow`.
- Sugestão de copy:
  > "Oi {first_name}, vi que seu Passaporte expirou sem você usar tudo.
  > Tô liberando 50% de desconto no pacote de 20 créditos só pra você
  > terminar de mapear sua equipe ou família 👇 {coupon_url}.
  > Cupom: {coupon}. Válido por 48h."

> **Anote o `flow_ns`** desse flow e cole na variável
> `MANYCHAT_FLOW_REENGAGE` no Railway.

### Flow C — "Quiz curto" (gatilho: keyword "DISC" no Insta DM)

- Pergunta 4 questões rápidas (botões A/B).
- Cria `external_id` quando o usuário se cadastra no app.
- Aplica tag `perfil_*` provisória.

### Flow D — "Cupom de boas-vindas" (gatilho: tag `lead_novo`)

- Disparado quando alguém vem do quiz mas ainda não criou conta.
- Envia `{coupon_url}` com `WELCOME10` (10% off).

### Flow E — "Reativação 30 dias" (gatilho: condição `last_seen > 30d`)

- Para subscribers que sumiram. Tom mais leve.

---

## 5) Como o `external_id` é populado

O backend **não cria** o subscriber — ele assume que o ID já existe.
A criação acontece quando o usuário entra em contato pela primeira vez
(DM no Insta, click num link `m.me/...`). Para casar com o `companyId`:

1. **Opção A — Quiz no Insta:** no fim do quiz, peça email. Use Zapier/Make
   para chamar nosso endpoint `/api/manychat/link` (a criar) que recebe
   `{ email, manychat_subscriber_id }` e seta `external_id = company.id`.
2. **Opção B — Login com Insta:** no botão "Continuar com Instagram",
   guarde o IG ID e envie pro ManyChat via `setCustomFieldByName`.
3. **Opção C — Manual:** durante o piloto, popule `external_id` na mão
   na tela do subscriber.

Sem `external_id`, o backend retorna `subscriber não encontrado no ManyChat`
e o outreach é marcado como `FAILED` em `/admin/passaporte`.

---

## 6) Testar end-to-end

1. Crie uma subscriber teste no ManyChat e seta `external_id = <seu companyId>`.
2. Force um agendamento de outreach via SQL no Supabase:

   ```sql
   INSERT INTO "ScheduledOutreach"
     ("id","companyId","type","scheduledFor","status","attempts","payload","createdAt")
   VALUES
     (gen_random_uuid()::text, '<seu-company-id>', 'PASSPORT_EXPIRED',
      now(), 'PENDING', 0, '{}'::jsonb, now());
   ```

3. Dispare o cron manualmente:

   ```bash
   curl -H "Authorization: Bearer $CRON_SECRET" \
     https://mapacomportamental.com/api/cron/process-outreach
   ```

4. Resultado esperado: `{"ok":true,"processed":1,"sent":1,"failed":0}`
   e a mensagem do Flow B chegando no DM da conta de teste.

5. Confirma também na página `/admin/passaporte` que o card "Enviados"
   incrementou e "Falhos" segue em 0.

---

## 7) Checklist final

- [ ] `MANYCHAT_API_TOKEN` setado no Railway
- [ ] 8 custom fields criados → IDs colados nas envs `MANYCHAT_FIELD_*`
- [ ] 34 tags criadas (ou geradas no primeiro `addTagByName`)
- [ ] Flow B "Reengajamento 50% off" criado, `flow_ns` colado em `MANYCHAT_FLOW_REENGAGE`
- [ ] Pelo menos 1 subscriber tem `external_id` populado
- [ ] Teste end-to-end retornou `sent:1` e a mensagem chegou no chat
- [ ] `/admin/passaporte` mostra contador "Enviados" > 0

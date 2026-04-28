# 🚂 Railway Cron Jobs — Passaporte de Autoconhecimento

> Como o deploy principal é no Railway (e o upgrade já foi feito), use **Cron Jobs** do Railway em vez do `vercel.json`.
> O `vercel.json` continua no repo só para compatibilidade caso você decida espelhar para Vercel.

---

## Pré-requisitos (uma vez só)

No projeto Railway, em **Variables**, garanta que existem:

- `CRON_SECRET` — qualquer string aleatória forte (ex: `openssl rand -hex 32`).
- `APP_URL` — `https://mapacomportamental.com` (sem barra no fim).

Essas variáveis precisam ser **compartilhadas com os 2 cron services**.
A forma mais simples: adicione no service principal e use **shared variables** no projeto, ou simplesmente repita os valores em cada cron service.

---

## Como criar no Railway

1. No projeto Railway, **+ New Service** → **Empty service**.
2. Em **Settings → Service → Cron Schedule**, defina o schedule (cron syntax).
3. Em **Settings → Service → Custom Start Command**, defina o comando que faz o `curl` para a rota.
4. Em **Variables**, adicione `CRON_SECRET` e `APP_URL` (ou ative shared vars).
5. Em **Settings → Source**, deixe vazio — não precisa de repo, é só um `curl`.
6. Salve. O service vai parar e ligar conforme o schedule.

---

## Service 1 — Expirar passaporte (diário, 03:00 UTC)

| Campo                | Valor                                                            |
| -------------------- | ---------------------------------------------------------------- |
| **Service name**     | `cron-expire-passport`                                           |
| **Cron Schedule**    | `0 3 * * *`                                                      |
| **Start Command**    | `curl -fsS -H "Authorization: Bearer $CRON_SECRET" "$APP_URL/api/cron/expire-passport"` |
| **Variáveis necessárias** | `CRON_SECRET`, `APP_URL` (use a mesma do app Next.js)        |

---

## Service 2 — Processar outreach (a cada 15 min)

| Campo                | Valor                                                             |
| -------------------- | ----------------------------------------------------------------- |
| **Service name**     | `cron-process-outreach`                                           |
| **Cron Schedule**    | `*/15 * * * *`                                                    |
| **Start Command**    | `curl -fsS -H "Authorization: Bearer $CRON_SECRET" "$APP_URL/api/cron/process-outreach"` |

---

## Por que assim e não dentro do app

Railway cobra Cron Jobs como serviço separado (centavos/mês). Manter o cron isolado do app Next.js evita 2 problemas:

1. **Não duplica execução** quando você escala o app para 2+ replicas.
2. **Falha do cron não derruba o app** (e vice-versa).
3. Logs separados — fica fácil ver "rodou? falhou? quanto tempo?".

---

## Validação manual (sem esperar o schedule)

Para testar localmente ou em produção, dispare via curl:

```bash
# Local (dev)
curl -H "Authorization: Bearer $CRON_SECRET" \
     http://localhost:3000/api/cron/expire-passport

# Produção
curl -H "Authorization: Bearer $CRON_SECRET" \
     https://mapacomportamental.com/api/cron/expire-passport

# Outreach
curl -H "Authorization: Bearer $CRON_SECRET" \
     https://mapacomportamental.com/api/cron/process-outreach
```

Respostas esperadas:

- `expire-passport`: `{ "ok": true, "expiredGrants": <n>, "affectedCompanies": <n> }`
- `process-outreach`: `{ "ok": true, "processed": <n>, "sent": <n>, "failed": <n> }`

Se o retorno for `{"error":"Unauthorized"}` (HTTP 401), o `CRON_SECRET` está
divergente entre o cron service e o app principal — aí é só sincronizar.

---

## Checklist final

- [ ] `CRON_SECRET` setado no app Next.js principal
- [ ] `CRON_SECRET` (mesmo valor) setado nos 2 cron services
- [ ] `APP_URL=https://mapacomportamental.com` nos 2 cron services
- [ ] `cron-expire-passport` com schedule `0 3 * * *`
- [ ] `cron-process-outreach` com schedule `*/15 * * * *`
- [ ] Disparou os 2 manualmente via curl e ambos retornaram `{"ok":true,...}`
- [ ] No painel `/admin/passaporte`, a aba "Outreach" mostra contadores reais

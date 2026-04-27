# 🚂 Railway Cron Jobs — Passaporte de Autoconhecimento

> Como o deploy principal é no Railway (e o upgrade já foi feito), use **Cron Jobs** do Railway em vez do `vercel.json`.
> O `vercel.json` continua no repo só para compatibilidade caso você decida espelhar para Vercel.

---

## Como criar no Railway

1. No projeto Railway, **Add a service** → **Empty service**.
2. Em **Settings → Source**, conecte o **mesmo repositório** do app Next.js.
3. Em **Settings → Cron Schedule**, defina o schedule (cron syntax).
4. Em **Settings → Custom Start Command**, defina o comando que faz o `curl` para a rota.

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
     https://app.mapacomportamental.com.br/api/cron/expire-passport
```

Resposta esperada: `{ "ok": true, "expiredGrants": 0, "affectedCompanies": 0 }`.

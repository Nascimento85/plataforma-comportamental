# 🚀 Setup — Ambiente de Desenvolvimento Local

Guia rápido para rodar a plataforma **sem Supabase, sem Stripe** (SQLite local).

---

## Pré-requisitos

- Node.js 18+
- npm 9+

---

## Passo a Passo

### 1. Instalar dependências

```bash
npm install
```

### 2. Ativar o schema SQLite

```bash
cp prisma/schema.dev.prisma prisma/schema.prisma
```

> ⚠️ **Não suba o `prisma/schema.prisma` para produção** após este passo — ele usa SQLite.
> Para produção use o `schema.prisma` original com PostgreSQL.

### 3. Criar o banco de dados local

```bash
npx prisma db push
```

Isso cria o arquivo `prisma/dev.db` com todas as tabelas.

### 4. Popular com dados de teste

```bash
npm run db:seed
```

Cria automaticamente:
- **Empresa:** `admin@teste.com` / senha: `teste123`
- **5 funcionários** com avaliações pendentes
- **10 créditos** de saldo inicial
- **Links de teste** prontos para usar

### 5. Iniciar o servidor

```bash
cp .env.development .env.local
npm run dev
```

Acesse: **http://localhost:3000**

---

## Links de Teste (após seed)

| Tipo | URL |
|------|-----|
| DISC | http://localhost:3000/test/test-token-disc-0000-000000000001 |
| MBTI | http://localhost:3000/test/test-token-mbti-0000-000000000002 |
| Eneagrama | http://localhost:3000/test/test-token-enng-0000-000000000003 |
| Temperamentos | http://localhost:3000/test/test-token-temp-0000-000000000004 |

---

## Rodar os Testes das Engines

```bash
npm test
```

Executa 24 testes unitários que validam:
- ✅ DISC — pontuação, ranking, perfil predominante
- ✅ MBTI — 70 questões, 4 dimensões, 16 tipos
- ✅ Eneagrama — 135 afirmações, 9 tipos, escala 1-5
- ✅ Temperamentos — 25 questões, 4 perfis, A/C/I/O

---

## Scripts disponíveis

| Script | Descrição |
|--------|-----------|
| `npm run dev` | Servidor Next.js em modo dev |
| `npm test` | Roda testes das engines |
| `npm run db:push` | Sincroniza schema com banco |
| `npm run db:push:dev` | Sincroniza usando schema SQLite |
| `npm run db:seed` | Popula banco com dados de teste |
| `npm run db:studio` | Abre Prisma Studio (visualizador do banco) |
| `npm run build` | Build de produção |

---

## Estrutura do banco de dados local

```
prisma/
├── schema.prisma        # PostgreSQL (produção)
├── schema.dev.prisma    # SQLite (desenvolvimento)
├── seed.ts              # Script de dados de teste
└── dev.db               # Banco SQLite (gerado automaticamente)
```

---

## Configurar Stripe (opcional)

Para testar o fluxo de compra de créditos:

1. Crie uma conta em https://stripe.com
2. Ative o modo **Test**
3. Copie as chaves para `.env.local`
4. Instale a CLI: `npm install -g stripe`
5. Rode: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`
6. Crie 4 produtos no dashboard do Stripe e atualize os Price IDs

> Sem o Stripe configurado, o dashboard e os testes funcionam normalmente — só o checkout de créditos retornará erro.

---

## Visualizar o banco de dados

```bash
npm run db:studio
```

Abre uma interface web em http://localhost:5555 para visualizar e editar os dados.

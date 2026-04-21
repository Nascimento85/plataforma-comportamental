# Plataforma Comportamental — Setup Guide

SaaS de avaliações comportamentais: **DISC · MBTI · Eneagrama · 4 Temperamentos**

---

## Stack

| Camada | Tecnologia |
|--------|-----------|
| Framework | Next.js 14 (App Router) |
| ORM | Prisma |
| Banco | Supabase (PostgreSQL) |
| Auth | NextAuth v5 (JWT) |
| Storage | Supabase Storage |
| Pagamentos | Stripe |
| PDF | @react-pdf/renderer |
| Deploy | Vercel |

---

## Pré-requisitos

- Node.js 18+
- Conta Supabase (free tier funciona)
- Conta Stripe (modo test)
- Vercel CLI (opcional para deploy)

---

## 1 · Instalar dependências

```bash
npm install
```

### Dependências principais
```bash
npm install next@14 react react-dom typescript
npm install @prisma/client prisma
npm install @supabase/supabase-js
npm install next-auth@5.0.0-beta
npm install stripe @stripe/stripe-js
npm install @react-pdf/renderer
npm install bcryptjs zod uuid
npm install lucide-react

npm install -D @types/bcryptjs @types/uuid tailwindcss postcss autoprefixer
```

---

## 2 · Configurar variáveis de ambiente

```bash
cp .env.example .env.local
```

Edite `.env.local` com suas credenciais:

```env
# Supabase
DATABASE_URL="postgresql://postgres:[senha]@db.[ref].supabase.co:5432/postgres"
NEXT_PUBLIC_SUPABASE_URL="https://[ref].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="..."
SUPABASE_SERVICE_ROLE_KEY="..."

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="$(openssl rand -base64 32)"

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."

# Stripe — IDs dos preços dos pacotes
STRIPE_PRICE_PACK_5="price_..."
STRIPE_PRICE_PACK_10="price_..."
STRIPE_PRICE_PACK_25="price_..."
STRIPE_PRICE_PACK_50="price_..."

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

---

## 3 · Configurar Supabase

### 3.1 Banco de dados — Prisma

```bash
# Gera o client Prisma
npx prisma generate

# Cria as tabelas no banco (Supabase)
npx prisma db push
```

### 3.2 Storage — bucket para PDFs

No dashboard do Supabase:
1. Vá em **Storage**
2. Crie um bucket chamado **`reports`**
3. Configure como **público** (ou privado com signed URLs)

---

## 4 · Configurar Stripe

### 4.1 Criar produtos e preços

No dashboard do Stripe:
1. Vá em **Products** → **Add Product**
2. Crie 4 produtos (5, 10, 25 e 50 créditos)
3. Copie os **Price IDs** para o `.env.local`

### 4.2 Configurar webhook (desenvolvimento local)

```bash
# Instala o Stripe CLI
brew install stripe/stripe-cli/stripe

# Faz login
stripe login

# Encaminha eventos para localhost
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

O comando vai exibir o `STRIPE_WEBHOOK_SECRET` — copie para o `.env.local`.

---

## 5 · Rodar em desenvolvimento

```bash
npm run dev
```

Acesse: http://localhost:3000

---

## 6 · Estrutura de rotas

| Rota | Descrição |
|------|-----------|
| `/login` | Login da empresa |
| `/register` | Cadastro de empresa |
| `/dashboard` | Painel principal (métricas) |
| `/dashboard/assessments` | Lista e cria avaliações |
| `/dashboard/credits` | Saldo e compra de créditos |
| `/test/[token]` | Teste do colaborador (sem login) |
| `GET /api/results/[id]/pdf` | Download do relatório PDF |
| `POST /api/assessments` | Cria avaliação + debita crédito |
| `POST /api/results` | Processa respostas + gera PDF |
| `POST /api/credits/checkout` | Inicia pagamento Stripe |
| `POST /api/webhooks/stripe` | Recebe confirmação de pagamento |

---

## 7 · Fluxo completo

```
Empresa cria conta → Compra créditos (Stripe) →
→ Nova avaliação (funcionário + tipo) → Link gerado →
→ Funcionário acessa /test/[token] → Responde o teste →
→ API calcula resultado → Gera PDF → Upload Supabase →
→ Empresa baixa relatório no dashboard
```

---

## 8 · Deploy no Vercel

```bash
# Instala Vercel CLI
npm install -g vercel

# Deploy
vercel

# Configura variáveis de ambiente no dashboard do Vercel
# (mesmas do .env.local, exceto NEXTAUTH_URL → usar URL de produção)
```

**Lembrar após deploy:**
- Atualizar `NEXTAUTH_URL` para a URL da Vercel
- Atualizar `NEXT_PUBLIC_APP_URL` para a URL da Vercel
- Adicionar URL de produção nos webhooks do Stripe

---

## 9 · Testes das engines (sem banco)

```bash
# Teste rápido das engines de cálculo
npx ts-node -e "
const { calculateDisc } = require('./src/lib/engines/disc')
console.log('DISC Engine:', typeof calculateDisc)
"
```

---

## 10 · Estrutura de arquivos

```
src/
├── app/
│   ├── (auth)/login/        # Login
│   ├── (auth)/register/     # Cadastro
│   ├── (dashboard)/         # Área da empresa (protegida)
│   │   ├── page.tsx         # Dashboard com métricas
│   │   ├── assessments/     # Gerenciar avaliações
│   │   └── credits/         # Créditos e pagamentos
│   ├── test/[token]/        # Teste do colaborador (público)
│   └── api/                 # API Routes
├── lib/
│   ├── engines/             # Motores de cálculo (DISC/MBTI/etc)
│   ├── pdf/                 # Geração de relatórios PDF
│   ├── prisma.ts            # DB client
│   ├── supabase.ts          # Storage client
│   └── auth.ts              # NextAuth config
└── components/
    ├── tests/               # Componentes interativos de teste
    └── ui/                  # Componentes de UI reutilizáveis
```

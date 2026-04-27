# 📥 Guia da Área de Downloads (Híbrida: Canva + Capa Dinâmica)

## Como funciona

```
┌──────────────────────────────────┐
│   Usuário compra Premium         │
│   (Stripe webhook → ReportUnlock)│
└──────────────────────────────────┘
              │
              ▼
┌──────────────────────────────────┐
│  Página /result/[id]/premium     │
│  Cards "Baixar PDF personalizado"│
└──────────────────────────────────┘
              │
              ▼
┌──────────────────────────────────┐
│  GET /api/downloads/[slug]       │
│  ?reportId=xxx                   │
└──────────────────────────────────┘
              │
              ├─ valida ReportUnlock
              ├─ busca asset por slug em DISC_PREMIUM
              ├─ gera CAPA com nome + perfil    ← @react-pdf/renderer
              ├─ baixa PDF base do Storage      ← Supabase
              ├─ mescla capa + base             ← pdf-lib
              ▼
┌──────────────────────────────────┐
│   PDF mesclado entregue          │
│   filename: mapa-comportamental_ │
│             D_playbook-X.pdf     │
└──────────────────────────────────┘
```

---

## 1️⃣ Setup do bucket no Supabase (uma vez)

1. Supabase → **Storage** → **New bucket**
2. Name: **`downloads`**
3. Public: **OFF** (privado, só com Service Role)
4. **Save**

---

## 2️⃣ Estrutura de pastas no bucket

```
downloads/
└── disc/
    ├── dominant/
    │   ├── playbook-comando-vs-situacional.pdf
    │   ├── checklist-manha-do-executor.pdf
    │   └── apostila-cnv-dominantes.pdf
    ├── influencer/
    │   ├── ebook-carisma-ao-lucro.pdf
    │   ├── checklist-organizacao-criativos.pdf
    │   └── apostila-narrativa-de-marca.pdf
    ├── stable/
    │   ├── playbook-lideranca-silenciosa.pdf
    │   ├── questionario-saude-emocional.pdf
    │   └── apostila-decisao-rapida.pdf
    └── analyst/
        ├── apostila-simplificando-perfeicao.pdf
        ├── guia-comunicacao-agil.pdf
        └── checklist-criterios-decisao.pdf
```

> Os caminhos exatos estão em cada `src/content/disc/*.ts` no campo `storagePath`.

---

## 3️⃣ Como diagramar cada PDF no Canva

### Padrão visual (mesma paleta para todos)

| Elemento | Especificação |
| --- | --- |
| **Tamanho da página** | A4 (21cm × 29.7cm), PDF Print |
| **Paleta primária** | Terracota `#A8522E`, Dourado `#D4943A`, Areia `#E9DEC8` |
| **Fundo padrão** | `#FAF6EE` (creme) |
| **Texto principal** | Carvão `#1C1A17` |
| **Tipografia (display)** | Cormorant Garamond ou similar serif |
| **Tipografia (corpo)** | Inter, Lora ou similar sans/serif |
| **Cabeçalho de cada página** | Logo Mapa Comportamental no canto superior direito |
| **Rodapé** | "Direitos Reservados — Passaporte de Autoconhecimento" |
| **Marca d'água** | Sutil (8-12% opacidade) — bússola, glifo do perfil |

### NÃO inclua a capa de "para Kênio"

A capa personalizada é gerada AUTOMATICAMENTE pelo backend (com nome + perfil + data). O seu PDF do Canva **começa direto pelo conteúdo** (ex: "1. O paradoxo do Executor — por que sua eficiência tem teto").

---

## 4️⃣ Conteúdo sugerido por material

O conteúdo (sumário e tópicos) está em `src/content/disc/*.ts` no campo `toc`. Use isso como roteiro.

### Exemplo — Dominante / Playbook

```
Página 1: 1. O paradoxo do Executor — por que sua eficiência tem teto
Página 3: 2. Os 4 níveis de delegação — quando cada um se aplica
Página 6: 3. Diagnóstico de maturidade do liderado (template imprimível)
Página 9: 4. O método 1-3-1 de feedback de alto desempenho
Página 12: 5. Reuniões 1:1 — roteiro de 30 min que substitui 4h de microgerência
Página 15: 6. Como demitir sem destruir o time (e sem culpa)
Página 18: 7. KPIs de liderança que você não pode ignorar
Página 21: 8. Estudo de caso: 3 Dominantes que viraram CEOs
Página 23: Anexo A: 12 frases para usar nas reuniões 1:1
Página 24: Anexo B: Modelo de OKR para times comandados por D
```

> Nem precisa preencher TODO o conteúdo — pode começar com o **template** do Canva (capa, índice, headings de cada seção, rodapé) e ir aprofundando depois. Quanto mais texto direto e prático, melhor — o Dominante odeia floreio.

---

## 5️⃣ Upload no Supabase

1. Supabase → **Storage** → **downloads**
2. Crie a estrutura de pastas (botão **Create folder**): `disc` → `dominant` → … etc.
3. Em cada pasta, **Upload file** → escolha o PDF do Canva.
4. Confirme que o **nome do arquivo bate exatamente** com o `storagePath` no código.

> Se o nome estiver errado, o backend retorna erro 503 com a mensagem "PDF base ainda não foi enviado para o servidor."

---

## 6️⃣ Testar o download

Em um relatório com `ReportUnlock` ativo, abra:

```
https://mapacomportamental.com/api/downloads/playbook-comando-vs-situacional?reportId=COLE_O_ID_AQUI
```

O navegador vai baixar `mapa-comportamental_D_playbook-lideranca.pdf` com:
- 1ª página: capa personalizada com seu nome + perfil + data
- 2ª página em diante: conteúdo do Canva

---

## 7️⃣ Adicionar mais downloads no futuro

Para acrescentar materiais para outros testes (Eneagrama, MBTI, etc.):

1. Estenda `src/content/<test>/premium.ts` com array `downloads` no mesmo padrão.
2. Atualize `src/lib/downloads-registry.ts` para também procurar lá.
3. Suba os PDFs base no Storage seguindo a mesma estrutura.
4. Pronto — o endpoint genérico `/api/downloads/[slug]` cobre tudo.

---

## ⚠️ Erros conhecidos & como resolver

| Erro retornado pelo endpoint | Causa | Solução |
| --- | --- | --- |
| `402 Relatório não desbloqueado` | Usuário não pagou Premium | Comprar / criar `ReportUnlock` manual |
| `404 Material não encontrado` | Slug não existe em `DISC_PREMIUM` | Conferir grafia ou adicionar o asset |
| `503 PDF base ainda não foi enviado` | Falta upload no Supabase Storage | Subir o arquivo no caminho correto |
| `500 Erro ao gerar PDF` | Erro de runtime (server logs) | Ver logs do Railway |

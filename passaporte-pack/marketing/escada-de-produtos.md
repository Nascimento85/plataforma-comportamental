# 🪜 Escada de Produtos — Mapa Comportamental

> Estratégia de monetização do Mapa Comportamental:
> de **R$ 0** (entrada via Passaporte) → **R$ 47** (Premium individual) →
> **R$ 67** (Box de nicho) → **R$ 97** (Combo Mapa Completo) → **R$ 197+** (Bundle de Times).

---

## 🪙 DEGRAU 1 — Entrada (Passaporte de Autoconhecimento)

**Preço:** R$ 0 (10 créditos grátis, válidos por 7 dias).

**Promessa:** "Descubra o seu primeiro perfil em 4 minutos."

**Como o usuário gasta:**
- 1 teste DISC (3 créd)
- 1 teste de Linguagens do Amor (5 créd)
- 1 teste rápido (Eneagrama / MBTI / Carreira)

**Sair daqui sem comprar = expirar em 7 dias = entra no fluxo de cupom 50% off.**

---

## 💎 DEGRAU 2 — Upsell Individual

**Preço:** R$ 29,90 (oferta inicial) → R$ 47,00 (preço cheio).

**Quando aparece:** pop-up imediato após o Relatório Básico (Camada 4 do passaporte-pack).

**O que entrega (por teste):**
- DISC Premium ou Linguagens Premium ou Arquétipos Premium etc.
- 3 materiais para download por relatório (Playbook + Checklist + Apostila).
- PDI de 21 dias.

**Conversão alvo:** 12-18% dos que terminam o teste básico.

---

## 🎁 DEGRAU 3 — Box de Nicho (Combo direcionado)

**Preço:** R$ 67,00.

**Quando aparece:** depois que o usuário comprou 1 Premium ou consumiu 6+ créditos sem comprar.

### Box de Relacionamento (público feminino)
- Linguagens do Amor Premium
- E-book: "Como se comunicar com cada perfil DISC no amor"
- Playbook: "Ativação do Arquétipo de Amante"
- Mini-curso 7 dias (áudio): "Conexão Profunda"

### Box de Carreira (D + C + Influente)
- DISC Premium
- MBTI Premium
- E-book: "Negociação para o seu perfil"
- Playbook: "Manhã do Executor"

### Box de Equilíbrio (S + Eneagrama + Temperamentos)
- 4 Temperamentos Premium
- Eneagrama Premium
- E-book: "A Sabedoria do Pilar Silencioso"
- Questionário semanal de Saúde Emocional

**Conversão alvo:** 8-10% sobre quem comprou Premium individual.

---

## 🏆 DEGRAU 4 — Combo Mapa Completo

**Preço:** R$ 97,00.

**Pitch:** _"Os 6 Relatórios Premium + Todos os E-books e Playbooks da Plataforma."_

**Inclui:**
- DISC Premium (4 perfis em 1 PDF unificado)
- 4 Temperamentos Premium
- Eneagrama Premium (9 tipos resumidos + tipo do usuário detalhado)
- MBTI Premium (16 tipos resumidos + tipo do usuário detalhado)
- 5 Linguagens Premium
- 12 Arquétipos Premium
- **Bonus:** Plano de Desenvolvimento Cruzado (correlaciona DISC + Eneagrama + Arquétipos)

**Quando aparece:** após 2ª compra OU oferta de aniversário OU lançamento sazonal.

**Conversão alvo:** 4-6% de quem já comprou pelo menos 1 produto.

---

## 👥 DEGRAU 5 — Bundle de Times (B2B)

**Preço:** R$ 197,00 (5 colaboradores) → R$ 497,00 (20 colaboradores) → R$ 997,00 (50 colaboradores).

**Pitch:** _"Mapeie sua equipe e receba o **Mapa de Compatibilidade Cruzada**."_

**Inclui:**
- Combo Mapa Completo para CADA colaborador
- Mapa de compatibilidade (matriz de DISC + MBTI cruzados)
- Painel administrativo do gestor
- 1h de consultoria com especialista
- Sessão de devolutiva em vídeo

**Quem oferta:** vendedor humano. Saiu do automatizado.

**Conversão alvo:** 1-2% dos compradores individuais que indicam empresa.

---

## 📊 LTV ESPERADO POR USUÁRIO

| Cenário             | Probabilidade | Valor médio | Contribuição |
| ------------------- | ------------- | ----------- | ------------ |
| Só Passaporte (0)   | 70%           | R$ 0        | R$ 0         |
| Premium individual  | 18%           | R$ 47       | R$ 8,46      |
| Box de Nicho        | 8%            | R$ 67       | R$ 5,36      |
| Combo Completo      | 3%            | R$ 97       | R$ 2,91      |
| Bundle de Times     | 1%            | R$ 297       | R$ 2,97     |
| **LTV médio/usuário** |              |             | **R$ 19,70** |

**Para CAC saudável:** mantenha custo de aquisição ≤ R$ 8,00 (40% do LTV).

---

## 🎯 PULO DO GATO — UPSELL POR CONTEXTO

Ao invés de oferecer SEMPRE o mesmo upgrade:

```ts
function nextOffer(state) {
  // 1. Acabou de fazer DISC e é Dominante → carreira
  if (state.lastTest === 'DISC' && state.profile === 'D')
    return 'box_carreira'

  // 2. Fez Linguagens do Amor (público feminino) → relacionamento
  if (state.lastTest === 'LOVE_LANGUAGES')
    return 'box_relacionamento'

  // 3. Fez 2+ testes diferentes → combo completo
  if (state.completedTests.length >= 2)
    return 'combo_mapa_completo'

  // 4. Empresa cadastrada como PJ → bundle de times
  if (state.companyType === 'PJ')
    return 'bundle_times'

  // default: premium individual do último teste
  return `premium_${state.lastTest}`
}
```

> Implemente em `src/lib/offers.ts` consumido pelo `<UpsellPopup />`.

---

## 📌 LANÇAMENTO ESCALONADO RECOMENDADO

| Semana | Lançar                                    | Motivo                                                                  |
| ------ | ----------------------------------------- | ----------------------------------------------------------------------- |
| 1      | Premium DISC + Premium Linguagens         | Bolso (carreira) + Coração (relacionamento). Mais convertem em pago.    |
| 2      | Box Relacionamento (público feminino)     | Aproveita tráfego do Reels Linguagens.                                  |
| 3      | Premium Arquétipos + Cards Sombra         | Carrossel viral (alto alcance).                                         |
| 4      | Premium Temperamentos                     | Tema viral (alimentação + ansiedade).                                   |
| 5      | Premium Eneagrama + Subtipos              | Públicos profundos retornam para entender níveis.                       |
| 6      | Premium MBTI + Carreiras                  | Atrai público profissional (LinkedIn).                                  |
| 7      | Combo Mapa Completo (R$ 97)               | Lançamento "Black" — desconto sobre soma dos individuais (R$ 282 → 97). |
| 8      | Bundle de Times (B2B)                     | Aciona base de quem é PJ.                                                |

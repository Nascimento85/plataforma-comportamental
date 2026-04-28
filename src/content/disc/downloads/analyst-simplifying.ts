// ============================================================
// Apostila Premium — Analista (C)
// "Simplificando a Perfeição"
// ~28 páginas. Para o Analista que quer entregar 5x mais sem trair seus padrões.
// ============================================================

import type { PdfBody } from '../types'

export const analystSimplifyingBody: PdfBody = {
  runningTitle: 'Simplificando a Perfeição · C',

  epigraph: {
    text:
      'Sua precisão é dom. Mas perfeição infinita é sabotagem disfarçada. ' +
      'Esse manual te ensina a manter seus padrões SEM virar gargalo.',
  },

  chapters: [
    {
      number: 1,
      title: 'Por Que 80% Bem Feito Vence 100% Adiado',
      subtitle: 'A matemática brutal da paralisia por análise',
      blocks: [
        {
          type: 'lead',
          text:
            'Esse capítulo NÃO é sobre baixar seus padrões. É sobre fazer a matemática ' +
            'que você nunca fez: o custo REAL de adiar entregas para "fazer melhor".',
        },
        {
          type: 'h2',
          text: 'A regra do retorno decrescente',
        },
        {
          type: 'p',
          text:
            'Em qualquer trabalho intelectual, existe uma curva de retorno: as primeiras ' +
            'horas geram 80% do valor. As últimas horas geram apenas 5-10% adicional. ' +
            'Você gasta 5x MAIS tempo para ganhar 1.2x mais qualidade.',
        },
        {
          type: 'kv',
          items: [
            { k: 'Hora 1-4',  v: '0% → 60% de qualidade. Retorno: ALTO.' },
            { k: 'Hora 5-8',  v: '60% → 80% de qualidade. Retorno: BOM.' },
            { k: 'Hora 9-16', v: '80% → 92% de qualidade. Retorno: BAIXO.' },
            { k: 'Hora 17+',  v: '92% → 95% de qualidade. Retorno: PIFIO.' },
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          text:
            'Você gastou 4x mais tempo para subir 12 pontos de qualidade que NINGUÉM ' +
            'vai notar. Esse é o custo real do perfeccionismo.',
        },
        {
          type: 'h2',
          text: 'O que perfeccionismo CUSTA',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Volume de entrega: você produz 30% do que poderia produzir',
            'Visibilidade: ninguém vê seu trabalho porque você não solta',
            'Promoção: empresas premiam quem ENTREGA, não quem ainda está finalizando',
            'Saúde: ansiedade crônica de "ainda não está bom"',
            'Renda: você cobra por hora porque seu trabalho não é "mostrável"',
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          text:
            'Métrica de sanidade: nas últimas 30 entregas, em quantas você gastou >2x ' +
            'o tempo necessário "para deixar perfeito"? Se for >50%, está em paralisia ' +
            'por análise crônica.',
        },
      ],
    },

    {
      number: 2,
      title: 'Decisões Reversíveis vs Irreversíveis',
      subtitle: 'Framework para escolher rigor proporcional',
      blocks: [
        {
          type: 'lead',
          text:
            'Você aplica o MESMO nível de rigor para mudar a cor de um botão e para ' +
            'estruturar uma fusão de empresa. Isso é desperdício gigante. Aprenda a ' +
            'CALIBRAR rigor por tipo de decisão.',
        },
        {
          type: 'h2',
          text: 'DECISÕES REVERSÍVEIS — rigor BAIXO',
        },
        {
          type: 'list',
          items: [
            'Mudar processo experimentalmente',
            'Testar hipótese de produto',
            'Escolher fornecedor por projeto curto',
            'Definir formato de reunião',
            'Mudar ferramenta de equipe',
          ],
        },
        {
          type: 'callout',
          tone: 'do',
          text:
            'Decida em UMA reunião. Aplique. Avalie em 2 semanas. Ajuste. Custo de errar ' +
            '< custo de adiar.',
        },
        {
          type: 'h2',
          text: 'DECISÕES IRREVERSÍVEIS — rigor ALTO',
        },
        {
          type: 'list',
          items: [
            'Demitir alguém com 5+ anos de empresa',
            'Vender ativo significativo',
            'Migrar arquitetura de produto inteiro',
            'Casamento, filhos, mudança de país',
            'Cirurgia de risco',
          ],
        },
        {
          type: 'callout',
          tone: 'do',
          text:
            'Aqui APLIQUE seu rigor analítico. Pesquise 3 meses. Consulte. Modele cenários. ' +
            'Você foi feito para isso.',
        },
        {
          type: 'h2',
          text: 'A pergunta-âncora',
        },
        {
          type: 'p',
          text:
            'Antes de qualquer decisão, pergunte: "se eu errar, em quantos dias eu volto ' +
            'atrás?" — se a resposta for <30 dias, é REVERSÍVEL. Decida rápido.',
        },
      ],
    },

    {
      number: 3,
      title: 'Pré-mortem em 15 Minutos',
      subtitle: 'A técnica que te dá 80% da segurança em 20% do tempo',
      blocks: [
        {
          type: 'lead',
          text:
            'Pré-mortem é IMAGINAR que a decisão deu errado e listar os porquês. Em ' +
            '15 min você antecipa 80% dos riscos — sem precisar pesquisar 4 semanas.',
        },
        {
          type: 'h2',
          text: 'Como fazer (passo a passo)',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Marque 15 min sozinho. Sem distração',
            'Imagine que estamos 6 meses no futuro e a decisão DEU MUITO ERRADO',
            'Liste 5-7 razões pelas quais teria dado errado',
            'Para cada razão, defina 1 ação preventiva HOJE',
            'Decida se as preventivas são exequíveis. Se sim, AVANCE',
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          text:
            'Pré-mortem é o atalho do Analista: usa sua força (análise de risco) sem ' +
            'cair na sua armadilha (análise infinita). 15 min, 7 riscos, 7 preventivas, ' +
            'decisão.',
        },
      ],
    },

    {
      number: 4,
      title: 'Como Cortar 50% de Qualquer Documento',
      subtitle: 'Sem perder essência',
      blocks: [
        {
          type: 'lead',
          text:
            'Analista escreve documento de 50 páginas que ninguém lê. Aprende aqui a ' +
            'cortar 50% mantendo TODA mensagem essencial. Documento curto é ouvido — ' +
            'documento longo é ignorado.',
        },
        {
          type: 'h2',
          text: '5 técnicas de corte',
        },
        {
          type: 'h3',
          text: '1. ELIMINE adjetivos e advérbios',
        },
        {
          type: 'kv',
          items: [
            { k: 'Antes', v: '"O processo é extremamente robusto e altamente eficiente"' },
            { k: 'Depois', v: '"O processo é robusto e eficiente"' },
          ],
        },
        {
          type: 'h3',
          text: '2. SUBSTITUA "para" por verbo direto',
        },
        {
          type: 'kv',
          items: [
            { k: 'Antes', v: '"Para que possamos garantir que…"' },
            { k: 'Depois', v: '"Garantir que…"' },
          ],
        },
        {
          type: 'h3',
          text: '3. CONSOLIDE listas',
        },
        {
          type: 'kv',
          items: [
            { k: 'Antes', v: '7 bullets, alguns repetindo' },
            { k: 'Depois', v: '3 bullets, cada um agrupando 2-3 do original' },
          ],
        },
        {
          type: 'h3',
          text: '4. APAGUE "como já mencionado"',
        },
        {
          type: 'kv',
          items: [
            { k: 'Antes', v: '"Como já mencionado anteriormente, o ponto X…"' },
            { k: 'Depois', v: '"O ponto X…"' },
          ],
        },
        {
          type: 'h3',
          text: '5. ELIMINE seções que NÃO informam decisão',
        },
        {
          type: 'p',
          text:
            'Para cada seção, pergunte: "essa seção MUDA a decisão de quem lê?" — se ' +
            'não muda, corta. Mesmo que esteja bem escrita.',
        },
        {
          type: 'callout',
          tone: 'do',
          text:
            'Teste prático: pegue um documento seu de 10 pp. Corte para 5 pp aplicando ' +
            'as 5 técnicas. Releia: você perdeu informação ESSENCIAL? Quase nunca.',
        },
      ],
    },

    {
      number: 5,
      title: 'MVP Intelectual',
      subtitle: 'Lançar versão 0.7 com plano de ajuste',
      blocks: [
        {
          type: 'lead',
          text:
            'Tech vendeu para o mundo o conceito de MVP — Minimum Viable Product. Mas ' +
            'o Analista esqueceu que isso vale para TUDO: relatório, palestra, processo, ' +
            'apresentação. Aprenda a lançar versão 0.7 SEM que vire trabalho mal feito.',
        },
        {
          type: 'h2',
          text: 'O que é MVP intelectual',
        },
        {
          type: 'p',
          text:
            'É a versão MÍNIMA do seu trabalho que cumpre o objetivo central — sem 100% ' +
            'dos refinamentos. Ela serve, gera feedback REAL, e os 30% finais você ' +
            'ajusta DEPOIS — com dado, não com hipótese.',
        },
        {
          type: 'h2',
          text: 'Exemplos por tipo de entrega',
        },
        {
          type: 'kv',
          items: [
            { k: 'Relatório',     v: '5 páginas com conclusões CHAVE > 50 páginas exaustivas' },
            { k: 'Apresentação',  v: '8 slides com história clara > 40 slides com tudo' },
            { k: 'Documento de processo', v: '1 fluxograma + 5 decisões > manual de 30 páginas' },
            { k: 'Pesquisa de mercado',  v: '3 insights acionáveis > 200 dados sem hierarquia' },
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          text:
            'Pergunte ao seu cliente/chefe: "qual é o NÍVEL DE PROFUNDIDADE necessário ' +
            'para você decidir?" — em 80% dos casos a resposta é MENOR do que o seu reflexo. ' +
            'Calibre por isso.',
        },
      ],
    },

    {
      number: 6,
      title: 'Quando NÃO Comprimir',
      subtitle: 'Decisões irreversíveis exigem rigor total',
      blocks: [
        {
          type: 'lead',
          text:
            'Esse capítulo é o oposto: quando NÃO simplificar. Há momentos em que ' +
            'aprofundar é a coisa certa.',
        },
        {
          type: 'h2',
          text: 'Sinais de que MERECE rigor total',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'A decisão é irreversível em <12 meses',
            'O custo de errar é >R$ 1M ou afeta >50 pessoas',
            'Há vidas em jogo (médico, segurança, jurídico)',
            'Há regulação ou compliance obrigatórios',
            'O dado público é insuficiente — você terá que coletar primário',
          ],
        },
        {
          type: 'callout',
          tone: 'do',
          text:
            'Para esses 5 sinais, USE seu superpoder. Pesquise 90 dias. Modele 5 cenários. ' +
            'Consulte 3 especialistas. Você foi feito para isso. Apenas saiba CALIBRAR ' +
            'quando aplicar — e quando soltar.',
        },
      ],
    },

    {
      number: 7,
      title: 'Estudo de Caso',
      subtitle: '3 Analistas que viraram CTOs/Diretores',
      blocks: [
        {
          type: 'h2',
          text: 'Caso 1 — Felipe, 34 → 39 anos',
        },
        {
          type: 'p',
          text:
            'Engenheiro de software sênior travado havia 5 anos. "Faz tudo perfeito mas ' +
            'demora demais". Aplicou MVP intelectual em todas as entregas. Em 18 meses, ' +
            'o volume de output dobrou. Em 3 anos, virou Head of Engineering.',
        },
        {
          type: 'h2',
          text: 'Caso 2 — Aline, 41 → 44 anos',
        },
        {
          type: 'p',
          text:
            'Pesquisadora corporativa, 100 páginas por relatório. Ninguém lia. Treinou ' +
            'a entregar versão de 5 páginas com 3 insights — e versão completa apenas ' +
            'sob demanda. Em 12 meses, virou Diretora de Estratégia. Reconhecimento ' +
            'subiu, esforço diminuiu.',
        },
        {
          type: 'h2',
          text: 'Caso 3 — Roberto, 38 → 43 anos',
        },
        {
          type: 'p',
          text:
            'CFO de empresa média. Adiava decisão de migrar sistema por 2 anos — ' +
            '"falta análise". Aplicou pré-mortem em 15 min. Identificou 5 riscos, todos ' +
            'mitigáveis. Decidiu em 30 dias. Migração economizou R$ 800k/ano.',
        },
      ],
    },
  ],

  appendices: [
    {
      title: 'Anexo — 12 perguntas para destravar paralisia por análise',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Qual é a decisão exata? (em 1 frase)',
            'É reversível em <30 dias? Se sim, decida HOJE',
            'Qual é o custo real de NÃO decidir essa semana?',
            'Que dado mínimo eu preciso para decidir? (3 itens, não mais)',
            'Existe alguém que já tomou decisão similar? Posso perguntar?',
            'Qual é o pior cenário? Eu sobrevivo?',
            'Qual é o melhor cenário? Vale o esforço?',
            'O que mudaria com 1 mês a mais de pesquisa? Honestamente.',
            'Estou pesquisando ou estou ESCONDIDO?',
            'Em escala 0-10, quanto eu tenho de certeza? Se >7, basta',
            'Existe data DEFINIDA para decidir? Se não, defina agora',
            'Posso decidir como teste reversível?',
          ],
        },
      ],
    },
  ],

  closing: {
    headline: '80% bem feito vence 100% adiado.',
    subtext:
      'Seu rigor é dom. Use-o onde IMPORTA — e simplifique onde sobra. ' +
      'Em 6 meses, você vai entregar 3x mais com a mesma qualidade percebida.',
  },
}

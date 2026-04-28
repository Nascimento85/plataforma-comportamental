// ============================================================
// Guia Premium — Analista (C)
// "Comunicação Ágil para Mentes Analíticas"
// ~24 páginas. Como falar com não-técnicos sem desonestar a complexidade.
// ============================================================

import type { PdfBody } from '../types'

export const analystCommunicationBody: PdfBody = {
  runningTitle: 'Comunicação Ágil · C',

  epigraph: {
    text:
      'Você é preciso. O desafio é COMPRIMIR essa precisão para audiência não-técnica ' +
      '— sem perder a verdade. É possível e exige método.',
  },

  chapters: [
    {
      number: 1,
      title: 'A Regra "5–25–95"',
      subtitle: 'A estrutura universal de comunicação técnica',
      blocks: [
        {
          type: 'lead',
          text:
            'Toda comunicação técnica para audiência não-técnica funciona em camadas ' +
            'de profundidade. Aprenda a estruturar em 3 camadas: 5 segundos, 25 segundos, ' +
            '95 segundos. Cada camada tem propósito específico.',
        },
        {
          type: 'h2',
          text: 'CAMADA 1 — 5 segundos: o headline',
        },
        {
          type: 'p',
          text:
            'A frase que entrega 90% da mensagem caso a pessoa pare aqui. Sem jargão. ' +
            'Sem ressalva. Apenas o ponto central.',
        },
        {
          type: 'kv',
          items: [
            { k: 'Antes', v: '"Implementamos uma arquitetura de microserviços baseada em event sourcing"' },
            { k: 'Depois', v: '"Reduzimos o tempo de resposta do sistema de 5 segundos para 200ms"' },
          ],
        },
        {
          type: 'h2',
          text: 'CAMADA 2 — 25 segundos: as 3 evidências',
        },
        {
          type: 'p',
          text:
            'Para quem ficou interessado pelo headline. 3 fatos/números/exemplos que ' +
            'sustentam. Sem ainda entrar em arquitetura.',
        },
        {
          type: 'h2',
          text: 'CAMADA 3 — 95 segundos: o detalhe técnico',
        },
        {
          type: 'p',
          text:
            'SÓ se a pessoa pediu. Aqui você pode aprofundar. Mas regra: pause a cada ' +
            '30 segundos para perguntar "está fazendo sentido?". Se não, recolha.',
        },
        {
          type: 'callout',
          tone: 'do',
          text:
            'Em apresentação para C-level, prepare APENAS as camadas 1 e 2. A camada 3 ' +
            'fica em apêndice. Se perguntarem, você tem. Se não perguntarem, você ' +
            'economizou tempo de todos.',
        },
      ],
    },

    {
      number: 2,
      title: 'Tradução de Jargão por Audiência',
      subtitle: 'Como achar a palavra certa em 30 segundos',
      blocks: [
        {
          type: 'lead',
          text:
            'Cada palavra técnica que você usa custa 30% de atenção da audiência ' +
            'não-técnica. Aprenda o método de tradução por equivalência.',
        },
        {
          type: 'h2',
          text: 'O método: "É como…"',
        },
        {
          type: 'p',
          text:
            'Toda explicação técnica vira "é como [coisa do mundo real]". Use 1 ou 2 ' +
            'analogias. Não mais. Mais que 2 confunde.',
        },
        {
          type: 'h2',
          text: 'Glossário de traduções comuns',
        },
        {
          type: 'table',
          headers: ['Jargão técnico', 'Tradução para não-técnico'],
          rows: [
            ['API',                  'Conector que faz dois sistemas conversarem'],
            ['Cache',                'Memória rápida que guarda atalhos'],
            ['Algoritmo',            'Receita que o computador segue'],
            ['Banco de dados',       'Arquivo organizado'],
            ['Latência',             'Atraso para a resposta voltar'],
            ['Escalabilidade',       'Capacidade de aguentar 10x mais usuários'],
            ['Stack',                'Conjunto de ferramentas que usamos'],
            ['Refatorar',            'Reorganizar o código sem mudar o que ele faz'],
            ['Deploy',               'Colocar a versão nova no ar'],
            ['Bug',                  'Comportamento inesperado a corrigir'],
            ['MVP',                  'Versão mínima que cumpre o objetivo'],
            ['ROI',                  'Quanto cada R$ investido vai voltar'],
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          text:
            'Antes de cada apresentação, leia seu deck e CIRCULE cada palavra técnica. ' +
            'Para cada uma, escreva ao lado a tradução curta. Use a tradução, não o ' +
            'jargão. Em 5 reuniões, vira reflexo.',
        },
      ],
    },

    {
      number: 3,
      title: 'Como Apresentar para C-Level',
      subtitle: 'A estrutura BLUF (Bottom Line Up Front)',
      blocks: [
        {
          type: 'lead',
          text:
            'C-level decide rápido, com pouco tempo. NÃO tem paciência para construção ' +
            'narrativa. Vire a ordem clássica de cabeça para baixo: comece pelo FIM.',
        },
        {
          type: 'h2',
          text: 'Estrutura BLUF (Bottom Line Up Front)',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'CONCLUSÃO em 1 slide — o que você recomenda',
            'IMPACTO em 1 slide — o que muda em R$/tempo/pessoas',
            'EVIDÊNCIA em 2-3 slides — os 3 dados que sustentam',
            'RISCOS em 1 slide — os 3 principais riscos com mitigação',
            'PRÓXIMOS PASSOS em 1 slide — quem faz o quê até quando',
          ],
        },
        {
          type: 'callout',
          tone: 'do',
          text:
            '8 slides MAX. Deck mais curto = deck mais respeitado. C-level que recebe ' +
            'deck de 30 slides assume que você não pensou bastante.',
        },
        {
          type: 'h2',
          text: 'Os 3 erros do Analista em apresentação',
        },
        {
          type: 'callout',
          tone: 'dont',
          text:
            'Começar pela METODOLOGIA. Eles não querem saber como você chegou. Querem ' +
            'saber O QUE você concluiu.',
        },
        {
          type: 'callout',
          tone: 'dont',
          text:
            'Mostrar TODOS os dados. Mostre os 3 mais importantes. O resto fica em apêndice.',
        },
        {
          type: 'callout',
          tone: 'dont',
          text:
            'Hesitar em recomendar. C-level paga você para ter OPINIÃO técnica. ' +
            '"Isso é decisão sua" é fuga. Recomende.',
        },
      ],
    },

    {
      number: 4,
      title: 'Slides Minimalistas Que Vendem',
      subtitle: 'Regras de design para mente analítica',
      blocks: [
        {
          type: 'lead',
          text:
            'Analista tende a escrever slide com 200 palavras. Slide é PALCO de fala — ' +
            'não documento de leitura. Aprenda a fazer slide que apoia, não substitui.',
        },
        {
          type: 'h2',
          text: '5 regras de slide eficiente',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Máximo 6 palavras por slide (regra "6×6" — 6 itens × 6 palavras se for lista)',
            '1 ideia por slide. Nunca duas',
            'Gráfico SEMPRE com headline interpretativa (não "Gráfico 1")',
            'Cor: 2 cores principais. Mais que 2 confunde',
            'Tamanho de fonte: nunca menor que 24pt',
          ],
        },
        {
          type: 'h2',
          text: 'Como construir gráfico que comunica',
        },
        {
          type: 'kv',
          items: [
            { k: 'Errado', v: 'Título: "Receita por trimestre 2024-2025"' },
            { k: 'Certo',  v: 'Título: "Receita cresceu 40% após mudança de modelo em Q3"' },
          ],
        },
        {
          type: 'callout',
          tone: 'do',
          text:
            'O título do gráfico é a CONCLUSÃO. O gráfico é a evidência. Quem lê o título ' +
            'já sabe a história. O gráfico só prova.',
        },
      ],
    },

    {
      number: 5,
      title: 'Email Executivo em 4 Frases',
      subtitle: 'A arte de comunicar decisão por escrito',
      blocks: [
        {
          type: 'lead',
          text:
            'Email executivo eficiente tem 4 frases. Quatro. Não mais. Cada frase tem ' +
            'função específica. Esse esquema vale para 90% dos emails de trabalho.',
        },
        {
          type: 'h2',
          text: 'Estrutura',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'FRASE 1: Conclusão/Pedido principal (BLUF)',
            'FRASE 2: Contexto MÍNIMO necessário',
            'FRASE 3: Próxima ação concreta + prazo',
            'FRASE 4: Pergunta que destrava (opcional)',
          ],
        },
        {
          type: 'h2',
          text: 'Exemplo aplicado',
        },
        {
          type: 'script',
          role: 'Email de 4 frases',
          sayThis:
            'Recomendo aprovarmos a migração para o fornecedor Y nesta semana. ' +
            'O custo é 15% maior, mas economiza 40h/mês da equipe e melhora o SLA em 3x. ' +
            'Posso encaminhar o contrato hoje à tarde para sua assinatura. ' +
            'Tem alguma preocupação que eu deva endereçar antes?',
        },
        {
          type: 'callout',
          tone: 'do',
          text:
            'Esse é o email que C-level RESPONDE em 5 minutos. Email longo de 8 ' +
            'parágrafos vai para "vou ler depois" — e nunca volta.',
        },
      ],
    },

    {
      number: 6,
      title: 'Feedback Técnico para Não-Técnico',
      subtitle: 'Quando você precisa apontar erro a quem não entende a área',
      blocks: [
        {
          type: 'lead',
          text:
            'Analista trava ao dar feedback técnico para não-técnico. "Como explicar?". ' +
            'A regra é: NÃO explique a parte técnica. Comunique apenas o IMPACTO.',
        },
        {
          type: 'h2',
          text: 'Estrutura: Impacto → Raiz → Solução',
        },
        {
          type: 'kv',
          items: [
            { k: 'Impacto', v: 'O QUE acontece de ruim (em termos do interesse do interlocutor)' },
            { k: 'Raiz',    v: 'POR QUE acontece (em 1 linha, sem detalhe técnico)' },
            { k: 'Solução', v: 'O QUE precisa ser feito + tempo + esforço' },
          ],
        },
        {
          type: 'h2',
          text: 'Exemplo',
        },
        {
          type: 'script',
          role: 'Feedback técnico para CEO',
          sayThis:
            'Vamos perder 3h/dia de produtividade da equipe por causa da lentidão do ' +
            'sistema (impacto). É porque a base de dados não está otimizada para o ' +
            'volume atual (raiz). Precisamos de 5 dias de trabalho de 1 desenvolvedor ' +
            'para resolver (solução). Aprovado para alocar?',
        },
        {
          type: 'callout',
          tone: 'tip',
          text:
            'Note: o CEO entende "3h de produtividade perdida" e "5 dias de 1 dev". ' +
            'NÃO precisa entender "base de dados não otimizada para volume". Você ' +
            'preserva a verdade técnica SEM forçar entendimento.',
        },
      ],
    },
  ],

  appendices: [
    {
      title: 'Anexo — 20 templates de email/mensagem',
      blocks: [
        {
          type: 'h2',
          text: 'Email de proposta',
        },
        {
          type: 'p',
          text:
            'Recomendo [solução]. Custo: [R$ X] / Prazo: [Y dias] / Impacto: [Z%]. ' +
            'Posso seguir? Se sim, mando contrato hoje.',
        },
        {
          type: 'h2',
          text: 'Email de risco identificado',
        },
        {
          type: 'p',
          text:
            'Identifiquei um risco em [área]: [descrição em 1 linha]. Impacto se não ' +
            'tratado: [R$ X / Y horas / Z pessoas]. Mitigação proposta: [ação] em [prazo]. ' +
            'Aprovado?',
        },
        {
          type: 'h2',
          text: 'Email de pedido de tempo',
        },
        {
          type: 'p',
          text:
            'Para entregar [tarefa] com qualidade adequada, preciso de mais [X dias]. ' +
            'Ajustando: vou priorizar [item central] e adiar [item secundário] para ' +
            '[data]. Faz sentido?',
        },
        {
          type: 'h2',
          text: 'Email de aviso de problema',
        },
        {
          type: 'p',
          text:
            'Quero te avisar com antecedência: [problema] está acontecendo. ' +
            'Estamos fazendo [ação]. Espero resolver em [prazo]. Te atualizo [data]. ' +
            'Há algo que você precisa antes disso?',
        },
        {
          type: 'h2',
          text: 'Email de discordância respeitosa',
        },
        {
          type: 'p',
          text:
            'Concordo com 80% da proposta. Em 20% vejo um risco específico: [risco]. ' +
            'Sugestão: [ajuste]. O que você acha?',
        },
        {
          type: 'p',
          text: '… (continua com mais 15 templates no manual completo)',
        },
      ],
    },
  ],

  closing: {
    headline: 'Precisão sem clareza vira ruído. Clareza com precisão vira autoridade.',
    subtext:
      'Releia este Guia antes de cada comunicação importante. Em 90 dias, sua reputação ' +
      'de "técnico claro" se consolida — e abre portas que rigor sem clareza nunca abriu.',
  },
}

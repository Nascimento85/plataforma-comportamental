// ============================================================
// Apostila Premium — Influente (I)
// "Narrativa de Marca para o Influente"
// ~22 páginas. Como construir marca pessoal sustentável.
// ============================================================

import type { PdfBody } from '../types'

export const influencerNarrativeBody: PdfBody = {
  runningTitle: 'Narrativa de Marca · I',

  epigraph: {
    text:
      'Sua marca pessoal precisa funcionar SEM você presente o tempo todo. ' +
      'Caso contrário, ela é refém de sua agenda — não construção de patrimônio.',
  },

  chapters: [
    {
      number: 1,
      title: 'Presença vs Autoridade',
      subtitle: 'A diferença que separa influência de marca',
      blocks: [
        {
          type: 'lead',
          text:
            'Influente típico tem PRESENÇA: as pessoas conhecem, gostam, lembram. Mas ' +
            'presença não é autoridade. Autoridade é quando, na ausência de você, alguém ' +
            'recomenda você espontaneamente.',
        },
        {
          type: 'h2',
          text: 'Sintomas de quem tem só presença',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Engajamento alto, faturamento estagnado',
            'Convites para falar de graça > convites para serviço pago',
            'Quando você some 30 dias, ninguém te chama',
            'Clientes vêm porque te VIRAM, não porque foram indicados',
            'Sua agenda enche de reuniões mas não de receita',
          ],
        },
        {
          type: 'h2',
          text: 'Como autoridade se constrói',
        },
        {
          type: 'kv',
          items: [
            { k: 'Pilar 1', v: 'Posicionamento claro: você resolve UM problema específico' },
            { k: 'Pilar 2', v: 'Histórias com prova: cases, números, depoimentos' },
            { k: 'Pilar 3', v: 'Conteúdo recorrente: previsibilidade > viralidade' },
            { k: 'Pilar 4', v: 'Sistemas que escalam sem você: produtos, conteúdo evergreen' },
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          text:
            'Métrica de autoridade: nas indicações que você recebe, qual % NÃO é de ' +
            'pessoa que te conhece pessoalmente? Se <30%, você ainda é só presença. ' +
            'Se >50%, está virando autoridade.',
        },
      ],
    },

    {
      number: 2,
      title: 'Sua História em 3 Atos',
      subtitle: 'A narrativa que sustenta toda a marca',
      blocks: [
        {
          type: 'lead',
          text:
            'Toda marca pessoal forte tem uma história em 3 atos. Não inventa — descobre. ' +
            'A sua já existe; você só não articulou ainda.',
        },
        {
          type: 'h2',
          text: 'ATO 1 — O Mundo Comum',
        },
        {
          type: 'p',
          text:
            'Quem você era antes da virada. Profissão, contexto, frustração silenciosa. ' +
            'Quem nunca teve frustração não tem história — só currículo.',
        },
        {
          type: 'callout',
          tone: 'do',
          text:
            'Pergunta-âncora: "Em qual ano da minha vida eu comecei a SENTIR que algo ' +
            'precisava mudar — mas ainda não sabia o quê?"',
        },
        {
          type: 'h2',
          text: 'ATO 2 — A Virada',
        },
        {
          type: 'p',
          text:
            'O ponto onde tudo mudou. Pode ter sido evento (demissão, crise, divórcio, ' +
            'doença) ou descoberta (livro, mentor, viagem, conversa). Conte SEM romantizar.',
        },
        {
          type: 'callout',
          tone: 'do',
          text:
            'Pergunta-âncora: "Qual foi o MOMENTO específico que eu posso datar — mês, ' +
            'lugar, com quem estava — em que decidi mudar?"',
        },
        {
          type: 'h2',
          text: 'ATO 3 — O Mundo Novo',
        },
        {
          type: 'p',
          text:
            'Quem você é agora, e o que oferece para outros que estão onde você estava. ' +
            'A oferta nasce da virada. Não invente serviço — derive da história.',
        },
        {
          type: 'h2',
          text: 'Template para escrever sua história em 3 parágrafos',
        },
        {
          type: 'script',
          role: 'Sua narrativa em 90 segundos',
          sayThis:
            '[ATO 1] Por anos eu fui [profissão/contexto] e me sentia [frustração]. ' +
            'Achava que era normal. [ATO 2] Em [ano/momento], aconteceu [evento/descoberta] ' +
            'que mudou tudo. Percebi que [insight central]. [ATO 3] Hoje eu ajudo [público ' +
            'específico] a [transformação] usando [método]. Faço isso porque sei como é ' +
            'estar do outro lado.',
        },
      ],
    },

    {
      number: 3,
      title: 'Pilares de Conteúdo',
      subtitle: '4 caminhos sustentáveis para gerar conteúdo sem queimar',
      blocks: [
        {
          type: 'lead',
          text:
            'Influente queima criando "do zero" toda semana. Pilares são as 4 zonas ' +
            'temáticas que você gira em rotação. Em 1 mês, todo conteúdo passa pelos 4. ' +
            'Em 6 meses, sua marca está clara para qualquer um que te segue.',
        },
        {
          type: 'h2',
          text: 'PILAR 1 — Educar',
        },
        {
          type: 'p',
          text:
            'Conteúdo que ENSINA algo prático sobre o seu tema. Tutorial, dica, framework, ' +
            'erro a evitar. Esse pilar prova competência.',
        },
        {
          type: 'kv',
          items: [
            { k: 'Formato', v: 'Carrossel, vídeo curto, post escrito' },
            { k: 'Frequência', v: '40% do seu conteúdo' },
          ],
        },
        {
          type: 'h2',
          text: 'PILAR 2 — Inspirar',
        },
        {
          type: 'p',
          text:
            'Histórias de transformação. Cases (seus ou de clientes). Reflexões de quem ' +
            'fez a travessia. Esse pilar gera conexão emocional.',
        },
        {
          type: 'kv',
          items: [
            { k: 'Formato', v: 'Texto longo, vídeo de 60s-3min, áudio' },
            { k: 'Frequência', v: '30% do seu conteúdo' },
          ],
        },
        {
          type: 'h2',
          text: 'PILAR 3 — Provocar',
        },
        {
          type: 'p',
          text:
            'Opinião contra-corrente. Posicionamento sobre algo polêmico do seu mercado. ' +
            'Esse pilar separa quem te ama de quem não te entende — e atrai os clientes ' +
            'certos.',
        },
        {
          type: 'kv',
          items: [
            { k: 'Formato', v: 'Texto curto, vídeo direto, story de opinião' },
            { k: 'Frequência', v: '15% do seu conteúdo' },
          ],
        },
        {
          type: 'h2',
          text: 'PILAR 4 — Mostrar bastidores',
        },
        {
          type: 'p',
          text:
            'O dia a dia. Sua família. Suas dúvidas. Suas vitórias pequenas. Esse pilar ' +
            'humaniza — e é onde a venda implícita acontece (porque pessoas compram de ' +
            'pessoas que parecem reais).',
        },
        {
          type: 'kv',
          items: [
            { k: 'Formato', v: 'Story, foto casual, áudio espontâneo' },
            { k: 'Frequência', v: '15% do seu conteúdo' },
          ],
        },
      ],
    },

    {
      number: 4,
      title: 'Calendário Editorial de 30 Dias',
      subtitle: 'Modelo pronto para os 4 pilares em rotação',
      blocks: [
        {
          type: 'lead',
          text:
            'Esse calendário é UM exemplo. Adapte aos seus dias da semana e formato ' +
            'preferido. Princípio: 4 pilares × 4 semanas = previsibilidade total.',
        },
        {
          type: 'table',
          headers: ['Semana', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex'],
          rows: [
            ['1', 'Educar', 'Inspirar', 'Bastidor', 'Educar',  'Provocar'],
            ['2', 'Educar', 'Bastidor', 'Inspirar', 'Educar',  'Bastidor'],
            ['3', 'Educar', 'Inspirar', 'Provocar', 'Educar',  'Bastidor'],
            ['4', 'Educar', 'Bastidor', 'Inspirar', 'Educar',  'Provocar'],
          ],
        },
        {
          type: 'callout',
          tone: 'do',
          text:
            'Educar 2x por semana é o teto da maioria. Se você consegue 3x, é diferencial. ' +
            'Mas qualidade > frequência. 1 carrossel bem feito > 5 posts genéricos.',
        },
        {
          type: 'h2',
          text: 'Bloco de produção semanal',
        },
        {
          type: 'p',
          text:
            'Reserve 4 horas em UM dia da semana (recomendo segunda 9h-13h) para gravar/ ' +
            'escrever os conteúdos da semana. Você produz batch — agendaa publicação. ' +
            'O resto da semana fica livre para vendas e atendimento.',
        },
      ],
    },

    {
      number: 5,
      title: 'Métricas Que Importam (e as Que Mentem)',
      subtitle: 'Onde olhar — e onde ignorar',
      blocks: [
        {
          type: 'lead',
          text:
            'Influente se vicia em métrica errada: views, likes, seguidores. Essas ' +
            'sentem bem mas pagam pouco. Métricas que importam: as que conectam com ' +
            'receita ou autoridade.',
        },
        {
          type: 'h2',
          text: 'METRICAS QUE IMPORTAM',
        },
        {
          type: 'kv',
          items: [
            { k: 'Salvamentos', v: 'Indica que conteúdo é REUTILIZADO. Forte sinal de utilidade.' },
            { k: 'Compartilhamentos', v: 'Pessoas indicando você. Vetor de autoridade.' },
            { k: 'Mensagens privadas', v: 'Quem manda DM = lead morno. Conta os DMs por mês.' },
            { k: 'CTR para link', v: '% de quem clica em link da bio. Indica intenção real.' },
            { k: 'Taxa de retenção em vídeo', v: 'Quem vê >75%. Indica conteúdo merece atenção.' },
          ],
        },
        {
          type: 'h2',
          text: 'METRICAS QUE MENTEM',
        },
        {
          type: 'callout',
          tone: 'dont',
          text:
            'Quantidade de seguidores: 100k não pagam aluguel. 500 fãs verdadeiros pagam.',
        },
        {
          type: 'callout',
          tone: 'dont',
          text:
            'Curtidas: Reflete simpatia, não interesse comercial. Like é educação, não ' +
            'compra.',
        },
        {
          type: 'callout',
          tone: 'dont',
          text:
            'Views: 10 mil views com 0 comentários e 0 mensagens = audiência de passagem. ' +
            'Não converte.',
        },
        {
          type: 'callout',
          tone: 'tip',
          text:
            'KPI mestre: "qual % dos meus clientes do mês vieram de conteúdo orgânico?". ' +
            'Se for >40%, sua marca está funcionando. Se for <10%, você está fazendo ' +
            'conteúdo para aplaudir, não para vender.',
        },
      ],
    },

    {
      number: 6,
      title: 'Como Deixar de Criar e Começar a Rentabilizar',
      subtitle: 'A transição do "criador" para o "empreendedor"',
      blocks: [
        {
          type: 'lead',
          text:
            'Em algum momento, criar conteúdo deixa de gerar crescimento proporcional. ' +
            'É o momento de PARAR de criar mais e começar a EMBALAR o que já criou. ' +
            'Esse capítulo é o roteiro dessa transição.',
        },
        {
          type: 'h2',
          text: 'Sinais de que é hora de embalar',
        },
        {
          type: 'check',
          items: [
            'Você já tem 6+ meses de conteúdo público',
            'Pessoas perguntam o mesmo 5 vezes nos comentários',
            'Você notou padrão claro nos clientes que mais converteram',
            'Você está exausto criando 5x por semana',
            'Receita parou de crescer apesar de mais publicações',
          ],
        },
        {
          type: 'h2',
          text: 'O que embalar (3 produtos derivados)',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'E-book/Apostila: agrupar 10 melhores conteúdos no tema X. Cobrar R$ 47-97.',
            'Mini-curso: 5 vídeos de 15 min sobre processo central. Cobrar R$ 297-497.',
            'Mentoria em grupo: 4 calls quinzenais com 8-12 pessoas. Cobrar R$ 1.997-3.997.',
          ],
        },
        {
          type: 'callout',
          tone: 'do',
          text:
            'Não precisa lançar os 3. Comece pelo MAIS SIMPLES (e-book). Em 60 dias, valida ' +
            'demanda. Se vender, sobe para mini-curso. Se não vender, ajuste o tema.',
        },
        {
          type: 'h2',
          text: 'Estrutura de página de venda mínima',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Headline: promessa específica + tempo (ex: "Aprenda X em 30 dias")',
            'Sub-headline: para quem é (público) + para quem NÃO é',
            'História em 3 atos (3 parágrafos curtos)',
            '3 depoimentos reais (com nome e foto)',
            'Lista do que está dentro (5-8 pontos curtos)',
            'Preço + bônus (1 ou 2)',
            'Garantia (7 ou 14 dias)',
            'CTA único: 1 botão, 1 link de pagamento',
          ],
        },
      ],
    },
  ],

  closing: {
    headline: 'Carisma vira marca quando ganha estrutura.',
    subtext:
      'Releia esta apostila a cada 90 dias. O que pareceu óbvio hoje vai abrir ' +
      'caminho diferente conforme sua marca cresce.',
  },
}

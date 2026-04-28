// ============================================================
// Relatório Premium — Perfil ANALISTA (C) — "O Arquiteto"
// ============================================================

import type { PremiumProfileContent } from './types'
import { analystSimplifyingBody }   from './downloads/analyst-simplifying'
import { analystCommunicationBody } from './downloads/analyst-communication'
import { analystChecklistBody }     from './downloads/analyst-checklist'

export const analystContent: PremiumProfileContent = {
  key:        'C',
  label:      'Analista (C) — O Arquiteto',
  pitchLine:  'Sua mente é uma fortaleza. O preço da fortaleza é a solidão. Aqui você aprende a sair dela sem perder a precisão.',
  paletteHex: '#3a6db4',

  analysis: {
    motor: {
      title: 'O Motor: o que realmente te move',
      summary:
        'O Analista é movido por verdade e excelência. Para você, errar não é perda — é vergonha. Sua moeda interna é precisão. Você é a pessoa que outras pessoas chamam quando NINGUÉM PODE errar.',
      insights: [
        'Verdade > Velocidade. Você prefere acertar tarde a errar cedo. Esse é seu mérito — mas também o seu teto profissional se levado ao extremo.',
        'Você confunde "decisão informada" com "decisão completa". Não existe completa. Existe a melhor possível com o que se tem.',
        'Sua autocrítica é seu sistema de qualidade — e seu freio. Quando você fala que "tá ok", os outros leem como elogio. Calibre.',
        'Você não é antissocial. Você é seletivo. Sua rede é menor mas mais profunda. Use isso a favor — peça ajuda mais cedo.',
      ],
    },
    shadow: {
      title: 'A Sombra: 3 pontos cegos que estão te paralisando',
      summary: 'Sua precisão é sua força — e a fonte dos seus pontos cegos.',
      blindspots: [
        {
          name: 'Perfeccionismo paralisante (paralisia por análise)',
          whatItLooksLike:
            'Você pesquisa 3 horas para uma decisão de 30 minutos. Reescreve email 4 vezes. Adia lançamento porque "ainda não está perfeito".',
          careerCost:
            'Você entrega menos do que poderia em quantidade. Empresas escalam pelo "bom o suficiente repetido", não pelo "perfeito raro". Você é ultrapassado por gente menos talentosa que entrega.',
          reframe:
            'Velocidade calibrada > Perfeição. Decisão de 70% executada vence decisão de 100% adiada. Sua qualidade ganha A LONGO PRAZO, mas o curto prazo paga as contas.',
        },
        {
          name: 'Medo de errar disfarçado de "rigor técnico"',
          whatItLooksLike:
            'Você aplica padrão de criticidade igual em decisão de R$ 1k e em decisão de R$ 1M. Pede revisão de 3 pessoas para mudar a cor de um botão.',
          careerCost:
            'Você atrasa o time. Vira gargalo. As pessoas começam a contornar você ("não passa para o C, ele segura").',
          reframe:
            'Calibre seu rigor pelo IMPACTO da decisão, não pelo seu desconforto pessoal com errar. Decisões reversíveis = vá rápido. Irreversíveis = aprofunde.',
        },
        {
          name: 'Isolamento social que vira ascensão lenta',
          whatItLooksLike:
            'Você prefere fazer 5h de trabalho técnico a 30 min de almoço com a equipe. "Networking é desperdício de tempo".',
          careerCost:
            'Promoções acontecem em conversas informais. Sem rede, você é "o cara que entrega bem mas ninguém defende". Em demissão coletiva, você é o primeiro a sair.',
          reframe:
            'Networking não é puxa-saquismo. É tornar visível um trabalho que já é bom. Sem visibilidade, talento é só hobby caro.',
        },
      ],
    },
    fears: {
      title: 'Medos Inconscientes',
      summary: 'O Analista tem medos racionais — e por isso mais difíceis de admitir.',
      items: [
        {
          fear: 'Medo de estar errado em público',
          manifestation:
            'Você prefere não opinar a opinar errado. Quando opina, qualifica tanto que ninguém entende sua posição.',
          decisionImpact:
            'Você perde voz em decisões importantes. Quem fala alto, mesmo errado, define os rumos. Você fica observando.',
        },
        {
          fear: 'Medo de ser visto como medíocre',
          manifestation:
            'Você não entrega até estar perfeito porque entregar imperfeito = ser medíocre = morte simbólica.',
          decisionImpact:
            'Você adia projetos pessoais (livro, curso, empresa) por anos. Quando lança, mercado mudou.',
        },
        {
          fear: 'Medo de perder a autonomia intelectual',
          manifestation:
            'Você resiste a regras impostas por outros. Em time, vira "difícil de trabalhar". Em casa, vira "implicante".',
          decisionImpact:
            'Você confunde liberdade intelectual com isolamento. Vira sócio único da sua própria visão. Solitário no topo do morro.',
        },
      ],
    },
  },

  career: [
    {
      context: 'leadership',
      headline: 'Liderar pessoas — não só sistemas',
      diagnosis:
        'Você lidera processos com excelência, mas pessoas precisam de algo que processo não tem: validação emocional. Aqui você instala isso sem virar Influente.',
      plays: [
        {
          title: 'Reuniões 1:1 — agenda fixa',
          do: [
            'Toda semana, 30 min com cada subordinado. Pauta: 1) o que está te energizando? 2) onde você está travado? 3) algo pessoal que importa?',
            'Anote depois. Use no próximo encontro. Mostra que você ouve.',
          ],
          dont: ['Cancelar 1:1 por urgência operacional. É a 1ª coisa a NÃO cancelar.'],
        },
        {
          title: 'Feedback técnico com humanidade',
          do: [
            'Antes de apontar erro, valide o esforço: "vejo que você levou 6h nisso. Antes de eu apontar problemas, me conta o caminho que pensou".',
            'Crítica em sanduíche FUNCIONA aqui se for específica.',
          ],
          dont: ['Mandar review escrito sem conversa. Para a maioria dos perfis, é violência.'],
        },
      ],
    },
    {
      context: 'sales',
      headline: 'Vender precisão sem assustar quem não é técnico',
      diagnosis:
        'Você vende maravilhosamente para outros C. Mas Dominantes e Influentes te acham "cheio de detalhe". Aprenda a comprimir.',
      plays: [
        {
          title: 'Estrutura "5–25–95"',
          do: [
            '5 segundos: o headline. ("Reduzimos seu custo em 30% em 90 dias.")',
            '25 segundos: as 3 evidências principais.',
            '95 segundos: detalhe técnico — só se pedirem.',
          ],
          dont: ['Começar com metodologia. Para D e I, é matar a venda.'],
        },
        {
          title: 'Decisão sem 100% das informações',
          do: [
            'Use a regra dos 80%: tomada de decisão com 80% dos dados é ótima. 20% restantes você ajusta no caminho.',
            'Identifique decisões reversíveis vs irreversíveis. Reversíveis = decida em horas. Irreversíveis = aprofunde.',
          ],
          dont: ['Esperar a planilha "completa" para responder ao prospect. 80% das vezes ele já fechou com outro.'],
          script: '"Pelo que vi, recomendo opção A. Há 1 risco em B que vou monitorar. Posso te enviar o cronograma hoje?"',
        },
      ],
    },
    {
      context: 'negotiation',
      headline: 'Mesa de negociação: sua precisão é arma',
      diagnosis: 'Você ganha quando o jogo é dado, perde quando é emoção. Conduza para o terreno dos dados.',
      plays: [
        {
          title: 'Estabelecer terreno técnico',
          do: [
            'Comece pedindo dados: "para eu te ajudar bem, preciso entender 3 números…". Você passa a dirigir o ritmo.',
            'Cada concessão deve vir com contrapartida documentada.',
          ],
          dont: ['Brigar em terreno emocional. Você perde — não porque é fraco, mas porque o jogo não é seu.'],
        },
      ],
    },
    {
      context: 'operational',
      headline: 'Quando o trabalho operacional é com você',
      diagnosis: 'Você ama operação, mas pode virar operacional eterno se não tomar cuidado.',
      plays: [
        {
          title: 'Documentar o que dá certo (vira sistema)',
          do: [
            'Tudo que você faz mais de 3 vezes vira processo escrito. Em 90 dias, sua produtividade 2x.',
            'Toda sexta-feira: 30 min de "o que eu posso automatizar/delegar?".',
          ],
          dont: ['Ser o repositório vivo do conhecimento. Cria gargalo, e você nunca sobe.'],
        },
      ],
    },
  ],

  communication: {
    selfTalk: {
      title: 'Como você deve falar (comprimir sem perder verdade)',
      summary: 'Você é preciso. O desafio é COMPRIMIR essa precisão para audiência não-técnica.',
      techniques: [
        { name: 'Headline primeiro',          how: 'Comece TODA comunicação pelo final. "A resposta é X. Aqui o porquê:". Você ancora atenção.' },
        { name: 'Limite de 3',                 how: 'Em qualquer apresentação, no máximo 3 pontos. Se tem 7, agrupe em 3.' },
        { name: 'Tradutor de jargão',          how: 'Pergunte-se antes de falar: "isso faz sentido para alguém que não é da minha área?". Se não, traduza.' },
      ],
    },
    manualForOthers: {
      title: 'Manual de Instruções: como falar comigo',
      summary: 'Eu funciono em frequência calma e baseada em fatos. Respeite.',
      rules: [
        'Não me peça decisão imediata sem dados. Me dê tempo de processar — ou os dados.',
        'Não fale alto comigo. Volume não é argumento.',
        'Aceite que minha pausa é pensamento, não desinteresse.',
        'Quando me elogiar, seja específico. "Bom trabalho" me parece superficial.',
        'Conflito? Me mande por escrito antes de falar pessoalmente. Eu processo melhor.',
      ],
      scripts: [
        { situation: 'Pedir decisão rápida',     sayThis: '"Preciso decidir até 5ª. Tenho 3 opções. Pode me dar 2 critérios para eu escolher?"', notThis: '"Decide aí, qualquer coisa serve."' },
        { situation: 'Fazer reunião comigo',     sayThis: '"Pauta: A, B, C. Tempo: 30 min. Decisão esperada: sim/não em B."',                       notThis: '"Bora bater um papo amanhã?"' },
      ],
    },
  },

  pdi: {
    weeks: [
      {
        week: 1, theme: 'Velocidade calibrada — quebrar a paralisia',
        summary: 'Esta semana você EXPERIMENTA fechar com 80% da informação. Mundo não cai.',
        days: [
          { day: 1, focus: 'Velocidade', task: 'Liste 3 decisões pendentes. Identifique reversíveis. Decida 1 hoje.', metric: '1 decisão' },
          { day: 2, focus: 'Velocidade', task: 'Mande email importante SEM reler 3 vezes. 1 leitura é suficiente.',  metric: '1 email enviado' },
          { day: 3, focus: 'Velocidade', task: 'Em reunião, dê opinião nos primeiros 5 min, mesmo sem dado completo.', metric: 'Opinião dada' },
          { day: 4, focus: 'Velocidade', task: 'Resolva a 2ª decisão da lista do dia 1.',                              metric: '1 decisão' },
          { day: 5, focus: 'Velocidade', task: 'Entregue tarefa em "boa o suficiente". Resista a "mais 1 ajuste".',    metric: '1 entrega no MVP' },
          { day: 6, focus: 'Reflexão',   task: 'Quantos desses "rápido" deram errado? Provavelmente 0.',               metric: 'Diário' },
          { day: 7, focus: 'Off',         task: 'Descanso real.',                                                       metric: 'Off' },
        ],
      },
      {
        week: 2, theme: 'Tolerância ao erro — como aprender com ele',
        summary: 'Erro não é fracasso. É dado. Esta semana você TREINA tratar erro como informação.',
        days: [
          { day:  8, focus: 'Erro como dado', task: 'Identifique 1 erro recente. Escreva: o que aprendi? Sem culpa.',           metric: 'Análise feita' },
          { day:  9, focus: 'Erro como dado', task: 'Conte para alguém um erro seu profissional. Sem se justificar.',            metric: '1 admissão' },
          { day: 10, focus: 'Erro como dado', task: 'Faça algo novo onde sabe que vai errar (curso, esporte, técnica).',          metric: '1 tentativa' },
          { day: 11, focus: 'Erro como dado', task: 'Pergunte ao time: "onde eu poderia melhorar como gestor/colega?". Anote sem se defender.', metric: 'Feedback recebido' },
          { day: 12, focus: 'Erro como dado', task: 'Compartilhe 1 trabalho seu inacabado pedindo crítica.',                       metric: '1 trabalho compartilhado' },
          { day: 13, focus: 'Reflexão',       task: 'Erros desta semana = mais ou menos do que esperava?',                          metric: 'Diário' },
          { day: 14, focus: 'Off',             task: 'Descanso.',                                                                    metric: 'Off' },
        ],
      },
      {
        week: 3, theme: 'Soft skills — sair da fortaleza',
        summary: 'Esta semana você instala micro-rotinas sociais. Não vai virar Influente. Mas vai virar visível.',
        days: [
          { day: 15, focus: 'Soft', task: 'Almoço com 1 colega que você raramente vê. Sem agenda profissional.', metric: '1 almoço' },
          { day: 16, focus: 'Soft', task: 'Pergunte sobre o final de semana de 3 pessoas. Lembre na próxima vez.', metric: '3 perguntas' },
          { day: 17, focus: 'Soft', task: 'Em reunião, comece com 1 minuto pessoal antes do tema.',                metric: '1 abertura social' },
          { day: 18, focus: 'Soft', task: 'Mande 1 mensagem de reconhecimento sincera para alguém da equipe.',     metric: '1 mensagem' },
          { day: 19, focus: 'Soft', task: 'Café de 15 min com alguém da diretoria. Pergunta: "como posso ajudar você esse trimestre?"', metric: '1 café' },
          { day: 20, focus: 'Soft', task: 'Compartilhe ideia em grupo público (Slack/canal). Peça opinião.',        metric: '1 compartilhamento' },
          { day: 21, focus: 'Síntese', task: 'Carta ao C do dia 1: como continuar técnico SEM virar isolado.',      metric: 'Carta escrita' },
        ],
      },
    ],
  },

  downloads: [
    {
      slug: 'apostila-simplificando-perfeicao', kind: 'EBOOK',
      title: 'Simplificando a Perfeição',
      pitch: 'Manual para o Analista que quer entregar 5x mais sem trair seus padrões.',
      pages: 28, fileName: 'mapa-comportamental_C_apostila-simplificando.pdf',
      body:        analystSimplifyingBody,
      storagePath: 'disc/analyst/apostila-simplificando-perfeicao.pdf',
      toc: [
        '1. Por que 80% bem feito vence 100% adiado',
        '2. Decisões reversíveis vs irreversíveis: framework',
        '3. Pré-mortem em 15 minutos',
        '4. Como cortar 50% de qualquer documento sem perder essência',
        '5. MVP intelectual: lançar versão 0.7 com plano de ajuste',
        '6. Quando NÃO comprimir (decisões irreversíveis)',
        '7. Estudo de caso: 3 Analistas que viraram CTOs',
        'Anexo: 12 perguntas para destravar paralisia por análise',
      ],
    },
    {
      slug: 'guia-comunicacao-agil', kind: 'PLAYBOOK',
      title: 'Comunicação Ágil para Mentes Analíticas',
      pitch: 'Como falar com não-técnicos sem desonestar a complexidade.',
      pages: 24, fileName: 'mapa-comportamental_C_guia-comunicacao-agil.pdf',
      body:        analystCommunicationBody,
      storagePath: 'disc/analyst/guia-comunicacao-agil.pdf',
      toc: [
        '1. A regra "5–25–95"',
        '2. Tradução de jargão por audiência',
        '3. Como fazer apresentação para C-level',
        '4. Slides minimalistas que vendem',
        '5. Email executivo em 4 frases',
        '6. Como dar feedback técnico para perfil não-técnico',
        '7. Anexo: 20 templates de email/mensagem',
      ],
    },
    {
      slug: 'checklist-criterios-decisao', kind: 'WORKSHEET',
      title: 'Checklist de Decisão Rápida',
      pitch: 'Editável: marque os critérios e tome a decisão em 10 minutos.',
      pages: 4, fileName: 'mapa-comportamental_C_checklist-decisao.pdf',
      body:        analystChecklistBody,
      storagePath: 'disc/analyst/checklist-criterios-decisao.pdf',
      toc: [
        'A decisão é reversível? (sim/não)',
        'Custo de errar? (R$ ___)',
        'Custo de esperar? (R$ ___)',
        '3 dados mínimos para decidir',
        'Critério único de escolha',
        'Próximo ponto de revisão (data)',
      ],
    },
  ],
}

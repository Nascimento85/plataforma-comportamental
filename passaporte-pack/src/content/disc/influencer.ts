// ============================================================
// Relatório Premium — Perfil INFLUENTE (I) — "O Conector"
// ============================================================

import type { PremiumProfileContent } from './types'

export const influencerContent: PremiumProfileContent = {
  key:        'I',
  label:      'Influente (I) — O Conector',
  pitchLine:  'Sua maior arma é o brilho. Mas brilho sem foco vira festa, e festa não pagou conta nenhuma. Aqui você vai aprender a transformar carisma em autoridade.',
  paletteHex: '#d4943a',

  analysis: {
    motor: {
      title: 'O Motor: o que realmente te move',
      summary:
        'O Influente é movido pela necessidade de pertencimento e reconhecimento. Você não trabalha por dinheiro — você trabalha para ser visto trabalhando bem por pessoas que admira.',
      insights: [
        'Reconhecimento > Resultado. Um elogio público sincero te energiza por uma semana. Um cheque sem público, três dias.',
        'Você se conecta primeiro, decide depois. É uma força em vendas e uma armadilha em contrato. Releia cada acordo 24h depois.',
        'Você confunde atividade com produtividade. Estar agitado parece estar produzindo. Não está. Conferir mensagem = movimento; entregar = produção.',
        'Sua necessidade real é deixar legado relacional, não financeiro. Quando você entende isso, para de competir com Dominantes e começa a brilhar de verdade.',
      ],
    },
    shadow: {
      title: 'A Sombra: 3 pontos cegos que estão sabotando seu sucesso',
      summary: 'Seu maior risco é encantar a si mesmo com sua própria narrativa.',
      blindspots: [
        {
          name: 'Falta de foco — você começa 10, termina 2',
          whatItLooksLike:
            'Idéia nova chega, antiga é abandonada. Listas de afazer crescem mais rápido que se executam. "Vou retomar amanhã" é seu mantra silencioso.',
          careerCost:
            'Você é visto como "criativo, mas inconfiável". Promoções vão para quem entrega menos coisas, mas as termina. O mercado paga por término, não por início.',
          reframe:
            'Disciplina não mata criatividade — protege. Sua criatividade é a fonte; sua disciplina é o cano que leva água até a casa de quem paga por ela.',
        },
        {
          name: 'Necessidade compulsiva de aprovação',
          whatItLooksLike:
            'Reescreve mensagens 4 vezes. Toma decisões pensando "como vão me ver". Demora a dizer "não" porque parece desagradar.',
          careerCost:
            'Você assume mais do que cabe, atrasa entregas, vira o "bonzinho que não cumpre". Sua reputação vira "doce mas frágil".',
          reframe:
            'Quem precisa agradar todo mundo, não convence ninguém. Autoridade nasce do desconforto controlado — falar menos, posicionar mais.',
        },
        {
          name: 'Rotina como inimiga emocional',
          whatItLooksLike:
            'Você prospera em variedade e morre em repetição. Tarefa burocrática vira procrastinação criativa: você arruma a mesa, troca o app de tarefa, pesquisa a "ferramenta perfeita".',
          careerCost:
            'A parte chata do seu trabalho — que paga 70% do salário — fica eternamente atrasada. O caos administrativo é o seu teto invisível.',
          reframe:
            'Rotina não é prisão; é alavanca. Automatize, terceirize ou agrupe — mas não fuja. Quem foge de rotina paga em juros.',
        },
      ],
    },
    fears: {
      title: 'Medos Inconscientes',
      summary: 'O Influente não tem medo do julgamento — tem PÂNICO da indiferença.',
      items: [
        {
          fear: 'Medo de ser irrelevante / esquecido',
          manifestation:
            'Posta toda hora, fala alto em reunião, busca convites em eventos para "estar onde acontece". Pesa quando ninguém comenta.',
          decisionImpact:
            'Você prefere ser falado mal a não ser falado. Topa projetos ruins pelo holofote. Resultado: portfólio fragmentado.',
        },
        {
          fear: 'Medo da rejeição direta',
          manifestation:
            'Você adia conversas duras. Termina relação por mensagem, não por encontro. Demite por e-mail. Foge do "não" da outra parte.',
          decisionImpact:
            'Decisões pendentes acumulam. Cada conversa adiada vira interrupção mental que rouba foco.',
        },
        {
          fear: 'Medo de ser "raso" — descoberto como superficial',
          manifestation:
            'Compra cursos sem terminar. Cita autores que mal leu. Sente que precisa "saber tudo" antes de se posicionar.',
          decisionImpact:
            'Você posterga lançamento da sua marca pessoal/oferta porque "ainda não é a hora". Nunca é a hora. Profundidade nasce na exposição, não no esconderijo.',
        },
      ],
    },
  },

  career: [
    {
      context: 'sales',
      headline: 'Carisma que VENDE — sem ser prolixo',
      diagnosis:
        'Você fala bem, mas fala demais. O cliente sai encantado e não fecha. A virada é controlar o tempo de fala e ancorar no cliente, não em você.',
      plays: [
        {
          title: 'Regra dos 60% — escute mais do que fala',
          do: [
            'Cronometre suas reuniões. Meta: você fala no máx. 40% do tempo.',
            'Toda vez que sentir "vou contar uma história", pergunte antes: "essa história resolve a dúvida atual do cliente?". Se não, segura.',
          ],
          dont: ['Vender no entusiasmo. Cliente confia em quem parece em CONTROLE, não em quem parece animado.'],
        },
        {
          title: 'Fechamento por compromisso emocional',
          do: [
            'Em vez de "vamos fechar?", pergunte: "o que precisa estar verdadeiro daqui 6 meses para você dizer que valeu?". Anote a resposta. Repita ao fechar.',
          ],
          dont: ['Encerrar conversa sem próximo passo agendado em calendário com nome do cliente.'],
          script: '"Posso te mandar a proposta amanhã 10h. Combinamos um call sexta às 14h para você me dizer um sim ou um não? Sem rodeio."',
        },
      ],
    },
    {
      context: 'leadership',
      headline: 'Liderar mantendo disciplina sem virar carrasco',
      diagnosis:
        'O Influente diz sim para tudo, e o time perde direção. Liderar é ser admirado E previsível. Sem previsibilidade, o time entra em colapso.',
      plays: [
        {
          title: 'Rituais > Improvisação',
          do: [
            'Reunião de time toda segunda 9h, sem exceção. 25 min. Pauta fixa: 1) métricas, 2) gargalo, 3) pedido de ajuda.',
            'Sextas: 15 min de "celebração da semana" — você reconhece publicamente cada pessoa.',
          ],
          dont: ['Improvisar reunião quando bate insegurança. Time vê. Fica ansioso.'],
        },
        {
          title: 'Feedback sem perder o vínculo',
          do: [
            'Comece em privado: "Você sabe que eu te valorizo. Por isso vou ser direto: [comportamento específico] precisa mudar até [data]". E pare.',
            'Reforce no dia seguinte com mensagem curta de apoio.',
          ],
          dont: ['Misturar elogio com correção na mesma frase. Vira ruído.'],
        },
      ],
    },
    {
      context: 'operational',
      headline: 'Como sustentar foco em tarefa repetitiva',
      diagnosis: 'O I morre em rotina porque trata cada tarefa como decisão. Decida UMA vez, repita 100.',
      plays: [
        {
          title: 'Bloco temático por dia',
          do: [
            'Segunda = financeiro. Terça = vendas. Quarta = conteúdo. Sem misturar. Repete toda semana.',
            'Use timer de 50 min com 10 de pausa social (instagram, conversa). Você precisa do estímulo programado.',
          ],
          dont: ['Multitarefa. Você acha que rende; te custa 23% de eficiência cada troca.'],
        },
      ],
    },
  ],

  communication: {
    selfTalk: {
      title: 'Como você deve falar (foco e direção)',
      summary: 'Sua eloquência precisa virar precisão. Menos adjetivo, mais verbo.',
      techniques: [
        { name: 'Regra do título', how: 'Antes de falar 1 minuto, diga em 1 frase o ponto. "Vou te falar 3 coisas: A, B e C." Depois desenvolva. Cliente/time se ancora.' },
        { name: 'Pausa estratégica', how: 'Após uma afirmação importante, pause 3 segundos. Sua mensagem tem peso 2x maior.' },
        { name: 'Pergunta filtradora', how: 'Substitua "o que você acha?" por "o que muda na sua decisão se eu te disser X?". Direciona em vez de abrir leque.' },
      ],
    },
    manualForOthers: {
      title: 'Manual de Instruções: como falar comigo',
      summary: 'Imprima. Mostre para sócio, equipe, parceiro(a).',
      rules: [
        'Reconheça antes de pedir. "Adorei seu trabalho em X. Sobre Y eu queria mudar Z."',
        'Não me dê feedback negativo em público — me defendo, e não escuto.',
        'Se tiver crítica, abra com "tô do seu lado", senão eu interpreto como ataque.',
        'Não me jogue uma planilha sem contexto. Conta a história primeiro.',
        'Quando eu tô empolgado, não corte. Me deixe terminar e DEPOIS racionalize comigo.',
      ],
      scripts: [
        { situation: 'Pedir foco / dizer que dispersou', sayThis: '"Você me ensinou X. Quero te ver entregando isso até quinta. Topa?"', notThis: '"Você nunca termina nada."' },
        { situation: 'Recusar uma ideia minha',           sayThis: '"Genial — vamos guardar para o trimestre que vem. Esse mês foco é Z."', notThis: '"Não, não dá."' },
      ],
    },
  },

  pdi: {
    weeks: [
      {
        week: 1, theme: 'Foco — terminar o que começa',
        summary: 'Esta semana é sobre acabativa. 1 tarefa terminada vale mais que 5 começadas.',
        days: [
          { day: 1, focus: 'Foco', task: 'Liste tudo que está aberto há mais de 30 dias. Escolha 3. Termine 1 hoje.', metric: '1 entrega' },
          { day: 2, focus: 'Foco', task: 'Bloqueio de 90 min sem celular. Avise time, ative modo avião.', metric: '90 min sem interrupção' },
          { day: 3, focus: 'Foco', task: 'Termine a 2ª da lista do dia 1.', metric: '1 entrega' },
          { day: 4, focus: 'Foco', task: 'Diga "não" a 1 convite/projeto novo hoje. Use a frase: "ótima ideia, mês que vem".', metric: '1 não dito' },
          { day: 5, focus: 'Foco', task: 'Termine a 3ª da lista. Comemore: vinho, jantar, o que valer.', metric: '1 entrega' },
          { day: 6, focus: 'Reflexão', task: '3 linhas: "o que aconteceu quando eu terminei em vez de começar?".', metric: 'Reflexão' },
          { day: 7, focus: 'Off',     task: 'Descanso real — sem cursos, sem podcasts.', metric: 'Off' },
        ],
      },
      {
        week: 2, theme: 'Organização pessoal — calendário e dinheiro',
        summary: 'Carisma sem método é ruína silenciosa. Esta semana você instala um SISTEMA mínimo.',
        days: [
          { day:  8, focus: 'Sistema', task: 'Coloque toda compromisso fixo no calendário (treino, almoço, leitura). Ele vira lei.', metric: 'Calendário preenchido' },
          { day:  9, focus: 'Sistema', task: 'Veja seu extrato bancário linha por linha. Identifique 3 gastos automáticos que não fazem sentido. Cancele.', metric: '3 cancelamentos' },
          { day: 10, focus: 'Sistema', task: 'Defina "horário sagrado": 1h sem reunião todo dia. Bloqueie 21 dias seguidos.', metric: '21 blocos criados' },
          { day: 11, focus: 'Sistema', task: 'Conecte seu app de tarefas ao calendário. Toda tarefa tem hora.',   metric: 'Integração feita' },
          { day: 12, focus: 'Sistema', task: 'Faça um "inbox zero" do email com regra: responda, agende ou delete.', metric: 'Inbox zero atingido' },
          { day: 13, focus: 'Reflexão', task: 'Quanto tempo eu economizei essa semana com o sistema novo?', metric: 'Estimativa em horas' },
          { day: 14, focus: 'Off', task: 'Descanso.', metric: 'Off' },
        ],
      },
      {
        week: 3, theme: 'Posicionamento — autoridade > popularidade',
        summary: 'Esta semana você fala MENOS, mas mais pesado.',
        days: [
          { day: 15, focus: 'Posição', task: 'Em todas as reuniões: fale só 2 vezes. Pesado, no ponto.', metric: '<= 2 falas/reunião' },
          { day: 16, focus: 'Posição', task: 'Defenda 1 opinião impopular hoje, com calma. Não recue.', metric: '1 opinião defendida' },
          { day: 17, focus: 'Posição', task: 'Publique 1 reflexão sua original no LinkedIn (não compartilhamento).', metric: 'Post publicado' },
          { day: 18, focus: 'Posição', task: 'Diga "não" para um convite sem explicar muito ("agradeço, não vou conseguir").', metric: '1 não' },
          { day: 19, focus: 'Posição', task: 'Pergunta: "o que eu falei essa semana que tem valor real?". Anote 3.', metric: 'Inventário de valor' },
          { day: 20, focus: 'Síntese', task: 'Reescreva sua bio do Instagram/LinkedIn: tirar 50% das palavras. Manter o essencial.', metric: 'Bio nova' },
          { day: 21, focus: 'Síntese', task: 'Carta ao "I" do dia 1: o que você quer que ele continue fazendo, o que pode parar.', metric: 'Carta escrita' },
        ],
      },
    ],
  },

  downloads: [
    {
      slug: 'ebook-carisma-ao-lucro', kind: 'EBOOK', title: 'Do Carisma ao Lucro — como vender sem virar palhaço',
      pitch: 'Um manual para Influentes que querem ser pagos pelo que falam, não apenas ouvidos.',
      pages: 28, fileName: 'mapa-comportamental_I_ebook-carisma-lucro.pdf',
      toc: [
        '1. Por que carisma sem método empobrece',
        '2. As 5 tipologias de cliente que gostam de você',
        '3. O funil narrativo: começar com história, terminar com proposta',
        '4. 7 perguntas que matam objeção sem brigar',
        '5. Como precificar seu carisma (não cobre por hora)',
        '6. Como construir prova social sem parecer mendigo de elogio',
        '7. Estudo de caso: 3 Influentes que viraram autoridade no nicho',
        'Anexo: 12 frases de fechamento que não soam comerciais',
      ],
    },
    {
      slug: 'checklist-organizacao-criativos', kind: 'CHECKLIST',
      title: 'Organização para Criativos — checklist editável',
      pitch: 'Sistema mínimo viável de organização para quem detesta planilha.',
      pages: 6, fileName: 'mapa-comportamental_I_checklist-organizacao.pdf',
      toc: [
        'Manhã: 3 prioridades em 5 min',
        'Bloco profundo: 90 min, modo avião',
        'Hora social: instagram, café, papo',
        'Revisão de 17h: o que ficou, o que vai amanhã',
        'Sexta às 16h: faxina semanal de inbox e to-do',
        'Termômetro de dispersão (0–10) — check-in diário',
      ],
    },
    {
      slug: 'apostila-narrativa-de-marca', kind: 'PLAYBOOK',
      title: 'Narrativa de Marca para o Influente',
      pitch: 'Como construir uma marca pessoal que não precisa de você o tempo todo.',
      pages: 22, fileName: 'mapa-comportamental_I_apostila-narrativa.pdf',
      toc: [
        '1. A diferença entre presença e autoridade',
        '2. Sua história em 3 atos',
        '3. Pilares de conteúdo: 4 caminhos sustentáveis',
        '4. Calendário editorial de 30 dias',
        '5. Métricas que importam (e as que mentem)',
        '6. Como deixar de criar para começar a rentabilizar',
      ],
    },
  ],
}

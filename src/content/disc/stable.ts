// ============================================================
// Relatório Premium — Perfil ESTÁVEL (S) — "O Pilar"
// ============================================================

import type { PremiumProfileContent } from './types'

export const stableContent: PremiumProfileContent = {
  key:        'S',
  label:      'Estável (S) — O Pilar',
  pitchLine:  'Sua calma é uma força que o mundo subestima. Mas se ninguém ouvir sua voz, sua paz vira invisibilidade. Aqui você aprende a se posicionar — sem deixar de ser quem é.',
  paletteHex: '#7a9e7e',

  analysis: {
    motor: {
      title: 'O Motor: o que realmente te move',
      summary:
        'O Estável é movido por segurança e por relações duradouras. Você prefere construir devagar e entregar para sempre a brilhar uma vez e desaparecer. Sua moeda interna é confiança, não destaque.',
      insights: [
        'Lealdade > Lucro. Você troca uma proposta melhor pela coerência com quem ficou ao seu lado. Esse é seu superpoder — desde que você reconheça que VOCÊ também merece o mesmo.',
        'Você não tem medo de mudança — tem medo de mudança brusca, sem garantia de retorno. Conhecer a porta de saída antes de entrar destrava 80% das suas decisões.',
        'Diz "sim" para evitar conflito e depois resmunga em silêncio. O conflito não desapareceu; mudou de endereço. Mora dentro de você.',
        'Sua maior força é a presença consistente. Em time, é quem segura a casa. Em crise, é quem mantém todo mundo respirando.',
      ],
    },
    shadow: {
      title: 'A Sombra: 3 talentos brilhantes que sua passividade está escondendo',
      summary: 'Você não é tímido. É contido. E essa contenção tem custo invisível.',
      blindspots: [
        {
          name: 'Dificuldade extrema em dizer "não"',
          whatItLooksLike:
            'Você aceita prazos impossíveis para não desagradar. Atende sócio, cliente, família — e a si só sobra a sobra.',
          careerCost:
            'Você é o "bom de serviço" que ninguém promove. A organização premia quem se posiciona, não quem se sacrifica em silêncio.',
          reframe:
            'Cada "sim" mal pensado é um "não" disfarçado para algo importante seu. Não dizer não NÃO é gentileza — é dívida emocional acumulada.',
        },
        {
          name: 'Aversão a conflito que vira evitação a decisão',
          whatItLooksLike:
            'Adia conversas duras. "Vamos ver" virou seu padrão. Quando o problema explode, você diz "eu sabia, mas não quis criar caso".',
          careerCost:
            'Você perde autoridade. Liderados percebem que problemas demoram a chegar à sua mesa — então levam para outra pessoa.',
          reframe:
            'Conflito tratado em fase 1 dói por 1 hora. Conflito ignorado vira crise — dói por 1 mês. Você não evita dor: posterga em juros compostos.',
        },
        {
          name: 'Subestimar o próprio valor (humildade tóxica)',
          whatItLooksLike:
            'Aceita salários abaixo do mercado, dilui sua opinião em reunião com "talvez", "não sei se faz sentido", "é só uma ideia".',
          careerCost:
            'Em negociação salarial, você perde 15-25% do seu potencial todo ano. Em 10 anos, é casa própria.',
          reframe:
            'Humildade é não se achar superior. NÃO é se diminuir. Quem se diminui está sendo desonesto com a equipe que precisa do seu melhor.',
        },
      ],
    },
    fears: {
      title: 'Medos Inconscientes',
      summary: 'O Estável tem medo do que outros perfis NÃO veem como ameaça.',
      items: [
        {
          fear: 'Medo de mudanças bruscas',
          manifestation:
            'Você adia decisões grandes (mudança de cidade, de carreira, fim de relação) por anos. Diz "ainda não é a hora" e o tempo decide por você.',
          decisionImpact:
            'Você acumula arrependimento silencioso. Decide "não decidir" — e a vida toma forma sem o seu consentimento ativo.',
        },
        {
          fear: 'Medo de decepcionar quem te ama',
          manifestation:
            'Você opta pelo que a família espera, não pelo que você quer. Casamento, profissão, moradia. Tudo "para fazer o certo".',
          decisionImpact:
            'Em algum ponto chega o cansaço acumulado. Aos 40, 45, 50 anos vira crise existencial em pleno colo da família que você queria proteger.',
        },
        {
          fear: 'Medo do conflito que pode quebrar uma relação',
          manifestation:
            'Engole. Sorri. "Tá tudo bem". Por anos. Até não estar.',
          decisionImpact:
            'Você decide pelo silêncio até que a relação chegue a um ponto em que não pode mais ser salva. O conflito que você evitou agora é divórcio, não conversa.',
        },
      ],
    },
  },

  career: [
    {
      context: 'leadership',
      headline: 'Liderança silenciosa — gestor de crise que ninguém substitui',
      diagnosis:
        'O Estável é o melhor gestor de crise possível: calma, presença, escuta. Mas em ambiente calmo, você desaparece. Você precisa aparecer ANTES da crise para não sumir entre crises.',
      plays: [
        {
          title: 'Posicionamento sem holofote',
          do: [
            'Em reuniões, faça SEMPRE 1 pergunta de profundidade. ("E se considerássemos o efeito de Y em 6 meses?") É sua autoridade natural.',
            'Compartilhe achados em mensagem semanal de 5 linhas para o time. Você fica visível sem precisar performar.',
          ],
          dont: [
            'Dizer "não tenho nada a acrescentar". Você sempre tem.',
            'Esperar ser chamado para falar. Toma a palavra você.',
          ],
        },
        {
          title: 'Como conduzir crise (seu superpoder)',
          do: [
            'Em momentos críticos, você é a referência. Comunique RITMO: "vamos resolver em 3 passos. Passo 1 hoje, passo 2 amanhã. Eu te aviso quando passar de cada".',
            'Mantenha decisões VISÍVEIS — quadro, planilha, mensagem fixada. Time precisa ver o terreno firme que você está construindo.',
          ],
          dont: ['Carregar a crise sozinho. Você é estrutura, não burro de carga.'],
        },
      ],
    },
    {
      context: 'sales',
      headline: 'Vender pela confiança, não pela velocidade',
      diagnosis:
        'Você não é o melhor para closing rápido. É o melhor para venda longa, complexa, B2B. Sua arma é o cliente que volta — porque com você ele se sente seguro.',
      plays: [
        {
          title: 'Venda consultiva — seu terreno natural',
          do: [
            'Documente cada conversa. Mande resumo após cada call: "validamos X, próximo passo Y". Cliente sente segurança crescente.',
            'Trabalhe ciclos longos sem ansiedade. Você ganha onde Dominantes desistem.',
          ],
          dont: [
            'Tentar acelerar por medo de perder. Quando você acelera, você gagueja, e o cliente percebe insegurança.',
          ],
        },
        {
          title: 'Pedir mais por seu trabalho',
          do: [
            'Antes de cada nova proposta, leve um caso anterior bem-sucedido. Ancore preço NO RESULTADO entregue.',
            'Pratique a frase: "esse é o investimento" — sem desconto preventivo.',
          ],
          dont: ['Oferecer desconto antes de o cliente pedir. Você ensina que seu preço é fictício.'],
          script: '"Para o que você precisa, o investimento é R$ X. Em 3 meses, você recupera com Y. Faz sentido começarmos?"',
        },
      ],
    },
    {
      context: 'negotiation',
      headline: 'Em mesa de negociação: usar o tempo a seu favor',
      diagnosis: 'Sua paciência é arma. Quem tem pressa, perde. Use isso.',
      plays: [
        {
          title: 'Silêncio estratégico',
          do: [
            'Quando o outro lado pressionar por decisão imediata, diga: "preciso pensar até amanhã". E não decida hoje.',
            'Em negociação, sua frase favorita: "isso é interessante. Vamos olhar com calma."',
          ],
          dont: ['Ceder por desconforto. Desconforto não é argumento.'],
        },
      ],
    },
    {
      context: 'operational',
      headline: 'Mantendo o ritmo sem virar repetidor sem alma',
      diagnosis: 'Rotina é seu conforto, mas conforto vira coma. Renove sem revolução.',
      plays: [
        {
          title: 'Pequenas mudanças intencionais',
          do: [
            'A cada trimestre, mude UMA variável: novo software, novo método, novo horário. Pequeno mas firme.',
            'Tire 1 hora por semana para "como melhorar isso?". Sua melhoria contínua é seu motor.',
          ],
          dont: ['Repetir o mesmo método por anos sem questionar.'],
        },
      ],
    },
  ],

  communication: {
    selfTalk: {
      title: 'Como você deve falar (autoafirmação calma)',
      summary: 'Sua voz não precisa ser alta — precisa ser presente. Aprenda a ocupar espaço sem violar sua natureza.',
      techniques: [
        { name: 'Posicionamento simples',  how: 'Substitua "talvez" e "não sei se" por "minha leitura é que…". Você se posiciona sem agredir.' },
        { name: 'Pausa ativa',              how: 'Quando alguém fizer pergunta, respire 2 segundos antes de responder. Mostra ponderação, não dúvida.' },
        { name: 'Eu vs nós',                how: 'Em reuniões importantes, use "eu" em pelo menos 1 frase. ("EU acredito que…") Treina autoridade.' },
      ],
    },
    manualForOthers: {
      title: 'Manual de Instruções: como falar comigo',
      summary: 'Eu sou simples — só não sou rápido. Respeite o meu protocolo e tenha o meu melhor.',
      rules: [
        'Me dê tempo para responder. Pressa em decisão me trava.',
        'Mude com aviso, não de surpresa. "Semana que vem vamos mudar X" funciona; "agora mesmo isso muda" me paralisa.',
        'Reconheça consistência. Eu não preciso de holofote semanal — preciso saber que você vê o que eu faço todo dia.',
        'Quando eu falar pouco em reunião, me chame para opinar. Eu tenho ideia, só não me imponho.',
        'Conflito? Trate em particular, não em frente a todo mundo.',
      ],
      scripts: [
        { situation: 'Pedir prazo apertado',     sayThis: '"Preciso pra quinta. Sei que é apertado. Posso te ajudar tirando X da sua mesa em troca?"', notThis: '"Pra ontem, é urgente!"' },
        { situation: 'Discordar do que você fez', sayThis: '"O que você fez tá ótimo em A e B. Em C eu vejo um risco. Conversamos?"', notThis: '"Tá errado isso aqui."' },
      ],
    },
  },

  pdi: {
    weeks: [
      {
        week: 1, theme: 'Autoafirmação — instalar a "voz"',
        summary: 'Esta semana você ocupa espaço pequeno mas regular. Construir a coragem em doses.',
        days: [
          { day: 1, focus: 'Voz', task: 'Em reunião, faça 1 pergunta concreta. Anote a sensação depois.', metric: '1 pergunta feita' },
          { day: 2, focus: 'Voz', task: 'Diga "EU" em 3 frases hoje (em vez de "a gente").',                metric: '3 frases com EU' },
          { day: 3, focus: 'Voz', task: 'Discordar de algo pequeno (escolha de jantar, horário). Sem brigar — só posicionar.', metric: '1 discordância calma' },
          { day: 4, focus: 'Voz', task: 'Diga "não" a 1 pedido pequeno hoje. ("Hoje não vou conseguir, terça posso.")', metric: '1 não' },
          { day: 5, focus: 'Voz', task: 'Em e-mail/chat, tire as palavras de redução: "só", "talvez", "rapidinho".', metric: 'Texto reescrito' },
          { day: 6, focus: 'Reflexão', task: 'O que aconteceu de ruim quando você se posicionou? Quase nada.', metric: 'Diário 3 linhas' },
          { day: 7, focus: 'Off',   task: 'Descanso ativo (caminhada, leitura).', metric: 'Off' },
        ],
      },
      {
        week: 2, theme: 'Decisão rápida — quebrar a paralisia',
        summary: 'Esta semana você decide em 24h o que normalmente decide em 2 semanas.',
        days: [
          { day:  8, focus: 'Decisão', task: 'Liste 3 decisões pendentes. Coloque prazo: hoje, amanhã, sexta.', metric: 'Lista feita' },
          { day:  9, focus: 'Decisão', task: 'Resolva a do dia. Sem perfeccionismo. 70% bom = decidido.',         metric: '1 decisão' },
          { day: 10, focus: 'Decisão', task: 'Nenhuma resposta hoje "vou pensar". Ou sim, ou não.',               metric: '0 enrolação' },
          { day: 11, focus: 'Decisão', task: 'Resolva a 2ª da lista.',                                            metric: '1 decisão' },
          { day: 12, focus: 'Decisão', task: 'Tome decisão pequena de impacto pessoal: livro novo, treino diferente.', metric: '1 decisão' },
          { day: 13, focus: 'Reflexão', task: 'Decisões caíram? Mudou clima de casa/trabalho?',                    metric: 'Diário' },
          { day: 14, focus: 'Off', task: 'Descanso.', metric: 'Off' },
        ],
      },
      {
        week: 3, theme: 'Saída da zona de conforto — desconforto controlado',
        summary: 'Esta semana você experimenta UM desconforto novo POR DIA. Pequeno. Doses.',
        days: [
          { day: 15, focus: 'Desconforto', task: 'Almoço com alguém que você admira mas nunca chamou.', metric: 'Almoço marcado' },
          { day: 16, focus: 'Desconforto', task: 'Pergunta dura para o gestor: "como eu poderia subir aqui dentro?"', metric: 'Pergunta feita' },
          { day: 17, focus: 'Desconforto', task: 'Compartilhe ideia incompleta no grupo. Sem polir.', metric: '1 mensagem' },
          { day: 18, focus: 'Desconforto', task: 'Aula/curso fora da sua área (15 min).', metric: '15 min' },
          { day: 19, focus: 'Desconforto', task: 'Negocie 1 valor (academia, plano, conta). Você merece.', metric: '1 negociação' },
          { day: 20, focus: 'Desconforto', task: 'Peça feedback de 1 pessoa próxima: "o que eu poderia fazer melhor?"', metric: 'Feedback recebido' },
          { day: 21, focus: 'Síntese',     task: 'Carta ao S do dia 1: "como eu sou mais eu agora".', metric: 'Carta escrita' },
        ],
      },
    ],
  },

  downloads: [
    {
      slug: 'playbook-lideranca-silenciosa', kind: 'PLAYBOOK',
      title: 'O Poder da Liderança Silenciosa',
      pitch: 'Como liderar sem precisar gritar — manual estratégico para o Estável que quer crescer sem virar quem ele não é.',
      pages: 22, fileName: 'mapa-comportamental_S_playbook-lideranca-silenciosa.pdf',
      storagePath: 'disc/stable/playbook-lideranca-silenciosa.pdf',
      toc: [
        '1. O paradoxo do Estável: forte mas invisível',
        '2. Princípios da Liderança Silenciosa',
        '3. Como ser visto sem performar',
        '4. Reuniões 1:1 — o seu terreno natural',
        '5. Mediar conflitos do time (sua arma definitiva)',
        '6. Como pedir aumento e promoção',
        '7. Estudo de caso: 3 Estáveis que viraram VPs',
        'Anexo: 10 frases para se posicionar com firmeza e calma',
      ],
    },
    {
      slug: 'questionario-saude-emocional', kind: 'WORKSHEET',
      title: 'Questionário de Saúde Emocional no Trabalho',
      pitch: 'Check-in editável para preencher toda sexta-feira — você acompanha sua estabilidade real, não a aparente.',
      pages: 4, fileName: 'mapa-comportamental_S_questionario-saude.pdf',
      storagePath: 'disc/stable/questionario-saude-emocional.pdf',
      toc: [
        'Como me senti essa semana? (escala 0–10)',
        'Quantas vezes disse "sim" sem querer dizer? (contador)',
        'Algum conflito adiado? Qual?',
        'Algum reconhecimento recebido? Algum dado?',
        '3 coisas que me energizaram',
        '1 desconforto controlado que experimentei',
      ],
    },
    {
      slug: 'apostila-decisao-rapida', kind: 'EBOOK',
      title: 'Decisão Rápida Sem Perder a Sabedoria',
      pitch: 'Guia para o S que se cobra por demorar — sem virar Dominante atropelador.',
      pages: 26, fileName: 'mapa-comportamental_S_apostila-decisao-rapida.pdf',
      storagePath: 'disc/stable/apostila-decisao-rapida.pdf',
      toc: [
        '1. Diferença entre PRECIPITAÇÃO e VELOCIDADE inteligente',
        '2. Regra dos 70%: decida com 70% das informações',
        '3. Pré-mortem: como antecipar tudo o que pode dar errado',
        '4. Decisões reversíveis vs irreversíveis: tratar diferente',
        '5. Como desbloquear sua paralisia em 5 perguntas',
        '6. Estudo de caso',
      ],
    },
  ],
}

// ============================================================
// Relatório Premium — Perfil DOMINANTE (D) — "O Executor"
// Tom: Mentor de Alta Performance + Psicólogo Organizacional.
// Linguagem direta, prática, sem encheção de linguiça.
// ============================================================

import type { PremiumProfileContent } from './types'
import { dominantPlaybookBody } from './downloads/dominant-playbook'
import { dominantCnvBody }      from './downloads/dominant-cnv'
import { dominantChecklistBody } from './downloads/dominant-checklist'

export const dominantContent: PremiumProfileContent = {
  key:        'D',
  label:      'Dominante (D) — O Executor',
  pitchLine:  'Você não foi feito para esperar permissão. Foi feito para fazer acontecer — mas seu próprio acelerador é também o seu maior risco.',
  paletteHex: '#c4633a',

  // ──────────────────────────────────────────────────────────
  // 1) ANATOMIA DO PODER
  // ──────────────────────────────────────────────────────────
  analysis: {
    motor: {
      title: 'O Motor: o que realmente te move',
      summary:
        'O Dominante não é movido pelo dinheiro nem pelo prestígio — é movido pela soberania sobre o próprio destino. Ganhar é apenas o sintoma de uma necessidade mais profunda: provar que é capaz de moldar a realidade ao próprio comando.',
      insights: [
        'Autonomia > Reconhecimento. Você prefere errar sozinho a acertar dependendo de alguém. Esse traço é o que te tornou capaz, mas é também o que te impede de delegar.',
        'Desafio = oxigênio. Sem um problema concreto para resolver, você se sente em colapso silencioso. É por isso que você inventa "incêndios" quando a operação está calma — não é vício em adrenalina, é abstinência de propósito.',
        'Velocidade é seu jeito de demonstrar amor pelo trabalho. Quando você pressa, você está dizendo "isso importa para mim". O time entende como agressão. A barreira é cultural, não emocional.',
        'Você confunde liderança com responsabilidade. Acredita que delegar é abdicar — quando, na verdade, é multiplicar. Esse é o ajuste que vai te levar do executor de R$ 30k/mês para o líder de R$ 100k+.',
      ],
    },

    shadow: {
      title: 'A Sombra: os 3 pontos cegos que estão te custando dinheiro',
      summary:
        'Pontos cegos não são defeitos — são forças usadas no contexto errado. Aqui você verá exatamente quanto cada um deles está custando agora.',
      blindspots: [
        {
          name: 'Impaciência crônica disfarçada de "senso de urgência"',
          whatItLooksLike:
            'Você corta a fala do interlocutor, decide antes do término da reunião, abandona conversas que não vão direto ao ponto. Externamente parece eficiência. Internamente, é incapacidade de tolerar ambiguidade.',
          careerCost:
            'Você perde 30% das oportunidades de venda complexa porque o cliente não sente que foi ouvido. Em promoções, você é descrito como "tem energia, mas não tem maturidade política".',
          reframe:
            'A pausa de 4 segundos antes de responder dobra a percepção de inteligência do interlocutor sobre você. Velocidade de pensamento é mérito; velocidade de fala é fragilidade emocional.',
        },
        {
          name: 'Falta de empatia operacional (não emocional)',
          whatItLooksLike:
            'Você sabe o que o outro sente — você só não considera relevante. Você não é insensível, é seletivo: sentimentos que não destravam resultado parecem desperdício de tempo.',
          careerCost:
            'Turnover do seu time é 2x a média. Cada saída custa de 6 a 9 meses de salário em recontratação. Isso é prejuízo real, não "soft skill".',
          reframe:
            'Empatia não é abandonar o resultado — é descobrir que motiva cada pessoa para o resultado vir mais rápido. É a alavanca, não o freio.',
        },
        {
          name: 'Aversão a processo (você só faz o que conhece)',
          whatItLooksLike:
            'Você documenta pouco, repete o que funciona até parar de funcionar, e quando para, culpa o mercado. Você prefere ação ruim a planejamento bom.',
          careerCost:
            'Sua operação não escala porque mora no seu cérebro. Você é o teto da empresa. Enquanto isso, perfis menos talentosos te ultrapassam porque construíram sistemas.',
          reframe:
            'Sistema é alavancagem. Documentar 1 vez = automatizar para sempre. O Dominante de elite vira o arquiteto, não o operador.',
        },
      ],
    },

    fears: {
      title: 'Medos Inconscientes: o que move suas decisões abaixo da consciência',
      summary:
        'Você não se considera medroso — e está certo. Mas decisões pesadas raramente são tomadas pela razão; são tomadas para fugir destes 3 medos:',
      items: [
        {
          fear: 'Medo de ser explorado / passado para trás',
          manifestation:
            'Você desconfia rápido demais. Acaba acordos, encerra parcerias, demite com base em "intuição". Em retrospectiva, 60% dessas decisões foram precipitadas.',
          decisionImpact:
            'Você prefere perder um aliado a correr o risco de ser usado por ele. Resultado: rede de contatos rasa, alianças frágeis. Sem rede, o teto da carreira é o seu próprio braço.',
        },
        {
          fear: 'Medo de perder o controle da situação',
          manifestation:
            'Microgerenciamento em momentos de pressão. Centralização de decisões. Recusa em entrar em sociedades onde não tem >50%.',
          decisionImpact:
            'Você troca crescimento por previsibilidade. Diz "sim" à autonomia e "não" à escala. Quem cresce 10x aceita perder controle de 50% para ganhar 10x.',
        },
        {
          fear: 'Medo de ser visto como fraco / vulnerável',
          manifestation:
            'Não pede ajuda. Não admite não saber. Sobrecarrega-se até quebrar — e quando quebra, faz silêncio em vez de chamar reforço.',
          decisionImpact:
            'Você atrasa decisões que exigiriam reconhecer que você precisa de gente melhor que você ao seu redor. É o motivo principal pelo qual o Dominante mediano nunca vira o Dominante extraordinário.',
        },
      ],
    },
  },

  // ──────────────────────────────────────────────────────────
  // 2) CONSULTORIA DE CARREIRA
  // ──────────────────────────────────────────────────────────
  career: [
    {
      context: 'leadership',
      headline: 'Como parar de "mandar" e começar a "inspirar"',
      diagnosis:
        'Liderar sob pressão é diferente de liderar sob comando. Você é excelente quando há crise. É medíocre quando há rotina. A correção está na delegação por contexto, não por tarefa.',
      plays: [
        {
          title: 'Delegação por nível de autonomia',
          do: [
            'Classifique CADA tarefa do time em 4 níveis: 1) Faça e me reporte. 2) Faça quando aprovar. 3) Pesquise e me apresente. 4) Decida e execute.',
            'Comunique o nível EXPLICITAMENTE no momento da delegação. "Esse projeto está em nível 4 — você decide."',
            'Reveja o nível mensalmente. Subir o nível = forma concreta de promover sem mexer no salário.',
          ],
          dont: [
            'Delegar sem contexto e cobrar como se tivesse contextualizado.',
            'Mudar o nível no meio do caminho ("achei melhor eu mesmo decidir").',
          ],
          script:
            '"Esse projeto está em nível 3. Quero que você pesquise e me traga 3 opções com pró e contra até quinta. Eu escolho. Próxima rodada subo para nível 4 se você acertar."',
        },
        {
          title: 'Feedback executor: o método 1-3-1',
          do: [
            '1 ponto forte específico (com exemplo concreto da semana).',
            '3 melhorias mensuráveis (não opiniões — comportamentos observáveis).',
            '1 compromisso claro de acompanhamento (data e métrica).',
          ],
          dont: [
            'Sanduíche genérico ("você é ótimo, MAS...").',
            'Feedback público quando o ponto é negativo.',
          ],
        },
      ],
    },

    {
      context: 'sales',
      headline: 'Assertividade que fecha contrato — sem virar arrogância',
      diagnosis:
        'O Dominante perde venda complexa porque negocia como se fosse leilão. Cliente sente que está sendo "vencido", não atendido. A virada está em transformar autoridade em segurança, não em pressão.',
      plays: [
        {
          title: 'A pergunta-âncora antes do pitch',
          do: [
            'Pergunte: "Em uma escala de 0 a 10, quão prioritário é resolver isso AGORA?". Se vier menos que 7, NÃO faça o pitch. Aprofunde a dor.',
            'Quando vier 8+, vá direto: produto, prazo, preço, próximo passo. Sem floreio.',
          ],
          dont: [
            'Apresentar features antes de validar urgência. É o erro número 1 do Dominante em vendas.',
          ],
        },
        {
          title: 'O fechamento por consequência',
          do: [
            'Substitua "fecha?" por "se você não decidir agora, qual é o custo nas próximas 4 semanas?". Faça o cliente quantificar.',
            'Silêncio depois da pergunta. Nunca preencha. Quem fala primeiro perde alavancagem.',
          ],
          dont: [
            'Oferecer desconto para acelerar. Você ensina o cliente que seu preço é negociável e perde 8-15% de margem.',
          ],
          script:
            '"Posso te enviar a proposta hoje à tarde. Mas quero entender: se nada mudar nas próximas 4 semanas, o que isso te custa em receita ou tempo? [pausa] Pelo que você me disse, é R$ X. Faz sentido a gente acelerar?"',
        },
      ],
    },

    {
      context: 'negotiation',
      headline: 'Mesa de negociação contra Estáveis e Analistas',
      diagnosis:
        'Você ganha em velocidade. Eles ganham em paciência. Em ambientes onde o "tempo" é variável, eles vencem você. Aprenda a negociar no terreno deles.',
      plays: [
        {
          title: 'Contra um Estável (S): use segurança, não pressão',
          do: [
            'Mostre números, casos parecidos, garantias. Estáveis decidem por consenso interno — dê munição para ele defender o "sim" para a equipe dele.',
            'Aceite reuniões adicionais. "Vamos fechar agora" mata o S.',
          ],
          dont: [
            'Forçar deadline curto. Você ativa o medo dele. Ele não diz não — ele desaparece.',
          ],
        },
        {
          title: 'Contra um Analista (C): use dado, não emoção',
          do: [
            'Envie planilha, ROI calculado, premissas explícitas. Aceite ser questionado em cada linha.',
            'Reconheça incertezas. Falar "eu não sei mas vou descobrir" gera mais credibilidade do que improvisar.',
          ],
          dont: [
            'Vender visão sem números. C te tira credibilidade nos primeiros 30 segundos.',
            'Pressionar por velocidade. C interpreta como falta de robustez.',
          ],
        },
      ],
    },

    {
      context: 'operational',
      headline: 'Manter a fome em tarefa de rotina',
      diagnosis:
        'Você morre por dentro em rotina porque transforma rotina em "sobrevivência". A virada é transformar rotina em campeonato.',
      plays: [
        {
          title: 'Gamificar o operacional',
          do: [
            'Defina meta SEMANAL específica para a tarefa-chata (ex.: "responder 50 emails em <90s cada"). Bata todo dia.',
            'Crie placar visível só para você. O Dominante precisa ver progresso.',
          ],
          dont: [
            'Esperar motivação chegar. Ela nunca chega para esse perfil em rotina. Crie a pressão artificialmente.',
          ],
        },
      ],
    },
  ],

  // ──────────────────────────────────────────────────────────
  // 3) GUIA DE COMUNICAÇÃO
  // ──────────────────────────────────────────────────────────
  communication: {
    selfTalk: {
      title: 'Como você deve falar (assertividade real)',
      summary:
        'Assertividade do Dominante NÃO é falar mais — é falar com mais precisão e menos volume. O alto nível do D é o que fala pouco e cada palavra pesa.',
      techniques: [
        {
          name: 'Regra dos 4 segundos',
          how:  'Conte mentalmente 1-2-3-4 antes de responder em qualquer reunião. Você duplica a percepção da sua maturidade sem perder velocidade real.',
        },
        {
          name: 'Frase única',
          how:  'Antes de falar, pergunte-se: "qual é a UMA frase que precisa sair?". Diga só essa. Pare. Quem dispersa, perde poder.',
        },
        {
          name: 'Ponto + pergunta',
          how:  'Substitua "afirmação seguida de afirmação" por "afirmação + pergunta". Exemplo: "Acho que esse caminho vai funcionar. Você concorda? O que mudaria?". Você mantém autoridade E convida outros perfis para o jogo.',
        },
      ],
    },

    manualForOthers: {
      title: 'Manual de Instruções: como os outros devem falar com você',
      summary:
        'Imprima esta seção. Mostre para sua equipe, seu sócio, sua família. Você não é difícil — você só funciona em outro protocolo.',
      rules: [
        'Vá direto. Diga o pedido nas primeiras 2 frases. Contexto vem depois.',
        'Tenha um número. "Mais ou menos", "uns dias", "talvez" me desligam.',
        'Não me peça opinião se você só quer apoio. Diga: "preciso de apoio, não de solução".',
        'Não traga problema sem trazer 2 hipóteses de solução.',
        'Se eu te interromper, me diga "pera, deixa eu terminar". Eu respeito mais do que pareço.',
      ],
      scripts: [
        {
          situation: 'Discordar de uma decisão minha',
          sayThis:   '"Concordo com 80%. Em 20% eu vejo um risco: [risco específico]. Posso defender?"',
          notThis:   '"Acho que talvez não seja a melhor ideia..."',
        },
        {
          situation: 'Pedir mais tempo / prazo',
          sayThis:   '"Preciso de +3 dias úteis. O motivo é X. Em troca eu te entrego Y mais robusto. Aceita?"',
          notThis:   '"Tô cheio de coisa, vai atrasar..."',
        },
        {
          situation: 'Trazer problema emocional',
          sayThis:   '"Quero te falar uma coisa que não tem solução agora — preciso só que você ouça. 5 minutos."',
          notThis:   '"A gente precisa conversar..."',
        },
      ],
    },
  },

  // ──────────────────────────────────────────────────────────
  // 4) PDI — DESAFIO DOS 21 DIAS
  // ──────────────────────────────────────────────────────────
  pdi: {
    weeks: [
      {
        week: 1,
        theme: 'Escuta Ativa — desligar o piloto automático',
        summary:
          'Você não escuta — você processa. Esta semana você vai ESCUTAR e medir.',
        days: [
          { day: 1, focus: 'Escuta Ativa', task: 'Em 1 reunião do dia, NÃO interrompa NINGUÉM. Anote no celular cada vez que sentir vontade de cortar. Conte ao fim.', metric: 'Número de impulsos contidos' },
          { day: 2, focus: 'Escuta Ativa', task: 'Em qualquer conversa de >5 min, espelhe a última frase do interlocutor antes de responder. ("Você disse que X… é isso?")', metric: '3 espelhamentos no dia' },
          { day: 3, focus: 'Escuta Ativa', task: 'Faça 1 pergunta aberta para alguém do time ("o que está te incomodando esse mês?") e fique calado por 90 segundos. Se preencher, perdeu.', metric: 'Tempo total de silêncio mantido' },
          { day: 4, focus: 'Escuta Ativa', task: 'Almoço de 45 min com alguém que pensa diferente. Sua meta: falar menos da metade do tempo.', metric: '<50% do tempo falando' },
          { day: 5, focus: 'Escuta Ativa', task: 'Diário noturno (3 linhas): "O que aprendi escutando hoje que eu teria perdido se tivesse falado?"', metric: 'Diário entregue' },
          { day: 6, focus: 'Reflexão', task: 'Recapitule a semana. Identifique 1 reunião onde a escuta abriu uma porta que a sua "voz" não abriria.', metric: 'Insight identificado' },
          { day: 7, focus: 'Descanso ativo', task: 'Não trabalhe. Mas leia 30 min de algo fora da sua área (filosofia, biografia, romance).', metric: '30 min de leitura' },
        ],
      },
      {
        week: 2,
        theme: 'Inteligência Emocional — reconhecer o trabalho dos outros',
        summary:
          'Você dá feedback negativo em segundos e elogio em meses. Esta semana inverte.',
        days: [
          { day: 8,  focus: 'Reconhecimento', task: 'Mande 3 elogios ESPECÍFICOS por mensagem (não "bom trabalho" — algo concreto que a pessoa fez).', metric: '3 mensagens enviadas' },
          { day: 9,  focus: 'Reconhecimento', task: 'Em reunião pública, atribua 1 ideia recente a quem realmente teve. Inclusive se foi seu júnior.', metric: 'Atribuição feita' },
          { day: 10, focus: 'Reconhecimento', task: 'Pergunte a 1 colaborador: "o que você gostaria de fazer mais?". Anote. Não comente. Use como combustível na próxima delegação.', metric: 'Pergunta feita + nota' },
          { day: 11, focus: 'IE pessoal', task: 'Identifique 1 momento do dia em que você sentiu raiva no trabalho. Responda no caderno: o que estava por trás? medo? cansaço?', metric: 'Reflexão escrita' },
          { day: 12, focus: 'IE pessoal', task: 'Conversa difícil que você está adiando. Marque para hoje. Vá com curiosidade, não com acusação.', metric: 'Conversa realizada' },
          { day: 13, focus: 'Recuperação', task: 'Pergunte para sua família ou parceiro(a): "estou conseguindo estar presente?". Ouça em silêncio.', metric: 'Pergunta + escuta' },
          { day: 14, focus: 'Reflexão', task: 'Pesa balanço da semana: onde você foi humano em vez de máquina?', metric: 'Diário entregue' },
        ],
      },
      {
        week: 3,
        theme: 'Estratégico vs Operacional — a hora de NÃO colocar a mão',
        summary:
          'Esta semana você aprende que não fazer pode ser o ato mais inteligente do mês.',
        days: [
          { day: 15, focus: 'Estratégia', task: 'Liste TODAS as suas tarefas semanais. Marque com X as que você é o ÚNICO no mundo capaz. Você verá que são <30%.', metric: 'Lista classificada' },
          { day: 16, focus: 'Estratégia', task: 'Das tarefas que NÃO são únicas, escolha 1 e delegue HOJE — explicitamente em nível 4 (decida e execute).', metric: 'Delegação feita' },
          { day: 17, focus: 'Estratégia', task: 'Bloqueie 90 min na agenda chamado "Pensar". Sem celular. Sem reunião. Tema: "qual é o gargalo do mês".', metric: 'Bloco realizado' },
          { day: 18, focus: 'Estratégia', task: 'Quando alguém vier com problema, pergunte: "o que VOCÊ acha que deveríamos fazer?" antes de responder. Sempre.', metric: 'Aplicado em todos os casos' },
          { day: 19, focus: 'Visão',     task: 'Escreva em 1 parágrafo onde você quer estar em 12 meses. Coloque na carteira.', metric: 'Parágrafo escrito + arquivado' },
          { day: 20, focus: 'Visão',     task: 'Identifique 1 hábito atual que NÃO te leva ao parágrafo do dia 19. Pare hoje.', metric: 'Hábito identificado e cessado' },
          { day: 21, focus: 'Síntese',   task: 'Reescreva em 1 página: "como sou diferente do D que iniciou esses 21 dias". Compartilhe com 1 pessoa.', metric: 'Documento entregue' },
        ],
      },
    ],
  },

  // ──────────────────────────────────────────────────────────
  // 5) DOWNLOADS
  // ──────────────────────────────────────────────────────────
  downloads: [
    {
      slug:     'playbook-comando-vs-situacional',
      kind:     'PLAYBOOK',
      title:    'Liderança de Comando e Controle vs. Liderança Situacional',
      pitch:    'Manual operacional para o Dominante que quer escalar de gestor de tarefas para arquiteto de times.',
      pages:    24,
      fileName: 'mapa-comportamental_D_playbook-lideranca.pdf',
      // Conteúdo programático completo (preferido — gera PDF de 24+ páginas)
      body:        dominantPlaybookBody,
      // Fallback se body não existir
      storagePath: 'disc/dominant/playbook-comando-vs-situacional.pdf',
      toc: [
        '1. O paradoxo do Executor — por que sua eficiência tem teto',
        '2. Os 4 níveis de delegação — quando cada um se aplica',
        '3. Diagnóstico de maturidade do liderado (template imprimível)',
        '4. O método 1-3-1 de feedback de alto desempenho',
        '5. Reuniões 1:1 — roteiro de 30 min que substitui 4h de microgerência',
        '6. Como demitir sem destruir o time (e sem culpa)',
        '7. KPIs de liderança que você não pode ignorar',
        '8. Estudo de caso: 3 Dominantes que viraram CEOs',
        'Anexo A: 12 frases para usar nas reuniões 1:1',
        'Anexo B: Modelo de OKR para times comandados por D',
      ],
    },
    {
      slug:     'checklist-manha-do-executor',
      kind:     'CHECKLIST',
      title:    'A Manhã do Executor de Elite — checklist diário (90 min)',
      pitch:    'Sua produtividade do dia inteiro é decidida nos primeiros 90 min. Checklist editável com campos para imprimir e marcar.',
      pages:    4,
      fileName: 'mapa-comportamental_D_checklist-manha.pdf',
      body:        dominantChecklistBody,
      storagePath: 'disc/dominant/checklist-manha-do-executor.pdf',
      toc: [
        'Bloco 1 (5–25 min): movimento físico + hidratação',
        'Bloco 2 (25–35 min): revisão escrita do dia (3 prioridades)',
        'Bloco 3 (35–60 min): trabalho profundo na tarefa #1',
        'Bloco 4 (60–80 min): revisão de equipe (assíncrono)',
        'Bloco 5 (80–90 min): respiração + intenção do dia',
        'Termômetro de impaciência (escala 0–10) com check-in noturno',
      ],
    },
    {
      slug:     'apostila-cnv-dominantes',
      kind:     'EBOOK',
      title:    'Comunicação Não-Violenta para Perfis de Alta Dominância',
      pitch:    'Scripts prontos para conversas difíceis: feedback negativo, conflito com sócio, pedido de desculpa público, dispensar sem destruir.',
      pages:    32,
      fileName: 'mapa-comportamental_D_apostila-cnv.pdf',
      body:        dominantCnvBody,
      storagePath: 'disc/dominant/apostila-cnv-dominantes.pdf',
      toc: [
        '1. Por que CNV é arma estratégica, não fragilidade',
        '2. As 4 etapas (observação, sentimento, necessidade, pedido)',
        '3. Script: feedback negativo para liderado abaixo da meta',
        '4. Script: conversa com sócio sobre divergência de visão',
        '5. Script: pedido público de desculpa (sem perder autoridade)',
        '6. Script: demitir um colaborador antigo',
        '7. Script: cônjuge — "não é sobre você, é sobre o ritmo"',
        '8. Erros mais comuns do Dominante em CNV',
        'Anexo: glossário de palavras a EVITAR e SUBSTITUIR',
      ],
    },
  ],
}

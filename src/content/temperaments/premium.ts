// ============================================================
// Relatório Premium — 4 TEMPERAMENTOS
// Foco: Natureza Biológica e Reações Instintivas.
// Estrutura premium específica do tema:
//   - Alimentação e Energia
//   - Gestão de Raiva/Ansiedade
//   - Virtudes e Vícios (filosófico)
// ============================================================

export type TemperamentKey = 'COLERICO' | 'SANGUINEO' | 'MELANCOLICO' | 'FLEUMATICO'

export interface TemperamentPremium {
  key:      TemperamentKey
  label:    string
  pitch:    string
  paletteHex: string
  body: {
    biology:    string                       // como o corpo dele responde
    energyCurve: string                      // pico de energia ao longo do dia
    sleep:       string                      // padrão de sono ideal
  }
  food: {
    summary: string
    stimulants: string[]                     // a EVITAR
    grounding:  string[]                     // a INCLUIR
    sample_day: { meal: string; suggestion: string }[]
  }
  stress: {
    acuteResponse:  string                   // reação imediata ao estresse
    rageOrAnxiety:  string                   // raiva ou ansiedade?
    techniques:     Array<{ name: string; how: string; duration: string }>
  }
  virtuesVices: {
    cardinalVirtue: string
    cardinalVice:   string
    practices: string[]                      // 5 práticas para equilibrar
  }
  pdi21Days: Array<{ day: number; focus: string; task: string }>
}

// ──────────────────────────────────────────────────────────
// COLÉRICO · O COMBUSTÍVEL
// ──────────────────────────────────────────────────────────
export const colericoPremium: TemperamentPremium = {
  key: 'COLERICO',
  label: 'Colérico · O Combustível',
  pitch: 'Você vive em chama. A pergunta não é se vai queimar; é o que vai aceder ANTES de queimar.',
  paletteHex: '#c4633a',

  body: {
    biology:
      'Sistema nervoso simpático ativado por padrão. Adrenalina e noradrenalina sobem rápido e descem devagar. Por isso você "fica acelerado" mesmo depois do gatilho passar.',
    energyCurve:
      'Pico entre 6h–11h. Queda forte às 14h–15h (não é preguiça, é depleção). 2º pico fraco às 18h. Insônia "irritada" (não cansada) é comum se o dia teve conflito.',
    sleep:
      'Ideal: dormir antes das 23h. Quanto mais tarde, mais difícil, porque você atravessa a janela de melatonina e entra em vigília adrenérgica.',
  },

  food: {
    summary:
      'Colérico processa estimulante como combustível adicional num motor já acelerado. Pequenos ajustes têm impacto desproporcional.',
    stimulants: [
      'Café após 14h (sustenta 6–8h em colérico)',
      'Açúcar refinado em jejum (pico–queda agressivo)',
      'Álcool destilado em dias de pressão alta (vira combustível agressivo)',
      'Pimenta + frituras em jantares longos',
    ],
    grounding: [
      'Magnésio bisglicinato à noite (300–400mg)',
      'Chás de camomila ou maracujá após 19h',
      'Carboidrato complexo no jantar (batata-doce, arroz, aveia)',
      'Vegetais folhosos verdes diariamente',
      'Hidratação alta (35ml × kg corporal)',
    ],
    sample_day: [
      { meal: 'Manhã (6h-9h)',  suggestion: 'Proteína + carboidrato complexo + 1 café (até 9h). NÃO em jejum.' },
      { meal: 'Almoço (12h-13h)', suggestion: 'Proteína magra + folhas + cereal integral. Evite refeição pesada.' },
      { meal: 'Lanche (15h-16h)', suggestion: 'Fruta + oleaginosas. Evite cafeína nesta janela.' },
      { meal: 'Jantar (19h-20h)', suggestion: 'Carboidrato + proteína leve + vegetais. Sem álcool em dias tensos.' },
      { meal: 'Pré-sono',          suggestion: 'Chá calmante + magnésio. Tela desligada 30 min antes.' },
    ],
  },

  stress: {
    acuteResponse:
      'Mandíbula trava, ombros sobem, voz aumenta de volume. Pulso sobe 10 a 20 bpm em 15 segundos. Você decide rápido demais, e quase sempre se arrepende em 24h.',
    rageOrAnxiety:
      'Raiva. Quase sempre. Ansiedade aparece como "frustração impaciente", não como medo abstrato.',
    techniques: [
      { name: 'Respiração 4–7–8', how: 'Inspire 4s, segure 7s, solte 8s. 4 ciclos.', duration: '90s' },
      { name: 'Caminhada de 6 min', how: 'Saia da sala. Caminhe sem celular. Volte só com decisão tomada.', duration: '6 min' },
      { name: 'Escrita do dragão',  how: 'Escreva por 3 min sobre o que enfureceu, sem editar. Rasgue depois.', duration: '3 min' },
      { name: 'Banho frio',         how: 'Água fria nos pulsos e nuca por 60 segundos. Ativa parassimpático.', duration: '1 min' },
    ],
  },

  virtuesVices: {
    cardinalVirtue: 'Força: capacidade de mover o que não se moveria sem você.',
    cardinalVice:   'Ira: fogo que queima primeiro a casa de quem ama você.',
    practices: [
      '1. Pausa de 4 segundos antes de toda decisão emocional.',
      '2. Diário noturno de 3 linhas: "onde fui injusto hoje?".',
      '3. Pedir desculpa concreta, sem justificativa, em até 24h.',
      '4. Domingos sem agenda: terreno fértil para o silêncio.',
      '5. Praticar dar valor sem cobrar retribuição imediata.',
    ],
  },

  pdi21Days: [
    { day: 1, focus: 'Pausa', task: 'Conte 4 segundos antes de TODA resposta hoje.' },
    { day: 2, focus: 'Pausa', task: 'Em vez de cortar fala, pergunte: "posso completar meu ponto?"' },
    { day: 3, focus: 'Corpo', task: 'Caminhada de 30 min sem destino, sem celular.' },
    { day: 4, focus: 'Sono',  task: 'Dormir antes das 23h. Sem exceção.' },
    { day: 5, focus: 'Foco',  task: 'Escolha 1 prioridade do dia. Faça SÓ ela até terminar.' },
    { day: 6, focus: 'Reflexão', task: 'Diário: o que mudou desligando o motor por 5 dias?' },
    { day: 7, focus: 'Off',   task: 'Domingo sem trabalho.' },
    // …expanda até 21
  ],
}

// ──────────────────────────────────────────────────────────
// SANGUÍNEO · A FAÍSCA
// ──────────────────────────────────────────────────────────
export const sanguineoPremium: TemperamentPremium = {
  key: 'SANGUINEO',
  label: 'Sanguíneo · A Faísca',
  pitch: 'Você é luz. O risco é virar fogo de palha: brilhar 3 dias e apagar. Aqui você aprende a queimar constante.',
  paletteHex: '#d4943a',

  body: {
    biology:
      'Sistema de recompensa dopaminérgico hipersensível: novidade, gente e estímulo geram picos rápidos de energia e de humor. O reverso: queda brusca quando o estímulo acaba, com tédio que parece exaustão.',
    energyCurve:
      'Curva em serrote: sobe e desce várias vezes ao dia conforme o ambiente. Pico social entre 10h–13h e à noite em companhia. Sozinho em tarefa repetitiva, a energia despenca em 40 minutos.',
    sleep:
      'Dificuldade em desligar por FOMO (medo de perder algo). Ideal: ritual de encerramento fixo às 22h30 com tela fora do quarto; a mente sanguínea segue qualquer estímulo que estiver aceso.',
  },

  food: {
    summary:
      'Sanguíneo come como vive: por impulso e por prazer social. O problema não é a festa; é o padrão do dia a dia que fica refém do improviso.',
    stimulants: [
      'Açúcar como "recompensa rápida" no meio da tarde (alimenta o serrote de energia)',
      'Cafeína social sem contagem (um café em cada conversa soma 5 por dia)',
      'Álcool em excesso em eventos (o sanguíneo não percebe a dose subindo)',
      'Delivery por tédio, não por fome',
    ],
    grounding: [
      'Proteína no café da manhã (segura a curva de energia por 4h)',
      'Refeições em horário fixo, mesmo sem fome (âncora de rotina)',
      'Ômega 3 diário (suporte de foco e humor)',
      'Água com o dobro da atenção: sanguíneo esquece de beber',
      'Preparar marmitas em lote no domingo (decisão única vence o impulso diário)',
    ],
    sample_day: [
      { meal: 'Manhã (7h-9h)',  suggestion: 'Ovos ou iogurte proteico + fruta. Café único e caprichado, não cinco medianos.' },
      { meal: 'Almoço (12h-13h)', suggestion: 'Prato feito clássico: proteína, arroz-feijão, salada. Simples e igual quase todo dia.' },
      { meal: 'Lanche (16h)',      suggestion: 'Oleaginosas + fruta. O doce da tarde é o inimigo número 1 do seu foco.' },
      { meal: 'Jantar (19h-20h)', suggestion: 'Leve e social se possível: comer acompanhado regula o sanguíneo.' },
      { meal: 'Pré-sono',          suggestion: 'Chá + leitura leve em papel. Celular carregando FORA do quarto.' },
    ],
  },

  stress: {
    acuteResponse:
      'Fala acelera, humor tenta desconversar, corpo busca saída: pegar o celular, mudar de assunto, marcar algo. O estresse do sanguíneo se disfarça de animação nervosa.',
    rageOrAnxiety:
      'Ansiedade social: medo de rejeição, de ficar de fora, de decepcionar a plateia. A raiva existe, mas passa rápido; o que fica é a inquietação.',
    techniques: [
      { name: 'Aterrissagem 5-4-3-2-1', how: 'Nomeie 5 coisas que vê, 4 que ouve, 3 que toca, 2 que cheira, 1 que saboreia.', duration: '3 min' },
      { name: 'Pausa do silêncio',       how: 'Feche tudo. 5 minutos sem estímulo nenhum. O desconforto inicial é o remédio agindo.', duration: '5 min' },
      { name: 'Uma conversa real',        how: 'Em vez de 10 mensagens, ligue para UMA pessoa de confiança e diga como está de verdade.', duration: '10 min' },
      { name: 'Corrida curta',            how: 'Descarga física de 15 min converte a inquietação em endorfina.', duration: '15 min' },
    ],
  },

  virtuesVices: {
    cardinalVirtue: 'Alegria: a capacidade rara de acender um ambiente inteiro e fazer as pessoas se sentirem bem-vindas.',
    cardinalVice:   'Inconstância: prometer no entusiasmo e sumir no tédio, deixando um rastro de começos.',
    practices: [
      '1. Prometa 50% do que o entusiasmo mandar. Entregue 100% do prometido.',
      '2. Um projeto de cada vez até o fim; os outros esperam numa lista, não na agenda.',
      '3. Agenda com blocos fixos inegociáveis (o improviso vive nas bordas, não no centro).',
      '4. Praticar profundidade: 1 conversa longa por semana em vez de 10 superficiais.',
      '5. Terminar o dia listando o que CONCLUIU, não o que começou.',
    ],
  },

  pdi21Days: [
    { day: 1, focus: 'Conclusão', task: 'Termine hoje 1 coisa que começou esta semana. Pequena serve.' },
    { day: 2, focus: 'Silêncio',  task: '10 minutos sem estímulo nenhum. Sem música, sem tela, sem gente.' },
    { day: 3, focus: 'Promessa',  task: 'Antes de prometer qualquer coisa hoje, espere 1 hora e confirme se sustenta.' },
    { day: 4, focus: 'Rotina',    task: 'Faça as 3 refeições em horário fixo hoje.' },
    { day: 5, focus: 'Profundidade', task: 'Uma conversa de 30 min com alguém querido, sem celular na mesa.' },
    { day: 6, focus: 'Reflexão',  task: 'Diário: "o que eu abandono quando fica difícil?" 5 linhas honestas.' },
    { day: 7, focus: 'Off',       task: 'Um dia sem postar nada. Viva sem plateia por 24h.' },
    // …expanda até 21
  ],
}

// ──────────────────────────────────────────────────────────
// MELANCÓLICO · A PROFUNDIDADE
// ──────────────────────────────────────────────────────────
export const melancolicoPremium: TemperamentPremium = {
  key: 'MELANCOLICO',
  label: 'Melancólico · A Profundidade',
  pitch: 'Você sente o que outros mal percebem. Aprenda a transformar peso em poesia, não em prisão.',
  paletteHex: '#3a4f8c',

  body: {
    biology:
      'Sistema nervoso de alta sensibilidade: processa mais estímulo por segundo que a média, e por isso satura antes. Sons, luzes e ambientes cheios cobram um imposto real de energia.',
    energyCurve:
      'Melhor rendimento em janelas longas e silenciosas: 8h–12h para trabalho profundo. Queda ao entardecer com tendência a ruminação entre 21h e 1h (o famoso "tribunal noturno").',
    sleep:
      'O sono é bom quando a mente desliga, e é aí que mora o problema. Ideal: ritual de descarga antes de deitar (escrever as preocupações num papel tira o processo da cabeça).',
  },

  food: {
    summary:
      'O melancólico sob estresse troca refeição por café e esquece de comer; sob tristeza, busca conforto denso. O corpo sensível responde forte aos dois erros.',
    stimulants: [
      'Cafeína acima de 2 doses (amplifica ruminação e ansiedade noturna)',
      'Jejum prolongado sem plano (queda de glicose derruba o humor primeiro)',
      'Ultraprocessados de conforto à noite (culpa junto com a digestão pesada)',
      'Álcool como anestesia da sensibilidade (cobra em dobro no dia seguinte)',
    ],
    grounding: [
      'Triptofano natural: banana, aveia, cacau puro (precursor de serotonina)',
      'Vitamina D verificada anualmente (deficiência agrava o humor baixo)',
      'Refeições quentes e caprichadas: o ritual importa tanto quanto o nutriente',
      'Chá verde no lugar do 3º café (L-teanina suaviza a cafeína)',
      'Cozinhar como prática meditativa 2x por semana',
    ],
    sample_day: [
      { meal: 'Manhã (7h-9h)',  suggestion: 'Aveia + banana + cacau. Café único, saboreado sem pressa.' },
      { meal: 'Almoço (12h-13h)', suggestion: 'Refeição quente completa, sentado, sem tela. 20 minutos mínimos.' },
      { meal: 'Lanche (16h)',      suggestion: 'Chá verde + castanhas. Pausa de verdade, não na frente do monitor.' },
      { meal: 'Jantar (19h-20h)', suggestion: 'Leve e quente. Sopa e caldos acalmam o sistema sensível.' },
      { meal: 'Pré-sono',          suggestion: 'Chá de camomila + papel e caneta para descarregar a mente.' },
    ],
  },

  stress: {
    acuteResponse:
      'Silêncio e recolhimento. O corpo fecha: ombros caem, olhar baixa, respostas encurtam. Por fora parece calma; por dentro, um tribunal julgando cada detalhe em loop.',
    rageOrAnxiety:
      'Ansiedade ruminante e autocrítica. A raiva existe, mas aponta para dentro: vira cobrança, culpa e revisão infinita do que já passou.',
    techniques: [
      { name: 'Descarga no papel',    how: 'Escreva o loop mental por 5 min sem parar. O papel segura o que a mente recicla.', duration: '5 min' },
      { name: 'Regra das 2 versões',  how: 'Para cada interpretação negativa, escreva 1 alternativa neutra plausível.', duration: '4 min' },
      { name: 'Sol da manhã',          how: '15 min de luz natural antes das 10h regula serotonina e âncora o humor do dia.', duration: '15 min' },
      { name: 'Contato seguro',        how: 'Mensagem para 1 pessoa segura: "dia pesado, só queria dizer oi". Sem elaborar.', duration: '2 min' },
    ],
  },

  virtuesVices: {
    cardinalVirtue: 'Profundidade: a capacidade de ver camadas, criar beleza e ser leal ao que importa de verdade.',
    cardinalVice:   'Pessimismo: o hábito de morar no pior cenário e chamar isso de realismo.',
    practices: [
      '1. Registrar 3 evidências positivas por dia (o cérebro sensível arquiva só as negativas por padrão).',
      '2. Prazo de 24h para decisões pequenas: análise após isso é ruminação disfarçada.',
      '3. Compartilhar a criação imperfeita: publicar aos 80% uma vez por mês.',
      '4. Movimento diário leve: o corpo tira a mente do porão.',
      '5. Rir de si 1x por dia: humor é a válvula da profundidade.',
    ],
  },

  pdi21Days: [
    { day: 1, focus: 'Evidência', task: 'Anote 3 coisas que deram certo hoje, por menores que sejam.' },
    { day: 2, focus: 'Descarga',  task: 'Antes de dormir, escreva as preocupações num papel e feche o caderno.' },
    { day: 3, focus: 'Sol',       task: '15 minutos de luz natural antes das 10h.' },
    { day: 4, focus: 'Decisão',   task: 'Decida algo pendente pequeno em menos de 5 minutos. Sem revisar.' },
    { day: 5, focus: 'Imperfeito', task: 'Entregue ou mostre algo a 80%. Note que o mundo não acabou.' },
    { day: 6, focus: 'Reflexão',  task: 'Diário: "que história negativa eu conto que talvez não seja verdade?"' },
    { day: 7, focus: 'Off',       task: 'Um passeio bonito e sem propósito. Beleza é combustível do seu tipo.' },
    // …expanda até 21
  ],
}

// ──────────────────────────────────────────────────────────
// FLEUMÁTICO · A CALMA PROFUNDA
// ──────────────────────────────────────────────────────────
export const fleumaticoPremium: TemperamentPremium = {
  key: 'FLEUMATICO',
  label: 'Fleumático · A Calma Profunda',
  pitch: 'Sua paz é seu superpoder. O risco é confundir paz com inércia. Aqui você aprende a mover sem perder a calma.',
  paletteHex: '#7a9e7e',

  body: {
    biology:
      'Sistema parassimpático dominante: frequência cardíaca estável, reatividade baixa, recuperação rápida de sustos. O custo: o motor demora a esquentar e o corpo adora poupar energia.',
    energyCurve:
      'Linha quase reta com leve pico no fim da manhã. O perigo não é a queda, é a suavidade: sem picos, falta o senso de urgência natural. Movimento físico de manhã cria o pico que a biologia não dá.',
    sleep:
      'Dorme fácil e gosta de dormir muito. Cuidado com o excesso: mais de 9h vira letargia. Ideal: 7h30–8h com horário de ACORDAR fixo (o fleumático estica a manhã se deixar).',
  },

  food: {
    summary:
      'O fleumático come no automático e no conforto: mesmos pratos, porções generosas, ritmo lento. Metabolismo tranquilo agradece leveza e movimento.',
    stimulants: [
      'Grandes porções de carboidrato simples no almoço (sonolência dobrada à tarde)',
      'Beliscar contínuo em frente à TV (o conforto vira hábito invisível)',
      'Refrigerante e doces como companhia da rotina',
      'Jantar pesado tarde da noite',
    ],
    grounding: [
      'Proteína em toda refeição (dá saciedade e energia estável)',
      'Café estratégico: 1 dose antes da tarefa mais difícil do dia',
      'Porções servidas no prato, panela longe da mesa',
      'Temperos novos toda semana: acordar o paladar acorda o resto',
      'Água com horário marcado (a sede do fleumático é discreta demais)',
    ],
    sample_day: [
      { meal: 'Manhã (7h-8h30)', suggestion: 'Proteína + fruta. Café da manhã reforçado combate a partida lenta.' },
      { meal: 'Almoço (12h-13h)', suggestion: 'Metade do prato de vegetais, proteína e POUCO carboidrato simples.' },
      { meal: 'Lanche (16h)',      suggestion: 'Iogurte ou fruta. Em pé, de preferência: quebre a sentada longa.' },
      { meal: 'Jantar (19h)',      suggestion: 'Cedo e leve. O corpo tranquilo digere devagar.' },
      { meal: 'Pré-sono',          suggestion: 'Nada além de chá. A cozinha fecha depois do jantar.' },
    ],
  },

  stress: {
    acuteResponse:
      'Congela e concorda. Diante de conflito, o fleumático dá razão para encerrar, adia a resposta e muda de assunto por dentro. O estresse não explode: sedimenta.',
    rageOrAnxiety:
      'Nenhum dos dois na superfície. Por baixo, uma teimosia passiva: diz sim e não faz, atrasa, esquece. A raiva do fleumático fala por omissão.',
    techniques: [
      { name: 'Nomear em voz baixa',  how: 'Diga para si: "isso me incomodou". Nomear rompe a anestesia.', duration: '30s' },
      { name: 'Resposta em 24h',       how: 'Em vez de concordar na hora, diga: "vou pensar e te respondo amanhã". E responda.', duration: '1 min' },
      { name: 'Movimento de ativação', how: '20 polichinelos ou subir escadas. O corpo parado congela a decisão junto.', duration: '2 min' },
      { name: 'Frase completa',        how: 'Treine dizer a frase inteira que engoliu, nem que seja para o espelho.', duration: '2 min' },
    ],
  },

  virtuesVices: {
    cardinalVirtue: 'Serenidade: a presença que acalma ambientes e sustenta as pessoas nas crises.',
    cardinalVice:   'Acídia: a preguiça existencial de adiar a própria vida em nome do conforto.',
    practices: [
      '1. A tarefa mais difícil do dia antes das 10h, sempre.',
      '2. Uma opinião própria em voz alta por dia (começando pelas pequenas).',
      '3. Prazos autoimpostos com hora marcada, ditos a alguém (compromisso público move).',
      '4. Trocar 30 min de sofá por 30 min de caminhada, 3x por semana.',
      '5. Revisar metas pessoais toda segunda: o que EU quero esta semana?',
    ],
  },

  pdi21Days: [
    { day: 1, focus: 'Ativação',  task: 'Faça a tarefa mais difícil do dia antes das 10h.' },
    { day: 2, focus: 'Voz',       task: 'Dê sua opinião em voz alta 2 vezes hoje, antes de perguntarem.' },
    { day: 3, focus: 'Corpo',     task: '30 minutos de caminhada em ritmo que faça suar de leve.' },
    { day: 4, focus: 'Incômodo',  task: 'Identifique 1 incômodo de hoje e diga a frase que engoliu.' },
    { day: 5, focus: 'Prazo',     task: 'Defina hora exata para 1 pendência antiga e cumpra.' },
    { day: 6, focus: 'Reflexão',  task: 'Diário: "o que estou adiando que me custaria só 1 hora?"' },
    { day: 7, focus: 'Off',       task: 'Descanse com mérito: hoje o sofá é prêmio, não esconderijo.' },
    // …expanda até 21
  ],
}

export const TEMPERAMENT_PREMIUM: Record<TemperamentKey, TemperamentPremium> = {
  COLERICO:    colericoPremium,
  SANGUINEO:   sanguineoPremium,
  MELANCOLICO: melancolicoPremium,
  FLEUMATICO:  fleumaticoPremium,
}

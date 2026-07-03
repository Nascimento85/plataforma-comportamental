// ============================================================
// Relatório Premium — ENEAGRAMA (Tipos 1–9)
// Foco: Motivações Profundas e Traumas de Infância.
// Estrutura específica:
//   - Caminhos de Crescimento (Integração) e Estresse (Desintegração)
//   - Criança Interior — ferida original
//   - Subtipos por Instinto (Social, Sexual, Preservação)
//   - Níveis de Consciência (1–9 de Riso/Hudson)
// ============================================================

export type EnneagramKey = '1'|'2'|'3'|'4'|'5'|'6'|'7'|'8'|'9'
export type Instinct = 'SOCIAL' | 'SEXUAL' | 'PRESERVATION'

export interface EnneagramPremium {
  key: EnneagramKey
  name:  string                              // "O Reformador"
  pitch: string
  paletteHex: string

  motivations: {
    coreFear:    string
    coreDesire:  string
    coreBelief:  string
  }

  childWound: {
    storyline:   string                      // narrativa da ferida original
    soundtrack:  string[]                    // mensagens internas que o tipo escuta
    reparenting: string[]                    // 5 passos para reparentar
  }

  movement: {
    integration:   { goesTo: EnneagramKey; behaviorShift: string; signal: string }   // saúde
    disintegration: { goesTo: EnneagramKey; behaviorShift: string; signal: string }   // estresse
  }

  subtypes: Record<Instinct, { name: string; flavor: string; redFlag: string }>

  levels: Array<{ level: number; tone: string; behavior: string }>  // 9 níveis (1=topo)

  pdi21Days: Array<{ day: number; focus: string; task: string }>
}

// ──────────────────────────────────────────────────────────
// TIPO 1 · O REFORMADOR
// ──────────────────────────────────────────────────────────
export const type1Premium: EnneagramPremium = {
  key: '1',
  name: 'Tipo 1 · O Reformador',
  pitch: 'Perfeição é uma armadilha de quem teve que ser bom para sobreviver. Aqui você aprende que o mundo não desaba quando você relaxa.',
  paletteHex: '#3a6db4',

  motivations: {
    coreFear:   'Ser mau, corrupto, defeituoso. Errar e ser condenado por isso.',
    coreDesire: 'Ser íntegro, correto, ter a consciência limpa.',
    coreBelief: 'Existe um jeito certo de fazer as coisas. Se eu não vigiar, tudo degrada.',
  },

  childWound: {
    storyline:
      'Em algum momento da infância, ser criança foi tratado como defeito. Você aprendeu que espontaneidade trazia crítica e que o amor vinha condicionado ao bom comportamento. A raiva que você sentiu por isso foi proibida, então virou juiz: primeiro dos outros, e sempre, sem descanso, de você.',
    soundtrack: [
      '"Assim não está bom o suficiente."',
      '"Se eu relaxar, viro uma pessoa relaxada."',
      '"Ninguém faz direito, é melhor eu mesmo fazer."',
    ],
    reparenting: [
      '1. Fazer 1 coisa por dia de propósito a 80% do seu padrão, e deixar assim.',
      '2. Quando errar, dizer em voz alta: "errei e continuo sendo bom".',
      '3. Agendar prazer sem utilidade: 30 minutos sem produzir nem melhorar nada.',
      '4. Nomear a raiva quando ela vier ("estou com raiva"), em vez de convertê-la em correção.',
      '5. Elogiar alguém por algo imperfeito e sincero.',
    ],
  },

  movement: {
    integration: {
      goesTo: '7',
      behaviorShift: 'O crítico interno tira férias. Você ganha leveza, humor e espontaneidade sem culpa.',
      signal: 'Você ri dos próprios erros no mesmo dia em que eles acontecem, e novas ideias parecem convite em vez de ameaça.',
    },
    disintegration: {
      goesTo: '4',
      behaviorShift: 'Em estresse forte, a autocrítica vira melancolia: "só eu me importo, ninguém reconhece o meu esforço".',
      signal: 'Você se sente incompreendido e ressentido, com vontade de largar tudo porque "não adianta fazer certo".',
    },
  },

  subtypes: {
    SOCIAL: {
      name: 'Rigidez · "O Professor"',
      flavor: 'Vira o exemplo a ser seguido: pontual, coerente, guardião das regras do grupo. Ensina o certo pelo próprio comportamento.',
      redFlag: 'Superioridade sutil. Confunde o próprio padrão com lei universal e se isola no pedestal.',
    },
    SEXUAL: {
      name: 'Zelo · "O Reformador dos Outros"',
      flavor: 'Intensidade de missionário: quer aperfeiçoar as pessoas próximas, o parceiro, a sociedade. Reforma para fora.',
      redFlag: 'Ciúme travestido de correção. O parceiro vira projeto permanente e nunca está pronto.',
    },
    PRESERVATION: {
      name: 'Preocupação · "O Perfeccionista Ansioso"',
      flavor: 'A exigência aponta para dentro: saúde, dinheiro, organização da própria vida. Antecipação constante do que pode dar errado.',
      redFlag: 'Ansiedade somatizada. Tensão de mandíbula, insônia e a sensação de nunca poder descansar.',
    },
  },

  levels: [
    { level: 1, tone: 'SAÚDE',      behavior: 'Sábio e tolerante. Aceita o imperfeito sem abrir mão dos valores. Inspira pelo exemplo, não pela cobrança.' },
    { level: 2, tone: 'SAÚDE',      behavior: 'Consciência apurada. Distingue o essencial do detalhe. Corrige com gentileza.' },
    { level: 3, tone: 'SAÚDE',      behavior: 'Íntegro e responsável. Cumpre o que promete. Referência ética do grupo.' },
    { level: 4, tone: 'NORMAL',     behavior: 'Idealista exigente. Vive comparando o real com o ideal e se frustrando com a diferença.' },
    { level: 5, tone: 'NORMAL',     behavior: 'Autocontrole rígido. Agenda lotada de obrigações. O prazer precisa ser merecido.' },
    { level: 6, tone: 'NORMAL',     behavior: 'Crítico e impaciente. Corrige os outros sem ser convidado. Sarcasmo começa a vazar.' },
    { level: 7, tone: 'DOENTE',     behavior: 'Intolerante. Uma visão só: a dele. Pune quem discorda com frieza moral.' },
    { level: 8, tone: 'DOENTE',     behavior: 'Obsessivo e contraditório: cobra dos outros o que já não consegue cumprir.' },
    { level: 9, tone: 'PATOLÓGICO', behavior: 'Punitivo consigo e com o mundo. Colapso entre a raiva reprimida e a culpa.' },
  ],

  pdi21Days: [
    { day: 1, focus: 'Imperfeição',   task: 'Envie uma mensagem importante sem reler três vezes. Uma releitura e enviar.' },
    { day: 2, focus: 'Raiva',         task: 'Anote 3 momentos de irritação hoje e o que cada um pedia de verdade.' },
    { day: 3, focus: 'Prazer',        task: '30 minutos de algo que não melhora nada: só porque é bom.' },
    { day: 4, focus: 'Delegar',       task: 'Passe uma tarefa adiante e NÃO refaça o resultado.' },
    { day: 5, focus: 'Autocompaixão', task: 'Quando o juiz interno falar, responda: "obrigado, mas hoje eu decido".' },
    { day: 6, focus: 'Reflexão',      task: 'Escreva: "o que aconteceria de verdade se eu fizesse 80%?".' },
    { day: 7, focus: 'Off',           task: 'Um dia sem corrigir nada nem ninguém. Nem no trânsito.' },
    // … expanda até 21
  ],
}

// ──────────────────────────────────────────────────────────
// TIPO 2 · O PRESTATIVO
// ──────────────────────────────────────────────────────────
export const type2Premium: EnneagramPremium = {
  key: '2',
  name: 'Tipo 2 · O Prestativo',
  pitch: 'Cuidar dos outros foi a forma como você aprendeu a ser amada. Aqui você aprende a receber sem precisar merecer.',
  paletteHex: '#a8522e',

  motivations: {
    coreFear:   'Não ser amado, ser dispensável, descobrir que ninguém ficaria só pela sua companhia.',
    coreDesire: 'Ser amado incondicionalmente, sentir que pertence ao coração de alguém.',
    coreBelief: 'Amor se conquista servindo. Se eu parar de ser útil, param de me querer.',
  },

  childWound: {
    storyline:
      'Cedo demais você percebeu que atender às necessidades dos outros gerava aprovação, e que as suas próprias necessidades atrapalhavam. Então você as escondeu tão bem que hoje custa até nomeá-las. O orgulho do Dois é este: precisar de tudo e afirmar que não precisa de nada.',
    soundtrack: [
      '"Se eu pedir, viro um peso."',
      '"Depois de ajudar todo mundo, sobra um pouco pra mim."',
      '"Eu sei do que você precisa antes de você."',
    ],
    reparenting: [
      '1. Pedir uma coisa pequena por dia, de forma direta, sem justificar.',
      '2. Responder "deixa eu ver minha agenda" antes de aceitar qualquer pedido.',
      '3. Listar as próprias necessidades da semana ANTES de listar as dos outros.',
      '4. Receber um elogio ou presente só com "obrigado", sem retribuir na hora.',
      '5. Notar o ressentimento quando ele nascer: ele é o aviso de que você se abandonou de novo.',
    ],
  },

  movement: {
    integration: {
      goesTo: '4',
      behaviorShift: 'Você volta o cuidado para dentro: reconhece as próprias emoções e necessidades como legítimas.',
      signal: 'Você consegue dizer "hoje eu preciso de colo" sem sentir que está falhando com alguém.',
    },
    disintegration: {
      goesTo: '8',
      behaviorShift: 'Em estresse forte, a doçura vira cobrança agressiva: "depois de tudo que eu fiz por você".',
      signal: 'Explosões de raiva com a sensação de dívida universal: todo mundo te deve e ninguém paga.',
    },
  },

  subtypes: {
    SOCIAL: {
      name: 'Ambição · "O Anfitrião"',
      flavor: 'Ajuda em escala: organiza o grupo, conecta pessoas, torna-se indispensável para a comunidade inteira.',
      redFlag: 'Poder pelos bastidores. Ajuda com endereço certo: quem tem influência recebe mais cuidado.',
    },
    SEXUAL: {
      name: 'Sedução · "O Conquistador"',
      flavor: 'Foca o cuidado em uma pessoa de cada vez, com intensidade irresistível. Faz o outro se sentir o centro do universo.',
      redFlag: 'Amor como conquista. Quando o outro se sente seguro demais, o interesse esfria e busca novo desafio.',
    },
    PRESERVATION: {
      name: 'Privilégio · "O Amado"',
      flavor: 'Cuida sendo encantador: desperta nos outros a vontade de cuidar dele. O Dois que parece um Quatro tímido.',
      redFlag: 'Infantilização de si. Espera ser adivinhado e se magoa quando o mundo não nota o que ele nunca disse.',
    },
  },

  levels: [
    { level: 1, tone: 'SAÚDE',      behavior: 'Amor incondicional real: dá sem cobrar e cuida de si com a mesma seriedade.' },
    { level: 2, tone: 'SAÚDE',      behavior: 'Empático e perceptivo. Sente o que o outro precisa e respeita o próprio limite.' },
    { level: 3, tone: 'SAÚDE',      behavior: 'Generoso e encorajador. As pessoas crescem perto dele.' },
    { level: 4, tone: 'NORMAL',     behavior: 'Agradador. Diz sim demais. Começa a colecionar cansaço em nome do vínculo.' },
    { level: 5, tone: 'NORMAL',     behavior: 'Invasivo com boas intenções. Ajuda sem ser pedido e se ofende com a recusa.' },
    { level: 6, tone: 'NORMAL',     behavior: 'Martír. Lembra em voz alta tudo que fez. O cuidado virou moeda de troca.' },
    { level: 7, tone: 'DOENTE',     behavior: 'Manipulação emocional. Gera culpa para manter as pessoas por perto.' },
    { level: 8, tone: 'DOENTE',     behavior: 'Coercivo. "Ninguém me valoriza" vira arma. Adoece para ser cuidado.' },
    { level: 9, tone: 'PATOLÓGICO', behavior: 'Colapso físico e emocional. O corpo cobra de uma vez todas as necessidades negadas.' },
  ],

  pdi21Days: [
    { day: 1, focus: 'Pedir',        task: 'Peça uma coisa concreta a alguém hoje. Direto, sem "se não for incômodo".' },
    { day: 2, focus: 'Limite',       task: 'Diga um não pequeno e não explique por mais de uma frase.' },
    { day: 3, focus: 'Receber',      task: 'Aceite um favor sem retribuir hoje. Anote o desconforto.' },
    { day: 4, focus: 'Necessidade',  task: 'Complete por escrito: "hoje eu preciso de…" com 3 itens seus.' },
    { day: 5, focus: 'Ressentimento', task: 'Liste 2 ajudas que você deu esperando algo de volta. Perdoe-se pelas duas.' },
    { day: 6, focus: 'Reflexão',     task: 'Escreva: "quem seria eu se ninguém precisasse de mim?".' },
    { day: 7, focus: 'Off',          task: 'Um dia inteiro sem oferecer ajuda que não foi pedida.' },
    // … expanda até 21
  ],
}

// ──────────────────────────────────────────────────────────
// TIPO 3 · O REALIZADOR
// ──────────────────────────────────────────────────────────
export const type3Premium: EnneagramPremium = {
  key: '3',
  name: 'Tipo 3 · O Realizador',
  pitch: 'Você confunde valor com performance. Aqui você descobre quem você É quando ninguém está aplaudindo.',
  paletteHex: '#d4943a',

  motivations: {
    coreFear:   'Ser um fracasso. Não valer nada além dos resultados que entrega.',
    coreDesire: 'Ser valioso, admirado, digno de amor pelo que conquista.',
    coreBelief: 'Você é o que você realiza. Quem para de vencer desaparece.',
  },

  childWound: {
    storyline:
      'Você foi amado pelos resultados: a nota, o troféu, o orgulho que dava aos adultos. A criança entendeu o contrato: sentimentos atrasam, imagem entrega. Então você aprendeu a trocar de máscara com uma velocidade que impressiona até você, e em algum ponto perdeu de vista qual rosto era o original.',
    soundtrack: [
      '"Se eu parar, me ultrapassam."',
      '"Ninguém quer saber como eu estou, querem saber o que eu fiz."',
      '"Sentir é perda de tempo útil."',
    ],
    reparenting: [
      '1. Contar a alguém de confiança um fracasso real, sem transformá-lo em "aprendizado" na mesma frase.',
      '2. Fazer uma atividade em que você é iniciante e medíocre, semanalmente.',
      '3. Responder "como você está?" com um sentimento, não com um status de projeto.',
      '4. Um dia por semana sem postar, sem métricas, sem vitrine.',
      '5. Perguntar-se antes de aceitar algo novo: "eu quero isso ou quero ser visto com isso?".',
    ],
  },

  movement: {
    integration: {
      goesTo: '6',
      behaviorShift: 'Troca competição por cooperação: torna-se leal ao time e não apenas à própria imagem no time.',
      signal: 'Você celebra a vitória de um colega sem calcular o que ela significa para o seu ranking.',
    },
    disintegration: {
      goesTo: '9',
      behaviorShift: 'Em estresse forte, o motor funde: apatia, procrastinação e piloto automático diante da TV.',
      signal: 'Você se pega ocupado com tarefas irrelevantes para não encarar que perdeu o rumo.',
    },
  },

  subtypes: {
    SOCIAL: {
      name: 'Prestígio · "A Vitrine"',
      flavor: 'Brilha em público: títulos, palco, redes sociais. Sabe exatamente como cada ambiente mede sucesso e entrega a medida.',
      redFlag: 'A vida vira feed. Decisões importantes tomadas pela ótica de "como isso vai parecer".',
    },
    SEXUAL: {
      name: 'Carisma · "O Troféu"',
      flavor: 'A performance é ser desejável e impulsionar quem ama: constrói a imagem perfeita do casal ou torna o parceiro um vencedor.',
      redFlag: 'Vive através do outro. Abandona os próprios projetos e cobra o investimento em forma de lealdade.',
    },
    PRESERVATION: {
      name: 'Segurança · "O Eficiente Discreto"',
      flavor: 'Vaidade de não parecer vaidoso: trabalha duro, acumula segurança material e quer ser reconhecido como bom, não como exibido.',
      redFlag: 'Workaholic invisível. Terceiriza a vida pessoal para a agenda e chama isso de responsabilidade.',
    },
  },

  levels: [
    { level: 1, tone: 'SAÚDE',      behavior: 'Autêntico. O valor vem de dentro; a excelência vira serviço, não vitrine.' },
    { level: 2, tone: 'SAÚDE',      behavior: 'Autoconfiante e adaptável. Inspira os outros a realizarem também.' },
    { level: 3, tone: 'SAÚDE',      behavior: 'Competente e admirável. Entrega o que promete com energia contagiante.' },
    { level: 4, tone: 'NORMAL',     behavior: 'Competitivo. Compara-se o tempo todo. O sucesso alheio incomoda.' },
    { level: 5, tone: 'NORMAL',     behavior: 'Calculista de imagem. Adapta o discurso a cada plateia. Começa a se perder.' },
    { level: 6, tone: 'NORMAL',     behavior: 'Autopromoção constante. Infla resultados. Bastidor e palco já não coincidem.' },
    { level: 7, tone: 'DOENTE',     behavior: 'Oportunista. Atalhos éticos para manter a fachada de vencedor.' },
    { level: 8, tone: 'DOENTE',     behavior: 'Enganoso. Mente para os outros e para si. Sabotam-no os próprios truques.' },
    { level: 9, tone: 'PATOLÓGICO', behavior: 'Colapso da persona. Vazio, vingança contra quem viu por trás da máscara.' },
  ],

  pdi21Days: [
    { day: 1, focus: 'Autenticidade', task: 'Responda hoje uma vez com a verdade: "não estou bem" ou "não sei". Sem editar.' },
    { day: 2, focus: 'Pausa',         task: '20 minutos parado sem produzir nem consumir nada. Só você e o desconforto.' },
    { day: 3, focus: 'Fracasso',      task: 'Conte a alguém um erro seu sem moral da história no final.' },
    { day: 4, focus: 'Bastidor',      task: 'Faça algo excelente hoje e não conte para ninguém. Nunca.' },
    { day: 5, focus: 'Sentir',        task: 'Três vezes hoje, pare e nomeie a emoção presente em uma palavra.' },
    { day: 6, focus: 'Reflexão',      task: 'Escreva: "o que eu faria se ninguém pudesse ver?".' },
    { day: 7, focus: 'Off',           task: 'Dia sem métricas: sem likes, sem números, sem ranking.' },
    // … expanda até 21
  ],
}

// ──────────────────────────────────────────────────────────
// TIPO 4 · O INDIVIDUALISTA
// ──────────────────────────────────────────────────────────
export const type4Premium: EnneagramPremium = {
  key: '4',
  name: 'Tipo 4 · O Individualista',
  pitch: 'Sua diferença é dom, mas virou trincheira. Aqui você aprende que pertencer não apaga quem você é.',
  paletteHex: '#8c4b8c',

  motivations: {
    coreFear:   'Não ter identidade, ser comum, viver uma vida sem significado próprio.',
    coreDesire: 'Ser autêntico, único, encontrar o próprio lugar e ser visto por inteiro.',
    coreBelief: 'Falta algo em mim que os outros têm. Se eu for comum, deixo de existir.',
  },

  childWound: {
    storyline:
      'Em algum momento você olhou para a própria casa e sentiu que não era dali, como se tivesse chegado na família errada ou tarde demais. Dessa sensação de exílio nasceu a busca: cultivar o que te torna diferente, porque a diferença dói menos quando é escolhida. Só que a trincheira que protege também isola.',
    soundtrack: [
      '"Ninguém me entende de verdade."',
      '"Gente comum tem vida fácil; a minha profundidade tem preço."',
      '"Quando eu encontrar o que falta, aí a vida começa."',
    ],
    reparenting: [
      '1. Nomear diariamente 3 coisas boas que JÁ existem na sua vida comum.',
      '2. Agir contra o humor uma vez por dia: o sentimento é dado, não ordem.',
      '3. Terminar uma coisa iniciada antes de começar a próxima paixão.',
      '4. Quando vier a inveja, traduzi-la: "isso que ele tem me mostra o que eu quero construir".',
      '5. Compartilhar algo mundano com alguém sem transformá-lo em drama ou poesia.',
    ],
  },

  movement: {
    integration: {
      goesTo: '1',
      behaviorShift: 'A emoção ganha estrutura: você cria com disciplina e transforma sensibilidade em obra concreta.',
      signal: 'Você trabalha no seu projeto mesmo nos dias sem inspiração, e ele avança.',
    },
    disintegration: {
      goesTo: '2',
      behaviorShift: 'Em estresse forte, agarra-se aos vínculos: torna-se dependente de quem ama e cobra prova de amor.',
      signal: 'Você testa as pessoas ("se ele me amasse, saberia") e se ofende com reprovações que só existiram na sua cabeça.',
    },
  },

  subtypes: {
    SOCIAL: {
      name: 'Vergonha · "O Incompreendido"',
      flavor: 'Sofre em público com elegância: compara-se ao grupo, sente-se inferior e usa a melancolia como identidade social.',
      redFlag: 'Apego ao papel de vítima sensível. O sofrimento vira crachá e afasta as soluções.',
    },
    SEXUAL: {
      name: 'Competição · "O Intenso"',
      flavor: 'O Quatro que briga: transforma a dor em exigência, compete com quem tem o que lhe falta, ama e odeia com voltagem máxima.',
      redFlag: 'Relações em montanha-russa. Confunde intensidade com profundidade e paz com tédio.',
    },
    PRESERVATION: {
      name: 'Tenacidade · "O Sofredor Silencioso"',
      flavor: 'Engole a dor e aguenta: trabalha duro, não reclama, espera que percebam o seu esforço sem precisar dizer.',
      redFlag: 'Martírio invisível. Acumula em silêncio até adoecer ou explodir "do nada".',
    },
  },

  levels: [
    { level: 1, tone: 'SAÚDE',      behavior: 'Criativo e inspirado. Transforma dor em beleza que serve aos outros. Autêntico sem esforço.' },
    { level: 2, tone: 'SAÚDE',      behavior: 'Autoconsciente e honesto consigo. Sensibilidade vira ponte, não muro.' },
    { level: 3, tone: 'SAÚDE',      behavior: 'Expressivo e pessoal. Toca as pessoas com o que cria e com o que é.' },
    { level: 4, tone: 'NORMAL',     behavior: 'Romantiza a própria história. Vive mais na imaginação que na agenda.' },
    { level: 5, tone: 'NORMAL',     behavior: 'Temperamental. Precisa de tratamento especial. Se retrai para ser buscado.' },
    { level: 6, tone: 'NORMAL',     behavior: 'Autoindulgente. Isenta-se das regras comuns: "quem sente como eu não vive como eles".' },
    { level: 7, tone: 'DOENTE',     behavior: 'Alienado e envergonhado de existir. Bloqueio criativo, inveja amarga.' },
    { level: 8, tone: 'DOENTE',     behavior: 'Auto-sabotagem. Destrói oportunidades e relações para confirmar o exílio.' },
    { level: 9, tone: 'PATOLÓGICO', behavior: 'Desespero. O abismo entre o eu ideal e o real engole a vontade de viver.' },
  ],

  pdi21Days: [
    { day: 1, focus: 'Presente',     task: 'Liste 3 coisas boas e comuns da sua vida hoje. Sem ironia.' },
    { day: 2, focus: 'Ação',         task: 'Faça a tarefa mais adiada AGORA, especialmente se estiver sem clima.' },
    { day: 3, focus: 'Inveja',       task: 'Identifique 1 inveja desta semana e o desejo legítimo escondido nela.' },
    { day: 4, focus: 'Constância',   task: 'Avance 30 minutos no mesmo projeto de ontem. O mesmo.' },
    { day: 5, focus: 'Vínculo',      task: 'Diga a alguém o que sente por ela, direto, sem testar se ela adivinha.' },
    { day: 6, focus: 'Reflexão',     task: 'Escreva: "e se não faltar nada em mim?".' },
    { day: 7, focus: 'Off',          task: 'Um dia sem se comparar. Cada vez que pegar a comparação, volte ao corpo.' },
    // … expanda até 21
  ],
}

// ──────────────────────────────────────────────────────────
// TIPO 5 · O INVESTIGADOR
// ──────────────────────────────────────────────────────────
export const type5Premium: EnneagramPremium = {
  key: '5',
  name: 'Tipo 5 · O Investigador',
  pitch: 'Saber tudo é um jeito de não viver nada. Coragem, aqui, é sair da torre e entrar na própria vida.',
  paletteHex: '#3a4f8c',

  motivations: {
    coreFear:   'Ser invadido, esvaziado, incapaz. Não ter recursos internos para o que o mundo exige.',
    coreDesire: 'Ser competente, compreender o mundo, ter um território mental só seu.',
    coreBelief: 'O mundo exige demais e dá de menos. Quem depende, se expõe. Conhecimento é a única posse segura.',
  },

  childWound: {
    storyline:
      'Criança, você se sentiu invadido (por presença demais) ou desnutrido (por presença de menos), e às vezes os dois. A solução foi genial e cara: encolher as necessidades e mudar-se para dentro da própria mente, onde ninguém entra sem convite. Só que a torre que protege do mundo também tranca você fora da vida.',
    soundtrack: [
      '"Preciso entender antes de participar."',
      '"Se deixarem, vão drenar tudo o que tenho."',
      '"Eu funciono melhor sozinho."',
    ],
    reparenting: [
      '1. Dizer em voz alta uma necessidade física por dia: fome, frio, cansaço, abraço.',
      '2. Participar primeiro, elaborar depois: uma experiência por semana sem pesquisa prévia.',
      '3. Compartilhar um conhecimento pela metade, antes de se sentir 100% pronto.',
      '4. Ficar 10 minutos a mais em um encontro depois da vontade de ir embora.',
      '5. Gastar com conforto do corpo sem calcular a "utilidade".',
    ],
  },

  movement: {
    integration: {
      goesTo: '8',
      behaviorShift: 'O saber vira ação: você ocupa espaço, decide, lidera com o corpo presente e a voz firme.',
      signal: 'Você age com informação incompleta e descobre que aguenta o impacto.',
    },
    disintegration: {
      goesTo: '7',
      behaviorShift: 'Em estresse forte, a mente dispara: hiperatividade dispersa, mil abas abertas, nenhuma vivida.',
      signal: 'Você se distrai compulsivamente (telas, teorias, projetos novos) para não sentir o que está no quarto ao lado.',
    },
  },

  subtypes: {
    SOCIAL: {
      name: 'Totem · "O Especialista"',
      flavor: 'Conecta-se pelo saber: encontra a tribo dos que estudam o mesmo, e pertence através do domínio do tema.',
      redFlag: 'Intimidade só intelectual. Sabe tudo sobre o grupo e ninguém sabe nada sobre ele.',
    },
    SEXUAL: {
      name: 'Confidência · "O Guardião de Segredos"',
      flavor: 'O Cinco mais quente: busca UMA pessoa com quem compartilhar o mundo interno inteiro, em confiança absoluta.',
      redFlag: 'Tudo ou nada afetivo. Espera um nível de confiança que testa poucos e descarta muitos.',
    },
    PRESERVATION: {
      name: 'Refúgio · "O Castelo"',
      flavor: 'Constrói o esconderijo perfeito: poucas necessidades, poucos vínculos, um território pequeno e absolutamente seu.',
      redFlag: 'Minimalismo que vira mingua. Corta tanto as necessidades que corta também a vida.',
    },
  },

  levels: [
    { level: 1, tone: 'SAÚDE',      behavior: 'Visionário. Compreende em profundidade E participa. O saber vira contribuição generosa.' },
    { level: 2, tone: 'SAÚDE',      behavior: 'Observador brilhante. Curiosidade viva, mente aberta, presença tranquila.' },
    { level: 3, tone: 'SAÚDE',      behavior: 'Especialista inovador. Domina seu campo e compartilha com paciência.' },
    { level: 4, tone: 'NORMAL',     behavior: 'Conceitual. Prefere o modelo da coisa à coisa. Começa a adiar a vida.' },
    { level: 5, tone: 'NORMAL',     behavior: 'Retraído. Raciona presença e afeto. Agenda social no mínimo vital.' },
    { level: 6, tone: 'NORMAL',     behavior: 'Provocador cínico. Desdenha de quem "sabe menos". Argumenta para afastar.' },
    { level: 7, tone: 'DOENTE',     behavior: 'Isolado. Corta vínculos e necessidades. O quarto vira o mundo inteiro.' },
    { level: 8, tone: 'DOENTE',     behavior: 'Fantasmagórico. Insônia, teorias sombrias, pavor do próprio colapso.' },
    { level: 9, tone: 'PATOLÓGICO', behavior: 'Anulação. Rompe com a realidade para não ser tocado por ela.' },
  ],

  pdi21Days: [
    { day: 1, focus: 'Corpo',        task: 'Três pausas hoje para responder: "o que meu corpo precisa agora?". E atender.' },
    { day: 2, focus: 'Presença',     task: 'Em uma conversa, participe SEM ensinar nada. Só esteja.' },
    { day: 3, focus: 'Pedir',        task: 'Peça ajuda em algo prático. Deixe alguém entrar no seu território.' },
    { day: 4, focus: 'Ação',         task: 'Execute algo com 70% da informação. Anote que o mundo não acabou.' },
    { day: 5, focus: 'Compartilhar', task: 'Conte a alguém algo pessoal (não conceitual) sobre a sua semana.' },
    { day: 6, focus: 'Reflexão',     task: 'Escreva: "o que estou esperando entender para começar a viver?".' },
    { day: 7, focus: 'Off',          task: 'Um dia sem acumular: nada de salvar artigo, curso ou tab nova.' },
    // … expanda até 21
  ],
}

// ──────────────────────────────────────────────────────────
// TIPO 6 · O LEAL
// ──────────────────────────────────────────────────────────
export const type6Premium: EnneagramPremium = {
  key: '6',
  name: 'Tipo 6 · O Leal',
  pitch: 'Sua mente ensaia o pior para te proteger. A vida acontece no enquanto. Aqui você aprende a confiar na sua própria bússola.',
  paletteHex: '#7a8298',

  motivations: {
    coreFear:   'Ficar sem apoio e sem orientação. Ser pego desprevenido pelo perigo.',
    coreDesire: 'Ter segurança, apoio, um chão que não trai.',
    coreBelief: 'O mundo é arriscado e as aparências enganam. Melhor prever o golpe do que levá-lo.',
  },

  childWound: {
    storyline:
      'A figura que devia ser o seu porto seguro foi imprevisível, e a criança concluiu que confiar era perigoso, inclusive confiar em si. Desde então a sua mente contratou um vigia que nunca dorme: testa as pessoas, ensaia desastres, procura a autoridade certa e duvida dela ao mesmo tempo. O vigia te protegeu. Mas ele não sabe descansar.',
    soundtrack: [
      '"E se der errado?"',
      '"Confia desconfiando."',
      '"Eu preciso de uma segunda opinião."',
    ],
    reparenting: [
      '1. Decidir uma coisa pequena por dia sem consultar ninguém, e sustentar.',
      '2. Registrar as previsões catastróficas e conferir depois quantas aconteceram.',
      '3. Quando a dúvida vier em loop, perguntar: "o que EU acho?" e responder primeiro.',
      '4. Celebrar as crises que você JÁ atravessou: a prova de competência que a ansiedade esconde.',
      '5. Um passo pequeno em direção ao que dá medo, com o medo junto.',
    ],
  },

  movement: {
    integration: {
      goesTo: '9',
      behaviorShift: 'O vigia descansa: você relaxa no presente, confia no fluxo e acolhe em vez de testar.',
      signal: 'Você percebe que passou um dia inteiro sem ensaiar nenhuma catástrofe.',
    },
    disintegration: {
      goesTo: '3',
      behaviorShift: 'Em estresse forte, acelera para provar valor: trabalha demais, compete, e a imagem vira escudo.',
      signal: 'Você mede a própria segurança pela aprovação de quem manda, e faz hora extra para comprá-la.',
    },
  },

  subtypes: {
    SOCIAL: {
      name: 'Dever · "O Guardião das Regras"',
      flavor: 'Segurança pelo sistema: cumpre normas, honra instituições, é a pessoa mais confiável da equipe.',
      redFlag: 'Obediência que cala a intuição. Segue o manual até quando o manual está errado.',
    },
    SEXUAL: {
      name: 'Força · "O Contrafóbico"',
      flavor: 'Ataca o medo antes que o medo ataque: esportes radicais, discussões de frente, postura intimidadora. O Seis que parece um Oito.',
      redFlag: 'Coragem reativa. Compra brigas desnecessárias para não sentir o medo que nega.',
    },
    PRESERVATION: {
      name: 'Calor · "O Aliado"',
      flavor: 'Segurança pelo vínculo: desarma com simpatia, constrói alianças e famílias escolhidas que o protejam.',
      redFlag: 'Dependência dos protetores. Hesita tanto sozinho que terceiriza as próprias decisões.',
    },
  },

  levels: [
    { level: 1, tone: 'SAÚDE',      behavior: 'Corajoso e autoconfiante. A lealdade vira liderança serena. Confia em si e por isso inspira confiança.' },
    { level: 2, tone: 'SAÚDE',      behavior: 'Comprometido e confiável. Constrói cooperação e segurança real ao redor.' },
    { level: 3, tone: 'SAÚDE',      behavior: 'Prático e vigilante na medida. Antecipatório sem ser ansioso.' },
    { level: 4, tone: 'NORMAL',     behavior: 'Busca garantias. Procedimentos, contratos, autoridades. Investe em prevenção.' },
    { level: 5, tone: 'NORMAL',     behavior: 'Ambivalente. Confia e testa. Aproxima e desconfia. Cansa quem ama.' },
    { level: 6, tone: 'NORMAL',     behavior: 'Reativo. Vê coalizões contra ele. Reclama do chefe e teme perdê-lo.' },
    { level: 7, tone: 'DOENTE',     behavior: 'Pânico e projeção. O perigo imaginado vira certeza. Ataques preventivos.' },
    { level: 8, tone: 'DOENTE',     behavior: 'Paranóico e dependente. Agarra-se a protetores duvidosos por pavor de ficar só.' },
    { level: 9, tone: 'PATOLÓGICO', behavior: 'Autodestrutivo. Provoca o desastre que temia só para parar de esperá-lo.' },
  ],

  pdi21Days: [
    { day: 1, focus: 'Decisão',      task: 'Decida algo pequeno sozinho hoje e não peça validação depois.' },
    { day: 2, focus: 'Evidência',    task: 'Anote 3 medos de hoje. À noite, marque quantos se confirmaram.' },
    { day: 3, focus: 'Confiança',    task: 'Liste 3 crises que você já resolveu. Leia em voz alta.' },
    { day: 4, focus: 'Presente',     task: 'Quando a mente ensaiar o futuro, volte: "o que é real AGORA?".' },
    { day: 5, focus: 'Coragem',      task: 'Um passo pequeno na direção de algo adiado por medo.' },
    { day: 6, focus: 'Reflexão',     task: 'Escreva: "o que eu faria se confiasse em mim?".' },
    { day: 7, focus: 'Off',          task: 'Dia sem pedir segunda opinião. A primeira é sua.' },
    // … expanda até 21
  ],
}

// ──────────────────────────────────────────────────────────
// TIPO 7 · O ENTUSIASTA
// ──────────────────────────────────────────────────────────
export const type7Premium: EnneagramPremium = {
  key: '7',
  name: 'Tipo 7 · O Entusiasta',
  pitch: 'A próxima coisa nunca é a coisa. Aqui você aprende que a alegria mora na experiência inteira, incluindo a parte que dói.',
  paletteHex: '#d4a93a',

  motivations: {
    coreFear:   'Ficar preso na dor, na privação, no tédio. Perder as possibilidades da vida.',
    coreDesire: 'Ser feliz, livre, satisfeito. Viver tudo o que a vida oferece.',
    coreBelief: 'A dor não agrega. Se algo pesa, a saída é para cima e para frente.',
  },

  childWound: {
    storyline:
      'Houve uma dor cedo demais (um desamparo, uma casa tensa, uma tristeza dos adultos) e a criança descobriu um superpoder: reenquadrar. Transformar medo em aventura, falta em plano, dor em piada. Funcionou tão bem que virou reflexo. Hoje você foge para o futuro com uma elegância que engana todo mundo, menos a sua exaustão.',
    soundtrack: [
      '"Depois eu sinto isso."',
      '"Tem coisa melhor me esperando."',
      '"Se eu parar, a tristeza me alcança."',
    ],
    reparenting: [
      '1. Quando vier o desconforto, ficar 90 segundos nele antes de buscar estímulo.',
      '2. Terminar UM projeto antes de abrir o próximo. Definir o que é "terminado" antes.',
      '3. Praticar a escuta sem planejar a resposta nem roubar a cena.',
      '4. Agendar silêncio: 15 minutos diários sem tela, sem música, sem plano.',
      '5. Contar a alguém uma tristeza sem fechar com piada.',
    ],
  },

  movement: {
    integration: {
      goesTo: '5',
      behaviorShift: 'A mente aquieta e aprofunda: você troca dez começos por uma maestria, e a presença vira o novo êxtase.',
      signal: 'Você passa horas em uma coisa só e sai nutrido em vez de entediado.',
    },
    disintegration: {
      goesTo: '1',
      behaviorShift: 'Em estresse forte, o leve vira rígido: crítico, impaciente, perfeccionista com os outros.',
      signal: 'Você cobra dos outros a disciplina que está fugindo de si, com um tom cortante que não parece seu.',
    },
  },

  subtypes: {
    SOCIAL: {
      name: 'Sacrifício · "O Idealista"',
      flavor: 'Adia o próprio prazer pelo grupo: serve à causa, cuida de todos, quer um mundo melhor já. O Sete que parece um Dois.',
      redFlag: 'Pureza que cobra juros. Acumula sacrifício e ressentimento por baixo do sorriso de serviço.',
    },
    SEXUAL: {
      name: 'Fascinação · "O Sonhador"',
      flavor: 'Encanta e se encanta: idealiza pessoas, planos e amores com imaginação vívida. Tudo novo brilha mais.',
      redFlag: 'Paixão pela versão imaginada. Quando a pessoa real aparece, o brilho apaga e a busca recomeça.',
    },
    PRESERVATION: {
      name: 'Rede · "O Articulador"',
      flavor: 'Garante o próprio prazer com pragmatismo: boas parcerias, boas oportunidades, sempre um plano B delicioso.',
      redFlag: 'Oportunismo charmoso. Alianças por interesse e gula de experiências, com pouco espaço para o outro.',
    },
  },

  levels: [
    { level: 1, tone: 'SAÚDE',      behavior: 'Grato e presente. Alegria profunda que não depende de estímulo. Assimila a experiência inteira.' },
    { level: 2, tone: 'SAÚDE',      behavior: 'Entusiasta produtivo. Versatilidade a serviço de algo maior.' },
    { level: 3, tone: 'SAÚDE',      behavior: 'Realizador multitalentoso. Contagia os ambientes com possibilidade.' },
    { level: 4, tone: 'NORMAL',     behavior: 'Consumidor de novidades. Agenda lotada, mente em três lugares.' },
    { level: 5, tone: 'NORMAL',     behavior: 'Distraído e disperso. Começa muito, conclui pouco. Promete demais.' },
    { level: 6, tone: 'NORMAL',     behavior: 'Excessivo. Mais compras, mais festas, mais planos. O vazio cresce junto.' },
    { level: 7, tone: 'DOENTE',     behavior: 'Insaciável e impulsivo. Foge de qualquer limite. Machuca sem parar para ver.' },
    { level: 8, tone: 'DOENTE',     behavior: 'Maníaco e errático. Dívidas, vícios, promessas queimadas.' },
    { level: 9, tone: 'PATOLÓGICO', behavior: 'Colapso. O pânico que sempre correu atrás finalmente alcança.' },
  ],

  pdi21Days: [
    { day: 1, focus: 'Presença',     task: 'Uma refeição hoje sem tela e sem pressa. Sabor por sabor.' },
    { day: 2, focus: 'Conclusão',    task: 'Termine hoje UMA coisa aberta há semanas. Pequena serve.' },
    { day: 3, focus: 'Desconforto',  task: 'Quando pintar o impulso de fugir (rolar feed, sair, comprar), espere 90 segundos.' },
    { day: 4, focus: 'Escuta',       task: 'Em uma conversa, faça 3 perguntas antes de contar qualquer história sua.' },
    { day: 5, focus: 'Profundidade', task: 'Uma hora inteira em um único assunto. Sem trocar de aba.' },
    { day: 6, focus: 'Reflexão',     task: 'Escreva: "do que eu estou fugindo com tanta pressa?".' },
    { day: 7, focus: 'Off',          task: 'Dia sem planejar nada novo. Viva os planos que já existem.' },
    // … expanda até 21
  ],
}

// ──────────────────────────────────────────────────────────
// TIPO 8 · O DESAFIADOR
// ──────────────────────────────────────────────────────────
export const type8Premium: EnneagramPremium = {
  key: '8',
  name: 'Tipo 8 · O Desafiador',
  pitch: 'Você protege todo mundo, exceto a parte sua que é tenra. Aqui você aprende que vulnerabilidade é a forma mais alta de força.',
  paletteHex: '#8c2f17',

  motivations: {
    coreFear:   'Ser controlado, traído ou prejudicado por outros.',
    coreDesire: 'Proteger a si mesmo e aos seus, manter a soberania sobre o próprio destino.',
    coreBelief: 'O mundo é um lugar onde os fortes sobrevivem. Mostrar fraqueza é convidar ataque.',
  },

  childWound: {
    storyline:
      'Em algum momento da infância, ser tenro foi punido com quebra de confiança ou abandono. Você aprendeu cedo que, para sobreviver emocionalmente, era preciso "armar-se primeiro".',
    soundtrack: [
      '"Se eu não controlar, alguém vai me controlar."',
      '"Mostrar tristeza = ser usado."',
      '"O justo aqui sou eu."',
    ],
    reparenting: [
      '1. Permitir 5 minutos diários de tenrura sem performar nada.',
      '2. Falar com alguém em quem confia sobre 1 medo real (não estratégia).',
      '3. Receber ajuda sem retribuir imediatamente.',
      '4. Dizer "eu não sei" em alta voz, sem qualificação.',
      '5. Permitir-se chorar sem editar a cena depois.',
    ],
  },

  movement: {
    integration: {
      goesTo: '2',
      behaviorShift: 'Passa de "proteger pelo controle" para "proteger pelo cuidado". Lidera servindo.',
      signal: 'Você aceita ajuda sem desconforto. Pergunta às pessoas como elas estão antes de dar ordem.',
    },
    disintegration: {
      goesTo: '5',
      behaviorShift: 'Em estresse forte, você ISOLA: desaparece, desliga, "queima ponte" mentalmente.',
      signal: 'Você corta contato com pessoas que te decepcionaram, sem aviso, e acha que está sendo "honesto".',
    },
  },

  subtypes: {
    SOCIAL: {
      name: 'Solidariedade · "O Camarada"',
      flavor: 'Lidera grupo, defende causas, conhece todo mundo. O 8 que vira ativista, sindicalista, mentora.',
      redFlag: 'Negligencia o íntimo. Conhece 500 pessoas e nenhuma sabe o que ele sente.',
    },
    SEXUAL: {
      name: 'Posse · "O Desafiador Intenso"',
      flavor: 'Cria vínculo de "tudo ou nada". Espera lealdade absoluta, e dá igual em troca.',
      redFlag: 'Ciúme. Confunde possessividade com amor. Testa lealdade do parceiro com pequenas provocações.',
    },
    PRESERVATION: {
      name: 'Sobrevivência · "Construtor de Império"',
      flavor: 'Foca em controle de recursos: dinheiro, território, segurança. Trabalha para nunca depender.',
      redFlag: 'Materialismo defensivo. Acumula sem desfrutar. Confunde patrimônio com paz.',
    },
  },

  levels: [
    { level: 1, tone: 'SAÚDE',       behavior: 'Magnânima. Usa força para proteger os menores. Vulnerabilidade visível.' },
    { level: 2, tone: 'SAÚDE',       behavior: 'Líder confiável. Decide com clareza. Defende justiça.' },
    { level: 3, tone: 'SAÚDE',       behavior: 'Empreendedor. Cria estrutura. Inspira lealdade.' },
    { level: 4, tone: 'NORMAL',      behavior: 'Combativo. Assume comando antes de ser convidado.' },
    { level: 5, tone: 'NORMAL',      behavior: 'Domina espaço. Insiste em ser ouvido. Tom alto.' },
    { level: 6, tone: 'NORMAL',      behavior: 'Confronto torna-se rotina. Vira "aquele que briga com tudo".' },
    { level: 7, tone: 'DOENTE',      behavior: 'Manipulação aberta. Usa medo para conseguir o que quer.' },
    { level: 8, tone: 'DOENTE',      behavior: 'Vingativo. Quer punir quem o "traiu". Queima pontes.' },
    { level: 9, tone: 'PATOLÓGICO',  behavior: 'Destrutivo. Pode chegar à violência ou autodestruição.' },
  ],

  pdi21Days: [
    { day: 1, focus: 'Tenrura',        task: 'Pergunte ao parceiro/filho: "como você se sente comigo essa semana?" e SÓ ESCUTE.' },
    { day: 2, focus: 'Vulnerabilidade', task: 'Conte para 1 pessoa próxima 1 medo seu, sem plano de solução.' },
    { day: 3, focus: 'Receber',        task: 'Aceite ajuda em algo. Não retribua hoje.' },
    { day: 4, focus: 'Pausa',          task: 'Em conflito hoje, espere 1h antes de responder.' },
    { day: 5, focus: 'Não saber',      task: 'Diga "eu não sei" em pelo menos 3 conversas.' },
    { day: 6, focus: 'Reflexão',       task: 'Escreva: "qual parte minha eu protejo escondendo?".' },
    { day: 7, focus: 'Off',            task: 'Repouso. Sem comandar nada.' },
    // … expanda até 21
  ],
}

// ──────────────────────────────────────────────────────────
// TIPO 9 · O PACIFICADOR
// ──────────────────────────────────────────────────────────
export const type9Premium: EnneagramPremium = {
  key: '9',
  name: 'Tipo 9 · O Pacificador',
  pitch: 'Sua paz pode ser sumiço. Aparecer dói, mas sumir custa mais. Aqui você aprende que a sua presença importa.',
  paletteHex: '#7a9e7e',

  motivations: {
    coreFear:   'Conflito, ruptura, perda de conexão. E, mais fundo: descobrir que a sua presença não faz falta.',
    coreDesire: 'Paz interior e exterior. Harmonia com as pessoas e consigo.',
    coreBelief: 'Minha vontade cria atrito, e atrito ameaça o vínculo. É mais seguro concordar.',
  },

  childWound: {
    storyline:
      'Criança, você percebeu que a sua vontade incomodava: ou havia conflito demais em casa e você virou o amortecedor, ou vozes maiores ocupavam todo o espaço e você aprendeu a caber no canto. A solução foi anestesiar os próprios desejos para manter a paz da casa. Funcionou para a casa. Para você, virou o hábito de se abandonar primeiro.',
    soundtrack: [
      '"Tanto faz, decide você."',
      '"Não vale a pena discutir por isso."',
      '"Depois eu resolvo as minhas coisas."',
    ],
    reparenting: [
      '1. Responder a "o que você quer?" com uma preferência real, todos os dias, sem "tanto faz".',
      '2. Discordar de algo pequeno por dia, em voz alta, com educação.',
      '3. Fazer a SUA tarefa prioritária antes de atender à agenda dos outros.',
      '4. Notar a teimosia silenciosa (atrasos, esquecimentos, corpo mole): é a sua raiva pedindo voz.',
      '5. Terminar o dia nomeando 1 coisa que você fez por escolha própria.',
    ],
  },

  movement: {
    integration: {
      goesTo: '3',
      behaviorShift: 'Você acorda para a própria agenda: metas, energia, presença. A paz deixa de ser sono e vira potência.',
      signal: 'Você diz "eu quero isso" em voz alta e age no mesmo dia.',
    },
    disintegration: {
      goesTo: '6',
      behaviorShift: 'Em estresse forte, a calma vira ansiedade ruminante: preocupação, indecisão, apego ao pior cenário.',
      signal: 'Você trava em loops de "e se", pedindo opinião de todos e não escolhendo nada.',
    },
  },

  subtypes: {
    SOCIAL: {
      name: 'Participação · "O Coração do Grupo"',
      flavor: 'Funde-se ao coletivo: trabalha pelo grupo com generosidade infinita e alegria de pertencer.',
      redFlag: 'Trabalha demais para os outros e some da própria vida. Pertence a todos, menos a si.',
    },
    SEXUAL: {
      name: 'Fusão · "O Espelho"',
      flavor: 'Vive através do outro: adota os gostos, os planos e até o humor do parceiro. Amor como dissolução.',
      redFlag: 'Perde as próprias bordas. Se a relação acaba, não sabe quem sobrou.',
    },
    PRESERVATION: {
      name: 'Apetite · "O Confortável"',
      flavor: 'Anestesia com rotinas gostosas: comida, série, sofá, colecionismo. Pequenos prazeres como esconderijo.',
      redFlag: 'Conforto que vira coma. As horas somem em rituais e o essencial fica para amanhã.',
    },
  },

  levels: [
    { level: 1, tone: 'SAÚDE',      behavior: 'Presente e inabalável. Paz que vem de estar inteiro, não de sumir. Une as pessoas de verdade.' },
    { level: 2, tone: 'SAÚDE',      behavior: 'Receptivo e estável. Escuta todos os lados sem se perder do seu.' },
    { level: 3, tone: 'SAÚDE',      behavior: 'Mediador natural. Acalma ambientes e sustenta acordos.' },
    { level: 4, tone: 'NORMAL',     behavior: 'Acomodado. Concorda para encerrar. Guarda as preferências no bolso.' },
    { level: 5, tone: 'NORMAL',     behavior: 'Piloto automático. Rotinas anestesiantes. "Depois" vira resposta padrão.' },
    { level: 6, tone: 'NORMAL',     behavior: 'Teimosia passiva. Diz sim e não faz. Resiste sumindo.' },
    { level: 7, tone: 'DOENTE',     behavior: 'Negligente consigo. Problemas graves ignorados para manter a "paz".' },
    { level: 8, tone: 'DOENTE',     behavior: 'Dissociado. Presente de corpo, ausente de tudo. Decisões entregues à sorte.' },
    { level: 9, tone: 'PATOLÓGICO', behavior: 'Abandono de si completo. A vida acontece sem nenhum dono dentro.' },
  ],

  pdi21Days: [
    { day: 1, focus: 'Preferência',  task: 'Escolha o restaurante/filme/programa hoje. Você. Sem "tanto faz".' },
    { day: 2, focus: 'Voz',          task: 'Discorde de uma coisa pequena em voz alta. Sobreviva ao atrito.' },
    { day: 3, focus: 'Prioridade',   task: 'Faça a SUA tarefa mais importante antes das 10h, antes de ajudar alguém.' },
    { day: 4, focus: 'Raiva',        task: 'Identifique 1 irritação de hoje e diga a frase que você engoliu (nem que seja pro espelho).' },
    { day: 5, focus: 'Presença',     task: 'Em uma conversa, dê a SUA opinião antes de perguntar a dos outros.' },
    { day: 6, focus: 'Reflexão',     task: 'Escreva: "o que eu quero que aconteça na minha vida nos próximos 12 meses?".' },
    { day: 7, focus: 'Off',          task: 'Um dia sem anestesia: cada vez que for para o sofá/celular por hábito, pergunte "estou cansado ou sumindo?".' },
    // … expanda até 21
  ],
}

// ──────────────────────────────────────────────────────────
// Catálogo completo (todos os 9 tipos com conteúdo denso)
// ──────────────────────────────────────────────────────────
export const ENNEAGRAM_PREMIUM: Record<EnneagramKey, EnneagramPremium> = {
  '1': type1Premium,
  '2': type2Premium,
  '3': type3Premium,
  '4': type4Premium,
  '5': type5Premium,
  '6': type6Premium,
  '7': type7Premium,
  '8': type8Premium,
  '9': type9Premium,
}

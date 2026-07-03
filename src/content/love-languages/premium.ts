// ============================================================
// Relatório Premium — 5 LINGUAGENS DO AMOR
// Foco: Relacionamentos e Conexão Afetiva.
// Estrutura específica:
//   - Guia para o Parceiro (PDF para presentear)
//   - Linguagem no Trabalho (motivar liderados)
//   - Linguagem Ferida (como reage à negligência)
// ============================================================

export type LoveLanguageKey = 'WORDS' | 'TIME' | 'GIFTS' | 'SERVICE' | 'TOUCH'

export interface LoveLanguagePremium {
  key: LoveLanguageKey
  label: string
  pitch: string
  paletteHex: string

  partnerGuide: {
    title:   string
    summary: string
    do:      string[]                                 // ações concretas
    dont:    string[]
    sample_week: Array<{ day: string; action: string }>  // semana exemplo
    pdf_pages: number
  }

  workplace: {
    summary:    string
    asLeader:   { do: string[]; dont: string[] }      // como liderar com isso
    asEmployee: { ask: string[];  reframe: string[] } // como pedir ao chefe
  }

  woundedLanguage: {
    summary:        string
    reaction:       string                            // como reage à negligência
    repairScript:   string                            // como pedir reparação
    selfCare:       string[]                          // como cuidar do que dói
  }

  pdi21Days: Array<{ day: number; focus: string; task: string }>
}

// ──────────────────────────────────────────────────────────
// PALAVRAS DE AFIRMAÇÃO
// ──────────────────────────────────────────────────────────
export const wordsPremium: LoveLanguagePremium = {
  key: 'WORDS',
  label: 'Palavras de Afirmação',
  pitch: 'Você guarda elogios na alma como outros guardam ouro. Aqui você aprende a pedir os elogios certos, sem mendigar.',
  paletteHex: '#a8522e',

  partnerGuide: {
    title:   'Guia para Quem Ama Alguém de Palavras de Afirmação',
    summary:
      'Para uma pessoa de Palavras, "tá tudo bem" é vácuo. Ela precisa OUVIR. Não basta sentir; precisa ser dito. Sem palavras, ela duvida do amor, mesmo cercada de gestos.',
    do: [
      'Diga em voz alta o que você admira nela hoje. Específico, não genérico.',
      'Mande mensagens curtas no meio do dia. Bilhete na bolsa, no espelho, no almoço.',
      'Em público, faça pelo menos UM elogio sincero por encontro social.',
      'Reconheça o esforço, não só o resultado.',
      'Antes de dormir, diga 1 coisa boa do dia que envolve ela.',
    ],
    dont: [
      'Achar que "ela já sabe que eu amo". Para esse perfil, dizer É amar.',
      'Substituir palavras por presente caro. Anel não cobre 3 meses sem elogio.',
      'Críticas em público: corta o vínculo de raiz.',
      'Sarcasmo. Para Palavras, sarcasmo é violência simbólica.',
    ],
    sample_week: [
      { day: 'Segunda',  action: 'Mensagem matinal de 1 frase: "lembrei de você por X".' },
      { day: 'Terça',    action: 'Elogio específico em jantar: cite UM detalhe (cabelo, escolha de palavra, decisão tomada).' },
      { day: 'Quarta',   action: 'Bilhete escrito à mão.' },
      { day: 'Quinta',   action: 'Reconhecer publicamente algo que ela fez (em casa, com filhos, em rede social).' },
      { day: 'Sexta',    action: 'Áudio curto no WhatsApp dizendo o que ela representa para você.' },
      { day: 'Sábado',   action: 'Conversa de 20 min sem distração, perguntando como foi a semana DELA.' },
      { day: 'Domingo',  action: 'Antes de dormir: 1 frase de gratidão específica do dia.' },
    ],
    pdf_pages: 16,
  },

  workplace: {
    summary:
      'No trabalho, Palavras precisam ser ouvidas tanto quanto pagas. Reconhecimento público vale mais que aumento privado para esse perfil.',
    asLeader: {
      do: [
        'Reuniões 1:1 começam com 1 elogio concreto da semana.',
        'No grupo do time, mencione contribuição da pessoa por nome.',
        'Em e-mail para liderança, copie o autor da ideia.',
      ],
      dont: [
        'Achar que "salário é elogio". Para Palavras, é o mínimo.',
        'Bonificar sem justificar a razão em voz alta.',
        'Feedback negativo sem sanduíche real (não automático).',
      ],
    },
    asEmployee: {
      ask: [
        'Peça reconhecimento direto. "Quando faço bem feito, eu preciso ouvir. Pode me dar feedback semanal de 5 min?"',
        'Solicite menção em ata, em e-mail interno, em reunião de liderança.',
        'Negocie aumento mostrando reconhecimento PÚBLICO recebido (vira referência).',
      ],
      reframe: [
        'Sua necessidade NÃO é fraqueza, é literatura interna. Você processa o mundo em palavras.',
        'Pedir reconhecimento é honestidade emocional, não vaidade.',
      ],
    },
  },

  woundedLanguage: {
    summary:
      'Quando suas palavras são negligenciadas, você silencia. Para fora vira "tudo bem". Para dentro, vira ressentimento crescente que vai cobrar em 30, 60, 90 dias.',
    reaction:
      'Você se distancia em silêncio. Responde curto. Vai para o quarto. Acumula até explodir por algo aparentemente pequeno.',
    repairScript:
      '"Eu preciso te falar uma coisa. Quando você [ação específica] na quarta, eu me senti invisível. Não é sobre estar errado, é sobre eu sentir falta de ouvir você dizer o que sente sobre mim. Posso pedir que da próxima vez você me diga em voz alta?"',
    selfCare: [
      'Diário matinal: escreva 3 frases de afirmação sobre você mesmo. Aos poucos preenche o copo de dentro.',
      'Áudios de pessoas que te amam: guarde. Reescute em momentos de invisibilidade.',
      'Carta-conforto: escreva uma carta para sua versão de 8 anos de idade dizendo o que ela precisava ouvir.',
      'Comunidade onde palavras circulam (livro-clube, grupo de escrita): ali você se nutre.',
    ],
  },

  pdi21Days: [
    { day: 1, focus: 'Auto-Palavra', task: 'Escreva 3 elogios específicos sobre você mesmo. Cole no espelho.' },
    { day: 2, focus: 'Pedir',         task: 'Peça a 1 pessoa que você ama: "me diga uma coisa boa que você vê em mim".' },
    { day: 3, focus: 'Dar',            task: 'Mande 3 elogios específicos a 3 pessoas hoje.' },
    { day: 4, focus: 'Limites',        task: 'Quando alguém usar sarcasmo, diga: "isso me machuca. Pode reformular?".' },
    { day: 5, focus: 'Reparação',      task: 'Use o script de reparação com alguém que negligenciou suas palavras.' },
    { day: 6, focus: 'Diário',         task: 'Anote: que palavra eu mais ouvi essa semana? que palavra senti falta?' },
    { day: 7, focus: 'Off',            task: 'Reescute áudios de quem te ama.' },
    // … expanda até 21
  ],
}

// ──────────────────────────────────────────────────────────
// TEMPO DE QUALIDADE
// ──────────────────────────────────────────────────────────
export const timePremium: LoveLanguagePremium = {
  key: 'TIME',
  label: 'Tempo de Qualidade',
  pitch: 'Presença sem celular é seu altar. Aqui você aprende a exigi-la sem culpa.',
  paletteHex: '#3a6db4',

  partnerGuide: {
    title:   'Guia para Quem Ama Alguém de Tempo de Qualidade',
    summary:
      'Para uma pessoa de Tempo, estar no mesmo cômodo NÃO conta. Presença dividida com o celular é ausência com testemunha. Ela mede amor em minutos de atenção total, e nota cada olhada na tela.',
    do: [
      'Celular virado para baixo (ou em outro cômodo) durante refeições e conversas.',
      'Agende encontros como agenda reunião: dia, hora, atividade. Para ela, agendar é declarar prioridade.',
      'Olho no olho quando ela fala. Corpo virado para ela, não de lado.',
      'Rituais pequenos e fixos: café de sábado, caminhada de domingo. Constância vale mais que grandiosidade.',
      'Faça perguntas de segunda camada: não "como foi o dia?", mas "e o que você sentiu quando isso aconteceu?".',
    ],
    dont: [
      'Responder mensagem no meio da conversa "só um segundo". Cada segundo desses apaga dez minutos de presença.',
      'Confundir quantidade com qualidade: 4 horas juntos vendo TV calados valem menos que 30 min de conversa real.',
      'Cancelar em cima da hora. Para Tempo, cancelamento é rejeição pessoal, não logística.',
      'Levar a série ou o jogo como "programa a dois" toda vez. Tela dividida não é atenção dividida por dois; é atenção dividida por zero.',
    ],
    sample_week: [
      { day: 'Segunda',  action: 'Jantar sem telas. 30 minutos, celulares em outro cômodo.' },
      { day: 'Terça',    action: 'Pergunte "qual foi a melhor e a pior parte do seu dia?" e escute até o fim.' },
      { day: 'Quarta',   action: 'Caminhada de 20 min juntos depois do jantar, sem fones.' },
      { day: 'Quinta',   action: 'Convide para algo específico do fim de semana. Agendar já é presente.' },
      { day: 'Sexta',    action: 'Chegue 30 min mais cedo em casa (ou desligue o trabalho 30 min antes) e anuncie: "esse tempo é nosso".' },
      { day: 'Sábado',   action: 'Programa a dois de 2 horas escolhido por ELA. Você presente de corpo e atenção.' },
      { day: 'Domingo',  action: 'Café da manhã longo, sem pressa e sem pauta. Só estar.' },
    ],
    pdf_pages: 16,
  },

  workplace: {
    summary:
      'No trabalho, o perfil de Tempo se sente valorizado quando o líder INVESTE minutos exclusivos nele. Reunião 1:1 cancelada três vezes seguidas dói mais que bônus atrasado.',
    asLeader: {
      do: [
        '1:1 quinzenal sagrado, com atenção total: notebook fechado, notificação silenciada.',
        'Ao delegar algo importante, sente junto na primeira hora em vez de mandar por mensagem.',
        'Almoce com cada liderado individualmente ao menos 1 vez por trimestre.',
      ],
      dont: [
        'Responder e-mail enquanto a pessoa fala com você. Ela registra e desconta em engajamento.',
        'Cancelar 1:1 repetidamente "porque surgiu coisa mais importante". A mensagem que chega: VOCÊ não é importante.',
        'Achar que feedback por escrito substitui conversa. Para esse perfil, não substitui.',
      ],
    },
    asEmployee: {
      ask: [
        'Peça 1:1 recorrente: "eu rendo mais com 30 min quinzenais de conversa direta do que com dez e-mails".',
        'Em decisões de carreira, peça a conversa presencial ou por vídeo, não a mensagem no chat.',
        'Proponha ritual de time (café semanal, retro quinzenal) e explique que alinhamento presencial evita retrabalho.',
      ],
      reframe: [
        'Precisar de tempo do líder não é carência, é seu canal de calibração. Você trabalha melhor alinhado.',
        'Pedir atenção exclusiva por 30 minutos é pedido profissional legítimo, não roubo de agenda.',
      ],
    },
  },

  woundedLanguage: {
    summary:
      'Quando seu tempo é negligenciado, você se sente preterido: todo mundo e tudo parece vir antes de você. A ferida não é o que fizeram; é o que deixaram de viver com você.',
    reaction:
      'Você para de convidar, para de esperar e monta uma vida paralela em silêncio. Quando percebem, você já está longe há meses. A frase típica engolida: "deixa, não era importante".',
    repairScript:
      '"Preciso te dizer uma coisa sem briga. Nas últimas semanas a gente não teve nenhum tempo de verdade juntos, e para mim isso pesa mais do que talvez você imagine. Não quero mais horas; quero 30 minutos inteiros, sem celular. Podemos fixar um momento nosso na semana?"',
    selfCare: [
      'Dê a si mesmo o tempo que espera dos outros: um bloco semanal de 2 horas só seu, agendado e cumprido.',
      'Liste as 3 pessoas que efetivamente investem tempo em você e regue essas relações primeiro.',
      'Aprenda a nomear cedo: no PRIMEIRO cancelamento repetido, fale. Não espere o terceiro para explodir.',
      'Preencha esperas com presença própria (caminhada, café sem celular), não com ruminação sobre quem não veio.',
    ],
  },

  pdi21Days: [
    { day: 1, focus: 'Auto-tempo',  task: 'Bloqueie 1 hora só sua hoje na agenda. Cumpra como cumpriria reunião com chefe.' },
    { day: 2, focus: 'Pedir',        task: 'Convide alguém querido para 30 min sem telas esta semana. Proponha dia e hora.' },
    { day: 3, focus: 'Presença',     task: 'Em TODAS as conversas de hoje, celular fora do alcance da mão.' },
    { day: 4, focus: 'Limite',       task: 'Se alguém pegar o celular no meio da sua fala, diga com leveza: "te espero terminar".' },
    { day: 5, focus: 'Reparação',    task: 'Use o script de reparação com quem tem cancelado seus momentos.' },
    { day: 6, focus: 'Diário',       task: 'Anote: quanto tempo de atenção REAL recebi esta semana? E quanto ofereci?' },
    { day: 7, focus: 'Off',          task: 'Meio dia inteiro com alguém que você ama. Sem pauta, sem pressa, sem tela.' },
    // … expanda até 21
  ],
}

// ──────────────────────────────────────────────────────────
// PRESENTES
// ──────────────────────────────────────────────────────────
export const giftsPremium: LoveLanguagePremium = {
  key: 'GIFTS',
  label: 'Presentes',
  pitch: 'Lembrança vale mais que valor. Aqui você desfaz a confusão "consumismo vs amor".',
  paletteHex: '#d4943a',

  partnerGuide: {
    title:   'Guia para Quem Ama Alguém de Presentes',
    summary:
      'Para uma pessoa de Presentes, o objeto é prova física de um pensamento: "alguém lembrou de mim quando eu não estava lá". O preço é irrelevante; a especificidade é tudo. Uma flor do caminho vale mais que um vale-presente caro.',
    do: [
      'Anote no celular tudo que ela menciona querer ou admirar. Essa lista é ouro para o ano inteiro.',
      'Presentes-surpresa pequenos e sem data: o chocolate favorito numa terça diz "penso em você sempre", não só no calendário.',
      'Traga algo de toda viagem, mesmo de trabalho. O suvenir diz "você foi comigo".',
      'Guarde e valorize os presentes que ELA te dá: usar o presente é retribuir na língua dela.',
      'Capriche no ritual: embrulho, bilhete, momento de entrega. A cerimônia é metade do presente.',
    ],
    dont: [
      'Dar dinheiro ou vale-presente como padrão. Diz "não te conheço o suficiente para escolher".',
      'Esquecer datas: aniversário e datas do casal esquecidos são feridas que esse perfil NUNCA esquece.',
      'Presentear por obrigação visível ("comprei na pressa ontem"). Pior que não dar.',
      'Julgar a linguagem como materialismo. Ela não quer coisas; quer provas de pensamento.',
      'Dar presente genérico de última hora repetidamente (perfume aleatório, caixa de bombom de posto).',
    ],
    sample_week: [
      { day: 'Segunda',  action: 'Comece a lista secreta: anote 1 coisa que ela mencionou querer ou admirar.' },
      { day: 'Terça',    action: 'Traga o lanche ou doce favorito dela sem motivo nenhum.' },
      { day: 'Quarta',   action: 'Bilhete junto de algo pequeno: "vi isso e lembrei de você porque…".' },
      { day: 'Quinta',   action: 'Use ou exiba um presente que ela te deu e mencione isso a ela.' },
      { day: 'Sexta',    action: 'Flor, planta ou item simbólico do caminho de casa. O gesto, não o valor.' },
      { day: 'Sábado',   action: 'Passeiem juntos e observe o que os olhos dela demoram para largar. Anote.' },
      { day: 'Domingo',  action: 'Planeje o próximo presente de data especial com 1 mês de antecedência, usando a lista.' },
    ],
    pdf_pages: 16,
  },

  workplace: {
    summary:
      'No trabalho, esse perfil se sente visto quando o reconhecimento vira algo TANGÍVEL: o brinde escolhido a dedo, a lembrança da empresa, o mimo pós-projeto. Símbolos físicos contam a história do valor dele.',
    asLeader: {
      do: [
        'Marque entregas importantes com um símbolo físico: livro escolhido para a pessoa, kit, troféu informal.',
        'Lembre aniversário e datas: um mimo pequeno com cartão assinado vale mais que mensagem automática de RH.',
        'Traga lembranças de eventos e viagens de trabalho para o time. Distribua com contexto.',
      ],
      dont: [
        'Dar brinde genérico igual para todos como único reconhecimento (a caneca do estoque diz "você é qualquer um").',
        'Prometer prêmio e não entregar. Para esse perfil, é dívida registrada.',
        'Ridicularizar o apego dela a objetos e lembranças do escritório.',
      ],
    },
    asEmployee: {
      ask: [
        'Sugira ritual de celebração com símbolo físico ao fechar projetos grandes.',
        'Em negociação, dê peso a benefícios tangíveis (equipamento, curso, viagem) além do salário.',
        'Peça que reconhecimentos venham com algo concreto: certificado, carta assinada, registro material.',
      ],
      reframe: [
        'Valorizar símbolos físicos não é futilidade: é como sua memória emocional arquiva conquistas.',
        'O troféu na estante é seu diário de vitórias. Não se envergonhe de precisar dele.',
      ],
    },
  },

  woundedLanguage: {
    summary:
      'Quando sua linguagem é negligenciada, cada data esquecida e cada "não te trouxe nada" vira prova arquivada de que você não ocupa a mente de quem ama. A dor não é a falta do objeto; é a falta do pensamento.',
    reaction:
      'Você guarda TUDO: lembra exatamente qual aniversário foi esquecido e o que ganhou (ou não) em cada data. Vira placar silencioso e cobrança amarga que os outros acham "drama por bobagem".',
    repairScript:
      '"Quero te explicar uma coisa sobre mim sem cobrança. Quando uma data passa em branco, para mim não é sobre o presente; é sentir que não passei pela sua cabeça. Um bilhete resolve, uma flor resolve. Posso te pedir que essas datas entrem na sua agenda como entram as do trabalho?"',
    selfCare: [
      'Presenteie a si mesmo com intenção nas suas datas: escolha com antecedência algo que conta sua história.',
      'Releia a prateleira: pegue 3 objetos que ganhou de pessoas queridas e relembre o momento. O amor já recebido também nutre.',
      'Separe o placar da pessoa: quem não fala sua linguagem não necessariamente não ama. Ensine antes de sentenciar.',
      'Dê presentes sem esperar troca 1 vez por mês. Doar na sua linguagem, sem placar, cura o ressentimento.',
    ],
  },

  pdi21Days: [
    { day: 1, focus: 'História',    task: 'Escolha 3 presentes marcantes que você já ganhou e escreva POR QUE marcaram.' },
    { day: 2, focus: 'Dar',          task: 'Dê uma lembrança pequena e específica a alguém hoje, com bilhete do porquê.' },
    { day: 3, focus: 'Ensinar',      task: 'Conte a alguém próximo como sua linguagem funciona, usando o exemplo da flor vs vale-presente.' },
    { day: 4, focus: 'Placar',       task: 'Identifique 1 mágoa de data esquecida e decida: conversar ou soltar. Escolha uma.' },
    { day: 5, focus: 'Reparação',    task: 'Use o script de reparação com quem mais esquece suas datas.' },
    { day: 6, focus: 'Auto-presente', task: 'Compre ou prepare algo pequeno para VOCÊ, embrulhe e abra com cerimônia. A sério.' },
    { day: 7, focus: 'Off',          task: 'Organize suas lembranças queridas num lugar visível. Seu museu do afeto.' },
    // … expanda até 21
  ],
}

// ──────────────────────────────────────────────────────────
// ATOS DE SERVIÇO
// ──────────────────────────────────────────────────────────
export const servicePremium: LoveLanguagePremium = {
  key: 'SERVICE',
  label: 'Atos de Serviço',
  pitch: 'Ação concreta é sua poesia. Cuidado com a passividade silenciosa.',
  paletteHex: '#7a9e7e',

  partnerGuide: {
    title:   'Guia para Quem Ama Alguém de Atos de Serviço',
    summary:
      'Para uma pessoa de Atos de Serviço, "eu te amo" se conjuga com verbo de ação: lavou, buscou, consertou, resolveu. Palavras bonitas com pia cheia soam como mentira. Ajudar SEM ela pedir é a declaração máxima.',
    do: [
      'Perceba e aja antes do pedido: a lâmpada queimada trocada sem aviso vale um buquê.',
      'Assuma tarefas que ela detesta, de forma recorrente e sem alarde.',
      'Quando ela estiver sobrecarregada, pergunte: "o que eu tiro do seu prato AGORA?". E tire.',
      'Termine o que começar. Consertar pela metade frustra mais que não começar.',
      'Nos dias difíceis dela, apareça com solução prática: comida pronta, carona resolvida, problema encaminhado.',
    ],
    dont: [
      'Prometer e não fazer. Para esse perfil, promessa quebrada é a ferida número 1.',
      'Esperar ser pedido para agir. Ter que pedir, para ela, já anula metade do gesto.',
      'Ajudar reclamando ou cobrando crédito depois. O suspiro alto apaga o ato.',
      'Compensar ausência prática com declarações românticas. Ela ouve e pensa: "então lava a louça".',
      'Tratar as tarefas da casa como "ajuda" para ela. Parceria não é favor.',
    ],
    sample_week: [
      { day: 'Segunda',  action: 'Resolva 1 pendência doméstica que é "dela" sem anunciar. Deixe que descubra.' },
      { day: 'Terça',    action: 'Pergunte: "qual sua pior tarefa da semana?" e assuma essa tarefa.' },
      { day: 'Quarta',   action: 'Prepare (ou providencie) o jantar do zero, incluindo a limpeza depois.' },
      { day: 'Quinta',   action: 'Adiante algo do dia seguinte dela: tanque cheio, roupa passada, lancheira pronta.' },
      { day: 'Sexta',    action: 'Conserte ou encaminhe aquilo que está quebrado há semanas.' },
      { day: 'Sábado',   action: 'Manhã de mutirão a dois em algo que pesa para ela (armário, garagem, papelada).' },
      { day: 'Domingo',  action: 'Deixe a segunda-feira dela mais leve: planeje e execute 2 preparativos.' },
    ],
    pdf_pages: 16,
  },

  workplace: {
    summary:
      'No trabalho, esse perfil mede o valor que tem para o líder pelo suporte CONCRETO que recebe: ferramenta que funciona, obstáculo removido, ajuda real no aperto. Discurso motivacional sem suporte é ruído.',
    asLeader: {
      do: [
        'Remova bloqueios rápido: para esse perfil, o líder que resolve o acesso travado em 1 hora "ama" o time.',
        'Arregace as mangas junto nos picos de trabalho. Liderar servindo é a linguagem dele.',
        'Garanta ferramentas e condições ANTES de cobrar resultado.',
      ],
      dont: [
        'Fazer reunião motivacional enquanto o problema prático continua sem solução.',
        'Prometer recurso, prazo ou contratação e não cumprir. Credibilidade não volta com discurso.',
        'Ignorar sobrecarga visível. Ele não vai pedir ajuda; vai colapsar calado.',
      ],
    },
    asEmployee: {
      ask: [
        'Peça suporte em termos concretos: "para entregar X, preciso de Y até sexta". Não espere adivinharem.',
        'Negocie prioridades quando sobrecarregado: "o que sai do meu prato para isso entrar?".',
        'Peça que reconhecimento venha como investimento prático: ferramenta melhor, curso, apoio de mais alguém.',
      ],
      reframe: [
        'Pedir ajuda não é incompetência: é gestão de recurso. Você, que sempre serve, também tem direito ao suporte.',
        'Dizer "não cabe" a tempo é um ato de serviço ao projeto, não uma falha sua.',
      ],
    },
  },

  woundedLanguage: {
    summary:
      'Quando sua linguagem é negligenciada, você se sente explorado: o único que carrega, resolve e segura tudo, enquanto os outros "só falam". O amor vira contabilidade de esforço não retribuído.',
    reaction:
      'Você continua servindo, mas com ressentimento crescente: suspiros, ironias ("deixa que EU faço, como sempre") e uma exaustão que ninguém entende porque você nunca pediu ajuda em voz alta.',
    repairScript:
      '"Quero conversar sobre uma coisa antes que vire mágoa. Eu demonstro amor fazendo, e sinto amor quando fazem por mim. Ultimamente sinto que carrego sozinho [situação específica]. Não preciso de promessa; preciso que uma coisa concreta saia das minhas costas. Pode assumir [tarefa] a partir desta semana?"',
    selfCare: [
      'Aprenda a receber: quando oferecerem ajuda, diga SIM sem revisar o serviço depois. Receber também é intimidade.',
      'Corte um serviço invisível por semana e observe: o mundo não cai, e você respira.',
      'Sirva a si mesmo com o mesmo capricho: cozinhe para você, conserte o que é seu, resolva a SUA pendência antiga.',
      'Troque o suspiro pelo pedido: em vez de fazer bufando, pare e peça com frase completa.',
    ],
  },

  pdi21Days: [
    { day: 1, focus: 'Inventário',  task: 'Liste tudo que você faz pelos outros numa semana comum. Olhe o tamanho da lista.' },
    { day: 2, focus: 'Pedir',        task: 'Peça 1 ajuda concreta hoje, com frase direta. Sem se desculpar por pedir.' },
    { day: 3, focus: 'Receber',      task: 'Aceite uma ajuda oferecida sem corrigir nem refazer depois.' },
    { day: 4, focus: 'Limite',       task: 'Diga 1 "não consigo assumir isso" hoje. Educado e sem justificativa longa.' },
    { day: 5, focus: 'Reparação',    task: 'Use o script de reparação com quem mais se apoia em você sem retribuir.' },
    { day: 6, focus: 'Auto-serviço', task: 'Dedique 1 hora resolvendo uma pendência SUA que você sempre adia pelos outros.' },
    { day: 7, focus: 'Off',          task: 'Um dia sem servir ninguém. Se a culpa vier, anote o que ela diz e conteste no papel.' },
    // … expanda até 21
  ],
}

// ──────────────────────────────────────────────────────────
// TOQUE FÍSICO
// ──────────────────────────────────────────────────────────
export const touchPremium: LoveLanguagePremium = {
  key: 'TOUCH',
  label: 'Toque Físico',
  pitch: 'Pele é vocabulário. Aqui você redescobre toque sem ele virar dependência.',
  paletteHex: '#a8522e',

  partnerGuide: {
    title:   'Guia para Quem Ama Alguém de Toque Físico',
    summary:
      'Para uma pessoa de Toque, o corpo é o canal do vínculo: mão dada, abraço longo, encostar no sofá. Distância física é sentida como distância emocional, mesmo com palavras e gestos em dia. E atenção: toque afetivo NÃO é sinônimo de sexo.',
    do: [
      'Abraço de chegada e de saída, todos os dias. Longo o bastante para o corpo relaxar (6 segundos mudam a química).',
      'Toques casuais ao longo do dia: mão no ombro ao passar, cafuné no sofá, mão dada na rua.',
      'No conflito, se ela permitir, um toque no braço acalma mais que dez argumentos.',
      'Fisicalidade sem agenda: carinho que não é prelúdio de nada, só presença.',
      'Nos dias difíceis dela, ofereça o abraço antes do conselho: "vem cá primeiro".',
    ],
    dont: [
      'Usar o toque só como iniciação sexual. Ela percebe o padrão e o carinho perde valor.',
      'Punir com frieza física em brigas (dormir virado, tirar a mão). Para Toque, é o castigo mais cruel.',
      'Rejeitar toque em público repetidamente ("aqui não"). A rejeição dói dobrado diante de outros.',
      'Achar que carência de toque é "manha". É o sistema nervoso dela pedindo regulação.',
      'Tocar sem ler o momento: toque forçado em hora errada também machuca. Pergunte, observe.',
    ],
    sample_week: [
      { day: 'Segunda',  action: 'Abraço de 6 segundos na chegada. Conte mentalmente, sem pressa de soltar.' },
      { day: 'Terça',    action: 'Cafuné ou massagem de 5 min no sofá, sem segunda intenção.' },
      { day: 'Quarta',   action: 'Mão dada no trajeto a pé ou no carro (semáforo vale).' },
      { day: 'Quinta',   action: 'Beijo de bom dia e de boa noite com presença, não protocolo.' },
      { day: 'Sexta',    action: 'Sentem-se COLADOS para ver algo juntos, não em pontas opostas do sofá.' },
      { day: 'Sábado',   action: 'Dança na sala, luta de travesseiro ou caminhada de braço dado: corpo em jogo leve.' },
      { day: 'Domingo',  action: 'Manhã preguiçosa com contato físico prolongado antes de pegar o celular.' },
    ],
    pdf_pages: 16,
  },

  workplace: {
    summary:
      'No ambiente profissional, o toque é limitado por respeito e contexto, e ESTE perfil sente essa lacuna. A tradução corporativa da linguagem: proximidade física respeitosa, aperto de mão firme, presença ao vivo em vez de tela.',
    asLeader: {
      do: [
        'Cumprimente com aperto de mão firme e olho no olho. Para esse perfil, isso já comunica confiança.',
        'Prefira conversas presenciais ou caminhando ("walking 1:1") com esse liderado.',
        'Comemore conquistas com o gesto adequado do contexto: high five, tapinha no ombro (com consentimento e bom senso).',
      ],
      dont: [
        'Confundir a linguagem com liberdade para toque invasivo. Consentimento e contexto SEMPRE.',
        'Deixar esse liderado 100% remoto sem nenhum encontro presencial no trimestre.',
        'Cumprimentar a todos e "pular" a pessoa. Ela nota o corpo excluído.',
      ],
    },
    asEmployee: {
      ask: [
        'Priorize presencial quando puder escolher: seu vínculo com o time se forma ao vivo.',
        'Proponha rituais físicos leves de equipe: café em pé, caminhada pós-almoço, comemorações presenciais.',
        'Em trabalho remoto, compense com esporte ou atividade física social fora do expediente.',
      ],
      reframe: [
        'Precisar de presença física não é infantilidade: seu cérebro processa segurança pelo corpo.',
        'Buscar o presencial é estratégia de engajamento, não resistência ao remoto.',
      ],
    },
  },

  woundedLanguage: {
    summary:
      'Quando o toque falta, seu corpo inteiro registra abandono antes da sua mente nomear. Você pode estar num relacionamento "perfeito no papel" e se sentir profundamente só, porque a pele está em jejum.',
    reaction:
      'Duas rotas: ou você se torna carente e insistente (e ouve "você me sufoca"), ou congela e para de tocar também, endurecendo por fora enquanto definha por dentro. Risco real: buscar toque em lugares que machucam.',
    repairScript:
      '"Preciso te contar como eu funciono. Quando passamos dias sem contato físico de verdade, meu corpo entende que algo quebrou entre a gente, mesmo quando está tudo bem. Não é cobrança de sexo; é abraço, mão, proximidade. Podemos voltar a ter isso no dia a dia? Começando pelo abraço de chegada?"',
    selfCare: [
      'Regule pelo corpo: alongamento, automassagem com óleo, cobertor pesado. O sistema nervoso aceita autocuidado tátil.',
      'Massagem terapêutica regular: toque profissional e seguro nutre o mesmo canal.',
      'Contato físico saudável fora do romance: abraço em amigos queridos, dança de salão, esporte de contato, pets.',
      'Nomeie o jejum cedo: "estou há X dias sem abraço de verdade" é informação, não drama. Aja sobre ela.',
    ],
  },

  pdi21Days: [
    { day: 1, focus: 'Consciência', task: 'Conte quantos toques afetivos você deu e recebeu hoje. Anote o número real.' },
    { day: 2, focus: 'Pedir',        task: 'Peça um abraço em palavras: "posso te pedir um abraço?". Sem rodeio.' },
    { day: 3, focus: 'Dar',          task: 'Ofereça 3 toques afetivos apropriados hoje (abraço, mão no ombro, aperto de mão caloroso).' },
    { day: 4, focus: 'Corpo',        task: '15 min de alongamento ou automassagem com atenção total às sensações.' },
    { day: 5, focus: 'Reparação',    task: 'Use o script de reparação com quem esfriou o contato físico com você.' },
    { day: 6, focus: 'Diário',       task: 'Anote: em que momentos meu corpo pediu contato esta semana? O que fiz com isso?' },
    { day: 7, focus: 'Off',          task: 'Programa de contato saudável: dança, esporte, massagem ou tarde de cafuné.' },
    // … expanda até 21
  ],
}

export const LOVE_PREMIUM: Record<LoveLanguageKey, LoveLanguagePremium> = {
  WORDS:   wordsPremium,
  TIME:    timePremium,
  GIFTS:   giftsPremium,
  SERVICE: servicePremium,
  TOUCH:   touchPremium,
}

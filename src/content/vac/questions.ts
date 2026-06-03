// ============================================================
// VAC — Visual, Auditivo, Sinestésico (Mapa Sensorial)
// Banco de 60 questões (20 por canal). A cada sessão são
// sorteadas 30 (10 por canal) com seed determinístico por
// token, para que o candidato veja perguntas novas se refizer.
// Escala Likert 1 a 5 (1 = Nunca/Não tem nada a ver comigo,
// 5 = Sempre/Tem tudo a ver comigo).
// ============================================================

export type VacChannel = 'V' | 'A' | 'S'

export interface VacQuestion {
  id:      number
  channel: VacChannel
  bloco:   string
  texto:   string
}

// ── Banco completo, 60 questões ───────────────────────────────
// Q1 a Q30: base original validada por Kênio
// Q31 a Q60: variantes complementares, mesmo canal, cenário distinto

export const VAC_QUESTIONS: VacQuestion[] = [

  // ───── BLOCO 1, Comunicação e Linguagem
  { id: 1, channel: 'V', bloco: 'Comunicação',
    texto: 'Ao explicar uma ideia para alguém, busco usar termos como "veja bem", "olha só" ou tento fazer a pessoa "enxergar" o meu ponto de vista.' },
  { id: 2, channel: 'A', bloco: 'Comunicação',
    texto: 'Presto muita atenção ao tom de voz, ritmo e clareza das palavras das pessoas, às vezes mais do que no conteúdo do que elas estão dizendo.' },
  { id: 3, channel: 'S', bloco: 'Comunicação',
    texto: 'Uso expressões que remetem a sensações físicas ou peso, como "preciso sentir firmeza nisso", "vamos tocar o projeto em frente" ou "isso me tirou o chão".' },

  // ───── BLOCO 2, Tomada de Decisão e Consumo
  { id: 4, channel: 'V', bloco: 'Decisão',
    texto: 'Ao comprar um produto (como um carro ou celular), a estética, o design, a cor e a harmonia visual da embalagem são os fatores que mais me atraem primeiro.' },
  { id: 5, channel: 'A', bloco: 'Decisão',
    texto: 'Ao escolher um lugar para jantar ou trabalhar, o barulho do ambiente ou o tipo de música de fundo influenciam diretamente a minha decisão de ficar ou ir embora.' },
  { id: 6, channel: 'S', bloco: 'Decisão',
    texto: 'Prefiro comprar roupas pelo toque do tecido e pelo conforto que sinto ao vesti-las, mesmo que o modelo não seja o mais chamativo visualmente.' },

  // ───── BLOCO 3, Foco, Aprendizado e Memória
  { id: 7, channel: 'V', bloco: 'Aprendizado',
    texto: 'Para guardar um recado ou aprender algo novo, funciona muito melhor se eu puder anotar, desenhar esquemas, mapas mentais ou olhar para um gráfico.' },
  { id: 8, channel: 'A', bloco: 'Aprendizado',
    texto: 'Consigo me lembrar com facilidade de conversas antigas, piadas contadas textualmente ou de instruções que me foram passadas apenas de forma falada.' },
  { id: 9, channel: 'S', bloco: 'Aprendizado',
    texto: 'Tenho facilidade para aprender fazendo (colocando a mão na massa) e retenho melhor a informação quando participo de dinâmicas práticas ou sinto o processo na pele.' },

  // ───── BLOCO 4, Reação ao Ambiente e Estresse
  { id: 10, channel: 'V', bloco: 'Estresse',
    texto: 'Fico extremamente incomodado(a) e perco a concentração se o meu ambiente de trabalho ou de estudos estiver bagunçado, desalinhado ou visualmente poluído.' },
  { id: 11, channel: 'A', bloco: 'Estresse',
    texto: 'Ruídos repetitivos, conversas paralelas ou sons agudos ao meu redor me irritam facilmente e sabotam a minha produtividade.' },
  { id: 12, channel: 'S', bloco: 'Estresse',
    texto: 'Quando estou sob estresse ou ansioso(a), percebo imediatamente reações físicas no meu corpo, como tensão nos ombros, aperto no peito ou desconforto no estômago.' },

  // ───── BLOCO 5, Relacionamentos e Empatia
  { id: 13, channel: 'V', bloco: 'Relacionamentos',
    texto: 'Percebo rapidamente quando alguém muda o visual, corta o cabelo ou usa uma roupa nova, mesmo que a mudança seja sutil.' },
  { id: 14, channel: 'A', bloco: 'Relacionamentos',
    texto: 'Sei exatamente como um amigo ou colega está se sentindo apenas pelo tom de voz dele ao telefone, mesmo que ele diga que está tudo bem.' },
  { id: 15, channel: 'S', bloco: 'Relacionamentos',
    texto: 'Para me sentir verdadeiramente conectado(a) com alguém, sinto necessidade de proximidade física, como um aperto de mão firme, um abraço ou um toque no ombro.' },

  // ───── BLOCO 6, Lazer e Descanso
  { id: 16, channel: 'V', bloco: 'Lazer',
    texto: 'Para relaxar, sinto muito prazer em apreciar belas paisagens, assistir a filmes com grande riqueza visual, fotografia bem feita ou visitar exposições.' },
  { id: 17, channel: 'A', bloco: 'Lazer',
    texto: 'Aprecio momentos de silêncio absoluto para organizar minhas ideias ou prefiro relaxar ouvindo músicas selecionadas, podcasts e sons da natureza.' },
  { id: 18, channel: 'S', bloco: 'Lazer',
    texto: 'Meu descanso ideal envolve conforto físico total: uma cama aconchegante, um banho quente demorado, uma boa refeição ou uma massagem relaxante.' },

  // ───── BLOCO 7, Organização de Pensamento
  { id: 19, channel: 'V', bloco: 'Pensamento',
    texto: 'Quando planejo o meu dia ou um projeto, preciso "ver" o cronograma pronto na minha mente ou espalhado em telas, post its e agendas.' },
  { id: 20, channel: 'A', bloco: 'Pensamento',
    texto: 'Costumo conversar comigo mesmo (em voz alta ou mentalmente) para organizar meus pensamentos, debater opções e tomar decisões.' },
  { id: 21, channel: 'S', bloco: 'Pensamento',
    texto: 'Antes de iniciar uma tarefa, preciso me sentir emocionalmente confortável e sintonizado com o ambiente, caso contrário, sinto um bloqueio para começar.' },

  // ───── BLOCO 8, Trabalho em Equipe e Reuniões
  { id: 22, channel: 'V', bloco: 'Reuniões',
    texto: 'Em reuniões de negócios, prefiro apresentações que utilizem slides limpos, gráficos claros e dados visuais estruturados em vez de relatórios apenas lidos.' },
  { id: 23, channel: 'A', bloco: 'Reuniões',
    texto: 'Prefiro receber instruções de trabalho verbalmente ou por áudio claro do que ter que ler longos manuais ou e mails detalhados.' },
  { id: 24, channel: 'S', bloco: 'Reuniões',
    texto: 'Valorizo muito o clima organizacional e o nível de harmonia e energia entre os membros da equipe durante um projeto.' },

  // ───── BLOCO 9, Absorção de Conteúdo
  { id: 25, channel: 'V', bloco: 'Conteúdo',
    texto: 'Ao ler um livro ou relatório, as descrições visuais de cenários e a formatação do texto (espaçamento, fontes) fazem muita diferença na minha leitura.' },
  { id: 26, channel: 'A', bloco: 'Conteúdo',
    texto: 'Consigo absorver e reter muito mais conteúdo consumindo audiobooks ou palestras em formato de áudio enquanto faço outras atividades.' },
  { id: 27, channel: 'S', bloco: 'Conteúdo',
    texto: 'Tenho o hábito de gesticular muito com as mãos ou me movimentar pelo espaço enquanto estou falando, explicando algo ou pensando.' },

  // ───── BLOCO 10, Filtros de Distração
  { id: 28, channel: 'V', bloco: 'Distração',
    texto: 'Distraio-me facilmente se houver muito movimento de pessoas passando ao meu redor ou se houver alertas luminosos pulando na tela do computador.' },
  { id: 29, channel: 'A', bloco: 'Distração',
    texto: 'Interrupções sonoras bruscas (como alguém me chamando no meio de um raciocínio ou um telefone tocando alto) quebram meu fluxo de pensamento imediatamente.' },
  { id: 30, channel: 'S', bloco: 'Distração',
    texto: 'Fatores como uma cadeira desconfortável, temperatura muito fria ou quente, ou fome destroem completamente a minha capacidade de concentração.' },

  // ───── EXPANSÃO, Q31 a Q60 (variantes complementares)

  // Comunicação (extras)
  { id: 31, channel: 'V', bloco: 'Comunicação',
    texto: 'Quando alguém me conta um caso, automaticamente formo uma imagem mental da cena na minha cabeça enquanto ouço.' },
  { id: 32, channel: 'A', bloco: 'Comunicação',
    texto: 'Costumo notar quando alguém fala muito rápido, muito alto, ou quando alguém escolhe palavras erradas ao tentar se expressar.' },
  { id: 33, channel: 'S', bloco: 'Comunicação',
    texto: 'Quando uma conversa é importante, prefiro ter ela ao vivo e olhando para a pessoa, sinto que falta algo nas trocas só por texto.' },

  // Decisão (extras)
  { id: 34, channel: 'V', bloco: 'Decisão',
    texto: 'Antes de comprar algo pela internet, preciso ver várias fotos do produto em ângulos diferentes para me sentir seguro(a) na decisão.' },
  { id: 35, channel: 'A', bloco: 'Decisão',
    texto: 'Quando estou em dúvida sobre algo importante, gosto de conversar com alguém de confiança para "escutar" os argumentos em voz alta.' },
  { id: 36, channel: 'S', bloco: 'Decisão',
    texto: 'Costumo decidir muito por "feeling": se algo me dá um aperto no estômago ou uma sensação ruim, eu desisto, mesmo sem motivo lógico.' },

  // Aprendizado (extras)
  { id: 37, channel: 'V', bloco: 'Aprendizado',
    texto: 'Em um curso ou treinamento, fico mais atento(a) quando o instrutor usa imagens, vídeos curtos ou demonstrações na tela.' },
  { id: 38, channel: 'A', bloco: 'Aprendizado',
    texto: 'Quando preciso decorar algo, repito as informações em voz alta para mim mesmo(a) ou crio uma musiquinha mental para fixar.' },
  { id: 39, channel: 'S', bloco: 'Aprendizado',
    texto: 'Treinamentos teóricos demais me dão sono. Eu só aprendo de verdade quando consigo praticar e errar fazendo.' },

  // Estresse (extras)
  { id: 40, channel: 'V', bloco: 'Estresse',
    texto: 'Quando estou sobrecarregado(a), sinto necessidade de organizar tudo o que está na minha frente: a mesa, os arquivos, a tela do celular.' },
  { id: 41, channel: 'A', bloco: 'Estresse',
    texto: 'Em momentos de pressão extrema, busco um lugar silencioso para conseguir pensar com clareza.' },
  { id: 42, channel: 'S', bloco: 'Estresse',
    texto: 'Quando estou nervoso(a), preciso me mexer (andar, mexer a perna, balançar a caneta) para descarregar a tensão do corpo.' },

  // Relacionamentos (extras)
  { id: 43, channel: 'V', bloco: 'Relacionamentos',
    texto: 'Reparo bastante na linguagem corporal das pessoas: postura, expressão facial e onde elas estão olhando enquanto conversamos.' },
  { id: 44, channel: 'A', bloco: 'Relacionamentos',
    texto: 'Uma das coisas que mais me marca em alguém é o jeito da pessoa rir ou o timbre da voz que ela tem.' },
  { id: 45, channel: 'S', bloco: 'Relacionamentos',
    texto: 'Tenho facilidade para perceber a "energia" de uma pessoa quando ela entra em um ambiente, antes mesmo de a gente conversar.' },

  // Lazer (extras)
  { id: 46, channel: 'V', bloco: 'Lazer',
    texto: 'Tenho prazer em colecionar imagens bonitas (no Pinterest, Instagram, em livros de arte) ou em organizar a decoração da casa.' },
  { id: 47, channel: 'A', bloco: 'Lazer',
    texto: 'Música é uma parte essencial do meu dia. Tenho playlists específicas para cada estado de espírito.' },
  { id: 48, channel: 'S', bloco: 'Lazer',
    texto: 'Para me sentir realmente bem, preciso ter feito alguma atividade física, contato com a natureza ou um momento de prazer corporal no dia.' },

  // Pensamento (extras)
  { id: 49, channel: 'V', bloco: 'Pensamento',
    texto: 'Quando tenho uma ideia nova, instintivamente pego um papel e começo a desenhar diagramas ou rabiscar fluxos pra organizar o raciocínio.' },
  { id: 50, channel: 'A', bloco: 'Pensamento',
    texto: 'Penso melhor quando estou caminhando e falando sozinho(a), ou gravando áudios de voz para mim mesmo(a).' },
  { id: 51, channel: 'S', bloco: 'Pensamento',
    texto: 'Costumo "perceber" antes de "entender": a sensação chega primeiro e só depois eu coloco em palavras o que estou sentindo.' },

  // Reuniões (extras)
  { id: 52, channel: 'V', bloco: 'Reuniões',
    texto: 'Em uma reunião online, ligo a câmera mesmo quando não preciso, porque ver o rosto dos outros me deixa mais conectado(a).' },
  { id: 53, channel: 'A', bloco: 'Reuniões',
    texto: 'Reuniões longas só ganhando-me se houver troca de ideias falada. Apresentações de slides em silêncio me desligam rapidamente.' },
  { id: 54, channel: 'S', bloco: 'Reuniões',
    texto: 'Numa reunião presencial, percebo nitidamente se há tensão no ambiente antes mesmo de alguém começar a falar.' },

  // Conteúdo (extras)
  { id: 55, channel: 'V', bloco: 'Conteúdo',
    texto: 'Em vídeos longos, costumo aumentar a velocidade da fala para conseguir "ler" o conteúdo na velocidade do meu pensamento visual.' },
  { id: 56, channel: 'A', bloco: 'Conteúdo',
    texto: 'Tenho preferência por podcasts e audiobooks, e geralmente ouço enquanto faço outra coisa (caminhar, dirigir, cozinhar).' },
  { id: 57, channel: 'S', bloco: 'Conteúdo',
    texto: 'Livros que descrevem cheiros, texturas, temperaturas e sensações físicas me prendem muito mais do que livros muito teóricos.' },

  // Distração (extras)
  { id: 58, channel: 'V', bloco: 'Distração',
    texto: 'Se a tela do meu computador estiver com 20 abas abertas e várias notificações, sinto que perco totalmente o foco visualmente.' },
  { id: 59, channel: 'A', bloco: 'Distração',
    texto: 'Preciso de fones de ouvido com cancelamento de ruído ou um ambiente silencioso para conseguir entrar em estado de concentração profunda.' },
  { id: 60, channel: 'S', bloco: 'Distração',
    texto: 'Quando estou com o corpo desconfortável (sentado errado, com sede, com calor), não consigo render nem 30% do meu potencial.' },
]

// Helpers para o engine

export function getVacQuestionsByChannel(channel: VacChannel): VacQuestion[] {
  return VAC_QUESTIONS.filter(q => q.channel === channel)
}

export const VAC_TOTAL_QUESTIONS = VAC_QUESTIONS.length
export const VAC_PER_CHANNEL = VAC_QUESTIONS.length / 3 // 20

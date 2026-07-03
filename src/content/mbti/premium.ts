// ============================================================
// Relatório Premium — MBTI (16 tipos)
// Foco: Processamento de Informação e Decisão (cognição).
// Estrutura específica:
//   - Funções Cognitivas (Ni/Ne/Si/Se/Ti/Te/Fi/Fe)
//   - Carreiras Ideais com bandas salariais
//   - Compatibilidade comunicacional com outros tipos
// ============================================================

export type MbtiType =
  | 'INTJ'|'INTP'|'ENTJ'|'ENTP'
  | 'INFJ'|'INFP'|'ENFJ'|'ENFP'
  | 'ISTJ'|'ISFJ'|'ESTJ'|'ESFJ'
  | 'ISTP'|'ISFP'|'ESTP'|'ESFP'

export type CognitiveFunction =
  | 'Ni'|'Ne'|'Si'|'Se'|'Ti'|'Te'|'Fi'|'Fe'

export interface MbtiPremium {
  type: MbtiType
  archetype: string                          // "Estrategista" etc
  pitch: string
  paletteHex: string

  cognition: {
    stack: [CognitiveFunction, CognitiveFunction, CognitiveFunction, CognitiveFunction]
    explanation: string                      // como o cérebro processa
    decisionRule: string                     // como decide na prática
  }

  careers: {
    summary: string
    matches: Array<{
      role:        string
      whyFits:     string
      bandBrlMonthly: string                 // ex: "R$ 12k–28k"
      caveat:      string                    // o ponto cego no cargo
    }>
    avoid: string[]
  }

  relationships: {
    bestMatchFor: 'communication' | 'romance' | 'team'  // contexto
    pairings: Array<{
      withType: MbtiType
      dynamic:  string
      script:   string                       // como o usuário deve falar com aquele tipo
    }>
  }

  pdi21Days: Array<{ day: number; focus: string; task: string }>
}

// ──────────────────────────────────────────────────────────
// INTJ — O ESTRATEGISTA
// ──────────────────────────────────────────────────────────
export const intjPremium: MbtiPremium = {
  type: 'INTJ',
  archetype: 'O Estrategista',
  pitch: 'Você joga xadrez 4 movimentos à frente. O preço é viver no futuro enquanto a vida acontece no presente. Aqui você reaprende presença sem perder visão.',
  paletteHex: '#3a4f8c',

  cognition: {
    stack: ['Ni','Te','Fi','Se'],
    explanation:
      'Sua função dominante é Ni (Intuição Introvertida): você sintetiza padrões em visões de longo prazo. Te (Pensamento Extrovertido) executa essas visões em sistemas. Fi (Sentimento Introvertido) é seu termômetro de valor pessoal. Se (Sensação Extrovertida) é sua função inferior, onde você desliga: presente sensorial, prazer físico, espontaneidade.',
    decisionRule:
      'Você decide pela visão (Ni) e racionaliza pela eficiência (Te). Ignora o impacto emocional imediato (Fi virada para dentro) e sub-experiencia o presente (Se inferior). Resultado: decisões brilhantes a longo prazo, frias no curto.',
  },

  careers: {
    summary:
      'INTJ ganha onde estratégia abstrata vira sistema executável. Perde em ambiente operacional puro ou em vendas relacionais.',
    matches: [
      { role: 'CTO / Diretor de Engenharia', whyFits: 'Visão técnica + execução sistemática.', bandBrlMonthly: 'R$ 25k–60k+', caveat: 'Cuidado com isolamento: o cargo exige liderar humanos, não só código.' },
      { role: 'Estrategista de Negócio',    whyFits: 'Antecipa cenários e desenha rota.',     bandBrlMonthly: 'R$ 15k–40k',   caveat: 'Equipe pode te achar distante. Faça 1:1 ritualizado.' },
      { role: 'Cientista de Dados Sênior',  whyFits: 'Extrair padrão de complexidade é seu jogo.', bandBrlMonthly: 'R$ 14k–32k', caveat: 'Não fique só no notebook. Suba no púlpito a cada trimestre.' },
      { role: 'Empreendedor SaaS B2B',      whyFits: 'Visão + sistema + paciência longa.',    bandBrlMonthly: 'Variável (R$ 0 a infinito)', caveat: 'Vendas iniciais matam INTJ: terceirize ou contrate INFJ/ENTP.' },
    ],
    avoid: [
      'Vendas porta-a-porta (alta exigência social/emocional)',
      'Atendimento ao cliente em linha de frente',
      'Funções operacionais 100% repetitivas sem horizonte de melhoria',
    ],
  },

  relationships: {
    bestMatchFor: 'communication',
    pairings: [
      {
        withType: 'ENFP',
        dynamic: 'Visão se encontra com possibilidade. ENFP energiza o INTJ; INTJ aterra o ENFP. Risco: INTJ acha ENFP "disperso", ENFP acha INTJ "frio".',
        script: 'Para falar com ENFP: comece com a visão (não o plano). "Imagina se a gente conseguisse X". Depois aterra com 2 passos.',
      },
      {
        withType: 'ESFJ',
        dynamic: 'Polos opostos. ESFJ vive no presente social, INTJ no futuro abstrato. Conflito comum: você "esquece" aniversário; ele(a) sente desamor.',
        script: 'Para ESFJ: agende lembretes de gestos pequenos. "Lembrei de você porque…" funciona mais que jantar caro 1x ao ano.',
      },
      {
        withType: 'ISTP',
        dynamic: 'Ambos pragmáticos, ambos calados. Ótimo trabalho em projetos técnicos. Risco: relação fica fria sem conversa intencional.',
        script: 'Para ISTP: vá direto ao problema, sem teoria. "Aqui o problema. Aqui 2 caminhos. Qual escolhe?". Ele responde rápido.',
      },
      {
        withType: 'ENTJ',
        dynamic: 'Dois generais na mesma sala. Excelente em executar visão. Risco: briga por controle.',
        script: 'Para ENTJ: cheguem em acordo antes da reunião externa. Em público, mostrem alinhados. Privado, briguem à vontade.',
      },
    ],
  },

  pdi21Days: [
    { day: 1, focus: 'Se inferior', task: 'Coma uma refeição em 30 min sem celular. Note 5 sabores.' },
    { day: 2, focus: 'Fe ausente',   task: 'Pergunte a 1 pessoa: "como você está?" e fique 5 min ouvindo. Sem dar conselho.' },
    { day: 3, focus: 'Presença',     task: 'Caminhada de 25 min no bairro. Conte quantas árvores diferentes vê.' },
    { day: 4, focus: 'Te disciplina', task: 'Bloqueie 90 min de trabalho profundo no projeto mais importante.' },
    { day: 5, focus: 'Fi',            task: 'Escreva: "quais valores eu negocio sem perceber para entregar resultado?"' },
    { day: 6, focus: 'Reflexão',      task: 'Diário 5 linhas: como o presente foi diferente esta semana?' },
    { day: 7, focus: 'Off',           task: 'Domingo SEM planejar nada.' },
    // … expanda até 21
  ],
}

// ──────────────────────────────────────────────────────────
// INTP — O LÓGICO
// ──────────────────────────────────────────────────────────
export const intpPremium: MbtiPremium = {
  type: 'INTP',
  archetype: 'O Lógico',
  pitch: 'Sua mente é uma biblioteca infinita. Você só precisa abrir uma porta e usar.',
  paletteHex: '#3a4f8c',

  cognition: {
    stack: ['Ti','Ne','Si','Fe'],
    explanation:
      'Sua dominante é Ti (Pensamento Introvertido): você constrói modelos internos de como tudo funciona e testa cada ideia contra eles. Ne (Intuição Extrovertida) alimenta esses modelos com possibilidades infinitas. Si (Sensação Introvertida) arquiva dados e precedentes. Fe (Sentimento Extrovertido) é sua inferior: harmonia social e expressão emocional são o terreno onde você trava.',
    decisionRule:
      'Você decide quando o modelo interno fecha logicamente, o que pode demorar para sempre, porque Ne segue abrindo exceções. Resultado: análises impecáveis engavetadas e um "deixa eu só verificar mais uma coisa" crônico. Sua alavanca: prazo externo definido por outra pessoa.',
  },

  careers: {
    summary:
      'INTP prospera onde o problema é difícil e o cronograma respeita profundidade. Sofre em ambiente político, de vendas emocionais ou de processo engessado.',
    matches: [
      { role: 'Arquiteto de Software',        whyFits: 'Modelar sistemas complexos do zero é literalmente sua cognição em cargo.', bandBrlMonthly: 'R$ 18k–40k', caveat: 'Documentar e comunicar a arquitetura é metade do cargo. Não pule.' },
      { role: 'Pesquisador / P&D',            whyFits: 'Pergunta aberta + liberdade de método = INTP em êxtase.', bandBrlMonthly: 'R$ 8k–25k', caveat: 'Publicar o incompleto dói, mas ciência sem publicação não existe.' },
      { role: 'Analista de Segurança / Perito', whyFits: 'Desmontar sistemas e achar a falha que ninguém viu.', bandBrlMonthly: 'R$ 12k–30k', caveat: 'Relatório para leigos é parte do jogo. Traduza o técnico.' },
      { role: 'Consultor Especialista',        whyFits: 'Profundidade rara vira honorário alto.', bandBrlMonthly: 'R$ 10k–35k', caveat: 'Consultoria exige vender a si mesmo. Prepare 3 frases de pitch e ensaie.' },
    ],
    avoid: [
      'Gestão de pessoas em larga escala (drena Fe inferior diariamente)',
      'Telemarketing e vendas de pressão',
      'Operação repetitiva com supervisão constante',
    ],
  },

  relationships: {
    bestMatchFor: 'communication',
    pairings: [
      {
        withType: 'ENTJ',
        dynamic: 'ENTJ pega sua análise perfeita e a coloca no mundo. Você fornece profundidade; ele fornece prazo. Risco: você sente que ele atropela nuances.',
        script: 'Para ENTJ: entregue a conclusão PRIMEIRO, depois ofereça o raciocínio. "Recomendo X. Quer ver os 3 motivos?". Nunca comece pelo motivo 1.',
      },
      {
        withType: 'ESFJ',
        dynamic: 'Seu oposto funcional. ESFJ lê pessoas como você lê sistemas. Pode ser sua melhor escola de Fe, ou fonte infinita de "você não demonstra afeto".',
        script: 'Para ESFJ: valide o sentimento antes de corrigir o fato. "Entendo que isso te chateou" vem ANTES de "mas tecnicamente…". Na dúvida, corte o "tecnicamente".',
      },
      {
        withType: 'INFJ',
        dynamic: 'Conversas de 4 horas que parecem 20 minutos. INFJ dá direção humana às suas ideias. Risco: dois introvertidos adiando conflito até virar distância.',
        script: 'Para INFJ: nomeie o clima, não só o conteúdo. "Senti que aquela conversa te incomodou, quer falar?". Ele espera ser percebido sem pedir.',
      },
    ],
  },

  pdi21Days: [
    { day: 1, focus: 'Entrega',     task: 'Termine e ENTREGUE hoje algo a 80%. Anote que o mundo não acabou.' },
    { day: 2, focus: 'Fe inferior', task: 'Faça 1 pergunta pessoal genuína a alguém e escute sem analisar a resposta.' },
    { day: 3, focus: 'Prazo',       task: 'Defina prazo com hora para a decisão que você adia. Conte a alguém.' },
    { day: 4, focus: 'Corpo',       task: '30 min de exercício físico. A mente destrava quando o corpo se move.' },
    { day: 5, focus: 'Expressão',   task: 'Explique sua ideia atual em 5 frases para um leigo. Sem jargão.' },
    { day: 6, focus: 'Reflexão',    task: 'Diário: "que análise estou usando como esconderijo da ação?"' },
    { day: 7, focus: 'Off',         task: 'Um dia de curiosidade livre, sem transformar nada em projeto.' },
    // … expanda até 21
  ],
}

// ──────────────────────────────────────────────────────────
// ENTJ — O COMANDANTE
// ──────────────────────────────────────────────────────────
export const entjPremium: MbtiPremium = {
  type: 'ENTJ',
  archetype: 'O Comandante',
  pitch: 'Liderar é instintivo. Servir é a próxima fronteira.',
  paletteHex: '#8c2f17',

  cognition: {
    stack: ['Te','Ni','Se','Fi'],
    explanation:
      'Sua dominante é Te (Pensamento Extrovertido): organizar o mundo externo em metas, métricas e resultados. Ni (Intuição Introvertida) fornece a visão de longo prazo por trás das metas. Se (Sensação Extrovertida) te dá presença e leitura rápida do campo. Fi (Sentimento Introvertido) é sua inferior: seus próprios sentimentos e valores íntimos são o continente inexplorado.',
    decisionRule:
      'Você decide rápido pelo resultado mensurável e mobiliza gente para executar. O ponto cego: atropelar o custo emocional (seu e dos outros) porque Fi inferior não aparece no dashboard. Sob pressão extrema, explosões de emoção crua que surpreendem até você.',
  },

  careers: {
    summary:
      'ENTJ nasce para o comando de estruturas: quanto maior o desafio organizacional, melhor. Definha como subordinado de líder fraco ou em cargo sem autonomia.',
    matches: [
      { role: 'CEO / Diretor Geral',          whyFits: 'Visão + execução + apetite por decisão difícil.', bandBrlMonthly: 'R$ 35k–100k+', caveat: 'O cargo cobra escuta. Um conselheiro que te confronte vale ouro.' },
      { role: 'Diretor Comercial',            whyFits: 'Meta agressiva é seu esporte favorito.', bandBrlMonthly: 'R$ 20k–60k', caveat: 'Time de vendas precisa de moral, não só cobrança. Celebre no meio do caminho.' },
      { role: 'Empreendedor / Fundador',      whyFits: 'Construir império do zero exige exatamente seu stack.', bandBrlMonthly: 'Variável (R$ 0 a infinito)', caveat: 'Sócio complementar (INFP/ISFJ) evita que a cultura vire moedor.' },
      { role: 'Gerente de Projetos Complexos', whyFits: 'Ordem no caos, prazo no impossível.', bandBrlMonthly: 'R$ 15k–35k', caveat: 'Nem todo atraso é incompetência. Diagnostique antes de cortar cabeça.' },
    ],
    avoid: [
      'Cargos de execução sem voz na estratégia',
      'Ambientes onde consenso vale mais que resultado (você vai explodir)',
      'Funções de cuidado contínuo sem meta (drena sem devolver)',
    ],
  },

  relationships: {
    bestMatchFor: 'communication',
    pairings: [
      {
        withType: 'INFP',
        dynamic: 'Seu oposto exato. INFP enxerga o mundo interno que você ignora. Pode ser o encontro que te humaniza ou uma guerra de "insensível" contra "sonhador".',
        script: 'Para INFP: pergunte "o que você sente sobre isso?" e AGUENTE o silêncio até a resposta vir. Não ofereça solução nos primeiros 10 minutos.',
      },
      {
        withType: 'INTP',
        dynamic: 'Ele desmonta seu plano e mostra as falhas antes do mercado mostrar. Irritante e valiosíssimo. Risco: você o atropela e perde a melhor análise da sala.',
        script: 'Para INTP: dê o problema, não a ordem. "Esse plano tem furo? Me prove que sim". Ele trabalha por desafio, não por comando.',
      },
      {
        withType: 'ESFP',
        dynamic: 'Ele traz leveza e presente ao seu tanque de guerra. Ótimo para clima de time. Risco: você o classifica como "não sério" e perde o termômetro social que ele é.',
        script: 'Para ESFP: reconheça em público, corrija em particular, e participe da celebração de vez em quando. Presença compra lealdade.',
      },
    ],
  },

  pdi21Days: [
    { day: 1, focus: 'Fi inferior', task: 'Complete no papel: "hoje eu senti…" com 3 emoções específicas. Não "estresse".' },
    { day: 2, focus: 'Escuta',      task: 'Em 1 reunião, fale por ÚLTIMO. Anote o que descobriu ouvindo.' },
    { day: 3, focus: 'Servir',      task: 'Pergunte a 1 liderado: "o que eu posso tirar do seu caminho?" e tire.' },
    { day: 4, focus: 'Pausa',       task: 'Nenhuma decisão importante hoje antes de 10 min de silêncio.' },
    { day: 5, focus: 'Vínculo',     task: 'Um almoço ou café sem pauta com alguém do time. Proibido falar de meta.' },
    { day: 6, focus: 'Reflexão',    task: 'Diário: "que vitória custou caro demais em pessoas? o que faria diferente?"' },
    { day: 7, focus: 'Off',         task: 'Um dia sem comandar nada nem ninguém. Nem o garçom.' },
    // … expanda até 21
  ],
}

// ──────────────────────────────────────────────────────────
// ENTP — O INOVADOR
// ──────────────────────────────────────────────────────────
export const entpPremium: MbtiPremium = {
  type: 'ENTP',
  archetype: 'O Inovador',
  pitch: 'Você gera 10 ideias por minuto. Termine 1 por mês e o mundo muda.',
  paletteHex: '#d4943a',

  cognition: {
    stack: ['Ne','Ti','Fe','Si'],
    explanation:
      'Sua dominante é Ne (Intuição Extrovertida): ver possibilidades e conexões em tudo, o tempo todo. Ti (Pensamento Introvertido) filtra e estrutura as melhores. Fe (Sentimento Extrovertido) te faz carismático e leitor de plateia. Si (Sensação Introvertida) é sua inferior: rotina, detalhe, manutenção e memória do combinado são seu calcanhar.',
    decisionRule:
      'Você decide pelo potencial e pela elegância do argumento, muitas vezes no meio do próprio debate. O ponto cego: o custo de manutenção. Você assina pelo lançamento e esquece que existe a segunda-feira seguinte. Sua alavanca: um sócio ou processo que segure o "depois".',
  },

  careers: {
    summary:
      'ENTP brilha no zero-a-um: criar, vender a visão, destravar o impossível na lábia e na engenhosidade. Apodrece no um-a-cem operacional.',
    matches: [
      { role: 'Fundador / Co-fundador',       whyFits: 'Início de empresa é 100% Ne: pivotar, convencer, improvisar.', bandBrlMonthly: 'Variável (R$ 0 a infinito)', caveat: 'Contrate cedo quem ame processo (ISTJ/ESTJ) ou a empresa morre de desorganização.' },
      { role: 'Diretor de Inovação / Novos Negócios', whyFits: 'Cargo cuja meta é literalmente ter ideias e testá-las.', bandBrlMonthly: 'R$ 18k–45k', caveat: 'Inovação sem métrica vira teatro. Amarre cada ideia a um número.' },
      { role: 'Publicitário / Criativo Sênior', whyFits: 'Conceito novo sob pressão de prazo: seu habitat.', bandBrlMonthly: 'R$ 10k–30k', caveat: 'O cliente compra a 3ª melhor ideia. Aprenda a soltar a favorita.' },
      { role: 'Advogado de Estratégia / Negociador', whyFits: 'Debater é seu cardio. Achar a brecha, sua arte.', bandBrlMonthly: 'R$ 15k–50k', caveat: 'Processos exigem Si: diligência de detalhe. Tenha um revisor obsessivo.' },
    ],
    avoid: [
      'Compliance e auditoria de rotina',
      'Operação de processos imutáveis',
      'Qualquer cargo onde "sempre foi assim" encerra a conversa',
    ],
  },

  relationships: {
    bestMatchFor: 'communication',
    pairings: [
      {
        withType: 'ISFJ',
        dynamic: 'Seu oposto funcional. Ele cuida do concreto que você esquece e lembra do aniversário que você perdeu. Risco: você o vê como freio; ele te vê como furacão.',
        script: 'Para ISFJ: avise mudanças com antecedência e agradeça o cuidado invisível NOMINALMENTE. "Vi que você preparou X, isso me ajudou muito".',
      },
      {
        withType: 'INTJ',
        dynamic: 'Ele transforma seu fogo de artifício em plano de 5 anos. Dupla temível. Risco: ele fecha a questão enquanto você ainda quer debater possibilidades.',
        script: 'Para INTJ: traga 3 opções filtradas, não 15 cruas. Ele valoriza que o Ti já tenha passado a peneira antes da conversa.',
      },
      {
        withType: 'ENFJ',
        dynamic: 'Carisma + carisma. Ele orquestra as pessoas que sua ideia precisa. Risco: dois quereres de plateia disputando o palco.',
        script: 'Para ENFJ: divida o crédito em público sem ele pedir. Alimente o vínculo antes de pedir o favor.',
      },
    ],
  },

  pdi21Days: [
    { day: 1, focus: 'Conclusão',   task: 'Escolha 1 projeto inacabado e trabalhe SÓ nele por 90 min.' },
    { day: 2, focus: 'Si inferior', task: 'Cumpra 3 combinados pequenos de hoje exatamente como prometido.' },
    { day: 3, focus: 'Escuta',      task: 'Num debate hoje, defenda com sinceridade o lado do outro por 5 min.' },
    { day: 4, focus: 'Rotina',      task: 'Execute uma rotina chata (planilha, e-mail, fatura) na primeira hora do dia.' },
    { day: 5, focus: 'Funil',       task: 'Liste suas 10 ideias atuais. Mate 8 por escrito. Fique com 2.' },
    { day: 6, focus: 'Reflexão',    task: 'Diário: "que promessa empolgada desta semana eu já abandonei?"' },
    { day: 7, focus: 'Off',         task: 'Um dia sem começar NADA novo.' },
    // … expanda até 21
  ],
}

// ──────────────────────────────────────────────────────────
// INFJ — O CONSELHEIRO
// ──────────────────────────────────────────────────────────
export const infjPremium: MbtiPremium = {
  type: 'INFJ',
  archetype: 'O Conselheiro',
  pitch: 'Você sente o que outros mal entendem. Aprenda a se proteger sem se isolar.',
  paletteHex: '#8c4b8c',

  cognition: {
    stack: ['Ni','Fe','Ti','Se'],
    explanation:
      'Sua dominante é Ni (Intuição Introvertida): sínteses profundas que chegam prontas, como "saber sem saber como". Fe (Sentimento Extrovertido) te sintoniza com a emoção do ambiente antes de qualquer palavra. Ti (Pensamento Introvertido) estrutura seus insights. Se (Sensação Extrovertida) é sua inferior: o corpo e o presente são o que você mais negligencia, até o famoso colapso por esgotamento.',
    decisionRule:
      'Você decide pelo insight (Ni) validado pelo impacto nas pessoas (Fe). O ponto cego: você absorve a emoção alheia como dado e esquece de perguntar o que VOCÊ quer. Acumula silenciosamente até a "porta batida do INFJ": o corte definitivo e sem aviso.',
  },

  careers: {
    summary:
      'INFJ floresce onde profundidade humana encontra propósito: desenvolver, aconselhar, escrever, desenhar futuros. Murcha em ambiente hostil, barulhento ou moralmente conflitado.',
    matches: [
      { role: 'Psicólogo / Terapeuta',        whyFits: 'Ler o não-dito e devolver sentido: seu dom em profissão.', bandBrlMonthly: 'R$ 6k–25k', caveat: 'Supervisão e terapia própria são obrigatórias, ou você leva as dores para casa.' },
      { role: 'Gestor de Pessoas / DHO',      whyFits: 'Desenvolver gente com visão de longo prazo.', bandBrlMonthly: 'R$ 12k–30k', caveat: 'RH também demite. Prepare-se para as decisões duras do cargo.' },
      { role: 'Escritor / Roteirista',        whyFits: 'Traduzir o invisível em narrativa é Ni+Fe puro.', bandBrlMonthly: 'R$ 4k–20k (variável)', caveat: 'Publicar exige aparecer. O livro na gaveta não transforma ninguém.' },
      { role: 'Consultor de Cultura Organizacional', whyFits: 'Diagnosticar o clima que ninguém verbaliza.', bandBrlMonthly: 'R$ 10k–28k', caveat: 'Cobre pelo valor do diagnóstico, não pelas horas. Você entrega em 1 reunião o que outros levam meses.' },
    ],
    avoid: [
      'Vendas de alta pressão com metas diárias',
      'Ambientes de conflito aberto constante (pregão, chão de operação hostil)',
      'Cargos que exigem violar seus valores "só dessa vez"',
    ],
  },

  relationships: {
    bestMatchFor: 'communication',
    pairings: [
      {
        withType: 'ENTP',
        dynamic: 'Ele te tira da caverna e te faz rir do que você dramatiza. Você dá alma às ideias dele. Risco: o debate dele fere onde você leva tudo a fundo.',
        script: 'Para ENTP: diga "isso para mim não é debate, é sério" quando for. Ele muda de marcha na hora, mas precisa da placa.',
      },
      {
        withType: 'ESTP',
        dynamic: 'Seu oposto funcional. Ele vive no corpo e no agora que você evita. Pode ser sua melhor medicina de Se ou puro atrito.',
        script: 'Para ESTP: menos contexto, mais ação compartilhada. Convide para FAZER algo junto; a conversa profunda acontece durante, não antes.',
      },
      {
        withType: 'INFP',
        dynamic: 'Almas parecidas com motores diferentes: você organiza o mundo emocional dos outros, ele defende o próprio. Compreensão quase telepática. Risco: dois oceanos de sentimento sem ninguém no leme prático.',
        script: 'Para INFP: respeite o valor dele mesmo quando "ineficiente". Pergunte "isso fere algo importante para você?" antes de propor o atalho.',
      },
    ],
  },

  pdi21Days: [
    { day: 1, focus: 'Se inferior', task: '20 min de atividade física com atenção no corpo, não nos pensamentos.' },
    { day: 2, focus: 'Limite',      task: 'Diga 1 "não" hoje sem justificativa de 3 parágrafos. "Não consigo" basta.' },
    { day: 3, focus: 'Eu primeiro', task: 'Responda por escrito: "o que EU quero nesta situação?" antes de pensar nos outros.' },
    { day: 4, focus: 'Expressar',   task: 'Conte a 1 pessoa segura um incômodo ANTES de ele virar mágoa acumulada.' },
    { day: 5, focus: 'Presente',    task: 'Refeição inteira saboreando, sem análise, sem futuro, sem celular.' },
    { day: 6, focus: 'Reflexão',    task: 'Diário: "quem está drenando mais do que devolve? qual o meu papel nisso?"' },
    { day: 7, focus: 'Off',         task: 'Solitude restauradora sem culpa: seu dia de recarga é necessidade, não frescura.' },
    // … expanda até 21
  ],
}

// ──────────────────────────────────────────────────────────
// INFP — O IDEALISTA
// ──────────────────────────────────────────────────────────
export const infpPremium: MbtiPremium = {
  type: 'INFP',
  archetype: 'O Idealista',
  pitch: 'Sua sensibilidade é dom. Hora de torná-la útil ao mundo.',
  paletteHex: '#a8522e',

  cognition: {
    stack: ['Fi','Ne','Si','Te'],
    explanation:
      'Sua dominante é Fi (Sentimento Introvertido): uma bússola de valores íntima, silenciosa e inegociável. Ne (Intuição Extrovertida) imagina mundos possíveis alinhados a ela. Si (Sensação Introvertida) guarda memórias com carga afetiva enorme. Te (Pensamento Extrovertido) é sua inferior: organizar, cobrar, executar e impor estrutura é o que mais custa.',
    decisionRule:
      'Você decide pelo alinhamento com seus valores, mesmo quando não sabe explicá-los. O ponto cego: adiar infinitamente o que é "burocrático" e sofrer paralisia quando duas coisas importantes conflitam. Sob estresse, o Te inferior explode em crítica ríspida e perfeccionismo punitivo, contra os outros e contra você.',
  },

  careers: {
    summary:
      'INFP rende onde autenticidade e significado são matéria-prima: criar, cuidar, escrever, defender causas. Definha em ambientes cínicos ou de meta fria.',
    matches: [
      { role: 'Redator / Escritor Criativo',  whyFits: 'Transformar sentimento em palavra que toca é Fi+Ne aplicado.', bandBrlMonthly: 'R$ 4k–18k', caveat: 'Escrever sob encomenda de marca exige separar "eu" da obra. Nem todo texto é sua alma.' },
      { role: 'Designer / Ilustrador',        whyFits: 'Estética com significado, trabalho profundo e autônomo.', bandBrlMonthly: 'R$ 5k–20k', caveat: 'Precificar é Te: cobre pelo valor, não pela culpa. Tabele antes da paixão falar.' },
      { role: 'Psicólogo / Orientador',       whyFits: 'Escuta profunda sem julgamento é seu estado natural.', bandBrlMonthly: 'R$ 6k–22k', caveat: 'Limite terapêutico protege você. Você não é a última esperança de ninguém.' },
      { role: 'Terceiro Setor / Impacto Social', whyFits: 'Trabalhar POR algo, não só por salário.', bandBrlMonthly: 'R$ 5k–15k', caveat: 'ONGs também têm política e planilha. Idealismo sem gestão frustra em dobro.' },
    ],
    avoid: [
      'Cobrança e recuperação de crédito',
      'Vendas agressivas de produto em que você não acredita',
      'Ambientes onde ironia e competição interna são a cultura',
    ],
  },

  relationships: {
    bestMatchFor: 'communication',
    pairings: [
      {
        withType: 'ENTJ',
        dynamic: 'Seu oposto exato. Ele constrói no mundo externo o que você sonha no interno. Pode ser a parceria mais completa ou a mais dolorosa: depende de tradução.',
        script: 'Para ENTJ: transforme o sentimento em dado. "Isso me desmotiva, e desmotivado eu rendo 50%" chega onde "isso me magoa" não chega.',
      },
      {
        withType: 'ENFJ',
        dynamic: 'Ele te puxa para o mundo com calor e sem violência. Você o lembra de que ele também tem necessidades. Dupla afetiva poderosa. Risco: ele decide "pelo seu bem" sem perguntar.',
        script: 'Para ENFJ: agradeça o cuidado E marque o limite: "eu amo que você cuide, e preciso decidir essa parte sozinho".',
      },
      {
        withType: 'ISTJ',
        dynamic: 'Ele dá chão, rotina e constância ao seu mundo flutuante. Você dá cor e sentido ao dele. Risco: ele lê seu processo emocional como drama; você lê a praticidade dele como frieza.',
        script: 'Para ISTJ: peça o que precisa em termos concretos e com prazo. "Preciso que você me escute 10 min hoje sem resolver nada" funciona.',
      },
    ],
  },

  pdi21Days: [
    { day: 1, focus: 'Te inferior', task: 'Resolva HOJE a pendência burocrática mais antiga. 1 hora, cronômetro ligado.' },
    { day: 2, focus: 'Voz',         task: 'Expresse 1 discordância em voz alta no momento em que ela surgir.' },
    { day: 3, focus: 'Concreto',    task: 'Transforme 1 sonho em 3 passos com data. Escreva e cole na parede.' },
    { day: 4, focus: 'Limite',      task: 'Identifique onde você diz sim por culpa. Desfaça 1 desses sins.' },
    { day: 5, focus: 'Valor',       task: 'Cobre (ou precifique) algo seu pelo valor justo. Sem desconto preventivo.' },
    { day: 6, focus: 'Reflexão',    task: 'Diário: "que ideal estou usando para não agir no real?"' },
    { day: 7, focus: 'Off',         task: 'Crie algo só para você, sem plateia e sem utilidade. Puro Fi.' },
    // … expanda até 21
  ],
}

// ──────────────────────────────────────────────────────────
// ENFJ — O PROTAGONISTA
// ──────────────────────────────────────────────────────────
export const enfjPremium: MbtiPremium = {
  type: 'ENFJ',
  archetype: 'O Protagonista',
  pitch: 'Liderar pessoas é vocação. Cuidado com a auto-negligência.',
  paletteHex: '#c4633a',

  cognition: {
    stack: ['Fe','Ni','Se','Ti'],
    explanation:
      'Sua dominante é Fe (Sentimento Extrovertido): você sente a temperatura emocional da sala em segundos e ajusta o ambiente para as pessoas florescerem. Ni (Intuição Introvertida) enxerga o potencial de cada um antes deles mesmos. Se (Sensação Extrovertida) te dá presença de palco. Ti (Pensamento Introvertido) é sua inferior: análise fria e crítica lógica do próprio discurso são seu ponto fraco.',
    decisionRule:
      'Você decide pelo que harmoniza e desenvolve o grupo. O ponto cego: suas necessidades entram por último (ou nunca), e você pode manipular sutilmente "pelo bem do outro" sem perceber. Sob estresse, o Ti inferior vira autocrítica obsessiva e paralisia por hiperanálise.',
  },

  careers: {
    summary:
      'ENFJ nasceu para multiplicar gente: ensinar, liderar, inspirar, desenvolver. Sofre em trabalho solitário de longa duração ou onde pessoas são "recurso".',
    matches: [
      { role: 'Diretor de RH / DHO',          whyFits: 'Desenvolver pessoas em escala com visão estratégica.', bandBrlMonthly: 'R$ 18k–45k', caveat: 'Você vai querer salvar todo mundo. Nem todo mundo quer ser salvo.' },
      { role: 'Professor / Educador de Elite', whyFits: 'Sala de aula é seu palco e seu laboratório de potencial humano.', bandBrlMonthly: 'R$ 5k–20k', caveat: 'Burnout docente é real. Sua entrega precisa de teto combinado.' },
      { role: 'Líder de Vendas Consultivas',   whyFits: 'Vender ajudando genuinamente: seu Fe converte sem forçar.', bandBrlMonthly: 'R$ 12k–35k', caveat: 'Aprenda a ouvir "não" sem levar para o pessoal.' },
      { role: 'Palestrante / Facilitador',     whyFits: 'Mover plateias é Fe+Se em estado puro.', bandBrlMonthly: 'R$ 8k–40k (variável)', caveat: 'Palco vicia. Verifique se está servindo à mensagem ou ao aplauso.' },
    ],
    avoid: [
      'Análise de dados solitária em tela o dia todo',
      'Ambientes onde demitir rápido é a principal ferramenta de gestão',
      'Funções sem contato humano significativo',
    ],
  },

  relationships: {
    bestMatchFor: 'communication',
    pairings: [
      {
        withType: 'INFP',
        dynamic: 'Ele é profundidade que você promove; você é a ponte dele com o mundo. Vínculo quente. Risco: você decidir a vida dele "por amor" e ele se calar magoado.',
        script: 'Para INFP: pergunte antes de agir por ele. "Quer ajuda ou quer só que eu escute?" é a chave que abre tudo.',
      },
      {
        withType: 'ISTP',
        dynamic: 'Seu oposto funcional. Ele não precisa (nem quer) do seu cuidado constante, e isso te desconcerta. Ele te ensina desapego; você o ensina vínculo.',
        script: 'Para ISTP: reduza a intensidade em 50% e conecte por atividade prática. Lado a lado funciona; cara a cara intenso, não.',
      },
      {
        withType: 'ENTP',
        dynamic: 'Energia + energia. Ele desafia suas certezas com humor; você dá direção humana ao caos dele. Risco: competição velada por atenção do grupo.',
        script: 'Para ENTP: entre no debate sem se ferir. Para ele, discordar É conexão. Não leve o advogado do diabo para o coração.',
      },
    ],
  },

  pdi21Days: [
    { day: 1, focus: 'Eu primeiro', task: 'Responda por escrito antes de dormir: "o que EU precisei hoje e não pedi?"' },
    { day: 2, focus: 'Limite',      task: 'Recuse 1 pedido de ajuda que caberia a outra pessoa resolver.' },
    { day: 3, focus: 'Ti inferior', task: 'Peça a alguém de confiança 1 crítica ao seu último projeto. Só escute e agradeça.' },
    { day: 4, focus: 'Silêncio',    task: '30 min sozinho sem produzir nada para ninguém. Note o desconforto.' },
    { day: 5, focus: 'Verdade',     task: 'Dê 1 feedback difícil que você vem adoçando para não ferir.' },
    { day: 6, focus: 'Reflexão',    task: 'Diário: "onde estou ajudando para ser amado, e não porque é o certo?"' },
    { day: 7, focus: 'Off',         task: 'Receba cuidado hoje: deixe alguém fazer algo por VOCÊ, sem retribuir na hora.' },
    // … expanda até 21
  ],
}

// ──────────────────────────────────────────────────────────
// ENFP — O INSPIRADOR
// ──────────────────────────────────────────────────────────
export const enfpPremium: MbtiPremium = {
  type: 'ENFP',
  archetype: 'O Inspirador',
  pitch: 'Sua energia incendeia. Disciplina é o cano que leva o fogo até a vela.',
  paletteHex: '#d4943a',

  cognition: {
    stack: ['Ne','Fi','Te','Si'],
    explanation:
      'Sua dominante é Ne (Intuição Extrovertida): possibilidades brotam de tudo que você toca, e pessoas são seu campo favorito de possibilidade. Fi (Sentimento Introvertido) dá o filtro de autenticidade: só vale o que vibra por dentro. Te (Pensamento Extrovertido) organiza quando você deixa. Si (Sensação Introvertida) é sua inferior: rotina, detalhe, corpo e passado são o que você atropela.',
    decisionRule:
      'Você decide pelo entusiasmo autenticado pelo coração (Ne+Fi). O ponto cego: o entusiasmo tem prazo de validade e você assina compromissos no pico dele. Sob estresse, a Si inferior te afunda em ruminação sombria sobre saúde e erros do passado, o oposto do seu normal solar.',
  },

  careers: {
    summary:
      'ENFP rende onde gente + criatividade + variedade se encontram. Morre lentamente em cubículo com tarefa repetitiva e chefe controlador.',
    matches: [
      { role: 'Head de Marketing / Growth',   whyFits: 'Campanha nova, teste novo, história nova: variedade infinita com plateia.', bandBrlMonthly: 'R$ 12k–35k', caveat: 'Growth exige análise fria dos números, não só criatividade. Case com o dashboard.' },
      { role: 'Criador de Conteúdo / Comunicador', whyFits: 'Sua autenticidade magnetiza audiência de verdade.', bandBrlMonthly: 'R$ 3k–50k (variável)', caveat: 'Algoritmo cobra constância, seu ponto fraco. Calendário editorial é inegociável.' },
      { role: 'Recrutador / Employer Branding', whyFits: 'Enxergar potencial em pessoas e conectá-las ao lugar certo.', bandBrlMonthly: 'R$ 7k–20k', caveat: 'Volume de processo exige Si: use checklist religiosamente.' },
      { role: 'Empreendedor Criativo',         whyFits: 'Liberdade + propósito + novidade: a tríade ENFP.', bandBrlMonthly: 'Variável (R$ 0 a infinito)', caveat: 'A empresa precisa do "chato dos processos". Se não for sócio, contrate.' },
    ],
    avoid: [
      'Contabilidade e conferência de rotina',
      'Trabalho isolado sem contato humano por semanas',
      'Estruturas rígidas com microgerenciamento',
    ],
  },

  relationships: {
    bestMatchFor: 'communication',
    pairings: [
      {
        withType: 'INTJ',
        dynamic: 'O clássico dos opostos que funcionam: você traz vida ao castelo dele; ele constrói o castelo para suas ideias morarem. Risco: você sente frieza onde ele sente respeito.',
        script: 'Para INTJ: marque hora para as grandes conversas em vez de emboscar com "precisamos falar". Ele rende infinito com previsibilidade.',
      },
      {
        withType: 'ISTJ',
        dynamic: 'Seu oposto funcional. Ele mantém o mundo de pé enquanto você o reinventa. Pode ser âncora amorosa ou peso, depende do respeito mútuo.',
        script: 'Para ISTJ: cumpra os pequenos combinados (horário, aviso, plano). Cada combinado cumprido compra crédito para seu próximo improviso.',
      },
      {
        withType: 'ENFJ',
        dynamic: 'Fogo + fogo com direção diferente: você inspira possibilidades, ele desenvolve pessoas. Festa garantida. Risco: nenhum dos dois cuida do próprio tanque.',
        script: 'Para ENFJ: pergunte "e VOCÊ, como está?" duas vezes, porque a primeira resposta dele é sempre sobre os outros.',
      },
    ],
  },

  pdi21Days: [
    { day: 1, focus: 'Constância',  task: 'Escolha 1 hábito minúsculo (5 min) e execute hoje no mesmo horário.' },
    { day: 2, focus: 'Si inferior', task: 'Check-up do corpo: água, sono, exame pendente. Agende o que falta.' },
    { day: 3, focus: 'Foco',        task: '90 min num projeto SÓ, celular em outro cômodo. O tédio do meio é a fronteira: atravesse.' },
    { day: 4, focus: 'Promessa',    task: 'Revise o que prometeu esta semana. Cancele formalmente o que não vai cumprir.' },
    { day: 5, focus: 'Profundidade', task: 'Aprofunde 1 relação hoje em vez de animar 10: uma conversa de verdade.' },
    { day: 6, focus: 'Reflexão',    task: 'Diário: "qual projeto merece meus próximos 90 dias inteiros?"' },
    { day: 7, focus: 'Off',         task: 'Descanso de verdade sem virar programa social com 12 pessoas.' },
    // … expanda até 21
  ],
}

// ──────────────────────────────────────────────────────────
// ISTJ — O LOGÍSTICO
// ──────────────────────────────────────────────────────────
export const istjPremium: MbtiPremium = {
  type: 'ISTJ',
  archetype: 'O Logístico',
  pitch: 'Você é a coluna que sustenta. Aprenda a também voar.',
  paletteHex: '#3a6db4',

  cognition: {
    stack: ['Si','Te','Fi','Ne'],
    explanation:
      'Sua dominante é Si (Sensação Introvertida): um arquivo detalhado de experiências que te diz o que funciona e o que já deu errado. Te (Pensamento Extrovertido) transforma isso em processo, ordem e entrega. Fi (Sentimento Introvertido) guarda lealdades profundas e silenciosas. Ne (Intuição Extrovertida) é sua inferior: mudança, ambiguidade e cenários hipotéticos te geram desconforto real.',
    decisionRule:
      'Você decide pelo precedente comprovado e pela regra clara. O ponto cego: rejeitar o novo não porque é ruim, mas porque é novo. Sob estresse, a Ne inferior dispara catastrofização: mil cenários ruins de uma mudança que nem aconteceu.',
  },

  careers: {
    summary:
      'ISTJ é o alicerce de qualquer operação séria: finanças, logística, qualidade, gestão pública. Onde erro custa caro, você vale ouro.',
    matches: [
      { role: 'Controller / Gerente Financeiro', whyFits: 'Precisão, norma e responsabilidade: seu retrato em cargo.', bandBrlMonthly: 'R$ 15k–35k', caveat: 'O board quer cenários futuros, não só o retrato do passado. Exercite projeção.' },
      { role: 'Gerente de Operações / Logística', whyFits: 'Fazer o complexo rodar no horário, todos os dias.', bandBrlMonthly: 'R$ 12k–30k', caveat: 'Processo perfeito com equipe desmotivada quebra. Reserve energia para gente.' },
      { role: 'Auditor / Compliance',            whyFits: 'Encontrar a inconsistência que todos deixaram passar.', bandBrlMonthly: 'R$ 10k–28k', caveat: 'Nem toda exceção é fraude. Ouça o contexto antes do parecer.' },
      { role: 'Servidor Público de Carreira',    whyFits: 'Estabilidade, norma e mérito por consistência.', bandBrlMonthly: 'R$ 8k–30k', caveat: 'Não deixe a segurança virar teto do seu crescimento. Continue estudando.' },
    ],
    avoid: [
      'Startups em pivô permanente sem processo algum',
      'Vendas de impacto emocional e improviso',
      'Cargos criativos sem briefing nem critério',
    ],
  },

  relationships: {
    bestMatchFor: 'communication',
    pairings: [
      {
        withType: 'ENFP',
        dynamic: 'Seu oposto funcional. Ele é o vento; você é a raiz. Ele te tira da rotina que virou prisão; você dá chão ao caos dele. Um dos pares de crescimento mais férteis.',
        script: 'Para ENFP: quando ele trouxer a ideia número 47, não corte com "não vai dar". Pergunte "como você faria o primeiro passo?". Ele se aterra sozinho.',
      },
      {
        withType: 'ESTJ',
        dynamic: 'Mesma língua: ordem, dever, resultado. Operação impecável juntos. Risco: dois certos absolutos numa divergência de método.',
        script: 'Para ESTJ: divergiu, traga dado e precedente. Ele muda de opinião com evidência, nunca com insistência.',
      },
      {
        withType: 'ISFP',
        dynamic: 'Ele traz leveza e presente ao seu mundo de dever. Você dá segurança ao mundo flutuante dele. Risco: você o cobra como se ele fosse você.',
        script: 'Para ISFP: troque a cobrança pela pergunta: "o que te ajudaria a concluir isso?". Pressão o faz sumir; apoio o faz entregar.',
      },
    ],
  },

  pdi21Days: [
    { day: 1, focus: 'Ne inferior', task: 'Faça 1 coisa de um jeito DIFERENTE hoje (rota, prato, método). Anote o que sentiu.' },
    { day: 2, focus: 'Expressar',   task: 'Diga a 1 pessoa importante algo que você sente mas nunca verbaliza.' },
    { day: 3, focus: 'Flexível',    task: 'Quando o plano mudar hoje (vai mudar), respire e diga "vamos ver como resolve".' },
    { day: 4, focus: 'Novo',        task: 'Estude 30 min algo fora da sua área. Sem utilidade imediata: de propósito.' },
    { day: 5, focus: 'Delegar',     task: 'Entregue 1 tarefa a alguém e NÃO refaça depois. Conviva com o 85%.' },
    { day: 6, focus: 'Reflexão',    task: 'Diário: "que regra eu sigo que já não faz sentido, só costume?"' },
    { day: 7, focus: 'Off',         task: 'Lazer sem produtividade disfarçada. Descansar É o dever de hoje.' },
    // … expanda até 21
  ],
}

// ──────────────────────────────────────────────────────────
// ISFJ — O DEFENSOR
// ──────────────────────────────────────────────────────────
export const isfjPremium: MbtiPremium = {
  type: 'ISFJ',
  archetype: 'O Defensor',
  pitch: 'Cuidado é seu dom. Não se esqueça de cuidar de si.',
  paletteHex: '#7a9e7e',

  cognition: {
    stack: ['Si','Fe','Ti','Ne'],
    explanation:
      'Sua dominante é Si (Sensação Introvertida): memória rica de como as coisas devem ser feitas e do que cada pessoa gosta. Fe (Sentimento Extrovertido) usa esse arquivo para cuidar antes que peçam. Ti (Pensamento Introvertido) analisa em silêncio. Ne (Intuição Extrovertida) é sua inferior: o desconhecido e a mudança repentina te assustam mais do que deviam.',
    decisionRule:
      'Você decide pelo que protege as pessoas e preserva a harmonia, com base no que sempre funcionou. O ponto cego: dizer sim por dever até a exaustão e guardar mágoa em silêncio esperando que percebam. Ninguém percebe: você cuida bem demais para parecerem faltas.',
  },

  careers: {
    summary:
      'ISFJ é o coração silencioso de escolas, hospitais, equipes e famílias: cuidado competente e constância. O risco de carreira é ser indispensável demais para ser promovido.',
    matches: [
      { role: 'Enfermeiro / Profissional de Saúde', whyFits: 'Cuidado técnico com memória impecável de cada paciente.', bandBrlMonthly: 'R$ 5k–15k', caveat: 'Escala pesada + seu não-limite = burnout. Trate o descanso como prescrição.' },
      { role: 'Coordenador Pedagógico / Professor', whyFits: 'Ambiente seguro e método consistente para cada aluno.', bandBrlMonthly: 'R$ 4k–14k', caveat: 'Documentar seu impacto é o que sustenta promoção. Não trabalhe invisível.' },
      { role: 'Analista de RH / Departamento Pessoal', whyFits: 'Cuidar de gente COM processo e precisão.', bandBrlMonthly: 'R$ 5k–16k', caveat: 'RH estratégico exige falar de números com diretoria. Treine a apresentação.' },
      { role: 'Gerente Administrativo',              whyFits: 'A empresa funciona porque você lembra de tudo.', bandBrlMonthly: 'R$ 7k–18k', caveat: 'Assuma crédito em voz alta. "Foi a equipe" apaga VOCÊ do mapa salarial.' },
    ],
    avoid: [
      'Vendas de choque e cold call',
      'Ambientes de mudança brutal semanal sem transição',
      'Cargos de demissão e confronto como rotina',
    ],
  },

  relationships: {
    bestMatchFor: 'communication',
    pairings: [
      {
        withType: 'ENTP',
        dynamic: 'Seu oposto funcional. Ele bagunça sua rotina e alarga seu mundo; você dá a ele o porto que ele nem sabia precisar. Risco: o debate dele soa como ataque para você.',
        script: 'Para ENTP: quando ele questionar seu método, não é desrespeito, é esporte. Responda "me convence" em vez de se magoar. Ele respeita quem joga.',
      },
      {
        withType: 'ESFP',
        dynamic: 'Ele traz festa ao seu cuidado; você traz constância à festa dele. Convivência quente e concreta. Risco: você vira o adulto responsável de alguém que não pediu babá.',
        script: 'Para ESFP: cuide menos, brinque mais. Uma hora de diversão junto conecta mais que três favores silenciosos.',
      },
      {
        withType: 'INTJ',
        dynamic: 'Ele planeja o futuro; você garante o presente. Casa que funciona. Risco: ele esquece o gesto pequeno que para você é tudo, e você não fala.',
        script: 'Para INTJ: peça EXPLICITAMENTE. "Para mim, importa que você pergunte do meu dia" vira sistema para ele, e sistema ele cumpre.',
      },
    ],
  },

  pdi21Days: [
    { day: 1, focus: 'Pedir',       task: 'Peça 1 ajuda hoje em voz alta. Específica. Sem "se não for incômodo".' },
    { day: 2, focus: 'Limite',      task: 'Diga 1 não sem pedir desculpa nem inventar justificativa.' },
    { day: 3, focus: 'Visível',     task: 'Conte a alguém (chefe, família) 1 coisa que você fez bem esta semana.' },
    { day: 4, focus: 'Ne inferior', task: 'Topa 1 plano espontâneo hoje sem preparar nada. Só vai.' },
    { day: 5, focus: 'Mágoa',       task: 'Aquela mágoa guardada: fale dela hoje com a pessoa, com calma e em frase curta.' },
    { day: 6, focus: 'Reflexão',    task: 'Diário: "de quem eu cuido que nunca cuidou de mim? até quando?"' },
    { day: 7, focus: 'Off',         task: 'Um dia inteiro sendo cuidado. Aceite sem devolver na mesma hora.' },
    // … expanda até 21
  ],
}

// ──────────────────────────────────────────────────────────
// ESTJ — O EXECUTIVO
// ──────────────────────────────────────────────────────────
export const estjPremium: MbtiPremium = {
  type: 'ESTJ',
  archetype: 'O Executivo',
  pitch: 'Ordem é seu superpoder. Flexibilidade é a próxima escola.',
  paletteHex: '#8c2f17',

  cognition: {
    stack: ['Te','Si','Ne','Fi'],
    explanation:
      'Sua dominante é Te (Pensamento Extrovertido): organizar o mundo em metas, papéis e cobrança clara. Si (Sensação Introvertida) sustenta com precedente e método comprovado. Ne (Intuição Extrovertida) abre exceções quando você permite. Fi (Sentimento Introvertido) é sua inferior: o próprio mundo emocional é território que você visita pouco e mal.',
    decisionRule:
      'Você decide rápido pelo que é eficiente e comprovado, e espera que todos cumpram como você cumpriria. O ponto cego: tratar sentimento como frescura e mudança como ameaça, até o dia em que o corpo ou a família apresentam a fatura. Sob estresse, explosões de irritação e um sentimentalismo desajeitado que te constrange.',
  },

  careers: {
    summary:
      'ESTJ é o executor-chefe do mundo real: indústrias, franquias, operações e instituições rodam porque alguém como você assume. Cuidado com ambientes que pedem só inovação solta.',
    matches: [
      { role: 'Diretor de Operações (COO)',    whyFits: 'Transformar estratégia em rotina que entrega, todo mês.', bandBrlMonthly: 'R$ 25k–60k', caveat: 'Gente não é engrenagem. Os melhores COOs dominam a conversa difícil COM empatia.' },
      { role: 'Gerente Industrial / de Planta', whyFits: 'Meta, segurança, processo e disciplina em escala.', bandBrlMonthly: 'R$ 15k–35k', caveat: 'Chão de fábrica lê seu humor. Sua irritação custa produtividade coletiva.' },
      { role: 'Franqueado Multiunidades',       whyFits: 'Executar playbook comprovado melhor que todo mundo.', bandBrlMonthly: 'R$ 10k–50k (variável)', caveat: 'A franquia dá o processo; o resultado vem de como você lidera os times.' },
      { role: 'Oficial / Gestor Público de Execução', whyFits: 'Hierarquia clara, dever claro, mérito por entrega.', bandBrlMonthly: 'R$ 9k–28k', caveat: 'Autoridade formal sem escuta gera obediência mínima, não excelência.' },
    ],
    avoid: [
      'Pesquisa aberta sem prazo nem métrica',
      'Cargos artísticos de briefing vago',
      'Startups caóticas em fase de descoberta pura',
    ],
  },

  relationships: {
    bestMatchFor: 'communication',
    pairings: [
      {
        withType: 'INFP',
        dynamic: 'Seu oposto exato. Ele sente tudo que você não olha. Pode te apresentar seu próprio coração, se você não o esmagar antes com praticidade.',
        script: 'Para INFP: quando ele trouxer um sentimento, NÃO resolva. Diga "me conta mais" e segure a solução por 10 minutos. É o exercício mais difícil e mais valioso da sua vida.',
      },
      {
        withType: 'ISTJ',
        dynamic: 'Dupla de confiança total: palavra dada, palavra cumprida dos dois lados. Operação de precisão. Risco: casa ou empresa viram quartel sem calor.',
        script: 'Para ISTJ: reconheça o trabalho invisível dele com especificidade. "Notei que você previu aquele problema" vale um bônus.',
      },
      {
        withType: 'ESFP',
        dynamic: 'Ele descongela seus jantares e humaniza sua imagem. Você dá estrutura ao talento dele. Risco: você o corrige em público e mata a relação em uma frase.',
        script: 'Para ESFP: elogie em público, corrija a sós, e aceite o convite para a diversão de vez em quando. Presença relaxada compra o que autoridade não compra.',
      },
    ],
  },

  pdi21Days: [
    { day: 1, focus: 'Fi inferior', task: 'Nomeie 3 emoções que sentiu hoje. Proibido dizer só "estresse" ou "nada".' },
    { day: 2, focus: 'Escuta',      task: 'Numa conversa hoje, pergunte "o que você acha?" ANTES de dar sua diretriz.' },
    { day: 3, focus: 'Flexível',    task: 'Aceite 1 método diferente do seu sem corrigir, se o resultado chegar.' },
    { day: 4, focus: 'Vínculo',     task: 'Ligue para alguém da família sem motivo prático nenhum.' },
    { day: 5, focus: 'Elogio',      task: 'Dê 3 reconhecimentos específicos hoje. Pessoas rendem por reconhecimento, não só cobrança.' },
    { day: 6, focus: 'Reflexão',    task: 'Diário: "que relação estou tratando como projeto em atraso?"' },
    { day: 7, focus: 'Off',         task: 'Um dia sem revisar, corrigir ou otimizar nada de ninguém.' },
    // … expanda até 21
  ],
}

// ──────────────────────────────────────────────────────────
// ESFJ — O CÔNSUL
// ──────────────────────────────────────────────────────────
export const esfjPremium: MbtiPremium = {
  type: 'ESFJ',
  archetype: 'O Cônsul',
  pitch: 'Você lê o ambiente como ninguém. Olhe para dentro também.',
  paletteHex: '#c4633a',

  cognition: {
    stack: ['Fe','Si','Ne','Ti'],
    explanation:
      'Sua dominante é Fe (Sentimento Extrovertido): você percebe necessidades alheias em tempo real e organiza o mundo social para todos se sentirem incluídos. Si (Sensação Introvertida) guarda tradições, datas e preferências de cada um. Ne (Intuição Extrovertida) aparece em lampejos. Ti (Pensamento Introvertido) é sua inferior: analisar friamente, inclusive críticas, é onde você mais sofre.',
    decisionRule:
      'Você decide pelo que mantém o grupo coeso e pelo que "as pessoas certas" aprovariam. O ponto cego: terceirizar seu valor para a aprovação externa e evitar conflito necessário até ele apodrecer. Crítica ao seu trabalho soa como rejeição a você, e não é.',
  },

  careers: {
    summary:
      'ESFJ é o anfitrião nato de qualquer estrutura humana: hospitalidade, saúde, educação, comercial de relacionamento. Onde a experiência das pessoas define o resultado, você lidera.',
    matches: [
      { role: 'Gerente de Customer Success',   whyFits: 'Antecipar a necessidade do cliente antes do ticket abrir.', bandBrlMonthly: 'R$ 8k–22k', caveat: 'Cliente não é amigo: renove pelo valor entregue, não pela simpatia.' },
      { role: 'Gestor de Hotelaria / Eventos', whyFits: 'Experiências impecáveis onde cada detalhe acolhe.', bandBrlMonthly: 'R$ 7k–20k', caveat: 'Perfeccionismo de anfitrião esgota equipe. Padrão alto com escala humana.' },
      { role: 'Coordenador de Enfermagem / Clínica', whyFits: 'Cuidado + organização + leitura fina da equipe.', bandBrlMonthly: 'R$ 6k–18k', caveat: 'Decisões clínicas duras exigem o Ti que você evita. Apoie-se em protocolo.' },
      { role: 'Executivo de Vendas Relacionais', whyFits: 'Carteira fiel construída em confiança de anos.', bandBrlMonthly: 'R$ 8k–30k', caveat: 'Não sofra cada "não" como rejeição pessoal. É estatística, não veredito.' },
    ],
    avoid: [
      'Trabalho remoto isolado sem equipe',
      'Análise técnica solitária o dia inteiro',
      'Ambientes de crítica ríspida como cultura (traders, cozinhas tóxicas)',
    ],
  },

  relationships: {
    bestMatchFor: 'communication',
    pairings: [
      {
        withType: 'INTP',
        dynamic: 'Seu oposto funcional. Ele mora na cabeça; você, no coração do grupo. Ele te ensina a segurar crítica sem sangrar; você o ensina a ver gente.',
        script: 'Para INTP: quando ele corrigir seu fato no meio do jantar, não é ataque, é o jeito dele de participar. Responda com humor, não com mágoa.',
      },
      {
        withType: 'INTJ',
        dynamic: 'Ele esquece o social que você respira; você esquece o longo prazo que ele enxerga. Juntos, casa completa. Risco: você interpreta o silêncio dele como frieza.',
        script: 'Para INTJ: silêncio dele = processamento, não rejeição. Pergunte "prefere pensar e me responder amanhã?" e ele te amará por isso.',
      },
      {
        withType: 'ESTJ',
        dynamic: 'Vocês dois mantêm o mundo organizado: você pelo lado humano, ele pelo lado prático. Parceria sólida. Risco: competir por quem "sabe o que é melhor" para os outros.',
        script: 'Para ESTJ: apresente a necessidade emocional como impacto prático. "Time desmotivado atrasa entrega" chega onde "as pessoas estão tristes" não chega.',
      },
    ],
  },

  pdi21Days: [
    { day: 1, focus: 'Ti inferior', task: 'Receba 1 crítica hoje anotando os FATOS dela, sem defender. Analise à noite.' },
    { day: 2, focus: 'Eu primeiro', task: 'Escolha o restaurante/filme/programa de hoje pelo SEU gosto. Anuncie sem consultar.' },
    { day: 3, focus: 'Conflito',    task: 'Toque no assunto delicado que você vem adiando para não estragar o clima.' },
    { day: 4, focus: 'Aprovação',   task: 'Faça algo bom hoje e NÃO conte para ninguém. Note a diferença.' },
    { day: 5, focus: 'Limite',      task: 'Delegue 1 cuidado que só você faz. Deixe fazerem do jeito deles.' },
    { day: 6, focus: 'Reflexão',    task: 'Diário: "quem eu seria se ninguém estivesse olhando?"' },
    { day: 7, focus: 'Off',         task: 'Programa a dois ou sozinho SEM organizar nada para grupo nenhum.' },
    // … expanda até 21
  ],
}

// ──────────────────────────────────────────────────────────
// ISTP — O VIRTUOSO
// ──────────────────────────────────────────────────────────
export const istpPremium: MbtiPremium = {
  type: 'ISTP',
  archetype: 'O Virtuoso',
  pitch: 'Mãos que resolvem qualquer coisa. Ainda falta resolver o "eu".',
  paletteHex: '#3a4f8c',

  cognition: {
    stack: ['Ti','Se','Ni','Fe'],
    explanation:
      'Sua dominante é Ti (Pensamento Introvertido): entender como as coisas funcionam por dentro, desmontando na mão ou na mente. Se (Sensação Extrovertida) te dá reflexo, precisão e sangue frio no caos. Ni (Intuição Introvertida) fecha diagnósticos certeiros. Fe (Sentimento Extrovertido) é sua inferior: expressar afeto e lidar com demanda emocional alheia é seu terreno pantanoso.',
    decisionRule:
      'Você decide na hora, com o dado que está na mesa, e ajusta em movimento. Economia máxima: de palavras, de energia, de drama. O ponto cego: tratar emoções (suas e dos outros) como problema sem solução mecânica e sumir quando a conversa esquenta. As pessoas leem seu desapego como descaso.',
  },

  careers: {
    summary:
      'ISTP é o solucionador de crise e o mestre da ferramenta: onde algo quebra, trava ou explode, você vale o dia. Definha em reunião longa e política corporativa.',
    matches: [
      { role: 'Engenheiro de Campo / Manutenção Sênior', whyFits: 'Diagnóstico rápido de sistema real sob pressão.', bandBrlMonthly: 'R$ 8k–25k', caveat: 'O laudo escrito importa tanto quanto o conserto. Documente.' },
      { role: 'Piloto / Operador de Sistemas Críticos',  whyFits: 'Sangue frio + precisão sensorial em tempo real.', bandBrlMonthly: 'R$ 12k–40k', caveat: 'Checklist existe para o dia em que seu reflexo falhar. Respeite-o sempre.' },
      { role: 'Desenvolvedor / DevOps de Incidente',      whyFits: 'Debugar produção caindo às 3h é seu esporte.', bandBrlMonthly: 'R$ 10k–30k', caveat: 'Prevenir incêndio dá menos adrenalina que apagar, e vale mais. Automatize.' },
      { role: 'Empreendedor de Ofício (oficina, ateliê técnico)', whyFits: 'Autonomia total + trabalho manual de excelência.', bandBrlMonthly: 'R$ 5k–25k (variável)', caveat: 'Cliente precisa de conversa, prazo e recibo. Ou contrate quem faça isso.' },
    ],
    avoid: [
      'Cargos de reunião contínua e consenso infinito',
      'Vendas emocionais e hospitalidade efusiva',
      'Planejamento abstrato de horizonte de 10 anos sem mão na massa',
    ],
  },

  relationships: {
    bestMatchFor: 'communication',
    pairings: [
      {
        withType: 'ENFJ',
        dynamic: 'Seu oposto funcional. Ele quer conexão verbal constante; você demonstra por ato e presença. Ele te expande; você o acalma. Risco: ele sente rejeição no seu silêncio.',
        script: 'Para ENFJ: verbalize o mínimo vital. Um "gosto de estar com você" por semana evita dez DRs. É manutenção preventiva de relacionamento.',
      },
      {
        withType: 'ESTJ',
        dynamic: 'Respeito mútuo por competência. Ele organiza; você executa o impossível. Risco: ele tenta te enquadrar em processo e você some.',
        script: 'Para ESTJ: negocie autonomia por resultado. "Me dá a meta e o prazo; o método é meu". Ele aceita quando você entrega.',
      },
      {
        withType: 'ISFP',
        dynamic: 'Dois quietos que se entendem sem falar. Convivência leve, lado a lado. Risco: nenhum dos dois puxa a conversa necessária e a relação vira colegas de quarto.',
        script: 'Para ISFP: ele sente fundo e não mostra. De vez em quando pergunte "tá tudo bem MESMO?" e espere a segunda resposta.',
      },
    ],
  },

  pdi21Days: [
    { day: 1, focus: 'Fe inferior', task: 'Diga a 1 pessoa próxima uma frase de apreço direta. Sem ironia de escape.' },
    { day: 2, focus: 'Presença',    task: 'Fique numa conversa emocional 5 min ALÉM da vontade de sair. Só escute.' },
    { day: 3, focus: 'Futuro',      task: 'Escreva onde quer estar em 3 anos. 5 linhas. O motor também precisa de destino.' },
    { day: 4, focus: 'Vínculo',     task: 'Convide alguém para uma atividade prática juntos. Conexão do seu jeito conta.' },
    { day: 5, focus: 'Palavra',     task: 'Explique para alguém o que você está sentindo sobre algo. Uma frase inteira.' },
    { day: 6, focus: 'Reflexão',    task: 'Diário: "de que conversa eu fugi esta semana? o que ela ia me custar de verdade?"' },
    { day: 7, focus: 'Off',         task: 'Um dia de mão na massa por puro prazer, sem encomenda de ninguém.' },
    // … expanda até 21
  ],
}

// ──────────────────────────────────────────────────────────
// ISFP — O AVENTUREIRO
// ──────────────────────────────────────────────────────────
export const isfpPremium: MbtiPremium = {
  type: 'ISFP',
  archetype: 'O Aventureiro',
  pitch: 'Você é poesia em movimento. Compromisso é a forma de ela durar.',
  paletteHex: '#a8522e',

  cognition: {
    stack: ['Fi','Se','Ni','Te'],
    explanation:
      'Sua dominante é Fi (Sentimento Introvertido): um núcleo de valores e sensibilidade estética que define quem você é, mesmo quando ninguém vê. Se (Sensação Extrovertida) te conecta ao presente: cores, texturas, música, movimento. Ni (Intuição Introvertida) traz pressentimentos certeiros. Te (Pensamento Extrovertido) é sua inferior: estrutura, prazo, cobrança e planilha te sufocam.',
    decisionRule:
      'Você decide pelo que ressoa com seu íntimo, no ritmo do seu tempo. Pressionado, você trava ou foge, e depois se pune. O ponto cego: evitar tanto o conflito e a estrutura que suas obras ficam inacabadas e suas relações sem conversa de rumo. Seu talento precisa de moldura para ser visto.',
  },

  careers: {
    summary:
      'ISFP cria beleza concreta: design, gastronomia, estética, artesanato de alto nível, cuidado com as mãos. Precisa de autonomia e de alguém (ou algum sistema) que cuide da moldura comercial.',
    matches: [
      { role: 'Designer / Diretor de Arte',    whyFits: 'Gosto apurado aplicado ao concreto: seu Fi+Se em cargo.', bandBrlMonthly: 'R$ 6k–20k', caveat: 'Defenda sua criação em reunião. Ela não fala por si diante de leigo.' },
      { role: 'Chef / Confeiteiro Autoral',    whyFits: 'Sabor, estética e presente sensorial: arte que se come.', bandBrlMonthly: 'R$ 5k–18k', caveat: 'Cozinha é também custo e ficha técnica. Sem Te, o talento fecha as portas do negócio.' },
      { role: 'Fisioterapeuta / Terapias Corporais', whyFits: 'Cuidado silencioso e preciso pelas mãos.', bandBrlMonthly: 'R$ 5k–15k', caveat: 'Agenda e cobrança são parte da clínica. Automatize para não se desgastar.' },
      { role: 'Fotógrafo / Videomaker',        whyFits: 'Capturar o instante com olhar que ninguém ensina.', bandBrlMonthly: 'R$ 4k–20k (variável)', caveat: 'Portfólio parado não vende. Publique com ritmo, mesmo sem estar "perfeito".' },
    ],
    avoid: [
      'Auditoria, cobrança e controle de processo',
      'Ambientes de pressão pública e confronto diário',
      'Corporativo engessado com dress code da alma',
    ],
  },

  relationships: {
    bestMatchFor: 'communication',
    pairings: [
      {
        withType: 'ESTJ',
        dynamic: 'Seu oposto funcional. Ele oferece a estrutura que sua arte precisa; você oferece a alma que a agenda dele perdeu. Risco: a cobrança dele te faz sumir sem aviso.',
        script: 'Para ESTJ: em vez de sumir quando pressionado, diga "preciso de 2 dias e te trago pronto". Prazo dito é a língua que ele respeita.',
      },
      {
        withType: 'ENFP',
        dynamic: 'Dois espíritos livres: ele sonha em voz alta, você sente em silêncio. Cumplicidade criativa deliciosa. Risco: nenhum dos dois segura o leme prático da vida a dois.',
        script: 'Para ENFP: combine com humor quem cuida do quê. "Você liga para o banco, eu cozinho" dito em voz alta evita ressentimento mudo.',
      },
      {
        withType: 'ISTJ',
        dynamic: 'Ele constrói a casa; você a torna um lar. Estabilidade + beleza. Risco: ele lê seu ritmo como preguiça; você lê a rotina dele como prisão.',
        script: 'Para ISTJ: mostre o processo invisível. "Estou maturando a ideia, entrego quinta" o tranquiliza mais do que você imagina.',
      },
    ],
  },

  pdi21Days: [
    { day: 1, focus: 'Te inferior', task: 'Dê prazo COM DATA para 1 projeto pessoal e conte a alguém.' },
    { day: 2, focus: 'Voz',         task: 'Expresse 1 discordância hoje em vez de concordar e se afastar.' },
    { day: 3, focus: 'Mostrar',     task: 'Publique ou mostre 1 criação sua inacabada. A 80% ela já toca gente.' },
    { day: 4, focus: 'Estrutura',   task: 'Organize SUA bagunça-mãe (mesa, arquivos, ateliê) por 45 min com música.' },
    { day: 5, focus: 'Conflito',    task: 'Aquela conversa evitada: comece hoje com "preciso te falar uma coisa".' },
    { day: 6, focus: 'Reflexão',    task: 'Diário: "o que eu abandono quando exigem de mim? quanto isso já custou?"' },
    { day: 7, focus: 'Off',         task: 'Imersão sensorial: natureza, cozinha, música alta ou pincel. Sem meta.' },
    // … expanda até 21
  ],
}

// ──────────────────────────────────────────────────────────
// ESTP — O EMPREENDEDOR
// ──────────────────────────────────────────────────────────
export const estpPremium: MbtiPremium = {
  type: 'ESTP',
  archetype: 'O Empreendedor',
  pitch: 'Ação é seu instinto. Reflexão é seu próximo nível.',
  paletteHex: '#d4943a',

  cognition: {
    stack: ['Se','Ti','Fe','Ni'],
    explanation:
      'Sua dominante é Se (Sensação Extrovertida): você lê o ambiente físico e social em alta definição e age em tempo real, onde os outros ainda estão processando. Ti (Pensamento Introvertido) calcula o ângulo com frieza. Fe (Sentimento Extrovertido) te dá lábia e carisma de rua. Ni (Intuição Introvertida) é sua inferior: consequência de longo prazo e sentido de vida são as perguntas que você adia.',
    decisionRule:
      'Você decide agindo: o movimento revela a resposta. Funciona no 90% tático e falha no 10% estratégico, que é justamente onde moram patrimônio, saúde e reputação. O ponto cego: tédio te faz criar crise onde não havia, e o risco vicia.',
  },

  careers: {
    summary:
      'ESTP domina onde decisão rápida sob pressão vira dinheiro: vendas de campo, operação comercial, crise, negociação dura. Definha em análise longa e burocracia.',
    matches: [
      { role: 'Executivo de Vendas de Campo / Hunter', whyFits: 'Ler o cliente ao vivo e fechar no momento certo.', bandBrlMonthly: 'R$ 8k–40k (com comissão)', caveat: 'CRM preenchido é o que transforma seu talento em carreira auditável.' },
      { role: 'Corretor de Alto Padrão (imóveis, seguros)', whyFits: 'Negociação cara a cara com adrenalina de fechamento.', bandBrlMonthly: 'R$ 6k–50k (variável)', caveat: 'Renda em montanha-russa exige reserva. Guarde nos meses bons.' },
      { role: 'Gestor de Crise / Operações Especiais', whyFits: 'Sangue frio quando todos entram em pânico.', bandBrlMonthly: 'R$ 12k–30k', caveat: 'Depois da crise vem o relatório e a prevenção. Fique para essa parte.' },
      { role: 'Empreendedor de Varejo / Franquias',    whyFits: 'Faro de rua para ponto, produto e oportunidade.', bandBrlMonthly: 'R$ 8k–60k (variável)', caveat: 'O contrato que você não leu é o risco que você não calculou. Advogado antes, não depois.' },
    ],
    avoid: [
      'Pesquisa acadêmica de ciclo longo',
      'Funções de escritório sem meta nem movimento',
      'Planejamento estratégico puro sem execução',
    ],
  },

  relationships: {
    bestMatchFor: 'communication',
    pairings: [
      {
        withType: 'INFJ',
        dynamic: 'Seu oposto funcional. Ele vive nas profundezas que você evita; você vive no presente que ele esquece. Atração real, tradução difícil.',
        script: 'Para INFJ: desacelere e dê contexto. Antes de mudar o plano, avise o porquê. Surpresa para ele é sobressalto, não diversão.',
      },
      {
        withType: 'ISTJ',
        dynamic: 'Ele guarda, confere e sustenta o que você conquista no impulso. Sociedade lucrativa. Risco: ele vê imprudência; você vê lentidão.',
        script: 'Para ISTJ: apresente o risco JÁ calculado: "pior cenário é X e cobrimos assim". Ele embarca quando vê que você fez a conta.',
      },
      {
        withType: 'ESFJ',
        dynamic: 'Ele cuida da rede de relações que sua vida acelerada atropela. Você traz aventura à rotina dele. Risco: seus improvisos furam os rituais que para ele são sagrados.',
        script: 'Para ESFJ: os eventos dele (aniversário, domingo em família) são inegociáveis. Compareça. É o preço fixo da lealdade dele.',
      },
    ],
  },

  pdi21Days: [
    { day: 1, focus: 'Ni inferior', task: 'Antes de agir hoje, pergunte 1 vez: "e daqui a 1 ano, isso importa?"' },
    { day: 2, focus: 'Pausa',       task: 'Espere 24h antes de 1 compra ou decisão impulsiva. Só hoje.' },
    { day: 3, focus: 'Escuta',      task: 'Numa conversa, não complete a frase de ninguém. Deixe terminar.' },
    { day: 4, focus: 'Futuro',      task: 'Escreva 3 metas de 3 anos. Cole onde você vê todo dia.' },
    { day: 5, focus: 'Constância',  task: 'Termine hoje aquilo que perdeu a graça na metade.' },
    { day: 6, focus: 'Reflexão',    task: 'Diário: "que risco estou correndo por tédio, não por estratégia?"' },
    { day: 7, focus: 'Off',         task: 'Adrenalina saudável: esporte, trilha, jogo. Gaste o motor no lugar certo.' },
    // … expanda até 21
  ],
}

// ──────────────────────────────────────────────────────────
// ESFP — O ANIMADOR
// ──────────────────────────────────────────────────────────
export const esfpPremium: MbtiPremium = {
  type: 'ESFP',
  archetype: 'O Animador',
  pitch: 'Você é vida em festa. Constância é o palco que sustenta o show.',
  paletteHex: '#c4633a',

  cognition: {
    stack: ['Se','Fi','Te','Ni'],
    explanation:
      'Sua dominante é Se (Sensação Extrovertida): presente absoluto, estética, festa, palco. Você sente a vida em alta voltagem e contagia quem está perto. Fi (Sentimento Introvertido) dá coração genuíno por trás do show. Te (Pensamento Extrovertido) organiza quando a urgência aperta. Ni (Intuição Introvertida) é sua inferior: futuro, padrão oculto e planejamento longo são sua zona cega.',
    decisionRule:
      'Você decide pelo que a vida oferece AGORA e pelo que seu coração aprova. O ponto cego: o boleto de dezembro não aparece na festa de julho. Sob estresse, a Ni inferior dispara previsões sombrias e paralisantes, o avesso do seu brilho. A saída não é pensar mais: é estruturar o básico quando está bem.',
  },

  careers: {
    summary:
      'ESFP transforma qualquer ambiente em experiência: entretenimento, eventos, vendas presenciais, hospitalidade. Onde presença e carisma são o produto, você é premium.',
    matches: [
      { role: 'Apresentador / Comunicador / Influencer', whyFits: 'Palco e câmera amam quem ama o presente.', bandBrlMonthly: 'R$ 3k–50k (variável)', caveat: 'Carisma abre a porta; agenda de produção mantém você dentro dela.' },
      { role: 'Produtor de Eventos / Cerimonial',        whyFits: 'Fazer as pessoas viverem momentos inesquecíveis.', bandBrlMonthly: 'R$ 5k–18k', caveat: 'O evento perfeito nasce da planilha chata de 60 dias antes. Case com o checklist.' },
      { role: 'Vendas Premium Presenciais (moda, beleza, autos)', whyFits: 'Cliente compra a experiência de ser atendido por você.', bandBrlMonthly: 'R$ 5k–25k (com comissão)', caveat: 'Pós-venda constante multiplica: 5 mensagens de acompanhamento por dia.' },
      { role: 'Professor de Expressão (dança, teatro, oratória)', whyFits: 'Ensinar presença e alegria pelo corpo.', bandBrlMonthly: 'R$ 4k–15k', caveat: 'Turma recorrente exige método e progressão, não só carisma na aula.' },
    ],
    avoid: [
      'Análise contábil e backoffice solitário',
      'Trabalho noturno isolado sem contato humano',
      'Planejamento estratégico de horizonte longo como função principal',
    ],
  },

  relationships: {
    bestMatchFor: 'communication',
    pairings: [
      {
        withType: 'ISTJ',
        dynamic: 'Seu oposto funcional. Ele constrói a segurança que permite sua festa durar. Você o lembra de que a vida é agora. Risco: ele vira seu pai fiscal; você, a criança rebelde. Papéis que matam o romance.',
        script: 'Para ISTJ: assuma UMA responsabilidade fixa da casa/vida e cumpra impecável. Um combinado cumprido vale mais que dez desculpas charmosas.',
      },
      {
        withType: 'ENTJ',
        dynamic: 'Ele te dá direção e estrutura para seu brilho escalar; você humaniza o tanque de guerra dele. Dupla de palco e bastidor invertidos. Risco: ele te trata como "recurso de carisma".',
        script: 'Para ENTJ: fale a língua de resultado: "meu jeito leve segurou aquele cliente". Mostre que leveza também é competência.',
      },
      {
        withType: 'ISFJ',
        dynamic: 'Ele cuida de você nos detalhes; você o tira da rotina cinza. Afeto concreto dos dois lados. Risco: ele cuida calado, você não nota, e a conta emocional chega.',
        script: 'Para ISFJ: agradeça o invisível NOMINALMENTE: "vi que você deixou tudo pronto pra mim". Ele floresce com 1 frase dessas por dia.',
      },
    ],
  },

  pdi21Days: [
    { day: 1, focus: 'Ni inferior', task: 'Escreva 3 linhas: "onde quero estar daqui a 1 ano?". Sem cinismo, sem fuga.' },
    { day: 2, focus: 'Dinheiro',    task: 'Olhe TODAS as contas do mês de frente, hoje, por 30 min. Anote o número real.' },
    { day: 3, focus: 'Constância',  task: 'Cumpra 1 compromisso chato de hoje SEM remarcar. Presença é seu produto.' },
    { day: 4, focus: 'Silêncio',    task: '15 min sozinho e em silêncio. A ansiedade que subir é só desintoxicação de estímulo.' },
    { day: 5, focus: 'Profundo',    task: 'Numa conversa hoje, pergunte "como você está de verdade?" e fique até a resposta real.' },
    { day: 6, focus: 'Reflexão',    task: 'Diário: "o que estou evitando sentir quando lotou a agenda de gente?"' },
    { day: 7, focus: 'Off',         task: 'Festa merecida e consciente: celebre a semana SEM estourar o combinado com você mesmo.' },
    // … expanda até 21
  ],
}

export const MBTI_PREMIUM: Record<MbtiType, MbtiPremium> = {
  INTJ: intjPremium,
  INTP: intpPremium,
  ENTJ: entjPremium,
  ENTP: entpPremium,
  INFJ: infjPremium,
  INFP: infpPremium,
  ENFJ: enfjPremium,
  ENFP: enfpPremium,
  ISTJ: istjPremium,
  ISFJ: isfjPremium,
  ESTJ: estjPremium,
  ESFJ: esfjPremium,
  ISTP: istpPremium,
  ISFP: isfpPremium,
  ESTP: estpPremium,
  ESFP: esfpPremium,
}

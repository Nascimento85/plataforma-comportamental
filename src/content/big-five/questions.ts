// ============================================================
// Big Five Liderança Corporativa
// Banco de 90 itens (18 por fator). A cada sessão são sorteados
// 44 (8 ou 9 por fator) com seed determinístico, para o candidato
// ver perguntas novas se refizer. Likert 1 a 5.
// Itens marcados como `inverted: true` têm pontuação espelhada
// pelo engine (Valor = 6 - Resposta).
// ============================================================

// 5 macrofatores (nomes comerciais)
export type BigFiveFactor =
  | 'EXT'   // Influência & Comunicação (Extroversão)
  | 'AMB'   // Gestão de Pessoas & Empatia (Amabilidade)
  | 'CON'   // Foco em Resultados & Execução (Conscienciosidade)
  | 'EST'   // Estabilidade Emocional (inverso de Neuroticismo)
  | 'ABE'   // Inovação & Visão Estratégica (Abertura)

export interface BigFiveQuestion {
  id:       number
  factor:   BigFiveFactor
  texto:    string
  inverted: boolean   // true => engine espelha: valor = 6 - resposta
}

// ============================================================
// BANCO DE 90 QUESTÕES
// ============================================================

export const BIG_FIVE_QUESTIONS: BigFiveQuestion[] = [

  // ────────────────────────────────────────────────
  // FATOR 1, EXT — Influência & Comunicação (Extroversão)
  // ────────────────────────────────────────────────
  { id: 1,  factor: 'EXT', inverted: false, texto: 'Sou alguém que se expressa de forma assertiva e comunicativa em reuniões de equipe.' },
  { id: 2,  factor: 'EXT', inverted: true,  texto: 'Costumo me manter reservado(a) e quieto(a) quando estou em grandes grupos de trabalho.' },
  { id: 3,  factor: 'EXT', inverted: false, texto: 'Tenho facilidade para gerar entusiasmo e engajar as pessoas ao meu redor em um novo projeto.' },
  { id: 4,  factor: 'EXT', inverted: false, texto: 'Possuo uma postura firme e assumo o comando natural das situações quando o grupo está sem direção.' },
  { id: 5,  factor: 'EXT', inverted: true,  texto: 'Prefiro que outras pessoas tomem a frente nas decisões e discussões mais complexas.' },
  { id: 6,  factor: 'EXT', inverted: false, texto: 'Me considero uma pessoa enérgica, dinâmica e de ritmo acelerado no dia a dia.' },
  { id: 7,  factor: 'EXT', inverted: true,  texto: 'Sinto que reuniões longas com muitas pessoas esgotam minha energia rapidamente.' },
  { id: 8,  factor: 'EXT', inverted: false, texto: 'Consigo criar conexões e fazer networking com facilidade dentro e fora da empresa.' },
  { id: 9,  factor: 'EXT', inverted: false, texto: 'Sinto prazer em apresentar projetos ou conduzir treinamentos para grandes plateias.' },
  { id: 10, factor: 'EXT', inverted: true,  texto: 'Em eventos corporativos, costumo ficar em uma roda menor com pessoas que já conheço bem.' },
  { id: 11, factor: 'EXT', inverted: false, texto: 'Tenho facilidade para iniciar conversas com pessoas que acabei de conhecer.' },
  { id: 12, factor: 'EXT', inverted: false, texto: 'Sou conhecido(a) por defender minhas ideias com firmeza e convicção em debates.' },
  { id: 13, factor: 'EXT', inverted: true,  texto: 'Em discussões acaloradas, prefiro recuar e processar tudo internamente antes de me posicionar.' },
  { id: 14, factor: 'EXT', inverted: false, texto: 'Costumo ser visto(a) como uma pessoa otimista e animada pelos colegas de trabalho.' },
  { id: 15, factor: 'EXT', inverted: true,  texto: 'Para recarregar minhas energias, prefiro silêncio e solitude em vez de eventos sociais.' },
  { id: 16, factor: 'EXT', inverted: false, texto: 'Costumo influenciar a tomada de decisões do grupo apenas pela minha presença na conversa.' },
  { id: 17, factor: 'EXT', inverted: false, texto: 'Falo abertamente sobre minhas conquistas e meus projetos quando é relevante para o time.' },
  { id: 18, factor: 'EXT', inverted: true,  texto: 'Evito situações em que terei que improvisar uma fala pública sem preparação prévia.' },

  // ────────────────────────────────────────────────
  // FATOR 2, AMB — Gestão de Pessoas & Empatia (Amabilidade)
  // ────────────────────────────────────────────────
  { id: 19, factor: 'AMB', inverted: false, texto: 'Costumo confiar nas boas intenções dos membros da minha equipe e colegas de trabalho.' },
  { id: 20, factor: 'AMB', inverted: true,  texto: 'Sou conhecido(a) por fazer críticas diretas e duras, sem me preocupar tanto em suavizar o tom.' },
  { id: 21, factor: 'AMB', inverted: false, texto: 'Tenho genuíno interesse em apoiar o desenvolvimento profissional e o bem estar dos liderados.' },
  { id: 22, factor: 'AMB', inverted: false, texto: 'Busco estabelecer relações de cooperação mútua em vez de disputas ou competição interna.' },
  { id: 23, factor: 'AMB', inverted: true,  texto: 'Tenho pouca paciência para lidar com os dramas pessoais ou desabafos da equipe.' },
  { id: 24, factor: 'AMB', inverted: false, texto: 'Sou um(a) mediador(a) natural de conflitos, sempre buscando o consenso e a harmonia no ambiente.' },
  { id: 25, factor: 'AMB', inverted: false, texto: 'Demonstro empatia e escuta ativa quando alguém me traz um problema ou dificuldade.' },
  { id: 26, factor: 'AMB', inverted: true,  texto: 'Prefiro manter um distanciamento estritamente formal e frio nas minhas relações profissionais.' },
  { id: 27, factor: 'AMB', inverted: false, texto: 'Costumo dar feedbacks construtivos com cuidado para preservar a autoestima da pessoa.' },
  { id: 28, factor: 'AMB', inverted: true,  texto: 'Acredito que a maioria das pessoas só faz o que é mandado e não tem boas intenções no trabalho.' },
  { id: 29, factor: 'AMB', inverted: false, texto: 'Quando alguém da equipe está enfrentando dificuldades pessoais, busco entender e apoiar.' },
  { id: 30, factor: 'AMB', inverted: false, texto: 'Prefiro ceder em pontos secundários para preservar a relação de longo prazo com a outra pessoa.' },
  { id: 31, factor: 'AMB', inverted: true,  texto: 'Em negociações internas, costumo ser inflexível para conseguir o melhor resultado possível.' },
  { id: 32, factor: 'AMB', inverted: false, texto: 'Me esforço para entender o ponto de vista do outro mesmo quando discordo completamente.' },
  { id: 33, factor: 'AMB', inverted: false, texto: 'Comemoro sinceramente as conquistas dos colegas, sem sentir inveja ou competição.' },
  { id: 34, factor: 'AMB', inverted: true,  texto: 'Tenho dificuldade em elogiar diretamente pessoas que ainda não comprovaram resultado.' },
  { id: 35, factor: 'AMB', inverted: false, texto: 'Lidero pelo exemplo de tratar todas as pessoas com respeito, independente do cargo delas.' },
  { id: 36, factor: 'AMB', inverted: true,  texto: 'Penso que ser muito amigo da equipe atrapalha a autoridade do líder.' },

  // ────────────────────────────────────────────────
  // FATOR 3, CON — Foco em Resultados & Execução (Conscienciosidade)
  // ────────────────────────────────────────────────
  { id: 37, factor: 'CON', inverted: false, texto: 'Realizo minhas tarefas profissionais de forma minuciosa, organizada e estruturada.' },
  { id: 38, factor: 'CON', inverted: true,  texto: 'Às vezes sou um pouco descuidado(a) com prazos menores ou pequenos detalhes de relatórios.' },
  { id: 39, factor: 'CON', inverted: false, texto: 'Sou extremamente confiável e cumpro rigorosamente os compromissos que assumo com o time.' },
  { id: 40, factor: 'CON', inverted: true,  texto: 'Costumo adiar tarefas administrativas maçantes ou burocráticas até o último momento.' },
  { id: 41, factor: 'CON', inverted: false, texto: 'Mantenho o foco na meta de longo prazo, mesmo quando surgem distrações diárias no setor.' },
  { id: 42, factor: 'CON', inverted: false, texto: 'Sou persistente e trabalho de forma incansável até que os objetivos do projeto sejam atingidos.' },
  { id: 43, factor: 'CON', inverted: false, texto: 'Gosto de planejar meus passos profissionais e seguir metodologias claras de trabalho.' },
  { id: 44, factor: 'CON', inverted: true,  texto: 'Sinto que renderia mais se o ambiente de trabalho fosse menos estruturado e sem tantas regras.' },
  { id: 45, factor: 'CON', inverted: false, texto: 'Garanto que as entregas sob minha responsabilidade tenham alto padrão de qualidade e precisão.' },
  { id: 46, factor: 'CON', inverted: false, texto: 'Costumo chegar antes do horário e me preparar com antecedência para reuniões importantes.' },
  { id: 47, factor: 'CON', inverted: true,  texto: 'Tenho minha mesa, minha caixa de e mail e meus arquivos digitais em desordem com frequência.' },
  { id: 48, factor: 'CON', inverted: false, texto: 'Antes de começar um projeto, costumo definir indicadores claros para medir o sucesso dele.' },
  { id: 49, factor: 'CON', inverted: true,  texto: 'Em projetos longos, deixo o esforço maior concentrado no final, perto da entrega.' },
  { id: 50, factor: 'CON', inverted: false, texto: 'Sou disciplinado(a) com meu tempo e respeito blocos de foco profundo na agenda.' },
  { id: 51, factor: 'CON', inverted: true,  texto: 'Tenho dificuldade em finalizar projetos que ficaram chatos no meio do caminho.' },
  { id: 52, factor: 'CON', inverted: false, texto: 'Acompanho métricas e indicadores semanalmente para corrigir o rumo do que estou liderando.' },
  { id: 53, factor: 'CON', inverted: false, texto: 'Documentar processos é parte natural da minha rotina de trabalho.' },
  { id: 54, factor: 'CON', inverted: true,  texto: 'Costumo confiar mais no improviso do que em check lists ou roteiros prontos.' },

  // ────────────────────────────────────────────────
  // FATOR 4, EST — Estabilidade Emocional (inverso de Neuroticismo)
  // ────────────────────────────────────────────────
  { id: 55, factor: 'EST', inverted: false, texto: 'Mantenho a calma, a clareza mental e a sobriedade mesmo sob forte pressão ou em momentos de crise.' },
  { id: 56, factor: 'EST', inverted: true,  texto: 'Percebo que oscilo de humor com frequência ou mudo de estado emocional facilmente durante o dia.' },
  { id: 57, factor: 'EST', inverted: false, texto: 'Lido bem com feedbacks negativos ou críticas à minha gestão, encarando os de forma racional.' },
  { id: 58, factor: 'EST', inverted: true,  texto: 'Costumo me sentir sobrecarregado(a), ansioso(a) ou tenso(a) diante de imprevistos operacionais.' },
  { id: 59, factor: 'EST', inverted: false, texto: 'Recupero me rapidamente de fracassos, perdas de metas ou frustrações profissionais.' },
  { id: 60, factor: 'EST', inverted: true,  texto: 'Preocupo me excessivamente com o que as pessoas ou a diretoria estão pensando sobre o meu desempenho.' },
  { id: 61, factor: 'EST', inverted: false, texto: 'Sinto me seguro(a) e confiante em relação à minha capacidade técnica e de liderança.' },
  { id: 62, factor: 'EST', inverted: true,  texto: 'Desestabilizo me facilmente quando as coisas não saem exatamente como eu havia planejado.' },
  { id: 63, factor: 'EST', inverted: false, texto: 'Consigo separar emoção pessoal de decisão profissional quando preciso bater uma decisão dura.' },
  { id: 64, factor: 'EST', inverted: true,  texto: 'Quando recebo um e mail ríspido, costumo ficar matutando o conteúdo por horas seguidas.' },
  { id: 65, factor: 'EST', inverted: false, texto: 'Em momentos de incerteza, sou a pessoa que o time olha em busca de calma e direção.' },
  { id: 66, factor: 'EST', inverted: true,  texto: 'Tenho noites de sono mal dormidas quando estou em períodos de cobrança intensa no trabalho.' },
  { id: 67, factor: 'EST', inverted: false, texto: 'Costumo conseguir desligar do trabalho nos fins de semana e momentos de descanso.' },
  { id: 68, factor: 'EST', inverted: true,  texto: 'Tenho tendência a remoer erros passados e ficar pensando no que deveria ter feito diferente.' },
  { id: 69, factor: 'EST', inverted: false, texto: 'Encaro mudanças de cenário e crises como oportunidades, não como ameaças.' },
  { id: 70, factor: 'EST', inverted: true,  texto: 'Sinto irritação fácil quando o time não rende no ritmo que eu esperava.' },
  { id: 71, factor: 'EST', inverted: false, texto: 'Mantenho minha postura corporal e tom de voz estáveis mesmo em discussões tensas.' },
  { id: 72, factor: 'EST', inverted: true,  texto: 'Costumo precisar de um tempo escondido(a) depois de reuniões emocionalmente carregadas.' },

  // ────────────────────────────────────────────────
  // FATOR 5, ABE — Inovação & Visão Estratégica (Abertura)
  // ────────────────────────────────────────────────
  { id: 73, factor: 'ABE', inverted: false, texto: 'Valorizo a criatividade e busco constantemente novas formas de resolver problemas antigos na empresa.' },
  { id: 74, factor: 'ABE', inverted: false, texto: 'Tenho facilidade para compreender conceitos abstratos, tendências de mercado e visões de longo prazo.' },
  { id: 75, factor: 'ABE', inverted: true,  texto: 'Prefiro rotinas de trabalho bem estabelecidas a ter que lidar com mudanças frequentes de escopo.' },
  { id: 76, factor: 'ABE', inverted: false, texto: 'Tenho forte interesse em aprender sobre novas tecnologias, inovações e metodologias disruptivas.' },
  { id: 77, factor: 'ABE', inverted: false, texto: 'Consigo conectar informações de diferentes áreas para criar soluções fora da caixa.' },
  { id: 78, factor: 'ABE', inverted: true,  texto: 'Considero me uma pessoa mais prática e focada no operacional do que voltada para teorias e estratégias.' },
  { id: 79, factor: 'ABE', inverted: false, texto: 'Aprecio a diversidade de opiniões, culturas e pontos de vista diferentes do meu na equipe.' },
  { id: 80, factor: 'ABE', inverted: true,  texto: 'Sinto desconforto quando preciso atuar em cenários de alta ambiguidade, onde não há respostas certas.' },
  { id: 81, factor: 'ABE', inverted: false, texto: 'Estimulo o time a questionar o status quo ("sempre foi feito assim") e a testar novos caminhos.' },
  { id: 82, factor: 'ABE', inverted: false, texto: 'Sinto forte atração por desafios intelectuais complexos que exijam reflexão profunda.' },
  { id: 83, factor: 'ABE', inverted: true,  texto: 'Prefiro focar em ideias simples, diretas e já testadas pelo mercado a assumir riscos inovadores.' },
  { id: 84, factor: 'ABE', inverted: false, texto: 'Costumo ler livros, papers ou conteúdos de áreas distantes da minha para abrir o repertório.' },
  { id: 85, factor: 'ABE', inverted: true,  texto: 'Acredito que mudar muito de estratégia confunde o time e atrapalha a execução.' },
  { id: 86, factor: 'ABE', inverted: false, texto: 'Sou rápido(a) em adotar ferramentas novas que prometem melhorar a produtividade do time.' },
  { id: 87, factor: 'ABE', inverted: false, texto: 'Tenho prazer em discutir cenários hipotéticos de futuro e tendências macroeconômicas.' },
  { id: 88, factor: 'ABE', inverted: true,  texto: 'Quando surge uma ideia totalmente nova, meu primeiro instinto é apontar os riscos e as falhas.' },
  { id: 89, factor: 'ABE', inverted: false, texto: 'Adapto me com facilidade a novos formatos de trabalho, novos sistemas e novos parceiros.' },
  { id: 90, factor: 'ABE', inverted: true,  texto: 'Costumo desconfiar de mudanças propostas por pessoas que ainda não têm anos de empresa.' },
]

// ── Helpers para o engine ─────────────────────────────────────

export function getBigFiveByFactor(factor: BigFiveFactor): BigFiveQuestion[] {
  return BIG_FIVE_QUESTIONS.filter(q => q.factor === factor)
}

export const BIG_FIVE_FACTOR_LABELS: Record<BigFiveFactor, string> = {
  EXT: 'Influência & Comunicação',
  AMB: 'Gestão de Pessoas & Empatia',
  CON: 'Foco em Resultados & Execução',
  EST: 'Estabilidade Emocional',
  ABE: 'Inovação & Visão Estratégica',
}

export const BIG_FIVE_FACTOR_DESCRIPTIONS: Record<BigFiveFactor, string> = {
  EXT: 'Mede a capacidade de comunicação, dominância, rede de contatos e energia social do líder.',
  AMB: 'Mede a inclinação para cooperação, confiança mútua, mediação de conflitos e foco na equipe.',
  CON: 'Mede o nível de organização, disciplina, orientação para metas, qualidade de entrega e foco.',
  EST: 'Mede a resiliência psicológica, o controle do estresse e o equilíbrio diante de crises ou frustrações.',
  ABE: 'Mede a flexibilidade cognitiva, a criatividade, o apetite por tecnologia e a capacidade de enxergar o macro.',
}

export const BIG_FIVE_FACTOR_COLORS: Record<BigFiveFactor, string> = {
  EXT: '#c4633a',
  AMB: '#7a9e7e',
  CON: '#3d4f7c',
  EST: '#c9a84c',
  ABE: '#c47a72',
}

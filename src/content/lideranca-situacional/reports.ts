// ============================================================
// Liderança Situacional — Textos de devolutiva (aprofundada)
// 4 estilos (S1 a S4), leitura de flexibilidade e de adaptabilidade.
// ============================================================

import type { LsStyle } from './questions'

export interface LsStyleReport {
  nome: string
  resumo: string
  visaoGeral: string
  quandoUsar: string
  superpoderes: { titulo: string; descricao: string }[]
  pontosCegos:  { titulo: string; descricao: string }[]
  planoDeAcao:  { titulo: string; descricao: string }[]
  brilhaEm: string
}

export const LS_STYLE_LABELS: Record<LsStyle, string> = {
  S1: 'S1 · Direcionador',
  S2: 'S2 · Orientador',
  S3: 'S3 · Apoiador',
  S4: 'S4 · Delegador',
}

export const LS_STYLE_SHORT: Record<LsStyle, string> = {
  S1: 'Direcionador',
  S2: 'Orientador',
  S3: 'Apoiador',
  S4: 'Delegador',
}

// descrição curta de cada estilo (para o radar)
export const LS_STYLE_DESC: Record<LsStyle, string> = {
  S1: 'Alta direção, baixo apoio. Diz o que, como e quando. Ideal para quem está começando.',
  S2: 'Alta direção, alto apoio. Orienta e motiva ao mesmo tempo. Ideal para quem aprende e oscila.',
  S3: 'Baixa direção, alto apoio. Escuta, encoraja e deixa decidir. Ideal para quem sabe mas hesita.',
  S4: 'Baixa direção, baixo apoio. Delega e confia. Ideal para quem domina e tem autonomia.',
}

export const LS_STYLE_REPORTS: Record<LsStyle, LsStyleReport> = {
  S1: {
    nome: 'Líder Direcionador',
    resumo: 'Você lidera com clareza e comando.',
    visaoGeral: 'O seu instinto é dar direção. Quando algo precisa sair do papel, você diz exatamente o que fazer, como e quando, e acompanha de perto. Isso te torna excelente em situações de início, crise ou alta pressão, onde o time precisa de comando firme e zero ambiguidade. Sua presença passa segurança a quem ainda não sabe o caminho. O risco aparece quando você usa esse mesmo comando com pessoas que já têm autonomia: aí vira controle, e o talento maduro se sente sufocado.',
    quandoUsar: 'Pessoas em onboarding, profissionais assumindo função nova, situações críticas que exigem execução rápida e padronizada.',
    superpoderes: [
      { titulo: 'Clareza sob pressão', descricao: 'Em meio ao caos, você organiza, define prioridades e dá o rumo. As pessoas sabem exatamente o que se espera delas.' },
      { titulo: 'Padrão e consistência', descricao: 'Você garante que o básico saia certo. Onde você dirige, a qualidade não fica ao acaso.' },
      { titulo: 'Aceleração de iniciantes', descricao: 'Quem está começando evolui rápido com você, porque recebe estrutura e correção imediata.' },
    ],
    pontosCegos: [
      { titulo: 'Microgestão com gente madura', descricao: 'Usar comando com quem já domina a tarefa gera desmotivação e fuga de talento. Nem todo mundo precisa ser dirigido.' },
      { titulo: 'Gargalo de decisão', descricao: 'Se tudo passa por você, o time para quando você não está. Você vira o teto da operação.' },
      { titulo: 'Pouco espaço para o outro crescer', descricao: 'Dirigir demais impede que as pessoas desenvolvam autonomia e dono do próprio resultado.' },
    ],
    planoDeAcao: [
      { titulo: 'Leia a maturidade antes de agir', descricao: 'Antes de dar a ordem, pergunte: essa pessoa precisa de direção ou já sabe o caminho? Ajuste o estilo ao nível dela.' },
      { titulo: 'Delegue uma decisão por semana', descricao: 'Escolha algo que você normalmente decidiria e passe para alguém do time. Treine soltar o controle aos poucos.' },
      { titulo: 'Pergunte mais, mande menos', descricao: 'Substitua parte das instruções por perguntas. Quem é levado a pensar desenvolve autonomia.' },
    ],
    brilhaEm: 'Operações críticas, integração de novatos, ambientes de alto risco ou compliance, viradas de crise e qualquer cenário que exija comando firme e padrão.',
  },
  S2: {
    nome: 'Líder Orientador',
    resumo: 'Você ensina enquanto conduz.',
    visaoGeral: 'Você combina direção com incentivo. Não só diz o caminho, mas explica o porquê, dá exemplo e motiva, abrindo espaço para a pessoa participar e ganhar confiança. É o estilo do líder que forma gente: orienta sem abandonar, sustenta enquanto a pessoa aprende. Funciona muito bem com quem já sabe o básico mas ainda oscila na segurança. O cuidado é não ficar orientando para sempre, segurando a mão de quem já poderia voar sozinho.',
    quandoUsar: 'Profissionais que conhecem o básico mas precisam de confiança, momentos de mudança em que a equipe precisa de segurança e direção ao mesmo tempo.',
    superpoderes: [
      { titulo: 'Forma talento', descricao: 'Você desenvolve pessoas de verdade. Junta o ensino com o estímulo, e elas crescem se sentindo apoiadas.' },
      { titulo: 'Engajamento na mudança', descricao: 'Em momentos de transição, você dá direção e segurança ao mesmo tempo, o que reduz medo e resistência.' },
      { titulo: 'Comunicação do porquê', descricao: 'Você não manda no escuro. Explica o sentido, e por isso o time entrega com mais convicção.' },
    ],
    pontosCegos: [
      { titulo: 'Orientar além da conta', descricao: 'Continuar instruindo quem já amadureceu trava a autonomia e consome o seu tempo sem necessidade.' },
      { titulo: 'Dificuldade de soltar', descricao: 'O zelo em formar pode virar dependência: o time se acostuma a sempre te consultar.' },
      { titulo: 'Excesso de reuniões e feedback', descricao: 'Tanto acompanhamento pode sufocar quem já está pronto para voos mais altos.' },
    ],
    planoDeAcao: [
      { titulo: 'Defina a régua da graduação', descricao: 'Para cada pessoa, combine o sinal de que ela está pronta para mais autonomia, e cumpra isso quando chegar a hora.' },
      { titulo: 'Reduza a frequência aos poucos', descricao: 'Conforme a pessoa amadurece, espace os check-ins. Mostre que confia, dando mais espaço.' },
      { titulo: 'Devolva a decisão', descricao: 'Em vez de recomendar o caminho, pergunte qual a pessoa escolheria, e apoie a escolha dela.' },
    ],
    brilhaEm: 'Desenvolvimento de equipes, onboarding avançado, gestão de mudança, formação de novos líderes e times em curva de aprendizado.',
  },
  S3: {
    nome: 'Líder Apoiador',
    resumo: 'Você lidera escutando e encorajando.',
    visaoGeral: 'O seu forte é o apoio. Com quem já tem competência, você ouve, valoriza, ajuda a pensar e devolve a confiança, sem impor o caminho. Isso destrava talentos experientes que estão inseguros ou desmotivados, e cria um ambiente de pertencimento. É o estilo do líder que faz o outro brilhar. O cuidado é não confundir apoio com ausência de direção: em situações que pedem comando, ou com quem ainda não sabe, só apoiar deixa a pessoa perdida.',
    quandoUsar: 'Profissionais experientes que estão desmotivados ou inseguros, situações em que a competência existe mas falta engajamento ou confiança.',
    superpoderes: [
      { titulo: 'Destrava talento maduro', descricao: 'Você tira o melhor de quem já sabe, dando espaço, escuta e confiança. As pessoas crescem perto de você.' },
      { titulo: 'Clima e pertencimento', descricao: 'Seu apoio constrói um ambiente seguro onde as pessoas se sentem vistas e querem ficar.' },
      { titulo: 'Mediação e escuta', descricao: 'Você acolhe a emoção, resolve atritos e ajuda o time a tomar decisões difíceis sem trauma.' },
    ],
    pontosCegos: [
      { titulo: 'Apoio onde falta direção', descricao: 'Com iniciantes ou em crises, só escutar não basta. A pessoa precisa de comando, e você pode demorar a dar.' },
      { titulo: 'Evitar a conversa dura', descricao: 'O cuidado com o vínculo pode adiar feedbacks e decisões impopulares que o time precisa.' },
      { titulo: 'Direção que fica vaga', descricao: 'Sem um norte claro, o apoio vira simpatia sem resultado. Time gosta de você, mas não sabe para onde ir.' },
    ],
    planoDeAcao: [
      { titulo: 'Combine apoio com clareza de meta', descricao: 'Acolha a pessoa, mas deixe o objetivo explícito. Apoiar não é abrir mão do resultado.' },
      { titulo: 'Treine a firmeza gentil', descricao: 'Pratique dar feedback duro com cuidado. É possível ser direto e humano na mesma conversa.' },
      { titulo: 'Suba a direção quando o contexto pedir', descricao: 'Diante de iniciante ou crise, troque conscientemente o estilo: ali, dar rumo é o maior cuidado.' },
    ],
    brilhaEm: 'Times seniores, retenção de talento, gestão de especialistas, ambientes criativos e culturas que dependem de engajamento e confiança.',
  },
  S4: {
    nome: 'Líder Delegador',
    resumo: 'Você lidera pela confiança e pela autonomia.',
    visaoGeral: 'Você confia e solta. Com gente madura, define o objetivo, alinha os limites e dá liberdade total para a pessoa decidir como chegar lá, atuando como facilitador e entrando só para destravar. Isso multiplica a sua liderança: o time anda sem você, e você foca no estratégico. É o ápice da maturidade de liderança quando aplicado a quem está pronto. O risco é delegar para quem ainda não tem condição, ou confundir autonomia com ausência: soltar sem clareza e sem presença vira abandono.',
    quandoUsar: 'Times maduros, com alta competência e motivação, profissionais sêniores com domínio do processo e autonomia comprovada.',
    superpoderes: [
      { titulo: 'Escala a liderança', descricao: 'Você não é gargalo. O time decide e entrega sem depender de você, e isso libera o seu tempo para o que é estratégico.' },
      { titulo: 'Empodera e retém', descricao: 'Dar autonomia real a quem merece é o que segura talento sênior. As pessoas se sentem donas.' },
      { titulo: 'Foco no que importa', descricao: 'Livre do operacional, você enxerga o todo, antecipa movimentos e atua onde só você pode atuar.' },
    ],
    pontosCegos: [
      { titulo: 'Delegar cedo demais', descricao: 'Passar autonomia a quem ainda não domina gera erro, insegurança e sensação de abandono.' },
      { titulo: 'Confundir delegar com sumir', descricao: 'Autonomia sem clareza de meta e sem presença mínima vira ausência. O time fica solto.' },
      { titulo: 'Perder o pulso do time', descricao: 'De longe demais, você pode demorar a perceber quando alguém regrediu ou precisa de você de novo.' },
    ],
    planoDeAcao: [
      { titulo: 'Calibre a delegação à maturidade', descricao: 'Delegue na medida do preparo de cada um. Para quem ainda aprende, volte um nível conscientemente.' },
      { titulo: 'Delegue com contrato claro', descricao: 'Ao soltar, deixe explícitos o objetivo, os limites e os pontos de checagem. Autonomia precisa de moldura.' },
      { titulo: 'Mantenha presença leve', descricao: 'Mesmo delegando, esteja disponível e acompanhe indicadores. Confiar não é desaparecer.' },
    ],
    brilhaEm: 'Times de alta performance, lideranças seniores, estruturas enxutas e maduras, e qualquer contexto que exija multiplicar resultado sem virar gargalo.',
  },
}

// ── Flexibilidade: quantos estilos a pessoa acessa ──
export interface LsLeitura { titulo: string; texto: string }

export function lerFlexibilidade(estilosUsados: number): LsLeitura {
  if (estilosUsados <= 1) {
    return { titulo: 'Flexibilidade baixa · Estilo único', texto: 'Você lidera quase sempre do mesmo jeito. Isso te dá consistência, mas vira limite: pessoas e situações diferentes pedem abordagens diferentes, e um só estilo não serve para todas. Ampliar o seu repertório é o maior salto de liderança disponível para você agora.' }
  }
  if (estilosUsados === 2) {
    return { titulo: 'Flexibilidade moderada · Dois estilos', texto: 'Você transita entre dois estilos, o que já te dá jogo de cintura em boa parte das situações. O ponto de atenção são os contextos que pedem os outros dois estilos que você quase não acessa: ali você tende a forçar o que já conhece, em vez de adaptar.' }
  }
  if (estilosUsados === 3) {
    return { titulo: 'Flexibilidade alta · Três estilos', texto: 'Você acessa três dos quatro estilos com naturalidade. É um repertório amplo, que cobre a maioria dos cenários de liderança. Falta apenas integrar o quarto estilo de forma consciente para fechar o ciclo completo.' }
  }
  return { titulo: 'Flexibilidade plena · Os quatro estilos', texto: 'Você transita pelos quatro estilos conforme a situação pede. Esse é o repertório completo da liderança situacional. O seu desafio deixa de ser ter os estilos e passa a ser escolher o certo na hora certa, que é a adaptabilidade.' }
}

// ── Adaptabilidade: o quanto escolheu o estilo apropriado à situação ──
export function lerAdaptabilidade(pct: number): LsLeitura {
  if (pct >= 75) {
    return { titulo: 'Adaptabilidade alta · Você lê o contexto', texto: 'Na maioria das situações, você escolheu o estilo certo para a maturidade de cada pessoa. Isso é o coração da liderança situacional: você não lidera no automático, você lê o cenário e ajusta. Líderes assim desenvolvem times mais rápido e perdem menos talento.' }
  }
  if (pct >= 45) {
    return { titulo: 'Adaptabilidade média · Acerta, mas oscila', texto: 'Em parte das situações você ajustou o estilo ao contexto, em outras aplicou o seu estilo preferido onde ele não era o ideal. O ganho está em desacoplar a sua zona de conforto da necessidade real: a pergunta certa antes de agir é qual o nível de maturidade dessa pessoa nesta tarefa.' }
  }
  return { titulo: 'Adaptabilidade a desenvolver · Lidera no automático', texto: 'Você tende a aplicar o mesmo estilo independentemente da situação. Funciona quando o contexto bate com a sua preferência, e falha quando não bate. O maior salto para você é treinar a leitura de maturidade antes de escolher como agir. A boa notícia: adaptabilidade se aprende com intenção.' }
}

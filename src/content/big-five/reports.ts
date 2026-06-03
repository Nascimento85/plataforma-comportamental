// ============================================================
// Big Five Liderança, 4 arquétipos de devolutiva
// Linguagem direta e comercial, sem hífens. Cada arquétipo segue
// a mesma anatomia: Visão Geral → Superpoderes → Pontos Cegos →
// Plano de Ação. Pronto para ser injetado no prompt Claude.
// ============================================================

import type { BigFiveFactor } from './questions'

// 4 arquétipos comerciais (combinações de fatores)
export type BigFiveArchetype =
  | 'INOVADOR'      // Alta ABE + Alta EXT
  | 'EXECUTOR'      // Alta CON + Alta EST
  | 'HUMANO'        // Alta AMB + Alta EXT (ou Alta EST)
  | 'ESPECIALISTA'  // Alta CON + Alta ABE + Baixa EXT

export interface BigFiveArchetypeReport {
  key:           BigFiveArchetype
  emoji:         string
  nome:          string
  combinacao:    string
  visaoGeral:    string
  superpoderes:  { titulo: string; descricao: string }[]
  pontosCegos:   { titulo: string; descricao: string }[]
  planoDeAcao:   { titulo: string; descricao: string }[]
  brilhaEm:      string
}

// ── Texto introdutório da devolutiva ──────────────────────────

export const BIG_FIVE_INTRO_DEVOLUTIVA = `Esta análise transforma cinco fatores científicos da personalidade em uma leitura prática do seu estilo de liderança. Você verá um gráfico com a sua nota em cada fator e, abaixo, o seu arquétipo de liderança predominante.

Não existe arquétipo bom ou ruim. Cada um brilha em contextos diferentes. O objetivo aqui é dar clareza sobre seus superpoderes e seus pontos cegos para você acelerar o próximo nível da sua carreira.`

// ============================================================
// REPOSITÓRIO DOS 4 ARQUÉTIPOS
// ============================================================

export const BIG_FIVE_ARCHETYPES: Record<BigFiveArchetype, BigFiveArchetypeReport> = {

  // ─────────────────────────────────────────────
  // 🚀 INOVADOR / ESTRATÉGICO
  // ─────────────────────────────────────────────
  INOVADOR: {
    key: 'INOVADOR',
    emoji: '🚀',
    nome: 'Líder Estratégico, Inovador',
    combinacao: 'Alta Inovação + Alta Influência',
    visaoGeral:
      'Você é o visionário do time. Sua mente naturalmente conecta tendências, antecipa cenários e enxerga oportunidades onde os outros só veem o operacional do dia. Sua energia social alta combinada com a sua flexibilidade cognitiva faz com que você inspire as pessoas pela visão de futuro: você não vende a tarefa, você vende o propósito macro. No ambiente corporativo, você é a liderança que abre portas, dá tração para novas frentes de negócio e entusiasma equipes em momentos de mudança intensa.',
    superpoderes: [
      {
        titulo: 'Visão de longo prazo aplicada',
        descricao: 'Você consegue traduzir tendências de mercado em projetos concretos para a empresa antes que a concorrência perceba. Onde outros leem notícia, você lê movimento.',
      },
      {
        titulo: 'Capacidade de inspirar e mobilizar',
        descricao: 'Quando você assume uma pauta, o time inteiro sente. Sua energia comunicativa transforma estratégia em narrativa, e narrativa em ação.',
      },
      {
        titulo: 'Conforto com ambiguidade',
        descricao: 'Em cenários de alta incerteza (lançamento, expansão, transformação digital), enquanto outros líderes travam por falta de roteiro, você floresce. A ambiguidade é o seu terreno.',
      },
    ],
    pontosCegos: [
      {
        titulo: 'Risco de superficialidade na execução',
        descricao: 'Pela sua paixão por começar coisas novas, você pode perder fôlego no meio do caminho. Sua equipe pode sentir que muda o foco com frequência demais e ficar perdida em qual prioridade defender.',
      },
      {
        titulo: 'Excesso de carisma como atalho',
        descricao: 'Você convence com facilidade nas reuniões e isso vira uma armadilha: pode aprovar coisas que ainda não estão maduras na análise. Veja se as suas decisões estão sustentadas por dados ou apenas pela força do seu discurso.',
      },
      {
        titulo: 'Subestimação dos detalhes',
        descricao: 'Processo, compliance, controle financeiro e padrão de qualidade podem parecer chatos para você. Liderados mais detalhistas podem se frustrar se sentirem que você "passa por cima" do trabalho minucioso deles.',
      },
    ],
    planoDeAcao: [
      {
        titulo: 'Faça dupla com um Executor',
        descricao: 'Identifique no seu time uma pessoa fortemente disciplinada e organizada (perfil Executor). Crie ritual semanal de 30 minutos com ela para ela traduzir suas grandes ideias em prazos, responsáveis e indicadores.',
      },
      {
        titulo: 'Aprenda a dizer "ainda não"',
        descricao: 'Antes de aprovar uma ideia nova trazida ao time, segure por 48 horas. Releia o pipeline já em andamento e pergunte: cabe agora ou compete com algo crítico? A maturidade de um Inovador está em proteger o time da próxima ideia brilhante.',
      },
      {
        titulo: 'Crie um "diário de execução"',
        descricao: 'Por 30 dias, anote ao final de cada semana qual decisão estratégica foi efetivamente entregue, e qual ficou apenas no PowerPoint. Esse exercício simples expõe seu padrão e te ajuda a calibrar o quanto começar versus quanto fechar.',
      },
    ],
    brilhaEm: 'Startups, áreas de marketing e produto, transformação digital, expansão internacional, abertura de novas frentes de negócio e times em ambientes de mudança rápida.',
  },

  // ─────────────────────────────────────────────
  // 🎯 EXECUTOR / DIRECIONAL
  // (texto original do Kênio, mantido literalmente)
  // ─────────────────────────────────────────────
  EXECUTOR: {
    key: 'EXECUTOR',
    emoji: '🎯',
    nome: 'Líder Direcional, Executor',
    combinacao: 'Alta Execução + Alta Estabilidade Emocional',
    visaoGeral:
      'Você é a âncora da operação. Seu estilo de liderança é pautado pela consistência, clareza de diretrizes e foco implacável na entrega de resultados. Onde muitos veem caos ou pressão, você enxerga métricas, prazos e processos a serem seguidos. Sua mente trabalha de forma estruturada: você prefere o realismo dos dados à volatilidade das promessas. No ambiente corporativo, você é a liderança que transmite segurança à diretoria e aos acionistas, pois quando você assume um compromisso ou uma meta, o mercado sabe que a entrega será feita com alto padrão de qualidade.',
    superpoderes: [
      {
        titulo: 'Cultura de Alta Performance',
        descricao: 'Você eleva a régua do time. Sob o seu comando, a equipe aprende o valor da disciplina, da pontualidade e do cumprimento rigoroso dos combinados.',
      },
      {
        titulo: 'Resiliência em Cenários de Crise',
        descricao: 'Em momentos de forte pressão ou imprevistos operacionais, você consegue isolar o estresse emocional e manter a clareza mental para tomar decisões puramente racionais.',
      },
      {
        titulo: 'Excelência Operacional',
        descricao: 'Você tem excelente faro para identificar gargalos em processos, desorganização de cronogramas e desperdício de recursos, reestruturando o setor com maestria.',
      },
    ],
    pontosCegos: [
      {
        titulo: 'Risco de Microgestão',
        descricao: 'Pela sua alta exigência com a qualidade, você pode cair na armadilha de centralizar tarefas ou acompanhar os processos de forma tão aproximada que sufoca a autonomia e a criatividade dos liderados mais seniores.',
      },
      {
        titulo: 'Percepção de Distanciamento Emocional',
        descricao: 'Como o seu foco principal está na tarefa e na meta, membros da equipe mais sensíveis ou que demandam liderança voltada para o acolhimento podem perceber você como uma pessoa fria, distante ou pouco empática.',
      },
      {
        titulo: 'Resistência a Mudanças Bruscas',
        descricao: 'Você performa muito bem dentro de métodos validados. Mudanças repentinas de escopo que pareçam "sem lógica" ou sem dados que as sustentem podem gerar um desconforto inicial em você.',
      },
    ],
    planoDeAcao: [
      {
        titulo: 'A Regra dos "Porquês" antes do "Como"',
        descricao: 'Ao delegar uma nova demanda difícil para a equipe, dedique os primeiros 10 minutos para explicar o propósito macro (por que estamos fazendo isso) antes de detalhar o processo operacional (como deve ser feito). Isso aumenta o engajamento emocional do time.',
      },
      {
        titulo: 'Exercite a "Delegação Gradual"',
        descricao: 'Identifique os dois profissionais mais maduros do seu time e entregue a eles a responsabilidade total por um projeto, do início ao fim. Force se a intervir apenas nos pontos de checagem alinhados previamente (checkpoints), dando espaço para que eles criem as próprias soluções.',
      },
      {
        titulo: 'Insira "Check ins Coletivos Humanos"',
        descricao: 'Uma vez por semana, comece a reunião de alinhamento com 5 minutos dedicados apenas a saber como as pessoas estão, sem falar de trabalho. Conectar se com o indivíduo antes de cobrar o profissional abrirá portas valiosas de lealdade na sua equipe.',
      },
    ],
    brilhaEm: 'Operações complexas, direções financeiras, logística, compliance, controladoria e momentos de reestruturação ou turnaround de empresas.',
  },

  // ─────────────────────────────────────────────
  // 🤝 HUMANO / FACILITADOR
  // ─────────────────────────────────────────────
  HUMANO: {
    key: 'HUMANO',
    emoji: '🤝',
    nome: 'Líder Humano, Facilitador',
    combinacao: 'Alta Empatia + Alta Influência',
    visaoGeral:
      'Você é o construtor de cultura. Sua liderança nasce da capacidade rara de enxergar a pessoa por trás do crachá e de criar ambientes em que as pessoas querem dar o seu melhor. Você sabe que resultado durável vem de gente comprometida, e que gente comprometida vem de gente que se sente vista. Sua energia social combinada com a sua empatia faz com que conflitos se dissolvam na sua presença e que talentos escolham ficar no seu time, mesmo recebendo propostas externas. Você é a liderança que segura a cultura nos momentos em que a empresa cresce rápido demais.',
    superpoderes: [
      {
        titulo: 'Construção de cultura como ativo',
        descricao: 'Você não fala de cultura em PowerPoint, você vive cultura no dia. Onde você passa, o clima organizacional melhora, as conversas ficam mais honestas e as pessoas se sentem mais seguras.',
      },
      {
        titulo: 'Mediação de conflitos com maestria',
        descricao: 'Você é a pessoa que outras lideranças chamam para destravar áreas em guerra. Sua habilidade de fazer cada lado se sentir ouvido e ainda assim apontar a saída prática é um superpoder raro no mercado.',
      },
      {
        titulo: 'Retenção e desenvolvimento de talentos',
        descricao: 'Pessoas que trabalham com você crescem rápido na carreira. Você enxerga potencial antes do título e investe tempo em formar liderados que vão te suceder.',
      },
    ],
    pontosCegos: [
      {
        titulo: 'Dificuldade em decisões duras',
        descricao: 'Demitir alguém que você gosta, demitir um amigo de time, dar feedback de baixa performance: tudo isso te custa caro emocionalmente. Você pode adiar conversas necessárias e pagar o preço em performance da área.',
      },
      {
        titulo: 'Risco de sobrecarregar a si mesmo(a)',
        descricao: 'Você diz sim com frequência demais para ajudar os outros. Pode acabar absorvendo tarefas que não eram suas e perdendo o foco na sua própria entrega estratégica. Equipes notam quando o líder humano está esgotado.',
      },
      {
        titulo: 'Risco de ser visto como pouco objetivo',
        descricao: 'Em ambientes muito orientados a dados, você pode ser percebido(a) como uma liderança "soft" demais. Diretoria de perfil Executor pode questionar se você sabe ser duro(a) quando a meta exige.',
      },
    ],
    planoDeAcao: [
      {
        titulo: 'Estruture rituais de feedback difícil',
        descricao: 'Reserve uma janela quinzenal específica para as conversas que você está adiando. Saiba que ser duro com clareza e respeito é uma das maiores formas de cuidado com a equipe. Liderado bom precisa do feedback verdadeiro para crescer.',
      },
      {
        titulo: 'Aprenda a dizer "não, e por quê"',
        descricao: 'Antes de aceitar uma nova demanda, pergunte se ela compete com o que já está no seu top 3 de prioridades estratégicas. Defender o seu calendário é defender a entrega da sua área.',
      },
      {
        titulo: 'Conecte cultura a indicadores',
        descricao: 'Traduza o seu trabalho de cultura em métricas que a diretoria entende: turnover, ENPS, ramp up de novos contratados, retenção dos talentos top. Você precisa mostrar o ROI do humano em linguagem financeira.',
      },
    ],
    brilhaEm: 'Gestão de Recursos Humanos, liderança de equipes criativas, áreas de atendimento ao cliente, Customer Success, gestão de times multiculturais ou em forte expansão de headcount.',
  },

  // ─────────────────────────────────────────────
  // 🧠 ESPECIALISTA / ANALÍTICO
  // ─────────────────────────────────────────────
  ESPECIALISTA: {
    key: 'ESPECIALISTA',
    emoji: '🧠',
    nome: 'Líder Analítico, Especialista',
    combinacao: 'Alta Execução + Alta Inovação + Energia Social mais reservada',
    visaoGeral:
      'Você é o líder técnico, o cérebro da operação. Sua autoridade nasce não do palco, mas da profundidade do seu conhecimento. Você combina a disciplina de quem entrega com a curiosidade de quem está sempre estudando o próximo movimento. Prefere uma sala silenciosa e uma boa planilha a um almoço de networking. No ambiente corporativo, você é a pessoa que a diretoria chama quando o problema é complexo demais para ser resolvido no improviso. Quando você dá o seu parecer, todos ouvem, porque sabem que vem com base.',
    superpoderes: [
      {
        titulo: 'Profundidade técnica reconhecida',
        descricao: 'Você é referência na sua área. As pessoas te procuram não por simpatia, mas porque sabem que você tem a resposta certa ou a metodologia mais sólida para chegar a ela.',
      },
      {
        titulo: 'Decisão baseada em dado, não em opinião',
        descricao: 'Em reuniões barulhentas onde todo mundo opina, você é a voz que traz o número, o estudo ou o histórico. Isso faz com que a sua palavra tenha peso desproporcional ao tempo que você fala.',
      },
      {
        titulo: 'Capacidade de antecipar problemas',
        descricao: 'Sua combinação de análise minuciosa com curiosidade pelo novo te dá um radar afiado para enxergar falhas antes delas estourarem. Quando você levanta a mão alertando algo, vale ouvir.',
      },
    ],
    pontosCegos: [
      {
        titulo: 'Comunicação técnica demais para a diretoria',
        descricao: 'Você sabe o que está falando, mas pode falhar em traduzir isso em linguagem de negócio. Diretores não querem o detalhe da implementação, querem o impacto financeiro e o risco. Treine sair do "como" para o "e daí".',
      },
      {
        titulo: 'Dificuldade em vender as próprias entregas',
        descricao: 'Por preferir o trabalho silencioso, você pode entregar resultados excelentes e ninguém ficar sabendo. Em organizações grandes, isso te custa visibilidade e promoções para perfis mais barulhentos, porém menos profundos.',
      },
      {
        titulo: 'Perfeccionismo como gargalo',
        descricao: 'Você pode segurar uma entrega esperando atingir 100% quando o cenário aceitaria 80% bem feito. Em ambientes acelerados, isso vira lentidão competitiva. Aprenda a distinguir o que precisa de ouro do que precisa só de prata bem polida.',
      },
    ],
    planoDeAcao: [
      {
        titulo: 'Treine o "elevator pitch" do seu projeto',
        descricao: 'Toda semana, escreva em três frases (sem jargão técnico) o impacto financeiro, o risco e o próximo passo do principal projeto que você lidera. Use essas três frases sempre que cruzar com um diretor no corredor ou no café.',
      },
      {
        titulo: 'Crie aliados nas áreas barulhentas',
        descricao: 'Identifique duas pessoas comunicativas e influentes em áreas adjacentes (Marketing, Comercial, RH). Mantenha um café trimestral com elas. Quando elas conhecerem o que você faz, vão amplificar seu nome dentro da organização sem você precisar se expor.',
      },
      {
        titulo: 'Adote a regra do MVP em entregas internas',
        descricao: 'Para cada projeto novo, defina uma versão mínima viável que pode ser apresentada em até 30 dias. Entregue rápido, aprenda, melhore. Velocidade no aprendizado vale mais que perfeição na primeira tentativa.',
      },
    ],
    brilhaEm: 'Áreas de Tecnologia, Engenharia, Pesquisa e Desenvolvimento, Controladoria, Tributário, Compliance, Data Science, Atuária e qualquer função em que a profundidade técnica seja o principal ativo do líder.',
  },
}

// ============================================================
// Lógica de cruzamento: qual arquétipo a pessoa é?
// Recebe as porcentagens (0 a 100) de cada um dos 5 fatores e
// devolve o arquétipo mais provável.
// ============================================================

export function detectArchetype(
  percentages: Record<BigFiveFactor, number>,
): BigFiveArchetype {
  const ALTO = 65
  const BAIXO = 45

  const { EXT, AMB, CON, EST, ABE } = percentages

  // Pontua cada arquétipo conforme aderência aos critérios
  const scores: Record<BigFiveArchetype, number> = {
    INOVADOR:     0,
    EXECUTOR:     0,
    HUMANO:       0,
    ESPECIALISTA: 0,
  }

  // INOVADOR: Alta ABE + Alta EXT
  scores.INOVADOR += ABE >= ALTO ? 2 : ABE
  scores.INOVADOR += EXT >= ALTO ? 2 : EXT * 0.6

  // EXECUTOR: Alta CON + Alta EST
  scores.EXECUTOR += CON >= ALTO ? 2 : CON
  scores.EXECUTOR += EST >= ALTO ? 2 : EST * 0.6

  // HUMANO: Alta AMB + Alta EXT (ou Alta EST)
  scores.HUMANO   += AMB >= ALTO ? 2 : AMB
  scores.HUMANO   += Math.max(EXT, EST) >= ALTO ? 2 : Math.max(EXT, EST) * 0.6

  // ESPECIALISTA: Alta CON + Alta ABE + Baixa EXT
  scores.ESPECIALISTA += CON >= ALTO ? 2 : CON
  scores.ESPECIALISTA += ABE >= ALTO ? 2 : ABE * 0.8
  scores.ESPECIALISTA += EXT <= BAIXO ? 2 : (100 - EXT) * 0.4

  // Maior score vence; em empate, EXECUTOR > HUMANO > INOVADOR > ESPECIALISTA
  const orderedKeys: BigFiveArchetype[] = ['EXECUTOR', 'HUMANO', 'INOVADOR', 'ESPECIALISTA']
  let best: BigFiveArchetype = 'EXECUTOR'
  let bestScore = -Infinity
  for (const key of orderedKeys) {
    if (scores[key] > bestScore) {
      bestScore = scores[key]
      best = key
    }
  }
  return best
}

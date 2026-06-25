// ============================================================
// Mapa da Comunicação — Textos de devolutiva
// Perfil (Murphy), estilo social e termômetro de assertividade (CNV).
// ============================================================

export type CommPerfil = 'ANALITICO' | 'INTUITIVO' | 'FUNCIONAL' | 'EMOCIONAL'
export type CommSocial = 'EXPRESSIVO' | 'APOIADOR' | 'DIRETIVO' | 'ANALITICO_S'
export type CommAssert = 'PASSIVA' | 'AGRESSIVA' | 'PASSIVO_AGRESSIVA' | 'ASSERTIVA'

export interface CommPerfilReport {
  nome: string
  resumo: string
  visaoGeral: string
  superpoderes: { titulo: string; descricao: string }[]
  pontosCegos:  { titulo: string; descricao: string }[]
  comoAdaptar:  { titulo: string; descricao: string }[]
  brilhaEm: string
}

export const COMM_PERFIL_LABELS: Record<CommPerfil, string> = {
  ANALITICO: 'Analítico',
  INTUITIVO: 'Intuitivo',
  FUNCIONAL: 'Funcional',
  EMOCIONAL: 'Emocional',
}
export const COMM_PERFIL_DESC: Record<CommPerfil, string> = {
  ANALITICO: 'Fala a língua dos dados, da lógica e da precisão. Quer fatos antes de conclusões.',
  INTUITIVO: 'Fala a língua da visão e das ideias. Quer o panorama, sem se perder em detalhes.',
  FUNCIONAL: 'Fala a língua do processo. Quer o passo a passo, prazos e quem faz o quê.',
  EMOCIONAL: 'Fala a língua das pessoas. Quer conexão, tom respeitoso e impacto humano.',
}

export const COMM_PERFIL_REPORTS: Record<CommPerfil, CommPerfilReport> = {
  ANALITICO: {
    nome: 'Comunicador Analítico',
    resumo: 'Você comunica com dado, lógica e precisão.',
    visaoGeral: 'A sua comunicação nasce da razão. Você quer fatos, números e coerência antes de qualquer conclusão, e transmite as ideias com exatidão e fundamento. Isso te dá uma credibilidade enorme: quando você fala, as pessoas sabem que vem embasado. O cuidado é que nem todo mundo decide por dado. Com perfis mais intuitivos ou emocionais, excesso de detalhe esfria e cansa, e a sua mensagem corre o risco de não conectar mesmo estando certa.',
    superpoderes: [
      { titulo: 'Credibilidade pelo embasamento', descricao: 'Sua palavra tem peso porque vem com prova. Você reduz erros e traz segurança técnica para a mesa.' },
      { titulo: 'Clareza lógica', descricao: 'Você organiza o raciocínio de forma que ninguém se perde. O argumento fica difícil de refutar.' },
      { titulo: 'Decisão sem achismo', descricao: 'Onde os outros opinam, você traz o número. Isso ancora as conversas em realidade.' },
    ],
    pontosCegos: [
      { titulo: 'Excesso de detalhe', descricao: 'Você pode afogar a mensagem em dados e perder quem só queria o panorama. Nem todo público quer a planilha inteira.' },
      { titulo: 'Frieza percebida', descricao: 'O foco na lógica pode soar distante. As pessoas captam pouca emoção e podem te achar fechado.' },
      { titulo: 'Lentidão para concluir', descricao: 'A busca pela exatidão pode adiar decisões que já tinham dados suficientes.' },
    ],
    comoAdaptar: [
      { titulo: 'Com Intuitivos', descricao: 'Comece pela conclusão e pelo impacto. Dê o panorama primeiro, e ofereça os dados só se pedirem.' },
      { titulo: 'Com Emocionais', descricao: 'Inclua o lado humano. Antes do número, diga como aquilo afeta as pessoas.' },
      { titulo: 'Com Funcionais', descricao: 'Traduza o dado em ação. Fale o que isso muda no processo e nos próximos passos.' },
    ],
    brilhaEm: 'Áreas técnicas, finanças, dados, jurídico, engenharia e qualquer contexto em que a precisão e o embasamento são o ativo principal da comunicação.',
  },
  INTUITIVO: {
    nome: 'Comunicador Intuitivo',
    resumo: 'Você comunica por visão, ideias e rapidez.',
    visaoGeral: 'A sua comunicação parte do todo. Você enxerga o panorama, conecta pontos e vai direto à essência, sem paciência para detalhes que considera secundários. Isso te torna rápido, estratégico e ótimo para abrir caminhos e inspirar direção. O cuidado é que, na pressa pela visão geral, você pode pular etapas, ser vago no como, ou atropelar perfis que precisam de detalhe e processo para confiar.',
    superpoderes: [
      { titulo: 'Visão de conjunto', descricao: 'Você comunica o todo e a direção. Em segundos, as pessoas entendem aonde se quer chegar.' },
      { titulo: 'Rapidez e síntese', descricao: 'Você corta o supérfluo e vai ao ponto. Conversas com você rendem.' },
      { titulo: 'Conexão de ideias', descricao: 'Você junta o que parecia solto e cria significado novo. Inspira possibilidades.' },
    ],
    pontosCegos: [
      { titulo: 'Vago no como', descricao: 'Você dá a visão mas pode deixar a execução no escuro. Quem precisa de passo a passo fica perdido.' },
      { titulo: 'Impaciência com detalhe', descricao: 'Você pula etapas e pode parecer que despreza o cuidado dos perfis mais analíticos ou funcionais.' },
      { titulo: 'Salto de assunto', descricao: 'A mente rápida muda de tema antes de fechar o anterior, e o interlocutor se perde.' },
    ],
    comoAdaptar: [
      { titulo: 'Com Analíticos', descricao: 'Sustente a visão com pelo menos alguns dados. Eles precisam de prova, não só de inspiração.' },
      { titulo: 'Com Funcionais', descricao: 'Depois da visão, desça para o passo a passo. Diga o primeiro movimento concreto.' },
      { titulo: 'Com Emocionais', descricao: 'Desacelere e inclua as pessoas. A visão engaja mais quando vem com cuidado humano.' },
    ],
    brilhaEm: 'Estratégia, inovação, liderança visionária, vendas consultivas e qualquer papel que exija enxergar e comunicar o todo rapidamente.',
  },
  FUNCIONAL: {
    nome: 'Comunicador Funcional',
    resumo: 'Você comunica por processo, ordem e passo a passo.',
    visaoGeral: 'A sua comunicação é prática e organizada. Você detalha o processo, define prazos, responsabilidades e não deixa pontas soltas. As pessoas confiam em você porque com você nada se perde: o que precisa ser dito, é dito, na ordem certa. O cuidado é que o excesso de detalhe e sequência pode cansar perfis intuitivos, que só querem a essência, e fazer a comunicação parecer lenta ou burocrática quando o momento pede agilidade.',
    superpoderes: [
      { titulo: 'Clareza de execução', descricao: 'Com você, todo mundo sabe o que fazer, como e quando. Sua comunicação vira plano.' },
      { titulo: 'Nada se perde', descricao: 'Você amarra as pontas, registra e acompanha. Reduz mal-entendidos e retrabalho.' },
      { titulo: 'Confiabilidade', descricao: 'O que você comunica acontece. Isso gera uma confiança operacional enorme.' },
    ],
    pontosCegos: [
      { titulo: 'Detalhe demais', descricao: 'Você pode encher a mensagem de etapas e perder quem só queria o resumo. O panorama some no processo.' },
      { titulo: 'Rigidez', descricao: 'O apego ao passo a passo pode travar a adaptação quando o contexto muda.' },
      { titulo: 'Percepção de lentidão', descricao: 'Em ambientes acelerados, tanto detalhamento pode parecer burocracia.' },
    ],
    comoAdaptar: [
      { titulo: 'Com Intuitivos', descricao: 'Dê o panorama antes do passo a passo. Resuma o destino, e só então detalhe o caminho.' },
      { titulo: 'Com Emocionais', descricao: 'Lembre do humano. Antes do processo, conecte com como aquilo afeta as pessoas.' },
      { titulo: 'Com Analíticos', descricao: 'Mostre o critério por trás do processo. Eles confiam mais quando entendem o porquê das etapas.' },
    ],
    brilhaEm: 'Operações, gestão de projetos, processos, qualidade, logística e qualquer função em que organização e execução clara são o coração da comunicação.',
  },
  EMOCIONAL: {
    nome: 'Comunicador Emocional',
    resumo: 'Você comunica por conexão, empatia e pessoas.',
    visaoGeral: 'A sua comunicação começa pelo humano. Você lê o clima, cuida do tom e fala olhando para como as pessoas se sentem e se relacionam. Isso te torna um construtor de confiança e um excelente mediador: perto de você, as pessoas se abrem e se sentem respeitadas. O cuidado é que, na atenção ao vínculo, você pode adiar a mensagem dura, ficar vago no concreto ou levar para o pessoal um assunto que era técnico.',
    superpoderes: [
      { titulo: 'Constrói confiança', descricao: 'Você cria um ambiente em que as pessoas se sentem seguras para falar. Isso destrava conversas difíceis.' },
      { titulo: 'Leitura de clima', descricao: 'Você percebe o não dito, o desconforto e a emoção por trás das palavras, e ajusta a comunicação.' },
      { titulo: 'Mediação', descricao: 'Você acolhe os lados, reduz a tensão e ajuda o grupo a se entender.' },
    ],
    pontosCegos: [
      { titulo: 'Adia o difícil', descricao: 'O cuidado com o vínculo pode fazer você suavizar tanto que a mensagem importante se perde.' },
      { titulo: 'Vago no concreto', descricao: 'Com foco no sentimento, você pode deixar dados, prazos e decisões pouco claros.' },
      { titulo: 'Leva para o pessoal', descricao: 'Você pode interpretar como pessoal um feedback que era apenas técnico, e se magoar sem necessidade.' },
    ],
    comoAdaptar: [
      { titulo: 'Com Analíticos', descricao: 'Traga também dado e objetividade. Eles confiam na lógica, não só no tom acolhedor.' },
      { titulo: 'Com Diretivos', descricao: 'Vá ao ponto. Diga o que precisa de forma curta, sem rodeios, e só então cuide do clima.' },
      { titulo: 'Com Funcionais', descricao: 'Inclua o concreto. Depois do cuidado humano, deixe claros os próximos passos.' },
    ],
    brilhaEm: 'Recursos humanos, atendimento, liderança de pessoas, customer success, saúde e qualquer papel em que vínculo e confiança são o ativo central.',
  },
}

// ── Estilo social (camada secundária, mais leve) ──
export const COMM_SOCIAL_LABELS: Record<CommSocial, string> = {
  EXPRESSIVO: 'Expressivo',
  APOIADOR: 'Apoiador',
  DIRETIVO: 'Diretivo',
  ANALITICO_S: 'Analítico',
}
export const COMM_SOCIAL_DESC: Record<CommSocial, string> = {
  EXPRESSIVO: 'Você traz energia, entusiasmo e calor. Engaja e motiva, mas cuide para não falar demais nem perder o foco.',
  APOIADOR: 'Você traz escuta, harmonia e empatia. Gera confiança, mas cuide da dificuldade de dizer não e dar feedback duro.',
  DIRETIVO: 'Você traz objetividade e foco em resultado. Faz acontecer, mas cuide para não soar frio ou impaciente.',
  ANALITICO_S: 'Você traz calma, dado e racionalidade. Transmite segurança, mas cuide para não ficar monótono ou lento.',
}

// ── Termômetro de assertividade (CNV) ──
export const COMM_ASSERT_LABELS: Record<CommAssert, string> = {
  PASSIVA: 'Passiva',
  AGRESSIVA: 'Agressiva',
  PASSIVO_AGRESSIVA: 'Passivo-Agressiva',
  ASSERTIVA: 'Assertiva',
}
export const COMM_ASSERT_DESC: Record<CommAssert, string> = {
  PASSIVA: 'Você cede e se cala para evitar conflito. Suas necessidades ficam para trás, e o ressentimento se acumula.',
  AGRESSIVA: 'Você impõe e julga, passando por cima do outro. É a comunicação violenta: ganha a discussão, mas perde a relação.',
  PASSIVO_AGRESSIVA: 'Você esconde a hostilidade em ironia, silêncio ou boicote. O conflito não some, só vira veneno lento.',
  ASSERTIVA: 'Você se expressa com clareza, firmeza e respeito. É a comunicação não violenta: defende o seu sem atacar o outro.',
}

export interface CommTermometro { chave: string; titulo: string; texto: string }

export function lerTermometro(pctAssertiva: number, deslizeDominante: CommAssert): CommTermometro {
  const desliceTxt: Record<CommAssert, string> = {
    PASSIVA: 'tende a recuar e se calar (passiva)',
    AGRESSIVA: 'tende a impor e julgar (agressiva, o lado violento)',
    PASSIVO_AGRESSIVA: 'tende ao sarcasmo e ao boicote indireto (passivo-agressiva)',
    ASSERTIVA: 'mantém a assertividade',
  }
  if (pctAssertiva >= 70) {
    return {
      chave: 'ALTA',
      titulo: 'Comunicação predominantemente não violenta',
      texto: 'Na maioria das situações de tensão você se mantém assertivo: fala o que precisa com clareza e respeito, sem se anular nem atacar. Esse é o equilíbrio de ouro da comunicação. Quando escorrega, você ' + desliceTxt[deslizeDominante] + '. Observar esse gatilho é o que te leva ao topo.',
    }
  }
  if (pctAssertiva >= 40) {
    return {
      chave: 'MEDIA',
      titulo: 'Assertividade oscilante sob pressão',
      texto: 'Em situações calmas você se comunica bem, mas sob pressão a sua assertividade balança e você ' + desliceTxt[deslizeDominante] + '. A boa notícia: assertividade não é dom, é treino. Reconhecer o seu deslize mais comum já é meio caminho para não cair nele no calor do momento.',
    }
  }
  return {
    chave: 'BAIXA',
    titulo: 'A assertividade é o seu maior salto',
    texto: 'Diante de conflito e pressão, você raramente se mantém assertivo: você ' + desliceTxt[deslizeDominante] + '. Isso custa caro, em relações desgastadas ou em necessidades que nunca são atendidas. Treinar a comunicação não violenta (descrever o fato, nomear o sentimento, pedir com clareza) é a mudança que mais vai transformar a sua vida profissional e pessoal.',
  }
}

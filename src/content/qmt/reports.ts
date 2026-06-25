// ============================================================
// QMT — Textos de devolutiva (devolutiva aprofundada)
// 6 perfis combinados (dominante + apoio), descrição por dimensão,
// leitura de hemisfério e de equilíbrio.
// ============================================================

import type { QmtDim } from './questions'

export type QmtComboKey = 'CI' | 'CP' | 'IC' | 'IP' | 'PC' | 'PI'

export interface QmtComboReport {
  nome: string
  combinacao: string
  visaoGeral: string
  superpoderes: { titulo: string; descricao: string }[]
  pontosCegos:  { titulo: string; descricao: string }[]
  planoDeAcao:  { titulo: string; descricao: string }[]
  brilhaEm: string
}

export const QMT_DIM_LABELS: Record<QmtDim, string> = {
  C: 'Conceitual · Estratégia',
  I: 'Intuitivo · Pessoas',
  P: 'Processual · Execução',
}

export const QMT_DIM_DESC: Record<QmtDim, string> = {
  C: 'A mente do porquê. Pensa em sistemas, futuro e propósito. Sintetiza o complexo em direção.',
  I: 'A mente do quem. Sente o clima, lê o não dito e move pelo vínculo e pela emoção.',
  P: 'A mente do como. Foca no concreto, na ordem e na entrega. Transforma plano em realidade.',
}

export const QMT_COMBO_REPORTS: Record<QmtComboKey, QmtComboReport> = {
  CI: {
    nome: 'O Visionário Humanista',
    combinacao: 'Conceitual dominante + Intuitivo de apoio',
    visaoGeral: 'Você pensa grande e pensa em gente. Sua mente parte da estratégia e do propósito, mas nunca esquece o impacto humano por trás das ideias. Enxerga o futuro com clareza e consegue inspirar pessoas a caminharem até lá. É o tipo de líder que desenha uma visão e faz os outros se apaixonarem por ela. Sua força está em unir o porquê com o quem: ideias que elevam, e pessoas que se sentem parte.',
    superpoderes: [
      { titulo: 'Visão que mobiliza', descricao: 'Você não só enxerga longe, você traduz isso em algo que toca as pessoas. Sua estratégia vem com alma, e por isso engaja.' },
      { titulo: 'Leitura de propósito e de gente', descricao: 'Percebe ao mesmo tempo o rumo certo e o estado emocional do time. Decide olhando para o todo sem atropelar o humano.' },
      { titulo: 'Inspiração natural', descricao: 'Comunica ideias abstratas de um jeito que aquece. As pessoas saem de perto de você acreditando que algo grande é possível.' },
    ],
    pontosCegos: [
      { titulo: 'Distância da execução', descricao: 'Você brilha no porquê e no quem, mas o como pode ficar solto. Visão sem processo vira sonho que não sai do papel.' },
      { titulo: 'Excesso de futuro', descricao: 'Pode se empolgar com o próximo horizonte antes de consolidar o atual. Cuidado com começar muitas frentes e fechar poucas.' },
      { titulo: 'Aversão ao detalhe', descricao: 'Burocracia e minúcia te cansam, e você tende a delegar isso cedo demais, perdendo o controle de pontos críticos.' },
    ],
    planoDeAcao: [
      { titulo: 'Adote um parceiro Processual', descricao: 'Tenha ao seu lado alguém forte em execução. Você dá a direção, ele garante que vire entrega. Essa dupla é imbatível.' },
      { titulo: 'Aterrisse a visão em marcos', descricao: 'Para cada grande ideia, defina os três primeiros passos concretos e datas. Visão só vira realidade quando ganha cronograma.' },
      { titulo: 'Feche antes de abrir', descricao: 'Antes de iniciar uma nova frente, conclua a anterior. Disciplina de fechamento multiplica o seu impacto.' },
    ],
    brilhaEm: 'Liderança inspiradora, fundação de empresas, áreas de inovação, cultura e propósito, mentoria e qualquer papel que precise unir visão estratégica com engajamento de pessoas.',
  },
  CP: {
    nome: 'O Estrategista Executor',
    combinacao: 'Conceitual dominante + Processual de apoio',
    visaoGeral: 'Você é a mente que planeja e faz acontecer. Pensa em sistemas, metas e eficiência, e tem a disciplina de transformar estratégia em resultado. Onde muitos só sonham ou só executam, você faz as duas coisas: desenha o caminho e garante que ele seja percorrido. É o perfil clássico do administrador estrategista, aquele que a organização confia para tirar um plano do papel com método.',
    superpoderes: [
      { titulo: 'Estratégia com método', descricao: 'Você une a visão de longo prazo à disciplina de execução. Pensa onde quer chegar e já estrutura como chegar lá.' },
      { titulo: 'Eficiência sistêmica', descricao: 'Enxerga o processo inteiro e otimiza. Corta desperdício, organiza fluxos e faz a máquina rodar melhor.' },
      { titulo: 'Decisão baseada em lógica e dado', descricao: 'Suas escolhas têm fundamento. Você combina raciocínio estratégico com fatos concretos, o que dá peso à sua palavra.' },
    ],
    pontosCegos: [
      { titulo: 'O fator humano em segundo plano', descricao: 'Focado em metas e sistemas, você pode tratar pessoas como peças do processo. Times sentem quando falta calor.' },
      { titulo: 'Rigidez com o plano', descricao: 'Investe tanto na estrutura que pode resistir a mudanças necessárias. Nem todo desvio é erro, alguns são adaptação.' },
      { titulo: 'Impaciência com o emocional', descricao: 'Conversas sobre sentimento podem te parecer perda de tempo, mas é nelas que o engajamento se sustenta.' },
    ],
    planoDeAcao: [
      { titulo: 'Reserve tempo para o quem', descricao: 'Inclua na sua agenda momentos de escuta genuína do time. Pergunte como as pessoas estão, não só como as tarefas estão.' },
      { titulo: 'Pratique a flexibilidade tática', descricao: 'Antes de defender o plano, pergunte se o contexto mudou. Ajustar rota não é fraqueza, é inteligência.' },
      { titulo: 'Traduza meta em significado', descricao: 'Ao cobrar um número, conecte ele a um propósito. Pessoas entregam mais quando entendem o sentido por trás da meta.' },
    ],
    brilhaEm: 'Gestão executiva, operações, planejamento estratégico, controladoria, consultoria, gestão de projetos e qualquer função que exija transformar visão em resultado com método.',
  },
  IC: {
    nome: 'O Educador Criativo',
    combinacao: 'Intuitivo dominante + Conceitual de apoio',
    visaoGeral: 'Você usa a sensibilidade para criar e ensinar. Sente as pessoas e o clima, mas tem uma mente que transforma essa percepção em ideias e conceitos novos. É o perfil do criativo que inspira, do educador que abre cabeças, do comunicador que faz o complexo virar significado. Sua força está em pegar o humano e elevá lo a uma ideia maior.',
    superpoderes: [
      { titulo: 'Criatividade com empatia', descricao: 'Suas ideias nascem da leitura fina das pessoas. Você cria o que toca, porque parte do que sente no outro.' },
      { titulo: 'Comunicação que transforma', descricao: 'Tem o dom de explicar conceitos de um jeito humano e memorável. Ensina, inspira e faz pensar.' },
      { titulo: 'Antena para o intangível', descricao: 'Percebe tendências, climas e possibilidades antes dos outros. Conecta pontos que parecem soltos.' },
    ],
    pontosCegos: [
      { titulo: 'Dificuldade com o concreto', descricao: 'Vive entre ideias e sentimentos, e a execução prática pode ficar para trás. Falta o como sustentar o que você imagina.' },
      { titulo: 'Oscilação emocional', descricao: 'Sua sensibilidade é força, mas também te deixa exposto a altos e baixos que afetam a constância.' },
      { titulo: 'Dispersão', descricao: 'Muitas ideias ao mesmo tempo podem virar nenhuma concluída. Foco é o seu desafio recorrente.' },
    ],
    planoDeAcao: [
      { titulo: 'Ancore a criatividade em estrutura', descricao: 'Escolha uma ideia por vez e dê a ela um esqueleto simples de execução. Criatividade rende mais com trilhos.' },
      { titulo: 'Crie rituais de constância', descricao: 'Estabeleça rotinas que te protejam das oscilações: horários fixos, pequenas metas diárias, um sistema externo de organização.' },
      { titulo: 'Feche o ciclo', descricao: 'Comprometa se a entregar, não só a conceber. Uma ideia executada vale mais que dez admiradas.' },
    ],
    brilhaEm: 'Educação, comunicação, marketing, conteúdo, design, facilitação, recursos humanos, mentoria e qualquer papel criativo que envolva inspirar e desenvolver pessoas.',
  },
  IP: {
    nome: 'O Executor Relacional',
    combinacao: 'Intuitivo dominante + Processual de apoio',
    visaoGeral: 'Você faz as coisas acontecerem através das pessoas. Sua mente parte do vínculo e da emoção, mas tem a mão na massa para entregar. É o perfil que cuida e executa ao mesmo tempo, que mantém o time unido enquanto garante que o trabalho saia. As pessoas confiam em você porque sentem que você se importa, e entregam com você porque você também põe a mão.',
    superpoderes: [
      { titulo: 'Liderança pelo cuidado', descricao: 'Você conduz pela relação, não pela imposição. As pessoas te seguem porque se sentem vistas e amparadas.' },
      { titulo: 'Execução com calor humano', descricao: 'Entrega resultado sem perder a humanidade. Faz acontecer cuidando de quem faz acontecer junto.' },
      { titulo: 'Mediação prática', descricao: 'Resolve conflitos e destrava times no dia a dia. Junta o lado emocional com a solução concreta.' },
    ],
    pontosCegos: [
      { titulo: 'Visão de curto alcance', descricao: 'Tão focado no agora e nas pessoas que o horizonte estratégico pode escapar. Falta o porquê de longo prazo.' },
      { titulo: 'Sobrecarga por acolher demais', descricao: 'Cuida tanto dos outros que pode se esquecer de si e assumir o que não é seu. Risco de esgotamento.' },
      { titulo: 'Dificuldade com decisões duras', descricao: 'O apego às pessoas pode travar escolhas necessárias mas impopulares.' },
    ],
    planoDeAcao: [
      { titulo: 'Erga os olhos para o horizonte', descricao: 'Reserve momentos para pensar estratégia, não só operação. Pergunte: para onde isso tudo está indo?' },
      { titulo: 'Estabeleça limites de cuidado', descricao: 'Ajudar não é assumir. Devolva responsabilidades e proteja a sua energia para liderar com constância.' },
      { titulo: 'Treine a decisão difícil', descricao: 'Pratique separar o cuidado com a pessoa da necessidade da decisão. É possível ser firme e humano ao mesmo tempo.' },
    ],
    brilhaEm: 'Liderança de times, gestão de pessoas, atendimento, operações com forte componente humano, saúde, hospitalidade e qualquer função em que relacionamento e entrega andam juntos.',
  },
  PC: {
    nome: 'O Técnico Especialista',
    combinacao: 'Processual dominante + Conceitual de apoio',
    visaoGeral: 'Você executa com uma lógica sistêmica forte. Sua mente é prática e detalhista, mas sustentada por um raciocínio estruturado que entende o porquê das coisas. É o perfil do especialista que domina o como e ainda enxerga o sistema por trás. Onde outros só seguem o manual, você entende a engrenagem inteira e a faz funcionar melhor. Sua autoridade vem da profundidade técnica.',
    superpoderes: [
      { titulo: 'Profundidade técnica com lógica', descricao: 'Você não só executa, você entende a fundo. Domina o detalhe e a estrutura que o sustenta.' },
      { titulo: 'Confiabilidade total', descricao: 'O que passa pela sua mão sai impecável e no prazo. As pessoas confiam cegamente na sua entrega.' },
      { titulo: 'Solução de problemas concretos', descricao: 'Diante de um problema técnico, você isola a causa e resolve com precisão cirúrgica.' },
    ],
    pontosCegos: [
      { titulo: 'Pouca conexão humana', descricao: 'Focado na tarefa e no sistema, você pode negligenciar o lado relacional. Times sentem distância.' },
      { titulo: 'Perfeccionismo paralisante', descricao: 'A busca pelo impecável pode atrasar entregas que já estavam boas. Nem tudo precisa de ouro.' },
      { titulo: 'Resistência ao novo', descricao: 'Apega se ao método que funciona e pode resistir a mudanças, mesmo quando elas são necessárias.' },
    ],
    planoDeAcao: [
      { titulo: 'Invista em vínculo', descricao: 'Reserve energia para a relação, não só para a tarefa. Um café com o time vale tanto quanto uma entrega perfeita.' },
      { titulo: 'Pratique o suficiente bom', descricao: 'Defina o nível de qualidade que o contexto exige e pare ali. Velocidade também é qualidade.' },
      { titulo: 'Experimente o desconforto do novo', descricao: 'Adote conscientemente uma ferramenta ou método novo por trimestre. Flexibilidade se treina.' },
    ],
    brilhaEm: 'Engenharia, tecnologia, finanças, jurídico, pesquisa, compliance, controle de qualidade e qualquer função em que a profundidade técnica e a precisão sejam o principal ativo.',
  },
  PI: {
    nome: 'O Artesão Cuidador',
    combinacao: 'Processual dominante + Intuitivo de apoio',
    visaoGeral: 'Você executa com as mãos e com o coração. Sua mente é prática e concreta, mas guiada por um cuidado humano que dá alma ao que você faz. É o perfil do artesão, do prestador de serviço dedicado, de quem entrega com capricho porque se importa com quem vai receber. Onde outros fazem por obrigação, você faz com zelo. Sua marca é a entrega que cuida.',
    superpoderes: [
      { titulo: 'Entrega com zelo', descricao: 'Você faz com capricho porque pensa em quem vai usar. Seu trabalho tem acabamento e cuidado que se notam.' },
      { titulo: 'Presença prática e confiável', descricao: 'Está sempre por perto, resolvendo o concreto e amparando as pessoas no dia a dia. É o alicerce silencioso.' },
      { titulo: 'Sensibilidade na execução', descricao: 'Percebe o que o outro precisa e adapta a entrega. Não é só fazer, é fazer do jeito que serve a pessoa.' },
    ],
    pontosCegos: [
      { titulo: 'Visão limitada ao concreto', descricao: 'Tão dedicado ao prático e ao imediato que o panorama estratégico fica distante. Falta erguer os olhos.' },
      { titulo: 'Dificuldade de dizer não', descricao: 'O cuidado pode te fazer assumir demais e se sobrecarregar. Você cuida de todos e esquece de si.' },
      { titulo: 'Resistência à abstração', descricao: 'Conversas teóricas ou muito conceituais te impacientam, e você pode perder oportunidades que começam no abstrato.' },
    ],
    planoDeAcao: [
      { titulo: 'Conecte o fazer a um porquê maior', descricao: 'De vez em quando, pare e pergunte para onde o seu trabalho leva. Propósito dá direção ao seu zelo.' },
      { titulo: 'Aprenda a delegar e a recusar', descricao: 'Você não precisa carregar tudo. Proteja sua energia para entregar com qualidade o que de fato é seu.' },
      { titulo: 'Dê uma chance ao abstrato', descricao: 'Reserve tempo para pensar antes de fazer. Um pouco de estratégia multiplica o valor da sua execução.' },
    ],
    brilhaEm: 'Serviços, artesanato, produção, manutenção, cuidado e saúde, atendimento personalizado, hospitalidade e qualquer função em que a entrega prática com toque humano faz a diferença.',
  },
}

// ── Leitura de hemisfério (dimensão dominante) ──
export const QMT_HEMISFERIO: Record<QmtDim, { titulo: string; texto: string }> = {
  C: { titulo: 'Cérebro Central dominante', texto: 'Você é sintético, estratégico e focado no porquê. Valoriza a visão de futuro, os princípios e a inovação. Pensa em sistemas e em sentido.' },
  I: { titulo: 'Hemisfério Direito dominante', texto: 'Você é holístico, emocional e focado no quem. Valoriza as conexões, a estética e o presente. Sente antes de pensar e move pelo vínculo.' },
  P: { titulo: 'Hemisfério Esquerdo dominante', texto: 'Você é analítico, linear e focado no como. Valoriza a ordem, o detalhe e a tradição. Transforma plano em entrega concreta.' },
}

// ── Leitura de equilíbrio (dispersão entre as três áreas) ──
export interface QmtEquilibrio { chave: 'TRIADICO' | 'EQUILIBRADO' | 'ESPECIALIZADO'; titulo: string; texto: string }

export function lerEquilibrio(spreadPct: number): QmtEquilibrio {
  if (spreadPct <= 12) {
    return { chave: 'TRIADICO', titulo: 'Mente Triádica e versátil', texto: 'Suas três áreas estão muito próximas. Você transita com facilidade entre estratégia, pessoas e execução, e se adapta ao que o momento pede. Sua força é a versatilidade. Seu cuidado: não se diluir tentando ser tudo ao mesmo tempo.' }
  }
  if (spreadPct >= 33) {
    return { chave: 'ESPECIALIZADO', titulo: 'Mente especializada', texto: 'Há uma área que domina com folga sobre as outras. Você é excelente no seu forte, mas isso cria pontos cegos reais nas dimensões mais baixas. Sua força é a profundidade. Seu cuidado: cercar se de quem complementa o que falta.' }
  }
  return { chave: 'EQUILIBRADO', titulo: 'Perfil definido com apoio', texto: 'Você tem uma dimensão clara de liderança, sustentada por uma segunda de apoio, e uma terceira menos acessada. É um perfil bem definido e funcional. Sua força é a clareza. Seu cuidado: desenvolver de propósito a área mais baixa.' }
}

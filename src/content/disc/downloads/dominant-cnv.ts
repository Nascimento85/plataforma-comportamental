// ============================================================
// Apostila Premium — Dominante (D)
// "Comunicação Não-Violenta para Perfis de Alta Dominância"
// ~32 páginas. Scripts prontos para conversas difíceis.
// ============================================================

import type { PdfBody } from '../types'

export const dominantCnvBody: PdfBody = {
  runningTitle: 'CNV para Alta Dominância · D',

  epigraph: {
    text:
      'CNV não é fragilidade. É arma estratégica para quem precisa convencer ' +
      'sem destruir, demitir sem traumatizar e liderar sem virar tirano.',
  },

  chapters: [
    // ============================================================
    // CAPÍTULO 1
    // ============================================================
    {
      number: 1,
      title: 'Por Que CNV é Arma Estratégica',
      subtitle: 'Não é sobre ser bonzinho. É sobre eficácia.',
      blocks: [
        {
          type: 'lead',
          text:
            'O Dominante mediano confunde CNV com fraqueza. O Dominante de elite usa ' +
            'CNV como técnica de alta precisão: máxima entrega da mensagem com mínimo ' +
            'desgaste de relação.',
        },
        {
          type: 'p',
          text:
            'Comunicação Não-Violenta foi sistematizada por Marshall Rosenberg nos anos ' +
            '70 — e adotada por equipes de negociação de reféns, mediação de conflitos ' +
            'sindicais e diplomacia internacional. Não é técnica de coach. É técnica de ' +
            'profissionais que precisam acertar de primeira em situações irreversíveis.',
        },
        {
          type: 'h2',
          text: 'O custo de não usar',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Time de alta performance vira time defensivo: para de inovar para não errar perto de você',
            'Conversas difíceis viram crises: o que poderia ser resolvido em 5 min vira ação trabalhista de 5 meses',
            'Sócios e parceiros distanciam: confiança evapora silenciosamente',
            'Casa em casa: cônjuge pede divórcio depois de anos calado',
            'Saúde mental sua: irritação crônica vira hipertensão',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          text:
            'Pesquisa Harvard de 2019 com 230 executivos: gestores com baixa habilidade ' +
            'em comunicação difícil têm 3x mais chance de saída involuntária da empresa ' +
            'em ciclos de reorganização. Eles entregam, mas ninguém quer manter.',
        },
        {
          type: 'h2',
          text: 'O que CNV NÃO é',
        },
        {
          type: 'kv',
          items: [
            { k: 'NÃO é',  v: 'Falar manso, baixinho ou rebuscado' },
            { k: 'NÃO é',  v: 'Engolir desconforto para preservar relação' },
            { k: 'NÃO é',  v: 'Renunciar à autoridade ou à clareza de pedido' },
            { k: 'NÃO é',  v: 'Enrolar com elogios para depois soltar a crítica' },
            { k: 'É',      v: 'Estrutura precisa para entregar a mensagem dura sem ativar defesa do outro' },
          ],
        },
        { type: 'pageBreak' },
        {
          type: 'h2',
          text: 'Quando especificamente usar',
        },
        {
          type: 'list',
          items: [
            'Conversa de feedback negativo recorrente',
            'Demissão de colaborador antigo',
            'Conflito com sócio sobre direção estratégica',
            'Pedido de desculpa público (após erro seu)',
            'Negociação salarial difícil (sua ou de outro)',
            'Conversa com cliente prestes a cancelar',
            'Situação familiar/cônjuge em crise',
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          text:
            'Regra prática: se a conversa pode mudar o resto do ano (seu ou do outro), ' +
            'use CNV. Conversas casuais não precisam.',
        },
      ],
    },

    // ============================================================
    // CAPÍTULO 2
    // ============================================================
    {
      number: 2,
      title: 'As 4 Etapas da CNV',
      subtitle: 'Observação · Sentimento · Necessidade · Pedido',
      blocks: [
        {
          type: 'lead',
          text:
            'A engenharia da CNV são 4 etapas SEQUENCIAIS. Pular qualquer uma quebra ' +
            'a estrutura. Inverter a ordem ativa defesa. Faça na ordem.',
        },
        {
          type: 'h2',
          text: 'ETAPA 1 — OBSERVAÇÃO',
        },
        {
          type: 'p',
          text:
            'Descreva o FATO ESPECÍFICO sem julgamento. Sem adjetivo. Sem advérbio. ' +
            'Como se fosse câmera de vigilância.',
        },
        {
          type: 'kv',
          items: [
            { k: 'Errado', v: '"Você sempre atrasa."' },
            { k: 'Certo',  v: '"Nas últimas 3 reuniões, você chegou 10, 15 e 20 minutos depois."' },
          ],
        },
        {
          type: 'callout',
          tone: 'do',
          text:
            'Teste do espelho: se 10 pessoas com câmeras filmassem a cena, todas viram a ' +
            'mesma coisa? Se sim, é observação. Se não, é interpretação.',
        },
        {
          type: 'h2',
          text: 'ETAPA 2 — SENTIMENTO',
        },
        {
          type: 'p',
          text:
            'Nomeie o que VOCÊ sentiu (não acuse o outro). Sentimento sem culpado. ' +
            'Quem se responsabiliza pelo próprio sentimento, ganha o microfone da sala.',
        },
        {
          type: 'kv',
          items: [
            { k: 'Errado', v: '"Você me deixou frustrado."' },
            { k: 'Certo',  v: '"Eu fiquei frustrado."' },
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          text:
            'Lista de 30 sentimentos para o Dominante usar (geralmente conhecemos só ' +
            '5): frustrado, ansioso, sobrecarregado, decepcionado, apreensivo, irritado, ' +
            'cansado, desiludido, distante, magoado, confuso, vulnerável, inseguro, ' +
            'desencorajado, impaciente, desconfortável, tenso, exausto, perplexo, ' +
            'pressionado, esgotado, hesitante, contrariado, ressentido, enfadado, ' +
            'ferido, melancólico, perturbado, indignado, perplexo.',
        },
        { type: 'pageBreak' },
        {
          type: 'h2',
          text: 'ETAPA 3 — NECESSIDADE',
        },
        {
          type: 'p',
          text:
            'Identifique o VALOR que estava em jogo. Necessidade é universal — todo ' +
            'humano tem. Quando você nomeia a necessidade, o outro reconhece (porque ' +
            'também tem). Aproxima ao invés de afastar.',
        },
        {
          type: 'kv',
          items: [
            { k: 'Necessidades comuns', v: 'Previsibilidade, respeito, autonomia, confiança, clareza, segurança, reconhecimento, ordem, harmonia, propósito' },
          ],
        },
        {
          type: 'callout',
          tone: 'do',
          text:
            'Pergunta-âncora: "Qual valor MEU foi tocado quando aconteceu X?". Se você ' +
            'consegue responder em 1 palavra, está pronto para a etapa 4.',
        },
        {
          type: 'h2',
          text: 'ETAPA 4 — PEDIDO',
        },
        {
          type: 'p',
          text:
            'A 4ª etapa é o que SEPARA CNV de desabafo. Sem pedido concreto, mensurável ' +
            'e com prazo, você só ventilou. Não construiu acordo.',
        },
        {
          type: 'kv',
          items: [
            { k: 'Errado', v: '"Você poderia ser mais organizado?"' },
            { k: 'Certo',  v: '"Você pode me enviar o relatório até quinta às 17h, em PDF, com 3 KPIs principais?"' },
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          text:
            'Pedido vago é convite para falha. Quanto mais claro o pedido, menor o ' +
            'desgaste futuro. Especifique: o que, quando, como, prazo.',
        },
        {
          type: 'h2',
          text: 'Exemplo aplicado completo',
        },
        {
          type: 'script',
          role: 'CNV em 4 etapas',
          sayThis:
            'Quando vi o relatório atrasar de novo (observação), fiquei frustrado ' +
            '(sentimento). Eu preciso de previsibilidade para planejar a reunião do ' +
            'comitê (necessidade). Você pode me enviar até quarta às 17h, em PDF, ' +
            'com os 3 KPIs principais (pedido)?',
          notThis:
            'Cara, você sempre atrasa. Não dá para confiar em nada do que você fala.',
        },
      ],
    },

    // ============================================================
    // CAPÍTULO 3
    // ============================================================
    {
      number: 3,
      title: 'Script: Feedback Negativo para Liderado',
      subtitle: 'A conversa que muda comportamento sem destruir relação',
      blocks: [
        {
          type: 'lead',
          text:
            'Feedback negativo é o teste mais frequente da liderança madura. O Dominante ' +
            'mediano evita ou explode. O Dominante de elite tem ROTEIRO.',
        },
        {
          type: 'h2',
          text: 'Estrutura completa (5 movimentos)',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Reconheça vínculo (não é elogio gratuito — é contexto)',
            'Apresente a observação específica',
            'Nomeie o impacto que isso teve em VOCÊ',
            'Identifique a necessidade que foi tocada',
            'Faça o pedido concreto com data e métrica',
            'Pergunte "faz sentido?" e ESCUTE',
          ],
        },
        {
          type: 'h2',
          text: 'Roteiro completo aplicado',
        },
        {
          type: 'script',
          role: '1. Vínculo',
          sayThis:
            'Você sabe que eu te valorizo. Já trabalhamos juntos há 2 anos e eu vi você ' +
            'crescer no projeto X.',
        },
        {
          type: 'script',
          role: '2. Observação específica',
          sayThis:
            'Nas últimas 3 entregas, o material chegou após o prazo combinado. Foi: dia ' +
            '15 (deveria ser dia 10), dia 22 (deveria ser dia 18) e dia 5 (deveria ser ' +
            'dia 1).',
        },
        {
          type: 'script',
          role: '3. Impacto em mim',
          sayThis:
            'Eu fiquei pressionado, porque tinha que apresentar para o comitê com ' +
            'material parcial. Em duas dessas reuniões, perdi a chance de aprovar a ' +
            'estratégia.',
        },
        { type: 'pageBreak' },
        {
          type: 'script',
          role: '4. Necessidade',
          sayThis:
            'Eu preciso de previsibilidade no meu fluxo de planejamento. Não é sobre ' +
            'você. É sobre o que essa cadeira que eu ocupo precisa para funcionar.',
        },
        {
          type: 'script',
          role: '5. Pedido com data e métrica',
          sayThis:
            'A partir de segunda, eu preciso que o material esteja na minha caixa de ' +
            'entrada até as 17h da véspera da reunião. Sem exceção. Se você prevê ' +
            'atraso, me avisa com 48h de antecedência. Combinado?',
        },
        {
          type: 'script',
          role: '6. Pergunta',
          sayThis:
            'Faz sentido? Tem alguma coisa que eu poderia fazer diferente para te ajudar ' +
            'a chegar nesse padrão?',
        },
        {
          type: 'h2',
          text: 'O que fazer SE o liderado responder agressivo',
        },
        {
          type: 'callout',
          tone: 'do',
          text:
            'Não revide. Respire. Pergunte: "estou ouvindo que você discordou. Me conta ' +
            'qual parte específica não fez sentido para você?" — e VOLTE a escutar.',
        },
        {
          type: 'callout',
          tone: 'dont',
          text:
            'Não puxe assunto novo, não desvie para outro problema, não suba o tom. ' +
            'Defesa de Dominante destrói a CNV em 1 segundo.',
        },
        {
          type: 'h2',
          text: 'Documentação posterior',
        },
        {
          type: 'p',
          text:
            'Após a conversa, em até 24h, mande um e-mail de 4 linhas: (1) o que ' +
            'observamos, (2) o pedido combinado, (3) a métrica de sucesso, (4) a próxima ' +
            'data de check-in. Documentação não é hostilidade — é compromisso.',
        },
      ],
    },

    // ============================================================
    // CAPÍTULO 4
    // ============================================================
    {
      number: 4,
      title: 'Script: Conflito com Sócio',
      subtitle: 'Quando a divergência ameaça a sociedade',
      blocks: [
        {
          type: 'lead',
          text:
            'Conflito entre sócios é a #1 causa de quebra de empresa entre 3 e 7 anos. ' +
            'A maioria das brigas é evitável — só falta protocolo.',
        },
        {
          type: 'h2',
          text: 'Setup da conversa',
        },
        {
          type: 'check',
          items: [
            'Marque com pelo menos 48h de antecedência (sem emboscada)',
            'Local neutro (não no escritório, não no celular do outro)',
            'Bloqueie 90 minutos. Sem reunião marcada depois',
            'Diga o tema explicitamente no convite ("preciso falar sobre nossa divergência sobre X")',
          ],
        },
        {
          type: 'h2',
          text: 'Roteiro CNV adaptado para sócios',
        },
        {
          type: 'script',
          role: 'Abertura — Vínculo + Stakes',
          sayThis:
            'A gente construiu essa empresa juntos. Eu não estaria aqui sem você. Vou ser ' +
            'direto porque essa relação importa demais: nas últimas 3 reuniões de ' +
            'estratégia, a gente saiu cada um defendendo um caminho. Eu acredito que ' +
            'precisamos resolver isso hoje, antes que afete a operação.',
        },
        {
          type: 'script',
          role: 'Observação específica',
          sayThis:
            'Especificamente: na decisão sobre [exemplo concreto], eu vi você defender ' +
            '[caminho A] e eu defendi [caminho B]. Não chegamos a um acordo, e o time ' +
            'percebeu — duas pessoas me perguntaram "vocês estão alinhados?".',
        },
        {
          type: 'script',
          role: 'Sentimento + Necessidade',
          sayThis:
            'Eu fiquei preocupado, porque eu preciso de alinhamento estratégico para ' +
            'liderar com clareza. Não é sobre quem está certo. É sobre o que vamos comunicar ' +
            'para o time como direção única.',
        },
        { type: 'pageBreak' },
        {
          type: 'script',
          role: 'Pedido — Definir processo, não decisão',
          sayThis:
            'Meu pedido é que a gente defina HOJE o protocolo para divergências futuras: ' +
            '(1) quando discordamos, qual de nós tem voto de minerva por área? ' +
            '(2) quando ambos discordamos, a quem recorremos? (3) o que nunca vai a voto ' +
            'sem 100% de acordo?',
        },
        {
          type: 'callout',
          tone: 'tip',
          text:
            'Sócio decide MELHOR sobre processo do que sobre decisão pontual. Em conflito, ' +
            'mude o nível: pare de discutir o QUÊ e discuta o COMO. Quem tem o protocolo, ' +
            'tem a paz.',
        },
        {
          type: 'h2',
          text: 'Erros comuns do Dominante em conflito de sociedade',
        },
        {
          type: 'callout',
          tone: 'dont',
          text:
            'Trazer histórico de 5 anos para a conversa atual. Foque em UM tema. Cada ' +
            'tema antigo é nova conversa.',
        },
        {
          type: 'callout',
          tone: 'dont',
          text:
            'Ameaçar saída ou compra de quotas como tática de pressão. Você queima ponte ' +
            'que pode precisar.',
        },
        {
          type: 'callout',
          tone: 'dont',
          text:
            'Buscar aliados no time ANTES da conversa. Se vazar, o sócio descobre e ' +
            'qualquer chance de acordo morre.',
        },
      ],
    },

    // ============================================================
    // CAPÍTULO 5
    // ============================================================
    {
      number: 5,
      title: 'Script: Pedido Público de Desculpa',
      subtitle: 'Quando você foi DEMAIS — e o time inteiro viu',
      blocks: [
        {
          type: 'lead',
          text:
            'O Dominante explode em público algumas vezes na vida. Um deles é o último ' +
            'erro — depois disso, o time só performa por medo. Pedir desculpa público ' +
            'NÃO é fraqueza: é o ato mais valente de liderança.',
        },
        {
          type: 'h2',
          text: 'Quando pedir desculpa público',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Você gritou em reunião e mais de 3 pessoas viram',
            'Você humilhou alguém na frente do time',
            'Você tomou uma decisão errada que afetou todos e tentou esconder',
            'Você acusou alguém injustamente em público',
            'Você quebrou um combinado coletivo conscientemente',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          text:
            'Se você não pedir desculpa nesses casos, NUNCA mais terá liderança real. ' +
            'O time vai performar por contrato, não por confiança. E eles vão sair na ' +
            'primeira oportunidade.',
        },
        {
          type: 'h2',
          text: 'Como pedir desculpa público (sem perder autoridade)',
        },
        {
          type: 'script',
          role: 'No mesmo formato/local em que aconteceu',
          sayThis:
            'Antes de a gente entrar na pauta de hoje, preciso pedir um minuto para ' +
            'algo que aconteceu na reunião de [data]. Eu perdi o controle quando estava ' +
            'falando com [nome]. Eu fui rude, em público, e isso foi errado da minha ' +
            'parte. [Nome], eu te peço desculpa de verdade. Não tenho desculpa para o ' +
            'jeito que falei. E peço desculpa para todos que viram — porque o ambiente ' +
            'em que vocês trabalham depende de mim mostrar respeito, principalmente ' +
            'quando estou frustrado. A partir de agora, se eu sentir que vou explodir, ' +
            'vou pausar a reunião e voltar depois. Combinado entre nós? Obrigado.',
        },
        { type: 'pageBreak' },
        {
          type: 'h2',
          text: 'Princípios da desculpa que funciona',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Específica: cite o evento. Sem "talvez tenha sido um pouco duro"',
            'Sem MAS: nunca termine a desculpa com "mas você também...". Anula tudo',
            'Sem prometer perfeição: prometa o protocolo concreto que vai usar',
            'Curta: 60 segundos. Mais que isso vira drama — perde respeito',
            'Sem buscar "tudo bem" do outro: dê espaço, não cobre absolvição',
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          text:
            'O paradoxo: o Dominante que pede desculpa público de forma estruturada ' +
            'GANHA autoridade. Porque o time vê: você admite erro. Logo, quando você ' +
            'apontar erro, é confiável também.',
        },
      ],
    },

    // ============================================================
    // CAPÍTULO 6
    // ============================================================
    {
      number: 6,
      title: 'Script: Demitir um Colaborador Antigo',
      subtitle: 'A conversa mais pesada da liderança — feita com integridade',
      blocks: [
        {
          type: 'lead',
          text:
            'Demitir alguém com 5+ anos de casa é diferente de demitir júnior. Não tem ' +
            'fórmula que tira a dor — mas existe estrutura que mantém a dignidade.',
        },
        {
          type: 'h2',
          text: 'Antes da conversa',
        },
        {
          type: 'check',
          items: [
            'A decisão é IRREVERSÍVEL e tomada antes de entrar na sala',
            'Plano de melhoria documentado já tentou — pelo menos 60 dias',
            'RH presente, sala fechada, sem janelas para área comum',
            'Documento de desligamento pronto antes da conversa',
            'Equipamento, acessos e benefícios listados',
            'Comunicado ao time pré-redigido (não improvise)',
          ],
        },
        {
          type: 'h2',
          text: 'Roteiro de 15 minutos',
        },
        {
          type: 'script',
          role: 'Abertura (sem rodeio)',
          sayThis:
            'Obrigado por ter vindo. Eu vou direto: tomei a decisão de encerrar nosso ' +
            'vínculo. Vou explicar o porquê e os próximos passos.',
        },
        {
          type: 'script',
          role: 'Razões objetivas (2, com exemplo cada)',
          sayThis:
            'Apesar do plano de melhoria que combinamos em [data], duas coisas centrais ' +
            'não se ajustaram: (1) [exemplo específico]; (2) [exemplo específico]. ' +
            'Não é sobre você como pessoa. É sobre o ajuste entre você e a função.',
        },
        {
          type: 'script',
          role: 'Reconhecimento real',
          sayThis:
            'Eu reconheço o que você entregou em [exemplo concreto, não inventado]. ' +
            'Isso fica. Carrego com gratidão.',
        },
        { type: 'pageBreak' },
        {
          type: 'script',
          role: 'Detalhes práticos',
          sayThis:
            'Detalhes: seu último dia é [data]. Você recebe [pacote — verba, multa, ' +
            'meses, plano de saúde extendido por X]. RH vai te entregar o documento ' +
            'agora. Equipamento, você devolve até [data]. Acessos serão removidos hoje. ' +
            'Sobre comunicação: se quiser, eu falo com o time agora, ou amanhã, ou na ' +
            'sua presença. Você escolhe.',
        },
        {
          type: 'script',
          role: 'Espaço para perguntas (1 ou 2)',
          sayThis:
            'Sei que é muita informação. Você quer perguntar algo agora? Posso responder ' +
            'o que for prático.',
        },
        {
          type: 'script',
          role: 'Encerramento',
          sayThis:
            'Vou pedir licença e te deixar com [RH] para os detalhes. Quero te desejar ' +
            'sinceramente o melhor. E se você precisar de referência minha em qualquer ' +
            'momento, é só me pedir. Obrigado.',
        },
        {
          type: 'h2',
          text: 'Erros do Dominante em demissão',
        },
        {
          type: 'callout',
          tone: 'dont',
          text: 'Listar 10 razões. Duas é o máximo. Mais que isso parece autojustificativa.',
        },
        {
          type: 'callout',
          tone: 'dont',
          text: 'Discutir as razões. Não é debate. Você apresenta, escuta com respeito, fim.',
        },
        {
          type: 'callout',
          tone: 'dont',
          text:
            'Tentar fazer o demitido se sentir bem. Não é seu trabalho. Sua dor de ter ' +
            'demitido NÃO é o problema dele agora.',
        },
        {
          type: 'callout',
          tone: 'dont',
          text:
            'Falar mal do demitido para o time depois. NUNCA. Mantém o caráter. O time ' +
            'observa em silêncio como você protege quem saiu.',
        },
      ],
    },

    // ============================================================
    // CAPÍTULO 7
    // ============================================================
    {
      number: 7,
      title: 'Script: Cônjuge — "Não é Sobre Você, é Sobre o Ritmo"',
      subtitle: 'CNV em casa: o teste mais difícil',
      blocks: [
        {
          type: 'lead',
          text:
            'O Dominante leva o estilo do trabalho para casa: agenda, eficiência, ' +
            'soluções rápidas. O parceiro/parceira começa a dizer "você tá ausente". ' +
            'Esse capítulo é o roteiro para reverter — antes de virar crise.',
        },
        {
          type: 'h2',
          text: 'Quando aplicar',
        },
        {
          type: 'list',
          items: [
            'Você ouviu "você está distante" mais de 2 vezes nos últimos 90 dias',
            'Brigas pequenas viraram frequentes (>1 por semana)',
            'O parceiro(a) começou a parar de te contar coisas',
            'Vocês estão dormindo de costas há mais de 1 mês',
            'Sua saída de casa é silêncio, não despedida',
          ],
        },
        {
          type: 'h2',
          text: 'O que NÃO funciona',
        },
        {
          type: 'callout',
          tone: 'dont',
          text:
            'Marcar "reunião" formal para falar do relacionamento. Casa não é empresa. ' +
            'Cônjuge não responde a Outlook.',
        },
        {
          type: 'callout',
          tone: 'dont',
          text:
            'Trazer SOLUÇÃO antes de OUVIR. "Já marquei jantar, terapeuta, viagem" — ' +
            'isso afasta. O outro precisa primeiro saber que VOCÊ enxergou.',
        },
        { type: 'pageBreak' },
        {
          type: 'h2',
          text: 'Roteiro inicial (curto)',
        },
        {
          type: 'script',
          role: 'Abertura sem agenda',
          sayThis:
            'Quero te falar uma coisa que não tem solução agora. Preciso só que você ' +
            'ouça. Cinco minutos. Pode ser?',
        },
        {
          type: 'script',
          role: 'Observação específica',
          sayThis:
            'Eu percebi que nas últimas semanas a gente quase não conversou sobre ' +
            'nada além de logística. Eu chego cansado, vou para o celular, e a gente ' +
            'dorme sem ter trocado uma palavra de verdade.',
        },
        {
          type: 'script',
          role: 'Sentimento',
          sayThis:
            'Eu fiquei desconfortável quando percebi isso. Sinto saudade de quem a ' +
            'gente era. E me sinto culpado por ter chegado aqui sem perceber.',
        },
        {
          type: 'script',
          role: 'Necessidade (sem culpar)',
          sayThis:
            'Eu preciso da gente. Não da gente "eficiente" — da gente que sabe das ' +
            'coisas miúdas um do outro.',
        },
        {
          type: 'script',
          role: 'Pedido (pequeno, não sobre arrumar tudo)',
          sayThis:
            'Tenho um pedido pequeno. Pode ser? Toda noite, antes de dormir, 10 minutos ' +
            'sem celular, só perguntando "como foi seu dia, de verdade?". Sem solução. ' +
            'Sem agenda. Só presença. Topa testar 7 dias?',
        },
        {
          type: 'callout',
          tone: 'tip',
          text:
            'Pedido pequeno funciona porque é executável. Pedido grande ("vamos ' +
            'recomeçar tudo") gera ansiedade e resistência. Comece micro.',
        },
      ],
    },

    // ============================================================
    // CAPÍTULO 8
    // ============================================================
    {
      number: 8,
      title: 'Erros Mais Comuns do Dominante em CNV',
      subtitle: 'O que tropeça mesmo de quem leu o manual inteiro',
      blocks: [
        {
          type: 'lead',
          text:
            'Mesmo conhecendo a técnica, o Dominante tropeça em padrões previsíveis. ' +
            'Esse capítulo são os 7 mais comuns — para você se vigiar.',
        },
        {
          type: 'h2',
          text: 'ERRO 1 — Velocidade demais',
        },
        {
          type: 'p',
          text:
            'O Dominante quer terminar a conversa rápido. CNV bem feita é DEVAGAR. Se ' +
            'você fechou em 3 minutos, queimou etapa. Faça em 15 min.',
        },
        {
          type: 'h2',
          text: 'ERRO 2 — Pular Sentimento',
        },
        {
          type: 'p',
          text:
            'Vai direto da observação para o pedido. Pula "eu fiquei frustrado". O outro ' +
            'lê como ataque. Sentimento é a ponte que evita defesa.',
        },
        {
          type: 'h2',
          text: 'ERRO 3 — Pedido vago',
        },
        {
          type: 'p',
          text:
            '"Você poderia ser mais comunicativo?" — não é pedido. É reclamação. Pedido = ' +
            'ação concreta, observável, com prazo.',
        },
        { type: 'pageBreak' },
        {
          type: 'h2',
          text: 'ERRO 4 — Esperar gratidão',
        },
        {
          type: 'p',
          text:
            'Você fez CNV bem feita. O outro saiu confuso ou com cara fechada. Você ' +
            'esperou "obrigado, foi ótima conversa". Não vai vir. CNV é por VOCÊ — não ' +
            'pela validação do outro.',
        },
        {
          type: 'h2',
          text: 'ERRO 5 — CNV fake',
        },
        {
          type: 'p',
          text:
            'Aprender o vocabulário e usar como verniz. "Eu me sinto preocupado quando ' +
            'você não entrega" — sem pausa, sem necessidade nomeada, sem pedido. Vira ' +
            'gestor robotizado. O outro percebe.',
        },
        {
          type: 'h2',
          text: 'ERRO 6 — Esperar perfeição na próxima vez',
        },
        {
          type: 'p',
          text:
            'Aplica CNV uma vez. Não funciona na primeira. Volta para o estilo antigo. ' +
            'CNV é prática constante por anos, não receita de um uso.',
        },
        {
          type: 'h2',
          text: 'ERRO 7 — Usar só com subordinados',
        },
        {
          type: 'p',
          text:
            'Você aplica CNV com o time. Mas com seu chefe, sócio ou cônjuge — volta a ' +
            'ser Dominante cru. Quem mais merece o seu refinamento é quem está mais ' +
            'perto. Inverte a ordem natural.',
        },
        {
          type: 'callout',
          tone: 'tip',
          text:
            'Métrica do progresso: por 30 dias, anote em cada conversa difícil "usei as ' +
            '4 etapas? sim/não". Sem julgamento. Só observação. Em 90 dias o padrão muda ' +
            'sozinho — porque você passa a ver os tropeços antes de cair neles.',
        },
      ],
    },
  ],

  appendices: [
    {
      title: 'Anexo — Glossário: 30 palavras a EVITAR e SUBSTITUIR',
      blocks: [
        {
          type: 'p',
          text: 'Imprima. Cole na sua agenda. Use como espelho rápido.',
        },
        {
          type: 'table',
          headers: ['Evite', 'Substitua por'],
          rows: [
            ['"Você sempre…"',                'Nas últimas 3 vezes…'],
            ['"Você nunca…"',                  'Eu não vi você fazer X em Y, Z e W.'],
            ['"Você é difícil"',               'Eu fiquei com dificuldade quando…'],
            ['"Você está errado"',             'Eu vejo isso de outra forma. Posso explicar?'],
            ['"Não dá tempo"',                  'Para entregar isso, preciso de Y horas.'],
            ['"Tanto faz"',                     'Eu sigo a sua decisão.'],
            ['"Você precisa entender"',         'Posso te mostrar como eu vejo?'],
            ['"Você deveria"',                  'Eu te pediria que…'],
            ['"Não é nada"',                    'Quero te falar uma coisa pequena, mas importante.'],
            ['"Tá bom assim"',                  'Específico que eu reconheço: A, B e C.'],
            ['"Esquece"',                       'Vou pensar melhor antes de falar.'],
            ['"Sempre tem que ser do meu jeito"','Em duas situações específicas, eu peço prioridade…'],
            ['"Que ridículo"',                  'Não consigo ver lógica nessa decisão. Me ajuda a entender?'],
            ['"Calma"',                         'Posso ouvir o que você está sentindo agora?'],
            ['"Não é pessoal"',                 'Reconheço que isso afeta você pessoalmente, e mesmo assim preciso…'],
          ],
        },
      ],
    },
  ],

  closing: {
    headline: 'Quem domina a língua, domina a sala.',
    subtext:
      'CNV não te faz menos dominante. Te faz dominante COM precisão. ' +
      'Releia este material a cada conversa difícil dos próximos 90 dias.',
  },
}

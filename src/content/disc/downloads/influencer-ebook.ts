// ============================================================
// E-book Premium — Influente (I)
// "Do Carisma ao Lucro — como vender sem virar palhaço"
// ~24-28 páginas. Manual para Influentes que querem ser pagos.
// ============================================================

import type { PdfBody } from '../types'

export const influencerEbookBody: PdfBody = {
  runningTitle: 'Do Carisma ao Lucro · I',

  epigraph: {
    text:
      'Você fala bem. Mas fala demais. Aqui você aprende a fechar contrato sem ' +
      'virar showman — e a virar autoridade onde antes era só simpatia.',
  },

  chapters: [
    {
      number: 1,
      title: 'Por Que Carisma Sem Método Empobrece',
      subtitle: 'O paradoxo do Influente que todos amam mas ninguém contrata',
      blocks: [
        {
          type: 'lead',
          text:
            'O Influente entra em qualquer ambiente e ganha simpatia em 30 segundos. ' +
            'Sai 2 horas depois com 20 cartões na carteira e uma agenda cheia de "vamos ' +
            'marcar um café". Em 30 dias, NENHUM dos cafés virou contrato.',
        },
        {
          type: 'p',
          text:
            'Esse é o paradoxo central do perfil I: o que TE TORNA querido é o que ' +
            'te impede de ser pago. Carisma sem método empobrece — porque seduz mas ' +
            'não converte. Vamos virar isso.',
        },
        {
          type: 'h2',
          text: 'Sintomas do "Influente que não fatura"',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Reuniões duram o dobro do agendado e ninguém fecha',
            'Você sai animado, prospect sai confuso',
            'Cliente te chama de "boa pessoa" mas contrata o concorrente',
            'Networking semanal alto, taxa de conversão <5%',
            'Você inicia 10 projetos, conclui 2',
            'Sua agenda está cheia de "cafés" não-pagos',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          text:
            'Se você marcou 3+ desses, o problema NÃO é falta de talento. É falta de ' +
            'estrutura para canalizar o talento. Ler este manual sem aplicar é mais um ' +
            'projeto começado e não terminado.',
        },
        {
          type: 'h2',
          text: 'O que muda quando você instala método',
        },
        {
          type: 'kv',
          items: [
            { k: 'Antes', v: 'Reunião encantadora, sem decisão' },
            { k: 'Depois', v: 'Reunião encantadora COM próximo passo agendado' },
            { k: 'Antes', v: 'Cliente "vai pensar" por 4 semanas' },
            { k: 'Depois', v: 'Cliente decide em 5 dias úteis' },
            { k: 'Antes', v: 'Você fala 70% do tempo' },
            { k: 'Depois', v: 'Cliente fala 60%, você 40%' },
            { k: 'Antes', v: 'Discounts dados antes de pedidos' },
            { k: 'Depois', v: 'Preço cheio mantido em 80% das vendas' },
          ],
        },
      ],
    },

    {
      number: 2,
      title: 'As 5 Tipologias de Cliente Que Gostam de Você',
      subtitle: 'Identifique para vender certo',
      blocks: [
        {
          type: 'lead',
          text:
            'Influente vende para QUASE TODOS — mas só algumas tipologias compram. ' +
            'Aprenda a identificar essas 5 em até 3 minutos de conversa para FOCAR seu ' +
            'tempo onde converte.',
        },
        {
          type: 'h2',
          text: '1. CLIENTE VISIONÁRIO',
        },
        {
          type: 'kv',
          items: [
            { k: 'Compra',  v: 'Sua história, sua narrativa de transformação' },
            { k: 'Frase típica', v: '"Adorei sua jornada, conta mais"' },
            { k: 'Como fechar', v: 'Posicione o produto como CAPÍTULO da história dele' },
            { k: 'Erro comum',  v: 'Vender feature técnica. Ele quer narrativa.' },
          ],
        },
        {
          type: 'h2',
          text: '2. CLIENTE CALOROSO',
        },
        {
          type: 'kv',
          items: [
            { k: 'Compra',  v: 'Sua presença, sua energia' },
            { k: 'Frase típica', v: '"Você me passa muita confiança"' },
            { k: 'Como fechar', v: 'Reforce vínculo. Cite encontros, lembrancas pessoais' },
            { k: 'Erro comum',  v: 'Frieza profissional. Ele quer calor.' },
          ],
        },
        {
          type: 'h2',
          text: '3. CLIENTE CURIOSO',
        },
        {
          type: 'kv',
          items: [
            { k: 'Compra',  v: 'A novidade, o "primeiro a ter"' },
            { k: 'Frase típica', v: '"Isso é diferente do que vi antes"' },
            { k: 'Como fechar', v: 'Mostre roadmap, beta, exclusividade temporal' },
            { k: 'Erro comum',  v: 'Tratar como commodity. Ele quer ser pioneiro.' },
          ],
        },
        {
          type: 'h2',
          text: '4. CLIENTE COMUNIDADE',
        },
        {
          type: 'kv',
          items: [
            { k: 'Compra',  v: 'Pertencimento à tribo, círculo de pares' },
            { k: 'Frase típica', v: '"Quem mais usa isso?"' },
            { k: 'Como fechar', v: 'Cite 3 nomes do segmento dele que já contrataram' },
            { k: 'Erro comum',  v: 'Vender pelo produto. Ele quer pelos pares.' },
          ],
        },
        {
          type: 'h2',
          text: '5. CLIENTE INSPIRADO',
        },
        {
          type: 'kv',
          items: [
            { k: 'Compra',  v: 'Propósito, missão, impacto além do lucro' },
            { k: 'Frase típica', v: '"O mundo precisa disso"' },
            { k: 'Como fechar', v: 'Conecte produto a um problema sistêmico' },
            { k: 'Erro comum',  v: 'Métrica fria. Ele quer sentido.' },
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          text:
            'Em 3 min de conversa, identifique a tipologia. Adapte os próximos 30 min ' +
            'para ELA. Se você fala "novidade" para um Caloroso, ele se afasta. Se fala ' +
            '"calor" para um Curioso, ele acha você raso.',
        },
      ],
    },

    {
      number: 3,
      title: 'O Funil Narrativo',
      subtitle: 'Estrutura de venda em 5 movimentos',
      blocks: [
        {
          type: 'lead',
          text:
            'Influente vende mal porque vende SEM ESTRUTURA. Esse funil dá a régua. ' +
            '5 movimentos, na ordem, sem pular. Funciona para venda 1:1, pitch em palco ' +
            'e até para Reels de 30 segundos.',
        },
        {
          type: 'h2',
          text: 'Movimento 1: HISTÓRIA (3 min)',
        },
        {
          type: 'p',
          text:
            'Comece com história — sua, de cliente, da indústria. Não venda nada nos ' +
            'primeiros 3 min. História ativa o cérebro emocional, baixa a defesa.',
        },
        {
          type: 'callout',
          tone: 'do',
          text:
            'Estrutura da história: "Era uma vez [contexto]. Aí aconteceu [problema]. ' +
            'Tentamos [tentativas]. Até que [virada]. Agora [resultado novo]."',
        },
        {
          type: 'h2',
          text: 'Movimento 2: TRANSIÇÃO (1 min)',
        },
        {
          type: 'script',
          role: 'Frase de transição',
          sayThis:
            'Isso me lembra de um caso que resolvi recentemente — talvez te interesse. ' +
            'Posso te contar?',
        },
        {
          type: 'h2',
          text: 'Movimento 3: PRODUTO COMO SOLUÇÃO DO HERÓI (5 min)',
        },
        {
          type: 'p',
          text:
            'Apresente seu produto como CONTINUAÇÃO da história. O cliente é o herói. ' +
            'Você é o mentor que entrega a ferramenta. NUNCA seja o herói.',
        },
        {
          type: 'h2',
          text: 'Movimento 4: PERGUNTA-ÂNCORA',
        },
        {
          type: 'script',
          role: 'A pergunta que separa lead de cliente',
          sayThis:
            'Isso ressoa com o que você está tentando construir? O que precisaria ser ' +
            'verdadeiro daqui 6 meses para você dizer "essa decisão valeu"?',
        },
        {
          type: 'callout',
          tone: 'do',
          text:
            'Anote a resposta DELE com as palavras DELE. Use essas palavras ao fechar: ' +
            '"Quando você me disse que precisava de X, vejo que esse é exatamente o ' +
            'problema que vamos resolver."',
        },
        {
          type: 'h2',
          text: 'Movimento 5: PRÓXIMO PASSO COM DATA',
        },
        {
          type: 'p',
          text:
            'NUNCA termine sem agendar o próximo passo na hora, com data e horário. ' +
            '"Vamos marcar depois" = perdeu o lead.',
        },
        {
          type: 'script',
          role: 'Frase de fechamento',
          sayThis:
            'Posso te enviar a proposta amanhã 10h. Combinamos um call sexta às 14h ' +
            'para você me dizer um sim ou um não? Sem rodeio.',
          notThis:
            'Que tal a gente marcar um próximo café qualquer hora?',
        },
      ],
    },

    {
      number: 4,
      title: 'A Regra dos 60%',
      subtitle: 'Cronometre — você fala MENOS, vende MAIS',
      blocks: [
        {
          type: 'lead',
          text:
            'O Influente fala em média 70% do tempo de uma reunião. Os top vendedores ' +
            'do mundo falam 40%. A diferença vale milhões.',
        },
        {
          type: 'h2',
          text: 'Por que falar menos vende mais',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Cliente que fala se sente OUVIDO. Sentimento de sentido > argumento técnico.',
            'Cliente revela DADOS reais. Você descobre objeção antes de ela virar não.',
            'Cliente AUTOPERSUADE. Quando ele explica o problema, ele se convence da urgência.',
            'Você ECONOMIZA energia. Reuniões cansam menos. Você atende mais.',
          ],
        },
        {
          type: 'h2',
          text: 'Como cronometrar',
        },
        {
          type: 'check',
          items: [
            'Coloque cronômetro no celular (modo silencioso, vibração)',
            'A cada vez que VOCÊ falar, ative cronômetro. Pause quando ele falar.',
            'Meta: você ≤ 40% do tempo total da reunião',
            'Após 1 semana de medição, o hábito de pausar se instala sozinho',
          ],
        },
        {
          type: 'h2',
          text: '7 perguntas que fazem o cliente falar',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'O que precisa ser verdadeiro daqui 6 meses para você dizer que valeu?',
            'O que está te fazendo hesitar agora? (depois de propor solução)',
            'Se você fosse o seu sócio, qual seria sua dúvida?',
            'Qual é o custo de NÃO resolver isso nos próximos 90 dias?',
            'Posso te perguntar uma coisa direto?',
            'Em escala de 0 a 10, quão prioritário é isso agora?',
            'Quem mais precisa estar no sim para isso acontecer?',
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          text:
            'Pergunta #6 é a mais poderosa: se vier menos que 7, a venda NÃO está madura. ' +
            'Não force. Aprofunde a dor. Volta na semana seguinte.',
        },
      ],
    },

    {
      number: 5,
      title: 'Como Precificar Seu Carisma',
      subtitle: 'Não cobre por hora. Cobre por valor entregue.',
      blocks: [
        {
          type: 'lead',
          text:
            'Influente que cobra por hora teto-se. Se você ganha R$ 200/h e trabalha 40h ' +
            'por semana, seu teto é R$ 32k/mês. Influente sênior cobra R$ 30k POR PROJETO ' +
            '— porque cobra por TRANSFORMAÇÃO, não por hora.',
        },
        {
          type: 'h2',
          text: 'A escada de precificação',
        },
        {
          type: 'kv',
          items: [
            { k: '1. Hora', v: 'R$ 100-300/h. Iniciante. Ninguém escala aqui.' },
            { k: '2. Pacote', v: 'R$ 5k-15k por entregável definido. Médio.' },
            { k: '3. Projeto', v: 'R$ 30k-100k por transformação completa. Sênior.' },
            { k: '4. Equity', v: '% de impacto + retainer. Top do mercado.' },
          ],
        },
        {
          type: 'h2',
          text: 'Como subir 1 nível',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Documente 3 cases recentes com NÚMERO de impacto (não impressão)',
            'Calcule o "ROI implícito": cada R$ pago gerou R$ X em retorno?',
            'Reformule sua proposta: vender RESULTADO, não TAREFAS',
            'Ofereça garantia atrelada ao resultado (1 mês de continuação grátis se KPI X não atingido)',
            'Anuncie o reajuste com 30 dias de antecedência aos clientes atuais',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          text:
            'O Influente subestima o próprio valor por medo de "perder o cliente". ' +
            'Quem perde cliente subindo preço, GANHA o cliente certo. Quem mantém ' +
            'preço baixo, fica refém de cliente errado.',
        },
        {
          type: 'h2',
          text: 'Script para anunciar reajuste',
        },
        {
          type: 'script',
          role: 'Mensagem para cliente atual',
          sayThis:
            'Quero te avisar com 30 dias de antecedência: a partir de [data], meu valor ' +
            'sobe para [novo valor]. Os contratos já assinados permanecem como estão até ' +
            'o vencimento. Esse aumento reflete os resultados que entreguei e os 12 meses ' +
            'de aprendizado adicional. Posso te explicar pessoalmente se quiser.',
        },
      ],
    },

    {
      number: 6,
      title: 'Como Construir Prova Social Sem Mendigar Elogio',
      subtitle: 'Coleta sistemática de cases',
      blocks: [
        {
          type: 'lead',
          text:
            'Influente trava ao pedir depoimento. "Fica chato cobrar." Aqui você tem o ' +
            'sistema que faz cliente entregar elogio espontâneo — porque você cria a ' +
            'janela certa.',
        },
        {
          type: 'h2',
          text: 'A janela mágica: 7 dias após resultado',
        },
        {
          type: 'p',
          text:
            'Cliente entrega depoimento sincero entre o 7º e o 14º dia após o resultado ' +
            'principal. ANTES disso, ele ainda está duvidando. DEPOIS, ele já normalizou. ' +
            'A janela é estreita.',
        },
        {
          type: 'h2',
          text: 'Script de pedido',
        },
        {
          type: 'script',
          role: 'Mensagem 7 dias após entrega',
          sayThis:
            'Que tal celebrar? [Resultado específico]. Se você quiser dividir em 30 ' +
            'segundos de áudio o que mais te marcou nesse processo, eu adoraria. Pode ' +
            'ser hoje ou amanhã, sem pressa. Se preferir escrito, também serve. Obrigado ' +
            'pela confiança.',
        },
        {
          type: 'callout',
          tone: 'do',
          text:
            'Áudio funciona melhor que texto. Cliente solta espontâneo, não polido. Esse ' +
            'depoimento converte 3x mais que texto bem escrito.',
        },
        {
          type: 'h2',
          text: 'Onde usar',
        },
        {
          type: 'list',
          items: [
            'Dois prints no LinkedIn por semana',
            'Pasta dedicada no celular para envio em chats com novos prospects',
            'Página de captura com 6 áudios em rotação',
            'Apresentação comercial com frases-chave',
          ],
        },
      ],
    },

    {
      number: 7,
      title: 'Estudo de Caso',
      subtitle: '3 Influentes que viraram autoridade no nicho',
      blocks: [
        {
          type: 'h2',
          text: 'Caso 1 — Marina, 34 anos, copywriter',
        },
        {
          type: 'p',
          text:
            'Cobrava R$ 80/h. Em 12 meses, virou R$ 8k por landing page. Como? ' +
            'Documentou 5 cases com aumento de conversão NUMÉRICO. Reformulou proposta ' +
            'de "vou escrever copy" para "vou aumentar sua taxa de conversão em X%". ' +
            'Mesmo serviço, narrativa diferente, preço 30x maior.',
        },
        {
          type: 'h2',
          text: 'Caso 2 — Rafael, 41 anos, consultor de vendas',
        },
        {
          type: 'p',
          text:
            'Tinha agenda cheia de "cafés" não pagos. Implantou pergunta-âncora #6 em ' +
            'todas as primeiras conversas. Em 60 dias, 70% dos cafés foram cancelados ' +
            'ANTES de acontecer (cliente percebeu não estar pronto). Os 30% que ' +
            'aconteceram tiveram taxa de conversão de 65% (antes era 12%).',
        },
        {
          type: 'h2',
          text: 'Caso 3 — Letícia, 28 anos, designer',
        },
        {
          type: 'p',
          text:
            'Cobrava por hora. Subiu para pacote em 3 meses. Migrou para projeto em 9 ' +
            'meses. Hoje cobra R$ 45k por identidade visual completa. O que mudou? ' +
            'Reformulou conversa inicial: PARE de mostrar portfolio, PERGUNTE primeiro. ' +
            '"Para que servirá essa marca daqui 5 anos?" — em 1 pergunta, ela vira ' +
            'consultora estratégica, não fornecedora.',
        },
        {
          type: 'callout',
          tone: 'tip',
          text:
            'Padrão dos 3: pararam de vender o QUE FAZEM. Começaram a vender a ' +
            'TRANSFORMAÇÃO que entregam. Mesmo trabalho — narrativa diferente.',
        },
      ],
    },
  ],

  appendices: [
    {
      title: 'Anexo — 12 frases de fechamento que NÃO soam comerciais',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            '"Faz sentido a gente acelerar antes que [evento real] aconteça?"',
            '"Posso te enviar a proposta hoje à tarde para você ler com calma?"',
            '"O que precisaria ser verdadeiro para você dizer sim agora?"',
            '"Você me autoriza a desenhar o orçamento detalhado?"',
            '"Que tal a gente fazer um piloto pequeno antes do projeto cheio?"',
            '"Posso te apresentar a quem já contratou para você falar antes de decidir?"',
            '"Se eu tirar [objeção real] do caminho, você fecha?"',
            '"Quem mais precisa estar no sim para a gente avançar?"',
            '"Vamos formalizar isso por e-mail agora antes de a gente esquecer?"',
            '"Posso te ligar amanhã 10h para fechar os detalhes?"',
            '"Em escala de 0 a 10, quão pronto você está para começar?"',
            '"Que tal eu te enviar 2 datas de início? Você escolhe."',
          ],
        },
      ],
    },
  ],

  closing: {
    headline: 'Carisma sem método empobrece. Carisma com método multiplica.',
    subtext:
      'Releia este e-book antes de cada reunião comercial importante por 90 dias. ' +
      'Em 3 meses, o método vira reflexo.',
  },
}

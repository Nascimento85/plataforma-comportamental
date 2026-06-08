import type { Playbook } from './types'

export const PLAYBOOK_TABULEIRO_JUNG: Playbook = {
  slug: 'tabuleiro-de-jung',
  titulo: 'O Tabuleiro de Jung nas Empresas',
  subtitulo: 'Reis, Sábios e Heróis: como as forças invisíveis do inconsciente moldam o sucesso ou o caos da sua liderança',
  badge: 'Gratuito · Arquétipos',

  abertura:
    'Se você olhar para a sua empresa hoje, verá organogramas, metas na parede, fluxogramas e relatórios financeiros. É isso que o mundo dos negócios chama de realidade. Mas limitar a sua gestão a essa camada superficial é como pilotar um navio gigante prestando atenção apenas à ponta visível do iceberg. Abaixo do nível consciente, escondido sob os ternos alinhados e os indicadores de performance, existe um teatro invisível que dita cada decisão crucial. Por que alguns líderes gerenciam com punho de ferro, obcecados por ordem, enquanto outros se movem pelo calor da competição e do aplauso rápido? O psiquiatra suíço Carl Gustav Jung descobriu que todos nós carregamos no inconsciente moldes psíquicos ancestrais, os Arquétipos. São softwares mentais que rodam em segundo plano e determinam o que nos motiva, o que nos assusta e como lideramos. A chave de ouro da alta gestão: o DISC diz como as pessoas agem. Os arquétipos revelam por que elas agem. Este manual traduz as principais forças junguianas em personagens práticos do ambiente corporativo, para você identificar quem realmente está sentado na sua mesa de reuniões, neutralizar a sombra de cada líder e canalizar esse poder para construir uma cultura imbatível.',

  secoes: [
    {
      numero: '1.',
      titulo: 'O Teatro Oculto do Poder',
      blocos: [
        { tipo: 'paragrafo',
          conteudo: 'Quando um empresário ignora os arquétipos do seu time de gestão, ele joga um xadrez às cegas. Coloca a peça certa no quadrado errado e depois se frustra com o resultado. Antes de conhecer cada personagem, entenda os erros mais caros de quem lidera sem enxergar o inconsciente.' },
        { tipo: 'lista', itens: [
          'Coloca um Sábio, cuja força é a análise cirúrgica, para liderar um time comercial agressivo que precisa de sangue nos olhos e velocidade, gerando frustração coletiva.',
          'Entrega o crescimento estratégico a um Rei estressado que, dominado pelo medo de perder a ordem, transforma a empresa em um império burocrático e sufocante, matando a inovação.',
          'Exige sensibilidade humana e retenção de talentos de um Herói, perfil que enxerga o mercado como campo de batalha e queima a equipe ao impor um ritmo implacável.',
        ]},
        { tipo: 'callout', variante: 'info', titulo: 'A camada que ninguém vê',
          conteudo: 'O DISC analisa a execução, o comportamento visível. O arquétipo decifra a alma da liderança, a motivação oculta. Quando você cruza os dois, para de gerenciar pessoas no escuro e passa a operar com luz total.' },
      ],
    },
    {
      numero: '2.',
      titulo: 'O Rei: A Força da Ordem e do Comando',
      blocos: [
        { tipo: 'paragrafo',
          conteudo: 'O Rei lidera por posição, estrutura e responsabilidade. Constrói impérios duráveis, estabelece regras claras e transmite segurança à organização. É o guardião da estabilidade. Costuma se manifestar em perfis de alta Dominância e Conformidade (Executor e Analista).' },
        { tipo: 'subtitulo', titulo: 'A luz: onde o Rei constrói' },
        { tipo: 'paragrafo',
          conteudo: 'Excelente em estruturar processos, garantir governança, dar direção em momentos de caos e sustentar a operação sob pressão. Onde há um bom Rei, há previsibilidade e ordem.' },
        { tipo: 'subtitulo', titulo: 'A sombra: o Tirano' },
        { tipo: 'paragrafo',
          conteudo: 'Quando dominado pelo medo de perder o controle, o Rei vira Tirano. Centraliza tudo, sufoca a autonomia do time, transforma a empresa em uma burocracia rígida e mata a inovação. Confunde controle com liderança.' },
        { tipo: 'callout', variante: 'alerta', titulo: 'Como neutralizar a sombra',
          conteudo: 'Dê ao Rei um espelho de dados que prove que delegar não é perder o trono, é expandi-lo. Conecte autonomia da equipe a resultados concretos. O Rei maduro reina servindo, e não oprimindo.' },
      ],
    },
    {
      numero: '3.',
      titulo: 'O Herói: A Força da Conquista e da Velocidade',
      blocos: [
        { tipo: 'paragrafo',
          conteudo: 'O Herói lidera pelo desafio, pela competição e pela vitória. Enxerga o mercado como um campo de batalha e adora superar metas impossíveis. É o motor de crescimento e tração. Costuma se manifestar em perfis de alta Dominância e Influência (Executor e Comunicador).' },
        { tipo: 'subtitulo', titulo: 'A luz: onde o Herói vence' },
        { tipo: 'paragrafo',
          conteudo: 'Imbatível em vendas agressivas, abertura de mercado, viradas de jogo e situações que exigem coragem e velocidade. Onde há um bom Herói, há energia, ambição e resultado rápido.' },
        { tipo: 'subtitulo', titulo: 'A sombra: o Mercenário' },
        { tipo: 'paragrafo',
          conteudo: 'Sem freio, o Herói vira Mercenário. Atropela pessoas, impõe um ritmo desumano, queima talentos e transforma o time em peças descartáveis na busca cega pela vitória. Confunde liderança com guerra.' },
        { tipo: 'callout', variante: 'alerta', titulo: 'Como neutralizar a sombra',
          conteudo: 'Mostre ao Herói que reter talentos é a maior conquista de longo prazo. Transforme o cuidado com a equipe em mais um desafio a ser vencido. O Herói maduro lidera o time para a vitória, não contra ele.' },
      ],
    },
    {
      numero: '4.',
      titulo: 'O Sábio: A Força da Análise e do Conhecimento',
      blocos: [
        { tipo: 'paragrafo',
          conteudo: 'O Sábio lidera pelo conhecimento, pela profundidade técnica e pela busca da verdade nos dados. Estuda antes de agir e valoriza a precisão acima da velocidade. É o cérebro estratégico. Costuma se manifestar em perfis de alta Conformidade e Estabilidade (Analista e Planejador).' },
        { tipo: 'subtitulo', titulo: 'A luz: onde o Sábio ilumina' },
        { tipo: 'paragrafo',
          conteudo: 'Insubstituível em decisões complexas, análise de risco, planejamento de longo prazo e funções que exigem rigor. Onde há um bom Sábio, há decisões sólidas e poucos erros caros.' },
        { tipo: 'subtitulo', titulo: 'A sombra: o Eremita Paralisado' },
        { tipo: 'paragrafo',
          conteudo: 'Sob estresse, o Sábio se isola e cai na paralisia por análise. Quer todos os dados antes de agir, atrasa decisões importantes e perde oportunidades por excesso de cautela. Confunde estudo com inação.' },
        { tipo: 'callout', variante: 'alerta', titulo: 'Como neutralizar a sombra',
          conteudo: 'Imponha ao Sábio prazos e o conceito de decisão suficiente, o famoso bom o bastante. Ensine que, no mundo dos negócios, a decisão rápida com 80% dos dados costuma vencer a decisão perfeita que chega tarde demais.' },
      ],
    },
    {
      numero: '5.',
      titulo: 'O Criador: A Força da Inovação e da Visão',
      blocos: [
        { tipo: 'paragrafo',
          conteudo: 'O Criador lidera pela visão de futuro, pela inovação e pela capacidade de enxergar o que ainda não existe. Inspira pela ideia e abre novos caminhos. É o visionário. Costuma se manifestar em perfis de alta Influência e Abertura ao novo (Comunicador e perfis criativos).' },
        { tipo: 'subtitulo', titulo: 'A luz: onde o Criador inventa' },
        { tipo: 'paragrafo',
          conteudo: 'Brilhante em inovação, novos produtos, transformação e em inspirar o time com um propósito maior. Onde há um bom Criador, há reinvenção e diferenciação no mercado.' },
        { tipo: 'subtitulo', titulo: 'A sombra: o Sonhador Disperso' },
        { tipo: 'paragrafo',
          conteudo: 'Sem disciplina, o Criador vira Sonhador Disperso. Começa mil projetos e não termina nenhum, muda o foco a toda hora e deixa o time perdido em meio a tantas ideias brilhantes que nunca viram realidade. Confunde criatividade com falta de execução.' },
        { tipo: 'callout', variante: 'alerta', titulo: 'Como neutralizar a sombra',
          conteudo: 'Coloque ao lado do Criador um Rei ou um Sábio que transforme a visão em plano com prazos e responsáveis. A maturidade do Criador é proteger o time da próxima ideia genial antes de terminar a atual.' },
      ],
    },
    {
      numero: '6.',
      titulo: 'A Mesa de Xadrez: Montando o Time dos Sonhos',
      blocos: [
        { tipo: 'paragrafo',
          conteudo: 'Nenhum arquétipo é melhor que o outro. A força de uma organização está no equilíbrio das peças no tabuleiro. Um time formado só por Heróis vira uma guerra interna. Um time só de Sábios nunca decide nada. O segredo é a composição.' },
        { tipo: 'lista', itens: [
          'O Rei na estrutura e na governança, garantindo que a casa não desabe.',
          'O Herói na linha de frente comercial e nas viradas de jogo, gerando tração.',
          'O Sábio no controle, no risco e no planejamento, evitando erros caros.',
          'O Criador na inovação e na visão de futuro, mantendo a empresa relevante.',
        ]},
        { tipo: 'callout', variante: 'info', titulo: 'O xeque-mate da gestão',
          conteudo: 'Quando cada arquétipo está na posição que valoriza a sua luz e neutraliza a sua sombra, a empresa para de funcionar à base de esforço heroico do dono e passa a operar como um organismo inteligente que se sustenta sozinho.' },
      ],
    },
  ],

  fechamento: [
    { tipo: 'subtitulo', titulo: 'Acenda as luzes do teatro oculto' },
    { tipo: 'paragrafo',
      conteudo: 'Você não precisa adivinhar qual arquétipo move cada líder do seu time. A plataforma Psique aplica o teste de Arquétipos e o DISC de forma rápida e científica, revelando não só como cada pessoa age, mas por que ela age. Com esses dois mapas na mão, você posiciona cada peça no tabuleiro com precisão e neutraliza a sombra antes que ela custe caro.' },
    { tipo: 'callout', variante: 'sucesso', titulo: 'Descubra os arquétipos do seu time',
      conteudo: 'Faça o seu cadastro gratuito, ganhe créditos no onboarding e aplique o primeiro teste de arquétipos hoje. Comece a reinar sobre o teatro oculto da sua empresa.' },
  ],
}

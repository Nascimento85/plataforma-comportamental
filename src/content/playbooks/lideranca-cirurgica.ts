import type { Playbook } from './types'

export const PLAYBOOK_LIDERANCA_CIRURGICA: Playbook = {
  slug: 'lideranca-cirurgica',
  titulo: 'Liderança Cirúrgica',
  subtitulo: 'O manual prático para decifrar perfis, alocar talentos com precisão e libertar o dono da operação',
  badge: 'Gratuito · Liderança',

  abertura:
    'Imagine entrar em uma sala de cirurgia onde o médico decide o procedimento pelo feeling, pela intuição ou simplesmente porque engrenou com o paciente. Parece absurdo. Em qualquer ciência, intuição sem dados é negligência. Nos negócios, porém, essa cena se repete todos os dias. Milhares de donos gerenciam suas equipes às cegas: contratam pelo currículo, demitem pelo comportamento e, no meio do caminho, tentam motivar e cobrar usando uma única fórmula, a mesma que funcionava para eles mesmos. A verdade crua é que não existem colaboradores 100% incompetentes. Existem profissionais brilhantes sentados nas cadeiras erradas, gerenciados por líderes que ainda não aprenderam a ler os dados do comportamento humano. Liderar não é um dom místico. Liderança é engenharia. É precisão. Este playbook é o método da Liderança Cirúrgica: decifrar o perfil exato de cada pessoa e fazer o corte certo, alocando a pessoa certa, na função certa, recebendo o estímulo correto.',

  secoes: [
    {
      numero: '1.',
      titulo: 'O Mito do Colaborador Incompetente',
      blocos: [
        { tipo: 'paragrafo',
          conteudo: 'Antes de demitir alguém ou se conformar com a média, o líder cirúrgico faz uma pergunta diferente: o problema é a pessoa ou a cadeira em que ela está sentada? Na maioria das vezes, o talento existe, mas está sendo aplicado na função errada, colidindo diretamente com a natureza comportamental do profissional.' },
        { tipo: 'subtitulo', titulo: 'Os três sintomas de quem lidera no escuro' },
        { tipo: 'lista', itens: [
          'A exaustão do microgerenciamento: o dono sente que, se não estiver vigiando cada detalhe, as metas não são batidas.',
          'O abismo do retrabalho: tarefas simples voltam erradas ou fora do prazo, gerando a frase clássica "deixa que eu faço, porque se eu não fizer não fica bem feito".',
          'O custo da cadeira errada: profissionais talentosos produzindo abaixo da média porque foram alocados em funções que brigam com a sua natureza.',
        ]},
        { tipo: 'callout', variante: 'alerta', titulo: 'O erro cirúrgico mais comum',
          conteudo: 'Exigir agressividade comercial de um perfil analítico e processual é um erro de bisturi. Cobrar paciência e rotina repetitiva de um perfil executor focado em velocidade é queimar dinheiro. Você força um especialista a operar uma área que não é a dele e depois culpa a pessoa pelo erro do cirurgião.' },
      ],
    },
    {
      numero: '2.',
      titulo: 'Os 4 Perfis da Sala de Cirurgia',
      blocos: [
        { tipo: 'paragrafo',
          conteudo: 'O método DISC, a ferramenta comportamental mais usada no mundo corporativo, organiza o comportamento humano em quatro forças. Decorar esses quatro perfis é como aprender a ler um raio x: você passa a enxergar o que antes era invisível.' },
        { tipo: 'subtitulo', titulo: 'O Executor (Dominância)' },
        { tipo: 'paragrafo',
          conteudo: 'Movido a resultado, desafio e velocidade. Decide rápido, assume o comando e não tem medo de risco. Onde brilha: vendas agressivas, abertura de mercado, gestão de crise, metas desafiadoras. Onde sangra: tarefas repetitivas, processos minuciosos, funções que exigem paciência e diplomacia. O ponto cego é a falta de empatia e a tendência a atropelar pessoas e processos sob pressão.' },
        { tipo: 'subtitulo', titulo: 'O Comunicador (Influência)' },
        { tipo: 'paragrafo',
          conteudo: 'Movido a relacionamento, reconhecimento e energia social. Engaja, inspira e cria conexões com facilidade. Onde brilha: vendas relacionais, atendimento, marketing, recrutamento, papéis que dependem de carisma. Onde sangra: tarefas administrativas, controle de dados, prazos rígidos e trabalho isolado. O ponto cego é a falta de foco, a desorganização e a dificuldade de receber crítica.' },
        { tipo: 'subtitulo', titulo: 'O Planejador (Estabilidade)' },
        { tipo: 'paragrafo',
          conteudo: 'Movido a previsibilidade, harmonia e constância. É a base confiável que segura o clima e mantém o ritmo. Onde brilha: operações contínuas, suporte, pós venda, funções que exigem paciência e consistência. Onde sangra: mudanças bruscas, decisões rápidas sob pressão e ambientes de conflito aberto. O ponto cego é a resistência à mudança e a dificuldade de dizer não, acumulando tarefas em silêncio.' },
        { tipo: 'subtitulo', titulo: 'O Analista (Conformidade)' },
        { tipo: 'paragrafo',
          conteudo: 'Movido a precisão, dados e qualidade técnica. Estuda, valida e entrega com rigor. Onde brilha: financeiro, jurídico, controladoria, qualidade, engenharia, qualquer função que exija exatidão. Onde sangra: improviso, ambiguidade, pressão por velocidade e exposição social constante. O ponto cego é a paralisia por análise e o perfeccionismo que atrasa entregas.' },
      ],
    },
    {
      numero: '3.',
      titulo: 'O Bisturi da Alocação (Job Matching)',
      blocos: [
        { tipo: 'paragrafo',
          conteudo: 'A alocação cirúrgica é simples de entender e poderosa de aplicar: coloque cada perfil onde a sua energia natural vira combustível, e não desgaste. Veja o mapa de campo.' },
        { tipo: 'lista', itens: [
          'Comercial de caça (prospecção, fechamento agressivo): Executor na liderança, Comunicador no relacionamento. Nunca um Analista puro na linha de frente.',
          'Atendimento e pós venda (relacionamento contínuo): Planejador e Comunicador. O Planejador segura a constância, o Comunicador encanta.',
          'Financeiro, controladoria e jurídico (precisão e risco): Analista, sempre. Exigir velocidade emocional aqui é destruir a qualidade.',
          'Operações e produção (rotina e consistência): Planejador como espinha dorsal, com um Executor liderando os prazos.',
          'Inovação e projetos novos (ambiguidade e risco): Executor e Comunicador. O Planejador e o Analista sofrem com a falta de roteiro.',
        ]},
        { tipo: 'callout', variante: 'info', titulo: 'A regra do bisturi',
          conteudo: 'O custo de manter alguém na cadeira errada não aparece na folha de pagamento, aparece no retrabalho, no turnover e na sua exaustão. Antes de demitir, teste a hipótese do remanejamento. Muitas vezes um profissional vira referência só de mudar de função.' },
      ],
    },
    {
      numero: '4.',
      titulo: 'O Estímulo Correto: Como Cobrar e Motivar Cada Perfil',
      blocos: [
        { tipo: 'paragrafo',
          conteudo: 'A mesma frase que acende um perfil apaga outro. Liderar cirurgicamente é calibrar o estímulo conforme a linguagem nativa de cada pessoa.' },
        { tipo: 'subtitulo', titulo: 'Executor' },
        { tipo: 'paragrafo',
          conteudo: 'Seja direto, foque em desafio e crescimento. Dê autonomia e metas claras. Evite rodeios, microgestão e excesso de sentimentalismo. Ele se motiva com poder de decisão e ranking de resultado.' },
        { tipo: 'subtitulo', titulo: 'Comunicador' },
        { tipo: 'paragrafo',
          conteudo: 'Seja caloroso, reconheça publicamente e dê espaço para ele brilhar. Documente os combinados por escrito ao final, porque ele esquece detalhes. Evite tom frio e foco apenas em erros. Ele se motiva com reconhecimento e ambiente leve.' },
        { tipo: 'subtitulo', titulo: 'Planejador' },
        { tipo: 'paragrafo',
          conteudo: 'Fale com calma, dê previsibilidade e tempo para processar. Antecipe mudanças com aviso. Evite cobranças abruptas e pressão por resposta imediata. Ele se motiva com segurança, estabilidade e um ambiente harmônico.' },
        { tipo: 'subtitulo', titulo: 'Analista' },
        { tipo: 'paragrafo',
          conteudo: 'Traga dados, regras claras e critérios objetivos. Dê tempo para entregar com qualidade. Evite opiniões subjetivas e mudanças sem justificativa. Ele se motiva com domínio técnico e reconhecimento da sua profundidade.' },
      ],
    },
    {
      numero: '5.',
      titulo: 'Libertando o Dono da Operação',
      blocos: [
        { tipo: 'paragrafo',
          conteudo: 'O objetivo final da Liderança Cirúrgica não é apenas montar um bom time, é tirar o dono do meio da operação para que ele volte a fazer a única coisa que só ele pode fazer: pensar o crescimento estratégico do negócio. Isso se chama delegação por perfil.' },
        { tipo: 'subtitulo', titulo: 'Delegue conforme a natureza, não conforme a urgência' },
        { tipo: 'lista', itens: [
          'Delegue decisão e velocidade ao Executor: ele resolve crises e abre frentes sem precisar de você.',
          'Delegue relacionamento e cultura ao Comunicador: ele segura o clima e o engajamento do time.',
          'Delegue continuidade e processo ao Planejador: ele mantém a operação rodando com consistência.',
          'Delegue controle e qualidade ao Analista: ele blinda a empresa de erros caros e retrabalho.',
        ]},
        { tipo: 'callout', variante: 'info', titulo: 'O teste dos 15 dias',
          conteudo: 'A pergunta que mede a sua liberdade real é simples: se você sumisse por 15 dias, a empresa continuaria rodando? Se a resposta for não, o problema não é a sua equipe, é a falta de alocação cirúrgica e de processos que não dependam da sua cabeça.' },
      ],
    },
    {
      numero: '6.',
      titulo: 'Sinais de Alerta: A Pessoa Está na Cadeira Errada',
      blocos: [
        { tipo: 'paragrafo',
          conteudo: 'Antes de concluir que alguém é incompetente, observe estes sinais de que o problema pode ser de encaixe de perfil, e não de capacidade.' },
        { tipo: 'lista', itens: [
          'Gasta energia desproporcional para entregar o básico (sinal de que a função briga com a natureza dela).',
          'Performa muito bem em uma parte da função e trava completamente em outra.',
          'Está sempre cansado, irritado ou desmotivado, mesmo sendo tecnicamente capaz.',
          'Vira outra pessoa quando muda de projeto, de área ou de líder direto.',
        ]},
        { tipo: 'callout', variante: 'alerta', titulo: 'Antes da demissão, o diagnóstico',
          conteudo: 'Demitir sem diagnóstico é jogar dinheiro fora e perder talento. Faça o teste do perfil versus função. Se o problema for puramente de encaixe comportamental, o remanejamento custa muito menos que uma nova contratação e a curva de aprendizado do zero.' },
      ],
    },
  ],

  fechamento: [
    { tipo: 'subtitulo', titulo: 'Pare de liderar no escuro' },
    { tipo: 'paragrafo',
      conteudo: 'Você não precisa adivinhar o perfil de cada pessoa do seu time. A plataforma Psique aplica o DISC e outros mapas comportamentais de forma rápida e científica, e cruza esses dados com a função de cada um, mostrando quem está na cadeira certa e quem precisa de remanejamento. Com a Gestão de Times, você ainda monta a matriz de talentos, prepara devolutivas estruturadas e constrói planos de desenvolvimento por perfil.' },
    { tipo: 'callout', variante: 'sucesso', titulo: 'Pegue o seu bisturi',
      conteudo: 'Faça o seu cadastro gratuito, ganhe créditos no onboarding e aplique o primeiro teste comportamental hoje. Comece a alocar a pessoa certa, na função certa, com o estímulo correto.' },
  ],
}

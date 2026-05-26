// ============================================================
// Framework: Mapeamento de Perfis Disfuncionais (autoria Kênio)
// 6 grupos, 3 perguntas por grupo, triangulação de evidências.
// Esse arquivo é a fonte de verdade injetada no prompt da Claude API
// para gerar roteiros personalizados de entrevista.
// ============================================================

export type PerfilDisfuncionalKey =
  | 'VITIMISTA_RECLAMAO'
  | 'SABOTADOR_RESISTENTE'
  | 'FOFOQUEIRO'
  | 'PROCRASTINADOR'
  | 'CENTRALIZADOR'
  | 'ULTRACOMPETITIVO_APROPRIADOR'

export interface PerguntaInvestigacao {
  numero:     1 | 2 | 3
  texto:      string
  observar?:  string
}

export interface PerfilDisfuncional {
  key:        PerfilDisfuncionalKey
  nome:       string
  rotulo:     string
  descricao:  string
  perguntas:  PerguntaInvestigacao[]
}

// ── Framework completo ──────────────────────────────────────

export const PERFIS_DISFUNCIONAIS: PerfilDisfuncional[] = [
  {
    key:       'VITIMISTA_RECLAMAO',
    nome:      'Vitimista e Reclamão',
    rotulo:    'O Vitimista e O Reclamão',
    descricao: 'Tende a atribuir resultados ruins a fatores externos, e processa feedbacks negativos com passivo agressividade.',
    perguntas: [
      {
        numero: 1,
        texto:  'Me conte sobre uma situação em que você entregou um excelente trabalho, mas o resultado final do projeto deu errado por conta de fatores que fugiam ao seu controle. O que aconteceu e como você lidou com isso?',
      },
      {
        numero: 2,
        texto:  'Se você pudesse voltar ao seu último emprego e mudar apenas uma decisão da diretoria ou da sua liderança direta que você sentiu que prejudicou o seu desempenho, qual seria e por quê?',
        observar: 'O vitimista usará a pergunta para expor o quanto foi injustiçado. O perfil saudável focará no impacto estratégico da decisão e mostrará empatia com o contexto da liderança na época.',
      },
      {
        numero: 3,
        texto:  'Descreva uma ocasião em que você recebeu um feedback com o qual discordava totalmente. O que você fez logo após sair da sala de reunião?',
        observar: 'Busque o comportamento passivo agressivo. O reclamão aceita o feedback na sala, mas sai reclamando com os colegas de equipe ou reduzindo o ritmo de trabalho por pirraça.',
      },
    ],
  },
  {
    key:       'SABOTADOR_RESISTENTE',
    nome:      'Sabotador e Resistente',
    rotulo:    'O Sabotador e O Resistente',
    descricao: 'Resiste à mudança e à autoridade. Pode adotar postura de cruzar os braços diante de decisões com as quais discorda, ou descumprir regras pelas costas.',
    perguntas: [
      {
        numero: 1,
        texto:  'Pense em uma mudança repentina de diretriz, tecnologia ou processo na sua última empresa que você, inicialmente, não concordou de forma alguma. Como foi o seu processo de adaptação e como você comunicou isso ao seu time ou gestor?',
      },
      {
        numero: 2,
        texto:  'Todos nós já implementamos projetos que, no meio do caminho, percebemos que não trariam o retorno esperado, mas a empresa decidiu continuar assim mesmo. Como você se posicionou do meio para o fim desse projeto?',
        observar: 'O sabotador tende a cruzar os braços e deixar o projeto naufragar para poder dizer "eu avisei". O profissional colaborativo trabalha para mitigar os danos, mesmo sabendo que a ideia original não era sua.',
      },
      {
        numero: 3,
        texto:  'Me dê um exemplo de uma regra, processo ou burocracia da sua antiga empresa que você achava completamente inútil e o que você fazia a respeito dela no dia a dia.',
        observar: 'O resistente apenas descumpre a regra pelas costas (sabotagem oculta) ou vive reclamando dela. O perfil maduro tenta otimizar o processo pelos canais oficiais ou aceita que algumas regras existem por conformidade jurídica ou compliance.',
      },
    ],
  },
  {
    key:       'FOFOQUEIRO',
    nome:      'Fofoqueiro',
    rotulo:    'O Fofoqueiro (O Poluente de Clima)',
    descricao: 'Alimenta ruídos informais, vaza informações confidenciais e busca status por saber das coisas primeiro.',
    perguntas: [
      {
        numero: 1,
        texto:  'Todos nós já trabalhamos em ambientes onde o clima organizacional ficou pesado ou onde sabíamos de decisões antes que elas fossem oficializadas. Quando você percebia que um boato ou uma insatisfação geral estava correndo nos bastidores da sua equipe, como você agia?',
      },
      {
        numero: 2,
        texto:  'Se um colega de trabalho de outra área viesse desabafar com você, de forma recorrente, criticando abertamente o estilo de liderança do gestor dele (que não é o seu), qual seria a sua postura com esse colega?',
        observar: 'O fofoqueiro adora ser o "confidente" e alimentar o fogo dando corda ao assunto. O profissional ético corta sutilmente, orientando o colega a conversar diretamente com quem de direito ou mantendo neutralidade estrita.',
      },
      {
        numero: 3,
        texto:  'Conte uma situação em que você descobriu uma informação confidencial da empresa ou de um colega antes que ela se tornasse pública. O que você fez com essa informação?',
        observar: 'Avalie o nível de discrição e controle do impulso de compartilhar o segredo para ganhar status ou relevância no grupo.',
      },
    ],
  },
  {
    key:       'PROCRASTINADOR',
    nome:      'Procrastinador',
    rotulo:    'O Procrastinador',
    descricao: 'Falta de disciplina temporal. Adia tarefas chatas ou de prazo longo, concentra o esforço no final.',
    perguntas: [
      {
        numero: 1,
        texto:  'Descreva um período em que o seu volume de demandas ficou completamente fora do controle e você percebeu que não conseguiria entregar tudo no prazo. Como você organizou suas próximas 48 horas e qual foi o impacto real nas entregas?',
      },
      {
        numero: 2,
        texto:  'Me conte sobre um projeto ou tarefa específica da sua rotina anterior que você considerava extremamente chata, operacional ou burocrática. Como você geria o seu tempo para garantir que ela fosse feita?',
        observar: 'O procrastinador empurra essa tarefa para o final da sexta ou para o último dia do mês. Busque por métodos de disciplina (ex: "eu fazia essa tarefa logo na primeira hora da manhã para me livrar dela").',
      },
      {
        numero: 3,
        texto:  'Qual foi o prazo mais longo que você já teve para entregar um grande projeto e como foi a sua curva de esforço? Você trabalhou de forma linear ou o ritmo acelerou drasticamente nas semanas finais?',
        observar: 'Se o candidato confessar (ou demonstrar na narrativa) que o pico de esforço aconteceu apenas nos últimos 10% do prazo total, há uma forte tendência à procrastinação estrutural.',
      },
    ],
  },
  {
    key:       'CENTRALIZADOR',
    nome:      'Centralizador',
    rotulo:    'O Centralizador',
    descricao: 'Tem dificuldade de delegar, faz microgestão, e em momentos de pressão toma tarefas dos liderados em vez de desenvolver o time.',
    perguntas: [
      {
        numero: 1,
        texto:  'Se você precisasse se afastar abruptamente da sua operação por 15 dias hoje, o que aconteceria com os seus principais projetos? Quem assumiria e quais ferramentas ou rituais garantiriam que o padrão de qualidade fosse mantido?',
      },
      {
        numero: 2,
        texto:  'Me dê um exemplo de uma tarefa que você adorava fazer e executava com maestria, mas que teve que delegar para um liderado ou par para focar em coisas mais estratégicas. Como foi o seu processo de desapego e monitoramento?',
        observar: 'O centralizador sofre para desapegar. Ele costuma dizer que delegou, mas confessa que ficava revisando linha por linha, fazendo microgestão sufocante.',
      },
      {
        numero: 3,
        texto:  'Pense em uma situação onde um liderado ou colega entregou um trabalho importante fora do padrão que você esperava, e o prazo de entrega final para o cliente era no dia seguinte. O que você fez?',
        observar: 'O centralizador toma a tarefa para si e passa a noite fazendo ("Deixa que eu faço do meu jeito pra garantir"). O líder desenvolvedor corrige com a pessoa ou dá as diretrizes para que ela ajuste a tempo, usando o erro como aprendizado pedagógico.',
      },
    ],
  },
  {
    key:       'ULTRACOMPETITIVO_APROPRIADOR',
    nome:      'Ultracompetitivo e Apropriador de crédito',
    rotulo:    'O Ultracompetitivo e O Apropriador de Crédito',
    descricao: 'Vê colegas como ameaça, relativiza mérito alheio, e em última instância veste sucessos coletivos como individuais.',
    perguntas: [
      {
        numero: 1,
        texto:  'Me fale sobre o projeto de maior orgulho da sua carreira recente. Como foi a divisão de tarefas e qual foi a contribuição específica das outras pessoas envolvidas?',
      },
      {
        numero: 2,
        texto:  'Se fôssemos premiar a sua equipe pelo resultado do último trimestre, mas o orçamento só permitisse dar o bônus de destaque para um colega seu (excluindo você), quem você indicaria e qual o argumento usaria para defender a indicação perante a diretoria?',
        observar: 'O ultracompetitivo sente dor física ao elogiar um par ou ao dar destaque legítimo a outra pessoa. Ele tentará relativizar o mérito do colega ou indicar alguém que não represente ameaça ao seu ego.',
      },
      {
        numero: 3,
        texto:  'Descreva uma situação em que uma ideia sua foi rejeitada pela equipe ou pelo gestor, e a ideia escolhida foi a de um colega. Como você agiu durante a execução da ideia dele?',
        observar: 'O apropriador ou ultracompetitivo tende a torcer contra a ideia do colega ou a tentar melhorar a ideia do outro de forma invasiva para colocar a sua própria assinatura no sucesso alheio.',
      },
    ],
  },
]

// Mapa rápido por key
export const PERFIS_DISFUNCIONAIS_MAP: Record<PerfilDisfuncionalKey, PerfilDisfuncional> =
  Object.fromEntries(PERFIS_DISFUNCIONAIS.map(p => [p.key, p])) as Record<PerfilDisfuncionalKey, PerfilDisfuncional>

// ── Conceito âncora: Fator de Triangulação ──────────────────

export const FATOR_TRIANGULACAO_DESCRICAO = `O Fator de Triangulação é a técnica central deste framework: se na Pergunta 1 o candidato deixou uma leve dúvida sobre um padrão disfuncional, o entrevistador NÃO deve confrontar diretamente. Ele avança na entrevista com outros temas e, 15 minutos depois, aplica a Pergunta 3 do mesmo bloco. Se o padrão comportamental disfuncional se repetir na narrativa de duas situações históricas diferentes, o diagnóstico está confirmado.`

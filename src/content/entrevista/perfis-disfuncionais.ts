// ============================================================
// Framework: Mapeamento de Perfis Disfuncionais (autoria Kênio)
// 6 grupos, 3 perguntas por grupo, triangulação de evidências.
// Versão CURTA: perguntas redigidas para serem lidas, decoradas
// e ditas com naturalidade pelo entrevistador.
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
        texto:  'Me conta de uma vez que você fez um trabalho excelente, mas o projeto deu errado por coisas fora do seu controle. O que aconteceu?',
      },
      {
        numero: 2,
        texto:  'Se pudesse voltar no seu último emprego e mudar uma decisão da liderança que te atrapalhou, qual seria e por quê?',
        observar: 'O vitimista usará a pergunta para expor o quanto foi injustiçado. O perfil saudável focará no impacto estratégico da decisão e mostrará empatia com o contexto da liderança na época.',
      },
      {
        numero: 3,
        texto:  'Conta uma vez que você recebeu um feedback que discordou totalmente. O que fez logo depois de sair da sala?',
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
        texto:  'Lembra de uma mudança grande no último emprego que você inicialmente não concordou? Como foi sua adaptação?',
      },
      {
        numero: 2,
        texto:  'Já participou de algum projeto que no meio do caminho você percebeu que não ia dar certo, mas a empresa seguiu mesmo assim? Como você reagiu?',
        observar: 'O sabotador tende a cruzar os braços e deixar o projeto naufragar para poder dizer "eu avisei". O profissional colaborativo trabalha para mitigar os danos, mesmo sabendo que a ideia original não era sua.',
      },
      {
        numero: 3,
        texto:  'Me dá um exemplo de uma regra que você achava inútil no seu último emprego. O que você fazia com ela no dia a dia?',
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
        texto:  'Quando o clima do time fica pesado ou começa a rolar um boato nos bastidores, como você costuma reagir?',
      },
      {
        numero: 2,
        texto:  'Imagina que um colega de outra área vem reclamar sempre do gestor dele com você. O que você faz nessa situação?',
        observar: 'O fofoqueiro adora ser o "confidente" e alimentar o fogo dando corda ao assunto. O profissional ético corta sutilmente, orientando o colega a conversar diretamente com quem de direito ou mantendo neutralidade estrita.',
      },
      {
        numero: 3,
        texto:  'Conta de uma vez que você ficou sabendo de uma informação confidencial antes da hora. O que fez com ela?',
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
        texto:  'Lembra de um momento em que as demandas saíram do controle e você não ia conseguir entregar tudo? Como organizou as 48 horas seguintes?',
      },
      {
        numero: 2,
        texto:  'Me conta de uma tarefa chata da sua rotina anterior. Como você organizava seu tempo pra ela sair?',
        observar: 'O procrastinador empurra essa tarefa para o final da sexta ou para o último dia do mês. Busque por métodos de disciplina (ex: "eu fazia essa tarefa logo na primeira hora da manhã para me livrar dela").',
      },
      {
        numero: 3,
        texto:  'Qual foi o projeto mais longo que você entregou? Como foi sua curva de esforço, ritmo constante ou apertou no fim?',
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
        texto:  'Se você sumisse por 15 dias hoje, o que aconteceria com seus principais projetos? Quem cobriria?',
      },
      {
        numero: 2,
        texto:  'Me conta de uma tarefa que você adorava fazer, mas teve que delegar pra focar em coisa mais estratégica. Como foi soltar?',
        observar: 'O centralizador sofre para desapegar. Ele costuma dizer que delegou, mas confessa que ficava revisando linha por linha, fazendo microgestão sufocante.',
      },
      {
        numero: 3,
        texto:  'Imagina que um liderado entrega algo importante fora do padrão, e o prazo final pro cliente é amanhã. O que você faz?',
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
        texto:  'Me fala do projeto que você mais orgulha na carreira recente. Como foi a divisão de tarefas e o que cada um fez?',
      },
      {
        numero: 2,
        texto:  'Se a empresa fosse dar um bônus de destaque pra UM colega seu, excluindo você, quem você indicaria e por quê?',
        observar: 'O ultracompetitivo sente dor física ao elogiar um par ou ao dar destaque legítimo a outra pessoa. Ele tentará relativizar o mérito do colega ou indicar alguém que não represente ameaça ao seu ego.',
      },
      {
        numero: 3,
        texto:  'Conta de uma vez que sua ideia foi rejeitada e a do colega foi a escolhida. Como você agiu durante a execução?',
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

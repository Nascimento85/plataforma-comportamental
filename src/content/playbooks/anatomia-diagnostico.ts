import type { Playbook } from './types'

export const PLAYBOOK_ANATOMIA_DIAGNOSTICO: Playbook = {
  slug: 'anatomia-do-diagnostico',
  titulo: 'A Anatomia do Diagnóstico',
  subtitulo: 'Por que empresas que gerenciam sintomas quebram, enquanto empresas que diagnosticam a liderança escalam',
  badge: 'Gratuito · Diagnóstico',

  abertura:
    'Quando o dono de uma pequena ou média empresa percebe que as coisas não vão bem, a reação imediata é olhar para o lugar errado: a ponta final da linha. Se o faturamento cai, ele diz que o comercial é fraco. Se o time atrasa entregas, ele diz que essa geração não quer trabalhar. Se ele está exausto, culpa o mercado difícil e a falta de braços. No entanto, em mais de 90% dos casos, isso não é a causa do problema. São apenas os sintomas. Tentar resolver a queda de faturamento trocando o vendedor sem antes entender a liderança é como tomar um analgésico para a dor de uma fratura exposta: a dor passa por duas horas, mas o osso continua partido por dentro. Este manual mostra a engenharia por trás de um diagnóstico de verdade, aquele que arranca a venda dos olhos do empresário e revela que a estagnação raramente vem do mercado, e quase sempre vem da falha de comunicação entre as duas cadeiras mais importantes do negócio.',

  secoes: [
    {
      numero: '1.',
      titulo: 'O Erro Fatal: Confundir Sintoma com Causa Raiz',
      blocos: [
        { tipo: 'paragrafo',
          conteudo: 'O empresário sobrecarregado vive apagando incêndios. Cada problema que aparece, ele trata como um evento isolado, troca a peça e segue. O resultado é uma roda viva: os mesmos problemas voltam com nomes diferentes, e ele nunca entende por quê.' },
        { tipo: 'subtitulo', titulo: 'Os sintomas que enganam o dono' },
        { tipo: 'lista', itens: [
          'Faturamento caiu, o reflexo é dizer que o comercial é fraco e trocar o vendedor.',
          'Entregas atrasam, o reflexo é dizer que o time não tem comprometimento.',
          'O dono vive exausto, o reflexo é culpar o mercado e a falta de mão de obra.',
        ]},
        { tipo: 'callout', variante: 'alerta', titulo: 'A verdade incômoda',
          conteudo: 'Trocar pessoas e cobrar mais resultado sem diagnosticar a liderança é remediar a dor sem tratar a fratura. O custo aparece depois: turnover alto, retrabalho crônico e um dono que trabalha cada vez mais e cresce cada vez menos.' },
      ],
    },
    {
      numero: '2.',
      titulo: 'A Ressonância Magnética do Negócio',
      blocos: [
        { tipo: 'paragrafo',
          conteudo: 'Um diagnóstico de liderança bem estruturado funciona como uma ressonância magnética do negócio. Ele cruza a visão do Dono com a realidade do Líder, dividida em quatro quadrantes que se interligam de forma sistêmica. Os dois primeiros são os sintomas que o dono sente na pele. Os dois últimos são a causa oculta que ninguém olha.' },
        { tipo: 'subtitulo', titulo: 'Os 4 quadrantes interligados' },
        { tipo: 'lista', itens: [
          'Sintoma 1, Resultados e Metas: a falta de dinheiro e a imprevisibilidade do caixa.',
          'Sintoma 2, Autonomia da Operação: o dono virou escravo da própria empresa.',
          'Causa 3, Engajamento da Equipe: o time está solto, sem clareza do que fazer.',
          'Causa 4, Cultura de Liderança: a raiz de tudo, líderes sem treino, processo ou ferramentas.',
        ]},
        { tipo: 'callout', variante: 'info', titulo: 'O fluxo invisível',
          conteudo: 'A causa 4 contamina o sintoma 1. A causa 3 alimenta o sintoma 2. Quando a cultura de liderança é fraca, a equipe fica sem clareza, a operação prende o dono e o resultado financeiro despenca. Tudo está conectado, e tudo começa na liderança.' },
      ],
    },
    {
      numero: '3.',
      titulo: 'Resultados e Metas: o Painel de Bordo',
      blocos: [
        { tipo: 'paragrafo',
          conteudo: 'Se a sua empresa não atinge o lucro esperado de forma previsível, o problema raramente é o produto. É a falta de cadência e clareza da liderança. Quando o líder não sabe desdobrar uma meta macro em metas diárias micro para o time, a operação patina.' },
        { tipo: 'callout', variante: 'info', titulo: 'A pergunta que o painel responde',
          conteudo: 'Você tem um negócio previsível ou uma casa de apostas? O diagnóstico mede se o seu resultado vem de um sistema que se repete, ou da sorte de um mês bom seguido por um mês de pânico.' },
      ],
    },
    {
      numero: '4.',
      titulo: 'Autonomia da Operação: o Teste da Liberdade',
      blocos: [
        { tipo: 'paragrafo',
          conteudo: 'Se você se afasta por 15 dias e a empresa para, você não tem uma empresa, você tem um emprego altamente estressante onde é o patrão de si mesmo. A falta de autonomia é o sintoma claro de que a sua liderança intermediária não foi treinada para decidir, ela foi viciada a usar você como muleta para tudo.' },
        { tipo: 'callout', variante: 'alerta', titulo: 'O preço da muleta',
          conteudo: 'Cada decisão pequena que passa por você é um minuto que você não gasta pensando no crescimento. O dono insubstituível não é um herói, é um gargalo. A liberdade só vem quando a liderança aprende a andar sem a sua mão.' },
      ],
    },
    {
      numero: '5.',
      titulo: 'Engajamento e Cultura: a Raiz de Tudo',
      blocos: [
        { tipo: 'paragrafo',
          conteudo: 'O time não veste a camisa porque o ser humano só se engaja naquilo que compreende. Se o líder não tem rotina de feedback, se o time só ouve cobrança quando algo dá errado, o clima azeda. O diagnóstico expõe se a sua equipe está jogando com você ou apenas esperando o quinto dia útil para receber o salário.' },
        { tipo: 'paragrafo',
          conteudo: 'E aqui está o bloco que fecha a conta. Se o seu líder responde que não recebe treinamento, que não tem ferramentas para motivar o time e que as metas mudam toda hora, o diagnóstico entrega o veredicto final.' },
        { tipo: 'callout', variante: 'alerta', titulo: 'O veredicto',
          conteudo: 'Você está cobrando postura de Diretor de quem está sendo tratado e treinado como Operário. O líder não é fraco, ele foi colocado no cargo sem preparo, sem ferramenta e sem direção, e ainda assim é cobrado como se fosse um general experiente.' },
      ],
    },
    {
      numero: '6.',
      titulo: 'O Efeito Espelho: o Poder do Cruzamento',
      blocos: [
        { tipo: 'paragrafo',
          conteudo: 'A verdadeira mágica do diagnóstico não está nas respostas isoladas, mas no cruzamento das visões. É quando colocamos a percepção do Dono lado a lado com a realidade do Líder que o ponto de dor aparece com clareza cirúrgica.' },
        { tipo: 'callout', variante: 'info', titulo: 'O ponto exato onde a empresa perde dinheiro',
          conteudo: 'Quando o Dono dá nota 5 para "minha equipe sabe exatamente o que fazer", e o Líder dá nota 2 para "as metas do meu setor são claras", o sistema encontra o abismo de comunicação. Não é o mercado, não é a economia, não é o governo. É a desconexão entre as duas cadeiras mais importantes do negócio.' },
        { tipo: 'paragrafo',
          conteudo: 'Com esse relatório em mãos, o dono deixa de ser um bombeiro emocional que reage ao caos e passa a ser um gestor cirúrgico que sabe exatamente onde aplicar o remédio: no desenvolvimento e alinhamento dos seus líderes. Responder o diagnóstico não é perder tempo preenchendo formulário, é fazer um check-up de saúde financeira e operacional do próprio patrimônio.' },
      ],
    },
  ],

  fechamento: [
    { tipo: 'subtitulo', titulo: 'Faça o check-up do seu patrimônio' },
    { tipo: 'paragrafo',
      conteudo: 'A plataforma Psique transforma essa engenharia em um diagnóstico de 3 minutos. O Dono responde, envia um link para o seu principal líder, e o sistema cruza as duas visões gerando um raio x de maturidade da empresa, os pontos exatos de atrito e um plano de ação prático. Tudo no seu e-mail, sem custo.' },
    { tipo: 'callout', variante: 'sucesso', titulo: 'Diagnostique a sua liderança agora',
      conteudo: 'Acesse o Diagnóstico de Liderança gratuito da Psique e descubra em minutos onde o seu negócio está travando. Pare de gerenciar sintomas e comece a tratar a causa raiz.' },
  ],
}

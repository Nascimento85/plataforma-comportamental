// ============================================================
// VAC, Devolutivas (perfis predominantes + canais combinados)
// Linguagem direta, simples, sem hífens.
// ============================================================

import type { VacChannel } from './questions'

export interface VacChannelReport {
  channel:           VacChannel
  nome:              string
  fraseImpacto:      string
  caracteristicas:   string[]
  comunicacao:       string
  pontoDeMelhoria:   string
  emoji:             string
  cor:               string
}

// ── Perfis predominantes ──────────────────────────────────────

export const VAC_CHANNEL_REPORTS: Record<VacChannel, VacChannelReport> = {
  V: {
    channel: 'V',
    nome: 'Visual',
    fraseImpacto: 'Uma imagem vale mais que mil palavras.',
    caracteristicas: [
      'Pensa em imagens. Costuma "ver" as situações antes de falar sobre elas.',
      'Tem raciocínio rápido e fala em ritmo acelerado, porque tenta acompanhar o filme que passa na própria cabeça.',
      'Valoriza organização, estética e cuidado com a aparência das coisas (slides, ambiente, roupas).',
      'Foco forte em prazos visíveis: agenda, cronograma, lista, calendário.',
    ],
    comunicacao: 'Precisa de contato visual para se sentir conectado. Prefere e mails detalhados, gráficos claros, vídeos curtos e apresentações bem desenhadas no lugar de telefonemas longos. Use cores, ícones e diagramas quando for explicar algo importante para essa pessoa.',
    pontoDeMelhoria: 'Pode parecer impaciente ou superficial se ficar olhando apenas para a aparência das situações. Sob estresse, ambiente bagunçado, tela cheia de notificações ou desorganização visual desestabilizam essa pessoa de forma desproporcional. Treine pausas para escutar antes de responder.',
    emoji: '👁',
    cor: '#3d4f7c',
  },
  A: {
    channel: 'A',
    nome: 'Auditivo',
    fraseImpacto: 'As palavras têm poder e o tom diz tudo.',
    caracteristicas: [
      'Pensa em sequências lógicas e em palavras bem encadeadas.',
      'Fala de forma pausada, ritmada e precisa, escolhendo as palavras com cuidado.',
      'Sabe escutar muito bem e memoriza instruções verbais com facilidade.',
      'Valoriza diálogos profundos e conversas que façam sentido.',
    ],
    comunicacao: 'Prefere reuniões alinhadas pelo diálogo, ligações de voz e conversas presenciais bem estruturadas. Argumentos lógicos, bem encadeados e ditos com clareza convencem mais essa pessoa do que slides bonitos. Cuide do tom de voz quando falar com ela, ela percebe tudo.',
    pontoDeMelhoria: 'Pode se distrair muito com barulho do ambiente. Pode também monopolizar conversas se não policiar o próprio diálogo interno. Em momentos de tensão, tende a soar muito analítica ou até rígida. Treine ouvir o corpo e os silêncios, não só as palavras.',
    emoji: '👂',
    cor: '#c4633a',
  },
  S: {
    channel: 'S',
    nome: 'Sinestésico',
    fraseImpacto: 'É preciso sentir para crer e realizar.',
    caracteristicas: [
      'Guiado pelo sentimento, pela intuição e pelas sensações físicas que percebe no corpo.',
      'Age de forma mais lenta e ponderada, porque precisa "processar" emocionalmente cada situação.',
      'Valoriza conforto, bem estar, proximidade e relacionamentos sinceros.',
      'Costuma aprender fazendo, experimentando e errando.',
    ],
    comunicacao: 'Precisa de empatia, olho no olho e, quando o contexto permite, proximidade física (aperto de mão firme, abraço, toque no ombro). Para conquistar essa pessoa, crie ambiente seguro antes de cobrar resultado. Mostre que você se importa com ela, não só com a tarefa.',
    pontoDeMelhoria: 'Pode demorar mais para tomar decisões, porque precisa "sentir" se a escolha está certa. Sob estresse, absorve a tensão fisicamente (dor de cabeça, ombros travados, problemas de estômago). Treine separar o que é fato do que é apenas sensação corporal momentânea.',
    emoji: '🤝',
    cor: '#7a9e7e',
  },
}

// ── Canais Combinados ────────────────────────────────────────
// Quando o candidato pontua alto em DOIS canais ao mesmo tempo,
// surgem perfis combinados muito específicos.

export interface VacCombinedReport {
  combinacao:  'VA' | 'AS' | 'VS'
  nome:        string
  descricao:   string
  brilhaEm:    string
  cuidadoCom:  string
}

export const VAC_COMBINED_REPORTS: Record<'VA' | 'AS' | 'VS', VacCombinedReport> = {
  VA: {
    combinacao: 'VA',
    nome: 'O Comunicador de Palco (Visual + Auditivo)',
    descricao: 'Você combina pensamento estruturado em imagens com domínio da palavra falada. Consegue planejar visualmente o discurso e entregar a mensagem com clareza, ritmo e impacto.',
    brilhaEm: 'Apresentações públicas, treinamentos, liderança de comando, vendas consultivas, marketing, ensino e qualquer função em que a sua imagem e a sua voz sejam ferramentas de trabalho.',
    cuidadoCom: 'Pode parecer "performático" para perfis sinestésicos, que valorizam mais o sentimento do que a apresentação. Treine pausas para deixar o outro também falar.',
  },
  AS: {
    combinacao: 'AS',
    nome: 'O Conselheiro Empático (Auditivo + Sinestésico)',
    descricao: 'Você é a pessoa que escuta com profundidade e sente junto. Consegue captar o que está dito e também o que está sendo guardado nas entrelinhas.',
    brilhaEm: 'RH, terapia, coaching, mediação de conflitos, negociação bilateral, suporte ao cliente, atendimento humanizado e qualquer função que envolva acolhimento e escuta ativa.',
    cuidadoCom: 'Pode absorver tensão demais do ambiente e levar para casa o problema dos outros. Treine criar limites saudáveis para não esgotar a sua energia emocional.',
  },
  VS: {
    combinacao: 'VS',
    nome: 'O Construtor Prático (Visual + Sinestésico)',
    descricao: 'Você combina a clareza visual de quem enxerga o projeto pronto com a habilidade manual de quem precisa sentir o processo na pele. Vê o todo e coloca a mão na massa.',
    brilhaEm: 'Execução prática, design, arquitetura, engenharia, gestão de produto, operações, arte, gastronomia e qualquer função que exija desenhar a solução E executar com qualidade.',
    cuidadoCom: 'Pode subestimar o lado verbal e perder oportunidades de defender as próprias ideias em reuniões. Treine articular em palavras o que você já vê na imagem mental.',
  },
}

// ── Texto introdutório da devolutiva ──────────────────────────

export const VAC_INTRO_DEVOLUTIVA = `Esta análise mapeia como seu cérebro recebe e processa o mundo. Cada pessoa usa os três canais sensoriais (visão, audição e sinestesia), mas costuma ter um ou dois canais mais ativos no dia a dia. Conhecer os seus canais predominantes muda a forma como você se comunica, decide, aprende e se relaciona.

Os valores em porcentagem mostram a intensidade de cada canal de forma isolada (não somam 100). É comum ter, por exemplo, 80% Visual, 65% Auditivo e 40% Sinestésico. Isso significa que os três canais estão ativos, mas o Visual lidera.`

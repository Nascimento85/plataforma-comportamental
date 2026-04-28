// ============================================================
// Questionário Premium — Estável (S)
// "Saúde Emocional no Trabalho — Check-in Semanal"
// ~4-6 páginas. Editável toda sexta-feira.
// ============================================================

import type { PdfBody } from '../types'

export const stableQuestionnaireBody: PdfBody = {
  runningTitle: 'Saúde Emocional no Trabalho · S',

  epigraph: {
    text:
      'Você acompanha sua estabilidade real, não a aparente. Quem se mede, se ' +
      'protege. Quem só sobrevive a semana, paga depois.',
  },

  chapters: [
    {
      number: 1,
      title: 'Como Usar Este Questionário',
      subtitle: '10 minutos toda sexta. Sem exceção.',
      blocks: [
        {
          type: 'lead',
          text:
            'O Estável aguenta MUITO antes de admitir cansaço. Esse questionário força ' +
            'você a ver o que sua paciência habitual esconde. 10 minutos de honestidade ' +
            'por semana > 6 meses de terapia futura.',
        },
        {
          type: 'h2',
          text: 'Regras de uso',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Toda sexta-feira, entre 16h e 17h. Crie hábito.',
            'Local privado. Nada de sala compartilhada.',
            'Honestidade total — ninguém vai ver',
            'Por 4 semanas seguidas. Em 30 dias o padrão aparece.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          text:
            'Se em alguma semana você notar 3+ sinais de alerta, agende com profissional ' +
            '(terapeuta, médico, mentor). Não normalize. Não engula. Auto-cuidado é ' +
            'profissionalismo.',
        },
      ],
    },

    {
      number: 2,
      title: 'Check-in Semanal',
      subtitle: '5 perguntas + termômetro',
      blocks: [
        {
          type: 'h2',
          text: 'Pergunta 1 — Como me senti essa semana? (escala 0–10)',
        },
        {
          type: 'kv',
          items: [
            { k: '0–3', v: 'Drenado, exausto, sem energia' },
            { k: '4–6', v: 'Mediano — alternando momentos bons e ruins' },
            { k: '7–9', v: 'Bem — energia presente na maioria dos dias' },
            { k: '10',  v: 'Excelente — semana memorável' },
          ],
        },
        {
          type: 'p',
          text: 'Sua nota: ___',
        },
        {
          type: 'h2',
          text: 'Pergunta 2 — Quantas vezes disse "sim" sem querer dizer?',
        },
        {
          type: 'p',
          text: 'Contador da semana: ___',
        },
        {
          type: 'callout',
          tone: 'tip',
          text:
            'Esse é O indicador mais importante para o Estável. Em pessoas que adoecem ' +
            'em 12 meses, esse número cresce gradualmente sem ser percebido. Se você notar ' +
            '>5 por 4 semanas seguidas, é alerta vermelho.',
        },
        {
          type: 'h2',
          text: 'Pergunta 3 — Algum conflito adiado essa semana?',
        },
        {
          type: 'p',
          text: 'Qual? ____________________________________________',
        },
        {
          type: 'p',
          text: 'Por que adiou? ____________________________________',
        },
        {
          type: 'p',
          text: 'Quando vai resolver? _____________________________',
        },
        {
          type: 'h2',
          text: 'Pergunta 4 — Algum reconhecimento RECEBIDO?',
        },
        {
          type: 'p',
          text: 'De quem? Por quê? ________________________________',
        },
        {
          type: 'callout',
          tone: 'do',
          text:
            'Se você não recebeu reconhecimento na semana, NÃO é porque não merece. ' +
            'É porque o sistema não te enxergou. Use o Playbook de Liderança Silenciosa ' +
            'para ajustar visibilidade.',
        },
        {
          type: 'h2',
          text: 'Pergunta 5 — Algum reconhecimento DADO por você?',
        },
        {
          type: 'p',
          text: 'A quem? Por quê? __________________________________',
        },
      ],
    },

    {
      number: 3,
      title: 'Os 5 Sinais de Alerta',
      subtitle: 'Marque os que aconteceram essa semana',
      blocks: [
        {
          type: 'check',
          items: [
            'Dormi menos de 6h em 3+ noites da semana',
            'Pulei 1+ refeição por estar "muito ocupado"',
            'Senti dor de cabeça/estômago em 2+ dias seguidos',
            'Perdi a paciência com cônjuge/filhos/pais (sem motivo proporcional)',
            'Acordei pensando em trabalho 2+ vezes na madrugada',
            'Senti vontade de "sumir uma semana" mais de 1 vez',
            'Tomei refrigerante/álcool acima da média',
            'Não exercitei nem 1 vez (e tinha planejado)',
            'Senti aperto no peito durante o dia',
            'Tive dificuldade em começar tarefas que normalmente faria fácil',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          text:
            'Conte: 0-2 marcas é normal; 3-5 marcas é alerta amarelo (revise rotina); ' +
            '6+ marcas é alerta vermelho (busque apoio profissional NESTA semana).',
        },
      ],
    },

    {
      number: 4,
      title: 'Reflexão da Semana',
      subtitle: '3 perguntas que mudam o próximo ciclo',
      blocks: [
        {
          type: 'h2',
          text: '1. O que me ENERGIZOU essa semana? (3 coisas)',
        },
        {
          type: 'list',
          items: ['______________________________', '______________________________', '______________________________'],
        },
        {
          type: 'h2',
          text: '2. Qual desconforto controlado experimentei?',
        },
        {
          type: 'p',
          text: '____________________________________________________',
        },
        {
          type: 'callout',
          tone: 'tip',
          text:
            'Estável precisa de DESCONFORTO CONTROLADO semanal. Pode ser: discordar em ' +
            'reunião, falar de salário, dizer "não", pedir feedback. Sem esse músculo, ' +
            'a paz vira estagnação.',
        },
        {
          type: 'h2',
          text: '3. Qual ajuste vou fazer na próxima semana?',
        },
        {
          type: 'p',
          text:
            'UMA mudança específica, mensurável, executável. Não 5. UMA.',
        },
        {
          type: 'p',
          text: '____________________________________________________',
        },
      ],
    },

    {
      number: 5,
      title: 'Painel Mensal — 4 Semanas',
      subtitle: 'O dado vira clareza',
      blocks: [
        {
          type: 'lead',
          text:
            'Após 4 semanas seguidas, preencha esse painel. É aqui que padrões emergem. ' +
            'Sem esse dado, você só recorda o que sentiu — e a memória mente.',
        },
        {
          type: 'table',
          headers: ['Semana', 'Nota geral (0-10)', '"Sim" sem querer', 'Sinais de alerta'],
          rows: [
            ['Semana 1', '___', '___', '___ / 10'],
            ['Semana 2', '___', '___', '___ / 10'],
            ['Semana 3', '___', '___', '___ / 10'],
            ['Semana 4', '___', '___', '___ / 10'],
          ],
        },
        {
          type: 'h2',
          text: 'Reflexão do mês',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'A nota geral subiu, ficou estável ou caiu? Por quê?',
            'O contador de "sim sem querer" subiu? Onde?',
            'Os sinais de alerta diminuíram? Aumentaram?',
            'Qual padrão você vê no mês?',
            'O que vai mudar no próximo mês?',
          ],
        },
      ],
    },
  ],

  closing: {
    headline: 'Quem se mede, se protege. Quem se protege, dura mais.',
    subtext:
      'Em 12 meses fazendo esse check-in, você terá um mapa profundo do seu próprio ' +
      'funcionamento. Use-o para decidir mudanças grandes com calma e dado.',
  },
}

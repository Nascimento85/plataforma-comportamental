// ============================================================
// Checklist Premium — Analista (C)
// "Checklist de Decisão Rápida — em 10 minutos"
// ~4-6 páginas. Editável a cada decisão.
// ============================================================

import type { PdfBody } from '../types'

export const analystChecklistBody: PdfBody = {
  runningTitle: 'Checklist de Decisão Rápida · C',

  epigraph: {
    text:
      'Marque os critérios. Tome a decisão em 10 minutos. Análise infinita acabou.',
  },

  chapters: [
    {
      number: 1,
      title: 'Como Usar Este Checklist',
      subtitle: 'Para quando você se pega adiando',
      blocks: [
        {
          type: 'lead',
          text:
            'Esse checklist é para quando você JÁ identificou que está em paralisia ' +
            'por análise. Em 10 minutos respondendo as 6 seções, você sai com decisão ' +
            'OU com clareza do que falta.',
        },
        {
          type: 'h2',
          text: 'Quando usar',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Você adiou a mesma decisão por 7+ dias',
            'Você sente alívio em adiar',
            'Você está pesquisando "mais um pouco" há tempos',
            'Outras pessoas decidiram coisa similar e você não',
            'Você sente vergonha de admitir que está travado',
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          text:
            'Imprima esse checklist. Tenha SEMPRE 5 cópias na gaveta. Use como " ' +
            'reset" sempre que se pegar travado. Em 12 meses, vira reflexo.',
        },
      ],
    },

    {
      number: 2,
      title: 'Seção 1 — Reversibilidade',
      subtitle: '2 minutos',
      blocks: [
        {
          type: 'h2',
          text: 'Pergunta: Essa decisão é reversível?',
        },
        {
          type: 'check',
          items: [
            'Em <30 dias, eu posso voltar atrás sem grande custo',
            'Em <90 dias, eu posso ajustar significativamente',
            'É IRREVERSÍVEL — uma vez tomada, fica',
          ],
        },
        {
          type: 'callout',
          tone: 'do',
          text:
            'Marque APENAS UMA. Se reversível em <30 dias: aplique a regra dos 70% e ' +
            'decida HOJE. Se em <90 dias: 1 semana para coletar dado. Se irreversível: ' +
            'até 90 dias máximo, MAS COM PRAZO DEFINIDO.',
        },
      ],
    },

    {
      number: 3,
      title: 'Seção 2 — Custo de Errar',
      subtitle: '2 minutos',
      blocks: [
        {
          type: 'h2',
          text: 'Pergunta: Se eu errar, o custo é…',
        },
        {
          type: 'check',
          items: [
            '< R$ 5.000 ou < 1 dia de trabalho refeito',
            'R$ 5.000 a R$ 50.000 ou 1 a 5 dias',
            'R$ 50.000 a R$ 500.000 ou impacto em 1-3 pessoas',
            '> R$ 500.000 OU vidas em jogo OU >5 pessoas afetadas',
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          text:
            'Custo BAIXO (1ª e 2ª opções): decisão em horas. Custo ALTO (3ª e 4ª): ' +
            'aplique seu rigor analítico. Aqui você é necessário.',
        },
      ],
    },

    {
      number: 4,
      title: 'Seção 3 — Custo de Adiar',
      subtitle: '2 minutos',
      blocks: [
        {
          type: 'h2',
          text: 'Pergunta: Se eu não decidir nesta semana, perco…',
        },
        {
          type: 'p',
          text: 'R$ ____________ por semana de adiamento',
        },
        {
          type: 'p',
          text: 'Oportunidades específicas: _________________________',
        },
        {
          type: 'p',
          text: 'Energia mental gasta no loop: _____________________',
        },
        {
          type: 'callout',
          tone: 'warning',
          text:
            'Esta é A pergunta mais ignorada pelo Analista. O custo de ADIAR é ' +
            'invisível mas real. Em 90% dos casos, custo de adiar > custo de errar.',
        },
      ],
    },

    {
      number: 5,
      title: 'Seção 4 — Dado Mínimo',
      subtitle: '2 minutos',
      blocks: [
        {
          type: 'h2',
          text: 'Pergunta: Quais 3 dados eu PRECISO para decidir?',
        },
        {
          type: 'list',
          ordered: true,
          items: ['_______________________________', '_______________________________', '_______________________________'],
        },
        {
          type: 'callout',
          tone: 'do',
          text:
            'Marque APENAS 3. Se você listou 5+, está em paralisia disfarçada de pesquisa. ' +
            'Os 2 extras serão luxo, não necessidade.',
        },
        {
          type: 'h2',
          text: 'Para cada um dos 3 dados:',
        },
        {
          type: 'check',
          items: [
            'Eu já tenho? (se sim, marque ✓)',
            'Posso conseguir em <24h? (se sim, marque)',
            'Vai demorar 1+ semana?',
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          text:
            'Se 2 dos 3 estão na sua mão hoje, decida COM eles. Os 30% de incerteza ' +
            'restantes não vão mudar a decisão em 80% dos casos.',
        },
      ],
    },

    {
      number: 6,
      title: 'Seção 5 — Critério Único',
      subtitle: '1 minuto',
      blocks: [
        {
          type: 'h2',
          text: 'Pergunta: Se eu tivesse que decidir AGORA com 1 critério só, qual seria?',
        },
        {
          type: 'p',
          text: '_______________________________________________________',
        },
        {
          type: 'callout',
          tone: 'do',
          text:
            'Esse é seu CRITÉRIO ÂNCORA. Quando os dados conflitam, volte a esse ' +
            'critério. Em 80% dos casos, ele resolve a decisão sozinho.',
        },
      ],
    },

    {
      number: 7,
      title: 'Seção 6 — Próximo Ponto de Revisão',
      subtitle: '1 minuto',
      blocks: [
        {
          type: 'h2',
          text: 'Quando vou REVISAR essa decisão?',
        },
        {
          type: 'p',
          text: 'Data: _______________________',
        },
        {
          type: 'p',
          text: 'Critério para reabrir: _______________________________',
        },
        {
          type: 'callout',
          tone: 'tip',
          text:
            'Decisão com ponto de revisão = decisão SEM medo. Você sabe que se algo ' +
            'mudar, você ajusta. Isso libera você para decidir AGORA com tranquilidade.',
        },
      ],
    },

    {
      number: 8,
      title: 'Sua Decisão Final',
      subtitle: 'Após responder as 6 seções',
      blocks: [
        {
          type: 'h2',
          text: 'Decisão tomada:',
        },
        {
          type: 'p',
          text: '_______________________________________________________',
        },
        {
          type: 'h2',
          text: 'Data: _______________ Hora: _______________',
        },
        {
          type: 'h2',
          text: 'Próximo passo concreto:',
        },
        {
          type: 'p',
          text: '_______________________________________________________',
        },
        {
          type: 'p',
          text: 'Prazo: _______________________',
        },
        {
          type: 'callout',
          tone: 'do',
          text:
            'PARABÉNS. Você saiu da paralisia em 10 minutos. Volte aqui sempre que se ' +
            'pegar adiando. O reflexo se instala em 5-10 usos.',
        },
      ],
    },
  ],

  closing: {
    headline: '10 minutos de método > 10 dias de adiamento.',
    subtext:
      'Sua precisão é dom. Velocidade calibrada é multiplicador. Junte os dois e ' +
      'você vira o tipo de analista que vira diretor.',
  },
}

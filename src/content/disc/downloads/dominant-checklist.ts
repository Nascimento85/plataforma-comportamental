// ============================================================
// Checklist Premium — Dominante (D)
// "A Manhã do Executor de Elite — Checklist Diário (90 min)"
// ~4-6 páginas. Editável diariamente.
// ============================================================

import type { PdfBody } from '../types'

export const dominantChecklistBody: PdfBody = {
  runningTitle: 'A Manhã do Executor de Elite · D',

  epigraph: {
    text:
      'Sua produtividade do dia inteiro é decidida nos primeiros 90 minutos. ' +
      'Quem domina a manhã, domina o dia.',
  },

  chapters: [
    {
      number: 1,
      title: 'Como Usar Este Checklist',
      subtitle: 'Protocolo de 90 minutos para começar todo dia',
      blocks: [
        {
          type: 'lead',
          text:
            'Imprima ou abra no celular ao acordar. Marque cada item conforme cumpre. ' +
            'Ao final do dia, anote sua nota de impaciência (0-10). Depois de 7 dias ' +
            'seguidos, você verá o padrão.',
        },
        {
          type: 'callout',
          tone: 'tip',
          text:
            'Este NÃO é um manual de produtividade genérico. É calibrado para o perfil ' +
            'Dominante: alta tolerância à pressão, dificuldade com rotina, tendência a ' +
            'sobrecarregar a si mesmo. Os blocos foram desenhados para te dar VITÓRIAS ' +
            'rápidas antes do dia inteiro começar.',
        },
        {
          type: 'h2',
          text: 'Regras inegociáveis',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Sem celular nos primeiros 25 minutos. Você pega ele DEPOIS do bloco 2',
            'Cumpra os 5 blocos NA ORDEM. Não pule. Não reorganize',
            'Se não der pra cumprir 90 min hoje, faça 45 min (cortar pela metade, não pular)',
            'Use 7 dias seguidos para criar dado. Sem dado, não há ajuste',
          ],
        },
      ],
    },

    {
      number: 2,
      title: 'Os 5 Blocos do Checklist',
      subtitle: '90 minutos divididos em micro-rituais',
      blocks: [
        {
          type: 'h2',
          text: 'BLOCO 1 — MOVIMENTO + HIDRATAÇÃO (5–25 min)',
        },
        {
          type: 'check',
          items: [
            '500ml de água ao acordar (antes do café)',
            '10 min de movimento físico (caminhada, alongamento, treino curto)',
            'Banho frio de 60 segundos no fim',
            'Sem celular nessa janela',
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          text:
            'Por que primeiro? Movimento eleva noradrenalina, prepara o cérebro para ' +
            'foco profundo. Banho frio bloqueia a inércia da preguiça. Em 20 min você ' +
            'troca a química — sem precisar de força de vontade.',
        },

        {
          type: 'h2',
          text: 'BLOCO 2 — REVISÃO ESCRITA DO DIA (25–35 min)',
        },
        {
          type: 'check',
          items: [
            'Listar as 3 prioridades do dia (em papel ou app)',
            'Identificar a Mais Importante (MIP)',
            'Bloquear 90 minutos de trabalho profundo no MIP',
            'Definir critério de "feito" para a MIP',
          ],
        },
        {
          type: 'callout',
          tone: 'do',
          text:
            'A MIP é a tarefa que se ELA acontecer, o dia já foi vencido. Apenas 1. ' +
            'Se você listar 5 "MIPs", não tem MIP.',
        },

        {
          type: 'h2',
          text: 'BLOCO 3 — TRABALHO PROFUNDO (35–60 min)',
        },
        {
          type: 'check',
          items: [
            'Telefone em modo avião OU em outro ambiente',
            '1 aba aberta no navegador',
            'Sem reuniões, sem mensagens, só execução',
            'Cronômetro: 25 min de foco, 5 min de pausa (técnica Pomodoro)',
          ],
        },

        {
          type: 'h2',
          text: 'BLOCO 4 — REVISÃO DE EQUIPE (60–80 min)',
        },
        {
          type: 'check',
          items: [
            'Responder mensagens da equipe em rajada (não conforme chegam)',
            'Aprovar pedidos pendentes (sem revisar 3 vezes)',
            'Delegar 1 tarefa nova hoje (mínimo)',
            'Marcar 1:1 que esteja pendente',
          ],
        },

        {
          type: 'h2',
          text: 'BLOCO 5 — RESPIRAÇÃO + INTENÇÃO (80–90 min)',
        },
        {
          type: 'check',
          items: [
            '4 ciclos de respiração 4-7-8 (90 segundos)',
            'Escrever em uma frase: "Hoje eu vou fechar __"',
            'Foto mental do dia bem-sucedido (visualização de 30 segundos)',
            'Confirmar a primeira reunião com clareza do objetivo',
          ],
        },
      ],
    },

    {
      number: 3,
      title: 'Termômetro de Impaciência',
      subtitle: 'Ao final do dia, marque uma nota',
      blocks: [
        {
          type: 'lead',
          text:
            'O Dominante mede tudo — menos a si. Esse termômetro fecha o ciclo. ' +
            'Em 7 dias, você terá DADO sobre o seu próprio padrão emocional.',
        },
        {
          type: 'p',
          text: 'Pergunta-chave do dia: "O quanto fui impaciente hoje?" (escala 0-10)',
        },
        {
          type: 'kv',
          items: [
            { k: '0',  v: 'Totalmente paciente — não tive irritação significativa' },
            { k: '3',  v: 'Levemente impaciente em momentos específicos' },
            { k: '5',  v: 'Mediano — alguns momentos de irritação visível' },
            { k: '7',  v: 'Impaciente em maior parte do dia' },
            { k: '10', v: 'Explosivo — perdi o controle pelo menos 1 vez' },
          ],
        },
        {
          type: 'h2',
          text: 'Reflexão diária (3 perguntas)',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Com QUEM perdi a paciência hoje? (nomes específicos)',
            'POR QUE perdi? (gatilho real, não justificativa)',
            'O QUE faria diferente amanhã? (1 ação concreta)',
          ],
        },
        {
          type: 'callout',
          tone: 'do',
          text:
            'Resposta honesta vale mais que resposta bonita. Ninguém vai ver. É só ' +
            'você + você. Quem se mente aqui, perde a chance de ajustar.',
        },
      ],
    },

    {
      number: 4,
      title: 'Compromisso da Semana',
      subtitle: '7 dias seguidos. Anote cada um.',
      blocks: [
        {
          type: 'lead',
          text:
            'Por 7 dias, comprometa-se com o protocolo. Anote sua média semanal de ' +
            'impaciência. A meta NÃO é zero — é AUTOCONSCIÊNCIA.',
        },
        {
          type: 'table',
          headers: ['Dia', 'Cumpriu (☐)', 'Impaciência (0-10)', 'Insight do dia'],
          rows: [
            ['Segunda',  '☐', '___', '___________________________________________'],
            ['Terça',    '☐', '___', '___________________________________________'],
            ['Quarta',   '☐', '___', '___________________________________________'],
            ['Quinta',   '☐', '___', '___________________________________________'],
            ['Sexta',    '☐', '___', '___________________________________________'],
            ['Sábado',   '☐', '___', '___________________________________________'],
            ['Domingo',  '☐', '___', '___________________________________________'],
          ],
        },
        {
          type: 'h2',
          text: 'Métricas de progresso',
        },
        {
          type: 'kv',
          items: [
            { k: 'Após 7 dias',  v: 'Calcule sua média de impaciência. Anote o número.' },
            { k: 'Após 30 dias', v: 'Compare com a primeira semana. A média baixou?' },
            { k: 'Após 90 dias', v: 'Pergunte ao seu time: "como me veem em comparação a 3 meses atrás?"' },
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          text:
            'Em 90 dias, se a média não baixou, NÃO é falta de checklist. É necessidade ' +
            'de apoio externo: mentor, coach ou terapeuta. Reconhecer isso é a maior ' +
            'sofisticação do Dominante.',
        },
      ],
    },
  ],

  closing: {
    headline: 'Quem domina a manhã, domina o dia. Quem domina o dia, domina a vida.',
    subtext:
      'Releia este checklist toda segunda-feira. Calibre. Adapte. ' +
      'O sistema é vivo — assim como você.',
  },
}

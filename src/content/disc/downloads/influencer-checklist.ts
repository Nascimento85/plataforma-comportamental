// ============================================================
// Checklist Premium — Influente (I)
// "Organização para Criativos — Sistema Mínimo Viável"
// ~6 páginas. Editável diariamente.
// ============================================================

import type { PdfBody } from '../types'

export const influencerChecklistBody: PdfBody = {
  runningTitle: 'Organização para Criativos · I',

  epigraph: {
    text:
      'Você tem 47 ideias por minuto. Esse sistema garante que pelo menos 3 delas ' +
      'virem entrega no fim do mês.',
  },

  chapters: [
    {
      number: 1,
      title: 'Por Que Você Precisa de Sistema',
      subtitle: 'O paradoxo do Influente: criativo, inteligente, faturando pouco',
      blocks: [
        {
          type: 'lead',
          text:
            'O Influente conhece a frustração: começa 10 projetos, termina 2. Tem mais ' +
            'planos do que executa. Sente que rendeu pouco mesmo trabalhando muito. ' +
            'Não é falta de talento. É falta de SISTEMA.',
        },
        {
          type: 'p',
          text:
            'Disciplina não mata criatividade. PROTEGE. O sistema é o cano que leva a ' +
            'água até a casa de quem paga por ela. Sem cano, a fonte é genial e seca ao ' +
            'mesmo tempo.',
        },
        {
          type: 'h2',
          text: 'Sintomas do Influente sem sistema',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Calendário não reflete o que você diz que vai fazer',
            'Caixa de entrada com 1.500+ não-lidos',
            'WhatsApp dirigindo seu dia (não você dirigindo o dia)',
            '3-5 projetos pessoais em paralelo, nenhum saindo',
            'Você se cobra MUITO, mas não tem dado para mostrar progresso',
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          text:
            'Esse checklist é MÍNIMO VIÁVEL. Não vai te transformar em planilheiro. ' +
            'É calibrado para Influentes: poucas regras, todas executáveis em <30 min.',
        },
      ],
    },

    {
      number: 2,
      title: 'Ritual da Manhã (15 min)',
      subtitle: 'Defina o dia antes que ele te defina',
      blocks: [
        {
          type: 'check',
          items: [
            'Anote 3 prioridades do dia em PAPEL (não digital)',
            'Marque a Mais Importante (MIP) com asterisco',
            'Bloqueie 90 minutos de foco para a MIP',
            'NADA de instagram/whatsapp nos primeiros 60 min',
            'Hidrate antes do café (500ml)',
          ],
        },
        {
          type: 'callout',
          tone: 'do',
          text:
            'Por que papel? O Influente, quando anota digital, é tentado a "organizar ' +
            'melhor depois". Papel força decisão imediata. E você o vê o dia inteiro na ' +
            'mesa. Nada digital faz isso.',
        },
        {
          type: 'h2',
          text: 'Pergunta-âncora ao escrever as 3 prioridades',
        },
        {
          type: 'lead',
          text:
            '"Se eu fosse para a praia hoje à tarde, qual seria a UMA coisa que eu ' +
            'precisaria fechar antes de sair?" — essa é a sua MIP.',
        },
      ],
    },

    {
      number: 3,
      title: 'Bloco Temático por Dia',
      subtitle: 'A descoberta que multiplicou produtividade dos top criativos',
      blocks: [
        {
          type: 'lead',
          text:
            'Sua mente de Influente troca de contexto rápido — e PAGA caro a cada troca. ' +
            'Cada mudança de assunto custa 23 minutos para retomar foco profundo. Solução: ' +
            'agrupar tarefas por TEMA do dia.',
        },
        {
          type: 'h2',
          text: 'Estrutura semanal',
        },
        {
          type: 'kv',
          items: [
            { k: 'Segunda',  v: 'Financeiro (números, cobrança, planilha)' },
            { k: 'Terça',    v: 'Vendas (prospecção, calls, propostas)' },
            { k: 'Quarta',   v: 'Conteúdo (escrever, gravar, editar)' },
            { k: 'Quinta',   v: 'Cliente (atendimento, projetos, entregáveis)' },
            { k: 'Sexta',    v: 'Estratégia (planejar, refletir, organizar)' },
          ],
        },
        {
          type: 'callout',
          tone: 'do',
          text:
            'Repetir TODA semana. Sem misturar. Você precisa do hábito. Em 30 dias, o ' +
            'time, clientes e família entendem o ritmo — e param de te interromper fora ' +
            'do contexto.',
        },
        {
          type: 'callout',
          tone: 'dont',
          text:
            'Multitarefa. Você acredita que rende; te custa 23% de eficiência por troca. ' +
            'Influente é o que MAIS perde com multitarefa — porque transita rápido demais.',
        },
      ],
    },

    {
      number: 4,
      title: 'Revisão de 17h (10 min)',
      subtitle: 'Encerre o dia antes que ele encerre você',
      blocks: [
        {
          type: 'check',
          items: [
            'O que ficou pronto hoje? (anote no caderno)',
            'O que vai amanhã? (já bloqueie no calendário ANTES de fechar o dia)',
            'Inbox zero do email (responder, agendar ou deletar)',
            'WhatsApp pendentes: 1 mensagem por contato (sem múltiplas)',
            'Termômetro de dispersão (0-10): ___',
          ],
        },
        {
          type: 'h2',
          text: 'Termômetro de dispersão — o que é',
        },
        {
          type: 'kv',
          items: [
            { k: '0-2', v: 'Dia focado, fluxo profundo, MIP fechada' },
            { k: '3-5', v: 'Mediano — algumas distrações, mas dia produtivo' },
            { k: '6-8', v: 'Pulei muito de tema, MIP não terminou' },
            { k: '9-10', v: 'Dia perdido em interrupções e cafés sem proposta' },
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          text:
            'Em 30 dias, calcule sua média. Se >5, há padrão a ajustar. Se <3, está no ' +
            'caminho. Quem mede, melhora. Quem não mede, repete o mês passado.',
        },
      ],
    },

    {
      number: 5,
      title: 'Faxina de Sexta (30 min)',
      subtitle: 'Limpe o terreno para o jogo da próxima semana',
      blocks: [
        {
          type: 'check',
          items: [
            'To-do list semanal limpa (mover/arquivar tudo)',
            'Calendário da semana seguinte preenchido (3 prioridades por dia já marcadas)',
            'Cancele 1 compromisso supérfluo da próxima semana',
            'Review do termômetro de dispersão dos 5 dias',
            'Comemore: 1 prazer pequeno (chocolate, vinho, série, banho longo)',
          ],
        },
        {
          type: 'callout',
          tone: 'do',
          text:
            'A celebração não é luxo — é parte do método. Influente que NÃO comemora as ' +
            'pequenas vitórias para de notar progresso. Para de notar = perde motivação. ' +
            'Comemorar é manutenção do motor.',
        },
        {
          type: 'h2',
          text: 'Reflexão da semana — 3 perguntas',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Qual foi A vitória da semana? (1 só, a mais clara)',
            'Qual aprendizado quero levar para a próxima semana?',
            'O que NÃO vou repetir? (1 padrão a parar)',
          ],
        },
      ],
    },

    {
      number: 6,
      title: 'Tabela de Acompanhamento Semanal',
      subtitle: '4 semanas seguidas. Sem isso, não há ajuste real',
      blocks: [
        {
          type: 'lead',
          text:
            'Por 4 semanas, anote sua média semanal de dispersão e a entrega da MIP. ' +
            'Esse é seu painel de controle pessoal.',
        },
        {
          type: 'table',
          headers: ['Semana', 'MIPs entregues / 5', 'Dispersão média', 'Vitória da semana'],
          rows: [
            ['Semana 1', '___ / 5', '___ / 10', '___________________________'],
            ['Semana 2', '___ / 5', '___ / 10', '___________________________'],
            ['Semana 3', '___ / 5', '___ / 10', '___________________________'],
            ['Semana 4', '___ / 5', '___ / 10', '___________________________'],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          text:
            'Se em 4 semanas a entrega de MIPs subir de 1/5 para 4/5, o sistema funcionou. ' +
            'Se ficar parado, o problema NÃO é organização. É necessidade de apoio externo: ' +
            'mentor, coach ou redução de escopo dos projetos.',
        },
      ],
    },
  ],

  closing: {
    headline: 'Disciplina não mata criatividade. Protege.',
    subtext:
      'Releia este checklist toda segunda-feira. Calibre. Adapte. ' +
      'Em 90 dias o ritmo está incorporado, sem precisar de manual.',
  },
}

// ============================================================
// Apostila Premium — Estável (S)
// "Decisão Rápida Sem Perder a Sabedoria"
// ~26 páginas. Para o S que se cobra por demorar.
// ============================================================

import type { PdfBody } from '../types'

export const stableDecisionBody: PdfBody = {
  runningTitle: 'Decisão Rápida Sem Perder Sabedoria · S',

  epigraph: {
    text:
      'Velocidade NÃO é precipitação. É clareza com prazo. Esse manual te ensina ' +
      'a decidir rápido SEM virar Dominante atropelador — porque sua sabedoria já ' +
      'é seu diferencial.',
  },

  chapters: [
    {
      number: 1,
      title: 'Por Que o Estável Trava',
      subtitle: 'A diferença entre prudência e paralisia',
      blocks: [
        {
          type: 'lead',
          text:
            'O Estável é o decisor mais sábio dos 4 perfis DISC. Pesa, considera, ' +
            'antecipa. O problema: muitas vezes pesa TANTO que a janela da decisão ' +
            'fecha. Outros decidiram. Você ficou.',
        },
        {
          type: 'h2',
          text: 'A linha invisível entre prudência e paralisia',
        },
        {
          type: 'kv',
          items: [
            { k: 'Prudência', v: 'Coleta os dados necessários, decide com 70-80%' },
            { k: 'Paralisia', v: 'Coleta sempre mais 1 dado para evitar a decisão' },
            { k: 'Prudência', v: 'Pesa consequências por tempo proporcional ao impacto' },
            { k: 'Paralisia', v: 'Pesa consequências mesmo de decisões reversíveis e baratas' },
            { k: 'Prudência', v: 'Aceita 80% de certeza como suficiente para agir' },
            { k: 'Paralisia', v: 'Espera 100% que NUNCA chega' },
          ],
        },
        {
          type: 'h2',
          text: 'Sintomas de que você está paralisado',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Você adiou a mesma decisão por mais de 2 semanas',
            'Você pesquisa novas variáveis sem chegar a uma conclusão',
            'Outros tomaram decisão similar e você ainda pondera a sua',
            'Você sente alívio em adiar, ansiedade em decidir',
            'A decisão já tem dado suficiente, mas você quer "MAIS um pouco"',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          text:
            'Em 90% dos casos, NÃO decidir é uma decisão. Pior: é a pior decisão. ' +
            'Porque o ambiente decide POR você, sem o seu input. Você fica com o ' +
            'resultado SEM ter participado.',
        },
      ],
    },

    {
      number: 2,
      title: 'A Diferença Entre Velocidade e Precipitação',
      subtitle: 'Você pode decidir rápido E sábio',
      blocks: [
        {
          type: 'lead',
          text:
            'Estável tem medo de virar Dominante atropelador. Esse medo é desnecessário: ' +
            'você JAMAIS vai virar Dominante. Sua sabedoria é constitutiva. O que pode ' +
            'mudar é a VELOCIDADE — sem perder a sabedoria.',
        },
        {
          type: 'h2',
          text: '4 fatores que diferenciam',
        },
        {
          type: 'kv',
          items: [
            { k: 'Velocidade sábia', v: 'Coleta dados em PRAZO definido (não infinito)' },
            { k: 'Precipitação',     v: 'Decide sem coletar dado mínimo' },
            { k: 'Velocidade sábia', v: 'Aceita reversibilidade quando ela existe' },
            { k: 'Precipitação',     v: 'Trata tudo como irreversível ou tudo como reversível' },
            { k: 'Velocidade sábia', v: 'Comunica a decisão com calma e firmeza' },
            { k: 'Precipitação',     v: 'Explode a decisão sem contexto e sem reversal possível' },
            { k: 'Velocidade sábia', v: 'Tem ponto de revisão claro se algo mudar' },
            { k: 'Precipitação',     v: 'Decisão final, sem reabertura possível' },
          ],
        },
      ],
    },

    {
      number: 3,
      title: 'A Regra dos 70%',
      subtitle: 'Decida com 70% das informações — e durma em paz',
      blocks: [
        {
          type: 'lead',
          text:
            'Existem evidências de que decisões tomadas com 70% das informações têm ' +
            'qualidade EQUIVALENTE às tomadas com 95%. A diferença? As de 70% acontecem ' +
            '5x mais rápido. Vence quem age com 70%.',
        },
        {
          type: 'h2',
          text: 'Como aplicar na prática',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Defina O QUE você precisa saber para decidir (lista mínima)',
            'Estabeleça PRAZO máximo para coletar (24h, 1 semana, max 30 dias)',
            'Quando atingir 70% da lista, DECIDA. Não espere os outros 30%.',
            'Comunique a decisão clara, com critério de revisão se algo mudar',
            'Mova-se. Os 30% restantes apareceram NO CAMINHO de qualquer jeito.',
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          text:
            'O segredo: os 30% finais costumam confirmar o que você já sabia com os 70%. ' +
            'Raramente eles invertem a decisão. Quando invertem, você ajusta na hora — ' +
            'porque deixou ponto de revisão.',
        },
      ],
    },

    {
      number: 4,
      title: 'Decisões Reversíveis vs Irreversíveis',
      subtitle: 'O framework que destrava 80% das paralisias',
      blocks: [
        {
          type: 'lead',
          text:
            'Estável trata QUASE TODA decisão como irreversível. Errado. A maioria das ' +
            'decisões NA SUA SEMANA é reversível. Aprenda a separar.',
        },
        {
          type: 'h2',
          text: 'Decisões REVERSÍVEIS (decida em horas)',
        },
        {
          type: 'list',
          items: [
            'Mudar processo/ferramenta (você pode voltar atrás em 2 dias)',
            'Contratar fornecedor por projeto (não há contrato longo)',
            'Testar formato de reunião (faz 1, ajusta, faz outro)',
            'Comprar item até R$ 5k (você pode revender ou descartar)',
            'Iniciar conversa difícil (você pode pausar e retomar)',
          ],
        },
        {
          type: 'callout',
          tone: 'do',
          text:
            'Para reversíveis: aplique a regra dos 70%. Decida em UMA reunião. Se errar, ' +
            'ajuste na próxima. Custo de errar < custo de adiar.',
        },
        {
          type: 'h2',
          text: 'Decisões IRREVERSÍVEIS (decida em semanas, máximo 3 meses)',
        },
        {
          type: 'list',
          items: [
            'Demitir pessoa antiga (relacionamento queimado)',
            'Mudar de cidade/país',
            'Casamento/divórcio',
            'Cirurgia de risco',
            'Vender empresa, ações em massa',
            'Contratos de >12 meses sem cláusula de saída',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          text:
            'Para irreversíveis: pode demorar mais — MAS com prazo máximo. 3 meses é ' +
            'limite saudável. Mais que isso, vire profissional. Mais 6 meses, vire ' +
            'paralisia disfarçada.',
        },
      ],
    },

    {
      number: 5,
      title: 'Pré-mortem em 15 Minutos',
      subtitle: 'A técnica que te dá segurança SEM travar',
      blocks: [
        {
          type: 'lead',
          text:
            'Pré-mortem é a técnica de IMAGINAR que a decisão deu errado, e listar o ' +
            'que faltou. Em 15 min você antecipa 80% dos riscos — e pode mitigar antes.',
        },
        {
          type: 'h2',
          text: 'Como fazer',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Marque 15 min sozinho. Caderno em mãos.',
            'Imagine que estamos 6 meses no futuro e a decisão deu MUITO ERRADO.',
            'Liste 5-7 razões pelas quais deu errado.',
            'Para cada razão, escreva 1 ação preventiva HOJE.',
            'Decida se as preventivas são exequíveis. Se sim, AVANCE com a decisão.',
          ],
        },
        {
          type: 'h2',
          text: 'Exemplo aplicado',
        },
        {
          type: 'p',
          text:
            'Decisão: trocar de fornecedor X para Y.',
        },
        {
          type: 'kv',
          items: [
            { k: 'Risco 1', v: 'Y atrasa entrega no primeiro mês — Mitigação: estoque buffer 30 dias' },
            { k: 'Risco 2', v: 'Equipe não adapta — Mitigação: treinamento 2h antes' },
            { k: 'Risco 3', v: 'Custo real > orçamento — Mitigação: contrato com teto fixo' },
            { k: 'Risco 4', v: 'X reclama, gera fricção — Mitigação: aviso formal 30 dias' },
            { k: 'Risco 5', v: 'Cliente percebe e reclama — Mitigação: comunicação proativa' },
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          text:
            'Em 15 min você foi de "tenho medo de mudar fornecedor" para "tenho 5 ' +
            'preventivas, posso avançar". A pré-mortem TRANSFORMA medo em plano.',
        },
      ],
    },

    {
      number: 6,
      title: 'Como Desbloquear Paralisia em 5 Perguntas',
      subtitle: 'Quando você sabe que está travado',
      blocks: [
        {
          type: 'lead',
          text:
            'Quando você se pega adiando, faça essas 5 perguntas. Em ordem. Por escrito. ' +
            'Em 30 min você sai com clareza ou com decisão.',
        },
        {
          type: 'h2',
          text: 'PERGUNTA 1 — Qual é a decisão exata?',
        },
        {
          type: 'p',
          text:
            'Em 1 frase. Específica. Não "preciso pensar na minha carreira" mas "vou ' +
            'aceitar ou recusar a oferta da empresa Y até dia 15".',
        },
        {
          type: 'h2',
          text: 'PERGUNTA 2 — É reversível ou irreversível?',
        },
        {
          type: 'p',
          text:
            'Se reversível, defina prazo de 24-72h. Se irreversível, defina prazo de ' +
            '1-12 semanas — mas DEFINA.',
        },
        {
          type: 'h2',
          text: 'PERGUNTA 3 — Qual é o custo de NÃO decidir?',
        },
        {
          type: 'p',
          text:
            'Em dinheiro, energia ou oportunidade. Se você listar "nenhum", reveja: ' +
            'tem sempre custo, é só sutil.',
        },
        {
          type: 'h2',
          text: 'PERGUNTA 4 — Que dado mínimo eu PRECISO para decidir?',
        },
        {
          type: 'p',
          text:
            'Liste 3 itens. Não mais. O quarto vira procrastinação disfarçada.',
        },
        {
          type: 'h2',
          text: 'PERGUNTA 5 — Em qual data MÁXIMA decido?',
        },
        {
          type: 'p',
          text:
            'Marque na agenda. Coloque alarme. Envie e-mail para si com a data. Trate ' +
            'como deadline real.',
        },
        {
          type: 'callout',
          tone: 'do',
          text:
            'Em 30 min seguindo as 5 perguntas, você passa do estágio "travado e ' +
            'angustiado" para "estruturado e em movimento". O peso emocional cai 70%.',
        },
      ],
    },

    {
      number: 7,
      title: 'Estudo de Caso',
      subtitle: '3 Estáveis que pararam de adiar',
      blocks: [
        {
          type: 'h2',
          text: 'Caso 1 — Carlos, 47 anos, gestor de TI',
        },
        {
          type: 'p',
          text:
            'Adiou a decisão de mudar de empresa por 3 anos. Toda sexta refazia a planilha ' +
            'de prós e contras. Aplicou regra dos 70% + pré-mortem. Em 4 semanas decidiu, ' +
            'mudou de empresa, ganhou 40% mais. Em retrospecto, percebeu que os 3 anos ' +
            'foram apenas medo, não dúvida real.',
        },
        {
          type: 'h2',
          text: 'Caso 2 — Renata, 35 anos, empreendedora',
        },
        {
          type: 'p',
          text:
            'Travada havia 18 meses para demitir um sócio que não estava performando. ' +
            'Aplicou pré-mortem identificando 5 riscos — todos com mitigação possível. ' +
            'Demitiu em 30 dias. Empresa cresceu 60% nos 12 meses seguintes.',
        },
        {
          type: 'h2',
          text: 'Caso 3 — André, 52 anos, médico',
        },
        {
          type: 'p',
          text:
            'Adiou por 7 anos a decisão de abrir consultório próprio. Sempre "faltava ' +
            'algo". Usou as 5 perguntas, percebeu que adiava por medo de errar — não ' +
            'por dúvida real. Abriu consultório aos 53. Em 18 meses, faturava 3x mais.',
        },
        {
          type: 'callout',
          tone: 'tip',
          text:
            'Padrão dos 3: o tempo de adiamento NÃO trouxe nenhuma informação nova. ' +
            'Trouxe apenas mais ruído mental. A decisão era a mesma 3 anos antes.',
        },
      ],
    },
  ],

  closing: {
    headline: 'Sua sabedoria + sua velocidade = sua liderança madura.',
    subtext:
      'Releia esta apostila sempre que se pegar travado. Em 6 meses, o reflexo de ' +
      'decidir com 70% se instala — sem perder a sua paz constitutiva.',
  },
}

// ============================================================
// Playbook Premium — Estável (S)
// "O Poder da Liderança Silenciosa"
// ~22 páginas. Como liderar sem precisar gritar.
// ============================================================

import type { PdfBody } from '../types'

export const stablePlaybookBody: PdfBody = {
  runningTitle: 'Liderança Silenciosa · S',

  epigraph: {
    text:
      'Sua calma é uma força que o mundo subestima. Mas se ninguém ouvir sua voz, ' +
      'sua paz vira invisibilidade. Aqui você aprende a se posicionar — sem deixar ' +
      'de ser quem é.',
  },

  chapters: [
    {
      number: 1,
      title: 'O Paradoxo do Estável',
      subtitle: 'Forte mas invisível',
      blocks: [
        {
          type: 'lead',
          text:
            'Você é o pilar do time. Quem segura a casa em crise. Quem mantém todo mundo ' +
            'respirando. Mas quando vem a hora de promoção, é outro nome que aparece. ' +
            'Não porque você não merece — porque ninguém VIU.',
        },
        {
          type: 'p',
          text:
            'O Estável tem um talento raro: presença consistente. E uma armadilha igualmente ' +
            'rara: silêncio que vira ausência. Em ambientes corporativos modernos, quem ' +
            'NÃO se posiciona é interpretado como sem opinião — mesmo tendo as melhores.',
        },
        {
          type: 'h2',
          text: 'Sintomas do Estável invisível',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Você é o "bom de serviço" que ninguém promove há 3+ anos',
            'Suas ideias aparecem na boca de outro 2 semanas depois',
            'Você não defendeu sua proposta na reunião e ela morreu',
            'Você ouviu "achei que você não tinha opinião sobre isso"',
            'Você aceita salário abaixo do mercado por medo de "criar caso"',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          text:
            'Em 5 anos, esse padrão custa 30-50% do potencial salarial total. Não porque ' +
            'você vale menos. Porque o sistema só paga quem se faz visível.',
        },
        {
          type: 'h2',
          text: 'O que você NÃO precisa fazer',
        },
        {
          type: 'kv',
          items: [
            { k: 'Não precisa', v: 'Virar agressivo' },
            { k: 'Não precisa', v: 'Falar alto em reunião' },
            { k: 'Não precisa', v: 'Disputar microfone com extrovertidos' },
            { k: 'Não precisa', v: 'Performar uma personalidade que não é sua' },
          ],
        },
        {
          type: 'callout',
          tone: 'do',
          text:
            'Liderança Silenciosa é EXATAMENTE o oposto: você usa SUAS armas naturais ' +
            '(escuta profunda, presença confiável, julgamento equilibrado) — só que com ' +
            'método. Suas vitórias começam a aparecer nos lugares certos, no ritmo certo.',
        },
      ],
    },

    {
      number: 2,
      title: 'Princípios da Liderança Silenciosa',
      subtitle: '5 fundamentos que mudam tudo',
      blocks: [
        {
          type: 'h2',
          text: 'PRINCÍPIO 1 — Visibilidade sem performance',
        },
        {
          type: 'p',
          text:
            'Você não precisa virar showman. Mas precisa que seu trabalho APAREÇA com ' +
            'frequência regular nos lugares onde decisões acontecem. Documentação > ' +
            'apresentação.',
        },
        {
          type: 'h2',
          text: 'PRINCÍPIO 2 — Voto firme, não voto alto',
        },
        {
          type: 'p',
          text:
            'Em reunião, você não precisa falar mais. Precisa falar UMA vez, com clareza ' +
            'e antes da decisão fechar. Voto alto perde para voto firme em 80% dos casos.',
        },
        {
          type: 'h2',
          text: 'PRINCÍPIO 3 — Presença constante > pico esporádico',
        },
        {
          type: 'p',
          text:
            'Influente performa picos. Você sustenta plateau. Em 12 meses, plateau alto ' +
            'vence pico instável. Sua carreira é maratona, não 100 metros.',
        },
        {
          type: 'h2',
          text: 'PRINCÍPIO 4 — Discordância calma',
        },
        {
          type: 'p',
          text:
            'Você não precisa concordar com tudo para evitar conflito. Precisa aprender ' +
            'a discordar SEM HOSTILIDADE. Esse é seu superpoder em mediação.',
        },
        {
          type: 'h2',
          text: 'PRINCÍPIO 5 — Pedido em vez de espera',
        },
        {
          type: 'p',
          text:
            'O Estável espera ser convidado para promoção, aumento, oportunidade. Esse ' +
            'modelo morreu. Aprender a PEDIR — com calma — é a virada.',
        },
        {
          type: 'callout',
          tone: 'tip',
          text:
            'Esses 5 princípios são a base de TUDO que vem nos próximos capítulos. ' +
            'Volte aqui sempre que se sentir perdido.',
        },
      ],
    },

    {
      number: 3,
      title: 'Como Ser Visto Sem Performar',
      subtitle: '7 práticas de visibilidade autêntica',
      blocks: [
        {
          type: 'lead',
          text:
            'Visibilidade não é vender peixe. É deixar registro do que você entrega ' +
            'em formatos que circulam onde decisões acontecem.',
        },
        {
          type: 'h2',
          text: 'PRÁTICA 1 — Mensagem semanal de 5 linhas',
        },
        {
          type: 'p',
          text:
            'Toda sexta às 16h, envie ao seu gestor (e cópia: time, se aplicável) um ' +
            'resumo de 5 linhas: o que ficou pronto, o que está em andamento, 1 risco, ' +
            '1 ajuda que precisa, 1 vitória da semana. Em 6 meses, você vira referência ' +
            'de "pessoa que entrega visivelmente".',
        },
        {
          type: 'callout',
          tone: 'do',
          text:
            'Template:\n' +
            '— Pronto: A, B, C\n' +
            '— Em andamento: X (75%), Y (40%)\n' +
            '— Risco: Z, mitigação proposta\n' +
            '— Ajuda: preciso de [específico]\n' +
            '— Vitória: [1 linha de impacto]',
        },
        {
          type: 'h2',
          text: 'PRÁTICA 2 — A pergunta de profundidade nas reuniões',
        },
        {
          type: 'p',
          text:
            'Em toda reunião onde você participa, faça 1 pergunta. UMA. De profundidade. ' +
            'Não pergunta de informação — pergunta que faz a sala pensar.',
        },
        {
          type: 'script',
          role: 'Sua pergunta-marca',
          sayThis:
            'E se a gente considerasse o efeito de [variável menos óbvia] em 6 meses? ' +
            'Isso muda alguma decisão de hoje?',
        },
        {
          type: 'h2',
          text: 'PRÁTICA 3 — Documentar decisões importantes',
        },
        {
          type: 'p',
          text:
            'Após cada reunião onde houve decisão, envie e-mail de 4 linhas com: o que ' +
            'foi decidido, quem é dono, prazo, próximo check-in. Você vira o "memória ' +
            'institucional" — função poderosa.',
        },
        {
          type: 'h2',
          text: 'PRÁTICA 4 — Compartilhar achados',
        },
        {
          type: 'p',
          text:
            'Quando descobrir algo útil (livro, artigo, métrica, ferramenta), compartilhe ' +
            'com 1-2 pessoas estratégicas. NÃO em massa. NÃO viralmente. SELECIONADO. ' +
            'Você vira "fonte confiável de coisa boa".',
        },
        {
          type: 'h2',
          text: 'PRÁTICA 5 — Reconhecer publicamente',
        },
        {
          type: 'p',
          text:
            'Em reuniões de time, tire 30 segundos para reconhecer 1 pessoa por contribuição ' +
            'específica. Você vira "quem enxerga o time" — e isso volta multiplicado.',
        },
        {
          type: 'h2',
          text: 'PRÁTICA 6 — Tomar a palavra primeiro',
        },
        {
          type: 'p',
          text:
            'Em rodadas de opinião, você costuma esperar. Inverte: seja o 2º ou 3º a ' +
            'falar. Sua opinião com cabeça fria, antes de o ruído dominar a sala, vale ' +
            '3x mais do que qualquer fala depois.',
        },
        {
          type: 'h2',
          text: 'PRÁTICA 7 — Pedir feedback ativo',
        },
        {
          type: 'script',
          role: 'A pergunta que abre porta',
          sayThis:
            'Tenho uma pergunta direta: você tem visto evolução clara em mim? Em qual ' +
            'área específica? Estou pensando em próximos passos e quero te escutar antes.',
        },
      ],
    },

    {
      number: 4,
      title: 'Reuniões 1:1 — Seu Terreno Natural',
      subtitle: 'Por que você é o melhor mediador 1:1 do mundo',
      blocks: [
        {
          type: 'lead',
          text:
            'Estável tem o talento mais subestimado do mundo corporativo: capacidade ' +
            'de fazer alguém se sentir ouvido em 30 minutos. Em uma era de pressa, isso ' +
            'é ouro.',
        },
        {
          type: 'h2',
          text: 'O ritual de 30 min',
        },
        {
          type: 'kv',
          items: [
            { k: '5 min', v: 'Como você está? (humano, sem pressa)' },
            { k: '10 min', v: 'O que está te travando? (escutar 80% do tempo)' },
            { k: '10 min', v: 'Métricas e progresso (cobrar com calma)' },
            { k: '5 min', v: 'Combinados claros (data + métrica)' },
          ],
        },
        {
          type: 'h2',
          text: '12 perguntas para 1:1 do Estável',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Como você está, de verdade?',
            'O que está te energizando essa semana?',
            'O que está te drenando?',
            'Se eu pudesse fazer UMA coisa diferente para te ajudar, qual seria?',
            'Tem alguma conversa difícil que você está adiando?',
            'Em escala 0-10, quão alinhado você se sente com o que estamos construindo?',
            'O que você gostaria de fazer mais e tem feito menos?',
            'Quem no time merece reconhecimento agora?',
            'Algo na sua vida fora daqui que eu deveria saber?',
            'Qual habilidade você quer desenvolver nos próximos 90 dias?',
            'Se tivesse 4h livres na agenda, em que investiria?',
            'Qual processo está mais ineficiente, na sua leitura?',
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          text:
            'Em 6 meses fazendo 1:1 dessa qualidade, você vira a pessoa mais procurada ' +
            'do time para "conversa rápida". Esse é o caminho para liderança formal.',
        },
      ],
    },

    {
      number: 5,
      title: 'Mediar Conflitos do Time',
      subtitle: 'Sua arma definitiva',
      blocks: [
        {
          type: 'lead',
          text:
            'Em qualquer time, conflito é inevitável. O Dominante quer resolver gritando. ' +
            'O Influente foge. O Analista racionaliza. Você — Estável — MEDIA. Esse é seu ' +
            'jogo.',
        },
        {
          type: 'h2',
          text: 'Protocolo de mediação em 4 passos',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Escute as DUAS partes individualmente, em sessões separadas (30 min cada)',
            'Identifique a NECESSIDADE escondida atrás de cada posição',
            'Convoque uma reunião conjunta com pauta CLARA',
            'Conduza a conversa com regras: 1 fala por vez, sem interrupção, foco em fato + sentimento + pedido',
          ],
        },
        {
          type: 'h2',
          text: 'Frases que desarmam',
        },
        {
          type: 'list',
          items: [
            '"Posso entender melhor o que você está sentindo nesse momento?"',
            '"O que precisaria mudar para você se sentir respeitado(a)?"',
            '"Você concorda que ambos querem [valor comum]? Qual é o caminho diferente?"',
            '"Vamos parar 1 minuto e respirar juntos antes de continuar."',
            '"Eu vejo que você se importa com isso. Posso te ajudar a expressar?"',
          ],
        },
        {
          type: 'callout',
          tone: 'do',
          text:
            'Sua presença calma DESACELERA o conflito. Não tem como duas pessoas ficarem ' +
            'em alta voltagem se a 3ª está em baixa voltagem real. Você é o regulador ' +
            'do sistema.',
        },
      ],
    },

    {
      number: 6,
      title: 'Como Pedir Aumento e Promoção',
      subtitle: 'A conversa que o Estável mais adia',
      blocks: [
        {
          type: 'lead',
          text:
            'O Estável adia essa conversa por anos. Resultado: salário 30% abaixo do ' +
            'mercado, função superdimensionada. Vamos virar isso com método.',
        },
        {
          type: 'h2',
          text: 'Antes da conversa — preparação (2 semanas)',
        },
        {
          type: 'check',
          items: [
            'Documente 6 cases de impacto seu nos últimos 12 meses (com NÚMERO)',
            'Pesquise 3 referências de salário no seu nível (LinkedIn, Glassdoor, conversas)',
            'Prepare 1 página com: o que você fez, o que vai fazer, o que pede',
            'Agende reunião específica (não introduza no 1:1 normal)',
            'Vá com proposta CONCRETA — não "queria conversar sobre meu salário"',
          ],
        },
        {
          type: 'h2',
          text: 'O script da conversa',
        },
        {
          type: 'script',
          role: '1. Abertura',
          sayThis:
            'Obrigado por reservar esse tempo. Quero falar de uma coisa que tem peso para ' +
            'mim: minha trajetória aqui e o próximo capítulo dela.',
        },
        {
          type: 'script',
          role: '2. Apresentação dos cases',
          sayThis:
            'Nos últimos 12 meses, eu entreguei [3-5 cases com número]. Especificamente: ' +
            '[A], [B], [C]. Esses resultados representam um nível de contribuição que ' +
            'cresceu desde o meu salário atual.',
        },
        {
          type: 'script',
          role: '3. O pedido específico',
          sayThis:
            'Meu pedido é: [aumento de X% E/OU promoção para Y E/OU mudança de função para Z]. ' +
            'Pesquisei o mercado e essa é a faixa coerente com o que entrego. Quero entender ' +
            'a viabilidade disso aqui — em qual prazo é possível, e o que você precisa de mim ' +
            'para tornar viável.',
        },
        {
          type: 'h2',
          text: 'Se a resposta for "agora não dá"',
        },
        {
          type: 'script',
          role: 'Não recue — ANCORE',
          sayThis:
            'Entendo. Posso te perguntar: o que precisaria estar verdadeiro daqui 6 meses ' +
            'para essa decisão acontecer? Específico — em métricas, projetos, indicadores. ' +
            'Quero alinhar minha entrega com o seu critério de avaliação.',
        },
        {
          type: 'callout',
          tone: 'warning',
          text:
            'Se em 6 meses os critérios foram entregues e ainda não veio aumento/promoção, ' +
            'a empresa está te dizendo que você atingiu o teto ali. Hora de buscar mercado ' +
            'externo COM as referências em mãos. Não é traição — é evolução.',
        },
      ],
    },

    {
      number: 7,
      title: 'Estudo de Caso',
      subtitle: '3 Estáveis que viraram VPs',
      blocks: [
        {
          type: 'h2',
          text: 'Caso 1 — Patrícia, 34 → 39 anos',
        },
        {
          type: 'p',
          text:
            'Coordenadora de operações por 5 anos. "Boa de serviço, mas não tem perfil ' +
            'de liderança", diziam. Aos 34, começou a mensagem semanal de 5 linhas. Em 18 ' +
            'meses, virou gerente. Em 4 anos, VP de Operações.',
        },
        {
          type: 'h2',
          text: 'Caso 2 — Marcos, 41 → 45 anos',
        },
        {
          type: 'p',
          text:
            'Engenheiro sênior travado havia 7 anos. Aos 41, fez 1:1 estruturado com gestor ' +
            'sem aceitar o "agora não dá" — pediu critérios concretos. 12 meses depois, ' +
            'cumpriu os critérios e foi promovido. Hoje é Diretor Técnico.',
        },
        {
          type: 'h2',
          text: 'Caso 3 — Daniela, 29 → 33 anos',
        },
        {
          type: 'p',
          text:
            'Analista júnior em consultoria. Sem histórico de protagonismo. Aos 30, ' +
            'começou a fazer pergunta de profundidade nas reuniões com clientes. ' +
            'Cliente solicitou que ela fosse a interlocutora principal. Em 3 anos, virou ' +
            'sócia da consultoria.',
        },
        {
          type: 'callout',
          tone: 'tip',
          text:
            'Padrão dos 3: PARARAM de esperar serem descobertos. Começaram a CRIAR ' +
            'visibilidade autêntica. Sem virar quem não eram.',
        },
      ],
    },
  ],

  appendices: [
    {
      title: 'Anexo — 10 frases para se posicionar com firmeza e calma',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            '"Eu vejo isso de outra forma. Posso explicar?"',
            '"Antes de a gente fechar, queria registrar uma preocupação."',
            '"Minha leitura é diferente. Posso compartilhar?"',
            '"Eu preciso de mais 24h para te dar resposta com qualidade."',
            '"Esse não é um sim do meu lado. Vamos conversar mais?"',
            '"Eu não tenho clareza ainda. Posso te trazer resposta amanhã?"',
            '"Quero ouvir todos antes de decidir. Pode esperar?"',
            '"Acho que vale ouvirmos [pessoa não chamada] antes."',
            '"Eu entendo a urgência, e mesmo assim recomendo cautela aqui."',
            '"Posso discordar respeitosamente? [explicação]"',
          ],
        },
      ],
    },
  ],

  closing: {
    headline: 'Sua paz é seu superpoder. Ensine o mundo a ler isso.',
    subtext:
      'Releia este Playbook a cada 90 dias. Sua liderança vai amadurecendo no seu ' +
      'ritmo — e isso é a maior força.',
  },
}

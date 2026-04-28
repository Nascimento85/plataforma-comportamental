// ============================================================
// Playbook Premium — Dominante (D)
// "Liderança de Comando e Controle vs. Liderança Situacional"
// 24 páginas de conteúdo denso, prático e direto ao ponto.
// ============================================================

import type { PdfBody } from '../types'

export const dominantPlaybookBody: PdfBody = {
  runningTitle: 'Liderança de Comando e Controle vs. Situacional · D',

  epigraph: {
    text:
      'O Dominante é insubstituível em crise e medíocre em rotina. ' +
      'Este manual te tira do cargo de bombeiro e te coloca no de arquiteto.',
    attribution: 'Mapa Comportamental · Passaporte de Autoconhecimento',
  },

  chapters: [
    // ============================================================
    // CAPÍTULO 1
    // ============================================================
    {
      number: 1,
      title: 'O Paradoxo do Executor',
      subtitle: 'Por que sua eficiência tem teto',
      blocks: [
        {
          type: 'lead',
          text:
            'Você é o melhor da sala em fazer acontecer. Provou isso 100 vezes. ' +
            'Mas existe um momento da carreira em que essa força vira o seu próprio limite.',
        },
        {
          type: 'p',
          text:
            'O Dominante de elite cresce executando. Cresce mais rápido que os pares, ' +
            'porque tem dois ativos raros: tolerância à pressão e velocidade de decisão. ' +
            'Em 3 a 5 anos, isso te leva de júnior a líder. O salário dobra. A reputação ' +
            'se forma. E é exatamente aí que começa o problema.',
        },
        {
          type: 'p',
          text:
            'O cargo seguinte exige uma outra moeda: não fazer pessoalmente, fazer ' +
            'através dos outros. E o Dominante mediano acredita que continuar fazendo ' +
            'pessoalmente é o que o trouxe até aqui — então segue fazendo. O resultado ' +
            'é um teto silencioso: você se torna gargalo da sua própria operação.',
        },
        {
          type: 'h2',
          text: 'O sintoma clínico do teto',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Sua agenda está cheia mas o time se queixa que você "some"',
            'Decisões importantes esperam por você há mais de 48h',
            'Quando você sai 5 dias de férias, a operação trava',
            'Você diz "vou eu mesmo" mais de 3 vezes por semana',
            'Subordinados perguntam coisas que poderiam decidir sozinhos',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          text:
            'Se você marcou 3+ desses sintomas, NÃO é falta de pessoas competentes ' +
            'no time. É falta de SISTEMA de delegação. E sistema só é construído por ' +
            'quem decide parar de fazer pessoalmente.',
        },
        {
          type: 'h2',
          text: 'Comando e Controle vs Situacional: a diferença que importa',
        },
        {
          type: 'p',
          text:
            'Comando e Controle é o estilo que te trouxe aqui: você decide, comunica, ' +
            'cobra. Funciona perfeitamente em crise (incêndio, deadline crítico, problema ' +
            'novo sem precedente). Vira disfuncional em rotina (operação estável, time ' +
            'maduro, decisões repetitivas).',
        },
        {
          type: 'p',
          text:
            'Liderança Situacional é a técnica de calibrar o seu nível de envolvimento ' +
            'pelo nível de maturidade do liderado naquela tarefa específica. Em 2 minutos ' +
            'você adapta o estilo: ora delega total, ora supervisiona, ora ensina, ora ' +
            'apenas chancela. Não é "ser legal". É ser preciso.',
        },
        {
          type: 'h2',
          text: 'Por que isso vale dinheiro',
        },
        {
          type: 'kv',
          items: [
            { k: 'Custo silencioso', v: 'Operação que não escala = teto de promoção' },
            { k: 'Custo de retenção', v: 'Time desengaja por falta de autonomia (turnover 2x maior)' },
            { k: 'Custo de oportunidade', v: 'Tempo gasto fazendo = tempo NÃO gasto pensando 12 meses à frente' },
            { k: 'Custo emocional',  v: 'Burnout do líder que carrega tudo nas costas' },
          ],
        },
        {
          type: 'p',
          text:
            'A boa notícia: dominar este sistema NÃO te tira a vantagem de Dominante. ' +
            'Você continua decidindo rápido. Continua tolerando pressão. Mas agora tem ' +
            'um time que executa por conta enquanto você arquiteta o próximo nível.',
        },
        {
          type: 'callout',
          tone: 'tip',
          text:
            'Meta deste capítulo: aceitar que parar de fazer pessoalmente é o ato MAIS ' +
            'estratégico que você pode tomar nos próximos 90 dias. Os capítulos seguintes ' +
            'te dão o método.',
        },
      ],
    },

    // ============================================================
    // CAPÍTULO 2
    // ============================================================
    {
      number: 2,
      title: 'Os 4 Níveis de Delegação',
      subtitle: 'Quando cada um se aplica — e como comunicar',
      blocks: [
        {
          type: 'lead',
          text:
            'Delegar é uma decisão de DOSAGEM, não de tudo-ou-nada. Estes 4 níveis te ' +
            'dão a régua para acertar a dosagem em qualquer tarefa.',
        },
        {
          type: 'h2',
          text: 'NÍVEL 1 — Faça e me reporte',
        },
        {
          type: 'p',
          text:
            'O liderado faz a tarefa exatamente como você instruiu, e te reporta cada ' +
            'passo. Ideal para: novato na tarefa, alta criticidade, custo de erro alto.',
        },
        {
          type: 'callout',
          tone: 'do',
          text:
            'Use Nível 1 nos primeiros 30 dias de qualquer pessoa em qualquer função ' +
            'nova. Mesmo que ela seja sênior. A confiança ganha-se pelo histórico, não ' +
            'pela trajetória anterior.',
        },
        {
          type: 'h2',
          text: 'NÍVEL 2 — Faça quando eu aprovar',
        },
        {
          type: 'p',
          text:
            'O liderado executa a tarefa, mas só publica/envia/finaliza com sua chancela ' +
            'final. Ele propõe; você aprova. Ideal para: tarefas de impacto público, ' +
            'comunicação externa, contratos.',
        },
        {
          type: 'h2',
          text: 'NÍVEL 3 — Pesquise e me apresente 3 opções',
        },
        {
          type: 'p',
          text:
            'O liderado constrói 3 caminhos com pró/contra/recomendação. Você escolhe. ' +
            'Ideal para: decisão estratégica, escolha de fornecedor, definição de método.',
        },
        {
          type: 'callout',
          tone: 'tip',
          text:
            'Nível 3 é o "treinamento de raciocínio estratégico" do liderado. Ao construir ' +
            'as 3 opções ele desenvolve a habilidade. Em 6 meses, sobe pro Nível 4.',
        },
        {
          type: 'h2',
          text: 'NÍVEL 4 — Decida e execute',
        },
        {
          type: 'p',
          text:
            'Autonomia total. Liderado decide, executa e te avisa só do resultado. ' +
            'Ideal para: tarefas que ele já dominou, decisões reversíveis, áreas onde ' +
            'a velocidade vale mais que o controle.',
        },
        {
          type: 'callout',
          tone: 'warning',
          text:
            'Nível 4 sem confiança ganha gera caos. Confiança ganha sem Nível 4 gera ' +
            'micromanagement. Suba o nível mensalmente como você subiria um salário.',
        },
        {
          type: 'h2',
          text: 'Como COMUNICAR o nível (script)',
        },
        {
          type: 'p',
          text:
            'O erro #1 do Dominante na delegação é não dizer EXPLICITAMENTE em que nível ' +
            'está delegando. O liderado fica adivinhando. Adivinhação gera fricção.',
        },
        {
          type: 'script',
          role: 'Diga isso ao delegar',
          sayThis:
            'Esse projeto está em nível 3. Quero que você pesquise e me traga 3 opções ' +
            'com pró e contra até quinta. Eu escolho. Próxima rodada subo para nível 4 ' +
            'se você acertar.',
          notThis:
            'Faz isso aí e qualquer coisa me chama.',
        },
        {
          type: 'h2',
          text: 'Tabela de auto-diagnóstico',
        },
        {
          type: 'table',
          headers: ['Sinal', 'Nível adequado'],
          rows: [
            ['Liderado é novo na função',                     'Nível 1'],
            ['Tarefa pública (cliente, mídia, jurídico)',     'Nível 2'],
            ['Decisão envolve >R$ 50k irreversível',          'Nível 2 ou 3'],
            ['Liderado já fez 5 vezes essa tarefa bem',       'Nível 4'],
            ['Você mesmo não sabe a melhor solução',          'Nível 3'],
            ['Crise / incêndio / deadline em horas',          'Nível 1'],
            ['Tarefa repetitiva, processo padronizado',       'Nível 4'],
          ],
        },
        {
          type: 'callout',
          tone: 'do',
          text:
            'Faça revisão MENSAL: das tarefas que estão em nível 1 ou 2, quais podem subir? ' +
            'Subir de nível é forma concreta de promoção sem mexer no salário. O liderado ' +
            'sente progresso. Você ganha capacidade.',
        },
      ],
    },

    // ============================================================
    // CAPÍTULO 3
    // ============================================================
    {
      number: 3,
      title: 'Diagnóstico de Maturidade do Liderado',
      subtitle: 'Calibrando o nível por pessoa e por tarefa',
      blocks: [
        {
          type: 'lead',
          text:
            'Mesma pessoa pode estar em níveis diferentes em tarefas diferentes. ' +
            'Aprenda a olhar cada combinação pessoa+tarefa como um par único.',
        },
        {
          type: 'h2',
          text: 'A matriz de maturidade (4 quadrantes)',
        },
        {
          type: 'table',
          headers: ['Quadrante', 'Capacidade', 'Vontade', 'Estilo recomendado'],
          rows: [
            ['Q1 — Iniciante entusiasmado',  'Baixa', 'Alta',  'Ensinar (Nível 1)'],
            ['Q2 — Aprendiz desiludido',     'Baixa', 'Baixa', 'Treinar + apoiar (N1+N2)'],
            ['Q3 — Cauteloso capaz',         'Alta',  'Baixa', 'Encorajar (N3 com apoio)'],
            ['Q4 — Mestre confiante',        'Alta',  'Alta',  'Delegar (Nível 4)'],
          ],
        },
        {
          type: 'p',
          text:
            'O Dominante mediano lê o liderado pela última impressão (positiva ou negativa). ' +
            'O Dominante de elite lê pelos quadrantes — e ajusta ESTILO por tarefa.',
        },
        {
          type: 'h2',
          text: 'Como diagnosticar (template)',
        },
        {
          type: 'p',
          text: 'Para cada liderado direto, responda em 1 página:',
        },
        {
          type: 'check',
          items: [
            'Liste as 5 tarefas mais frequentes que ele(a) faz',
            'Para cada uma, marque o quadrante atual (Q1-Q4)',
            'Para cada Q1 e Q2: o que falta? capacidade (treino) ou vontade (motivação)?',
            'Para cada Q3: o que está bloqueando a vontade? medo de errar? falta de feedback?',
            'Para cada Q4: a tarefa pode SUBIR para uma mais estratégica?',
          ],
        },
        {
          type: 'h2',
          text: 'Reuniões de calibração trimestral',
        },
        {
          type: 'p',
          text:
            'A cada 90 dias, sente com cada liderado e revise os quadrantes. As pessoas ' +
            'mudam. Tarefas mudam. Sua leitura tem que mudar junto.',
        },
        {
          type: 'kv',
          items: [
            { k: 'Frequência', v: 'A cada 3 meses, 30 min por liderado' },
            { k: 'Pergunta-âncora', v: '"Em quais tarefas você sente que poderia ter mais autonomia?"' },
            { k: 'Saída', v: 'Acordo escrito: tarefa X sobe para nível 4 a partir de [data]' },
            { k: 'Prova', v: '6 meses depois, a porcentagem de tarefas em N4 deve ter dobrado' },
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          text:
            'Maturidade não é sobre tempo de casa. É sobre quantos ciclos completos a ' +
            'pessoa fez naquela tarefa específica COM feedback recebido. Tempo sem ' +
            'feedback é tempo desperdiçado.',
        },
      ],
    },

    // ============================================================
    // CAPÍTULO 4
    // ============================================================
    {
      number: 4,
      title: 'O Método 1-3-1 de Feedback',
      subtitle: 'Estrutura que cria mudança real, não desconforto',
      blocks: [
        {
          type: 'lead',
          text:
            'Feedback do Dominante mediano é três palavras secas e uma cobrança no fim. ' +
            'Feedback do Dominante de elite tem estrutura. E estrutura é o que separa ' +
            'crítica útil de crítica destrutiva.',
        },
        {
          type: 'h2',
          text: 'A fórmula',
        },
        {
          type: 'kv',
          items: [
            { k: '1 ponto forte', v: 'específico, com exemplo concreto da semana' },
            { k: '3 melhorias',   v: 'mensuráveis, comportamentos observáveis (não opiniões)' },
            { k: '1 compromisso', v: 'claro, com data e métrica de sucesso' },
          ],
        },
        {
          type: 'h2',
          text: 'Por que NÃO usar sanduíche',
        },
        {
          type: 'p',
          text:
            'O sanduíche genérico (elogio + crítica + elogio) treina o cérebro do ' +
            'liderado a IGNORAR os elogios para escavar a crítica. Resultado: ele só ' +
            'lembra do "MAS" do meio. Você gastou 3 ingredientes, ele provou só 1.',
        },
        {
          type: 'callout',
          tone: 'dont',
          text:
            'Sanduíche genérico: "Você é ótimo, MAS o relatório atrasou, MAS você é ' +
            'esforçado." → Ele só ouviu: "o relatório atrasou". E ainda perdeu confiança ' +
            'nos elogios futuros.',
        },
        {
          type: 'callout',
          tone: 'do',
          text:
            'Método 1-3-1 aplicado: "Vi que você fechou a venda do cliente X em 4 dias ' +
            '— normalmente leva 2 semanas (PONTO FORTE). 3 melhorias: (1) o follow-up ' +
            'foi por mensagem, podia ter sido call; (2) você não pediu reunião com ' +
            'o time financeiro; (3) o desconto foi 8%, fora do nosso teto de 5%. ' +
            'Compromisso: na próxima venda acima de R$ 30k, você me chama ANTES de ' +
            'fechar desconto. Combinado?"',
        },
        {
          type: 'h2',
          text: 'Regras de ouro do feedback',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Feedback positivo PÚBLICO. Feedback negativo PRIVADO. Sem exceção.',
            'Em até 48h do evento — quanto mais antigo, menos útil',
            'Comportamento OBSERVÁVEL, não traço de personalidade ("você foi" ≠ "você é")',
            'Sempre com pergunta no fim: "faz sentido?", "como você vê?"',
            'Documente o compromisso: e-mail de 3 linhas serve',
          ],
        },
        {
          type: 'h2',
          text: 'Quando o liderado discorda',
        },
        {
          type: 'p',
          text:
            'Discordância é sinal de saúde. Liderado que concorda em tudo está mentindo ' +
            'ou já desistiu. Use discordância para CALIBRAR o seu próprio enxergar.',
        },
        {
          type: 'script',
          role: 'Liderado discorda do feedback',
          sayThis:
            'Interessante você ver assim. Me ajuda a entender: o que eu vi como X, na ' +
            'sua perspectiva era Y. Pode me trazer o caso para a gente revisar juntos?',
          notThis:
            'Não é discussão. É decisão minha.',
        },
      ],
    },

    // ============================================================
    // CAPÍTULO 5
    // ============================================================
    {
      number: 5,
      title: 'Reuniões 1:1 — Roteiro de 30 min',
      subtitle: 'O ritual que substitui 4 horas de microgerência',
      blocks: [
        {
          type: 'lead',
          text:
            'Se você só tem 1 hora por semana com cada direto e usa essa hora bem, sua ' +
            'micro intervenção diária cai 80%. 1:1 não é luxo. É sistema operacional.',
        },
        {
          type: 'h2',
          text: 'A pauta fixa (não negocie)',
        },
        {
          type: 'kv',
          items: [
            { k: '5 min', v: 'Como você está? (humano, não tarefa)' },
            { k: '10 min', v: 'O que está te travando? (descobrir bloqueios)' },
            { k: '10 min', v: 'Revisão de KPIs (números, não narrativa)' },
            { k: '5 min',  v: 'Combinados para próxima semana (escritos)' },
          ],
        },
        {
          type: 'callout',
          tone: 'do',
          text:
            'NUNCA cancele 1:1. Reagende, mas nunca cancele. Cancelar 1:1 é dizer "você ' +
            'não importa". O liderado lê isso em 1 minuto e leva 6 meses para esquecer.',
        },
        {
          type: 'h2',
          text: '12 perguntas para usar nos 1:1 (cofre de munição)',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'O que está te energizando essa semana?',
            'O que está te drenando?',
            'O que eu poderia fazer diferente para te ajudar mais?',
            'Qual é a decisão que você está adiando?',
            'Se você fosse o meu chefe, o que eu deveria mudar?',
            'Qual habilidade você quer desenvolver nos próximos 90 dias?',
            'Tem alguma conversa difícil que você está evitando?',
            'Em que momento da semana você sentiu mais propósito?',
            'O que está acontecendo na sua vida fora do trabalho que eu deveria saber?',
            'Quem no time merece reconhecimento agora?',
            'Qual processo nosso está mais ineficiente?',
            'Se você tivesse 4h livres na agenda, o que faria?',
          ],
        },
        {
          type: 'h2',
          text: 'Erros mais comuns do Dominante em 1:1',
        },
        {
          type: 'callout',
          tone: 'dont',
          text:
            'Transformar 1:1 em status report. Se virou status, vire async. 1:1 é para o ' +
            'que NÃO cabe num email.',
        },
        {
          type: 'callout',
          tone: 'dont',
          text:
            'Falar mais que o liderado. Meta: ele fala 70%, você 30%. Cronometre se ' +
            'precisar.',
        },
        {
          type: 'callout',
          tone: 'dont',
          text:
            'Pular as perguntas humanas e ir direto pros KPIs. Você perde a info mais ' +
            'valiosa: por que ele(a) está saindo? Por que está animado(a)?',
        },
        {
          type: 'h2',
          text: 'O que sair de cada 1:1',
        },
        {
          type: 'check',
          items: [
            '1 compromisso claro (seu OU dele) com data',
            '1 decisão fechada (não pendurar)',
            '1 informação NOVA que você não sabia (humana ou operacional)',
          ],
        },
      ],
    },

    // ============================================================
    // CAPÍTULO 6
    // ============================================================
    {
      number: 6,
      title: 'Como Demitir Sem Destruir o Time (e Sem Culpa)',
      subtitle: 'A conversa mais importante e mais negligenciada da liderança',
      blocks: [
        {
          type: 'lead',
          text:
            'Demitir mal não custa só ao demitido. Custa CONFIANÇA do time inteiro. ' +
            'Esse capítulo te dá o protocolo para manter a operação saudável depois ' +
            'de uma decisão dura.',
        },
        {
          type: 'h2',
          text: 'Antes da demissão — fase de prevenção',
        },
        {
          type: 'p',
          text:
            'Se a demissão te pega de surpresa, falhou o sistema 60 dias antes. ' +
            'Demissão bem feita é uma conversa que começa muito antes.',
        },
        {
          type: 'check',
          items: [
            'Plano de Melhoria Documentado (PMD): expectativas claras, métricas, prazo',
            'Feedback estruturado a cada 14 dias durante o PMD',
            'Pelo menos 1 esforço genuíno de recolocação interna',
            'Apoio explícito (treinamento, mentor, buddy)',
            'Comunicação clara de consequência se não houver evolução',
          ],
        },
        {
          type: 'h2',
          text: 'A conversa de desligamento — passo a passo',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Sala fechada, sem janela para a área comum, RH presente',
            'Frase inicial sem rodeios: "Tomei a decisão de encerrar nosso vínculo. Vou explicar."',
            '2 razões objetivas (não personality), com exemplo. Sem listar 10.',
            'Reconhecer 1 contribuição real. Não inventar.',
            'Detalhes práticos (último dia, equipamento, recolocação, comunicação)',
            'Espaço para 1 pergunta final. Não entre em discussão.',
            'Duração total: 15 a 20 minutos. Não mais.',
          ],
        },
        {
          type: 'h2',
          text: 'Comunicação ao time pós-desligamento',
        },
        {
          type: 'script',
          role: 'No grupo do time, mesmo dia',
          sayThis:
            'Aviso a todos que [nome] não faz mais parte do time a partir de hoje. ' +
            'Foi uma decisão minha. Quero agradecer pelas contribuições e desejar o ' +
            'melhor. As atribuições serão redistribuídas até sexta. Estou disponível ' +
            'para conversar individualmente com quem precisar.',
          notThis:
            'Devido a problemas com o desempenho dele(a), tivemos que desligá-lo(a). ' +
            'Espero que sirva de exemplo para todos.',
        },
        {
          type: 'callout',
          tone: 'warning',
          text:
            'NUNCA fale mal do demitido para o time. NUNCA. Mesmo que a saída tenha ' +
            'sido por má conduta, manter o caráter é mostrar a régua de respeito que ' +
            'os que ficam podem esperar de você.',
        },
        {
          type: 'h2',
          text: 'Como lidar com a sua culpa',
        },
        {
          type: 'p',
          text:
            'Dominante geralmente NÃO sente culpa imediata — sente certeza. Cuidado: a ' +
            'ausência de desconforto pode ser sinal de que você não SEPAROU corretamente ' +
            'a decisão (acertada) do impacto humano (real). Reserve 30 min sozinho ' +
            'depois de cada demissão para reconhecer o impacto.',
        },
      ],
    },

    // ============================================================
    // CAPÍTULO 7
    // ============================================================
    {
      number: 7,
      title: 'KPIs de Liderança que Você Não Pode Ignorar',
      subtitle: 'Métricas pessoais que importam mais que as do time',
      blocks: [
        {
          type: 'lead',
          text:
            'Você mede a operação. Quem mede a sua liderança? Esse capítulo são as ' +
            '6 métricas pessoais que separam o gestor mediano do líder de elite.',
        },
        {
          type: 'h2',
          text: 'KPI 1 — Tempo de decisão (TD)',
        },
        {
          type: 'kv',
          items: [
            { k: 'Definição', v: 'Tempo médio entre o liderado pedir e você responder' },
            { k: 'Meta',      v: '< 24h em 80% das vezes' },
            { k: 'Como medir', v: 'Anote os 10 últimos pedidos. Conte horas.' },
          ],
        },
        {
          type: 'h2',
          text: 'KPI 2 — % de tarefas em Nível 4',
        },
        {
          type: 'kv',
          items: [
            { k: 'Definição', v: '% das tarefas do time em autonomia total' },
            { k: 'Meta',      v: '> 50% após 12 meses de gestão' },
            { k: 'Por que',   v: 'É o KPI mais correlacionado com seu próprio crescimento' },
          ],
        },
        {
          type: 'h2',
          text: 'KPI 3 — eNPS do time (mensal)',
        },
        {
          type: 'kv',
          items: [
            { k: 'Definição', v: '"De 0 a 10, recomendaria trabalhar comigo a um amigo?"' },
            { k: 'Meta',      v: '> 8 média móvel de 3 meses' },
            { k: 'Frequência', v: 'Pulse anônimo mensal' },
          ],
        },
        {
          type: 'h2',
          text: 'KPI 4 — Taxa de retenção (12 meses)',
        },
        {
          type: 'p',
          text:
            'Se >15% do time saiu nos últimos 12 meses, há algo errado com a gestão. ' +
            'Calcule: número de saídas voluntárias ÷ tamanho médio do time × 100.',
        },
        {
          type: 'h2',
          text: 'KPI 5 — Tempo em trabalho profundo',
        },
        {
          type: 'kv',
          items: [
            { k: 'Definição',  v: 'Horas/semana em trabalho estratégico (não operacional)' },
            { k: 'Meta',       v: '> 8h/semana em foco profundo' },
            { k: 'Como medir', v: 'Track manual por 2 semanas → revele padrão' },
          ],
        },
        {
          type: 'h2',
          text: 'KPI 6 — Frequência de delegações que VOLTAM',
        },
        {
          type: 'p',
          text:
            'Quantas tarefas você delegou e ACABARAM voltando para você? Se for > 10%, ' +
            'você está delegando errado: ou subindo nível cedo demais ou não dando ' +
            'contexto suficiente.',
        },
        {
          type: 'callout',
          tone: 'tip',
          text:
            'Construa um dashboard pessoal com esses 6 KPIs. Revise mensal. Compartilhe ' +
            'a versão "agregada" com seu chefe — sinaliza que você se gerencia, não só ' +
            'gerencia outros.',
        },
      ],
    },

    // ============================================================
    // CAPÍTULO 8
    // ============================================================
    {
      number: 8,
      title: 'Estudo de Caso: 3 Dominantes que Viraram CEOs',
      subtitle: 'Padrões que separam quem chega de quem trava',
      blocks: [
        {
          type: 'lead',
          text:
            'Anonimizamos 3 trajetórias de Dominantes que avaliamos no Mapa Comportamental. ' +
            'Casos compostos a partir de mais de 50 entrevistas. Nomes fictícios.',
        },
        {
          type: 'h2',
          text: 'Caso 1 — Marcelo, 32 → 38 anos',
        },
        {
          type: 'p',
          text:
            'Começou como gerente regional aos 32. Em 6 anos, virou CEO de uma fintech. ' +
            'O que mudou? Aos 33 ele percebeu que era gargalo. Implementou Nível 4 em ' +
            '50% das decisões em 12 meses. O time dobrou de tamanho com o mesmo headcount ' +
            'porque parou de esperar por ele.',
        },
        {
          type: 'kv',
          items: [
            { k: 'Padrão #1',  v: 'Reuniões 1:1 quinzenais sem falta há 6 anos' },
            { k: 'Padrão #2',  v: 'Mentor formal (CEO de outra empresa) toda 3ª quinta' },
            { k: 'Padrão #3',  v: 'Diário pessoal de 5 min/dia com 3 perguntas' },
          ],
        },
        {
          type: 'h2',
          text: 'Caso 2 — Carla, 38 → 44 anos',
        },
        {
          type: 'p',
          text:
            'Diretora comercial de uma indústria de bens de capital. Travou aos 38 — ' +
            'era a "melhor diretora", mas ninguém embaixo dela cresceu. Aos 41 contratou ' +
            'coach de liderança. Em 18 meses, 3 pessoas do time dela foram promovidas. ' +
            'Foi promovida a CEO porque finalmente havia sucessor.',
        },
        {
          type: 'callout',
          tone: 'tip',
          text:
            'Insight de Carla: "O CEO me disse que eu só seria promovida quando alguém ' +
            'estivesse pronto para assumir meu lugar. Isso virou minha métrica de ' +
            'sucesso pessoal."',
        },
        {
          type: 'h2',
          text: 'Caso 3 — Roberto, 29 → 35 anos',
        },
        {
          type: 'p',
          text:
            'Co-fundador técnico que virou CEO único quando o sócio comercial saiu. ' +
            'Roberto sempre foi extremo Dominante. Aos 30, tinha turnover de 35% no ano. ' +
            'Aos 32, contratou um VP de Pessoas, não para terceirizar gestão de pessoas, ' +
            'mas para te-LO como espelho profissional. Em 3 anos, turnover caiu para 7%.',
        },
        {
          type: 'h2',
          text: 'O denominador comum dos 3',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Aceitaram que precisavam mudar ANTES de o ambiente forçar',
            'Buscaram um espelho profissional externo (mentor/coach/sócio)',
            'Documentaram seus aprendizados — todos têm um caderno físico',
            'Trataram empatia como skill técnica (treinaram, não esperaram acontecer)',
            'Mediram a si mesmos com KPIs antes de medir o time',
          ],
        },
      ],
    },
  ],

  // ============================================================
  // ANEXOS
  // ============================================================
  appendices: [
    {
      title: 'Anexo A — 12 frases para usar nas reuniões 1:1',
      blocks: [
        {
          type: 'p',
          text:
            'Imprima essa página. Cole na sua agenda. Use 1-2 frases por reunião — ' +
            'evite repetir muito a mesma para manter o efeito.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            '"Antes de a gente entrar nas tarefas, como você está de verdade?"',
            '"O que eu poderia fazer diferente para te ajudar mais nessa semana?"',
            '"Qual é a decisão que você está adiando?"',
            '"Se você fosse meu chefe, o que eu deveria mudar?"',
            '"O que está te energizando?"',
            '"O que está te drenando?"',
            '"Tem alguma conversa difícil que você está evitando?"',
            '"Quem no time merece reconhecimento agora — e por quê?"',
            '"Em escala de 0 a 10, quão alinhado você está com o que está construindo?"',
            '"O que você gostaria de fazer mais e tem feito menos?"',
            '"Se você tivesse 4h livres na agenda, em que investiria?"',
            '"Algo da sua vida fora do trabalho está afetando aqui?"',
          ],
        },
      ],
    },
    {
      title: 'Anexo B — Modelo de OKR para times comandados por D',
      blocks: [
        {
          type: 'p',
          text:
            'Dominante naturalmente prefere métricas duras. OKR é a moldura ideal. ' +
            'Modelo abaixo: 1 Objetivo trimestral, 3 Resultados-Chave mensuráveis.',
        },
        {
          type: 'h2',
          text: 'Estrutura',
        },
        {
          type: 'kv',
          items: [
            { k: 'Objetivo', v: 'Qualitativo, inspirador, em uma frase' },
            { k: 'KR 1', v: 'Métrica numérica (ex: "Aumentar receita de R$ 1M para R$ 1.5M")' },
            { k: 'KR 2', v: 'Métrica de qualidade (ex: "NPS sobe de 45 para 60")' },
            { k: 'KR 3', v: 'Métrica de processo (ex: "Reduzir ciclo de venda de 45 para 30 dias")' },
          ],
        },
        {
          type: 'h2',
          text: 'Exemplo aplicado',
        },
        {
          type: 'p',
          text:
            'Objetivo: Tornar o time comercial referência de eficiência no segmento.',
        },
        {
          type: 'list',
          items: [
            'KR1: Aumentar receita por SDR de R$ 80k para R$ 120k/mês',
            'KR2: Reduzir churn dos 90 primeiros dias de 18% para 9%',
            'KR3: Diminuir tempo médio de fechamento de 32 para 22 dias',
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          text:
            'Revisão semanal de OKR: 15 min, sexta às 16h, com o time inteiro. Se um ' +
            'KR está em risco há 2 semanas seguidas, decisão na hora — não empurre.',
        },
      ],
    },
  ],

  closing: {
    headline: 'Microgerência é falta de sistema. Construa o sistema.',
    subtext:
      'Releia este Playbook a cada 90 dias. As páginas que pareceram óbvias na ' +
      'primeira leitura vão revelar profundidades novas conforme você ganhar ' +
      'maturidade na cadeira. Boa execução.',
  },
}

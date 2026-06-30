// ============================================================
// QI / RACIOCÍNIO LÓGICO — Banco de questões com gabarito
// Teste PONTUADO (certo/errado), diferente dos testes de perfil.
// 28 questões (7 por pilar). A cada sessão são sorteadas 20
// (5 por pilar) com seed determinístico por token — o candidato
// vê questões novas se refizer, e o mesmo token sempre repete.
//
// Pilares (alinhados a GMAT / Matrizes de Raven / testes de aptidão):
//   LOGICO     — Raciocínio Lógico-Matemático (%, taxas, probabilidade)
//   ANALITICO  — Raciocínio Analítico e Posicionamento (ordenação,
//                verdades/mentiras, restrição espacial/circular)
//   VERBAL     — Raciocínio Verbal e Silogismos (dedução, analogias)
//   SEQUENCIAS — Sequências Lógicas (padrões numéricos/visuais)
//
// `correta` é o índice da alternativa correta (1=A, 2=B, 3=C, 4=D).
// O QITest guarda `value` = índice da alternativa escolhida (1..4)
// e o motor compara com `correta`. As alternativas NÃO são
// embaralhadas (mantém o gabarito estável).
// ============================================================

export type QiPilar = 'LOGICO' | 'ANALITICO' | 'VERBAL' | 'SEQUENCIAS'

export interface QiQuestion {
  id:           number
  pilar:        QiPilar
  enunciado:    string
  alternativas: [string, string, string, string] // A, B, C, D
  correta:      number   // 1..4
  explicacao:   string   // rationale (nó lógico + por que os distratores erram)
}

export const QI_PILAR_LABELS: Record<QiPilar, string> = {
  LOGICO:     'Lógico-Matemático',
  ANALITICO:  'Analítico e Posicionamento',
  VERBAL:     'Verbal e Silogismos',
  SEQUENCIAS: 'Sequências Lógicas',
}

export const QI_QUESTIONS: QiQuestion[] = [

  // ═══════════════════════════════════════════════════════════
  // PILAR 1 — LÓGICO-MATEMÁTICO
  // ═══════════════════════════════════════════════════════════
  {
    id: 1, pilar: 'LOGICO',
    enunciado: 'Um produto custava R$ 200. Sofreu um aumento de 10% e, em seguida, um desconto de 10% sobre o novo valor. Qual é o preço final?',
    alternativas: ['R$ 200,00', 'R$ 198,00', 'R$ 202,00', 'R$ 180,00'],
    correta: 2,
    explicacao: 'Aumentos e descontos sucessivos se multiplicam, não se cancelam: 200 × 1,10 × 0,90 = 198. O erro clássico (A) é imaginar que +10% e −10% se anulam; na verdade o desconto incide sobre um valor maior, gerando perda líquida de 1%.',
  },
  {
    id: 2, pilar: 'LOGICO',
    enunciado: 'Uma torneira enche um tanque em 4 horas; outra enche o mesmo tanque em 6 horas. Abertas juntas, em quanto tempo enchem o tanque?',
    alternativas: ['2 horas e 24 minutos', '5 horas', '2 horas e 30 minutos', '10 horas'],
    correta: 1,
    explicacao: 'Somam-se as TAXAS de trabalho, não os tempos: 1/4 + 1/6 = 5/12 do tanque por hora. Logo o tempo é 12/5 = 2,4 h = 2 h 24 min. O erro (D) soma os tempos (4+6) e (B) é uma média ingênua.',
  },
  {
    id: 3, pilar: 'LOGICO',
    enunciado: 'Dois dados comuns de seis faces são lançados. Qual é a probabilidade de a soma dos dois resultados ser igual a 7?',
    alternativas: ['1/12', '1/6', '7/36', '1/7'],
    correta: 2,
    explicacao: 'Existem 6 combinações que somam 7 — (1,6),(2,5),(3,4),(4,3),(5,2),(6,1) — em 36 resultados possíveis: 6/36 = 1/6. O erro (C) confunde "soma 7" com "7 casos sobre 36" e (D) usa o número 7 no denominador.',
  },
  {
    id: 4, pilar: 'LOGICO',
    enunciado: 'Um investimento rende 20% no primeiro ano e perde 20% no segundo ano. Partindo de R$ 1.000, ao final dos dois anos o capital:',
    alternativas: ['ficou igual, em R$ 1.000', 'aumentou para R$ 1.040', 'diminuiu para R$ 960', 'diminuiu para R$ 800'],
    correta: 3,
    explicacao: 'Ganho e perda percentuais iguais NÃO se cancelam: 1.000 × 1,20 × 0,80 = 960 (perda líquida de 4%). O erro (A) supõe que +20% e −20% se anulam; a perda incide sobre um valor já inflado.',
  },
  {
    id: 5, pilar: 'LOGICO',
    enunciado: 'Se 5 máquinas produzem 5 peças em 5 minutos, quantos minutos 100 máquinas levam para produzir 100 peças?',
    alternativas: ['100 minutos', '20 minutos', '5 minutos', '1 minuto'],
    correta: 3,
    explicacao: 'Cada máquina produz 1 peça a cada 5 minutos. Com 100 máquinas trabalhando em paralelo, 100 peças saem nos mesmos 5 minutos. O erro (A) escala o número "100" linearmente, ignorando o paralelismo.',
  },
  {
    id: 6, pilar: 'LOGICO',
    enunciado: 'Uma mercadoria foi vendida por R$ 660, com lucro de 10% sobre o preço de custo. Qual foi o preço de custo?',
    alternativas: ['R$ 600,00', 'R$ 594,00', 'R$ 726,00', 'R$ 650,00'],
    correta: 1,
    explicacao: 'O preço de venda equivale a 110% do custo: custo = 660 ÷ 1,10 = 600. O erro (B) aplica 10% de desconto sobre o preço de venda (660 × 0,90) em vez de dividir pela base correta.',
  },
  {
    id: 7, pilar: 'LOGICO',
    enunciado: 'Em uma turma, a razão entre o número de meninos e o de meninas é 3 para 2. Se há 18 meninos, quantos alunos há no total?',
    alternativas: ['30', '12', '45', '24'],
    correta: 1,
    explicacao: 'Se 3 partes equivalem a 18, cada parte vale 6; as meninas (2 partes) somam 12. Total = 18 + 12 = 30. O erro (B) calcula só as meninas e (C) aplica a razão de forma invertida.',
  },

  // ═══════════════════════════════════════════════════════════
  // PILAR 2 — ANALÍTICO E POSICIONAMENTO
  // ═══════════════════════════════════════════════════════════
  {
    id: 8, pilar: 'ANALITICO',
    enunciado: 'Quatro amigos correram uma prova. Ana chegou antes de Bruno. Carla chegou depois de Bruno. Diego chegou antes de Ana. Quem chegou em primeiro lugar?',
    alternativas: ['Ana', 'Bruno', 'Carla', 'Diego'],
    correta: 4,
    explicacao: 'Encadeando: Diego < Ana < Bruno < Carla. Como Diego chegou antes de Ana (que já vem antes de Bruno e Carla), Diego é o primeiro.',
  },
  {
    id: 9, pilar: 'ANALITICO',
    enunciado: 'Pedro, Rui e Tito fazem afirmações, e sabe-se que APENAS UM diz a verdade. Pedro: "Rui mente." Rui: "Tito mente." Tito: "Pedro e Rui mentem." Quem diz a verdade?',
    alternativas: ['Pedro', 'Rui', 'Tito', 'É impossível determinar'],
    correta: 2,
    explicacao: 'Testando as hipóteses: se Rui fala a verdade, Tito mente, e Pedro (que disse "Rui mente") também mente — exatamente um verdadeiro, consistente. Se Pedro ou Tito fosse o verdadeiro, surgiriam dois verdadeiros ou uma contradição. Logo, é Rui.',
  },
  {
    id: 10, pilar: 'ANALITICO',
    enunciado: 'Cinco livros (A, B, C, D, E) estão empilhados. A está acima de C; C está acima de D; D está acima de E; e B está no topo da pilha. Qual é a ordem, do topo para a base?',
    alternativas: ['B, A, C, D, E', 'B, C, A, D, E', 'A, B, C, D, E', 'B, A, D, C, E'],
    correta: 1,
    explicacao: 'B no topo; depois A (acima de C); então C, D e E nessa ordem (C>D>E). Resultado: B, A, C, D, E. As demais violam ao menos uma restrição (ex.: C acima de A, ou D acima de C).',
  },
  {
    id: 11, pilar: 'ANALITICO',
    enunciado: 'Em uma mesa redonda de 4 lugares sentam-se João, Maria, Lia e Otto. João está exatamente de frente para Lia. Maria está à direita de João. Quem está de frente para Maria?',
    alternativas: ['João', 'Lia', 'Otto', 'Ninguém'],
    correta: 3,
    explicacao: 'Em uma mesa de 4 lugares, "de frente" são os pares opostos. Se João e Lia são opostos, sobram Maria e Otto como o outro par oposto. Portanto, de frente para Maria está Otto.',
  },
  {
    id: 12, pilar: 'ANALITICO',
    enunciado: 'Em uma fila, Marcos é a 5ª pessoa contando a partir da frente e a 9ª contando a partir do fim. Quantas pessoas há na fila?',
    alternativas: ['13', '14', '12', '15'],
    correta: 1,
    explicacao: 'Total = (posição pela frente) + (posição pelo fim) − 1, pois Marcos é contado nas duas pontas: 5 + 9 − 1 = 13. O erro (B) soma 5 + 9 sem descontar a dupla contagem.',
  },
  {
    id: 13, pilar: 'ANALITICO',
    enunciado: 'Três caixas têm as etiquetas "Maçãs", "Laranjas" e "Maçãs e Laranjas". Sabe-se que TODAS as etiquetas estão erradas. Você pode retirar UMA fruta de UMA única caixa para descobrir o conteúdo das três. De qual caixa deve retirar?',
    alternativas: ['Da caixa "Maçãs"', 'Da caixa "Laranjas"', 'Da caixa "Maçãs e Laranjas"', 'Tanto faz, qualquer uma resolve'],
    correta: 3,
    explicacao: 'Como toda etiqueta está errada, a caixa rotulada "Maçãs e Laranjas" só pode conter UM tipo de fruta. A fruta retirada revela seu conteúdo real, e como as outras duas também estão trocadas, deduzem-se as três. Tirar das outras (A/B) deixa ambiguidade.',
  },
  {
    id: 14, pilar: 'ANALITICO',
    enunciado: 'Quatro pessoas têm idades diferentes. P é mais velho que Q. R é mais novo que Q. S é mais velho que P. Quem é a pessoa mais nova?',
    alternativas: ['P', 'Q', 'R', 'S'],
    correta: 3,
    explicacao: 'Ordenando do mais velho ao mais novo: S > P > Q > R. Como R é mais novo que Q (que já é mais novo que P e S), R é o mais novo de todos.',
  },

  // ═══════════════════════════════════════════════════════════
  // PILAR 3 — VERBAL E SILOGISMOS
  // ═══════════════════════════════════════════════════════════
  {
    id: 15, pilar: 'VERBAL',
    enunciado: 'Considere as premissas: "Todo engenheiro é detalhista" e "Nenhum detalhista é imprudente". Qual conclusão é necessariamente verdadeira?',
    alternativas: ['Todo engenheiro é imprudente', 'Nenhum engenheiro é imprudente', 'Alguns engenheiros são imprudentes', 'Nada se pode concluir'],
    correta: 2,
    explicacao: 'Se todo engenheiro está contido no conjunto dos detalhistas, e nenhum detalhista é imprudente, então nenhum engenheiro pode ser imprudente. É um silogismo válido (Barbara/Celarent).',
  },
  {
    id: 16, pilar: 'VERBAL',
    enunciado: 'Premissas: "Se chove, então a rua fica molhada" e "A rua NÃO está molhada". O que se conclui logicamente?',
    alternativas: ['Choveu', 'Não choveu', 'A rua está molhada', 'Nada se pode concluir'],
    correta: 2,
    explicacao: 'É o modus tollens: se a consequência (rua molhada) não ocorreu, a causa (chuva) não pode ter ocorrido. Negar o consequente permite negar o antecedente — conclusão válida.',
  },
  {
    id: 17, pilar: 'VERBAL',
    enunciado: 'Premissas: "Alguns médicos são professores" e "Todos os professores são pacientes". Qual conclusão é necessariamente verdadeira?',
    alternativas: ['Todos os médicos são pacientes', 'Alguns médicos são pacientes', 'Nenhum médico é paciente', 'Todos os pacientes são médicos'],
    correta: 2,
    explicacao: 'Os médicos que também são professores são, por consequência, pacientes. Logo "alguns médicos são pacientes" é necessariamente verdadeiro. "Todos" (A) extrapola, pois nem todo médico é professor.',
  },
  {
    id: 18, pilar: 'VERBAL',
    enunciado: 'Analogia: "Médico está para Hospital assim como Professor está para ___".',
    alternativas: ['Aluno', 'Escola', 'Livro', 'Quadro'],
    correta: 2,
    explicacao: 'A relação é "profissional : local de trabalho". O médico atua no hospital; o professor atua na escola. O distrator (A) é a quem ele atende, não o local de trabalho.',
  },
  {
    id: 19, pilar: 'VERBAL',
    enunciado: 'Analogia: "Caneta está para Escrever assim como Tesoura está para ___".',
    alternativas: ['Papel', 'Cortar', 'Cabelo', 'Metal'],
    correta: 2,
    explicacao: 'A relação é "instrumento : função". A caneta serve para escrever; a tesoura serve para cortar. Os distratores (A/C) são objetos sobre os quais a tesoura age, não a sua função.',
  },
  {
    id: 20, pilar: 'VERBAL',
    enunciado: 'Qual frase é logicamente equivalente à NEGAÇÃO de "Todos os alunos passaram"?',
    alternativas: ['Nenhum aluno passou', 'Todos os alunos reprovaram', 'Pelo menos um aluno não passou', 'Alguns alunos passaram'],
    correta: 3,
    explicacao: 'A negação de "todos" é "existe pelo menos um que não" — basta um aluno não ter passado para a afirmação original ser falsa. O erro clássico (A) troca a negação lógica por oposição total ("nenhum").',
  },
  {
    id: 21, pilar: 'VERBAL',
    enunciado: 'Premissas: "Se eu estudo, então eu passo" e "Eu estudei". O que se conclui logicamente?',
    alternativas: ['Eu passei', 'Eu não passei', 'Eu não estudei', 'Nada se pode concluir'],
    correta: 1,
    explicacao: 'É o modus ponens: afirmado o antecedente ("estudei"), conclui-se o consequente ("passei"). É a inferência válida mais básica da lógica proposicional.',
  },

  // ═══════════════════════════════════════════════════════════
  // PILAR 4 — SEQUÊNCIAS LÓGICAS
  // ═══════════════════════════════════════════════════════════
  {
    id: 22, pilar: 'SEQUENCIAS',
    enunciado: 'Qual é o próximo número da sequência: 2, 6, 12, 20, 30, ___ ?',
    alternativas: ['38', '40', '42', '36'],
    correta: 3,
    explicacao: 'As diferenças entre os termos crescem: 4, 6, 8, 10... — a próxima é 12, então 30 + 12 = 42. (O padrão é n·(n+1): 1·2, 2·3, 3·4, 4·5, 5·6, 6·7.)',
  },
  {
    id: 23, pilar: 'SEQUENCIAS',
    enunciado: 'Qual é o próximo número da sequência: 1, 1, 2, 3, 5, 8, ___ ?',
    alternativas: ['11', '13', '12', '16'],
    correta: 2,
    explicacao: 'É a sequência de Fibonacci: cada termo é a soma dos dois anteriores. 5 + 8 = 13. O erro (D) dobra o último termo (8×2) em vez de somar os dois últimos.',
  },
  {
    id: 24, pilar: 'SEQUENCIAS',
    enunciado: 'Qual é o próximo número da sequência: 3, 6, 12, 24, ___ ?',
    alternativas: ['36', '48', '30', '42'],
    correta: 2,
    explicacao: 'Cada termo é o dobro do anterior (×2): 24 × 2 = 48. O erro (A) soma 12 (progressão aritmética) em vez de multiplicar (progressão geométrica).',
  },
  {
    id: 25, pilar: 'SEQUENCIAS',
    enunciado: 'Qual é a próxima letra da sequência: B, D, F, H, ___ ?',
    alternativas: ['I', 'J', 'K', 'G'],
    correta: 2,
    explicacao: 'A sequência pula uma letra do alfabeto a cada passo (B, _, D, _, F, _, H, _, J). São as letras de posição par. A próxima é J. O erro (A) avança apenas uma posição (de H para I).',
  },
  {
    id: 26, pilar: 'SEQUENCIAS',
    enunciado: 'Qual é o próximo número da sequência: 100, 50, 25, 12,5, ___ ?',
    alternativas: ['6,25', '0', '6', '10'],
    correta: 1,
    explicacao: 'Cada termo é a metade do anterior (÷2): 12,5 ÷ 2 = 6,25. É uma progressão geométrica de razão 1/2.',
  },
  {
    id: 27, pilar: 'SEQUENCIAS',
    enunciado: 'Qual é o próximo número da sequência: 1, 4, 9, 16, 25, ___ ?',
    alternativas: ['30', '36', '49', '32'],
    correta: 2,
    explicacao: 'São os quadrados perfeitos: 1², 2², 3², 4², 5²... O próximo é 6² = 36. O erro (C) pula um termo (vai direto para 7² = 49).',
  },
  {
    id: 28, pilar: 'SEQUENCIAS',
    enunciado: 'Qual é o próximo número da sequência: 2, 3, 5, 7, 11, ___ ?',
    alternativas: ['12', '13', '9', '15'],
    correta: 2,
    explicacao: 'São os números primos em ordem (divisíveis apenas por 1 e por si mesmos). Depois de 11 vem 13. Os distratores (A/C/D) são números compostos.',
  },
]

// ── Helpers ───────────────────────────────────────────────
export function getQiQuestionsByPilar(pilar: QiPilar): QiQuestion[] {
  return QI_QUESTIONS.filter((q) => q.pilar === pilar)
}

export const QI_PILARES: QiPilar[] = ['LOGICO', 'ANALITICO', 'VERBAL', 'SEQUENCIAS']

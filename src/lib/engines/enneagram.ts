// ============================================================
// ENGINE ENEAGRAMA — 9 Tipos de Personalidade
// 135 afirmações (15 por tipo) | Escala 1-5 por afirmação
// Fonte: Riso & Hudson, A Sabedoria do Eneagrama
// ============================================================

export type EnneagramType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

export interface EnneagramQuestion {
  id: number       // 1-135 (global)
  localId: number  // 1-15 (dentro do tipo)
  type: EnneagramType
  text: string
}

export interface EnneagramAnswer {
  questionId: number // 1-135
  score: number      // 1-5
}

export interface EnneagramResult {
  scores: Record<EnneagramType, number>       // soma 15-75 por tipo
  percentages: Record<EnneagramType, number>
  predominant: EnneagramType
  secondary: EnneagramType
  interpretation: Record<EnneagramType, string>
  report: EnneagramTypeReport
}

// ============================================================
// ESCALA DE PONTUAÇÃO
// ============================================================
// 1 = Nunca é verdadeira
// 2 = Raramente é verdadeira
// 3 = Em parte é verdadeira
// 4 = Geralmente é verdadeira
// 5 = Sempre é verdadeira
//
// Score por tipo: 15 perguntas × máx 5 = 75 | mín 15
// Interpretação:
//   15–30 → Provavelmente NÃO pertence a este tipo
//   30–45 → Tem problemas em comum ou pai é deste tipo
//   45–60 → Tem algum componente deste tipo
//   60–75 → Muito provavelmente pertence a este tipo

// ============================================================
// AS 135 AFIRMAÇÕES (15 por tipo)
// ============================================================

export const ENNEAGRAM_QUESTIONS: EnneagramQuestion[] = [
  // TIPO 1 — PERFECCIONISTA
  { id: 1,  localId: 1,  type: 1, text: 'A maioria das pessoas me vê como alguém sério e sensato. E no fim das contas, creio que sou assim mesmo.' },
  { id: 2,  localId: 2,  type: 1, text: 'Sempre procurei ser honesto e objetivo com relação a mim mesmo e estou decidido a seguir minha consciência, não importa a que preço.' },
  { id: 3,  localId: 3,  type: 1, text: 'Embora eu possa ter um lado desregrado, de modo geral, ele nunca prevaleceu em meu estilo.' },
  { id: 4,  localId: 4,  type: 1, text: 'Parece que há um juiz dentro da minha mente: às vezes ele é ponderado e sábio, mas em muitas ocasiões é simplesmente rígido e severo.' },
  { id: 5,  localId: 5,  type: 1, text: 'Acho que paguei um preço muito alto por tentar ser perfeito.' },
  { id: 6,  localId: 6,  type: 1, text: 'Gosto de rir como qualquer pessoa. Deveria rir mais!' },
  { id: 7,  localId: 7,  type: 1, text: 'Meus princípios e ideais inspiram-me a realizações maiores e dão sentido e valor à minha vida.' },
  { id: 8,  localId: 8,  type: 1, text: 'Não entendo como tanta gente tem padrões tão maleáveis.' },
  { id: 9,  localId: 9,  type: 1, text: 'As coisas dependem tanto de mim para ser feitas, que tenho que ser mais organizado e metódico que todo mundo.' },
  { id: 10, localId: 10, type: 1, text: 'Tenho a impressão de possuir uma missão, talvez até uma vocação para algo mais sublime, e acho que posso atingir alguma coisa extraordinária na vida.' },
  { id: 11, localId: 11, type: 1, text: 'Detesto erros e, por isso, geralmente sou extremamente rigoroso para ter certeza que as coisas estão sendo feitas como devem.' },
  { id: 12, localId: 12, type: 1, text: 'Em poucas palavras, há muito tempo venho acreditando que o certo é certo e o errado é errado.' },
  { id: 13, localId: 13, type: 1, text: 'Para mim é difícil me contentar com as coisas do jeito que são. Não tenho medo que elas piorem com minha interferência.' },
  { id: 14, localId: 14, type: 1, text: 'Tenho sobre os ombros muitas responsabilidades. Deus sabe o que aconteceria se eu não estivesse à altura das expectativas.' },
  { id: 15, localId: 15, type: 1, text: 'Manter a elegância e a nobreza, mesmo sob pressão, é algo que sempre me comove.' },

  // TIPO 2 — AJUDADORA (DOADORA)
  { id: 16, localId: 1,  type: 2, text: 'Meu interesse pelas pessoas me leva a me envolver profundamente com elas, com seus sonhos, esperanças e necessidades.' },
  { id: 17, localId: 2,  type: 2, text: 'Para mim, ser amigável é natural: puxo conversa facilmente e chamo todo mundo pelo nome.' },
  { id: 18, localId: 3,  type: 2, text: 'Descobri que as pessoas reagem com afeto quando lhes dou atenção e incentivo.' },
  { id: 19, localId: 4,  type: 2, text: 'Não posso ver um cachorro sem dono que já quero levar para casa.' },
  { id: 20, localId: 5,  type: 2, text: 'O fato de ser uma pessoa atenciosa e generosa me faz sentir bem.' },
  { id: 21, localId: 6,  type: 2, text: 'Não sou de argumentar que faço o bem para as pessoas, mas fico muito chateado se elas não reconhecem ou não se importam com isso.' },
  { id: 22, localId: 7,  type: 2, text: 'É verdade que, muitas vezes, faço mais pelos outros do que deveria. Dou demais e não penso muito em mim mesmo.' },
  { id: 23, localId: 8,  type: 2, text: 'Quase sempre me vejo tentando conquistar as pessoas, especialmente se, a princípio, elas parecem indiferentes.' },
  { id: 24, localId: 9,  type: 2, text: 'Tenho um prazer especial em receber e entreter meus amigos, a minha "grande família".' },
  { id: 25, localId: 10, type: 2, text: 'Posso ser afetuoso e ajudar as pessoas, mas sou mais forte do que pareço.' },
  { id: 26, localId: 11, type: 2, text: 'Consigo manifestar meus sentimentos mais abertamente que a maioria.' },
  { id: 27, localId: 12, type: 2, text: 'Sou capaz de desviar do meu caminho para saber o que está acontecendo com as pessoas de quem eu gosto.' },
  { id: 28, localId: 13, type: 2, text: 'Vejo a mim mesmo como um reparador de corações partidos.' },
  { id: 29, localId: 14, type: 2, text: 'Minha saúde e meu bolso já sofreram muitas vezes por eu ter colocado as necessidades e interesses dos outros acima dos meus.' },
  { id: 30, localId: 15, type: 2, text: 'Adoro me desdobrar para fazer as pessoas se sentirem bem-vindas e queridas.' },

  // TIPO 3 — REALIZADORA
  { id: 31, localId: 1,  type: 3, text: 'Vejo-me como uma pessoa extremamente competente. Fico muito aborrecido se não sou, no mínimo, eficiente.' },
  { id: 32, localId: 2,  type: 3, text: 'Quando as coisas vão bem, eu praticamente irradio uma espécie de alegria interior em ser quem eu sou e ter a vida que tenho.' },
  { id: 33, localId: 3,  type: 3, text: 'Tento me apresentar da melhor forma possível. Mas não é isso que todos fazem?' },
  { id: 34, localId: 4,  type: 3, text: 'Meus sentimentos me parecem estranhos a mim mesmo, eu sinto as coisas com toda a força por algum tempo e depois as esqueço.' },
  { id: 35, localId: 5,  type: 3, text: 'Para mim, é importante ser bem sucedido, mesmo que ainda não tenha todo o sucesso que desejo.' },
  { id: 36, localId: 6,  type: 3, text: 'Seja isso bom ou mau, sei esconder minhas inseguranças muito bem. As pessoas jamais adivinhariam o que estou sentindo!' },
  { id: 37, localId: 7,  type: 3, text: 'Quero causar sempre uma boa impressão, por isso, geralmente sou gentil, educado e amigável.' },
  { id: 38, localId: 8,  type: 3, text: 'Estou sempre a par de como os meus colegas e amigos estão se saindo e tendo a me comparar com eles.' },
  { id: 39, localId: 9,  type: 3, text: 'Procuro lutar para ser o melhor no que estou fazendo. Quando não posso me destacar em alguma coisa, nem lhe dou atenção.' },
  { id: 40, localId: 10, type: 3, text: 'Algumas vezes tive que simplificar as coisas para atingir minhas metas.' },
  { id: 41, localId: 11, type: 3, text: 'Quando me sinto inseguro, fico distante e frio com as pessoas.' },
  { id: 42, localId: 12, type: 3, text: 'Fico muito aborrecido quando as pessoas não reconhecem a excelência do que faço.' },
  { id: 43, localId: 13, type: 3, text: 'Sou mais adaptável do que a maioria. Se as coisas não dão certo, sei mudar meu comportamento para obter os resultados que pretendo.' },
  { id: 44, localId: 14, type: 3, text: 'Sempre tenho algum objetivo em mente e sei como me motivar para atingí-lo.' },
  { id: 45, localId: 15, type: 3, text: 'Sou um pouco viciado em trabalho, fico perdido quando não estou realizando coisas.' },

  // TIPO 4 — ROMÂNTICA (INDIVIDUALISTA)
  { id: 46, localId: 1,  type: 4, text: 'Muita gente me acha enigmático, difícil e contraditório. E eu gosto de ser assim!' },
  { id: 47, localId: 2,  type: 4, text: 'Geralmente remôo os sentimentos negativos por muito tempo antes de conseguir me livrar deles.' },
  { id: 48, localId: 3,  type: 4, text: 'Costumo me sentir solitário e sozinho, mesmo quando estou com as pessoas mais próximas.' },
  { id: 49, localId: 4,  type: 4, text: 'Quando sou criticado ou mal interpretado, costumo me retrair e ficar amuado.' },
  { id: 50, localId: 5,  type: 4, text: 'Para mim é difícil me envolver com as coisas quando não tenho o controle criativo sobre elas.' },
  { id: 51, localId: 6,  type: 4, text: 'Geralmente não sigo regras nem correspondo a expectativas porque quero dar meu toque pessoal a tudo aquilo que faço.' },
  { id: 52, localId: 7,  type: 4, text: 'Segundo a maioria dos padrões, sou bastante dramático e temperamental.' },
  { id: 53, localId: 8,  type: 4, text: 'Gosto de passar muito tempo imaginando cenas e conversas que nem sempre ocorreram de fato.' },
  { id: 54, localId: 9,  type: 4, text: 'Desejo que alguém me salve de toda essa cansativa confusão.' },
  { id: 55, localId: 10, type: 4, text: 'Quando as coisas ficam difíceis, geralmente eu desabo e desisto, talvez desista das coisas fácil demais.' },
  { id: 56, localId: 11, type: 4, text: 'Posso perdoar quase tudo, menos mau gosto.' },
  { id: 57, localId: 12, type: 4, text: 'Em geral, não gosto de trabalhar muito ligado a ninguém.' },
  { id: 58, localId: 13, type: 4, text: 'Encontrar a mim mesmo e ser fiel às minhas necessidades emocionais sempre foram motivações extremamente importantes para mim.' },
  { id: 59, localId: 14, type: 4, text: 'Não gosto de ser líder nem seguidor.' },
  { id: 60, localId: 15, type: 4, text: 'Sempre tenho uma noção muito clara das minhas intuições, mesmo que não eu tenha coragem de agir de acordo com elas.' },

  // TIPO 5 — OBSERVADORA
  { id: 61, localId: 1,  type: 5, text: 'Gosto de analisar as coisas em profundidade, estudando minuciosamente cada detalhe, até compreendê-las o mais inteiramente possível.' },
  { id: 62, localId: 2,  type: 5, text: 'Sou uma pessoa extremamente reservada, que não libera para muitos a entrada em seu mundo.' },
  { id: 63, localId: 3,  type: 5, text: 'Não me sinto particularmente grande ou poderoso, mas pequeno e invisível: acho que daria um bom espião!' },
  { id: 64, localId: 4,  type: 5, text: 'As pessoas pensariam que sou louco se soubessem as coisas que penso.' },
  { id: 65, localId: 5,  type: 5, text: 'Só se pode tomar uma decisão racional quando se tem informações precisas. Mas a maioria das pessoas, na verdade, não é exatamente racional.' },
  { id: 66, localId: 6,  type: 5, text: 'Minha família me considera meio estranho e excêntrico. Já ouvi muitas vezes que preciso sair mais.' },
  { id: 67, localId: 7,  type: 5, text: 'Quando quero, sou capaz de falar pelos cotovelos. Porém, na maioria das vezes, prefiro assistir de camarote a toda essa loucura à minha volta.' },
  { id: 68, localId: 8,  type: 5, text: 'Se você precisa resolver um problema, deixe-me trabalhar nele sozinho e depois lhe dou uma resposta.' },
  { id: 69, localId: 9,  type: 5, text: 'Quando a gente para pra pensar, vê que não há nada mais estranho que o chamado "comportamento normal".' },
  { id: 70, localId: 10, type: 5, text: 'Geralmente passo um bom tempo polindo os projetos em que me envolvo.' },
  { id: 71, localId: 11, type: 5, text: 'Há tanta gente tão ignorante, que é incrível que alguma coisa ainda consiga dar certo!' },
  { id: 72, localId: 12, type: 5, text: 'Sei muito sobre uma série de coisas e, em algumas áreas, considero-me um expert.' },
  { id: 73, localId: 13, type: 5, text: 'Sou muito curioso e gosto de investigar o porquê das coisas. Mesmo as mais óbvias deixam de sê-lo quando você realmente pára para analisá-las.' },
  { id: 74, localId: 14, type: 5, text: 'Minha mente trabalha tanto que às vezes acho que está pegando fogo.' },
  { id: 75, localId: 15, type: 5, text: 'Muitas vezes perco a noção do tempo, pois estou sempre muito concentrado no que faço.' },

  // TIPO 6 — PRECAVIDA (LEAL)
  { id: 76, localId: 1,  type: 6, text: 'Sinto-me atraído pela autoridade e, ao mesmo tempo, descrente dela.' },
  { id: 77, localId: 2,  type: 6, text: 'Sou muito afetivo, apesar de quase nunca demonstrar o que sinto. A não ser para os mais íntimos e, mesmo assim, nem sempre.' },
  { id: 78, localId: 3,  type: 6, text: 'Se cometo um erro, tenho medo que todos pulem na minha garganta.' },
  { id: 79, localId: 4,  type: 6, text: 'Sinto-me mais seguro fazendo o que se espera de mim do que trabalhando por conta própria.' },
  { id: 80, localId: 5,  type: 6, text: 'Posso não concordar sempre com as regras, e nem sempre seguí-las, mas quero saber no que se embasam!' },
  { id: 81, localId: 6,  type: 6, text: 'A primeira impressão que as pessoas me causam geralmente é muito forte e difícil de mudar.' },
  { id: 82, localId: 7,  type: 6, text: 'As poucas pessoas a quem admiro são, para mim, meus heróis.' },
  { id: 83, localId: 8,  type: 6, text: 'Não gosto de tomar decisões importantes, mas também não quero que alguém as tome por mim!' },
  { id: 84, localId: 9,  type: 6, text: 'Algumas pessoas me consideram nervoso e agitado, mas não sabem o que se passa!' },
  { id: 85, localId: 10, type: 6, text: 'Sei o quanto eu posso estragar as coisas. Portanto, suspeitar do que os outros estão "aprontando" tem muito sentido pra mim.' },
  { id: 86, localId: 11, type: 6, text: 'Quero confiar nas pessoas, mas muitas vezes me vejo questionando suas intenções.' },
  { id: 87, localId: 12, type: 6, text: 'Sou de trabalhar duro: vou batalhando até fazer o que tem que ser feito.' },
  { id: 88, localId: 13, type: 6, text: 'Sondo a opinião daqueles em quem confio antes de tomar uma grande decisão.' },
  { id: 89, localId: 14, type: 6, text: 'É realmente curioso: muitas vezes sou cético, até cínico, em relação a muitas coisas. E, de repente, mudo e começo a acreditar completamente em tudo.' },
  { id: 90, localId: 15, type: 6, text: 'Meu sobrenome deveria ser Ansiedade.' },

  // TIPO 7 — SONHADORA (ENTUSIASTA)
  { id: 91,  localId: 1,  type: 7, text: 'Adoro viajar e descobrir diferentes tipos de pratos, de pessoas, de experiências. Todo o fantástico turbilhão da vida!' },
  { id: 92,  localId: 2,  type: 7, text: 'Minha agenda normalmente é cheia e eu gosto que seja assim. Não quero que a grama cresça debaixo de meus pés!' },
  { id: 93,  localId: 3,  type: 7, text: 'Para mim importa mais a emoção e a variedade do que o conforto e a segurança, embora eu não despreze a segurança quando a encontro.' },
  { id: 94,  localId: 4,  type: 7, text: 'Minha mente está sempre tagarelando. Às vezes parece que penso dez coisas ao mesmo tempo!' },
  { id: 95,  localId: 5,  type: 7, text: 'Se tem uma coisa que eu não suporto é me entediar. Procuro dar um jeito de não me aborrecer nunca.' },
  { id: 96,  localId: 6,  type: 7, text: 'Sou de entrar de cabeça nos relacionamentos, mas quando acabam, acabam.' },
  { id: 97,  localId: 7,  type: 7, text: 'Sou curioso e aventureiro, geralmente sou o primeiro a experimentar coisas novas e interessantes.' },
  { id: 98,  localId: 8,  type: 7, text: 'Quando já não gosto mais de fazer alguma coisa, eu paro de fazê-la.' },
  { id: 99,  localId: 9,  type: 7, text: 'Não sou só uma pessoa divertida. Tenho um lado sério, até sombrio, só que não gosto de mexer muito com ele.' },
  { id: 100, localId: 10, type: 7, text: 'Sou bom no que é geral e não tanto nos pequenos detalhes: gosto mais de pensar para chegar a novas ideias do que me envolver com a sua execução.' },
  { id: 101, localId: 11, type: 7, text: 'Quando realmente quero uma coisa, quase sempre descubro um meio de conseguí-la.' },
  { id: 102, localId: 12, type: 7, text: 'De vez em quando eu fico de baixo astral, mas sempre saio logo dele.' },
  { id: 103, localId: 13, type: 7, text: 'Um de meus maiores problemas é que sou muito distraído e às vezes me disperso demais.' },
  { id: 104, localId: 14, type: 7, text: 'Tenho tendência a gastar mais do que deveria.' },
  { id: 105, localId: 15, type: 7, text: 'Acho ótimo estar com as pessoas, contanto que elas queiram ir aonde eu quero.' },

  // TIPO 8 — CONTROLADORA (DESAFIADORA)
  { id: 106, localId: 1,  type: 8, text: 'Sou extremamente independente e não gosto de precisar de ninguém para as coisas realmente importantes.' },
  { id: 107, localId: 2,  type: 8, text: 'Sou da opinião que "é preciso quebrar alguns ovos quando se quer fazer um omelete".' },
  { id: 108, localId: 3,  type: 8, text: 'Quando gosto das pessoas, geralmente penso nelas como "minha gente" e acho que devo estar atento aos seus interesses.' },
  { id: 109, localId: 4,  type: 8, text: 'Sei como conseguir as coisas. Sei como recompensar e como pressionar as pessoas para que façam o que precisa ser feito.' },
  { id: 110, localId: 5,  type: 8, text: 'Não tenho muita simpatia pelos fracos e vacilantes. A fraqueza sempre é um convite aos problemas.' },
  { id: 111, localId: 6,  type: 8, text: 'Sou muito determinado. Não sou de recuar e nem desistir facilmente.' },
  { id: 112, localId: 7,  type: 8, text: 'Nada me deixa mais orgulhoso que ver alguém que acolhi sob a minha asa conseguir vencer sozinho.' },
  { id: 113, localId: 8,  type: 8, text: 'Tenho um lado terno, até um pouco sentimental, que demonstro para muito pouca gente.' },
  { id: 114, localId: 9,  type: 8, text: 'As pessoas que me conhecem apreciam o fato de ser objetivo e dizer exatamente o que eu penso.' },
  { id: 115, localId: 10, type: 8, text: 'Tive de trabalhar muito para conseguir tudo o que tenho. Acho que batalhar é muito bom porque dá resistência e nos faz ter certeza do que queremos.' },
  { id: 116, localId: 11, type: 8, text: 'Vejo-me como um desafiador, alguém que faz as pessoas abandonarem a comodidade para dar o melhor de si.' },
  { id: 117, localId: 12, type: 8, text: 'Meu senso de humor é direto, às vezes até um pouco rude, embora eu ache que a maioria das pessoas é demasiado recatada e vulnerável.' },
  { id: 118, localId: 13, type: 8, text: 'Meus acessos de raiva são monumentais, mas logo se dissipam.' },
  { id: 119, localId: 14, type: 8, text: 'Sinto-me mais vivo quando faço o que os outros julgam impossível. Gosto de ir até o limite e ver se consigo desafiar as probabilidades.' },
  { id: 120, localId: 15, type: 8, text: 'A corda sempre tem de estourar de um lado, e eu não quero que seja do meu.' },

  // TIPO 9 — PACIFICADORA
  { id: 121, localId: 1,  type: 9, text: 'O que as pessoas gostam em mim é a sensação de segurança que lhes transmito.' },
  { id: 122, localId: 2,  type: 9, text: 'Não me incomodo de estar com as pessoas nem de estar só, para mim tanto faz. Contanto que esteja em paz comigo mesmo.' },
  { id: 123, localId: 3,  type: 9, text: 'Encontrei um certo equilíbrio na vida e não vejo razão para perturbá-lo.' },
  { id: 124, localId: 4,  type: 9, text: 'Estar "a vontade", em todos os sentido da expressão, é algo que me agrada muito.' },
  { id: 125, localId: 5,  type: 9, text: 'Prefiro concordar do que criar uma cena.' },
  { id: 126, localId: 6,  type: 9, text: 'Não sei exatamente como, mas não deixo que as coisas me atinjam.' },
  { id: 127, localId: 7,  type: 9, text: 'Sou uma pessoa fácil de agradar e geralmente me contento com o que tenho.' },
  { id: 128, localId: 8,  type: 9, text: 'Já me disseram que sou distraído e alheio às coisas. O fato é que eu as entendo, mas simplesmente não quero reagir.' },
  { id: 129, localId: 9,  type: 9, text: 'Não me acho particularmente obstinado, mas as pessoas dizem que eu, às vezes, sou teimoso quando tomo uma decisão.' },
  { id: 130, localId: 10, type: 9, text: 'A maioria das pessoas parece se empolgar muito facilmente. Eu sou mais estável.' },
  { id: 131, localId: 11, type: 9, text: 'É preciso aceitar o que a vida nos dá, afinal, não há mesmo muito o que fazer.' },
  { id: 132, localId: 12, type: 9, text: 'Sou capaz de entender diferentes pontos de vista e geralmente concordo com as pessoas mais do que discordo delas.' },
  { id: 133, localId: 13, type: 9, text: 'Acredito que se devem realçar os fatores positivos, em vez de ficar martelando os negativos.' },
  { id: 134, localId: 14, type: 9, text: 'Tenho uma espécie de filosofia de vida que me orienta e conforta muito em épocas difíceis.' },
  { id: 135, localId: 15, type: 9, text: 'Durante o dia, faço tudo o que precisa ser feito, mas quando o dia acaba, eu relaxo mesmo!' },
]

// ============================================================
// CONTEÚDO DOS RELATÓRIOS POR TIPO
// ============================================================

export interface EnneagramTypeReport {
  type: EnneagramType
  name: string
  altName: string
  tagline: string
  motivation: string
  basicFear: string
  focusOfAttention: string
  strengths: string[]
  challenges: string[]
  wings: { wing: string; description: string }[]
  development: string[]
}

export const ENNEAGRAM_TYPES: Record<EnneagramType, EnneagramTypeReport> = {
  1: {
    type: 1, name: 'O Perfeccionista', altName: 'O Reformador', tagline: 'Ético, dedicado e confiável',
    motivation: 'Ser bom, íntegro e correto; melhorar o mundo',
    basicFear: 'Ser corrupto, mau ou defeituoso',
    focusOfAttention: 'Erros, imperfeições e o que precisa ser corrigido',
    strengths: ['Altos padrões morais e éticos', 'Disciplinado e organizado', 'Integridade e responsabilidade', 'Orientado para a excelência', 'Excelente em papéis que exigem ética'],
    challenges: ['Autocrítica excessiva', 'Perfeccionismo paralisante', 'Dificuldade em delegar', 'Rigidez e inflexibilidade', 'Frustração quando padrões não são atingidos'],
    wings: [{ wing: '1w9', description: 'Mais calmo e idealista, menos crítico' }, { wing: '1w2', description: 'Mais orientado para pessoas e prestativo' }],
    development: ['Aprender a aceitar a imperfeição como parte da vida', 'Praticar a autocompaixão', 'Delegar tarefas sem perfecionismo excessivo', 'Desenvolver senso de humor sobre os próprios erros'],
  },
  2: {
    type: 2, name: 'O Doador', altName: 'O Ajudador', tagline: 'Prestativo, generoso e interpessoal',
    motivation: 'Ser amado e apreciado; sentir-se necessário',
    basicFear: 'Ser indesejado ou não amado',
    focusOfAttention: 'Necessidades dos outros; como ser útil',
    strengths: ['Generosidade extrema', 'Empatia profunda', 'Habilidade de conectar com pessoas', 'Excelente ouvinte', 'Natural em cuidar dos outros'],
    challenges: ['Dificuldade em estabelecer limites', 'Negligencia as próprias necessidades', 'Busca de aprovação excessiva', 'Manipulação inconsciente', 'Esgotamento emocional'],
    wings: [{ wing: '2w1', description: 'Mais altruísta e orientado a princípios' }, { wing: '2w3', description: 'Mais sociável e orientado para sucesso' }],
    development: ['Aprender a dizer não', 'Cuidar das próprias necessidades', 'Reconhecer motivações ocultas de ajudar', 'Estabelecer limites saudáveis nos relacionamentos'],
  },
  3: {
    type: 3, name: 'O Realizador', altName: 'O Executivo', tagline: 'Ambicioso, competente e enérgico',
    motivation: 'Ser bem-sucedido, admirado e valorizado por seus feitos',
    basicFear: 'Ser inútil, fracassado ou sem valor',
    focusOfAttention: 'Resultados, sucesso e reconhecimento',
    strengths: ['Alta capacidade de trabalho', 'Orientado para objetivos', 'Adaptável e eficiente', 'Líder natural', 'Excelente em motivar equipes'],
    challenges: ['Negligencia relacionamentos e bem-estar', 'Tendência a se promover excessivamente', 'Dificuldade em se conectar com emoções', 'Workaholic', 'Confunde valor pessoal com realizações'],
    wings: [{ wing: '3w2', description: 'Mais orientado para pessoas e carismático' }, { wing: '3w4', description: 'Mais criativo e focado em autenticidade' }],
    development: ['Separar identidade de realizações', 'Cultivar relacionamentos autênticos', 'Conectar-se com sentimentos genuínos', 'Encontrar valor além do sucesso externo'],
  },
  4: {
    type: 4, name: 'O Individualista', altName: 'O Romântico', tagline: 'Expressivo, dramático e autoconsciente',
    motivation: 'Ser autêntico e encontrar significado pessoal',
    basicFear: 'Não ter identidade própria ou significância',
    focusOfAttention: 'O que está faltando; profundidade emocional',
    strengths: ['Criatividade e originalidade', 'Profunda sensibilidade emocional', 'Autenticidade e expressão pessoal', 'Empatia profunda com sofrimento alheio', 'Senso estético aguçado'],
    challenges: ['Tendência ao isolamento', 'Melancolia e dramatismo excessivos', 'Inveja do que os outros têm', 'Dificuldade de completar projetos', 'Hipersensibilidade à crítica'],
    wings: [{ wing: '4w3', description: 'Mais ambicioso e orientado para sucesso' }, { wing: '4w5', description: 'Mais introvertido e intelectual' }],
    development: ['Agir apesar das emoções', 'Focar no presente em vez do que falta', 'Desenvolver gratidão pelo que se tem', 'Equilibrar expressão emocional com praticidade'],
  },
  5: {
    type: 5, name: 'O Observador', altName: 'O Investigador', tagline: 'Intelectual, analítico e reservado',
    motivation: 'Ser competente e compreender o mundo',
    basicFear: 'Ser incapaz, inútil ou incompetente',
    focusOfAttention: 'Conhecimento, dados e observação',
    strengths: ['Análise profunda e detalhada', 'Grande capacidade intelectual', 'Independência e objetividade', 'Mente criativa e inovadora', 'Especialização em áreas de interesse'],
    challenges: ['Tendência ao isolamento social', 'Dificuldade de agir sem informações suficientes', 'Reserva emocional excessiva', 'Acúmulo de conhecimento sem ação', 'Desconexão do mundo prático'],
    wings: [{ wing: '5w4', description: 'Mais artístico e emocionalmente expressivo' }, { wing: '5w6', description: 'Mais prático e orientado para segurança' }],
    development: ['Engajar-se com o mundo além da observação', 'Compartilhar conhecimento e emoções', 'Agir mesmo sem todas as informações', 'Desenvolver conexões emocionais mais profundas'],
  },
  6: {
    type: 6, name: 'O Leal', altName: 'O Precavido', tagline: 'Comprometido, orientado para segurança e responsável',
    motivation: 'Ter segurança e suporte; saber em quem confiar',
    basicFear: 'Ser abandonado ou sem suporte',
    focusOfAttention: 'Riscos potenciais; o que pode dar errado',
    strengths: ['Lealdade e confiabilidade', 'Pensamento crítico aguçado', 'Capacidade de antecipar problemas', 'Trabalho duro e determinação', 'Excelente membro de equipe'],
    challenges: ['Ansiedade e preocupação excessivas', 'Desconfiança e paranoia', 'Dificuldade em tomar decisões', 'Procrastinação por medo de errar', 'Ambivalência com autoridade'],
    wings: [{ wing: '6w5', description: 'Mais introvertido e analítico' }, { wing: '6w7', description: 'Mais extrovertido e aventureiro' }],
    development: ['Desenvolver confiança em si mesmo', 'Questionar crenças ansiosas', 'Tomar decisões mesmo com incerteza', 'Encontrar segurança interior em vez de externa'],
  },
  7: {
    type: 7, name: 'O Entusiasta', altName: 'O Sonhador', tagline: 'Espontâneo, versátil e divertido',
    motivation: 'Ser feliz e satisfeito; ter novas experiências',
    basicFear: 'Ser privado; estar preso em dor ou limitação',
    focusOfAttention: 'Possibilidades positivas; próximas experiências',
    strengths: ['Energia contagiante e otimismo', 'Criatividade e versatilidade', 'Habilidade de fazer conexões entre ideias', 'Entusiasmo que inspira outros', 'Adaptabilidade'],
    challenges: ['Dificuldade em se comprometer', 'Impulsividade e dispersão', 'Fuga de emoções difíceis', 'Projetos inacabados', 'Excessos de todo tipo'],
    wings: [{ wing: '7w6', description: 'Mais responsável e focado em segurança' }, { wing: '7w8', description: 'Mais assertivo e orientado para resultados' }],
    development: ['Aprender a se comprometer com projetos', 'Enfrentar emoções difíceis em vez de evitá-las', 'Desenvolver profundidade em vez de amplitude', 'Praticar presença e gratidão'],
  },
  8: {
    type: 8, name: 'O Desafiador', altName: 'O Líder', tagline: 'Poderoso, assertivo e protetor',
    motivation: 'Proteger a si mesmo e aos que ama; exercer controle',
    basicFear: 'Ser controlado ou dominado pelos outros',
    focusOfAttention: 'Poder, controle e justiça',
    strengths: ['Liderança natural e assertividade', 'Coragem para enfrentar desafios', 'Proteção dos vulneráveis', 'Decisivo e direto', 'Energia e força de vontade'],
    challenges: ['Dificuldade em mostrar vulnerabilidade', 'Tendência ao excesso e à intensidade', 'Intimidação involuntária', 'Resistência a limites', 'Conflitos de controle'],
    wings: [{ wing: '8w7', description: 'Mais extrovertido, enérgico e aventureiro' }, { wing: '8w9', description: 'Mais calmo, receptivo e diplomático' }],
    development: ['Abrir-se para vulnerabilidade', 'Desenvolver escuta ativa', 'Equilibrar força com compaixão', 'Reconhecer quando ceder controle é necessário'],
  },
  9: {
    type: 9, name: 'O Pacificador', altName: 'O Mediador', tagline: 'Harmonioso, estável e inclusivo',
    motivation: 'Manter a paz interior e exterior; evitar conflitos',
    basicFear: 'Perda de conexão; fragmentação',
    focusOfAttention: 'Harmonia do ambiente; necessidades dos outros',
    strengths: ['Capacidade natural de mediação', 'Empatia e compreensão múltipla', 'Paciência e estabilidade', 'Presença calmante', 'Visão imparcial'],
    challenges: ['Negligência das próprias necessidades', 'Procrastinação e inércia', 'Dificuldade em se posicionar', 'Passividade em conflitos', 'Adormecimento de desejos pessoais'],
    wings: [{ wing: '9w8', description: 'Mais assertivo e enérgico' }, { wing: '9w1', description: 'Mais idealista e orientado a princípios' }],
    development: ['Identificar e expressar necessidades pessoais', 'Agir mesmo diante do desconforto', 'Engajar-se com conflitos de forma saudável', 'Desenvolver agenda própria e prioridades'],
  },
}

// ============================================================
// FUNÇÃO PRINCIPAL DE CÁLCULO
// ============================================================

export function calculateEnneagram(answers: EnneagramAnswer[]): EnneagramResult {
  if (answers.length !== 135) throw new Error('O teste Eneagrama requer 135 respostas (15 por tipo × 9 tipos).')

  const scores = {} as Record<EnneagramType, number>
  for (let t = 1; t <= 9; t++) scores[t as EnneagramType] = 0

  for (const answer of answers) {
    if (answer.score < 1 || answer.score > 5) throw new Error(`Questão ${answer.questionId}: score deve ser entre 1 e 5`)
    const question = ENNEAGRAM_QUESTIONS.find(q => q.id === answer.questionId)
    if (!question) throw new Error(`Questão ${answer.questionId} não encontrada`)
    scores[question.type] += answer.score
  }

  const maxScore = 75 // 15 × 5
  const percentages = {} as Record<EnneagramType, number>
  for (let t = 1; t <= 9; t++) {
    percentages[t as EnneagramType] = parseFloat((scores[t as EnneagramType] / maxScore).toFixed(4))
  }

  const sorted = (Object.entries(scores) as [string, number][])
    .sort(([, a], [, b]) => b - a)
  const predominant = parseInt(sorted[0][0]) as EnneagramType
  const secondary = parseInt(sorted[1][0]) as EnneagramType

  const interpretation = {} as Record<EnneagramType, string>
  for (let t = 1; t <= 9; t++) {
    const s = scores[t as EnneagramType]
    if (s <= 30)      interpretation[t as EnneagramType] = 'Provavelmente não pertence a este tipo'
    else if (s <= 45) interpretation[t as EnneagramType] = 'Tem problemas em comum com este tipo'
    else if (s <= 60) interpretation[t as EnneagramType] = 'Tem algum componente deste tipo'
    else              interpretation[t as EnneagramType] = 'Muito provavelmente pertence a este tipo'
  }

  return { scores, percentages, predominant, secondary, interpretation, report: ENNEAGRAM_TYPES[predominant] }
}

// ============================================================
// VARIAÇÃO V2 — Reformulações alternativas (mesmos id/type)
// ============================================================
export const ENNEAGRAM_QUESTIONS_V2: EnneagramQuestion[] = [
  // TIPO 1 — PERFECCIONISTA
  { id: 1,  localId: 1,  type: 1, text: 'As pessoas ao meu redor geralmente me descrevem como alguém criterioso e confiável, e eu concordo com essa visão.' },
  { id: 2,  localId: 2,  type: 1, text: 'Tenho um compromisso profundo com a verdade e com a integridade, mesmo quando isso me custa algo.' },
  { id: 3,  localId: 3,  type: 1, text: 'Embora tenha impulsos mais espontâneos de vez em quando, no geral mantenho um estilo controlado e disciplinado.' },
  { id: 4,  localId: 4,  type: 1, text: 'Existe uma voz interna constante que avalia e julga minhas ações — às vezes útil, às vezes exigente demais.' },
  { id: 5,  localId: 5,  type: 1, text: 'Já me cobrei excessivamente pela perfeição e reconheço que isso cobrou um preço da minha saúde ou bem-estar.' },
  { id: 6,  localId: 6,  type: 1, text: 'Aprecio momentos de leveza e humor, embora nem sempre me permita vivê-los plenamente.' },
  { id: 7,  localId: 7,  type: 1, text: 'Meus valores e ideais são o que me motiva a agir e dão propósito profundo à minha vida.' },
  { id: 8,  localId: 8,  type: 1, text: 'Fico genuinamente perturbado quando as pessoas relaxam padrões que, para mim, são básicos e inegociáveis.' },
  { id: 9,  localId: 9,  type: 1, text: 'Tendo a assumir mais responsabilidades do que o necessário porque confio mais no meu próprio rigor do que no dos outros.' },
  { id: 10, localId: 10, type: 1, text: 'Sinto que tenho algo importante a oferecer ao mundo e aspiro a uma contribuição que vá além do ordinário.' },
  { id: 11, localId: 11, type: 1, text: 'Sou rigoroso comigo mesmo e com os processos porque acredito que a qualidade do trabalho reflete o caráter de quem o faz.' },
  { id: 12, localId: 12, type: 1, text: 'Para mim, a ética não é negociável — há comportamentos que simplesmente estão dentro ou fora dos limites aceitáveis.' },
  { id: 13, localId: 13, type: 1, text: 'Tenho dificuldade em aceitar o status quo quando enxergo claramente uma maneira melhor de fazer as coisas.' },
  { id: 14, localId: 14, type: 1, text: 'Carrego um peso considerável de responsabilidades e às vezes me pergunto o que aconteceria se eu diminuísse o ritmo.' },
  { id: 15, localId: 15, type: 1, text: 'Admiro profundamente quem mantém dignidade e compostura mesmo nas situações mais difíceis.' },

  // TIPO 2 — AJUDADORA
  { id: 16, localId: 1,  type: 2, text: 'Tenho um interesse genuíno nas histórias e nas vidas das pessoas, o que me leva a criar laços profundos com facilidade.' },
  { id: 17, localId: 2,  type: 2, text: 'Me relaciono bem com pessoas de perfis muito diferentes — criar conexão parece algo natural para mim.' },
  { id: 18, localId: 3,  type: 2, text: 'Percebo que quando ofereço atenção e apoio sinceros, as pessoas respondem com afeto e se abrem mais.' },
  { id: 19, localId: 4,  type: 2, text: 'Tenho grande dificuldade em ver alguém sofrendo sem querer fazer algo imediatamente para ajudar.' },
  { id: 20, localId: 5,  type: 2, text: 'Cuidar das pessoas e ser generoso faz parte da minha identidade — é algo que me define.' },
  { id: 21, localId: 6,  type: 2, text: 'Não costumo dizer abertamente que faço muito pelos outros, mas fico magoado quando isso não é percebido.' },
  { id: 22, localId: 7,  type: 2, text: 'Com frequência me dedico demais às necessidades alheias e negligencio as minhas próprias.' },
  { id: 23, localId: 8,  type: 2, text: 'Sinto um impulso de conquistar pessoas que, de início, parecem distantes ou indiferentes a mim.' },
  { id: 24, localId: 9,  type: 2, text: 'Gosto de receber, hospedar e criar situações onde as pessoas se sintam acolhidas e especiais.' },
  { id: 25, localId: 10, type: 2, text: 'Sou mais forte e resiliente do que minha aparência afetuosa sugere.' },
  { id: 26, localId: 11, type: 2, text: 'Consigo expressar afeto e sentimentos com maior facilidade do que a maioria das pessoas que conheço.' },
  { id: 27, localId: 12, type: 2, text: 'Quando estou preocupado com alguém, faço questão de verificar como essa pessoa está, mesmo que precise me esforçar para isso.' },
  { id: 28, localId: 13, type: 2, text: 'Me vejo como alguém que acolhe as dores e as feridas das pessoas e tenta ajudar na cura.' },
  { id: 29, localId: 14, type: 2, text: 'Já sacrifiquei minha saúde, tempo ou recursos financeiros por colocar as necessidades dos outros acima das minhas.' },
  { id: 30, localId: 15, type: 2, text: 'Encontro grande satisfação em criar momentos onde as pessoas se sintam bem-vindas e valorizadas.' },

  // TIPO 3 — REALIZADORA
  { id: 31, localId: 1,  type: 3, text: 'Tenho um padrão de exigência alto comigo mesmo e fico visivelmente incomodado quando entrego menos do que meu melhor.' },
  { id: 32, localId: 2,  type: 3, text: 'Quando estou em estado de fluxo, tenho uma energia e uma presença que as pessoas ao redor conseguem sentir.' },
  { id: 33, localId: 3,  type: 3, text: 'Cuido da minha imagem e de como sou percebido — mas acredito que todos, de alguma forma, fazem isso.' },
  { id: 34, localId: 4,  type: 3, text: 'Tenho uma relação complexa com minhas emoções: elas surgem com intensidade, mas logo as coloco de lado para focar no que precisa ser feito.' },
  { id: 35, localId: 5,  type: 3, text: 'Conquistas e reconhecimento são importantes para mim — mesmo que eu ainda não tenha chegado onde quero.' },
  { id: 36, localId: 6,  type: 3, text: 'Tenho uma habilidade apurada de esconder vulnerabilidades — as pessoas raramente conseguem ver o que estou sentindo por dentro.' },
  { id: 37, localId: 7,  type: 3, text: 'Me preocupo com as impressões que causo e costumo investir em ser percebido de forma positiva.' },
  { id: 38, localId: 8,  type: 3, text: 'É natural para mim observar o desempenho das pessoas ao meu redor e me comparar com elas.' },
  { id: 39, localId: 9,  type: 3, text: 'Tenho a tendência de só investir naquilo onde posso me destacar — quando o sucesso parece improvável, perco o interesse.' },
  { id: 40, localId: 10, type: 3, text: 'Já me vi simplificando ou ajustando a verdade quando isso facilitava alcançar um objetivo importante.' },
  { id: 41, localId: 11, type: 3, text: 'Quando me sinto ameaçado ou vulnerável, me afasto das pessoas e me torno mais frio e distante.' },
  { id: 42, localId: 12, type: 3, text: 'Me incomoda profundamente quando meu trabalho é ignorado ou não reconhecido por quem deveria notá-lo.' },
  { id: 43, localId: 13, type: 3, text: 'Tenho uma capacidade natural de me reinventar e ajustar minha abordagem quando algo não está funcionando.' },
  { id: 44, localId: 14, type: 3, text: 'Tenho sempre algum projeto ou meta em andamento e sei como me motivar para avançar neles.' },
  { id: 45, localId: 15, type: 3, text: 'Me importo profundamente com a imagem que deixo — quero que as pessoas me lembrem com admiração.' },

  // TIPO 4 — INDIVIDUALISTA
  { id: 46, localId: 1,  type: 4, text: 'Tenho uma sensação constante de que algo fundamental está faltando em minha vida, embora não saiba ao certo o quê.' },
  { id: 47, localId: 2,  type: 4, text: 'Preciso expressar minha individualidade e não consigo me sentir bem fingindo ser outra coisa que não sou.' },
  { id: 48, localId: 3,  type: 4, text: 'Tenho sentimentos muito intensos — tanto a alegria quanto a dor me afetam de forma profunda e duradoura.' },
  { id: 49, localId: 4,  type: 4, text: 'Me sinto mais vivo e autêntico quando estou engajado em algo criativo ou em experiências de grande significado pessoal.' },
  { id: 50, localId: 5,  type: 4, text: 'Muitas vezes me sinto diferente dos outros de uma forma que é difícil de explicar.' },
  { id: 51, localId: 6,  type: 4, text: 'Não me interessa o superficial — quero relações, experiências e conversas que tenham profundidade real.' },
  { id: 52, localId: 7,  type: 4, text: 'Alimento um senso estético refinado e me preocupo com a beleza e o significado nas coisas que faço e escolho.' },
  { id: 53, localId: 8,  type: 4, text: 'Sinto uma melancolia de fundo que, ao mesmo tempo, me parece um sinal de que sou alguém com profundidade.' },
  { id: 54, localId: 9,  type: 4, text: 'Fico perturbado quando as pessoas não conseguem captar as nuances do que estou sentindo ou comunicando.' },
  { id: 55, localId: 10, type: 4, text: 'Tenho uma relação tensa com a inveja — quando vejo alguém ter o que sinto que me falta, sinto uma dor real.' },
  { id: 56, localId: 11, type: 4, text: 'Preciso ter um senso de identidade e autenticidade muito claros para me sentir estável.' },
  { id: 57, localId: 12, type: 4, text: 'Minha vida interior é rica e complexa — muita coisa que me afeta não é visível ao mundo externo.' },
  { id: 58, localId: 13, type: 4, text: 'Quando alguém compreende o que realmente estou sentindo, experimento um alívio e uma conexão profundas.' },
  { id: 59, localId: 14, type: 4, text: 'Tenho dificuldade em me sentir bem no dia a dia comum — parece que algo especial ou significativo sempre está faltando.' },
  { id: 60, localId: 15, type: 4, text: 'Tenho a impressão de que fui feito para algo singular — uma missão ou expressão que poucos entenderiam.' },

  // TIPO 5 — INVESTIGADORA
  { id: 61, localId: 1,  type: 5, text: 'Preciso entender o mundo de forma aprofundada antes de me sentir confortável para agir ou opinar.' },
  { id: 62, localId: 2,  type: 5, text: 'Meu espaço pessoal e meu tempo de solitude não são negociáveis — são essenciais para o meu funcionamento.' },
  { id: 63, localId: 3,  type: 5, text: 'Prefiro ter menos e manter minha independência do que depender dos outros para cobrir minhas necessidades.' },
  { id: 64, localId: 4,  type: 5, text: 'A tendência de me retirar em situações emocionalmente intensas é algo que reconheço em mim.' },
  { id: 65, localId: 5,  type: 5, text: 'Me sinto muito mais à vontade analisando e compreendendo do que sentindo e expressando emoções.' },
  { id: 66, localId: 6,  type: 5, text: 'Quando me aprofundo num assunto, posso facilmente me tornar a pessoa mais bem informada do ambiente sobre ele.' },
  { id: 67, localId: 7,  type: 5, text: 'Observo as pessoas e os ambientes com atenção antes de participar mais ativamente.' },
  { id: 68, localId: 8,  type: 5, text: 'Tenho poucos vínculos próximos, mas os que tenho são intensos e genuinamente importantes para mim.' },
  { id: 69, localId: 9,  type: 5, text: 'Confio muito mais na minha própria análise do que na opinião das massas ou na sabedoria convencional.' },
  { id: 70, localId: 10, type: 5, text: 'Posso passar horas mergulhado num assunto de meu interesse sem precisar de companhia ou validação.' },
  { id: 71, localId: 11, type: 5, text: 'Tenho uma tendência de guardar minhas opiniões para mim até ter certeza de que estou preparado para defendê-las.' },
  { id: 72, localId: 12, type: 5, text: 'Lidar com emoções alheias que são intensas ou exigentes me drena de uma forma que muitos não compreendem.' },
  { id: 73, localId: 13, type: 5, text: 'Prefiro prever e planejar mentalmente cada cenário possível antes de me comprometer com uma ação.' },
  { id: 74, localId: 14, type: 5, text: 'Tenho um certo orgulho em ser alguém que pensa por si mesmo e não segue modas ou tendências.' },
  { id: 75, localId: 15, type: 5, text: 'Quando sinto que uma situação social está me consumindo energia, me retiro discretamente sem muita explicação.' },

  // TIPO 6 — LEAL
  { id: 76, localId: 1,  type: 6, text: 'Estou sempre avaliando os possíveis riscos e problemas antes de tomar uma decisão importante.' },
  { id: 77, localId: 2,  type: 6, text: 'Minha lealdade a grupos e pessoas em quem confio é sólida e difícil de abalar.' },
  { id: 78, localId: 3,  type: 6, text: 'Confiar em alguém completamente é algo que levo tempo para fazer — preciso de provas concretas antes.' },
  { id: 79, localId: 4,  type: 6, text: 'Tenho uma capacidade de identificar intenções ocultas ou armadilhas que a maioria das pessoas não percebe.' },
  { id: 80, localId: 5,  type: 6, text: 'Ao mesmo tempo que questiono autoridades, também sinto um impulso de buscar orientação de quem é mais experiente.' },
  { id: 81, localId: 6,  type: 6, text: 'Quando me comprometo com algo ou com alguém, honro esse compromisso com muita seriedade.' },
  { id: 82, localId: 7,  type: 6, text: 'Sinto ansiedade quando as situações ficam incertas ou quando não tenho clareza sobre o que esperar.' },
  { id: 83, localId: 8,  type: 6, text: 'Para mim, segurança e previsibilidade não são luxos — são necessidades reais.' },
  { id: 84, localId: 9,  type: 6, text: 'Tendo a colocar em questão motivações das pessoas, especialmente quando elas parecem boas demais.' },
  { id: 85, localId: 10, type: 6, text: 'Quando preciso enfrentar o medo de frente, sou capaz de uma coragem que surpreende até a mim mesmo.' },
  { id: 86, localId: 11, type: 6, text: 'Me identifico com grupos e sistemas que compartilham meus valores e oferecem senso de pertencimento.' },
  { id: 87, localId: 12, type: 6, text: 'Quando os outros me dizem para não me preocupar, raramente consigo simplesmente desligar a preocupação.' },
  { id: 88, localId: 13, type: 6, text: 'Tenho um olhar crítico natural que identifica falhas em planos, argumentos e estruturas.' },
  { id: 89, localId: 14, type: 6, text: 'Questiono autoridades quando percebo que podem estar erradas, mas também valorizo a orientação de pessoas confiáveis.' },
  { id: 90, localId: 15, type: 6, text: 'Quando sinto que algo pode dar errado, fico em estado de alerta mesmo que os outros pareçam tranquilos.' },

  // TIPO 7 — ENTUSIASTA
  { id: 91,  localId: 1,  type: 7, text: 'Tenho uma sede constante por novas experiências, ideias e horizontes — a monotonia me pesa muito.' },
  { id: 92,  localId: 2,  type: 7, text: 'Sou capaz de fazer conexões entre ideias e áreas que parecem não ter relação, o que me gera grande entusiasmo.' },
  { id: 93,  localId: 3,  type: 7, text: 'Me animo facilmente com novas possibilidades e começos, mas nem sempre mantenho o mesmo entusiasmo no longo prazo.' },
  { id: 94,  localId: 4,  type: 7, text: 'A ideia de ficar preso ou aprisionado — em uma rotina, em uma obrigação ou em uma situação — me é quase insuportável.' },
  { id: 95,  localId: 5,  type: 7, text: 'Consigo reinterpretar experiências difíceis de forma mais positiva quase instintivamente.' },
  { id: 96,  localId: 6,  type: 7, text: 'Minha agenda tende a ficar superlotada porque tenho dificuldade de dizer não para oportunidades interessantes.' },
  { id: 97,  localId: 7,  type: 7, text: 'Quando algo começa a ficar entediante ou repetitivo, minha atenção naturalmente migra para outra coisa.' },
  { id: 98,  localId: 8,  type: 7, text: 'Sou naturalmente otimista — mesmo em situações difíceis, consigo enxergar o que pode ser positivo.' },
  { id: 99,  localId: 9,  type: 7, text: 'Tenho muitos projetos e interesses em paralelo e às vezes me vejo dispersando minha energia entre eles.' },
  { id: 100, localId: 10, type: 7, text: 'O futuro me empolga muito mais do que o passado — estou sempre pensando no que vem a seguir.' },
  { id: 101, localId: 11, type: 7, text: 'Não me sinto bem quando estou confinado a uma única opção ou direção — preciso de alternativas abertas.' },
  { id: 102, localId: 12, type: 7, text: 'Quando me sinto sobrecarregado emocionalmente, busco distração em atividades prazerosas ou estimulantes.' },
  { id: 103, localId: 13, type: 7, text: 'Tenho um talento natural para tornar situações pesadas mais leves e para animar os ambientes onde estou.' },
  { id: 104, localId: 14, type: 7, text: 'Fico facilmente entusiasmado com novos projetos, mas o desafio está em manter o foco quando a novidade passa.' },
  { id: 105, localId: 15, type: 7, text: 'Para mim, a vida é uma aventura e desperdiçá-la em sofrimento desnecessário seria uma tragédia.' },

  // TIPO 8 — CONTROLADORA
  { id: 106, localId: 1,  type: 8, text: 'Valorizo minha independência acima de quase tudo — não gostar de depender dos outros é algo que me define.' },
  { id: 107, localId: 2,  type: 8, text: 'Acredito que resultados importantes raramente vêm sem alguma fricção ou desconforto no processo.' },
  { id: 108, localId: 3,  type: 8, text: 'Quando me importo com alguém, sinto uma responsabilidade natural de protegê-lo e de estar no seu lado.' },
  { id: 109, localId: 4,  type: 8, text: 'Sei com clareza como motivar, pressionar ou recompensar pessoas para que entreguem o que precisa ser feito.' },
  { id: 110, localId: 5,  type: 8, text: 'Tenho pouca paciência com pessoas que demonstram fraqueza diante de desafios que exigem firmeza.' },
  { id: 111, localId: 6,  type: 8, text: 'Uma vez que decido algo, vou até o final — recuar me parece quase impossível.' },
  { id: 112, localId: 7,  type: 8, text: 'Nada me dá mais satisfação do que ver alguém que apoiei crescer e conquistar sua própria independência.' },
  { id: 113, localId: 8,  type: 8, text: 'Tenho um lado sensível e protetor que pouquíssimas pessoas chegam a ver.' },
  { id: 114, localId: 9,  type: 8, text: 'Aprecia quando as pessoas me dizem diretamente o que pensam — a honestidade brutal me respeita mais do que a diplomacia vazia.' },
  { id: 115, localId: 10, type: 8, text: 'Batalhar por algo difícil me fortalece — sem desafios reais, me sinto estagnado.' },
  { id: 116, localId: 11, type: 8, text: 'Me vejo como alguém que confronta a realidade de frente e não permite que as pessoas se acomodem.' },
  { id: 117, localId: 12, type: 8, text: 'Meu humor é direto e sem rodeios, e nem sempre as pessoas mais sensíveis conseguem apreciar isso.' },
  { id: 118, localId: 13, type: 8, text: 'Quando explodo de raiva, passa rapidamente — guardo rancor por muito pouco tempo.' },
  { id: 119, localId: 14, type: 8, text: 'Sinto-me mais vivo quando estou superando limites e desafiando o que parece impossível.' },
  { id: 120, localId: 15, type: 8, text: 'Prefiro ser quem tem controle sobre a situação do que estar à mercê das decisões dos outros.' },

  // TIPO 9 — PACIFICADORA
  { id: 121, localId: 1,  type: 9, text: 'As pessoas buscam minha companhia em parte porque transmito uma sensação de calma e estabilidade.' },
  { id: 122, localId: 2,  type: 9, text: 'Não tenho muita preferência entre estar rodeado de pessoas ou em solitude — ambas as situações me parecem confortáveis.' },
  { id: 123, localId: 3,  type: 9, text: 'Alcancei um equilíbrio satisfatório na vida e não sinto necessidade de agitá-lo com mudanças desnecessárias.' },
  { id: 124, localId: 4,  type: 9, text: 'Estar confortável — no corpo, na casa, nas relações — é algo que valorizo profundamente.' },
  { id: 125, localId: 5,  type: 9, text: 'Evito confrontos porque, na maioria das vezes, o custo do conflito parece maior do que o benefício de ganhar a discussão.' },
  { id: 126, localId: 6,  type: 9, text: 'Desenvolvi uma habilidade de não deixar que as coisas externas perturbem meu equilíbrio interno.' },
  { id: 127, localId: 7,  type: 9, text: 'Não preciso de muita coisa para ser feliz — geralmente me satisfaço com o que a vida oferece.' },
  { id: 128, localId: 8,  type: 9, text: 'As pessoas às vezes me descrevem como distraído, mas a verdade é que processo as coisas de um jeito próprio e no meu tempo.' },
  { id: 129, localId: 9,  type: 9, text: 'Quando decido algo, costumo manter minha posição mesmo sob pressão — o que algumas pessoas interpretam como teimosia.' },
  { id: 130, localId: 10, type: 9, text: 'Mantenho uma estabilidade emocional que muitas pessoas ao meu redor não conseguem — sou afetado, mas raramente desestabilizado.' },
  { id: 131, localId: 11, type: 9, text: 'Acredito que há um ritmo natural nas coisas e que resistir a ele raramente resolve algo.' },
  { id: 132, localId: 12, type: 9, text: 'Tenho facilidade de ver o lado de todos numa discussão, o que me torna um bom mediador — mas às vezes dificulta tomar partido.' },
  { id: 133, localId: 13, type: 9, text: 'Prefiro focar no que funciona e no que é positivo do que ficar ressaltando problemas e falhas.' },
  { id: 134, localId: 14, type: 9, text: 'Tenho uma sabedoria de vida acumulada que me ampara especialmente nos momentos mais difíceis.' },
  { id: 135, localId: 15, type: 9, text: 'Trabalho com foco e consistência durante o dia, mas ao final sei me desligar completamente e descansar de verdade.' },
]

// ============================================================
// VARIAÇÃO V3 — Cenários situacionais (mesmos id/type)
// ============================================================
export const ENNEAGRAM_QUESTIONS_V3: EnneagramQuestion[] = [
  // TIPO 1 — PERFECCIONISTA
  { id: 1,  localId: 1,  type: 1, text: 'Quando termino um trabalho, minha primeira reação é verificar se ele poderia ter sido feito melhor.' },
  { id: 2,  localId: 2,  type: 1, text: 'Se descobrisse que um colega estava sendo desonesto, me sentiria no dever de agir, mesmo que fosse impopular.' },
  { id: 3,  localId: 3,  type: 1, text: 'Em situações de estresse, minha tendência é manter o controle e seguir os procedimentos corretos.' },
  { id: 4,  localId: 4,  type: 1, text: 'Quando cometo um erro, fico com isso na cabeça por muito mais tempo do que a maioria das pessoas.' },
  { id: 5,  localId: 5,  type: 1, text: 'Já adiou ou evitou algo importante porque temia não conseguir atingir o padrão que esperava de si mesmo.' },
  { id: 6,  localId: 6,  type: 1, text: 'Percebo que muitas vezes preciso me lembrar ativamente de relaxar e aproveitar os momentos descontraídos.' },
  { id: 7,  localId: 7,  type: 1, text: 'Quando age contra seus valores, sente um desconforto interno intenso que não some até que corrija o caminho.' },
  { id: 8,  localId: 8,  type: 1, text: 'Quando vejo alguém fazendo algo de forma errada ou descuidada, sente um impulso quase físico de intervir.' },
  { id: 9,  localId: 9,  type: 1, text: 'Prefere fazer sozinho do que delegar, porque tem dificuldade de confiar que os outros farão com o mesmo cuidado.' },
  { id: 10, localId: 10, type: 1, text: 'Sente que seu trabalho tem um propósito maior e que isso o distingue de pessoas que simplesmente cumprem tarefas.' },
  { id: 11, localId: 11, type: 1, text: 'Quando algo sai abaixo do padrão esperado, sente vergonha ou frustração mesmo que os outros não notem.' },
  { id: 12, localId: 12, type: 1, text: 'Situações moralmente ambíguas te causam desconforto — você precisa de clareza sobre o que é certo.' },
  { id: 13, localId: 13, type: 1, text: 'Quando vê uma forma melhor de fazer algo, tem dificuldade de simplesmente deixar passar sem ao menos mencionar.' },
  { id: 14, localId: 14, type: 1, text: 'Com frequência sente que, se você parar ou diminuir o ritmo, as coisas simplesmente não serão feitas corretamente.' },
  { id: 15, localId: 15, type: 1, text: 'Se admira por pessoas que mantêm sua integridade e postura mesmo quando estão sob grande pressão.' },

  // TIPO 2 — AJUDADORA
  { id: 16, localId: 1,  type: 2, text: 'Quando alguém está passando por algo difícil, você tende a ser uma das primeiras pessoas que ele procura.' },
  { id: 17, localId: 2,  type: 2, text: 'Em uma festa com pessoas desconhecidas, você geralmente é quem inicia conversas e cria conexões.' },
  { id: 18, localId: 3,  type: 2, text: 'Quando você ajuda alguém e essa pessoa demonstra gratidão, sente um prazer genuíno e profundo.' },
  { id: 19, localId: 4,  type: 2, text: 'Ao ver notícias de sofrimento — em qualquer escala — sente uma necessidade quase física de fazer algo.' },
  { id: 20, localId: 5,  type: 2, text: 'Parte de como você se descreve envolve ser uma pessoa generosa e presente para os outros.' },
  { id: 21, localId: 6,  type: 2, text: 'Quando você faz muito por alguém e ele não percebe ou não demonstra, sente uma dor silenciosa.' },
  { id: 22, localId: 7,  type: 2, text: 'Já se viu tão focado nas necessidades dos outros que só percebeu o quanto estava esgotado quando foi longe demais.' },
  { id: 23, localId: 8,  type: 2, text: 'Quando alguém parece frio ou distante com você, sente um impulso de fazer mais para conquistar essa pessoa.' },
  { id: 24, localId: 9,  type: 2, text: 'Organizar um jantar, uma comemoração ou qualquer reunião onde as pessoas se sintam bem é algo que lhe dá grande prazer.' },
  { id: 25, localId: 10, type: 2, text: 'Quando confrontado ou criticado, demonstra uma resiliência que as pessoas não esperavam de alguém tão gentil.' },
  { id: 26, localId: 11, type: 2, text: 'Consegue dizer "eu te amo", "estou com você" ou "pode contar comigo" com uma naturalidade que muitos invejam.' },
  { id: 27, localId: 12, type: 2, text: 'Quando não tem notícias de alguém que estava em dificuldades, fica inquieto até verificar como essa pessoa está.' },
  { id: 28, localId: 13, type: 2, text: 'Você tende a ser a pessoa que as outras procuram quando precisam se sentir ouvidas, compreendidas e acolhidas.' },
  { id: 29, localId: 14, type: 2, text: 'Olhando para trás, percebe momentos em que sacrificou seu próprio bem-estar para não decepcionar alguém importante.' },
  { id: 30, localId: 15, type: 2, text: 'Quando as pessoas saem de uma conversa com você se sentindo melhor, isso representa uma das suas maiores satisfações.' },

  // TIPO 3 — REALIZADORA
  { id: 31, localId: 1,  type: 3, text: 'Em qualquer projeto ou função, você naturalmente assume um padrão de excelência que nem sempre é pedido.' },
  { id: 32, localId: 2,  type: 3, text: 'Quando está em fluxo e as coisas funcionando, as pessoas ao seu redor sentem sua energia e confiança.' },
  { id: 33, localId: 3,  type: 3, text: 'Você pensa em como está sendo percebido em situações profissionais importantes — e isso influencia suas escolhas.' },
  { id: 34, localId: 4,  type: 3, text: 'Em situações de alta pressão, você coloca suas emoções de lado e foca no que precisa ser feito.' },
  { id: 35, localId: 5,  type: 3, text: 'Metas e conquistas são parte central de como você mede o valor da sua vida e da sua carreira.' },
  { id: 36, localId: 6,  type: 3, text: 'Há uma habilidade que tem de não deixar que sua vulnerabilidade apareça em momentos onde precisa parecer forte.' },
  { id: 37, localId: 7,  type: 3, text: 'Antes de uma reunião ou apresentação importante, você se prepara para fazer uma boa impressão.' },
  { id: 38, localId: 8,  type: 3, text: 'Você tende a se comparar com pessoas ao seu redor e fica motivado quando percebe que está à frente.' },
  { id: 39, localId: 9,  type: 3, text: 'Quando percebe que não vai se destacar numa área, perde interesse e redireciona energia para algo onde possa brilhar.' },
  { id: 40, localId: 10, type: 3, text: 'Já usou uma versão ajustada ou simplificada da verdade para atingir um objetivo que considerava importante.' },
  { id: 41, localId: 11, type: 3, text: 'Quando se sente ameaçado ou vulnerável, você se afasta e cria uma barreira emocional.' },
  { id: 42, localId: 12, type: 3, text: 'Quando um trabalho seu de alta qualidade é ignorado, sente uma frustração genuína.' },
  { id: 43, localId: 13, type: 3, text: 'Diante de obstáculos, você encontra formas alternativas de chegar ao mesmo resultado.' },
  { id: 44, localId: 14, type: 3, text: 'Você sempre tem alguma meta em andamento e sabe como se motivar quando sente que está estagnado.' },
  { id: 45, localId: 15, type: 3, text: 'A ideia de ser lembrado como alguém bem-sucedido e admirado é importante para você.' },

  // TIPO 4 — INDIVIDUALISTA
  { id: 46, localId: 1,  type: 4, text: 'Em momentos de calma, frequentemente surge um senso de que algo importante ainda está faltando na sua vida.' },
  { id: 47, localId: 2,  type: 4, text: 'Quando te pedem para agir de um jeito que não se sente autêntico, sente um desconforto visceral.' },
  { id: 48, localId: 3,  type: 4, text: 'Você experimenta alegrias e tristezas com uma intensidade que nem sempre as pessoas ao seu redor entendem.' },
  { id: 49, localId: 4,  type: 4, text: 'Quando está num projeto criativo ou vivendo uma experiência de grande significado pessoal, sente que está mais vivo.' },
  { id: 50, localId: 5,  type: 4, text: 'Você frequentemente se sente diferente das outras pessoas, como se pertencesse a uma categoria própria.' },
  { id: 51, localId: 6,  type: 4, text: 'Em conversas superficiais ou relacionamentos vazios, sente um tédio e uma insatisfação profundos.' },
  { id: 52, localId: 7,  type: 4, text: 'Tem cuidado especial com a estética do seu espaço, do seu trabalho e da forma como se apresenta.' },
  { id: 53, localId: 8,  type: 4, text: 'Você tem uma melancolia habitual que paradoxalmente lhe parece um sinal de profundidade.' },
  { id: 54, localId: 9,  type: 4, text: 'Sente frustração quando as pessoas não conseguem captar a profundidade do que você está tentando comunicar.' },
  { id: 55, localId: 10, type: 4, text: 'Quando vê alguém tendo algo que você sente que lhe falta, experimenta uma dor genuína.' },
  { id: 56, localId: 11, type: 4, text: 'Saber quem você realmente é — sua identidade — é uma das suas prioridades mais profundas.' },
  { id: 57, localId: 12, type: 4, text: 'Existe toda uma vida interior complexa em você que o mundo externo raramente consegue ver.' },
  { id: 58, localId: 13, type: 4, text: 'Quando alguém realmente entende o que você sente, experimenta um alívio e uma conexão raros.' },
  { id: 59, localId: 14, type: 4, text: 'A rotina comum do dia a dia raramente lhe parece suficiente — você anseia por algo mais especial.' },
  { id: 60, localId: 15, type: 4, text: 'Você sente que tem uma história, uma visão ou uma expressão singular que poucas pessoas chegariam a compreender.' },

  // TIPO 5 — INVESTIGADORA
  { id: 61, localId: 1,  type: 5, text: 'Antes de opinar sobre algo importante, precisa ter estudado o tema com profundidade.' },
  { id: 62, localId: 2,  type: 5, text: 'Sem tempo e espaço para si mesmo regularmente, você se sente esgotado e irritado.' },
  { id: 63, localId: 3,  type: 5, text: 'Prefere ter uma vida mais simples e autônoma a ter muito, mas depender dos outros.' },
  { id: 64, localId: 4,  type: 5, text: 'Em situações de alta tensão emocional, seu instinto é se retirar e processar tudo internamente.' },
  { id: 65, localId: 5,  type: 5, text: 'Entender um fenômeno lhe satisfaz muito mais do que simplesmente senti-lo ou experimentá-lo.' },
  { id: 66, localId: 6,  type: 5, text: 'Quando decide estudar algo, vai fundo até se tornar uma referência no assunto.' },
  { id: 67, localId: 7,  type: 5, text: 'Em um ambiente novo, você tende a observar o contexto e as pessoas antes de participar ativamente.' },
  { id: 68, localId: 8,  type: 5, text: 'Você tem poucos amigos próximos, mas esses vínculos são muito significativos para você.' },
  { id: 69, localId: 9,  type: 5, text: 'Você prefere formar sua própria opinião com base em evidências a simplesmente adotar o que os outros dizem.' },
  { id: 70, localId: 10, type: 5, text: 'Quando tem um assunto favorito, pode se dedicar a ele por horas sem precisar de nenhuma distração.' },
  { id: 71, localId: 11, type: 5, text: 'Você tende a guardar suas posições para si até ter certeza de que pode sustentá-las com solidez.' },
  { id: 72, localId: 12, type: 5, text: 'Quando as pessoas trazem emoções intensas para o seu espaço, sente sua energia sendo consumida.' },
  { id: 73, localId: 13, type: 5, text: 'Antes de tomar uma decisão importante, percorre mentalmente vários cenários e possibilidades.' },
  { id: 74, localId: 14, type: 5, text: 'Há um certo orgulho em ser alguém que pensa de forma independente e não segue a corrente.' },
  { id: 75, localId: 15, type: 5, text: 'Em eventos sociais longos, você tende a se retirar antes que sua energia se esgote completamente.' },

  // TIPO 6 — LEAL
  { id: 76, localId: 1,  type: 6, text: 'Antes de tomar decisões importantes, você naturalmente pensa nos riscos e no que pode dar errado.' },
  { id: 77, localId: 2,  type: 6, text: 'Com pessoas em quem confia, você é capaz de um comprometimento e de uma lealdade raros.' },
  { id: 78, localId: 3,  type: 6, text: 'Você demora para confiar completamente em alguém — precisa de consistência ao longo do tempo.' },
  { id: 79, localId: 4,  type: 6, text: 'Você tem um olhar aguçado para identificar quando algo ou alguém não é o que parece.' },
  { id: 80, localId: 5,  type: 6, text: 'Questiona autoridades, mas também busca orientação de pessoas confiáveis em momentos de incerteza.' },
  { id: 81, localId: 6,  type: 6, text: 'Quando assume um compromisso com alguém, honra esse compromisso com muita seriedade.' },
  { id: 82, localId: 7,  type: 6, text: 'Em situações de incerteza, sente uma ansiedade crescente que só diminui quando a situação fica mais clara.' },
  { id: 83, localId: 8,  type: 6, text: 'Você precisa de um ambiente que seja previsível e confiável para funcionar bem.' },
  { id: 84, localId: 9,  type: 6, text: 'Quando algo ou alguém parece bom demais para ser verdade, você naturalmente desconfia.' },
  { id: 85, localId: 10, type: 6, text: 'Quando decide enfrentar seus medos de frente, demonstra um tipo de coragem que surpreende os outros.' },
  { id: 86, localId: 11, type: 6, text: 'Pertencer a um grupo com valores alinhados aos seus é algo que você valoriza profundamente.' },
  { id: 87, localId: 12, type: 6, text: 'Quando alguém lhe diz "não se preocupe", raramente isso basta para reduzir sua preocupação.' },
  { id: 88, localId: 13, type: 6, text: 'Você tem uma habilidade natural de identificar as falhas em um plano ou argumento antes dos outros.' },
  { id: 89, localId: 14, type: 6, text: 'Você questiona autoridades quando parece errado, mas ainda valoriza a orientação de quem considera sábio.' },
  { id: 90, localId: 15, type: 6, text: 'Quando sua intuição aponta que algo está errado, você fica alerta mesmo que os outros pareçam tranquilos.' },

  // TIPO 7 — ENTUSIASTA
  { id: 91,  localId: 1,  type: 7, text: 'Quando a rotina começa a se repetir por muito tempo, você sente uma inquietação e uma necessidade de mudança.' },
  { id: 92,  localId: 2,  type: 7, text: 'Você frequentemente percebe conexões entre ideias que parecem não ter relação — isso te empolga.' },
  { id: 93,  localId: 3,  type: 7, text: 'O início de um novo projeto ou fase sempre te energiza, mas manter o ritmo quando a novidade passa é um desafio.' },
  { id: 94,  localId: 4,  type: 7, text: 'A ideia de ficar preso — em uma situação, obrigação ou relacionamento difícil — te causa uma angústia real.' },
  { id: 95,  localId: 5,  type: 7, text: 'Você tem um talento para encontrar o ângulo positivo mesmo em situações que outros considerariam apenas difíceis.' },
  { id: 96,  localId: 6,  type: 7, text: 'Sua agenda tende a ficar superlotada porque você tem dificuldade de recusar oportunidades interessantes.' },
  { id: 97,  localId: 7,  type: 7, text: 'Quando algo começa a se tornar repetitivo, sua atenção naturalmente começa a migrar para outra coisa.' },
  { id: 98,  localId: 8,  type: 7, text: 'Mesmo em situações difíceis, você consegue enxergar o que pode dar certo e isso contagia quem está ao seu redor.' },
  { id: 99,  localId: 9,  type: 7, text: 'Você tem vários projetos e interesses em andamento ao mesmo tempo — o desafio é focar em um.' },
  { id: 100, localId: 10, type: 7, text: 'O futuro te entusiasma muito mais do que refletir sobre o passado ou permanecer no presente.' },
  { id: 101, localId: 11, type: 7, text: 'Você se sente melhor quando tem opções abertas do que quando está comprometido com um único caminho.' },
  { id: 102, localId: 12, type: 7, text: 'Quando fica sobrecarregado emocionalmente, você tende a buscar atividades prazerosas para se distrair.' },
  { id: 103, localId: 13, type: 7, text: 'Em situações tensas, você frequentemente traz leveza e humor que ajudam a aliviar o ambiente.' },
  { id: 104, localId: 14, type: 7, text: 'Você se anima facilmente com novas ideias — o desafio está em executar e sustentar quando a fase inicial passa.' },
  { id: 105, localId: 15, type: 7, text: 'Quando percebe que está desperdiçando tempo em algo sofrido e sem propósito, sente uma urgência de mudar.' },

  // TIPO 8 — CONTROLADORA
  { id: 106, localId: 1,  type: 8, text: 'Quando depende de outros para algo importante, sente uma certa vulnerabilidade que lhe é incômoda.' },
  { id: 107, localId: 2,  type: 8, text: 'Você acredita que conquistas verdadeiras raramente vêm sem alguma resistência ou dificuldade.' },
  { id: 108, localId: 3,  type: 8, text: 'Quando alguém passa a fazer parte do seu círculo próximo, sente uma responsabilidade real pela sua segurança.' },
  { id: 109, localId: 4,  type: 8, text: 'Você sabe exatamente como mobilizar ou pressionar pessoas para que façam o que precisa ser feito.' },
  { id: 110, localId: 5,  type: 8, text: 'Você não tem muita paciência com pessoas que recuam facilmente diante de desafios.' },
  { id: 111, localId: 6,  type: 8, text: 'Uma vez que se compromete com uma direção, é muito difícil para você simplesmente desistir.' },
  { id: 112, localId: 7,  type: 8, text: 'Uma das coisas que mais te dá satisfação é ver alguém que você apoiou conquistar a própria independência.' },
  { id: 113, localId: 8,  type: 8, text: 'Existe um lado seu protetor e sensível que você raramente mostra — é reservado para muito poucos.' },
  { id: 114, localId: 9,  type: 8, text: 'Prefere uma conversa direta e às vezes dura a uma comunicação cheia de rodeios e eufemismos.' },
  { id: 115, localId: 10, type: 8, text: 'Enfrentar e superar desafios difíceis te fortalece — sem isso, você tende a se sentir estagnado.' },
  { id: 116, localId: 11, type: 8, text: 'Você é o tipo de pessoa que confronta a realidade de frente e não deixa que outros se acomodem.' },
  { id: 117, localId: 12, type: 8, text: 'Seu estilo de comunicação é direto e pode parecer rude para pessoas mais delicadas.' },
  { id: 118, localId: 13, type: 8, text: 'Quando explode de raiva, o sentimento passa rapidamente — você não costuma guardar mágoa.' },
  { id: 119, localId: 14, type: 8, text: 'Você se sente mais vivo quando está superando limites e alcançando o que parecia impossível.' },
  { id: 120, localId: 15, type: 8, text: 'Você se sente mais seguro quando é você quem tem o controle — depender das decisões dos outros é desconfortável.' },

  // TIPO 9 — PACIFICADORA
  { id: 121, localId: 1,  type: 9, text: 'Em grupos tensos, sua presença naturalmente tende a acalmar o ambiente.' },
  { id: 122, localId: 2,  type: 9, text: 'Você funciona bem tanto em companhia quanto em solitude — sua paz interior não depende do contexto externo.' },
  { id: 123, localId: 3,  type: 9, text: 'Você encontrou um ritmo de vida que funciona bem e tende a protegê-lo de mudanças desnecessárias.' },
  { id: 124, localId: 4,  type: 9, text: 'Pequenos confortos — uma boa refeição, um ambiente agradável, um ritual simples — têm grande valor para você.' },
  { id: 125, localId: 5,  type: 9, text: 'Quando há um conflito, você tende a ceder ou encontrar um meio-termo em vez de insistir na sua posição.' },
  { id: 126, localId: 6,  type: 9, text: 'Você desenvolveu uma habilidade de não se perturbar com o que acontece ao seu redor.' },
  { id: 127, localId: 7,  type: 9, text: 'Você raramente sente que precisa de mais do que tem para estar satisfeito.' },
  { id: 128, localId: 8,  type: 9, text: 'As pessoas às vezes acham que você não está prestando atenção, quando na verdade está processando do seu jeito.' },
  { id: 129, localId: 9,  type: 9, text: 'Quando decide algo, você se mantém firme nessa posição mesmo quando pressionado a mudar.' },
  { id: 130, localId: 10, type: 9, text: 'Você consegue se manter estável emocionalmente em situações que desestabilizariam a maioria das pessoas.' },
  { id: 131, localId: 11, type: 9, text: 'Você tende a aceitar o curso natural das coisas em vez de tentar forçar resultados.' },
  { id: 132, localId: 12, type: 9, text: 'Em conflitos entre pessoas, você consegue ver o ponto de vista de cada lado com clareza.' },
  { id: 133, localId: 13, type: 9, text: 'Você naturalmente foca no que está funcionando em vez de amplificar o que está errado.' },
  { id: 134, localId: 14, type: 9, text: 'Você tem uma filosofia ou visão de vida que te ampara especialmente nos momentos mais difíceis.' },
  { id: 135, localId: 15, type: 9, text: 'Você consegue separar bem o tempo de trabalho do tempo de descanso — quando é para relaxar, você relaxa de verdade.' },
]

// ============================================================
// LOOKUP: versão → conjunto de questões
// ============================================================
export const ENNEAGRAM_QUESTION_SETS: Record<1 | 2 | 3, EnneagramQuestion[]> = {
  1: ENNEAGRAM_QUESTIONS,
  2: ENNEAGRAM_QUESTIONS_V2,
  3: ENNEAGRAM_QUESTIONS_V3,
}

/** Deriva a versão a partir do token UUID */
export function getEnneagramVersion(token: string): 1 | 2 | 3 {
  const sum = token.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)
  return ((sum % 3) + 1) as 1 | 2 | 3
}

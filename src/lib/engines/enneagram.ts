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

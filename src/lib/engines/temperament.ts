// ============================================================
// ENGINE — 4 Temperamentos
// ============================================================
// 25 questões, 4 opções por questão (A/C/I/O)
// Cada opção corresponde a um temperamento:
//   A = Colérico   | C = Sanguíneo
//   I = Melancólico | O = Fleumático
// Pontuação: soma simples — max 25 por temperamento
// Perfil predominante = maior pontuação
// ============================================================

export type TemperamentType = 'COLERICO' | 'SANGUINEO' | 'MELANCOLICO' | 'FLEUMATICO'
export type TemperamentOption = 'A' | 'C' | 'I' | 'O'

export interface TemperamentQuestion {
  id: number
  question: string
  options: Record<TemperamentOption, string>
}

export interface TemperamentAnswer {
  questionId: number
  selected: TemperamentOption
}

export interface TemperamentScores {
  COLERICO: number    // opção A
  SANGUINEO: number   // opção C
  MELANCOLICO: number // opção I
  FLEUMATICO: number  // opção O
}

export interface TemperamentProfile {
  type: TemperamentType
  name: string
  title: string
  description: string
  strengths: string[]
  challenges: string[]
  workStyle: string
  communication: string
  idealRoles: string[]
  color: string
}

export interface TemperamentResult {
  scores: TemperamentScores
  percentages: TemperamentScores
  primaryType: TemperamentType
  secondaryType: TemperamentType
  profile: TemperamentProfile
  secondaryProfile: TemperamentProfile
  interpretation: string
}

// ============================================================
// 25 QUESTÕES (extraídas da planilha oficial)
// ============================================================
export const TEMPERAMENT_QUESTIONS: TemperamentQuestion[] = [
  {
    id: 1,
    question: 'Eu sou...',
    options: {
      I: 'Idealista, criativo e visionário',
      C: 'Divertido, espiritual e benéfico',
      O: 'Confiável, meticuloso e previsível',
      A: 'Focado, determinado e persistente',
    },
  },
  {
    id: 2,
    question: 'Eu gosto de...',
    options: {
      A: 'Ser piloto',
      C: 'Conversar com os passageiros',
      O: 'Planejar a viagem',
      I: 'Explorar novas rotas',
    },
  },
  {
    id: 3,
    question: 'Se você quiser se dar bem comigo...',
    options: {
      I: 'Me dê liberdade',
      O: 'Me deixe saber sua expectativa',
      A: 'Lidere, siga ou saia do caminho',
      C: 'Seja amigável, carinhoso e compreensivo',
    },
  },
  {
    id: 4,
    question: 'Para conseguir obter bons resultados é preciso...',
    options: {
      I: 'Ter incertezas',
      O: 'Controlar o essencial',
      C: 'Diversão e celebração',
      A: 'Planejar e obter recursos',
    },
  },
  {
    id: 5,
    question: 'Eu me divirto quando...',
    options: {
      A: 'Estou me exercitando',
      I: 'Tenho novidades',
      C: 'Estou com outros',
      O: 'Determino as regras',
    },
  },
  {
    id: 6,
    question: 'Eu penso que...',
    options: {
      C: 'Unidos venceremos, divididos perderemos',
      A: 'O ataque é melhor que a defesa',
      I: 'É bom ser manso, mas andar com um porrete',
      O: 'Um homem prevenido vale por dois',
    },
  },
  {
    id: 7,
    question: 'Minha preocupação é...',
    options: {
      I: 'Gerar a ideia global',
      C: 'Fazer com que as pessoas gostem',
      O: 'Fazer com que funcione',
      A: 'Fazer com que aconteça',
    },
  },
  {
    id: 8,
    question: 'Eu prefiro...',
    options: {
      I: 'Perguntas a respostas',
      O: 'Ter todos os detalhes',
      A: 'Vantagens a meu favor',
      C: 'Que todos tenham a chance de ser ouvidos',
    },
  },
  {
    id: 9,
    question: 'Eu gosto de...',
    options: {
      A: 'Fazer progresso',
      C: 'Construir memórias',
      O: 'Fazer sentido',
      I: 'Tornar as pessoas confortáveis',
    },
  },
  {
    id: 10,
    question: 'Eu gosto de chegar...',
    options: {
      A: 'Na frente',
      C: 'Junto',
      O: 'Na hora',
      I: 'Em outro lugar',
    },
  },
  {
    id: 11,
    question: 'Um ótimo dia para mim é quando...',
    options: {
      A: 'Consigo fazer muitas coisas',
      C: 'Me divirto com meus amigos',
      O: 'Tudo segue conforme planejado',
      I: 'Desfruto de coisas novas e estimulantes',
    },
  },
  {
    id: 12,
    question: 'Eu vejo a morte como...',
    options: {
      I: 'Uma grande aventura misteriosa',
      C: 'Oportunidade para rever os falecidos',
      O: 'Um modo de receber recompensas',
      A: 'Algo que sempre chega muito cedo',
    },
  },
  {
    id: 13,
    question: 'Minha filosofia de vida é...',
    options: {
      A: 'Há ganhadores e perdedores, e eu acredito ser um ganhador',
      C: 'Para eu ganhar, ninguém precisa perder',
      O: 'Para ganhar é preciso seguir as regras',
      I: 'Para ganhar, é necessário inventar novas regras',
    },
  },
  {
    id: 14,
    question: 'Eu sempre gostei de...',
    options: {
      I: 'Explorar',
      O: 'Evitar surpresas',
      A: 'Focalizar a meta',
      C: 'Realizar uma abordagem natural',
    },
  },
  {
    id: 15,
    question: 'Eu gosto de mudanças se...',
    options: {
      A: 'Me der uma vantagem competitiva',
      C: 'For divertido e puder ser compartilhado',
      I: 'Me der mais liberdade e variedade',
      O: 'Melhorar ou me der mais controle',
    },
  },
  {
    id: 16,
    question: 'Não existe nada de errado em...',
    options: {
      A: 'Se colocar na frente',
      C: 'Colocar os outros na frente',
      I: 'Mudar de ideia',
      O: 'Ser consistente',
    },
  },
  {
    id: 17,
    question: 'Eu gosto de buscar conselhos de...',
    options: {
      A: 'Pessoas bem sucedidas',
      C: 'Anciões e conselheiros',
      O: 'Autoridades no assunto',
      I: 'Lugares, os mais estranhos',
    },
  },
  {
    id: 18,
    question: 'Meu lema é...',
    options: {
      I: 'Fazer o que precisa ser feito',
      O: 'Fazer bem feito',
      C: 'Fazer junto com o grupo',
      A: 'Simplesmente fazer',
    },
  },
  {
    id: 19,
    question: 'Eu gosto de...',
    options: {
      I: 'Complexidade, mesmo se confuso',
      O: 'Ordem e sistematização',
      C: 'Calor humano e animação',
      A: 'Coisas claras e simples',
    },
  },
  {
    id: 20,
    question: 'Tempo para mim é...',
    options: {
      A: 'Algo que detesto desperdiçar',
      C: 'Um grande ciclo',
      O: 'Uma flecha que leva ao inevitável',
      I: 'Irrelevante',
    },
  },
  {
    id: 21,
    question: 'Se eu fosse bilionário...',
    options: {
      C: 'Faria doações para muitas entidades',
      O: 'Criaria uma poupança avantajada',
      I: 'Faria o que desse na cabeça',
      A: 'Exibiria bastante com algumas pessoas',
    },
  },
  {
    id: 22,
    question: 'Eu acredito que...',
    options: {
      A: 'O destino é mais importante que a jornada',
      C: 'A jornada é mais importante que o destino',
      O: 'Um centavo economizado é um centavo ganho',
      I: 'Bastam um navio e uma estrela para navegar',
    },
  },
  {
    id: 23,
    question: 'Eu acredito também que...',
    options: {
      A: 'Aquele que hesita está perdido',
      O: 'De grão em grão a galinha enche o papo',
      C: 'O que vai, volta',
      I: 'Um sorriso ou uma careta é o mesmo para quem é cego',
    },
  },
  {
    id: 24,
    question: 'Eu acredito ainda que...',
    options: {
      O: 'É melhor prudência do que arrependimento',
      I: 'A autoridade deve ser desafiada',
      A: 'Ganhar é fundamental',
      C: 'O coletivo é mais importante do que o individual',
    },
  },
  {
    id: 25,
    question: 'Eu penso que...',
    options: {
      I: 'Não é fácil ficar encurralado',
      O: 'É preferível olhar, antes de pular',
      C: 'Duas cabeças pensam melhor do que uma',
      A: 'Se você não tem condições de competir, não compita',
    },
  },
]

// ============================================================
// PERFIS DOS 4 TEMPERAMENTOS
// ============================================================
export const TEMPERAMENT_PROFILES: Record<TemperamentType, TemperamentProfile> = {
  COLERICO: {
    type: 'COLERICO',
    name: 'Colérico',
    title: 'O Líder Nato',
    description:
      'O Colérico é assertivo, decidido e orientado para resultados. Natural líder, enfrenta desafios de frente e toma decisões rápidas. É movido pela conquista e pelo poder de influenciar os resultados ao redor.',
    strengths: [
      'Liderança natural e capacidade de tomar decisões',
      'Determinação e perseverança diante de obstáculos',
      'Orientação para metas e resultados tangíveis',
      'Energia e proatividade constantes',
      'Habilidade de motivar equipes em situações de pressão',
    ],
    challenges: [
      'Impaciência com processos lentos ou pessoas indecisos',
      'Tendência ao autoritarismo e controle excessivo',
      'Dificuldade em delegar e confiar nos outros',
      'Baixa tolerância ao erro (próprio e alheio)',
      'Conflitos interpessoais pela postura dominante',
    ],
    workStyle: 'Prefere ambientes dinâmicos com autonomia e metas claras. Trabalha melhor liderando projetos e equipes.',
    communication: 'Comunicação direta, objetiva e assertiva. Aprecia feedback claro e sem rodeios.',
    idealRoles: ['Diretor', 'Gestor de Projetos', 'Empreendedor', 'Executivo de Vendas', 'Líder de Equipe'],
    color: '#ef4444',
  },

  SANGUINEO: {
    type: 'SANGUINEO',
    name: 'Sanguíneo',
    title: 'O Comunicador Inspirador',
    description:
      'O Sanguíneo é extrovertido, entusiástico e sociável. Conecta-se com facilidade com as pessoas e irradia otimismo. É movido pelas relações humanas e pela alegria de estar em grupo.',
    strengths: [
      'Habilidades sociais e capacidade de fazer conexões',
      'Entusiasmo contagiante e energia positiva',
      'Criatividade e espontaneidade em ideias',
      'Adaptabilidade rápida a novos ambientes',
      'Excelente comunicador e motivador de pessoas',
    ],
    challenges: [
      'Impulsividade e tomada de decisões precipitadas',
      'Dificuldade em manter foco e concluir tarefas',
      'Tendência à superficialidade em alguns relacionamentos',
      'Aversão a tarefas repetitivas e rotineiras',
      'Busca excessiva de aprovação dos outros',
    ],
    workStyle: 'Trabalha melhor em ambientes colaborativos, com variedade de atividades e interação constante.',
    communication: 'Comunicação calorosa, expressiva e animada. Prefere conversas pessoais e interação face a face.',
    idealRoles: ['Vendedor', 'Relações Públicas', 'Apresentador', 'Educador', 'Consultor de Pessoas'],
    color: '#f59e0b',
  },

  MELANCOLICO: {
    type: 'MELANCOLICO',
    name: 'Melancólico',
    title: 'O Analítico Perfeccionista',
    description:
      'O Melancólico é introspectivo, analítico e detalhista. Busca a excelência em tudo que faz e possui profundidade emocional e intelectual. É movido pela busca da perfeição e pelo desejo de fazer tudo com qualidade.',
    strengths: [
      'Atenção excepcional aos detalhes e precisão',
      'Capacidade analítica e pensamento crítico apurado',
      'Comprometimento com a qualidade e excelência',
      'Empatia profunda e sensibilidade aos sentimentos alheios',
      'Lealdade e confiabilidade em relacionamentos',
    ],
    challenges: [
      'Perfeccionismo excessivo que pode levar à procrastinação',
      'Autocrítica intensa e tendência ao pessimismo',
      'Sensibilidade exacerbada a críticas externas',
      'Tendência ao isolamento social',
      'Dificuldade em tomar decisões rápidas',
    ],
    workStyle: 'Prefere trabalhar de forma independente, com tempo para planejar e executar com cuidado e precisão.',
    communication: 'Comunicação cuidadosa, precisa e reflexiva. Prefere análise antes de falar e comunicação escrita.',
    idealRoles: ['Analista', 'Pesquisador', 'Contador', 'Engenheiro', 'Escritor', 'Designer'],
    color: '#8b5cf6',
  },

  FLEUMATICO: {
    type: 'FLEUMATICO',
    name: 'Fleumático',
    title: 'O Diplomata Estável',
    description:
      'O Fleumático é calmo, equilibrado e confiável. É o mediador natural dos grupos e possui estabilidade emocional inigualável. É movido pela paz, harmonia e pelo desejo de ser consistente.',
    strengths: [
      'Estabilidade emocional e calma em situações de pressão',
      'Habilidade natural de mediar conflitos',
      'Confiabilidade e constância no cumprimento de compromissos',
      'Paciência e capacidade de ouvir ativamente',
      'Lealdade e fidelidade em relacionamentos',
    ],
    challenges: [
      'Tendência à passividade e procrastinação',
      'Dificuldade em expressar emoções e necessidades',
      'Resistência a mudanças abruptas',
      'Falta de assertividade em situações que exigem posicionamento',
      'Dificuldade em tomar decisões rápidas sob pressão',
    ],
    workStyle: 'Trabalha bem em ambientes estáveis e previsíveis. Excelente em funções de suporte e mediação.',
    communication: 'Comunicação calma, diplomática e cuidadosa. Ouve mais do que fala e evita conflitos.',
    idealRoles: ['RH', 'Assistente Social', 'Mediador', 'Administrador', 'Psicólogo', 'Educador'],
    color: '#22c55e',
  },
}

// ============================================================
// QUESTÕES V2 — mesmas dimensões A/C/I/O, formulação alternativa
// ============================================================
export const TEMPERAMENT_QUESTIONS_V2: TemperamentQuestion[] = [
  {
    id: 1,
    question: 'Quando tenho um objetivo, eu...',
    options: {
      A: 'Vou direto ao alvo, sem desvios',
      C: 'Compartilho com outros e busco apoio',
      I: 'Imagino diferentes caminhos possíveis',
      O: 'Crio um plano detalhado antes de agir',
    },
  },
  {
    id: 2,
    question: 'Em situações de pressão, costumo...',
    options: {
      A: 'Aceitar o desafio e agir com força',
      C: 'Buscar o apoio e o ânimo do grupo',
      I: 'Me retirar para pensar com calma',
      O: 'Manter a rotina e não entrar em pânico',
    },
  },
  {
    id: 3,
    question: 'Minha maior força no trabalho em equipe é...',
    options: {
      A: 'Empurrar o grupo para frente',
      C: 'Motivar e animar todos ao redor',
      I: 'Trazer ideias e profundidade',
      O: 'Manter a estabilidade e o ritmo',
    },
  },
  {
    id: 4,
    question: 'Quando alguém discorda de mim, eu...',
    options: {
      A: 'Defendo minha posição com firmeza',
      C: 'Busco um acordo que agrade a todos',
      I: 'Reconsidero internamente se faz sentido',
      O: 'Cedo se isso mantiver a harmonia',
    },
  },
  {
    id: 5,
    question: 'Meu estilo de comunicação é...',
    options: {
      A: 'Direto, objetivo e sem rodeios',
      C: 'Animado, expressivo e afetuoso',
      I: 'Cuidadoso, reflexivo e profundo',
      O: 'Calmo, diplomático e ponderado',
    },
  },
  {
    id: 6,
    question: 'Prefiro trabalhar em projetos que...',
    options: {
      A: 'Me deem autonomia para liderar',
      C: 'Envolvam muita interação com pessoas',
      I: 'Exijam criatividade e investigação',
      O: 'Tenham etapas claras e previsíveis',
    },
  },
  {
    id: 7,
    question: 'Quando enfrento uma mudança inesperada...',
    options: {
      A: 'Me adapto rapidamente e sigo em frente',
      C: 'Encontro o lado positivo e animado',
      I: 'Preciso de tempo para processar',
      O: 'Prefiro que seja avisado com antecedência',
    },
  },
  {
    id: 8,
    question: 'Meu maior valor pessoal é...',
    options: {
      A: 'Conquistar resultados',
      C: 'Construir relacionamentos',
      I: 'Buscar a verdade e a beleza',
      O: 'Manter a paz e a ordem',
    },
  },
  {
    id: 9,
    question: 'Me sinto mais produtivo quando...',
    options: {
      A: 'Tenho metas claras e competição',
      C: 'Trabalho com outras pessoas',
      I: 'Tenho liberdade e quietude para criar',
      O: 'Sigo uma rotina bem estabelecida',
    },
  },
  {
    id: 10,
    question: 'Quando alguém precisa de ajuda, eu...',
    options: {
      A: 'Oriento com clareza sobre o que fazer',
      C: 'Estou presente emocionalmente e escuto',
      I: 'Reflito junto para encontrar a melhor solução',
      O: 'Ofereço suporte prático e consistente',
    },
  },
  {
    id: 11,
    question: 'Na tomada de decisões, valorizo mais...',
    options: {
      A: 'Velocidade e resultado',
      C: 'Consenso e bem-estar do grupo',
      I: 'Profundidade e análise',
      O: 'Segurança e precedência',
    },
  },
  {
    id: 12,
    question: 'Meu maior medo profissional é...',
    options: {
      A: 'Não alcançar minhas metas',
      C: 'Ser rejeitado ou ignorado pelas pessoas',
      I: 'Fazer algo medíocre ou superficial',
      O: 'Cometer um erro grave ou imprevisível',
    },
  },
  {
    id: 13,
    question: 'Aprendo melhor quando...',
    options: {
      A: 'Recebo um desafio concreto para resolver',
      C: 'Aprendo com outros em grupo',
      I: 'Tenho tempo para explorar e questionar',
      O: 'Sigo um material bem estruturado',
    },
  },
  {
    id: 14,
    question: 'Na liderança, tendo a ser...',
    options: {
      A: 'Diretivo e orientado para resultados',
      C: 'Inspirador e centrado nas pessoas',
      I: 'Visionário e criativo',
      O: 'Estável e consistente nos processos',
    },
  },
  {
    id: 15,
    question: 'Quando cometo um erro...',
    options: {
      A: 'Corrijo rapidamente e sigo em frente',
      C: 'Peço desculpas e busco reconexão com o grupo',
      I: 'Analiso profundamente para entender a causa',
      O: 'Sigo o protocolo para corrigir e evitar recorrência',
    },
  },
  {
    id: 16,
    question: 'Em conflitos, prefiro...',
    options: {
      A: 'Confrontar diretamente e resolver logo',
      C: 'Mediar e buscar compreensão mútua',
      I: 'Entender as causas profundas antes de agir',
      O: 'Evitar o conflito e preservar a harmonia',
    },
  },
  {
    id: 17,
    question: 'Minha maior motivação no trabalho é...',
    options: {
      A: 'Vencer e ser reconhecido pelo resultado',
      C: 'Ser querido e fazer parte da equipe',
      I: 'Criar algo original e significativo',
      O: 'Fazer bem feito e com responsabilidade',
    },
  },
  {
    id: 18,
    question: 'Ao começar um projeto novo, minha primeira reação é...',
    options: {
      A: 'Montar um plano de ação e delegar',
      C: 'Juntar a equipe e criar entusiasmo',
      I: 'Pesquisar e imaginar as possibilidades',
      O: 'Verificar os recursos disponíveis e os riscos',
    },
  },
  {
    id: 19,
    question: 'Outros me descrevem como...',
    options: {
      A: 'Determinado e focado',
      C: 'Animado e sociável',
      I: 'Criativo e profundo',
      O: 'Confiável e equilibrado',
    },
  },
  {
    id: 20,
    question: 'O que mais me cansa é...',
    options: {
      A: 'Burocracia e falta de ação',
      C: 'Trabalhar sozinho por muito tempo',
      I: 'Ambientes superficiais e sem profundidade',
      O: 'Imprevisibilidade constante',
    },
  },
  {
    id: 21,
    question: 'Em situações sociais, eu...',
    options: {
      A: 'Domino a conversa e vou ao ponto',
      C: 'Me conecto com todos e animo o ambiente',
      I: 'Fico em observação e escolho com quem conversar',
      O: 'Sou amigável mas prefiro pequenos grupos',
    },
  },
  {
    id: 22,
    question: 'Minha forma favorita de resolver problemas é...',
    options: {
      A: 'Tomar uma decisão rápida e ajustar depois',
      C: 'Debater com outras pessoas',
      I: 'Pesquisar e refletir sozinho',
      O: 'Seguir o método que já funcionou antes',
    },
  },
  {
    id: 23,
    question: 'O que mais valorizo em um líder é...',
    options: {
      A: 'Visão clara e capacidade de decisão',
      C: 'Calor humano e capacidade de inspirar',
      I: 'Inteligência e profundidade de pensamento',
      O: 'Consistência e previsibilidade',
    },
  },
  {
    id: 24,
    question: 'Quando tenho tempo livre inesperado, eu...',
    options: {
      A: 'Aproveito para adiantar algo produtivo',
      C: 'Ligo para alguém ou marco algo com amigos',
      I: 'Mergulho em algo que me instiga intelectualmente',
      O: 'Aproveito para organizar algo que estava pendente',
    },
  },
  {
    id: 25,
    question: 'Minha relação com o tempo é...',
    options: {
      A: 'Precioso demais para desperdiçar',
      C: 'Algo para aproveitar com outras pessoas',
      I: 'Relativo — depende do que estou criando',
      O: 'Algo que deve ser bem administrado',
    },
  },
]

// ============================================================
// QUESTÕES V3 — situacionais e metafóricas, mesmas dimensões
// ============================================================
export const TEMPERAMENT_QUESTIONS_V3: TemperamentQuestion[] = [
  {
    id: 1,
    question: 'Se eu fosse um animal, seria...',
    options: {
      A: 'Um leão — liderança e poder',
      C: 'Um golfinho — sociável e alegre',
      I: 'Uma águia — visão ampla e solitária',
      O: 'Uma tartaruga — calma e constante',
    },
  },
  {
    id: 2,
    question: 'Meu ambiente de trabalho ideal é...',
    options: {
      A: 'Dinâmico, competitivo e focado em entregas',
      C: 'Animado, colaborativo e cheio de interação',
      I: 'Tranquilo, com espaço para reflexão e criação',
      O: 'Organizado, previsível e com processos definidos',
    },
  },
  {
    id: 3,
    question: 'Ao receber uma tarefa nova, minha primeira atitude é...',
    options: {
      A: 'Me perguntar: como posso fazê-la melhor que todos?',
      C: 'Ver quem pode colaborar comigo',
      I: 'Entender o porquê antes do como',
      O: 'Verificar se há um procedimento ou padrão a seguir',
    },
  },
  {
    id: 4,
    question: 'Minha relação com regras é...',
    options: {
      A: 'Sigo se forem úteis, quebro se necessário',
      C: 'Regras existem, mas relacionamentos valem mais',
      I: 'Questiono sempre para entender o fundamento',
      O: 'Respeito e sigo com consistência',
    },
  },
  {
    id: 5,
    question: 'Quando me sinto sobrecarregado, costumo...',
    options: {
      A: 'Trabalhar mais e forçar a resolução',
      C: 'Buscar apoio emocional de amigos',
      I: 'Me isolar para reorganizar meus pensamentos',
      O: 'Listar tudo e resolver um item de cada vez',
    },
  },
  {
    id: 6,
    question: 'Minha relação com dinheiro é...',
    options: {
      A: 'Ferramenta para poder e conquista',
      C: 'Algo para compartilhar e aproveitar com quem amo',
      I: 'Meio para ter liberdade criativa',
      O: 'Algo para ser guardado e administrado com cuidado',
    },
  },
  {
    id: 7,
    question: 'Minhas férias ideais seriam...',
    options: {
      A: 'Uma viagem aventureira com muito a fazer',
      C: 'Um roteiro cheio de interações e pessoas novas',
      I: 'Explorar um lugar diferente no meu próprio ritmo',
      O: 'Um lugar tranquilo e bem planejado com antecedência',
    },
  },
  {
    id: 8,
    question: 'Minha forma preferida de aprender algo novo é...',
    options: {
      A: 'Experimentando na prática',
      C: 'Aprendendo com outras pessoas',
      I: 'Lendo, pesquisando e refletindo',
      O: 'Seguindo um curso estruturado passo a passo',
    },
  },
  {
    id: 9,
    question: 'Eu me irrito quando...',
    options: {
      A: 'As pessoas não agem com agilidade',
      C: 'O ambiente fica frio e sem conexão',
      I: 'A profundidade é trocada pela superficialidade',
      O: 'Os planos mudam sem aviso prévio',
    },
  },
  {
    id: 10,
    question: 'No trabalho em equipe, meu papel natural é...',
    options: {
      A: 'Liderar e definir o caminho',
      C: 'Energizar e conectar o grupo',
      I: 'Trazer novas perspectivas e questionamentos',
      O: 'Garantir que o processo aconteça com consistência',
    },
  },
  {
    id: 11,
    question: 'Quando recebo críticas, minha primeira reação é...',
    options: {
      A: 'Defender minha posição',
      C: 'Me preocupar com o que a pessoa pensa de mim',
      I: 'Analisar internamente se a crítica é justa',
      O: 'Verificar se segui o processo corretamente',
    },
  },
  {
    id: 12,
    question: 'Minha agenda ideal teria...',
    options: {
      A: 'Metas e indicadores de performance',
      C: 'Encontros, cafés e colaborações',
      I: 'Blocos de tempo livres para pensar',
      O: 'Estrutura clara e compromissos bem respeitados',
    },
  },
  {
    id: 13,
    question: 'Se tivesse que escrever um livro, ele seria sobre...',
    options: {
      A: 'Estratégias para alcançar o sucesso',
      C: 'A riqueza das conexões humanas',
      I: 'Um tema complexo e pouco explorado',
      O: 'Como organizar a vida de forma eficiente',
    },
  },
  {
    id: 14,
    question: 'Quando vejo uma ineficiência, eu...',
    options: {
      A: 'Quero resolver imediatamente',
      C: 'Verifico se está afetando o grupo',
      I: 'Quero entender a raiz do problema',
      O: 'Busco o processo correto para corrigir',
    },
  },
  {
    id: 15,
    question: 'Minha maior satisfação no trabalho é...',
    options: {
      A: 'Bater metas e superar expectativas',
      C: 'Saber que fiz a diferença na vida de alguém',
      I: 'Produzir algo de qualidade e originalidade',
      O: 'Entregar o que foi prometido com exatidão',
    },
  },
  {
    id: 16,
    question: 'Em uma crise, as pessoas me procuram porque...',
    options: {
      A: 'Tomo decisões rápidas e claras',
      C: 'Tranquilizo emocionalmente o grupo',
      I: 'Analiso profundamente a situação',
      O: 'Mantenho a calma e o processo',
    },
  },
  {
    id: 17,
    question: 'Para mim, o sucesso depende de...',
    options: {
      A: 'Garra, foco e vontade de vencer',
      C: 'Colaboração e apoio mútuo',
      I: 'Criatividade e pensamento fora da caixa',
      O: 'Disciplina e consistência ao longo do tempo',
    },
  },
  {
    id: 18,
    question: 'Antes de tomar uma decisão importante, eu...',
    options: {
      A: 'Confio no meu instinto e no histórico de resultados',
      C: 'Ouço as pessoas que me rodeiam',
      I: 'Pesquiso e reflito bastante',
      O: 'Listo os prós e contras com cuidado',
    },
  },
  {
    id: 19,
    question: 'Numa situação ambígua, me sinto...',
    options: {
      A: 'Estimulado — vejo uma oportunidade',
      C: 'Curioso — quero ouvir o que os outros acham',
      I: 'Instigado — quero explorar as possibilidades',
      O: 'Desconfortável — prefiro clareza',
    },
  },
  {
    id: 20,
    question: 'Quando algo dá errado num projeto, eu...',
    options: {
      A: 'Assumo o controle e ajusto o rumo',
      C: 'Verifico como isso afetou o time',
      I: 'Busco a causa raiz da falha',
      O: 'Reviso o processo para evitar recorrência',
    },
  },
  {
    id: 21,
    question: 'O que mais me motiva no dia a dia é...',
    options: {
      A: 'Sentir que estou progredindo e vencendo',
      C: 'Ter conexões significativas com as pessoas',
      I: 'Explorar ideias e criar algo novo',
      O: 'Ter clareza, ordem e uma rotina sólida',
    },
  },
  {
    id: 22,
    question: 'Quando preciso convencer alguém, eu...',
    options: {
      A: 'Uso dados, fatos e argumentação direta',
      C: 'Apelo para a emoção e para o relacionamento',
      I: 'Apresento perspectivas que fazem a pessoa pensar',
      O: 'Mostro precedentes e confiabilidade',
    },
  },
  {
    id: 23,
    question: 'Meu maior legado seria...',
    options: {
      A: 'Ter construído algo grande e duradouro',
      C: 'Ter tocado positivamente muitas vidas',
      I: 'Ter criado algo original e profundo',
      O: 'Ter sido exemplo de integridade e consistência',
    },
  },
  {
    id: 24,
    question: 'Se pudesse escolher um superpoder, seria...',
    options: {
      A: 'Velocidade de ação e execução',
      C: 'Capacidade de conectar qualquer pessoa',
      I: 'Ver padrões ocultos e antecipar o futuro',
      O: 'Nunca errar em processos e decisões',
    },
  },
  {
    id: 25,
    question: 'Na minha relação com o trabalho, eu sou...',
    options: {
      A: 'Movido por conquista e superação constante',
      C: 'Movido por conexão e impacto nas pessoas',
      I: 'Movido por significado e profundidade',
      O: 'Movido por ordem, qualidade e confiabilidade',
    },
  },
]

// ============================================================
// LOOKUP: versão → conjunto de questões
// A versão é derivada deterministicamente do token da avaliação,
// garantindo consistência sem campo extra no banco de dados.
// ============================================================
export const TEMPERAMENT_QUESTION_SETS: Record<1 | 2 | 3, TemperamentQuestion[]> = {
  1: TEMPERAMENT_QUESTIONS,
  2: TEMPERAMENT_QUESTIONS_V2,
  3: TEMPERAMENT_QUESTIONS_V3,
}

/** Deriva a versão do conjunto de questões a partir do token UUID */
export function getTemperamentVersion(token: string): 1 | 2 | 3 {
  const sum = token.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)
  return ((sum % 3) + 1) as 1 | 2 | 3
}

// ============================================================
// FUNÇÃO DE CÁLCULO
// ============================================================
export function calculateTemperament(answers: TemperamentAnswer[]): TemperamentResult {
  const scores: TemperamentScores = {
    COLERICO: 0,
    SANGUINEO: 0,
    MELANCOLICO: 0,
    FLEUMATICO: 0,
  }

  const optionToType: Record<TemperamentOption, TemperamentType> = {
    A: 'COLERICO',
    C: 'SANGUINEO',
    I: 'MELANCOLICO',
    O: 'FLEUMATICO',
  }

  for (const answer of answers) {
    const type = optionToType[answer.selected]
    if (type) scores[type]++
  }

  const total = answers.length || 25
  const percentages: TemperamentScores = {
    COLERICO: Math.round((scores.COLERICO / total) * 100),
    SANGUINEO: Math.round((scores.SANGUINEO / total) * 100),
    MELANCOLICO: Math.round((scores.MELANCOLICO / total) * 100),
    FLEUMATICO: Math.round((scores.FLEUMATICO / total) * 100),
  }

  // Ordena do maior para o menor
  const ranked = (Object.keys(scores) as TemperamentType[]).sort(
    (a, b) => scores[b] - scores[a]
  )

  const primaryType = ranked[0]
  const secondaryType = ranked[1]

  const profile = TEMPERAMENT_PROFILES[primaryType]
  const secondaryProfile = TEMPERAMENT_PROFILES[secondaryType]

  // Interpretação
  const primaryPct = percentages[primaryType]
  const secondaryPct = percentages[secondaryType]

  let interpretation = ''
  if (primaryPct >= 48) {
    interpretation = `Perfil predominantemente ${profile.name} (${primaryPct}%). Suas respostas indicam forte inclinação para as características deste temperamento.`
  } else if (primaryPct >= 36) {
    interpretation = `Perfil ${profile.name} (${primaryPct}%) com influência significativa do temperamento ${secondaryProfile.name} (${secondaryPct}%). Você combina características de ambos.`
  } else {
    interpretation = `Perfil misto com leve predominância ${profile.name} (${primaryPct}%). Você expressa características distribuídas entre múltiplos temperamentos, o que indica grande flexibilidade comportamental.`
  }

  return {
    scores,
    percentages,
    primaryType,
    secondaryType,
    profile,
    secondaryProfile,
    interpretation,
  }
}

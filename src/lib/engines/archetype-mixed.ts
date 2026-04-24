// ============================================================
// Engine: Arquétipos Mistos (12 tipos de Jung)
// 72 afirmações — 6 por arquétipo — escala 1 a 5
// ============================================================

export type ArchetypeMixedType =
  | 'INNOCENT' | 'ORPHAN' | 'HERO' | 'CAREGIVER'
  | 'EXPLORER' | 'REBEL' | 'LOVER' | 'CREATOR'
  | 'MAGICIAN' | 'SAGE' | 'RULER' | 'JESTER'

export interface ArchetypeMixedQuestion {
  id: number
  text: string
  archetype: ArchetypeMixedType
}

export const ARCHETYPE_MIXED_QUESTIONS: ArchetypeMixedQuestion[] = [
  // ── Inocente (INNOCENT) ─────────────────────────────────
  { id: 1,  text: 'Acredito genuinamente que tudo vai se resolver bem no final.', archetype: 'INNOCENT' },
  { id: 2,  text: 'Prefiro manter uma visão positiva do mundo mesmo diante de adversidades.', archetype: 'INNOCENT' },
  { id: 3,  text: 'Costumo confiar nas pessoas antes de ter razões concretas para desconfiar.', archetype: 'INNOCENT' },
  { id: 4,  text: 'A simplicidade e a honestidade são os valores que mais preza na vida.', archetype: 'INNOCENT' },
  { id: 5,  text: 'Sinto que o mundo é fundamentalmente um lugar bom e seguro.', archetype: 'INNOCENT' },
  { id: 6,  text: 'Evito conflitos e prefiro encontrar o lado positivo em qualquer situação.', archetype: 'INNOCENT' },

  // ── Cara Comum / Órfão (ORPHAN) ────────────────────────
  { id: 7,  text: 'Valorizo pertencer a um grupo e me sentir aceito pelos outros.', archetype: 'ORPHAN' },
  { id: 8,  text: 'Sinto mais conforto quando sei que sou igual às outras pessoas, sem me destacar.', archetype: 'ORPHAN' },
  { id: 9,  text: 'Prefiro trabalhar em equipe e raramente busco os holofotes para mim.', archetype: 'ORPHAN' },
  { id: 10, text: 'Me identifico mais com pessoas comuns do que com figuras de prestígio ou fama.', archetype: 'ORPHAN' },
  { id: 11, text: 'O senso de comunidade e de igualdade é fundamental para o meu bem-estar.', archetype: 'ORPHAN' },
  { id: 12, text: 'Sinto-me desconfortável quando recebo atenção ou privilégios que outros não recebem.', archetype: 'ORPHAN' },

  // ── Herói (HERO) ────────────────────────────────────────
  { id: 13, text: 'Sinto um impulso forte para superar obstáculos e provar minha capacidade.', archetype: 'HERO' },
  { id: 14, text: 'Não me esquivo de desafios difíceis — encaro-os como oportunidades de crescimento.', archetype: 'HERO' },
  { id: 15, text: 'Fico motivado quando tenho metas claras a conquistar e resultados a alcançar.', archetype: 'HERO' },
  { id: 16, text: 'Sinto satisfação profunda quando venço uma batalha que parecia impossível.', archetype: 'HERO' },
  { id: 17, text: 'Prefiro agir do que esperar, especialmente para defender o que acredito.', archetype: 'HERO' },
  { id: 18, text: 'Tenho dificuldade em aceitar a derrota e busco sempre uma forma de reverter o jogo.', archetype: 'HERO' },

  // ── Prestativo / Cuidador (CAREGIVER) ──────────────────
  { id: 19, text: 'Sinto-me realizado quando consigo ajudar alguém a resolver um problema difícil.', archetype: 'CAREGIVER' },
  { id: 20, text: 'Colocar as necessidades dos outros antes das minhas é algo natural para mim.', archetype: 'CAREGIVER' },
  { id: 21, text: 'Me preocupo genuinamente com o bem-estar das pessoas ao meu redor.', archetype: 'CAREGIVER' },
  { id: 22, text: 'Tenho facilidade em perceber quando alguém está sofrendo, mesmo sem dizer nada.', archetype: 'CAREGIVER' },
  { id: 23, text: 'Oferecer suporte emocional a quem precisa é uma das minhas maiores satisfações.', archetype: 'CAREGIVER' },
  { id: 24, text: 'Sinto angústia quando não consigo ajudar alguém que está passando por dificuldades.', archetype: 'CAREGIVER' },

  // ── Explorador (EXPLORER) ───────────────────────────────
  { id: 25, text: 'Sinto uma necessidade genuína de explorar lugares, ideias ou experiências novas.', archetype: 'EXPLORER' },
  { id: 26, text: 'A rotina me sufoca — preciso de novidade e liberdade para me sentir vivo.', archetype: 'EXPLORER' },
  { id: 27, text: 'Prefiro descobrir meu próprio caminho a seguir rotas já mapeadas por outros.', archetype: 'EXPLORER' },
  { id: 28, text: 'Viajar, aprender e expandir horizontes são prioridades na minha vida.', archetype: 'EXPLORER' },
  { id: 29, text: 'Me sinto mais eu mesmo quando estou fora da minha zona de conforto.', archetype: 'EXPLORER' },
  { id: 30, text: 'Valorizo a autonomia acima de estabilidade ou segurança financeira.', archetype: 'EXPLORER' },

  // ── Rebelde (REBEL) ─────────────────────────────────────
  { id: 31, text: 'Questiono regras e sistemas que considero injustos ou ultrapassados.', archetype: 'REBEL' },
  { id: 32, text: 'Sinto atração por ideias revolucionárias que desafiam o status quo.', archetype: 'REBEL' },
  { id: 33, text: 'Prefiro ser autêntico a ser aceito — mesmo que isso me coloque em conflito com outros.', archetype: 'REBEL' },
  { id: 34, text: 'Tenho dificuldade em seguir regras que não fazem sentido para mim.', archetype: 'REBEL' },
  { id: 35, text: 'Acredito que mudanças reais exigem ruptura com o que está estabelecido.', archetype: 'REBEL' },
  { id: 36, text: 'Sinto prazer em provocar reflexões incômodas nas pessoas ao meu redor.', archetype: 'REBEL' },

  // ── Amante (LOVER) ──────────────────────────────────────
  { id: 37, text: 'Busco conexões profundas e intensas nas minhas relações pessoais e profissionais.', archetype: 'LOVER' },
  { id: 38, text: 'Valorizo a beleza, a estética e o prazer como parte essencial da vida.', archetype: 'LOVER' },
  { id: 39, text: 'Me envolvo com total dedicação em tudo o que faço ou nas pessoas que amo.', archetype: 'LOVER' },
  { id: 40, text: 'A qualidade dos relacionamentos é o que dá mais sentido à minha existência.', archetype: 'LOVER' },
  { id: 41, text: 'Sinto as emoções de forma intensa — tanto a alegria quanto a dor.', archetype: 'LOVER' },
  { id: 42, text: 'Prefiro uma vida com paixão e intensidade do que uma vida segura, mas apagada.', archetype: 'LOVER' },

  // ── Criador (CREATOR) ───────────────────────────────────
  { id: 43, text: 'Tenho um forte impulso de criar, construir e dar forma às minhas visões.', archetype: 'CREATOR' },
  { id: 44, text: 'Sinto frustração quando não consigo expressar minha criatividade no trabalho.', archetype: 'CREATOR' },
  { id: 45, text: 'Prefiro inventar do zero a otimizar o que já existe.', archetype: 'CREATOR' },
  { id: 46, text: 'Tenho facilidade em visualizar como algo poderia ser diferente ou melhor.', archetype: 'CREATOR' },
  { id: 47, text: 'Projetos criativos e inovadores me energizam de uma forma que outras atividades não conseguem.', archetype: 'CREATOR' },
  { id: 48, text: 'Deixar uma obra, produto ou ideia que persista no tempo é uma das minhas ambições.', archetype: 'CREATOR' },

  // ── Mago (MAGICIAN) ─────────────────────────────────────
  { id: 49, text: 'Acredito que é possível transformar realidades por meio de visão e intenção focadas.', archetype: 'MAGICIAN' },
  { id: 50, text: 'Percebo padrões e conexões ocultas que a maioria das pessoas não enxerga.', archetype: 'MAGICIAN' },
  { id: 51, text: 'Tenho uma atração natural por temas de transformação, cura e evolução humana.', archetype: 'MAGICIAN' },
  { id: 52, text: 'Me sinto em meu elemento quando estou catalisando mudanças profundas nos outros.', archetype: 'MAGICIAN' },
  { id: 53, text: 'Acredito que o pensamento e a intenção têm um poder real sobre os resultados da vida.', archetype: 'MAGICIAN' },
  { id: 54, text: 'Sou atraído por conhecimentos que vão além do que é convencionalmente aceito.', archetype: 'MAGICIAN' },

  // ── Sábio (SAGE) ────────────────────────────────────────
  { id: 55, text: 'Busco entender o mundo com profundidade antes de tomar qualquer decisão importante.', archetype: 'SAGE' },
  { id: 56, text: 'O aprendizado contínuo é uma das minhas maiores motivações na vida.', archetype: 'SAGE' },
  { id: 57, text: 'Prefiro analisar todos os ângulos de um problema antes de chegar a uma conclusão.', archetype: 'SAGE' },
  { id: 58, text: 'Sinto mais confiança em dados, evidências e raciocínio lógico do que em intuições.', archetype: 'SAGE' },
  { id: 59, text: 'Ser uma referência de conhecimento e expertise é algo que valorizo profundamente.', archetype: 'SAGE' },
  { id: 60, text: 'Tenho dificuldade em aceitar afirmações sem embasamento — sempre quero entender o porquê.', archetype: 'SAGE' },

  // ── Governante (RULER) ──────────────────────────────────
  { id: 61, text: 'Sinto um impulso natural para assumir a liderança e organizar as pessoas ao meu redor.', archetype: 'RULER' },
  { id: 62, text: 'Tenho um papel importante na manutenção da ordem, das regras e da estrutura.', archetype: 'RULER' },
  { id: 63, text: 'Me sinto mais confortável quando tenho controle sobre os processos e resultados.', archetype: 'RULER' },
  { id: 64, text: 'Planejo com antecedência e me incomodo quando as coisas saem fora do previsto.', archetype: 'RULER' },
  { id: 65, text: 'Construir algo duradouro — um legado, uma instituição, uma cultura — é uma das minhas metas.', archetype: 'RULER' },
  { id: 66, text: 'Sinto responsabilidade pelo sucesso e bem-estar das pessoas que lidero.', archetype: 'RULER' },

  // ── Bobo da Corte (JESTER) ──────────────────────────────
  { id: 67, text: 'Uso o humor para conectar pessoas e aliviar tensões em situações difíceis.', archetype: 'JESTER' },
  { id: 68, text: 'Viver o momento presente é mais importante para mim do que planejar o futuro.', archetype: 'JESTER' },
  { id: 69, text: 'Faço as pessoas sorrirem com facilidade e isso me traz grande satisfação.', archetype: 'JESTER' },
  { id: 70, text: 'Prefiro uma vida leve e divertida a uma carreira de grande prestígio, mas sem alegria.', archetype: 'JESTER' },
  { id: 71, text: 'Não levo as coisas excessivamente a sério — a leveza é um dos meus superpoderes.', archetype: 'JESTER' },
  { id: 72, text: 'Consigo encontrar o lado engraçado ou absurdo em quase qualquer situação.', archetype: 'JESTER' },
]

// ── Metadados dos arquétipos ──────────────────────────────────

export interface ArchetypeMixedProfile {
  name: string
  title: string
  tagline: string
  motivation: string
  fear: string
  gift: string
  shadow: string
  keywords: string[]
  strengths: string[]
  challenges: string[]
  careers: string[]
  leadershipStyle: string
  description: string
}

export const ARCHETYPE_MIXED_PROFILES: Record<ArchetypeMixedType, ArchetypeMixedProfile> = {
  INNOCENT: {
    name: 'O Inocente',
    title: 'O Otimista Eterno',
    tagline: 'O mundo é fundamentalmente bom e tudo vai se resolver.',
    motivation: 'Encontrar felicidade, segurança e um lugar seguro no mundo.',
    fear: 'Fazer algo errado, ser punido ou cometer um erro grave.',
    gift: 'Fé, otimismo e a capacidade de ver o bem em tudo.',
    shadow: 'Ingenuidade, negação de problemas reais, dependência excessiva.',
    keywords: ['Otimismo', 'Pureza', 'Confiança', 'Simplicidade', 'Fé'],
    strengths: [
      'Cria ambientes de confiança e positividade',
      'Inspira os outros com sua visão esperançosa',
      'Mantém a leveza mesmo em momentos difíceis',
      'Tem facilidade em perdoar e recomeçar',
    ],
    challenges: [
      'Pode ser ingênuo em relação às intenções dos outros',
      'Evita conflitos necessários para se proteger',
      'Pode negar problemas reais por excesso de otimismo',
      'Dificuldade em lidar com deceções e perdas',
    ],
    careers: ['Educação', 'ONG e impacto social', 'Comunicação positiva', 'Coaching motivacional'],
    leadershipStyle: 'Inspira pelo exemplo e pela visão positiva. Cria culturas de confiança e pertencimento.',
    description: 'O Inocente acredita no bem fundamental da humanidade e do mundo. Sua força está na capacidade de manter a esperança viva e inspirar os outros a acreditarem no melhor. É o arquétipo da renovação e da fé inabalável.',
  },

  ORPHAN: {
    name: 'O Cara Comum',
    title: 'O Realista Empático',
    tagline: 'Todos somos iguais — e é na conexão que encontramos força.',
    motivation: 'Pertencer, ser aceito e encontrar conexão genuína com os outros.',
    fear: 'Ser excluído, rejeitado ou se destacar de forma que afaste as pessoas.',
    gift: 'Empatia, realismo e a capacidade de conectar pessoas diferentes.',
    shadow: 'Conformismo excessivo, medo de se destacar, vitimismo.',
    keywords: ['Pertencimento', 'Empatia', 'Igualdade', 'Realismo', 'Comunidade'],
    strengths: [
      'Cria laços autênticos e duradouros',
      'Entende as necessidades reais das pessoas',
      'É um grande conector de equipes e grupos',
      'Traz senso de humanidade às organizações',
    ],
    challenges: [
      'Pode evitar se destacar mesmo quando necessário',
      'Dificuldade em exercer autoridade quando precisa',
      'Tendência ao conformismo e à dependência do grupo',
      'Pode sacrificar sua identidade pelo pertencimento',
    ],
    careers: ['RH e gestão de pessoas', 'Serviço social', 'Liderança comunitária', 'Mediação de conflitos'],
    leadershipStyle: 'Lidera pela proximidade e pela escuta. Cria equipes coesas e ambientes de pertencimento genuíno.',
    description: 'O Cara Comum valoriza acima de tudo a conexão e o pertencimento. Não busca holofotes — busca autenticidade e igualdade. Sua empatia profunda o torna um líder de pessoas que cria culturas de inclusão e colaboração real.',
  },

  HERO: {
    name: 'O Herói',
    title: 'O Conquistador Corajoso',
    tagline: 'Os obstáculos existem para ser superados — e eu farei isso.',
    motivation: 'Provar seu valor, superar desafios e deixar um impacto no mundo.',
    fear: 'Fraqueza, covardia ou falhar diante de um grande desafio.',
    gift: 'Coragem, determinação e capacidade de inspirar outros à ação.',
    shadow: 'Arrogância, workaholic, incapacidade de pedir ajuda.',
    keywords: ['Coragem', 'Determinação', 'Força', 'Conquista', 'Disciplina'],
    strengths: [
      'Enfrenta desafios que outros evitam',
      'Inspira equipes a darem o melhor de si',
      'Alta resistência e capacidade de recuperação',
      'Orientado a resultados com foco e disciplina',
    ],
    challenges: [
      'Pode se tornar workaholic e negligenciar relacionamentos',
      'Dificuldade em aceitar limitações ou pedir ajuda',
      'Tendência a competição excessiva e desgaste',
      'Pode subestimar o processo em favor do resultado',
    ],
    careers: ['Empreendedorismo', 'Alta liderança', 'Esportes e alto rendimento', 'Forças armadas e segurança'],
    leadershipStyle: 'Lidera pelo exemplo e pela performance. Define o padrão que quer ver e vai à frente para mostrar o caminho.',
    description: 'O Herói é movido pela necessidade de provar seu valor e superar limites. É o arquétipo da coragem em ação — aquele que enfrenta o impossível e sai transformado. Quando integrado, transcende a busca por validação externa e lidera com força genuína.',
  },

  CAREGIVER: {
    name: 'O Prestativo',
    title: 'O Guardião Compassivo',
    tagline: 'Cuidar do outro é o que dá sentido à minha existência.',
    motivation: 'Ajudar, proteger e nutrir o crescimento das pessoas ao seu redor.',
    fear: 'Ingratidão, ser considerado egoísta ou ver alguém sofrendo sem poder ajudar.',
    gift: 'Empatia profunda, generosidade e capacidade de nutrir potencial nos outros.',
    shadow: 'Superproteção, auto-abandono, criação de dependência.',
    keywords: ['Cuidado', 'Compaixão', 'Generosidade', 'Proteção', 'Serviço'],
    strengths: [
      'Cria ambientes de segurança psicológica',
      'Identifica e nutre o potencial latente nas pessoas',
      'Constrói lealdade profunda por meio do cuidado genuíno',
      'Excelente em funções que exigem escuta e suporte',
    ],
    challenges: [
      'Pode se anular para cuidar dos outros',
      'Dificuldade em estabelecer limites saudáveis',
      'Tende a criar dependência em vez de autonomia',
      'Pode se tornar controlador sob o disfarce do cuidado',
    ],
    careers: ['Saúde e bem-estar', 'Educação e mentoria', 'Psicologia e terapia', 'Liderança servidora'],
    leadershipStyle: 'Lidera colocando o desenvolvimento das pessoas em primeiro lugar. Cria culturas de segurança e crescimento.',
    description: 'O Prestativo encontra seu propósito no cuidado genuíno pelo outro. Sua maior habilidade é ver o que as pessoas precisam antes mesmo que elas o percebam. Quando equilibrado, é um líder que potencializa o melhor nas equipes sem se perder no processo.',
  },

  EXPLORER: {
    name: 'O Explorador',
    title: 'O Livre Buscador',
    tagline: 'A liberdade não é um luxo — é uma necessidade fundamental.',
    motivation: 'Descobrir quem é por meio de novas experiências, lugares e ideias.',
    fear: 'Sentir-se preso, estagnado ou obrigado a seguir um único caminho.',
    gift: 'Adaptabilidade, curiosidade insaciável e capacidade de inovar.',
    shadow: 'Fuga de comprometimentos, falta de profundidade, nomadismo.',
    keywords: ['Liberdade', 'Descoberta', 'Autonomia', 'Aventura', 'Adaptação'],
    strengths: [
      'Traz perspectivas frescas e não convencionais',
      'Adapta-se rapidamente a novos ambientes',
      'Cria conexões criativas entre áreas distintas',
      'Inspira equipes a saírem da zona de conforto',
    ],
    challenges: [
      'Pode ter dificuldade em se comprometer a longo prazo',
      'Tende a perder foco ao se entusiasmar com novidades',
      'Pode evitar a profundidade em favor da amplitude',
      'Relacionamentos e projetos longos podem ser desafiadores',
    ],
    careers: ['Inovação e startup', 'Jornalismo e pesquisa', 'Consultoria independente', 'Viagens e cultura'],
    leadershipStyle: 'Lidera pela inspiração e pela visão de mundo expandida. Cria equipes que pensam fora da caixa.',
    description: 'O Explorador é movido por uma sede insaciável de descoberta. Não busca apenas novos lugares — busca novos horizontes internos. É o arquétipo da inovação genuína, capaz de ver oportunidades onde outros só enxergam riscos.',
  },

  REBEL: {
    name: 'O Rebelde',
    title: 'O Revolucionário Autêntico',
    tagline: 'Regras que não fazem sentido existem para ser questionadas.',
    motivation: 'Mudar o que está errado, ser autêntico e quebrar correntes que prendem.',
    fear: 'Ser controlado, castrado em sua autenticidade ou se tornar parte do sistema que critica.',
    gift: 'Coragem para dizer o que ninguém diz e ver o que outros não querem ver.',
    shadow: 'Destrutividade sem propósito, rebeldia por hábito, isolamento.',
    keywords: ['Autenticidade', 'Revolução', 'Coragem', 'Ruptura', 'Liberdade'],
    strengths: [
      'Identifica problemas sistêmicos antes de todos',
      'Tem coragem para desafiar o que está estabelecido',
      'Inspira mudanças culturais profundas',
      'Não teme conflitos quando a causa é justa',
    ],
    challenges: [
      'Pode questionar sem oferecer soluções concretas',
      'Tende a criar conflitos desnecessários por hábito',
      'Pode ser visto como difícil de gerenciar ou colaborar',
      'Dificuldade em aceitar estruturas mesmo quando saudáveis',
    ],
    careers: ['Empreendedorismo disruptivo', 'Ativismo e advocacy', 'Arte e cultura de vanguarda', 'Inovação radical'],
    leadershipStyle: 'Lidera por contracultura. Questiona o status quo e cria movimentos que mudam paradigmas.',
    description: 'O Rebelde não é apenas contra — é a favor de um mundo mais autêntico. Sua força está na coragem de dizer o que os outros pensam mas não ousam falar. Quando integrado, canaliza sua disrupção em transformação real e duradoura.',
  },

  LOVER: {
    name: 'O Amante',
    title: 'O Apaixonado Intenso',
    tagline: 'Tudo que vale a pena merece ser vivido com paixão e profundidade.',
    motivation: 'Encontrar conexão profunda, beleza e intimidade em todas as experiências.',
    fear: 'Estar sozinho, não ser amado ou viver de forma superficial e sem sentido.',
    gift: 'Intensidade emocional, sensibilidade estética e capacidade de criar conexão real.',
    shadow: 'Ciúme, dependência emocional, busca de validação externa.',
    keywords: ['Paixão', 'Intensidade', 'Beleza', 'Conexão', 'Entrega'],
    strengths: [
      'Cria laços profundos e lealdade genuína',
      'Traz beleza e significado às experiências cotidianas',
      'Emociona e inspira por meio da autenticidade emocional',
      'Alta capacidade de empatia e leitura emocional',
    ],
    challenges: [
      'Pode se perder emocionalmente em relações intensas',
      'Tendência ao ciúme e à dependência',
      'Dificuldade em manter equilíbrio entre entrega e limites',
      'Pode sofrer intensamente com rejeições e perdas',
    ],
    careers: ['Artes e design', 'Marketing emocional', 'Relacionamentos e terapia', 'Gastronomia e experiências'],
    leadershipStyle: 'Lidera pela conexão e pelo significado. Cria culturas onde as pessoas se sentem vistas e valorizadas.',
    description: 'O Amante vive e lidera com o coração. Sua capacidade de se conectar profundamente com pessoas, ideias e projetos é seu maior superpoder. Não busca apenas performance — busca que o trabalho tenha alma e significado.',
  },

  CREATOR: {
    name: 'O Criador',
    title: 'O Construtor de Visões',
    tagline: 'Se eu consigo imaginar, consigo criar — e o que crio importa.',
    motivation: 'Dar forma a ideias inovadoras e deixar uma obra que persista no tempo.',
    fear: 'Mediocridade, criatividade bloqueada e deixar seu potencial desperdiçado.',
    gift: 'Visão criativa, capacidade de inovar e habilidade de transformar ideias em realidade.',
    shadow: 'Perfeccionismo paralisante, narcisismo criativo, dificuldade de finalizar.',
    keywords: ['Criatividade', 'Inovação', 'Visão', 'Construção', 'Originalidade'],
    strengths: [
      'Gera soluções originais para problemas complexos',
      'Transforma visões em produtos e experiências concretas',
      'Inspira equipes com sua imaginação e entusiasmo',
      'Cria identidades e culturas organizacionais fortes',
    ],
    challenges: [
      'Perfeccionismo pode travar a entrega',
      'Dificuldade em trabalhar dentro de restrições rígidas',
      'Pode ter dificuldade em delegar a parte criativa',
      'Projetos múltiplos simultâneos podem gerar dispersão',
    ],
    careers: ['Design e arquitetura', 'Tecnologia e produto', 'Publicidade e branding', 'Empreendedorismo criativo'],
    leadershipStyle: 'Lidera pela visão e pela energia criativa. Cria culturas de inovação onde a originalidade é celebrada.',
    description: 'O Criador é impulsionado pela necessidade de dar forma ao que existe apenas como potencial. É o arquétipo da inovação encarnada — aquele que não aceita o mundo como ele é e trabalha para moldá-lo à imagem de sua visão.',
  },

  MAGICIAN: {
    name: 'O Mago',
    title: 'O Catalisador de Transformações',
    tagline: 'A realidade é mais maleável do que parece — e sei como transformá-la.',
    motivation: 'Transformar a si mesmo e ao mundo por meio de conhecimento e intencionalidade.',
    fear: 'Consequências não intencionais de seu poder e causar dano onde queria curar.',
    gift: 'Capacidade de ver conexões ocultas e catalisar transformações profundas.',
    shadow: 'Manipulação, arrogância espiritual, promessas que excedem a entrega.',
    keywords: ['Transformação', 'Visão', 'Intuição', 'Poder', 'Catalização'],
    strengths: [
      'Enxerga padrões e possibilidades que outros não percebem',
      'Catalisa mudanças profundas em pessoas e organizações',
      'Usa conhecimento de forma estratégica e transformadora',
      'Inspira pela profundidade da visão e do pensamento',
    ],
    challenges: [
      'Pode parecer místico ou difícil de entender para outros',
      'Risco de manipulação com boas intenções',
      'Dificuldade em comunicar visões complexas de forma simples',
      'Pode criar expectativas que superam o possível',
    ],
    careers: ['Estratégia e consultoria', 'Desenvolvimento humano', 'Coaching de alta performance', 'Liderança em transformação'],
    leadershipStyle: 'Lidera pela visão sistêmica e pela capacidade de ver o que ainda não existe. Catalisa mudanças que pareciam impossíveis.',
    description: 'O Mago opera no espaço entre o que é e o que pode ser. Sua habilidade de perceber padrões ocultos e criar transformações genuínas o torna um agente de mudança poderoso. Quando integrado, usa seu poder com consciência e responsabilidade.',
  },

  SAGE: {
    name: 'O Sábio',
    title: 'O Guardião do Conhecimento',
    tagline: 'A verdade existe — e vale cada esforço para encontrá-la.',
    motivation: 'Compreender o mundo com profundidade e compartilhar esse conhecimento.',
    fear: 'Ser enganado, tomar decisões baseadas em informações falsas ou incompletas.',
    gift: 'Análise profunda, pensamento crítico e capacidade de síntese.',
    shadow: 'Paralisia analítica, arrogância intelectual, isolamento.',
    keywords: ['Conhecimento', 'Análise', 'Profundidade', 'Sabedoria', 'Clareza'],
    strengths: [
      'Toma decisões baseadas em dados e análise rigorosa',
      'Identifica falácias e pontos cegos que outros ignoram',
      'Cria bases sólidas de conhecimento para as organizações',
      'É referência de expertise e pensamento aprofundado',
    ],
    challenges: [
      'Pode travar em análises intermináveis antes de agir',
      'Tende a supercomplicar soluções que poderiam ser simples',
      'Pode parecer frio ou distante emocionalmente',
      'Dificuldade em agir sem ter todas as informações',
    ],
    careers: ['Pesquisa e academia', 'Estratégia e inteligência de mercado', 'Tecnologia e dados', 'Consultoria especializada'],
    leadershipStyle: 'Lidera pelo conhecimento e pela expertise. Cria culturas de aprendizado contínuo e decisões baseadas em evidências.',
    description: 'O Sábio dedica sua vida à busca da verdade. É o arquétipo do mestre, do analista e do mentor — aquele que não aceita respostas fáceis e insiste na compreensão profunda. Sua maior contribuição é criar clareza em meio à complexidade.',
  },

  RULER: {
    name: 'O Governante',
    title: 'O Arquiteto da Ordem',
    tagline: 'Estrutura e controle não são limites — são a base de tudo que dura.',
    motivation: 'Criar ordem, estabilidade e um legado duradouro por meio da liderança responsável.',
    fear: 'Caos, perda de controle e o colapso do que construiu com tanto esforço.',
    gift: 'Visão estratégica, capacidade de organização e responsabilidade pelo coletivo.',
    shadow: 'Autoritarismo, rigidez, controle excessivo e dificuldade em delegar.',
    keywords: ['Liderança', 'Estrutura', 'Legado', 'Controle', 'Responsabilidade'],
    strengths: [
      'Cria processos e estruturas que sustentam o crescimento',
      'Assume responsabilidade pelo sucesso coletivo',
      'Pensa em legado e impacto de longo prazo',
      'Mantém a organização estável mesmo em crises',
    ],
    challenges: [
      'Pode se tornar controlador e microgerenciar',
      'Rigidez diante de mudanças necessárias',
      'Dificuldade em delegar o controle',
      'Pode priorizar a ordem em detrimento da inovação',
    ],
    careers: ['Alta gestão e C-level', 'Direito e compliance', 'Administração pública', 'Governança corporativa'],
    leadershipStyle: 'Lidera com autoridade clara e responsabilidade genuína. Define o norte, cria as estruturas e exige excelência.',
    description: 'O Governante é o arquétipo do líder que não foge da responsabilidade. Sua missão é criar ordem e estrutura que permitam que outros floresçam. Quando integrado, equilibra controle com confiança — e constrói impérios que persistem além de si mesmo.',
  },

  JESTER: {
    name: 'O Bobo da Corte',
    title: 'O Mestre da Leveza',
    tagline: 'A vida é boa demais para ser levada muito a sério.',
    motivation: 'Viver plenamente o momento presente e trazer alegria genuína ao mundo.',
    fear: 'Ser chato, desnecessário ou perder a capacidade de encontrar alegria na vida.',
    gift: 'Humor, leveza e capacidade de transformar tensão em conexão.',
    shadow: 'Irresponsabilidade, uso do humor para evitar profundidade, falta de comprometimento.',
    keywords: ['Alegria', 'Humor', 'Espontaneidade', 'Leveza', 'Presente'],
    strengths: [
      'Dissolve tensões e conflitos com inteligência emocional',
      'Cria ambientes de trabalho leves e criativos',
      'Conecta pessoas por meio do humor genuíno',
      'Traz perspectivas inesperadas que geram insight',
    ],
    challenges: [
      'Pode evitar profundidade e responsabilidade',
      'Humor pode ser mal interpretado em contextos sérios',
      'Dificuldade em manter foco em projetos de longo prazo',
      'Pode ser subestimado por sua aparente leveza',
    ],
    careers: ['Entretenimento e comunicação', 'Marketing e criatividade', 'Facilitação e treinamento', 'Liderança de cultura organizacional'],
    leadershipStyle: 'Lidera pela energia e pelo engajamento. Cria culturas onde as pessoas querem estar — e onde o trabalho tem sabor de jogo.',
    description: 'O Bobo da Corte possui um superpoder subestimado: a capacidade de criar conexão real por meio da alegria autêntica. Não é leviano — é sábio o suficiente para saber que a leveza é um ingrediente essencial de qualquer cultura que prospera.',
  },
}

// ── Função de cálculo ─────────────────────────────────────────

export interface ArchetypeMixedAnswer {
  questionId: number
  value: number // 1-5
}

export interface ArchetypeMixedResult {
  dominant: ArchetypeMixedType
  secondary: ArchetypeMixedType
  shadow: ArchetypeMixedType
  scores: Record<ArchetypeMixedType, number>
  percentages: Record<ArchetypeMixedType, number>
  report: ArchetypeMixedProfile
  secondaryReport: ArchetypeMixedProfile
}

export function calculateArchetypeMixed(answers: ArchetypeMixedAnswer[]): ArchetypeMixedResult {
  const scores = {} as Record<ArchetypeMixedType, number>
  const archetypes: ArchetypeMixedType[] = [
    'INNOCENT', 'ORPHAN', 'HERO', 'CAREGIVER', 'EXPLORER', 'REBEL',
    'LOVER', 'CREATOR', 'MAGICIAN', 'SAGE', 'RULER', 'JESTER',
  ]

  // Inicializa todos com 0
  archetypes.forEach((a) => { scores[a] = 0 })

  // Soma pontuações
  answers.forEach(({ questionId, value }) => {
    const q = ARCHETYPE_MIXED_QUESTIONS.find((q) => q.id === questionId)
    if (q) scores[q.archetype] += value
  })

  // Máximo possível: 6 questões × 5 pontos = 30
  const max = 30
  const percentages = {} as Record<ArchetypeMixedType, number>
  archetypes.forEach((a) => {
    percentages[a] = Math.round((scores[a] / max) * 100)
  })

  // Ordena por pontuação
  const sorted = [...archetypes].sort((a, b) => scores[b] - scores[a])
  const dominant = sorted[0]
  const secondary = sorted[1]
  const shadow = sorted[sorted.length - 1]

  return {
    dominant,
    secondary,
    shadow,
    scores,
    percentages,
    report: ARCHETYPE_MIXED_PROFILES[dominant],
    secondaryReport: ARCHETYPE_MIXED_PROFILES[secondary],
  }
}

// ============================================================
// VARIAÇÃO V2 — Reformulações alternativas (mesmos id/archetype)
// ============================================================
export const ARCHETYPE_MIXED_QUESTIONS_V2: ArchetypeMixedQuestion[] = [
  // ── Inocente (INNOCENT) ─────────────────────────────────
  { id: 1,  text: 'Tenho uma tendência natural de assumir que as coisas vão se resolver para o bem no final.', archetype: 'INNOCENT' },
  { id: 2,  text: 'Mesmo diante de situações difíceis, procuro manter uma perspectiva otimista e esperançosa.', archetype: 'INNOCENT' },
  { id: 3,  text: 'Minha postura padrão com pessoas novas é a de abertura e boa fé, antes de ter razões para agir diferente.', archetype: 'INNOCENT' },
  { id: 4,  text: 'Valorizo profundamente a transparência, a pureza de intenção e a ausência de máscaras nas relações.', archetype: 'INNOCENT' },
  { id: 5,  text: 'Acredito que a maioria das pessoas é fundamentalmente boa e que o mundo oferece mais segurança do que ameaça.', archetype: 'INNOCENT' },
  { id: 6,  text: 'Quando surge um conflito, meu impulso é encontrar o que há de bom na situação e buscar paz.', archetype: 'INNOCENT' },

  // ── Cara Comum / Órfão (ORPHAN) ────────────────────────
  { id: 7,  text: 'Para mim, sentir-me parte de algo coletivo é tão importante quanto qualquer realização individual.', archetype: 'ORPHAN' },
  { id: 8,  text: 'Sinto-me mais à vontade quando ninguém está me distinguindo do grupo como especial ou diferente.', archetype: 'ORPHAN' },
  { id: 9,  text: 'Prefiro contribuir como parte do time a ocupar um papel de destaque ou liderança visível.', archetype: 'ORPHAN' },
  { id: 10, text: 'Me conecto mais facilmente com histórias e experiências de pessoas comuns do que de figuras excepcionais.', archetype: 'ORPHAN' },
  { id: 11, text: 'Igualdade é um valor central para mim — não gosto de hierarquias desnecessárias.', archetype: 'ORPHAN' },
  { id: 12, text: 'Valorizo muito a lealdade e o senso de pertencimento a um grupo com o qual me identifico.', archetype: 'ORPHAN' },

  // ── Herói (HERO) ────────────────────────────────────────
  { id: 13, text: 'Quando enfrento desafios, sinto que estou no meu elemento — é como se eu fosse feito para isso.', archetype: 'HERO' },
  { id: 14, text: 'Tenho uma disposição natural de assumir dificuldades que outros evitam.', archetype: 'HERO' },
  { id: 15, text: 'A ideia de fazer diferença no mundo por meio de ação corajosa me motiva profundamente.', archetype: 'HERO' },
  { id: 16, text: 'Em situações de crise, as pessoas ao meu redor costumam me procurar porque sabem que vou agir.', archetype: 'HERO' },
  { id: 17, text: 'Quando vejo injustiça, sinto quase uma obrigação de fazer algo — não consigo simplesmente ignorar.', archetype: 'HERO' },
  { id: 18, text: 'Disciplina e determinação são valores que cultivo conscientemente em mim.', archetype: 'HERO' },

  // ── Cuidador (CAREGIVER) ────────────────────────────────
  { id: 19, text: 'Colocar as necessidades dos outros à frente das minhas parece natural — não é um esforço consciente.', archetype: 'CAREGIVER' },
  { id: 20, text: 'Quando alguém está em dificuldades, sinto um impulso genuíno de oferecer suporte, seja ele qual for.', archetype: 'CAREGIVER' },
  { id: 21, text: 'Cuidar do bem-estar das pessoas ao meu redor é algo que me dá profundo senso de propósito.', archetype: 'CAREGIVER' },
  { id: 22, text: 'Tenho facilidade de perceber quando alguém está sofrendo em silêncio, mesmo que não diga nada.', archetype: 'CAREGIVER' },
  { id: 23, text: 'Criar um ambiente onde as pessoas se sintam seguras e acolhidas é algo que valorizo profundamente.', archetype: 'CAREGIVER' },
  { id: 24, text: 'Já me sacrifiquei de formas que outros considerariam excessivas — mas para mim parecia o certo a fazer.', archetype: 'CAREGIVER' },

  // ── Explorador (EXPLORER) ───────────────────────────────
  { id: 25, text: 'Sinto uma atração constante pelo desconhecido — o que ainda não descobri me chama mais do que o familiar.', archetype: 'EXPLORER' },
  { id: 26, text: 'Regras e estruturas rígidas me sufocam — preciso de espaço para fazer as coisas do meu jeito.', archetype: 'EXPLORER' },
  { id: 27, text: 'A ideia de uma vida sem aventura, surpresa ou descoberta me parece sem propósito.', archetype: 'EXPLORER' },
  { id: 28, text: 'Prefiro descobrir as coisas por mim mesmo a seguir o caminho que outros já percorreram.', archetype: 'EXPLORER' },
  { id: 29, text: 'Mudar de rota no meio do caminho quando descubro algo melhor não me incomoda — me empolga.', archetype: 'EXPLORER' },
  { id: 30, text: 'Liberdade é o valor que, se me tirassem, me deixaria mais incompleto.', archetype: 'EXPLORER' },

  // ── Rebelde (REBEL) ─────────────────────────────────────
  { id: 31, text: 'Quando me deparo com uma regra injusta, meu primeiro instinto é desafiá-la, não obedecê-la.', archetype: 'REBEL' },
  { id: 32, text: 'Prefiro ser fiel ao que acredito a me encaixar nas expectativas de quem está ao meu redor.', archetype: 'REBEL' },
  { id: 33, text: 'Sinto uma energia especial quando estou questionando algo que todos aceitam sem pensar.', archetype: 'REBEL' },
  { id: 34, text: 'Nunca fui de seguir modas ou tendências — crio meu próprio caminho.', archetype: 'REBEL' },
  { id: 35, text: 'A transformação muitas vezes exige ruptura, e não tenho medo de ser o agente dessa ruptura.', archetype: 'REBEL' },
  { id: 36, text: 'Pessoas que se conformam sem questionar me causam uma certa frustração.', archetype: 'REBEL' },

  // ── Amante (LOVER) ──────────────────────────────────────
  { id: 37, text: 'Me entrego de forma total naquilo que amo — seja uma pessoa, uma causa ou um projeto.', archetype: 'LOVER' },
  { id: 38, text: 'A beleza — em qualquer forma — tem um poder real sobre mim: me afeta e me inspira.', archetype: 'LOVER' },
  { id: 39, text: 'Prefiro uma vida intensa e apaixonada a uma segura e sem profundidade emocional.', archetype: 'LOVER' },
  { id: 40, text: 'Conexões superficiais não me satisfazem — preciso de intimidade e profundidade nas relações.', archetype: 'LOVER' },
  { id: 41, text: 'Sou movido por desejo — de criar, de conectar, de experienciar o que há de mais rico na vida.', archetype: 'LOVER' },
  { id: 42, text: 'Quando estou apaixonado por algo, me dedico a isso com uma intensidade que às vezes me surpreende.', archetype: 'LOVER' },

  // ── Criador (CREATOR) ───────────────────────────────────
  { id: 43, text: 'Me sinto mais realizado quando estou criando — dando forma a algo que ainda não existia.', archetype: 'CREATOR' },
  { id: 44, text: 'A possibilidade de construir algo original e duradouro me motiva mais do que qualquer outro objetivo.', archetype: 'CREATOR' },
  { id: 45, text: 'Tenho uma visão estética apurada e me importo profundamente com o cuidado na execução.', archetype: 'CREATOR' },
  { id: 46, text: 'Quando vejo algo feito de forma descuidada ou genérica, sinto um desconforto genuíno.', archetype: 'CREATOR' },
  { id: 47, text: 'Criar algo do nada — seja uma ideia, um produto, uma solução — é onde me sinto mais vivo.', archetype: 'CREATOR' },
  { id: 48, text: 'Quero que o que construo tenha valor além do imediato — que deixe uma marca.', archetype: 'CREATOR' },

  // ── Mago (MAGICIAN) ─────────────────────────────────────
  { id: 49, text: 'Acredito que a consciência e a intenção têm um poder real sobre os resultados da vida.', archetype: 'MAGICIAN' },
  { id: 50, text: 'Consigo ver conexões e padrões que a maioria das pessoas não enxerga à primeira vista.', archetype: 'MAGICIAN' },
  { id: 51, text: 'Temas como transformação, cura e evolução humana me fascinam e me atraem naturalmente.', archetype: 'MAGICIAN' },
  { id: 52, text: 'Me sinto em meu elemento quando estou ajudando alguém a passar por uma transformação profunda.', archetype: 'MAGICIAN' },
  { id: 53, text: 'Acredito que o modo como as pessoas pensam e acreditam molda diretamente a realidade que vivem.', archetype: 'MAGICIAN' },
  { id: 54, text: 'Me atraio por conhecimentos que transcendem o que é popularmente aceito ou ensinado.', archetype: 'MAGICIAN' },

  // ── Sábio (SAGE) ────────────────────────────────────────
  { id: 55, text: 'Antes de agir, preciso entender — a compreensão profunda vem antes da ação para mim.', archetype: 'SAGE' },
  { id: 56, text: 'Aprender e crescer intelectualmente é uma necessidade para mim, não apenas um interesse.', archetype: 'SAGE' },
  { id: 57, text: 'Prefiro explorar todos os ângulos de uma questão antes de formar uma opinião definitiva.', archetype: 'SAGE' },
  { id: 58, text: 'Confio mais em dados, evidências e raciocínio lógico do que em impressões intuitivas.', archetype: 'SAGE' },
  { id: 59, text: 'Ser uma referência de conhecimento e expertise é algo que valorizo profundamente.', archetype: 'SAGE' },
  { id: 60, text: 'Aceitar algo apenas por autoridade — sem entender o porquê — me é quase impossível.', archetype: 'SAGE' },

  // ── Governante (RULER) ──────────────────────────────────
  { id: 61, text: 'Em ambientes sem liderança clara, eu naturalmente começo a preencher esse papel.', archetype: 'RULER' },
  { id: 62, text: 'Sinto um senso de responsabilidade pela ordem, pelos processos e pelas estruturas ao meu redor.', archetype: 'RULER' },
  { id: 63, text: 'Me sinto mais seguro e eficaz quando tenho controle sobre os resultados e os processos.', archetype: 'RULER' },
  { id: 64, text: 'Planejar com antecedência é natural para mim — surpresas desnecessárias me incomodam.', archetype: 'RULER' },
  { id: 65, text: 'Construir algo que dure — um legado, uma instituição, uma cultura forte — é uma das minhas maiores motivações.', archetype: 'RULER' },
  { id: 66, text: 'Sinto responsabilidade pelo sucesso e pelo crescimento das pessoas sob minha liderança.', archetype: 'RULER' },

  // ── Bobo da Corte (JESTER) ──────────────────────────────
  { id: 67, text: 'O humor é uma das minhas ferramentas naturais para criar conexão e aliviar tensão.', archetype: 'JESTER' },
  { id: 68, text: 'Para mim, aproveitar o presente é mais importante do que ficar planejando cada passo do futuro.', archetype: 'JESTER' },
  { id: 69, text: 'Fazer alguém rir ou sorrir é uma das formas mais genuínas de prazer que conheço.', archetype: 'JESTER' },
  { id: 70, text: 'Uma vida leve e prazerosa vale mais para mim do que uma carreira de grande prestígio mas sem alegria.', archetype: 'JESTER' },
  { id: 71, text: 'A leveza e a irreverência são partes fundamentais de quem sou — não consigo levar tudo muito a sério.', archetype: 'JESTER' },
  { id: 72, text: 'Tenho um talento de ver o lado absurdo ou cômico em situações que os outros tratam com excesso de seriedade.', archetype: 'JESTER' },
]

// ============================================================
// VARIAÇÃO V3 — Cenários situacionais (mesmos id/archetype)
// ============================================================
export const ARCHETYPE_MIXED_QUESTIONS_V3: ArchetypeMixedQuestion[] = [
  // ── Inocente (INNOCENT) ─────────────────────────────────
  { id: 1,  text: 'Quando algo dá errado, minha tendência é acreditar que vai se resolver e que o melhor ainda está por vir.', archetype: 'INNOCENT' },
  { id: 2,  text: 'Em situações adversas, você consegue manter a esperança com mais facilidade do que a maioria das pessoas.', archetype: 'INNOCENT' },
  { id: 3,  text: 'Ao conhecer alguém novo, você parte do pressuposto de que a pessoa é honesta até provar o contrário.', archetype: 'INNOCENT' },
  { id: 4,  text: 'Quando alguém é transparente e direto com você, você aprecia muito mais do que qualquer discurso sofisticado.', archetype: 'INNOCENT' },
  { id: 5,  text: 'Você tende a interpretar situações ambíguas de forma positiva em vez de suspeitar do pior.', archetype: 'INNOCENT' },
  { id: 6,  text: 'Diante de um conflito, você busca naturalmente a saída que preserve a harmonia e o bom relacionamento.', archetype: 'INNOCENT' },

  // ── Cara Comum / Órfão (ORPHAN) ────────────────────────
  { id: 7,  text: 'Em um novo grupo, você rapidamente busca formas de se conectar e de se sentir parte.', archetype: 'ORPHAN' },
  { id: 8,  text: 'Quando você se destaca mais do que o grupo, sente um desconforto — prefere que todos brilhem juntos.', archetype: 'ORPHAN' },
  { id: 9,  text: 'Em projetos coletivos, você se sente mais realizado contribuindo como parte do todo do que liderando sozinho.', archetype: 'ORPHAN' },
  { id: 10, text: 'Você se identifica mais com histórias de pessoas comuns superando desafios do que com líderes excepcionais.', archetype: 'ORPHAN' },
  { id: 11, text: 'Quando nota que está sendo tratado de forma diferente dos outros no grupo, sente um desconforto genuíno.', archetype: 'ORPHAN' },
  { id: 12, text: 'Pertencer a um grupo onde você se sente igual e aceito é uma das suas maiores necessidades.', archetype: 'ORPHAN' },

  // ── Herói (HERO) ────────────────────────────────────────
  { id: 13, text: 'Quando uma situação exige coragem e ação, você se sente naturalmente no seu elemento.', archetype: 'HERO' },
  { id: 14, text: 'Você se oferece para assumir os desafios mais difíceis quando vê que ninguém mais está se movendo.', archetype: 'HERO' },
  { id: 15, text: 'Saber que suas ações fazem diferença real para o mundo ou para as pessoas ao redor é o que mais te motiva.', archetype: 'HERO' },
  { id: 16, text: 'Em crises, os outros tendem a olhar para você esperando liderança e ação.', archetype: 'HERO' },
  { id: 17, text: 'Quando presencia uma injustiça, você dificilmente consegue ficar de braços cruzados.', archetype: 'HERO' },
  { id: 18, text: 'Você cultiva disciplina porque sabe que é o que separa quem fala de quem realiza.', archetype: 'HERO' },

  // ── Cuidador (CAREGIVER) ────────────────────────────────
  { id: 19, text: 'Em grupos, você é frequentemente a pessoa que verifica se todos estão bem antes de se preocupar consigo.', archetype: 'CAREGIVER' },
  { id: 20, text: 'Quando alguém ao seu redor está sofrendo, é difícil para você ignorar e seguir em frente.', archetype: 'CAREGIVER' },
  { id: 21, text: 'Saber que contribuiu para o bem-estar de alguém é uma das formas mais profundas de satisfação que conhece.', archetype: 'CAREGIVER' },
  { id: 22, text: 'Você percebe quando alguém está mal mesmo quando essa pessoa não diz nada — é algo quase intuitivo para você.', archetype: 'CAREGIVER' },
  { id: 23, text: 'Em qualquer ambiente que frequenta, você tende a criar um espaço onde os outros se sintam acolhidos.', archetype: 'CAREGIVER' },
  { id: 24, text: 'Já abriu mão de tempo, dinheiro ou energia por alguém que precisava de você — e faria de novo.', archetype: 'CAREGIVER' },

  // ── Explorador (EXPLORER) ───────────────────────────────
  { id: 25, text: 'O que é novo, diferente ou pouco explorado te atrai muito mais do que o que é familiar e seguro.', archetype: 'EXPLORER' },
  { id: 26, text: 'Quando você sente que está sendo limitado por regras ou estruturas rígidas, sente uma necessidade de se libertar.', archetype: 'EXPLORER' },
  { id: 27, text: 'Quando imagina uma vida sem novas descobertas ou experiências, sente uma angústia genuína.', archetype: 'EXPLORER' },
  { id: 28, text: 'Você aprende melhor descobrindo por conta própria do que seguindo um caminho já pavimentado.', archetype: 'EXPLORER' },
  { id: 29, text: 'Quando surge uma oportunidade de rota diferente mais interessante, você muda sem hesitar.', archetype: 'EXPLORER' },
  { id: 30, text: 'Liberdade de escolha e de movimento é algo que você protege com muita atenção na sua vida.', archetype: 'EXPLORER' },

  // ── Rebelde (REBEL) ─────────────────────────────────────
  { id: 31, text: 'Quando vê uma norma que considera injusta, o impulso de desafiá-la é mais forte do que o de cumpri-la.', archetype: 'REBEL' },
  { id: 32, text: 'Você prefere ser você mesmo e sofrer consequências a se moldar às expectativas dos outros.', archetype: 'REBEL' },
  { id: 33, text: 'Questionar o que parece óbvio para todo mundo é algo que você faz naturalmente.', archetype: 'REBEL' },
  { id: 34, text: 'Você constrói seu próprio estilo — nunca se viu simplesmente adotando o que está na moda.', archetype: 'REBEL' },
  { id: 35, text: 'Às vezes a única forma de avançar é quebrar o que está estabelecido, e você não tem medo de fazer isso.', archetype: 'REBEL' },
  { id: 36, text: 'Quando vê pessoas aceitando situações injustas sem questionar, sente frustração ou inquietação.', archetype: 'REBEL' },

  // ── Amante (LOVER) ──────────────────────────────────────
  { id: 37, text: 'Quando se apaixona por algo — seja uma pessoa, ideia ou projeto — você se entrega de forma total.', archetype: 'LOVER' },
  { id: 38, text: 'Ambientes esteticamente ricos — em arte, design, natureza ou qualquer forma de beleza — te afetam profundamente.', archetype: 'LOVER' },
  { id: 39, text: 'Uma vida intensa e cheia de paixão é, para você, muito mais atraente do que uma vida segura e previsível.', archetype: 'LOVER' },
  { id: 40, text: 'Relacionamentos ou conversas sem profundidade emocional real te deixam com uma sensação de vazio.', archetype: 'LOVER' },
  { id: 41, text: 'O desejo de experienciar, criar e conectar é uma força motriz central na sua vida.', archetype: 'LOVER' },
  { id: 42, text: 'Quando algo te apaixona, você se dedica com uma intensidade que às vezes surpreende até você mesmo.', archetype: 'LOVER' },

  // ── Criador (CREATOR) ───────────────────────────────────
  { id: 43, text: 'Você se sente mais vivo quando está criando algo que ainda não existia antes.', archetype: 'CREATOR' },
  { id: 44, text: 'A possibilidade de construir algo original que dure é o que mais te move profissionalmente.', archetype: 'CREATOR' },
  { id: 45, text: 'Você tem um senso estético desenvolvido e se incomoda quando algo é feito de forma descuidada ou genérica.', archetype: 'CREATOR' },
  { id: 46, text: 'Quando vê algo que poderia ser mais bonito, mais funcional ou mais significativo, fica com vontade de refazer.', archetype: 'CREATOR' },
  { id: 47, text: 'Transformar uma ideia bruta em algo real e refinado é o tipo de processo que te dá grande satisfação.', archetype: 'CREATOR' },
  { id: 48, text: 'Você quer que o que você cria tenha valor além do imediato — que deixe uma marca no tempo.', archetype: 'CREATOR' },

  // ── Mago (MAGICIAN) ─────────────────────────────────────
  { id: 49, text: 'Você acredita que uma mudança de perspectiva pode literalmente transformar a realidade de alguém.', archetype: 'MAGICIAN' },
  { id: 50, text: 'Você percebe padrões e dinâmicas ocultas em situações que a maioria das pessoas processa de forma superficial.', archetype: 'MAGICIAN' },
  { id: 51, text: 'Você é atraído por temas como autoconhecimento, evolução humana e transformação.', archetype: 'MAGICIAN' },
  { id: 52, text: 'Quando ajuda alguém a passar por uma virada importante, sente que está no seu melhor.', archetype: 'MAGICIAN' },
  { id: 53, text: 'Para você, o que as pessoas acreditam sobre si mesmas tem um poder direto sobre o que conseguem alcançar.', archetype: 'MAGICIAN' },
  { id: 54, text: 'Você vai buscar conhecimento onde for preciso — inclusive em lugares que estão fora do convencional.', archetype: 'MAGICIAN' },

  // ── Sábio (SAGE) ────────────────────────────────────────
  { id: 55, text: 'Antes de agir, você precisa entender a fundo — agir sem compreensão sólida te deixa desconfortável.', archetype: 'SAGE' },
  { id: 56, text: 'Aprender algo novo ou complexo é uma das experiências que mais te energiza.', archetype: 'SAGE' },
  { id: 57, text: 'Você explora um problema de vários ângulos antes de se comprometer com uma conclusão.', archetype: 'SAGE' },
  { id: 58, text: 'Você confia mais em evidências e análise do que em impressões ou sentimentos ao tomar decisões importantes.', archetype: 'SAGE' },
  { id: 59, text: 'Ser reconhecido pela sua expertise e profundidade de conhecimento é importante para você.', archetype: 'SAGE' },
  { id: 60, text: 'Você tem dificuldade de aceitar afirmações sem embasamento — sempre precisa entender o fundamento.', archetype: 'SAGE' },

  // ── Governante (RULER) ──────────────────────────────────
  { id: 61, text: 'Quando não há liderança clara, você naturalmente começa a organizar e definir a direção.', archetype: 'RULER' },
  { id: 62, text: 'Você sente uma responsabilidade real pela manutenção da ordem e das estruturas nos ambientes em que está.', archetype: 'RULER' },
  { id: 63, text: 'Você funciona melhor quando tem clareza e controle sobre o processo e os resultados.', archetype: 'RULER' },
  { id: 64, text: 'Você planeja com antecedência porque imprevistos desnecessários te custam tempo e energia.', archetype: 'RULER' },
  { id: 65, text: 'Construir algo que dure além de você — uma cultura, uma organização, um legado — é uma das suas grandes motivações.', archetype: 'RULER' },
  { id: 66, text: 'Você assume responsabilidade pelo desenvolvimento e pelo bem-estar das pessoas que lidera.', archetype: 'RULER' },

  // ── Bobo da Corte (JESTER) ──────────────────────────────
  { id: 67, text: 'Em ambientes tensos, você instintivamente usa humor para aliviar a pressão e reconectar as pessoas.', archetype: 'JESTER' },
  { id: 68, text: 'Para você, aproveitar o momento presente é tão ou mais importante do que planejar o futuro.', archetype: 'JESTER' },
  { id: 69, text: 'Fazer alguém rir de verdade é uma das formas de conexão que mais valoriza.', archetype: 'JESTER' },
  { id: 70, text: 'Você escolheria uma vida mais simples e prazerosa a uma carreira de grande prestígio sem alegria.', archetype: 'JESTER' },
  { id: 71, text: 'Você é o tipo de pessoa que raramente leva as coisas a sério demais — a leveza faz parte do seu jeito de ser.', archetype: 'JESTER' },
  { id: 72, text: 'Em situações absurdas ou ridículas, você consegue encontrar o humor onde outros só veem o problema.', archetype: 'JESTER' },
]

// ============================================================
// LOOKUP: versão → conjunto de questões
// ============================================================
export const ARCHETYPE_MIXED_QUESTION_SETS: Record<1 | 2 | 3, ArchetypeMixedQuestion[]> = {
  1: ARCHETYPE_MIXED_QUESTIONS,
  2: ARCHETYPE_MIXED_QUESTIONS_V2,
  3: ARCHETYPE_MIXED_QUESTIONS_V3,
}

/** Deriva a versão a partir do token UUID */
export function getArchetypeMixedVersion(token: string): 1 | 2 | 3 {
  const sum = token.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)
  return ((sum % 3) + 1) as 1 | 2 | 3
}

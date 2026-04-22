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

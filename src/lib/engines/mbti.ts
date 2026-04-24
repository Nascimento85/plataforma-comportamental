// ============================================================
// ENGINE MBTI — Myers-Briggs Type Indicator
// 70 perguntas | 4 dimensões | 16 tipos de personalidade
// ============================================================

export type MbtiDimension = 'EI' | 'SN' | 'TF' | 'JP'
export type MbtiType =
  | 'ENFJ' | 'ENFP' | 'ENTJ' | 'ENTP'
  | 'ESFJ' | 'ESFP' | 'ESTJ' | 'ESTP'
  | 'INFJ' | 'INFP' | 'INTJ' | 'INTP'
  | 'ISFJ' | 'ISFP' | 'ISTJ' | 'ISTP'

export interface MbtiQuestion {
  id: number        // 1-70
  theme: string
  optionA: { text: string; pole: string }
  optionB: { text: string; pole: string }
  dimension: MbtiDimension
}

export interface MbtiAnswer {
  questionId: number
  scoreA: number  // 0-3
  scoreB: number  // 0-3 (scoreA + scoreB = 3)
}

export interface MbtiResult {
  type: MbtiType
  scores: { E: number; I: number; S: number; N: number; T: number; F: number; J: number; P: number }
  percentages: { E: number; I: number; S: number; N: number; T: number; F: number; J: number; P: number }
  report: MbtiTypeReport
}

// ============================================================
// MAPEAMENTO DE PERGUNTAS POR DIMENSÃO
// ============================================================

export const MBTI_DIMENSION_MAP: Record<MbtiDimension, number[]> = {
  EI: [1, 8, 15, 22, 29, 36, 43, 50, 57, 64],
  SN: [3, 10, 16, 17, 23, 24, 30, 31, 37, 38, 44, 45, 51, 52, 58, 59, 65, 66],
  TF: [5, 12, 19, 20, 25, 26, 32, 33, 39, 40, 46, 47, 53, 54, 60, 61, 67, 68],
  JP: [7, 14, 21, 28, 34, 35, 41, 42, 48, 49, 55, 56, 62, 63, 69, 70],
}

// Polo A de cada dimensão
export const MBTI_POLE_A: Record<MbtiDimension, string> = {
  EI: 'E', SN: 'S', TF: 'T', JP: 'J',
}
export const MBTI_POLE_B: Record<MbtiDimension, string> = {
  EI: 'I', SN: 'N', TF: 'F', JP: 'P',
}

// ============================================================
// AS 70 PERGUNTAS
// ============================================================

export const MBTI_QUESTIONS: MbtiQuestion[] = [
  { id: 1, theme: 'Numa festa você:', optionA: { text: 'Interage com muitos, incluindo estranhos', pole: 'E' }, optionB: { text: 'Interage com poucos, apenas conhecidos', pole: 'I' }, dimension: 'EI' },
  { id: 2, theme: 'Você é mais:', optionA: { text: 'Realista', pole: 'S' }, optionB: { text: 'Filosófico', pole: 'N' }, dimension: 'SN' },
  { id: 3, theme: 'Você se interessa mais por:', optionA: { text: 'Fatos', pole: 'S' }, optionB: { text: 'Semelhanças e comparações', pole: 'N' }, dimension: 'SN' },
  { id: 4, theme: 'Normalmente você é:', optionA: { text: 'Justo', pole: 'T' }, optionB: { text: 'Sensível e interessado', pole: 'F' }, dimension: 'TF' },
  { id: 5, theme: 'Você tende a ser mais:', optionA: { text: 'Calculista', pole: 'T' }, optionB: { text: 'Empático', pole: 'F' }, dimension: 'TF' },
  { id: 6, theme: 'Você prefere trabalhar:', optionA: { text: 'Na última hora', pole: 'P' }, optionB: { text: 'A todo tempo', pole: 'J' }, dimension: 'JP' },
  { id: 7, theme: 'Você tende a escolher:', optionA: { text: 'Cuidadosamente', pole: 'J' }, optionB: { text: 'Impulsivamente', pole: 'P' }, dimension: 'JP' },
  { id: 8, theme: 'Nas festas você:', optionA: { text: 'Fica até tarde, com muita disposição', pole: 'E' }, optionB: { text: 'Sai cedo, com pouca disposição', pole: 'I' }, dimension: 'EI' },
  { id: 9, theme: 'Você é uma pessoa mais:', optionA: { text: 'Sensível', pole: 'F' }, optionB: { text: 'Reflexiva', pole: 'T' }, dimension: 'TF' },
  { id: 10, theme: 'Você é mais inclinado a ser:', optionA: { text: 'Objetivo', pole: 'S' }, optionB: { text: 'Abstrato', pole: 'N' }, dimension: 'SN' },
  { id: 11, theme: 'Para você é mais natural ser:', optionA: { text: 'Justo com os outros', pole: 'T' }, optionB: { text: 'Agradável', pole: 'F' }, dimension: 'TF' },
  { id: 12, theme: 'Num primeiro contato com os outros, você é:', optionA: { text: 'Impessoal e desinteressado', pole: 'T' }, optionB: { text: 'Cálido e amigável', pole: 'F' }, dimension: 'TF' },
  { id: 13, theme: 'Você é mais atraído por:', optionA: { text: 'Confirmado e estabelecido', pole: 'S' }, optionB: { text: 'Novo e inédito', pole: 'N' }, dimension: 'SN' },
  { id: 14, theme: 'Você é mais inclinado a:', optionA: { text: 'Não programar antecipadamente', pole: 'P' }, optionB: { text: 'Programar com antecedência', pole: 'J' }, dimension: 'JP' },
  { id: 15, theme: 'Você:', optionA: { text: 'Exprime seus sentimentos livremente', pole: 'E' }, optionB: { text: 'Guarda seus sentimentos', pole: 'I' }, dimension: 'EI' },
  { id: 16, theme: 'Você prefere:', optionA: { text: 'Senso comum e prático', pole: 'S' }, optionB: { text: 'Intuitivo e especulativo', pole: 'N' }, dimension: 'SN' },
  { id: 17, theme: 'Você é mais naturalmente:', optionA: { text: 'Criativo', pole: 'N' }, optionB: { text: 'Metódico', pole: 'S' }, dimension: 'SN' },
  { id: 18, theme: 'Você é mais eficaz ao:', optionA: { text: 'Promover e negociar', pole: 'E' }, optionB: { text: 'Organizar e estruturar', pole: 'I' }, dimension: 'EI' },
  { id: 19, theme: 'Ao resolver problemas você é mais:', optionA: { text: 'Analítico', pole: 'T' }, optionB: { text: 'Simpático', pole: 'F' }, dimension: 'TF' },
  { id: 20, theme: 'Com uma situação que requer disciplina você é:', optionA: { text: 'Rigoroso e exigente', pole: 'T' }, optionB: { text: 'Compreensivo e paciente', pole: 'F' }, dimension: 'TF' },
  { id: 21, theme: 'Você normalmente prefere:', optionA: { text: 'Rapidamente concordar com um horário', pole: 'J' }, optionB: { text: 'Relutar em aceitar um horário', pole: 'P' }, dimension: 'JP' },
  { id: 22, theme: 'Ao ligar para alguém você:', optionA: { text: 'Apenas começa falando', pole: 'E' }, optionB: { text: 'Prepara o que irá dizer', pole: 'I' }, dimension: 'EI' },
  { id: 23, theme: 'Fatos:', optionA: { text: 'Falam por eles mesmos', pole: 'S' }, optionB: { text: 'Normalmente requerem interpretação', pole: 'N' }, dimension: 'SN' },
  { id: 24, theme: 'Você prefere trabalhar com:', optionA: { text: 'Informações práticas', pole: 'S' }, optionB: { text: 'Ideias abstratas', pole: 'N' }, dimension: 'SN' },
  { id: 25, theme: 'Você é mais inclinado a ser uma pessoa:', optionA: { text: 'Fria', pole: 'T' }, optionB: { text: 'Calorosa', pole: 'F' }, dimension: 'TF' },
  { id: 26, theme: 'Você preferiria ser:', optionA: { text: 'Mais justo que misericordioso', pole: 'T' }, optionB: { text: 'Mais misericordioso que justo', pole: 'F' }, dimension: 'TF' },
  { id: 27, theme: 'Você se sente mais confortável:', optionA: { text: 'Cumprindo um cronograma', pole: 'J' }, optionB: { text: 'Colocando-as de lado', pole: 'P' }, dimension: 'JP' },
  { id: 28, theme: 'Você se sente mais confortável com:', optionA: { text: 'Acordos escritos', pole: 'J' }, optionB: { text: 'Acordos de palavra', pole: 'P' }, dimension: 'JP' },
  { id: 29, theme: 'Quando na companhia de alguém você:', optionA: { text: 'Inicia as conversas', pole: 'E' }, optionB: { text: 'Espera ser abordado', pole: 'I' }, dimension: 'EI' },
  { id: 30, theme: 'O senso comum tradicional é:', optionA: { text: 'Normalmente confiável', pole: 'S' }, optionB: { text: 'Frequentemente enganoso', pole: 'N' }, dimension: 'SN' },
  { id: 31, theme: 'As crianças normalmente:', optionA: { text: 'Fazem-se suficientemente úteis', pole: 'S' }, optionB: { text: 'Sonham o bastante', pole: 'N' }, dimension: 'SN' },
  { id: 32, theme: 'Você normalmente é mais:', optionA: { text: 'De caráter forte', pole: 'T' }, optionB: { text: 'Gentil', pole: 'F' }, dimension: 'TF' },
  { id: 33, theme: 'Você é mais inclinado a:', optionA: { text: 'Julgar', pole: 'T' }, optionB: { text: 'Persuadir', pole: 'F' }, dimension: 'TF' },
  { id: 34, theme: 'Você é mais inclinado a:', optionA: { text: 'Programar a viagem antecipadamente', pole: 'J' }, optionB: { text: 'Não programar a viagem', pole: 'P' }, dimension: 'JP' },
  { id: 35, theme: 'Você é mais inclinado a:', optionA: { text: 'Não gostar de imprevistos', pole: 'J' }, optionB: { text: 'Estar aberto a imprevistos', pole: 'P' }, dimension: 'JP' },
  { id: 36, theme: 'Você:', optionA: { text: 'Fala fácil e longamente com desconhecidos', pole: 'E' }, optionB: { text: 'Não tem muito que dizer a desconhecidos', pole: 'I' }, dimension: 'EI' },
  { id: 37, theme: 'Você é mais atraído a:', optionA: { text: 'Informações substanciais', pole: 'S' }, optionB: { text: 'Suposições confiáveis', pole: 'N' }, dimension: 'SN' },
  { id: 38, theme: 'Você é mais atraído a:', optionA: { text: 'Princípios', pole: 'S' }, optionB: { text: 'Emoções', pole: 'N' }, dimension: 'SN' },
  { id: 39, theme: 'Você considera mais importante:', optionA: { text: 'Lógica', pole: 'T' }, optionB: { text: 'Sentimento', pole: 'F' }, dimension: 'TF' },
  { id: 40, theme: 'Você é mais inclinado a:', optionA: { text: 'Questionar os outros', pole: 'T' }, optionB: { text: 'Ser tolerante com os outros', pole: 'F' }, dimension: 'TF' },
  { id: 41, theme: 'Você se sente mais confortável com um trabalho:', optionA: { text: 'Contratado', pole: 'J' }, optionB: { text: 'Feito de forma casual', pole: 'P' }, dimension: 'JP' },
  { id: 42, theme: 'Você prefere que as coisas sejam:', optionA: { text: 'Certas e ordenadas', pole: 'J' }, optionB: { text: 'Opcionais', pole: 'P' }, dimension: 'JP' },
  { id: 43, theme: 'Você prefere:', optionA: { text: 'Muitos amigos com breves contatos', pole: 'E' }, optionB: { text: 'Poucos amigos com contato mais longo', pole: 'I' }, dimension: 'EI' },
  { id: 44, theme: 'Você é mais atraído a:', optionA: { text: 'Informações substanciais', pole: 'S' }, optionB: { text: 'Suposições confiáveis', pole: 'N' }, dimension: 'SN' },
  { id: 45, theme: 'Você se interessa mais em:', optionA: { text: 'Produção', pole: 'S' }, optionB: { text: 'Pesquisas', pole: 'N' }, dimension: 'SN' },
  { id: 46, theme: 'Você se sente mais confortável sendo:', optionA: { text: 'Objetivo', pole: 'T' }, optionB: { text: 'Pessoal', pole: 'F' }, dimension: 'TF' },
  { id: 47, theme: 'Você se avalia como uma pessoa que é mais:', optionA: { text: 'Indisposta', pole: 'T' }, optionB: { text: 'Dedicada e esforçada', pole: 'F' }, dimension: 'TF' },
  { id: 48, theme: 'Você fica mais confortável com uma:', optionA: { text: 'Opinião final', pole: 'J' }, optionB: { text: 'Opinião incerta', pole: 'P' }, dimension: 'JP' },
  { id: 49, theme: 'Você fica mais confortável:', optionA: { text: 'Após uma decisão', pole: 'J' }, optionB: { text: 'Antes de uma decisão', pole: 'P' }, dimension: 'JP' },
  { id: 50, theme: 'Você:', optionA: { text: 'Fala fácil e longamente com desconhecidos', pole: 'E' }, optionB: { text: 'Não tem muito que dizer a desconhecidos', pole: 'I' }, dimension: 'EI' },
  { id: 51, theme: 'Você normalmente é mais interessado em:', optionA: { text: 'Um fato isolado', pole: 'S' }, optionB: { text: 'Um caso geral', pole: 'N' }, dimension: 'SN' },
  { id: 52, theme: 'Você se sente:', optionA: { text: 'Mais prático do que engenhoso', pole: 'S' }, optionB: { text: 'Mais engenhoso do que prático', pole: 'N' }, dimension: 'SN' },
  { id: 53, theme: 'Ao decidir você é mais:', optionA: { text: 'Imparcial', pole: 'T' }, optionB: { text: 'Parcial', pole: 'F' }, dimension: 'TF' },
  { id: 54, theme: 'Você prefere:', optionA: { text: 'Justiça acima de misericórdia', pole: 'T' }, optionB: { text: 'Misericórdia acima de justiça', pole: 'F' }, dimension: 'TF' },
  { id: 55, theme: 'Você é mais inclinado a:', optionA: { text: 'Agir de acordo com regras', pole: 'J' }, optionB: { text: 'Confiar em seus instintos', pole: 'P' }, dimension: 'JP' },
  { id: 56, theme: 'Você prefere:', optionA: { text: 'Seguir uma rotina', pole: 'J' }, optionB: { text: 'Improvisar', pole: 'P' }, dimension: 'JP' },
  { id: 57, theme: 'Você é uma pessoa:', optionA: { text: 'Aberta', pole: 'E' }, optionB: { text: 'Reservada', pole: 'I' }, dimension: 'EI' },
  { id: 58, theme: 'Você é mais inclinado a ser:', optionA: { text: 'Concreto', pole: 'S' }, optionB: { text: 'Abstrato', pole: 'N' }, dimension: 'SN' },
  { id: 59, theme: 'Você é mais inclinado a ser:', optionA: { text: 'Convencional', pole: 'S' }, optionB: { text: 'Excêntrico', pole: 'N' }, dimension: 'SN' },
  { id: 60, theme: 'Você é mais inclinado a:', optionA: { text: 'Organizar as atividades', pole: 'J' }, optionB: { text: 'Pegar as coisas quando elas vêm', pole: 'P' }, dimension: 'JP' },
  { id: 61, theme: 'Você considera a si mesmo uma pessoa:', optionA: { text: 'Capaz de pensar claramente', pole: 'T' }, optionB: { text: 'De boa intenção', pole: 'F' }, dimension: 'TF' },
  { id: 62, theme: 'Você é mais tendencioso a:', optionA: { text: 'Organizar as atividades', pole: 'J' }, optionB: { text: 'Pegar as coisas quando elas vêm', pole: 'P' }, dimension: 'JP' },
  { id: 63, theme: 'Você é uma pessoa que é mais:', optionA: { text: 'Sistemática', pole: 'J' }, optionB: { text: 'Imprevisível', pole: 'P' }, dimension: 'JP' },
  { id: 64, theme: 'Você é mais inclinado a ser:', optionA: { text: 'De fácil acesso', pole: 'E' }, optionB: { text: 'De certa forma reservado', pole: 'I' }, dimension: 'EI' },
  { id: 65, theme: 'Você se diverte mais com:', optionA: { text: 'Experiências palpáveis', pole: 'S' }, optionB: { text: 'Imaginações', pole: 'N' }, dimension: 'SN' },
  { id: 66, theme: 'Você prefere:', optionA: { text: 'Algo mais literal', pole: 'S' }, optionB: { text: 'Algo mais figurativo', pole: 'N' }, dimension: 'SN' },
  { id: 67, theme: 'Normalmente você é mais:', optionA: { text: 'Imparcial', pole: 'T' }, optionB: { text: 'Compassivo', pole: 'F' }, dimension: 'TF' },
  { id: 68, theme: 'Tipicamente você é mais:', optionA: { text: 'Justo do que bondoso', pole: 'T' }, optionB: { text: 'Bondoso do que justo', pole: 'F' }, dimension: 'TF' },
  { id: 69, theme: 'É mais parecido com você:', optionA: { text: 'Fazer rápidos juízos', pole: 'J' }, optionB: { text: 'Demorar-se em fazer julgamentos', pole: 'P' }, dimension: 'JP' },
  { id: 70, theme: 'Você tende a ser mais:', optionA: { text: 'Deliberado do que espontâneo', pole: 'J' }, optionB: { text: 'Espontâneo do que deliberado', pole: 'P' }, dimension: 'JP' },
]

// ============================================================
// OS 16 TIPOS COM NOMES CUSTOMIZADOS
// ============================================================

export interface MbtiTypeReport {
  type: MbtiType
  name: string
  tagline: string
  description: string
  strengths: string[]
  weaknesses: string[]
  careers: string[]
}

export const MBTI_TYPES: Record<MbtiType, MbtiTypeReport> = {
  ENFJ: { type: 'ENFJ', name: 'O Mentor', tagline: 'Protagonista', description: 'Líderes carismáticos e inspiradores, capazes de motivar seus liderados.', strengths: ['Empático', 'Confiável', 'Carismático', 'Altruísta'], weaknesses: ['Excessivamente idealista', 'Condescendente', 'Intenso'], careers: ['Treinador', 'Professor', 'Gerente', 'Orientador'] },
  ENFP: { type: 'ENFP', name: 'O Inspirador', tagline: 'Ativista', description: 'Espíritos livres e criativos que veem vida como cheia de possibilidades.', strengths: ['Curioso', 'Perspicaz', 'Energético', 'Otimista'], weaknesses: ['Dificuldade de foco', 'Hipersensível', 'Procrastinador'], careers: ['Jornalista', 'Ator', 'Consultor', 'Psicólogo'] },
  ENTJ: { type: 'ENTJ', name: 'O Imperador', tagline: 'Comandante', description: 'Líderes natos com habilidade de reunir pessoas em torno de um objetivo.', strengths: ['Eficiente', 'Confiante', 'Estratégico', 'Carismático'], weaknesses: ['Teimoso', 'Dominador', 'Intolerante'], careers: ['CEO', 'Advogado', 'Gestor', 'Empresário'] },
  ENTP: { type: 'ENTP', name: 'O Inovador', tagline: 'Debatedor', description: 'Pensadores rápidos e engenhosos, sempre em busca de novas ideias.', strengths: ['Inovador', 'Estratégico', 'Carismático', 'Direto'], weaknesses: ['Argumentativo', 'Intolerante', 'Procrastinador'], careers: ['Empreendedor', 'Advogado', 'Analista', 'Engenheiro'] },
  ESFJ: { type: 'ESFJ', name: 'O Cônsul', tagline: 'Provedor', description: 'Pessoas que se importam muito com os outros e com a harmonia social.', strengths: ['Atencioso', 'Leal', 'Sensível', 'Organizado'], weaknesses: ['Necessita de aprovação', 'Inflexível', 'Vulnerável à crítica'], careers: ['Enfermeiro', 'Professor', 'RH', 'Assistente Social'] },
  ESFP: { type: 'ESFP', name: 'O Motivador', tagline: 'Animador', description: 'Espontâneos, enérgicos e entusiásticos — a vida nunca é entediante perto deles.', strengths: ['Ousado', 'Original', 'Estético', 'Prático'], weaknesses: ['Sensível', 'Entediável', 'Impulsivo'], careers: ['Artista', 'Músico', 'Ator', 'Vendedor'] },
  ESTJ: { type: 'ESTJ', name: 'O Executivo', tagline: 'Supervisor', description: 'Gestores naturais que prezam pela tradição, ordem e regras claras.', strengths: ['Dedicado', 'Organizado', 'Honesto', 'Paciente'], weaknesses: ['Inflexível', 'Obstinado', 'Difícil de relaxar'], careers: ['Gerente', 'Policial', 'Juiz', 'Militar'] },
  ESTP: { type: 'ESTP', name: 'O Empreendedor', tagline: 'Promotor', description: 'Pessoas que preferem ação a reflexão, com olho aguçado para oportunidades.', strengths: ['Ousado', 'Racional', 'Direto', 'Sociável'], weaknesses: ['Impaciente', 'Arriscado', 'Não estruturado'], careers: ['Empreendedor', 'Vendedor', 'Atleta', 'Policial'] },
  INFJ: { type: 'INFJ', name: 'O Conselheiro', tagline: 'Defensor', description: 'Silenciosos e místicos, com grande criatividade e princípios fortes.', strengths: ['Criativo', 'Perspicaz', 'Principiado', 'Apaixonado'], weaknesses: ['Sensível à crítica', 'Introvertido em excesso', 'Perfeccionista'], careers: ['Escritor', 'Conselheiro', 'Psicólogo', 'Médico'] },
  INFP: { type: 'INFP', name: 'O Integrador', tagline: 'Mediador', description: 'Idealistas poéticos e gentis, sempre prontos para uma boa causa.', strengths: ['Empático', 'Generoso', 'Criativo', 'Apaixonado'], weaknesses: ['Irrealista', 'Isolado', 'Autocrático'], careers: ['Escritor', 'Artista', 'Psicólogo', 'Músico'] },
  INTJ: { type: 'INTJ', name: 'O Estrategista', tagline: 'Arquiteto', description: 'Mentes imaginativas e estratégicas, com planos para tudo.', strengths: ['Estratégico', 'Confiante', 'Independente', 'Decisivo'], weaknesses: ['Arrogante', 'Crítico', 'Perfeccionista', 'Distante'], careers: ['Cientista', 'Engenheiro', 'Estrategista', 'Programador'] },
  INTP: { type: 'INTP', name: 'O Pragmático', tagline: 'Lógico', description: 'Inventores inovadores com grande capacidade para análise e ideias originais.', strengths: ['Analítico', 'Objetivo', 'Honesto', 'Imaginativo'], weaknesses: ['Insensível', 'Distraído', 'Procrastinador'], careers: ['Analista', 'Programador', 'Professor', 'Pesquisador'] },
  ISFJ: { type: 'ISFJ', name: 'O Defensor', tagline: 'Protetor', description: 'Pessoas muito dedicadas e calorosas, prontas para proteger quem amam.', strengths: ['Solidário', 'Confiável', 'Paciente', 'Observador'], weaknesses: ['Humilde demais', 'Reprime sentimentos', 'Sobrecarregado'], careers: ['Enfermeiro', 'Professor', 'Administrador', 'Contador'] },
  ISFP: { type: 'ISFP', name: 'O Audacioso', tagline: 'Aventureiro', description: 'Artistas flexíveis e encantadores, sempre prontos para explorar e experimentar.', strengths: ['Criativo', 'Sensitivo', 'Imaginativo', 'Passional'], weaknesses: ['Imprevisível', 'Estressado', 'Overly competitive'], careers: ['Artista', 'Músico', 'Chef', 'Designer'] },
  ISTJ: { type: 'ISTJ', name: 'O Maestro', tagline: 'Inspector', description: 'Indivíduos práticos e responsáveis, na quem se pode sempre contar.', strengths: ['Honesto', 'Íntegro', 'Prático', 'Metódico'], weaknesses: ['Insensível', 'Teimoso', 'Julgador'], careers: ['Contador', 'Auditor', 'Gerente', 'Militar'] },
  ISTP: { type: 'ISTP', name: 'O Cirúrgico', tagline: 'Artesão', description: 'Experimentadores ousados e práticos com domínio de ferramentas e técnicas.', strengths: ['Otimista', 'Criativo', 'Prático', 'Leal'], weaknesses: ['Reservado', 'Insensível', 'Entediável'], careers: ['Mecânico', 'Engenheiro', 'Piloto', 'Programador'] },
}

// ============================================================
// FUNÇÃO PRINCIPAL DE CÁLCULO
// ============================================================

export function calculateMBTI(answers: MbtiAnswer[]): MbtiResult {
  if (answers.length !== 70) throw new Error('O teste MBTI requer exatamente 70 respostas.')

  const scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 }

  for (const answer of answers) {
    if (answer.scoreA + answer.scoreB !== 3) throw new Error(`Questão ${answer.questionId}: soma deve ser 3`)

    const question = MBTI_QUESTIONS.find(q => q.id === answer.questionId)
    if (!question) throw new Error(`Questão ${answer.questionId} não encontrada`)

    const poleA = question.optionA.pole as keyof typeof scores
    const poleB = question.optionB.pole as keyof typeof scores

    scores[poleA] += answer.scoreA
    scores[poleB] += answer.scoreB
  }

  const totals = { EI: scores.E + scores.I, SN: scores.S + scores.N, TF: scores.T + scores.F, JP: scores.J + scores.P }

  const percentages = {
    E: parseFloat((scores.E / totals.EI).toFixed(4)),
    I: parseFloat((scores.I / totals.EI).toFixed(4)),
    S: parseFloat((scores.S / totals.SN).toFixed(4)),
    N: parseFloat((scores.N / totals.SN).toFixed(4)),
    T: parseFloat((scores.T / totals.TF).toFixed(4)),
    F: parseFloat((scores.F / totals.TF).toFixed(4)),
    J: parseFloat((scores.J / totals.JP).toFixed(4)),
    P: parseFloat((scores.P / totals.JP).toFixed(4)),
  }

  const type = [
    scores.E >= scores.I ? 'E' : 'I',
    scores.S >= scores.N ? 'S' : 'N',
    scores.T >= scores.F ? 'T' : 'F',
    scores.J >= scores.P ? 'J' : 'P',
  ].join('') as MbtiType

  return { type, scores, percentages, report: MBTI_TYPES[type] }
}

// ============================================================
// QUESTÕES V2 — mesmas dimensões e polos, formulação alternativa
// ============================================================
export const MBTI_QUESTIONS_V2: MbtiQuestion[] = [
  { id: 1,  theme: 'Em um evento social você tende a:', optionA: { text: 'Circular e conhecer novas pessoas', pole: 'E' }, optionB: { text: 'Preferir conversar profundamente com poucos', pole: 'I' }, dimension: 'EI' },
  { id: 2,  theme: 'Ao resolver um problema, você se apoia mais em:', optionA: { text: 'Experiências concretas e comprovadas', pole: 'S' }, optionB: { text: 'Intuição e possibilidades futuras', pole: 'N' }, dimension: 'SN' },
  { id: 3,  theme: 'Você aprende melhor por meio de:', optionA: { text: 'Exemplos práticos e tangíveis', pole: 'S' }, optionB: { text: 'Conceitos e teorias abstratas', pole: 'N' }, dimension: 'SN' },
  { id: 4,  theme: 'Quando alguém age injustamente, você:', optionA: { text: 'Avalia o comportamento com imparcialidade', pole: 'T' }, optionB: { text: 'Sente empatia pela pessoa envolvida', pole: 'F' }, dimension: 'TF' },
  { id: 5,  theme: 'Em conflitos, você costuma:', optionA: { text: 'Buscar a solução mais lógica e justa', pole: 'T' }, optionB: { text: 'Priorizar o impacto emocional das partes', pole: 'F' }, dimension: 'TF' },
  { id: 6,  theme: 'Em relação a planos e agenda, você:', optionA: { text: 'Prefere deixar as coisas fluírem naturalmente', pole: 'P' }, optionB: { text: 'Gosta de ter tudo definido com antecedência', pole: 'J' }, dimension: 'JP' },
  { id: 7,  theme: 'Ao fazer escolhas, você normalmente:', optionA: { text: 'Pondera bem antes de decidir', pole: 'J' }, optionB: { text: 'Age pela intuição do momento', pole: 'P' }, dimension: 'JP' },
  { id: 8,  theme: 'Depois de uma festa longa, você:', optionA: { text: 'Fica energizado e animado', pole: 'E' }, optionB: { text: 'Precisa de tempo sozinho para recarregar', pole: 'I' }, dimension: 'EI' },
  { id: 9,  theme: 'Para você, amizade verdadeira envolve:', optionA: { text: 'Companheirismo e lealdade genuína', pole: 'F' }, optionB: { text: 'Respeito mútuo e honestidade direta', pole: 'T' }, dimension: 'TF' },
  { id: 10, theme: 'Você se descreve como mais:', optionA: { text: 'Prático e focado no que é real', pole: 'S' }, optionB: { text: 'Visionário e focado no que pode ser', pole: 'N' }, dimension: 'SN' },
  { id: 11, theme: 'Ao dar feedback a alguém, você:', optionA: { text: 'É direto e objetivo, mesmo que doa', pole: 'T' }, optionB: { text: 'Cuida da forma para não magoar', pole: 'F' }, dimension: 'TF' },
  { id: 12, theme: 'Em situações novas com pessoas desconhecidas, você é:', optionA: { text: 'Mais distante e analítico', pole: 'T' }, optionB: { text: 'Caloroso e atencioso desde o início', pole: 'F' }, dimension: 'TF' },
  { id: 13, theme: 'Você se sente mais à vontade com:', optionA: { text: 'Métodos testados e comprovados', pole: 'S' }, optionB: { text: 'Abordagens inovadoras e inéditas', pole: 'N' }, dimension: 'SN' },
  { id: 14, theme: 'Na sua agenda do dia, você:', optionA: { text: 'Improvisa conforme o dia vai passando', pole: 'P' }, optionB: { text: 'Organiza as tarefas com antecedência', pole: 'J' }, dimension: 'JP' },
  { id: 15, theme: 'Em relação às suas emoções, você:', optionA: { text: 'Costuma expressá-las abertamente', pole: 'E' }, optionB: { text: 'Prefere guardá-las para si', pole: 'I' }, dimension: 'EI' },
  { id: 16, theme: 'Você valoriza mais:', optionA: { text: 'Informações concretas e verificáveis', pole: 'S' }, optionB: { text: 'Ideias e possibilidades a explorar', pole: 'N' }, dimension: 'SN' },
  { id: 17, theme: 'Ao lidar com um projeto, você prefere:', optionA: { text: 'Criar algo novo e explorar caminhos', pole: 'N' }, optionB: { text: 'Seguir um processo estruturado', pole: 'S' }, dimension: 'SN' },
  { id: 18, theme: 'No trabalho, você se destaca mais em:', optionA: { text: 'Conectar pessoas e liderar grupos', pole: 'E' }, optionB: { text: 'Trabalhos analíticos e individuais', pole: 'I' }, dimension: 'EI' },
  { id: 19, theme: 'Ao tomar decisões difíceis, você:', optionA: { text: 'Baseia-se na lógica e nos fatos', pole: 'T' }, optionB: { text: 'Leva em conta os sentimentos envolvidos', pole: 'F' }, dimension: 'TF' },
  { id: 20, theme: 'Com pessoas que erram repetidamente, você:', optionA: { text: 'Cobra diretamente e estabelece limites', pole: 'T' }, optionB: { text: 'Tenta entender a causa e oferecer apoio', pole: 'F' }, dimension: 'TF' },
  { id: 21, theme: 'Quando alguém propõe um encontro, você:', optionA: { text: 'Confirma imediatamente e bloqueia a agenda', pole: 'J' }, optionB: { text: 'Tende a adiar a confirmação', pole: 'P' }, dimension: 'JP' },
  { id: 22, theme: 'Antes de fazer uma ligação importante, você:', optionA: { text: 'Liga sem preparação prévia', pole: 'E' }, optionB: { text: 'Pensa no que vai dizer', pole: 'I' }, dimension: 'EI' },
  { id: 23, theme: 'Para você, um bom relatório é aquele que:', optionA: { text: 'Apresenta dados concretos e mensuráveis', pole: 'S' }, optionB: { text: 'Explora padrões, tendências e interpretações', pole: 'N' }, dimension: 'SN' },
  { id: 24, theme: 'Você prefere projetos que:', optionA: { text: 'Resolvem problemas concretos do dia a dia', pole: 'S' }, optionB: { text: 'Exploram possibilidades e cenários futuros', pole: 'N' }, dimension: 'SN' },
  { id: 25, theme: 'Em discussões acaloradas, você tende a ser:', optionA: { text: 'Frio e imparcial', pole: 'T' }, optionB: { text: 'Empático e compreensivo', pole: 'F' }, dimension: 'TF' },
  { id: 26, theme: 'Na hora de julgar alguém, você prefere ser:', optionA: { text: 'Justo, mesmo que seja difícil para a pessoa', pole: 'T' }, optionB: { text: 'Compassivo, mesmo que não seja totalmente justo', pole: 'F' }, dimension: 'TF' },
  { id: 27, theme: 'Em relação a compromissos, você:', optionA: { text: 'Gosta de ter tudo agendado e definido', pole: 'J' }, optionB: { text: 'Prefere manter a agenda aberta e flexível', pole: 'P' }, dimension: 'JP' },
  { id: 28, theme: 'Você se sente mais seguro com:', optionA: { text: 'Acordos formalizados e documentados', pole: 'J' }, optionB: { text: 'Combinações informais baseadas em confiança', pole: 'P' }, dimension: 'JP' },
  { id: 29, theme: 'Em situações novas com outras pessoas, você:', optionA: { text: 'Toma a iniciativa de puxar conversa', pole: 'E' }, optionB: { text: 'Espera que o outro se aproxime', pole: 'I' }, dimension: 'EI' },
  { id: 30, theme: 'Você considera que experiências passadas:', optionA: { text: 'São guias confiáveis para o presente', pole: 'S' }, optionB: { text: 'Devem ser questionadas diante do novo', pole: 'N' }, dimension: 'SN' },
  { id: 31, theme: 'O que você valoriza mais em um livro infantil:', optionA: { text: 'Lições práticas de comportamento', pole: 'S' }, optionB: { text: 'Imaginação e mundos fantásticos', pole: 'N' }, dimension: 'SN' },
  { id: 32, theme: 'Você se vê como alguém mais:', optionA: { text: 'Determinado e firme em suas posições', pole: 'T' }, optionB: { text: 'Gentil e atencioso com os outros', pole: 'F' }, dimension: 'TF' },
  { id: 33, theme: 'Ao avaliar um trabalho de outra pessoa, você:', optionA: { text: 'Dá um parecer técnico objetivo', pole: 'T' }, optionB: { text: 'Considera o esforço e o contexto', pole: 'F' }, dimension: 'TF' },
  { id: 34, theme: 'Ao planejar uma viagem, você:', optionA: { text: 'Define roteiro completo com antecedência', pole: 'J' }, optionB: { text: 'Descobre o destino no próprio caminho', pole: 'P' }, dimension: 'JP' },
  { id: 35, theme: 'Quando algo inesperado acontece nos seus planos, você:', optionA: { text: 'Fica desconfortável e tenta restabelecer a ordem', pole: 'J' }, optionB: { text: 'Vê como uma oportunidade nova', pole: 'P' }, dimension: 'JP' },
  { id: 36, theme: 'Em grupos de trabalho, você:', optionA: { text: 'Contribui bastante, fala e anima o grupo', pole: 'E' }, optionB: { text: 'Prefere ouvir e contribuir com qualidade', pole: 'I' }, dimension: 'EI' },
  { id: 37, theme: 'Você confia mais em decisões baseadas em:', optionA: { text: 'Dados e evidências reais', pole: 'S' }, optionB: { text: 'Padrões e insights intuitivos', pole: 'N' }, dimension: 'SN' },
  { id: 38, theme: 'O que mais te move é:', optionA: { text: 'Resultados concretos e mensuráveis', pole: 'S' }, optionB: { text: 'Impacto mais amplo e transformador', pole: 'N' }, dimension: 'SN' },
  { id: 39, theme: 'Para você, uma boa decisão deve ser:', optionA: { text: 'Racional e bem fundamentada', pole: 'T' }, optionB: { text: 'Humana e considerar o impacto emocional', pole: 'F' }, dimension: 'TF' },
  { id: 40, theme: 'Você é mais inclinado a:', optionA: { text: 'Cobrar os outros quando necessário', pole: 'T' }, optionB: { text: 'Evitar tensão e ser mais compreensivo', pole: 'F' }, dimension: 'TF' },
  { id: 41, theme: 'Você prefere trabalhos:', optionA: { text: 'Com prazo e escopo definidos', pole: 'J' }, optionB: { text: 'Abertos, com espaço para improvisação', pole: 'P' }, dimension: 'JP' },
  { id: 42, theme: 'Para você, um espaço de trabalho ideal é:', optionA: { text: 'Organizado e com lugar certo para tudo', pole: 'J' }, optionB: { text: 'Flexível, podendo mudar conforme a necessidade', pole: 'P' }, dimension: 'JP' },
  { id: 43, theme: 'Você prefere ter:', optionA: { text: 'Uma rede ampla de contatos', pole: 'E' }, optionB: { text: 'Poucos amigos muito próximos', pole: 'I' }, dimension: 'EI' },
  { id: 44, theme: 'Ao estudar algo novo, você prefere:', optionA: { text: 'Aplicações práticas e hands-on', pole: 'S' }, optionB: { text: 'A teoria por trás, o conceito maior', pole: 'N' }, dimension: 'SN' },
  { id: 45, theme: 'Você se sente mais realizado com:', optionA: { text: 'Resultados tangíveis e concretos', pole: 'S' }, optionB: { text: 'Descobertas e avanços no conhecimento', pole: 'N' }, dimension: 'SN' },
  { id: 46, theme: 'Ao trabalhar com outras pessoas, você prefere ser:', optionA: { text: 'Imparcial e coerente nas regras', pole: 'T' }, optionB: { text: 'Sensível às necessidades individuais', pole: 'F' }, dimension: 'TF' },
  { id: 47, theme: 'Você se sente mais orgulhoso quando:', optionA: { text: 'Alcança resultados com eficiência', pole: 'T' }, optionB: { text: 'Cuida das pessoas e é reconhecido por isso', pole: 'F' }, dimension: 'TF' },
  { id: 48, theme: 'Você prefere receber instruções:', optionA: { text: 'Claras, definidas e sem ambiguidade', pole: 'J' }, optionB: { text: 'Abertas, deixando espaço para criatividade', pole: 'P' }, dimension: 'JP' },
  { id: 49, theme: 'Você é mais confortável:', optionA: { text: 'Quando a decisão já foi tomada', pole: 'J' }, optionB: { text: 'Enquanto ainda está pesando as opções', pole: 'P' }, dimension: 'JP' },
  { id: 50, theme: 'No seu grupo de amigos, você geralmente:', optionA: { text: 'Propõe atividades e reúne as pessoas', pole: 'E' }, optionB: { text: 'Aguarda o convite dos outros', pole: 'I' }, dimension: 'EI' },
  { id: 51, theme: 'Ao descrever algo, você tende a:', optionA: { text: 'Usar exemplos específicos e detalhados', pole: 'S' }, optionB: { text: 'Falar em termos amplos e metafóricos', pole: 'N' }, dimension: 'SN' },
  { id: 52, theme: 'Você se define mais como:', optionA: { text: 'Realista e com os pés no chão', pole: 'S' }, optionB: { text: 'Imaginativo e com a cabeça nas nuvens', pole: 'N' }, dimension: 'SN' },
  { id: 53, theme: 'Para você, a melhor decisão é aquela que:', optionA: { text: 'Segue critérios objetivos e consistentes', pole: 'T' }, optionB: { text: 'Considera os sentimentos de todos', pole: 'F' }, dimension: 'TF' },
  { id: 54, theme: 'Em dilemas éticos, você tende a:', optionA: { text: 'Seguir regras e princípios universais', pole: 'T' }, optionB: { text: 'Considerar as circunstâncias humanas', pole: 'F' }, dimension: 'TF' },
  { id: 55, theme: 'No trabalho, você tende a:', optionA: { text: 'Seguir protocolos e normas estabelecidas', pole: 'J' }, optionB: { text: 'Adaptar regras conforme o contexto', pole: 'P' }, dimension: 'JP' },
  { id: 56, theme: 'No seu cotidiano, você prefere:', optionA: { text: 'Ter uma rotina previsível e organizada', pole: 'J' }, optionB: { text: 'Deixar cada dia ser diferente', pole: 'P' }, dimension: 'JP' },
  { id: 57, theme: 'Entre amigos ou colegas, você é considerado:', optionA: { text: 'Comunicativo e extrovertido', pole: 'E' }, optionB: { text: 'Discreto e reflexivo', pole: 'I' }, dimension: 'EI' },
  { id: 58, theme: 'Você prefere trabalhar com:', optionA: { text: 'Dados reais e tangíveis', pole: 'S' }, optionB: { text: 'Ideias, hipóteses e modelos', pole: 'N' }, dimension: 'SN' },
  { id: 59, theme: 'Em relação a costumes e tradições, você:', optionA: { text: 'Os respeita e valoriza', pole: 'S' }, optionB: { text: 'Questiona e busca novas formas', pole: 'N' }, dimension: 'SN' },
  { id: 60, theme: 'Sua abordagem natural a projetos é:', optionA: { text: 'Estruturar, planejar e seguir o plano', pole: 'J' }, optionB: { text: 'Explorar, adaptar e ajustar no caminho', pole: 'P' }, dimension: 'JP' },
  { id: 61, theme: 'Você se sente mais confortável sendo:', optionA: { text: 'Claro, lógico e consistente', pole: 'T' }, optionB: { text: 'Acolhedor, humano e solidário', pole: 'F' }, dimension: 'TF' },
  { id: 62, theme: 'Você tende a gerir suas tarefas:', optionA: { text: 'Com listas, prazos e prioridades definidas', pole: 'J' }, optionB: { text: 'De forma fluida, conforme a inspiração chega', pole: 'P' }, dimension: 'JP' },
  { id: 63, theme: 'Ao receber um prazo, você:', optionA: { text: 'Planeja para entregar antes', pole: 'J' }, optionB: { text: 'Trabalha melhor quando o prazo se aproxima', pole: 'P' }, dimension: 'JP' },
  { id: 64, theme: 'Em ambientes sociais, você é:', optionA: { text: 'Fácil de abordar e aberto a conversas', pole: 'E' }, optionB: { text: 'Mais fechado e seletivo nas interações', pole: 'I' }, dimension: 'EI' },
  { id: 65, theme: 'Você prefere um hobby que:', optionA: { text: 'Envolva habilidades práticas e concretas', pole: 'S' }, optionB: { text: 'Estimule a imaginação e a criatividade', pole: 'N' }, dimension: 'SN' },
  { id: 66, theme: 'Ao se comunicar, você prefere:', optionA: { text: 'Ser literal e direto no que quer dizer', pole: 'S' }, optionB: { text: 'Usar metáforas e linguagem figurada', pole: 'N' }, dimension: 'SN' },
  { id: 67, theme: 'Ao liderar uma equipe, você foca mais em:', optionA: { text: 'Eficiência, resultados e objetividade', pole: 'T' }, optionB: { text: 'Bem-estar, motivação e coesão do grupo', pole: 'F' }, dimension: 'TF' },
  { id: 68, theme: 'Em situações de pressão, você:', optionA: { text: 'Mantém frieza e age com lógica', pole: 'T' }, optionB: { text: 'Se preocupa com os envolvidos e os suporta', pole: 'F' }, dimension: 'TF' },
  { id: 69, theme: 'Quando precisa decidir, você:', optionA: { text: 'Decide rápido e parte para a ação', pole: 'J' }, optionB: { text: 'Prefere esperar mais informações', pole: 'P' }, dimension: 'JP' },
  { id: 70, theme: 'No seu dia a dia, você tende a ser mais:', optionA: { text: 'Planejado e metódico', pole: 'J' }, optionB: { text: 'Espontâneo e adaptável', pole: 'P' }, dimension: 'JP' },
]

// ============================================================
// QUESTÕES V3 — situacionais e cenários do cotidiano
// ============================================================
export const MBTI_QUESTIONS_V3: MbtiQuestion[] = [
  { id: 1,  theme: 'Você é convidado para um jantar com pessoas que não conhece. Você:', optionA: { text: 'Chega animado e logo faz amizade com todos', pole: 'E' }, optionB: { text: 'Escolhe alguém e tem uma conversa mais profunda', pole: 'I' }, dimension: 'EI' },
  { id: 2,  theme: 'Ao resolver um problema técnico, você começa por:', optionA: { text: 'Testar soluções que já funcionaram antes', pole: 'S' }, optionB: { text: 'Pensar em abordagens criativas ainda não tentadas', pole: 'N' }, dimension: 'SN' },
  { id: 3,  theme: 'Ao estudar um assunto novo, você prefere:', optionA: { text: 'Um guia prático passo a passo', pole: 'S' }, optionB: { text: 'Entender o conceito geral antes dos detalhes', pole: 'N' }, dimension: 'SN' },
  { id: 4,  theme: 'Seu amigo errou sério numa situação. Você:', optionA: { text: 'Diz o que acha de forma direta e honesta', pole: 'T' }, optionB: { text: 'Prioriza apoiá-lo emocionalmente primeiro', pole: 'F' }, dimension: 'TF' },
  { id: 5,  theme: 'Ao avaliar a proposta de alguém, você foca mais em:', optionA: { text: 'Se os números e a lógica fazem sentido', pole: 'T' }, optionB: { text: 'Se as pessoas se sentirão bem com a mudança', pole: 'F' }, dimension: 'TF' },
  { id: 6,  theme: 'Alguém propõe um passeio de última hora. Você:', optionA: { text: 'Topa animado — adoras o improviso', pole: 'P' }, optionB: { text: 'Fica desconfortável — você já tinha planos', pole: 'J' }, dimension: 'JP' },
  { id: 7,  theme: 'Ao escolher um presente para alguém, você:', optionA: { text: 'Pesquisa com antecedência e compra com cuidado', pole: 'J' }, optionB: { text: 'Decide na hora com base no que parece certo', pole: 'P' }, dimension: 'JP' },
  { id: 8,  theme: 'Você passa um fim de semana sozinho. Você:', optionA: { text: 'Logo busca amigos ou sai para ver gente', pole: 'E' }, optionB: { text: 'Aproveita para descansar e recarregar', pole: 'I' }, dimension: 'EI' },
  { id: 9,  theme: 'Quando uma amiga está passando por algo difícil, você:', optionA: { text: 'Fica do lado e a escuta sem julgamentos', pole: 'F' }, optionB: { text: 'Apresenta soluções práticas para o problema', pole: 'T' }, dimension: 'TF' },
  { id: 10, theme: 'Ao comprar algo, você se baseia mais em:', optionA: { text: 'Reviews, especificações e avaliações reais', pole: 'S' }, optionB: { text: 'A sensação de que vai funcionar bem para você', pole: 'N' }, dimension: 'SN' },
  { id: 11, theme: 'Seu colega entrega um trabalho cheio de erros. Você:', optionA: { text: 'Aponta todos os erros com clareza', pole: 'T' }, optionB: { text: 'Tenta equilibrar crítica com encorajamento', pole: 'F' }, dimension: 'TF' },
  { id: 12, theme: 'Ao conhecer alguém novo, você:', optionA: { text: 'Precisa de tempo para criar confiança', pole: 'T' }, optionB: { text: 'Já cria um vínculo afetivo rapidamente', pole: 'F' }, dimension: 'TF' },
  { id: 13, theme: 'Ao criar algo, você prefere partir de:', optionA: { text: 'Um modelo ou referência já existente', pole: 'S' }, optionB: { text: 'Uma ideia original sem modelo', pole: 'N' }, dimension: 'SN' },
  { id: 14, theme: 'Seu dia de amanhã está livre. Você:', optionA: { text: 'Deixa para decidir o que fazer na hora', pole: 'P' }, optionB: { text: 'Já organiza o que vai fazer com antecedência', pole: 'J' }, dimension: 'JP' },
  { id: 15, theme: 'Quando está com raiva ou frustrado, você:', optionA: { text: 'Costuma expressar o que sente', pole: 'E' }, optionB: { text: 'Prefere processar sozinho antes de falar', pole: 'I' }, dimension: 'EI' },
  { id: 16, theme: 'Ao tomar uma decisão de negócio, você prioriza:', optionA: { text: 'Dados reais do mercado e resultados anteriores', pole: 'S' }, optionB: { text: 'Tendências futuras e possibilidades emergentes', pole: 'N' }, dimension: 'SN' },
  { id: 17, theme: 'Ao resolver um desafio criativo, você:', optionA: { text: 'Busca referências novas e foge do óbvio', pole: 'N' }, optionB: { text: 'Aplica o que já sabe que funciona', pole: 'S' }, dimension: 'SN' },
  { id: 18, theme: 'No trabalho, você se destaca mais quando:', optionA: { text: 'Lidera reuniões e mobiliza pessoas', pole: 'E' }, optionB: { text: 'Faz análises e trabalhos de alta concentração', pole: 'I' }, dimension: 'EI' },
  { id: 19, theme: 'Ao demitir alguém, você priorizaria:', optionA: { text: 'A decisão mais objetiva e eficiente', pole: 'T' }, optionB: { text: 'Fazer isso com o máximo de humanidade possível', pole: 'F' }, dimension: 'TF' },
  { id: 20, theme: 'Ao lidar com alguém que está te decepcionando, você:', optionA: { text: 'Confronta diretamente e sem rodeios', pole: 'T' }, optionB: { text: 'Tenta entender o que está por trás do comportamento', pole: 'F' }, dimension: 'TF' },
  { id: 21, theme: 'Ao marcar um compromisso, você:', optionA: { text: 'Prefere confirmar e bloquear logo na agenda', pole: 'J' }, optionB: { text: 'Gosta de manter a data em aberto o máximo possível', pole: 'P' }, dimension: 'JP' },
  { id: 22, theme: 'Antes de entrar numa reunião importante, você:', optionA: { text: 'Chega e conversa com quem estiver por lá', pole: 'E' }, optionB: { text: 'Revisa suas anotações e se prepara mentalmente', pole: 'I' }, dimension: 'EI' },
  { id: 23, theme: 'Numa apresentação de resultados, você prefere:', optionA: { text: 'Dados precisos, gráficos e métricas claras', pole: 'S' }, optionB: { text: 'Uma narrativa que explique o contexto e impacto', pole: 'N' }, dimension: 'SN' },
  { id: 24, theme: 'Sua empresa vai lançar um produto. Você foca em:', optionA: { text: 'O problema real que ele resolve agora', pole: 'S' }, optionB: { text: 'O potencial transformador que ele pode ter no futuro', pole: 'N' }, dimension: 'SN' },
  { id: 25, theme: 'Numa discussão com seu time, você tende a:', optionA: { text: 'Manter a frieza e focar nos argumentos', pole: 'T' }, optionB: { text: 'Sentir o clima emocional e cuidar das relações', pole: 'F' }, dimension: 'TF' },
  { id: 26, theme: 'Alguém da sua equipe erra por falta de atenção. Você:', optionA: { text: 'Cobra com objetividade para não repetir', pole: 'T' }, optionB: { text: 'Compreende a situação e ajuda a melhorar', pole: 'F' }, dimension: 'TF' },
  { id: 27, theme: 'Ao planejar as próximas semanas, você:', optionA: { text: 'Cria um plano detalhado e o segue', pole: 'J' }, optionB: { text: 'Prefere adaptar conforme os eventos aparecem', pole: 'P' }, dimension: 'JP' },
  { id: 28, theme: 'Ao fechar um negócio, você prefere:', optionA: { text: 'Documentar tudo formalmente', pole: 'J' }, optionB: { text: 'Manter a flexibilidade para ajustes futuros', pole: 'P' }, dimension: 'JP' },
  { id: 29, theme: 'Você está num coffee break na empresa. Você:', optionA: { text: 'Circula e puxa conversa com diferentes pessoas', pole: 'E' }, optionB: { text: 'Fica com quem já conhece ou aproveita para pensar', pole: 'I' }, dimension: 'EI' },
  { id: 30, theme: 'Ao implementar uma nova estratégia, você considera:', optionA: { text: 'O que já foi testado e mostrou resultado', pole: 'S' }, optionB: { text: 'O que o futuro pode exigir além do presente', pole: 'N' }, dimension: 'SN' },
  { id: 31, theme: 'Ao educar uma criança, você priorizaria:', optionA: { text: 'Ensiná-la a ser prática e responsável', pole: 'S' }, optionB: { text: 'Estimular sua imaginação e criatividade', pole: 'N' }, dimension: 'SN' },
  { id: 32, theme: 'Seu gestor pede uma avaliação sua de um colega. Você:', optionA: { text: 'Apresenta uma análise objetiva de desempenho', pole: 'T' }, optionB: { text: 'Equilibra os pontos técnicos com o lado humano', pole: 'F' }, dimension: 'TF' },
  { id: 33, theme: 'Ao receber um projeto mal feito, você:', optionA: { text: 'Retorna com críticas específicas e técnicas', pole: 'T' }, optionB: { text: 'Busca entender as circunstâncias antes de criticar', pole: 'F' }, dimension: 'TF' },
  { id: 34, theme: 'Você vai viajar nas férias. Você:', optionA: { text: 'Reserva tudo com antecedência', pole: 'J' }, optionB: { text: 'Improvisa o roteiro no destino', pole: 'P' }, dimension: 'JP' },
  { id: 35, theme: 'Seu gestor muda o escopo do projeto no meio do caminho. Você:', optionA: { text: 'Fica frustrado e precisa se reorganizar', pole: 'J' }, optionB: { text: 'Se adapta rapidamente ao novo cenário', pole: 'P' }, dimension: 'JP' },
  { id: 36, theme: 'Você precisa resolver um problema complexo. Você:', optionA: { text: 'Liga para alguém e pensa em voz alta', pole: 'E' }, optionB: { text: 'Prefere pensar sozinho em silêncio', pole: 'I' }, dimension: 'EI' },
  { id: 37, theme: 'Ao escolher um investimento, você:', optionA: { text: 'Pesquisa histórico e dados concretos', pole: 'S' }, optionB: { text: 'Confia no seu feeling sobre tendências futuras', pole: 'N' }, dimension: 'SN' },
  { id: 38, theme: 'Ao escolher uma carreira, você priorizaria:', optionA: { text: 'Estabilidade, resultado e praticidade', pole: 'S' }, optionB: { text: 'Propósito, impacto e significado', pole: 'N' }, dimension: 'SN' },
  { id: 39, theme: 'Ao montar uma equipe, você daria mais peso para:', optionA: { text: 'Competência técnica e entregas', pole: 'T' }, optionB: { text: 'Perfil colaborativo e valores pessoais', pole: 'F' }, dimension: 'TF' },
  { id: 40, theme: 'Quando alguém erra por terceira vez, você:', optionA: { text: 'Conversa com firmeza e estabelece consequências', pole: 'T' }, optionB: { text: 'Tenta entender o que está impedindo a mudança', pole: 'F' }, dimension: 'TF' },
  { id: 41, theme: 'Você prefere trabalhar num projeto com:', optionA: { text: 'Prazo fixo, escopo claro e critérios definidos', pole: 'J' }, optionB: { text: 'Flexibilidade para descobrir o caminho no processo', pole: 'P' }, dimension: 'JP' },
  { id: 42, theme: 'Sua mesa de trabalho é geralmente:', optionA: { text: 'Organizada — cada coisa em seu lugar', pole: 'J' }, optionB: { text: 'Com pilhas e itens espalhados, mas você sabe onde está tudo', pole: 'P' }, dimension: 'JP' },
  { id: 43, theme: 'Em relação à sua rede de contatos, você:', optionA: { text: 'Tem muitos conhecidos e faz conexões facilmente', pole: 'E' }, optionB: { text: 'Prefere poucos contatos, mas muito significativos', pole: 'I' }, dimension: 'EI' },
  { id: 44, theme: 'Ao apresentar uma ideia para o time, você prefere:', optionA: { text: 'Mostrar cases e exemplos reais do que funciona', pole: 'S' }, optionB: { text: 'Explorar o potencial e visão de futuro da ideia', pole: 'N' }, dimension: 'SN' },
  { id: 45, theme: 'Ao final do dia, você se sente realizado quando:', optionA: { text: 'Concluiu tarefas práticas e objetivas', pole: 'S' }, optionB: { text: 'Avançou na construção de algo maior e mais complexo', pole: 'N' }, dimension: 'SN' },
  { id: 46, theme: 'Ao dividir tarefas numa equipe, você:', optionA: { text: 'Distribui com base em critérios objetivos de performance', pole: 'T' }, optionB: { text: 'Considera o perfil e o bem-estar de cada pessoa', pole: 'F' }, dimension: 'TF' },
  { id: 47, theme: 'Quando alguém te pede ajuda com um problema pessoal, você:', optionA: { text: 'Oferece orientações práticas para resolver', pole: 'T' }, optionB: { text: 'Prioriza escutar e dar suporte emocional', pole: 'F' }, dimension: 'TF' },
  { id: 48, theme: 'Ao receber uma demanda nova, você:', optionA: { text: 'Pede escopo claro e prazo definido', pole: 'J' }, optionB: { text: 'Prefere ter liberdade para definir como vai entregar', pole: 'P' }, dimension: 'JP' },
  { id: 49, theme: 'Você se sente mais produtivo:', optionA: { text: 'Após ter tomado a decisão e começado a agir', pole: 'J' }, optionB: { text: 'Enquanto ainda está explorando as opções', pole: 'P' }, dimension: 'JP' },
  { id: 50, theme: 'Numa viagem com amigos, você:', optionA: { text: 'Fica animado e no centro das atividades', pole: 'E' }, optionB: { text: 'Prefere momentos de silêncio e recolhimento', pole: 'I' }, dimension: 'EI' },
  { id: 51, theme: 'Ao fazer uma análise de dados, você prefere:', optionA: { text: 'Focar nos números e padrões específicos', pole: 'S' }, optionB: { text: 'Interpretar o que os dados revelam mais amplamente', pole: 'N' }, dimension: 'SN' },
  { id: 52, theme: 'Você escolhe um curso novo. Você é mais atraído por:', optionA: { text: 'Cursos práticos com habilidades aplicáveis', pole: 'S' }, optionB: { text: 'Cursos teóricos e filosóficos que ampliam perspectivas', pole: 'N' }, dimension: 'SN' },
  { id: 53, theme: 'Ao aprovar um projeto, você se baseia mais em:', optionA: { text: 'Critérios claros e indicadores mensuráveis', pole: 'T' }, optionB: { text: 'Se o projeto parece certo para as pessoas envolvidas', pole: 'F' }, dimension: 'TF' },
  { id: 54, theme: 'Uma regra está ferindo alguém indiretamente. Você:', optionA: { text: 'Segue a regra, pois ela existe por uma razão', pole: 'T' }, optionB: { text: 'Prioriza a pessoa e busca uma exceção', pole: 'F' }, dimension: 'TF' },
  { id: 55, theme: 'Em projetos de longo prazo, você prefere:', optionA: { text: 'Um plano detalhado que você segue rigorosamente', pole: 'J' }, optionB: { text: 'Marcos gerais com liberdade no caminho', pole: 'P' }, dimension: 'JP' },
  { id: 56, theme: 'Ao começar sua semana, você:', optionA: { text: 'Cria uma lista de prioridades para todos os dias', pole: 'J' }, optionB: { text: 'Lida com cada dia conforme o que surge', pole: 'P' }, dimension: 'JP' },
  { id: 57, theme: 'Você precisa trabalhar num projeto por meses. Você prefere:', optionA: { text: 'Ter contato frequente com a equipe', pole: 'E' }, optionB: { text: 'Trabalhar com autonomia e espaço individual', pole: 'I' }, dimension: 'EI' },
  { id: 58, theme: 'Ao documentar um processo, você prefere:', optionA: { text: 'Descrever cada passo com objetividade', pole: 'S' }, optionB: { text: 'Capturar a lógica e o sentido maior do processo', pole: 'N' }, dimension: 'SN' },
  { id: 59, theme: 'Você está num ambiente com práticas novas. Você:', optionA: { text: 'Adapta as práticas ao que já conhece e funciona', pole: 'S' }, optionB: { text: 'Experimenta o novo com curiosidade', pole: 'N' }, dimension: 'SN' },
  { id: 60, theme: 'Ao assumir um projeto novo, sua primeira ação é:', optionA: { text: 'Criar um plano com etapas e responsáveis', pole: 'J' }, optionB: { text: 'Conversar com as partes e entender o contexto', pole: 'P' }, dimension: 'JP' },
  { id: 61, theme: 'Ao liderar pessoas, você se define como:', optionA: { text: 'Claro nas expectativas e na direção', pole: 'T' }, optionB: { text: 'Humano, próximo e disponível', pole: 'F' }, dimension: 'TF' },
  { id: 62, theme: 'Você tem múltiplos projetos em paralelo. Você:', optionA: { text: 'Organiza tudo em listas e gerencia as prioridades', pole: 'J' }, optionB: { text: 'Vai alternando conforme o humor e a urgência', pole: 'P' }, dimension: 'JP' },
  { id: 63, theme: 'Com relação a prazos, você:', optionA: { text: 'Costuma entregar antes ou no prazo com folga', pole: 'J' }, optionB: { text: 'Trabalha bem sob pressão, mas às vezes atrasa', pole: 'P' }, dimension: 'JP' },
  { id: 64, theme: 'Você está num ambiente com pessoas que não conhece. Você:', optionA: { text: 'Fica confortável e inicia interações naturalmente', pole: 'E' }, optionB: { text: 'Prefere observar antes de se abrir', pole: 'I' }, dimension: 'EI' },
  { id: 65, theme: 'Nas férias, você prefere:', optionA: { text: 'Atividades práticas: trilhas, esportes, visitas', pole: 'S' }, optionB: { text: 'Exploração livre: arte, cultura, novos mundos', pole: 'N' }, dimension: 'SN' },
  { id: 66, theme: 'Ao contar uma história, você:', optionA: { text: 'É preciso e sequencial nos detalhes', pole: 'S' }, optionB: { text: 'Pula para o ponto mais significativo ou impactante', pole: 'N' }, dimension: 'SN' },
  { id: 67, theme: 'Ao gerir uma equipe em crise, você:', optionA: { text: 'Foca no problema e na solução objetiva', pole: 'T' }, optionB: { text: 'Cuida das pessoas enquanto resolve o problema', pole: 'F' }, dimension: 'TF' },
  { id: 68, theme: 'Ao demitir alguém por necessidade da empresa, você:', optionA: { text: 'Explica os motivos com objetividade e clareza', pole: 'T' }, optionB: { text: 'Cuida do impacto emocional e oferece suporte', pole: 'F' }, dimension: 'TF' },
  { id: 69, theme: 'Ao analisar uma proposta comercial, você:', optionA: { text: 'Decide logo depois de ver o essencial', pole: 'J' }, optionB: { text: 'Prefere explorar mais antes de decidir', pole: 'P' }, dimension: 'JP' },
  { id: 70, theme: 'Sua abordagem geral à vida é mais:', optionA: { text: 'Estruturada — você gosta de ter controle e ordem', pole: 'J' }, optionB: { text: 'Fluida — você prefere se adaptar ao que vem', pole: 'P' }, dimension: 'JP' },
]

// ============================================================
// LOOKUP: versão → conjunto de questões
// ============================================================
export const MBTI_QUESTION_SETS: Record<1 | 2 | 3, MbtiQuestion[]> = {
  1: MBTI_QUESTIONS,
  2: MBTI_QUESTIONS_V2,
  3: MBTI_QUESTIONS_V3,
}

/** Deriva a versão a partir do token UUID */
export function getMbtiVersion(token: string): 1 | 2 | 3 {
  const sum = token.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)
  return ((sum % 3) + 1) as 1 | 2 | 3
}

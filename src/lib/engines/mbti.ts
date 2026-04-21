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

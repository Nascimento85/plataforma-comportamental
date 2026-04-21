// ============================================================
// ENGINE DISC — Cálculo de Perfil Comportamental
// 40 grupos | 4 opções por grupo (D/I/S/C) | Ranking 1-4
// Linguagem na 1ª pessoa para melhor identificação do respondente
// ============================================================

export type DiscProfile = 'D' | 'I' | 'S' | 'C'

export interface DiscGroup {
  groupNumber: number
  theme: string
  options: {
    D: string
    I: string
    S: string
    C: string
  }
}

export interface DiscAnswer {
  groupNumber: number
  scores: { D: number; I: number; S: number; C: number } // cada 1-4, soma = 10
}

export interface DiscResult {
  scores: { D: number; I: number; S: number; C: number }
  percentages: { D: number; I: number; S: number; C: number }
  predominant: DiscProfile
  secondary: DiscProfile
  combination: string
  report: DiscProfileReport
}

// ============================================================
// OS 40 GRUPOS DE PERGUNTAS — Linguagem na 1ª pessoa
// ============================================================

export const DISC_GROUPS: DiscGroup[] = [
  // ── BLOCO 1: Comportamento geral ─────────────────────────
  {
    groupNumber: 1,
    theme: 'Costumo agir de forma...',
    options: { D: 'Assertiva', I: 'Persuasiva', S: 'Paciente', C: 'Contemplativa' },
  },
  {
    groupNumber: 2,
    theme: 'Sinto-me mais confortável quando...',
    options: { D: 'Posso ser decisivo', I: 'Estou cercado de pessoas', S: 'Faço parte de um time', C: 'Há planejamento e ordem' },
  },
  {
    groupNumber: 3,
    theme: 'O que mais desejo no dia a dia é...',
    options: { D: 'Variedade e desafios', I: 'Liberdade e espontaneidade', S: 'Harmonia e equilíbrio', C: 'Lógica e coerência' },
  },
  {
    groupNumber: 4,
    theme: 'Quando estou sob pressão, tendo a me tornar...',
    options: { D: 'Ditatorial', I: 'Sarcástico', S: 'Submisso', C: 'Arredio' },
  },
  {
    groupNumber: 5,
    theme: 'Minha característica mais marcante é ser...',
    options: { D: 'Franco e direto', I: 'Otimista e animado', S: 'Serviçal e prestativo', C: 'Organizado e ordeiro' },
  },
  // ── BLOCO 2: Conflito e pressão ──────────────────────────
  {
    groupNumber: 6,
    theme: 'Quando estou em conflito com alguém, costumo...',
    options: { D: 'Exigir ação imediata', I: 'Partir para o ataque verbal', S: 'Reclamar em silêncio', C: 'Evitar o conflito' },
  },
  {
    groupNumber: 7,
    theme: 'Meu ponto forte mais evidente é ser...',
    options: { D: 'Solucionador de problemas', I: 'Encorajador das pessoas', S: 'Apoio constante do time', C: 'Organizador de processos' },
  },
  {
    groupNumber: 8,
    theme: 'Quando identifico erros (meus ou de outros)...',
    options: { D: 'Aponto o erro diretamente', I: 'Chamo e explico o problema', S: 'Fico quieto e aceito', C: 'Me incomodo e questiono tudo' },
  },
  {
    groupNumber: 9,
    theme: 'Em momentos de grande pressão, fico...',
    options: { D: 'Crítico e exigente', I: 'Superficial e disperso', S: 'Indeciso e hesitante', C: 'Obstinado e inflexível' },
  },
  {
    groupNumber: 10,
    theme: 'Às vezes, as pessoas me percebem como...',
    options: { D: 'Impaciente', I: 'Inoportuno', S: 'Indeciso', C: 'Inseguro' },
  },
  // ── BLOCO 3: Necessidades e medos ────────────────────────
  {
    groupNumber: 11,
    theme: 'Tenho forte necessidade de...',
    options: { D: 'Controle sobre o que faço', I: 'Aprovação das pessoas', S: 'Rotina e previsibilidade', C: 'Seguir padrões de qualidade' },
  },
  {
    groupNumber: 12,
    theme: 'Uma das minhas limitações conhecidas é ser...',
    options: { D: 'Direto demais', I: 'Desorganizado', S: 'Indireto e evasivo', C: 'Detalhista em excesso' },
  },
  {
    groupNumber: 13,
    theme: 'O que mais me causa insegurança é...',
    options: { D: 'Perder ou fracassar', I: 'Ser rejeitado ou ignorado', S: 'Enfrentar mudanças bruscas', C: 'Cometer erros ou estar errado' },
  },
  {
    groupNumber: 14,
    theme: 'Avalio meu próprio desempenho por...',
    options: { D: 'Resultados conquistados', I: 'Reconhecimento recebido', S: 'Nível de harmonia da equipe', C: 'Precisão e qualidade do trabalho' },
  },
  {
    groupNumber: 15,
    theme: 'Com minha equipe ou pessoas próximas, costumo ser...',
    options: { D: 'Exigente e autoconfiante', I: 'Permissivo e descontraído', S: 'Humilde e acolhedor', C: 'Cauteloso e criterioso' },
  },
  // ── BLOCO 4: Estilo de trabalho ──────────────────────────
  {
    groupNumber: 16,
    theme: 'Minha forma preferida de trabalhar é de modo...',
    options: { D: 'Independente e autônomo', I: 'Interativo e colaborativo', S: 'Estável e constante', C: 'Correto e metódico' },
  },
  {
    groupNumber: 17,
    theme: 'Outra limitação que reconheço em mim é ser...',
    options: { D: 'Intenso e impulsivo', I: 'Pouco convencional e volátil', S: 'Indeciso quando pressionado', C: 'Impessoal e distante' },
  },
  {
    groupNumber: 18,
    theme: 'Tenho dificuldade em aceitar ou reconhecer...',
    options: { D: 'Ser questionado ou responsabilizado', I: 'Honrar todos os compromissos', S: 'Que mudanças são necessárias', C: 'Tomar decisões rápidas' },
  },
  {
    groupNumber: 19,
    theme: 'Sinto que estou me saindo bem quando recebo...',
    options: { D: 'Feedback de resultados alcançados', I: 'Elogios e reconhecimento público', S: 'Reconhecimento pela minha contribuição', C: 'Confirmação de que o trabalho está correto' },
  },
  {
    groupNumber: 20,
    theme: 'Prefiro tarefas que sejam...',
    options: { D: 'Desafiadoras e de alto impacto', I: 'Relacionadas a pessoas e interação', S: 'Planejadas com rotina definida', C: 'Estruturadas com critérios claros' },
  },
  // ── BLOCO 5: Situações cotidianas ────────────────────────
  {
    groupNumber: 21,
    theme: 'Quando há atrasos ou imprevistos, costumo...',
    options: { D: 'Me irritar e confrontar diretamente', I: 'Nem ligar, pois estou disperso', S: 'Aceitar e esperar pacientemente', C: 'Reclamar e analisar a causa' },
  },
  {
    groupNumber: 22,
    theme: 'Em situações extremas de estresse, tendo a...',
    options: { D: 'Focar demais nas metas e resultados', I: 'Falar sem pensar nas consequências', S: 'Procrastinar em vez de agir', C: 'Analisar demais e travar' },
  },
  {
    groupNumber: 23,
    theme: 'Reconheço que preciso melhorar em...',
    options: { D: 'Empatia e paciência com as pessoas', I: 'Controle emocional e foco', S: 'Ser assertivo sob pressão', C: 'Me preocupar menos e agir mais' },
  },
  {
    groupNumber: 24,
    theme: 'Em uma discussão ou debate, geralmente...',
    options: { D: 'Busco ter razão e vencer o argumento', I: 'Busco diminuir a tensão do conflito', S: 'Busco concordância e consenso', C: 'Busco provar meu ponto com fatos' },
  },
  {
    groupNumber: 25,
    theme: 'Mesmo em situações simples, como fazer compras...',
    options: { D: 'Já sei exatamente o que quero', I: 'Aproveito e me divirto no processo', S: 'Fico indeciso entre as opções', C: 'Pesquiso e busco a melhor oferta' },
  },
  // ── BLOCO 6: Tomada de decisão e liderança ───────────────
  {
    groupNumber: 26,
    theme: 'No trabalho em equipe, meu papel natural é de...',
    options: { D: 'Liderança e direcionamento', I: 'Motivação e engajamento', S: 'Suporte e estabilidade', C: 'Análise e controle de qualidade' },
  },
  {
    groupNumber: 27,
    theme: 'Minha principal motivação no trabalho é...',
    options: { D: 'Alcançar resultados e superar metas', I: 'Construir relações e influenciar pessoas', S: 'Colaborar e manter a harmonia', C: 'Entregar trabalho com excelência' },
  },
  {
    groupNumber: 28,
    theme: 'Quando preciso tomar uma decisão importante...',
    options: { D: 'Decido com rapidez e confiança', I: 'Consulto pessoas e sigo o instinto', S: 'Analiso com cuidado antes de agir', C: 'Recolho dados e pesos todos os aspectos' },
  },
  {
    groupNumber: 29,
    theme: 'Na comunicação com outras pessoas, sou mais...',
    options: { D: 'Direto e objetivo', I: 'Expressivo e animado', S: 'Cordial e reservado', C: 'Preciso e formal' },
  },
  {
    groupNumber: 30,
    theme: 'Quando recebo uma crítica sobre meu trabalho...',
    options: { D: 'Questiono ou contesto a crítica', I: 'Fico emocionado mas logo supero', S: 'Aceito silenciosamente, mesmo magoado', C: 'Analiso para verificar se procede' },
  },
  // ── BLOCO 7: Reuniões, metas e relações ──────────────────
  {
    groupNumber: 31,
    theme: 'Em reuniões, meu comportamento mais comum é...',
    options: { D: 'Tomar a frente e dar direcionamentos', I: 'Participar ativamente e animar o grupo', S: 'Ouvir e contribuir quando solicitado', C: 'Observar e registrar detalhes importantes' },
  },
  {
    groupNumber: 32,
    theme: 'Quando estabeleço metas para mim, elas costumam ser...',
    options: { D: 'Arrojadas e desafiadoras', I: 'Relacionadas a conexões e visibilidade', S: 'Estáveis e de longo prazo', C: 'Detalhadas e com critérios claros' },
  },
  {
    groupNumber: 33,
    theme: 'Ao enfrentar um problema complexo, prefiro...',
    options: { D: 'Agir rápido e ajustar no caminho', I: 'Conversar com outras pessoas para criar soluções', S: 'Resolver de forma gradual e segura', C: 'Estudar e mapear todas as variáveis antes' },
  },
  {
    groupNumber: 34,
    theme: 'Quando começo um projeto novo, costumo...',
    options: { D: 'Partir para a ação imediatamente', I: 'Me empolgar e compartilhar a ideia com todos', S: 'Entender bem o contexto antes de começar', C: 'Planejar cada etapa com cuidado' },
  },
  {
    groupNumber: 35,
    theme: 'Minha relação com regras e procedimentos é...',
    options: { D: 'Questiono regras que limitam minha autonomia', I: 'Sigo quando conveniente, adapto quando preciso', S: 'Sigo fielmente para manter a estabilidade', C: 'Valorizo regras e prezam por seguí-las' },
  },
  // ── BLOCO 8: Tempo, mudanças e contribuição ──────────────
  {
    groupNumber: 36,
    theme: 'Em relação à gestão do meu próprio tempo...',
    options: { D: 'Foco no essencial e corto o supérfluo', I: 'Me deixo levar por conversas e interações', S: 'Sigo uma rotina organizada', C: 'Planejo minuciosamente cada bloco de tempo' },
  },
  {
    groupNumber: 37,
    theme: 'Quando trabalho com pessoas muito diferentes de mim...',
    options: { D: 'Procuro mantê-las focadas nos resultados', I: 'Busco criar conexão e entendimento', S: 'Me adapto e busco evitar atritos', C: 'Mantenho meu padrão e espero que se ajustem' },
  },
  {
    groupNumber: 38,
    theme: 'Diante de mudanças inesperadas no ambiente de trabalho...',
    options: { D: 'Vejo como oportunidade e me adapto rápido', I: 'Me entusiasmo com o novo e engajo o time', S: 'Preciso de tempo para me ajustar', C: 'Questiono se a mudança é realmente necessária' },
  },
  {
    groupNumber: 39,
    theme: 'Minha principal contribuição natural para qualquer equipe é...',
    options: { D: 'Manter o time focado em resultados', I: 'Criar um ambiente positivo e motivador', S: 'Garantir coesão e suporte ao grupo', C: 'Assegurar qualidade e precisão nas entregas' },
  },
  {
    groupNumber: 40,
    theme: 'Quando penso no meu desenvolvimento profissional futuro...',
    options: { D: 'Quero assumir mais liderança e responsabilidade', I: 'Quero ampliar minha rede e influência', S: 'Quero aprofundar minha especialidade com estabilidade', C: 'Quero dominar minha área com excelência técnica' },
  },
]

// ============================================================
// CONTEÚDO DOS RELATÓRIOS POR PERFIL
// ============================================================

export interface DiscProfileReport {
  name: string
  tagline: string
  description: string
  characteristics: string[]
  strengths: string[]
  teamValue: string[]
  idealEnvironment: string[]
  underPressure: string[]
  motivations: string[]
  improvements: string[]
  values: string
  fear: string
  decisionStyle: string
}

export const DISC_PROFILES: Record<DiscProfile, DiscProfileReport> = {
  D: {
    name: 'Dominante',
    tagline: 'Busca Resultados',
    description: 'Pessoas com perfil Dominante são movidas por resultados, desafios e autonomia. Autoconfiantes e diretas, assumem a liderança com naturalidade e prosperam em ambientes dinâmicos onde possam agir com independência. Tomam decisões com agilidade, preferem ir direto ao ponto e tendem a questionar o status quo em busca de soluções mais eficientes. Sua energia e senso de urgência são grandes ativos, especialmente em cenários de pressão onde outros hesitam.',
    characteristics: ['Autoconfiante', 'Firme e decidido', 'Direto e acelerado', 'Audacioso', 'Independente', 'Comandante', 'Enérgico', 'Competitivo', 'Ambicioso'],
    strengths: ['Senso de urgência e iniciativa', 'Prático e impulsivo', 'Gosta de desafios', 'Assume liderança com naturalidade', 'Lida bem com conflitos e pressão', 'Autossuficiente', 'Foco nos resultados e objetivos'],
    teamValue: ['Coordenador', 'Inovador', 'Previdente', 'Tem iniciativa', 'Voltado para o desafio'],
    idealEnvironment: ['Debate para expressar pontos de vista', 'Livre de controle, supervisão e detalhes', 'Trabalho com desafios e oportunidades', 'Um ambiente inovador', 'Trabalho que não seja rotineiro'],
    underPressure: ['Exigente', 'Nervoso', 'Agressivo', 'Egoísta'],
    motivations: ['Liberdade para agir individualmente', 'Controle das próprias atividades', 'Resolver os problemas do seu jeito', 'Competição', 'Variedade de atividades', 'Não ter que repetir tarefas'],
    improvements: ['Ser menos autoritário e controlador', 'Ter mais paciência', 'Ouvir as pessoas', 'Prestar atenção nos detalhes', 'Estar aberto às ideias dos outros', 'Ser mais empático e acessível'],
    values: 'Resultado',
    fear: 'Perder a autonomia',
    decisionStyle: 'Intuitiva, rápida e racional',
  },
  I: {
    name: 'Influente',
    tagline: 'Busca Relacionamentos',
    description: 'Pessoas com perfil Influente têm um talento natural para conectar, inspirar e motivar as pessoas ao redor. Extrovertidas, otimistas e cheias de energia, criam ambientes positivos e são especialistas em comunicação. Preferem trabalhar em grupo, valorizam o reconhecimento social e têm grande habilidade para persuadir e negociar. Sua criatividade e entusiasmo contagiante fazem delas catalisadoras de mudanças culturais dentro das organizações.',
    characteristics: ['Falador', 'Extrovertido', 'Amigável', 'Otimista', 'Alegre', 'Entusiasmado', 'Persuasivo', 'Bem-humorado', 'Emotivo'],
    strengths: ['Facilidade para motivar e influenciar', 'Mantém ambientes positivos', 'Habilidade de comunicação e networking', 'Criativo e resolve conflitos', 'Joga em equipe', 'Negocia conflitos'],
    teamValue: ['Criativo', 'Resolve conflitos', 'Joga em equipe', 'Motiva os demais', 'Negocia conflitos', 'Otimista e entusiasta'],
    idealEnvironment: ['Contato constante com as pessoas', 'Debate para ouvir ideias', 'Liberdade de movimento', 'Livre de controle e detalhes', 'Supervisor democrático'],
    underPressure: ['Falante', 'Muito otimista', 'Pouco realista', 'Se auto-promove'],
    motivations: ['Segurança e aceitação social', 'Construir o consenso', 'Reconhecimento da equipe', 'Supervisão compreensiva', 'Ambiente harmônico', 'Trabalho em grupo'],
    improvements: ['Prestar mais atenção nos detalhes', 'Falar menos e ouvir mais', 'Ser menos impulsivo', 'Ser mais disciplinado e organizado', 'Saber dizer não', 'Cumprir prazos'],
    values: 'Felicidade e igualdade',
    fear: 'Rejeição',
    decisionStyle: 'Emocional e intuitiva',
  },
  S: {
    name: 'Estável',
    tagline: 'Busca Colaboração',
    description: 'Pessoas com perfil Estável são o alicerce das equipes. Pacientes, leais e extraordinariamente bons ouvintes, constroem relações de confiança duradouras e são os primeiros a oferecer apoio. Preferem ambientes previsíveis e harmoniosos, entregam resultados consistentes ao longo do tempo e têm grande capacidade de perseverar. Sua empatia e estabilidade emocional são recursos valiosos para manter a coesão do grupo, especialmente em momentos de mudança.',
    characteristics: ['Simpático', 'Afável', 'Paciente', 'Bom ouvinte', 'Flexível', 'Conciliador', 'Perseverante', 'Equilibrado', 'Prestativo'],
    strengths: ['Trabalha bem em equipe', 'Valoriza planejamento e orientações claras', 'Gosta de rotinas e ambientes harmônicos', 'Consistente e persistente', 'Grande ouvinte', 'Leal'],
    teamValue: ['Joga em equipe', 'Lógico e analítico', 'Orientado para o serviço', 'Paciente e enérgico', 'Trabalha por uma causa'],
    idealEnvironment: ['Ambiente estável e previsível', 'Ambiente que permita mudar gradualmente', 'Liberdade de normas de restrição', 'Pouco conflito entre pessoas', 'Relações de trabalho duradouras'],
    underPressure: ['Despreocupado', 'Indeciso', 'Inflexível', 'Reservado'],
    motivations: ['Liberdade de expressão', 'Ausência de controle rígido', 'Oportunidade para delegar', 'Estabilidade e segurança', 'Ausência de conflitos'],
    improvements: ['Ser mais flexível às mudanças', 'Atentar-se mais aos prazos', 'Ter mais coragem para enfrentar problemas', 'Saber dizer não', 'Ser mais direto e assertivo', 'Expressar seus sentimentos'],
    values: 'Criatividade e liberdade',
    fear: 'Mudanças bruscas',
    decisionStyle: 'Cautelosa e emocional',
  },
  C: {
    name: 'Cauteloso',
    tagline: 'Busca Precisão',
    description: 'Pessoas com perfil Cauteloso são analíticas, metódicas e detalhistas por natureza. Antes de tomar qualquer decisão, examinam cuidadosamente os dados, pesam os riscos e buscam a solução mais precisa e fundamentada. São especialistas em identificar falhas e manter padrões de qualidade elevados. Seu pensamento sistemático e sua capacidade de análise profunda tornam-nas referências técnicas inestimáveis dentro de qualquer equipe.',
    characteristics: ['Detalhista', 'Organizado', 'Estrategista', 'Analítico', 'Consciente', 'Diplomático', 'Exato', 'Preciso', 'Perfeccionista'],
    strengths: ['Toma decisões analisando todos os detalhes', 'Bom solucionador de problemas', 'Alta concentração e sensibilidade', 'Muito criativo', 'Mantém padrões altos', 'Objetivo'],
    teamValue: ['Compreensivo', 'Resolve problemas', 'Consciente e consistente', 'Define e esclarece', 'Mantém padrões altos', 'Ancorado na realidade'],
    idealEnvironment: ['Ambiente de trabalho familiar', 'Cargo técnico ou especializado', 'Escritório ou área de trabalho privada', 'Onde é necessário pensamento crítico', 'Relação estreita com grupo pequeno'],
    underPressure: ['Difícil de agradar', 'Meticuloso', 'Muito crítico', 'Pessimista'],
    motivations: ['Certeza e compreensão exata das regras', 'Conhecimento específico', 'Ausência de riscos e erros', 'Ver o produto acabado (começo, meio e fim)'],
    improvements: ['Ser mais flexível e aberto a mudanças', 'Melhorar o entusiasmo', 'Aceitar outros estilos comportamentais', 'Ser menos crítico', 'Ser mais rápido para agir', 'Não se apegar excessivamente aos detalhes'],
    values: 'Ordem e controle',
    fear: 'Estar errado',
    decisionStyle: 'Sistemática, analítica e baseada em fatos',
  },
}

// ============================================================
// FUNÇÃO PRINCIPAL DE CÁLCULO
// Escalável: funciona com qualquer número de grupos
// ============================================================

export function calculateDisc(answers: DiscAnswer[]): DiscResult {
  const expectedGroups = DISC_GROUPS.length
  if (answers.length !== expectedGroups) {
    throw new Error(`O teste DISC requer exatamente ${expectedGroups} grupos de respostas.`)
  }

  const scores = { D: 0, I: 0, S: 0, C: 0 }

  for (const answer of answers) {
    const sum = answer.scores.D + answer.scores.I + answer.scores.S + answer.scores.C
    if (sum !== 10) throw new Error(`Grupo ${answer.groupNumber}: soma deve ser 10, recebido ${sum}`)

    scores.D += answer.scores.D
    scores.I += answer.scores.I
    scores.S += answer.scores.S
    scores.C += answer.scores.C
  }

  // Total = grupos × 10 (ex: 40 grupos → 400 pontos totais)
  const total = expectedGroups * 10

  const percentages = {
    D: parseFloat((scores.D / total).toFixed(4)),
    I: parseFloat((scores.I / total).toFixed(4)),
    S: parseFloat((scores.S / total).toFixed(4)),
    C: parseFloat((scores.C / total).toFixed(4)),
  }

  const sorted = (Object.entries(scores) as [DiscProfile, number][]).sort(([, a], [, b]) => b - a)
  const predominant = sorted[0][0]
  const secondary = sorted[1][0]
  const combination = predominant + secondary

  return {
    scores,
    percentages,
    predominant,
    secondary,
    combination,
    report: DISC_PROFILES[predominant],
  }
}

// ============================================================
// INDICADORES DE NECESSIDADES BÁSICAS COMBINADAS
// ============================================================

export function discNeedsIndicators(scores: { D: number; I: number; S: number; C: number }) {
  const total = DISC_GROUPS.length * 10
  return {
    needForControl:       parseFloat(((scores.D + scores.C) / total).toFixed(4)),
    needForPerfection:    parseFloat(((scores.C + scores.S) / total).toFixed(4)),
    ambition:             parseFloat(((scores.D + scores.I) / total).toFixed(4)),
    needToShine:          parseFloat((scores.I / total).toFixed(4)),
    stabilityAndSecurity: parseFloat(((scores.S + scores.C) / total).toFixed(4)),
    adventureAndVariety:  parseFloat((scores.D / total).toFixed(4)),
    taskOriented:         parseFloat(((scores.D + scores.C) / total).toFixed(4)),
    peopleOriented:       parseFloat(((scores.I + scores.S) / total).toFixed(4)),
    extroversion:         parseFloat(((scores.D + scores.I) / total).toFixed(4)),
    introversion:         parseFloat(((scores.S + scores.C) / total).toFixed(4)),
    rational:             parseFloat(((scores.D + scores.C) / total).toFixed(4)),
    emotional:            parseFloat(((scores.I + scores.S) / total).toFixed(4)),
  }
}

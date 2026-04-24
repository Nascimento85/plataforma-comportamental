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
    name: 'Dominante (ou Executor)',
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
    name: 'Influenciador (ou Comunicador)',
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
    name: 'Estável (ou Planejador)',
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
    name: 'Conforme (ou Analista)',
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

// ============================================================
// QUESTÕES V2 — mesmas dimensões D/I/S/C, formulação alternativa
// ============================================================
export const DISC_GROUPS_V2: DiscGroup[] = [
  { groupNumber: 1,  theme: 'As pessoas que me conhecem bem diriam que sou...', options: { D: 'Determinado e firme', I: 'Animado e comunicativo', S: 'Calmo e confiável', C: 'Preciso e analítico' } },
  { groupNumber: 2,  theme: 'Quando tenho um objetivo, o que mais importa pra mim é...', options: { D: 'Alcançar o resultado logo', I: 'Engajar as pessoas no processo', S: 'Garantir que todos estejam bem', C: 'Fazer do jeito certo' } },
  { groupNumber: 3,  theme: 'Minha abordagem natural a novos projetos é...', options: { D: 'Mergulhar de cabeça e ajustar no caminho', I: 'Compartilhar a empolgação com o time', S: 'Entender bem antes de começar', C: 'Planejar cada etapa minuciosamente' } },
  { groupNumber: 4,  theme: 'O ambiente que me traz mais energia é...', options: { D: 'Dinâmico, com metas claras e autonomia', I: 'Cheio de interação e colaboração', S: 'Estável, com rotinas bem definidas', C: 'Organizado, com processos e critérios' } },
  { groupNumber: 5,  theme: 'Quando alguém me desafia ou discorda de mim...', options: { D: 'Encaro de frente e defendo minha posição', I: 'Tento persuadir e criar consenso', S: 'Cedo para evitar conflito', C: 'Apresento fatos e dados para argumentar' } },
  { groupNumber: 6,  theme: 'O que me motiva a dar o meu melhor é...', options: { D: 'A chance de vencer e superar metas', I: 'Ser reconhecido e valorizado pelo grupo', S: 'Contribuir para o bem-estar da equipe', C: 'Entregar um trabalho de alta qualidade' } },
  { groupNumber: 7,  theme: 'Na hora de resolver um problema, prefiro...', options: { D: 'Agir rapidamente e assumir o controle', I: 'Brainstormar com outras pessoas', S: 'Seguir o processo já conhecido', C: 'Investigar a fundo antes de agir' } },
  { groupNumber: 8,  theme: 'Minha maior força como líder ou colega é...', options: { D: 'Tomar decisões com confiança', I: 'Inspirar e motivar os demais', S: 'Ser o suporte emocional do time', C: 'Garantir qualidade e precisão' } },
  { groupNumber: 9,  theme: 'Em momentos de crise ou mudança brusca, costumo...', options: { D: 'Assumir o comando e agir rápido', I: 'Buscar apoio e engajar o grupo', S: 'Precisar de tempo para me readaptar', C: 'Analisar cuidadosamente antes de reagir' } },
  { groupNumber: 10, theme: 'Minha maior dificuldade interpessoal é...', options: { D: 'Ter paciência com quem é lento ou hesitante', I: 'Manter o foco sem me dispersar', S: 'Me posicionar com firmeza quando necessário', C: 'Me abrir emocionalmente com as pessoas' } },
  { groupNumber: 11, theme: 'Ao planejar meu dia, dou prioridade a...', options: { D: 'Resultados e tarefas de alto impacto', I: 'Interações, reuniões e conexões', S: 'Rotinas e tarefas previsíveis', C: 'Revisões, verificações e organização' } },
  { groupNumber: 12, theme: 'Em uma equipe, o papel que ocupo naturalmente é...', options: { D: 'O executor e motor do grupo', I: 'O catalisador e animador', S: 'O estabilizador e apoio', C: 'O verificador e guardião da qualidade' } },
  { groupNumber: 13, theme: 'Quando recebo feedback negativo, minha reação é...', options: { D: 'Questionar e justificar meu ponto', I: 'Reagir emocionalmente e logo superar', S: 'Absorver em silêncio, guardando mágoa', C: 'Analisar friamente se faz sentido' } },
  { groupNumber: 14, theme: 'Minha relação com o tempo é...', options: { D: 'Gero urgência e não tolerо atrasos', I: 'Sou flexível e às vezes me perco nos prazos', S: 'Sigo meu ritmo com constância', C: 'Sou meticuloso e cumpro prazos com planejamento' } },
  { groupNumber: 15, theme: 'O que me faz sentir valorizado no trabalho é...', options: { D: 'Ter autonomia e poder decidir', I: 'Ser elogiado e reconhecido publicamente', S: 'Sentir que faço parte de algo maior', C: 'Saber que meu trabalho é preciso e correto' } },
  { groupNumber: 16, theme: 'Minha comunicação tende a ser...', options: { D: 'Objetiva, direta e sem rodeios', I: 'Expressiva, envolvente e emotiva', S: 'Gentil, cuidadosa e harmoniosa', C: 'Detalhada, fundamentada e técnica' } },
  { groupNumber: 17, theme: 'Ao iniciar um novo relacionamento profissional, costumo...', options: { D: 'Ir direto ao ponto e ser eficiente', I: 'Ser caloroso e criar conexão rapidamente', S: 'Observar antes de me abrir', C: 'Ser reservado até ganhar confiança' } },
  { groupNumber: 18, theme: 'Diante de regras que não concordo, costumo...', options: { D: 'Questionar abertamente e propor mudanças', I: 'Fazer piada e adaptar à minha maneira', S: 'Seguir mesmo discordando, para manter a paz', C: 'Seguir, pois regras existem por uma razão' } },
  { groupNumber: 19, theme: 'Meu estilo em reuniões de trabalho é...', options: { D: 'Conduzir, propor e fechar decisões', I: 'Falar bastante e energizar o grupo', S: 'Ouvir com atenção e falar quando necessário', C: 'Tomar notas e observar com cuidado' } },
  { groupNumber: 20, theme: 'Quando enfrento obstáculos, minha resposta natural é...', options: { D: 'Insistir até superar com força de vontade', I: 'Buscar ajuda e apoio de outros', S: 'Continuar com persistência e calma', C: 'Revisar o processo para identificar erros' } },
  { groupNumber: 21, theme: 'A palavra que melhor me define profissionalmente é...', options: { D: 'Realizador', I: 'Engajador', S: 'Colaborador', C: 'Especialista' } },
  { groupNumber: 22, theme: 'Quando preciso delegar tarefas, costumo...', options: { D: 'Dar a meta e esperar resultado', I: 'Explicar e motivar a pessoa', S: 'Apoiar e acompanhar de perto', C: 'Detalhar cada passo com clareza' } },
  { groupNumber: 23, theme: 'Minha postura diante de riscos é...', options: { D: 'Aceito e até busco riscos calculados', I: 'Aceito se houver entusiasmo e apoio', S: 'Prefiro evitar, me sinto mais seguro', C: 'Evito ao máximo após análise cuidadosa' } },
  { groupNumber: 24, theme: 'Quando estou no meu melhor estado, sou...', options: { D: 'Confiante, focado e decisivo', I: 'Entusiasmado, criativo e inspirador', S: 'Paciente, empático e estável', C: 'Preciso, organizado e meticuloso' } },
  { groupNumber: 25, theme: 'Minha abordagem em negociações é...', options: { D: 'Firme e orientada a resultados', I: 'Relacional e baseada em confiança', S: 'Colaborativa e de conciliação', C: 'Baseada em dados e detalhes contratuais' } },
  { groupNumber: 26, theme: 'Quando o trabalho está lento ou entediante, costumo...', options: { D: 'Criar novos desafios ou mudanças', I: 'Buscar interação para me animar', S: 'Continuar com paciência e constância', C: 'Me aprofundar em detalhes e aperfeiçoamentos' } },
  { groupNumber: 27, theme: 'Em situações de conflito entre colegas, prefiro...', options: { D: 'Intervir e resolver de forma direta', I: 'Mediar com empatia e bom humor', S: 'Suavizar a situação e promover harmonia', C: 'Manter distância e deixar os envolvidos resolverem' } },
  { groupNumber: 28, theme: 'Sobre inovação e novas ideias, minha postura é...', options: { D: 'Gosto de criar e implementar rapidamente', I: 'Me empolgo e envolvo todos no processo', S: 'Aceito quando estou seguro do resultado', C: 'Avalio cuidadosamente antes de apoiar' } },
  { groupNumber: 29, theme: 'Ao final de um projeto bem-sucedido, o que mais me satisfaz é...', options: { D: 'Ter superado o desafio e batido a meta', I: 'Ter criado vínculos e celebrado junto', S: 'Ter contribuído para o sucesso do time', C: 'Ter entregue um trabalho impecável' } },
  { groupNumber: 30, theme: 'Minha atitude frente a feedbacks de outros é...', options: { D: 'Analiso e decido se muda algo ou não', I: 'Recebo bem se vier com gentileza', S: 'Aceito prontamente para evitar tensão', C: 'Avalio cada ponto com critério rigoroso' } },
  { groupNumber: 31, theme: 'Quando trabalho remotamente ou de forma independente...', options: { D: 'Rendo muito — gosto de autonomia total', I: 'Sinto falta de interação e perco energia', S: 'Me organizo bem se houver rotina', C: 'Funciono bem com processos estruturados' } },
  { groupNumber: 32, theme: 'Em relação a erros, minha postura é...', options: { D: 'Identifico o responsável e corrijo rápido', I: 'Aprendo e sigo em frente sem me apegar', S: 'Fico preocupado com o impacto nas pessoas', C: 'Analiso detalhadamente para não repetir' } },
  { groupNumber: 33, theme: 'Para mim, sucesso profissional significa...', options: { D: 'Alcançar poder, reconhecimento e resultados', I: 'Ter relações ricas e ser admirado', S: 'Ter estabilidade e contribuir com o grupo', C: 'Ser referência técnica na minha área' } },
  { groupNumber: 34, theme: 'Quando a equipe não está comprometida, costumo...', options: { D: 'Confrontar e cobrar resultados diretamente', I: 'Motivar e reacender o entusiasmo do grupo', S: 'Continuar comprometido e esperar que mude', C: 'Analisar o que está causando o problema' } },
  { groupNumber: 35, theme: 'Minha tomada de decisão se baseia principalmente em...', options: { D: 'Intuição e confiança própria', I: 'Opinião das pessoas ao redor', S: 'Análise cuidadosa do impacto em todos', C: 'Dados, evidências e lógica' } },
  { groupNumber: 36, theme: 'Quando estabeleço metas, costumo ser...', options: { D: 'Ambicioso — miro alto e exijo muito de mim', I: 'Otimista — acredito que tudo vai dar certo', S: 'Realista — prefiro metas alcançáveis', C: 'Meticuloso — defino critérios de sucesso precisos' } },
  { groupNumber: 37, theme: 'Minha atitude em treinamentos e aprendizados é...', options: { D: 'Foco no que é prático e aplicável já', I: 'Gosto quando é interativo e envolvente', S: 'Prefiro conteúdos estáveis e bem estruturados', C: 'Quero profundidade e embasamento técnico' } },
  { groupNumber: 38, theme: 'Para mim, um bom líder é aquele que...', options: { D: 'Age com firmeza e mantém o time focado', I: 'Inspira e cria entusiasmo coletivo', S: 'Cuida do bem-estar e é consistente', C: 'É competente, criterioso e justo' } },
  { groupNumber: 39, theme: 'Em relação ao meu lado emocional no trabalho...', options: { D: 'Controlo bem — prefiro foco e resultado', I: 'Expresso com facilidade — sou aberto', S: 'Sou sensível mas discreto', C: 'Guardo para mim — prefiro ser racional' } },
  { groupNumber: 40, theme: 'O que mais me incomoda em um ambiente de trabalho é...', options: { D: 'Burocracia, lentidão e falta de autonomia', I: 'Frieza, isolamento e falta de reconhecimento', S: 'Conflitos, instabilidade e falta de harmonia', C: 'Desorganização, imprecisão e falta de padrões' } },
]

// ============================================================
// QUESTÕES V3 — situacionais e cenários do dia a dia
// ============================================================
export const DISC_GROUPS_V3: DiscGroup[] = [
  { groupNumber: 1,  theme: 'Você assume um novo projeto urgente sem briefing claro. Você...', options: { D: 'Age imediatamente e define o rumo', I: 'Reúne a equipe para criar a ideia juntos', S: 'Pede mais informações antes de começar', C: 'Mapeia o problema antes de qualquer ação' } },
  { groupNumber: 2,  theme: 'Seu time está desmotivado antes de uma entrega importante. Você...', options: { D: 'Cobra comprometimento e dá o exemplo', I: 'Anima o grupo com energia e otimismo', S: 'Apoia individualmente cada pessoa', C: 'Identifica os gargalos e resolve os problemas' } },
  { groupNumber: 3,  theme: 'Uma reunião vai se estender além do previsto. Você...', options: { D: 'Corta o debate e força uma decisão', I: 'Mantém o clima leve com humor', S: 'Fica quieto e aceita o tempo extra', C: 'Pede para retornar à pauta e ser mais objetivo' } },
  { groupNumber: 4,  theme: 'Você recebe uma meta ambiciosa com prazo apertado. Você...', options: { D: 'Aceita o desafio com entusiasmo e parte para a ação', I: 'Engaja o time e cria momentum coletivo', S: 'Verifica se é viável e pede suporte', C: 'Elabora um plano detalhado antes de agir' } },
  { groupNumber: 5,  theme: 'Você descobre que um processo interno está errado há meses. Você...', options: { D: 'Intervém imediatamente para corrigir', I: 'Conta para todos e cria energia em torno da mudança', S: 'Reporta discretamente para a liderança', C: 'Documenta o problema e propõe solução estruturada' } },
  { groupNumber: 6,  theme: 'Você está num jantar de negócios com pessoas que não conhece. Você...', options: { D: 'Vai direto ao ponto sobre negócios', I: 'Faz amizade com todos e anima a mesa', S: 'Ouve com atenção e fala quando solicitado', C: 'Observa o perfil de cada pessoa antes de interagir' } },
  { groupNumber: 7,  theme: 'Seu chefe pede uma solução criativa para um problema. Você...', options: { D: 'Propõe algo arrojado e vai a fundo', I: 'Faz um brainstorming animado com a equipe', S: 'Busca uma solução que já funcionou antes', C: 'Pesquisa referências e constrói uma solução fundamentada' } },
  { groupNumber: 8,  theme: 'Você precisa apresentar resultados para a diretoria. Você...', options: { D: 'Vai direto aos números e decisões necessárias', I: 'Cria uma apresentação envolvente e impactante', S: 'Prepara com cuidado para não errar', C: 'Revisita cada dado para garantir precisão absoluta' } },
  { groupNumber: 9,  theme: 'Um colega erra algo que afeta seu trabalho. Você...', options: { D: 'Fala diretamente sobre o problema', I: 'Aborda de forma leve para não criar clima ruim', S: 'Absorve o impacto e resolve sozinho', C: 'Registra e comunica formalmente o ocorrido' } },
  { groupNumber: 10, theme: 'Você está com excesso de tarefas ao mesmo tempo. Você...', options: { D: 'Prioriza o que gera mais resultado e delega o resto', I: 'Pede ajuda e distribui as tarefas com leveza', S: 'Faz uma por vez com calma e constância', C: 'Cria uma lista priorizada com prazos e critérios' } },
  { groupNumber: 11, theme: 'Uma ideia sua é rejeitada na reunião. Você...', options: { D: 'Insiste e argumenta com vigor', I: 'Aceita com humor e já pensa na próxima', S: 'Aceita em silêncio, sentindo-se um pouco frustrado', C: 'Questiona educadamente os critérios usados para recusar' } },
  { groupNumber: 12, theme: 'Você precisa liderar uma equipe multidisciplinar. Você...', options: { D: 'Define papéis claros e cobra desempenho', I: 'Cria clima de entusiasmo e colaboração', S: 'Garante que todos se sintam ouvidos e valorizados', C: 'Estabelece processos e padrões de qualidade' } },
  { groupNumber: 13, theme: 'A empresa anuncia uma grande mudança de estratégia. Você...', options: { D: 'Vê como oportunidade e quer liderar a transição', I: 'Comemora — gosta de novidades e dinamismo', S: 'Precisa de tempo para processar e se adaptar', C: 'Quer entender em profundidade antes de aceitar' } },
  { groupNumber: 14, theme: 'Você tem que dar uma notícia ruim a um colega. Você...', options: { D: 'É direto e objetivo, sem enrolação', I: 'Suaviza com empatia e leveza', S: 'Adia ao máximo para não magoar', C: 'Prepara uma comunicação estruturada e cuidadosa' } },
  { groupNumber: 15, theme: 'Seu projeto é elogiado publicamente. O que mais te satisfaz?', options: { D: 'O resultado que alcancei por minha competência', I: 'O reconhecimento diante de todos', S: 'Saber que contribuí para o time', C: 'A qualidade impecável do trabalho entregue' } },
  { groupNumber: 16, theme: 'Você entra numa empresa nova. Como age nas primeiras semanas?', options: { D: 'Identifica oportunidades e já começa a gerar impacto', I: 'Faz conexões com todos e cria um bom ambiente', S: 'Observa, aprende e se adapta ao ritmo', C: 'Estuda processos e entende como tudo funciona' } },
  { groupNumber: 17, theme: 'Você tem 1 hora livre inesperada no trabalho. Você...', options: { D: 'Avança em projetos estratégicos parados', I: 'Aproveita para conversar e criar conexões', S: 'Organiza a mesa e finaliza pendências', C: 'Revisa processos e busca melhorias' } },
  { groupNumber: 18, theme: 'Sua equipe tem um conflito interno. Você...', options: { D: 'Intervém com firmeza para resolver logo', I: 'Tenta aliviar a tensão com bom humor', S: 'Media com cuidado para preservar os relacionamentos', C: 'Analisa as causas e propõe solução estruturada' } },
  { groupNumber: 19, theme: 'Um cliente faz uma demanda fora do escopo combinado. Você...', options: { D: 'Negocia com firmeza e define limites', I: 'Tenta acomodar e criar boa vontade', S: 'Tende a ceder para não gerar atrito', C: 'Consulta o contrato e responde formalmente' } },
  { groupNumber: 20, theme: 'Você precisa aprender uma nova tecnologia rapidamente. Você...', options: { D: 'Aprende o essencial e já coloca em prática', I: 'Aprende em grupo ou com um parceiro', S: 'Segue um tutorial passo a passo com calma', C: 'Estuda a fundo a documentação antes de usar' } },
  { groupNumber: 21, theme: 'Seu gestor lhe dá total autonomia em um projeto. Você...', options: { D: 'Fica empolgado e parte para a ação logo', I: 'Compartilha a notícia e envolve o time', S: 'Se organiza com cuidado antes de avançar', C: 'Cria um plano detalhado com etapas e métricas' } },
  { groupNumber: 22, theme: 'Durante uma crise, seu time está em pânico. Você...', options: { D: 'Assume o comando e age com decisão', I: 'Acalma o grupo com energia positiva', S: 'Oferece suporte emocional e estabilidade', C: 'Analisa os dados para entender o problema real' } },
  { groupNumber: 23, theme: 'Você está num trabalho repetitivo por semanas. Você...', options: { D: 'Fica frustrado e busca desafios maiores', I: 'Tenta tornar o processo mais divertido', S: 'Cumpre com constância sem reclamar', C: 'Usa o tempo para refinar e otimizar o processo' } },
  { groupNumber: 24, theme: 'Uma pessoa pede sua opinião honesta sobre o trabalho dela. Você...', options: { D: 'É direto e aponta os pontos fracos claramente', I: 'Elogia primeiro, depois toca nos pontos a melhorar', S: 'Escolhe as palavras com muito cuidado', C: 'Dá um feedback estruturado com critérios claros' } },
  { groupNumber: 25, theme: 'Você discorda da decisão do gestor. Você...', options: { D: 'Questiona abertamente na reunião', I: 'Manifesta a discordância com leveza', S: 'Aceita em silêncio e segue as instruções', C: 'Pede reunião privada e apresenta argumentos formais' } },
  { groupNumber: 26, theme: 'Você é convidado para coordenar um evento corporativo. Você...', options: { D: 'Assume a responsabilidade e define tudo com eficiência', I: 'Abraça com entusiasmo e torna o evento memorável', S: 'Cuida dos detalhes para que todos se sintam bem', C: 'Organiza cronograma, orçamento e lista de tarefas' } },
  { groupNumber: 27, theme: 'Dois projetos urgentes surgem ao mesmo tempo. Você...', options: { D: 'Prioriza pelo impacto e age imediatamente', I: 'Pede ajuda e distribui com energia', S: 'Verifica com o gestor qual é mais urgente', C: 'Avalia critérios objetivos para decidir a ordem' } },
  { groupNumber: 28, theme: 'Você tem que revisar o trabalho de um colega. Você...', options: { D: 'Verifica o essencial e foca no resultado final', I: 'Comenta de forma leve e construtiva', S: 'Cuida para não constranger a pessoa', C: 'Revisa cada detalhe com rigor e documentação' } },
  { groupNumber: 29, theme: 'Uma ideia inovadora surge durante uma conversa informal. Você...', options: { D: 'Parte para a ação e tenta implementar logo', I: 'Compartilha com todos e gera entusiasmo', S: 'Anota e espera o momento certo para propor', C: 'Pesquisa viabilidade antes de levar adiante' } },
  { groupNumber: 30, theme: 'Você está trabalhando com alguém com perfil muito diferente do seu. Você...', options: { D: 'Mantém o foco nos resultados e vai direto ao ponto', I: 'Cria conexão pessoal para facilitar a colaboração', S: 'Se adapta ao ritmo da outra pessoa com paciência', C: 'Define processos claros para que trabalhem bem juntos' } },
  { groupNumber: 31, theme: 'Há um atraso no projeto por causa de um processo burocrático. Você...', options: { D: 'Pula etapas ou escalona para resolver rápido', I: 'Usa o charme para convencer alguém a agilizar', S: 'Aguarda com paciência seguindo o processo', C: 'Documenta o problema e propõe melhoria formal' } },
  { groupNumber: 32, theme: 'Você está apresentando uma ideia nova para uma plateia resistente. Você...', options: { D: 'Apresenta com autoridade e insiste nos benefícios', I: 'Usa storytelling e emoção para persuadir', S: 'Apresenta com suavidade e abertura a ajustes', C: 'Mostra dados, pesquisas e evidências técnicas' } },
  { groupNumber: 33, theme: 'Um projeto que você liderava é cancelado. Você...', options: { D: 'Redireciona energia para o próximo desafio', I: 'Lamenta mas logo busca nova oportunidade animadora', S: 'Sente o impacto, mas aceita e segue em frente', C: 'Analisa as causas para aprender com o ocorrido' } },
  { groupNumber: 34, theme: 'Você tem que treinar alguém novo na empresa. Você...', options: { D: 'Passa o essencial e espera que a pessoa se vire', I: 'Acolhe com entusiasmo e cria um vínculo', S: 'Acompanha com paciência e suporte constante', C: 'Prepara material estruturado e acompanha cada etapa' } },
  { groupNumber: 35, theme: 'Você pode redesenhar seu cargo. O que você priorizaria?', options: { D: 'Mais autonomia e projetos desafiadores', I: 'Mais interação, colaboração e visibilidade', S: 'Mais estabilidade e clareza nos processos', C: 'Mais especialização e profundidade técnica' } },
  { groupNumber: 36, theme: 'No final do dia, o que te faz sentir produtivo?', options: { D: 'Ter tomado decisões e avançado metas', I: 'Ter gerado impacto positivo nas pessoas', S: 'Ter colaborado e deixado todos bem', C: 'Ter entregado trabalho correto e bem feito' } },
  { groupNumber: 37, theme: 'Você recebe uma tarefa sem instruções claras. Você...', options: { D: 'Age pela lógica e decide sozinho como fazer', I: 'Pergunta para as pessoas e vai construindo', S: 'Pede orientação antes de começar', C: 'Exige clareza — sem briefing, não avança' } },
  { groupNumber: 38, theme: 'Seu time tem que escolher entre dois caminhos opostos. Você...', options: { D: 'Toma a decisão e assume a responsabilidade', I: 'Propõe votação e engaja todos na escolha', S: 'Apoia a decisão da maioria', C: 'Apresenta análise de prós e contras de cada opção' } },
  { groupNumber: 39, theme: 'Você precisa pedir desculpas a alguém por um erro. Você...', options: { D: 'Assume rapidamente e parte para a solução', I: 'Pede desculpas com carinho e leveza emocional', S: 'Fica constrangido mas faz com sinceridade', C: 'Explica o contexto e se compromete formalmente' } },
  { groupNumber: 40, theme: 'Para você, uma semana de trabalho ideal seria...', options: { D: 'Cheia de decisões, conquistas e resultados', I: 'Com muitas interações, conexões e reconhecimento', S: 'Previsível, harmoniosa e produtiva no seu ritmo', C: 'Organizada, com entregas precisas e bem planejadas' } },
]

// ============================================================
// LOOKUP: versão → conjunto de grupos
// ============================================================
export const DISC_GROUP_SETS: Record<1 | 2 | 3, DiscGroup[]> = {
  1: DISC_GROUPS,
  2: DISC_GROUPS_V2,
  3: DISC_GROUPS_V3,
}

/** Deriva a versão a partir do token UUID */
export function getDiscVersion(token: string): 1 | 2 | 3 {
  const sum = token.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)
  return ((sum % 3) + 1) as 1 | 2 | 3
}

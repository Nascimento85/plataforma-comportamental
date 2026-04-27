// ============================================================
// Relatório Premium — 4 TEMPERAMENTOS
// Foco: Natureza Biológica e Reações Instintivas.
// Estrutura premium específica do tema:
//   - Alimentação e Energia
//   - Gestão de Raiva/Ansiedade
//   - Virtudes e Vícios (filosófico)
// ============================================================

export type TemperamentKey = 'COLERICO' | 'SANGUINEO' | 'MELANCOLICO' | 'FLEUMATICO'

export interface TemperamentPremium {
  key:      TemperamentKey
  label:    string
  pitch:    string
  paletteHex: string
  body: {
    biology:    string                       // como o corpo dele responde
    energyCurve: string                      // pico de energia ao longo do dia
    sleep:       string                      // padrão de sono ideal
  }
  food: {
    summary: string
    stimulants: string[]                     // a EVITAR
    grounding:  string[]                     // a INCLUIR
    sample_day: { meal: string; suggestion: string }[]
  }
  stress: {
    acuteResponse:  string                   // reação imediata ao estresse
    rageOrAnxiety:  string                   // raiva ou ansiedade?
    techniques:     Array<{ name: string; how: string; duration: string }>
  }
  virtuesVices: {
    cardinalVirtue: string
    cardinalVice:   string
    practices: string[]                      // 5 práticas para equilibrar
  }
  pdi21Days: Array<{ day: number; focus: string; task: string }>
}

// ──────────────────────────────────────────────────────────
// EXEMPLO DENSO: COLÉRICO (executável; demais seguem mesma forma)
// ──────────────────────────────────────────────────────────
export const colericoPremium: TemperamentPremium = {
  key: 'COLERICO',
  label: 'Colérico — O Combustível',
  pitch: 'Você vive em chama. A pergunta não é se vai queimar; é o que vai aceder ANTES de queimar.',
  paletteHex: '#c4633a',

  body: {
    biology:
      'Sistema nervoso simpático ativado por padrão. Adrenalina e noradrenalina sobem rápido e descem devagar. Por isso você "fica acelerado" mesmo depois do gatilho passar.',
    energyCurve:
      'Pico entre 6h–11h. Queda forte às 14h–15h (não é preguiça, é depleção). 2º pico fraco às 18h. Insônia "irritada" (não cansada) é comum se o dia teve conflito.',
    sleep:
      'Ideal: dormir antes das 23h. Quanto mais tarde, mais difícil — porque você atravessa a janela de melatonina e entra em vigília adrenérgica.',
  },

  food: {
    summary:
      'Colérico processa estimulante como combustível adicional num motor já acelerado. Pequenos ajustes têm impacto desproporcional.',
    stimulants: [
      'Café após 14h (sustenta 6–8h em colérico)',
      'Açúcar refinado em jejum (pico–queda agressivo)',
      'Álcool destilado em dias de pressão alta (vira combustível agressivo)',
      'Pimenta + frituras em jantares longos',
    ],
    grounding: [
      'Magnésio bisglicinato à noite (300–400mg)',
      'Chás de camomila ou maracujá após 19h',
      'Carboidrato complexo no jantar (batata-doce, arroz, aveia)',
      'Vegetais folhosos verdes diariamente',
      'Hidratação alta (35ml × kg corporal)',
    ],
    sample_day: [
      { meal: 'Manhã (6h-9h)',  suggestion: 'Proteína + carboidrato complexo + 1 café (até 9h). NÃO em jejum.' },
      { meal: 'Almoço (12h-13h)', suggestion: 'Proteína magra + folhas + cereal integral. Evite refeição pesada.' },
      { meal: 'Lanche (15h-16h)', suggestion: 'Fruta + oleaginosas. Evite cafeína nesta janela.' },
      { meal: 'Jantar (19h-20h)', suggestion: 'Carboidrato + proteína leve + vegetais. Sem álcool em dias tensos.' },
      { meal: 'Pré-sono',          suggestion: 'Chá calmante + magnésio. Tela desligada 30 min antes.' },
    ],
  },

  stress: {
    acuteResponse:
      'Mandíbula trava, ombros sobem, voz aumenta de volume. Pulso sobe 10–20bpm em 15 segundos. Você decide rápido demais — quase sempre se arrepende em 24h.',
    rageOrAnxiety:
      'Raiva. Quase sempre. Ansiedade aparece como "frustração impaciente" — não como medo abstrato.',
    techniques: [
      { name: 'Respiração 4–7–8', how: 'Inspire 4s, segure 7s, solte 8s. 4 ciclos.', duration: '90s' },
      { name: 'Caminhada de 6 min', how: 'Saia da sala. Caminhe sem celular. Volte só com decisão tomada.', duration: '6 min' },
      { name: 'Escrita do dragão',  how: 'Escreva por 3 min sobre o que enfureceu, sem editar. Rasgue depois.', duration: '3 min' },
      { name: 'Banho frio',         how: 'Água fria nos pulsos e nuca por 60 segundos. Ativa parassimpático.', duration: '1 min' },
    ],
  },

  virtuesVices: {
    cardinalVirtue: 'Força — capacidade de mover o que não se moveria sem você.',
    cardinalVice:   'Ira — fogo que queima primeiro a casa de quem ama você.',
    practices: [
      '1. Pausa de 4 segundos antes de toda decisão emocional.',
      '2. Diário noturno de 3 linhas: "onde fui injusto hoje?".',
      '3. Pedir desculpa concreta, sem justificativa, em até 24h.',
      '4. Domingos sem agenda — terreno fértil para o silêncio.',
      '5. Praticar dar valor sem cobrar retribuição imediata.',
    ],
  },

  pdi21Days: [
    { day: 1, focus: 'Pausa', task: 'Conte 4 segundos antes de TODA resposta hoje.' },
    { day: 2, focus: 'Pausa', task: 'Em vez de cortar fala, pergunte: "posso completar meu ponto?"' },
    { day: 3, focus: 'Corpo', task: 'Caminhada de 30 min sem destino, sem celular.' },
    { day: 4, focus: 'Sono',  task: 'Dormir antes das 23h. Sem exceção.' },
    { day: 5, focus: 'Foco',  task: 'Escolha 1 prioridade do dia. Faça SÓ ela até terminar.' },
    { day: 6, focus: 'Reflexão', task: 'Diário: o que mudou desligando o motor por 5 dias?' },
    { day: 7, focus: 'Off',   task: 'Domingo sem trabalho.' },
    // …expanda até 21
  ],
}

// ──────────────────────────────────────────────────────────
// SANGUÍNEO (esqueleto — preencher iterando o prompt)
// ──────────────────────────────────────────────────────────
export const sanguineoPremium: Pick<TemperamentPremium,'key'|'label'|'pitch'|'paletteHex'> = {
  key: 'SANGUINEO',
  label: 'Sanguíneo — A Faísca',
  pitch: 'Você é luz. O risco é virar fogo de palha — brilhar 3 dias e apagar.',
  paletteHex: '#d4943a',
}

// ──────────────────────────────────────────────────────────
// MELANCÓLICO (esqueleto)
// ──────────────────────────────────────────────────────────
export const melancolicoPremium: Pick<TemperamentPremium,'key'|'label'|'pitch'|'paletteHex'> = {
  key: 'MELANCOLICO',
  label: 'Melancólico — A Profundidade',
  pitch: 'Você sente o que outros mal percebem. Aprenda a transformar peso em poesia, não em prisão.',
  paletteHex: '#3a4f8c',
}

// ──────────────────────────────────────────────────────────
// FLEUMÁTICO (esqueleto)
// ──────────────────────────────────────────────────────────
export const fleumaticoPremium: Pick<TemperamentPremium,'key'|'label'|'pitch'|'paletteHex'> = {
  key: 'FLEUMATICO',
  label: 'Fleumático — A Calma Profunda',
  pitch: 'Sua paz é seu superpoder. O risco é confundir paz com inércia.',
  paletteHex: '#7a9e7e',
}

export const TEMPERAMENT_PREMIUM = {
  COLERICO:    colericoPremium,
  SANGUINEO:   sanguineoPremium,
  MELANCOLICO: melancolicoPremium,
  FLEUMATICO:  fleumaticoPremium,
}

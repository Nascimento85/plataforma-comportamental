// ============================================================
// Relatório Premium — 12 ARQUÉTIPOS (Jung / Carol Pearson)
// Foco: Identidade, Marca Pessoal e Desejo de Alma.
// Estrutura específica:
//   - Branding Pessoal (visual + comunicação)
//   - Sombra do Arquétipo (lado obscuro)
//   - Ativação de Arquétipo (exercícios para invocar uma força)
// ============================================================

export type ArchetypeKey =
  | 'INNOCENT'  | 'EXPLORER' | 'SAGE'      | 'HERO'
  | 'REBEL'     | 'MAGICIAN' | 'ORPHAN'    | 'LOVER'
  | 'JESTER'    | 'CAREGIVER'| 'CREATOR'   | 'RULER'

export interface ArchetypePremium {
  key: ArchetypeKey
  label: string                              // "A Amante"
  pitch: string
  paletteHex: string
  symbolic: {
    elementary: string                       // elemento, cor, animal
    glyph:      string                       // descrição do glifo p/ Canva
  }

  branding: {
    aesthetic:  { palette: string[]; textures: string[]; fonts: string[] }
    wardrobe:   string[]                     // 5 peças-chave
    voice: {
      tone:        string
      doSay:       string[]
      dontSay:     string[]
      sample_post: string                    // exemplo de copy de Instagram
    }
    visualSignature: string                  // "fotos com luz natural quente, marca d'água floral"
  }

  shadow: {
    summary:    string
    triggers:   string[]                     // o que ativa a sombra
    behaviors:  string[]                     // como aparece no comportamento
    repair:     string[]                     // 5 práticas de retorno à luz
  }

  activation: {
    summary: string
    exercises: Array<{                       // como "invocar" o arquétipo
      name:     string
      duration: string
      ritual:   string
    }>
  }

  pdi21Days: Array<{ day: number; focus: string; task: string }>
}

// ──────────────────────────────────────────────────────────
// EXEMPLO DENSO: A AMANTE
// (estratégia indica DISC + Linguagens + Amante como combo)
// ──────────────────────────────────────────────────────────
export const loverPremium: ArchetypePremium = {
  key: 'LOVER',
  label: 'A Amante',
  pitch: 'Você foi feita para sentir intensamente. O risco é confundir intensidade com identidade. Aqui você aprende a brilhar sem se queimar.',
  paletteHex: '#a8522e',

  symbolic: {
    elementary: 'Elemento Fogo. Cores: Terracota, Rosa Antigo, Bronze. Animal: cisne ou pomba (a depender da fase).',
    glyph: 'Coração estilizado dentro de círculo solar — usar como marca d\'água em opacidade 8% no canto inferior direito.',
  },

  branding: {
    aesthetic: {
      palette:   ['#a8522e', '#d4a08a', '#e9d6c2', '#3a1a0e'],
      textures:  ['veludo', 'linho cru', 'flores secas', 'luz dourada do final da tarde'],
      fonts:     ['Cormorant Garamond (display)', 'Inter ou Lora (corpo)'],
    },
    wardrobe: [
      'Vestido midi de tecido fluido em tom terra',
      'Calça de alfaiataria + blusa de seda em rosa antigo',
      'Acessório quente: brinco de bronze, anel de pedra',
      'Lenço de seda com estampa floral discreta',
      'Sapato com salto baixo confortável (presença, não performance)',
    ],
    voice: {
      tone: 'Convidativa, sensorial, emocional sem ser piegas. Frases curtas, ritmo cadenciado.',
      doSay: [
        'Convide à experiência. ("Você já sentiu o cheiro de…?")',
        'Use verbos no presente sensorial.',
        'Deixe espaço para o silêncio entre as frases.',
      ],
      dontSay: [
        'Linguagem de pressão de venda dura.',
        'Bullets técnicos sem alma.',
        'Sarcasmo. Mata a vibração.',
      ],
      sample_post:
        '"Tem dia que a gente acorda e a luz entra pela janela como um chamado. Hoje foi assim. Talvez seja hora de você também olhar para o que te chama. Te conto no link da bio o que descobri sobre o seu arquétipo."',
    },
    visualSignature: 'Fotos com luz quente do final da tarde, fundos com flores ou tecidos. Capa do Instagram em paleta terracota com um único elemento brilhante (anel, taça, vela).',
  },

  shadow: {
    summary:
      'A Amante na sombra confunde "ser amada" com "existir". A relação vira espelho — sem o outro, ela some.',
    triggers: [
      'Sentir-se invisível para quem ama.',
      'Comparação com outra pessoa que ela percebe como "mais desejável".',
      'Rejeição direta ou indireta.',
      'Solidão prolongada.',
    ],
    behaviors: [
      'Dependência emocional disfarçada de "entrega".',
      'Ciúme intenso justificado como "amor verdadeiro".',
      'Mudança de identidade para se moldar ao parceiro.',
      'Drama, idealização, rompimento e retorno cíclico.',
    ],
    repair: [
      '1. Ritual de auto-cuidado SOZINHA — banho longo, perfume só seu, leitura na cama.',
      '2. Diário matinal: "o que sou eu independente de quem está comigo?".',
      '3. Convivência regular com a Sábia (leitura, estudo) e a Criadora (arte) — equilibra a Amante.',
      '4. Comunidade feminina — irmandade resgata o que a relação amorosa não pode dar.',
      '5. Terapia ou coaching — sombra trabalhada SOZINHA é lenta. Trabalhada com presença é mais rápida.',
    ],
  },

  activation: {
    summary:
      'Para invocar a Amante saudável (não a sombra), o caminho é o sensorial sagrado — não a busca compulsiva por afeto.',
    exercises: [
      { name: 'Banho ritual',         duration: '20 min',         ritual: 'Vela acesa, sal grosso, óleo essencial. Mergulho em silêncio. Mantra: "eu sou inteira em mim".' },
      { name: 'Mesa de mim',           duration: '30 min/semana',  ritual: 'Prato bonito, vinho ou chá, prato preparado COM cuidado para você mesma. Sem celular.' },
      { name: 'Carta de gratidão ao corpo', duration: '15 min',  ritual: 'Escrever uma carta para o próprio corpo agradecendo gestos invisíveis (digerir, respirar, abraçar).' },
      { name: 'Encontro com beleza',   duration: '1h/semana',     ritual: 'Visitar arte, jardim, livraria. Receber beleza sem produzir nada em troca.' },
    ],
  },

  pdi21Days: [
    { day: 1, focus: 'Auto-Cuidado',  task: 'Banho ritual de 20 min. Vela. Óleo. Sem celular.' },
    { day: 2, focus: 'Identidade',    task: 'Diário: "5 coisas que eu amo independente do meu relacionamento".' },
    { day: 3, focus: 'Beleza',        task: 'Visite um lugar bonito SOZINHA. 30 min mínimo.' },
    { day: 4, focus: 'Sensoriais',    task: 'Cozinhe um prato cuidadoso para você. Coma devagar.' },
    { day: 5, focus: 'Sombra',        task: 'Identifique 1 vez essa semana em que mudou de opinião para agradar.' },
    { day: 6, focus: 'Reflexão',      task: 'Escreva: "como eu seria se não precisasse ser amada hoje?".' },
    { day: 7, focus: 'Off',           task: 'Domingo de descanso sensorial. Música, livro, pele macia.' },
    // … expanda até 21
  ],
}

// Esqueletos para os 11 demais
const sk = (key: ArchetypeKey, label: string, pitch: string, paletteHex: string) => ({
  key, label, pitch, paletteHex,
})

export const ARCHETYPE_PREMIUM: Record<ArchetypeKey, Partial<ArchetypePremium>> = {
  INNOCENT:  sk('INNOCENT',  'A Inocente',     'Sua confiança é dom. Aqui você aprende a discernir sem perder a luz.',                       '#e9dec8'),
  EXPLORER:  sk('EXPLORER',  'A Exploradora',  'Liberdade é seu oxigênio. Raiz é sua próxima travessia.',                                     '#7a8298'),
  SAGE:      sk('SAGE',      'A Sábia',        'Conhecimento é sua moeda. Aprenda a ensinar sem se isolar.',                                  '#3a6db4'),
  HERO:      sk('HERO',      'A Heroína',      'Você foi feita para missão. Aqui descobre que descansar TAMBÉM é missão.',                    '#8c2f17'),
  REBEL:     sk('REBEL',     'A Rebelde',      'Quebrar o que adoeceu é seu chamado. Construir o novo é seu próximo capítulo.',               '#0E1A33'),
  MAGICIAN:  sk('MAGICIAN',  'A Maga',         'Você transforma matéria em significado. Aqui aprende a transformar sem manipular.',           '#3a1a3a'),
  ORPHAN:    sk('ORPHAN',    'A Pessoa Comum', 'Pertencer é seu dom. Aqui aprende a brilhar sem se sentir traidora.',                          '#7a9e7e'),
  LOVER:     loverPremium,
  JESTER:    sk('JESTER',    'A Boba da Corte','Sua leveza cura. Aqui você aprende a ser levada a sério sem perder o riso.',                  '#d4943a'),
  CAREGIVER: sk('CAREGIVER', 'A Cuidadora',    'Cuidar é sua vocação. Aqui você descobre que cuidar de si é o cuidar mais sagrado.',          '#a8522e'),
  CREATOR:   sk('CREATOR',   'A Criadora',     'Você dá forma ao invisível. Aqui aprende a criar sem se cobrar perfeição.',                   '#c4633a'),
  RULER:     sk('RULER',     'A Governante',   'Liderar é seu lugar. Aqui aprende a governar SEM virar prisioneira do trono.',                '#0E1A33'),
}

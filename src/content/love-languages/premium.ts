// ============================================================
// Relatório Premium — 5 LINGUAGENS DO AMOR
// Foco: Relacionamentos e Conexão Afetiva.
// Estrutura específica:
//   - Guia para o Parceiro (PDF para presentear)
//   - Linguagem no Trabalho (motivar liderados)
//   - Linguagem Ferida (como reage à negligência)
// ============================================================

export type LoveLanguageKey = 'WORDS' | 'TIME' | 'GIFTS' | 'SERVICE' | 'TOUCH'

export interface LoveLanguagePremium {
  key: LoveLanguageKey
  label: string
  pitch: string
  paletteHex: string

  partnerGuide: {
    title:   string
    summary: string
    do:      string[]                                 // ações concretas
    dont:    string[]
    sample_week: Array<{ day: string; action: string }>  // semana exemplo
    pdf_pages: number
  }

  workplace: {
    summary:    string
    asLeader:   { do: string[]; dont: string[] }      // como liderar com isso
    asEmployee: { ask: string[];  reframe: string[] } // como pedir ao chefe
  }

  woundedLanguage: {
    summary:        string
    reaction:       string                            // como reage à negligência
    repairScript:   string                            // como pedir reparação
    selfCare:       string[]                          // como cuidar do que dói
  }

  pdi21Days: Array<{ day: number; focus: string; task: string }>
}

// ──────────────────────────────────────────────────────────
// EXEMPLO DENSO: PALAVRAS DE AFIRMAÇÃO
// ──────────────────────────────────────────────────────────
export const wordsPremium: LoveLanguagePremium = {
  key: 'WORDS',
  label: 'Palavras de Afirmação',
  pitch: 'Você guarda elogios na alma como outros guardam ouro. Aqui você aprende a pedir os elogios certos — sem mendigar.',
  paletteHex: '#a8522e',

  partnerGuide: {
    title:   'Guia para Quem Ama Alguém de Palavras de Afirmação',
    summary:
      'Para uma pessoa de Palavras, "tá tudo bem" é vácuo. Ela precisa OUVIR. Não basta sentir; precisa ser dito. Sem palavras, ela duvida do amor — mesmo cercada de gestos.',
    do: [
      'Diga em voz alta o que você admira nela hoje. Específico, não genérico.',
      'Mande mensagens curtas no meio do dia. Bilhete na bolsa, no espelho, no almoço.',
      'Em público, faça pelo menos UM elogio sincero por encontro social.',
      'Reconheça o esforço, não só o resultado.',
      'Antes de dormir, diga 1 coisa boa do dia que envolve ela.',
    ],
    dont: [
      'Achar que "ela já sabe que eu amo". Para esse perfil, dizer É amar.',
      'Substituir palavras por presente caro. Anel não cobre 3 meses sem elogio.',
      'Críticas em público — corta o vínculo de raiz.',
      'Sarcasmo. Para Palavras, sarcasmo é violência simbólica.',
    ],
    sample_week: [
      { day: 'Segunda',  action: 'Mensagem matinal de 1 frase: "lembrei de você por X".' },
      { day: 'Terça',    action: 'Elogio específico em jantar: cite UM detalhe (cabelo, escolha de palavra, decisão tomada).' },
      { day: 'Quarta',   action: 'Bilhete escrito à mão.' },
      { day: 'Quinta',   action: 'Reconhecer publicamente algo que ela fez (em casa, com filhos, em rede social).' },
      { day: 'Sexta',    action: 'Áudio curto no WhatsApp dizendo o que ela representa para você.' },
      { day: 'Sábado',   action: 'Conversa de 20 min sem distração, perguntando como foi a semana DELA.' },
      { day: 'Domingo',  action: 'Antes de dormir: 1 frase de gratidão específica do dia.' },
    ],
    pdf_pages: 16,
  },

  workplace: {
    summary:
      'No trabalho, Palavras precisam ser ouvidas tanto quanto pagas. Reconhecimento público vale mais que aumento privado para esse perfil.',
    asLeader: {
      do: [
        'Reuniões 1:1 começam com 1 elogio concreto da semana.',
        'No grupo do time, mencione contribuição da pessoa por nome.',
        'Em e-mail para liderança, copie o autor da ideia.',
      ],
      dont: [
        'Achar que "salário é elogio". Para Palavras, é o mínimo.',
        'Bonificar sem justificar a razão em voz alta.',
        'Feedback negativo sem sanduíche real (não automático).',
      ],
    },
    asEmployee: {
      ask: [
        'Peça reconhecimento direto. "Quando faço bem feito, eu preciso ouvir. Pode me dar feedback semanal de 5 min?"',
        'Solicite menção em ata, em e-mail interno, em reunião de liderança.',
        'Negocie aumento mostrando reconhecimento PÚBLICO recebido (vira referência).',
      ],
      reframe: [
        'Sua necessidade NÃO é fraqueza — é literatura interna. Você processa o mundo em palavras.',
        'Pedir reconhecimento é honestidade emocional, não vaidade.',
      ],
    },
  },

  woundedLanguage: {
    summary:
      'Quando suas palavras são negligenciadas, você silencia. Para fora vira "tudo bem". Para dentro, vira ressentimento crescente que vai cobrar em 30, 60, 90 dias.',
    reaction:
      'Você se distancia em silêncio. Responde curto. Vai para o quarto. Acumula até explodir por algo aparentemente pequeno.',
    repairScript:
      '"Eu preciso te falar uma coisa. Quando você [ação específica] na quarta, eu me senti invisível. Não é sobre estar errado — é sobre eu sentir falta de ouvir você dizer o que sente sobre mim. Posso pedir que da próxima vez você me diga em voz alta?"',
    selfCare: [
      'Diário matinal: escreva 3 frases de afirmação sobre você mesmo. Aos poucos preenche o copo de dentro.',
      'Áudios de pessoas que te amam — guarde. Reescute em momentos de invisibilidade.',
      'Carta-conforto: escreva uma carta para sua versão de 8 anos de idade dizendo o que ela precisava ouvir.',
      'Comunidade onde palavras circulam (livro-clube, grupo de escrita) — ali você se nutre.',
    ],
  },

  pdi21Days: [
    { day: 1, focus: 'Auto-Palavra', task: 'Escreva 3 elogios específicos sobre você mesmo. Cole no espelho.' },
    { day: 2, focus: 'Pedir',         task: 'Peça a 1 pessoa que você ama: "me diga uma coisa boa que você vê em mim".' },
    { day: 3, focus: 'Dar',            task: 'Mande 3 elogios específicos a 3 pessoas hoje.' },
    { day: 4, focus: 'Limites',        task: 'Quando alguém usar sarcasmo, diga: "isso me machuca. Pode reformular?".' },
    { day: 5, focus: 'Reparação',      task: 'Use o script de reparação com alguém que negligenciou suas palavras.' },
    { day: 6, focus: 'Diário',         task: 'Anote: que palavra eu mais ouvi essa semana? que palavra senti falta?' },
    { day: 7, focus: 'Off',            task: 'Reescute áudios de quem te ama.' },
    // … expanda até 21
  ],
}

// Esqueletos
const sk = (key: LoveLanguageKey, label: string, pitch: string, paletteHex: string) => ({
  key, label, pitch, paletteHex,
})

export const LOVE_PREMIUM: Record<LoveLanguageKey, Partial<LoveLanguagePremium>> = {
  WORDS:   wordsPremium,
  TIME:    sk('TIME',    'Tempo de Qualidade',  'Presença sem celular é seu altar. Aqui você aprende a exigi-la sem culpa.',     '#3a6db4'),
  GIFTS:   sk('GIFTS',   'Presentes',           'Lembrança vale mais que valor. Aqui você desfaz a confusão "consumismo vs amor".','#d4943a'),
  SERVICE: sk('SERVICE', 'Atos de Serviço',     'Ação concreta é sua poesia. Cuidado com a passividade silenciosa.',             '#7a9e7e'),
  TOUCH:   sk('TOUCH',   'Toque Físico',        'Pele é vocabulário. Aqui você redescobre toque sem ele virar dependência.',     '#a8522e'),
}

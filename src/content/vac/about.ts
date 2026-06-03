// ============================================================
// VAC, Descritivo institucional
// O que é, objetivos, origem e aplicação corporativa. Pronto
// para ser exibido na intro do teste e na primeira página da
// devolutiva. Linguagem clara, sem hífens.
// ============================================================

export const VAC_ABOUT = {

  // ── Cartão curto (intro do teste) ──────────────────────────
  cartao: {
    tagline: 'Mapa Sensorial da Comunicação',
    descricaoCurta:
      'O VAC mapeia como o seu cérebro recebe e processa o mundo. Identifica se você tem um canal mais Visual, Auditivo ou Sinestésico, e como isso impacta a forma como você se comunica, decide, aprende e se relaciona no trabalho.',
    duracao:   '8 a 12 min',
    questoes:  30,
    escala:    'Likert 1 a 5',
  },

  // ── Descritivo completo (devolutiva e página explicativa) ──

  o_que_e:
    'O VAC é um inventário sensorial que avalia o canal predominante de percepção e comunicação de cada pessoa. Em vez de medir traços de personalidade, ele identifica o caminho preferencial pelo qual o cérebro absorve informação do ambiente: pelos olhos (Visual), pelos ouvidos (Auditivo) ou pelo corpo e pelas sensações físicas (Sinestésico). Esse mapa não rotula a pessoa, ele explica padrões de comportamento que antes pareciam aleatórios.',

  objetivos: [
    'Identificar o canal sensorial predominante do candidato (Visual, Auditivo ou Sinestésico).',
    'Antecipar como a pessoa prefere receber informação, instruções e feedbacks no ambiente corporativo.',
    'Apoiar líderes na adaptação da comunicação para cada perfil dentro do time.',
    'Reduzir ruídos em reuniões, treinamentos e processos de onboarding.',
    'Acelerar o engajamento de novos colaboradores ao falar a linguagem certa para cada um.',
  ],

  origem: {
    contextoHistorico:
      'O modelo Visual, Auditivo, Sinestésico nasceu nos anos 1970 a partir das observações dos pesquisadores americanos Richard Bandler e John Grinder, fundadores da Programação Neurolinguística (PNL). Eles estudaram como terapeutas de alta performance estabeleciam rapport com pacientes muito diferentes entre si e perceberam que cada pessoa privilegia um canal sensorial dominante na hora de codificar e expressar a realidade. Esse achado foi posteriormente expandido por consultorias de comunicação e desenvolvimento de liderança ao redor do mundo.',
    base: 'Programação Neurolinguística (PNL), modelo VAK (Visual, Auditivo, Cinestésico).',
    nota:
      'O modelo VAC tem aplicação prática consagrada em vendas, oratória e gestão de pessoas, mas é considerado complementar a inventários científicos como o Big Five ou o MBTI. Use o resultado como mapa de comunicação, não como diagnóstico clínico.',
  },

  empresas_que_usam: {
    contexto:
      'Os princípios do VAK são amplamente aplicados em programas internos de treinamento de vendedores, líderes e atendentes nas seguintes companhias e segmentos:',
    exemplos: [
      'Apple e Disney, em programas de atendimento ao cliente e treinamento de equipes de loja.',
      'Google e Microsoft, em trilhas de comunicação para líderes técnicos.',
      'McKinsey, Bain e Boston Consulting Group, em treinamentos de apresentação executiva.',
      'IBM e Oracle, em programas de capacitação de pré venda e arquitetos de solução.',
      'Procter & Gamble e Unilever, em desenvolvimento de gerentes de marca.',
      'Grandes redes de varejo brasileiras (Magazine Luiza, Lojas Renner) em treinamentos de força de vendas.',
    ],
    nota:
      'A maioria dessas empresas não compra o teste em si, elas internalizam os princípios em treinamentos próprios. Ter o canal mapeado de forma estruturada por uma plataforma é o diferencial que o Psique oferece à gestão.',
  },

  aplicacao_corporativa: [
    'RH: melhora a aderência de treinamentos ao adaptar o formato (vídeo, áudio, dinâmica) ao perfil predominante da turma.',
    'Vendas: comerciais entendem o canal do cliente e ajustam discurso em tempo real.',
    'Liderança: gestores se comunicam com cada liderado na linguagem que ele realmente absorve.',
    'Recrutamento: cruza o canal do candidato com o tipo de função (telefone vende mais para Auditivo, vitrine vende mais para Visual, atendimento presencial flui mais com Sinestésico).',
    'Cultura: reuniões e materiais internos ganham camadas para todos os perfis (slide visual + áudio + handout prático).',
  ],
}

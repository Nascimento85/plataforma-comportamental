// ============================================================
// QI / RACIOCÍNIO LÓGICO — Textos de devolutiva
// Faixas de desempenho (por % de acerto) + leitura por pilar.
// Linguagem responsável: é um indicador de APTIDÃO/triagem,
// não um QI clínico. Os "limites" reforçam isso.
// ============================================================

import type { QiPilar } from './questions'

export type QiFaixa = 'abaixo' | 'mediano' | 'acima' | 'excepcional'

export interface QiFaixaReport {
  faixa:         QiFaixa
  label:         string
  vistaGeral:    string
  recomendacoes: string[]
}

// Faixas por % de acerto geral
export const QI_FAIXAS: Record<QiFaixa, QiFaixaReport> = {
  abaixo: {
    faixa: 'abaixo',
    label: 'Em desenvolvimento',
    vistaGeral:
      'O desempenho ficou abaixo da média esperada para um teste de raciocínio geral. Isso não mede inteligência como um todo, e sim a familiaridade atual com os tipos de problema cobrados (lógica, contas, padrões e dedução). É um ponto de partida: esse tipo de habilidade responde muito bem a treino deliberado.',
    recomendacoes: [
      'Pratique um problema de cada pilar por dia — a curva de aprendizado de raciocínio lógico é rápida nas primeiras semanas.',
      'Ao errar, leia a explicação e refaça o problema do zero, sem olhar a resposta.',
      'Cuidado com a pressa: boa parte dos erros vem de pular etapas, não de falta de capacidade.',
    ],
  },
  mediano: {
    faixa: 'mediano',
    label: 'Mediano',
    vistaGeral:
      'O desempenho ficou dentro da média esperada. Você resolve com segurança os problemas mais diretos e tropeça nos que exigem mais etapas ou que escondem uma "pegadinha" de viés (como somar porcentagens em vez de multiplicá-las). É uma base sólida, com espaço claro de ganho com prática direcionada.',
    recomendacoes: [
      'Foque no seu pilar mais fraco (indicado abaixo): é onde o ganho por hora de estudo é maior.',
      'Treine a leitura cuidadosa do enunciado — reescreva o problema com suas palavras antes de calcular.',
      'Refaça os itens que errou neste teste sem ver o gabarito.',
    ],
  },
  acima: {
    faixa: 'acima',
    label: 'Acima da média',
    vistaGeral:
      'Bom desempenho, acima da média. Você lida bem com problemas de múltiplas etapas e tende a não cair nos distratores de viés cognitivo. Mantém raciocínio consistente entre os diferentes tipos de questão, o que indica boa transferência de habilidade.',
    recomendacoes: [
      'Para subir de patamar, treine velocidade sob tempo — precisão você já tem.',
      'Reforce o pilar mais fraco para fechar a única lacuna que ainda aparece.',
      'Explore problemas mais difíceis (provas como GMAT/FGV) para manter o desafio.',
    ],
  },
  excepcional: {
    faixa: 'excepcional',
    label: 'Excepcional',
    vistaGeral:
      'Desempenho excepcional. Você acerta com consistência mesmo os itens desenhados para enganar, demonstrando raciocínio abstrato forte e resistência a vieses de pressa. É um perfil que costuma se destacar em funções analíticas, de resolução de problemas e de tomada de decisão sob complexidade.',
    recomendacoes: [
      'Seu diferencial é cognitivo: busque desafios que o exercitem (estratégia, modelagem, análise de dados).',
      'Em equipe, cuide para explicar seu raciocínio passo a passo — o que é óbvio para você nem sempre é para os demais.',
      'Use a força analítica a favor da decisão, mas valide com dados e com a leitura humana do contexto.',
    ],
  },
}

// Leitura curta por pilar (forte = ponto alto, fraco = a desenvolver)
export const QI_PILAR_DESC: Record<QiPilar, { oque: string; forte: string; fraco: string }> = {
  LOGICO: {
    oque: 'Raciocínio com números, porcentagens, proporções, taxas e probabilidade.',
    forte: 'Você converte bem situações em contas e não se deixa enganar por porcentagens sucessivas.',
    fraco: 'Atenção a porcentagens e taxas: multiplicar fatores em vez de somá-los muda o resultado.',
  },
  ANALITICO: {
    oque: 'Ordenação, posicionamento, restrições e dedução de cenários (quem está onde, verdades e mentiras).',
    forte: 'Você organiza bem informações com várias restrições e chega à única configuração possível.',
    fraco: 'Treine montar o cenário no papel (ordem, posições) antes de responder, para não perder restrições.',
  },
  VERBAL: {
    oque: 'Silogismos, dedução a partir de premissas e analogias verbais.',
    forte: 'Você distingue bem o que é "necessariamente verdadeiro" do que apenas "pode ser", e domina negações lógicas.',
    fraco: 'Cuidado com a negação de "todos" (que é "pelo menos um não") e com extrapolar premissas.',
  },
  SEQUENCIAS: {
    oque: 'Identificação de padrões em séries numéricas, alfabéticas e visuais.',
    forte: 'Você reconhece rápido o tipo de padrão (soma, produto, quadrados, primos) e o projeta adiante.',
    fraco: 'Antes de responder, teste se o padrão é aditivo ou multiplicativo — confundir os dois é o erro mais comum.',
  },
}

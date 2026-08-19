// ============================================================
// O Teste do Silêncio: conteúdo da devolutiva
// ============================================================
// A devolutiva gratuita tem um trabalho só: nomear o padrão com precisão
// suficiente para a pessoa se reconhecer, mostrar como aquilo chega do
// outro lado, e entregar um primeiro movimento concreto. O aprofundamento
// (os scripts, a tradução frase a frase) é o produto pago.
// ============================================================

import type { SilencioCat } from './questions'

export const SILENCIO_LABELS: Record<SilencioCat, string> = {
  PASSIVA: 'Passiva',
  AGRESSIVA: 'Agressiva',
  PASSIVO_AGRESSIVA: 'Passivo-agressiva',
  ASSERTIVA: 'Assertiva',
}

export interface SilencioPerfil {
  titulo: string
  fraseTipica: string
  oQueVoceFaz: string
  comoChega: string
  oQueCusta: string
  primeiroPasso: string
}

export const SILENCIO_PERFIS: Record<SilencioCat, SilencioPerfil> = {
  PASSIVA: {
    titulo: 'O silêncio que engole',
    fraseTipica: '"Deixa, não vale a pena começar de novo."',
    oQueVoceFaz:
      'Você percebe o incômodo, mede o custo da conversa e decide que sai mais barato ficar quieta. Não é falta de opinião: é uma conta que você faz rápido demais para perceber que está fazendo.',
    comoChega:
      'Do outro lado, não chega nada. Ele não vê a conta que você fez, vê uma noite tranquila. E é por isso que ele repete: para ele, aquilo nunca foi um problema.',
    oQueCusta:
      'O incômodo não evapora, ele se acumula. Quando finalmente sai, sai grande demais para o tamanho do episódio, e aí você vira "a que exagera", quando na verdade você foi a que esperou tempo demais.',
    primeiroPasso:
      'Na próxima vez que engolir, diga uma frase só, no mesmo dia: "isso me incomodou". Sem justificar, sem explicar, sem pedir desculpa por sentir. Uma frase.',
  },
  AGRESSIVA: {
    titulo: 'O silêncio que não existe',
    fraseTipica: '"Você nunca me escuta, nunca mesmo."',
    oQueVoceFaz:
      'Você fala. Fala tudo, na hora, com força. É honesto e é corajoso, e vem embalado de um jeito que faz o outro ouvir a embalagem, não o conteúdo.',
    comoChega:
      'Ele escuta acusação, não dor. E quando alguém escuta acusação, o corpo faz uma coisa só: se defende. Ele passa a discutir a palavra "nunca" em vez de falar do que você sentiu.',
    oQueCusta:
      'Você ganha discussões e perde conversas. O assunto que importava fica para trás, enterrado embaixo de quem estava certo.',
    primeiroPasso:
      'Troque "você nunca" e "você sempre" por um fato único e a sua sensação: "ontem, quando você mexeu no celular, eu me senti sozinha". O conteúdo é o mesmo. A resposta que você recebe, não.',
  },
  PASSIVO_AGRESSIVA: {
    titulo: 'O silêncio que fala',
    fraseTipica: '"Não, tá tudo bem." E não está.',
    oQueVoceFaz:
      'Você não engole nem explode: você manda o recado por outro canal. Pelo tom, pela porta, pelo "tranquilo" curto, pela louça que ficou. A mensagem sai, só não sai em palavras.',
    comoChega:
      'Ele sente que errou e não sabe em quê. E o que uma pessoa faz quando sente culpa sem entender o motivo? Se irrita. É por isso que a conversa seguinte começa torta antes mesmo de começar.',
    oQueCusta:
      'É o padrão que mais cansa os dois, porque ninguém consegue resolver o que não foi dito. O problema fica, e agora com uma camada de ressentimento em cima.',
    primeiroPasso:
      'Quando ele perguntar se está tudo bem e não estiver, tente: "não está, mas eu ainda não sei explicar. Me dá um tempo que eu volto nisso." Isso não é ceder, é avisar que existe assunto.',
  },
  ASSERTIVA: {
    titulo: 'Você fala, e chega',
    fraseTipica: '"Quando você fez isso, eu me senti sozinha."',
    oQueVoceFaz:
      'Você diz o que aconteceu, o que sentiu e o que precisa, sem apagar você nem atacar ele. É o único dos quatro padrões em que o outro consegue responder ao que você realmente disse.',
    comoChega:
      'Chega como informação, não como ameaça. E informação a pessoa consegue usar, por isso a conversa avança em vez de virar disputa.',
    oQueCusta:
      'Quase nada, enquanto você sustenta. O risco é outro: assertividade cansa, e nos dias em que você está sem energia, o padrão de reserva aparece. É esse padrão de reserva que vale conhecer.',
    primeiroPasso:
      'Repare em qual dos outros três você escorrega quando está exausta. Ele é o seu real ponto cego, não a regra, mas a exceção.',
  },
}

export interface SilencioTermometro { chave: 'ALTA' | 'MEDIA' | 'BAIXA'; titulo: string; texto: string }

const COMO_ESCORREGA: Record<SilencioCat, string> = {
  PASSIVA: 'você recua e se cala',
  AGRESSIVA: 'você endurece e ataca',
  PASSIVO_AGRESSIVA: 'você fala pelo silêncio e pelo tom',
  ASSERTIVA: 'você se mantém assertiva',
}

export function lerTermometroSilencio(pctAssertiva: number, deslize: SilencioCat): SilencioTermometro {
  if (pctAssertiva >= 70) {
    return {
      chave: 'ALTA',
      titulo: 'Você segura bem, até certo ponto',
      texto:
        'Na maior parte das situações de tensão você consegue dizer o que precisa sem se anular e sem atacar. Isso é raro, e é o que mantém uma relação conversável. Quando escapa, ' +
        COMO_ESCORREGA[deslize] +
        '. Saber exatamente em que ponto isso acontece é o que separa quem se comunica bem de quem se comunica bem sempre.',
    }
  }
  if (pctAssertiva >= 40) {
    return {
      chave: 'MEDIA',
      titulo: 'Depende do dia, e do assunto',
      texto:
        'Em parte das situações você fala com clareza. Em outra parte, ' +
        COMO_ESCORREGA[deslize] +
        '. Esse "depende" não é falha de caráter: é um padrão que se ativa em contextos específicos, quase sempre os mesmos. É por isso que algumas conversas fluem e outras terminam sempre igual.',
    }
  }
  return {
    chave: 'BAIXA',
    titulo: 'A conversa raramente chega inteira',
    texto:
      'Na maioria das situações de tensão, ' +
      COMO_ESCORREGA[deslize] +
      '. O que você sente é legítimo. O que não está chegando é a mensagem. Isso tem conserto, e o conserto não é falar mais: é falar de outro jeito. Reconhecer o padrão é a parte que quase ninguém faz.',
  }
}

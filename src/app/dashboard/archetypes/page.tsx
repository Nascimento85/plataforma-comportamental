import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Arquétipos' }

interface Archetype {
  key: string
  name: string
  title: string
  description: string
  shadow: string
  gift: string
  color: string
  emoji: string
}

const MASCULINE: Archetype[] = [
  {
    key: 'guerreiro',
    name: 'Guerreiro',
    title: 'Disciplina, força e propósito',
    description: 'A energia que protege, executa e defende território. O guerreiro maduro serve a uma causa maior e domina o caos com método.',
    shadow: 'Tiranização, violência, rigidez emocional.',
    gift: 'Coragem, honra, lealdade.',
    color: '#c4633a',
    emoji: '⚔',
  },
  {
    key: 'rei',
    name: 'Rei',
    title: 'Ordem, generosidade e legado',
    description: 'A energia que cria estrutura e abençoa o território. O rei íntegro organiza o caos e dá espaço para que outros floresçam.',
    shadow: 'Tirania, possessividade, ego inflado.',
    gift: 'Visão, generosidade, benção.',
    color: '#c9a84c',
    emoji: '♛',
  },
  {
    key: 'mago',
    name: 'Mago',
    title: 'Conhecimento, análise e transformação',
    description: 'A energia que domina o invisível — tecnologias, sistemas, símbolos. O mago íntegro traduz complexidade em poder prático.',
    shadow: 'Manipulação, frieza, arrogância intelectual.',
    gift: 'Sabedoria, clareza, mediação.',
    color: '#3d4f7c',
    emoji: '✦',
  },
  {
    key: 'amante',
    name: 'Amante',
    title: 'Presença, sensualidade e conexão',
    description: 'A energia que se entrega ao prazer e à profundidade do encontro. O amante íntegro transforma qualquer contato em sagrado.',
    shadow: 'Dependência, compulsão, dispersão.',
    gift: 'Paixão, sensibilidade, união.',
    color: '#c47a72',
    emoji: '❤',
  },
]

const FEMININE: Archetype[] = [
  {
    key: 'mae',
    name: 'Mãe',
    title: 'Nutrição, acolhimento e cuidado',
    description: 'A energia que gesta, alimenta e sustenta. Cria ambiente seguro para que a vida se desenvolva.',
    shadow: 'Sufocamento, codependência, culpa.',
    gift: 'Colo, proteção, generosidade.',
    color: '#7a9e7e',
    emoji: '❀',
  },
  {
    key: 'virgem',
    name: 'Virgem',
    title: 'Soberania, pureza e autonomia',
    description: 'A energia que pertence a si mesma. Não precisa de validação externa para saber quem é.',
    shadow: 'Isolamento, rigidez, frieza.',
    gift: 'Autenticidade, independência, foco.',
    color: '#e8c878',
    emoji: '☽',
  },
  {
    key: 'amazona',
    name: 'Amazona',
    title: 'Ação, conquista e independência',
    description: 'A energia que luta por território próprio. Não aceita dominação e disputa no mundo.',
    shadow: 'Agressividade, masculinização, solidão.',
    gift: 'Coragem, disciplina, realização.',
    color: '#c4633a',
    emoji: '⚔',
  },
  {
    key: 'sabia',
    name: 'Sábia',
    title: 'Conhecimento, estudo e mediação',
    description: 'A energia que domina saberes e transmite. Gosta da complexidade e da busca intelectual.',
    shadow: 'Cinismo, intelectualização, distanciamento.',
    gift: 'Discernimento, clareza, ensino.',
    color: '#3d4f7c',
    emoji: '✧',
  },
  {
    key: 'mistica',
    name: 'Mística',
    title: 'Intuição, espiritualidade e profundidade',
    description: 'A energia que acessa o invisível. Trabalha com símbolos, sonhos e o oculto.',
    shadow: 'Desconexão da realidade, escapismo.',
    gift: 'Intuição, cura, revelação.',
    color: '#6b7fb8',
    emoji: '◉',
  },
  {
    key: 'sacerdotisa',
    name: 'Sacerdotisa',
    title: 'Liderança espiritual e comunhão',
    description: 'A energia que guia ritos e conecta o grupo ao sagrado. Cria o campo da transformação coletiva.',
    shadow: 'Dogmatismo, distanciamento, exibicionismo.',
    gift: 'Presença, mistério, consagração.',
    color: '#c9a84c',
    emoji: '☥',
  },
  {
    key: 'feiticeira',
    name: 'Feiticeira',
    title: 'Poder, magnetismo e transgressão',
    description: 'A energia que transforma por fora do sistema. Desafia regras e cria novos caminhos.',
    shadow: 'Manipulação, vingança, ocultação.',
    gift: 'Poder criativo, coragem, autonomia.',
    color: '#c47a72',
    emoji: '♆',
  },
]

const LEADERSHIP: Archetype[] = [
  {
    key: 'imperador',
    name: 'O Imperador',
    title: 'Comando, estrutura e autoridade',
    description: 'Lidera por posição e decide rápido. Constrói impérios duráveis e tolera pouca ambiguidade.',
    shadow: 'Autoritarismo, controle excessivo.',
    gift: 'Direção clara, eficiência, resultados.',
    color: '#c4633a',
    emoji: '⚑',
  },
  {
    key: 'estrategista',
    name: 'O Estrategista',
    title: 'Análise, visão longa e cálculo',
    description: 'Lidera pela inteligência do tabuleiro. Antecipa cenários e toma decisões frias sob pressão.',
    shadow: 'Paralisia por análise, distanciamento.',
    gift: 'Clareza, longevidade, previsibilidade.',
    color: '#3d4f7c',
    emoji: '♜',
  },
  {
    key: 'mentor',
    name: 'O Mentor',
    title: 'Formação de gente e cultura',
    description: 'Lidera desenvolvendo. Cria sucessores, enxerga o potencial cru e investe no longo prazo humano.',
    shadow: 'Superproteção, dependência emocional.',
    gift: 'Legado, cultura forte, sucessão.',
    color: '#7a9e7e',
    emoji: '♞',
  },
  {
    key: 'visionario',
    name: 'O Visionário',
    title: 'Inspiração, futuro e reinvenção',
    description: 'Lidera pelo magnetismo da ideia. Enxerga o que ainda não existe e mobiliza gente ao redor de uma causa.',
    shadow: 'Inconstância, promessas grandes demais.',
    gift: 'Inovação, propósito, engajamento.',
    color: '#c9a84c',
    emoji: '✦',
  },
]

function ArchetypeCard({ a }: { a: Archetype }) {
  return (
    <div className="soul-panel flex flex-col gap-3 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-[0.06]"
           style={{ background: `radial-gradient(circle, ${a.color}, transparent)`, transform: 'translate(30%,-30%)' }}/>
      <div className="flex items-start gap-3 relative">
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl font-bold flex-shrink-0"
          style={{ background: `${a.color}22`, color: a.color }}
        >
          {a.emoji}
        </div>
        <div>
          <p className="font-serif text-xl font-semibold text-soul-ink leading-tight">{a.name}</p>
          <p className="text-[13px] font-semibold text-soul-ink/70 italic mt-0.5">{a.title}</p>
        </div>
      </div>
      <p className="text-[14px] text-soul-ink/85 font-medium leading-relaxed relative">
        {a.description}
      </p>
      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-soul-mist/60 relative">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wider text-soul-sage">Dom</p>
          <p className="text-[13px] text-soul-ink font-medium mt-0.5 leading-snug">{a.gift}</p>
        </div>
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wider text-soul-rose">Sombra</p>
          <p className="text-[13px] text-soul-ink font-medium mt-0.5 leading-snug">{a.shadow}</p>
        </div>
      </div>
    </div>
  )
}

function Section({ title, subtitle, items }: { title: string; subtitle: string; items: Archetype[] }) {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="font-serif text-3xl font-semibold text-soul-ink leading-tight">
          {title}
        </h2>
        <p className="text-[15px] text-soul-ink/75 font-medium mt-1 max-w-3xl">
          {subtitle}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((a) => <ArchetypeCard key={a.key} a={a} />)}
      </div>
    </section>
  )
}

export default function ArchetypesPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="font-serif font-semibold text-4xl md:text-5xl text-soul-ink leading-tight">
          Catálogo de <span className="text-soul-terracota italic font-normal">Arquétipos</span>
        </h1>
        <p className="text-base md:text-lg text-soul-ink/75 mt-3 font-medium max-w-3xl leading-relaxed">
          Os arquétipos são padrões psíquicos universais identificados por Carl Jung. Conhecê-los é compreender as
          forças profundas que moldam decisão, comportamento e liderança. Explore as três linhagens que a Psique mapeia.
        </p>
      </div>

      {/* CTA teste */}
      <div className="rounded-3xl p-6 flex flex-wrap items-center justify-between gap-4"
           style={{ background: 'linear-gradient(135deg, rgba(196,99,58,0.08), rgba(201,168,76,0.12))', border: '1px solid rgba(201,168,76,0.25)' }}>
        <div>
          <p className="font-serif text-xl font-semibold text-soul-ink">Descubra seu arquétipo dominante</p>
          <p className="text-[14px] text-soul-ink/75 font-medium mt-1">
            Responda o teste e receba um relatório detalhado com as suas duas energias mais presentes.
          </p>
        </div>
        <Link
          href="/dashboard/assessments"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-[14px] font-bold text-white
                     transition-all hover:-translate-y-px shadow-terra"
          style={{ background: 'linear-gradient(135deg, #c4633a, #d4943a)' }}
        >
          Fazer o teste de Arquétipos →
        </Link>
      </div>

      <Section
        title="Arquétipos Masculinos — As 4 Energias"
        subtitle="Robert Moore e Douglas Gillette mapearam quatro polos arquetípicos da psique masculina madura. Estão presentes em toda pessoa, independentemente do gênero."
        items={MASCULINE}
      />

      <Section
        title="Arquétipos Femininos — As 7 Energias"
        subtitle="Do divino feminino — energias que governam ciclos de criação, poder e intuição. Uma delas predomina em cada fase da vida."
        items={FEMININE}
      />

      <Section
        title="Arquétipos da Liderança"
        subtitle="Os quatro estilos arquetípicos que definem como alguém exerce autoridade. Reconhecer o seu é o primeiro passo para liderar com maturidade."
        items={LEADERSHIP}
      />
    </div>
  )
}

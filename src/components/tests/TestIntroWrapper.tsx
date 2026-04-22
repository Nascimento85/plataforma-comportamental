'use client'

import { useState } from 'react'
import DISCTest from '@/components/tests/DISCTest'
import MBTITest from '@/components/tests/MBTITest'
import EnneagramTest from '@/components/tests/EnneagramTest'
import TemperamentTest from '@/components/tests/TemperamentTest'
import ArchetypeTest from '@/components/tests/ArchetypeTest'
import {
  ARCHETYPE_MIXED_QUESTIONS,
} from '@/lib/engines/archetype-mixed'
import {
  ARCHETYPE_FEMININE_QUESTIONS,
} from '@/lib/engines/archetype-feminine'

// ── Conteúdo das intros por tipo ───────────────────────────────

const INTROS: Record<string, {
  title: string
  subtitle: string
  image: string
  description: string
  tips: { icon: string; text: string }[]
  discovers: string[]
  cta: string
  duration: string
  questions: number
}> = {
  DISC: {
    title: 'DISC — Perfil Comportamental',
    subtitle: 'O Mapa da Navegação Comportamental',
    image: '/tests/disc.jpg',
    description: 'Desenvolvido com base nos estudos do Dr. William Moulton Marston, o DISC é a ferramenta de análise comportamental mais utilizada no mundo corporativo. Ele revela como você age, lidera e se comunica — e como maximizar sua performance em qualquer ambiente.',
    tips: [
      { icon: '🎯', text: 'Responda pensando no seu comportamento no trabalho ou sob pressão profissional.' },
      { icon: '⚡', text: 'Vá pela reação instintiva — não tente calcular a "resposta certa".' },
      { icon: '🔓', text: 'Não existe perfil melhor. Cada estilo tem superpoderes únicos.' },
    ],
    discovers: [
      'Seu estilo natural de liderança e comunicação',
      'O que te motiva e o que trava sua performance',
      'Como você age sob pressão',
      'Como se comunicar melhor com cada tipo de pessoa',
    ],
    cta: 'Iniciar Mapeamento Comportamental',
    duration: '10–15 min',
    questions: 24,
  },
  MBTI: {
    title: 'MBTI — Preferências Cognitivas',
    subtitle: 'A Bússola da Preferência Cognitiva',
    image: '/tests/mbti.jpg',
    description: 'Baseado nos estudos de Carl Jung, o MBTI é a ferramenta de tipologia mais famosa do mundo. Ele não mede seu caráter — revela suas preferências inatas. Como você pensa, decide e interage com o mundo quando está sendo 100% você mesmo.',
    tips: [
      { icon: '🌴', text: 'Responda como você é "em férias" — sem as exigências do cargo ou papel social.' },
      { icon: '🧭', text: 'Entre duas opções, escolha a que parece mais natural e descansada para você.' },
      { icon: '🔓', text: 'Um mundo funcional precisa de todos os 16 tipos. Não há tipo superior.' },
    ],
    discovers: [
      'Sua fonte de energia: você se recarrega no mundo externo ou interno?',
      'Sua percepção: você foca em fatos concretos ou em padrões e possibilidades?',
      'Seu estilo de decisão: lógica ou valores e impacto nas pessoas?',
      'Seu ritmo: você prefere ordem e fechamento ou flexibilidade?',
    ],
    cta: 'Decodificar minha Mente',
    duration: '15–20 min',
    questions: 60,
  },
  ENNEAGRAM: {
    title: 'Eneagrama — Motivações Profundas',
    subtitle: 'O Mapa da Arquitetura Emocional',
    image: '/tests/eneagrama.jpg',
    description: 'Utilizado por organizações como a NASA e o Vale do Silício, o Eneagrama vai além do comportamento — ele revela a intenção oculta por trás das suas ações. Descubra o padrão motivacional que rege sua vida e o caminho exato para sua melhor versão.',
    tips: [
      { icon: '💎', text: 'Seja brutalmente honesto — responda como você realmente se sente "por dentro", especialmente sob estresse.' },
      { icon: '🔍', text: 'Foque na motivação, não na ação. Duas pessoas podem fazer o mesmo, mas por razões diferentes.' },
      { icon: '🌱', text: 'Cada tipo tem um nível de integração (crescimento) e desintegração (estresse).' },
    ],
    discovers: [
      'Seu tipo central e a motivação que rege sua vida',
      'Seu centro de inteligência: ação, sentimento ou pensamento?',
      'Seu ponto cego que trava seu crescimento',
      'Seu caminho exato para a integração e liderança consciente',
    ],
    cta: 'Iniciar Mapeamento de Essência',
    duration: '20–25 min',
    questions: 135,
  },
  TEMPERAMENT: {
    title: '4 Temperamentos — Natureza Biológica',
    subtitle: 'O Alicerce Biológico da Personalidade',
    image: '/tests/temperamentos.jpg',
    description: 'Baseada nos estudos de Hipócrates e refinada ao longo de milênios, esta teoria identifica as quatro inclinações naturais que determinam como você reage ao mundo. O temperamento é sua "matéria-prima" — aquilo que nasce com você e não pode ser ignorado.',
    tips: [
      { icon: '👶', text: 'Pense em como você era na infância ou em como age sob extremo estresse — aí aparece o temperamento real.' },
      { icon: '🌿', text: 'Responda pela essência, não pelo comportamento aprendido na faculdade ou no trabalho.' },
      { icon: '🔓', text: 'Todos os temperamentos têm virtudes heroicas — e desafios a transformar.' },
    ],
    discovers: [
      'Seu elemento predominante: Fogo, Ar, Terra ou Água',
      'Como seu sistema nervoso reage naturalmente ao mundo',
      'Sua reatividade: como você responde a impactos e críticas',
      'Sua durabilidade emocional e o que te move profundamente',
    ],
    cta: 'Identificar minha Natureza',
    duration: '10–15 min',
    questions: 40,
  },
  ARCHETYPE: {
    title: 'Arquétipos — Os 12 Padrões Universais',
    subtitle: 'O Algoritmo Mental da Liderança',
    image: '/tests/arquetipo-misto.jpg',
    description: 'Baseado na teoria de Carl Jung, os arquétipos são padrões universais de comportamento que todos os seres humanos reconhecem instintivamente. Descubra qual "personagem" está rodando em você — e como isso molda suas decisões, lideranças e resultados.',
    tips: [
      { icon: '🧬', text: 'Responda pelo que realmente sente, não pelo que seu cargo ou papel social exige.' },
      { icon: '🎭', text: 'Não existe arquétipo melhor — cada um tem um dom único e uma sombra a integrar.' },
      { icon: '⚡', text: 'Vá pela primeira reação — sua resposta instintiva é a mais precisa.' },
    ],
    discovers: [
      'Seu arquétipo dominante — o "personagem" que lidera suas decisões',
      'Seu arquétipo secundário — a influência complementar',
      'Sua sombra — o padrão menos desenvolvido que precisa de atenção',
      'Como seu arquétipo impacta sua liderança, equipe e resultados',
    ],
    cta: 'Revelar meu Arquétipo',
    duration: '15–20 min',
    questions: 72,
  },
  ARCHETYPE_FEMININE: {
    title: 'Arquétipos Femininos — As 7 Energias',
    subtitle: 'O Despertar da Força Feminina',
    image: '/tests/arquetipo-feminino.jpg',
    description: 'Os 7 arquétipos femininos representam as energias primordiais da psique feminina, originados da mitologia grega. Este teste identifica qual energia está liderando sua fase atual de vida e carreira — e qual precisa ser ativada para o seu equilíbrio pleno.',
    tips: [
      { icon: '🌙', text: 'Responda pelo que realmente sente internamente — não pelo que a sociedade espera de você.' },
      { icon: '🌀', text: 'As energias mudam conforme a fase da vida. Responda pelo que você é agora.' },
      { icon: '💫', text: 'Não há arquétipo mais poderoso que outro — cada um tem seu momento e propósito.' },
    ],
    discovers: [
      'Seu arquétipo dominante — a energia que governa seu momento atual',
      'Seu arquétipo secundário — a influência complementar',
      'O arquétipo a ativar — a energia que precisa ser despertada para o equilíbrio',
      'Como integrar todas as 7 energias para uma liderança feminina plena',
    ],
    cta: 'Despertar minha Força Feminina',
    duration: '15–20 min',
    questions: 49,
  },
}

// ── Componente principal ──────────────────────────────────────

interface Props {
  testType: string
  assessmentId: string
  token: string
  employeeName: string
}

export default function TestIntroWrapper({ testType, assessmentId, token, employeeName }: Props) {
  const [started, setStarted] = useState(false)
  const intro = INTROS[testType]
  const firstName = employeeName.split(' ')[0]

  if (!intro) {
    // fallback para tipos sem intro configurada
    return renderTest(testType, assessmentId, token)
  }

  if (!started) {
    return (
      <div className="space-y-0">
        {/* Imagem de capa */}
        <div className="rounded-2xl overflow-hidden mb-6 shadow-md">
          <img
            src={intro.image}
            alt={intro.title}
            className="w-full object-cover"
            style={{ maxHeight: '280px', objectPosition: 'center top' }}
          />
        </div>

        {/* Saudação */}
        <div className="mb-5">
          <h1 className="text-2xl font-bold text-gray-900">
            Olá, {firstName}! 👋
          </h1>
          <p className="text-brand-600 font-semibold mt-1">{intro.subtitle}</p>
        </div>

        {/* Descrição */}
        <div className="card p-5 mb-4">
          <p className="text-sm text-gray-700 leading-relaxed">{intro.description}</p>
          <div className="flex gap-4 mt-4 pt-4 border-t border-gray-100">
            <div className="text-center flex-1">
              <p className="text-xl font-bold text-brand-600">{intro.questions}</p>
              <p className="text-xs text-gray-400">afirmações</p>
            </div>
            <div className="text-center flex-1">
              <p className="text-xl font-bold text-brand-600">{intro.duration}</p>
              <p className="text-xs text-gray-400">tempo médio</p>
            </div>
            <div className="text-center flex-1">
              <p className="text-xl font-bold text-brand-600">1–5</p>
              <p className="text-xs text-gray-400">escala de resposta</p>
            </div>
          </div>
        </div>

        {/* Dicas */}
        <div className="space-y-2 mb-4">
          {intro.tips.map((tip, i) => (
            <div key={i} className="flex items-start gap-3 bg-gray-50 rounded-xl px-4 py-3">
              <span className="text-lg flex-shrink-0">{tip.icon}</span>
              <p className="text-sm text-gray-700 leading-snug">{tip.text}</p>
            </div>
          ))}
        </div>

        {/* O que vai descobrir */}
        <div className="card p-5 mb-6">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">O que você vai descobrir</h3>
          <ul className="space-y-2">
            {intro.discovers.map((d, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-brand-500 font-bold mt-0.5">✓</span>
                {d}
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <button
          onClick={() => setStarted(true)}
          className="btn-primary w-full text-base py-4"
        >
          {intro.cta} →
        </button>
        <p className="text-center text-xs text-gray-400 mt-3">
          Não há respostas certas ou erradas. Seja você mesmo.
        </p>
      </div>
    )
  }

  // Título compacto após iniciar
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
        <div className="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
          {intro.title.charAt(0)}
        </div>
        <div>
          <p className="font-semibold text-gray-900 text-sm">{intro.title}</p>
          <p className="text-xs text-gray-400">{firstName} · {intro.questions} afirmações</p>
        </div>
      </div>
      {renderTest(testType, assessmentId, token)}
    </div>
  )
}

function renderTest(testType: string, assessmentId: string, token: string) {
  if (testType === 'DISC') return <DISCTest assessmentId={assessmentId} token={token} />
  if (testType === 'MBTI') return <MBTITest assessmentId={assessmentId} token={token} />
  if (testType === 'ENNEAGRAM') return <EnneagramTest assessmentId={assessmentId} token={token} />
  if (testType === 'TEMPERAMENT') return <TemperamentTest assessmentId={assessmentId} token={token} />
  if (testType === 'ARCHETYPE') return (
    <ArchetypeTest
      assessmentId={assessmentId}
      token={token}
      questions={ARCHETYPE_MIXED_QUESTIONS}
      testType="ARCHETYPE"
    />
  )
  if (testType === 'ARCHETYPE_FEMININE') return (
    <ArchetypeTest
      assessmentId={assessmentId}
      token={token}
      questions={ARCHETYPE_FEMININE_QUESTIONS}
      testType="ARCHETYPE_FEMININE"
    />
  )
  return null
}

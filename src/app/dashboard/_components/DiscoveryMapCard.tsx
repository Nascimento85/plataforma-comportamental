import Link from 'next/link'

interface Props {
  totalCompleted: number
}

const JOURNEY_NODES = [
  { key: 'disc',          label: 'Perfil DISC',         emoji: '🎭', xp: 320 },
  { key: 'mbti',          label: 'Myers-Briggs',         emoji: '🧩', xp: 380 },
  { key: 'enneagram',     label: 'Eneagrama',            emoji: '⬡',  xp: 420 },
  { key: 'love',          label: 'Ling. do Amor',        emoji: '💞', xp: 280 },
  { key: 'shadow',        label: 'Arquétipo Sombra',     emoji: '🌌', xp: 500 },
  { key: 'full',          label: 'Perfil Completo',      emoji: '🏆', xp: 800 },
] as const

type NodeStatus = 'done' | 'active' | 'locked'

function getNodeStatus(index: number, completed: number): NodeStatus {
  if (index < completed) return 'done'
  if (index === completed) return 'active'
  return 'locked'
}

function MapNode({
  node,
  status,
  isLast,
}: {
  node: typeof JOURNEY_NODES[number]
  status: NodeStatus
  isLast: boolean
}) {
  const circleStyle: React.CSSProperties =
    status === 'done'
      ? { background: 'linear-gradient(135deg, #c4633a, #d4943a)', border: '2.5px solid transparent', boxShadow: '0 4px 14px rgba(196,99,58,0.28)' }
      : status === 'active'
      ? { background: '#fff', border: '2.5px solid #c4633a', boxShadow: '0 0 0 5px rgba(196,99,58,0.10), 0 4px 12px rgba(196,99,58,0.15)' }
      : { background: '#e8e2d6', border: '2px solid transparent', opacity: 0.55 }

  const labelColor =
    status === 'done'   ? 'text-soul-terracota font-medium' :
    status === 'active' ? 'text-soul-ink font-medium' :
                          'text-soul-ink/35'

  return (
    <div className="flex flex-col items-center" style={{ flexShrink: 0 }}>
      <div className="relative">
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center text-xl transition-all duration-200 hover:scale-105 cursor-pointer"
          style={circleStyle}
        >
          {status === 'done' && (
            <div
              className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-soul-ink"
              style={{ background: 'linear-gradient(135deg, #c9a84c, #d4943a)', border: '1.5px solid white' }}
            >
              ✓
            </div>
          )}
          {node.emoji}
        </div>
      </div>
      <div className={`text-[10.5px] text-center mt-1.5 leading-tight max-w-[60px] ${labelColor}`}>
        {node.label}
      </div>
    </div>
  )
}

function Connector({ status }: { status: 'done' | 'half' | 'locked' }) {
  const bg =
    status === 'done' ? 'linear-gradient(90deg, #c4633a, #d4943a)' :
    status === 'half' ? 'linear-gradient(90deg, #c4633a 50%, #e8e2d6 50%)' :
                        '#e8e2d6'

  return (
    <div
      className="flex-1 min-w-[24px] max-w-[44px] h-0.5 flex-shrink-0"
      style={{ background: bg, marginBottom: '20px' }}
    />
  )
}

export default function DiscoveryMapCard({ totalCompleted }: Props) {
  const clampedCompleted = Math.min(totalCompleted, JOURNEY_NODES.length)
  const activeNode = JOURNEY_NODES[clampedCompleted]
  const progressPct = Math.round((clampedCompleted / JOURNEY_NODES.length) * 100)

  return (
    <div className="bg-white rounded-3xl border border-soul-mist/60 p-6">

      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-serif font-light text-xl text-soul-ink flex items-center gap-2.5">
          <span className="w-7 h-7 rounded-lg bg-soul-terracota/10 flex items-center justify-center text-sm flex-shrink-0">
            🗺️
          </span>
          Mapa da Descoberta
        </h2>
        <Link
          href="/dashboard/assessments"
          className="text-xs text-soul-terracota flex items-center gap-1 hover:gap-2 transition-all duration-200"
        >
          Ver jornada completa →
        </Link>
      </div>

      {/* Map path */}
      <div className="flex items-center overflow-x-auto pb-1 scrollbar-none gap-0 mb-5">
        {JOURNEY_NODES.map((node, i) => {
          const status = getNodeStatus(i, clampedCompleted)
          const isLast = i === JOURNEY_NODES.length - 1

          const connStatus: 'done' | 'half' | 'locked' =
            i < clampedCompleted - 1 ? 'done' :
            i === clampedCompleted - 1 ? 'half' :
            'locked'

          return (
            <div key={node.key} className="flex items-center">
              <MapNode node={node} status={status} isLast={isLast} />
              {!isLast && <Connector status={connStatus} />}
            </div>
          )
        })}
      </div>

      {/* Progress bar */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-soul-ink/40 mb-1.5">
          <span>Progresso da jornada</span>
          <span className="text-soul-terracota font-medium">
            {clampedCompleted} de {JOURNEY_NODES.length} completos
          </span>
        </div>
        <div className="h-1.5 bg-soul-mist rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-1000"
            style={{
              width: `${progressPct}%`,
              background: 'linear-gradient(90deg, #c4633a, #d4943a)',
            }}
          />
        </div>
      </div>

      {/* Next step CTA */}
      {activeNode && (
        <div
          className="flex items-center gap-3 rounded-2xl p-4"
          style={{ background: 'rgba(196,99,58,0.05)', border: '1px solid rgba(196,99,58,0.12)' }}
        >
          <div className="text-2xl flex-shrink-0">{activeNode.emoji}</div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-soul-ink">
              Continue: {activeNode.label}
            </div>
            <div className="text-xs text-soul-ink/40 mt-0.5">
              ~18 minutos · +{activeNode.xp} XP ao completar
            </div>
          </div>
          <Link
            href="/dashboard/assessments"
            className="flex-shrink-0 px-4 py-2 rounded-full bg-soul-terracota text-white text-xs font-medium font-sans
                       hover:bg-soul-terracota-dark transition-all duration-200 hover:-translate-y-px whitespace-nowrap
                       shadow-[0_3px_10px_rgba(196,99,58,0.22)]"
          >
            Continuar →
          </Link>
        </div>
      )}

      {/* Completed all */}
      {!activeNode && (
        <div
          className="flex items-center gap-3 rounded-2xl p-4"
          style={{ background: 'rgba(122,158,126,0.08)', border: '1px solid rgba(122,158,126,0.18)' }}
        >
          <div className="text-2xl">🏆</div>
          <div>
            <div className="text-sm font-medium text-soul-ink">Jornada completa!</div>
            <div className="text-xs text-soul-ink/40 mt-0.5">Seu Mapa da Alma está pronto para explorar</div>
          </div>
          <Link
            href="/dashboard/reports"
            className="ml-auto flex-shrink-0 px-4 py-2 rounded-full text-xs font-medium font-sans
                       text-soul-sage border border-soul-sage/30 hover:bg-soul-sage/10 transition-colors whitespace-nowrap"
          >
            Ver relatório →
          </Link>
        </div>
      )}
    </div>
  )
}

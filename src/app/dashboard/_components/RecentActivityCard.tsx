import Link from 'next/link'
import { Avatar, Badge } from '@/components/ui/design-system'

type AssessmentStatus = 'PENDING' | 'SENT' | 'COMPLETED' | 'EXPIRED'

interface Assessment {
  id: string
  status: string
  testType: string
  createdAt: Date
  employee: { name: string }
}

interface Props {
  assessments: Assessment[]
}

const STATUS_CONFIG: Record<AssessmentStatus, {
  label: string
  variant: 'done' | 'pending' | 'locked' | 'new'
}> = {
  COMPLETED: { label: '✓ Concluído',  variant: 'done' },
  SENT:      { label: '⏳ Enviado',   variant: 'pending' },
  PENDING:   { label: '📨 Pendente',  variant: 'new' },
  EXPIRED:   { label: '✕ Expirado',   variant: 'locked' },
}

const TEST_TYPE_EMOJI: Record<string, string> = {
  DISC:           '🎭',
  MBTI:           '🧩',
  ENNEAGRAM:      '⬡',
  TEMPERAMENT:    '🌡',
  ARCHETYPE:      '🧭',
  LOVE_LANGUAGES: '💞',
  BUNDLE:         '✨',
}

function timeAgo(date: Date): string {
  const diff = Date.now() - new Date(date).getTime()
  const mins  = Math.floor(diff / 60_000)
  const hours = Math.floor(diff / 3_600_000)
  const days  = Math.floor(diff / 86_400_000)

  if (days > 0)  return `${days}d atrás`
  if (hours > 0) return `${hours}h atrás`
  if (mins > 0)  return `${mins}min atrás`
  return 'agora'
}

export default function RecentActivityCard({ assessments }: Props) {
  if (assessments.length === 0) {
    return (
      <div className="bg-white rounded-3xl border border-soul-mist/60 p-6">
        <h2 className="font-serif font-semibold text-xl text-soul-ink mb-4 flex items-center gap-2.5">
          <span className="w-7 h-7 rounded-lg bg-soul-sage/12 flex items-center justify-center text-sm">📋</span>
          Atividade recente
        </h2>
        <div className="py-8 text-center">
          <div className="text-3xl mb-3">🗺️</div>
          <p className="text-[15px] text-soul-ink/75 font-semibold mb-4">
            Nenhuma atividade ainda. Convide o primeiro candidato para começar.
          </p>
          <Link
            href="/dashboard/assessments"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full
                       bg-soul-terracota text-white text-[14px] font-bold font-sans
                       hover:bg-soul-terracota-dark transition-all duration-200"
          >
            + Criar primeira avaliação
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-5">

      {/* Activity list */}
      <div className="bg-white rounded-3xl border border-soul-mist/60 p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-serif font-semibold text-xl text-soul-ink flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-lg bg-soul-sage/12 flex items-center justify-center text-sm">📋</span>
            Atividade recente
          </h2>
          <Link
            href="/dashboard/assessments"
            className="text-[13px] font-bold text-soul-terracota hover:gap-2 transition-all duration-200"
          >
            Ver todas →
          </Link>
        </div>

        <div className="space-y-0">
          {assessments.slice(0, 6).map((a, i) => {
            const cfg = STATUS_CONFIG[a.status as AssessmentStatus] ?? {
              label: a.status, variant: 'locked' as const,
            }
            const emoji = TEST_TYPE_EMOJI[a.testType] ?? '📊'

            const dotColor =
              a.status === 'COMPLETED' ? 'bg-soul-sage' :
              a.status === 'SENT'      ? 'bg-soul-amber' :
              a.status === 'PENDING'   ? 'bg-soul-indigo' :
                                         'bg-soul-mist'

            return (
              <div
                key={a.id}
                className="flex items-start gap-3 py-3 border-b border-soul-mist/40 last:border-b-0"
              >
                <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${dotColor}`} />

                <Avatar name={a.employee.name} size="sm" paletteIndex={i} />

                <div className="flex-1 min-w-0">
                  <div className="text-[14px] text-soul-ink font-medium">
                    <span className="font-bold">{a.employee.name}</span>
                    {a.status === 'COMPLETED' ? ' completou ' : ' iniciou '}
                    <span className="text-soul-ink/80 font-semibold">{emoji} {a.testType}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <Badge variant={cfg.variant}>{cfg.label}</Badge>
                  <span className="text-[12px] text-soul-ink/70 font-semibold">{timeAgo(a.createdAt)}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Candidates summary */}
      <div className="bg-white rounded-3xl border border-soul-mist/60 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-serif font-semibold text-xl text-soul-ink flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-lg bg-soul-indigo/10 flex items-center justify-center text-sm">👥</span>
            Candidatos
          </h2>
          <Link href="/dashboard/assessments" className="text-[13px] font-bold text-soul-terracota">
            Ver todos →
          </Link>
        </div>

        <div className="space-y-0">
          {assessments.slice(0, 5).map((a, i) => {
            const cfg = STATUS_CONFIG[a.status as AssessmentStatus] ?? {
              label: a.status, variant: 'locked' as const,
            }

            return (
              <div key={a.id} className="flex items-center gap-3 py-2.5 border-b border-soul-mist/40 last:border-b-0">
                <Avatar name={a.employee.name} size="sm" paletteIndex={i} />
                <div className="flex-1 min-w-0">
                  <div className="text-[14px] font-bold text-soul-ink truncate">
                    {a.employee.name}
                  </div>
                  <div className="text-[12px] font-display italic text-soul-ink/75 font-semibold">
                    Descobrindo…
                  </div>
                </div>
                <Badge variant={cfg.variant} className="flex-shrink-0">
                  {cfg.label}
                </Badge>
              </div>
            )
          })}
        </div>

        {assessments.length > 5 && (
          <Link
            href="/dashboard/assessments"
            className="mt-4 w-full flex items-center justify-center gap-2 py-3 rounded-full
                       text-[14px] font-bold text-soul-terracota border-2 border-soul-terracota/35
                       hover:bg-soul-terracota/5 transition-colors font-sans"
          >
            + {assessments.length - 5} mais candidatos
          </Link>
        )}
      </div>

    </div>
  )
}

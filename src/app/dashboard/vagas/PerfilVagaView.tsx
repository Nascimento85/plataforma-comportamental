import type { PerfilVaga, Nivel } from '@/lib/vaga/generate'

const DISC_HEX: Record<string, string> = { D: '#ef4444', I: '#f59e0b', S: '#22c55e', C: '#3b82f6' }
const DISC_NOME: Record<string, string> = { D: 'Dominância', I: 'Influência', S: 'Estabilidade', C: 'Conformidade' }
const NIVEL_PCT: Record<Nivel, number> = { Alto: 100, 'Médio': 60, Baixo: 28 }

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-soul-parchment rounded-3xl p-6 ${className}`} style={{ border: '1px solid rgba(58,61,69,0.6)' }}>
      {children}
    </div>
  )
}

function Titulo({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[12px] font-sans font-bold uppercase tracking-[0.15em] mb-4" style={{ color: 'rgba(240,236,227,0.6)' }}>
      {children}
    </h2>
  )
}

export default function PerfilVagaView({ perfil, titulo }: { perfil: PerfilVaga; titulo: string }) {
  const dom = perfil.disc.dominante

  return (
    <div className="space-y-5">
      {/* Hero */}
      <Card>
        <div className="flex items-start gap-5">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl font-bold font-sans flex-shrink-0"
               style={{ background: DISC_HEX[dom] ?? '#c9a84c' }}>
            {dom}
          </div>
          <div>
            <p className="text-[12px] font-sans font-bold uppercase tracking-[0.15em] mb-1" style={{ color: 'rgba(240,236,227,0.6)' }}>
              Perfil ideal · {titulo}
            </p>
            <h1 className="font-serif font-semibold text-2xl text-soul-ink">Predominância {DISC_NOME[dom]} ({dom})</h1>
            <p className="text-[15px] font-sans mt-2 leading-relaxed" style={{ color: 'rgba(240,236,227,0.82)' }}>{perfil.resumo}</p>
          </div>
        </div>
      </Card>

      {/* DISC alvo */}
      <Card>
        <Titulo>Balanço DISC ideal</Titulo>
        <div className="space-y-3">
          {(['D', 'I', 'S', 'C'] as const).map((k) => {
            const nivel = perfil.disc.niveis[k]
            return (
              <div key={k}>
                <div className="flex justify-between text-[13px] font-sans mb-1" style={{ color: 'rgba(240,236,227,0.75)' }}>
                  <span className="font-medium">{k} — {DISC_NOME[k]}</span>
                  <span style={{ color: DISC_HEX[k] }} className="font-semibold">{nivel}</span>
                </div>
                <div className="h-2.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
                  <div className="h-full rounded-full" style={{ width: `${NIVEL_PCT[nivel] ?? 50}%`, background: DISC_HEX[k] }} />
                </div>
              </div>
            )
          })}
        </div>
        <p className="text-[14px] font-sans mt-4 leading-relaxed" style={{ color: 'rgba(240,236,227,0.72)' }}>{perfil.disc.justificativa}</p>
      </Card>

      {/* O que procurar / Alertas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Card>
          <Titulo>O que procurar no candidato</Titulo>
          <ul className="space-y-2.5">
            {perfil.procurar.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-[14px] font-sans leading-relaxed" style={{ color: 'rgba(240,236,227,0.82)' }}>
                <span className="font-bold flex-shrink-0 mt-0.5" style={{ color: '#5fbf6a' }}>✓</span>{item}
              </li>
            ))}
          </ul>
        </Card>
        <Card>
          <Titulo>Sinais de alerta</Titulo>
          <ul className="space-y-2.5">
            {perfil.alertas.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-[14px] font-sans leading-relaxed" style={{ color: 'rgba(240,236,227,0.82)' }}>
                <span className="font-bold flex-shrink-0 mt-0.5" style={{ color: '#e0876f' }}>!</span>{item}
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Cruzamento com outros testes */}
      {perfil.outrosTestes?.length > 0 && (
        <Card>
          <Titulo>Cruzando com outros testes da plataforma</Titulo>
          <div className="space-y-3">
            {perfil.outrosTestes.map((t, i) => (
              <div key={i} className="rounded-2xl p-4" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(58,61,69,0.5)' }}>
                <p className="text-[14px] font-sans font-semibold" style={{ color: '#e8c878' }}>
                  {t.teste}: <span style={{ color: '#f0ece3' }}>{t.indicacao}</span>
                </p>
                <p className="text-[13.5px] font-sans mt-1 leading-relaxed" style={{ color: 'rgba(240,236,227,0.7)' }}>{t.porque}</p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Perguntas-chave */}
      {perfil.perguntasChave?.length > 0 && (
        <Card>
          <Titulo>Perguntas-chave para a entrevista</Titulo>
          <ol className="space-y-2.5">
            {perfil.perguntasChave.map((q, i) => (
              <li key={i} className="flex items-start gap-3 text-[14px] font-sans leading-relaxed" style={{ color: 'rgba(240,236,227,0.82)' }}>
                <span className="w-6 h-6 rounded-full flex items-center justify-center text-[12px] font-bold flex-shrink-0"
                      style={{ background: 'rgba(201,168,76,0.18)', color: '#e8c878' }}>{i + 1}</span>
                {q}
              </li>
            ))}
          </ol>
        </Card>
      )}
    </div>
  )
}

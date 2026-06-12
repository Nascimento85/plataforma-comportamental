'use client'

// ============================================================
// Importador de colaboradores (Equipes & Setores)
// Aceita CSV colado ou arquivo. Colunas: nome, email, cargo, setor
// (cabeçalho opcional, separador , ou ;). Preview antes de importar.
// ============================================================

import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

interface Linha { nome: string; email: string; cargo: string; setor: string }

const GOLD = '#d4b35e'

const TEMPLATES_SETOR = [
  { nome: 'Liderança & Diretoria', sub: 'C-level, VPs e heads',          icone: '👑' },
  { nome: 'Vendas & Comercial',    sub: 'Prospecção, closers, CS',       icone: '🎯' },
  { nome: 'Marketing',             sub: 'Growth, conteúdo, branding',    icone: '✦'  },
  { nome: 'Operações',             sub: 'Logística, supply, produção',   icone: '⚙️' },
  { nome: 'Financeiro',            sub: 'Contábil, fiscal, tesouraria',  icone: '◆'  },
  { nome: 'Pessoas & RH',          sub: 'Recrutamento, DP, cultura',     icone: '🌿' },
  { nome: 'Tecnologia',            sub: 'Dev, dados, infraestrutura',    icone: '◈'  },
  { nome: 'Atendimento',           sub: 'Suporte, sucesso do cliente',   icone: '◎'  },
]

function parseCsv(texto: string): Linha[] {
  const linhas = texto.split(/\r?\n/).map((l) => l.trim()).filter(Boolean)
  if (linhas.length === 0) return []
  const sep = (linhas[0].match(/;/g)?.length ?? 0) >= (linhas[0].match(/,/g)?.length ?? 0) ? ';' : ','

  const primeira = linhas[0].toLowerCase()
  const temCabecalho = primeira.includes('nome') || primeira.includes('email') || primeira.includes('setor')

  // Mapa de colunas: pelo cabeçalho, ou ordem padrão nome,email,cargo,setor
  let idx = { nome: 0, email: 1, cargo: 2, setor: 3 }
  if (temCabecalho) {
    const cols = linhas[0].split(sep).map((c) => c.trim().toLowerCase())
    idx = {
      nome:  cols.findIndex((c) => c.includes('nome')),
      email: cols.findIndex((c) => c.includes('mail')),
      cargo: cols.findIndex((c) => c.includes('cargo') || c.includes('função') || c.includes('funcao')),
      setor: cols.findIndex((c) => c.includes('setor') || c.includes('time') || c.includes('equipe') || c.includes('depart')),
    }
  }

  return linhas.slice(temCabecalho ? 1 : 0).map((l) => {
    const c = l.split(sep).map((x) => x.trim().replace(/^"|"$/g, ''))
    const pega = (i: number) => (i >= 0 && i < c.length ? c[i] : '')
    return { nome: pega(idx.nome), email: pega(idx.email), cargo: pega(idx.cargo), setor: pega(idx.setor) }
  }).filter((r) => r.nome && r.setor)
}

export default function ImportClient() {
  const router = useRouter()
  const fileRef = useRef<HTMLInputElement>(null)
  const [texto, setTexto]       = useState('')
  const [preview, setPreview]   = useState<Linha[]>([])
  const [enviando, setEnviando] = useState(false)
  const [msg, setMsg]           = useState('')
  const [criandoTpl, setCriandoTpl] = useState('')

  function atualizar(t: string) {
    setTexto(t)
    setPreview(parseCsv(t))
    setMsg('')
  }

  function lerArquivo(f: File) {
    const reader = new FileReader()
    reader.onload = () => atualizar(String(reader.result ?? ''))
    reader.readAsText(f, 'utf-8')
  }

  async function importar() {
    if (preview.length === 0) return
    setEnviando(true); setMsg('')
    try {
      const res = await fetch('/api/talent-teams/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rows: preview }),
      })
      const r = await res.json()
      if (!res.ok) { setMsg(r.error ?? 'Falha na importação.'); return }
      setMsg(`✓ Importação concluída: ${r.timesCriados} time(s) criado(s), ${r.membrosCriados} colaborador(es) adicionados, ${r.candidatosCriados} registrados como candidatos${r.ignorados ? `, ${r.ignorados} já existiam` : ''}.`)
      setTexto(''); setPreview([])
      router.refresh()
    } catch {
      setMsg('Falha de conexão. Tente novamente.')
    } finally {
      setEnviando(false)
    }
  }

  async function criarTemplate(nome: string) {
    setCriandoTpl(nome); setMsg('')
    try {
      const res = await fetch('/api/talent-teams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome }),
      })
      const r = await res.json()
      if (!res.ok) { setMsg(r.error ?? 'Não foi possível criar o setor.'); return }
      setMsg(`✓ Setor "${nome}" criado. Adicione colaboradores pela importação acima ou pela Matriz.`)
      router.refresh()
    } finally {
      setCriandoTpl('')
    }
  }

  const modeloCsv = 'data:text/csv;charset=utf-8,' + encodeURIComponent(
    'nome;email;cargo;setor\nAna Souza;ana@empresa.com;Analista de Vendas;Vendas & Comercial\nBruno Lima;bruno@empresa.com;Designer;Marketing\n'
  )

  return (
    <div className="space-y-7">
      {/* ── Importador ── */}
      <div className="soul-panel space-y-4">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <p className="text-[13px] font-bold uppercase tracking-widest" style={{ color: GOLD }}>Importar colaboradores</p>
            <p className="text-[14px] text-soul-ink/80 font-medium mt-1 max-w-2xl">
              Cole do Excel/Sheets ou envie um CSV com as colunas <strong>nome; email; cargo; setor</strong>.
              Cada setor vira um time na Gestão de Times, e quem tem email já entra como candidato
              (pronto pra receber testes e a Avaliação do Líder).
            </p>
          </div>
          <a href={modeloCsv} download="modelo-colaboradores.csv"
             className="text-[13px] font-bold px-4 py-2 rounded-full no-underline whitespace-nowrap"
             style={{ background: 'rgba(212,179,94,0.14)', color: GOLD, border: '1px solid rgba(212,179,94,0.4)' }}>
            ↓ Baixar modelo CSV
          </a>
        </div>

        <textarea value={texto} onChange={(e) => atualizar(e.target.value)} rows={6}
                  placeholder={'nome;email;cargo;setor\nAna Souza;ana@empresa.com;Analista de Vendas;Vendas & Comercial\nBruno Lima;bruno@empresa.com;Designer;Marketing'}
                  className="w-full rounded-2xl px-4 py-3.5 text-[14px] font-medium resize-y outline-none"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1.5px solid rgba(255,255,255,0.15)', color: '#f0ece3', fontFamily: 'monospace' }} />

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <button onClick={() => fileRef.current?.click()}
                  className="px-5 py-3 rounded-full text-[14px] font-bold"
                  style={{ border: '2px solid rgba(243,239,231,0.35)', color: '#f0ece3' }}>
            Enviar arquivo CSV
          </button>
          <input ref={fileRef} type="file" accept=".csv,.txt" className="hidden"
                 onChange={(e) => e.target.files?.[0] && lerArquivo(e.target.files[0])} />
          <button onClick={importar} disabled={enviando || preview.length === 0}
                  className="flex-1 px-5 py-3 rounded-full text-[15px] font-bold disabled:opacity-40"
                  style={{ background: `linear-gradient(135deg, ${GOLD}, #b08d3e)`, color: '#17181c' }}>
            {enviando ? 'Importando...' : preview.length > 0 ? `Importar ${preview.length} colaborador(es) →` : 'Cole os dados para importar'}
          </button>
        </div>

        {/* Preview */}
        {preview.length > 0 && (
          <div className="overflow-x-auto rounded-2xl" style={{ border: '1px solid rgba(255,255,255,0.10)' }}>
            <table className="w-full text-left" style={{ minWidth: '560px' }}>
              <thead>
                <tr style={{ background: 'rgba(255,255,255,0.05)' }}>
                  {['Nome', 'Email', 'Cargo', 'Setor'].map((h) => (
                    <th key={h} className="px-4 py-2.5 text-[12px] font-bold uppercase tracking-widest text-soul-ink/65">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {preview.slice(0, 8).map((r, i) => (
                  <tr key={i} className="border-t" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
                    <td className="px-4 py-2 text-[13.5px] font-semibold text-soul-ink/88">{r.nome}</td>
                    <td className="px-4 py-2 text-[13.5px] font-medium text-soul-ink/72">{r.email || '—'}</td>
                    <td className="px-4 py-2 text-[13.5px] font-medium text-soul-ink/72">{r.cargo || '—'}</td>
                    <td className="px-4 py-2 text-[13.5px] font-semibold" style={{ color: GOLD }}>{r.setor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {preview.length > 8 && (
              <p className="px-4 py-2 text-[12.5px] font-semibold text-soul-ink/65">+ {preview.length - 8} linhas</p>
            )}
          </div>
        )}

        {msg && (
          <div className="rounded-2xl px-4 py-3 text-[14px] font-semibold"
               style={{
                 background: msg.startsWith('✓') ? 'rgba(122,158,126,0.14)' : 'rgba(196,122,114,0.14)',
                 border: `1px solid ${msg.startsWith('✓') ? 'rgba(122,158,126,0.4)' : 'rgba(196,122,114,0.45)'}`,
                 color: msg.startsWith('✓') ? '#a9d3a9' : '#f0a892',
               }}>
            {msg}
          </div>
        )}
      </div>

      {/* ── Templates de departamento (criam o setor na hora) ── */}
      <div>
        <h2 className="font-serif font-semibold text-2xl text-soul-ink mb-1">Templates de departamento</h2>
        <p className="text-[14px] text-soul-ink/72 font-medium mb-4">
          Crie a estrutura com um clique e importe os colaboradores em seguida.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TEMPLATES_SETOR.map((t) => (
            <button key={t.nome} onClick={() => criarTemplate(t.nome)} disabled={criandoTpl !== ''}
                    className="soul-panel text-left transition-all hover:-translate-y-0.5 disabled:opacity-60">
              <span className="w-10 h-10 rounded-xl flex items-center justify-center text-lg mb-3"
                    style={{ background: 'rgba(212,179,94,0.12)' }}>{t.icone}</span>
              <p className="text-[15px] font-bold text-soul-ink leading-tight">{t.nome}</p>
              <p className="text-[13px] text-soul-ink/65 font-medium mt-0.5">{t.sub}</p>
              <p className="text-[12.5px] font-bold mt-3" style={{ color: GOLD }}>
                {criandoTpl === t.nome ? 'Criando...' : '+ Criar setor'}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

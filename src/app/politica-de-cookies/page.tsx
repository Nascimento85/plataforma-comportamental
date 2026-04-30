// ============================================================
// /politica-de-cookies — detalhamento de cookies usados (LGPD)
// Documento público com botão "Gerenciar preferências".
// ============================================================

import type { Metadata } from 'next'
import Link from 'next/link'
import CookiePrefsButton from './CookiePrefsButton'

export const metadata: Metadata = {
  title:       'Política de Cookies',
  description: 'Quais cookies utilizamos no Mapa Comportamental, suas finalidades e como gerenciar suas preferências.',
}

const LAST_UPDATE = '29 de abril de 2026'

interface CookieRow {
  name:     string
  category: 'Necessário' | 'Análise' | 'Marketing' | 'Preferências'
  purpose:  string
  duration: string
  provider: string
}

const COOKIES: CookieRow[] = [
  {
    name:     'app-session',
    category: 'Necessário',
    purpose:  'Mantém o usuário autenticado entre páginas.',
    duration: '30 dias',
    provider: 'Mapa Comportamental',
  },
  {
    name:     'mc:cookie-consent',
    category: 'Necessário',
    purpose:  'Armazena suas preferências de consentimento de cookies.',
    duration: '12 meses',
    provider: 'Mapa Comportamental',
  },
  {
    name:     'soul:upsell-shown:*',
    category: 'Necessário',
    purpose:  'Evita exibir o popup de upgrade Premium mais de uma vez por sessão.',
    duration: 'Sessão (sessionStorage)',
    provider: 'Mapa Comportamental',
  },
  {
    name:     'psique_welcome_seen_*',
    category: 'Preferências',
    purpose:  'Lembra que o usuário já viu o modal de boas-vindas.',
    duration: 'Permanente até logout',
    provider: 'Mapa Comportamental',
  },
  // Os abaixo só serão definidos quando o usuário consentir
  {
    name:     '_ga, _ga_*',
    category: 'Análise',
    purpose:  'Métricas de uso (páginas vistas, tempo no site) — anonimizadas.',
    duration: 'Até 2 anos',
    provider: 'Google Analytics (quando habilitado)',
  },
  {
    name:     '_fbp, fr',
    category: 'Marketing',
    purpose:  'Identificação para campanhas e remarketing no Facebook/Instagram.',
    duration: '90 dias',
    provider: 'Meta Platforms (quando habilitado)',
  },
]

export default function PoliticaDeCookiesPage() {
  return (
    <div className="min-h-screen" style={{ background: '#faf7f2' }}>
      <main className="max-w-3xl mx-auto px-5 py-12 sm:py-16">

        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-soul-terracota mb-3">
          Documento legal · LGPD
        </p>
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-soul-ink leading-tight mb-2">
          Política de Cookies
        </h1>
        <p className="text-[13px] text-soul-ink/60 mb-8">
          Última atualização: {LAST_UPDATE}
        </p>

        {/* CTA gerenciar */}
        <div
          className="rounded-2xl p-5 sm:p-6 mb-10 border border-soul-mist/60 bg-white flex flex-wrap items-center justify-between gap-4"
        >
          <div className="flex-1 min-w-[220px]">
            <p className="font-serif text-lg font-semibold text-soul-ink">
              Gerenciar minhas preferências
            </p>
            <p className="text-[13px] text-soul-ink/65 mt-1">
              Você pode alterar a qualquer momento o que consentiu.
            </p>
          </div>
          <CookiePrefsButton />
        </div>

        <article className="space-y-6 text-soul-ink/85 text-[15px] leading-relaxed">

          <Section title="1. O que são cookies">
            <p>
              Cookies são pequenos arquivos de texto armazenados no seu navegador
              quando você visita um site. Eles permitem que o site reconheça você em
              próximas visitas, armazene preferências e colete métricas de uso.
            </p>
          </Section>

          <Section title="2. Como utilizamos cookies">
            <p>
              Utilizamos cookies por quatro motivos: <strong>(i)</strong> manter você
              autenticado, <strong>(ii)</strong> armazenar suas preferências de
              consentimento, <strong>(iii)</strong> analisar como nosso serviço é
              utilizado e <strong>(iv)</strong> ofertar conteúdo relevante. Apenas os
              cookies estritamente necessários são definidos sem o seu consentimento
              prévio.
            </p>
          </Section>

          <Section title="3. Categorias">
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Estritamente necessários</strong> — sem eles, funcionalidades
                como login e segurança não funcionam. Não exigem consentimento.
              </li>
              <li>
                <strong>Análise e desempenho</strong> — métricas agregadas de uso
                (anônimas). Exigem consentimento.
              </li>
              <li>
                <strong>Marketing</strong> — personalização de anúncios e remarketing.
                Exigem consentimento.
              </li>
              <li>
                <strong>Preferências</strong> — lembram suas escolhas (idioma, tema,
                modais já vistos). Exigem consentimento.
              </li>
            </ul>
          </Section>

          <Section title="4. Cookies utilizados">
            <div className="rounded-2xl border border-soul-mist/60 bg-white overflow-hidden -mx-1 sm:mx-0">
              <table className="w-full text-[13px]">
                <thead className="bg-soul-mist/30 text-soul-ink/65 text-[11px] font-bold uppercase tracking-wider">
                  <tr>
                    <th className="text-left px-4 py-3">Nome</th>
                    <th className="text-left px-4 py-3">Categoria</th>
                    <th className="text-left px-4 py-3 hidden sm:table-cell">Finalidade</th>
                    <th className="text-left px-4 py-3 hidden md:table-cell">Duração</th>
                    <th className="text-left px-4 py-3 hidden md:table-cell">Provedor</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-soul-mist/40">
                  {COOKIES.map(c => (
                    <tr key={c.name} className="align-top">
                      <td className="px-4 py-3 font-mono text-[12px]">{c.name}</td>
                      <td className="px-4 py-3">
                        <span className="inline-block px-2 py-0.5 rounded-full text-[11px] font-semibold"
                          style={{ background: 'rgba(196,99,58,0.12)', color: '#a8522e' }}>
                          {c.category}
                        </span>
                      </td>
                      <td className="px-4 py-3 hidden sm:table-cell text-soul-ink/75">{c.purpose}</td>
                      <td className="px-4 py-3 hidden md:table-cell text-soul-ink/65">{c.duration}</td>
                      <td className="px-4 py-3 hidden md:table-cell text-soul-ink/65">{c.provider}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[12px] text-soul-ink/55 italic mt-2">
              Cookies de terceiros (Google Analytics, Meta) são definidos somente após
              consentimento explícito.
            </p>
          </Section>

          <Section title="5. Como recusar ou alterar">
            <p>
              Use o botão <strong>"Gerenciar preferências"</strong> no topo desta página
              para revisar seu consentimento. Você também pode bloquear cookies
              diretamente nas configurações do seu navegador (Chrome, Safari, Firefox,
              Edge), embora isso possa afetar o funcionamento do site.
            </p>
          </Section>

          <Section title="6. Contato">
            <p>
              Para dúvidas sobre cookies ou tratamento de dados, fale com nosso DPO em{' '}
              <a href="mailto:contato@mapacomportamental.com" className="text-soul-terracota underline">
                contato@mapacomportamental.com
              </a>
              .
            </p>
          </Section>
        </article>

        <div className="mt-12 pt-6 border-t border-soul-mist/60 flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-soul-ink/60">
          <Link href="/politica-de-privacidade" className="hover:text-soul-terracota">Política de Privacidade</Link>
          <Link href="/termos-de-uso"           className="hover:text-soul-terracota">Termos de Uso</Link>
          <Link href="/"                        className="hover:text-soul-terracota">Voltar para a Home</Link>
        </div>
      </main>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-serif text-xl sm:text-2xl font-semibold text-soul-ink mb-3">{title}</h2>
      <div className="space-y-3">{children}</div>
    </section>
  )
}

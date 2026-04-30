// ============================================================
// /politica-de-privacidade — conformidade LGPD (Lei 13.709/2018)
// Documento público, sem autenticação.
// ============================================================

import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title:       'Política de Privacidade',
  description: 'Como o Mapa Comportamental coleta, usa e protege seus dados pessoais conforme a LGPD.',
}

const LAST_UPDATE = '29 de abril de 2026'

export default function PoliticaDePrivacidadePage() {
  return (
    <div className="min-h-screen" style={{ background: '#faf7f2' }}>
      <main className="max-w-3xl mx-auto px-5 py-12 sm:py-16">

        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-soul-terracota mb-3">
          Documento legal · LGPD
        </p>
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-soul-ink leading-tight mb-2">
          Política de Privacidade
        </h1>
        <p className="text-[13px] text-soul-ink/60 mb-10">
          Última atualização: {LAST_UPDATE}
        </p>

        <article className="prose prose-soul max-w-none text-soul-ink/85 space-y-6 text-[15px] leading-relaxed">

          <Section title="1. Quem somos">
            <p>
              O Mapa Comportamental ("nós", "nosso") é uma plataforma online de
              avaliações comportamentais (DISC, MBTI, Eneagrama, Temperamentos,
              Arquétipos, Linguagens do Amor, Âncoras de Carreira, Inteligência
              Emocional) operada por <strong>[Razão Social aqui]</strong>, inscrita no
              CNPJ <strong>[XX.XXX.XXX/0001-XX]</strong>, com sede em <strong>[endereço]</strong>.
            </p>
            <p>
              Para qualquer dúvida ou solicitação relacionada aos seus dados pessoais,
              entre em contato conosco pelo e-mail{' '}
              <a href="mailto:contato@mapacomportamental.com" className="text-soul-terracota underline">
                contato@mapacomportamental.com
              </a>
              .
            </p>
          </Section>

          <Section title="2. O que esta política cobre">
            <p>
              Esta Política descreve quais dados pessoais coletamos, como os utilizamos,
              com quem os compartilhamos e quais são seus direitos como titular, em
              conformidade com a <strong>Lei Geral de Proteção de Dados (Lei nº 13.709/2018)</strong>.
            </p>
          </Section>

          <Section title="3. Dados que coletamos">
            <p>Coletamos as seguintes categorias de dados:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Dados de cadastro:</strong> nome, e-mail, senha (criptografada),
                telefone, Instagram (opcional), tipo de conta (PF/PJ).
              </li>
              <li>
                <strong>Dados profissionais:</strong> cargo, empresa, endereço e dados
                complementares preenchidos voluntariamente no perfil.
              </li>
              <li>
                <strong>Dados de uso e respostas dos testes:</strong> respostas a
                questionários comportamentais, perfis identificados e métricas de
                desempenho da avaliação.
              </li>
              <li>
                <strong>Dados de pagamento:</strong> processados pela{' '}
                <strong>Stripe Inc.</strong> — não armazenamos números de cartão em
                nossos servidores.
              </li>
              <li>
                <strong>Dados técnicos:</strong> endereço IP, tipo de navegador,
                identificadores de dispositivo, páginas visitadas e horários de acesso.
              </li>
              <li>
                <strong>Cookies:</strong> conforme detalhado em nossa{' '}
                <Link href="/politica-de-cookies" className="text-soul-terracota underline">
                  Política de Cookies
                </Link>
                .
              </li>
            </ul>
          </Section>

          <Section title="4. Bases legais e finalidades">
            <p>
              Tratamos seus dados com base nas seguintes hipóteses legais previstas na
              LGPD (art. 7º):
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Execução de contrato</strong> (art. 7º, V): cadastro, processamento
                dos testes, geração de relatórios, envio de notificações relacionadas ao
                serviço, processamento de pagamentos.
              </li>
              <li>
                <strong>Consentimento</strong> (art. 7º, I): comunicações de marketing,
                cookies não-essenciais, integração com WhatsApp/Instagram via ManyChat.
              </li>
              <li>
                <strong>Legítimo interesse</strong> (art. 7º, IX): segurança do sistema,
                prevenção a fraudes e melhoria contínua da plataforma.
              </li>
              <li>
                <strong>Cumprimento de obrigação legal</strong> (art. 7º, II): emissão
                de notas fiscais, retenção de logs por prazos exigidos pela legislação.
              </li>
            </ul>
          </Section>

          <Section title="5. Com quem compartilhamos seus dados">
            <p>
              Compartilhamos dados estritamente necessários com os seguintes parceiros
              ("operadores"), todos sob contrato e cláusulas de proteção de dados:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Supabase Inc.</strong> (EUA) — banco de dados e armazenamento.</li>
              <li><strong>Railway Corp.</strong> (EUA) — hospedagem da aplicação.</li>
              <li><strong>Stripe Inc.</strong> (EUA) — processamento de pagamentos.</li>
              <li><strong>Resend</strong> (EUA) — envio de e-mails transacionais.</li>
              <li><strong>ManyChat Inc.</strong> (EUA) — automação de mensagens em redes sociais (somente com consentimento).</li>
              <li><strong>Anthropic PBC</strong> (EUA) — geração de relatórios cruzados via inteligência artificial (apenas dados anonimizados).</li>
            </ul>
            <p>
              Não vendemos seus dados pessoais a terceiros, em hipótese alguma.
              Transferências internacionais ocorrem apenas para os parceiros listados,
              com proteções compatíveis com a LGPD (Cláusulas Contratuais Padrão).
            </p>
          </Section>

          <Section title="6. Por quanto tempo guardamos seus dados">
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Conta ativa:</strong> enquanto você mantiver sua conta conosco.</li>
              <li><strong>Após exclusão de conta:</strong> 6 meses para fins de auditoria e conformidade fiscal (em formato anonimizado quando possível).</li>
              <li><strong>Logs de acesso:</strong> 6 meses (art. 15 do Marco Civil da Internet).</li>
              <li><strong>Dados fiscais:</strong> 5 anos (legislação tributária).</li>
              <li><strong>Resultados de testes:</strong> enquanto a conta estiver ativa, ou pelo prazo solicitado pelo titular.</li>
            </ul>
          </Section>

          <Section title="7. Seus direitos como titular">
            <p>A LGPD garante a você os seguintes direitos (art. 18):</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Confirmação</strong> da existência de tratamento.</li>
              <li><strong>Acesso</strong> aos dados que possuímos sobre você.</li>
              <li><strong>Correção</strong> de dados incompletos, inexatos ou desatualizados.</li>
              <li><strong>Anonimização, bloqueio ou eliminação</strong> de dados desnecessários.</li>
              <li><strong>Portabilidade</strong> a outro fornecedor de serviço.</li>
              <li><strong>Eliminação</strong> dos dados tratados com base em consentimento.</li>
              <li><strong>Informação</strong> sobre entidades com as quais compartilhamos dados.</li>
              <li><strong>Revogação do consentimento</strong> a qualquer momento.</li>
              <li><strong>Oposição</strong> ao tratamento realizado com base em legítimo interesse.</li>
            </ul>
            <p>
              Para exercer qualquer um desses direitos, envie um e-mail para{' '}
              <a href="mailto:contato@mapacomportamental.com" className="text-soul-terracota underline">
                contato@mapacomportamental.com
              </a>
              {' '}com o assunto <strong>"LGPD — [seu pedido]"</strong>. Responderemos em até
              15 dias úteis.
            </p>
          </Section>

          <Section title="8. Segurança dos seus dados">
            <p>
              Adotamos medidas técnicas e organizacionais para proteger seus dados,
              incluindo: criptografia em trânsito (HTTPS/TLS), criptografia de senhas
              (bcrypt), controle de acesso por função, logs de auditoria, backups
              automáticos e segregação de ambientes de desenvolvimento e produção.
            </p>
            <p>
              Em caso de incidente de segurança que possa acarretar risco ou dano
              relevante aos titulares, notificaremos a Autoridade Nacional de Proteção
              de Dados (ANPD) e os titulares afetados em prazo razoável, conforme art.
              48 da LGPD.
            </p>
          </Section>

          <Section title="9. Crianças e adolescentes">
            <p>
              A plataforma destina-se a maiores de 18 anos. Não coletamos
              intencionalmente dados de menores. Se identificarmos que houve coleta
              indevida, removeremos os dados imediatamente.
            </p>
          </Section>

          <Section title="10. Alterações desta política">
            <p>
              Podemos atualizar esta Política periodicamente. Mudanças relevantes serão
              comunicadas por e-mail e/ou aviso destacado na plataforma. A data da
              última revisão consta no topo deste documento.
            </p>
          </Section>

          <Section title="11. Encarregado pelo Tratamento de Dados (DPO)">
            <p>
              Em conformidade com o art. 41 da LGPD, designamos um Encarregado para
              atuar como canal de comunicação entre o controlador, os titulares e a ANPD.
            </p>
            <p>
              <strong>DPO:</strong> [Nome do Encarregado]<br />
              <strong>E-mail:</strong>{' '}
              <a href="mailto:contato@mapacomportamental.com" className="text-soul-terracota underline">
                contato@mapacomportamental.com
              </a>
            </p>
          </Section>

          <Section title="12. Foro">
            <p>
              Esta Política é regida pelas leis da República Federativa do Brasil. Fica
              eleito o foro da comarca de <strong>[Cidade/UF]</strong> para dirimir
              qualquer controvérsia, com renúncia a qualquer outro, por mais
              privilegiado que seja.
            </p>
          </Section>

        </article>

        <div className="mt-12 pt-6 border-t border-soul-mist/60 flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-soul-ink/60">
          <Link href="/politica-de-cookies"   className="hover:text-soul-terracota">Política de Cookies</Link>
          <Link href="/termos-de-uso"          className="hover:text-soul-terracota">Termos de Uso</Link>
          <Link href="/"                       className="hover:text-soul-terracota">Voltar para a Home</Link>
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

// ============================================================
// /termos-de-uso — Termos e Condições do Mapa Comportamental
// ============================================================

import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title:       'Termos de Uso',
  description: 'Termos e condições de uso da plataforma Mapa Comportamental.',
}

const LAST_UPDATE = '29 de abril de 2026'

export default function TermosDeUsoPage() {
  return (
    <div className="min-h-screen" style={{ background: '#faf7f2' }}>
      <main className="max-w-3xl mx-auto px-5 py-12 sm:py-16">

        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-soul-terracota mb-3">
          Documento legal
        </p>
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-soul-ink leading-tight mb-2">
          Termos de Uso
        </h1>
        <p className="text-[13px] text-soul-ink/60 mb-10">
          Última atualização: {LAST_UPDATE}
        </p>

        <article className="text-soul-ink/85 space-y-6 text-[15px] leading-relaxed">

          <Section title="1. Aceitação">
            <p>
              Ao criar uma conta ou utilizar a plataforma Mapa Comportamental ("Plataforma"),
              você declara ter lido, entendido e concordado com estes Termos de Uso e
              com nossa{' '}
              <Link href="/politica-de-privacidade" className="text-soul-terracota underline">
                Política de Privacidade
              </Link>
              . Se você não concordar com qualquer disposição, não deve utilizar a
              Plataforma.
            </p>
          </Section>

          <Section title="2. Descrição do serviço">
            <p>
              O Mapa Comportamental oferece avaliações comportamentais online (DISC,
              MBTI, Eneagrama, Temperamentos, Arquétipos, Linguagens do Amor, Âncoras
              de Carreira, Inteligência Emocional) com geração de relatórios
              personalizados em PDF, ferramentas de gestão de candidatos e times, e
              relatórios Premium com plano de desenvolvimento (PDI).
            </p>
            <p>
              Os testes têm <strong>finalidade educacional e de autoconhecimento</strong> e
              não substituem avaliação clínica, psicológica ou médica. Os resultados
              são interpretações baseadas em modelos teóricos amplamente reconhecidos,
              mas não constituem diagnóstico.
            </p>
          </Section>

          <Section title="3. Cadastro e responsabilidade da conta">
            <p>
              Para utilizar a Plataforma, você deve ser maior de 18 anos e fornecer
              dados verídicos. Você é responsável por:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Manter a confidencialidade da sua senha.</li>
              <li>Todas as atividades realizadas em sua conta.</li>
              <li>Notificar-nos imediatamente sobre qualquer uso não autorizado.</li>
            </ul>
          </Section>

          <Section title="4. Passaporte de Autoconhecimento (créditos)">
            <p>
              A Plataforma utiliza um sistema de créditos chamado{' '}
              <strong>Passaporte de Autoconhecimento</strong>. Funcionamento:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Ao se cadastrar, você recebe <strong>4 créditos bônus</strong> válidos por 7 dias.</li>
              <li>Ao completar seu perfil, você ganha <strong>+6 créditos bônus</strong>, também válidos por 7 dias a partir da concessão.</li>
              <li>Créditos bônus expiram automaticamente após 7 dias e <strong>não são reembolsáveis</strong>.</li>
              <li>Créditos comprados (pagos) <strong>não expiram</strong>.</li>
              <li>Cada teste consome um número definido de créditos (DISC: 3, MBTI: 2, Eneagrama: 2, etc.).</li>
            </ul>
            <p>
              O Relatório Premium é uma compra avulsa via Stripe (R$ 47,00) que libera
              o conteúdo aprofundado de um relatório específico. Não é assinatura
              recorrente.
            </p>
          </Section>

          <Section title="5. Pagamentos e reembolsos">
            <p>
              Pagamentos são processados pela <strong>Stripe Inc.</strong> Os preços são
              exibidos em reais (BRL) e incluem todos os tributos aplicáveis.
            </p>
            <p>
              <strong>Direito de arrependimento (CDC art. 49):</strong> você pode
              solicitar o cancelamento de uma compra no prazo de até 7 dias contados a
              partir da contratação, desde que o serviço ainda não tenha sido utilizado
              (relatório Premium não desbloqueado, créditos não consumidos). Solicite
              pelo e-mail{' '}
              <a href="mailto:contato@mapacomportamental.com" className="text-soul-terracota underline">
                contato@mapacomportamental.com
              </a>
              .
            </p>
          </Section>

          <Section title="6. Uso aceitável">
            <p>É proibido utilizar a Plataforma para:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Violar leis ou direitos de terceiros.</li>
              <li>Realizar engenharia reversa, scraping ou tentar burlar limites técnicos.</li>
              <li>Compartilhar acesso de conta com terceiros não autorizados.</li>
              <li>Submeter dados falsos ou de pessoas que não consentiram com a avaliação.</li>
              <li>Utilizar os relatórios de forma discriminatória em processos seletivos.</li>
            </ul>
          </Section>

          <Section title="7. Propriedade intelectual">
            <p>
              Todo o conteúdo da Plataforma (textos, design, código, materiais Premium,
              questionários adaptados) é de propriedade do Mapa Comportamental ou de
              seus licenciadores. Você recebe uma <strong>licença pessoal,
              intransferível e não exclusiva</strong> para uso individual.
            </p>
            <p>
              Os relatórios em PDF gerados são personalizados para você e marcados com
              seu nome. <strong>É proibida a redistribuição</strong> desses materiais a
              terceiros sem autorização expressa.
            </p>
          </Section>

          <Section title="8. Limitação de responsabilidade">
            <p>
              A Plataforma é fornecida "no estado em que se encontra". Embora nos
              esforcemos para mantê-la disponível e segura, não garantimos
              funcionamento ininterrupto ou livre de erros. Não nos responsabilizamos
              por:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Decisões tomadas com base nos resultados dos testes.</li>
              <li>Indisponibilidades de terceiros (provedores de hospedagem, pagamento, e-mail).</li>
              <li>Perdas indiretas, lucros cessantes ou danos imateriais.</li>
            </ul>
            <p>
              A responsabilidade total agregada do Mapa Comportamental, em qualquer
              hipótese, fica limitada ao valor pago por você nos últimos 12 meses.
            </p>
          </Section>

          <Section title="9. Encerramento">
            <p>
              Você pode encerrar sua conta a qualquer momento solicitando exclusão
              pelo e-mail de contato. Reservamos o direito de suspender ou encerrar
              contas que violem estes Termos, com aviso prévio sempre que possível.
            </p>
          </Section>

          <Section title="10. Alterações nos Termos">
            <p>
              Podemos alterar estes Termos a qualquer momento. Mudanças relevantes
              serão comunicadas com pelo menos 15 dias de antecedência por e-mail e/ou
              aviso destacado na Plataforma. O uso continuado após a vigência implica
              aceitação dos novos Termos.
            </p>
          </Section>

          <Section title="11. Lei aplicável e foro">
            <p>
              Estes Termos são regidos pelas leis da República Federativa do Brasil.
              Fica eleito o foro da comarca de <strong>[Cidade/UF]</strong> para
              dirimir qualquer controvérsia, com renúncia a qualquer outro, por mais
              privilegiado que seja.
            </p>
          </Section>

          <Section title="12. Contato">
            <p>
              Dúvidas sobre estes Termos? Fale conosco em{' '}
              <a href="mailto:contato@mapacomportamental.com" className="text-soul-terracota underline">
                contato@mapacomportamental.com
              </a>
              .
            </p>
          </Section>
        </article>

        <div className="mt-12 pt-6 border-t border-soul-mist/60 flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-soul-ink/60">
          <Link href="/politica-de-privacidade" className="hover:text-soul-terracota">Política de Privacidade</Link>
          <Link href="/politica-de-cookies"     className="hover:text-soul-terracota">Política de Cookies</Link>
          <Link href="/"                         className="hover:text-soul-terracota">Voltar para a Home</Link>
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

// ============================================================
// Envio de e-mails via Resend REST API (sem SDK)
// Documentação: https://resend.com/docs/api-reference/emails/send-email
// ============================================================

import { TEST_LABELS } from '@/lib/test-labels'

const RESEND_API_KEY = process.env.RESEND_API_KEY
const APP_URL       = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'
const APP_NAME      = process.env.NEXT_PUBLIC_APP_NAME ?? 'Psique — Mapa Comportamental'

// Remetente: use seu domínio verificado no Resend em produção.
// Em desenvolvimento, 'onboarding@resend.dev' funciona para enviar ao seu próprio e-mail.
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? 'onboarding@resend.dev'
const FROM_NAME  = process.env.RESEND_FROM_NAME  ?? APP_NAME

export interface SendAssessmentEmailInput {
  employeeName:  string
  employeeEmail: string
  companyName:   string
  testType:      string
  testLink:      string
  expiresAt:     Date
}

const TEST_DESCRIPTIONS: Record<string, string> = {
  DISC:               'Identifica seu estilo de comportamento dominante nas dimensões Dominância, Influência, Estabilidade e Cautela.',
  MBTI:               'Mapeia suas preferências cognitivas em 4 dimensões para identificar seu tipo de personalidade entre 16 possíveis.',
  ENNEAGRAM:          'Revela seu padrão motivacional profundo e como ele influencia seus pensamentos, emoções e comportamentos.',
  TEMPERAMENT:        'Descobre seu temperamento predominante entre os 4 tipos clássicos: Colérico, Sanguíneo, Melancólico e Fleumático.',
  ARCHETYPE:          'Baseado na teoria de Carl Jung, identifica seu arquétipo dominante entre 12 padrões universais — revelando como você lidera, decide e se relaciona.',
  ARCHETYPE_FEMININE: 'Identifica qual das 7 energias arquetípicas femininas governa seu momento atual — e qual precisa ser ativada para o seu equilíbrio pleno.',
  COMUNICACAO:        'Mapeia seu estilo de comunicação, sua energia social e o termômetro de assertividade: o quanto sua comunicação é não violenta e onde está seu maior salto.',
  SILENCIO:           'Mostra o que você faz quando a conversa esquenta: o seu termômetro de assertividade e o padrão que aparece sob tensão.',
}

// ── Template HTML ─────────────────────────────────────────────────────────────

function buildEmailHtml(input: SendAssessmentEmailInput): string {
  const { employeeName, companyName, testType, testLink, expiresAt } = input
  const firstName    = employeeName.split(' ')[0]
  const testLabel    = TEST_LABELS[testType]    ?? testType
  const testDesc     = TEST_DESCRIPTIONS[testType] ?? ''
  const expireDate   = expiresAt.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })
  const expireHuman  = `${expiresAt.getDate()} de ${expiresAt.toLocaleString('pt-BR', { month: 'long' })}`

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${testLabel} — ${APP_NAME}</title>
</head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">

  <!-- Wrapper -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f3f4f6;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background:#2a47f5;border-radius:12px 12px 0 0;padding:32px 40px;text-align:center;">
              <div style="display:inline-block;background:rgba(255,255,255,0.15);border-radius:10px;padding:10px 20px;margin-bottom:16px;">
                <span style="color:#ffffff;font-size:14px;font-weight:600;letter-spacing:1px;">AVALIAÇÃO COMPORTAMENTAL</span>
              </div>
              <h1 style="margin:0;color:#ffffff;font-size:28px;font-weight:700;line-height:1.3;">${testLabel}</h1>
              <p style="margin:8px 0 0;color:rgba(255,255,255,0.8);font-size:14px;">Enviado por ${companyName}</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background:#ffffff;padding:40px;">

              <!-- Saudação -->
              <p style="margin:0 0 8px;font-size:22px;font-weight:700;color:#111827;">Olá, ${firstName}! 👋</p>
              <p style="margin:0 0 24px;font-size:15px;color:#4b5563;line-height:1.6;">
                <strong>${companyName}</strong> convidou você para realizar uma avaliação comportamental.
                Não há respostas certas ou erradas — seja sincero e responda como você realmente é.
              </p>

              <!-- Sobre o teste -->
              <div style="background:#f0f4ff;border-left:4px solid #2a47f5;border-radius:6px;padding:16px 20px;margin-bottom:28px;">
                <p style="margin:0 0 6px;font-size:12px;font-weight:700;color:#2a47f5;text-transform:uppercase;letter-spacing:0.8px;">Sobre este teste</p>
                <p style="margin:0;font-size:14px;color:#374151;line-height:1.6;">${testDesc}</p>
              </div>

              <!-- CTA principal -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:28px;">
                <tr>
                  <td align="center">
                    <a href="${testLink}"
                       style="display:inline-block;background:#2a47f5;color:#ffffff;text-decoration:none;
                              font-size:16px;font-weight:700;padding:16px 40px;border-radius:10px;
                              letter-spacing:0.3px;">
                      Iniciar Avaliação →
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Info de validade -->
              <div style="background:#fef9ec;border:1px solid #f6d860;border-radius:8px;padding:14px 18px;margin-bottom:28px;">
                <p style="margin:0;font-size:13px;color:#92400e;">
                  ⏰ <strong>Atenção:</strong> Este link expira em <strong>${expireHuman}</strong> (${expireDate}).
                  Após essa data, o link não funcionará mais.
                </p>
              </div>

              <!-- Link alternativo -->
              <p style="margin:0 0 6px;font-size:13px;color:#6b7280;">Se o botão não funcionar, copie e cole este link no navegador:</p>
              <p style="margin:0 0 28px;font-size:12px;color:#2a47f5;word-break:break-all;">${testLink}</p>

              <!-- Dúvidas -->
              <div style="border-top:1px solid #e5e7eb;padding-top:24px;">
                <p style="margin:0;font-size:13px;color:#6b7280;line-height:1.6;">
                  Dúvidas? Entre em contato com o setor de RH ou gestão da <strong>${companyName}</strong>.
                  Este e-mail foi enviado automaticamente — não responda diretamente.
                </p>
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f9fafb;border-radius:0 0 12px 12px;padding:20px 40px;border-top:1px solid #e5e7eb;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="font-size:12px;color:#9ca3af;">
                    © ${new Date().getFullYear()} ${APP_NAME}
                  </td>
                  <td align="right" style="font-size:12px;color:#9ca3af;">
                    Avaliações Comportamentais
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>`
}

// ── E-mail de conclusão do teste ─────────────────────────────────────────────

export interface TestCompletionInput {
  employeeName:  string
  employeeEmail: string
  companyName:   string
  companyEmail:  string
  testType:      string
  assessmentId:  string
  resultId:      string
}

/** HTML para a empresa: "Seu colaborador finalizou o teste" */
function buildCompletionHtmlForCompany(input: TestCompletionInput): string {
  const { employeeName, companyName, testType, assessmentId } = input
  const testLabel   = TEST_LABELS[testType] ?? testType
  const resultLink  = `${APP_URL}/dashboard/assessments/${assessmentId}`
  const today       = new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head><meta charset="UTF-8"/><title>Teste concluído — ${APP_NAME}</title></head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f3f4f6;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;">
        <tr>
          <td style="background:#2a47f5;border-radius:12px 12px 0 0;padding:32px 40px;text-align:center;">
            <div style="font-size:40px;margin-bottom:12px;">✅</div>
            <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:700;">Avaliação concluída!</h1>
            <p style="margin:8px 0 0;color:rgba(255,255,255,0.8);font-size:14px;">${testLabel}</p>
          </td>
        </tr>
        <tr>
          <td style="background:#ffffff;padding:40px;">
            <p style="margin:0 0 8px;font-size:20px;font-weight:700;color:#111827;">Olá, ${companyName}!</p>
            <p style="margin:0 0 24px;font-size:15px;color:#4b5563;line-height:1.6;">
              <strong>${employeeName}</strong> finalizou o teste <strong>${testLabel}</strong> em ${today}.
              O relatório completo já está disponível na plataforma.
            </p>
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:28px;">
              <tr><td align="center">
                <a href="${resultLink}" style="display:inline-block;background:#2a47f5;color:#ffffff;text-decoration:none;font-size:16px;font-weight:700;padding:16px 40px;border-radius:10px;">
                  Ver devolutiva completa →
                </a>
              </td></tr>
            </table>
            <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:14px 18px;">
              <p style="margin:0;font-size:13px;color:#166534;">
                💡 Você também pode baixar o PDF do relatório diretamente na plataforma,
                ou compartilhar o link público da devolutiva com o colaborador.
              </p>
            </div>
          </td>
        </tr>
        <tr>
          <td style="background:#f9fafb;border-radius:0 0 12px 12px;padding:20px 40px;border-top:1px solid #e5e7eb;">
            <p style="margin:0;font-size:12px;color:#9ca3af;">© ${new Date().getFullYear()} ${APP_NAME} — Avaliações Comportamentais</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body></html>`
}

/** HTML para o colaborador: "Seu resultado está pronto" */
function buildResultHtmlForEmployee(input: TestCompletionInput): string {
  const { employeeName, companyName, testType, assessmentId } = input
  const firstName   = employeeName.split(' ')[0]
  const testLabel   = TEST_LABELS[testType] ?? testType
  // /result/[id] espera o assessmentId, não o resultId. Usar resultId aqui causa 404.
  const publicLink  = `${APP_URL}/result/${assessmentId}`
  const today       = new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head><meta charset="UTF-8"/><title>Seu resultado — ${testLabel}</title></head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f3f4f6;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;">
        <tr>
          <td style="background:#2a47f5;border-radius:12px 12px 0 0;padding:32px 40px;text-align:center;">
            <div style="font-size:40px;margin-bottom:12px;">🎯</div>
            <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:700;">Seu resultado está pronto!</h1>
            <p style="margin:8px 0 0;color:rgba(255,255,255,0.8);font-size:14px;">${testLabel}</p>
          </td>
        </tr>
        <tr>
          <td style="background:#ffffff;padding:40px;">
            <p style="margin:0 0 8px;font-size:20px;font-weight:700;color:#111827;">Parabéns, ${firstName}! 🎉</p>
            <p style="margin:0 0 24px;font-size:15px;color:#4b5563;line-height:1.6;">
              Você concluiu a avaliação <strong>${testLabel}</strong> em ${today}, solicitada por <strong>${companyName}</strong>.
              Sua devolutiva completa está disponível no link abaixo — um relatório profundo e personalizado sobre o seu perfil.
            </p>
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:28px;">
              <tr><td align="center">
                <a href="${publicLink}" style="display:inline-block;background:#2a47f5;color:#ffffff;text-decoration:none;font-size:16px;font-weight:700;padding:16px 40px;border-radius:10px;">
                  Ver minha devolutiva →
                </a>
              </td></tr>
            </table>
            <div style="background:#f0f4ff;border-left:4px solid #2a47f5;border-radius:6px;padding:14px 18px;margin-bottom:24px;">
              <p style="margin:0;font-size:13px;color:#374151;line-height:1.6;">
                A devolutiva inclui seu perfil completo, pontos fortes, áreas de desenvolvimento,
                estilo de liderança e muito mais. Guarde este link — você pode acessá-lo a qualquer momento.
              </p>
            </div>
            <p style="margin:0 0 6px;font-size:13px;color:#6b7280;">Link direto para o seu resultado:</p>
            <p style="margin:0;font-size:12px;color:#2a47f5;word-break:break-all;">${publicLink}</p>
          </td>
        </tr>
        <tr>
          <td style="background:#f9fafb;border-radius:0 0 12px 12px;padding:20px 40px;border-top:1px solid #e5e7eb;">
            <p style="margin:0;font-size:12px;color:#9ca3af;">© ${new Date().getFullYear()} ${APP_NAME} — Avaliações Comportamentais</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body></html>`
}

/** Envia notificação de conclusão para a empresa, colaborador e admin */
export async function sendTestCompletionNotifications(
  input: TestCompletionInput
): Promise<void> {
  if (!RESEND_API_KEY || RESEND_API_KEY === 'COLOQUE_SUA_CHAVE_RESEND_AQUI') {
    console.warn('[email] RESEND_API_KEY não configurada — notificações não enviadas.')
    return
  }

  const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? 'kenio.araujo@live.com'
  const testLabel   = TEST_LABELS[input.testType] ?? input.testType

  const sends = [
    // 1. Para a empresa (admin da conta)
    fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from:    `${FROM_NAME} <${FROM_EMAIL}>`,
        to:      [input.companyEmail],
        subject: `[${APP_NAME}] ${input.employeeName} finalizou a avaliação ${testLabel}`,
        html:    buildCompletionHtmlForCompany(input),
      }),
    }),
    // 2. Para o colaborador
    fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from:    `${FROM_NAME} <${FROM_EMAIL}>`,
        to:      [input.employeeEmail],
        subject: `Sua devolutiva ${testLabel} está pronta! 🎯`,
        html:    buildResultHtmlForEmployee(input),
      }),
    }),
    // 3. Para o admin da plataforma (owner)
    ADMIN_EMAIL !== input.companyEmail
      ? fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            from:    `${FROM_NAME} <${FROM_EMAIL}>`,
            to:      [ADMIN_EMAIL],
            subject: `[Admin] Teste concluído — ${input.employeeName} (${input.companyName}) · ${testLabel}`,
            html:    buildCompletionHtmlForCompany({ ...input, companyName: `${input.companyName} [via Admin]` }),
          }),
        })
      : Promise.resolve(),
  ]

  await Promise.allSettled(sends)
    .then((results) => {
      results.forEach((r, i) => {
        if (r.status === 'rejected') console.error(`[email] Falha no envio ${i}:`, r.reason)
      })
    })
    .catch(console.error)
}

// ── E-mail de recuperação de senha ───────────────────────────────────────────

function buildPasswordResetHtml(name: string, resetLink: string): string {
  const firstName = name.split(' ')[0]
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head><meta charset="UTF-8"/><title>Recuperação de Senha — ${APP_NAME}</title></head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f3f4f6;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;">
        <tr>
          <td style="background:#2a47f5;border-radius:12px 12px 0 0;padding:32px 40px;text-align:center;">
            <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:700;">Recuperação de Senha</h1>
            <p style="margin:8px 0 0;color:rgba(255,255,255,0.8);font-size:14px;">${APP_NAME}</p>
          </td>
        </tr>
        <tr>
          <td style="background:#ffffff;padding:40px;">
            <p style="margin:0 0 16px;font-size:20px;font-weight:700;color:#111827;">Olá, ${firstName}!</p>
            <p style="margin:0 0 24px;font-size:15px;color:#4b5563;line-height:1.6;">
              Recebemos uma solicitação para redefinir a senha da sua conta. Clique no botão abaixo para criar uma nova senha.
            </p>
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:28px;">
              <tr><td align="center">
                <a href="${resetLink}" style="display:inline-block;background:#2a47f5;color:#ffffff;text-decoration:none;font-size:16px;font-weight:700;padding:16px 40px;border-radius:10px;">
                  Redefinir minha senha →
                </a>
              </td></tr>
            </table>
            <div style="background:#fef9ec;border:1px solid #f6d860;border-radius:8px;padding:14px 18px;margin-bottom:24px;">
              <p style="margin:0;font-size:13px;color:#92400e;">⏰ Este link expira em <strong>1 hora</strong>. Após isso, solicite um novo link.</p>
            </div>
            <p style="margin:0 0 6px;font-size:13px;color:#6b7280;">Se não foi você, ignore este e-mail. Sua senha não será alterada.</p>
            <p style="margin:0;font-size:12px;color:#2a47f5;word-break:break-all;">${resetLink}</p>
          </td>
        </tr>
        <tr>
          <td style="background:#f9fafb;border-radius:0 0 12px 12px;padding:20px 40px;border-top:1px solid #e5e7eb;">
            <p style="margin:0;font-size:12px;color:#9ca3af;">© ${new Date().getFullYear()} ${APP_NAME}</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`
}

export async function sendPasswordResetEmail(
  toEmail: string,
  name: string,
  resetLink: string
): Promise<{ sent: boolean; error?: string }> {
  if (!RESEND_API_KEY || RESEND_API_KEY === 'COLOQUE_SUA_CHAVE_RESEND_AQUI') {
    console.warn('[email] RESEND_API_KEY não configurada')
    return { sent: false, error: 'RESEND_API_KEY não configurada' }
  }

  const html = buildPasswordResetHtml(name, resetLink)

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: `${FROM_NAME} <${FROM_EMAIL}>`,
        to: [toEmail],
        subject: `[${APP_NAME}] Redefinição de senha`,
        html,
      }),
    })

    if (!res.ok) {
      const body = await res.json().catch(() => ({}))
      const msg = (body as { message?: string }).message ?? `HTTP ${res.status}`
      return { sent: false, error: msg }
    }

    return { sent: true }
  } catch (err) {
    return { sent: false, error: err instanceof Error ? err.message : String(err) }
  }
}

// ── E-mail do Diagnóstico de Liderança PME ───────────────────────────────────

export async function sendPmeDiagnosticoEmail(opts: {
  toEmail:      string
  donoNome:     string
  empresa:      string
  relatorioUrl: string
  faixaRotulo:  string
  score:        number
  linkLider?:   string | null
}): Promise<{ sent: boolean; error?: string }> {
  if (!RESEND_API_KEY || RESEND_API_KEY === 'COLOQUE_SUA_CHAVE_RESEND_AQUI') {
    console.warn('[email] RESEND_API_KEY não configurada — diagnóstico PME não enviado.')
    return { sent: false, error: 'RESEND_API_KEY não configurada' }
  }

  const firstName = opts.donoNome.split(' ')[0]
  const ganchoLider = opts.linkLider
    ? `<tr><td style="padding:0 32px 24px;">
         <div style="background:#1a2740;border:1px solid rgba(212,175,55,0.3);border-radius:12px;padding:18px;">
           <p style="margin:0 0 8px;color:#d4af37;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:1px;">Libere a análise completa</p>
           <p style="margin:0 0 12px;color:#c4d2e6;font-size:14px;line-height:1.6;">Envie o link abaixo ao seu principal líder. Quando ele responder, o sistema cruza as visões e revela os pontos de atrito da sua gestão.</p>
           <a href="${opts.linkLider}" style="color:#d4af37;font-size:13px;word-break:break-all;">${opts.linkLider}</a>
         </div>
       </td></tr>`
    : ''

  const html = `<!DOCTYPE html>
<html lang="pt-BR"><head><meta charset="UTF-8"/></head>
<body style="margin:0;padding:0;background:#0f1826;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0f1826;padding:32px 16px;">
    <tr><td align="center">
      <table width="100%" style="max-width:560px;background:#131e30;border-radius:16px;overflow:hidden;border:1px solid rgba(212,175,55,0.18);">
        <tr><td style="padding:28px 32px;background:linear-gradient(135deg,#1a2a40,#0f1826);">
          <p style="margin:0 0 6px;color:#d4af37;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:2px;">Diagnóstico de Liderança</p>
          <h1 style="margin:0;color:#e9eef6;font-size:24px;">${opts.empresa}</h1>
        </td></tr>
        <tr><td style="padding:28px 32px 8px;">
          <p style="margin:0 0 14px;color:#c4d2e6;font-size:15px;line-height:1.7;">Olá, ${firstName}. O diagnóstico da sua empresa está pronto.</p>
          <div style="text-align:center;margin:18px 0;">
            <div style="display:inline-block;background:#1a2740;border-radius:12px;padding:18px 28px;">
              <p style="margin:0;color:#d4af37;font-size:40px;font-weight:800;line-height:1;">${opts.score}<span style="font-size:18px;color:#9fb0c8;">/100</span></p>
              <p style="margin:6px 0 0;color:#e9eef6;font-size:14px;font-weight:700;">${opts.faixaRotulo}</p>
            </div>
          </div>
        </td></tr>
        <tr><td style="padding:8px 32px 24px;text-align:center;">
          <a href="${opts.relatorioUrl}" style="display:inline-block;background:#d4af37;color:#0f1826;text-decoration:none;padding:14px 32px;border-radius:99px;font-size:15px;font-weight:700;">Ver meu relatório completo →</a>
        </td></tr>
        ${ganchoLider}
        <tr><td style="padding:16px 32px 28px;border-top:1px solid rgba(255,255,255,0.06);">
          <p style="margin:0;color:#6f819b;font-size:12px;text-align:center;">Gerado por ${APP_NAME}</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: `${FROM_NAME} <${FROM_EMAIL}>`,
        to: [opts.toEmail],
        subject: `${firstName}, seu Diagnóstico de Liderança está pronto (${opts.score}/100)`,
        html,
      }),
    })
    if (!res.ok) {
      const body = await res.json().catch(() => ({}))
      return { sent: false, error: (body as { message?: string }).message ?? `HTTP ${res.status}` }
    }
    return { sent: true }
  } catch (err) {
    return { sent: false, error: err instanceof Error ? err.message : String(err) }
  }
}

// ── E-mail de código de validação de perfil (Gamificação) ────────────────────

function buildProfileValidationCodeHtml(name: string, code: string): string {
  const firstName = name.split(' ')[0]
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head><meta charset="UTF-8"/><title>Seu código de validação — ${APP_NAME}</title></head>
<body style="margin:0;padding:0;background:#faf7f2;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#faf7f2;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;">

        <!-- Header dourado -->
        <tr>
          <td style="background:linear-gradient(135deg,#c9a84c,#d4943a);border-radius:14px 14px 0 0;padding:36px 40px;text-align:center;">
            <div style="font-size:44px;line-height:1;margin-bottom:12px;">🎁</div>
            <h1 style="margin:0;color:#1c1a17;font-size:26px;font-weight:700;letter-spacing:-0.3px;">
              Seu código de validação
            </h1>
            <p style="margin:8px 0 0;color:rgba(28,26,23,0.7);font-size:14px;font-weight:500;">
              Libere +6 créditos extras na plataforma
            </p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="background:#ffffff;padding:40px;">
            <p style="margin:0 0 12px;font-size:20px;font-weight:700;color:#1c1a17;">
              Olá, ${firstName}!
            </p>
            <p style="margin:0 0 28px;font-size:15px;color:#4b5563;line-height:1.65;">
              Você completou seu perfil — parabéns! Use o código abaixo na plataforma
              para liberar <strong>+6 créditos extras</strong> automaticamente.
            </p>

            <!-- Código destacado -->
            <div style="text-align:center;background:linear-gradient(135deg,#f5ede1,#faf0e6);
                        border:2px dashed rgba(196,99,58,0.35);border-radius:14px;
                        padding:28px 20px;margin-bottom:24px;">
              <p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:0.18em;
                        text-transform:uppercase;color:#8f3f1e;">
                Seu código
              </p>
              <p style="margin:0;font-family:'Courier New',monospace;font-size:42px;font-weight:700;
                        letter-spacing:0.3em;color:#a8522e;line-height:1;">
                ${code}
              </p>
            </div>

            <!-- Aviso de validade -->
            <div style="background:#fef9ec;border:1px solid #f6d860;border-radius:8px;
                        padding:14px 18px;margin-bottom:24px;">
              <p style="margin:0;font-size:13px;color:#92400e;line-height:1.5;">
                ⏰ <strong>Válido por 30 minutos.</strong> Após esse prazo, solicite um novo código na página do seu perfil.
              </p>
            </div>

            <!-- Como usar -->
            <div style="border-top:1px solid #e5e7eb;padding-top:24px;">
              <p style="margin:0 0 8px;font-size:13px;font-weight:700;color:#1c1a17;text-transform:uppercase;letter-spacing:0.06em;">
                Como usar:
              </p>
              <ol style="margin:0;padding-left:20px;font-size:13px;color:#4b5563;line-height:1.7;">
                <li>Acesse <strong>Meu Perfil</strong> na plataforma</li>
                <li>Cole o código de 6 dígitos no campo de validação</li>
                <li>Pronto! +6 créditos caem na sua conta na hora</li>
              </ol>
            </div>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f9fafb;border-radius:0 0 14px 14px;padding:20px 40px;border-top:1px solid #e5e7eb;">
            <p style="margin:0;font-size:12px;color:#9ca3af;text-align:center;">
              © ${new Date().getFullYear()} ${APP_NAME} — Se você não solicitou este código, ignore este e-mail.
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body></html>`
}

export async function sendProfileValidationCode(
  toEmail: string,
  name: string,
  code: string
): Promise<{ sent: boolean; error?: string }> {
  if (!RESEND_API_KEY || RESEND_API_KEY === 'COLOQUE_SUA_CHAVE_RESEND_AQUI') {
    console.warn('[email] RESEND_API_KEY não configurada — código não enviado.')
    return { sent: false, error: 'RESEND_API_KEY não configurada' }
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: `${FROM_NAME} <${FROM_EMAIL}>`,
        to: [toEmail],
        subject: `[${APP_NAME}] Seu código de validação: ${code}`,
        html: buildProfileValidationCodeHtml(name, code),
      }),
    })

    if (!res.ok) {
      const body = await res.json().catch(() => ({}))
      const msg = (body as { message?: string }).message ?? `HTTP ${res.status}`
      return { sent: false, error: msg }
    }

    return { sent: true }
  } catch (err) {
    return { sent: false, error: err instanceof Error ? err.message : String(err) }
  }
}

// ── Função principal ──────────────────────────────────────────────────────────

export async function sendAssessmentEmail(
  input: SendAssessmentEmailInput
): Promise<{ sent: boolean; error?: string }> {
  // Se a chave não estiver configurada, loga aviso e retorna sem erro fatal
  if (!RESEND_API_KEY || RESEND_API_KEY === 'COLOQUE_SUA_CHAVE_RESEND_AQUI') {
    console.warn('[email] RESEND_API_KEY não configurada — e-mail não enviado.')
    return { sent: false, error: 'RESEND_API_KEY não configurada' }
  }

  const html    = buildEmailHtml(input)
  const subject = `[${input.companyName}] Sua avaliação ${TEST_LABELS[input.testType] ?? input.testType} está pronta`

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method:  'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type':  'application/json',
      },
      body: JSON.stringify({
        from:    `${FROM_NAME} <${FROM_EMAIL}>`,
        to:      [input.employeeEmail],
        subject,
        html,
      }),
    })

    if (!res.ok) {
      const body = await res.json().catch(() => ({}))
      const msg  = (body as { message?: string }).message ?? `HTTP ${res.status}`
      console.error('[email] Falha no envio:', msg)
      return { sent: false, error: msg }
    }

    console.log(`[email] Enviado para ${input.employeeEmail}`)
    return { sent: true }
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error('[email] Erro de conexão:', msg)
    return { sent: false, error: msg }
  }
}

// ============================================================
// AVALIACAO DE LIDERANCA — convite anonimo ao liderado
// Disparado automaticamente quando o gestor conclui a avaliacao
// 9-box do membro, ou manualmente pela tela de Avaliacao do Lider.
// ============================================================
export async function sendAvaliacaoLiderEmail(opts: {
  toEmail:   string
  nome:      string
  liderNome: string
  teamNome:  string
  token:     string
}): Promise<{ sent: boolean; error?: string }> {
  if (!RESEND_API_KEY || RESEND_API_KEY === 'COLOQUE_SUA_CHAVE_RESEND_AQUI') {
    console.warn('[email] RESEND_API_KEY não configurada — convite de avaliação do líder não enviado.')
    return { sent: false, error: 'RESEND_API_KEY não configurada' }
  }

  const firstName = opts.nome.split(' ')[0]
  const link = `${APP_URL}/avaliar-lider/${opts.token}`

  const html = `<!DOCTYPE html>
<html lang="pt-BR"><head><meta charset="UTF-8"/></head>
<body style="margin:0;padding:0;background:#0f1826;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0f1826;padding:32px 16px;">
    <tr><td align="center">
      <table width="100%" style="max-width:560px;background:#131e30;border-radius:16px;overflow:hidden;border:1px solid rgba(212,175,55,0.18);">
        <tr><td style="padding:28px 32px;background:linear-gradient(135deg,#1a2a40,#0f1826);">
          <p style="margin:0 0 6px;color:#d4af37;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:2px;">Avaliação de Liderança</p>
          <h1 style="margin:0;color:#e9eef6;font-size:22px;">Sua percepção sobre a liderança importa</h1>
        </td></tr>
        <tr><td style="padding:28px 32px 8px;">
          <p style="margin:0 0 14px;color:#c4d2e6;font-size:15px;line-height:1.7;">Olá, ${firstName}. Você foi convidado a avaliar a liderança de <strong style="color:#e9eef6;">${opts.liderNome}</strong> na equipe <strong style="color:#e9eef6;">${opts.teamNome}</strong>.</p>
          <p style="margin:0 0 14px;color:#c4d2e6;font-size:15px;line-height:1.7;">São 15 perguntas rápidas, leva cerca de 5 minutos.</p>
        </td></tr>
        <tr><td style="padding:0 32px 8px;">
          <div style="background:#1a2740;border:1px solid rgba(212,175,55,0.3);border-radius:12px;padding:16px 18px;">
            <p style="margin:0 0 6px;color:#d4af37;font-size:13px;font-weight:700;">🔒 100% anônimo, de verdade</p>
            <p style="margin:0;color:#c4d2e6;font-size:13px;line-height:1.6;">Suas respostas são gravadas sem nenhum vínculo com seu nome ou email. O líder vê apenas o resultado agregado da equipe, e somente quando houver no mínimo 3 respostas. Ninguém consegue saber o que você respondeu.</p>
          </div>
        </td></tr>
        <tr><td style="padding:20px 32px 8px;" align="center">
          <a href="${link}" style="display:inline-block;background:#d4af37;color:#0f1826;font-size:15px;font-weight:700;text-decoration:none;padding:14px 36px;border-radius:10px;">Avaliar agora</a>
        </td></tr>
        <tr><td style="padding:8px 32px 24px;">
          <p style="margin:0;color:#9fb0c8;font-size:12px;line-height:1.6;text-align:center;">Se o botão não funcionar, copie e cole este link no navegador:<br/><a href="${link}" style="color:#d4af37;word-break:break-all;">${link}</a></p>
        </td></tr>
        <tr><td style="padding:16px 32px;background:#0f1826;border-top:1px solid rgba(255,255,255,0.06);">
          <p style="margin:0;color:#5d6f8a;font-size:11px;text-align:center;">${APP_NAME}</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${RESEND_API_KEY}` },
      body: JSON.stringify({
        from: `${FROM_NAME} <${FROM_EMAIL}>`,
        to: [opts.toEmail],
        subject: `Avalie a liderança de ${opts.liderNome} (anônimo, 5 minutos)`,
        html,
      }),
    })
    if (!res.ok) {
      const err = await res.text()
      console.error('[email] Falha ao enviar convite de avaliação do líder:', err)
      return { sent: false, error: err }
    }
    return { sent: true }
  } catch (e) {
    console.error('[email] Erro de rede ao enviar convite de avaliação do líder:', e)
    return { sent: false, error: String(e) }
  }
}

// ============================================================
// NR-1 — convite anonimo ao funcionario (diagnostico psicossocial)
// Disparado na criacao da coleta e ao adicionar convite avulso.
// ============================================================
export async function sendNR1ConviteEmail(opts: {
  toEmail:     string
  nome:        string
  companyNome: string
  coletaNome:  string
  token:       string
}): Promise<{ sent: boolean; error?: string }> {
  if (!RESEND_API_KEY || RESEND_API_KEY === 'COLOQUE_SUA_CHAVE_RESEND_AQUI') {
    console.warn('[email] RESEND_API_KEY não configurada — convite NR-1 não enviado.')
    return { sent: false, error: 'RESEND_API_KEY não configurada' }
  }

  const firstName = opts.nome.split(' ')[0]
  const link = `${APP_URL}/nr1/${opts.token}`

  const html = `<!DOCTYPE html>
<html lang="pt-BR"><head><meta charset="UTF-8"/></head>
<body style="margin:0;padding:0;background:#17181c;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#17181c;padding:32px 16px;">
    <tr><td align="center">
      <table width="100%" style="max-width:560px;background:#1d2026;border-radius:16px;overflow:hidden;border:1px solid rgba(196,99,58,0.25);">
        <tr><td style="padding:28px 32px;background:linear-gradient(135deg,#22252c,#17181c);">
          <p style="margin:0 0 6px;color:#e09070;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:2px;">Diagnóstico Psicossocial NR-1</p>
          <h1 style="margin:0;color:#f0ece3;font-size:22px;">${opts.coletaNome}</h1>
        </td></tr>
        <tr><td style="padding:28px 32px 8px;">
          <p style="margin:0 0 14px;color:#cfc9bd;font-size:15px;line-height:1.7;">Olá, ${firstName}. A empresa <strong style="color:#f0ece3;">${opts.companyNome}</strong> convida você a participar de uma avaliação sobre as condições de trabalho do seu setor, conforme exigência da NR-1.</p>
          <p style="margin:0 0 14px;color:#cfc9bd;font-size:15px;line-height:1.7;">São 3 questionários curtos — leva cerca de <strong style="color:#f0ece3;">10 a 15 minutos</strong>.</p>
        </td></tr>
        <tr><td style="padding:0 32px 8px;">
          <div style="background:#25211d;border:1px solid rgba(196,99,58,0.35);border-radius:12px;padding:16px 18px;">
            <p style="margin:0 0 6px;color:#e09070;font-size:13px;font-weight:700;">🔒 100% anônimo, de verdade</p>
            <p style="margin:0;color:#cfc9bd;font-size:13px;line-height:1.6;">Suas respostas são gravadas sem nenhum vínculo com seu nome ou e-mail. A empresa recebe apenas médias agregadas por setor, e somente quando houver no mínimo 5 respondentes. Ninguém consegue saber o que você respondeu.</p>
          </div>
        </td></tr>
        <tr><td style="padding:20px 32px 8px;" align="center">
          <a href="${link}" style="display:inline-block;background:linear-gradient(135deg,#c4633a,#d4943a);color:#ffffff;font-size:15px;font-weight:700;text-decoration:none;padding:14px 36px;border-radius:999px;">Responder avaliação</a>
        </td></tr>
        <tr><td style="padding:8px 32px 24px;">
          <p style="margin:0;color:#8f887c;font-size:12px;line-height:1.6;text-align:center;">Se o botão não funcionar, copie e cole este link no navegador:<br/><a href="${link}" style="color:#e09070;word-break:break-all;">${link}</a></p>
        </td></tr>
        <tr><td style="padding:16px 32px;background:#17181c;border-top:1px solid rgba(255,255,255,0.06);">
          <p style="margin:0;color:#5d584e;font-size:11px;text-align:center;">${APP_NAME}</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${RESEND_API_KEY}` },
      body: JSON.stringify({
        from: `${FROM_NAME} <${FROM_EMAIL}>`,
        to: [opts.toEmail],
        subject: `${opts.companyNome} convida você: diagnóstico NR-1 (anônimo, 10-15 min)`,
        html,
      }),
    })
    if (!res.ok) {
      const err = await res.text()
      console.error('[email] Falha ao enviar convite NR-1:', err)
      return { sent: false, error: err }
    }
    return { sent: true }
  } catch (e) {
    console.error('[email] Erro de rede ao enviar convite NR-1:', e)
    return { sent: false, error: String(e) }
  }
}


// ============================================================
// AVALIACAO 360 — convite ao avaliador (auto, gestor, par, liderado)
// Disparado na criacao do ciclo e ao adicionar avaliadores.
// ============================================================
export async function sendAvaliacao360ConviteEmail(opts: {
  toEmail:      string
  nome:         string
  avaliadoNome: string
  companyNome:  string
  token:        string
}): Promise<{ sent: boolean; error?: string }> {
  if (!RESEND_API_KEY || RESEND_API_KEY === 'COLOQUE_SUA_CHAVE_RESEND_AQUI') {
    console.warn('[email] RESEND_API_KEY não configurada — convite 360 não enviado.')
    return { sent: false, error: 'RESEND_API_KEY não configurada' }
  }

  const firstName = opts.nome.split(' ')[0]
  const link = `${APP_URL}/avaliacao-360/${opts.token}`

  const html = `<!DOCTYPE html>
<html lang="pt-BR"><head><meta charset="UTF-8"/></head>
<body style="margin:0;padding:0;background:#0f1826;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0f1826;padding:32px 16px;">
    <tr><td align="center">
      <table width="100%" style="max-width:560px;background:#131e30;border-radius:16px;overflow:hidden;border:1px solid rgba(212,175,55,0.18);">
        <tr><td style="padding:28px 32px;background:linear-gradient(135deg,#1a2a40,#0f1826);">
          <p style="margin:0 0 6px;color:#d4af37;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:2px;">Avaliação 360°</p>
          <h1 style="margin:0;color:#e9eef6;font-size:22px;">Sua percepção sobre ${opts.avaliadoNome}</h1>
        </td></tr>
        <tr><td style="padding:28px 32px 8px;">
          <p style="margin:0 0 14px;color:#c4d2e6;font-size:15px;line-height:1.7;">Olá, ${firstName}. A empresa <strong style="color:#e9eef6;">${opts.companyNome}</strong> convida você a participar da avaliação 360° de <strong style="color:#e9eef6;">${opts.avaliadoNome}</strong>.</p>
          <p style="margin:0 0 14px;color:#c4d2e6;font-size:15px;line-height:1.7;">São 24 perguntas rápidas, leva cerca de 10 minutos.</p>
        </td></tr>
        <tr><td style="padding:0 32px 8px;">
          <div style="background:#1a2740;border:1px solid rgba(212,175,55,0.3);border-radius:12px;padding:16px 18px;">
            <p style="margin:0 0 6px;color:#d4af37;font-size:13px;font-weight:700;">🔒 Resposta confidencial</p>
            <p style="margin:0;color:#c4d2e6;font-size:13px;line-height:1.6;">Suas respostas são gravadas sem vínculo com seu nome ou e-mail — apenas o papel (gestor, par, liderado) é registrado. A pessoa avaliada vê somente resultados agregados.</p>
          </div>
        </td></tr>
        <tr><td style="padding:20px 32px 8px;" align="center">
          <a href="${link}" style="display:inline-block;background:#d4af37;color:#0f1826;font-size:15px;font-weight:700;text-decoration:none;padding:14px 36px;border-radius:10px;">Avaliar agora</a>
        </td></tr>
        <tr><td style="padding:8px 32px 24px;">
          <p style="margin:0;color:#9fb0c8;font-size:12px;line-height:1.6;text-align:center;">Se o botão não funcionar, copie e cole este link no navegador:<br/><a href="${link}" style="color:#d4af37;word-break:break-all;">${link}</a></p>
        </td></tr>
        <tr><td style="padding:16px 32px;background:#0f1826;border-top:1px solid rgba(255,255,255,0.06);">
          <p style="margin:0;color:#5d6f8a;font-size:11px;text-align:center;">${APP_NAME}</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${RESEND_API_KEY}` },
      body: JSON.stringify({
        from: `${FROM_NAME} <${FROM_EMAIL}>`,
        to: [opts.toEmail],
        subject: `Avaliação 360° de ${opts.avaliadoNome} (confidencial, 10 minutos)`,
        html,
      }),
    })
    if (!res.ok) {
      const err = await res.text()
      console.error('[email] Falha ao enviar convite 360:', err)
      return { sent: false, error: err }
    }
    return { sent: true }
  } catch (e) {
    console.error('[email] Erro de rede ao enviar convite 360:', e)
    return { sent: false, error: String(e) }
  }
}


// ── E-mails da integração Hotmart ────────────────────────────────────────────

export async function sendHotmartWelcomeEmail(opts: {
  toEmail:     string
  name:        string
  grantLabel:  string
  credits?:    number
  accessLink:  string
  isNewAccount: boolean
}): Promise<{ sent: boolean; error?: string }> {
  if (!RESEND_API_KEY || RESEND_API_KEY === 'COLOQUE_SUA_CHAVE_RESEND_AQUI') {
    console.warn('[email] RESEND_API_KEY não configurada')
    return { sent: false, error: 'RESEND_API_KEY não configurada' }
  }

  const firstName = opts.name.split(' ')[0]
  const creditsLine = opts.credits
    ? `<p style="margin:0 0 16px;font-size:15px;color:#374151;line-height:1.6;"><strong>${opts.credits} créditos</strong> já estão disponíveis no seu saldo para gerar seus relatórios.</p>`
    : ''
  const ctaLabel = opts.isNewAccount ? 'Criar minha senha e acessar' : 'Acessar minha conta'
  const intro = opts.isNewAccount
    ? 'Criamos a sua conta automaticamente com o e-mail da compra. Falta só definir a sua senha:'
    : 'Sua compra já foi creditada na sua conta:'

  const html = `<!DOCTYPE html>
<html lang="pt-BR"><head><meta charset="UTF-8" /></head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f3f4f6;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;">
        <tr><td style="background:#0f172a;padding:28px 40px;">
          <p style="margin:0;font-size:18px;font-weight:700;color:#e8c97a;">${APP_NAME}</p>
        </td></tr>
        <tr><td style="padding:36px 40px;">
          <h1 style="margin:0 0 16px;font-size:22px;color:#111827;">Compra confirmada, ${firstName}! 🎉</h1>
          <p style="margin:0 0 16px;font-size:15px;color:#374151;line-height:1.6;">
            Sua compra de <strong>${opts.grantLabel}</strong> foi aprovada. ${intro}
          </p>
          ${creditsLine}
          <table cellpadding="0" cellspacing="0" border="0" style="margin:24px 0;"><tr><td style="border-radius:10px;background:linear-gradient(135deg,#e8c97a,#c9a84c);">
            <a href="${opts.accessLink}" style="display:inline-block;padding:14px 32px;font-size:15px;font-weight:700;color:#14100a;text-decoration:none;">${ctaLabel} →</a>
          </td></tr></table>
          <p style="margin:0;font-size:13px;color:#6b7280;line-height:1.6;">
            Qualquer dúvida, é só responder este e-mail. Bons insights!
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: `${FROM_NAME} <${FROM_EMAIL}>`,
        to: [opts.toEmail],
        subject: `[${APP_NAME}] Sua compra chegou: ${opts.grantLabel}`,
        html,
      }),
    })
    if (!res.ok) {
      const body = await res.json().catch(() => ({}))
      return { sent: false, error: (body as { message?: string }).message ?? `HTTP ${res.status}` }
    }
    return { sent: true }
  } catch (err) {
    return { sent: false, error: err instanceof Error ? err.message : String(err) }
  }
}

export async function sendHotmartAdminAlert(opts: {
  subject: string
  lines:   string[]
}): Promise<void> {
  if (!RESEND_API_KEY || RESEND_API_KEY === 'COLOQUE_SUA_CHAVE_RESEND_AQUI') return
  // Cai no ADMIN_EMAIL antes do endereço institucional: alerta de venda que
  // nao creditou precisa chegar em quem resolve, nao numa caixa compartilhada.
  const adminEmail =
    process.env.HOTMART_ALERT_EMAIL ?? process.env.ADMIN_EMAIL ?? 'contato@mapacomportamental.com'
  const html = `<p style="font-family:sans-serif;font-size:14px;color:#111;">${opts.lines.join('<br/>')}</p>`
  try {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: `${FROM_NAME} <${FROM_EMAIL}>`,
        to: [adminEmail],
        subject: `[Hotmart] ${opts.subject}`,
        html,
      }),
    })
  } catch (err) {
    console.error('[email] Falha ao enviar alerta Hotmart:', err)
  }
}
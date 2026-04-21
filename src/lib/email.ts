// ============================================================
// Envio de e-mails via Resend REST API (sem SDK)
// Documentação: https://resend.com/docs/api-reference/emails/send-email
// ============================================================

const RESEND_API_KEY = process.env.RESEND_API_KEY
const APP_URL       = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'
const APP_NAME      = process.env.NEXT_PUBLIC_APP_NAME ?? 'Plataforma Comportamental'

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

const TEST_LABELS: Record<string, string> = {
  DISC:        'DISC — Perfil Comportamental',
  MBTI:        'MBTI — 16 Tipos de Personalidade',
  ENNEAGRAM:   'Eneagrama — 9 Tipos',
  TEMPERAMENT: '4 Temperamentos',
}

const TEST_DESCRIPTIONS: Record<string, string> = {
  DISC:        'Identifica seu estilo de comportamento dominante nas dimensões Dominância, Influência, Estabilidade e Cautela.',
  MBTI:        'Mapeia suas preferências cognitivas em 4 dimensões para identificar seu tipo de personalidade entre 16 possíveis.',
  ENNEAGRAM:   'Revela seu padrão motivacional profundo e como ele influencia seus pensamentos, emoções e comportamentos.',
  TEMPERAMENT: 'Descobre seu temperamento predominante entre os 4 tipos clássicos: Colérico, Sanguíneo, Melancólico e Fleumático.',
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

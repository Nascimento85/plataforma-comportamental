// ============================================================
// Envio de e-mails via Resend REST API (sem SDK)
// Documentação: https://resend.com/docs/api-reference/emails/send-email
// ============================================================

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

const TEST_LABELS: Record<string, string> = {
  DISC:               'DISC — Perfil Comportamental',
  MBTI:               'MBTI — 16 Tipos de Personalidade',
  ENNEAGRAM:          'Eneagrama — 9 Tipos',
  TEMPERAMENT:        '4 Temperamentos',
  ARCHETYPE:          'Arquétipos — Os 12 Padrões Universais',
  ARCHETYPE_FEMININE: 'Arquétipos Femininos — As 7 Energias',
}

const TEST_DESCRIPTIONS: Record<string, string> = {
  DISC:               'Identifica seu estilo de comportamento dominante nas dimensões Dominância, Influência, Estabilidade e Cautela.',
  MBTI:               'Mapeia suas preferências cognitivas em 4 dimensões para identificar seu tipo de personalidade entre 16 possíveis.',
  ENNEAGRAM:          'Revela seu padrão motivacional profundo e como ele influencia seus pensamentos, emoções e comportamentos.',
  TEMPERAMENT:        'Descobre seu temperamento predominante entre os 4 tipos clássicos: Colérico, Sanguíneo, Melancólico e Fleumático.',
  ARCHETYPE:          'Baseado na teoria de Carl Jung, identifica seu arquétipo dominante entre 12 padrões universais — revelando como você lidera, decide e se relaciona.',
  ARCHETYPE_FEMININE: 'Identifica qual das 7 energias arquetípicas femininas governa seu momento atual — e qual precisa ser ativada para o seu equilíbrio pleno.',
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

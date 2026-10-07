// ============================================================
// Paleta das telas de entrada · identidade 1b (espresso e terracota)
// ============================================================
// Arquivo neutro (sem JSX, sem 'use client') para que o AuthShell no
// servidor e os formulários no cliente bebam da mesma fonte.
//
// A divisão importa: AMBAR e TERRACOTA nasceram para brilhar sobre o
// espresso do painel esquerdo. Sobre o papel claro do formulário eles
// ficam abaixo de 4.5:1, e é por isso que o lado direito tem tons
// próprios. Texto claro nunca entra no lado do formulário.
// ============================================================

// ── Superfícies ──
export const ESPRESSO   = '#1B1410'  // painel da marca, texto principal
export const ESPRESSO_2 = '#2B2018'  // cartão dentro do painel escuro
export const LINHO      = '#F5ECDD'  // fundo do lado do formulário
export const PAPEL      = '#FDF8EF'  // cartão do formulário
export const TRACO      = '#DCCDB6'  // bordas e divisores

// ── Acentos (sobre espresso) ──
export const AMBAR      = '#E0B368'
export const TERRACOTA  = '#B3663F'

// ── Texto (sobre papel) · contraste medido contra #FDF8EF ──
export const TINTA          = '#4A3A2C'  // 9.0:1 — corpo de apoio
export const TINTA_FRACA    = '#6B5744'  // 6.5:1 — rótulos, legendas, ícones
export const PLACEHOLDER    = '#7C6650'  // 5.1:1 — exemplo dentro do campo
export const TERRACOTA_TXT  = '#9A5230'  // 5.4:1 — links
export const ERRO           = '#9A3412'  // 6.9:1
export const OK             = '#3F6B45'  // 6.0:1

/**
 * Design tokens do sistema Psique / Mapa da Alma
 * Exportados como constantes TypeScript para uso em código (cn, style, etc.)
 */

export const colors = {
  ink:       '#1c1a17',
  cream:     '#faf7f2',
  parchment: '#f5f0e8',
  mist:      '#e8e2d6',

  terracota:      '#c4633a',
  terracotaDark:  '#a8522e',
  terracotaLight: '#d4744a',

  amber:      '#d4943a',
  amberLight: '#e8b860',

  sage:      '#7a9e7e',
  sageLight: '#96bf9a',

  indigo:      '#3d4f7c',
  indigoLight: '#6b7fb8',

  rose:      '#c47a72',
  roseLight: '#d4a0a0',

  gold:      '#c9a84c',
  goldLight: '#e8c878',
} as const

export const gradients = {
  sidebar:  'linear-gradient(180deg, #1c1a17 0%, #221e18 100%)',
  hero:     'linear-gradient(135deg, #1c1a17 0%, #2d2417 50%, #3d2a1c 100%)',
  gold:     'linear-gradient(135deg, #c9a84c, #d4943a)',
  terracota:'linear-gradient(135deg, #c4633a, #d4943a)',
  sage:     'linear-gradient(135deg, #7a9e7e, #96bf9a)',
  indigo:   'linear-gradient(135deg, #3d4f7c, #6b7fb8)',
  rose:     'linear-gradient(135deg, #c47a72, #d4a0a0)',
} as const

export const shadows = {
  sm:    '0 2px 12px rgba(28,26,23,0.07)',
  md:    '0 6px 24px rgba(28,26,23,0.09)',
  lg:    '0 12px 40px rgba(28,26,23,0.12)',
  xl:    '0 20px 60px rgba(28,26,23,0.14)',
  gold:  '0 4px 16px rgba(201,168,76,0.28)',
  terra: '0 6px 18px rgba(196,99,58,0.28)',
} as const

/** Variantes de cor para avatares de candidatos/usuários */
export const avatarPalettes = [
  gradients.rose,
  gradients.indigo,
  gradients.sage,
  'linear-gradient(135deg, #8a7040, #d4943a)',
  'linear-gradient(135deg, #4a2855, #6b3a75)',
  gradients.terracota,
] as const

/** Retorna paleta de avatar baseado em índice */
export function getAvatarPalette(index: number): string {
  return avatarPalettes[index % avatarPalettes.length]
}

/** Arquétipos junguianos — metadados de exibição */
export const archetypes = {
  explorer:  { label: 'O Explorador',  emoji: '🧭', gradient: gradients.hero,    tagline: 'Nunca se contenta com o mapa que já existe.' },
  hero:      { label: 'O Herói',       emoji: '⚡', gradient: gradients.indigo,  tagline: 'Onde há obstáculo, há propósito.' },
  sage:      { label: 'O Sábio',       emoji: '🌿', gradient: gradients.sage,    tagline: 'A verdade liberta — e ela é suficiente.' },
  creator:   { label: 'O Criador',     emoji: '🌱', gradient: 'linear-gradient(135deg,#2d1a35,#4a2255)', tagline: 'Tudo que existe foi imaginado primeiro.' },
  caregiver: { label: 'O Cuidador',    emoji: '💛', gradient: 'linear-gradient(135deg,#35201a,#4a2d22)', tagline: 'Amar é agir pelo outro.' },
  lover:     { label: 'O Amante',      emoji: '🌹', gradient: gradients.rose,    tagline: 'A beleza do mundo é seu território.' },
  jester:    { label: 'O Bobo',        emoji: '🃏', gradient: 'linear-gradient(135deg,#352d1a,#554830)', tagline: 'A leveza é forma de sabedoria.' },
  ruler:     { label: 'O Regente',     emoji: '👑', gradient: 'linear-gradient(135deg,#1a1a35,#282860)', tagline: 'Ordem e excelência acima de tudo.' },
  innocent:  { label: 'O Inocente',    emoji: '🌤', gradient: 'linear-gradient(135deg,#1a2f1a,#213d35)', tagline: 'O paraíso está em cada novo começo.' },
  outlaw:    { label: 'O Fora-da-Lei', emoji: '🔥', gradient: gradients.terracota, tagline: 'Regras existem para ser questionadas.' },
  magician:  { label: 'O Mágico',      emoji: '✨', gradient: 'linear-gradient(135deg,#1a1a2d,#2d2240)', tagline: 'Transformação é o único poder real.' },
  everyman:  { label: 'O Comum',       emoji: '🤝', gradient: 'linear-gradient(135deg,#2a2a2a,#3d3d3d)', tagline: 'Pertencer é uma forma de coragem.' },
} as const

export type ArchetypeKey = keyof typeof archetypes

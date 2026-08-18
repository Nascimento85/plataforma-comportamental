// ============================================================
// /sitemap.xml — rotas públicas que devem ser indexadas
// ============================================================
// Só entra aqui página comercial ou de conteúdo. Devolutiva,
// questionário e coleta ficam de fora (ver public/robots.txt).

import type { MetadataRoute } from 'next'
import { PLAYBOOK_LIST } from '@/content/playbooks'

const BASE = (process.env.NEXT_PUBLIC_APP_URL || 'https://mapacomportamental.com').replace(/\/$/, '')

export default function sitemap(): MetadataRoute.Sitemap {
  const agora = new Date()

  const paginas: Array<{ path: string; priority: number; changeFrequency: 'daily' | 'weekly' | 'monthly' | 'yearly' }> = [
    { path: '/',                      priority: 1.0, changeFrequency: 'weekly'  },
    { path: '/precos',                priority: 0.9, changeFrequency: 'weekly'  },
    { path: '/amor',                  priority: 0.8, changeFrequency: 'monthly' },
    { path: '/empresas',              priority: 0.8, changeFrequency: 'monthly' },
    { path: '/experimente',           priority: 0.6, changeFrequency: 'monthly' },
    { path: '/login',                 priority: 0.3, changeFrequency: 'yearly'  },
    { path: '/register',              priority: 0.5, changeFrequency: 'yearly'  },
    { path: '/politica-de-privacidade', priority: 0.2, changeFrequency: 'yearly' },
    { path: '/politica-de-cookies',   priority: 0.2, changeFrequency: 'yearly'  },
    { path: '/termos-de-uso',         priority: 0.2, changeFrequency: 'yearly'  },
  ]

  const playbooks = PLAYBOOK_LIST.map((p) => ({
    path: `/playbook/${p.slug}`,
    priority: 0.7,
    changeFrequency: 'monthly' as const,
  }))

  return [...paginas, ...playbooks].map((p) => ({
    url: `${BASE}${p.path}`,
    lastModified: agora,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }))
}

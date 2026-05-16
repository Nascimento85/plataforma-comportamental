// ============================================================
// Catalogo de playbooks publicos / gratuitos
// ============================================================

import type { Playbook } from './types'
import { PLAYBOOK_CONTRATACAO } from './contratacao'
import { PLAYBOOK_NR1 } from './nr1'

export const PLAYBOOKS: Record<string, Playbook> = {
  [PLAYBOOK_CONTRATACAO.slug]: PLAYBOOK_CONTRATACAO,
  [PLAYBOOK_NR1.slug]:         PLAYBOOK_NR1,
}

export const PLAYBOOK_LIST = [PLAYBOOK_CONTRATACAO, PLAYBOOK_NR1]

export type { Playbook, Bloco, Secao, BlocoTipo } from './types'

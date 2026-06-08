// ============================================================
// Catalogo de playbooks publicos / gratuitos
// ============================================================

import type { Playbook } from './types'
import { PLAYBOOK_CONTRATACAO } from './contratacao'
import { PLAYBOOK_NR1 } from './nr1'
import { PLAYBOOK_LIDERANCA_CIRURGICA } from './lideranca-cirurgica'
import { PLAYBOOK_TABULEIRO_JUNG } from './tabuleiro-jung'

export const PLAYBOOKS: Record<string, Playbook> = {
  [PLAYBOOK_CONTRATACAO.slug]:         PLAYBOOK_CONTRATACAO,
  [PLAYBOOK_NR1.slug]:                 PLAYBOOK_NR1,
  [PLAYBOOK_LIDERANCA_CIRURGICA.slug]: PLAYBOOK_LIDERANCA_CIRURGICA,
  [PLAYBOOK_TABULEIRO_JUNG.slug]:      PLAYBOOK_TABULEIRO_JUNG,
}

export const PLAYBOOK_LIST = [PLAYBOOK_CONTRATACAO, PLAYBOOK_NR1, PLAYBOOK_LIDERANCA_CIRURGICA, PLAYBOOK_TABULEIRO_JUNG]

export type { Playbook, Bloco, Secao, BlocoTipo } from './types'

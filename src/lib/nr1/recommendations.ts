// ============================================================
// Dicionario de recomendacoes automaticas
// Triggered por combinacoes de risco + (opcional) perfil DISC dominante
// ============================================================

import type { NR1AgregadoSetor, DiscPerfil } from './types'

export interface Recomendacao {
  prioridade: 'ALTA' | 'MEDIA' | 'BAIXA'
  area: string
  acao: string
  porque: string  // referencia ao instrumento + dado
}

export function gerarRecomendacoes(setor: NR1AgregadoSetor): Recomendacao[] {
  const recs: Recomendacao[] = []
  const disc = setor.perfilDiscDominante

  // ---- KARASEK: Alta Tensao ----
  if (setor.karasek.quadranteDominante === 'ALTA_TENSAO' || setor.karasek.risco === 'ALTO') {
    recs.push({
      prioridade: 'ALTA',
      area: 'Carga e Autonomia',
      acao: 'Revisar carga de trabalho e ampliar autonomia decisoria. Implementar rituais de delegacao e clareza de prioridades.',
      porque: `Karasek aponta ${setor.karasek.distribuicao.ALTA_TENSAO}% dos respondentes em Alta Tensao (alta demanda + baixo controle).`,
    })

    if (disc === 'D') {
      recs.push({
        prioridade: 'ALTA',
        area: 'Lideranca + DISC Dominante',
        acao: 'Treinamento de Lideranca Situacional e Comunicacao Assertiva — perfil D tende a impor ritmo sem checar capacidade do time.',
        porque: 'Setor DISC dominante D + Alta Tensao Karasek: combinacao classica de burnout coletivo.',
      })
    }
  }

  // ---- ERI: Desequilibrio ----
  if (setor.eri.risco === 'ALTO' || setor.eri.razaoMedia > 1.0) {
    recs.push({
      prioridade: 'ALTA',
      area: 'Reconhecimento e Recompensa',
      acao: 'Revisar politica de reconhecimento (nao apenas salarial): feedback estruturado, ritos de reconhecimento publico, plano de carreira transparente.',
      porque: `ERI medio do setor = ${setor.eri.razaoMedia.toFixed(2)} (${setor.eri.pctAcimaUm}% acima de 1.0 — esforco supera recompensa).`,
    })
  }

  // ---- COPSOQ por dimensao ----
  for (const d of setor.copsoq.dimensoes) {
    if (d.risco !== 'ALTO') continue
    switch (d.dimensao) {
      case 'DEMANDAS_PSICOLOGICAS':
        recs.push({
          prioridade: 'ALTA',
          area: 'Carga Psicologica',
          acao: 'Mapear picos de demanda, revisar prazos e processos de priorizacao. Considerar redistribuicao temporaria de tarefas.',
          porque: `COPSOQ Demandas Psicologicas = ${d.mediaPontuacao} (alto).`,
        })
        break
      case 'ORGANIZACAO_TRABALHO':
        recs.push({
          prioridade: 'ALTA',
          area: 'Organizacao do Trabalho',
          acao: 'Revisar autonomia, escopo das funcoes e oportunidades de aprendizado. Implementar rituais de cocriacao.',
          porque: `COPSOQ Organizacao do Trabalho = ${d.mediaPontuacao} (baixo recurso — alto risco).`,
        })
        break
      case 'RELACOES_LIDERANCA':
        recs.push({
          prioridade: 'ALTA',
          area: 'Lideranca',
          acao: 'Programa de desenvolvimento de lideranca + feedback 360. Avaliar clareza de papeis e estilo dos gestores diretos.',
          porque: `COPSOQ Relacoes/Lideranca = ${d.mediaPontuacao} (alto risco).`,
        })
        if (disc === 'I') {
          recs.push({
            prioridade: 'MEDIA',
            area: 'Lideranca + DISC I',
            acao: 'Perfil DISC-I dominante exige feedback frequente, espaco para expressao e reconhecimento publico. Adaptar estilo de lideranca.',
            porque: 'Cruzamento DISC-I + Relacoes/Lideranca baixa.',
          })
        }
        break
      case 'INTERFACE_TRABALHO_FAMILIA':
        recs.push({
          prioridade: 'MEDIA',
          area: 'Equilibrio Vida-Trabalho',
          acao: 'Avaliar carga horaria efetiva, flexibilidade e politica de desconexao apos expediente. Revisar uso de canais fora do horario.',
          porque: `COPSOQ Interface Trabalho-Familia = ${d.mediaPontuacao}.`,
        })
        if (disc === 'S') {
          recs.push({
            prioridade: 'MEDIA',
            area: 'Estabilidade + DISC S',
            acao: 'Perfil DISC-S sofre mais com imprevisibilidade. Comunicar mudancas com antecedencia, oferecer rotinas previsiveis.',
            porque: 'Cruzamento DISC-S + Interface T-F desbalanceada.',
          })
        }
        break
      case 'SAUDE_BEM_ESTAR':
        recs.push({
          prioridade: 'ALTA',
          area: 'Saude e Bem-Estar',
          acao: 'Acionar PCMSO + PCSO. Considerar acompanhamento psicossocial coletivo e revisao ergonomica.',
          porque: `COPSOQ Saude e Bem-Estar = ${d.mediaPontuacao} (autoavaliacao critica).`,
        })
        break
      case 'COMPORTAMENTOS_OFENSIVOS':
        recs.push({
          prioridade: 'ALTA',
          area: 'Comportamentos Ofensivos',
          acao: 'Acionar canal de denuncia + politica de tolerancia zero. Treinamento obrigatorio em prevencao de assedio e violencia.',
          porque: `COPSOQ Comportamentos Ofensivos = ${d.mediaPontuacao} (presenca relatada).`,
        })
        break
    }
  }

  // ---- Cruzamento DISC + Demandas (perfil C com excesso de detalhamento) ----
  if (disc === 'C' && setor.copsoq.dimensoes.find(d => d.dimensao === 'DEMANDAS_PSICOLOGICAS' && d.risco === 'ALTO')) {
    recs.push({
      prioridade: 'MEDIA',
      area: 'Detalhismo + DISC C',
      acao: 'Perfil DISC-C dominante + alta demanda: risco de burnout por excesso de detalhamento sob pressao. Definir niveis aceitaveis de qualidade vs prazo.',
      porque: 'Cruzamento DISC-C + Demandas Psicologicas altas.',
    })
  }

  return recs
}

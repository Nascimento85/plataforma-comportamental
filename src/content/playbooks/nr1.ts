import type { Playbook } from './types'

export const PLAYBOOK_NR1: Playbook = {
  slug: 'nr1-blindagem-psicossocial',
  titulo: 'Playbook NR-1: Blindagem Psicossocial',
  subtitulo: 'Guia de conformidade, gestão de riscos emocionais e proteção jurídica para PMEs',
  badge: 'Gratuito · NR-1',

  abertura:
    'O jogo mudou. Se antes a fiscalização do Ministério do Trabalho e Emprego focava apenas em capacetes, botas, extintores e fiação elétrica, hoje o maior gargalo (e o maior risco de processos) está no que ninguém vê: a saúde mental dos colaboradores. A NR-1 (Norma Regulamentadora nº 1) é a "norma mãe" da legislação trabalhista e, com suas atualizações recentes, ela exige que toda empresa — independentemente do tamanho — gerencie ativamente os Riscos Psicossociais. Ignorar a mente do trabalhador agora não é apenas um problema de gestão; é uma infração legal gravíssima que pode quebrar uma pequena ou média empresa.',

  secoes: [
    {
      numero: '1.',
      titulo: 'O Que São Riscos Psicossociais? (O Inimigo Invisível)',
      blocos: [
        { tipo: 'paragrafo',
          conteudo: 'São todos os fatores do ambiente de trabalho que provocam o adoecimento mental, emocional e comportamental do colaborador.' },
        { tipo: 'subtitulo', titulo: 'Exemplos práticos do que a lei agora fiscaliza' },
        { tipo: 'lista', itens: [
          'Ambiente de trabalho rígido — cobranças desproporcionais e metas inalcançáveis.',
          'Liderança abusiva — gestores que gritam, humilham ou usam pressão psicológica destrutiva.',
          'Falta de previsibilidade comportamental — colocar uma pessoa com perfil altamente sensível sob forte pressão de cobrança (incompatibilidade de cargo).',
          'Cultura tóxica — conflitos constantes entre equipes por falta de alinhamento comportamental.',
        ]},
        { tipo: 'callout', variante: 'alerta', titulo: 'Fato Científico e Jurídico',
          conteudo: 'O Burnout, a Ansiedade e a Depressão são as principais causas de afastamentos pelo INSS no Brasil. Quando o colaborador se afasta por nexo causal (causado pelo trabalho), a empresa entra na mira da Justiça do Trabalho.' },
      ],
    },
    {
      numero: '2.',
      titulo: 'A Obrigação Legal da Sua Empresa',
      blocos: [
        { tipo: 'paragrafo',
          conteudo: 'Para estar em conformidade com o PGR (Programa de Gerenciamento de Riscos) exigido pela NR-1, o empresário não pode mais dar a desculpa de que "aqui todo mundo é uma família". A lei exige dados. Você precisa cumprir o ciclo completo:' },
        { tipo: 'lista', itens: [
          'Identificar os riscos — mapear quais setores ou funções têm maior probabilidade de sofrer estresse crônico ou exaustão.',
          'Avaliar e mensurar — ter relatórios claros que demonstrem o nível de estabilidade emocional, tolerância à pressão e o clima da organização.',
          'Implementar ações preventivas — usar inteligência de dados para reorganizar processos, treinar líderes e encaixar os perfis certos nas funções certas.',
          'Documentar e registrar — guardar evidências sólidas de que a empresa monitora a saúde psicossocial do time. No direito do trabalho, o que não está documentado simplesmente não existe.',
        ]},
      ],
    },
    {
      numero: '3.',
      titulo: 'Omitir-se Custa Caro: As 4 Sanções Reais',
      blocos: [
        { tipo: 'paragrafo',
          conteudo: 'Empresas que não aplicam avaliações preventivas e não monitoram o comportamento interno ficam expostas a:' },
        { tipo: 'subtitulo', titulo: '1. Multas administrativas pesadas' },
        { tipo: 'paragrafo',
          conteudo: 'Aplicadas diretamente por auditores-fiscais do trabalho durante inspeções ou após denúncias anônimas. Os valores escalam por CPF registrado.' },
        { tipo: 'subtitulo', titulo: '2. Processos trabalhistas inversíveis' },
        { tipo: 'paragrafo',
          conteudo: 'Se um colaborador desenvolver Burnout e processar a empresa alegando ambiente tóxico ou assédio de liderança, a Justiça do Trabalho aplicará a inversão do ônus da prova. Ou seja: é a sua empresa que precisa provar que tomou medidas preventivas.' },
        { tipo: 'subtitulo', titulo: '3. Indenizações por danos morais e existenciais' },
        { tipo: 'paragrafo',
          conteudo: 'Juízes estão estipulando indenizações severas contra PMEs para cobrir tratamentos psiquiátricos, períodos de estabilidade provisória e danos à vida pessoal do trabalhador adoecido.' },
        { tipo: 'subtitulo', titulo: '4. Explosão de passivos ocultos' },
        { tipo: 'paragrafo',
          conteudo: 'O adoecimento gera efeito dominó: aumento absurdo de turnover (rotatividade), faltas constantes (absenteísmo), retrabalho por falta de atenção e queda drástica no faturamento.' },
      ],
    },
    {
      numero: '4.',
      titulo: 'Como Nossa Plataforma Resolve Esse Problema',
      blocos: [
        { tipo: 'paragrafo',
          conteudo: 'Você não precisa contratar um departamento inteiro de psicologia ou engenharia de segurança do trabalho para começar a se proteger hoje. A plataforma Psique funciona como um escudo preventivo digital.' },
        { tipo: 'subtitulo', titulo: 'O que entregamos para a blindagem da sua PME' },
        { tipo: 'lista', itens: [
          'Mapeamento psicossocial de risco — testes rápidos e científicos (Karasek, ERI, COPSOQ II) que detectam níveis de exaustão, estresse e tolerância à pressão de cada setor, com anonimato blindado conforme LGPD e CFP.',
          'Engenharia de perfil (DISC, MBTI, Eneagrama, Temperamentos, Arquétipos) — garantia de que você não vai colocar um perfil S (Estável) para sofrer agressividade em vendas, nem um I (Influente) disperso no rigor do financeiro.',
          'Dashboard gerencial — visão de satélite para o dono identificar qual setor está em "zona de alerta emocional" e qual gestor precisa de intervenção de liderança.',
          'Relatórios e evidências — exportação de dados consolidados periódicos para anexar ao seu PGR, provando para qualquer auditor que a empresa atua de forma estrita na prevenção.',
        ]},
        { tipo: 'callout', variante: 'info', titulo: 'Nota Importante de Posicionamento',
          conteudo: 'A plataforma não emite laudos clínicos ou diagnósticos médicos (atribuição de psiquiatras). Ela atua na camada de gestão preditiva e preventiva corporativa, blindando legalmente o empresário com documentação técnica adequada à NR-1.' },
      ],
    },
    {
      numero: '5.',
      titulo: 'Os 4 Erros Críticos dos Empresários com a NR-1',
      blocos: [
        { tipo: 'subtitulo', titulo: 'Erro 1 — Esperar o processo chegar para agir' },
        { tipo: 'paragrafo',
          conteudo: 'Remediar um processo trabalhista de Burnout custa 50 vezes mais caro do que contratar uma plataforma de prevenção anual.' },
        { tipo: 'subtitulo', titulo: 'Erro 2 — Achar que tamanho da empresa protege' },
        { tipo: 'paragrafo',
          conteudo: '"Minha empresa só tem 10 funcionários, a fiscalização não liga." Mentira. O risco de processo e denúncia em empresas menores é altíssimo, justamente pelo contato direto entre liderança e operação.' },
        { tipo: 'subtitulo', titulo: 'Erro 3 — Confundir clima com "festa"' },
        { tipo: 'paragrafo',
          conteudo: 'Fazer happy hour ou ter uma mesa de ping-pong não cumpre a NR-1. O que cumpre a norma é a ciência do comportamento aplicada, mitigando o estresse e organizando a cultura com base em dados.' },
        { tipo: 'subtitulo', titulo: 'Erro 4 — Não documentar ações' },
        { tipo: 'paragrafo',
          conteudo: 'Falar que orienta o time de boca não tem valor legal. A lei exige relatórios digitais, históricos de testes e métricas palpáveis.' },
      ],
    },
    {
      numero: '6.',
      titulo: 'Frases que Ativam o Senso de Urgência',
      blocos: [
        { tipo: 'callout', variante: 'info', titulo: 'Use no seu pitch comercial',
          conteudo: '"O colaborador adoece emocionalmente primeiro em silêncio. O processo trabalhista ou o afastamento pelo INSS aparecem depois, quando a conta já está alta."' },
        { tipo: 'callout', variante: 'info', titulo: 'Posicionamento legal',
          conteudo: '"A NR-1 não é opcional e não é apenas burocracia. É a métrica oficial que separa empresas profissionais de negócios amadores que estão prestes a ser multados."' },
        { tipo: 'callout', variante: 'info', titulo: 'Síntese estratégica',
          conteudo: '"Quem gerencia comportamento evita conflito. Quem evita conflito mata o passivo trabalhista na raiz."' },
      ],
    },
  ],

  fechamento: [
    { tipo: 'subtitulo', titulo: 'Como começar agora' },
    { tipo: 'paragrafo',
      conteudo: 'O módulo NR-1 Psicossocial da plataforma Psique aplica os 3 instrumentos clássicos validados internacionalmente (Karasek JCQ, ERI Esforço-Recompensa e COPSOQ II Versão Média) com anonimato total por design. O dashboard mostra a taxa de adesão por setor (GHE), e o relatório executivo é liberado apenas quando o setor atinge o mínimo de 5 respondentes — proteção contra dedução por exclusão. Tudo cruzado com o perfil DISC dominante do setor para gerar recomendações personalizadas.' },
    { tipo: 'callout', variante: 'sucesso', titulo: 'Pronto para blindar sua empresa?',
      conteudo: 'Cadastre-se gratuitamente e ganhe 10 créditos no onboarding para começar a aplicar testes comportamentais e gerar seu primeiro diagnóstico NR-1.' },
  ],
}

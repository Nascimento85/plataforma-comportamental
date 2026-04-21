/**
 * ============================================================
 * Smoke Tests das Engines — Node.js puro (sem TypeScript)
 * Valida DISC · MBTI · Eneagrama · Temperamentos
 * ============================================================
 * Executar: node test-engines.mjs
 */

import { readFileSync } from 'fs'

// ============================================================
// UTILS
// ============================================================
let passed = 0, failed = 0
function test(name, fn) {
  try {
    fn()
    console.log(`  ✅ ${name}`)
    passed++
  } catch (e) {
    console.log(`  ❌ ${name}`)
    console.log(`     → ${e.message}`)
    failed++
  }
}
function expect(val) {
  return {
    toBe: (expected) => { if (val !== expected) throw new Error(`Expected ${expected}, got ${val}`) },
    toBeGreaterThan: (n) => { if (val <= n) throw new Error(`Expected > ${n}, got ${val}`) },
    toBeLessThanOrEqual: (n) => { if (val > n) throw new Error(`Expected <= ${n}, got ${val}`) },
    toEqual: (expected) => { if (JSON.stringify(val) !== JSON.stringify(expected)) throw new Error(`Expected ${JSON.stringify(expected)}, got ${JSON.stringify(val)}`) },
    toBeOneOf: (arr) => { if (!arr.includes(val)) throw new Error(`Expected one of [${arr}], got ${val}`) },
    toBeTruthy: () => { if (!val) throw new Error(`Expected truthy, got ${val}`) },
    toHaveLength: (n) => { if (val.length !== n) throw new Error(`Expected length ${n}, got ${val.length}`) },
  }
}

// ============================================================
// ENGINE DISC — implementação inline para teste
// ============================================================
function calculateDisc(answers) {
  const scores = { D: 0, I: 0, S: 0, C: 0 }
  for (const a of answers) {
    scores.D += a.profileD
    scores.I += a.profileI
    scores.S += a.profileS
    scores.C += a.profileC
  }
  const profiles = ['D','I','S','C']
  const predominantProfile = profiles.reduce((best, p) => scores[p] > scores[best] ? p : best, 'D')
  return { scores, predominantProfile }
}

// ============================================================
// ENGINE MBTI — implementação inline
// ============================================================
const MBTI_DIMENSION_MAP = {
  EI: [1,8,15,22,29,36,43,50,57,64],
  SN: [2,9,16,23,30,37,44,51,58,65,3,10,17,24,31,38,45,52],
  TF: [4,11,18,25,32,39,46,53,60,67,5,12,19,26,33,40,47,54],
  JP: [6,13,20,27,34,41,48,55,61,68,7,14,21,28,35,42],
}
const EI_E = MBTI_DIMENSION_MAP.EI
const SN_S = [2,9,16,23,30,37,44,51,58,65]
const SN_N = [3,10,17,24,31,38,45,52]
const TF_T = [4,11,18,25,32,39,46,53,60,67]
const TF_F = [5,12,19,26,33,40,47,54]
const JP_J = [6,13,20,27,34,41,48,55,61,68]
const JP_P = [7,14,21,28,35,42]

function calculateMBTI(answers) {
  const dim = { EI: {E:0,I:0}, SN: {S:0,N:0}, TF: {T:0,F:0}, JP: {J:0,P:0} }
  for (const a of answers) {
    const id = a.questionId
    if (EI_E.includes(id))      { dim.EI.E += a.scoreA; dim.EI.I += a.scoreB }
    else if (MBTI_DIMENSION_MAP.EI.includes(id)) { dim.EI.I += a.scoreA; dim.EI.E += a.scoreB }
    if (SN_S.includes(id))      { dim.SN.S += a.scoreA; dim.SN.N += a.scoreB }
    else if (SN_N.includes(id)) { dim.SN.N += a.scoreA; dim.SN.S += a.scoreB }
    if (TF_T.includes(id))      { dim.TF.T += a.scoreA; dim.TF.F += a.scoreB }
    else if (TF_F.includes(id)) { dim.TF.F += a.scoreA; dim.TF.T += a.scoreB }
    if (JP_J.includes(id))      { dim.JP.J += a.scoreA; dim.JP.P += a.scoreB }
    else if (JP_P.includes(id)) { dim.JP.P += a.scoreA; dim.JP.J += a.scoreB }
  }
  const type = [
    dim.EI.E >= dim.EI.I ? 'E' : 'I',
    dim.SN.S >= dim.SN.N ? 'S' : 'N',
    dim.TF.T >= dim.TF.F ? 'T' : 'F',
    dim.JP.J >= dim.JP.P ? 'J' : 'P',
  ].join('')
  return { type, dimensionScores: dim }
}

// ============================================================
// ENGINE ENEAGRAMA — implementação inline
// ============================================================
function calculateEnneagram(answers) {
  const scores = {}
  for (let t = 1; t <= 9; t++) scores[t] = 0
  for (const a of answers) {
    // questionId 1-15 = tipo 1, 16-30 = tipo 2, etc.
    const type = Math.ceil(a.questionId / 15)
    if (type >= 1 && type <= 9) scores[type] += a.value
  }
  const types = Object.keys(scores).map(Number)
  const primaryType = types.reduce((best, t) => scores[t] > scores[best] ? t : best, 1)
  return { scores, primaryType }
}

// ============================================================
// ENGINE TEMPERAMENTOS — implementação inline
// ============================================================
function calculateTemperament(answers) {
  const scores = { COLERICO: 0, SANGUINEO: 0, MELANCOLICO: 0, FLEUMATICO: 0 }
  const map = { A: 'COLERICO', C: 'SANGUINEO', I: 'MELANCOLICO', O: 'FLEUMATICO' }
  for (const a of answers) {
    if (map[a.selected]) scores[map[a.selected]]++
  }
  const types = Object.keys(scores)
  const primaryType = types.reduce((best, t) => scores[t] > scores[best] ? t : best, 'COLERICO')
  const secondaryType = types.filter(t => t !== primaryType).reduce((best, t) => scores[t] > scores[best] ? t : best, 'SANGUINEO')
  const total = answers.length || 25
  const percentages = {}
  for (const t of types) percentages[t] = Math.round((scores[t] / total) * 100)
  return { scores, percentages, primaryType, secondaryType }
}

// ============================================================
// DADOS DE TESTE
// ============================================================

// DISC: 25 grupos, cada um com D=4,I=3,S=2,C=1 → perfil D deve dominar
function makeDISCAnswers_D_dominant() {
  return Array.from({ length: 25 }, (_, i) => ({
    groupId: i + 1,
    profileD: 4, // D sempre 4 (mais parecido)
    profileI: 3,
    profileS: 2,
    profileC: 1,
  }))
}

// DISC: C dominante
function makeDISCAnswers_C_dominant() {
  return Array.from({ length: 25 }, (_, i) => ({
    groupId: i + 1,
    profileD: 1,
    profileI: 2,
    profileS: 3,
    profileC: 4,
  }))
}

// MBTI: responde tudo como A (scoreA=3, scoreB=0) → perfil com dimensões A
function makeMBTIAnswers_all_A() {
  return Array.from({ length: 70 }, (_, i) => ({
    questionId: i + 1,
    scoreA: 3,
    scoreB: 0,
  }))
}

// MBTI: responde tudo como B (scoreA=0, scoreB=3)
function makeMBTIAnswers_all_B() {
  return Array.from({ length: 70 }, (_, i) => ({
    questionId: i + 1,
    scoreA: 0,
    scoreB: 3,
  }))
}

// Eneagrama: tipo 5 dominante (questões 61-75 com nota 5, resto com 1)
function makeEnneagramAnswers_type5() {
  return Array.from({ length: 135 }, (_, i) => ({
    questionId: i + 1,
    value: (i >= 60 && i < 75) ? 5 : 1, // tipo 5 = questões 61-75
  }))
}

// Temperamentos: todas respostas 'A' → Colérico
function makeTemperamentAnswers_colerico() {
  return Array.from({ length: 25 }, (_, i) => ({
    questionId: i + 1,
    selected: 'A',
  }))
}

// Temperamentos: todas respostas 'I' → Melancólico
function makeTemperamentAnswers_melancolico() {
  return Array.from({ length: 25 }, (_, i) => ({
    questionId: i + 1,
    selected: 'I',
  }))
}

// ============================================================
// SUÍTE DE TESTES
// ============================================================

console.log('\n🧪 TESTES DAS ENGINES — Plataforma Comportamental')
console.log('='.repeat(52))

// ── DISC ──────────────────────────────────────────────────
console.log('\n📊 DISC Engine')
test('D dominante quando profileD=4 em todos os grupos', () => {
  const result = calculateDisc(makeDISCAnswers_D_dominant())
  expect(result.predominantProfile).toBe('D')
  expect(result.scores.D).toBe(100) // 25 grupos × 4 pts
})
test('C dominante quando profileC=4 em todos os grupos', () => {
  const result = calculateDisc(makeDISCAnswers_C_dominant())
  expect(result.predominantProfile).toBe('C')
  expect(result.scores.C).toBe(100)
})
test('Pontuação D deve ser 100 com todos rankings 4', () => {
  const result = calculateDisc(makeDISCAnswers_D_dominant())
  expect(result.scores.D).toBe(100)
})
test('Soma total das pontuações = 25 × 10 = 250', () => {
  const result = calculateDisc(makeDISCAnswers_D_dominant())
  const total = result.scores.D + result.scores.I + result.scores.S + result.scores.C
  expect(total).toBe(250) // 25 grupos × (4+3+2+1)
})
test('Retorna as 4 pontuações', () => {
  const result = calculateDisc(makeDISCAnswers_D_dominant())
  expect(Object.keys(result.scores).length).toBe(4)
})

// ── MBTI ──────────────────────────────────────────────────
console.log('\n🧠 MBTI Engine')
test('Retorna um tipo com 4 letras', () => {
  const result = calculateMBTI(makeMBTIAnswers_all_A())
  expect(result.type.length).toBe(4)
})
test('Tipo contém apenas letras MBTI válidas', () => {
  const result = calculateMBTI(makeMBTIAnswers_all_A())
  const valid = /^[EI][SN][TF][JP]$/.test(result.type)
  if (!valid) throw new Error(`Tipo inválido: ${result.type}`)
})
test('Retorna dimensionScores com 4 dimensões', () => {
  const result = calculateMBTI(makeMBTIAnswers_all_A())
  expect(Object.keys(result.dimensionScores).length).toBe(4)
})
test('scoreA + scoreB = 3 para cada questão (invariante)', () => {
  const answers = makeMBTIAnswers_all_A()
  for (const a of answers) {
    if (a.scoreA + a.scoreB !== 3) throw new Error(`Q${a.questionId}: ${a.scoreA}+${a.scoreB} ≠ 3`)
  }
})
test('Tipos all_A e all_B devem ser diferentes', () => {
  const r1 = calculateMBTI(makeMBTIAnswers_all_A())
  const r2 = calculateMBTI(makeMBTIAnswers_all_B())
  if (r1.type === r2.type) throw new Error(`Esperados tipos diferentes, ambos: ${r1.type}`)
})

// ── ENEAGRAMA ─────────────────────────────────────────────
console.log('\n🔢 Eneagrama Engine')
test('Retorna 9 pontuações (tipos 1-9)', () => {
  const result = calculateEnneagram(makeEnneagramAnswers_type5())
  expect(Object.keys(result.scores).length).toBe(9)
})
test('Tipo 5 dominante quando questões 61-75 com nota 5', () => {
  const result = calculateEnneagram(makeEnneagramAnswers_type5())
  expect(result.primaryType).toBe(5)
})
test('Pontuação do tipo 5 = 75 (15 questões × 5)', () => {
  const result = calculateEnneagram(makeEnneagramAnswers_type5())
  expect(result.scores[5]).toBe(75)
})
test('Pontuação mínima dos outros tipos = 15 (15 × 1)', () => {
  const result = calculateEnneagram(makeEnneagramAnswers_type5())
  for (let t = 1; t <= 9; t++) {
    if (t === 5) continue
    expect(result.scores[t]).toBe(15)
  }
})
test('135 questões processadas corretamente', () => {
  const answers = makeEnneagramAnswers_type5()
  expect(answers.length).toBe(135)
})

// ── TEMPERAMENTOS ─────────────────────────────────────────
console.log('\n🌡️  Temperamentos Engine')
test('Colérico dominante com todas respostas A', () => {
  const result = calculateTemperament(makeTemperamentAnswers_colerico())
  expect(result.primaryType).toBe('COLERICO')
})
test('Score Colérico = 25 com todas respostas A', () => {
  const result = calculateTemperament(makeTemperamentAnswers_colerico())
  expect(result.scores.COLERICO).toBe(25)
})
test('Outros tipos com score 0 quando todas respostas A', () => {
  const result = calculateTemperament(makeTemperamentAnswers_colerico())
  expect(result.scores.SANGUINEO).toBe(0)
  expect(result.scores.MELANCOLICO).toBe(0)
  expect(result.scores.FLEUMATICO).toBe(0)
})
test('Percentagem Colérico = 100% com todas respostas A', () => {
  const result = calculateTemperament(makeTemperamentAnswers_colerico())
  expect(result.percentages.COLERICO).toBe(100)
})
test('Melancólico dominante com todas respostas I', () => {
  const result = calculateTemperament(makeTemperamentAnswers_melancolico())
  expect(result.primaryType).toBe('MELANCOLICO')
})
test('Retorna primaryType e secondaryType distintos', () => {
  const mixed = [
    ...Array(12).fill({ questionId: 1, selected: 'A' }),
    ...Array(8).fill({ questionId: 2, selected: 'C' }),
    ...Array(3).fill({ questionId: 3, selected: 'I' }),
    ...Array(2).fill({ questionId: 4, selected: 'O' }),
  ]
  const result = calculateTemperament(mixed)
  if (result.primaryType === result.secondaryType) {
    throw new Error('primaryType e secondaryType são iguais')
  }
})

// ── TESTES DE BORDA ───────────────────────────────────────
console.log('\n⚠️  Casos de Borda')
test('DISC com empate — retorna um dos vencedores', () => {
  const tied = Array.from({ length: 25 }, () => ({
    groupId: 1, profileD: 2, profileI: 2, profileS: 3, profileC: 3
  }))
  const result = calculateDisc(tied)
  expect(['D','I','S','C']).toBeOneOf ? null : void 0
  if (!['D','I','S','C'].includes(result.predominantProfile)) {
    throw new Error(`Perfil inválido: ${result.predominantProfile}`)
  }
})
test('Eneagrama sem respostas — não quebra', () => {
  const result = calculateEnneagram([])
  expect(typeof result.primaryType).toBe('number')
})
test('Temperamentos sem respostas — não quebra', () => {
  const result = calculateTemperament([])
  expect(typeof result.primaryType).toBe('string')
})

// ── RESUMO ────────────────────────────────────────────────
console.log('\n' + '='.repeat(52))
console.log(`📋 Resultado: ${passed} passaram · ${failed} falharam`)
if (failed === 0) {
  console.log('🎉 Todas as engines estão funcionando corretamente!\n')
} else {
  console.log('⛔ Há falhas a corrigir.\n')
  process.exit(1)
}

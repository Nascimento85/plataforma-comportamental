/**
 * ============================================================
 * Casamento de telefone entre degustação e compra na Hotmart
 * ============================================================
 * Esta regra decide se o resultado de um teste íntimo vai para a conta
 * de alguém. Um falso positivo aqui entrega o resultado de uma pessoa
 * para outra, então ela merece teste próprio.
 *
 * Executar: node tests/test-telefone.mjs
 *
 * A lógica é copiada de src/lib/hotmart-vinculo.ts. Se mudar lá, mude
 * aqui: o projeto não tem runner de TypeScript nos testes.
 * ============================================================
 */

let passed = 0, failed = 0
function test(nome, fn) {
  try { fn(); console.log(`  ✅ ${nome}`); passed++ }
  catch (e) { console.log(`  ❌ ${nome}`); console.log(`     → ${e.message}`); failed++ }
}
function expect(val) {
  return {
    toBe: (esperado) => { if (val !== esperado) throw new Error(`Esperava ${esperado}, veio ${val}`) },
  }
}

// ── cópia da regra ────────────────────────────────────────
function chavesTelefone(bruto) {
  let d = (bruto ?? '').replace(/\D+/g, '')
  if ((d.length === 12 || d.length === 13) && d.startsWith('55')) d = d.slice(2)
  if (d.length < 10 || d.length > 11) return []
  const ddd = d.slice(0, 2)
  const numero = d.slice(2)
  const chaves = new Set([ddd + numero])
  if (numero.length === 9 && numero.startsWith('9')) chaves.add(ddd + numero.slice(1))
  if (numero.length === 8) chaves.add(ddd + '9' + numero)
  return [...chaves]
}
function mesmoTelefone(a, b) {
  const ca = chavesTelefone(a)
  if (!ca.length) return false
  const cb = new Set(chavesTelefone(b))
  return ca.some((k) => cb.has(k))
}

console.log('\n📞 Casamento de telefone\n')

test('mesmo número, formatos diferentes', () => {
  expect(mesmoTelefone('31989835115', '+55 (31) 98983-5115')).toBe(true)
})
test('com e sem código do país', () => {
  expect(mesmoTelefone('31989835115', '5531989835115')).toBe(true)
})
test('celular com e sem o nono dígito', () => {
  expect(mesmoTelefone('31989835115', '3189835115')).toBe(true)
})
test('DDD diferente com o mesmo número NÃO casa', () => {
  expect(mesmoTelefone('31989835115', '41989835115')).toBe(false)
})
test('números realmente diferentes não casam', () => {
  expect(mesmoTelefone('31989835115', '3138835115')).toBe(false)
})
test('telefone curto demais não casa com nada', () => {
  expect(mesmoTelefone('31989835115', '98983')).toBe(false)
})
test('vazio não casa com nada', () => {
  expect(mesmoTelefone('31989835115', '')).toBe(false)
})
test('vazio dos dois lados não casa', () => {
  expect(mesmoTelefone('', '')).toBe(false)
})

console.log('\n' + '='.repeat(52))
console.log(`📋 Resultado: ${passed} passaram · ${failed} falharam`)
if (failed > 0) { console.log('⛔ Há falhas a corrigir.\n'); process.exit(1) }
console.log('🎉 Regra de casamento de telefone íntegra.\n')

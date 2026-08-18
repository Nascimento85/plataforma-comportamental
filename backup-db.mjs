// ============================================================
// backup-db.mjs — dump completo do banco de producao em JSON
// ============================================================
// O Supabase esta no plano gratuito: sem backup diario e sem PITR. Este
// script existe para o banco nao ser o unico ativo do projeto sem copia.
//
//   node backup-db.mjs                 → salva em ~/backups-mapacomportamental
//   node backup-db.mjs C:\algum\lugar  → salva na pasta indicada
//
// A DATABASE_URL vem, nesta ordem: variavel de ambiente ja definida, ou o
// painel do Railway (usando o login do CLI). Nada de senha em arquivo.

import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

const PROJ = 'ffe05b59-e0e1-4e52-92da-4dfb438ad6c3' // comfortable-light
const SVC  = 'f2af33a4-8927-4b8b-bb18-97819ff50790' // plataforma-comportamental
const ENV  = '79d7782c-c353-4df5-af32-5598b1d81042' // production

async function urlDoRailway() {
  const cfgPath = path.join(os.homedir(), '.railway', 'config.json')
  if (!fs.existsSync(cfgPath)) return null
  const token = JSON.parse(fs.readFileSync(cfgPath, 'utf8'))?.user?.accessToken
  if (!token) return null

  const r = await fetch('https://backboard.railway.com/graphql/v2', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({
      query: `query($pid:String!,$sid:String!,$eid:String!){variables(projectId:$pid,serviceId:$sid,environmentId:$eid)}`,
      variables: { pid: PROJ, sid: SVC, eid: ENV },
    }),
  })
  const j = await r.json()
  return j?.data?.variables?.DIRECT_URL || j?.data?.variables?.DATABASE_URL || null
}

const destino = process.argv[2] || path.join(os.homedir(), 'backups-mapacomportamental')

const url = process.env.DATABASE_URL?.startsWith('postgres')
  ? process.env.DATABASE_URL
  : await urlDoRailway()

if (!url) {
  console.error('Nao consegui a DATABASE_URL. Defina a variavel ou faca login no Railway CLI.')
  process.exit(1)
}
process.env.DATABASE_URL = url

const { PrismaClient } = await import('@prisma/client')
const prisma = new PrismaClient()

const tabelas = await prisma.$queryRawUnsafe(`
  select table_name from information_schema.tables
  where table_schema = 'public' and table_type = 'BASE TABLE'
  order by table_name
`)

const dump = { gerado_em: new Date().toISOString(), tabelas: {} }
let totalLinhas = 0

for (const { table_name } of tabelas) {
  const linhas = await prisma.$queryRawUnsafe(`select * from "${table_name}"`)
  dump.tabelas[table_name] = linhas
  totalLinhas += linhas.length
  console.log(`  ${String(linhas.length).padStart(6)}  ${table_name}`)
}

await prisma.$disconnect()

fs.mkdirSync(destino, { recursive: true })
const carimbo = new Date().toISOString().slice(0, 16).replace(/[:T]/g, '-')
const arquivo = path.join(destino, `mapacomportamental-${carimbo}.json`)

// BigInt e Date nao sao serializaveis por padrao
fs.writeFileSync(arquivo, JSON.stringify(dump, (_, v) => (typeof v === 'bigint' ? String(v) : v), 2))

const mb = (fs.statSync(arquivo).size / 1024 / 1024).toFixed(1)
console.log(`\n${tabelas.length} tabelas · ${totalLinhas} linhas · ${mb} MB`)
console.log(arquivo)

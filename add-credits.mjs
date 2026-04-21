import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const result = await prisma.creditBalance.updateMany({
  data: { balance: 50 }
})

console.log(`✅ Créditos atualizados! Registros afetados: ${result.count}`)
await prisma.$disconnect()


import { PrismaClient } from '../src/generated/prisma'
import mockEvents from '../src/data/events_mock.json'

const prisma = new PrismaClient()

async function main() {

    await prisma.mockEvent.deleteMany()

    const BATCH_SIZE = 100
    for (let i = 0; i < mockEvents.length; i += BATCH_SIZE) {
        const batch = mockEvents.slice(i, i + BATCH_SIZE)
        await prisma.mockEvent.createMany({ data: batch })
        console.log(`✓ Batch ${Math.floor(i / BATCH_SIZE) + 1} insertado`)
    }
    console.log('✅ Seed completado')
    }
    
    main()
    .catch(console.error)
    .finally(() => prisma.$disconnect())

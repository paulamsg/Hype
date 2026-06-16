import prisma from '../config/database'

function pickRandom<T>(items: T[], count: number): T[] {
  const shuffled = [...items].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

export async function updateFeaturedEvents(): Promise<void> {
  await prisma.mockEvent.updateMany({
    where: { featured: true },
    data: { featured: false },
  })

  const allEvents = await prisma.mockEvent.findMany()
  const categories = [...new Set(allEvents.map((event) => event.category))]

  const featuredIds = new Set<string>()

  pickRandom(allEvents, 3).forEach((event) => featuredIds.add(event.id))

  categories.forEach((category) => {
    const eventsInCategory = allEvents.filter((event) => event.category === category)
    const [chosen] = pickRandom(eventsInCategory, 1)
    if (chosen) featuredIds.add(chosen.id)
  })

  if (featuredIds.size === 0) {
    console.log('No hay eventos disponibles para destacar')
    return
  }

  await prisma.mockEvent.updateMany({
    where: { id: { in: [...featuredIds] } },
    data: { featured: true },
  })

  console.log(`✅ ${featuredIds.size} eventos marcados como destacados`)
}

import prisma from '../config/database'

export async function expireOldEvents(): Promise<void> {
  const now = new Date()

  const events = await prisma.savedEvent.findMany({
    where: { folder: { in: ['WANT_GO', 'GOING'] } },
    select: { id: true, date: true, time: true },
  })

  const expiredIds = events
    .filter((e) => {
      if (!e.date) return false
      const dt = new Date(`${e.date}T${e.time ?? '23:59:59'}`)
      return dt < now
    })
    .map((e) => e.id)

  if (expiredIds.length === 0) {
    console.log('No hay eventos para expirar')
    return
  }

  const result = await prisma.savedEvent.updateMany({
    where: { id: { in: expiredIds } },
    data: { folder: 'EXPIRED' },
  })

  console.log(`Eventos expirados: ${result.count}`)
}

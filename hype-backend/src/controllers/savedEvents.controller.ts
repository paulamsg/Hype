import { Request, Response } from 'express'
import prisma from '../config/database'
import { AuthRequest } from '../middleware/auth.middleware'

export const saveEvent = async (req: AuthRequest, res: Response) => {
  try {
    const { eventId, name, date, time, venue, city, image, category, genre, subGenre, priceMin, priceMax, url } =
      req.body
    const userId = req.userId
    const isAlreadySaved = await prisma.savedEvent.findUnique({
      where: {
        userId_eventId: { userId, eventId },
      },
    })
    if (isAlreadySaved) {
      return res.status(400).json({ message: 'El evento ya está guardado' })
    }

    const savedEvent = await prisma.savedEvent.create({
      data: {
        userId,
        eventId,
        name,
        date,
        time,
        venue,
        city,
        image,
        category,
        genre,
        subGenre,
        priceMin,
        priceMax,
        url,
      },
    })

    res.status(201).json({ message: 'Evento guardado correctamente', savedEvent })
  } catch (error) {
    return res.status(500).json({ message: 'Error' })
  }
}

export const deleteEvent = async (req: AuthRequest, res: Response) => {
  try {
    const eventId = req.params.eventId as string
    const userId = req.userId
    const isAlreadySaved = await prisma.savedEvent.findUnique({
      where: {
        userId_eventId: { userId, eventId },
      },
    })

    if (!isAlreadySaved) {
      return res.status(404).json({ message: 'Evento no encontrado' })
    } else {
      await prisma.savedEvent.delete({
        where: {
          userId_eventId: { userId, eventId },
        },
      })
    }
    res.status(200).json({ message: 'Evento eliminado correctamente' })
  } catch (error) {
    return res.status(500).json({ message: 'Error' })
  }
}

//GET TODOS LOS EVENTOS DE TODAS LAS CARPETAS
export const getSavedEvents = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId
    if (!userId) {
      return res.status(401).json({ message: 'No autorizado' })
    }

    const saved = await prisma.savedEvent.findMany({ where: { userId } })

    const savedEvents = saved.map((e) => ({
      id: e.eventId,
      name: e.name,
      date: e.date,
      time: e.time,
      venue: e.venue,
      image: e.image,
      city: e.city,
    }))

    return res.status(200).json({ savedEvents })
  } catch (error) {
    return res.status(500).json({ message: error })
  }
}

//WANT_GO (EL USUARIO HA MARCADO ESE EVENTO COMO QUE QUIERE IR)
export const getWantEvents = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId
    if (!userId) return res.status(401).json({ message: 'No autorizado' })

    const saved = await prisma.savedEvent.findMany({ where: { userId, folder: 'WANT_GO' } })
    const savedEvents = saved.map((e) => ({
      id: e.eventId,
      name: e.name,
      date: e.date,
      time: e.time,
      venue: e.venue,
      image: e.image,
      city: e.city,
    }))
    return res.status(200).json({ savedEvents })
  } catch (error) {
    return res.status(500).json({ message: error })
  }
}

//GOING (EL USUARIO HA MARCADO ESE EVENTO COMO QUE VA A ASISTIR)
export const getGoingEvents = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId
    if (!userId) return res.status(401).json({ message: 'No autorizado' })

    const saved = await prisma.savedEvent.findMany({ where: { userId, folder: 'GOING' } })
    const savedEvents = saved.map((e) => ({
      id: e.eventId,
      name: e.name,
      date: e.date,
      time: e.time,
      venue: e.venue,
      image: e.image,
      city: e.city,
    }))
    return res.status(200).json({ savedEvents })
  } catch (error) {
    return res.status(500).json({ message: error })
  }
}

// GONE (EL USUARIO HA ASISTIDO A ESE EVENTO)
export const getGoneEvents = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId
    if (!userId) return res.status(401).json({ message: 'No autorizado' })

    const saved = await prisma.savedEvent.findMany({ where: { userId, folder: 'GONE' } })
    const savedEvents = saved.map((e) => ({
      id: e.eventId,
      name: e.name,
      date: e.date,
      time: e.time,
      venue: e.venue,
      image: e.image,
      city: e.city,
    }))
    return res.status(200).json({ savedEvents })
  } catch (error) {
    return res.status(500).json({ message: error })
  }
}

// EXPIRED (EL EVENTO QUE HA MARCADO ESE USUARIO COMO QUE QUERIA IR HA EXPIRADO)
export const getExpiredEvents = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId
    if (!userId) return res.status(401).json({ message: 'No autorizado' })

    const saved = await prisma.savedEvent.findMany({ where: { userId, folder: 'EXPIRED' } })
    const savedEvents = saved.map((e) => ({
      id: e.eventId,
      name: e.name,
      date: e.date,
      time: e.time,
      venue: e.venue,
      image: e.image,
      city: e.city,
    }))
    return res.status(200).json({ savedEvents })
  } catch (error) {
    return res.status(500).json({ message: error })
  }
}

// FEED DE AMIGOS
export const getFriendsFeed = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId
    if (!userId) return res.status(401).json({ message: 'No autorizado' })

    const follows = await prisma.follow.findMany({
      where: { followerId: userId },
      select: { followingId: true },
    })
    const friendIds = follows.map((f) => f.followingId)

    if (friendIds.length === 0) return res.status(200).json({ activities: [] })

    const [savedEvents, photos, groupEvents, sharedWithMe] = await Promise.all([
      prisma.savedEvent.findMany({
        where: {
          userId: { in: friendIds },
          folder: { in: ['WANT_GO', 'GOING'] },
        },
        include: {
          user: { select: { id: true, name: true, username: true, avatarUrl: true } },
        },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.photo.findMany({
        where: { userId: { in: friendIds } },
        include: {
          user: { select: { id: true, name: true, username: true, avatarUrl: true } },
          savedEvent: { select: { name: true, eventId: true } },
        },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.groupEvent.findMany({
        where: { userId: { in: friendIds } },
        include: {
          user: { select: { id: true, name: true, username: true, avatarUrl: true } },
          group: { select: { id: true, name: true } },
        },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.notification.findMany({
        where: { userId, senderId: { in: friendIds }, type: 'EVENT_SHARED' },
        include: {
          sender: { select: { id: true, name: true, username: true, avatarUrl: true } },
        },
        orderBy: { createdAt: 'desc' },
      }),
    ])

    const savedEventActivities = savedEvents.map((e) => ({
      type: 'SAVED_EVENT' as const,
      id: `se_${e.id}`,
      createdAt: e.createdAt.toISOString(),
      folder: e.folder,
      eventId: e.eventId,
      name: e.name,
      date: e.date,
      venue: e.venue,
      city: e.city,
      image: e.image,
      category: e.category,
      genre: e.genre,
      savedBy: {
        id: e.user.id,
        name: e.user.name,
        username: e.user.username,
        avatarUrl: e.user.avatarUrl,
      },
    }))

    const photoActivities = photos.map((p) => ({
      type: 'PHOTO' as const,
      id: `ph_${p.id}`,
      createdAt: p.createdAt.toISOString(),
      photoUrl: p.url,
      eventName: p.savedEvent.name,
      eventId: p.savedEvent.eventId,
      savedBy: {
        id: p.user.id,
        name: p.user.name,
        username: p.user.username,
        avatarUrl: p.user.avatarUrl,
      },
    }))

    const groupEventActivities = groupEvents.map((ge) => ({
      type: 'GROUP_EVENT' as const,
      id: `ge_${ge.id}`,
      createdAt: ge.createdAt.toISOString(),
      eventId: ge.eventId,
      name: ge.name,
      date: ge.date,
      venue: ge.venue,
      city: ge.city,
      image: ge.image,
      category: ge.category,
      genre: ge.genre,
      groupId: ge.groupId,
      groupName: ge.group.name,
      savedBy: {
        id: ge.user.id,
        name: ge.user.name,
        username: ge.user.username,
        avatarUrl: ge.user.avatarUrl,
      },
    }))

    const sharedActivities = sharedWithMe.map((n) => ({
      type: 'EVENT_SHARED' as const,
      id: `noti_${n.id}`,
      createdAt: n.createdAt.toISOString(),
      eventName: n.eventName ?? undefined,
      eventImage: n.eventImage ?? undefined,
      eventDate: n.eventDate ?? undefined,
      eventVenue: n.eventVenue ?? undefined,
      eventCity: n.eventCity ?? undefined,
      savedBy: {
        id: n.sender!.id,
        name: n.sender!.name,
        username: n.sender!.username,
        avatarUrl: n.sender!.avatarUrl,
      },
    }))

    const activities = [...savedEventActivities, ...photoActivities, ...groupEventActivities, ...sharedActivities].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )

    return res.status(200).json({ activities })
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener el feed de amigos' })
  }
}

// CAMBIO DE ESTADO DE LOS EVENTOS.
export const updateEventFolder = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId
    if (!userId) {
      return res.status(401).json({ message: 'No autorizado' })
    }
    const eventId = req.params.eventId as string
    const { folder } = req.body

    const folders = ['WANT_GO', 'GOING', 'GONE', 'EXPIRED']

    if (!folders.includes(folder)) {
      return res.status(400).json({ message: 'Folder no válido' })
    }
    const updated = await prisma.savedEvent.update({
      where: { userId_eventId: { userId, eventId } },
      data: { folder },
    })
    return res.status(200).json({ message: 'Carpeta actualizado', updated })
  } catch (error) {
    return res.status(500).json({ message: error })
  }
}

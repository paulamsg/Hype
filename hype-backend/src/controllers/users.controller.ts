import { Request, Response } from 'express'
import prisma from '../config/database'
import { AuthRequest } from '../middleware/auth.middleware'

export const updateUserData = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId
    if (!userId) {
      return res.status(401).json({ error: 'No autorizado' })
    }
    const userData = req.body
    if (!userData) {
      return res.status(400).json({ error: 'Es necesario pasar un usuario' })
    }

    const updated = await prisma.user.update({
      where: { id: userId },
      data: userData,
    })
    return res.status(200).json({ message: 'Usuario actualizado', updated })
  } catch {
    return res.status(500).json({ error: 'Error al actualizar el usuario' })
  }
}

export const searchUser = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId
    if (!userId) {
      return res.status(401).json({ error: 'No autorizado' })
    }

    const searchUserValue = req.query.user
    if (!searchUserValue) {
      return res.status(400).json({ error: 'Parámetro requerido' })
    }

    const userFounded = await prisma.user.findMany({
      where: {
        NOT: { id: userId },
        OR: [{ email: { contains: searchUserValue as string } }, { username: { contains: searchUserValue as string } }],
      },
    })
    return res.status(200).json(userFounded)
  } catch {
    return res.status(500).json({ error: 'Error al buscar el usuario' })
  }
}

export const getAllUsers = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId
    if (!userId) {
      return res.status(401).json({ error: 'No autorizado' })
    }

    const users = await prisma.user.findMany({
      where: {
        NOT: { id: userId },
      },
    })
    return res.status(200).json(users)
  } catch {
    return res.status(500).json({ error: 'Error al obtener los usuarios' })
  }
}

export const getFriendsCount = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId
    if (!userId) return res.status(401).json({ error: 'No autorizado' })

    const followersCount = await prisma.follow.count({
      where: { followingId: userId },
    })

    const followingCount = await prisma.follow.count({
      where: { followerId: userId },
    })

    return res.status(200).json({ followersCount, followingCount })
  } catch {
    return res.status(500).json({ error: 'Error al obtener el conteo de amigos' })
  }
}

export const getUserPhotos = async (req: AuthRequest, res: Response) => {
  const userId = req.userId
  if (!userId) return res.status(401).json({ error: 'No autorizado' })
  const targetId = Number(req.params.userId)
  if (isNaN(targetId)) return res.status(400).json({ error: 'ID inválido' })
  try {
    const follow = await prisma.follow.findFirst({
      where: { OR: [{ followerId: userId, followingId: targetId }, { followerId: targetId, followingId: userId }] },
    })
    if (!follow) return res.status(403).json({ error: 'No sois amigos' })
    const photos = await prisma.photo.findMany({
      where: { userId: targetId },
      orderBy: { createdAt: 'desc' },
      include: { savedEvent: { select: { eventId: true, name: true } } },
    })
    return res.status(200).json({ photos })
  } catch {
    return res.status(500).json({ error: 'Error al obtener las fotos' })
  }
}

export const getUserGoneEvents = async (req: AuthRequest, res: Response) => {
  const userId = req.userId
  if (!userId) return res.status(401).json({ error: 'No autorizado' })
  const targetId = Number(req.params.userId)
  if (isNaN(targetId)) return res.status(400).json({ error: 'ID inválido' })
  try {
    const follow = await prisma.follow.findFirst({
      where: { OR: [{ followerId: userId, followingId: targetId }, { followerId: targetId, followingId: userId }] },
    })
    if (!follow) return res.status(403).json({ error: 'No sois amigos' })
    const saved = await prisma.savedEvent.findMany({
      where: { userId: targetId, folder: 'GONE' },
      orderBy: { createdAt: 'desc' },
    })
    const savedEvents = saved.map((e) => ({
      id: e.eventId, name: e.name, date: e.date, venue: e.venue, image: e.image, city: e.city,
    }))
    return res.status(200).json({ savedEvents })
  } catch {
    return res.status(500).json({ error: 'Error al obtener los eventos' })
  }
}

export const getUserProfile = async (req: AuthRequest, res: Response) => {
  const userId = req.userId
  if (!userId) return res.status(401).json({ error: 'No autorizado' })

  const targetId = Number(req.params.userId)
  if (isNaN(targetId)) return res.status(400).json({ error: 'ID inválido' })

  try {
    const [target, photosCount, friendsCount, follow] = await Promise.all([
      prisma.user.findUnique({
        where: { id: targetId },
        select: { id: true, name: true, lastName: true, username: true, bio: true, location: true, avatarUrl: true },
      }),
      prisma.photo.count({ where: { userId: targetId } }),
      prisma.follow.count({ where: { followingId: targetId } }),
      prisma.follow.findFirst({
        where: { OR: [
          { followerId: userId, followingId: targetId },
          { followerId: targetId, followingId: userId },
        ]},
      }),
    ])

    if (!target) return res.status(404).json({ error: 'Usuario no encontrado' })

    return res.status(200).json({
      user: target,
      isFriend: !!follow,
      stats: { photosCount, friendsCount },
    })
  } catch {
    return res.status(500).json({ error: 'Error al obtener el perfil' })
  }
}

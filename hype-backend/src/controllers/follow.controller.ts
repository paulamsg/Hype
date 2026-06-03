import { Response } from 'express'
import { AuthRequest } from '../middleware/auth.middleware'
import prisma from '../config/database'

export const getFriends = async (req: AuthRequest, res: Response) => {
  const userId = req.userId
  if (!userId) return res.status(401).json({ error: 'No autorizado' })

  try {
    const follows = await prisma.follow.findMany({
      where: { followerId: userId },
      include: {
        following: {
          select: { id: true, name: true, lastName: true, username: true, avatarUrl: true },
        },
      },
    })

    return res.status(200).json({ friends: follows.map((f) => f.following) })
  } catch (e) {
    return res.status(500).json({ error: 'Error al obtener amigos' })
  }
}

export const getFriendIds = async (req: AuthRequest, res: Response) => {
  const userId = req.userId
  if (!userId) return res.status(401).json({ error: 'No autorizado' })

  try {
    const [following, followers] = await Promise.all([
      prisma.follow.findMany({ where: { followerId: userId }, select: { followingId: true } }),
      prisma.follow.findMany({ where: { followingId: userId }, select: { followerId: true } }),
    ])

    const ids = [
      ...following.map((f) => f.followingId),
      ...followers.map((f) => f.followerId),
    ]

    return res.status(200).json({ friendIds: [...new Set(ids)] })
  } catch (e) {
    return res.status(500).json({ error: 'Error al obtener amigos' })
  }
}

export const removeFollow = async (req: AuthRequest, res: Response) => {
  const userId = req.userId
  if (!userId) return res.status(401).json({ error: 'No autorizado' })

  const followerId = Number(req.params.followerId)

  try {
    await prisma.follow.deleteMany({
      where: {
        OR: [
          { followerId, followingId: userId },
          { followerId: userId, followingId: followerId },
        ],
      },
    })

    return res.status(200).json({ message: 'Amistad eliminada' })
  } catch (e) {
    return res.status(500).json({ error: 'Error al eliminar la amistad' })
  }
}

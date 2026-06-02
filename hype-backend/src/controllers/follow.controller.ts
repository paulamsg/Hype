import { Response } from 'express'
import { AuthRequest } from '../middleware/auth.middleware'
import prisma from '../config/database'

export const removeFollow = async (req: AuthRequest, res: Response) => {
  const userId = req.userId
  if (!userId) return res.status(401).json({ error: 'No autorizado' })

  const followerId = Number(req.params.followerId)

  try {
    await prisma.follow.delete({
      where: {
        followerId_followingId: {
          followerId,
          followingId: userId,
        },
      },
    })

    return res.status(200).json({ message: 'Amistad eliminada' })
  } catch (e) {
    return res.status(500).json({ error: 'Error al eliminar la amistad' })
  }
}

import { Response } from 'express'
import prisma from '../config/database'
import { AuthRequest } from '../middleware/auth.middleware'

export const getNotifications = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId
    if (!userId) {
      return res.status(401).json({ error: 'No autorizado' })
    }

    const notifications = await prisma.notification.findMany({
      where: { userId },
      include: {
        sender: {
          select: { id: true, name: true, lastName: true, username: true, avatarUrl: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    return res.status(200).json({ notifications })
  } catch (error) {
    return res.status(500).json({ message: 'No se ha podido cargar las notificaciones' })
  }
}

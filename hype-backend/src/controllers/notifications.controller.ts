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

export const deleteNotification = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId
    if (!userId) {
      return res.status(401).json({ error: 'No autorizado' })
    }

    const notificationId = req.params.id

    const notification = await prisma.notification.findFirst({
      where: { id: Number(notificationId) },
    })

    if (!notification) return res.status(404).json({ message: 'Notificación no encontrada' })

    await prisma.followRequest.deleteMany({
      where: {
        senderId: notification.senderId!,
        receiverId: userId,
      },
    })

    await prisma.notification.delete({
      where: { id: Number(notificationId) },
    })

    return res.status(200).json({ message: 'Solicitud rechazada' })
  } catch (error) {
    return res.status(500).json({ error: 'Error al eliminar la solicitud de amistad' })
  }
}

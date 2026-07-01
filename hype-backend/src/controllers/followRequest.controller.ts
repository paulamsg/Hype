import { Response } from 'express'
import { AuthRequest } from '../middleware/auth.middleware'
import prisma from '../config/database'

export const postFollowRequet = async (req: AuthRequest, res: Response) => {
  const userId = req.userId
  if (!userId) {
    return res.status(401).json({ error: 'No autorizado' })
  }
  const userToFollow = req.body.receiverId
  if (!userToFollow) {
    return res.status(401).json({ error: 'Se necesita el id del usuario al que vas a seguir' })
  }

  try {
    const existing = await prisma.followRequest.findUnique({
      where: { senderId_receiverId: { senderId: userId, receiverId: userToFollow } },
    })

    if (existing) {
      return res.status(409).json({ error: 'Ya existe una solicitud pendiente' })
    }

    const sender = await prisma.user.findUnique({
      where: { id: userId },
      select: { name: true, username: true },
    })

    await prisma.$transaction([
      prisma.followRequest.create({
        data: { senderId: userId, receiverId: userToFollow },
      }),
      prisma.notification.create({
        data: {
          userId: userToFollow,
          senderId: userId,
          type: 'FOLLOW_REQUEST',
          message: `${sender?.name} (@${sender?.username}) te ha enviado una solicitud de amistad`,
        },
      }),
    ])

    return res.status(201).json({ message: 'Solicitud enviada' })
  } catch {
    return res.status(500).json({ error: 'Error al enviar la solicitud' })
  }
}

export const getPendingRequests = async (req: AuthRequest, res: Response) => {
  const userId = req.userId
  if (!userId) return res.status(401).json({ error: 'No autorizado' })

  try {
    const pending = await prisma.followRequest.findMany({
      where: { senderId: userId, status: 'PENDING' },
      select: { receiverId: true },
    })

    return res.status(200).json({ pendingReceiverIds: pending.map((r) => r.receiverId) })
  } catch {
    return res.status(500).json({ error: 'Error al obtener las solicitudes pendientes' })
  }
}

export const cancelFollowRequest = async (req: AuthRequest, res: Response) => {
  const userId = req.userId
  if (!userId) return res.status(401).json({ error: 'No autorizado' })

  const receiverId = Number(req.params.receiverId)

  try {
    await prisma.notification.deleteMany({
      where: {
        senderId: userId,
        userId: receiverId,
        type: 'FOLLOW_REQUEST',
      },
    })

    await prisma.followRequest.delete({
      where: {
        senderId_receiverId: {
          senderId: userId,
          receiverId,
        },
      },
    })

    return res.status(200).json({ message: 'Solicitud cancelada' })
  } catch {
    return res.status(500).json({ error: 'Error al cancelar la solicitud' })
  }
}

export const acceptFollowRequest = async (req: AuthRequest, res: Response) => {
  const userId = req.userId
  if (!userId) return res.status(401).json({ error: 'No autorizado' })

  const notificationId = Number(req.params.id)

  try {
    const notification = await prisma.notification.findFirst({
      where: { id: notificationId, userId },
    })

    if (!notification) return res.status(404).json({ error: 'Notificación no encontrada' })
    if (!notification.senderId) return res.status(400).json({ error: 'La notificación no tiene remitente' })

    const senderId = notification.senderId

    const [acceptor, requester] = await Promise.all([
      prisma.user.findUnique({ where: { id: userId }, select: { name: true, username: true } }),
      prisma.user.findUnique({ where: { id: senderId }, select: { name: true, username: true } }),
    ])

    await prisma.$transaction([
      prisma.follow.create({ data: { followerId: senderId, followingId: userId } }),
      prisma.follow.create({ data: { followerId: userId, followingId: senderId } }),
      prisma.notification.update({
        where: { id: notificationId },
        data: {
          type: 'FOLLOW_ACCEPTED',
          read: true,
          message: `${requester?.name} (@${requester?.username}) y tú sois amigos`,
        },
      }),
      prisma.notification.create({
        data: {
          userId: senderId,
          senderId: userId,
          type: 'FOLLOW_ACCEPTED',
          message: `${acceptor?.name} (@${acceptor?.username}) ha aceptado tu solicitud de amistad`,
        },
      }),
    ])

    await prisma.followRequest.delete({
      where: {
        senderId_receiverId: {
          senderId,
          receiverId: userId,
        },
      },
    })

    return res.status(200).json({ message: 'Solicitud aceptada' })
  } catch {
    return res.status(500).json({ error: 'Error al aceptar la solicitud' })
  }
}

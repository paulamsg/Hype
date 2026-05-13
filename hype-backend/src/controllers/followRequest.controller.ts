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
    const sender = await prisma.user.findUnique({
      where: { id: userId },
      select: { name: true },
    })

    await prisma.followRequest.create({
      data: {
        senderId: userId,
        receiverId: userToFollow,
      },
    })

    await prisma.notification.create({
      data: {
        userId: userToFollow,
        type: 'FOLLOW_REQUEST',
        message: `${sender?.name} te ha enviado una solicitud de amistad`,
      },
    })

    return res.status(201).json({ message: 'Solicitud enviada' })
  } catch (e) {
    return res.status(500).json({ error: 'Error al enviar la solicitud' })
  }
}

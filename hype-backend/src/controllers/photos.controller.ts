import { Response } from 'express'
import prisma from '../config/database'
import { AuthRequest } from '../middleware/auth.middleware'

//POST
export const postPhoto = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId
    const { url, savedEventId } = req.body

    if (!userId) {
      return res.status(401).json({ error: 'No autorizado' })
    }

    if (!url || !savedEventId) {
      return res.status(400).json({ error: 'La url y el id del evento son obligatorios' })
    }

    const savedEvent = await prisma.savedEvent.findFirst({
      where: { eventId: savedEventId, userId },
    })

    if (!savedEvent) {
      return res.status(403).json({ error: 'Evento no encontrado o no te pertenece' })
    }

    const photo = await prisma.photo.create({
      data: {
        url,
        userId,
        savedEventId: savedEvent.id,
      },
    })

    return res.status(201).json({ photo })
  } catch (error) {
    return res.status(500).json({ message: error })
  }
}

//GET
export const getPhotosByUser = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId
    if (!userId) {
      return res.status(401).json({ message: 'No autorizado' })
    }

    const photos = await prisma.photo.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: {
        savedEvent: {
          select: { eventId: true, name: true },
        },
      },
    })
    return res.status(200).json({ photos })
  } catch (error) {
    return res.status(500).json({ message: error })
  }
}

//DELETE
export const deletePhoto = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId
    if (!userId) {
      return res.status(401).json({ message: 'No autorizado' })
    }
    const photoId = req.params.id

    const photo = await prisma.photo.findFirst({
      where: { id: Number(photoId), userId },
    })

    if (!photo) return res.status(404).json({ message: 'Foto no encontrada' })

    const deletedPhoto = await prisma.photo.delete({
      where: { id: Number(photoId) },
    })

    return res.status(200).json({ deletedPhoto })
  } catch (error) {
    return res.status(500).json({ message: error })
  }
}

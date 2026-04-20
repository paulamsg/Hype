import { Request, Response } from 'express'
import prisma from '../config/database'
import { AuthRequest } from '../middleware/auth.middleware'

export const updateUserData = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId
    if (!userId) {
      return res.status(401).json({ message: 'No autorizado' })
    }
    const userData = req.body
    if (!userData) {
      return res.status(400).json({ message: 'Es necesario pasar un usuario' })
    }

    const updated = await prisma.user.update({
      where: { id: userId },
      data: userData,
    })
    return res.status(200).json({ message: 'Usuario actualizada', updated })
  } catch (error) {
    return res.status(500).json({ message: error })
  }
}

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

export const searchUser = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId
    if (!userId) {
      return res.status(401).json({ message: 'No autorizado' })
    }

    const searchUserValue = req.query.user
    if (!searchUserValue) {
      return res.status(400).json({ message: 'Parámetro requerido' })
    }

    const userFounded = await prisma.user.findMany({
      where: {
        NOT: { id: userId },
        OR: [{ email: { contains: searchUserValue as string } }, { username: { contains: searchUserValue as string } }],
      },
    })
    return res.status(200).json(userFounded)
  } catch (error) {
    return res.status(500).json({ message: error })
  }
}

export const getAllUsers = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId
    if (!userId) {
      return res.status(401).json({ message: 'No autorizado' })
    }

    const users = await prisma.user.findMany({
      where: {
        NOT: { id: userId },
      },
      take: 4,
    })
    return res.status(200).json(users)
  } catch (error) {
    return res.status(500).json({ message: error })
  }
}

export const getFriendsCount = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId
    if (!userId) return res.status(401).json({ message: 'No autorizado' })

    const followersCount = await prisma.follow.count({
      where: { followingId: userId },
    })

    const followingCount = await prisma.follow.count({
      where: { followerId: userId },
    })

    return res.status(200).json({ followersCount, followingCount })
  } catch (error) {
    return res.status(500).json({ message: error })
  }
}

import { Request, Response } from 'express'
import prisma from '../config/database'

export const getMockEvents = async (req: Request, res: Response) => {
  try {
    const { city } = req.query
    const events = await prisma.mockEvent.findMany({
      where: { city: city as string },
      orderBy: { date: 'asc' },
    })
    res.status(200).json({ events })
  } catch (error) {
    return res.status(500).json({ message: error })
  }
}

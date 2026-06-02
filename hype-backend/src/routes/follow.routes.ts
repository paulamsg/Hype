import { Router, RequestHandler } from 'express'
import { authMiddleware } from '../middleware/auth.middleware'
import { removeFollow } from '../controllers/follow.controller'

const router = Router()
router.delete('/:followerId', authMiddleware as RequestHandler, removeFollow as unknown as RequestHandler)

export default router

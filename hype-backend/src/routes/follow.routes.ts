import { Router, RequestHandler } from 'express'
import { authMiddleware } from '../middleware/auth.middleware'
import { getFriendIds, removeFollow } from '../controllers/follow.controller'

const router = Router()
router.get('/friend-ids', authMiddleware as RequestHandler, getFriendIds as unknown as RequestHandler)
router.delete('/:followerId', authMiddleware as RequestHandler, removeFollow as unknown as RequestHandler)

export default router

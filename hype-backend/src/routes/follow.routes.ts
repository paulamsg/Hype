import { Router, RequestHandler } from 'express'
import { authMiddleware } from '../middleware/auth.middleware'
import { getFriends, getFriendIds, removeFollow } from '../controllers/follow.controller'

const router = Router()
router.get('/friends', authMiddleware as RequestHandler, getFriends as unknown as RequestHandler)
router.get('/friend-ids', authMiddleware as RequestHandler, getFriendIds as unknown as RequestHandler)
router.delete('/:followerId', authMiddleware as RequestHandler, removeFollow as unknown as RequestHandler)

export default router

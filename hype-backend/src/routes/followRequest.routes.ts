import { Router, RequestHandler } from 'express'
import { authMiddleware } from '../middleware/auth.middleware'
import { postFollowRequet, acceptFollowRequest, cancelFollowRequest, getPendingRequests } from '../controllers/followRequest.controller'

const router = Router()
router.get('/pending', authMiddleware as RequestHandler, getPendingRequests as unknown as RequestHandler)
router.post('/', authMiddleware as RequestHandler, postFollowRequet as unknown as RequestHandler)
router.patch('/:id', authMiddleware as RequestHandler, acceptFollowRequest as unknown as RequestHandler)
router.delete('/:receiverId', authMiddleware as RequestHandler, cancelFollowRequest as unknown as RequestHandler)

export default router

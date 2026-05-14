import { Router, RequestHandler } from 'express'
import { authMiddleware } from '../middleware/auth.middleware'
import { postFollowRequet, deleteFollowRequest } from '../controllers/followRequest.controller'

const router = Router()
router.post('/', authMiddleware as RequestHandler, postFollowRequet as unknown as RequestHandler)
router.delete('/:id', authMiddleware as RequestHandler, deleteFollowRequest as unknown as RequestHandler)

export default router

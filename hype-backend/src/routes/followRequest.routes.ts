import { Router, RequestHandler } from 'express'
import { authMiddleware } from '../middleware/auth.middleware'
import { postFollowRequet } from '../controllers/followRequest.controller'

const router = Router()
router.post('/', authMiddleware as RequestHandler, postFollowRequet as unknown as RequestHandler)

export default router

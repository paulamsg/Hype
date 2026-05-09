import { Router, RequestHandler } from 'express'
import { updateUserData, searchUser, getAllUsers } from '../controllers/users.controller'
import { authMiddleware } from '../middleware/auth.middleware'

const router = Router()

router.patch('/me', authMiddleware as RequestHandler, updateUserData as unknown as RequestHandler)
router.get('/search', authMiddleware as RequestHandler, searchUser as unknown as RequestHandler)
router.get('/all', authMiddleware as RequestHandler, getAllUsers as unknown as RequestHandler)

export default router

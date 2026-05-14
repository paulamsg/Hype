import { Router, RequestHandler } from 'express'
import { authMiddleware } from '../middleware/auth.middleware'
import { getNotifications, deleteNotification } from '../controllers/notifications.controller'

const router = Router()
router.get('/', authMiddleware as RequestHandler, getNotifications as unknown as RequestHandler)
router.delete('/:id', authMiddleware as RequestHandler, deleteNotification as unknown as RequestHandler)

export default router

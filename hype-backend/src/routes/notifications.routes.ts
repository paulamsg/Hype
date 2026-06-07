import { Router, RequestHandler } from 'express'
import { authMiddleware } from '../middleware/auth.middleware'
import { getNotifications, deleteNotification, markNotificationRead, getUnreadCount, deleteAllNotifications, shareEventToFriend } from '../controllers/notifications.controller'

const router = Router()
router.get('/', authMiddleware as RequestHandler, getNotifications as unknown as RequestHandler)
router.get('/unread-count', authMiddleware as RequestHandler, getUnreadCount as unknown as RequestHandler)
router.patch('/:id/read', authMiddleware as RequestHandler, markNotificationRead as unknown as RequestHandler)
router.post('/share-event', authMiddleware as RequestHandler, shareEventToFriend as unknown as RequestHandler)
router.delete('/', authMiddleware as RequestHandler, deleteAllNotifications as unknown as RequestHandler)
router.delete('/:id', authMiddleware as RequestHandler, deleteNotification as unknown as RequestHandler)

export default router

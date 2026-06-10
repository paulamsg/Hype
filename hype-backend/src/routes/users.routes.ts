import { Router, RequestHandler } from 'express'
import { updateUserData, searchUser, getAllUsers, getFriendsCount, getUserProfile, getUserPhotos, getUserGoneEvents } from '../controllers/users.controller'
import { authMiddleware } from '../middleware/auth.middleware'

const router = Router()

router.patch('/me', authMiddleware as RequestHandler, updateUserData as unknown as RequestHandler)
router.get('/me/friends-count', authMiddleware as RequestHandler, getFriendsCount as unknown as RequestHandler)
router.get('/search', authMiddleware as RequestHandler, searchUser as unknown as RequestHandler)
router.get('/all', authMiddleware as RequestHandler, getAllUsers as unknown as RequestHandler)
router.get('/:userId/profile', authMiddleware as RequestHandler, getUserProfile as unknown as RequestHandler)
router.get('/:userId/photos', authMiddleware as RequestHandler, getUserPhotos as unknown as RequestHandler)
router.get('/:userId/gone', authMiddleware as RequestHandler, getUserGoneEvents as unknown as RequestHandler)

export default router

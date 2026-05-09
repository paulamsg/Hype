import { Router } from 'express'
import { getMockEvents, getFeaturedMockEvents } from '../controllers/mockEvents.controller'

const router = Router()

router.get('/featured', getFeaturedMockEvents)
router.get('/', getMockEvents)
export default router

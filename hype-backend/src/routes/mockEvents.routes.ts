import { Router } from 'express'
import { getMockEvents } from '../controllers/mockEvents.controller'

const router = Router()

router.get('/', getMockEvents)
export default router

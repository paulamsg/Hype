import { Router, RequestHandler } from 'express'
import {
  getGroupIdsForEvent,
  getSharedEventIds,
  createGroup,
  getMyGroups,
  getGroupById,
  updateGroup,
  addMember,
  removeMember,
  deleteGroup,
  addEvent,
  removeEvent,
  voteOnGroupEvent,
} from '../controllers/groups.controller'
import { authMiddleware } from '../middleware/auth.middleware'

const router = Router()

router.get('/shared-event-ids', authMiddleware as RequestHandler, getSharedEventIds as unknown as RequestHandler)
router.get('/event-groups', authMiddleware as RequestHandler, getGroupIdsForEvent as unknown as RequestHandler)
router.post('/', authMiddleware as RequestHandler, createGroup as unknown as RequestHandler)
router.get('/', authMiddleware as RequestHandler, getMyGroups as unknown as RequestHandler)
router.get('/:id', authMiddleware as RequestHandler, getGroupById as unknown as RequestHandler)
router.patch('/:id', authMiddleware as RequestHandler, updateGroup as unknown as RequestHandler)
router.post('/:id/members', authMiddleware as RequestHandler, addMember as unknown as RequestHandler)
router.delete('/:id/members/:memberId', authMiddleware as RequestHandler, removeMember as unknown as RequestHandler)
router.delete('/:id', authMiddleware as RequestHandler, deleteGroup as unknown as RequestHandler)
router.post('/:id/events', authMiddleware as RequestHandler, addEvent as unknown as RequestHandler)
router.post('/:id/events/:eventId/vote', authMiddleware as RequestHandler, voteOnGroupEvent as unknown as RequestHandler)
router.delete('/:id/events/:eventId', authMiddleware as RequestHandler, removeEvent as unknown as RequestHandler)

export default router

import { Router, RequestHandler } from "express"
import { saveEvent, deleteEvent } from "../controllers/savedEvents.controller"
import { authMiddleware } from "../middleware/auth.middleware"

const router = Router()

router.post("/save", authMiddleware as RequestHandler, saveEvent as unknown as RequestHandler)
router.delete("/:eventId", authMiddleware as RequestHandler, deleteEvent as unknown as RequestHandler)
router.get("/:userId", authMiddleware as RequestHandler, deleteEvent as unknown as RequestHandler)

export default router;
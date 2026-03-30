import { Router, RequestHandler } from "express"
import { saveEvent, deleteEvent,getSavedEvents } from "../controllers/savedEvents.controller"
import { authMiddleware } from "../middleware/auth.middleware"

const router = Router()

router.post("/save", authMiddleware as RequestHandler, saveEvent as unknown as RequestHandler)
router.delete("/:eventId", authMiddleware as RequestHandler, deleteEvent as unknown as RequestHandler)
router.get("/", authMiddleware as RequestHandler, getSavedEvents as unknown as RequestHandler)

export default router;
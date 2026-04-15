import { Router, RequestHandler } from "express"
import { saveEvent, deleteEvent,getSavedEvents, getWantEvents, getGoingEvents, getGoneEvents,getExpiredEvents,updateEventFolder} from "../controllers/savedEvents.controller"
import { authMiddleware } from "../middleware/auth.middleware"

const router = Router()

router.post("/save", authMiddleware as RequestHandler, saveEvent as unknown as RequestHandler)
router.delete("/:eventId", authMiddleware as RequestHandler, deleteEvent as unknown as RequestHandler)

router.get("/", authMiddleware as RequestHandler, getSavedEvents as unknown as RequestHandler)
router.get("/wantEvents", authMiddleware as RequestHandler,getWantEvents  as unknown as RequestHandler)
router.get("/goingEvents", authMiddleware as RequestHandler,getGoingEvents  as unknown as RequestHandler)
router.get("/goneEvents", authMiddleware as RequestHandler,getGoneEvents  as unknown as RequestHandler)
router.get("/expiredEvents", authMiddleware as RequestHandler,getExpiredEvents  as unknown as RequestHandler)

router.patch("/:eventId/updateFolder", authMiddleware as RequestHandler,updateEventFolder  as unknown as RequestHandler);

export default router;
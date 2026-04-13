import { Router, RequestHandler } from "express"
import { getPhotosByUser, deletePhoto,postPhoto } from "../controllers/photos.controller"
import { authMiddleware } from "../middleware/auth.middleware"

const router = Router()

router.post("/", authMiddleware as RequestHandler, postPhoto as unknown as RequestHandler)
router.delete("/:id", authMiddleware as RequestHandler, deletePhoto as unknown as RequestHandler)
router.get("/", authMiddleware as RequestHandler, getPhotosByUser as unknown as RequestHandler)

export default router;
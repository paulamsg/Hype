import { Router, RequestHandler } from "express"
import {updateUserData} from "../controllers/users.controller"
import { authMiddleware } from "../middleware/auth.middleware"

const router = Router();

router.patch("/me", authMiddleware as RequestHandler,updateUserData  as unknown as RequestHandler );

export default router;
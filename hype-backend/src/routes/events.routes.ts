import { Router } from "express";
import {getEvents,getMocksEvents} from "../controllers/events.controller"

const router = Router();

router.get("/", getEvents);
router.get("/mock",getMocksEvents)
export default router;
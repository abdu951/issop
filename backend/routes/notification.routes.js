import express from "express";
import { getMyNotifications } from "../controllers/notification.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", authenticate, getMyNotifications);

export default router;
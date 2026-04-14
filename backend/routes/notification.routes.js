import express from "express";
import { getMyNotifications, markNotificationAsRead, markAllNotificationsAsRead } from "../controllers/notification.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", authenticate, getMyNotifications);
router.patch("/:id/read", authenticate, markNotificationAsRead);
router.patch("/read-all", authenticate, markAllNotificationsAsRead);

export default router;








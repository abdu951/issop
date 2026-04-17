import * as service from "./notification.service.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

export const getMyNotifications = asyncHandler(async (req, res) => {
  const notifications = await service.getMyNotifications(req.user.id);
  res.json(notifications);
});

export const markNotificationAsRead = asyncHandler(async (req, res) => {
  const updated = await service.markNotificationAsRead(
    req.params.id,
    req.user.id
  );

  res.json(updated);
});

export const markAllNotificationsAsRead = asyncHandler(async (req, res) => {
  await service.markAllNotificationsAsRead(req.user.id);

  res.json({ message: "All notifications marked as read" });
});
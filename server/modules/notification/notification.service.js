import * as repo from "./notification.repository.js";
import { AppError } from "../../utils/AppError.js";
import { getIO } from "../../sockets/socket.js";

export const createNotification = async ({
  userId,
  message,
  type,
  issueId,
}) => {
  // 1. Save in DB
  const notification = await repo.createNotification({
    userId,
    message,
    type,
    issueId,
  });

  // 2. Emit real-time event
  const io = getIO();
  io.to(userId).emit("notification", notification);

  return notification;
};

export const getMyNotifications = async (userId) => {
  return repo.findUserNotifications(userId);
};

export const markNotificationAsRead = async (id, userId) => {
  const notification = await repo.findNotificationById(id);

  if (!notification) {
    throw new AppError("Notification not found", 404);
  }

  // ownership check
  if (notification.userId !== userId) {
    throw new AppError("Unauthorized", 403);
  }

  return repo.updateNotification(id, { isRead: true });
};

export const markAllNotificationsAsRead = async (userId) => {
  return repo.markAllAsRead(userId);
};
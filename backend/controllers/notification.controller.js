import { PrismaClient } from "@prisma/client";
import { getIO } from "../sockets/socket.js";


const prisma = new PrismaClient();



export const createNotification = async ({
  userId,
  message,
  type,
  issueId,
}) => {
  // 1. Save to DB
  const notification = await prisma.notification.create({
    data: {
      userId,
      message,
      type,
      issueId,
    },
  });

  // 2. Emit real-time event
  const io = getIO();

  io.to(userId).emit("notification", notification);

  return notification;
};



export const getMyNotifications = async (req, res) => {
  try {
    const notifications = await prisma.notification.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: "desc" },
    });

    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};




export const markNotificationAsRead = async (req, res) => {
  try {
    const { id } = req.params;

    const notification = await prisma.notification.findUnique({
      where: { id },
    });

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    // 🔐 security: user can only update their own notification
    if (notification.userId !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const updated = await prisma.notification.update({
      where: { id },
      data: { isRead: true },
    });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



export const markAllNotificationsAsRead = async (req, res) => {
  try {
    await prisma.notification.updateMany({
      where: {
        userId: req.user.id,
        isRead: false,
      },
      data: {
        isRead: true,
      },
    });

    res.json({ message: "All notifications marked as read" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
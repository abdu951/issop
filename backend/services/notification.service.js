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
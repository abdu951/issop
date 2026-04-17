import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createNotification = (data) => {
  return prisma.notification.create({ data });
};

export const findUserNotifications = (userId) => {
  return prisma.notification.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
};

export const findNotificationById = (id) => {
  return prisma.notification.findUnique({
    where: { id },
  });
};

export const updateNotification = (id, data) => {
  return prisma.notification.update({
    where: { id },
    data,
  });
};

export const markAllAsRead = (userId) => {
  return prisma.notification.updateMany({
    where: {
      userId,
      isRead: false,
    },
    data: {
      isRead: true,
    },
  });
};
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createNotification = (data) => {
  return prisma.notification.create({ data });
};

export const findUserNotifications = (userId) => {
  return prisma.notification.findMany({
    where: { userId, isRead: false },
    orderBy: { createdAt: "desc" },
  });
}; 

// find user notifications by userId and only isRead is false with decsending order by createdAt
{/* export const findUnreadNotificationsByUserId = (userId) => {
  return prisma.notification.findMany({
    where: { userId, isRead: false },
    orderBy: { createdAt: "desc" },
  }); 
}; */}

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
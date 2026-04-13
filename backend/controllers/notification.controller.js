import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();



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
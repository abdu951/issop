import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

export const getUsersByRole = async (req, res) => {
  try {
    const { role } = req.query;

    const users = await prisma.user.findMany({
      where: {
        role: role || undefined,
      },
      select: {
        id: true,
        email: true,
        role: true,
      },
    });

    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
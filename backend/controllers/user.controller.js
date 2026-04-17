import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();


export const createUser = async (req, res) => {
  try {
    // 🔐 only admin
    if (req.user.role !== "ADMIN") {
      return res.status(403).json({ message: "Forbidden" });
    }

    const { name, email, password, role } = req.body;

    // ✅ validate role
    const allowedRoles = ["ADMIN", "AGENT"];
    if (!allowedRoles.includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const existing = await prisma.user.findUnique({
      where: { email },
    });

    if (existing) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashed,
        role,
      },
    });

    res.status(201).json({ user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const getUsersByRole = async (req, res) => {
  try {
    const { role } = req.query;

    const users = await prisma.user.findMany({
      where: {
        role: role || undefined,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
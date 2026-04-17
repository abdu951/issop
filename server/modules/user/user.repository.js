import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const findUserByEmail = (email) => {
  return prisma.user.findUnique({ where: { email } });
};

export const createUser = (data) => {
  return prisma.user.create({ data });
};

export const findUsersByRole = (role) => {
  return prisma.user.findMany({
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
};
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createUser = (data) => {
  return prisma.user.create({ data });
};

export const findUserByEmail = (email) => {
  return prisma.user.findUnique({ where: { email } });
};
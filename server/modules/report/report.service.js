import prisma from "../../lib/prisma.js";

export const createReport = async (data, userId) => {
  return await prisma.report.create({
    data: {
      title: data.title,
      description: data.description,
      imageUrl: data.imageUrl,
      location: data.location,
      userId,
    },
  });
};

export const getAllReports = async () => {
  return await prisma.report.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: {
        select: { id: true, email: true },
      },
    },
  });
};

export const getUserReports = async (userId) => {
  return await prisma.report.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
};

export const getSingleReport = async (id) => {
  return await prisma.report.findUnique({
    where: { id },
    include: {
      user: {
        select: { id: true, email: true },
      },
    },
  });
};
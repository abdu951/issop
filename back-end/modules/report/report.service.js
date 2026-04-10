import prisma from "../../config/prisma.js";

export const createReport = async (userId, data) => {
  return await prisma.report.create({
    data: {
      title: data.title,
      description: data.description,
      imageUrl: data.imageUrl,
      location: data.location,
      status: "SUBMITTED",
      userId,
    },
  });
};
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createIssue = (data) => {
  return prisma.issue.create({ data });
};

export const findAllIssues = (filter) => {
  return prisma.issue.findMany({
    where: filter,
    include: { user: true, assignedTo: true },
    orderBy: { createdAt: "desc" },
  });
};

export const findIssueById = (id) => {
  return prisma.issue.findUnique({
    where: { id },
    include: { user: true },
  });
};

export const updateIssue = (id, data) => {
  return prisma.issue.update({
    where: { id },
    data,
  });
};

export const findUserIssues = (userId) => {
  return prisma.issue.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
};

export const findAgentIssues = (assignedToId) => {
  return prisma.issue.findMany({
    where: { assignedToId },
    orderBy: { updatedAt: "desc" },
  });
};
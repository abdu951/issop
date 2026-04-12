import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export const assignAgent = async (req, res) => {
  try {
    const { issueId, agentId } = req.body;

    const issue = await prisma.issue.findUnique({
  where: { id: issueId }
});

if (!issue) {
  return res.status(404).json({ message: "Issue not found" });
}

const updated = await prisma.issue.update({
  where: { id: issueId },
  data: {
    assignedToId: agentId,
    status: "ASSIGNED"
  }
});

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



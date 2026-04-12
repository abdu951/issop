import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();




export const respondToIssue = async (req, res) => {
  try {
    const { issueId, action } = req.body;

    const issue = await prisma.issue.findUnique({
      where: { id: issueId },
    });

    if (issue.assignedToId !== req.user.id) {
      return res.status(403).json({ message: "Not your issue" });
    }

    let status;

    if (action === "accept") status = "IN_PROGRESS";
    if (action === "reject") status = "REJECTED";

    const updated = await prisma.issue.update({
      where: { id: issueId },
      data: { status },
    });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
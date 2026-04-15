import { PrismaClient } from "@prisma/client";
import cloudinary from "../utils/cloudinary.js";
import streamifier from "streamifier";
import { createNotification } from "../services/notification.service.js";

const prisma = new PrismaClient();

/**
 * CREATE ISSUE
 */
/*export const createIssue = async (req, res) => {
  try {
    const { title, description, location } = req.body;

    let imageUrl = null;

    // Upload image to Cloudinary if exists
    if (req.file) {
      const result = await cloudinary.uploader.upload_stream(
        { folder: "issues" },
        (error, result) => {
          if (error) throw error;
          return result;
        }
      );

      // safer approach (buffer upload)
      const stream = cloudinary.uploader.upload_stream(
        { folder: "issues" },
        async (error, result) => {
          if (error) return res.status(500).json({ error: error.message });

          const issue = await prisma.issue.create({
            data: {
              title,
              description,
              location,
              imageUrl: result.secure_url,
              userId: req.user.id,
            },
          });

          return res.status(201).json(issue);
        }
      );

      stream.end(req.file.buffer);
      return;
    }

    // No image case
    const issue = await prisma.issue.create({
      data: {
        title,
        description,
        location,
        userId: req.user.id,
      },
    });

    res.status(201).json(issue);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; */


const uploadFromBuffer = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "issues" },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
};


export const createIssue = async (req, res) => {
  try {
    const { title, description, location } = req.body;

    let imageUrl = null;

    if (req.file) {
      const result = await uploadFromBuffer(req.file.buffer);
      imageUrl = result.secure_url;
    }

    const issue = await prisma.issue.create({
      data: {
        title,
        description,
        location,
        imageUrl,
        userId: req.user.id,
      },
    });
    
    console.log("CREATED ISSUE:", issue); // 👈 ADD THIS
    res.status(201).json(issue);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * GET ALL ISSUES
 */
/*export const getAllIssues = async (req, res) => {
  try {
    const issues = await prisma.issue.findMany({
      include: {
        user: {
          select: {
            id: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(issues);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; */


export const getAllIssues = async (req, res) => {
  try {
    const { status, location } = req.query;

    const issues = await prisma.issue.findMany({
      where: {
        status: status || undefined,
        location: location || undefined,
      },
      include: {
        user: true,
        assignedTo: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(issues);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * GET SINGLE ISSUE
 */
export const getIssueById = async (req, res) => {
  try {
    const { id } = req.params;

    const issue = await prisma.issue.findUnique({
      where: { id },
      include: {
        user: true,
      },
    });

    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }

    res.json(issue);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * GET USER ISSUES
 */
export const getMyIssues = async (req, res) => {
  try {
    const issues = await prisma.issue.findMany({
      where: {
        userId: req.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(issues);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



/*export const resolveIssue = async (req, res) => {
  try {
    const { issueId } = req.body;

    const issue = await prisma.issue.findUnique({
      where: { id: issueId },
    });

    if (issue.assignedToId !== req.user.id) {
      return res.status(403).json({ message: "Not your issue" });
    }

    const updated = await prisma.issue.update({
      where: { id: issueId },
      data: { status: "RESOLVED" },
    });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; */



export const resolveIssue = async (req, res) => {
  try {
    const { issueId } = req.body;

    const issue = await prisma.issue.findUnique({
      where: { id: issueId },
    });

    if (issue.assignedToId !== req.user.id) {
      return res.status(403).json({ message: "Not your issue" });
    }

    const updated = await prisma.issue.update({
      where: { id: issueId },
      data: { status: "RESOLVED" },
    });

    // 🔔 notify citizen
    await createNotification({
      userId: issue.userId,
      message: "Your issue has been resolved",
      type: "ISSUE_RESOLVED",
      issueId,
    });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/*export const assignAgent = async (req, res) => {
  try {
    const { issueId, agentId } = req.body;

    // ✅ DEBUG HERE (correct place)
    console.log("issueId:", issueId);
    console.log("agentId:", agentId);

    const issue = await prisma.issue.findUnique({
      where: { id: issueId },
    });

    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }

    const updated = await prisma.issue.update({
      where: { id: issueId },
      data: {
        assignedToId: agentId,
        status: "ASSIGNED",
      },
    });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; */




export const assignAgent = async (req, res) => {
  try {
    const { issueId, agentId } = req.body;

    const issue = await prisma.issue.findUnique({
      where: { id: issueId },
    });

    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }

    const updated = await prisma.issue.update({
      where: { id: issueId },
      data: {
        assignedToId: agentId,
        status: "ASSIGNED",
      },
    });

    // 🔔 notify agent
    await createNotification({
      userId: agentId,
      message: "New issue assigned to you",
      type: "ISSUE_ASSIGNED",
      issueId,
    });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


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
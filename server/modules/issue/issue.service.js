import * as repo from "./issue.repository.js";
import { AppError } from "../../utils/AppError.js";
import { createNotification } from "../notification/notification.service.js";
import cloudinary from "../../utils/cloudinary.js";
import streamifier from "streamifier";

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

export const createIssue = async (data, file, userId) => {
  let imageUrl = null;

  if (file) {
    const result = await uploadFromBuffer(file.buffer);
    imageUrl = result.secure_url;
  }

  return repo.createIssue({
    ...data,
    imageUrl,
    userId,
  });
}; 



export const getAllIssues = async (status) => {
  return repo.findAllIssues({
    status: status || undefined,
  });
};

export const getIssueById = async (id) => {
  const issue = await repo.findIssueById(id);

  if (!issue) throw new AppError("Issue not found", 404);

  return issue;
};

export const getMyIssues = async (userId) => {
  return repo.findUserIssues(userId);
};

export const getAgentIssues = async (assignedToId) => {
  return repo.findAgentIssues(assignedToId);
};

export const assignAgent = async (issueId, agentId) => {
  const issue = await repo.findIssueById(issueId);

  if (!issue) throw new AppError("Issue not found", 404);

  const updated = await repo.updateIssue(issueId, {
    assignedToId: agentId,
    status: "ASSIGNED",
  });

  await createNotification({
    userId: agentId,
    message: "New issue assigned to you",
    type: "ISSUE_ASSIGNED",
    issueId,
  });

  return updated;
};

export const respondToIssue = async (issueId, action, userId) => {
  const issue = await repo.findIssueById(issueId);

  if (issue.assignedToId !== userId) {
    throw new AppError("Not your issue", 403);
  }

  let status;
  if (action === "accept") status = "IN_PROGRESS";
  else if (action === "reject") status = "REJECTED";
  else throw new AppError("Invalid action", 400);

  return repo.updateIssue(issueId, { status });
};


export const resolveIssue = async (issueId, userId) => {
  const issue = await repo.findIssueById(issueId);

  if (issue.assignedToId !== userId) {
    throw new AppError("Not your issue", 403);
  }

  const updated = await repo.updateIssue(issueId, {
    status: "RESOLVED",
  });

  await createNotification({
    userId: issue.userId,
    message: "Your issue has been resolved",
    type: "ISSUE_RESOLVED",
    issueId,
  });

  return updated;
};


// logic for updating issue, by it's image file, description, location, title 
export const updateIssue = async (issueId, data, file, userId) => {
  const issue = await repo.findIssueById(issueId);

  

  let imageUrl = issue.imageUrl;

  if (file) {
    const result = await uploadFromBuffer(file.buffer);
    imageUrl = result.secure_url;
  }

  return repo.updateIssue(issueId, { ...data, imageUrl });
};
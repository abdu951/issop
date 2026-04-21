import * as service from "./issue.service.js";
import { asyncHandler } from "../../utils/AsyncHandler.js";

export const createIssue = asyncHandler(async (req, res) => {
  const issue = await service.createIssue(
    req.body,
    req.file,
    req.user.id
  );

  res.status(201).json(issue);
});

export const getAllIssues = asyncHandler(async (req, res) => {
  const issues = await service.getAllIssues(req.query.status);
  res.json(issues);
});

export const getIssueById = asyncHandler(async (req, res) => {
  const issue = await service.getIssueById(req.params.id);
  res.json(issue);
});

export const getMyIssues = asyncHandler(async (req, res) => {
  const issues = await service.getMyIssues(req.user.id);
  res.json(issues);
});

export const assignAgent = asyncHandler(async (req, res) => {
  const result = await service.assignAgent(
    req.body.issueId,
    req.body.agentId
  );
  res.json(result);
});

export const respondToIssue = asyncHandler(async (req, res) => {
  const result = await service.respondToIssue(
    req.body.issueId,
    req.body.action,
    req.user.id
  );
  res.json(result);
});

export const resolveIssue = asyncHandler(async (req, res) => {
  const result = await service.resolveIssue(
    req.body.issueId,
    req.user.id
  );
  res.json(result);
});
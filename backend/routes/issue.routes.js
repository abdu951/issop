import express from "express";
import {
  createIssue,
  getAllIssues,
  getIssueById,
  getMyIssues,
  resolveIssue,
  assignAgent,
  respondToIssue,
} from "../controllers/issue.controller.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

import { authenticate } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/upload.middleware.js";

const router = express.Router();

// Create issue (auth + upload image)
router.post("/", authenticate, upload.single("image"), createIssue);

// Get logged-in user's issues
router.get("/me", authenticate, getMyIssues);

// Get all issues
router.get("/", getAllIssues);

// Get single issue
router.get("/:id", getIssueById);

// Resolve issue (agent/admin)
router.post("/resolve", authenticate, authorizeRoles("AGENT"), resolveIssue);

// Assign agent (admin)
router.post(
  "/assign",
  authenticate,
  authorizeRoles("ADMIN"),
  assignAgent
);


router.post(
  "/respond",
  authenticate,
  authorizeRoles("AGENT"),
  respondToIssue
);

export default router;
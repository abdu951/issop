import express from "express";
import {
  createIssue,
  getAllIssues,
  getIssueById,
  getMyIssues,
  resolveIssue,
  assignAgent,
  respondToIssue,
  getAgentIssues,
  updateIssue,
} from "./issue.controller.js";
import { authorizeRoles } from "../../middleware/role.middleware.js";

import { authenticate } from "../../middleware/auth.middleware.js";
import { upload } from "../../middleware/upload.middleware.js";

const router = express.Router();


router.post("/", authenticate, authorizeRoles("CITIZEN"), upload.single("image"), createIssue);


router.get("/me", authenticate, authorizeRoles("CITIZEN"), getMyIssues);
router.get("/agent", authenticate, authorizeRoles("AGENT"), getAgentIssues);


router.get("/", authenticate, authorizeRoles("ADMIN", "AGENT"), getAllIssues);


router.get("/:id", authenticate, getIssueById);


router.post("/resolve", authenticate, authorizeRoles("AGENT"), resolveIssue);


router.post("/assign", authenticate, authorizeRoles("ADMIN"), assignAgent);


router.post("/respond", authenticate, authorizeRoles("AGENT"), respondToIssue);

// routes for updateIssue
router.patch("/resolve/:id", authenticate, authorizeRoles("AGENT"), upload.single("image"), updateIssue);

export default router;
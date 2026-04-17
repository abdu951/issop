import express from "express";
import {
  createIssue,
  getAllIssues,
  getIssueById,
  getMyIssues,
  resolveIssue,
  assignAgent,
  respondToIssue,
} from "./issue.controller.js";
import { authorizeRoles } from "../../middleware/role.middleware.js";

import { authenticate } from "../../middleware/auth.middleware.js";
import { upload } from "../../middleware/upload.middleware.js";

const router = express.Router();


router.post("/", authenticate, authorizeRoles("CITIZEN"), upload.single("image"), createIssue);


router.get("/me", authenticate, authorizeRoles("CITIZEN"), getMyIssues);


router.get("/", authenticate, authorizeRoles("ADMIN"), getAllIssues);


router.get("/:id", authenticate, getIssueById);


router.post("/resolve", authenticate, authorizeRoles("AGENT"), resolveIssue);


router.post("/assign", authenticate, authorizeRoles("ADMIN"), assignAgent);


router.post("/respond", authenticate, authorizeRoles("AGENT"), respondToIssue);

export default router;
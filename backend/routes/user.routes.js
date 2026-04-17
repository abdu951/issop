import express from "express";
import { getUsersByRole, createUser } from "../controllers/user.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = express.Router();

router.get("/", authenticate, authorizeRoles("ADMIN"), getUsersByRole);
router.post("/", authenticate, authorizeRoles("ADMIN"), createUser);

export default router;
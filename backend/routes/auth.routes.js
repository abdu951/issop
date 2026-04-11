import express from "express";
import {
  register,
  login,
  logout,
  getMe,
  refresh,
} from "../controllers/auth.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", authenticate, getMe);
router.post("/refresh", refresh);

export default router;
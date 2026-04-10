import express from "express";
import * as reportController from "./report.controller.js";


const router = express.Router();

// Create report
router.post("/", reportController.createReport);

// Get all reports (public or admin)
router.get("/", reportController.getAllReports);

// Get current user reports
router.get("/me", reportController.getMyReports);

// Get single report
router.get("/:id", reportController.getSingleReport);

export default router;
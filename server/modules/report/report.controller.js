import * as reportService from "./report.service.js";

export const createReport = async (req, res) => {
  try {
    const report = await reportService.createReport(
      req.body,
      req.user.id
    );

    res.status(201).json(report);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllReports = async (req, res) => {
  try {
    const reports = await reportService.getAllReports();
    res.json(reports);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getMyReports = async (req, res) => {
  try {
    const reports = await reportService.getUserReports(req.user.id);
    res.json(reports);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getSingleReport = async (req, res) => {
  try {
    const report = await reportService.getSingleReport(req.params.id);

    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    res.json(report);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
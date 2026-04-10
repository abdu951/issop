import { createReport } from "./report.service.js";
import { catchAsync } from "../../utils/catchAsync.js";

export const create = catchAsync(async (req, res) => {
  const report = await createReport(req.user.id, req.body);

  res.status(201).json({
    success: true,
    data: report,
  });
});
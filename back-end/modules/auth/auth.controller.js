import { registerUser, loginUser } from "./auth.service.js";
import { catchAsync } from "../../utils/catchAsync.js";

export const register = catchAsync(async (req, res) => {
  const user = await registerUser(req.body);
  res.status(201).json({ success: true, data: user });
});

export const login = catchAsync(async (req, res) => {
  const result = await loginUser(req.body);
  res.json({ success: true, data: result });
});
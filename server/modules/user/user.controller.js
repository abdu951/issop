import * as service from "./user.service.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

export const createUser = asyncHandler(async (req, res) => {
  const user = await service.createUser(req.body, req.user);

  res.status(201).json({ user });
});

export const getUsersByRole = asyncHandler(async (req, res) => {
  const users = await service.getUsersByRole(req.query.role);

  res.json(users);
});
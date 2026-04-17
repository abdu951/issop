import bcrypt from "bcrypt";
import * as repo from "./user.repository.js";
import { AppError } from "../../utils/AppError.js";

const ALLOWED_ROLES = ["ADMIN", "AGENT"];

export const createUser = async (data, currentUser) => {
  // 🔐 Authorization check (better here than controller)
  if (currentUser.role !== "ADMIN") {
    throw new AppError("Forbidden", 403);
  }

  const { name, email, password, role } = data;

  if (!ALLOWED_ROLES.includes(role)) {
    throw new AppError("Invalid role", 400);
  }

  const existing = await repo.findUserByEmail(email);

  if (existing) {
    throw new AppError("Email already exists", 400);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await repo.createUser({
    name,
    email,
    password: hashedPassword,
    role,
  });

  // 🔒 remove password before returning
  const { password: _, ...safeUser } = user;

  return safeUser;
};

export const getUsersByRole = async (role) => {
  return repo.findUsersByRole(role);
};
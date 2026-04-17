import bcrypt from "bcrypt";
import * as repo from "./auth.repository.js";
import { AppError } from "../../utils/AppError.js";
import {
  generateAccessToken
} from "../../utils/token.js";

export const register = async ({ name, email, password }) => {
  const existingUser = await repo.findUserByEmail(email);

  if (existingUser) {
    throw new AppError("User already exists", 400);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await repo.createUser({
    name,
    email,
    password: hashedPassword,
  });

  return user;
};

export const login = async ({ email, password }) => {
  const user = await repo.findUserByEmail(email);

  if (!user) {
    throw new AppError("Invalid credentials", 400);
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new AppError("Invalid credentials", 400);
  }

  const accessToken = generateAccessToken(user);

  return {
    accessToken,
    user,
  };
};
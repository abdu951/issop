import * as service from "./auth.service.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: false, // true in production
  sameSite: "lax",
};

export const register = asyncHandler(async (req, res) => {
  const user = await service.register(req.body);

  res.status(201).json({
    message: "User created",
    user,
  });
});

export const login = asyncHandler(async (req, res) => {
  const { accessToken, user } = await service.login(req.body);

  res
    .cookie("accessToken", accessToken, {
      ...COOKIE_OPTIONS,
      maxAge: 30 * 60 * 1000,
    })
    .json({
      message: "Logged in",
      user: { role: user.role },
    });
});

export const getMe = asyncHandler(async (req, res) => {
  res.json({ user: req.user });
});

export const logout = asyncHandler(async (req, res) => {
  if (!req.cookies.accessToken) {
    throw new AppError("No token found", 400);
  }

  res.clearCookie("accessToken", {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
  }).json({
    message: "Logged out",
  });
});
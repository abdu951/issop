import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/token.js";

const prisma = new PrismaClient();

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: false, // set false in development
  sameSite: "lax",
};

/**
 * REGISTER
 */
export const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json({ message: "User created", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * LOGIN
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // Save refresh token in DB
    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    res
      .cookie("accessToken", accessToken, {
        ...COOKIE_OPTIONS,
        maxAge: 15 * 60 * 1000,
      })
      .cookie("refreshToken", refreshToken, {
        ...COOKIE_OPTIONS,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json({ message: "Logged in" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * GET CURRENT USER (AUTH CHECK)
 */
export const getMe = async (req, res) => {
  res.json({ user: req.user });
};

/**
 * LOGOUT
 */
export const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (refreshToken) {
      await prisma.refreshToken.deleteMany({
        where: { token: refreshToken },
      });
    }

    res
      .clearCookie("accessToken")
      .clearCookie("refreshToken")
      .json({ message: "Logged out" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * REFRESH TOKEN
 */
export const refresh = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;

    if (!token) {
      return res.status(401).json({ message: "No token" });
    }

    const stored = await prisma.refreshToken.findUnique({
      where: { token },
    });

    if (!stored) {
      return res.status(403).json({ message: "Invalid token" });
    }

    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

    const newAccessToken = generateAccessToken({ id: decoded.id });

    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });

    res.json({ message: "Token refreshed" });

  } catch (err) {
    res.status(403).json({ error: err.message });
  }
};



// get all agents
export const getAgents = async (req, res) => {
  const agents = await prisma.user.findMany({
    where: { role: "AGENT" },
    select: { id: true, email: true },
  });

  res.json(agents);
};


// promote user (admin only later)
//PATCH /api/users/role

//GET /api/users?role=AGENT
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
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    
    console.log("REGISTERED USER:", user); // 👈 ADD THIS
    res.status(201).json({ message: "User created", user });
  } catch (err) {
    console.error("REGISTER ERROR:", err); // 👈 ADD THIS
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


    res
      .cookie("accessToken", accessToken, {
        ...COOKIE_OPTIONS,
        maxAge: 30 * 60 * 1000,
      })
      
      .json({ message: "Logged in", user: { role: user.role } });
      console.log("USER LOGGED IN:", user); // 👈 ADD THIS

  } catch (err) {
    console.error("LOGIN ERROR:", err); // 👈 ADD THIS
    res.status(500).json({ error: err.message });
  }
};

/**
 * GET CURRENT USER (AUTH CHECK)
 */
export const getMe = async (req, res) => {
  console.log("GET ME:", req.user); // 👈 ADD THIS
  res.json({ user: req.user });
};

/**
 * LOGOUT
 */
export const logout = async (req, res) => {
  try { 
    const token = req.cookies.accessToken;

    if (!token) {
      return res.status(400).json({ message: "No token found" });
    }
    res
      .clearCookie("accessToken")
      .json({ message: "Logged out" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


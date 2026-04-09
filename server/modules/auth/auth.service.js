import prisma from '../../lib/prisma.js';
import { hashPassword, comparePassword } from '../../utils/hash.js';
import {
  generateAccessToken,
  generateRefreshToken,
} from '../../utils/jwt.js';

export const register = async ({ email, password }) => {
  const hashed = await hashPassword(password);

  const user = await prisma.user.create({
    data: { email, password: hashed },
  });

  return user;
};

export const login = async ({ email, password }) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) throw new Error('User not found');

  const isValid = await comparePassword(password, user.password);
  if (!isValid) throw new Error('Invalid credentials');

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  // store refresh token in DB
  await prisma.session.create({
    data: {
      refreshToken,
      userId: user.id,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });

  return { accessToken, refreshToken };
};

export const refresh = async (refreshToken) => {
  const session = await prisma.session.findUnique({
    where: { refreshToken },
  });

  if (!session) throw new Error('Invalid refresh token');

  const accessToken = generateAccessToken({ id: session.userId });

  return { accessToken };
};

export const logout = async (refreshToken) => {
  await prisma.session.delete({
    where: { refreshToken },
  });
};
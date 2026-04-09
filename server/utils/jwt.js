import jwt from 'jsonwebtoken';

export const generateAccessToken = (user) => {
  return jwt.sign({ userId: user.id }, process.env.ACCESS_SECRET, {
    expiresIn: '15m',
  });
};

export const generateRefreshToken = (user) => {
  return jwt.sign({ userId: user.id }, process.env.REFRESH_SECRET, {
    expiresIn: '7d',
  });
};

export const verifyAccessToken = (token) => {
  return jwt.verify(token, process.env.ACCESS_SECRET);
};
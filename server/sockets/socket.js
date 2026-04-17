import { Server } from "socket.io";
import jwt from "jsonwebtoken";

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
      credentials: true,
    },
  });

  // 🔐 Auth middleware for socket
  io.use((socket, next) => {
    const token = socket.handshake.auth.token;

    if (!token) return next(new Error("Unauthorized"));

    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      socket.user = decoded;
      next();
    } catch (err) {
      next(new Error("Invalid token"));
    }
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.user.id);

    // 🔥 join room = userId
    socket.join(socket.user.id);

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.user.id);
    });
  });
};

export const getIO = () => {
  if (!io) throw new Error("Socket not initialized");
  return io;
};
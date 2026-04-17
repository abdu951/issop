import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./modules/auth/auth.routes.js";
import issueRoutes from "./modules/auth/auth.routes.js";
import notificationRoutes from "./modules/auth/auth.routes.js";
import userRoutes from "./modules/auth/auth.routes.js";
import cors from "cors";

const app = express();

const allowedOrigins = ['http://localhost:3000']

app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: allowedOrigins, credentials: true}));

app.use("/api/auth", authRoutes);
app.use("/api/issues", issueRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/users", userRoutes);

export default app;
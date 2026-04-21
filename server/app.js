import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./modules/auth/auth.routes.js";
import issueRoutes from "./modules/issue/issue.routes.js";
import notificationRoutes from "./modules/notification/notification.routes.js";
import userRoutes from "./modules/user/user.routes.js";
import { errorHandler } from "./middleware/error.middleware.js";
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


app.use(errorHandler);

export default app;
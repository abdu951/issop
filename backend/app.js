import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import issueRoutes from "./routes/issue.routes.js";
import notificationRoutes from "./routes/notification.routes.js"

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/issues", issueRoutes);
app.use("/api/notifications", notificationRoutes);

export default app;
import express from 'express';
import authRoutes from './modules/auth/auth.routes.js';
import reportRoutes from './modules/report/report.routes.js';

const app = express();
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/reports', reportRoutes);

export default app;
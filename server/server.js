/*import express from 'express';
import pool from './configs/db.js';

const app = express();
const PORT = 3000;


await pool.query('SELECT NOW()');

// Middleware (optional but common)
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
  res.send('Hello, Express is working!');
});


// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
*/


import dotenv from 'dotenv';
dotenv.config();

import app from './app.js';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
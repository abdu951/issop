import express from 'express';

const app = express();
const PORT = 3000;

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
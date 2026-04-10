/*import dotenv from "dotenv";
dotenv.config(); */
import "dotenv/config";

import app from "./app.js";


const PORT = process.env.PORT || 5000;

console.log("DB URL:", process.env.DATABASE_URL);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
import dotenv from "dotenv";
dotenv.config();

import http from "http";
import app from "./app.js";
import { initSocket } from "./sockets/socket.js";

const server = http.createServer(app);

initSocket(server);

const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
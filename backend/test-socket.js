import { io } from "socket.io-client";

const socket = io("http://localhost:5000", {
  auth: {
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc2OTI1Y2M5LTFlOTMtNDljOS1iMjg5LTI0ZGMyMzUzMjg0MSIsImlhdCI6MTc3NjA1ODE5NCwiZXhwIjoxNzc2NjYyOTk0fQ.u60-wSLhWIS_BuLGD3M2XnDGkiPuL3atm4oWiOLf95U", // paste here
  },
});

socket.on("connect", () => {
  console.log("✅ Connected:", socket.id);
});

socket.on("notification", (data) => {
  console.log("🔔 New notification:", data);
});
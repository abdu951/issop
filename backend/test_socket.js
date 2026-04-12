import { io } from "socket.io-client";

const socket = io("http://localhost:5000", {
  auth: {
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjNkMWQ0NTVmLWI3YWEtNDk2Yi05MmExLTQxM2ZjNjU2YzY0ZCIsImVtYWlsIjoidXNlQGV4YW1wbGUuY29tIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzc2MDA0NTM1LCJleHAiOjE3NzYwMDU0MzV9.NMPmoYc1pxcgHywMcMdwVi1N-5gevSqzPX5Dx26nqPw", // paste here
  },
});

socket.on("connect", () => {
  console.log("✅ Connected:", socket.id);
});

socket.on("notification", (data) => {
  console.log("🔔 New notification:", data);
});
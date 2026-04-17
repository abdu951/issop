import api from "@/lib/axios";


// REGISTER
export const registerUser = (data) =>
  api.post("/auth/register", data);

// LOGIN
export const loginUser = (data) =>
  api.post("/auth/login", data);

// GET ME
export const getMe = () =>
  api.get("/auth/me");

// LOGOUT
export const logoutUser = () =>
  api.post("/auth/logout");
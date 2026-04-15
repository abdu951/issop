import api from "@/lib/axios";

{/*import api from "@/lib/axios";


export const registerUser = async (data) => {
  const res = await api.post("/auth/register", data);
  return res.data;
};

export const loginUser = async (data) => {
  const res = await api.post("/auth/login", data);
  return res.data;
};


export const getMe = async () => {
  const res = await api.get("/auth/me"); // adjust route if needed
  return res.data;
}; */}





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
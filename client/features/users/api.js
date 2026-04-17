import api from "@/lib/axios";

export const getAgents = async () => {
  const res = await api.get("/users?role=AGENT");
  return res.data;
};



export const createUser = (data) => {
  return api.post("/users", data);
};
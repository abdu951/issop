import { useQuery, useMutation } from "@tanstack/react-query";
import { getAgents, createUser } from "./api";
import toast from "react-hot-toast";

export const useAgents = () =>
  useQuery({
    queryKey: ["agents"],
    queryFn: getAgents,
  });



export const useCreateUser = () => {
  return useMutation({
    mutationFn: createUser,

    onSuccess: () => {
      toast.success("User created successfully");
    },

    onError: (err) => {
      toast.error(err.response?.data?.message || "Something went wrong");
    },
  });
};
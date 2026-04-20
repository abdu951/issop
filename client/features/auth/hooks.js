import { useMutation, useQuery } from "@tanstack/react-query";
import {
  registerUser,
  loginUser,
  getMe,
  logoutUser,
} from "./api";
import { useAuthStore } from "./store";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

// REGISTER
export const useRegister = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      router.push("/login");
    },
  });
};

// LOGIN


export const useLogin = () => {
  const router = useRouter();
  const setUser = useAuthStore((s) => s.setUser);

  return useMutation({
    mutationFn: loginUser,

    onSuccess: (res) => {
      const user = res.data.user; 
      
      setUser(user);

      if (user.role === "ADMIN") {
        router.push("/issues");
      } else if (user.role === "AGENT") {
        router.push("/issues/assign");
      } else {
        router.push("/issues/my");
      }
    },
  });
};


// GET ME 
export const useGetMe = () => {
  const setUser = useAuthStore((s) => s.setUser);

  return useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    retry: false,
    onSuccess: (res) => {
      setUser(res.data.user);
    },
    onError: () => {
      useAuthStore.getState().logout();
    },
  });
};


// LOGOUT
export const useLogout = () => {
  const router = useRouter();
  const logout = useAuthStore((s) => s.logout);

  return useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      logout();
      router.push("/login");
      toast.success("Logged out successfully");
    },
  });
};
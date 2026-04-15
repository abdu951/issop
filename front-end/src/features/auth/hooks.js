{/*import { useMutation, useQuery } from "@tanstack/react-query";
import { loginUser, registerUser, getMe } from "./api";
import { useAuthStore } from "./store";



export const useRegister = () => {
  const setAuth = useAuthStore((s) => s.setAuth);

  return useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      setAuth(data.user);
    },
  });
};

export const useLogin = () => {
  const setAuth = useAuthStore((s) => s.setAuth);

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      setAuth(data.user, data.accessToken);
    },
  });
};



export const useGetMe = () => {
  const setAuth = useAuthStore((s) => s.setAuth);
  const token = useAuthStore((s) => s.token);

  return useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    enabled: !!token, // only run if token exists
    onSuccess: (data) => {
      setAuth(data.user, token); // restore user
    },
    onError: () => {
      // token invalid → logout
      useAuthStore.getState().logout();
    },
  });
}; */}




import { useMutation, useQuery } from "@tanstack/react-query";
import {
  registerUser,
  loginUser,
  getMe,
  logoutUser,
} from "./api";
import { useAuthStore } from "./store";
import { useRouter } from "next/navigation";


// 🔐 REGISTER
export const useRegister = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      router.push("/login");
    },
  });
};


// 🔐 LOGIN
export const useLogin = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      router.push("/issues"); // go to dashboard
    },
  });
};


// 🔐 GET ME (CRITICAL)
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


// 🔐 LOGOUT
export const useLogout = () => {
  const router = useRouter();
  const logout = useAuthStore((s) => s.logout);

  return useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      logout();
      router.push("/login");
    },
  });
};
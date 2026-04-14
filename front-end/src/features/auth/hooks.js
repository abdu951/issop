import { useMutation, useQuery } from "@tanstack/react-query";
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
};
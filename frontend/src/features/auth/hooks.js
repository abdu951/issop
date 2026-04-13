import { useMutation } from "@tanstack/react-query";
import { loginUser } from "./api";
import { useAuthStore } from "./store";

export const useLogin = () => {
  const setAuth = useAuthStore((s) => s.setAuth);

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      setAuth(data.user, data.accessToken);
    },
  });
};
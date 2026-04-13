import { useMutation } from "@tanstack/react-query";
import { markAsRead } from "./api";
import { useNotificationStore } from "./store";

export const useMarkAsRead = () => {
  const { notifications } = useNotificationStore();

  return useMutation({
    mutationFn: markAsRead,
  });
};
import { useQuery } from "@tanstack/react-query";
import { getNotifications } from "./api";
import { useNotificationStore } from "./store";

export const useNotifications = () => {
  const setNotifications = useNotificationStore((s) => s.setNotifications);

  return useQuery({
    queryKey: ["notifications"],
    queryFn: getNotifications,
    onSuccess: (data) => {
      setNotifications(data);
    },
  });
};
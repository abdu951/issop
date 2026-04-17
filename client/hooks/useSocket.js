import { useEffect } from "react";
import { connectSocket } from "@/lib/socket";
import { useAuthStore } from "@/features/auth/store";
import { useNotificationStore } from "@/features/notifications/store";
import toast from "react-hot-toast";

export const useSocket = () => {
  const token = useAuthStore((s) => s.token);
  const addNotification = useNotificationStore((s) => s.addNotification);

  useEffect(() => {
    if (!token) return;

    const socket = connectSocket(token);

    socket.on("notification", (data) => {
      addNotification(data);
      toast.success(data.message);
    });

    return () => {
      socket.disconnect();
    };
  }, [token]);
};



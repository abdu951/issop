import { useEffect } from "react";
import { connectSocket } from "@/lib/socket";
import { useNotificationStore } from "@/features/notifications/store";
import { useAuthStore } from "@/features/auth/store";
import toast from "react-hot-toast";

export const useSocket = () => {
  const addNotification = useNotificationStore((s) => s.addNotification);
  const user = useAuthStore((s) => s.user);


  useEffect(() => {
    
    if (!user) return; 
    const socket = connectSocket();

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });

    socket.on("notification", (notif) => {
      console.log("Realtime:", notif);

      addNotification(notif);
      toast.success(notif.message);
    });

    socket.on("connect_error", (err) => {
      console.log("Socket error:", err.message);
    });

    return () => {
      socket.disconnect();
    };
  }, [user]);
};



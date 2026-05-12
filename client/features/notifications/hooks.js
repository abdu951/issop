{/*import { useQuery } from "@tanstack/react-query";
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
};   */}


import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { getNotifications, markNotificationAsRead } from "./api";
import { useNotificationStore } from "./store";

export const useNotifications = () => {
  const setNotifications = useNotificationStore((s) => s.setNotifications);

  const { data } = useQuery({
    queryKey: ["notifications"],
    queryFn: getNotifications,
  });

  useEffect(() => {
    if (data) {
      setNotifications(data);
    }
  }, [data, setNotifications]);

  return { data };
};


// hooks for marking notification as read by id and as an action isRead is true and then refetch the notifications
export const useMarkNotificationAsRead = () => {
  const setNotifications = useNotificationStore((s) => s.setNotifications);

  return (id) => {
    return useQuery({
      queryKey: ["notifications"],
      queryFn: () => getNotifications(),
      onSuccess: (data) => {
        setNotifications(data);
      },
    });
  };
};

// RESOLVE
export const useMarkNotificationsRead = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: markNotificationAsRead,
    onSuccess: () => {
      qc.invalidateQueries(["notifications"]);
    },
  });
};
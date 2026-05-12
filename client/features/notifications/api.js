import api from "@/lib/axios";

export const getNotifications = async () => {
  const res = await api.get("/notifications");
  return res.data;
};

{/* export const markNotificationAsRead = async (id, userId) => {
  const res = await api.patch(`/${id}/read`, {
    id,
    userId,
  });
  return res.data;
}; */}

// function to mark notification as read by id
export const markNotificationAsRead = async (id) => {
  const res = await api.patch(`/notifications/${id}/read`);
  return res.data;
};


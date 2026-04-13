export const markAsRead = async (id) => {
  const res = await api.patch(`/notifications/${id}/read`);
  return res.data;
};
import { create } from "zustand";

export const useNotificationStore = create((set) => ({
  notifications: [],
  unread: 0,

  addNotification: (notif) =>
    set((state) => ({
      notifications: [notif, ...state.notifications],
      unread: state.unread + 1,
    })),

  setNotifications: (data) =>
    set({
      notifications: data,
      unread: data.filter((n) => !n.isRead).length,
    }),
}));
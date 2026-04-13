markOneRead: (id) =>
  set((state) => {
    const updated = state.notifications.map((n) =>
      n.id === id ? { ...n, isRead: true } : n
    );

    return {
      notifications: updated,
      unread: updated.filter((n) => !n.isRead).length,
    };
  })
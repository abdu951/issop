"use client";

import { useState } from "react";
import { useNotificationStore } from "@/features/notifications/store";

export default function NotificationDropdown() {
  const [open, setOpen] = useState(false);

  const { notifications } = useNotificationStore();

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)}>🔔</button>

      {open && (
        <div className="absolute right-0 mt-2 w-64 bg-white shadow p-2">
          {notifications.length === 0 && <p>No notifications</p>}

          {notifications.map((n) => (
            <div key={n.id} className="border-b p-2 text-sm">
              {n.message}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
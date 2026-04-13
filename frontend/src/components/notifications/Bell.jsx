"use client";

import { useNotificationStore } from "@/features/notifications/store";
import NotificationDropdown from "./Dropdown";

export default function Bell() {
  const { unread } = useNotificationStore();

  return (
    <div className="relative">
      <NotificationDropdown />

      {unread > 0 && (
        <span className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1 rounded">
          {unread}
        </span>
      )}
    </div>
  );
}
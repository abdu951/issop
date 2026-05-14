"use client";

import { useState } from "react";
import { useNotificationStore } from "@/features/notifications/store";
import { useRouter } from "next/navigation";
import { useMarkNotificationsRead } from "@/features/notifications/hooks";



export default function NotificationDropdown() {

  const router = useRouter();
  const markAsRead = useMarkNotificationsRead();
  const [open, setOpen] = useState(false);
  const notifications = useNotificationStore((s) => s.notifications);
  console.log("Notifications:", notifications);

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="cursor-pointer">🔔</button>

      {open && (
        <div className="absolute right-0 mt-2 w-64 bg-white shadow p-2">
          {notifications.length === 0 && <p>No notifications</p>}

          {notifications.map((n) => (
            <div onClick={() => {
              setOpen(false);
              router.push(`/issues/${n.issueId}`);
              markAsRead.mutate(n.id);
            }} key={n.id} className="border-b p-2 text-sm cursor-pointer">
              {n.message}
            </div>
          ))}
        </div>
      )}  
    </div>
  );
}

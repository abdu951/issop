"use client";


import { useGetMe } from "@/features/auth/hooks";
import { useSocket } from "@/hooks/useSocket";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import { useNotifications } from "@/features/notifications/hooks";


export default function DashboardLayout({ children }) {
  const { isLoading } = useGetMe();
  useSocket();
  useNotifications();


  if (!isLoading) {
    return (
        <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <div className="p-6">{children}</div>
      </div>
    </div>

    );
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return <>{children}</>;
}
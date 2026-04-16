"use client";

{/*"use client";

import { useGetMe } from "@/features/auth/hooks";

export default function DashboardLayout({ children }) {
  useGetMe(); // 🔥 THIS LINE IS KEY

  return <>{children}</>;
} */}





import { useGetMe } from "@/features/auth/hooks";
import { useSocket } from "@/hooks/useSocket";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";

export default function DashboardLayout({ children }) {
  const { isLoading } = useGetMe();
  useSocket();


  if (!isLoading) {
    return (
      <div>
        <Navbar />
        <div className="p-6">{children}</div>
      </div>

    );
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return <>{children}</>;
}
"use client";

import { useSocket } from "@/hooks/useSocket";

export default function DashboardLayout({ children }) {
  useSocket();

  return <div>{children}</div>;
}

{/*

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/features/auth/store";
import Navbar from "@/components/layout/Navbar";

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const token = useAuthStore((s) => s.token);

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [token]);

  return (
    <>
      <Navbar />
      <div className="p-6">{children}</div>
    </>
  );
} */}


{/*import Navbar from "@/components/layout/Navbar";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
} */}


{/* import Sidebar from "@/components/layout/Sidebar";

return (
  <div className="flex">
    <Sidebar />
    <div className="flex-1">
      <Navbar />
      <div className="p-6">{children}</div>
    </div>
  </div>
);  */}
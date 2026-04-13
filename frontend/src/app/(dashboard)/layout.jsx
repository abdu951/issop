"use client";

import { useSocket } from "@/hooks/useSocket";

export default function DashboardLayout({ children }) {
  useSocket();

  return <div>{children}</div>;
}


{/*import Navbar from "@/components/layout/Navbar";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
} */}
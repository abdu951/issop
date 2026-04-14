"use client";

import { useGetMe } from "@/features/auth/hooks";

export default function DashboardLayout({ children }) {
  useGetMe(); // 🔥 THIS LINE IS KEY

  return <>{children}</>;
}
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/features/auth/store";
import { useGetMe } from "@/features/auth/hooks";

export default function RedirectPage() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);

  const { isLoading } = useGetMe();

  useEffect(() => {
    if (isLoading) return;
    if (!user) return;

    if (user.role === "ADMIN") {
      router.replace("/admin");
    } else if (user.role === "AGENT") {
      router.replace("/issues/assign");
    } else {
      router.replace("/issues/my");
    }
  }, [isLoading, user]);

  return <p>Redirecting...</p>;
}
"use client";

{/*import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/features/auth/store";

export default function HomePage() {
  const router = useRouter();
  const token = useAuthStore((s) => s.token);

  useEffect(() => {
    if (token) {
      router.push("/issues"); // dashboard
    } else {
      router.push("/login");
    }
  }, [token]);

  return (
    <div className="flex justify-center items-center h-screen">
      <p>Loading...</p>
    </div>
  );
} */}

import Image from "next/image";
import CreateIssueForm  from "@/features/issues/components/CreateIssueForm";

export default function Home() {
  return (
    <div >
      < CreateIssueForm />
    </div>
  );
}

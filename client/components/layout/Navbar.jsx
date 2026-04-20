"use client";

import Bell from "../notifications/Bell";
import { useLogout } from "@/features/auth/hooks";

export default function Navbar() {
  const { mutate, isPending } = useLogout();



  return (
    <div className="flex justify-between items-center px-6 py-3 border-b bg-white shadow">
      <h1 className="font-bold text-lg">ISSOP</h1>

      <div className="flex items-center gap-4">
        <Bell />

        <button
          onClick={() => mutate()}
          disabled={isPending}
          className="cursor-pointer bg-red-500 text-white px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
} 
"use client";

{/*import Bell from "../notifications/Bell";

export default function Navbar() {
  return (
    <div className="flex justify-between p-4 border-b">
      <h1>ISSOP</h1>

      <Bell />
    </div>
  );
} */}


import Bell from "../notifications/Bell";
//import { useAuthStore } from "@/features/auth/store";
import { useLogout } from "@/features/auth/hooks";


export default function Navbar() {
  //const logout = useAuthStore((s) => s.logout);
  const { mutate } = useLogout();

  const logout = () => mutate();

  return (
    <div className="flex justify-between items-center px-6 py-3 border-b bg-white shadow">
      <h1 className="font-bold text-lg">ISSOP</h1>

      <div className="flex items-center gap-4">
        <Bell />

        <button
          onClick={logout}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
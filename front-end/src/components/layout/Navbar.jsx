"use client";


import Bell from "../notifications/Bell";
import { useLogout } from "@/features/auth/hooks";
import { useRole } from "@/hooks/useRole";


export default function Navbar() {
  //const logout = useAuthStore((s) => s.logout);
  const { mutate } = useLogout();

  const logout = () => mutate();
  const { isAdmin, isAgent} = useRole();
  
  const greeting = isAdmin
  ? "Hi! Admin"
  : isAgent
  ? "Hi! Agent"
  : "Hi! Citizen";

  return (

   <div className="max-h-18 flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-black/60 transition-all duration-300">
                <h1 className="text-2xl font-bold text-white">{greeting}</h1>
                <div className="flex items-center gap-5 text-white">
                     <Bell /> 
                    <button onClick={logout} className='border rounded-full text-sm px-4 py-1'>Logout</button>
                </div>
        </div>
  );
}
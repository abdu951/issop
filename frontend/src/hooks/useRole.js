import { useAuthStore } from "@/features/auth/store";

export const useRole = () => {
  const user = useAuthStore((s) => s.user);

  return {
    isAdmin: user?.role === "ADMIN",
    isAgent: user?.role === "AGENT",
    isCitizen: user?.role === "CITIZEN",
  };
};
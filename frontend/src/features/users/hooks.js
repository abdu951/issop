import { useQuery } from "@tanstack/react-query";
import { getAgents } from "./api";

export const useAgents = () =>
  useQuery({
    queryKey: ["agents"],
    queryFn: getAgents,
  });
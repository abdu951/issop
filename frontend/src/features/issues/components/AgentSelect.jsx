"use client";

import { useAgents } from "@/features/users/hooks";

export default function AgentSelect({ onSelect }) {
  const { data, isLoading } = useAgents();

  if (isLoading) return <p>Loading agents...</p>;

  return (
    <select
      className="border p-1"
      onChange={(e) => onSelect(e.target.value)}
    >
      <option value="">Select Agent</option>

      {data?.map((agent) => (
        <option key={agent.id} value={agent.id}>
          {agent.email}
        </option>
      ))}
    </select>
  );
}
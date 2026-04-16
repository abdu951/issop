"use client";

import { useAuthStore } from "@/features/auth/store";
import { useAssignIssue, useResolveIssue } from "@/features/issues/hooks";
import { useState } from "react";
import AgentSelect from "./AgentSelect";



export default function IssueCard({ issue }) {
  const user = useAuthStore((s) => s.user);

  const assign = useAssignIssue();
  const resolve = useResolveIssue();
  const [agentId, setAgentId] = useState("");

  return (
    <div className="border p-4 rounded">
      <h2 className="font-bold">{issue.title}</h2>
      <p>{issue.description}</p>
      <p className="text-sm">{issue.location}</p>
      <p>Status: {issue.status}</p>


      {user?.role === "ADMIN" && (
  <div className="space-x-2">
    <AgentSelect onSelect={setAgentId} />

    <button
      disabled={!agentId}
      onClick={() =>
        assign.mutate({
          issueId: issue.id,
          agentId,
        })
      }
      className="bg-blue-500 text-white px-3 py-1"
    >
      Assign
    </button>
  </div>
)}

      {/* AGENT */}
      {user?.role === "AGENT" && (
        <button
          onClick={() => resolve.mutate(issue.id)}
          className="bg-green-500 text-white px-3 py-1"
        >
          Resolve
        </button>
      )}
    </div>
  );
}


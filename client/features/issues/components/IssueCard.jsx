"use client";

import { useAuthStore } from "@/features/auth/store";
import { useAssignIssue, useResolveIssue } from "@/features/issues/hooks";
import { useState } from "react";
import AgentSelect from "./AgentSelect";
import IssueActions from "./IssueActions";

const [agentId, setAgentId] = useState("");

export default function IssueCard({ issue }) {
  const user = useAuthStore((s) => s.user);

  const assign = useAssignIssue();
  const resolve = useResolveIssue();

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
       <IssueActions issue={issue} />
    </div>
  );
}




{/*import { useRole } from "@/hooks/useRole";

const { isAdmin, isAgent } = useRole();

{isAdmin && <AssignButton />}
{isAgent && <ResolveButton />}*/}


{/*<div className="bg-white shadow rounded p-4 hover:shadow-md transition">
  <h2 className="font-semibold text-lg">{issue.title}</h2>
  <p className="text-gray-600">{issue.description}</p>

  <div className="flex justify-between mt-2 text-sm">
    <span className="text-blue-500">{issue.location}</span>
    <span className="font-medium">{issue.status}</span>
  </div>
</div> */}
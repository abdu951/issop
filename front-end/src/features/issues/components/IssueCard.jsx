"use client";

import { useAuthStore } from "@/features/auth/store";
import { useAssignIssue, useResolveIssue } from "@/features/issues/hooks";
import { useRole } from "@/hooks/useRole";


export default function IssueCard({ issue }) {
  const user = useAuthStore((s) => s.user);

  const assign = useAssignIssue();
  const resolve = useResolveIssue();
  const { isAdmin, isAgent } = useRole();
  


  return (
    <div className="border p-4 rounded">
      <h2 className="font-bold">{issue.title}</h2>
      <p>{issue.description}</p>
      <p className="text-sm">{issue.location}</p>
      <p>Status: {issue.status}</p>

      {/* ADMIN */}
      {isAdmin && (
        <button
          onClick={() =>
            assign.mutate({
              issueId: issue.id,
              agentId: "AGENT_ID_HERE",
            })
          }
          className="bg-blue-500 text-white px-3 py-1"
        >
          Assign
        </button>
      )}

      {/* AGENT */}
      {isAgent && (
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






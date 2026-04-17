"use client";

import { useRespondToIssue } from "../hooks";
import { useRole } from "@/hooks/useRole";
import { useAuthStore } from "@/features/auth/store";

export default function IssueActions({ issue }) {
  const { isAgent } = useRole();
  const user = useAuthStore((s) => s.user);
  const { mutate, isPending } = useRespondToIssue();

  if (!isAgent || issue.assignedToId !== user?.id) return null;

  if (issue.status !== "PENDING") return null;

  const handleAction = (action) => {
    mutate({
      issueId: issue.id,
      action,
    });
  };

  return (
    <div className="flex gap-2 mt-3">
      <button
        disabled={isPending}
        onClick={() => handleAction("accept")}
        className="px-3 py-1 bg-green-600 text-white rounded"
      >
        Accept
      </button>

      <button
        disabled={isPending}
        onClick={() => handleAction("reject")}
        className="px-3 py-1 bg-red-600 text-white rounded"
      >
        Reject
      </button>
    </div>
  );
}
"use client";

import { useRespondToIssue } from "@/features/issues/hooks";
import { useRouter } from "next/navigation";


export default function IssueActions({ issue }) {

  const { mutate, isPending } = useRespondToIssue();
  const router = useRouter();
 

  const handleAction = (action) => {
    mutate({
      issueId: issue.id,
      action,
    });
  };

  return (
    
      <div className="border p-4 rounded cursor-pointer" onClick={() => router.push(`/issues/${issue.id}`)}>
      <h2 className="font-bold">{issue.title}</h2>
      <p>{issue.description}</p>
      <p className="text-sm">{issue.location}</p>
      <p>Status: {issue.status}</p>
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
    </div>
  );
}
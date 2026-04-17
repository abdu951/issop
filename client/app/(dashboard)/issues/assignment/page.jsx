"use client";

import { useIssues } from "@/features/issues/hooks";
import IssueCard from "@/features/issues/components/IssueCard";

export default function AssignIssuesPage() {
  const { data, isLoading } = useIssues();

  if (isLoading) return <p>Loading...</p>;

  const issues = data?.data || []; // ✅ safe fallback

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold">Assigned Issues</h1>

      {issues.map((issue) => (
        <IssueCard key={issue.id} issue={issue} />
      ))}
    </div>
  );
}
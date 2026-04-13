"use client";

import { useAllIssues } from "@/features/issues/hooks";
import IssueList from "@/features/issues/components/IssueList";

export default function IssuesPage() {
  const { data, isLoading } = useAllIssues();

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">All Issues</h1>
      <IssueList issues={data} />
    </div>
  );
}
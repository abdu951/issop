"use client";

import { useAllIssues } from "@/features/issues/hooks";
import IssueList from "@/features/issues/components/IssueList";
import IssueCard from "@/features/issues/components/IssueCard";

export default function IssuesPage() {
  const { data, isLoading } = useAllIssues();

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">All Issues</h1>
      <IssueCard issue={data[0]} /> {/* Display the first issue for assignment */}
    </div>
  );
}
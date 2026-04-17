"use client";

import { useMyIssues } from "@/features/issues/hooks";
import IssueList from "@/features/issues/components/IssueList";

export default function MyIssuesPage() {
  const { data, isLoading } = useMyIssues();

  if (isLoading) return <p>Loading...</p>;

  return <IssueList issues={data} />;
}
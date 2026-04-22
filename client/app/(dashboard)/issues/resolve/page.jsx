"use client";



import { useAgentIssues } from "@/features/issues/hooks";
import IssueCard from "@/features/issues/components/IssueCard";


export default function IssuesResolvePage() {

  const { data, isLoading } = useAgentIssues();
  const issues= data || [];

  return (
    <div>
      {/*LIST */}
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              issues.map((issue) => (
                <IssueCard key={issue.id} issue={issue} />
              ))
            )}
    </div>
  );
}
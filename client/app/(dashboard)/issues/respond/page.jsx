"use client";



import { useAgentIssues } from "@/features/issues/hooks";
import IssueActions from "@/features/issues/components/IssueActions";

export default function IssuesRespondPage() {

  const { data, isLoading } = useAgentIssues();
  const issues= data || [];

  return (
    <div>
      {/*LIST */}
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              issues.map((issue) => (
                <IssueActions key={issue.id} issue={issue} />
              ))
            )}
    </div>
  );
}
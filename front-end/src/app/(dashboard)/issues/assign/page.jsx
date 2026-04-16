
import IssueCard from "@/features/issues/components/IssueCard";
import { useAllIssues } from "@/features/issues/hooks";

export default function AgentPage() {

    const { data, isLoading } = useAllIssues("ASSIGNED");
    

  return (
    <div >
         <h1 className="text-xl font-bold mb-4">Assigned Issues</h1>
            {isLoading ? (
        <p>Loading...</p>
      ) : (
        data?.data.map((issue) => (
          <IssueCard key={issue.id} issue={issue} />
        ))
      )}
    </div>
  );
}
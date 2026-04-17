"use client";

import IssueCard from "./IssueCard";

export default function IssueList({ issues }) {
  return (
    <div className="grid gap-4">
      {issues?.map((issue) => (
        <IssueCard key={issue.id} issue={issue} />
      ))}
    </div>
  );
}
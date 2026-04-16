"use client";

import { useState } from "react";
import { useAllIssues } from "@/features/issues/hooks";
import IssueCard from "./IssueCard";

export default function IssuesFilter() {
  const [status, setStatus] = useState("");

  const { data, isLoading } = useAllIssues(status);

  const issues = data?.data || [];

  return (
    <div className="space-y-4">
      {/* 🔽 FILTER DROPDOWN */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Issues</h1>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border px-3 py-2 rounded-lg"
        >
          <option value="">All</option>
          <option value="PENDING">Pending</option>
          <option value="ASSIGNED">Assigned</option>
          <option value="REJECTED">Rejected</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="RESOLVED">Resolved</option>
        </select>
      </div>

      {/* 📦 LIST */}
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
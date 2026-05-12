"use client";

import { useRouter } from "next/navigation";
import { useResolveIssue } from "@/features/issues/hooks";


export default function IssueActions({ issue }) {

  const router = useRouter();
  const resolve = useResolveIssue();
 

  return (
    
      <div className="border p-4 rounded cursor-pointer">
      <h2 className="font-bold">{issue.title}</h2>
      <p>{issue.description}</p>
      <p className="text-sm">{issue.location}</p>
      <p>Status: {issue.status}</p>
     <div className="flex gap-2 mt-3">
      <button className="cursor-pointer bg-blue-600 text-white px-3 py-1 rounded" 
      onClick={() => router.push(`/issues/${issue.id}`)}>View more</button>
      <button
          onClick={() => resolve.mutate(issue.id)}
          className="bg-green-500 text-white px-3 py-1"
        >
          Resolve
        </button>
    </div>
    </div>
  );
}
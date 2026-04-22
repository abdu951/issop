"use client";

import { useRouter } from "next/navigation";



export default function IssueCard({ issue }) {

  const router = useRouter();

  

  return (
    <div className="border p-4 rounded cursor-pointer">
      <h2 className="font-bold">{issue.title}</h2>
      <p>{issue.description}</p>
      <p className="text-sm">{issue.location}</p>
      <p>Status: {issue.status}</p>
      <button className="cursor-pointer bg-blue-600 text-white px-3 py-1 rounded" 
      onClick={() => router.push(`/issues/${issue.id}`)}>View more</button>

    </div>
  );
}





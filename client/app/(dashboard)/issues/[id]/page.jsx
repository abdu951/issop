"use client";

import { useIssueById } from "@/features/issues/hooks";
import IssueDetail from "@/features/issues/components/IssueDetail";
import { useParams } from "next/navigation";


export default function IssueDetailPage() {
  const { id } = useParams();
  const { data, isLoading } = useIssueById(id);

  if (isLoading) return <p>Loading...</p>;

  return <IssueDetail issue={data} />;
}
"use client";

import { useIssueById } from "@/features/issues/hooks";
import { useParams } from "next/navigation";
import UpdateIssueForm from "@/features/issues/components/UpdateIssueForm";


export default function IssueDetailPage() {
  const { id } = useParams();
  const { data, isLoading } = useIssueById(id);

  if (isLoading) return <p>Loading...</p>;

  return <UpdateIssueForm issue={data} />;
}
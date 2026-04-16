"use client";

import { useAllIssues } from "@/features/issues/hooks";
import IssueList from "@/features/issues/components/IssueList";
import { useState } from "react";

import IssuesFilter from "@/features/issues/components/Filter";

export default function IssuesPage() {
  return (
    <div >
      < IssuesFilter />
    </div>
  );
}

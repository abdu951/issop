"use client";

import Link from "next/link";
import { useRole } from "@/hooks/useRole";

export default function Sidebar() {
  const { isAdmin, isAgent, isCitizen } = useRole();

  return (
    <div className="w-64 h-screen border-r p-4">
      <nav className="space-y-3">
        <Link href="/issues">All Issues</Link>

        {isCitizen && <Link href="/issues/my">My Issues</Link>}

        {isAdmin && <Link href="/issues">Admin Panel</Link>}

        {isAgent && <Link href="/issues/assign">Assigned Issues</Link>}
      </nav>
    </div>
  );
}
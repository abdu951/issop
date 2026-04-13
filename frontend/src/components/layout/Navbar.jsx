"use client";

import Bell from "../notifications/Bell";

export default function Navbar() {
  return (
    <div className="flex justify-between p-4 border-b">
      <h1>ISSOP</h1>

      <Bell />
    </div>
  );
}
"use client";

import { useState } from "react";
import { useCreateUser } from "../hooks";
import { useRole } from "@/hooks/useRole";

export default function CreateUserForm() {
  const { isAdmin } = useRole();
  const { mutate, isPending } = useCreateUser();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "AGENT",
  });

  // 🔐 UI protection
  
  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(form);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">
        Create User
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Name */}
        <input
          type="text"
          placeholder="Full Name"
          className="w-full border px-3 py-2 rounded-lg"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
          required
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          className="w-full border px-3 py-2 rounded-lg"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
          required
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="w-full border px-3 py-2 rounded-lg"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
          required
        />

        {/* Role */}
        <select
          className="w-full border px-3 py-2 rounded-lg"
          value={form.role}
          onChange={(e) =>
            setForm({ ...form, role: e.target.value })
          }
        >
          <option value="AGENT">Agent</option>
          <option value="ADMIN">Admin</option>
        </select>

        {/* Submit */}
        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {isPending ? "Creating..." : "Create User"}
        </button>
      </form>
    </div>
  );
}
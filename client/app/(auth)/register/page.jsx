"use client";

import { useState } from "react";
import { useRegister } from "@/features/auth/hooks";

export default function RegisterPage() {
  const { mutate } = useRegister();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(form);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-20">
      <input
        type="text"
        placeholder="Name"
        className="border p-2 w-full mb-2"
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
      />
      <input
        type="email"
        placeholder="Email"
        className="border p-2 w-full mb-2"
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
      />

      <input
        type="password"
        placeholder="Password"
        className="border p-2 w-full mb-2"
        onChange={(e) =>
          setForm({ ...form, password: e.target.value })
        }
      />

      <button className="bg-green-500 text-white px-4 py-2">
        Register
      </button>
    </form>
  );
}
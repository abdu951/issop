"use client";

{/*"use client";

import { useState } from "react";
import { useRegister } from "@/features/auth/hooks";

export default function RegisterPage() {
  const { mutate, isPending } = useRegister();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    mutate({ email, password });
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="border p-2"
          placeholder="Emailllllllll"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="border p-2"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="bg-blue-500 text-white px-4 py-2">
          {isPending ? "Loading..." : "register"}
        </button>
      </form>
    </div>
  );
} */}




import { useState } from "react";
import { useRegister } from "@/features/auth/hooks";

export default function RegisterPage() {
  const { mutate } = useRegister();

  const [form, setForm] = useState({
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
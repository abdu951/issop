"use client";

import { useState } from "react";
import { useCreateIssue } from "@/features/issues/hooks";

export default function IssueReportPage() {
  const { mutate } = useCreateIssue();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("location", location);
    formData.append("image", image);

    mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
      <input
        placeholder="Location"
        onChange={(e) => setLocation(e.target.value)}
      />
      <textarea
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)}
      />
      <input type="file" onChange={(e) => setImage(e.target.files[0])} />

      <button className="bg-green-500 text-white px-4 py-2">
        Create Issue
      </button>
    </form>
  );
}
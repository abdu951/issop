"use client";

// features/issues/components/UpdateIssueForm.jsx

import { useState } from "react";
import { useUpdateIssue } from "@/features/issues/hooks";

const UpdateIssueForm = ({ issue }) => {
  const { mutate, isPending } = useUpdateIssue();

  const [title, setTitle] = useState(issue.title);
  const [description, setDescription] = useState(issue.description);
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    // ✅ text fields
    formData.append("title", title);
    formData.append("description", description);

    // ✅ optional file
    if (file) {
      formData.append("image", file); // ⚠️ MUST match multer field name
    }

    mutate({
      id: issue.id,
      formData,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 w-full"
      />

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 w-full"
      />

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button
        type="submit"
        disabled={isPending}
        className="bg-blue-600 text-white px-4 py-2 cursor-pointer"
      >
        {isPending ? "Updating..." : "Update Issue"}
      </button>
    </form>
  );
};

export default UpdateIssueForm;
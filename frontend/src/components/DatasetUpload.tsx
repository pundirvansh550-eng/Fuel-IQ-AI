"use client";

import { useState } from "react";
import api from "@/lib/api";

export default function DatasetUpload() {
  const [file, setFile] = useState<File | null>(null);

  const uploadFile = async () => {
    if (!file) return;

    const formData = new FormData();

    formData.append("file", file);

    try {
      await api.post(
        "/upload",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      alert(
        "Dataset uploaded successfully"
      );

      window.location.reload();
    } catch (error) {
      console.error(error);

      alert("Upload failed");
    }
  };

  return (
    <div className="mb-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

      <h2 className="mb-4 text-xl font-semibold">
        Upload Dataset
      </h2>

      <input
        type="file"
        onChange={(e) => {
          if (
            e.target.files &&
            e.target.files.length > 0
          ) {
            setFile(
              e.target.files[0]
            );
          }
        }}
      />

      <button
        onClick={uploadFile}
        className="mt-4 rounded-lg bg-cyan-500 px-4 py-2 text-black"
      >
        Upload
      </button>

    </div>
  );
}
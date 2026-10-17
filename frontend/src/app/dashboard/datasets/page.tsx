"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import DatasetUpload from "@/components/DatasetUpload";

interface Dataset {
  dataset_name: string;
  file_size: number;
  upload_time: string;
  status: string;
}

export default function DatasetCenterPage() {
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDatasets = async () => {
      try {
        const response = await api.get("/datasets");
        setDatasets(response.data);
      } catch (error) {
        console.error("Failed to load datasets", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDatasets();
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          Dataset Center
        </h1>

        <p className="mt-2 text-zinc-400">
          Manage uploaded datasets and monitor data quality.
        </p>
      </div>

      <DatasetUpload />

      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <h3 className="text-zinc-400">
            Total Datasets
          </h3>

          <p className="mt-4 text-4xl font-bold text-cyan-400">
            {datasets.length}
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <h3 className="text-zinc-400">
            Backend Status
          </h3>

          <p className="mt-4 text-4xl font-bold text-green-400">
            Online
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <h3 className="text-zinc-400">
            Registry Status
          </h3>

          <p className="mt-4 text-lg text-white">
            Connected
          </p>
        </div>
      </div>

      <div className="mt-10 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
        <h2 className="mb-6 text-xl font-semibold">
          Dataset Registry
        </h2>

        {loading ? (
          <div>Loading datasets...</div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-800 text-left">
                <th className="pb-3">Dataset</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Uploaded</th>
              </tr>
            </thead>

            <tbody>
              {datasets.map((dataset) => (
                <tr
                  key={dataset.dataset_name}
                  className="border-b border-zinc-800"
                >
                  <td className="py-4">
                    <a
                       href={`/dashboard/datasets/${dataset.dataset_name}`}
                       className="text-cyan-400 hover:underline"
               > 
                         {dataset.dataset_name}
                    </a>
                    </td>

                  <td className="py-4 text-green-400">
                    {dataset.status}
                  </td>

                  <td className="py-4 text-zinc-400">
                    {dataset.upload_time}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
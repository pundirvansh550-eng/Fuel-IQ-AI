"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

interface PageProps {
  params: Promise<{
    datasetName: string;
  }>;
}

export default function PreviewPage({ params }: PageProps) {
  const [datasetName, setDatasetName] = useState("");
  const [data, setData] = useState<any>(null);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [pageSize, setPageSize] = useState(20);

  useEffect(() => {
    const loadData = async () => {
      const resolvedParams = await params;

      setDatasetName(resolvedParams.datasetName);

      try {
        const response = await api.get(
          `/dataset-preview/${resolvedParams.datasetName}`,
          {
            params: {
              page,
              page_size: pageSize,
              search,
            },
          },
        );

        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    loadData();
  }, [params, page, search, pageSize]);

  if (!data) {
    return <div>Loading dataset...</div>;
  }

  const totalPages = Math.ceil(data.total_rows / pageSize);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold">Dataset Viewer</h1>

        <p className="mt-2 text-zinc-400">{datasetName}</p>
      </div>

      {/* Dataset Stats */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex gap-6">
          <div className="rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3">
            <div className="text-xs text-zinc-400">Rows</div>

            <div className="text-xl font-bold text-cyan-400">
              {data.total_rows}
            </div>
          </div>

          <div className="rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3">
            <div className="text-xs text-zinc-400">Columns</div>

            <div className="text-xl font-bold text-green-400">
              {data.total_columns}
            </div>
          </div>
        </div>

        <a
          href={`http://127.0.0.1:8000/export/${datasetName}`}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg bg-cyan-500 px-4 py-2 font-medium text-black"
        >
          Export CSV
        </a>
      </div>

      {/* Search + Page Size */}
      <div className="mb-6 flex items-center gap-4">
        <input
          type="text"
          placeholder="Search dataset..."
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
          className="flex-1 rounded-xl border border-zinc-700 bg-zinc-900 p-3 text-white"
        />

        <select
          value={pageSize}
          onChange={(e) => {
            setPage(1);
            setPageSize(Number(e.target.value));
          }}
          className="rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3"
        >
          <option value={20}>20 Rows</option>

          <option value={50}>50 Rows</option>

          <option value={100}>100 Rows</option>
        </select>
      </div>

      {/* Pagination */}
      <div className="mb-6 flex items-center justify-between">
        <div className="text-zinc-400">
          Page {page} of {totalPages}
        </div>

        <div className="flex gap-3">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="rounded-lg bg-zinc-800 px-4 py-2"
          >
            Previous
          </button>

          <button
            disabled={page >= totalPages}
            onClick={() => setPage(page + 1)}
            className="rounded-lg bg-cyan-500 px-4 py-2 text-black"
          >
            Next
          </button>
        </div>
      </div>

      {/* Dataset Table */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
        <div className="overflow-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                {data.columns.map((column: string) => (
                  <th
                    key={column}
                    className="border-b border-zinc-700 p-3 text-left"
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {data.rows.map((row: any, index: number) => (
                <tr key={index}>
                  {data.columns.map((column: string) => (
                    <td key={`${index}-${column}`} className="p-3">
                      {String(row[column] ?? "")}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

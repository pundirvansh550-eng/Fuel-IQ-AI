"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

interface PageProps {
  params: Promise<{
    datasetName: string;
  }>;
}

export default function PreviewPage({
  params,
}: PageProps) {
  const [datasetName, setDatasetName] = useState("");
  const [data, setData] = useState<any>(null);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const pageSize = 20;

  useEffect(() => {
    const loadData = async () => {
      const resolvedParams = await params;

      setDatasetName(
        resolvedParams.datasetName
      );

      try {
        const response = await api.get(
          `/dataset-preview/${resolvedParams.datasetName}`,
          {
            params: {
              page,
              page_size: pageSize,
              search,
            },
          }
        );

        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    loadData();
  }, [params, page, search]);

  if (!data) {
    return (
      <div>
        Loading dataset...
      </div>
    );
  }

  const totalPages = Math.ceil(
    data.total_rows / pageSize
  );

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          Dataset Viewer
        </h1>

        <p className="mt-2 text-zinc-400">
          {datasetName}
        </p>
      </div>

      {/* Statistics */}
      <div className="mb-6 grid gap-4 md:grid-cols-4">

        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
          <div className="text-zinc-400">
            Total Rows
          </div>

          <div className="mt-2 text-2xl font-bold text-cyan-400">
            {data.total_rows}
          </div>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
          <div className="text-zinc-400">
            Total Columns
          </div>

          <div className="mt-2 text-2xl font-bold text-green-400">
            {data.total_columns}
          </div>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
          <div className="text-zinc-400">
            Current Page
          </div>

          <div className="mt-2 text-2xl font-bold">
            {page}
          </div>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
          <div className="text-zinc-400">
            Search
          </div>

          <div className="mt-2 text-lg font-bold">
            {search || "None"}
          </div>
        </div>

      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search dataset..."
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
          className="w-full rounded-xl border border-zinc-700 bg-zinc-900 p-3 text-white"
        />
      </div>

      {/* Pagination */}
      <div className="mb-6 flex items-center justify-between">

        <div className="text-zinc-400">
          Showing page {page} of {totalPages}
        </div>

        <div className="flex gap-3">

          <button
            disabled={page === 1}
            onClick={() =>
              setPage(page - 1)
            }
            className="rounded-lg bg-zinc-800 px-4 py-2"
          >
            Previous
          </button>

          <button
            disabled={page >= totalPages}
            onClick={() =>
              setPage(page + 1)
            }
            className="rounded-lg bg-cyan-500 px-4 py-2 text-black"
          >
            Next
          </button>

        </div>

      </div>

      {/* Table */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

        <div className="overflow-auto">

          <table className="w-full border-collapse">

            <thead>
              <tr>
                {data.columns.map(
                  (column: string) => (
                    <th
                      key={column}
                      className="border-b border-zinc-700 p-3 text-left"
                    >
                      {column}
                    </th>
                  )
                )}
              </tr>
            </thead>

            <tbody>
              {data.rows.map(
                (
                  row: any,
                  index: number
                ) => (
                  <tr
                    key={index}
                    className="border-b border-zinc-800"
                  >
                    {data.columns.map(
                      (
                        column: string
                      ) => (
                        <td
                          key={column}
                          className="p-3"
                        >
                          {String(
                            row[column]
                          )}
                        </td>
                      )
                    )}
                  </tr>
                )
              )}
            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}
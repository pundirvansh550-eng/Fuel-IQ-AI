"use client";

import {
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from "react";

import { getDatasetPreview } from "../api/datasetApi";
import type { DatasetPreview } from "../types/dataset";

interface DatasetPreviewPanelProps {
  datasetName: string;
}

const PAGE_SIZE = 10;

export default function DatasetPreviewPanel({
  datasetName,
}: DatasetPreviewPanelProps) {
  const [preview, setPreview] =
    useState<DatasetPreview | null>(null);

  const [page, setPage] = useState(1);

  const [searchInput, setSearchInput] =
    useState("");

  const [activeSearch, setActiveSearch] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  const loadPreview = useCallback(
    async (
      requestedPage: number,
      requestedSearch: string,
    ) => {
      try {
        setLoading(true);
        setError(null);

        const result = await getDatasetPreview(
          datasetName,
          requestedPage,
          PAGE_SIZE,
          requestedSearch,
        );

        setPreview(result);
      } catch (error) {
        console.error(error);

        setError(
          "Unable to load the dataset preview.",
        );
      } finally {
        setLoading(false);
      }
    },
    [datasetName],
  );

  useEffect(() => {
    void loadPreview(page, activeSearch);
  }, [page, activeSearch, loadPreview]);

  function handleSearch(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setPage(1);
    setActiveSearch(searchInput.trim());
  }

  function handleClearSearch() {
    setSearchInput("");
    setActiveSearch("");
    setPage(1);
  }

  const totalPages = preview
    ? Math.max(
        1,
        Math.ceil(
          preview.total_rows /
            preview.page_size,
        ),
      )
    : 1;

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-col gap-4 border-b border-slate-200 p-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-xl font-semibold">
            Dataset Preview
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Review uploaded records before
            running analytics.
          </p>
        </div>

        <form
          onSubmit={handleSearch}
          className="flex w-full gap-2 lg:max-w-lg"
        >
          <input
            type="search"
            value={searchInput}
            onChange={(event) => {
              setSearchInput(
                event.target.value,
              );
            }}
            placeholder="Search dataset records"
            className="min-w-0 flex-1 rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-cyan-600"
          />

          <button
            type="submit"
            className="rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-cyan-700"
          >
            Search
          </button>

          {activeSearch && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold hover:bg-slate-50"
            >
              Clear
            </button>
          )}
        </form>
      </div>

      {loading && (
        <div className="p-8 text-slate-500">
          Loading dataset preview...
        </div>
      )}

      {!loading && error && (
        <div className="m-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {!loading &&
        !error &&
        preview &&
        preview.rows.length === 0 && (
          <div className="p-8 text-center">
            <p className="font-medium">
              No matching records found.
            </p>
          </div>
        )}

      {!loading &&
        !error &&
        preview &&
        preview.rows.length > 0 && (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full whitespace-nowrap text-left text-sm">
                <thead className="bg-slate-50 text-slate-600">
                  <tr>
                    {preview.columns.map(
                      (column) => (
                        <th
                          key={column}
                          className="border-b border-slate-200 px-5 py-4 font-semibold"
                        >
                          {column}
                        </th>
                      ),
                    )}
                  </tr>
                </thead>

                <tbody>
                  {preview.rows.map(
                    (row, rowIndex) => (
                      <tr
                        key={`${page}-${rowIndex}`}
                        className="border-b border-slate-100 hover:bg-slate-50"
                      >
                        {preview.columns.map(
                          (column) => (
                            <td
                              key={`${rowIndex}-${column}`}
                              className="max-w-72 overflow-hidden text-ellipsis px-5 py-4 text-slate-700"
                              title={String(
                                row[column] ?? "",
                              )}
                            >
                              {row[column] === null ||
                              row[column] ===
                                undefined ||
                              row[column] === ""
                                ? "—"
                                : String(
                                    row[column],
                                  )}
                            </td>
                          ),
                        )}
                      </tr>
                    ),
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-slate-500">
                Showing page {page} of{" "}
                {totalPages} ·{" "}
                {preview.total_rows.toLocaleString()}{" "}
                records
              </p>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setPage((currentPage) =>
                      Math.max(
                        1,
                        currentPage - 1,
                      ),
                    );
                  }}
                  disabled={page === 1}
                  className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Previous
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setPage((currentPage) =>
                      Math.min(
                        totalPages,
                        currentPage + 1,
                      ),
                    );
                  }}
                  disabled={page >= totalPages}
                  className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
    </section>
  );
}
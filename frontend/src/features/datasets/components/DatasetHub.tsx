"use client";

import Link from "next/link";
import {
  ChangeEvent,
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  getDatasets,
  uploadDataset,
} from "../api/datasetApi";

import type { Dataset } from "../types/dataset";

export default function DatasetHub() {
  const [datasets, setDatasets] = useState<
    Dataset[]
  >([]);

  const [selectedFile, setSelectedFile] =
    useState<File | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [uploading, setUploading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const [message, setMessage] =
    useState<string | null>(null);

  const loadDatasets = useCallback(
    async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getDatasets();

        setDatasets(data);
      } catch (error) {
        console.error(error);

        setError(
          "Unable to load datasets. Check that the FuelIQ backend is running.",
        );
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    void loadDatasets();
  }, [loadDatasets]);

  function handleFileChange(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const file =
      event.target.files?.[0] ?? null;

    setError(null);
    setMessage(null);

    if (!file) {
      setSelectedFile(null);
      return;
    }

    if (
      !file.name
        .toLowerCase()
        .endsWith(".csv")
    ) {
      setSelectedFile(null);

      setError(
        "Only CSV files are supported right now.",
      );

      event.target.value = "";
      return;
    }

    setSelectedFile(file);
  }

  async function handleUpload() {
    if (!selectedFile) {
      setError("Select a CSV file first.");
      return;
    }

    try {
      setUploading(true);
      setError(null);
      setMessage(null);

      const response =
        await uploadDataset(selectedFile);

      setMessage(response.message);
      setSelectedFile(null);

      await loadDatasets();
    } catch (error) {
      console.error(error);

      setError(
        "Dataset upload failed. Check the backend terminal.",
      );
    } finally {
      setUploading(false);
    }
  }

  function formatFileSize(bytes: number) {
    if (bytes < 1024) {
      return `${bytes} B`;
    }

    const kilobytes = bytes / 1024;

    if (kilobytes < 1024) {
      return `${kilobytes.toFixed(1)} KB`;
    }

    return `${(
      kilobytes / 1024
    ).toFixed(1)} MB`;
  }

  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold">
          Upload Fleet Dataset
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Upload a company fleet dataset in CSV
          format.
        </p>

        <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center">
          <input
            type="file"
            accept=".csv,text/csv"
            onChange={handleFileChange}
            disabled={uploading}
            className="w-full rounded-lg border border-slate-300 bg-white p-3 text-sm"
          />

          <button
            type="button"
            onClick={handleUpload}
            disabled={
              !selectedFile || uploading
            }
            className="rounded-lg bg-cyan-600 px-6 py-3 font-semibold text-white transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            {uploading
              ? "Uploading..."
              : "Upload Dataset"}
          </button>
        </div>

        {selectedFile && (
          <p className="mt-3 text-sm text-slate-600">
            Selected: {selectedFile.name}
          </p>
        )}

        {message && (
          <p className="mt-4 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700">
            {message}
          </p>
        )}

        {error && (
          <p className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {error}
          </p>
        )}
      </section>

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-200 p-6">
          <div>
            <h2 className="text-xl font-semibold">
              Company Datasets
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {datasets.length} dataset
              {datasets.length === 1
                ? ""
                : "s"}
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              void loadDatasets();
            }}
            disabled={loading}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "Loading..."
              : "Refresh"}
          </button>
        </div>

        {loading && (
          <div className="p-8 text-slate-500">
            Loading datasets...
          </div>
        )}

        {!loading &&
          datasets.length === 0 && (
            <div className="p-8 text-center">
              <h3 className="font-semibold">
                No datasets available
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Upload the first company fleet
                CSV.
              </p>
            </div>
          )}

        {!loading &&
          datasets.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-sm text-slate-600">
                  <tr>
                    <th className="px-6 py-4">
                      Dataset
                    </th>

                    <th className="px-6 py-4">
                      Size
                    </th>

                    <th className="px-6 py-4">
                      Uploaded
                    </th>

                    <th className="px-6 py-4">
                      Status
                    </th>

                    <th className="px-6 py-4 text-right">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {datasets.map(
                    (dataset) => (
                      <tr
                        key={
                          dataset.dataset_name
                        }
                        className="border-t border-slate-100 transition hover:bg-slate-50"
                      >
                        <td className="px-6 py-4 font-medium">
                          {
                            dataset.dataset_name
                          }
                        </td>

                        <td className="px-6 py-4 text-slate-600">
                          {formatFileSize(
                            dataset.file_size,
                          )}
                        </td>

                        <td className="px-6 py-4 text-slate-600">
                          {
                            dataset.upload_time
                          }
                        </td>

                        <td className="px-6 py-4">
                          <span className="rounded-full bg-cyan-50 px-3 py-1 text-sm font-medium text-cyan-700">
                            {dataset.status}
                          </span>
                        </td>

                        <td className="px-6 py-4 text-right">
                          <Link
                            href={`/company/datasets/${encodeURIComponent(dataset.dataset_name)}`}
                            className="inline-flex rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-700"
                          >
                            Open
                          </Link>
                        </td>
                      </tr>
                    ),
                  )}
                </tbody>
              </table>
            </div>
          )}
      </section>
    </div>
  );
}
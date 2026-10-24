"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import DatasetAnalyticsPanel from "@/features/analytics/components/DatasetAnalyticsPanel";

import { getDataset } from "../api/datasetApi";
import type { Dataset } from "../types/dataset";
import DatasetPreviewPanel from "./DatasetPreviewPanel";
import DatasetValidationPanel from "./DatasetValidationPanel";

interface DatasetDetailsProps {
  datasetName: string;
}

export default function DatasetDetails({
  datasetName,
}: DatasetDetailsProps) {
  const [dataset, setDataset] =
    useState<Dataset | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  const loadDataset = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getDataset(
        datasetName,
      );

      setDataset(data);
    } catch (caughtError) {
      console.error(caughtError);

      setError(
        "Unable to load dataset details.",
      );
    } finally {
      setLoading(false);
    }
  }, [datasetName]);

  useEffect(() => {
    void loadDataset();
  }, [loadDataset]);

  function formatFileSize(
    bytes: number,
  ): string {
    if (bytes < 1024) {
      return `${bytes} B`;
    }

    const kilobytes = bytes / 1024;

    if (kilobytes < 1024) {
      return `${kilobytes.toFixed(1)} KB`;
    }

    const megabytes = kilobytes / 1024;

    return `${megabytes.toFixed(1)} MB`;
  }

  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        Loading dataset details...
      </div>
    );
  }

  if (error || !dataset) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">
        {error ?? "Dataset not found."}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          <div>
            <p className="text-sm text-slate-500">
              Dataset
            </p>

            <p className="mt-2 break-words font-semibold">
              {dataset.dataset_name}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              File Size
            </p>

            <p className="mt-2 font-semibold">
              {formatFileSize(
                dataset.file_size,
              )}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Uploaded
            </p>

            <p className="mt-2 font-semibold">
              {dataset.upload_time}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Status
            </p>

            <span className="mt-2 inline-flex rounded-full bg-cyan-50 px-3 py-1 text-sm font-semibold text-cyan-700">
              {dataset.status}
            </span>
          </div>
        </div>
      </section>

      <DatasetValidationPanel
        datasetName={datasetName}
      />

      <DatasetPreviewPanel
        datasetName={datasetName}
      />

      <DatasetAnalyticsPanel
        datasetName={datasetName}
      />
    </div>
  );
}
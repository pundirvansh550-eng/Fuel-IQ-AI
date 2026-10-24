"use client";

import { useCallback, useEffect, useState } from "react";

import {
  getSavedValidation,
  runDatasetValidation,
} from "../api/datasetApi";

import type { DatasetValidation } from "../types/dataset";

interface DatasetValidationPanelProps {
  datasetName: string;
}

export default function DatasetValidationPanel({
  datasetName,
}: DatasetValidationPanelProps) {
  const [validation, setValidation] = useState<DatasetValidation | null>(null);
  const [loadingSaved, setLoadingSaved] = useState(true);
  const [validating, setValidating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadSavedValidation = useCallback(async () => {
    try {
      setLoadingSaved(true);
      setError(null);

      const savedValidation = await getSavedValidation(datasetName);
      setValidation(savedValidation);
    } catch (error) {
      console.error(error);
      setError("Unable to load the saved validation result.");
    } finally {
      setLoadingSaved(false);
    }
  }, [datasetName]);

  useEffect(() => {
    void loadSavedValidation();
  }, [loadSavedValidation]);

  async function handleValidation() {
    try {
      setValidating(true);
      setError(null);

      const result = await runDatasetValidation(datasetName);
      setValidation(result);
    } catch (error) {
      console.error(error);
      setError("Validation failed. Check the backend terminal.");
    } finally {
      setValidating(false);
    }
  }

  function getScoreColor(score: number) {
    if (score >= 90) {
      return "text-emerald-700";
    }

    if (score >= 75) {
      return "text-cyan-700";
    }

    if (score >= 50) {
      return "text-amber-700";
    }

    return "text-red-700";
  }

  function formatValidationDate(value?: string) {
    if (!value) {
      return null;
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return null;
    }

    return date.toLocaleString();
  }

  const validatedAt = formatValidationDate(validation?.validated_at);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-col gap-4 border-b border-slate-200 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold">Data Validation</h2>

          <p className="mt-1 text-sm text-slate-500">
            Check dataset quality before running fleet analytics.
          </p>

          {validatedAt && (
            <p className="mt-2 text-xs text-slate-400">Last validated: {validatedAt}</p>
          )}
        </div>

        <button
          type="button"
          onClick={handleValidation}
          disabled={validating || loadingSaved}
          className="rounded-lg bg-cyan-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          {validating ? "Validating..." : validation ? "Run Again" : "Run Validation"}
        </button>
      </div>

      {loadingSaved && <div className="p-8 text-slate-500">Loading saved validation...</div>}

      {!loadingSaved && error && (
        <div className="m-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {!loadingSaved && !validation && !error && (
        <div className="p-8 text-center">
          <p className="font-medium text-slate-700">Validation has not been run yet.</p>

          <p className="mt-2 text-sm text-slate-500">
            Run validation to check missing values, duplicate records and dataset health.
          </p>
        </div>
      )}

      {!loadingSaved && validation && (
        <div className="p-6">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm text-slate-500">Health Score</p>

              <p className={`mt-2 text-3xl font-bold ${getScoreColor(validation.health_score)}`}>
                {validation.health_score}
              </p>

              <p className="mt-1 text-sm font-medium text-slate-600">{validation.health_status}</p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm text-slate-500">Total Records</p>

              <p className="mt-2 text-3xl font-bold">{validation.total_rows.toLocaleString()}</p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm text-slate-500">Total Columns</p>

              <p className="mt-2 text-3xl font-bold">{validation.total_columns}</p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm text-slate-500">Missing Values</p>

              <p className="mt-2 text-3xl font-bold">{validation.missing_values.toLocaleString()}</p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm text-slate-500">Duplicate Records</p>

              <p className="mt-2 text-3xl font-bold">{validation.duplicate_rows.toLocaleString()}</p>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-slate-200 p-5">
            <h3 className="font-semibold">Detected Columns</h3>

            <div className="mt-4 flex flex-wrap gap-2">
              {validation.column_names.map((columnName) => (
                <span
                  key={columnName}
                  className="rounded-full bg-slate-100 px-3 py-1.5 text-sm text-slate-700"
                >
                  {columnName}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

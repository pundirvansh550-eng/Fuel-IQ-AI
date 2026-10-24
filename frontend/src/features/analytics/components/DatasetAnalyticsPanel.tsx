"use client";

import axios from "axios";
import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  getSavedDatasetAnalytics,
  runDatasetAnalytics,
} from "../api/analyticsApi";

import type { DatasetAnalytics } from "../types/analytics";

interface DatasetAnalyticsPanelProps {
  datasetName: string;
}

interface AnalyticsConflictDetail {
  code?: string;
  message?: string;
  duplicate_rows?: number;
  recommended_action?: string;
}

interface ErrorResponse {
  detail?: AnalyticsConflictDetail | string;
}

interface MetricCardProps {
  label: string;
  value: string;
  detail?: string;
}

function MetricCard({
  label,
  value,
  detail,
}: MetricCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
      <p className="text-sm text-slate-500">
        {label}
      </p>

      <p className="mt-2 text-3xl font-bold text-slate-900">
        {value}
      </p>

      {detail ? (
        <p className="mt-1 text-sm text-slate-500">
          {detail}
        </p>
      ) : null}
    </div>
  );
}

function formatNumber(
  value: number | null,
): string {
  if (value === null) {
    return "Not available";
  }

  return value.toLocaleString();
}

function formatDate(
  value?: string,
): string | null {
  if (!value) {
    return null;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date.toLocaleString();
}

export default function DatasetAnalyticsPanel({
  datasetName,
}: DatasetAnalyticsPanelProps) {
  const [analytics, setAnalytics] =
    useState<DatasetAnalytics | null>(null);

  const [loadingSaved, setLoadingSaved] =
    useState(true);

  const [analyzing, setAnalyzing] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const [duplicateCount, setDuplicateCount] =
    useState<number | null>(null);

  const [recommendedAction, setRecommendedAction] =
    useState<string | null>(null);

  const loadSavedAnalytics =
    useCallback(async () => {
      try {
        setLoadingSaved(true);
        setError(null);

        const savedResult =
          await getSavedDatasetAnalytics(
            datasetName,
          );

        setAnalytics(savedResult);
      } catch (caughtError: unknown) {
        console.error(caughtError);

        setError(
          "Unable to load saved analytics.",
        );
      } finally {
        setLoadingSaved(false);
      }
    }, [datasetName]);

  useEffect(() => {
    void loadSavedAnalytics();
  }, [loadSavedAnalytics]);

  async function handleRunAnalytics() {
    try {
      setAnalyzing(true);
      setError(null);
      setDuplicateCount(null);
      setRecommendedAction(null);

      const result =
        await runDatasetAnalytics(
          datasetName,
        );

      setAnalytics(result);
    } catch (caughtError: unknown) {
      console.error(caughtError);

      if (axios.isAxiosError<ErrorResponse>(
        caughtError,
      )) {
        const status =
          caughtError.response?.status;

        const detail =
          caughtError.response?.data?.detail;

        if (
          status === 409 &&
          typeof detail === "object" &&
          detail?.code ===
            "DUPLICATE_ROWS_FOUND"
        ) {
          setAnalytics(null);

          setDuplicateCount(
            detail.duplicate_rows ?? 0,
          );

          setError(
            detail.message ??
              "Duplicate records were found.",
          );

          setRecommendedAction(
            detail.recommended_action ??
              "Remove duplicate records before running analytics.",
          );

          return;
        }

        if (
          typeof detail === "string"
        ) {
          setError(detail);
          return;
        }
      }

      setError(
        "Unable to generate analytics. Check the backend terminal.",
      );
    } finally {
      setAnalyzing(false);
    }
  }

  const analyzedAt = formatDate(
    analytics?.analyzed_at,
  );

  return (
    <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-col gap-4 border-b border-slate-200 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold">
            Fleet Analytics
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Analyze fuel consumption, emissions,
            manufacturers and vehicle classes.
          </p>

          {analyzedAt ? (
            <p className="mt-2 text-xs text-slate-400">
              Last analyzed: {analyzedAt}
            </p>
          ) : null}
        </div>

        <button
          type="button"
          onClick={handleRunAnalytics}
          disabled={
            analyzing || loadingSaved
          }
          className="rounded-lg bg-cyan-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          {analyzing
            ? "Analyzing..."
            : analytics
              ? "Run Again"
              : "Run Analytics"}
        </button>
      </div>

      {loadingSaved ? (
        <div className="p-8 text-slate-500">
          Loading saved analytics...
        </div>
      ) : null}

      {!loadingSaved && error ? (
        <div className="m-6 rounded-xl border border-amber-300 bg-amber-50 p-5">
          <h3 className="font-semibold text-amber-900">
            Dataset is not ready for analytics
          </h3>

          <p className="mt-2 text-sm text-amber-800">
            {error}
          </p>

          {duplicateCount !== null ? (
            <p className="mt-3 text-sm font-semibold text-amber-900">
              Duplicate records detected:{" "}
              {duplicateCount}
            </p>
          ) : null}

          {recommendedAction ? (
            <p className="mt-2 text-sm text-amber-800">
              Recommended action:{" "}
              {recommendedAction}
            </p>
          ) : null}
        </div>
      ) : null}

      {!loadingSaved &&
      !analytics &&
      !error ? (
        <div className="p-8 text-center">
          <p className="font-medium text-slate-700">
            Analytics have not been run yet.
          </p>

          <p className="mt-2 text-sm text-slate-500">
            Run analytics after validating the
            dataset.
          </p>
        </div>
      ) : null}

      {!loadingSaved &&
      analytics &&
      !error ? (
        <div className="p-6">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <MetricCard
              label="Total Records"
              value={formatNumber(
                analytics.total_records,
              )}
            />

            <MetricCard
              label="Total Columns"
              value={formatNumber(
                analytics.total_columns,
              )}
            />

            <MetricCard
              label="Manufacturers"
              value={formatNumber(
                analytics.manufacturers_count,
              )}
            />

            <MetricCard
              label="Vehicle Classes"
              value={formatNumber(
                analytics.vehicle_classes_count,
              )}
            />

            <MetricCard
              label="Average Fuel Consumption"
              value={formatNumber(
                analytics.average_fuel_consumption,
              )}
              detail="Dataset measurement unit"
            />

            <MetricCard
              label="Minimum Fuel Consumption"
              value={formatNumber(
                analytics.min_fuel_consumption,
              )}
              detail="Dataset measurement unit"
            />

            <MetricCard
              label="Maximum Fuel Consumption"
              value={formatNumber(
                analytics.max_fuel_consumption,
              )}
              detail="Dataset measurement unit"
            />

            <MetricCard
              label="Average CO₂ Emissions"
              value={formatNumber(
                analytics.average_emissions,
              )}
              detail="Dataset measurement unit"
            />
          </div>
        </div>
      ) : null}
    </section>
  );
}
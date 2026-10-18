"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

import ManufacturerChart from "@/components/charts/ManufacturerChart";
import VehicleClassChart from "@/components/charts/VehicleClassChart";

interface PageProps {
  params: Promise<{
    datasetName: string;
  }>;
}

export default function AnalyticsPage({
  params,
}: PageProps) {
  const [datasetName, setDatasetName] =
    useState("");

  const [analytics, setAnalytics] =
    useState<any>(null);

  const [manufacturerData, setManufacturerData] =
    useState<any[]>([]);

  const [vehicleClassData, setVehicleClassData] =
    useState<any[]>([]);

  const [insights, setInsights] =
    useState<string[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const resolvedParams =
        await params;

      setDatasetName(
        resolvedParams.datasetName
      );

      try {
        const analyticsResponse =
          await api.get(
            `/analytics/${resolvedParams.datasetName}`
          );

        setAnalytics(
          analyticsResponse.data
        );

        const manufacturerResponse =
          await api.get(
            `/manufacturer-distribution/${resolvedParams.datasetName}`
          );

        setManufacturerData(
          manufacturerResponse.data
        );

        const vehicleResponse =
          await api.get(
            `/vehicle-class-distribution/${resolvedParams.datasetName}`
          );

        setVehicleClassData(
          vehicleResponse.data
        );

        const insightsResponse =
          await api.get(
            `/analytics-insights/${resolvedParams.datasetName}`
          );

        setInsights(
          insightsResponse.data.insights
        );

      } catch (error) {
        console.error(error);
      }
    };

    loadData();
  }, [params]);

  if (!analytics) {
    return (
      <div>
        Loading analytics...
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-4xl font-bold">
        Analytics Workspace
      </h1>

      <p className="mt-2 text-zinc-400">
        {datasetName}
      </p>

      {/* KPI Cards */}
      <div className="mt-8 grid gap-6 md:grid-cols-2">

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <h3>Total Records</h3>

          <p className="mt-4 text-4xl font-bold text-cyan-400">
            {analytics.total_records}
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <h3>Total Columns</h3>

          <p className="mt-4 text-4xl font-bold text-green-400">
            {analytics.total_columns}
          </p>
        </div>

      </div>

      {/* Charts */}
      <div className="mt-8 grid gap-8 xl:grid-cols-2">

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

          <h2 className="mb-6 text-2xl font-bold">
            Top Manufacturers
          </h2>

          <ManufacturerChart
            data={manufacturerData}
          />

        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

          <h2 className="mb-6 text-2xl font-bold">
            Vehicle Class Distribution
          </h2>

          <VehicleClassChart
            data={vehicleClassData}
          />

        </div>

      </div>

      {/* AI Insights */}
      <div className="mt-8 rounded-2xl border border-cyan-900 bg-zinc-900 p-6">

        <h2 className="mb-6 text-2xl font-bold text-cyan-400">
          AI Insights
        </h2>

        <div className="space-y-4">

          {insights.map(
            (
              insight,
              index
            ) => (
              <div
                key={index}
                className="rounded-lg bg-zinc-800 p-4"
              >
                {insight}
              </div>
            )
          )}

        </div>

      </div>
    </div>
  );
}
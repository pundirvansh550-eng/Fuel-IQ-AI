"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

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

  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const loadData = async () => {
      const resolvedParams =
        await params;

      setDatasetName(
        resolvedParams.datasetName
      );

      try {
        const response =
          await api.get(
            `/analytics/${resolvedParams.datasetName}`
          );

        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    loadData();
  }, [params]);

  if (!data) {
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

      <div className="mt-8 grid gap-6 md:grid-cols-2">

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <h3>Total Records</h3>

          <p className="mt-4 text-4xl font-bold text-cyan-400">
            {data.total_records}
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <h3>Total Columns</h3>

          <p className="mt-4 text-4xl font-bold text-green-400">
            {data.total_columns}
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <h3>Average Fuel Consumption</h3>

          <p className="mt-4 text-3xl font-bold">
            {data.average_fuel_consumption}
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <h3>Average Emissions</h3>

          <p className="mt-4 text-3xl font-bold">
            {data.average_emissions}
          </p>
        </div>

      </div>
    </div>
  );
}
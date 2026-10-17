"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

interface PageProps {
  params: Promise<{
    datasetName: string;
  }>;
}

export default function SchemaPage({
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
            `/schema/${resolvedParams.datasetName}`
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
        Loading schema...
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-4xl font-bold">
        Schema Workspace
      </h1>

      <p className="mt-2 text-zinc-400">
        {datasetName}
      </p>

      <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

        <h2 className="mb-6 text-xl font-semibold">
          Detected Columns
        </h2>

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">

          {data.columns.map(
            (column: string) => (
              <div
                key={column}
                className="rounded-lg bg-zinc-800 p-4"
              >
                {column}
              </div>
            )
          )}

        </div>

      </div>

      <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

        <h2 className="mb-6 text-xl font-semibold">
          Detected Fields
        </h2>

        <div className="space-y-3">

          <div>
            Manufacturer:
            {" "}
            {data.detected_fields.manufacturer || "Not Detected"}
          </div>

          <div>
            Vehicle Class:
            {" "}
            {data.detected_fields.vehicle_class || "Not Detected"}
          </div>

          <div>
            Fuel Consumption:
            {" "}
            {data.detected_fields.fuel_consumption || "Not Detected"}
          </div>

          <div>
            Emissions:
            {" "}
            {data.detected_fields.emissions || "Not Detected"}
          </div>

        </div>

      </div>

    </div>
  );
}
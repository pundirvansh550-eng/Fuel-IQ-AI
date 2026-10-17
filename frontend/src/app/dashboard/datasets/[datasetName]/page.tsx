"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/lib/api";

interface PageProps {
  params: Promise<{
    datasetName: string;
  }>;
}

export default function DatasetDetailsPage({
  params,
}: PageProps) {
  const [datasetName, setDatasetName] =
    useState("");

  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const load = async () => {
      const resolvedParams =
        await params;

      setDatasetName(
        resolvedParams.datasetName
      );

      try {
        const response =
          await api.get(
            `/dataset-intelligence/${resolvedParams.datasetName}`
          );

        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    load();
  }, [params]);

  if (!data) {
    return (
      <div>
        Loading dataset intelligence...
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-4xl font-bold">
        Dataset Intelligence
      </h1>

      <p className="mt-2 text-zinc-400">
        {datasetName}
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <h3 className="text-zinc-400">
            Health Score
          </h3>

          <p className="mt-4 text-4xl font-bold text-cyan-400">
            {data.validation.health_score}
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <h3 className="text-zinc-400">
            Sustainability
          </h3>

          <p className="mt-4 text-4xl font-bold text-green-400">
            {data.sustainability.sustainability_score}
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <h3 className="text-zinc-400">
            Risk Level
          </h3>

          <p className="mt-4 text-2xl font-bold text-orange-400">
            {data.risk.risk_level}
          </p>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="mb-4 text-2xl font-bold">
          Actions
        </h2>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

          <Link
            href={`/dashboard/datasets/${datasetName}/preview`}
            className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition hover:border-cyan-500"
          >
            <h3 className="text-lg font-semibold">
              View Dataset
            </h3>

            <p className="mt-2 text-zinc-400">
              Open spreadsheet viewer.
            </p>
          </Link>

          <Link
            href={`/dashboard/datasets/${datasetName}/analytics`}
            className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition hover:border-cyan-500"
          >
            <h3 className="text-lg font-semibold">
              Analytics
            </h3>

            <p className="mt-2 text-zinc-400">
              Advanced insights and trends.
            </p>
          </Link>

          <Link
            href={`/dashboard/datasets/${datasetName}/recommendations`}
            className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition hover:border-cyan-500"
          >
            <h3 className="text-lg font-semibold">
              Recommendations
            </h3>

            <p className="mt-2 text-zinc-400">
              AI-powered suggestions.
            </p>
          </Link>

          <Link
            href={`/dashboard/datasets/${datasetName}/schema`}
            className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition hover:border-cyan-500"
          >
            <h3 className="text-lg font-semibold">
              Schema
            </h3>

            <p className="mt-2 text-zinc-400">
              Dataset structure and fields.
            </p>
          </Link>

        </div>
      </div>
    </div>
  );
}
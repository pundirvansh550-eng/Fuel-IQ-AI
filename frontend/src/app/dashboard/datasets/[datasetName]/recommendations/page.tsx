"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

interface PageProps {
  params: Promise<{
    datasetName: string;
  }>;
}

export default function RecommendationsPage({
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
            `/recommendations/${resolvedParams.datasetName}`
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
        Loading recommendations...
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-4xl font-bold">
        Recommendations Workspace
      </h1>

      <p className="mt-2 text-zinc-400">
        {datasetName}
      </p>

      <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

        <h2 className="mb-4 text-xl font-semibold">
          AI Recommendations
        </h2>

        <ul className="space-y-3">

          {data.recommendations.map(
            (
              recommendation: string,
              index: number
            ) => (
              <li
                key={index}
                className="rounded-lg bg-zinc-800 p-4"
              >
                {recommendation}
              </li>
            )
          )}

        </ul>

      </div>

      <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

        <h3 className="text-lg font-semibold">
          Health Score
        </h3>

        <p className="mt-3 text-4xl font-bold text-cyan-400">
          {data.health_score}
        </p>

      </div>
    </div>
  );
}
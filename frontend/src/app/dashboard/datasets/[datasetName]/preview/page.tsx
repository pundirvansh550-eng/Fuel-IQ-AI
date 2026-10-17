"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

interface PageProps {
  params: Promise<{
    datasetName: string;
  }>;
}

export default function PreviewPage({
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
            `/dataset-preview/${resolvedParams.datasetName}`
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
        Loading dataset...
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          Dataset Viewer
        </h1>

        <p className="mt-2 text-zinc-400">
          {datasetName}
        </p>
      </div>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

        <div className="overflow-auto">

          <table className="w-full border-collapse">

            <thead>

              <tr>

                {data.columns.map(
                  (
                    column: string
                  ) => (
                    <th
                      key={column}
                      className="border-b border-zinc-700 p-3 text-left"
                    >
                      {column}
                    </th>
                  )
                )}

              </tr>

            </thead>

            <tbody>

              {data.rows.map(
                (
                  row: any,
                  index: number
                ) => (
                  <tr
                    key={index}
                    className="border-b border-zinc-800"
                  >
                    {data.columns.map(
                      (
                        column: string
                      ) => (
                        <td
                          key={column}
                          className="p-3"
                        >
                          {String(
                            row[column]
                          )}
                        </td>
                      )
                    )}
                  </tr>
                )
              )}

            </tbody>

          </table>

        </div>

      </div>
    </div>
  );
}
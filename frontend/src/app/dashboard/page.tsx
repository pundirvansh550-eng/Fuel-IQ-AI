"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

export default function DashboardPage() {
  const [summary, setSummary] = useState<any>(null);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const response = await api.get(
          "/dashboard/FuelConsumption.csv"
        );

        setSummary(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    loadDashboard();
  }, []);

  if (!summary) {
    return <div>Loading dashboard...</div>;
  }

  return (
    <div>
      <h1 className="text-4xl font-bold">
        FuelIQ Command Center
      </h1>

      <p className="mt-2 text-zinc-400">
        Fleet Sustainability Intelligence Overview
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-3">

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <h3 className="text-zinc-400">
            Health Score
          </h3>

          <p className="mt-4 text-4xl font-bold text-cyan-400">
            {summary.dataset_health_score}
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <h3 className="text-zinc-400">
            Sustainability
          </h3>

          <p className="mt-4 text-4xl font-bold text-green-400">
            {summary.sustainability_score}
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <h3 className="text-zinc-400">
            Risk Level
          </h3>

          <p className="mt-4 text-2xl font-bold text-orange-400">
            {summary.risk_level}
          </p>
        </div>

      </div>

      <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

        <h2 className="mb-4 text-xl font-semibold">
          AI Recommendations
        </h2>

        <ul className="space-y-2">

          {summary.recommendations.map(
            (
              recommendation: string,
              index: number
            ) => (
              <li
                key={index}
                className="text-zinc-300"
              >
                • {recommendation}
              </li>
            )
          )}

        </ul>

      </div>

    </div>
  );
}
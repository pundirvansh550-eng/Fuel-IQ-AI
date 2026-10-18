"use client";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Tooltip,
  Cell,
} from "recharts";

interface VehicleClassData {
  name: string;
  count: number;
}

interface Props {
  data: VehicleClassData[];
}

const COLORS = [
  "#22c55e",
  "#06b6d4",
  "#8b5cf6",
  "#f97316",
  "#eab308",
  "#ef4444",
];

export default function VehicleClassChart({
  data,
}: Props) {
  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer
        width="100%"
        height="100%"
      >
        <PieChart>
          <Pie
            data={data}
            dataKey="count"
            nameKey="name"
            outerRadius={120}
          >
            {data.map(
              (_, index) => (
                <Cell
                  key={index}
                  fill={
                    COLORS[
                      index %
                        COLORS.length
                    ]
                  }
                />
              )
            )}
          </Pie>

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
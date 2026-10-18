"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

interface ManufacturerData {
  name: string;
  count: number;
}

interface Props {
  data: ManufacturerData[];
}

export default function ManufacturerChart({
  data,
}: Props) {
  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer
        width="100%"
        height="100%"
      >
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />

          <Bar
            dataKey="count"
            fill="#22d3ee"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
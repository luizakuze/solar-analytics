import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type ChartData = {
  name: string;
  value: number;
};

type MetricsChartProps = {
  data: ChartData[];
};

export function MetricsChart({ data }: MetricsChartProps) {
  return (
    <div className="chart-container">
      <ResponsiveContainer width="100%" height={380}>
        <LineChart data={data}>
          <CartesianGrid stroke="#e2e8f0" strokeDasharray="4 4" />

          <XAxis
            dataKey="name"
            tick={{ fill: "#64748b", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            tick={{ fill: "#64748b", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="value"
            stroke="#2563eb"
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}